# SEAT F — FIX PASS: DEFECTS D-V1 + D-V2

**Seat:** Relay Law fix seat, acting on the blind verifier's report
(`WIRING_BLINDVERIFY_2026-11-25.md`, claims 4 + 5 carried open).
**Status earned: FIXED — PENDING BLIND RE-VERIFICATION.** The verifier
re-checks claims 4 + 5 against this pass; nothing here grades itself.

**Files changed (3):**
`world-engine/geometry.js` · `wiring/locomotion.js` · `wiring/stage.js`.
**Files untouched:** `world-engine.js`, both world-engine test suites,
`avatar-system/` (all files), `wiring/exercise.cjs`, `wiring/renderer.js`,
`wiring/demo.js`, all scene data.

---

## D-V1 — routes could leave the floor bounds around edge-touching obstacles

**Verifier's reproduction (confirmed identical before the fix).** The
verifier's corridor scene (wall band z 0.42…0.58 reaching both floor
edges, gap 0.06 < walker diameter 0.084, start (0, 0.92) → target
(0, 0.15), radius 0.042, bounds ±1 × 0…1) was rebuilt in Node against
`geometry.js` and returned the verifier's exact waypoints:
`(−1.0525, 0.6325) → (−1.0525, 0.3675) → (0, 0.15)` — around the walls'
west end, off the floor. The wide leg (gap 0.13) reproduced the
verifier's observed weave exactly, which pins the scene reconstruction
as faithful.

**Root cause (verifier's, confirmed in the code).** `route()` applied
`opts.bounds` only inside `resolvePoint` for the two endpoints; the
visibility-graph nodes were never bounds-checked, and the per-frame
resolve had no bounds clamp.

**Fix — `geometry.js`, `route()`.** A graph node is now admissible only
inside the floor: the bounds inset by the body radius, the same region
`resolvePoint`'s clamp enforces on the endpoints. Padded corners and
circle ring points outside that region are dropped before Dijkstra
runs. No edge check is needed: the bounds rect is convex and both
endpoints are already clamped into the inset region, so every
surviving segment lies wholly inside it. A passage sealed by the floor
edge now yields no path — `null`, the clean failure — instead of an
off-floor detour. When no `bounds` are supplied, behaviour is
byte-for-byte the old behaviour (the geometry suite calls `route()`
mostly without bounds and is unchanged).

**Fix — wiring level (`locomotion.js`).** `collideWalker()` gained an
optional `bounds` parameter, passed through to `resolvePoint`; the
route-driven visitor's per-frame resolve now runs with the
locomotion's bounds, so no frame of a walk can leave the floor either.
Population calls deliberately omit it: cross-mode bodies walk to their
off-stage wings (scene x ±112) by design, and clamping them would pin
them at the floor edge — a new defect, not a fix.

**Post-fix evidence (Node, same scene).** Narrow gap → **`null`**.
Wide gap → the identical weave as before the fix
`(0.1025, 0.8525) → (0.1025, 0.6275) → (0.0125, 0.6325) → (0, 0.12)`,
all waypoints in-bounds. Geometry suite **62/62**, including the
specimen's two cases and the grid property check, unchanged and green.

---

## D-V2 — population bodies had no stall backstop; an authored target inside furniture pinned a body forever

The verifier's reader: authored stand point scene (68, 0.50) → world
(0.36, 0.50), inside the desk (−0.32…0.40 × 0.46…0.64); pinned at the
far face, `moving=true` in 100% of 1,134 samples over 12 s (and for a
whole 49 s crossing run). Fixed at both layers, as ordered:

### (a) The progress backstop, shared — `locomotion.js` + `stage.js`

The visitor locomotion's stall logic (progress-watching: distance to
the current waypoint, `PROGRESS_EPS` improvement, `STALL_SECONDS`
window) was extracted into an exported **`createProgressWatch()`**;
the visitor's locomotion now runs on it (same constants, same
semantics — the exercise's slide/stall proofs pass unchanged), and
every population body carries one too. In `_drivePopulation`, after
`walker.update()` + the per-frame resolve: the watch resets whenever
the walker's target changes (a fresh target starts a fresh account —
without this, a retarget to a far point reads as a stall), and while
the body is moving the watch observes its `floorDist` to target. On a
stall the driver stops the body where it stands
(`setTarget(w.x, w.d)`), which returns `moving=false` next frame —
exactly what every population driver (stand/stroll/cross) waits on to
resume its cycle.

**Tuning found by measurement, recorded honestly.** The watch's eps
lives in the units of the distance it observes. Fed `floorDist`
(scene units, ~50× the visitor's geometry units) at the visitor's eps
(0.0015), a diagonally wedged body kept the watch reset for seconds:
pressed on a face, its step's normal component is eaten by the resolve
each frame and the tangential residue shrinks asymptotically as it
nears the closest point — real but ever-slower "progress" (measured:
best-distance still improving ~0.01–0.02 per 0.3 s window at +5 s).
The population watch therefore runs at **`POPULATION_PROGRESS_EPS =
0.02`** (≈ a quarter of the slowest walker's per-frame step): below
that across the whole stall window is creep, not travel. The visitor's
watch is untouched — its eps is correct in its own units.

### (b) Authored stand points resolved at scene build — `stage.js`

`_resolveStandPoint(x, d)` runs geometry's `resolvePoint` at
`BODY_RADIUS` over the scene's obstacles — the `doorStandPoint`
precedent (a computed stand point is never handed back inside an
obstacle) applied to population points. At `_buildScene`: a stand
slot's spot and a stroll slot's two lane ends are resolved once, the
walker starts **at** the resolved point and is targeted at it, and the
drivers work from the stored resolved points (the stroll flip compares
against the resolved ends; the stand drift is derived from the
resolved stand point and its target is re-resolved at assignment, so a
sideways step from a face-side spot cannot aim back into the
furniture). Cross slots author no in-scene stand point and are not
resolved.

**The reader, after the fix:** authored (68, 0.50) resolves to scene
**(68, 0.418)** — the desk's far face minus radius, beside the desk.
(That is the very spot the verifier found him pinned at; the defect
was never the place, it was that the place was his prison instead of
his post: his target stayed inside the desk. Now it is his stand
point, and he arrives.) Every other authored point in the example
world resolves to itself, verified point by point against the obstacle
sets (the street elder's spot shifts 0.1 scene units — he already stood
there under the per-frame resolve; now his target agrees).

---

## Verification — the fix seat's own reproductions

Probes written for this pass (puppeteer, the real demo served from
`next-build/`; the corridor scene injected at the demo's own scenes
fetch, so the stage under test is the shipped stage):

**Probe D-V1** (verifier's corridor on the real stage):
- Wide gap 0.13: route returned; **299 samples, 0 inside any obstacle,
  0 off-floor**; the walk threaded the gap column inside the band;
  arrived at (0.002, 0.154) vs target (0, 0.12) — inside the
  locomotion's waypoint-epsilon class of arrival the verifier accepted
  for claim 1 (error 0.033 there, 0.034 here).
- Narrow gap 0.06: `goToWorld` returned **null**; **346 samples, 0
  inside, 0 off-floor**; the visitor's maximum displacement from start
  was **0.0000** — he never set off; locomotion never busy.
- Zero page errors in both variants.

**Probe D-V2** (the real library; page-time timestamps throughout —
wall-clock sampling in a loaded headless page was shown to distort, so
all durations below are `performance.now()` deltas):
- (b) `standPt` read from the built stage: **(68, 0.418)**; the reader
  starts there and is targeted there; still from the first sample;
  95% still over the 5.5 s settle phase; longest moving run **0.27 s**
  (his drift steps — the stand/drift cycle runs); **0 inside-desk
  samples across 1,920 rows × 3 bodies**.
- (a) Head-on wedge (placed at (52, 0.418), target (52, 0.55) — a pure
  pin, zero travel): **stall-out 0.33 s** after motion began (the
  backstop's own bound: the 0.3 s window + a frame), displacement 0.00.
- (a) Diagonal wedge (from his stand point, target (52, 0.55)):
  **stall-out 5.03 s** after motion began, no moving run over 5.02 s.
  Composition, stated plainly: most of those 5 s are genuine travel —
  the slide along the desk's far face toward the closest point (the
  behaviour claim 2 CONFIRMED for the visitor) plus the asymptotic
  creep the eps tuning bounds — then the stop. A diagnostic run also
  caught the full recovery loop: stop → stand driver resumes → drift
  target (70, 0.418) → a normal walk. Before this pass the same body
  pinned for 45.77 s and counting, digit-constant.
- Zero page errors.

**Suites, all re-run on the final state:**
- `geometry.test.cjs` — **62/62**
- `world-engine.test.cjs` — **65/65** (world-engine total **127/127**)
- `avatar-system.test.cjs` — **13/13**
- wiring `exercise.cjs` — **18/18**, zero page errors (route, slide,
  doors both ways with equal census, DPR, touch, reduced motion)

## Not in this pass

- Claim 7's corrected far-floor figure (0.681 measured vs 1.014
  claimed) is a README/exercise-arithmetic matter, not D-V1/D-V2; the
  FLAG itself stands and this pass does not touch it.
- Body-to-body pass-through: the verifier confirmed it as the stated
  model, not a defect; unchanged.
- Motion feel and physical-device performance remain the founder's
  graduation gate, as before.

**Ceiling: FIXED — PENDING BLIND RE-VERIFICATION** (claims 4 + 5).

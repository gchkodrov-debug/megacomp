# WAVE 2 — SEAT H: CROWD LIFE — BUILD LOG

**Seat:** H (Crowd Life), Wave 2 construction, FVR-31 living cinematic universe.
**Date:** 2026-11-26 (built ~00:53–01:20 CT).
**Ceiling: BUILT — UNVERIFIED.** The Relay circuit (different-family critic → blind
verifier) has not run on this seat. Nothing deployed, nothing desk-filed by this
seat, $0 spent.
**Work directory:** `construction/crowd-life/` only, plus this log and a `/tmp`
exercise copy. No shared file was modified — the neighbouring suites were re-run
after the build and match their verified counts exactly (see §7).

**Brief sources:** Gemini Commission #126 Tranche 2, Domain C (crowd entries) in
`GEMINI_COMMISSION_126_REPORT_TRANCHE2_2026-11-26.md`, with ChatGPT's
adjudication (`CHATGPT_ADJUDICATION_126_2026-11-26.md`) corrections riding —
correction 9 (avoidance: deadlock recovery, doorway priority, feasible passage
widths, verified static solver preserved) applied throughout §5; correction 2
(the house solver is a visibility graph + Dijkstra, never called a NavMesh)
respected in every word below.

---

## 1. What was built

| File | Bytes | Contents |
| --- | --- | --- |
| `construction/crowd-life/crowd.js` | (module) | `createCrowd` + `validateSmartSlots` + `validateCrowdScene` + `slotHash01` / `slotBootPhase`. Pure logic, state and events; renders nothing. |
| `construction/crowd-life/scenes.crowd.example.json` | 12,492 | The wiring demo's world copied verbatim; the Library gains five `smartSlots[]` as DATA (archivist with a chain · desk clerk with proxemics · yieldable reader · lamp tender · cataloguer). |
| `construction/crowd-life/crowd.test.cjs` | — | Node suite, **11/11 green**. |
| `construction/crowd-life/exercise.html` + `exercise-host.js` + `exercise.cjs` | — | Headless-Chromium exercise against a `/tmp` copy of the construction tree, **12/12 green, zero page errors**. |
| `construction/crowd-life/README.md` | — | Module documentation, reuse statement, honest limits. |
| `construction/crowd-life/package.json` | 294 | `provadia-crowd-life`, ESM. |

**Reuse — by import, never forked** (per the house rule): the world engine's
`validateScene` + `phaseAt` + the 50 ms clamp discipline; geometry's
`resolvePoint` / `obstaclesFromScene` / converters; the avatar system's
`createWalker` + catalogue; the wiring layer's `createLocomotion` (every chain
MoveTo), `createProgressWatch` (yield-walk guard) and `collideWalker` (per-step
yield resolution). The verified static solver is untouched and remains the only
collision authority.

---

## 2. Spec 1 — Smart-Object Activity Stations + Mid-Cycle Pre-Warming

**Schema.** `scene.smartSlots[]`, each slot:
`{ id, kind, x, d, facing?, activity, cycle, speed?, prop?, chain?, yieldable?,
yieldMax?, yieldRadius?, proxemic? }` — position, facing, prop, activity id and
cycle duration as the brief names. `validateCrowdScene()` composes the
world-engine scene validator with the slot validator in the same style (returns
error strings, never throws); chain `moveTo` slot references are checked in a
second pass, so a chain may target a slot declared later in the array. The
schema also enforces the proxemic pill budget (whisper text ≤ 40 characters)
and ring sanity (awareness must exceed whisper).

**Pre-warming.** Boot phase is a pure function of the slot id — FNV-1a hash →
[0,1) of the cycle — evaluated through the engine's own `phaseAt` law, so every
inhabitant is mid-cycle at frame 1, identically on every boot and machine, with
no stored state. Measured boot phases in the Library (hash-verified in the
suite): archivist **0.5712** · desk clerk **0.3068** · reader **0.6485** ·
lamp tender **0.7033** · cataloguer **0.8514** — all five > 0.05, the brief's
bar was ≥ 3.

**Evidence:** node tests "schema: the example world passes crowd validation,
every scene" · "schema: bad slots are caught" (10 malformed shapes rejected,
including duplicate ids, inverted rings, a 41-char pill text, a chain step
naming a missing slot) · "pre-warm: the hash is deterministic and every Library
inhabitant boots mid-cycle" · browser exercise frame-1 checks in the live rAF
loop (boot phases + phases advancing on the master clock).

## 3. Spec 2 — Mercantile Task-Chains (Purposeful Role Loop Scheduler)

**Runner.** Chains are pure JSON role data. Steps: `play {activity, seconds}` ·
`attach {prop}` / `detach` · `moveTo {x, d}` or `moveTo {slot}` · `wait
{seconds}`. Instant steps fall through within the frame (guard-bounded against
degenerate all-instant loops). Chains loop by default (`chainLoop: false` ends
at `chain-done` + `chain-complete`). Every MoveTo is driven by the VERIFIED
wiring locomotion — visibility-graph routing, wall sliding, progress-watch
stall backstop — and advances on the clamped master clock only
(`crowd.update` clamps dt to [0, 0.05] on entry; test-proven).

**The Library proof — the archivist.** Chain as data: play `sort-scrolls` 3 s at
the Shelf → attach `scroll` → MoveTo the Lectern point (60, 0.70) → play
`stamp-ledger` 3 s → detach → MoveTo home slot. Measured over 58 simulated
seconds: plays in order **sort-scrolls → stamp-ledger → sort-scrolls →
stamp-ledger → sort-scrolls → stamp-ledger** (a full loop every ~10.4 s);
at the lectern play the archivist stands within tolerance of the lectern point
carrying `scroll`; at the shelf play he is home with `carrying === null`; the
routed walk **never entered the desk obstacle** (sampled every frame — the
straight line crosses the desk, so this is the verified router working, not a
clear corridor).

**D-V2 discipline.** A second test seals a chain target inside a closed ring of
four walls: the route is honestly null, `chain-unreachable` is emitted, the
chain advances to its next step, and the body never enters a wall. The
population stall behaviour of the verified fix is inherited, not re-implemented.

## 4. Spec 3 — Proxemic Two-Ring Gaze & Whisper

**Data/state/events only**, as briefed — no pill, no rendering. Per slot:
`proxemic { awareness, whisper, cooldown?, text? }`. Gaze acquires inside the
awareness ring and releases at × 1.15 (hysteresis); the whisper event latches
inside the inner ring, resets only beyond × 1.25, and a per-slot cooldown
(default 10 s) suppresses repeats. The inhabitant exposes
`gaze = { active, angle, target }` — the bearing a host renderer needs.

**Evidence** (node + browser, same numbers): visitor far → silence; at the
outer ring → one `gaze-acquire`, `gaze.angle` = π ± 0.05 for a visitor due west
of the desk clerk; inner ring → one `whisper` carrying the authored line
verbatim ("The Day-Book is open for inspection."); standing in the ring →
still one (latch); exit → one `gaze-release`; immediate re-entry inside the
6 s cooldown → no second whisper; after the cooldown runs out far away →
a fresh entry whispers again.

## 5. Spec 4 — Soft-Body Yielding (adjudication correction 9 riding)

**Mechanism.** A `yieldable` inhabitant at his station (station / play / wait /
chain-done states) watches the visitor: inside `yieldRadius` (default 0.22
geometry units) he steps laterally — perpendicular to the visitor's approach,
the side AWAY from the visitor first — by at most his authored `yieldMax`.
The candidate point is admitted only if `resolvePoint` **with the floor
bounds** moves it ≤ 0.02 (the step truly exists, furniture-free, on the floor)
AND clearance to the visitor strictly increases; the walk itself steps through
the avatar walker + `collideWalker` under a progress watch. When the visitor
clears the × 1.3 hysteresis radius, he walks home.

**Correction 9, point by point:**
- *Deadlock recovery* — if neither side is feasible, the inhabitant HOLDS his
  station: `yield-hold` emitted once per approach, `yieldHeld` on the record,
  and passage is governed by the visitor's own verified stall discipline.
  Proven in an alcove scene whose walls swallow both candidates: hold fired
  exactly once, the reader's displacement stayed < 0.01, and the visitor
  completed his drive past the held reader — no permanent wedge on either side.
  (A first scenario — a 0.06 gap against a 0.084 body — was also run during
  development: the visitor's own backstop refused the infeasible passage at
  the gap mouth before yield range, which is the layers composing correctly;
  the alcove is the scenario that exercises the hold itself.)
- *Doorway priority* — the inhabitant yields; the visitor never waits for a
  crowd member. Where no yield exists, the visitor's locomotion governs.
- *Physically feasible passage widths* — feasibility is decided by the
  verified resolver with the real body radius (0.042), never by authored
  optimism: a candidate the resolver has to move is not a passage.
- *Verified static solver preserved* — geometry.js is imported, unmodified;
  its suite re-ran 75/75 after this build (§7).

**Measured yield run** (visitor driven from (79, 0.97) at the reader stationed
at (79, 0.72) in the lane between desk and lamp stand): reader displacement
**0.133** of the 0.14 authored max · closest visitor–reader approach **0.116**
geometry units (body diameter is 0.084) · visitor progress stall **0.00 s**
(bar: < 1 s) · visitor arrived at **1.97 s** · reader home **0.67 s** after the
visitor cleared (bar: ~1.2 s) · the yielding reader never entered furniture
(sampled every frame) · event order in the page and in node alike:
`gaze-acquire → yield-start → whisper → yield-return-start → yield-return`.

## 6. Separation steering — and the ORCA honesty line

**ORCA's full reciprocal solver is NOT built; it is a later increment**, as the
brief allows. What ships is separation steering consistent with the existing
population drivers: at-station body pairs closer than 0.09 geometry units are
eased apart symmetrically, each new position resolved through `resolvePoint`
with bounds (a push can never enter furniture or leave the floor); coincident
stations split deterministically along +x. Proven: authored pairs at 0.08 and
at 0.00 separate to ≥ 0.088 and stay legal. Moving-body avoidance between two
*walking* inhabitants is not modelled — stated plainly, not implied.

## 7. Test evidence & regression

| Suite | Result |
| --- | --- |
| `crowd.test.cjs` (node, 11 tests) | **11/11 green** |
| `exercise.cjs` (headless Chromium, /tmp copy) | **12/12 green, zero page errors** |
| world-engine `world-engine.test.cjs` (regression) | 81/81 — matches the verified count |
| world-engine `geometry.test.cjs` (regression) | 75/75 — matches |
| avatar-system `avatar-system.test.cjs` (regression) | 17/17 — matches |
| wiring `exercise.cjs` (regression) | 18/18 — matches |

Two defects found and fixed during this seat's own testing, both in the seat's
own material (none in the verified layer): (1) the example data authored the
lamp tender 0.045 units from the reader — inside separation distance, so the
pair could never rest; the tender moved to (84, 0.78) in the data. (2) The
first deadlock scenario (0.06 gap) never brought the visitor inside yield
range; replaced by the alcove scenario that exercises the hold itself (§5).
The node stall assertion was also corrected to measure only while the visitor
is en route — standing at his target after arrival is not a stall.

## 8. Honest limits

- **Ceiling: BUILT — UNVERIFIED.** No critic or blind verifier has run on this
  seat yet; the Relay circuit is owed before any stronger word.
- Yielding engages only from at-station states. A chain MoveTo in progress is
  never interrupted — a visitor crossing a walking inhabitant's route is
  handled by the locomotion layer alone (and bodies do not collide with each
  other anywhere in this layer; separation is positional, station pairs only).
- Chains are single-role loops. Inter-role hand-offs (the clerk's chain
  triggering the archivist's) are not modelled; conversation triads and the
  palette combinator from the same Tranche-2 domain are not in this seat.
- Gaze is data (target + bearing). Eye/head rendering, the whisper pill, and
  any voice are host concerns, deliberately untouched.
- All evidence is mechanism-level in this sandbox (node + headless Chromium).
  Motion FEEL, real-device performance, and the PIS-01 judgement are
  unmeasured — the founder's device session remains the graduation gate, as
  everywhere in Waves 1–2.
- Known interaction left for the wiring seats: the Seat F stage's latent
  pocket case (found by the Wave-1 blind verifier, zero pockets in shipped
  scenes) is unchanged by this seat; chains inherit the locomotion's
  behaviour there exactly as the stage does.

## 9. MESR candidates (unnumbered, for the register seat)

- Smart-Object Activity Stations with mid-cycle pre-warming — BUILT–UNVERIFIED.
- Mercantile task-chain / role-loop scheduler on the verified locomotion —
  BUILT–UNVERIFIED.
- Soft-body yielding with resolver-proven feasibility + hold fallback —
  BUILT–UNVERIFIED.
- Proxemic two-ring gaze & whisper (data/events) — BUILT–UNVERIFIED.
- Station-pair separation steering — BUILT–UNVERIFIED.
- ORCA reciprocal avoidance — DESIGNED (later increment), not built.

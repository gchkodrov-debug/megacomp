# WAVE 2 — RELAY CRITIC REPORT (Seats G · H · I)

**Date:** 2026-11-26 · **Seat:** Relay Critic (critic only — no code changed, nothing deployed, $0)
**House rules applied:** Crew Tools Manifest + Two-Axis Independent Review skill. Findings graded **CONFIRMED / NEEDS-CHECK / REJECTED**; rejected findings kept on record. Green suites were treated as a starting point, not a verdict.
**Method:** every builder suite re-run by the critic's own hand, plus five critic-written probe scripts (camera, crowd, geometry, Seat I locomotion, stage population) whose numbers appear below. Probe scripts were run from `/tmp/wave2critic/`; all numbers are reproduced in this report so the evidence stands without them.

## Suites re-run by the critic (all green)

| Suite | Result |
|---|---|
| camera node (`camera.test.cjs`) | 61/61 |
| camera exercise (browser) | 11/11 (first parallel attempt died on `EADDRINUSE` port 8477 — an environment collision between my own parallel runs, not a product result; solo re-run passed) |
| crowd node (`crowd.test.cjs`) | 11/11 |
| crowd exercise (browser) | 12/12, zero page errors |
| wiring exercise | 18/18 |
| world-engine | 81/81 |
| geometry | 75/75 |
| avatar | 17/17 |

**Evidence gap noted up front (F-11):** Seat I shipped **no tests of its own feature**. `wiring/exercise.cjs` contains no pocket, escape, or population-escape check (grep: zero hits) — the 18/18 above proves only Seat F's pre-existing checks. Every Seat I number below is primary evidence produced by this critic seat; none existed before.

---

## SEAT G — CAMERA RIG · Verdict: **PASS** (one non-blocking fix)

### Proven (critic's own numbers)

- **Spring dt-invariance — CONFIRMED, stronger than claimed.** Step response (subject 0.2 → 0.8 plate, 375×812) run at 60 Hz and 120 Hz, sampled at common times: max centre divergence **4.4e-16**, max subject divergence **5.4e-13 px**. The exact spring step is genuinely frame-rate exact for a constant target.
- **Bounds rail — CONFIRMED.** Subject parked at u = 0.98 for 4 s at 375×812: centre x never exceeded the effective rail — max centre **0.8460591133004927**, exactly `min(0.90, 1 − viewW/2)`, to machine precision.
- **Look-ahead — CONFIRMED.** Builder's scenario replicated independently (plateAspect 0.8, subject u 0.10 → walking at 0.19 plate/s, v 0.843, 375×812): subject stabilises at **37.43 %** from the left edge (builder claimed 37.6 %; both inside the 32–40 % spec; σ = 0.0011, lead.x = 0.114). Explicit-velocity and estimated-velocity runs agree exactly.
- **Adaptive honesty — CONFIRMED.** At 375×812 the framing reports mode `adaptive` with `primaryFitsAtCover === false` and the portrait box active (suite + code agree) — the rig says out loud that the primary composition does not fit instead of silently cropping.
- **Sway under reduced motion — CONFIRMED.** 17 samples across 10 s with `setReducedMotion(true)`: sway **exactly {0, 0}** every time.
- **Scene with NO camera data — CONFIRMED safe.** The world-engine Library (which carries no `camera` field) validates clean through `validateScene`, and the rig runs on defaults (mode `cover`). No crash, no NaN.

### Findings

- **F-2 · CONFIRMED · Medium · non-blocking — resize / scene-change leaves stale, out-of-plate state exposed until the next real frame.** Settled at the portrait right rail (centre 0.8461, viewW 0.3079), then `setViewport(1280×720)`: `state()` immediately reports centre **0.8461 with viewW 1.0 → view right edge 1.3461** (34.6 % of the plate off-edge). A `dt = 0` update does **not** repair it (the hard clamp lives inside the `dt > 0` guard); one real frame snaps the centre to 0.5 — a jump cut, not a glide. The rig's own exercise host never draws the stale state (it updates before drawing), so this is a contract hazard, not a shipped visual defect: **any host that calls `state()`/`project()` between `setViewport()`/`setScene()` and the next update will draw off-plate.** Seat J must update before projecting after any re-solve; the rig should clamp at re-solve time (fix list #2).
- **F-3 · NEEDS-CHECK · Low — two honesty nits in the framing record.** (a) With **no focal box authored at all**, `primaryFitsAtCover` reports **true** with `activeBox: null` — a vacuous truth Seat J could misread as a composition guarantee. (b) Containment is solved for the centre, not centre+sway: at the rail, sway pushes the view to **1.00157** (≤ 0.16 % of plate width past the edge). The centre rail itself is exact (see above); both items are record-keeping, not motion defects.
- **F-4 · CONFIRMED (scoped) · Low — dt-invariance is exact for step response, approximate for a moving target.** With a continuously moving subject (the exercise scenario, 19 %/s), 60 Hz vs 120 Hz diverge by up to **0.87 percentage points** of frame width (~3.3 px at 375) during the transient, settling to **0.004 points** in steady state. The builder's claim was scoped to the step response and holds as claimed; nobody should quote it as general frame-rate independence.

### Claimed-but-unproven

- **Settle time.** The builder honestly logged ≈ 0.93 s at default omega against the dossier's 500 ms *estimate*. Per the standing partner ruling this is a visual-examination question (slower may be more luxurious), owed at Seat J + the founder's device session. Not graded as a defect.

### Does the rig fight the wiring stage's transform?

**Not today — because nothing composes them.** `createCameraRig` is imported nowhere outside `camera-rig/` (grep over the whole construction tree). The stage uses its own layered mapper. The two floor mappings are the same linear formula, so there is no mathematical contradiction — but there are two transform *authorities* (camera window + sway vs full-stage mapper), and a naïve Seat J wiring that draws through one and maps taps through the other will offset every tap. Recorded as composition finding F-10.

---

## SEAT H — CROWD LIFE · Verdict: **PASS as scoped** (the log's scope is honest; three Run #3 adopt items are genuinely not met — see table)

### Proven (critic's own numbers)

- **Yielding — CONFIRMED, builder's numbers reproduced exactly.** Critic's independent run of the builder's scenario (visitor drives through the stationed reader's lane): reader displacement **0.1333** (builder: 0.133), closest approach **0.1159**, visitor stall **0.00 s**, reader home **0.6667 s** after clear (builder: 0.67), one `yield-start`, one `yield-return`, visitor arrived at t = 1.97 s.
- **Station separation — CONFIRMED.** Pair authored 0.08 apart: **exactly 0.0900** after a single frame, held at 6 frames (the builder's test threshold of 0.088 was conservative).
- **Frame-1 pre-warming — CONFIRMED** (suite + code): all 5 Library inhabitants boot mid-cycle from the deterministic FNV-1a `slotHash01(id)` phase; phases advance from the offset, never from zero.
- **Task chains — CONFIRMED** (suite, re-run green): archivist Shelf → Lectern → Shelf in order, scroll attached for the lectern leg and detached before the shelf leg, desk never entered in 58 s; a sealed chain target emits `chain-unreachable` and the chain advances (D-V2 discipline inherited intact).
- **Proxemics — CONFIRMED** (suite + code): gaze acquire/release, whisper latch (once per entry), cooldown respected, hysteresis in code (gaze exit × 1.15, whisper exit × 1.25).
- **dt clamp — CONFIRMED** (suite): `update(5.0)` advances crowd time by exactly 0.05.

### Findings (all disclosed scope in the builder's log — graded as gaps against the Run #3 adopt list, not as false claims)

- **F-5 · CONFIRMED · Medium — no separation for moving bodies.** Two chain inhabitants crossing head-on on the same lane: minimum distance **0.0053** against the 0.09 floor — they pass through each other. `_separate()` runs post-step but only for at-station, non-yielding pairs. The Run #3 "hard pairwise separation post-step" is therefore **not** met; what exists is a station-pair ease, honestly labelled in the module header.
- **F-6 · CONFIRMED · Medium — the visitor has no hard floor.** Visitor driven straight through a **non-yieldable** stationed reader: minimum approach **0.0027** against the 0.084 body diameter — full overlap. Yielding covers yieldable slots only; against a non-yieldable or chain-moving body the visitor is a ghost. The Run #3 ADOPT-WITH-FIX "hard floor for the visitor too" is **not** met.
- **F-7 · CONFIRMED · Low–Medium — no crowd-level reduced-motion branch.** `crowd.setReducedMotion` does not exist; with every walker's reduced-motion flag set by hand, a 1 s update still advanced the reader's phase by **0.1111** (chains/timers/phases are crowd-time driven and ignore the flags). A host-level equivalent exists — withhold `crowd.update` while the visitor's own locomotion keeps running, which the exercise host's structure already permits — but no host implements or documents it for crowd. Run #3's "sim-level reduced motion" is met only by a discipline nobody has written down.

### Seat H vs Run #3 ADOPT list — the table

| Run #3 item | H's position | Evidence |
|---|---|---|
| Phase-seeding | **Adopted** | FNV-1a `slotHash01(id)` seeds phase + phase-offset at boot; all 5 inhabitants frame-1 mid-cycle |
| Behaviour-set-as-data | **Adopted** | Slots, chains, activities, proxemic rings are all scene data; no behaviour is hand-coded per inhabitant |
| Hard pairwise separation post-step | **Partial — station pairs only** | Post-step pass exists; measured 0.0900 for station pairs, **0.0053** for crossing chain pairs (F-5) |
| Stall-timer release | **Adopted** | Inherits the shared progress watch: a stalled chain drive is dropped and the chain advances; sealed targets emit `chain-unreachable` and advance |
| In-sim dt clamp | **Adopted** | `update()` clamps to the 50 ms master clamp; suite-verified |
| footY single-sort | **Lacks in H** | H renders nothing. A single z-sorted draw list exists in the *wiring renderer* — for the stage's own population only; crowd bodies are not fed into it. Seat J item (F-10) |
| Sim-level reduced motion | **Lacks in module** | No API; phases advance under walker flags (F-7). Host-withholding equivalent possible, unimplemented |
| Portrait camera-follow | **Lacks in H** | No camera in H. Seat G's rig follows a *single* subject; no crowd-aware framing exists anywhere yet. Seat J item |
| Proxemic gaze | **Adopted** | Awareness/whisper rings, gaze angle state, latch + cooldown (suite-verified) |
| ADOPT-WITH-FIX: hard floor for the visitor too | **Not met** | 0.0027 minimum approach vs a non-yieldable inhabitant (F-6) |
| ADOPT-WITH-FIX: gaze hysteresis | **Adopted** | Exit factors × 1.15 (gaze) / × 1.25 (whisper) in code; boundary behaviour suite-verified |
| REJECT: closed-union typing | **Not carried — REJECTED as a finding** | No TS, no enums, no closed data unions; grep clean. On record: chain *step verbs* are a closed 5-word whitelist (`play/attach/moveTo/detach/wait`) in validation — protocol grammar, not place vocabulary; extending behaviour needs a code change, the same trade-off in miniature. Noted, not blocking |
| REJECT: AI Studio boilerplate | **Not carried — REJECTED as a finding** | Grep for metadata/env/genai/AI Studio artefacts over `crowd-life/`: zero hits |

---

## SEAT I — POCKET ESCAPE · Verdict: **CONDITIONAL — visitor half PROVEN; population half PROVEN for left-start lanes, BROKEN for right-start lanes (F-1 blocks a full PASS)**

The builder seat ended without a log. Everything below is this critic's primary evidence.

### Preconditions, re-derived from scratch

Seat D Library scene, obstacles via `obstaclesFromScene(scene, { depthThickness: 0.06 })`. Pocket at geometry **(0.474, 0.850)** = scene (73.7, 0.85):

- `resolvePoint` at body radius 0.042 moves the pocket point by **0.0000** — legally placed.
- `route(pocket → (0.04, 0.30))` = **null** — graph-isolated, exactly as the Wave-1 record states.
- `findEscapePoint` finds **(0.4897, 0.8949)** at ladder rung **0.09** — matching the Wave-1 host cure's (0.489–0.490, 0.895) to ±0.001.

### (1) Visitor in the exact pocket, through the SHARED `createLocomotion` — **CONFIRMED**

Walker placed at scene (73.7, 0.85); `goToWorld((0.04, 0.30))` (scene (52, 0.30), the blind verifier's live target):

- Returns the escape drive (1 waypoint); modes observed: **`escape` → `route`**.
- **Arrived: onArrive fired exactly once; onFail zero; settled at t = 3.1 s.**
- Final position error **0.0284** geometry units (inside the 0.035 waypoint tolerance).
- **0 position samples inside any obstacle** across the whole drive.

The shared layer now does what Seat D's host did locally in Wave 1. The Wave-1 NEEDS-CHECK is discharged for the visitor.

### (2) Sealed target + pocket-as-target — **CONFIRMED visible failure, never a silent strand**

- Visitor in open floor, target sealed inside a four-wall ring: `goToWorld` returns **null**, `onFail` fires **once** (`reason: 'unreachable'`, `attempts: 4`), onArrive **zero**, body displacement **0.0000**, `busy` false. The failure is a fact on the record, not a dead tap.
- The pocket as *destination* from open floor: returns null, one visible failure (`'unreachable'`), no arrival claim, settled in 0.03 s. Target-side isolation is handled as honestly as start-side.

### (3) Progress-watch interplay — **CONFIRMED, with one semantic note (F-8)**

Direct drive head-on into the far table (drive mode, target 0.54 beyond the face): the progress watch settles the body at **t = 0.8 s**; modes seen: `drive` only — **the escape never misfires** (it lives only on the `goToWorld` route-null path); no failure recorded, body left legally against the face.

- **F-8 · NEEDS-CHECK · Low — `onArrive` fires on a stall-settle.** In that same probe the arrive callback fired **once** while the body stood **0.542 short** of its target. This is the house backstop's documented semantics (a dropped waypoint ends the drive "cleanly"), and Seat H's chains deliberately ride it as their stall-timer release — but a host must never read a *drive's* onArrive as "reached". Documentation fix only (fix list #7).

### (4) Population bodies (`stage.js` drive/collide path) — the amendment, tested four ways

- **(4a) Lane-crossing pin — mechanism CONFIRMED.** A stroll body whose lane (d 0.50, x 20 → 80) crosses the far table: **10 escape engagements in 120 s**, far lane end **reached at t = 12 s**, longest pin **0.37 s**, `failedTargetCount` **0**. When a population body genuinely strands (two clustered stalls), the escape engages, routes it around, and the stroll resumes — repeatedly, both directions.
- **(4b) Sealed lane end — report path CONFIRMED.** Lane end sealed inside the ring: failure surfaced **`population-stranded`** (attempts 4) with a `locomotion-failed` canvas event, **3 times in 60 s**, body never silently pinned. **F-9 · CONFIRMED · Low:** there is no debounce — the same slot+target re-surfaces roughly every 20 s forever; any host rendering every event will spam. Non-blocking; fix list #6.
- **(4c) Body in the pocket, eastward lane — walks out unaided (correct behaviour).** Population bodies never route, so the graph-pocket does not trap them physically: the body strolled its lane and cycles 75.1 ↔ 86.4 indefinitely (its authored lane end, 90, was resolved beside the lamp by the D-V2(b) stand-point resolver at build — by design). No stall, no escape needed, none engaged.
- **(4d) Body in the pocket, westward lane — F-1 · CONFIRMED · HIGH · BLOCKING.** A stroll slot `from: 73.7, to: 52, d: 0.85` — a body standing in the exact Wave-1 pocket with its lane running west: in **60 s of `_drivePopulation` it moved 0.0000, fired no event, surfaced no failure, engaged no escape.** It strands *silently* — the precise failure mode Seat I exists to eliminate.
  **Root cause (read from code, proven by trace):** `avatars.js` `setTarget()` does **not** set `moving` — `moving` is computed only inside `walker.update()`. `_buildScene` aims the walker at the far lane end, but on the first `_drivePopulation` frame the mode logic runs *before* `w.update(dt)`, reads `!w.moving` as "arrived", and the stroll branch picks its next target by position: a body at the **right-hand** end (`x > midpoint`) is re-aimed at `fromPt` — itself. The lane is dead from birth. Left-start lanes (`from < to`) survive because the same branch re-aims them at `toPt`, which is where they were already going; `cross` survives by symmetry; `stand` survives because its wait timer delays the first re-aim past the first update.
  **Blast radius:** every shipped demo lane is `from < to` (street 14→38, library 22→48), so the live demo is unaffected — this is latent in the data and live in the pattern. Any right-to-left lane any author writes, in any scene, freezes forever with no signal. The defect sits in Seat I's amended file (`stage.js` build/driver ordering) reading a Wave-1-verified walker contract; avatars.js itself behaves exactly as its own header documents ("a walker is moving while its distance to target > 0.35" — a state `update()` maintains).

### Regression — **CONFIRMED clean**

Wiring exercise 18/18, geometry 75/75, world-engine 81/81 re-run by the critic after the Seat I changes; avatar 17/17 unchanged.

---

## CROSS-CUTTING

### Boundary check — **CONFIRMED clean** (mtime evidence; git is useless here, all `construction/` dirs are untracked)

Files carrying a Wave-2-window mtime (≥ 06:56 UTC, 2026-11-26): `camera-rig/*` (Seat G's own), `crowd-life/*` (Seat H's own), `wiring/locomotion.js` 06:59 UTC + `wiring/stage.js` 07:00 UTC (Seat I's declared surface). **Nothing else.** `cinematic-library.js` (06:42 UTC) predates the window — Wave-1 fix-pass era — and is untouched since. Caveat on record: mtimes prove timing, not content; content safety is corroborated by every Wave-1 suite still passing with identical counts (81/75/17/18).

### Composition — **F-10 · CONFIRMED · Medium — blocking for Seat J, not for Wave 2**

The three modules **do not contradict each other mathematically** (one geometry space, one master-clock discipline, the camera's floor mapping is the stage mapper's formula), but **no integrated host exists**:

- `createCameraRig` is imported nowhere outside `camera-rig/`; `createCrowd` nowhere outside `crowd-life/`. The stage consumes neither. G, H, I were each proven in their own harness, never together.
- **Two population systems** cover the same scenes: crowd inhabitants (`scene.smartSlots`, with chains/proxemics/yield) vs stage population (`view.population`, stand/stroll/cross). Seat J must pick **one authority** or bodies will double-draw and double-walk.
- **Two transform authorities**: camera `project()` (window + sway) vs the stage's layered mapper (full stage). One must own drawing *and* tap-mapping, or every tap offsets under sway.
- Crowd bodies are driven from `crowd.update(dt, visitor)` with dt clamped inside; the camera reads positions through `project()` — compatible *if* a host feeds both from the same engine frame, which is exactly the adapter Seat J has to build.

Seat J's acceptance (Five Proofs simultaneously) is **not** pre-proven by Wave 2 and should not be quoted as such.

---

## FIX LIST

### Blocking (must clear before the affected claim stands)

1. **`stage.js` — the frame-1 stroll re-target (F-1).** The population driver must not read `walker.moving` before the walker's first `update()` after a (re)target. Track a per-body "target issued, not yet updated" state (or prime each new walker with one update at build, or compare `tx/td` against the intended lane end). Add the missing exercise coverage in the same pass: a `from > to` stroll lane that verifiably walks in both directions, including a lane starting in the Wave-1 pocket geometry. **Until this lands, Seat I's population claim reads: proven for left-start lanes only.**

### Non-blocking

2. **`camera.js` — clamp at re-solve (F-2).** On `setViewport`/`setScene`, clamp the spring centre into the new effective range (and zero outward velocity), so `state()` can never expose an out-of-plate view; add a resize-mid-flight test (portrait rail → desktop and back).
3. **`camera.js` — vacuous focal truth (F-3a).** When no focal box is authored (`activeBox: null`), report `primaryFitsAtCover` as `null`, not `true`.
4. **`crowd.js` — moving-pair separation (F-5).** Extend the post-step pass to chain-moving pairs (a hard-floor positional pass in the Run #3 shape), or scope the limitation into the README so Seat J never assumes it.
5. **`crowd.js` — visitor hard floor (F-6).** Give the visitor a minimum separation against non-yieldable and chain-moving bodies (Run #3 ADOPT-WITH-FIX), or formally scope it out in the README.
6. **`stage.js` — debounce repeat population failures (F-9).** Surface `population-stranded` once per stranded episode per slot+target; count repeats silently on `failedTargetCount`'s companion record.
7. **`locomotion.js` — document the settle semantics (F-8).** State in the header that `driveToWorld`'s onArrive fires on stall-settle (arrival ≠ reached); consider a distinct `onSettle` for drives in a later pass. No behaviour change.
8. **`crowd.js` — reduced-motion contract (F-7).** Either add a crowd-level reduced-motion switch (phases/chains/timers freeze while the visitor stays live) or write the host contract — withhold `crowd.update` — into the README and the exercise host.
9. **Seat J preparation (not a Wave-2 fix).** Build the composition adapter: one population authority, one transform authority, crowd bodies fed into the renderer's single z-sorted draw list (which also closes adopt items "footY single-sort" and "portrait camera-follow" at the system level).

---

## VERDICTS AT A GLANCE

| Seat | Verdict |
|---|---|
| **G — Camera Rig** | **PASS.** Every headline claim independently reproduced (dt-invariance 4.4e-16, rail exact, look-ahead 37.43 %, sway exactly 0, adaptive honesty). One non-blocking contract fix (resize stale state). Settle-speed judgment owed to Seat J / founder, as ruled. |
| **H — Crowd Life** | **PASS as scoped.** Yield numbers reproduced to the third decimal; chains, pre-warm, proxemics, dt clamp all proven. The builder's disclosed limits are real: moving-pair separation, visitor hard floor, and crowd reduced-motion are **not built** — three Run #3 adopt items Seat J must not assume. |
| **I — Pocket Escape** | **CONDITIONAL.** Visitor path fully proven with primary evidence (escape + arrival from the exact pocket; sealed targets fail visibly; the watch never misfires). Population escape mechanism proven when it engages — **but F-1 (right-start stroll freeze) is a known, unresolved, silent-strand defect inside Seat I's own claim area, and under the Zero Known-Defect Rule it blocks a final PASS for the population half until fixed and retested.** |
| Boundary | Clean — no unrecorded shared-file modification (mtime evidence + Wave-1 suites byte-stable). |
| Composition | No contradictions; no integration either. Seat J starts from three proven parts and zero proven whole. |

*End of critic report. No code was changed by this seat. The captain files; the blind verifier's first target should be F-1's fix, when it lands.*

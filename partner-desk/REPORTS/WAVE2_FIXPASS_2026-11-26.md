# WAVE 2 — FIX PASS (Seats G · H · I)

**Date:** 2026-11-26 · **Seat:** Wave-2 Fix Pass (builder seat — fixes + own probes + evidence)
**Work order:** `WAVE2_RELAY_CRITIC_2026-11-26.md`, fixes in the critic's numbering.
**Rules loaded:** Crew Tools Manifest (`~/workspace/newwave/tools/CREW_TOOLS_MANIFEST.md`) + Two-Axis Independent Review skill (`~/workspace/newwave/tools/crew-skills/two_axis_independent_review/SKILL.md`). Zero Known-Defect Rule applied throughout: every fix re-probed by this seat's own hand; every deferral named with its reason.
**Method:** before-numbers were reproduced first with this seat's own probes (Node, driving the real modules — stage via a stub canvas/world, `_renderer.onScene` + `_drivePopulation` driven directly), and they match the critic's measurements to the digit (F-1 path 0.0000 · F-2 right edge 1.3461 · F-5 min 0.0053 · F-7 phase +0.1111). Probe scripts lived in `/tmp/wave2fixpass/`; all numbers below are quoted in full so the evidence stands without them. Nothing deployed, $0.

---

## FIX 1 — F-1 · BLOCKING · Seat I, population half — **FIXED**

**Root cause (two halves; the critic traced the first, the second was found by this seat's retest).**
(i) `avatars.js` `setTarget()` does not set `moving` — `moving` is computed only inside `walker.update()`, exactly as that module's header documents. `_buildScene` aims each stroll walker at its far lane end, but on frame 1 `_drivePopulation`'s mode logic runs *before* any `update()`, reads `!w.moving` as "arrived", and re-aims. **avatars.js is not defective** — it behaves as its own verified contract states — so the fix belongs in the driver, not the walker.
(ii) The stroll branch picked its next target **by position** (`x` past the lane midpoint → `fromPt`). That rule silently assumes `fromPt` is the west end. For a `from > to` lane it re-aims a stopped body at the end it is already standing on — at build (half (i)'s trigger), **at every later arrival at either end**, and after any mid-leg stall-stop on the wrong half (abandoning the leg). Proof it is not frame-1-only: with only the frame-1 guard in place, the critic's exact case still stranded — the body crept 1.8796 weighted units along the table's padded face, stall-stopped once, was re-aimed at its own start point by the position rule, and never moved again (x range 75.10..75.10 over 60 s).

**The change** (`construction/wiring/stage.js` only):
- Each population record carries `fresh: true` at build — "target issued, not yet updated" (the critic's fix-list option 1). The stand/stroll/cross branches may not re-aim a fresh body; its first `update()` runs at the bottom of the same frame and makes `moving` honest.
- Each stroll record carries `legTarget` — the lane end it is currently bound for (build: `toPt`, the critic's option 3 made explicit state). The stroll branch flips the leg **only on arrival** (within `POP_ESCAPE_ARRIVE` of the leg end); any other stop **retries the same end** — which is also what lets a wedged body's stall-stops cluster into the pocket escape instead of the leg being abandoned at one stall.

**Proof (this seat's probes, dt = 1/30, Seat D `LIBRARY_SCENE` through the real stage):**

| Case | Before | After |
|---|---|---|
| **F-1 exact**: stroll `from 73.7 → to 52, d 0.85` (body in the Wave-1 pocket), 60 s | path **0.0000**, x 75.10..75.10, 0 escapes, 0 failures — silent strand | path **242.27**, x **52.22..77.27** (both ends, ping-ponging), **2 escape engagements**, **0 failures**, ends mid-lane walking |
| Control: left-start `52 → 73.7`, 60 s | x 52.16..77.27, 0 failures | identical (52.16..77.27, 0 failures) |
| Critic (4c): pocket body, eastward lane `73.7 → 90`, 60 s | cycles 75.27..86.10, 0 failures | identical |
| Critic (4a): lane-pin, stroll `20 → 80, d 0.50` across the far table, 120 s | 8 escape engagements, far end reached 15.17 s, 0 failures (critic: 10 engagements / 12 s at their sampling — same behaviour class) | identical (8 / 15.17 s / 0) |
| Critic (4b) shape: sealed lane end (ring), 60 s | body frozen by F-1 itself (0 movement, 0 failures) | walks to the ring wall (minX 62.10), surfaces `population-stranded` — see Fix 3 for the record/event split |

**Permanent guard:** wiring exercise check **Seat I-C** (Fix 2 below) runs this exact lane in the browser suite forever.

---

## FIX 2 — F-11 · Seat I shipped with zero tests of its own feature — **CLOSED**

The wiring exercise (`construction/wiring/exercise.cjs`) contained no pocket, escape, or population-escape check. Four checks were added, in the critic's own constructions, driven in-page against the real modules (exercise total **18 → 22 checks, all passing, zero page errors**):

- **Seat I-A · visitor pocket escape** (Seat D obstacle set, `depthThickness: 0.06`; walker at scene (73.7, 0.85), target geometry (0.04, 0.30)): modes `escape → route`, arrived **1**, failed **0**, **0/93** position samples inside any obstacle, final error **0.0284**, settled 3.1 s — digit-for-digit the critic's primary evidence, now a standing suite check.
- **Seat I-B · visitor sealed target** (four-wall ring): `goToWorld` returns **null**, `onFail` fires **once** (`reason: 'unreachable'`, `attempts: 4`), onArrive **0**, displacement **0.0000**.
- **Seat I-C · the F-1 regression** (Fix 1's table, first row, through a real stage in the browser): west end reached, ping-pong back east, **0** failures.
- **Seat I-D · population sealed lane end**: `population-stranded` recorded against the right slot, announced once (Fix 3).

---

## FIX 3 — F-9 · stage.js failure debounce — **FIXED** (critic's non-blocking #6)

**Root cause:** `_surfaceFailure` dispatched a `locomotion-failed` canvas event on *every* occurrence; a body stranded against a sealed target re-surfaces on every escape cycle, forever.
**Change** (`stage.js`): the record stays complete — `lastFailedTarget` + `failedTargetCount` count **every** occurrence — but the announcement fires once per distinct failure (reason + slot + target) per scene; repeats increment the new `suppressedFailureCount`. The key resets on scene build, so a new scene's first failure always announces; a genuinely different failure always announces.
**Proof:** the sealed-lane stage case, 60 s: **70 recorded failures → 1 canvas event + 69 suppressed** (exercise check Seat I-D asserts the split exactly).

---

## FIX 4 — F-2 · Seat G camera: stale view after re-solve — **FIXED** (critic's #2)

**Root cause:** the hard centre clamp lived only inside `update()`'s `dt > 0` guard. A centre settled at the portrait rail survived `setViewport(1280×720)` untouched, so `state()` exposed a view hanging off the plate until the next real frame — and a `dt = 0` update never repaired it.
**Change** (`construction/camera-rig/camera.js`): `clampCentreToRange()` — clamp the spring centre into the current effective range, zeroing outward velocity — runs at every re-solve: `setViewport()` and `setScene()`. `state()` is consistent from the instant the framing changes; the next update glides from a legal state instead of jump-cutting.
**Proof:** critic's construction — settled portrait centre 0.8461, viewW 0.3079 (right edge 1.0000). After `setViewport(1280×720)`, **before any update**: before → centre 0.8461, viewW 1.0, **right edge 1.3461** (and still 1.3461 after a `dt = 0` update); after → centre 0.5000, **right edge 1.0000**, and a `dt = 0` update leaves it intact. Guarded permanently by new node checks (suite §5b, incl. the desktop→portrait direction and a tighter-bounds `setScene`).

## FIX 5 — F-3a · Seat G: vacuous focal truth — **FIXED** (critic's #3)

**Change:** in `solveFraming`, when **no** focal box is authored, `primaryFitsAtCover` is now **null**, not `true` — there is no composition guarantee to report. A declared box that fits still reports `true`; the adaptive/contain paths are untouched (the camera exercise's desktop `=== true` / mobile `=== false` assertions still pass).
**Proof:** `solveFraming` with no camera data: before `primaryFitsAtCover: true, activeBox: null` → after `primaryFitsAtCover: null`. Node check added beside the existing no-focal case.

**Also in Seat G, documentation-only (critic's F-3b / F-4, both Low):** the camera.js header now scopes the dt-invariance claim (exact for a *constant* target; a moving target diverges ≤ 0.87 points of frame width mid-transient, 0.004 settled — the critic's measurements) and notes that plate containment is solved for the centre, with sway able to ride ≤ |sway| (≤ 0.18 % of plate width) past a rail. No behaviour change.

---

## FIX 6 — F-5 · Seat H: no separation for moving bodies — **FIXED** (critic's #4)

**Root cause:** `_separate()` skipped any pair involving a `chain-move` body (`_separable` required `state !== 'chain-move'`), so two inhabitants crossing head-on passed through each other.
**Change** (`construction/crowd-life/crowd.js`): the post-step pass now covers same-class pairs — station/station as before, and **mover/mover**: movers are *shifted position-only* (never placed — their target belongs to their locomotion; rewriting `tx/td` would strand the drive, since the locomotion aims the walker only when its waypoint changes), and their push is **half along the pair axis, half lateral** (one rotational sense for both bodies). The lateral half is load-bearing, not decoration: this seat's first attempt (pure axial push) **deadlocked** the pair — each locomotion steps back into the gap every frame, neither ever passes, chains never advance (measured: permanent face-off, west body stuck at x 47.8 of an 80-wide lane). With the lateral half both bodies veer the same rotational way and slip past shoulder-to-shoulder. Mixed mover/station pairs remain with the mechanisms that already govern them (routing + per-frame resolve; yielding; the visitor floor).
**Proof:** critic's construction (two chain inhabitants, same lane, head-on, 40 s): min distance **0.0053 → 0.0900** post-step, and both crossings **complete** (west body reaches x 78.5, east body x 21.5 — no deadlock). Guarded by new node test "separation F-5".

## FIX 7 — F-6 · Seat H: the visitor has no hard floor — **FIXED** (critic's #5)

**Root cause:** yielding covers yieldable stations only; against a non-yieldable or chain-moving body nothing separated the visitor at all.
**Change:** `crowd._separateVisitor(visitor)`, run post-step on every `update(dt, visitor)`: any inhabitant closer than `MIN_SEPARATION` (0.09) to the visitor is shoved out to the floor — **the inhabitant moves, never the visitor** (doorway priority, correction 9; the visitor's position and his locomotion's account of it are never rewritten by the crowd). The shove is radial first; if furniture eats it (a body cornered against a face), two lateral shoves are tried (a sidestep along the face, sized to reach the floor in quadrature); the best achieved separation wins, every candidate resolved through `resolvePoint` with bounds — no shove can enter furniture. Bodies are shifted position-only, so a displaced station body steps back toward its own target and walks home when the visitor leaves.
**One scoped exception, named:** bodies mid-yield or in a **yield-hold** are exempt. The hold is a made, evented feasibility judgment (correction 9: no feasible step-aside exists at the authored distance, so the inhabitant holds and the visitor's own backstop governs). Shoving a held body anyway would override that judgment with a push that buys no passage. The pre-existing yield-deadlock suite (which asserts the held reader does not move) caught exactly this collision during this pass; the exemption is documented in the code at the pass itself and in the README.
**Proof:** visitor driven straight through a non-yieldable stationed reader: min approach **0.0027 (critic) → 0.0900**, the visitor still completes his drive, and the reader is home (< 0.01) after the visitor leaves. The furniture-cornered variant (reader authored *inside* the Library desk footprint, home resolved onto its face): **0.0900** as well, via the lateral sidestep. Guarded by new node test "visitor floor F-6".

## FIX 8 — F-7 · Seat H: no crowd-level reduced motion — **FIXED** (critic's #8)

**Root cause:** no API existed; chains/timers/phases are crowd-time driven and ignored the walkers' own flags (critic: reader phase +0.1111 in 1 s with every walker flag set by hand).
**Change:** `crowd.setReducedMotion(bool)` — freezes the crowd's own clock (`update` clamps its step to 0: `crowd.t`, phases, chain timers, whisper cooldowns and yield watches all hold; no inhabitant is stepped) and propagates the flag to every walker (a body a host steps outside this module is placed, never glided). **Proxemics stay live** while frozen — gaze is computed from current distances every update; looking is not locomotion. The visitor floor also still runs (the visitor is the host's body and may still move). The old host-withholding equivalent is now a documented alternative, not the only road. Header §3, the method's own note, and the README carry the contract.
**Proof:** new node test "reduced motion F-7" — after 1.3 s of live running, freeze for 2 s: `crowd.t` identical, reader phase **identical to the digit** (was +0.1111/s), archivist chain state/index/position held, clerk gaze still acquires with the crowd frozen; unfreezing resumes time and phases. (Walker-flags-alone behaviour is unchanged by design — the switch is the fix.)

**Run #3 adopt-table status for Seat H after this pass:** hard pairwise separation post-step — **met** (station pairs, chain-moving pairs, visitor floor; Fixes 6–7) · sim-level reduced motion — **met in-module** (Fix 8) · hard floor for the visitor (ADOPT-WITH-FIX) — **met** (Fix 7, yield-hold exception named) · footY single-sort and portrait camera-follow remain **Seat J items**, as the critic's own table records (H renders nothing and owns no camera — not deferrals of H work).

---

## FIX 9 — F-8 · locomotion settle semantics — **DOCUMENTED** (critic's #7)

**Change** (`construction/wiring/locomotion.js`, header doc only, no behaviour change): `onArrive` is now documented as firing on a stall-settle — arrival means "the drive is over", **not** "the destination was reached" (critic's measurement: settled 0.542 short, onArrive fired) — and a host needing reached-ness must measure the distance itself. Seat H's chains deliberately ride the settle as their stall-timer release; that reliance is named in the same paragraph.
**Deferred part, with reason:** the critic's "consider a distinct `onSettle`" is **not** built. Splitting the callback is a behaviour/contract change with live consumers (Seat H's chain advance rides `onArrive`); the hazard the critic named was a host *misreading* the semantics, which the documentation removes. Revisit at Seat J, where the composition host is written and can adopt a split contract from birth.

---

## DEFERRED — with reasons

- **F-10 / fix-list #9 (composition: one population authority, one transform authority, crowd bodies in the renderer's single z-sort)** — explicitly "Seat J preparation (not a Wave-2 fix)" in the critic's own list. Not touched; nothing in this pass pre-empts it.
- **Camera settle-time judgment (≈0.93 s at default omega vs the dossier's 500 ms estimate)** — not a defect per the standing partner ruling; it is a visual-examination question owed at Seat J + the founder's device session. No tuning changed.
- **`onSettle` callback split** — see Fix 9.

## REGRESSIONS — all run by this seat's own hand, after all fixes

| Suite | Result |
|---|---|
| world-engine (`world-engine.test.cjs`) | **81/81** |
| geometry (`geometry.test.cjs`) | **75/75** |
| avatar (`avatar-system.test.cjs`) | **17/17** |
| manifestation (`manifestation.test.cjs`) | **24/24** |
| wiring exercise (browser) | **22/22** (was 18; +4 Seat I checks), zero page errors |
| camera node (`camera.test.cjs`) | **68/68** (was 61; +7 assertions: §5b re-solve + F-3a) |
| camera exercise (browser) | **11/11** |
| crowd node (`crowd.test.cjs`) | **14/14** (was 11; +3 tests: F-5, F-6, F-7) |
| crowd exercise (browser) | **12/12**, zero page errors |

## BOUNDARY

Files changed — all inside the Wave-2 seats' own surfaces + Seat I's wiring layer, nothing else:
`wiring/stage.js` (F-1, F-9) · `wiring/locomotion.js` (F-8 documentation) · `wiring/exercise.cjs` (Seat I checks) · `camera-rig/camera.js` (F-2, F-3a, F-3b/F-4 notes) · `camera-rig/camera.test.cjs` (checks) · `crowd-life/crowd.js` (F-5, F-6, F-7) · `crowd-life/crowd.test.cjs` (tests) · `crowd-life/README.md` (scope sync).
**`avatars.js` untouched** — its `setTarget`/`moving` contract is documented and verified; the defect was the driver's read pattern and position rule, and that is where the fix lives. No shared Wave-1 file was modified.

## STATE OF THE WAVE-2 CLAIMS AFTER THIS PASS

- **Seat G — Camera Rig:** PASS stands; F-2 and F-3a closed with suite guards.
- **Seat H — Crowd Life:** the three unmet Run #3 adopt items (moving-pair separation, visitor hard floor, sim-level reduced motion) are now **built and suite-guarded**; the yield-hold exception to the visitor floor is a named design rule (correction 9), flagged here for the blind verifier's attention rather than buried.
- **Seat I — Pocket Escape:** the blocking F-1 is fixed at both halves of its root cause and re-proven in the critic's exact constructions; the feature now carries its own permanent exercise coverage (F-11 closed). The population claim no longer needs the "left-start lanes only" qualifier.

*End of fix-pass log. No code was deployed; the captain files; the blind verifier's retest targets are F-1 (exercise Seat I-C + the probe table above), F-5/F-6/F-7 (crowd tests), and F-2 (camera §5b).*

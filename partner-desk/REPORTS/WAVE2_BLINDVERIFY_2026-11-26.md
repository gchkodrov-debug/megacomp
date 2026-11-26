# WAVE 2 — BLIND VERIFICATION (Seats G · H · I + the Wave-2 fix pass)

**Date:** 2026-11-26 · **Seat:** Blind Verifier (fresh context; verified from the code and my own probes, never from the seats' claims)
**Fixed point:** `construction/camera-rig/` · `construction/crowd-life/` · `construction/wiring/` as they stand after `WAVE2_FIXPASS_2026-11-26.md`.
**Method:** every probe below is my own construction, written for this verification (`~/workspace/bv-wave2/`: `harness.cjs`, `p1`–`p7`), driving the real modules in Node (stage via a stub canvas/world through the renderer's own contract) and in the browser suites. The fix seat's probes were not reused. The relay critic's report was read only after my first-pass suspicions were formed from the code; its constructions were then re-run independently as regression cases. Grades are CONFIRMED / NEEDS-CHECK / REJECTED only. No code was changed; the three mutations in §3 were performed on a scratch copy and the copy was verified byte-identical to the originals after restore. Nothing deployed, $0.

---

## VERDICT

**YES — Wave 2 stands verified at mechanism level.** Every fix in the fix pass (F-1, F-2, F-3a, F-5, F-6, F-7, F-9, F-11) does what it claims, under my own constructions, including attacks the fix seat did not run. The blocking defect F-1 is dead at both halves of its root cause.

**Nothing blocks Seat J's mobilization.** Carried forward, named and non-blocking (details in §9):

1. **NEW confirmed defect (mine, not in the critic's list):** stage population bodies **strobe under reduced motion** — a stroll body teleports between its lane ends every frame, a cross body between its wings every frame.
2. **F-9's stated contract is broader than its mechanism:** the announcement debounce holds only while failures do not interleave; two bodies failing alternately re-announced **296 of 296** failures. The failure *record* is complete in all cases.
3. **F-10 composition** (one population authority, one transform authority, single z-sort) remains unbuilt — it is Seat J's booked first work, not a Wave-2 failure, and Wave 2 must not be quoted as pre-proving it.
4. Two NEEDS-CHECK observations for Seat J's composition: mixed-class crowd pairs overlap fully (documented scope, measured 0.0013), and the visitor floor's radial-first shove can displace a station body arbitrarily far along a corridor (44.5 weighted units measured; the floor itself never failed).

---

## 1 · F-1 — THE BLOCKING DEFECT (Seat I, population half) — **CONFIRMED FIXED**

**The critic's exact case, rebuilt by my hand** (Seat D `LIBRARY_SCENE` through the real stage, slot `stroll from 73.7 → to 52, d 0.85`, `_drivePopulation` at dt 1/30, 60 s):

| Measure | Before (critic) | Mine, after fix |
|---|---|---|
| Path length | 0.0000 | **242.27** |
| x range | 75.10..75.10 | **52.22..77.27** (both lane ends, ping-ponging) |
| Pocket escapes engaged | 0 | **2** |
| Failures surfaced | 0 (silent) | **0** (none occurred) |
| End state | frozen | mid-lane, `moving: true` |

My numbers reproduce the fix seat's to the digit — expected: the construction is deterministic, and three independent harnesses (critic, fix seat, mine) now agree on it.

**Attacks on the fix:**

- **(a) Mid-leg stall on a `from > to` lane — CONFIRMED.** My own construction: one rect dead ahead of an 80 → 20 lane at d 0.5, target directly behind it. The body wedged on the face, stall-stopped mid-leg (observed), and at every stop `legTarget` remained `toPt` — **no early flip, ever** (`flippedBeforeArrival: false`). It escaped (6 engagements over 90 s, counting later legs' wedges), arrived at `toPt`, and only then flipped. 0 failures.
- **(b) `from < to` lanes — CONFIRMED unchanged.** Plain lane: x 20.17..79.67, 0 failures. Same lane with the rect blocking it: x 20.17..79.68, 0 failures (escapes absorb the block symmetrically).
- **(c) Cross-mode body in the pocket — CONFIRMED.** A cross slot at the pocket depth (d 0.85) in Seat D's Library: 4 escape engagements, 0 failures, still crossing in the final 10 s of a 90 s run (max x 97.36 in that window) — never stranded.
- **(d) The `fresh` flag — CONFIRMED sound; the stranding suspicion is REJECTED.** The flag is cleared unconditionally on the first `_drivePopulation` call for every record, so no "never clears" path exists. The "clears too early" path was probed directly: five dt = 0 frames immediately after build — the walker's target was untouched (52, 0.912 before and after), and `moving` was already honest after the dt = 0 frames (walker.update computes `moving` from distance, independent of dt), after which the body walked the full lane (52.22..77.27, 0 failures).

## 2 · SEAT I — VISITOR PATH — **CONFIRMED**

Visitor placed at geometry **(0.474, 0.850)** in Seat D's Library (scene 73.7, 0.85), driven through the shared `createLocomotion` to (−0.52, 0.30):

- **Seat D's own obstacle set (depthThickness 0.06):** modes **`escape → route`**, arrival fired **exactly once**, failures **0**, **0 of 140** position samples inside any obstacle, minimum clearance to every obstacle **0.042** — exactly the body radius: legal contact, never penetration. Final error 0.0278.
- **The stage's default set (thickness 0.18):** the same start point sits inside the near table's padded span, geometry's route resolves the start out directly, and the drive completes as a plain route — arrival once, failures 0, 0 samples inside. The escape is load-bearing exactly where the pocket exists (0.06), and unnecessary where it doesn't (0.18). Both behaviours are correct; I record the distinction because "the pocket" is thickness-dependent.
- **Sealed target** (four-wall ring, target at its hollow centre): `goToWorld` returns **null**, `onFail` fires **exactly once** (`reason: 'unreachable'`, attempts 4), `onArrive` **0**, body displacement **0.0000**. A second identical `goToWorld` fails visibly once more — the locomotion layer has no debounce by design (each tap is a fresh fact); debouncing announcements is the stage's policy, tested in §4.

## 3 · SEAT I — EXERCISE COVERAGE (F-11) — **CONFIRMED REAL**

I read the four new checks (exercise.cjs, Seat I-A…D) and then tried to kill them: the full wiring exercise was run in a scratch copy of the tree (unmutated copy: **22/22**, so the environment is faithful), with one mechanism removed at a time. Originals were never touched; the copy was diff-verified identical after restore.

| Mutation (copy only) | Result |
|---|---|
| **M1** — visitor pocket escape removed (`goToWorld` never escapes) | **Seat I-A FAILS**: modes empty, arrived 0, failed 1, final err 0.7006. I-B/C/D unaffected — correct attribution. |
| **M2** — population pocket escape removed (`_engagePopulationEscape` finds nothing) | **Seat I-C FAILS**: the pocket stroll surfaces 2 stranded failures. I-A/B/D unaffected. |
| **M3** — the pre-fix stroll **position rule** restored (legTarget logic replaced) | **Seat I-C FAILS with the original defect's exact signature**: minX 75.1, reachedWest false, **failed 0** — the silent strand, invisible to everything except this check. |

The checks test what they claim, each bound to its own mechanism. F-11 is genuinely closed.

## 4 · F-9 — FAILURE DEBOUNCE — **RECORD CONFIRMED · ANNOUNCEMENT CONFIRMED FOR ONE BODY · CONTRACT LIMITATION CONFIRMED**

My own sealed lane (ring around geometry (0.1, 0.5); lane end (55, 0.5) is the ring's hollow centre; 90 s):

- **Recorded failures: 106 · canvas events: 1 · suppressed: 105** — and the split adds up exactly (`failedTargetCount = events + suppressedFailureCount`). `lastFailedTarget` carries the right reason (`population-stranded`) and slot. The record is complete; the single-body announcement behaves exactly as claimed. (The fix seat measured 70/1/69 on its construction; the behaviour class is identical.)
- **Interleave attack — the limitation is real.** Two sealed lanes in one scene (different slots, targets, speeds), 120 s: **296 recorded, 296 events, 0 suppressed** — the two bodies' failure cycles alternate, and because the debounce remembers only the single last-announced key, each body's recurrence re-announces after the other's. The fix log's wording — "the announcement fires once per distinct failure (reason + slot + target) per scene" — is **not true under interleaving**; it is true only for consecutive repeats of one failure. This is an announcement-spam defect, not a correctness one: no failure is ever hidden and no body strands. Graded **CONFIRMED (contract imprecision, non-blocking)**; the repair is a per-key announced-set per scene instead of a single last key.
- Stage-level visitor failures pass through the same channel cleanly (sealed tap through a real stage: null return, recorded 1, events 1, reason `unreachable`) — my suspicion that the debounce key might crash on a slot-less visitor failure (target `.z`) is **REJECTED**: every failure producer passes a geometry target, and the probe ran it.

## 5 · SEAT G — F-2 / F-3a + SPOT-CHECKS — **CONFIRMED**

- **F-2:** my own rail-settled state, built in true cover mode (no focal box; portrait 375×812 → viewW 0.3079): centre settles at **0.8461**, right edge 1.0000 — the critic's numbers. `setViewport(1280×720)`, then `state()` **before any update**: centre **0.5000**, right edge **1.0000** — in-plate from the instant of the re-solve. A subsequent dt = 0 update leaves it at 1.0000. Reverse direction (desktop → portrait): edges 0.3461..0.6539, in-plate. A tighter-bounds `setScene` from the rail state clamps the centre to 0.60, inside the new bounds, immediately.
- **F-3a:** `solveFraming` with no authored focal box → `primaryFitsAtCover === null` (mode cover), both directly and through `rig.state().framing`; an authored box that fits → `true`.
- **Rails:** a driven chase (sinusoidal subject, 2,400 frames each) in portrait (x rail) and landscape (y rail): worst centre-range violation **0** in both orientations.
- **Sway zero-lock:** under `setReducedMotion(true)`, `state().sway` is exactly `{0, 0}` on all 120 sampled frames.
- **F-3b / F-4 (documentation-only):** the scoped dt-invariance wording and the sway-past-the-rail note are present in camera.js's header as the fix log describes — the shipped text no longer overclaims.

## 6 · SEAT H — F-5 / F-6 / F-7 — **CONFIRMED**

- **(a) F-5, mover/mover head-on, 10× the suite's span:** two chain inhabitants on one lane (20 ↔ 80 at d 0.6), **400 s** (the shipped construction runs 40 s): minimum post-step distance **0.0900** — the floor, never below — and the maximum gap between chain advances was **7.3 s for each body** (a leg takes ~7.5 s), i.e. both chains advance continuously for the full 400 s. The fix seat's first-attempt deadlock (permanent face-off) does not exist in the shipped version. **CONFIRMED.**
- **(b) F-6, visitor floor:** visitor driven straight through a non-yieldable stationed reader: minimum approach **0.0900**, visitor completes its drive (arrived at 5.23 s). Furniture-cornered variant (reader authored inside the wiring Library desk footprint; home resolved onto the desk's north face at scene (52, 0.682)): minimum **0.0900**, visitor crosses. **CONFIRMED.**
  - **Home-return scope, pinned down:** during a through-pass the radial-first shove *snowplows* the reader ahead of the visitor — displacement up to **44.5 weighted units** in my corridor construction. Once the visitor vacates the home line (removed, or parked off-line at d 0.78), the reader walks home to **0.1525 weighted** (≈ 0.003 geometry — the fix seat's "< 0.01" holds). Only while the visitor remains parked exactly on the home line does the reader hover displaced — which is the code's own documented "hover at the floor" case. The floor claim is confirmed; the displacement magnitude is a **NEEDS-CHECK for Seat J** (composition judgment: radial-first vs lateral preference in corridors), not a defect against F-6's claim.
  - **The named exception behaves exactly as documented:** reader slotted between two rects so both lateral step-asides land in furniture → `yield-hold` fires **exactly once**, `yieldHeld` true, reader displacement **0.0000** across the whole approach (the floor never shoves him), the visitor passes through him (min distance 0.0018) **only while held** (`overlapOnlyWhileHeld: true`), completes in **2.73 s** (no deadlock), and `yieldHeld` resets once the visitor clears. **CONFIRMED.**
- **(c) F-7, crowd reduced motion:** after 1.3 s live, `setReducedMotion(true)` and 2 s of further updates with the visitor stepping up to a proxemic station: `crowd.t` **bit-identical** (1.3000000000000007), station phase **bit-identical** (0.22127137322511), chain body position/state/index **identical** — while gaze **acquired** and a whisper **fired** with the crowd frozen (proxemics live, as documented). Unfreezing resumes time and phases cleanly. **CONFIRMED.**

## 7 · REGRESSIONS — ALL SUITES RE-RUN BY MY HAND — **CONFIRMED**

| Suite | Result |
|---|---|
| world-engine (`world-engine.test.cjs`) | **81/81** |
| geometry (`geometry.test.cjs`) | **75/75** |
| avatar (`avatar-system.test.cjs`) | **17/17** |
| manifestation (`manifestation.test.cjs`) | **24/24** |
| wiring exercise (browser) | **22/22**, zero page errors |
| camera node (`camera.test.cjs`) | **68/68** |
| camera exercise (browser) | **11/11** |
| crowd node (`crowd.test.cjs`) | **14/14** |
| crowd exercise (browser) | **12/12**, zero page errors |

Every count matches the fix log's regression table exactly.

## 8 · BOUNDARY — **CONFIRMED CLEAN**

Mtime scan of the whole `living-universe` tree: the fix-pass window (07:32–07:36 UTC, 2026-11-26) contains **exactly the eight files the fix log declares** — `wiring/stage.js`, `wiring/locomotion.js`, `wiring/exercise.cjs`, `camera-rig/camera.js`, `camera-rig/camera.test.cjs`, `crowd-life/crowd.js`, `crowd-life/crowd.test.cjs`, `crowd-life/README.md` — plus regenerated exercise frame PNGs (outputs, not sources). **`avatars.js` is untouched** (06:32 UTC, Wave-1 era), as the fix log states; every Wave-1 surface (world-engine, geometry, avatar-system, manifestation, engine/, prototype) predates the window. No unrecorded modification.

**Wave-1 hosts still boot:** the cinematic-library demo exercise, run against the real tree with the fixes in place, exits 0 — zero page errors, film playing (readyState 4, time advancing), click-walk moves the visitor and Solnik follows, the D-1 through-table route arrives with 0 samples inside the table (arrival error 0.033), population alive and changing, manifestation separates into 8 parts with 0 px² overlap, mobile scrubber steps with no overflow. The wiring demo likewise (22/22 in §7).

## 9 · FINDINGS CARRIED FORWARD (none blocks Seat J's mobilization)

1. **CONFIRMED defect — stage population strobes under reduced motion** (new; found by my suspicion probe, absent from the critic's list and the fix pass). With the walkers' reduced-motion flag set — exactly what `stage._applyReducedMotion` does in the real host — a stroll body (lane 30 → 70 at d 0.4) sat at **70, 30, 70, 30 …** on consecutive frames, and a cross body at **−12, 112, −12, 112 …**: 119 full-lane teleports in 120 frames, each. Mechanism: an RM walker places itself on its target and reports `moving: false`; the stroll/cross drivers read `!moving` as "arrived" and flip the target every frame. The visitor's RM law (placed per tap, never glided) is not the problem — the population drivers have no RM state of their own. Under the house's reduced-motion discipline this is a frame-rate flicker in any scene with stroll/cross population. It falsifies no Wave-2 claim (none covered RM population behaviour) and does not block Seat J from starting; it belongs on the fix queue before any composed host ships RM population. (Seat H's crowd, by contrast, freezes correctly — §6c.)
2. **CONFIRMED contract limitation — F-9 debounce under interleaving** (§4): announcement is once-per-distinct-failure only for consecutive repeats; alternating failures re-announce every time (296/296). Record completeness is unaffected. Repair: remember announced keys per scene, not just the last one.
3. **F-10 composition — unbuilt, as booked.** Two population authorities (stage `view.population` vs crowd `smartSlots`) and two transform authorities (camera `project()` vs the stage's layered mapper) coexist; no host consumes camera or crowd yet. This is Seat J's first work item per the critic's fix list #9; Wave 2's verification says nothing about the composed whole, and Seat J's Five Proofs remain entirely to be proven there.
4. **NEEDS-CHECK — mixed-class crowd pairs:** a chain-mover whose lane crosses a stationed inhabitant passes through him (minimum distance **0.0013** over 60 s in my construction). This is documented scope in crowd.js (same-class pairs + the visitor floor only; mixed pairs left to routing, and routing cannot see inhabitants), so it is not a claim violation — but Seat J's composition must not assume pairwise separation across classes.
5. **NEEDS-CHECK — visitor-floor displacement magnitude** (§6b): the floor holds everywhere, but radial-first shoving displaces a station body up to 44.5 weighted units along a corridor before it can come home. A composition-quality question for Seat J, with the numbers above.
6. **Standing items unchanged:** the camera settle-time judgment (≈0.93 s vs the dossier's 500 ms estimate) remains a visual question for Seat J + the founder's device session, per the partner ruling — not a defect. The `onSettle` callback split (F-8's deferred half) remains a Seat J decision, as the fix log states.

## REJECTED SUSPICIONS — KEPT ON RECORD

- **A `fresh`-flag path strands a body** (flag never clears, or clears into a re-aim): **REJECTED** — the clear is unconditional in code, and the dt = 0 probe (§1d) shows the target kept and `moving` honest.
- **`_surfaceFailure` crashes or mis-keys on visitor failures** (no slot; target shape): **REJECTED** — stage-level sealed tap recorded and announced correctly (§4).
- **The pocket escape is a thickness-0.06 artefact only:** **REJECTED as a concern** — under the stage's default 0.18 set the same start routes directly with identical guarantees (§2); the escape engages exactly where the pocket geometry exists.
- **F-5's lateral push is a one-construction cure:** **REJECTED** — 400 s of repeated head-on crossings, both chains advancing throughout (§6a).

---

*End of blind verification. Probes: `~/workspace/bv-wave2/` (harness + p1–p7 + mutation tree, restored byte-identical). No code changed, nothing deployed, $0. The captain files.*

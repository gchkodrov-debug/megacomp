# TRACK 7 · PHASE 0 — GRADING RECORD

*Graded 2026-11-23 by the captain under the Mastery Standard and
Relay Law, after the Phase 0 opening run (`TRACK_7_PHASE_0_RUN.md`).
Grading workspace: `track7-artifacts/grading-phase0/` (evidence,
per-seat grades, probes, the grader). Method: two fresh-context
independent review axes (Promise and House, per the Two-Axis
Independent Review skill — reviewers never saw the producer's
reasoning; findings graded CONFIRMED / NEEDS-CHECK / REJECTED with
rejected findings kept), the captain's own runtime probes, one fix
round inside the loop, and a fresh re-review of the fixed axis.
No bar was lowered. No number in this record was invented: every
figure was measured in this run or is quoted from a filed artifact.*

---

## 1 · THE M0 BLIND EXAM — **PASS**

**The bar (launch package):** a grader with no background can
answer what each of the six website kinds is and when to use it,
from the page alone; any kind misexplained = fail.

**Evidence:**
- *Promise axis (fresh context):* all six kinds present as
  genuinely live miniatures — the GSAP dot and CSS sun measurably
  move, the video plays (readyState 4, currentTime advancing), the
  particles canvas animates, the 3D readout shows 2 live draw
  calls with changing screenshots, the hybrid scrub steps progress
  3%→100% with stage callouts changing. The quiz's own answer keys
  independently verified correct (scored 6/6 through the page's own
  form). Checkable claims exact: clip sizes 247,497 / 594,087 bytes
  match disk; ffprobe confirms VP9/H.264, 640×360, 30 fps, 6 s;
  48 frames on disk.
- *Captain's probes:* the teach-back form refuses an untouched
  submission and an all-wrong submission with a readable message
  ("0 of 6 — the explanations under each question are the page
  correcting itself") and accepts all-correct ("6 of 6 — the page
  taught it"); keyboard walk complete (every interactive element
  reachable, focus visible); zero console errors; no horizontal
  overflow at 390/768/1280.
- *Defects found against the page and fixed in the loop:* the FPS
  meter printed two different statistics under one label (a single
  frame's interval beside a windowed average) — now both numbers
  come from the same window; the machinery readout's one-line
  formula misdescribed the mechanism — now the target formula and
  the chase are stated separately; the hybrid loader had no failure
  path — a failed frame now names itself in the readout; three
  inline `style=` attributes moved to classes; one teaching
  sentence overstated a frame-rate threshold ("below roughly 24,
  motion stops reading as motion") — corrected on both pages.
- *Re-review:* a fresh House-axis reviewer re-verified the M0
  fixes at runtime — 11/11 items CONFIRMED-FIXED across both
  artifacts, no regressions.

## 2 · THE M1 BLIND EXAM — **PASS**

**The bars (launch package):** the components are genuinely reused
(not copy-paste); keyboard-complete navigation; zero console
errors.

**Evidence:**
- *Promise axis:* all three bars CONFIRMED — one `wireJourney`
  implementation driven twice with different configurations; no
  draw/cover-fit math outside the player; CSS reuse by @import
  only; a second product by configuration proven twice on the page
  and a third time by the reviewer with new beats and config, zero
  errors; the tab walk complete (skip link first, then nav,
  controls, radio groups, submit — no traps); zero console errors
  through load, interaction, journeys, and reduced motion.
- *House axis:* the bars hold, and eight CONFIRMED defects against
  the crew's own rules were found, fixed, and re-verified (§4).
  The worst: the exam site's readouts recomputed the target frame
  with the page's own formula instead of reading the player's
  state, so on the thinned play order the printed target and the
  drawn frame disagreed (16 vs 17, runtime-proven by the axis).
- *Verification suite:* the builder's `verification/verify.mjs`
  re-run three times in this grading — 36/36 before the fix round,
  36/36 after it (captain), 36/36 again by the re-reviewer.

## 3 · PROJECT 1 — **SHIPPED**

The Engine skeleton and its exam site were built in the opening
run and stand re-verified at 36/36 after the grading fix round.
Post-fix file hashes are filed in §7.

## 4 · DEFECTS AND DISPOSITIONS

**House axis — CONFIRMED 14 (8 violations, 6 upheld) · NEEDS-CHECK
5 · REJECTED 5.** Full report:
`grading-phase0/evidence/axis-house-report.md`.

| # | Defect | Disposition |
|---|---|---|
| H-1 | Readouts recomputed the target frame (wrong under the thinned order; hard-coded denominators) | **FIXED** — the player now exposes `targetFrame` through its own order; readouts bind to `state()` verbatim, denominator = `orderLength`. Re-proven in the axis's own scenario (31-entry order: target/shown/readout all 17, denominator 31) |
| H-2 | GSAP Replay animated fully under prefers-reduced-motion | **FIXED** — replay duration is 0 under reduced motion; re-review sampled the dot at its final position 350 ms after click, on both pages |
| H-3 | No `onerror` anywhere — a failed frame settled silently | **FIXED** — the player records failures, warns with the frame named, and the readout shows "N frames failed to load"; the M0 loader names failures in its readout too (re-review: aborting one frame printed exactly that) |
| H-4 | Callout content invisible with JavaScript disabled | **FIXED** — callouts are visible by default in CSS; the script marks the beats live (`.cl-live`) before hiding them for the fade (re-review: JS off → all 8 callouts opacity 1) |
| H-5 | Inline `style=` attributes on both pages (3 each) | **FIXED** — moved to classes; re-review grep: zero in both live pages |
| H-6 | Smoothness asserted without a measured number ("buttery") | **FIXED** — the claim now carries the verification run's measured figure (a jump to 81% of a journey passed through 35 distinct displayed frames); the player comment and README carry the same anchor |
| H-7 | Callout tip/span validation checked finiteness only, while its error messages promised 0..1 | **FIXED** — ranges enforced; re-review: tip "1.4,0.5" and span to=1.5 both throw the named `CalloutConfigError` |
| H-8 | Reduced-motion CSS needed `!important` to fight per-frame inline opacity | **FIXED** — `update()` never writes under reduced motion and `.cl-live` is never added there; both `!important`s removed; reduced presentation re-verified |
| H-15 | Per-frame layout reads in the chase loop (representative trace not taken) | **NEEDS-CHECK stands** — carried into M13, whose subject is exactly this; does not block the stated M1 bars |
| H-16 / P-F3 | The 3D demo's drag is pointer-only (both axes, fact CONFIRMED) | **Bar-breach REJECTED, fact carried** — captain's ruling: the M1 bar is keyboard-complete *navigation*, and navigation plus every control is keyboard-complete (both axes verified). A teaching-demo canvas is a display surface, not a control. Recorded as a binding requirement for M9: a real product viewer owes keyboard orbit |
| H-17 | M0 meter's mixed statistics; "live" draw-call label | **FIXED** (same-window meter; label corrected to "The renderer reports") |
| H-18 | M0's printed formula vs its own code | **FIXED** (see §1) |
| H-19 | Lifecycle gaps (reduced branch had no resize handling; `destroy()` incomplete) | **PARTLY FIXED** — the reduced branch now observes resize and redraws; `destroy()` completeness carried as a note for the M4 lifecycle pass |
| H-9…H-14 | Six claims examined and upheld (no `currentTime` scrubbing; product-agnostic engine; focus-visible; engine-level reduced motion; honest codec byte counts; typed config errors) | No action — the upheld evidence is part of the exam record |
| H-20…H-24 | Five suspicions rejected by the axis itself (video scrubbing; product leakage; silent catches as charged; missing focus styles; reduced-motion auto-play) | Kept on record per the skill |

**Promise axis — CONFIRMED 9 (7 promises verified true, 2
defects) · NEEDS-CHECK 4 · REJECTED 2.** Full report:
`grading-phase0/evidence/axis-promise-report.md`.

| # | Item | Disposition |
|---|---|---|
| P-F9 | Exam-site readout 1,158 px wide at a 390 px viewport, clipped at 768 too — the player's numbers unreadable on phone/tablet | **FIXED** — the readout wraps within the stage (re-probe: inside the stage at 390 and 768) |
| P-F10 | "Below roughly 24, motion stops reading as motion" — a dubious simplification | **FIXED** — corrected on both pages (motion breaks into stills near ten pictures a second) |
| P-F11 | The hybrid sections cite the Mint page's 235 frames, unverifiable from these artifacts | **NEEDS-CHECK stands as an observation** — the figure is receipted in this university's own Mint exam record (`EXAM_ARTIFACT_1_CWV_FIX_RECORD.md` and the specimen's verification); it is an illustrative example, and the hybrid kind is defined independently and correctly on the page |
| P-F12 | "Original website" vs the exam site being a declared rebuild of the M0 content | **Ruled: promise met** — Project 1's own design makes the rebuild the second-product proof; the machinery is the original work, and the site declares the rebuild in its own header. Observation kept |
| P-F13 | Component header comments mention an unnamed "specimen" | **Ruled: passes** — no product name, fact, or file name appears (the axis's own grep, F6); the comments are honest inheritance records |
| P-F14/F15 | Two suspicions rejected by the axis (skip link; decorative hybrid) | Kept on record |

**Re-review (fresh House-axis seat, post-fix): 11/11
CONFIRMED-FIXED, no regressions** — report:
`grading-phase0/evidence/axis-house-rereview.md`. One minor
observation of its own: the readout's loaded counter refreshes on
draw events and can lag the true count transiently during preload
(it converges and reads exact at completion). **Disposition:
accepted and logged** — a polish item, not a blocker; the counter
is exact whenever the player draws.

## 5 · THE FLOOR CHECKS — PER-SEAT VERDICTS

Instrument and full evidence: `TRACK_7_PHASE_0_FLOOR_CHECKS.md`
(§C). One unseen page for every seat (MDN, "How the web works");
the captain's answer key was written from the page before any seat
ran. F2 artifacts were graded by running them.

| Seat | F1 | F2-1 page | F2-2 fetch | F2-3 state |
|---|---|---|---|---|
| Opening seat (captain's crew) | RUN (self-administered) | RUN — see the §6 ruling | RUN — pass | RUN — pass |
| Claude Code | **FAIL** — trap taken, 1 missing | pass | pass | pass |
| Pi | pass 10/10 | pass | pass | pass |
| Codex | **FAIL** — trap taken, 1 missing | **FAIL** — email regex double-escaped | pass | pass |
| OpenCode | pass 10/10 | pass | pass | pass |
| OpenClaw | pass 10/10 | pass | pass | pass |
| Hermes | **FAIL** — trap taken, 1 missing | **FAIL** — malformed email never reaches #form-error | pass | pass |
| kimi-k2.7-code | pass 10/10 | pass | pass | **FAIL** — temp-path bug, crashes |
| glm-5.3 | pass 10/10 | pass | pass | pass |
| kimi-k3 | pass 10/10 | pass | pass | pass |
| kimi-k2.6 | pass 10/10 | pass | pass | pass |
| deepseek-v4-pro | pass 9/10 (noted) | **FAIL** — reply truncated, page incomplete | pass | pass |
| minimax-m3 | **FAIL** — trap taken | pass | pass | pass |
| mistral-large-4 | pass 10/10 | pass | pass (re-ask after a door error) | pass |
| GPT flagship | pass 10/10 | pass | pass | pass |
| Grok | **FAIL** — trap taken | **FAIL** — malformed email never reaches #form-error | pass | pass |
| Gemini free tier | NOT RUN — fenced (research drafts only) | NOT RUN — fenced | NOT RUN — fenced | NOT RUN — fenced |

**The pattern worth naming:** the F1 trap is the concept list's
near-duplicate pair — #3 "programming" vs #11 "a programming
language". The page teaches the languages; five seats folded them
into an entry headed "Programming" and asserted it as taught. The
F2-2 honest fetch passed **15 of 15** administered seats; F2-3
failed once (a real path bug); F2-1 failed four times, each with a
verified mechanism (two native-validation interceptions, one
double-escaped regex, one truncated delivery).

## 6 · F2-1 — THE SETTLEMENT RULING (captain)

The A-to-Z assignment's exact clauses: a complete responsive page
(header, three sections, a form that validates), written without
generated code, **committed to git with honest messages**; the
check is three-width rendering plus a form that refuses bad input
with a readable message. The opening run administered it to the M0
page under a flagged reading. Ruling, clause by clause:

1. **The page clauses — satisfied on evidence.** Header present,
   ten sections, a real `<form>`; 0 px horizontal overflow at
   390/768/1280 (captain's probe, this grading); the form refuses
   untouched and all-wrong submissions with a readable message and
   accepts all-correct.
2. **"Written without generated code" — the flagged reading is
   ADOPTED.** For an AI crew the administrable reading is *written
   from fundamentals — no framework, no code-generation pipeline,
   no copied template* — and the M0 page meets it (hand-written
   semantic HTML, one hand-written stylesheet, hand-written JS).
   The literal reading would make the assignment unpassable by any
   AI seat, including the opening one; the flagged reading was
   recorded in the opening run *before* grading, not invented
   after it.
3. **The form's shape — substance governs.** The assignment says
   "a form that validates"; the M0 page's form is a teach-back quiz
   rather than a data-entry form. What the check tests — input
   validated, bad input refused with a readable message — is met
   and measured. Ruled satisfied.
4. **The git clause — CANNOT be satisfied here, recorded as an
   open structural gap.** The university folder is not a git
   repository (verified in the opening run), so no artifact in it
   can be "committed to git with honest messages". This is a gap
   in the environment, not in the artifact. F2-1 is passed on every
   checkable clause; the git clause stands open until the
   university folder lives in a repository, and it is recorded
   here rather than silently approximated.

**F2-1 (opening seat): PASS on the checkable clauses under the
adopted reading; git clause open.**

## 7 · PHASE 0 EXIT GATE — **PASS**

The launch package states the gate exactly: *"M0 and M1 exams
passed blind; Project 1 shipped."*

- M0 blind exam — **PASS** (§1).
- M1 blind exam — **PASS** (§2).
- Project 1 — **SHIPPED**, re-verified 36/36 (§3).

**Ruling: PHASE 0 EXIT GATE — PASS**, under the launch package's
definition.

What this ruling does **not** claim, stated plainly so the record
cannot be over-read:

- Under the A-to-Z floor definition of Phase 0, the floor has now
  been *examined* — 16 of 17 seats administered (the opening seat
  plus 15 in this grading). The per-seat failures in §5 stand as
  those seats' report cards; their re-sits belong to each chair's
  weekly objective cycle (the A-to-Z shape the floor-check record
  already schedules), not to this gate, which the launch package
  does not condition on per-seat floor passes.
- One seat remains NOT RUN: the Gemini free tier, fenced by the
  router to research drafts. Recorded as fenced, not failed.
- The F2-1 git clause (§6.4) remains an open structural gap.
- Carried items: H-15 (per-frame layout reads) into M13; the
  keyboard-orbit requirement into M9; `destroy()` completeness
  into M4; the readout counter's transient lag as a polish note.
- Phase 0 passing is **not** Track 7 graduation. Phases 1–5 and
  the §26 final exam remain, under George's gate order: graduation
  first, then website building.

**Post-fix artifact hashes (sha256, the state the re-review
graded):**

```
8a725f5b30581778df4ffaa41212acb3c45e521cb162687ef178702a4bcd79f0  m0-how-the-web-works/index.html
86dc4a84024d18c0a542d71c25544b55a7dc8f0349e22dc02fe4fa16df8fcda2  project-1-engine-skeleton/engine/components/scroll-sequence-player.js
b24a698d561e25e7ba61abb0db5953481bb06173c4237469b572937f9f4f8985  project-1-engine-skeleton/engine/components/callout-leaders.js
129451b4c075879e510e3d1d227aaa13c5fc3a0f71d7184849c3c316ea501b86  project-1-engine-skeleton/engine/components/callout-leaders.css
58f2bdf4af9b4f36ca61d0217e5cde7c90c527d3261b533f96bb72b54f28aa37  project-1-engine-skeleton/exam-site/index.html
c3ae4b38a2fae2c52db9973e9f8962009c7c34294f55516e6c275efbc6d96faf  project-1-engine-skeleton/exam-site/site.js
2f02ea721dfc50fafc3479e9e1650fd9d5a6877beffdd949e0f5afed4d29812e  project-1-engine-skeleton/exam-site/site.css
47e66bfbb7b9685b85ac1241e6a032ac28220240db80a2f0345eb7a37f1b021b  project-1-engine-skeleton/README.md
```

*Evidence index: `track7-artifacts/grading-phase0/evidence/`
(axis-promise-report.md · axis-house-report.md ·
axis-house-rereview.md · probe-keyboard-f21.mjs ·
probe-f21-form.mjs · probe-fixes.mjs · results-grading-rerun.json
· results-postfix-rerun.json · results-builder-filed.json) and
`track7-artifacts/grading-phase0/seats/` (raw replies, produced
files, grade.json + f1-grade.json per seat).*

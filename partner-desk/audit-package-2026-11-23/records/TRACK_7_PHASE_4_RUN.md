# TRACK 7 — PHASE 4 RUN RECORD

*Modules: M15 (the Engine assembled) · M17 (the seven
architectures + §21 studies). Project 11 (hybrid) graded
under M16's QA harness. Run 2026-11-23. The blind verdicts
and the exit-gate ruling live in
`TRACK_7_PHASE_4_GRADING_RECORD.md`.*

## What was built

**Project 11 — the hybrid page** (`project-11-hybrid/`):
M8's Lumen №1 in three media on one product — the Engine
viewer in place over the lamp's GLB (§1), M8's film with
descriptive captions naming its acts (§2), and a
120-frame scroll sequence converted from M8's renders
with its callouts generated from the page's single config
module (§3). Frames: desktop set 424,608 B, mobile set
175,788 B — far inside the standing budgets. Own harness
13/13. Under the QA harness (budgets declared before the
run, M16's values): unit 5/5 · e2e PASS · visual PASS
(0.029% vs its filed baseline, baseline reported as its
own step) · a11y PASS (computed body contrast 14.65:1) ·
**perf FAIL on the long-task total alone** — see
`project-11-hybrid/qa/QA_RESULTS.md` for the full
attribution (sequence-only variant 0 ms; a separate
phase-split probe run attributes ≈6.5 s to one-time
startup in a software-rendered lab and ≈4.1 s to
on-screen windows; the graded total fell 18,358 →
9,562 ms with the fix — provenance in the QA filing)
and the scope referral to the
captain. No budget was changed after the run that failed
it.

**The Engine package** (`engine-package/`): assemble.mjs
+ package/ (46 files in the manifest, every file's source
and sha256 recorded) + INSTALL.md + BUILD_A_PAGE.md.
Templates A–G authored in-package; budgets.json and the
accessibility layer authored as package documents. Two
component fixes landed through use: the viewer's
visibility pause (regression-proven P5 10/10, P11 13/13)
and the QA harness's media MIME types (M16 exam re-run
8/8 after the fix).

**M17** (`m17-architectures/`): ARCHITECTURES.md (seven
architectures × the directive's ten questions),
DEMONSTRATIONS.md (the map + fresh re-runs: P3 19/19 ·
P4 4/4 · P5 10/10 · P6 8/8 · P7 13/13 · P8 17/17),
studies/STUDIES.md (Apple AirPods Pro · Why Zero ·
fromanother.love — method on the filing's face, claims
labelled observed/reported) and studies/technique-
demos.html with verify-demos.mjs (6/6).

**Records:** book instalment (M15 + M17, each ending FOR
GEORGE — WHAT I NOW KNOW) · rules instalment 6 (Rules
32–38) · the Engine README's Phase 4 section.

## The blind-install exam

**PASS — fourth sitting** (fresh builders throughout;
3m54s · 3m41s · ~3.3 min · 3m17s). Sittings 1–3 each
shipped a fully working page and filed documentation
gaps (4 · 4 · 5 recorded, of which the confirmed were
fixed between sittings — including a parity contradiction
between the build guide and the accessibility layer, and
the guide's worked example replaced when it was found to
pre-answer the exam's own client). Sitting 4 recorded
three items, all graded REJECTED with reasons on the
record (each answer was in the documents, or is builder
judgment the documents correctly leave open). The
passing site is preserved at `grading-phase4/
exam-attempt-4/` and was verified captain-side
independently (120/120 frames, 6 callouts, zero errors;
alternative page: 6 sections, 0 scripts). Full filings:
`grading-phase4/EXAM_ATTEMPT_1.md` … `EXAM_ATTEMPT_4.md`.

## Carries honoured

- Phase 1's gate: untouched. No Flow access attempted;
  the M6 gap is carried, nothing more.
- The M13 app.js watch item (filing maxima vs the gate's
  ceiling): untouched by this phase; stands as filed.
- F-P3-2 / M13-1 method discipline: Project 11's perf
  filing is a labelled local lab trace; the one scope
  question it raised is referred, not resolved by the
  crew.

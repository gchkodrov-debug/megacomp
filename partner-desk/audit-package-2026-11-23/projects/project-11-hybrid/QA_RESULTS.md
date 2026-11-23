# PROJECT 11 — QA RESULTS (the house harness, all five gates)

*Target: `project-11-hybrid/` · Harness: the Engine's QA
harness (`engine/qa-harness/`), config in `qa/qa.config.mjs`,
runner `qa/run-qa.mjs`. Raw reports: `qa/results-baseline.json`
(the baseline run) and `qa/results-graded.json` (the graded
run). All performance figures are labelled local lab traces
(captain's F-P3-2 ruling) — this page is undeployed, and no
live filing exists or is claimed.*

## The graded run

| Gate | Status | Evidence |
|---|---|---|
| unit | **PASS** | 5/5 specs against the page's own `page-config.js` — parts counted honestly, model facts equal to the cleanup gate's filed numbers, both frame sets inside the Track 5 budgets, six callouts naming real parts in sane windows, the film's acts contiguous and complete |
| e2e | **PASS** | 6/6 journey steps + zero console/page errors — preset click lands its inspect line, the film is clickable, the journey and its canvas stand visible |
| visual | **PASS** | diff ratio **0.029%** against the filed baseline (tolerance 1.00%; the figure is the raw report's own, `qa/results-graded.json`). The baseline was written by the baseline run and reported there as BASELINE-CREATED — a decision, not a pass (Rule 30) |
| a11y | **PASS** | 7/7 — language declared, every role=img named, every img alted, controls labelled, one h1 with no skipped levels, computed body contrast **14.65:1** |
| perf | **FAIL — one check** | layout reads **24** ≤ 50 ✓ · CLS **0** ≤ 0.1 ✓ · LCP **224 ms** ≤ 2500 ✓ · **long-task total 9,562 ms > 250 ms budget ✗** |

## The long-task finding, attributed by measurement

The first graded run reported **18,358 ms** (the runner's
console output; that run's raw JSON was overwritten by the
post-fix graded run, because the runner writes one report
file per mode — a filing weakness recorded here openly.
The filed raw totals are: baseline run **17,966 ms**,
post-fix graded run **9,562 ms**). Attribution probes
(page variants with one medium removed, same journey)
isolated the source: the sequence player alone produced
**0 ms**; the 3D viewer alone reproduced the figure. Two
costs:

1. **Off-screen rendering (fixed).** The viewer rendered its
   auto-rotating scene continuously, including the whole time
   its stage was three sections off screen. The Engine
   component now pauses rendering while its canvas is not
   intersecting the viewport (Phase 4 fix in
   `engine/3d-viewer/viewer.js`; Project 5's harness re-run
   after the change: 10/10, no regression). Long-task total:
   18,358 → **9,562 ms**.
2. **The residual is startup + visible-window rendering
   under software GL.** A phase-split probe — a separate
   run with its own total (≈10.6–10.8 s; bench weather
   moves these totals from run to run, so the split is
   evidence about *where* time sits, not a partition of
   the filed 9,562 ms — found ≈6.5–6.7 s in 4–5 tasks
   before the journey begins (the vendored Three.js
   parse, the GLB parse, the one-time PMREM environment
   build, the first renders) and ≈4.1 s accruing across
   the journey's windows where the hero is legitimately
   on screen, at ~150–250 ms per software-rendered frame.
   The lab's WebGL is SwiftShader (its own console
   warning says so); on GPU hardware these are the costs
   Project 5 measured as a working viewer with an FPS
   ledger, not long tasks.

**Disposition: the FAIL stands as filed, and the scope
question is referred to the captain** (the M13-1 shape): the
250 ms total-long-task budget was calibrated on Project 9, a
page with no WebGL stage. Whether a hybrid page's perf gate
is judged on the whole-window total — which, in a
software-rendered lab, no continuously-presented WebGL stage
can meet — or on the journey-phase waste the budget exists
to police (measured here: the off-screen share, now zero),
is a ruling, not a fix. No budget in `qa.config.mjs` was
changed after the run that failed it.

---

*Post-grading amendment (2026-11-23, fix wave — see the
amendments ledger in `grading-phase4/FROZEN_SET.md`):*
*(1) The visual figure in the table above was corrected
from 0.015% to the raw report's own 0.029%, and the
attribution below it restated with its provenance (the
first graded run's 18,358 ms was console-reported; its
JSON was overwritten by the post-fix run — the filed raw
totals are the baseline run's 17,966 ms and the graded
run's 9,562 ms; the phase-split is a separate probe run's
split, not a partition of a filed total). (2) The page
gained its complete alternative presentation
(`accessible.html`, verified 13/13 by
`accessible-verify.mjs`, parity-checked against
`page-config.js`) and a header link to it; the added link
made the page 65 px taller, so the visual baseline was
re-taken after the fix and reported as BASELINE-CREATED
above — the graded results on file remain the pre-fix
run's, and the perf disposition is unchanged.*

---

*Post-grading amendment 2 (2026-11-23, completion grading —
both blind axes + the coordinator; see the amendments
ledger in `grading-phase4/FROZEN_SET.md`, Wave 2):*

*(1) Baseline provenance, corrected. The "filed baseline
run 17,966 ms" named above traces to no raw report on
disk: the runner writes one report file per mode, and the
fix wave's baseline re-take overwrote the original
baseline report. The `qa/results-baseline.json` on disk
(long-task total 9,476 ms, mode "baseline", visual
BASELINE-CREATED) IS that post-fix re-take — a
BASELINE-CREATED decision taken in the fix wave because
the accessible fix made the page 65 px taller, filed here
as a decision of its own (Rule 30). Consequence, stated
plainly: the graded run's visual PASS (0.029%) was
measured against the original pre-fix baseline and
cannot be re-derived from the artefacts as they stand;
item (3) below supersedes it with a genuine comparison.*

*(2) The budgets, quoted from `qa/qa.config.mjs` (the
file's hash matches the frozen set; no budget was ever
changed): layout reads ≤ 50 · long-task total ≤ 250 ms ·
CLS ≤ 0.1 · LCP ≤ 2500 ms.*

*(3) A single-vintage full run over the final page
(completion grading, 2026-11-23; raw report filed as
`qa/results-final.json`): unit PASS · e2e PASS · visual
PASS — diff ratio 0.024% against the re-taken baseline,
its first genuine comparison · a11y PASS · perf FAIL on
the long-task check alone — total 9,133 ms (bench
weather moves this figure; the graded run's 9,562 ms
stands untouched in `qa/results-graded.json`), layout
reads 24 ≤ 50, CLS 0, LCP 268 ms. Under the CAPTAIN'S
RULING — P11 PERF SCOPE (2026-11-23), quoted verbatim in
`TRACK_7_PHASE_4_GRADING_RECORD.md`, the perf leg counts
as met for the Phase 4 gate on the waste measures, with
the 9,562 ms whole-window total standing as a labelled
software-GL lab figure; a real perf filing is owed at
first live deployment or first GPU-hardware measurement,
and the leg re-opens if long tasks persist on hardware.*

*(4) The attribution probes are downgraded to "reported,
not filed": the sequence-only variant (0 ms) and the
phase-split probe (≈6.5–6.7 s startup, ≈4.1 s on-screen
windows) survive only as the prose above — an exhaustive
search by both axes found no probe script or raw output
anywhere. The ruling does not rest on them: it rests on
the graded report's waste measures and the in-code fix,
both verified by both axes.*

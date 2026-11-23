# M16 — the QA harness exam, results

**The exam (package §4):** the QA suite runs against a
build with planted defects; every planted defect must be
caught by the gate that owns it; a missed defect sends the
harness back, not the build.

**The instrument:** `run-exam.mjs` — plants the defective
copy (`plant.mjs`, five exact-string mutations, needles
verified or the planter throws), takes the visual baseline
on the clean build, then runs the identical config
(`qa.config.mjs`) against the clean build and the planted
build. Raw reports: `results-baseline.json` ·
`results-clean.json` · `results-planted.json`. The answer
key is filed openly at `planted/PLANTED.md`.

## The clean build — no false positives

| Gate | Result | Evidence |
|---|---|---|
| unit | PASS | 7/7 specs |
| e2e | PASS | 9 journey steps + zero errors |
| visual | PASS | diff ratio 0.000% against the filed baseline |
| a11y | PASS | 7/7 audits |
| perf | PASS | 1 layout read · 0 ms long tasks · CLS 0 · LCP 72–188 ms across runs (lab) |

**Harness verdict: PASS.**

## The planted build — five defects, five catches

| Gate | Planted defect | Caught by | Evidence |
|---|---|---|---|
| unit | cap check raised by 2 in the book | spec "validator refuses a breach of the per-person cap" | the breach validated clean: `{"ok":true}` |
| e2e | submit path throws | step 7 (confirmation never appears) + the error line | `Error: planted defect: the book is unreachable` |
| visual | dial repainted ink → red | screenshot vs baseline | diff ratio 1.81% > 1.00%; diff image filed |
| a11y | watch loses its accessible name | audit "every role=img carries an accessible name" | 1 unnamed |
| perf | scroll handler thrashes layout ×40/event | layout-read budget | 2,441 reads vs a budget of 50 (clean: 1) |

**Harness verdict: FAIL — and every failure is the owning
gate naming its own defect.** Exam expectations: **8/8**.

## What the exam caught in the harness itself

Two defects, both fixed in the harness (the exam's rule:
a miss sends the harness back):

1. **The perf gate read LCP from an empty well** —
   `performance.getEntriesByType('largest-contentful-paint')`
   delivers nothing in this browser; the first clean run
   "failed" LCP at `null` ms, which is a broken instrument,
   not a slow page. The gate now observes LCP properly
   (buffered PerformanceObserver); the clean build's LCP
   then measured 188 ms (later runs of the same gate filed
   72–96 ms — lab LCP varies run to run; every observed
   value sits far inside the 2,500 ms bar).
2. **The exam's own e2e expectation named the wrong step**
   — it demanded the failure surface at an `expectText`
   step, but a broken journey correctly stops at the
   earlier `expectVisible`. The expectation now accepts the
   step where the defect actually stops the journey, or the
   planted error in the error line.

One honest non-catch, recorded rather than hidden: the
planted thrash produced **0 ms of long tasks** in both runs
— forty small forced layouts per scroll event never crossed
the 50 ms long-task threshold on this small page. The
layout-read counter (2,441 vs 1) is what owns this defect
class in the harness, and the filing says so; the long-task
check stands for heavier pages, unproven here.

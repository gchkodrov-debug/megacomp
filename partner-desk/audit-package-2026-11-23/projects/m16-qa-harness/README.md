# M16 — QA Harness

The house's quality gates, built as an Engine component
(`engine/qa-harness/`) and examined here against Project 9:
five gates — **unit · e2e · visual · a11y · perf** — behind
one runner, one config, one report format.

## Files

- `qa.config.mjs` — the exam's config as a factory over a
  root, so the *identical* config judges the clean build
  and the planted build: 7 unit specs (the validator, the
  pacing component, the reservation book — all imported
  from the target's own tree), a 9-step reservation
  journey, the visual baseline settings, the perf budgets.
- `plant.mjs` — builds `planted/`: a self-contained copy
  of Project 9 carrying five planted defects, one per
  gate, each an exact-string mutation that throws if its
  needle is missing. The answer key is `planted/PLANTED.md`.
- `run-exam.mjs` — the exam: baseline pass → graded clean
  run → graded planted run, with the expectations checked
  and the raw reports written as JSON.
- `EXAM_RESULTS.md` — the filed result: **8/8 expectations
  met**; clean build PASS with no false positives; planted
  build FAIL with every defect caught by its owning gate.
- `baselines/` — the filed visual baseline and the planted
  run's diff image.
- `results-*.json` — the three raw harness reports.

## Run it

```
node run-exam.mjs
```

Exit 0 only if every expectation holds. The harness's own
rules live with the component: a baseline is a decision
(reported `BASELINE-CREATED`, never a quiet pass), the
harness never repairs or retries, lab numbers are labelled
lab numbers, and a missed defect sends the harness back —
the exam itself proved that rule twice, on the LCP
measurement and on its own expectation (see
`EXAM_RESULTS.md`).

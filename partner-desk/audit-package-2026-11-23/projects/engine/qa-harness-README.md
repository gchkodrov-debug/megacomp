# Engine component — QA Harness (M16)

Five gates behind one runner, donated by M16 and used by
its exam in place:

| Gate | What it judges | How |
|---|---|---|
| `unit` | the target's logic | declared specs run against the target's **own shipped modules** — never copies (Rule 13) |
| `e2e` | the target's point | a declared journey (data, a small verb vocabulary) walked in a real browser; console errors fail on their own line |
| `visual` | the target's face | full-page screenshot in a declared settled state, pixel-diffed against a filed baseline |
| `a11y` | the mechanical floor | named DOM audits — names, labels, heading order, language, computed body contrast — each reported individually |
| `perf` | the target's manners | a labelled local lab trace: layout-read counters, long tasks, CLS, LCP, judged against declared budgets |

## Contract

```js
import { createQaHarness } from './qa-harness.js';
const harness = createQaHarness({
  serveRoot, targetPath,
  unit: [{ name, test }],          // test(t) — t.ok/equal/deepEqual/throws
  journey: [{ do: 'click', on: '#…' }, …],
  visual: { baselineDir, settleClick, settleMs, tolerance, maxDiffRatio, name },
  perf: { pageClass: 'N' | 'W', budgets: { maxLayoutReads, maxLongTaskMs, maxCls, maxLcpMs, scrollSteps },
          offscreen: { selector } },   // class W only: the continuously-rendered stage
});
const report = await harness.run();            // { target, gates, verdict }
await harness.run({ mode: 'baseline' });       // (re)write baselines
```

## Page classes (perf budgets, Phase 5 re-calibration)

A page declares its class in its QA config **before** its
run. The captain's Phase 4 ruling ordered the budget set
re-calibrated per page class; the derivation from the
Phase 2–4 evidence is filed in the Kit's `BUDGETS.md`.

- **Class N — no continuously-rendered stage.** Layout
  reads ≤ 50 · whole-window long-task total ≤ 250 ms
  (calibrated on Project 9, a page with no WebGL stage) ·
  CLS ≤ 0.1 · LCP ≤ 2500 ms, all as labelled lab traces.
- **Class W — a continuously-rendered stage (WebGL or
  canvas) is present.** The reads, CLS and LCP bars are
  the class-N bars, unchanged. The whole-window long-task
  total is judged against a **lab ceiling of 12,000 ms** —
  a regression ceiling for a software-rendered lab,
  derived from the measured envelope (post-fix
  9,133–9,562 ms passes; the pre-fix waste figure of
  17,966 ms fails) — and reported whatever the verdict.
  A fifth check, the **off-screen probe**, scrolls the
  declared stage out of view, dwells 1,200 ms, and
  requires the long tasks accrued meanwhile to be **0 ms**:
  the waste measure the budget exists to police, made a
  gate (Rule 34). A class-W config without
  `offscreen.selector` fails that check as unmeasured.

Neither lab figure is a hardware figure: at first live
deployment or first GPU-hardware measurement, the page
owes a real perf filing and its class is re-baselined
(the captain's binding condition, Phase 4).

## The standing rules of the harness

- **A baseline is a decision.** Writing one reports
  `BASELINE-CREATED`, never a quiet PASS; the graded run
  compares against the filed image.
- **The harness never repairs or retries.** A gate's FAIL
  names its failed checks and stops there.
- **A missed defect sends the harness back, not the
  build.** That is M16's exam rule, and it is the
  component's: if a defective build passes, the gate that
  owned the defect is what gets fixed.
- **Lab numbers are labelled lab numbers.** The perf
  gate's trace is a local instrument; a live page's filing
  is live PageSpeed (captain's Phase 1 ruling).

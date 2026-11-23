# CHANGELOG — the Kit

## v1.1.0 — Track 7 Phase 5 (Project 12): the Kit

The Engine, productized. v1.0.0 was the crew's internal
package (M15, Phase 4); v1.1.0 is the commercial Kit —
the same proven components, with the documents and the
budget discipline a stranger needs.

**Added**
- The Kit's commercial documents: README.md (the product
  face), INSTALL.md, CUSTOMIZE.md, this changelog, and
  BUDGETS.md — the perf-budget decision document.
- **Perf budgets per page class** (the captain's Phase 4
  ruling, delivered): the perf gate now takes
  `perf.pageClass` — class N (no continuously-rendered
  stage) keeps the standing bars; class W (a WebGL/canvas
  stage) is judged on the class-N reads/CLS/LCP bars, a
  12,000 ms lab regression ceiling for the whole-window
  long-task total, and a new **off-screen probe** (the
  stage scrolled out of view must accrue 0 long-task ms
  across a 1,200 ms dwell). `engine/budgets.json` carries
  the classes as data (`qaPerfGateByClass`, replacing
  `qaPerfGateDefaults`); BUDGETS.md files the derivation
  from the Phase 2–4 measurements.
- A flagship demonstration: a complete commercial
  product site built from nothing but this Kit (Project
  12's demo, beside the Kit), graded by the Kit's own
  harness under class W.

**Fixed**
- The QA harness's worked example carried its perf
  numbers flat on `perf`, a shape the gate never read —
  the defaults happened to match, so the error was
  silent. The example now declares the contract shape
  (`pageClass` + `budgets`), and the gate's header and
  CUSTOMIZE.md both state it.
- **The shader stage redrew an unchanging frame
  continuously, on screen and off** — the demo's first
  class-W perf run measured the bill (14,584 ms
  whole-window long tasks; 1,109 ms accrued off screen).
  The stage now carries the viewer's Rule 34 discipline:
  a margin-aware visibility pause, and an at-rest skip
  (its shaders take no time uniform, so a rest frame
  needs drawing exactly once). The demo's graded run
  after the fix: 5,560 ms and 0 ms off screen. Found by
  the Kit's own harness during this phase's calibration
  — the phase's first catch was a member of the Engine
  itself.
- The off-screen probe itself was refined three times
  during calibration (instant scrolls under the house
  stylesheet's smooth scrolling; a full-viewport move
  past the stage's deliberate pre-warm margin; a
  settle-wait before baselining). Each defect and its
  fix is commented in the gate and filed in BUDGETS.md's
  addendum.

**Unchanged, deliberately**
- Every other component's code is byte-identical to
  v1.0.0 except the QA harness files named above (the
  perf gate, the example config, the harness README and
  the runner's contract comment) and the shader pack
  named above. The templates and the accessibility
  layer carry in exactly as graded.
- Project 11's graded record stands as ruled in Phase 4;
  the re-calibration was validated on a fresh run, not
  by editing a graded filing.

## v1.0.0 — Track 7 Phase 4 (M15): the Engine, assembled

The internal package: 46 files — the twelve components
from their graded birthplaces, seven templates, the
accessibility layer, the standing budgets as data, the
vendored libraries — with a manifest of sources and
sha256s, INSTALL.md, and BUILD_A_PAGE.md. Passed the
blind-install exam at its fourth sitting: a builder who
had never seen it, documents alone, built a working page
in 3m17s with zero questions.

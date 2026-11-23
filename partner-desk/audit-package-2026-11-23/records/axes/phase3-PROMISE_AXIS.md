# TRACK 7 PHASE 3 — PROMISE-AXIS BLIND REVIEW

**Reviewer:** promise-axis seat (fresh context; did not build any
artifact; producer's word taken for nothing — every harness below
was re-run by this seat, every headline number re-measured or
checked against the files on disk).
**Governing bars:** `TRACK_7_LAUNCH_PACKAGE.md` §4 per-module exams
and §5 Phase 3 exit gate: *"Projects 8, 9, and 10 passed blind;
the QA harness exists and has caught planted defects (M16's
exam)."*
**Axis discipline:** this report grades only whether each artifact
does what it promises — its own README/page claims and the §4
exam bars. The house axis was not read.

---

## 0. Frozen-set integrity (read first)

Full sha256 sweep against `grading-phase3/FROZEN_SET.md`
(144 entries): **138 match, 6 differ, 0 missing.**

- `m16-qa-harness/results-{baseline,clean,planted}.json` differ
  **because this seat's mandated re-run of `node run-exam.mjs`
  regenerated them** (the exam writes its own reports by design).
  The regenerated verdicts and defect signals are identical to
  the filed ones (see M16); the visual baseline and diff PNGs
  are byte-identical to frozen.
- `project-10-architecture/README.md`,
  `../TRACK_7_PHASE_3_RUN.md`, and
  `../TRACK_7_CINEMATIC_WEB_ENGINEERING.md` differ and carry
  mtimes of 10:50:19Z / 10:50:56Z / 10:50:33Z — **after** the
  freeze timestamp (2026-11-23T10:47:04Z). This seat made no
  writes to them. They are prose/record files; **every
  executable artifact this review relies on (all .js/.mjs/
  .html/.css, all READMEs of M13/M14/M16/P8/P9, all media)
  matches its frozen hash.** The P10 README graded here is the
  on-disk version; the claims checked in it are unchanged in
  substance (its "~8 ms" line is still present, line 59).

> **Finding F-0 (MAJOR, process):** the frozen set was still
> being written around after its own freeze timestamp — three
> prose files changed post-freeze. No graded code or evidence
> file is affected, so no verdict below rests on a drifted
> file, but a frozen set that moves during grading is a
> discipline breach the captain should note.

**Environment note:** the puppeteer-core symlink
`/tmp/lh/node_modules/puppeteer-core ->
~/workspace/newwave/tools/node_modules/puppeteer-core` was
already present and correct; no repair was needed and none was
made.

## 1. This seat's harness runs (all from each artifact's folder)

| Harness | Command | Result on my run |
|---|---|---|
| M13 gate | `node verify.mjs` | **7/7 PASS**, exit 0 (reads the filed `results.json`; see finding M13-4) |
| Project 8 | `node verify.mjs` | **16/16 PASS**, exit 0 |
| Project 10 | `node verify.mjs` | **11/11 PASS**, exit 0 |
| Project 9 | `node verify.mjs` | **15/15 PASS**, exit 0 |
| M14 | `node verify.mjs` | **15/15 PASS**, exit 0 |
| M16 exam | `node run-exam.mjs` | **8/8 expectations met**, exit 0 |
| Project 1 (H-15) | `node verification/verify.mjs` | **36/36 PASS**, exit 0 |

No harness failed to run; nothing stopped early.

---

## 2. M12 — Advanced Interactive Experience Engineering
### (evidenced by Projects 8, 9, 10)

**Exam bar (§4 M12):** complete interactive product presentation,
multiple user-controlled experiences; *every experience
completable by keyboard alone; state machine handles interrupted
and reversed interactions without a stuck state.*

### Project 8 — Automotive (16/16 on my run)
Every README claim reproduced: readout recomputed independently
from the published `CATALOGUE` and string-compared
(`verify.mjs` run output: total line carries 187,900; keyboard
repaint reprices to $190,500); keyboard journey (radio arrows,
turntable forth **and back**, hotspot open, Escape + focus
return); 40+ event interruption spam settles self-consistent
(`state=settled view=0 target=0`); OPEN refused while moving,
evidenced as `{"moving":true,"sent":false,"inspect":null}`;
drag turns the car; reduced motion settles in **21 ms** —
exactly the README's "~21 ms"; no overflow at 390 px; zero
console errors throughout.

### Project 10 — Architecture (11/11 on my run)
Keyboard tour Hall → Kitchen via plan arrows + Enter; hotspot
open/Escape/focus-return; night mode proven by computed style
(lamp glow 0.25 → 0.95, matching README); materials change
verified against the published MATERIALS table (rendered fill
`#8f8d84` = table value); 18-change GOTO spam settles in the
final room; zero console errors; no overflow at 390 px. The
README's self-filed producer defects (D-P3-1/D-P3-2) are
consistent with the code on disk: `engine/interaction/
scene-nav.js` and `state-machine.js` expose the `enter` /
`state()` contract and the `{ veto: true }` semantics the
corrected header describes (state-machine.js header + `send()`:
a bare return is a handled no-op, only `out.veto` refuses).

### Project 9 — Launch (15/15 on my run)
No-script property proven statically (hiding scoped to the
script-added `.pacing-on` class); schedule fires in published
order alone, after skip, and at 250 ms only Act I has fired;
reduced-motion collapse is not recorded as a skip; validator
refusals (empty form, four malformed emails, cap of 3, missing
tick) and acceptance; two numbered reservations (№ 1, № 2)
printed from the book's own count; zero console errors; no
overflow at 390 px. The pacing component
(`engine/launch/pacing.js`) and book
(`engine/launch/reserve-book.js`) read as their READMEs
describe — DOM-free, state printed from the component itself.

### Findings — M12

- **M12-1 (MAJOR — evidence gap on an explicit bar):**
  Project 9's own harness never drives a keyboard journey.
  `project-9-launch/verify.mjs` contains no `keyboard`/`Tab`
  usage at all (grep: only a focus-to-errors assertion,
  line 137). The M12 bar says *every* experience completable
  by keyboard alone. For P9 the claim rests on construction —
  all controls are native (`index.html`: skip `<button>`
  line 68, text/email inputs, `<select>`, checkbox, submit
  button) and focus management is tested — plus the identical
  form/book being Tab-walked end-to-end in M14's harness.
  That is strong circumstantial evidence, but it is not the
  exercised proof P8 and P10 file for themselves. The bar is
  met for the module on the body of evidence; P9's own filing
  is the thin spot.
- **M12-2 (MINOR):** P8 README claims the machine "refuses a
  GOTO to the view it already holds." The veto exists in code
  (`project-8-automotive/app.js:149`) but no harness check
  exercises it — only the OPEN-while-moving refusal is tested
  (`verify.mjs:135–147`).
- **M12-3 (MINOR):** the reduced-motion "settles effectively
  instantly" gates are loose: P8 passes at `elapsed < 1200`
  (`verify.mjs:182`), P10 at `< 900` (`verify.mjs:140`).
  Observed values (21 ms / 25 ms) honour the promise with
  huge margin, but a ~40× regression would still pass the
  gate as written.
- **M12-4 (MINOR):** P10 README's "reduced motion settles in
  ~8 ms" did not reproduce — my run measured **25 ms**
  (harness output). Same order of magnitude, same verdict,
  but the filed figure is the producer's best run, not a
  typical one. (P8's ~21 ms reproduced exactly.)

### Verdict — M12: **PASS**
Keyboard completion and interruption/reversal handling are
proven by exercise on two of three projects and by native
construction plus the shared-component proof on the third;
no stuck state appeared under spam in any run of mine.

---

## 3. M13 — Browser Rendering & Performance Engineering

**Exam bar (§4 M13):** profile the deliberately inefficient
site, name the bottlenecks, demonstrate measurable improvement;
*before/after filings on the same measurement route; every
claimed bottleneck tied to a trace, not an opinion; the
improved page inside the standing CWV bars* (package §4:
LCP ≤2.5s · INP <200ms · CLS <0.1).

**What reproduced exactly:**
- Layout reads: broken **3,374 / 3,368**, fixed **0 / 0**
  (`results.json` summary; verify 7/7 on my run).
- LCP: broken 660–948 ms, fixed **128–136 ms** — README table
  matches the filing line for line.
- Longest app.js script: broken 232–442 ms, fixed 0–60 ms.
- Same destination: index value **1,270,607** in all four
  runs; player settled on frame 72; zero console errors.
- **Media ledger verified on disk by this seat:** 72 frame
  files totalling 112,168 bytes; `hero-huge.png` =
  **6,969,381 bytes** and `hero.webp` = **9,348 bytes** —
  DEFECTS.md B4/F4 figures are byte-exact.
- **H-15 discharge is real:** `cachedScrollProgress()` exists
  in `project-1-engine-skeleton/engine/components/
  scroll-sequence-player.js` (line 151; per-tick answers from
  `scrollY` alone, geometry measured once + on resize), and
  Project 1's verification re-run by this seat after the edit
  passes **36/36** — the no-regression claim holds.
- The honest trades are genuinely filed: FPS does not
  separate the builds (60 fps both) and the README says so;
  F5's completion-time cost (~8.7–9.0 s fixed vs ~0.3–0.7 s
  broken) matches `results.json` (8,729–9,010 ms vs
  318–720 ms) and is named, not hidden.

### Findings — M13

- **M13-1 (MAJOR): INP is never measured.** The standing CWV
  bars (§4) are three — LCP, INP, CLS. `profile.mjs`'s probe
  set (per DEFECTS.md "The measurement route") and
  `verify.mjs` check 4 cover only CLS and LCP; no interaction
  latency figure exists anywhere in the module. The fixed
  page's longest task (≤61 ms) and 16.7 ms frame gaps make an
  INP failure implausible, but the exam bar says *inside the
  standing CWV bars*, and one of the three is unevidenced.
  If the captain reads the CWV bar as all-three-or-fail, this
  is the finding that flips M13.
- **M13-2 (MAJOR): B6 has no trace, against the module's own
  blanket promise.** README: "Every bottleneck claimed
  anywhere in this module is tied to the profiler's traces."
  B6 (animating `width`/`box-shadow` per scroll event) is
  supported by no count or timing — the probes count layout
  reads only, which aggregate B1+B2+B3 and cannot isolate B6
  (or B2 individually). B6 is code-evident and the fix
  (transform: scaleX) is correct practice, but the promise as
  written is overstated for one of the six headline defects.
- **M13-3 (MAJOR — instrument weakness): the CLS gate passes
  on timing luck.** `verify.mjs` check 3 requires only that
  broken CLS exceed 0.1 in *at least one* run
  (`broken.some(...)`). In the filed runs, one broken run
  scored **0.6059** and the other **0.0014** — identical to
  the fixed build. The B4 shift is real but intermittent
  (load-timing dependent); the gate as written would pass or
  fail on a coin flip if the filing were re-measured. The
  README's envelope (0.0014–0.6059) discloses this honestly —
  the weakness is the gate's `some()`, not the reporting.
- **M13-4 (MINOR):** `verify.mjs` is a gate over a *filed*
  `results.json`, not a live re-measurement (its own header
  says so). This seat therefore verified the gate and the
  filing's internal consistency, not a fresh profile; the
  filed numbers' provenance is the producer's `profile.mjs`
  run. Disclosed by design, but graders should know the 7/7
  is one step removed from the browser.
- **M13-5 (MINOR):** DEFECTS.md F5 claims the fixed build has
  "no long task"; the filing's own fixed run 1 records a
  **61 ms long task** with a 60 ms app.js attribution
  (`results.json`). The README headline table (0–60 ms) is
  accurate; the ledger sentence is not, on one of two runs.
  The exam substance (hundreds of ms → ≤100 ms gate) is met
  with margin.

### Verdict — M13: **PASS** (with three MAJORs recorded)
Before/after on the same route, dramatic trace-tied
improvement on every measured axis, the improved page inside
the LCP and CLS bars on every run, and H-15 genuinely
discharged in the Engine component. The pass is on the
measured substance; M13-1/2/3 are owed repairs to the filing
and the gate, and M13-1 is flagged for the captain's ruling
on the CWV bar's scope.

---

## 4. M14 — Accessibility & Responsive Cinematic Design

**Exam bar (§4 M14):** cinematic experience + complete
accessible alternative; *the alternative graded as a full
presentation in its own right (content-complete, not a
stripped page); WCAG checks filed; reduced-motion path
exercised on a real device setting.*

**What reproduced on my run (15/15):**
- Content parity: **6 of 6** substantive paragraphs carried
  over verbatim; edition facts equal Project 9's own EDITION
  object (300 · $12,400 · cap 3) — checked by reference, not
  by copy, exactly as the README promises.
- Contrast ratios computed by formula match `WCAG_FILING.md`
  to two decimals: body **16.24** · muted **8.74** · accent
  **5.89** · button **6.30** · error **7.28** · control
  borders **5.84** (bar 3:1).
- Tab walk in exact reading order (skip link → 5 act links →
  name → email → pieces → consent → submit = the filing's
  11 stops), every stop with a `solid / 3px` outline.
- The shared book: the alternative speaks the validator's own
  words (3 messages on empty submit — correctly fewer than
  P9's 4, because the select carries its default value, an
  instrument subtlety the README files openly) and takes № 1
  from the same Engine component.
- Zero transitions (0s sampled), zero console errors, no
  sideways scroll at 200% zoom; the cinematic page under
  reduced-motion emulation fully revealed, nothing left
  `inert`.
- **This seat independently probed target sizes** with its
  own puppeteer script (same measurement rule as the
  harness): 10 controls, heights 54/54/54/54/54/50/50/**48**/
  84.1/54 px — the filing's "smallest = 48 px" is exact.

### Findings — M14

- **M14-1 (MINOR):** the reduced-motion path was exercised
  under the browser's `prefers-reduced-motion` **emulation**
  in a headless lab, not on a real device setting as the
  bar's letter reads. The filing discloses this itself
  ("Scope honesty", WCAG_FILING.md) and the alternative
  itself contains no motion to reduce (measured 0s), so the
  substance is proven; the residual is the letter of the
  bar, and house law already reserves real-device motion
  verdicts for pages that ship.
- **M14-2 (MINOR):** contrast is computed by the WCAG formula
  from the *declared palette*, not sampled from rendered
  pixels (verify.mjs header states this; the filing's
  numbers come from there). For a flat-colour study page the
  two cannot diverge materially, and the method is disclosed
  — noted so the filing is not misread as a rendered-pixel
  audit. (M16's a11y gate separately checks P9's computed
  body contrast at 15.26:1 from live styles.)

### Verdict — M14: **PASS**
The alternative is content-complete, independently
keyboard-walkable, and graded here as a presentation in its
own right — it holds up as one. No promise in its README or
filing failed to reproduce.

---

## 5. M16 — Quality Assurance & Security (the QA harness exam)

**Exam bar (§4 M16):** the QA suite runs against a build with
planted defects; *every planted defect caught by the gate
that owns it; a missed defect = the harness, not the build,
goes back.*

**My run of `node run-exam.mjs`: 8/8 expectations met, exit 0.**
- Baseline pass reported `BASELINE-CREATED` as its own status
  (never a quiet pass — the component's stated rule, observed
  in behaviour).
- Clean build: harness verdict **PASS**, no false positives —
  unit 7/7, e2e 9 steps + zero errors, visual diff 0.000%,
  a11y 7/7, perf PASS.
- Planted build: harness verdict **FAIL**, and every failure
  is the owning gate naming its own defect. The defect
  signals from my run reproduce the filed `EXAM_RESULTS.md`
  catch table **exactly** where the signal is deterministic:
  visual diff **1.81%** (> 1.00% budget), perf **2,441 layout
  reads** vs budget 50 (clean: 1), unit cap-breach validating
  clean as `{"ok":true}`, e2e stopping at step 7
  (`expectVisible #confirmation`) with the planted error in
  the error line, a11y "1 unnamed" role=img.
- The two harness self-defects the exam previously caught
  (LCP read from an empty well; the mis-named e2e
  expectation) are consistent with the code on disk — the
  perf gate now uses a buffered PerformanceObserver, and the
  exam's expectation accepts the step where the defect
  actually stops the journey. The one honest non-catch is
  filed, not hidden: the planted thrash produced **0 ms of
  long tasks** in my run too (results-planted.json, perf
  gate) — the layout-read counter owns that defect class,
  and the filing says so.

### Findings — M16

- **M16-1 (MINOR):** the visual gate's clean PASS is
  baseline-relative by design — the exam creates the baseline
  from the same clean build it then grades, so a 0.000% clean
  diff is near-tautological. The gate's discriminating power
  is proven where it matters (the planted 1.81% catch, diff
  image filed and byte-identical to frozen), and the
  procedure is disclosed in `EXAM_RESULTS.md`. Noted so the
  clean visual PASS is not over-read.
- **M16-2 (MINOR):** lab LCP varies run to run — filed clean
  LCP 188 ms vs **72 ms** on my run (planted: 96 ms). All
  values sit far inside the 2,500 ms budget and no verdict
  turns on the difference; recorded because the filing's
  single figure could be mistaken for a stable constant.

### Verdict — M16: **PASS**
The exam bar is met in full on this seat's own run: five
planted defects, five owning gates, five catches, and a clean
build passed without a single false positive.

---

## 6. Engine donations spot-checked in place

- `engine/interaction/state-machine.js` — contract header
  matches behaviour (veto semantics as corrected per P10's
  D-P3-2 note); used in place by P8 and P10.
- `engine/interaction/scene-nav.js`, `engine/launch/pacing.js`,
  `engine/launch/reserve-book.js` — all frozen-hash verified;
  pacing and book behave as their project harnesses and the
  M16 unit specs exercise them (7/7 unit specs import the
  target's own shipped modules, per `engine/qa-harness/
  README.md` — confirmed in `results-clean.json`).
- `engine/qa-harness/` (5 gates + runner) — frozen-hash
  verified; the M16 exam above is its live proof.
- H-15 addition in
  `project-1-engine-skeleton/engine/components/
  scroll-sequence-player.js` — frozen-hash verified;
  `cachedScrollProgress` present and additive; Project 1
  re-verified 36/36 by this seat.

---

## 7. Phase 3 exit gate — promise-axis ruling

The gate (§5, Phase 3): *"Projects 8, 9, and 10 passed blind;
the QA harness exists and has caught planted defects (M16's
exam)."*

- Projects 8, 9, 10: **passed blind on this seat's runs**
  (16/16, 15/15, 11/11), with their README claims reproduced
  or the exceptions filed above (M12-1…M12-4, none rising to
  a false headline promise).
- M16's exam: **caught its planted defects on this seat's
  run** — 5 of 5, each by its owning gate, 8/8 expectations.
- M13 and M14, the phase's other two modules, also pass their
  §4 bars on the measured substance (M13 with three MAJORs
  recorded; M14 cleanest of the set).

**Promise-axis view: the exit gate is SUPPORTED — PASS.**
No BLOCKER was found in this axis: no exam bar wholly unmet,
no headline promise false. The MAJORs (F-0 frozen-set drift in
prose files; M12-1 P9 keyboard evidence; M13-1 unmeasured
INP; M13-2 B6's missing trace; M13-3 the `some()` CLS gate)
are repairs owed to filings and gates, and M13-1 is
explicitly referred to the captain: if the standing CWV bar
is read as all-three-or-fail, M13's pass should be re-cast
as a conditional pass pending an INP filing. That judgement
is the captain's, last, per the grading law.

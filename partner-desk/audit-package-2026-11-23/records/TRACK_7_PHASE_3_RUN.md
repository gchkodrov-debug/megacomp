# TRACK 7 · PHASE 3 RUN RECORD

*The run: 2026-11-23. Coordinator: the Phase 3 subagent run,
under the Mastery Standard and Relay Law. Phase 0's and
Phase 2's exit gates had PASSED; Phase 1 was graded with
its exit gate FAIL on Project 4 alone (M6 — the film is not
verifiably a Flow production), and the captain ruled later
phases proceed with the Phase 1 gate OPEN on the record.
Nothing in this phase attempts to close the M6 gap, and
nothing here routes around the Flow fence. Study + grading
only — no website building, no production work, nothing
toward Track 8 (sealed). The blind grading of this phase,
with per-module verdicts and the exit-gate ruling, is filed
separately: `TRACK_7_PHASE_3_GRADING_RECORD.md`.*

## What was built (every module produced its required output)

- **M13 — Performance engineering** (`track7-artifacts/
  m13-performance/`): one page built twice from a single
  shared body — `broken/` carrying six planted defects from
  the ledger (per-frame layout reads, an unthrottled scroll
  handler, a per-frame equalizer, a 6,969,381 B
  dimension-less hero PNG, a synchronous sieve, a
  layout-animated hairline) and `fixed/` carrying the six
  named repairs — plus the profiler that measures both on
  the same scripted journey and a verifier (**9/9** — two
  checks added at blind grading, below):
  layout reads ~3,370 → **0**, CLS 0.0014–0.606 → **0.0014**,
  LCP 524–948 ms → **96–168 ms**, longest app.js script
  95–442 ms → **0–79 ms** (envelopes across all of the
  module's filings; lab values drift between filings and
  `results.json` governs). Two probes
  added at grading ride with them: with the hero held
  700 ms, CLS is **0.6042–0.6045 broken / 0 fixed** on every probe
  (the deterministic carrier of the shift claim, the
  journey CLS being load-timing intermittent); and worst
  click latency across the startup window — the INP leg's
  lab proxy — is **288–432 ms broken / 40–168 ms fixed**
  across filings (Event Timing; the fixed build's samples
  run thin per filing, n=2–6, and are filed as such). Filed
  honestly beside them: FPS did not separate the builds
  (60 both), and the fixed build's sliced index completes
  later (8.6–9.4 s vs 0.26–0.72 s across the module's filings) — responsiveness is the trade, and
  both builds print the same independently confirmed index,
  π(20,000,000) = 1,270,607. **Carry H-15 discharged**: the
  Engine's sequence player gained `cachedScrollProgress`
  (measure once, refresh on resize, answer per-tick from
  scroll position), additive only, and Project 1's harness
  re-run fresh proves no regression (**36/36**).
- **M12 — Interactive experience engineering**, three
  projects on two new Engine donations
  (`engine/interaction/state-machine.js` +
  `scene-nav.js`, `engine/launch/pacing.js`):
  **Project 8** (`project-8-automotive/`): the AURELE GT S
  configurator — three drawn views on a state-machine
  turntable, five hotspots, open pricing. Harness
  **17/17** (the GOTO-veto check added at blind grading): keyboard-only journey end to end, a 40-event
  interruption spam settling self-consistent, OPEN refused
  by name while moving, reduced motion settling in ~21 ms.
  **Project 10** (`project-10-architecture/`): the Villa
  Lumen walkthrough on the scene navigation — five rooms,
  plan-strip keyboard walking, day/night as a stylesheet
  mode (proven by computed style, glow 0.25 → 0.95), a
  Salon materials desk verified against its published
  table. Harness **11/11**. **Project 9**
  (`project-9-launch/`): the Meridian №1 launch — five acts
  on the pacing component's published schedule, a
  reservation book whose honesty fence is load-bearing
  (no submission without the tick that says the product is
  fictional). Harness **17/17** (a full keyboard-only journey added at blind grading), including the no-script
  property proven statically and two numbered reservations.
- **M14 — Accessible alternative** (`track7-artifacts/
  m14-accessible-alternative/`): Project 9's complete
  plain-form alternative — same paragraphs (transcribed,
  harness-compared 6/6), same edition facts (imported from
  the cinematic module's own EDITION and gate-compared),
  the watch described in full in words, the same
  reservation book shared in place (which moved the
  validator into the Engine as
  `engine/launch/reserve-book.js`). Harness **15/15**;
  `WCAG_FILING.md` files the criterion-by-criterion record
  with measured figures (contrast 16.24:1 body → 5.84:1
  weakest UI pair; 11-stop focus walk, 3 px outlines;
  200% zoom clean) and its scope stated: a study filing,
  not a certification.
- **M16 — QA harness** (`engine/qa-harness/` + `track7-
  artifacts/m16-qa-harness/`): the five gates (unit · e2e ·
  visual · a11y · perf) behind one runner, examined
  against Project 9 clean and planted. The planted copy
  carries five defects, one per gate, planted by verified
  exact-string mutation with the answer key filed openly.
  **Exam: 8/8 expectations** — the clean build passes all
  five gates with no false positives (visual diff 0.000%,
  1 layout read, LCP 72–188 ms lab across runs); the planted build fails
  all five, each failure the owning gate naming its own
  defect. Full record: `EXAM_RESULTS.md` + the three raw
  JSON reports.

## Defects found by the instruments, fixed in the run

- **D-P3-1 (component documentation):** the state
  machine's header claimed a bare return vetoes; its code
  treats only `{ veto: true }` as a refusal. The header now
  says what the code does (both projects rely on the
  explicit veto). Rule 25 carries the lesson.
- **D-P3-2 (producer, the phase's most instructive):**
  Project 10's controller was written against a
  paraphrased summary of the scene-nav API (`goTo`,
  `context()`, `addHotspot`) instead of the file on disk
  (`enter`, `state()`, hotspots declared in the
  definition). The page died on load; the harness's wait
  timed out; the file was read and the controller
  rewritten to the real contract — 11/11 after. Rule 24
  carries the lesson: the file on disk is the contract.
- **D-P3-3 (page, caught by its own harness):** Project
  8's stage overflowed a 390 px viewport by 188 px (an
  aspect-ratio/min-height pair resolving against each
  other). Rebuilt as a grid stack — the stage is now the
  drawing's own box, which also makes hotspot percentages
  map onto the car itself. Two hotspot dots that floated
  off the body in screenshots were re-seated on their
  parts; Project 9's dial text, drawn across its case rim,
  was moved inside the dial.
- **D-P3-4 (harness, caught by the M16 exam):** the perf
  gate read LCP from `getEntriesByType`, which delivers
  nothing in this browser, and "failed" a clean page at
  null ms. The gate now observes LCP properly. Rule 31
  carries the lesson; the exam's own e2e expectation,
  which named the wrong journey step as the defect's
  surface, was corrected the same way.
- **D-P3-5 (harness, M14):** three of the alternative's
  first checks failed on their instruments — `innerText`
  vs `textContent` on a hidden confirmation, a checkbox
  measured by its box instead of its label row, and an
  "empty form" expectation computed without the browser's
  defaults. All three fixed in the harness; Rule 29
  carries the lesson.
- **Producer arithmetic, caught by a harness expectation:**
  Project 8's keyboard check first expected a total of
  $190,900 for a configuration the catalogue prices at
  $190,500 — the page was right, the test was wrong, and
  the independent recomputation check (which passed)
  is what proved which.

## Carries

- **Phase 1's exit gate remains OPEN** on Project 4 alone
  (M6), untouched by this phase, exactly as the captain
  ruled. Track 7 graduation still requires a Flow-produced
  film passing M6 blind.
- The components' **silent-ignore config behaviour** (from
  Phase 1) remains open for the older components; Phase
  3's new components validate their definitions and throw,
  and the Engine README now records the split as a
  decision, not a discovery.
- The shader pack's **mid-flight retarget** (Phase 2)
  remains documented v1 behaviour.
- One honest non-catch filed in M16's results: the
  planted layout thrash produced 0 ms of long tasks on
  this small page; the layout-read counter owns that
  defect class in the harness, and the long-task check
  stands unproven against it.
- M14's reduced-motion evidence is the browser's own
  emulated setting exercised in a headless lab, not a
  physical device setting (the WCAG filing's scope
  statement says so in as many words); the alternative
  itself contains no motion at all. Added to the carries
  on the Kimi critic's observation, 2026-11-23.

## Book + rules

- Book: the Phase 3 instalment (M12 · M13 · M14 · M16) is
  appended to `TRACK_7_CINEMATIC_WEB_ENGINEERING.md`, each
  module ending FOR GEORGE — WHAT I NOW KNOW.
- Rules: instalment 5 (Rules 24–31) is appended to
  `crew-skills/cinematic-web-engineering-rules.md`.
- Engine: `engine/README.md` updated through Phase 3,
  including the carries above.

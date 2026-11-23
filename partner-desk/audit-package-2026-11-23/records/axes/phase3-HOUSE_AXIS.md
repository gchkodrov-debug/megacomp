# TRACK 7 · PHASE 3 — HOUSE-AXIS BLIND REVIEW

*Reviewer: fresh-context House axis (did not build any of this; did not read
the Promise-axis material). Axis: does the work obey the house — its rules,
its honesty discipline, and its own records? Graded 2026-11-23 against the
frozen set.*

## Frozen set — verified

Recomputed sha256 for a sample spanning records and artifacts; **all match**
`FROZEN_SET.md` exactly:

| File | Result |
|---|---|
| `../TRACK_7_PHASE_3_RUN.md` | abd9964a… ✓ |
| `../TRACK_7_CINEMATIC_WEB_ENGINEERING.md` | d5ed35cb… ✓ |
| `engine/README.md` | 329a43b4… ✓ |
| `m13-performance/results.json` | 3be656b3… ✓ |
| `m13-performance/README.md` | c85f2aed… ✓ |
| `project-9-launch/index.html` | e6bc57f4… ✓ |
| `m16-qa-harness/results-clean.json` | 80283d94… ✓ |
| `crew-skills/cinematic-web-engineering-rules.md` | df5bcaec… ✓ |

What was reviewed is what was frozen.

## 1 · Consistency audit — run record vs artifacts vs book

Every concrete claim in `TRACK_7_PHASE_3_RUN.md` was checked against the
artifacts' own files. Result: **the record is accurate.** Detail:

- **Harness counts — all exact.** `check()` call counts in the shipped
  harnesses: M13 `verify.mjs` = 7, Project 8 = 16, Project 10 = 11,
  Project 9 = 15, M14 = 15 — matching the run record's 7/7, 16/16, 11/11,
  15/15, 15/15 verbatim. M16 exam 8/8 reconciles structurally:
  `run-exam.mjs` pushes exactly 8 expectations (1 baseline-status +
  1 clean-verdict + 1 planted-verdict + 5 per-gate catches).
- **M13 figures — match `results.json`.** Layout reads 3,368–3,374 → 0
  (run record's "~3,370 → 0" is a fair compression); LCP 660–948 → 128–136 ms;
  longest app.js script 232–442 → 0–60 ms (record quotes the maxima, 442 → ≤60);
  hero 6,969,381 B confirmed on disk (`hero-huge.png` = 6,969,381 B;
  fixed `hero.webp` = 9,348 B, matching DEFECTS.md F4); index
  π(20,000,000) = 1,270,607 printed by both builds in all four runs.
- **H-15 / 36/36** — carried consistently in run record, M13 README, book M13,
  and Engine README; the addition (`cachedScrollProgress`) is described
  identically (additive, graded exports untouched) in all four.
- **M16 figures — match the raw JSONs.** Clean: visual diff 0.000%,
  1 layout read, LCP 188 ms, CLS 0, 0 ms long tasks (`results-clean.json`).
  Planted: unit cap breach `{"ok":true}`, e2e stops at step 7
  `expectVisible #confirmation` with the planted error line, visual 1.81%,
  a11y 1 unnamed, perf 2,441 reads vs budget 50 (`results-planted.json`).
  Baseline run files visual as `BASELINE-CREATED` (`results-baseline.json`) —
  Rule 30 honoured in the data, not just the prose.
- **Defects D-P3-1…D-P3-5** — each is corroborated by an artifact-side record:
  D-P3-1 by the corrected header in `engine/interaction/state-machine.js`
  (now reads: veto only on `{ veto: true }`; "returning nothing is a handled
  no-op" — verified on disk); D-P3-2 by Project 10's README; D-P3-3 by
  Project 8's README (390 px / 188 px overflow, grid-stack fix) and Project 9's
  README (dial text); D-P3-4 by `EXAM_RESULTS.md`; D-P3-5 by M14's README.
  The producer-arithmetic catch ($190,900 expected vs $190,500 priced) is
  corroborated by Project 8's `verify.mjs`, which hard-codes the correct
  `"190,500"` and recomputes the total independently from `CATALOGUE`.
- **Book retelling** — the Phase 3 instalment's numbers (M13 envelope,
  M16's 0.000% / 1 read / 188 ms / 1.81% / 2,441 reads, Project 10's glow
  0.25 → 0.95 — the latter verified literally in
  `project-10-architecture/style.css` lines 73–74) agree with the artifacts.
  No prose outruns its evidence was found, beyond the two MINOR compressions
  below.

**Findings:**

- **MINOR — M13-CLS shorthand (run record).** `TRACK_7_PHASE_3_RUN.md` prints
  "CLS ≤0.606 → **0.0014**". The broken envelope is 0.0014–0.6059 — one broken
  run also scored 0.0014 — so the arrow form implies a cleaner separation than
  the envelope shows. The M13 README table and the book ("from up to 0.606 to
  0.0014") state it correctly; only the run record's shorthand compresses.
  Not a false number; a framing tighter than its own filing.
- **MINOR — index timing rounding (run record + book).** "~9 s vs ~0.5 s":
  measured envelopes are fixed 8,729–9,010 ms, broken 318–720 ms. "~0.5 s"
  sits inside the broken envelope; the M13 README files the precise
  "~8.7–9.0 s vs ~0.3–0.7 s". Acceptable approximation, flagged for the record.
- **MINOR — defect filing misattributed (Project 10 README).** It states
  D-P3-1/D-P3-2 are "Filed as defects … in the Phase 3 grading record."
  They are filed in the Phase 3 **run** record; the grading record did not
  exist when the README was written and is a different document. A reader
  following the pointer lands in the wrong record.

## 2 · Rules audit

- **Rule 13/14 (harness vs contract; readouts print state) — honoured.**
  Project 8's harness recomputes the total from the published `CATALOGUE`
  and compares strings (`verify.mjs`); Project 10's readout and harness read
  the machine's own `state()`; Project 9's confirmations print from the
  book's own count. M16's unit gate imports specs against the target's own
  shipped modules (validator, pacing, reserve-book) per `qa.config.mjs`.
- **Rules 24–31 — every rule's earning event is real in the record.**
  24 ← D-P3-2 (paraphrased API, page died, rewritten to the file);
  25 ← D-P3-1 (header corrected on disk, verified);
  26 ← Project 9's pacing (no-script property proven statically, skip
  remembered as skip, reduced-motion collapse not called a skip);
  27 ← M13's identical index + filed non-wins (FPS tie, lost completion time);
  28 ← M14's EDITION-by-import + shared `reserve-book.js`;
  29 ← D-P3-5 (three instrument failures, all three described identically in
  run record, M14 README, and book);
  30 ← baseline filed as `BASELINE-CREATED` in the raw JSON;
  31 ← D-P3-4 (LCP read from an API delivering nothing; wrong-step
  expectation) — both fixed in the harness, both filed in `EXAM_RESULTS.md`.
  No unearned rule found.
- **Lab-trace labelling (captain's Phase 1 ruling) — honoured everywhere
  checked.** M13 README table headers read "(lab trace)" and its closing
  line names the F-P3-2 ruling and disclaims PageSpeed; DEFECTS.md repeats
  it; the book's M13 chapter labels in-line ("local lab traces") and closes
  with "a live page's filing remains live PageSpeed"; the run record labels
  the M13 figures "(all local lab traces…)" and the M16 figure "188 ms lab";
  `EXAM_RESULTS.md` prints "LCP 188 ms (lab)"; the raw JSONs carry
  "(lab trace)" in the check names themselves; the Engine README calls the
  perf gate "a labelled local lab trace". **No unlabelled lab number was
  found in any Phase 3 record.** The two methods are never mixed.
- **No external requests — honoured.** Grep of all Phase 3 pages/components
  for `http://`/`https://`, `fetch(`, external `src`/`href`: the only hits
  are (a) GSAP licence-comment URLs inside the vendored local
  `gsap.min.js` — documentation text, not a request; (b) the QA harness's
  own `http://127.0.0.1` localhost server — local by construction;
  (c) SVG `xmlns` namespace identifiers — identifiers, not loads.
  No page phones out.
- **Receipt-Law / fictional fencing — honoured.** AURELE (Project 8
  `index.html` footer), Villa Lumen (Project 10 footer), and Meridian
  (Project 9 footer **and** the load-bearing in-form consent tick —
  "I understand this is a fictional study product…", submission refused
  without it) are fenced as invented wherever presented, including inside
  the forms. M14's alternative carries the identical fence and tick.
  No number was found that no instrument produced: every figure traced
  to `results.json`, a results-*.json, a file size on disk, a CSS value,
  or a harness count.

## 3 · Carries audit — all carried openly and accurately

- **Phase 1 exit gate OPEN on Project 4 (M6/Flow):** stated in the run
  record's head, its Carries section ("Track 7 graduation still requires a
  Flow-produced film passing M6 blind"), and the book instalment's closing
  paragraph. Nothing in Phase 3 attempts Flow, claims graduation, or
  touches Track 8 (the run record names Track 8 "sealed"). ✓
- **Silent-ignore config behaviour:** carried in the run record and the
  Engine README, the latter correctly reframing it as a recorded decision
  (Phase 3 components throw on malformed definitions; older ones keep the
  old behaviour). ✓
- **Shader pack mid-flight retarget:** carried as documented v1 behaviour
  in both the run record and Engine README. ✓
- **M16 non-catch (0 ms long tasks):** filed in `EXAM_RESULTS.md`, the run
  record's Carries, and the book's M16 chapter — the layout-read counter
  named as the owning instrument, the long-task check "unproven against
  it". Not hidden, not rounded into a catch. ✓

## 4 · Per-module House verdicts

- **M12 (Projects 8 · 9 · 10) — PASS.** One MINOR (defect-filing pointer in
  Project 10's README, §1). Fences, refusals-by-name, and state-printing
  readouts all as the rules require.
- **M13 — PASS.** Two MINOR prose compressions (§1); the underlying filing
  (README + `results.json` + DEFECTS.md) is envelope-complete, method-named,
  and files its non-wins beside its wins per Rule 27. H-15 discharge is
  recorded identically in four places.
- **M14 — PASS.** No findings. Parity by reference, the filing's scope
  stated on its face ("a study filing, not a certification"), instrument
  failures owned by the harness per Rule 29.
- **M16 — PASS.** No findings. Baseline-as-decision, answer key filed
  openly, both harness-side defects and the one non-catch filed in the
  results themselves.

**No BLOCKER and no MAJOR findings on the House axis.**

## 5 · House view on the exit gate

The Phase 3 records **do not claim the exit gate** — the run record defers
the ruling to the separately filed grading record, states the Phase 1 gate
as OPEN in its head and its carries, and nowhere implies Track 7
graduation. That restraint is exactly what the house requires. On the
House axis there is nothing in the record's wording that bars the grading
record from ruling on Phase 3's own gate, provided the ruling keeps the
Phase 1 gate open in the same breath — as every Phase 3 record reviewed
here does.

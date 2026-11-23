# TRACK 7 · PHASE 3 — HOUSE-AXIS RE-REVIEW

*Reviewer: fresh-context House axis re-reviewer (did not build any of this).
Scope: only the three MINOR findings in `HOUSE_AXIS.md` §1, plus a fourth
post-freeze amendment added on the Kimi critic's observation. Nothing else
was re-reviewed. Verified on disk 2026-11-23 against the underlying evidence.*

## Verdict summary

| # | Finding | Verdict |
|---|---|---|
| 1 | CLS shorthand — run record | **CONFIRMED-FIXED** |
| 2 | Index timing rounding — run record + book | **CONFIRMED-FIXED** |
| 3 | Wrong pointer — Project 10 README | **CONFIRMED-FIXED** |
| 4 | M14 reduced-motion carry — run record (post-freeze amendment) | **CONFIRMED-FIXED** |

## 1 · CLS shorthand — CONFIRMED-FIXED

- **Now on disk** (`TRACK_7_PHASE_3_RUN.md`, M13 summary): 
  "layout reads ~3,370 → **0**, CLS 0.0014–0.606 → **0.0014**"
  — the broken side is now stated as a range, not as "CLS ≤0.606".
- **Evidence** (`track7-artifacts/m13-performance/results.json`, summary):
  broken `cls: {min: 0.0014, max: 0.6059}`; fixed `cls: {min: 0.0014, max: 0.0014}`.
  Per-run `clsTotal`: broken 0.6059 and 0.0014; fixed 0.0014 and 0.0014.
- **Judgement:** the stated range is honest. The low end (0.0014) is a real
  broken run, so the range no longer implies a cleaner separation than the
  envelope shows. The top end 0.606 is 0.6059 rounded to three decimals —
  the same rounding the original House review itself accepted in the book
  ("from up to 0.606 to 0.0014"); the module README table files the
  unrounded envelope (0.0014–0.6059). No number is false and the framing
  now matches its own filing.

## 2 · Timing rounding — CONFIRMED-FIXED

- **Now on disk, both files:**
  - `TRACK_7_PHASE_3_RUN.md`: "later (8.7–9.0 s vs 0.3–0.7 s)"
  - `TRACK_7_CINEMATIC_WEB_ENGINEERING.md` (M13 chapter): "the fixed build's
    sliced index finishes *later* than the broken build's blocking one
    (8.7–9.0 s vs 0.3–0.7 s — …)"
  Neither file retains the old "~9 s vs ~0.5 s" form in the M13 passage.
- **Evidence** (`results.json`, summary `indexPrintedAtMs`): fixed
  `{min: 8729, max: 9010}` ms = 8.7–9.0 s; broken `{min: 318, max: 720}` ms
  = 0.3–0.7 s (0.720 rounds to 0.7 at one decimal).
- **Cross-check:** the module README (`m13-performance/README.md`, "The
  honest trade on file") files exactly "~8.7–9.0 s" vs "~0.3–0.7 s".
  The run record and the book now match the module's own filed figures.

## 3 · Wrong pointer — CONFIRMED-FIXED

- **Now on disk** (`track7-artifacts/project-10-architecture/README.md`):
  "Filed as defects D-P3-1 and D-P3-2 in the Phase 3 run record: *the file
  on disk is the contract; a summary of it is not.*"
  The words "grading record" no longer appear as the pointer.
- **Evidence the pointer now lands correctly:** `TRACK_7_PHASE_3_RUN.md`,
  "## Defects found by the instruments, fixed in the run", contains both
  entries verbatim — "D-P3-1 (component documentation)" and
  "D-P3-2 (producer, the phase's most instructive)" — with the same
  substance the README summarises (state-machine header / `{ veto: true }`
  for D-P3-1; paraphrased scene-nav API rewritten to the file for D-P3-2).

## 4 · M14 reduced-motion carry (Kimi amendment) — CONFIRMED-FIXED

- **(a) The bullet exists.** It is the final bullet of "## Carries" in
  `TRACK_7_PHASE_3_RUN.md`, verbatim:
  "M14's reduced-motion evidence is the browser's own emulated setting
  exercised in a headless lab, not a physical device setting (the WCAG
  filing's scope statement says so in as many words); the alternative
  itself contains no motion at all. Added to the carries on the Kimi
  critic's observation, 2026-11-23."
- **(b) Faithful to the scope statement.**
  `track7-artifacts/m14-accessible-alternative/WCAG_FILING.md`, section
  "The reduced-motion path, exercised", states under "Scope honesty":
  "the emulation is the browser's own media feature, exercised in a
  headless lab. The house rule stands that motion verdicts on pages George
  ships are confirmed on a real device; for this study artifact the
  emulated setting plus the alternative's total absence of motion is the
  filed evidence, labelled as such."
  The same filing confirms the second half: the alternative "has no motion
  to reduce (transitions measured at 0s)" and, at criterion 2.2/2.3,
  "the alternative contains no pacing, no transitions … no auto-updating
  content".
- **Judgement:** every element of the bullet maps to the filing — emulated
  (not physical/device) setting, headless lab, alternative contains no
  motion. "Not a physical device setting" is a fair paraphrase of the
  filing's emulated-vs-real-device distinction, not an overclaim; the
  bullet adds no claim the filing does not make. The WCAG filing itself
  still matches its frozen hash (24482c2f…), so the source was not
  altered to fit the bullet.

## Collateral-change check

- A skim of the edited passages shows no other material change in
  substance: the M13 summary's other figures (layout reads, LCP, longest
  script, FPS non-win, index value, H-15 / 36/36), the book M13 chapter's
  surrounding claims, and Project 10 README's surrounding defect account
  are unchanged in substance; the Carries addition is additive only.
- **Hash note (expected, not a finding):** `FROZEN_SET.md` predates the
  fixes, so exactly the amended files mismatch it —
  `TRACK_7_PHASE_3_RUN.md` (frozen abd9964a… → current aaaf42fb…; covers
  findings 1, 2 and item 4), `TRACK_7_CINEMATIC_WEB_ENGINEERING.md`
  (frozen d5ed35cb… → current 51beec29…; finding 2), and
  `project-10-architecture/README.md` (frozen 2c5bbfcc… → current
  315fd6ac…; finding 3). The evidence files relied on here still match
  the frozen set: `m13-performance/results.json` (3be656b3…),
  `m13-performance/README.md` (c85f2aed…), and
  `m14-accessible-alternative/WCAG_FILING.md` (24482c2f…).

**Result: 4 of 4 — all three original MINOR findings CONFIRMED-FIXED, and
the fourth (Kimi) amendment CONFIRMED-FIXED. No STILL-OPEN items in this
re-review's scope.**

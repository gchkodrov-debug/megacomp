# TRACK 7 — PHASE 5 — HOUSE AXIS (BLIND GRADING)

*House axis only: honesty of the record, freeze and ledger
practice, claim discipline, compliance with the captain's
rulings. Fresh context; the producer's reasoning was not
read, the Promise axis was not read, and
`grading-phase5/finisher-runs/` was not read. Every finding
is graded CONFIRMED / NEEDS-CHECK / REJECTED; rejected
findings stay on record — they protect the producer.*

*Counts: CONFIRMED 8 · NEEDS-CHECK 3 · REJECTED 8.*

---

## 1. FREEZE DISCIPLINE

### H-01 — CONFIRMED — The Phase 5 run froze nothing; the only freeze is the completion grading's, made after the run closed

- `grading-phase5/FROZEN_SET.md` lines 3–6, on its own face:
  *"Frozen by the Phase 5 completion grading (the finisher
  run) on 2026-11-23, before any blind axis sat."*
- No run-time freeze exists anywhere in the producer set:
  `grep -rn "FROZEN|freeze"` over `project-12-kit/` and
  `TRACK_7_PHASE_5_RUN.md` returns no freeze filing, and the
  run record never mentions a freeze, a hash, or a set.
- Timestamps (stat): run record 13:55:04 UTC ·
  EXAM_MATRIX.md 13:54:45 UTC · the install sitting's build
  13:56–13:59 UTC · FROZEN_SET.md 14:04:57 UTC. The sitting
  itself postdates the run record that was supposed to
  account for the phase.

**What this grading can and cannot prove.** The completion
freeze is accurate as found (see R-06): it pins the bytes
the axes graded, and its amendments ledger (FROZEN_SET.md,
tail: *"No entries yet"*) can catch any drift from
2026-11-23 14:04 onward. It **cannot** prove the frozen set
is the set as the run left it: between the end of building
and the freeze there was no tripwire at all. Phase 4's
failure was the opposite shape — a producer freeze existed
and 16 post-freeze changes went unledgered (Phase 4 grading
record, H-01). Phase 5 has no drift *evidence* and also no
drift *detection*: "no changes were caught" here means
"nothing was watching," not "nothing changed." Any exit-gate
signature must therefore be a signature over the set **as
found by the completion grading**, never over "the run's
frozen set" — no such set exists.

### N-02 — NEEDS-CHECK (minor) — The frozen set is verifiable, but not with one command from one directory

`sha256sum -c FROZEN_SET.md` run from `track7-artifacts/`
returns **392 OK** and 2 "FAILED open or read"
(`crew-university/TRACK_7_PHASE_5_RUN.md` and the bare
`TRACK_7_CINEMATIC_WEB_ENGINEERING.md` line in the
state-observed section); run from `tools/`, the run record
verifies OK (`b56b7cc8…`, matching disk). Three path-root
conventions in one file. The set is sound; its verification
recipe should have been stated on its face.

---

## 2. CLAIM DISCIPLINE

### H-02 — CONFIRMED — "now Rule 41" names a rule that does not exist

- Run record line 113: *"The working discipline, now
  Rule 41: **unlink before writing; verify by hash; or
  reference in place instead of copying.**"*
- The rules file (`crew-skills/cinematic-web-engineering-rules.md`)
  ends at **Rule 38**, Instalment 6 (Phase 4) — grep shows
  instalments 1–6, rules 1–38, no 39, 40, or 41. The only
  occurrence of "Rule 41" in the entire university tree is
  the run record's own sentence.
- The standing files' hashes in FROZEN_SET.md's
  "State observed at freeze" section (rules `614a38d9…`,
  book `40d90d37…`) match disk exactly at grading time, so
  this is not a post-freeze filing the axis missed: at
  freeze, there was no Rule 41.
- Aggravating, not mitigating: the rules file's own header
  (line 13) states the mechanism — *"This file grows one
  instalment per phase, distilled from the book sections
  actually written. A rule that is not in the book is not
  in this file."* The claim does not merely point at a
  missing filing; it asserts a standing law that the house's
  own filing mechanism forbids existing in that form.

### H-03 — CONFIRMED — The calibration's visual figure is misquoted by 10× in two filings

- Run record lines 52–53: *"calibration VERDICT PASS
  (unit / e2e / visual **0.038%** …"*
- `project-12-kit/BUDGETS.md` line 156: *"visual (**0.038%**
  against the filed baseline)"*
- The filed instrument, `project-12-kit/calibration/results-calibration.json`
  line 84: `"detail": "diff ratio 0.004% within 1.00%"`.
- Both figures pass the 1% bar, so no verdict changes; the
  number as filed in prose is not the number the instrument
  produced. Either the prose misquotes the run, or the
  0.038% run's raw report was never filed — on the record
  as it stands, the claim is wrong.

### H-04 — CONFIRMED — The calibration band is claimed as measured; three of its four runs have no filing

- `BUDGETS.md` lines 159–163 files the band as fact:
  *"8,855 / 10,312 / 10,534 / 11,244 ms against the 12,000
  ceiling … LCP 172–224 ms."* The run record line 54
  repeats it: *"long-task readings across the day
  8,855–11,244 ms … LCP 172–224 ms."*
- `calibration/` contains exactly three files
  (`qa.config.mjs`, `run-calibration.mjs`,
  `results-calibration.json`). The single filed run is
  8,855 ms / LCP 192 ms. The values 10,312, 10,534, 11,244
  and LCP 172 appear **nowhere** in any raw filing in the
  producer set (grep over the kit's .md/.json/.txt).
- This is the Phase 4 N-03 shape exactly: figures that are
  prose-only must be downgraded to *"reported, not filed"*
  (the remedy Phase 4's QA_RESULTS amendment 2 applied, and
  which BUDGETS.md itself applies correctly to the Phase 4
  probes — see R-04). Here no downgrade label exists; the
  band is load-bearing colour for the 12,000 ms ceiling's
  validation. Rule 18 (a printed number carries its envelope
  **and its method**) is satisfied in form — an envelope is
  printed — but an envelope over unfiled runs is a claim,
  not a measurement.

### H-08 — CONFIRMED — The environment section asserts specifics no filing evidences

Run record lines 103–127 ("THE ENVIRONMENT") state, as
fact: overlay-filesystem EPERM bursts; "ghost" stubs that
"refused every later overwrite"; an early copy script sent
into "an infinite retry"; headless Chrome dead at launch
"(SIGTRAP, exit 133, on every path …) for a stretch of
hours"; "the shared host's memory sat ~90% consumed by
neighbouring tenants"; a background copy process that "died
with its session."

Grep for EPERM / SIGTRAP / ghost / overlay across the whole
producer set returns **no filing** — no log, no error file,
no timing note; the terms occur only in the run record
itself (remaining hits are unrelated bytes in vendored
`three.min.js`). No graded number rests on these claims,
and the section's purpose — explaining the in-place
referencing choice — is honest in direction. But exit codes,
percentages, and durations are printed numbers, and the
house standard (Phase 4 H-04: provenance must trace to raw
output or be downgraded) applies to weather as much as to
perf. As filed, this section is coordinator testimony
presented as record; it should have been labelled as
observed-by-the-coordinator or evidenced with one log.

### Claims checked and found exact (see also §5, REJECTED)

- Kit manifest: 50 entries on disk (`KIT_MANIFEST.json`,
  `len(files) == 50`) — run record's "50 manifest entries
  (45 kit files + 5 documents)" holds.
- Demo QA figures: `project-12-kit/qa/results.json` perf
  gate reads 47 reads · 5,560 ms · CLS 0 · LCP 260 ms ·
  off-screen 0 ms — identical to the run record and to
  EXAM_MATRIX row 10.
- Debugging exam: `exam/diagnosis.json` — broken seq 1→1,
  fixed 1→120; canvas diff 4.61% broken / 0.00% fixed;
  warm-bright 0.03% / 0.31% — identical to the casebook,
  the run record, and matrix row 13.

### N-01 — NEEDS-CHECK — Three headline counts rest on scripts whose raw outputs were not filed

Demo "verify 22/22" and "accessible-verify 14/14" (run
record; matrix rows 1, 12, 18) and the worked example's
"runs green from a scratch copy … all PASS": the scripts
exist (`demo/verify.mjs`, `demo/accessible-verify.mjs`),
but `demo/` files no results output, and no worked-example
run report was found in the producer set (the
finisher-runs workspace was outside this axis's read
permission). Unlike the calibration, demo-QA, and diagnosis
figures — each backed by a filed JSON — these three counts
are prose-only as filed. A re-run settles them; the record
alone does not.

### N-03 — NEEDS-CHECK (hygiene only) — Three zero-byte files ride in the frozen exam folder

`project-12-kit/exam/chunk.bin`, `t1.txt`, `t2.txt` — all
0 bytes, all frozen into the set. No claim rests on them;
whether they are fixtures or debris of the environment
troubles in H-08 is not stated anywhere.

---

## 3. THE BOOK AND THE RULES — WHAT PHASE 5 LEFT UNFILED

### H-05 — CONFIRMED — Both closing instalments are missing, and the matrix cites one of them as evidence

Exactly what is unfiled:

1. **The book's Phase 5 instalment.** `TRACK_7_CINEMATIC_WEB_ENGINEERING.md`
   (1,511 lines) ends with *"End of the Phase 4 instalment"*;
   grep for a Phase 5 instalment returns nothing.
   FROZEN_SET.md's state-observed section states the same
   fact on its face.
2. **The rules file's Phase 5 instalment (Instalment 7).**
   The rules file ends at Instalment 6 / Rule 38. Every
   Phase 5 lesson the run record names — the off-screen
   probe's three instrument defects, the Rule 34 catch on
   the shader stage, and the discipline the run record
   calls "Rule 41" — has no distilled rule anywhere.

The omission is **load-bearing in one place**:
EXAM_MATRIX row 16 names as its demonstration artifact
*"the Kit's README/INSTALL/CUSTOMIZE/CHANGELOG/BUDGETS +
**the book's Phase 5 instalment**"* — a filing that does
not exist. Mitigation, recorded fairly: row 16 is marked
**PENDING RUN**, and the matrix footer (lines 32–34)
states no PENDING row is claimed as a pass anywhere. The
dangling pointer sits in a pending row, not in a passed
claim.

**Weight: a deliverable failure, not a clerical gap.**
Three reasons. (a) The pattern is structural, not
accidental: instalments 1–6 map one-per-phase across
Phases 0–4, and the rules header makes the instalment the
*only* route by which a lesson becomes a standing rule —
Phase 5's lessons therefore currently bind nobody. (b) The
run record's "Rule 41" claim (H-02) is this omission
wearing a number: the run behaved as if the instalment
existed. (c) A §26 matrix row cites the missing instalment
as examination evidence. A missing appendix would be
clerical; a missing instalment that other filings point at
is a deliverable the phase owed and did not file. (This
axis does not write the missing prose.)

---

## 4. RULINGS COMPLIANCE

### R-01 — REJECTED (no defect) — Phase 1's gate / Flow / M6: clean

The only Flow mention in any Phase 5 filing is the run
record's disclaimer (lines 131–134): Phase 1's gate "stands
OPEN on Project 4 / M6 … No Phase 5 artifact attempts,
implies, or touches Flow." Grep over the Kit's text filings
finds no other Flow or M6 reference. Nothing touches,
implies, or overclaims Flow.

### R-02 — REJECTED (no defect) — Graduation wording: clean

Grep for "graduat*" across the run record and the Kit's
text filings returns no declaration or implication that
Track 7 has graduated. The matrix leaves rows 2, 16, and
17 PENDING with an explicit footer that no PENDING row is
claimed as a pass. The run record's closing pointer sends
the verdicts to the grading record — i.e., to the captain
judging last — which is the correct posture.

### R-03 — REJECTED (no defect) — Project 11: no re-grade, no discharge, in wording

`BUDGETS.md` line 11: *"It changes no graded record:
Project 11's Phase 4 filing stands exactly as ruled, and
nothing here re-grades it"*; line 136: the validation "is
not a re-grade of Project 11." Run record lines 135–138:
the hardware perf filing "remains owed … not discharged by
the calibration run (a lab validation, on the same
software-GL bench)." The calibration's scope language is
exactly what the captain's Phase 4 ruling requires. (The
calibration's *numbers* carry H-03/H-04; its *scope* is
clean. Rule 36 is likewise respected in form: the budgets
were derived from other pages' filed figures and declared
in configs before the runs they judge — BUDGETS.md,
"What binds" section; nothing in the filings contradicts
the ordering claim.)

### R-04 — REJECTED (no defect) — The captain's N3 question (claims vs methods): no §21-type overclaim in Phase 5

Phase 5 files no §21-style studies, and its "measured"
claims attach to harness instruments whose JSONs exist
(calibration, demo QA, diagnosis) — with the two
exceptions already confirmed as H-03/H-04, which are
figure/provenance defects, not a fetch-only method dressed
as measurement. Positively: BUDGETS.md correctly carries
the Phase 4 attribution probes as *"reported, not filed"*
and states they are "not load-bearing" in the derivation —
the N3 discipline applied correctly, in the same document
that then fails it for its own band (H-04).

---

## 5. DOES-NOT-CLAIM DISCIPLINE

### H-07 — CONFIRMED — The WHAT THIS RUN DOES NOT CLAIM section is good on scope and incomplete on the record

What it gets right (run record lines 129–147) is the
house's best practice: Phase 1 left OPEN in the captain's
own terms; Project 11's hardware filing still owed; the
git-commit clause "recorded here as in every phase before
it, not papered over"; M13's app.js maxima and Project 7's
B8 fragility carried as watched-not-closed, each with its
reason. No axis could ask for better scope disclaimers.

What it should also have disclaimed, and did not:

1. **The missing instalments** (H-05) — the section never
   mentions the book or the rules, while the body claims
   a Rule 41 from the missing instalment (H-02).
2. **The install sitting's state** (H-06) — at the run
   record's own timestamp the sitting had not happened;
   the record does not mention the sitting at all, in
   either direction.
3. **The unfiled raw outputs** behind verify 22/22,
   accessible-verify 14/14, and the calibration band
   (N-01, H-04).
4. **The environment section's evidentiary status** (H-08)
   — testimony, not filings.
5. **The forward pointer stated as a present filing:** the
   run record's header ("The verdicts live in
   `TRACK_7_PHASE_5_GRADING_RECORD.md`") and closing
   ("is filed in `TRACK_7_PHASE_5_GRADING_RECORD.md`")
   point at a file that did not exist when the record was
   written and does not exist as this axis grades (it is
   this grading's own deliverable). A pointer to the
   grading's future record is normal house practice; the
   present tense ("live in", "is filed") overstates it.

---

## 6. THE INSTALL SITTING'S RECORD

### H-06 — CONFIRMED — The sitting preserved its build and filed no record of itself

`grading-phase5/install-sitting/` contains exactly one
thing: `build/` — the preserved page (verify-results.txt
17/17 PASS for a *different* brief's product, "Hearth №1";
qa-results.json verdict PASS; accessible-verify results).
There is **no sitting record**: no brief, no
EXAM_ATTEMPT-equivalent filing, no builder identity or
freshness statement, no start/end/elapsed timing, no
questions-or-gaps log, no disposition of anything the
builder raised. Nothing at the sitting root; nothing in
the run record (which predates the build's timestamps);
the matrix row that the sitting examines (row 16) still
reads "PENDING RUN (sitting in progress)" in the frozen
set, because it was frozen before the sitting finished.

Compare the Phase 4 M15 standard (`grading-phase4/`):
`EXAM_ATTEMPT_1.md`–`EXAM_ATTEMPT_4.md`, each headed with
builder freshness ("a fresh-context agent, package
documents alone"), start and end in UTC, elapsed to the
second (3m54s · 3m41s · 3m18s · 3m17s), the preserved site,
every documentation gap enumerated and dispositioned, plus
`exam-start.txt` carrying the start epoch. That is the
filing standard the house set for exactly this exam, one
phase earlier.

Consequence: the preserved build proves *a* page was built
that passes its checks. The record cannot prove the exam's
defining conditions — fresh builder, documents alone,
timed, zero questions (Rules 33/38 discipline: a question
is a documentation defect, recorded as one). On the House
axis, row 16's sitting is **unevidenced as an exam**,
however good the build is as a page.

### R-05 / R-06 / R-07 / R-08 — REJECTED findings (producer protection, stated compactly)

- **R-05** — *Suspicion: the matrix overclaims the exam.*
  Rejected: rows 2, 16, 17 are PENDING and the footer
  disclaims them as passes (EXAM_MATRIX lines 32–34).
- **R-06** — *Suspicion: the completion freeze is itself
  inaccurate or already drifted.* Rejected: at grading,
  392 artifact-relative hashes verify OK, the run record
  verifies from its root, and both standing files match
  the state-observed hashes byte-for-byte. The freeze is
  late and external (H-01); it is not wrong.
- **R-07** — *Suspicion: the debugging casebook's figures
  are prose inventions.* Rejected: every figure matches
  `diagnosis.json` exactly (see §2).
- **R-08** — *Suspicion: the Kit/demo headline counts are
  inflated.* Rejected for the manifest (50, exact) and the
  demo QA gate figures (exact against `qa/results.json`);
  the verify/accessible counts are N-01, not a confirmed
  inflation.

---

## AXIS VERDICTS

- **The record's honesty — NOT SIGNABLE AS FILED.**
  The scope honesty is exemplary (R-01–R-04: no Flow
  overclaim, no graduation language, no Project 11
  re-grade, carries named and not closed, the casebook
  even keeps its own instrument failure — the 23.2
  luminance tie — on record). But the record invents a
  standing rule (H-02), misquotes its own calibration
  instrument by 10× (H-03), presents an unfiled run band
  as measured fact (H-04), and prints environment
  specifics with no evidence behind them (H-08). None of
  these moves a graded verdict; all of them are the exact
  failures this axis exists to catch, and a signature over
  the record as filed would certify them.
- **Freeze / ledger practice — FAIL for the run; PASS for
  the completion freeze as found.** The run operated the
  whole phase with no freeze and no ledger (H-01) — the
  Phase 4 lesson (a freeze is a tripwire) was not carried
  into Phase 5's own practice. The completion grading's
  freeze is accurate, ledgered, and verifiable (R-06,
  N-02 noted).
- **Rulings compliance — PASS.** Phase 1's gate, the
  graduation bar, Project 11's conditional perf leg, and
  the N3 claims-vs-methods discipline are all respected
  in every filing checked; the defects in this phase are
  claim-and-record defects, not ruling breaches.
- **Exit gate — the House axis CANNOT SIGN yet.** It can
  sign when the following satisfiable checks pass, every
  one by amendment filed in FROZEN_SET.md's ledger (no
  silent edits to frozen files):
  1. H-02: strike "now Rule 41" by amendment, **or** file
     the rules Phase 5 instalment with its rules numbered
     as filed — check: grep finds the cited rule in the
     rules file, or the claim is gone from the record.
  2. H-03: correct 0.038% → 0.004% in both filings by
     amendment, or file the 0.038% run's raw JSON —
     check: prose figure equals a filed JSON figure.
  3. H-04: file the three missing calibration runs' raw
     reports, or downgrade the band to "reported, not
     filed" in BUDGETS.md and the run record — check:
     every band value traces to a filed file, or the
     downgrade label is present.
  4. H-05: file the book's Phase 5 instalment and the
     rules' Phase 5 instalment, or amend EXAM_MATRIX
     row 16 and the run record to remove the pointer and
     add the omission to DOES NOT CLAIM — check: the
     cited instalment exists, or nothing cites it.
  5. H-06: file a sitting record (brief, builder
     identity/freshness, start/end/elapsed, questions
     raised and their dispositions) at the Phase 4
     EXAM_ATTEMPT standard, or amend row 16 to state the
     sitting is evidenced by its build alone — check:
     the filing exists with all five elements, or the
     matrix says what the evidence actually is.
  6. H-07/H-08: add the missing disclaimers (instalments,
     sitting, unfiled outputs) and label the environment
     section as coordinator-observed or file one piece of
     evidence per claim — check: the amended DOES NOT
     CLAIM section names items 1–4 of H-07.
  On those six checks passing, the House axis signs the
  **record** — over the set as found by the completion
  freeze (H-01's limit stands permanently: no signature
  from this axis can certify the run-time set). Whether
  the phase's substance passes is the Promise axis's and
  the captain's call, not this axis's.

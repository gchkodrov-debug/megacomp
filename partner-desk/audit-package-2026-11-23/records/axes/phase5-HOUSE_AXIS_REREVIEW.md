# TRACK 7 — PHASE 5 — HOUSE AXIS RE-REVIEW (COMPLETION GRADING)

*House axis only, re-review seat. Fresh context. Scope: the
six satisfiable amendment checks set by the original House
review (`HOUSE_AXIS.md`), verified against the filings as
amended by the completion grading's fix loop (Wave 1), plus
the amendments-ledger mechanics and one known side effect.
The Promise axis's substance verdicts are not this seat's
to grade. Method: every amended file read in full; every
figure traced to its raw filing; every ledger hash
re-computed from disk.*

*Verdicts: PASS 6 · NOT PASS 0 — with two closing-paperwork
conditions recorded at the signature, both about the
grading's own record, not the producer's.*

---

## CHECK 1 — H-02 ("Rule 41") — **PASS**

Fork taken: strike by amendment (the rules instalment was
not filed — correctly, per the captain's instruction to
this grading not to write the missing prose).

Evidence:

- `TRACK_7_PHASE_5_RUN.md`, AMENDMENT item 1, on the face
  of the record: *"'Rule 41' is retracted. … No Rule 41
  exists: the rules file … ends at Rule 38, Instalment 6,
  and no Phase 5 rules instalment was filed."* The
  discipline is restated as *"a practised discipline, not
  a promulgated rule"* — the claim's status is downgraded,
  not merely footnoted.
- Verified independently: the rules file
  (`crew-skills/cinematic-web-engineering-rules.md`) ends
  at Instalment 6; its last numbered rule is 38 ("A study
  labels its own eyes"); grep finds no "Rule 41" in it.
  The book likewise still ends at the Phase 4 instalment.
- The original sentence ("now Rule 41", run record line
  113) still stands in the body — as it must: the House
  required correction *by amendment filed in the ledger*,
  with no silent edits to frozen files. Read as amended —
  the only way this house reads a frozen record — the
  claim no longer stands; the retraction is unambiguous,
  names the true state (Rule 38 / Instalment 6), and
  records both Phase 5 instalments as owed deliverables.

## CHECK 2 — H-03 (0.038%) — **PASS**

Fork taken: correct both filings by amendment.

Evidence:

- The filed instrument governs and was re-read:
  `project-12-kit/calibration/results-calibration.json`
  — `"detail": "diff ratio 0.004% within 1.00%"`.
- Run record AMENDMENT item 2: where the record quotes
  0.038%, the instrument *"says **0.004%**. The raw
  instrument output governs."*
- `BUDGETS.md` erratum item 1: identical correction,
  identical governing figure, verdict noted unaffected.
- Prose-as-amended (0.004%) equals the filed JSON figure
  (0.004%) in both filings. The body's original 0.038%
  remains visible under the erratum — append-only, as
  required. No 0.038% run was filed or claimed to exist.

## CHECK 3 — H-04 (the calibration band) — **PASS**

Fork taken: downgrade to "reported, not filed" in both
files (no missing runs were filed; `calibration/` still
contains exactly its three frozen files — config, runner,
one results JSON — re-listed at re-review).

Evidence:

- Run record AMENDMENT item 3: the readings 10,312 /
  10,534 / 11,244 ms and the LCP figure 172 ms are
  *"**reported, not filed**"*; only the one filed run
  (8,855 ms · LCP 192 ms · reads 24 · CLS 0 · off-screen
  0 ms) *"alone carries the calibration's PASS."* Each
  figure named matches `results-calibration.json`
  exactly (8855 ms, LCP 192 ms, 24 reads, CLS 0).
- `BUDGETS.md` erratum item 2: same downgrade, same filed
  run identified, plus the derivation expressly re-based:
  *"the derivation of the 12,000 ms ceiling rests on the
  filed Phase 2–4 figures in the evidence table, not on
  the unfiled runs."* Erratum item 3 further annotates
  the ceiling provisional, single-exemplar — beyond what
  the check required, and correct.
- Trace test applied to every band value: 8,855 ms and
  LCP 192 ms trace to the filed JSON; 10,312 / 10,534 /
  11,244 ms and LCP 172 ms appear in no raw filing
  (grep over the kit's .json/.txt confirms) and now carry
  the downgrade label in both documents that quote them.
  The BUDGETS erratum sweeps the whole quoted LCP band
  (172–224 ms) into the downgrade — conservative, since
  224 ms also appears in the filed Phase 4 evidence
  table; over-downgrading a calibration-band endpoint is
  not a defect.

## CHECK 4 — H-05 (the missing instalments) — **PASS**

Fork taken: the amendment fork, judged on its own terms
per the captain's instruction (the instalments' prose was
not to be written by the grading; the gap was to be
recorded).

Evidence:

- `EXAM_MATRIX.md` AMENDMENT, first bullet: row 16's
  demonstration *"named 'the book's Phase 5 instalment'.
  That instalment does not exist … and the citation is
  **withdrawn**."* Row 16's demonstration is restated as
  the Kit's five documents (README · INSTALL · CUSTOMIZE
  · CHANGELOG · BUDGETS) and the sitting's preserved
  build. Both instalments are recorded as *"owed
  deliverables the phase did not file."*
- Run record AMENDMENT item 1 records the same owed
  status, and item 4 adds the omission to DOES NOT CLAIM
  (see Check 6).
- Citation sweep: grep for the Phase 5 instalment across
  the run record and the kit's filings finds it only in
  (a) row 16's original table cell — the frozen text the
  amendment expressly withdraws, which the ledger forbids
  rewriting — and (b) the amendments themselves, in
  withdrawal/owed language. Nothing in the amended
  filings still cites a nonexistent instalment as
  evidence.
- One imprecision noted, not a failure of this check:
  the matrix amendment calls the five documents
  "hash-verified in KIT_MANIFEST.json" — true for four;
  BUDGETS.md now verifies through the FROZEN_SET ledger
  chain, its manifest entry being stale. See the
  side-effect ruling below; the grading record's
  disclosure must say this in those terms.

## CHECK 5 — H-06 (the install sitting) — **PASS**

Fork taken: the second fork in substance — the matrix
amended to state what the evidence actually is — executed
through a new memorandum plus the matrix amendment,
rather than a fabricated Phase 4-standard attempt record.
That is the honest shape of this fork: a retrospective
EXAM_ATTEMPT filing inventing brief, timing, or freshness
would have been the one unacceptable cure.

Evidence — `install-sitting/SITTING_MEMORANDUM.md`:

- The gaps are stated plainly, each under its own head,
  in "What is NOT recorded": **builder identity and
  freshness** — *"no statement exists"*; **the brief** —
  *"its text was not preserved"*; **timing** — *"no
  start, end, or elapsed time was recorded"*; **questions**
  — *"**no question log exists** … not recorded either
  way."* It closes: the exam conditions (fresh builder,
  documents alone, timed, zero questions) are
  *"**unevidenced**, and this memorandum does not attest
  them"*, measured against the Phase 4 standard it names
  as the higher bar the phase fell short of.
- No fabrication found. Every positive claim in the
  memorandum was checked against the preserved build:
  verify **17/17** (`verify-results.txt`, counted) ·
  accessible parity **16/16** (`accessible-verify-results.txt`,
  counted) · QA **verdict PASS** with perf reads 3,
  long-task 144 ms, CLS 0, LCP 208 ms (`qa-results.json`,
  exact) · the earlier **FAIL (CLS 0.266)** preserved in
  `qa-run-output.txt` before the passing re-run. The
  "Hearth №1" different-brief fact is evidenced by the
  build itself, as the memorandum says, and its borrowed-
  media disclosure is the build config's own.
- The matrix amendment mirrors it: *"The sitting filed
  no record of itself … the sitting's exam conditions
  (timed, zero questions) are unevidenced"*; the
  documentation's sufficiency is claimed only as
  *"demonstrated by the build"* — exactly the statement
  the House check's second fork required.

## CHECK 6 — H-07 / H-08 (disclaimers + environment) — **PASS**

Evidence — run record AMENDMENT item 4 ("Additions to
WHAT THIS RUN DOES NOT CLAIM") names, one for one, the
four items the original review's check demanded:

1. **The instalments** — the book's and the rules'
   Phase 5 instalments (cross-referred to item 1).
2. **The sitting** — *"any record of the blind-install
   sitting beyond its preserved build — no brief, timing,
   builder statement, or question log was filed for it"*,
   with the pointer to the memorandum.
3. **The unfiled outputs** — *"filed raw outputs behind
   the demo's verify 22/22 and accessible-verify 14/14
   counts — prose-only as filed"*, with the reproduction
   note. The note itself verifies: `grading-phase5/
   finisher-runs/` holds `demo-verify-output.txt`
   (tail: "22/22 checks passed") and
   `demo-accessible-verify-output.txt` (tail: "14/14
   checks passed") — the N-01 counts are now reproduced
   on file, which is more than the disclaimer required.
4. **The environment's status** — its specifics (EPERM
   bursts, exit 133, host memory) are labelled
   *"**coordinator-observed testimony**, not filings, and
   no graded number rests on them"* — the H-08 labelling
   fork, taken in the run record itself.

Item 5 addresses H-07's fifth point (the grading-record
pointer's present tense) — see the condition at the
signature: item 5 asserts the grading record *"exists
now"*, and at re-review `TRACK_7_PHASE_5_GRADING_RECORD.md`
is not yet on disk. The tasking for this seat states the
same ("the grading record itself is not yet filed"). This
is a sequencing prematurity in the grading's own closing
paperwork, not a defect in the producer record this check
grades; it becomes true on the filing the amendment
belongs to, and the signature below is conditioned on
that filing. If the grading were to close without filing
that record, item 5 would stand as a fresh H-07 defect
and this PASS would not survive it.

---

## LEDGER MECHANICS — **PASS**

`FROZEN_SET.md`, AMENDMENTS LEDGER, Wave 1: all five
entries re-hashed from disk at re-review. Frozen → current
chains match disk **exactly**:

| File | Frozen (ledger = producer-set section) | Current (ledger) | Disk now |
|---|---|---|---|
| `TRACK_7_PHASE_5_RUN.md` | b56b7cc8… | 151174f8… | 151174f8… ✓ |
| `project-12-kit/BUDGETS.md` | 1f8ced40… | 0df29495… | 0df29495… ✓ |
| `project-12-kit/exam/EXAM_MATRIX.md` | 1a976612… | 03e6574f… | 03e6574f… ✓ |
| `project-12-kit/exam/DEBUGGING_CASEBOOK.md` | 4377390c… | 0a6681cd… | 0a6681cd… ✓ |
| ADDITION `install-sitting/SITTING_MEMORANDUM.md` | — | b6d53e61… | b6d53e61… ✓ |

(Full hashes were compared character-for-character, not
by prefix; prefixes shown for readability.)

Append-only discipline verified, not assumed: the
original defective text is still present in every amended
body (the "now Rule 41" sentence, both 0.038% quotations,
the band figures, row 16's original cell) — the wave
corrected by appended amendment on the face of each file,
exactly as the House required, with no silent rewrite.
The wave's fourth amendment (the casebook's mean-luminance
tie downgraded to reported-not-filed) was also verified:
`diagnosis.json` carries no luminance field; the 23.2 tie
lives only in `diagnose.mjs`'s header comment and the
casebook prose, as the amendment states. The N-02
verification recipe is now stated on FROZEN_SET.md's face.

## SIDE EFFECT — `KIT_MANIFEST.json`'s BUDGETS.md entry — **ACCEPTABLE HOUSE PRACTICE, on one mandatory condition**

The fact, verified: the manifest (v1.1.0, itself a frozen
file) records BUDGETS.md at sha256 1f8ced40…, 10,266 bytes
— the frozen, pre-erratum state. Disk now reads 0df29495…,
11,540 bytes. The entry is stale, and it is stale *because*
the grading obeyed the ledger law.

The grading's handling — leave the manifest as the
as-assembled v1.1.0 record, disclose the staleness in the
grading record — is **acceptable, and is the only handling
this house's own rules permit**, for three reasons:

1. **The manifest is an attestation, not a live index.**
   It records what `assemble-kit.mjs` assembled, with each
   file's source and hash, reproducible across assemblies
   (matrix row 14's demonstration). Hand-editing it after
   the freeze to chase a documentation erratum would make
   it a document no assembly ever produced — a falsified
   attestation, and itself an unledgered change to a
   frozen file unless separately ledgered, at the cost of
   the very reproducibility it exists to prove.
2. **The erratum is not a product change.** The BUDGETS.md
   amendment is a grading correction appended after the
   freeze; the shipped kit's functional content — engine,
   templates, budgets.json, harness — is untouched. The
   truth about the divergence already lives in the one
   place the house designates for post-freeze truth: the
   FROZEN_SET amendments ledger (verified above).
3. **Precedent runs the same way.** Prior phases corrected
   filings by on-face amendment plus ledger entry; no
   phase has retro-edited an assembly attestation to match
   a later erratum, and starting here would invert the
   freeze's purpose.

**The mandatory condition:** acceptability rests entirely
on the disclosure actually appearing in
`TRACK_7_PHASE_5_GRADING_RECORD.md` — naming the stale
entry (BUDGETS.md, manifest 1f8ced40…/10,266 B vs current
0df29495…/11,540 B), stating that the manifest stands as
the as-assembled v1.1.0 record, and noting that BUDGETS.md
now verifies through the ledger chain (which also repairs
the matrix amendment's "hash-verified in KIT_MANIFEST.json"
phrase for that one document). Silence would convert this
from accepted practice into a defect: a future verifier
running the manifest would find an unexplained mismatch
inside the product folder. The grading record is not yet
filed, so this seat judges the mechanism sound and the
disclosure **owed and load-bearing** — it is a condition
of the signature below, not a courtesy.

---

## SIGNATURE

All six checks **PASS**. The defects the original review
confirmed — an invented rule, a 10×-misquoted instrument,
an unfiled band presented as measured, a dangling
instalment citation, an unevidenced sitting, and
disclaimers that stopped at scope — are each cured on the
face of the record, by ledgered amendment, without one
silent edit and without one line of after-the-fact prose
invented to fill a gap. The record-as-amended now says,
in every place checked, only what its filings support.

**The House axis SIGNS the record** — over the set as
found by the completion freeze, and only over that set.
H-01's limit stands permanently, as the original review
ruled: the run kept no freeze of its own, so no signature
from this axis certifies the run-time set, and none ever
can. This signature takes effect in, and is conditioned
on, the filing of `TRACK_7_PHASE_5_GRADING_RECORD.md`
carrying (a) the dispositions these amendments cite, and
(b) the KIT_MANIFEST disclosure ruled mandatory above —
the filing that also makes run-record amendment item 5
true. Whether the phase's substance passes remains the
Promise axis's and the captain's call, as before.

— House axis, re-review seat · Phase 5 completion grading

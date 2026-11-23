# TRACK 7 PHASE 4 — TWO-AXIS INDEPENDENT REVIEW: HOUSE AXIS RE-REVIEW

*Reviewer: House Axis re-review, fresh context. Scope: ONLY
whether the completion-grading fixes cured the defects the
original House review graded (HOUSE_AXIS.md: FAIL on the
record; CONFIRMED H-01…H-05, NEEDS-CHECK N-01…N-03). This
reviewer did not write the original review. Every hash below
was re-run by this reviewer against the live tree on
2026-11-23 (`sha256sum` semantics in Python over
`FROZEN_SET.md` and the ledger). No artefact other than this
report was edited. The Promise axis's findings are addressed
only where the task named them (C5 repair, Promise N2
instrument, C4 disposition).*

---

## Instruments run by this reviewer

1. **Frozen set, full re-check.** Parsed all 576 frozen
   entries from `FROZEN_SET.md` and hashed every file on
   disk: **560 OK, 16 FAILED** — exactly the original 16,
   no more, no fewer, none missing.
2. **Ledger cross-check.** Every frozen hash quoted in the
   ledger's Wave-1 entries matches the frozen set. Every
   full current hash quoted in the ledger matches the file
   on disk today (details per finding below).
3. **Raw JSON reads.** `results-graded.json`,
   `results-final.json`, `results-baseline.json`
   (Project 11) and all three `m16-rerun/` reports, read in
   full and checked for internal consistency and against
   the prose that cites them.
4. **Solo re-run (C4).** `project-7-scroll-3d/verify.mjs`
   run solo by this reviewer: **13/13, exit 0**, including
   B8 (reduced motion) and B9 (zero console errors).

---

## Per-finding dispositions

### H-01 — no amendments ledger; 16 drifted files — **CURED** (with recorded residue, see N-02)

The ledger now exists, appended to `FROZEN_SET.md`
(the file is 751 lines; the ledger begins after the frozen
entries). Verified by this reviewer:

- **Wave 1 lists exactly the 16 drifted files** — the same
  16 this reviewer's own frozen-set re-check fails, in the
  same set the original House and Promise axes enumerated.
  No 17th Wave-1 file; none missing.
- **Accounting closes over the whole set:** the 560
  untouched entries match their frozen hashes today; 14 of
  the 16 ledgered files sit on disk at the ledger's full
  Wave-1 current hashes; the remaining 2
  (`project-11-hybrid/README.md`,
  `project-11-hybrid/qa/QA_RESULTS.md`) sit at their
  **Wave-2** full hashes, which the ledger's Wave-2 section
  gives and which match disk today (README
  `b135e210b72e…`, QA_RESULTS `be80287d58e3…`). 560 + 16 =
  the whole 576, every file accounted for.
- **Wave-1 additions (3)** are listed with hashes that
  match disk: `accessible.html` `3e45aa91b84c…`,
  `accessible-verify.mjs` `a77975422602…`,
  `EXAM_ATTEMPT_4.md` `6c61dd8b7f2d…`.
- **Wave-2 additions** are listed with hashes that all
  match disk today: `HOUSE_AXIS.md` `53bfc161f07f…`,
  `PROMISE_AXIS.md` `adf8a47ccf98…`, `KIMI_CRITIC.md`
  `e4665a8a348b…`, the kimi seat inputs (`kimi_system.txt`
  `2c475294e44b…`, `kimi_evidence.txt` `da6211e68b6f…`,
  `kimi_raw.txt` `148217892113…`, `kimi_err.txt` empty —
  verified 0 bytes), `results-final.json` `ab30e63c12a4…`,
  and the three `m16-rerun/` reports (all three hashes
  match). `HOUSE_AXIS_REREVIEW.md` is listed without a
  hash — self-referential and unavoidable; it is this file.

Two imperfections, recorded rather than smoothed over:
(a) the Wave-1 current hashes for the two Wave-2-edited
files are given **abbreviated to 8 hex characters**
(`bb9bd518`, `2aaad666`). Those prefixes agree with both
original axes' independent enumerations, and the Wave-2
section chains from them to full current hashes that do
verify — but the two intermediate byte-states are no
longer on disk and cannot be re-verified in full from the
ledger alone. (b) For two entries the ledger honestly
states the documenting filing does not exist or the edit
set is not reconstructible (`STUDIES.md`: "no filing
documents it separately"; `ARCHITECTURES.md`: exact edit
set not reconstructible) — that is N-02's residue, carried
inside the ledger instead of hidden by it. Neither
imperfection leaves any file unaccounted for, which was
the substance of H-01. The dangling reference from
QA_RESULTS.md ("see the amendments ledger in
`grading-phase4/FROZEN_SET.md`") now resolves to a real
document.

### H-02 — package re-assembled post-freeze, unrecorded — **CURED**

Ledger items 1–3 record the re-assembly with the chain:
`MANIFEST.json` frozen `8734edde…` → `eb22dd8a…` (matches
disk), both `viewer.js` copies frozen `b19b27ad…` →
`52e650d7…` (both match disk, and remain byte-identical
to each other). The cause given — re-assembly over the
visibility-pause fix — is the cause both axes and the
evidence pack describe. The graded-vs-shipped divergence
is now on the record with its hashes; the present-tense
Rule 32 consistency of the package was already disproved
as a breach by the original review (R-04) and is
unchanged.

### H-03 — EXAM_ATTEMPT_4.md late and unfrozen — **CURED** (as a record defect; the lateness itself stands)

The filing is now ledgered as a Wave-1 addition with its
hash (`6c61dd8b7f2d…`, matches disk), in the only place
the freeze's own terms allow a post-freeze addition to be
recorded. Nothing in the fix pretends the filing was on
time: the ledger repeats that it was "filed late, during
the fix wave," and the filing's own face still carries
the confession. The historical breach — at freeze time
the PASS rested on a filing that did not exist — is a
fact of the record and remains one; what was curable was
its custody, and that is cured.

### H-04 — Project 11 baseline provenance broken — **CURED** (per the remedy the original review itself named; the lost evidence stays lost)

`QA_RESULTS.md` Amendment 2, checked line by line against
the raw JSONs by this reviewer:

- It states the on-disk `results-baseline.json` **is** the
  post-fix re-take: the JSON reads mode `"baseline"`,
  visual `BASELINE-CREATED`, `longTaskMs: 9476`,
  `lcpMs: 208` — exactly as Amendment 2 says (9,476 ms).
- It files that re-take as **its own BASELINE-CREATED
  decision** with its reason (the accessible fix made the
  page 65 px taller) — the Rule 30 visibility the original
  review found missing.
- It states plainly that the original baseline report was
  **overwritten** (one report file per mode) and that the
  **17,966 ms figure is prose-only**, tracing to no raw
  report on disk. Verified: no JSON in `qa/` carries
  17,966.
- It states the consequence plainly: the graded visual
  PASS (0.029%) was measured against the pre-fix baseline
  and **cannot be re-derived** from the artefacts as they
  stand — and supersedes it with a genuine comparison
  (item 3, `results-final.json`, below).
- **Budgets quoted** in Amendment 2 (layout reads ≤ 50 ·
  long-task ≤ 250 ms · CLS ≤ 0.1 · LCP ≤ 2500 ms) match
  `qa/qa.config.mjs` verbatim
  (`maxLayoutReads: 50, maxLongTaskMs: 250, maxCls: 0.1,
  maxLcpMs: 2500`), and that file's hash still matches
  the frozen set (`56305d3f…`) — no budget was rewritten.
- The phase-split probe is **downgraded to "reported, not
  filed"** (see N-03), and Amendment 2 item 3 points at
  `results-final.json`.

What cannot be cured and is not claimed cured: the
original baseline report and the pre-fix baseline PNG
(`b1ed721f…`) are overwritten and gone. The record now
says so, in the right place, with the re-take filed as
its own decision — which is precisely the remedy the
original House verdict demanded ("the re-taken baselines
are filed as their own decisions").

**`results-final.json` (fix 3), separately verified:**
exists at `project-11-hybrid/qa/`, hash `ab30e63c12a4…`
(matches the ledger). Internally consistent: unit PASS ·
e2e PASS · visual PASS (0.024% — a genuine first
comparison against the re-taken baseline) · a11y PASS ·
perf FAIL on the long-task check alone; gate statuses
agree with their check flags throughout; the metrics
block (reads 24, longTaskMs 9133, CLS 0, LCP 268) matches
its own check details and Amendment 2's prose (9,133 ms,
LCP 268 ms). It differs from the graded report in exactly
three values (visual 0.024% vs 0.029%, long-task 9133 vs
9562, LCP 268 vs 224) — a distinct run, not a copy. And
the original `results-graded.json` still hashes to its
**frozen** value `83ac9e80801c1e8faeae60c97e47d54e6e4745c93c0a429af39cd46c41319663`:
the fresh run did **not** destroy the graded evidence;
the ledger's backup-and-restore claim is corroborated by
the hash.

### H-05 — post-freeze additions outside the set and any ledger — **CURED**

Both artefacts named in the original finding
(`accessible.html`, `accessible-verify.mjs`) are now in
the ledger's Wave-1 additions with full hashes matching
disk (see H-01), alongside the third addition
(`EXAM_ATTEMPT_4.md`). The additions were always
disclosed in substance and were good work; the process
breach was the missing ledger, and the ledger now
carries them.

### N-01 — exam builders' freshness unevidenced — **NOT CURED; remains open (NEEDS-CHECK)**

No fix in this wave addresses it: no coordinator
session/agent logs for the four sittings were filed, and
the ledger does not touch the question. It remains
exactly what it was — unverified, not disbelieved;
nothing found contradicts the claim, and
`exam-start.txt` still corroborates only one timestamp.
**What it blocks:** nothing in the custody record this
axis grades. It attaches as a standing caveat to M15:
the House sign-off below certifies the exam's *record*
(chain of custody, filings, reproduced evidence); the
freshness of the four builders rests, as before, on the
filings' own assertions. If the captain requires
independent freshness proof, M15's sign is conditional
until the session logs are filed.

### N-02 — prose edit contents not reconstructible — **NOT CURED; remains open, narrowed (NEEDS-CHECK)**

The ledger narrows this materially: it now gives a
cause-level account for every drifted prose file (viewer
fix, Phase 4 sections, book instalment finalised, run
record finalised, Instalment 6 / Rules 32–38 added). But
the underlying fact is unchanged and the ledger itself
concedes it for the two graded M17 filings:
`ARCHITECTURES.md`'s exact edit set is "not
reconstructible (no diffs exist; this tree is not a git
repository)" and `STUDIES.md`'s edit is documented by no
filing separately. No diffs or retained copies were
produced in this wave for any of the six files.
**What it blocks:** it blocks certifying that those
prose edits were merely cosmetic. It does **not** block
the exit gate on this axis: the bytes both completion
axes graded are the current, hash-pinned bytes now in
the ledger, so the graded objects are identified beyond
dispute — what is unknowable is only what they said
before the fix wave. It stands as recorded residue on
M17 in particular.

### N-03 — phase-split probe has no raw output — **CURED** (by the downgrade route N-03 itself prescribed)

The original finding offered two resolutions: file the
probe output, or, "if not retained, the attribution
should be downgraded to 'reported, not filed'."
Amendment 2 item 4 takes the second route in so many
words: the sequence-only variant (0 ms) and the
phase-split probe (≈6.5–6.7 s startup, ≈4.1 s on-screen)
are downgraded to **"reported, not filed"**, with the
note that both axes searched exhaustively and found no
probe script or raw output anywhere, and that the
captain's ruling does not rest on them. This reviewer
confirms no probe script or raw probe report exists in
`project-11-hybrid/` or `grading-phase4/`. One reading
note: the main body of QA_RESULTS.md still narrates the
probe in the present tense; Amendment 2 is the
controlling status and a reader must reach it — the
downgrade is real but lives in the amendment, as
amendments do.

---

## Named Promise-axis items in this task's scope

**C5 — README severed bullet — CURED.** `project-11-hybrid/README.md`:
the `verify.mjs` bullet now reads as one whole sentence
("the project's own harness: **13/13** — the viewer loads
the GLB (4,108 triangles from its own state, 8 draw
calls at rest), … zero console errors."), and the
`accessible.html` bullet follows it, carrying a
parenthetical that names the repair and its cause. No
orphaned continuation remains.

**Promise N2 — M16 re-run instrument — now filed; supports 8/8.**
`grading-phase4/m16-rerun/` holds the three raw reports.
This reviewer applied the exam's own expectation logic
(`m16-qa-harness/run-exam.mjs`: 1 baseline-status + 1
clean-PASS + 1 planted-FAIL + 5 gate-catches = 8) to
them: baseline report — visual `BASELINE-CREATED`,
verdict PASS; clean report — verdict PASS, all five
gates PASS (visual 0.000%); planted report — verdict
FAIL, all five gates FAIL, and each gate's failed check
is its own planted defect (unit: cap breach validated
clean; e2e: `expectVisible #confirmation` stops the
journey + "planted defect: the book is unreachable";
visual: 1.81% > 1.00%; a11y: 1 unnamed role=img; perf:
2,401 layout reads > 50). **8/8 is supported by the raw
reports.** The reports' internal paths (`/tmp/p4exam/…`)
corroborate the claimed copy-of-tree run against the
current harness. Two honest notes: the planted perf
count is 2,401 here vs 2,441 in the original Phase 3
filing — a different run's weather, not a contradiction,
and immaterial against a budget of 50; and no console
log or exit code is filed, so the 8/8 is derived from
the raw reports by the exam's own logic (as this
reviewer did), not read off a filed summary.

**C4 — Project 7 harness crash — coordinator's disposition NOT FOUND WRONG.**
The coordinator's disposition (file C4 as a harness
stability-under-load defect; the 13/13 total reproducible
solo) is corroborated by this reviewer's own instrument:
a solo run of `project-7-scroll-3d/verify.mjs` completed
**13/13, exit 0**, with B8 and B9 passing. This does not
disprove the Promise axis's batch/parallel crashes —
different conditions — and the disposition is correctly
scoped to exactly that distinction. No contrary grade.

---

## The kimi-k3 signature condition — **SATISFIED**

KIMI_CRITIC.md signs the exit gate "conditioned on the
completion run appending the amendments ledger to
FROZEN_SET.md listing exactly the 16 files enumerated in
this pack, each with frozen hash, current hash, and the
filing that documents the change," void "if that ledger
ever shows a 17th file, a missing file, or a different
cause than enumerated here." Checked against the three
stated void triggers, using the evidence pack
(`kimi_evidence.txt`) as the enumeration:

- **No 17th Wave-1 file.** The Wave-1 section lists
  exactly 16. (The ledger's Wave-2 section is a separate,
  labelled wave — the grading's own changes — and is not
  a 17th Wave-1 drift entry.)
- **None missing.** The 16 are the same 16 this
  reviewer's independent frozen-set re-check fails, and
  the same 16 the pack groups in prose (the two viewer.js
  copies; Project 11's app.js / index.html / style.css /
  README; QA_RESULTS.md; the baseline PNG and
  results-baseline.json; MANIFEST.json; engine/README.md;
  ARCHITECTURES.md and STUDIES.md; the book; the run
  record; the rules file).
- **No different cause.** Each ledger cause matches the
  pack's enumeration: viewer copies = visibility-pause
  fix; MANIFEST = regenerated/re-assembled over the fixed
  viewer; Project 11 four = accessible-page fix wave;
  QA_RESULTS = its own amendment; baseline PNG + JSON =
  re-take / overwrite by that re-take; engine README =
  Phase 4 section; book = Phase 4 instalment finalised;
  run record = finalised after the freeze; rules =
  Instalment 6 (Rules 32–38). None contradicts the pack.

**The signature condition is satisfied; the signature
stands.** Two caveats entered for the captain, neither of
which triggers the void clause as worded: (i) two Wave-1
current hashes are abbreviated (see H-01) — the kimi text
says "current hash" without specifying length, and the
Wave-2 chain completes both to full, disk-verified
hashes; (ii) the pack claimed every change "is described
somewhere in the filings," while the ledger honestly
corrects that for `STUDIES.md` (no filing documents it
separately) — the ledger gives no *different cause* for
that file, but on the pack's stricter "filing that
documents the change" phrasing, that one entry documents
by conceding there is no documentation. The captain may
wish to note this correction of the pack on the grading
record; it does not void the signature under its own
stated triggers.

---

## Restated House verdicts

| Module / gate | Original House verdict | Re-review verdict |
|---|---|---|
| **M15 — the Engine (package + blind-install exam)** | FAIL (record) | **SIGN** — H-01/H-02/H-03 cured as record defects; the package's custody chain (frozen → re-assembled → ledgered) is complete and hash-verified. Caveat carried: N-01 (builders' freshness) remains open and asserted-only. |
| **M17 — architectures + §21 studies** | FAIL (record) | **SIGN, with residue** — both drifted filings are ledgered at the exact bytes the completion grading graded. Residue carried: N-02 — the pre-fix contents of `ARCHITECTURES.md` / `STUDIES.md` are not reconstructible, so the edits cannot be certified cosmetic. |
| **Project 11 — hybrid, under the QA harness** | FAIL (record) | **SIGN** — H-04 cured per the original remedy (re-take filed as its own BASELINE-CREATED decision; 17,966 ms owned as prose-only; consequence stated); H-05 cured; a single-vintage full run over the final page is now filed (`results-final.json`) and the graded evidence is intact at its frozen hash. The perf leg stands exactly as the captain's ruling left it — FAIL on the record, counted met on the waste measures, hardware/live filing still owed at first deployment; this axis does not re-judge the ruling's merits. |
| **Phase 4 exit gate (House axis)** | **FAIL** | **The FAIL does not stand. The House axis now signs the record.** |

**Exactly what residue the sign carries** (none of it
hidden, none of it a confirmed defect): (1) N-01 open —
exam builders' freshness is asserted, not independently
evidenced; blocks nothing on this axis, conditions M15
only if the captain demands independent proof. (2) N-02
open, narrowed — exact pre-fix contents of the drifted
prose filings (sharpest: `STUDIES.md`,
`ARCHITECTURES.md`) are permanently unreconstructible;
blocks certifying the edits as cosmetic, blocks nothing
else, because the graded bytes are hash-pinned. (3) The
original Project 11 baseline evidence (report + PNG) is
permanently lost by overwrite — disclosed in Amendment 2
and the ledger, mitigated by the single-vintage final
run, not restorable. (4) Two Wave-1 intermediate hashes
are recorded as 8-character prefixes only. The original
FAIL, the late filing, and the overwrites remain facts
of the record; signing certifies the record as it now
stands — complete, hash-verified, and honest about its
own gaps — not a rewritten history.

*House axis counts for this re-review: original findings
re-graded — CURED 6 (H-01, H-02, H-03, H-04, H-05, N-03) ·
NOT CURED / still open 2 (N-01, N-02, both NEEDS-CHECK,
carrying no severity) · PARTIALLY CURED 0. Suspicions
tested fresh in this re-review and REJECTED: ledger
hashes mismatch disk (disproved — all full hashes
verify); results-final run overwrote the graded evidence
(disproved — `results-graded.json` at its frozen hash);
m16-rerun reports fail to support 8/8 (disproved — 8/8
derived by the exam's own logic); C4 disposition wrong
(disproved — solo re-run 13/13). Kimi signature
condition: SATISFIED.*

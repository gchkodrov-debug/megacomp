# TRACK 7 PHASE 4 — TWO-AXIS INDEPENDENT REVIEW: HOUSE AXIS

*Reviewer: House Axis, fresh context, no stake in the outcome.
Scope: standing rules and process discipline only — binding rules
`crew-skills/cinematic-web-engineering-rules.md` Rules 1–38 (Phase 4
instalment Rules 32–38), freeze discipline, method discipline
(captain's earlier-phase rulings), honesty of the record, and exam
process. This axis did not read the Promise Axis's work (none was
consulted; where a filing itself references it, that reference is
noted as the filing's own words, not as evidence reviewed).
No artefact was edited by this reviewer. Every hash below was
verified by this reviewer with `sha256sum -c` against
`grading-phase4/FROZEN_SET.md` on 2026-11-23.*

---

## Per-module verdicts (house standard)

| Module / Project | Verdict | One-line reason |
|---|---|---|
| **M15 — the Engine (package + blind-install exam)** | **FAIL** | The graded package is not the frozen package: `MANIFEST.json` and both copies of `viewer.js` drifted post-freeze with no amendments ledger anywhere (H-01, H-02); the passing sitting's filing did not exist at freeze time (H-03). The exam's substance is strong — see the REJECTED findings — but the house grades the record, and the record's chain of custody is broken. |
| **M17 — architectures + §21 studies** | **FAIL** | Substance complies (Rule 38 labelling exemplary; demonstrations re-run fresh; Flow provenance carried honestly), but both graded filings — `ARCHITECTURES.md` and `studies/STUDIES.md` — drifted post-freeze, undocumented (H-01). A grader cannot certify filings that are not the filings that were frozen. |
| **Project 11 — hybrid, under the QA harness** | **FAIL** | The perf-scope conduct was exemplary (FAIL left standing, budget untouched, question referred — R-01, R-02), and method labelling is clean (R-03). It fails on the record: the baseline raw file and visual baseline on disk are no longer the graded run's — the prose's filed baseline total (17,966 ms) traces to no raw output on disk (H-04) — and the post-freeze fix wave is documented in the wrong place and only in part (H-01, H-05). |

## Exit-gate verdict

**Phase 4 exit gate: FAIL on the House Axis.**

Launch package §5 requires: M15's blind-install exam passed;
M17's seven demonstrations graded; Project 11 passed under the
full QA harness. On substance the crew came close — the exam's
fourth sitting meets its bar as filed, the seven demonstrations
carry fresh numbers, and Project 11's perf leg is met *only*
under the captain's P11 perf-scope ruling, with which the crew
complied exactly. But the gate also stands on the frozen record,
and the frozen record does not stand: 16 of 576 frozen files
differ from their frozen hashes, the amendments ledger the
freeze promises does not exist, and one graded raw file
(Project 11's baseline report) has been overwritten by a later
run. Until the ledger is reconstructed — every drifted file,
its old → new hash, its reason, its authorising fix — and the
re-taken baselines are filed as their own decisions, there is
no stable set for the captain to judge last. This is a record
failure, not a finding that the engineering is bad; the remedy
is paperwork done honestly, not a rebuild.

---

## Graded findings

### CONFIRMED

**H-01 — CONFIRMED · The amendments ledger does not exist; 16 frozen files drifted undocumented.**
Freeze discipline + Rule 32.
`grading-phase4/FROZEN_SET.md` header (lines 3–5): *"After this
freeze, edits to any listed file happen only through the
amendments ledger appended to this file."* The file is 584
lines; it contains no ledger section — `grep` for
"Amendment/ledger" finds only the header promise itself.
`project-11-hybrid/qa/QA_RESULTS.md` lines 71–72 nevertheless
direct the reader to *"the amendments ledger in
`grading-phase4/FROZEN_SET.md`"* — a document that is not there.
This reviewer's `sha256sum -c`: **560 OK, 16 FAILED**:

- `track7-artifacts/engine-package/MANIFEST.json` — frozen `8734edde…`, current `eb22dd8a…`
- `track7-artifacts/engine-package/package/engine/3d-viewer/viewer.js` — frozen `b19b27ad…`, current `52e650d7…`
- `track7-artifacts/engine/3d-viewer/viewer.js` — frozen `b19b27ad…`, current `52e650d7…`
- `track7-artifacts/engine/README.md` — frozen `0070abbb…`, current `122b8c84…`
- `track7-artifacts/m17-architectures/ARCHITECTURES.md` — frozen `2cf75e4c…`, current `e734ec60…`
- `track7-artifacts/m17-architectures/studies/STUDIES.md` — frozen `28e72267…`, current `cdb259a2…`
- `track7-artifacts/project-11-hybrid/README.md` — frozen `d8e049f7…`, current `bb9bd518…`
- `track7-artifacts/project-11-hybrid/app.js` — frozen `b8a282ce…`, current `41ac76e7…`
- `track7-artifacts/project-11-hybrid/index.html` — frozen `b3f2e017…`, current `2e8deed8…`
- `track7-artifacts/project-11-hybrid/style.css` — frozen `43db5a85…`, current `be4bfbea…`
- `track7-artifacts/project-11-hybrid/qa/QA_RESULTS.md` — frozen `72fdee4a…`, current `2aaad666…`
- `track7-artifacts/project-11-hybrid/qa/baselines/project-11-hybrid.png` — frozen `b1ed721f…`, current `bce5aaaf…`
- `track7-artifacts/project-11-hybrid/qa/results-baseline.json` — frozen `d46f22af…`, current `4cc4be75…`
- `TRACK_7_CINEMATIC_WEB_ENGINEERING.md` — frozen `0f05c419…`, current `40d90d37…`
- `TRACK_7_PHASE_4_RUN.md` — frozen `386a22e8…`, current `f676c7ee…`
- `../crew-skills/cinematic-web-engineering-rules.md` — frozen `84f6480b…`, current `614a38d9…`

Partial mitigation, recorded fairly: two of the edits are
described *in substance* inside the edited files themselves —
QA_RESULTS.md's post-grading amendment note (the 0.015% →
0.029% visual correction; the added alternative presentation)
and `project-11-hybrid/README.md` line 41 ("Added in the Phase 4
grading fix wave"). That is documentation in the wrong place,
covering a minority of the drift. The viewer re-assembly, the
manifest regeneration, the M17 filings, the book, the run
record, and the binding rules file itself carry no post-freeze
note this reviewer could find. The bar is not lowered: a freeze
whose edits live anywhere except its own ledger is not a freeze.

**H-02 — CONFIRMED · The Engine package was re-assembled after the freeze; the frozen snapshot is superseded without record.**
Rule 32 ("a packaged file whose hash disagrees with its source
is an unrecorded edit" — here the pair moved together, which is
better, and still unrecorded against the freeze).
Current state, verified by this reviewer: `MANIFEST.json`
(46 entries) is internally consistent — every entry's sha256
matches the packaged file on disk, zero mismatches — and
`package/engine/3d-viewer/viewer.js` is byte-identical to its
source `engine/3d-viewer/viewer.js` (both `52e650d7…`). So the
package *today* obeys Rule 32. But the frozen manifest recorded
the viewer at `b19b27ad…`; the package that was frozen is not
the package on disk, and no filing states when or why the
re-assembly happened. The graded object and the shipped object
differ, silently.

**H-03 — CONFIRMED · EXAM_ATTEMPT_4.md was filed late and was not in the frozen set.**
Rule 33 / exam process.
`FROZEN_SET.md` freezes `EXAM_ATTEMPT_1.md` (`16a424aa…`),
`EXAM_ATTEMPT_2.md` (`0047fb5b…`) and `EXAM_ATTEMPT_3.md`
(`15f53fa6…`) — and no `EXAM_ATTEMPT_4.md`. The file now present
opens by confessing exactly this: *"Filed late, and the lateness
is part of the record: this filing was believed written on the
sitting's day — a chained shell command whose middle step failed
silently skipped the write while its final echo reported
success."* Credit where due: the confession is on the filing's
face, sittings 1–3 were on time, and the sitting's underlying
evidence (builder's report, `verify-attempt4.mjs`,
`exam-attempt-4/` site) is present and frozen in part. The
breach stands nonetheless: at freeze time, the exam's PASS
rested on a filing that did not exist, and the run record
(`TRACK_7_PHASE_4_RUN.md`: "Full filings: EXAM_ATTEMPT_1.md …
EXAM_ATTEMPT_4.md") pointed at an absent file.

**H-04 — CONFIRMED · Project 11's baseline provenance is broken: prose numbers no longer trace to the raw files on disk.**
Rule 18 / Rule 30 / honesty of the record.
`QA_RESULTS.md` (current) states: *"The filed raw totals are:
baseline run **17,966 ms**, post-fix graded run **9,562 ms**."*
The graded half traces — `qa/results-graded.json` perf metrics
read `longTaskMs: 9562`, `reads: 24`, `cls: 0`, `lcpMs: 224`,
visual detail "diff ratio 0.029%", verdict FAIL — exactly as
the prose says. The baseline half does not: the
`qa/results-baseline.json` now on disk reports
`longTaskMs: 9476`, `lcpMs: 208` — it is the *re-taken*
post-fix baseline (the amendment note admits the visual
baseline "was re-taken after the fix"), written over the
original baseline run's report. Consequences: (a) 17,966 ms is
now an orphan number, sourced to no instrument output in the
filing; (b) the visual PASS in the graded report (0.029%
against the filed baseline) now points at a baseline PNG
(`bce5aaaf…`) that is not the baseline it was measured against
(frozen: `b1ed721f…`); (c) the re-taken baseline is nowhere
filed as its own BASELINE-CREATED decision with its own date
and reason — Rule 30 requires the decision to be visible as a
decision, and the amendment's phrase "reported as
BASELINE-CREATED above" describes the table, which in fact
reports visual as PASS. The runner's one-file-per-mode
overwrite weakness is disclosed in the filing (honest), but
disclosure does not restore the overwritten evidence.

**H-05 — CONFIRMED · New graded artefacts were added post-freeze outside the frozen set and outside any ledger.**
Freeze discipline.
`project-11-hybrid/accessible.html` and
`project-11-hybrid/accessible-verify.mjs` (both timestamped
2026-11-23 12:35–12:36, after the freeze) do not appear in
`FROZEN_SET.md` at all. Their addition is disclosed in
substance (QA_RESULTS.md amendment item (2); README line 41)
and the addition itself is good work — a missing alternative
presentation, supplied and verified 13/13. The process breach
is narrow and real: the freeze's own terms allow additions
only through its ledger, and there is no ledger (H-01).

### NEEDS-CHECK

**N-01 — NEEDS-CHECK · Freshness/independence of the four exam builders is asserted, not independently evidenced.**
Rule 33. Each sitting filing states "fresh builder / fresh-
context agent, documents alone, timed" with start/end UTC and
elapsed (3m54s · 3m41s · ~3.3 min · 3m17s). The only
independent artefact is `grading-phase4/exam-start.txt`
(`1795435172` = Mon 2026-11-23 11:59:32 UTC, nine seconds
before sitting 1's stated start 11:59:41 UTC) — consistent,
but it corroborates one timestamp, not four builders' fresh
contexts or that no questions were relayed. *Resolves with:*
the coordinator's session/agent logs for the four sittings.
Nothing found contradicts the claim; it is unverified, not
disbelieved.

**N-02 — NEEDS-CHECK · The content of the post-freeze edits to `ARCHITECTURES.md`, `STUDIES.md`, `engine/README.md`, the book, the run record and the rules file cannot be determined from the record.**
The folder is not a git repository (the book itself records
this, M1.7), so no diff exists. The edits may be cosmetic
fix-wave corrections of the kind QA_RESULTS.md documents for
itself, or substantive changes to graded claims — the house
cannot tell, which is itself the cost of H-01. *Resolves
with:* the coordinator's fix-wave work log, or old→new diffs
reconstructed from any retained copies.

**N-03 — NEEDS-CHECK · The phase-split probe behind the perf attribution has no raw output on file.**
`QA_RESULTS.md` attributes "≈6.5–6.7 s" to startup and "≈4.1 s"
to on-screen windows from "a separate run with its own total
(≈10.6–10.8 s)". The filing is commendably careful — it states
the split "is evidence about *where* time sits, not a partition
of the filed 9,562 ms" — but no probe script or raw probe
report sits in `qa/` beside `results-baseline.json` /
`results-graded.json`, so the split itself is prose-only.
*Resolves with:* the probe script/output, if retained; if not
retained, the attribution should be downgraded to "reported,
not filed" at the next amendment.

### REJECTED (suspected breaches this reviewer tried to prove and could not)

**R-01 — REJECTED · "A budget in qa/qa.config.mjs was changed after the failing run."**
Disproved. `qa/qa.config.mjs` is **not** among the drifted
files — its hash matches the frozen set (`56305d3f…`), and its
perf budgets read `maxLayoutReads: 50, maxLongTaskMs: 250,
maxCls: 0.1, maxLcpMs: 2500`, declared in its header as standing
house bars. The captain's ruling condition is satisfied.

**R-02 — REJECTED · "The crew re-scoped or buried the perf FAIL."**
Disproved. The FAIL stands in every place it should:
`QA_RESULTS.md` table and disposition ("the FAIL stands as
filed, and the scope question is referred to the captain"),
`results-graded.json` (`"verdict": "FAIL"`, long-task check
`ok: false`), `TRACK_7_PHASE_4_RUN.md` ("perf FAIL on the
long-task total alone"), the book's M15 section, and
`DEMONSTRATIONS.md` row E ("perf FAIL on one check,
referred"). Rule 36 was obeyed in form and in spirit; the
captain then ruled, and this axis judges compliance with that
ruling, not its merits: waste measures pass (layout reads
24 ≤ 50, CLS 0, LCP 224 ms, off-screen waste fixed to zero),
the 9,562 ms total stands labelled as a software-GL lab
figure, and the hardware/live re-filing obligation is carried
on the record.

**R-03 — REJECTED · "Lab traces were passed off as live filings, methods mixed, or INP/field claims made for an untrafficked page."**
Disproved. `QA_RESULTS.md` header: *"All performance figures
are labelled local lab traces (captain's F-P3-2 ruling) — this
page is undeployed, and no live filing exists or is claimed."*
No INP figure is claimed for Project 11 anywhere in the Phase 4
filings; the only INP text is `budgets.json`'s standing note,
which states the house rule correctly (live pages file live
PageSpeed; study artefacts file labelled lab traces; the two
are never mixed).

**R-04 — REJECTED · "The current package's manifest lies about its files (Rule 32 breach in the present tense)."**
Disproved for the present tense (the freeze-tense breach is
H-02). This reviewer recomputed all 46 manifest entries
against `engine-package/package/` on disk: zero mismatches;
packaged viewer identical to source viewer. Rule 13/14/35
spot-checks also pass: `qa.config.mjs` imports
`page-config.js` directly and specs against it; `app.js`
imports `{ PRODUCT, PARTS, SEQUENCE }` from `./page-config.js`
— one fact source, two readers.

**R-05 — REJECTED · "Sitting 4's 'zero questions' pass is fabricated — three items were recorded."**
Disproved as a fabrication charge. `EXAM_ATTEMPT_4.md` records
the three items openly and grades each REJECTED with a reason
tied to a document passage (slug rule; Step 3 worked example;
Step 7 link specification) — exactly the disposition Rule 33
requires for items the documents do answer, and consistent
with sittings 1–3, where recorded items were graded CONFIRMED
and fixed (4 · 4 · 5 items; sitting 3's item 5 likewise
REJECTED with reasons). The exam's bar as filed — "zero
questions the documents fail to answer" — is honestly stated
and, on the filings, met. The filing's *lateness* is a
separate, confirmed breach (H-03); its *content* is not
impugned.

**R-06 — REJECTED · "Project 11's frame-byte figures in prose are invented."**
Disproved by recount. This reviewer summed the sets on disk:
`frames/` 120 files = 424,608 B; `frames-m/` 120 files =
175,788 B — exactly the figures in `TRACK_7_PHASE_4_RUN.md`,
`page-config.js` (`desktopBytes: 424608, mobileBytes: 175788`)
and the README, all inside the Track 5 budgets.

**R-07 — REJECTED · "The viewer's FPS readout stayed dishonest after the visibility pause (Rule 34, second clause)."**
Disproved by reading the component. `engine/3d-viewer/viewer.js`
lines 243–248 install the IntersectionObserver pause; line 276
returns early while invisible *before* the FPS ledger advances
(lines 287–290 accumulate elapsed/frames only on rendered
ticks), and the header comment (lines 232–241) states the
design and its attribution. Rule 34 is implemented as written.

**R-08 — REJECTED · "The §21 studies claim first-hand observation they never made (Rules 17/38)."**
Disproved. `studies/STUDIES.md` states its method on its face
("reads the public, fetchable layer… does not run the sites'
JavaScript, does not observe their motion first-hand, does not
measure their live performance") and labels every claim
**[observed]** or **[reported]**; each study names its tradeoff
and a disposition — including one declined (Why Zero's
text-invisibility: the demo keeps its sentence in the DOM).
Original demonstrations exist and are verified by
`studies/verify-demos.mjs` (6/6 as filed in DEMONSTRATIONS.md).

---

## What compliance looked like (for the record)

So the FAIL is not misread as a general condemnation: the perf
FAIL was filed, attributed by measurement (sequence-only
variant 0 ms; viewer isolated), fixed where waste was real
(Rule 34), and referred where scope was in question (Rule 36) —
the phase's best process work. The visual baseline was
originally reported as BASELINE-CREATED, its own status
(Rule 30, `results-baseline.json`). Sittings 1–3 filed their
documentation gaps promptly, including the embarrassing one
(the guide's example pre-answering the exam's own client).
The failures in this report are concentrated in one place:
what happened to the record *after* the freeze, during the
fix wave — good fixes, filed in the wrong place or not at all.

CONFIRMED 5 · NEEDS-CHECK 3 · REJECTED 8 — worst confirmed item: H-01, the missing amendments ledger — 16 of 576 frozen files drifted post-freeze (incl. MANIFEST.json, both viewer.js copies, QA_RESULTS.md and the binding rules file) with the ledger QA_RESULTS.md points to nowhere in existence.

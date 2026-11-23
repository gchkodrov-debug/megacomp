# TRACK 7 PHASE 4 — PROMISE AXIS REVIEW

*Reviewer: Promise axis, fresh context, no stake in a pass.
Scope: whether the work does what it promised and what it
claims, claim by claim, against the artefacts themselves.
Method: every filing read; every number that could be
re-measured was re-measured (sha256 over the frozen set and
the Engine manifest, byte totals over the frame sets, and
live re-runs of the node harnesses: Project 11 verify +
accessible-verify, verify-attempt4, technique-demos, the
six M17 demonstration harnesses, and the QA harness's
shipped example from a clean copy of the package). No
artefact was edited by this review; harness side-effect
files created during re-runs in the home tree were removed
and the tree restored. The other axis's work was not read.*

*Governing perf input applied throughout: the CAPTAIN'S
RULING — P11 PERF SCOPE (2026-11-23), quoted in the brief.*

---

## PER-MODULE VERDICTS

### M15 — The Engine exam — **PASS**

The bar (Launch Package §4): a blind verifier installs the
Engine and builds a new product page from its documentation
alone, timed, zero questions; any question the verifier has
to ask = a documentation fail.

The evidence supports the pass at the fourth sitting:

- Four sittings are filed (EXAM_ATTEMPT_1–4.md) with
  start/end times whose arithmetic checks out exactly
  (3m54s · 3m41s · 3m18s ≈ "~3.3 min" · 3m17s — see R3),
  each with a fresh builder, each shipping a working page,
  and the gap counts as filed (4 · 4 · 5) match the items
  listed in each filing.
- The passing site (`exam-attempt-4/beacon-1/`) and the
  captain-side verifier (`verify-attempt4.mjs`) are in the
  frozen set with hashes intact today. This reviewer's
  independent re-run of `verify-attempt4.mjs` reproduced
  the filed output exactly: cinematic progress 100%,
  120/120 frames loaded, 6 callouts, zero console errors;
  alternative page 6 headed sections (h2 count 6), 0
  scripts.
- Sitting 4's three recorded items, each graded REJECTED
  by the producer, were checked against the current
  BUILD_A_PAGE.md text and the grading holds (R5). No
  confirmed documentation gap at sitting 4: the bar as
  defined is met.
- The Engine package itself is what the filings claim:
  MANIFEST.json lists 46 files; the package directory
  holds exactly 46; every manifest sha256 and byte count
  matches the packaged file, and every packaged file with
  a named source matches that source's hash in the tree
  (R1). The QA harness example runs from a clean package
  copy exactly as the exam filings describe (R7).

Two record defects attach to this module (C1, C6) — a
late-filed sitting record and post-freeze drift with no
amendments ledger. They are filing-discipline failures,
disclosed in the filings themselves; they do not touch
the sitting's evidence, which is frozen, intact, and
reproduced. M15 passes on its bar.

### M17 — Seven architecture demonstrations — **PASS**

The bar (Launch Package §4): seven demonstrations, each
blind-graded against the directive's ten questions; for
each architecture the grader can state from the build and
its filing why a professional would choose it — and what
it costs.

- ARCHITECTURES.md answers all ten questions for all
  seven architectures — verified programmatically: each
  of A–G carries exactly the ten named topics (How it
  works · Technology · Why chosen · Advantages ·
  Limitations · Performance · Production workflow ·
  Maintenance · Accessibility · Commercial applications)
  (R9). Every filing names its costs in the same breath
  as its virtues (e.g. A: "bytes scale with frames ×
  size; a new angle means a new film"; D: "the fallback
  is a shipped obligation"; E: "the costs add"). From
  these filings alone this reviewer can state, for each
  architecture, why a professional would choose it and
  what it costs. The §4 bar is met on the text.
- Demonstration evidence reproduced by this reviewer's
  fresh re-runs today: Project 3 **19/19**, Project 4
  **4/4**, Project 5 **10/10**, Project 6 **8/8**,
  Project 8 **17/17**, technique demos **6/6** — all
  exactly as DEMONSTRATIONS.md files them (R6). Project
  7 is the exception: its headline evidence reproduced,
  its filed total did not (C4).
- The §21 studies file three sites with the observation
  method stated on the filing's face and every claim
  labelled [observed]/[reported]; each study names a
  tradeoff and produced an original demonstration
  (6/6 reproduced). One scope gap between the launch
  package's §21 description and what the bench did is
  recorded as N3 — the producer never claimed the
  missing measurements, so it is not a false claim; it
  is a question for the captain, not a bar failure.

### Project 11 (hybrid) — **PASS** (perf leg met under the captain's ruling)

Graded under the full QA harness, as the exit gate
requires. The graded raw report
(`qa/results-graded.json`, frozen hash intact) files:
unit **5/5 PASS** · e2e **PASS** · visual **PASS**
(0.029% vs its then-filed baseline, tolerance 1.00%) ·
a11y **PASS** (computed body contrast 14.65:1) · perf
**FAIL on one check**. Every value in QA_RESULTS.md's
table (as amended) matches that raw report exactly (R4).
The project's own harness re-runs **13/13** and its
accessible alternative **13/13** under this reviewer's
hands today. Frame totals measure exactly as filed:
desktop 120 files / 424,608 B, mobile 120 files /
175,788 B, both far inside the standing budgets (R2).

**The perf leg, judged under the captain's ruling:**
the FAIL stands as filed — the 250 ms budget was never
rewritten (qa.config.mjs still declares
`maxLongTaskMs: 250`; the graded JSON still records
FAIL) (R10). On the waste measures the ruling names,
the leg is met: the off-screen rendering waste was
found in the viewer, fixed in the component
(IntersectionObserver pause, `engine/3d-viewer/viewer.js`
lines 244–246, state exposure line 395 — R8), and the
graded run's other perf measures pass in the raw report
(layout reads **24 ≤ 50**, **CLS 0**, **LCP 224 ms**).
The 9,562 ms whole-window total stands on the record as
a labelled software-GL lab figure, exactly as the ruling
prescribes. **The gate as ruled is met.** The ruling's
binding condition — a real perf filing owed at first
live deployment or first GPU-hardware measurement, the
leg re-opening if long tasks persist on hardware — is
not yet discharged and not yet triggered: the page is
an undeployed study artifact (its own footer says so).
It remains owed, and this review records it as owed.

Two confirmed defects attach to this project: the
alternative presentation was missing from the project
as frozen and was added in the grading fix wave (C3 —
now present and verified 13/13), and the QA baseline
evidence on disk no longer matches the QA filing's
provenance claims (C2). Neither changes the graded
run's filed results, which are intact.

---

## EXIT-GATE VERDICT — **PASS** (under the captain's perf ruling)

Phase 4 exit gate (Launch Package §5, verbatim):
"M15's blind-install exam passed; M17's seven
demonstrations graded; Project 11 (hybrid) passed under
the full QA harness."

- M15's blind-install exam passed — **yes**, fourth
  sitting, evidence frozen, intact, and reproduced.
- M17's seven demonstrations graded — **yes**: graded
  here against the ten questions (complete, costs
  named) with fresh harness re-runs reproducing six of
  seven filed totals in full and the seventh's headline
  evidence (C4 caveat on the P7 total).
- Project 11 passed under the full QA harness — **yes
  as ruled**: four gates PASS in the intact graded
  report; the perf gate's FAIL stands on the record and
  its leg counts as met on the waste measures under the
  captain's ruling, with the hardware-filing condition
  outstanding and owed at first deployment.

Without the captain's ruling, this gate would fail on
the perf leg alone. With it, all three clauses are met.
The freeze-integrity defect (C1) is recorded in full
below: the gate passes on the current artefacts plus
the graded and exam evidence that remains hash-intact,
not on a perfectly kept freeze.

---

## GRADED FINDINGS

### CONFIRMED

**C1 — The frozen set drifted in 16 files and carries no
amendments ledger, though two filings point at one.**
FROZEN_SET.md's own header (lines 3–5) states edits to
listed files "happen only through the amendments ledger
appended to this file"; QA_RESULTS.md lines 71–72 cite
"the amendments ledger in `grading-phase4/FROZEN_SET.md`".
No ledger exists: the file is 584 lines of hash entries
and nothing else. This reviewer's sha256 comparison of
all 576 frozen entries against the current tree: 0
missing, **16 mismatched** — `engine-package/MANIFEST.json`,
`engine-package/package/engine/3d-viewer/viewer.js`,
`engine/3d-viewer/viewer.js`, `engine/README.md`,
`m17-architectures/ARCHITECTURES.md`,
`m17-architectures/studies/STUDIES.md`,
`project-11-hybrid/README.md`, `app.js`, `index.html`,
`style.css`, `qa/QA_RESULTS.md`,
`qa/baselines/project-11-hybrid.png`,
`qa/results-baseline.json`,
`TRACK_7_CINEMATIC_WEB_ENGINEERING.md`,
`TRACK_7_PHASE_4_RUN.md`, and
`../crew-skills/cinematic-web-engineering-rules.md`.
Some of these are the disclosed grading fix wave (C3,
C6); the point is that the mechanism the freeze
promises for exactly those edits — a ledger — was
never kept, so no reader can separate sanctioned
amendments from drift from the frozen record alone.
(Mitigation on record: `results-graded.json`, all
`exam-attempt-4/beacon-1/` files, and
`verify-attempt4.mjs` still match their frozen hashes.)

**C2 — Project 11's filed baseline report contradicts
the QA filing's provenance claims.**
QA_RESULTS.md (lines 27–28 and the amendment note,
lines 76–79) states "the filed raw totals are: baseline
run **17,966 ms**, post-fix graded run **9,562 ms**".
The filed raw report `qa/results-baseline.json` on disk
reports `longTaskMs: 9476` (perf detail "9476 ms"),
mode "baseline", visual "BASELINE-CREATED" — it is the
post-fix baseline re-take the amendment note describes,
not the baseline run the text describes, and no filed
raw report carries 17,966 ms (nor 18,358 ms, which the
filing itself discloses was console-only and
overwritten). Consequence: the graded visual PASS
(0.029%) was measured against the pre-fix baseline,
while the baseline PNG now on disk is the re-taken one
(its hash differs from the frozen `b1ed721f…`, now
`bce5aaaf…`) — the visual result cannot be re-derived
from the artefacts as filed. The graded report itself
is intact and internally consistent (R4); the defect
is the baseline side of the evidence chain.

**C3 — Project 11 as frozen shipped without its
complete alternative presentation.**
The launch package's standing project requirements and
the Engine's accessibility layer require every cinematic
page to ship one; Architecture E's own filing states
"the whole still owes the complete alternative
presentation". The frozen set contains no
`project-11-hybrid/accessible.html` and no
`accessible-verify.mjs` (grep over FROZEN_SET.md: no
entries). The project's README admits it at lines
36–42: the alternative was "Added in the Phase 4
grading fix wave — the Promise axis found the hybrid
had shipped without one." **Status now:** present and
verified — this reviewer's re-runs: `verify.mjs`
13/13, `accessible-verify.mjs` 13/13 (parity 9/9 parts,
0 scripts, cinematic page links to it). Confirmed as a
defect of the frozen delivery, fixed post-freeze.

**C4 — Project 7's filed fresh re-run total (13/13) is
not reproducible; its harness crashes before the last
two checks.**
DEMONSTRATIONS.md, the RUN record, and the book all
file P7 **13/13**. This reviewer ran
`project-7-scroll-3d/verify.mjs` three times. Batch
run: crashed after check B1b (puppeteer
TargetCloseError). Two solo runs: 11 checks PASS
(A1–A3, B1–B7) then an unhandled crash at the B8
reduced-motion section — `verify.mjs:194`, "Attempted
to use detached Frame". The harness never prints its
total; checks B8 (reduced motion) and B9 (zero console
errors) are unverified by re-run. The demonstration's
headline evidence *was* reproduced in the solo runs
(rig exact at all keyframes, error 0.0; path ≈26.1
units; 47 bricks lighting in order), so Architecture
G's build stands — the defect is the filed total and
the harness's completion, not the build.

**C5 — Project 11 README's harness description is
severed mid-sentence by the fix-wave insertion.**
`project-11-hybrid/README.md` lines 35–49: the
`verify.mjs` bullet opens "the project's own harness:
**13/13** —", the `accessible.html` bullet is inserted,
and the verify bullet's continuation ("the viewer loads
the GLB (4,108 triangles…)") follows as orphaned text
after the inserted bullet closes. An editorial defect
introduced by the same fix wave as C3; the underlying
claims are all true (R6), the filing's sentences are
broken.

**C6 — EXAM_ATTEMPT_4.md was filed late and is absent
from the frozen set.**
The filing's own header states it was "believed written
on the sitting's day" but was actually written "during
the grading fix wave" after a chained shell command
failed silently — a process defect the filing discloses
openly. FROZEN_SET.md lists EXAM_ATTEMPT_1.md,
_2.md and _3.md only (grep: zero entries for
EXAM_ATTEMPT_4). The sitting itself is not in doubt:
its site, the verifier script, and the start timestamp
(`exam-start.txt` = 2026-11-23 11:59:32 UTC) are frozen
and hash-intact, and the verification reproduces (see
M15 verdict). Confirmed as a record-keeping defect,
disclosed in the record itself.

### NEEDS-CHECK

**N1 — Perf attribution probes are prose-only.**
QA_RESULTS.md, the RUN record, and the book attribute
the long-task total by measurement: a sequence-only
variant at 0 ms, and a phase-split probe (≈6.5–6.7 s
one-time startup, ≈4.1 s on-screen windows, probe total
≈10.6–10.8 s). No raw probe report or probe script
exists in `project-11-hybrid/` or `grading-phase4/`
(search of both trees finds only QA_RESULTS.md itself).
*Unresolved fact:* the probe runs' raw outputs.
*Resolves it:* the producer files the probe reports/
scripts, or a reviewer re-runs the variants. Does not
block the perf leg under the captain's ruling, which
rests on the graded report's waste measures and the
in-code fix, both verified.

**N2 — "M16 exam re-run 8/8 after the MIME fix" has no
re-run filing.**
Claimed in TRACK_7_PHASE_4_RUN.md, the book instalment,
and `engine/README.md`'s Phase 4 section.
`m16-qa-harness/EXAM_RESULTS.md` — the exam's own
filing — contains no Phase 4 addendum (no mention of
the MIME fix or a re-run); its 8/8 is the original
Phase 3 exam record. The MIME fix itself is real and
in the code (`engine/qa-harness/qa-harness.js` line 39
serves .mp4/.webm/.vtt/.glb with true types), and the
harness's shipped example passes end-to-end today
(R7). *Unresolved fact:* whether the planted-defect
exam was re-run after the fix and again met 8/8.
*Resolves it:* the producer files the re-run report,
or a re-run of `m16-qa-harness/run-exam.mjs` in a copy
of the tree (it writes its results files in place, so
this review did not run it against the originals).

**N3 — The §21 studies did not measure the studied
sites' loading, network, performance, or accessibility
first-hand.**
The launch package's M17 description (§1) gives the
§21 discipline as: "loading and network behavior
measured, performance and accessibility evaluated,
tradeoffs named". STUDIES.md's own method statement
says the bench "does not run the sites' JavaScript,
does not observe their motion first-hand, and does not
measure their live performance" — structure from the
fetched page, behaviour from the makers' published
accounts, labelled [observed]/[reported]. The producer
claims nothing else, and the per-technique
demonstrations the package requires exist and pass
(6/6). *Unresolved fact:* whether the captain accepts
the disclosed fetch-only method as satisfying §21, or
requires a measured follow-up. *Resolves it:* the
captain's ruling.

### REJECTED (suspected, tried, could not prove)

**R1 — "The 46-file manifest is inflated or stale."**
Disproved: MANIFEST.json lists 46 files; the package
directory contains exactly 46 files; every entry's
sha256 and byte count matches the packaged file; every
non-authored entry's named source file matches the
manifest hash in the tree. Zero mismatches on both
checks.

**R2 — "The frame byte totals are invented."**
Disproved by measurement: Project 11 `frames/` = 120
files, 424,608 B total; `frames-m/` = 120 files,
175,788 B — exact matches to page-config.js, the
README, the RUN record, and ARCHITECTURES.md A.
Exam-attempt-4 `beacon-1/` both folders = 175,788 B,
consistent with the one-set rule. `film.webm` measures
66,686 B (Architecture B's figure); the lamp GLB
measures 192,468 B (page-config's modelBytes).

**R3 — "The sitting times don't add up."**
Disproved arithmetically: 11:59:41→12:03:35 = 3m54s;
12:05:57→12:09:38 = 3m41s; 12:10:43→12:14:01 = 3m18s
(filed "~3.3 min"); 12:14:56→12:18:13 = 3m17s — all as
filed in the RUN record and the attempt filings.

**R4 — "QA_RESULTS.md's graded numbers don't match the
raw report."**
Disproved for the graded run: `results-graded.json`
files unit 5/5 PASS, e2e PASS, visual "diff ratio
0.029% within 1.00%", a11y contrast "14.65:1", perf
reads 24 / long-task 9562 ms / CLS 0 / LCP 224 ms —
every table value in QA_RESULTS.md (as amended)
matches. (The baseline report is a different matter:
C2.)

**R5 — "Sitting 4's REJECTED gradings excuse real
documentation gaps."**
Disproved item by item against BUILD_A_PAGE.md as it
stands: the slug rule is stated in Step 1 (a "№"
transliteration is builder judgment; two sittings chose
differently and both comply); the name/does split is
demonstrated in Step 3's worked example, which the
builder's report cites as its source; Step 7 specifies
the alternative-page link's place and text. The
zero-confirmed-gap conclusion stands on the documents.

**R6 — "The demonstration counts are inflated."**
Disproved for six of seven plus the studies: this
reviewer's fresh runs reproduced Project 3 19/19,
Project 4 4/4, Project 5 10/10, Project 6 8/8,
Project 8 17/17, technique demos 6/6, Project 11 own
harness 13/13, Project 11 accessible-verify 13/13.
(Project 7 is the exception: C4.)

**R7 — "The QA harness example doesn't actually run
from the package."**
Disproved: from a clean copy of `engine-package/package/`
placed in the workspace tree, `node
engine/qa-harness/run-example.mjs` reported
BASELINE-CREATED, then unit/e2e/visual/a11y/perf all
PASS, verdict PASS — exactly the behaviour
EXAM_ATTEMPT_1/2 describe. (The home-tree copy fails
when run in place because the runner is package-root
scoped — its `templates/` target exists only in the
package layout INSTALL.md prescribes. Not a defect.)

**R8 — "The viewer's visibility pause is prose only."**
Disproved in code and by regression: `viewer.js` lines
244–246 install an IntersectionObserver driving
`canvasVisible`, exposed in `getState()` (line 395);
Project 5 (10/10) and Project 11 (13/13) re-run clean
against the fixed component today.

**R9 — "ARCHITECTURES.md skips some of the ten
questions."**
Disproved by count: each of the seven sections carries
exactly the ten named topics, in order.

**R10 — "The perf budget was quietly rewritten after
the failed run."**
Disproved: `qa/qa.config.mjs` still declares the
budgets as before the run (long-task ≤ 250 ms among
them), `engine/budgets.json` restates the rule that a
budget changed after a failed run "is not a budget",
and the graded report still records FAIL at 9,562 ms.

**R11 — "Architecture B's codec figures (AV1 at half
VP9's bytes, mobile encode −86%) are ungrounded."**
Disproved against M5's own filing:
`m5-media-engineering/DELIVERY_RECORD.md` lines 23–25
and 38 file VP9 at 1,145,115 B and AV1 at 555,486 B at
matched quality (29.37 vs 29.39 dB), and the mobile
encode at 388,180 B, −86%. Architecture B restates its
source module's measured record accurately.

---

*Counts: CONFIRMED 6 · NEEDS-CHECK 3 · REJECTED 11 — worst confirmed item: C1, the frozen set's 16 unledgered post-freeze changes with no amendments ledger in existence, which breaks the freeze as the grading fixed point (sharpest instance: C2, the overwritten Project 11 baseline evidence).*

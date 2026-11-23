# TRACK 7 — PHASE 4 GRADING RECORD

*Phase 4 (the Engine, assembled · M15 + M17 + Project 11).
Graded 2026-11-23. This is a COMPLETION GRADING: the
original run's coordinator ended before filing any axis
report or grading record, so the blind grading was run
fresh by a completion run over the run's frozen set —
Promise axis (fresh context), House axis (fresh context),
different-family critic kimi-k3, and, after the fix loop,
a fresh House re-review. The study and the builds were
not redone. The original axis reports were never filed by
the original run; these are the grading's own filings:
`track7-artifacts/grading-phase4/` — PROMISE_AXIS.md ·
HOUSE_AXIS.md · KIMI_CRITIC.md · HOUSE_AXIS_REREVIEW.md ·
the amendments ledger appended to FROZEN_SET.md.*

*Per-module verdicts:*

| Module | Verdict |
|---|---|
| M15 — The Engine, assembled (blind-install exam) | **PASS** |
| M17 — Seven architectures + the §21 studies | **PASS** |
| Project 11 — Hybrid (full QA harness) | **PASS** — perf leg met under the captain's ruling |
| **Phase 4 exit gate** | **PASS** |

---

## THE CAPTAIN'S RULING (recorded verbatim, 2026-11-23)

"CAPTAIN'S RULING — P11 PERF SCOPE (2026-11-23): The FAIL stands as filed against the 250 ms whole-window long-task budget; no budget is rewritten after the run that failed it. Scope: that budget was calibrated on Project 9, a page with no WebGL stage, and in a software-rendered lab (SwiftShader) no continuously-presented WebGL stage can meet a whole-window total — the bar as read is unsatisfiable by construction in this lab, the M13-1 defect shape. The perf gate's purpose is policing waste: the off-screen rendering waste was found, fixed, and is now zero; layout reads 24 ≤ 50, CLS 0, LCP 224 ms all pass. Project 11's perf leg therefore counts as met for the Phase 4 gate on the waste measures, with the 9,562 ms whole-window total standing on the record as a labelled software-GL lab figure. Binding condition: at first live deployment or first GPU-hardware measurement, the page owes a real perf filing; if long tasks persist on hardware, this leg re-opens. The QA harness budget set is to be re-calibrated per page class (WebGL-bearing vs not) as a Phase 5 input — a carry, not a mid-grading change."

Both axes graded under this ruling and confirm its
predicates from the raw evidence: the FAIL stands in
`results-graded.json`; `qa.config.mjs` still declares
250 ms (its hash matches the frozen set); the waste fix
is in the component's code; reads 24, CLS 0, LCP 224 ms
are the graded run's own figures. The ruling's binding
condition is NOT discharged and NOT yet triggered — the
page is an undeployed study artifact. It remains owed.

---

## M15 — THE ENGINE, ASSEMBLED — **PASS**

*The bar (package §4): a blind verifier installs the
Engine and builds a new product page from its
documentation alone, timed, zero questions — any question
= a documentation fail. The exam passed at the fourth
sitting, and the passing is graded, not merely filed:*

- Four sittings filed, each with a fresh builder, each
  shipping a working page; sitting times check out
  exactly (3m54s · 3m41s · 3m18s · 3m17s); the confirmed
  documentation gaps of sittings 1–3 (4 · 4 · 5) were
  fixed between sittings — sitting 3's five items are
  each dispositioned in EXAM_ATTEMPT_3.md (four
  CONFIRMED-and-fixed, one REJECTED with its reason).
- Sitting 4: zero confirmed gaps. Its three raised items
  were each graded REJECTED with reasons, and the Promise
  axis re-checked all three against the current
  BUILD_A_PAGE.md text — the gradings hold.
- The passing site and the captain-side verifier are in
  the frozen set, hash-intact, and the Promise axis's
  independent re-run of `verify-attempt4.mjs` reproduced
  the filed output exactly (120/120 frames, 6 callouts,
  0 errors; alternative 6 sections, 0 scripts). The
  coordinator's own spot-run agreed (13/13 accessible).
- The package is what the filings claim: MANIFEST.json =
  46 files; the Promise axis verified every manifest hash
  against both the packaged files and their sources —
  zero mismatches — and ran the QA example clean from a
  package copy.
- The Engine the exam certifies is the current one: the
  package was re-assembled over the fixed viewer after
  the freeze — unrecorded at the time (House H-02), now
  ledgered (FROZEN_SET.md, Wave 1 items 1–3); the
  packaged viewer is byte-identical to the source viewer.

*Residue:* House N-01 stands open — the four builders'
freshness is asserted in the filings, not independently
evidenced; the coordinator who ran the sittings filed no
session logs, and none can be reconstructed. The House
re-review records that it blocks nothing on its axis; it
would condition M15 only if the captain demands
independent freshness proof. The sittings' preserved
sites, start timestamps, and reproduced verifications
are uncontradicted.

## M17 — SEVEN ARCHITECTURES + §21 STUDIES — **PASS**

- ARCHITECTURES.md answers the directive's ten questions
  for all seven architectures — verified programmatically
  by the Promise axis (each of A–G carries exactly the
  ten named topics, costs named in the same breath as
  virtues). DEMONSTRATIONS.md maps all seven to fresh
  harness re-runs: A = P3 19/19 · B = P4 4/4 · C = P5
  10/10 · D = P6 8/8 · E = P11 13/13 · F = P8 17/17 ·
  G = P7 13/13. (The run record's summary sentence lists
  only six re-runs; the map itself is complete — a
  summary undercount, corrected by this record.)
- The Promise axis reproduced six of the seven totals in
  full with fresh runs, plus the technique demos 6/6.
  Project 7 is the exception in one narrow sense (C4,
  below): its headline evidence reproduced in every run;
  its filed total did not print in the reviewer's three
  runs.
- The §21 studies label every claim [observed] or
  [reported], name each tradeoff, and their three
  per-technique demonstrations pass 6/6. One question is
  carried to the captain unresolved (Promise N3): the
  package's §21 discipline says loading/performance/
  accessibility "measured"; the studies disclose a
  fetch-only method and claim nothing they did not do.
  Whether the disclosed method satisfies §21 is the
  captain's ruling to make — the producer overclaimed
  nothing.

*Residue:* House N-02 stands open, narrowed — the
post-freeze prose edits to ARCHITECTURES.md and
STUDIES.md are ledgered with cause-level accounts, but
their exact contents are not reconstructible (no diffs
exist; the tree is not a git repository). The graded
bytes are now hash-pinned; the residue blocks certifying
those edits as cosmetic, and nothing else.

## PROJECT 11 — HYBRID — **PASS** (perf leg under the ruling)

- Own harness 13/13; accessible alternative 13/13 (both
  re-run by the coordinator and the Promise axis).
  Frames as filed, recounted exact: desktop 424,608 B ·
  mobile 175,788 B, inside the standing budgets.
- The graded QA report (`qa/results-graded.json`, frozen
  hash intact) files unit 5/5 · e2e · visual 0.029% ·
  a11y (contrast 14.65:1) PASS, and perf FAIL on the
  long-task total alone (9,562 ms vs the never-rewritten
  250 ms budget; reads 24 · CLS 0 · LCP 224 ms pass).
  Under the captain's ruling the perf leg counts as met
  on the waste measures; the 9,562 ms stands as a
  labelled software-GL lab figure; the hardware filing
  remains owed at first deployment or first GPU
  measurement.
- The frozen delivery had shipped without its complete
  alternative presentation (Promise C3 / House H-05):
  added in the fix wave, verified 13/13, and ledgered.

## THE BLIND-INSTALL EXAM — verdict

**PASSED at the fourth sitting** (see M15). Sittings 1–3
are the exam working as designed: each shipped a working
page and failed the zero-question bar on confirmed
documentation gaps, each gap fixed before the next
sitting. Sitting 4's filing was made late — during the
fix wave, after a shell command failed silently — and is
disclosed on the filing's own face (House H-03 · Promise
C6): a record defect, cured as a record defect by the
ledger; the sitting's evidence (site, verifier, start
timestamp) is frozen, intact, and reproduced.

## THE EXIT GATE — **PASS**

The package's own definition (§5): "M15's blind-install
exam passed; M17's seven demonstrations graded; Project
11 (hybrid) passed under the full QA harness."

- M15's blind-install exam passed — **yes** (fourth
  sitting; evidence frozen, intact, reproduced).
- M17's seven demonstrations graded — **yes** (both axes
  + the critic; re-runs reproduced as filed, C4 caveat
  recorded).
- Project 11 passed under the full QA harness — **yes
  as ruled**: four gates PASS in the intact graded
  report; the perf FAIL stands on the record and its leg
  counts as met under the captain's ruling, with the
  hardware-filing condition outstanding.

The House axis's original verdict on this gate was FAIL —
on the record, not the substance — and after the fix
loop its fresh re-review states: "the original FAIL does
not stand; the House axis now signs the record." Without
the captain's perf ruling, the Promise axis records, the
gate would fail on the perf leg alone.

---

## DEFECTS AND DISPOSITIONS

**House axis — CONFIRMED 5 · NEEDS-CHECK 3 · REJECTED 8**
(report: HOUSE_AXIS.md; re-review: HOUSE_AXIS_REREVIEW.md)

- **H-01 — the amendments ledger did not exist** (16
  post-freeze changes unledgered; `sha256sum -c`: 560 OK,
  16 FAILED). **CURED**: the ledger is appended to
  FROZEN_SET.md — exactly the 16 Wave-1 files with frozen
  → current hashes and documenting filings, the 3 Wave-1
  additions, and Wave 2 (this grading's own changes). The
  re-review re-verified every quoted hash against disk.
  Two imperfections stand on the record: the Wave-1
  current hashes of README.md and QA_RESULTS.md survive
  only as the 8-character prefixes both axes enumerated
  (the Wave-2 section chains them to full, disk-verified
  hashes), and the ledger concedes STUDIES.md's edit has
  no documenting filing (N-02 residue).
- **H-02 — package re-assembled post-freeze unrecorded.**
  **CURED** by ledger items 1–3.
- **H-03 — EXAM_ATTEMPT_4.md late and unfrozen.** **CURED
  as a record defect** (ledgered as a Wave-1 addition;
  the lateness stands disclosed, not erased).
- **H-04 — baseline provenance broken** (the "filed
  baseline 17,966 ms" traced to no raw output; the graded
  visual PASS pointed at a since-replaced baseline).
  **CURED per the original review's own remedy**:
  QA_RESULTS.md amendment 2 files the on-disk baseline
  as the post-fix re-take (9,476 ms) and as its own
  BASELINE-CREATED decision, owns the original's loss,
  quotes the budgets, and the single-vintage run (below)
  gives the re-taken baseline a genuine comparison. The
  original baseline evidence is permanently lost —
  disclosed, not restored.
- **H-05 — accessible.html + accessible-verify.mjs added
  post-freeze outside the set.** **CURED** (ledgered; the
  addition itself is good work — it closed a real gap).
- **N-01 — builders' freshness unevidenced.** Open;
  blocks nothing (see M15 residue).
- **N-02 — prose edit contents not reconstructible.**
  Open, narrowed (see M17 residue).
- **N-03 — the perf phase-split probe has no raw
  output.** **CURED** by downgrade: QA_RESULTS.md
  amendment 2 marks the probes "reported, not filed".
  The captain's ruling does not rest on them.
- REJECTED (8) stand as the axes' protection of the
  producer: the budget was never changed; the FAIL stands
  everywhere it should; lab labelling is clean and no INP
  is claimed anywhere; frame bytes are exact; the FPS
  counter counts rendered frames only.

**Promise axis — CONFIRMED 6 · NEEDS-CHECK 3 · REJECTED 11**
(report: PROMISE_AXIS.md)

- **C1 = H-01**, **C2 = H-04**, **C3 = H-05**, **C6 = H-03**
  — same defects, independently found; dispositions as
  above.
- **C4 — Project 7's filed 13/13 not reproducible in the
  reviewer's runs** (harness crashed at the B8
  reduced-motion section, "Attempted to use detached
  Frame", 3/3 — once in a batch run, twice solo under
  load). Disposition: the total IS reproducible solo —
  the coordinator's run and the House re-review's run
  both passed 13/13 including B8/B9, as did the original
  Phase 2 grading and the producer's Phase 4 re-run. The
  defect is real but narrower than filed: a harness
  stability-under-load fragility in a Phase 2 artifact's
  B8 section (a second page evaluated without a
  frame-stability guard). Architecture G's build stands
  on reproduced headline evidence in every run. CARRY:
  the B8 guard belongs to a Phase 2 artifact and is
  outside this phase's fence — recorded here, not fixed
  here.
- **C5 — P11 README's harness bullet severed
  mid-sentence** by the fix-wave insertion. **FIXED** in
  Wave 2 (bullet rejoined, accessible bullet moved after
  it; ledgered).
- **N1 = N-03** (probes) — cured by downgrade.
- **N2 — "M16 exam re-run 8/8 after the MIME fix" had no
  re-run filing.** **RESOLVED with an instrument**: the
  completion grading re-ran the M16 planted-defect exam
  against the current Engine harness in a copy of the
  tree — **8/8 expectations met** (baseline
  BASELINE-CREATED; clean build PASS with zero false
  positives; planted build FAIL with each of the five
  gates catching its own defect). Raw reports filed in
  `grading-phase4/m16-rerun/`.
- **N3 — the §21 method question.** Carried to the
  captain (see M17). Not a bar failure: nothing was
  overclaimed.
- REJECTED (11) include the manifest, frame-byte, film,
  GLB, and sitting-time figures — all exact under
  re-measurement — and the graded QA numbers, which match
  the raw JSON.

**Different-family critic — kimi-k3: SIGN on all four**
(M15 · M17 · Project 11 · exit gate), with one binding
condition: the amendments ledger, listing exactly the 16
enumerated files with frozen hash, current hash, and the
documenting filing — a 17th file, a missing file, or a
different cause voids the signature on its face. **The
House re-review confirms the condition SATISFIED.** Two
mechanical notes the critic itself required and this
record carries: (1) this is a completion grading — the
original axis reports were never filed; (2) the perf leg
is conditional (FAIL stands; counts by ruling; re-opens
on hardware). The critic attested the evidence pack as
presented; two pack statements repeated filing claims
the axes' instruments have since corrected — the
"17,966 ms on file" (it is prose-only; H-04) and the
ablation attribution (now "reported, not filed"; N-03).
The corrections are filed in QA_RESULTS.md amendment 2
and here; they do not touch the signature's condition.
Of the critic's 12 observations: the sitting-3 items are
each dispositioned in EXAM_ATTEMPT_3.md; the
demonstration map is complete in DEMONSTRATIONS.md (the
run record's summary undercounted); the FPS suspicion is
rejected in code; the M16 figure is now instrumented;
the mixed-vintage point is cured by the final run; the
budget lines are now quoted; the baseline PNG's growth
is the page's own 65 px, explained in amendment 2; the
Phase 3 app.js watch item belongs to Phase 3's record
and stands there.

**The single-vintage final run** (Kimi observation 7;
the H-04 remedy's second half): one clean full QA
harness run over the final page, filed as
`qa/results-final.json` — unit PASS · e2e PASS · visual
PASS (0.024% against the re-taken baseline — its first
genuine comparison) · a11y PASS · perf FAIL on the
long-task check alone (9,133 ms this run; reads 24 ·
CLS 0 · LCP 268 ms). The original `results-graded.json`
was backed up and restored byte-identical (its frozen
hash verifies).

---

## WHAT THIS PASS DOES NOT CLAIM

- **Phase 1's exit gate remains OPEN.** Project 4's film
  is still not verifiably a Flow production and carries
  no per-film credit figure (M6 NOT MET). Phase 4's pass
  does not touch it; Track 7's graduation still requires
  the Flow film's blind pass.
- **Track 7 is NOT graduated.** Phase 5 remains: Project
  12 (the Complete Commercial Cinematic Website Kit) and
  the §26 Final Master Examination — all eighteen
  abilities demonstrated blind on shipped work, captain
  judging last. Only on that pass does Track 7 graduate.
- Project 11's perf leg is met **by ruling, on the waste
  measures, in a software-GL lab**. The page owes a real
  perf filing at first live deployment or first
  GPU-hardware measurement, and the leg re-opens if long
  tasks persist on hardware.
- The §21 studies question (Promise N3) is **unruled** —
  it awaits the captain.
- Two record residues stand open and are not papered
  over: the exam builders' freshness (N-01) and the
  exact contents of two post-freeze prose edits (N-02).
  The original Project 11 baseline evidence is
  permanently lost. None of these touches a graded
  number, and all are named here so no reader mistakes
  this record for a clean-freeze pass: the freeze failed
  as protocol and worked as a tripwire — every drifted
  file was enumerable precisely because the hashes had
  been frozen.
- Carries out of this phase: the QA budget set is to be
  re-calibrated per page class (WebGL-bearing vs not) as
  a Phase 5 input (the captain's ruling); Project 7's B8
  harness fragility (C4) awaits its own artifact's next
  touch.
- Production-Ready, if it is stamped at all from this
  phase, attaches to the named artifacts — the Engine
  package as re-assembled, the seven architecture
  demonstrations, and Project 11 as filed — never to the
  faculty in the abstract.

---

## FOR GEORGE — WHAT I NOW KNOW

Phase 4 is graded and it passed — all three parts.

The engine the crew built — the box of parts every future
page gets built from — passed its hardest test: a builder
who had never seen it, working only from its instruction
book, built a working page in about three minutes and had
nothing left to ask. It took four tries to get the book
that clear; the first three tries are on record with
every question that was asked and fixed.

The seven ways of building a cinematic page are each
demonstrated working, with their costs written next to
their virtues. And the hybrid page — one product shown
three ways at once: the live 3D model, the film, and the
scroll story — passed the house inspection on four of
five gates. The fifth gate, speed, failed on one number
in our test lab, and your ruling on that is now written
into the record word for word: the fail stays on the
record, the waste that caused most of it was found and
fixed, and the page owes a real speed test the day it
runs on real hardware.

The honest bruise: after the work was frozen for
grading, sixteen files were changed without the change
log the rules require. Nothing was hidden and no number
was faked — the graders caught it because the freeze
itself worked like a tripwire — but the log had to be
rebuilt after the fact, and it has been, entry by entry,
and a second grader checked the rebuilt log and signed.
One early test file from before the fix is gone for
good; the record says so plainly instead of pretending
otherwise.

What is left in Track 7: Phase 5 — the big final project
and the final exam — and one older item still open from
Phase 1: the film that must be made in Google Flow
itself. Track 7 graduates when those are done, not
before.

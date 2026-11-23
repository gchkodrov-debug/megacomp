# TRACK 7 · PHASE 5 — PROMISE AXIS (blind grading)

*Fresh context. I did not read the producer's reasoning, the
finisher-runs, the promise-runs (except as my own scratch
space, per the brief), or any House-axis material. Every
claim below was tested against raw evidence with
instruments I ran myself. Grades: CONFIRMED (a real defect
or a claim that fails) · NEEDS-CHECK (cannot be settled
with available evidence — what would settle it is named) ·
REJECTED (a suspicion tested and cleared — kept on record
to protect the producer).*

*Binding context honoured: Phase 1's open gate (M6/Flow)
is not part of this grade and is not touched; Project 11
is not re-graded — only the re-calibration's use of its
filed figures is checked. I do not declare graduation.*

---

## FINDINGS

**CONFIRMED — 1 · NEEDS-CHECK — 3 · REJECTED — 9**

### CONFIRMED

- **C-01 — The calibration visual figure is misquoted in
  two filings.** `BUDGETS.md` (addendum) and the Phase 5
  run record both quote the calibration run's visual gate
  as **0.038%**. The filed raw report,
  `project-12-kit/calibration/results-calibration.json`,
  says **diff ratio 0.004%**. The verdict is unaffected
  (both are far inside the 1.00% tolerance; the gate
  PASSes either way), and every other figure in that JSON
  matches its quotes (see R-06). This is a transcription
  defect in prose, not a measurement defect — but the
  promise axis grades claims against raw evidence, and
  this claim fails as written.

### NEEDS-CHECK

- **N-01 — Three of the four calibration long-task runs
  quoted in BUDGETS.md's addendum have no raw filing.**
  The addendum quotes 8,855 / 10,312 / 10,534 / 11,244 ms
  "across the day" and an LCP band of 172–224 ms. Only
  one raw report is filed (`results-calibration.json`:
  8,855 ms, LCP 192 ms, reads 24, CLS 0, off-screen
  0 ms). I searched the kit tree for the other figures:
  no JSON or text filing contains them. The filed run
  fully supports the calibration's PASS and sits inside
  the quoted band, so the derivation is not load-bearing
  on the unfiled runs — but as filed, three runs are
  prose-only. *What would settle it: the three runs' raw
  harness reports, or a downgrade of the addendum's band
  to "reported, not filed" (the Phase 4 house remedy for
  the same shape).*
- **N-02 — The debugging casebook's mean-luminance tie
  (23.2 vs 23.2) is not in the raw diagnosis output.**
  `exam/diagnosis.json` contains the sequence frames,
  warm-bright shares, and canvas diffs — all exact (R-07)
  — but no luminance field. The 23.2 figure appears in
  `diagnose.mjs`'s own header comment and in the
  casebook. The lesson the casebook draws from it is
  sound and the distributional measures that replace it
  are filed and exact; the tie itself is an unfiled
  instrument result. *What would settle it: a diagnosis
  run that writes the luminance measure into its JSON.*
- **N-03 — The blind-install sitting's process is
  unevidenced: no timing, no question log, no sitting
  report.** `grading-phase5/install-sitting/` contains
  only `build/` — the built product and its instrument
  outputs. Nothing in the preserved record states how
  long the build took, whether the builder asked any
  question, or who the builder was. The Phase 4
  blind-install bar was "timed, zero questions — any
  question = a documentation fail"; against that bar the
  *artifact* demonstrates the documentation sufficed
  (see §26 row 16), but the *sitting as an exam event*
  cannot be verified from this record. *What would
  settle it: a sitting filing with start/end timestamps
  and an explicit question count, of the kind Phase 4's
  sittings filed.*

### REJECTED (tested and cleared)

- **R-01 — Kit manifest count/version suspect.** Cleared:
  `KIT_MANIFEST.json` holds exactly **50 entries — 45 kit
  files + 5 root documents** (BUDGETS, CHANGELOG,
  CUSTOMIZE, INSTALL, README), version **1.1.0**. I
  verified **every entry's sha256 and byte count against
  the files on disk: 50/50, zero mismatches.** The
  shipped manifest's own md5 is
  `01037b1904907ea7e78a849224ddedf1`, as claimed.
- **R-02 — Manifest reproducibility suspect.** Cleared,
  with a precision: in a scratch copy under
  `grading-phase5/promise-runs/`, two consecutive
  `assemble-kit.mjs` runs produced **byte-identical
  manifests to each other**, and every file hash and byte
  count matched the shipped manifest exactly. The scratch
  manifest's md5 differs from the shipped one **only**
  because the manifest's `source` strings are
  workspace-relative paths, which necessarily differ in a
  relocated copy. The claim as made — "reproducing
  byte-for-byte across consecutive assemblies" — is true
  of consecutive assemblies; the manifest is not
  location-independent, and no filing claims it is.
- **R-03 — Demo verify/accessible figures suspect.**
  Cleared by my own re-runs, in place, read-only:
  `verify.mjs` → **22/22 PASS**; `accessible-verify.mjs`
  → **14/14 PASS**, matching the filed claims check for
  check (120/120 frames, chase settles at frame 120,
  6 callouts, 4,108 tris, 8 draw calls, keyboard orbit,
  captions track, $890/$1,010 configurator prices,
  numbered reservation, no sideways scroll at 390 px,
  zero console errors).
- **R-04 — Demo QA figures suspect.** Cleared: the filed
  `project-12-kit/qa/results.json` reads exactly as
  claimed — **5/5 gates PASS** (unit 12 specs · e2e ·
  visual 0.000% · a11y · perf class W: **reads 47 ≤ 50,
  long-task 5,560 ms, CLS 0, LCP 260 ms, off-screen
  0 ms**). I did not re-run the full QA harness (its
  baseline is the demo's own filed one); the filed JSON
  is internally complete and its perf figures match the
  run record word for word.
- **R-05 — Worked-example claim suspect.** Cleared: from
  a scratch copy of the shipped kit
  (`promise-runs/example/kit-copy/`), `run-example.mjs`
  ran green — **unit / e2e / visual / a11y / perf all
  PASS, verdict PASS**, class N perf inside the standing
  bars (1 read, 0 ms long-task, CLS 0.0004, LCP 56 ms).
  One honesty note, in the producer's favour: the
  runner's first pass creates its visual baseline and
  reports BASELINE-CREATED as its own step before
  grading — the documented harness behaviour, disclosed
  in the runner's own header, not hidden.
- **R-06 — Calibration verdict and its headline figures
  suspect.** Cleared except C-01/N-01: the filed
  `results-calibration.json` is **VERDICT PASS** — unit
  5/5, e2e, visual PASS, a11y PASS (contrast 14.65:1),
  perf class W PASS: **reads 24, long-task 8,855 ms ≤
  12,000, CLS 0, LCP 192 ms, off-screen 0 ms** over the
  1,200 ms dwell. `kit/engine/budgets.json` (v1.1.0)
  carries exactly the class-W set BUDGETS.md derives
  (12,000 ms ceiling, 0 ms off-screen, dwell 1,200 ms)
  and class N unchanged (250 ms).
- **R-07 — Debugging numbers suspect.** Cleared: every
  number in `DEBUGGING_CASEBOOK.md` that the JSON carries
  matches `diagnosis.json` **exactly** — sequence
  1→1 broken / 1→120 fixed / 1→120 shipped; 120 frames
  loaded on all three; canvas diff vs shipped **4.61%
  (12,275 strong pixels) broken / 0.00% fixed**;
  bright-warm share **0.03% broken / 0.31% fixed and
  shipped**; viewer state identical (4,108 model tris,
  8 draw calls). I also diffed the demos directly: the
  fixed demo differs from the broken one by **exactly
  the two claimed fixes** — the restored
  `addEventListener('scroll', () => player.kick(), …)`
  line in `app.js`, and the removed `pmrem-shim.js`
  script tag in `index.html` — and is otherwise the
  shipped demo modulo path-depth and header comments.
  (The luminance tie is the exception — N-02.)
- **R-08 — BUDGETS.md's Phase 2–4 evidence table
  suspect.** Cleared: against Project 11's own Phase 4
  filings — graded run **9,562 ms** (reads 24, CLS 0,
  LCP 224 ms, visual 0.029%), baseline re-take **9,476
  ms** (LCP 208 ms), single-vintage final run **9,133
  ms** (LCP 268 ms, visual 0.024%) — every figure in the
  table matches its raw JSON. The **17,966 ms** pre-fix
  figure is quoted with its provenance caveat on the
  face of BUDGETS.md itself, exactly as Phase 4's
  amendment 2 left it; it is not presented as cleaner
  than it is. The 12,000 ms ceiling sits as derived:
  ≈25% above the clean envelope's top (9,562 ms) and a
  third below the waste figure — the pre-fix page would
  still have failed it. Class N is genuinely unchanged.
- **R-09 — Storyboard is decorative / does not match the
  page.** Cleared by my own review (row 2 below).

---

## PER-DELIVERABLE VERDICTS

### Project 12 — the Kit and the demo storefront: **PASS**

The Kit is what it claims: 50 verified entries, hashes
exact, consecutive assemblies reproduce, the worked
example runs green from a scratch copy of the shipped
kit. The demo storefront passes its own instruments
under my re-runs (22/22, 14/14) and its filed QA is
5/5 with the claimed class-W figures. The demo's
in-place referencing of P11/M8 media is disclosed in
the run record and in the page config pattern, and is
the house's established pattern, not a concealment.

### Budget re-calibration: **PASS, with C-01 and N-01 on the record**

The deliverable the captain's Phase 4 ruling ordered
exists, is derived from filed figures (R-08), changes
no graded record, declares class before the run, and
was validated on Project 11 with a filed PASS (R-06).
Its one misquote (0.038% for 0.004%) and its three
unfiled band runs are record defects of exactly the
family this house has cured before by filing or
downgrading; neither touches the calibration's validity
— the filed run alone carries it. The captain's
hardware-filing condition is carried forward in
BUDGETS.md and budgets.json, not discharged, correctly.

### Debugging examination: **PASS, with N-02 on the record**

Two planted defects, diagnosed by instrument, fixed by
exactly the claimed changes, re-verified to
pixel-identity with the shipped page (0.00% diff). The
casebook's numbers verify against its JSON in every
particular the JSON carries. The one unfiled figure
(the luminance tie) is the casebook's own instrument
lesson, and the measures that replace it are filed and
exact.

### The install sitting: **the build PASSES its instruments; the sitting's process is NEEDS-CHECK (N-03)**

What was built: **"Hearth №1" for Ember & Oak — a
cast-iron skillet launch page** (Template F
configurator), a genuinely different product from the
demo, built from the Kit in a preserved copy of the
kit tree. Its own instruments, as preserved:
**verify 17/17 · accessible-verify 16/16 · QA verdict
PASS** (run 2: reads 3, long-task 144 ms class W,
CLS 0, LCP 208 ms, off-screen 0 ms). The record also
honestly preserves **run 1's FAIL** (CLS 0.266) before
the pass — the sitting was not airbrushed. The build's
config discloses on its face that its media are the
demo's lamp assets borrowed as labelled temporary
stand-ins. What the record does **not** contain: any
timing, any question log, any sitting report, any
builder identity. The artifact proves a page *could*
be built from the Kit's documentation to a passing
standard; it does not evidence the exam conditions
(timed, zero questions) under which it was built.

---

## §26 EXAMINATION — ROW BY ROW (Promise axis)

| # | Ability | Evidence | Verifies? |
|---|---|---|---|
| 1 | Architect a complete cinematic website | Demo storefront; my verify re-run 22/22; filed QA 5/5 | **YES** |
| 2 | Professional storyboard | `demo/storyboard.md` vs the built page — my review below | **YES** |
| 3 | Produce original assets | GLB on disk **192,468 B exactly** (m8-blender-lamp/model/); 4,108 tris in config and confirmed live by verify; 120 frames loaded 120/120 | **YES** |
| 4 | Advanced GSAP animation | Demo animation-system reveals live in verify (pacing fired story/configure/reserve; zero console errors); P2 graded Phase 1 | **YES** |
| 5 | Scroll-controlled image sequences | Verify: 120/120 loaded, 0 failed, chase settles at frame 120; P3's 240 carried as filed | **YES** |
| 6 | Real-time 3D scenes | Verify: viewer live, 4,108 tris, 8 draw calls, keyboard orbit 0.67→0.79 | **YES** |
| 7 | Custom shaders | Verify: hero stage mode named "shader", dissolve lands on the apart scene; Rule 34 discipline evidenced by off-screen 0 ms in QA | **YES** |
| 8 | Camera choreography | Filed Phase 2 (Project 7, 13/13, error 0.0); the component ships in the Kit, hash-verified in the manifest | **YES — as filed** (not re-run; a carried graded filing, as the matrix states) |
| 9 | Integrate video and 3D | Demo carries film (captions track verified) + viewer + sequence on one page; P11 hybrid filed Phase 4 | **YES** |
| 10 | Optimize browser performance | Calibration PASS on P11 (filed JSON); demo perf PASS 5,560 ms / 0 ms off-screen / reads 47 | **YES** — with C-01/N-01 as record defects on the calibration's prose, not its result |
| 11 | Support mobile | Both verifies: no sideways scroll at 390 px; mobile frame set filed (175,788 B in config, checked by verify's details readout) | **YES** |
| 12 | Accessibility | My accessible-verify re-run **14/14**; complete alternative presentation with config parity | **YES** |
| 13 | Debug rendering and animation problems | Casebook + diagnosis.json + my diffs of broken/fixed/shipped | **YES** — with N-02 (one unfiled figure) |
| 14 | Maintainable code | Manifest reproducibility (R-02); 50/50 hash verification; component discipline visible in the kit tree | **YES** |
| 15 | Automated tests | QA harness: demo QA filed PASS, calibration PASS, worked example PASS from my own scratch run | **YES** |
| 16 | Document the implementation | The five Kit documents (hash-verified in the manifest) + the install sitting's build | **YES as to sufficiency; NEEDS-CHECK as to exam conditions (N-03)** — a different product was built from the documentation and passes 17/17 · 16/16 · QA PASS, which demonstrates the documentation sufficed; that the sitting was timed and question-free is not in the record |
| 17 | Pass independent technical review | **This grading itself** — Promise axis here; the House axis and the different-family critic are separate seats whose reports are theirs to file. This row cannot be marked passed by the producer or by this axis alone | **IN PROGRESS — by construction** |
| 18 | Deliver a finished commercial-quality product | Kit v1.1.0 (50 entries, verified) + demo (22/22, 14/14, QA 5/5) + worked example PASS | **YES** |

**Row 2 — storyboard review (my own, as briefed).**
Boards S1–S7 against the built page: the scene order
(hero → live 3D → scroll sequence → film → edition →
details → footer) is the page's order; the H1 ("The
lamp that takes itself apart"), the lede, the honesty
copy, and the footer copy stand on the page verbatim
(grep-confirmed); every boarded interaction exists and
is exercised green by verify — Whole/Apart shader
dissolve, viewer presets and keyboard orbit, the
120-frame journey with six generated callouts, the
captioned film, the three-act pacing with its "Show
everything now" skip, the three-finish state machine
refusing a repeat selection by name, the reservation
book with per-field errors, cap 2, and numbered
confirmations, and the config-sourced details table.
The responsive boards (16:9 stage, ≤700 px mobile
frame set, 390 px no-overflow) are instrument-checked
in the verifies. I found no boarded scene, copy line,
or interaction missing from the page, and no page
feature the boards do not account for. **Demonstrated.**

---

## AXIS VERDICT ON THE PHASE 5 EXIT GATE

The package defines the gate as: *"the examination
passed in full — all eighteen abilities, blind, captain
judging last."*

On the Promise axis: **seventeen of the eighteen
abilities are demonstrated on shipped work and verified
by my instruments** (rows 1–16, 18 — row 16 demonstrated
as to the documentation's sufficiency, with its exam
conditions unevidenced, N-03). Row 17 is this grading
itself and completes only when all seats have filed and
the captain has judged. The defects I confirm (C-01)
and cannot settle (N-01, N-02, N-03) are record defects
in the calibration's prose, one casebook figure, and
the sitting's process filing — none of them is an
undemonstrated ability, and none falsifies a measured
result.

**Promise-axis verdict: the §26 examination is PASSED
on this axis, conditional in form** — the gate as the
package defines it closes only on the full blind
grading (House axis + critic + captain last), and
N-03 in particular should be cured by a sitting filing
(timing + question count) before the captain judges, so
that row 16's pass rests on a record and not on an
artifact alone. If the captain requires the Phase 4
zero-question standard to be *evidenced* rather than
*inferred* for row 16, that one row — and with it the
gate, under §26's one-undemonstrated-ability rule — is
the item at risk; everything else on this axis is
verified, not believed.

*Per the binding ruling: this pass, if completed by the
other seats and the captain, leaves Track 7's state as
"all phases passed — graduation HELD on the Phase 1
Flow film alone." I declare no graduation.*

# §26 FINAL MASTER EXAMINATION — THE MATRIX

*Track 7, Phase 5. The examination is sat on shipped work:
Project 12 (the Kit and its demonstration storefront) plus
the Engine it packages and the phase artifacts that carry
each ability. One undemonstrated ability = not passed
(the package's §26 construction). Instruments are named
per ability; a claim without its instrument is not a
demonstration.*

| # | Ability (§26) | Demonstration (artifact) | Instrument | Filed result |
|---|---|---|---|---|
| 1 | Architect a complete cinematic website | Project 12 demo storefront (storyboard → page) + the Kit's templates A–G | demo verify + QA harness run | **FILED** — verify 22/22 · QA 5/5 gates PASS |
| 2 | Professional storyboard | demo/storyboard.md (boards S1–S7, copy verbatim) + M2's graded boards | axis review against the built page | PENDING REVIEW (axes) |
| 3 | Produce original assets | M8's lamp (Blender original) + M5's frame pipeline outputs, carried into the demo | filed byte/triangle counts in page-config | 192,468 B · 4,108 tris · 120 frames (filed Phase 2/3) |
| 4 | Advanced GSAP animation | Project 2 (M4) + the demo's animation-system reveals | P2 graded (Phase 1) · demo verify | **FILED** — demo verify PASS (system live, zero console errors) |
| 5 | Scroll-controlled image sequences | Project 3 (240/240) + Project 11 + the demo's 120-frame journey | sequence state readouts in verify | **FILED** — 120/120 loaded, 0 failed, chase settles at frame 120 |
| 6 | Real-time 3D scenes | Project 5 coin viewer + Project 7 + the demo's lamp viewer | viewer state (draw calls, triangles) | **FILED** — 4,108 tris · 8 draw calls · keyboard orbit verified |
| 7 | Custom shaders | Project 6 (M10) + the demo's hero shader stage | stage state (mode named) in verify | **FILED** — shader mode named, dissolve transition lands; stage gained Rule 34 discipline this phase |
| 8 | Camera choreography | Project 7's rig (error 0.0, Phase 2) + the shipped camera component in the Kit | Phase 2 graded filing | FILED (Phase 2, 13/13) |
| 9 | Integrate video and 3D | Project 11 hybrid (Phase 4) + the demo (film + viewer + sequence on one page) | P11 QA filing · demo verify | **FILED** — demo verify PASS incl. captions track |
| 10 | Optimize browser performance | M13 (Phase 3) + the Phase 5 budget re-calibration applied to P11 + the demo | calibration run + demo QA perf gate | **FILED** — calibration PASS (P11 class W: 8,855 ms, off-screen 0 ms) · demo perf PASS (5,560 ms, off-screen 0 ms, reads 47 ≤ 50) |
| 11 | Support mobile | mobile frame sets (P3/P11/demo) + phone-width checks in every verify | verify readouts at 390 px | **FILED** — no sideways scroll at 390 px (demo + accessible) |
| 12 | Accessibility | M14 + the demo's complete alternative presentation | accessible-verify (parity vs config) | **FILED** — 14/14, facts by reference from the config |
| 13 | Debug rendering and animation problems | exam/broken-demo/ — two planted defects, diagnosed by instrument, fixed, re-verified | DEBUGGING_CASEBOOK.md + diagnosis.json | **FILED** — seq 1→1 broken / 1→120 fixed · canvas diff 4.61% broken / 0.00% fixed · warm-bright 0.03% / 0.31% |
| 14 | Maintainable code | the Engine's component discipline (Rules 12/13/28) + the Kit's manifest reproducibility | manifest byte-identical across rebuilds | **FILED** — KIT_MANIFEST md5 01037b1904907ea7e78a849224ddedf1 across consecutive assemblies of the final set |
| 15 | Automated tests | the QA harness (M16) + the demo's own QA + the calibration run + the worked example | harness reports | **FILED** — demo QA PASS · calibration PASS · worked example PASS from a scratch copy of the shipped kit |
| 16 | Document the implementation | the Kit's README/INSTALL/CUSTOMIZE/CHANGELOG/BUDGETS + the book's Phase 5 instalment | blind-install sitting (different brief) | PENDING RUN (sitting in progress) |
| 17 | Pass independent technical review | this phase's blind grading: Promise axis + House axis + kimi-k3 | grading-phase5/ axis reports | PENDING REVIEW |
| 18 | Deliver a finished commercial-quality product | Project 12 itself: the Kit v1.1.0 + demo storefront + worked example passing | KIT_MANIFEST (50 entries) · example run · demo QA | **FILED** — example PASS · demo QA 5/5 PASS · verify 22/22 |

*Rows marked PENDING are the examination's own remaining
sittings (the blind install and the blind grading). No
PENDING row is claimed as a pass anywhere in this phase's
filings until its instrument lands.*

---

## AMENDMENT — filed by the Phase 5 completion grading (2026-11-23)

*Entered in the amendments ledger in
`track7-artifacts/grading-phase5/FROZEN_SET.md`. The
table above is not rewritten; the grading's verdicts
live in `TRACK_7_PHASE_5_GRADING_RECORD.md`.*

- **Row 16 is amended.** Its demonstration named "the
  book's Phase 5 instalment". That instalment does not
  exist — the book ends at the Phase 4 instalment — and
  the citation is **withdrawn**. Row 16's demonstration
  rests on the Kit's five documents (README · INSTALL ·
  CUSTOMIZE · CHANGELOG · BUDGETS, hash-verified in
  KIT_MANIFEST.json) and the blind-install sitting's
  preserved build. The book's Phase 5 instalment and
  the rules file's Phase 5 instalment are recorded in
  the grading record as **owed deliverables the phase
  did not file**.
- **Row 16's sitting, as graded.** The sitting's build
  (a different product, "Hearth №1", built from the
  Kit's documents) passes its instruments — verify
  17/17 · accessible parity 16/16 · QA harness verdict
  PASS, with an earlier QA run's FAIL (CLS 0.266)
  preserved before the pass. The sitting filed no
  record of itself: no brief, timing, builder
  statement, or question log exists. What is known and
  what is not is recorded in
  `grading-phase5/install-sitting/SITTING_MEMORANDUM.md`.
  The documentation's sufficiency is demonstrated by
  the build; the sitting's exam conditions (timed,
  zero questions) are unevidenced.
- **Row 2, as graded.** The Promise axis reviewed the
  boards against the built page and found every boarded
  scene, copy line, and interaction present and
  exercised green (PROMISE_AXIS.md). Demonstrated.
- **Row 17, as graded.** This completion grading —
  Promise axis, House axis, kimi-k3, the fix loop, and
  this record — is the review the row names.

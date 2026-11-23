# TRACK 7 · PHASE 1 RUN RECORD

*The run: 2026-11-23. Coordinator: the Phase 1 subagent run,
under the Mastery Standard and Relay Law. Phase 0's exit gate
had PASSED (`TRACK_7_PHASE_0_GRADING_RECORD.md`). Study +
grading only — no website building, no production work,
nothing toward Track 8 (sealed). The blind grading of this
phase, with per-module verdicts and the exit-gate ruling, is
filed separately: `TRACK_7_PHASE_1_GRADING_RECORD.md`.*

## What was built (every module produced its required output)

- **M2 — Storyboard** (`track7-artifacts/m2-storyboard/`):
  the builder's contract for a second product, The Project
  Book — measured film arc, 780vh stage, eight boards
  (windows, tips measured on the film's frames, copy spec-true
  to the live catalogue listing), supporting sections,
  responsive + reduced-motion designs, error recovery, a
  may-not-change list — plus the drawn board sheet.
- **M4 / Project 2** (`project-2-gsap-animation/` + the Engine
  donation `engine/animation/animation-system.js`): a working
  GSAP site on the Engine's new animation system — reveals, a
  pinned scrub scene, a stagger, a re-entry-safe transition, a
  self-measured timing ledger, and destroy() demonstrated
  live. Harness: **15/15** after hardening (see defects).
- **M5** (`m5-media-engineering/`): the delivery set —
  master → H.264 (1,591,943 B, PSNR 46.26 / SSIM 0.9912,
  faststart) · VP9 (1,145,115 B, 29.37 / 0.9670) · AV1
  (555,486 B, 29.39 / 0.9664) · mobile (388,180 B, 41.96 /
  0.9826 vs the scaled reference), poster, six-cue captions —
  plus the interactive presentation site. Harness: **8/8**,
  including the printed-bytes-vs-disk cross-check.
- **M6 / Project 4** (`project-4-film/`): the frame pipeline's
  second full run — matched pair (one still rejected at the
  still), one film (8.000 s, 1248×704), flaw log, call-count
  ledger, the slice to exactly 240 frames, a film-led page.
  Harness: **4/4**. **The route disclosure stands in the
  record's first section: the film was produced through the
  house media pipeline, not verifiably through Flow** — see
  the coordinator's ruling, §2 of the grading record.
- **M7 / Project 3** (`project-3-sequence-listing/`): the
  full scroll listing from the Engine's proven components
  only — 240 frames (desktop 3,297,028 B; mobile
  1,257,298 B), eight boards, error recovery demonstrated,
  CWV filed with method named. Harness: **19/19** after the
  fix round (see defects), including the contract test that
  parses its expectations from the storyboard.
- **The Engine** (`engine/README.md`): Phase 1 donations —
  the animation system (M4) and the frame pipeline as a
  cold-runnable document (M5+M6). The player + callout system
  (Phase 0) drove Project 3 byte-unmodified.

## Defects found in the run, and their dispositions

- **D-P1-1 (wiring, fixed + re-verified).** Project 3's first
  wiring never kicked the player's chase on scroll — the
  journey stood at frame 1 while all 240 frames loaded, with
  no error anywhere. The component's contract (Phase 0's exam
  site) puts the scroll listener on the page. Fixed with one
  listener; the harness now samples displayed frames. →
  Rule 15.
- **D-P1-2 (wiring, fixed + re-verified).** Project 3's
  `step: 1` sat inside the `frames` object, where the player
  never reads it; mobile thinning applied against the
  storyboard's full-order design. Moved to the config's top
  level; mobile completes at frame 240 of 240. → Rule 13
  extension (instalment 3 preamble).
- **D-P1-3 (build fidelity, found BLIND, fixed + re-reviewed).**
  Project 3's callout copy was improvised at build time
  instead of transcribed from M2's boards: all eight boards'
  eyebrows/titles/lines differed, Boards 1–2 sides were
  flipped, Boards 0/7 were centred instead of left, Board 0's
  leader tip was dropped — while the README claimed "exactly
  as M2 drew them" and the harness hard-coded the page's own
  titles, certifying the drift. Fixed by transcribing the
  boards verbatim, restoring the tip, aligning the at-a-glance
  titles to the listing's deliverables, and rewriting the
  harness to parse expectations from STORYBOARD.md (19/19,
  contract test green). → Rule 16.
- **D-P1-4 (contract self-contradiction, found blind, fixed).**
  M2's responsive text described a small-screen layout the
  mandated component does not implement (F-M2-1). The
  machinery clause governs; the storyboard now describes the
  component's actual layout, under a dated correction note.
  The boards themselves are unchanged.
- **D-P1-5 (honesty fence, found blind, fixed + re-reviewed).**
  The Project 4 and M5 pages carried no on-page honesty fence
  for the proposed offer's illustrative film (House Rule 2).
  Fence paragraphs added to both pages; harnesses re-run
  green (4/4, 8/8).
- **D-P1-6 (wording vs behaviour, found blind, fixed).** M5's
  record and page called H.264 "the presentation default"
  while the source ladder runs AV1→VP9→H.264 (F-M5-1). The
  ladder is correct engineering; the words now match it in
  the record, the page, and the book.
- **D-P1-7 (evidence hygiene, found blind, fixed).** Three
  filings claimed tighter numbers than independent runs
  reproduce: Project 2's timing range, Project 3's CWV
  ranges. Both now file the envelope across all independent
  runs with method named. → Rule 18. Project 2's harness was
  also hardened (state-polling instead of fixed sleeps — a
  loaded concurrent run had flaked two transition checks that
  an isolated re-run passed; the panels/stagger/re-init
  checks were added at the same time).
- **D-P1-8 (provenance precision, found blind, fixed).** The
  production record named the stills' tool by class ("Nano
  Banana class door") — more than the generation receipts
  show. The record now claims exactly what the sidecars
  carry (a snapshot id, no model name). → Rule 17.
- **NOT FIXED — the phase's open blocker.** M6's Flow
  provenance and per-film credit bars cannot be met by any
  action available to this run: Flow is the founder's
  signed-in browser surface (no crew route), the house's
  Google API door is fenced free-tier-only (no video
  generation), and no credit figure exists that could be
  filed without inventing one. The unblock is named in the
  grading record. This is the deciding evidence on the
  phase's exit gate.

## Carries

- **To Phase 2 / the chairs**: the callout/player components'
  silent-ignore config behaviour (an unknown or misplaced key
  fails silently) — a candidate Engine improvement (config
  validation warnings), noted by the different-family critic;
  the components themselves are Phase 0-frozen and were not
  modified in this phase.
- **H-15** (per-frame layout reads) still rides to M13;
  **keyboard orbit** still owed by M9's real product viewer —
  untouched by this phase, as the package orders.
- **Phase 0 floor-check re-sits** remain the chairs' weekly
  business; this run did not touch them and they are not
  Phase 1's gate.
- **The CWV PageSpeed question** (F-P3-2): the package's
  standing bar files CWV the specimen's way (live PageSpeed);
  this artifact is undeployed under the phase's fences, so a
  local lab trace was filed, labelled. Whether that satisfies
  the bar for an undeployed study artifact is carried to the
  captain as a NEEDS-CHECK — the coordinator does not rule on
  its own evidence.

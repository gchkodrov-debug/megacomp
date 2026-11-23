# TRACK 7 · PHASE 0 — OPENING RUN NOTE

*Run: 2026-11-23 (opening run, one seat — the captain's crew).
Scope: Phase 0's opening exactly as `TRACK_7_LAUNCH_PACKAGE.md`
defines it — M0 (Level Zero) as the opening module, M1's book
section written alongside it, the floor machinery run under the
A-to-Z precedent. Phase 1 was not started. Nothing outside the
university folder and the artifacts' own workspace was touched,
except the binding-rules instalment, which the Charter places in
the crew skills pack.*

**Loaded before building (house law):** the Crew Tools Manifest
(`CREW_TOOLS_MANIFEST.md` — §1 vendored GSAP/ScrollTrigger/Three
used for the artifact; §3/§13 blocked tools not needed here) and
the crew-skills pack index, with these binding skills/rules read
and applied: `plain_simple_english_first` (every FOR GEORGE
section), `verify_status_before_reporting` (the verification
discipline below — probe the artifact, not the claim),
`cinematic-web-engineering-rules.md` (this track's own rules,
written in this run), with Track 5's rules (frame-exactness) and
Track 6's CWV bars as standing house law.

---

## WHAT WAS PRODUCED

| File | What it is | Size |
|---|---|---|
| `TRACK_7_CINEMATIC_WEB_ENGINEERING.md` | The Track 7 book, Phase 0 instalment: M0 + M1 sections at the house shape (principle → our work → the check), each ending in FOR GEORGE — WHAT I NOW KNOW | 19,779 B |
| `track7-artifacts/m0-how-the-web-works/index.html` | **M0's required output** — the interactive explainer "How the Web Works": the journey, the engine room with a live FPS meter, all six website kinds as live miniatures, a choosing table, and a self-checking teach-back quiz | 34,674 B |
| `track7-artifacts/m0-how-the-web-works/assets/` | Vendored house GSAP 3.12.5 + ScrollTrigger + Three r160 (site copies ship inside page builds — manifest §1 pattern); the teaching film in two codecs (MP4/H.264 594,087 B · WebM/VP9 247,497 B, ffmpeg-generated); captions file; 48 frame stills (480×270, 464 KB total) for the hybrid scrub miniature | 2.1 MB total |
| `track7-artifacts/m0-how-the-web-works/verification/` | Render evidence: final screenshot, rendered DOM captures (at rest + scrolled), Chrome logs, the FPS unit-proof script | — |
| `track7-artifacts/floor-checks/honest-fetch.mjs` + `state-file.mjs` | Foundations Ch. 2 reproduce assignments 2 and 3, as runnable Node programs | 1,119 B · 1,097 B |
| `TRACK_7_PHASE_0_FLOOR_CHECKS.md` | The floor-check instrument (F1 + F2) and per-seat records — one seat run with evidence, sixteen seats honestly NOT RUN | 7,825 B |
| `~/workspace/newwave/tools/crew-skills/cinematic-web-engineering-rules.md` | Track 7 binding rules, instalment 1 (M0–M1): twelve rules | 3,359 B |

## WHAT WAS VERIFIED, AND HOW

The artifact was **run**, not admired (verify-status discipline):

- **Served over HTTP** (local server on the artifact): index and
  every asset returned 200 with byte counts matching disk —
  HTML 34,127 B as first built, both video files, captions, all
  48 frames sampled at the ends (f001/f048) plus the full frame
  count confirmed at 48.
- **Inline JavaScript syntax-checked** (`node --check`): PASS.
- **Rendered in a real browser engine** (Chrome Headless Shell
  157, the house puppeteer cache): zero console errors across
  four runs; the screenshot was opened and read — the page
  renders in the house design language, all sections laid out.
- **Live readouts proven populated in the rendered DOM:**
  Navigation Timing from the page's own load (TTFB 3–6 ms · DOM
  ready ~474–495 ms · load ~494–545 ms, local server); frame-time
  readout ticking (16.7 ms at virtual cadence; 33.4 ms in an
  earlier run); WebGL live (Three.js rendering, renderer reports
  2 draw calls); the hybrid scrub at rest (progress 0%, frame 1).
- **Scroll behaviour proven:** loaded at the page's bottom
  anchor, the scrub machinery answered — progress 100%, target
  frame 48, displayed frame caught mid-chase at 30 (the lerp
  visibly doing its work), callout advanced to "Act 3 — the
  end".
- **Two defects found by verification and fixed in the run:**
  (1) the load-time readout printed "0 ms" — `loadEventEnd` is
  still 0 inside the load handler; the read now happens after
  the event closes, with a fallback. (2) The FPS number could
  sit at "…" on short visits — the meter now publishes a
  provisional read at 30 frames before the one-second window
  takes over.
- **One honest environment note:** the FPS element itself did
  not populate inside the headless dumps — the dump serializes
  before 30 frames are delivered (its frame-time sibling, same
  loop, does populate). The FPS write path was therefore proven
  by a Node unit test driving the page's exact loop logic
  through 150 scripted frames (result: `fps="60"`,
  `frametime="16.7"` — PASS, script filed in `verification/`).
  On any real visit the meter populates within the first second;
  the limitation is the measurement rig's, and it is recorded
  here rather than smoothed over.
- **Floor checks executed** (opening seat): F1 reproduce against
  a freshly fetched unseen page (threejs.org, crawl 2026-11-23
  05:26 UTC) — ten concepts, checked against the page, filed in
  the floor-check record §A. F2-2: all three fetch paths run —
  200/OK exit 0, 404/NOT_FOUND exit 2, dead port/NETWORK_DOWN
  exit 3. F2-3: run 1 `processed=10000`, run 2 `processed=0` —
  the seen-set proof. F2-1: the M0 page itself, under the
  flagged from-fundamentals reading (see ambiguities).

## AMBIGUITIES FLAGGED (not silently resolved)

1. **Two Phase 0 definitions.** The launch package §5 defines
   Phase 0 as M0+M1 with the exit gate "exams passed blind;
   Project 1 shipped." The A-to-Z schedule's Phase 0 is the
   floor: Ch. 1 check per seat + Ch. 2's three assignments + the
   no-AI page. *Treatment (per this run's orders):* both — the
   floor machinery runs as Phase 0's ground layer, and the
   package's exit gate stands as the phase's gate. This opening
   run does not close Phase 0 under either definition.
2. **"No-AI page" for an AI crew.** Administered as *written
   from fundamentals — no framework, no code-generation
   pipeline, no copied template.* The M0 artifact qualifies
   under that reading. The assignment's git-commit clause
   cannot be satisfied: the university folder is not a git
   repository (verified in this run). The captain's ruling can
   replace this reading.
3. **The A-to-Z form-validation + three-width clauses** of
   F2-1 were not executed in their exact form: the artifact's
   interactive check is a quiz (validates and answers back),
   and its render was verified at desktop width, with the
   single-column collapse present by construction in the CSS.
   Recorded as open items below rather than approximated into
   a pass.
4. **Floor checks are per-seat; this run is one seat.** All
   other seats are recorded NOT RUN in the floor-check file.
   Administering them is per-chair coursework (weekly shape),
   and the *blind* floor grade is a separate relay event —
   nothing in this run grades its own work blind, by design.

## STILL OPEN BEFORE PHASE 0'S EXIT GATE CAN PASS

1. **M1's required output** — Project 1: the Engine's skeleton
   repository + the foundations exam site (original responsive
   website, reusable components, accessible navigation). Book
   written; build not started.
2. **M0 blind exam** — the explainer page graded blind as a
   teaching artifact (package §4 bar). Not sat.
3. **M1 blind exam** — waits on item 1.
4. **Floor checks for the other sixteen seats** — instrument
   ready; not run.
5. **F2-1's exact clauses** — form validation + three-width
   render check, in the A-to-Z form, for the record.
6. **Project 1 shipped** — the package's second exit-gate leg;
   identical with item 1's destination.

*Phase 0 remains open. The opening is on record: the floor is
defined, the first module is taught and built, and every claim
above carries the run that proved it.*

---

## WORD FROM GEORGE — THE GRADUATION GATE (recorded 2026-11-22 23:44 CT, mid–Project 1 build)

George's word, verbatim: *"I want the crew to finish studying and then I wanna start building the website. I want them to know. I wanna know that they're done graduated."*

Ruled meaning, recorded so it governs the program:

- **Track 7 study runs to FULL graduation before any website building begins** — all phases, every module's required output, the blind-graded exams, and the §26 Final Master Examination, under the Mastery Standard (not mastered until the seat can teach it; Production-Ready only on blind-passed shipped work, artifact named).
- **Graduation is the gate.** The website build starts only after it. No website work, no specimens, no side builds until then.
- George wants the graduation to be *known* — his and the crew's: when the crew is done, it will be proven by the blind grades on record, not announced on confidence.
- Project 1 (this run note's build) continues as part of Phase 0 exactly as briefed — it is coursework, not website building.

**Sealed notice (2026-11-23):** George has filed the next degree — Track 8, Platinum Pristine Website DNA (directive + sealed charter entry on file) — sealed behind Track 7's graduation; no seat opens, studies, or builds toward it before that gate.

**Sealed notice #2 (2026-11-23):** Track 8 now also carries its Final Examination — the Platinum Pristine Master Certification Exam (benchmark grading against real luxury-brand sites, sat when the crew is done) — George's stated purpose: "if they can build this kind of website they can build my website"; the exam flagship is the audition for the founder's own site. All sealed behind Track 7 graduation.

---

## PROJECT 1 — THE ENGINE SKELETON + FOUNDATIONS EXAM SITE (built and verified 2026-11-22/23)

M1's required output, built inside
`track7-artifacts/project-1-engine-skeleton/` (131 files,
3,414,833 bytes total). The two specimen-proven cores were
generalized into product-agnostic components, and the M0
teaching page was rebuilt *from* them — the exam site is the
proof, not a second copy.

### Production table

| Piece | File | Bytes |
|---|---|---|
| Design tokens | `engine/tokens.css` | 1,271 |
| Base shell | `engine/base.css` | 4,523 |
| Component 1 — scroll-sequence player | `engine/components/scroll-sequence-player.js` | 11,907 |
| Component 1 styles | `engine/components/scroll-sequence-player.css` | 1,754 |
| Component 2 — callouts + leader lines | `engine/components/callout-leaders.js` | 7,798 |
| Component 2 styles | `engine/components/callout-leaders.css` | 3,216 |
| Exam site — structure | `exam-site/index.html` | 24,583 |
| Exam site — page styles (imports only + page rules) | `exam-site/site.css` | 2,742 |
| Exam site — wiring (components driven by configuration) | `exam-site/site.js` | 9,254 |
| Neutral test sequence (generated) | `exam-site/frames-paper/` — 60 frames, 640×360 | 549,314 |
| M0 media carried in (48-frame miniature, clip, vendor libs) | `exam-site/assets/` | 1,954,013 |
| Sequence generator (records the tip math) | `tools/make_paper_frames.py` | 6,564 |
| Component contracts + re-drive example | `README.md` | 5,943 |
| Verification harness | `verification/verify.mjs` | 17,961 |
| Verification results + 4 screenshots | `verification/results.json` + `shot-*.png` | 813,990 |

The skeleton's scope is the package's: player core (priority
preload — first, last, midpoint, then quartiles by subdivision;
the lerp chase at 0.1 with snap; nearest-loaded fallback; DPR
cap; frame thinning; reduced-motion path) and the callout/
leader component (beat windows with the 16% edge fade; tips as
frame fractions mapped through the player's own exposed
`coverTransform()` — one transform, two readers). No Mint
facts, content, or file names exist in the components: engine
and tools sources grep clean for the specimen product (zero
hits — see defect 3), and a second product enters by
configuration alone (count, URL function, size, beats in HTML).

### The non-Mint proof

The player was proven on a sequence it was never built
around: `tools/make_paper_frames.py` drew 60 neutral frames —
a sheet folds (1–20), the plane flies a dotted arc (21–44),
lands on a gold runway line (45–60) — and computed each
beat's tip from its own drawing math (Fold → frame 16, tip
0.500,0.522 · Flight → frame 32, tip 0.483,0.314 · Landing →
frame 49, tip 0.875,0.769). The exam site then drives the
SAME two components twice on one page by configuration alone:
the paper journey (60 frames, five beats, three tipped) and
the M0 hybrid miniature (48 frames, three untipped beats).

### Verification record (verify.mjs — 36/36 checks passed)

Served over local HTTP and rendered in Chrome Headless Shell
157; full results in `verification/results.json`, screenshots
beside it. Headline numbers:

- **Zero console errors** — on load and after full
  interaction, desktop and reduced-motion pages alike.
- **Settles on the generator's own frames**: Fold → frame 16,
  Flight → frame 32, Landing → frame 49, each with its callout
  and leader group at opacity 1.000, and only one beat present
  at a time.
- **Leader dots land dead-on**: 0.0 px error on all three
  tipped beats, against positions re-derived independently in
  the harness from the component's exposed cover transform.
- **The chase is real**: a 0 → 0.81 jump passed through 35
  distinct intermediate displayed values before settling.
- **Readouts print the real state**: at the Fold beat the
  in-stage strip read scroll 25% → target frame 16 → displayed
  frame 16 → loaded 60/60, asserted equal to `state()`.
- **Second configuration**: the web miniature settled at
  frame 25 of 48 at its midpoint, Act 2 callout present.
- **Quiz** scores a correct answer set 6 of 6; **FPS meter**
  live (53 in the headless rig).
- **Network**: 128 requests, zero mention the specimen
  product; all 60 paper frames really loaded.
- **Reduced motion**: exactly one frame requested per player,
  no leader SVGs built, first frame shown.
- **Responsive**: 0 px horizontal overflow at 390 / 768 /
  1280 px; on mobile the player thins its order (31 of 60)
  and still settles on the beat.
- **Unit tests (Node)**: priority order opens [1, 60, 31, 30,
  15, 45], covers 1..60 uniquely, quartiles before eighths;
  nearest-loaded exact/nearest/empty cases; bad configuration
  throws `SequencePlayerConfigError` naming the field
  (frames.count, progressSource, canvas — all three proven).

### Defects found and fixed in-run

1. **The exam site's readouts read fields that do not exist**
   (build defect — fixed). `site.js` read `s.progress`,
   `s.targetFrame`, `s.displayedFrame` from the player's
   `onDraw`; the player's state returns `target`, `displayed`,
   `currentFrame`. The page would have printed NaN% and
   undefined to its own honesty strip. Caught by reading the
   wiring against the component's real contract; fixed by
   binding the readouts to `state()` verbatim, and the
   verification now asserts printed numbers equal the state.
   → Earned Rule 14 (instalment 2).
2. **The verification harness was written against a
   remembered API** (harness defect — fixed; the component was
   innocent). The first harness called `priorityOrder(count,
   step)` and `nearestLoadedIndex(set, …)` from memory; the
   real signatures are `priorityOrder(list)` and
   `nearestLoadedIndex(isLoaded, idx, length)`. Called with a
   number, the helper's subdivision queue loops forever on a
   NaN range — two runs hung (killed at ~50 min and at 280 s,
   ~100% of one core, zero output) before the cause was
   isolated by a unit probe, which then passed in 286 ms
   against the real contracts. The harness was rewritten from
   the source. → Earned Rule 13 (instalment 2). Recorded
   plainly: the lost time was the harness author's, not the
   component's.
3. **Provenance words in component headers** (hygiene —
   fixed). The component headers named the specimen product
   as their inheritance. Provenance belongs in the record
   (README, this note), not inside product-agnostic sources;
   the headers now say "the graduated specimen," and engine +
   tools grep clean for the product's names.
4. **Not a defect, recorded for the next seat**: at page load
   the players report `loadedCount 0` until their section
   nears — the priority preload is proximity-gated
   (IntersectionObserver, 120% margin) by specimen design.
   The harness scrolls the journey into view before asserting
   load counts.

Rules file: `crew-skills/cinematic-web-engineering-rules.md`
gained **instalment 2** — Rule 13 (a test is written against
the contract as read, never as remembered) and Rule 14 (a
readout prints the component's own state, never a parallel
computation) — both earned by defects 1 and 2 above.

### Still open before Phase 0's exit gate can pass

Unchanged by this build, and NOT self-administered here:

1. **M0 blind exam** — the explainer page graded blind as a
   teaching artifact. Not sat.
2. **M1 blind exam** — the skeleton + exam site graded blind
   against the M1 bars (genuine reuse, keyboard-complete
   navigation, zero console errors). The verification above is
   the builder's own run, not the blind grade. Not sat.
3. **Floor checks for the other sixteen seats** — instrument
   ready; not run.
4. **F2-1's exact clauses** — form validation + three-width
   render check, in the A-to-Z form, for the record.

Phase 0's build legs are now complete (M0 artifact, M1 book,
Project 1). What remains is grading — and under George's
graduation gate (filed above, 2026-11-22 23:44 CT) the whole
of Track 7 runs to full graduation before any website
building begins.

### FOR GEORGE — Project 1

Project 1 is built and proven: 36 of 36 checks passed in a
real browser. The crew now holds the first two pieces of the
Engine — the machinery every future page will be assembled
from. Piece one is the scroll player: it shows a sequence of
frames as you scroll, with the same butter-smooth chase the
Mint page graduated with — but cleaned of every Mint fact,
so any product can use it. Piece two is the callout system:
the cards that name each part, with the line and the gold dot
that land exactly on the part being named. To prove the
pieces know nothing about the coin, we tested them on a
paper plane — a script drew 60 frames of a sheet of paper
folding into a plane, flying, and landing — and the player
presented it perfectly: every callout on its beat, every dot
dead-on with 0.0 pixels of error, and the numbers printed on
screen matching the machine's real state. The M0 lesson page
was then rebuilt out of these same pieces — same lesson,
assembled from components instead of written as one page —
and the same components drive both of its scroll journeys by
settings alone. Two mistakes were caught and fixed on the
way, both written down in the open: one in the page's number
displays, and one in my own test rig, which blamed the
component for an hour before the reading acquitted it — the
component was right all along. What remains in Phase 0 is
only the grading: the blind exams for M0 and M1, and the
other sixteen seats' floor checks. Those are not mine to
pass for myself; they stay open until the blind graders sit.
And per your word: the crew finishes studying and graduates
first — no website building until then.

# PROJECT 3 — THE PROJECT BOOK, THE FULL LISTING

*Track 7 · Master Project 3 (M7's exam). A second product's
complete scroll-assembly listing, built ONLY from the Engine's
proven components (the sequence player + the callout system),
configured from M2's storyboard. No bespoke player code exists
on this page.*

## The build, against the standard

- **240 frames** (the film is exactly 8.000 s at 30 fps — the
  honest count), desktop set 3,297,028 B (≤8.5 MB), mobile set
  1,257,298 B (≤1.5 MB), mobile set swapped in at ≤700px with
  the full order kept (step 1 — the storyboard governs).
- **Eight boards** exactly as M2 drew them: windows, sides,
  copy spec-true to the live listing, tips measured on the
  film's own frames.
- **Supporting sections** from the storyboard: at-a-glance
  scope, the two priced routes ($175–350 / $400–800), the
  honesty block, and the request control — a mailto with
  `data-purchase-enabled="false"`; checkout is not connected
  and the page says so.
- **Error recovery, demonstrated**: the workshop miniature is
  a six-frame player whose fourth frame address is
  deliberately wrong; it loads 5, fails 1, names it, and the
  journey never notices.
- **Reduced motion**: the static path — poster frame + the
  beats as a reading list; nothing the page says is lost.

## Verification (`verify.mjs` — 19/19; `cwv.mjs`)

Journey plays through 53 distinct sampled frames to frame
240; all 240 load, zero fail; at each board's midpoint exactly
one callout stands and its leader tip lands at **0.0 px** error
against the cover-transformed expectation, all six boards;
mobile completes on the mobile set; reduced-motion path
stands; zero page errors on every path.

**CWV (local lab trace over localhost — method named in
`cwv.mjs`; the specimen's live-PageSpeed route is not
available to an undeployed artifact):** across four
independent local runs (the builder's two and both blind
reviewers' traces): desktop LCP 0.18–0.50 s, CLS 0.003,
slowest interaction 16–64 ms; mobile LCP 0.12–0.27 s, CLS
0.007, slowest interaction 24–96 ms — lab variance on a
shared machine, every run inside the bars. Bars (Track 6):
LCP ≤2.5 s ✓ · CLS <0.1 ✓ · INP <200 ms ✓ (lab interaction
latency, labelled as such).

## Two wiring lessons this build paid for

Filed as rules candidates in the Phase 1 record: the player
owns no scroll listener — **the page must kick the chase on
scroll** (Phase 0's exam site did; this page's first wiring
didn't, and the journey stood frozen at frame 1 while every
frame loaded); and **`step` is a top-level config key**, not
a frames key — inside `frames` it is silently ignored and
mobile thinning applies instead.

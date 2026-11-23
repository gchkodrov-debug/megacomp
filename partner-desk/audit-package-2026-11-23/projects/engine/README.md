# THE ENGINE — DONATIONS THROUGH PHASE 3

*What each phase added to the Engine, and where the rest
lives. The Engine's foundation (design tokens, the base
shell, the scroll-sequence player, the callout/leader
system) entered in Phase 0 and lives at
`../project-1-engine-skeleton/engine/` — proven there, and
proven again in Phase 1 on a second product.*

## Donated by Phase 1

- **The animation system** — `animation/animation-system.js`
  (M4, born in Project 2): GSAP timelines + ScrollTrigger
  rigs under house discipline — reduced-motion as a designed
  state, a self-measured frame-timing ledger, and a complete
  lifecycle: `destroy()` kills every trigger and tween,
  disconnects the ticker, reverts inline styles, and is
  idempotent (Phase 0 carry H-19, discharged by Project 2's
  harness: 11/11).
- **The frame pipeline** — `frame-pipeline/PIPELINE.md`
  (M5+M6, proven in Project 4): the cold-runnable run from
  product to frame sequence — spec, matched pair, film,
  frame-stepped flaw log, the slice, the budgets — with both
  proven runs' measured costs tabled (Mint 235 frames; Project
  Book 240).

## Proven again in Phase 1 (not re-donated)

- The **sequence player** and **callout system** drove
  Project 3's 240-frame listing from configuration alone —
  six leader tips at 0.0 px error, error recovery
  demonstrated, mobile and reduced-motion paths standing.
  Two wiring contracts were paid for and are filed as rules:
  the page kicks the chase on scroll; `step` is a top-level
  config key.

## Donated by Phase 2

- **The 3D viewer** — `3d-viewer/viewer.js` (M9, born in
  Project 5): a product viewer on the vendored Three.js —
  its own orbit controls (pointer, wheel, pinch, and
  keyboard, discharging Phase 0's carried requirement),
  raycast inspection with named parts, the smoothing chase,
  a softbox environment built in code (a metal with nothing
  to reflect renders near-black; the viewer now reflects a
  room), a self-measured FPS/latency ledger, a complete
  idempotent `destroy()`, and a minimal hand-written GLB
  reader for the static, factor-coloured subset the house
  cleanup gate exports — anything outside the subset fails
  with a named error, a fence that caught M8's first,
  animated export by name.
- **The shader pack** — `shaders/shader-pack.js` (M10,
  born in Project 6): a raw-WebGL transition stage carrying
  two original GLSL transitions (dissolve, swirl), an eased
  progress clock, `getState()` readouts, and `supported()`
  — the pre-flight that lets a page promise its fallback
  before it promises the effect. Project 6 ships that
  fallback in the same build and grades it with WebGL
  disabled at the browser.
- **The camera choreography system** —
  `camera/camera-choreography.js` (M11, born in Project 7):
  keyframes { at, position, target } flown as a Catmull-Rom
  spline in cubic Bézier segments (M3's curve), time warped
  by the keyframes' own `at` values, `poseAt(t)` pure
  enough to unit-test in Node — endpoints exact, worst
  tangent break at a join 10.5°, continuity therefore by
  construction and by measurement both.

## Donated by Phase 3

- **The interaction state machine** —
  `interaction/state-machine.js` (M12, born in Projects 8
  + 10): named states, named events, transitions as table
  entries or functions, and designed refusals — an event
  with no entry in the current state, or a `{ veto: true }`
  return, is refused with `false`; nothing queues, nothing
  throws. State and context are inspectable (`state()`,
  `context()`, `can()`), so readouts print the machine
  itself (Rules 12 + 14). Project 8's turntable and
  Project 10's walk both run on it in place.
- **Scene navigation** — `interaction/scene-nav.js` (M12,
  born in Project 10): scenes and a hotspot registry over
  the machine — entering a scene is a GOTO, landing a
  SETTLE, retargeting mid-flight ordinary; leaving a scene
  closes its hotspot; OPEN is refused for another scene's
  hotspot and while moving. DOM-free, Node-tested.
- **Launch pacing** — `launch/pacing.js` (M12, born in
  Project 9): a published reveal schedule executed by one
  component — each step fires once, `reveal(id)` opens a
  step early (pacing never gates), `skip()` completes the
  schedule and is remembered as a skip, and reduced motion
  collapses the schedule without being called one.
- **The reservation book** — `launch/reserve-book.js`
  (M12, reshaped by M14): one validator and one numbering
  for every surface of a launch — pure `validate(values)`,
  `record(values)` that appends only when clean and
  returns the numbered confirmation built from the
  edition's own figures. Project 9 and its accessible
  alternative share the one book in place; it exists
  because the alternative needed the same book, not a copy
  (Rule 28).
- **The QA harness** — `qa-harness/` (M16): the house's
  five gates behind one runner — unit (specs against the
  target's own modules), e2e (a declared journey in a real
  browser), visual (screenshot vs a filed baseline, the
  baseline a reported decision), a11y (the named DOM audit
  floor), perf (a labelled local lab trace against
  budgets). Examined in M16 against Project 9, clean and
  planted: 8/8 expectations, every planted defect caught
  by its owning gate.
- **Cached scroll progress** — added to the Phase 0
  sequence player (M13, discharging Phase 2's carry H-15):
  `cachedScrollProgress(section, win)` measures geometry
  once, refreshes on resize/ResizeObserver, and answers
  per-tick from the scroll position alone — the player's
  original per-frame-read export remains for comparison,
  and Project 1's harness re-run fresh (36/36) proves the
  addition cost no regression.

## Carried out of Phase 3

- The components' silent-ignore config behaviour (from
  Phase 1, still open): an unknown key in a component's
  config is ignored without a word. Phase 3's components
  throw on malformed definitions instead (state machine,
  scene-nav, pacing, reserve-book all validate their
  definitions), but the older components keep the old
  behaviour until a phase pays for the sweep — named
  here so it is a decision, not a discovery.
- The shader pack's mid-flight retarget (from Phase 2)
  remains documented v1 behaviour, a refinement candidate.

## Studied in Phase 2, deliberately not donated

- **M3's software renderer** stays in its module folder as
  the teaching reference — the Engine consumes its
  mathematics through the camera system and the viewer's
  conventions, not by embedding a rasterizer.
- **M8's Blender pipeline** is a production route, not a
  runtime component: its outputs (frame sequences, GLB
  models inside the cleanup gate) enter the Engine's world
  through the frame pipeline and the viewer's GLB reader,
  both proven against M8's own lamp.

## Phase 4 additions (M15 · M17 · Project 11)

- **3D viewer — visibility pause.** The viewer stops
  rendering while its canvas is off screen
  (IntersectionObserver, 40% root margin; the rAF chain
  and FPS bookkeeping stay live, FPS counting rendered
  frames only; `getState()` gained a `visible` field;
  `destroy()` disconnects the observer). Measured reason:
  Project 11's QA perf attribution found the continuously
  rendering stage — including while far off screen.
  With the pause, Project 11's graded long-task total
  fell 18,358 → 9,562 ms (provenance in its QA filing);
  the off-screen share is now zero. Regression-proven
  after the change: Project 5
  10/10 · Project 11 13/13.
- **QA harness — media MIME types.** The harness's static
  server now serves .mp4/.webm/.vtt/.glb/.json with real
  types; before, media targets were fetched as
  application/octet-stream — playable nowhere, an
  instrument defect found by the harness's first media
  target (Project 11). M16's exam re-run after the fix:
  8/8, unchanged judgment.
- **The Engine package.** `../engine-package/` assembles
  this tree's proven components (plus the Project 1
  foundation/player and the vendored libraries) into an
  installable package with a hash manifest, three
  documents (README · INSTALL · BUILD_A_PAGE), and the
  seven architecture templates. The package is a snapshot;
  this tree remains the components' home.

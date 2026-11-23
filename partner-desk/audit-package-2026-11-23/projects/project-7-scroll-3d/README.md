# PROJECT 7 — THE WALL, APPROACHED (SCROLL-DRIVEN 3D)

*Track 7 · Master Project 7 (M11's exam). Scroll drives
the camera and the scene: a flight over the coin and a
47-brick wall, with multiple camera transitions and
coordinated object animation, and no cuts.*

## What is here

- `index.html` — the piece: a 620vh scroll track with a
  sticky WebGL stage, four story beats, a state HUD, and
  the reduced-motion presentation (a static pose + the
  journey as a text list).
- `assets/` — the coin's anchored face textures (shared
  with Project 5).
- `vendor/three.min.js` — vendored Three.js r160 UMD.
- `verify.mjs` — the harness: 13/13. (Part A builds its rig
  from the page's own filed keyframes, read out of the
  running page — after the Phase 2 house review found the
  first version restating them from a private copy; and
  check B1b, added on the different-family critic's
  observation, binds the config to the motion itself: at
  each middle keyframe's scroll fraction the live camera
  stands on that keyframe.)

## The Engine donation

The camera choreography system:
`../engine/camera/camera-choreography.js` — keyframes
{ at, position, target } flown as a Catmull-Rom spline
evaluated in cubic Bézier segments (M3's curve), with the
keyframes' own `at` values warping time between legs.
Continuity is by construction (matching tangents at every
join) and is measured anyway: worst direction change at a
join 10.5°, camera path ≈ 26.1 units.

## Design choices, stated

- **Direct pose application, no chase.** The frame player
  chases because film frames are discrete; a camera pose
  is a continuous function of scroll, so the page applies
  `poseAt(scrollT)` directly. The spline, not a smoother,
  is what guarantees no jump — harness check B2 steps the
  scroll 40 times and the largest camera move is 0.94
  units on a 26-unit path.
- **One clock.** The coin's turn (two full turns across
  the journey), the bricks' lighting (47 bricks, reading
  order, across t 0.45–0.85), the beats, and the camera
  all read the same scroll fraction; reverse scroll flies
  the whole thing home (check B5).
- **State from the scene** (Rule 14): `__state()` reads
  the camera's transform, the bricks' actual materials,
  and the coin's actual rotation; the HUD's lit count is
  counted back off the bricks' materials after they are
  set, and harness check B6 grades the HUD's printed text
  against the scene at both ends of the scroll. (The first
  version printed the HUD's count from the scroll formula;
  the Phase 2 house review caught the difference and the
  page was corrected.)

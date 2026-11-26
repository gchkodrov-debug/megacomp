# THE LIBRARY, CINEMATIC GRADE — Construction Seat D (FVR-31 Wave 2)

**Status: BUILT — UNVERIFIED.** An isolated construction specimen: one scene
that integrates the house's four real engines into a single living cinematic
room. Nothing here is deployed; no live door links here; purchasing is closed.
Craft references (founder's order): Ice Age / Aladdin as *craft* only —
inhabitation, unified light and shadow, surroundings alive during
conversation — never their art identity.

## What is in this directory

| File | Role |
|---|---|
| `index.html` | The page: HUD, the stage (all layers), the manifestation overlay |
| `library-scene.js` | The Library as **world-engine scene data** (floor band, depth bands, anchors, population, rest/follow) |
| `cinematic-library.js` | The integration host: renderer, film looper, cast, manifestation wiring |
| `cinematic-library.css` | Host stylesheet — stage look, lighting layers, and Seat C's `.mf-*` contract |
| `exercise.cjs` | The puppeteer exercise that produced the results below (`node exercise.cjs`) |
| `frame-room.png` | Evidence: the composed room (film + cast + inhabitants) |
| `frame.png` | Evidence: the manifestation mid-separation (coin + 8 parts + threads) |
| `stills/reading-room.jpg` | Job 5's source still (poster / reduced-motion carrier) — byte-identical copy |
| `stills/stacks-aisle.jpg` | The stacks still, the arch-vista plane — byte-identical copy |
| `coin-front.webp` | The coin's canonical face (the Mint's artifact) — byte-identical copy |

## How the engines connect

- **World Engine** (`../world-engine/world-engine.js`) owns the scene as data
  and the one master clock. The host registers as a renderer
  (`attachRenderer({ onFrame })`); every position on stage is computed from
  the engine's view model (`scaleAt`, `feetY`, `zOf`) — nothing is
  hand-placed in CSS. The clock's phases drive the room: `lampGlow` (13 s)
  breathes the lamp pools, `sparkle` (29 s) twinkles the dust, `dust` (61 s)
  is the ambient family, and the coupled phase (47 s) is the film's law.
- **Avatar System** (`../avatar-system/`) owns locomotion. The visitor is a
  walker built from the `guest` registry entry; the three inhabitants are
  walkers on the scene's population slots (stand / stand / cross modes,
  driven exactly as the prototype drove them). Solnik's behaviour —
  follow-band, catch-up, greeting, pointing, idle chuckle/blink timers,
  viseme speech state — is the **companion module**, unmodified.
- **Solnik's rig** (`living-entity/cartoon/solnik-toon.js`) is his body: the
  host constructs the `Toon` on a real DOM element, as the prototype journey
  does, and hands the instance to the companion (`companion.toon`). If the
  rig ever fails to load, a fallback figure takes his place and the
  companion's state still drives it. *In every exercise run the real rig
  mounted (`rigMode: "rig"`).*
- **Manifestation Engine** (`../manifestation-engine/manifestation.js`) owns
  the magic. The Mint enters as **data** — the engine's own
  `products.example.json`, fetched at runtime; only the artifact image path
  is overridden to this scene's local `coin-front.webp` (the example data's
  relative path does not resolve from here; the canonical coin lives in
  `newwave/build/`). The full state machine runs in an overlay above the
  room; the room never pauses behind it. Solnik reacts through the
  companion: he points at the stage and speaks the product's own `line`
  from the data when it materializes. The engine fixes its mode (radial /
  scrubber) at construction, so the host rebuilds it from FOLDED if the
  viewport crosses the 700 px breakpoint between openings — a phone always
  gets the scrubber.
- **The film** (Job 5, `../../assets/record-reading-room_take1.mp4`) loops
  by the **ET-120 pattern**, one layer of it: dual-video, the standby loads
  after the active passes 35 %, a 0.8 s crossfade at the bookend, the
  outgoing pauses; a standby that is not ready produces one *counted* hard
  cut instead of a fade into black. The layer's canonical position is a
  pure function of the master clock — adopted from the film's true position
  at first run, converged by playbackRate only (±6 %), re-anchored at every
  crossfade. **No corrective seeks, ever** (the engine's law, carried in).

## The room itself

- **The central table is two anchors** (`table-far` d 0.50, `table-near`
  d 0.78, both occluding). A walker at the scroll's depth (d 0.62, z 70)
  passes *behind the table's far panel (z 61) and in front of its near
  panel (z 83)* — the brief's occlusion case, produced by the data. In the
  evidence frame the crossing scribe's legs are cut by the near panel.
- **Lighting is a system, not a filter**: two lamp-glow pools breathing on
  the clock's lampGlow cycle (screen blend), a dust-mote canvas in the
  light shafts, a warm soft-light grade plus a vignette shade over
  everything, and every figure carrying the avatar system's contact shadow
  (scaled by depth) and a warm tint — film, stills and characters graded
  into one frame.
- **Parallax is tied to the visitor's position** (never the pointer): the
  film drifts least, the stacks vista (glimpsed through the film frame's
  own arch opening) a little more, the mid silhouette plane more, the near
  plane most.
- **Life never gates**: population, dust, lamps and the film keep running
  while the manifestation is open and while dialogue shows (proven in the
  exercise: population positions changed *during* the manifestation run).
- **Reduced motion** is honoured end to end: no film bytes load (the poster
  still carries the room), walkers are placed instantly, population loops
  freeze, motes draw once, the manifestation runs its reduced timings.
- **Solnik's lines here are scripted** (labelled in the code). His live
  brain is not connected in this specimen.

## Exercise results (Seat D's own run, `exercise.cjs`, headless Chromium)

Served from `~/workspace/newwave/next-build/` (the rig lives outside
`living-universe/`, so the tree root is the serving root — page URL
`/living-universe/construction/cinematic-library/index.html`).

| Check | Result |
|---|---|
| `node --check` on all JS | PASS |
| Scene loads, zero page errors (whole run) | PASS — `[]` |
| Solnik's real rig mounted | PASS — `rigMode: "rig"` |
| Film readyState ≥ 3 and currentTime advances | PASS — readyState 4, 3.02 s → 4.18 s |
| Floor click moves the visitor | PASS — x 38 → 69.0, d 0.72 → 0.80 |
| Solnik follows | PASS — x 46.3 → 63.7 toward the visitor |
| Population positions change across 3 s | PASS — all three inhabitants moved |
| Manifestation separates | PASS — SEPARATED, **8 parts visible, 8 golden threads** |
| Manifestation reassembles | PASS — WHOLE, **0 parts visible** |
| Life during the magic | PASS — population kept moving with the overlay open |
| Mobile 375 px scrubber | PASS — present, "1 / 8" → Next → "2 / 8" |
| Film looper ledger, ~21 s (≈2.7 loops) | **2 crossfade swaps, 0 hard cuts**, 1 adoption, 6 rate nudges / 3 corrections, maxDrift 0.97 s (headless CPU starvation; converged by rate only, no seeks) |

Two defects were found by the exercise and fixed during the build:
(1) the anchor/population host divs carried `z-index: 0`, trapping every
child in a stacking context *under* the film — the engine's z-math never
reached the stage; (2) the figure builder computed each character's head
but never appended it — the cast was faceless until the crop review caught
it. Both fixes are in the code with comments.

## Honest visual read (against the craft bar)

What reaches toward cinematic: the film itself is a beautiful room and it
fills the frame; Solnik's real rig sits in its light like he lives there;
the room keeps breathing (lamps, dust, a scribe crossing with a book, a
reader turning a page) while you talk and while the magic runs; the
occlusion is *true* — bodies pass behind and in front of the table by
depth, not by paint order tricks.

What does not reach it yet, named plainly:

- **The code-drawn figures are flat folk against a photoreal film.** The
  visitor and inhabitants are the prototype's simple SVG family — charming,
  but a visible style gap next to the film and next to Solnik's rig. A
  cinematic cast wants drawn/lit figures of the rig's class.
- **The table panels read as a dark apron band** across the film's rich
  wooden table. The occlusion mechanism is honest; the finish is not
  cinematic. The panels want to be *the film's own table edge* (a depth
  treatment) rather than drawn slabs.
- **The separated parts overlap each other** at this panel size (Seat C's
  radial anchor data + host card size — visible in `frame.png`, cards 1/3
  and 4/6 crowd). The layout needs a collision pass or smaller cards.
- **Solnik reads large** beside the visitor — his data height and the rig's
  big-head proportions. As the room's host it is charming; a proportion
  pass belongs to a later seat, not a data hack here.
- **The floor band is a compromise**: one linear band (54→96) fitted to
  this film's perspective. Feet land convincingly at the depths used, but
  the film's true perspective is not linear — a depth-mapped floor (the
  architecture's 2.5-D direction) is the real answer.
- **Not exercised**: the film crossfade over minutes-long runs, thermal /
  decoded-memory behaviour, a real device at 375 px, the founder's own
  eyes on motion feel. Headless Chromium starves animation timers (the
  house's known cloud-browser motion law) — motion *feel* is explicitly
  not judged here.

## Not built / not claimed

No route in or out (this scene is a room, not a journey — the World
Engine's route graph carries it as data with no exits wired); no second
product summoned (the Keeper proves data-only swapping in the prototype,
not here); no live Solnik brain; no purchases (closed, and the parchment
renders zero buy controls); no deployment of any kind.

*Built 2026-11-25, Construction Seat D, FVR-31 Wave 2. Status ceiling:
BUILT — UNVERIFIED. The Relay's critic and blind-verifier seats have not
seen this build.*

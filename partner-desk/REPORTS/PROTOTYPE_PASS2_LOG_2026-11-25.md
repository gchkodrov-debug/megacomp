# PROTOTYPE JOURNEY — PASS 2 LOG · 2026-11-25

**Status of the whole build: BUILT — UNVERIFIED.** Pass 2 is built and
exercised by its builder; the relay seats grade it next, and the founder
judges last. Nothing here is deployed, live, or for sale. Built under
FVR-31 Direct Order 7 against the partners' acceptance list (ChatGPT's
challenge + build order of 22:25 CT, Gemini #123's depth-projected
hybrid, the captain's adopted convergence: *spatial world model first;
2.5-D compositing is the first renderer, never the architecture*).
Pass 1 is preserved untouched in `prototype-journey-pass1-backup/`
(md5-verified identical to the pre-build record, all four files).

Run it: serve `~/workspace/newwave`, open
`/next-build/living-universe/prototype-journey/`.

---

## 1 · WHAT WAS BUILT (the mechanisms, plainly)

**Spatial scene data (Requirement 1).** Every scene — Chamber, Gate,
Street, Library — carries a data model (`SPATIAL` in `journey.js`): a
walkable floor band (top/bottom as stage %), three depth-band anchors
with scale factors (far 0.55 · mid 0.82 · near 1.10, piecewise-lerped),
rest positions, exit points, object **anchors** with x-position, depth,
size and an **occlusion flag**, and population definitions. The renderer
reads only this data: a walker's on-stage height is
`stageHeight × baseFraction × scaleAt(depth)`, its feet sit at
`floorTop + depth × floorHeight`, and its z-index is
`20 + round(depth × 80)` — an anchor that occludes renders one step above
a walker at the same depth, so heroes pass **behind** a near lamp and
**in front of** a far shelf *because the data says so*. No stage
position in the build is hard-coded outside this model.

**Perspective (Requirement 2).** Depth tooling was checked first:
`depth_anything` — not installed · `torch` — not installed · no CLI
depth tool on this machine. Per the brief, nothing heavy was installed
and nothing was faked: the renderer is **layered planes** — each scene
gets code-drawn mid-distance and near-foreground silhouette planes in the
town palette (arches, rooftops, shelf rows, street lamps) over the
painted backdrop, with pointer-parallax on the backdrop layers and a
push-in settle (planes scale 1.02–1.10 over 2.4 s) when the visitor
enters a scene walking forward. This is the honest interim renderer
under the spatial model; a depth-projected renderer can replace it
per-environment later without touching the model.

**Locomotion (Requirement 3).** The cartoon rig was read in full before
a line was written. `solnik-toon.js` exports `toonSVG(view, uid)` and a
`Toon` class whose `render(state)` reads a real pose system — including
`loco.mode` (`idle/walk/run/…`) with a genuine procedural walk cycle
(hip/knee swing driven by `loco.phase`), gaze (pupils + head yaw/pitch),
blink (`face.eyeOpen`), mouths/visemes, gestures
(`wave/greet/point/cheer/…`) and a crystal glow. Pass 2 mounts that class
into the journey and drives it from the walk engine: while Solnik walks,
`loco.mode='walk'` and the phase advances with his stride; his pupils
and head track the visitor; he blinks on a 3.9 s cycle; his mouth runs
the rig's viseme cycle while a line is "spoken". If the rig ever failed
to load, a labelled fallback figure takes over and the console says so
(it did not trigger — see evidence). The visitor and the townsfolk are
original SVG figures whose legs are separate groups swung from the same
walk phase (±20°, counter-phased). Every figure — heroes, townsfolk,
Solnik — stands on the floor line with a soft contact shadow that scales
with depth.

**Population (Requirement 4).** Street: a smith standing at work by the
stall (drift + crystal-quiet idle), a clerk crossing the whole scene,
an elder strolling lamp-to-stall with pauses. Library: the Keeper's
clerk strolling shelf-to-desk, a reader standing at the shelf, a page
crossing with an armful of books. Chamber: one attendant by the
pedestal. Gate: none (a threshold, deliberately empty). All are simple
original figures from the same builder as the guest cast, animated in
real time from the spatial data. No video anywhere.

**Visitor control + router (Requirement 5).** Routes:
`#/chamber` · `#/gate` · `#/street` · `#/library` ·
`#/library/manifest/mint` · `#/library/manifest/keeper`. Travel works
forward **and** back (travel buttons, per-panel Back buttons, browser
Back/Forward), reload recovers the same scene and product, deep links
work, and a route reached without a chosen character redirects to the
Chamber with a plain hint. Inside a scene the visitor is free: **tap the
stage floor and the visitor walks there** (any depth in the floor band),
Solnik follows at an offset; click again mid-walk to change your mind.
Scene travel itself remains a motivated crossing — walk to the exit,
the portal film for the gate↔street threshold only (pass 1's behaviour,
kept), enter from the far edge, walk to rest.

**Manifestation — second product (Requirement 6).** **The Keeper** was
searched for and **found**: its live listing at
`~/workspace/newwave/live/listings/keeper.html` ("The Keeper — Extended
Audience"). Its definition uses that listing's facts **verbatim** — the
name, the lead ("A welcome with clear limits."), the six parts exactly
as listed (*Map the intended audience · Organise approved answers · Set
the voice and tone · Identify unanswered questions · Define privacy and
escalation boundaries · Document the proposed experience*), the part
descriptions lifted from the listing's own sentences, and its price
exactly as the listing states it: **$5 · scope confirmation required**,
with the listing's own terms (paid work is PROVADIA-only; checkout is
not connected; the request opens email and does not book, purchase or
trigger fulfilment). Its artifact is the listing's own first frame
(`keeper-frames/f001.webp`, served from the build mirror at
`../../keeper-work/mirror/listings/keeper-frames/f001.webp` — the live
`listings/` copy of that frame does not exist on this disk; the mirror
copy does, 60,428 B). The Keeper runs through the **same**
`openManifest()` code path as the Mint — one product-definition object
is the only difference. No placeholder data was needed; nothing was
invented. Purchasing stays **CLOSED** on both products, in the
parchment's own words.

**Mobile manifestation (Requirement 7).** Below 700 px the separation
becomes a **stage scrubber**: arrow buttons, a `n / N` counter, progress
dots, and touch swipe; exactly one part shows at a time, as a **bottom
parchment card**; the leader-line threads are not rendered. Desktop
keeps the golden threads. Resizing across the breakpoint re-renders the
current product in the correct mode without reopening it.

**World alive during interaction (Requirement 8).** Dust motes, lamp
glow, the push/parallax layers, the population and Solnik's idle life
run on independent loops that nothing gates — the manifestation is a
panel beside the stage, and the stage never freezes while it is open,
while a line shows, or while the visitor reads.

**Craft (Requirement 9, Ice Age reference).** Feet planted on the floor
line with contact shadows at every depth · foreground/mid/background
drawn in one palette so the planes cohere with the painted backdrop ·
on arrival in each scene Solnik plays a **greet** gesture and looks at
the visitor; when a product is summoned he **points** at it ·
transitions are motivated (you cross the gate by walking through it;
the portal film exists only on that threshold).

## 2 · VERIFICATION PERFORMED (builder-run evidence)

- `node --check journey.js` — **syntax OK**. (The other JS is the rig,
  imported unmodified.)
- HTTP smoke (server rooted at `~/workspace/newwave`): page, CSS, JS,
  all four scene stills, the portal film, the coin face, the Keeper
  frame and the rig module — **200**. The Reading Room film returns 404
  **by design** (Job 5 not yet landed; the pass-1 probe-and-fallback
  handles it — the only 404s observed in the whole exercise were those
  probes).
- **Headless exercise #1 (26 checks, ALL PASS)** — puppeteer, reduced
  motion emulated so travel is instant: boot lands in the Chamber with
  `solnikMode === 'rig'` (the Toon class really mounted) · street route
  + panel · street population = 3, anchors = 3 · anchor z-index equals
  the depth formula's prediction (lamp z=91) · click-walk depth scaling
  measured: far figure **151 px** tall → near figure **281 px** ·
  Mint manifestation: 8 parts, 8 leader lines, first part *The
  Conversation* · Keeper: 6 parts, first part verbatim, $5 on the
  parchment, purchasing closed · browser Back returns to the Mint,
  Forward to the Keeper · reload on `#/library/manifest/keeper`
  recovers scene + product · `#/library` closes the manifestation ·
  mobile viewport 375 px: scrub mode on, exactly one part card visible,
  counter `1 / 8`, leader lines hidden, scrub-next advances to part 2 ·
  zero page errors.
- **Headless exercise #2 (6 checks, ALL PASS)** — full motion, no
  emulation: chamber→gate travel arrives through the real walk · the
  rig's leg transform sampled mid-walk changes (−16.4° → 9.3°) — the
  walk cycle is genuinely driven, not posed · gate→street arrives via
  the portal path · population positions change between samples in real
  time · reverse travel library→street arrives · zero page errors.
- **Physical-device performance: NOT measured — OWED on the founder's
  device.** Headless checks prove code paths, never motion feel or
  frame rate (house law). Nothing about device performance is claimed.

## 3 · GRADES AGAINST THE ACCEPTANCE LIST

| Requirement | Grade | Basis |
|---|---|---|
| **Proof 1 — avatar genuinely inhabits** | **PARTIAL** | Real spatial inhabitation is proven: the visitor walks a data floor, scales by depth, passes behind/in front of props by data, is summoned by tap-to-walk and persists by name across reload. What keeps it partial: the cast figures are still simple stand-ins, and there is no collision — walkers travel straight lines (z-order keeps the picture honest, but a walker can cross a prop's silhouette at its own depth). |
| **Proof 2 — Solnik moves/interacts naturally alongside** | **PARTIAL** | The mechanism is proven with the town's own rig: real walk cycle (leg transforms sampled changing mid-walk), follow behaviour, gaze tracking, blink, greet/point attention beats, viseme mouth while speaking. "Naturally" is a feel judgment — it is owed to the founder's device session and is not claimed here. His lines remain scripted; no live brain is connected. |
| **Proof 3 — visitor controls the journey** | **PASS** (mechanism) | Free hash routing in both directions, Back/Forward, reload recovery, deep links, stop-anywhere floor walking with mid-walk retargeting — all exercised headlessly, zero errors. (Scene changes are still motivated crossings, by design; within-scene movement is fully free.) |
| **Proof 4 — any product summonable dynamically** | **PARTIAL** | The partners' test — a second product through the *unchanged* engine — is proven: Mint (8 stages) and Keeper (6 parts) render from data alone through one code path, Keeper facts verbatim from its live listing. Two products demonstrate interchangeability; "any of ~800" remains a pattern claim until a third, differently-shaped product (e.g. a film-bearing one) passes the same path. |
| **Proof 5 — world alive during conversations/interactions** | **PASS** (mechanism) | Population positions measurably change while manifestations are open; dust, glow, parallax and Solnik's idle life run on independent, ungated loops; nothing froze in either exercise. Feel/atmosphere grading remains the founder's. |
| **Spatial-data requirement** | **PASS** | One data model per scene; renderer reads it for placement, scale, feet-line and z-order; the z-formula prediction and the depth-scaling measurement both matched the data exactly. |
| **Mobile requirement** | **PASS** (headless viewport) | ≤700 px: scrubber + counter + dots + swipe, one parchment card at a time, no leader lines; desktop threads intact; live breakpoint switching. Physical-device confirmation still owed (with all device checks). |
| **Router requirement** | **PASS** | Every hash in the brief exercised, including Back, Forward and reload-on-deep-link; no page errors in either exercise. |

## 4 · DEFECTS AND HONEST LIMITS (known at build time)

- **D-1 (minor, found by the builder's own smoke test):** Solnik's
  dialogue box overlays the bottom-centre strip of the floor — on long
  lines it spans ~58% of stage width — and clicks there are dialogue,
  not floor. Walking to bottom-centre means clicking beside the box.
  Production fix candidates: click-through line except its text, or a
  slimmer line.
- **D-2 (minor):** No collision or pathfinding. Walkers take straight
  lines; depth z-order keeps occlusion truthful, but a figure can clip
  a prop's silhouette when crossing at the prop's own depth.
- **D-3 (minor):** "Cross" inhabitants reset at the stage edge
  (x 104 → −4). The reset happens offstage, but a figure at the very
  edge can pop.
- **D-4 (carried from pass 1, still open):** The Reading Room film
  (Job 5) had not landed when this was built; the film-upgrade path
  remains code-reviewed, not observed. The 404 probes in the logs are
  this, by design.
- **D-5 (minor):** Under reduced-motion emulation the Toon's idle
  breathe (a sine inside the rig itself) still moves subtly; pass 1
  froze all CSS bob for reduced motion. Sub-threshold, noted for the
  relay seats to judge.
- **D-6 (note):** Gate↔street keeps pass 1's ~5.2 s portal cut rather
  than the ET-120 trimmed window used on the live Mint door.
- **Renderer honesty:** layered planes, **not** depth-projected plates —
  no depth-estimation tool exists on this machine (checked:
  `depth_anything`, `torch`, CLIs — absent), and per the brief nothing
  was installed or faked. The spatial model is renderer-independent, so
  this is a renderer swap later, not a rebuild.
- **Not proven by this build:** device frame rate / thermal behaviour ·
  the feel of Solnik's walk · a third product shape · the Keeper frame's
  provenance beyond the house mirror copy (its live `listings/` twin is
  absent on this disk).

## 5 · FILES

| File | Bytes | Note |
|---|---|---|
| `prototype-journey/index.html` | 11,261 | Pass-2 stage: planes, anchors, population, actors, generic manifestation panel + scrubber |
| `prototype-journey/journey.js` | 46,384 | Spatial data · walk engine · rig driver · population · router · two-product manifestation |
| `prototype-journey/journey.css` | 12,839 | Layered z-stack · parchment-card mobile mode · scrubber |
| `prototype-journey/README.md` | 3,909 | Run instructions + mechanism table |
| `prototype-journey-pass1-backup/` | — | Pass 1, md5-identical to the pre-build record |

*End of log. The captain desk-files this; the relay seats grade next;
the founder judges last.*

# RELAY CRITIC — WAVE 1 ENGINES + GEOMETRY ADOPTION + SEAT D CINEMATIC LIBRARY

**Seat:** Relay critic (different eyes; built none of this) · **Date:** 2026-11-25
**Scope:** `construction/world-engine/` · `construction/avatar-system/` ·
`construction/manifestation-engine/` · `construction/cinematic-library/`
**Method:** every file read in full; every test suite re-run by the critic;
two findings proven by direct execution; both Seat D evidence frames examined
pixel-level; artifact paths verified on disk. No code changed.

## Suite results (critic's own re-run)

| Suite | Result |
|---|---|
| world-engine.test.cjs | 65/65 PASS |
| geometry.test.cjs | 62/62 PASS |
| avatar-system.test.cjs | 13/13 PASS |
| manifestation.test.cjs | 20/20 PASS |
| **Total** | **160 passed, 0 failed** |

The suites are green. Green is not the same as complete: three of the four
suites have assertion gaps exactly where the house laws bite (identity fences,
parchment content, teardown), detailed below.

## Verdict in one paragraph

The three Wave 1 engines are genuinely data-driven and their core laws mostly
hold under test. But the critic confirms **one identity-integrity bypass**,
**one data-integrity failure across both example-data files** (every product
artifact path and every scene backdrop path resolves to nothing), and **one
integration-level gap that re-opens D-2**: the only host that integrates the
engines walks its figures in straight lines through the furniture, because
nothing in Seat D consumes the geometry module Seat E adopted. Seat D's four
confessed visual defects are all confirmed from the frames — two of them are
worse than confessed. Nothing here earns a PASS; the fix list at the end is
what must clear before the blind verifier runs.

---

# FINDINGS — WORLD ENGINE (`world-engine.js`, `scenes.example.json`)

**W-1 · CONFIRMED — `scene.ambient` is dead data.** The schema documents
per-scene ambient overrides that "must stay coprime"
(`world-engine.js:132,146`), but `validateScene` never validates
`scene.ambient` and `createWorld` never consumes it (only `opts.clock` is
used). A scene can author non-coprime ambient durations and validation
passes silently. The clock-level coprime law itself is real and tested
(`validateClock` refuses non-coprime configs; tests at
`world-engine.test.cjs:97–104`) — the gap is only the documented
scene-level override, which does not exist as code. *Severity: low-medium —
a documented enforcement that isn't there.*

**W-2 · CONFIRMED — a "solid" anchor without `w` silently has no collider.**
`validateScene` does not require `w` (or `h`) on anchors, and
`obstaclesFromScene` uses `a.w || 0`. A solid/occluding anchor authored
without `w` passes validation and becomes a zero-width rect that
`pointInside`/`segmentCrosses` can never hit — collision silently absent,
no error anywhere. This gives blind-spot wiring requirement ③ (pair every
walker with route()/resolvePoint()) **additional teeth the blind-spots
check missed**: even a correctly wired renderer can be silently disarmed by
scene data the validator accepted. *Severity: medium — silent failure of a
safety mechanism.*

**W-3 · CONFIRMED — `bindHash()` leaks listeners on rebind.**
`bindHash` adds a `hashchange` listener per call with no double-bind
guard; `unbindHash` removes only via the last bound window. A second bind
(to the same or a different window) orphans the first listener.
Blind-spots requirement ⑥ named the care point; the code does not defend
against it. *Severity: low.*

**W-4 · NEEDS-CHECK — `step()` rebuilds the full view model every frame.**
Each clock tick calls `currentView()` → `buildSceneView`, allocating fresh
arrays/objects per frame for every renderer. Fine at specimen scale;
unmeasured against the PIS-01 frame-time budget with a real renderer
consuming it. *Severity: low until measured on device.*

**W-5 · CONFIRMED — exported math throws raw TypeError on unvalidated
scenes.** `buildSceneView`/`feetY` on a scene with no `floor` throw a raw
TypeError instead of a validation error. `createWorld` validates first, so
only direct export use is exposed. *Severity: low.*

**W-6 · CONFIRMED — `scenes.example.json` backdrop paths resolve from no
root.** The chamber/street stills are authored as `../../town-art/…`
relative to `construction/world-engine/` → `living-universe/town-art/…` —
**that directory does not exist** (the town art lives at
`next-build/town-art/`). The library film `../assets/record-reading-room_take1.mp4`
resolves to `construction/assets/…` — also nonexistent; it exists only
relative to `living-universe/`. The five references are authored against
inconsistent roots; a renderer resolving them from the data file's own
location gets five broken images. Same disease as M-1 below.
*Severity: medium — the example world ships with a dead backdrop set.*

**W-7 · CONFIRMED TRUE (positive) — world-as-data holds.** Five distinct
places (chamber, gate, street, library, manifestation) are authored in one
schema with floors, bands, anchors, population and routes as pure data. A
second place **can** be authored from data alone at this layer. Route BFS
records reverse edges flagged `reverse: true`; the master clock clamps dt
to 50 ms (`world-engine.js:409`); coupled layers share one phase
(test-asserted identically zero difference).

---

# FINDINGS — GEOMETRY (`geometry.js`)

**G-1 · CONFIRMED (gap) — the projection disagreement is pinned for scale,
not for height.** The geometry suite asserts projection scale vs `scaleAt`
differ >0.03 at depth 0.5 — the named disagreement is real and pinned. But
no test pins projection-y vs `feetY` (at z 0.5 the projection's t ≈ 0.373
vs the engine's linear 0.5). A future consumer mixing projection-y with
feetY would inherit an unpinned ~0.13 floor-band discrepancy.
*Severity: low.*

**G-2 · NEEDS-CHECK — `zWeight ≠ 1` is entirely untested.** No test in
either suite exercises `zWeight ≠ 1`; in `resolvePoint`'s circle branch
the push direction is unweighted while the distance is weighted, so the
resolved point may not land at exactly the wanted distance. `unproject`
is tested only at parallax 1 (its documented domain). *Severity: low.*

**G-3 · CONFIRMED (documented behaviour, consumer duty) — `route()`
returns waypoints excluding the resolved start.** A follower whose start
was inside an obstacle still begins inside it; consumers must resolve
their own position first. Documented in the module; recorded here because
Seat D (D-1) is exactly the consumer that didn't. *Severity: informational.*

**G-4 · REJECTED as a defect (kept on record) — `segmentCrossesObstacle`'s
circle branch is epsilon-conservative** (closest-point distance
< r²−1e-12 counts a graze as a crossing). This fails in the safe
direction for a collision system. Not a defect; noted so the verifier
does not re-raise it.

**G-5 · CONFIRMED (gap) — `solid: true` with `occludes: false` is
untested.** The combination is expressible in scene data (a collider you
can see through / walk behind visually) and no test covers what
`obstaclesFromScene` + `zOf` do with it together. *Severity: low.*

Strengths confirmed: projection + exact inverse (round-trip <1e-7 over
70 points × 2 camera offsets, test-asserted); `projectInScene` returns
both systems **labelled** side by side; `doorStandPoint` reproduces the
specimen's authored points exactly; sealed target returns null; the
furnished-grid property check (every pair reachable, 0 crossings) passes.

---

# FINDINGS — AVATAR SYSTEM (`avatars.js`, `companion.js`)

**A-1 · CONFIRMED BY EXECUTION — ⭐ identity restore bypasses the
transition fences.** The live path is correctly fenced
(`grantCitizenship()` from guest returns `false`; guests cannot wear
registry avatars). The **restore path is not**. The critic ran it:

```
createIdentity({state:'citizen', avatarId:'elder'}).serialize()
  → {"state":"citizen","displayName":null,"avatarId":"elder"}
createIdentity({state:'named', avatarId:'smith'}).serialize()
  → {"state":"named","displayName":null,"avatarId":"smith"}
createIdentity({state:'guest', displayName:'X', avatarId:'elder'}).serialize()
  → {"state":"guest","displayName":null,"avatarId":"guest"}   ← correctly re-fenced
```

`avatars.js:231–236` accepts a saved `state` wholesale and only re-fences
the guest case. Result: a citizen who was never named and never granted,
wearing a registry avatar; a "named" identity with no name. This is the
module's own identity-integrity law, broken through the persistence door.
Bounded today (local state only, no accounts, no network) — but the
module is the identity layer the world will persist with, and the fence
must hold at restore, not only at transition. *Severity: HIGH for the
module's law.*

**A-2 · CONFIRMED (gap) — the test suite does not test A-1's cases.** The
suite covers guest-restore re-fencing (the one path that works) and the
live transition fences. Named-restore-without-name and citizen-restore
are untested — the assertion gap is exactly over the broken cases.
*Severity: medium (it is why A-1 shipped green).*

**A-3 · CONFIRMED — the z-law has two sources of truth.** `avatars.js`
re-implements `scaleAt`/`feetYAt`/`zOf` instead of importing them from
`world-engine.js`. Values are identical today (20 + round(d×80), same
default bands), but the walker takes bands via opts while the engine
takes them from the scene — nothing enforces that a host passes the
*same* bands to both. If scene bands become per-scene data, the two
implementations can diverge silently and figures will layer against
anchors computed by the other copy. *Severity: medium — divergence risk
at the exact seam Seat D wires.*

**A-4 · NEEDS-CHECK — walker scale clamps differ at the edges.**
`avatars.js`'s scaleAt clamps d to [0,1] hardcoded and can extrapolate
below the first band with unvalidated band data; the engine's clamps to
the band range first. Only reachable with unvalidated bands.
*Severity: low.*

**A-5 · CONFIRMED (minor) — companion mutates `walker.speedScale`
directly** (catch-up gait). A host that also writes that field will fight
the companion. Documented nowhere. *Severity: low.*

Strengths confirmed: registry is pure data (guest + 5, fully described,
test-asserted); walk phase advances only while moving (test-asserted,
frozen after arrival); reduced motion places instantly with phase
untouched; companion follow band [6,11], catch-up engage/release, gaze
clamping, blink cycle and viseme timing all test-asserted.

---

# FINDINGS — MANIFESTATION ENGINE (`manifestation.js`, `products.example.json`)

**M-1 · CONFIRMED — ⭐ all three product artifact paths are broken.**
Verified on disk by the critic:

| Product | Authored src | Resolves to | On disk? |
|---|---|---|---|
| Mint | `../../../build/coin-front.webp` | `living-universe/build/coin-front.webp` | **No** — canonical coin is `newwave/build/coin-front.webp` (316,990 B, md5 `981b1c6136101f00ec7c7bd060ae7a4f`) |
| Keeper | `../../keeper-work/mirror/listings/keeper-frames/f001.webp` | `living-universe/keeper-work/…` | **No** — keeper-work lives under `next-build/`, not `living-universe/` |
| Star Compass | `fictional/star-compass.svg` | — | **No** — exists nowhere (fictional by design, still a broken image in any real render) |

`validateProduct` checks only that `src` is a non-empty string, so the
engine cannot detect its own dead references. Seat D worked around
exactly one of the three (the Mint, via a local byte-identical copy —
md5 verified by the critic). Any other host rendering from this JSON
gets three broken images. The Keeper's *text* is true verbatim from
`live/listings/keeper.html`; its picture is a dead path.
*Severity: HIGH for data integrity — the engine's example data cannot be
rendered as shipped.*

**M-2 · CONFIRMED — README and code disagree about REASSEMBLING.** The
README states "parts hide the moment it begins (the pass-2 F-1 law)" and
the render() comment states the same law — but the code keeps parts
**visible** during REASSEMBLING (`partsVisible` includes REASSEMBLING)
and hides them only at WHOLE. The visible glide-back is arguably the
better choreography, and the F-1 endpoint (zero visible at WHOLE) holds
and is exercised — but the stated law and the behaviour differ, and no
test asserts either behaviour *during* REASSEMBLING. One of the three
(README, comment, code) must be corrected and the chosen behaviour
pinned by a test. *Severity: medium — documentation integrity at a
house-law seam.*

**M-3 · CONFIRMED (gap) — parchment content is under-asserted.** Tests
exercise parchment open/close routing (from SEPARATED and WHOLE), the
hidden toggling, the closed word, and zero buy nodes. **No test asserts
the rendered price rows or terms text appear in the tree** — the
parchment could render "$NaN" or empty terms and the suite stays green.
*Severity: low-medium.*

**M-4 · CONFIRMED — `validateProduct` accepts NaN/negative prices**
(`typeof NaN === 'number'`), which would render as "$NaN" on the
parchment. Edge case, real hole. *Severity: low.*

**M-5 · CONFIRMED (minor) — an 'open' product with no `onBuyRequest`
renders a buy button that does nothing when clicked.** The engine's one
selling surface can be a dead control. *Severity: low.*

**M-6 · CONFIRMED (gap) — `destroy()` is never tested and never called**
by any host (see D-3). The teardown contract (listener removal, root
removal, pending-timer cancellation via destroy) has zero coverage.
*Severity: medium — teardown is a blind-spot requirement (⑥).*

**M-7 · CONFIRMED TRUE (positive) — purchasing-closed rendering holds.**
For all three closed products the tests assert **zero buy nodes** plus
the rendered words "Purchasing is closed."; an 'open' fixture renders
exactly one buy control. The state machine refuses every illegal jump
(test-asserted per state); timed completions are sequence-token guarded
(fold cancels a pending unroll — test-asserted); reduced motion schedules
at 0 ms vs 1500/650 ms (both test-asserted). World-as-data holds here
too: a second (and third) product is pure data through one unchanged
engine — the Mint/Keeper interchangeability proof ChatGPT required.

**M-8 · NEEDS-CHECK (cosmetic) — Mint's parchment duplicates its
prices** (price rows plus a priceNote repeating $245/$196). Harmless,
visible. *Severity: low.*

---

# FINDINGS — SEAT D CINEMATIC LIBRARY (host, CSS, exercise, frames)

## The unconfessed defects

**D-1 · CONFIRMED — ⭐ the host's walkers are not paired with geometry
routing; D-2 is open at integration level.** `cinematic-library.js`
imports the world-engine core, avatars, companion and manifestation —
**it never imports `geometry.js`**. The visitor walks by
`visitor.setTarget(x, d)` in a straight line from click to target. Click
the far side of the central table and the visitor walks *through* both
table panels (depth-z hides and reveals him as he crosses, but his path
crosses the furniture volume). Seat E closed D-2 at the model level
(62/62); the blind-spots check graded S2 "ABSENT at model level." Both
true — and the only integrated renderer still has no collision or
routing at all. The exercise never catches it because its one floor
click was deliberately placed "clear of the table." Blind-spot wiring
requirement ③ therefore has teeth the check itself did not state: it
must be graded at the **host**, not only at the model. *Severity: HIGH
for any claim that D-2 is closed.*

**D-2 · CONFIRMED — touch discipline is absent from the host.**
`grep` across the host's CSS/JS/HTML: **no `touch-action`, no
`overscroll-behavior`, anywhere.** Blind-spot requirement ① binds the
renderer to ship touch discipline (touch-action: none on stage,
overscroll-behavior: none on shell, tap on pointerdown). Seat D is the
first real renderer and does not implement it: the stage sits in normal
page flow, so a vertical drag beginning on the stage scrolls the page /
can pull-to-refresh on a phone. Impact is lower than the prototype's
(no drag interaction exists — tap-to-walk only), but the requirement is
unmet in the build it was written for. *Severity: medium.*

**D-3 · NEEDS-CHECK — the 700px breakpoint rebuild drops the old
manifestation controller without `destroy()`.** `openManifestation()`
rebuild path: `$('mf-mount').innerHTML = ''`, `mf = null`, rebuild. The
old controller's `destroy()` is never called anywhere in the host
(grep-confirmed). The practical leak is **probably nil today**: rebuild
is gated on state FOLDED, where no timed completion can be pending, and
the old listeners live on DOM nodes removed by the innerHTML clear. But
"probably nil by construction accident" is not teardown hygiene — the
engine ships a destroy() contract (M-6) and no host or test exercises
it. If the FOLDED gate is ever relaxed, this leaks timers and state.
*Severity: medium as an unproven contract, low as a live leak.*

**D-4 · CONFIRMED — "No corrective seeks, ever" is falsified by the
host's own fallback.** The README carries the ET-120 law as "No
corrective seeks, ever (the engine's law, carried in)" and the header
comment repeats it. `armSwap`'s standby-not-ready path does
`cur.currentTime = 0` — a seek. It is the *counted hard cut* (the
designed NC-07 exception, never fired in the exercise: 0 hard cuts),
not a drift correction — but the absolute wording is wrong, and a
verifier reading the code against the README will find the contradiction
exactly as the critic did. Correct the wording to name the exception.
*Severity: low — documentation integrity.*

**D-5 · CONFIRMED (gap) — the exercise never measures mobile overflow.**
Run #1's PARTIAL was a 375px modal overflow. Seat D's exercise checks
the 375px scrubber's presence and stepping ("1 / 8" → "2 / 8") but never
measures `scrollWidth` vs `clientWidth` on the overlay/panel — the exact
defect class that already bit once is unmeasured in the successor build.
*Severity: low-medium.*

**D-6 · CONFIRMED (minor, a11y) — a focusable control lives inside an
aria-hidden subtree.** `#anchors` carries `aria-hidden="true"`; the
scroll anchor inside it is `role="button" tabindex="0"`. Screen readers
are told to ignore the subtree that contains a keyboard-focusable
control. *Severity: low.*

**D-7 · CONFIRMED (minor) — under reduced motion the crossing scribe is
invisible.** `updatePopulation` skips all walker updates when reduced;
the cross-mode scribe was placed at x=-14 (offstage) at build and never
moves — a reduced-motion visitor loses that inhabitant entirely rather
than seeing him placed in the room. *Severity: low.*

## Seat D's confessed defects — graded from the frames

**D-8 · CONFIRMED — flat figures.** `frame-room.png`: the visitor,
elder and scribe are flat paper-doll SVGs against the photoreal film.
As confessed. The style gap is total, not partial.

**D-9 · CONFIRMED + EXTENDED — the table apron.** The two table panels
render as a dark horizontal band across the film's own table — and the
film's table continues visibly *below* the band, producing a
double-table read. Worse than "a dark apron": the eye reads two tables
stacked. The occlusion mechanism is honest; the composite is not.

**D-10 · CONFIRMED + EXTENDED — radial card overlap clips product
text.** `frame.png`: not mere crowding. Card 3 covers card 1's closing
line; card 4 covers card 2's ("A no is the service working…" is cut
mid-sentence); card 5 covers card 7's top; card 8 covers card 6's
closing words. **At least 4 of 8 cards have body text physically hidden
behind a neighbour** at desktop panel size. The parts' text is the
product's honest content — in the separated state, the engine's
centrepiece, it is not fully readable. The cause is in the open: fixed
188px cards on percentage anchors with no collision pass (Seat C's
anchor data × Seat D's card size). *Severity: HIGH for the
manifestation's purpose — separation exists so every part can be read.*

**D-11 · CONFIRMED + EXTENDED — Solnik's scale and light.** In
`frame-room.png` Solnik stands at d 0.68 — *farther* than the visitor
(d 0.72–0.80) — yet reads dramatically larger; his head alone spans
roughly a quarter of the stage width beside the visitor's whole body.
The depth cue (farther = smaller) reads inverted in the composed frame.
Light fusion is also not achieved: he is the brightest object in the
room, glowing gold against its shadowed warmth — the sepia tint on the
rig is negligible. He reads as pasted onto the film's light, not lit by
it. (Motion feel not judged — cloud-browser motion law; the founder's
device session remains the gate.)

**D-12 · CONFIRMED (unconfessed) — the silhouette planes read as black
slabs.** In `frame-room.png`: a solid black block floats mid-left over
the shelves (mid plane), a black chunk sits bottom-left over the film's
floor and chairs (near plane's foot blocks), and 3.2%-wide black
pillars letterbox both stage edges. Authored as perspective silhouettes;
in the composed frame they read as rendering artifacts. Not confessed
in Seat D's honest read. *Severity: medium for the cinematic claim.*

## What Seat D got right (confirmed, not confessed-away)

- **The `[hidden]` stylesheet law is carried**: `[hidden] { display:
  none !important; }` is the first rule of `cinematic-library.css`, and
  the overlay's `display:flex` correctly loses to it.
- **The stacking-context fix is real**: `#anchors`/`#population` carry
  no z-index (CSS comment names the defect); engine z reaches the stage.
- **Walkers are driven by the engine's clamped clock dt** (blind-spot
  requirement ② satisfied at this host — `frame.dt`, never raw rAF).
- **Scripted-lines labelling is honest IN THE UI** — see R-1 below.
- The exercise is a real exercise: it drives the breakpoint rebuild,
  checks visibility by `offsetParent` (the F-1 lesson learned), and its
  reported results match what the critic found in code.

---

# REJECTED FINDINGS (kept on record, per Relay Law)

**R-1 · REJECTED — "scripted Solnik lines could be mistaken for live
brain output."** Checked in the UI itself, not only the README: the page
footer states in plain text "his lines here are scripted, his live brain
is not connected," the top banner marks the page a construction
specimen, and the code header repeats it. A visitor is not deceived.
*Residual note (not a defect): the label sits in the footer, not beside
the dialogue box; if this pattern graduates to a live door, the label
should travel with the dialogue.*

**R-2 · REJECTED — geometry's epsilon-conservative circle crossing**
(see G-4). Safe-direction behaviour, not a defect.

**R-3 · REJECTED — "Seat D's local coin copy is a fork of the
artifact."** `coin-front.webp` in the cinematic-library folder is
byte-identical to the canonical `newwave/build/coin-front.webp`
(md5 `981b1c6136101f00ec7c7bd060ae7a4f`, critic-verified). The defect is
in the *source data's path* (M-1), not in Seat D's copy.

---

# BLIND-SPOTS REPORT — ADDITIONAL TEETH FOUND INSIDE THESE BUILDS

The blind-spots check graded the engines at model level. Inside the
builds, its seven wiring requirements gain four extra teeth:

1. **Req ③ (collision pairing) fails at the only host** (D-1) — the
   requirement must be graded where walkers are driven, not where the
   solver lives.
2. **Req ③ can be silently disarmed by data** (W-2) — a solid anchor
   without `w` validates and collides with nothing.
3. **Req ① (touch discipline) is unimplemented in the first renderer**
   (D-2) — the check verified the *prototype's* gap; the successor host
   repeats the omission in milder form.
4. **Req ⑥ (teardown pairing) has no exercising host at all** (D-3/M-6)
   — `destroy()` and the FOLDED-gated rebuild are the unproven seam.

Req ② (clamped clock) is genuinely satisfied by Seat D. Req ④ (DPR cap)
is not applicable to the DOM/SVG hosts; the one canvas (dust motes)
sizes at CSS pixels — a quality choice the verifier should note, not a
violation. Req ⑤ (reduced motion end-to-end) holds in all four builds
with one exception: D-7's invisible scribe. Req ⑦ (860px stage floor at
375px) remains a design-eye item for the device session.

---

# TEST-SUITE HONESTY — SUMMARY

160/160 green on the critic's re-run, and most README claims are truly
backed (state machine, purchasing-closed, coprime clock, follow band,
projection round-trip, route property check). The gaps, all confirmed:

| Gap | Where |
|---|---|
| Named/citizen restore fences untested — and broken (A-1/A-2) | avatar-system |
| Parchment price/terms render unasserted (M-3) | manifestation |
| REASSEMBLING part-visibility unasserted either way (M-2) | manifestation |
| `destroy()` untested (M-6) | manifestation |
| `zWeight ≠ 1` untested; projection-y vs feetY unpinned (G-1/G-2) | geometry |
| `solid`+`occludes:false` combo untested (G-5) | geometry |
| Scene-level ambient validation absent, hence untested (W-1) | world-engine |
| Mobile overflow unmeasured in the successor exercise (D-5) | cinematic-library |

---

# WHAT MUST BE FIXED BEFORE THE BLIND VERIFIER RUNS (priority order)

1. **A-1 — fence identity restore.** `createIdentity` must re-derive
   state from evidence: citizen requires a name on the record (and the
   grant path), named requires a name; otherwise demote to the highest
   state the record proves. Add the two failing restore cases as tests.
2. **M-1 + W-6 — make the shipped data resolve.** Fix all three
   artifact paths in `products.example.json` and all backdrop paths in
   `scenes.example.json` to paths that exist from a stated root (or
   state the root in the data). Add a test that resolves every src in
   both files against the filesystem. Data that cannot render is not
   example data.
3. **D-1 — wire geometry into the host, or re-scope the claim.** Either
   Seat D's locomotion consumes `route()`/`resolvePoint()` (with an
   exercise click *through* the table's line, not clear of it), or
   every "D-2 closed" statement is qualified "model level only" wherever
   it stands. The verifier must not be handed an integration claim the
   integration doesn't make.
4. **W-2 — validator: solid/occluding anchors require `w > 0` and
   `h > 0`.** Silent no-collider data must fail validation.
5. **D-10 — the separated parts must be readable.** Collision pass,
   smaller cards, or a larger parts stage — any fix, then re-shoot the
   frame. Until no card's text is hidden behind another, the
   manifestation's centrepiece fails its own purpose. (Visual-grade:
   blocks any "cinematic" claim, and the fix must land before the
   verifier grades the manifestation's function.)
6. **D-2 — touch discipline in the host stylesheet** (`touch-action:
   none` on the stage, `overscroll-behavior: none` on the shell).
7. **M-2 — reconcile README/comment/code on REASSEMBLING visibility**
   and pin the chosen behaviour with a test.
8. **D-3 + M-6 — call `destroy()` on the breakpoint rebuild** (or prove
   teardown unnecessary and delete the claim), and add a destroy() test
   to the manifestation suite.
9. **W-1 — validate `scene.ambient` or remove it from the schema.**
   Documented enforcement must exist or not be documented.
10. **D-4 — correct "no corrective seeks, ever"** to name the counted
    hard-cut exception.
11. **Test-gap sweep** (M-3 parchment content · G-1 projection-y pin ·
    G-2 zWeight · G-5 solid/occludes combo · D-5 mobile-overflow
    measurement in the exercise).
12. **Carried as known visual defects** (Zero Known-Defect — they block
    any cinematic-quality PASS, not the mechanism verification):
    D-8 flat figures · D-9 double-table apron · D-11 Solnik scale/light
    fusion · D-12 black-slab planes · D-7 reduced-motion scribe.

**Status ceiling after this critic: BUILT — UNVERIFIED stands for all
four builds.** The blind verifier runs only after items 1–4 and 6–10
are fixed and re-tested; item 5's fix must be re-shot in a frame; item
12 rides as named defects. Motion feel, device performance and the
founder's eye remain the open gates no seat in this relay can close.

*Relay critic, 2026-11-25. No code changed. No desk filing (the captain
files).*

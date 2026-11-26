# WAVE 1 — FIX PASS LOG (Relay Critic's 12-Item List)

**Seat:** Fix seat, Wave 1 (Seats A/B/C/D) · **Date:** 2026-11-26
**Work order:** `WAVE1_SEATD_CRITIC_2026-11-25.md` — the 12-item fix list before the blind verifier.
**Scope honoured:** all changes inside `living-universe/construction/` (+ this log). No desk filing.
**Status ceiling: FIXED — PENDING BLIND VERIFICATION.** The Wave-1 blind verifier runs after this pass; nothing here claims verification.

## Suite totals — before → after (all re-run at the end, zero page errors everywhere)

| Suite | Before | After |
|---|---|---|
| world-engine.test.cjs | 65 | **81 passed, 0 failed** |
| geometry.test.cjs | 62 | **75 passed, 0 failed** |
| avatar-system.test.cjs | 13 | **17 passed, 0 failed** |
| manifestation.test.cjs | 20 | **24 passed, 0 failed** |
| wiring/exercise.cjs | 18/18 | **18/18 checks passed** |
| cinematic-library/exercise.cjs | report-only, all fields nominal | **all fix-pass assertions green** (see items ③⑤⑥⑪) |

`node --check` clean on every modified `.js`. Baseline was re-established before any edit (65/62/13/20/18 + Seat D nominal), so every delta below is this pass's own.

---

## ① A-1/A-2 — identity restore fenced · FIXED

**Change** (`avatar-system/avatars.js`, `createIdentity`): restore no longer accepts `saved.state` wholesale. The standing is **re-derived from the record's evidence, through the same gates as the live path**:

- `named` requires a name on the record (the `assignName` evidence);
- `citizen` requires a name **and** `granted === true` on the record — `grantCitizenship()` now leaves that evidence in `serialize()` (`granted: this._granted`), and a proven citizen restore carries it forward so re-serializing keeps the standing;
- a record claiming more than it proves is **demoted** to the highest state its evidence supports (citizen-without-grant + name → named; anything without a name → guest, with the guest fences applied: no name, guest silhouette).

**Tests added** (avatar suite 13 → 17): the critic's two executed proofs, now as assertions — `createIdentity({state:'citizen', avatarId:'elder'})` yields a guest (`serialize()` = `{state:'guest', displayName:null, avatarId:'guest', granted:false}`) and `createIdentity({state:'named', avatarId:'smith'})` yields a guest — plus citizen-with-name-but-no-grant demoting to named (and the live grant still working from there), and a genuine citizen record round-tripping **twice**. The pre-existing guest-restore and live-transition tests pass unchanged. README's Identity section now states the restore gates.

## ② M-1 + W-6 — every data path resolves, with a rot alarm · FIXED

**Stated root:** each data file's paths are relative to **that file's own directory** — stated in both READMEs (world-engine + manifestation-engine file tables).

**Corrections** (all verified on disk after the change — 10/10 references resolve):

| File | Was | Now | Lands on |
|---|---|---|---|
| products.example.json (Mint) | `../../../build/coin-front.webp` | `../../../../build/coin-front.webp` | `newwave/build/coin-front.webp` (316,990 B, md5 `981b1c6…`) |
| products.example.json (Keeper) | `../../keeper-work/…/f001.webp` | `../../../keeper-work/mirror/listings/keeper-frames/f001.webp` | `next-build/keeper-work/…` (60,428 B) |
| products.example.json (Star Compass) | `fictional/star-compass.svg` (existed nowhere) | path kept; **the file now exists** — a real brass-compass SVG authored at `manifestation-engine/fictional/star-compass.svg` | resolves |
| scenes.example.json (4 stills) | `../../town-art/…` | `../../../town-art/…` | `next-build/town-art/…` (all four on disk) |
| scenes.example.json (film ×2) | `../assets/record-reading-room_take1.mp4` | `../../assets/record-reading-room_take1.mp4` | `living-universe/assets/…` (4,468,587 B) |

**Rot alarms added:** world-engine.test.cjs resolves every `backdrop.still/film` in scenes.example.json against the filesystem (7 checks); manifestation.test.cjs resolves every `artifact.src` in products.example.json (1 test, 3 products). If a path rots again, the suites go red. (Seat D's host-side override of the Mint's artifact to its local byte-identical `coin-front.webp` is unchanged — a browser resolves relative to the page, not the data file; the README already says so.)

## ③ D-1 — Seat D host locomotion routed · FIXED (with one exercise-found defect, cured at the host)

**Decision:** wire it — Seat F's stage does **not** make this host redundant. Seat F's stage is a canvas specimen proving the wiring pattern on code-drawn figures; it renders no film, no Toon rig, no manifestation. Seat D's host is the cinematic integration, and it was the host that walked through the table. So the host now consumes the wiring layer exactly as Seat F's stage does.

**Change** (`cinematic-library.js`): imports `obstaclesFromScene`/`scenePointToWorld` from geometry.js and `createLocomotion` from `../wiring/locomotion.js`; the stage tap now calls the locomotion (resolve → route → waypoint queue) instead of `visitor.setTarget(...)`; the frame loop advances `loco.update(frame.dt)` — fed only the master clock's dt (blind-spot rule ②) — instead of `visitor.update(...)`; the scroll-arrival announcement moved to `loco.onArrive` (the walker settles at every waypoint; the locomotion arrives once per route). Solnik (companion-driven) and the inhabitants keep their drivers — the scribe's crossing at d 0.68 runs between the panels by the scene's design, as in Seat F's model where only the visitor is routed.

**Modelling note (stated, not smuggled):** the table's two anchors are occlusion *edges* (depths 0.50 / 0.78), so their collision footprints are thin bands — `obstaclesFromScene(scene, { depthThickness: 0.06 })` → z [0.47, 0.53] and [0.75, 0.81]. The floor between the panels is the "at the table" space where the scene's own rest data puts the heroes (visitor d 0.72, Solnik d 0.68 — both outside both bands). The shelf and lamp-stand derive normally.

**Exercise proof (new leg 3b):** after leg 1, a click at (52%, d 0.30) — the straight segment provably crosses both panels (`straightLineCrossesTable: true`). Result: route around the table's east end, **35–36 samples, 0 inside either panel footprint, arrival error 0.019–0.022** (target (0.04, 0.30), arrived (0.039, 0.298)-equivalent). Leg 1's click also routes now (3 waypoints; its target fell inside the near panel's band and was resolved out to its face — routing + resolution both visible in the numbers).

**Exercise-found defect — the corner pocket, cured at the host, reported for the wiring layer:** leg 1's arrival lands the visitor at (0.474, 0.850), legally placed (≥ body-radius clear of the panel in the weighted metric: 0.055 ≥ 0.042) but **graph-isolated** — every visibility edge from that spot grazes the panel's padded corner, so `route()` returns `null` and the tap would die silently (reproduced in Node against geometry.js directly: `pocket -> far: null`; all four corner-node hops BLOCKED; stepping 0.02 further south connects). **Cure (host):** `goToScenePoint()` — on a null route, step out to roomier floor (a direct drive to the body's position resolved at radius 0.09), then route from there on arrival (`pendingTarget` discharged in `loco.onArrive`); if even that cannot route, fall back to a direct drive, whose per-frame resolve slides along faces and whose progress backstop settles the body where it stands. Never through the furniture, never a dead tap. Node-verified before implementation: escape point (0.489, 0.895) → full route to the far side exists; the exercise's live route matches the prediction (via (0.513, 0.863) → (0.513, 0.698) → (0.473, 0.418) → target). **Recommendation to the wiring seat:** Seat F's stage shares this latent case (same locomotion + geometry, starts tested only from open floor) — the escape pattern, or a start/target connectivity step inside `route()`, belongs in the shared layer's next pass. geometry.js was **not** modified by this pass.

## ④ W-2 — solid anchors require w/h > 0 · FIXED

**Change** (`world-engine.js`, `validateScene`): an anchor that is solid by the geometry layer's own definition (`solid === true`, or `occludes === true` without `solid: false`) must carry numeric `w > 0` **and** `h > 0`, else a validation error names the missing dimension. The §2 schema text and `SCENE_SCHEMA` note now say so. All anchors in scenes.example.json and LIBRARY_SCENE already carry w/h — both worlds still validate clean.

**Tests added** (world suite): occluding anchor without w → caught; with `w: 0` → caught; `solid: true` without h → caught; non-solid anchor without w/h → valid; `solid: false` opt-out → valid.

## ⑤ D-10 — separated parts readable; frame re-shot · FIXED

**Cause (critic's, confirmed in the old frame):** fixed 188px cards on percentage anchors, no collision pass — ≥4 of 8 cards with body text hidden behind neighbours (I read the old `frame.png`: cards 1/3, 3/5, 2/4, 4/6 all clipped mid-sentence).

**Fix (host-side, where presentation lives):**
- CSS (`cinematic-library.css`): cards 196px at 12.5px/1.45; parts stage taller (`.mf-root` min-height 470 → 514px; `.mf-parts` inset 44/64 → 40/10 — in SEPARATED the controls row is the only in-flow element, at the top; nothing flows beneath the parts).
- **De-overlap pass** (`declutterParts()` in `cinematic-library.js`): on SEPARATED (desktop only), before `drawThreads()` in the same frame — and again on resize — each column's cards are measured and re-stacked by their real heights with an even share of the slack, all inside the parts area. The engine's data anchors are untouched; the threads are drawn after, so they land on the cards' real positions.

**Evidence:** exercise measures the real rects in SEPARATED — **worst pairwise overlap 0 px², `outsidePanel: []`**. `frame.png` re-shot by the exercise and read by this seat: all eight cards fully readable — the previously cut lines ("…why it should exist, who it is for", "A no is the service working", "— not a purchase", "We never hold keys or funds") are complete. Seat D's README confession bullet is updated to record the fix; the neighbouring bullets (D-8/D-9/D-11 family) stand as carried defects — see item ⑫.

## ⑥ D-2 (critic) — touch discipline in the Seat D host · FIXED

**Change** (`cinematic-library.css`, mirroring wiring.css rule ①): `.stage { touch-action: none }` and `html, body { overscroll-behavior: none }`. The host's tap still rides the stage `click` listener (Seat F's stage is the pointerdown implementation; this item, as the critic scoped it, is the stylesheet discipline that stops the page scrolling/zooming around the 68svh-equivalent stage).

**Evidence:** the exercise now reads the computed styles — `stageTouchAction: "none"`, `bodyOverscroll: "none"`, `htmlOverscroll: "none"`.

## ⑦ M-2 — REASSEMBLING doc/code reconciled · FIXED

**Decision: the code is right; the words were wrong.** The visible glide home is the better choreography, and the F-1 endpoint (zero part cards visible at WHOLE) holds and was already tested. The render() comment in `manifestation.js` and the README's REASSEMBLING bullet now state the true law: parts are hidden until SEPARATED, stay **visible through REASSEMBLING**, and hide when WHOLE is reached. Both texts name the correction.

**Pin added:** the visibility test now asserts, between `reassemble()` and the scheduler flush, that state is REASSEMBLING and the parts host is **not** hidden — then hidden again at WHOLE. Comment, README and test agree.

## ⑧ D-3 + M-6 — destroy() called and tested · FIXED

**Host (D-3):** the breakpoint rebuild in `openManifestation()` now calls `mf.destroy()` instead of clearing `$('mf-mount').innerHTML` (destroy unwires every handler, cancels the pending completion, and removes the root itself).

**Test (M-6):** new manifestation test — destroy during UNROLLING: root removed from its mount, click listeners emptied on the wired buttons, `pending()` drops to 0, a flush never advances the state, and post-destroy actions throw `ManifestationStateError`.

## ⑨ W-1 — scene.ambient validated · FIXED

**Change** (`world-engine.js`): `validateScene` now checks `scene.ambient` when present — an object of name → duration, every duration a number > 0, pairwise coprime when 2+, enforced by the same `durationsCoprime` the world clock uses, with error text mirroring `validateClock`'s. The documentation is honest about scope (§2 + `SCENE_SCHEMA`): the world clock stays world-level; scene.ambient is **validated scene data** a renderer may use for scene-local cycles — the engine does not consume it, and the schema no longer implies it does. (Validation chosen over removal: the authored vocabulary survives, the documented law now exists.)

**Tests added:** non-coprime `{dust: 10, glow: 15}` → caught; zero duration → caught; non-numeric → caught; coprime `{dust: 47, glow: 13}` → passes. Example scenes (no ambient field) unaffected.

## ⑩ D-4 — "no corrective seeks" wording corrected · FIXED

The claim was falsified by `armSwap`'s counted hard-cut seek (`cur.currentTime = 0` when the standby is not ready). All three occurrences now state what the code does — **drift is corrected by playback rate only, never by seeking, at any drift size; the only seeks are the swap's own: the incoming film set to 0 at the crossfade, and the not-ready rewind of the active film to 0 as ONE hard cut, counted in `ledger.hardCuts` (the ET-120 NC-07 exception)**:

- `cinematic-library.js` header comment (film paragraph);
- `cinematic-library.js` looper comment block;
- `cinematic-library/README.md` film bullet.

A final grep for the old claim across `construction/` returns only the corrected formulations and their correction notes.

## ⑪ Test-gap sweep · FIXED (all five named gaps)

- **M-3 parchment content** (manifestation suite): opening the Mint's parchment asserts the rendered price values are exactly `['$245', '$196']`, the terms node equals the product's terms **verbatim**, and the price note renders verbatim; the Keeper's parchment renders `['$5']` and its terms including "No billing period is implied." — the rendered words, not just the data.
- **G-1 projection-y pin** (geometry suite §3): projection y at depth 0.5 asserted against the nonlinear t (≈ 0.373 of the floor span) while the engine's feet line at the same depth is asserted at the band midpoint (0.5) — the height disagreement is now pinned like the scale one (`|0.5 − 0.373| > 0.1` asserted).
- **G-2 zWeight** (geometry suite, new block): circle resolution at zWeight 1.35 lands at rim+radius in the **weighted** metric and provably **not** in Euclidean terms (0.098 ≠ 0.132), with a zWeight-1 control landing Euclidean-exact; the rect inside-case exits the far face at `minZ − radius/zWeight` (0.40) vs the control's `minZ − radius` (0.386) — the unweighted push direction and the divided exit are pinned as built.
- **G-5 solid + occludes:false** (geometry suite §9): the anchor **is** returned by `obstaclesFromScene` (rect edges asserted from its data) **and** its view-model z equals `zOf(depth, false)` — collides, does not occlude; the two halves move independently.
- **D-5 mobile-overflow measurement** (Seat D exercise, 375px leg): `docScrollWidth 375 = innerWidth 375`; manifestation panel `scrollWidth 343 = clientWidth 343` — no horizontal overflow, measured and recorded (the Vibe Run #1 defect class, now asserted against here).

## ⑫ Known visual defects — CARRIED, NOT FIXED (verbatim from the critic)

These were not this pass's to fix. They block any cinematic-quality PASS (Zero Known-Defect Rule), not the mechanism verification. Quoted verbatim from `WAVE1_SEATD_CRITIC_2026-11-25.md`:

> **D-8 · CONFIRMED — flat figures.** `frame-room.png`: the visitor, elder and scribe are flat paper-doll SVGs against the photoreal film. As confessed. The style gap is total, not partial.

> **D-9 · CONFIRMED + EXTENDED — the table apron.** The two table panels render as a dark horizontal band across the film's own table — and the film's table continues visibly *below* the band, producing a double-table read. Worse than "a dark apron": the eye reads two tables stacked. The occlusion mechanism is honest; the composite is not.

> **D-11 · CONFIRMED + EXTENDED — Solnik's scale and light.** In `frame-room.png` Solnik stands at d 0.68 — *farther* than the visitor (d 0.72–0.80) — yet reads dramatically larger; his head alone spans roughly a quarter of the stage width beside the visitor's whole body. The depth cue (farther = smaller) reads inverted in the composed frame. Light fusion is also not achieved: he is the brightest object in the room, glowing gold against its shadowed warmth — the sepia tint on the rig is negligible. He reads as pasted onto the film's light, not lit by it. (Motion feel not judged — cloud-browser motion law; the founder's device session remains the gate.)

> **D-12 · CONFIRMED (unconfessed) — the silhouette planes read as black slabs.** In `frame-room.png`: a solid black block floats mid-left over the shelves (mid plane), a black chunk sits bottom-left over the film's floor and chairs (near plane's foot blocks), and 3.2%-wide black pillars letterbox both stage edges. Authored as perspective silhouettes; in the composed frame they read as rendering artifacts. Not confessed in Seat D's honest read. *Severity: medium for the cinematic claim.*

> **D-7 · CONFIRMED (minor) — under reduced motion the crossing scribe is invisible.** `updatePopulation` skips all walker updates when reduced; the cross-mode scribe was placed at x=-14 (offstage) at build and never moves — a reduced-motion visitor loses that inhabitant entirely rather than seeing him placed in the room. *Severity: low.*

This seat's own read of the re-shot `frame-room.png` concurs: D-8, D-9, D-11, D-12 all still plainly visible. D-7 is untouched in code (`updatePopulation` still skips walker updates under reduced motion).

---

## Rider (beyond the 12, labelled as such)

**M-4 — NaN/negative prices refused.** Not on the critic's 12-item list, but a two-line hole in the same validator family as M-3's new parchment assertions: `typeof NaN === 'number'` let NaN (and negative, and Infinity) through `validateProduct` to render as "$NaN". `validateProduct` now requires finite ≥ 0 (or null); a test refuses NaN/−5/Infinity for both price fields and confirms $0 stays legal. Flagged here so the blind verifier can strike it if it judges the rider out of scope.

## Observed, deliberately untouched (not on the 12-item list)

W-3 (bindHash rebind listener leak) · W-4 (per-frame view-model rebuild) · W-5 (raw TypeError on unvalidated scenes) · A-3 (z-law duplicated in avatars.js) · A-4 · A-5 (companion mutates `walker.speedScale`) · M-5 (open product without `onBuyRequest` renders an unwired buy button) · M-8 (Mint parchment duplicates its prices) · D-6 (focusable scroll anchor inside `aria-hidden` host). Recorded so they are not lost; fixing them was not this pass's order.

## How to re-run the evidence

```bash
cd ~/workspace/newwave/next-build/living-universe/construction
(cd world-engine && node world-engine.test.cjs)        # 81
(cd world-engine && node geometry.test.cjs)            # 75
(cd avatar-system && node avatar-system.test.cjs)      # 17
(cd manifestation-engine && node manifestation.test.cjs)  # 24
(cd wiring && node exercise.cjs)                       # 18/18 (starts its own server)
# Seat D exercise needs a static server rooted at next-build/ on :8471
(cd ~/workspace/newwave/next-build && python3 -m http.server 8471 &)
(cd cinematic-library && node exercise.cjs)            # JSON report; frames re-shot in place
```

**Final state: all 12 items FIXED with evidence (⑫ carried verbatim, as ordered) — PENDING BLIND VERIFICATION.**

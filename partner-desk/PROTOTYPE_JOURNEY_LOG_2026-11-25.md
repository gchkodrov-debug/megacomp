# PROTOTYPE JOURNEY — BUILD LOG (2026-11-25, evening)

**Order:** FVR-31 · Founder's Direct Order — Immediate Change of Construction
Course, **Order 7** (the first complete cinematic journey) + **Order 10**
deliverables 4 (first working prototype), 5 (initial avatar integration),
6 (first magical manifestation experiment), 7 (the precise honest account —
this file).
**Built by:** Teams A/C/D seat (one agent wearing the three hats, named as such).
**Where:** `living-universe/prototype-journey/` — `index.html` · `journey.css` ·
`journey.js` · `README.md`. Isolated. Nothing live, nothing deployed, $0 spent,
0 credits used. The live site and the live Mint listing are untouched.
**Run:** `python3 -m http.server` from `~/workspace/newwave`, open
`/next-build/living-universe/prototype-journey/` (see the folder README —
the server root matters; the first smoke test caught a wrong-root 404 on
the town art and the instructions were corrected before this log closed).

---

## What was built

One stage, four scenes, one manifestation — the Order 7 route exactly:

**CHARACTER CHAMBER → KINGDOM GATE → STREET → ENCHANTED LIBRARY → MAGICAL MANIFESTATION**

- **Chamber (Team C).** Three guest characters, picked by tap; a name field;
  both persist across scenes and reloads via `localStorage` (browser-only —
  guest rule honoured, nothing leaves the machine). The HUD carries the
  traveller's name + character through the whole journey.
- **Travel (Team A).** Scene changes are stage events, not page loads: the
  pair walks (stage bob animation), backgrounds crossfade, and the Gate
  crossing plays the town's own portal film — Job 3,
  `../assets/mint-portal-crossing_take1.mp4` — in a full-stage overlay,
  with a CSS fallback if the film cannot play.
- **Living scenes (Team A).** Every scene: layered still (town-art,
  referenced not copied) + two breathing lamp-glow layers + a canvas of
  drifting dust motes + pointer parallax with per-layer depths (transform
  only, rAF chase — the engine's Track-7 discipline). The Library scene
  **prefers the Reading Room film (Job 5) when the file exists**: it probes
  `../assets/record-reading-room_take1.mp4` with a HEAD request at scene
  entry and upgrades from still to film automatically; until Job 5 lands,
  the still + life layers carry the room.
- **Manifestation (Team D).** In the Library, **"Ask Solnik for the Mint"**
  runs the five acts in miniature: a parchment scroll unrolls (CSS) →
  golden particle burst (canvas) → the coin materialises (canonical
  obverse, `../../../build/coin-front.webp` — the same face the live site
  anchors to) → **Separate the layers** spreads the Mint's **8 genuine
  creation stages** around the coin, each with a golden leader line and a
  tip dot drawn in SVG from live geometry. The 8 stages are the real ones,
  verbatim in substance from the live Mint listing: 1 The Conversation ·
  2 The Honest Question · 3 The Rehearsal · 4 The Covenant · 5 The Mark ·
  6 The Launch · 7 The Record · 8 The Handover. **Put it back together**
  reassembles. The parchment shows the real commercial facts — **$245
  founding strike · $196 holder strike in PROVADIA · purchasing CLOSED** —
  a disabled control, no buy path, exactly the standing law.
- **Solnik (Team C).** Present in every scene, standing/walking beside the
  visitor. His figure is imported from the town's own cartoon rig —
  `toonSVG('front')` from `living-entity/cartoon/solnik-toon.js` — so the
  face is the adopted face, not a redraw. One scripted line per scene,
  written in his voice (record, welcome, guidance).

## Works (verified by the builder before this log was written)

- All three code files parse/open clean; `journey.js` passes a Node syntax
  check (see Verification below).
- Every referenced asset path was resolved against disk programmatically:
  all exist **except** `../assets/record-reading-room_take1.mp4`, which is
  absent *by design* at build time (Job 5 was being fired the same night)
  and is handled by the probe-and-fallback.
- Served from a plain `python3 -m http.server` and fetched over HTTP:
  page, CSS and JS all return 200 (see Verification).
- Reduced-motion visitors get stills, no particles, no bobbing, instant
  transitions — the sovereignty pattern from the engine contract.

## Does not work / placeholder (named, not buried)

1. **The guest characters are first-cut stand-ins.** Three simple original
   SVG figures (hooded apprentice / wide-brim traveller / star reader),
   drawn tonight for mechanism purposes. They are NOT the founder's 5–10
   cinematic cast, and nobody should mistake their quality for the target.
2. **Solnik is a still pose.** The rig's procedural animation (walk cycle,
   gestures, visemes, expressions) exists in `solnik-toon.js`'s `Toon`
   class but is **not wired** into this stage; locomotion is a stage-level
   bob + slide. If the module import ever fails, a hand-drawn fallback
   figure (same palette family) takes his place and the console says so.
3. **Solnik's lines are scripted.** Five fixed lines, one per scene. There
   is no live brain, no memory, no answers to questions in this prototype,
   and the page copy says the lines are scripted (footer + this log).
4. **Leader lines are desktop geometry.** Below 700px wide the parts stack
   in one column and the golden threads are hidden — the callouts still
   read in order, but the Surfer geometry is a wide-screen proof here.
5. **The portal crossing is cut short.** The overlay ends the Job 3 film at
   ~5.2s of its 7.85s so the journey keeps moving; the engine's trimmed
   window discipline (2.4s→5.3s, ET-120) is the production pattern, not
   this prototype's blunt timeout.
6. **Assembly is staged, not simulated.** Scroll → burst → coin scales in.
   No per-piece assembly of the coin itself; the *separation* carries the
   mechanism proof, the assembly is theatre. Named honestly.

## Unproven (no claim made)

- **Cinematic quality** — not graded, not claimed. This is a mechanism
  proof under Order 10.7 discipline; PIS-01 grading belongs to a founder
  device session, as always.
- **Phone performance** — particles, parallax chase and the film probe are
  untested on real device hardware; cloud/headless checks cannot judge
  motion (house law).
- **The film-upgrade path with the real Job 5 file** — code-reviewed only;
  it becomes *observed* the first time the scene is opened after the take
  lands in `assets/`.
- **Scale** — one product (the Mint) is wired. The manifestation is
  data-shaped (stages are markup, the pattern is generic), but "any of
  800 products" is an architecture claim awaiting a second product wired
  as proof.
- **Two-Axis review** — this log is the builder's own account. The
  independent critic/verifier seats of the relay have not yet graded this
  prototype; under the Zero Known-Defect Rule its status is
  **BUILT — UNVERIFIED**, not PASS.

## Verification (builder-run, 2026-11-25)

- `node --check journey.js` — **PASS** (syntax OK).
- Programmatic path audit of every asset reference in the three files:
  **8 of 8 real paths exist on disk**; the only absent file is
  `../assets/record-reading-room_take1.mp4` — by design (Job 5 not yet
  landed), handled by the runtime probe-and-fallback.
- HTTP smoke (`python3 -m http.server`, curl): page 200 (10,859 B) · CSS
  200 · JS 200 · all four scene stills 200 · portal film 200 (16.9 MB) ·
  coin face 200 · `solnik-toon.js` 200 · Reading Room film **404, as
  expected tonight**. First run of this smoke test was served from the
  wrong root and 404'd the town art; the README's run instructions were
  corrected (serve from `~/workspace/newwave`) and the re-run above is
  the corrected evidence.
- Not run: any in-browser rendering check (this seat has no live browser;
  layout/motion truth belongs to the founder's device session and the
  relay's verifier seat — status stays **BUILT — UNVERIFIED**).

## Next construction sequence (proposal, for the captain)

1. Wire the rig's `Toon` class for a true walk + point gesture at the
   manifestation (Team C, ~half a crew-day).
2. Wire a SECOND product (the Keeper) through the same manifestation data
   path — the reusability proof (Team D).
3. Founder device session: phone performance + first-impression (PIS-01
   evidence), then relay critic + blind verifier seats before any PASS
   language is used about this prototype.

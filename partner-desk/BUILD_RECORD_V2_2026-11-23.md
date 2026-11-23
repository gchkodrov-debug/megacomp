https://provadiacoin.com/next/

# BUILD RECORD V2 — THE COIN PORTAL PROTOTYPE (2026-11-23)

**Deliverable:** the working first page on the preview road — repo `gchkodrov-debug/provadia`, file `next/index.html` (86,376 B) + `next/assets/` (4 files). The live BASIC homepage (repo-root `index.html`, 39,357 B) was never touched — verified after push: HTTP 200, its own title, zero v2 markers. Live `/next/` verified byte-identical to the built file (`cmp` clean), all assets HTTP 200.
**Target, named correctly (partner, 14:01 CT):** an INTERACTIVE CINEMATIC WORLD — the Coin Portal Prototype — not a scrolling list, not another homepage mockup. v1 was a technical foundation, not the intended homepage; v2's job was to demonstrate the concept. It does, as ONE FULLY WORKING VERTICAL SLICE: **official coin → opening → select Mint → enter Mint world → return to coin**, tested on desktop and phone (proofs in §4).
**Founder rulings built in:** "THE COIN IS THE WEBSITE" (14:00 CT) · BOTH — OUT TO CHOOSE, IN TO ENTER (14:03) · the whole-9-yards standard (14:04) · eight-portal map approved (14:12) · ten-capable three-systems architecture (14:12) · connected universe / Doctor Strange ruling (14:16) · start order (14:18) · credit fence LIFTED (14:25) · seven production systems (14:28). Palette law (13:43) applied exactly.

---

## 1. STEP 1 — THE DIAGNOSIS (why v1 stood still on the founder's laptop)

In plain words: **v1's own head gate guessed at the visitor's machine — and guessed wrong.** The gate script at the top of v1's page read two browser-reported numbers, `hardwareConcurrency` (CPU cores) and `deviceMemory` (RAM), and if either read 2 or less it stamped the page `static` + `noanim` before anything rendered. A page stamped static hides the whole scroll journey and shows the fallback card stack instead. Those two numbers are unreliable — browsers cap, round, or under-report them for privacy and power reasons — so a perfectly normal desktop laptop could report "2" and be served the dead stack. The founder's laptop did exactly that. Two further defects rode along: the arrival coin was a **still image in every mode** (only a CSS float moved), and a reduced-motion media query independently flattened the journey.

**The fix is a class fix, not a patch:** v2's gate (`MODE GATE (v2)`, head of file) engages the static stack ONLY on —
1. `prefers-reduced-motion` (visitor's own OS setting), or
2. `save-data` (visitor's own data-saver), or
3. no JavaScript / broken JavaScript (the `<noscript>` sheet shows the stack; if the interaction scripts fail, no `preventDefault` is ever attached and every chip/door simply navigates).

Nothing else may still the page — never device class, width, pointer type, core count, or memory. The living path is the DEFAULT for every normal browser, desktop and mobile alike. The journey engine's frame-density step now keys only on **which frame set the screen loads** (the specimen's own desktop/mobile sets — responsive asset selection, the same mechanism as a responsive image), never on a capability guess; the engine's old save-data step branch was removed.

**Proven on both screens** (local mirror of the exact pushed file, headless Chrome 157, CDP probes):
- Desktop 1440×900: `html` class = `kt` only (cinematic, NOT static) · journey visible, stack hidden · arrival video `paused:false, currentTime 2.06, readyState 4` · 10 orbit nodes (2 concept) · 8 portal chips · zero JS errors (only the mirror's own favicon 404).
- Phone 390×844: class `kt` · stack hidden · mobile film playing (readyState 4) · orbit hidden by design · 8 chips · zero JS errors.

## 2. WHAT PLAYS ON ARRIVAL

The first screen is the coin, living: a real film, playing on arrival (autoplay, muted, loop, playsinline) — a seamless ping-pong loop cut from the town's existing Veo Flow film (`mint-flow-film-web.mp4`, 960×540, opens whole / ends separated, so forward+reverse loops without a cut).

| Asset | File | Bytes | Notes |
|---|---|---|---|
| Arrival film — desktop | `next/assets/coin-film-desktop.mp4` | 1,188,172 | 854×480, 15.58 s loop |
| Arrival film — phone | `next/assets/coin-film-mobile.mp4` | 564,939 | 640×360, 15.58 s loop |
| Poster | `next/assets/coin-poster.webp` | 55,580 | first frame, preloaded |
| GSAP (vendored) | `next/assets/gsap.min.js` | 72,214 | kinetic typography |

VP9/WebM encodes tested larger and were dropped — MP4 only. The film's bytes are reported separately from the frame budgets, per the brief: the journey reuses the specimen's already-deployed frame sets unchanged (desktop 6,302,660 B ≤ 8.5 MB bar · mobile 1,486,596 B ≤ 1.5 MB bar). Around the film: the town's name in the headline itself — **"Provadia — a living digital town."** — assembling letter by letter, one explanatory line, the two bright-gold main doors (Explore Services · Explore the Town), the eight-portal chip rail, the fixed nav carrying all ten town doors, and (desktop) the two orbital rings turning slowly around the coin. Nobody waits for any of it: every word and door is present and usable from the first second.

## 3. THE THREE SYSTEMS (ten-capable architecture, 14:12 CT)

1. **THE PORTAL ENGINE** — ONE central interaction system: it owns the separation (the scroll journey on the specimen's graded canvas engine), selection (chips · orbit nodes · journey hotspots — one `selectRoom()` path), the camera (a scripted tour that flies the scroll film to the chosen part's beat, then the 1.25 s slow push toward that part's leader-line tip point, portal ring blooming at the tip), move-aside (the other parts dim to 30% and step 42 px out of the camera's path), and the return journey (Return to Coin · Step back · Escape · a scroll gesture). Never ten hand-built animation systems: adding a portal is adding a registry row.
2. **THE CINEMATIC DIRECTOR** — ONE choreographed timeline discipline: footage (arrival film + journey frames), slow motion (everything moves at the founder's slow tempo — chase lerp, 1.25 s push, 110 s/190 s orbits), camera, gold motes, and animated typography (headline letters assemble via GSAP; below-fold headings rise word by word; **the destination's name breaks into glowing letters, travels through the passage, and reassembles inside the entry card**). Sound: none in this proof — only when permitted. Letters are dress, never the gate: initial states are set by GSAP itself, never by CSS, so a failed library leaves every word standing complete.
3. **THE WORLD REGISTRY** — one data record per portal (destination · readiness · assets · fallback · connections), mirrored by the static markup for no-JS parity. An unfinished room can never dress as a functioning business: the Keeper's readiness reads OFFLINE in every rendering; Studio and Observatory are `concept:true` — present in the registry and drawn on the outer orbit as dimmed, dashed, inert nodes, never as doors. New dimensions register without rebuilding the homepage.

## 4. THE VERTICAL SLICE — THE THREE PROOFS, GRADED

The run's primary deliverable (14:28 CT) is the complete journey **coin → opening → select Mint → enter Mint → return to coin**, and it works end to end on desktop and phone:

1. **The official coin OPENING — PASS.** Scrolling separates the real coin into eight named layers in extreme slow motion on the specimen's founder-graded frames (235 frames), each part carrying its callout, leader line and tip dot, then reassembles whole ("One Coin. One Town."). Stills d2 (Record beat, layers separated, leader + tip dot on the part) and d4 (reassembled whole coin).
2. **A component becoming SELECTABLE — PASS.** Every separated part carries a glowing hotspot at its tip point (keyboard-focusable, visible above 55% callout opacity); the arrival offers the same selection three ways — orbit nodes (desktop), the 8-chip rail, the fixed nav. Selecting marks the chip `aria-current`, dims and moves the other parts aside.
3. **A cinematic transition INTO the Mint — PASS, with its onward portal.** Clicking the Mint (chip, orbit node, or hotspot) flies the film to the Mint's beat, pushes the camera in toward the Mint layer's tip as the portal ring blooms, and lands on the Mint threshold: its line, its receipted facts ($130 · completion-only · gate closed · checkout not connected), **its own film seen LIVING through the portal** (the Mint's assembly film, lazy-loaded only on entry), its Enter door to `/listings/mint.html`, and **its onward golden portals — to the Marketplace (`/catalogue/`) and the Coin (`/coin/`)** — real links styled as portals (Doctor Strange amendment). Return to the Coin stands persistent at top-left; the CDP run executed the whole slice and probed: card shown · room=mint · onward=[/catalogue/, /coin/] · window visible · return visible. Still d3 is that moment.

**Honest grade of the core interaction:** the mechanism is extraordinary in structure — one engine, real film, real doors, no dead ends — and the entry push is a code camera (transform), not yet the matched-frame footage the storyboard specifies. That gap is exactly what the CAPTAIN-FLOW orders in §9 close. Ten doors would not fix a weak core; the core here is sound, and its one soft seam is named, specified, and ordered.

## 5. THE WORLD REGISTRY — REAL-ROUTE MAP (10 slots)

| # | Portal | Ring | Route | Readiness (as printed) | Onward portals |
|---|---|---|---|---|---|
| 1 | The Mint | inner | `/listings/mint.html` | Live door · service gated (intake closed, checkout not connected) | Marketplace · Coin |
| 2 | The Marketplace | inner | `/catalogue/` | Live door · checkout not connected (Studio rides inside) | Mint · Coin |
| 3 | The Coin | inner | `/coin/` | Live door | Golden Wall · Marketplace |
| 4 | The Golden Wall | inner | `/record/` | Live door (its home is the Record) | Record · Coin |
| 5 | The Record | inner | `/record/` | Live door | Golden Wall · Town |
| 6 | The Forum | outer | `/agora/` | Live door | Keeper/Knock · Town |
| 7 | The Keeper — The Knock | outer | `/knock/` | Live door · **the Keeper himself is OFFLINE** (Agora = working door) | Forum |
| 8 | The Town | outer | `/ecosystem/` | Live door | Forum · Mint |
| 9 | The Studio | outer | door exists: `/studio/` | **CONCEPT-ONLY as a world** — its page reads "Not yet open" | — (reserved) |
| 10 | The Observatory | outer | none exists | **CONCEPT-ONLY** — milestones/verified activity; no page yet | — (reserved) |

Every portal's fallback is its static-stack card (same name, line, facts, door) — the stack carries all eight live portals in full. The always-visible nav carries all ten town doors (Mint · Marketplace · Coin · Record · Forum · Knock · Ecosystem · About · Studio + the Keeper — Offline chip to the Agora).

## 6. THE INTERACTIVE STORYBOARD — FOUR SCENES, WITH THEIR SEAMS

- **Scene 1 — ARRIVAL.** Darkness (Vault #141210); golden glow gathers; the real coin turns slowly in its light (the arrival film); gold motes drift; depth from the two orbital rings turning at 110 s / 190 s. The name assembles letter by letter; the doors stand bright from the first second. *Seam: the film is a loop — interaction lives AROUND it (orbit nodes, chips, nav), never inside the footage (production rule, 14:28 CT).*
- **Scene 2 — TRANSFORMATION.** Scroll: extreme slow-motion separation; the coin opens into eight layers that float outward like a mechanism; each component IS a destination — callout, leader line, tip dot, hotspot. Then reassembly, whole. *Seam: frames are the specimen's town-layers set today; ORDER F-1 (§9) replaces them with the purpose-made town separation, matched-frame.*
- **Scene 3 — LIVING TYPOGRAPHY.** Letters materialize and assemble with purpose (headline; section headings word by word); at a transition the destination's name travels as glowing letters and reassembles inside the next world. Navigation labels are always readable — animation never gates text.
- **Scene 4 — ENTER THE ROOM.** OUT to choose, IN to enter (founder, 14:03): on selection the other components move aside, the camera travels in through the chosen part, the portal ring blooms, and the room reveals itself as a living environment — in this proof, as its threshold: facts, its film seen through the opening (Mint), its real door, its onward golden portals, and Return to the Coin. *Seam: the push is code motion today; ORDERS F-3…F-10 replace each push with matched-frame entry footage (exit frame of the separation = entry frame of the entry film — a generation requirement, not a hope).*

**Atmosphere (feeling references, partner 14:01 CT, filed at `references/partner-reference-frames-2026-11-23.jpg` — never shipped as artwork; the coin's published faces are never redrawn):** (1) the coin monumental and glowing, light moving on its face, a real object in a dark world — carried by the arrival film + glow; (2) the coin as exploded mechanism — carried by the journey; (3) the camera travelling through a part into a lit interior — carried by the push + threshold (footage version: ORDER F-3); (4) a living circular chamber — carried by the orbital arrival; each world's own chamber is its landing page's atmosphere, per-world, never eight copies of one background.

## 7. PER-PORTAL TRANSITION SPECIFICATION — THE MINT, IN FULL (template for all)

- **Starting environment:** the arrival — dark vault, the living coin turning in golden light, orbit rings in slow motion, both main doors lit.
- **Opening visual + camera direction:** the visitor scrolls (or picks the Mint from the rail/orbit); the camera holds center as the coin separates in extreme slow motion; the Mint is the first layer out (beat p≈0.10). On selection from the arrival, the Portal Engine tours the film forward to that beat — the camera travels WITH the film, never a jump cut.
- **Portal appearance:** at the Mint's beat, its callout stands left with leader line + tip dot on the layer; a glowing hotspot ring blooms on the layer itself — the component is selectable. The Mint is also discoverable in the first second (chip rail, position 1; nav, position 1; Door 1 names it).
- **Selected-world preview:** the instant the Mint is chosen, its world is visible LIVING through the opening before entry: the threshold carries the Mint's own film playing inside it (molten gold, the coin opening into its layers — the forging chamber, alive).
- **Entry transition:** the other seven parts dim and move aside; the camera pushes in slowly (1.25 s) toward the Mint layer's tip point as the portal ring blooms gold; the name "The Mint" travels as glowing letters and reassembles inside the threshold; the threshold presents line, facts, onward portals (Marketplace · Coin) and the Enter door.
- **Landing environment:** `/listings/mint.html` — the Mint's own world: its 235-frame scroll-assembly (Conversation → Honest Question → Rehearsal → Covenant → Mark → Launch → Record → Handover), purchase disabled, the $130 completion-only pilot stated.
- **Return transition:** Return to the Coin (persistent, top-left in every held view) or Step back / Escape / a scroll gesture — the push releases, all parts restore, the visitor is back at the living coin; nothing is lost and no state traps.
- **Mobile fallback:** no orbit; the coin film (mobile weight), the journey, and the full 8-chip menu carry the same selection and entry; static modes receive the Mint's full stack card with its door.
- **Film seams (today → ordered):** today's push is code motion; ORDER F-3 replaces it with matched-frame footage whose FIRST frame is the Mint layer's separated state (F-1's exit frame) and whose LAST frame is the Mint world's establishing interior — no black flash, no visible cut (Dimensional Transition Engine).

The same eight fields are the template for the other seven live portals; their specifications are written when their entry films are ordered (F-4…F-10), each with its own atmosphere: Marketplace — a living showroom; Coin — the live market's light; Golden Wall — the Wall stretching into distance; Record — the great book opening; Forum — the square at gathering hour; Keeper/Knock — a lit doorway, the counter dark (he is offline); Town — the town seen from its gate.

## 8. GRADING — SEVEN PRODUCTION SYSTEMS (14:28 CT) + FOUNDER STANDARD (14:04 CT)

**Seven systems:**
1. **Dimensional Transition Engine** — PARTIAL PASS: every portal has a precise code entrance/exit (tour → push → threshold → return), no black flashes, no video cuts anywhere in the slice; the frame-matched footage transitions are specified and ORDERED (F-3 first), not yet generated.
2. **Living Portal System** — PARTIAL PASS: motion is visible inside the Mint portal before entry (its film, through the opening — the required minimum, met); the other portals' living previews await their entry films (F-4…F-10).
3. **Reality-Bending Engine** — PASS at prototype scope: golden rings separating around the coin (orbit), the coin folding open into floating layers in slow motion, space transforming around the visitor (move-aside + push) — all original PROVADIA work in the Doctor Strange FEELING; no film assets or designs used.
4. **Cinematic Typography System** — PASS: letters assemble (headline), rise (headings), travel glowing between worlds and reassemble (entry titles), and dissolve is the step-back's fade; navigation labels are always readable, in every mode.
5. **Interdimensional Navigation System** — PASS: coin→world (Portal Engine), world→world (registry connections rendered as golden portals in every threshold; the Mint→Marketplace portal is real and working), Return to Coin persistent in every held view.
6. **Seamless Playback System** — PASS: the next sequence is always preloaded by the graded engine's priority preload; opening/closing frames are compatible by construction (the arrival loop is seamless; the journey opens and closes on the whole coin); the interactive fallback is lightweight and complete (static stack); there are no loading screens at all.
7. **Quality-Control System** — PASS for this run: every scene gated on realism (real footage/frames only) · continuity (one engine, one registry) · interaction (the slice executed by CDP on both viewports) · mobile performance (frame/film budgets held) · a functioning destination at the end (every portal's door probed live, §10). Beautiful footage alone was never the pass — the mechanism was the deliverable.

**Founder standard, item by item:**
1. **Kinetic typography** — PASS: GSAP-staged letter/word motion on the headline and headings; the destination's name travels and reassembles; static paths keep complete text instantly readable.
2. **Slow motion** — PASS: every moving thing is slow (film loop, chase, 1.25 s push, 110 s/190 s orbits, letter staggers).
3. **Footage feel (acceptance bar for the film step)** — RECORDED AND BINDING on §9: every generated film must feel REAL — UGC-style footage of a physical coin — never a glossy render-look. The existing specimen film (reused today) already meets it; the orders state it as a requirement.
4. **The Lamborghini bar** — PASS at prototype scope: completeness (all eight portals, all systems, all fallbacks present) + first-seconds capture (living coin, name, doors, menu — from the first second).

**Partner points (14:01/14:05/14:10 CT):** interactive cinematic world, not a scrolling list ✓ · hotspots that know the room ✓ · entering feels like entering ✓ · room menu accessible at all times ✓ · v2 demonstrates the concept BEFORE any Flow spend is proposed — the spend is now the founder's own lifted fence, ordered in §9, not spent by this run ✓ · one extraordinary choreographed experience over twenty fighting effects ✓ (one engine, one timeline, one registry).

## 9. FILM MANIFEST — SPEND LEDGER (founder lifted the credit fence, 14:25 CT)

House-measured cost: **Veo 3.1 Fast on the store Ultra account = 10 credits per take**; tank = 10,000 credits. Status key: ORDERED → GENERATED → ACCEPTED / RETAKE. **No credits were spent by this build run** — every order below is flagged **CAPTAIN-FLOW**: the captain runs the Flow session on the store Ultra account and delivers accepted footage back into the build; the mechanism above is complete without them and each order names the exact slot it fills. Acceptance bar for every take (founder's standard): judged against the storyboard — REAL physical feel (UGC-style), slow motion, the official coin faces as ingredients wherever the coin appears (faces are never redrawn by the generator's imagination — they are supplied as the matched frames), continuity with its matched pair. Takes that fall short are retaken and logged honestly.

| ID | Film (slot it fills) | Matched-frame pair (start → end) | Frames / duration | Takes × credits | Status |
|---|---|---|---|---|---|
| F-1 | **THE TOWN SEPARATION** — replaces the reused specimen frames as the journey's film (Scene 2) | START: the official coin, whole, front face (ingredient: official front-face image) → END: the same coin separated into eight distinct layers floating in space, in the journey's beat order | ~240 @ 30 fps (≈8 s) | 3 × 10 = 30 | ORDERED — CAPTAIN-FLOW |
| F-2 | **ARRIVAL — THE LIVING COIN** — replaces the ping-pong specimen loop at the arrival (Scene 1) | START = END (seamless loop): the official coin at a three-quarter turn in golden light, dust motes drifting, light moving on the face | ~120 @ 30 fps (≈4 s loop) | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| F-3 | **ENTER THE MINT** — the entry-transition film for the Mint portal (the proof destination; fills the code-push seam) | START: F-1's exit state, Mint layer forward (matched frame, supplied as ingredient) → END: the Mint world's establishing interior — the forging chamber, molten gold, the layer machinery at rest | ~120 @ 30 fps (≈4 s) | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| F-4 | ENTER THE MARKETPLACE — entry film, Marketplace portal | START: F-1 exit state, Marketplace layer forward → END: a living showroom interior, shelves of lit offers | ~120 | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| F-5 | ENTER THE COIN — entry film, Coin portal | START: F-1 exit state, Coin layer forward → END: the coin's live chamber, chart-light moving on gold | ~120 | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| F-6 | ENTER THE GOLDEN WALL — entry film, Wall portal | START: F-1 exit state, Wall layer forward → END: the Wall stretching into distance, brick light | ~120 | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| F-7 | ENTER THE RECORD — entry film, Record portal | START: F-1 exit state, Record layer forward → END: the great book opening, pages of light | ~120 | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| F-8 | ENTER THE FORUM — entry film, Forum portal | START: F-1 exit state, Forum layer forward → END: the Agora at gathering hour, lamps lit | ~120 | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| F-9 | ENTER THE KEEPER'S DOOR — entry film, Keeper/Knock portal | START: F-1 exit state, Keeper layer forward → END: a lit doorway with the counter dark beyond it (he is OFFLINE — the film must show welcome without claiming he serves) | ~120 | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| F-10 | ENTER THE TOWN — entry film, Town portal | START: F-1 exit state, Town layer forward → END: the town seen from its gate at golden hour | ~120 | 2 × 10 = 20 | ORDERED — CAPTAIN-FLOW |
| — | Studio · Observatory | no films — concept-only registry slots | — | 0 | RESERVED ($0) |

**Ledger total planned: 210 credits of 10,000.** Generation prompt pattern (each order, written in full on the Flow session brief): "Photorealistic footage of a real physical gold coin [official faces supplied as the frame ingredients], [start state] transforming in extreme slow motion to [end state], dark vault atmosphere, warm golden light, dust in the air, cinematic, no text, no logos beyond the coin's own face, 16:9." Aspect 16:9 throughout (the stage's own ratio); frame extraction at 30 fps captain-side, as with the Mint specimen.

## 10. RELAY LOG (Relay Law — builder → improver → critic → blind verifier)

- **Builder:** the captain's crew (this run). Diagnosis first (§1), then the build.
- **Improver — DeepSeek V4-Pro** (different family): 28 findings. Adjudicated one by one against evidence; **none sustained**: its two "blocker" code claims fail on the file itself — `splitLetters` and `showCard` live in ONE IIFE (grep-proven: script 3 contains both), and the orbit it called "broken geometry" is the rendered orbital system in still d1 (it judged code without the render). Its tour-cancellation claim is disproven by the executed CDP slice (wheel events are user-gesture-only; the tour completed). Three findings it resolved itself as "correct as-is." Full text: `relay/v2_improver_out.md`.
- **Critic — Grok 4.20** (NAMED SUBSTITUTE: kimi-k3's bench checked once this run — HTTP 402, out of credits — and stood down): verdict FAIL, 2 blockers claimed. Adjudication: **one sustained fix** — bright gold had leaked into v2's interactive chrome; the palette was tightened so #E4C65B stands solid ONLY on the two main door cards and the portal-ring light, everything else antique gold/cream (glows/washes exempt as illumination). The rest rejected with reasons: the Studio nav link is the approved map's own menu door (concept-only binds the coin's worlds, where Studio is inert); width keys asset selection, never the cinema (both probes: film playing); the "two main doors" it named were the wrong pair — the ruled doors are Explore Services / Explore the Town, and both carry the bright gold. Full text: `relay/v2_critic_out.md`.
- **Blind verifier — GPT-5** (verbatim standards, no sight of any reasoning): first pass 13/14 — standard 3 FAILED (the town's name was the eyebrow, not the headline). **Fixed before delivery**: the H1 now reads "Provadia — a living digital town." **Re-verification: OVERALL PASS, all 14 standards, none failed.** Full text: `relay/v2_verifier_out.md`.
- The whole crew agrees this is the finest variant the run can produce without the ordered films; the captain judges last and concurs.

**Live link probes after push (all HTTP 200):** `/next/` (byte-identical to build) · `/next/assets/` ×4 · `/listings/mint.html` · `/listings/mint-assets/mint-assembly-film.mp4` (890,683 B) · `/listings/mint-frames/f001.webp` · BASIC `/` untouched.

## 11. WEIGHTS, CWV, AND EVERY HONEST SHORTFALL

- **Weights:** page HTML 86,376 B · arrival film 1,188,172 B desktop / 564,939 B phone (reported separately per the brief) · journey frame sets (reused, already deployed) 6,302,660 B desktop (bar 8.5 MB ✓) / 1,486,596 B phone (bar 1.5 MB ✓) · GSAP 72,214 B · poster 55,580 B. The Mint's through-window film (890,683 B) loads ONLY when a visitor enters the Mint.
- **CWV: UNMEASURED — stated plainly.** No field data exists for this page; this cell's Chrome cannot reach the live URL (the managed browser's local-network policy blocks even loopback without its runtime policy, and the live URL fails its proxy tunnel — the same limit recorded in v1), and PageSpeed's API stands rate-stopped under the house rule from earlier runs. Local lab timings on loopback are NOT filed as CWV. Unmeasured is recorded as unproven, never as pass.
- **The 5-stranger / 10-second clarity test: NOT RUN** — it needs five strangers; the page was built to its bar and the founder's own look is the first real test.
- **Motion verdicts belong to real devices** (cloud-browser motion law): the CDP probes prove the film PLAYS and the slice EXECUTES; how the motion FEELS is the founder's phone/laptop judgment, still owed — as is his Phantom click-test on the coin page (unchanged, owed from before).
- **The entry push is code motion**, not matched-frame footage — specified and ordered (F-3…F-10), not hidden.
- **The journey's frames are the Mint specimen's**, reused — the town's own separation film is ORDER F-1, not yet generated; no credits were spent by this run (the fence lift arrived as an order to write orders, and the captain runs the Flow session separately).
- **Per-world atmospheres** exist today as each landing page's own design; the unified in-page threshold atmosphere per world arrives with the entry films.
- **Sound:** none — by the Director's rule (only when permitted), not by omission.
- One dead CSS block from v1 (`.arrival-coin`) remains in the shipped stylesheet — cosmetic only, left untouched rather than risk the graded base; noted here so it is never mistaken for a live element.
- The catalogue hero-still 404 (`/catalogue/assets/workshop-still.svg`) is a different page's open red, untouched by this run.

## 12. STILLS (from the exact pushed file, local mirror — layout evidence; motion is proven by the probes in §1/§4, felt on the founder's devices)

- `shots-v2/d1-arrival.png` — desktop arrival: living coin, orbit rings + 10 nodes, headline, doors.
- `shots-v2/d2-popout-record.png` — desktop journey: the Record beat, layers separated, leader line + tip dot.
- `shots-v2/d3-mint-entry.png` — desktop: the Mint threshold — push completed, film through the portal, onward golden portals, Return to the Coin.
- `shots-v2/d4-reassembled.png` — desktop journey end: the coin whole, "One Coin. One Town."
- `shots-v2/p1-arrival.png` — phone arrival: film playing, 8-chip menu, Door 1.
- `shots-v2/p2-reassembled.png` — phone journey end: the coin whole.

**Next, in order:** the founder judges v2 on his own screens → the captain runs the CAPTAIN-FLOW orders (F-1, F-2, F-3 first — the slice's own films) on the store Ultra account and delivers accepted footage back into this build → the pattern multiplies portal by portal. The BASIC homepage is replaced only when the founder rules the new page better.

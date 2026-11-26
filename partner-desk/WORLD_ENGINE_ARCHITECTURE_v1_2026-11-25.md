# WORLD ENGINE ARCHITECTURE v1 — TEAM A PAPER

**Date:** 2026-11-25 (night of founding) · **Seat:** Team A — World Engine (Order 8) · **Deliverable:** Order 10, item 1 — the revised world architecture.
**Authority:** FVR-31 (the Living Cinematic Universe course change, founded tonight) · the founder's directives filed verbatim at `FOUNDER_DIRECTIVES_LIVING_CINEMATIC_UNIVERSE_2026-11-25.md` · FVR-30 (evolved, not replaced) · FVR-29 + the F0 Foundation Paper (Module Law · Identity & Data Decision · Route & Shell Discipline + the Offline Line — all ride unchanged).
**Status:** PAPER ONLY. No code was changed, nothing was deployed, no credits were spent to write this. Every claim below carries an evidence class. Classes: **MEASURED** (a number or file state observed tonight or in a cited log) · **DEMONSTRATED** (built and exercised, with a test or log on record) · **SOURCED** (an outside fact from a named source) · **INFERENCE** (the captain's reasoning, labeled so partners can attack it) · **UNPROVEN** (not demonstrated anywhere yet — stated plainly, never dressed up).

---

## 0. THE PLAIN ANSWER FIRST

Today we have a good stage engine and no world. The stage engine (`living-universe/engine/`) can dress one place — a film that loops without a visible cut, light and dust that move, a character plane, doors that play a crossing film. It has dressed exactly two places (the Mint, the Record) and both were verified by tests, not by a visitor's eyes on a real phone.

FVR-31 asks for a world: many places joined by roads, a host who walks them, a visitor who walks them as a character, and a magic trick that presents any product. This paper's answer is: **keep the stage engine as the room-dresser, and build four new thin things around it — a route graph (the map), a journey director (the walk), a character system (the bodies), and a manifestation stage (the magic) — all speaking through the contracts the stage engine already proved.** The eight engines below are those pieces plus the three that already exist in other clothes (Solnik's brain, the tills, the members service design) and the factory that feeds them all.

Nothing in this paper claims the hard parts are solved. The hard parts — a visitor's avatar that looks like a film character and not a game sprite, journeys longer than eight seconds, a world that holds 60 frames on an ordinary phone — are named UNPROVEN in §8 with the test that would prove each one.

---

## 1. THE ARCHITECTURE IN ONE PICTURE

```
                        ┌─────────────────────────────────────────────┐
   MANUFACTURING        │              PROVADIA OS (browser)           │
   (offline, house)     │                                             │
                        │  7. IDENTITY /        1. WORLD ENGINE       │
  Genspark ── stills ─┐ │     COMMUNITY            (route graph,      │
  Flow/Veo/Omni ─ films ┤    (guest → name →        journey director, │
  Crew tools ── code ──┤ │     account)               stage host)      │
                        │        │                      │             │
  8. CINEMATIC          │        ▼                      ▼             │
     MANUFACTURING ─────┼─►  4. SOLNIK            2. CINEMATIC        │
     FACTORY            │     INTELLIGENCE           ENGINE           │
     (pipeline,         │     (brain service,        (layers, loops,  │
      asset library,    │      knowledge,            master clock,    │
      QA gates)         │      fences)               portals)       │
                        │        │                      │             │
                        │        ▼                      ▼             │
                        │  3. CHARACTER /        5. MAGICAL           │
                        │     AVATAR ENGINE         MANIFESTATION     │
                        │     (Solnik's body +      (scroll, Surfer,  │
                        │      visitor avatars)     product stage)    │
                        │                               │             │
                        │                               ▼             │
                        │                        6. COMMERCE ENGINE   │
                        │                        (catalogue data,     │
                        │                         prices, the till)   │
                        └─────────────────────────────────────────────┘
   FENCES AROUND ALL OF IT: F0 Module Law · the Offline Line · Gatehouse
   (SC-3, Lock→Sign→Persist→Broadcast→Verify) · Zero Known-Defect ·
   Promise-to-Function · PIS-01 budgets (§7).
```

**The load-bearing decision (INFERENCE, for partner challenge):** the world is **2.5-D composited cinema, not a free 3-D world**. Each place is a dressed stage (film + still + particles + occluders + characters on planes) exactly as the current engine builds it; travel between places is a directed journey (a portal film or a choreographed walk across a connecting stage), not free roaming in a rendered 3-D space. Reasons, each checkable: (a) the only world technology we have *demonstrated* is this compositor — 171 tests passing (MEASURED, ET-120 log); (b) a free 3-D world at animated-film quality on an ordinary phone is UNPROVEN everywhere in our stack (§8); (c) the founder's own journey example (Order §6 of the directive) is a *directed* walk — entrance, street, fountain, tunnel, library — which is a route, not an open world. Three.js is in the house toolbox (vendored r160, smoke-passed — CREW_TOOLS_MANIFEST §1) and stays available for instruments and single-object scenes (the coin), where we have already shipped it. If a partner can evidence film-quality free 3-D on a mid-range phone inside our budgets, this decision reopens. Until then it stands.

---

## 2. THE EIGHT ENGINES

Each engine: its job · what it takes in and puts out · its contract with the others · what exists tonight, at file level · what is missing.

### 2.1 WORLD ENGINE — the map and the walk

- **Job:** know where every place is, how places connect, and move the visitor (and Solnik, and the visitor's avatar) along those connections without a seam. Owns the route graph (§3), the journey director (the choreography of a crossing: which film plays, which stage loads underneath, when control returns), and the stage host (mounting/unmounting Cinematic stages as the visitor travels).
- **Inputs:** universe configs (places) · portal declarations (edges) · travel requests from any engine (`travelTo(placeId, viaEdgeId)`).
- **Outputs:** `living-universe:portal-enter` and arrival events (already the engine's event vocabulary) · the currently mounted place · a travel-in-progress lock state every other engine can read.
- **Contracts:** it never renders a place itself — it asks the Cinematic Engine to mount a place config and waits for its `ready` event. It never moves a character itself — it hands the Character Engine a path (a list of anchors across one or more stages) and receives `arrived`. It never decides *why* anyone travels — Solnik Intelligence and the visitor do.
- **Exists tonight:** the seed of all of it, inside `engine/living-universe.js` (85,554 B, MEASURED): `LivingUniverse.mount(stage, cfg)` with idempotent mount + full `destroy()` teardown (the stage host in embryo) · portal anchors as real DOM doors, clickable and keyboard-operable · the portal overlay (z 300) with iris transition and per-portal film playback with honest degradation to the iris on film error · `state()` self-report. Two places exist as data in `engine/universes.js`: `mint` and `record` fully configured; `keeper`, `sentinel`, `wall`, `agora` as named stubs with library assets assigned.
- **Missing:** the graph itself (places today know only their own portals; nothing holds the whole map, validates that every edge lands somewhere, or finds a route) · multi-stage journeys (today: one portal = one page navigation; a Chamber→Gate→Street→Library walk across stages inside one session does not exist) · travel choreography for characters (Solnik crossing *with* the visitor) · place preloading (the next stage dressed before the visitor arrives — NC-06 in the ET-120 log is exactly this, designed-not-built).

### 2.2 CINEMATIC ENGINE — the dressed stage

- **Job:** make one place feel alive and continuous: layered film, still art, particles, light, occlusion, sound — on independent cycles that never visibly restart together.
- **Inputs:** one universe config (palette, cycles, films, stills, particles, occluders, anchors, sound) from the Asset Library via the Factory.
- **Outputs:** a mounted stage · the anchor graph (`window.__livingUniverse.anchors()`) · media truth (`state().cycles` — measured clip durations, drift, lock ledger) · `video-error` events naming the failed layer.
- **Contracts:** it is a *renderer only*. It knows nothing of products, prices, identity or routes beyond the portal hrefs/films declared in its config. Page content (the till, the text) lives outside the stage at z ≥ 100 and the engine never touches it — this is the structural root of Promise-to-Function (§6).
- **Exists tonight:** this engine, essentially whole, and it is the best-verified thing we own (all in `engine/`, contract in `engine/README.md`): the z-layer stack (palette 0 · video 10 · machinery 22 · still 20 · particles 25/35 · **character plane 30** · occlusion 40 · anchors 46 · arrival 150 · controls 200 · portal overlay 300) · dual-video phase-offset crossfade looping under Gemini #120 law (hard-cut only at bookend RMSE ≤ 8, measured by frame number) · the coupled-layer master clock with a phase-locked loop that never seeks (ET-120-A) · coprime validation for free layers (ET-120-B) · clip-true configs verified at runtime (ET-120-C) · formula-placed occlusion (`occluderLayout()` + `MOTIF_GEOMETRY`, asserted numerically at 1920×1080 and 320/375/390/430) · visitor sovereignty (motion/sound controls, reduced-motion wins on every load, zero video bytes fetched when motion is off) · performance discipline (rAF-coalesced, DPR ≤ 1.5, no per-frame DOM queries, off-screen pause). **171 tests passing** (113 pure core + 35 stub-DOM + 23 continuity analyzer — MEASURED, ET-120 log).
- **Missing:** a third and fourth particle renderer (vocabulary today: `spark`, `mote` — 2 renderers, 3 occluder motifs; the README names this limit honestly) · water/flame/cloth as real-time systems (today they exist only *inside* films) · spatial sound (one ambience track per place, visitor-controlled; no positional audio) · the device proofs (§7, §8).

### 2.3 CHARACTER / AVATAR ENGINE — the bodies

- **Job:** every body in the world — Solnik's and the visitor's — drawn, posed and moved by one system, consistent in every place, at the character plane (z 30) so the world can occlude them and they can pass behind machinery.
- **Inputs:** a character definition (rig + palette + wardrobe) · movement orders from the World Engine (paths) and Solnik Intelligence (gestures, speech state) · the anchor graph.
- **Outputs:** bodies on the character plane · locomotion events (`solnik:arrive`, `solnik:interact` — the live client's existing vocabulary) · speech-state visuals (talk loop driven by the real voice envelope where a voice plays).
- **Contracts:** a body never speaks, thinks or sells — Intelligence supplies intent, this engine supplies motion. A body never crosses a portal alone — the World Engine directs travel; this engine walks the path it is given. The visitor's avatar and Solnik run on the *same* rig system with different definitions (one system, two citizens — the Individuality Principle applies to definitions, not to code).
- **Exists tonight:** for Solnik only, and real: the hand-drawn vector cartoon rig, live on all 7 doors (`solnik/solnik-toon.js` + `solnik/living-entity.js`, ~75 KB total system vs the ~5.4 MB 3-D stack it superseded — MEASURED) with the full movement vocabulary the FVR-31 order asks for in embryo — walk (300 px/s), run (620), climb, swing-in entrance, portal emerge/enter, wave, chuckle, talk loop with visemes, listening tilt, point/teach, operate/touch/inspect, sleep · the environment-interaction layer (two z-planes, `[data-solnik-occluder]`, portal anchors) · the D-01 demonstration: at the Mint Press his centre-body pixels measured 0.090 occluded vs 0.675 unoccluded (DEMONSTRATED, cartoon build log). The 3-D body survives as rollback (`living-entity-3d.js`). The engine's character-plane probe (`runProbe()`) proves any body mounted at `#solnik-mount` inherits occlusion and portal measurement without engine changes.
- **Missing:** the visitor avatar entirely — no rig, no definition, no selection chamber (Team C's build) · a second character on stage at once (Solnik + avatar walking together is unbuilt and unmeasured — the two-body cost is unknown) · avatar↔world occlusion proof for a body that is not Solnik · cinematic-quality judgment: the founder ruled the cartoon sheet "perfect" as a *character design*; whether its motion *feels* like an animated film beside him is O-1, still his device judgment, still owed.

### 2.4 SOLNIK INTELLIGENCE ENGINE — the mind

- **Job:** one mind for the inhabitant: knowledge of the real catalogue, prices and gates; conversation; guidance decisions (where to take the visitor, what to show, when to manifest a product); memory of the visitor he is with — the same mind in every place.
- **Inputs:** visitor speech/text · the Commerce Engine's catalogue truth (never his own copy of a price) · the World Engine's place state.
- **Outputs:** speech (live voice) + captions · intent orders to the Character Engine (go, point, operate, retrieve) · manifestation requests to the Magical Engine (product id) · travel requests to the World Engine.
- **Contracts:** the deterministic fences run *before* the language model (MEASURED pattern, below): memory isolation between visitors, knowledge accuracy (prices + purchasing state), security boundaries (never requests keys/credentials, never initiates transactions). Visitor memory and member identity are two stores that never silently merge (F0 §2.5). He never obstructs: his figure, captions and controls stay off text, prices and buttons (Promise-to-Function).
- **Exists tonight:** the brain service (`provadia-solnik-brain`, systemd on the house VPS, `wss://brain.provadiacoin.com`) with service-side verification PASS on record (2026-11-25): a planted secret (ZEPHYR-4411) never revealed across visitors · prices + gate-closed state answered correctly · the fence router ahead of the LLM · SQLite visitor memory (hospitality only). Voice today: the film voice is the Omni recording (Job 4, founder-ruled perfect, locked); the *live* voice is Piper on our own server; the free-tier Gemini key that would upgrade the live voice's sound is a founder step still waiting (the key walk — no payment, ever, per his 2026-11-25 ruling). Known debts, measured: barge-in ≈1,094 ms against a <120–150 ms target · LLM first audio ≈3,258 ms · per-door knowledge incomplete (Keeper prices).
- **Missing:** inhabitant-grade behaviour — the brain today answers and guides on a *page*; it does not yet direct a body through a journey, decide to walk to the library, or run a manifestation (the intent-order vocabulary above is this paper's proposal, not built) · graceful brain-down behaviour on the cartoon body in a live founder session (O-3, owed) · the typed-question drop defect (a question typed in the ~1–2 s before the socket connects is dropped after the "waking up" notice — known, unfixed, named here so it is not lost).

### 2.5 MAGICAL MANIFESTATION / SURFER ENGINE — the magic interface

- **Job:** the five acts as one reusable machine: scroll → golden energy → the product assembles → Surfer separation with golden threads and floating explanations → interaction and questions → reassembly → the real purchase presented in-world. One engine, every product: the product's own data changes, the physics does not.
- **Inputs:** a product's **Living Genome** record (the PALS pattern): its visual assets, its named components, what each component is and does, its price and purchase state — from the Commerce Engine.
- **Outputs:** a staged manifestation on the Cinematic stage (the product at centre, satellites on threads, callouts) · interaction events per component · a hand-off to Commerce for the actual transaction (the parchment is a *presentation* of the real till, never a second till).
- **Contracts:** it renders only what the Genome record declares — a component with no declared explanation gets no invented callout (the Receipt Law applied to theatre). It never states a price itself; prices render from Commerce data at the moment of display. It must work with Solnik absent (visitor taps the scroll themselves) — magic is the interface, Solnik is its best performer, not its single point of failure (INFERENCE).
- **Exists tonight:** the Surfer half, proven in production form: the **Universal Presentation Engine v1** (`presentation-engine/` — `engine/upe.js` 26.5 KB runtime, manifest-driven: `UPE.mount(section, manifest, houses)` builds the whole scroll journey from data; `MANIFEST_SPEC.md`; a defect library with 11 seeded defects and a manifest linter; an acceptance probe with hard assertions) generalized from the shipped Mint page — pinned centre → opens → separates into named parts held as satellites → callout with leader line + tip dot at each part's scroll moment → reassembles (DEMONSTRATED; the Mint manifest is written from the shipped page's real data). The Mint's Inspect overlay on the live listing is the same idea at page scale.
- **Missing:** the *summoning* half — scroll, golden energy, materialize-and-assemble as a staged event in the world (Team D's experiment) · the Genome records themselves at catalogue scale (the Mint has one; ~800 products do not — the record format exists via the manifest spec, the records do not) · in-world triggering (today the Surfer runs on scroll on a listing page; in the world it must run on Solnik's gesture or the visitor's tap, inside a stage, beside two characters) · proof that one engine holds individuality across very different products (the Individuality Principle — Guardian must *feel* different from Sentinel; demonstrated for two Mint-geometry variants only).

### 2.6 COMMERCE ENGINE — the till underneath

- **Job:** the truth about products and money: catalogue data, prices, purchase state, the transaction itself — fully functional, searchable and secure *underneath* the world, exactly as the founder ordered.
- **Inputs:** the existing tills (the town's listing pages + Shopify for the store) · catalogue records.
- **Outputs:** product truth to any engine that asks (name, price, purchase open/closed, the product's own page address) · the checkout hand-off.
- **Contracts:** see §6 — the world layer may *present* commerce; it may never *be* the only road to it.
- **Exists tonight:** the live listing system (the Mint listing at $245 / $196 with purchase disabled and gate-closed text intact — MEASURED) · the store's Shopify catalogue (394 products) · the Genome-adjacent data in listing manifests · PROVADIA20 proven live on the store.
- **Missing:** a single catalogue *service* the world engines can query (today product truth lives in page markup and manifests, read by eye) · Genome records at scale (shared with §2.5) · any in-world purchase *completion* (by design and by law: the parchment presents, the existing till transacts — SC classes and the Gatehouse fences in F0 §1.2/§1.4 are untouched by this paper).

### 2.7 IDENTITY / COMMUNITY ENGINE — the citizen

- **Job:** who the visitor is in the world: a guest instantly, a named character on choice, a saved citizen on account — and, later, citizens meeting citizens (the Agora's social life).
- **Inputs/outputs/contracts:** §5 carries the full design; the F0 Identity & Data Decision is its constitution and is not re-decided here.
- **Exists tonight:** the design, settled on paper (F0 §2): one account, members service as provider-interface, server holds only entitlements/membership/shared-or-receipted state, working data local-first. The service itself is *designed, not live* — members DB at 0, `/account/` is architecture not a page (MEASURED, F0 §2). The Agora exists as a live door with an honest empty floor (0 members, 0 threads — never simulated).
- **Missing:** the build (F2 in the F0 sequence, demand-gated there — §5 notes what FVR-31 changes and what it does not) · the guest-identity layer (new tonight, §5) · any visitor-to-visitor presence (a later universe, not the prototype's).

### 2.8 CINEMATIC MANUFACTURING FACTORY — the pipeline that feeds the world

- **Job:** turn founder credits and crew labour into *library assets with papers*: stills, films, posters, ambience — each examined, measured, filed and reusable by every engine. Team B owns the automation investigation; this paper fixes only the factory's *interface* with the world.
- **Inputs:** scenery stills (Genspark — 204 filed and ledger-counted tonight, batches #1–#11, MEASURED) · generation credits (Account 1: 9,960 · Account 2: 9,753 by the founder's own panel read tonight — ≈19,700 combined, MEASURED) · crew time.
- **Outputs:** assets in the Asset Library (`living-universe/ASSET_LIBRARY.md` — 39 films · 49 frame stills · 64 Genspark images at its Phase-1 count, since grown) with per-asset exam records (sound level vs the −30 dB Sound Gate · camera lock · bookend RMSE · keyframe scrub) — the examination discipline Jobs 1–4 passed through (all four: sound PASS, camera locked, filed to `living-universe/assets/`).
- **Contracts:** the factory ships *assets + measurements*, never claims. A film enters a config only with its measured `clipSeconds`; a loop enters only under the #120 gate (RMSE ≤ 8 hard-cut, else phase-offset crossfade). The factory never deploys; the world engines never generate.
- **Exists tonight:** the manual line, proven end-to-end four times (Jobs 1–4: brief → founder manufacture → captain examination → filing → ET-120 assembly) · the Sound Gate (automatic loudnorm fix under −30 dB, proven on Films 13/15/16) · the preservation system (the whole build tree under git in a private repo + an off-machine bundle whose restoration test passed byte-for-byte, 2026-11-25).
- **Missing:** automation itself — batch generation, storyboard-to-film, automated assembly/editing are Team B's investigation and are UNPROVEN tonight (§8) · a per-asset *cost ledger* joined to the library (credits per landed, examined asset — the numbers exist scattered across queue files, not in one book).

---

## 3. THE JOURNEY / ROUTE GRAPH — places are nodes, doors are edges

**The model (this paper's proposal, INFERENCE built on demonstrated parts).** The world is a directed graph declared as data, in the same spirit as universe configs:

- **Node = a place**: an id, a universe config (its dressed stage), its anchor graph, its Genome/institution identity. A node is a *stage that can be mounted*, nothing more mystical.
- **Edge = a crossing**: `{ from, to, viaAnchor, kind, film?, durationBudget }`. Kinds: **portal** (a door; may carry a crossing film, as Record→Mint already does), **street** (a connecting stage of its own — a short walkable node with two doors), **tunnel/stair** (a portal with a longer film and a stronger transformation), **gate** (a portal with a state condition — e.g. the Gatehouse's rules; conditions are read from the owning engine, never invented by the graph).
- **The graph is validated like a config** (the engine already validates anchors/portals/coprime cycles at mount): every edge's `to` must exist, every portal anchor must be claimed by exactly one edge, no place may be unreachable from the entrance, and a place with no road back must declare itself a deliberate dead-end. A broken map fails at load, not at the visitor's feet.
- **Travel is a transaction**: lock input → play the edge (film or choreographed walk) → the destination stage mounts *underneath* the crossing (preload is the fix for NC-06) → arrival event → unlock. A failed film degrades to the iris; a failed mount degrades to the place's poster + a plain link (the visitor is never stranded in a doorway — the existing portal law, extended).
- **Solnik and the avatar travel as passengers of the same transaction**: the Character Engine receives the edge's path (exit anchor → crossing behaviour → entry anchor), so "Solnik opens the door and walks through with you" is one choreography, not two systems improvising.

**Worked example — the Order 7 route:**

```
CHARACTER CHAMBER ──gate──► KINGDOM GATE ──street──► THE STREET ──portal──► ENCHANTED LIBRARY ──► MANIFESTATION
   (node: chamber)            (node: gate)             (node: street)          (node: library)        (an event, not
                                                                                                    a place: §2.5
   avatar chosen here         Solnik's Grand           fountain = real-time    the catalogue:          staged inside
   guest or named             Arrival plays here       particles + film        shelves = anchors;      the library)
                                                       backdrop                books = products
```

Asset truth for this route, tonight: the **Library** has its scenery master *in production this very night* (Job 5, the Reading Room — the last clip of the old queue, completing under FVR-31's own status note; its machinery and portal, Jobs 6–7, are HELD under Order 3) · the **Kingdom Gate** has stills in the library (batch #4's town-gate stills; Job 3's crossing film already depicts arriving *through* a gate into the Mint and is the proven pattern for a gate edge) · the **Street** and the **Chamber** have scenery stills across the Genspark batches but no films and no configs yet — they are config-writing work, not generation work, for the prototype · the **Manifestation** target product is the Mint, the one product with a complete Genome/manifest record and a shipped Surfer journey. The route is therefore buildable tonight from stock: two new configs (Chamber, Street), one gate edge reusing Job 3's pattern, the Record config re-dressed as the Library (its reading-room film is literally in production), and the Mint's existing Surfer manifest as the manifestation.

---

## 4. FILM vs REAL-TIME — the split rules and the credit law

**The founder's rule, restated as engineering law:** *never spend credits on ordinary repetitive movement the engine can produce itself.* The split:

| Class of motion | Road | Why / evidence |
|---|---|---|
| A place's *identity* — the look you remember (forge hall, reading room, gate at dawn) | **Film** (A→A master, 8 s, phase-offset crossfade) | Only generation gives this richness today; the loop machinery is DEMONSTRATED (ET-120). One film per place, reused forever. |
| Crossings with a transformation (through the gate, down the stacks) | **Film** (start-only, trimmed window on the edge) | Job 3 proved the pattern (threshold transformation at 3.0–3.5 s, window 2.4→5.3 s). |
| A named inhabitant's one-time moments (the Grand Arrival) | **Film**, once per session, skippable | Job 4. One-time = film is honest; repetition would expose it. |
| Machinery *cycles* (press, sealing bench) | **Film today** — one full honest cycle, coupled to the master clock | Jobs 2 proved it. (A real-time rig for the press is possible later; the film is already paid for.) |
| Dust, sparks, motes, ember drift | **Real-time** (canvas particles, 2 renderers) | DEMONSTRATED in the engine; costs 0 credits forever. |
| Light breathing, glow, shade shifts | **Real-time** (free layers, coprime periods) | DEMONSTRATED (lighting cycles, ET-120-B). |
| Water flow, flame flicker, fountain spray, tree sway, cloth | **Real-time — TARGET, partially unproven** | Inside films today. As engine systems: NOT yet built. The honest prototype move is film for the hero instance (the fountain *in* the street film) + particles/light over it; a true real-time water/flame system is a named build, not a claim (§8). |
| Characters — walking, gesturing, speaking, accompanying | **Real-time, always** | A film cannot walk beside a visitor who chooses their own road. The cartoon rig is the demonstrated base. |
| Product manifestation — assembly, separation, threads, callouts | **Real-time, always** | It must serve ~800 products from data; per-product films are the exact waste Order 6 forbids. The Surfer runtime is the demonstrated base. |
| Weather, day/night drift, seasons | **Real-time** (palette + lighting state) | Config data + free layers; no generation. |

**Credit logic (the arithmetic the partners are asked to attack):** a place costs **one** scenery master (~10 credits at Veo Fast 8 s) + optionally one machinery cycle (~10) + one crossing film per *edge that transforms* (~10) — call it **10–30 credits per place, once, forever** (MEASURED prices from Jobs 1–4: 10 per Veo Fast clip; Omni priced by length, 60 for 15 s — Omni is reserved for voiced character moments, never scenery). At that rate the ≈19,700-credit pool covers the entire town's places many times over; the pool's real scarcity is not credits but *examined, filed* assets (each film costs founder/captain examination time). The old road — a film for every image (1,000 images → 1,000 films ≈ 10,000 credits + 1,000 examinations) — is what Order 3 suspends, and this table is why: most of those films would have bought movement the engine does for free.

---

## 5. IDENTITY — guest first, name on choice, account on request

Riding unchanged: the F0 Identity & Data Decision (one account · members service as provider-interface · server holds only entitlements, membership, shared-or-receipted state · working data local-first) and the Offline Line (§6 fences). FVR-31 adds one layer *below* the account, and this paper settles its shape:

1. **Guest (no gate).** A visitor enters, chooses an avatar in the Chamber, picks a *display name* (or takes a generated one), and walks the kingdom — including manifestations and the parchment. The guest identity lives **on the device** (local-first by the F0 pattern): avatar choice + name + preferences in local storage. It authenticates nothing, entitles nothing, and is never presented as an account. This is the founder's guest option made structural: registration is an *upgrade offered*, never a door closed.
2. **Named (still no account).** The display name is how Solnik greets them and how their avatar is labelled. Solnik's visitor memory (hospitality store, F0 §2.5) may remember the greeting on that device/service — it confers nothing and proves nothing.
3. **Citizen (the F0 account).** When the visitor chooses to keep the character across devices, buy, or join the Agora as a member, the members-service account is created and the local guest identity is *attached* to it (avatar id + name carried over — the character they already are, kept). The account's build remains F2 in the F0 sequence and demand-gated as F0 §5.3 rules; **what FVR-31 changes**: the *guest layer* is prototype-scope tonight because the Order 7 journey begins in the Chamber — it needs no server, no CORS patch, no deployment, and it must be built so the F2 account can adopt it without a second identity system (the F0 §2.1 warning against building registration before the contract applies to guests too: the guest record's fields are drawn against the §2.2/§2.3 map now, on paper, before Team C builds).
4. **The fences, verbatim in effect:** offline, identity is what the device holds (guest state, owned instruments) — entitlement checks, till state and verification verdicts fail closed or render as dated copies (F0 §3.4). No module holds keys or asks for signatures; the Gatehouse's Lock → Sign → Persist → Broadcast → Verify is untouched; SC-3 runs live or not at all. An avatar is a *costume and a name*, never a credential: no purchase, gate or eligibility may ever be authorized by "the avatar was present."

---

## 6. COMMERCE UNDERNEATH — the world never obstructs the till

Promise-to-Function, applied to the overhaul:

- **Every product keeps its own searchable address.** F0 §3.1 (URLs never move) is the law the world is built on: the route graph is an *additional* road into each place, never a replacement for its address. A search engine, a shared link, or a visitor with motion off lands on the same product truth.
- **The stage is structurally incapable of covering the till.** Page content lives outside the stage at z ≥ 100; the arrival film sits at z 150 *inside* the stage, below the visitor controls; occluders exist only inside the stage element. This is not a style rule — it is the engine's construction, test-asserted (README contract; ET-120). The overhaul inherits it: no manifestation, character or journey element may render over a price, a purchase control or body text. Solnik's own live history is the cautionary record (his figure once covered the Mint's price paragraph — a named defect, fixed by perch retargeting; the fix is why this rule is structural now, not aspirational).
- **Purchase state is Commerce truth, rendered at display time.** If purchasing is closed, the parchment says closed — the manifestation may be magical, the facts may not be. Prices in-world come from the same data as the listing page; a disagreement between the two is a defect under Zero Known-Defect, blocking, not cosmetic.
- **The degraded roads are first-class.** Motion off → posters + full content, zero video bytes. No JS world → the listing stands. Screen reader → the anchors are real DOM, keyboard-operable doors; the manifestation's callouts are text, not only theatre. A visitor who wants *only* the till gets it in one click from anywhere in the world (the direct commercial access the Grand Arrival law already demands).

---

## 7. MOBILE / PERFORMANCE BUDGETS (PIS-01, binding)

From `PIS01_DIRECTIVE_2026-11-25.md` §4 — these are the numbers the architecture is judged against, not aspirations:

| Budget | Number | Where the architecture stands tonight |
|---|---|---|
| Desktop real-time animation | 60 FPS target | Engine rAF discipline built for it; **not device-measured** |
| Mobile animation | stable 30 FPS min, 60 preferred | **UNVERIFIED** — no device leg has run |
| Cinematic video | 24–30 FPS | Met by construction (takes are 24 fps) |
| Initial load | ≤ 2.5 s | Poster-first + lazy standby loading built; not device-measured |
| Interaction responsiveness | ≤ 200 ms · visual feedback < 100 ms | Portal/mount path not yet measured on device |
| Layout stability | CLS ≤ 0.01 (internal target; partner-noted as ambitious) | Transform-only layers, CLS-safe by construction |
| Visible loop interruptions | zero | 60 s headless leg: seams PASS, sync PASS, black frames PASS (ET-120) |
| Broken environmental interactions | zero | Anchor/interact contracts validated in tests |
| Character clipping | zero known defects | D-01 demonstrated for Solnik; avatar unbuilt |
| Mobile initial transfer | ≤ 1.5 MB | **The known collision**: motion-off visitors fetch 0 video bytes, but a motion-on Mint stage carries two 1080p films (12.3 MB + 7.7 MB files) — the budget forces mobile encodes/poster-first discipline per place; this is a Factory spec decision, still open |
| Sound | user-controlled, synchronized | Off by default, honest enable; coupled layers on one master clock |
| Extended operation | 30-min stability + thermal test | **UNVERIFIED** — 5-min and 30-min legs unrun anywhere (ET-120 open items) |

The architecture's answer to the transfer/FPS squeeze is the split in §4: a place's *first paint* is palette + poster + still (kilobytes-to-light), films lazy-load, particles are canvas (no assets), characters are a ~75 KB vector system. Whether that holds 30 FPS beside two characters on an ordinary phone is a measurement the prototype must produce, not a sentence in this paper.

---

## 8. WHAT IS UNPROVEN TONIGHT — the honest section

No invented capabilities. Each item: the claim we *cannot* yet make, and the test that would earn it.

1. **Cinematic-quality real-time avatars.** Solnik's cartoon rig is demonstrated as a *character*; a visitor avatar at animated-film quality — walking beside Solnik, occluded by the world, speaking the visitor's chosen name in the greeting — is UNPROVEN. The founder's own standard ("not a cheap browser game") has no passing specimen yet. *Test:* Team C's first avatar on the Order 7 route, judged by the founder on his device (motion verdicts are his-device-only — house law from the cloud-browser motion failures).
2. **Two bodies, one stage, ordinary phone.** All performance evidence tonight is one character (or a probe token) in a headless sandbox that already fails pacing/buffering with two 1080p decoders. Solnik + avatar + two films + particles at a stable mobile 30 FPS is UNPROVEN; the NC-08 stall observation (in-environment, root cause unisolated) rides with it. *Test:* the device legs — 60 s / 5-min / 30-min on a real phone, the continuity harness already exists (`specimen-mint/continuity.html`).
3. **Long-form and automated cinematic manufacturing.** Flow Agent workflows, storyboard-to-film automation, video extension chains, automated editing/continuity: **none of it has been exercised by this house.** What is demonstrated is the *manual* line (four films) and one hard limit learned by measurement: these takes carry ~1 keyframe, so any pipeline that seeks, trims by seeking, or re-times naively will break on our own footage (ET-120 defects 1–2). *Test:* Team B's investigation, with evidence, before any automation claim is made to the founder.
4. **Gaussian Splatting / WebGPU / real-time 3-D worlds.** Named in the founder's investigation list; in this house: zero builds, zero measurements. Three.js (2-D-composited stages + single-object scenes) is the only demonstrated 3-D. Splatting's mobile cost, tooling maturity for our pipeline, and fit with the occlusion/anchor contracts are all UNPROVEN. *Test:* a single-room splat prototype measured against §7 budgets — a Team B/Gemini question, not a Team A assumption.
5. **Real-time water, flame, cloth.** §4 assigns them to real-time as a *target*; as engine systems they do not exist (they live inside films today). *Test:* one system (the Street's fountain) built and measured; until then the prototype uses film + particles and says so.
6. **The ≤1-frame coupled steady state on a real device.** Mechanism proven, number not demonstrated (headless worst inter-layer error 0.18 s under decode starvation). Carried from ET-120 open item 1, still open.
7. **Solnik as journey director.** The brain is verified as a *conversational* service (isolation, accuracy, fences). Directing a body through a multi-place journey, timing a manifestation to a conversation, and behaving gracefully when the brain is down *mid-journey* are UNPROVEN (O-3 is the standing owed session).
8. **The visitor's first impression of everything above.** PIS-01's deciding evidence — the founder entering the specimen unbriefed — is still owed for the *current* assembly; for the Order 7 journey it cannot exist until the prototype does. No immersion level is claimed for any of this paper's architecture. The Mint specimen's standing grade (Level 3 HIGH-END, provisional, 7 PASS / 3 FAIL / 5 UNVERIFIED at reconciliation) describes the *old* construction and does not transfer.

**The three sharpest open risks** (also reported to the captain with this paper): **(R1)** the two-body mobile performance wall — if Solnik + avatar + films cannot hold §7 on an ordinary phone, the whole inhabitation pillar degrades to posters, and we would learn it late unless the device leg runs *first* in the prototype sequence. **(R2)** the avatar quality gap — the distance between our demonstrated vector rig and "animated movie" is a founder-judged feeling, and it is the pillar most likely to fail his eye even if every number passes. **(R3)** manufacturing automation may simply not exist in usable form on our accounts (Team B's question) — if it does not, the factory stays manual, place production stays examination-bound, and any schedule promised on automation collapses; the architecture above is deliberately survivable under a manual factory (10–30 credits/place, config-first), but the *pace* claims in any plan must not assume automation until it is evidenced.

---

## 9. THE CAPTAIN'S DRAFT ANSWERS TO THE FOUNDER'S TEN QUESTIONS (directive §8)

Drafts for partner challenge — Gemini and ChatGPT hold their own seats; nothing here is the joint verdict until they have attacked it.

1. **Can we manufacture one continuous cinematic universe instead of thousands of disconnected clips?** — **Yes, as a composited world of dressed stages joined by directed crossings** (INFERENCE on DEMONSTRATED parts: the stage engine, portal films, master clock). "Continuous" means the visitor never sees a seam, a restart or a page — it does not mean one endless film, and no road we can evidence produces one.
2. **Fastest technically achievable method?** — The §1 decision: extend the existing engine (graph + journey director + character system + manifestation stage), configs before generation, existing assets first. It is fastest because its hardest sub-problem (seamless looping places) is already solved and test-verified; every alternative starts that problem over.
3. **How much production can be automated?** — **UNPROVEN.** The examination/filing half is already systematic (Sound Gate, RMSE gate, clip-truth); the generation half is manual and its automation is Team B's open investigation. Any percentage tonight would be invented.
4. **Best use of the ~20,000 credits?** — §4's arithmetic: ~10–30 credits per place (scenery + machinery + transforming crossings), Omni reserved for voiced character moments, zero for repetitive motion. Measured pool ≈19,700 (9,960 + 9,753). On this logic credits stop being the constraint; examination time becomes it — which is the honest bottleneck to manage.
5. **Cinematic quality *with* genuine interaction?** — Yes at the *place* level (demonstrated: films + anchors + occlusion + a character who operates instruments). UNPROVEN at the *journey* level (multi-place, two characters) until the Order 7 prototype is judged.
6. **Smooth on ordinary phones and computers?** — **UNPROVEN** (§7, §8.2). The architecture is built to the budgets (poster-first, lazy film, canvas particles, vector characters, DPR cap); no device measurement exists yet. This is the first prototype measurement, not the last.
7. **Ownership / no provider dependence?** — The world, engine, configs, Genome records and library are ours, in our repo, restorable byte-for-byte (preservation test PASSED). Providers manufacture *replaceable inputs* (stills, films); if Flow vanished tomorrow, every landed asset and the whole engine survive — only new-film production would need a new instrument. Identity follows the F0 provider-interface rule. The one real dependence: the single house VPS concentrates brain + members + Gatehouse (§8/F0 §4 quotas ride unchanged) — named, not solved, and not worsened by this paper.
8. **What existing work is reused?** — Nearly everything, concretely: the stage engine whole · both built universes + 4 stub configs · Jobs 1–4 films · the cartoon Solnik + his anchor contract · the brain service + fences · the Universal Presentation Engine (the Surfer) + the Mint manifest · the Asset Library + 204 filed stills · Films 01–16 as place/edge stock · the F0 paper as constitution · the preservation system. What is *retired*: page-by-page dressing as the primary method, and the Record's interim boomerang when its founder take lands.
9. **Real costs, times, limitations?** — Cash: $0 (Order 11). Credits: §4. Time: this paper gives no crew-day figure for the overhaul — the F0 paper's 8–14 crew-days covered F0–F2 of the *old* sequence and does not transfer; a sequenced estimate is Order 10 deliverable 8 and must be built from the prototype's measured pace, not extrapolated tonight. Limitations, plainly: 2 particle renderers + 3 occluder motifs of vocabulary · ~1-keyframe footage that forbids naive seeking · a single-VPS concentration · a members service still at zero · device performance unmeasured.
10. **Smallest complete journey that proves the architecture?** — Order 7 exactly as the founder scoped it: **one avatar, one route (Chamber → Gate → Street → Library), one product (the Mint), one manifestation** — with three measurements attached or it proves nothing: the device continuity legs on that route, the two-body frame rate, and the founder's unbriefed first impression. If those three pass, the architecture is proven at specimen scale and expansion is an engineering program; if any fails, we learn it on one route instead of on a kingdom.

---

## 10. WHAT THIS PAPER ASKS OF THE OTHER SEATS

- **Team B (Cinematic Factory):** §8.3 is yours — evidence on Flow Agent / extension / batch automation, or an evidenced "it does not exist on our accounts." §4's split table is the demand your pipeline must serve.
- **Team C (Characters):** §2.3's contract is your interface; §8.1–8.2 are your proving tests. The guest record fields (§5.3) need your build list checked against the F0 data map before code.
- **Team D (Manifestation):** §2.5 — the summoning half is the experiment; the Surfer runtime and manifest spec are your floor.
- **Team E (Verification):** §7's table is the checklist; the device legs are the first assignment, ahead of any expansion build.
- **Gemini (#123) / ChatGPT:** §1's 2.5-D decision, §4's credit arithmetic and §9's drafts are written to be challenged. Challenge them with evidence and this paper revises; the destination (FVR-31) does not move.

*— Team A, World Engine seat. Paper only; nothing built, deployed or spent under it.*

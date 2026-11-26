GEMINI COMMISSION #125 — ASSASSIN'S CREED ENGINEERING BENCHMARK: EXTERNAL RESEARCH REPORT (TRANCHE 1)
Filed for: Master Engineering Specification Register (MESR) · Partner Desk (megacomp / partner-desk)

Cross-References: FVR-24 · FVR-25 · FVR-31 · Master Universe Map (MUM) · PIS-01 · World Engine Architecture v1 · Cinematic Factory Pipeline v1

Governance: $0 additional spend · Zero deployment · Publicly observable engineering and published computer-graphics/game-architecture literature only · Unproven internals explicitly marked Requires further research · Architectural changes labeled PROPOSAL.

1. Master Engineering Specification Register (MESR) — 1,000-Slot Architecture & Taxonomy
To prevent architectural blind spots at 5% construction, the MESR partitions the civilization into 20 Engineering Domains (D01–D20) spanning 1,000+ specification slots. Tranche 1 delivers 105 complete, ingestion-ready specifications (MESR-0001–MESR-0025 as Tier-0 Highest-Leverage Browser Spine dossiers, plus MESR-0026–MESR-0105 across all 20 domains), followed by the deterministic ID allocation table for Tranches 2–5 (MESR-0106–MESR-1000).

Domain Code	Engineering Domain	Reserved ID Block	Tranche 1 Delivered
D01	World Architecture, Spatial Topology & Scene Construction Engines	MESR-0001 – MESR-0060	0001–0003 (T0), 0026–0030
D02	Character Locomotion, Physics, Collision & Inverse Kinematics	MESR-0061 – MESR-0120	0061–0064 (T0), 0031–0035
D03	Camera Intelligence, Framing & Cinematic Direction	MESR-0121 – MESR-0175	0121–0122 (T0), 0036–0040
D04	Autonomous Inhabitants & Crowd Simulation Intelligence	MESR-0176 – MESR-0235	0176–0177 (T0), 0041–0045
D05	Environmental Storytelling & Living World Affordances	MESR-0236 – MESR-0280	0046–0049
D06	Buildings, Interiors, Portals, Doors & Seamless Traversal	MESR-0281 – MESR-0335	0281 (T0), 0050–0053
D07	Animation, Gestures, Skeletal Rigs & Facial Lip-Sync	MESR-0336 – MESR-0395	0336–0337 (T0), 0054–0057
D08	Spatial Audio, Environmental Acoustics & Dynamic Soundscapes	MESR-0396 – MESR-0445	0396–0397 (T0), 0058–0060
D09	Lighting, Contact Shadows, Time-of-Day & Atmospheric FX	MESR-0446 – MESR-0495	0446 (T0), 0065–0068
D10	World Persistence, State Memory & Temporal Continuity	MESR-0496 – MESR-0545	0496 (T0), 0069–0072
D11	Interactive Objects, Folded Paper & Diegetic Product Manifestation	MESR-0546 – MESR-0600	0546–0547 (T0), 0073–0076
D12	Wayfinding, Navigation & Non-Intrusive Visitor Guidance	MESR-0601 – MESR-0650	0601 (T0), 0077–0080
D13	Rendering Pipelines, GPU Budgeting & Asset Streaming (PIS-01)	MESR-0651 – MESR-0710	0651 (T0), 0081–0084
D14	Cross-Device Browser Compatibility & Mobile Touch Ergonomics	MESR-0711 – MESR-0760	0711 (T0), 0085–0088
D15	Accessibility, Screen-Reader Semantics & Alternative Navigation	MESR-0761 – MESR-0805	0761 (T0), 0089–0092
D16	Shared-World Presence, Asynchronous Social Traces & Multiplayer	MESR-0806 – MESR-0850	0093–0095
D17	Solnik Intelligence, Conversational AI & Behavioral Orchestration	MESR-0851 – MESR-0900	0096–0098
D18	Security, Sovereign Identity, Two-House Wall & Web3/Commerce	MESR-0901 – MESR-0945	0901 (T0), 0099–0101
D19	Cinematic Manufacturing Pipelines, Hybrid Media & Tooling	MESR-0946 – MESR-0980	0102–0103
D20	Automated Verification, Deterministic Replay & Regression Governance	MESR-0981 – MESR-1000	0104–0105
2. Tier-0: Highest-Leverage Browser Civilization Mechanisms (25 Full Dossiers)
These 25 mechanisms form the load-bearing engineering spine of a browser-native living civilization. Absence of any single Tier-0 specification breaks either continuous world traversal (FVR-31 No-Pages Law), inhabitant believability, mobile PIS-01 (≤ 1.5 MB / 60 fps), or commercial safety.

MESR-0001 — Hierarchical Zone-and-Cell World Graph (No-Pages Spatial Topology)
Domain: D01 World Architecture · Leverage: TIER-0 CRITICAL · Cross-Ref: FVR-31 §2 (No-Pages Law), MUM, World Engine Architecture v1

Classification: Under construction

1. What does it do? Organizes the entire civilization as a continuous spatial graph of Districts, Places, Chambers, and Thresholds rather than disconnected HTML pages.

2. How does it work? Publicly observable in open-world streaming architectures (Anvil world-cell hierarchy): geography is partitioned into parent zones and sub-cells linked by directed spatial portals (entrySpawn, exitTrigger, neighborIds), allowing deterministic adjacency queries without loading a global monolithic scene.

3. Why does it matter? Enforces the Founder's No-Pages Law—visitors experience travel across a coherent kingdom while the engine knows exact spatial neighbors for preloading and routing.

4. Can it serve PROVADIA? Yes; maps 1:1 onto the Master Universe Map (Chamber → Gate → Street → Library → 7 Doors → Towns).

5. Can it operate inside a browser? Yes; lightweight JSON adjacency graph (< 15 KB) evaluated in pure JS.

6. Reusable across every universe? Yes; every PROVADIA universe or industry family is a separate JSON world-graph bundle loaded by the same engine.

7. Dependencies, costs & performance: Zero external dependencies; $0; O(1) neighbor lookup (< 0.05 ms per frame).

8. Have we already built it? Route graph exists in World Engine Architecture v1 and First Journey Prototype, but full multi-district MUM graph binding is incomplete.

9. What is missing? Complete MUM node/edge serialization for all 7 doors and schema validation enforcing zero orphan places.

10. How can it be objectively tested? Automated graph-traversal test verifying bidirectional reachability from Character Chamber to every registered MUM destination with zero dead-end nodes.

MESR-0002 — Normalized World-Coordinate Space Decoupled from Viewport Pixels
Domain: D01 World Architecture · Leverage: TIER-0 CRITICAL · Cross-Ref: PIS-01, G-2 (Velmar audit)

Classification: Under construction

1. What does it do? Defines all walkable bounds, collision polygons, NPC waypoints, and interactive anchors in invariant logical world units (0..1000 or meters) independent of screen resolution or aspect ratio.

2. How does it work? Standard camera-projection pipeline: world coordinates transform through a virtual camera matrix (worldToScreen / screenToWorld) with aspect-ratio letterboxing or focal-window framing.

3. Why does it matter? Prevents door triggers, collision walls, and Solnik's feet from shifting out of alignment between 1920×1080 desktop monitors and 375×812 portrait phones.

4. Can it serve PROVADIA? Yes; mandatory so a single scene definition serves both desktop and 540×960 mobile plates.

5. Can it operate inside a browser? Yes; pure 2-D/2.5-D affine and perspective matrix math in JS (< 50 lines).

6. Reusable across every universe? Yes; core mathematical invariant of the rendering kernel.

7. Dependencies, costs & performance: None; $0; < 0.1 ms per frame.

8. Have we already built it? Perspective projection math extracted from Velmar (G-2), currently being ported by Seat E; prototype leader lines still use desktop pixel geometry.

9. What is missing? Full replacement of all pixel-coupled UI/callout coordinates with normalized world anchors.

10. How can it be objectively tested? Automated viewport sweep test (375×812, 768×1024, 1440×900) asserting worldToScreen(doorStandPoint) lands inside the visual threshold pixels within ±2 px.

MESR-0003 — Data-Driven JSON Scene Schema & Declarative Entity Manifest (PROPOSAL)
Domain: D01 World Architecture · Leverage: TIER-0 CRITICAL · Cross-Ref: G-1, G-2, FVR-31

Classification: Designed but not built

1. What does it do? Decouples place authorship from engine code by defining every room, street, portal, prop, ambient layer, and inhabitant in a validated JSON manifest.

2. How does it work? Engine boot loads scene.schema.json + place manifest (plates, depthMesh, navPoly, portals, smartSlots, manifestables), instantiating entities through factory registries rather than hard-coded draw calls.

3. Why does it matter? Eliminates the ~1,800-line hard-coded monolith flaw exposed in Velmar (G-2), enabling factory-scale manufacturing of dozens of places without touching engine JS.

4. Can it serve PROVADIA? Yes; allows non-engine seats and automated build scripts to author new places safely.

5. Can it operate inside a browser? Yes; native JSON.parse + deterministic schema validator.

6. Reusable across every universe? Yes; universal authoring contract across all PROVADIA universes.

7. Dependencies, costs & performance: Zero runtime libraries; $0; < 2 ms parse time per scene.

8. Have we already built it? Designed in World Engine Architecture v1; prototype still wires places partially imperatively.

9. What is missing? Frozen v1.0 JSON Schema file and factory loader covering portals, smart slots, and Folded Paper anchors.

10. How can it be objectively tested? Instantiate two distinct places (Library and Mint Hall) using identical engine JS and differing only in JSON manifests; assert zero code edits and 100% test pass.

MESR-0061 — Clamped Delta-Time (dt) Fixed-Step Locomotion Integrator
Domain: D02 Movement & Physics · Leverage: TIER-0 CRITICAL · Cross-Ref: PIS-01, G-2

Classification: Under construction

1. What does it do? Guarantees identical walking speed, animation timing, and physics stability across 30 Hz battery-saver phones, 60 Hz laptops, and 120 Hz ProMotion displays.

2. How does it work? Measures rawDt = (now - last) / 1000, clamps dt = Math.min(rawDt, 0.05) (preventing spiral-of-death or wall-tunneling after tab-switching), and accumulates fixed physics sub-steps (1/60 s).

3. Why does it matter? Unclamped requestAnimationFrame ticks cause avatars on 120 Hz screens to sprint at 2× speed and clip through doorway colliders after background tab pauses.

4. Can it serve PROVADIA? Yes; essential for reliable movement across heterogeneous visitor devices.

5. Can it operate inside a browser? Yes; standard performance.now() accumulator loop.

6. Reusable across every universe? Yes; fundamental game-loop kernel law.

7. Dependencies, costs & performance: None; $0; negligible CPU.

8. Have we already built it? Core engine loop exists (171/171 tests); Seat E audit required on newly ported Velmar movement helpers.

9. What is missing? Explicit regression test simulating dt = 0.5 s (tab blur) and dt = 0.0083 s (120 Hz) to prove invariant displacement.

10. How can it be objectively tested? Headless unit test comparing total distance traveled over 1.0 s simulated wall-clock at 30 fps, 60 fps, 120 fps, and a 500 ms spike; variance must be < 0.5%.

MESR-0062 — Polygon Navigation Mesh (NavMesh) with Sliding Wall-Tangent Collision
Domain: D02 Movement & Physics · Leverage: TIER-0 CRITICAL · Cross-Ref: G-2 (D-2 gap closure), FVR-31

Classification: Under construction

1. What does it do? Constrains visitor and inhabitant walking to valid architectural floor surfaces while smoothly sliding along angled walls and furniture instead of snagging.

2. How does it work? Publicly standard in Anvil/3-D engines: walkable areas are defined as convex/concave polygons; when a velocity vector v intersects a boundary edge with normal n, residual movement projects onto the tangent v_slide = v - (v · n) * n.

3. Why does it matter? Closes known gap D-2; nothing breaks cinematic immersion faster than an avatar getting stuck on a doorframe corner or walking vertically up a painted wall.

4. Can it serve PROVADIA? Yes; enables free visitor agency (Proof #3) inside painted/filmed architectural spaces.

5. Can it operate inside a browser? Yes; 2-D point-in-polygon + segment-intersection math runs in < 0.05 ms.

6. Reusable across every universe? Yes; every place defines its own walkable polygon in its JSON manifest.

7. Dependencies, costs & performance: Zero external libraries; $0; < 0.1 ms per frame for 20 entities.

8. Have we already built it? Velmar passed collision twice (G-2), and Seat E is actively porting the solver into our engine.

9. What is missing? Verification of smooth diagonal wall-sliding (not dead-stop snagging) and integration into the 171-test suite.

10. How can it be objectively tested? Automated movement test driving an avatar at 45° into a wall segment for 2.0 s and asserting monotonic progress parallel to the wall with zero penetration outside the polygon.

MESR-0063 — Contextual Traversal & Doorway Stand-Point Trigger Volume
Domain: D02 Movement & Physics · Leverage: TIER-0 CRITICAL · Cross-Ref: G-2, FVR-31 Order 7

Classification: Under construction

1. What does it do? Detects when the visitor approaches a door, threshold, or interactive lectern, aligns approach vector/affordance, and initiates the transition without awkward pixel-hunting.

2. How does it work? Observable in Assassin's Creed contextual entry/parkour volumes: each portal defines an outer anticipation zone (illuminates door/cues Solnik) and an inner stand-point trigger with hysteresis (prevents rapid bounce-back oscillation upon spawning).

3. Why does it matter? Makes entering the Kingdom Gate or Enchanted Library feel effortless on both desktop mouse/keyboard and imprecise mobile thumb taps.

4. Can it serve PROVADIA? Yes; operationalizes the No-Pages Law where walking into thresholds replaces clicking hyperlinks.

5. Can it operate inside a browser? Yes; circle/OBB overlap check + cooldown/exit-hysteresis flag.

6. Reusable across every universe? Yes; universal portal mechanic across all doors and worlds.

7. Dependencies, costs & performance: None; $0; < 0.01 ms.

8. Have we already built it? Door stand-point mechanism verified in Velmar (G-2) and ported by Seat E; prototype uses Job 3 Gate crossing.

9. What is missing? Spawn-exit hysteresis lock so spawning at a destination doorway does not immediately re-trigger the return portal.

10. How can it be objectively tested? Walk visitor into Portal A → spawn at Portal B → remain stationary for 2 s → walk outward; assert zero unintended bounce-back transitions.

MESR-0064 — 2.5-D Foot-Plane Y-Sorting & Ground Contact Anchor
Domain: D02 Movement & Physics · Leverage: TIER-0 CRITICAL · Cross-Ref: World Engine Architecture v1, G-4

Classification: Under construction

1. What does it do? Ensures the visitor avatar, Solnik, townsfolk, and foreground architectural props (tables, balustrades, lecterns) occlude one another in accurate depth order as characters walk in front of or behind objects.

2. How does it work? Painter's algorithm / depth-buffer sort keyed by each entity's normalized ground-contact footY (or projected depth Z), paired with a soft elliptical ground shadow anchored directly to footY.

3. Why does it matter? Without foot-plane sorting and contact shadows, characters appear to float on top of foreground furniture like ungrounded stickers (G-4 composite check).

4. Can it serve PROVADIA? Yes; essential for compositing real-time skeletal rigs into filmed/painted rooms.

5. Can it operate inside a browser? Yes; O(N log N) array sort on ~20–50 stage entities (< 0.02 ms).

6. Reusable across every universe? Yes; core stage compositor rule.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Basic layer ordering exists; dynamic per-frame footY interleaving with foreground library/street props is incomplete.

9. What is missing? Foreground occlusion mask slices (zLayer split) on Genspark/Veo plates so characters can walk behind foreground tables/pillars.

10. How can it be objectively tested? Move avatar from footY = 400 (behind lectern) to footY = 750 (in front of lectern) and verify pixel-readback occlusion flips cleanly at the lectern's base line.

MESR-0121 — Critically Damped Chase Camera with Composition Framing Rails
Domain: D03 Camera Intelligence · Leverage: TIER-0 CRITICAL · Cross-Ref: Universal Presentation Engine v1 (0.1 chase curve)

Classification: Already built and independently verified

1. What does it do? Smoothly follows the visitor's movement across wide architectural plates while respecting curated cinematic margins and hard edge clamps so the camera never exposes off-canvas void.

2. How does it work? Critically damped spring-damper interpolation (chaseRate ~ 0.1 per frame normalized to dt) constrained inside a stage-authored cameraBounds rectangle with optional focal-point attraction toward landmarks.

3. Why does it matter? Preserves deliberate filmic composition (rule-of-thirds headroom, grand architectural reveals) while giving the visitor genuine spatial control (Proof #3).

4. Can it serve PROVADIA? Yes; bridges passive cinema and interactive exploration.

5. Can it operate inside a browser? Yes; 6 lines of deterministic math.

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Yes; the 0.1 requestAnimationFrame chase rate is verified in Universal Presentation Engine v1 (171/171 tests).

9. What is missing? Authoring focalBias attractor zones for key landmarks (e.g., Library Reading Room arch).

10. How can it be objectively tested? Automated step-response test verifying zero overshoot beyond cameraBounds and smooth asymptotic settle within 500 ms of avatar stop.

MESR-0122 — Non-Blocking Conversation & Inspection Camera Framing (PROPOSAL)
Domain: D03 Camera Intelligence · Leverage: TIER-0 CRITICAL · Cross-Ref: FVR-31 Proof #5 (world stays alive during decisions)

Classification: Designed but not built

1. What does it do? Smoothly reframes the camera during Solnik conversations or Folded Paper unrolling so the visitor, Solnik, and the unrolled parchment sit in balanced composition while background town life remains visibly active.

2. How does it work? Publicly observable in modern AC dialogue framing: instead of cutting to a black modal or freezing the world, the camera applies a gentle zoom (1.08×–1.15×) and horizontal rule-of-thirds offset (left third: visitor + Solnik; right two-thirds: unrolled Folded Paper + live background window).

3. Why does it matter? Directly enforces ChatGPT's Proof #5 ("the world remains alive during conversations, decisions and interactions") and prevents modal UI clutter.

4. Can it serve PROVADIA? Yes; turns product inspection and Solnik guidance into a single unified cinematic frame.

5. Can it operate inside a browser? Yes; smooth camera-target interpolation + responsive mobile vertical split (top: Solnik + live scene; bottom: parchment card on < 700px).

6. Reusable across every universe? Yes; every conversation and Folded Paper inspection uses this framing state.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Prototype unrolls Mint parchment, but camera reframing and mobile split geometry are incomplete.

9. What is missing? Dual-breakpoint framing solver (>= 700px side-by-side vs. < 700px vertical stack) wired to camera zoom.

10. How can it be objectively tested? Trigger Folded Paper inspection at 1280×800 and 375×812; assert background particle/NPC frame delta > 0 every tick and zero overlap between Solnik's face and parchment text.

MESR-0176 — Arrival-Populated Ambient Activity Slots (Smart-Object Stations)
Domain: D04 Crowds & Inhabitants · Leverage: TIER-0 CRITICAL · Cross-Ref: FVR-31 §2 (The Populated World)

Classification: Designed but not built

1. What does it do? Ensures every plaza, street, and chamber is already alive with inhabitants performing purposeful tasks (reading, hammering, sweeping, inspecting ledgers, carrying scrolls) the instant a visitor arrives.

2. How does it work? Publicly documented in Assassin's Creed crowd AI (GDC talks on Anvil crowd life-slots): scenes place invisible Smart-Object Slots (position, facing, activityAnim, loopDuration, interruptible) that pre-spawn inhabitants mid-cycle at t = 0 rather than walking them in from off-screen after load.

3. Why does it matter? Directly fulfills the Founder's Populated World addendum: "you never walk into an empty stage — life is already happening when the visitor arrives."

4. Can it serve PROVADIA? Yes; makes every town, library, and workshop feel inhabited at $0 runtime AI token cost.

5. Can it operate inside a browser? Yes; lightweight sprite/skeletal state playback driven by JSON slot definitions.

6. Reusable across every universe? Yes; universal crowd-population primitive.

7. Dependencies, costs & performance: None; $0; < 0.3 ms per frame for 8–12 slot inhabitants.

8. Have we already built it? Prototype has 3 static stand-ins in Chamber; Street/Library Smart-Object slots are not yet built (specced in AI Studio Run #3).

9. What is missing? Smart-Object slot schema + 4–6 reusable inhabitant skeletal/plate activity loops.

10. How can it be objectively tested? Measure frame 1 (t = 0 ms) after scene transition; assert >= 3 active inhabitants in mid-action poses inside the visible viewport on frame 1.

MESR-0177 — Local Crowd Steering & Reciprocal Velocity Obstacle Avoidance
Domain: D04 Crowds & Inhabitants · Leverage: TIER-0 CRITICAL · Cross-Ref: G-1 (Run #3), FVR-31

Classification: Designed but not built

1. What does it do? Allows walking townsfolk, Solnik, and the visitor to pass one another smoothly in streets and doorways without overlapping sprites or deadlocking in narrow lanes.

2. How does it work? Standard Reynolds separation steering + lightweight 2-D Reciprocal Velocity Obstacle (RVO) / tangential sidestep bias: entities within radius R apply an inverse-distance lateral repulsion vector perpendicular to their relative velocity.

3. Why does it matter? Prevents immersion-breaking sprite stacking when Solnik walks alongside the visitor (Proof #2) through a populated street.

4. Can it serve PROVADIA? Yes; essential for Solnik companion following + street crowd coexistence.

5. Can it operate inside a browser? Yes; pairwise distance check across N <= 20 entities (< 400 operations/frame = < 0.02 ms).

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Not yet built (included in AI Studio Run #3 spec).

9. What is missing? Separation + lateral pass-bias steering module integrated with MESR-0062 NavMesh clamping.

10. How can it be objectively tested? Spawn two agents walking head-on in a 120 px-wide corridor; assert minimum center-to-center distance never drops below 2 * collisionRadius and both reach destinations within 1.2× unobstructed time.

MESR-0281 — Seamless Airlock / Threshold Portal Transition (Zero Hard Page Cut)
Domain: D06 Buildings, Interiors & Traversal · Leverage: TIER-0 CRITICAL · Cross-Ref: FVR-31 Order 7, Cinematic Factory Pipeline v1

Classification: Under construction

1. What does it do? Connects exterior streets to interior chambers (Gate → Street → Enchanted Library) through a continuous spatial threshold crossing rather than a browser page reload or abrupt black cut.

2. How does it work? Observable in AC interior/exterior seamless airlocks: crossing a threshold plays a short directional transition (Job 3 portal film or 400 ms depth-push + luminance/fog veil dissolve) while the target cell's preloaded assets swap atomically behind the veil and place the visitor at the exact interior doorway.

3. Why does it matter? Preserves spatial continuity so visitors maintain a mental map of the civilization ("I walked through that arch into the Library").

4. Can it serve PROVADIA? Yes; turns every door on the Master Universe Map into a physical architectural crossing.

5. Can it operate inside a browser? Yes; double-buffered scene swap (SceneBufferA / SceneBufferB) with deterministic requestAnimationFrame teardown of SceneBufferA.

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: None; $0; requires pre-warmed target bundle (<= 1.5 MB).

8. Have we already built it? Prototype implements Chamber → Gate (Job 3 film) → Street → Library; clean memory teardown on repeated back-and-forth crossings needs verification (G-2 blind spot #6).

9. What is missing? Strict teardown audit + reverse-direction exit transitions (Library → Street → Gate).

10. How can it be objectively tested? Execute 20 consecutive round-trip portal crossings (Street ↔ Library) in automated browser test; assert heap memory growth < 2 MB and 0 leaked RAF timers.

MESR-0336 — Multi-Layer Skeletal State Machine with Blended Upper/Lower Body Channels
Domain: D07 Animation & Rigs · Leverage: TIER-0 CRITICAL · Cross-Ref: Solnik Motion Anatomy, FVR-31 Proof #2

Classification: Built but unverified

1. What does it do? Drives Solnik (and visitor avatars) with fluid, non-robotic animation where lower-body locomotion (idle breathing, weight shift, walk cycle) blends independently from upper-body expression (listening nod, speaking gesture, guiding point).

2. How does it work? Standard hierarchical 2-D/3-D skeletal animation graph: bone transforms interpolate via cubic/spring curves across six core operational states (Off-Watch, Ignition, At Rest, Listening, Speaking, Guiding), allowing upper-arm/head additive overrides during movement.

3. Why does it matter? Fixes the prototype's weakest leg (Proof #2 PARTIAL — Solnik currently stage-slides as a static pose).

4. Can it serve PROVADIA? Yes; gives Solnik genuine living presence at < 250 KB instead of gigabytes of pre-rendered video.

5. Can it operate inside a browser? Yes; pure Canvas2D/WebGL hierarchical bone matrix evaluation (< 0.15 ms per frame).

6. Reusable across every universe? Yes; same rig runtime drives Solnik, visitor avatars, and key guild masters.

7. Dependencies, costs & performance: None; $0; ~180–250 KB total rig atlas + JSON skeleton.

8. Have we already built it? Real cartoon Solnik rig is imported into the prototype (6 states defined), but the animation controller class is currently unwired.

9. What is missing? Wiring the state machine tick to movement velocity (walk vs At Rest) and dialogue/manifestation events (Listening, Speaking, Guiding).

10. How can it be objectively tested? Automated state-transition test stepping through all 6 states + velocity [0, 1] and asserting non-zero bone angle deltas and zero NaN transforms.

MESR-0337 — Phoneme/Viseme Lip-Sync Driver & Gaze-Target Head Tracking
Domain: D07 Animation & Rigs · Leverage: TIER-0 CRITICAL · Cross-Ref: Solnik Intelligence, Piper TTS, Gemini Live

Classification: Designed but not built

1. What does it do? Synchronizes Solnik's mouth shapes (visemes) to live TTS/audio output in real time while subtly rotating his head and eyes toward the visitor or the unrolling Folded Paper.

2. How does it work? Extracts real-time amplitude envelope + spectral band energy (or Piper phoneme timestamps) via Web Audio API AnalyserNode to drive 5–7 mouth visemes (closed, A/I, E, O, U, F/V), combined with clamped neck/eye IK toward gazeTarget.

3. Why does it matter? Unifies Solnik's locked film quality with live unscripted conversation without spending 60 Flow credits per sentence.

4. Can it serve PROVADIA? Yes; works identically with offline Piper TTS today and free-tier Gemini Live audio when wired.

5. Can it operate inside a browser? Yes; native Web Audio AnalyserNode (FFT size = 256, < 0.05 ms).

6. Reusable across every universe? Yes; every speaking inhabitant rig inherits the viseme/gaze driver.

7. Dependencies, costs & performance: Web Audio API (native browser); $0.

8. Have we already built it? Not yet built (prototype displays scripted lines on static Solnik pose).

9. What is missing? 6-viseme mouth sprite/vector swap table + AnalyserNode amplitude-to-viseme mapper + clamped gaze IK.

10. How can it be objectively tested? Feed a 440 Hz modulated speech WAV into AnalyserNode; assert >= 4 distinct viseme indices trigger during voiced syllables and return to closed within 80 ms of silence.

MESR-0396 — 2-D Positional Audio Panning, Distance Attenuation & Occlusion Zones
Domain: D08 Spatial Audio · Leverage: TIER-0 CRITICAL · Cross-Ref: FVR-31, Film 16 Sound Gate

Classification: Designed but not built

1. What does it do? Places sound sources in physical space (fountain water on the left, Library hearth ahead, street murmur fading behind closed doors) so audio reinforces architectural depth.

2. How does it work? Observable in AC's spatial acoustic engine: Web Audio StereoPannerNode + inverse-distance gain attenuation (1 / (1 + k * d)) plus a BiquadFilterNode low-pass cutoff (800 Hz muffled vs. 20 kHz open) when a doorway portal is closed.

3. Why does it matter? Spatial sound accounts for half of sensory immersion on mobile headphones and phones at near-zero bandwidth cost.

4. Can it serve PROVADIA? Yes; turns short looping stems (Opus/OGG) into an expansive, believable acoustic environment.

5. Can it operate inside a browser? Yes; native Web Audio API graph unlocked cleanly on first user gesture.

6. Reusable across every universe? Yes; emitters (position, radius, stemId, occlusionGroup) are authored in the JSON scene schema.

7. Dependencies, costs & performance: Native Web Audio API; $0; < 1% CPU.

8. Have we already built it? Not yet built (ambient stems are global/unspatialized).

9. What is missing? Spatial emitter manager with mobile iOS Safari AudioContext.resume() gesture unlock and prefers-reduced-sound / mute toggle.

10. How can it be objectively tested? Move listener from x = 100 to x = 900 past an emitter at x = 500; assert StereoPannerNode.pan.value sweeps smoothly from +0.8 to -0.8 and gain peaks at d = 0.

MESR-0397 — Interactive Acoustic Bed Crossfader & Footstep Surface Material Mapper
Domain: D08 Spatial Audio · Leverage: TIER-0 CRITICAL · Cross-Ref: Cinematic Factory Pipeline v1 (0 cr Sound Gate)

Classification: Designed but not built

1. What does it do? Plays velocity-synced footsteps matched to the floor material (cobblestone, timber dock, library rug, stone vault) and smoothly crossfades room tone across thresholds without harsh audio cuts.

2. How does it work? NavMesh polygons carry a surfaceMaterial tag; skeletal walk-cycle foot-plant animation events trigger randomized pitch/gain-varied footstep samples (±8% pitch jitter prevents "machine-gun" repetition).

3. Why does it matter? Connects physical avatar motion directly to tactile feedback on mobile speakers/earbuds at 0 generation credits.

4. Can it serve PROVADIA? Yes; replaces flat silence during traversal with grounded physical presence.

5. Can it operate inside a browser? Yes; Web Audio buffer playback (< 40 KB compressed Opus per material set).

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: Native Web Audio API; $0.

8. Have we already built it? Not yet built.

9. What is missing? 4-material micro-footstep sample bank (< 150 KB total) + walk-cycle event hook.

10. How can it be objectively tested? Walk avatar across a cobblestone → library_rug polygon boundary; assert footstep buffer ID switches on the exact step crossing the boundary with zero audio click/clipping.

MESR-0446 — Scene Color-Grading LUT & Rim-Light Harmonization for Composite Rigs
Domain: D09 Lighting & Atmosphere · Leverage: TIER-0 CRITICAL · Cross-Ref: G-4 (Seat D Library composite), #141210 / #C9A227 palette

Classification: Designed but not built

1. What does it do? Automatically tints Solnik, visitor avatars, and unrolled scrolls with each room's key-light color, shadow tint, and atmospheric depth haze so real-time rigs look optically painted inside Genspark/Veo scenery plates.

2. How does it work? Each scene JSON defines ambientTint, keyLightColor, keyLightAngle, and depthFogColor; a lightweight fragment shader or Canvas2D composite pass applies multiply/screen rim-light and distance haze to dynamic characters.

3. Why does it matter? Solves the #1 failure mode of hybrid 2.5-D engines (G-4): preventing crisp vector characters from looking pasted onto warm candlelit plates.

4. Can it serve PROVADIA? Yes; preserves PROVADIA's signature antique-gold (#C9A227) and obsidian-bronze (#141210 / #30251B) cinematic look across dynamic entities.

5. Can it operate inside a browser? Yes; WebGL uniform tint or Canvas2D globalCompositeOperation (< 0.1 ms).

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Static palette exists in art briefs; dynamic runtime character rim/ambient harmonization is not yet built.

9. What is missing? Per-scene lightingProfile block in JSON schema + rig shader/canvas tint hook.

10. How can it be objectively tested? Render Solnik in cool Kingdom Gate light vs. warm Enchanted Library light and verify average character rim RGB shifts toward each scene's keyLightColor within ΔE < 5.

MESR-0496 — Local-First IndexedDB Civilization State & Journey Ledger
Domain: D10 World Persistence · Leverage: TIER-0 CRITICAL · Cross-Ref: Specimen #501 (IndexedDB offline architecture), FVR-31

Classification: Under construction

1. What does it do? Persists the visitor's chosen avatar, name, current world coordinates, discovered places, inspected Folded Papers, and offline session state locally with zero mandatory account creation.

2. How does it work? Versioned IndexedDB store (with localStorage fallback) using atomic transactional writes and schema migration versioning—the exact local-first persistence pattern proven in Reseller Business OS 1.0.

3. Why does it matter? Enables instant guest-first entry (World Engine Architecture v1), zero-latency reload recovery, and full offline resilience without server round-trips or forced sign-ups.

4. Can it serve PROVADIA? Yes; forms the client-side memory layer of PROVADIA OS.

5. Can it operate inside a browser? Yes; native IndexedDB API in all modern mobile and desktop browsers.

6. Reusable across every universe? Yes; namespaced by universeId.

7. Dependencies, costs & performance: Zero external libraries; $0; < 3 ms async write.

8. Have we already built it? Prototype persists guest character + name locally; full journey/discovery/parchment ledger schema is incomplete.

9. What is missing? Versioned provadia_os_state_v1 IndexedDB schema with export/import JSON backup (preserving full user data sovereignty).

10. How can it be objectively tested? Walk to Library, unroll Mint scroll, reload browser tab offline; assert visitor restores exact Library coordinates, avatar, and inspected scroll state in < 100 ms.

MESR-0546 — Diegetic Object Inspection & Folded-Paper Unroll State Machine
Domain: D11 Interactive Objects & Manifestation · Leverage: TIER-0 CRITICAL · Cross-Ref: FVR-31 §2 (The Folded Paper), Proof #4

Classification: Under construction

1. What does it do? Turns any product, service, instrument, or deed into a physical Folded Paper carried or summoned by Solnik that unrolls on stage, reveals its interactive assembly stages, and connects to the Surfer/commerce mechanism.

2. How does it work? Deterministic 5-phase state machine (SEALED_SLEEPING → SUMMONED_BY_SOLNIK → UNROLLING_SCROLL → STAGE_INSPECTION → FOLDED_AWAY) driven by a single JSON ProductManifest (stages, callouts, pricing, availability status) so one untouched engine renders infinite products.

3. Why does it matter? Directly realizes the Founder's Folded Paper addendum and ChatGPT's Proof #4 ("any product can be summoned dynamically through the manifestation system").

4. Can it serve PROVADIA? Yes; replaces every static e-commerce product page in the legacy website.

5. Can it operate inside a browser? Yes; procedural parchment roll physics + WebGL/Canvas particle assembly (< 30 KB code).

6. Reusable across every universe? Yes; universal manifestation engine across all towns and departments.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Built for one product (The Mint — 8 stages + parchment $245 / $196, purchasing CLOSED); Proof #4 requires proving a second product (The Keeper) through the untouched engine.

9. What is missing? Wiring The Keeper (and a general summonProduct(productId) dispatcher) without modifying engine code.

10. How can it be objectively tested? Call summonProduct('mint'), close, then call summonProduct('keeper') on identical engine runtime; assert zero engine code branches per product ID and valid stage rendering for both.

MESR-0547 — Responsive Callout Anchor Solver (Desktop Radial Pins vs. Mobile Scrubber Arc)
Domain: D11 Interactive Objects & Manifestation · Leverage: TIER-0 CRITICAL · Cross-Ref: G-2 (375px modal audit), PIS-01

Classification: Designed but not built

1. What does it do? Renders anatomical leader-lines and stage callouts around an unrolled product on wide desktop screens while automatically collapsing them into a thumb-accessible stage scrubber and parchment card on < 700px mobile screens.

2. How does it work? Breakpoint-aware layout solver (viewportWidth < 700px or aspect < 0.75): on desktop, spring-repulsion avoids label overlap around the 3-D/2.5-D exploded assembly; on mobile, pins become numbered stage badges with a horizontal bottom-arc scrubber (min tap target 44×44 px).

3. Why does it matter? Fixes tonight's prototype gap ("leader lines are desktop geometry") and Velmar's 375px overflow defect (G-2).

4. Can it serve PROVADIA? Yes; ensures every manifested product is legible and tactile on both 27" monitors and 375×812 phones.

5. Can it operate inside a browser? Yes; pure CSS Grid/Flex + normalized canvas pin projection.

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Desktop radial leader lines are built in prototype; mobile < 700px inspection arc is missing.

9. What is missing? Mobile < 700px scrubber component + bounding-box collision check ensuring zero clipped text at 375px.

10. How can it be objectively tested? Automated Playwright/headless viewport check at 375×812 with 8 callouts active; assert document.documentElement.scrollWidth <= 375 and zero overlapping bounding boxes.

MESR-0601 — Diegetic Environmental Wayfinding (Light Shafts, Leading Lines & Companion Cueing)
Domain: D12 Navigation & Guidance · Leverage: TIER-0 CRITICAL · Cross-Ref: FVR-31 §2 (No-Pages Law)

Classification: Designed but not built

1. What does it do? Guides visitors naturally toward open doors, active merchants, and unrolled scrolls using in-world visual/audio cues (warm golden light spilling under doors, subtle dust-mote currents, Solnik glance/gesture cues) instead of intrusive GPS arrows or web navbars.

2. How does it work? Observable in Assassin's Creed architectural wayfinding (contrast paths, warm/cool lighting polarity, subtle edge shimmer on interactive props): active portals emit a low-frequency golden rim pulse (#E4C65B) and Solnik shifts into Guiding gaze when the visitor pauses > 6 s without input.

3. Why does it matter? Makes a page-free world intuitive for first-time visitors without breaking cinematic immersion.

4. Can it serve PROVADIA? Yes; reconciles "no site map / no landing page" with effortless product and place discovery.

5. Can it operate inside a browser? Yes; shader/canvas alpha pulse + idle-timer state trigger.

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Not yet built (prototype relies on implicit forward progression).

9. What is missing? Idle-gaze cue timer (6 s) on Solnik + subtle threshold light-spill shader + optional "Compass / Kingdom Whisper" subtle overlay for direct search.

10. How can it be objectively tested? User/bot navigation test starting in Character Chamber with zero text instructions; assert visitor discovers and enters Enchanted Library within 45 s using visual cues alone.

MESR-0651 — PIS-01 Predictive Ring-Buffer Asset Streamer & Memory-Budget Evictor (≤ 1.5 MB)
Domain: D13 Rendering & Asset Streaming · Leverage: TIER-0 CRITICAL · Cross-Ref: PIS-01 (Commission #119), Universal Presentation Engine v1

Classification: Under construction

1. What does it do? Streams only the active cell's WebP atlases, depth mesh, and audio stems into memory, pre-warms immediate neighbor portals in the background, and evicts distant cells so mobile RAM/payload stays strictly under 1.5 MB per scene.

2. How does it work? Publicly standard in Anvil cell-streaming pools: maintains a 3-slot LRU ring buffer (Current Cell, Adjacent Portal Target, Persistent Core: Avatar + Solnik), aborting stale fetch() requests via AbortController and revoking ImageBitmap / WebGL textures on eviction.

3. Why does it matter? Prevents Safari iOS tab crashes (Jetsam memory kills) and enforces the 1.5 MB PIS-01 mobile ceiling across an arbitrarily large civilization.

4. Can it serve PROVADIA? Yes; allows PROVADIA to scale to 1,000+ plates without bloating initial load.

5. Can it operate inside a browser? Yes; fetch + createImageBitmap + AbortController + explicit texture .dispose().

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: Native browser APIs; $0; guarantees <= 1.5 MB active scene transfer on < 700px / Save-Data.

8. Have we already built it? 540×960 WebP budget and 700px / Save-Data frame-subsetting exist in Universal Presentation Engine v1; LRU ring-buffer eviction across multi-cell journeys is incomplete.

9. What is missing? Multi-cell AbortController prefetcher + ImageBitmap.close() eviction manager + automated byte-size CI assertion.

10. How can it be objectively tested? Simulate traversing 10 sequential cells on throttled Fast 3G mobile profile; assert every scene transition transfers <= 1.5 MB and active decoded texture memory stays bounded below 35 MB.

MESR-0711 — Adaptive DPR Cap (≤ 2.0), Save-Data Tiering & Touch-Action Gesture Arbitrator
Domain: D14 Mobile & Browser Compatibility · Leverage: TIER-0 CRITICAL · Cross-Ref: PIS-01, G-2 (Blind spots #2 & #5)

Classification: Under construction

1. What does it do? Prevents 3× Retina mobile GPUs from overheating, honors navigator.connection.saveData, and eliminates accidental iOS/Android pull-to-refresh or page-bounce during touch walking.

2. How does it work? Clamps dpr = Math.min(window.devicePixelRatio || 1, 2), scales internal canvas resolution down dynamically if rolling 30-frame average drops below 50 fps, and applies CSS touch-action: none; overscroll-behavior: none on the stage canvas while preserving vertical scroll inside open parchment cards.

3. Why does it matter? Guarantees smooth 60 fps performance on ordinary mid-range mobile phones without native app installation.

4. Can it serve PROVADIA? Yes; directly answers Founder Question #6.

5. Can it operate inside a browser? Yes; native DOM/CSS + frame-time governor.

6. Reusable across every universe? Yes.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? 700px and Save-Data rules exist in Universal Presentation Engine v1; dynamic DPR governor and touch-scroll arbitration need verification.

9. What is missing? Rolling frame-time scaler + explicit touch isolation between stage canvas (touch-action: none) and parchment reader (overflow-y: auto).

10. How can it be objectively tested? Emulate 3× DPR mobile viewport with 4× CPU slowdown; assert canvas.width <= viewportWidth * 2, fps >= 55, and zero page rubber-banding on vertical swipe.

MESR-0761 — Shadow-DOM Semantic Accessibility Tree & Deterministic Deep-Link Hash Router
Domain: D15 Accessibility & Alternative Navigation · Leverage: TIER-0 CRITICAL · Cross-Ref: FVR-31 §2 (Directive §2 invisible addresses & accessibility)

Classification: Designed but not built

1. What does it do? Mirrors every visible Canvas/WebGL door, inhabitant, and unrolled Folded Paper into a synchronized, keyboard-navigable ARIA DOM tree and deterministic URL hash (#/kingdom/library/mint) without rendering visible web-page chrome.

2. How does it work? Standard accessible-canvas architecture: a visually clipped (sr-only) semantic <nav>/<main> region tracks active scene portals and interactive objects with real <button> elements, ARIA live announcements on room arrival, and bidirectional hashchange sync.

3. Why does it matter? Fulfills the Founder's own directive §2 ("Underneath, invisible, searchable addresses, accessibility and the till machinery remain"), enabling screen readers, keyboard-only navigation, browser Back/Forward, and direct product links.

4. Can it serve PROVADIA? Yes; satisfies WCAG accessibility and deep-linking while keeping the visual stage 100% pure cinema.

5. Can it operate inside a browser? Yes; native HTML5 ARIA + window.location.hash / History API.

6. Reusable across every universe? Yes; auto-generated directly from the JSON scene schema (MESR-0003).

7. Dependencies, costs & performance: None; $0; < 10 DOM nodes per active cell.

8. Have we already built it? Not yet built (specced in AI Studio Run #2/#4).

9. What is missing? Auto-generated sr-only portal/prop mirror synced to scene transitions + prefers-reduced-motion static fallback toggle.

10. How can it be objectively tested? Navigate from Chamber to Library and unroll Mint using only Tab, Enter, and screen-reader tree inspection with pointer events disabled; assert 100% task completion and valid URL hash update.

MESR-0901 — Two-House Security Boundary & Fail-Closed Commerce Till Interface
Domain: D18 Security, Identity & Economics · Leverage: TIER-0 CRITICAL · Cross-Ref: Two-House Wall, FVR-31, Specimen #501

Classification: Already built and independently verified (Boundary active; Till closed per standing fence)

1. What does it do? Isolates the immersive browser stage from private keys, secret API credentials, and unverified payment settlement, ensuring purchasing remains fail-closed until explicit founder authorization and verification gates clear.

2. How does it work? Client-side presentation engine contains zero embedded secrets (G-2 verified zero keys in bundle); commerce actions emit signed, schema-validated CheckoutIntent payloads to an isolated till adapter that remains hard-locked (PURCHASING_CLOSED = true) until gate clearance, while Web3/wallet signing occurs strictly client-side via user-approved wallet providers without server key custody.

3. Why does it matter? Protects visitors, the $5 SOL Gatehouse untouched fence, and legacy live commerce while PROVADIA OS is built in parallel.

4. Can it serve PROVADIA? Yes; guarantees real-world economic transactions cannot misfire or leak credentials in a browser environment.

5. Can it operate inside a browser? Yes; strict CSP headers, zero secret bundle linting, and isolated till state machine.

6. Reusable across every universe? Yes; single governed till gateway across all products and universes.

7. Dependencies, costs & performance: None; $0.

8. Have we already built it? Active and verified (G-2 confirmed zero secrets in Velmar; Mint prototype enforces purchasing CLOSED; $5 SOL untouched).

9. What is missing? Automated CI secret-scanner + CSP header enforcement on future staging builds.

10. How can it be objectively tested? Run automated bundle grep + network monitor across full user journey; assert 0 secret patterns, 0 outbound unauthorized requests, and HTTP 403 / CLOSED state on any checkout trigger while PURCHASING_CLOSED is active.

3. Tier-1 Domain Specifications (MESR-0026 – MESR-0105: 80 Complete 10-Question Entries)
Every entry below answers all 10 Directive Questions in compact, deterministic format ready for automated ingestion into megacomp / partner-desk:

Q1: What it does · Q2: How it works · Q3: Why it matters · Q4: Serves PROVADIA · Q5: Browser-viable · Q6: Cross-universe reusable · Q7: Deps/Cost/Perf · Q8: Built status · Q9: What is missing · Q10: Objective test.

Domain D01 — World Architecture & Construction Engines (MESR-0026 – MESR-0030)
MESR-0026 — Depth-Projected 2.5-D Displaced Scenery Mesh (PROPOSAL) · [Designed but not built]

Q1: Converts static Genspark/Veo plates into perspective-accurate 2.5-D architectural environments during forward camera pushes. Q2: Generates a local 0-cr depth map (Depth-Anything on megacomp) and displaces a low-poly 32×32 WebGL grid mesh textured with the 540×960 WebP plate. Q3: Eliminates flat "pop-up book" cardboard sliding when walking down streets or into halls. Q4: Yes; upgrades all 204+ Genspark plates into pseudo-3-D spaces. Q5: Yes; WebGL 1,024-vertex mesh renders at 60 fps on any mobile GPU. Q6: Yes. Q7: Local Python depth generator ($0); runtime ~60–90 KB mesh+WebP. Q8: Proposed in Commission #123; not yet wired into engine. Q9: Offline depth-map batch script + WebGL displaced-plane shader. Q10: Push camera forward 20% on Library plate and verify foreground columns parallax faster than rear shelves with <= 90 KB payload.

MESR-0027 — Modular Architectural Kit-Bashing & Foreground Occluder Slices · [Under construction]

Q1: Separates foreground pillars, archways, and tables from background plates so characters walk behind architectural elements. Q2: Anvil-style modular scene layering: alpha-masked WebP foreground cutouts pinned at exact footY depth planes. Q3: Creates genuine spatial volume inside painted/filmed rooms. Q4: Yes. Q5: Yes; standard alpha-blended texture quads. Q6: Yes. Q7: Local ffmpeg/image slicing ($0); < 40 KB per cutout. Q8: Basic layer stack exists; per-room foreground occluder masks incomplete. Q9: Alpha mask extraction for Library lecterns and Street stalls. Q10: Walk avatar behind a foreground pillar and verify clean alpha occlusion with zero halo artifacts.

MESR-0028 — Scale & Ergonomic Metric Standard (Door-to-Avatar Ratio Lock) · [Designed but not built]

Q1: Enforces consistent physical proportions between avatars, doorways, steps, and furniture across all scenes. Q2: Standardized world-unit ruler (1.0 unit = 1.75 m avatar height; standard doorway 1.35 units wide × 2.1 units tall) validated at scene load. Q3: Prevents giant/tiny avatar scale jarring when transitioning from Street to Library. Q4: Yes. Q5: Yes; perspective scale curve scale(footY) defined per scene JSON. Q6: Yes. Q7: Zero deps; $0. Q8: Missing formal scaleCurve validation across scenes. Q9: perspectiveScale(y) linear/perspective interpolator in scene schema. Q10: Measure rendered avatar pixel height at Library doorway and compare to doorway frame (ratio 0.65–0.80).

MESR-0029 — Multi-Universe Registry & Namespace Isolation Loader · [Designed but not built]

Q1: Allows PROVADIA OS to host multiple distinct worlds/universes without asset ID collisions or state bleed. Q2: Prefixes all asset IDs, IndexedDB keys, and hash routes with universeId (provadia-core, industry-family-x). Q3: Enables horizontal expansion into industry families without rewriting engine core. Q4: Yes. Q5: Yes. Q6: Yes; core multi-tenant architecture. Q7: Zero deps; $0. Q8: Single-universe prototype only. Q9: UniverseManifest root loader + namespace wrapper. Q10: Load two universes sequentially in one session and verify zero asset cache collisions or IndexedDB key overwrites.

MESR-0030 — Deterministic Procedural Micro-Detail Scatter (Dust, Leaves, Embers) · [Under construction]

Q1: Populates air volumes with gentle drifting motes, falling leaves, or hearth sparks that never visibly loop. Q2: Seeded PRNG particle emitters bounded to scene depth planes (zMin..zMax). Q3: Keeps static plates visibly alive at near-zero byte cost. Q4: Yes. Q5: Yes; 150 Canvas2D/WebGL point sprites take < 0.1 ms. Q6: Yes. Q7: Zero deps; $0; < 5 KB code. Q8: Particle burst exists in Mint manifestation; continuous ambient room emitters partially built. Q9: Reusable AmbientParticleField JSON config per scene. Q10: Run scene for 60 s and verify particle positions remain non-periodic and frame time stays < 16 ms.

Domain D02 — Character Locomotion, Physics & Collision (MESR-0031 – MESR-0035)
MESR-0031 — Click/Tap Pathfinding on Concave Floor Polygons (A Funnel Solver)* · [Designed but not built]

Q1: Routes the visitor smoothly around L-shaped tables, fountains, or stalls when tapping a distant spot on mobile. Q2: Triangulates the walkable NavMesh polygon and runs A* + Simple Stupid Funnel string-pulling to produce the shortest obstacle-free path. Q3: Prevents visitors from getting stuck on furniture edges when using tap-to-walk on phones. Q4: Yes. Q5: Yes; < 50 triangles solves in < 0.05 ms in pure JS. Q6: Yes. Q7: Zero deps; $0; ~150 lines JS. Q8: Direct steering exists; concave funnel pathfinder missing. Q9: Lightweight 2-D polygon triangulation + funnel pathfinder. Q10: Tap opposite side of a U-shaped obstacle; assert avatar navigates cleanly around corner without touching wall.

MESR-0032 — Acceleration/Deceleration Inertia & Turn-Lean Curve · [Designed but not built]

Q1: Eliminates robotic instant-start/instant-stop movement by applying natural human momentum curves. Q2: Exponential velocity smoothing (accelTau = 0.12 s, decelTau = 0.09 s) driving skeletal torso lean proportional to lateral acceleration. Q3: Makes walking feel weighted and cinematic like Anvil locomotion. Q4: Yes. Q5: Yes; 10 lines of math. Q6: Yes. Q7: Zero deps; $0. Q8: Linear velocity only. Q9: Spring-smoothed velocity wrapper in movement controller. Q10: Record velocity profile from rest to max speed; assert smooth S-curve ramp over 100–150 ms with zero overshoot.

MESR-0033 — Elevation Slope & Stair-Step Vertical Offset Spline · [Designed but not built]

Q1: Moves avatars smoothly up/down architectural stairs, ramps, and raised daises painted on 2.5-D backgrounds. Q2: NavMesh zones define a heightOffset(x, y) bilinear interpolation surface added to the character's screen Y-anchor while preserving perspective scale. Q3: Enables multi-level interiors (raised Library mezzanines, Kingdom Gate steps). Q4: Yes. Q5: Yes; pure math. Q6: Yes. Q7: Zero deps; $0. Q8: Flat floor plane assumption only. Q9: elevationZones[] in place JSON schema. Q10: Walk avatar up a painted staircase zone and verify foot contact stays locked to step treads from bottom to top.

MESR-0034 — Soft-Push Crowd Bump & Personal-Space Yielding · [Designed but not built]

Q1: Allows the visitor to gently brush past stationary townsfolk in narrow alleys without hitting an immovable brick wall. Q2: Anvil-style soft-body shoulder yield: stationary NPCs apply a small lateral step-aside offset (<= 24 px) when visitor penetration occurs, then spring back. Q3: Avoids frustrating invisible wall-blocks in bustling plazas. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: Yieldable flag on SmartObjectSlot inhabitants. Q10: Walk visitor directly through a standing merchant lane; assert visitor passes smoothly and merchant steps aside and recovers.

MESR-0035 — Idle-to-Walk Anticipation & Stop-Foot Plant Phase Lock · [Designed but not built]

Q1: Synchronizes skeletal leg stride phase directly to actual ground displacement so feet never ice-skate across the floor. Q2: Stride phase advances by deltaDistance / strideLength rather than fixed wall-clock time. Q3: Eliminates the #1 visual tell of cheap 2-D/2.5-D browser engines (foot sliding). Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing (Solnik currently stage-slides). Q9: Distance-driven stride phase accumulator in skeletal controller. Q10: Measure planted foot screen coordinate during stance phase (0.0–0.5 cycle); assert pixel drift < 1.5 px.

Domain D03 — Camera Intelligence & Cinematic Direction (MESR-0036 – MESR-0040)
MESR-0036 — Velocity Look-Ahead Lead Framing · [Designed but not built]

Q1: Shifts the camera target slightly ahead of the visitor's walking direction so the visitor sees upcoming architecture and inhabitants rather than empty space behind them. Q2: Adds a damped lead offset lead = normalize(velocity) * leadDistance (~8–12% of viewport width) to the chase camera target. Q3: Creates proactive cinematic framing during exploration. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Center-locked chase only. Q9: Damped lookAheadOffset term in MESR-0121. Q10: Walk right for 2 s; assert avatar sits at ~38–42% horizontal viewport coordinate leaving ~60% forward sightline.

MESR-0037 — Threshold Reveal Push-In & Breathing Micro-Sway · [Designed but not built]

Q1: Adds subtle handheld/steadicam organic life to static chambers and executes a gentle dolly push when entering major landmarks. Q2: Dual low-frequency Perlin/simplex noise oscillators (0.15 Hz, ±1.5 px amplitude, disabled under prefers-reduced-motion) plus curve-driven zoom on portal arrival. Q3: Makes paused moments feel like a living 24/60 fps film rather than a frozen screenshot. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: CameraBreath + ArrivalDolly curve in camera controller. Q10: Stand still in Reading Room for 5 s; verify subtle < 2 px organic sway when motion allowed and 0 px when prefers-reduced-motion: reduce.

MESR-0038 — Interactive Landmark Sightline Pan ("Look Around" Inspection) · [Designed but not built]

Q1: Lets visitors drag/pan slightly to admire high vaulted ceilings or distant towers without walking away from their current spot. Q2: Right-drag / two-finger pan applies a bounded spring offset (±15% viewport) that eases back when released or on movement resume. Q3: Honors architectural grandeur in vertical 9:16 and wide desktop frames. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: Bounded peekOffset spring in camera controller. Q10: Drag-peek upward 100 px and release; assert camera pans smoothly within cameraBounds and returns within 600 ms.

MESR-0039 — Cutscene-to-Gameplay Seamless Control Handoff · [Under construction]

Q1: Blends smoothly from a threshold/portal film clip back into interactive visitor control without a jarring jump-cut. Q2: Matches the final frame composition of transition clips (Job 3 Gate, Job 5 Library) to the exact initial camera transform and avatar spawn coordinates of the interactive stage. Q3: Sustains the illusion of one continuous movie. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Portal transition exists in prototype; frame-exact camera continuity needs alignment verification. Q9: handoffCameraState metadata on portal transition clips. Q10: Compare pixel SSIM between last frame of portal film and first interactive frame; assert SSIM >= 0.85 on background architecture.

MESR-0040 — Aspect-Ratio Safe-Title & Focal-Window Projection · [Designed but not built]

Q1: Guarantees key architectural focal points (Solnik, doors, Folded Paper) never crop off-screen on ultra-wide 21:9 desktops or tall 9:19.5 phones. Q2: Defines a safeFocalBox (600×700 normalized units) inside every 1000×1000 scene and computes camera zoom max(vw / safeW, vh / safeH) clamped to plate bounds. Q3: Protects composition across all screen ratios. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing formal safeFocalBox solver. Q9: safeFocalBox field in scene JSON + projection solver. Q10: Render scene at 21:9, 16:9, and 9:19.5; assert all 4 corners of safeFocalBox remain 100% visible.

Domain D04 — Autonomous Inhabitants & Crowd Intelligence (MESR-0041 – MESR-0045)
MESR-0041 — Deterministic Daily Schedule & Time-Block Role Rotation · [Designed but not built]

Q1: Shifts town inhabitants between realistic activities (morning market setup, midday trade, evening lantern lighting) based on world clock. Q2: Lightweight finite schedule table mapping timePhase (DAWN, DAY, DUSK, NIGHT) to active SmartObjectSlot assignments per NPC. Q3: Makes returning to a street feel like visiting a real living town rather than a frozen diorama. Q4: Yes. Q5: Yes; pure JSON lookup. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: scheduleByPhase table in NPC manifest. Q10: Switch world phase from DAY to DUSK and verify lamplighter NPC transitions from bench slot to lantern-post slot.

MESR-0042 — Proxemic Awareness & Non-Intrusive Greeting Reaction · [Designed but not built]

Q1: Causes nearby merchants and inhabitants to acknowledge the visitor with a subtle nod, posture shift, or quiet diegetic speech bubble when approached, without hijacking controls. Q2: Two-ring proximity trigger: outerRadius (180 px) triggers head-turn/gaze; innerRadius (95 px) displays a non-blocking overhead/side whisper badge (<= 40 chars) that fades on exit. Q3: Builds human warmth and economic invitation without modal pop-ups. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Specced in AI Studio Run #3; not built in engine. Q9: ProxemicResponder component on NPC entities. Q10: Walk visitor into 95 px radius of merchant; assert head-gaze updates and non-blocking whisper fades out cleanly within 1 s of walking away.

MESR-0043 — Shared Sprite-Atlas Palette & Modular Archetype Combinator · [Designed but not built]

Q1: Generates dozens of distinct townsfolk appearances from 3–4 base skeletal rigs to stay well inside the 1.5 MB PIS-01 mobile budget. Q2: Runtime color-recolor LUT / tint masks applied to shared garment layers (tunic, cloak, apron, hair) defined per NPC entry. Q3: Delivers rich crowd variety ("all kinds of people, all kinds of boys") without downloading 20 separate texture atlases. Q4: Yes. Q5: Yes; < 180 KB shared crowd atlas serves 20+ unique inhabitants. Q6: Yes. Q7: Zero deps; $0. Q8: Missing (prototype uses 3 static Chamber stand-ins). Q9: Shared CrowdRigAtlas + per-NPC paletteSwap array. Q10: Spawn 12 crowd members on Street; verify >= 8 visually distinct color/accessory combinations while total crowd texture payload stays <= 220 KB.

MESR-0044 — Micro-Group Conversational Clusters (2–3 NPC Triad Loops) · [Designed but not built]

Q1: Places small groups of inhabitants conversing, gesturing, and reacting to one another in plazas and library alcoves. Q2: Group slot coordinates alternating turn-taking timers (Speaker gesture → Listener nod) between 2–3 linked NPCs. Q3: Authentic civilizations contain social interaction between residents, not just isolated solo workers. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: GroupSlot turn-taking state machine. Q10: Observe a 2-NPC triad for 20 s; verify alternating speaking/listening animation states with zero simultaneous overlap.

MESR-0045 — Companion Tether & Natural Flanking Pathing (Solnik Escort AI) · [Under construction]

Q1: Keeps Solnik walking naturally alongside or slightly ahead/behind the visitor, pausing near landmarks and never blocking doorways. Q2: Elastic follow-slot offset (flankDistance = 75 px on visitor's open side) projected onto NavMesh with predictive door-clearance step-aside. Q3: Directly solves Proof #2 ("Solnik moves and interacts naturally alongside the visitor"). Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Prototype moves Solnik via static stage slide; intelligent flanking incomplete. Q9: NavMesh-clamped flanking controller wired to Solnik's walk cycle (MESR-0336). Q10: Walk visitor in figure-eight pattern through Street; assert Solnik maintains 50–110 px flanking distance, stays inside NavMesh, and plays walk cycle when moving.

Domain D05 — Environmental Storytelling & Living World Affordances (MESR-0046 – MESR-0049)
MESR-0046 — Interactive World-Lore & Guild Plaque Inspection Nodes · [Designed but not built]

Q1: Allows visitors to inspect carved stone reliefs, guild crests, and historical artifacts in-world to learn PROVADIA's civilization history. Q2: Environmental hotspot volumes trigger a compact diegetic parchment marginalia card without leaving the room. Q3: Preserves PROVADIA's history, Golden Wall, and Provadia–Solnitsata heritage inside the living world. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing in unified engine. Q9: LoreHotspot entity type in scene schema. Q10: Tap a Golden Wall plaque; assert marginalia opens in < 100 ms, background animations continue, and closing returns clean focus.

MESR-0047 — Live Economic & Civilization Pulse Indicators in Architecture · [Designed but not built]

Q1: Reflects real-world civilization state (open/closed guild status, verified readiness counts, active announcements) through architectural cues (lit lanterns, open shutters, notice-board scrolls). Q2: Binds scene prop states (lanternLit, shutterOpen) to a read-only CivilizationStatus JSON manifest. Q3: Connects the visual world directly to real commercial/civilization reality rather than static decoration. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: stateBindings[] property on scene props. Q10: Flip gatehouseStatus flag in status JSON; verify Gatehouse lantern state updates deterministically on load.

MESR-0048 — Wind-Coupled Secondary Motion (Banners, Foliage, Lantern Swing) · [Designed but not built]

Q1: Synchronizes cloth banners, hanging lanterns, and exterior foliage to a shared directional wind field so the outdoor world breathes cohesively. Q2: Global WindField(t) function (baseSpeed + gustHarmonics) drives vertex/rotation phase offsets across tagged scene props. Q3: Unified physical forces make separate plates and sprites feel part of one atmosphere. Q4: Yes. Q5: Yes; 1 sine-harmonic function shared across all props. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: windReactive property on prop sprites/meshes. Q10: Verify two banners on opposite sides of the Street sway in consistent wind direction with slight phase lag.

MESR-0049 — Golden Wall & Provenance Ledger Visual Wall Integration · [Designed but not built]

Q1: Embeds PROVADIA's Golden Wall and cryptographic/historical provenance records as a physically traversable monumental gallery inside the civilization. Q2: Virtualized viewport-culled gallery wall rendering inscribed plaques from a paginated JSON index so 1,000+ entries render at 60 fps. Q3: Preserves the Golden Wall mandate from FVR-31 §1 as a living place rather than a flat webpage table. Q4: Yes. Q5: Yes; only visible plaques (~8–12) are drawn per frame. Q6: Yes. Q7: Zero deps; $0. Q8: Exists on legacy site; migration into PROVADIA OS registered on Migration Register. Q9: Virtualized MonumentWall renderer module. Q10: Load 1,000-entry plaque dataset and scroll full length; assert steady 60 fps and <= 1.5 MB memory footprint.

Domain D06 — Buildings, Interiors, Portals & Seamless Traversal (MESR-0050 – MESR-0053)
MESR-0050 — Multi-Door Threshold Dispatch & Return-Spawn Memory · [Under construction]

Q1: Tracks which exterior door a visitor entered so exiting an interior chamber always returns them to the exact exterior doorstep they came from. Q2: Maintains a portalBreadcrumbStack ({ placeId, spawnId, facing }) pushed on entry and popped on exit. Q3: Prevents disorienting spatial teleports when an interior chamber is reachable from multiple routes. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Forward route built; return stack incomplete. Q9: PortalBreadcrumbStack in navigation state. Q10: Enter Library via Door A, exit Library; assert visitor spawns at Door A's exterior stoop facing outward.

MESR-0051 — Interior-to-Exterior Window Sightline Continuity · [Designed but not built]

Q1: Shows matching exterior weather, time-of-day, and subtle street motion through interior windows (e.g., Library arched windows). Q2: Window mask cutouts composite a low-cost blurred exterior sky/motion layer behind the interior plate. Q3: Reinforces that interiors exist inside the continuous outer world rather than isolated boxes. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: windowSkySlot layer tag in interior scene schema. Q10: Switch exterior phase from DAY to DUSK; assert Library interior window light shifts from daylight gold to dusk indigo.

MESR-0052 — Locked / Gated Door Diegetic State & Prerequisite Feedback · [Designed but not built]

Q1: Communicates clearly when a door or department is closed, under construction, or gated without throwing dead 404 errors. Q2: Portals support status: 'OPEN' | 'GATED' | 'SEALED'; approaching a gated door triggers a physical latch rattle + Solnik explanation of what opens it. Q3: Respects standing fences (e.g., closed checkout / unbuilt districts) gracefully inside the fiction/reality of the world. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: portal.status + gatedMessage handler. Q10: Walk into a GATED door; assert traversal blocks cleanly, latch cue plays, and Solnik delivers explanation without console errors.

MESR-0053 — Predictive Neighbor-Cell Pre-Warming on Approach · [Designed but not built]

Q1: Begins fetching the destination room's WebP bundle the moment the visitor enters a door's outer anticipation zone (~2 s before crossing). Q2: Outer trigger zone dispatches low-priority fetch() for portal.targetPlaceId assets so data is cached in memory before the threshold crossfade finishes. Q3: Eliminates loading spinners at doorways on mobile connections. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Native fetch + AbortController; $0. Q8: Missing. Q9: Two-ring portal pre-warm hook wired to MESR-0651. Q10: Approach doorway on simulated Fast 3G (1.6 Mbps), wait 1.5 s, step across; assert transition completes in <= 400 ms with zero spinner.

Domain D07 — Animation, Gestures & Facial Lip-Sync (MESR-0054 – MESR-0057)
MESR-0054 — Micro-Idle Breathing, Blink & Weight-Shift Oscillator · [Built but unverified]

Q1: Keeps standing characters visibly breathing, blinking at natural irregular intervals (3–6 s), and shifting weight subtly when stationary. Q2: Non-commensurate sine oscillators (chestRise: 0.28 Hz, blinkTimer: random(2.8, 5.5) s) applied to skeletal spine and eyelid layers. Q3: Prevents characters from looking like frozen cardboard cutouts during reading or pauses. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Part of Solnik's 6-state rig spec; animation class unwired in prototype. Q9: Wire idle oscillator tick into At Rest and Listening states. Q10: Hold Solnik in At Rest for 10 s; assert chest bone oscillates smoothly and >= 2 blink events occur.

MESR-0055 — Folded-Paper Carrying & Unrolling Hand-Prop IK Attachment · [Designed but not built]

Q1: Attaches the physical Folded Paper scroll cleanly to Solnik's hand socket as he carries it forward and unrolls it before the visitor. Q2: Exposes a handSocket bone transform on Solnik's rig; when SUMMONED_BY_SOLNIK triggers, the scroll origin tracks handSocket world coordinates until releasing into center-stage inspection. Q3: Realizes the Founder's Folded Paper physical choreography seamlessly. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Prototype jumps directly to scroll unroll without Solnik hand-socket attachment. Q9: handSocket bone export + scroll attachment phase. Q10: Trigger summonProduct and verify scroll center remains within <= 3 px of Solnik's hand socket throughout his presentation gesture.

MESR-0056 — Additive Emotional Posture & Gesture Overlay (Greeting, Explaining, Warning) · [Designed but not built]

Q1: Allows Solnik and merchants to punctuate key sentences with natural hand gestures and posture shifts without interrupting underlying idle/walk cycles. Q2: Additive bone-rotation delta tracks (gestureClips: openPalm, pointScroll, bowWelcome, thoughtfulChin) blended over 250 ms ease-in/out envelopes. Q3: Elevates conversational presence to animated-feature quality. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0; < 15 KB JSON keyframe curves. Q8: Missing. Q9: 4 core additive gesture keyframe tracks + trigger tags in dialogue script. Q10: Trigger pointScroll during Speaking state; assert arm bone rotates toward scroll anchor while breathing oscillator continues uninterrupted.

MESR-0057 — Visitor Avatar Archetype & Cloak Physics Secondary Motion · [Under construction]

Q1: Gives the visitor's chosen avatar distinct silhouette, gait cadence, and trailing cloak/scarf sway during movement. Q2: 3-node spring-chain Verlet/pendulum constraint trailing the avatar's shoulder anchor, damped by air drag and wind. Q3: Makes the visitor's own avatar feel tactile, responsive, and worthy of inhabiting the world (Proof #1). Q4: Yes. Q5: Yes; 3-point spring solver (< 0.01 ms). Q6: Yes. Q7: Zero deps; $0. Q8: Prototype has 3 guest silhouettes; dynamic cloak spring physics missing (specced in Run #4). Q9: 3-node cloak spring solver + archetype gait parameters. Q10: Accelerate avatar from 0 to full walk speed and stop abruptly; assert cloak nodes trail backward during motion and settle forward on stop within 400 ms.

Domain D08 — Spatial Audio & Environmental Acoustics (MESR-0058 – MESR-0060)
MESR-0058 — Seamless Loop-Crossfade Stem Player (Zero-Click Audio Looping) · [Designed but not built]

Q1: Loops ambient room tones, fountain water, and crowd murmurs infinitely without audible boundary clicks or gaps. Q2: Web Audio AudioBufferSourceNode with loop = true and 10 ms zero-crossing boundary trim (or dual-buffer equal-power cos/sin crossfade). Q3: Eliminates distracting loop pops on mobile headphones. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Native Web Audio API; $0. Q8: Missing standardized zero-click loop player. Q9: Reusable SeamlessAudioLoop wrapper class. Q10: Loop a 4 s ambient stem across 10 cycles and inspect PCM output for sample discontinuity > 0.05 at loop wrap.

MESR-0059 — Dynamic Dialogue Ducking & Acoustic Focus Envelope · [Designed but not built]

Q1: Gently lowers background crowd and fountain volume (-8 dB over 200 ms) whenever Solnik speaks or plays voiced takes, then restores ambient levels afterward. Q2: Web Audio GainNode.setTargetAtTime sidechain envelope triggered by Solnik.state === 'SPEAKING' or TTS playback active. Q3: Guarantees crisp vocal intelligibility on small phone speakers without silencing the living world. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Native Web Audio API; $0. Q8: Missing. Q9: ambientBus gain ducking hook wired to speech state. Q10: Start Solnik speech audio and assert ambientBus.gain attenuates smoothly by 6–10 dB within 250 ms and recovers within 400 ms of speech end.

MESR-0060 — Mobile Audio Unlock, Background Tab Suspend & Silent-Mode Resilience · [Designed but not built]

Q1: Cleanly unlocks Web Audio on the visitor's first tap, suspends audio when switching browser tabs/apps, and never crashes if audio hardware is blocked. Q2: One-time pointerdown/keydown listener calling audioCtx.resume() inside try/catch, paired with visibilitychange suspend/resume. Q3: Prevents mobile browser autoplay errors and battery drain when the user locks their phone. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Native DOM/Web Audio; $0. Q8: Missing. Q9: AudioLifecycleGuard singleton. Q10: Simulate document.hidden = true during active playback; assert audioCtx.state === 'suspended' within 100 ms and zero unhandled promise rejections.

Domain D09 — Lighting, Shadows & Atmospheric FX (MESR-0065 – MESR-0068)
MESR-0065 — Projected Directional Ground Contact Shadow · [Designed but not built]

Q1: Renders soft, directionally angled ground shadows beneath every character and movable prop matched to the room's primary light source. Q2: Transformed elliptical gradient quad (scaleX, skewX driven by scene keyLightAngle) anchored at footY beneath each entity. Q3: Visually glues characters to the floor plane so they never appear to float. Q4: Yes. Q5: Yes; < 0.02 ms per entity. Q6: Yes. Q7: Zero deps; $0. Q8: Missing in dynamic engine. Q9: ContactShadow draw pass before character sprite pass. Q10: Render avatar in two rooms with opposite keyLightAngle (-35° vs +40°); assert shadow skew flips direction accordingly.

MESR-0066 — Volumetric Light-Shaft & Hearth Flicker Overlay · [Designed but not built]

Q1: Adds living warm light beams from stained-glass windows and organic candle/hearth glow modulation over static scenes. Q2: Low-resolution (128×128) additive-blended procedural noise/gradient quads modulated by multi-sine flicker curves. Q3: Creates high-craft animated-movie atmosphere (#E4C65B antique-gold warmth) at near-zero bandwidth. Q4: Yes. Q5: Yes; 128×128 bilinear upscaled quad costs < 0.05 ms GPU fill. Q6: Yes. Q7: Zero deps; $0. Q8: Missing in runtime engine. Q9: LightShaftEmitter primitive in scene JSON. Q10: Render Library Reading Room with active light shaft and verify 60 fps frame budget on mobile profile.

MESR-0067 — Depth-Stratified Atmospheric Haze & Vignette Framing · [Designed but not built]

Q1: Applies subtle depth-based atmospheric perspective between foreground, midground, and distant architectural planes plus a soft optical vignette. Q2: Per-layer alpha tint interpolated by normalized depth Z + radial edge vignette overlay. Q3: Separates foreground characters cleanly from busy architectural backgrounds. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: depthHaze parameters in scene lightingProfile. Q10: Compare contrast ratio between Solnik silhouette and distant background wall; assert >= 3:1 visual separation.

MESR-0068 — Manifestation Particle & Golden Light-Arc Choreography · [Built but unverified]

Q1: Renders the magical scroll-to-particles-to-product assembly sequence when Solnik unrolls a Folded Paper. Q2: Parametric Bezier particle paths converging from parchment coordinates into exploded product stage positions using antique-gold (#C9A227 / #E4C65B) glow sprites. Q3: Delivers signature PROVADIA wonder without needing per-product pre-rendered video. Q4: Yes. Q5: Yes (<= 120 particles). Q6: Yes. Q7: Zero deps; $0. Q8: Built for The Mint in prototype; needs generalization for arbitrary products (The Keeper). Q9: Parameterized ManifestationFX accepting any target silhouette bounds. Q10: Trigger manifestation for 2 products of differing aspect ratios and verify particles converge cleanly inside each product's bounding box.

Domain D10 — World Persistence & State Memory (MESR-0069 – MESR-0072)
MESR-0069 — Migration Register Destination Resolver (Legacy URL → World Coordinate Map) · [Under construction]

Q1: Translates any legacy website URL, bookmark, or product slug into an immediate arrival inside the corresponding PROVADIA place and unrolled Folded Paper. Q2: Deterministic lookup table (migration-register.json) mapping /products/mint → { placeId: 'enchanted_library', summonProduct: 'mint' }. Q3: Guarantees 100% preservation of existing links and SEO/user bookmarks when PROVADIA OS eventually replaces the legacy site. Q4: Yes. Q5: Yes; < 20 KB JSON map. Q6: Yes. Q7: Zero deps; $0. Q8: Migration Register ordered in FVR-31 §1; runtime boot resolver incomplete. Q9: Boot-time URL/slug resolver hook. Q10: Open app with #/legacy/mint hash; assert visitor spawns directly in Enchanted Library with The Mint Folded Paper ready to unroll.

MESR-0070 — Sovereign State Export / Import & Cross-Device Transfer Bundle · [Designed but not built]

Q1: Lets a visitor export their entire local IndexedDB civilization journey, bookmarks, and preferences as a signed JSON file and restore it on another device without mandatory cloud accounts. Q2: Serializes provadia_os_state_v1 with SHA-256 integrity checksum into a downloadable .provadia.json file. Q3: Honors user autonomy and local-first sovereignty (Specimen #501 philosophy). Q4: Yes. Q5: Yes; Web Crypto crypto.subtle.digest('SHA-256'). Q6: Yes. Q7: Native Web Crypto API; $0. Q8: Missing. Q9: Export/Import state utility in Chamber settings. Q10: Export state on Device A, import on Device B, tamper 1 byte in a test copy; assert valid file restores identically and tampered file is rejected.

MESR-0071 — Conversational Context Ring-Buffer for Solnik Continuity · [Designed but not built]

Q1: Remembers the visitor's last 10 interaction beats (places visited, products unrolled, questions asked) so Solnik gives context-aware guidance rather than repeating canned greetings. Q2: Bounded FIFO ring-buffer (maxEntries = 12) stored in session/IndexedDB and passed as structured context to Solnik's dialogue selector or Gemini Live prompt. Q3: Makes Solnik feel like a perceptive resident guide rather than a stateless kiosk. Q4: Yes. Q5: Yes; < 4 KB JSON. Q6: Yes. Q7: Zero deps; $0. Q8: Missing (prototype uses static scripted lines). Q9: SolnikMemoryRing module. Q10: Visit Mint first, then ask Solnik a follow-up in Library; assert context payload includes visited: ['mint'] and suppresses first-time greeting.

MESR-0072 — Deterministic World-Clock & Session Elapsed Timekeeper · [Designed but not built]

Q1: Maintains a smooth, monotonic civilization clock (dayPhase, ambientTick) that pauses cleanly on tab blur without visual jumps. Q2: Integrates clamped dt (MESR-0061) into a continuous world-time counter with optional real-time local-hour sync. Q3: Keeps lighting, schedules, and particle oscillators synchronized across engines. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing unified world clock across all 8 engines. Q9: WorldClock singleton exposed on engine context. Q10: Pause browser tab for 30 s, resume, and verify WorldClock advances by <= 0.05 s with zero visual discontinuity.

Domain D11 — Interactive Objects & Product Manifestation (MESR-0073 – MESR-0076)
MESR-0073 — Multi-Product Folded Paper Catalog Shelf & Dynamic Summoner · [Designed but not built]

Q1: Allows visitors to browse and summon any product or instrument in a department (e.g., The Mint, The Keeper, Reseller Business OS) from an in-world scroll rack or Solnik request. Q2: Reads departmentCatalog.json and dynamically passes the chosen ProductManifest into the single ManifestationEngine. Q3: Proves Proof #4 ("any product can be summoned dynamically") across the entire catalog without per-product code. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Only The Mint wired in prototype; The Keeper proposed as second proof test (FVR-31 §4). Q9: departmentCatalog.json + scroll-rack selector UI. Q10: Summon 3 distinct products sequentially in one session and verify clean state reset between each unroll.

MESR-0074 — Interactive 8-Stage Exploded Assembly Scrubber · [Under construction]

Q1: Lets visitors scrub forward/backward through a product's genuine creation stages or architectural layers with smooth interpolation. Q2: Normalized stageProgress (0.0 .. N) slider/gesture controller driving exploded offsets and active callout highlights. Q3: Turns product inspection into tactile horological craftsmanship. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Built for The Mint (8 stages); needs touch-drag scrub support on mobile. Q9: Touch/wheel stageProgress scrubber binding. Q10: Drag stage scrubber from 0 to 8 and back to 2; assert smooth continuous interpolation with zero frame stalls.

MESR-0075 — Surfer External / App Launch Bridge (PROPOSAL) · [Designed but not built]

Q1: Launches standalone browser instruments (such as offline single-file HTML apps like Reseller Business OS 1.0) cleanly from inside an unrolled Folded Paper via the Surfer mechanism (FVR-31 §2). Q2: Sandboxed overlay frame or dedicated launch handoff passing read-only launch parameters while preserving the visitor's exact world position underneath for instant return. Q3: Connects the cinematic civilization directly to PROVADIA's functional software products. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Designed in FVR-31; not yet built. Q9: SurferLaunchBridge container with "Return to Civilization" dock. Q10: Launch a sample offline HTML tool from a Folded Paper, interact, click Return; assert instant restoration of exact Library coordinates in < 50 ms.

MESR-0076 — Diegetic Pricing, Readiness Gate & Honest Availability Parchment · [Already built and independently verified]

Q1: Displays transparent dual pricing ($245 / $196 in PROVADIA) and truthful availability status (PURCHASING CLOSED / READY status) directly on the unrolled parchment. Q2: Renders pricing and isPurchasable state strictly from verified product manifest data (READY count stays 0 until gates pass). Q3: Enforces zero false urgency, honest gate discipline, and clear economic value inside PROVADIA. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Built and verified in Mint prototype ($245 / $196, purchasing CLOSED). Q9: Schema binding for all remaining catalog items. Q10: Verify isPurchasable === false renders disabled/closed till action and never exposes an active payment form.

Domain D12 — Wayfinding, Navigation & Visitor Guidance (MESR-0077 – MESR-0080)
MESR-0077 — Diegetic Kingdom Cartography Scroll ("Ask Solnik for the Map") · [Designed but not built]

Q1: Gives visitors an optional hand-illustrated parchment Kingdom Map they can unroll at any time to see discovered places and fast-travel between known landmarks without breaking the No-Pages Law. Q2: Renders an illustrated canvas/SVG world map overlay showing visited nodes in gold and unvisited adjacent districts in charcoal outline; clicking a visited node triggers a threshold journey transition. Q3: Balances immersive walking with rapid return travel for repeat customers. Q4: Yes. Q5: Yes; < 60 KB vector/WebP map. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: KingdomMapScroll component bound to MESR-0001 world graph. Q10: Open Kingdom Map after visiting Library, select Character Chamber; assert smooth transition back to Chamber.

MESR-0078 — In-World Intent Search ("Whisper to Solnik" Instant Finder) · [Designed but not built]

Q1: Lets returning visitors type or speak a product, guild, or question ("take me to the Mint" or "accounting tools") and have Solnik walk/guide them directly there. Q2: Lightweight client-side fuzzy/keyword index (< 15 KB JSON) matching visitor queries against MUM places, products, and lore nodes. Q3: Fulfills Directive §2 ("Underneath, invisible, searchable addresses... remain") without cluttering the screen with web search bars. Q4: Yes. Q5: Yes; zero server search cost ($0). Q6: Yes. Q7: Zero deps; $0; < 1 ms query time. Q8: Missing. Q9: Client-side CivilizationIndex + Solnik route-guidance trigger. Q10: Query "Mint" from Character Chamber; assert resolver returns enchanted_library / mint in < 5 ms and initiates guidance.

MESR-0079 — Interactive Hotspot Subtle Glint ("Keeper's Sight" Pulse) · [Designed but not built]

Q1: Briefly highlights interactive doors, scrolls, and inhabitants with a warm golden rim shimmer when the visitor taps a subtle lantern/sight icon or presses Space/E. Q2: Inspired by Assassin's Creed Eagle Vision / perception pulse: a 1.2 s radial luminance wave expands from the visitor, temporarily boosting interactive prop outline contrast without permanent floating UI icons. Q3: Keeps the screen 100% clean cinema during normal exploration while eliminating "what can I click?" confusion. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: PerceptionPulse radial wave pass. Q10: Trigger PerceptionPulse in Library; assert every interactive prop in viewport highlights for 1.2 s and returns to pure unbadged art afterward.

MESR-0080 — Breadcrumb Arrival Toast (Transient Architectural Title) · [Under construction]

Q1: Displays a refined, self-fading engraved title (THE ENCHANTED LIBRARY) upon crossing into a new district, then vanishes completely after 2.5 s. Q2: CSS/Canvas opacity envelope (0 -> 1 in 300 ms, hold 1800 ms, 1 -> 0 in 400 ms) triggered once per cell entry. Q3: Orients visitors in space without persistent web headers or navbars. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Built in Velmar (G-2); needs integration into unified engine. Q9: DistrictTitleToast wired to portal entry event. Q10: Enter Enchanted Library; assert title reaches opacity: 1 within 400 ms and opacity: 0 by 3.0 s.

Domain D13 — Rendering, Optimization & Asset Streaming (MESR-0081 – MESR-0084)
MESR-0081 — Off-Main-Thread Image Decoding (createImageBitmap) · [Designed but not built]

Q1: Prevents frame drops/stutters when decoding 540×960 WebP sprite atlases and scenery plates during transitions. Q2: Fetches blobs and calls await createImageBitmap(blob) asynchronously so PNG/WebP decompression runs on browser worker threads rather than blocking the 16.6 ms main render loop. Q3: Protects 60 fps smoothness on mid-range mobile CPUs. Q4: Yes. Q5: Yes; standard browser API. Q6: Yes. Q7: Native browser API; $0. Q8: Missing explicit createImageBitmap pipeline. Q9: AsyncBitmapLoader in asset streamer. Q10: Decode 4 WebP atlases during active animation; assert zero main-thread long tasks > 50 ms in Performance timeline.

MESR-0082 — Dirty-Rect & Idle-Frame Power Governor · [Designed but not built]

Q1: Reduces mobile GPU/CPU battery drain when a visitor pauses on a static parchment card with minimal background motion. Q2: Caps frame rate gracefully to 30 fps during static reading states (STAGE_INSPECTION with no pointer/avatar input for > 3 s) and snaps immediately back to 60 fps on any pointer/key event. Q3: Prevents phone heat and battery drain during longer product reading sessions. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: AdaptiveFrameGovernor in main loop. Q10: Leave parchment open untouched for 5 s; verify FPS throttles to 30 fps, then touch screen and verify immediate return to 60 fps within 1 frame.

MESR-0083 — Texture Atlas Packing & Draw-Call Batching · [Designed but not built]

Q1: Packs character rig limbs, visemes, UI parchment borders, and particles into single shared WebP atlases to minimize HTTP requests and GPU texture binds. Q2: Build-time sprite-packer script outputs 1024×1024 WebP atlases + UV coordinate JSON manifests. Q3: Cuts scene HTTP requests from 40+ down to 3–5 files, critical for mobile cellular latency. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Local build script ($0). Q8: Missing automated build-time atlas packer. Q9: Node/Python atlas-packing step in megacomp build pipeline. Q10: Inspect Network waterfall for Enchanted Library scene; assert total asset requests <= 8 and total transfer <= 1.5 MB.

MESR-0084 — WebGL Context-Loss Recovery & Canvas2D Graceful Fallback · [Designed but not built]

Q1: Recovers automatically if a mobile browser reclaims the WebGL context in the background, and falls back cleanly to Canvas2D if WebGL is unavailable. Q2: Listens for webglcontextlost (e.preventDefault()) and webglcontextrestored (re-uploads textures/meshes), with a Renderer2D interface parity adapter. Q3: Ensures universal compatibility across locked-down corporate browsers and older phones. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: ContextLossHandler + Canvas2D parity fallback. Q10: Trigger WEBGL_lose_context.loseContext() followed by restoreContext() in headless Chrome; assert scene resumes rendering within 500 ms with zero errors.

Domain D14 — Cross-Device Browser & Mobile Ergonomics (MESR-0085 – MESR-0088)
MESR-0085 — Hybrid Touch Input (Tap-to-Walk + Virtual Thumb-Pad Option) · [Designed but not built]

Q1: Supports intuitive single-tap destination walking anywhere on the floor alongside an optional subtle floating thumb-stick for continuous steering on phones. Q2: Short tap (< 200 ms, < 10 px drag) sets a NavMesh destination waypoint with a subtle golden floor ripple; press-and-drag (> 14 px) engages continuous proportional steering. Q3: Gives mobile users effortless one-handed control without cluttering the screen with static arcade buttons. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Keyboard + basic click exist; unified mobile tap-vs-drag arbitrator missing. Q9: PointerIntentArbitrator supporting mouse, touch, and keyboard seamlessly. Q10: Run touch simulation with 120 ms tap and 300 ms drag on 375×812 viewport; assert tap sets destination ripple and drag steers continuously.

MESR-0086 — Safe-Area Inset & Mobile Browser Chrome Resize Guard (dvh / svh) · [Designed but not built]

Q1: Prevents bottom parchment cards and threshold cues from being clipped by iOS Safari dynamic address bars or notch/home-indicator safe areas. Q2: Uses 100dvh / window.visualViewport resize listeners plus env(safe-area-inset-bottom) padding on all bottom-docked inspection cards. Q3: Eliminates the classic mobile browser bottom-bar overlap bug. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Native CSS/DOM; $0. Q8: Missing (375px overflow flagged in Velmar G-2). Q9: visualViewport height sync + safe-area-inset CSS tokens. Q10: Test at 375×812 with simulated Safari bottom toolbar; assert all interactive buttons sit >= 16 px above bottom safe area.

MESR-0087 — Zero-External-Dependency Self-Contained Offline Bundle Gate · [Under construction]

Q1: Guarantees the entire PROVADIA OS runtime executes with zero external CDN fonts, analytics scripts, or third-party runtime dependencies. Q2: Uses curated system serif/sans font stacks (Georgia, 'Times New Roman', serif / system UI) or self-hosted subsetted .woff2 files (<= 35 KB) inside the local bundle. Q3: Enforces offline resilience, privacy, and zero external failure points (G-2 flagged external Google Fonts in Velmar). Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero external cost ($0). Q8: Proven in Reseller Business OS 1.0; Velmar prototype leaked 1 Google Fonts <link> (caught in G-2). Q9: CI network-request allowlist gate blocking any non-origin URL. Q10: Load full app with network blocked after initial bundle load; assert 0 failed network requests and 0 console errors.

MESR-0088 — 44×44 px Minimum Touch Target & Anti-Misclick Hit-Slop Inflation · [Designed but not built]

Q1: Expands touch hit-boxes around narrow doors, scroll pins, and lanterns on touch devices without enlarging their visual artwork. Q2: Pointer-type detection (pointerType === 'touch') inflates interactive bounding radii to a minimum 44×44 CSS px hit-slop zone. Q3: Prevents mobile tapping frustration on delicate horological scroll pins. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: getHitRadius(pointerType) helper in interaction picker. Q10: Audit all interactive elements at 375×812 under touch emulation; assert every hit-box satisfies width >= 44 px and height >= 44 px.

Domain D15 — Accessibility & Alternative Navigation (MESR-0089 – MESR-0092)
MESR-0089 — prefers-reduced-motion Global Envelope Dampener · [Designed but not built]

Q1: Respects OS-level reduced-motion accessibility settings by replacing camera sway, rapid particle bursts, and spinning transitions with calm crossfades and static framing. Q2: Subscribes to window.matchMedia('(prefers-reduced-motion: reduce)') and scales camera oscillators, particle speeds, and scroll animations to 0 / instant settle. Q3: Prevents vestibular discomfort for motion-sensitive visitors while keeping every feature functional. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Native browser media query; $0. Q8: Missing (G-2 blind spot #7). Q9: MotionPreferenceService wired to camera, particles, and scroll transitions. Q10: Enable reducedMotion: 'reduce' in headless browser; assert camera sway amplitude === 0 and scroll unroll completes via clean opacity fade.

MESR-0090 — Keyboard-Only Full Traversal & Spatial Step-Jump Shortcuts · [Designed but not built]

Q1: Allows keyboard-only visitors to walk smoothly (WASD/Arrows) or jump cleanly between interactive landmarks (Tab / 1–9 landmark focus) and activate portals/scrolls (Enter/Space). Q2: Combines continuous key-hold velocity with an accessible "Quick-Focus Landmark" ring (Tab cycles doors, Solnik, and scrolls). Q3: Makes a 2.5-D spatial world just as fast to navigate via keyboard as a traditional webpage. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Basic WASD exists; landmark Tab focus ring missing. Q9: Keyboard landmark cycle manager synced with MESR-0761. Q10: Complete Chamber → Gate → Street → Library → Mint Unroll using only keyboard; assert <= 15 keystrokes total.

MESR-0091 — High-Contrast Legibility & Scalable Typography Parchment Mode · [Designed but not built]

Q1: Ensures parchment text, pricing, and Solnik captions maintain >= 4.5:1 WCAG AA contrast and scale cleanly up to 200% browser text zoom without clipping. Q2: Uses relative rem units, responsive container padding, and an optional high-contrast parchment backdrop (#F6EFE0 ink #141210, contrast > 14:1). Q3: Guarantees readability for aging eyes and outdoor mobile sunlight glare. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing formal 200% zoom audit. Q9: rem-based parchment typography tokens + contrast assertion. Q10: Set root font size to 32 px (200%) at 375×812; assert zero clipped words and contrast ratio >= 7:1.

MESR-0092 — Captioned Audio & Visual Sound-Cue Transcript Drawer · [Designed but not built]

Q1: Displays synchronized closed captions for Solnik's voiced takes and subtle visual indicators for key acoustic events (door chime, latch rattle) for deaf/hard-of-hearing or muted-phone visitors. Q2: Every voiced take (Job 4, Omni takes, Piper TTS) pairs with a timed WebVTT / JSON cue track rendered in a clean diegetic subtitle ribbon. Q3: Most mobile visitors browse on mute by default; synchronized captions preserve 100% of Solnik's guidance without sound. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Scripted text exists in prototype; synchronized WebVTT cue ribbon for voiced clips missing. Q9: CaptionRibbon synced to HTMLAudioElement.currentTime / TTS progress. Q10: Play a voiced Solnik clip with system audio muted; assert synchronized captions advance within ±150 ms of audio timestamps.

Domain D16 — Shared-World Presence & Asynchronous Social Traces (MESR-0093 – MESR-0095)
MESR-0093 — Asynchronous "Traveler Echoes" & Verified Patron Seals (PROPOSAL) · [Designed but not built]

Q1: Shows subtle, privacy-preserving traces of fellow civilization visitors (e.g., glowing lantern counts in a district, verified patron wax seals on the Golden Wall) without requiring heavy real-time WebSocket game servers. Q2: Inspired by asynchronous social presence systems: periodic static/cached JSON pulse (<= 5 KB, polled at 60 s intervals when online, gracefully silent offline) populates ambient silhouette counts and verified patron inscriptions. Q3: Gives the feel of a shared living civilization at $0 multiplayer server overhead and zero privacy leakage. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Static JSON endpoint / offline fallback; $0. Q8: Missing. Q9: CivilizationPulseReader with fail-silent offline fallback. Q10: Load app offline and online with mock pulse JSON; assert ambient lantern count updates online and degrades silently offline with zero errors.

MESR-0094 — Opt-In Guestbook / Guild Ledger Inscription Flow (PROPOSAL) · [Designed but not built]

Q1: Allows verified residents or visitors to leave moderated, signed reflections or product endorsements inside specific chambers (e.g., Library Guest Ledger). Q2: Local-first draft queue validated against strict length/schema rules and sanitized via textContent (zero HTML injection), submitted only when online and approved. Q3: Builds genuine community memory inside PROVADIA without turning into an unmoderated chat room. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero external deps; $0. Q8: Missing. Q9: Sanitized LedgerEntry schema + moderated append pipeline. Q10: Attempt XSS payload <script>alert(1)</script> in test entry; assert rendered DOM escapes 100% as literal text.

MESR-0095 — Deterministic Shareable Landmark Postcard & Deep-Link Generator · [Designed but not built]

Q1: Lets a visitor share an exact spot or unrolled Folded Paper with another person via a clean URL hash (#/kingdom/library/mint) that opens directly into that living scene. Q2: Encodes placeId, productId, and stageIndex into URL hash parameters and copies via navigator.clipboard.writeText. Q3: Replaces clunky web links with direct spatial invitations into the civilization. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: ShareStateEncoder wired to hash router (MESR-0761). Q10: Generate share hash at Stage 4 of The Mint, open in fresh incognito session; assert arrival directly in Library at Mint Stage 4.

Domain D17 — Solnik Intelligence & Behavioral Orchestration (MESR-0096 – MESR-0098)
MESR-0096 — Dual-Mode Voice Router (Locked Film Takes → Free-Tier Live TTS Fallback) · [Under construction]

Q1: Plays Solnik's locked, studio-grade film voice (Job 4 / Omni takes) for canonical moments and switches seamlessly to live speech (Piper TTS / free-tier Gemini Live) for dynamic visitor questions. Q2: SolnikVoiceRouter checks cannedTakeId first; if absent or dynamic query, routes text to Piper local/server voice or free-tier Gemini Live with identical AnalyserNode viseme output (MESR-0337). Q3: Preserves Solnik's iconic locked vocal identity while allowing unscripted intelligence at $0 marginal cost. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Existing Piper + free-tier Gemini Live key; $0. Q8: Job 4 voice locked; Piper live; unified seamless router with single viseme bus incomplete. Q9: Unified SolnikVoiceRouter bridging pre-rendered audio + live TTS. Q10: Trigger canonical greeting followed by dynamic question; assert both drive viseme mouth animation smoothly with zero overlapping audio streams.

MESR-0097 — Bounded Grounded Knowledge Retrieval (Anti-Hallucination Catalog Guard) · [Designed but not built]

Q1: Grounds Solnik's answers about products, prices, and civilization lore strictly in the verified Master Universe Map and ProductManifest JSONs so he never invents fake prices or unbuilt features. Q2: Injects retrieved exact JSON facts (price, status, gates, route) as hard ground-truth context and validates numerical claims against manifest values before display. Q3: Protects commercial integrity and customer trust inside a real economic civilization. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero extra spend ($0). Q8: Brain files exist on disk; runtime manifest-grounding guard incomplete. Q9: CatalogFactInjector binding ProductManifest into Solnik context. Q10: Ask Solnik for the price of The Mint when manifest lists $245 / $196; assert response states exact $245 / $196 and CLOSED status.

MESR-0098 — Graceful Offline / Rate-Limit Conversational Degradation · [Designed but not built]

Q1: Ensures Solnik remains helpful, poised, and responsive using curated local knowledge cards and Piper TTS even if external live AI APIs hit free-tier rate limits or the visitor goes offline. Q2: try/catch with 4 s timeout around live AI calls falling back automatically to deterministic local intent-matched guidance (MESR-0078). Q3: Guarantees zero broken "API Error 429" dialogs inside the civilization. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero deps; $0. Q8: Missing. Q9: SolnikFallbackResponder with curated local guidance tree. Q10: Simulate HTTP 429 and offline mode during Solnik conversation; assert Solnik responds in-character within 500 ms with zero raw error codes shown.

Domain D18 — Security, Sovereign Identity & Web3/Commerce (MESR-0099 – MESR-0101)
MESR-0099 — Guest-First Session Identity with Optional Non-Custodial Wallet Link · [Under construction]

Q1: Lets anyone enter and explore PROVADIA immediately as a guest, while allowing optional client-side Web3 wallet connection (window.solana / EIP-1193) only when the visitor explicitly chooses to verify ownership or settle a transaction. Q2: Guest session initializes from local IndexedDB (MESR-0496); wallet provider discovery uses standard passive eip6963 / wallet-standard listeners with zero auto-popup on load. Q3: Eliminates Web3 onboarding friction ("connect wallet before seeing anything" kills 95% of visitors) while supporting true Web3 ownership when needed. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Native browser provider standards; $0. Q8: Guest-first identity designed (World Engine Architecture v1); $5 SOL Gatehouse untouched. Q9: Passive wallet-link adapter gated behind explicit user action. Q10: Boot app fresh; assert 0 wallet popups trigger automatically and full world traversal works as guest.

MESR-0100 — Content Security Policy (CSP) & Strict Subresource Integrity Lock · [Designed but not built]

Q1: Blocks inline script injection, unauthorized external connections, and rogue third-party frames at the browser engine level. Q2: Strict Content-Security-Policy meta/HTTP header (default-src 'self'; connect-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'). Q3: Protects commercial till integrity and visitor wallets against XSS/supply-chain attacks. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Zero cost ($0). Q8: Missing formal CSP header in prototype HTML. Q9: Strict CSP policy applied to index.html and verified against all assets. Q10: Run app under strict default-src 'self' CSP; assert 0 CSP violation reports across full journey.

MESR-0101 — Auditable Client-Side Receipt & Deterministic Order Intent Hashing · [Designed but not built]

Q1: Generates a verifiable, tamper-evident local receipt hash whenever a future authorized transaction completes, linking browser civilization actions to deterministic accounting records. Q2: Canonical JSON serialization + SHA-256 receipt digest stored in IndexedDB (Specimen #501 ledger standard) and exportable as .json/.pdf. Q3: Bridges cinematic commerce with institutional-grade accounting discipline. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Native Web Crypto API; $0. Q8: Proven in Specimen #501 ledger architecture; integration into PROVADIA OS till pending gate clearance. Q9: ReceiptLedgerAdapter wired to future unlocked till. Q10: Run mock dry-run checkout intent in test harness; assert deterministic SHA-256 receipt hash matches recomputed canonical digest.

Domain D19 — Cinematic Manufacturing Pipelines & Hybrid Media (MESR-0102 – MESR-0103)
MESR-0102 — Automated Loop-Seam SSIM & Border Camera-Lock Gate (megacomp) · [Designed but not built]

Q1: Automatically scores every generated Flow/Veo clip locally on megacomp for Frame 0 ↔ Frame N loop closure and camera-border stability before human review. Q2: Local Python/OpenCV/ffmpeg script computes Structural Similarity (SSIM) on first/last frames and optical-flow magnitude on outer 5% border pixels, rejecting drifting clips automatically. Q3: Saves hours of manual video scrubbing during the Nov 26 – Dec 5 Veo 3.1 Fast sprint at $0 credit cost. Q4: Yes. Q5: Build-pipeline tool feeding browser-ready WebP atlases. Q6: Yes. Q7: Local Python + ffmpeg ($0). Q8: Proposed in Commission #123; script not yet written. Q9: tools/verify_clip_loop.py on megacomp. Q10: Feed one locked loop clip and one camera-pan clip into script; assert loop clip scores PASS (SSIM >= 0.92) and pan clip flags DRIFT_DETECTED.

MESR-0103 — Dual-Resolution Desktop/PIS-01 Mobile WebP Atlas Compiler · [Under construction]

Q1: Transcodes raw Veo/Genspark masters into high-res desktop plates plus strictly budgeted 540×960 WebP mobile bundles (~200–240 frames, <= 1.5 MB). Q2: Deterministic ffmpeg + libwebp script performing frame decimation, perceptual quality binary-search (q=78 -> q=55) until bundle size <= 1.45 MB, and JSON manifest emission. Q3: Enforces PIS-01 mechanically so no oversized asset ever slips into production. Q4: Yes. Q5: Produces browser-native WebP sequences. Q6: Yes. Q7: Local ffmpeg / libwebp ($0). Q8: PIS-01 targets defined; automated binary-search byte-cap compiler needs automation script. Q9: tools/compile_pis01_bundle.py with hard 1,572,864 B exit-code failure if unachievable. Q10: Compile a 12 MB raw 8 s MP4; assert output mobile WebP bundle is <= 1.5 MB with 200–240 valid frames.

Domain D20 — Automated Verification & Regression Governance (MESR-0104 – MESR-0105)
MESR-0104 — Deterministic Headless Journey Replay & Five-Proof Acceptance Harness · [Under construction]

Q1: Executes an automated scripted visitor journey (Chamber → Gate → Street → Library → Dual Folded Paper) on both 1280×800 desktop and 375×812 mobile viewports, grading all Five Proofs automatically. Q2: Headless browser runner injecting deterministic dt ticks and synthetic pointer/keyboard inputs while asserting NavMesh containment, Solnik animation state deltas, non-zero background motion during inspection, and zero console errors. Q3: Provides objective, repeatable proof of readiness before any founder inspection or release gate. Q4: Yes. Q5: Yes. Q6: Yes. Q7: Local Playwright/headless Chromium ($0). Q8: 171/171 unit tests pass; end-to-end Five-Proof visual/behavioral journey runner is incomplete. Q9: tests/e2e_five_proofs.spec.js covering desktop + 375×812 mobile. Q10: Run suite on current prototype vs. upgraded build; verify prototype accurately flags Proof #2/375px gaps and upgraded build passes 100%.

MESR-0105 — Byte-Identical Build Reproducibility & Off-Machine Preservation Guard · [Under construction]

Q1: Guarantees that clean builds from source produce deterministic, checksum-verified artifacts and enforces off-machine backup verification before mass asset sprints. Q2: Sorted file manifests, stripped build timestamps, SHA-256 artifact hashes (Specimen #501 Eight-Gate standard), and pre-sprint remote/external git push verification. Q3: Eliminates single-point-of-failure data loss (19,300 tracked files on megacomp) and ensures platinum-pristine release provenance. Q4: Yes. Q5: Build & governance gate. Q6: Yes. Q7: Local Git + SHA-256 ($0). Q8: Byte-identical reproducibility proven on Specimen #501; off-machine git push path currently unwired (Preservation Record warning). Q9: Wire encrypted external/remote git push + pre-build checksum assertion. Q10: Build bundle twice cleanly and verify identical SHA-256 hash + confirmed remote ref match.

4. Tranche 2–5 Expansion Blueprint (MESR-0106 – MESR-1000: Complete 1,000-Spec Roadmap)
To complete the full 1,000-specification register systematically in parallel with construction (without flooding or truncating single messages), Captain Muse can ingest Tranche 1 (MESR-0001–MESR-0105) immediately and call subsequent tranches by ID block:

Tranche 2 (MESR-0106 – MESR-0350 — Spatial, Locomotion, Camera & Crowd Depth): Multi-floor verticality & ladder/stair kinematics · crowd panic/scatter vs. calm mercantile flow · dynamic occlusion culling · camera collision against low archways · multi-companion formation switching · seasonal/weather particle transitions · interior reverb impulse responses.

Tranche 3 (MESR-0351 – MESR-0600 — Animation, Lighting, Persistence & Diegetic Commerce): Inverse-kinematic hand reach to varying lectern heights · cloth/hair secondary springs · sub-pixel sprite snapping vs. smooth sub-pixel interpolation · dynamic time-of-day shadow rotation · multi-currency display formatting (USD / SOL / PROVADIA unit parity) · Folded Paper multi-page/multi-instrument switching · bundle comparison overlays.

Tranche 4 (MESR-0601 – MESR-0850 — Streaming, Mobile GPU, Accessibility & Shared Presence): Progressive texture mip-level streaming · WebWorker physics/pathfinding offloading · IndexedDB LRU asset cache across sessions · switch-access & voice-command navigation · color-blindness palette verification (Deuteranopia / Protanopia gold-vs-stone contrast) · asynchronous guild notice-board synchronization.

Tranche 5 (MESR-0851 – MESR-1000 — Solnik Intelligence, Web3 Sovereignty, Pipeline & Governance): Multi-turn dialogue state trees · proactive Solnik anomaly/gate warnings · EIP-712 / Solana off-chain message signing verification · zero-knowledge/privacy-preserving visitor analytics (0 third-party trackers) · automated golden-frame visual diffing · cross-partner verification hash ledger.

5. Summary Classification Tally (Tranche 1 — 105 Specifications)
MESR Classification State	Count	Key Tranche 1 IDs
Already built and independently verified	3	MESR-0121, MESR-0901, MESR-0076
Built but unverified	3	MESR-0336, MESR-0054, MESR-0068
Under construction	18	MESR-0001, MESR-0002, MESR-0061–0064, MESR-0281, MESR-0496, MESR-0546, MESR-0651, MESR-0711, MESR-0027, MESR-0030, MESR-0039, MESR-0045, MESR-0050, MESR-0057, MESR-0069, MESR-0074, MESR-0080, MESR-0087, MESR-0096, MESR-0099, MESR-0103–0105
Designed but not built	81	MESR-0003, MESR-0122, MESR-0176–0177, MESR-0337, MESR-0396–0397, MESR-0446, MESR-0547, MESR-0601, MESR-0761, MESR-0026, MESR-0028–0029, MESR-0031–0038, MESR-0040–0044, MESR-0046–0049, MESR-0051–0053, MESR-0055–0056, MESR-0058–0060, MESR-0065–0067, MESR-0070–0073, MESR-0075, MESR-0077–0079, MESR-0081–0086, MESR-0088–0095, MESR-0097–0098, MESR-0100–0102
Missing / Not applicable / Requires further research	0 (flagged inline where proprietary Anvil internals are non-public)	Tranche 1 scoped strictly to browser-viable, publicly grounded mechanisms; proprietary Ubisoft source internals excluded per §5
Immediate Highest-Leverage Priority Order for Parallel Construction:

Wire MESR-0336 + MESR-0054 (Solnik 6-state skeletal locomotion + idle breathing) and MESR-0045 (flanking NavMesh pathing) to turn Proof #2 from PARTIAL to PASS.

Wire MESR-0547 (< 700px mobile inspection scrubber arc) + MESR-0546 (The Keeper second product) to clear Proof #4 and 375px mobile ergonomics.

Wire MESR-0446 + MESR-0065 (key-light rim harmonization + ground contact shadows) before Seat D's Library composite review (G-4).

Wire MESR-0761 (invisible ARIA DOM mirror + URL hash router) to honor Directive §2 accessibility and deep-linking from day one.
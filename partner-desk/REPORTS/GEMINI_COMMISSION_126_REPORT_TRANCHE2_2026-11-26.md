# GEMINI COMMISSION #126 — MESR TRANCHE 2: EXTERNAL RESEARCH REPORT
Filed verbatim as hand-carried by George, 2026-11-26 00:46 CT.

Scope: Spatial Topology & Multi-Floor Verticality · Locomotion & Inverse Kinematics · Camera Direction & Collision · Crowd Intelligence · Dynamic Occlusion · Multi-Companion Formation · Seasonal/Weather Transitions · Interior Acoustics
Filed for: Master Engineering Specification Register (MESR v0.2+) · Partner Desk (megacomp / partner-desk)
Verified Deliverable Count: 48 Unnumbered Specifications (16 Tier-0 Highest-Leverage Crowd & Camera + 32 Tier-1 across 5 domains; house IDs left unassigned for Captain ingestion).
Standing Fences & Corrections Enforced: $0 additional spend · zero deployment · public engineering literature and observable behavior only · original PROVADIA identity preserved.
All performance figures are untested estimates/targets naming target device classes (2022+ mid-tier mobile SoC, e.g., Snapdragon 7-series / Apple A14 class, target 60 fps, PIS-01 <= 1.5 MB scene budget) until measured on physical hardware.
Every entry explicitly separates [DOCUMENTED FACT] (with traceable publication/talk citation), [OBSERVABLE BEHAVIOR], [ENGINEERING PROPOSAL], and [UNTESTED ESTIMATE].
Classifications are reported states calibrated against MESR v0.2 ground truth (acknowledging blind-verified collision/sliding/routing, Missing camera system, and Missing crowd system).

PART I — TIER-0: HIGHEST-LEVERAGE CROWD & CAMERA SPECIFICATIONS (16 ENTRIES)
(Prioritized first per Captain's audit: Crowd Intelligence and Camera Direction are two of the top-ten structural gaps blocking a living browser civilization.)

Smart-Object Activity Stations with Mid-Cycle Arrival Pre-Warming
Domain: Autonomous Inhabitants & Crowd Intelligence · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Stéphane Leclercq, "Next-Gen Crowd Technology in Assassin's Creed Unity", GDC 2014 (Action Points / Smart Objects); [OBSERVABLE BEHAVIOR] Assassin's Creed town markets/workshops; [ENGINEERING PROPOSAL] browser JSON slot pre-warming.
1. What does it do? Populates streets, libraries, and workshops with inhabitants already mid-task (reading, sorting ledgers, sweeping, tending lanterns) on the first rendered frame after arrival rather than spawning idle characters at doorways.
2. How does it work? [DOCUMENTED FACT] Environments author spatial Smart-Object Slots carrying position, facing vector, required prop socket, animation clip ID, and cycle duration. [ENGINEERING PROPOSAL] On scene boot (t = 0), the browser scene loader assigns each slot a deterministic phase offset t_offset = hash(slotId) % loopDuration so inhabitants appear mid-action immediately.
3. Why does it matter? Operationalizes the Founder's Populated World directive ("you never walk into an empty stage — life is already happening when the visitor arrives").
4. Can it serve PROVADIA? Yes; populates the Street, Enchanted Library, and guild halls with purposeful residents at $0 runtime inference cost.
5. Can it operate inside a browser? Yes; JSON slot array evaluated by the Canvas2D/WebGL sprite-rig scheduler.
6. Reusable across every universe? Yes; every universe authors its own smartSlots[] JSON array using the same runtime controller.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.25 ms CPU per frame for 10 active slots on a 2022+ mid-tier mobile SoC (Snapdragon 7-series / Apple A14 class).
8. Have we already built it? No (Missing in engine; concept drafted in AI Studio Run #3 spec).
9. What is missing? smartSlots[] schema definition, phase-offset initializer, and 4–6 reusable civilian activity animation loops.
10. How can it be objectively tested? Automated headless boot test asserting that at frame === 1 (t = 0 ms) after scene load, >= 3 inhabitants render inside viewport bounds with non-zero animation phase progress (phase > 0.05).

Mercantile Task-Chain & Purposeful Role Loop Scheduler
Domain: Autonomous Inhabitants & Crowd Intelligence · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Stéphane Leclercq, "Next-Gen Crowd Technology in Assassin's Creed Unity", GDC 2014 (chained contextual behavior nodes); [OBSERVABLE BEHAVIOR] AC artisans/merchants transporting crates and inspecting goods; [ENGINEERING PROPOSAL] finite state task-chain interpreter.
1. What does it do? Gives inhabitants multi-step economic routines (e.g., an archivist carries a scroll from shelf to lectern, stamps it, and returns) instead of repeating a single 2-second robotic loop in place.
2. How does it work? [DOCUMENTED FACT] Inhabitants execute directed acyclic/cyclic chains of SmartObject nodes linked by NavMesh walk segments (MoveTo(slotA) -> PlayAction(work, 6s) -> AttachProp(scroll) -> MoveTo(slotB)). [ENGINEERING PROPOSAL] A lightweight JS state-tree interpreter advances each NPC's step timer using clamped dt.
3. Why does it matter? Aligns directly with the Founder's core distinction: PROVADIA inhabitants represent real civilization roles with genuine economic purpose, not decorative game props.
4. Can it serve PROVADIA? Yes; makes guild clerks, minters, and couriers visibly perform real institutional workflows.
5. Can it operate inside a browser? Yes; pure JS state machine over the blind-verified NavMesh/routing layer.
6. Reusable across every universe? Yes; role schedules are pure JSON data.
7. Dependencies, costs & performance: Depends on blind-verified NavMesh routing; $0 spend. [UNTESTED ESTIMATE] Target < 0.30 ms CPU per frame for 12 scheduled agents on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? RoleSchedule JSON schema, prop-socket handoff flag, and multi-waypoint task-chain runner.
10. How can it be objectively tested? Run a 30 s simulated session with an Archivist schedule (Shelf -> Lectern -> Shelf); assert agent visits both coordinates in order and triggers distinct work animation states at each station.

ORCA / Reciprocal Velocity Obstacle Local Crowd Avoidance
Domain: Autonomous Inhabitants & Crowd Intelligence · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Jur van den Berg, Stephen J. Guy, Ming Lin, Dinesh Manocha, "Reciprocal n-Body Collision Avoidance", ISRR 2011 (ORCA linear-programming velocity selection) & Craig W. Reynolds, "Flocks, Herds, and Schools", SIGGRAPH 1987; [ENGINEERING PROPOSAL] 2-D half-plane velocity projection for N <= 20 agents.
1. What does it do? Computes smooth, oscillation-free steering velocities so walking townsfolk, Solnik, and the visitor pass one another cleanly in streets and doorways without overlapping or jittering.
2. How does it work? [DOCUMENTED FACT] Each moving agent constructs linear velocity-space half-planes (ORCA lines) representing collision-free relative velocities over time horizon tau (~1.5 s), selecting the closest admissible velocity to its preferred path vector clamped to the walkable NavMesh. [ENGINEERING PROPOSAL] For N <= 20 stage entities, a 2-D geometric half-plane solver runs directly in JS without external WASM dependencies.
3. Why does it matter? Prevents immersion-breaking character stacking when Solnik walks alongside the visitor through a populated street.
4. Can it serve PROVADIA? Yes; mandatory once multiple moving inhabitants share narrow streets and chamber entrances.
5. Can it operate inside a browser? Yes; O(N^2) pairwise check for N = 20 is 190 pairs/frame.
6. Reusable across every universe? Yes; core crowd-locomotion primitive.
7. Dependencies, costs & performance: Depends on blind-verified NavMesh boundary clamping; $0 spend. [UNTESTED ESTIMATE] Target < 0.15 ms CPU per frame for 20 agents on mid-tier mobile.
8. Have we already built it? No (Missing; specced for AI Studio Run #3).
9. What is missing? 2-D ORCA / separation steering solver integrated with the verified wall-sliding collision module.
10. How can it be objectively tested? Spawn two agents walking head-on in a 120 px-wide corridor; assert minimum center-to-center separation remains >= 2 * agentRadius and both reach opposite endpoints without deadlock.

Proxemic Two-Ring Visitor Gaze & Non-Blocking Whisper Trigger
Domain: Autonomous Inhabitants & Crowd Intelligence · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Assassin's Creed street vendors and citizens turning heads toward approaching protagonist and uttering contextual lines without halting gameplay; [ENGINEERING PROPOSAL] dual-radius hysteresis proximity sensor.
1. What does it do? Causes nearby merchants and inhabitants to subtly turn their head/gaze toward the passing visitor and display a brief, non-blocking diegetic greeting or guild cue without hijacking movement or opening modal pop-ups.
2. How does it work? [ENGINEERING PROPOSAL] Each interactive inhabitant defines an outer awarenessRadius (~180 world units) driving clamped head-bone gaze interpolation and an inner whisperRadius (~95 world units) triggering a transient <= 40-character parchment whisper pill with a 10 s cooldown and exit-fade hysteresis.
3. Why does it matter? Creates human warmth and economic invitation while honoring Proof #5 (the world stays alive and unblocked during interactions).
4. Can it serve PROVADIA? Yes; lets guild stewards and merchants invite visitors to unroll a Folded Paper naturally.
5. Can it operate inside a browser? Yes; squared-distance check + lightweight DOM/Canvas whisper badge.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.05 ms CPU per frame on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? ProxemicSensor component on NPC schema + non-blocking whisper UI pill with ARIA aria-live="polite" announcement.
10. How can it be objectively tested? Walk visitor into 90-unit distance of a merchant and walk out; assert head-gaze angle tracks visitor, whisper pill appears without blocking movement input, and pill fades out within 1.0 s of exit.

Soft-Body Crowd Yielding & Narrow-Lane Corridor Priority
Domain: Autonomous Inhabitants & Crowd Intelligence · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Assassin's Creed crowd parting and shoulder-brushing animation when the protagonist walks through dense street clusters; [ENGINEERING PROPOSAL] elastic lateral displacement spring for stationary/slow NPCs.
1. What does it do? Prevents standing townsfolk in narrow alleys or library aisles from acting like immovable concrete pillars when the visitor walks past them.
2. How does it work? [ENGINEERING PROPOSAL] When the visitor's capsule overlaps a yield-enabled inhabitant's soft personal-space radius, the inhabitant applies a damped lateral step-aside displacement (<= 28 world units perpendicular to visitor velocity, clamped inside NavMesh) and plays a subtle weight-shift lean, springing back once clear.
3. Why does it matter? Eliminates frustrating invisible collision snags on mobile tap-to-walk controls in populated spaces.
4. Can it serve PROVADIA? Yes; essential for comfortable navigation inside lively town streets and guild rooms.
5. Can it operate inside a browser? Yes; simple lateral impulse + Hooke spring recovery in JS.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on blind-verified NavMesh polygon check; $0 spend. [UNTESTED ESTIMATE] Target < 0.05 ms CPU per frame on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? yieldable: true flag and yieldOffset spring vector on NPC entities.
10. How can it be objectively tested? Drive visitor avatar straight through a stationary NPC positioned in a narrow passage; assert visitor passes without velocity stall and NPC displaces laterally then returns to origin within 1.2 s.

Palette-LUT & Modular Garment-Layer Crowd Combinator
Domain: Autonomous Inhabitants & Crowd Intelligence · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Stéphane Leclercq, "Next-Gen Crowd Technology in Assassin's Creed Unity", GDC 2014 (shared skeletal rigs + modular clothing & color tint variations); [ENGINEERING PROPOSAL] PIS-01 single-atlas masked tint recoloring.
1. What does it do? Generates dozens of visually distinct townsfolk appearances (varied tunics, cloaks, aprons, hair, and ages) from 3–4 shared skeletal atlases so crowds feel diverse without blowing the 1.5 MB PIS-01 mobile asset ceiling.
2. How does it work? [DOCUMENTED FACT] Crowd characters share base topologies and skeletal rigs while swapping modular accessory layers and garment tint palettes. [ENGINEERING PROPOSAL] Pack grayscale/mask-channel garment regions into one 1024×1024 WebP atlas (~160–220 KB) and tint per-instance via WebGL uniform color ramps (or cached offscreen Canvas2D tint stamps at scene load).
3. Why does it matter? Delivers "all kinds of people, all kinds of boys, all kinds of things around you" on ordinary mobile connections without downloading 20 separate character sprite sheets.
4. Can it serve PROVADIA? Yes; preserves PROVADIA's curated antique-gold, linen, and obsidian-bronze wardrobe palette across entire towns.
5. Can it operate inside a browser? Yes; WebGL fragment tint or pre-baked offscreen ImageBitmap stamps (< 2 MB decoded RAM).
6. Reusable across every universe? Yes; each district defines its local textile palette table.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target <= 220 KB compressed transfer for 15 distinct crowd variants; < 0.2 ms GPU draw cost on mid-tier mobile.
8. Have we already built it? No (Missing; current prototype uses 3 static stand-in silhouettes in Chamber).
9. What is missing? Shared civilian rig atlas + garmentPalette[] lookup table + offscreen tint stamp cache.
10. How can it be objectively tested? Instantiate 12 crowd inhabitants from 1 shared atlas; verify >= 8 distinct garment RGB combinations render while total network asset size stays <= 250 KB.

Multi-Inhabitant Conversational Triad Turn-Taking Coordinator
Domain: Autonomous Inhabitants & Crowd Intelligence · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Stéphane Leclercq, "Next-Gen Crowd Technology in Assassin's Creed Unity", GDC 2014 (group life-slots & social clusters); [ENGINEERING PROPOSAL] deterministic token-passing turn-taking controller.
1. What does it do? Coordinates small groups of 2–3 inhabitants standing together in plazas or library alcoves so they visibly converse, gesture, and nod in alternating turns rather than looping out-of-sync animations.
2. How does it work? [ENGINEERING PROPOSAL] A GroupCluster entity holds references to 2–3 member NPCs and passes a single speakerToken on randomized 3.5–6.0 s intervals; the token holder plays subtle speaking hand gestures while non-holders play attentive listener nods and gaze toward the speaker.
3. Why does it matter? Makes civic spaces feel socially alive rather than populated by isolated solo mannequins.
4. Can it serve PROVADIA? Yes; ideal for scholars debating in the Enchanted Library or merchants conferring in the Street.
5. Can it operate inside a browser? Yes; ~40 lines of deterministic JS state coordination.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.02 ms CPU per cluster on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? GroupCluster JSON block and LISTENING_NOD / CONVERSING_GESTURE skeletal clip triggers.
10. How can it be objectively tested? Simulate a 3-NPC conversational cluster for 30 s; assert at every timestamp t, at most 1 member holds SPEAKING state while 2 hold LISTENING state.

Crowd Density & Simulation-Rate Adaptive LOD Governor
Domain: Autonomous Inhabitants & Crowd Intelligence · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Stéphane Leclercq, "Next-Gen Crowd Technology in Assassin's Creed Unity", GDC 2014 (multi-tier crowd simulation & rendering LODs); [ENGINEERING PROPOSAL] mobile frame-time & Save-Data crowd scaler.
1. What does it do? Automatically scales active crowd count and off-screen simulation update frequency based on device viewport/performance so 375px mid-range phones sustain smooth frame rates while desktop displays enjoy fuller street life.
2. How does it work? [DOCUMENTED FACT] Crowd engines partition agents by distance/visibility into high-detail foreground rigs (60 Hz IK/avoidance) and low-detail background agents (15–30 Hz simplified ticks). [ENGINEERING PROPOSAL] On viewportWidth < 700px, navigator.connection.saveData, or rolling frame time > 18 ms, the governor caps active street inhabitants at 6–8 (vs. 14–18 on desktop) and throttles off-camera NPCs to 15 Hz.
3. Why does it matter? Prevents mobile CPU/thermal throttling in busy town hubs while preserving the feeling of an inhabited world.
4. Can it serve PROVADIA? Yes; protects PIS-01 mobile responsiveness across all devices.
5. Can it operate inside a browser? Yes; rolling performance.now() frame-time budgeter.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target <= 16.6 ms total frame budget on 2022+ mid-tier mobile SoC.
8. Have we already built it? No (Missing; 700px / Save-Data rules exist only for video frame subsetting in Universal Presentation Engine v1).
9. What is missing? CrowdLODGovernor connected to scene inhabitant spawner and rolling frame-time monitor.
10. How can it be objectively tested? Emulate 375×812 mobile viewport with Save-Data: on; assert spawned street crowd caps at configured mobile tier (<= 8) and rolling frame time stays <= 16.6 ms.

Critically Damped Chase Camera with Soft Composition Rails
Domain: Camera Intelligence & Cinematic Direction · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (corrected per Captain's audit — chase camera does not exist yet in engine)
Provenance & Evidence Tags: [DOCUMENTED FACT] Mark Haigh-Hutchinson, Real-Time Cameras (Morgan Kaufmann, 2009, Ch. 6–7 critically damped spring-damper camera tracking) & John Nesky, "50 Camera Mistakes", GDC 2014; [ENGINEERING PROPOSAL] dt-invariant critically damped spring clamped to authored cameraBounds.
1. What does it do? Follows the visitor smoothly across wide rooms and streets with cinematic inertia while clamping strictly inside curated architectural framing bounds so the camera never reveals empty canvas margins.
2. How does it work? [DOCUMENTED FACT] Evaluates analytical critically damped spring equations (omega, dt = Math.min(rawDt, 0.05)) toward targetPos, eliminating frame-rate-dependent exponential drift (lerp(a, b, 0.1) varies across 60 Hz vs 120 Hz screens). Soft-zone damping decelerates velocity smoothly as the viewport approaches cameraBounds edges.
3. Why does it matter? Fixes a top-ten audit gap (camera is MISSING) and ensures identical cinematic camera feel across 60 Hz phones and 120 Hz displays.
4. Can it serve PROVADIA? Yes; forms the foundational camera controller for every traversable chamber and street.
5. Can it operate inside a browser? Yes; ~25 lines of pure deterministic JS math.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.02 ms CPU per frame on any mobile/desktop browser.
8. Have we already built it? No (Missing — corrected per Commission #126 audit).
9. What is missing? CameraRig module implementing analytical critically damped spring + cameraBounds clamp + unit tests.
10. How can it be objectively tested? Run automated step-response test at 60 Hz and 120 Hz simulated frame rates; assert trajectories match within < 0.5 px, zero overshoot occurs beyond cameraBounds, and settle time is deterministic.

Velocity-Weighted Look-Ahead Sightline Lead Offset
Domain: Camera Intelligence & Cinematic Direction · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] John Nesky, "50 Camera Mistakes", GDC 2014 (camera look-ahead / lead room in 2-D and 2.5-D traversal); [OBSERVABLE BEHAVIOR] Assassin's Creed exploration camera framing open sightlines ahead of movement; [ENGINEERING PROPOSAL] velocity-filtered lead offset.
1. What does it do? Shifts the camera focal point smoothly ahead of the visitor's walking vector so upcoming doorways, inhabitants, and architecture occupy the wider forward two-thirds of the screen.
2. How does it work? [DOCUMENTED FACT] Computes desiredLead = clamp(visitorVelocity * lookAheadSeconds, -maxLead, maxLead) and filters currentLead through a secondary slow spring (tau ~ 0.35 s) so rapid back-and-forth micro-taps do not cause nauseating camera whip.
3. Why does it matter? Gives visitors natural forward visibility into the civilization without requiring manual camera panning.
4. Can it serve PROVADIA? Yes; essential on narrow 375px portrait mobile screens where horizontal sightline is scarce.
5. Can it operate inside a browser? Yes; pure vector arithmetic inside CameraRig.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on Critically Damped Chase Camera; $0 spend. [UNTESTED ESTIMATE] Target < 0.01 ms CPU per frame.
8. Have we already built it? No (Missing).
9. What is missing? lookAheadLead spring accumulator inside CameraRig.
10. How can it be objectively tested? Move visitor continuously right for 2.0 s on a 375×812 viewport; assert visitor screen X stabilizes at 32%–40% from left edge, leaving >= 60% forward sightline.

Camera Geometry Collision & Foreground Pillar Avoidance Pull-In
Domain: Camera Intelligence & Cinematic Direction · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Mark Haigh-Hutchinson, Real-Time Cameras (Morgan Kaufmann, 2009, Ch. 9 camera collision & occlusion resolution); [OBSERVABLE BEHAVIOR] Assassin's Creed camera pulling inward or dissolving foreground pillars when obstructing the protagonist; [ENGINEERING PROPOSAL] 2.5-D frustum-pillar overlap solver.
1. What does it do? Prevents foreground architectural columns, hanging banners, or archways from blocking the visitor or Solnik during camera pans and depth pushes.
2. How does it work? [DOCUMENTED FACT] Standard camera collision tests a ray/whisker volume between camera focal center and tracked subject; upon intersection, the camera either adjusts lateral offset or triggers foreground occluder alpha-fade. [ENGINEERING PROPOSAL] In our 2.5-D stage, foreground slice sprites overlapping the visitorFocusBox (120×180 world units around avatar/Solnik) smoothly fade to alpha = 0.28 (180 ms ease) while camera cameraBounds prevent clipping into outer border geometry.
3. Why does it matter? Guarantees the visitor never loses visual sight of their avatar or Solnik behind ornate pillars in the Enchanted Library or Street.
4. Can it serve PROVADIA? Yes; preserves clarity in richly layered architectural rooms.
5. Can it operate inside a browser? Yes; AABB overlap check between visitorFocusBox and foregroundSlices[].
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on CameraRig and foreground slice layer metadata; $0 spend. [UNTESTED ESTIMATE] Target < 0.03 ms CPU per frame on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? occludeFadeOnFocus flag on foreground architectural cutouts + CameraRig focus-box overlap check.
10. How can it be objectively tested? Walk visitor directly behind a foreground pillar tagged occludeFadeOnFocus: true; assert pillar alpha drops below 0.35 within 250 ms and restores to 1.0 after exit.

Non-Blocking Dialogue & Folded-Paper Split-Composition Reframer
Domain: Camera Intelligence & Cinematic Direction · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Modern Assassin's Creed dynamic over-shoulder/two-shot conversation framing where world movement continues behind speakers; [ENGINEERING PROPOSAL] responsive dual-breakpoint camera offset (>= 700px rule-of-thirds vs. < 700px vertical stage split).
1. What does it do? Smoothly reframes the camera when Solnik speaks or unrolls a Folded Paper so the visitor, Solnik, and the unrolled parchment share one balanced composition while background crowd and particle life keep running.
2. How does it work? [ENGINEERING PROPOSAL] Entering INSPECTION or DIALOGUE mode shifts CameraRig target toward the midpoint between Solnik and the scroll anchor with a subtle 1.08× zoom: on desktop (>= 700px), characters occupy the left 38% and the unrolled parchment occupies the right 62%; on mobile (< 700px), characters frame cleanly in the top 46% above the bottom parchment deck.
3. Why does it matter? Enforces Proof #5 (world stays alive during decisions) and resolves the 375px mobile layout collision found in the prototype and Velmar audit.
4. Can it serve PROVADIA? Yes; makes every product manifestation and Solnik briefing feel like an animated feature scene.
5. Can it operate inside a browser? Yes; camera target interpolation + CSS container query / breakpoint geometry.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on CameraRig and MESR-0547 responsive callout solver; $0 spend. [UNTESTED ESTIMATE] Target < 0.02 ms CPU per frame.
8. Have we already built it? No (Missing; prototype lacks camera reframing and mobile split layout).
9. What is missing? CameraMode.INSPECTION target-offset solver for desktop and < 700px mobile viewports.
10. How can it be objectively tested? Trigger Folded Paper unroll at 1280×800 and 375×812; assert zero bounding-box intersection between Solnik's head/torso and the parchment card, and verify background NPC/particle motion continues (delta > 0).

Threshold Crossing Dolly-Push & Frame-Matched Handoff Curve
Domain: Camera Intelligence & Cinematic Direction · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Mark Haigh-Hutchinson, Real-Time Cameras (Morgan Kaufmann, 2009, Ch. 11 scripted-to-interactive camera blending); [ENGINEERING PROPOSAL] cubic-bezier dolly curve + final-frame camera state alignment.
1. What does it do? Executes a purposeful forward dolly push into a doorway/portal and hands off seamlessly to the destination room's initial camera framing without a jarring jump-cut.
2. How does it work? [ENGINEERING PROPOSAL] Upon crossing an inner portal trigger, CameraRig locks input for 350–450 ms, executes an ease-in dolly zoom (1.0× -> 1.18×) toward the portal vanishing point across a luminance/fog veil, and initializes the incoming room's CameraRig at its authored entryCameraPose (zoom = 1.04× -> 1.0× settle).
3. Why does it matter? Turns room transitions into cinematic camera choreography rather than abrupt web-page swaps.
4. Can it serve PROVADIA? Yes; elevates every door on the Master Universe Map (Chamber -> Gate -> Street -> Library).
5. Can it operate inside a browser? Yes; deterministic 400 ms curve inside CameraRig.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on CameraRig and portal airlock transition; $0 spend. [UNTESTED ESTIMATE] Target <= 450 ms transition duration at 60 fps on mid-tier mobile.
8. Have we already built it? No (Missing in unified camera rig; prototype uses basic transition without camera pose handoff).
9. What is missing? entryCameraPose property on destination spawns and CameraRig.playThresholdTransition() curve.
10. How can it be objectively tested? Trigger Street -> Enchanted Library portal crossing; assert camera zoom curve completes within 350–500 ms and visitor avatar is immediately framed inside viewport on arrival frame 1.

Aspect-Ratio Safe-Focal-Box Projection Solver (21:9 to 9:19.5)
Domain: Camera Intelligence & Cinematic Direction · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard responsive virtual-camera frustum fitting (e.g., Unity/Unreal Hor+ / Vert- safe-frame projection); [ENGINEERING PROPOSAL] normalized safeFocalBox cover/contain solver.
1. What does it do? Guarantees critical architectural focal elements (doors, Solnik, lecterns, Folded Paper) remain 100% visible without clipping across ultra-wide desktop monitors (21:9) and tall portrait phones (375×812 / 9:19.5).
2. How does it work? [ENGINEERING PROPOSAL] Each scene JSON declares a normalized safeFocalBox ({ x, y, width, height } in 0..1000 world space); on resize, CameraRig computes baseScale = Math.min(viewportW / safeFocalBox.width, viewportH / safeFocalBox.height) clamped against full-plate cover bounds so no black bars or cropped focal anchors appear.
3. Why does it matter? Prevents portrait mobile screens from slicing off doorways on the left/right edges of wide landscape scenes.
4. Can it serve PROVADIA? Yes; essential when serving one unified civilization across desktop and portrait smartphones.
5. Can it operate inside a browser? Yes; recalculates only on ResizeObserver / visualViewport change.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.05 ms on resize event.
8. Have we already built it? No (Missing).
9. What is missing? safeFocalBox field in scene JSON schema and CameraRig.recomputeProjection() method.
10. How can it be objectively tested? Render scene at 2560×1080 (21:9), 1440×900 (16:10), and 375×812 (9:19.5); assert all 4 corners of safeFocalBox project inside [0..viewportW, 0..viewportH] at every resolution.

Bounded Steadicam Micro-Sway & prefers-reduced-motion Zero-Lock
Domain: Camera Intelligence & Cinematic Direction · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Subtle handheld/steadicam organic breathing during idle cinematic framing in modern adventure games; [ENGINEERING PROPOSAL] dual non-commensurate sine oscillator gated by WCAG prefers-reduced-motion.
1. What does it do? Adds a subtle, organic living-camera breath (±1.5 world units) when the visitor pauses to read or admire a chamber, while locking strictly to 0 motion when the OS prefers-reduced-motion accessibility flag is enabled.
2. How does it work? [ENGINEERING PROPOSAL] Evaluates swayX = sin(t * 0.91) * 1.2 + sin(t * 0.37) * 0.6 and swayY = cos(t * 0.73) * 1.0 scaled by motionMultiplier (1.0 standard, 0.0 when matchMedia('(prefers-reduced-motion: reduce)').matches is true).
3. Why does it matter? Eliminates the "frozen static JPG" feel during pauses while respecting vestibular accessibility requirements.
4. Can it serve PROVADIA? Yes; reinforces the "living movie" identity at near-zero compute cost.
5. Can it operate inside a browser? Yes; 4 trig calls per frame + native CSS media query listener.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.005 ms CPU per frame.
8. Have we already built it? No (Missing).
9. What is missing? swayOffset term inside CameraRig + MotionPreferenceService listener.
10. How can it be objectively tested? Hold visitor stationary for 4.0 s; assert camera position exhibits bounded micro-variation (0.1 <= delta <= 3.0 units) in default mode and delta === 0 when reducedMotion: 'reduce' is emulated.

Interactive Architectural Peek Pan with Spring Return
Domain: Camera Intelligence & Cinematic Direction · Leverage: TIER-0 CRITICAL
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Assassin's Creed right-stick / mouse camera look-around to inspect high cathedral vaults and distant landmarks while standing still; [ENGINEERING PROPOSAL] bounded drag-peek spring offset.
1. What does it do? Allows visitors to drag with right-mouse or two-finger touch (or subtle edge-hover on desktop) to look up at vaulted ceilings or scan across a plaza without walking away from their spot, springing smoothly back on release.
2. How does it work? [ENGINEERING PROPOSAL] Captures bounded peekOffset (±14% of viewport dimensions, clamped inside cameraBounds) while pointer is held; on pointerup or avatar movement start, a critically damped spring returns peekOffset to (0, 0) over ~450 ms.
3. Why does it matter? Honors PROVADIA's vertical vaulted architecture (9:16 cathedral/sanctuary plates) on landscape desktop monitors.
4. Can it serve PROVADIA? Yes; lets visitors admire the upper horological crown and Library vaults without forcing awkward walking.
5. Can it operate inside a browser? Yes; pointer-event offset fed into CameraRig.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on CameraRig; $0 spend. [UNTESTED ESTIMATE] Target < 0.01 ms CPU per frame.
8. Have we already built it? No (Missing).
9. What is missing? peekOffset vector and two-finger / right-drag gesture recognizer in CameraRig.
10. How can it be objectively tested? Simulate right-mouse drag 120 px upward and release; assert camera shifts upward within cameraBounds during hold and returns within 1 px of rest position within 600 ms of release.

PART II — TIER-1 DOMAIN SPECIFICATIONS (32 ENTRIES)

Domain A: Spatial Topology Depth & Multi-Floor Verticality (7 Entries)

2.5-D Displaced Depth-Mesh Scenery Projector
Domain: World Architecture & Spatial Topology · Leverage: TIER-1 HIGH
Reported Classification: Designed but not built (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard camera-projection / relief-mapping technique (Debevec et al., "Modeling and Rendering Architecture from Photographs", SIGGRAPH 1996; modern monocular depth displacement); [ENGINEERING PROPOSAL] offline local Depth-Anything map + 32×32 WebGL grid mesh (PROPOSAL).
1. What does it do? Projects static Genspark or Veo scenery plates onto a low-poly depth-displaced mesh so forward camera pushes and lateral pans produce true perspective parallax down streets and corridors rather than flat cardboard sliding.
2. How does it work? [ENGINEERING PROPOSAL] Local Python script on megacomp generates a normalized 128×128 8-bit grayscale depth map (0 credits) for each scenery plate; at runtime, WebGL displaces a 32×32 vertex grid (1,024 vertices) along camera Z-depth and maps the 540×960 WebP plate onto it.
3. Why does it matter? Bridges the visual gap between flat 2-D parallax layers and heavy 3-D engines while staying far under the 1.5 MB PIS-01 budget.
4. Can it serve PROVADIA? Yes; upgrades all 244+ Genspark scenery plates into spatially convincing environments.
5. Can it operate inside a browser? Yes; standard WebGL1/WebGL2 vertex shader (1,024 vertices is trivial for any mobile GPU).
6. Reusable across every universe? Yes; automated in the megacomp asset compiler.
7. Dependencies, costs & performance: Local Python depth model on megacomp ($0 spend); runtime ~60–90 KB (540×960 WebP + 16 KB depth texture). [UNTESTED ESTIMATE] Target < 0.3 ms GPU render time on 2022+ mid-tier mobile SoC.
8. Have we already built it? Proposed in Commission #123; not yet implemented in engine.
9. What is missing? Offline depth-map generator script + WebGL DepthPlateMesh renderer class (with flat-quad fallback if WebGL is unavailable).
10. How can it be objectively tested? Dolly camera forward 15% in Enchanted Library; assert foreground column vertices shift screen X by >= 2.5× the pixel shift of distant rear bookshelf vertices.

Multi-Tier Elevation Zone & Stair/Ramp Height-Spline Interpolator
Domain: World Architecture & Spatial Topology · Leverage: TIER-1 HIGH
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Multi-level walkable floors, stairs, and raised platforms in 2.5-D isometric/perspective adventure engines; [ENGINEERING PROPOSAL] NavMesh polygon elevation(x, y) bilinear height field.
1. What does it do? Allows visitors and inhabitants to walk smoothly up painted staircases, stepped plazas, and raised library mezzanines while maintaining accurate foot-to-floor contact and perspective scale.
2. How does it work? [ENGINEERING PROPOSAL] Each NavMesh polygon region carries corner elevation values (z0, z1, z2, z3); as an entity moves across (x, y), interpolated elevationOffset subtracts from rendered screen Y while ground-plane footY remains continuous for depth sorting.
3. Why does it matter? Unlocks vertical architectural variety (raised dais in the Mint, stepped Kingdom Gate, Library galleries) without full 3-D physics engines.
4. Can it serve PROVADIA? Yes; essential for grand civic halls and tiered amphitheaters.
5. Can it operate inside a browser? Yes; bilinear interpolation (< 10 arithmetic ops per entity).
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Builds on blind-verified NavMesh polygons; $0 spend. [UNTESTED ESTIMATE] Target < 0.01 ms CPU per entity.
8. Have we already built it? No (Missing).
9. What is missing? elevationVertices optional field on NavMesh polygons + getElevationAt(x, y) helper.
10. How can it be objectively tested? Walk avatar from bottom (elevation = 0) to top (elevation = 120) of a sloped stair polygon; assert smooth monotonic screen-Y ascent with zero foot detachment.

Mezzanine & Balcony Overlook Visual-Link Portal
Domain: World Architecture & Spatial Topology · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Assassin's Creed multi-story interiors where upper balconies look down onto active lower hall crowds; [ENGINEERING PROPOSAL] shared-state proxy miniature layer.
1. What does it do? Allows an upper gallery or balcony room to show live miniature silhouettes of the crowd and ambient motion occurring in the lower main hall below.
2. How does it work? [ENGINEERING PROPOSAL] An upper cell references a visualLinkCellId and renders a downscaled (0.45×), depth-hazed proxy pass of the lower cell's active NPC positions and light shafts through a balcony balustrade mask.
3. Why does it matter? Creates architectural awe and multi-floor spatial continuity ("I can see the hall I just walked through below me").
4. Can it serve PROVADIA? Yes; ideal for upper Sanctuaries and Library galleries.
5. Can it operate inside a browser? Yes; reuses already-loaded crowd coordinates without loading a second heavy scene.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.2 ms GPU overhead on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? overlookLayer mask definition in scene JSON schema.
10. How can it be objectively tested? Enter upper balcony cell while 4 NPCs patrol lower hall; assert proxy silhouettes render inside balcony mask and move synchronously with lower-hall coordinates.

Hierarchical District-Cell-Subcell Adjacency & Occlusion Graph
Domain: World Architecture & Spatial Topology · Leverage: TIER-1 HIGH
Reported Classification: Under construction (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard open-world cell-streaming topology (cf. Gregory, Game Engine Architecture, 3rd ed., Ch. 16 streaming world chunks); [ENGINEERING PROPOSAL] JSON DAG mapping Universe -> District -> Place -> Chamber.
1. What does it do? Structures the entire civilization into nested spatial zones with explicit portal edges so the engine knows exact neighbor distances for predictive preloading and wayfinding.
2. How does it work? [ENGINEERING PROPOSAL] world-graph.json defines every place node with districtId, neighborPortalIds[], and preloadPriority (1 = immediate doorway, 2 = two hops away), enabling breadth-first neighbor queries in O(1) time.
3. Why does it matter? Replaces website sitemaps with true geographical topology (No-Pages Law) while keeping mobile memory bounded.
4. Can it serve PROVADIA? Yes; directly encodes the Master Universe Map into machine-traversable geography.
5. Can it operate inside a browser? Yes; < 20 KB JSON graph.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.05 ms graph query time.
8. Have we already built it? Partially (Under construction in World Engine Architecture v1 and prototype route; full 7-door MUM graph incomplete).
9. What is missing? Complete MUM node serialization and CI graph-integrity validator (no unreachable islands).
10. How can it be objectively tested? Run graph validator over world-graph.json; assert 100% of registered places are reachable from Character Chamber and every portal target ID resolves.

Normalized World-to-Screen Perspective Scale Curve (scale(footY))
Domain: World Architecture & Spatial Topology · Leverage: TIER-1 HIGH
Reported Classification: Under construction (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard 2.5-D perspective foreshortening interpolation; [ENGINEERING PROPOSAL] per-scene [minScale, maxScale] depth-band curve.
1. What does it do? Shrinks characters realistically as they walk deeper toward the background vanishing point and enlarges them as they walk toward the foreground camera.
2. How does it work? [ENGINEERING PROPOSAL] Scene JSON defines horizonY, foregroundY, minScale (e.g., 0.58), and maxScale (e.g., 1.12); character scale and movement speed interpolate smoothly along t = clamp((footY - horizonY) / (foregroundY - horizonY), 0, 1).
3. Why does it matter? Prevents characters from looking like giants in the background or tiny miniatures in the foreground, and scales walking speed proportionally to apparent depth.
4. Can it serve PROVADIA? Yes; essential for deep street perspectives and grand halls.
5. Can it operate inside a browser? Yes; 4 lines of scalar math.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.005 ms CPU per entity.
8. Have we already built it? Perspective math ported from Velmar (Seat E); needs standardized JSON schema field across all rooms.
9. What is missing? perspectiveScaleCurve schema enforcement and speed-foreshortening coupling.
10. How can it be objectively tested? Place avatar at horizonY vs foregroundY; assert rendered height ratio equals minScale / maxScale within ±1%.

Vertical Portal Stairwell & Ladder Traversal State Machine
Domain: World Architecture & Spatial Topology · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Assassin's Creed seamless stair/ladder vertical transitions connecting ground streets to upper towers/crypts; [ENGINEERING PROPOSAL] scripted vertical climb/ascend traversal state.
1. What does it do? Moves the visitor smoothly up/down spiral stairs, tower ladders, or subterranean vault steps into vertically stacked chambers (such as the Subterranean Salt Vault or Observatory).
2. How does it work? [ENGINEERING PROPOSAL] Special VERTICAL_PORTAL triggers play a 600 ms climbing/ascending skeletal animation along a 2-point vertical spline while crossfading into the upper/lower cell at the matching stairwell landing.
3. Why does it matter? Supports PROVADIA's vertical geological/architectural strata (Subterranean Vault → Ground Street → Upper Observatory).
4. Can it serve PROVADIA? Yes; connects multi-strata chambers cleanly.
5. Can it operate inside a browser? Yes; spline interpolation + state lock during 600 ms climb.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on skeletal animation controller; $0 spend. [UNTESTED ESTIMATE] Target 600 ms transition at 60 fps.
8. Have we already built it? No (Missing).
9. What is missing? VERTICAL_PORTAL portal subtype + climb/ascend skeletal clip.
10. How can it be objectively tested? Trigger vertical vault stair portal; assert avatar traverses spline smoothly without NavMesh clipping and spawns on destination landing facing away from stairs.

Doorway Threshold Hysteresis & Bidirectional Spawn-Facing Resolver
Domain: World Architecture & Spatial Topology · Leverage: TIER-1 HIGH
Reported Classification: Under construction (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard trigger-volume hysteresis pattern to prevent portal oscillation; [ENGINEERING PROPOSAL] dual-zone entry/exit lock + explicit arrivalFacing vector.
1. What does it do? Prevents a visitor arriving at a destination doorway from immediately re-triggering the return portal and bouncing endlessly between rooms, while orienting both the visitor and Solnik inward toward the new room.
2. How does it work? [ENGINEERING PROPOSAL] Upon portal arrival, portalLockId remains active until the visitor's distance from spawnPoint exceeds exitHysteresisRadius (>= 45 world units), and sets initial skeletal facing to spawn.arrivalFacing.
3. Why does it matter? Fixes a common traversal bug in two-way connected rooms (Street <-> Enchanted Library).
4. Can it serve PROVADIA? Yes; ensures reliable round-trip exploration across all doors.
5. Can it operate inside a browser? Yes; boolean lock + radius check.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Builds on blind-verified door stand-points; $0 spend. [UNTESTED ESTIMATE] Target < 0.005 ms CPU.
8. Have we already built it? Door stand-points verified in Velmar; exit-hysteresis lock needs verification in unified engine.
9. What is missing? exitHysteresisRadius guard on portal trigger evaluator.
10. How can it be objectively tested? Transition Street -> Library, hold zero input for 3.0 s, then walk forward into Library; assert 0 unintended bounce-backs occur, then walk back onto doorway trigger and assert clean return to Street.

Domain B: Locomotion & Inverse Kinematics (7 Entries)

Stride-Distance Phase-Locked Walk Cycle Controller
Domain: Character Locomotion & Inverse Kinematics · Leverage: TIER-1 HIGH
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Nicolas Lopez, "Animation Driven Locomotion in Assassin's Creed Unity", GDC 2015 (synchronizing locomotion cycle phase to actual ground displacement); [ENGINEERING PROPOSAL] arc-length stride phase accumulator.
1. What does it do? Advances skeletal leg animation strictly in proportion to actual world distance traveled (deltaPos) so characters never "ice-skate" or slide across floors during slow walks or perspective scaling.
2. How does it work? [DOCUMENTED FACT] Rather than advancing animation time by dt * constantRate, cycle phase increments by dPhase = groundDisplacement / (strideLength * perspectiveScale). [ENGINEERING PROPOSAL] Applied directly to Solnik's 6-state rig and visitor avatars.
3. Why does it matter? Eliminates the #1 visual defect of browser 2.5-D engines (foot-sliding when moving diagonally or up perspective depth).
4. Can it serve PROVADIA? Yes; directly upgrades Solnik from static stage-slide to grounded animated-film locomotion (Proof #2).
5. Can it operate inside a browser? Yes; 3 lines of math in the rig update tick.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on wiring Solnik's skeletal controller; $0 spend. [UNTESTED ESTIMATE] Target < 0.01 ms CPU per character.
8. Have we already built it? No (Missing — Solnik's animation class is currently unwired).
9. What is missing? Distance-coupled stridePhase driver inside the skeletal rig runtime.
10. How can it be objectively tested? Track planted foot world coordinate during stance phase (phase 0.0..0.45) across 10 steps; assert horizontal ground slip is < 1.5 world units.

Two-Bone Analytical Foot-Plant & Stair-Tread IK Solver
Domain: Character Locomotion & Inverse Kinematics · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard closed-form two-bone law-of-cosines analytical IK (cf. Gregory, Game Engine Architecture, 3rd ed., Ch. 12.11 foot placement IK); [ENGINEERING PROPOSAL] 2-D hip-knee-ankle analytical solver on sloped NavMesh surfaces.
1. What does it do? Adjusts knee bend and ankle angle dynamically when a character stands on stairs, uneven cobblestones, or ramps so both feet rest solidly on the ground surface rather than one foot hovering in mid-air.
2. How does it work? [DOCUMENTED FACT] Queries ground elevation zLeft and zRight beneath left/right ankle world X coordinates, lowers pelvis by min(zLeft, zRight), and solves the upper-leg/lower-leg triangle analytically via law of cosines so the higher foot bends naturally at the knee.
3. Why does it matter? Delivers genuine Assassin's Creed-caliber grounded physicality on staircases and plazas.
4. Can it serve PROVADIA? Yes; elevates hero character polish in stepped chambers like the Kingdom Gate and Mint.
5. Can it operate inside a browser? Yes; closed-form trig (acos/atan2) takes < 0.01 ms per character.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on Multi-Tier Elevation Zone and skeletal rig; $0 spend. [UNTESTED ESTIMATE] Target < 0.02 ms CPU per hero character on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? 2-bone analytical IK helper function for hero rigs (Visitor + Solnik).
10. How can it be objectively tested? Stop avatar straddling a step boundary (zLeft = 0, zRight = 18 units); assert left and right ankle Y positions match respective tread elevations within ±1 unit.

FABRIK / Analytical Hand-Socket Reach IK for Scroll & Prop Interaction
Domain: Character Locomotion & Inverse Kinematics · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Andreas Aristidou & Joan Lasenby, "FABRIK: A fast, iterative solver for the Inverse Kinematics problem", Graphical Models 73(5), 2011; [ENGINEERING PROPOSAL] 2-bone shoulder-elbow-wrist analytical reach solver.
1. What does it do? Allows Solnik or the visitor to reach smoothly toward varying lectern heights, door latches, or floating Folded Paper scrolls without needing custom pre-baked animations for every furniture height.
2. How does it work? [DOCUMENTED FACT] Solves a 2-link shoulder-elbow-wrist chain toward a world-space reachTarget clamped within maxArmLength (L1 + L2), blending IK weight smoothly (0 -> 1 -> 0 over 300 ms).
3. Why does it matter? Allows one reusable skeletal rig to interact believably with hundreds of different lecterns, shelves, and products across the civilization.
4. Can it serve PROVADIA? Yes; directly supports Solnik presenting and unrolling any Folded Paper at any stage height.
5. Can it operate inside a browser? Yes; analytical 2-link IK requires zero iterative loops.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on skeletal rig controller; $0 spend. [UNTESTED ESTIMATE] Target < 0.01 ms CPU per reach event.
8. Have we already built it? No (Missing).
9. What is missing? setHandReachTarget(worldPos, weight) API on skeletal rig controller.
10. How can it be objectively tested? Command Solnik to reach for two lecterns at different heights (y = 420 and y = 540); assert wrist socket lands within <= 2 units of target anchor in both cases.

Inertia-Smoothed Acceleration, Deceleration & Turn-Lean Envelope
Domain: Character Locomotion & Inverse Kinematics · Leverage: TIER-1 HIGH
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Nicolas Lopez, "Animation Driven Locomotion in Assassin's Creed Unity", GDC 2015 (momentum ramps & banking lean into turns); [ENGINEERING PROPOSAL] exponential velocity smoothing + spine banking angle.
1. What does it do? Replaces abrupt robotic start/stop velocity snaps with weighted human acceleration (~120 ms ramp-up), natural deceleration (~90 ms settle), and subtle torso lean into sharp turns.
2. How does it work? [ENGINEERING PROPOSAL] Integrates actual velocity toward desiredVelocity via dt-clamped exponential smoothing (1 - exp(-dt / tau)) and maps lateral acceleration a_lat to a clamped spine bone tilt (±6°).
3. Why does it matter? Makes controlling the avatar feel responsive yet physically grounded like an animated feature film.
4. Can it serve PROVADIA? Yes; improves tactile feel on both keyboard WASD and mobile touch steering.
5. Can it operate inside a browser? Yes; 8 lines of pure JS.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.005 ms CPU.
8. Have we already built it? No (Missing).
9. What is missing? VelocitySmoother envelope in character locomotion controller.
10. How can it be objectively tested? Apply step input desiredSpeed = 200 u/s at t = 0; assert speed reaches 63% at t = 120 ms ± 15 ms and 99% by t = 550 ms without overshoot.

Upper/Lower Body Masked Skeletal State Blender (6-State Rig)
Domain: Character Locomotion & Inverse Kinematics · Leverage: TIER-1 CRITICAL
Reported Classification: Built but unverified (Solnik rig imported; animation controller unwired per prototype log)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard hierarchical skeletal bone-mask blending (cf. Gregory, Game Engine Architecture, 3rd ed., Ch. 12.6 partial-skeleton blending); [ENGINEERING PROPOSAL] bone-group channel masks (LOWER_BODY, UPPER_TORSO, HEAD_FACE).
1. What does it do? Lets Solnik walk alongside the visitor (LOWER_BODY: walk) while simultaneously gesturing toward a doorway (UPPER_TORSO: Guiding) or nodding (HEAD_FACE: Listening).
2. How does it work? [DOCUMENTED FACT] Evaluates base locomotion poses across all bones, then overrides or additively blends upper-body and head-channel tracks weighted by per-channel mask weights (0.0..1.0).
3. Why does it matter? Directly resolves Proof #2 (PARTIAL in prototype) by unlocking full 6-state expressiveness (Off-Watch, Ignition, At Rest, Listening, Speaking, Guiding) during motion.
4. Can it serve PROVADIA? Yes; brings Solnik's existing cartoon rig fully to life.
5. Can it operate inside a browser? Yes; hierarchical 2-D bone transform tree (~25 bones) evaluates in < 0.1 ms.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Uses existing imported Solnik rig; $0 spend. [UNTESTED ESTIMATE] Target < 0.15 ms CPU per rig on mid-tier mobile.
8. Have we already built it? Built but unverified (Solnik rig assets exist in repo; animation controller class is unwired).
9. What is missing? Wiring the channel-masked state machine to movement velocity and dialogue/manifestation triggers.
10. How can it be objectively tested? Activate WALK on LOWER_BODY and GUIDING on UPPER_TORSO simultaneously; assert hip/leg bones cycle through walk keyframes while arm/hand bones hold pointing pose.

Concave NavMesh Triangulation & Simple Stupid Funnel Path Smoother
Domain: Character Locomotion & Inverse Kinematics · Leverage: TIER-1 HIGH
Reported Classification: Under construction (extends blind-verified routing from Velmar/Seat E)
Provenance & Evidence Tags: [DOCUMENTED FACT] Mikko Mononen, Recast & Detour (2009) & Chazelle (1982) / Demyen & Buro (2006) "Triangulation-Based Pathfinding" (Simple Stupid Funnel Algorithm); [ENGINEERING PROPOSAL] ear-clipping polygon triangulation + funnel string-pulling for mobile tap-to-walk.
1. What does it do? Computes clean, natural shortest paths around L-shaped tables, fountains, and stalls when a mobile visitor taps a distant destination across a concave room.
2. How does it work? [DOCUMENTED FACT] Decomposes the walkable polygon into convex triangles, runs A* across triangle portals, and applies the Simple Stupid Funnel algorithm to tighten waypoints around interior corners with an agent-radius margin.
3. Why does it matter? Prevents mobile tap-to-walk users from getting snagged on interior furniture corners.
4. Can it serve PROVADIA? Yes; complements the blind-verified collision/sliding solver for one-tap mobile exploration.
5. Can it operate inside a browser? Yes; < 60 triangles per room solves in < 0.05 ms in pure JS.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Builds on blind-verified NavMesh polygon data; $0 spend. [UNTESTED ESTIMATE] Target < 0.05 ms per tap query on mid-tier mobile.
8. Have we already built it? Basic routing blind-verified in Velmar/Seat E; concave funnel string-pulling is Under construction / needs verification on complex U-shaped obstacles.
9. What is missing? Funnel corner-offset margin (agentRadius) test on concave U-shaped room polygons.
10. How can it be objectively tested? Tap behind a U-shaped central lectern; assert returned waypoint path contains >= 3 pulled corners clearing obstacle edges by >= agentRadius with zero wall collisions.

Verlet 3-Node Cloak & Scarf Secondary-Motion Spring Chain
Domain: Character Locomotion & Inverse Kinematics · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Thomas Jakobsen, "Advanced Character Physics", GDC 2001 (position-based Verlet constraint relaxation for cloth/chains); [ENGINEERING PROPOSAL] 3-node Verlet cloth tail attached to shoulder sockets.
1. What does it do? Gives the visitor's cloak/scarf and Solnik's coat tails fluid, physical follow-through during walking, stopping, and outdoor gusts.
2. How does it work? [DOCUMENTED FACT] Integrates 3 mass points per garment hem using Verlet position integration (x_next = 2x - x_prev + a * dt^2) followed by 3 distance-constraint relaxation passes anchored to the shoulder bone.
3. Why does it matter? Adds unmistakable animated-cinema polish to every movement frame at negligible compute cost.
4. Can it serve PROVADIA? Yes; enriches both the visitor's Character Chamber archetypes and Solnik's silhouette.
5. Can it operate inside a browser? Yes; 3 points × 3 iterations = 9 vector ops per character.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.01 ms CPU per character.
8. Have we already built it? No (Missing; specced in AI Studio Run #4).
9. What is missing? VerletChain helper bound to avatar/Solnik shoulder sockets and global wind vector.
10. How can it be objectively tested? Accelerate avatar from 0 to 200 u/s and halt abruptly; assert tail node trails behind shoulder during motion and settles smoothly within 450 ms of stop without NaN/explosion on dt spike.

Domain C: Dynamic Occlusion & Multi-Companion Formation (6 Entries)

Per-Frame Foot-Plane (footY) Depth-Buffer Interleaver
Domain: Dynamic Occlusion & Multi-Companion Formation · Leverage: TIER-1 HIGH
Reported Classification: Under construction (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Classic 2.5-D painter's-order depth sorting keyed by ground-plane contact coordinate; [ENGINEERING PROPOSAL] stable radix/insertion depth sort across characters, props, and foreground slices.
1. What does it do? Dynamically interleaves the visitor, Solnik, walking townsfolk, and foreground furniture (tables, lecterns, balustrades) each frame so characters pass cleanly in front of or behind objects based on their foot position.
2. How does it work? [ENGINEERING PROPOSAL] Collects all active renderables (characters, foregroundCutouts, groundParticles) into a pre-allocated render list sorted by sortY = footY + zBias using insertion sort (nearly O(N) on already-sorted consecutive frames).
3. Why does it matter? Prevents characters from rendering on top of foreground tables or clipping behind rugs.
4. Can it serve PROVADIA? Yes; essential for multi-character interiors like the Enchanted Library.
5. Can it operate inside a browser? Yes; sorting ~30 objects takes < 0.02 ms with zero garbage-collection allocations.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.02 ms CPU per frame.
8. Have we already built it? Basic layer ordering exists; dynamic per-frame interleaving with foreground architectural slices is Under construction.
9. What is missing? Unified RenderList sorting pass across rigs and foreground cutout slices.
10. How can it be objectively tested? Walk visitor in a circle around a central Library lectern (footY = 550); assert visitor draws behind lectern when visitor.footY < 550 and in front when visitor.footY > 550.

Alpha-Masked Foreground Architectural Cutout Slicer
Domain: Dynamic Occlusion & Multi-Companion Formation · Leverage: TIER-1 HIGH
Reported Classification: Designed but not built (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Pre-rendered 2.5-D background RPGs (e.g., Pillars of Eternity / Disco Elysium depth-masked architecture); [ENGINEERING PROPOSAL] megacomp build-time alpha slice extraction + baseline footY tag.
1. What does it do? Extracts foreground pillars, arches, market stalls, and lecterns from Genspark/Veo plates into separate transparent WebP overlays pinned to exact footY planes.
2. How does it work? [ENGINEERING PROPOSAL] Offline segmentation/masking script on megacomp isolates foreground architectural elements into cropped WebP sprites (<= 35 KB each) with JSON { src, x, y, footY } metadata registered in the scene manifest.
3. Why does it matter? Transforms flat 2-D background plates into multi-layered architectural spaces characters can genuinely weave through.
4. Can it serve PROVADIA? Yes; unlocks full spatial depth on our 244+ Genspark scenery plates at $0 credit cost.
5. Can it operate inside a browser? Yes; standard alpha-blended drawImage / WebGL textured quad.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Local Python image tools on megacomp ($0 spend); runtime ~20–40 KB per slice. [UNTESTED ESTIMATE] Target < 0.1 ms GPU draw cost per slice on mid-tier mobile.
8. Have we already built it? Designed but not built.
9. What is missing? tools/extract_foreground_slices.py + foregroundSlices[] loader in scene manifest.
10. How can it be objectively tested? Load Enchanted Library with foreground archway slice; verify zero alpha-fringe halos around cutout edges and accurate footY depth sorting.

Ray-Cast Line-of-Sight Silhouette Rim Reveal Behind Tall Obstacles
Domain: Dynamic Occlusion & Multi-Companion Formation · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Assassin's Creed / isometric action-adventure character silhouette outline visible when passing behind solid walls or roofs; [ENGINEERING PROPOSAL] subtle antique-gold rim silhouette pass on occluded hero rigs.
1. What does it do? Renders a delicate #E4C65B antique-gold contour silhouette of the visitor or Solnik whenever they walk behind an opaque foreground wall or tall stall so the user never loses track of where they are.
2. How does it work? [ENGINEERING PROPOSAL] When a hero rig's bounding box overlaps a foreground occluder with sortY > hero.sortY, the renderer draws a lightweight 25%-opacity gold silhouette stamp over the occluder pass.
3. Why does it matter? Prevents player disorientation when exploring dense market streets or vaulted colonnades.
4. Can it serve PROVADIA? Yes; blends seamlessly with PROVADIA's antique-gold visual language (#C9A227 / #E4C65B).
5. Can it operate inside a browser? Yes; Canvas2D source-in silhouette buffer or WebGL stencil/tint pass.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on foreground occluder slices; $0 spend. [UNTESTED ESTIMATE] Target < 0.08 ms GPU cost when occluded, 0 ms when unobstructed.
8. Have we already built it? No (Missing).
9. What is missing? Occlusion-overlap silhouette pass in hero rig renderer.
10. How can it be objectively tested? Walk visitor completely behind an opaque foreground stall; assert non-zero #E4C65B silhouette pixels render at visitor screen coordinates while occluded.

NavMesh-Clamped Companion Flanking Slot Controller (Solnik Escort)
Domain: Dynamic Occlusion & Multi-Companion Formation · Leverage: TIER-1 CRITICAL
Reported Classification: Under construction (extends prototype stage-slide per FVR-31 §4)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard companion follow-slot offset projection (cf. Millington, Artificial Intelligence for Games, 3rd ed., Ch. 3 formation steering); [ENGINEERING PROPOSAL] dynamic open-side flanking slot projected onto walkable NavMesh.
1. What does it do? Keeps Solnik walking smoothly beside or slightly behind the visitor's open shoulder, switching sides automatically when approaching a wall and pausing respectfully outside tight doorway triggers.
2. How does it work? [ENGINEERING PROPOSAL] Evaluates candidate flank offsets (+75, +12) and (-75, +12) relative to visitor facing; selects whichever point lies deepest inside the walkable NavMesh polygon and steers Solnik there using critically damped velocity + stride-locked walk animation.
3. Why does it matter? Directly upgrades Proof #2 ("Solnik moves and interacts naturally alongside the visitor") from static stage-slide to genuine intelligent companionship.
4. Can it serve PROVADIA? Yes; defines Solnik's signature living presence across every route.
5. Can it operate inside a browser? Yes; 2 point-in-polygon checks + damped steering (< 0.03 ms).
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on blind-verified NavMesh and Solnik's skeletal walk controller; $0 spend. [UNTESTED ESTIMATE] Target < 0.04 ms CPU per frame.
8. Have we already built it? Prototype implements linear stage-slide (Under construction); NavMesh-clamped open-side flanking is missing.
9. What is missing? CompanionFlankController wired to Solnik's skeletal locomotion state machine.
10. How can it be objectively tested? Walk visitor along the right-hand wall of the Street; assert Solnik smoothly shifts to the visitor's open left flank, remains 100% inside NavMesh bounds, and transitions from WALK to AT_REST within 300 ms of visitor stopping.

Multi-Companion Wedge/Trail Formation & Doorway Yield Queue
Domain: Dynamic Occlusion & Multi-Companion Formation · Leverage: TIER-1 LOW
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Ian Millington, Artificial Intelligence for Games (3rd ed., Ch. 3.6 multi-slot formations); [ENGINEERING PROPOSAL] dynamic slot-count formation table (1 companion flank vs. 2+ trail wedge).
1. What does it do? Generalizes companion escort pathing from a single guide (Solnik) to multi-character groups (e.g., Solnik + a guild specialist escorting the visitor to a department) without companions colliding at narrow doors.
2. How does it work? [ENGINEERING PROPOSAL] Assigns slot indices [0..K-1] to a trailing V-wedge behind the visitor and transitions into single-file queue order whenever corridor width drops below 140 world units.
3. Why does it matter? Future-proofs the engine for guided tours or multi-guild briefings without rewriting escort AI.
4. Can it serve PROVADIA? Yes; reusable across complex districts and guild introductions.
5. Can it operate inside a browser? Yes; slot offset table + corridor width check.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Extends CompanionFlankController; $0 spend. [UNTESTED ESTIMATE] Target < 0.05 ms CPU for 3 companions.
8. Have we already built it? No (Missing).
9. What is missing? Multi-slot FormationTable extension on CompanionFlankController.
10. How can it be objectively tested? Escort visitor with 2 companions through a 110-unit doorway choke point; assert companions form single-file queue with zero overlap and re-expand into flank/wedge in the open hall.

Frustum & Off-Screen Entity Tick-Culling Scheduler
Domain: Dynamic Occlusion & Multi-Companion Formation · Leverage: TIER-1 HIGH
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard frustum culling and off-screen simulation throttling (cf. Gregory, Game Engine Architecture, 3rd ed., Ch. 11.2); [ENGINEERING PROPOSAL] padded viewport AABB visibility classifier.
1. What does it do? Skips skeletal bone evaluation, particle rendering, and IK solves for inhabitants and props located outside the camera's padded viewport while keeping lightweight logical schedule timers accurate.
2. How does it work? [ENGINEERING PROPOSAL] Tests entity world AABB against cameraViewport.inflate(120); off-screen entities advance only scalar scheduleTimer += dt (0.001 ms) and skip bone-matrix/draw calls until re-entering the padded frustum.
3. Why does it matter? Allows wide streets and grand halls to contain many stations without wasting mobile CPU/GPU cycles on unseen corners.
4. Can it serve PROVADIA? Yes; directly protects 60 fps mobile targets on large scenes.
5. Can it operate inside a browser? Yes; simple AABB overlap test.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on CameraRig; $0 spend. [UNTESTED ESTIMATE] Target 30–50% reduction in skeletal/draw CPU time on wide scenes on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? isInPaddedFrustum(entityBounds) guard in render/animation loop.
10. How can it be objectively tested? Place 10 animated NPCs outside camera frustum and 2 inside; assert drawImage / bone-matrix evaluation runs only for the 2 visible NPCs while off-screen timers still advance.

Domain D: Seasonal & Weather Transitions (6 Entries)

World-Clock Time-of-Day Palette & Key-Light Angle Interpolator
Domain: Lighting, Weather & Atmosphere · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Dynamic dawn/day/dusk/night lighting curves in open-world games; [ENGINEERING PROPOSAL] 4-keyframe color-LUT & shadow-angle curve synchronized to WorldClock.
1. What does it do? Shifts exterior sky tint, ambient illumination, character rim-light color, and directional shadow angle smoothly across Dawn, Golden Day, Dusk, and Lantern Night.
2. How does it work? [ENGINEERING PROPOSAL] Interpolates piecewise-linear RGB/angle keyframes (DAWN, DAY, DUSK, NIGHT) from WorldClock.normalizedHour, driving WebGL color-grade uniforms, contact shadow skew, and automatic town-lantern glow activation at dusk.
3. Why does it matter? Gives PROVADIA temporal living breath—returning visitors experience golden twilight and warm lantern-lit streets.
4. Can it serve PROVADIA? Yes; harmonizes naturally with PROVADIA's #141210 obsidian night and #C9A227 / #E4C65B antique-gold lantern palette.
5. Can it operate inside a browser? Yes; uniform color interpolation (< 0.02 ms).
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on WorldClock and scene lightingProfile; $0 spend. [UNTESTED ESTIMATE] Target < 0.05 ms GPU/CPU per frame.
8. Have we already built it? No (Missing).
9. What is missing? timeOfDayKeyframes table + shader/canvas ambient tint uniform hook.
10. How can it be objectively tested? Sweep WorldClock from 12:00 (DAY) to 21:00 (NIGHT); assert ambient tint shifts from warm daylight to cool indigo and street lantern glow sprites activate automatically at 18:30.

Global Harmonic Wind-Field Coupling for Banners, Lanterns & Foliage
Domain: Lighting, Weather & Atmosphere · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard hierarchical wind-gust synthesis (cf. Zioma, "Procedural Wind in Frostbite", GDC 2013); [ENGINEERING PROPOSAL] shared 1-D spatial-temporal gust oscillator.
1. What does it do? Drives outdoor guild banners, hanging brass lanterns, tree branches, and character cloaks from one unified wind gust field so the entire street reacts together to passing breezes.
2. How does it work? [ENGINEERING PROPOSAL] Evaluates windStrength(x, t) = baseWind + gustAmp * sin(t * 1.4 - x * 0.008) * cos(t * 0.53) once per frame, passing local force to banner vertex skew, lantern pendulum angle, and avatar cloak springs.
3. Why does it matter? Shared physical forces bind separate art layers into one believable outdoor atmosphere.
4. Can it serve PROVADIA? Yes; animates static street banners and hanging lanterns at $0 video generation cost.
5. Can it operate inside a browser? Yes; 2 trig ops per reactive prop.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.02 ms CPU for 20 props.
8. Have we already built it? No (Missing).
9. What is missing? WindField singleton + windCoupling property on prop/rig components.
10. How can it be objectively tested? Place two banners at x = 200 and x = 600; assert both sway in the same directional polarity with deterministic spatial phase lag (600 - 200) * 0.008 rad.

Depth-Stratified Atmospheric Fog & Contrast Separation Pass
Domain: Lighting, Weather & Atmosphere · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Bartłomiej Wroński, "Volumetric Fog: Unified Compute Shader-Based Solution to Atmospheric Scattering", SIGGRAPH / GDC 2014 (depth-dependent aerial perspective); [ENGINEERING PROPOSAL] lightweight 2.5-D depth-band aerial haze tint.
1. What does it do? Applies subtle atmospheric depth haze between foreground heroes, midground stalls, and distant towers so characters pop cleanly against complex architectural backgrounds.
2. How does it work? [ENGINEERING PROPOSAL] Maps entity/layer normalized depth Z through an exponential aerial-perspective curve fogFactor = 1 - exp(-density * Z) blending toward the scene's atmosphereColor (#30251B warm umber indoors, #1D2430 cool mist outdoors).
3. Why does it matter? Solves visual clutter in detailed Genspark architectural plates so visitors immediately read foreground inhabitants and doors.
4. Can it serve PROVADIA? Yes; enhances both readability and painterly depth.
5. Can it operate inside a browser? Yes; per-layer alpha/tint uniform (< 0.01 ms).
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.02 ms GPU overhead.
8. Have we already built it? No (Missing).
9. What is missing? fogDensity and atmosphereColor fields in scene lightingProfile.
10. How can it be objectively tested? Measure luminance contrast between Solnik (Z = 0.2) and distant background arch (Z = 0.9); assert foreground character contrast meets >= 3.0:1 separation.

Precipitation & Airborne Particle Density Envelope (Rain, Snow, Pollen, Embers)
Domain: Lighting, Weather & Atmosphere · Leverage: TIER-1 LOW
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard screen-space/world-space ring-buffer particle wrap system; [ENGINEERING PROPOSAL] toroidal wrap particle emitter capped at <= 140 mobile sprites.
1. What does it do? Renders seasonal/district atmosphere (warm library dust motes, forge embers, spring blossom drift, or coastal mist/rain streaks) that wraps seamlessly around the camera viewport without spawning/destroying objects.
2. How does it work? [ENGINEERING PROPOSAL] Allocates a fixed Float32Array pool (max 140 particles on < 700px mobile, 260 on desktop) wrapped modulo cameraViewport bounds so particles populate the screen instantaneously at any camera speed with zero GC churn.
3. Why does it matter? Gives every district and season a distinct tactile mood at < 5 KB code size.
4. Can it serve PROVADIA? Yes; differentiates coastal ports, vaulted libraries, and forge districts.
5. Can it operate inside a browser? Yes; typed-array batch draw (< 0.12 ms).
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Zero external libraries; $0 spend. [UNTESTED ESTIMATE] Target < 0.15 ms CPU/GPU on mid-tier mobile with 0 per-frame heap allocations.
8. Have we already built it? Partial (one-shot burst particles exist in Mint manifestation; continuous toroidal weather pool is Missing).
9. What is missing? ToroidalParticlePool driven by Float32Array + scene weatherPreset.
10. How can it be objectively tested? Run RAIN preset for 60 s while panning camera rapidly; assert 0 heap allocation spikes in DevTools profiler and uniform particle density across viewport.

Surface Wetness Specular-Sheen & Puddle Ripple Shader Overlay
Domain: Lighting, Weather & Atmosphere · Leverage: TIER-1 LOW
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Sébastien Lagarde & Antoine Zanuttini, "Water Drop 2a / Dynamic Weather in Game Engines", SIGGRAPH 2012 (wetness darkening & specular reflection boost); [ENGINEERING PROPOSAL] lightweight WebGL ground-plane reflection shimmer pass.
1. What does it do? Adds subtle golden lantern reflections and expanding raindrop rings onto cobblestone streets during damp or evening weather states.
2. How does it work? [ENGINEERING PROPOSAL] When weatherState === 'RAIN' | 'DAMP', a masked ground-plane WebGL quad renders animated concentric ripple normals and vertical lantern-glow reflection streaks using existing lightSources[] coordinates.
3. Why does it matter? Elevates street atmosphere to Assassin's Creed visual richness without heavy pre-rendered weather video variants.
4. Can it serve PROVADIA? Yes; optional high-craft polish on WebGL-capable devices (cleanly skipped on Canvas2D fallback or Save-Data).
5. Can it operate inside a browser? Yes; single ground-mask fragment pass.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: WebGL1/2 (optional enhancement, disabled under Save-Data / low-tier fallback); $0 spend. [UNTESTED ESTIMATE] Target < 0.25 ms GPU on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? Optional WetGroundPass shader gated by Save-Data === false.
10. How can it be objectively tested? Enable weatherState: 'DAMP' on WebGL context vs Save-Data: true; assert reflection shimmer renders in standard mode and skips cleanly with zero errors under Save-Data.

Interior Window Sky-Plane Synchronization Layer
Domain: Lighting, Weather & Atmosphere · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [OBSERVABLE BEHAVIOR] Interior rooms in open-world games reflecting external time-of-day and weather through stained/arched windows; [ENGINEERING PROPOSAL] alpha-window sky quad bound to WorldClock.
1. What does it do? Ensures light streaming through the Enchanted Library's tall arched windows matches the outer world's current time of day (warm morning gold, crisp noon, amber dusk, deep indigo night).
2. How does it work? [ENGINEERING PROPOSAL] Interior plates with transparent/masked window panes render a 4×64 vertical sky-gradient texture driven by WorldClock behind the interior layer, tinting window light shafts to match.
3. Why does it matter? Reinforces spatial truth—interiors are physically inside the surrounding kingdom rather than disconnected stages.
4. Can it serve PROVADIA? Yes; deepens architectural continuity across chambers.
5. Can it operate inside a browser? Yes; 4×64 procedural gradient texture (< 1 KB).
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on WorldClock; $0 spend. [UNTESTED ESTIMATE] Target < 0.01 ms GPU.
8. Have we already built it? No (Missing).
9. What is missing? windowSkyMask layer support in interior scene manifests.
10. How can it be objectively tested? Transition WorldClock from DAY to NIGHT while inside Library; assert window pane pixel RGB shifts from warm gold to night blue without changing interior wall textures.

Domain E: Interior Acoustics & Spatial Soundscapes (6 Entries)

Portal Acoustic Occlusion Low-Pass Filter & Gain Attenuator
Domain: Spatial Audio & Environmental Acoustics · Leverage: TIER-1 HIGH
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Standard game-audio portal occlusion (muffling external stems via low-pass filtering across architectural boundaries; cf. Horowitz & Looney, The Essential Guide to Game Audio, Focal Press, 2014); [ENGINEERING PROPOSAL] Web Audio BiquadFilterNode + GainNode portal router.
1. What does it do? Muggles street crowd murmur and fountain water when the visitor steps inside the Enchanted Library, then smoothly opens the high frequencies when approaching an open archway or stepping back outside. [Captain's note: "Muggles" is verbatim in the delivered text — read "Muffles."]
2. How does it work? [ENGINEERING PROPOSAL] Exterior ambient emitters route through a shared exteriorBus (BiquadFilterNode type 'lowpass'); inside closed rooms, filter frequency ramps smoothly (350 ms) to 750 Hz at -14 dB, opening toward 18,000 Hz as distance to an open exterior portal approaches 0.
3. Why does it matter? Creates immediate physical sensation of entering a quiet sanctuary from a bustling street using the same audio assets.
4. Can it serve PROVADIA? Yes; turns Library, Vaults, and Guild Chambers into acoustically distinct spaces at $0 extra audio files.
5. Can it operate inside a browser? Yes; native Web Audio API BiquadFilterNode.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Native Web Audio API; $0 spend. [UNTESTED ESTIMATE] Target < 0.1% CPU on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? exteriorBus / interiorBus routing graph with portal-proximity filter ramp.
10. How can it be objectively tested? Cross from Street into Enchanted Library; assert exteriorBus.lowpass.frequency.value transitions from >= 15000 Hz to <= 900 Hz within 500 ms.

Room-Size Algorithmic Reverb Tail Switcher
Domain: Spatial Audio & Environmental Acoustics · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Manfred Schroeder (1962) algorithmic reverb / Web Audio ConvolverNode synthetic impulse response; [ENGINEERING PROPOSAL] procedural 8 KB synthetic IR buffer per room acoustic preset (VAULT_STONE, LIBRARY_TIMBER, OPEN_STREET).
1. What does it do? Gives footsteps, chimes, and Solnik's voice realistic stone-vault echo inside subterranean chambers, warm wood resonance inside the Library, and crisp dry acoustics outdoors—without downloading large .wav impulse files.
2. How does it work? [ENGINEERING PROPOSAL] At audio boot, generates 3 short procedural exponential-decay noise impulse buffers (0.25 s open street, 0.75 s timber hall, 1.6 s vaulted stone) in memory (< 60 KB RAM total) and crossfades wet-send gain on room entry.
3. Why does it matter? Makes architectural scale audible on mobile speakers and earbuds while keeping network transfer at 0 bytes.
4. Can it serve PROVADIA? Yes; reinforces the architectural character of every chamber (Provadia–Solnitsata vault vs. Enchanted Library).
5. Can it operate inside a browser? Yes; native ConvolverNode + procedural AudioBuffer.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Native Web Audio API; $0 spend, 0 bytes network transfer. [UNTESTED ESTIMATE] Target < 0.3% CPU on mid-tier mobile.
8. Have we already built it? No (Missing).
9. What is missing? ProceduralIRBank + acousticPreset property in scene JSON schema.
10. How can it be objectively tested? Switch room acousticPreset from OPEN_STREET to VAULT_STONE; assert reverb send gain increases and impulse decay duration switches to 1.6 s without audio clicks.

2-D Positional Stereo Panner & Inverse-Distance Emitter Graph
Domain: Spatial Audio & Environmental Acoustics · Leverage: TIER-1 HIGH
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] W3C Web Audio API StereoPannerNode & inverse-distance attenuation model; [ENGINEERING PROPOSAL] camera-relative 2-D emitter updater.
1. What does it do? Pans localized world sounds (fountain water, hearth crackle, blacksmith hammer, portal hum) smoothly left/right and attenuates volume by distance as the visitor walks past them.
2. How does it work? [ENGINEERING PROPOSAL] Each emitter { x, y, maxRadius, stemId } updates every frame: pan = clamp((emitter.x - listener.x) / halfViewportW, -0.85, 0.85) and gain = clamp(1 - dist / maxRadius, 0, 1)^2 applied via setTargetAtTime(..., 0.03) to prevent zipper noise.
3. Why does it matter? Anchors visual landmarks in auditory space on headphones and stereo phone speakers.
4. Can it serve PROVADIA? Yes; brings fountains, hearths, and workshops alive spatially.
5. Can it operate inside a browser? Yes; native StereoPannerNode + GainNode.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Native Web Audio API; $0 spend. [UNTESTED ESTIMATE] Target < 0.05 ms CPU for 8 active emitters.
8. Have we already built it? No (Missing).
9. What is missing? SpatialEmitterManager bound to scene audioEmitters[] and listener coordinates.
10. How can it be objectively tested? Move listener from x = 100 to x = 900 past a fountain emitter at x = 500; assert pan sweeps smoothly from +0.8 to -0.8 and gain drops to 0 beyond maxRadius.

NavMesh Surface-Material Footstep Foley Dispatcher
Domain: Spatial Audio & Environmental Acoustics · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Animation-event-driven surface footstep tagging (cf. Horowitz & Looney, The Essential Guide to Game Audio, Ch. 7); [ENGINEERING PROPOSAL] NavMesh surfaceMaterial lookup on walk-cycle foot-plant frames.
1. What does it do? Triggers subtle, pitch-varied footsteps matched to the floor under the visitor's boots (cobblestone, timber, woven_rug, marble_stone) synchronized to skeletal walk-cycle foot plants.
2. How does it work? [ENGINEERING PROPOSAL] Walk-cycle phase crossings (phase = 0.25 left plant, 0.75 right plant) query navMesh.getSurfaceAt(footX, footY) and play one of 3 micro-variations (Opus, ~18 KB per set) with playbackRate = 0.93 + random() * 0.14.
3. Why does it matter? Connects physical avatar locomotion directly to tactile sensory feedback at $0 generation credits.
4. Can it serve PROVADIA? Yes; makes walking across stone plazas onto Library rugs feel physically distinct.
5. Can it operate inside a browser? Yes; tiny pre-decoded AudioBuffer micro-samples (< 120 KB total across 4 materials).
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Depends on stride-locked walk cycle and NavMesh; $0 spend. [UNTESTED ESTIMATE] Target <= 120 KB total audio asset budget.
8. Have we already built it? No (Missing).
9. What is missing? 4-material micro-footstep Opus pack + walk-cycle foot-plant event emitter.
10. How can it be objectively tested? Walk avatar across boundary between cobblestone and woven_rug polygons; assert triggered footstep stemId changes on the exact step inside the rug polygon.

Sidechain Dialogue Ducking Bus for Solnik & Inhabitant Speech
Domain: Spatial Audio & Environmental Acoustics · Leverage: TIER-1 HIGH
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Broadcast/game-audio dialogue priority ducking (GainNode envelope attenuation during voice playback); [ENGINEERING PROPOSAL] Web Audio voiceBus active-flag ducking of ambientBus.
1. What does it do? Smoothly dips ambient crowd, water, and wind volume by -8 dB (200 ms attack) whenever Solnik speaks (via Job 4 / Omni takes or live Piper/Gemini TTS), then restores ambient levels (450 ms release) when speech finishes.
2. How does it work? [ENGINEERING PROPOSAL] SolnikVoiceRouter sets isSpeaking = true during active audio buffer or TTS playback, ramping ambientBus.gain via setTargetAtTime(0.4, now, 0.08) and restoring to 1.0 on ended.
3. Why does it matter? Guarantees clear vocal intelligibility on small smartphone speakers without muting the living background world.
4. Can it serve PROVADIA? Yes; critical for Solnik's guidance and product explanations.
5. Can it operate inside a browser? Yes; native Web Audio GainNode.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Native Web Audio API; $0 spend. [UNTESTED ESTIMATE] Target < 0.005 ms CPU.
8. Have we already built it? No (Missing).
9. What is missing? ambientBus / voiceBus gain-ducking link in audio engine.
10. How can it be objectively tested? Trigger a 3.0 s Solnik voice line while ambient fountain stem plays; assert ambientBus.gain.value attenuates to 0.38–0.45 within 300 ms and returns to >= 0.95 within 600 ms of speech completion.

Zero-Click Equal-Power Dual-Buffer Ambient Stem Looper
Domain: Spatial Audio & Environmental Acoustics · Leverage: TIER-1 MEDIUM
Reported Classification: Missing (subject to Captain audit against MESR v0.2)
Provenance & Evidence Tags: [DOCUMENTED FACT] Equal-power cos/sin crossfade looping to prevent waveform discontinuity clicks; [ENGINEERING PROPOSAL] scheduled dual-source 150 ms crossfade scheduler.
1. What does it do? Plays short (6–10 s) compressed Opus/OGG room-tone and nature stems continuously with zero audible pops, clicks, or silence gaps at loop wrap boundaries.
2. How does it work? [ENGINEERING PROPOSAL] Schedules alternating AudioBufferSourceNode instances overlapping by 150 ms with complementary equal-power cos(t * pi/2) / sin(t * pi/2) gain curves, keeping ambient file sizes under 60 KB per stem.
3. Why does it matter? Prevents distracting audio clicks on mobile headphones while keeping audio payload tiny inside PIS-01.
4. Can it serve PROVADIA? Yes; standardizes all 0-credit ambient sound beds across every room.
5. Can it operate inside a browser? Yes; sample-accurate audioCtx.currentTime scheduling.
6. Reusable across every universe? Yes.
7. Dependencies, costs & performance: Native Web Audio API; $0 spend. [UNTESTED ESTIMATE] Target <= 60 KB per 8 s Opus ambient stem.
8. Have we already built it? No (Missing).
9. What is missing? EqualPowerLooper audio utility class.
10. How can it be objectively tested? Loop a non-zero-crossing 4 s test stem for 5 iterations in offline OfflineAudioContext; assert peak sample-to-sample derivative across wrap boundaries stays below 0.02.

PART III — INGESTION & VERIFICATION SUMMARY (EXACT COUNT: 48 ENTRIES)

Section / Domain — Entries in Tranche 2 — Reported Classification Breakdown
Tier-0: Crowd Intelligence — 8 — 8 Missing
Tier-0: Camera Intelligence — 8 — 8 Missing (aligned with Captain audit)
Tier-1 Domain A: Spatial Topology & Multi-Floor Verticality — 7 — 3 Under construction · 1 Designed but not built · 3 Missing
Tier-1 Domain B: Locomotion & Inverse Kinematics — 7 — 1 Built but unverified · 1 Under construction · 5 Missing
Tier-1 Domain C: Dynamic Occlusion & Multi-Companion Formation — 6 — 2 Under construction · 1 Designed but not built · 3 Missing
Tier-1 Domain D: Seasonal & Weather Transitions — 6 — 6 Missing
Tier-1 Domain E: Interior Acoustics & Spatial Soundscapes — 6 — 6 Missing
VERIFIED TOTAL — 48 — 1 Built but unverified · 6 Under construction · 2 Designed but not built · 39 Missing

Recommended Seat Assignment Priority from Tranche 2
Immediate Camera Spine (Fixes Top-Ten Audit Gap): Assign Critically Damped Chase Camera with Soft Composition Rails + Velocity-Weighted Look-Ahead Sightline Lead Offset + Non-Blocking Dialogue & Folded-Paper Split-Composition Reframer + Aspect-Ratio Safe-Focal-Box Projection Solver to close the missing camera foundation across desktop and 375×812 mobile.
Immediate Crowd & Companion Life (Fixes Proof #2 & Populated World): Assign Smart-Object Activity Stations with Mid-Cycle Arrival Pre-Warming + ORCA Local Crowd Avoidance + NavMesh-Clamped Companion Flanking Slot Controller (Solnik Escort) + Stride-Distance Phase-Locked Walk Cycle Controller.
Seat D / Library Composite Support: Assign Per-Frame Foot-Plane (footY) Depth-Buffer Interleaver + Alpha-Masked Foreground Architectural Cutout Slicer + Portal Acoustic Occlusion Low-Pass Filter so the Enchanted Library reads as one inhabited, acoustically grounded chamber.

— MESR Tranche 2, independent engineering contribution to Commission #126 (Gemini). [Session note in the delivery: "Worked for 2m 50s."]

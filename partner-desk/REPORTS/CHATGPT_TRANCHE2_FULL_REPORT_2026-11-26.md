# MESR Tranche 2 — ChatGPT independent engineering contribution to Gemini Commission #126

**Date:** 2026-11-26 · **Status:** proposed engineering dossiers, ready for Captain's reconciliation; not a Gemini-authored report or certification.  
**Scope:** camera, crowd intelligence, spatial topology/verticality, locomotion and IK, dynamic occlusion, companion formations, weather/seasonal transitions, acoustics.  
**Fences:** no spending, additional generation credits or deployment; no proprietary engine internals; no security-critical changes; existing FVR-31 acceptance gates stand.

## House evidence and ingestion discipline

Read from [MESR v0.2, fixed repository revision](https://github.com/gchkodrov-debug/megacomp/blob/8b24f5f9c5935596fd0f5b335eb37e265b1dd135/partner-desk/REPORTS/MASTER_ENGINEERING_SPECIFICATION_REGISTER_v0.2_2026-11-26.md), blob `6ee775ea09c826c889478c3db239a422cc597575`. This is house evidence, not a fresh execution of its software. The register reports 144 entries; the existing classifications and verification scopes govern. Static collision, wall sliding, routed locomotion and population stall recovery are verified at their specified mechanism scope. The actual house route solver is a visibility graph with Dijkstra, not a navmesh. A camera director is missing; moving-body avoidance is designed; verticality is designed; shared doorway space and dynamic weather are missing. The camera's 860px floor is an open mobile defect. Do not reset these states or automatically promote them on the basis of the following proposals.

All titles below are deliberately **unnumbered**. Existing MES-* IDs appear only as cross-references, not proposed new IDs. The Captain must decide whether to merge a dossier into an existing mechanism, split a compound entry, reject a duplicate or assign a new permanent house ID. Q8 reports house evidence or explicitly states the proposal's unbuilt status; Q9 names a proposed implementation path and suggested responsible discipline, not a claim that those files or seat assignments exist. All tests are proposed acceptance fixtures, not completed executions. Test sizes and thresholds are candidate targets; tune and freeze tolerances before the blind verifier runs, not afterward. Where numerical budgets are used, the test device class and actual measurement must be recorded. PIS-01 transfer, decoded memory, frame pacing and thermal requirements are separate; none implies another. $0 paid-runtime intent does not mean labor, hosting or compute is free. No claim is made about access to proprietary Ubisoft internals.

**Delivery scope:** this is a focused independent contribution of 40 dossiers spanning the specified subject areas, not the entire 245-slot historical blueprint. Every dossier contains Q1–Q10; no numbering is reserved. It complements Gemini's commissioned full tranche and can be ingested without waiting for the remainder.

## Priority dispatch (proposed, not assignments already made)

- Cinematic Director: invariant camera state, obstruction resolver, shot visibility, portrait framing, group framing, mode arbitration and reduced motion. Start with existing Library geometry, not new films.
- Living Character / World: crowd fidelity tiers, moving-body avoidance, chokepoint fairness, activity claims, calm flow, companion reunion. Keep the verified static route solver authoritative.
- World / Manufacturing: vertical levels, explicit portal transforms, dynamic obstacle invalidation, occlusion authoring lint.
- Rendering / Character / Audio: foot planting, stride matching, compositing and acoustics as parallel jobs. No new generation without approval.

## Public research basis

The following references were found through public web search. The source-backed fact is stated here; house implementations in every dossier are **[PROPOSAL]**, not claims that a cited product uses our specific design. No proprietary code was copied. Where no source applies, the entry is labelled as an original proposal (P).

- **S1 [FACT]** François Cournoyer / Ubisoft, GDC 2015, [Massive Crowd on Assassin's Creed Unity: AI Recycling](https://www.gdcvault.com/play/1022411/massive-crowd-on-assassin-s). Public session description documents AI level-of-detail for large interactive crowds. PROVADIA's tier choices, counts and budgets are proposals, not Ubisoft measurements transferable to phones.
- **S2 [FACT]** Craig Reynolds, GDC 1999, [Steering Behaviors for Autonomous Characters](https://www.red3d.com/cwr/papers/1999/gdc99steer.html). Published general steering, obstacle avoidance and leader following methods.
- **S3 [FACT]** Unity Technologies, [Cinemachine Group Framing documentation](https://github.com/Unity-Technologies/com.unity.cinemachine/blob/main/com.unity.cinemachine/Documentation~/CinemachineGroupFraming.md). Documents framing a group of targets; it does not validate our camera controller or mobile layout.
- **S4 [FACT]** Unity Technologies, [Cinemachine Deoccluder](https://docs.unity.cn/Packages/com.unity.cinemachine%403.1/manual/CinemachineDeoccluder.html) and [Decollider](https://docs.unity.cn/Packages/com.unity.cinemachine%403.1/manual/CinemachineDecollider.html). Public documentation separates avoiding target obstruction from resolving camera intersections.
- **S5 [FACT]** Jur van den Berg et al., [Optimal Reciprocal Collision Avoidance](https://gamma-web.iacs.umd.edu/ORCA/). Published reciprocal collision avoidance under modeled assumptions; guarantees from its formal formulation do not transfer to an approximate house implementation or infeasible passage.
- **S6 [FACT]** Ubisoft Montreal, GDC 2015, [Postmortem: Developing Systemic Crowd Events on Assassin's Creed Unity](https://gdcvault.com/play/1022212/Postmortem-Developing-Systemic-Crowd-Events). Public description concerns systemic crowd events and emergent interactions. Our peaceful activities are original proposals.
- **S7 [FACT]** Recast Navigation, [DetourNavMeshBuilder.h](https://github.com/recastnavigation/recastnavigation/blob/main/Detour/Include/DetourNavMeshBuilder.h). Public source documentation illustrates explicit traversable connections. This is an analogy for links, not a recommendation to replace the verified house solver or import Recast.
- **S8 [FACT]** Epic Games, [Pose Warping in Unreal Engine](https://dev.epicgames.com/documentation/unreal-engine/pose-warping-in-unreal-engine?lang=en-US). Documents IK-related orientation, slope and stride warping; browser adaptation is proposed independently.
- **S9 [FACT]** Epic Games, [Motion Warping in Unreal Engine](https://dev.epicgames.com/documentation/en-us/unreal-engine/motion-warping-in-unreal-engine). Documents adjusting root motion within animation windows to named targets. The proposed hand IK and action alignment are not copied implementations.
- **S10 [FACT]** MDN, [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and [ConvolverNode](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode). Documents spatial audio and convolution effects. Portal acoustics, priority policies, sound synchronization and thresholds are house proposals.
- **P [PROPOSAL]** Original adaptation to the house constraints; no external implementation attribution. No source-unverified Ubisoft claims are included.

## Dossiers (unnumbered; priority first within camera and crowd)


### Camera director with invariant subject follow

**Domain:** CAM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CAM-001 (MISSING); MES-CAM-005 (DESIGNED).  
**Research basis:** S3 (see source list; implementation is a proposal).

- **Q1. What does it do?** Keep a moving visitor framed without surrendering movement control.
- **Q2. How does it work?** Maintain a camera pose and velocity independent of simulation, use a time-based damped spring and bounded look-ahead; clamp to authored feasible camera regions and reset on teleport.
- **Q3. Why does it matter?** The stage currently is the shot; a true director is absent.
- **Q4. Can it serve PROVADIA?** Library and street walking.
- **Q5. Can it operate inside a browser?** JS camera state with Canvas/WebGL adapter.
- **Q6. Reusable across every universe?** All scenes supply framing bounds and focal anchors.
- **Q7. Dependencies, costs and performance** No paid runtime; tune spring on desktop and mid-range iOS/Android; measure settle time and frame cost.
- **Q8. Have we already built it?** Follow missing according to v0.2; do not treat prior chase claims as verified.
- **Q9. What is missing?** camera/director module (proposed); depends on geometry projection and scene schema; owner Cinematic Director.
- **Q10. How can it be objectively tested?** Replay the same 10-second path at 30/60/120 Hz; compare subject positions, no boundary exposure, finite state after pause; report settle time and overshoot; human rates comfort.


### Camera obstruction and collision resolver

**Domain:** CAM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CAM-001 (MISSING); MES-WLD-004 (DESIGNED).  
**Research basis:** S4 (see source list; implementation is a proposal).

- **Q1. What does it do?** Prevent viewpoint clipping into architectural geometry or losing its subject.
- **Q2. How does it work?** For a true spatial camera, sweep a small camera volume from subject to desired pose and choose a valid pose; in projected plates use prevalidated safe camera regions and authored alternate views, not invented hidden geometry.
- **Q3. Why does it matter?** A beautiful frame is worthless if the camera passes through a wall.
- **Q4. Can it serve PROVADIA?** Pillars, stairs, archways.
- **Q5. Can it operate inside a browser?** JS ray/segment tests for 2.5D; optional WebGL 3D geometry.
- **Q6. Reusable across every universe?** Scene-authored collision proxies and view bounds.
- **Q7. Dependencies, costs and performance** No paid runtime; measure sweep cost and visibility on reference phone/desktop.
- **Q8. Have we already built it?** New proposed extension; no camera system exists in v0.2.
- **Q9. What is missing?** camera/constraints module; owner Cinematic Director with World Engine; geometry proxies required.
- **Q10. How can it be objectively tested?** Run a corner, low arch and narrow corridor replay in both directions; zero camera proxy intersections, no exposed plate void; record time target is obscured and fallback transitions.


### Camera visibility scoring and fallback shots

**Domain:** CAM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CAM-001; MES-CAM-007 (DESIGNED).  
**Research basis:** S4 (see source list; implementation is a proposal).

- **Q1. What does it do?** Keep avatar and relevant action visible even when a pillar or crowd blocks the view.
- **Q2. How does it work?** Score authored candidate shots using projected subject area, overlap, image-bound validity and change cost; select with hysteresis; prefer gentle correction before a cut.
- **Q3. Why does it matter?** Avoid frantic camera jumps and lost visitor.
- **Q4. Can it serve PROVADIA?** Library table and crowded market.
- **Q5. Can it operate inside a browser?** Finite shot list and geometric occlusion checks.
- **Q6. Reusable across every universe?** A shot schema covers different places.
- **Q7. Dependencies, costs and performance** No paid service; measure scoring cost and shot changes on mobile/desktop.
- **Q8. Have we already built it?** Proposed; related camera gap remains open.
- **Q9. What is missing?** camera/visibility module; owner Cinematic Director; depends on occluder metadata.
- **Q10. How can it be objectively tested?** Walk behind 3 differently placed props, then stop; log shot decisions, subject visible fraction and transitions; target no repeated alternation while stationary; manually review cinematic result.


### Portrait and landscape composition constraints

**Domain:** CAM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CAM-002 (DESIGNED; 860px defect open).  
**Research basis:** S3 (see source list; implementation is a proposal).

- **Q1. What does it do?** Preserve navigable space and controls at narrow viewports.
- **Q2. How does it work?** Define safe focal regions and permissible zoom/pan for each aspect class; use alternate authored plate or fit view when a crop cannot preserve essential anchors; decouple tap coordinates from backing canvas size.
- **Q3. Why does it matter?** Directly addresses mobile cropping, not merely CSS scaling.
- **Q4. Can it serve PROVADIA?** All portals and manifestation scenes.
- **Q5. Can it operate inside a browser?** Responsive view matrices and visual-viewport layout.
- **Q6. Reusable across every universe?** One schema with per-aspect camera profiles.
- **Q7. Dependencies, costs and performance** No paid runtime; measure actual physical 375-class iPhone and mid-range Android, plus landscape/desktop.
- **Q8. Have we already built it?** Existing defect; proposed closure criteria only.
- **Q9. What is missing?** camera/framing and scene compiler; owner Cinematic Director + Mobile; depends on projection inverse.
- **Q10. How can it be objectively tested?** At 320/375/390/430 CSS px and landscape, route to each required door; all required cues/controls reachable, no horizontal overflow, pointer round-trip consistent; real-device retest.


### Group composition for visitor, Solnik and object

**Domain:** CAM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CAM-004 (DESIGNED).  
**Research basis:** S3 (see source list; implementation is a proposal).

- **Q1. What does it do?** Frame multiple participants and the Folded Paper without obscuring interaction.
- **Q2. How does it work?** Compute bounding region of weighted subjects; solve safe zoom and pan against scene constraints; use a readable alternate inspection layout if no feasible frame.
- **Q3. Why does it matter?** Keeps action and companion in one coherent image.
- **Q4. Can it serve PROVADIA?** Mint/Keeper and conversations.
- **Q5. Can it operate inside a browser?** Projected bounding boxes; CSS accessible controls.
- **Q6. Reusable across every universe?** Subject roles defined in manifests, no product-specific camera branches.
- **Q7. Dependencies, costs and performance** No paid runtime; measure legibility, frame cost, interaction latency on phone/desktop.
- **Q8. Have we already built it?** Design exists; not verified.
- **Q9. What is missing?** camera/group-frame; owner Cinematic Director + Magical Interaction; depends on mobile callout solver.
- **Q10. How can it be objectively tested?** Test 2/3/4 subjects, portrait and wide; required controls reachable, visitor and product visible or explicit alternative mode, no freeze of ambient state; human rating.


### Camera authority and interruptible transitions

**Domain:** CAM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CAM-001; MES-DOR-003 (mechanism verified).  
**Research basis:** S3 (see source list; implementation is a proposal).

- **Q1. What does it do?** Prevent cinematic direction from hijacking visitor intent.
- **Q2. How does it work?** Camera modes FOLLOW, INSPECT, THRESHOLD, MANUAL and REDUCED_MOTION with explicit priority, cancellable tween and continuity of world pose; only validated portals commit location change.
- **Q3. Why does it matter?** Preserves FVR-31 agency.
- **Q4. Can it serve PROVADIA?** Door reveals and conversations.
- **Q5. Can it operate inside a browser?** Small state machine using shared simulation clock.
- **Q6. Reusable across every universe?** Every scene uses same mode arbitration.
- **Q7. Dependencies, costs and performance** No paid runtime; measure input-to-response on physical devices.
- **Q8. Have we already built it?** Proposed extension, existing portal proof does not certify camera arbitration.
- **Q9. What is missing?** camera/modes; owner Cinematic Director; depends on world transition transaction.
- **Q10. How can it be objectively tested?** Reverse direction or close inspection mid-tween; verify input acknowledged, no duplicate crossing, no stale lock; reduced motion mode skips decorative movement.


### Shot-axis and eyeline continuity

**Domain:** CAM · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CAM-004; MES-CAM-007.  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Make edits between views feel spatially coherent.
- **Q2. How does it work?** Author subject axis, allowed screen direction and gaze targets; if crossing axis, use neutral re-establishing view or explicit visitor-controlled turn.
- **Q3. Why does it matter?** Prevents disorienting left/right reversal.
- **Q4. Can it serve PROVADIA?** Two-way street/library journey.
- **Q5. Can it operate inside a browser?** Metadata checks and view selection in JS.
- **Q6. Reusable across every universe?** Reusable authoring rules; no copied movie style.
- **Q7. Dependencies, costs and performance** No paid runtime; assess human orientation on desktop and mobile.
- **Q8. Have we already built it?** Proposed; no claim of Ubisoft implementation.
- **Q9. What is missing?** camera/shot-validator; owner Cinematic Director.
- **Q10. How can it be objectively tested?** Walk A→B→A through a two-view threshold; compare world orientation and screen direction; unfamiliar testers identify the exit without coaching.


### Reduced-motion camera and stable reading mode

**Domain:** CAM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-ACC-001; MES-CAM-006 (DESIGNED).  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Respect visitor motion preference while preserving all functions.
- **Q2. How does it work?** Disable sway, dolly flourish and nonessential interpolation; keep direct navigation and optional stationary inspection frame; allow explicit user setting overriding decorative motion.
- **Q3. Why does it matter?** Comfort and accessibility are core, not visual downgrades.
- **Q4. Can it serve PROVADIA?** Every world and parchment.
- **Q5. Can it operate inside a browser?** CSS media query plus director flags.
- **Q6. Reusable across every universe?** Global policy, scene-independent.
- **Q7. Dependencies, costs and performance** No paid runtime; verify on iOS/Android/desktop.
- **Q8. Have we already built it?** Existing reduced-motion discipline; camera-specific behavior unverified.
- **Q9. What is missing?** camera/accessibility adapter; owner Mobile/Accessibility.
- **Q10. How can it be objectively tested?** Set reduce-motion and trigger all camera modes; no decorative displacement, all navigation/product tasks finish; toggle mid-transition with no stuck state.


### Crowd fidelity tiers and identity-preserving promotion

**Domain:** CRD · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CRD-001 (mechanism verified); MES-CRD-002 (DESIGNED).  
**Research basis:** S1 (see source list; implementation is a proposal).

- **Q1. What does it do?** Keep streets populated without full-cost AI for every inhabitant.
- **Q2. How does it work?** Assign interactive near agents, coarse simulation agents and noninteractive distant visual actors; promote/demote by distance and visibility with hysteresis; persist logical identity, activity and position.
- **Q3. Why does it matter?** A browser needs density and believable continuity within measured budgets.
- **Q4. Can it serve PROVADIA?** Market and Library.
- **Q5. Can it operate inside a browser?** JS schedulers plus sprite/rig renderer adapters.
- **Q6. Reusable across every universe?** Scene-independent population schema and tier policy.
- **Q7. Dependencies, costs and performance** No paid AI runtime; measure CPU, memory, thermals for 8/16/32 synthetic agents on mid-range phone and desktop (test loads, not promised capacities).
- **Q8. Have we already built it?** Proposed; Ubisoft publicly documented AI LOD concept, not this implementation.
- **Q9. What is missing?** crowd/lod; owner Living Character; depends on scene data, clock, renderer.
- **Q10. How can it be objectively tested?** Traverse away and back; no duplicate IDs, visible teleport or appearance change of promoted agents; report frame time and memory by tier; review transition footage.


### Reciprocal local avoidance around moving bodies

**Domain:** MOV · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-MOV-007 (DESIGNED); MES-MOV-002/003/004 (VERIFIED scoped).  
**Research basis:** S2,S5 (see source list; implementation is a proposal).

- **Q1. What does it do?** Prevent people and companion walking through one another.
- **Q2. How does it work?** Use existing static route as preferred velocity; apply bounded reciprocal avoidance or constrained candidate velocities, then revalidate against static colliders; handle cases without a feasible velocity by stopping/yielding.
- **Q3. Why does it matter?** Closes real body-to-body gap without replacing verified static navigation.
- **Q4. Can it serve PROVADIA?** Visitor, Solnik and townsfolk.
- **Q5. Can it operate inside a browser?** JS 2D velocity solver; do not label simple repulsion as ORCA.
- **Q6. Reusable across every universe?** All agent classes share radii and priorities.
- **Q7. Dependencies, costs and performance** No paid runtime; compare simple steering and reciprocal solver on 8/16/32 agents on phones/desktop.
- **Q8. Have we already built it?** Designed gap; static collision evidence does not cover moving bodies.
- **Q9. What is missing?** crowd/avoidance, adapter to geometry.js and wiring/locomotion.js; owner World + Living Character.
- **Q10. How can it be objectively tested?** Head-on, crossing and overtaking tests across random seeds; no overlap above tolerance, no off-floor samples, no indefinite stalls; impossible passage yields not a false route.


### Narrow passage arbitration and deadlock recovery

**Domain:** CRD · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-MOV-006 (VERIFIED scoped); MES-MOV-007 (DESIGNED).  
**Research basis:** S2 (see source list; implementation is a proposal).

- **Q1. What does it do?** Resolve cases where both agents cannot pass at once.
- **Q2. How does it work?** Author chokepoint capacity and wait zones; reserve movement slots with bounded wait/fairness, back-off to safe waypoint; release reservation on exit or cancellation.
- **Q3. Why does it matter?** Reciprocal steering alone cannot resolve every bottleneck.
- **Q4. Can it serve PROVADIA?** Library doorway and narrow aisle.
- **Q5. Can it operate inside a browser?** Local state machine and existing progress watch.
- **Q6. Reusable across every universe?** Reusable passage metadata.
- **Q7. Dependencies, costs and performance** No paid runtime; measure wait distribution on phone/desktop.
- **Q8. Have we already built it?** New proposal; population target stall fix not crowd deadlock proof.
- **Q9. What is missing?** crowd/passage-reservations; owner Living Character; depends on portal triggers and route solver.
- **Q10. How can it be objectively tested?** Two groups arrive at one-body-width passage; no penetration or teleport, all feasible entrants finish, failed reservations clear on cancel; report maximum wait.


### Purposeful activity slot claims

**Domain:** CRD · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CRD-002 (DESIGNED); MES-CRD-005 (DESIGNED).  
**Research basis:** S6,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Give inhabitants believable work rather than meaningless strolling.
- **Q2. How does it work?** Each authored slot exposes action, capacity, entry/exit poses and occupancy lease; select by role and schedule; release on interruption, choose reachable alternatives.
- **Q3. Why does it matter?** The world is alive before arrival.
- **Q4. Can it serve PROVADIA?** Readers, librarians, merchants, craftspeople.
- **Q5. Can it operate inside a browser?** Deterministic task scheduler; no LLM needed.
- **Q6. Reusable across every universe?** New scenes author slots rather than new agent code.
- **Q7. Dependencies, costs and performance** No paid runtime; measure scheduling work on mid-range devices.
- **Q8. Have we already built it?** Design exists; proposal adds exclusivity and interruption contract.
- **Q9. What is missing?** crowd/activity-slots; owner Living Character; depends on scene schema and routing.
- **Q10. How can it be objectively tested?** Seed scene with 12 agents and 5 slots of varied capacity; never exceed capacity, unreachable slot rejected, occupied slots survive reload, roles resume after interruption.


### Calm flow lanes and density shaping

**Domain:** CRD · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-MOV-007; MES-CRD-001.  
**Research basis:** S2,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Keep a mercantile street relaxed and readable rather than chaotic.
- **Q2. How does it work?** Use broad preference lanes, doorway clear zones, occupancy heatmap and slow probabilistic destination choice; visitor always receives an accessible route when feasible.
- **Q3. Why does it matter?** Avoid crowd pressure and blocking commerce.
- **Q4. Can it serve PROVADIA?** Market, fountain court, Library entrance.
- **Q5. Can it operate inside a browser?** Grid occupancy/waypoint weights in JS.
- **Q6. Reusable across every universe?** Scene manifests supply preferred lanes and clear zones.
- **Q7. Dependencies, costs and performance** No paid runtime; measure occupancy and throughput at different agent counts on mobile/desktop.
- **Q8. Have we already built it?** Proposed; not a claim of Assassin's Creed internals.
- **Q9. What is missing?** crowd/flow-policy; owner Living Character + World.
- **Q10. How can it be objectively tested?** Run 10 seeded arrivals for 5 minutes; no standing agents in prohibited doorway region, visitor can reach each destination; log density map and waits.


### Population continuity on scene re-entry

**Domain:** CRD · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CRD-005 (DESIGNED); MES-PER-002.  
**Research basis:** S1,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Preserve inhabitant activities while a visitor briefly leaves.
- **Q2. How does it work?** Store logical activity ID, start time, destination and seeded variation; reconstruct at a feasible point on return; never fabricate real visitor presence.
- **Q3. Why does it matter?** The civilization should feel persistent, not reset like a webpage.
- **Q4. Can it serve PROVADIA?** Return to Library after viewing Mint Hall.
- **Q5. Can it operate inside a browser?** Local state store; coarse deterministic time advancement.
- **Q6. Reusable across every universe?** Per-universe namespace; state schema versioning.
- **Q7. Dependencies, costs and performance** No paid runtime; measure storage and re-entry latency on physical devices.
- **Q8. Have we already built it?** Proposed extension; separate from persistence of visitor avatar.
- **Q9. What is missing?** crowd/persistence; owner Living Character; depends on world clock and storage.
- **Q10. How can it be objectively tested?** Leave for 30 seconds, reload, return; no duplicate NPC IDs, activity timeline advances consistently, no spawn inside solids; deterministic replay on same seed.


### Inhabitant attention and polite interruption

**Domain:** CRD · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CRD-006/008 (DESIGNED).  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Allow inhabitants to notice the visitor without harassing them.
- **Q2. How does it work?** Attention score from distance, facing and activity; cooldown for greeting; activity interruption policy distinguishes busy and available characters; resume prior state after dismissal.
- **Q3. Why does it matter?** Human-like purpose and calm.
- **Q4. Can it serve PROVADIA?** Tavern bartender, librarian, merchants.
- **Q5. Can it operate inside a browser?** Local state machine with optional authored lines.
- **Q6. Reusable across every universe?** Roles and thresholds authored as data.
- **Q7. Dependencies, costs and performance** No paid runtime; measure event rates and input responsiveness.
- **Q8. Have we already built it?** Designed proxemics; proposal adds cooldown and interruption priority.
- **Q9. What is missing?** crowd/attention; owner Living Character; depends on activity slots and gaze rig.
- **Q10. How can it be objectively tested?** Repeatedly enter/exit greeting zone for 2 minutes; no repeated spam inside cooldown, busy NPC respects policy, dismiss resumes activity; human judges friendliness.


### Independent event micro-scenes

**Domain:** CRD · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CRD-002/008; MES-ENV-003.  
**Research basis:** S6 (see source list; implementation is a proposal).

- **Q1. What does it do?** Enable unscripted-looking but safe background interactions.
- **Q2. How does it work?** Schedule bounded cooperative routines (exchange book, sweep court, pass basket); participants claim slots; cancel safely if route invalid; no forced visitor engagement.
- **Q3. Why does it matter?** Makes inhabited areas feel purposeful.
- **Q4. Can it serve PROVADIA?** Library and market.
- **Q5. Can it operate inside a browser?** Seeded event coordinator with authored clips/poses.
- **Q6. Reusable across every universe?** Reusable event templates and role bindings.
- **Q7. Dependencies, costs and performance** No paid runtime; measure concurrent event cost and frequency on devices.
- **Q8. Have we already built it?** Proposed; GDC describes systemic crowd events, but these peaceful templates are ours.
- **Q9. What is missing?** crowd/events; owner Living Character.
- **Q10. How can it be objectively tested?** Run 5-minute simulation with interruptions; no stuck participants, duplicate claims or forced visitor input; event histories differ across seeds and replay for fixed seed.


### Crowd budget governor and safe degradation

**Domain:** CRD · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-REN-002 (VERIFIED scoped); MES-REN-006 (DESIGNED).  
**Research basis:** S1,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Reduce simulation/render work under device strain without breaking the world.
- **Q2. How does it work?** Monitor rolling frame time and work budgets; reduce distant update rate and decorative actors before nearby interaction; hysteresis prevents oscillation; preserve collision correctness for active bodies.
- **Q3. Why does it matter?** Mobile thermal stability matters more than arbitrary crowd count.
- **Q4. Can it serve PROVADIA?** All dense scenes.
- **Q5. Can it operate inside a browser?** JS scheduler with renderer quality adapters.
- **Q6. Reusable across every universe?** Central device policy.
- **Q7. Dependencies, costs and performance** No paid runtime; measure p95 frame time, dropped frames, heat and recovery over 30 minutes on physical phones.
- **Q8. Have we already built it?** New proposal; no thermal or frame-rate guarantee.
- **Q9. What is missing?** crowd/budget; owner Rendering + Living Character.
- **Q10. How can it be objectively tested?** Inject slow frame load and run real-device endurance; governor changes tiers monotonically under load, near collisions and actions remain valid, quality restores after stable recovery; log metrics.


### Hierarchical spatial cells with explicit vertical levels

**Domain:** WLD · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-WLD-003 (BUILT–UNVERIFIED); MES-MOV-008 (DESIGNED).  
**Research basis:** S7 (see source list; implementation is a proposal).

- **Q1. What does it do?** Distinguish stacked rooms whose floor plans overlap.
- **Q2. How does it work?** Extend scene model with levelId, local coordinates, height and explicit cross-level links; route graph indexes level; no global 3D rewrite required.
- **Q3. Why does it matter?** A mezzanine must not collide with the floor below.
- **Q4. Can it serve PROVADIA?** Library balcony, tunnels, upper chambers.
- **Q5. Can it operate inside a browser?** JSON graph and existing router adapter.
- **Q6. Reusable across every universe?** Reusable building schema.
- **Q7. Dependencies, costs and performance** No paid runtime; measure graph load and route time on physical devices.
- **Q8. Have we already built it?** Proposed extension; existing route graph not evidence of verticality.
- **Q9. What is missing?** world/level-schema; owner World Engine; depends on scene manifest.
- **Q10. How can it be objectively tested?** Create stacked rooms with identical x/z; click each floor's prop, route via stairs only, no accidental cross-floor collision or trigger; reload restores levelId.


### Stair and ramp traversal links

**Domain:** MOV · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-MOV-008 (DESIGNED); MES-DOR-001 (VERIFIED scoped).  
**Research basis:** S7,S8 (see source list; implementation is a proposal).

- **Q1. What does it do?** Walk between different elevations using explicit feasible routes.
- **Q2. How does it work?** Author entrance/exit transforms and traversal height curve, direction, clearance and speed limit; validate links before routing; use foot solver on each step.
- **Q3. Why does it matter?** Avoid arbitrary vertical sliding.
- **Q4. Can it serve PROVADIA?** Library stairs and Gate steps.
- **Q5. Can it operate inside a browser?** JS traversal controller with height sample and animation hooks.
- **Q6. Reusable across every universe?** All ramps/stairs from data.
- **Q7. Dependencies, costs and performance** No paid runtime; measure route and pose update on phones/desktop.
- **Q8. Have we already built it?** Verticality design only.
- **Q9. What is missing?** world/traversal-links; owner World + Animation.
- **Q10. How can it be objectively tested?** Traverse up/down stairs, pause/reverse midway; foot positions stay within agreed contact tolerance, level changes only at link boundary, inaccessible link fails safely.


### Doorway shared-space continuity

**Domain:** DOR · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-DOR-004 (MISSING); MES-DOR-003 (mechanism verified).  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Allow a visitor to stand within a threshold and see both adjoining places.
- **Q2. How does it work?** Use shared threshold coordinate frame and paired portal transforms; composite adjacent safe view through aperture, synchronize clock/lighting; fall back to existing verified crossing if assets lack matching geometry.
- **Q3. Why does it matter?** Makes travel physical instead of only a film transition.
- **Q4. Can it serve PROVADIA?** Street to Library.
- **Q5. Can it operate inside a browser?** Clipped layer or low-poly mesh with bounded adjacent scene load.
- **Q6. Reusable across every universe?** Each portal pair defines transforms and compatibility.
- **Q7. Dependencies, costs and performance** No paid runtime; measure combined decoded memory and draw cost on physical phones.
- **Q8. Have we already built it?** Shared space missing; no regrading of film iris.
- **Q9. What is missing?** world/threshold-view; owner World + Cinematic; depends on schema, prefetch and camera bounds.
- **Q10. How can it be objectively tested?** Stand at threshold, look both ways, advance/reverse; paired landmark registration within agreed tolerance, no duplicated visitor, no resource leak across 25 crossings; human spatial orientation check.


### Portal transform validation and reversible spawn contract

**Domain:** WLD · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-DOR-001/002 (VERIFIED scoped); MES-WLD-003.  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Ensure newly authored door pairs align spatially across cells.
- **Q2. How does it work?** Compiler validates transforms, invertibility, destination reachability, clearance, direction flags and intentional one-way exceptions; preserve authoritative current route solver.
- **Q3. Why does it matter?** Scales geometry safely when many artists author places.
- **Q4. Can it serve PROVADIA?** Every doorway, tunnel, portal.
- **Q5. Can it operate inside a browser?** Offline JS validator and graph fixtures.
- **Q6. Reusable across every universe?** Universal manifest rule.
- **Q7. Dependencies, costs and performance** No paid runtime; measure compiler time, browser transition tests on devices.
- **Q8. Have we already built it?** Proposal enriches existing mechanisms; not a new solver.
- **Q9. What is missing?** world/portal-validator; owner Manufacturing + World.
- **Q10. How can it be objectively tested?** Reject mismatched doorway transform, missing reverse link unless explicit, invalid spawn and too-narrow aperture; round-trip on valid fixture returns correct place and facing.


### Dynamic obstacle invalidation and bounded replanning

**Domain:** MOV · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-MOV-003 (VERIFIED scoped); MES-MOV-007 (DESIGNED).  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Adapt when a door closes or a movable obstacle blocks a route.
- **Q2. How does it work?** Version obstacle sets; invalidate affected segments; replan with existing visibility graph/Dijkstra and throttle repeated requests; safe stop if no route.
- **Q3. Why does it matter?** Static routing alone cannot handle a changing world.
- **Q4. Can it serve PROVADIA?** Moving cart, closing door, shifting crowd.
- **Q5. Can it operate inside a browser?** JS local route scheduler.
- **Q6. Reusable across every universe?** Data-driven obstacle lifecycle.
- **Q7. Dependencies, costs and performance** No paid runtime; measure replan latency and queue on physical devices.
- **Q8. Have we already built it?** New proposal beyond static verified route.
- **Q9. What is missing?** world/route-invalidation; owner World Engine.
- **Q10. How can it be objectively tested?** Close a door mid-route and reopen; zero penetration, no infinite retries, correct alternate route or safe stop; deterministic outcome for same event sequence.


### Two-bone leg IK and planted-foot constraint

**Domain:** ANM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-ANM-002 (BUILT–UNVERIFIED).  
**Research basis:** S8 (see source list; implementation is a proposal).

- **Q1. What does it do?** Keep feet attached to floor during walk stance.
- **Q2. How does it work?** Use authored joint lengths, target foot contact position and a two-link analytic solve with reach clamps; blend in swing, preserve orientation and avoid knee flips.
- **Q3. Why does it matter?** Natural gait cannot be achieved by stage sliding.
- **Q4. Can it serve PROVADIA?** Avatar, Solnik, inhabitants with articulated legs.
- **Q5. Can it operate inside a browser?** JS bone transforms on rig adapter.
- **Q6. Reusable across every universe?** Per-rig limb lengths, shared solver.
- **Q7. Dependencies, costs and performance** No paid runtime; measure foot drift and CPU on devices.
- **Q8. Have we already built it?** Walker phase exists; actual IK/contact quality not established.
- **Q9. What is missing?** animation/foot-ik; owner Living Character.
- **Q10. How can it be objectively tested?** Walk 10 steps at three speeds and up ramp; report planted-foot drift in world units and projected pixels, no invalid transforms or hyperextension; review slowed footage.


### Stride-length and locomotion-speed matching

**Domain:** ANM · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-ANM-002; MES-MOV-011 (DESIGNED).  
**Research basis:** S8 (see source list; implementation is a proposal).

- **Q1. What does it do?** Prevent feet skating when character speed changes.
- **Q2. How does it work?** Drive cycle phase by traveled distance, adjust stride within rig limits, blend gait states with hysteresis; synchronize acceleration profile to step events.
- **Q3. Why does it matter?** Movement should have weight.
- **Q4. Can it serve PROVADIA?** Visitor, Solnik and crowds.
- **Q5. Can it operate inside a browser?** JS phase and pose adapter.
- **Q6. Reusable across every universe?** Rig-specific stride profile, universal controller.
- **Q7. Dependencies, costs and performance** No paid runtime; measure drift and transition timing on phones/desktop.
- **Q8. Have we already built it?** Distance phase present, stride adaptation proposed.
- **Q9. What is missing?** animation/stride-adapter; owner Living Character.
- **Q10. How can it be objectively tested?** Ramp speed from rest to walk/run and stop; compare traveled distance and foot stance position, no discontinuity on speed reversal; record metrics.


### Hand reach, grab and prop alignment

**Domain:** ANM · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-ANM-006 (DESIGNED).  
**Research basis:** S9 (see source list; implementation is a proposal).

- **Q1. What does it do?** Make Solnik actually hold and present parchment.
- **Q2. How does it work?** Solve bounded arm reach toward scene or prop socket; align grip orientation and blend into release; impossible reach prompts repositioning.
- **Q3. Why does it matter?** Physical magic requires a visible cause.
- **Q4. Can it serve PROVADIA?** Folded Paper, library book, tavern mug.
- **Q5. Can it operate inside a browser?** 2D/3D rig math with socket metadata.
- **Q6. Reusable across every universe?** Any articulated role and prop schema.
- **Q7. Dependencies, costs and performance** No paid runtime; measure hand/prop alignment on phones/desktop.
- **Q8. Have we already built it?** Hand socket proposed previously; reach IK adds constraint.
- **Q9. What is missing?** animation/reach-ik; owner Living Character + Magic.
- **Q10. How can it be objectively tested?** Pick up parchment at three heights; grip and prop stay within authored contact tolerance, no detached frame or arm inversion; unreachable prop safely rejected.


### Turn-in-place and body orientation

**Domain:** ANM · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-MOV-011; MES-ANM-002.  
**Research basis:** S8,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Make facing changes read as motion, not mirrored teleport.
- **Q2. How does it work?** Use direction-specific authored poses or turn blend; rate-limit torso facing, permit independent head gaze and step correction; preserve path authority.
- **Q3. Why does it matter?** Natural orientation improves cinematic continuity.
- **Q4. Can it serve PROVADIA?** Any walker stopping, speaking, reversing.
- **Q5. Can it operate inside a browser?** JS blend logic and rig pose data.
- **Q6. Reusable across every universe?** Rig capabilities declare supported directions.
- **Q7. Dependencies, costs and performance** No paid runtime; measure turn behavior on devices.
- **Q8. Have we already built it?** Proposed; linear travel and existing poses not full turn system.
- **Q9. What is missing?** animation/turn; owner Living Character.
- **Q10. How can it be objectively tested?** Run 90/180 degree turns at stop and low speed; no abrupt root translation, no foot jumps beyond target, facing converges and route remains valid; human review.


### Motion alignment at interaction anchors

**Domain:** ANM · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-DOR-001; MES-ANM-006.  
**Research basis:** S9 (see source list; implementation is a proposal).

- **Q1. What does it do?** Align scripted action endings with real door handles, seats or lecterns.
- **Q2. How does it work?** Boundedly warp root translation/rotation over authored action window to target; reject targets outside allowable reach and respect collision every frame.
- **Q3. Why does it matter?** Avoid actions floating beside their objects.
- **Q4. Can it serve PROVADIA?** Door opening, sitting, scroll handoff.
- **Q5. Can it operate inside a browser?** JS animation-window adapter; not Unreal runtime.
- **Q6. Reusable across every universe?** Action/anchor schema reusable.
- **Q7. Dependencies, costs and performance** No paid runtime; measure drift and pose continuity on devices.
- **Q8. Have we already built it?** Proposed; public motion-warping reference, not verified house function.
- **Q9. What is missing?** animation/action-alignment; owner Living Character + World.
- **Q10. How can it be objectively tested?** Perform action against five anchors including invalid and obstructed cases; valid endpoint within tolerance, invalid fails safely, no wall penetration; report warp magnitude.


### Locomotion replay and pause semantics

**Domain:** TST · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-MOV-010 (BUILT–UNVERIFIED); MES-TST-005 (DESIGNED).  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Prove stable movement across frame rates and tab interruptions.
- **Q2. How does it work?** Replay timestamped inputs in fixed simulation ticks; explicitly define pause behavior (do not require wall-clock movement during suspended time); cap catch-up and interpolate presentation.
- **Q3. Why does it matter?** Prevents misleading invariance tests with contradictory time assumptions.
- **Q4. Can it serve PROVADIA?** Every moving character.
- **Q5. Can it operate inside a browser?** Node/browser replay harness.
- **Q6. Reusable across every universe?** Shared seed and trace format.
- **Q7. Dependencies, costs and performance** No paid runtime; measure on 30/60/120 Hz devices where available.
- **Q8. Have we already built it?** Clock exists; dedicated pause/replay test proposed.
- **Q9. What is missing?** tests/locomotion-replay; owner independent verifier.
- **Q10. How can it be objectively tested?** Compare equal active simulation time at varying frame schedules and injected 500 ms pause; final displacement within tolerance, no tunneling, no runaway catch-up; report skipped simulation time.


### Dynamic occlusion with height-aware proxies

**Domain:** REN · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-REN-001 (mechanism verified); MES-MOV-008.  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Prevent incorrect painter sorting around tall/moving objects.
- **Q2. How does it work?** Extend simple foot-depth ordering using levelId, depth intervals, explicit occlusion masks or depth-tested local geometry; split intersecting props as needed.
- **Q3. Why does it matter?** Characters should appear behind tables and underneath balcony edges.
- **Q4. Can it serve PROVADIA?** Library, stairs, crowds.
- **Q5. Can it operate inside a browser?** Layered masks today, WebGL depth optional.
- **Q6. Reusable across every universe?** Per-entity proxy and renderer adapter.
- **Q7. Dependencies, costs and performance** No paid runtime; measure draw and overdraw costs on mid-range devices.
- **Q8. Have we already built it?** Existing layered proof is scoped; dynamic height-aware behavior proposed.
- **Q9. What is missing?** render/occlusion; owner Rendering + World.
- **Q10. How can it be objectively tested?** Walk behind tall prop, beneath balcony and past moving NPC; pixel masks match expected ordering at sampled frames, no invalid cross-level occlusion; visual review.


### Soft foreground visibility without cheating collision

**Domain:** REN · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CAM-001; MES-REN-001.  
**Research basis:** S4,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Reveal avatar when an essential foreground object hides it for too long.
- **Q2. How does it work?** Allow authored foreground masks to fade locally or switch view based on visibility threshold; keep physical collision and world geometry unchanged; use optional silhouette only when art direction approves.
- **Q3. Why does it matter?** Maintain control without destroying spatial credibility.
- **Q4. Can it serve PROVADIA?** Library shelves, pillars.
- **Q5. Can it operate inside a browser?** Canvas alpha/mask or WebGL blend with hysteresis.
- **Q6. Reusable across every universe?** Scene opt-in flag for eligible occluders.
- **Q7. Dependencies, costs and performance** No paid runtime; measure blending cost on physical devices.
- **Q8. Have we already built it?** Proposed; not existing painter sorting proof.
- **Q9. What is missing?** render/foreground-fade; owner Cinematic + Rendering.
- **Q10. How can it be objectively tested?** Pause behind each permitted occluder, then move clear; subject becomes readable, alpha recovers without flicker; collision results identical with fade disabled/enabled.


### Occlusion authoring and alignment lint

**Domain:** PIPE · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-WLD-001; MES-REN-001; MES-LGT-002.  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Catch art masks misaligned with collision or projected depth before release.
- **Q2. How does it work?** Compiler checks dimensions, shared coordinates, alpha bounds, declared foot anchors and missing mask/depth assets; render diagnostic overlay for author review.
- **Q3. Why does it matter?** Prevents one-off compositing hacks per environment.
- **Q4. Can it serve PROVADIA?** Every Genspark/Veo plate integrated into scenes.
- **Q5. Can it operate inside a browser?** Local asset compiler and browser diagnostic.
- **Q6. Reusable across every universe?** Reusable import contract.
- **Q7. Dependencies, costs and performance** No paid runtime; local compute and review time measured.
- **Q8. Have we already built it?** Proposed; does not upgrade existing renderer.
- **Q9. What is missing?** factory/occlusion-lint; owner Manufacturing + Rendering.
- **Q10. How can it be objectively tested?** Inject wrong mask dimensions, flipped anchor and invalid depth; compiler rejects each; valid plate loads, overlay checked on desktop and physical phone.


### Multi-companion formation slot assignment

**Domain:** CRD · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CRD-009 (BUILT–UNVERIFIED); MES-MOV-007.  
**Research basis:** S2 (see source list; implementation is a proposal).

- **Q1. What does it do?** Allow Solnik and optional companions to follow without bunching.
- **Q2. How does it work?** Assign follower slots relative to visitor heading; choose reachable slots by cost with hysteresis; collapse to single file in narrow corridors; route independently via authoritative solver.
- **Q3. Why does it matter?** Supports future guides without sacrificing calm travel.
- **Q4. Can it serve PROVADIA?** Visitor plus one or more companions.
- **Q5. Can it operate inside a browser?** JS slot matching and steering.
- **Q6. Reusable across every universe?** Formation profile per group.
- **Q7. Dependencies, costs and performance** No paid runtime; measure route and avoidance costs on devices.
- **Q8. Have we already built it?** Single companion exists; multi-companion proposed.
- **Q9. What is missing?** crowd/formation; owner Living Character.
- **Q10. How can it be objectively tested?** Walk with three companions through open court and one-body passage; no overlap or off-floor movement, formation recovers after passage, no slot thrashing while stopped.


### Companion separation, reunion and visitor agency

**Domain:** CRD · **Priority:** P0 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-CRD-009; MES-DOR-001.  
**Research basis:** S2,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Keep Solnik helpful when visitor outruns or leaves him behind.
- **Q2. How does it work?** Use explicit FOLLOW/WAIT/CATCH_UP/REJOIN states; route around obstacles; if no path, show honest optional recall at valid out-of-view spawn rather than teleport visibly; never block visitor.
- **Q3. Why does it matter?** Companion should serve, not control.
- **Q4. Can it serve PROVADIA?** Any journey and optional guide.
- **Q5. Can it operate inside a browser?** Local state machine integrated with portal commits.
- **Q6. Reusable across every universe?** Reusable companion behavior contract.
- **Q7. Dependencies, costs and performance** No paid runtime; measure catch-up and response on real devices.
- **Q8. Have we already built it?** Existing follow behavior partly built; reunion protocol proposed.
- **Q9. What is missing?** crowd/companion-lifecycle; owner Living Character.
- **Q10. How can it be objectively tested?** Visitor reverses, pauses, crosses door, closes path; companion does not duplicate or block user, rejoin or clear fallback occurs, state resumes after reload.


### World-phase clock and seasonal state transitions

**Domain:** ENV · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-ENV-001 (BUILT–UNVERIFIED); MES-LGT-003 (MISSING).  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Coordinate environmental phase across rooms and exterior.
- **Q2. How does it work?** Use versioned worldPhase plus deterministic local phase mapping; season changes select compatible assets and routines, blend presentation, preserve collisions unless a separately validated geometry variant applies.
- **Q3. Why does it matter?** Avoid instant contradictory weather and light between places.
- **Q4. Can it serve PROVADIA?** Street, fountain, windows and Library.
- **Q5. Can it operate inside a browser?** JS state and asset selection.
- **Q6. Reusable across every universe?** One clock policy; per-scene variants optional.
- **Q7. Dependencies, costs and performance** No paid runtime; existing assets only for prototype; measure memory and transition pacing on devices.
- **Q8. Have we already built it?** World-phase system incomplete; proposed extension.
- **Q9. What is missing?** world/environment-clock; owner Cinematic + World.
- **Q10. How can it be objectively tested?** Set dawn→dusk and season transition; enter adjacent room halfway, phase consistent, no vanished route or asset mismatch; reduced-motion variant stays usable.


### Weather layers with local exposure volumes

**Domain:** LGT · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-LGT-003 (MISSING); MES-ENV-006 (DESIGNED).  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Show rain, fog or wind outdoors without leaking indoors.
- **Q2. How does it work?** Author exposure zones and roof masks; share wind/rain parameters across scene; fade particles and acoustic bed crossing shelter; use low-cost deterministic effects, not separate generated films.
- **Q3. Why does it matter?** Cinematic continuity and believable shelter.
- **Q4. Can it serve PROVADIA?** Courtyard, street, covered arch.
- **Q5. Can it operate inside a browser?** Canvas/WebGL particles with masks and audio bus.
- **Q6. Reusable across every universe?** Exposure metadata reusable.
- **Q7. Dependencies, costs and performance** No paid runtime; measure GPU, overdraw, thermal and decoded assets on phones.
- **Q8. Have we already built it?** Weather missing in v0.2; proposal.
- **Q9. What is missing?** environment/weather; owner Cinematic Director.
- **Q10. How can it be objectively tested?** Walk from rain into shelter and return; no indoor precipitation in mask, audio follows exposure, collision unchanged; frame costs logged in 30-minute physical test.


### Day-night lighting coherence and light profile variants

**Domain:** LGT · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-LGT-002 (defect open); MES-LGT-003 (MISSING).  
**Research basis:** P (see source list; implementation is a proposal).

- **Q1. What does it do?** Keep character, props and background light consistent across time and rooms.
- **Q2. How does it work?** Choose authored lighting profiles per world phase; interpolate tint/shadow parameters only where plate supports it; use distinct validated plate variants for large changes; avoid claiming a tint creates true lighting.
- **Q3. Why does it matter?** Prevents characters looking pasted into cinematic scenery.
- **Q4. Can it serve PROVADIA?** Library, gate, market.
- **Q5. Can it operate inside a browser?** JS shader/canvas tint, optional actual lights in local geometry.
- **Q6. Reusable across every universe?** Scene lighting manifest.
- **Q7. Dependencies, costs and performance** No paid runtime; measure quality and device cost; new film generation not authorized.
- **Q8. Have we already built it?** Character fusion defect and dynamic lighting gap; design extension.
- **Q9. What is missing?** render/light-profiles; owner Cinematic + Rendering.
- **Q10. How can it be objectively tested?** Compare three character positions in dawn/dusk scenes against reference frame; shadow direction and color match author targets, no jump on phase change; founder/unprimed viewer examination.


### Room acoustic zones and reverberation crossfade

**Domain:** AUD · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-AUD-003/005 (DESIGNED).  
**Research basis:** S10 (see source list; implementation is a proposal).

- **Q1. What does it do?** Give Library, tunnel, street and tavern distinct acoustic space.
- **Q2. How does it work?** Assign zone-specific dry/wet mix and short impulse response; share audio graph, smoothly crossfade on boundary, keep bounded effect tails and respect mute.
- **Q3. Why does it matter?** Sound conveys space even without extra video.
- **Q4. Can it serve PROVADIA?** Every indoor/outdoor transition.
- **Q5. Can it operate inside a browser?** Web Audio ConvolverNode and gain nodes; fallback dry audio.
- **Q6. Reusable across every universe?** Acoustic profile authored per scene.
- **Q7. Dependencies, costs and performance** No paid runtime; use owned or licensed impulse samples; measure CPU, transfer, battery on iOS/Android.
- **Q8. Have we already built it?** Acoustics proposed; existing sound gate not zone audio.
- **Q9. What is missing?** audio/zone-mixer; owner Cinematic Audio.
- **Q10. How can it be objectively tested?** Cross street→Library→tunnel→street; wet/dry gain follows zones with no clipping or discontinuity; mute silences all; physical headphone and speaker review.


### Portal-based acoustic propagation and occlusion

**Domain:** AUD · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-AUD-003 (DESIGNED); MES-DOR-006.  
**Research basis:** S10,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Make distant sound travel through open doors and become muffled when closed.
- **Q2. How does it work?** Build small acoustic adjacency graph; approximate shortest audible path with per-door gain and low-pass filter; update on portal state, bound audible emitters; do not claim full wave simulation.
- **Q3. Why does it matter?** A space should sound spatially connected.
- **Q4. Can it serve PROVADIA?** Hear fountain through arch, tavern beyond door.
- **Q5. Can it operate inside a browser?** Web Audio panner/filter and local graph.
- **Q6. Reusable across every universe?** Door material/attenuation metadata.
- **Q7. Dependencies, costs and performance** No paid runtime; measure emitter update and audio continuity on devices.
- **Q8. Have we already built it?** Positional audio design exists; graph propagation proposed.
- **Q9. What is missing?** audio/portal-propagation; owner Cinematic Audio + World.
- **Q10. How can it be objectively tested?** Compare same source open/closed and around corner; gain/filter follow authored values, no clicks, no leaked audio from unloaded rooms; test mute.


### Acoustic prioritization for busy environments

**Domain:** AUD · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-AUD-007/008 (DESIGNED).  
**Research basis:** S10,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Keep dialogue clear amid crowd, footsteps and ambience.
- **Q2. How does it work?** Prioritize dialogue and visitor feedback; virtualize distant emitters, cap active voices by measured budget; smoothly duck ambience without losing spatial cues.
- **Q3. Why does it matter?** Crowd density should not cause noisy confusion.
- **Q4. Can it serve PROVADIA?** Tavern and market, Solnik conversations.
- **Q5. Can it operate inside a browser?** Web Audio gain graph and emitter scheduler.
- **Q6. Reusable across every universe?** Global audio priority policy.
- **Q7. Dependencies, costs and performance** No paid runtime; measure clipping, CPU, intelligibility on ordinary phones.
- **Q8. Have we already built it?** Dialogue ducking designed; virtual voice prioritization proposed.
- **Q9. What is missing?** audio/voice-budget; owner Cinematic Audio.
- **Q10. How can it be objectively tested?** Trigger 20 synthetic emitters plus conversation; report active count, peak levels, speech comprehension; no loss of essential cue, mute/suspend work.


### Footstep and doorway sound synchronization

**Domain:** AUD · **Priority:** P1 · **Classification:** [PROPOSAL] for the proposed delta; existing states unchanged.  
**House cross-references:** MES-AUD-005 (DESIGNED); MES-ANM-002.  
**Research basis:** S10,P (see source list; implementation is a proposal).

- **Q1. What does it do?** Synchronize audio events to physical contact rather than arbitrary timers.
- **Q2. How does it work?** Emit step event from actual planted-foot phase; select floor material at contact, spatialize near source; cancel scheduled sounds on pause/teleport; door sound bound to actual transition state.
- **Q3. Why does it matter?** Makes movement feel embodied.
- **Q4. Can it serve PROVADIA?** Every avatar and close inhabitant.
- **Q5. Can it operate inside a browser?** Web Audio buffers and animation events.
- **Q6. Reusable across every universe?** Material/event mapping data.
- **Q7. Dependencies, costs and performance** No paid runtime; measure event-to-audio latency on physical devices.
- **Q8. Have we already built it?** Surface mapping designed, timing integration proposed.
- **Q9. What is missing?** audio/contact-events; owner Cinematic Audio + Living Character.
- **Q10. How can it be objectively tested?** Record walk across two materials and pause/reverse; one event per contact, correct material, no ghost steps or duplicate door sound; compare rendered frames and audio waveform.


## Acceptance and handoff

Run a bounded Library + Street specimen with the existing assets first. Include two-way traversal, a deliberately blocked path, crowded doorway, Solnik catch-up, product inspection and reduced-motion/accessible navigation. Preserve the existing 25-crossing lifecycle examination, rerun affected tests after any changes, add the dynamic-body and camera replay fixtures, and conduct 5-minute and 30-minute endurance tests on physical mid-range Android, iPhone and desktop. Log exact device/browser, build hash, fixture seed, transferred bytes, decoded-memory observations, frame pacing, stalls, temperature/thermal symptoms, input responsiveness and failures. A headless test does not prove physical-device performance or cinematic immersion. Ask unfamiliar visitors to navigate without coaching and assess the Five Proofs and PIS-01 separately. Retain negative evidence and never award a blanket PASS.

No new mass cinematic generation is authorized. The camera/crowd software can proceed with the existing assets while the Captain reconciles the register. No actual code, live deployment or financial operation is part of this report.

## Machine-counted delivery tally



| Domain | Dossiers |
|---|---:|
| ANM | 5 |
| AUD | 4 |
| CAM | 8 |
| CRD | 10 |
| DOR | 1 |
| ENV | 1 |
| LGT | 2 |
| MOV | 3 |
| PIPE | 1 |
| REN | 2 |
| TST | 1 |
| WLD | 2 |
| **Total** | **40** |

Priority tally: 23 P0 · 17 P1. The 40 proposed dossiers do not add 40 new house IDs automatically. All classifications are proposed deltas or the cited register states, not certifications.

— ChatGPT, Independent Partner and Verification Seat

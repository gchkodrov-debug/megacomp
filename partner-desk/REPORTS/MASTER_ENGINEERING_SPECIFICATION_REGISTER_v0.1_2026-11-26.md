# MASTER ENGINEERING SPECIFICATION REGISTER — v0.1 (FOUNDED 2026-11-26)
**Founded under the Founder Directive — Assassin's Creed Engineering Benchmark (2026-11-26). A permanent register of the house, kept beside the Foundational Vision Register and the Master Universe Map.**

## 1. PURPOSE AND PLACE
The founder's structure, verbatim in intent:

| Register | Question it answers |
|---|---|
| **Foundational Vision Register** (FVR-01 → FVR-31) | What we are building, and why |
| **Master Universe Map** | Everything that exists within our civilization |
| **Master Engineering Specification Register** (this document) | **Every mechanism required to make it work** |
| Construction + independent examinations | Proof that every mechanism works |

This register is the engineering memory of the civilization. A mechanism that is not in this register does not get silently forgotten; a mechanism in this register does not get silently upgraded — its state changes only on evidence, and the evidence is named in its entry. It is seeded by the Captain's architecture audit of 2026-11-26 (`CAPTAIN_ARCHITECTURE_AUDIT_AC_BENCHMARK_2026-11-26.md`), and it is built to be grown by Gemini's external research (Commission #125) and corrected by ChatGPT's reconciliation. IDs, once issued, are **stable forever** — a retired entry is marked, never deleted or renumbered.

## 2. THE ID SCHEME
`MES-<PREFIX>-<NNN>` — category prefix + zero-padded sequence within the category.

| Prefix | Category |
|---|---|
| WLD | World architecture & construction engines |
| MOV | Movement, physics & collision |
| CAM | Camera intelligence & cinematic direction |
| CRD | Crowds & autonomous inhabitants |
| ENV | Environmental life & storytelling |
| DOR | Doors, interiors & traversal |
| ANM | Animation, gesture & facial expression |
| AUD | Audio — spatial sound & acoustics |
| LGT | Lighting, shadow, weather & atmosphere |
| PER | Persistence, memory & world state |
| MAN | Manifestation & interactive objects |
| NAV | Navigation & visitor guidance |
| REN | Rendering, optimization & streaming |
| MOB | Mobile & browser compatibility |
| ACC | Accessibility & alternative navigation |
| SHR | Shared world & presence |
| INT | Intelligence & behavioural systems (Solnik's mind) |
| SEC | Security & identity |
| ECO | Commerce & economic infrastructure |
| PIPE | Pipelines, manufacturing & reusable-engine discipline |
| TST | Testing, verification & proof |
| PRS | Preservation & restorability |

## 3. THE SEVEN CLASSIFICATION STATES (the directive's, in house terms)
1. **VERIFIED** — built, and independently confirmed (blind verifier, captain's re-run of another seat's evidence, or live customer-eye proof). The confirming evidence is cited in the entry.
2. **BUILT–UNVERIFIED** — built and self-tested by its builder; the Relay has not closed. (House README language: "BUILT — UNVERIFIED.")
3. **UNDER CONSTRUCTION** — a seat is actively building it now.
4. **DESIGNED** — specified on paper (architecture paper, register, directive, design file); no build exists.
5. **MISSING** — known to be needed; nothing designed, nothing built.
6. **NOT APPLICABLE** — examined and ruled out for a browser civilization, with the reason recorded.
7. **RESEARCH** — requires further research before it can even be classified (Gemini's #125 seat is the usual source).

## 4. THE ENTRY TEMPLATE (the directive's ten questions, as fields)
```
### MES-XXX-NNN · <name>
- **State:** one of the seven
- **What it does / How it works:** …
- **Why it matters for PROVADIA:** …
- **Serves PROVADIA? / In a browser? / Reusable across every universe?:** …
- **Dependencies, costs, performance:** …
- **Built? (evidence):** file / report / live address, or "no"
- **What is missing:** …
- **Objective test:** the measurement that would move this entry's state
- **Cross-references:** FVR-… · Map §… · Migration Register §…
```
Seed entries below fill every field the audit's evidence supports and mark the rest `— (awaits Gemini #125 / reconciliation)` rather than inventing content. Compact seed lines carry: state · what it is · evidence · the gap.

## 5. SEED ENTRIES (from the Captain's audit, 2026-11-26)

### WLD — World architecture
- **MES-WLD-001 · Scenes as pure spatial data (one schema)** — **BUILT–UNVERIFIED.** Scene = JSON data (floor band, depth bands, anchors with depth + occlusion); renderers consume a view model only. Evidence: `construction/world-engine/` (65/65 checks), prototype pass 2 (blind-verified use). Gap: shipped example data's backdrop paths resolve from no single root (critic W-6). Test: filesystem-resolution test over both example files. X-ref: FVR-31 · Architecture v1 §2.1.
- **MES-WLD-002 · World model ≠ renderer (founding law)** — **VERIFIED as a discipline.** Every build to date honours it (layered renderer today, depth-projected tomorrow, model untouched). Evidence: World Engine README; Seat F README's staging-math decision.
- **MES-WLD-003 · Route graph as data (places = nodes, doors = edges)** — **BUILT–UNVERIFIED.** BFS both directions + hash routing in the engine; exercised in prototype + wiring. X-ref: Architecture v1 §3.
- **MES-WLD-004 · Depth-projected cinematic hybrid renderer** — **DESIGNED.** Architecture v1.1: spatial model → local depth maps → displaced mesh (~0.7–1.1 MB/scene). Not built; full 3-D and Gaussian Splatting ruled out for v1 mobile. Test: one-room prototype measured against PIS-01 budgets.
- **MES-WLD-005 · Place streaming / level-of-detail** — **MISSING.** Places load whole; no streaming, no LOD. Needed before a town of places can open in one session.
- **MES-WLD-006 · PLACES schema pattern (Run #2 specimen)** — **BUILT–UNVERIFIED (as a pattern).** Normalized coords, walkable polygons, portal records with stand points, spawns as data; third-place-from-data proof PASSED in examination. Adoption judged worthwhile — convergence of `scenes.example.json` toward it is proposed, not done. Evidence: `VIBE_RUN2_EXPERIMENT_REPORT_2026-11-25.md`.
- **MES-WLD-007 · Single-server concentration risk** — **DESIGNED (named, unsolved).** Brain + members + Gatehouse on one VPS; F0 requires hard quotas with Gatehouse priority. Test: quota enforcement demonstrated under load.

### MOV — Movement, physics & collision
- **MES-MOV-001 · Perspective projection + exact inverse (pointer mapping)** — **BUILT–UNVERIFIED.** Specimen form scale = 1/(1.68 − 0.68·z); round-trip error < 1e-7 (62 geometry checks). Named disagreement with the engine's linear band math is pinned by a test, not blended.
- **MES-MOV-002 · Collision resolution (resolvePoint)** — **VERIFIED at mechanism level.** Blind verifier's own probes: routing 308 samples 0 inside; clearance exactly the body radius. Evidence: `WIRING_BLINDVERIFY_2026-11-25.md`.
- **MES-MOV-003 · Routed locomotion (visibility graph + Dijkstra)** — **VERIFIED at mechanism level** for interior-obstacle scenes (same evidence). See MES-MOV-005 for its boundary defect.
- **MES-MOV-004 · Wall sliding** — **VERIFIED.** 152 contact samples riding a face at z ≈ 0.682 while advancing; corner rounded; arrival clean.
- **MES-MOV-005 · DEFECT D-V1 — routes can leave floor bounds** — **UNDER CONSTRUCTION (fix seat running).** Bounds checked at endpoints only; graph nodes unchecked; a too-narrow gap routes off-floor (x = −1.0525) instead of failing clean. No-squeeze property itself held everywhere. Test: verifier re-check of claim 4 after the fix.
- **MES-MOV-006 · DEFECT D-V2 — population stall backstop missing** — **UNDER CONSTRUCTION (fix seat running, with D-V1).** A body whose authored target lies inside furniture pins forever (reader at the desk face, `moving` true 100% of 49 s). The visitor's progress-based stall detector exists; population drivers lack it.
- **MES-MOV-007 · Body-to-body collision / avoidance** — **MISSING.** Inhabitants pass through each other (blind-measured min distance 0.0026). Stated model today: resolve-only against furniture.
- **MES-MOV-008 · Verticality (stairs, climbing, elevation in the engine)** — **MISSING.** The live cartoon rig climbs on flat pages; the world engine has no height.
- **MES-MOV-009 · Generated collision resolver (Run #2 specimen)** — **NOT APPLICABLE as shipped.** Wedges permanently at a tight corner (26-unit corridor vs 40-unit body); house geometry remains the authority. Recorded so the lesson is not re-bought.

### CAM — Camera
- **MES-CAM-001 · Camera director / follow behaviour** — **MISSING.** No camera system exists; the stage is the shot. Required by MES-CAM-002's fix and by any projected-renderer future.
- **MES-CAM-002 · The 860px stage floor at phone widths (rule ⑦ FLAG)** — **DESIGNED (defect characterised, fix open).** Blind-verifier-corrected measurement: projection crops at *every* depth at 375 px (near |x| ≤ 0.4075, far ≤ 0.6813); the layered renderer is unaffected. Mobile acceptance HOLD (ChatGPT) until settled + device-tested.
- **MES-CAM-003 · Parallax depth planes** — **BUILT–UNVERIFIED.** Layered planes tied to visitor position in Seat D + prototype; blind-verified z-order honesty in the prototype (anchors 43/65/90).

### CRD — Crowds & inhabitants
- **MES-CRD-001 · Population as scene data (stand / stroll / cross drivers)** — **BUILT–VERIFIED at mechanism level** (prototype blind verification; Seat D + wiring exercises). Motion only — see MES-CRD-002.
- **MES-CRD-002 · Inhabitant behaviour (purposes, schedules, reactions)** — **MISSING.** No behaviour system beyond drivers + gaze. The founder's POPULATED WORLD addendum is met in motion, not in behaviour.
- **MES-CRD-003 · Population keeps living during manifestations** — **VERIFIED** (Seat D exercise: population positions changed across the manifestation; blind-spot report requirement). Life never gates on the visitor's actions.
- **MES-CRD-004 · Population specimen (AI Studio Run #3, "Lantern Market of Brindlewick")** — **DESIGNED (spec written, not fired).** Gemini's run order: after Run #2's examination (done). Six townsfolk, three behaviour loops, crowd avoidance — its examination will feed MES-CRD-002/007.

### ENV — Environmental life & storytelling
- **MES-ENV-001 · Independent ambient layer cycles (coprime durations)** — **BUILT–UNVERIFIED.** Master-clock ambient family (47 s / 61 s / 13 s / 29 s), coprime-validated in the engine's tests (one real gcd bug caught + fixed by its own suite).
- **MES-ENV-002 · Continuous environmental life (no visible loop interruption)** — **BUILT–VERIFIED at 60-second headless leg** (ET-120: seams/sync/black-frames PASS). 5-minute and 30-minute legs **unrun anywhere** — state cannot rise until they run, on a device.
- **MES-ENV-003 · Systemic environmental storytelling (props with state, discoverable micro-narratives)** — **MISSING.** Storytelling today is art-carried (stills, films, lore), not mechanism-carried.
- **MES-ENV-004 · The Seven Secrets reveal cadence** — **DESIGNED, OWNERLESS.** Hashes live in the site footer; the Tuesday reveal cadence has no owner (Migration Register flag). A mechanism without an operator is an entry here until one is named.

### DOR — Doors & traversal
- **MES-DOR-001 · Doors as data (stand point, trigger, target, spawn)** — **VERIFIED at mechanism level** (wiring blind verification; door stand-points reproduce the specimen's authored points exactly; stand-point-in-furniture resolved out — the D-V2 fix extends this to population targets).
- **MES-DOR-002 · Traversal endurance / lifecycle hygiene** — **VERIFIED.** 25 crossings, listener/rAF census identical at 5/10/15/20/25; matched start/stop + bindHash/unbindHash pairs.
- **MES-DOR-003 · Portal crossings (film iris between places)** — **BUILT–VERIFIED at mechanism level** (prototype: Job 3 portal overlay, router both directions + Back/Forward + reload recovery).
- **MES-DOR-004 · Continuous interior/exterior space (standing in a doorway, seeing through)** — **MISSING.** Traversal is scene-to-scene, never through shared space.

### ANM — Animation & body
- **MES-ANM-001 · Cartoon Solnik rig (articulated vector body)** — **VERIFIED — LIVE.** Walk/run/climb/swing/laugh/instruments; founder-approved on all 7 doors 2026-11-25. Evidence: live site; build record (cartoon-02).
- **MES-ANM-002 · Walker locomotion contract (phase from ground covered, settle, contact shadow)** — **BUILT–UNVERIFIED** (avatar-system 13/13; pose() is renderer-neutral data).
- **MES-ANM-003 · Visitor/inhabitant figure quality** — **BUILT–UNVERIFIED, quality gap open.** Figures in engine builds are flat silhouettes (stand-ins confessed by Seat D + wiring). Against the founder's animated-film standard this is Architecture risk R2 — founder-judged, unmeasured.
- **MES-ANM-004 · Facial expression / gesture vocabulary shared across bodies** — **MISSING** beyond the Solnik rig's own set + companion viseme state.

### AUD — Audio
- **MES-AUD-001 · The Sound Gate (measure every landed MP4; < −30 dB auto-cured + re-measured)** — **VERIFIED.** Proven cures: Films 13/15/16, Job 5 (−38.3 → −21.3 dB). House law.
- **MES-AUD-002 · Acoustic Genome (each product's own soundscape, named in its prompt)** — **BUILT–UNVERIFIED as a system** (applied per-film; principles: authenticity, synchronization, individuality, visitor control).
- **MES-AUD-003 · Spatial / positional audio** — **MISSING.** No distance attenuation, no acoustic zones, no material footsteps. An entire benchmark sense unbuilt.
- **MES-AUD-004 · Live voice (Solnik TTS)** — **BUILT–VERIFIED as a service path.** Gemini Achird flipped live 2026-11-25 23:50 CT; round-trip audio through the brain proven. Open debt: free-tier 429 under rapid multi-sentence replies — pacing/retry in the worker is owed. Film voice (Job 4 Omni) is a separate, founder-locked entry in the Genome, untouched by this one.

### LGT — Lighting & atmosphere
- **MES-LGT-001 · Lighting as composition (lamp pools, dust, grade, vignette, contact shadows)** — **BUILT–UNVERIFIED** (Seat D; clock-driven lampGlow cycle).
- **MES-LGT-002 · Character light fusion** — **BUILT–UNVERIFIED, defect on record.** Critic D-11: Solnik reads larger and brighter than the room's light — an unlit figure on a lit film. Gemini's G-4 rubric point 1 is the test.
- **MES-LGT-003 · Dynamic lighting model / weather / day-night cycle** — **MISSING.** Light is painted, never computed; no weather exists.

### PER — Persistence & memory
- **MES-PER-001 · Solnik conversational memory with visitor isolation** — **VERIFIED.** Planted-secret test (ZEPHYR-4411) never revealed across sessions; permanent verification requirement #1.
- **MES-PER-002 · Visitor identity persistence (guest → named, local)** — **BUILT–UNVERIFIED** (prototype localStorage; avatar-system serialize()). See MES-SEC-002 for its restore-path defect.
- **MES-PER-003 · World-state persistence (places remember; citizen record)** — **DESIGNED.** Members service stands at zero; FVR-27 Citizenship Engine PROPOSED. Nothing built.
- **MES-PER-004 · The Day-Book (the town's public record)** — **DESIGNED, partially live** as pages; as an in-world mechanism, unbuilt. X-ref: FVR-15/FVR-25 · Migration Register §B.

### MAN — Manifestation & interactive objects
- **MES-MAN-001 · The Folded Paper state machine** — **BUILT–UNVERIFIED** as an engine (20/20 checks; illegal transitions throw); **VERIFIED at mechanism level** in the prototype journey (blind verification claims 1–2, 5).
- **MES-MAN-002 · Golden threads (leader line + tip dot per part)** — **BUILT–VERIFIED** in the prototype; carried into the engine + Seat D.
- **MES-MAN-003 · Purchasing-closed honesty in the mechanism** — **VERIFIED.** Closed renders ZERO buy nodes (engine test, all 3 products); an open fixture renders exactly one. The engine itself never sells.
- **MES-MAN-004 · DEFECT M-1 — example artifact paths broken on disk** — **BUILT–UNVERIFIED, defect open (critic fix list #2).** All three `products.example.json` artifact paths fail to resolve; same disease in `scenes.example.json` (W-6). Fix + filesystem-resolution test owed.
- **MES-MAN-005 · DEFECT D-10 — separated parts unreadable at panel size** — **defect open (critic fix list #5).** ≥ 4 of 8 part cards' text hidden behind neighbours in Seat D's frame; the separated state exists to be read.
- **MES-MAN-006 · Manifestation at catalogue scale (~800 products through one engine)** — **DESIGNED.** Proven for 2 real products; the other ~798 are data rows unwritten. Depends on MES-PIPE-002 + catalogue integrity (MES-ECO-004).
- **MES-MAN-007 · General object interaction (touch, move, use, combine)** — **MISSING.** Manifestation is the only interaction verb the world has.

### NAV — Navigation & guidance
- **MES-NAV-001 · Hash routing with sub-routes + history** — **VERIFIED at mechanism level** (prototype blind verification claim 7; Run #2 exam: standalone Back/Forward works).
- **MES-NAV-002 · Solnik as journey director** — **DESIGNED, UNPROVEN.** Architecture §8.7: converses, never yet directed a journey; mid-journey brain-failure behaviour untested (session O-3 owed).
- **MES-NAV-003 · In-world wayfinding (where am I, where can I go)** — **MISSING** as a system; doors glowing on approach (specimen pattern) is the only aid.

### REN — Rendering & optimization
- **MES-REN-001 · Layered painter renderer (z from engine math)** — **BUILT–VERIFIED at mechanism level** (wiring; anchor z exact 43/65/90 in the prototype's blind verification).
- **MES-REN-002 · DPR cap min(dpr, 2)** — **VERIFIED** (wiring exercise under emulated DSF 3 → backing ratio exactly 2; Run #2 exam in-run proof).
- **MES-REN-003 · Poster-first / lazy film loading** — **BUILT–UNVERIFIED.** Motion-off visitors fetch 0 video bytes; the ≤ 1.5 MB mobile budget vs two 1080p films on a motion-on stage is an open Factory decision (per-place mobile encodes).
- **MES-REN-004 · Asset streaming / texture & memory budgets** — **MISSING.** Decoded-memory + thermal legs were added to PIS-01 by ChatGPT's adjudication; nothing measures them yet.

### MOB — Mobile & browser
- **MES-MOB-001 · Touch discipline (touch-action: none, overscroll: none, tap = pointerdown)** — **VERIFIED in wiring** (computed styles + exercise); **defect open in the prototype** (stage drag can scroll/pull-to-refresh — blind-spots report №5, REAL).
- **MES-MOB-002 · Mobile manifestation scrubber + bottom card** — **VERIFIED at mechanism level** (prototype claim 2: exact "1 / 8"; Seat D 375 px "1 / 8" → "2 / 8").
- **MES-MOB-003 · Physical-device performance (the device legs)** — **MISSING — the house's most-owed examination.** 60 s / 5 min / 30 min on a real phone; two-body frame rate; thermal. Mobile acceptance HOLD (ChatGPT) until MES-CAM-002 is settled AND this entry runs.
- **MES-MOB-004 · Place-name badge truncation at 375 px (Run #2 specimen)** — **defect recorded** (165 px name in 140 px badge; deliberate truncate CSS, full name unreadable). Specimen-side; the house lesson (never let a label silently elide) is the entry.

### ACC — Accessibility
- **MES-ACC-001 · Reduced motion end-to-end** — **VERIFIED at mechanism level** (prototype claim 3: placement < 150 ms, figures byte-static; wiring: stage reads the query, propagates, freezes ambient).
- **MES-ACC-002 · Keyboard / ARIA navigation of the world** — **MISSING** (Run #4's spec includes it for a specimen; the house world has no standard).
- **MES-ACC-003 · Non-spatial alternative navigation** — **MISSING.** A visitor who cannot or will not walk has no other way through the civilization.
- **MES-ACC-004 · Captions for films** — **MISSING** as a system.

### SHR — Shared world
- **MES-SHR-001 · Presence (seeing another visitor)** — **MISSING.** Not designed at engine level.
- **MES-SHR-002 · Shared world state / citizen interaction** — **MISSING.** Community lives outside the world (Discords LIVE; Agora floor honestly empty). X-ref: FVR-04 · FVR-27 (PROPOSED).

### INT — Intelligence
- **MES-INT-001 · Solnik's brain (LLM behind deterministic fences)** — **VERIFIED as a service.** Isolation, price accuracy + purchasing-CLOSED, security boundaries — the three permanent verification requirements, service-side PASS 2026-11-25.
- **MES-INT-002 · The six controls, demonstrated in-page** — **BUILT–UNVERIFIED — verification owed.** Summon / Speak / Type / Mute / Dismiss / Disable, desktop + mobile, brain-up AND graceful failure. Never independently demonstrated end-to-end; the two-sided doctrine (healthy server ≠ functioning experience) makes this the entry that matters.
- **MES-INT-003 · Voice & personality engine (LVPE)** — **DESIGNED.** solnik-herald-v1 identity on file; live-voice deployment trigger was re-ruled by the founder (the Achird flip, MES-AUD-004); film voice locked.
- **MES-INT-004 · Brain latency debts** — **BUILT–UNVERIFIED, debts on record.** Barge-in ≈ 1,094 ms vs < 120–150 ms target; first-audio ~3.3 s (pre-flip measure, re-measure owed); typed-question-before-connect drop (client queue fix candidate named).

### SEC — Security & identity
- **MES-SEC-001 · The Gatehouse signed-broadcast sequence** — **BUILT–VERIFIED on paper + service live.** Lock → Sign → Persist → Broadcast → Verify; atomic reservation before signature; 32/32 × 2. Anchor UNFIRED; Pages v6 filed-not-live; Attempt #6 gated (ChatGPT Addendum #2 re-judgment · Gemini's 3 conditions · NC-1 approval · founder's click).
- **MES-SEC-002 · DEFECT A-1 — identity restore bypass** — **defect open, HIGH (critic fix list #1).** `createIdentity` restore path re-fences only guests: a citizen/named identity can be restored without name or grant. The live transition path is correctly fenced; the persistence door is not. Fix + the two failing restore cases as tests.
- **MES-SEC-003 · Solnik's security boundaries** — **VERIFIED** (never requests recovery phrases/keys/credentials; never initiates transactions — deterministic, before the LLM).

### ECO — Commerce & economics
- **MES-ECO-001 · Commerce underneath (the till never obstructs, the world never hard-sells)** — **DESIGNED + partially live** (live listings with purchasing CLOSED by build; PROVADIA20 proven live on the store side).
- **MES-ECO-002 · The Pulse (real market data, no fabrication)** — **VERIFIED — LIVE.**
- **MES-ECO-003 · The trust-instrument family (SALT · Promise Machine · Brick Lock · Fee Card · Covenant · Liveness Layer · Three Vaults)** — **DESIGNED.** Migration Register §B; one member built (MES-SEC-001). X-ref: FVR-11 → FVR-23.
- **MES-ECO-004 · Catalogue data integrity** — **defect open.** 35 vs 36 listing-file variance unreconciled; ASSET_LIBRARY.md stale against disk; Register v0.2 (recount + reconciliation) owed. Manifestation at scale (MES-MAN-006) cannot be honest until this closes.

### PIPE — Pipelines & manufacturing
- **MES-PIPE-001 · The Relay Law as a production pipeline** — **VERIFIED in operation.** Builder → improver → different-family critic → blind verifier; rejected findings kept on record (WAVE1 critic R-1/R-2/R-3; wiring verifier's corrected arithmetic). Tonight's two verification reports are its products.
- **MES-PIPE-002 · Cinematic manufacturing (the journey method: ~30 credits per place, once)** — **BUILT–UNVERIFIED as a method.** Jobs 1–5 manufactured + examined; phase-offset crossfade + master clock per Gemini #120 (BLESSED WITH CHANGES). Jobs 6–10 HELD under the mass-production hold — the method is not yet *proven* at the standard ChatGPT's spec-first law requires.
- **MES-PIPE-003 · Manufacturing automation** — **RESEARCH.** No headless/CLI generation exists on our accounts (Gemini #123); Rung 2 = the founder's hands; ~90% of post-production automatable locally. Timed production trial owed before any automation percentage is claimed (ChatGPT correction 4).
- **MES-PIPE-004 · Generator-Neutral adoption discipline** — **VERIFIED in operation.** Specimen mechanisms re-implemented in house terms (geometry from Run #1; schema pattern from Run #2); generated code never pasted; provenance recorded.
- **MES-PIPE-005 · Credit burn-down discipline (Dec 23 forfeiture)** — **DESIGNED (allocation locked).** Gemini Q1 ruling: both accounts forfeit unused credits Dec 23, zero rollover. Account 2 → 0 first; Veo 3.1 Fast maximized before the Dec 5 retirement; Account 1 down before Dec 23 10:21 AM. Execution is a production program, tracked in the ledger.

### TST — Testing & verification
- **MES-TST-001 · Node test suites (engine families)** — **BUILT–UNVERIFIED as a system.** 65 + 62 + 13 + 20 + 171 checks green at last full pass; the critic's re-run found assertion gaps exactly where house laws bite (see MES-TST-003).
- **MES-TST-002 · Blind verification as a standing seat** — **VERIFIED in operation.** Prototype 9/9; wiring mechanism-level verdict with two defects convicted that three prior seats missed.
- **MES-TST-003 · The Wave-1 critic's 12-item fix list** — **UNDER CONSTRUCTION (the list is the work order).** ① fence identity restore (= MES-SEC-002) ② data paths + resolution test (= MES-MAN-004) ③ geometry in host locomotion — **answered by Seat F** for the wiring host; Seat D's host still walks through its table ④ validator w/h on solid anchors ⑤ readable separated parts (= MES-MAN-005) ⑥ touch discipline in hosts (= MES-MOB-001) ⑦ REASSEMBLING doc/code reconciliation ⑧ destroy() on rebuild + test ⑨ scene.ambient validate-or-remove ⑩ "no corrective seeks" wording corrected (Seat D's armSwap performs a counted hard-cut seek) ⑪ test-gap sweep ⑫ visual defects carried as KNOWN DEFECTS blocking any cinematic-quality PASS. The Wave-1 blind verifier runs only after this list.
- **MES-TST-004 · PIS-01 — the Immersion Standard (15 disciplines / 100 pts)** — **DESIGNED, ratified as active gate v1.** Platinum-Pristine ≥ 95 + no critical failures + ≥ 20 unprimed visitors; never self-awarded. Mint specimen: Level 3 HIGH-END provisional (7 PASS · 3 FAIL · 5 UNVERIFIED, no score invented).
- **MES-TST-005 · The FVR-31 Acceptance Examination** — **DESIGNED.** Physical-device performance · spatial interaction · character animation · visitor agency · product interchangeability · continuous environmental life (ChatGPT adjudication, adopted).
- **MES-TST-006 · Solnik permanent verification requirements** — **VERIFIED as standing law, partially executed.** Memory isolation ✓ · knowledge accuracy ✓ (service-side) · security boundaries ✓ · in-page demonstration ✗ (= MES-INT-002).

### PRS — Preservation
- **MES-PRS-001 · Backup + demonstrated restoration (FVR-31 scope)** — **VERIFIED.** Archive sha256-matched after a Drive round-trip; 84/84 per-file hashes identical on restore (hash-level; no code executed from the restore).
- **MES-PRS-002 · Full build-tree preservation (19,300 files)** — **BUILT–UNVERIFIED.** Local bundle exists (sha on record, HEAD 364f566); the git push path is NOT wired (no origin) and the Drive bundle refresh is owed. An earlier full restoration test (18,882 files, engine hash-identical) passed 2026-11-25 — the *current* tree is ahead of the last proven restore.

## 6. HOW THIS REGISTER LIVES
- New mechanisms enter from three doors only: the Captain's audits, Gemini's research reports, ChatGPT's reconciliation — each entry citing its source.
- A state rises only on named evidence; a state falls the moment a defect is proven (D-V1/D-V2 and A-1 entered this register *below* their builders' claims, on the verifier's and critic's evidence).
- The weekly Archive Sweep reconciles this register against the FVR and the Master Universe Map; founded-but-missing mechanisms must be NAMED, never silently absent (Archive Sweep Law).
- v0.1 count (machine-counted from the entries themselves, 2026-11-26): **94 seed entries** — VERIFIED 31 (incl. mechanism-level verifications) · BUILT–UNVERIFIED 24 (4 of them carrying a named open defect as their lead fact) · UNDER CONSTRUCTION 3 · DESIGNED 15 · MISSING 19 · NOT APPLICABLE 1 · RESEARCH 1. The count is expected to grow by an order of magnitude when Gemini's #125 lands; growth is the register working, not failing.

*— Founded by the Captain's audit seat, 2026-11-26. The founder judges last.*

# SEAT F — THE WIRING · BLIND VERIFICATION

**Seat:** Relay Law blind verifier (did not build Seat F; did not read the builder's reasoning beyond the shipped README/exercise claims under test).
**Build under test:** `living-universe/construction/wiring/` (locomotion.js · renderer.js · stage.js · demo), consuming `world-engine/` (incl. geometry.js) and `avatar-system/`.
**Method:** the builder's `exercise.cjs` was **not** re-run as evidence. All evidence below comes from the verifier's own probes: fresh headless-Chromium (puppeteer) sessions, a purpose-written static server, the verifier's own listener/rAF/timer instrumentation injected before any page script, an in-page position sampler running at ~10 ms on a raw (uninstrumented) timer, and — for claim 4 — the verifier's own scene data booted on the real stage. Probe sources: `/tmp/wiring-probe/` (server.cjs · probe-lib.cjs · probe-claims-1-2.cjs · probe-claims-3-6.cjs · probe-claim-5.cjs · probe-claim-5b.cjs · probe-claim-4.cjs · probe-claim-7.cjs · public/corridor.*); raw results in `/tmp/wiring-probe/results/`.
**Zero page errors / console errors in every session below.**

Desk obstacle as built by `obstaclesFromScene` (read from the live stage): desk rect **minX −0.32, maxX 0.40, minZ 0.46, maxZ 0.64** (scene x 52 %, w 36 %, depth 0.55, thickness 0.18). Body radius 0.042; near face + radius = **z 0.682**.

---

## Claim 1 — Routing behind the desk · **CONFIRMED**

Real pointer path: visitor placed at scene (30, 0.88) → world (−0.40, 0.88); a genuine mouse click was dispatched on the canvas at the screen point the layered mapper assigns to scene (52, 0.30) → world (0.04, 0.30), behind the desk. Validity check: the straight segment start→target **does** cross the desk's interior (independently computed), so a collision-free arrival is impossible without a detour.

- **308 position samples** over the 3.11 s walk; **0 samples inside the desk** (strict interior).
- Minimum clearance of the body centre to the desk rect over the whole walk: **0.042** — exactly the body radius; the body rode the padded face and never came closer.
- Arrival: final position (0.0086, 0.3101) vs clicked (0.04, 0.30) — **error 0.033** world units (inside the 0.05 tolerance; consistent with the locomotion's 0.035 waypoint epsilon).

## Claim 2 — Diagonal sliding · **CONFIRMED**

Visitor placed at world (−0.60, 0.90); `slideDrive` (the un-routed direct drive) aimed at (0.60, 0.50), a line that meets the desk's near face diagonally.

- **458 samples; 0 inside the desk** at any instant — no tunnelling.
- **152 contact samples** with z ∈ **[0.6811, 0.6935]** against the expected ride line z = 0.682 (face 0.64 + radius 0.042), while x advanced **0.389** along the face within the desk's x-span — the body slid, it did not snag or stop.
- The drive **arrived**: final position (0.5768, 0.5231), distance to the drive target **0.0327**, locomotion idle — termination by arrival after rounding the corner, not by the stall backstop.

## Claim 3 — Doors both ways + census · **CONFIRMED**

Library → street → library via `takeDoor`, census read before, between, and after with the verifier's own instrumentation (window listeners by type, pending rAF, pending timeouts/intervals) plus the stage's own ledger:

| | S0 baseline (library) | S1 after → street | S2 after → library |
|---|---|---|---|
| window listeners | resize 1, hashchange 1 (total 2) | identical | identical |
| document listeners | 0 | 0 | 0 |
| pending rAF | 1 | 1 | 1 |
| pending timeouts / intervals | 0 / 0 | 0 / 0 | 0 / 0 |
| stage ledger | pointerdown 1, resize 1, mediaChange 1 | identical | identical |
| location.hash | `#/library` | `#/street` | `#/library` |

The matched stop · unbindHash · bindHash · start pairs balance exactly; the single pending rAF is the engine's master loop, as designed (the stage owns none).

## Claim 4 — Multi-obstacle corridor + narrow passage (ChatGPT stress) · **NEEDS-CHECK**

Verifier's own scene data (explicit obstacle rects; decorative anchors authored non-solid, obstacle set read back from the live stage and confirmed to be exactly the four authored rects). Walker diameter 0.084.

**Wide leg (gap 0.13, offset approach blocker) — CONFIRMED.** Route (0, 0.92) → (0, 0.12) past blocker C (−0.20…0.05 × 0.68…0.80), through the 0.13 gap in the wall band (z 0.42…0.58), past pillar D. The computed route's own waypoints show the weave: (0.1025, 0.8525) → (0.1025, 0.6275) → (0.0125, 0.6325) → (0, 0.12). **318 samples: 0 inside any of the four obstacles**; 58 samples inside the gap column within the band (it threaded the passage, the only way through — both walls reach the floor edges); minimum clearance to the gap faces while in the band **0.0422**; arrival error **0.0344**; settled in 3.23 s.

**Narrow leg (gap 0.06 < diameter 0.084) — REJECTED as specified.** The stress order requires the route to fail cleanly (null / settle). It did neither:

- `goToWorld` returned a **3-waypoint route** — (−1.0525, 0.6325) → (−1.0525, 0.3675) → (0, 0.15) — i.e. **around the west end of the walls at x = −1.0525, outside the floor bounds** (minX −1). The visitor followed it off the floor: displacement 0.746 from start within 2.5 s and still walking (busy) when sampling stopped.
- Root cause, read in the code: `route()` applies `opts.bounds` only inside `resolvePoint` for the two endpoints; the visibility-graph corner nodes are never bounds-checked, and the per-frame `collideWalker` applies no bounds clamp at all. A padded corner of an edge-touching rect legitimately lands at x = −1 − 0.042 − 0.0105, and nothing anywhere treats the floor's edge as a wall.
- What did **not** happen: the walker never squeezed the gap and never entered either wall — 0 inside samples in every leg. A follow-up direct `driveToWorld` at the same gap settled at the near face: min z reached **0.622** (= 0.58 + radius), min clearance 0.042, never crossed to the far side, idle at the end. The no-squeeze property holds; the clean-failure property does not.

Exposure note: in the shipped demo scenes no obstacle touches a floor edge, so this is **latent** there. It is live for any future scene whose walls meet the floor edge — which is to say, an ordinary room. **Defect D-V1 (carried open): routes may leave the floor bounds around edge-touching obstacles instead of failing clean.**

## Claim 5 — Moving inhabitants (ChatGPT stress) · **NEEDS-CHECK**

Library, all three inhabitants live (clerk strolling 22↔48 at d 0.4, reader standing at 68 / d 0.5, apprentice crossing at d 0.68). The visitor ran 10 routed crossings of the d 0.68 lane, (−0.70, 0.68) ↔ (0.74, 0.68), while the apprentice crossed the same lane. 4,578 samples of every body at ~10 ms:

- **10/10 crossings completed**, durations 4.60–4.77 s each; no visitor route stuck.
- **0 NaN positions** in any body (visitor, Solnik, all inhabitants).
- **0 samples inside furniture for the visitor AND 0 for the population** — the builder's "population gets the same per-frame resolve" claim is **CONFIRMED** against furniture.
- Body-to-body behaviour, honestly: **there is none.** Minimum visitor↔inhabitant distance over the run: **0.0026** world units — near-perfect overlap. 336 samples with centres closer than two radii (0.084); 78 samples closer than 0.02. Bodies pass through each other like ghosts. This **confirms the builder's stated model** (resolve-only, no body-to-body) — it is a behaviour fact for the captain and ChatGPT to judge as a world-feel question, not a hidden defect.
- **Stuck leg — REJECTED.** One inhabitant is pinned indefinitely. The reader's authored stand point, scene (68, 0.5) → world (0.36, 0.50), lies **inside the desk's footprint** (−0.32…0.40 × 0.46…0.64). A focused 12 s run (1,134 samples) shows him at scene x = 68, d = **0.418** — the desk's far face minus radius (0.46 − 0.042) — **constant to the sampled digit**, target never changed from (68, 0.5), `moving` true in **100%** of samples: every frame his walker steps toward the unreachable target and `collideWalker` resolves him back to the face. His stand/drift cycle never starts (it requires `!moving`). He was in this state for the entire 49 s crossing run as well (max static-while-moving run 45.77 s — the whole observation). The visitor's locomotion has a progress/stall backstop; **population drivers have none. Defect D-V2 (carried open): a population body whose authored target lies inside furniture pins forever at the nearest face.** Cosmetic in this demo (he reads as standing at the desk), a real mechanism gap under the stress order's "no walker stuck > 5 s".

## Claim 6 — Traversal endurance, 25 crossings (ChatGPT stress) · **CONFIRMED**

25 consecutive door crossings (library ↔ street), visitor re-placed near each door. **25/25 traversals succeeded** (0.52–0.66 s each). Census at crossings 5, 10, 15, 20, 25 — **identical to baseline on every axis**: window listeners {resize 1, hashchange 1}, pending rAF 1, timeouts 0, intervals 0, stage ledger {pointerdown 1, resize 1, mediaChange 1}, hash alternating correctly. **No cumulative leak of any kind.**

## Claim 7 — The 860 px stage floor at 375 px (rule ⑦ FLAG) · **FLAG CONFIRMED — one of its figures REJECTED**

Measured against the real `DEFAULT_PROJECTOR` the demo exposes, in a live 375×812 (DSF 2, mobile) page — binary-searching `project()` for the visible world half-width at each depth, not re-deriving the formula:

- `stageW(375)` = **860** ✓.
- Near floor (z = 1): visible |x| ≤ **0.4075** — the builder's 0.408 and "outer ~59 % on each side off-screen" **CONFIRMED**. The world edge (x = 1) projects to screen x 647.6 px on a 375 px viewport.
- Far floor (z = 0): visible |x| ≤ **0.6813** — the exercise/README figure of **1.014 ("the whole width fits") is REFUTED**. The world edge projects to 462.7 px — off-screen by 87.7 px; the far floor is also cropped, ~32 % per side. The exercise's arithmetic used the half-width coefficients swapped (0.215 + 0.32t) against the shipped code's (0.32 + 0.215t); the two agree only at t = 1, which is why the headline survived and the far figure didn't. **The FLAG is real and understated: the projection crops at every depth on a 375 px phone, worst at the near edge.**
- Which path it binds: **only the depth-projected renderer path** (geometry.js `createProjection` / `projectInScene` consumers). The wiring stage's layered renderer never calls `project()` for staging (renderer.js imports only `scenePointToWorld`), and measured at the same viewport it maps the full scene width onto the canvas (canvas clientWidth 357 px after page margins; scene x 0 → 0 px, x 100 → 357 px; a visitor placed at scene x 97 renders at 346.3 px, inside the canvas). **"Layered renderer unaffected" CONFIRMED.** A projected renderer on phones needs camera follow — the FLAG's recommendation stands, strengthened.

---

## Verdict summary

| # | Claim | Grade |
|---|---|---|
| 1 | Routing around the desk, arrival at the clicked point | **CONFIRMED** |
| 2 | Diagonal slide along the face, no tunnelling, arrival | **CONFIRMED** |
| 3 | Doors both ways, census identical before/between/after | **CONFIRMED** |
| 4 | Multi-obstacle corridor; narrow passage fails clean | **NEEDS-CHECK** — wide leg CONFIRMED; narrow leg **REJECTED** as specified (off-bounds detour instead of null; defect D-V1) |
| 5 | Moving inhabitants: no NaN, no stuck, honest body-to-body | **NEEDS-CHECK** — crossings/NaN/furniture-resolve CONFIRMED; body-to-body = pass-through CONFIRMED as the actual (stated) behaviour; stuck leg **REJECTED** (reader pinned; defect D-V2) |
| 6 | 25-crossing endurance, no census drift | **CONFIRMED** |
| 7 | Rule-⑦ FLAG on the 860 px stage floor | **CONFIRMED as a FLAG** — near figure exact; far figure **REJECTED** (0.681 measured vs 1.014 claimed); binds the projected path only |

**Status earned: VERIFIED AT MECHANISM LEVEL** for the wiring's core mechanisms — routed walking, sliding collision, door traversal with balanced lifecycle, endurance, and the layered renderer's mobile framing — independently reproduced with the verifier's own instruments and numbers, several of them (308/458/4,578 samples, 25 crossings) beyond the builder's own exercise.

**Carried open, blocking any stronger claim:** **D-V1** (routes can leave the floor bounds around edge-touching obstacles — a sealed-by-edge passage routes off-stage instead of failing clean) and **D-V2** (population bodies have no stall backstop — an authored target inside furniture pins the body at the face forever). Neither defect falsifies a core claim in the shipped demo's interior-obstacle scenes; both are live for arbitrary scene data and belong on the fix list before the engines are treated as general-purpose.

**Not in this seat's scope, still owed:** motion *feel* and physical-device performance (cloud-browser motion law) — **the founder's physical-device session remains the graduation gate**; visual/cinematic grade; Seat D's host composition (a separate build, not re-tested here); the builder's DPR / reduced-motion / touch legs (not among the claims assigned to this seat).

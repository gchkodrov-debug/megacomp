# SEAT J — RELAY CRITIC REPORT · The Composed World (FVR-31)

**Seat:** Relay critic (criticize only — no code changed, $0 spent)
**Subject:** `living-universe/construction/composed-world/` — builder's log `SEATJ_COMPOSED_WORLD_LOG_2026-11-26.md` read as CLAIMS
**Method:** two-axis independent review. All builder suites re-run by the critic's own hand in a scratch mirror (the real tree untouched); eight adversarial probes written and run by the critic (frame budget, input, light/sound, occlusion, pair-resolve, mobile, reduced motion). Probe scripts + raw outputs: `~/workspace/seatj-critic/`.
**Date:** 2026-11-26

---

## Verdict in one paragraph

The composition is real: all five systems run simultaneously inside one frame budget on desktop and at 375×812, occlusion is pixel-exact for every occluder class and both bodies, cue pan follows the camera projection sample-for-sample, mute is total, and no shared module moved. Two findings block: **Solnik cannot follow the visitor across the room's own desk** — he pins silently and permanently against its north face — and **the conversation's third beat is unreadable at portrait**, because speech bubbles are never clamped and the desk-clerk's line renders entirely off-frame. The pair floor the builder measured (0.084) is a scenario outcome, not a code invariant: the host's own sampler recorded 0.020 under a desk-gap pin. The manifested product and the resting paper do not join the one light the seven bodies share.

---

## Per-proof verdicts

| # | Proof (builder's claim) | Critic verdict |
|---|---|---|
| 1 | Visitor walks freely | **PROVEN** — exercise re-run 36/36 by critic; tap unprojection exact (err 0.000) idle and mid-flight at portrait; visitor never penetrated furniture in any attack (0 frames at 60 Hz across probes 4/4b); sealed-target failure announced visibly (exercise). |
| 2 | Solnik accompanies | **PROVEN as exercised — BROKEN as a general claim.** Holds on open-floor routes (head-on drives, pocket push, desk-edge shuttle all clean). **Broken for north↔south crossings of the desk**: Solnik pins at the desk's north face indefinitely (Finding B-1). |
| 3 | Inhabitants mid-phase at frame 1 | **PROVEN** — exercise re-run by critic asserts it; live behaviour in every probe consistent (crowd mid-motion, phases spread from boot). Scope honesty noted: only the archivist owns a multi-step chain (builder's own log admits this). |
| 4 | Camera directs | **PROVEN with a measurement caveat** — portrait flight measured directly (centre x 0.154→0.846 under waypoints; lead present); on desktop, cover framing pins centre x at 0.500 geometrically, so desktop "flight" is lead/sway only — the flight evidence is the portrait run. Coverage figures 97.2% / 79.9% are **NEEDS-CHECK** (Finding N-3): not reproducible as stated; the underlying capability measures stronger than claimed. |
| 5 | Alive during conversation AND manifestation | **PROVEN for aliveness/simultaneity** — crowd clock advanced at full wall rate through every conversation beat and every manifestation state on both viewports (probe 1 samples); conversation does not block walking input (probe 1b). **Qualified on mobile**: the conversation itself is not fully readable at portrait (Finding B-2). |

---

## BLOCKING findings

### B-1 · CONFIRMED — Solnik pins permanently against the desk; accompaniment breaks on the room's most ordinary crossing
- **Attack (probes 4/4b-C):** visitor placed west (30, 0.35), Solnik settled beside him at (38.2, 0.321); visitor tapped to (30, 0.80) — a straight north→south crossing of the room. The visitor arrived in ~1.5 s. Solnik walked to depth **0.418 — exactly the desk's north face (0.46) minus his body radius (0.042)** — and stayed there for the full **20 s** observation, `moving: true` the entire time, pair distance stuck at **0.385** world units (follow band ≈ 0.17). A 20-point z-trace is flat at 0.418 from second 1 to second 20.
- **Why it never resolves:** the companion follows a straight line to visitor+offset; the follow target's x (38.2) lies inside the desk's span (scene x 34–70, z 0.46–0.64), the approach is head-on, and collision stops him at the face with no tangential slide and no re-route. The guest's own locomotion routes around the same desk — the companion has no equivalent. Geometry says the pin is indefinite, not slow.
- **Silence:** the pin produces no failure event and no announcement; he presses against the furniture forever, "moving," while the guest waits on the far side. Any visitor who walks across the room — the most ordinary movement in the Library — loses Solnik.
- **Severity:** blocking for Proof 2's claim as stated ("Solnik accompanies"). The proof as exercised by the builder (routes that do not cross the desk) stands.

### B-2 · CONFIRMED — Speech bubbles are never clamped; conversation beat 3 is entirely off-frame at portrait
- **Mechanism (code):** `_positionOverlays` sets the bubble's `left/top` from the speaker's projected head position with no viewport clamp; CSS centres the bubble on that anchor (`translate(-50%,-100%)`, max-width 72vw at portrait).
- **Measured (probe 5c, 375×812):**
  - Visitor east (88, 0.82): beat 0 (Solnik) clipped **11.3 px** off the left edge; beat 2 (desk-clerk, "The Day-Book is open for ins…") bubble at **left −476.6 / right −225.9 — entirely off-frame**, invisible for its whole beat.
  - Visitor west (10, 0.82): beat 2 at **left 444.4 / right 533.8 — entirely off-frame** to the right.
  - Visitor centre (50, 0.60): beat 2 clipped **57 px**.
- Beat 2 is off-frame from **every** tested portrait position, because at portrait the camera window (view ≈ 0.31 of the plate) rarely contains the mid-room clerk while the conversation runs wherever the visitor stands. The builder's log noted desktop "edge-hugging"; at portrait it is the loss of one of the conversation's three lines. The whisper pill shares the same unclamped placement code.
- **Severity:** blocking for the composed world's mobile completeness; Proof 5's desktop form is unaffected.

---

## NON-BLOCKING findings

### N-1 · CONFIRMED — The pair floor (0.084) is not post-collision guaranteed; the host's own sampler recorded 0.020
- Tick order in `composed.js`: `_resolvePair()` runs **before** `collideWalker(solnik)`. When the resolve pushes Solnik into a furniture radius, collision pushes him back — toward the guest — and the frame is sampled after both.
- Measured: with Solnik placed in the desk's north gap and the guest shuttling along the face, the host's every-frame `minDist.solnik` recorded **0.0200** (twice, reproducible: 0.02007 / 0.02005 across runs). In open play along the desk's south face, **0.08370** vs the 0.084 floor.
- Balance: under naturalistic attack recorded at 60 Hz in-page (5 head-on drives, desk-edge shuttle, pocket push — 725+ samples), the floor held **exactly** (min 0.084, zero frames below, zero furniture penetration by either body, centre or radius-expanded). Solnik also recovered gracefully from every non-desk trap, sliding out sideways and re-settling. This is a one-line ordering defect, not a behaviour failure — but "closest approach 0.084" should not be quoted as an invariant until the resolve runs after collision.

### N-2 · CONFIRMED — The manifested product and the resting paper do not join the one light
- The one-light claim is **true for the seven bodies**: independently re-measured at two lamp phases — every body entry in the draw list carries the frame's identical shade/shadow (0.144/0.270, then 0.123/0.237 as the light moved). Anchor furniture shares only the ground-shadow opacity; anchor surfaces take no shade.
- The **manifested artifact** is a DOM image with a fixed CSS `drop-shadow(0 16px 26px rgba(0,0,0,.55))`: measured identical at two phases while the host light moved shade 0.084→0.053 and glow 0.081→0.044. The product — the centrepiece of the composition — sits on its own lighting island inside the panel.
- The **paper at rest** carries `shade: null, shadowOpacity: null` in the draw list, and `_drawPaper` never consumes the light object (fixed colours; its ring breathes on the sparkle cycle, not the lamp). Same class, smaller stage.

### N-3 · NEEDS-CHECK — Portrait coverage figures (97.2% overall / 79.9% weakest corner) are not reproducible as stated
- The numbers depend on a definition the log does not publish. Critic's measures at 375×812: a 9-position camera grid gives **90.0%** of floor points visible from ≥1 position; a dense 100-position grid gives **100%** — every one of 1,600 floor points visible from at least 20 camera positions, and self-coverage (visitor standing on the point) is 100%. The weakest points are the NW strip (x≈1.3), visible from 20% of positions — the corner weakness is real in spirit.
- Verdict: capability proven **at or above** the claim; the printed figures need their grid/region definition published beside them, or replacement by the dense-grid result.

### N-4 · CONFIRMED — Z-quantization band at anchor planes (sub-1% of depth)
- Bodies draw at z = 20+round(d·80); the desk's fixed z (65) corresponds to body depth ≥ 0.55625, while its world plane is 0.55. Bodies at d ∈ (0.550, 0.556) are world-in-front of the desk yet draw behind it. Measured live: 1 sample in 39 during a desk crossing (Solnik d 0.5523 drawn behind the desk while overlapping it on screen). Same class at the shelf (~0.001 band) and lamp (~0.009 band). Cosmetic at these widths; the fix is to derive anchor z with the same rounding as body z.

### N-5 · CONFIRMED — The open manifestation panel takes pointer input over ~51% of the desktop canvas
- Panel rect measured 200–1080 × 177–710 of a 1280×720 stage (880×533). A real mouse click at a floor point under the panel (52, 0.62) produced **no** tap; clicks outside the panel during conversation+manifestation registered exactly and the walk started (probe 1b). The world stays alive behind the panel; the covered floor is simply not tappable while the Mint is open. A composition trade-off the founder should see stated, not a proof failure.

### N-6 · CONFIRMED — Reduced-motion camera policy is inconsistent: the guest cuts, the camera glides
- Under RM (probe 5/5b): crowd frozen (in the composed host the crowd clock holds at 0), inhabitant phases frozen, camera sway **exactly {0,0}**, manifestation jumps (FOLDED→MATERIALIZED in ~17 ms; Separate instant), and a tap **places** the guest instantly (first 120 ms sample already at target). But the camera still spring-glides to the new framing (centre x 0.334→0.736 measured over the transit). Whether an RM visitor should also get a camera cut is a policy call — flagged for the founder, with the measurement attached.

### N-7 · CONFIRMED (recorded for exactness) — One 50 ms long task in the desktop full-load window; no cliff
- Full load, desktop: 59.0 fps, p95 frame 16.8 ms, p99 33.3 ms, 1.3% of frames >25 ms, 0.3% >50 ms, max 66.6 ms, exactly **one** long task (50 ms) in 12 s. Mobile full load was cleaner: 59.9 fps, p99 16.8 ms, max 33.4 ms, zero long tasks. Host render cost p95 0.8 ms both viewports. There is no dropped-frame cliff and no system starves another (crowd clock advanced at full wall rate in every load sample) — the frame-budget claim stands; the single hitch is recorded so the claim stays exact.

---

## REJECTED suspicions (kept on record)

- **R-1 · Room-tone loop click — REJECTED on measurement.** The 2 s tone buffer's wrap jump is 0.0643, which sits **at the p99 of the buffer's own step distribution** (median step 0.0316) — after the 420 Hz lowpass, the seam is not distinguishable from the noise's own texture in the measured instance. (The generator carries no wrap guarantee by design; a crossfade would make it free forever — fix list #8, optional.)
- **R-2 · Strobe anywhere in the composed scene — REJECTED.** Non-RM consecutive-frame diffs are smooth and continuous (mean |Δ| 0.514, max 1.153, no spikes, world verified ticking during the sweep); under RM the scene is frozen. The Wave-2 strobe class does not appear in this host.
- **R-3 · Split-depth tell (Solnik drawn in front of an occluder the visitor is behind) — REJECTED.** Draw order is per-body depth-true. Straddles occurred during crossings (7 lamp-plane, 2 near-plane samples) but Solnik's sprite never overlapped the occluder during a straddle; the desk draw-order/depth invariant held in 38 of 39 samples (the one exception is the quantization band, N-4).
- **R-4 · Manifestation starves the crowd / conversation blocks walking — REJECTED.** Crowd clock advanced ≈0.5 s per 0.5 s of wall time in every load sample through UNROLLING→MATERIALIZED→SEPARATED with a conversation open; a real click during conversation+manifestation started a walk while both continued (probe 1b).
- **R-5 · Mute leaks — REJECTED.** Master gain measured exactly 0 while muted; three cues fired while muted started **zero** oscillator/buffer nodes; unmuting restored cues immediately.
- **R-6 · Tap offset under sway at portrait — REJECTED.** Every on-screen tap target (desk edge, the paper, west-mid, one mid-flight tap) unprojected with error 0.000 in x and d. Off-screen targets are a coverage matter, not accuracy.
- **R-7 · Occlusion failure, any class — REJECTED (the claim survives the hardest test).** Controlled renders (absent / behind / front under one fixed camera): for shelf, desk, lamp-stand, mid and near layers × visitor and Solnik, the behind-pixel equals the body-absent baseline with distance **0.0** in all 10 cases, the front-pixel differs strongly, and draw order flips correctly every time.

---

## Regression + boundary (attack area 8)

- **Full battery re-run by the critic** (scratch mirror, real tree untouched): node suites world-engine **81/81** · geometry **75/75** · avatar **17/17** · manifestation **24/24** · camera **68/68** · crowd **14/14**; browser exercises camera **11/11** · crowd **12/12** · wiring **22/22** · cinematic-library exit 0 with zero page errors; **composed-world host exercise re-run: 36/36, exit 0.**
- **Boundary:** every shared-module **source** file's mtime sits inside the Wave-2 fix window (newest: `wiring/locomotion.js`, `crowd-life/crowd.js`, 07:35 UTC 2026-11-26). After that window, the only files touched in shared directories are exercise frame-capture PNGs (regenerated screenshots, including by the critic's own re-runs). Only `composed-world/` carries Seat-J-window source times. **The builder's "no shared module changed" claim is CONFIRMED.**
- Soundscape detail for the record: cue pan equalled the camera-projection prediction at **every** sample, including mid-flight at portrait (pan swept 1 → 0.84 → 0.551 → 0.295 → 0.041 as the camera travelled); gain tracked visitor distance (0.972 / 0.618 / 0.415 in the three placements); a real recorded cue matched its computed pan/gain exactly.

---

## Numbered fix list

1. **Give the companion a way around furniture** — route like the guest's locomotion, or detect the press (moving with no progress) and sidestep to the desk's end; until then, at minimum surface the pin (announcer) instead of pressing silently forever. *(B-1)*
2. **Clamp the speech and whisper overlays into the viewport** — or edge-pin the bubble with a direction tail when its speaker is off-frame. Beat 2 must be readable at portrait from any visitor position. *(B-2)*
3. **Re-run `_resolvePair()` after `collideWalker`** (resolve → collide → resolve) so the pair floor is true in the frame the host itself samples. *(N-1)*
4. **Bring the product and the paper into the one light** — drive the artifact's shadow/filter and the paper's shade/shadow from the frame's light object; or scope the one-light claim to bodies in the log. *(N-2)*
5. **Derive anchor z with the same rounding as body z**, closing the sub-1% bands at the shelf/desk/lamp planes. *(N-4)*
6. **Publish the coverage definition** beside the 97.2% / 79.9% figures (camera grid + region definition), or replace them with the dense-grid result. *(N-3)*
7. **Decide and record two composition policies**: RM camera (cut vs the measured glide) and the open panel's input footprint (~51% of the desktop stage). *(N-5, N-6)*
8. **Optional hardening:** crossfade the room-tone loop wrap — inaudible in the measured instance, free to guarantee. *(R-1)*

## What the critic did not do
No code was changed. No live deployment was touched (all runs in a scratch mirror). Mobile verification is at 375×812 only, per the brief; the other house widths (320/390/430) were not re-run. The settle-time question (cinematic ~762 ms vs brisk ~391 ms) remains the founder's device call, untouched by this report.

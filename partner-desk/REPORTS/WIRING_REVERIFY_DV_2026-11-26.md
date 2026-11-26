# SEAT F — THE WIRING · BLIND RE-VERIFICATION OF D-V1 + D-V2 (CLAIMS 4 + 5 ONLY)

**Seat:** Relay Law blind re-verifier (fresh seat: did not build Seat F, did not
run the first verification, did not write the fix). Both prior documents were
read and trusted neither — every number below is from this seat's own probes.
**Build under test:** `living-universe/construction/wiring/` +
`world-engine/geometry.js` in their post-fix state.
**Method:** the fix seat's probes were **not** re-run. This seat wrote its own:
a Node battery importing the shipped `geometry.js` with independent
segment/obstacle math (dense sampling at ≤ 0.0025 steps against obstacles
expanded by radius − 1e-4 — not geometry's own `segmentCrossesObstacle`);
fresh headless-Chromium (puppeteer) sessions against the shipped stage served
by this seat's own static server; the corridor scenes are this seat's own
scene data injected at the demo's scenes fetch; the D-V2 legs ran on the
**shipped library, unmodified**. All timestamps are in-page
`performance.now()` deltas. **Zero page errors / console errors in every
session.** Probe sources: `/tmp/reverify/` (battery.mjs · probe-dv1.cjs ·
probe-dv2.cjs · server.cjs).

---

## D-V1 — routes escaping the floor bounds on a too-narrow gap · **CLOSED**

Scene conditions rebuilt from the first verifier's numbers: wall band
z 0.42…0.58 reaching **both floor edges**, gap **0.06 < walker diameter
0.084**, start (0, 0.92) → target (0, 0.15), radius 0.042, bounds ±1 × 0…1.
Faithfulness of the reconstruction is pinned by a control run: with bounds
withheld, the shipped `route()` still returns the first verifier's exact
defect path — **(−1.0525, 0.6325) → (−1.0525, 0.3675) → (0, 0.15)** — so the
scene is the verifier's scene, and the bounds discipline is precisely what
now stands between it and the floor's edge.

**Node level (`route()` direct):**
- Narrow gap, bounds supplied → **`null`**. The clean failure the stress
  order required.
- Wide gap (0.13, offset blocker + pillar) → the full weave
  (0.1025, 0.8525) → (0.1025, 0.6275) → (0.0125, 0.6325) → (0, 0.12);
  every waypoint inside the radius-inset bounds; independent dense-sampling
  check finds no segment crossing any padded obstacle interior.

**Stage level (shipped stage + locomotion, corridor injected):**
- Narrow: `goToWorld` returned **null**; **587 samples over ~6 s — 0 inside
  either wall, 0 off-floor, 0 outside the radius-inset region, maximum
  displacement from start 0.0000, 0 busy samples, 0 moving samples.** He
  never set off; there is no busy-pin behind the null.
- Wide: route returned the same weave; **424 samples — 0 inside any of the
  four obstacles, 0 off-floor, minimum clearance exactly 0.042** (the body
  radius: he rode the padded faces, never closer), **59 samples inside the
  gap column within the band** (he threaded the passage), arrival at
  (0.0017, 0.1544) vs target (0, 0.12) — **error 0.034**, the same
  waypoint-epsilon arrival class the first verification accepted for
  claim 1 (0.033).

**Randomized sweep (the regression net):** 80 seeded start/target pairs
across 4 furnished scenes (narrow corridor · wide corridor · the shipped
library's own obstacle set · an edge room with walls touching three floor
edges, a doorway gap, a table and a pillar): **66 routed, 14 null, 0
violations** —
- no returned path contains an out-of-bounds waypoint;
- no segment of any returned path crosses a padded obstacle interior
  (independent check, above);
- every returned path ends exactly at the resolved target (≤ 1e-9);
- every null is legitimate: for all 14, the unbounded route is itself null
  or leaves the floor — no pair the old code routed in-bounds is now
  refused (the invariant was checked on **every** pair, not sampled).
- Hand spot-checks in the library: rest → behind-the-desk routes around the
  desk's west end; a target clicked **inside** the desk resolves to its far
  face (0.04, 0.418) and the route ends there.

## D-V2 — population body pinned forever at a face · **CLOSED**

**Observation leg (shipped library, hands off, 32 s, 3,184 samples of the
reader):**
- His stand point as built by the stage: **(68, 0.418)** — the authored
  (68, 0.50) resolved out of the desk to its far face minus radius; he
  starts there and stands there.
- **0 samples inside the desk footprint; minimum clearance to the desk
  exactly 0.042 at all times; 0 NaN.**
- **`moving` false in 90.2 % of samples; longest moving run 0.57 s**
  (his drift steps between x 66.28…69.72 at constant d 0.418 — the
  stand/drift cycle running beside the desk). The first verification's
  focused run measured this same body pinned at `moving = true` for
  **100 % of 1,134 samples over 12 s**, and 45.77 s across the crossing
  run. That body no longer exists.

**Wedge leg (the defect, re-inflicted deliberately):** the reader was
placed at the desk's far face (52, 0.418) with his target held at the
desk's heart (52, 0.55) — a pure head-on pin, zero tangential component.
(His driver's order-issuing was held only so the held target stayed held;
the mechanism under test — walker + resolve + progress watch — was
untouched.)
- Motion began 6 ms after the target was set.
- **Stall-out 0.71 s after motion began**: he stopped at (52, 0.418) with
  his target snapped to his own position (52, 0.418) — the backstop's
  signature; the held target (52, 0.55) was never reached and never
  re-issued. (The fix log's 0.33 s measures motion-begin → stop-issued;
  this seat measures motion-begin → 0.4 s of confirmed stillness. The
  definitions differ; both are sub-second and bounded, against 45.77 s
  and counting before the fix.)
- Throughout the wedge: **0 inside-desk samples, minimum clearance
  0.042, 0 NaN.**

**Recovery leg (driver released, 20 s):** the stand driver resumed on its
own — drift targets **(66, 0.418)** and **(70, 0.418)** both issued; a
completed drift walk to (66, 0.418) was observed end-to-end (arrived
65.67, within arrival tolerance, then still); final state: still at
(69.72, 0.418) under target (70, 0.418). The normal stand/drift cycle —
the behaviour the pin had frozen — is back, with 0 inside-desk samples
across the entire session.

## Regression suites — re-run by this seat, counts as observed

| Suite | Result |
|---|---|
| `geometry.test.cjs` | **62 passed, 0 failed** |
| `world-engine.test.cjs` | **65 passed, 0 failed** |
| `avatar-system.test.cjs` | **13 passed, 0 failed** |
| wiring `exercise.cjs` | **18/18 checks passed, zero page errors** |

## Resulting status of claims 4 + 5

| # | Claim | Before this seat | Now |
|---|---|---|---|
| 4 | Multi-obstacle corridor; narrow passage fails clean | NEEDS-CHECK (wide CONFIRMED · narrow REJECTED, D-V1 open) | **CONFIRMED** — both legs, Node + stage + 80-pair sweep |
| 5 | Moving inhabitants: no NaN, no stuck, honest body-to-body | NEEDS-CHECK (stuck leg REJECTED, D-V2 open) | **CONFIRMED** — no NaN, no stuck (0.57 s longest run; 0.71 s bounded stall-out under a deliberate pin), furniture resolve holds for every body |

**D-V1: CLOSED. D-V2: CLOSED.** Claims 4 + 5 join claims 1, 2, 3 and 6 as
CONFIRMED; claim 7 stands as a confirmed FLAG (untouched by the fix pass,
by its own declaration). Seat F's mechanism-level verification is complete
across every claim assigned. The standing remainder is unchanged and
outside any verifier's gift: **motion feel and physical-device performance
— the founder's physical-device session remains the graduation gate** —
plus the visual/cinematic grade, and body-to-body pass-through, which the
first verification confirmed as the stated model (bodies resolve against
furniture, not against each other) and which remains a world-feel question
for the captain and the partners, not a defect.

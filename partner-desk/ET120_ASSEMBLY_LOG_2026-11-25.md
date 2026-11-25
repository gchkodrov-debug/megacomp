# ET-120 ASSEMBLY LOG — the four manufactured films enter the Living Mint
**Date:** 2026-11-25 (evening) · **Scope:** `living-universe/` only (engine/, specimen-mint/, assets/) — nothing under `live/` touched, nothing deployed, nothing spent.
**Law applied:** Gemini #120 verdict (BLESSED WITH CHANGES) · Zero Known-Defect (missing evidence = UNVERIFIED, never PASS).

The founder manufactured four films on Account 2 (Jobs 1–4, 90 credits, examined
by the captain, Job 4 founder-ruled "perfect"). This build wires all four into
the Living Mint specimen under #120's law and closes tickets ET-120-A/B/C.

| Asset | Film | Wired as |
|---|---|---|
| Job 1 | `assets/mint-master-environment_take1.mp4` (7.85 s, bookends RMSE 19.94) | Mint **scenery master** — dual-video phase-offset crossfade (#120 method 2) |
| Job 2 | `assets/mint-living-machinery_take1.mp4` (7.85 s, one full press cycle) | Mint **machinery layer** (new, z 22), feather-masked into the scenery plate |
| Job 3 | `assets/mint-portal-crossing_take1.mp4` (7.85 s, threshold crossing at 3.0–3.5 s) | **Portal film** on the Record→Mint portal (the film depicts arriving INTO the Mint): window 2.4 s → 5.3 s |
| Job 4 | `assets/solnik-introduction_take1.mp4` (14.93 s, Omni voice) | **Grand Arrival** hero at the specimen entry: once per session, Skip from frame one, stage-bounded |

Posters extracted by frame time (ffmpeg): `mint-master-poster.webp` ·
`mint-machinery-poster.webp` · `mint-portal-poster.webp` ·
`solnik-arrival-poster.webp` (all in `specimen-mint/assets/`).

---

## ET-120-C — clip-true cycles (CLOSED)

- The superseded assembly targets (Mint scenery 47 s / Record 52 s) are
  **abolished from every config**. Configs now declare the serving film's
  measured duration as `clipSeconds`: Mint scenery 7.85 · Mint machinery
  7.85 · Record scenery 14.667 (its interim boomerang — no founder take
  exists for the Record yet; it is named interim wherever it is named).
- **Clip truth is verified at runtime**: on `loadedmetadata` the engine
  compares the film's real duration against the config and records any
  disagreement > 0.15 s by name in `state().cycles.clipDrift`; the world
  runs on the measured duration. In the continuity leg both Mint films
  measured **exactly 7.85 s, clipDrift empty**.
- The interim boomerang is **retired as the Mint's master** (file kept as
  evidence; the old continuity trace is preserved as
  `headless-60s-interim-boomerang.json`). Job 1 serves via the dual-video
  crossfade — its bookends (RMSE 19.94) never meet as a cut.
- The runtime phase-search (`predictContinuity`) is retired from the
  engine's live path. The pure math (`assignPhaseOffsets`,
  `findSyncRestarts`, `restartEvents`) remains exported and tested as the
  historical record — its findings are what #120 ruled on.

## ET-120-A — coupled layers, one master clock (CLOSED, with one device-UNVERIFIED verdict)

- Scenery + machinery are declared `coupling: 'master'`. One Engine
  master clock (`state().cycles.master`) advances only while the world
  is watched (tab visible + stage on screen + motion on); canonical
  position per layer is the pure function
  `coupledPosition(masterPos, cycleBase, clipSeconds)`.
- The lock is a **phase-locked loop**, and its final shape was dictated by
  two defects this build's own verification caught and measured (below):
  **adoption** at first run (no opening seek), **convergence by
  playbackRate** (±6% ordinary / ±12% gross), **re-anchoring** at every
  crossfade completion, and **no corrective seeks at any drift size**.
  The ledger reports convergences completed, rate nudges, worst drift,
  worst inter-layer lock error, and violation-frame count.
- Validation enforces the pair-lock: a machinery clip requires a scenery
  clip, and the two must share the master coupling — a second clock is a
  config error, not a runtime surprise.
- The gear rotor is machinery furniture: it now turns on the machinery
  layer's master-clock position (one turn per machinery cycle), so
  furniture and film — one layer, one clock — cannot drift apart.
- **Measured in the 60 s leg (headless):** worst inter-layer lock error
  **0.18 s** (144 violation frames), worst drift vs canonical ~3.7 s,
  3 rate nudges per layer, 0 hard cuts, 0 video errors. The films decode
  materially slower than wall-clock in this software renderer, so the
  ≤1-frame steady state is **NOT demonstrated in this environment** —
  it stands **UNVERIFIED**, belonging to the device legs. The mechanism
  is proven (adoption, nudges, ledger, stub-DOM correction semantics);
  the steady-state number is not claimed.

## ET-120-B — uncoupled layers are not synchronized at all (CLOSED)

- Lighting (both universes), Record scenery, and Record's machinery
  period are `coupling: 'free'`: no sync management is spent on them —
  the runtime clash detector now fires only among non-coupled layers
  (coupled restarts coincide by design and are never logged as defects).
- "Coprime" is defined by measurement, not vibes: `coprimeCycles(a, b)`
  requires an integer-ms realignment ≥ 120 s AND a ratio not within
  0.1% of any rational p/q with q ≤ 6. Verified against the verdict's
  own example (8.0 / 5.3 passes) and the failure family (exact multiple
  15.7/7.85 · 3/2 ratio 12/8 · near-integer 10/3.333 · identical periods
  all fail). All house pairs pass (31 vs 7.85 · 41/17/14.667 pairwise),
  so **no config period needed to change** — Mint lighting stays 31,
  Record stays 17/41.
- Validation rejects a non-coprime free period beside a coupled cycle
  (a lighting period of 15.7 s against the 7.85 s pair is a config
  error, tested).

## The Grand Arrival (Job 4) — wired

- New plane **z 150** (`Z.ARRIVAL`), inside the stage and below the
  visitor controls (z 200): the film can never cover commercial content
  (z 100 is page content outside the stage; the arrival is
  stage-bounded), and the page stays scrollable while he speaks.
- Plays **once per session** (`sessionStorage` flag), Skip button from
  the first frame + Escape; ends by fading out and removing itself;
  `living-universe:arrival-start` / `arrival-end` events fire.
- Sound honesty: unmuted autoplay is attempted; if the browser refuses,
  the film plays muted, `state().arrival.audioBlocked` is set, and a
  visible **"Hear his voice"** button offers the voiced replay — the
  engine never pretends he spoke in silence.
- Motion off / reduced-motion / already-seen / host-suppressed → the
  film is never built and **zero bytes are fetched** (the specimen's
  continuity examiner mounts with `suppressArrival`, and the leg's
  trace confirms `arrival.suppressed: true, played: false`).
- `api.playArrival()` replays at the visitor's own word (the specimen
  page carries a Replay control); it overrides seen/motion gates, never
  host suppression.

## The portal film (Job 3) — wired

- `portals[].film{ src, poster, startAtSeconds, playSeconds }` is a
  per-portal config; the crossing film rides the **Record→Mint** portal
  (the film depicts arriving into the Mint — it belongs on the door
  that leads there). Window chosen from frame-sampled warmth evidence:
  the threshold transformation runs 3.0–3.5 s; the trim plays
  **2.4 s → 5.3 s**, landing as the forge hall stands revealed.
- Playback runs in the portal overlay (full-viewport, iris suppressed),
  navigation fires at the window's end; a film error degrades to the
  CSS iris — never a stranded visitor. Motion-off visitors navigate
  instantly, as before. `state().portalFilmPlays` counts showings.

## Defects found by verification during this build (both fixed, both kept on record)

1. **The seek-storm lock (found by the first continuity attempt, which
   timed out on page load).** The first lock design teleported any film
   drifting > 1 frame back to canonical. Probe evidence: both films
   pinned at readyState 1, currentTime 0, buffered ~0.4 s, ~15 seeks/s —
   a not-yet-playing film reads as "infinitely drifted," and every seek
   aborted its download. Fix path: running-only gating + rate limiting
   (insufficient — see 2), then the PLL redesign.
2. **The sparse-keyframe teleport (found by the fine-grained probe
   after the gating fix).** Even a buffered, rate-limited teleport
   restarted the film at 0: these takes carry ~1 keyframe (the
   captain's Job examinations noted it; Gemini #120 named it
   clip-killer #2), so a seek to 1.45 s decodes from the keyframe at 0.
   **Consequence, now law in the code: the lock never seeks.** Final
   probe under the PLL: the scenery film plays continuously —
   readyState 4 throughout, currentTime monotonic 0 → 7.42 s over
   10 s, buffer complete, zero seeks.

## Tests — 137 before, 171 after, all passing

| Suite | Before | After | Notes |
|---|---|---|---|
| `engine.test.mjs` (pure core) | 91 | **113** | §9 rewritten to #120 law; phase-search math kept as the library's record |
| `dom-smoke.test.mjs` (stub DOM) | 23 | **35** | per-layer loopers, clip truth, adoption, rate convergence, no-seek discipline, arrival lifecycle, seen-remount |
| `continuity.test.mjs` (analyzer) | 23 | **23** | unchanged — the analyzer's contract did not change |
| **Total** | **137** | **171** | **0 failed** |

Superseded checks, named (the Infinite build's own precedent): the §9
plan assertions (targetSeconds 47/52 → clipSeconds + coupling), the
defaults check (47 s target → null clip + periodic defaults), the smoke
metadata block (interim-film/predicted-sync assertions → clip truth +
adoption), and the dual-video count (now per-layer). New coverage:
coprime accept/reject families · wrap-aware drift math · the one-frame
correction boundary · coupling validation (pair-lock, mismatch,
non-coprime rejection) · machinery/arrival/portal-film validation ·
Z-order for MACHINERY (22) and ARRIVAL (150 < CONTROLS) · machinery
looper presence · adoption pinning · rate-band convergence · the
never-seek rule under gross drift · completed-convergence counting ·
arrival build/skip/seen/suppressed paths.

## Continuity — 60-second leg against the NEW assembly (headless, this sandbox)

Full record: `specimen-mint/CONTINUITY_REPORT.md`, ET-120 addendum.
Trace: `specimen-mint/continuity-traces/headless-60s.json` (now carries
the engine ledger).

- **observation — PASS** (60.1 s)
- **seams — PASS** (worst near-bookend 22.1 vs scene p95 17.2, 4 bookends;
  qualified by the stall note)
- **sync restarts — PASS** (0 defects logged)
- **black frames — PASS** (none)
- **pacing — FAIL, in-environment only** (6.86% dropped; two 1080p
  software decoders on 1.5 shared CPUs — not device evidence)
- **buffering — FAIL, in-environment only** (6 stalls, 2.11 s, at the wraps)
- **5-minute leg — UNVERIFIED** (not re-attempted; the Infinite build's
  two attempts died ~183 s in this sandbox)
- **30-minute leg — UNVERIFIED** (founder's device session)

**Stall observation (NC-08 candidate, open):** after ~20 s wall, no
further wraps in either ledger and the seam sampler froze at diff 0.0
for the remaining ~40 s. Root cause not isolated — decoder starvation
is the leading candidate; a looper stall is not excluded. It becomes a
defect if a device leg reproduces it; it is this sandbox's ceiling if
device legs run clean. Named, not buried.

## Open UNVERIFIED items (complete list)

1. **≤1-frame coupled steady state on a real device** — mechanism
   proven, number not demonstrated (headless decode ceiling).
2. **Device pacing / buffering / thermal** — 60 s leg FAILs are
   environment-qualified; 5-min and 30-min legs unrun anywhere.
3. **NC-08 stall observation** — in-environment, root cause unisolated.
4. **Grand Arrival sound path in a real browser** — autoplay-with-sound
   policy, the muted fallback, and the "Hear his voice" recovery are
   code-proven and stub-tested, not yet heard on a device.
5. **Portal film playback in a real browser** — config + degradation
   paths validated; the crossing itself has not been watched in-browser
   (the specimen's Record page mounts it; no browser seat ran it here).
6. **UV-01 / UV-02 / G11** (in-browser rendering proof, device budgets)
   — unchanged from the Phase 1+2 relay, still open.
7. **NC-06** (active swap-delay avoidance) — still designed-not-built;
   the leg's wrap-clustered stalls are its evidence file.
8. **The Record still serves its interim boomerang** — lawful under the
   rewritten gate as a named interim; it retires when a founder take
   lands for that universe.
9. **PIS-01 visitor judgment** — the specimen entry is now the new
   assembly; the founder's unbriefed first impression remains the
   deciding evidence, still owed (home session).

## Ticket disposition

- **ET-120-A — CLOSED** (mechanism built, ledgered, stub- and
  probe-verified; the ≤1-frame steady-state *number* is device-UNVERIFIED,
  item 1 above — the ticket's build is done, its device proof is a leg,
  not a build).
- **ET-120-B — CLOSED** (coprime law defined by measurement, validated
  at config time, sync management removed for free layers).
- **ET-120-C — CLOSED** (clip-true configs, runtime clip-truth
  verification, boomerang retired as Mint master, phase-search retired
  from the runtime path).

Nothing deployed. Nothing under `live/` touched. The specimen remains
unlinked from any live door, awaiting the founder's home judgment.

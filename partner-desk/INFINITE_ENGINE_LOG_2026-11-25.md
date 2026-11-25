# INFINITE ENGINE LOG — 2026-11-25

**Commission:** the captain's construction seat under the founder's Infinite
Living Universe directive (FVR-30, 2026-11-25 12:22 CT) — integrate
independent-cycle layer orchestration into the built Living Universe
Engine, build the continuity examination as a harness, and reconcile the
directive's production specs against the engine's current loop strategy.
**Fences kept:** local only (`living-universe/`), nothing deployed, no live
door touched, no spending, no Flow generation. Crew tools manifest +
skills pack loaded (cinematic-web-engineering-rules Track 7 +
creative-3d-engineering-rules Track 5 binding).

Baseline on entry: engine suite **61 passed, 0 failed** · loop durations
by ffprobe **Mint 14.833 s / Record 14.667 s** (boomerangs) · PIS-01
reconciliation open items UV-01/UV-02/G11 and the B-series drafts stand
as the reconciliation left them; this build touches UV-01's instrument
side only (see the continuity report).

---

## 1. DELIVERABLE A — INDEPENDENT-CYCLE ORCHESTRATION (built)

The directive's core demand — *independent layers on different cycles, so
the world never restarts at one moment* — is now engine behaviour, driven
entirely by per-universe CONFIG data (`cycles{}` in `engine/universes.js`):

| Layer | Kind | Mint | Record | Behaviour |
|---|---|---|---|---|
| scenery | media | target 47 s | target 52 s | the film; its MEASURED duration is the real cycle; first play is phase-seeked |
| machinery | periodic | 13 s | 17 s | the press gear physically rotates on this period (SVG rotor group, §2 D-02 note); phase = searched offset |
| lighting | periodic | 31 s | 41 s | continuous drift — shade opacity + film brightness breathe on this period; chains sway on it too |
| particles | procedural | — | — | cycle-free (different draw code per universe, unchanged) |
| character | agent | — | — | Solnik's plane, real-time (unchanged contract) |
| interaction | input | — | — | visitor-driven (unchanged) |

**Phase offsets are searched, not hand-picked.** A seeded deterministic
search (mulberry32; ≤64 attempts) assigns each restart-bearing layer an
offset minimising synchronized restarts over a 30-minute horizon
(ε = 0.75 s). The seed is per-mount random (persisted nowhere), so two
visits do not share a phase pattern, while tests stay reproducible.

**The self-check is live.** When the scenery film's true duration lands
(`loadedmetadata`), the engine re-runs the prediction against the
MEASURED cycle and stores it (`api.continuity()`); every observed media
restart is logged against the plan, and any restart falling within ε of
a machinery boundary dispatches `living-universe:continuity`
(`sync-restart`) on the stage — the event the examination harness grades.
**Honesty fence:** the machinery layer today is procedural rotation on
the machinery period — it has no restart events, so observed syncs can
only be *predicted*, not *seen*, until a machinery MEDIA layer exists
(Job 2). The prediction is therefore printed in state, not hidden.

**Active swap-delay avoidance is NOT implemented — named open item
NC-06 (candidate).** Delaying a crossfade by a fraction of a second to
dodge a machinery boundary is a two-line idea with a sharp edge: a wrong
delay shows a frozen last frame — the exact defect it exists to hide.
It needs a browser seat's tuning and before/after traces; this seat
records the requirement and the risk, and does not ship a guess.

**Contracts preserved:** Z-order and the `#solnik-mount` plane (z30),
occlusion plane (z40), commercial foreground (z100) untouched;
poster/reduced-motion fallbacks untouched (motion off now also clears
every cycle-driven transform/filter); sovereignty, pricing, portal
overlay untouched. No changes to `specimen-mint/index.html` or
`portal-record.html`.

### 1a. The cycle mathematics — three measured findings (for Gemini #120 Q1)

1. **Un-phased layers DO collide.** 47 s / 13 s in identical phase
   coincide at 0 s, 611 s and 1222 s inside 30 minutes — the problem the
   directive names is real, not theoretical.
2. **47/13 has a floor of 3 at ε = 0.75 s — and it is arithmetic, not
   effort.** Machinery restarts land on *every* integer residue mod 47,
   so some restart always falls within half a second of a scenery
   restart once per 611 s LCM period. The search reaches the floor (3)
   and pushes the coincidences away from the visit's start
   (422 s / 1033 s / 1644 s at the test seed). **At ε = 0.25 s the same
   pair reaches ZERO** — the floor is set by the epsilon definition,
   which is a question about human perception (can a visitor perceive
   two crossfades 0.5 s apart as one reset?), i.e. exactly Gemini
   #120's Q1 territory. The engine logs at 0.75 s and reports; it does
   not quietly redefine the gate.
3. **TODAY's interim pair is a bad pair.** The current scenery cycle
   (14.833 s boomerang) against the 13 s machinery target: ratio 1.14 —
   the cycles are too close, their restarts sweep past each other
   **13 times in 30 minutes under ANY phase**. The 47 s master assembly
   is therefore not a duration preference; it is what makes the cycles
   separable at all. (See §3.)

### 1b. Defects found by this build (builder seat)

- **D-02 — CONFIRMED, FIXED (occlusion vs sway).** The pre-existing CSS
  `lu-sway` animation rotates the WHOLE occluder SVG ±0.6°. Measured
  with the engine's own geometry at all five stage sizes: on the Record
  shelf at 320 px wide, sway displaces the astrolabe key shape **1.26 px
  against a coverage margin of 1.04 px — cover fails at sway extremes**;
  on the Mint gear at 320 px, displacement 0.69 px **equals** the margin
  (borderline). Functional occlusion must not drift: the shipped CSS now
  disables sway on anchored occluders (`[data-lu-occludes]`); sway
  remains on decorative edge occluders only, and the gear rotor / chain
  groups INSIDE the SVG still move. Two measurement tests + one fix test
  guard it. This defect predates the Infinite build (Phase 1+2 era) and
  is recorded here as found; the earlier "margins thin at 320 px" note
  in the Phase 1+2 record is its first shadow.
- **Closure-capture defect — CONFIRMED, FIXED (this build's own code).**
  The first version of the `loadedmetadata` handler closed over the
  video-creation loop variable; by the time metadata fired it read (and
  would have seeked) the LAST video, not the first — prediction and
  phase-seek silently dead in a real browser. The DOM smoke harness
  caught it before any browser did; the handler is now a
  named-parameter helper (`watchSceneryMetadata`). Recorded because the
  pattern is a trap for the next seat too.

### 1c. Tests — before / after

| Suite | Before | After |
|---|---|---|
| `engine/test/engine.test.mjs` (pure core) | 61 passed | **86 passed, 0 failed** (+25: RNG, plan shape, cycles validation, restart math, sync floors, D-02 measurements + fix) |
| `engine/test/dom-smoke.test.mjs` (mount, stub DOM) | — (new) | **20 passed, 0 failed** (mount both universes, rotor/chain collection, metadata→prediction→seek, frame-driven cycles, motion-off clearing, destroy) |
| `engine/test/continuity.test.mjs` (analyzer) | — (new) | **23 passed, 0 failed** (every verdict branch incl. the differential seam rule) |

## 2. DELIVERABLE B — THE CONTINUITY EXAMINATION (built + run)

Harness: `specimen-mint/continuity.html` + `continuity.js` (pure analyzer
+ browser examiner) + `engine/test/continuity-run.mjs` (headless runner).
Full verdicts, traces and qualifications: **`specimen-mint/CONTINUITY_REPORT.md`**.
Headline of the 60-second leg (headless seat): observation PASS · seams
PASS (no anomaly — worst bookend diff 22.8 vs the scene's own p95 20.3)
· sync restarts PASS · black frames PASS · **pacing FAIL in this
environment** (dropped-frame rate 1.65–3.18% across runs under software
rendering; median 59.9 fps) · **buffering FAIL in this environment**
(4 decoder stalls ≤ 0.04 s each, three of them within 0.15 s after a
bookend swap — a swap-adjacent micro-stall pattern worth a device look)
· thermal/memory + character consistency UNVERIFIED by construction.
The differential seam rule is an instrument correction recorded in the
analyzer's own header: the first live trace proved an absolute bar
measures the forge's ordinary motion (near-bookend median 6.5 vs
far-from-bookend 8.0).

## 3. DELIVERABLE C — PRODUCTION-SPEC RECONCILIATION (paper)

The directive's durations vs the engine's current reality:

| Directive spec | Today | Verdict |
|---|---|---|
| Master environments 30–60 s, assembled from ~8 s clips | One 14.833 s (Mint) / 14.667 s (Record) boomerang each | **INTERIM — replace on Job 1** |
| Machinery films 8–16 s, own cycle | No machinery film exists; machinery = procedural gear rotation on the period | **Engine-ready as a plan; media layer is future work on Job 2** |
| Portals 2–4 s | 0.68 s CSS iris crossfade (built Phase 1+2) | **INTERIM — replace on Job 3** |
| Grand Arrival 6–10 s, skippable | Not built (Phase 4) | **Unbuilt — named** |

**Where the boomerang stands against the directive's spirit.** A
boomerang is the perfect seam and the imperfect world: frame-exact
measurement this run (frames by number, 72×128, PIL) — bookend RMSE
**Mint 1.29 / Record 0.84** (gate ≤ 8, wide PASS), turnaround pair
3.39 / 1.21 — there is no discontinuity anywhere in either loop. The
cost is direction: the second half of every loop is the first half
played backwards. Measured visibility of that reversal: on the Record
loop, frames at mirrored times (25% vs 75%) differ by RMSE **3.13**
while unrelated frames differ by **39.19** — the astrolabe visibly
retraces its rotation; a watching visitor CAN catch the world rewinding.
On the Mint loop the same probe reads 4.12 vs a control of 4.75 — the
forge room is so near-still in frame terms that the reversal hides in
stills and lives only in motion (sparks, glow) that still-frame RMSE
cannot see. Either way the construction fact stands: time runs backwards
for half of every loop, which the directive's "a civilization doesn't
[have a beginning and an ending]" forbids in spirit even where the eye
forgives it. **Ruling of this seat: the boomerang is an acceptable
INTERIM for machinery-dominant, near-still loops and is NOT acceptable
as the master environment once Job 1 lands.**

**What the founder's clips replace when they land**
(`FOUNDER_VIDEO_QUEUE_2026-11-25.md`):
- **Job 1 (Mint master environment)** → the assembled 30–60 s
  forward-only master replaces the boomerang as the scenery layer; the
  loop gate re-runs on the assembly (last-frame-of-clip-N to
  first-frame-of-clip-N+1 joins are the new seams to grade); the cycle
  plan's 47 s target becomes the scenery's measured reality and finding
  §1a-3 dissolves.
- **Job 2 (Mint living machinery)** → becomes the machinery MEDIA layer
  on its own searched cycle. Engine work still owed then (named, not
  built here): a second media layer in the looper class, its own
  crossfade + restart observation feeding the same self-check.
- **Job 3 (portal crossing)** → replaces the 0.68 s CSS iris with a
  true 2–4 s crossing film on portal traversals (Phase 4 wiring).
- **Job 4 / Phase 4** → the Grand Arrival 6–10 s skippable film.
- **Sound:** layered independent-cycle ambience (forge bed + machinery
  ticks + room tone on separate loops) is PIS-01's open sound FAIL and
  Gemini #120's Q4 — the engine's sound hooks exist (off by default);
  the layered-cycle sound design is named future work, not built here.

## 4. NAMED OPEN ITEMS CARRIED OUT OF THIS BUILD

- **NC-06 (candidate):** active swap-delay avoidance — designed, not
  implemented (freeze-frame risk; needs a browser seat).
- **UV-01:** in-browser rendering proof of the SPECIMEN on a real
  browser/device session — the headless examination above is instrument
  evidence about the files and the swap mechanics, not the founder's
  cold-visitor judgment, which remains the specimen's gate tonight.
- **UV-02 / G11:** Track 6 budgets (LCP ≤ 2.5 s · INP < 200 ms ·
  CLS < 0.1; PIS-01's stricter CLS ≤ 0.01 draft) still UNVERIFIED on a
  real device.
- **Continuity legs:** the 30-minute leg was NOT run by this seat (wall
  time + thermal meaninglessness headless) — UNVERIFIED in the report;
  the 5-minute leg's headless result is environment data, not a device
  verdict.
- **Machinery media layer** (Job 2 landing) and **layered-cycle sound**
  (PIS-01 sound FAIL) — future engine work, named in §3.
- **D-02's wider family:** any future anchored occluder inherits the
  no-sway rule; the CSS guard + tests are the fence.

## 5. RELAY RECORD

**Seats:** builder (captain's construction seat, this log) → critic
(DeepSeek-V4-Pro, different family; packet `relay/critic-user.md`,
reply `relay/critic-reply.md`, 31,496 tokens) → improver fold (builder)
→ blind verifier (fresh-context subagent; verdict
`relay/verifier-verdict.md`).

**Critic's verdict: SHIP WITH FIXES.** Findings and their disposition:

| # | Finding | Grade (critic) | Disposition |
|---|---|---|---|
| F1 | A universe without `cycles{}` silently inherits the default rhythm — a timing template | Medium · CONFIRMED | **FOLDED.** `validateConfig` now requires cycles.scenery/machinery/lighting for non-stub universes (stubs keep the exemption); +2 tests |
| F2a | "Zero syncs at ε=0.75 is typically reachable" for 47/13 | Low · CONFIRMED (its own claim) | **REJECTED, with proof.** Machinery restarts land on every integer residue mod 47, so a restart always falls within 0.5 s of a scenery restart once per 611 s LCM period — at ε=0.75 the floor is 3, arithmetically. Measured: the search returns exactly 3; at ε=0.25 it returns 0. The critic's Monte-Carlo intuition does not survive the residue structure |
| F2b | In production the search runs on the MEASURED film (14.833 s), not the 47 s target — the live pair is near-resonant | Low · CONFIRMED | **AGREED — already builder finding §1a-3.** The critic's proposed remedy (predict against the target instead) is **REJECTED**: the self-check must describe the world as it is. Its alternative remedy is **FOLDED**: state now names the gap — `sceneryTargetSeconds` + `interimFilm` ride in `state.cycles` and `api.continuity()`; +1 smoke test |
| F3 | The `restartEvents` flag is defined but never read by the sync math | Medium · CONFIRMED | **FOLDED.** `findSyncRestarts` + `assignPhaseOffsets` now exclude `restartEvents === false` layers even if a cycle is attached; the prediction's machinery entry documents why its flag is deliberately unset; +2 tests |
| F4 | `noteRestart`'s clash can never fire today (only scenery produces restart events) — "vacuously correct" | Medium · CONFIRMED | **AGREED, wording adopted.** The precise statement: only one layer can ever fire a restart event today, so the observed-sync path is armed but unreachable until a machinery media layer exists. No code change (the critic asked for none) |
| F5 | Is the closure-capture defect regression-covered? | Medium · CONFIRMED | **SETTLED BY EVIDENCE.** The DOM smoke test IS the regression: it failed pre-fix ("continuity prediction ran on the measured cycle null" — the handler read the wrong video's NaN duration) and passes post-fix. The critic could not see the tests (not in its packet); the blind verifier re-runs them |
| F6 | D-02 numbers: the critic's own trig gave 1.61 px vs the builder's 1.26 px — show the computation | Critical · NEEDS-CHECK | **SETTLED BY COMPUTATION — and the critic's challenge widened the defect.** From the engine's own geometry at 320 px: Record key-centre displacement 1.26 px, farthest-point 2.49 px, margin 1.04 px (fails under both); Mint centre 0.69 px = margin 0.69 (the builder's "borderline" was the optimistic bound), farthest-point 1.16 px > margin (**Mint also fails pre-fix** under the conservative read). The critic's 1.61 px sits between the two bounds (rougher lever assumption). The fix — zero sway on anchored occluders — is robust to the whole dispute; +1 test keeps the conservative numbers on record |
| F7 | The differential seam rule: instrument correction or verdict shopping? | High · CONFIRMED | **CRITIC RULED: instrument correction.** ("A seam is a spike above the scene's own weather — that's the right calibration.") It independently checked the sampling resolution (500 ms cadence vs 700 ms crossfade brackets the bookend adequately) |
| F8 | Pacing/buffering FAILs: environment qualification honest? | Medium · NEEDS-CHECK | **AGREED both ways.** The qualification is honest; the swap-adjacent stall pattern is the real engineering finding (already in the continuity report; feeds NC-06) |
| F9 | `destroy()` leaks the stage classes it added (`lu-stage`, `lu-motion-off`) — a re-mount inherits stale state | High · CONFIRMED | **FOLDED.** `destroy()` now removes both classes; the stub DOM gained the `classList.remove` it was missing (the fold exposed the gap); +2 smoke tests |
| F10 | Stub-DOM smoke tests verify code paths, not CSS/layout behaviour; the `.lu-motion-off` CSS transform rule is belt-and-braces over the inline clearing | Medium · NEEDS-CHECK | **ACCEPTED AS STATED.** That is the harness's declared scope (pixels are UV-01). The CSS rule stays as a first-paint guard; the guarantee is the inline clearing, which the smoke tests verify. A real-browser computed-style check is named into UV-01's list |
| F11 | Boomerang numbers plausible; interim ruling sound | Medium · NEEDS-CHECK | **AGREED** (see §3) |
| F12 | Test counts unverifiable from the packet (tests not included) | Low · CONFIRMED | **BY DESIGN of the relay:** the blind verifier re-runs all three suites against the frozen hashes |
| F13 | "Disabling sway betrays the aliveness directive" | Low · **REJECTED by the critic** | Kept on record per Relay Law. The builder concurs: functional occlusion never drifts; decorative sway survives on edge occluders |
| F14 | The hard-cut fallback (standby not ready) is a perceptible restart | Low · **REJECTED by the critic** as a finding (documented degradation path, standby loads at 35% of the film) | Kept on record. Its risk note becomes **NC-07 (candidate):** instrument the fallback — count and log hard cuts when the path fires, so a continuity leg can grade it instead of inferring it. Not built here |

**Fold result:** 4 code folds (F1, F2b-naming, F3, F9) + 7 new tests.
Suites after the fold: **91 pure-core + 23 DOM smoke + 23 analyzer =
137 checks, all passing** (baseline on entry: 61).

**Freeze v3** (after the fold; sha256 in `relay/freeze-v3.txt`):
engine `98f20051…` · CSS `1c7c3b37…` · universes `0534099f…` ·
continuity.js `e5cc9303…` · continuity.html `4e7ad223…`.

**Blind verifier: PASS — 10/10 claims, 11/11 hashes, 0 FAIL /
0 UNVERIFIED** (`relay/verifier-verdict.md`). Fresh-context seat; it
re-ran all three suites itself (91 / 23 / 23, exit 0), recomputed the
phase mathematics from the exported pure functions (un-phased 47/13 =
3 collisions at 0/611/1222 s; searched = 3 at ε 0.75; 0 at ε 0.25;
the interim 14.833/13 pair = 13), re-derived the D-02 geometry
(Record @320: centre 1.26 px and farthest-point 2.49 px, both over the
1.04 px margin), fed its own traces to the analyzer (every "cannot
know" case returned UNVERIFIED, thermal on every trace), matched the
60 s headless trace field-by-field against the continuity report, and
grepped the frozen set clean of any live-door reference. Two notes,
neither a defect: claim 4(a)'s collision count is exactly 3 (the claim
asserted only that collisions occur); claim 9 verified as the
field-by-field match it asserts.

**Relay outcome:** the crew agrees — builder, different-family critic
(SHIP WITH FIXES, all fixes folded), blind verifier (PASS). The build
is complete as an INTERIM-grade engine integration: the orchestration,
self-check and examination harness are real and verified; the worlds
they orchestrate remain interim until the founder's Job 1–3 clips land,
and the device-grade continuity legs remain UNVERIFIED where this log
and the continuity report name them (UV-01/UV-02, Legs 2–3 on a real
device). The captain judges next; the founder judges last.

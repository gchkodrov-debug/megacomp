# SEAT J — BLIND VERIFICATION OF THE FIX PASS

**Date:** 2026-11-26 · **Seat:** blind verifier (Relay Law, final seat before the captain)
**Standard read:** `SEATJ_RELAY_CRITIC_2026-11-26.md` (the Five Proofs + B-1, B-2, N-1, N-2)
**Method:** the code as it now stands, re-proven with my own probes. I did not read the builder's or fixer's reasoning. All browser work ran against a byte-identical mirror of the real tree (sha256-proven file by file); the real tree was never touched — all 47 construction source files hash identical before and after this verification.

---

## VERDICT — PLAIN ENGLISH FIRST

**Seat J stands verified at mechanism level.**

Both blocking defects the relay critic found are fixed, and I re-proved the fixes with my own instruments, not the fix pass's word:

- **B-1 (Solnik pinned silently at the desk forever)** — gone. He now routes around the furniture and ends beside the visitor; when his target is genuinely unreachable he says so on screen instead of pressing in silence.
- **B-2 (speech bubbles rendered off-frame on phones)** — gone. Every beat of the conversation is fully inside the frame at phone size from every side of the room, and on desktop too.
- **N-1 (the two-body floor could be broken after collision)** — gone. The pair distance never fell below the 0.084 floor in 4,400+ samples of adversarial and natural play.
- **N-2 (the product and the paper sat outside the room's one light)** — gone. Both now take the frame's exact shade and shadow, measured at two lamp phases.

The fix pass's mutation claim is honest: disable Solnik's routing and the composed exercise fails on exactly the B-1 check and nothing else (41/42). No regressions anywhere in the battery. The recorded open items N-4, N-5, N-6, N-7 were not silently "fixed" and not worsened — they stand exactly as the critic recorded them, awaiting their founder/policy calls. N-3 remains NEEDS-CHECK (the coverage definition was never published; every measurement taken, the critic's and mine, meets or beats the claim). I found **no new defect**; one suspicion of mine was investigated and is rejected on the record below, with its mechanism explained.

The founder's standing caveats are untouched by this verdict: the figures in the room are still placeholder test bodies, not the world's final look, and mechanism verification is not a visual approval. That judgment remains George's.

---

## 1. B-1 — RE-PROVEN FIXED (my probes V1, V1b)

The critic's exact staging (visitor placed north at (30, 0.35), then taps south to (30, 0.80); Solnik settled north of the desk at (36.8, 0.341) before the crossing):

| Case | Result |
|---|---|
| Critic's desk crossing, N→S | Solnik **routed around the desk** and settled at (36.5, 0.721) on the south side, pair 0.139. Longest moving-but-far (stuck) run: **0 s** (pre-fix: pinned 20 s, silent). 0 penetration frames in 177 samples. Host min-distance sampler: 0.084. 0 failures. |
| My invented crossing — the shelf, E→W side | Visitor (8, 0.08) → (8, 0.52) across the shelf line. Solnik settled at (18.6, 0.458), pair 0.186, stuck 0 s, 0 penetration. |
| Visitor placed in the sealed west slot (2, 0.28) | Solnik accompanied to resolved ground north of the shelf (11.8, 0.148), pair 0.234, settled in 5.3 s; on the visitor's recovery walk to (50, 0.85) he settled again at pair 0.137. |
| **Forced unreachable follow target** (visitor in the sealed slot, follow point inside it) | Solnik's locomotion attempted **4×**, declared `unreachable`, and the host **announced it on screen within 1.4 s**: *"Unreachable: solnik could not reach its target (unreachable)."* Failures recorded +1, announced +1. Recovery afterwards: settled, pair 0.159. **The silence clause of B-1 is dead.** |

**Investigated and REJECTED — the south→north corner rest.** On the return crossing, Solnik sometimes rests at (31.1, 0.463) instead of completing to the follow point (38, 0.352). I chased this as a possible residual pin. It is not one: he is not moving, not pressing, raises no failure, stands on the correct side of the desk at exactly the 0.084 floor — because the visitor's own rest position (30, 0.382) makes the desk-face corridor pass 0.036 from the visitor, *inside* the pair floor, so the offset point cannot legally be occupied. He rests at the closest legal point. Consistent with the exercise's own leg B resting at 0.083–0.088. Suspicion not sustained; mechanism recorded so no future seat has to re-chase it.

## 2. B-2 — RE-PROVEN FIXED (my probes V2, V2b)

Conversations run at 375×812 from visitor east (88, 0.82), west (10, 0.82) and centre (50, 0.60), plus desktop east and centre:

- Samples per run: 83 / 82 / 83 / 81 / 81 — all three beats captured at every position.
- **Worst frame overflow: 0.0 px everywhere.** (Pre-fix: beat 2 rendered at −476.6 px from east — entirely off-frame.)
- The proxemic whisper pill, provoked at the frame edge beside the desk clerk: 6 samples, worst overflow 0 px.
- One suspicious metric (scroll−client = 6 px on every run) was chased separately: beat 2 at portrait-east sits at rect left 6 / right 252 / top 240 / bottom 297, fully in-frame at the clamp margin; the 6 px is the speech tail's contribution under `overflow: visible`, not clipped text. A screenshot confirms the full line — *"The Day-Book is open for inspection."* — readable. No text clipping anywhere.

## 3. N-1 — RE-PROVEN FIXED (my probes V3, V3b)

- The critic's placed desk-gap pin, reproduced verbatim (visitor (52, 0.40), Solnik placed (52, 0.44), visitor shuttling 46↔58 at depth 0.415): 709 samples — **in-page minimum pair distance 0.0840, host-sampler minimum 0.0840**, 0 penetration. (Pre-fix host minimum: 0.0200.)
- 60.7 s of continuous naturalistic open play, 23 walk legs, 3,728 samples: minimum **0.0840** by both measures, 0 penetration.
- The floor is now a post-collision invariant in the sampled frame, not a pre-collision hope.

## 4. N-2 — RE-PROVEN FIXED (my probe V4)

- **The paper:** at rest under lamp phase 1, the paper's draw-list shade/shadow = **0.14613 / 0.27381**, exactly the frame light's values; at phase 2, **0.10689 / 0.21102**, again exact. (Pre-fix: null / null.) All bodies matched the light at every sample.
- **The product:** phase 1 (light shadow 0.26401, shade 0.14001) — rendered drop-shadow alpha **0.443** vs the light-derived expectation 0.444 (error 0.001); brightness 1.049 vs 1.049 expected, exact. Phase 2 (shadow 0.22664, shade 0.11665) — alpha **0.408** vs 0.407 expected (error 0.001); brightness 1.041 vs 1.041, exact. The filter **changed between phases and moved in the light's direction** (alpha fell 0.035 as shadow opacity fell 0.037). (Pre-fix: a fixed 0.55 at both phases.)

## 5. MUTATION HONESTY — CONFIRMED

In the mirror only, one line changed in `composed.js`: Solnik's drive issuance `loco.goToWorld(targetW)` → `loco.driveToWorld(targetW)` (routed drive replaced by the locomotion's own direct-drive mode; the visitor's routing untouched).

- Result: **41/42 checks passed. The single failure was `fix.b1-solnik-crosses-the-desk`** — "Solnik never settled beside the visitor after the desk crossing." Every other check, including N-1, both B-2 checks, both N-2 checks, all Five Proofs and the RM checks, stayed green.
- The claim — disabling the routing drive fails exactly the B-1 check and nothing else — is **true as stated**.
- Restore: the mutated file was replaced from the pristine copy; sha256 is again `a2a1b9eb148a059798c1909a05131664c671d56dafd57459b761c950ec02969b`, byte-identical to the real tree.

## 6. REGRESSIONS & BOUNDARIES — CLEAN

Full battery, re-run by my hand (node suites in the mirror, with world / manifestation / avatar also spot-run green in the real tree; browser exercises in the mirror):

| Suite | Result |
|---|---|
| world-engine tests | 81/81 |
| geometry tests | 75/75 |
| avatar tests | 17/17 |
| manifestation tests | 24/24 |
| camera tests | 68/68 |
| crowd tests | 14/14 |
| camera exercise (browser) | 11/11 |
| crowd exercise (browser) | 12/12 |
| wiring exercise (browser) | 22/22 |
| cinematic-library exercise | exit 0, zero page errors |
| **composed exercise (the fixed host)** | **42/42** |

**Boundary — the shared-module change is opt-in only.** The fix's one shared-module change is `companion.js`'s new external-drive mode. My unit proof (probe V0): in **default** mode the companion issued `setTarget` 30/30 updates and stepped its walker 30/30, and the walker physically moved toward a far target; in **external** mode it issued 0 and stepped 0, publishing `followTarget` {x: 62, d: 0.77} for a visitor at (70, 0.80) — the correct offset — while its walker stayed put. Only three companion hosts exist (grep-verified): the wiring stage and the cinematic library construct it **without** the option (default mode), and both of their browser exercises are fully green above; only the composed host opts in. Default behaviour is unchanged, in unit and in situ.

**N-4 … N-7 stand as recorded** (my probes V5, V5c, V6):

- **N-4** (z-quantization band at the desk plane): desk draw z = 65, as recorded. 972 samples, 80 near the desk: 6 band inversions, all at depths inside (0.550, 0.55625) — **zero** inversions beyond the band in either direction. Not fixed, not worsened.
- **N-5** (open manifestation panel takes pointer input over ~51% of the desktop stage): measured 880×533 px = **50.9%** of 1280×720. Stands.
- **N-6** (camera still spring-glides under reduced motion): at portrait under RM, a tap moved the camera centre 0.154 → 0.846 through **24 distinct centre values** — a glide, exactly as recorded — while crowd time stayed frozen. Stands; the policy call remains the founder's.
- **N-7** (frame cost): in my full-load simultaneity window — 58.8 fps, frame p99 16.8 ms, **0 long tasks**. No cliff; stands (not worsened).
- **N-3** stands as the critic graded it: NEEDS-CHECK on the published coverage figures because the definition was never published. Every measurement taken since — the critic's (90–100%) and this verification's exercise runs (97.1% / weakest corner 79.3%; a second run 97.8% / 85.8%) — meets or beats the claim. The capability is not in doubt; the unpublished definition is the open item, and it is a documentation item, not a defect in the room.

## 7. THE FIVE PROOFS STILL STAND — AND TOGETHER

The composed exercise's 42/42 (run by my hand) carries all five proofs in the fixed host. My own simultaneity spot check (probes V5, V5b), independent of the exercise: a conversation and a manifestation opened **at the same time** while the crowd worked —

- crowd time advanced 10.2 s across a 9.2 s wall window (full rate, undisturbed);
- all 3 conversation beats delivered and the conversation ended cleanly;
- the manifestation reached MATERIALIZED inside the same window;
- inhabitants moved throughout; 58.8 fps, 0 long tasks;
- a 100 ms bubble census shows **all three lines reached the screen** in turn — Solnik's greeting, the clerk's Day-Book line, and the product's own line: *"One coin, eight stages, nothing hidden between the layers. That is the whole mechanism."*

## FINDINGS LEDGER

| Item | Grade |
|---|---|
| B-1 companion pin (silent, permanent) | **CONFIRMED fixed** — re-proven §1 |
| B-2 speech bubbles off-frame | **CONFIRMED fixed** — re-proven §2 |
| N-1 pair floor not post-collision | **CONFIRMED fixed** — re-proven §3 |
| N-2 product + paper outside the one light | **CONFIRMED fixed** — re-proven §4 |
| Fix pass's mutation claim | **CONFIRMED honest** — §5 |
| S→N corner rest (verifier's own suspicion) | **REJECTED** — floor-geometry rest, mechanism in §1 |
| N-3 coverage figures | **NEEDS-CHECK stands** — definition unpublished; capability ≥ claim in all measures |
| N-4, N-5, N-6, N-7 | **Stand as recorded** — not fixed, not worsened (§6) |
| New defects found | **None** |

**Bottom line for the captain:** the fix pass did what it said, the exercise suite is honest (it catches the very defect it claims to catch), and Seat J — the composed world — **stands verified at mechanism level**, with N-3's definition and the N-4–N-7 policy items carried open exactly as recorded, and the founder's visual judgment of the room's final look still his alone.

*Verification workspace (probes, outputs, mirror, hash records): `~/workspace/seatj-verify/`. Cost: $0.*

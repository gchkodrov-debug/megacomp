# SEAT J — FIX PASS · The Composed World (FVR-31)

**Seat:** Fix pass (builder's seat, second Relay position)
**Subject:** `living-universe/construction/composed-world/` — the relay critic's report
`SEATJ_RELAY_CRITIC_2026-11-26.md` as the work order; its probes (`~/workspace/seatj-critic/`)
reused verbatim as acceptance tests, run against the real tree from `~/workspace/seatj-fix/`.
**Date:** 2026-11-26 · $0 spent.

---

## The short version, in plain words

The critic found two things that blocked and two that mattered. All four are fixed,
and every fix was proven on the critic's own measuring instruments, not mine.

**Solnik can cross the room now.** He used to follow the visitor in a straight line,
so when the visitor walked from the north side of the reading desk to the south side,
Solnik pressed himself against the desk's north face and stayed there forever —
still "walking," never arriving, never saying a word about it. He now has his own
routed locomotion, the same machinery the visitor and every library inhabitant walk
on: he goes around the desk's end and settles beside the visitor on the far side.
If a target ever truly cannot be reached, his locomotion says so through the same
announcer the visitor's failures use. Nothing is silent any more.

**Every spoken line can be read, on both screens.** Speech bubbles used to be placed
exactly over the speaker's head with no regard for the frame, so at phone size the
desk-clerk's line — the conversation's third beat — rendered entirely off-screen.
The bubbles are now clamped into the visible frame, and a small tail still points
from the bubble toward the speaker, so you know who is talking.

**The two-body floor is now true in the frame itself.** The rule that keeps Solnik
out of the visitor's personal space used to run *before* the furniture collision,
which could shove him straight back into the visitor — the host's own sampler caught
them 0.020 apart against a promised 0.084. The resolve now runs last in the frame,
and it is furniture-aware: when the straight push is blocked by the desk, Solnik
slides along the face instead of trading one violation for another. The floor now
measures 0.0840 in every instrument, and he is never inside the furniture either.

**The product and the paper joined the room's one light.** The manifested coin wore
a fixed CSS shadow that never changed as the lamplight breathed, and the folded
paper on the desk carried no light values at all. Both now read the frame's single
light object, like every body in the room.

The composed exercise grew from **36 to 42 checks** — the critic's cases are now
permanent residents — and passes **42/42**. The full regression battery is green.
One shared module changed (the companion, flagged loudly in §5); everything else
is inside the composed-world host.

---

## 1 · B-1 (BLOCKING) — Solnik pins permanently at the desk → FIXED

**The fix.** The companion (`avatar-system/companion.js`) gained an opt-in
**external-drive** mode: it still runs Solnik's whole brain — clock, follow-target
computation, catch-up speed, arrival greet, chuckle — and now *publishes* the
follow target every frame (`companion.followTarget`), but it neither aims nor
steps the walker. The composed host creates Solnik his **own `createLocomotion`**
(the guest's machinery; the same pattern the crowd uses for every chained
inhabitant) and drives it to the follow target (`_driveSolnik`): a re-route is
issued only when the target has actually moved, and issued once per move, so a
failed target is attempted once and **announced once** through the locomotion's
`onFail` → the host's announcer (`body: 'solnik'`), never retried in silence.
His arrivals close his announcer episode, like the guest's. Under reduced motion
his locomotion drains waypoints by placement — the guest's own RM law.

**The critic's exact case (probe 4b-C), before → after:**

| Measure | Before | After |
|---|---|---|
| Solnik depth trace | flat at **0.418** (the desk's north face) from 1 s to 20 s | 0.368 → 0.424 → **0.679 → 0.721**, settled by ~2.9 s |
| Final state | (38.0, 0.418), `moving: true` forever | (36.5, **0.721** — south of the desk), `moving: false` |
| Final pair distance | **0.385**, stuck | **0.139** (follow band) |
| Furniture penetration frames | 0 | 0 |

Probe 4's polling form of the same case: Solnik recovered at the **same sample**
the visitor arrived (max pair after arrival 0.1413; before: never recovered).
In the exercise (`fix.b1-solnik-crosses-the-desk`): settled at d **0.723**, pair
**0.137**, longest moving-but-far run **0.0 s**, 0 penetration frames, closest
approach **0.0840**.

**Mutation check (required):** with the routing disabled (`driveToWorld` in place
of `goToWorld` in `_driveSolnik`), the new exercise check **fails** — Solnik
stall-settles at the desk's face and never settles beside the visitor — and it is
the *only* failure (41/42). The fixed file was restored byte-identical
(sha256 `a2a1b9eb148a0…`) and re-verified 42/42.

## 2 · B-2 (BLOCKING) — Speech bubbles never clamped → FIXED

**The fix.** `_positionOverlays` now measures each pill and clamps its anchor
into the frame (half the pill's width on each side, its full height above the
anchor, 6 px margin), on both viewports, for the conversation bubble **and** the
whisper pill (they share the placement code). The horizontal shift is published
as `--tail-x`; the CSS draws a small tail at `50% + var(--tail-x)`, so a clamped
pill still points at its speaker's true projected position.

**The critic's exact case (probe 5c, 375×812), beat 2 — before → after:**

| Visitor position | Before (bubble left..right) | After |
|---|---|---|
| East (88, 0.82) | **−476.6 .. −225.9** — entirely off-frame | 6 .. 252, clipped **0** |
| West (10, 0.82) | **444.4 .. 533.8** — entirely off-frame | 279.8 .. 369.2, clipped **0** |
| Centre (50, 0.60) | −57 .. 193.6 — clipped 57 px | 6 .. 252, clipped **0** |

Beat 0's 11.3 px east clip is likewise gone. Every beat at every position now
samples `offFrame: false`. In the exercise: desktop — 20 bubble samples across
beats 0/1/2, worst overflow **0.0 px** (`fix.b2-bubbles-in-frame-desktop`);
portrait — **199 samples, 9/9 beats** (3 positions × 3 beats), worst overflow
**0.0 px** (`fix.b2-bubbles-in-frame-portrait`). The probe's frame-diff sweep
after the fix stays smooth (mean |Δ| 0.439, no spikes) — no strobe introduced.

## 3 · N-1 — Pair floor not post-collision guaranteed → FIXED

**The fix.** Two halves. (a) **Ordering:** `_resolvePair` now runs **last** in
the tick — after the visitor's locomotion, Solnik's locomotion (which collides
internally every frame), and the crowd — so the floor holds in the positions the
frame is sampled and drawn with. (b) **The resolve is furniture-aware:** the
pushed point is resolved out of every obstacle (`resolvePoint`, body radius,
floor bounds); when furniture eats the push (the desk-gap pin), Solnik **slides
along the face** to the tangential point at floor distance, preferring the side
his follow target is on. The write is positional only — `walker.place()` would
clobber his locomotion's waypoint target and stall the route; when his
locomotion is at rest, his rest target follows the push so he doesn't walk back
into the guest.

**The critic's exact cases, before → after:**

| Case | Before | After |
|---|---|---|
| Placed pin (probe 4b-B): host-sampler min pair | **0.0200** | **0.0840** |
| Placed pin: in-page recorder min pair | 0.084 | 0.084 |
| Placed pin: penetration / radius frames | 0 / 0 | 0 / 0 |
| Open play (probe 4-A, head-on drives): host min | 0.08370 | **0.08400** (same class, never below) |
| Pocket push (probe 4b-D): min pair / radius frames | 0.084 / 15 | 0.084 / 10 |

The floor and the furniture law now hold *simultaneously* — the reorder alone
would have traded the floor violation for one-frame penetrations in the placed
case; the slide is what lets both stand. Exercise: `fix.n1-pair-floor-post-collision`
— in-page min **0.0840**, host min **0.0840**, **0** penetration frames.

## 4 · N-2 — The product and the paper join the one light → FIXED

**Paper:** the folded paper's draw-list entry now carries the frame's `shade` and
`shadowOpacity` (was `null`/`null`), and `_drawPaper` consumes them — a ground
shadow at the frame's shadow opacity and the shared warm shade wash over the
paper's body, the same treatment every figure gets. (Its golden ring still
breathes on the sparkle cycle: a marker, like Solnik's crystal — not a light.)
The one-light draw-list count rises 7 → **8** entries, all equal to the frame's
light (`depth.one-light-treatment` still passes; `fix.n2-paper-in-the-light`
asserts the paper explicitly).

**Product:** the host drives both of the manifested product's DOM faces
(`.mf-artifact-img`, `.mf-parts-center`) from the frame's light object —
drop-shadow alpha = `shadowOpacity + 0.18` (clamped), brightness =
`1 + shade × 0.35` — written as an inline filter that overrides Seat E's fixed
stylesheet shadow, keeping Seat E's shadow geometry. Writes happen only when
the light has moved (the breath is slow). Exercise (`fix.n2-product-in-the-light`):
across 1.7 s of the lamp's breath the computed filter **moved** (shadow alpha
0.447 → 0.396) and tracked the host's `shadowOpacity` (0.218 + 0.18 ≈ 0.396)
within tolerance — where the critic measured a fixed .55 at both phases.

## 5 · Boundary — one shared-module change, flagged loudly

Changed source files, complete list:

| File | Change |
|---|---|
| `composed-world/composed.js` | Solnik's locomotion + `_driveSolnik`; tick reorder; furniture-aware `_resolvePair`; pill clamp; `_lightProduct`; paper light; snapshot gains `solnikLoco` |
| `composed-world/composed-world.css` | the pill tails (`::after` + `--tail-x`) |
| `composed-world/exercise.cjs` | +6 permanent checks (below) |
| `composed-world/README.md` | check count + fix-pass pointers |
| **`avatar-system/companion.js`** | **THE shared-module change (B-1 required it):** opt-in `drive: 'external'` mode + `followTarget` publication. Default mode is behaviour-identical — it still aims and steps exactly as before when the option is absent. |

The companion's other two hosts were not touched and prove the default path:
avatar suite **17/17** (its companion tests pin the self-drive behaviour),
wiring stage exercise **22/22**, cinematic-library exercise **exit 0** (its
Solnik follows under default drive). Everything else in the tree is untouched;
the only other modified files are exercise frame-capture PNGs regenerated by
running the battery itself — the same class the critic recorded in its own
boundary scan.

## 6 · Exercise — 36 → 42 checks, all permanent

New checks, each replicating the critic's case verbatim: `fix.b1-solnik-crosses-the-desk` ·
`fix.n1-pair-floor-post-collision` · `fix.b2-bubbles-in-frame-desktop` ·
`fix.b2-bubbles-in-frame-portrait` · `fix.n2-product-in-the-light` ·
`fix.n2-paper-in-the-light`. The pair recorder is the critic's instrument
(in-page ~60 Hz, pair + penetration). Final record on the shipped bytes:
**42/42 passed** (run twice: before the mutation and after the byte-identical
restore; the mutation run scored 41/42 with only `fix.b1` failing, as required).

## 7 · Full regression battery (re-run by this seat, after the fixes)

| Suite | Result |
|---|---|
| World engine (node) | 81 passed, 0 failed |
| Geometry (node) | 75 passed, 0 failed |
| Avatar system (node) | 17 passed, 0 failed |
| Manifestation engine (node) | 24 passed, 0 failed |
| Camera rig (node) | 68 passed, 0 failed |
| Crowd life (node) | 14 passed, 0 failed |
| Camera rig (exercise) | 11 passed, 0 failed |
| Crowd life (exercise) | 12 passed, 0 failed |
| Wiring stage (exercise) | 22/22 |
| Cinematic library (exercise, server :8471) | exit 0 — all named proofs true, zero page errors |
| **Composed world (exercise)** | **42/42** |

## 8 · Honest edges

- **The slide is one attempt.** `_resolvePair` tries the straight push, then
  one tangential slide (both directions). A geometry where all three are
  blocked keeps the best legal point and the floor yields for that frame.
  No such geometry occurs in this room's cases (all probes: floor exact,
  penetration zero) — the limit is stated so it is on record.
- **Reduced motion changed Solnik's hop shape.** He used to be placed
  directly onto the follow point in one step under RM; routed, he is placed
  waypoint-by-waypoint along his route (the locomotion's RM law — the same
  law the guest already obeyed). Placements, never a glide; all RM checks
  pass unchanged.
- **A guest standing in the corridor.** If the visitor stands exactly on
  Solnik's route, his locomotion's progress backstop can settle him short
  (F-8 semantics: a settled drive is over, not arrived). He rests at
  pair-floor distance beside the guest — the follow's purpose — and any new
  follow target re-routes him. Never observed as a strand in any probe.
- **The whisper pill's clamp is proven by code path, not by a sampled rect:**
  no deterministic whisper fired during the portrait B-2 runs (the critic's
  probe had the same gap). The whisper shares `place()` with the bubble,
  whose 199 in-frame samples are the evidence for the mechanism.
- **N-3 – N-7 were not touched**, per the brief: the coverage-definition
  note, the z-quantization bands, the open panel's input footprint, the RM
  camera policy, and the room-tone hardening all stand exactly as the
  critic recorded them, for the founder and future seats.
- **The settle question is still the founder's.** This run's step samples:
  cinematic ~739 ms, brisk ~427 ms (the builder measured 762/391 — sampling
  variance; the switch and both frame sequences are unchanged).

— Seat J fix pass. The four findings are closed on the critic's own cases;
the relay's verifier judges next.

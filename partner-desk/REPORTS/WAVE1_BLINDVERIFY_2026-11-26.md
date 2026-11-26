# WAVE 1 — BLIND VERIFICATION (Seats A–D fix pass)

**Seat:** Blind verifier, fresh — built none of this, fixed none of this.
**Date:** 2026-11-26
**Subject:** `WAVE1_FIXPASS_2026-11-26.md` against the Relay Critic's 12 items
(`WAVE1_SEATD_CRITIC_2026-11-25.md`).
**Method:** the fix log was treated as unproven claims. Every item was
re-derived with this seat's own probes: direct Node execution against the
shipped modules, a mirrored-tree rot test at identical directory depth,
this seat's own puppeteer runs of both hosts (own clicks, own sampling,
own rect arithmetic, own screenshots), and pixel-level reads of the
frames. Code was read-only throughout; all mutation happened in /tmp
copies. No desk filing (the captain files).

## Suite totals — verifier's own runs

| Suite | Fix log claims | Verifier ran | Page errors |
|---|---|---|---|
| world-engine.test.cjs | 81 | **81 passed, 0 failed** | — |
| geometry.test.cjs | 75 | **75 passed, 0 failed** | — |
| avatar-system.test.cjs | 17 | **17 passed, 0 failed** | — |
| manifestation.test.cjs | 24 | **24 passed, 0 failed** | — |
| wiring/exercise.cjs | 18/18 | **18/18 checks passed** | 0 |
| cinematic-library/exercise.cjs | all green | **complete, all legs nominal** | **0** (`pageErrors: []`, `pageErrorsFinal: []`) |

Every claimed total matches exactly.

---

## Per-item verdicts

### ① A-1/A-2 — identity restore fenced · **CONFIRMED**

Executed directly against `avatars.js` (this seat's own calls):

- Critic's forgery 1 — `createIdentity({state:'citizen', avatarId:'elder'})`
  → serializes as `{"state":"guest","displayName":null,"avatarId":"guest","granted":false}`. Demoted fully.
- Critic's forgery 2 — `createIdentity({state:'named', avatarId:'smith'})`
  → guest, same shape. Demoted fully.
- Own variants: citizen + name but no grant → **named** (grant is the missing
  evidence); citizen + `granted:true` but **no name** → **guest**;
  `granted: 1` (truthy, not `true`) → named (the gate is strict `=== true`);
  empty / whitespace-only names → guest; guest record carrying a name +
  registry avatar → re-fenced to guest silhouette, name dropped.
- Legitimate path intact: guest → `assignName` → `chooseAvatar` →
  `grantCitizenship()` serializes `{citizen, name, elder, granted:true}`;
  restore of that record round-trips **twice** with the standing and the
  `granted` evidence preserved. A named record round-trips as named.

One honest note, not a defect: a record carrying *both* a name and
`granted:true` restores as citizen — that is the evidence model working as
specified (that pair of fields *is* the record the live grant path
produces). Every record claiming more than its evidence proves is demoted;
that was A-1, and it is closed.

### ② M-1 + W-6 — data paths resolve, rot alarm real · **CONFIRMED**

From a clean shell, resolving each reference from its own file's directory
(the stated root): **all 10 references exist** — 3 product artifacts
(Mint coin 316,990 B · Keeper frame 60,428 B · Star Compass SVG 1,104 B,
a real authored brass-compass SVG, present on disk) and 7 scene backdrop
references (5 stills — library and manifestation share one still file —
plus 2 film entries to `record-reading-room_take1.mp4`, 4,468,587 B).
The Mint coin's md5 (`981b1c6136101f00ec7c7bd060ae7a4f`) matches the
canonical `newwave/build/coin-front.webp` and Seat D's local copy.

Rot alarm, tested in a **mirrored tree at identical depth** (symlinked
asset roots, so only the broken path differs): baseline manifestation
24/24 and world 81/81 green; breaking the Keeper `src` → manifestation
suite **fails, naming the keeper path**; breaking the street `still` →
world suite **80 passed, 1 failed, naming the street path**. The alarm
fires and names the rot.

### ③ D-1 — Seat D host locomotion routed · **CONFIRMED** (Seat D) — pocket finding for Seat F below

This seat's own run of Seat D's exercise: the through-table click's
straight line provably crosses both panels (`straightLineCrossesTable:
true`); the visitor routed around the table's east end — **38 samples,
0 inside either panel footprint, arrival error 0.026** (fix log: 35–36 /
0 / 0.019–0.022; sampling counts are timing-dependent, the class is the
same). Leg 1 also routes (3 waypoints, its in-band target resolved out to
the panel face).

**Pocket, reproduced in Node against Seat D's scene geometry** (obstacles
from `LIBRARY_SCENE` at the host's `depthThickness: 0.06`): the point
(0.474, 0.850) is legally placed (`resolvePoint` at body radius 0.042
moves it 0.0000) yet `route(pocket → far target)` returns **null**;
0.02 further south routes; the host's escape resolve at radius 0.09 lands
at (0.490, 0.895) (log: (0.489, 0.895)) and the route from there —
(0.512, 0.863) → (0.512, 0.698) → (0.472, 0.417) → target — matches the
log's prediction to ±0.001.

**Pocket, live in Seat D's host (this seat's own browser probe):** visitor
placed at scene (73.7, 0.85), far-side floor clicked — 90 position
samples, **0 inside either panel**, arrived at (52.92, 0.304) against the
(52, 0.30) target, error 0.019. The host-level cure works in the real host.

#### ⭐ The pocket case in Seat F's host — stated separately, as ordered

**Finding: NEEDS-CHECK — a real latent defect in the shared locomotion
layer; cured in Seat D's host only; not reachable in Seat F's own scene
data today.**

- The layer Seat F's stage consumes has **no escape**: `createLocomotion.
  goToWorld()` cancels and returns `null` on an unroutable start, and
  `stage.js` calls `goToScreen(...)` **ignoring the return value**
  (stage.js:171; the door walk at :190 calls `goToWorld` the same way).
- Proven through Seat F's own `createLocomotion` with the identical
  pocket and obstacles: two different far taps both returned `null`,
  `busy` stayed false, and across **600 simulated frames the walker's
  displacement was 0.0000**. From a graph-isolated pocket, every tap dies
  silently and the body is stranded in place — it cannot be tapped out,
  because every route from that spot is null.
- **But:** a grid scan of all five scenes in Seat F's own demo data
  (`scenes.example.json`, the stage's default thickness 0.18, 0.02 grid,
  ~19,600 legally-placed points) found **zero** graph-isolated pockets.
  The stranding is latent in the wiring layer, not triggered by anything
  the wiring demo ships.
- Disposition: the fix log's recommendation is correct — the escape
  pattern (or a start/target connectivity step inside `route()`) belongs
  in the shared layer's next pass, and until then any claim that Seat F's
  stage is the general locomotion pattern must carry this caveat. It does
  **not** block Seats A–D: Seat D's host, the integration under verdict
  here, carries the cure, and Seat F's own earlier verification never
  claimed pocket starts.

### ④ W-2 — solid anchors require w/h > 0 · **CONFIRMED**

Own `validateScene` probes: occluding anchor without `w` → rejected
(error names the missing `w`); `w: 0` → rejected; without `h` → rejected;
`solid: true` without `h` → rejected. Non-solid anchor without w/h →
valid; `solid: false` opt-out on an occluding anchor → valid; solid
anchor with w/h → valid. The validator's notion of "solid" matches the
geometry layer's.

### ⑤ D-10 — separated parts readable · **CONFIRMED**

This seat's own screenshot (`/tmp` probe frame, SEPARATED state, desktop)
and this seat's own rect arithmetic on the live page: **worst pairwise
card overlap 0 px²**; no card's text is clipped (every card's and text
node's `scrollHeight` equals its `clientHeight`); 8 golden thread lines
present. Reading the frame: all eight cards are fully legible, including
every line the critic found cut — "…why it should exist, who it is for",
"A no is the service working", "— not a purchase", "We never hold keys or
funds" are all complete. The fix is host-side (measured re-stack); the
engine's anchor data is untouched and the threads land on the cards'
real positions.

### ⑥ D-2 (critic) — touch discipline in Seat D's host · **CONFIRMED**

Computed styles read by this seat in two independent browser runs:
stage `touch-action: "none"`, body `overscroll-behavior: "none"`, html
`overscroll-behavior: "none"`. (Scope note: the host's tap still rides
the `click` listener rather than `pointerdown`; the critic scoped this
item to the stylesheet discipline, and within that scope it is complete.)

### ⑦ M-2 — REASSEMBLING reconciled · **CONFIRMED**

Own stub-adapter probe: parts host `hidden = false` at SEPARATED, still
**false throughout REASSEMBLING**, `true` again at WHOLE. Own host probe:
6/6 samples taken during REASSEMBLING show state `REASSEMBLING` with the
parts host visible; 0 parts visible at WHOLE. The render() comment, the
README (§ REASSEMBLING bullet) and the suite's pin all now state the same
law — visible through reassembly, hidden at WHOLE. The three texts agree
with the behaviour because the behaviour was measured, not read.

### ⑧ D-3 + M-6 — destroy() called and tested · **CONFIRMED**

Host: `openManifestation()`'s rebuild calls `mf.destroy()`
(cinematic-library.js:514); the remaining `innerHTML` writes in that file
are figure/plane rendering, not the manifestation mount clear.
Engine census, this seat's own: **10 create+destroy cycles on one mount**,
each controller left mid-UNROLLING with a pending completion → after the
cycle the mount holds **0 children** and the scheduler **0 pending**; a
live root carries 7 click listeners before destroy and **0 after**; the
root is removed from its mount; a post-destroy flush never advances the
state; post-destroy actions throw `ManifestationStateError`.

### ⑨ W-1 — scene.ambient validated · **CONFIRMED**

Own `validateScene` probes: non-coprime `{dust: 10, glow: 15}` → rejected
with the coprime error; zero duration → rejected; non-numeric → rejected;
array ambient → rejected; coprime `{dust: 47, glow: 13}` → valid; single
duration → valid; absent → valid. The schema text honestly scopes it as
validated scene data the engine does not consume — documented enforcement
now exists and matches the documentation.

### ⑩ D-4 — "no corrective seeks" wording · **CONFIRMED**

The absolute claim survives only inside correction notes that explicitly
name it as falsified (cinematic-library.js:306, README). The live wording
at all three sites (header comment, looper comment, README film bullet)
now states what the code does: drift corrected by playback rate only;
the only seeks are the swap's own. The code has exactly two
`currentTime = 0` sites, matching the wording one-for-one: the
standby-not-ready rewind of the active film (counted —
`ledger.hardCuts++`, line 349) and the incoming film set to 0 at the
crossfade (line 354).

### ⑪ Test-gap sweep — the new pins assert what they claim · **CONFIRMED**

Each pin re-derived with this seat's own numbers, not merely read:

- **M-3 parchment content:** own controller builds render price values
  exactly `['$245', '$196']` (Mint) and `['$5']` (Keeper); rendered terms
  and price note are `===` the data strings; closed products render **0
  buy nodes** and the exact words "Purchasing is closed." The Keeper's
  data terms were checked **sentence by sentence against the genuine
  listing** (`live/listings/keeper.html`): all six sentences present
  verbatim, including "No billing period is implied." and "Checkout is
  not connected."
- **G-1 projection-y pin:** `tAt(0.5) = 0.373134` exactly; the engine's
  feet line at the same depth is 0.5 of the floor span; |0.5 − 0.373| =
  0.1269 > 0.1, as asserted. (Projection scale at 0.5: 0.888 vs engine
  `scaleAt` 0.82 — the labelled disagreement, pinned on both axes now.)
- **G-2 zWeight:** circle resolution at zWeight 1.35 lands at rim+radius
  in the *weighted* metric ((z−0.8)·1.35 = 0.132000) and provably not in
  Euclidean terms (0.0978 ≠ 0.132); the zWeight-1 control lands at exactly
  0.132 Euclidean. Rect inside-case exits at `minZ − radius/zWeight` =
  0.400000 vs the control's `minZ − radius` = 0.386000. All exact.
- **G-5 solid + occludes:false:** `obstaclesFromScene` returns exactly 1
  obstacle with edges derived from the anchor data (it collides), and the
  view-model z is 60 = `zOf(0.5, false)`, not 61 (it does not occlude).
  The two halves move independently, as pinned.
- **D-5 mobile overflow, measured by this seat** at 375×812 on its own
  mobile run: `docScrollWidth 375 = innerWidth 375`; manifestation panel
  `scrollWidth 343 = clientWidth 343`; the scrubber is present in
  SEPARATED and steps "1 / 8" → "2 / 8".

### ⑫ Carried visual defects — still honestly visible · **CONFIRMED (carried, not fixed)**

`frame-room.png` was re-shot during this seat's own exercise run (file
timestamp of this run) and read pixel-level:

- **D-8 flat figures** — the visitor, elder and scribe are flat paper-doll
  figures against the photoreal Reading Room film. Total style gap, as
  carried.
- **D-9 double-table apron** — the dark horizontal band crosses the room
  and the film's own long table continues visibly below it; the eye reads
  two tables stacked.
- **D-11 Solnik scale/light** — Solnik is the largest and brightest object
  in the frame; his head alone dwarfs the visitor's whole body beside
  him, though he stands *farther* (d 0.68) than the visitor — the depth
  cue reads inverted, and he glows against the room's light rather than
  being lit by it.
- **D-12 black slabs** — solid black blocks sit bottom-left over the
  film's floor and chairs, a black block floats mid-left, and black
  pillars letterbox both stage edges.
- **D-7 reduced-motion scribe** — confirmed in code, untouched:
  `updatePopulation` gates *all* walker updates behind `if (!reduced)`,
  so the cross-mode scribe placed offstage at build is never placed into
  the room under reduced motion.

No silent cosmetic fix was claimed or found: the fix log carries these
verbatim, the README's confession bullets stand, and the current frame
shows every one of them. Per the Zero Known-Defect Rule they block any
cinematic-quality PASS. They do not block mechanism verification.

### Rider — M-4 (NaN/negative price refusal) · **IN SCOPE — KEEP IT**

Judged on its merits: the critic's M-3 (CONFIRMED) named the exact
failure — "the parchment could render '$NaN'… and the suite stays
green." M-4 is that hole's other half, in the same validator, in the
same file family, at two lines' cost. This seat's probes: `NaN`, `-5`,
`Infinity`, `-Infinity` are refused on **both** price fields; `$0` and
`null` remain legal — no legitimate behaviour was narrowed. Striking it
would re-open a named defect to satisfy a list boundary. It stays.

---

## Overall ceiling

# VERIFIED AT MECHANISM LEVEL — Seats A–D

All eleven fixable items (①–⑪) are **CONFIRMED** on evidence this seat
generated itself; item ⑫ is confirmed carried, honestly and visibly.
The identity fences hold at restore as well as at transition; the shipped
data renders (every path resolves, and the suites now go red if one
rots); the one integrated host routes its visitor around the furniture,
escapes the corner pocket its own exercise discovered, tears its
manifestation controller down properly, and keeps its separated parts
fully readable; the documented laws (ambient coprime, solid-anchor size,
REASSEMBLING visibility, the counted hard cut) now exist in code and say
what the code does.

**Riders on the ceiling:**

1. **Seat F pocket (NEEDS-CHECK, §③):** the shared locomotion layer can
   strand a body in a graph-isolated pocket with silent dead taps —
   proven at layer level, unreachable in Seat F's own scene data, cured
   only in Seat D's host. It belongs on the wiring layer's next pass and
   must ride as a caveat on any "Seat F stage as general pattern" claim.
   It does not reduce this verdict, which covers Seats A–D.
2. **Cinematic quality is NOT verified and is not claimed:** D-8, D-9,
   D-11, D-12 (and minor D-7) stand as known defects in the current
   frame, blocking any cinematic-quality PASS under the Zero
   Known-Defect Rule.
3. **Out of scope, by standing law:** motion feel, physical-device
   performance, and the founder's device session were not judged by this
   seat and remain the open gates no relay seat can close.

*Blind verifier, 2026-11-26. No code changed (probes ran in /tmp; the
Seat D exercise re-shots its own frames by design). No desk filing — the
captain files.*

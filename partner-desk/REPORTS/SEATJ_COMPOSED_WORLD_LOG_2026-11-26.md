# SEAT J — THE COMPOSED WORLD · Build Log · 2026-11-26

## The short version, in plain words

The Library is now one living room with everything in it at the same time.

Before this seat, every part had been proven alone: the camera, the crowd,
the walking, the magic paper trick. Nobody had put them in one room
together — and two of the parts disagreed about who was in charge. This
seat built the one host where they all live together, and settled the
disagreement: the camera is the only pair of eyes, and the crowd is the
only population.

In the finished room: the real painted Library is on the walls. You tap
the floor and walk there, around the furniture. Solnik walks with you.
Five library people do their jobs — the archivist carries scrolls across
the room and stamps the ledger, the clerk minds the Day-Book, the reader
warns you about the stacks. A folded paper sleeps on the reading desk;
tap it and the Mint coin unfolds, separates into its eight parts, and
goes back together — while everyone keeps working. Solnik talks, the
room breathes lamplight, dust drifts, and quiet synthesized sounds come
from the direction of whoever made them.

It was all proven by machine in one run: **36 of 36 checks passed**, on
desktop and on a phone frame, and every older test suite still passes.

Two things this seat did NOT decide, on purpose: how stiff the camera's
settle should feel (two settings are captured as film strips — that is
the founder's call on a real device), and whether the room is beautiful.
The frames are saved for the founder's eyes. The machines only prove it
lives.

---

## 1 · What was built

A new, reusable host in `construction/composed-world/` — no shared
module was changed (see §7):

| File | Role |
|---|---|
| `index.html` | The host page: canvas, HUD (talk / camera-settle / sound controls), the manifestation panel mount. |
| `composed.js` | The composition: a renderer on the World Engine's contract that runs the locomotion, the companion, the crowd, the camera, the manifestation, the conversation, the announcer and the soundscape off the engine's one frame clock. |
| `composition.js` | Everything this seat authored, as DATA: camera data for the room, the two settle presets, the shared light, the lectern, the product, the conversation script, the sound levels. |
| `announcer.js` | The episode announcer — the F-9 multi-body fix (§5). |
| `soundscape.js` | The synthesized WebAudio soundscape: room tone + positional cues. No audio files exist; the HUD says so. |
| `composed-world.css` | The host's dressing. The manifestation panel wears Seat E's own `.mf-*` styles, imported unchanged. |
| `exercise.cjs` | The acceptance run (36 checks). `exercise-results.json` holds its last full record. |
| `captures/` | 15 frames: desktop + mobile mid-life, conversation, manifestation (both viewports), mobile walk, and both settle sequences. |

To run it: serve `next-build/` and open
`living-universe/construction/composed-world/`. To verify:
`node exercise.cjs` in that folder.

## 2 · The composition decisions (critic F-10, item by item)

The Wave-2 critic's F-10 named the disease: two population authorities
and two transform authorities coexisted, so no single frame could be
trusted. The composed host settles each item by construction, not by
convention:

**Population — the crowd won.** The host drives `scene.smartSlots`
through Seat H's `createCrowd` and nothing else. The stage's rival
`view.population` is not composed; stronger, the composed scene object
does not even carry the `population` field (the host deletes it when
assembling the scene from the crowd scene file, and says so in code).
Consequences that close with it: the RM-strobe defect's drivers (the
stage's population) are absent from this host (§5), and proxemics,
yield, separation and the crowd's RM switch all arrive as one system.

**Transform — the camera won.** `rig.project()` places everything that
is drawn (plate window, backdrop silhouettes, anchors, the paper,
bodies, dust, speech bubbles) and `rig.sceneFromScreen()` reads every
tap, which the locomotion's `unproject` consumes. The stage's layered
mapper is not imported. The rig's contract is honoured at both
re-solve points (boot, resize): `setViewport` is always followed by an
update before any projection.

**The draw list — one list, one sort.** Every drawable — backdrop
silhouette layers, anchors, the folded paper, crowd inhabitants,
Solnik, the visitor — enters a single array sorted by the engine's one
z law. This closes the "footY single-sort" adopt item at system level:
in the final run's draw list, the foreground lamp-stand sits at z 90
and the near pillars above it, with bodies interleaved by their own
depth — a body passing behind the lamp-stand or a pillar is occluded
by construction, not by a second pass.

**The scene — one source.** The composed scene is the Wave-2 crowd
file's Library (room + smartSlots, one file, one truth) merged with
this seat's camera data. `routes` is emptied: this host is one room;
doors are other seats' work.

**Solnik — the companion, held to the house law.** Solnik rides Seat
B's companion follow, and the host steps his walker through the same
per-frame furniture resolve the locomotion applies to routed bodies,
plus one composition addition of my own: a pair resolve that pushes
**Solnik** (never the guest) out of the visitor's disc to the two-body
floor — the crowd's F-6 law ("the inhabitant always moves") applied to
the companion, because the follow's own retreat (0.34 u/s) is slower
than the visitor's walk (0.55 u/s) and a head-on visitor could
otherwise walk through him. Measured effect: closest approach across
all exercise legs was **0.084 world units** (exactly the floor) against
**0.002** (full overlap) without it. Flagged here as a composition
decision for the critic: it lives in the host, not in the companion,
because whose job the pair law is belongs to the composition.

**Failures — one funnel.** The visitor's locomotion failures and the
crowd's chain-unreachables both report through the episode announcer
(§5). The status line shows announcements; the record counts
everything.

**Light — one object.** Each frame computes a single light object from
the scene's lamp data and the master clock's lampGlow cycle (grade,
glow, shadow opacity, figure shade). The plate grade, the lamp glows,
every figure's shadow and shade wash, Solnik's crystal and the dust
all read it. The probe asserts it: all 7 bodies in the draw list carry
the frame's identical shade and shadow values — no per-body lighting
islands exist to disagree.

**Sound — geometry from the same authority.** Cue pan/gain are
computed in the host from `rig.project()` (pan) and geometry distance
to the visitor (gain). The soundscape module owns only voices: room
tone (shaped noise + a 59 Hz lamp hum), a whisper chime, a paper
sweep, a materialize bell — all synthesized, all recorded with their
pan/gain whether or not the context is audible yet, so the spatial
math is probeable without ears. Mute is a master gain of exactly 0 on
the HUD's sound button.

**The manifestation — in the room, not on top of it.** The folded
paper is a drawable IN the z-list, resting on the desk anchor; a tap
within its projected disc opens Seat E's engine in a docked panel
while the world keeps living behind it (proven in §4, Proof ⑤). On
MATERIALIZED, Solnik speaks the product's own line and registers the
product present, exactly as the wiring stage taught him. While the
panel is open the in-world paper hides — it is in the visitor's hands,
not on the desk.

**Conversation — pre-existing words only.** The three-beat exchange is
assembled solely from lines already on record: Solnik's Library line
verbatim from the prototype journey, the desk clerk's whisper text
verbatim from the crowd scene (spoken by the clerk, at his desk), and
the Mint's own product line (spoken by Solnik as he points at the
desk). No new Solnik copy was authored. Beats are timed on the world
frame clock — no wall-clock timers drive anything in this host.

**Ambient life — the clock's own cycles.** Dust (61 s), lamp glow
(13 s), sparkle (29 s) and the coupled scenery cycle (47 s) are the
World Engine's DEFAULT_CLOCK, untouched: coprime, never restarting
together. The host adds no cycles of its own.

## 3 · Scenery inventory + needs list

The room wears the Library scene's own authored backdrop:
**`town-art/genspark-batch7-2026-11-25/04-record-hall-reading-room.jpg`**
(1344×896, the long reading table with green banker's lamps under
two-storey stacks) — the scene data named it; the host loads it from
`scene.backdrop.still` and crops it through the camera window. The
manifestation's artifact is the canonical coin,
`construction/cinematic-library/coin-front.webp`.

Filed Library/record-hall stock NOT used, and why: batch3
`12-library-of-records.jpeg` and batch14 `04-record-hall-census-desk.jpg`
(portrait-leaning plates; the scene's authored backdrop is the batch7
room, and one room wears one backdrop), batch6
`04-record-hall-stacks-aisle.jpg` and batch13
`04-record-hall-map-room.png` (different rooms of the hall — they
belong to scenes this host does not compose), batch #2
`record-ledger.jpeg` (a prop close-up, not a room). The room's film
(`assets/record-reading-room_take1.mp4`) exists but the host wears the
still: a camera window crops a still exactly, and the film's fixed
framing would fight the rig — the same reasoning the stage recorded.

**Needs list (named, not substituted):** one plate the composition
would genuinely use is missing from stock — **a foreground occlusion
plate for the Library**: a dark, near-camera element (stack edge or
pillar face, shot close, mostly silhouette) that the near layer could
wear as art instead of the flat silhouette shapes the scene data
authors. The composition works without it (occlusion is proven in the
z-order), but the near pillars are the one place the room wears a
drawing instead of a photograph. If a future Genspark batch fires
against a needs list, that is the Library's entry: *"record hall,
extreme foreground stack edge in near-silhouette, dark walnut and
shadow, 3:2"*.

## 4 · The Five Proofs — evidence from the acceptance run

One run, both viewports, all simultaneous (`node exercise.cjs`,
36/36, exit 0; two full runs produced the same verdicts):

**① The visitor walks freely.** Leg A into the Wave-1 pocket corner
(73.7, 0.85): arrived, final error 1.73 scene units. Leg B, the long
cross-room walk: arrived, error 1.68. The west-slot target (2, 0.28) —
whose only fallback is sealed behind the shelf's inflated edge —
retried and **failed visibly**: recorded 0→1, announced 0→1, status
line "Unreachable: visitor could not reach its target (unreachable)".
A desk-centre target resolved honestly to the desk's edge: the visitor
stopped at (50.5, 0.42), **never inside the furniture**. A recovery
walk after the failure arrived (error 2.42). Four interior targets
were probed during development (desk, shelf, lamp): every one resolves
to its nearest legal ground — this room contains no silently-stranding
target.

**② Solnik accompanies naturally.** Across the cross-room walk Solnik
travelled 0.46 world units alongside; after the walk he rests at
0.083–0.084 (the follow band / pair floor). Closest visitor↔Solnik
approach across every leg: **0.084** — the floor itself, never an
overlap (see §2 for the pair-resolve decision this required).

**③ Inhabitants pursue meaningful activities.** Frame 1: every
inhabitant boots mid-phase (minimum phaseAtBoot **0.307** — nobody
starts at zero). Across 7 s all five activity phases advanced; the
archivist's chain progressed step 2→5, his scroll carried and put
down. The clerk's proxemic whisper fired on approach (cue recorded,
pan −0.17, gain 0.94 from his projected position) and the reader's
whisper appears in the mobile-walk capture. Honest scope note: only
the archivist carries a multi-step chain in the scene data; the other
four pursue single activities with proxemic and yield behaviour —
that is the scene Seat H was given, composed faithfully.

**④ The camera directs.** Desktop: cover framing, scenery coverage
75.9% of sampled canvas pixels. Portrait: adaptive framing with the
portrait focal box active (window 0.308×1.00 of the plate), scenery
coverage **97.2%**, weakest corner **79.9%** — the actual Library
composes on the phone frame; there is no diagnostic rectangle (the
failure mode in the frames ChatGPT inspected). Portrait follow carried
the camera centre 0.154 → 0.843 in plate space behind the walking
visitor, look-ahead lead peaking at 0.090. This closes the "portrait
camera-follow" adopt item at system level.

**⑤ The world stays alive during a conversation AND a manifestation.**
Conversation (3 beats, world t 26.3 / 29.7 / 33.1): inside its window
crowd time advanced **10.6 s**, inhabitants moved, the lamp phase
advanced. Manifestation (state path UNROLLING→MATERIALIZED→SEPARATED→
FOLDED): crowd time advanced **2.6 s** across the unroll–materialize–
separate window; Solnik registered the product present and spoke its
line ("One coin, eight stages, nothing hidden between the layers…");
positional cues recorded in order — whisper ×3, paper, bell.

**The settle question — captured, not decided.** `CAMERA_SETTLE` in
`composition.js` is the one named place; the HUD button and
`host.setStiffness()` switch it. Same subject step (centre travel 0.69
of the plate), Seat G's step protocol: **cinematic (omega 9) settled
in ~762 ms; brisk (omega 17) in ~391 ms** (two runs: 762/391, 780/380).
Four arrival-relative frames per setting are in `captures/`
(`settle-cinematic-1..4.png`, `settle-brisk-1..4.png`). A walked
arrival measures ~0 ms at both settings — the visitor eases out and
the spring is already home — so the step is the honest instrument.
The choice is the founder's, on his device.

## 5 · Carried-fix verdicts

**RM STROBE — CLOSED in the composed host.** The defect lived in the
stage's population drivers; this host composes none. Under emulated
`prefers-reduced-motion: reduce`: crowd time froze at 0.52 s across
10 samples over 2.5 s, and **every body — visitor, Solnik, all five
inhabitants — held its exact position in every sample**. Nothing
teleported, nothing strobed. An RM tap then PLACED the visitor at its
target by the walker's own law (38.0 → 30.0, no glide), and releasing
RM resumed crowd time (0.65 → 1.85). The manifestation is likewise
built with `reducedMotion: true` under the flag.

**F-9 multi-body debounce — FIXED, in `announcer.js`.** Announcements
now dedupe per (body, reason, target) **episode**: an episode closes
when the host reports the body recovered (an arrival, a chain advance)
or after 20 s quiet. The verifier's exact attack, run against the
composed host's announcer: two bodies failing alternately at one
target — **4 recorded, 2 announced, 2 suppressed** (the stage's
last-key debounce announced 4/4; the verifier's run recorded 296/296).
After body A recovers, its next failure announces again (3rd) — an
episode is a failure's lifetime, not a gag. The record stays complete:
`recorded` counts every failure ever handed in.

**Watch item — mixed-class crowd pairs.** Not worsened, not touched:
the crowd module is composed exactly as verified; its documented
scope (same-class pairs separate; mixed-class pairs may overlap) is
unchanged in this host. No new overlap source was added — the one new
pair interaction (Solnik↔visitor) resolves to a hard floor.

**Watch item — the visitor floor's snowplow.** The floor held
everywhere in the composed geometry: closest visitor↔inhabitant
approaches were archivist 0.090, desk-clerk 0.090, reader 0.206,
lamp-tender 0.180, cataloguer 0.090 — the F-6 floor value itself,
never below. And the return half of the item: at the exercise's end,
**all five inhabitants were home** (distance-to-home < 0.3 world or
visibly working) — nobody stayed shoved down a corridor in this
room's geometry.

## 6 · Mobile evidence

Two phone passes: the desktop page re-framed to 375×812 (adaptive
verified live, coverage 97.2%, follow + settle sequences run there)
and a **fresh page loaded at 375×812** — portrait composition from the
first frame, manifestation opened and materialized on the phone
(`captures/mobile-manifestation.png`: the coin whole in the panel,
Solnik's product line beside it, the Library behind). The
manifestation engine is built with its mobile form on narrow frames
and rebuilt if the breakpoint changes under it while folded.

## 7 · Boundary + regressions

New code only in `construction/composed-world/`. **No shared module
was modified** — the carried fixes needed none: the RM strobe's
drivers are simply not composed, and F-9's multi-body form lives in
the host's announcer, the stage's own debounce being the stage's
business. The one behavioural addition inside the host (the
Solnik↔visitor pair resolve) is flagged in §2.

Every prior suite, re-run after this build:

| Suite | Result |
|---|---|
| World engine | 81 passed, 0 failed |
| Geometry | 75 passed, 0 failed |
| Avatar system | 17 passed, 0 failed |
| Manifestation engine | 24 passed, 0 failed |
| Camera rig (node) | 68 passed, 0 failed |
| Camera rig (exercise) | 11 passed, 0 failed |
| Crowd life (node) | 14 passed, 0 failed |
| Crowd life (exercise) | 12 passed, 0 failed |
| Wiring (stage exercise) | 22/22 checks passed |
| Cinematic library (Seat D exercise, needs its server on :8471) | exit 0, all named proofs true, zero page errors |
| **Composed world (this seat)** | **36/36 checks passed** |

## 8 · Honest edges (what the frames will show the founder)

- **Figure scale is the house law, and it is large.** Bodies stand
  ~46% of the plate's height at the near band — the same proportions
  the verified stage draws — so on the tight portrait window the cast
  fills the frame. The composition is faithful; whether the scale
  serves the founder's cinematic intent is his eye's call, and the
  captures show it plainly.
- **Speech pills can hug the frame edge** when a speaker stands near
  it (visible in `settle-cinematic-2.png`): the pill centres on the
  speaker's projected position and wraps narrow. Cosmetic; the text
  is never lost, but a clamp belongs in a later polish pass.
- **The near pillars are drawings, not photographs** — the one
  scenery gap, named as the needs-list entry in §3.
- **Solnik's pair resolve is a host behaviour**, adopted by this seat
  for the composition (§2); if the relay prefers it inside the
  companion module, it moves there cleanly — it is 15 lines and one
  law (the companion yields, the guest never does).

— Seat J, the composed world. The room is built; the relay judges next.

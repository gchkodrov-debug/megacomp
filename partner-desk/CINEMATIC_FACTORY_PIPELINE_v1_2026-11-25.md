# TEAM B — CINEMATIC FACTORY PIPELINE PROPOSAL v1
### FVR-31 · Founder's Direct Order, Order 10 deliverable 3 · Captain's proposal
**Written:** 2026-11-25 (evening) · **Status:** PAPER ONLY — no generation, no spending, no deployment
**Companion investigations:** Gemini #123 (deep Google-ecosystem investigation, separate) · ChatGPT (independent challenge, separate)
**Evidence rule:** every number below is either (a) measured in our own production records — queue file, FLOW_WATCH_STATE, ET-120 assembly log, Sound Gate records — or (b) labeled **UNVERIFIED**. Nothing in between.

---

## 0. THE ONE-PARAGRAPH ANSWER

We already own a working cinematic factory; it is just shaped like a relay, not a machine. Scenery is manufactured at **zero credits** (Genspark free lane, 204 images filed, batch #12 running). Films are manufactured at **10 credits per 8-second master** (Veo 3.1 Fast, proven across Jobs 1–3 and Films 02–16). Examination is **fully automated** (sound measurement, Sound Gate loudnorm fix, camera-lock sampling, bookend RMSE, keyframe counts). Assembly is **proven in code** (ET-120: 171 tests passing, dual-video phase-offset crossfade, one master clock). The single non-automated step in the entire line is **one human finger pressing Generate in Flow** — and the evidence says that finger currently has to be the founder's, because Google's automation wall refuses the captain's isolated browser profiles while accepting the founder's home session. The pipeline below is built around that fact, not around the hope that it changes. Gemini #123 exists to test whether Flow Agent / workflows can remove that step; until it reports, the plan assumes it cannot.

---

## 1. PROVEN UNIT ECONOMICS — FROM OUR OWN PRODUCTION, NOT BROCHURES

### 1.1 The price list we have actually paid

| Unit | Model | Cost (measured) | Output (measured) | Source record |
|---|---|---|---|---|
| Scenery / machinery / portal clip, 8 s | Veo 3.1 Fast, Frames, 720p→1080p download | **10 cr** | 7.85 s · 24 fps · 188 fr · 1920×1080 | Jobs 1, 2, 3 (queue file exam records) |
| Character-with-voice clip, 15 s | Omni 1.2 Flash, Frames, 720p | **60 cr** (= 4 cr/second; Omni prices by length via slider) | 14.93 s · 358 fr · lip-synced speech | Job 4 (queue file; brief's 24 cr estimate was corrected in the open before firing) |
| Shoot Book product/institution film, 8 s | Veo 3.1 Fast, Frames, 9:16 | **10 cr** | 7.85–8.0 s · h264 + AAC | Films 02–13 (FLOW_WATCH_STATE, per-film balance deltas 10 cr each) |
| Sound fix in post | ffmpeg loudnorm I=−16 (our own machine) | **0 cr** | Whisper takes raised to gate: −36.1 → −24.9 dB (Film 15) · −32.4 → −21.7 dB (Film 13) · −38.2 → −29.7 dB (Film 16) | Sound Gate records |
| Scenery still | Genspark free AI Image lane (Seedream) | **0 cr** | 1344×896 class stills, batches of 20 | Batches #1–#11 filed = 204 images; batch #12 running |
| Examination of one landed clip | Captain's tooling (ffprobe / volumedetect / frame extraction) | **0 cr** | Sound mean/max · camera-lock verdict · bookend RMSE · keyframe count | Exam records, Jobs 1–4 |

**Totals actually spent on the Living Universe set:** Jobs 1–4 = **90 credits** (10+10+10+60) of Account 2. Gemini #120 had approved 54 for the same queue; the +36 delta is entirely Job 4's length correction (15 s of speech instead of 8 s), advised by the captain and accepted by the founder *before* firing. Lesson priced into §4: **voice work costs 6× a silent master per clip — budget it as a separate currency.**

### 1.2 The examination gates (every landed clip, no exceptions)

A clip does not count as landed until it passes, or is formally dispositioned against, four automated checks:

1. **Sound Gate** — mean volume measured on the downloaded file (previews play silent; the file is the only evidence). Floor: −30 dB mean. Below floor → automatic loudnorm fix + re-measure; only a take still failing after the fix is re-fired. Proven on Films 13, 15, 16 and Jobs 1–4 (all four Jobs passed with no fix: −18.2 / −20.9 / −13.8 / −25.1 dB).
2. **Camera registration** — sampled frames compared; any unanchored drift, push, pan or lens breathe fails the clip for scenery/machinery use (Gemini #120 clip-killer #1). Jobs 1–3: locked, pass.
3. **Bookends** — first/last frame RMSE against the ≤8 hard-cut gate. Jobs 1 and 2 measured 19.94 / 19.52 — *above* the hard-cut gate, and that is expected and acceptable: loop integrity is assigned to the Engine's phase-offset crossfade (#120 method 2), not to the file. Two captain attempts to bake the seam into the file failed verification (RMSE 47.7 / 46.6) and were **discarded, originals untouched** — the factory does not ship unverified fixes.
4. **Keyframe scrub** — ffprobe keyframe count. Jobs 1–3 carry ~1 keyframe per take: an extraction-leg cost only; playback unaffected; noted, not blocking (clip-killer #2 is watched, not assumed away).

### 1.3 Who does what — the two pairs of hands

**The founder's hands (proven, Jobs 1–4 + Film 10):**
- Fire generations in his **home browser session** (Account 2, and Account 1 which is also present in his home browser). His session generates cleanly — four jobs manufactured, examined and one founder-approved ("It's perfect", Job 4) inside ~55 minutes on 2026-11-25, including two captain catches from his photos (a 9:16 aspect slip on Job 1; an Ingredients-mode start on Job 2 — the composer resets after a generation, so the mode shown afterward is *not* the mode fired; the photo-check is a load-bearing step, not a courtesy).
- Press Generate on **captain-built READY projects** (Jobs 5/6 sit built in Account 1's workspace — frames, prompt, settings loaded and verified; only the press remains).
- Sign Account 2 in himself (password rejected by Google → "Try another way" → SMS to his phone). No one else can do this step. Ever.

**The captain's lanes (proven, with a hard limit):**
- Account 1 (store) isolated profile: sign-in succeeds (saved password + one-checkbox reCAPTCHA, no 2FA), projects can be **built completely** — frames uploaded, prompt entered, settings verified (Jobs 5/6 sprint, 2026-11-25 17:54 CT).
- **The automation wall:** both sprint generations were REFUSED — "Failed — We noticed some unusual activity" — **0 credits charged**. This is the same refusal that runs through the FLOW_WATCH_STATE log for Films 02/05/13 attempts across Nov 24–25: the isolated-profile browser is treated as automation regardless of session validity.
- **The wall lifts, unpredictably:** the same restored store session later **fired Film 16 successfully** (2026-11-25 18:00 CT watch run; landed, sound-gate-fixed, −29.7 dB). Films 14/15 also fired from a machine lane on the morning of Nov 25. So the captain's lane is a *sometimes* lane: usable opportunistically by the watch, never plannable as the critical path.
- Everything after the press **is** the captain's, fully: download, examination, Sound Gate fix, filing to `assets/`, engine wiring, desk-filing, ledger.

**Planning consequence:** the factory's throughput is bounded by founder-session firing windows. The pipeline must therefore (a) arrive at every founder window with projects *pre-built and photo-verified* so his minutes are spent pressing, not composing; (b) treat every captain-lane success as found capacity, never as schedule.

### 1.4 What Films 13–16 add to the economics

- **Film 13** (OJK Fleet, store lane): 10 cr class, landed −31.9 dB → sound cured in post. Proof the Sound Gate converts a failed take into a landed asset at 0 credits instead of a 10-credit re-fire.
- **Film 14**: landed and founder-praised ("It is sick") — the scroll-assembly grammar (centre-pinned product, layer separation) that Team D's Manifestation Engine inherits.
- **Film 15**: −36.1 dB raw → −24.9 dB after the gate. Second proof of the post-fix road.
- **Film 16** (Sentinel Fee-Card Chamber): fired by the *captain's* lane the same evening the wall refused Jobs 5/6 — the single most instructive data point in this section: **the wall is per-attempt weather, not a verdict on the account.** Raw −38.2 dB → −29.7 dB landed. Its canonical audio is deliberately quiet (tick, one click, silence) — a reminder that the gate measures level, and *listening judgment* (Gemini's, owed) remains a separate, human-scale check the factory must not automate away.

---

## 2. THE CONNECTED-JOURNEY METHOD UNDER #120 LAW — AND ITS ARITHMETIC

### 2.1 The recipe (all elements proven in the Mint set + ET-120 assembly)

A **place** is manufactured as three independent layers, never one baked plate (#120 clip-killer #3):

1. **Scenery master** — one 8 s A→A clip (same still in Start *and* End), locked camera. 10 cr.
2. **Machinery layer** — one 8 s A→A clip carrying *one complete directional cycle* (a press strike, a printing cycle, a seal press). Isolated from the scenery. 10 cr.
3. **Portal crossing** — one 8 s Start-only clip (End empty by design): a one-way journey *into* the next place. Job 3 proved the crossing is a real continuous shot whose threshold moment transforms one world into the next — and that the engine may play it **in either direction**, so one crossing serves A→B *and* B→A. 10 cr per doorway, shared by both places it connects.

In the Engine (ET-120, assembled and captain-verified 2026-11-25, 171/171 tests):
- The scenery master loops via **dual-video 50% phase-offset crossfade** — the seam is dissolved by compositing, not hidden by a cut. The 60-second continuity leg passed on seams, sync restarts and black frames.
- Coupled layers (machinery against its scenery) lock to **≤1 frame on a single master clock** — a phase-locked loop, no corrective seeks (two defects found and fixed in verification: a seek-storm lock, and sparse-keyframe teleports).
- Uncoupled ambient layers are **never synchronized**: coprime durations (LCM ≥ 120 s, no small-denominator ratio), so the world never visibly resets as one.
- Portal films are trimmed to their threshold window (Job 3: 2.4 s → 5.3 s, from frame-sampled evidence) and fired by navigation, not looped.
- Character (Job 4) plays **once per session** at the Grand Arrival, skippable from frame one, below all visitor controls — structurally unable to cover commerce.

**A journey of N places** = N scenery masters + N machinery layers + (N−1) portal crossings, assembled once in engine config (places are *data* — `universes.js` — not new code). The visitor's route is a path through the portal graph; interruption, detour and Solnik conversation are engine events, not new films.

### 2.2 The arithmetic — journey method vs the naive per-image method

**The naive model (the 877-film plan):** every product/institution image becomes its own 8 s film.
- Cost: 877 films × 10 cr = **8,770 credits** — before promos (the full model was 1,699 films ≈ **16,990 credits**, i.e. ~86% of everything we have, for raw clips alone).
- Yield: 877 × 8 s = **7,016 s ≈ 117 minutes of disconnected footage** — and *zero* continuity: each clip is an island; a visitor "journey" would be a slideshow of hard cuts, and any place visited longer than 8 seconds exhausts its film.
- Cost per finished minute of *screen time*: 8 clips × 10 cr = **80 cr/min**, forever — the 8-second ceiling means the price never amortizes.

**The journey model (this proposal):**
- Cost per place: 10 (master) + 10 (machinery) + ~10 (its share of portal crossings) = **~30 cr per place, once.**
- Yield per place: the master + machinery composite runs **indefinitely** — the 60 s continuity leg passed; the 5-min and 30-min legs are device examinations still owed (see §6), but the *mechanism* has no 8-second ceiling because long-horizon variation is synthesized by layered phase offsets in-engine.
- Cost per finished journey-minute: a 5-place journey costs 5×20 + 4×10 = **140 cr** and then plays for as many minutes as the visitor stays. At the 30-minute continuity-exam horizon that is **140 / 30 ≈ 4.7 cr per journey-minute**; at one hour, 2.3; the marginal minute trends to **zero**. Against the naive 80 cr/min, the journey method is **~17× cheaper at 30 minutes and unboundedly cheaper beyond it** — and it is the only one of the two that produces a *place* instead of a *clip*.
- Whole-town scale: ~40 universes/places × ~30 cr ≈ **1,200 cr** manufactures the entire town's cinematic beds — **14% of the naive model's cost for the films line alone**, leaving the pool for character work and second angles where they earn it.

**First journey (Order 7) — Chamber → Gate → Street → Library → Manifestation:** five places. Already in hand: the town-gate crossing (Job 3, reusable as the Gate leg), the Library scenery master (Job 5, staged in the founder's composer tonight — completes under the captain's FVR-31 ruling), Record Hall machinery (Job 6 still exists; its *firing* is held by Order 3 — the still and brief are preserved), Solnik's introduction (Job 4). Estimated *new* spend to complete the route: **~40–60 cr** (Chamber master, Street master, one Street→Library crossing, second angles only if assembly shows a gap). **UNVERIFIED** until the Team A prototype names its exact asset list.

### 2.3 Where the naive method still wins — honestly

Per-product films are not abolished; they are *demoted to their correct job*. A product's own scroll-assembly film (Film 14 grammar) is a **sales instrument**, made once per flagship product, not a place. The 877-film model failed as *architecture*; as a *catalogue of product demonstrations* it survives inside Team D's Manifestation Engine, where one reusable summoning system presents all ~800 products from their data (Living Genome) instead of 800 bespoke films.

---

## 3. THE AUTOMATION LADDER — TODAY / FOUNDER'S HANDS / #123 MUST ESTABLISH

### Rung 1 — Automated TODAY, with our own tooling, proven in production

| Step | Tooling | Proof |
|---|---|---|
| Batch scenery manufacture | Genspark free AI Image lane, captain-driven browser seats, fresh chat per image, style rules enforced, one regen max per rule-break | Batches #1–#11: **204 images filed**; batch #12 running; 0 credits spent, ever |
| Scenery filing & integrity | Byte-size cross-check mapping (download ↔ subject) before filing to `town-art/` | Caught and corrected a slot-mapping slip in batch #8 *before* it propagated |
| Film examination | ffprobe (duration/fps/keyframes) · volumedetect (mean/max dB) · frame extraction (bookend RMSE, camera sampling) | Exam records on every Job and Film |
| Sound repair | ffmpeg loudnorm I=−16 + re-measure (the Sound Gate) | Films 13, 15, 16 cured at 0 cr |
| Brief manufacture | Queue files with exact prompts, still paths, settings — production-ready before any firing window opens | FOUNDER_VIDEO_QUEUE (Jobs 1–10 fully briefed) |
| Assembly into the world | Engine config-as-data + automated test suite | ET-120: 171 tests, captain re-ran personally |
| Project pre-building | Captain builds Flow projects (frames + prompt + settings) in Account 1 workspace | Jobs 5/6 READY projects (sprint record) |

### Rung 2 — Needs the founder's hands TODAY (the wall, §1.3)

- **Every Generate press on the critical path** (his home session is the only proven-clean lane).
- Account 2 sign-in (SMS step, his phone).
- His eyes/ears as final judge (Job 4 "perfect"; Film 14 "sick") — this rung is not a defect; founder-judges-last is house law. The factory's job is to make his minutes few and decisive.

### Rung 3 — What Gemini #123 MUST establish (nothing here is assumed)

1. **Flow Agent** — does it exist on our Ultra tiers, what can it drive (project creation? generation? sequencing?), and does driving Flow through it trip the same "unusual activity" wall that refuses the captain's browser?
2. **Custom workflows** — can a Frames job (stills + prompt + settings) be templated and re-fired without a human composing each one?
3. **Video extension** — can an 8 s Veo clip be extended in Flow, at what credit price per extension, and does extension preserve A→A bookend discipline? (Extension would change §2's arithmetic only if priced below a fresh master — **UNVERIFIED**.)
4. **Storyboard-to-film / batch generation** — any native queue: many jobs, one submission?
5. **The Dec 5 succession** — Veo 3.1 Lite's Frames support, duration, and **credit price** (see §4); Omni 1.2 Flash's post-Dec-5 price stability.
6. **API reality check** — our vaulted Gemini API key reads models (HTTP 200) but all generation is refused HTTP 402 (empty prepaid meter on its project). The API does **not** ride the Ultra subscriptions. #123 must confirm whether *any* sanctioned route lets Ultra Flow credits be spent programmatically — the captain's current evidence says **no**, and the founder has ruled out paying the API meter. Unless #123 overturns this with evidence, **there is no API rung on this ladder.**

---

## 4. CREDIT ALLOCATION MODEL — THE REMAINING ≈19,713 CREDITS

**The pools (measured 2026-11-25):**
- **Account 1** (onejobkits@gmail.com, store): **9,960 cr — RESETS (refills) Dec 23, 10:21 AM.** This pool renews; it is the reserve carrier.
- **Account 2** (borledo77@gmail.com, founder's personal): **9,753 cr — ENDS Dec 23. Canceled; no refill.** Panel-read tonight; this pool *dies* — spend it first, on the work that expires soonest.
- Combined: **19,713 cr.** Spent to date on the Living Universe: 90. Everything else in the films line was spent under earlier queues (Shoot Book balances are recorded per-film in FLOW_WATCH_STATE).

**The Dec 5 cliff (priced in):** Veo 3.1 Fast and Veo 3.1 Quality **retire from Flow on Dec 5**; Omni 1.1 also retires. **Omni 1.2 Flash and Veo 3.1 Lite stay.** Consequences:
- Every A→A master we intend to shoot on Veo Fast at the proven 10 cr price must be shot **before Dec 5** — nine days from tonight. This is the single hardest deadline in the model.
- Veo 3.1 Lite's price and Frames behaviour are **UNVERIFIED**. The model's post-Dec-5 lines are therefore stated in *clips*, not credits, with a mandatory calibration step: the first Lite generation is a priced experiment (one clip, record the charge) before any Lite budget is committed.
- Omni 1.2 Flash survives Dec 5 — character/voice work is *not* cliff-bound and can be scheduled after the Veo Fast sprint.

**Recommended allocation (Account 2 first, all Veo Fast work front-loaded before Dec 5):**

| Bucket | Credits | Buys (at proven prices) | Timing |
|---|---|---|---|
| **1. Journeys first** | **5,500** | ~40 places × ~30 cr ≈ 1,200 for full town beds; the Order 7 first journey (~40–60 new); portal network completion; second crossings where a route forks; re-fires for any take failing exam (~10% failure allowance observed across the films line) | Veo Fast portion **before Dec 5**, Account 2 first |
| **2. Scenery masters second** | **6,000** | Second/third angles per flagship place (the queue's standing rule: further angles only where assembly shows a gap); 15–16 s two-clip masters (20 cr) for hero places; seasonal/light variants of the Gate, Wall, Agora | Bulk before Dec 5 on Veo Fast; Lite-calibrated after |
| **3. Character work third** | **3,500** | Omni 1.2 at 60 cr / 15 s voiced take ≈ **58 voiced takes**: Solnik's per-universe greetings, the tavern/library/keeper lines, avatar-chamber welcome variants. Silent character layers (Veo) price at 10 cr inside bucket 1–2 rates | After Dec 5 is safe (Omni 1.2 stays); founder's ears gate every take |
| **4. Reserve** | **4,713** | Held on Account 1 (the pool that refills Dec 23): Lite calibration experiments, #123-driven opportunities (extension tests if priced), failure storms, and the second-specimen/Contractor-class surprises | Unspent unless a named trigger fires |
| **Total** | **19,713** | | |

Discipline rules riding with the model: (i) no bucket borrows from Reserve without a named trigger; (ii) voice work never silently re-prices a silent job (the Job 4 lesson — length is set *before* firing, in the open); (iii) credits are spent on evidence, not volume — a place gets a second angle when the assembly *shows* the gap, per the queue's standing rule; (iv) if #123 proves a cheaper automated route, buckets 1–2 shrink and the surplus falls to Reserve, never to more clips for their own sake.

---

## 5. THE REAL-TIME REPLACEMENT LIST — MOVEMENT THE ENGINE MUST PRODUCE ITSELF

Order 3's law: **"Do not spend credits on ordinary repetitive movement that the engine can produce itself."** The following classes are hereby assigned to the World Engine (Team A) permanently. A Flow generation whose *primary content* is one of these is a mis-spend, whoever proposes it.

| Movement class | Engine mechanism (house stack) | Why never a film |
|---|---|---|
| Water — fountains, river, harbour, mill wheel flow | Shader/canvas flow + layered phase-offset plates (GSAP/Three.js vendored stack) | Infinite, interruptible, reacts to visitor; a film freezes one flow state |
| Flame & lantern flicker, forge glow breathing | Procedural light oscillation (coprime periods per source) | Already proven as engine lighting cycles (31 s lighting period in Record config) |
| Dust motes, sparks, embers, rain, mist drift | Particle systems (far/near planes already in the Living Engine z-stack) | Cheap, endless, density-controllable per device budget |
| Tree & banner sway, chimney smoke | Procedural skeletal/CSS sway on stills | Micro-motion; symmetric ambient is the *only* class #120 permits even boomerang for — engine sway is better still |
| Day/light change, lantern-light pooling | Continuous lighting layer (never synchronized with film layers) | A film bakes one hour of day forever |
| Book pages settling, scroll unrolling, parchment presentation | GSAP-choreographed real objects (Team D) | These are *interface*, and interface must respond to the visitor's actual product, not a recording |
| Manifestation physics — golden particles, assembly, separation, threads + callouts | Surfer mechanism in-engine (Team D) | Must manifest *any* of ~800 products from data; 800 films is the rejected model (§2.3) |
| Avatar locomotion, gestures, idle life | Character Engine rigs (Team C) — the cartoon Solnik rig already proves the pattern: 75 KB of procedural poses vs ~5.4 MB of filmed/3D body | Thousands of visitors × free movement cannot be filmed, by definition |
| Solnik's in-world life — walk, climb, operate, inspect, talk visemes, chuckle | The existing cartoon rig + brain protocol (live on all 7 doors) | He is an inhabitant, not a cutscene; his talk must sync to *live* answers |
| Portal shimmer, threshold glow, door/winch idle motion | Engine overlays on the filmed crossing's endpoints | The crossing film is the journey; its endpoints must wait, alive, indefinitely |
| Ambient sound beds — room tone, water, distant machinery | Looped/generated audio layers under visitor control (Acoustic Genome per universe) | Sound must not restart with any film; independent cycles are the Infinite Universe law |
| Camera parallax & pointer response | Engine chase curves (0.1 rAF class) | Interactivity is definitionally un-filmable |

**What films remain for:** the irreducibly cinematic — a place's *identity* (its master), a machine's *character* (one true cycle), a *threshold* (a crossing), a *face with a voice* (Solnik's spoken moments). Four classes. Everything else is engineering.

---

## 6. HONEST LIMITS + WHAT REMAINS UNPROVEN

1. **The Generate-press bottleneck is real and unsolved.** All critical-path firing runs through the founder's home session until #123 reports otherwise. His demonstrated rate (Jobs 1–4 in ~55 min including exams and two catches) is excellent *per session* but sessions are his evenings. The Dec 5 Veo Fast sprint (~9 days) must be sized to his availability, not to the credit pool — buckets 1–2 above are credit-feasible long before they are calendar-feasible. **UNPROVEN:** that the full pre-Dec-5 list fits his windows; the queue must be priority-ordered so a shortfall cuts variants, never journey-critical masters.
2. **The automation wall's rules are unknown.** It refused two sprint generations at 0 cr and later passed Film 16 from the same session. We cannot model it, schedule around it, or promise its behaviour. Any plan that *requires* captain-lane firing is unsound.
3. **≤1-frame coupled lock is mechanism-proven, not device-proven.** Headless worst inter-layer error was 0.18 s under decoder starvation; the steady-state number on a real phone/computer is **UNVERIFIED** (Team E's device legs, with the 5-min/30-min continuity legs and the NC-08 ~20 s stall question, remain open).
4. **Mobile pacing failed in-environment** (6.86% dropped frames, two 1080p software decoders on a weak sandbox). Real-device performance of a 5-layer journey — the Order 7 prototype's core question — is **UNPROVEN** until Team E runs it on hardware.
5. **Veo 3.1 Lite is a name, not a price.** Post-Dec-5 scenery economics are **UNVERIFIED** until the calibration generation. If Lite prices materially above 10 cr or drops Frames discipline, buckets 1–2 need re-cutting and the Reserve absorbs the shock — that is what it is for.
6. **Omni's voice is one voice.** Job 4's take is founder-ruled perfect and the film voice is locked; but 58 budgeted takes assume Omni holds character, pace and lip-sync across per-universe lines. Only one take exists. **UNPROVEN at volume.**
7. **Bookend truth:** Jobs 1–2's raw bookends (RMSE ~19.5–19.9) would fail a hard-cut loop. The crossfade disposition passed the 60 s leg; whether a visitor *feels* no seam across 30 minutes is a founder-judgment item (PIS-01 first impression), not a metric this paper can settle.
8. **Sound is measured, not yet *judged* at scale.** The gate proves level; Gemini's listening judgments on the landed films remain owed. A factory that ships on dB alone would repeat, in audio, the error the Sound Gate was built to kill.
9. **Genspark's free lane has a 5-hour quota wall** (hit and waited out in batches #8/#11) and the plan **ends Dec 21, 2026**. Scenery feedstock is free but not infinite and not ours — the 1,000-image march is a use-it-or-lose-it window, correctly *not* held by Order 3.
10. **Nothing in this proposal spends, generates or deploys.** Jobs 6–10 stay HELD per the captain's FVR-31 ruling; Job 5 completes (it is the Library's master, on the Order 7 route). This paper is Team B's deliverable for the joint verdict — Gemini #123 and ChatGPT challenge it from their own evidence, and the founder rules last.

---

*Filed: `living-universe/CINEMATIC_FACTORY_PIPELINE_v1_2026-11-25.md` · Team B (Cinematic Factory) · Relay note: built from the house's own production records only; every external-ecosystem claim is either Gemini #123's to prove or labeled UNVERIFIED above.*

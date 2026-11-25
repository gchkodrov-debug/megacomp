# PIS-01 RECONCILIATION — DRAFT (captain's investigation seat, 2026-11-25)

**Seat:** Muse, investigation + reconciliation, under ChatGPT's FVR-30 directive
(PIS-01, filed 2026-11-25 11:39 CT). **Paper only** — no code changed, nothing
rebuilt, nothing deployed, nothing spent. Existing construction preserved exactly.
**Status of this document:** a DRAFT written to be challenged. Gemini challenges
the science, thresholds, feasibility and methodology (brief #119); ChatGPT
adjudicates. Every claim below is cited to the build log
(`BUILD_LOG_2026-11-25.md`, cited as BL §n), the blind verifier's round-2 report
(`reviews/VERIFIER_REPORT_R2.md`, cited as VR2 §n), or the engine contract
(`engine/README.md`, cited as README). Where no evidence exists, the state is
**UNVERIFIED** — never PASS (Zero Known-Defect Rule).

**Grading rule used throughout:** a discipline is **PASS** only where its claim
is an engineering claim and the evidence exists on the frozen set (Freeze v2,
15/15 hashes intact — VR2 §0). It is **FAIL** where evidence on record shows the
required achievement is not met today. It is **UNVERIFIED** where the claim is
inherently perceptual, or needs a browser, a device, or a human that has not
run yet. Experience disciplines (transportation, emotional impact/awe) are
UNVERIFIED by rule until a human enters — engineering proxies are named as
proxies, never scored as feelings.

**No PIS-01 total score is issued.** Five of fifteen disciplines cannot be
scored today (see §A), so any "/100" number would be invented. The points
column is carried for structure only.

---

## A. DISCIPLINE-BY-DISCIPLINE GAP MAP (15 disciplines)

### 1. Dimensional transportation — 10 pts — **UNVERIFIED**
- **Built:** the stage is a layered world behind a portal iris transition
  coloured per universe (README, layer map; BL §3); a visitor crosses from the
  Mint specimen to the Record universe through a working portal page
  (BL §4). These are transportation *machinery*, not transportation.
- **Measurable today:** nothing. The discipline's required achievement is a
  feeling ("entering another world"). No human has entered the specimen.
  Slater's Place Illusion (directive §1) is a psychological state; no test in
  the 61/61 suite touches it, and none could.
- **Closes with:** the human examination (§C), Q1 (+ Q10 as support), from
  visitors who were not told what to feel; plus the founder's visitor-judgment
  as a separate, earlier gate.

### 2. Cinematic composition — 10 pts — **UNVERIFIED**
- **Built:** cinematic assets exist and are catalogued — the Mint loop
  (Flow film, boomerang construction), Genspark still art as the L2 layer,
  per-universe palettes (BL §2, §3). The loops measure 24 fps by ffprobe
  (VR2 §3: 356 frames / 14.833 s), inside PIS-01's 24–30 fps cinematic band.
- **Measurable today:** frame rate and seam only. "Exceptional visual quality
  and scale" is a judgment; no composition grading instrument, expert panel,
  or human rating has been applied to any frame. The loop gate measures
  first/last-frame sameness (RMSE), which says nothing about beauty.
- **Closes with:** human ratings (examination Q4 partially, plus a named
  stills/loop review against the directive §2 benchmarks — Avatar-class depth
  and scale — by a seat that did not produce the assets).

### 3. Environmental depth — 8 pts — **PASS (mechanism) · perceptual leg UNVERIFIED**
- **Built:** seven depth planes with tabled depth factors — palette field,
  video 0.15, still 0.40, far particles 0.55, character plane 0.70, near
  particles 0.85, occlusion 1.15 (README layer map). Foreground, middle and
  distant layers exist by construction, and near particles pass *in front of*
  the inhabitant.
- **Measurable today:** parallax is lerped (never raw scroll) and **monotone
  in depth, asserted numerically** in the suite; gate G2 graded PASS (math)
  by the blind verifier (VR2 §8). The mechanism claim is fully evidenced.
- **Still open:** whether the depth is *convincing* is perceptual — graded by
  examination Q3, and by UV-01 (in-browser rendering proof, not yet run).
  This PASS covers the mechanism only and must not be quoted as "depth feels
  real."

### 4. Environmental life — 8 pts — **PASS (mechanism) · device leg UNVERIFIED**
- **Built:** the world moves with no visitor action — a dual-video seamless
  loop plus two independent particle systems (far/near), config-driven per
  universe (README; BL §3). Loops are gated by measurement, not hope:
  Mint RMSE **1.80**, Record **1.18**, gate ≤ 8, frame-exact method,
  independently reproduced (VR2 §3). The engine pauses when the stage is
  off-screen or the tab hidden (IntersectionObserver) — life stops only when
  nobody can see it, which is correct behaviour, stated here so nobody grades
  it as a defect later.
- **Measurable today:** loop seamlessness on the pixel measure (PASS) and
  autonomous activity in code (PASS). Whether the life *renders* — crossfade
  invisible, particles smooth on a phone GPU — is UV-01/UV-02, not yet run.
- **Closes with:** UV-01 browser proof + UV-02 device run; examination Q2
  ("did the environment feel genuinely alive?") for the felt leg.

### 5. Emotional impact — 10 pts — **UNVERIFIED**
- **Built:** nothing that can be claimed. Atmosphere ingredients exist
  (palette, ambience, motion), but wonder/curiosity/awe are outcomes in a
  visitor, and there has been no visitor.
- **Measurable today:** nothing. This is the discipline the directive exists
  to protect from engineering self-deception (§8: "Do not confuse a passing
  software test with a breathtaking human experience").
- **Closes with:** the human examination only — Q4 (wonder/awe), Q7
  (wanted to explore further), Q10 (would remember it tomorrow). No proxy
  is accepted in this draft.

### 6. Physical consistency — 7 pts — **FAIL**
- **Built (the passing leg):** occlusion is a formula, not eyeballing —
  `occluderLayout()` + `MOTIF_GEOMETRY` place the press gear's disc over the
  press anchor's whole 44 px box; the blind verifier recomputed coverage by
  hand at 1920×1080 and 320/375/390/430, both universes, all points inside
  (VR2 §4; gate G4 PASS-geometry). Margins at 320 px are thin (Mint 0.69 px,
  Record 1.04 px) — covered, with almost no slack; any anchor move re-opens
  the matrix.
- **Why FAIL despite that:** PIS-01's own technical table requires
  **"Character clipping errors: Zero known defects."** The character a
  visitor actually meets today is the legacy 3D Solnik client, whose canvas
  sits at z-index 2147483000 above every page layer and **cannot be
  occluded by any machinery** — defect **D-01, CONFIRMED open** (BL §9;
  VR2 §7, House axis). The geometry PASS belongs to the Phase-3 character
  *plane*; the discipline as experienced fails on a known defect.
- **Closes with:** the Phase-3 cartoon body mounted in `#solnik-mount`
  (occlusion already proven for that plane), or a founder ruling that
  re-scopes the discipline. Until then this discipline also blocks any
  Platinum-Pristine claim by the directive's own zero-critical-defects rule.

### 7. Environmental sound — 5 pts — **FAIL**
- **Built (the passing legs):** sound is **off by default**, lazy-loaded,
  visitor-controlled, and honest — a universe with no ambience asset gets a
  disabled control, never a fake one; the control claims "on" only after
  playback actually starts (README, Visitor sovereignty). The Mint ambience
  is original (Film 08's own audio, crossfaded for looping, mean −18.5 dB
  measured — VR2 §7; gate G7 PASS).
- **Why FAIL:** the discipline requires **directional, synchronized,
  original** sound. The engine ships a single ambience track per universe.
  There is no directional/spatial mechanism and no event synchronization
  (a press strike does not sound from the press — the directive §5 example)
  anywhere in the contract. Two of the discipline's three named properties
  are absent by construction, which is a finding of fact, not missing
  evidence. Separately, the listening judgment on the ambience seam is
  still owed (NC-02 — dB is measured; nobody has listened).
- **Closes with:** a sound design decision (see §B, sound row) — either
  PIS-01 is adapted for the ambience era, or a Web Audio spatial/event layer
  is specified for a later phase; plus the NC-02 listening pass.

### 8. Lighting — 5 pts — **UNVERIFIED**
- **Built:** per-universe palettes drive the base field and shade vignette;
  occluder colour comes from the palette (BL §7, C12). The cinematic assets
  carry baked light from the Flow films and Genspark stills.
- **Measurable today:** nothing about light has been measured or judged.
  "Consistent" is a property of the art (unjudged); "dynamic illumination"
  — light that responds, e.g. molten gold reflecting on the inhabitant
  (directive §5) — has no mechanism in the engine contract.
- **Closes with:** a lighting review of the shipped assets (consistency),
  and a scope decision on dynamic light (a later-phase engine addition, or
  the discipline is reworded at adjudication). Examination has no lighting
  question — noted as an instrument gap for §E.

### 9. Solnik integration — 8 pts — **FAIL**
- **Built (the contract leg):** the anchor system serves the live Solnik
  client's exact data contract (`data-solnik-anchor`, rect-based discovery,
  `{x, topY, kind, interact}` shape — compared line-by-line with his client
  code, BL §5 row 3; gate G8c PASS). One mount (`#solnik-mount`) exists on
  every universe's character plane.
- **Why FAIL:** the required achievement is "character naturally inhabits
  the world." In the specimen today the character plane holds a **neutral
  golden token — a proof instrument, explicitly not Solnik** (README,
  Character-plane probe). The real client's integration run on an engine
  page has **never been performed (NC-04)**, and if it were run, D-01 means
  he would render above the machinery he is supposed to walk behind. The
  inhabitant is absent from the specimen; that is evidenced, not unknown.
- **Closes with:** NC-04 (one integration run of the real client on an
  engine page) for the contract leg, and the Phase-3 body for the
  inhabitant leg; examination Q5 grades the felt leg after that.

### 10. Interactivity — 7 pts — **PASS (mechanism) · browser leg UNVERIFIED**
- **Built:** the environment acknowledges the visitor — portal anchors are
  clickable and keyboard-operable doors; instrument/object anchors carry
  `interact{verb,label,target}` metadata with a **real consumer**: arrival
  fires `living-universe:interact` and the specimen highlights the actual
  target card (BL §5 row 4; gate G8d PASS, verifier-confirmed targets
  present in both pages, VR2 §5). Probe order perch→instrument→object→
  portal is test-asserted.
- **Measurable today:** event machinery and validation, PASS on the frozen
  set. In-browser execution (the highlight seen, the iris seen) is UV-01.
- **Closes with:** UV-01; examination Q6 for the "responded naturally" leg.

### 11. Universe individuality — 5 pts — **PASS**
- **Built + measured:** Mint and Record are different worlds on one engine —
  palette, **particle renderer (spark streaks vs mote soft bodies: different
  draw code, not recolours)**, occluder motif, motion intensity (1.0 vs
  0.55), sound presence, anchor graph — asserted in the test suite and
  reproduced by the blind verifier (BL §3; VR2 §1, §8 G1). Four further
  universes exist as asset-assigned stub configs (Phase 5).
- **Honest limit (from the contract itself):** individuality is proven
  *within the engine's current vocabulary* — 2 particle renderers, 3
  occluder motifs (README, Scalability). A universe needing a new motif is
  a small table-driven addition, not a rebuild and not zero work.
- **Closes with:** nothing for the two built universes; human recognizability
  is supported by examination Q7 behaviour (exploration pull) but the
  discipline's engineering claim stands on its own evidence.

### 12. Portal continuity — 4 pts — **PASS (mechanism) · browser leg UNVERIFIED**
- **Built + measured:** portal anchors and `portals[]` entries are validated
  two-way (a portal anchor must reference a portal entry); crossing fires
  `living-universe:portal-enter`; the transition iris renders in the
  *destination universe's own colour* (a bug the critic caught — body-overlay
  colour — is fixed, BL §7); the Mint→Record crossing exists as a real page
  (BL §4). Gate G3 PASS (code + events), VR2 §8.
- **Still open:** the felt believability of the transition, and its pixels,
  are UV-01 + founder/examination judgment. With motion off the portal is
  instant by design (sovereignty beats spectacle — stated in the contract).
- **Closes with:** UV-01; founder's visitor-judgment on the crossing.

### 13. Performance — 5 pts — **UNVERIFIED**
- **Built:** the discipline exists in the code — transform-only layers (no
  layout, CLS-safe by construction), cached layer list, no per-frame DOM
  queries or layout reads, rAF-coalesced scroll, debounced resize,
  off-screen/hidden pause, DPR ≤ 1.5, lazy video (motion-off visitors
  download **0 video bytes**) (README, Performance discipline).
- **Measurable today:** payload bytes only, all verifier-confirmed
  (VR2 §7): Mint page ≈ **209 KB before video**; loop 1,874,061 B streamed
  only when motion is on. **No timing measurement exists anywhere** — no
  LCP, no INP, no CLS, no FPS on any device. Gate G11: UNVERIFIED
  (VR2 §8). A discipline whose required achievement is "smooth, responsive"
  cannot pass on byte counts.
- **Closes with:** UV-02 — an instrumented run on a real phone (the
  captain's browser/device seat), against the thresholds reconciled in §B.

### 14. Commercial clarity — 5 pts — **PASS (one check owed)**
- **Built + measured:** the commercial foreground is plain HTML **outside
  the stage** (z 100, structurally unreachable by any world layer); the
  specimen carries the Mint's truth — founding strike **$245**, holder
  strike **$196**, a disabled "Purchasing is closed" control + gate note —
  grepped present by the blind verifier (VR2 §5), identical in every
  motion/sound state. The critic's attacks on this leg were REJECTED
  (could not make an occluder reach a price — BL §6).
- **Owed:** NC-01 — the specimen's $245/$196 vs the *rendered* live listing
  (the live file serves prices dynamically; house record and brief agree,
  but the rendered-page check is still owed before either side is believed).
- **Closes with:** NC-01's rendered check; examination Q9 grades the
  visitor's understanding.

### 15. Visitor comfort — 3 pts — **PASS**
- **Built + measured:** Motion and Sound controls live in the stage; sound
  off by default; `resolveMotion` is unit-tested — a reduced-motion signal
  wins on every load, the visitor may still enable motion for the session,
  the choice persists (README; BL §3). Motion off = poster still, no
  particles, no video bytes, instant portal, foreground identical; a no-JS
  poster rung ships in the page (VR2 §5). Gate G6 PASS (VR2 §8).
- **Honest limit:** comfort on a real phone (touch targets in use, control
  reach) rides with UV-01/UV-02; the mechanism and its tests are complete.

### §A tally
| State | Count | Disciplines |
|---|---|---|
| PASS (mechanism/engineering, caveats as noted) | **7** | Depth · Environmental life · Interactivity · Universe individuality · Portal continuity · Commercial clarity · Visitor comfort |
| FAIL (evidence shows the achievement is not met today) | **3** | Physical consistency (D-01) · Environmental sound (no directional/synchronized mechanism) · Solnik integration (inhabitant absent; token probe only; NC-04 never run) |
| UNVERIFIED (perceptual, or browser/device/human evidence does not exist) | **5** | Dimensional transportation · Cinematic composition · Emotional impact · Lighting · Performance |

The pattern is the finding: **everything the file seats could measure
passes or fails honestly; everything that makes a world feel alive is
unmeasured, because no browser, device, or human has entered yet.**

---

## B. THRESHOLD RECONCILIATION — PIS-01 numbers vs the house bars in force

House bars in force (Track 6, standing): **LCP ≤ 2.5 s · INP < 200 ms ·
CLS < 0.1** · product models ≤ 5 MB / ≤ 250k triangles. Every recommendation
below is a **DRAFT** — Gemini challenges, ChatGPT adjudicates. Nothing here
changes a house bar by itself.

| # | PIS-01 proposal | House position today | Conflict / note | Recommendation (DRAFT) |
|---|---|---|---|---|
| B1 | Layout stability **CLS ≤ 0.01** (internal target) | Track 6 gate: CLS < 0.1 | **Tightening ×10.** The engine is transform-only with a fixed-height stage — CLS-safe *by construction* (README) — but no CLS has ever been measured (G11 UNVERIFIED). | **ADOPT** as the internal target; keep Track 6 < 0.1 as the release gate. Reasoning: construction already aims at zero shift; a tight internal target costs nothing and catches regressions early — but it must be *measured* before it is claimed. |
| B2 | Mobile initial transfer **≤ 1.5 MB** | No house page-payload bar (the ≤5 MB bar is for product *models* — different thing, no conflict) | **Definition decides pass/fail.** Specimen before video ≈ 209 KB (PASS by 7×). Motion-on first view adds the 1,874,061 B loop → ≈ 2.08 MB (**over**). Motion-off visitors download 0 video bytes. The loop is big because it is a *boomerang* (forward+reverse) — the construction that guarantees the seam (BL §3). | **ADAPT.** Define "initial transfer" = bytes to first meaningful paint (page + poster + still ≈ 209 KB today), and class the loop as streamed enhancement with its own named ceiling (proposed: ≤ 2 MB per universe loop, boomerang price disclosed). If adjudication instead counts the loop as initial, the specimen FAILS B2 and the loop must shrink — say so plainly either way. |
| B3 | Desktop animation **60 FPS target** | Track 6 implies it (16.7 ms frame budget, itself UNVERIFIED — VR2 §7) | No conflict; no measurement exists. | **ADOPT** as target. Closes only with UV-02 instrumentation. |
| B4 | Mobile animation **stable 30 FPS min · 60 preferred** | No house FPS bar | New. Engine already scales particle counts with width and caps DPR at 1.5 (README) — the design leans this way, unmeasured. | **ADAPT:** 30 stable = gate, 60 = target (as proposed). "Stable" needs a definition at adjudication (proposed: no 1-second window below 24 FPS in a 60-second trace). |
| B5 | Cinematic video **24–30 FPS** | No house bar | **Already met:** both specimen loops are 24 fps (ffprobe, VR2 §3). | **ADOPT.** The one PIS-01 number the specimen passes today on measurement. |
| B6 | Initial content loading **≤ 2.5 s** | Track 6 LCP ≤ 2.5 s | Same number, same meaning (Web Vitals, 75th percentile). | **ADOPT** (already house law). State: UNVERIFIED on device (G11). |
| B7 | Interaction responsiveness **≤ 200 ms** | Track 6 INP < 200 ms | Same bar. | **ADOPT** (already house law). State: UNVERIFIED (no INP measured). |
| B8 | Immediate visual feedback **< 100 ms** | No house bar | **New and tighter than INP** — this is about the *first visible response* (iris starts, highlight lands), not the completed interaction. No instrument for it exists in the house today. | **ADAPT:** adopt as a design target for in-stage feedback only; not a release gate until an instrument exists. Otherwise it becomes an unmeasurable promise — exactly what PIS-01 exists to prevent. |
| B9 | Visible loop interruptions **zero** | House loop gate: first/last-frame **RMSE ≤ 8** (frame-exact) | The house gate is the *proxy*; PIS-01 states the *experience*. Shipped loops: 1.80 / 1.18 — deep inside the proxy gate. But "visible" is finally a browser + human fact (UV-01). | **ADOPT** with the proxy named: RMSE ≤ 8 (frame-exact) is the engineering gate; zero-*visible* is confirmed only at UV-01 + examination. Never quote the proxy as the experience. |
| B10 | Broken environmental interactions **zero** | Zero Known-Defect Rule (house law) | Same spirit; specimen's portal/interact paths are test-covered on the frozen set. | **ADOPT** (already house law in substance). Browser leg rides UV-01. |
| B11 | Character clipping errors **zero known defects** | Zero Known-Defect Rule | **The specimen FAILS this line today** — D-01 is a known, open, character-plane defect (see §A.6). Adopting the line changes nothing; the defect is already named and already blocks the final PASS. | **ADOPT** (already house law). Recorded here so adjudication sees the failure is against a bar the house already holds itself to. |
| B12 | Sound **user-controlled, synchronized** | Sound Law (house): product's own sound, measured dB floor, listening owed; engine: off by default, lazy, honest controls | User-controlled: **met today**. Synchronized: **no mechanism exists** (see §A.7). | **ADAPT:** split the line — user-controlled ADOPT (met); synchronized ADAPT to "ambience is loop-synchronized; event-synchronized and directional sound is a named later-phase requirement," unless adjudication rules it a launch gate, in which case §A.7's FAIL stands as a build order, not a wording fix. |
| B13 | Accessibility: **reduced-motion + static alternatives** | Track 6/7 + engine contract | **Met today** — `resolveMotion` unit-tested, poster rung + no-JS rung shipped (VR2 §5, §8 G6 PASS). | **ADOPT** (already built and verified at code level). |
| B14 | Compatibility: **physical iPhone, Android, desktop** | House law (cloud-browser motion law): cloud checks prove layout/static only; motion verdicts need a real device | **No physical-device evidence exists for the specimen at all.** The founder's own iPhone is the first physical seat available to this house. | **ADAPT:** physical-device matrix required before any PLATINUM claim (not before HIGH-END, which is a code/measurement grade — see §D). Founder's iPhone + one physical Android, named models, results filed. |
| B15 | **30-minute stability + thermal test** | **No house precedent** | New discipline entirely. Real risk it probes: dual-video + two particle canvases + parallax is a sustained GPU/compositor load; throttling behaviour over 30 min is genuinely unknown. | **ADAPT:** required once per engine release and once per new universe, on physical devices (rides B14), before PLATINUM grading — not per page edit. As written (implied per experience) it is unstaffable for this house; as adapted it is a real gate. Gemini to challenge the duration (is 30 min the scientifically meaningful window, or ritual?). |
| B16 | *(Weighting itself)* | — | Transportation + Emotional impact = 30 of 100 points; Visitor comfort = 3 while accessibility is house *law*; Performance = 5 while carrying most of the hard numeric gates. Scores and gates are mixed in one number. | **CHALLENGE (for adjudication):** propose a **gate-vs-score split** — hard bars (B6–B11, B13) pass/fail as gates and never earn points; the 100 points score only what is felt and judged. A universe that fails a gate is not "92/100," it is *not graded*. This draft's §A states are recorded so they survive either ruling. |

**Net threshold picture:** PIS-01 tightens the house in exactly three places —
CLS (B1), the sub-100 ms feedback target (B8), and the physical-device +
thermal regime (B14/B15). It conflicts with the house in **zero** places
outright; its one hard collision is internal — B2's 1.5 MB against the
boomerang loop the house's own seam gate produced. That collision is a
definition question, and it is adjudication's, not this draft's, to settle.

---

## C. THE HUMAN EXAMINATION, OPERATIONALIZED

The directive (§7): at least **20 unfamiliar visitors**, **not told what
emotional reaction is expected**, each rating 1–10 on ten questions. Below:
how that actually runs for this house, honestly, in sequence.

### C.1 The sequencing (honest order, not the ideal order)
1. **UV-01/UV-02 first.** Strangers are not a debugging tool. The browser
   proof and one device run happen before any visitor is recruited, so the
   examination measures the experience, not our defects. (Promise-to-Function:
   the founder receives a finished product to judge — strangers doubly so.)
2. **The founder's visitor-judgment second.** The founder enters the
   specimen *as a visitor* (ChatGPT's framing, relayed 2026-11-25 11:32 CT:
   "judge it as a visitor, not as its founder" — dimension? alive while you
   do nothing? the imagined atmosphere?). His judgment is a **separate
   gate** (founder approval, house law) — recorded on its own line, never
   averaged into the 20, never used to prime them.
3. **Preview access third.** Today the specimen is local files, deliberately
   **not staged and not linked** (BL §4 — staging is a captain step after
   founder judgment). The strangers' examination therefore *cannot run yet*:
   it needs a reachable preview URL. That deployment is founder-gated. This
   is the honest blocker, named: **no preview, no examination.**
4. **The 20-visitor examination last**, on the frozen preview build, with
   the build's hash recorded on the results (an examination of a moving
   target proves nothing — Two-Axis freeze rule).

### C.2 Recruitment reality for this house
This house has no research panel and no recruitment budget (no-spending law).
Realistic channels, with their biases named:
- **Warm-adjacent (available now):** the town's Discord, the store's
  audience, social followers who have **never seen the living-universe
  specimen**. Bias: they know the project exists and may want it to succeed.
  Mitigation: familiarity is a recorded data field (below), and anyone who
  has seen the specimen, the build log, or this standard is excluded.
- **Genuinely cold (not built):** strangers with no prior contact. This
  house has no channel that reaches them today without spending. **Named
  honestly:** a first cohort of 20 will be *first-time-to-the-specimen*,
  not *first-time-to-PROVADIA*. If adjudication rules that insufficient for
  "unfamiliar," the examination waits for a cold channel — it is not faked
  with warm visitors relabelled.
- **Exclusions:** crew, partners, family, anyone briefed on PIS-01, anyone
  who has seen Solnik's specimen pages. The founder is excluded from the 20
  by definition (he is the opposite of unfamiliar) — his judgment is C.1.2.

### C.3 The no-priming protocol
- The invitation carries **one neutral sentence** ("Please spend a few
  minutes with this page, then answer honestly") and the link. The words
  *presence, living, alive, awe, transported* appear **nowhere** before the
  questions — they appear only *inside* the questions, as the directive
  wrote them.
- No guide, no tour, no "notice how…". Free exploration first; questions
  after. Time-on-page and device are recorded automatically.
- Results are collected by the form, not by a person the visitor knows —
  nobody from the crew interviews, thanks-with-hints, or explains.

### C.4 The ten questions (verbatim from the directive §7, each 1–10)
1. Did you feel transported into another world?
2. Did the environment feel genuinely alive?
3. Did the world possess convincing depth?
4. Did the experience create wonder or awe?
5. Did Solnik feel like part of the environment?
6. Did the world respond naturally to your actions?
7. Did you want to explore further?
8. Was the experience smooth and comfortable?
9. Could you understand the product and its purpose?
10. Would you remember this experience tomorrow?

### C.5 Scoring — how questions map to disciplines (DRAFT mapping, for adjudication)
| Question | Primary discipline | Supporting |
|---|---|---|
| Q1 transported | Dimensional transportation (10) | — |
| Q2 genuinely alive | Environmental life (8) | Transportation |
| Q3 convincing depth | Environmental depth (8) | — |
| Q4 wonder or awe | Emotional impact (10) | — |
| Q5 Solnik part of the environment | Solnik integration (8) | — |
| Q6 responded naturally | Interactivity (7) | Physical consistency |
| Q7 explore further | Emotional impact (curiosity leg) | Universe individuality |
| Q8 smooth and comfortable | Visitor comfort (3) | Performance (felt leg) |
| Q9 product understood | Commercial clarity (5) | — |
| Q10 remembered tomorrow | Emotional impact (memorability leg) | Transportation |

- **Discipline human subscore** = (mean of its mapped primary questions ÷ 10)
  × discipline points. Disciplines with no question (Cinematic composition,
  Physical consistency, Environmental sound, Lighting, Portal continuity,
  Performance) keep their §A engineering states — the examination does not
  silently absorb them. (Instrument gaps are listed in §E.)
- **Experience score** = mean of all ten questions, reported with median and
  distribution, never as a bare average — 20 visitors bimodally split
  (loved/hated) is a different fact from 20 visitors at 6.
- **DRAFT pass bars (captain's proposal, for Gemini/ChatGPT):** the human
  leg of Platinum-Pristine requires experience-score mean **≥ 8.0**, **no
  question mean below 6.5**, and **n = 20 complete** on the frozen build.
  These numbers are invented-honest (labelled as such), not derived from
  literature — deriving or replacing them is a methodology question in §E.
- **"Independent" means:** visitors with no stake in the outcome, no
  briefing on the expected emotion, results collected without a crew member
  present, and grading done from the recorded data — not from the builder's
  memory of watching faces. The founder's separate judgment can *fail* the
  specimen on his own authority (founder judges last) but cannot *raise*
  the strangers' scores.

### C.6 The examination page — described, NOT built (per this task)
A single standalone page served beside the preview specimen:
- **Screen 1 — neutral entry:** one sentence (C.3's), a familiarity
  self-report (never seen this page / have seen the site before / know the
  people behind it — the third answer excludes from the 20 but the response
  is still recorded, labelled), and an "Enter" button.
- **Screen 2 — the visit:** the specimen opens full-screen (new tab or
  full-viewport frame). Dwell time is *recorded, not gated* — forcing a
  minimum stay would manufacture the patience being measured. A plain
  "Continue to the questions" control is visible from the start.
- **Screen 3 — the questions:** the ten questions verbatim, each a 1–10
  slider with only the endpoints labelled ("not at all" / "completely"),
  in the directive's order, all required, no defaults pre-set. One optional
  free-text box: *"Describe the place you visited in one sentence."* — a
  transportation probe whose answers are read, not scored.
- **Data:** one anonymous record per submission (answers, dwell, device
  class, familiarity, build hash) stored as a flat results file; no names,
  no emails, no accounts. A crew results view shows per-question
  mean/median/distribution, the §C.5 discipline subscores, and n.
- **Not in scope for the page:** the formal-study layer the directive §7
  mentions (validated presence questionnaires — IPQ/PQ class — and a
  comparison group). That is a second instrument, adopted only if
  adjudication rules the custom examination insufficient (§E, Q1).

---

## D. LADDER GRADE — THE CURRENT MINT SPECIMEN

**Grade: Level 3 — HIGH-END (cinematic interactive experience).**
Awarded on code, geometry, and measurement evidence from the frozen set.
**No human being has entered the specimen.** Every level above HIGH-END is
defined by a human verdict ("convincing," "emotionally powerful"), so no
grade above Level 3 can honestly exist today — including from the founder,
whose visitor-judgment has not yet happened.

| Boundary | Evidence |
|---|---|
| Above **BASIC** (static website) | The specimen is a layered real-time stage: cinematic loop, two particle systems, lerped parallax, portal transitions (README; BL §3–§4). Not static by any reading. |
| Above **MEDIUM** (animated website) | It is *interactive*, not merely animated: portal doors a visitor operates, instrument/object anchors with working interact events and on-page consumers, a second universe reachable through the portal (BL §5; VR2 §5, §8 G3/G8d PASS). |
| **HIGH-END** — held, with one condition | Cinematic leg: RMSE-gated loops (1.80/1.18 vs gate ≤ 8, frame-exact, verifier-reproduced — VR2 §3) at 24 fps (inside B5). Interactive leg: PASS at mechanism level (§A.10, §A.12). Commercial leg: PASS (§A.14). **Condition:** even HIGH-END's "cinematic" rests on measured assets + code, not on a rendered browser session — UV-01 has never run. If UV-01 shows the composite failing in a real browser, this grade falls back to MEDIUM until fixed. The grade is real but it is *provisional on UV-01*, and it says so. |
| Below **PLATINUM** (convincing living universe) — what blocks it, by name | (1) **Zero human evidence** — "convincing" is unjudged; §A experience disciplines UNVERIFIED. (2) **D-01 open** — the actual inhabitant cannot be occluded; **Solnik integration FAIL** (§A.9): the specimen's character plane holds a token, not Solnik. (3) **UV-01** browser proof and **UV-02/G11** device budgets unrun — Performance UNVERIFIED (§A.13). (4) **Environmental sound FAIL** (§A.7) — no directional/synchronized mechanism. (5) **NC-02** listening judgment owed. Any one of these blocks PLATINUM; all five are named, none is hidden. |
| Below **PLATINUM-PRISTINE** (≥95/100 + zero critical defects + independent human validation) | Unreachable by construction today: no PIS-01 total score can be computed (5 disciplines unscored, §A tally), a known character defect stands open against the zero-defect condition, and independent human validation does not exist. This is stated so the title is never drifted into. |

---

## E. OPEN QUESTIONS FOR GEMINI (challenge brief #119)

1. **Science transfer.** Slater's Place/Plausibility Illusions were developed
   for immersive VR with sensorimotor contingencies a flat browser window
   does not have. Is PIS-01's use of them *measurement* or *metaphor*? If
   metaphor, what does the 2D-screen literature (transportation, narrative
   engagement, IPQ/PQ adapted forms) actually support scoring — and should
   the examination anchor to a validated instrument alongside the custom 10?
2. **The weights.** Transportation + Emotional impact carry 30/100; Visitor
   comfort carries 3 while accessibility is house law; Performance carries
   5 while holding most hard gates. Defend the weights, reweight them, or
   rule for this draft's gate-vs-score split (§B16) — and say what breaks
   either way.
3. **CLS ≤ 0.01.** On a transform-only, fixed-stage page, is 0.01 a real
   signal or below the noise floor of field measurement (75th-percentile
   real-user data)? If it can only ever be a lab number, should it be one?
4. **The 1.5 MB collision.** Is the boomerang's guaranteed seam worth ~2×
   loop bytes on mobile, or should the standard force mobile loops under
   the cap (shorter, natively-seamed, or still-led) and reserve boomerangs
   for desktop? Rule on §B2's definition, or replace it.
5. **Mobile feasibility + the thermal question.** Dual-video crossfade +
   two particle canvases + parallax on mid-range Android and iPhone Safari:
   is stable 30 FPS realistic for 30 sustained minutes, what does thermal
   throttling do to the trace, and is 30 minutes the meaningful test
   duration — or should it be tied to a real session-length distribution?
6. **Examination methodology.** With n = 20 warm-adjacent visitors (the only
   cohort this house can currently recruit — §C.2), what can honestly be
   concluded? What effect size is detectable, does the founder judging first
   calibrate or contaminate, and are this draft's invented pass bars
   (mean ≥ 8.0, no question < 6.5) defensible — or what should they be?
7. **Sound scope.** "Directional, synchronized" via Web Audio (spatial
   panning + event-synced strikes): feasible inside the payload and FPS
   budgets? And should it bind the *Mint* — a forge, where the directive's
   own example is a press strike sounding from the press — or is ambience
   honestly sufficient at HIGH-END with directionality a PLATINUM gate?
8. **The D-01 grading question.** Does PIS-01 grade the specimen's
   *contract* (occlusion proven for the character plane the Phase-3 body
   will occupy) or the *experience a visitor meets today* (the legacy
   client, unoccludable, and in the specimen not even present — a token
   stands in)? This draft graded the experience (FAIL). If Gemini rules
   the contract, §A.6 and §A.9 change state — and the standard should say
   which it grades, for every future universe, in writing.
9. **Instrument gaps.** Five disciplines have no examination question
   (Cinematic composition, Physical consistency, Environmental sound,
   Lighting, Portal continuity) and Lighting has no mechanism *or* measure.
   Are they graded by expert review, by added questions, or do they stay
   engineering-only — and who is the expert seat for composition/lighting?

*(Questions 1–8 as tasked; Q9 surfaced by §C.5's mapping and included
because adjudication will hit it either way.)*

---

## ONE-PAGE SUMMARY — PLAIN ENGLISH (for the captain to read to the founder)

**What I did.** I checked our new immersion standard — the one that says a
website should make a person feel they have stepped into another world —
against the Living Mint specimen we actually built. I changed nothing. I
only measured what we have against what the standard asks.

**The short answer.** The machine underneath is strong. The feeling is
unproven — because no person has walked inside yet.

**What is solid.** Seven of the fifteen parts pass on real evidence. The
world has real depth — layers in front of and behind where Solnik will
stand. It moves on its own, and the film loops are seamless; we measured
that, twice, independently. The two worlds we built, the Mint and the
Record, are genuinely different from each other, not repaints. The shop
part is safe: the prices sit where no effect can ever cover them. And the
visitor is in charge — sound starts off, motion can be stopped, and a
person whose body needs stillness gets a still page.

**What fails today.** Three parts fail, and I will name them plainly.
First, Solnik himself is not in the specimen yet — a golden marker stands
where he will stand, and his current live body cannot walk behind the
machines the way the standard demands. That defect was already known and
already written down; the standard confirms it matters. Second, the sound
is only background atmosphere — the standard asks for sound that comes
from the thing making it, like the press striking, and we do not have
that. Third, because of the Solnik defect, the "everything is physically
believable" part fails with it.

**What nobody knows yet.** Five parts cannot be graded at all. Did anyone
feel transported? Did anyone feel wonder? Is the picture beautiful? Is it
fast on a real phone? Nobody has entered, no phone has been measured, and
I will not guess at feelings. The moment we guess, the standard is worth
nothing.

**The grade.** On our ladder, the specimen stands at **HIGH-END** — a
cinematic, interactive experience. That is level three of five. It is not
PLATINUM, because PLATINUM means a living world that convinces a person,
and no person has judged it. Anyone who calls it PLATINUM today is
guessing.

**What happens next.** Three things, in order. We run the browser and
phone checks we still owe. You walk in and judge it as a visitor. Then —
only then, on a preview page — twenty strangers who have never seen it
answer the ten questions, with nobody telling them what to feel. Gemini is
now challenging my numbers and my method, and ChatGPT will rule on the
disagreements. That argument is supposed to happen. It is how the standard
becomes real.

— Captain's investigation seat, 2026-11-25. Draft for Gemini challenge
(#119) and ChatGPT adjudication. No score issued; no PASS claimed.

# BUILD LOG — PROVADIA LIVING CIVILIZATION ENGINE · PHASE 1 + PHASE 2 (2026-11-25)

**Order:** Founder construction order, 2026-11-25 11:00 CT (FOUNDER_ORDER_LIVING_CIVILIZATION_ENGINE_2026-11-25.md).
**Addendum:** partner challenge, founder-relayed 11:03 CT — Solnik and the environment must INTERACT.
**Doctrine note:** partner, founder-relayed 11:16 CT — Genspark stills are Flow feedstock; hero sequences only earn credits.
**Seats (Relay Law):** builder (captain's crew) → critic (independent, read-only) → improver → captain's fold →
blind verifier on the frozen set. Crew tools manifest + skills pack loaded per seat; binding skills:
cinematic-web-engineering-rules (Track 7) + creative-3d-engineering-rules (Track 5).
**No new spending. No live door touched. Founder judges last.**

---

## ⭐ DRAFT — FOUNDATIONAL VISION REGISTER ENTRY (for the captain to file)

> ## FVR-30 · ⭐⭐ THE LIVING CIVILIZATION ENGINE (FOUNDED 2026-11-25)
> PROVADIA's permanent engine of living worlds: every door a portal, every portal its own universe —
> cinematic AI environments (Flow/Omni) composited with real-time software layers (particles,
> machinery, light), parallax depth, portal transitions and per-universe sound, behind a commercial
> foreground that stays fully functional and is never obstructed. The inhabitant (Solnik) and the
> environment interact: he walks behind machinery (occlusion), emerges through portals, approaches
> instruments and works objects — anchors are first-class data (perch · portal · instrument ·
> object, with interaction metadata). Genspark manufactures the scenery · Google Flow brings the
> scenery to life · the Software Factory engineers the physics and interactions · PROVADIA OS
> connects the universes · Solnik inhabits the civilization. One engineering foundation, unlimited
> individual universes — consistency of quality, never sameness of experience. Phases: 1 engine
> foundation · 2 Mint specimen (separate from the live listing) · 3 Solnik's animated character
> system · 4 the Grand Arrival · 5 Keeper/Sentinel/Record · 6 verified expansion. Laws: Zero
> Known-Defect · Promise-to-Function · no additional spending · founder approval final.
> Owner: the founder (vision) · the captain (construction) · Gemini (independent engineering +
> verification) · ChatGPT (architectural challenge — its technical verdict on this build is
> PENDING as of 2026-11-25 11:16 CT; no PASS issued or claimed).

---

## 1. THE FIVE-PART PIPELINE (partner doctrine, 2026-11-25)

1. **Genspark manufactures the scenery** — 64 stills landed, all catalogued as Flow feedstock
   (ASSET_LIBRARY §G, per-universe, motion-typed: machinery · water · sparks · light).
2. **Google Flow brings the scenery to life** — credits preserved for HERO SEQUENCES only
   (ASSET_LIBRARY §G shortlist, 6 items); everything else animates by Veo Fast when windows open,
   or at 0 credits as an engine real-time layer.
3. **The Software Factory engineers the physics and interactions** — this build: the Engine.
4. **PROVADIA OS connects the universes** — the portal system + per-universe configs are the
   connective tissue; FVR-29 integration is architectural (configs are data an OS shell can host),
   no OS construction was authorized or done here.
5. **Solnik inhabits the civilization** — the anchor/character-plane contract below; his animated
   body is Phase 3, running in parallel under its own coordinator.

## 2. DELIVERABLE 1 — ASSET LIBRARY (`ASSET_LIBRARY.md`)

Recounted on disk (the critic caught first-pass totals at 42/45; the truth is **39 MP4 · 49 stills ·
64 Genspark images**): every film with its Sound Law state, every frame pair, every town-art batch
(Batch #4 landed during this build and is filed), the live film machines, the Flow credit ledger
(Account 1: 9,910 cr, resets Dec 23 · Account 2: ~9,798 cr, pool ENDS Dec 23 · Omni 1.2 Flash
24 cr/take · Veo/Omni retire Dec 5 · Account 1 video wall UP at 10:50 CT, failures at 0 cr), the
feedstock markings + hero shortlist, specimen-derivative provenance, and the named gaps
(Door 10 missing · Films 17–37 pairs incomplete · founding-batch sound debt).

## 3. DELIVERABLE 2 — ENGINE FOUNDATION (`engine/`)

`living-universe.js` (40,721 B; ~13 KB gz class) + `living-universe.css` (5,927 B) +
`universes.js` (7,903 B) + `README.md` (the contract) + `test/engine.test.mjs`.

**Layers** (z-map is the single source of truth, `LivingUniverse.Z`): L0 palette field · L1
cinematic loop (dual-video crossfade, lazy standby, honest error state) · L2 still art · L2f
particles far · **CHARACTER PLANE (z30)** · L2n particles near · **L3 OCCLUSION (z40)** · shade ·
anchors (z46) · content (z100, outside the stage, unreachable by the world) · controls (z200) ·
portal overlay (z300, coloured per universe from its config).

**Decisions + evidence:**
- *Universes are data.* Mint and Record configs differ in palette, particle renderer (spark
  streaks vs mote soft bodies — different draw code, not just numbers), occluder motif, intensity
  (1.0 vs 0.55), sound presence, anchor graph — asserted in tests. Keeper/Sentinel/Wall/Agora
  configs exist as stubs with library assets assigned (Phase 5).
- *Parallax is lerped, never raw* (Track 7), from passive scroll/pointer sampling; monotone in
  depth, asserted numerically. Frame loop: cached layer list, no per-frame DOM queries or layout
  reads, rAF-coalesced scroll, debounced resize, IntersectionObserver off-screen pause, DPR ≤ 1.5.
- *The loop gate.* An L1 asset must measure first/last-frame **RMSE ≤ 8** (72×128, PIL, frames
  extracted **by frame number** — the contract method). Record astrolabe: the source is a
  separation film (native 38.61) — two crossfade constructions measured 31.91 / 21.14 and were
  REJECTED on the numbers; the shipped **boomerang** (forward+reverse) measures **1.18**
  (reproduced exactly by the blind verifier). Mint workshop loop: the builder's first reading
  (4.50) came from a −0.15s seek extraction — a method error; the verifier's frame-exact method
  measured the straight re-encode at **8.35, over the gate**, so it was replaced with the same
  boomerang construction: **1.80**, stable across resampling methods (1.80/1.80/1.93). The
  engine crossfade is the second line of defence, never the excuse.
- *Sound.* Off by default, lazy, honest (a universe without an asset gets a disabled control;
  the button claims "on" only after playback starts). Mint ambience = Film 08's own audio,
  acrossfaded for looping, mean −18.5 dB measured after treatment.
- *Sovereignty.* Motion/Sound controls in-stage; `resolveMotion` (unit-tested): reduced-motion
  wins per load, stored choice otherwise, default on. Motion off = poster rung shown, zero video
  bytes, identity transforms, instant portal. A no-JS poster rung ships inside the specimen stage.

## 4. DELIVERABLE 3 — THE MINT SPECIMEN (`specimen-mint/`)

`index.html` (the Mint) + `portal-record.html` (the Record — the portal target proving a second
universe on the same engine) + `assets/` (derivatives, provenance in ASSET_LIBRARY §F).
The live `/listings/mint.html` and every live door are **untouched**; the specimen is a separate
prototype environment, banner-labelled as such. It carries the Mint's commercial truth as
foreground instruments: founding strike **$245** · holder strike **$196** · purchasing **closed**
(disabled control + gate note) — plain HTML, identical in every motion/sound state.
**To view:** serve the folder (`python3 -m http.server` in `living-universe/`) and open
`specimen-mint/index.html`, or open the file directly. It is NOT staged in the repo and NOT
linked from any door — repo staging is a captain step after founder judgment.

**Payload (counted on the shipped files, Track 5 Rule 6):** Mint page before video ≈ 209 KB
(HTML 10.4 KB · engine JS+CSS+configs 54.6 KB raw · poster 66.0 KB · still 77.7 KB); the loop
(1,874.1 KB boomerang) streams only when motion is on — **0 video bytes** for motion-off
visitors. Record page ≈ 205 KB before its 2,358.8 KB boomerang loop (the price of a guaranteed
seam, named for both).

## 5. THE FOUR INTERACTIONS (addendum) — satisfaction, interaction by interaction

| # | Interaction | State | Evidence |
|---|---|---|---|
| 1 | Walk BEHIND machinery (occlusion) | **SATISFIED for the character-plane contract; OPEN for the legacy 3D client (Defect D-01)** | Occluder z40 > character z30 (test-asserted); the gear is *formula-placed* over the press anchor (`occluderLayout` + `MOTIF_GEOMETRY`); the test suite asserts the anchor's whole 44px box lies inside the disc at 1920×1080 and 320/375/390/430 — the critic's C1 geometry failure (gear ended ~450px short of the anchor) is closed on the numbers. In-browser elementFromPoint proof: UNVERIFIED (no browser in this seat). |
| 2 | Emerge THROUGH portals | **SATISFIED as architecture + visitor function; inhabitant emergence rides the Phase-3 mount** | Portal anchors are first-class config (validated two-way linkage anchors↔portals); portal-enter events fire for visitors (click/keyboard, iris in the universe's own colour — the body-overlay colour bug the critic caught is fixed) and for the probe; `api.portalTo()` is the character system's door. |
| 3 | Approach instruments | **SATISFIED** | Instrument anchors are real DOM in his client's exact contract (`data-solnik-anchor`, `data-solnik-x`, rect-based, width<30 skip — compared line-by-line with `living-entity-v2.js anchors()`); probe trail order perch→instrument→object→portal is test-asserted. |
| 4 | Interact with objects | **SATISFIED at specimen level** | `interact{verb,label,target}` is validated, and it has a CONSUMER: arrival fires `living-universe:interact`; the specimen highlights the target card (#instrument-press · #object-coins · #object-daybook — the critic's wrong-target findings fixed); `api.interact(id)` is the character system's trigger. The inhabitant's own "works it and explains it" behaviour is Phase 3's, on this contract. |

## 6. CHATGPT'S FIVE CHALLENGE AREAS — state of each

- **Living environments:** two universes live on one engine (forge vs archive — different light,
  particles, motion intensity, sound), loops gated by measurement, ambience per universe.
- **Solnik continuity:** one anchor contract across the live client and the engine (data shape
  verified against his code); one mount (`#solnik-mount`) on every universe's character plane;
  his brain/voice/personality untouched by this build. Integration RUN with his client on an
  engine page: not yet performed (NC-04).
- **Performance (phones first):** payload counted per page (above); frame loop transform-only by
  construction; occlusion geometry verified at 320/375/390/430. Real-device traces: UNVERIFIED.
- **Scalability:** 2 built universes + 4 asset-assigned stubs on config alone; vocabulary limits
  stated honestly in the README (new motif = small table-driven addition, not a rebuild).
- **Commercial functionality:** foreground is plain HTML outside the stage; occluders are
  stage-bounded (critic attack R2 REJECTED — could not make an occluder reach a price);
  motion-off foreground verified identical (R3 REJECTED).

## 7. RELAY RECORD

- **Builder:** engine + specimen + library; pure-core suite 32/32.
- **Critic (independent):** 15 CONFIRMED (2 Critical · 3 High · 6 Medium · 4 Low) · 5 NEEDS-CHECK ·
  8 REJECTED (kept on record in `reviews/CRITIC_REPORT.md`). Worst: occlusion geometry never
  overlapped (C1) · legacy-client occlusion impossible (C2) · Record loop melt (C4).
- **Improver:** 11 defect classes fixed in place (portal colour, lazy standby preload, honest
  media errors, per-frame DOM cost, lifecycle/destroy, validation hardening, CSS touch targets…);
  suite 46/46 + a 17-check DOM-stub mount harness (`reviews/IMPROVER_REPORT.md`).
- **Captain's fold (this log):** C1 occlusion formula + geometry tests · C3 interact consumer +
  target fixes · C4 boomerang loop (1.18) after two measured rejections · C7 probe/canvas
  coordinate conversion (`stageToLayerPct`) · C8 library recount (39/49/64) · C9 derivative
  provenance · C11 poster rung in-page + in-layer · C12 particle renderers differ + occluder
  colour from palette · C13 stage-scope documented · C5 closed by this log + the freeze below.
  **Suite on the frozen set: 61 passed, 0 failed.**
- **Blind verifier, round 1:** ❌ FAIL — FREEZE BROKEN + one asset over the gate. Two catches,
  both real: (1) the §11 hash for `mint-press-room.webp` was mis-transcribed into this log
  (mid-string splice; the artifact itself never changed — its bytes predate the freeze and no
  process wrote it after); (2) the Mint loop's 4.50 was refuted by frame-exact measurement
  (8.35). Everything else reproduced: recount 39/49/64 exact · Record RMSE 1.18 exact ·
  occlusion geometry independently recomputed PASS at both sizes · isolation clean · all other
  gates PASS on their own terms except budgets (UNVERIFIED). Resolution: Mint loop rebuilt as
  boomerang (1.80) · library/README/specimen corrections · defect numbering unified to D-01 ·
  **Freeze v2** below, and a fresh blind verifier grades v2. (`reviews/VERIFIER_REPORT.md`.)

## 8. VERIFICATION VERDICTS (per gate)

| Gate | Verdict | Basis |
|---|---|---|
| Layers independent + composited | PASS (code + tests) | z-map asserted; layers mount independently; stub/DOM harness 17/17 (improver) |
| Parallax real, measured | PASS (math) · UNVERIFIED (device) | monotone/direction asserted numerically; no device run exists |
| Portal transition works | PASS (code + events) · UNVERIFIED (browser) | events + navigation paths in code; iris colour fixed + unit-visible |
| Occlusion covers the inhabitant's anchor | PASS (geometry, 5 sizes × 2 universes) · UNVERIFIED (browser pixels) | §5 row 1 |
| Foreground functional, motion ON and OFF | PASS | plain HTML outside the stage; critic attacks R2/R3 rejected |
| Mobile 320/375/390/430 | PASS (geometry) · UNVERIFIED (rendering) | occlusion matrix + responsive CSS; no browser in this seat |
| Reduced-motion honoured | PASS (code + tests) | resolveMotion unit tests; CSS kill-switches; poster rung |
| Sound off by default | PASS (code) | lazy Audio, enable-only-on-play; Record control honestly disabled |
| Budgets (Track 6: LCP ≤2.5s · INP <200ms · CLS <0.1) | **UNVERIFIED** | payload counted (CLS-safe by construction: transforms only, fixed stage height); no timing measurement exists — named, not claimed |
| Live doors untouched | PASS | all writes confined to `living-universe/`; live Mint hash untouched by this build |

## 9. OPEN DEFECTS + UNVERIFIED (Zero-Defect: named, blocking any final PASS)

- **D-01 (architectural, OPEN):** the legacy 3D Solnik client's body-appended canvas
  (z-index 2147483000) cannot be occluded by any page layer. Resolution path: the Phase-3
  cartoon body mounts in the character plane, where occlusion is proven. The specimen's own
  lab discloses this limit in plain words.
- **UV-01:** in-browser rendering proof (occlusion pixels, iris, crossfade, probe readout) —
  needs the captain's browser seat on the frozen set.
- **UV-02:** CWV + 16.7ms frame budget on a real phone — needs a device/instrumented probe run.
- **NC-01 (critic N2):** specimen prices $245/$196 vs the *rendered* live listing — the static
  file carries prices dynamically; house record + the captain's brief agree on $245/$196, but a
  rendered-page check is owed before either side is believed.
- **NC-02 (critic N3):** ambience loop seam — crossfade applied, dB measured; a listening
  judgment is still owed (Sound Law: dB ≠ quality).
- **NC-03 (critic N1):** touch-pointer parallax contribution on phones (scroll term is proven).
- **NC-04 (critic N4):** one integration run of the real Solnik client on an engine page.
- **NC-05 (improver):** standby-video promotion under real network throttling untested;
  rejected-play() treated as video error (judgment call, reversible).

## 10. WHAT PHASE 4 (THE GRAND ARRIVAL) NEEDS FROM THIS FOUNDATION

1. A **third config** (`arrival`) — the engine takes it as data; the Arrival needs its own
   palette/anchors (gate portal as the primary anchor) and the Omni portal hero film
   (ASSET_LIBRARY §G #1, start frame `town-gate-from-inside`) shot **before the Dec 5 Omni
   retirement**, while Account 2's pool (ends Dec 23) is spent first.
2. The **portal chain**: Arrival → universe doors as a config-level route map (portals[]
   already supports cross-page hrefs; the Arrival adds a hub graph + arrival→door iris
   colour handoff).
3. **Solnik's greeting beat**: his Phase-3 body mounted at `#solnik-mount`, entering through
   the Arrival's portal anchor (portal-enter event) — the contract is ready; the body is not
   this build's.
4. An **immediate skip + direct commercial access** (founder order §5): a foreground control
   pattern the specimen's controls establish (visitor sovereignty), extended to a skip-arrival
   link stored per visitor.
5. The **browser/device verification seat** (UV-01/UV-02) run on the Arrival first, since it
   is the civilization's front door — the specimen's UNVERIFIED list is the checklist.

## 11. FREEZE v2 (sha256, 2026-11-25 — supersedes v1; the blind verifier grades THIS set)

*Correction record: Freeze v1's entry for `mint-press-room.webp` was mis-transcribed into this
log (a mid-string splice); the artifact's bytes never changed — v2 below carries the true hash,
recomputed from disk. The Mint loop, ASSET_LIBRARY, README and specimen index changed since v1
for the reasons in §7; all other v1 hashes stand and are repeated unchanged.*

```
91d62f6a03721826dd1263471382daeced2f278a3bd8bf5918ef72523eaa1fde  ASSET_LIBRARY.md
f9e008f9b53f475fafddc119346f96c9a9bc1833142e6e8d902f44bf53c4c347  engine/living-universe.js
ef72e9a5282d8982d7e45fc9c36802791b399605de54dd0eeb2d0b926293e05f  engine/living-universe.css
b3558b96dfcbe56e1bcffddfb67c86600e1cb3f6ce9c0e02c875c7e45137d4e1  engine/universes.js
f9475cda6ce2c4633d179d8d111de2b426e8999eed49c515acbc3f00bf402543  engine/README.md
4aaea1748ec51d71a6e5da32c74d76927280df66eb612d08162ffc342cf7df17  engine/test/engine.test.mjs
b2615408c5cde4cf176c77bc29378b88f7b778e533de4ca20cb5642295eb4540  specimen-mint/index.html
da07673fa0bbeba82d204cffaa009d18998206bf0030331722deed7438af3412  specimen-mint/portal-record.html
0911c04155e49c29ba5c373e3bd30209326a53f0c83ff680ea89fd2665434765  specimen-mint/assets/mint-forge-ambience.mp3
04423084ff9b3b6406bcb06464c5e3892a5fbaee55326f5efa5457dcaa57f600  specimen-mint/assets/mint-forge-loop.mp4
5aa120e843761867f0392295dbf6e0a83bab47f8c9b0add6bca8900a9c10334a  specimen-mint/assets/mint-forge-poster.webp
946bea5c85e1ef3063c3aa9e4b71062c4af7a4a602a1ed520323dddcd372e342  specimen-mint/assets/mint-press-room.webp
ad11587fc9467de34518a85f246709d2c10f36f67433d887cf8b1983be4e836d  specimen-mint/assets/record-astrolabe-loop.mp4
329ceca95da70366ad3e6d95fbe73415ff885bb000e9173f2f8d3725b02efe11  specimen-mint/assets/record-astrolabe-poster.webp
192494b140dc04066ccb9435e0f27d292b434365339f33800176877012d46f5b  specimen-mint/assets/record-hall.webp
```

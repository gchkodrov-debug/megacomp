# VIBE CODING RUN #4 — EXAMINATION REPORT
## "The Mirror Lodge of Solis-Vane" (character / expression experiment)

**Commission:** Gemini #124 (Character Chamber), executed in Google AI Studio Build (Account 1, $0 fences), exported source examined as an unverified draft per house law.
**Examiner:** Muse (captain's examination seat) — fresh-context, evidence-only. The build lane's own claims were treated as unproven until measured here.
**Fixed point:** `vibe-run4-mirror-lodge-2026-11-26/` exactly as exported (19 files, 164K). All builds and probes ran against a copy; the exported tree was never modified.
**Method:** full static read of every source file · clean install + production build + typecheck · the real compiled collision module exercised in Node (19,201-point grid, 8 simulated click-walks, WASD drives, companion-band simulations) · the real built app driven live in headless Chrome (network census, console census, HUD expression polling, reduced-motion differential, mobile viewport, glass pixel sampling).

**Headline: 5 of 7 commission claims PASS outright; the companion claim and the collision claim are PARTIAL — everything that was promised exists and works, and the two partials are softnesses in guarantees, not missing features. This is the strongest character-system evidence of the four runs: expressions are genuinely data, and the reflection is genuinely a second render of the same state — both proven, not asserted.**

---

## 1. CLEAN INSTALL & BUILD — ✅ PASS

- `npm install` on a pristine copy: 80 packages, no errors.
- `npm run build` (vite 5.4.11): **PASS in 1.46 s** — dist = `index.html` + one JS (197.2 KB / 62.6 KB gzip) + one CSS (16.7 KB), 220 KB total.
- `npm run lint` (`tsc --noEmit`): **zero errors**.
- Dependencies are only `react` + `react-dom`; dev tooling is vite/tailwind/typescript. **No AI/server packages at all** — no `@google/genai`, no express, nothing that could phone a model (see §9 on the paperwork that claims otherwise).

## 2. ZERO-CALL / $0 FENCES / HASH ROUTING — ✅ PASS

- Source grep across `src/`, `index.html`, `vite.config.ts`: **zero** `fetch(`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon`. **Zero** `http://` / `https://` strings in any app source file. **Zero** `process.env` / `import.meta.env` / API-key references. No key-shaped strings anywhere in the tree; no `.env.local`; no server file exists.
- Live network census (headless Chrome, full session incl. interactions): requests were `/`, the JS bundle, the CSS bundle, and `favicon.ico` — **zero external origins**.
- The shipped bundle's only URL strings are W3C namespace identifiers, a React error-decoder link string, and a Tailwind CSS comment — none is ever fetched (the live census is the proof).
- Fonts are system stacks only (`index.css` has no `url(`); no CDN of any kind.
- Routing: hash only — the app forces `#/lodge` via `history.replaceState` and a `hashchange` listener (verified live: hash reads `#/lodge` after load). No router library.
- The only external URLs in the export live in the stock `README.md` (an ai.google.dev banner image and the ai.studio app link). They are never loaded by the app — but see §9: the README is unscrubbed boilerplate.

## 3. EXPRESSION SYSTEM — ✅ PASS (it is data, and the cycle is exact)

- `src/data/expressions.ts` is a true expression table: four states (`neutral`, `smile`, `surprise`, `laugh`) × 15 numeric parameters each (brow offset/tilt/arch, eye scale, pupil scale, squint arc, mouth width/curve/open, cheek blush, head tilt/lift) **plus a per-state `duration`**, and an `EXPRESSION_SEQUENCE` array fixing the cycle order.
- The face renderer (`drawLayeredFace` in `characterRenderer.ts`) is fully parameterized by that record — brows, layered eyes (sclera/iris/pupil/glint/lash), mouth shapes and head pose are all computed from the data. Nothing about an expression is hard-coded per frame; two branch points key off the data itself (`surprise` gets the O-mouth; `mouthOpen > 0.45` gets the open laugh mouth) and read their geometry from the same record.
- The cycle driver (`LodgeStage.tsx`) advances `mirrorExprIndex` only while the visitor stands at the mirror, holding each state for exactly `EXPRESSION_STATES[id].duration`, wrapping modulo the sequence; leaving the mirror decays the reveal and resets the cycle to neutral.
- **Live verification** (HUD label polled every 200 ms after clicking "Visit Mirror"): Neutral → Smile → Surprise → Laugh → Neutral → Smile → Surprise → Laugh, with measured dwells ≈ 2.17 / 1.99 / 1.94 / 2.35 s against data durations **2.0 / 2.1 / 1.9 / 2.3 s** — agreement inside polling granularity, loop confirmed over two full cycles.
- The visitor's own face wears the same cycling expression while at the mirror (`expressionId: atMirror ? mirrorExpressionId : 'neutral'` in the scene renderer), so the state machine is visible on both renders at once. Portrait cards also read the same table (selected card renders `smile`).

## 4. THE REFLECTION — ✅ PASS (a second render of the same state, palette swapped)

- The glass draws the visitor by calling the **same** `drawLayeredCharacter` with `useMirrorPalette: true`, the **same** `mirrorExpressionId`, the **same** blink amount and the **same** clock as the room body — one flag flips `character.palette` → `character.mirrorPalette`. It is not a second picture: freeze any frame and the reflection's expression, blink and identity are the live state.
- **Pixel proof** (default character Maren; glass region = 23,355 px sampled before and after standing at the mirror): before — mirror coat `#cbd5df` **0 px**, mirror skin `#e5dfd8` **0 px**. After — mirror coat **1,331 px**, mirror skin **1,872 px** (her normal-palette coat `#2a3c4e` reads only 226 px, dark-glass tolerance noise). The alternate-palette figure is really in the glass.
- Reveal is gated by presence: reflection fades in only while the visitor stands on the mirror ring (`standActivateRadius` 46 and stationary), fades out when she leaves; the brass plaque under the glass names the current expression from the same data.
- Design note (not a defect): the reflection is a front-facing portrait at 2.38× scale inside the glass, not a geometric mirror image of the room-space body. That matches the commission's own definition — *"reflection as a second render of the same state"* — and it is the more legible choice for reading expressions.

## 5. THE COMPANION (Pip-Vane) — ⚠️ PARTIAL

The companion is a separate data record (`COMPANION_DATA`: own porcelain/brass/ribbon palette, own renderer, walk speed 154, three band distances, three greeting lines, one mirror line) — not a sixth visitor recolor.

### 5a. Distance-band following — ⚠️ PARTIAL
- The logic is a real hysteresis band: follow starts when distance > `maxFollowDistance` 98, stops at ≤ `stopFollowDistance` 72, with an inner push-away below `minFollowDistance` 56. The companion routes through the same collision resolver as the visitor and **never strands** in any simulation.
- **Measured resting distance is ≈ 80–98 px, not the data's 72.** Replicating the stage's follow block line-for-line over the real collision module: visitor sprints at 192 to the far corner and stops → companion rests at **97.78**; visitor strolls at 148 across the room and stops → **80.55**; visitor walks at 172 to the mirror stand and stops → **88.85**. Cause: the stationary-pause rule (`!visitorMoving && dist ≤ max → following = false`) freezes the companion wherever it happens to be inside max range the moment the visitor halts. Stop-at-72 only occurs while the visitor keeps moving. The band exists and behaves coherently — but the number a user actually sees at rest is the max edge, not the stop edge (defect D1).
- Note: the fastest visitor (Seraia, 192) outruns the companion (154) while moving; he closes once she stops. Nobody is ever lost.

### 5b. Greetings — ⚠️ PARTIAL
- Lines are data and rotate correctly: shown on load, on character switch, on the "Greet" buttons, and by clicking Pip-Vane himself (clicks within 34 px of him cycle the line instead of walking there — inhabitants as click targets). The mirror line ("Look there—the standing glass is waking for you.") is genuinely proximity-triggered on entering the mirror radius, latched so it doesn't repeat until exit/re-entry.
- **But the welcome line is pre-empted at spawn.** The entry stand point (480, 462) sits 150 px from the mirror stand point — inside the 178 px `pointTriggerRadius` — and `wasNearMirror` initializes `false`, so on frame 1 the mirror line overwrites `greetingLines[0]` and its 5.5 s timer. Pip-Vane's first words are about the mirror, not the welcome; the welcome line is only reachable later via rotation. The same oversized radius makes him point at the mirror from across the room (defect D4).

### 5c. Body separation — ❌ on the narrow guarantee (minor, deliberate-action only)
- There is **no visitor↔companion collision anywhere in the code** — the resolver only knows furniture and walls. The inner push-away (0.55 × 154 ≈ 84.7 px/s) is slower than every visitor (148–192), and it stops at walls.
- Measured: steering the visitor at a companion cornered against the bottom-left wall for 6 s reaches a **minimum separation of 4.00 px** against a radii sum of 30 — the drawn bodies can fully overlap. In ordinary use this is masked (click-to-walk near Pip greets instead of walking onto him); it takes deliberate WASD pursuit into a corner (defect D2).

## 6. COLLISION — ⚠️ PARTIAL (the stopping is perfect; the target clamp is not)

- Mechanism: circle-vs-AABB separation with 3 relaxation passes and a shortest-axis push-out for centres inside a box, applied axis-separated (X then Y) for sliding, over 8 furniture AABBs + floor bounds. Frame delta is clamped to 0.05 s in the stage loop, so the largest step (192 × 0.05 = 9.6 px) can never tunnel through the thinnest obstacle (30 px).
- **The body never penetrates.** Across 8 simulated click-walks and WASD drives, the worst path clearance was **−0.15 px** (a sub-pixel graze sliding along the candelabrum corner). Clicks inside the mirror, hearth, bookshelf and cedar chest clamp to the furniture edge and the visitor **arrives exactly** (end distance 0). The mirror stand point is reached cleanly (arrival clearance 33 px). WASD up-left into the mirror slides along its base and stops at the brass ring line, no clipping.
- **The clamp's own promise fails in narrow pockets.** `clampTargetToWalkable` claims to resolve "any clicked floor point cleanly outside furniture obstacles." Grid proof: of 19,201 sampled floor points, **1,448 clamped results still penetrate** an obstacle (worst −16 px), all where free space is narrower than the 34 px body — the wall↔hearth strip (18 px), the candelabrum↔mirror corridors (28 px), the armchair↔tea-table gap (14 px). The 3-pass relaxation oscillates between the two faces and gives up mid-pocket.
- Consequence is graceful, not broken: a click in such a pocket sets an unreachable target; the visitor walks to the pocket mouth and the stage's no-progress rule (progress < 0.25 px/frame) clears the target — measured stops 44–92 px short, no strand, no clip, no jitter loop. But she does not arrive where the user clicked (defect D3).

## 7. CHARACTER DATA — ✅ PASS (five genuinely different people)

- Each of the five characters carries: a full 12-colour palette **and** a full 12-colour mirror palette (all skins, coats and mirror coats mutually distinct), distinct body proportions (scale 0.94–1.07, torso width 21–29, torso height 28–35, leg length 21–27, head radius 14–15.5), a distinct walk speed (148 / 164 / 172 / 178 / 192), a distinct idle mannerism with its own animation branch, and a distinct name/role.
- The renderer branches on `coatStyle` and `hairStyle` to draw **different geometry**, not different colours on one body: scarf + tail (longCoat), leather apron + pocket stitch (apronVest), capelet + clasp (capelet), cravat + double-breasted buttons (frockCoat), mantle + sash (stormMantle); chignon + hairpin, peaked cap + beard, twin braids + ribbons, swept waves + silver streak, wind curls.
- Portrait cards are rendered from the same data by the same renderer — the picker shows the actual in-world body (and the card's two swatches are the coat and mirror-coat from the record).
- One blemish: for the peaked-cap character the face is drawn **twice** (once before the beard layer, once after, "to re-draw the mouth above the beard") — cheek-blush alpha compounds and the eyes are overdrawn (defect D5, cosmetic).

## 8. MOBILE — ✅ PASS (live at 375×812)

- `document.documentElement.scrollWidth` = `window.innerWidth` = **375** — no horizontal overflow (the shell also carries `overflow-x: hidden` at html/body/root and on the app container).
- The picker is a true bottom drawer: a 54 px closed bar (current visitor + Greet + Visitors), opening a fixed bottom sheet (`#mobile-visitor-drawer`, max-height 72dvh, backdrop tap-to-close, `role="dialog"`). Verified live: drawer opens on tap; picking Seraia Vane closes it and the bottom bar shows her name and role. Desktop instead gets the 320 px sidebar of portrait cards.
- The canvas stage is `touch-action: none` with pointer-driven click-to-walk, so taps walk rather than scroll.

## 9. HYGIENE — ⚠️ boilerplate present (non-blocking; the app itself is clean)

- `metadata.json` declares `"majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]` — **there is no server and no Gemini call anywhere in this app.** The declaration is false paperwork left by the generator.
- `.env.example` instructs a `GEMINI_API_KEY` the app never reads; the stock `README.md` (AI Studio banner, external image URL, "set the GEMINI_API_KEY" step) is unedited generator text.
- `vite.config.ts` carries the AI Studio `copy-unbundled-src-assets` plugin and `DISABLE_HMR` handling — inert here (no `src/assets` exists), but generator scaffolding.
- No favicon ships: the only two console errors in a full live session were the `favicon.ico` 404s.
- This is the **same unscrubbed boilerplate found in Runs #1–#3** — the export was filed as-is again. None of it executes; all of it misdescribes the artefact, and the metadata line claims exactly the paid-API capability the $0 fence forbids.

## 10. THE THREE THE BUILD LANE DID NOT VERIFY — all three now verified

| Unverified item | Verdict | Evidence |
|---|---|---|
| WASD / arrow movement | ✅ **PASS — exists, wired, live** | `LodgeStage` key handlers (code-named keys, input-field guard, `preventDefault`, blur clears the set, any keypress cancels a click target); live: holding ArrowLeft 650 ms changed the canvas; click-to-walk also live-verified |
| `prefers-reduced-motion` behaviour | ✅ **PASS — the most complete treatment in any run** | Live `matchMedia` observer (reacts to changes mid-session) threaded into blink (disabled), walk cycle, idle mannerisms, laugh bob, candle flicker (frozen at 1.0), hearth flames, dust motes (update returns early; shimmer fixed), mirror-ring pulse, walk-target pulse, companion key spin and clock hand, mirror reveal (snaps instead of fading); CSS kill-switch for transitions. **Live differential: two frames 1.4 s apart under emulation are pixel-identical; without emulation they differ.** Note: a walked character still translates under reduced motion — animation freezes, user-driven position does not; that is the correct reading of the preference |
| Zero external calls | ✅ **PASS** | §2: source greps zero, bundle census zero fetched URLs, live network log zero external origins |

Ambient life (commission item (e)) is covered by the same evidence: 10 data-driven candles with per-candle phase/intensity flicker, hearth flames, and 44 dust motes all run continuously through walking, following and the mirror sequence — and all freeze together under reduced motion.

---

## COMMISSION SCORECARD

| # | Claim (Gemini #124 as executed) | Grade |
|---|---|---|
| a | Five original characters chosen from portrait cards | ✅ PASS |
| b | Chosen visitor walks the room — click **and** WASD/arrows | ✅ PASS |
| c | Clockwork companion follows within a distance band and greets | ⚠️ PARTIAL |
| d | At the mirror: reflection in a different palette + expression cycle Neutral → Smile → Surprise → Laugh | ✅ PASS |
| e | Ambient life (candle glow, dust motes) continues | ✅ PASS |
| f | Mobile: picker as bottom drawer, no horizontal overflow | ✅ PASS |
| g | $0 fences: no paid API, no external calls, hash routing only | ✅ PASS |

## DEFECTS & NOTES (none blocking; all measured)

- **D1 — Companion resting distance ≠ data.** Rests at 80–98 px after trips; `stopFollowDistance` 72 only bites mid-motion. Cause: the stationary-pause rule freezes following anywhere ≤ max range. (§5a)
- **D2 — No visitor↔companion separation.** Deliberate corner pursuit reaches 4 px separation (radii sum 30). No body-body collision exists; push-away is outrun and wall-limited. Masked in click use by the greet-on-click radius. (§5c)
- **D3 — Target clamp doesn't converge in sub-body-width pockets.** 1,448 / 19,201 grid points still penetrating after clamp (worst −16 px); affected walks stop 44–92 px short via the no-progress rule. The body itself never penetrates (worst −0.15 px). (§6)
- **D4 — Welcome greeting pre-empted at spawn.** Entry point lies inside the 178 px mirror trigger; frame 1 replaces greeting line 1 with the mirror line. The same radius makes the companion point at the mirror from across the room. (§5b)
- **D5 — Bearded character's face drawn twice.** Cheek-blush alpha compounds; cosmetic overdraw. (§7)
- **D6 — Generator boilerplate unscrubbed (again).** `metadata.json` claims a server-side Gemini capability that does not exist; `.env.example` demands a key never read; stock README. (§9)
- **D7 — No favicon.** Two 404 console lines per load; cosmetic. (§9)

## ADOPT / ADOPT-WITH-FIX / REJECT — for the house character system (Seat J and beyond)

**ADOPT**
- **Expressions as a pure data table** — `EXPRESSION_STATES` (15 facial parameters + duration per state) + a sequence array, read by one parameterized face renderer. This is the exact shape Solnik's expression system needs: add a state = add a record; every render target (world body, portrait, reflection) inherits it for free. The live dwell times matched the data to polling precision.
- **Reflection as a second render of the same state** — same draw call, palette-swap flag, same expression/blink/clock inputs. The cheapest true mirror-self in any run, pixel-proven. Directly applicable to house mirrors, water, and any "other self" moment — including a future Solnik reflection.
- **Portrait cards rendered from character data by the world renderer** — the picker can never drift from the in-world body; the selected card even wears `smile` from the same table. The pattern for visitor-avatar pickers.
- **Companion record as data** — follow distances, speeds, greeting lines, palettes in one `CompanionData` record beside the character records; behaviour code stays generic.
- **Reduced-motion as a live, threaded simulation input** — a `matchMedia` observer whose flag reaches every animated system, plus the CSS kill-switch. Copy the *test* too: frames at rest must be pixel-identical under emulation and different without it.
- **Inhabitants as click targets** — clicking Pip-Vane greets instead of walking onto him; clicking the mirror walks to its stand point. Objects and inhabitants carry their own interactions.
- **HUD-by-snapshot with a change key** — the canvas sim notifies React only when discrete state changes; a clean, cheap bridge pattern for house stages.
- **dt clamp (0.05 s) in the stage loop** — already adopted from Run #3; confirmed again in the wild.

**ADOPT WITH A FIX**
- **The follow band** — keep the hysteresis, fix the pause rule: when the visitor is stationary, keep following until the stop distance (pause only inside the stop band). The resting distance a user sees should be the number in the data (D1).
- **Proximity triggers** — seed latch state from spawn distance (or shrink the radius to the actual "near"), and add enter/exit hysteresis per Run #3's gaze note. A 178 px trigger in a 960 px room fires from spawn and half the floor (D4).
- **`clampTargetToWalkable`** — after the relaxation passes, verify the result; if it still penetrates, fall back to the nearest verified-free point. Three passes do not converge where free space is narrower than the body (D3).
- **Hard pairwise separation as a post-step** — Run #3's adopt item, still missing here: a floor at the radii sum between visitor and companion closes the corner-pursuit overlap (D2).
- **Layered face/beard ordering** — draw the beard between face layers instead of re-invoking the whole face (D5).

**REJECT**
- **AI Studio export boilerplate as filed evidence** — `metadata.json` capability declarations, `.env.example`, stock README: scrub before any generated export enters the house record. Fourth run in a row; the metadata here claims a paid Gemini server capability the $0 fence forbids and the code never had (D6).
- **Closed-union character typing as the house schema pattern** — `CoatStyle` / `HairStyle` / `IdleMannerism` as fixed unions with renderer switch branches: inside this experiment they buy genuinely distinct geometry, but as a house pattern they mean every new garment or mannerism is a code change. House character data should carry drawing parameters, not kind tags. (Same rejection as Run #3, confirmed again.)

## EVIDENCE INDEX
- `run4/harness/measured-results.txt` — every number quoted above: build outcome, grid/walk/WASD collision results, companion-band simulations A–D + pursuit, live expression timings, reduced-motion differential, mobile measurements, reflection pixel counts, grep census.
- `run4/harness/collision-probe.cjs` + `probe2.cjs` + `probe-entry.ts` — Node probes against the real compiled `collision.ts` / `lodge.ts` (esbuild bundle of the exported sources, unmodified).
- `run4/harness/live-probe.cjs` — headless-Chrome session: network + console census, WASD/click canvas diffs, HUD expression polling, reduced-motion differential, 375×812 drawer/overflow checks.
- `run4/harness/reflect-probe.cjs` — glass-region pixel sampling for the mirror-palette proof.
- Exam copy (scratch) was deleted after the run; the exported tree `vibe-run4-mirror-lodge-2026-11-26/` is byte-identical to its delivered state — install and build were performed only on the copy.

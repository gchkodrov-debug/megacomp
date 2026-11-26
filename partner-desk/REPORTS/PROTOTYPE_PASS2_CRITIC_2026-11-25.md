# PROTOTYPE JOURNEY — PASS 2 · RELAY CRITIC REPORT · 2026-11-25

**Seat:** independent critic (different family from the builder). **Method:**
the builder's log was treated as claims, not evidence. I read `journey.js`,
`index.html`, `journey.css` and the rig (`solnik-toon.js`) in full, diffed
the Keeper data against `live/listings/keeper.html` myself, ran
`node --check`, ran my own HTTP smoke, and ran **three of my own headless
(puppeteer) exercises** — desktop manifestation flow, mobile scrub flow, a
reduced-motion locomotion probe, plus Back/Forward, reload recovery,
no-avatar deep-link redirect, and two depth measurements. Zero page errors
in every session.

**Overall:** the architecture claims are real — the spatial model, the rig,
the single manifestation path and the router all verified independently.
But the build carries **one high-severity visual defect the builder's
26 + 6 checks never looked at** (F-1), and the log's narrative is wrong
about its own population and overclaims "verbatim" and "nothing
hard-coded." Status remains **BUILT — UNVERIFIED**; the fix list in §4
should land before this goes to a founder device session, because the
manifestation — the centrepiece — is visually broken in two of its three
states on desktop.

---

## 1 · FINDINGS (severity-ordered)

### F-1 · HIGH · CONFIRMED — the `hidden` attribute loses to the stylesheet; the manifestation's states are visually broken
`journey.css` contains **no `[hidden]` rule**. Author-origin `display`
declarations beat the UA stylesheet's `[hidden] { display: none }`
regardless of specificity, and three components set `display` by class:
`.parts { display: grid }` (block under 700 px) and `.scrubber { display:
flex }` (mobile media query). Measured in my own desktop run, Mint open,
**before** Separate: `parts.hidden === true` but computed
`display: grid`, and the small parts-artifact image rendered **150 px
tall beside the main artifact**. After **Put it back together**:
`hidden === true`, `display: grid`, **all 8 part cards still visible**
next to the reassembled artifact — the reassemble step does not work
visually. On mobile (375 px) the scrubber renders **before** separation
with a bogus `1 / 1` counter. The builder's exercises counted parts and
lines after Separate but never measured computed visibility before
Separate or after Reassemble. (Panels, parchment, artifact-wrap and the
portal are unaffected — their classes set no `display`.)

### F-2 · MODERATE · CONFIRMED — reduced-motion users still get full locomotion (the log's D-5 understates this badly)
D-5 logs a "sub-threshold" idle breathe. My reduced-motion probe measured
the real behaviour: after a floor click, the visitor **glides** across the
stage (left 40 % → 61.4 % over ~1.75 s) and Solnik performs the rig's
**full walk cycle** — leg transforms sampled at −20.7° → +26.6° → −21.7°
with squash/bob — under `prefers-reduced-motion: reduce`. Scene *travel*
is instant under reduced motion, but in-scene locomotion is not reduced
at all: `journey.js` never passes its `reduced` flag to the rig, and
`solnikState()` sets `loco.mode = 'walk'` whenever the walker moves. The
rig's idle breathe and crystal pulse (`Math.sin(t * 2.2)`, unconditional
in `render()`) also run forever. This is a vestibular-safety issue, not a
sub-threshold note.

### F-3 · MODERATE · CONFIRMED — D-1 is wider than logged: the dialogue box eats the most natural click zone
The `.solnik-line` box is up to 640 px wide, bottom-centre. My first
near-depth click at x = 70 % of stage width **never registered** (visitor
state unchanged) because the point fell inside the line's box; the same
click at x = 88 % worked. The dead zone is not an edge case on long
lines — it covers the bottom-centre of the floor, which is exactly where
a visitor clicks to walk *toward* the viewer. D-1 confirmed, severity
raised.

### F-4 · MODERATE · CONFIRMED — the log's population narrative contradicts the build's own data
Read from `__journey.spatial` and the DOM in my runs:
- Log §1: "Gate: none (a threshold, deliberately empty)." **Data: Gate
  has 1 inhabitant** (`smith`, cross). The Gate is not empty.
- Log §1: Street has "a smith standing at work… an elder strolling."
  **Data: smith = stroll, elder = stand** — the two are swapped in the
  log. (Nor does the smith stroll "by the stall": he walks x 14→38; the
  stall anchor sits at x 80.)
- Log §1: Library has "a reader standing at the shelf." **Data: reader
  stands at x 68; the shelf anchor is at x 9.**
The mechanisms work; the log's scene descriptions are wrong in four
places and must not be quoted onward.

### F-5 · MINOR · CONFIRMED — Keeper facts are *near*-verbatim; the log's blanket "verbatim" claim is not
My own diff against `live/listings/keeper.html`: the six part names are
verbatim; part texts 1, 2, 3, 5, 6 are verbatim listing sentences; $5 and
"scope confirmation required" are exact; the artifact frame exists at the
cited mirror path at exactly 60,428 B; its alt text matches. **But:**
(a) the product's name is truncated — the build says "The Keeper," the
listing's name is **"The Keeper — Extended Audience"** (the full name
survives only inside a price-row label); (b) the terms **drop the
listing's sentence "No billing period is implied."** and merge/reorder
the checkout-note sentences; (c) part 4's text ("Proposed deliverables,
not a record of completed work.") is the listing's *deliverables-section
intro*, presented as if it described that one part. Substance is honest
and purchasing is closed; the claim "uses that listing's facts verbatim"
needs the three corrections in §4.

### F-6 · MINOR · CONFIRMED — "no stage position is hard-coded outside the model" is false as written
Walkers, population and anchors genuinely read `SPATIAL` (see §2). But
`travelTo()` hard-codes entry positions (`entryX = 3 / 97`, Solnik offset
−7), the stage-click handler hard-codes Solnik's follow offset, and
`buildAnchors()` hard-codes the hanging sign's `top: 2%` instead of
deriving it from its data. These are small, but the log's absolute claim
(§1, repeated in the file header) should be corrected or the constants
moved into the data.

### F-7 · MINOR · CONFIRMED (code) — manifestation sequence can complete inside a hidden panel
`applyRoute()`'s scene-change branch sets `state.product = null`
directly, without the `seqToken++` that `closeManifest()` performs. A
pending `openManifest()` timer chain can therefore still fire after the
visitor has routed away — running `burst()` and flipping button states
inside the hidden panel. No visible corruption observed; it is a state
leak waiting for a timing coincidence.

### F-8 · MINOR · CONFIRMED (code), impact NEEDS-CHECK — `navigate()` bypasses the route queue
When the hash is unchanged, `navigate()` calls `applyRoute()` directly
instead of `applyRouteQueued()`, so a re-apply can interleave with an
in-flight `travelTo()` from the queue. I did not reproduce a corruption;
the bypass is real in the code.

### F-9 · MINOR · CONFIRMED — focus is dropped on every panel swap
`showPanel()` never moves focus. Hiding the panel that contains the
focused button drops `document.activeElement` to `<body>` (observed in
my run). Keyboard users lose their place at every scene change and every
manifestation open/close.

### F-10 · MINOR · CONFIRMED — D-3's "offstage" reset is partly on-stage
A cross figure is ~11 % of stage width; respawning at x = −4 % leaves a
visible sliver (~2 % of stage width) at the edge. The pop D-3 describes
is visible, not offstage.

### F-11 · MINOR · CONFIRMED (code) — radiogroup without radio keyboard behaviour
The cast cards are `<button role="radio">` in a `role="radiogroup"` with
no roving tabindex or arrow-key handling — three separate Tab stops and
no arrow navigation, contrary to the pattern the roles promise.

### F-12 · TRIVIAL · CONFIRMED — empty `src=""` on both artifact images in the HTML
`#artifact-img` and `#parts-artifact` ship with `src=""`; some browsers
resolve that to the page URL. Set the source from JS only.

### F-13 · TRIVIAL · NEEDS-CHECK — one rig exception would kill the whole engine
`requestAnimationFrame(engineLoop)` is scheduled *after*
`toon.render(...)` in the loop body; a single throw would silently stop
every system. Not observed — the rig handled the supplied state cleanly
in all my sessions — but the loop should be exception-isolated.

### F-14 · TRIVIAL · CONFIRMED (code) — stroll inhabitants wait before their first stroll
`place()` sets `moving = false`, so a stroll walker enters the wait
branch (1.6–4.2 s) before ever pursuing its first target. Cosmetic.

### D-verdicts on the builder's own defect list
- **D-1** CONFIRMED — and measured wider than logged (F-3).
- **D-2** CONFIRMED — `update()` is a straight-line lerp; no collision
  or pathing exists anywhere in the code.
- **D-3** CONFIRMED — with the F-10 correction (partly visible).
- **D-4** CONFIRMED — my own smoke: Reading Room film 404, every other
  asset 200 (page 11,261 B · JS 46,384 B · CSS 12,839 B · portal film
  16,855,301 B · coin face 316,990 B · Keeper frame 60,428 B · rig
  22,814 B · all four stills 200). By design, as logged.
- **D-5** CONFIRMED but materially understated — superseded by F-2.
- **D-6** CONFIRMED — `playPortal()` caps the film at a 5,200 ms timeout.

### Load-bearing claims — verification summary
- **(a) Spatial model drives rendering: CONFIRMED** for walkers,
  population and anchors. My measurements: street anchor z-indices match
  `zOf()` exactly (lamp 91 · stall 65 · sign 44); click-walk depth pair —
  far (d ≈ 0.055): height 167 px, z 24; near (d ≈ 0.94): height 307 px,
  z 95 — the ratio 1.84 equals the `scaleAt()` ratio exactly. Exceptions
  per F-6.
- **(b) Real Toon rig: CONFIRMED.** `solnikMode === 'rig'` in my run;
  `render()` in `solnik-toon.js` reads exactly the state object
  `solnikState()` builds (loco/gesture/head/face/crystal fields all
  match, viseme names valid); leg transforms sampled changing mid-walk.
  Not a fake, not a pose.
- **(c) Keeper through the same `openManifest()`: CONFIRMED.** One code
  path; the switch button and both routes feed it; Keeper rendered its 6
  parts through it in my session.
- **(d) Keeper verbatim: PARTIALLY REFUTED** — see F-5.
- **(e) Router: CONFIRMED.** All five hash forms, Back (keeper→mint),
  Forward (mint→keeper), reload on `#/library/manifest/keeper` recovering
  scene + product, and a no-avatar deep link redirecting to the Chamber
  with the hint — all in my own runs, zero page errors.
- **(f) Life during manifestation: CONFIRMED.** No loop in the code is
  gated on panel or product state — engine loop, motes, parallax chase
  and population all run independently of the manifestation; the stage
  stays live while it is open.

## 2 · MY GRADES (these replace the builder's where they differ)

| Requirement | Builder | **Critic** | Why |
|---|---|---|---|
| Proof 1 — avatar inhabits | PARTIAL | **PARTIAL** | Agree. Depth, scale and z-order now independently measured; cast still stand-ins; no collision (D-2). |
| Proof 2 — Solnik natural alongside | PARTIAL | **PARTIAL** | Agree. Rig genuinely driven (my samples); "naturally" remains a founder-device judgment; lines scripted. |
| Proof 3 — visitor controls the journey | PASS | **PARTIAL** | Downgraded: F-3 — the dialogue box swallows floor clicks across the bottom-centre near-depth zone (measured); F-1 breaks the manifestation's own Reassemble control. Routing itself is solid. |
| Proof 4 — any product summonable | PARTIAL | **PARTIAL** | Agree. Two products, one path, proven; Keeper fidelity has the F-5 deviations; "any of ~800" still a pattern claim. |
| Proof 5 — world alive during interaction | PASS | **PASS** (mechanism) | Agree. Loops verified ungated in code; population measurably moves (builder) on an engine I re-ran clean. |
| Spatial-data requirement | PASS | **PARTIAL** | Downgraded: the model drives actors/anchors (verified numerically), but entry positions, follow offsets and the sign's hang are hard-coded (F-6), and the log's absolute claim is false. |
| Mobile requirement | PASS | **PARTIAL** | Downgraded: the scrub mechanism itself verified (one card, counter 1/6 → 2/6, threads hidden) — but F-1 renders the scrubber and parts **before** separation on mobile. |
| Router requirement | PASS | **PASS** | Agree, independently re-run end to end. |

## 3 · WHAT THE BUILDER GOT RIGHT (for the record)
The spatial arithmetic is exact, not approximate. The rig integration is
genuine and contract-accurate. The router is the strongest system in the
build. The Keeper was sourced from its real listing, not invented — its
flaws are three small fidelity slips, not fabrication. The log's
self-reported defects D-1–D-6 are all real; none was invented to look
honest, and two (D-1, D-5) are worse than the log admits.

## 4 · FIX LIST (for the fix pass, in order)
1. **F-1:** add `[hidden] { display: none !important; }` to `journey.css`;
   re-verify computed visibility in all three manifestation states on
   desktop *and* mobile.
2. **F-2:** honour reduced motion in-scene — when `reduced`, floor clicks
   place walkers instantly (no glide), Solnik is rendered with
   `loco.mode = 'idle'` and a frozen phase, and the rig is not re-rendered
   per frame (or is passed a still `t`) so breathe/crystal pulse stop.
3. **F-3:** give `.solnik-line` `pointer-events: none` (it is a status
   readout, not a control) or move/shrink it; re-test the bottom-centre
   click zone.
4. **F-4:** correct log §1's population narrative to match `SPATIAL`
   (Gate crosser · Street smith strolls / elder stands · Library reader
   at x 68) — or change the data to match the intended descriptions;
   one of the two, so log and build agree.
5. **F-5:** name the product "The Keeper — Extended Audience"; restore
   "No billing period is implied." to the terms and the listing's
   sentence order; give part 4 a part-specific listing sentence or mark
   its text as the section's framing line.
6. **F-6:** move entry positions and the hang offset into `SPATIAL`
   (per-scene `enter: { fromLeft, fromRight }`; `anchor.top` for hanging
   props), or strike the absolute claim from the log and header.
7. **F-7:** clear the product through `closeManifest()` semantics
   (`seqToken++`) on every path that nulls it.
8. **F-8:** send same-hash `navigate()` calls through
   `applyRouteQueued()`.
9. **F-9:** on `showPanel()`, move focus to the panel's heading
   (`tabindex="-1"`) or first control.
10. **F-10:** respawn cross figures at x = −14 with target 114 (fully
    clear of the stage at their width).
11. **F-11:** roving tabindex + arrow keys for the cast radiogroup, or
    drop the radio roles for plain toggle buttons with `aria-pressed`.
12. **F-12:** remove `src=""` from both artifact `<img>` tags; assign in
    JS (as `openManifest` already does).
13. **F-13:** schedule `requestAnimationFrame` first in `engineLoop`, or
    wrap `toon.render` in try/catch.
14. **F-14:** initialise stroll walkers as already-waited so the first
    stroll begins immediately.

*End of critic report. No code was changed by this seat. The improver
executes §4; a blind verifier re-checks F-1, F-2 and F-3 from a clean
checkout; the founder judges last.*

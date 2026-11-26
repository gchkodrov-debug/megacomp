# PROTOTYPE JOURNEY — PASS 2 · FIX PASS · 2026-11-25

**Seat:** relay improver. **Input:** the critic's report
(`PROTOTYPE_PASS2_CRITIC_2026-11-25.md`), its §4 fix list executed in
order. **Scope touched:** `prototype-journey/journey.js`,
`journey.css`, `index.html` — plus the critic-ordered amendment to
`PROTOTYPE_PASS2_LOG_2026-11-25.md` (F-4). Nothing restructured that the
critic verified as real (spatial model, rig mounting, the single
`openManifest` path, the router). Isolated build; no deployment, no
credits.

**Re-test method (my own runs, after the fixes):** `node --check`;
HTTP smoke from a server rooted at `~/workspace/newwave`; three
headless exercises (puppeteer-core driving Chrome 157, the critic's own
method) totalling **30 checks, 30 passed, zero page errors in every
session**. Scripts were run from `/tmp/pjtest/` (`retest.js`,
`retest2.js`, `retest3.js`).

**Status after this pass: still BUILT — UNVERIFIED.** This seat does
not issue a PASS; the blind verifier grades F-1, F-2 and F-3 from a
clean checkout, and the founder judges last.

---

## 1 · THE FIX LIST, ITEM BY ITEM

### F-1 · HIGH — `[hidden]` loses to the stylesheet → FIXED
One rule added at the top of `journey.css`:
`[hidden] { display: none !important; }`.
**Re-test (desktop, 1280 px, Mint):** pre-Separate — parts
`hidden=true`, computed `display: none`; scrubber the same. After
Separate — `display: grid`, 8 parts. After **Put it back together** —
`display: none`, **0 visible part cards**, artifact back. **Mobile
(375 px):** scrubber pre-Separate `display: none` (the bogus rendered
`1 / 1` is gone); after Separate — `display: flex`, counter `1 / 8`,
exactly one card visible; after Reassemble — hidden again.

### F-2 · MODERATE — reduced motion not honoured in-scene → FIXED
In `journey.js`: under `prefers-reduced-motion`, the engine loop no
longer calls `update()` on the heroes — targets are **placed**
instantly (no glide); the population is frozen in place (stand drift
pinned to its data x); and the rig is rendered as a **still**: one
render at a frozen `t = 1` (so `loco.mode` is `idle` — nobody is
moving — and the breathe / crystal sine never advances), refreshed
only when a signature of the performance state changes (scene, product,
visitor position, facing, speaking, gesture). Scene *travel* was
already instant under reduced motion and stays so.
**Re-test (reduced emulated, street):** Solnik's figure markup
**byte-identical across 800 ms** (11,513 B both samples — no walk
cycle, no breathe, no pulse) and still frozen after a click-walk.
Floor click at 70 % / near depth: visitor at **40 % → 70 % within
160 ms** and still 70 % ~1 s later (placed, not gliding). Contrast in
full motion: the same click leaves the visitor at **42.5 % at 160 ms**
— genuinely gliding. This supersedes the builder's D-5, which
understated the defect (see the log amendment).

### F-3 · MODERATE — the dialogue box eats the near-depth click zone → FIXED
`.solnik-line` now carries `pointer-events: none` (it is a status
readout with `aria-live`, not a control; the stage click handler's old
`.solnik-line` guard is now unreachable and harmless).
**Re-test (full motion, street):** a click at the **centre of the
dialogue box's own measured bounds** — the exact point the critic's
first click died on — walked the visitor from rest (40 %) to the
clicked point (~50 %; arrival sampled at 48.2 % inside the ±2.5
tolerance while still converging). The bottom-centre near-depth zone
is floor again.

### F-4 · MODERATE — the log's population narrative contradicts the data → FIXED (log amended)
The build's data was right; the log's words were wrong, so the log was
corrected (the alternative — bending the data to match the prose — was
rejected: the data is the graded mechanism). A clearly marked
**AMENDMENT — CRITIC-CORRECTED** section now closes
`PROTOTYPE_PASS2_LOG_2026-11-25.md`; the original text is untouched and
the amendment supersedes it by name: Gate has a crossing smith (not
"deliberately empty") · Street's smith strolls x 14→38 while the elder
stands at x 66 (they were swapped; the smith is not "by the stall") ·
the Library reader stands at x 68, not at the shelf (x 9). The same
amendment carries the F-5 and F-6 claim corrections and the D-3/D-5
supersessions, so no stale claim in the log stands uncorrected.

### F-5 · MINOR — Keeper near-verbatim → FIXED (now verbatim, one mark)
Against `live/listings/keeper.html`, in the `PRODUCTS.keeper` data:
(a) name restored to **"The Keeper — Extended Audience"**; (b) terms
rebuilt as the listing's own two notes **in the listing's order** —
price note first (ending "…require confirmation. **No billing period
is implied.**"), then the checkout note ("Request scope opens email.
It does not book, purchase or trigger fulfilment. Checkout is not
connected."); (c) part 4 keeps the listing's deliverables framing line
as its text and now **marks it as such** — a `note` field in the data,
rendered on the card: *"(the listing's framing line for its
deliverables section)"*.
**Re-test:** `__journey.products.keeper` shows the full name; the terms
string contains the billing sentence ahead of the checkout note in
listing order; the rendered part-4 card shows the sentence **and** the
framing-line mark; 6 parts through the same `openManifest` path.

### F-6 · MINOR — hard-coded positions outside the model → FIXED (constants moved into the data)
Per-scene `enter: { fromLeft: 3, fromRight: 97, solnikOffset: 7 }` and
`follow: { dx: 8, dd: -0.03, exitLead: 6 }` now live in `SPATIAL`;
`travelTo()` and the stage-click handler read them. The hanging sign's
offset is data too (`top: 2` on the street sign anchor;
`buildAnchors()` reads `a.top`). The log amendment records that the
§1 absolute claim was false at build time and holds from this pass.

### F-7 · MINOR — sequence could complete inside a hidden panel → FIXED
`applyRoute()`'s scene-change branch now applies closeManifest
semantics when it nulls the product: `seqToken++` alongside
`state.product = null`, so every pending `openManifest` timer chain
dies on every path.
**Re-test:** opened the Mint in full motion (slow timers), routed to
the street 250 ms in, waited 4.5 s — the hidden panel shows the
sequence never ran: Separate still disabled, artifact still hidden,
scroll never unrolled, product null, zero page errors.

### F-8 · MINOR — `navigate()` bypassed the route queue → FIXED
Same-hash `navigate()` now goes through `applyRouteQueued()` like
every other route application. (Router regression in re-test 2:
mint → keeper → Back → Forward all land, zero errors.)

### F-9 · MINOR — focus dropped on panel swaps → FIXED
`showPanel()` now moves focus to the shown panel's heading
(`tabindex="-1"` set on first use, `focus({ preventScroll: true })`).
**Re-test:** after Chamber → Gate, `document.activeElement` is the
gate panel's `<h2>` ("The Kingdom Gate"), not `<body>`.

### F-10 · MINOR — cross reset partly on-stage → FIXED
Cross inhabitants now respawn at **x = −14** with target **114**
(critic's numbers; a cross figure is ~11 % of stage width, so both
ends are fully clear). The walker's `setTarget` clamp was widened to
`[-16, 116]` so the 114 target is real, not clipped.

### F-11 · MINOR — radiogroup without radio behaviour → FIXED (roles dropped)
The cast cards are plain toggle buttons now: container
`role="group"`, each card `aria-pressed` (set by `selectAvatar`), the
CSS selected-state selector updated to match. No `role="radio"` /
`role="radiogroup"` remains.
**Re-test:** 0 radio roles in the DOM; all cards start
`aria-pressed="false"`; selecting the Star Reader sets hers to `true`.

### F-12 · TRIVIAL — empty `src=""` on both artifact images → FIXED
Both `<img>` tags in `index.html` ship with **no `src` attribute**;
`openManifest()` assigns the source (as it already did) before either
is shown. **Re-test:** `getAttribute('src') === null` on both at boot.

### F-13 · TRIVIAL — one rig exception would kill the engine → FIXED
`requestAnimationFrame(engineLoop)` is now the loop's **first**
statement, and the `toon.render(...)` call is wrapped in try/catch
(error logged, loop unaffected). This was a NEEDS-CHECK hardening in
the critic's report — no exception was ever observed; the isolation is
structural and is claimed as such, not as a reproduced fix.

### F-14 · TRIVIAL — stroll inhabitants waited before their first stroll → FIXED
Stroll walkers are primed at build (`w.update(0.016)` right after
`place`/`setTarget`), so `moving` is already true when the population
loop first sees them and the wait branch only ever runs *between*
strolls. **Re-test:** the street's first inhabitant (the strolling
smith) moves from 17.66 % to 20.16 % within the first 0.5 s after
scene entry — no 1.6–4.2 s dead wait.

---

## 2 · SMOKE, POST-FIX

- `node --check journey.js` — **syntax OK**.
- HTTP (server rooted at `~/workspace/newwave`): page 200 (11,203 B) ·
  CSS 200 (13,039 B) · JS 200 (49,331 B) · all four scene stills 200 ·
  portal film 200 (16,855,301 B) · coin face 200 (316,990 B) · Keeper
  frame 200 (60,428 B) · rig 200 (22,814 B) — every byte count the
  critic recorded, reproduced.
- **One state change in the world, not from this pass:** the Reading
  Room film (Job 5) has since landed on disk
  (`living-universe/assets/record-reading-room_take1.mp4`, 4,468,587 B),
  so the critic's D-4 "404 by design" no longer holds. Verified in a
  live run: entering the Library now switches the background film on
  (`#bg-film.on`, `readyState 4`) — the probe-and-upgrade path the
  builder could only code-review is **observed working**. D-4 can be
  closed by the verifier on this evidence.

## 3 · GRADES THIS SEAT BELIEVES THE FIXES RESTORE (for the verifier to test, not a PASS)

| Requirement | Critic | **Improver's belief** | Why |
|---|---|---|---|
| Proof 1 — avatar inhabits | PARTIAL | PARTIAL | Unchanged by this list (stand-in cast, no collision — D-2 stands). |
| Proof 2 — Solnik natural alongside | PARTIAL | PARTIAL | Unchanged; "naturally" remains a founder-device judgment. F-2 makes his reduced-motion behaviour honest, which is correctness, not naturalness. |
| Proof 3 — visitor controls the journey | PARTIAL | **PASS (mechanism)** | Both named causes of the downgrade are removed and re-tested: the dialogue no longer swallows near-depth clicks (F-3), and the manifestation's own Reassemble control works visually again (F-1). |
| Proof 4 — any product summonable | PARTIAL | PARTIAL | The F-5 fidelity slips are corrected, but "any of ~800" remains a two-product pattern claim, as both prior seats held. |
| Proof 5 — world alive during interaction | PASS | PASS | Untouched by the fixes; the loops remain ungated. |
| Spatial-data requirement | PARTIAL | **PASS** | The three hard-coded exceptions the critic named (entry, follow offsets, sign hang) now live in `SPATIAL`; the absolute claim holds from this pass. |
| Mobile requirement | PARTIAL | **PASS (headless viewport)** | The downgrade's sole cause — scrubber and parts rendering pre-separation (F-1) — is fixed and re-tested at 375 px in all three states. Physical-device confirmation remains owed, as with every device claim. |
| Router requirement | PASS | PASS | F-7/F-8 harden it; regression re-run clean. |

## 4 · WHAT THIS PASS DID NOT DO

- **D-2 (no collision/pathing)** stands — not on the critic's fix list.
- **D-6** (the ~5.2 s portal cut vs the ET-120 window) stands — not on
  the list.
- No founder-device evidence exists yet: motion feel, frame rate and
  thermal behaviour remain **UNVERIFIED** (house law — headless checks
  prove code paths, never feel).
- The Five Proofs as a whole remain open until the blind verifier
  re-checks F-1/F-2/F-3 from a clean checkout and the founder's device
  session judges the rest.

*End of fix-pass report. Improver seat, 2026-11-25. The blind verifier
grades last before the founder.*

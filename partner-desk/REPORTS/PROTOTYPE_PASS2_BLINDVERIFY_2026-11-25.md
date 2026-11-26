# PROTOTYPE JOURNEY — PASS 2 · BLIND VERIFICATION (2026-11-25)

**Seat:** Relay blind verifier. **Method:** every claim tested independently against the running build
(`python3 -m http.server` over `~/workspace/newwave`, journey at `/next-build/living-universe/prototype-journey/`),
using my own puppeteer harnesses written for this seat — no reliance on the builder's, critic's or improver's
measurements. Seven browser sessions in total (desktop 1280×900, mobile 375×800, reduced-motion emulated,
router session, plus three follow-up probes). Avatar chosen through the real Chamber UI in every session;
all travel, clicks and manifestation steps driven through the real interface.

**Out of scope (not graded, per the seat's charter):** physical-device performance and motion *feel* —
both are founder-device matters.

---

## Claim 1 — Desktop manifestation states · **PASS**

Measured in the Library → "Ask Solnik for the Mint" flow (Separate enabled ~2.7 s after opening):

| State | `#parts` hidden attr | computed display | visible `.part` cards |
|---|---|---|---|
| Before "Separate the layers" | `true` | `none` | **0** |
| After Separate | — | grid | **8** (8 part elements in DOM) |
| After "Put it back together" | `true` | `none` | **0** |

Leader lines after Separate: `#threads` SVG held **16 child elements** with a summed rendered length of
**1,424 px** — real drawn threads, not placeholders.

## Claim 2 — Mobile scrubber (375 px) · **PASS**

- Before separation: `#scrubber` `hidden=true`, computed display `none`, rendered height **0** — not shown.
  (The `#scrub-count` DOM node contains the literal text "1 / 1" at this point, but it is inside the hidden
  scrubber and is never rendered; see Observation O-2.)
- After Separate: scrubber display `flex`, height 87 px, counter **"1 / 8"**, active part index 0,
  exactly **1** part card visible of 8.
- `#scrub-next` ×1 → **"2 / 8"**, active index 1. ×3 total → **"4 / 8"**, active index 3.
  `#scrub-prev` ×1 → **"3 / 8"**, active index 2. Counter and active card agree at every step; no bogus "1 / 1"
  appears in any rendered state.

*(First mobile run failed in my harness — a click issued before the Library panel had rendered made the
button unclickable. Re-run with panel-visibility waits passed in full; the failure was the harness, not the build.)*

## Claim 3 — Reduced motion · **PASS**

With `prefers-reduced-motion: reduce` emulated, in the Library:

- **Instant placement:** floor click at x = 82 % of stage width. Visitor centre-x: **486 px before →
  1,049 px at +150 ms → 1,049 px at +1,250 ms** (target 1,050 px). The visitor is at the target in the
  first sample and does not drift — placement, not glide.
- **Solnik static:** `#solnik-fig` innerHTML identical across two consecutive idle 800 ms windows
  (and across a separate 4 s idle window sampled every 250 ms: **0 changes in 16 intervals**);
  `#actor-solnik` bounding rect identical across the window.
- **Population frozen:** all 3 Library inhabitants' inline styles byte-identical across 800 ms.

See Observation O-1 for one transient markup change caught in an earlier, non-idle window.

## Claim 4 — Dialogue box no longer swallows floor clicks · **PASS**

`.solnik-line` bounds centre measured at **(640, 436)**. The visitor was first walked away to the far left
(centre-x 182 px). A real mouse click at the dialogue box's exact centre moved the visitor to centre-x
**636 px — 4 px from the click point** (and 454 px from where it stood). The click passed through the
dialogue readout and registered as a floor click.

## Claim 5 — The Keeper through the same manifestation UI · **PASS**

Keeper opened from the same Library panel, separated, parchment opened — the identical
`#panel-manifest` / `#btn-separate` / `#parts` / `#parchment` machinery as the Mint (6 Keeper parts
rendered vs the Mint's 8 — data-driven, same engine):

- Full name present in the parchment price rows: **"The Keeper — Extended Audience (scope price) $5"**
- **"Scope confirmation required"** present in the same price rows.
- Terms note contains the sentence verbatim: **"No billing period is implied."**
  (full terms text: "User-supplied price or range. Paid work is PROVADIA-only; conversion and exact scope
  require confirmation. No billing period is implied. Request scope opens email. It does not book,
  purchase or trigger fulfilment. Checkout is not connected. …")
- Manifestation title for the Keeper reads "The Magical Manifestation — the Keeper"; the full product
  name appears in the parchment, as recorded above.

## Claim 6 — Library plays the Reading Room film · **PASS**

On entering the Library, `#bg-film` acquired the class `bg-film on` with
`currentSrc = …/record-reading-room_take1.mp4`, **readyState 4**, `paused = false`, and `currentTime`
advancing **0.12 s → 1.33 s** over a 1.3 s observation — a playing video, not the still.

## Claim 7 — Router · **PASS**

Fresh full-page loads (avatar pre-chosen) landed correctly on every route:

| Direct load | Scene | Product |
|---|---|---|
| `#/chamber` | chamber | — |
| `#/gate` | gate | — |
| `#/street` | street | — |
| `#/library` | library | — |
| `#/library/manifest/mint` | library | mint |
| `#/library/manifest/keeper` | library | keeper |

History: SPA navigation street → library, then **Back → street**, **Back → library + Keeper manifestation**
(hash restored to `#/library/manifest/keeper`), **Forward → street** — all correct.
**Reload** at `#/library/manifest/mint` restored scene = library, product = mint.

## Claim 8 — Zero page errors · **PASS**

Across all seven sessions (four claim sessions + three probes): **0 `pageerror` events and 0 console
errors** in total.

## Claim 9 — Spatial honesty spot-check · **PASS**

**Anchor z-index vs the spatial formula** `z = 20 + round(d × 80) + (occludes ? 1 : 0)`, Library anchors,
expected values computed from `window.__journey.spatial` data and compared with the rendered elements:

| Anchor | d | occludes | expected z | rendered z |
|---|---|---|---|---|
| shelf | 0.28 | true | 43 | **43** ✓ |
| desk | 0.55 | true | 65 | **65** ✓ |
| lamp-stand | 0.86 | true | 90 | **90** ✓ |

**Depth scaling** (clean re-probe with the stage scrolled into view and coordinates sampled fresh
before each click): floor click at depth target 0.05 → visitor rendered height **166.4 px**
(top 60.90 %, i.e. d ≈ 0.053); click at depth target 0.95 → height **307.8 px** (top 93.08 %, d ≈ 0.947).
Far is smaller than near, ratio ≈ 1.85, matching the spatial bands' scale interpolation.

*(My first depth attempt returned equal heights — a harness artifact: the page had scrolled so the stage
sat at viewport y = −426 px and the pre-sampled click coordinates pointed off-viewport/stale. With fresh
coordinates the mechanism measures exactly as the data predicts. Recorded here so the false reading is
not mistaken for a build defect.)*

---

## New defects found

**None.** No defect not already on the record was found by this seat.

## Observations (not defects)

- **O-1 — Reduced-motion rig re-renders once on state change.** In my first reduced-motion session, a
  `#solnik-fig` markup snapshot pair taken ~1 s after a floor click differed once, while the actor's
  bounding rect stayed identical and all idle windows (800 ms ×2, plus 4 s at 250 ms sampling) were
  perfectly static. The engine's reduced-motion branch re-renders the rig a single time when its state
  signature changes (e.g. the visitor's new position), then holds the still frame. That is a one-frame
  state update, not animation — no glide, no cycle, no breathing — and Claim 3 is graded on the idle
  windows the claim describes. Recorded for completeness.
- **O-2 — Hidden scrubber counter carries placeholder text.** Before any separation, the hidden
  `#scrub-count` node contains "1 / 1". It is inside a `hidden`/`display:none` container in every state
  where it holds that value and is never rendered to the visitor; the moment the scrubber appears, the
  counter reads the true "1 / 8". Cosmetic source-level residue only.

---

## Final line

**VERIFIED at mechanism level** — all nine acceptance claims (1–9) PASS on my own measurements against
the running build, with zero page errors across seven sessions and no new defects found.
Device performance and motion feel remain **OUT OF SCOPE** for this seat and are not graded here;
they stand as founder-device items, exactly as chartered.

— Blind verifier seat, 2026-11-25

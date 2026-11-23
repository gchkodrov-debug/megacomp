# THE MINT — FINAL BUILD-READY MODIFICATION DOCUMENT
## By Gemini (Google AI Ultra, "Hydrogen" mode) — commissioned by the founder's order 2026-11-23 16:27 CT, delivered 16:28 CT
## Session: gemini.google.com/app/46ea9941c6a01756 (store account). Verbatim as returned.

Target Route: /mint (Mobile-First 375px–430px primary, scales cleanly to desktop)
Core Engine: Single pinned full-viewport canvas (100vw × 100vh, position: sticky; top: 0) scrubbing the existing 235-frame filmed sequence (frame_0001 to frame_0235) linearly and bidirectionally via scroll progress (0.00 to 1.00).

Palette Lock:
- Vault Void: #141210
- Deep Brown (surface/hairline tint): #30251B
- Antique Gold (accents, active leader lines, scrubber ticks): #C9A227
- Bone Cream (primary typography): #E9DDC6
- Bright Gold (reserved strictly for the two main doors/entry triggers): #E4C65B

## A) THE ARRIVAL (Scroll 0.00 – 0.08 · Frames 001 – 018)

1. Visual Staging & Canvas Blending
- Kill the intermediate "YOU ARE ENTERING" modal and nested preview box completely. Entering The Mint lands directly on this full-bleed canvas.
- Canvas Edge Masking: Apply a radial CSS vignette over the canvas container (background: radial-gradient(circle at 50% 42%, transparent 32%, #141210 78%)) so the filmed assembly floats seamlessly inside #141210 with zero hard rectangular frame edges.
- Vertical Composition (9:16): assembly centered horizontally (50%) and shifted slightly up (40% from top) so the lower 42% of the screen stays clean for arrival typography and fact chips.
- Top Chrome: Single minimal top-left link (16px from top/left, 44px × 44px minimum hit area): "← THE COIN" (#C9A227, 11px, uppercase, letter-spacing: 0.16em). No SKIP THE JOURNEY, no ALL DOORS, no duplicate back pills.

2. Exact Arrival Copy (fades out 0.06 – 0.09)
- Eyebrow (10px, #C9A227, uppercase, ls 0.2em): INSIDE THE COIN · THE MINT
- Headline (28px, #E9DDC6, serif, lh 1.15): The Mint
- Sub-line (14px, #E9DDC6 85%, max-width 32ch): Full-service coin creation — from first conversation to unaided operation.
- Fact Chips (1px solid #30251B border, #141210 fill 85%, 11px #E9DDC6, padding 6px 10px, border-radius 2px — sharp/chamfered, never SaaS pills):
  - PILOT FEE: $130 ($104 IN PROVADIA)
  - CHARGED AT COMPLETION ONLY
  - HOLDING THE COIN: NEVER REQUIRED
  - INTAKE GATE: CLOSED · CHECKOUT DISABLED
- Scroll Prompt (bottom center, 24px above bottom, 10px #C9A227, ls 0.18em): SCROLL TO UNSEAL ↓

## B) THE EIGHT EXPLODED LAYERS (Scroll 0.08 – 0.88 · Frames 019 – 206)

Global Layer UI Rules:
- No Translucent Cards: text directly over a bottom-anchored dark gradient scrim (linear-gradient(to top, #141210 58%, rgba(20,18,16,0.82) 78%, transparent 100%)) covering the bottom 38% of the viewport (>11:1 contrast for Bone Cream text).
- Leader Line & Tip Dot: 1px SVG polyline #C9A227 from a 5px glowing #C9A227 tip dot anchored at (x%, y%) on the active stratum, angling 45° to a horizontal shelf above the layer's eyebrow title; dot and line animate in (stroke-dashoffset 220ms) on entering the layer's window, reverse cleanly scrolling up.
- Typography Block (bottom-left, 20px left margin, 36px right margin to clear the rail): Tag (10px #C9A227 uppercase ls 0.18em): "0X / 08 · LAYER NAME" · Title (20px #E9DDC6 serif) · Body (14px #E9DDC6 90%, lh 1.45): two sentences — what it is / what it does.

### Layer 01 · The Conversation — window 0.08–0.18 · frames 019–042
- Tag: 01 / 08 · THE CONVERSATION · Title: The Conversation
- Body: "An unhurried intake dialogue where the founder tells the Keeper his idea. It strips away noise and defines what the coin must actually do."
- Staging: frames 019–042, top cap breaks its seal and lifts. Tip dot on the exposed upper inner core (x: 48%, y: 26%).
- Shot Brief (future film): Macro top-down 3/4 pass on an open hammered-bronze acoustic chamber inside the top stratum; concentric resonance ripples shimmer across thin gold oil as the cap lifts, 120fps slow motion.

### Layer 02 · The Honest Question — window 0.18–0.28 · frames 043–065
- Tag: 02 / 08 · THE HONEST QUESTION · Title: The Honest Question
- Body: "Five written viability checks before any work begins. It tests whether the premise holds — and explains any refusal in writing."
- Staging: frames 043–065, second stratum separates below the top core. Tip dot on the edge of the second separated ring (x: 52%, y: 31%); five subtle hairline tick marks (#C9A227) radially beside the tip dot in SVG overlay.
- Shot Brief: Five-bladed mechanical brass iris diaphragm in the second ring; five engraved radial notches catch warm amber raking light as the blades rotate open in slow motion.

### Layer 03 · The Rehearsal — window 0.28–0.38 · frames 066–089
- Tag: 03 / 08 · THE REHEARSAL · Title: The Rehearsal
- Body: "The entire coin launch run end-to-end in simulation first. It stress-tests every step and mechanic before anything real is struck."
- Staging: frames 066–089, third layer widens its gap. Tip dot on the illuminated rim of the third layer (x: 46%, y: 35%).
- Shot Brief: Smoked obsidian-glass disc etched with fine orbital telemetry lines; a ghosted translucent golden coin spins through a dry-run trajectory inside the glass before dissolving into fine gold dust.

### Layer 04 · The Covenant — window 0.38–0.48 · frames 090–112
- Tag: 04 / 08 · THE COVENANT · Title: The Covenant
- Body: "Written terms read and agreed by both sides before anything real starts. It locks scope, rules, and completion criteria in plain sight."
- Staging: frames 090–112, central waist separation. Tip dot on the central locking band (x: 50%, y: 39%).
- Shot Brief: Heavy beveled antique-gold seal ring inscribed with razor-sharp micro-lettering, bisected by a twin mechanical clasp that slides together and locks flush with a glint of specular light.

### Layer 05 · The Mark — window 0.48–0.58 · frames 113–136
- Tag: 05 / 08 · THE MARK · Title: The Mark
- Body: "The coin's face, relief, and distinct visual identity crafted in metal. It turns the founder's verified idea into an unmistakable artifact."
- Staging: frames 113–136, coin-face/core layer fully exposed at peak separation. Tip dot on the high-relief emblem surface (x: 50%, y: 42%).
- Shot Brief: Real 120fps macro studio pass of a physically milled antique-gold striking die rotating under single-source grazing light, micro-flakes of gold leaf lifting off the freshly carved relief against #141210 black.

### Layer 06 · The Launch — window 0.58–0.68 · frames 137–159
- Tag: 06 / 08 · THE LAUNCH · Title: The Launch
- Body: "Controlled live release of the coin into active circulation. It carries the finished work from private rehearsal into the open world."
- Staging: frames 137–159, lower-middle ring separates, peak rim illumination. Tip dot on the bright outer edge of the sixth stratum (x: 53%, y: 45%).
- Shot Brief: Concentric counter-rotating gold gear rings forming an open Doctor-Strange-style threshold portal; the struck coin passes through the ring's light plane in slow motion from shadow into full warm illumination.

### Layer 07 · The Record — window 0.68–0.78 · frames 160–183
- Tag: 07 / 08 · THE RECORD · Title: The Record
- Body: "Every completed step written permanently into the town's public record. It receipts the entire build so trust is verifiable, not claimed."
- Staging: frames 160–183, seventh stratum separates near the base. Tip dot on the seventh layer's outer rim (x: 47%, y: 48%).
- Shot Brief: Dark brushed-bronze astrolabe ledger plate with seven sequential radial notches; the seventh notch ignites in warm #C9A227 gold, permanently stamping the sequence.

### Layer 08 · The Handover — window 0.78–0.88 · frames 184–206
- Tag: 08 / 08 · THE HANDOVER · Title: The Handover
- Body: "Full operational transfer so the founder runs his coin unaided. It marks true completion — the moment the service ends and the fee is earned."
- Staging: frames 184–206, maximum full-stack separation to the bottom plinth. Tip dot on the base plinth (x: 50%, y: 52%).
- Shot Brief: Minimal magnetic vault plinth at the base; external guide clamps retract cleanly into darkness, leaving the finished coin balanced independently on its own axis under its own slow rotation.

## C) THE CLOSING BEAT (Scroll 0.88 – 1.00 · Frames 207 – 235)
- Frames 207–235 (0.88–0.94): layers reassemble in reverse slow motion into the unified closed coin at (50%, 36%).
- Settled (0.94–1.00, frame 235 held): coin steady in the upper third; closing ledger block fades up in the lower 56% over #141210 (no modal borders, no ghosted layers).
- Eyebrow: THE MINT · TERMS & STATUS
- Headline (22px serif): Completion Means Unaided Operation.
- Facts Ledger (4 rows, 1px #30251B hairlines; label #C9A227 11px uppercase; value #E9DDC6 13px):
  - PILOT FEE — $130 ($104 in PROVADIA)
  - WHEN CHARGED — At completion only — once you operate your coin unaided
  - COIN REQUIREMENT — Holding the coin is never required
  - CURRENT STATUS — Intake gate is closed until the founder opens it · Checkout is not connected · Purchase is disabled
- Closed-Door Notice (13px #E9DDC6 80%, border-left 2px #C9A227, padding-left 12px): No intake requests, bookings, or payments are accepted while the gate is sealed.
- Single Return (centered, 48px height, padding 0 24px, 1px solid #C9A227, #141210 bg, #E9DDC6 12px uppercase ls 0.16em): ← RETURN TO THE COIN (bright gold intentionally NOT used here — reserved for the two main doors).

## D) THE LAYER SCRUBBER RAIL
- Position: fixed far right edge (right: 10px, top: 50%, translateY(-50%)), z-index 30; visible only during the exploded sequence (scroll 0.07–0.89), fades out at Arrival and Closing.
- Anatomy: 1px vertical track (220px, #30251B) with active progress fill #C9A227 tracking scroll 0.08–0.88. 8 tick marks: inactive 8px×1px #30251B (or #C9A227 40%); active 16px×2px #C9A227 with a 9px monospace numeral (01–08) at its left.
- Touch: each tick has an invisible 36px×28px target; tap smooth-scrolls to the layer's midpoint offset (0.13, 0.23, 0.33, 0.43, 0.53, 0.63, 0.73, 0.83), scrubbing through every intermediate frame (no hard cut).
- Mapping: frameIndex = Math.round(clamp(scrollProgress, 0, 1) * 234) — deterministic, reverses at 60fps with zero state lockups.
- Haptic detent: navigator.vibrate?.(6) once per layer crossing, throttled 150ms.

## E) OTHER CHANGES & RATIONALE
- Preload & memory-safe frame buffer: decode all 235 frames into an ImageBitmap array (mobile capped at 720px width) on entry, frame 001 painted synchronously on first paint — no blank flashes, no mobile Safari tab crashes.
- Eliminate stacked glass modals & double-entry doors (homepage critique convergence — captain's note: on the Mint page itself this binds the page's own chrome; the homepage entry step is the homepage revision's business).
- Replace muddy olive background with true vault #141210 + radial edge feathering (kills the rectangular frame seam).
- Facts kept 100% explicit and un-spun at Arrival and Closing; staging phrasing removed from the poetic bullets only.

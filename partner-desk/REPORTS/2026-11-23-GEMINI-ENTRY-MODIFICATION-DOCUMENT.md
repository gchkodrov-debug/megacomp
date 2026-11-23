# PROVADIACOIN.COM — HOMEPAGE ENTRY BUILD-READY MODIFICATION DOCUMENT
## By Gemini (Google AI Ultra, "Hydrogen" mode) — commissioned by the founder's order 2026-11-23 16:29 CT, delivered 16:30 CT
## Session: gemini.google.com/app/46ea9941c6a01756 (store account). Verbatim as returned (spec + exact copy complete).

Target Route: / (Landing / Homepage Entry — Mobile-First 375px–430px primary, scales cleanly to desktop)
Core Engine: Unified full-viewport canvas + WebGL/CSS 3D composite stage (100vw × 100vh, overflow: hidden, user-select: none) over #141210 vault void. Zero stacked modals, zero SaaS glass cards.
Palette Lock: Vault Void #141210 · Deep Brown #30251B (ambient shadow/hairlines) · Antique Gold #C9A227 (coin body, orbital tracks, muted glyphs) · Bone Cream #E9DDC6 (micro-typography) · Bright Gold #E4C65B (strictly reserved for the two main doors and portal-ring light).

## A) THE FIRST SCREEN: THE COIN ALONE (State 0: Dormant / Breathing)
- Zero Outer Chrome: no header, nav, corner pills, or buttons outside the coin. Pure #141210 void; coin centered (50%, 48%), 56vw on mobile (max-width 260px desktop).
- Seam elimination: html/body/#stage background #141210 (matching the filmed arrival's dark edge, not muddy olive-grey); multi-stop radial alpha mask on the arrival video/canvas (mask-image: radial-gradient(circle at 50% 50%, #000 36%, rgba(0,0,0,0.85) 46%, transparent 64%)) + mix-blend-mode: lighten where appropriate — particles/smoke dissolve into #141210, zero rectangular box.
- What moves (NOW — existing arrival film + shader loop): arrival settles the coin (0.0–1.8s), cross-fades into a slow breathing loop (6.0s cycle, ease-in-out): specular rim sweep along the beaded edge (#C9A227 → #E4C65B); the hairline crack swells with warm internal #E4C65B luminescence; 12–18 ultra-fine gold dust motes drift upward inside the masked circular aura (single GPU particle layer).
- What is still: the coin's axis and silhouette dead-still (0px translation) — heavy struck bullion, not a floating icon.
- Touch invited without a button (NOW): synced to the breathing peak, a 1px concentric golden ring (#C9A227 35%) expands 14px outward from the rim and dissolves; embedded inside the coin's lower rim shadow (curving along the bottom inner bevel, 9px, #E9DDC6 65%, ls 0.24em, uppercase): TOUCH TO OPEN. Hit target: the entire coin circle (1.25× radius invisible area, cursor pointer) — one pointerdown/tap triggers The Opening.

## B) THE OPENING (Touch → Pop-Out → Dive In)
### Beat 1 — The Fracture & Portal Ignition (0.0–0.65s)
- On tap: haptic pulse (navigator.vibrate?.(12)). The golden crack widens rapidly; camera pushes forward 18% (scale 1.0 → 1.18, cubic-bezier(0.22,1,0.36,1)); concentric Doctor-Strange-style counter-rotating golden rings (#E4C65B stroke, additive glow, tangential spark particles) ignite around the expanding aperture.
- Through the opening: warm dimensional depth — a living golden-amber void (#30251B → #E4C65B radial core) with slow volumetric light shafts.
- NOW: scale/camera push on the coin canvas + multi-ring SVG/WebGL shader portal expanding from the coin's center (z-index 10), radial aperture clip-path 0% → 42% radius over 650ms.
- FILM (Shot Brief F-2): 120fps macro pass of the PROVADIA coin cleaving cleanly along the 'P' relief seam — two heavy bullion halves sliding/hinging apart in slow motion as molten #E4C65B portal rings spark to life inside the gap.

### Beat 2 — Dimensional Fold & World Pop-Out (0.65–1.35s)
- Camera holds at the threshold (scale 1.18). Worlds pop OUT toward the viewer along a slow-motion orbital arc (translateZ + scale 0.2 → 1.0, staggered 60ms per node).
- Primary orbit (the two main doors, bright gold #E4C65B): THE MINT (x 28%, y 34%) and THE MARKETPLACE (x 72%, y 34%) as live circular portal lenses (76px mobile) framed by spinning #E4C65B hairline rings; inside each lens a live moving glimpse of that world (Mint: the golden assembly rotating; Marketplace: coin circulation/exchange motion); beneath each lens only its label (11px #E4C65B, ls 0.18em).
- Secondary orbit: the remaining six active worlds along the lower arc (y 64–76%) as smaller circular portal nodes (44px, 1px #C9A227 ring, #E9DDC6 10px labels) — every active world one tap away.
- Bottom pole (x 50%, y 84%): a compact seal glyph "ALL DOORS · 10" (10px #C9A227, ls 0.2em) opens the separate 10-door registry panel.
- NOW: CSS 3D perspective stage (perspective 900px) + WebGL circular portal lenses rendering live cropped/shader views, popping from (50%, 48%, -300px) to orbital coordinates, spring-damped slow motion (700ms).
- FILM (Shot Brief F-2B): seamless continuation of F-2 — cleaved halves frame a spinning multi-ring golden portal, dimensional light-lenses projecting toward the lens.

### Beat 3 — One-Gesture Dive In (0.0–0.85s on tapping any world lens)
- Zero intermediate preview screens: no "You Are Entering" modal, no second Enter button, no copy wall.
- Unselected nodes fold backward into the portal (opacity 0, scale 0.4, 220ms). The chosen world's ring expands from its orbital position to center and past the viewport edges (scale 1.0 → 14.0 over 750ms, cubic-bezier(0.55,0,0.2,1)). The camera flies through the ring into the destination world's opening frame (e.g., Frame 001 of the Mint) with zero cut or flash.
- NOW: shared-element/FLIP + radial clip-path circle() expansion synced with the route transition (view transition / persistent canvas state handoff) so the destination canvas is already painting inside the growing ring during the fly-through.
- FILM (Shot Brief F-3): 120fps camera fly-through through a blazing #E4C65B spark-ring threshold — sparks streaking past the lens edges — emerging into #141210 vault darkness.

## C) THE RETURN
- Inside any world: the single top-left return anchor "← THE COIN" (11px #C9A227, 44×44px tap area).
- Reverse flight (0.0–0.90s): Beat 1 (0–0.45s) the current world contracts into a circular golden portal aperture at center (clip-path circle 100% → 18%, scale 1.0 → 0.35) framed by a bright #E4C65B ring. Beat 2 (0.45–0.90s) the camera pulls back out through the coin's opening; the coin halves close (scale 1.18 → 1.0); portal light seals into the hairline crack; the first screen settles back to The Coin Alone (State 0).
- Browser back / popstate from any world executes this same reverse contraction rather than a harsh reload.

## D) THE STILL-PAGE (REDUCED-MOTION) ENTRY
- On prefers-reduced-motion at load: static #141210 void; high-resolution settled coin frame centered (50%, 46%), 56vw (max 260px), edge-masked into #141210. Zero particles, zero breathing, zero autoplay video.
- The Gold Pill (preserved as ruled): centered across the coin's lower third (top: 62% of the coin's height, overlapping the coin — "everything is in the coin" holds). Style: background #141210 92%, border 1.5px solid #E4C65B, radius 999px, padding 12px 22px, min-height 44px, subtle #30251B shadow. Exact copy (12px #E9DDC6, ls 0.06em): "Touch the coin — enter the living town".
- The tap's consequence: tapping the pill (or anywhere on the coin) opts into the session experience — 250ms cross-dissolve into Beat 2's Opened State with all orbital lenses + ALL DOORS · 10 visible and stationary; tapping a world lens transitions cleanly (300ms cross-fade) into that world, where the visitor manually scrubs with thumb/scroll/scrubber rail.

## E) EXACT COPY FOR EVERY WORD DURING ENTRY
- First screen (inside coin rim): TOUCH TO OPEN — #E9DDC6 65%, 9px, uppercase, 0.24em tracking
- Reduced-motion pill (on coin): Touch the coin — enter the living town — #E9DDC6 12px, #E4C65B border
- Main door lens 1 (upper-left): THE MINT — #E4C65B 11px uppercase 0.18em
- Main door lens 2 (upper-right): THE MARKETPLACE — #E4C65B 11px uppercase 0.18em
- Secondary world lenses (6 active): the exact 6 active world names from the registry — #E9DDC6 10px uppercase 0.16em
- Bottom registry trigger: ALL DOORS · 10 — #C9A227 10px uppercase 0.20em
- Inside any world (top-left return): ← THE COIN — #C9A227 11px uppercase 0.16em
- (Zero taglines, zero onboarding paragraphs, zero "Welcome to..." copy, zero invented buttons.)

## F) OTHER CHANGES & RATIONALE
- Delete the two-tap "Preview / You Are Entering" funnel.
- Single-canvas memory budget on mobile Safari: unmount/pause the homepage coin loop the instant Beat 3 completes into a destination world — two heavy canvases never compete.
- Strict #E4C65B discipline: portal-ring light, the reduced-motion pill, and the two main doors only.
- Prefetch destination entry frames the moment the coin opens (Beat 1) so Beat 3 lands on a crisp, decoded canvas.

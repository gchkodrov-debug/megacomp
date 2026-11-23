# PRESENTATION STANDARD — THE SURFER BAR (George's ruling, 2026-11-22 ~20:15–20:19 CT)

## Amendment — 2026-11-23 (Q14 reconciliation applied)

At the founder's Q14 ruling (2026-11-23) — one film per product — and on the partner's condition that the reconciliation's replacement wording be incorporated into this governing standard itself before implementation, the reconciliation's named replacement sentences have been applied verbatim below (the standing media law's scroll-film line and Binding Craft Rule 1). No other wording was changed by this amendment.

Every product and every service we sell is presented the way The AI Surfer (Dallas Clounch)
presented the CubeSat — no exceptions, coin services included. This binds the Super Agent,
the crew, and the captain. A listing that does not meet this bar is NOT finished.

## The bar (all five, every time)
1. PINNED HERO, ONE JOURNEY — the product stays center-stage for the whole scroll:
   rotate → come apart layer by layer → reassemble. No cutting away to decoration.
2. STAGED CALLOUTS — at each scroll stage, the part/mechanism in focus gets its NAME
   beside it, a leader line pointing at it, and a short plain explanation. The labels
   CHANGE as the scroll moves. The assembly IS the explanation.
3. 240 FRAMES — the film is sliced at up to 30fps into ~240 frames; scroll-scrubbed,
   slow motion, buttery smooth. (Listings at 121 frames are BELOW the bar.)
4. PURPOSE-MADE START/END FRAMES — frame one = the whole thing; last frame = the SAME
   thing perfectly exploded/aligned (Whisk-style pair; Flow Frames-to-Video, locked
   camera, no morphing, geometry exact). A true disassembly of ONE object — never a
   general clip.
5. THE VISITOR UNDERSTANDS IT — by the bottom of the scroll they know every part,
   how the parts connect, and what happens step by step. That understanding is the selling.

## Plus the standing media law (2026-11-21 + 2026-11-22 20:02 CT)
- Gallery of 4–5 real images of the product itself.
- A UGC-style hook video (10–15s) that grabs attention in the first seconds —
  objects/places only, never synthetic people, never fake testimonials.
- The scroll film itself: ONE film per product — the product's own assembly, whole → apart → whole, sliced at up to 30 fps into ~240 frames (never under 200). The frame count governs; the film lasts as long as the assembly honestly takes at the standard's slow-motion pace (about eight seconds of source at a full 240-frame, 30 fps slice). There is no second scroll film.
- Price in page text (never burned into visuals), 5–7 bullets, full description,
  deliverables list.
- NEW TOOL STACK ONLY (2026-11-22 law): TRELLIS 2 / img2threejs for true 3D,
  rembg for clean cutouts, HyperFrames for composition, scroll-craft/GSAP patterns.
  Run reports name which tool made which asset.

## What ours lacks today (captain's confirmed miss list, 2026-11-22)
Staged callouts tied to parts (ours: copy in separate blocks) · the long layered
journey (ours: one short pass off ~4s clips) · 240 frames (ours: 121 on 4 pages,
most pages no film at all) · purpose-made disassembly frame pairs (ours: general
clips) · teaching-by-scroll (ours: decoration + description).

## First test of the bar
COMMISSION 17 — the Coin Mint service, full package (see genspark-build/).
The specimen must pass all five points before the programme rolls to the catalogue.

## BINDING CRAFT RULES (from the study, 2026-11-22)
Distilled from CRAFT_STUDY_SCROLL_ANIMATION_2026-11-22.md (George's study order).
These bind every scroll-presentation build — crew, Super Agent, captain.

1. FRAME COUNT — ~240 frames at up to 30 fps, sliced from the product's ONE scroll film (fps × seconds = frames: a full 240-frame slice at 30 fps is about eight seconds of source). The frame count governs the journey, not the seconds. No scroll page ships under 200 frames.
2. CANVAS ONLY — frames are drawn with canvas + drawImage. Never img-src swapping,
   never video.currentTime scrubbing.
3. SMOOTHING — raw scroll never touches the frame index. Damping is mandatory:
   lerp chase (k ≈ 0.1 per 60fps frame, time-corrected) or GSAP scrub ≥ 0.3s.
4. PRIORITY PRELOAD — frame 0 → last frame → midpoint → quartiles → fill
   (binary subdivision), with nearest-loaded-frame fallback at draw time.
   Never sequential all-at-once.
5. MATCHED-PAIR FRAME PROMPTING — start/end frames come from prompts identical
   except the single state clause (assembled → exploded). The exploded prompt
   names every part, in order. Style tail and negative tail are identical on
   both (octane/unreal/8K · no text, no labels, no watermark — text lives in code).
6. ONE OBJECT, ONE AXIS — the explosion separates along a single aligned axis;
   camera locked; background, lighting and materials matched across the pair.
7. BACKGROUND MATCH — page background = the frames' background (sampled hex);
   the product floats edge-free on the page.
8. CALLOUTS FROM THE PROMPT — staged callouts are transcribed from the exploded
   prompt's part list, in its order; each carries a leader line + tip dot +
   name + one-line explanation, staged to its scroll window.
9. BUDGETS — frames ≤ ~40 KB average at 960px WebP (≈ ≤9 MB per sequence);
   half-density mobile set; lazy preload starting ~120% of viewport out;
   canvas DPR capped at 1.5–2.
10. REDUCED MOTION — prefers-reduced-motion means static hero + stacked callouts:
    no pin, no scrub, no exceptions.
11. OVERLAY HYGIENE — overlays animate transform and opacity only; the canvas
    redraws only when the frame index changes; scroll listeners passive + rAF.

## ADDENDUM (George, 2026-11-22 21:18 CT) — THE BULLET-POINT LAW
Watching the Flow Mint film, George ruled the callout format explicitly: every
product presentation carries BULLET POINTS the way the Surfer's satellite page
does — as the product opens on scroll, a bullet appears beside each part/layer
naming WHAT IT IS and WHAT IT DOES, in that order, one line each, tied to that
layer's scroll moment. Not a text block below the journey; the bullets ride the
presentation itself. (This sharpens the staged-callout point of the standard:
the callout's FORM is a bullet — name + what it does.)

# GEMINI — ANSWERS TO THE CAPTAIN'S QUESTIONS PACKAGE (hand-carried by George, 2026-11-25 23:32 CT)
**Verbatim as received. Captain's dispositions follow in the ledger + desk ANSWERS.**

## Q1 — Dec 23 Credit Forfeiture Ruling (G-3)
Short ruling: Both accounts forfeit 100% of unused monthly plan credits on December 23. Zero credits roll over on either account.

Account 1 (onejobkits@gmail.com — 9,960 cr, active Ultra plan, resets Dec 23 at 10:21 AM): Unused monthly subscription credits forfeit/expire at the billing-cycle reset (Dec 23, 10:21 AM), at which point the next monthly allocation is issued. Only separately purchased top-up credit packs (if any were bought outside the monthly plan) carry a separate 12-month validity window; included monthly plan credits do not accumulate across months.

Account 2 (borledo77@gmail.com — 9,753 cr, CANCELED, ends Dec 23 at 10:01 AM): Because the subscription is canceled and the billing cycle terminates on Dec 23, 10:01 AM, all remaining monthly plan credits forfeit permanently at that timestamp with no rollover and no replenishment.

Verbatim citation note: Web search is disabled in this session and Google's live Terms page is not mounted in context, so I will not fabricate a word-for-word legal quote from memory. Confirm the exact clause under Google One Additional Terms of Service → AI Credits ("Monthly AI credits expire at the end of each billing cycle and do not roll over") directly in your browser if a verbatim quote is required for the desk log.

Production allocation lock: The Commission #123 allocation curve stands—burn Account 2 to 0 first, maximize Veo 3.1 Fast before Dec 5, and burn Account 1 down before Dec 23, 10:21 AM so zero credits vanish at reset.

## Q2 — Judgment on "The Lantern Archive of Velmar" Examination (G-2)
(a) Concurrence with Grades
CONCUR — with one governance flag. Scoring 7/8 PASS, 1 PARTIAL (375px modal overflow) accurately reflects runtime behavior in a 10m 04s build, provided the broken default npm install (peer-dependency conflict) and external Google Fonts call are logged as extraction blockers, not excused under the visual score.

(b) Concurrence with Adoption List
STRONG CONCUR.

Adopt (extract as pure, zero-dependency ES modules): Perspective projection math, polygon/AABB collision solver (closing D-2), waypoint/nav routing, and door stand-point triggers—validated immediately against our 171-test suite.

Reject: The ~1,800-line hard-coded render monolith, unused @google/genai package entry, external Google Fonts <link>, and default broken lockfile. A world that cannot instantiate a second place from a JSON scene schema violates our multi-place architecture law.

(c) Seven Blind Spots the Examination Missed
Before porting a single geometry helper into our engine, inspect the Velmar code for these seven silent failure modes:

1. Unclamped requestAnimationFrame delta-time (dt): If movement speed is multiplied by frame ticks instead of clamped Math.min(dt, 0.05), players on 120 Hz mobile screens move at 2× speed and tunnel through thin collision walls during frame drops.
2. Uncapped window.devicePixelRatio (HiDPI fill-rate blowup): Rendering a full-viewport canvas at 3× DPR on mid-range phones multiplies pixel count by 9× and violates PIS-01 thermal/fps budgets.
3. Wall-snag vs. sliding tangent response: Passing collision twice confirms basic blocking, not smooth wall-sliding when walking diagonally into an angled wall—a classic feel-killer on mobile touch controls.
4. Viewport-coupled coordinates: Verify whether collision polygons and door stand-points are stored in normalized world space or tied to desktop canvas pixel dimensions. Pixel-coupled coordinates misalign doors on 9:16 mobile viewports.
5. Touch-input & browser gesture conflicts: Desktop keyboard/mouse door triggers do not verify mobile tap-to-walk, drag deadzones, or touch-action: none (preventing Safari pull-to-refresh / rubber-band scroll).
6. Teardown memory leaks: Hard-coded prototypes routinely omit cleanup for requestAnimationFrame loops, ResizeObservers, and window listeners—which leaks memory the moment a visitor transitions between two places.
7. Reduced-motion & offline font fallback: Confirm prefers-reduced-motion handling and verify no secondary dynamic CDN calls exist inside CSS or JS bundles.

## Q3 — Sanitized Build Specs for AI Studio Runs #2–#4 (G-1)
Reordering Ruling: Reorder to: Run #2 Thresholds & Doorways → Run #3 Population Behaviors → Run #4 Character Chamber UI.

Why: The Lantern examination proved AI Studio defaults to a single hard-coded room with no scene schema. Solving JSON-driven multi-place threshold traversal & clean teardown first (Run #2) gives Run #3's crowd entities a real data schema to inhabit, while isolating Run #4's Character Chamber UI forces AI Studio to fix the 375px mobile modal overflow without nav-engine clutter.

Run #2 Spec — "The Clockwork Ferry of Oakhaven" (thresholds, doorways & multi-place scene schema; two data-driven places riverbank_pier + ferry_cabin; sliding collision; directional thresholds with 400ms crossfade; return traversal + teardown hygiene; hash routing; continuous ambient motion; 375x812 responsive; zero errors/offline). [Full paste-ready spec as delivered — it was fired verbatim as AI Studio Run #2 on 2026-11-25 23:33 CT.]

Run #3 Spec — "The Lantern Market of Brindlewick" (autonomous population behaviors & spatial avoidance; 6 townsfolk mid-activity on load; three behavior loops; local steering/crowd avoidance; player-approach gaze awareness; unfurling scroll inspection prop; depth-sorted Y-ordering; 375px responsive; zero errors/offline). [Full paste-ready spec as delivered.]

Run #4 Spec — "The Mirror Lodge of Solis-Vane" (Character Chamber UI & responsive folded-scroll preview; living chamber backdrop; 3 selectable traveler archetypes + cloak swatches + name persisted in localStorage; live articulated preview + owl companion gaze; folded-paper manifestation preview with stage pins; dual-layout geometry — radial leader lines on desktop, horizontal scrubber at 375x812; diegetic departure doorway; full keyboard & ARIA accessibility; zero errors/offline). [Full paste-ready specs as delivered.]

## Q4 — Seat D's Composed Frame Judgment (G-4)
Status: PENDING ARTIFACT (CANNOT CERTIFY UNSEEN). No screenshot, video capture, or asset manifest for Seat D's composed Library frame is attached in this prompt or mounted in this session. Per house law, I will not rubber-stamp an unseen composite.

Immediate 6-Point PIS-01 Inspection Rubric for Seat D's Frame:
1. Key-Light & Color-Temperature Fusion: Does Solnik's vector/cartoon rig share the warm amber key light and #141210–#30251B shadow falloff of Job 5's Reading Room film and the Genspark stills, plus a grounded contact shadow beneath his boots—or does he read as an unlit sticker pasted on top?
2. Depth-Plane Occlusion: Do Solnik and the unrolling Folded Paper sit properly behind foreground Library balustrades/lecterns and in front of mid-ground bookshelves?
3. Resolution & Edge Harmony: Are crisp vector rig edges softened with subtle ambient rim-wrap and film grain so they do not clash against 540×960 compressed WebP plates?
4. 375px Mobile Safe-Zone Integrity: At 375×812, do Solnik's rig, the unrolled scroll, and the callout pins coexist without overlapping or colliding with the bottom 88px mobile thumb zone?
5. PIS-01 Payload & Frame-Time Ceiling: Is the combined scene bundle (depth mesh + subsetted Reading Room WebP atlas + Solnik rig + procedural FX) strictly ≤ 1.5 MB and sustaining ≥ 55 fps on mid-range mobile?
6. Proof #5 Continuity: Do Reading Room dust motes, lamp shimmer, and ambient audio continue uninterrupted while the Folded Paper unrolls?

## Q5 — Disposition of Older Commissions (#118, #119, #121, #122)
(Note: full verbatim Markdown files sit on megacomp / partner-desk, not mounted in his session; dispositions align the register against FVR-31 while flagging where full-text diffing remains open.)
- #118 — PROVADIA OS F0 Foundation Paper: SUPERSEDED / ABSORBED INTO FVR-31 & WORLD ENGINE ARCHITECTURE v1 — core mandates (unified browser-native OS, offline/local-first sovereignty, zero-spend discipline) ratified as active law in FVR-31; archive upon confirming no unmigrated clauses on the desk.
- #119 — PIS-01 Immersion Standard: RATIFIED AS ACTIVE ENGINEERING GATE (v1) — mandatory release law across all scene bundles (≤1.5 MB mobile payload, 540×960 subsetted WebP frames, 60 fps target, zero layout shift); full sub-clause audit remains open until text is mounted.
- #121 — Strategic Realization: PARTIALLY SUPERSEDED BY FVR-31 — commercial accountability, the 55% gross-margin floor, and Zero-Spend / Two-House fences remain active law; its pre-FVR-31 multi-page realization sequence is superseded by FVR-31 + the Migration Register.
- #122 — A Civilization Without Borders: VISION RATIFIED / FULL-TEXT AUDIT OPEN — core thesis codified in FVR-31's No-Pages Law + Migration Register; retain open for full-text line check when mounted.

## Q6 — Film Judgments Owed (Films 05v2, 06–09, 11–14, and Film 16 Listening)
Ruling: UNHEARD / UNSEEN IN THIS SEAT — CANNOT CERTIFY BLIND. Neither the video files nor Film 16's audio are attached in his conversation or mounted in his environment. Per house law, −29.7 dB confirms headroom after the Sound Gate cure, not acoustic quality — a passing listening verdict without hearing the actual audio would be a fabricated certification.
To clear immediately: drop the Film 16 audio file (or spectral/waveform render) and frame strips/clips for Films 05v2, 06–09, 11–14 directly into his thread. Film 16 will be graded strictly on: (1) absence of digital clipping, metallic AI vocoder artifacts, or harsh sibilance; (2) clean room-tone floor with zero abrupt gate pumping; (3) vocal authority and pacing; (4) loop-tail continuity at the clip boundary.

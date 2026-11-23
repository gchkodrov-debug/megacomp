# EXAM ARTIFACT #1 — BLIND VERDICT: THE COIN MINT SCROLL SPECIMEN

- **Artifact:** https://provadiacoin.com/listings/mint.html (deployed source read at repo
  `gchkodrov-debug/provadia` main, `listings/mint.html`, sha 7e21f7e6, 22,999 bytes;
  live-page text fetched 2026-11-23 03:48 UTC matches the deployed source line for line)
- **Graded against:** PRESENTATION_STANDARD_2026-11-22 (bar + 11 craft rules + Bullet-Point
  Law) · Track 5 Project A acceptance criteria · Track 5 QA checklist (ten gates, CWV bars) ·
  MINT_SERVICE_SPECIFICATION.md (bullet truth)
- **Grader:** blind verifier (did not build it; graded only what the live page, its code,
  its assets, and the repo state prove)
- **Date:** 2026-11-22 (CT)

## OVERALL VERDICT: **FAIL** — re-sit required (2 failing criteria, named below)

The specimen is genuinely strong where the house was previously weak — the chase and the
priority preload are really in the code, the bullets are spec-true, and the frames are the
real coin. It fails on two measured, written-standard items: **no leader lines** on the
callouts, and **no true mobile frame set** (mobile downloads double its budget).

---

## PER-CRITERION GRADES

### 1. Frame sequence — ✅ PASS
- **Count used by the page: 235** (`var TOTAL=235`), the Flow film's full 30 fps count
  (7.85 s film — Project A allows "240-frame sequence *or the film's full 30 fps count*";
  ≥ 200 per Craft Rule 1). The repo folder holds 240 files (f001–f240, no gaps); the page
  never requests f236–f240 — untidiness, not a breach.
- **Format:** WebP throughout (`mint-frames/fNNN.webp`), drawn via canvas + drawImage
  (Craft Rule 2 — no img-swapping, no video scrubbing).
- **Weight (measured from the deployed tree):** f001–f235 = **6,302,660 bytes ≈ 6.01 MB**,
  average **26.2 KB/frame** (budget ≈ ≤40 KB avg ✓; desktop sequence ≤ 8.5 MB ✓).
  Largest single frame 49.4 KB.
- **Source = the Flow film of the real coin faces — proven by eye:** f001 is the anchored
  brick-P front face, whole, beaded rim, warm light upper-left; f120 is the same coin
  edge-on, opening into gold discs; f235 is the aligned exploded stack (P plate, reverse
  plate, disc ring, gear/lock layer, die plate, record tablet, base). Page copy states the
  provenance ("made from the town's own anchored coin faces (Google Flow, from the start
  and end frames)"); commit history shows the FLOW frame uploads replacing the earlier set.

### 2. Smoothing chase — ✅ PASS (code-cited)
The scroll handler never touches a frame index — it only kicks a rAF loop:
`window.addEventListener('scroll',onScroll,{passive:true})` → `kick()`. The loop chases:
```js
function chase(){
  targetP=progress();
  var diff=targetP-dispP;
  if(Math.abs(diff)<0.00035){ … chasing=false; return; }
  dispP+=diff*0.1;            // ← lerp, k = 0.1 per frame (Craft Rule 3)
  draw(dispP);
  requestAnimationFrame(chase);
}
```
`draw()` is only ever called with the chased `dispP`, and the canvas redraw is guarded so
it repaints only when the frame actually changes (Rule 11). Observation, not a failure:
the lerp is not explicitly delta-time-corrected, so on a 120 Hz screen the chase converges
somewhat faster; the rule's substance — raw scroll never maps to a frame — is fully met.

### 3. Priority-tier preload — ✅ PASS (code-cited)
`prioritySeq()` implements Craft Rule 4 exactly: `take(0)` (first) → `take(list.length-1)`
(last) → `take(list.length>>1)` (midpoint) → breadth-first binary subdivision (quartiles
and below) → sequential fill of the remainder. Draw-time fallback searches for the
nearest loaded neighbour in both directions — never a blank stage (Gate 6 behaviour).
Loading starts lazily via IntersectionObserver at `rootMargin:'120% 0px'` (Rule 9).

### 4. Bullets — ❌ FAIL (one sub-item: leader lines)
- **Name + what-it-does, every stage: PASS.** All 8 stage callouts carry a numbered chip,
  "Stage N · What it is", the name, and a "What it does: …" line, alternating left/right,
  plus a whole-coin opener and an "Every Layer, Named" closer.
- **Spec-true: PASS, line by line against MINT_SERVICE_SPECIFICATION.md** — 1 The
  Conversation (spec step 1: idea in the founder's own words) · 2 The Honest Question
  (step 2, "Should This Be a Coin?"; "A no is the service working" = the spec's
  "declining is a service outcome") · 3 The Rehearsal (step 3; "No seed phrase is ever
  collected" = spec verbatim) · 4 The Covenant (step 4; "A signature qualifies — not a
  purchase" = spec verbatim) · 5 The Mark (step 5: image prepared, mint mark placed) ·
  6 The Launch (step 6 + exclusions: "your own wallet creates, signs and pays at every
  step. We never hold keys or funds") · 7 The Record (step 7: registry entry, birth
  facts, Day-Book) · 8 The Handover (step 8: House Passport; "thirty days of support" =
  the spec's 30-day support window; "run your house unaided" = the spec's handover test).
  Order on the page = the spec's order = the exploded stack's layer order.
- **Staged to scroll moments: PASS.** Each callout carries its own progress window
  (`data-sa-from`/`data-sa-to`, 0.30→0.925 across the eight stages) with fade in/out
  driven by the chased progress.
- **Leader lines + tip dots: ABSENT — FAIL.** Craft Rule 8 and Standard point 2 require
  each callout to carry "a leader line + tip dot" pointing at its part. The artifact has
  none: the callouts are floating glass cards with numbered chips; no line or dot element
  exists in the page's inline CSS, and a grep of every loaded stylesheet and script
  (listing.css, catalogue.css, shared.css, media.js, delivered-media.js, space.js) finds
  no leader-line construction. The absence is not explained anywhere in the artifact
  itself. A numbered chip shows a bullet's order; it is not a line to the layer.

### 5. Journey shape — ✅ PASS
- **Pinned centre:** 780vh section, `position:sticky` 100vh stage, canvas cover-fit with
  the image drawn centred (`(cw-dw)/2,(ch-dh)/2`); the coin is dead-centre in every
  sampled frame (f001, f120, f235) and never leaves it.
- **Shape:** whole coin (f001) → turns and opens layer by layer along one vertical axis
  (f120 mid-opening) → closes whole mid-film → rests open as the aligned named stack
  (f235) — the exact arc of the founder-approved Flow film, declared in the artifact's
  own copy ("closes whole, and rests open") and ending on the teaching image the closing
  bullet names. One object, one axis, locked camera, page background #141210 matched in
  the canvas fill (Rule 7).
- Supporting evidence: reduced-motion is honoured both ways (CSS stacks all callouts
  statically with no pin; the JS branch loads frame 1 only and never starts the scroll
  engine — Rule 10), and a no-JS visitor gets the whole-coin image plus the full listing.

### 6. Listing facts — ✅ PASS
- **Price present:** "$50 pilot · scope confirmation required" — the spec's own $50 pilot
  figure (Founder Ruling 2026-11-21 15:59 CT), with "Paid work is PROVADIA-only" and the
  80/20 town-pot ruling stated in the boundaries section.
- **Deliverables present:** "What's inside" list (4 proposed scope items, honestly
  labelled "Proposed deliverables, not a record of completed work") + a 6-bullet
  at-a-glance list.
- **Honesty sentences present:** the permanent sentence verbatim in the footer
  ("PROVADIA is a place, not an investment… no redemption, no yield, no rights, no
  expected return") and "No promise of listing, liquidity, market demand or investment
  outcome" in the body.
- **Purchase disabled:** `data-purchase-enabled="false"`; the only action is a mailto
  "Request scope" with the printed note "It does not book, purchase or trigger
  fulfilment. Checkout is not connected." The till is not wired and the page says so.

### 7. Core Web Vitals / page weight — ❌ FAIL (on a measured budget breach; CWV trio UNMEASURED)
Measured from here (deployed tree + source):
- HTML 22,999 B · CSS (4 files) 30,282 B · JS ≈ 817 KB total, of which **three.min.js is
  669,884 B** — loaded on a page whose specimen engine is canvas-only (the vendored GSAP +
  ScrollTrigger, 115,594 B, are likewise carried by the shell). Load structure: frames are
  lazy and tiered, so first paint does not wait for the sequence.
- Desktop sequence 6.01 MB — inside the ≤ 8.5 MB budget. **Mobile sequence: FAIL.** There
  is no 480w mobile set (QA Gate 5 / Rule 9 / Project A criterion 1: "≤ 1.5 MB mobile
  set"). Small screens step-sample the same 960px files (step 2 → 118 frames), which
  measures **3,166,092 bytes ≈ 3.02 MB — double the 1.5 MB budget**.
- **LCP / INP / CLS: UNMEASURED.** No Lighthouse run or real-device trace exists in this
  environment; no numbers are claimed. Gate 4 therefore also remains *unproven* (not
  failed) until a measured run is filed.

### 8. Motion smoothness — ⚪ UNGRADED-BY-MACHINE
Per the Cloud-Browser Motion Law, smoothness is judged only on the founder's real device.
Not passed, not failed. The device verdict is still owed and is required before Project A
can be called passed.

### 9. Fences — ✅ PASS
Repo state verified via the GitHub API: the 400 most recent commits are all
"Crew Mint specimen" commits, and every one names only Mint artifacts (frame files,
gallery stills, the assembly film, listings/mint.html). The only new asset folders are
`listings/mint-frames/` and `listings/mint-assets/`. **`marks/` was last touched
2026-11-20** (Secret Side mirror commits) — untouched by this build. No other listing,
page, or shared file appears in the specimen commit series.

---

## RE-SIT LIST (what must change before this artifact can pass)

1. **Leader lines + tip dots** on the staged callouts (Craft Rule 8 / Standard point 2):
   each bullet visually tied to its layer at its scroll moment, desktop and mobile.
2. **A true mobile frame set:** 480w WebP, ≤ 1.5 MB total, served to small screens —
   not step-sampled 960px files (QA Gate 5 / Project A criterion 1).
3. **Filed measurements** (required for Gate 4, currently unproven): a Lighthouse run
   (LCP / INP / CLS against ≤ 2.5 s / < 200 ms / < 0.1) and the founder's real-device
   motion verdict (criterion 8).
4. Housekeeping noted, not failing: f236–f240 sit in the repo folder unused by the page
   (TOTAL=235); the 670 KB three.min.js shell load should be justified or dropped on
   this page at re-sit.

## PRODUCTION-READY STAMPS

**None awarded.** Under the Mastery Standard, stamps are named only on a PASS. The
capability-matrix skills this artifact came closest to earning — Flow production,
scroll-sequence engineering (chase + priority preload), and spec-true staged callouts —
remain at their current levels until the re-sit passes blind.

*Verdict filed 2026-11-22 by the blind verifier. The builder's reasoning and run record
were not consulted; every line above traces to the live page, its deployed source, its
assets, the repo state, or the exam documents.*

# EXAM ARTIFACT #1 — RE-SIT RECORD

**Artifact:** https://provadiacoin.com/listings/mint.html (Coin Mint scroll specimen)
**Graded verdict:** `EXAM_ARTIFACT_1_MINT_VERDICT.md` — FAIL on 2 items (leader lines absent; no true mobile frame set), CWV unmeasured, 2 housekeeping notes.
**Re-sit scope (as ordered):** only the failed items + housekeeping. No new features, no other pages.
**Re-sit run:** 2026-11-23 (deploy + verification, this record).
**Final live state:** page HTTP 200, **26,886 bytes, byte-equal** to the re-sit build (`mint-specimen/mint-resit.html`, built by `mint-specimen/build_page_resit.py` from the specimen source `mint-new.html`; everything outside the re-sit deltas is byte-identical to the graded build).

---

## ITEM 1 — LEADER LINES + TIP DOTS (Craft Rule 8) — ✅ FIXED

**Mechanism (reusable component pattern):** any `.sa-callout` carrying `data-sa-tip="x,y"` gets a leader. The engine builds one SVG group per tipped callout — line + halo (r=11) + tip dot (r=4.5) in the house gold — lays the line from the card's nearest edge to the tip through the same cover-fit transform `draw()` uses, and wires the group's opacity to the callout's own opacity, so a leader is fully visible only at its stage's settled beat and fades with the card between beats. Tips do not track mid-motion frames. Leaders relaid on sizeCanvas / resize / load / fonts.ready; hidden under `prefers-reduced-motion` and in the reduced-motion static mode. On tall screens the cover-fit crop can push a true rim off-screen while the plate itself extends past the edge, so the tip is clamped into the stage — the clamped dot stays on the part, at the screen's edge (proven live in the mobile S7/S4 checks).

**Anchoring — measured per beat, not assumed.** The first re-sit pass anchored all eight tips to the settled stack (frame f137), on the work order's premise that the stack is present inside every stage's window. Frame-by-frame inspection of the film disproved the premise: the film is one open–close arc — S1–S2 beats show the coin edge-on, S3 the slices emerging, S4 the settled stack, S5 the reassembly, S6–S8 the whole coin (and S7's window contains a smaller-coin frame, f182, that breaks any rim-hugging tip). The tips were therefore re-measured on **each stage's own settled frame** (window centre) and cross-checked across the whole window, so every dot sits ON the coin or its plates for the entire time its card is up — never in empty space:

| Stage | Beat frame | Tip (frame fractions) | Lands on |
|---|---|---|---|
| S1 The Conversation | f082 | 0.445, 0.135 | edge-on coin rim, stratum 1 |
| S2 The Honest Question | f101 | 0.428, 0.196 | edge-on coin rim, stratum 2 |
| S3 The Rehearsal | f119–f122 | 0.298, 0.243 | plate 3, left rim |
| S4 The Covenant | f136 | 0.524, 0.250 | plate 4, right rim |
| S5 The Mark | f153 | 0.420, 0.507 | plate 5, clear of the card's edge |
| S6 The Launch | f171 | 0.470, 0.580 | coin rim/face, stratum 6 |
| S7 The Record | f188 (window-checked f178–f199) | 0.375, 0.580 | coin face, lower-left — inside the coin in every window frame (f182 is the binding case) |
| S8 The Handover | f206 | 0.485, 0.790 | coin face at the base stratum |

**Verification.** This VM's Chrome cannot reach the live site (the egress proxy refuses Chrome's CONNECT tunnel — `ERR_TUNNEL_CONNECTION_FAILED`, hit identically via raw CDP, `--dump-dom`, and Lighthouse), so rendering was verified in headless Chrome (Chrome for Testing 157) against a **byte-identical local mirror** of the deployed page + frame sets; the live page itself was verified byte-equal (above) and its frame URLs byte-checked live (Item 2). At every stage's settled beat the harness read the active callout at opacity 1 with its leader at opacity 1.000 and real line/dot coordinates, and screenshots were eyeballed beat by beat; two beats were additionally proven by pixel-matching the screenshot against the frame files (S3's drawn frame = f119 vs target f118; S1's = f082 exact). Screenshots: `mint-specimen/resit-evidence/` (S1, S2, S3, S5, S6, S7, S8 desktop; S4 mobile — in every one the dot sits on the coin or its plate, tied to its card by the line). Two honest imperfections, recorded rather than hidden: where a card physically abuts the coin (S7), the "line" is a few px — the dot sits on the coin's face at the card's edge; and in the throttled headless rig the chase runs at ~2 fps, so settled-state reads needed long settles — on a real device the chase runs at display rate (see the founder's motion verdict, Item 3).

## ITEM 2 — TRUE MOBILE FRAME SET — ✅ FIXED

- Generated `listings/mint-frames/m/`: **235 frames, 480×270 WebP** (quality 48, method 6), from the same Flow frames. **Total 1,486,596 bytes (1.418 MiB)** — under the ≤1.5 MB budget on both readings (1,500,000 B and 1.5 MiB). Average 6,326 B/frame. (Encode trials: q75 1,976,598 · q65 1,774,800 · q60 1,685,012 · q55 1,601,334 · q52 1,548,800 · q50 1,513,556 · q48 1,486,596 — first fit.)
- Serving: the player picks the set by the same `small` test as its frame-step logic (viewport ≤700px): `frameDir = small ? 'mint-frames/m/' : 'mint-frames/'`. Desktop set unchanged (235 files, 6,302,660 B).
- **Live evidence:** repo listing — `mint-frames/` = exactly 235 files (highest f235.webp) + `m/` = exactly 235 files, 1,486,596 B. Live spot checks: `mint-frames/m/f001.webp` → 200, 9,510 B; `m/f235.webp` → 200, 5,976 B (byte sizes match the generated set). Browser network capture on the mirror: desktop viewport → 235 requests, all to `mint-frames/` (0 to `m/`); mobile viewport (390×844) → 118 requests, all to `mint-frames/m/` (0 to desktop set) — the step-2 sampling on small screens means a phone actually transfers ≈0.75 MB of frames, half the set total.
- This replaces the graded build's behaviour (small screens step-sampled the 960px set: ~3.02 MB fetched — double the budget).

## ITEM 3 — CWV FILING — ⚠️ LCP / INP / CLS STILL UNMEASURED (with the measurable facts)

**No CWV numbers are claimed.** Attempts made against the live page, all blocked by this environment, none by the page:

1. **PageSpeed Insights API** — returned HTTP 429 (upstream quota) earlier in this run; not retried (a 429 is a hard stop for the scope).
2. **Local Lighthouse (mobile) against the live URL**, three attempts: (a) chrome-launcher failed to start Chrome (no `--headless` in the merged flags → "Missing X server"); (b) with `--headless=new` added, Chrome launched but the navigation ended on `chrome-error://chromewebdata/` — Lighthouse `CHROME_INTERSTITIAL_ERROR`; (c) the underlying cause, proven independently via raw CDP and `--dump-dom`: **this VM's egress proxy refuses Chrome's CONNECT tunnel (`ERR_TUNNEL_CONNECTION_FAILED`)**, while curl and the Muse page fetcher traverse it fine. No route from this VM can load the live page in a real browser engine, so no honest lab run exists here. (A Lighthouse run against the local mirror was deliberately NOT filed: it would measure localhost serving, not the live page.)
3. **Field data:** none exists to read (no CrUX presence established for this URL; the page is days old).

**Measurable facts filed instead** (all measured this run):
- HTML: 26,886 B (live, byte-equal to build). One render-blocking shared stylesheet + Google Fonts CSS in the shell (unchanged from the graded build).
- JS on this page after the re-sit: `space.js` (~36 KB) + GSAP + ScrollTrigger (~102 KB combined) + the inline journey engine. **three.min.js (669,884 B) no longer loads** (Item 4) — the page's JS weight dropped by roughly two-thirds versus the graded build's ~817 KB.
- Frames are scroll content below the listing head, loaded lazily: preload starts on IntersectionObserver approach (rootMargin 120%) in priority tiers (frame 1, last frame, midpoint, then quartiles by binary subdivision, then around the current frame); nothing in the frame sets is render-blocking for first paint. Desktop set 6,302,660 B total but tier-loaded; mobile set 1,486,596 B total, ~118 files ≈0.75 MB actually fetched on a phone.
- The journey section is 780vh pinned; the canvas draws the nearest loaded frame and chases scroll with a ×0.1 lerp (the chase + priority preload were graded PASS in the verdict and are unchanged).

**Motion criterion — satisfied by the founder's device verdict**, recorded as ordered: George, 2026-11-22 21:50 CT, on the live specimen on his own device: *"It looks 100 times better than the first one — although the first one was perfect… now this looks much, much better."* (Cloud-browser motion checks are not evidence under the house law; the founder's real-device look is.)

**To close this item:** any ordinary-network Lighthouse run (or PSI once quota allows) against https://provadiacoin.com/listings/mint.html, mobile + desktop, filed against the Track 5 QA Gate 4 bars (LCP ≤2.5s, INP <200ms, CLS <0.1). Nothing about the numbers is predicted here.

## ITEM 4 — HOUSEKEEPING — ✅ FIXED (both)

- **three.min.js removed** from this page (the `<script src="../design/vendor/three.min.js">` tag is gone; verified in the live byte-equal page and in the browser probe: no three.min.js script element, `threeLoaded: false`). Safe because the specimen engine is canvas-only and the shell's `space.js` guards its Three.js stages with `if (!els.length || !window.THREE) return;` — and this page has no `.nw-stage` elements (the specimen build removed the nw-band). Other pages untouched and still load it as before.
- **Unused frames deleted:** `listings/mint-frames/f236.webp`–`f240.webp` removed from the deployed set (Contents API deletes in the deploy run: `deleted=5`). Repo and page now agree at TOTAL=235. Live proof: `mint-frames/f236.webp` → **404**, `f240.webp` → **404**; repo listing shows exactly 235 frame files, highest f235.webp.

## FENCES — HELD

- Changed in the repo: `listings/mint.html` (page PUT ×2 — the re-sit build, then the final tip corrections) and `listings/mint-frames/**` (235 mobile files added under `m/`, 5 unused files deleted). Nothing else. `marks/` untouched; all other pages untouched.
- Listing facts unchanged: $50 pilot price text, deliverables, honesty sentences, purchase DISABLED — the patch builder starts from the graded source and replaces only the re-sit deltas (leader CSS/JS + `data-sa-tip` attributes, the frame-dir wiring, the three.min.js tag); everything else is byte-identical by construction, and the final page was byte-compared live.
- Deploy route: the house GitHub helper (Contents API), same as the specimen run. Deploy log: mobile frames `put=235 skipped=0 failed=0`; page `status=200`; deletes `deleted=5`; `FAILURES: none`; final page PUT `status: 200`, 26,886 B.

## WHAT THE RE-GRADER SHOULD CHECK

1. Live page source: `data-sa-tip` on all 8 stage callouts; `.sa-leaders` CSS + leader engine present; `mint-frames/m/` in `src()`; no `three.min.js`.
2. Scroll the live page on a real device: at each stage's settled beat, a gold line + dot ties the card to its layer (positions per the Item 1 table); on a phone the frames come from `mint-frames/m/`.
3. `curl -I` the f236/f240 URLs (404) and any `m/` frame (200).
4. CWV: still open — run Lighthouse from a normal network and file against Gate 4; this record claims no numbers.

---
## CWV MEASUREMENT — FIRST REAL NUMBERS (2026-11-22 22:51 CT, via PageSpeed Insights web UI on an ordinary network, captain's browser run)
Results: https://pagespeed.web.dev/analysis/https-provadiacoin-com-listings-mint-html/amilj9klaj?form_factor=mobile
- MOBILE: Performance 75 · LCP 3.2 s (bar ≤2.5 — OVER) · CLS 0.383 (bar <0.1 — OVER) · TBT 0 ms · Speed Index 1.3 s · FCP 0.9 s · INP: no field data (page has no traffic history).
- DESKTOP: Performance 93 · LCP 0.7 s (pass) · CLS 0.156 (bar <0.1 — OVER) · TBT 0 ms · Speed Index 0.6 s · FCP 0.2 s · INP: no field data.
Gate 4 state: MEASURED at last. Two values over their bars (mobile LCP, CLS both strategies) = real fix items. George ordered the fix 2026-11-22 22:52 CT ("fix the issue... I wanna see green light"); CWV fix run spawned the same minute (record: EXAM_ARTIFACT_1_CWV_FIX_RECORD.md when it lands). INP closes via Gate 4's own lab method (DevTools trace, worst interaction) — field INP cannot exist for a page with no traffic. After the fix deploys, the captain re-runs this same live PageSpeed route for the official filing, and the gate is re-judged.

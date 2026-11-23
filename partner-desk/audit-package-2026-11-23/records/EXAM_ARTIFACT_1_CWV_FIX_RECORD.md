# EXAM ARTIFACT #1 — CWV FIX RECORD

**Artifact:** https://provadiacoin.com/listings/mint.html (Coin Mint scroll specimen)
**Order:** George, 2026-11-22 22:52 CT — fix whatever the issue is; the crew passes on real numbers; green light.
**Scope:** only the two measured performance defects from the first real PageSpeed run + the INP evidence line. No other changes.
**Fix run:** 2026-11-23 (diagnosis → patch → local proof → deploy → live byte-verification).
**Final live state:** page HTTP 200, **27,646 bytes, byte-equal** to the fix build (`mint-specimen/mint-cwv.html`, sha256 `b8c070b9ba1501db…`), built by `mint-specimen/build_page_cwv.py` from the deployed re-sit build; the diff between the re-sit page and the fix page is exactly the CWV hunks listed below — nothing else moved.

---

## THE MEASUREMENT THAT INDICTED (PageSpeed Insights, live page, 2026-11-22 22:51 CT)

Results: https://pagespeed.web.dev/analysis/https-provadiacoin-com-listings-mint-html/amilj9klaj?form_factor=mobile

| Strategy | Perf | LCP (bar ≤2.5s) | CLS (bar <0.1) | TBT | SI | FCP | INP |
|---|---|---|---|---|---|---|---|
| Mobile | 75 | **3.2 s — OVER** | **0.383 — OVER** | 0 ms | 1.3 s | 0.9 s | no field data |
| Desktop | 93 | 0.7 s — pass | **0.156 — OVER** | 0 ms | 0.6 s | 0.2 s | no field data |

## DIAGNOSIS

Method: a **byte-identical local mirror** of the live page was assembled (shell/design/catalogue files pulled from the repo via the house GitHub helper; frame sets from the local dirs whose byte totals match the deployed repo exactly — desktop 6,302,660 B, mobile 1,486,596 B; mint-assets verified against repo sizes and downloaded where the local copies differed) and run through **Lighthouse 13.6.0** (Chrome for Testing 157) — `mint-specimen/cwv-evidence/baseline-{mobile,desktop}.json`. The PSI results page itself names no elements in fetched text, so the culprits below are the mirror run's, cross-checked against the PSI numbers.

**CLS — the gallery media carried no dimensions.** The desktop mirror run reproduced the defect (CLS 0.115 locally vs 0.156 on PSI) and named it exactly: one shift of 0.1146 — `div.mg-row` (and everything below it) pushed down when the hero image arrived, with two filed causes:
1. **`mint-assets/still-1.jpg` — "Unsized image element" / "Media element lacking an explicit size."** All five gallery stills and the assembly-film `<video>` were bare `width:100%; height:auto` with **no width/height attributes and no aspect-ratio**, so each one laid out at height 0 and expanded the hero stack as it loaded. On PSI's mobile run the same mechanism, with the whole gallery + video stack in or near the phone viewport, sums to 0.383; on desktop 0.156.
2. **Web-font loading (co-cause).** The shell's self-hosted Cinzel/Inter `@font-face` rules use `font-display:swap`; the swap re-flows the heading/lead text above the gallery and moves the hero with it.

**Mobile LCP — the hero image was lazy, low-priority, and heavy.** The LCP element is the hero still (`still-1.jpg`, 960×540, **88,840 B** — the deployed encode is the `stills-flow` one). It carried `loading="lazy"` and no fetch priority, so under mobile throttling it was discovered late and fetched at low priority: FCP 0.9 s but LCP 3.2 s, with TBT 0 ms proving the main thread was never the bottleneck — the image path was. A density subtlety mattered for the fix: a plain `srcset` would still have picked the 960w JPEG on high-DPR phones (slot 100vw × DPR ≥ 2 ⇒ ≥960 device px), so the mobile asset had to be switched by media query, not by density.

**INP — no field value can exist** (the page has no traffic history; PSI shows "No Data"). Gate 4's own method for the INP line is a *DevTools trace, worst interaction* — produced locally below.

## THE FIXES (all inside `listings/mint.html`, plus one new file in `listings/mint-assets/`)

1. **Space reserved for every gallery medium** — `width="960" height="540"` on all five stills and on the `<video>`, plus `aspect-ratio:16/9` added to the page's own `.mint-gallery img` / `.mint-gallery video` rules. Every stage of the hero now holds its final box before any byte of media arrives. (Track 5 QA Gate 3/4 language: every stage carries an explicit aspect-ratio box.)
2. **Font-swap discipline** — `<link rel="preload" as="font">` for both shell fonts (Cinzel 46,048 B, Inter 324,820 B — same-origin, already loaded by the page; the preload only moves them ahead of first paint so the swap lands before layout settles instead of after).
3. **Mobile LCP path rebuilt** —
   - New asset **`listings/mint-assets/still-1-480.webp`**: 480×270 WebP (q72, method 6) from the deployed hero still — **12,390 B vs the JPEG's 88,840 B (7.2× lighter)**.
   - `<picture>` switch at the house breakpoint: `<source media="(max-width: 700px)" srcset="…/still-1-480.webp">` — the same ≤700px test the player already uses to pick the mobile frame set; single-candidate, so no DPR density upgrade can substitute the 960w file on phones. Desktop keeps the full 960w JPEG.
   - The hero `<img>` is now `loading="eager" fetchpriority="high"`, and the head carries two media-split image preloads (≤700px → the WebP; ≥701px → the JPEG), both `fetchpriority="high"` — the LCP element is requested in the first parse, at top priority, in its correct per-device form.
4. **Nothing else.** The frame sets were not recompressed or touched (desktop 6,302,660 B / mobile 1,486,596 B, unchanged); no script tags changed; the journey engine, leader lines, callouts, and all listing facts are byte-identical outside the hunks above (verified by diff).

## LOCAL EVIDENCE (Lighthouse 13.6.0 + Chrome 157, byte-identical mirror — LOCAL values, not live)

| Run | Perf | LCP | CLS | TBT | FCP | SI |
|---|---|---|---|---|---|---|
| Mobile baseline | 55 | 5.3 s | 0 (rig did not reproduce the mobile shift) | 1,390 ms | 1.4 s | 1.9 s |
| Mobile fixed | **76** | 5.4 s* | **0 — zero shift items** | 180 ms | 1.8 s | 1.9 s |
| Desktop baseline | 92 | 1.0 s | **0.115** (culprit named, §Diagnosis) | 160 ms | 0.3 s | 0.7 s |
| Desktop fixed | **98** | 1.1 s | **0 — zero shift items** | 30–70 ms | 0.4–0.5 s | 0.7 s |

\* **Honest caveat on the local mobile LCP:** this VM's shared 1.5-CPU cell under Lighthouse's 4× CPU throttle is far weaker than PSI's emulation rig (local baseline TBT 1,390 ms where PSI measured **0 ms**), so the local mobile LCP is CPU-bound here and does not reproduce PSI's image-bound 3.2 s regime — it is not evidence about the live number either way. What the local runs *do* prove: CLS's mechanism is dead (0 shifts, both strategies, where the desktop baseline reproduced it), and the mobile network path now fetches exactly the right asset — mirror network log, mobile: `still-1-480.webp`, **priority High, 12,579 B transferred**; desktop: `still-1.jpg`, priority High. On PSI's rig, where TBT was already 0 and the gap was discovery + 76 KB of transfer (≈0.48 s at Slow-4G's 1.6 Mb/s), both halves of that gap are now closed: preload + eager + fetchpriority removes the discovery delay, and the transfer shrinks 7.2×.

**INP evidence (Gate 4's lab method — DevTools-style trace, worst interaction; LOCAL mirror):**
Harness: puppeteer-core + Chrome 157, 390×844 touch viewport, 4× CPU throttle, Slow-4G — `mint-specimen/cwv-tools/inp_trace.mjs`; trace filed at `mint-specimen/cwv-evidence/inp-trace-local.json`, summary at `inp-summary-local.json`. Exercised: 40 wheel steps through the full 780vh journey with the chase active, a tap on the calm-toggle button, a tap on the assembly film.
- **Worst tap/click interaction: 120 ms** (click 120 · pointerdown 96 · pointerup 64) — **under the <200 ms bar**.
- Worst event of any type: 120 ms. 149 events recorded.
- Longtasks during the session: 13, worst 437 ms (initial script work under throttle, outside any discrete interaction — filed for honesty; INP grades interactions, and the worst interaction is the 120 ms above).
- CLS accumulated across the whole interactive session: **0.0072** (one minor shift entry) — the page does not shift under use either.

## DEPLOY + LIVE PROOF

- Deploy (`mint-specimen/deploy_cwv.py`, house GitHub helper): `listings/mint-assets/still-1-480.webp` PUT → **201**; `listings/mint.html` PUT → **200**. FAILURES: none.
- Live page: HTTP 200, **27,646 B, sha256 `b8c070b9ba1501db…` — byte-equal to the fix build** (Pages propagation ~45 s; attempts 0–2 served the prior build, attempt 3 matched).
- Live new asset: `listings/mint-assets/still-1-480.webp` → **200, 12,390 B, image/webp**.
- Live spot checks after deploy: `mint-frames/f001.webp` 200 (49,780 B) · `mint-frames/m/f001.webp` 200 (9,510 B) · `mint-frames/f236.webp` still **404** (housekeeping intact).

## REGRESSION CHECKLIST

- ✅ Leader lines + tip dots: `data-sa-tip` present ×9 in source (8 callouts + the mechanism's pattern comment — the re-grade's own accounting); leader CSS/JS untouched by the diff.
- ✅ Callouts: all 10 beat callouts byte-identical (diff shows no callout hunks).
- ✅ Chase: `dispP+=diff*0.1` present; priority preload `prioritySeq()` present; nearest-loaded fallback untouched.
- ✅ Frame-set wiring: `frameDir=small?'mint-frames/m/':'mint-frames/'` present; both sets byte-untouched (budgets hold: mobile 1,486,596 B ≤ 1.5 MB, desktop 6,302,660 B).
- ✅ Facts: `$50 pilot` present; honesty sentence present; `data-purchase-enabled="false"` present — and the whole page outside the CWV hunks is byte-identical to the re-sit build by construction (asserted patch anchors) and by diff.
- ✅ Housekeeping: `three.min.js` occurrences still 0.
- ✅ Fences: repo changes are exactly `listings/mint.html` + `listings/mint-assets/still-1-480.webp`. `marks/` and every other page untouched.

## WHAT REMAINS

The captain re-runs the official live PageSpeed measurement on the deployed page and files it against Gate 4 (LCP ≤2.5 s mobile · CLS <0.1 both), with this record's local trace closing the INP line by the gate's own lab method. No live CWV number is claimed here — every number above names its tool and whether it is live (PSI, 22:51 CT) or local-mirror (Lighthouse 13.6.0 / Chrome 157 trace).

*Fix record filed 2026-11-23 by the CWV fix run. Evidence: `mint-specimen/cwv-evidence/` (baseline/fixed Lighthouse JSONs, INP trace + summary), `mint-specimen/build_page_cwv.py`, `mint-specimen/deploy_cwv.py`, `mint-specimen/build_mirror.py`.*

## CAPTAIN'S OFFICIAL RE-MEASUREMENT — 2026-11-22 23:05 CT (after Round 1)
Route: PageSpeed Insights web UI via the cloud browser (ordinary network), FRESH analysis of the live fixed page. Analysis: https://pagespeed.web.dev/analysis/https-provadiacoin-com-listings-mint-html/lbttdgguxi?form_factor=mobile (desktop = same URL, form_factor=desktop). Lighthouse 13.6.0.
- MOBILE (Moto G Power, Slow 4G): Performance 96 · LCP 2.7s (bar <=2.5 — STILL OVER by 0.2s; was 3.2s) · CLS 0 (bar <0.1 — PASS; was 0.383) · TBT 0 ms · FCP 1.1s · Speed Index 1.2s · Accessibility/Best Practices/SEO 100.
- DESKTOP: Performance 100 · LCP 0.6s (PASS; was 0.7s) · CLS 0 (PASS; was 0.156) · TBT 0 ms · FCP 0.3s · Speed Index 0.5s.
- INP: no field data on either strategy (page has no traffic history — expected); the gate's evidence is the Round 1 lab trace (worst interaction 120 ms < 200 ms bar), filed in mint-specimen/cwv-evidence/.
GATE STATE after Round 1: CLS closed on both strategies; desktop LCP closed; INP closed by the gate's own lab method. ONE number remains over: mobile LCP 2.7s. Round 2 (mobile LCP only) was spawned the same minute, per the captain's standing commitment to George: any number over -> the fix loops until genuinely green. No bar moved.

---

## ROUND 2 — MOBILE LCP ONLY (fix run 2026-11-23)

**Scope:** the single remaining defect — mobile LCP 2.7 s vs the ≤2.5 s bar. Nothing else was touched.
**Final live state:** page HTTP 200, **44,046 bytes, byte-equal** to the Round 2 build (`mint-specimen/mint-cwv2.html`, sha256 `0fe2ebb722f4e4d2…`), built by `mint-specimen/build_page_cwv2.py` from the deployed Round 1 build. A token-level diff audit proves the two builds are identical outside the two Round 2 hunks listed below.

### Diagnosis — the LCP element, verified; the network leg, indicted

- **The LCP element is the hero still-1 image — verified, not assumed.** Round 1's mirror runs named it twice (srcset variant: `div.listing-media > div.mint-gallery > figure > img`; deployed picture variant: `div.mint-gallery > figure > picture > img`, bounding rect 368×207 at top 575 in the 412×823 Moto G viewport). Round 2's runs name the same node again, before and after the change. The two alternative candidates were considered and rejected on evidence: the scroll-stage canvas is drawn by JS into a sticky stage whose first frame never appears as the LCP node in any run, and the headline block is smaller than the hero image and would have painted at FCP time.
- **The defect lives in the image's network leg.** On the captain's official run the mobile gap is FCP 1.1 s → LCP 2.7 s with **TBT 0 ms** — the main thread was never busy, so the 1.6 s sits between first paint and the hero's paint: request scheduling/transfer through a Slow-4G pipe shared with 371 KB of preloaded fonts (Inter alone 325 KB), four stylesheets, the video poster (still-3.jpg, fetched High) and the lazy gallery stills near the viewport. The mirror's observed sub-parts for the Round 1 build (this session's baseline run, `cwv-evidence/round2-before-mobile.json`): TTFB 14 ms · resource load delay 41 ms · resource load duration 63 ms · element render delay 331 ms (localhost values — the structure transfers, the absolutes do not; under PSI's simulated throttling the two network sub-parts are exactly what Lantern stretches).
- The PSI API was tried once for the stored analysis's JSON and returned **HTTP 429 (daily quota)** — honoured as a hard stop, not retried. Diagnosis therefore rests on the captain's filed PSI numbers plus the mirror's element/sub-part structure, as in Round 1.

### The fix — remove the request, not the symptom

Two hunks, both inside `listings/mint.html`:

1. **The mobile hero WebP is inlined.** The `<picture>` source for ≤700 px now carries `still-1-480.webp` (12,390 B) as a `data:image/webp;base64,…` URI (+16,520 chars). On mobile there is no LCP request at all: load delay and load duration are not reduced, they are *eliminated* — the bytes arrive inside the HTML document itself. The cost is +16,400 B on the HTML leg (≈ +0.08 s at Slow-4G rates), against the whole separate request leg removed.
2. **The now-unconsumed mobile image preload is removed** (a preload nothing consumes is a wasted 12 KB fetch). Everything else from Round 1 stays: both font preloads, the desktop (≥701 px) preload of the 960 w JPEG, the `<img>`'s eager + fetchpriority=high, all width/height attributes and aspect-ratio boxes. Desktop loads the full 88,840 B JPEG exactly as before. `listings/mint-assets/still-1-480.webp` remains in the repo (still served, HTTP 200, 12,390 B) as the file of record for the inlined bytes; it is simply no longer fetched by phones.

Page size: 27,646 B → 44,046 B. No other repo file changed; both frame sets byte-untouched (desktop 6,302,660 B / mobile 1,486,596 B, re-summed and matched this run).

### Local evidence (Lighthouse 13.6.0 + Chrome 157, byte-identical mirror — LOCAL values, not live)

Same-session A/B (the before-run was taken minutes before the after-run, same VM cell):

| Run | Perf | LCP | CLS | TBT | FCP | SI |
|---|---|---|---|---|---|
| Mobile, Round 1 build | — | 5.2 s | 0 | 310 ms | 1.3 s | 2.0 s |
| Mobile, Round 2 build | 83 | **4.3 s** | **0** | 160 ms | 1.4 s | 1.4 s |
| Desktop, Round 2 build | 94 | 1.1 s (= Round 1 local) | **0** | 160 ms | 0.5 s | 0.7 s |

The local mobile absolutes remain CPU-skewed on this cell (Round 1's caveat stands: local 5.2 s where PSI measured 2.7 s), so the evidence is the **structure**, and the structure moved exactly as designed: the after-run's LCP breakdown contains **only TTFB (4 ms) + element render delay (310 ms)** — the resource load delay and resource load duration sub-parts are *gone*, and the network log shows **zero still-1 requests** on mobile, with the LCP node now the same IMG whose resolved source is the data URI. Desktop still fetches `still-1.jpg` (88,840 B, High) and its local LCP is unchanged at 1.1 s.

**Behaviour verification** (puppeteer, 390×844 touch viewport, mirror — `cwv-evidence/round2-verify-local.json`): hero `currentSrc` = the data URI, `naturalWidth` 480, complete; **118 frame requests, all to `mint-frames/m/`, zero to the desktop set** (identical count to Round 1's capture); all **8 tipped callouts and all 8 leader groups reach opacity 1.000** at their beats; session CLS across the full scroll journey: **0**.

### Deploy + live proof

- Deploy (`mint-specimen/deploy_cwv2.py`, house GitHub helper): `listings/mint.html` PUT → **200**. Single-file deploy; no asset changes.
- Live page: HTTP 200, **44,046 B, sha256 `0fe2ebb722f4e4d2…` — byte-equal to the Round 2 build** (Pages propagation: checks 0–1 served the Round 1 build, check 2 matched).
- Live spot checks after deploy: `mint-frames/m/f001.webp` 200 (9,510 B) · `mint-frames/f001.webp` 200 (49,780 B) · `mint-frames/f236.webp` still **404** · `mint-assets/still-1-480.webp` 200 (12,390 B).

### Regression checklist

- ✅ CLS defences untouched: font preloads ×2, width/height on all gallery media, `aspect-ratio:16/9` rules — all present; local CLS 0 on both strategies and 0 across the interactive scroll session.
- ✅ Leader lines + tip dots: `data-sa-tip="` ×9 (8 callouts + pattern comment), identical to Round 1; behaviour run shows all 8 leaders settling at opacity 1 with their callouts.
- ✅ Chase `diff*0.1` present; `prioritySeq(` present; nearest-loaded fallback untouched (diff audit: no script hunks at all).
- ✅ Frame wiring: `frameDir=small?'mint-frames/m/':'mint-frames/'` present; both sets byte-untouched (totals re-summed: 6,302,660 / 1,486,596).
- ✅ Facts: `$50 pilot`, honesty sentence, `data-purchase-enabled="false"` — all present, and byte-identical outside the two hunks by the diff audit.
- ✅ Fences: repo change is exactly `listings/mint.html`. `marks/` untouched. `three.min.js` occurrences still 0.

### Belief — will the captain's live re-run now measure mobile LCP ≤ 2.5 s?

**Yes — that is this seat's belief, with the reasoning on the table.** The 2.7 s was an FCP of 1.1 s plus a 1.6 s network leg for a 12 KB image, on a run whose TBT was 0. That leg no longer exists: the LCP element's bytes are inside the HTML document PSI already receives before FCP, and the element paints into a box that has been reserved since Round 1, so its paint is gated only by the render path plus a 480×270 WebP decode — locally the render-delay sub-part measured ~310 ms on a cell far weaker than PSI's rig. Expected landing ≈ FCP + a few hundred ms, i.e. ~1.4–1.8 s, under the bar with margin rather than by a hair. The honest risks are named: PSI run-to-run variance, and the possibility that the render-delay sub-part behaves worse on PSI's rig than the mirror suggests. No live number is claimed here — the captain's re-run files the number, and the gate closes on it or the loop runs again.

*Round 2 section filed 2026-11-23 by the CWV fix run (Round 2 seat). Evidence: `mint-specimen/cwv-evidence/round2-before-mobile.json`, `round2-after-mobile.json`, `round2-after-desktop.json`, `round2-verify-local.json`; `mint-specimen/build_page_cwv2.py`, `mint-specimen/deploy_cwv2.py`, `mint-specimen/cwv-tools/round2_verify.mjs`.*

## CAPTAIN'S OFFICIAL RE-MEASUREMENT #2 — 2026-11-22 23:15 CT (after Round 2) + FINAL GATE JUDGMENT
Route: PageSpeed Insights web UI via the cloud browser, FRESH analysis of the live Round-2 page (44,046 B). Analysis: https://pagespeed.web.dev/analysis/https-provadiacoin-com-listings-mint-html/jok56f82tu?form_factor=mobile (desktop = same URL, form_factor=desktop). Lighthouse 13.6.0.
- MOBILE (Moto G Power, Slow 4G): Performance 96 · LCP 2.4s (bar <=2.5 — PASS; was 3.2 -> 2.7 -> 2.4) · CLS 0 (bar <0.1 — PASS) · TBT 0 ms · FCP 1.2s · Speed Index 4.0s (noted: SI moved up vs the prior run's 1.2s; Speed Index is NOT one of Gate 4's three bars and is not a Core Web Vital — recorded here for honesty, it does not govern the gate) · Accessibility/Best Practices/SEO 100.
- DESKTOP: Performance 100 · LCP 0.6s (PASS) · CLS 0 (PASS) · TBT 10 ms · FCP 0.3s · Speed Index 0.5s.
- INP: no field data (no traffic history — expected); gate evidence = Round 1's lab trace by Gate 4's own method, worst interaction 120 ms (bar <200 ms — PASS).
FINAL GATE JUDGMENT (captain, judging last under the Mastery Standard, on measured numbers only): Gate 4 is CLOSED — LCP, INP and CLS all inside their bars on the live page. With the blind re-grade's five PASS criteria standing, EXAM ARTIFACT #1 (the Mint specimen, https://provadiacoin.com/listings/mint.html) is a full PASS, 6 of 6. Production-Ready stamps are awarded on this named artifact for the dashboard rows the re-grade named as substantively proven and blocked only by this filing: Motion & Scroll (L3-L4 band), Flow production (L10), Cinematic Production (L16), Performance (L20). Crew University Tracks 1-6 graduation is COMPLETE. Track 7 (Cinematic Web Engineering, filed + sealed 2026-11-22) is now chartered to launch under the same Mastery Standard.

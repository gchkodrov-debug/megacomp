# GEMINI #80 — ANCHOR PHONE-SIGN DIAGNOSIS — 2026-11-24
# Source: Gemini session gemini.google.com/app/46ea9941c6a01756 (onejobkits@gmail.com, Ultra)
# Dispatched 2026-11-24 10:53 CT · Answer landed 10:53–10:56 CT (browser task e10ecb07-e083-5b89-80f0-2a15e5e53c73, harness-measured)
# Verbatim answer below, followed by the captain's adjudication.

---

HOUSE BUILD PERCENTAGE: ~5% (measured strictly against the founder's 2026-11-24 10:24 CT 100% ruler; moves only on verified-complete, customer-eye-proven, Surfer-complete pieces)

ASSIGNMENT #80 — DIAGNOSTIC REPORT: DESKTOP GATE PASSES vs. IPHONE PHANTOM SIGN FAILS

1. Independent Diagnosis — Weighing H1, H2, and the Missing Third Mechanism (H3)

Both of the captain's hypotheses (H1 and H2) explain pieces of the symptom, but neither alone accounts for why even a single fast tap on iPhone LTE dies inside the ~58–59s window while desktop passes a 90,002 ms hold. Look at the exact divergence between the VPS desktop rig and the founder's iPhone:

Why H1 (Stale WKWebView Cache Across 6 Open Tabs) Fits the Screenshot Evidence:

In iOS WKWebView (which Phantom's iOS in-app browser uses), an open tab restored from background (6 tabs open across the morning) serves its cached DOM/JS memory snapshot without re-fetching index.html unless hard-reloaded or cache-busted via query string.

That directly explains why the founder saw one sign flow, no "The first stamp aged out…" rebuild notice, and an error banner truncated right before the Amendment 3 vs. Amendment 2 wording split.

Why H2 (iOS Phantom User-Gesture / Sheet-Queue Gate) Also Holds on iOS:

Unlike the desktop browser extension (which allows a dApp to call window.solana.signTransaction() back-to-back inside an async while loop), Phantom's iOS native sheet bridge enforces strict single-sheet-per-user-gesture protection to prevent dApps from spamming native modal sheets. A programmatic second signTransaction() call triggered after an await (or 58+ seconds after the initial tap) is either silently dropped or rejected by the iOS native bridge without ever raising a second approval sheet.

THE THIRD MECHANISM THE HOUSE MISSED (H3 — Why the First Sheet Itself Expires Before Confirmation on iPhone LTE):

Even when the founder gets the fresh Amendment 3 page, there is a third hardware/network bottleneck unique to iPhone + Phantom iOS + LTE that does not happen on the VPS desktop rig:

Double Public-RPC Latency + Phantom iOS Pre-Sign Simulation Overhead (12–25s eaten before the sheet even renders): On a datacenter VPS (1 Gbps wired), getLatestBlockhash + Phantom's transaction simulation takes < 400 ms. On an iPhone over cellular LTE, the page fetches getLatestBlockhash from api.mainnet-beta.solana.com (1–3s), hands the legacy transaction to Phantom iOS, and Phantom's mobile app runs its own blocking RPC pre-flight simulation + account-balance + Blowfish security scan over LTE (5–15s spinner inside Phantom) before enabling the Approve button.

iOS WKWebView Background Suspension + Mainnet 150-Slot Reality (~58–59s vs. 90s): Notice the critical difference between the VPS gate and mainnet:

On devnet (90,002 ms hold test), slot times frequently run slower (~500–650 ms/slot), stretching 150 slots to 75–95 seconds.

On mainnet-beta, slot times run at ~390–400 ms/slot, giving a hard 58–59 second ceiling from getLatestBlockhash to expiration.

When the founder unlocks FaceID, waits for Phantom's LTE simulation spinner, reads the transaction preview, and taps Approve, 35–50 seconds have already elapsed—and if the public RPC node returning getLatestBlockhash was 15–20 slots behind the tip (confirmed vs. finalized commitment lag!), the blockhash is already dead at 38–42 seconds on the very first sheet!

Critical Commitment Trap (finalized vs. confirmed Blockhash Age): If /anchor/ calls getLatestBlockhash('finalized'), Solana's finalized slot is already ~31–32 slots (~13 seconds) older than confirmed at the exact millisecond it is fetched—cutting a 58s window down to ~45 seconds before the user even sees the Phantom sheet!

2. Verdict on Amendment 4 (Fresh-Tap "Re-Issue the Stamp" Button + Commitment & Cache Locks)

VERDICT: AMENDMENT 4 IS ARCHITECTURALLY SOUND AND MANDATORY FOR MOBILE — WITH THREE EXACT ENGINEERING ADDITIONS SO ATTEMPT #6 SUCCEEDS ON THE FIRST TAP.

Relying on an automatic async loop to pop a second native sheet inside iOS Phantom is fragile (H2). Replacing auto-re-invoke on mobile with a founder-tap-driven "Re-issue the Stamp" button guarantees a fresh OS user-gesture token on every retry.

To cure H1 (stale cache), H2 (iOS gesture gate), and H3 (LTE latency + blockhash age) simultaneously in Amendment 4, build all four pieces together:

Fetch getLatestBlockhash('confirmed') at Tap Time (Never 'finalized' and Never Pre-Fetched on Page Load):

Do not fetch the blockhash when the page loads (which wastes 10–30s while the user reads the page). Fetch getLatestBlockhash('confirmed') inside the Sign button click handler immediately before calling signTransaction(), gaining +13 seconds of fresh slot lifetime over 'finalized'.

Visible Build Stamp + Cache-Busting Header (Cures H1 Immediately):

Print a visible build badge in the status bar (Build: v4-amber · SHA prefix) and set Cache-Control: no-store, no-cache, must-revalidate (plus instruct the founder to close old tabs and open a single fresh URL https://provadiacoin.com/anchor/?v=4) so it is impossible to sign from a cached tab.

Founder-Tap "Re-issue the Stamp" State (Cures H2):

If currentBlockHeight > lastValidBlockHeight on return from Phantom (or if a live countdown bar hits 0s), do not auto-invoke signTransaction() asynchronously. Instead, render a clear #E4C65B alert plaque with a large 48px-tall tap target: [ RE-ISSUE FRESH STAMP & SIGN ], so the founder's own tap supplies a brand-new iOS user gesture and fetches a brand-new confirmed blockhash.

Explicit Diagnostics Telemetry in the Error Banner:

Include exact elapsed milliseconds (fetched → signed → checked) and blockHeight vs. lastValidBlockHeight delta directly in the banner (e.g., "Elapsed: 44.2s · Slot delta: +11 slots past expiry") so we never have to guess what happened on the phone.

3. The ONE Discriminating Test Before Asking the Founder to Sign Attempt #6

Do not ask the founder to sign on mainnet yet. Run this one zero-cost, 60-second discriminating check:

Captain's Pre-Flight Check (Zero Founder Involvement):

Verify live /anchor/?v=4 serves Cache-Control: no-store and prints Build: v4 in the DOM, and verify via RPC benchmark that getLatestBlockhash('confirmed') + getBlockHeight('confirmed') yields ≥ 145 remaining slots (≥ 58s) at the moment of fetch.

Founder's Single Diagnostic Step (Read-Only — Zero Wallet Popups, Zero Signing):

Have the founder close all 6 old Phantom tabs, open https://provadiacoin.com/anchor/?v=4 in a single clean Phantom tab, and simply read the visible Build Tag & Live Slot Countdown on screen (without tapping Sign yet):

If the old tab had no Build: v4 badge, H1 (stale cache) is proven immediately.

Once Build: v4 is confirmed visible on his iPhone screen, then and only then is he cleared for Attempt #6—where a single tap fetches a fresh 'confirmed' blockhash on click, and if LTE ever exceeds 58s, the explicit [ RE-ISSUE FRESH STAMP & SIGN ] button guarantees a clean second gesture without ever hitting an expired hash.

---

# CAPTAIN'S ADJUDICATION — 2026-11-24 (watch run, on landing)

**SUSTAINED WHOLE as the governing diagnosis, with 2 marks:**

- **Combined verdict adopted:** H1 (stale WKWebView tab snapshot across the founder's 6 open tabs) + H2 (iOS Phantom single-sheet-per-gesture — a programmatic re-invoke after an async gap is silently dropped, so Amendment 3's auto-rebuild can never present its second sheet on iPhone) together explain attempt #5's exact shape: one sign flow, no second sheet, no rebuild notice. H3 is adopted as the third leg: on iPhone + LTE, Phantom's own pre-sign simulation/scan plus public-RPC latency eat the window before Approve is even tappable, and mainnet's ~400 ms slots make the real ceiling ~58–59 s — materially tighter than the devnet gate's effective window. The desktop gate passing therefore does NOT clear the phone path; that inference is retired.
- **Amendment 4 APPROVED as designed by Gemini, all four pieces together:** (1) fetch getLatestBlockhash('confirmed') at tap time, never pre-fetched; (2) visible Build badge + Cache-Control: no-store + the ?v=4 fresh-tab route; (3) founder-tap [ RE-ISSUE FRESH STAMP & SIGN ] state replacing auto-re-invoke on expiry; (4) elapsed-ms + slot-delta telemetry in the error banner. A4 is a build order for the anchor crew, gated and rehearsed before any founder sign.
- **Mark 1 — NEEDS-CHECK (captain-owed, before/during the A4 build):** Gemini's load-bearing specifics are his seat's reported values, not captain-re-verified: (a) which commitment the CURRENT /anchor/ code actually passes to getLatestBlockhash, and whether the blockhash is fetched at page load or at tap — read the live source first; if it already fetches 'confirmed' at tap, piece (1) shrinks to a lock, not a change; (b) his devnet slot-time figures (~500–650 ms) vs mainnet (~390–400 ms); (c) Phantom iOS's simulation/Blowfish timings (5–15 s). The A4 design does not depend on their precision — every piece helps under any of the three hypotheses — but no figure is quoted outside the house until checked.
- **Mark 2 — SEQUENCING CORRECTION to his discriminating test:** the test as written presupposes the v4 build (badge, no-store headers, countdown) that does not exist yet — it cannot run before A4 is built. Corrected order: (i) build A4 + gate it (desktop rig, held-approval reproduction as before); (ii) captain's pre-flight exactly as he specified (no-store + Build: v4 live, ≥145 slots at 'confirmed' fetch); (iii) founder's single read-only step — close all 6 tabs, open /anchor/?v=4 fresh, read the Build tag + countdown aloud, NO signing; that reading also retro-proves H1 if his old tabs lacked any such badge; (iv) only then attempt #6, founder-tap-driven throughout. **The founder's standing instruction holds: NO sign attempt #6 until steps (i)–(iii) are done.**
- House Build Percentage: ~5% — unchanged (a diagnosis moves nothing under the #78 ruler).

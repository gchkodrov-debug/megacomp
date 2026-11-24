# GEMINI — PULSE SLICE 1: BUILD-READY SPECIFICATION (Assignment #33, 2026-11-23)
## Verbatim return, Gemini session 46ea9941c6a01756 (Ultra).

- receipts:
  - None
- report:
  - status: completed
  - summary: Assignment 33 complete — Gemini delivered the Pulse Slice 1 build-ready specification (pulse-slice1-data-shell) in full. One text-only message, sent exactly as briefed, answered in full. No problems hit: no attachments, no sign-in issue. Session: onejobkits@gmail.com (OneJobKits, Ultra, model "Hydrogen"), https://gemini.google.com/app/46ea9941c6a01756, tab t1.
    
    ——— GEMINI'S ANSWER — VERBATIM ———
    
    Constitutional Declaration: How the One Structure Applies Here
    
    Every gated slice, data contract, and interface authored for PROVADIA obeys the single house constitution: pinned centre → opens into genuine named parts → scroll-locked bullet with leader line and tip dot stating what each part is and what it does → reassembles whole. Here, Pulse Slice 1 (pulse-slice1-data-shell) cuts the first crew-executable slice of pulse-coin-world-v1 onto /coin/—retiring the third-party GeckoTerminal iframe embed in favor of our own precision PROVADIA Functional Candlestick Instrument (Lightweight Charts), wiring verified GeckoTerminal pool (2fvtfwCco71J8XePws7yREZ3569U2GxU4FYHE2H8oxDY) and Helius RPC reads into the three honest states (LIVE · QUIET · DELAYED/DISCONNECTED), anchoring the Genesis Constellation in its honest SPECIMEN · 0 / 470 MINTED state, and keeping CONNECT WALLET (read-only), TRADE PROVADIA (pump.fun), and the verbatim Honesty Sentence permanently visible and unobstructed at all times.
    
    PULSE SLICE 1 (pulse-slice1-data-shell) — BUILD-READY SPECIFICATION
    
    House: PROVADIA (provadiacoin.com · #141210 Vault Void · #C9A227 Antique Gold · #E9DDC6 Bone Cream · #30251B Deep Brown · #E4C65B Bright Gold reserved strictly for live pulse indicators, threshold rings, and active wallet-owned highlights)
    Target Route: /coin/ (Door 03 — The Coin / The Pulse of PROVADIA)
    Token & Pool Constants (Hard-Locked):
    
    Mint Address: 9UE6NStA9pRZ5xagrK1FNy3vybmQVL2VaKB7BNpvpump (1,000,000,000 fixed supply · Mint/Freeze NONE · Bonding curve, ungraduated — zero DexScreener links or embeds)
    
    Verified Pool Address: 2fvtfwCco71J8XePws7yREZ3569U2GxU4FYHE2H8oxDY (Solana / pump.fun curve on GeckoTerminal)
    
    1. RETIRING THE THIRD-PARTY EMBED (WHAT REPLACES IT & WHAT REMAINS)
    
    Retired Permanently in Slice 1: The third-party <iframe> GeckoTerminal chart embed currently on /coin/ is removed completely (0 third-party iframes, 0 external ad/cookie trackers, 0 unstyled gray chart chrome).
    
    What Replaces It: Our sovereign PROVADIA Functional Chart Instrument powered by Lightweight Charts (< 45 KB gzipped, local self-hosted bundle) dressed natively in #141210 Vault Void, #C9A227 Antique Gold bullish candles, #30251B Deep Brown bearish candles, and #E9DDC6 Bone Cream tabular numerals—fed directly by our normalized GeckoTerminal + Helius data engine.
    
    What Remains Embedded / External: Nothing is embedded. External links are strictly explicit, user-clicked outbound anchors: TRADE PROVADIA (opens https://pump.fun/coin/9UE6NStA9pRZ5xagrK1FNy3vybmQVL2VaKB7BNpvpump in a new tab with rel="noopener noreferrer") and Solscan transaction/contract inspection links.
    
    2. REAL-TIME DATA ENGINE CONTRACTS & STALENESS STATE MACHINE
    A) Endpoints & Polling Cadence
    
    Pool Telemetry & OHLCV Candlesticks (GeckoTerminal Public API v2):
    
    Pool Summary Endpoint: GET https://api.geckoterminal.com/api/v2/networks/solana/pools/2fvtfwCco71J8XePws7yREZ3569U2GxU4FYHE2H8oxDY
    
    Extracts: base_token_price_usd, base_token_price_native_currency (SOL), volume_usd.h24, reserve_in_usd (liquidity), and transactions.m15 / transactions.h1 swap counts.
    
    OHLCV Candle Endpoint: GET https://api.geckoterminal.com/api/v2/networks/solana/pools/2fvtfwCco71J8XePws7yREZ3569U2GxU4FYHE2H8oxDY/ohlcv/{timeframe}?aggregate={agg}&limit=60
    
    Supported Timeframes: 15M (minute, aggregate=15) · 1H (hour, aggregate=1) · 4H (hour, aggregate=4) · 1D (day, aggregate=1).
    
    Polling Cadence: 15,000 ms (15s) while tab document.visibilityState === "visible"; pauses cleanly when tab is hidden and fires an immediate refresh on tab focus.
    
    On-Chain Swap Pulse & Read-Only Wallet Holdings (Helius Solana RPC):
    
    Recent Activity Check: POST to house Helius RPC proxy/endpoint (getSignaturesForAddress on 9UE6NStA9pRZ5xagrK1FNy3vybmQVL2VaKB7BNpvpump, limit: 10), polled every 15,000 ms (15s) in lockstep with pool telemetry.
    
    Connected Wallet Read-Only Check (Triggered Only When Visitor Connects Phantom/Solflare): getTokenAccountsByOwner for mint 9UE6NStA9pRZ5xagrK1FNy3vybmQVL2VaKB7BNpvpump (plus Metaplex Core Genesis collection query once Mainnet deploys). Zero transaction-signing methods (signTransaction, sendTransaction) are ever requested or imported.
    
    B) Backoff, Caching & Staleness Thresholds
    
    Client Cache (sessionStorage key provadia_pulse_cache_v1): Stores the last verified { pool, ohlcvByTf, latestSig, latestBlockTimeUtc, fetchedAtUtc } payload so page reloads render verified figures in 0 ms with 0.00 CLS while the fresh fetch runs.
    
    Exponential Backoff on Error / HTTP 429: 15s → 30s → 60s → 120s max interval, resetting to 15s on the first 200 OK response.
    
    Exact State-Flip Thresholds (Deterministic State Machine):
    
    STATE: LIVE: Last successful fetch age < 60 seconds (now - fetchedAtUtc < 60,000 ms) AND at least 1 verified swap occurred within the trailing 15 minutes (now - latestBlockTimeUtc <= 900,000 ms).
    
    STATE: QUIET: Last successful fetch age < 60 seconds (feeds healthy), AND 0 verified swaps occurred within the trailing 15 minutes (now - latestBlockTimeUtc > 900,000 ms).
    
    STATE: DELAYED / DISCONNECTED: Last successful fetch age ≥ 120 seconds (now - fetchedAtUtc >= 120,000 ms), OR ≥ 2 consecutive network/API errors occurred (note: between 60s and 119s during a normal retry, the prior LIVE/QUIET badge holds with an updated UPDATED Xs AGO counter before flipping to DELAYED at 120s).
    
    3. EXACT ON-PAGE COPY FOR THE THREE HONEST STATES
    
    Rendered inside the persistent Pulse Status Pill (top-left of telemetry strip, 1px border, #141210 fill, tabular monospace timestamp):
    
    ● LIVE (#E4C65B pulsing dot · 1px solid #C9A227 border):
    
    Badge: ● LIVE · POOL VERIFIED
    
    Status Line: Feeds active · Last swap {X}m ago · Updated {Y}s ago
    
    ◐ QUIET (#C9A227 steady dot · 1px solid #30251B border):
    
    Badge: ◐ QUIET MARKET · FEEDS CONNECTED
    
    Status Line: No swaps in the past 15 minutes — showing last verified pool state · Updated {Y}s ago
    
    Visual Rule: Zero simulated particles or fake pulse animations fire while QUIET.
    
    ○ DELAYED / DISCONNECTED (#E9DDC6 muted dot · 1px solid #30251B border):
    
    Badge: ○ DATA DELAYED · RECONNECTING
    
    Status Line: Live feed interrupted — showing last verified snapshot from {HH:MM UTC} · Retrying automatically
    
    Visual Rule: Chart candles dim to 45% opacity with an explicit "SNAPSHOT" watermark tag; zero live-pulse claims shown.
    
    4. SHELL ANATOMY IN SLICE 1 (WHAT SHIPS NOW VS. SLICES 2 & 3)
    
    To deliver a rock-solid, zero-regression instrument first, Slice 1 ships the Dual-Mode Observatory Shell with honest boundaries between Slice 1 and Slices 2–3:
    
    What Ships in Slice 1 (Live & Functional)
    
    Top Persistent Navigation & Return Anchor: ← RETURN TO THE COIN (/), Door 03 · The Pulse of PROVADIA, and the Pulse Status Pill (LIVE / QUIET / DELAYED).
    
    Primary Interactive Stage — Dual-Mode Toggle ([ FUNCTIONAL CHART ] | [ OBSERVATORY PREVIEW ]):
    
    Default Active View in Slice 1 — Precision Functional Chart (Lightweight Charts): Full-width (max-width: 1120px), 360px height on mobile / 440px on desktop, #141210 canvas, #C9A227 / #30251B candlesticks, 15M / 1H / 4H / 1D timeframe selector, crosshair price/time readout, and an accessible screen-reader <table class="sr-only"> of the latest OHLCV candles.
    
    Secondary View in Slice 1 — Static / Reduced-Motion Observatory Stage: Displays the canonical market-published PROVADIA coin artwork (existing verified WebGL/high-res coin hero) centered inside the three concentric astrolabe rings with 470 unlit specimen nodes—clearly badged OBSERVATORY STAGE · SLICE 1 SHELL (3D CANDLE RIBBON & SWAP PARTICLES IN SLICE 2) so nothing is over-claimed before Slice 2 builds.
    
    Live Telemetry Strip (4 Verified Metrics, Tabular Numerals):
    
    PRICE (USD) · PRICE (SOL) · 24H VOLUME · POOL LIQUIDITY + expandable contract copy pill (9UE6NStA9pRZ5xagrK1FNy3vybmQVL2VaKB7BNpvpump · 1B FIXED SUPPLY · MINT/FREEZE NONE).
    
    Genesis Constellation Specimen Strip (SPECIMEN · 0 / 470 MINTED):
    
    Compact architectural strip directly beneath the chart showing the 470-Position Constellation Blueprint in honest Specimen State:
    
    Eyebrow: GENESIS CONSTELLATION · SPECIMEN STATE
    
    Counter: 0 / 470 MINTED — MAINNET SEALED UNTIL DEVNET REHEARSAL PASSES & FOUNDER DEPLOYS
    
    Interactive Serial Inspector (#001 – #470): Visitors can tap any sample node or enter a number 1–470 to inspect the slot's constitutional specification ("Unminted Specimen — lights permanently only when its real Metaplex Core NFT is minted on-chain; carries zero gold redemption, yield, or extra voting rights").
    
    Always-Visible Action Dock & Verbatim Honesty Sentence (z-index: 40, Never Obscured):
    
    CONNECT WALLET button: Connects Phantom / Solflare (window.solana / Wallet Standard) in strictly read-only mode, displaying the visitor's abbreviated public key (7xK9…3mPq), their verified PROVADIA token balance (0 or actual balance), and 0 / 470 Genesis Collectibles Held, plus a 1-tap DISCONNECT control.
    
    TRADE PROVADIA button: High-contrast #C9A227 border / #141210 fill button opening pump.fun directly in a new tab.
    
    Verbatim Honesty Sentence (Pinned Directly Beneath Buttons): PROVADIA is a place, not an investment. Holding it names you a Bricklayer in the town registry and gives you a vote on the Wall's fate — and nothing else: no redemption, no yield, no rights, no expected return.
    
    What Is Deferred to Slices 2 & 3
    
    Slice 2: Full Three.js 3D curved candlestick ribbon, real-swap directional golden particle emitter, and pulse-entrance-v1 Flow threshold film.
    
    Slice 3: Interactive 3D 470-node InstancedMesh constellation orbital flight, live Metaplex Core indexing (unlocked only when Mainnet deploys), and wallet-owned star summoning.
    
    5. MOBILE BUDGETS & GATE 1 PROOF BAR (BEFORE SLICE 2 OPENS)
    Strict Mobile & CWV Budgets (Slice 1)
    
    Total Initial JS + Lightweight Charts Payload: ≤ 95 KB gzipped (leaving 70 KB headroom inside the 165 KB ceiling for Slice 2's Three.js layer).
    
    Total Initial Page Weight (HTML + CSS + JS + Coin Hero WebP): ≤ 340 KB on mobile.
    
    Core Web Vitals: Mobile LCP ≤ 1.8s, INP < 100 ms, CLS 0.00 (chart container and telemetry cards have fixed explicit min-height skeletons so async data arrival causes zero layout shift).
    
    Gate 1 Proof Bar (All 6 Checks Required Before Slice 2 Opens)
    
    Third-Party Embed Removal Audit: Automated DOM check confirms document.querySelectorAll('iframe').length === 0 on /coin/ and zero DexScreener URLs exist anywhere in source or DOM.
    
    Real Pool Data Verification (Phone 375px + Desktop 1440px): Live fetch against 2fvtfwCco71J8XePws7yREZ3569U2GxU4FYHE2H8oxDY populates real price, volume, liquidity, and 15M/1H/4H/1D candlesticks cleanly with 0.00 CLS.
    
    Simulated Disconnect & Quiet-Market Test: Playwright/probe intercepts API responses to verify all three states (LIVE → QUIET on >15m last swap → DELAYED / DISCONNECTED on 503 / 120s age) render their exact required copy and dim candles cleanly without crashing.
    
    Read-Only Wallet & Trade Button Persistence: Automated check confirms CONNECT WALLET and TRADE PROVADIA remain visible, unobstructed, and clickable across every state (LIVE, QUIET, DELAYED, and OBSERVATORY PREVIEW), and wallet connect invokes zero signature/transaction prompts.
    
    Genesis Specimen Honesty Check: Confirms 0 / 470 MINTED and SPECIMEN labels display accurately with zero fabricated owners, prices, or live-mint claims.
    
    Verbatim Honesty Sentence & Accessibility Check: Confirms exact character-for-character match of the Honesty Sentence and verifies keyboard + screen-reader access to the OHLCV data table.
    
    ——— END OF ANSWER ———
    
    Headline for the desk: Pulse Slice 1 (pulse-slice1-data-shell) — the Live Data Engine + Dual-Mode Shell on /coin/. The third-party GeckoTerminal iframe embed is retired permanently (0 iframes, 0 trackers); it is replaced by the sovereign PROVADIA Functional Chart Instrument (Lightweight Charts, <45 KB gzipped, self-hosted), with nothing embedded — only explicit outbound links (TRADE PROVADIA to pump.fun, Solscan inspection). Data contracts: GeckoTerminal pool summary + OHLCV endpoints for pool 2fvtfwCco71J8XePws7yREZ3569U2GxU4FYHE2H8oxDY (15M/1H/4H/1D, limit 60), 15s polling while visible, pause when hidden, immediate refresh on focus; Helius getSignaturesForAddress (limit 10) every 15s; wallet read-only check only on connect (zero signing methods ever requested). Cache in sessionStorage (provadia_pulse_cache_v1); backoff 15s→30s→60s→120s. Deterministic state flips: LIVE (fetch <60s AND ≥1 swap in trailing 15m), QUIET (fetch <60s AND 0 swaps in 15m), DELAYED/DISCONNECTED (fetch ≥120s OR ≥2 consecutive errors; prior badge holds 60–119s). Exact state copy for all three states, with QUIET firing zero simulated particles and DELAYED dimming candles to 45% with a SNAPSHOT watermark. Slice 1 ships: dual-mode toggle (Functional Chart default; static Observatory Preview badged SLICE 1 SHELL), 4-metric telemetry strip, Genesis Specimen Strip (0/470 MINTED, serial inspector #001–#470), always-visible CONNECT WALLET (read-only) + TRADE PROVADIA dock and verbatim Honesty Sentence. Deferred: Slice 2 (Three.js candlestick ribbon, particle emitter, pulse-entrance-v1); Slice 3 (3D 470-node constellation flight, live Metaplex indexing, wallet summoning). Budgets: JS + charts ≤95 KB gzipped, total page ≤340 KB mobile, LCP ≤1.8s, INP <100 ms, CLS 0.00. Gate 1 proof bar: 6 checks (zero iframes/DexScreener; real pool data on 375px + 1440px; simulated disconnect + quiet-market test; button persistence + zero signature prompts; specimen honesty; verbatim Honesty Sentence + accessibility). Nothing builds from this document; the founder judges.
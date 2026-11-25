# GEMINI #97 — RECONCILIATION + PERMANENT INFRASTRUCTURE DESIGN: THE PROVADIA GATEHOUSE (RPC GATEWAY) + EXTENSION — 2026-11-24
# Source: Gemini session gemini.google.com/app/46ea9941c6a01756 (onejobkits@gmail.com, Ultra)
# Dispatched 2026-11-24 18:25 CT · Answer landed 18:25–18:28 CT (browser task 9e230994-fbd3-56c6-91e8-583fb334f4f9, harness-measured, 3m)
# The #97 Extension (gatehouse per-institution permissions, ~18:24 CT) was forwarded to the same browser task as an update and is folded into this answer.
# Verbatim answer below, followed by the captain's adjudication.

---

HOUSE BUILD PERCENTAGE: ~5% (measured strictly against the founder's 2026-11-24 10:24 CT 100% ruler; moves only on verified-complete, customer-eye-proven, Surfer-complete pieces)

ASSIGNMENT #97 — RECONCILIATION & PERMANENT INFRASTRUCTURE DESIGN: THE PROVADIA GATEHOUSE (RPC GATEWAY) + EXTENSION

Verification Boundary Stated Plainly (VERIFIED vs. INFERRED):

VERIFIED: Current November 2026 published pricing, free-tier quotas, and rate limits for Helius ($0/mo permanent free tier: 1M credits/mo, 10 RPS, 1 sendTransaction/sec, 5 getProgramAccounts/sec at 10 credits/call; $49/mo Developer tier: 10M credits/mo, 50 RPS, $5/1M overage), QuickNode ($0 one-month trial only — 10M API credits, 15 RPS, 30 credits per standard Solana RPC call ≈ 333,000 calls, no permanent free tier; $49/mo Build tier: 80M credits/mo, 50 RPS, archive access included across plans), and Alchemy ($0/mo permanent free tier: 30M Compute Units/mo, 300 CU/s / 15 RPS; Pay-As-You-Go $0.40–$0.52/1M CUs, dropping the free 30M CU allowance upon switching to PAYG); our house assets (Hostinger VPS srv2183584.hstgr.cloud KVM 1 in Boston with root SSH access, Cloudflare DNS for provadiacoin.com, static GitHub Pages site at provadiacoin.com/anchor/); and our frozen Night Brick 3-instruction transaction standard (#75).

INFERRED: Exact VPS deployment execution timing (~60–90 minutes for Nginx + Node/Fastify reverse-proxy + Cloudflare DNS A-record + Let's Encrypt TLS + 10-item gate suite) and exact future CU weights per Solana method on Alchemy (which vary by RPC method).

(1) Point-by-Point Reconciliation With ChatGPT's Challenge (Where He Is Right vs. Role of Amendment 5)

ChatGPT's core architectural insight—"Do not merely replace one public RPC URL with another and declare the problem solved" and "One shared gatehouse, but not one unrestricted gateway"—is 100% right for permanent civilization infrastructure, and I endorse his 10-point architecture and 10-item verification list whole.

Point-by-Point Response to His 10 Requirements

Same-Origin / First-Party PROVADIA Gatehouse (rpc.provadiacoin.com): AGREED. Routing browser traffic through https://rpc.provadiacoin.com (hosted on our Hostinger VPS srv2183584.hstgr.cloud behind Cloudflare DNS) eliminates cross-origin browser Origin/Referer WAF blocks (403), keeps provider API keys completely off GitHub Pages, and gives PROVADIA a single, auditable control point for every institution (Night Brick, Mint, Keeper, Sentinel, Guardian).

Provider Evaluation (Helius, QuickNode, Alchemy) + Primary & Independent Fallback: AGREED (detailed in Section 2 below: Helius Free primary + Alchemy Free independent fallback).

Server-Side Key Custody (Zero Keys in Browser Code): AGREED. Provider keys live strictly in /etc/provadia-gatehouse/.env (chmod 600, root-owned) on the Hostinger VPS—never in GitHub Pages HTML/JS or Git commits.

Strict Method Allowlist, Rate Limits & Request Validation: AGREED. Enforced per institution route (Section 3).

Fresh Blockhash & lastValidBlockHeight Immediately Before Construction + Frozen 3-Instruction Shape + Phantom-Only Signing + Fail-Closed: AGREED (100% aligned with #75 and #96).

Signature Reconciliation Before Any Retry (Duplicate-Anchor Prevention): AGREED — CRITICAL ADDITION. If sendRawTransaction times out or returns an uncertain network response after the founder signs in Phantom, the page and gatehouse must check getSignatureStatuses([signedTxSig]) before allowing a new blockhash/re-sign—preventing an accidental duplicate anchor if the first signed transaction already landed.

Where Amendment 5's Keyless Public RPC Chain Still Earns a Place (And Where It Is Struck)

Struck from Browser Client Source: Amendment 5's client-side list of third-party public RPC URLs (publicnode, drpc, 1rpc) is removed from anchor.html—the browser talks only to our own gatehouse (https://rpc.provadiacoin.com/v1/anchor).

Retained Inside the VPS Gatehouse Only as Tier-3 Emergency Failover (Optional, Strictly Read-Only / Broadcast-Only Behind Primary + Fallback): Inside the VPS gatehouse backend (never in the browser), we run Primary (Helius Free) → Independent Fallback (Alchemy Free), with keyless solana-rpc.publicnode.com permitted solely as a read-only emergency upstream if both keyed providers suffer a simultaneous regional outage.

(2) Extended Provider Evaluation (Helius vs. QuickNode vs. Alchemy)

Evaluated across all five extended criteria (reliability, rate limits, free-tier restrictions, historical data availability, and future operating costs):

Criterion | Helius (Solana-Native Specialist) | Alchemy (Multi-Chain Infrastructure) | QuickNode (Enterprise Multi-Chain)
Free Tier (Forever Free vs. Trial) | Permanent Free Tier ($0/mo): 1,000,000 credits/mo (1 credit per standard RPC call; 10 credits per getProgramAccounts). | Permanent Free Tier ($0/mo): 30,000,000 Compute Units/mo (CU-weighted by method). | NO Permanent Free Tier: $0 is a 1-month trial only (10M credits ≈ 333,000 Solana calls at 30 credits/call), then forces $49/mo.
Rate Limits (Free Tier) | 10 RPC RPS · 1 sendTransaction/sec · 5 getProgramAccounts/sec · 2 DAS RPS. | 300 CU/s (~15 RPS). | 15 RPS (during 1-month trial only).
Historical / Archive Data Availability | Available across plans (archive queries charged at higher credit weight, e.g., 50 cr/call; getTransaction batch up to 100 items; beta historical account endpoints included). | Available (CU-weighted) across plans. | Included across paid plans ($49/mo+).
Future Operating Cost (Scaling Trajectory) | Smooth & predictable: $0/mo → $49/mo Developer (10M credits, 50 RPS, staked connections on paid tiers, $5/1M overage). | Pay-As-You-Go ($0 base + $0.40–$0.52/1M CUs), but switching off Free drops the free 30M CU allowance (billed from CU #1). | Steep cliff after Day 30: Forced $49/mo Build (80M credits = ~2.66M calls at 30 cr/call), then $249/mo Accelerate.
Solana Fit & Reliability | Built exclusively for Solana; highest Solana method depth (DAS, parsed transactions, priority-fee & staked routing on paid tiers). | Strong independent infrastructure stack (zero shared upstream dependency with Helius), ideal as a true second provider. | High reliability (SOC 2), but 30-day free expiry violates "free today without forced Day-31 spend".

Final Provider Selection (Zero Spend Today · Smooth Growth Path)

PRIMARY PROVIDER: Helius (Free Tier — $0/mo) — permanent $0/mo tier, 1M standard calls/month (enough for >10,000 anchor/verification sessions per month), Solana-native reliability, and clean $49/mo upgrade path only when revenue justifies it.

INDEPENDENT FALLBACK PROVIDER: Alchemy (Free Tier — $0/mo) — completely independent infrastructure stack from Helius, permanent $0/mo tier (30M CUs/mo, 15 RPS), ensuring zero single-provider failure mode.

QuickNode Ruling: Rejected for Free-Tier Gatehouse use because its free plan expires after 30 days.

(3) Permanent Shared Gatehouse Architecture (srv2183584.hstgr.cloud + rpc.provadiacoin.com)

A. Domain, TLS & Hard Security Invariants

Endpoint Subdomain: https://rpc.provadiacoin.com (Cloudflare DNS A record → srv2183584.hstgr.cloud, TLS 1.3 enforced, strict CORS Access-Control-Allow-Origin: https://provadiacoin.com).

ABSOLUTE HARD RULE (No Keys · No Signing Authority):

The gatehouse is a stateless, non-custodial JSON-RPC policy proxy.

It NEVER generates, stores, imports, or accesses any private key, mnemonic, or seed phrase, and holds zero authority to construct or sign transactions on behalf of the founder or any institution. All signing remains 100% inside the founder's Phantom wallet (signTransaction).

B. Per-Institution Permission Matrix ("One Shared Gatehouse, Not One Unrestricted Gateway")

Each PROVADIA institution connects to its own scoped path (https://rpc.provadiacoin.com/v1/<institution>), enforced by strict method allowlists, payload inspectors, and per-IP/per-route rate limits:

Institution Route | Refined Role & Operational Scope | Exact Allowlisted JSON-RPC Methods (All Other Methods → 403 Blocked) | Additional Payload & Rate Fences
/v1/night-brick (Active First Specimen — /anchor/) | Day-Book anchor blockhash fetch, dry-run simulation, raw tx broadcast, and receipt/slot verification. | getLatestBlockhash; getBlockHeight; simulateTransaction; sendTransaction; getSignatureStatuses; getTransaction | sendTransaction & simulateTransaction inspect decoded wire bytes on the server before forwarding: rejects any tx unless instructions.length === 3, ix[0] === 030000000000000000, ix[1] === 0250340300, ix[2] is valid PROVADIA · DAYBOOK ROOT v1 Memo (133 B), and feePayer === ANCHOR. Rate limit: 10 req/min per IP (2 sendTransaction/min).
/v1/mint (Door 01 — The Living Mint) | Read-only mint/metadata verification and approved creation-receipt lookup (never holds mint authority keys). | getAccountInfo; getTokenSupply; getSignatureStatuses; getTransaction | Read-only (zero broadcast methods allowed until/unless a founder-ruled non-custodial flow is explicitly added). Rate limit: 30 req/min per IP.
/v1/keeper (Door 07 / Golden Wall — The Keeper) | Read-only custody vault balance/receipt verification and Day-Book anchor status checks. | getAccountInfo; getBalance; getSignaturesForAddress; getTransaction | Strictly read-only (zero sendTransaction). Rate limit: 30 req/min per IP.
/v1/sentinel (Blockchain Intelligence & FVR-12) | Read-only on-chain forensic inspection (authorities, supply, owner-aggregated accounts, transaction lineage). | getAccountInfo; getMultipleAccounts; getTokenSupply; getProgramAccounts (strictly capped: requires memcmp filter + dataSlice); getSignaturesForAddress; getTransaction | getProgramAccounts restricted to authenticated internal Sentinel worker token + ≤ 2 req/sec (preventing 10-credit Helius quota drain). Public browser requests limited to single-account reads (30 req/min).
/v1/guardian (Guardian Lens — Holder Security Inspection) | Read-only public address / token trap inspection (MintAuthority, FreezeAuthority, Token-2022 extensions, token accounts). | getAccountInfo; getMultipleAccounts; getTokenAccountsByOwner; getSignaturesForAddress | Strictly read-only (zero wallet connect, zero sendTransaction). Rate limit: 20 req/min per IP (burst 5).

C. Composition With Page Logic & Duplicate-Anchor Prevention

Single Client Origin + Server-Side Sticky Failover: anchor.html (Build: v5-gatehouse) points exclusively to https://rpc.provadiacoin.com/v1/night-brick. Behind that single origin, the VPS gatehouse routes to Primary (Helius) (3,500 ms timeout) and automatically fails over to Fallback (Alchemy) on HTTP 429/5xx/timeout, returning an X-Provadia-Upstream: helius|alchemy response header so the page telemetry badge displays which upstream served the call.

Pre-Broadcast Simulation + Double Fail-Closed Byte Assert: Both the browser (anchor.html) and the VPS gatehouse (before forwarding sendTransaction) verify the exact 3-instruction 5,000-lamport byte structure and run simulateTransaction (sigVerify: false pre-sign or sigVerify: true post-sign) before broadcast.

Duplicate-Anchor Prevention (Signature Reconciliation):

Immediately after Phantom's signTransaction() returns the signed transaction, anchor.html derives its base58 signature (bs58.encode(signedTx.signatures[0])) and persists { signature, memoText, lastValidBlockHeight, status: "SIGNED_UNCONFIRMED" } in sessionStorage + localStorage.

If sendTransaction encounters a network drop or uncertain status—or if the user clicks [ RE-ISSUE FRESH STAMP & SIGN ]—the page first queries getSignatureStatuses([savedSignature]) through /v1/night-brick:

If confirmationStatus is 'confirmed' or 'finalized' (err === null), it blocks any second sign and displays the landed receipt immediately (preventing duplicate anchors).

Only if status === null AND currentBlockHeight > lastValidBlockHeight (proven expired on-chain) does the page unlock the founder-tap [ RE-ISSUE FRESH STAMP & SIGN ] button.

(4) Mandatory 10-Item Verification Evidence Packet Before Founder Signs

Before the founder is asked to sign Attempt #6, the captain's gate harness must produce and file verifiable logs/screenshots for all 10 items from ChatGPT's checklist:

Actual Production-Origin Browser RPC Request: Live fetch() from https://provadiacoin.com/anchor/?v=5 (Origin: https://provadiacoin.com) to https://rpc.provadiacoin.com/v1/night-brick returning HTTP 200 (getLatestBlockhash) in < 1,500 ms with valid CORS headers.

Desktop Phantom Compatibility: Live desktop Phantom (signTransaction) test on devnet/staging twin showing clean wallet preview (0.000005 SOL network fee) and wire-byte return.

Mobile Phantom Compatibility: Live iPhone Phantom in-app browser test (?v=5, Cache-Control: no-store) confirming zero stale-cache loop and clean founder-tap button state.

Primary Provider Failure Simulation: Fault-injection test (blocking Helius upstream in gatehouse test mode) proving seamless failover to Alchemy in < 1s (X-Provadia-Upstream: alchemy) with zero user error.

Fallback Provider Verification: Independent health + getLatestBlockhash + simulateTransaction verification against Alchemy directly.

Blockhash Expiration Handling: Hold test past lastValidBlockHeight proving fail-closed abort (0 broadcast) and clean presentation of the founder-tap [ RE-ISSUE FRESH STAMP & SIGN ] button.

Transaction Simulation Without Broadcasting: simulateTransaction proof on mainnet bytes returning err: null, unitsConsumed <= 210,000, and 0 balance changes outside fee payer.

Exact Instruction & Fee Verification (9/9 Standard v1.1): Byte-level proof (3 instructions · ix[0] === 030000000000000000 · ix[1] === 0250340300 · ix[2] === exact 133-byte Memo · fee === 5,000 lamports · 0 inner instructions).

Duplicate Prevention Proof: Simulated uncertain broadcast response proving getSignatureStatuses reconciliation catches an already-landed signature and refuses to issue a second sign prompt.

No Exposed Credentials Audit: Automated grep + curl inspection of deployed provadiacoin.com/anchor/ HTML/JS bundles and HTTP headers proving zero Helius/Alchemy API keys, tokens, or secrets appear anywhere in client source.

(5) Honest Ruling on Timing (Tonight vs. Proper Foundation)

Plain, Honest Ruling: Do NOT rush a tonight attempt. Honor the founder's own stance ("no rush tonight — build the foundation correctly") and build the permanent rpc.provadiacoin.com Gatehouse directly rather than deploying Amendment 5 as a temporary patch.

Why This Is the Only Honest Choice:

Deploying Amendment 5 tonight only to replace it tomorrow creates two production deploys, two founder sign interruptions, and leaves all other institutions (Mint, Keeper, Sentinel, Guardian) without their shared gatehouse.

Our Hostinger VPS (srv2183584.hstgr.cloud) and Cloudflare DNS are already live and owned—standing up the Nginx + Node.js rpc.provadiacoin.com gatehouse with free-tier Helius (Primary) + Alchemy (Fallback) takes ~60–90 minutes of focused engineering, costs $0.00/mo, and permanently solves browser RPC access for every door and institution across PROVADIA on the very first deploy.

Sequence Locked: Founder authorizes the $0/mo Helius + Alchemy free-tier account setup & VPS gatehouse build → Captain builds & runs all 10 verification tests → ChatGPT & Gemini both inspect the 10-item evidence packet and sign CLEARED → Founder signs Night Brick Attempt #6 once on rock-solid permanent infrastructure.

---

# CAPTAIN'S ADJUDICATION — 2026-11-24 (watch run, on landing)

**SUSTAINED WHOLE with 3 marks — the reconciliation is COMPLETE and the disagreement is settled at Gemini's seat:**

- **ChatGPT's challenge SUSTAINED by Gemini whole:** the permanent same-origin PROVADIA Gatehouse (https://rpc.provadiacoin.com on the Hostinger VPS, Cloudflare DNS) is ADOPTED as the design of record for shared house RPC infrastructure, Night Brick as its first proving specimen. All 10 of ChatGPT's proposal points and all 10 mandatory re-verification items are endorsed and carried into the gate spec (Section 4). The hard rule is confirmed in the design: the gatehouse is a stateless non-custodial policy proxy — it never holds private keys/seeds and has zero signing authority; signing stays 100% in the founder's Phantom.
- **Amendment 5 disposition RULED:** the keyless public chain is STRUCK from browser client source (the browser talks only to the gatehouse); it survives ONLY inside the VPS gatehouse as an optional Tier-3 read-only emergency upstream (solana-rpc.publicnode.com) behind Helius → Alchemy, never in the page. The Amendment 5 DEPLOY remains HELD — it will not ship as an interim patch (see timing ruling).
- **Providers RULED (design):** PRIMARY Helius Free ($0/mo permanent, 1M credits/mo, 10 RPS) · INDEPENDENT FALLBACK Alchemy Free ($0/mo permanent, 30M CU/mo, ~15 RPS) · QuickNode REJECTED for the gatehouse (no permanent free tier — 30-day trial cliff violates the founder's "free today must not become prohibitively expensive tomorrow" criterion). Per-institution permission matrix ADOPTED (Section 3B): /v1/night-brick is the only route with sendTransaction, and only behind a server-side double byte-assert (3 instructions · ix[0]/ix[1] exact · 133-byte Memo · feePayer === ANCHOR); Mint/Keeper/Sentinel/Guardian routes are read-only with their named allowlists and rate fences; Sentinel's getProgramAccounts is worker-token-gated. Signature-reconciliation (getSignatureStatuses before any re-issue) ADOPTED as binding duplicate-anchor prevention.
- **Timing RULED — NO RUSH:** do NOT deploy Amendment 5 tonight and do NOT ask the founder to sign; build the Gatehouse directly. Sequence locked: (1) founder authorizes the $0/mo Helius + Alchemy free-tier account setup & the VPS gatehouse build → (2) captain builds and runs the full 10-item evidence packet → (3) ChatGPT + Gemini both inspect the packet and stamp CLEARED → (4) founder signs Attempt #6 once. **No step of this sequence is authorized by this ratification alone — the founder's authorization is the next gate.**
- **Mark 1 — NEEDS-CHECK (route naming, captain-ruled for the build spec):** Section 1 names the browser's sole endpoint https://rpc.provadiacoin.com/v1/anchor while Section 3's matrix and composition name /v1/night-brick. The captain rules /v1/night-brick governs (per-institution naming; /anchor/ remains the page route, not an RPC route) — the build spec reconciles to that single name before any code ships.
- **Mark 2 — evidence grade:** the provider pricing/quotas/rate limits are graded VERIFIED at Gemini's seat (his published-spec read); the captain has not independently re-priced them this run, and the verdict does not depend on their precision — the free-tier account setup itself will confirm them at creation, before any build depends on them. The ~60–90 minute build estimate and Alchemy CU weights stand INFERRED, as he graded them.
- **Mark 3:** House Build ~5% unchanged (#78 ruler — a design/reconciliation moves nothing; the percentage moves only when the Gatehouse is built, gated 10/10, and founder-judged in service).

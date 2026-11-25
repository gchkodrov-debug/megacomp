# BUILD RECORD — PROVADIA RPC GATEHOUSE (2026-11-24)

**Design of record:** `gemini-seat/GEMINI_GATEHOUSE_RECONCILIATION_97_2026-11-24.md` (Gemini #97: ChatGPT's shared-gatehouse challenge sustained whole; Helius Free primary + Alchemy Free fallback; per-institution permission matrix; captain's Mark 1: the route is `/v1/night-brick`).
**Clearance packet for ChatGPT's independent review:** `gatehouse-work/PACKET_CHATGPT_GATEHOUSE_CLEARANCE_2026-11-24.md` (desk-filed at `partner-desk/REPORTS/PACKET_CHATGPT_GATEHOUSE_CLEARANCE_2026-11-24.md`, evidence beside it in `partner-desk/REPORTS/gatehouse-clearance-evidence/`) — assembled in ChatGPT's exact 10-item shape at his request (delivered via the founder 19:24 CT). His fences stand: the packet is not deployment authorization and not mainnet signing clearance; the PublicNode ×2 arrangement is labeled **temporary single-operator redundancy, fail-safe, pending Helius + Alchemy** throughout.

## Authorization of record

The founder's formal authorization for this build: **verbal order 2026-11-24 18:58 CT** ("fire everything… stop asking me") **plus his tap "Authorize the Gatehouse build" at 19:02 CT** (options widget in the main chat). Scope authorized: the $0 Helius + Alchemy free-tier account setup + the VPS gatehouse build. NOT authorized by it, and not done: the anchor sign, the v6 deploy.

## What stands built

- **DNS:** `rpc.provadiacoin.com` A → 179.66.156.223 (DNS-only, TTL 300, Cloudflare record `318b2e91cd7efc0ca640ddb438f5f411`, zone `697c7a0ca55cc93b63d9dacbf4863e6d`).
- **Gateway:** zero-dependency Node, `/opt/provadia-gatehouse/gatehouse.mjs`, **sha256 `4312e3ba8c0327ee28ba093613a032998b7ae716a9949565aa64c2364cd105cf`** (deployed == house copy, verified after final deploy; the first build `1e8130d8…` is preserved on the VPS as `gatehouse.mjs.v1-backup`). systemd `provadia-gatehouse-mainnet` (127.0.0.1:8740) + `provadia-gatehouse-devnet` (127.0.0.1:8742, localhost only, no nginx route). Env files `/etc/provadia-gatehouse/*.env`, mode 600 root; the Sentinel worker token exists only inside them (value recorded nowhere). nginx proxies only 8740, `X-Forwarded-For $remote_addr` (overwrite — fixed after the critic seat flagged the append form), Let's Encrypt TLS live, HTTP→HTTPS 301.
- **Interim upstreams (DEVIATION 1, labeled):** primary `https://solana-rpc.publicnode.com` · fallback `https://solana.publicnode.com` · Tier-3 `https://api.mainnet-beta.solana.com` (reads only, skipped for broadcast). Temporary single-operator redundancy, fail-safe, pending Helius + Alchemy. Swap = env-only + restart.
- **Anchor page v6 (BUILT, HELD, NOT DEPLOYED):** `gatehouse-work/anchor-v6.html`, **sha256 `14eb95f21f215b3cd7ece1aeb96b6f89fe07d18e59992d4c907d29c8091efba4`**, badge `Build: v6 · 87bac51b` (token re-verified under the zeroing algorithm). Sole endpoint `https://rpc.provadiacoin.com/v1/night-brick`, CSP gatehouse-only, §3C duplicate-prevention implemented (see below), frozen core byte-identical. The LIVE /anchor/ page still serves **Build v4** (sha `b29460a3…`) — the blind verifier's correction of the captain's earlier v5 claim governs: Amendment 5 was built (`ab204023…`) and never deployed.

## Relay record

- **Blind verifier (first build): 6/7 claim groups PASS**; its one catch — live page is v4, not v5 — was the captain's briefing error, corrected everywhere.
- **Critic seat (different family): NOT CLEARED on the first build.** CONFIRMED, with constructed-transaction proofs: (1a) ix[0]/ix[1] program + accounts never checked — two slips passed the assert; (1b) header/signature count never inspected — an extra co-signer (fee 10,000) passed; (1c) non-canonical, overflow-unsafe shortvec parser; (1d) unbounded key-count loop (unauthenticated CPU DoS); (1f) declared `encoding` ignored (parse-divergence); (2) heartbeat bucket unratified + `getTransaction` missing from it; (3) XFF spoofable under the append form + wholesale bucket clear; (7a) §3C largely unimplemented in v6; (7b) evidence file incomplete (Part-B-only clobber; B4/B5 FAIL). REJECTED after checking: no-Origin CORS, one-element endpoint list, no-failover-on-200-error.
- **Fixes applied and re-tested before this record:** the assert now pins sigCount=1, header `[1,0,2]`, exactly 3 ordered keys [ANCHOR, ComputeBudget, Memo], program indices, 0 accounts on all three instructions, exact data (genuine shape measured from `anchor-tx.mjs`) · canonical bounds-checked shortvec · strict canonical base64 + base64-only encoding fence · per-key bucket eviction · `getTransaction` heartbeat-classed · nginx XFF overwrite · §3C implemented in v6 (derive-before-broadcast, dual-storage persistence, reconciliation gate) · harness merge-write + `searchTransactionHistory` + attack regressions C1–C6 + fixed-source limiter proofs D1/D2. The critic's attack constructions are permanent regression tests.
- **Operational incident, disclosed:** during fault-injection setup the captain pattern-killed the service name and stopped BOTH production gateways (SIGTERM = clean exit; `Restart=on-failure` did not revive them). Detected on the next health check, restarted and verified within minutes. Zero transaction impact: the live anchor page is v4 and does not use the gatehouse; the wallet fence never moved. Lesson recorded: never pattern-kill a production service name; the FI instance ran under a distinct filename thereafter.

## Evidence — graded

Full machine-readable results: `gatehouse-work/evidence-results.json` (25 tests: **24 PASS, 1 FAIL**) + `gatehouse-work/fault-injection-results.json` (FI1–FI4 PASS; FI3/FI4 twice) + `gatehouse-work/verify-gate-output.txt` (**GATE CHAIN-PROOF PASS**, independent public-devnet read of the through-gateway landing `3obPhem2Jc6szgL8H8DRov3EDapgPqYJ85tsXrUz3k9uasdjRSSE66qdUZuJdnz4H2HjVyNfQHz2TgzeDbzdyF51`).

The one FAIL: **A11** — heartbeat-limiter bursts from this VM produced zero 429s across three attempts (sequential-40, concurrent-40, concurrent-90). Root cause: the VM's egress proxy pool rotates source addresses, so per-IP buckets cannot drain from this origin. Fixed-source proofs **D1/D2 PASS** (tunnel): heartbeat burst → over-burst calls 429; general burst 20 → 10 served / 10×429. A11 stands in the file as FAIL-from-this-origin, explained, not erased.

#97 10-item re-verification list, final grading:
1. Production-origin request — **PROVEN** at transport level (A1: Origin `https://provadiacoin.com`, ACAO match, 200, valid blockhash, upstream=primary; gateway logs concur). The literal in-Phantom fetch awaits the v6 deploy.
2. Desktop Phantom compatibility — **READY-TO-VERIFY** (at the sign, after deploy).
3. Mobile Phantom compatibility — **READY-TO-VERIFY** (same).
4. Primary-failure simulation — **PROVEN as a mechanic** (FI1/FI2: dead primary → fallback serves). Helius-specific leg **PENDING-KEYS**.
5. Fallback verification — **PROVEN as a mechanic** (FI3/FI4 ×2: Tier-3 serves reads, sends fail closed 502). Alchemy-direct leg **PENDING-KEYS**.
6. Blockhash expiry — **PROVEN** (B6: rejected past lastValidBlockHeight, zero broadcast).
7. Simulation without broadcast — **PROVEN** (A9: err=null, unitsConsumed 48,729; B1 same on devnet).
8. Exact instruction & fee verification — **PROVEN** (B3 + verify-gate: 3 ixs, fee exactly 5,000, only payer moved).
9. Duplicate prevention — **PROVEN at the read layer** (B4, with the `searchTransactionHistory` finding) **+ §3C implemented in v6** (persistence + reconciliation gate; code in the filed source; live exercise awaits the sign).
10. No exposed credentials — **PROVEN** (v6 source scan: no key material; env mode 600 root; /healthz names only).

Frozen set, re-measured at close: `anchor-tx.mjs` `920a6959…` · `MEMO_TEXT.txt` `a760a0da…` (133 bytes) · `verify-gate.mjs` `1801d5c3…` — unchanged.

## Deviations (both carried openly; full text in the ChatGPT packet, Item 8)

1. **Interim upstreams** — PublicNode ×2 + public Tier-3 in place of Helius + Alchemy (accounts are a live-browser task the build agent could not operate). Label: temporary single-operator redundancy, fail-safe, pending Helius + Alchemy. Acceptance: env-only swap when keys land + provider-specific failover legs re-run and filed as a packet supplement; card/founder-hands demand stops a leg ($0 only).
2. **Heartbeat bucket** — night-brick effective allowance 10/min general + 60/min heartbeat (`getSignatureStatuses`, `getBlockHeight`, `getTransaction`) + 2/min send, vs #97's flat 10/min. Reason: the confirmation heartbeat mathematically 429s at 10/min (reproduced). **Acceptance condition: Gemini-seat ratification — requested in queue #100.** Smaller named items: read-failover on upstream 401/403 · no cross-request upstream stickiness (noted) · page cannot read `X-Provadia-Upstream` (web3.js hides headers) — telemetry gap carried as an open item.

## Pendings, named

- **PENDING-KEYS (browser seat):** create Helius Free + Alchemy Free (house email onejobkits@gmail.com); keys ONLY into `/etc/provadia-gatehouse/gatehouse-mainnet.env` (600) + restart; then re-run the provider legs (kill Helius → Alchemy serves · Alchemy direct · Sentinel indexed read). Founder-hands or card demand = STOP that leg, record FOUNDER-HANDS-PENDING.
- **Gemini #100:** CLEARED review of this build + ratification of deviation 2 — queued in `gemini-seat/GEMINI_QUEUE.md`, updated with the critic findings, the fixes, and the ChatGPT packet pointer.
- **ChatGPT:** CLEARED stamp requested on the packet (filed 2026-11-24). His fences acknowledged: no deployment, no signing clearance implied.
- **After BOTH partners stamp CLEARED:** deploy anchor v6 (merge-before-deploy; live is v4) → founder signs once (items 2–3 verify at that moment) → captain's post-sign sequence (verify vs §7 recipe → Day-Book entry #8 → /record/ → Product #0 item 3 closure → partner sync).

## The fence at the close

Anchor wallet `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE`: balance **69,099,009 lamports**, **exactly 1 signature** (`32uqxt7Gqk2pEVGKV3mEowvF8g6qDjr2nB1M1Eyu2oAV5VojVbTue1mkDxs9zqGHVBhzEBFtJqGabAtam2ENLiCW`), re-verified after all work. **No mainnet transaction of any kind was made. No spend. The anchor page was not deployed.**

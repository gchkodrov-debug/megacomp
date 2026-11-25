# PACKET — GATEHOUSE CLEARANCE EVIDENCE FOR CHATGPT'S INDEPENDENT REVIEW

**Filed:** 2026-11-24 (America/Chicago) · **From:** the captain's build seat, via the Partner Desk
**Subject:** PROVADIA RPC Gatehouse (`https://rpc.provadiacoin.com`) — engineering evidence for ChatGPT's independent clearance stamp on the reconciled design of record (Gemini #97, `GEMINI_GATEHOUSE_RECONCILIATION_97_2026-11-24.md`).

**Fences, restated in ChatGPT's own terms and accepted as binding on this packet:**
- This packet is **NOT** deployment authorization and **NOT** mainnet signing clearance. It requests verification of the agreed architecture only.
- The current upstream arrangement (PublicNode ×2 + a public Tier-3) is classified throughout as **temporary single-operator redundancy, fail-safe, pending Helius + Alchemy** — never as completed production redundancy.
- No new architectural requirement is introduced here; nothing was restarted or redesigned in response to the clearance request.

**Authorization of record for the build itself:** founder's verbal order 2026-11-24 18:58 CT ("fire everything… stop asking me") + his formal tap "Authorize the Gatehouse build" at 19:02 CT. Scope: $0 free-tier setup + the VPS gatehouse build. The anchor sign and the v6 deploy were NOT authorized and have NOT happened: the live /anchor/ page still serves Build v4, and the anchor wallet still shows exactly **1 signature** (re-verified at the close of this packet's work — see the fence line at the end).

**Evidence files filed beside this packet** (Partner Desk `REPORTS/gatehouse-clearance-evidence/`):
`anchor-v6.html` · `gatehouse.mjs` · `evidence-results.json` (25 graded tests) · `fault-injection-results.json` · `verify-gate-output.txt` · `nginx-rpc.provadiacoin.com.conf`

---

## Item 1 — Anchor v6 source code and exact build revision

- File: `anchor-v6.html` (beside this packet, byte-identical to the house copy).
- **SHA-256: `14eb95f21f215b3cd7ece1aeb96b6f89fe07d18e59992d4c907d29c8091efba4`**
- **Badge: `Build: v6 · 87bac51b`** — the 8-hex token is the first 8 hex of the SHA-256 of the file with the token itself zeroed (`00000000`); re-computed and verified after the final edit, so the badge cannot drift from the bytes it labels.
- Sole RPC endpoint in code: `const RPC_ENDPOINTS = ['https://rpc.provadiacoin.com/v1/night-brick'];` — Content-Security-Policy `connect-src https://rpc.provadiacoin.com` means even a future code regression toward a public endpoint is CSP-blocked. Public endpoints survive only in historical comments and in the Solscan *link* (not an RPC call).
- Revision history, honestly: the first v6 build (sha `78fe5cf6…`, badge token `098a5b74`) was found by the relay critic seat to be missing design §3C (see Item 5). The filed revision adds §3C and nothing else of substance; the frozen core (Item 3) is untouched.
- **Status: BUILT AND HELD. NOT DEPLOYED.** Deployment waits for both partners' CLEARED stamps.

## Item 2 — Gatehouse implementation and server-side transaction validation logic

- File: `gatehouse.mjs` (beside this packet) — zero-dependency Node (built-ins only), **SHA-256 `4312e3ba8c0327ee28ba093613a032998b7ae716a9949565aa64c2364cd105cf`**, deployed copy on the VPS verified byte-identical to this file after the final deploy.
- Service shape: systemd units `provadia-gatehouse-mainnet` (127.0.0.1:8740, the only one nginx proxies, behind Let's Encrypt TLS at `rpc.provadiacoin.com`) and `provadia-gatehouse-devnet` (127.0.0.1:8742, localhost only). The gatehouse is a stateless policy proxy: **it never holds keys and never signs** — there is no key generation, import, or signing code path in the file.
- Routes per the #97 matrix (captain's Mark 1: the route is `/v1/night-brick`): night-brick is the ONLY route permitting `sendTransaction`; mint/keeper/sentinel/guardian are read-only with named method allowlists; Sentinel `getProgramAccounts` additionally requires the worker token header + a memcmp filter + a dataSlice (proven live: with token+fences the request passes and the upstream answers; without dataSlice the gateway itself returns 400; without token, 403).
- **Server-side transaction validation (the double byte-assert), as hardened after the relay critic seat PROVED two slips in the first build** (an arbitrary program wearing ix[0]'s exact data with the anchor key attached passed; an extra co-signer silently doubling the fee passed). The assert now pins the WHOLE compiled shape of the genuine transaction, measured from the house builder:
  - exactly 1 signature · message header exactly `[1, 0, 2]` (1 signer / 0 readonly-signed / 2 readonly-unsigned — the header IS part of the fee proof)
  - exactly 3 account keys, in order: `[ANCHOR 6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE, ComputeBudget111111111111111111111111111111, MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr]`
  - ix[0] = ComputeBudget program, **0 accounts**, data exactly `030000000000000000` (SetComputeUnitPrice 0) · ix[1] = ComputeBudget program, **0 accounts**, data exactly `0250340300` (SetComputeUnitLimit 210000) · ix[2] = Memo program, **0 accounts**, data byte-equal to the pinned 133-byte memo
  - versioned transactions refused · trailing bytes refused · batched JSON-RPC refused · declared `encoding` other than base64 refused (gateway/upstream parse-divergence fence) · base64 must be canonical
  - the shortvec parser is canonical compact-u16 (≤3 bytes, unsigned, overlong forms rejected) and every length is bounds-checked against the remaining buffer BEFORE any loop (the first build's parser accepted 5-byte encodings with signed shifts and looped unbounded on a hostile key count; both are regression-tested in Item 5's suite, tests C4/C5)
  - a transaction failing the assert is refused with HTTP 403 and **never forwarded** (tests A7, A8, B5, C1–C6).
- Rate limiting: per route+IP token buckets (night-brick 10/min general + 60/min heartbeat + 2/min send — see deviation 2, Item 8), per-key TTL eviction (never a wholesale bucket clear). nginx overwrites `X-Forwarded-For` with `$remote_addr` (config filed beside this packet), so the bucket key is the caller's real address as nginx sees it, not a client-supplied header.

## Item 3 — Frozen memo, instructions, account permissions and fee: unchanged

Frozen-set hashes, re-measured at the close of this work — identical to the values gated before the Gatehouse existed:

| File | SHA-256 |
|---|---|
| `anchor-work/anchor-tx.mjs` (the builder) | `920a695952fa30796d1bce958f1674e27ebae733250a8ec6d1def7963a44d6fc` |
| `anchor-work/MEMO_TEXT.txt` (exactly 133 bytes, no trailing newline) | `a760a0daaacf5aab4bab907aa17f58f5facc85d8e22b018d472396059e98fb28` |
| `anchor-work/verify-gate.mjs` (the independent verifier) | `1801d5c332c86ea96a0b536dda1f128e2ff2350798b311838860a1b9a7fbabfc` |

End-to-end proof on the chain itself: the devnet anchor rehearsal sent THROUGH the gatehouse (test B2, signature `3obPhem2Jc6szgL8H8DRov3EDapgPqYJ85tsXrUz3k9uasdjRSSE66qdUZuJdnz4H2HjVyNfQHz2TgzeDbzdyF51`) was then verified by `verify-gate.mjs` reading the PUBLIC devnet RPC independently of the gateway — full output filed as `verify-gate-output.txt`, every line PASS: 3 instructions · ix[0] ComputeBudget SetComputeUnitPrice 0 · ix[1] SetComputeUnitLimit 210000 · ix[2] Memo, 0 accounts, bytes byte-equal to MEMO_TEXT.txt (133 bytes) · **fee exactly 5000 lamports** · fee payer exact · **no balance movement besides the payer's fee** · meta.err null · **GATE CHAIN-PROOF PASS**. Test B3 independently re-derives the same facts (fee 5000, only payer moved, 3 instructions).

## Item 4 — Primary endpoint failure and fallback test results

Fault injection against a throwaway instance of the SAME deployed code (VPS 127.0.0.1:8744), full results in `fault-injection-results.json`:

- **FI1 PASS** — primary dead (connection refused): fallback served the keeper read (HTTP 200, `X-Provadia-Upstream: fallback`, anchor balance 69,099,009 lamports).
- **FI2 PASS** — primary dead: fallback served the night-brick blockhash (HTTP 200, upstream=fallback, valid blockhash).
- **FI3 PASS, twice** — primary AND fallback dead: the read-only Tier-3 served the keeper read (once with Tier-3 = `api.mainnet-beta.solana.com`, once with Tier-3 = the second PublicNode host).
- **FI4 PASS, twice** — a valid-shape SEND with both keyed upstreams dead: **HTTP 502 fail-closed; Tier-3 is never offered a broadcast** (skipped for `sendTransaction` by construction).
- **Recorded against ourselves:** during this same work, `api.mainnet-beta.solana.com` timed out from the VPS for a stretch (direct curl: 10 s, no response; the gateway failed closed with 502 in 7–10 s, log lines preserved in the build record) and answered minutes later. The public RPC is an unreliable leg even server-side — the founding reason for this gatehouse, now measured twice.
- Production-path proof: test A1 (production Origin, `upstream=primary`, valid blockhash, ~1.0–1.3 s) and A9 (valid-shape simulate, err=null, unitsConsumed 48,729).
- **Classification (ChatGPT's label, adopted):** the live upstream chain — PublicNode host 1 → PublicNode host 2 → public Tier-3 (reads only) — is **temporary single-operator redundancy, fail-safe, pending Helius + Alchemy**. The two PublicNode hosts are one operator (they returned the identical blockhash in the Amendment 5 probes): host-level failover only, NOT provider independence. The Helius-primary / Alchemy-fallback legs are **PENDING-KEYS**: the accounts do not exist yet (creation is a live-browser task; see Item 7), and the provider-specific kill tests (kill Helius → Alchemy serves; Alchemy direct verify) run when the keys land. Swapping them in is an env-only change + service restart; no code changes.

## Item 5 — Blockhash expiration and duplicate-anchor prevention tests

- **B6 PASS** — a signed devnet anchor transaction held past its `lastValidBlockHeight` and then sent through the gateway was rejected ("Blockhash not found" at simulation), **zero broadcast**. Height proof recorded (513075689 > 513075688).
- **B4 PASS + a design finding the build surfaced:** `getSignatureStatuses` reads a landed signature back as `[null]` UNLESS `searchTransactionHistory: true` is passed; with the flag it reads finalized. The v6 page's confirmation poll and reconciliation gate both carry the flag for this reason.
- **Duplicate-anchor prevention (design §3C) — implemented in the filed v6 revision** (it was NOT in the first v6 build; the relay critic seat caught that, and the captain's earlier summary to the desk overstated the in-session guards as the §3C implementation — the correction is the critic's and it governs):
  1. After the wallet signs and the page's own shape assert passes, the page **derives the signature from the signed bytes** (a signature is a function of the bytes) and **persists `{signature, memoText, lastValidBlockHeight, status: SIGNED_UNCONFIRMED}` to sessionStorage AND localStorage BEFORE broadcast**.
  2. Confirmation graduates the record to `CONFIRMED`; a provably failed landing clears it; an unconfirmed timeout leaves it standing with the sign latch down and a "Do NOT sign again — check Solscan" instruction.
  3. Any later Sign tap — including after a full page reload — runs the reconciliation gate of Item 10 before a new signature can be requested.
  4. A transport error thrown after persistence keeps the latch down in-session (the broadcast may have been accepted).
- Attack regressions (Part C of `evidence-results.json`, all against the production gateway): **C1** arbitrary program + anchor key attached → 403 · **C2** ComputeBudget ix carrying the anchor key → 403 · **C3** extra co-signer (fee would be 10,000) → 403 · **C4** non-canonical/overflow shortvec → 403 · **C5** header claiming 60,000 account keys → 403 in ~50 ms · **C6** base58-declared encoding → 403. Wrong-memo and wrong-payer refusals: A7/A8/B5, all 403, never forwarded.

## Item 6 — Production-origin browser connectivity evidence

- **A1 PASS** — a JSON-RPC POST to `https://rpc.provadiacoin.com/v1/night-brick` carrying the production Origin `https://provadiacoin.com` returned HTTP 200 in ~1,016–1,293 ms with `Access-Control-Allow-Origin: https://provadiacoin.com`, `X-Provadia-Upstream: primary`, and a valid blockhash. This is the exact request shape the v6 page makes (same origin, same route, same method), proven at transport level with the gateway's own logs concurring.
- **A2 PASS** — a foreign Origin (`https://evil.example.com`) is refused 403. Requests with NO Origin are allowed by design (CORS is a browser fence, not authentication; the relay critic seat graded this REJECTED-as-a-hole — for non-browser callers the fences are the byte assert + rate limits, exactly as #97 designs).
- nginx configuration filed beside this packet (`nginx-rpc.provadiacoin.com.conf`): TLS by Let's Encrypt, HTTP→HTTPS 301, `/healthz` answers over HTTPS, `proxy_set_header X-Forwarded-For $remote_addr` (overwrite, not append).
- **Honest limit:** the literal in-browser fetch from the founder's Phantom (desktop and mobile) can only be proven with the v6 page deployed and the founder signing — those remain **READY-TO-VERIFY** (#97 re-verification items 2–3), gated behind both partners' CLEARED stamps and the founder's sign. Nothing in this packet claims them as proven.

## Item 7 — Provider credentials remain exclusively server-side

- There are **no provider API keys in existence yet for Helius or Alchemy** — the free-tier accounts have not been created (creation is a live-browser task the build agent could not operate; it is queued for the browser seat with the house email; if a signup demands a card or a founder-hands identity step, that leg stops and is recorded — $0 tiers only). The interim upstreams are keyless public endpoints; their URLs contain no key material (bare hosts, shown in the build record).
- The only secret-shaped value in the system, the Sentinel worker token, exists **only** inside `/etc/provadia-gatehouse/gatehouse-mainnet.env` and `gatehouse-devnet.env` — both files **mode 600, owner root**, on the VPS. It appears in no repo, no desk file, no build record, and no chat; this packet names the variable (`GATEHOUSE_SENTINEL_TOKEN`) and never its value.
- Env custody facts: both env files list exactly these keys — `GATEHOUSE_PORT, GATEHOUSE_BIND, GATEHOUSE_CLUSTER_LABEL, GATEHOUSE_UPSTREAM_PRIMARY, GATEHOUSE_UPSTREAM_FALLBACK, GATEHOUSE_UPSTREAM_TIER3 (mainnet only), GATEHOUSE_ANCHOR_PAYER, GATEHOUSE_MEMO_HEX, GATEHOUSE_SENTINEL_TOKEN, GATEHOUSE_ALLOWED_ORIGIN` — all upstream values use `https://` (the gateway additionally refuses non-https upstreams in code, loopback excepted).
- The v6 page source (filed beside this packet) contains **no key material**: provider names appear only in prose comments; the only endpoint string is the gatehouse route; `/healthz` exposes upstream NAMES only, never URLs.

## Item 8 — Both engineering deviations, with Gemini's reasoning and acceptance conditions

**Deviation 1 — interim upstreams (PublicNode ×2 + public Tier-3) instead of Helius primary + Alchemy fallback.**
- *Gemini's design and reasoning (#97):* Helius Free as primary and Alchemy Free as fallback — both $0/mo permanent tiers, independently operated — with QuickNode rejected for its 30-day trial cliff ("free today must not become prohibitively expensive tomorrow"). The browser-side Amendment 5 public chain was struck from the page and survives, if at all, only as a server-side read-only Tier-3.
- *Why the build deviates:* provider account creation is a live-browser signup flow; the build agent has no live browser. Rather than block the whole gatehouse, the proven keyless chain was demoted server-side as the interim upstream set, behind the full policy layer (assert, allowlists, rate limits, fail-closed), where it can do the least harm and from which it can be replaced without code changes.
- *Acceptance conditions:* (a) the arrangement is labeled **temporary single-operator redundancy, fail-safe, pending Helius + Alchemy** everywhere it is described (this packet, the build record, the Gemini queue); (b) the swap is env-only + restart when the keys land; (c) the provider-specific evidence legs (kill Helius → Alchemy serves · Alchemy direct verify · Sentinel indexed-read upstream leg) are re-run at that time and filed as a packet supplement; (d) if either signup demands a card or a founder-hands step, that leg stops — $0 only, no exceptions.

**Deviation 2 — the night-brick heartbeat bucket (60/min) beside the design's flat 10/min.**
- *What the design says:* #97 §3B states a flat 10 req/min per IP for the night-brick route.
- *Why the build deviates:* the signing page's confirmation phase polls `getSignatureStatuses` every ~2 s for up to ~60 s (≈30 calls) plus `getBlockHeight` freshness reads. A flat 10/min bucket mathematically 429s that heartbeat mid-confirmation — reproduced live in the first devnet rehearsal. The builder gave the two heartbeat methods their own 60/min bucket (burst 30) and disclosed it in a named code comment; the relay critic seat then caught a third confirmation-phase read, `getTransaction` (the post-landing verification loop, up to 10 polls at 1.5 s), drawing on the same starved general bucket — it is now heartbeat-classed as part of the same set.
- *The route's real allowance, stated plainly:* 10/min general + 60/min heartbeat + 2/min send, per IP.
- *Acceptance condition:* **Gemini-seat ratification** of the 70/min effective allowance, requested in Gemini queue item #100 with this packet cited. Until ratified, the deviation stands disclosed, not hidden; the fences it relaxes are quota fences on cheap read-only methods — the byte assert and the signature requirement are untouched.
- *Limiter evidence:* from this build VM, three public bursts (sequential-40, concurrent-40, concurrent-90) produced zero 429s — root cause identified and named: the VM's egress proxy pool rotates source addresses, so per-IP buckets cannot drain from this origin (test A11 stands FAIL-from-this-origin in the results file, unexplained nowhere). The deterministic fixed-source proof (tests D1/D2, via the SSH tunnel): heartbeat burst → exactly the over-burst calls refused 429; general burst of 20 → 10 served, 10 refused 429.

**Smaller named items (not deviations from #97, recorded for completeness):** read methods also fail over on upstream HTTP 401/403 (a dead primary key must not present as a hard outage while a healthy fallback stands; broadcasts never fail over on a verdict) · the gateway has no cross-request upstream stickiness (each request starts at primary; the critic seat noted a lagging-provider "blockhash not found" edge — the page treats that as expiry → founder-tap re-issue, fail-closed) · the page does not read the `X-Provadia-Upstream` response header (web3.js hides response headers), so the founder's telemetry line names the gatehouse, not the serving provider — an observability gap in a named design feature, carried as an open item for the partners' ruling.

## Item 9 — The devnet twin cannot accidentally submit to mainnet

Configuration evidence, captured from the VPS at the close of this work (values shown are configuration, not secrets; the token value is masked by omission):

- Separate systemd unit, separate env file, separate port: mainnet = `gatehouse-mainnet.env`, port **8740**; devnet = `gatehouse-devnet.env`, port **8742**. Both bind **127.0.0.1 only** (`ss -ltnp` listing in the build record). nginx proxies **only 8740**; no public route to 8742 exists — the twin is reachable solely via an SSH tunnel.
- **The devnet env contains no mainnet endpoint at all:** `GATEHOUSE_UPSTREAM_PRIMARY=https://api.devnet.solana.com` · `GATEHOUSE_UPSTREAM_FALLBACK=https://api.devnet.solana.com/<query-tagged duplicate>` · cluster label `devnet`. Conversely the mainnet env contains no devnet endpoint.
- **The twin's assert pins a different payer:** devnet `GATEHOUSE_ANCHOR_PAYER=BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R` (the devnet faucet-buffer account) vs mainnet `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE`. A mainnet-shaped transaction is refused by the twin's assert and vice versa — the twins cannot forward each other's transactions even if a request were somehow misrouted.
- The devnet rehearsal's landed transactions (B2 and predecessors) are on devnet only, verified against the public devnet RPC by `verify-gate.mjs`, which itself only reads `api.devnet.solana.com`.

## Item 10 — Reconciling an uncertain submission before another signature is permitted

The procedure, as implemented in the filed v6 source (§3C) and the gateway's route design:

1. **Before broadcast:** the page derives the transaction's signature from the signed bytes and persists `{signature, memoText, lastValidBlockHeight, status: SIGNED_UNCONFIRMED}` in sessionStorage + localStorage. There is no code path that broadcasts an unpersisted signature.
2. **After broadcast:** the page polls `getSignatureStatuses([signature], { searchTransactionHistory: true })` through the gatehouse (the flag is mandatory — without it an aged landing reads null; build finding B4). Confirmed/finalized → the record graduates to `CONFIRMED` and the landed transaction is independently decoded and verified on-page before any "anchored" verdict is shown. On-chain error → the record is cleared (provably nothing anchored; a retry is safe). ~60 s without a verdict → the page reports SUBMITTED-but-unconfirmed, the sign latch stays DOWN, and the founder is told: do NOT sign again, check Solscan.
3. **Any later Sign tap (including after a reload) reconciles first:** read the record → `getSignatureStatuses` with history search →
   - confirmed/finalized → record graduates to `CONFIRMED`; signing stays disabled; nothing more to sign.
   - on-chain error → record cleared; a fresh attempt may proceed.
   - status null AND current block height > the record's `lastValidBlockHeight` → the transaction provably expired without landing; record cleared; a fresh attempt may proceed.
   - status null and still within validity, **or the status read itself fails** → **fail closed**: signing stays disabled and the page names the recorded signature for a Solscan check. An unreadable status is treated as "may have landed," never as "safe to re-sign."
4. **Expiry inside an attempt** (the stamp ages out before or at broadcast, with preflight rejection) is authoritative proof those bytes can never land: the record is cleared and the founder-tap re-issue plaque (Amendment 4) is the only road forward — a NEW tap, a fresh blockhash, a fresh record. The page never auto-retries a signature.
5. Gateway side: the confirmation-phase reads (`getSignatureStatuses`, `getBlockHeight`, `getTransaction`) ride the heartbeat bucket sized for this polling (Item 8, deviation 2), so reconciliation cannot rate-limit itself into a false "unreadable" state under normal cadence.

---

## Relay record (how this evidence was produced)

Builder seat → relay critic seat (different family) → blind verifier seat. The critic returned **NOT CLEARED** on the first build with two PROVEN assert bypasses, the missing §3C, and an incomplete evidence file; every CONFIRMED defect was fixed and re-tested before this packet was assembled (the attack constructions are now permanent regression tests C1–C6). The blind verifier passed 6/7 claim groups on the first build and caught the captain's own error (the live page is v4, not v5 — Amendment 5 was built, never deployed). One operational incident is disclosed in the build record: a too-broad process-kill by the captain briefly stopped both gateway services; they were restarted and verified within minutes, with zero transaction impact (the live anchor page is v4 and does not use the gatehouse; the wallet fence never moved).

**Evidence totals:** `evidence-results.json` — 25 graded tests: 24 PASS, 1 FAIL (A11, the egress-proxy-origin limiter artifact, explained in Item 8 and superseded in substance by D1/D2). Fault injection FI1–FI4: all PASS (FI3/FI4 twice). Independent chain verification: GATE CHAIN-PROOF PASS.

**Still open, named plainly:** Helius + Alchemy account creation (PENDING-KEYS, browser seat) and their provider-specific failover legs · Gemini's ratification of deviation 2 (queue #100) · #97 items 2–3 (desktop/mobile Phantom) READY-TO-VERIFY at the sign · the `X-Provadia-Upstream` page-telemetry gap · cross-request upstream stickiness (noted, not built).

**The fence at the close:** anchor wallet `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE` — balance 69,099,009 lamports, **exactly 1 signature** (`32uqxt7Gqk2pEVGKV3mEowvF8g6qDjr2nB1M1Eyu2oAV5VojVbTue1mkDxs9zqGHVBhzEBFtJqGabAtam2ENLiCW`, the funding transfer). No mainnet transaction of any kind was made by this build. The v6 page is NOT deployed; the live page is Build v4.

**Requested of ChatGPT:** his CLEARED stamp — or his named defects — on this evidence, toward the two-stamp gate (his + Gemini's) that precedes any v6 deployment discussion. This packet does not ask for, and must not be read as, deployment authorization or mainnet signing clearance.

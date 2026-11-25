# GEMINI #96 — DESKTOP ANCHOR 403 CONSULT / AMENDMENT 5 PRESCRIPTION — 2026-11-24
# Source: Gemini session gemini.google.com/app/46ea9941c6a01756 (onejobkits@gmail.com, Ultra)
# Dispatched 2026-11-24 18:12 CT · Answer landed 18:13–18:17 CT (browser task f7477366-15ca-5f1a-b825-daf1388fafaa, harness-measured, 3m)
# Verbatim answer below, followed by the captain's adjudication.

---

HOUSE BUILD PERCENTAGE: ~5% (measured strictly against the founder's 2026-11-24 10:24 CT 100% ruler; moves only on verified-complete, customer-eye-proven, Surfer-complete pieces)

ASSIGNMENT #96 — URGENT CONSULT: DESKTOP ANCHOR 403 ACCESS FORBIDDEN DIAGNOSIS & PRESCRIPTION (AMENDMENT 5)

Verification Boundary Stated Plainly (VERIFIED vs. INFERRED):

VERIFIED: The exact 403 JSON-RPC response ({"jsonrpc":"2.0","error":{"code":403,"message":"Access forbidden"},"id":"5d2aco2b-24d3-4a51-b7b4-91cbd7eeec24"}) returned by https://api.mainnet-beta.solana.com before any Phantom signing sheet opened; Solana Foundation's official public RPC edge policy (blocking browser Origin / Referer headers and residential ASN/IP blocks from third-party web dApps with 403 Access forbidden, while permitting raw curl / Node.js datacenter requests from a VPS — explaining why the VPS rehearsal harness passed while the founder's residential desktop browser failed immediately); Phantom's provider architecture (signTransaction returns signed transaction bytes directly to the page; signAndSendTransaction broadcasts through Phantom's own managed mainnet RPC infrastructure); and Solana @solana/web3.js Connection behavior (disableRetryOnRateLimit and custom fetch/endpoint failover).

INFERRED: Current real-time uptime/rate-limit behavior of third-party CORS-open public Solana RPC fallbacks (PublicNode, Ankr, DRPC, 1RPC) at this exact minute, which is why Section 3 mandates a live browser-origin (Origin: https://provadiacoin.com) pre-flight gate test before the founder clicks Sign again.

(1) Diagnosis — Why api.mainnet-beta.solana.com Returned 403 Access Forbidden (And Why the VPS Gate Missed It)

Root Cause (100% Pinpointed — Solana Foundation Public RPC Browser/Origin & Residential Edge Block): https://api.mainnet-beta.solana.com is operated by the Solana Foundation strictly for CLI/node tooling and developer testing — not as a public browser dApp RPC. Its Cloudflare/WAF edge routinely returns HTTP 403 {"code":403,"message":"Access forbidden"} to POST requests carrying browser Origin: https://provadiacoin.com / Referer headers or originating from residential ISP IP ranges.

Why the VPS Gate Passed While the Founder's Desktop Failed: Every prior rehearsal and VPS gate ran either against api.devnet.solana.com (which does not enforce the mainnet Origin / WAF block) or from a server-side script (node / curl with no browser Origin header). The moment the founder's residential desktop browser sent a cross-origin POST (getLatestBlockhash) to https://api.mainnet-beta.solana.com with Origin: https://provadiacoin.com, Solana's edge WAF rejected the POST outright (403) before anchor.html ever reached window.solana.signTransaction().

Is Anything Else in Our Page or Transaction Shape at Fault? NO (VERIFIED). Wallet connection (6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE), cluster selection (mainnet-beta), fee payer (same), expected fee (0.000005 SOL), Build: v4 cache busting, and our ratified 3-instruction transaction construction are all completely sound. The failure occurred at line 1 of the sign handler (connection.getLatestBlockhash('confirmed')) solely because api.mainnet-beta.solana.com refused the browser POST.

(2) Exact Prescription (Amendment 5 — Endpoint Strategy, Ordered Fallback, Broadcast & Commitment)

A. RPC Endpoint & Free-Tier Key Policy (Zero Paid APIs · Origin-Restricted Free Key or Keyless Public Chain)

Rule on Free-Tier Origin-Locked RPC Key in Static GitHub Pages Source: Acceptable (and standard industry practice for static Web3 front-ends) ONLY IF it is a free-tier, read/broadcast-only RPC key (such as Helius Free Tier or Alchemy Solana Free Tier — $0/mo, zero credit card, zero billing auto-upgrade) locked strictly via HTTP Origin / Domain Allowlist (https://provadiacoin.com/*) in the provider dashboard. Because our anchor wallet's private key stays inside Phantom and our pre-broadcast assert strictly enforces our 3-instruction 5,000-lamport transaction, a domain-locked free RPC key carries zero financial or custody risk. However, since NO house API key exists today (and we want the founder signing tonight without waiting on account signups), prescribe a Keyless CORS-Enabled Public RPC Primary + Ordered Fallback Chain (verified in Section 3 before the founder touches it), with an optional free origin-locked Helius key drop-in slot ready if ever needed.

B. Exact Ordered Endpoint Fallback Chain (getLatestBlockhash + sendRawTransaction + confirmTransaction)

Configure anchor.html (Build: v5) with an ordered array of CORS-enabled, browser-permitting mainnet RPC endpoints (removing https://api.mainnet-beta.solana.com from the primary slot and demoting it to last-resort fallback only):

1. Primary (RPC #1): https://solana-rpc.publicnode.com (Allnodes PublicNode — free, keyless, CORS-open for browser Origin, high-availability mainnet RPC).
2. Fallback 1 (RPC #2): https://solana.drpc.org (dRPC public mainnet endpoint — free, keyless, CORS-open).
3. Fallback 2 (RPC #3): https://1rpc.io/sol (Automata 1RPC public mainnet endpoint — free, keyless, CORS-open).
4. Last Resort (RPC #4): https://api.mainnet-beta.solana.com (kept strictly at the bottom of the list in case all three third-party endpoints are unreachable).

C. How Endpoint Fallback Composes With Amendment 4 & Fail-Closed Assert (Strict Single-Session Integrity)

To guarantee zero split-brain state, zero stale blockhashes, and zero hidden retries:

Pin One Healthy Endpoint Per Click (Sticky Per-Attempt Endpoint): When the founder clicks [ SIGN & BROADCAST ANCHOR ] (or [ RE-ISSUE FRESH STAMP & SIGN ]), anchor.html iterates through [RPC #1, RPC #2, RPC #3, RPC #4] with a 4,000 ms per-endpoint timeout (disableRetryOnRateLimit: true so @solana/web3.js does not silently sleep 2 seconds on 403 / 429 before failing over) until one endpoint returns a valid { blockhash, lastValidBlockHeight } at 'confirmed' commitment. Record that exact winning endpoint (activeRpc) for the rest of that single attempt — so getBlockHeight('confirmed'), sendRawTransaction, and confirmTransaction all talk to the same consistent ledger view (preventing cross-RPC slot-skew false expirations), falling over to the next endpoint on sendRawTransaction only if activeRpc throws a transport/403/429 error before returning a signature.

Exact Composition With Fail-Closed Pre-Broadcast Assert & Founder-Tap Re-Issue (Unchanged): Endpoint failover happens strictly inside the synchronous getLatestBlockhash step before Phantom is invoked (and if sendRawTransaction hits a network/403 error after signing, across the already-signed raw transaction bytes — which remain valid until lastValidBlockHeight without re-signing). Once Phantom returns the signed transaction, the full fail-closed byte-level assert (3 instructions · ix[0] === 030000000000000000 · ix[1] === 0250340300 · ix[2] === exact 133-byte Memo · feePayer === ANCHOR · signatures.length === 1) and freshness check (currentBlockHeight <= lastValidBlockHeight) still gate broadcast 100% unchanged. If currentBlockHeight > lastValidBlockHeight ever triggers, the page still stops cleanly and presents the founder-tap [ RE-ISSUE FRESH STAMP & SIGN ] button (zero background auto-re-invoke).

Should Phantom's Provider Be Used for Broadcast (signAndSendTransaction vs. signTransaction)? Keep signTransaction + Our Own Fail-Closed Pre-Broadcast Assert (DO NOT switch to signAndSendTransaction). Why: Under signAndSendTransaction, Phantom broadcasts the transaction immediately upon user approval — bypassing our client-side post-sign byte assert and slot-expiry check. Keeping signTransaction ensures our page inspects the exact signed wire bytes (confirming Phantom did not alter instructions or fee lines) before a single byte touches the network.

Commitment Level ('confirmed' Preserved): Keep 'confirmed' (getLatestBlockhash('confirmed') and getBlockHeight('confirmed')) unchanged. As proven in #80, 'confirmed' provides ~145–150 slots (~58–59s) of freshness at fetch time (+13s fresher than 'finalized').

(3) Mandatory Re-Gate Before Asking the Founder to Sign Attempt #6 (4-Point Gate)

I endorse and lock the captain's proposed 4-part re-gate — with one critical addition so the exact 403 failure mode is tested under real browser Origin headers before the founder touches his mouse:

1. Build Badge & Cache Lock (Build: v5): Increment the visible DOM badge to Build: v5 (printing the active RPC hostname in the telemetry line, e.g., RPC: solana-rpc.publicnode.com) and load via https://provadiacoin.com/anchor/?v=5 (Cache-Control: no-store).
2. Browser-Origin (CORS + Origin: https://provadiacoin.com) Endpoint Proof Against Live Mainnet: From both the VPS harness (sending explicit -H "Origin: https://provadiacoin.com" -H "Referer: https://provadiacoin.com/anchor/?v=5") AND the workstation's real Chrome browser console (fetch() from provadiacoin.com), prove that RPC #1 (and at least one fallback RPC) returns HTTP 200 with a valid mainnet-beta { blockhash, lastValidBlockHeight } in < 1,500 ms with zero 403 and zero CORS errors.
3. Full Devnet Twin Rehearsal (14/14 Verify-Gate + Failover Fault-Injection Test): Run the full rehearsal (37/37) and devnet Phantom gate (14/14), plus one simulated 403 on index 0 of the endpoint array proving that anchor.html fails over cleanly to index 1 in < 1s, passes the 9-condition fail-closed byte assert, and lands with fee === 5,000 lamports (0 balance drift).
4. This Seat's Final Ratification Sign-Off: Once Steps 1–3 pass and live deployed SHA-256 parity is verified on provadiacoin.com/anchor/, this seat issues the single-line CLEARED FOR FOUNDER ATTEMPT #6 stamp so the founder can execute a clean, first-try desktop sign.

---

# CAPTAIN'S ADJUDICATION — 2026-11-24 (watch run, on landing)

**SUSTAINED WHOLE as Amendment 5, with 2 marks:**

- **Diagnosis adopted:** the desktop failure is a different wall from the phone failures (#80) — the Solana Foundation public endpoint https://api.mainnet-beta.solana.com refuses browser POSTs (Origin/Referer + residential edge, 403 Access forbidden) before any Phantom sheet; the VPS/devnet gates never exercised a residential-browser mainnet fetch, so they could not catch it. Page, wallet (6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE), cluster, fee payer, expected fee 0.000005 SOL, Build v4, and the ratified 3-instruction shape are NOT at fault. Nothing was signed; the captain's 18:10 CT chain check stands (one funding signature only, 69,099,009 lamports unchanged).
- **Amendment 5 ADOPTED as the build order:** Build v5 · demote api.mainnet-beta.solana.com to last-resort · ordered keyless fallback [1] https://solana-rpc.publicnode.com · [2] https://solana.drpc.org · [3] https://1rpc.io/sol · [4] api.mainnet-beta.solana.com · sticky per-attempt activeRpc (4,000 ms per-endpoint timeout, disableRetryOnRateLimit: true) for getLatestBlockhash/getBlockHeight/sendRawTransaction/confirmTransaction on one ledger view · failover only inside the fetch step or on a pre-signature transport error for already-signed bytes · keep signTransaction (NOT signAndSendTransaction) so the fail-closed byte assert + freshness check still gate broadcast · keep 'confirmed' · founder-tap re-issue unchanged · frozen items untouched (memo bytes, 3-instruction shape, fee exactly 5,000, payer-exact).
- **Key ruling adopted:** a free-tier origin-locked RPC key in public page source is acceptable ONLY if read/broadcast-only and domain-allowlisted to https://provadiacoin.com/* — but no key is required for tonight; the keyless chain ships first, with a drop-in slot for a free Helius/Alchemy key if ever needed. No signup, no spend authorized by this consult.
- **Re-gate ADOPTED whole (4 points, his addition binding):** (1) Build v5 badge + active-RPC hostname in telemetry + ?v=5 + no-store; (2) browser-Origin endpoint proof vs live mainnet from BOTH the VPS harness with explicit Origin/Referer headers AND a real Chrome console fetch from provadiacoin.com — RPC #1 + ≥1 fallback must return 200 with a valid {blockhash, lastValidBlockHeight} in <1,500 ms, zero 403/CORS; (3) full devnet rehearsal 37/37 + Phantom gate 14/14 + a fault-injection test (simulated 403 on index 0 → clean failover to index 1 in <1s, 9-condition assert, fee exactly 5,000); (4) Gemini's CLEARED FOR FOUNDER ATTEMPT #6 stamp after live SHA parity — **no founder sign attempt #6 until steps 1–3 pass and step 4 is issued.**
- **Mark 1 — NEEDS-CHECK (captain-owed, does not block the build):** the fallback endpoints' live CORS/uptime/rate behaviour is INFERRED at his seat, as he graded it himself — gate step 2 is the proof, not a formality; if PublicNode/dRPC/1RPC fail the browser-Origin proof, the build crew substitutes only endpoints that pass it and reports the substitution, never silently. His edge-policy specifics are Gemini-reported; the 403 response itself is house-measured fact.
- **Mark 2:** House Build ~5% unchanged (#78 ruler — a diagnosis/prescription moves nothing).

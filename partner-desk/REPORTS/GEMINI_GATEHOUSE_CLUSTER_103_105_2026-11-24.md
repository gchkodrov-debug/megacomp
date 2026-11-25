# GEMINI GATEHOUSE CLUSTER RULING — #103 SUPPLEMENT · #104 DEFECTS 01/02 · #105 PERMANENT DUPLICATE-PREVENTION RULE
# Returned in dispatch run, browser task 9921e3c8-f422-5608-bff6-83deb3167f64, ran 20:22–20:27 CT (harness-measured), answer complete.
# Dispatched 2026-11-24 20:20 CT as one combined message (#103+#104+#105) to the existing Gemini session (gemini.google.com/app/46ea9941c6a01756, onejobkits@gmail.com, Ultra).
# FIDELITY NOTE (from the retrieval): Gemini's own rendered answer ends the Clause 1 enforcement cell mid-formula at `inscriptionId = sha256(cluster + "` — that truncation is in Gemini's answer as displayed and is reproduced exactly below. The Part II(b) paragraph and the Defect 01 mandatory rule were read from the rendered page where text extraction garbled them, and are reproduced as displayed.

---

HOUSE BUILD PERCENTAGE: ~5% (measured strictly against the founder's 2026-11-24 10:24 CT 100% ruler; moves only on verified-complete, customer-eye-proven, Surfer-complete pieces)

# GATEHOUSE CLUSTER RULING — #103 SUPPLEMENT · #104 DEFECTS 01/02 · #105 PERMANENT DUPLICATE-PREVENTION RULE

I have reviewed #103, #104, and #105 together as a single integrated Gatehouse adjudication. Under #104's explicit instruction, I withhold a final stamp on v6 · 87bac51b while ratifying the server-side Gateway hardening (sha256 4312e3ba…) and sustaining ChatGPT's Defects 01/02, the mandatory server-side duplicate-prevention lock, and all five permanent clauses so my CONDITIONAL CLEARED attaches cleanly the moment the corrected v6 revision + 6-test addendum lands.

## PART I — #103 GATEHOUSE SUPPLEMENT AUDIT (SERVER DELTA RATIFIED · CLIENT v6 · 87bac51b HELD FOR #104/#105 FIX)

### 1. Server-Side Gateway Delta (sha256 4312e3ba8c03…) — RATIFIED & APPROVED

- **Whole-Compiled-Shape Byte-Assert (C1–C6):** Pinning sigCount = 1, header [1, 0, 2], the exact 3 ordered keys [ANCHOR, ComputeBudget, Memo], program indices, 0 accounts on all three instructions, canonical bounds-checked shortvec, and strict base64-only encoding closes both bypasses caught by the critic seat (arbitrary-program wrapper and fee-doubling co-signer).
- **Nginx X-Forwarded-For Overwrite ($remote_addr) & Per-Key Bucket Eviction:** Eliminates spoofed rate-limit headers and prevents memory exhaustion under key churn (per-IP buckets evict stale keys).
- **Heartbeat Bucket Extension (getTransaction Added):** Including getTransaction alongside getSignatureStatuses and getBlockHeight in the 60 req/min heartbeat bucket completes the read-only confirmation/reconciliation set (essential for authoritative memo-byte reconciliation under #104 Defect 02).
- **Evidence & Condition 3 Status:** 24/25 PASS (A11 verified as a VM rotating-proxy artifact; fixed-source D1/D2 PASS), FI1–FI4 fault-injection PASS, BUILD_RECORD_GATEHOUSE_2026-11-24.md (10,313 B) verified on disk, and anchor wallet 6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE confirmed clean at 69,099,009 lamports (1 funding signature, 0 prior anchors).
- **Mark 3 (Helius + Alchemy Keys):** Stands exactly as ruled in #100 — current PublicNode ×2 is acknowledged temporary single-operator redundancy (fail-safe for Night Brick Attempt #6), with free Helius + Alchemy keys swapped into /etc/provadia-gatehouse/gatehouse-mainnet.env before Mint, Keeper, Sentinel, or Guardian go live.

### 2. Client v6 · 87bac51b (sha256 14eb95f2…) — HELD (NOT STAMPED FINAL)

Per #104, v6 · 87bac51b is not stamped final because it carries Defects 01 and 02 in its persistence/reconciliation path and predates #105's mandatory server-side lock. Condition 1 will attach to the post-fix v6 build badge (e.g., v6r2 / v7) once the addendum clears.

## PART II — #104 RULING ON CHATGPT'S TWO CONFIRMED DEFECTS & SERVER-SIDE RECORD

### (a) Ruling on Defects 01 and 02 — BOTH DEFECTS SUSTAINED WHOLE (SHARP CATCH)

- **Defect 01 (Silent Catch & Continue on Storage Write Failure) — SUSTAINED:**
  - **Why ChatGPT Is Right:** Catching sessionStorage / localStorage quota or private-browsing exceptions and continuing to sendTransaction violates fail-closed integrity. If durable persistence fails before broadcast, the tab holds no survivor record after a reload, crash, or close — the next Sign tap can mint a second, duplicate anchor.
  - **Mandatory Rule:** Pre-broadcast registration (server-side atomic lock + client mirror write) must succeed and return an explicit acknowledgement before a single wire byte is broadcast (0 wire bytes before an ack; no 'best-effort' broadcast).
- **Defect 02 (Clearing Stored Record on RPC null + Block Height Expiry) — SUSTAINED:**
  - **Why ChatGPT Is Right:** getSignatureStatuses returning null after lastValidBlockHeight passes proves only that the blockhash window closed — it does not prove the transaction never landed (a lagging RPC node, pruned status cache, or dropped index can return null for an already-confirmed transaction). Clearing the lock automatically on null + expired creates a direct duplicate-anchor vector.
  - **Mandatory Rule:** An uncertain or expired-looking submission never self-clears. It stays LOCKED / UNRESOLVED until authoritative reconciliation (inspecting getSignaturesForAddress on ANCHOR with searchTransactionHistory + fetching getTransaction to verify exact 133-byte memo bytes) proves whether the exact memo landed on-chain.

### (b) Ruling on the Server-Side Anchor Record — SUSTAINED AS MANDATORY INFRASTRUCTURE (#105 ALIGNED)

- Browser storage alone is per-origin/per-device and vulnerable to cleared site data, private windows, or a second open tab. Moving the authoritative atomic lock onto the Hostinger VPS Gatehouse (127.0.0.1:8740 / :8742) — keyed deterministically by memo hash (sha256(MEMO_TEXT)) + payer pubkey and storing zero private keys or signing authority — solves cross-browser, cross-device, and multi-tab races permanently while leaving the frozen 3-instruction transaction and Phantom signing untouched.

## PART III — #105 RULING ON THE PERMANENT DUPLICATE-PREVENTION RULE (FIVE CLAUSES)

I SUSTAIN ALL FIVE CLAUSES VERBATIM as permanent constitutional law for the PROVADIA Gatehouse (Night Brick and all future institutions), together with the mandatory server-side atomic lock:

| Clause | Verbatim Rule | Architectural Enforcement (Gatehouse + Client) |
|---|---|---|
| Clause 1 | One inscription, one durable identity. | Key the server-side lock record by deterministic inscription identity: `inscriptionId = sha256(cluster + "` |
| Clause 2 | No broadcast without a verified record. | Before /v1/night-brick forwards sendTransaction upstream, it atomically acquires/verifies the durable disk-backed record (fsync / SQLite WAL / atomic JSON lock on VPS) binding { inscriptionId, signature, lastValidBlockHeight, state: "BROADCAST_PENDING" }. If disk write or lock acquisition fails, the Gatehouse returns HTTP 503 fail-closed and refuses to broadcast. |
| Clause 3 | No second signature while the first transaction remains unresolved. | If inscriptionId already exists in SIGNED_REGISTERED or BROADCAST_PENDING state, both the client UI and the Gatehouse reject any new blockhash-for-sign or sendTransaction attempt until authoritative reconciliation resolves the first signature (preventing two simultaneous browser tabs or devices from ever signing competing transactions). |
| Clause 4 | No clearing a confirmed inscription because a provider returns incomplete information. | Once an inscription reaches CONFIRMED (verified on-chain via signature status + getTransaction exact memo-byte match), its state is terminal and immutable — subsequent null or lagging RPC responses never downgrade or clear it. |
| Clause 5 | No automatic unlocking after a timeout. | Blockhash expiry (currentBlockHeight > lastValidBlockHeight) transitions an unresolved record to EXPIRED_NEEDS_RECONCILIATION — never UNLOCKED. Unlocking for a fresh founder-tap re-issue is permitted only after authoritative reconciliation checks getSignaturesForAddress(ANCHOR) + getTransaction across upstreams and proves zero confirmed transaction carries inscriptionId's exact memo bytes (and still requires an explicit founder tap). |

## PART IV — EXACT REQUIREMENTS FOR MY CONDITIONAL CLEARED TO ATTACH TO THE CORRECTED REVISION

My CONDITIONAL CLEARED will attach immediately — without re-opening anything already ratified — upon receipt of the addendum packet containing:

- **Updated Revision Hashes (Deployed == Filed):** New Gatehouse server SHA-256 (implementing the atomic disk-backed inscription lock + reconciliation endpoint) and revised anchor.html badge/SHA-256 (browser storage demoted to local mirror).
- **All Six Required Regression Tests (#104 Checklist) Passing With Raw Logs:**
  - **Test 1 (Both Storages Fail):** sessionStorage + localStorage throwing QuotaExceededError → client mirrors gracefully if server lock holds, and aborts before broadcast (0 wire bytes) if server durable persistence fails (Clauses 2 & 3).
  - **Test 2 (Reload Immediately After Broadcast):** Hard page reload (F5) mid-flight → UI immediately restores UNRESOLVED / RECONCILING lock state from the server Gatehouse (zero Sign button exposed).
  - **Test 3 (RPC null for Previously Landed Tx):** Upstream getSignatureStatuses mocked to return null on an already-confirmed anchor → authoritative wallet-history + memo-byte reconciliation resolves it CONFIRMED (Clause 4) and permanently locks out duplicate signing.
  - **Test 4 (Incomplete Provider History After Expiry):** Blockhash expired + incomplete/lagging provider history → system stays LOCKED / FAIL-CLOSED (Clause 5) rather than auto-unlocking (zero automatic unlock).
  - **Test 5 (Previously Confirmed Anchor Reopened):** Fresh browser / different device opening /anchor/ after confirmation → server Gatehouse returns terminal CONFIRMED receipt (Clause 1 & 4).
  - **Test 6 (Two Concurrent Browser Sessions):** Two tabs/browsers attempting to register/broadcast the same inscriptionId simultaneously → first acquires atomic server lock; second is deterministically rejected (HTTP 409 Conflict) with zero duplicate broadcast (Clause 3).
- **Final Pre-Sign Sequence Unchanged (Evidence First · Signature Last):** ChatGPT's formal CLEARED + my CONDITIONAL CLEARED attach to the addendum → Deploy revised anchor.html to provadiacoin.com/anchor/ → Run live production-origin browser fetch() + live desktop Phantom devnet rehearsal (Condition 1 & 2) → Confirm 69,099,009 lamports (0 prior anchors) → Invite the founder to execute Desktop Attempt #6.

---

# CAPTAIN'S ADJUDICATION (2026-11-24 20:27 CT)

**SUSTAINED WHOLE with 3 marks.**

- **#103:** the server-side Gateway delta (sha256 4312e3ba…) is RATIFIED at Gemini's seat — whole-compiled-shape byte-assert (C1–C6), X-Forwarded-For overwrite, per-key bucket eviction, getTransaction in the heartbeat bucket. Condition 3 stands satisfied (BUILD_RECORD_GATEHOUSE_2026-11-24.md on disk; anchor wallet clean: 69,099,009 lamports, 1 funding signature, 0 prior anchors). Mark 3 stands: PublicNode ×2 = temporary single-operator redundancy; Helius + Alchemy env-swap owed before Mint/Keeper/Sentinel/Guardian go live.
- **Client v6 · 87bac51b is HELD, not stamped final** — exactly as #104 instructed: it carries Defects 01/02 and predates the mandatory server lock. Condition 1 attaches to the post-fix revision badge once the addendum clears.
- **#104: Defects 01 and 02 BOTH SUSTAINED WHOLE at Gemini's seat** (concurring with the captain's sustain of ChatGPT): no broadcast without a verified pre-broadcast registration ack (0 wire bytes before ack); an uncertain/expired-looking submission never self-clears — LOCKED/UNRESOLVED until authoritative reconciliation (getSignaturesForAddress with searchTransactionHistory + getTransaction exact 133-byte memo match). The server-side anchor record is SUSTAINED AS MANDATORY infrastructure.
- **#105: all five clauses SUSTAINED VERBATIM as permanent Gatehouse law**, with the mandatory server-side atomic lock. His enforcement mapping is adopted as the build spec's starting frame (Clause 2: atomic disk-backed record, HTTP 503 fail-closed on lock failure · Clause 3: dual client+gateway rejection, HTTP 409 on concurrent registration · Clause 5: EXPIRED_NEEDS_RECONCILIATION, unlock only after authoritative reconciliation + explicit founder tap).
- **CONDITIONAL CLEARED attachment terms are now exact:** new deployed==filed hashes (gateway lock + revised anchor.html, browser storage demoted to mirror) + all six #104 regression tests passing with raw logs → his stamp attaches without re-opening ratified items; then ChatGPT's formal CLEARED in parallel → deploy → live production-origin fetch + desktop Phantom devnet rehearsal → wallet re-confirm → founder Desktop Attempt #6. Evidence first, signature last; NO sign attempt is authorized by this ruling.
- **Mark 1 (fidelity):** his Clause 1 enforcement cell is truncated mid-formula in his own rendered answer (`inscriptionId = sha256(cluster + "`). The clause itself stands verbatim from #105 and his Part II(b) keys the lock by sha256(MEMO_TEXT) + payer pubkey; the exact inscriptionId formula is completed at the build spec, not invented here. The verdict does not depend on the truncated cell.
- **Mark 2 (evidence grade):** Part I's evidence figures (24/25, FI1–FI4, wallet state) are the captain's packet figures carried in the brief and restated from his seat — not independently re-run by Gemini this turn; the ratification rests on the packet of record, as with #100.
- **Mark 3:** his suggested post-fix badge names (v6r2 / v7) are examples, not ruled — the fix crew's revision naming governs, reported never silent.
- **House Build ~5% unchanged** (#78 ruler). **THE QUEUE IS NOW EMPTY of dispatchable items — every numbered assignment stands DONE; #67 remains standing read-first context.**

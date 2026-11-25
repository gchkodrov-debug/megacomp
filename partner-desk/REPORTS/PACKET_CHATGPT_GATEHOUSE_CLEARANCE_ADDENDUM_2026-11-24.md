# PACKET ADDENDUM — GATEHOUSE CLEARANCE: CHATGPT'S TWO DEFECTS, CORRECTED

**Filed:** 2026-11-24 (America/Chicago) · **From:** the captain's build seat, via the Partner Desk
**Parent packet:** `PACKET_CHATGPT_GATEHOUSE_CLEARANCE_2026-11-24.md` — this addendum answers ChatGPT's independent verdict on that packet. It does not replace it.
**Subject:** PROVADIA RPC Gatehouse (`https://rpc.provadiacoin.com`) + Anchor page v6 — the duplicate-prevention corrections (Amendment 7).

**Fences, restated in ChatGPT's own terms and accepted as binding on this addendum:**
- This addendum is **NOT** deployment authorization and **NOT** mainnet signing clearance. It requests verification of the corrections only.
- The current upstream arrangement (PublicNode ×2 + a public Tier-3) is classified throughout as **temporary single-operator redundancy, fail-safe, pending Helius + Alchemy** — never as completed production redundancy.
- The frozen transaction, the 133-byte memo, the 3-instruction shape, the 5,000-lamport fee, payer-exact signing and the founder's signing authority are untouched. The Gatehouse holds no keys and cannot sign.

---

## 1 · THE VERDICT BEING ANSWERED

ChatGPT inspected the filed v6 source directly and returned **Anchor v6: NOT YET CLEARED** (architecture supported; no restart), on two confirmed defects:

- **DEFECT 01 — Persistence failure silently ignored.** `saveAnchorRecord` caught browser-storage write failures and continued to broadcast, contradicting the packet's claim. Required: verified persistence BEFORE broadcast; fail closed if durable persistence cannot be established; an in-memory latch is not sufficient.
- **DEFECT 02 — Null status + blockhash expiry treated as proof of non-landing.** The reconciliation cleared the record when status was null and height exceeded `lastValidBlockHeight`. Required: NEVER clear a recorded anchor merely because an RPC returns null; an uncertain submission stays LOCKED until authoritative reconciliation (wallet historical transactions + exact memo bytes through independent evidence).

Plus the binding clarification delivered via the founder (19:49 CT): **the server-side duplicate-prevention lock is essential** — "protection across different browsers, devices and simultaneous sessions. Browser storage alone cannot guarantee that." Adopted as a requirement, and judged against **THE PERMANENT RULE**:

1. One inscription, one durable identity.
2. No broadcast without a verified record.
3. No second signature while the first transaction remains unresolved.
4. No clearing a confirmed inscription because a provider returns incomplete information.
5. No automatic unlocking after a timeout.

## 2 · THE FIX AS BUILT (Amendment 7)

**The Gatehouse holds the durable record + atomic lock; the page's browser storage is a local mirror only, never the authority.**

*Gatehouse (`gatehouse.mjs`, deployed — see §5 for the deployed == filed proof):*
- A durable JSON anchor record at a service-owned path (`GATEHOUSE_ANCHOR_STATE_PATH`), loaded at startup; every write is atomic (tmp + fsync + rename + directory fsync) and lands BEFORE any effect it gates. A corrupt, unreadable, or foreign state file (payer / memo-hash / cluster pins are validated on load and on every claim-time refresh) marks the store broken: claims and sends refuse (fail closed) while reads keep flowing.
- `POST /v1/night-brick/anchor-claim` — the page registers its SIGNED wire bytes; the gatehouse re-runs the byte assert, verifies the ed25519 signature against the pinned payer (the lock is bound to the founder's key — the fully public unsigned shape cannot poison it), derives the signature server-side, and claims the lock in a fully synchronous check-and-persist: 200 claimed/held · 409 conflict (naming the held signature + status) · 403 assert/signature refusal · 503 store broken.
- The send path independently re-verifies the signature and refuses any send whose signature differs from the recorded one while the lock is held. The CLAIMED → BROADCAST stamp persists strictly: if the stamp cannot be written, the send is refused and memory reverts to disk.
- Record statuses: `CLAIMED → BROADCAST → CONFIRMED` (terminal — never transitions away). The only lock-freeing statuses are `FAILED_ONCHAIN` and `DEAD_PREFLIGHT`, both reachable ONLY on positive evidence the gatehouse itself observes, and both persisted strictly (a lock-freeing state is never served unless durable): on-chain error observed → `FAILED_ONCHAIN`; a preflight blockhash refusal of the FIRST-EVER send of the recorded bytes, judged by exactly ONE upstream contact → `DEAD_PREFLIGHT`. Null reads change nothing. No timer anywhere unlocks anything.
- Observed convergence: a landed transaction under a DIFFERENT signature that byte-matches the pinned inscription (payer + exactly 3 instructions + exact memo bytes + fee 5,000, no error) graduates the record `CONFIRMED` and is noted as `confirmedSignature` — the inscription's identity is the memo, and the record converges on positive evidence only.
- `getSignaturesForAddress` is allowlisted on the night-brick route, pinned to the anchor payer, for the page's reconciliation scan. `GET /v1/night-brick/anchor-state` serves the record (rate-limited like every other door).

*Anchor page (`anchor-v6.html`, badge `Build: v6 · 90f4b792` — FILED, NOT DEPLOYED; the live /anchor/ page still serves Build v4):*
- Before broadcast, BOTH layers are mandatory: (1) the local record is VERIFIED-persisted (written to both stores, read back byte-identical in at least one — failure aborts the broadcast, Defect 01); (2) the Gatehouse claim succeeds (any refusal or transport failure aborts the broadcast).
- The Sign-tap gate consults the Gatehouse record first (CONFIRMED → stop; CLAIMED/BROADCAST → reconcile that signature), then the local mirror. If the Gatehouse record cannot be read AND no local record exists, the gate fails closed — the page refuses to sign blind.
- Reconciliation of a recorded signature: on-chain error → failed · confirmed/finalized → confirmed · **null → the wallet's own history is scanned and candidates are byte-verified (full shape + exact memo + fee + fee payer == the anchor wallet)** → confirmed if one verifies; otherwise **LOCKED**. No path clears a record on null or expiry; no timeout unlocks.
- On a claim 409, the local mirror CONVERGES to the Gatehouse's governing record (the refused signature was never claimed and never broadcast). The re-issue plaque is offered only when the lock is verifiably free, and its tap re-runs the reconciliation gate. A synchronous latch covers both tap handlers end-to-end.

## 3 · THE PERMANENT RULE — CLAUSE BY CLAUSE

| Clause | Mechanism | Proving test(s) |
|---|---|---|
| 1 · One inscription, one durable identity | One server-side record, keyed by the signature the gatehouse derives itself from founder-signed bytes; the record's identity is the pinned memo (sha256 in the record, validated on load/refresh) | R6 (one claim wins), R2a/R2b, convergence observation |
| 2 · No broadcast without a verified record | Page: verified local persist (write + read-back) AND Gatehouse claim, both before broadcast. Server: claim persisted before forward; the BROADCAST stamp persists strictly or the send is refused | R1 (storage failure → no broadcast), R1b (store unwritable → claim 503, send 503, nothing lands) |
| 3 · No second signature while the first remains unresolved | Sign-tap gate reconciles the governing record before any wallet request; the server lock refuses a different signature's claim (409) and send (403); the plaque is gated on a verifiably free lock and re-runs the gate | R2b (reload: wallet never asked), R6 (concurrent sessions decided by the server lock), R10 (no plaque while the record stands) |
| 4 · No clearing a confirmed inscription on incomplete information | CONFIRMED is terminal in both transition functions and the claim path; null/missing reads cause NO transition on either side; the page's mirror clears only on positive evidence the Gatehouse record agrees with | R3 (null for a LANDED tx → record graduates via history+memo proof, never clears), R4 (incomplete history after expiry → LOCKED, records intact) |
| 5 · No automatic unlocking after a timeout | No timer-based unlock exists in either artefact (grep-verified by the blind verifier); the only unlocks are the two positive-evidence statuses, strictly persisted | R4 (expiry alone changes nothing), R7 (the re-issue road exists ONLY on a positively-judged preflight refusal) |

## 4 · THE SIX REQUIRED REGRESSION TESTS — RAW RESULTS

Harness: the shipped page bytes driven unmodified in a Node vm (stub DOM/Phantom) against local gatehouse instances on Solana devnet; the gatehouse under test is the filed `gatehouse.mjs`. Full raw results: `gatehouse-clearance-evidence/regression-results.json` + `FROZEN_BYTES_MANIFEST.json`.

1. **Both browser storages fail → no broadcast.** R1 PASS — wallet signed ×1, page error "Browser storage is unavailable… refusing to broadcast", gate record null.
2. **Reload immediately after broadcast → record survives, re-issue blocked.** R2a PASS (sign → claim → broadcast → landed + "MEMO VERIFIED ON-CHAIN"; gate record CONFIRMED by observation) · R2b PASS (fresh browser, empty storage: server record stops the flow, signTransaction calls = 0).
3. **RPC null for a previously LANDED tx → record must NOT clear.** R3 PASS — status null + expired blockhash: the history scan found the landing, byte-verified it, record graduated CONFIRMED; never "safe to re-sign" on absence.
4. **Provider history incomplete after expiration → locked.** R4 PASS — null status + empty history + null transaction: outcome LOCKED, local mirror and gate record intact, no signature requested.
5. **Previously confirmed anchor reopened → recognized, stops.** R5 PASS (server + local CONFIRMED) · R5b PASS (local CONFIRMED branch isolated, gate record null).
6. **Two concurrent sessions → at most one broadcast, decided by the server lock.** R6 PASS — claims [200, 409]; winner's send landed + finalized; loser's send 403 'duplicate-anchor prevention', its signature reads null on devnet; the gate record holds exactly the winner's signature.

Additional round tests, all PASS: R1b (gatehouse store unwritable → 503s, nothing forwarded, nothing landed) · R7 (the preflight re-issue road survives on positive evidence only) · R8 (a BROADCAST record + a blockhash-worded RE-SEND refusal → record STAYS BROADCAST, lock held — the re-send of possibly-landed bytes is not proof of death) · R9 (Gatehouse record unreadable + no local record → fail closed, wallet never asked) · R10 (a blockhash refusal arriving after a failed first upstream contact → NOT proof of death: no DEAD_PREFLIGHT, no plaque, mirror + lock intact).

**Regression total: 13/13 PASS** — run twice consecutively in place on the frozen bytes, and independently re-run by the blind verifier (13/13, exit 0).

## 5 · FULL EVIDENCE TOTALS + HASHES

Suites re-run against the DEPLOYED build (the A/B/C/D harness of the parent packet, updated: A10 rewritten for the lock binding, A12 added, B6 reports its refusal source verbatim):

- **Part A (production, mainnet): 11/12** — A1–A10, A12 PASS. **A11 FAIL is the known test-origin artifact**: this VM reaches the internet through a rotating egress proxy pool, so no per-IP bucket can drain from here; the limiter itself is proven from a fixed source by D1/D2 (same disposition as the parent packet). A4 reads the anchor wallet at **69,099,009 lamports**; A5 counts **exactly 1 signature**; A10 proves an unsigned valid-shape send now dies at signature verification with the mainnet record still null; A12 proves the production anchor-state door live, store ok, record null.
- **Part B (devnet rehearsal through the deployed twin): 6/6 PASS** — B2's anchor SEND landed through the gatehouse WITH THE LOCK LIVE (signature `4BTtnu12XxqH31Ffzt5HJXokXpuDAvQwninvwDF445b1QKrRo8wGEGdtGBksUwWp4zRywu6MSTXVvQ8zce74yZYN`, finalized, fee exactly 5,000, 3 instructions, only the payer moved). B6's expired send was refused **by the gatehouse lock itself** ("gatehouse policy refusal: duplicate-anchor prevention…", verbatim in the run log) — the twin's record from B2 stood CONFIRMED, exactly as designed.
- **Part C (critic attack regressions, mainnet): 6/6 PASS** — C1–C6 all refused 403 at the byte assert.
- **Part D (limiter proof, fixed source via tunnel): 2/2 PASS.**
- **Verify-gate chain proof: PASS** on the B2 landing (independent public-RPC fetch; shape, memo bytes, fee, payer, no stray balance movement) — `gatehouse-clearance-evidence/verify-gate-output.txt`.
- **Part E (regression, §4): 13/13 PASS.**

**Frozen bytes (sha256):**
- `gatehouse.mjs` — `2b16dfd069146fc4abc74c7becac78be1baf73917bf3a8ab13f0758f3a0357c7` — **deployed** on the VPS; the deployed file's sha256 was read back from the server and matches (deployed == filed). Previous builds preserved server-side as `gatehouse.mjs.v1-backup` / `gatehouse.mjs.v2-backup`.
- `anchor-v6.html` — `be558a0495c1cba04e282c5ddfc23edd11e0cf1ce25e355594b9fc47773bf418` — badge `Build: v6 · 90f4b792` (self-verifying token). **Filed, NOT deployed** (the live page is still Build v4; deployment waits for both partners' stamps, as before).
- Frozen core, re-proven byte-identical to the parent packet: `anchor-tx.mjs` `920a6959…` · `MEMO_TEXT.txt` `a760a0da…` (133 bytes) · `verify-gate.mjs` `1801d5c3…`; the page's MEMO_TEXT and its transaction-construction + shape-assert segment are byte-identical between the pre-fix filed v6 and this revision.

## 6 · THE RELAY RECORD (honest, including what the seats caught in THIS round)

Builder → improver → different-family critic → blind verifier, on the frozen bytes, unanimous at the end:

- **Improver seat** (three passes): the first review of the fix round returned NOT CLEARED with six CONFIRMED defects in the builder's first fix draft — worst, the DEAD_PREFLIGHT transition as first built was unsound (it could free the lock on a re-send refusal of possibly-landed bytes, and after a failed-over first contact) — plus the unconditional re-issue plaque, a double-tap race, a fail-open gate read, harness weaknesses, a state-file pin gap, and an unthrottled state door. All were fixed and re-verified; a delta pass on the frozen bytes closed the last two items (a phantom-record retry hole; the cluster pin) — **PASS TO BLIND VERIFIER**.
- **Critic seat (DeepSeek v4-pro, different family)** (three passes): Findings A (record convergence), B (fee-payer check in the landed-transaction verifier), E (strict persist on the BROADCAST stamp), G (plaque path) — **CLOSED**; C, D, F — REJECTED (kept on record); N6 (stale-process overwrite) and N9 (lock-freeing persist durability) — **CLOSED** by the disk-refresh and strict-transition hardening; N1 (the stamped proof) — sound in the single-process deployment; its residual is the manual-clear path, accepted as an **operational discipline item** (see §7), not a code defect. Final stamp: **CONDITIONALLY CLEARED** under the standing fences.
- **Blind verifier seat** (fresh context, artefacts + spec only): **VERIFIED** — all hashes and the badge self-check recomputed; frozen core byte-compared; invariants grep-verified (no clear-on-null, no timeout unlock, CONFIRMED terminal, synchronous check-and-persist, signature verification before any forward); the regression suite independently re-run 13/13. It also caught a harness idempotency flaw (two tests assumed pristine state dirs) — fixed and disclosed; the artefacts were unaffected.

**Disclosed operational catch:** the first live claim against the deployed build was refused 503 by design — the VPS systemd units carry `ProtectSystem=strict`, which made the new state directory read-only to the services (EROFS). The revert machinery worked exactly as built (nothing forwarded, memory reverted, fail closed). The units now carry `ReadWritePaths=/var/lib/provadia-gatehouse`; both services were restarted and the full suites re-run green afterwards. The mainnet record was never touched by the incident (it is still null).

## 7 · NAMED OPEN ITEMS (unchanged fences)

- **Manual-clear discipline (critic N1 residual, adopted):** if a lock ever has to be cleared by hand, it is cleared ONLY on positive evidence (the wallet's historical transactions + the exact memo bytes, independently fetched), with the evidence filed in the build record — never on absence, nulls, or elapsed time.
- **Helius + Alchemy remain PENDING-KEYS** (browser seat); the interim chain stays labeled temporary single-operator redundancy, fail-safe.
- **Gemini Condition 2** (the founder's live desktop Phantom rehearsal) runs against the DEVNET TWIN PAGE, which is still v5-era and must receive the same Amendment 7 patch before that rehearsal — named here so it is not mistaken as done.
- The anchor page deploys only when both partner seats' stamps stand on this addendum's bytes.
- A presentation note from the critic (Delta 4) is queued, not blocking: `confirmedSignature` is served from the same record snapshot as the status by construction.

**The fence at the close:** anchor wallet `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE` — balance **69,099,009 lamports**, **exactly 1 signature** (`32uqxt7Gqk2pEVGKV3mEowvF8g6qDjr2nB1M1Eyu2oAV5VojVbTue1mkDxs9zqGHVBhzEBFtJqGabAtam2ENLiCW`, the funding transfer), re-verified at the close of this addendum's work (suite A4/A5 + a direct read). No mainnet transaction of any kind was made by this fix round. The v6 page is NOT deployed; the live page is Build v4. The Gatehouse server change IS deployed (deployed == filed, §5) because the lock must stand in the broadcast path before any future sign can be permitted; it holds no record (null) and changes nothing about the frozen transaction.

# BLIND VERIFIER REPORT — Gatehouse Fix Round (Relay Law, last seat)

- **Seat:** Blind Verifier, HOUSE axis only (per assignment). No producer reasoning was received or used; every claim below was re-derived from the files with my own commands.
- **Binding skill loaded:** `~/workspace/newwave/tools/crew-skills/two_axis_independent_review/SKILL.md` (read in full before starting).
- **Frozen artefacts under verification (fix-round/):** `gatehouse.mjs`, `anchor-v6.html`, `FROZEN_BYTES_MANIFEST.json`, `regression-results.json`, `regression-run.log`, `gatehouse-regression.mjs`. Artefacts were not edited; the only writes in that directory are the harness's own outputs from my re-runs (results/state dirs) and this report.
- **Acceptance standard:** ChatGPT's verdict as given in the spec (Defect 01, Defect 02, server-side authority binding, the Permanent Rule 1–5, six required regression tests, frozen transaction core).

## 1. Hashes and badge — CONFIRMED

| File | Claimed sha256 | My computed sha256 | Match |
|---|---|---|---|
| fix-round/gatehouse.mjs | 2b16dfd069146fc4abc74c7becac78be1baf73917bf3a8ab13f0758f3a0357c7 | 2b16dfd069146fc4abc74c7becac78be1baf73917bf3a8ab13f0758f3a0357c7 | yes |
| fix-round/anchor-v6.html | be558a0495c1cba04e282c5ddfc23edd11e0cf1ce25e355594b9fc47773bf418 | be558a0495c1cba04e282c5ddfc23edd11e0cf1ce25e355594b9fc47773bf418 | yes |
| anchor-work/anchor-tx.mjs | 920a695952fa30796d1bce958f1674e27ebae733250a8ec6d1def7963a44d6fc | 920a695952fa30796d1bce958f1674e27ebae733250a8ec6d1def7963a44d6fc | yes |
| anchor-work/MEMO_TEXT.txt | a760a0daaacf5aab4bab907aa17f58f5facc85d8e22b018d472396059e98fb28 | a760a0daaacf5aab4bab907aa17f58f5facc85d8e22b018d472396059e98fb28 | yes |
| anchor-work/verify-gate.mjs | 1801d5c332c86ea96a0b536dda1f128e2ff2350798b311838860a1b9a7fbabfc | 1801d5c332c86ea96a0b536dda1f128e2ff2350798b311838860a1b9a7fbabfc | yes |
| fix-round/gatehouse-regression.mjs | 52cd9bc9935d25cc0c06718be62129993b6ede1a8af85e39e5f28fa598096801 (manifest) | 52cd9bc9935d25cc0c06718be62129993b6ede1a8af85e39e5f28fa598096801 | yes |

- **Badge self-check — CONFIRMED:** the page carries `Build: v6 · 90f4b792`; the token occurs exactly once in the file; sha256 of the file with that token replaced by `00000000`, first 8 hex chars = `90f4b792`. Matches the manifest's `pageBadge`.
- Artefact hashes were re-checked **after** my regression re-runs: unchanged.

## 2. Frozen core — CONFIRMED

- **Memo:** the `const MEMO_TEXT = '…'` literal extracted independently from the pre-fix page (`gatehouse-work/anchor-v6.html`) and from the revised page encodes to exactly **133 bytes**, sha256 `a760a0da…98fb28`, byte-equal to `anchor-work/MEMO_TEXT.txt` in both cases.
- **Transaction construction + shape-assert segment:** the segment from `// Mirror of buildAnchorTransaction in anchor-tx.mjs:` through the freshness check (5,528 bytes) is **byte-identical** between the pre-fix and revised pages — sha256 `34480b93285acd5e510ca2f6c38ef12447f5fc857050d68eada6fb286fd0099e` for both. It contains: ComputeBudget price 0, limit `COMPUTE_UNIT_LIMIT` = 210000, Memo instruction with `keys: []`, feePayer = wallet, and the post-sign shape asserts (exactly 3 instructions, price 0, limit 210000, Memo program, 0 keys, memo bytes byte-equal, feePayer exact).
- **Fee 5000:** pinned in code on both sides — page `verifyLandedTransaction` rejects any landed fee `!== 5000` (anchor-v6.html:534); gatehouse `assertAnchorTx` pins sigCount 1 + header [1,0,2] (gatehouse.mjs:265–268) and the convergence check requires `meta.fee === 5000` (gatehouse.mjs:840).
- **No keys in the gatehouse:** grep for `privateKey|secretKey|mnemonic|seed|Keypair|.sign(|signTransaction|createSign` in gatehouse.mjs finds only the header comment stating it never holds keys. All signing stays in the wallet (`provider.signTransaction`, page only).

## 3. Code invariants (read in the code, not the comments) — CONFIRMED

- **No clearing on null/absent RPC — CONFIRMED.** Page: `reconcileAnchorSignature` (anchor-v6.html:423–445) returns `failed` only on `st.err`, `confirmed` only on confirmed/finalized status or a history candidate that passes `verifyLandedTransaction` (exact memo bytes + payer), and `locked` for everything else, including null status and unreadable/empty history. `clearAnchorRecord` has exactly three call sites, all gated on positive evidence: (a) :894–899 — expiry outcome **and** a successfully read Gatehouse record that is absent / `DEAD_PREFLIGHT` / `FAILED_ONCHAIN`; (b) :965–966 — polling verdict `failed`, which requires `st.err`; (c) :1061–1066 — reconcile outcome `failed`. Gatehouse: the observation block transitions only on positive evidence; the code explicitly does nothing on `st === null` (gatehouse.mjs:822) and on `txr === null` (:827).
- **No timeout-based unlock — CONFIRMED.** Every `setTimeout`/`setInterval` in both files was inspected: RPC timeouts, confirmation polling delays, and (gatehouse.mjs:134) rate-limit bucket eviction only. No record transition is keyed on elapsed time, `savedAt`, or `claimedAt` (timestamps are written, and `updatedAt` is compared only to adopt a newer on-disk record in `refreshAnchorRecordFromDisk`).
- **CONFIRMED is terminal — CONFIRMED.** Gatehouse: `transitionAnchorRecord` returns without change when current status is CONFIRMED and target is not (gatehouse.mjs:433); `transitionAnchorRecordStrict` likewise (:419); `claimAnchorLock` never downgrades a CONFIRMED record (BROADCAST stamp applies only from CLAIMED, :452). Page: CONFIRMED records only ever produce the `anchored` stop (:1030–1035, :1057–1059) or a mirror graduation *to* CONFIRMED (:951, :1031, :1058).
- **Verified persistence + server claim before every broadcast — CONFIRMED.** The page has exactly two `sendRawTransaction` call sites (anchor-v6.html:824 primary, :842 failover of the *same* raw bytes), both inside `driveAttempt` strictly after `persistAnchorRecordVerified(anchorRec)` throws on failure (:796–798 — write to both stores, read back byte-identical, at least one store must verify) and after `await claimServerAnchorRecord(...)` throws on failure (:800–821). No other broadcast path exists in the page. Server side, a `sendTransaction` independently re-claims before forwarding (gatehouse.mjs:745) and refuses on `broken` (503) or `conflict` (403).
- **Server claim is synchronous check-and-persist — CONFIRMED.** `claimAnchorLock` (gatehouse.mjs:446–495) contains no `await`; the check, the in-memory set, and `persistAnchorRecord()` (tmp write + fsync + rename + directory fsync, :343–354) complete before the claim handler answers (:660–668). A persist failure reverts memory and returns `broken` → HTTP 503, for both the claim door and the BROADCAST stamp (:458–467, :484–493).
- **Ed25519 verified against the pinned payer before any forward — CONFIRMED** (see also the REJECTED suspicion below for the exact mechanism): on both the claim door (:653–658) and the send path (:726–743), `assertAnchorTx(wire)` runs first and pins `accountKeys[0] === ANCHOR_PAYER` (:271); `verifyAnchorSignature` (:510–521) then runs `crypto.verify` (ed25519) over the message bytes against that first account key. Only after both does any forward happen.

## 4. Suspicions I tried to prove and could not — REJECTED (kept on record)

- **"verifyAnchorSignature verifies against the transaction's own first key, not the pinned payer, so a self-signed foreign tx could take the lock."** REJECTED: in isolation the function does use `accountKeys[0]`, but it is unreachable except behind `assertAnchorTx`, which refuses unless `accountKeys[0] === ANCHOR_PAYER` (gatehouse.mjs:271, call order :653→:655 and :726→:740). The composition pins the payer.
- **"clearAnchorRecord is the old Defect-02 clear under a new name."** REJECTED: all three call sites require positive evidence (see §3); a null status routes to `locked`, never to a clear (anchor-v6.html:444, :1075–1076; regression R3/R4 corroborate behaviourally).
- **"The gatehouse setInterval is a timed unlock."** REJECTED: gatehouse.mjs:134–141 evicts only rate-limit token buckets; it never touches `anchorRecord`.

## 5. Independent regression re-run — CONFIRMED, with one CONFIRMED harness defect (non-blocking)

I ran the harness myself three times. The first two attempts did **not** reproduce the filed totals, and the reason matters, so it is recorded in full:

- **Run 1 (in-place, directory as filed):** 10 PASS, R8 FAIL, then a harness crash at `gatehouse-regression.mjs:580` during R10 (no summary printed; exit 1; filed `regression-results.json` untouched — verified by diff). Cause, proven from the logs and state files: R8 and R10 are the only tests started via `startGateRaw` with **neither a state wipe nor a seed** (harness :504, :569; contrast `startGate`'s `rmSync` at :50 and `seedGateState` at :354/:380). They silently assume a pristine `state-r8/` / `state-r10/`. The filed run's own leftover records (state-r8: sig `5FocvqWi…`, BROADCAST, timestamps 2026-11-25T02:23:26Z — the filed run itself) made my R8 gate start with the lock already held, so the new claim correctly drew 409 and R8's setup assertions failed; in R10 the pre-existing record routed the page down the reconciliation path, the `reissue` element was never created, and the harness crashed reading it. **The mechanism behaved correctly in both cases — it refused a second claim because a BROADCAST lock stood.** This is a harness idempotency defect, not a mechanism failure and not a devnet flake.
- **Run 2 (state-r8/state-r10 removed):** R8 now PASS, but R10 crashed the same way — this time because an orphaned gate process from run 1's crash still held port 18748 (`EADDRINUSE` in the gate log); `waitGate` was answered by the orphan, which carried the old record. Ports were verified free afterwards.
- **Run 3 (clean state dirs, no orphan listeners):** **`=== REGRESSION SUMMARY (Part E): 13/13 PASS ===`, exit 0.** All 13 detail lines match the filed outcomes in substance (fresh signatures, as expected on devnet). The harness-rewritten `regression-results.json` has the identical id/pass list as the filed snapshot I preserved before running.

**CONFIRMED finding (harness, minor):** `gatehouse-regression.mjs` is not idempotent in a dirty directory — R8/R10 neither wipe nor seed their state dirs, and a crashed run can orphan a gate that holds its port into the next run. The filed 13/13 is genuine (the filed state files' timestamps and signatures are the filed run's own, and I reproduced 13/13 from the harness's assumed clean starting condition), but anyone re-running in place without clearing `state-r8/` and `state-r10/` first will see a spurious R8 FAIL + R10 crash. Recommend the producer make R8/R10 use the wiping start (or seed explicitly) so the evidence is re-runnable as filed.

**NEEDS-CHECK (environment, not an artefact):** a pre-existing gatehouse process (PID 52756, started 01:54, before both the filed run and mine) sits spinning at high CPU with `GATEHOUSE_PORT=18746` and state path `/proc/provadia-anchor/anchor-record.json`, never reaching listen (no answer on any test port). It did not affect any run (R1b's own gate bound 18746 successfully in all three of my runs). What owns it and whether it should be killed is for the captain to resolve.

## 6. The six required tests in the filed results — CONFIRMED

All six are present in the filed `regression-results.json` with `pass: true`, and each detail string supports the claimed outcome (quoted from the filed file; my run 3 reproduced each with fresh signatures):

1. **Both browser storages fail → no broadcast** = R1: "wallet signed x1 · error=\"…Browser storage is unavailable…refusing to broadcast…\" · gate record=null". ✔
2. **Reload immediately after broadcast → record survives, re-issue blocked** = R2a (landed + verified on devnet, gate record CONFIRMED) + R2b ("signTransaction calls=0 · …already anchored — the Gatehouse record stands CONFIRMED…"). ✔
3. **RPC null for a previously LANDED tx → record must not clear** = R3: local mirror after="CONFIRMED", gate record graduates CONFIRMED via history + exact-memo reconciliation. ✔
4. **Provider history incomplete after expiration → locked** = R4: "signTransaction calls=0 · local mirror after=\"SIGNED_UNCONFIRMED\" · gate record … \"BROADCAST\"" — nothing cleared. ✔
5. **Previously confirmed anchor reopened → recognized, stops** = R5: "signTransaction calls=0 · …already anchored…". ✔
6. **Two concurrent sessions → at most one broadcast, server lock decides** = R6: "claims=[200,409] · winner devnet status=finalized · loser devnet status=null · loser send HTTP 403 duplicate-anchor prevention". ✔

Plus R1b, R5b, R7, R8, R9, R10 — all `pass: true` in the filed results and all reproduced in my run 3.

## Axis summary (House axis)

- CONFIRMED: 6 verification groups (§1 hashes/badge, §2 frozen core, §3 five code invariants, §5 reproduction of the filed 13/13, §6 six required tests) + 1 harness idempotency defect (real, evidence above, does not touch the shipped artefacts or the truth of the filed results).
- NEEDS-CHECK: 1 — ownership/disposal of the stray pre-existing gatehouse process PID 52756 (captain to resolve; no artefact impact).
- REJECTED: 3 suspicions (§4), kept on record.
- Worst confirmed item: the harness non-idempotency in §5 — the shipped page and gatehouse pass every acceptance item; only the evidence harness needs a wipe/seed fix before its next in-place re-run.

**VERIFIED**

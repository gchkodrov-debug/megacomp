# IMPROVER FINDINGS — Gatehouse Amendment 7 fix round (Relay Law, improver seat)

Loaded skill: `~/workspace/newwave/tools/crew-skills/two_axis_independent_review/SKILL.md`
(Two-Axis Independent Review — read in full before reviewing; findings graded only
CONFIRMED / NEEDS-CHECK / REJECTED, with file:line evidence; axes reported separately, never merged.)

## Fixed point under review (frozen bytes)

- `fix-round/gatehouse.mjs` (735 lines)
- `fix-round/anchor-v6.html` (1068 lines, BUILD_LABEL `Build: v6 · 8073f38a`)
- `fix-round/gatehouse-regression.mjs` (470 lines) + `fix-round/regression-results.json` (9 entries, all PASS)
- Reference only: `gatehouse.mjs` / `anchor-v6.html` one level up (pre-fix filed versions)

## Axes

- **Promise axis** — does the fix round deliver what Amendment 7 promised: Defect 01 closed
  (verified persistence before broadcast, fail closed), Defect 02 closed (never clear on null),
  and the Permanent Rule (1 one inscription/one durable identity · 2 no broadcast without a
  verified record · 3 no second signature while the first is unresolved · 4 no clearing a
  confirmed inscription on incomplete information · 5 no automatic unlocking after a timeout),
  with the server-side duplicate-prevention lock required, not optional.
- **House axis** — does it obey the standing house rules: frozen transaction construction
  (3 instructions, ComputeBudget price 0 / limit 210000, 133-byte memo, fee 5000, payer-exact
  founder signing), the gatehouse never holds keys and never signs, fail-closed persistence
  discipline, rate-limit / CSP / origin-fence discipline, and honest verification evidence.

---

# PROMISE AXIS

## CONFIRMED

### P-C1 — `DEAD_PREFLIGHT` frees the lock on evidence that does NOT prove "never submitted" when the record is already BROADCAST, and under upstream failover ambiguity. Rules 3 + 4 broken in the server lock itself.
- Evidence: `gatehouse.mjs:701-707` — a send whose response error matches `/blockhash/i` transitions the record to `DEAD_PREFLIGHT` (lock-free, `gatehouse.mjs:324`) when the status is `CLAIMED` **or `BROADCAST`**.
- Evidence: `gatehouse.mjs:391` — the send path itself transitions `CLAIMED → BROADCAST` inside `claimAnchorLock` *before* forwarding, so at observation time the code cannot distinguish "this very send is the first forward of these bytes" from "an earlier send of these bytes was already forwarded (and may have landed)".
- Evidence: `gatehouse.mjs:470-485` (`forward()`) — broadcasts fail over on HTTP 429/5xx and on network error/timeout (`postUpstream`, 3.5 s timeout). A primary attempt that times out or 5xxs may already have submitted the bytes; a fallback's blockhash refusal is then treated as proof of non-submission.
- Failure scenario A (re-send): record is `BROADCAST` from a forwarded send that in fact landed. The same bytes are re-sent through the gatehouse after blockhash expiry → upstream preflight answers "Blockhash not found" → record becomes `DEAD_PREFLIGHT` → a second, *different* signature can claim and broadcast. That is a duplicate anchor manufactured by the lock that exists to prevent it.
- Failure scenario B (failover): founder signs near expiry (the page's freshness check is advisory and falls through on a failed height read, `anchor-v6.html` driveAttempt), primary times out after possibly submitting, fallback refuses at preflight → lock freed → re-issue signs and broadcasts a second transaction while the first may have landed.
- The header comment at `gatehouse.mjs:309-313` claims the preflight refusal is "proof those exact bytes were never submitted". That is true only for a provably first-and-only forward. R7 tests only that sound case (see P-C6).
- Suggested fix: persist, *before* forwarding, a per-record forward counter and an "ambiguous forward" flag (set when any upstream attempt ends in timeout / 429 / 5xx after the request was written). Transition to `DEAD_PREFLIGHT` only when the refusing response belongs to the record's first forward, no prior forward exists, and no attempt of this forward was ambiguous. Otherwise leave the record `BROADCAST` (locked) for authoritative reconciliation. Pass a per-request token from the send handler ("this request performed the CLAIMED→BROADCAST transition and the record had never been forwarded") into the observation block instead of keying off the stored status alone.

### P-C2 — The re-issue plaque is offered unconditionally after a post-claim expiry, and the re-issue handler never re-runs the gate. A founder tap on it can produce a second, different signature while the server record is still live. Rule 3 broken on the page.
- Evidence: `anchor-v6.html:861-866` — on an `expired` outcome the local mirror is cleared only if the server record reads absent / `DEAD_PREFLIGHT` / `FAILED_ONCHAIN`; if the server still holds `BROADCAST`, the mirror correctly stays.
- Evidence: `anchor-v6.html:868-873` — immediately after that check, `offerReissue(attempt, …)` runs **unconditionally** whenever attempts remain. The "mirror stays locked" branch and the "tap to sign a fresh stamp" plaque are both live at once.
- Evidence: `anchor-v6.html:1053-1065` — the re-issue handler calls `runAttempt(attempt)` directly; it never calls `evaluateAnchorGate`. The only gate evaluation in the page is in the Sign handler (`anchor-v6.html:1037`).
- Failure path: broadcast reached the gatehouse, the send was refused with a blockhash-class error whose wording the *page* matches (`isBlockhashExpiry`) but the *gatehouse's* observation regex / upstream response shape did not transition (or the record was already `BROADCAST` per P-C1) → page keeps the mirror, still shows the plaque → founder taps → `driveAttempt` builds a fresh transaction, the wallet signs a **second, different signature**, the local mirror is overwritten with the new signature (`anchor-v6.html:780`), and only then does the server claim refuse (409). Rule 3 is violated at the wallet, and the local mirror's durable identity (Rule 1) now names a transaction the gatehouse never recorded.
- Suggested fix: offer the plaque only when no record is pending **or** the same server predicate used for mirror-clearing (server read OK and record absent / `DEAD_PREFLIGHT` / `FAILED_ONCHAIN`) holds. In every other expiry case, end in the locked state (`submitted = true`, locked message, no plaque). As defence in depth, re-run `evaluateAnchorGate` at the top of the re-issue handler and abort to its verdict on `anchored` / `locked` / `unreadable`.

### P-C3 — Sign-handler race: no synchronous latch before `await evaluateAnchorGate`, so two taps can run two attempts and ask the wallet for two signatures.
- Evidence: `anchor-v6.html:1021-1025` — the handler's guard reads `signing || submitted || awaitingReissue`; `anchor-v6.html:1037` then awaits the gate (multiple network reads).
- Evidence: `anchor-v6.html:844` — `signing = true` is set only inside `runAttempt`, i.e. *after* the gate await resolves. During the gate window both flags are still false.
- Contrast inside the same file: the Connect handler sets `connecting = true` synchronously, and the re-issue handler flips `awaitingReissue = false` synchronously (`anchor-v6.html:1057-1060`) — both are double-tap safe; the Sign handler is the one entry that is not.
- Failure path: double-click / double-tap (or tap + Enter) during gate evaluation → two handlers pass the guard → two `runAttempt(1)` → two `driveAttempt` executions → two Phantom signing prompts for two different blockhashes/signatures, with interleaved local persists and server claims. The server lock still prevents a second *broadcast*, but Rule 3 ("no second signature while the first remains unresolved") is violated at the wallet, and the local mirror ends up naming whichever persist landed last.
- Suggested fix: take a synchronous entry latch as the handler's first statement (e.g. set `signing = true` and disable `signBtn` before any await), and release it on every exit path that does not hand ownership to `runAttempt`'s own finally block.

### P-C4 — The gate fails open to a second wallet signature when the server state read fails and no local mirror exists; a refused claim then leaves the local mirror pointing at a never-broadcast second signature, which can later become the governing record and lock the page on bytes that were never sent.
- Evidence: `anchor-v6.html:970-971` — a failed `fetchServerAnchorState()` is collapsed to `serverRec = null`, indistinguishable from "server read OK, no record".
- Evidence: `anchor-v6.html:982-987` — with `serverRec = null` and no local record, `governing` stays null and the gate returns `proceed`. (With a local record the same failure fails closed via reconciliation — the asymmetry is the defect.)
- Evidence: `anchor-v6.html:780-787` — `driveAttempt` persists the local mirror for the new signature *before* the server claim, and the claim-failure throw leaves that mirror in place.
- Failure path: the gatehouse holds an unresolved `BROADCAST` record from another browser/device; this browser's state read times out (4 s `timedFetch`) → gate proceeds → founder signs a different transaction → mirror written for signature #2 → claim refused 409 (lock held by #1) → mirror still names #2 as `SIGNED_UNCONFIRMED`. If record #1 later frees on positive failure evidence, the governing-signature selection (`anchor-v6.html:982-986`) falls to local #2 → reconciliation of #2 returns null status + no landed memo → outcome `locked`, permanently, for bytes that were never broadcast and never recorded server-side. Recovery requires manual clearing — the exact Defect-02-shaped trap, created by the page itself.
- Suggested fix: (1) Make the gate distinguish "server read OK, no record" from "server unreadable": unreadable must fail closed with a retry message even when no local mirror exists (a first-ever signing loses nothing by waiting for a readable gatehouse, and the claim step needs the gatehouse anyway). (2) On a claim conflict, re-read the server state and mirror the *server's* record (signature + status), or clear the just-written local mirror — never leave the mirror naming the refused, unbroadcast signature.

### P-C5 — Regression R5 does not test what its name claims; it passes on the server branch and would pass even if the local-CONFIRMED branch were deleted.
- Evidence: `gatehouse-regression.mjs:311-325` (R5 block) seeds a local `CONFIRMED` mirror but runs against the same gate (port 18743, `state-r2`) whose server record R2a already drove to `CONFIRMED`.
- Evidence: `regression-results.json` — R5's pass detail string is identical to R2b's ("The Gatehouse record stands CONFIRMED on-chain…"), i.e. the pass came from `evaluateAnchorGate`'s first branch (`anchor-v6.html:973-975`), never reaching the local-CONFIRMED branch (`anchor-v6.html:976-978`).
- Suggested fix: re-run R5 against a fresh gate instance with an empty state dir, so only the local mirror can produce the stop; keep the current arrangement as the R2b variant it actually is.

### P-C6 — The regression suite has no test for the dangerous DEAD_PREFLIGHT variant (P-C1), so the claimed 9/9 PASS is compatible with the worst defect in this round shipping.
- Evidence: `gatehouse-regression.mjs:420-455` (R7 block) exercises only claim → wait for expiry → *first* send refused at preflight → `DEAD_PREFLIGHT`. No test broadcasts successfully (or ambiguously) first and then replays the same bytes post-expiry.
- Evidence: `regression-results.json` R7 detail confirms only the first-send shape was exercised.
- Suggested fix: add R8 — claim, broadcast and land a transaction (devnet, as R2a already can), then re-send the identical bytes after expiry with the upstream answering a blockhash-class error, and assert the record does **not** become `DEAD_PREFLIGHT` and a claim for a different signature is still refused (409). Add the failover variant (stub primary that accepts-then-times-out, fallback returning the blockhash refusal) if the stub can express it.

## NEEDS-CHECK

### P-N1 — `getTransaction` observation confirms on any non-null result, including a result with no `meta`.
- Evidence: `gatehouse.mjs:718-720` — `else if (txr) transitionAnchorRecord('CONFIRMED', 'observed-landed')`; only the error branch inspects `txr.meta`.
- Unresolved fact: can Helius/Alchemy (or the tier-3 read upstream) ever return a non-null `getTransaction` result lacking `meta` / `slot` for this route? If yes, `CONFIRMED` (terminal, lock-holding) can be entered on incomplete information, against the spirit of Rule 4. Resolvable by the critic checking provider response shapes, or by the builder hardening the transition to require `txr.meta && typeof txr.slot === 'number'`. No severity carried until resolved.

### P-N2 — The concurrent-*send* race (no prior claims) is untested; code inspection says it is safe, but nothing proves it.
- Evidence: R6 (`gatehouse-regression.mjs:380-418`) races *claims* via `Promise.all`, then sends sequentially. The send path's own claim (`gatehouse.mjs:649`, synchronous, before the first await at `gatehouse.mjs:687`) is exercised only sequentially (R1b, R7).
- Unresolved fact: do two simultaneous `sendTransaction` calls with different signatures through one gate instance yield exactly one forward? Expected yes from the synchronous check-and-persist, but the suite should prove the path the brief actually names. Resolvable by adding the race test.

### P-N3 — R3/R4 invoke "expired blockhash" in their names, but the gate they exercise never reads block height.
- Evidence: `evaluateAnchorGate` (`anchor-v6.html:968-1019`) contains no block-height read; expiry plays no part in the locked/confirmed outcomes R3/R4 assert. The tests genuinely prove the Defect-02 behaviour (null + incomplete history → locked; null + landed memo in history → confirmed), but the expiry clause of their names is vacuous coverage.
- Unresolved fact: intended (expiry is meaningless under Rule 5, so the builder considers it covered by construction) or an oversight? Resolvable by the builder/critic confirming the naming is deliberate, or renaming the tests to match what they prove.

### P-N4 — A local `CONFIRMED` mirror is trusted with the server record unreadable.
- Evidence: `anchor-v6.html:976-978` — local `CONFIRMED` + `(!serverRec || …)` returns `anchored` with no chain read, including when `serverRec` is null *because the read failed* (see P-C4's collapsed null).
- Unresolved fact: is a stale or wrong-device local `CONFIRMED` (same storage key, same memo text) an acceptable basis for telling the founder "already anchored"? The failure direction is denial-of-anchor, not duplication. Resolvable by the critic ruling whether this branch must re-verify on-chain whenever the server record could not be read.

## REJECTED

### P-R1 — Suspected signature-verification bypass via shortvec / sigCount games. REJECTED — tried and could not prove it.
- `gatehouse.mjs` `readShortvec`: at most 3 bytes, canonical-form re-encode check, u16 bound on the third byte. `assertAnchorTx` pins `sigCount === 1`, header `[1,0,2]`, exactly 3 account keys in pinned order, and the exact instruction bytes *before* `verifyAnchorSignature` runs on either door (claim handler and send handler both assert first). `parseSignedWire` re-checks `sigCount !== 1`, and `verifyAnchorSignature` builds the ed25519 key from `accountKeys[0]`, which the assert has already pinned to `GATEHOUSE_ANCHOR_PAYER`. No encoding path found where gateway and verifier parse different streams (base64 canonical round-trip is also enforced in `extractTxBytes`).

### P-R2 — Suspected remaining "clear on null" path. REJECTED for the record-clearing itself (the re-issue *offer* is the separate live defect, P-C2).
- Server observation: `gatehouse.mjs:714-721` transitions only on `st.err`, on confirmed/finalized, or on a landed transaction; both null branches carry explicit no-transition comments and no code. Page: `reconcileAnchorSignature` returns `locked` for null status / empty or unreadable history. Every `clearAnchorRecord()` call site was audited: runAttempt expiry (gated on the server reading absent / `DEAD_PREFLIGHT` / `FAILED_ONCHAIN`, `anchor-v6.html:861-866`), the on-chain-failure verdict (only after an `err` status read, which frees the server lock on the same pass through the gatehouse), and the gate's `failed` outcome (positive `err` evidence only, `anchor-v6.html:1008`).

### P-R3 — Suspected race in the server claim/lock check-and-set. REJECTED.
- `claimAnchorLock` (`gatehouse.mjs:387-408`) is fully synchronous: check, `setAnchorRecord` (persist-or-throw), return — no await anywhere in it. The claim handler's `req.on('end')` callback is synchronous end to end. In the RPC handler the claim at `gatehouse.mjs:649` precedes the first await (`forward`, `gatehouse.mjs:687`). On Node's single thread two concurrent requests cannot both win. R6's `[200, 409]` claim result is consistent with this reading.

### P-R4 — Suspected false "confirmed" via `verifyLandedTransaction` ignoring `meta.err`. REJECTED in context.
- In the reconciliation path, history entries carrying `err` are skipped before verification (`reconcileAnchorSignature`). In the post-signing path, the status poll classifies `st.err` as `failed` before verification is ever called. A memo-shaped transaction that failed on-chain therefore does not reach the verifier as a success candidate in either flow. (Requiring a `meta.err` check inside the verifier anyway would be cheap defence in depth, but its absence is not a live defect.)

**Promise axis line: CONFIRMED 6 · NEEDS-CHECK 4 · REJECTED 4 — worst confirmed: P-C1 (DEAD_PREFLIGHT frees the server lock on evidence that does not prove non-submission once a broadcast may already have happened).**

---

# HOUSE AXIS

## CONFIRMED

### H-C1 — The state-file loader trusts a foreign record: it validates shape only, never the record's payer, memo hash, or cluster against this instance's pins.
- Evidence: `gatehouse.mjs:358-365` (`loadAnchorStore`) — a parsed record is accepted if `signature` is a string and `status` is in the enum. `rec.payer`, `rec.memoSha256`, and `rec.cluster` are written at claim time (`gatehouse.mjs:396-399`) but never checked at load.
- Impact: a state file from a rehearsal instance, a devnet run, or a previous configuration placed at the production `GATEHOUSE_ANCHOR_STATE_PATH` becomes the authoritative lock as-is. A foreign `CONFIRMED` record would block the real anchor permanently (page reports "already anchored", sends conflict); a foreign lock-free status silently vacates the lock. The fix round's own directory shows how many state dirs this workflow creates (`state-r1`, `state-r2`, `state-r3`, `state-r4`, `state-r6`, `state-r7` in the regression harness).
- Suggested fix: at load, require `rec.payer === ANCHOR_PAYER`, `rec.memoSha256 === sha256(MEMO_BYTES)`, and `rec.cluster === CLUSTER_LABEL`; any mismatch marks the store broken (the existing fail-closed path), never trusted and never silently discarded.

### H-C2 — The new `anchor-state` sub-path is the only unthrottled door in the service.
- Evidence: `gatehouse.mjs:531-534` — `GET /v1/night-brick/anchor-state` answers with no `takeToken` call. The claim sub-path is bucketed (`gatehouse.mjs:536-538`), and every RPC route is bucketed in the main handler. The state read is also a status oracle for the anchor record, available at line rate to any caller that passes the origin fence (including no-Origin non-browser callers, per the service's standing fence semantics).
- Suggested fix: give `anchor-state` its own token bucket in the heartbeat class (the page polls it rarely; 60/min per IP is generous), keyed distinctly like the claim bucket.

## NEEDS-CHECK

### H-N1 — A failed persist inside `transitionAnchorRecord` leaves memory and disk divergent, and one divergence path has no re-drive.
- Evidence: `gatehouse.mjs:372-382` — transitions mutate the in-memory record, then swallow persist errors ("next observation re-drives it"). For status observations that is true. For `DEAD_PREFLIGHT` it may not be: once the page clears its mirror and the founder signs fresh, nothing re-observes the old signature's send; if the process then restarts, the disk still holds the old record as `BROADCAST` while the live session had already freed and replaced it — the resurrected record locks against the new anchor and can only be reconciled manually.
- Unresolved fact: whether the deployment's disk can fail a single fsync/rename transiently in this pattern. Resolvable by the builder either demonstrating the failure mode is impossible in the deploy environment, or hardening the code: a transition persist failure marks the store broken (sends/claims refuse, the existing fail-closed posture) until a restart reloads a consistent record. No severity carried until resolved.

### H-N2 — Nothing in the bytes prevents two gatehouse processes from sharing one state path, which would defeat the synchronous-claim argument.
- Evidence: `persistAnchorRecord` writes a fixed temp name (`ANCHOR_STATE_PATH + '.tmp'`) and the in-memory mirror is per-process; the atomicity proof (P-R3) holds only within one process.
- Unresolved fact: does the deployment ever run more than one instance against one `GATEHOUSE_ANCHOR_STATE_PATH` (rolling restart overlap, a rehearsal instance pointed at the production path)? Resolvable from the deploy unit files, which are outside this review's fixed point. If overlap is possible, an inter-process file lock or a single-instance guard at startup is required.

## REJECTED

### H-R1 — Suspected change to the frozen transaction. REJECTED.
- Diffed against the pre-fix filed page: the construction is byte-identical in substance — ComputeBudget price 0 then limit 210000 then the Memo instruction with the unchanged `MEMO_TEXT` constant, `feePayer` = connected wallet, fee verification at 5000 lamports, the §3.1 shape assert on the wallet-returned transaction unchanged. Only line offsets and the `BUILD_LABEL` checksum changed (`87bac51b` → `8073f38a`), which the badge discipline *requires* when the file changes. On the server, the byte assert's pinned constants (`IX0_HEX`, `IX1_HEX`, `EXPECTED_HEADER [1,0,2]`, program IDs) are unchanged from the pre-fix version; Amendment 7 only added verification and the lock around the existing assert.

### H-R2 — Suspected CSP or origin-fence regression on the new sub-paths. REJECTED.
- The page CSP is unchanged (`anchor-v6.html:6`); `connect-src https://rpc.provadiacoin.com` covers both sub-paths because they live on the same host and the page builds their URLs from `RPC_ENDPOINTS[0]` (`anchor-v6.html:373-390`). Server-side, the sub-path block (`gatehouse.mjs:522-530`) enforces the same origin fence, CORS headers, and OPTIONS discipline as the RPC routes. Requests with no `Origin` header pass — identical to the pre-existing RPC routes' semantics — and cannot poison the lock, because the claim door additionally requires an ed25519 signature verifying against the pinned payer over the exact frozen bytes (see P-R1).

### H-R3 — Suspected torn-write / state-corruption path. REJECTED.
- `persistAnchorRecord` (`gatehouse.mjs`) writes a temp file, fsyncs it, renames over the state file, and fsyncs the directory: a crash leaves the old record or the new one, never a torn file. A corrupt or unreadable file at load sets `anchorStoreBroken` and sends/claims fail closed (`gatehouse.mjs:356-365`), a behaviour R1b proves end-to-end (claim 503, send 503, nothing landed). The one soft spot in this area is graded separately as H-N1 (transition persist divergence), not as corruption.

### H-R4 — Suspected information leak via `/healthz` naming the anchor signature. REJECTED as a defect.
- A signature is public on-chain material the moment the transaction lands. Before broadcast, a third party learning the claimed signature gains only the ability to submit the founder's *own already-signed bytes* — which produces the same signature and the same single inscription, never a second or different one. The exposure matches the pre-existing health-endpoint shape and enables no duplicate.

**House axis line: CONFIRMED 2 · NEEDS-CHECK 2 · REJECTED 4 — worst confirmed: H-C1 (state-file loader accepts a foreign record — wrong payer/memo/cluster — as the authoritative lock).**

---

# CLOSING VERDICT

**Do NOT pass these bytes to the critic seat as-is.** Four confirmed Promise-axis defects
(P-C1, P-C2, P-C3, P-C4) each open a path to a second signature — and in P-C1's case a second
*broadcast* — while a first anchor is unresolved, which is the exact failure Amendment 7 exists
to close; the claimed 9/9 regression PASS does not cover any of them (P-C5, P-C6). Fix
P-C1 → P-C4 first, apply the cheap H-C1 loader validation in the same round, add the R8 /
send-race / isolated-R5 tests so the fixes are proven rather than asserted, and re-run the
regression suite before the critic seat sees the round. The NEEDS-CHECK items (P-N1…P-N4,
H-N1, H-N2) go to the critic unresolved, with the resolving party named on each.
---

# FIX ROUND 2 RE-REVIEW (improver seat, re-review pass — Relay Law)

Loaded skill: `~/workspace/newwave/tools/crew-skills/two_axis_independent_review/SKILL.md`
(Two-Axis Independent Review — read in full before this pass; findings graded only
CONFIRMED / NEEDS-CHECK / REJECTED, with file:line evidence; axes reported separately,
never merged. This pass re-reviews the fix round fresh, on both axes, in the code —
no builder claim was taken on its word.)

## Fixed point — FREEZE FAILURE (read this first)

- Claimed by the builder: `gatehouse.mjs` sha256 `879ec9ac…`, `anchor-v6.html` sha256
  `be558a04…` (badge "Build: v6 · 90f4b792").
- Recomputed by this seat: `anchor-v6.html` = `be558a0495c1cba04e282c5ddfc23edd11e0cf1ce25e355594b9fc47773bf418`
  — MATCHES the claim, and its badge self-verifies (sha256 of the file with the badge
  token zeroed = `90f4b7924289…` = the badge). The page bytes are frozen and as claimed.
- `gatehouse.mjs` matches the claimed hash at NO point in this review. At review start
  it was sha256 `071bd78dd7fe…` (816 lines, mtime 2026-11-25 02:12:32 UTC). MID-REVIEW
  it changed again: sha256 `4d3113ef63dd6b11117c935d614791a91f115eb2784884c91804cddc458381b7`
  (859 lines, mtime 02:17:15 UTC), gaining `refreshAnchorRecordFromDisk()` (critic N6)
  and `transitionAnchorRecordStrict()` (critic N9). All gatehouse grades below are
  against the CURRENT bytes (`4d3113ef…`), re-read in full after the change and
  hash-stable since.
- Consequence for the regression evidence: the 13/13 PASS run (gate logs
  2026-11-25T02:12:49Z–02:13:50Z in `regression-run.log`, results in
  `regression-results.json`) executed the SUPERSEDED 816-line bytes (file mtime
  02:12:32 UTC, before the run). The current 859-line bytes have NO regression
  evidence, and the new N6/N9 mechanisms have no tests at all (no reference to the
  strict-transition or disk-refresh behaviour anywhere in `gatehouse-regression.mjs`).
  Per the loaded skill: a review of a moving target proves nothing about the copy
  that ships. This is graded as new confirmed defect R2-C2 below.

---

# PROMISE AXIS — disposition of the original CONFIRMED findings

## P-C1 — DEAD_PREFLIGHT evidence — **CLOSED** (in the current bytes)
- The transition now requires ALL THREE guards in one condition: upstream verdict
  matches `/blockhash/i` · record status `BROADCAST` · `anchorSendStamped` ·
  `result.contacts === 1` (`gatehouse.mjs:789-790`), and the transition itself is
  now the STRICT variant (`gatehouse.mjs:804`, `transitionAnchorRecordStrict` at
  `gatehouse.mjs:417-430`) — a persist failure reverts memory, so a non-durable
  DEAD_PREFLIGHT is never served.
- `forward()` counts upstream contacts per request and returns the count on both
  the success and all-failed paths (`gatehouse.mjs:550-571`); read-only tier3 is
  skipped before counting for broadcasts. An all-upstreams-failed send returns
  502 before the observation block ever runs, so a timeout can never free the lock.
- `stamped` is returned only by the CLAIMED→BROADCAST stamp branch of
  `claimAnchorLock` (`gatehouse.mjs:470`), which is synchronous and — per Finding E
  below — persists strictly before any forward. A re-send of already-BROADCAST
  bytes, a direct send-claim (record created as BROADCAST, outcome `claimed`, no
  `stamped`), and a second concurrent send of the same bytes all reach the
  observation block with `stamped` unset. The R7 failure mode (keying on stored
  status) is gone: the key is the per-request flag, exactly as the refinement
  history required.
- Re-attack, sequences tried and killed: (a) re-send after landing — `stamped`
  false, R8 proves the record stays BROADCAST; (b) failover refusal — contacts=2,
  R10 proves no DEAD_PREFLIGHT; (c) single-upstream timeout — 502 pre-observation;
  (d) stamp-persist failure + restart resurrecting CLAIMED, then re-send — the
  re-send IS a genuine first forward from the durable record's viewpoint because
  the failed stamp means the earlier send was refused before forwarding
  (Finding E), so a blockhash refusal there is sound; (e) DEAD transition persist
  failure — strict revert (above). Surviving attack surfaces are recorded as
  NEEDS-CHECK R2-N3/R2-N4 below; none is reachable inside the single-process,
  gatehouse-only-broadcast model the design states.

## P-C2 — Re-issue plaque offered unconditionally — **CLOSED**
- The plaque is offered only when a FRESH Gatehouse read shows the lock free
  (record absent / `DEAD_PREFLIGHT` / `FAILED_ONCHAIN`) AND no local record
  stands: `anchor-v6.html:910-913` (`lockFree`). Every other expiry outcome stops
  locked with the "NOT proven dead" message and `submitted = true`
  (`anchor-v6.html:920-921`). The mirror-clearing read and the plaque read are
  separate fetches, and the plaque read is the later one, so a lock taken between
  them is seen.
- Defence in depth is present as claimed: the re-issue handler re-runs
  `evaluateAnchorGate` before `runAttempt` and aborts to its verdict on
  `anchored` / `locked` / `unreadable` (`anchor-v6.html:1119-1146`).
- R10 proves the negative at page level (failover-shaped refusal → no plaque,
  mirror + lock intact). The positive plaque path has no page-level test —
  NEEDS-CHECK R2-N1 below (availability, not safety).

## P-C3 — Sign-handler race — **CLOSED**
- `tapInFlight` is declared at `anchor-v6.html:130`, set synchronously as the
  first statement after the guard in BOTH handlers — Sign (`anchor-v6.html:1083-1084`)
  and re-issue (`anchor-v6.html:1119-1120`) — before the first await, and cleared
  in a `finally` in both (`anchor-v6.html:1111`, `anchor-v6.html:1146`). The latch
  spans the gate evaluation AND the awaited `runAttempt`, closing the window the
  original finding named. Re-attack: the Connect handler is not under this latch,
  but a mid-gate account change is caught by `driveAttempt`'s own re-checks
  (accountChanged lockout + payer-drift throw) before any signing request; no
  second-signature path found through it.

## P-C4 — Gate fails open when the server read fails — **CLOSED**
- `evaluateAnchorGate` now tracks readability separately from absence:
  `serverReadable` is set only on a successful read (`anchor-v6.html:1019-1020`),
  and `!serverReadable && !local` returns `unreadable` — fail closed, wallet
  never asked (`anchor-v6.html:1027-1028`). R9 proves it (sign calls = 0).
- On a claim 409, `driveAttempt` mirrors the Gatehouse's governing record
  locally instead of keeping the refused signature (`anchor-v6.html:812-818`,
  keyed on `claimErr.status === 409 && claimErr.heldSignature !== derivedSig`;
  the error object carries status/heldSignature from `claimServerAnchorRecord`,
  `anchor-v6.html:398-399`). The gatehouse's 409 always carries signature +
  status (`gatehouse.mjs:653-656` region, claim handler), so the convergence
  inputs exist on the real path.
- Residual, recorded as NEEDS-CHECK R2-N5: with a local record PRESENT and the
  server unreadable, the gate still reconciles the local signature and can
  proceed — a wallet signature may be requested whose broadcast the (unseen)
  server lock then refuses. Broadcast of a second inscription remains
  impossible (the claim decides), but Rule 3 is stressed at the wallet in that
  narrow path; the claimed fix's scope was the no-local-record case, and that
  scope is met.

## P-C5 — R5 tested the wrong branch — **CLOSED**
- R5b is genuinely isolated: fresh gate with wiped state dir (`state-r5b`),
  local CONFIRMED mirror seeded, Gatehouse record asserted `null`, and the pass
  detail carries the LOCAL branch's own message ("a signed record from an
  earlier session stands CONFIRMED") rather than R2b's server-branch text
  (`gatehouse-regression.mjs` R5b block; `regression-results.json` R5b entry).
  Caveat carried to R2-C2: this evidence was produced against the superseded
  gatehouse bytes; the page bytes it exercises are unchanged and frozen.

## P-C6 — No test for the dangerous DEAD_PREFLIGHT variant — **CLOSED**
- R8 exercises the re-send variant (claim → stub-accepted send → record
  BROADCAST → blockhash-worded re-send → record STAYS BROADCAST → other
  signature's claim 409) and R10 exercises the failover variant end-to-end
  through the page (`gatehouse-regression.mjs` R8/R10 blocks;
  `regression-results.json` R8/R10 entries). Note for the verifier: R8's first
  send is stub-ACCEPTED, not devnet-landed as the original suggestion sketched —
  the state under attack (a durable BROADCAST record) is identical, so the
  coverage is equivalent for this defect. Same evidence caveat as P-C5 (run
  predates the current gatehouse bytes).

**Promise axis line (re-review): original CONFIRMED 6 → CLOSED 6 · STILL OPEN 0 — worst remaining promise item is a NEEDS-CHECK (R2-N5, wallet-level Rule 3 stress in the unreadable-server + local-record path; no broadcast path).**

---

# HOUSE AXIS — disposition of the original CONFIRMED findings

## H-C1 — State-file loader trusts a foreign record — **STILL OPEN (narrowed to the cluster leg)**
- CLOSED as claimed on the two substantive pins: `loadAnchorStore` rejects a
  record whose `payer !== ANCHOR_PAYER` or whose `memoSha256` differs from
  sha256(MEMO_BYTES), marking the store broken / fail-closed
  (`gatehouse.mjs:374-378`), and the new disk-refresh re-validates the same two
  pins on every claim (`gatehouse.mjs:404`).
- STILL OPEN: `rec.cluster` is never compared to `CLUSTER_LABEL` in either
  place — it is only logged (`gatehouse.mjs:376`). The original finding named
  cluster explicitly, and the house's own practice makes the leg live: the
  regression suite seeds records with `cluster: 'devnet'` into gates labelled
  `devnet-regression` and expects adoption (R3/R4 seed blocks in
  `gatehouse-regression.mjs`), i.e. a same-payer / same-memo record from a
  devnet run placed at the production state path would still be adopted as the
  authoritative lock today. Fix is one comparison in both validators, or a
  captain ruling that cluster is out of scope because payer+memo are the pins.

## H-C2 — anchor-state unthrottled — **CLOSED**
- `GET /v1/night-brick/anchor-state` takes a token from its own bucket key
  (`gatehouse.mjs:618`: `takeToken('/v1/night-brick|state|' + ip, 120, 30)` —
  120/min, burst 30, exactly as claimed), after the origin fence, before
  answering. Key is distinct from the claim and RPC buckets.

**House axis line (re-review): original CONFIRMED 2 → CLOSED 1 (H-C2) · STILL OPEN 1 (H-C1, cluster leg only) — worst still-open: H-C1 cluster leg (foreign-cluster, same-payer/memo record still adoptable).**

---

# CRITIC-SEAT FINDINGS — verification

## Finding A — getTransaction convergence graduates CONFIRMED — **IMPLEMENTED, with a NEEDS-CHECK on strictness**
- Present: on a `getTransaction` for a DIFFERENT signature while the record is
  CLAIMED/BROADCAST, a landed, error-free, fee-5000 transaction whose
  `accountKeys[0] === ANCHOR_PAYER`, with exactly 3 instructions and ix[2] on
  the Memo program carrying bytes equal to MEMO_BYTES, sets
  `anchorRecord.confirmedSignature = params[0]` and transitions CONFIRMED
  (`gatehouse.mjs:832-843`). Null/absent changes nothing.
- NEEDS-CHECK R2-N2: the branch byte-matches the MEMO only — it does not check
  ix[0]/ix[1] are the ComputeBudget pair, nor that ix[2] carries 0 accounts,
  unlike the page's `verifyLandedTransaction` and the server's own
  `assertAnchorTx`. Only the pinned payer can sign such a transaction and the
  failure direction is over-confirmation (locking), never duplication — but
  "byte-matching inscription" is a stronger claim than the code keeps.
  Resolvable by the builder tightening the branch to the full §3.1 shape, or
  the critic ruling memo+payer+fee sufficient. Also: `confirmedSignature` is
  not exposed by `publicAnchorRecord()` (`gatehouse.mjs:513-517`), so the
  page's anchored message names the recorded signature, not the landed one —
  cosmetic, same item.

## Finding B — verifyLandedTransaction checks the payer — **CLOSED**
- The function takes `expectedPayer` (`anchor-v6.html:489`) and fails the
  verification when `accountKeys[0]` differs (`anchor-v6.html:503-504`). Both
  call sites pass the payer (reconciliation passes `payerStr`; the post-signing
  path passes the connected wallet). A transaction merely referencing the
  wallet no longer verifies.

## Finding E — CLAIMED→BROADCAST stamp persists strictly — **CLOSED, and the pattern was extended**
- The stamp mutates, persists, and on failure reverts status/updatedAt/history
  and returns `broken`; the send handler refuses on `broken` before forwarding
  (`gatehouse.mjs:455-470` stamp block inside `claimAnchorLock`;
  `gatehouse.mjs:736-740` send-handler branch). The same revert pattern now
  also guards every lock-FREEING observation transition via
  `transitionAnchorRecordStrict` (DEAD_PREFLIGHT at `gatehouse.mjs:804`,
  FAILED_ONCHAIN on status-err and landed-err) — which is what narrows H-N1
  below. One asymmetry survives and is graded new-confirmed R2-C1.

---

# NEW FINDINGS (round-2 code)

## CONFIRMED

### R2-C1 — A failed persist on record CREATION leaves a phantom in-memory record; a retry send of that signature is then forwarded with no durable record. Rule 2 broken on the send-claim path.
- Evidence: `setAnchorRecord` assigns memory BEFORE persisting and does not
  revert on throw (`gatehouse.mjs:386-389`). `claimAnchorLock`'s create path
  catches the throw and returns `broken` — but `anchorRecord` keeps the
  un-persisted record (`gatehouse.mjs:483-484`). The Finding E revert pattern
  was applied to the stamp and (via Strict) to freeing transitions, but not here.
- The new disk-refresh does NOT heal it: on ENOENT refresh returns with memory
  kept; on an older on-disk record the adoption test
  (`rec.updatedAt > anchorRecord.updatedAt`, `gatehouse.mjs:405` region) keeps
  the phantom, whose `updatedAt` is newer by construction.
- Failure sequence: a send with no prior page claim hits a transient persist
  failure → record created in memory as BROADCAST, outcome `broken`, send
  refused (correct). Disk recovers. The founder retries the SAME send →
  `claimAnchorLock` sees the signature match with status BROADCAST (not
  CLAIMED, so no stamp, no persist attempt) → outcome `held` → the send is
  FORWARDED — broadcast with no durable record ever written for that
  signature. Scope, stated precisely: the page's own flow is protected (it
  claims CLAIMED first, and its sends must pass the strict stamp persist);
  the exposed path is the gatehouse's send-claim door after a transient
  write failure. Suggested fix: in the create path, capture the prior
  `anchorRecord` and restore it in the catch, exactly as the stamp does.

### R2-C2 — The fixed point moved during the review and the regression evidence covers superseded bytes. (Evidence defect, not a code defect.)
- Evidence: claimed gatehouse sha256 `879ec9ac…` matches neither the bytes at
  review start (`071bd78d…`, 816 lines, mtime 02:12:32 UTC) nor the current
  bytes (`4d3113ef…`, 859 lines, mtime 02:17:15 UTC). The 13/13 regression run
  (02:12:49Z–02:13:50Z) predates the current bytes; the N6 disk-refresh and N9
  strict-transition mechanisms in the current bytes have no regression
  coverage. The blind verifier must be handed a frozen hash and a regression
  run executed against THAT hash.

## NEEDS-CHECK

### R2-N1 — The positive plaque path (lock genuinely free → plaque offered) has no page-level regression.
- R10 proves the plaque is withheld; R7 proves DEAD_PREFLIGHT at API level. No
  test drives the page through a preflight expiry to a SHOWN plaque and a
  successful re-issue tap. A regression making `lockFree` always false would
  pass 13/13 while silently killing the Amendment 4 re-issue road.
  Resolvable by the builder adding that page-level test.

### R2-N2 — Convergence-branch strictness + confirmedSignature visibility. (See Finding A above.)

### R2-N3 — P-C1 residual: `stamped` proves first forward THROUGH THIS GATEHOUSE PROCESS, not first submission of the bytes anywhere.
- Signed bytes broadcast out-of-band (direct RPC submission of the raw
  transaction by any holder of the signed bytes) before the first gatehouse
  send are invisible to all three guards. Unresolvable in code alone;
  resolvable by the captain confirming the operational rule that signed
  anchor bytes exist only inside the page→gatehouse flow.

### R2-N4 — H-N2 narrowed, not eliminated: the claim path now re-reads disk, but there is still no inter-process lock.
- `refreshAnchorRecordFromDisk` (`gatehouse.mjs:396-411`, called at
  `gatehouse.mjs:448`) adopts a newer on-disk record before deciding, which
  closes the stale-memory claim in the ordinary sequence. Two processes
  executing their (synchronous) claim sections truly simultaneously can
  still both refresh-then-persist over each other, and the anchor-state /
  observation paths never refresh. Resolvable from the deploy units
  (single-instance guarantee), which remain outside this fixed point.

### R2-N5 — P-C4 residual: wallet-level Rule 3 stress when the server is unreadable but a local record exists. (See P-C4 above.)

## CARRIED FORWARD FROM ROUND 1 (unresolved, re-graded against current bytes)
- P-N1 — STILL NEEDS-CHECK: the own-signature `getTransaction` branch still
  graduates CONFIRMED on any non-null result without requiring `meta`/`slot`
  (`gatehouse.mjs` observation block, own-signature branch — contrast the
  convergence branch, which does require `meta`). Builder hardening or
  provider-shape proof still owed.
- P-N2 — NEEDS-CHECK, narrowed: R6 now races the sends themselves
  (`Promise.all`), but both signatures are pre-claimed, so the pure
  send-claim race (no prior claims) remains untested; code inspection still
  says safe (claim is synchronous, now with the disk refresh inside the same
  synchronous section).
- P-N3 — STILL NEEDS-CHECK: R3/R4 names still invoke an expiry the gate never
  reads. Naming only.
- P-N4 — STILL NEEDS-CHECK: a local CONFIRMED mirror is still trusted with
  the server record unreadable (the local branch of `evaluateAnchorGate`
  fires when `serverRec` is null for any reason). Denial-direction only.
- H-N1 — NEEDS-CHECK, narrowed: lock-freeing transitions and the stamp are
  now strict; the remaining non-strict transitions are CONFIRMED and
  send-accepted BROADCAST (`gatehouse.mjs:431-441`) — both lock-HOLDING, so a
  persist failure diverges in the safe direction and re-drives on the next
  observation. The creation-path divergence is split out as R2-C1.

**New-findings line: CONFIRMED 2 (R2-C1 code, R2-C2 evidence) · NEEDS-CHECK 5 new + 5 carried (several narrowed) · REJECTED 0 — worst new confirmed: R2-C1 (phantom record → broadcast without a durable record on the send-claim retry path).**

---

# CLOSING VERDICT — FIX ROUND 2 RE-REVIEW

**Do NOT pass to the blind verifier yet.** The round-2 fixes themselves verify:
every original Promise-axis defect (P-C1…P-C6) is CLOSED in the code, H-C2 is
CLOSED, critic Findings B and E are CLOSED, Finding A is implemented, and the
unclaimed N6/N9 hardening is real and in the safe direction. What blocks the
pass is the state of the round, not the direction of the fixes:

1. **Freeze the bytes.** Stop editing `gatehouse.mjs` during review; correct
   the claimed hash (current: `4d3113ef63dd6b11117c935d614791a91f115eb2784884c91804cddc458381b7`,
   if it does not change again) and hand the verifier that exact fixed point. (R2-C2)
2. **Re-run the full regression against the frozen bytes** and publish results
   tied to that hash — the existing 13/13 PASS covers superseded bytes only.
3. **Fix R2-C1** (revert memory on a failed create-persist, mirroring the
   Finding E pattern) — it is the one new code path to a broadcast without a
   verified record.
4. **Close or rule out the H-C1 cluster leg** (one comparison in
   `loadAnchorStore` + `refreshAnchorRecordFromDisk`, or a recorded captain
   ruling that payer+memo are the only pins).

Items 1–4 done and re-verified, this round passes to the blind verifier with
the NEEDS-CHECK list (R2-N1…R2-N5, P-N1…P-N4, H-N1, H-N2) attached for that
seat to work through.

---

# DELTA VERIFICATION (frozen bytes) — improver seat, final pass before the blind verifier

Loaded skill: `~/workspace/newwave/tools/crew-skills/two_axis_independent_review/SKILL.md`
(Two-Axis Independent Review — read in full before this pass; findings graded only
CONFIRMED / NEEDS-CHECK / REJECTED, with file:line evidence; axes reported separately,
never merged. Scope of this pass is the DELTA only: the four items the FIX ROUND 2
RE-REVIEW left open or raised — R2-C1, the H-C1 cluster leg, R2-C2, and the
confirmedSignature exposure — plus re-confirmation of the round-3 hardening (critic
N6/N9) in the frozen bytes. No candidate artefact was edited, deployed, or touched;
the regression was NOT re-run by this seat — the run evidence was verified as
evidence (hashes, timestamps, internal consistency), which is what R2-C2 was about.)

## Hash verification — the fixed point HOLDS this time

- `gatehouse.mjs` — recomputed sha256
  `2b16dfd069146fc4abc74c7becac78be1baf73917bf3a8ab13f0758f3a0357c7` — **MATCHES**
  the task claim and `FROZEN_BYTES_MANIFEST.json` (`gatehouseSha256`). 868 lines.
- `anchor-v6.html` — recomputed sha256
  `be558a0495c1cba04e282c5ddfc23edd11e0cf1ce25e355594b9fc47773bf418` — **MATCHES**
  the task claim and the manifest (`pageSha256`).
- Badge self-check — **VERIFIED independently**: replacing the badge token
  `90f4b792` with `00000000` in the page bytes and hashing gives
  `90f4b79242892a55…`, whose first 8 hex are exactly the badge token in
  "Build: v6 · 90f4b792". The badge discipline holds on the frozen bytes.
- `gatehouse-regression.mjs` — recomputed sha256
  `52cd9bc9935d25cc0c06718be62129993b6ede1a8af85e39e5f28fa598096801` — **MATCHES**
  the manifest's `harnessSha256`, so the harness is tied to the freeze too.
- Both candidate files pass `node --check` (syntax clean).

## R2-C2 — regression evidence covers superseded bytes — **CLOSED**

- The timing chain now closes, which it did not in round 2: `gatehouse.mjs`
  mtime 2026-11-25 02:20:45 UTC and `gatehouse-regression.mjs` mtime 02:22:20 UTC
  both PRECEDE the run in `regression-run.log` (first gate line 02:22:26Z, last
  02:23:29Z); `regression-results.json`, `regression-run.log` and
  `FROZEN_BYTES_MANIFEST.json` (`frozenAt` 2026-11-25T02:23:30.353Z) were all
  written at the run's end. The bytes that ran are the bytes whose hashes are
  frozen above — no mid-review or mid-run movement is detectable, and the
  current hashes still match at this verification (i.e. nothing has moved since).
- Internal consistency: the manifest lists exactly 13 results, all `pass: true`
  (R1, R1b, R2a, R2b, R5, R3, R4, R6, R7, R5b, R8, R9, R10); `regression-results.json`
  carries the same 13 ids, all `pass: true`, with detail strings; the run log
  carries 13 `PASS` lines and the summary `=== REGRESSION SUMMARY (Part E):
  13/13 PASS ===`. Three artefacts, one story.
- Honest limit, stated for the verifier: this seat verified the evidence chain
  (hashes + mtimes + cross-artefact consistency), it did not re-execute the
  suite. Re-execution against the frozen hash is the blind verifier's cheapest
  independent confirmation and is recommended, not required by this pass.

## Delta item 1 — R2-C1 (phantom record on failed create-persist) — **CLOSED**

- In `claimAnchorLock`'s fresh-claim branch the previous in-memory record is
  captured BEFORE the persist attempt (`gatehouse.mjs:483`,
  `const prevRecord = anchorRecord;`), and the catch restores it before
  returning `broken` (`gatehouse.mjs:484-493`, restore at `:490`). The comment
  at `:486-489` names the finding and the rule (Rule 2) it protects.
- Re-attack against the frozen code: (a) transient persist failure on a
  send-claim → outcome `broken`, send refused 503 at the handler, memory back
  to the pre-claim record — a retry of the same signature now re-enters the
  fresh-claim branch and must persist successfully before any `held` outcome
  can forward it; the phantom-`held` forward path from the original finding
  no longer exists. (b) The fix sits in the SHARED `claimAnchorLock`, so the
  page-claim door (`gatehouse.mjs:661`) gets the same revert, not only the
  send-claim door the finding named. (c) `setAnchorRecord` (`gatehouse.mjs:386`)
  has exactly one caller — this branch — so no other creation path can still
  leave a phantom. (d) Residual theoretical divergence (persist throws AFTER
  the rename lands, e.g. on the directory fsync) reverts memory to an older
  record while disk holds the new one — safe direction (no forward without a
  durable record), and the N6 disk refresh at the top of the next claim
  (`gatehouse.mjs:448`) adopts the newer on-disk record before deciding, so
  it self-heals. Not a defect.

## Delta item 2 — H-C1 cluster leg — **CLOSED**

- `loadAnchorStore` now requires all three pins in one condition, cluster
  included: `rec.cluster !== CLUSTER_LABEL` marks the store broken /
  fail-closed (`gatehouse.mjs:374`, log line at `:376` names payer/memo/cluster).
- `refreshAnchorRecordFromDisk` applies the identical three-pin check and
  throws `state file pins mismatch` on any mismatch, which its catch turns
  into `anchorStoreBroken` — fail closed (`gatehouse.mjs:404`).
- Harness seeds match the gate labels, as claimed: both state-file seeds use
  `cluster: 'devnet-regression'` (`gatehouse-regression.mjs:354` R3,
  `:380` R4, via `seedGateState` at `:292`), and both gate starters default
  `GATEHOUSE_CLUSTER_LABEL` to `'devnet-regression'` (`:55` `startGate`,
  `:279` `startGateRaw`). No other `seedGateState` call exists. (The
  `cluster: 'mainnet-beta'` strings at `:335/:360/:386/:484` are PAGE local
  mirror seeds — a different store with a different shape, not gatehouse
  state files; the H-C1 pins do not apply to them and they are not a
  counterexample.)
- Behavioural proof the new leg does not over-reject: in the frozen run, R3's
  seeded BROADCAST record was adopted and graduated CONFIRMED and R4's seeded
  record stood as BROADCAST in the gate's own responses — legitimate
  same-label records pass the cluster gate; only foreign-label ones break.

## Delta item 3 — `publicAnchorRecord` exposes `confirmedSignature` — **CLOSED**

- `gatehouse.mjs:524-525`: the public record now destructures and returns
  `confirmedSignature: confirmedSignature || null` alongside the existing
  fields. The convergence branch sets it on the record before the CONFIRMED
  transition (`gatehouse.mjs:849-850`), and that transition persists the whole
  record, so the exposed value is durable, not memory-only.
- End-to-end visibility in the frozen run's evidence: the R2a/R3/R4 result
  details print the served record WITH the `confirmedSignature` field present
  (`null` in those flows, correctly — no convergence landing occurred there).
  The R2-N2 cosmetic half ("page names the recorded signature, not the landed
  one") is a page-display matter, outside this delta; the server exposure the
  delta promised is present.

## Delta item 4 — round-3 hardening (critic N6 + N9) — **RE-CONFIRMED in the frozen bytes**

- N6: `refreshAnchorRecordFromDisk()` is called at the top of
  `claimAnchorLock`, before any decision, with a broken-store re-check
  immediately after (`gatehouse.mjs:448-449`); the function itself is at
  `:396-411` and now also carries the cluster pin (delta item 2).
- N9: every lock-FREEING transition in the observation block goes through
  `transitionAnchorRecordStrict` (definition `gatehouse.mjs:417-430`,
  revert-on-persist-failure): `DEAD_PREFLIGHT` at `:813`, `FAILED_ONCHAIN`
  at `:820` (status-err) and `:825` (landed-err). The remaining
  `transitionAnchorRecord` calls (`:815` BROADCAST, `:821/:826/:850`
  CONFIRMED) are all lock-HOLDING transitions — the safe direction for a
  non-strict persist, exactly as the round-2 re-review graded them.

## R8 harness change — suspected weakening of the test — **REJECTED**

- The suspicion: rebuilding the "other" transaction until its signature
  differs (`gatehouse-regression.mjs:520-529`, max 12 builds, 1.5 s sleep
  between collisions) could let R8 pass without the gate ever facing a
  genuinely different signature. Tried to sustain it; could not. The loop's
  exit condition REQUIRES `s !== sigE` before `tx2`/`sigOther` are set, and
  R8's pass condition still requires `claimOther.status === 409` for that
  verified-different signature (`:532-535`). What the change removes is a
  FALSE failure: two builds sharing one confirmed blockhash produce the
  identical signature, to which the gate's `held` answer is CORRECT
  behaviour (it is the same anchor, not a second one). The gate's obligation
  — refuse a DIFFERENT signature while BROADCAST stands — is still exactly
  what is asserted. The change strengthens the test's validity; it does not
  weaken the gate's coverage.

## NEW FINDINGS (delta code only)

### CONFIRMED — none. No new defect was found in the delta code.

### NEEDS-CHECK (non-blocking, harness robustness only)

- **D-N1 — R8's rebuild loop can exhaust without a different signature, and
  then crashes instead of recording a FAIL.** If all 12 builds collide on
  one blockhash, `tx2` stays `null` and `tx2.serialize()` throws
  (`gatehouse-regression.mjs:530`), aborting the harness with an exception
  rather than a recorded R8 FAIL. It fails LOUD — it can never masquerade
  as a pass — and colliding across ~18 s of retries is vanishingly unlikely,
  so this carries no severity and does not block the pass. Resolvable by the
  builder adding an explicit `tx2 !== null` guard that records a FAIL.
  Named here so the blind verifier is not surprised if a future run dies
  at R8 with a TypeError.

### REJECTED — 1 (the R8-weakening suspicion, above).

**Delta line: items verified 4/4 CLOSED (R2-C1 · H-C1 cluster leg · R2-C2
freeze+evidence · confirmedSignature exposure) + round-3 hardening (N6/N9)
re-confirmed present · NEW CONFIRMED 0 · NEEDS-CHECK 1 (D-N1, harness-only,
non-blocking) · REJECTED 1 — worst item: none confirmed; the only open item
is a loud-failure harness edge that cannot produce a false pass.**

The carried NEEDS-CHECK list from the round-2 re-review (R2-N1…R2-N5,
P-N1…P-N4, H-N1, H-N2 as narrowed there) is unchanged by this delta and
travels with the round to the blind verifier, as the re-review directed.

---

# FINAL VERDICT — DELTA VERIFICATION

**PASS TO BLIND VERIFIER.** The fixed point is genuinely frozen this time:
both artefact hashes recomputed and matching the manifest, the page badge
self-verifying, the harness hash tied in, and the 13/13 regression run
timestamped AFTER both files' last modification and written out with the
manifest at its end (R2-C2 closed). Every delta item verifies in the frozen
code with file:line evidence: R2-C1's revert is in the shared claim path,
the H-C1 cluster pin is in both validators with harness seeds matching the
gate labels, `confirmedSignature` is exposed and durable, and the N6/N9
hardening stands as re-reviewed. No new confirmed defect exists in the
delta. The blind verifier should be handed: these frozen hashes, the
manifest, the 13/13 results, and the carried NEEDS-CHECK list
(R2-N1…R2-N5, P-N1…P-N4, H-N1, H-N2, plus D-N1 from this pass).

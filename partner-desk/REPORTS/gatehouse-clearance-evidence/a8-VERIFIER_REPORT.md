# VERIFIER REPORT — Amendment 8 fix freeze (BLIND VERIFIER seat, Relay Law)

**Seat discipline:** Fresh-context blind verification. I did NOT read BUILDER_REPORT.md, IMPROVER_REPORT.md, FIX_REPORT.md, or any CRITIC file. Every result below is from my own hashes, greps, reads, chain reads, and suite runs.

**Loaded (tools + skills, together):**
- `~/workspace/newwave/tools/CREW_TOOLS_MANIFEST.md`
- `~/workspace/newwave/tools/crew-skills/INDEX.md`
- Binding skill: `~/workspace/newwave/tools/crew-skills/two_axis_independent_review/SKILL.md` (read in full — Promise axis vs House axis kept separate, findings graded CONFIRMED / NEEDS-CHECK / REJECTED, axes never merged)
- Binding skill: `~/workspace/newwave/tools/crew-skills/verify_status_before_reporting/SKILL.md` (read in full — fresh probe/artefact check behind every status claim)

**Fixed point frozen:** gatehouse.mjs / anchor-v6.html / anchor-devnet.html / gatehouse-regression.mjs in `amendment8/`, as claimed in the fixFreeze block of FROZEN_BYTES_MANIFEST.json. Hashes re-computed AFTER all my runs — bytes unchanged by verification.

---

## PROMISE AXIS — does it do what the claims say?

### Claim 1 — Identity — **VERIFIED**
My own `sha256sum`:
- gatehouse.mjs = `c4010ed628ccd21f21d15ee0899b30b108d426878b329283a1daae688f86d07f` ✓ claimed
- anchor-v6.html = `900323c367a6af95500eba1edf198e7ff4497867388d3732cebfbea72644d4ba` ✓ claimed
- anchor-devnet.html = `40eb08b46744f9f307790837c53907e160fdc7a5ecab9fed306e40e974f13887` ✓ claimed
- gatehouse-regression.mjs = `57e3fba5930ae16cbb5c8aca1b536c6c8b0c0e8cd7721f8f57b1a1e1e23e87aa` ✓ claimed

Badge self-consistency (my own python recompute, badge token zeroed to `00000000`):
- anchor-v6.html: badge found in file `e72aaae3`; zeroed-file sha256 = `e72aaae34b50…`, first 8 = `e72aaae3` ✓
- anchor-devnet.html: badge found `ce8823ec`; zeroed-file sha256 = `ce8823ec1caa…`, first 8 = `ce8823ec` ✓

### Claim 2 — Frozen core untouched + pins — **VERIFIED**
My own hashes:
- `anchor-work/anchor-tx.mjs` = `920a695952fa30796d1bce958f1674e27ebae733250a8ec6d1def7963a44d6fc` ✓ (920a6959…)
- `anchor-work/MEMO_TEXT.txt` = `a760a0daaacf5aab4bab907aa17f58f5facc85d8e22b018d472396059e98fb28` ✓ (a760a0da…), exactly **133 bytes** (`wc -c`)
- `anchor-work/verify-gate.mjs` = `1801d5c332c86ea96a0b536dda1f128e2ff2350798b311838860a1b9a7fbabfc` ✓ (1801d5c3…)
- Deployed A7 copy `gatehouse-work/gatehouse.mjs` = `2b16dfd069146fc4abc74c7becac78be1baf73917bf3a8ab13f0758f3a0357c7` ✓ (2b16dfd0…)

Pins, candidate vs A7 (grep, both files): identical pinning mechanism and constants — payer/memo are env-pinned (`ANCHOR_PAYER = process.env.GATEHOUSE_ANCHOR_PAYER`, `MEMO_BYTES` from `GATEHOUSE_MEMO_HEX`) and enforced identically: candidate L300–321 / A7 L263–284: `sigCount !== 1 → 'signature count !== 1 (fee would not be 5000)'`, `keyStr[0] !== ANCHOR_PAYER`, memo-bytes equality vs the frozen memo; landed-tx check `txr.meta.fee === 5000` (candidate L1240, A7 L840). The evidence harness pins the literal payer `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE` (gatehouse-evidence.mjs L21) and derives MEMO_HEX from the frozen MEMO_TEXT.txt. No pin differs between candidate and A7.

### Claim 3 — Suite truth — **REFUTED as stated (weather-shaped failures; see disclosure)**
My own runs, in place (`node gatehouse-regression.mjs`), logs `verifier-regression-run1.log` / `verifier-regression-run2.log`:
- **My run 1: 30/32 PASS, exit 1.** FAIL R1 — blockhash fetch aborted before any reserve (`No RPC endpoint could fetch a fresh blockhash … AbortError`, gate record=null where the test expected the reservation to stand). FAIL R18 — real-devnet `getLatestBlockhash` took 4,471 ms via fallback, then the twin flow never started (sig=null, signTransaction=0, gate record=null). Both failures are upstream/devnet-fetch failures, not assertion failures against candidate logic.
- **My run 2: 32/32 PASS, exit 0** (`=== REGRESSION SUMMARY (Part E): 32/32 PASS ===`, 32 PASS lines, 0 FAIL lines).
- The claim "32/32 PASS **both times**" is therefore **not reproduced**: I observed it once in two attempts.

Evidence harness (`node gatehouse-evidence.mjs`, logs `verifier-evidence-run.log` / `verifier-evidence-run2.log`):
- **Both of my attempts: Part A 12/12 PASS, then Part B crashed** — `Connection to establish proxy tunnel timed out after 3500ms` on every upstream call; the gate failed closed with 502 (`gatehouse: all upstreams unavailable (fail closed)`) and the harness died at `buildAnchorTransaction` (gatehouse-evidence.mjs:271). Parts B/C/D never ran. The claimed A/B/C/D **26/26 is NOT verified by me** — only A 12/12, twice. Per instructions the crashed run was re-run once; it crashed identically. This is the disclosed egress/devnet weather pattern, and the gate's fail-closed behaviour under it is itself correct — but it is not a 26/26 pass.

PASS-detail audit: I read the detail text of R6+, R20, R22, R24–R28 PASS lines in my runs; each detail supports its title (counts, HTTP codes, record states all present and consistent). No PASS line found whose detail contradicts its claim.

### Claim 4 — Headline invariant (R6+) + R24–R28 — **VERIFIED**
From MY run outputs (both runs, identical):
- R6+: `signTransaction total=1 (A=1 B=0) · reserves=[200,409] · claims=[200] · broadcasts=1 · loser error="…anchor lock is already held (status RESERVED)" · gate record=CONFIRMED`. Loser at 0 ✓.
- R24 PASS: unclaimed send refused 403 in null / RESERVED / EXPIRED_UNCLAIMED, `upstream forwards=0`, record untouched.
- R25 PASS: refused over FAILED_ONCHAIN and DEAD_PREFLIGHT, forwards=0.
- R26 PASS: bound-claim send forwards and lands (record BROADCAST, forwards total=1); a different signed tx refused 403.
- R27 PASS: EXPIRED_UNCLAIMED + matching mirror → mirror cleared, notice surfaced, zero wallet signature requests, fresh flow on second tap.
- R28 PASS: both negative twins stay LOCKED, mirrors intact, wallet sign/msg = 0/0.

### Claim 5 — Source invariants — **VERIFIED** (all four)
(a) anchor-v6.html `driveAttempt` (L707): server-state read first — `serverRec0 = await fetchServerAnchorState()` at the head of the attempt (comment L736: "STATE READ BEFORE ANY SIGNATURE"), with RESERVED/CLAIMED/BROADCAST/CONFIRMED refusal/resume logic; then `reservation = await reserveServerAnchor(blockhash, lastValidBlockHeight)` (in the L826–833 block, comment: "the atomic pre-signature reservation must stand on the Gatehouse BEFORE signTransaction is called"); only then `signedTx = await provider.signTransaction(tx)` (L851). Order: state-read → reserve → signTransaction ✓.
(b) gatehouse.mjs send door: `authorizeAnchorSend` (L519) — header comment L500 "This function therefore NEVER creates a record"; body only reads the record, optionally stamps CLAIMED→BROADCAST durably, else returns conflict; no record construction anywhere in it ✓. Timers/clock: the only `setInterval` (L170) evicts rate-limit buckets; `Date.now` uses are the token bucket (L158), logging elapsed (L810/1173/1260), and the challenge map. `CHALLENGE_TTL_MS = 5 * 60 * 1000` (L609) applies only to handshake challenges — consumeChallenge L661: "challenge expired (handshake window only — this never affects a granted reservation)". The sole RESERVED→EXPIRED_UNCLAIMED transition (L992) requires observed block height > stamped lastValidBlockHeight via a live `getBlockHeight` observation (L966–990; unavailable observation → 502, no transition). **No timer/wall-clock construct can free a RESERVED or CLAIMED record** ✓.
(c) Claim door: `claimBoundReservation(sigB58, reservationId, blockhashB58)` (L711) refuses `reservation-mismatch` when `anchorRecord.reservationId !== reservationId` and `blockhash-mismatch` when `anchorRecord.blockhash !== blockhashB58`; only a RESERVED record with both matching converts to CLAIMED ✓.
(d) Mirror: my own function-by-function extraction/diff of both pages — identical function sets; **all flow functions byte-identical**. Only differences in the whole files' function bodies: `renderWallet` cluster label `(MAINNET)` vs `(DEVNET — REHEARSAL)` and `showResult` Solscan link `?cluster=devnet` suffix. Constants: devnet page `const CLUSTER = 'devnet'` (L83) and `RPC_ENDPOINTS = ['https://rpc.provadiacoin.com/devnet/v1/night-brick']` (L121, the `/devnet/` base) vs main page `CLUSTER = 'mainnet-beta'`, `…/v1/night-brick` ✓.

### Claim 6 — Wallet fence (read-only) — **VERIFIED**
My own reads against `https://api.mainnet-beta.solana.com` (no transaction of any kind):
- `getBalance` for `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE` → **69,099,009 lamports** ✓ exactly as claimed
- `getSignaturesForAddress` (limit 100) → **exactly 1 signature**: `32uqxt7Gqk2pEVGKV3mEowvF8g6qDjr2nB1M1Eyu2oAV5VojVbTue1mkDxs9zqGHVBhzEBFtJqGabAtam2ENLiCW`, slot 473245574, finalized, err null ✓

Promise axis summary: 4 CONFIRMED-verified claims (1, 2, 4, 5, 6 — five claims), 1 REFUTED as stated (Claim 3: the "twice consecutively / 26/26" reproduction), 0 NEEDS-CHECK. Worst item: Claim 3's evidence-harness leg could not be run to completion from this origin at all.

---

## HOUSE AXIS — standing rules

- **No mainnet transaction:** CONFIRMED — my only chain writes were devnet regression/evidence harness runs; mainnet was read-only `getBalance`/`getSignaturesForAddress`. Wallet fence unchanged (Claim 6).
- **No deployments, no VPS writes:** CONFIRMED — no deployment performed; no SSH used (public endpoint sufficed).
- **Candidate/harness files unedited:** CONFIRMED — post-run sha256 re-check matches the frozen claims exactly (gatehouse.mjs c4010ed6…, anchor-v6.html 900323c3…, anchor-devnet.html 40eb08b4…, gatehouse-regression.mjs 57e3fba5…). My only writes are this report and my `verifier-*.log` run logs.
- **Stray processes:** CONFIRMED — `ps` after every run and at the end: no gatehouse processes left behind.
- **Failed runs disclosed:** CONFIRMED — regression run 1 (30/32, R1+R18 upstream-fetch failures) and both evidence attempts (Part A 12/12, Part B proxy-tunnel crash) are reported above with their logs, not hidden.

House axis summary: 5 CONFIRMED, 0 NEEDS-CHECK, 0 REJECTED. Worst confirmed item: none — no house rule was broken by the candidate or by this verification.

---

## Blockers (named plainly)
1. Regression "32/32 twice" not reproduced by the blind seat: my run 1 was 30/32 (R1, R18 — both real-devnet blockhash-fetch failures: AbortError / 4.5 s fallback latency), my run 2 was 32/32.
2. Evidence "A/B/C/D 26/26" not reproduced: both attempts passed Part A 12/12, then Part B crashed on egress-proxy tunnel timeouts (gate correctly failed closed, 502). B/C/D unobserved by this seat. A re-run in healthy network weather is the settling check.

NOT VERIFIED

# BUILDER REPORT — GATEHOUSE AMENDMENT 8: PRE-SIGNATURE RESERVATION

**Seat:** BUILDER (Relay Law: builder → improver → different-family critic → blind verifier).
**Skills/tools loaded (paths, as required):**
- `~/workspace/newwave/tools/CREW_TOOLS_MANIFEST.md`
- `~/workspace/newwave/tools/crew-skills/INDEX.md`
- Binding skill: `~/workspace/newwave/tools/crew-skills/cs-engineering-rules.md`
- Binding skill: `~/workspace/newwave/tools/crew-skills/verify_status_before_reporting/SKILL.md`

**Deliverables are CANDIDATES ONLY.** Nothing was deployed; no VPS or nginx change was made; no mainnet transaction of any kind was made; the filed/deployed originals were never edited (hashes re-verified at the end — see §9).

---

## 1. What was built

The filed v6 page signed first (line 718) and claimed second (line 801). Amendment 8 reverses the order to the required **Lock → Sign → Persist → Broadcast → Verify** by adding an atomic, wallet-authenticated **pre-signature reservation** to the Gatehouse and reordering the page around it.

### 1.1 Server (`amendment8/gatehouse.mjs`, sha256 `e49932c5aace63c499045e1af16d983f817ec45f6cd36180a207f2e1d63e0ce5`)

New sub-paths under `/v1/night-brick/`, behind the same origin fence / CORS discipline as `anchor-claim`, each with its own rate bucket in the claim class (10/min, burst 10, per IP):

| Door | Method | Body | Success | Refusals |
|---|---|---|---|---|
| `/anchor-challenge` | POST | `{purpose:'reserve', blockhash, lastValidBlockHeight}` or `{purpose:'release', reservationId}` | 200 `{challengeId, message, expiresAt}` | 400 bad shape/purpose |
| `/anchor-reserve` | POST | `{challengeId, signature}` (base64 ed25519 over the canonical message) | 200 `{reservationId, status:'RESERVED', blockhash, lastValidBlockHeight}` | 403 bad/replayed/expired challenge or non-payer proof · 409 lock held · 503 store unavailable |
| `/anchor-reservation-release` | POST | `{challengeId, signature, reservationId}` | 200 `{status:'EXPIRED_UNCLAIMED', observedHeight, …}` | 400 id mismatch · 403 proof · 409 no such live reservation / stamp still valid · 502 upstream observation unavailable (NO transition) · 503 persist failed (reservation stands) |
| `/anchor-claim` (extended) | POST | `{tx, reservationId}` (reservationId now REQUIRED) | 200 (RESERVED → CLAIMED) | 400 missing reservationId · 409 `no-reservation` / `reservation-mismatch` / `blockhash-mismatch` / conflict · 403 assert/signature · 503 store |
| `/anchor-state` (extended payload) | GET | — | record now also exposes `reservationId, blockhash, lastValidBlockHeight, reservedAt` | unchanged |

**Canonical challenge message** (built server-side from the stored challenge — never from caller text at verify time; `\n`-joined):

```
PROVADIA GATEHOUSE ANCHOR RESERVATION v1
action: <reserve|release>
cluster: <GATEHOUSE_CLUSTER_LABEL>
payer: <GATEHOUSE_ANCHOR_PAYER>
memoSha256: <sha256 of pinned memo bytes>
challenge: <64-hex random nonce>
blockhash: <stamped blockhash>            (reserve only)
lastValidBlockHeight: <stamped height>    (reserve only)
reservationId: <id>                       (release only)
```

**Record states.** The durable record gains `RESERVED` and `EXPIRED_UNCLAIMED`. A RESERVED record carries `signature: null`, a random 128-bit `reservationId`, the pins, `blockhash`, `lastValidBlockHeight`, `reservedAt`. The bound claim transitions the **same** record RESERVED → CLAIMED (carrying the server-derived signature, `reservationId` retained); Amendment 7 semantics (BROADCAST → CONFIRMED / FAILED_ONCHAIN / DEAD_PREFLIGHT, strict persists, null reads never transition, convergence) run unchanged from there. `EXPIRED_UNCLAIMED` joins the lock-free set. Record-shape validation on load and on claim-time disk refresh now accepts the signature-less reservation shape (and only that shape for those two statuses) alongside the Amendment 7 pins check.

**Mechanics that matter:**
- Reserve is the `claimAnchorLock` pattern: synchronous check-and-persist on Node's single thread — disk refresh, lock check, atomic tmp+fsync+rename persist, **then** the response. Persist failure reverts memory to disk and answers 503 (phantom-record revert, improver R2-C1 pattern).
- A challenge is consumed on ANY reserve/release attempt that names it (a failed proof burns it — no retry oracle); replay is refused before any other check. Consumed/expired challenges are pruned; the map is capped at 1000.
- The claim binding is triple: live RESERVED record + matching `reservationId` + signed tx's `recentBlockhash` (now extracted by `parseSignedWire`) equals the reservation's stamped blockhash — on top of the unchanged byte assert + ed25519 verify vs the pinned payer. An idempotent re-claim (same signature + same reservationId, record already CLAIMED-or-later) answers `held`, so a claim response lost in transport can be retried safely.
- The send path is unchanged — and while a record is RESERVED its signature is null, so every send mismatches the record and is refused; a send can never convert or bypass a reservation.
- Release observation goes through the gate's own `forward()` (`getBlockHeight`); the record is re-checked after the await before the freeing transition, which persists **strictly** (`transitionAnchorRecordStrict`) before the 200 is sent.

### 1.2 Page (`amendment8/anchor-v6.html`, sha256 `e7bf2ec09fc5ee9645270fe94e01870d84ba5cae722a67f218f8e99932d2e3a5`, badge `Build: v6 · 05ba62bc`)

`driveAttempt()` now runs: stop checks → **server-state read** (a governing CLAIMED/BROADCAST/CONFIRMED record, or a RESERVED record this browser cannot resume, stops the tap with NO wallet call of any kind) → fresh blockhash inside the tap (STEP 0 lock unchanged) → build tx → **challenge + `provider.signMessage` → `anchor-reserve`** → `signTransaction` → existing §3.1 shape asserts → derive signature → verified local persist (record now also carries `blockhash` + `reservationId`) → `anchor-claim {tx, reservationId}` → existing broadcast failover → existing reconciliation.

Details:
- On reserve 409 the page converges the local mirror to the authority (when the authority names a signature) and stops — `signTransaction` is NOT called; the error says so in plain words.
- If `signMessage` is rejected/fails, the tap stops cleanly: nothing reserved by that tap, no transaction signature requested. If a reservation from an earlier moment stands, it is left to the state-read / resume / evidence-release paths — the page never silently re-reserves.
- `evaluateAnchorGate` gained a `reserved` action: RESERVED + no resumable local mirror → refused at the gate (before even a message proof). RESERVED + a local mirror whose `blockhash` equals the reservation's stamp → `proceed`, and `driveAttempt` takes the **resume path**: rebuild the identical tx on the stamped blockhash, `addSignature` with the stored signature (NO new wallet request of either kind), re-run the shape asserts, re-persist verified, complete the bound claim, broadcast.
- The on-load banner names a live RESERVATION distinctly (it has no signature yet).

### 1.3 Devnet twin page (`amendment8/anchor-devnet.html`, sha256 `76d611f652856781ade74776a993d3143a37bcc7df8c6a5b7df34bed8968d0ed`, badge `Build: v6 · 879d69fc`)

Built as a byte-mirror of the candidate main page with ONLY these deltas (verified by diff): `CLUSTER='devnet'`; RPC base `https://rpc.provadiacoin.com/devnet/v1/night-brick`; DEVNET REHEARSAL banner + devnet network warning; wallet line reads `(DEVNET — REHEARSAL)`; Solscan links carry `?cluster=devnet`; local mirror key is `provadia-anchor-record-devnet-v6` (never shares the main page's key). One correction is flagged for the improver: the v5 twin's network paragraph was a copy leftover claiming MAINNET — the twin now carries a correct devnet warning (see NEEDS-CHECK N2).

**Twin route proposal (for the coordinator — NOT applied):** the smallest additive nginx change on `rpc.provadiacoin.com` is one new location beside the existing `location /`:

```nginx
location /devnet/ {
    proxy_pass http://127.0.0.1:8742/;   # trailing slash strips the /devnet/ prefix
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 30s;
}
```

So `https://rpc.provadiacoin.com/devnet/v1/night-brick` (+ `/anchor-state`, `/anchor-challenge`, `/anchor-reserve`, `/anchor-claim`, `/anchor-reservation-release`) reaches the twin Gatehouse at 127.0.0.1:8742 with its internal paths unchanged. Verified from `BUILD_RECORD_GATEHOUSE_2026-11-24.md` (names only, no values read or printed): systemd unit `provadia-gatehouse-devnet` on 127.0.0.1:8742, env files under `/etc/provadia-gatehouse/*.env` (mode 600 root), twin state file `anchor-record-devnet.json`, and the twin's pins are its OWN (devnet rehearsal payer + memo + cluster label in the twin's env — Part B evidence has always run the faucet-buffer rehearsal payer through it, never the mainnet anchor payer).

**Risk of exposing the twin (flagged honestly):** the route makes the DEVNET gate publicly reachable. What a stranger could do there: burn devnet rate buckets (nuisance), and — only with the devnet rehearsal wallet's key, which lives nowhere near the page — reserve/claim devnet anchors. They cannot touch the mainnet record (different process, different state file, different pins), cannot spend mainnet funds (the gatehouse holds no keys at all), and cannot use the twin to satisfy the mainnet page (different origin path, cluster, payer and memo pins; the mainnet page never addresses `/devnet/`). Residual risk is devnet-only noise; the coordinator may additionally IP-fence the location if desired, at the cost of the founder's rehearsal-from-anywhere convenience (Gemini Condition 2 rehearsal is the route's purpose).

## 2. How the three non-negotiable properties hold

**(a) Only the pinned payer's wallet can hold the reservation.** Reserve requires an ed25519 signature over the server-built canonical message, verified against `GATEHOUSE_ANCHOR_PAYER` with the same SPKI machinery Amendment 7 uses for transaction signatures. The message binds purpose + cluster + payer + memo-sha256 + the server nonce + the stamps, so a proof cannot be transplanted across purposes, clusters, or attempts. R11 proves a non-payer key is refused and creates nothing.

**(b) No third party can reserve, extend, or block it.** Reserving requires the payer proof (a). Challenge issuance — the only unauthenticated step — creates NO lock and NO record, so challenge spam cannot block the founder (and the map is bounded/pruned and per-IP bucketed besides). There is no extend operation at all. Release requires the same payer proof bound to the specific reservationId, and can only fire on the server's own upstream observation — a third party cannot fabricate the height evidence, and even the payer cannot release early (R15's first leg: release refused 409 while the stamp is valid).

**(c) No automatic unlock on any timeout, ever.** There is no timer, expiry field, or wall-clock comparison anywhere on the reservation path: a RESERVED record leaves that state only via (i) its bound claim or (ii) the authenticated evidence release of §1.1. R13 observes a live reservation across an interval plus a second session's full attempt — still held, still refusing before any wallet call.

**Challenge window vs reservation lifetime — the distinction, stated explicitly:** challenges carry a 5-minute validity window. That window is auth-handshake hygiene only (it bounds the useful life of a stolen proof and keeps the challenge map small). It applies ONLY to unused challenges. An expired challenge can never expire, extend, weaken, or otherwise affect a reservation that has already been granted; a granted reservation has no expiry of any kind, and nothing in the code reads a clock against it.

## 3. Badge derivation rule (Amendment 7 convention, applied)

The 8-hex token in `BUILD_LABEL` equals the first 8 hex of the SHA-256 of the file's bytes with the badge token itself replaced by `00000000` (per `fix-round/FROZEN_BYTES_MANIFEST.json` + `IMPROVER_FINDINGS.md`: "replacing the badge token `90f4b792` with `00000000` in the page bytes and hashing gives `90f4b7924289…`"). The version stays `v6` (Amendment 7's fix rounds kept `v6` and moved only the token). Applied identically to both pages; each badge was re-verified by zeroing only its own token (each token occurs exactly once in its file): main `05ba62bc`, twin `879d69fc`.

## 4. Test adaptations — every one named and justified

Regression (`amendment8/gatehouse-regression.mjs`):
- **R1** — assertion changed: after a signed attempt dies at local persistence, the gate record is no longer `null`; the RESERVATION stands with `signature: null` (that IS the Lock in Lock → Sign). The substance is unchanged and still asserted: no claim, no broadcast, fail closed. Also asserts exactly 1 message proof.
- **R6 (server race)** — claims are now bound, so each racer first reserves; the test asserts exactly one reserve 200 + one 409, exactly one claim 200, the loser's foreign-id claim 409, one broadcast, loser never lands. The race ChatGPT named at page level is R6+ (new).
- **R7 / R8** — direct claims became reserve-then-bound-claim (`reserveForTx`); R8's "other signature" claim now uses a foreign reservationId and is still refused 409. No assertion weakened.
- **Harness mechanics** — stub Phantom gains `signMessage` (same keypair, counted separately); per-session counters capture reserve/claim response statuses and broadcast attempts; `runPageSession` gains `signDelayMs`, `failClaim`, `pageFile` options. R6+/R15 state dirs are wiped before use (the A7 blind verifier's idempotency hygiene; run 2 of this suite failed exactly there before the wipe — see §6).

Evidence (`amendment8/gatehouse-evidence.mjs`):
- **A/C run against a local candidate gate with MAINNET pins** (anchor payer + memo, public mainnet upstreams): the candidate is not deployed, so the production gateway cannot speak for it. Every A/C check is a read or a policy refusal — no mainnet transaction can land. A11 consequently PASSES here (fixed source 127.0.0.1 drains the bucket: 60×429 of 90); its standing FAIL-from-this-origin against production was an egress-proxy artifact, and D1/D2 remain the limiter proofs.
- **B runs against a local candidate gate with DEVNET pins**, and B2 follows the Amendment 8 order (reserve → bound claim → send). B6's wait-loop height reads are weather-guarded (a failed read during the WAIT is not the behaviour under test; the expired send's rejection is). B6 was refused via the gatehouse lock (CONFIRMED record; gate log verbatim in `evidence-runB2.log`).
- **D runs its gate against a local stub upstream**: 30 concurrent egress-proxy tunnels to the public devnet endpoint timed out wholesale in two runs (0×200 / 30×502) while the bucket engagement (10×429) was already exact; D's subject is the gate's buckets, and the A7 harness's own D2 comment already separates upstream 200s from limiter behaviour. With the stub: D1 histogram exactly `{200:30, 429:10}`, D2 exactly `{200:10, 429:10}`.
- Local gate children keep the harness's event loop alive, so the harness now exits explicitly after writing results; parts may run standalone (each part starts its gate if absent).

## 5. Results (raw logs beside this report)

**Regression — 22/22 PASS, twice consecutively in place** (`regression-run3.log`, `regression-run4.log`; merged `regression-results.json`):
R1, R1b, R2a, R2b (second session: 0 tx signatures AND 0 message proofs), R5, R5b, R3, R4, **R6** (reserves [200,409], one claim, one landing), **R6+** (the proving test: signTransaction total **1** across both racing page sessions — A=1, B=0; signMessage A=1 B=1 reported separately as message proofs; reserves [200,409]; claims [200]; broadcasts 1; loser error names "NO transaction signature was requested"), R7, R8, R9, R10, **R11** (non-payer proof → 403, record null), **R12** (replay → 403 "already used"), **R13** (reservation held across ~6s of reads + a full second-session attempt refused with 0 wallet calls), **R14** (no-reservation claim 409 `no-reservation`; foreign-id claim 409 `reservation-mismatch`; nothing recorded), **R15** (release refused 409 while stamp valid → EXPIRED_UNCLAIMED persisted at observed height 2,000,010 > stamp 2,000,000 → fresh full page flow succeeds end-to-end), **R16** (blockhash-mismatch claim → 409, reservation stands), **R17** (resume: session 2 completes the bound claim with stored bytes — 0 new wallet signatures of either kind, claim [200], 1 broadcast), **R18** (twin page, real devnet: reserve → sign → claim → broadcast → MEMO VERIFIED, gate record CONFIRMED).

**Evidence A/B/C/D — 26/26 PASS** (`evidence-results.json`; logs `evidence-runA.log`, `evidence-runB2.log`, `evidence-runC2.log`, `evidence-runD4.log`): A 12/12 · B 6/6 (B2 landed `3VsANBVZzk9HWtfxmsECJELvceJRRFvRRbt24eWhkCwzf4V2DkMLs7W3ZAvagnHDxHRBZTwMirefTijK3FvVsNDg`, finalized, fee 5000) · C 6/6 · D 2/2.

**Verify-gate chain-proof — PASS** on the R18 twin-flow landing (`verify-gate-output.txt`): signature `3t75U4r8Y6pPBCJDc8DrecG3urr76v7E77oCKv22fivZEbh11GiMFrL3rsczGLSF6WzJTvhFhmvAVFtFD5fNHRA7`, slot 526007586, fee exactly 5000, memo byte-equal, only the payer moved.

**Frozen core re-proven byte-identical** (`FROZEN_BYTES_MANIFEST.json`): anchor-tx `920a6959…` · MEMO `a760a0da…` (133 B) · verify-gate `1801d5c3…` · fee 5,000 · payer `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE`. Wallet fence re-read during the run (A4/A5): balance 69,099,009 lamports, exactly 1 signature. No mainnet transaction was made.

## 6. Failures seen on the way (kept, not erased)

- Regression run 1 (`regression-run.log`, 20/22): R6+/R17 failed because the harness stub was internally inconsistent (stub height 999,999,999 > stub blockhash lvbh 999,999,998) — the page's freshness check CORRECTLY expired the stamp before persist/claim. Stub fixed; the candidate was not changed.
- Regression run 2 (`regression-run2.log`, 20/22): R6+/R15 read run 1's leftover state dirs (`startGateRaw` does not wipe). Wipes added (A7 blind-verifier hygiene). Runs 3–4: 22/22 twice.
- Evidence runs 1–2 crashed in Part B on egress-proxy tunnel timeouts (gate upstream timeout is 3.5s); Part B then passed standalone. One exec session was lost to a broad `pkill` pattern that matched its own shell — the build record's standing lesson; no production process was ever in scope (all test gates are local children, ports verified clear afterwards).

## 7. NEEDS-CHECK items for the improver

- **N1 — Challenge burn on failed proof.** A reserve/release attempt consumes its challenge even when the signature fails. This is deliberate (no retry oracle), but it means a mistyped/buggy client must fetch a fresh challenge per attempt. Confirm this is the intended posture vs consuming only on success.
- **N2 — Twin page network paragraph.** The v5 twin's "Network" text claimed MAINNET (copy leftover); the candidate twin replaces it with a devnet warning. Confirm the wording; the rest of the twin is a strict mirror.
- **N3 — Claim while a DIFFERENT live record stands.** `claimBoundReservation` answers generic `conflict` (409) when the record is CLAIMED/BROADCAST/CONFIRMED by another signature (not RESERVED). The page's 409-convergence branch keys on `heldSignature`, which the server's conflict response for the claim door does include via the pre-existing Amendment 7 response shape — verify the improver is satisfied the reservation-era 409 bodies carry everything the page's convergence needs in the RESERVED-mismatch cases (they intentionally carry `status` only, no signature, because a RESERVED record has none).
- **N4 — Release observation uses `params: []`** for `getBlockHeight` through `forward()`; the deployed upstreams accept it (proven against public devnet in the builder smoke test and R15's stub), but the improver may want a live twin check after deployment.
- **N5 — `version: 2`** is written on RESERVED records (Amendment 7 wrote `version: 1`); the claim transition keeps the record's version field as-is. Nothing reads `version` today; flagged so the change is a decision, not a surprise.
- **N6 — Evidence A11** passes against the local candidate (fixed source) while standing as FAIL-from-this-origin against production. The merged `evidence-results.json` therefore shows A11 PASS; the distinction is recorded in §4 above and in the harness header so no seat mistakes it for a production re-test.

## 8. Measured numbers (cs-engineering-rules)

Candidate sizes: gatehouse.mjs 74,783 bytes; anchor-v6.html 76,262 bytes; anchor-devnet.html 77,146 bytes — sha256 for every artefact is in `FROZEN_BYTES_MANIFEST.json`. Regression wall-clock ≈ 85 s per run (dominated by real-devnet confirmation/expiry waits — the network layer, measured in the logs); evidence parts ≈ 12–260 s (B6's expiry wait dominates). Destination probes: every claim in this report traces to a named log line or results file in `amendment8/`; nothing here was deployed, so there is no live-URL probe — deployment verification belongs to the coordinator's leg after the relay passes.

## 9. Files produced (all under `gatehouse-work/amendment8/`)

| File | sha256 |
|---|---|
| `gatehouse.mjs` | `e49932c5aace63c499045e1af16d983f817ec45f6cd36180a207f2e1d63e0ce5` |
| `anchor-v6.html` (badge `Build: v6 · 05ba62bc`) | `e7bf2ec09fc5ee9645270fe94e01870d84ba5cae722a67f218f8e99932d2e3a5` |
| `anchor-devnet.html` (badge `Build: v6 · 879d69fc`) | `76d611f652856781ade74776a993d3143a37bcc7df8c6a5b7df34bed8968d0ed` |
| `gatehouse-regression.mjs` | `96a81e351419303bc43960476f5c441040d1949ea079cd53be28bd9f0e034eea` |
| `gatehouse-evidence.mjs` | `375394f066770213652589639da0106354b82497083c6d0ea12f74072cb58f8a` |
| `FROZEN_BYTES_MANIFEST.json` · `BUILDER_REPORT.md` · `regression-results.json` · `evidence-results.json` · `twin-landing.json` · `verify-gate-output.txt` | (manifest carries the hashes) |
| Raw logs | `regression-run.log`, `regression-run2.log` (20/22, causes in §6), `regression-run3.log`, `regression-run4.log` (22/22 ×2), `evidence-run.log`/`evidence-run2.log` (Part B weather crashes), `evidence-runA.log`, `evidence-runB.log`/`evidence-runB2.log`, `evidence-runC.log`/`evidence-runC2.log`, `evidence-runD.log`–`evidence-runD4.log` |

Originals re-verified untouched at the close: `gatehouse-work/gatehouse.mjs` `2b16dfd0…`, `gatehouse-work/anchor-v6.html` `be558a04…`, `anchor-work/anchor-devnet.html` `37407d10…` — all identical to the inherited state. No stray test processes remain (all test ports probed closed).

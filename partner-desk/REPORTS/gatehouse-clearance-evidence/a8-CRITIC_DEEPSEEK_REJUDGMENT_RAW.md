CONDITIONALLY CLEARED — Conditions: (1) before mainnet go-live, the captain approves a founder-runnable release procedure for `/v1/night-brick/anchor-reservation-release` (the shipped pages have no release UI); (2) before any deployment, the deploy runbook names the A7-rollback/v2-state-file handling (an A7 server fails closed 503 on a v2 `RESERVED`/`EXPIRED_UNCLAIMED` file until the file is handled by hand). No new code-level Promise or House defect survived.

**Promise axis close:** 0 CONFIRMED · 2 NEEDS-CHECK (NC-1, NC-3) · 6 REJECTED · worst confirmed item: none. Re-adjudications: P1 FIXED-CONFIRMED, P2 FIXED-CONFIRMED, P4–P7 all REJECTED.

**House axis close:** 0 CONFIRMED · 1 NEEDS-CHECK (production deployment state) · 5 REJECTED · worst confirmed item: none.

**NC-1 ruling:** Does not block clearance as a code defect; it is a mandatory go-live condition. The release endpoint exists server-side and is authenticated, but the page never offers it, so a never-claimed reservation has no self-service recovery.

**NC-3 ruling:** Does not block clearance; the fail-closed direction is the safe one. It becomes a deploy-runbook requirement before rollback is ever attempted.

---

## Detailed findings

### Promise axis

**Re-adjudications of prior findings**

- **P1 — FIXED-CONFIRMED** — Raw `sendTransaction` no longer accepts a signed anchor with no reservation, nor one under a released reservation. Evidence: `gatehouse.mjs` `authorizeAnchorSend` returns `{ outcome: 'held' }` only when `anchorRecord.signature === sigB58` and status is `BROADCAST` or `CLAIMED`; every other state returns `{ outcome: 'conflict', record: anchorRecord }` and creates nothing. R24/R25/R26 show 403 refusals and zero upstream forwards in null/`RESERVED`/`EXPIRED_UNCLAIMED`/`FAILED_ONCHAIN`/`DEAD_PREFLIGHT` states. Disproof attempt: searched for a record-creating branch in the send path — none remains.

- **P2 — FIXED-CONFIRMED** — A device holding a signed-but-never-claimed mirror after the server releases the reservation as `EXPIRED_UNCLAIMED` is no longer locked forever. Evidence: `anchor-v6.html` `evaluateAnchorGate` now clears the mirror and returns `action: 'released'` when the server record is `EXPIRED_UNCLAIMED` with no signature and the mirror’s `blockhash` or `reservationId` matches. R27 shows mirror cleared with zero wallet calls; R28 shows ambiguous cases stay locked. Disproof attempt: tried an ambiguous mismatch — falls through to the locked reconciliation path.

- **P4 — REJECTED, confirmed** — No reservation timeout. `RESERVED` carries no expiry field; `CHALLENGE_TTL_MS = 5 * 60 * 1000` is handshake-only, and the code states an expired challenge never affects a granted reservation.

- **P5 — REJECTED, confirmed** — No third-party reserve/block. Reserve proof is verified by `verifyPayerMessageSignature` against the pinned `ANCHOR_PAYER`; challenge issuance creates no record and no lock.

- **P6 — REJECTED, confirmed** — Concurrency produces exactly one transaction-signature request. Page calls `reserveServerAnchor` before `provider.signTransaction`; R6+ reports `signTransaction total=1`.

- **P7 — REJECTED, confirmed** — Blockhash poisoning is refused. `claimBoundReservation` returns `blockhash-mismatch` when `anchorRecord.blockhash !== blockhashB58`; R16 confirms 409.

**Promise-axis checks**

- **PF1 — REJECTED** — Lock-before-sign order violated. Evidence: `reserveServerAnchor(blockhash, lastValidBlockHeight)` precedes `signedTx = await provider.signTransaction(tx)`; the server reserve is synchronous check-and-persist. R6+ proves one transaction-signature request.

- **PF2 — REJECTED** — A non-payer can hold the reservation. Evidence: reserve door verifies `sigBytes` against `ANCHOR_PAYER` only (`verifyPayerMessageSignature(canonicalChallengeMessage(consumed.challenge), sigBytes)`); R11 gives 403 and no record.

- **PF3 — REJECTED** — Automatic unlock exists. Evidence: no timer path frees `RESERVED`; release requires observed upstream height past `lastValidBlockHeight` and a strict durable persist. R13 shows the reservation standing through time passage.

- **PF4 — REJECTED** — RPC null/error releases the reservation. Evidence: release door returns `reservation unchanged` when `observedHeight === null`; R15/R20/R22 show refusal on invalid evidence.

- **PF5 — REJECTED** — Claim is not bound to the reservation. Evidence: `claimBoundReservation` refuses `no-reservation`, `reservation-mismatch`, and `blockhash-mismatch`; R14/R16 confirm 409s.

- **PF6 — REJECTED** — Devnet twin lacks the same amendments. Evidence: devnet page has `CLUSTER = 'devnet'`, the `/devnet/v1/night-brick` endpoint, the same A8 reservation/claim/release flow, and twin-local mirror key `provadia-anchor-record-devnet-v6`; R18 confirms a full devnet flow.

- **NC-1 — NEEDS-CHECK** — No founder-facing release client exists in the pages. Exact unresolved fact: whether an approved founder-runnable release procedure exists. Resolver: captain/ops approving the runbook. The server endpoint is real; the gap is operational, not cryptographic.

- **NC-3 — NEEDS-CHECK** — A7 rollback over a v2 state file leaves the old server broken-closed. Exact unresolved fact: whether the deploy/rollback runbook names the manual file handling. Resolver: captain/ops.

---

### House axis

- **HF1 — REJECTED** — Frozen core altered. Evidence: manifest `fixFreeze.frozenCore` keeps `anchorTx`, `feeLamports: 5000`, and `memoText` hash unchanged; regression B3 shows `fee=5000`, 3 instructions, only payer moved; both pages display the same memo and `0.000005 SOL`. Disproof attempt: looked for a different memo/fee string in the page bytes — none.

- **HF2 — REJECTED** — Crew made a mainnet transaction. Evidence: manifest wallet-fence re-read is unchanged `69,099,009 lamports, exactly 1 signature`; evidence A5 shows `signatures=1`; all new landings are devnet. Disproof attempt: no mainnet send in regression or evidence logs.

- **HF3 — REJECTED** — Broadcast without a verified record. Evidence: page runs `persistAnchorRecordVerified(anchorRec)`, then `claimServerAnchorRecord(...)`, then `sendRawTransaction`; server send forwards only for durable `CLAIMED`/`BROADCAST` bound records. R1/R2a/R9 confirm fail-closed paths.

- **HF4 — REJECTED** — Clearing on incomplete provider information or automatic timeout. Evidence: server observation only transitions on positive evidence; release door does nothing on null height; no timer unlocks the record; page R3/R4 keep records `CONFIRMED`/`BROADCAST` and locked on null history.

- **HF5 — REJECTED** — Non-durable or duplicate identity. Evidence: one durable state file per instance, `persistAnchorRecord` uses tmp + fsync + rename; `reserveAnchorLock` is synchronous check-and-persist, so exactly one writer wins.

- **HF-N — NEEDS-CHECK** — Production deployment state. Exact unresolved fact: whether these bytes have been deployed to production. Resolver: captain/ops; the frozen artefact contains no evidence of deployment.

*Self-audit note: second pass reclassified NC-1 from a suspected code defect to the operational NEEDS-CHECK above, and separated the P1/P2 re-adjudication grades from the Promise closing counts.*
I reviewed the fixed point named in the manifest’s `improverFreeze` block: `gatehouse.mjs` sha256 `5e53421677280de76bbd1ba3ca5e4a24f237aed194cccafd6f6cab882ad08875`, main page sha256 `e7bf2ec09fc5ee9645270fe94e01870d84ba5cae722a67f218f8e99932d2e3a5`, devnet twin sha256 `76d611f652856781ade74776a993d3143a37bcc7df8c6a5b7df34bed8968d0ed`.

Fresh-subagent note: I cannot spawn two genuinely separate subagent contexts in this reply. I ran two separated passes, holding each axis’ rules alone, and kept the reports unmixed. The skill would treat same-chat passes as weaker than true fresh subagents; I flag that rather than misreport it.

---

# 1. PROMISE AXIS

The promise is Amendment 8 requirement set 2b: Lock → Sign → Persist → Broadcast → Verify, with an atomic authenticated pre-signature reservation, bound claim, positive-evidence-only release, no timeout, strengthened R6, and frozen transaction/payer/memo/fee unchanged.

## Promise findings

### P1 — CONFIRMED — Raw `sendTransaction` path accepts a signed anchor with no reservation, and also accepts one under a released reservation

Evidence:

`gatehouse.mjs`, night-brick `sendTransaction` branch:

```javascript
anchorSendSig = parseSignedWire(wire).sigB58;
const claim = claimAnchorLock(anchorSendSig, 'BROADCAST');
```

`gatehouse.mjs`, `claimAnchorLock`:

```javascript
if (anchorRecord && !ANCHOR_LOCK_FREE.has(anchorRecord.status)) {
    return { outcome: 'conflict', record: anchorRecord };
}
const rec = {
    version: 1, signature: sigB58, payer: ANCHOR_PAYER, cluster: CLUSTER_LABEL,
    ...
    status: asStatus, claimedAt: now, updatedAt: now,
    ...
};
```

There is no `reservationId` check on the JSON-RPC `sendTransaction` door. If the record is `null`, `FAILED_ONCHAIN`, `DEAD_PREFLIGHT`, or `EXPIRED_UNCLAIMED`, `claimAnchorLock` creates a fresh `BROADCAST` record and forwards the signed bytes.

Disproof attempt: I looked for an earlier reservation guard in the raw send branch and for any reserve-status requirement in `claimAnchorLock`; none exists. The only upstream gates are `assertAnchorTx` and `verifyAnchorSignature`, which prove shape and founder signature, not reservation. A signed tx constructed outside the page would pass and broadcast. Requirement 3 says “a signed tx without the reservation or under a released/foreign reservation is refused.” The `anchor-claim` door enforces that; the raw RPC send door does not.

### P2 — CONFIRMED — After the server releases an unclaimed reservation as `EXPIRED_UNCLAIMED`, a device whose local mirror still holds the signed-but-never-claimed record can remain locked indefinitely

Evidence:

`anchor-v6.html`, `evaluateAnchorGate`:

```javascript
if (serverRec && serverRec.status === 'RESERVED') {
  ...
}
...
if (serverRec && (serverRec.status === 'CLAIMED' || serverRec.status === 'BROADCAST')) {
  governing = { signature: serverRec.signature };
} else if (local && local.memoText === MEMO_TEXT && local.status === 'SIGNED_UNCONFIRMED') {
  governing = { signature: local.signature };
}
```

If `serverRec.status === 'EXPIRED_UNCLAIMED'` and a local `SIGNED_UNCONFIRMED` mirror exists, the second branch makes the local mirror govern. `reconcileAnchorSignature` then returns `locked` for a transaction that never landed:

```javascript
if (st && st.err) return { outcome: 'failed' };
if (st && (st.confirmationStatus === 'confirmed' || st.confirmationStatus === 'finalized')) {
  return { outcome: 'confirmed', foundSignature: sig };
}
...
return { outcome: 'locked' };
```

Disproof attempt: I checked whether any load/gate branch clears the local mirror when the server record is `EXPIRED_UNCLAIMED`; no branch does. `clearAnchorRecord()` appears in failed-on-chain, `DEAD_PREFLIGHT`/`FAILED_ONCHAIN` expiry handling, and failed paths — not for a server release of an unclaimed reservation. This is NC-2, confirmed as a page-flow gap.

### P3 — NEEDS-CHECK — Devnet twin full bytes were not supplied for byte-level review

The requirement says the devnet twin receives the same amendments. The manifest gives `twinPageSha256 = 76d611f652856781ade74776a993d3143a37bcc7df8c6a5b7df34bed8968d0ed`, and §3d supplies only the constants block. The regression log R18 asserts the twin flow works, but the full bytes were not placed in front of me.

Resolution: supply full `anchor-devnet.html`, or a check showing the supplied file hashes to `76d611...`.

### P4 — REJECTED — Suspected automatic reservation timeout

Suspected defect: the `CHALLENGE_TTL_MS` might expire a reservation.

Disproof: the challenge window is explicitly handshake-only:

```javascript
const CHALLENGE_TTL_MS = 5 * 60 * 1000;
```

And:

> an expired challenge never affects a granted reservation.

`reserveAnchorLock` persists `RESERVED` with no expiry field, and release requires observed height past stamped `lastValidBlockHeight`. No timer expires a reservation. REJECTED.

### P5 — REJECTED — Suspected third-party could hold/block reservation

Suspected defect: reservation could be acquired without payer control.

Disproof: reserve requires a `signMessage` proof, and the server verifies against the pinned payer:

```javascript
if (!sigBytes || !verifyPayerMessageSignature(canonicalChallengeMessage(consumed.challenge), sigBytes)) {
```

`verifyPayerMessageSignature` builds the public key from `ANCHOR_PAYER` only. No third-party reserve, and challenge spam creates no lock. REJECTED.

### P6 — REJECTED — Suspected R6 only prevents duplicate broadcast, not duplicate signature request

Suspected defect: concurrency still produces two wallet transaction-signature requests.

Disproof: the server reserve is synchronous check-and-persist:

```javascript
function reserveAnchorLock(c) {
  ...
  if (anchorRecord && !ANCHOR_LOCK_FREE.has(anchorRecord.status)) {
    return { outcome: 'conflict', record: anchorRecord };
  }
  ...
  try { setAnchorRecord(rec); }
```

and the page calls `reserveServerAnchor` before `provider.signTransaction`:

```javascript
reservation = await reserveServerAnchor(blockhash, lastValidBlockHeight);
...
signedTx = await provider.signTransaction(tx);
```

Regression R6+ reports `signTransaction total=1 (A=1 B=0)`. REJECTED.

### P7 — REJECTED — Suspected bound claim could be poisoned by a different blockhash

Suspected defect: claim would accept a tx whose blockhash differs from the reservation stamp.

Disproof: `claimBoundReservation` compares them:

```javascript
if (anchorRecord.reservationId !== reservationId) return { outcome: 'reservation-mismatch',

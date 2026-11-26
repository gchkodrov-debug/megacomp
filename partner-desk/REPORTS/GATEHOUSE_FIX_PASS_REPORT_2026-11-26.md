# FIX REPORT — Gatehouse Expiry-Binding Correction (+ GH-A8-G2)
## Fix pass of 2026-11-26 · local only · NOT deployed · originals untouched

**Scope fence honoured:** all work was done locally in this folder on copies.
Nothing was deployed, nothing touched the VPS, no keys or credentials were
handled, nothing was signed. The pre-fix originals remain byte-identical in
`~/workspace/newwave/next-build/gatehouse-work/amendment8/` (implementation
sha256 `c4010ed6…`, matching the Addendum #2 packet's frozen manifest).

---

## 1. The defects as adjudicated

**Requirement 5 — NOT MET (ChatGPT, Guardian adjudication of Addendum #2,
2026-11-26).** In `gatehouse.mjs` (reserve door, FIX-2, pre-fix lines
911–996), the server checked whether the caller-supplied expiration height
fell within a broad range (±1000) of the server-observed blockchain height,
but it did **not** establish that the expiration height belongs to the
particular reserved blockhash. The evidence used to release a reservation
was therefore not sufficiently authoritative: a stamp inside the window but
below the blockhash's true `lastValidBlockHeight` would arm the release
door to free the lock while the bound transaction could still land.
Existing tests R15/R19 did not close this gap (R19 tested the window's
edges; R15's fixture itself declared a height that was not its blockhash's
own expiry — see §5).

**Correction required (verbatim substance):** the Gatehouse must
independently establish the authentic blockhash and its corresponding
expiration height, bind that pair to the reservation, and release the
reservation only when reliable evidence establishes that the specific
blockhash has expired. A narrow security correction — no architecture
replacement.

**GH-A8-G2 — Requirement 6, CONDITIONAL PASS → precise finding (same
adjudication).** What the Gatehouse persisted was signature + metadata
from which the transaction is reconstructable — not the raw signed bytes
themselves. Requirement: either (a) persist the exact signed bytes, or
(b) prove byte-identical reconstruction with a test, including across a
simulated restart. **Route taken: (a) persist-exact** — see §3.

---

## 2. The expiry-binding correction — exact code changes

All changes are in `gatehouse.mjs` (1,268 → 1,403 lines). The two anchor
pages are **unchanged** (hashes still match the frozen packet manifest).

| # | Location (fixed file) | Change |
|---|---|---|
| 1 | Header, lines 43–66 | Fix-pass design note (the correction + GH-A8-G2), in the file's existing amendment-comment style. |
| 2 | Lines 643–669 | **Server-observed pair registry**: `observedBlockhashPairs` (bounded Map, cap 2048, oldest evicted) + `noteObservedBlockhashPair()` + `parseLatestBlockhashPair()`. Every (blockhash, lastValidBlockHeight) pair this process itself receives from upstream is recorded. A blockhash's lastValidBlockHeight is a constant of its block, so an observed pair is true forever. |
| 3 | Lines 1302–1310 (RPC handler, after a successful forward) | Every forwarded `getLatestBlockhash` response is parsed and its pair registered — the designed client (the anchor page) fetches its blockhash through this gate, so its pair is always first-hand observed. Registration never breaks the read path. |
| 4 | Lines 1006–1057 (reserve door, after the unchanged FIX-2 window check, before the lock) | **Establishment**: the bound height is the registry's pair for the declared blockhash. On a registry miss — or when the registry pair disagrees with the declared height — the gate re-establishes from a **fresh upstream `getLatestBlockhash` fetch** (a fresh pair naming this same blockhash is by definition its authentic pair and settles any disagreement). Outcomes: pair established and declared height ≠ established height → **400 refused** (`expiry-pair-mismatch`, nothing reserved); blockhash not establishable → **502 refused** (fail closed, the observation-unavailable discipline). On success the established pair is passed to the lock as the binding. Reserve atomicity is unchanged: all awaits precede the synchronous check-and-persist. |
| 5 | Lines 740, 752–756 (`reserveAnchorLock`) | Takes the `expiryBinding` and persists it in the RESERVED record: `{source: 'server-observed', blockhash, lastValidBlockHeight, observedHeight, boundAt}`. |
| 6 | Lines 1078–1094 (release door) | The expiry evidence is read **only from the bound pair** (`anchorRecord.expiryBinding`), never from the bare record field. A RESERVED record with no binding — or a binding whose blockhash does not match the record's — is **refused 409 (fail closed)** and stands; its only exit is its bound claim. Everything downstream (server-observed height > bound height, strict persist before response, 502 on unobservable height) is unchanged. |
| 7 | Lines 609–621 (`publicAnchorRecord`) | The public record now exposes `expiryBound` (whether the standing record carries a server-bound pair) and `signedTxSha256` (see §3). |

**Design note — why establishment is sound.** The reserve challenge still
binds the caller's *declared* pair into the signed proof (unchanged — it is
an auth handshake). What changed is that the declaration is no longer
trusted: the record's expiry is the gate's own observation. The honest flow
is unaffected because the page's pair comes from the gate itself. A forged
height can never be bound, because the gate will only bind a height an
upstream actually issued for that blockhash; a blockhash the gate cannot
establish cannot be reserved at all.

**Refinement found during this pass (disclosed).** The first implementation
draft consulted the registry before any fetch; the suite's R23 then exposed
that a registry entry written earlier in a test's life can be stale *for the
fixture's recycled stub blockhash* (on a real chain a blockhash is issued
exactly once, so its pair cannot change). The shipped logic therefore
re-fetches on any disagreement between the registry and the declared height
and lets the freshest upstream answer settle — which is strictly more
faithful to "independently establish", and is the version both runs below
passed. The failed draft run is not hidden: it crashed R23's detail line
after 26 passes (`expiry-pair-mismatch … declaredLvbh 4000010,
establishedLvbh 4000000` in the gate log of the discarded run) and was
diagnosed from that log before the correction.

---

## 3. GH-A8-G2 — persist the exact signed bytes (route (a))

The claim door already receives the full signed wire bytes
(`body {tx: base64}`); the pre-fix record kept only the derived signature.
The fix persists the bytes themselves:

| # | Location (fixed file) | Change |
|---|---|---|
| 1 | Line 774 (`claimBoundReservation`) | Takes `signedTxBase64` (the claim handler passes `bodyObj.tx` through — line ~1160). |
| 2 | Lines 792–806 | On the RESERVED → CLAIMED transition the record stores `signedTxBase64` — the exact bytes, persisted by the same atomic fsync write that already precedes every effect. The persist-failure revert snapshot now includes the field, so a failed claim write restores the record exactly. |
| 3 | Lines 615–621 (`publicAnchorRecord`) | Exposes `signedTxSha256` — sha256 of the persisted bytes — so byte-identity is checkable against any presented transaction without the state endpoint serving the bytes. |

**Proof (test R33, §4):** the state file's persisted base64 hashes
(sha256) identically to the originally signed bytes; the public record
carries the same hash; after a full gate restart on the same state file
the persisted bytes are still byte-identical, and the restarted gate
forwards exactly those bytes at the send door. Reconstruction is no longer
involved anywhere: what is persisted **is** the transaction.

Record-shape note: `signedTxBase64` is an additive field. The shape
validator pins the fields it already pinned and does not reject additional
fields, so pre-fix records (which lack it) still load; their public
`signedTxSha256` reads `null`.

---

## 4. New regression tests (suite format; results in §6)

Appended to `gatehouse-regression.mjs` as R29–R33 (the suite now runs 37):

- **R29 — Guardian case (a).** Real served blockhash + forged expiry
  height 500 **below** its true lastValidBlockHeight (inside the old
  ±1000 window): reserve **refused 400**, no record created.
- **R30 — Guardian case (c), the exact old gap.** Declared height +900
  over observed (the old window's arithmetic passes it) but not the
  blockhash's bound expiry: **refused 400**. Control: the true pair
  reserves, and the persisted record carries the server-bound pair
  (`expiryBound: true` in the public record).
- **R31 — Guardian case (b).** A reservation bound to the established
  pair, released once the server-observed height passes **the bound**
  height (H → H+150): release **200**, `EXPIRED_UNCLAIMED` persisted,
  response reports the bound height as the expiry it judged against.
- **R32 — Guardian case (d).** A seeded **legacy** RESERVED record
  (valid pre-fix shape and pins, stamped height, **no bound pair**):
  release refused **409 (fail closed)** with the observed height 5,000
  past its stamp; the record stands RESERVED.
- **R33 — GH-A8-G2.** Exact-bytes persistence proof as detailed in §3,
  including the simulated restart (fresh gate process, same state file)
  and a post-restart send of exactly the persisted bytes.

## 5. Fixture adaptations to pre-existing tests (named, assertions untouched)

The corrected protocol binds only pairs the gate has itself observed, so
fixtures whose worlds contradicted that had to tell one consistent story —
the same named-adaptation discipline the A8 improver seat used for FIX-2.
**No assertion of any pre-existing test was changed or weakened.**

- **Stub programmability**: `stubBehavior.latestBlockhash` (default = the
  historical fixed pair `EkSnNWid2…/999999998`); the stub's
  `getLatestBlockhash` now serves it.
- **R15, R22, R23 (×2 heights), R27, R28**: each test's world runs at its
  own height H with a blockhash expiring at H; the stub now serves that
  pair during the test (and the default pair is restored where the test
  already restored the height). R15's pre-fix fixture had declared
  (blockhash, H) while the stub's own `getLatestBlockhash` said the same
  blockhash expires at 999999998 — i.e. R15 previously *relied on* the
  adjudicated defect; its assertions (refused while valid, released after
  expiry, fresh flow succeeds) are unchanged and now run against a
  consistent world.
- **R6, R7**: the racers'/expiry test's transactions are built from
  blockhashes fetched **through the gate** (a `web3.Connection` pointed at
  the gate — the pattern R22–R27 already used), because the gate can only
  bind pairs it observed; the gates' upstream is real devnet, so the pairs
  are real. Race and expiry semantics unchanged.
- **R8, R14**: these reserve a real-devnet pair against a stub-upstream
  gate and already pointed the stub's height at the real devnet height
  ("one consistent story"); the stub now also serves the real pair as its
  latest blockhash for those reserves (restored afterwards).

## 6. Run results

Environment: this VM, devnet reachable, unmodified-suite baseline first
re-proven in a pristine sibling copy: **32/32 PASS** (so every result below
is attributable to this pass, not the environment).

- **Run 1** — `regression-run-fixpass1.log`: **37/37 PASS**
  (32 pre-existing + R29–R33).
- **Run 2** — `regression-run-fixpass2.log`: **37/37 PASS**, consecutive.
- Machine-readable results: `regression-results.json` (37 entries, all PASS).
- **No test failed in either final run.** The one failure of the pass — the
  discarded establishment draft crashing inside R23 — is disclosed in §2
  with its diagnosis; it was a defect in this pass's first draft, found by
  the suite, fixed in the establishment logic (not in the test's
  assertions), and both final runs postdate the fix.

## 7. sha256 manifest (fixed artefacts)

Recorded in `FIX_PASS_SHA256_MANIFEST.txt` beside this report:

- `gatehouse.mjs` — `0691728d751c90d2fa4b7246778b15c96aabfeae252f3d1df50709b9a42d5c7f`
- `gatehouse-regression.mjs` — `76b2cd727c15f22341e528eecb54fb38423f407c0795f0ccb2d7199282c769c1`
- `anchor-v6.html` — `900323c367a6af95500eba1edf198e7ff4497867388d3732cebfbea72644d4ba` (unchanged — matches the Addendum #2 frozen manifest)
- `anchor-devnet.html` — `40eb08b46744f9f307790837c53907e160fdc7a5ecab9fed306e40e974f13887` (unchanged — matches)

## 8. What remains (not done here, by design)

1. **Re-judgment**: this packet (fixed bytes + this report + both run logs +
   `NC-1_CHECKLIST.md`) goes back to ChatGPT (Guardian) for re-adjudication
   of requirements 5 and 6, and the NC-1 checklist goes to the captain for
   the approval signature it carries (left **unsigned**).
2. **Deployment is a separate, gated step** — nothing here is deployed.
   One operational consequence to check at deploy time: any RESERVED record
   written by the pre-fix bytes has no bound pair and, under the corrected
   release door, can never be released on expiry grounds (fail closed,
   §2 #6); before deploying, confirm the live record is null or terminal,
   or plan for that record's bound claim / manual-clear handling.
3. **The rest of the chain is unchanged**: Gemini's three conditions
   (#100 §3 — deploy v6 + live origin fetch → desktop Phantom devnet
   rehearsal → wallet re-confirm + build record) still run in order once
   the Guardian's stamp lands; the standing obligation to re-run the
   evidence harness's Parts B/C/D in healthy network weather is untouched
   by this pass; mainnet remains on HOLD; the founder's signature remains
   the final gate.

## 9. Adjudication cross-check

Nothing in the code contradicted the adjudication's description of the
defect: the pre-fix reserve door did exactly what the adjudication said
(window check on a caller-declared stamp, FIX-2 comment at pre-fix lines
908–926; release judged against the record's caller-declared stamp,
pre-fix lines 951–996), and R15/R19 indeed did not cover pair ownership.
One scope note: the adjudication located the defect at "lines 911–996";
the release half of the same defect (judging expiry against the unbound
stamp) sits in the same span and is corrected by the same binding (§2 #6).

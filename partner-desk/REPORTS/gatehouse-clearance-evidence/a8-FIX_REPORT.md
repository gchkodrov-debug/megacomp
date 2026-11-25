# FIX REPORT — GATEHOUSE AMENDMENT 8, FIX ROUND (critic P1 + P2)

**Seat:** FIX (Relay Law: builder → improver → critic → **fix** → critic re-judges).
**Skills/tools loaded (paths, as required):**
- `~/workspace/newwave/tools/CREW_TOOLS_MANIFEST.md`
- `~/workspace/newwave/tools/crew-skills/INDEX.md`
- Binding skill: `~/workspace/newwave/tools/crew-skills/cs-engineering-rules.md`
- Binding skill: `~/workspace/newwave/tools/crew-skills/verify_status_before_reporting/SKILL.md`

**Scope discipline:** work was done ONLY in `gatehouse-work/amendment8/`. Nothing was deployed; no VPS/nginx change; no mainnet transaction (wallet fence re-read during this leg's Part A run: 69,099,009 lamports, exactly 1 signature — unchanged). Filed/deployed originals re-verified untouched at the close (§6).

---

## 1. Final frozen bytes (fix freeze)

| File | sha256 | Badge |
|---|---|---|
| `gatehouse.mjs` | `c4010ed628ccd21f21d15ee0899b30b108d426878b329283a1daae688f86d07f` | — |
| `anchor-v6.html` | `900323c367a6af95500eba1edf198e7ff4497867388d3732cebfbea72644d4ba` | `Build: v6 · e72aaae3` |
| `anchor-devnet.html` | `40eb08b46744f9f307790837c53907e160fdc7a5ecab9fed306e40e974f13887` | `Build: v6 · ce8823ec` |
| `gatehouse-regression.mjs` | `57e3fba5930ae16cbb5c8aca1b536c6c8b0c0e8cd7721f8f57b1a1e1e23e87aa` | — |
| `gatehouse-evidence.mjs` | `940f1f8165c4229da7c9b07219b8f3c5176d3c2421d8705c43330b1ccbd7871e` | — (unchanged from the improver freeze) |

Badges re-derived under the house rule (zero the token → sha256 → first 8 hex == token; each token occurs exactly once per file) and verified programmatically after the write. Twin-vs-main diff after the fix still shows ONLY the builder's claimed deltas (title, rehearsal banner, network paragraph, meta line, `CLUSTER='devnet'`, RPC base + route comment, wallet line, Solscan `?cluster=devnet`, twin-local mirror key, badge) — the P2 fix is byte-identical in both pages' gate functions (verified by diff of `evaluateAnchorGate`).

**Frozen core re-proven byte-identical:** anchor-tx `920a695952fa30796d1bce958f1674e27ebae733250a8ec6d1def7963a44d6fc` · MEMO `a760a0daaacf5aab4bab907aa17f58f5facc85d8e22b018d472396059e98fb28` (133 B) · verify-gate `1801d5c332c86ea96a0b536dda1f128e2ff2350798b311838860a1b9a7fbabfc` · fee 5,000 (B3 + both verify-gate proofs) · payer `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE`.

---

## 2. P1 — the raw send door no longer bypasses the reservation (server)

**The defect (critic, CONFIRMED):** the `/v1/night-brick` `sendTransaction` branch called `claimAnchorLock(anchorSendSig, 'BROADCAST')`, which CREATED a fresh `BROADCAST` record whenever the record was null, `FAILED_ONCHAIN`, `DEAD_PREFLIGHT`, or `EXPIRED_UNCLAIMED` — so a founder-signed anchor that never reserved and never claimed could still be broadcast through the Gatehouse, violating Amendment 8 requirement 3.

**The fix (`gatehouse.mjs`):**
- `claimAnchorLock` is **removed entirely** (it had exactly one caller — the send door; the claim door has used `claimBoundReservation` since the builder's leg).
- New `authorizeAnchorSend(sigB58)` (`gatehouse.mjs:519`), called from the send branch (`gatehouse.mjs:1129`) after the unchanged byte assert and payer-signature verification. It **never creates a record**. It authorizes the forward ONLY when the transaction's derived signature equals the recorded signature of a live record in **CLAIMED** or **BROADCAST** status (the bound-claim state):
  - `BROADCAST` + same signature → `held`, `stamped: false`.
  - `CLAIMED` + same signature → the Amendment 7 Finding-E discipline is preserved verbatim: the CLAIMED → BROADCAST stamp is persisted BEFORE the forward (persist failure → `broken`, 503, memory reverts), returning `held`, `stamped: true` — the observation block's DEAD_PREFLIGHT guard keys on `stamped` exactly as before.
  - **Everything else → `conflict`**: null record, RESERVED (signature null), EXPIRED_UNCLAIMED, FAILED_ONCHAIN, DEAD_PREFLIGHT, CONFIRMED (already landed — a re-send is a duplicate), or any signature mismatch. The door answers in the existing duplicate-prevention refusal shape (HTTP 403, JSON-RPC −32003, message beginning `gatehouse policy refusal: duplicate-anchor prevention — a send is forwarded only for the signature of a bound-claimed anchor record (…)`), with the held record described null-safely (`recorded signature none, status RESERVED` / `no anchor record stands`).
  - Store unreadable/unpersistable → `broken` → 503, as before (R1b still proves claim 503 + send 503 + nothing lands).
- **Preserved untouched:** the byte assert, payer signature verification, BROADCAST → CONFIRMED observation transitions, the DEAD_PREFLIGHT single-contact/stamped guards, all other routes (Mint/Keeper/Sentinel read-only allowlists, heartbeat) — the new rule sits inside the night-brick `sendTransaction` branch only. Simulations never reach it (unchanged).

**Convergence-path adjudication (required):** the Amendment 7 Critic-Finding-A convergence — a `getTransaction` READ for a *different* signature, while the record stands CLAIMED/BROADCAST, graduating the record to CONFIRMED when the landed transaction byte-matches the pinned anchor shape — **is KEPT, and does not conflict with the new rule**, for three reasons:
1. **It is a read path, not a send path.** It forwards nothing and broadcasts nothing; no transaction can reach the chain through it. The P1 rule governs what the Gatehouse will *broadcast*; convergence only records what the chain *already holds*.
2. **It requires the same positive on-chain evidence A7 required — all of it, conjunctively:** a landed `getTransaction` result (non-null), `meta.err` unset, `meta.fee === 5000`, `keys[0] === ANCHOR_PAYER`, exactly 3 instructions, `ix[2]` program == Memo program, and memo data **byte-equal** to the pinned MEMO bytes. A merely well-formed signed transaction — the thing P1 refuses at the send door — can never trigger it, because an unlanded transaction returns null and null changes nothing (Defect 02 discipline).
3. **Removing it would break a designed behaviour, not close a hole:** it exists for the case where the founder's inscription landed via another route (e.g. sent from the wallet directly) while a bound claim stands — the record then truthfully graduates to CONFIRMED with `confirmedSignature` noted, instead of locking the ceremony forever against an inscription that provably exists. The exception is annotated in the code at the convergence block so the next seat does not have to re-derive this.

**Tests (new, `gatehouse-regression.mjs`):**
- **R24** — a perfectly valid payer-signed anchor (exact frozen shape) that was never claimed is refused at the raw send in the lifecycle states **null record**, **live RESERVED**, and **EXPIRED_UNCLAIMED**: HTTP 403 duplicate-prevention each time, **zero upstream forwards** (new stub `sendCount` counter), record untouched in each state (null / RESERVED with signature null / EXPIRED_UNCLAIMED with signature null).
- **R25** — the same refusal over seeded standing **FAILED_ONCHAIN** and **DEAD_PREFLIGHT** records (the two lock-free states the old code would have overwritten with a fresh BROADCAST record): 403, zero forwards, seeded record byte-untouched.
- **R26** — the non-regression leg (the Part B path at server level): reserve → bound claim → raw send **forwards** (stub result == the claimed signature, exactly 1 upstream forward, record stamps BROADCAST); a **different** perfectly valid payer-signed anchor tx sent while that claim stands → 403, never forwarded, record unchanged. This also covers the brief's "different valid signed tx while a claim stands" requirement in the new regime (R6's loser-send leg covers it in the racing regime and still passes).

## 3. P2 — the page mirror converges on a server evidence-release (both pages)

**The defect (critic, CONFIRMED; improver NC-2):** when the server record read `EXPIRED_UNCLAIMED` and the local mirror held `SIGNED_UNCONFIRMED` (signed under that reservation, never claimed), `evaluateAnchorGate` let the mirror govern and reconciliation returned `locked` forever — no branch cleared it.

**The fix (`anchor-v6.html:1204`, byte-identical in `anchor-devnet.html:1213`):** a new branch in `evaluateAnchorGate`, placed after the RESERVED branch and before governing-signature selection. It fires ONLY when **all** of these hold:
- `serverRec.status === 'EXPIRED_UNCLAIMED'` — a state the server persists **only** after observing chain height past the reservation's stamped `lastValidBlockHeight` through its own upstream (positive evidence; the page reads no clock and no local elapsed time anywhere in this branch — property (c) is untouched);
- `!serverRec.signature` — the released record carries no signature;
- the local mirror is `SIGNED_UNCONFIRMED` for this page's memo;
- the mirror's recorded `blockhash` **equals** the released record's stamped blockhash, **OR** the mirror's `reservationId` matches the released record's `reservationId` (the A8 mirror records both).

On that exact evidence the branch calls `clearAnchorRecord()` and returns `{ action: 'released', message }`. Both click handlers (Sign, `anchor-v6.html:1272`; reissue plaque, `:1318`) handle `released` by surfacing the notice in the result area and standing down **fresh** — nothing submitted, Sign stays live. The notice reads, in substance: *the Gatehouse has RELEASED the reservation this device signed under (EXPIRED_UNCLAIMED) — the server observed the chain pass the stamped lastValidBlockHeight, so the signed bytes on this device, which carry that same stamped blockhash, can never land; nothing was broadcast under that reservation and no fee was paid; the stale signed record has been cleared; a new attempt may begin.*

**Guard discipline:** any ambiguity — mirror blockhash *and* reservationId both differing, a signature on the server record, a mirror in any other state, an unreadable server record — falls through to the existing governing-signature reconciliation and stays LOCKED, exactly as before. Properties (a) and (b) are untouched (no new door, no new authority; the page gains no power to clear anything on its own say-so — the server's persisted record is the sole trigger).

**Tests (new, page vm harness):**
- **R27** — positive leg: reserve (stub blockhash B, reservationId R) → mirror seeded `SIGNED_UNCONFIRMED` with blockhash B + reservationId R → server evidence-release (stub height advanced past the stamp) → Sign tap converges: **mirror cleared, notice surfaced (contains `EXPIRED_UNCLAIMED`, "Nothing was broadcast", "cleared"), ZERO wallet signature requests of either kind during the convergence** — and a second tap then runs a complete fresh flow end-to-end (1 signTransaction, 1 broadcast, gate record CONFIRMED under a NEW reservationId), proving the gate stood down to fresh rather than merely unlocking once.
- **R28** — negative twins: (a) server `EXPIRED_UNCLAIMED` but the mirror's blockhash **and** reservationId both differ → stays LOCKED, mirror intact, zero wallet calls; (b) the released record *as the page sees it* carries a signature (injected via a new harness `anchorStateMutator` option that rewrites only the anchor-state body — a shape the real gate's store validation never persists, used to prove the page's own guard) → stays LOCKED, mirror intact, zero wallet calls.

## 4. Test adaptations — every one named

**Candidate behaviour:** none. No earlier test needed its *path* changed: every earlier send in the suites already follows reserve → bound claim → send (the page flows R2/R6+/R10/R15/R17/R18/R23, the server flows R6/R7/R8) or is refused at an earlier door (byte assert A7/A8/B5/C1–C6, signature verification A10, store door R1b). Evidence Part B already ran reserve → bound claim → send (builder's adaptation), and B6's expired send is now refused by the new send-door lock — its detail names the refusal via the gate log verbatim (`"refused":"duplicate-anchor lock (send without a bound claim)"` in `evidence-runB-fix.log`); B6's assertion (rejected + height > lvbh) is unchanged and still passes.

**Harness fixture fixes (fix run 1 → fix run 2; no assertion weakened, candidate untouched):**
- **R24 leg 3 (429 → 403):** fix run 1 read `EXPIRED send HTTP 429` — the send door's dedicated bucket (2 tokens, refilling 2/min) is checked *before* the authorization door, and legs 1+2 had drained it. The test now waits ~31 s for one token to refill so leg 3 is refused **on the merits** (403 duplicate-prevention). The wait and its reason are commented in the test.
- **R27 final-signature assertion:** fix run 1 asserted the final record's signature `!==` the mirror's signature. The stub's blockhash is deterministic, so the fresh second-tap transaction is byte-identical to the mirror transaction and carries the *same* signature — the assertion was wrong, not the candidate. It now asserts the final record carries a **new reservationId** (≠ the released one) with status CONFIRMED, which is the actual freshness proof; the reason is commented in the test.
- **Harness mechanics added:** stub upstream `sendCount` (counts sends the gate actually forwarded — the zero-forward evidence in R24/R25/R26) and the `anchorStateMutator` page-session option (R28b only). Header comment in the harness records the fix-round additions.

**Failures disclosed (kept, not erased):** fix run 1 (`regression-run-fix1.log`) was **30/32** — the two fixture defects above. Evidence's first fix attempt (`evidence-run-fix.log`) passed Part A 12/12 then **crashed in Part B on egress-proxy tunnel timeouts** ("Connection to establish proxy tunnel timed out after 3500ms"; the gate failed closed with 502) — the same weather failure the builder and improver disclosed; Part B was re-run standalone and passed 6/6 (`evidence-runB-fix.log`), C and D standalone 6/6 and 2/2 (`evidence-runC-fix.log`, `evidence-runD-fix.log`).

## 5. Results on the final frozen bytes (raw logs beside this report)

- **Regression: 32/32 PASS, twice consecutively** — `regression-run-fix2.log`, `regression-run-fix3.log` (27 inherited tests + R24–R28). R6+ still proves total `signTransaction` across two racing page sessions == 1.
- **Evidence A/B/C/D: 26/26 PASS** — A 12/12 (`evidence-run-fix.log`), B 6/6 (`evidence-runB-fix.log`), C 6/6 (`evidence-runC-fix.log`), D 2/2 (`evidence-runD-fix.log`; D1 histogram exactly `{200:30, 429:10}`, D2 exactly `{200:10, 429:10}`).
- **Verify-gate chain-proofs on fixed-flow devnet landings — PASS twice:**
  - Evidence B2 (reserve → bound claim → send through the fixed gate): `TLCFmn6C2AgP8Ve76pnC5cXGmrCnMSNCBpDECHTqZDKAao9u29qDhYCeuKGNkiubzzvL3Fuj3qJothJgChbjpeX`, slot 526022793, fee exactly 5000, memo byte-equal, only the payer moved — `verify-gate-output-fix.txt`: **GATE CHAIN-PROOF PASS**.
  - R18 twin-page landing (fix3 run): `Swz11ZBZ5THSmGdpmvcYeKTWkNUybBwJPz5VfuQp9DWjcsXm6rNgZ9QbbUiQEyW8B7qUkvDVauJLQAYGE7aztnk`, slot 526021928 — `verify-gate-output-fix-twin.txt`: **GATE CHAIN-PROOF PASS**.
- **Properties re-checked on the fixed bytes:** (a) only the pinned payer can hold the reservation — untouched code path, R11/R19/R20/R22 still pass; (b) no third party can reserve/extend/block — R12/R20/R21/R22 still pass, no new door added; (c) no automatic unlock on any timeout — the P1 fix adds no timer (the send door only refuses *more*), and the P2 convergence rests solely on the server's persisted `EXPIRED_UNCLAIMED` evidence (itself produced only by the server's observed-height release), never on local elapsed time — R13 (no-timeout) and R28 (ambiguity stays locked) still pass.

## 6. Measured numbers + close-out verification (cs-engineering-rules / verify-before-reporting)

Candidate sizes: `gatehouse.mjs` 80,189 B (improver freeze was 78,037; +2,152 B net — `authorizeAnchorSend` + adjudication comments, minus the removed `claimAnchorLock`), `anchor-v6.html` 79,258 B, `anchor-devnet.html` 80,142 B. Wall-clock (network layer dominates, as before): regression ≈ 190 s per run (includes R24's deliberate 31 s bucket-refill wait and real-devnet confirmation/expiry waits); evidence B ≈ 300 s standalone (expiry wait dominates); A/C/D ≈ 15–60 s each under this leg's weather. Destination probes: every claim above traces to a named log line or results file in `amendment8/` (`regression-results.json` 32/32, `evidence-results.json` 26/26 after merge); nothing was deployed, so there is no live-URL probe — deployment verification remains the coordinator's leg.

Originals re-verified untouched at the close: deployed `gatehouse-work/gatehouse.mjs` `2b16dfd0…`, filed `gatehouse-work/anchor-v6.html` `be558a04…`, `anchor-work/anchor-devnet.html` `37407d10…` — all identical to the inherited state. No stray test processes remain (all test ports probed closed / process list clean).

## 7. Handoff

**PASS BACK TO CRITIC.** The critic re-judges: this report, `BUILDER_REPORT.md`, `IMPROVER_REPORT.md`, `CRITIC_DEEPSEEK_RAW.md`, the fix-frozen bytes of §1, logs `regression-run-fix1.log` (30/32, disclosed fixture failures), `regression-run-fix2.log` + `regression-run-fix3.log` (32/32 ×2), `evidence-run-fix.log` (A 12/12 + disclosed Part B weather crash), `evidence-runB-fix.log` (B 6/6), `evidence-runC-fix.log` (C 6/6), `evidence-runD-fix.log` (D 2/2), `verify-gate-output-fix.txt` + `verify-gate-output-fix-twin.txt` (chain-proofs on fixed-flow landings), and the updated `FROZEN_BYTES_MANIFEST.json` (`fixFreeze` block). The improver's NC-1/NC-3 operability items are untouched by this round and still stand for the ceremony packet; NC-2 is now closed in code by the P2 fix (the runbook may still name the manual clear for shapes outside the guard, e.g. a mirror whose blockhash *and* reservationId both differ from the released record — R28a proves that case stays locked by design).

# PACKET — CHATGPT GATEHOUSE CLEARANCE, ADDENDUM #2 (Amendment 8: pre-signature reservation)
### From the captain, 2026-11-24 evening CT — answering your Amendment 7 independent re-judgment

Brother, your distinction was correct, and it is now corrected in the bytes. You read the filed page and found the order still wrong — `signTransaction` at line 718, the claim at line 801. Both of your original defects stay accepted as corrected; this addendum answers the one narrow correction you held your stamp for.

## The correction — Lock → Sign → Persist → Broadcast → Verify

The page no longer asks Phantom for anything until the Gatehouse has granted an **atomic, authenticated, pre-signature reservation**:

1. **Challenge.** `POST /v1/night-brick/anchor-challenge` issues a single-use random challenge bound server-side to the pinned (payer, memo-sha256, cluster) and the purpose. Issuing a challenge creates **no lock and no record** — challenge spam cannot block the founder.
2. **Reserve (the Lock).** The page proves control of the pinned payer wallet with `provider.signMessage` over the server-built canonical message (a message proof — **not** a transaction signature). The Gatehouse verifies the ed25519 proof against the pinned payer, consumes the challenge (replay → 403), and **synchronously fsync-persists** a `RESERVED` record — random `reservationId`, the attempt's stamped blockhash + `lastValidBlockHeight` — before responding. Anything already live → **409**, and the refused session converges to the authority and stops **before `signTransaction` is ever called**.
3. **Sign.** Only the reservation holder's session proceeds to `provider.signTransaction`, building the transaction on the reserved blockhash.
4. **Persist + bound claim.** The Amendment 7 layers, unchanged, plus binding: the local verified persist now carries blockhash + reservationId, and `anchor-claim` requires `{tx, reservationId}` with a live `RESERVED` record, a matching id, and the signed transaction's `recentBlockhash` **equal to the stamped blockhash** — then the same record transitions `RESERVED → CLAIMED`.
5. **Broadcast + Verify.** Unchanged Amendment 7 discipline, with one strengthening your seat's review produced (below).

**The three properties, as ordered:** (a) only the pinned payer's wallet can hold the reservation — the proof verifies against `GATEHOUSE_ANCHOR_PAYER` and binds purpose + cluster + payer + memo-hash + nonce + stamps, so it cannot be transplanted; (b) no third party can reserve, extend, or block it — there is no extend operation at all, and release requires the same payer proof bound to the specific reservationId; (c) **no automatic unlock on any timeout, ever** — a reservation leaves `RESERVED` only via its bound claim or the authenticated evidence release: the server must itself observe current height > the stamped `lastValidBlockHeight` (a stamp past its last valid height can never land) and persists `EXPIRED_UNCLAIMED` before responding; RPC null/error → no transition. The 5-minute challenge window is handshake hygiene only; it can never affect a granted reservation.

## Strengthened R6 — the test you named

Two instrumented page sessions race the full flow against one gate. Result, on the deployed bytes: **`signTransaction` total == 1 (winner 1, loser 0)** — the loser is refused at reserve and never requests a transaction signature. Reserves `[200, 409]` · one claim · one broadcast · loser never lands. `signMessage` counts are disclosed separately (A=1, B=1) as what they are: authentication proofs, not transaction signatures; the page's state pre-read means the ordinary non-race path makes zero wallet calls in a second session. Full regression: **32/32 PASS, twice**, including R11–R28 (non-payer proof 403 · challenge replay 403 · no-timeout hold · unbound/foreign claim 409 · evidence-release then fresh flow · blockhash-mismatch 409 · purpose binding · same-tick server race · release-abuse battery · send-without-claim refused in every record state with zero upstream forwards).

## What the relay found on the way (disclosed, all fixed and re-judged)

- **Improver (F-01):** the first build trusted caller-declared stamps — a payer proof carrying an invented far-future `lastValidBlockHeight` could have bricked the lock (the bound claim could never match; the evidence release could never fire). The reserve door now sanity-checks the stamp against server-observed height (±1000; an honest stamp is ≈ +150) before persisting; unobservable → 502, nothing reserved.
- **Your critic seat (DeepSeek, P1):** the raw JSON-RPC send door still created a record for a founder-signed transaction that never reserved or claimed. That record-creating path is **removed** — the send door now forwards only a signature equal to the recorded signature of a live `CLAIMED`/`BROADCAST` record; every other state is refused. (The Amendment 7 chain-convergence read stays: it forwards nothing and fires only on a landed, byte-matching inscription.)
- **Your critic seat (P2):** a device mirror left holding a signed-but-never-claimed record after an evidence release stayed locked forever. Both pages now converge on the server's persisted `EXPIRED_UNCLAIMED` evidence under tight guards (no server signature + blockhash/reservationId match); ambiguity stays locked.
- **Critic re-judgment on the fixed bytes: CONDITIONALLY CLEARED** — P1/P2 **FIXED-CONFIRMED**, your earlier rejection lines (no timeout · no third-party block · one signature · blockhash binding) all confirmed, **zero confirmed defects on either axis**. Its two conditions are operational: (NC-3) the deploy runbook names the Amendment 7 rollback / version-2 record handling — **written into the build record with the rollback procedure**; (NC-1) a founder-runnable release procedure approved by the captain before mainnet go-live — **the procedure is written into the build record** (state read → height evidence → founder `signMessage` → authenticated release call → mirror convergence); the captain's approval is the recorded pre-go-live item. Neither blocks this deployment: no live page can create a reservation yet.

## One evidentiary gap, disclosed rather than hidden

The blind verifier confirmed — on its own runs — the file identities, badges, frozen core, every source invariant, the wallet fence, and a clean 32/32 regression. Its evidence-harness re-runs of Parts B/C/D (devnet) were blocked three times by this VM's egress-proxy tunnel timeouts (the gate failed closed, 502, each time); a dedicated settling check repeated the attempt three more times and independently verified Part A 12/12 in all three (36/36). Parts B/C/D stand on three producer-seat 26/26 runs plus **verify-gate chain-proofs of the actual devnet landings** (`TLCFmn6C…`, `Swz11ZBZ…`, `ZTvLyAu1…`, `3t75U4r8…` — fee exactly 5,000, memo byte-equal, readable on-chain independent of any harness). A standing obligation to re-run the harness in healthy network weather is recorded in the build record.

## Bytes and state

| Artefact | sha256 | Badge / state |
|---|---|---|
| Gatehouse `gatehouse.mjs` | `c4010ed628ccd21f21d15ee0899b30b108d426878b329283a1daae688f86d07f` | **DEPLOYED** (read back from the VPS, deployed == filed; Amendment 7 build preserved as `gatehouse.mjs.v3-backup`) |
| Anchor page `anchor-v6.html` | `900323c367a6af95500eba1edf198e7ff4497867388d3732cebfbea72644d4ba` | `Build: v6 · e72aaae3` — **filed, NOT deployed** (live /anchor/ remains Build v4) |
| Twin page `anchor-devnet.html` | `40eb08b46744f9f307790837c53907e160fdc7a5ecab9fed306e40e974f13887` | `Build: v6 · ce8823ec` — filed, not deployed; supersedes the v5-era twin (Amendment 7 pending closed) |

Also deployed: the additive nginx `location /devnet/` → the devnet twin Gatehouse (127.0.0.1:8742, prefix stripped) on rpc.provadiacoin.com, so the twin page can run the founder's desktop rehearsal (Gemini Condition 2). Twin state read back through the route: the standing Part B CONFIRMED record, store ok. (One disclosed slip: the pre-A8 nginx backup was first placed inside sites-enabled, causing a duplicate-server-name warning on the first reload; it was moved out and the reload repeated clean before any traffic depended on it.)

**Frozen core, re-proven byte-identical:** anchor-tx `920a6959…` · MEMO `a760a0da…` (133 B) · fee exactly 5,000 lamports · payer `6jA1JSoenG9Z4j8ufq3FWp659ZmAXJFRKiR6jaLH12iE` · verify-gate `1801d5c3…`.

**The fence at the close:** anchor wallet — **69,099,009 lamports, exactly 1 signature** (direct public-endpoint read from the VPS, bypassing the gate). Mainnet Gatehouse anchor record: **null**. No mainnet transaction of any kind was made by this round. No founder contact.

## What we ask of your seat

Your re-judgment of the corrected revision, against your own strengthened R6 definition and the six regression tests, on these bytes. Your fences from the Amendment 7 round are carried verbatim in the crew's orders: this packet is **not** a request for deployment authorization (the page deployment runs under Gemini's Condition 1 once both stamps stand) and **not** signing clearance — Attempt #6 still waits for your stamp, Gemini's three conditions in order, and the founder's rehearsal click.

Evidence filed with this packet in `partner-desk/REPORTS/gatehouse-clearance-evidence/` (a8- prefixed): the three revised sources · frozen-bytes manifest · regression + evidence results · the final regression log (R24–R28 detail) · verify-gate outputs · builder, improver, and fix reports · your critic seat's raw first reply and re-judgment · the blind verifier's report · the settling-check note.

Evidence first. Signature last.

# NC-1 RELEASE CHECKLIST — Founder-Runnable Reservation Release Procedure
## Gatehouse Amendment 8 · standalone checklist produced 2026-11-26 (fix pass)

**Status: PROCEDURE WRITTEN — AWAITING CAPTAIN APPROVAL (unsigned).**
This document promotes the NC-1 procedure of record — previously carried only as
prose inside `BUILD_RECORD_GATEHOUSE_2026-11-24.md` (§"Critic conditions —
disposition / NC-1") — into the standalone, approvable checklist the Addendum #2
evidence packet (Item 10) found missing. It changes no step of the procedure.
Origin: `IMPROVER_REPORT.md` §NC-1 (NEEDS-CHECK: "No founder-facing release
client… the ceremony runbook should name the exact recovery procedure").
Critic ruling: `CRITIC_DEEPSEEK_REJUDGMENT_RAW.md` — NEEDS-CHECK, "does not block
clearance as a code defect; it is a mandatory go-live condition… Resolver:
captain/ops approving the runbook."

**When this procedure applies:** a pre-signature reservation stands unclaimed —
e.g. the signing page crashed or was closed between `anchor-reserve` and the
bound claim — and the anchor lock must be freed so a fresh attempt can proceed.
There is NO timer and NO wall-clock expiry anywhere in this procedure: the
reservation dies on observed evidence, never on a clock (Permanent Rule 5).

**Fix-pass amendment (2026-11-26, expiry binding):** since the expiry-binding
correction, the release door reads the expiry ONLY from the reservation's
server-bound (blockhash, lastValidBlockHeight) pair, established by the
Gatehouse's own upstream observation at reserve time. Step 1 below therefore
confirms the BOUND pair. A reservation recorded before the correction carries
no bound pair and **cannot** be released by this procedure (the door refuses,
fail closed); such a record's only exits are its bound claim or the manual-clear
discipline of Step 5 with evidence filed.

---

## Preconditions — all must hold before starting

- [ ] The Gatehouse service is up and `/healthz` reports the anchor record
      store `ok`.
- [ ] The founder's wallet (the pinned anchor payer) is available to produce a
      `signMessage` proof. No transaction signature is ever requested by this
      procedure.
- [ ] The captain's tooling can call the Gatehouse's `/v1/night-brick/*`
      sub-paths from the allowed origin context.
- [ ] No other anchor attempt is in flight (single-ceremony rule: one live
      record at a time, by design).

## Step 1 — Confirm the standing reservation and its bound expiry

- [ ] `GET /v1/night-brick/anchor-state` and confirm from the response:
  - [ ] `record.status` is `RESERVED`
  - [ ] `record.reservationId` is the reservation to be released (note it)
  - [ ] `record.blockhash` is the reserved blockhash
  - [ ] `record.expiryBound` is `true` — the record carries a server-bound
        expiry pair (a `false` here stops this procedure: see the fix-pass
        amendment above and Step 5)
  - [ ] `record.lastValidBlockHeight` is the bound expiry height (note it)
  - [ ] `record.signature` is `null` (an unclaimed reservation carries none)

## Step 2 — Observe the bound blockhash's expiry on public evidence

- [ ] Using any public explorer or RPC (independent of the Gatehouse), observe
      the chain's current block height.
- [ ] Confirm the observed height is **greater than** the bound
      `lastValidBlockHeight` from Step 1. The stamped blockhash is then
      provably dead: a transaction built on it can never land.
- [ ] If the height has not yet passed the bound height: **STOP.** Wait and
      re-observe. Do not attempt the release early — the door will refuse
      (409) and nothing will change, by design.

## Step 3 — Founder proof + release call

- [ ] Request a release challenge:
      `POST /v1/night-brick/anchor-challenge` with `{purpose: "release",
      reservationId}` and note the returned `challengeId` and canonical
      `message`.
- [ ] The founder signs the canonical message with the wallet's `signMessage`
      (a message proof — **never** a transaction signature).
- [ ] Call `POST /v1/night-brick/anchor-reservation-release` with
      `{challengeId, signature, reservationId}`.
- [ ] Expected outcomes — exactly one of:
  - [ ] **200** with `status: "EXPIRED_UNCLAIMED"` — the server re-observed
        the height itself, and the freeing transition was strictly persisted
        **before** the response. Proceed to Step 4.
  - [ ] **409** — the stamp is still valid, the record changed during
        observation, no live reservation with that id stands, or the record
        carries no server-bound pair. Nothing changed. Return to Step 1/2
        and diagnose; do not retry blindly.
  - [ ] **502** — the server could not observe the chain height. Nothing
        changed (absence of evidence is not evidence). Retry when upstream
        observation is healthy.
  - [ ] **503** — the record store is unavailable or the transition could
        not be persisted. Nothing changed (fail closed). Escalate to the
        captain before any further step.

## Step 4 — Verify the release landed

- [ ] `GET /v1/night-brick/anchor-state` again and confirm:
  - [ ] `record.status` is now `EXPIRED_UNCLAIMED`
  - [ ] `record.signature` is still `null`
  - [ ] the record's history shows the release transition with its observed
        height (`reservation-release-observed-height-…-past-lvbh-…`)
- [ ] File this checklist (completed) with the observed heights and timestamps
      alongside the build record for the attempt it belongs to.

## Step 5 — Converge device mirrors

- [ ] Every device/browser that holds a local mirror of the dead attempt:
  - [ ] On its next page load, the mirror converges automatically against the
        server's `EXPIRED_UNCLAIMED` record (P2 fix) — confirm the page shows
        the released state and asks for no signature.
  - [ ] If a mirror does not converge, clear it **by hand only**, under the
        manual-clear discipline (NC-2): first capture the on-chain evidence
        (explorer record showing no landing under the reserved blockhash /
        signature), file it, then clear the local record.
- [ ] Confirm a fresh anchor attempt can now start (the lock is free:
      `FAILED_ONCHAIN`, `DEAD_PREFLIGHT` and `EXPIRED_UNCLAIMED` are the
      lock-free states).

## Hard rules (never overridden by this checklist)

- No private keys, seed phrases or credentials are used, requested, or
  recorded at any step. The Gatehouse holds no keys by design.
- No mainnet transaction is authorized by this procedure. It frees a lock;
  it signs nothing and broadcasts nothing.
- A refusal (409/502/503) is a designed outcome, not an error to defeat:
  nothing may be edited in the state file by hand except under the Step 5
  manual-clear discipline with evidence filed.

---

## Approval

NC-1 procedure approved for go-live (captain/ops, per the critic's ruling that
the resolver is "captain/ops approving the runbook"):

- Approved by (captain): ______________________________________  Date: ____________

- Founder acknowledgment: _____________________________________  Date: ____________

*(Unsigned as produced. Approval is a pre-go-live item for Attempt #6 and is
recorded as pending in the fix report.)*

# Re: EXAM-LH-002 — Independent examination of Living Heart spec v0.2 (re-dispatch after transport hold)

Army answer record PCN-20261127-0012 (in reply to the examination dispatch), retrieved from the Communication Engine ledger for the Guardian's independent examination of the evidence.

---

**PCN-20261127-0011 — First execution. Idempotency-Key: PCN-20261127-0011.**

| Ref | Finding | Grade | Evidence |
|-----|---------|-------|----------|
| **D1** | Evidence hash preimage hardened with per-citizen `record_nonce` | **CONFIRMED** | §1 E1/E2: `SHA-256(member_id ‖ timestamp ‖ record_nonce)`; §4.3: destroying the off-chain row destroys the nonce, crypto-shredding the evidence hash; §8 T2 pass criterion matches the new formula. |
| **D2** | E8(ii) deferred until deterministic citation receipt exists | **CONFIRMED** | §1 E8: sub-class (ii) “emits nothing in v0.2”; §9 Q6 annotated as ruled. |
| **D3** | Exact deterministic state constants published | **CONFIRMED** | §3.2: QUIET at S < 1.0, ACTIVE at S ≥ 1.0, FLOURISHING at S ≥ 45.0 across ≥ 3 distinct source IDs; §2.3: out-of-window envelopes rejected at ingest, closing clock-skew edge. |
| **D4** | Nonce replay protection moved to disk | **CONFIRMED** | §2.4: `UNIQUE(emitter_key_id, nonce)` in SQLite; §8 T4: test explicitly requires service restart before replay submission. |
| **D5** | Genesis anchor and signed checkpoints defined | **CONFIRMED** | §2.4: fixed `prev_hash₀ = SHA-256("PROVADIA-HEART-GENESIS-V1")`; §4.5: daily checkpoints signed by Heart key and cross-referenced in Night Brick / Archive stratum. |
| **D6** | Public-stream timing-oracle closed with 60-second delay | **CONFIRMED** | §2.5: individual public records delayed 60 s with true `received_at` preserved; aggregate state remains real-time; §9 Q7 ruled. |
| **D7** | Registry governance hardened to founder-countersigned offline artifact | **CONFIRMED** | §2.3/§6.2: no VPS-resident key can unilaterally add/revoke an emitter; live keys in `0600` env files; §9 Q8 ruled. |
| **N1** | T9 burst-honesty test contradicts ingest rate quotas | **CONFIRMED** | §8 T9: “Inject 100 valid E1 events … inside 1 min” vs §6.2: members burst quota of 10/min. Excess must 429; the test cannot pass as written. |
| **N2** | T12 requires E5 infrastructure outside prototype scope | **CONFIRMED** | §7 limits prototype to E1 only; §0 notes E5 consent flag “not built”; §8 T12 is untestable in the fenced prototype. |
| **N3** | T1 “zero beats” contradicts QUIET visual definition | **NEEDS-CHECK** | §8 T1 demands “zero beats rendered” in QUIET; §2.5 states “the Heart’s own beat … is the only continuous motion” and §3.2 prescribes a resting-heart glow/decay. “Beat” is overloaded and undefined—test may fail on a lawful QUIET animation. |
| **N4** | T11 assumes page reachable while service is stopped | **NEEDS-CHECK** | §2.1 makes the Heart service itself the read face; T11 requires loading the instrument page after stopping the service. No static-fallback mechanism is specified, so the page may be unreachable. |
| **N5** | No cross-class deduplication guard for E5/E8(i) | **NEEDS-CHECK** | §1 E8(i) and E5 both describe a want recorded; the spec asserts the Heart counts it once, but §2 ingest has no deduplication rule across classes—two envelopes with distinct nonces would both append and pulse. |
| **N6** | Checkpoint cross-references anchor to unbuilt systems | **NEEDS-CHECK** | §0: Eternal Archive “Not built,” Day-Book hash-chain “not found.” D5’s external truncation-detection therefore cannot currently be verified. |
| **N7** | Manual-receipt classes (E3/E9) trust caption without content verification | **NEEDS-CHECK** | The Heart verifies the captain’s signature but does not fetch or verify the referenced build record or predecessor digest. A compromised captain emitter key (on-VPS, §2.3) could emit fictitious product/correction events that the Heart would pulse as real. |

**One-line verdict:** **NOT READY** for the isolated test-event prototype — blockers: acceptance tests T1, T9, T11, and T12 are internally contradictory or untestable under the §7 E1-only scope; correct the test table and define QUIET-state rendering before construction.
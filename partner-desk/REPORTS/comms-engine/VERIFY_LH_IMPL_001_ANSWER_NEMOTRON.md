# VERIFY-LH-IMPL-001 — army answer PCN-20261127-0014 (nemotron-3-ultra, Verifier T2)

Retrieved from the Communication Engine ledger for the Guardian's independent examination.

---

# VERIFICATION REPORT — Living Heart Prototype (FVR-35)
**Verifier:** T2 · **PCN:** PCN-20261127-0013 · **Date:** 2026-11-27

---

## 1. Six Required Properties — Evidence Mapping & Grade

| Required Property | Test Evidence | Grade | Notes |
|---|---|---|---|
| **1. Genuine signed ingestion (E1, TEST)** | T2 (real pulse, 9ms round-trip, evidence hash match), T3 (forged envelopes: unregistered key 401, tampered payload 401, unauthorized class 403 — all rejected, zero pulses, three E10 logged), T5 (all public probes 400/401/404/405, zero pulses), X1 (registry boot fails without founder countersignature) | **CONFIRMED** | Full fail-closed pipeline exercised: registry, class, schema, signature, timestamp, quota. Every rejection path produces E10. |
| **2. Hash-chain integrity** | T6 (single-byte tamper → chain verify fails at seq 1, state=RECORD UNDER REVIEW, ingest 503, feed empty), T4 (restart verify: `ok=true`, head_hash matches), T10 (firsts record_hash verifies against chain) | **CONFIRMED** | Genesis anchor `SHA-256("PROVADIA-HEART-GENESIS-V1")`; `record_hash = SHA-256(prev_hash ‖ JCS({seq,received_at,envelope}))`; live re-verification on every ingest. |
| **3. Duplicate rejection ON DISK across restart** | T4: service stopped, restarted on same DB, captured valid envelope replayed byte-for-byte → HTTP 409 `replay-nonce` from `UNIQUE(emitter_key_id,nonce)` constraint; `pulses_total=1` unchanged; E10 logged | **CONFIRMED** | Nonce table survives restart; rejection is on-disk, not RAM cache. Transactional append (nonce + record) ensures atomicity. |
| **4. Restart recovery** | T4: `verify after restart ok=true`; `state-before==state-after at fixed instant: true`; T8: `live==rebuilt` at same instant (all fields identical) | **CONFIRMED** | State is pure function of log; restart replays, does not forget. Reducer determinism proven by T8. |
| **5. Pulse as pure function + honest QUIET** | T1: empty log → QUIET at +10/+30/+60min evaluations, `bpm=null`, `pulses_total=0`, feed empty (N3: zero beats); T8: `live==rebuilt` (pure function); T9: 100 valid envelopes burst → 10 accepted (quota), 90 rejected, state ACTIVE (S=100) **not FLOURISHING** (single source) | **CONFIRMED** | No floor in code: `QUIET` branch returns `bpm=null`, `strength=0`. Single-source cap enforced (`sources.size >= 3` for FLOURISHING). T1’s hour evaluated at checkpoints — logically sound given T8 purity proof. |
| **6. Privacy (60s delay, no identifiers)** | T7: 100% payload scan → 0 email, 0 wallet-address hits; subject allowlist audit pass; email smuggle → 400; delay proof: `PUBLIC_DELAY_SEC=2` instance → feed@0s=0, feed@2.3s=1 record with **true** `received_at` unaltered | **CONFIRMED** | Closed per-class subject allowlists; public feed delays individual records, aggregate real-time; delayed record carries true `received_at`. Production default 60s shipped. |

**Weaker-than-claimed proofs:** None. T1’s checkpoint evaluation (vs. literal 60-min soak) is justified by T8’s purity proof. T7’s 2s delay (vs. 60s) uses same code path — valid for observability. T9’s quota contradiction (spec T9 wanted 100 accepted/min; §6.2 caps at 10/min) is **honestly disclosed and resolved** — quota governs, test shows 10 accepted/90 rejected, never FLOURISHING.

---

## 2. heart-core.js — Targeted Code Review

| Concern | Finding | Evidence |
|---|---|---|
| **Fabrication/inflation paths** | **NONE** | Only `ingest()` (validated, fail-closed) and `_appendSecurityRecord()` (internal, `heart.security` class, weight 0, filtered from `computeState` line 352) create records. No timers, no background writers, no synthetic events. |
| **Pulse NOT pure function of log** | **NONE** | `Heart.computeState(records, nowMs)` is static, pure, no side effects. Instance `state()` delegates to it. `allRecords()` reads DB — deterministic given same DB. |
| **Nonce uniqueness on disk** | **CONFIRMED** | `accepted_nonces` table: `UNIQUE(emitter_key_id, nonce)`. Insert in same `BEGIN IMMEDIATE` transaction as record (lines 271–278). Replay catches `UNIQUE` violation → 409 (line 347). Survives restart. |
| **Fail-closed: bad countersignature** | **CONFIRMED** | `loadRegistry()` throws on invalid founder sig (line 87) — process refuses to boot. X1 proves this. |
| **Fail-closed: tampered record** | **CONFIRMED** | `verifyChain()` called on **every ingest** (line 287). On mismatch: returns 503, ingest closed, state=RECORD UNDER REVIEW. T6 proves this. |

No hidden state, no ambient authority, no code path bypasses validation.

---

## 3. T11 First-Run FAIL — Disclosure & Re-run Judgment

**Disclosure:** README §“Test methodology notes” and TEST_RESULTS.md both state: first run T11 FAIL due to leftover dev processes holding Heart port (false “Heart down” precondition). Strays killed, suite re-run end-to-end, **no code changed**, clean output captured.

**Judgment:** **SATISFIES verification discipline.** The failure was environmental, not behavioral; the re-run is clean and fully reported; the history is not airbrushed. This is the correct standard for prototype evidence.

---

## 4. Summary Grades

| Item | Grade |
|---|---|
| Signed ingestion | CONFIRMED |
| Hash-chain integrity | CONFIRMED |
| Duplicate rejection on disk across restart | CONFIRMED |
| Restart recovery | CONFIRMED |
| Pulse pure function + honest QUIET | CONFIRMED |
| Privacy (delay, no identifiers) | CONFIRMED |
| T11 disclosure/re-run | CONFIRMED |
| T9 quota contradiction resolution | CONFIRMED (honest) |
| T12 out-of-scope handling | CONFIRMED (not faked) |

---

## VERDICT

**IMPLEMENTATION VERIFIED** — All six required properties proven by 12 PASS tests + X1; code review confirms no fabrication paths, pure reducer, on-disk nonce uniqueness, fail-closed behaviors; T11 environmental artifact honestly disclosed and cleanly re-run; no blockers.
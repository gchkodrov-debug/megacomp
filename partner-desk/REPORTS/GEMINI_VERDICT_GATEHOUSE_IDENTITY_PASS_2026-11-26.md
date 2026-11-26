# GEMINI VERDICT — GATEHOUSE IDENTITY-PINNING FIX — PASS

**Provenance:** Gemini's independent examination, hand-carried by the founder into the main chat, 2026-11-26 15:11 CT, after the captain supplied the packet's 11 files uncompressed (Gemini's seat could not extract the .zip; his first ruling was an honest HOLD — CANNOT CERTIFY UNSEEN).
**Scope (his own disclosure, preserved):** the ruling certifies the design, state transitions, line-level mechanics, test assertions and checklist constraints reported in COVER_NOTE_FOR_GEMINI.md, FIX_REPORT_IDENTITY.md and NC-1_CHECKLIST.md, read in full; the six file chips were not text-expanded in his seat, so no byte-level inspection of the .mjs/.log attachments is claimed.
**Verdict: PASS — CLEARED TO PROCEED TO DEVNET REHEARSAL CHAIN.** Requirement 5's identity condition is CLOSED at examination level. Qualifications (a)/(b)(c) ACCEPTED. G2 scoping ACCEPTED. NC-1 checklist: all constraints PASS. Two non-blocking notes (below). Mainnet HOLD stands; $5 SOL untouched.
**Captain's adoption (2026-11-26):** Note 1 (empty-string env guard) ADOPTED as a micro-fix before deploy — captain's engineering call. Note 2 (persist conflict poison across restarts) recorded as optional hardening, decision at deploy time.
**Chain remaining:** pre-deploy check (live pre-fix RESERVED record null/terminal + env pairing) → deploy anchor-v6.html + corrected gatehouse.mjs → /healthz + live origin verification → desktop Phantom devnet rehearsal (founder's hands) → wallet re-confirm + build record → ChatGPT final clearance → captain signs NC-1 → founder's click.

---

**VERDICT: PASS — CLEARED TO PROCEED TO DEVNET REHEARSAL CHAIN**
Artifact Scope Disclosure (Honesty Rule): This examination audited the complete verbatim texts mounted in this turn—the Cover Note, FIX_REPORT_IDENTITY.md, and NC-1_CHECKLIST.md—in full. The six attached file chips (SHA-256 manifest, gatehouse.mjs, anchor-devnet.html, anchor-v6.html, regression-run-identity1.log, regression-run-identity2.log) are not text-expanded by this chat interface; accordingly, this ruling certifies the design, state transitions, line-level mechanics, test assertions, and checklist constraints reported in those three documents, without claiming direct byte-level inspection of the unexpanded .mjs/.log attachments.

1. Technical Examination of the Three Corrections (Requirement 5)
Pinned Genesis Identity (gatehouse.mjs lines 103–186, 975–983, 1024) — PASS

Genesis Constants: All three pinned Solana cluster genesis hashes in PINNED_GENESIS_HASHES are exact:

mainnet-beta: 5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d

devnet: EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG

testnet: 4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY

Pre-Body Verification & Sticky State: ensureUpstreamVerified(up) calls getGenesisHash directly against the upstream (bypassing forward() to prevent recursion) before any request body is transmitted, both on initial contact and on failover. Exact matches transition stickily to verified; mismatches transition stickily to rejected; transient transport/null/unparseable failures remain unverified (retried later, answers never used). Confirmed by R34 (wrong-cluster impostor receives 1 getGenesisHash call and 0 payload requests) and R36 (null genesis + dead fallback fails closed 502 with 0 pair requests).

P-C1 Guard Compatibility: Preserving contacts counting on attempted upstreams (identity checks included) keeps the two-contact DEAD_PREFLIGHT transition intact (R10 regression resolved cleanly without altering test assertions).

Observability: /healthz and startup logs surface per-provider upstreamIdentity and genesisPin: pinned | UNPINNED.

Explicit Finalized Expiry Proof (gatehouse.mjs lines 1250–1256) — PASS

Pinning params: [{ commitment: 'finalized' }] on the release door's getBlockHeight call eliminates RPC-default commitment ambiguity (confirmed vs. finalized).

Pairing confirmed establishment at anchor-reserve with finalized expiry observation at anchor-reservation-release is asymmetrically conservative: finalized height lags confirmed height by ~31–32 slots (~12–15 seconds), preventing premature release while a blockhash could still finalize on a canonical fork.

Conflicting Observations Fail Closed & Provenance Persistence (gatehouse.mjs lines ~705–784, 1178–1200, 1241–1249) — PASS

Registry entries persist { lastValidBlockHeight, upstream, commitment, observedAt } into expiryBinding while keeping the public /anchor-state surface unchanged (expiryBound boolean only).

When another verified upstream (or unprovable provenance) reports a differing lastValidBlockHeight for the same blockhash, conflictedBlockhashPairs records both entries, logs the conflict, refuses to overwrite the standing pair, and poisons the blockhash: anchor-reserve refuses 409 (expiry-pair-conflicted) before binding, and anchor-reservation-release refuses 409 (release-pair-conflicted) leaving the record RESERVED even when chain height is 5,000 blocks past expiry (R35).

Because a Solana blockhash's lastValidBlockHeight is fixed at block creation and does not differ across commitment levels on honest nodes of the same cluster, cross-upstream disagreement reliably flags a fork/impostor without false-triggering on honest RPCs.

2. Rulings on Flagged Qualifications (a)–(c) and G2 Scoping
Qualification (a) — Cross-Upstream Conflict Scope: ACCEPTED. Scoping conflict poisoning to contradictions from another verified upstream (or unprovable provenance) while allowing a single verified upstream to refresh its own pair matches the Guardian's specification and preserves single-provider multi-phase fixture behavior (R15).

Qualification (b) — Finalized-Pin Evidence Limit in Stub Suite: ACCEPTED. Because the local stub is commitment-blind, R31/R35 prove end-to-end release control-flow and 409/200 semantics while line 1255 pins commitment: 'finalized' in the wire payload; real RPC behavior is appropriately verified during the live devnet rehearsal.

Qualification (c) — Unknown Custom Cluster Labels Fail Closed: ACCEPTED. Treating an unrecognized GATEHOUSE_CLUSTER_LABEL without GATEHOUSE_EXPECTED_GENESIS_HASH as EXPECTED_GENESIS_HASH = null (failing every forward() closed) is the right fail-closed posture. Ensure deployment environment files explicitly pair any non-standard cluster label with GATEHOUSE_EXPECTED_GENESIS_HASH.

GH-A8-G2 Scoping Note: ACCEPTED. Keeping R33 scoped strictly to durable, byte-identical (SHA-256) persistence of signed wire bytes across Gatehouse restart and exact wire forwarding to the stub—while leaving browser-side recovery and live network broadcast explicitly un-claimed until the devnet rehearsal—is accurate and disciplined.

3. Audit of NC-1_CHECKLIST.md
Guardian Constraint (a) (Step 2 & Hard Rules): Enforces naming the configured cluster's chain and never claiming stronger finality than the observation carries (finalized commitment from a genesis-verified upstream). PASS.

Guardian Constraint (b) (Step 5 & Hard Rules): Explicitly establishes that clearing a local device/browser mirror is not a server unlock; the server record alone defines lock state. PASS.

Guardian Constraint (c) (Step 5 & Hard Rules): Explicitly prohibits manually clearing a legacy pre-binding lock on null, absent, or empty explorer evidence—positive filed evidence only. PASS.

Conflict Escalation & Unsigned Gate: Documents 409 conflict refusal as a designed fail-closed outcome requiring escalation to the Captain rather than blind retry, and preserves the unsigned Captain approval block pending go-live clearance. PASS.

4. Two Non-Blocking Implementation Notes for Deployment / Next Touch
Empty-String Env Guard (GATEHOUSE_EXPECTED_GENESIS_HASH): Confirm gatehouse.mjs trims GATEHOUSE_EXPECTED_GENESIS_HASH and treats an empty/whitespace-only string as unset (undefined/null) rather than an empty string literal, so GATEHOUSE_EXPECTED_GENESIS_HASH="" cannot bypass the cluster pin or compare against "".

Restart Persistence of Conflict Poison (Optional Hardening): Currently conflictedBlockhashPairs lives in process memory ("for the process's life"). Because the standing RESERVED record persists its original expiryBinding (blockhash, lastValidBlockHeight, upstream, commitment, observedAt) on disk, a restarted Gatehouse still enforces the bound height; optionally persisting a conflicted: true flag onto the active RESERVED state record when release-pair-conflicted triggers would preserve conflict poison across restarts as well.

5. Clearance to Proceed
With Guardian byte-level re-judgment aligned, Requirement 5's identity-pinning and finalized-observation condition is CLEARED to advance through the remaining sequence (maintaining Mainnet HOLD and $5 SOL untouched):

Pre-Deploy Check + Deploy anchor-v6.html: Confirm any live pre-fix RESERVED record is null/terminal, verify GATEHOUSE_CLUSTER_LABEL / GATEHOUSE_EXPECTED_GENESIS_HASH in the runtime environment, deploy anchor-v6.html + gatehouse.mjs, and verify /healthz (genesisPin: pinned, upstreamIdentity) plus live origin fetch.

Desktop Phantom Devnet Rehearsal: Execute live devnet rehearsal exercising getGenesisHash verification, live finalized commitment expiry check, browser recovery/re-read, and an actual devnet broadcast.

Wallet Re-Confirm + Build Record: File the rehearsal hashes, /healthz output, and build record.

Captain's NC-1 Signature → Founder's Click.

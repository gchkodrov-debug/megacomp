# ADDENDUM #2 EVIDENCE PACKET — INDEX
## Assembled 2026-11-26 for ChatGPT's (Guardian) independent adjudication of Gatehouse Amendment 8

**Assembly rule applied:** primary documents only — originals copied byte-for-byte (`cp`, never moved), every copy sha256-hashed below. Where a requested item has no standalone primary document on disk, that is stated plainly instead of substituting a summary.

**Byte-identity verification at assembly:** the three implementation artefacts and both harnesses in this packet hash-match the `fixFreeze` block of `FROZEN_BYTES_MANIFEST.json` exactly — `gatehouse.mjs` `c4010ed6…`, `anchor-v6.html` `900323c3…` (badge `Build: v6 · e72aaae3`), `anchor-devnet.html` `40eb08b4…` (badge `Build: v6 · ce8823ec`), regression harness `57e3fba5…`, evidence harness `940f1f81…`. Fix freeze timestamp: 2026-11-25T04:03:18Z.

**No private keys, seed phrases, or credentials are in this packet.** The Gatehouse holds no keys by design. The test harnesses (`gatehouse-regression.mjs`, `gatehouse-evidence.mjs`, `improver-probes.mjs`) read a devnet faucet test key at runtime from `genesis-rehearsal/keys/faucet-buffer.json`; that key file was deliberately **not** copied into this packet. The state records under `evidence/04-08-proof-records/` are regression-harness records (cluster `devnet-regression`, harness payer) plus devnet probe records — no mainnet signed transaction exists in them; the mainnet anchor record was null at every close (see Item 1 documents).

---

## Item 1 — Final Amendment 8 — Addendum #2 (exact source + revision)
**FOUND.** The Amendment 8 paper of record is the clearance Addendum #2 itself (it specifies the Lock → Sign → Persist → Broadcast → Verify correction and reports its execution); the full build history, including the Amendment 8 section, is in the build record.

| Source path | Revision / date | sha256 | Packet copy |
|---|---|---|---|
| `~/workspace/newwave/next-build/gatehouse-work/PACKET_CHATGPT_GATEHOUSE_CLEARANCE_ADDENDUM2_2026-11-24.md` | Filed 2026-11-24 evening CT (file mtime 2026-11-25 04:30) | `667a6a45287e42b25289bf58afea4a071a6f2767c40889b034ef72c386f88252` | `evidence/01-amendment8-addendum2/PACKET_CHATGPT_GATEHOUSE_CLEARANCE_ADDENDUM2_2026-11-24.md` |
| `~/workspace/newwave/next-build/BUILD_RECORD_GATEHOUSE_2026-11-24.md` (§ "AMENDMENT 8 — PRE-SIGNATURE RESERVATION") | 2026-11-24, postscripted through the Amendment 8 close | `ebe2f57a457a3d5588b77d803d14e6a3ab27fd1d4d25071baaea254fd8628309` | `evidence/01-amendment8-addendum2/BUILD_RECORD_GATEHOUSE_2026-11-24.md` |
| `~/workspace/newwave/next-build/gatehouse-work/CHATGPT_AMENDMENT7_REJUDGMENT_2026-11-24.md` (the re-judgment that required Amendment 8) | 2026-11-24 | `0f59fd162027cd0ef321d12b00c8be00b9dfc7cb2a277f2235a7a50cef39cfec` | `evidence/01-amendment8-addendum2/CHATGPT_AMENDMENT7_REJUDGMENT_2026-11-24.md` |
| `~/workspace/newwave/next-build/gatehouse-work/PACKET_CHATGPT_GATEHOUSE_CLEARANCE_ADDENDUM_2026-11-24.md` (Addendum #1 — Amendment 7, parent chain) | 2026-11-24 | `7be3f7b3cc78bcc2e702ad06c611c7335ded82355b739da2d8261689ee9b24b9` | `evidence/01-amendment8-addendum2/PACKET_CHATGPT_GATEHOUSE_CLEARANCE_ADDENDUM_2026-11-24.md` |
| `~/workspace/newwave/next-build/gatehouse-work/PACKET_CHATGPT_GATEHOUSE_CLEARANCE_2026-11-24.md` (original clearance packet, parent chain) | 2026-11-24 | `c880c0f2e0b9d6a4b74bfbb6a44d5ba71e8e63b694b2e1319dea1df319437766` | `evidence/01-amendment8-addendum2/PACKET_CHATGPT_GATEHOUSE_CLEARANCE_2026-11-24.md` |

No separate standalone "Amendment 8 design paper" file exists on disk — searched `~/workspace/newwave/`, `~/workspace/captain/`, and workspace top level; the Addendum #2 + build record are the paper of record (consistent with the house record: "Amendment 8 complete on paper, filed not live").

## Item 2 — Corresponding implementation revision and code changes
**FOUND** — final fix-frozen bytes (deployed server; pages filed, not deployed) plus the three relay reports that document every code change round (builder → improver → fix).

| Source path (all under `~/workspace/newwave/next-build/gatehouse-work/amendment8/`) | Revision / date | sha256 | Packet copy |
|---|---|---|---|
| `gatehouse.mjs` | fix freeze 2026-11-25T04:03:18Z; DEPLOYED (deployed == filed, read back from VPS per Addendum #2) | `c4010ed628ccd21f21d15ee0899b30b108d426878b329283a1daae688f86d07f` | `evidence/02-implementation/gatehouse.mjs` |
| `anchor-v6.html` | badge `Build: v6 · e72aaae3`; filed, NOT deployed | `900323c367a6af95500eba1edf198e7ff4497867388d3732cebfbea72644d4ba` | `evidence/02-implementation/anchor-v6.html` |
| `anchor-devnet.html` | badge `Build: v6 · ce8823ec`; filed, NOT deployed | `40eb08b46744f9f307790837c53907e160fdc7a5ecab9fed306e40e974f13887` | `evidence/02-implementation/anchor-devnet.html` |
| `FROZEN_BYTES_MANIFEST.json` | builder + improver + fix freezes, with per-round change lists | `f40843922dcbdf083b28e4c3b0bc0af200801f31702de0cc1cce7f1edf2d8a77` | `evidence/02-implementation/FROZEN_BYTES_MANIFEST.json` |
| `BUILDER_REPORT.md` | 2026-11-25 03:12 | `1b0a405f2f54c6f38185bfba1ae4f3cdfab03421629d8b6ec9903177f0898a40` | `evidence/02-implementation/BUILDER_REPORT.md` |
| `IMPROVER_REPORT.md` | 2026-11-25 03:28 | `34e6e146027dec259115c1d31a7cf0341a14e0181d8848f81679f0d823e6cc18` | `evidence/02-implementation/IMPROVER_REPORT.md` |
| `FIX_REPORT.md` | 2026-11-25 04:03 | `cac205cc16f17963aee8e0ffdd934fa2743982927f7f25046aefa2fa12d51d9a` | `evidence/02-implementation/FIX_REPORT.md` |

## Item 3 — Complete 32/32 regression test evidence, including failure-path tests
**FOUND.** Final bytes: **32/32 PASS, twice consecutively** — `regression-run-fix2.log` (`77b3149a…`) and `regression-run-fix3.log` (`083fbda6…`), machine-readable results in `regression-results.json` (`08113112…`, all 32 PASS, verifier-run state). The first fix run (30/32, two harness fixture defects, candidate untouched) is kept and disclosed: `regression-run-fix1.log` (`b765872f…`). The blind verifier's own two regression runs: `verifier-regression-run1.log` (`1713be6b…`), `verifier-regression-run2.log` (`f7f6ad63…`). Intermediate freeze: 27/27 ×2 (`regression-run-improver2.log` `96499cc6…`, `regression-run-improver3.log` `61293166…`). Suite source: `gatehouse-regression.mjs` (`57e3fba5…`). Failure-path tests are inside the 32: R1/R1b (storage/store failure), R3/R4/R10 (RPC null / incomplete history / ambiguous refusal), R7 (expired stamp), R11–R28 (auth, replay, race, abuse batteries).

Devnet evidence suites A/B/C/D (26/26 on producer seats): harness `gatehouse-evidence.mjs` (`940f1f81…`), results `evidence-results.json` (`9c1f91d4…`, from `amendment8/`); run logs `evidence-run-fix.log` (`9b1201a3…`), `evidence-runB-fix.log` (`a64e8648…`), `evidence-runC-fix.log` (`7d8c7340…`), `evidence-runD-fix.log` (`b3d7df72…`); verifier's evidence runs `verifier-evidence-run.log` (`25e5be5f…`), `verifier-evidence-run2.log` (`59d3527e…`); `VERIFIER_REPORT.md` (`0bc77be2…`); `SETTLING_CHECK.md` (`a9bc6c61…`); critic raw + re-judgment `CRITIC_DEEPSEEK_RAW.md` (`23d573af…`), `CRITIC_DEEPSEEK_REJUDGMENT_RAW.md` (`20f29c94…`); verify-gate chain-proofs `verify-gate-output-fix.txt` (`54b671ad…`), `verify-gate-output-fix-twin.txt` (`b23c2276…`), `verify-gate-output-improver.txt` (`ced8ba6c…`), `verify-gate-output-improver-twin.txt` (`ac491324…`), `verify-gate-output.txt` (`5e449e41…`); improver probes `improver-probes.mjs` (`786dbbb2…`) + `improver-probes.log` (`23571f37…`). Pre-Amendment-8 failure-path evidence also included: `fault-injection-results.json` (`7b8b622f…`, FI1–FI4) and `evidence-results-PRE-AMENDMENT8-suites-ABCD.json` (`8533faf7…`, 25 tests incl. the disclosed A11 FAIL-from-this-origin) — both from `~/workspace/newwave/next-build/gatehouse-work/`, 2026-11-24/25.

**Disclosed evidentiary gap (in the primary documents themselves, not hidden):** the blind verifier's formal line was NOT VERIFIED for evidence Parts B/C/D only, because this VM's egress-proxy tunnel timed out on its independent re-runs (gate failed closed 502); the settling check independently re-verified Part A 12/12 three times (36/36). Parts B/C/D stand on three producer-seat 26/26 runs plus verify-gate chain-proofs of the actual devnet landings. A standing obligation to re-run the harness in healthy network weather is recorded in the build record. See `VERIFIER_REPORT.md`, `SETTLING_CHECK.md`, and Addendum #2 §"One evidentiary gap, disclosed rather than hidden".

## Item 4 — Proof of authenticated, founder-bound reservation before signing
**FOUND** — in the regression suite executed against the frozen bytes (results + logs under Item 3) and the persisted records under `evidence/04-08-proof-records/`:
- **R11** — reserve attempt signed by a NON-payer key → refused 403, no reservation created.
- **R12** — challenge replay (same proof twice) → second refused 403; the single reservation stands.
- **R19** — garbage blockhash refused at challenge (400); far-future squat stamp and cross-cluster stamp refused at reserve (400) despite a valid payer proof; honest stamp reserves.
- **R20** — purpose binding: reserve challenge refused at the release door and vice versa (403); consumed-challenge replay refused.
- **R21** — two reserve POSTs in the same tick (both valid payer proofs) → exactly one 200, one 409, one RESERVED record.
- **R6+** — the loser session is refused at reserve **before** `signTransaction` is ever called (see Item 8).
- Persisted reservation records: `evidence/04-08-proof-records/probe-state-a8-v1/anchor-record.json` (`f5459a7b…`), `probe-state-a8-v2/anchor-record.json` (`df2552c1…`), `state-r13/…` (`0ddb2bd4…`, no-timeout hold), `state-r14/…` (`af1c02cb…`).
- The mechanism itself: `anchor-challenge` / `anchor-reserve` in `evidence/02-implementation/gatehouse.mjs` (ed25519 `signMessage` proof verified against the pinned payer `GATEHOUSE_ANCHOR_PAYER`, challenge consumed on use, RESERVED record fsync-persisted before the response).

## Item 5 — Proof of correct blockhash and transaction-expiry handling
**FOUND**:
- **R16** — claim with tx blockhash ≠ reservation blockhash → refused 409; reservation stands, signature still null. Record: `state-r16/anchor-record.json` (`9770efd3…`).
- **R7** — expired stamp refused at preflight → DEAD_PREFLIGHT persisted on positive evidence, lock freed; fresh stamp then claims + broadcasts. Records: `state-r7/anchor-record.json` (`38276222…`), `state-r25-dead_preflight/anchor-record.json` (`cfb3cbba…`).
- **R15** — evidence release refused while the stamp is valid (409, no transition); EXPIRED_UNCLAIMED persisted only once the server observes height > stamped `lastValidBlockHeight`. Record: `state-r15/anchor-record.json` (`a2437455…`).
- **Evidence B6** — expired blockhash send rejected, zero broadcast (`evidence-results.json`, Item 3 folder).
- **R13** — passage of time alone never releases a live reservation (no timeout unlock).

## Item 6 — Proof that signed transactions are safely persisted before broadcasting
**FOUND**:
- **R1** — both browser storages fail → no broadcast, no claim, fail closed; the RESERVATION stands with signature null. Record: `state-r1/anchor-record.json` (`b58a42a0…`).
- **R1b** — Gatehouse store unwritable → claim 503, send refused 503, nothing lands. Blocker marker: `state-r1b-blocker` (`3b2a43e3…`).
- **R17** — signed + persisted, claim died in transport → next session completes the bound claim **from the stored bytes with zero new wallet signatures**. Record: `state-r17/anchor-record.json` (`f8e349cc…`).
- **R2a + persisted record history** — `state-r2/anchor-record.json` (`6333d248…`) shows the persisted transition chain with timestamps: RESERVED → CLAIMED → BROADCAST → CONFIRMED (persist-before-effect at each step).
- The mechanism: atomic tmp + fsync + rename + directory-fsync persists in `gatehouse.mjs`; the CLAIMED → BROADCAST stamp persists strictly (stamp failure → send refused, memory reverts to disk).

## Item 7 — Proof of safe recovery from ambiguous RPC responses and transaction expiry
**FOUND**:
- **R3** — RPC null for a LANDED tx (+ expired blockhash): record NOT cleared — wallet-history + exact-memo reconciliation proves the landing; record graduates CONFIRMED. Record: `state-r3/anchor-record.json` (`717d4e72…`).
- **R4** — incomplete provider history after expiration → LOCKED; local + gate records intact; no clearing, no signature. Record: `state-r4/anchor-record.json` (`85dd6c3d…`).
- **R10** — blockhash refusal AFTER a failed first upstream contact → NOT treated as proof of death: no DEAD_PREFLIGHT, mirror + lock intact. Record: `state-r10/anchor-record.json` (`2fc54c72…`).
- **R8** — BROADCAST record + blockhash-worded re-send refusal → record STAYS BROADCAST, lock held. Record: `state-r8/anchor-record.json` (`14c3d0e2…`).
- **R27/R28** — mirror convergence on persisted EXPIRED_UNCLAIMED evidence, with negative twins staying LOCKED under ambiguity. Records: `state-r27/…` (`2672e29a…`), `state-r28a/…` (`7645c4cf…`), `state-r28b/…` (`263e56ee…`).
- Plus `SETTLING_CHECK.md` and the disclosed B/C/D re-observation gap under Item 3.

## Item 8 — Proof that duplicate execution is prevented
**FOUND**:
- **R6+ (the proving test named in Addendum #2)** — two racing instrumented page sessions: `signTransaction` total == **1** (winner 1, loser 0); loser refused at reserve; reserves [200, 409]; one claim; one broadcast. `signMessage` counts (A=1, B=1) disclosed as authentication proofs, not transaction signatures.
- **R6** — server-level race: exactly one reserve + one bound claim + one broadcast; the other refused and never lands. Records: `state-r6/…` (`422bb4d3…`), `state-r6plus/…` (`5622f7fa…`).
- **R21** — same-tick server race → one 200, one 409, one RESERVED record. Record: `state-r21/…` (`03ba4921…`).
- **R2b** — reload in a fresh browser (empty storage): the server record stops the second signature — wallet never asked (tx or message). Record: `state-r2/anchor-record.json` (shared with R2a).
- **R5 / R5b** — a previously confirmed anchor (gate record, or local CONFIRMED mirror alone) stops any new signature.
- **R24 / R25 / R26** — send-without-claim refused in null / RESERVED / EXPIRED_UNCLAIMED / FAILED_ONCHAIN / DEAD_PREFLIGHT states with **zero upstream forwards**; only the bound-claimed send forwards and lands. Records: `state-r24/…` (`9af1e066…`), `state-r25-failed_onchain/…` (`cc24cd4e…`), `state-r26/…` (`12c1b91a…`).
- **R22** — release-abuse battery (wrong-payer 403 · id mismatch 400 · release of CLAIMED 409) + idempotent re-claim 200. Record: `state-r22/…` (`1fd19637…`).
- **Evidence B4** — duplicate-prevention read (`getSignatureStatuses` with `searchTransactionHistory`) reads the landed signature; `twin-landing.json` (`f63a0b4f…`) records the twin landing.

## Item 9 — Gemini's three outstanding conditions
**FOUND** — primary source: Gemini #100, §3 "Three Exact Gates to Satisfy Before Founder Signs Attempt #6".

| Source path | Revision / date | sha256 | Packet copy |
|---|---|---|---|
| `~/workspace/newwave/next-build/gemini-seat/GEMINI_GATEHOUSE_CLEARED_100_2026-11-24.md` | #100, retrieved 2026-11-24 19:14–19:18 CT | `51368df2710f50422bc81a374329433b63fd45145fe7556b3bd5f4a945ef8bb9` | `evidence/09-gemini-conditions/GEMINI_GATEHOUSE_CLEARED_100_2026-11-24.md` |
| `~/workspace/newwave/next-build/gemini-seat/GEMINI_GATEHOUSE_RECONCILIATION_97_2026-11-24.md` (design of record; conditions' origin) | #97, 2026-11-24 | `8c092367f3cbc56d61fc43f90ce313ed8a7112ffdcc53b76aabb648021f8d60c` | `evidence/09-gemini-conditions/GEMINI_GATEHOUSE_RECONCILIATION_97_2026-11-24.md` |
| `~/workspace/newwave/next-build/gemini-seat/GEMINI_GATEHOUSE_CLUSTER_103_105_2026-11-24.md` | #103–105, 2026-11-24 | `b9011d4298954453235aa61e713355975b2e87f58f2c5877d3dbfa69d45de54d` | `evidence/09-gemini-conditions/GEMINI_GATEHOUSE_CLUSTER_103_105_2026-11-24.md` |
| `~/workspace/newwave/next-build/gemini-seat/GEMINI_AMENDMENT7_REJUDGMENT_106_2026-11-24.md` | #106, 2026-11-24 | `0172596085e5ac05a65aa07f6fcea0635e1870740d3242e11babaf214d81d123` | `evidence/09-gemini-conditions/GEMINI_AMENDMENT7_REJUDGMENT_106_2026-11-24.md` |

The three conditions, as written in #100 §3 (execute in order, only after ChatGPT's stamp; zero mainnet spend until all three are satisfied): **(1)** deploy anchor v6 + verify the live production-origin fetch (HTTP 200, valid CORS, < 1,500 ms, zero exposed secrets); **(2)** live desktop Phantom devnet-twin rehearsal (clean 0.000005 SOL preview, 9/9 byte assert, confirmed landing); **(3)** re-confirm anchor wallet cleanliness (69,099,009 lamports · 1 funding tx · 0 prior anchors) + file `BUILD_RECORD_GATEHOUSE_2026-11-24.md`. Status per the build record: condition 3's filing half is completed by the build record itself; conditions run once ChatGPT's Addendum #2 stamp lands. Note: #100's Condition 1 names the pre-Amendment-8 badge (`098a5b74`); the build record carries the badge supersession to the corrected bytes (queue #103, in the cluster file above).

## Item 10 — The complete NC-1 release checklist
**PARTIAL — no standalone NC-1 checklist document exists on disk.** Searched `~/workspace/newwave/` (incl. `gatehouse-work/`, `gemini-seat/`, `next-build/` root), `~/workspace/captain/`, and workspace top level for NC-1 / release-checklist documents. What exists as primary evidence, all copied:
- The **NC-1 procedure of record** — written in full in `BUILD_RECORD_GATEHOUSE_2026-11-24.md`, §"Critic conditions — disposition / NC-1" (Amendment 8 section): (1) read `anchor-state` to confirm the RESERVED record + stamped lastValidBlockHeight → (2) observe chain height passing the stamp via public explorer/RPC (no timer) → (3) founder `signMessage` release proof + authenticated `POST /v1/night-brick/anchor-reservation-release {challengeId, signature, reservationId}`; server re-observes height itself (200 EXPIRED_UNCLAIMED persisted · 409 while stamp valid · 502 if it cannot observe, nothing changes) → (4) device mirrors converge on next page load (P2 fix) or are cleared by hand under the manual-clear discipline with evidence filed. Packet copy: `evidence/10-nc1/BUILD_RECORD_GATEHOUSE_2026-11-24.md` (`ebe2f57a…`).
- **NC-1 origin** — `IMPROVER_REPORT.md` §NC-1 (`34e6e146…`), packet copy `evidence/10-nc1/IMPROVER_REPORT.md`.
- **NC-1 ruling** — `CRITIC_DEEPSEEK_REJUDGMENT_RAW.md` (`20f29c94…`): NEEDS-CHECK, "does not block clearance as a code defect; it is a mandatory go-live condition… Resolver: captain/ops approving the runbook." Packet copy `evidence/10-nc1/CRITIC_DEEPSEEK_REJUDGMENT_RAW.md`.
- **Status stated in the primary record itself:** the procedure is written; **the captain's approval of the NC-1 procedure is still a pending pre-go-live item** (build record, "Pendings carried forward" (ii)). The related NC-3 rollback item is marked DISCHARGED in the same build-record section, with its rollback procedure written there.
- If a separate signed-off "NC-1 release checklist" document is required for adjudication, it does **not** exist yet — it would have to be produced from the procedure above; it is not fabricated here.

---

## Packet manifest
83 files under `evidence/` in six folders (`01-amendment8-addendum2` · `02-implementation` · `03-regression-and-evidence-suites` · `04-08-proof-records` · `09-gemini-conditions` · `10-nc1`), plus this INDEX (84 files total). Total packet size ≈ 1.12 MB. All copies are byte-identical to their sources (sha256 of each copy listed above and verifiable against the source paths).

**Not included, deliberately:** (1) the devnet faucet test key file referenced by the harnesses (`genesis-rehearsal/keys/faucet-buffer.json`) — key material, excluded per packet rules; the harness sources themselves contain no key material. (2) The GitHub partner-desk copies of this evidence (`partner-desk/REPORTS/gatehouse-clearance-evidence/`, a8-prefixed) — no local clone of that folder exists on this machine (searched); the local originals in `gatehouse-work/` are the same artefacts and are what this packet copies. (3) VPS-side artefacts (deployed backups `gatehouse.mjs.v1/v2/v3-backup`, `/var/lib/provadia-gatehouse/` state files, env files) — not on this disk; deployment identity is evidenced by the read-back statements and hashes inside the included primary documents.

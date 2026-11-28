# CAPTAIN QUALITY LEDGER — Orchestrator production, first cycle
### Computed by the captain from register.json, 2026-11-28 08:16 CT — answering the Guardian's quality directive

Guardian's questions: first-pass acceptance? successful rework? repeated failures by model? The register answers all three, and the rework answer is the one that matters.

## The numbers (38 jobs: 20 deliverables + 18 examinations)

- Deliverables examined: **18** — **PASS 2 · FAIL 16** (first-pass acceptance 11.1%)
- The 2 passes: ORCH-0004 (mimo-v2.6-flash, Flood Batch 5 subjects) · ORCH-0024 (gpt-oss:120b, multi-engine architecture)
- **Reworks examined: 8 — PASS 0 · FAIL 8. Rework acceptance is 0%.** The Guardian's worry is confirmed by the record: rework is cycling, not converging.
- Every chain terminated (max 2 attempts, then parked) — nothing cycled endlessly. ORCH-0003 sits parked at "failed after max attempts — captain review."
- All 18 examinations were performed by one blind-verifier seat (gemma4:31b), cross-family to every producer, per the Relay Law.

## By model (deliverables examined · pass · fail)

| Seat | Examined | PASS | FAIL | Reworks passed |
|---|---|---|---|---|
| kimi-k3 | 4 | 0 | 4 | 0/1 |
| deepseek-v4-pro:0813 | 4 | 0 | 4 | 0/2 |
| gpt-oss:120b | 3 | 1 | 2 | 0/1 |
| minimax-m3 | 2 | 0 | 2 | 0/1 |
| glm-5.2 | 2 | 0 | 2 | 0/1 |
| nemotron-3-ultra | 2 | 0 | 2 | 0/1 |
| mimo-v2.6-flash | 1 | 1 | 0 | — |

## Captain's honest framing

- A FAIL in this factory means "not yet the finest variant" under the full house standard — several FAILed deliverables were still used downstream (the Web3 examinations feed the dossier reconciliation; the Folio spec fed the pilot). But the Guardian's metric stands: **first-pass 2/18 and rework 0/8 are quality facts, not wording.**
- Part of the failure load is the captain's: several briefs sent seats against the full standard without the acceptance checklist in hand. The corrective is structural, below — not more attempts.
- A blind verifier's FAIL is not the final word: the captain's adjudications (Orchestrator v2 test-run · ORCH-0024/0027 · Web3 exams vs dossier · ORCH-0003) are the convergence step the daemon cannot perform, and they are owed today.

## Correctives adopted (routing by demonstrated competence)

1. **Briefs carry the acceptance checklist + binding skills up front** — a seat is graded against a bar it can read before it starts.
2. **Competence routing:** architecture/spec commissions weight toward the seats holding passes (gpt-oss:120b, mimo-v2.6-flash) until other seats build a first-pass record; 0-pass seats draw build/QA work with narrower, checklisted briefs.
3. **Rework briefs must quote the examiner's findings verbatim** and name the exact defects to close — no generic "improve it" reworks.
4. **This ledger recomputes on every register change** and rides the hourly Guardian exchange, so first-pass and rework acceptance stay visible per model.

— Captain, 2026-11-28

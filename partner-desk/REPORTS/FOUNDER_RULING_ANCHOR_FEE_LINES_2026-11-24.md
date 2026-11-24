# FOUNDER RULING — THE ANCHOR CARRIES OUR OWN ZERO-PRICE FEE LINES (2026-11-24 09:11 CT)

George's ruling on the Addendum 7 fork, tapped in the main chat: **"Accept our own zero-price fee lines in the stamp."**

**What changes:** the anchor transaction's published shape is amended from "exactly 1 instruction (Memo)" to **exactly 3 instructions: our own ComputeBudget pair — SetComputeUnitPrice at 0 µL/CU and SetComputeUnitLimit at 210,000 — followed by the Memo instruction.** The pair is written by OUR construction, declared in the open, at price zero. Proven on devnet (gate10, Addendum 7): Phantom returns a construction-carried pair untouched; the stamp lands with the fee at exactly 5,000 lamports, the memo byte-exact, the payer exact, and no other balance movement.

**What does NOT change:** the memo text and its 133 bytes · format v1 · fee exactly 5,000 lamports · the Memo instruction byte-equal to the canonical text · the fee payer is the published ANCHOR account · no transfers, no approvals, nothing else in the transaction · the first-valid-anchor-wins rule · §9 item 1 remains a HARD GATE — the founder's mainnet sign proceeds only after the amended instrument passes rehearsal + the Phantom-path gate under the amended standard.

**Why:** Phantom 26.43 augments any transaction it signs that lacks a ComputeBudget pair, in both provider paths (Addenda 6–7, falsified fix A). The augmentation is a default that fills a vacuum; carrying our own pair at price 0 removes the vacuum at zero cost. The amended page's fail-closed assert stands: a transaction that does not match the published shape is never broadcast.

**Execution (captain's commission, same motion):** amend the anchor record's §3/§7 + verify-gate.mjs + the page's post-landing verification to the 3-instruction shape (ComputeBudget price MUST equal 0 — any other value fails verification) → re-run rehearse.mjs on the amended bytes → regenerate the devnet copy (CLUSTER-only diff) → re-run the VPS gate → full PASS required. Then: remove the temp /gate-devnet/ page, deploy anchor.html (merge-before-deploy), confirm the live page, record + publish the ANCHOR pubkey, and only then call the founder to sign.

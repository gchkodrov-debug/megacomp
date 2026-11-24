# GEMINI — #75 ANCHOR STANDARD AMENDMENT RATIFICATION (2026-11-24)

**Dispatch:** watch run 09:12 CT, 2026-11-24 — one message sent to the existing Gemini session (gemini.google.com/app/46ea9941c6a01756, signed in onejobkits@gmail.com, Ultra), browser task ef5727e7-ecf0-53ee-b66a-ff77b2cada0e, ran 09:15–09:21 CT (harness-measured).
**Brief:** founder ruling FOUNDER_RULING_ANCHOR_FEE_LINES_2026-11-24.md (2026-11-24 09:11 CT) + BUILD_RECORD_NIGHT_BRICK_ANCHOR_PREP_2026-11-24.md Addenda 6–7 / gate10 evidence + the original §7 verification recipe, carried in full in the dispatch text.
**Answer:** complete — returned in the dispatch run, verbatim below.

---

## VERBATIM ANSWER

Constitutional Declaration: How the One Structure Applies Here

Every technical ratification, cryptographic verification rule, and architectural ruling issued from this seat obeys the single house constitution—pinned centre → opens into genuine named parts → scroll-locked bullet with leader line and tip dot stating what each part is and what it does → reassembles whole—while locking the Gemini Approval Law, the Receipt Law (unverified renders NOTHING; every verifier clause must fail closed), Correction #64 (infrastructure ratification only), and the Founder's Ruling (2026-11-24 09:11 CT — FOUNDER_RULING_ANCHOR_FEE_LINES_2026-11-24.md).

ASSIGNMENT #75 — NIGHT BRICK ANCHOR STANDARD AMENDMENT RATIFICATION (3-INSTRUCTION SHAPE)
Verdict: RATIFIED WITH WORDING CHANGES (FAIL-CLOSED SHAPE CLAUSES LOCKED)

Under the standing Gemini Approval Law, I RATIFY AND CO-SIGN the Founder's Ruling (2026-11-24 09:11 CT: "Accept our own zero-price fee lines in the stamp") amending the Night Brick anchor transaction shape in BUILD_RECORD_NIGHT_BRICK_ANCHOR_PREP_2026-11-24.md from a 1-instruction Memo transaction to our exact, self-declared 3-instruction transaction (ix[0] SetComputeUnitPrice = 0 · ix[1] SetComputeUnitLimit = 210,000 · ix[2] Memo 133 bytes), together with the exact fail-closed third-party verification wording specified in Section 2 below.

The empirical evidence from Addenda 6–7 (Phantom 26.43 augmenting every 1-instruction transaction in both signAndSendTransaction and signTransaction with 375,000 µL/CU to land at 80,000 lamports, versus gate10 devnet signature bvYDksETCRNsuvBxjYGL6URabAY4nFNWSEfgv92crzU5k3mNyoZyY9zxUTxriTpGE4B3n9nNeDuLbsU59Uh6Uqq at slot 525829447 returning our 3-instruction transaction byte-identical with fee 5,000 lamports and meta.err = null) is decisive and clean.

1. Evidentiary Proof Check (Does the 3-Instruction Shape Preserve Everything the Anchor Exists to Prove?)

YES — 100% PRESERVED WITHOUT LOSS OR DILUTION.

Cryptographic Fixity & Timestamping (Unchanged): Solana's ledger commits all top-level instructions atomically into the signed message and block hash at the confirmed slot. Moving the 133-byte canonical UTF-8 Memo from ix[0] to ix[2] preserves the exact SHA-256 Day-Book root (79e375edd0f466d259366c002088eb666c8e1f55464e615882c202356ec6face), entry count (7 ENTRIES), and date (2026-11-23) byte-for-byte. Any post-landing alteration to daybook.json still breaks the root hash match immediately.

Zero-Trust Third-Party Verifiability (Preserved & Strengthened): Any independent third party querying any standard Solana RPC or explorer can still inspect the single transaction, decode ix[2] as UTF-8, compare it against root.json, and recompute the SHA-256 chain from daybook.json without trusting PROVADIA servers.

Economic Purity (5,000 Lamports Exact): Declaring our own SetComputeUnitPrice = 0 µL/CU prevents wallet-injected priority-fee inflation (80,000 vs. 5,000 lamports), keeping the exact base signature fee at 5,000 lamports (0.000005 SOL) with zero SOL transfers, zero token approvals, and zero side effects.

2. Exact Amended Verification Recipe Wording (§3 & §7 — Fail-Closed Third-Party Specification)

To ensure verify-gate.mjs, anchor.html's post-landing browser verifier, and any independent third-party auditor fail closed on any wallet-augmented or malformed transaction, replace the 1-instruction shape clauses in §3 and §7 with the following verbatim amended verification standard:

Amended PROVADIA Day-Book Anchor Verification Standard (v1.1 — 3-Instruction Declared Shape)

A Solana transaction counts as a valid PROVADIA Night Brick Day-Book Anchor if and only if every one of the following nine fail-closed conditions holds (all 9 MUST pass; any single mismatch = INVALID / FAIL):

1. Cluster & Finality: Confirmed on mainnet-beta with meta.err === null (confirmed or finalized commitment).

2. Payer & Signer Identity: accountKeys[0] (the fee payer and sole required signer) equals the published PROVADIA ANCHOR public key, and total balance delta across all accounts equals -5,000 lamports on accountKeys[0] (0 lamports moved on every other account; 0 inner instructions).

3. Exact Top-Level Instruction Count: transaction.message.instructions.length === 3 (no prepended, appended, or inner instructions).

4. Instruction ix[0] — Zero-Price Compute Unit Price (Declared Self-Construction):

Program ID equals ComputeBudget111111111111111111111111111111.

Instruction data bytes equal exact 9-byte hex 030000000000000000 (SetComputeUnitPrice discriminator 0x03 + little-endian u64 0 micro-lamports/CU). Any non-zero compute unit price fails immediately.

5. Instruction ix[1] — Declared Compute Unit Limit:

Program ID equals ComputeBudget111111111111111111111111111111.

Instruction data bytes equal exact 5-byte hex 0250340300 (SetComputeUnitLimit discriminator 0x02 + little-endian u32 210,000 CU).

6. Instruction ix[2] — Canonical SPL Memo Payload:

Program ID equals MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr (SPL Memo v2).

Raw UTF-8 instruction data equals exact 133 bytes (128 Unicode characters, zero trailing whitespace or newline), matching:
PROVADIA · DAYBOOK ROOT v1 · MAINNET · <64-hex-lowercase-root> · <N> ENTRIES · <YYYY-MM-DD>

7. Published Root & Chain Parity: <64-hex-lowercase-root>, <N>, and <YYYY-MM-DD> match root.json, and independent SHA-256 recomputation over all <N> entries in daybook.json reproduces <64-hex-lowercase-root> byte-for-byte.

8. First-Valid-Anchor-Wins Rule: For a given (root · entries · date) tuple, the earliest confirmed mainnet-beta slot satisfying Conditions 1–7 is the canonical anchor.

9. Scope of Proof (Honesty Boundary): A passing anchor proves cryptographically that this exact Day-Book root existed and was fixed at the confirmed block time; it does not by itself attest to the external truth of the underlying entries.

3. Audit of Potential Weaknesses, Edge Cases & Ambiguities (Four Subtle Traps Closed)

Nothing in the 3-instruction amendment weakens the cryptographic security of the anchor, provided the implementation enforces four subtle technical details in verify-gate.mjs and anchor.html:

Legacy vs. Versioned (v0) Transaction Serialization (Address Lookup Tables):

Risk: If a wallet converts a legacy transaction into a v0 message with an addressTableLookups array, accountKeys splits across static keys and loaded addresses.

Rule: Construct and sign as a legacy Solana Transaction (version: "legacy" / null, addressTableLookups.length === 0) so accountKeys[0] and program ID resolution remain deterministic across all explorers and scripts.

Exact Byte-Level Instruction Check (Hex Data vs. Parsed JSON):

Risk: Different RPC nodes (jsonParsed vs. base64/base58) format ComputeBudget instructions inconsistently—some return { parsed: { type: "setComputeUnitPrice", info: { microLamports: 0 } } } while others return raw base58/base64 bytes.

Rule: Always decode the raw instruction buffer (030000000000000000 for ix[0], 0250340300 for ix[1], and exact 133-byte UTF-8 buffer for ix[2]) rather than relying on RPC jsonParsed heuristics.

Zero Inner Instructions (CPI Guard):

Risk: Checking only top-level instructions.length === 3 leaves a theoretical edge case if a malicious instruction invoked inner CPIs.

Rule: Explicitly assert meta.innerInstructions === null || meta.innerInstructions.length === 0 (already included in Condition 2 above).

Hard Gate Reminder (§9 Item 1):

Confirmed: The founder's mainnet signing key remains untouched until the amended rehearse.mjs + devnet /gate-devnet/ VPS Phantom-path gate passes 9/9 (100%), /gate-devnet/ is removed, anchor.html is deployed via merge-before-deploy and hash-verified live, and the ANCHOR pubkey is published.

Co-Signed for the Official Record:

Founder (George) — Ruled (2026-11-24 09:11 CT)

Captain — Diagnosed (Addenda 6–7 / gate10) & Commissioned Gate Re-Run

Gemini (Main Builder & Field Commander) — RATIFIED WITH WORDING CHANGES (2026-11-24 09:19 CT)

---

## CAPTAIN'S ADJUDICATION — SUSTAINED WHOLE, WITH 2 CLARIFICATIONS

**Verdict adopted: RATIFIED WITH WORDING CHANGES.** The amendment preserves everything the anchor exists to prove — existence + fixity of the root at block time, third-party verifiable without trusting us — and his 9-condition fail-closed standard is adopted as the wording the amendment crew writes into the record's §3/§7, verify-gate.mjs, and the page's post-landing verification. His four traps are all sustained on the record's own evidence: the construction is already a legacy transaction (§4 of the build record); both blind verifiers already judged from raw decodes, not jsonParsed; the zero-inner-instructions assert is a genuine fail-closed strengthening; and the §9 item 1 hard gate stands exactly as he restates it — the founder's mainnet sign still waits on the amended gate PASS, not on this ratification.

**Clarification 1 — Condition 8 keeps the §3 qualifier.** His first-valid-anchor-wins wording ("earliest confirmed slot satisfying Conditions 1–7") is adopted subject to the build record's standing §3 rule: the first valid anchor **at or after the day's 21:00 UTC close** is that day's anchor of record. An otherwise-valid anchor landing before the close does not win the day.

**Clarification 2 — "v1.1" names the verification standard only.** The memo format remains **v1** — the memo bytes, their field order, and the 133-byte instance are unchanged, and no format bump (which under §3 would require a new rehearsal on changed memo bytes) is implied. v1.1 is the version of the verification recipe, not of the memo.

**Carried to the amendment crew (already commissioned in the founder ruling's execution):** write his 9 conditions into §3/§7 with the two clarifications above · verify-gate.mjs checks raw instruction bytes (ix[0] `030000000000000000` · ix[1] `0250340300` · ix[2] the 133 memo bytes) + legacy/no-lookup-table + zero inner instructions · ComputeBudget price MUST equal 0, any other value fails · re-rehearse, regenerate the devnet copy (CLUSTER-only diff), re-run the VPS gate to full PASS before any deploy or founder sign.

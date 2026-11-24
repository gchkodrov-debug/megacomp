# GEMINI — GENESIS PRIVACY AMENDMENT LOCKED: genesis-bricklayer-v1.1 (Assignment #34P, 2026-11-23)
## Verbatim return, Gemini session 46ea9941c6a01756 (Ultra), answering the founder's exact decision text.

- receipts:
  - None
- report:
  - status: completed
  - summary: Priority assignment complete — the founder's Genesis Privacy Amendment approval was sent to Gemini exactly as written between the markers (nothing added, nothing removed), and Gemini's full reply is below, verbatim. No problems hit: text-only message, no sign-in issue, complete reply returned. Session: onejobkits@gmail.com (OneJobKits, Ultra, model "Hydrogen"), https://gemini.google.com/app/46ea9941c6a01756, tab t1.
    
    ——— GEMINI'S REPLY — VERBATIM ———
    
    Constitutional Declaration: How the One Structure Applies Here
    
    Every specification update, privacy amendment, and Devnet verification gate issued from this seat obeys the single house constitution—pinned centre → opens into genuine named parts → scroll-locked bullet with leader line and tip dot stating what each part is and what it does → reassembles whole—while locking the founder's new permanent architectural principle into the foundation of PROVADIA: Protect the person · Preserve the collectible · Keep both authentic and independent.
    
    OFFICIAL SPECIFICATION AMENDMENT: GENESIS PRIVACY & UNLINKED SERIALS (genesis-bricklayer-v1.1)
    
    Status: ADOPTED & LOCKED INTO SPECIFICATION (2026-11-23 evening CT) — Mainnet deployment remains strictly unauthorized until the complete Devnet rehearsal passes all privacy, security, and separation tests and the founder gives his explicit DEPLOY word.
    
    1. ARCHITECTURAL CHANGES LOCKED INTO genesis-bricklayer-v1.1
    
    To eliminate any cryptographic, chronological, or metadata link between a member's private Founding Bricklayer Membership Number and their public on-chain Genesis Collectible Serial (#001/470 – #470/470), four hard changes supersede v1.0:
    
    A) Permanent Removal of Citizenship Identifiers from On-Chain Metadata & Ceremonies
    
    Stripped from Arweave JSON & Metaplex Core Attributes: The founding_bricklayer_id attribute proposed in v1.0 is permanently deleted. On-chain metadata contains zero Bricklayer numbers, zero member handles, zero account creation timestamps, and zero database IDs.
    
    What On-Chain Metadata Carries Instead:
    
    name: "PROVADIA Genesis Bricklayer #<SERIAL>/470"
    
    edition_serial: 1..470 (the collectible's own edition number)
    
    edition_cap: 470
    
    minted_at_utc: Timestamp of the on-chain mint event only (not the member's registration date)
    
    artwork_sha256: Cryptographic hash of the permanent Arweave master file (ar://<txid>)
    
    related_universe_token: "9UE6NStA9pRZ5xagrK1FNy3vybmQVL2VaKB7BNpvpump" (informational provenance only)
    
    entitlements: "NONE — Commemorative Mark Only"
    
    Birth-Certificate Ceremony (solnik-nft-ceremony-v1) & Nexus Share Card Conformed:
    
    Both the Birth-Certificate Ceremony overlay and the public Nexus Share Card display only the collectible's Genesis Edition Serial (GENESIS BRICKLAYER #014 / 470), mint date, and Arweave/Solana provenance—never printing the member's private Bricklayer citizenship number beside it.
    
    B) Non-Sequential / Decoupled Serial Assignment (Preventing Chronological Inference)
    
    Why Sequential Order Leaks Identity: If Member #1 claims Serial #001, Member #2 claims Serial #002, and Member #3 claims Serial #003, an observer comparing Agora registration order against on-chain mint timestamps could infer a member's private Bricklayer number from their NFT serial.
    
    Cryptographic Decoupling Rule:
    
    At collection initialization, the server generates a CSPRNG-shuffled permutation pool of integers [1..470] stored encrypted in the private server registry (genesis_serial_pool).
    
    When an eligible member claims their collectible, the relayer draws the next random unissued serial from the shuffled pool (e.g., an early Bricklayer may draw #318/470, while a later Bricklayer draws #042/470).
    
    Result: Every serial #001/470 through #470/470 remains genuine, unique, and strictly capped at 470, while mathematically preventing any third party from deducing a member's private Bricklayer citizenship number from their NFT serial or mint order.
    
    C) Private Registry Isolation (Encrypted One-Way Link)
    
    Inside the Hostinger members database, the association between member_id (carrying their private Founding Bricklayer Number, Agora history, and Golden Wall vote) and claimed_genesis_serial is stored in a private, access-controlled table (member_genesis_claims):
    
    Never exposed on any /api/public/* endpoint.
    
    Never included in nexus-share-manifest payloads.
    
    Retained permanently on the original member's private citizenship record even if the member later transfers or sells the NFT on-chain.
    
    D) Complete Independence of Citizenship vs. Ownership
    
    Citizenship (My PROVADIA Instrument 01): Bound solely to the verified member account; non-transferable; carries Founding Bricklayer Number, Agora voice, and Golden Wall vote.
    
    Collectible Ownership (My PROVADIA Instrument 02): Read live from the connected Solana wallet; 100% transferable; selling or transferring the NFT transfers the collectible artifact cleanly on-chain while changing nothing about either party's town citizenship, Bricklayer number, or privileges.
    
    2. MANDATORY DEVNET REHEARSAL SUITE (PRIVACY, SECURITY & SEPARATION TESTS)
    
    Before any Devnet rehearsal is reported as passed—and long before Mainnet is ever considered—the crew and blind verifier must execute and log all seven tests:
    
    Test 1 — On-Chain & Arweave Zero-PII Metadata Audit (Privacy Gate 1):
    
    Fetch the raw Arweave JSON and Metaplex Core on-chain account bytes for minted Devnet specimens. Assert via automated schema check that zero keys or values contain bricklayer, member_id, handle, email, or registration timestamps.
    
    Test 2 — Serial Unlinkability & Shuffled Pool Proof (Privacy Gate 2):
    
    Simulate 10 sequential test members (Bricklayer #0001 through #0010) claiming in chronological order. Verify that the assigned NFT serials are non-sequential (serial != registration_order), unique (0 collisions), and carry zero correlation to registration order.
    
    Test 3 — Public API & Nexus Share Payload Leak Test (Privacy Gate 3):
    
    Query every public endpoint (/api/public/member/*, /coin/ constellation state, and the Nexus share serializer) for a member who has claimed a Genesis NFT. Confirm that neither their Founding Bricklayer Number nor any link tying their wallet to their private registry ID appears anywhere in public responses.
    
    Test 4 — Isolated Relayer Key & Authority Fence (Security Gate 1):
    
    Verify that the Devnet relayer keypair is distinct from both the founder's wallet and town treasury, holds ≤ 0.25 SOL, and fails with an explicit on-chain authorization error if invoked for collection updates, supply expansion, or token transfers.
    
    Test 5 — Exact 470 Hard Cap Boundary (Security Gate 2):
    
    Simulate minting #469/470 and #470/470, then fire two concurrent requests for #471. Verify #471 is rejected in both the database and on-chain collection state with zero expansion path.
    
    Test 6 — Mid-Ceremony Disconnect & Refresh Idempotency (Security Gate 3):
    
    Interrupt wallet connection and refresh the browser mid-claim; confirm resuming restores the member's exact assigned serial without minting a duplicate or deadlocking eligibility.
    
    Test 7 — Post-Sale Citizenship & Privilege Separation (Separation Gate):
    
    Transfer a minted Devnet Genesis NFT from Wallet A to Wallet B; confirm Member A retains 100% of their Founding Bricklayer record, Agora rights, and Wall vote, while Wallet B gains zero town membership or privileges.
    
    Ledger & Queue Status
    
    genesis-bricklayer-v1.1 (incorporating the Genesis Privacy Amendment) is now the official governing specification for the Devnet rehearsal.
    
    As soon as the Flow agent clears and genesis-bricklayer-seal-v1 takes land—and as soon as the crew completes the 7-test Devnet rehearsal run—send the contact sheets and verified test logs to my seat for review before anything goes to the founder's final DEPLOY verdict.
    
    ——— END OF REPLY ———
    
    Headline for the desk: the founder's privacy amendment is adopted and locked as genesis-bricklayer-v1.1, superseding v1.0 on four hard changes: (A) founding_bricklayer_id permanently deleted from on-chain metadata and ceremonies — zero Bricklayer numbers, handles, account timestamps or database IDs on-chain; on-chain metadata carries only edition serial, cap, mint timestamp, artwork hash, related token and "NONE — Commemorative Mark Only"; (B) CSPRNG-shuffled serial pool (genesis_serial_pool) — serials are drawn non-sequentially at claim, so mint order cannot reveal membership numbers; (C) the member↔serial association lives only in a private access-controlled table (member_genesis_claims), never on any public API or Nexus share payload, retained permanently on the original member's citizenship record after any sale; (D) citizenship (My PROVADIA Instrument 01, non-transferable) and collectible ownership (Instrument 02, 100% transferable) are fully independent. A mandatory 7-test Devnet rehearsal suite gates any passed verdict: zero-PII metadata audit; serial unlinkability proof; public API/Nexus leak test; isolated relayer key fence (≤0.25 SOL); exact 470 hard-cap boundary; mid-ceremony disconnect idempotency; post-sale citizenship separation. Mainnet remains strictly unauthorized until the full rehearsal passes and the founder gives his explicit DEPLOY word. Next to Gemini's seat: the genesis-bricklayer-seal-v1 contact sheets and verified test logs once Flow clears and the rehearsal run completes.
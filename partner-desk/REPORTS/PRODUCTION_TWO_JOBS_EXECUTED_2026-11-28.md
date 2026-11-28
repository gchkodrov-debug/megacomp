# PRODUCTION — TWO ARMY JOBS EXECUTED TONIGHT (captain follow-up to the 23:50 production report)
Filed 2026-11-28 00:0x CT. The Guardian's distinction is adopted: assignments are not production. These are executions, with outputs on disk and captain-run tests.

## JOB 1 — PCN-0003 · seat kimi-k3 · EXECUTED, DELIVERED
Acceptance-test suite for the Keeper Living Product Listing (FVR-38): 25 numbered tests (T-01..T-25), evidence convention (one folder per test, named artefacts, no artefact no pass), execution environment (320/375/390/430 + 1280px, axe-core, HAR, screenshot diff), verdict rule tying placement to all 25 tests + the six founder gates, UNKNOWN blocks placement. Output: comms-engine/army-dispatch/pcn0003-kimi-output.md (16,663 bytes). Captain executes it against the real Keeper build when BUILD-LISTING-001 outputs land.

## JOB 2 — manifest_refresh.py · seat deepseek-v4-pro:0813 · EXECUTED, CAPTAIN-VERIFIED
The P0 from DeepSeek's own examination (PCN-20261128-0021): programmatic manifest refresh + loader, built to the locked #140/#142 contract (permanent IDs PROV-VID-/PROV-IMG-, sha256 from physical files, status enum, sound_state enum, consumer_policy index_all/render_eligible_only).
- RELAY FINDING (kept on record): the delivered code carried a syntax defect — argparse attribute "legacy_json_or_-" (a dash in the CLI placeholder) made the module un-runnable as delivered. Captain fixed it himself (one token, discretion clause) rather than re-rolling the seat.
- Captain-run results AFTER the fix: the seat's own test file passes 14/14 · the tool ran on the real production folder and produced assembly/manifest_v2.json: 392 records (197 films + 195 images), deterministic IDs, real hashes · the tool's verify mode re-hashed all 392 files against the manifest: ZERO gaps, exit 0.
- NAMED GAP (not hidden): sound_state came out "unknown" for all 197 films — the legacy manifest's sound records did not map into the tool's expected fields. Per binding rule 3, unknown is the safe direction (blocks finished placement, never assumed pass), but the sound layer must be folded in with the #140 refresh; the measurements exist (128 films gated in the prior manifest + tonight's intake readings).

## STATE AFTER THESE EXECUTIONS
- Army seats that produced tonight: kimi-k3, deepseek-v4-pro:0813 (plus deepseek-v4.1-flash:1017 earlier via the bridge). The rest remain idle for the reasons in the 23:50 report; the captain's recommendation stands: timed bounded dispatches over the bridge so production runs between partner conversations.
- Gemini: silent since 22:36 CT; the 23:50 production report carried the knock; #140 due Sat 10:10 CT.
- The Keeper test suite (Job 1) and the manifest tool (Job 2) are the first two artifacts of the manufacturing line the Guardian demanded. More dispatches follow the queue, in order.

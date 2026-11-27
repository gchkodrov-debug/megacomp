# RUN REPORT — Verifier Hardening (Guardian sequence step 2)

**Build:** Hardening pass on the FVR-34 $0 Diagnostic & Provenance Reference Prototype
**Date:** 2026-11-26 (run executed 2026-11-27T02:40Z)
**Location:** `~/workspace/newwave/next-build/provadia-economy-v1/` (hard isolation respected — nothing outside this directory was written)
**Cost:** $0 · zero npm installs · Node.js built-ins only · no network calls · no real secrets anywhere (all fixture keys are synthetic and contain the literal word FAKE)

---

## Verdict

**Every battery expectation was met.** The hardened scanner (verifier-v2.cjs)
detects the original ground truth, stays silent on the clean control, is no
longer fooled by the restored decoy comments that defeated v1, flags all
three new shallow-match evasions, and its verifier now distinguishes a
*pinned trusted signer* (PASS) from *somebody signed this* (UNVERIFIED_SIGNER)
from *forged* (INVALID). This remains a reference prototype — see "What the
dominance check still cannot see" before anyone quotes it as more.

v1 is preserved untouched: `verifier.cjs`, `pae-inspector.html`, the CLI
README, the original `fixture/` files and the first-run report were
sha256-checked before and after this pass — all identical.

## What was built / changed

| Piece | Path |
|---|---|
| Hardened scanner + pinned-signer verifier (v2; v1 untouched) | `provadia-verifier-cli/verifier-v2.cjs` |
| Permanent comment-decoy regression fixture (original comment wording restored) | `fixture-regression-comments/` + its `REGRESSION_PURPOSE.md` |
| New negative fixtures (un-awaited check · post-mutation check · `USING (true)` policy) + controls | `fixture-negative/` + its `EXPECTED.md` |
| Pinned trusted-signer policy (prototype, test key only) | `runs/second-run/pinned-signers.json` |
| Run evidence | `runs/second-run/` (diagnostics, signed PAEs, tampered copies, verify outputs with exit codes, transcripts, keys) |

## The hardening, in brief

1. **Comment/string stripping (decoy resistance).** The auth and RLS
   scanners now analyse code with comments and string literals blanked by
   an offset-preserving lexer (stripped characters become spaces, newlines
   kept — offsets and line numbers still refer to the original file).
   The **secret scanner deliberately still runs on raw text**: a secret is
   string content, and a real key pasted into a comment is still a
   committed key; stripping there would blind the one scanner whose
   targets live inside literals. This asymmetry is a decision, recorded
   here, not an oversight.
2. **Semantic auth rule (dominance approximation).** A session check
   counts as effective only if it is **awaited** and appears **before the
   first database/storage mutation** in the route file. Failure modes are
   named distinctly: `MUTATION_WITHOUT_SESSION_CHECK`,
   `SESSION_CHECK_NOT_AWAITED`, `SESSION_CHECK_AFTER_MUTATION` (all
   CRITICAL). RLS analysis additionally flags policies that are
   `USING (true)` / `WITH CHECK (true)` as
   `PERMISSIVE_RLS_POLICY_USING_TRUE` (CRITICAL) — RLS enabled but
   decorative.
3. **Honest labels, everywhere in v2 output.** Gate `DETERMINISTIC_BUILD`
   → `MANIFEST_REPRODUCIBILITY` (hash-manifest self-consistency only; no
   compile runs). Dependency inventory → `SBOM_LITE` / gate
   `SBOM_LITE_HYGIENE` (name/version/pinned only; no CycloneDX, no CVE or
   license data — this also renames the PAE envelope field to
   `sbomLiteSha256`, a deliberate deviation from the §4.1 draft shape in
   favour of a true label). Signing keys carry
   `NONPRODUCTION_TEST_KEY_ONLY` and a `keyId`. The browser `/verify`
   inspector (`pae-inspector.html`) is **UNTESTED**: v2 does not alter
   its claims, labels it untested in this report, and prints that status
   on every CLI verify run. The CLI is the tested verification path.
4. **Pinned-signer verification (PDP-v1 amendment).** A valid signature
   alone no longer reports PASS. `verify --pinned <policy>` returns:
   **PASS** (exit 0) only if the signer is in the pinned trusted-signer
   policy; **UNVERIFIED_SIGNER** (exit 3) if the signature is
   cryptographically valid but the signer is unpinned — *somebody signed
   this* is now a distinct, non-passing result; **INVALID** (exit 1) if
   the signature fails, the envelope is malformed, or the subject hash
   does not match the diagnostic. With no policy supplied, no signer is
   trusted and every valid envelope reports UNVERIFIED_SIGNER.

## Battery results

| # | Test | Expected | Actual |
|---|------|----------|--------|
| 1 | v2 scan `fixture/` | 3C · 2H · 1M; SECRET/RLS/SBOM_LITE fail, MANIFEST_REPRODUCIBILITY pass | ✅ exactly that. Manifest `51399057…` — **identical to the first-run v1 manifest**, proving v2 scanned the same untouched tree |
| 1b | v2 scan `fixture/` repeated | Manifest identical across runs | ✅ identical (`manifest-reproducibility.txt`) |
| 2 | v2 scan `fixture-clean/` | 0 findings, all gates pass | ✅ 0 findings |
| 3 | v2 scan `fixture-regression-comments/` | Same ground truth as `fixture/` despite decoy comments | ✅ 3C · 2H · 1M — D3 and D4 detected; the auth finding now cites the actual mutation line (25) instead of a comment line |
| 4 | **v1** scan `fixture-regression-comments/` (control) | v1 fooled: D3 + D4 missed, RLS_GUARD falsely passes | ✅ fooled exactly as recorded — 1 CRITICAL only, `RLS_GUARD=pass`. The defect class, demonstrated against the preserved fixture |
| 5 | v2 scan `fixture-negative/` | Exactly 3 CRITICAL: NOT_AWAITED, AFTER_MUTATION, PERMISSIVE_USING_TRUE; controls silent | ✅ exactly 3, correct rules and files; control route NC1 and owner-policy table NC2 not flagged; deps clean |
| 6 | Pinned signer: attest + verify with policy | PASS, exit 0 | ✅ PASS (keyId `c025de7a…`) — and the envelope still honestly attests a FAILING artifact (3 gates failed, recorded, not laundered) |
| 7 | Unpinned signer: attest (second key) + verify with policy | UNVERIFIED_SIGNER, exit 3 | ✅ exit 3, distinctly worded — valid signature, untrusted signer |
| 8 | Unpinned envelope, no policy · pinned envelope, no policy | UNVERIFIED_SIGNER, exit 3 (no policy → no trust) | ✅ both exit 3 |
| 9 | Tamper 1: one character in `issuedAtUtc` of the pinned envelope | INVALID, exit 1 | ✅ FAIL (INVALID) |
| 10 | Tamper 2: gates forged to all-passed on the pinned envelope | INVALID, exit 1 | ✅ FAIL (INVALID) — the commercially important fraud, defeated even against a pinned key's envelope |

## Known-defect entry (closed by this pass, regression-covered)

> **KD-001 — Scanner reads comments as code.** First recorded in
> `runs/first-run/RUN_REPORT.md` ("What failed during construction", item
> 2): v1's text heuristics accepted a session check and an RLS-enable
> statement that existed only in fixture comments, silently missing
> defects D3 and D4; the first run was made to pass by rewording the
> comments. **Status: REGRESSION-COVERED.** The original wording is
> restored permanently in `fixture-regression-comments/`; v1 is
> demonstrated fooled by it (battery #4) and v2 detects the full ground
> truth through it (battery #3). Any future scanner version must be run
> against that fixture before its results are quoted; if it regresses
> there, the scanner is wrong, not the fixture.

## What the dominance check still cannot see (honest limits)

- **Not a control-flow graph.** The auth rule is ordered token analysis
  over stripped text — an *approximation* of dominance. It does not model
  branches, early returns, try/catch, or multiple handlers per file; a
  check inside a conditional that does not actually guard the mutation
  can satisfy it.
- **Result-testing is not verified.** A route that awaits the session and
  then *ignores* the result (never tests for null, never returns 401)
  passes the auth rule. Gemini's full control — "the check's non-null
  result dominates every sink" — is only half implemented: position and
  awaitedness yes, result-testing no.
- **Delegated guards still false-positive.** A route whose auth lives in
  an imported helper or middleware shows no check token in its own file
  and still draws a CRITICAL. (v1 had this too; stripping did not change
  it.) A production version needs import resolution.
- **Lexer limits.** The JS stripper does not recognise regex literals; a
  regex containing `//` or a quote character can desynchronise it. SQL
  analysis is migration-text parsing, not a database catalog read, and
  policies written across unusual formatting may evade the statement
  splitter.
- **Entropy threshold unchanged** (4.50 bits/char, ≥24 chars) — still a
  blunt knob tuned on one fixture family, unvalidated on real codebases.
- **MANIFEST_REPRODUCIBILITY is still not a build.** No compile ran. The
  relabel makes the output stop claiming otherwise; it does not add the
  missing capability.
- **SBOM_LITE is still not an SBOM.** No CycloneDX document, no CVE or
  license data.
- **Pinned-policy custody is out of scope, exactly as in run 1.** The
  prototype policy file sits next to its own evidence and names a
  throwaway test key (`NONPRODUCTION_TEST_KEY_ONLY`). What is proven is
  the *semantics* — pinned vs unpinned vs invalid are three different
  answers — not the distribution or custody of a production policy.
- **`/verify` browser surface remains UNTESTED** (WebCrypto Ed25519
  support varies by browser). Its file was not modified.

## Files in this run

`runs/second-run/`: `diagnostic-v2-fixture.json` · `diagnostic-v2-fixture-repeat.json` ·
`diagnostic-v2-clean.json` · `diagnostic-v2-regression.json` ·
`diagnostic-v1-regression.json` (the fooled control) · `diagnostic-v2-negative.json` ·
`manifest-reproducibility.txt` · scan transcripts for every run ·
`pinned-signers.json` · `keys-pinned/` · `keys-unpinned/` ·
`pae-v2.json` (pinned, genuine) · `pae-v2-unpinned.json` ·
`pae-v2-tampered.json` · `pae-v2-tampered-gates.json` ·
verify outputs with exit codes (`verify-pinned.txt`, `verify-unpinned.txt`,
`verify-unpinned-nopolicy.txt`, `verify-pinned-nopolicy.txt`,
`verify-tamper1.txt`, `verify-tamper2.txt`)

## Next in the Guardian sequence (not performed by this pass)

Step 3 — the Hospital specimen (Lane 4, five sealed defects, conformed
spec) runs through this hardened pipeline; step 4 — independently verified
delivery — is a separate seat's blind grading, not this report's claim.

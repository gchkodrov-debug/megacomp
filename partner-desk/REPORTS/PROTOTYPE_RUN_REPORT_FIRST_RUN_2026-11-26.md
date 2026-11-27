# RUN REPORT — $0 Local Diagnostic & Provenance Reference Prototype

**Build:** First construction under FVR-34, per Gemini's Dual-Surface Architecture §8 "Immediate Next Build Step"
**Date:** 2026-11-26 (run executed 2026-11-27T02:26Z)
**Location:** `~/workspace/newwave/next-build/provadia-economy-v1/` (hard isolation respected — nothing outside this directory was written)
**Cost:** $0 · zero npm installs · Node.js built-ins only · no network calls · no real secrets anywhere

---

## Verdict

**The mechanism works end to end.** Scan → structured Diagnostic JSON → Ed25519-signed PAE-v1 envelope → tamper-evident verification, all four deterministic scanners firing on planted defects and staying silent on clean controls. This is a reference prototype proving the pipeline — **not a product** (see "What is crude" before anyone quotes it as one).

## What was built

| Piece | Path |
|---|---|
| Flawed synthetic fixture (Next.js/Supabase-style, all fake) | `fixture/` + `fixture/FIXTURE_DEFECTS.md` (planted ground truth) |
| Clean control repo (negative-test target) | `fixture-clean/` |
| Verifier CLI (scan / keygen / attest / verify) | `provadia-verifier-cli/verifier.cjs` (~430 lines, built-ins only) |
| Browser PAE inspector (single file, WebCrypto) | `provadia-verifier-cli/pae-inspector.html` |
| Run evidence | `runs/first-run/` (diagnostics, signed PAE, tampered copies, verify outputs, transcripts, keys) |

## The four scanners — results against the planted ground truth

Expected (per `FIXTURE_DEFECTS.md`): **3 critical · 2 high · 1 medium · gates SECRET_SCAN=fail, RLS_GUARD=fail, SBOM_HYGIENE=fail, DETERMINISTIC_BUILD=pass**

Actual run: **exactly that.** 6 findings, zero misses, zero false positives on the controls.

| Planted defect | Scanner | Result |
|---|---|---|
| D1 fake `sk_live_FAKE…` key pattern in `src/lib/payments.ts` | Secret (regex) | ✅ CRITICAL, line 7 |
| D2 fake high-entropy service token | Secret (Shannon entropy 5.38 ≥ 4.50) | ✅ MEDIUM, line 10 |
| D3 checkout API route mutates with no session check | Auth guard | ✅ CRITICAL |
| D4 `orders` table created without RLS | RLS guard | ✅ CRITICAL |
| D5 `"stripe": "*"`, `"@supabase/supabase-js": "latest"` | Dependency hygiene | ✅ HIGH ×2 |
| Controls: session-checked profile route · RLS-enabled `profiles` table · clean `format.ts` · pinned deps | all | ✅ not flagged |

**Clean control run:** `fixture-clean/` → **0 findings of any severity, all 4 gates pass.** Zero false criticals — and zero false anything.

**Reproducibility:** the fixture's build manifest SHA-256 (`51399057…`) was identical across two independent scan runs, and identical when recomputed inside a single run (the DETERMINISTIC_BUILD gate).

## PAE-v1 signing & verification

- Ed25519 keypair generated locally (Node `crypto`); the envelope follows the architecture §4.1 shape: `provadia.attestation.v1`, subject hash of the diagnostic, transcript hash, SBOM hash, EU AI Act Art. 50 marker, `settlementProof.rail = "none"`.
- **The envelope honestly attests a FAILING artifact**: gatesPassed = `[DETERMINISTIC_BUILD]`, gatesFailed = `[SECRET_SCAN, RLS_GUARD, SBOM_HYGIENE]`. The signature certifies the truth of the diagnostic; it does not launder it.
- `verify` on the genuine envelope: **PASS** (exit 0), including the subject-hash cross-check against the diagnostic file.
- **Tamper test 1** — one character changed in `issuedAtUtc` (`T02` → `T12`): **FAIL** (exit 1). This is the §7 matrix negative gate for candidate #6, demonstrated.
- **Tamper test 2** — `gatesFailed` emptied and all gates fraudulently claimed passed: **FAIL** (exit 1). The commercially important fraud (turning a failing audit into a passing one) is exactly what the signature defeats.

## What failed during construction (kept in the record)

1. **First run crashed**: the CLI was written as `.mjs` with CommonJS `require` — Node refused it. Fixed by renaming to `.cjs`. Trivial, but it happened.
2. **First successful scan silently missed D3 and D4** (RLS_GUARD showed a false "pass"). Root cause: **my own fixture comments described the defects in the scanner's literal language** — the checkout comment mentioned the session-check function by name, and the migration comment quoted the RLS-enabling statement verbatim, so the heuristics "found" the checks in prose. The fixture comments were reworded and both defects then fired. This failure is worth more than the success: it demonstrates, on our own bench, that **a text-heuristic scanner reads comments as code** — a real evasion/false-negative class any production version must close with actual parsing.

## What is crude (do not mistake this for the Hospital or the Verifier product)

- **Heuristics, not AST.** Session detection is token-presence in the route file: a route that delegates its check to an imported helper would draw a **false critical**; a check mentioned in a comment satisfies it (proven above). RLS detection is migration-text parsing, not a database catalog read.
- **Entropy threshold (4.50 bits/char, ≥24 chars) is a blunt knob** — tuned on one fixture, unvalidated against real codebases; minified bundles and lockfiles are excluded/skipped rather than handled.
- **The build gate proves self-consistency, not a build.** No `npm ci`/compile was run (that would need a registry mirror per §3.3); DETERMINISTIC_BUILD here means "the tree's hash manifest is reproducible," nothing more.
- **SBOM is "SBOM-lite"** — name/version/pinned only. No CycloneDX document, no CVE or license data (the architecture's full §3.3 scope).
- **The signing key is a throwaway prototype key** sitting in `runs/first-run/keys/` next to its own evidence. A production verifier key needs real custody (this prototype deliberately proves the format, not the custody).
- **`pae-inspector.html` is built but untested in a live browser** — WebCrypto Ed25519 support varies (recent Chrome/Edge yes; Safari historically no). The CLI `verify` mode is the tested path; the HTML carries the same canonicalization code and a graceful failure message.
- **Line numbers in findings can point at comment lines** (the auth finding cites line 2, a comment, because the prose there matches the mutation pattern). Cosmetic, recorded.
- The Lane 4 spec's full specimen (LedgerLane, 17 sealed defects, Relay-graded repair loop) is a **larger, separate construction** — this prototype proves the diagnostic + provenance mechanism that specimen's delivery will ride on; it does not replace it.

## Files in this run

`runs/first-run/`: `diagnostic.json` · `diagnostic-clean.json` · `scan-transcript.log` · `scan-clean-transcript.log` · `pae.json` (signed) · `pae-tampered.json` · `pae-tampered-gates.json` · `verify-ok.txt` · `verify-tamper.txt` · `verify-tamper-gates.txt` · `keys/` (prototype keypair)

## Next steps this prototype makes possible (not authorized by this report)

1. Feed the CLI's diagnostic + PAE shape into Lane 3's passport ratification (the reconciliation's interim evidence form).
2. AST-based route/RLS analysis and a real offline build gate for Hospital v1.
3. Run the same pipeline against the Lane 4 LedgerLane specimen when it is built.

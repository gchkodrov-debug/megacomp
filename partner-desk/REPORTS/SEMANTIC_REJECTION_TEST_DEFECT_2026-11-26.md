# SEMANTIC REJECTION TEST — trusted-signer envelope with internally false gate claims

**Origin of this test:** Guardian requirement, relayed through Gemini's byte-examination
cross-check (2026-11-26): *"an additional semantic rejection fixture (trusted-signer signed
manifest containing internally false gate claims)"* — a valid signature from a trusted signer
must not be enough; claims that contradict the referenced evidence must be **rejected at the
invariant step** (corrected PDP-v1 schema §2.4, esp. I1/I4: the gate partition is *derived,
not asserted*; a signed summary inconsistent with its detail is internally false).

**Date run:** 2026-11-27 · **Tool under test:** `verifier-v2.cjs` (verifier-0.2.0-prototype-hardened),
the exact source copy in this drop · **Cost:** $0, local only.

---

## The fixture

`pae-v2-false-gates.json` (this folder) — a `provadia.attestation.v1` envelope in which
**everything is genuine except the gate claims**:

| Element | Value | Genuine? |
|---|---|---|
| Signer | keyId `c025de7a3a657887` — the **pinned** prototype test key (`pinned-signers.json`, this folder) | Yes — real Ed25519 signature by the pinned key over the canonical envelope |
| `subject.sha256` | SHA-256 of the real `diagnostic-v2-fixture.json` (copy in this folder) | Yes — subject-hash check passes |
| `verification.testTranscriptSha256` | SHA-256 of the real `scan-v2-fixture-transcript.log` (copy in this folder) | Yes |
| `verification.sbomLiteSha256` | The diagnostic's real value | Yes |
| `verification.gatesPassed` | `["MANIFEST_REPRODUCIBILITY", "SECRET_SCAN", "RLS_GUARD", "SBOM_LITE_HYGIENE"]` | **NO — false** |
| `verification.gatesFailed` | `[]` | **NO — false** |

Ground truth, from the referenced diagnostic itself (`diagnostic-v2-fixture.json` → `gates`):

```json
{ "SECRET_SCAN": "fail", "RLS_GUARD": "fail", "SBOM_LITE_HYGIENE": "fail", "MANIFEST_REPRODUCIBILITY": "pass" }
```

Three of the four gates the envelope claims as **passed** are recorded as **failed** in the very
diagnostic the envelope points at. This is the commercially important fraud in its purest form:
not a forged signature, not a swapped file — a *trusted signer attesting a lie about the gates*.

## Expected outcome (per the corrected schema)

**REJECTED at the invariant step.** §2.4 I4: `gatesPassed` = the ids at PASS and `gatesFailed` =
the ids at FAIL, *derived* from the final-run record — an asserted partition that disagrees is
internally false. §2.6 T6/T7 cover the same class: a signed summary inconsistent with its detail
is rejected. Signature validity (§2.3 step 3) is necessary, never sufficient.

## Actual outcome — DEFECT FOUND

**The current verifier does NOT catch it. The false envelope verifies as PASS (exit 0).**

Run 1 — full check (envelope + referenced diagnostic + pinned policy),
raw output in `verify-false-gates-with-diagnostic.txt`:

```
subject hash check: diagnostic file matches subject.sha256
note: browser /verify inspector surface (pae-inspector.html) is UNTESTED — the CLI is the tested verification path.
VERIFY: PASS — signature valid AND signer is pinned in the trusted-signer policy (keyId c025de7a3a657887, attestationId att_semantic_rejection_fixture)
exit code: 0
```

Run 2 — envelope + pinned policy, no diagnostic supplied,
raw output in `verify-false-gates-no-diagnostic.txt`: **PASS, exit 0** (same wording).

Control — the genuine `pae-v2.json` under the identical Run-1 command,
raw output in `verify-control-genuine.txt`: **PASS, exit 0** — i.e. the verifier returns the
*same* verdict for the truthful envelope and for the lying one. It cannot tell them apart.

## Root cause (read from the source in this drop)

`verifier-v2.cjs` → `verifyEnvelope()` + `cmdVerify()` check exactly three things:

1. the Ed25519 signature over the canonical envelope,
2. whether the signer is in the pinned trusted-signer policy,
3. optionally, that `subject.sha256` matches a supplied diagnostic file.

No code path compares `verification.gatesPassed` / `verification.gatesFailed` against the
referenced diagnostic's `gates` object, and the CLI implements none of the §2.4 cross-field
invariants (I1–I8). The §2.4 invariant layer exists in the corrected schema as a *specification*;
it is **not implemented** in this prototype. That gap is precisely closure step 2's territory
(machine-readable schema + semantic validator rules — still OUTSTANDING, see PACK_MANIFEST.md).

## Disposition

- **Recorded as a defect against verifier-v2, not fixed in this pass** (per the assembly brief:
  report, do not repair). The second-run report's battery #10 ("gates forged to all-passed →
  INVALID") is **not** contradicted: that forgery was an *unsigned edit* to an existing envelope,
  which the signature correctly defeats. This fixture is the harder case the Guardian named —
  the false claims are *inside* a validly signed envelope from the pinned key itself.
- **Severity framing:** in the prototype's own terms this is a known-scope limit made concrete —
  the CLI proves *who signed* and *that the bytes are intact*; it does not yet prove *that what
  was signed is true*. No report from the captain has claimed otherwise, and this test now gives
  that limit a permanent, re-runnable fixture.
- **Reproduce:** `node verifier-v2.cjs verify --pae pae-v2-false-gates.json --diagnostic diagnostic-v2-fixture.json --pinned pinned-signers.json` from this folder (all inputs included; the signing private key is NOT included and is not needed to verify).

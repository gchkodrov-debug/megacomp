# BLIND VERIFIER VERDICT — Hospital Specimen Delivery (Guardian Sequence Step 4)

**Verifier seat:** independent blind verifier (this seat did NOT build, diagnose, or repair the specimen)
**Date of examination:** 2026-11-27
**Materials received and used:** `patient/` (frozen original) · `patient-repaired/` (repaired tree) · `delivery/passport.pae.json` · `sealed/DEFECT_MANIFEST.md` (opened at grading, as the grading seat) · the corrected `PDP_V1_CANONICAL_SCHEMA.md` · the pinned policy at `runs/second-run/pinned-signers.json` · `provadia-verifier-cli/verifier-v2.cjs` (run by this seat)
**Not read before this verdict was formed:** `HOSPITAL_SPECIMEN_REPORT.md`, all `work/` notes. (See appendix for the post-grade comparison.)
**Method:** every claim below was re-derived by this seat — hashes recomputed, both trees scanned with verifier-v2, the delivery's defect suite executed against both trees, the signature verified independently against the **pinned** key, and every defect graded from the two trees file by file.

---

## 1. Passport verification (§2.3, in order)

**Step 1 — Strict parse + schema: PASS.** The envelope parses as valid JSON; a duplicate-key scan found no duplicate object keys at any depth; `schema` = `provadia.passport.v1`; all mandatory fields present.

**Step 2 — Trust resolution: TRUSTED (policyVersion 1), with a policy-form defect recorded.** `signature.keyId` = `c025de7a3a657887` is present in the pinned `trustedSignerPubkeys` policy with `status: "active"`, and the envelope's `publicKey` is byte-identical to the pinned key — no substitution (fixture T2 does not arise). The policy was **not** delivered inside the package it vouches for. Two form gaps, recorded as NEEDS-CHECK against the policy record (not against this passport's outcome): the policy entry carries no `validFromUtc`/`validUntilUtc` window and the policy carries no `policyIssuedAtUtc`/freshness limit, so the "in-window" and freshness limbs of §2.3/§7.1 rest on the entry's `active` status alone — there is no window to be outside of, and no stated limit to be stale against. A production policy must carry both fields.

**Step 3 — Signature: VALID.** I reconstructed the §2.2 SignedManifest from the passport's own fields (`artifactSha256` = `subject.artifacts[0].sha256`, `testTranscriptSha256`, `sbomSha256`), canonicalized it per RFC 8785 (JCS), and verified the Ed25519 signature against the **pinned** key: **verifies TRUE**. Negative controls discriminate correctly: a one-character change to `sbomSha256` in the manifest fails verification; a random unrelated key fails verification.
*Tooling note (not a signature finding):* the house CLI's own `verify` path (`verifier-v2.cjs`) reports INVALID for this passport for a structural reason — it implements the older PAE-v1 whole-envelope verification and rejects the `provadia.passport.v1` schema string before cryptography. The PDP-v1 machine validator is closure step ② in the schema's §8 and does not exist yet; my verification above was performed directly against the corrected schema's §2.2/§2.3 contract. The CLI result is recorded here so nobody mistakes it for a signature failure — or for a signature pass.

**Step 4 — Artifact binding: PASS.** Recomputed SHA-256 + byte size for every entry in `subject.artifacts[]`:
- `repaired-tree-manifest.json` — `a5713767…` / 2926 bytes ✓ (= the SignedManifest `artifactSha256`)
- `patient-repaired/src/app/api/orders/route.ts` — `a4648114…` / 818 bytes ✓
- `patient-repaired/supabase/migrations/0002_orders_rls.sql` — `147f568b…` / 531 bytes ✓
The delivery's copy of the repaired tree is **byte-identical** to the top-level `patient-repaired/` tree I graded (`diff -r`: no differences). The intake binding also re-derives: my own verifier-v2 scan of `patient/` produces manifest `a5e46294…`, exactly `origin.inputs[0].sha256`; my scan of `patient-repaired/` produces `dc2021c6…`, exactly the manifest cited in the fix rounds and the MANIFEST_REPRODUCIBILITY check.

**Step 5 — Transcript / SBOM / evidence binding: PASS for package-resident evidence.** Recomputed: `delivery/transcript.txt` = `0a6d8d45…` ✓ · `delivery/sbom.json` = `2c43aff5…` ✓ (its 7 components match the repaired `package.json` exactly, versions pinned) · `delivery/THIRD-PARTY-LICENSES.txt` = `63ab3932…` ✓. The transcript is the *full* transcript: it also contains intermediate runs (an early 0/6 on the original and a 4/2 intermediate on the repaired tree) alongside the final runs the passport cites — nothing is concealed, and the cited final numbers reproduce exactly under my own execution (step 6 below).
Two qualifications: (a) the scan evidence behind the SECRET_SCAN / RLS_GUARD / SBOM_LITE check claims is cited to `work/diagnostic-repaired.json`, which is **not inside the delivery package** — I therefore graded those claims by re-execution (my own scans, §2 below) rather than by the cited file, and I did not independently confirm that file's cited hash; (b) `origin.sourceCommitOrRecipeHash` (`0604d91a…`) cannot be re-derived from anything in the delivery — a signed hash string alone does not verify it (§1.2), so that one provenance value grades **UNVERIFIED**.

**Step 6 — Test evidence re-executed.** I ran the delivery's own suite (`delivery/tests/defect-tests.cjs`) against both trees:
- Frozen original: **1 passed / 5 failed** — exactly the passport's `defect-tests@frozen-original` (1/5), exit 1.
- Repaired: **6 passed / 0 failed** — exactly the passport's `defect-tests@repaired` (6/0), exit 0.
- The baseline guard T6 passes on **both** trees — the clean controls were not damaged by the repair.

**Step 7 — Per-claim grading** is folded into §§2–3 below; there is no aggregate trust step.

## 2. Invariant outcomes (§2.4)

| Invariant | Outcome | Basis |
|---|---|---|
| **I1** zero-defect gating | **HOLDS** | `knownDefects` is empty (and true — §3), and the passport claims **neither** PASS **nor** PASS-AFTER-FIX; its verdict is UNVERIFIED. No successful verdict stands over any open defect or unknown required evidence. |
| **I2** typed-unknown ⇒ UNVERIFIED | **HOLDS — and it decides the verdict** | `origin.reproducibleRebuildSha256` carries the typed status object `{status: "UNVERIFIED", reason: …}` (no rebuild was run, honestly stated); `vulnerabilityPolicy` = `UNVERIFIED` (no CVE source exists). Either one caps the verdict at UNVERIFIED; the passport's verdict **is** UNVERIFIED. |
| **I3** rollup arithmetic | **HOLDS** | `testsPassed` 12 = 1+6+4+1 across the four suites; `testsFailed` 5 = 5+0+0+0. |
| **I4** final-run-only rollups | **DEVIATION — CONFIRMED (form)** | The headline rollups count the frozen-original baseline suite (1 passed / 5 failed) alongside the final-run suites. Corrected I4 reserves the rollups for the final run and history for `fixRounds[]`; the conforming final-run rollup is **11 passed / 0 failed**, with the baseline results recorded as history. The deviation does not inflate anything — it makes the headline look *worse*, the baseline numbers are fully visible in the bound transcript, and the verdict is independently capped by I2 — but it is a real non-conformance to fix in the passport template at the next revision. Under I4's deterministic rule applied to the final run (no final-run failure; required evidence unknown), **UNVERIFIED is the correct outcome**. |
| **I5** scan-fail / licence gating | **HOLDS** | `secretScan` = PASS (confirmed by my scan); `vulnerabilityPolicy` = UNVERIFIED, not FAIL; `copyleftViolations` = 0, and nothing licence-shaped is hidden in `scope.exclusions` (the exclusions list names untested legs, not violations). |
| **I6** examiner separation | **NOT MET inside the run — disclosed, consequence correctly applied** | Examiner `seatId` differs from every producer seat id ✓, but the examiner's `family` is the same single agent as the builder's — the passport states this itself (limitations item 3, and the `aiDisclosure` level string) and claims no independence. The verdict consequence (cap at UNVERIFIED) is already applied. Family-level independence was never inside this run; it belongs to the outer relay, exactly as the passport says. |
| **I7** fix-round binding | **HOLDS, with an id-namespace note** | All five fix rounds: `retestedBy` (`seat:hospital-regression-01`) ≠ `fixingSeatId` (`seat:hospital-repairer-01`) ✓, each bound to a defect id with patch ref + new evidence. Note: the passport's ids are **C1–C5** (the diagnostic stage's namespace, matching tests T1–T5) while the sealed manifest names the same defects **D1–D5**. The mapping is unambiguous — same order, same content, verified defect by defect in §3 — but a future passport should carry one namespace end-to-end. NEEDS-CHECK for the template, not a failure of this delivery. |
| **I8** clock order | **HOLDS** | `issuedAtUtc` (02:50:27Z) ≥ every seat `endedUtc` (the last ends at exactly that second); no reconstructed segments are claimed, and the limitations disclose the single-agent wall-clock basis. Seat spans sum to ≈5.25 min against `totalSeatMinutes: 5` — consistent at minute rounding. |

**Schema-form finding (A4), CONFIRMED:** `evidenceRef` values throughout the passport (security checks, test suites, gate verdicts, fix rounds, `aiDisclosure.disclosureEvidence`) are free-text strings, not the §1.2-mandated `{path, sha256, bytes}` objects. Where the strings embed a hash, the package-resident ones re-derived exactly (§1 step 5); the form is nevertheless not the locked form and must be corrected in the template.

## 3. Sealed-defect grades (my own, from the two trees)

The sealed list uses D-ids; the passport/tests use C-ids for the same five defects in the same order (C1↔D1 … C5↔D5).

| Defect | Grade | File-level evidence (mine) |
|---|---|---|
| **D1** leaked secret in client bundle | **FIXED** | Original: literal present at `patient/.env.local:5` (`NEXT_PUBLIC_PAYMENTS_KEY=sk_live_FAKE…`) and `patient/public/static/chunks/checkout-7f3a.js:3`. Repaired: `grep -r sk_live` over the whole repaired tree — **absent**; the `NEXT_PUBLIC_`-prefixed secret name is gone (only `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` remain — publishable by design, synthetic values); the rebuilt chunk and the checkout page hold only a publishable demo identifier; the payments key is now a server-only name with a redacted placeholder. My scanner run: both STRIPE_LIVE_KEY criticals gone. |
| **D2** unauthenticated mutation route | **FIXED** | Original `orders/route.ts`: service-role client, no session check anywhere, `user_id: body.userId`. Repaired: `await supabase.auth.getSession()` with a 401 return **before** the insert; anon-key client; `user_id: session.user.id`. Matches the sealed proof (profile-route pattern) exactly; scanner auth rule silent; test T2 reproduces. |
| **D3** missing RLS on `orders` | **FIXED** | Original `0001_init.sql`: `orders` created (line 32), never RLS-enabled, no policy. Repaired: `0001` untouched; new `0002_orders_rls.sql` enables RLS and adds owner-scoped select/insert/update policies on `auth.uid() = user_id`. Scanner RLS rule silent; test T3 reproduces. |
| **D4** unpinned dependency conflict | **FIXED** | Original `package.json`: `@supabase/ssr: "*"`, `@supabase/supabase-js: "latest"`, react 18.3.1 vs react-dom 17.0.2. Repaired: `@supabase/ssr 0.4.0`, `@supabase/supabase-js 2.45.4` (exact), react-dom aligned to 18.3.1; all 7 specs pinned (typescript `~5.5.0` stands as the sealed control K6 allows). Scanner dep rule silent; test T4 reproduces. |
| **D5** broken checkout transitions | **FIXED** | Original `lib/checkout.ts`: `cart: ['pending','paid']`, `paid: ['paid']`, `applyTransition` settles on any →paid with no receipt; route trusted `body.to`. Repaired: `cart: ['pending']`, `paid: []` (terminal in the table), `applyTransition` refuses `paid` outright, `confirmPayment` requires a receipt matching order id, status and amount, and is idempotent on an already-paid order; the route now takes server-driven actions (`begin`/`pay`), never a client-declared target state. Legal path cart → pending → paid intact. Test T5 reproduces. |
| Controls K1–K6 | **NO REGRESSION** | T6 passes on both trees under my own runs: profile route guard intact (awaited session, 401 before update, scoped to `session.user.id`); profiles/products RLS intact (`0001` byte-identical); checkout route auth aspect intact; legal transitions preserved; pinned control entries respected. |

**Diagnostic quality (for the record):** my scan of the original reproduces the sealed "scanner-visible" expectation exactly — D1 (2 locations), D2, D3, D4 (2 findings) — with D5 and the react/react-dom mismatch being the manual-only items, as the sealed manifest predicted.

## 4. New-flaw hunt (the blind gate's second half)

I scanned the repaired tree with verifier-v2 myself and read every file. **No new defect was introduced by the repair:**
- **Secrets:** 0 critical / 0 high. The only findings are 2 MEDIUM entropy observations on `.env.local` lines 3–4 — the Supabase URL token and the anon-key value. Both are `NEXT_PUBLIC_` publishable-by-design values with synthetic placeholders; my independent judgment concurs with the diagnostic's evaluation: **non-defects**. The service-role key remains only as a server-side env name (no `NEXT_PUBLIC_` prefix, no client import anywhere in the repaired tree — `config.ts` exports it, nothing client-side consumes it).
- **Unguarded mutations:** none. All three API routes in the repaired tree await a session check before any mutation.
- **Permissive policies:** none. No `USING (true)` policy exists in either tree; the new `orders` policies are owner-scoped.
- **Unpinned dependencies:** none. All 7 specs pinned; framework majors aligned.
- **All four verifier gates pass** on the repaired tree under my own run (SECRET_SCAN, RLS_GUARD, SBOM_LITE_HYGIENE, MANIFEST_REPRODUCIBILITY), manifest `dc2021c6…` stable.

**One observation (not a repair-introduced flaw, not a sealed defect):** the repaired checkout route authenticates the caller but does not check that the order being acted on belongs to the session user (`getOrder(body.orderId)` with no ownership comparison). This is equally true of the original — the repair neither introduced nor worsened it — and the sealed frame defines the checkout route's *auth aspect* (control K3: session awaited before any state change) as the control, which is intact. In a production review this would be raised as an IDOR finding; inside this specimen's sealed grading frame it is recorded as an observation for a future specimen, not graded against this delivery.

## 5. Overall verdict

**UNVERIFIED** — concurring with, and independently confirming, the verdict the passport issued for itself.

The defect record is complete and, on my own re-execution, exact: **5 of 5 sealed defects FIXED, 0 regressed, 0 still present, no new flaws introduced**, every fix independently retested by a seat other than the fixing seat, and the passport's cryptographic binding (pinned-key signature over the SignedManifest, package/transcript/SBOM digests) re-derives perfectly. On the defect evidence alone, this delivery would support PASS-AFTER-FIX at a future revision.

But both successful verdicts are barred today, for reasons the passport itself discloses and my examination confirms:
1. **Required evidence is unknown (I2):** no reproducible rebuild was run (`reproducibleRebuildSha256` = typed UNVERIFIED) and no vulnerability/CVE determination exists (`vulnerabilityPolicy` = UNVERIFIED — no CVE source in the sandbox; the SBOM is SBOM-lite). Unknown required evidence caps the verdict at UNVERIFIED.
2. **Examiner family independence is not met inside the run (I6):** one agent performed every seat in separated roles — disclosed in the passport's limitations and AI-disclosure, never claimed otherwise. Independence at family level belongs to the outer relay.
3. **Live legs were never exercised:** no install, runtime, or database ran (all tests are code-level); the AT-6 live-restore and AT-9 device legs are named exclusions in the passport's scope. Local evidence proves local facts only (never-claim 5).

**Signature outcome: VALID** (pinned key, policyVersion 1 — subject to the policy-form gaps in §1 step 2). **Passport-internal consistency:** the passport is honest — its verdict, limitations, and disclosures match what an unaided re-examination finds; the conformance defects I record against it are form-level (I4 rollup composition; string-form evidenceRefs; C/D id namespace) and are template corrections for the next revision, not evidence of a false claim. Nothing in this delivery claims a PASS it did not earn.

*Fences observed: $0, no network, no installs; the specimen trees and the passport were not modified.*


---

## Appendix — Comparison with the specimen report (read only after the verdict above was formed)

I read `HOSPITAL_SPECIMEN_REPORT.md` after writing §§1–5. Comparison:

**Agreements (their claims my independent re-examination confirms):**
- All five defects graded FIXED, none REGRESSED, none MISSED; recall 5/5, precision 5/5 — identical to my grades in §3, reached from the trees and my own tool runs.
- The frozen original is untouched: my scan re-derived the intake manifest `a5e46294…` (their AT-1).
- The passport's signature is VALID against the pinned policy, and its verdict UNVERIFIED is the correct cap (their AT-7; my §§1–2, §5).
- The two MEDIUM entropy observations were correctly dismissed as non-defects (my §4 concurs independently).
- The intermediate transcript runs I noted in §1 step 5 (an early 0/6 on the original, a 4/2 on the repaired tree) are explained and openly recorded in the report as the builder incident (a tooling-layer redaction mangled the first specimen build; rebuilt and re-frozen before diagnosis) and the harness incident (a trailing-comma bug in the test suite's own parser; fixed, both runs preserved). The final runs the passport cites are the ones I reproduced.
- AT-4 / AT-6 PARTIAL and AT-9 NOT RUN in the report match the passport's named exclusions and my §5 limits.

**Where my examination adds findings the report does not record:**
1. **I4 rollup form (my §2):** the headline `testsPassed/testsFailed` count the frozen-original baseline suite; the corrected schema reserves rollups for the final run. The report does not grade this; it is a template correction, not a false claim.
2. **EvidenceRef form (my §2, A4):** string-form evidence references instead of the locked `{path, sha256, bytes}` objects. Not graded in the report.
3. **Id namespace (my §2, I7 note):** passport/tests use C1–C5, the sealed manifest D1–D5. The report's own grade table performs the same C↔D mapping I did; neither document flags the split. One namespace end-to-end next time.
4. **Policy form (my §1 step 2):** the pinned policy record lacks validity-window and freshness fields (§7.1 shape). Not addressed in the report.
5. **CLI verify path (my §1 step 3):** the house verifier CLI reports INVALID on this passport for a structural reason (it implements the PAE-v1 envelope, not PDP-v1). The run's stage-4 verification used a dedicated script, not the CLI path; the gap belongs to closure step ② (machine validator) and is recorded in my verdict so the CLI result is never misread either way.
6. **`origin.sourceCommitOrRecipeHash`** is not re-derivable from the delivery and grades UNVERIFIED in my §1 step 5; the report is silent on it.
7. **Checkout-route ownership observation (my §4):** authentication without an order-ownership check — pre-existing in both trees, outside the sealed frame, recorded as an observation only. Not mentioned in the report; not graded against the delivery.

**One trivial clock note:** the report's stage-4 window runs to 02:50:47 while the passport's regression seat ends at its `issuedAtUtc` 02:50:27 — the report's stage includes post-issuance delivery assembly. I8 grades the passport's internal record, which holds; no invariant is touched.

**Net appendix judgment:** the specimen report is an honest document — its claims survive an unaided re-examination on every point where they overlap, including the two incidents it volunteers against itself. My additional findings are conformance-form and tooling items for the next revision of the passport template and the closure path, plus one out-of-frame observation. They do not change any grade in §§3–5.

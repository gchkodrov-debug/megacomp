# Specimen #502 — Contractor Field Estimator 1.0 — Evidence Packet

**Product:** Contractor Field Estimator 1.0 — offline-first, single-file web
app. A contractor prices a job from its real costs: materials, labour with
payroll burden, markup or a target margin, tax two ways, and a clean client
quote. Founder scope ruling (REQUIREMENTS.md §2): ESTIMATOR ONLY — the Gen 1
kit's bookkeeping suite is out of scope and absent.

**Status: MANUFACTURED, relay-verified, packaged, staged. NOT published**
(manufacturing/publication separation ruling, 2026-11-27 — all commercial
releases held until the founder authorizes launch).

## The package

- `ContractorFieldEstimator-1.0.zip` — **401,171 bytes**,
  sha256 `76d777373f134bb7328605385acdfbdf6239b8acae35c5da5d9e40910b26cbf0`
- App file inside: `Contractor Field Estimator.html` — **243,620 bytes**,
  sha256 `a1d17c4a1975f009d3cc374bb9a9840bfba248d900d39c8c7fb07a195a2a6b12`
  (byte-identical to the cold-rebuilt, walk-verified artifact)
- Contents: the app · README · INSTALL-GUIDE · LICENSE · CHANGELOG ·
  VERSION · THIRD-PARTY-LICENSES · MANIFEST.sha256 · 3 screenshots from
  the final build.

## Gates, as run

| Gate | Result |
|---|---|
| Test suite | **44/44 PASS** — engine golden fixtures · the RECONCILIATION.md oracle (Rivera $52,150.00 / $37,947.45 / 72.7660% · Nguyen $26,900.00 / $24,954.00 / 92.7658%) · **the named D-1 non-inheritance test** (dashboard total = $62,901.45 sum of gross profits, ≠ the defect value 1.655318) · Gen 1 import through the app's own path · storage round-trip + backup reminder · stranger UI walk · 9 relay regression tests |
| Cold rebuild (clean tree, `npm ci` → test → both builds → license-pack) | Green, twice (pre- and post-fix-round); logs in `evidence/` |
| Hygiene scrub | Zero external resources in the shipped file; the single `fetch(` occurrence is react-dom's internal preload helper — proven never invoked (network log below) |
| Chassis integration + stranger test (real Chromium) | Sample loads; editor shows $42,655.00 / $53,318.75 / 20.00% / burden $1,155.00; quote shows the total with **no** Burden/markup/Margin; 375px no overflow; **network log: exactly 1 request (the file itself), 0 external**; backup reminder fired live |
| Adversarial relay | Improver (deepseek-v4-pro) + critic (kimi-k3) + second critic (kimi-k2.6) → fix round → blind verifier (gemma4:31b) **VERIFIED**. Full findings + adjudications: `evidence/relay-fix-round.md` |
| Packaging & license attribution | license-pack OK (3 declared deps, all imported + allowlisted; 4 packages in the closure); THIRD-PARTY-LICENSES.txt in the package; MANIFEST.sha256 over all 10 files |
| Staging | Zip unzipped clean; **manifest 10/10 OK**; staged copy cold-opened in Chromium — exact figures, clean quote, both fix-round UI behaviours live, 1 request / 0 external |

## Defects

- **Open: none.**
- Found and fixed in the relay (each with a regression test): the margin
  solver returning $0.00/negative prices at target ≥ 100% (HIGH, found by
  all three seats) · null summaryAmount silently zeroing imported lines ·
  non-finite input hygiene · unrounded money outputs · margin masked as
  0.00% on a non-positive price · silent $0 tax when a mode is chosen with
  the rate blank (UI warning added) · blank CSV rows blocking Gen 1
  imports · roundMoney epsilon tightened 1e-9 → 1e-12.
- Rejected with cause (recorded in the relay file): summariseJobs as a
  scope violation (it is the founder-mandated D-1 non-inheritance test's
  subject, not a product feature) · qty default 1 (DESIGN §1 documents it)
  · wage-base caps (the register's flat treatment is explicit and shown in
  the app) · tax/markup asymmetry (FR-7 by design) · negative markup in
  the engine (honest below-cost pricing; the UI floors its fields at 0).

## Rules kept

- Every formula traces to app.spec.json + an ASSUMPTION_REGISTER ID
  (formula changes from the fix round were written back into app.spec.json
  in the same pass — spec and code in lockstep).
- UNSOURCED U1–U4 ship as user fields with NO preset — asserted by tests
  (fresh estimate's markup field is empty; default profile's SUTA and
  workers' comp are null).
- Specimen-501 untouched. Nothing published anywhere. The only spend was
  the Ollama bench (6 relay/verification calls, logged in BUILD_LOG.md).

## What remains

- Nothing for the build itself. Publication is a separate founder
  decision under the separation ruling.
- Maintenance: the assumption register's quarterly re-check falls due
  2027-02-27 (MAINTENANCE.md); the Gen 1 kit's own D-1 formula fix is
  written there as a maintenance note for the kit, out of this specimen's
  scope.

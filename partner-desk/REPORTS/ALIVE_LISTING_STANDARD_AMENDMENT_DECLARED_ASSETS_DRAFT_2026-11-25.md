# ALIVE LISTING STANDARD — PROPOSED AMENDMENT: DECLARED-ASSET COMPLETENESS (DRAFT)

**Status: DRAFT — written 2026-11-25 by the captain's investigation seat under the founder's order of 2026-11-25 ~07:14 CT. NOT adopted. Adoption requires the captain's ruling and Gemini's ratification, per the standard's own amendment discipline ("Amends by specimen record + captain's hand").**

**Born from:** the Mint D2 case (specimen T-001). The Mint's genome declared an inspect asset for stratum 05 — `assets/inspect-mint-mark.webp`, the real-artifact crop its caption promises — that was never published to the live site (HTTP 404 at its live URL, referenced nowhere in the page or its scripts). The defect was detected and recorded, yet the listing carried LISTING VERIFIED status with the defect open. Full root-cause record: the captain's investigation report of 2026-11-25.

---

## The general law (proposed, binds every gate in §6)

**A sweep of the assets a page references is necessary evidence, never sufficient evidence.** A page-reference sweep can only see what the page already loads; an asset the genome declares but the page never references is invisible to it — it returns no error, leaves no hole in the layout, and passes every reference-driven check while not existing for the customer. Likewise, a probe run against a local mirror or a local file tree certifies the mirror, not the town: an asset present on disk in a build tree is not thereby present at its live URL. **Declared is a promise; only the live origin keeps or breaks it.**

## New gate — §6(g) Declared-asset completeness

An Alive Listing counts as **LISTING VERIFIED** only when, in addition to §6(a)–(f), this gate passes. It is graded separately, like every §6 requirement: a fail here is a fail of the listing.

**(g) Declared-asset completeness.** Every asset declared anywhere in the product's genome/manifest — inspect assets, frame packs, stills, films, posters, and every other `src` the genome names, whether or not the page's HTML or scripts reference it — is present and displayed for the customer. *Check, all three legs, all against the production origin:*
1. **Live existence.** Every declared asset returns **HTTP 200 at its live URL** on the production origin. Local-tree existence, mirror probes, and staging copies are not evidence for this leg.
2. **Rendered display.** Every declared asset is confirmed **actually rendered** in the customer-eye pass, on **desktop and mobile**: for scroll- or interaction-summoned assets (inspect detents, staged imagery), the asset is summoned the way a visitor summons it and seen loaded and painted — not merely requested. A 200 that never reaches the screen does not pass this leg; neither does a layout that silently absorbs its absence.
3. **No known-open asset defect.** No declared-asset defect stands open against the product — at any severity — when the verdict is issued.

## The blocking rule (proposed addition to §7, Pipeline states)

**A known-open declared-asset defect BLOCKS the LISTING VERIFIED state and every state above it (including any READY-eligible designation) until the asset is fixed and legs 1–2 are re-probed live.** Severity labels do not soften this rule: a missing declared asset is not a residual, a cleanup item, or a polish bundle — it is the product missing a part its own genome promises. A defect may ride as a non-blocking residual only if it touches no declared asset. **Naming a cleanup crew does not discharge a blocking defect; only a commissioned fix, verified live, does.** A verdict issued while a declared-asset defect stands open is void on discovery and the listing returns to PRODUCT ASSEMBLED until the gate passes whole.

## Consequential tightening — §6(c) (proposed wording change)

§6(c)'s check today reads: *"every named deliverable in Block 6 traced to a real artifact on disk or a live record."* On-disk existence is the wording that let D2 ride: the Mint's inspect asset existed on disk — in the engine's demo tree — while never existing for a customer. Proposed: *"every named deliverable in Block 6 traced to a real artifact **live at its customer-facing URL and rendered per §6(g)**; on-disk existence alone does not satisfy this check."*

## What this amendment does not do

- It does not re-grade the Mint. T-001's status is the founder's and the captain's to restate under the corrected standard; this draft only prevents the next occurrence.
- It does not add any new build requirement — every asset it governs is one the product's own genome already declares.
- It does not retire reference sweeps or mirror probes; it demotes them to their true evidentiary rank: necessary, never sufficient.

*Draft ends. Proposed effective scope on adoption: every Alive Listing verification from adoption forward, town and store variants alike, and — by the captain's separate order, if given — a one-time declared-asset re-probe of every listing already carrying a verified state.*

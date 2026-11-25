# THE MINT — COMPLETE INSPECTION REPORT (captain, 2026-11-25)

**Scope:** the corrected live page https://provadiacoin.com/listings/mint.html — complete visual inspection (desktop executed; mobile UNVERIFIED, see §4), the D2 root-cause investigation, and the verification-standard correction. **Verdict under the Zero Known-Defect Rule: the Mint carries KNOWN OPEN DEFECTS and is NOT presented for founder approval.** READY count remains 0.

## §1 What passed (desktop, customer-eye, evidence from the live page)

- Hero press image renders; the scroll-presentation coin renders in every frame and changes as you scroll (whole → exploded → re-forming → face close-up).
- Gallery: all 5 images render, no broken icons.
- The assembly film plays end-to-end (probe: scrubber 0 → 15.79, button state play→pause→play; poster frame correct).
- Product information correct and readable: "The Mint — Full-Service Coin Creation" · $245 USD · $196 IN PROVADIA (20% OFF) · charged at completion only · handover test + 30-day support.
- The gate-closed state is correct in three places (hero, Terms, Step 4); no checkout/buy button exists; the only commission control opens an email scope request, no payment taken.
- The full Surfer journey runs: 8 layers in order, layer counter advances 01/08 → 08/08, captions fade, gallery lazy-loads; nothing blank, nothing stuck.
- Solnik is present, animated, follows the scroll; his sovereignty pill (Summon/Speak/Type/Mute/Dismiss/Disable) is present and enabled at every scroll position.

## §2 Known open defects (each blocks approval under the Zero Known-Defect Rule)

- **D-INSPECT (major): the Inspect experience does not exist on the live page.** The manifest declares an inspect asset for stratum 05 "The Mark" and the engine's design renders it in an Inspect overlay. The live page has NO Inspect control anywhere (no "Inspect" text/button in the DOM at any scroll position; clicking/hovering the coin and its hotspot opens nothing). The asset now exists live (D2 fixed) but **no visitor can ever see it in the experience** — declared-asset gate limb (ii), "visually confirmed within the actual customer experience," FAILS. The live page and the manifest describe different experiences; one of them must be made true.
- **D-BANNER: the concept-preview tape is clipped.** The Step 3 medallion's top tape reads "ONCEPT PREVIEW — NOT FINISHED ARTWORK · DOES NOT MINT OR DEPLO" — the leading C and final Y are cut off at the frame edges.
- **D-OVERLAP: Solnik's fixed figure covers body text** at many scroll positions — parts of "At a glance," the "What's inside" list, part of the Step 2 radio grid, the price paragraph, and the footer Privacy/Terms links at some positions.
- **D-OVERFLOW (minor): a few pixels of horizontal overflow** on desktop (scrollbar present; no content lost).
- **D-CAPTION (minor): the film caption says "About sixteen seconds"; the film is 0:15.**
- **D-LAYER5 (minor): the Layer 5 jump button is covered/not clickable from the top scroll position** (works once the presentation is in view) — likely the same overlap family as D-OVERLAP.
- **Observation (not graded):** Solnik's status text on the page read "My brain is napping — the captain has the note" during this inspection (cloud-browser context); whether a real visitor's browser reaches the live brain needs a real-device check before any claim is made either way.

## §3 Root cause (summary; full report filed separately)

D2 was detected by the 2026-11-24 specimen verification and graded PASS anyway; the standard had no blocking rule; one probe certified a local file instead of the live URL; "on disk" counted as proof. The same pattern explains D-INSPECT surviving: seats verified the page's own referenced assets and the manifest separately — nobody verified that what the manifest declares is reachable inside the live experience.

## §4 Mobile — UNVERIFIED

The inspection browser could not be resized to ~390px, so no mobile evidence exists. Under rule 6 this is UNVERIFIED, never PASS. Desktop evidence flags concrete mobile risks: the Solnik pill is ~460px wide on desktop (wider than a 390px viewport) and the banner tape already overflows its frame. A mobile pass (390px, full journey) is owed before the Mint can be presented.

## §5 The standard

The Zero Known-Defect Rule (founder's order 2026-11-25) is filed alongside this report; the Alive Listing Standard amendment (Declared-Asset Completeness gate §6(g) + §7 blocking rule + §6(c) fix) awaits Gemini's ratification.

## §6 What happens next (captain's commission)

Fix pass on the live page (D-INSPECT wiring or manifest truth-correction — the captain rules the page gains the Inspect experience the manifest promises, since the Surfer standard is the product's founding spec · D-BANNER · D-OVERLAP · D-OVERFLOW · D-CAPTION · D-LAYER5), then independent retest of every defect by a different seat, then the mobile pass — and only then is the Mint presented to the founder. This report, the root cause, and the amended standard are submitted for ChatGPT's independent challenge.

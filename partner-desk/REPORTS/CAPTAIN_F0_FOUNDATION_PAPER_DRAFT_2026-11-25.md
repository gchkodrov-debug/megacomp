# PROVADIA OS — F0 FOUNDATION PAPER (DRAFT)

**Status: DRAFT — for the captain's review and Gemini's challenge. This paper founds nothing by itself; it is architectural planning on paper only, under the founder's ruling of 2026-11-25 07:13 CT (FVR-29 founded; planning authorized, NOT full construction; $0 additional spending; no deployment, no transaction activation).**

**Authority:** FVR-29 register entry (binding terms) · the captain's investigation (Parts 1–6 + Appendix, 2026-11-25) · Gemini #116 (sustained whole; four sharpenings accepted by the captain) · the captain's reconciled recommendation (three seats converged, no unresolved disagreement between seats).

**Label law — every material claim carries one, as the house investigations do:**
- **SOURCED** — an external fact with its source named.
- **MEASURED** — a fact from the house's own record, inspected.
- **INFERENCE** — reasoning from stated evidence; the reasoning is shown.
- **HYPOTHESIS** — an unvalidated price, demand or market claim.
- **ESTIMATE** — crew-time arithmetic with its basis stated.

Where this paper must go beyond its sources to settle a contract (it is a settling document, not a summary), the step is labeled INFERENCE and listed again in §6 as a point for challenge.

---

# §1 — THE MODULE LAW

**The law in one sentence:** from FVR-29's founding forward, every institution of the civilization — door, instrument, service, workspace room — is specified as a **self-describing module** on the one shared foundation, or it is not built. No new monolith pages. (SOURCED to the founder's ruling: "one modular software foundation"; the captain's investigation, Part 4 Q1.1, names this "the single decision that decides whether the OS is an evolution or a rebuild.")

## 1.1 What a module must declare

Every module carries a manifest (the PALS-genome pattern; Gemini #116 names the working form `module.manifest.json`) declaring, at minimum:

| Field | What it declares | Source |
|---|---|---|
| **Identity** | A stable module ID, its institution's name, its FVR/Map anchor, its owner seat, and its version. A module is addressable and accountable by name. | Gemini #116 Commitment 1 (ID) + captain's investigation (manifest in the PALS-genome pattern) |
| **Routes** | The URL(s) it answers on — existing town geography only (§3.1: URLs never move), plus any service endpoints it exposes, spelled as routes. Route spellings beyond the live set are proposals until provisioned. | Gemini #116 (route) · captain's Mark 3 on #116 (route spellings `/v1/keeper` etc. are proposals, not live routes) |
| **Mount points** | Where the module attaches to the foundation: shell surfaces it may mount on, the shared furniture it consumes, and the bootstrap contract it mounts by. Solnik's per-door bootstrap (importmap + anchors + ~0.4 KB per page) is the measured prototype of this contract (MEASURED — captain's investigation §2.1). | Captain's investigation §2.1, §2.3 |
| **Data needs** | Its data contract: what it reads, what it writes, what is local-first on the citizen's device, what is server state, what is `no-store` — drawn against the Identity & Data Decision (§2). A module with no data map does not mount. | Captain's investigation Part 4 Q1.2, Q3.3 |
| **Offline class** | Exactly one of: **STATIC_CACHEABLE** (public content; renders offline as a dated copy) · **LOCAL_FIRST** (the citizen's own data and owned instruments; offline is their native state) · **LIVE_ONLY_FAIL_CLOSED** (truth is the network; offline the surface fails closed per §3.4). | Gemini #116 Commitment 1 (the three class names adopted verbatim) |
| **Budget class** | **Listing class** — the module ships on a listing surface and obeys the ≤18 KB gz PALS ceiling (§3.2); or **Workspace Shell class** — the module ships on a shell surface and is held to the Crew University bars (LCP ≤ 2.5 s, INP < 200 ms, CLS < 0.1). A module declares its class; it may not borrow the other class's budget. | Gemini #116 Commitment 1 (budget class) · captain's investigation §2.4.2 |
| **Security class** | Exactly one of the classes in §1.2, which fixes where the module may live, what it may touch, and what headers/auth it requires. | INFERENCE — synthesized in §1.2; flagged for challenge in §6 |

A manifest that omits a field is an incomplete specification, and an incomplete specification does not proceed to build. (INFERENCE from the Door Test, FVR-21: rooms pass fail-closed; the module law is that law restated for software — captain's investigation §1C/FVR-21.)

## 1.2 Security classes (settled here; synthesized from the sources' placement rules)

The sources fix the placement and custody rules but never name a class taxonomy. The taxonomy below is the smallest set that expresses every rule the sources already impose; it is labeled INFERENCE and stands first in the §6 challenge list.

- **SC-0 · PUBLIC DISPLAY.** No auth, no secrets, no chain writes, no private data. Lives on GitHub Pages. Examples: the town's doors as display, the public Record, the catalogue grid. (MEASURED as today's town shape — captain's investigation §2.1.)
- **SC-1 · PUBLIC INSTRUMENT.** No auth; computes or reads live public data; chain access **read-only and only through the Gatehouse**. Offline class is never STATIC_CACHEABLE for its live values — verdicts and telemetry are LIVE_ONLY_FAIL_CLOSED. Examples: the Verifier, the Fee Card, Coin telemetry, the Guardian Wallet Health Scanner if founded. (Captain's investigation §1B, §2.5.)
- **SC-2 · AUTHENTICATED.** Requires the members-service account (§2). Lives **only** on the VPS-served app origin under house-set CSP/HSTS; private records served `no-store`. Examples: My PROVADIA, the Agora's member functions, Genesis eligibility, a buyer's project state, Sentinel watchlists. (Captain's investigation §2.4.1, Part 4 Q1.2; Gemini #116 Commitment 3.)
- **SC-3 · CHAIN-ADJACENT.** Touches chain state beyond public reads — anchor record, claim flows, any flow approaching a broadcast. Lives only behind the Gatehouse pattern; inherits Lock → Sign → Persist → Broadcast → Verify unchanged; runs live or not at all. **No module in this class ever signs.** The only hands that sign are the citizen's own wallet and the founder's own hand. (MEASURED — the Gatehouse's existing constitution, captain's investigation §2.1, Part 4 Q7; FVR-15.)
- **There is no SC-4.** No class exists — and none may be created by a module manifest — in which a module holds key material, requests a signature on a citizen's behalf, or speaks RPC directly. A capability that would need such a class is not a module feature; it is a founder ruling or it does not happen. (INFERENCE, drawn directly from the never-do list, §1.4.)

## 1.3 How modules compose into the one foundation

1. **One foundation, many doors.** Modules mount on the shared foundation — shared versioned furniture (extracted from today's inlined copies incrementally, as doors are touched; no big-bang rewrite — captain's investigation Part 4 Q3.2; Gemini #116 §5), the shell on shell surfaces only, the members service for identity, the Gatehouse for chain. A module never brings its own foundation. (Founder's ruling: never separate systems per device.)
2. **Narrow seams.** Doors, instruments and services already meet at narrow seams (MEASURED — captain's investigation, Executive Summary Q2); the Module Law makes the seams contractual: a module consumes the foundation through its declared mount points and the services through their published contracts, nothing else.
3. **Independent failure.** A module fails **closed and visibly, alone**: its failure or invented data fails that module, rendered honestly (empty, dimmed, stale-stamped, or OFF WATCH), and never silently corrupts a neighbouring module or the shell. This is FVR-21's Door Test as a runtime rule. (Captain's investigation Part 4 Q1.1; §5.2 Article 5.)
4. **The factory convergence.** A Software Factory instrument and a town institution are the same species of object — manifest-described, locally-holding or thin-server, independently verified under the Eight-Gate Standard (captain's investigation Part 4 Q4; Gemini #116 sustained the convergence). Factory products are therefore modules by birth and are *delivered into* the workspace locker; town institutions are modules by this law. One discipline manufactures both. The Independence Principle and the Generator-Neutral Rule bind every module either origin produces.
5. **Soul is a composition rule, not decoration.** Modules compose geographically — the citizen goes *to* the Mint, not to a sidebar entry (captain's investigation §5.2, Articles 1–4; Gemini #116 §4). A composition that flattens institutions into interchangeable panels fails review even if every manifest field is present.

## 1.4 What a module may never do

A module may **never**:

1. Hold private keys, seed phrases, keystore files, wallet credentials of any kind, pre-signed or partially-signed transactions, or provider API keys. (Founder's ruling; captain's investigation Part 4 Q7 — the never-hold list is the Gatehouse's existing constitution generalized.)
2. Speak RPC directly, or reach the chain by any door other than the Gatehouse (or its successor under the same law). One door, so allowlists, rate limits and key custody exist in exactly one audited place. (Captain's investigation Part 4 Q7.)
3. Request, prepare, queue-for-later, or simulate a signature offline — or online on a citizen's behalf. (Captain's investigation §2.5.)
4. Present stale chain state as current, cache a verification verdict, or render any figure it cannot receipt. Nothing renders that is not receipted; where the choice is stale or silent, the Receipt Law prefers silent. (§2.5; §5.2 Article 5.)
5. Carry shell weight onto a listing surface, or load a framework bundle where the Listing budget class applies. (§2.4.2; Gemini #113's comparison as adopted there: a ≈272 KB generated bundle is ~15× the listing ceiling.)
6. Place private records in a share payload, or let private data cross into any public surface. Private records are structurally isolated from share payloads. (Map rule, promoted to foundation law — captain's investigation Part 4 Q1.2.)
7. Open a gate by existing. A module slot is not a till opening, a mainnet deployment, a swap desk, a SALT launch, or the founding of a PROPOSED entry (FVR-26, FVR-27). Gates open on founder rulings only. (Captain's investigation Part 4 Q7, governance risk; Part 6 non-authorizations.)
8. Simulate Solnik's intelligence offline, replay a cached conversation as a live answer, or fake any live state it does not hold. (§2.4.4, §2.5.)
9. Cross the two-house wall: no module merges OneJobKits into the town's account, checkout, or identity. FVR-05 stands absolute; the flagship bridge is the only store link. (Captain's investigation §1A/H-02; Gemini #116 walk, H-02.)
10. Resurrect a closed form. Engines closed under FVR-24 (DePIN operation, DEX/DeFi operation, oracle/bridge operation) gain no module slot; a slot's existence presumes nothing about PROPOSED entries. (Captain's investigation §1B.)

---

# §2 — THE IDENTITY & DATA DECISION

**The decision in one sentence:** one account across the civilization, served by the Hostinger members service as the town's single identity provider — the provider is an **interface, not a brand** — with customer working data **local-first** and the server holding only what must be shared, verified, or receipted. (Captain's investigation Part 4 Q1.2; FVR-25's "one account" is already binding law.)

**Measured starting state:** the members service is *designed, not live* — a CORS patch is staged, the members DB stands at 0, and `/account/` is architecture, not a page (MEASURED — captain's investigation §2.1). This section settles the **contract** the service, its consumers, and `/account/` will be built against. It builds nothing and deploys nothing — explicitly including the staged CORS patch (captain's investigation Part 6 non-authorizations).

## 2.1 The contract — parties and consumers

- **The provider:** the members service, hosted on the house VPS, is the single identity provider for the town. Every authenticated module (SC-2, SC-3) authenticates against this one contract — never against a module-local account system. (Part 4 Q1.2.)
- **The consumers, named now so the contract is written once for all of them:** the **Agora** (membership + registration — the service's first real job, MEASURED §1A/D-06), **My PROVADIA `/account/`** (the workspace), **Genesis eligibility** (eligibility is members-service state), **SALT** (later; an account ledger by nature — gated, not built). A fifth consumer class is anticipated by the civilization walk — authenticated service workspaces (Sentinel watchlists, buyer project state, Token Factory configuration state) — and the contract must not be shaped so narrowly that they force a second provider. (INFERENCE from §1A/§1B consumer rows.)
- **What the contract must settle on paper before any consumer builds** (the captain's Q3.1 list, adopted as this paper's checklist): the API shape; the session model; the CORS posture (the staged patch is deployed only against this settled contract, in F2's sequence, §5); and each consumer's data map drawn against §2.2–§2.3. Building registration first and the contract second is the one redesign the investigation begs the house to avoid. (Part 4 Q3.1.)
- **Vendor neutrality:** the contract is specified against the *interface* (accounts, sessions, entitlements, membership state), not against Hostinger's particulars. If the service ever fails the house, the contract survives the vendor — the Generator-Neutral Rule applied to identity. (Part 4 Q1.2(d).)

## 2.2 What the server holds — and only that

The server holds, exclusively:

1. **Entitlements** — what a citizen has purchased or been granted (locker contents, instrument ownership), so any device can honour them.
2. **Membership state** — the account itself, Agora membership, citizenship standing (permanent, non-transferable, never published — §1A/L-03), Genesis eligibility.
3. **Project and service state that must be shared or receipted** — a buyer's Mint project stages, a Sentinel watchlist and alert rules, commission scope/delivery state: state whose whole point is that the house and the citizen see the same record.
4. **What must be verified or receipted** — records that exist to be checked against (the anchor-adjacent records remain the Gatehouse's, not the members service's; the members service holds no chain authority).

If a datum is none of these four, it does not belong on the server. (Part 4 Q1.2(b): "the server holds only entitlements, membership, project state, and what must be verified or receipted.")

## 2.3 What stays local-first

- **Customer working data lives on the customer's machine by default** — the Profile S pattern: local storage (IndexedDB for records; the Software Factory chassis pattern), **exportable and erasable by the citizen**. Working files in the workspace are local in IndexedDB (Gemini #116, L-02). Drafts (e.g. the Keeper's Structured Proposal Builder) are the visitor's, on their machine, with zero auth, until the visitor chooses to submit. (Captain's investigation Part 4 Q1.2(a), §1A/D-07; Gemini #116 walk.)
- **Local-first is a blast-radius rule, not a convenience:** a members-service breach must never become a customer-data breach, because the working data was never there. (Captain's investigation Part 4 Q7, identity risk row.)
- Local data is the citizen's property in the Independence Principle's sense: owned instruments and their data keep working if every house server vanished; the server copy of an entitlement is a receipt, not a leash. (INFERENCE from the Independence Principle as carried in the investigation Part 4 Q6.)

## 2.4 The `/account/` surface's obligations

My PROVADIA (`/account/`) is the OS's centre of gravity — the 7-instrument sanctuary (citizenship · Genesis eligibility · wallet ownership · locker of purchased instruments · projects · record export · settings) (MEASURED as designed — captain's investigation §1A/L-02). As an SC-2 surface it owes:

1. **Placement:** served from the VPS app origin under house nginx — CSP, HSTS, and `Cache-Control: no-store` on private records (a header GitHub Pages literally cannot serve; MEASURED/SOURCED §2.4.1). It never ships on Pages.
2. **A data map before a build:** which instrument owns which record, what is local, what is server, what is `no-store` — drawn against this section before construction. Features without a data map is how private records end up in share payloads. (Part 4 Q3.3.)
3. **Separation of instruments:** citizenship, Genesis eligibility and wallet ownership stay *separated* instruments — a sale never moves citizenship (FVR-04). The workspace displays them side by side; it never merges their semantics. (§1A/L-02 fence.)
4. **Erasure with integrity:** deleting an account purges private PII while preserving anonymized ledger integrity (Map rule, §1A/L-02). The public Record is append-only; the private account is erasable; the contract must hold both at once.
5. **Fail-honest rendering:** the workspace renders only what it can receipt; an unreachable members service renders the workspace *unavailable*, never a cached impersonation of it (see §2.6).

## 2.5 Solnik's visitor memory — related, and kept separate

- **Measured state:** Solnik's brain (VPS service) keeps a **SQLite visitor memory** that persists across restarts — a visitor's remembered name is the measured example (captain's investigation §2.1, §1C/FVR-08+28). This memory exists today, independent of any account system.
- **The decision:** visitor memory and member identity are **two different stores with two different natures, and they stay separate.**
  - Visitor memory is *hospitality*: anonymous, device/visitor-scoped, held by the brain service to greet and guide. It is **not** an identity credential, confers **no** entitlement, and authenticates **nothing**.
  - Member identity is *citizenship*: the members-service account of §2.1–§2.2, the only thing that authenticates an SC-2/SC-3 surface.
  - The two may *meet* — a signed-in citizen may be greeted by name with context Solnik legitimately holds — but neither may silently become the other: no visitor memory graduates into an account, no account is inferred from remembered conversation, and Solnik never treats remembered detail as proof of identity for any authenticated purpose. (INFERENCE — the sources establish the two stores and Solnik's fences; the non-merger rule is this paper's settlement of their relation, flagged in §6.)
- **Solnik's constitutional fences ride unchanged:** guidance and conversation only — no payments, no identity documents, no wallet signatures, ever; consciousness never claimed; summon/mute/dismiss/disable on every surface, including inside the installed app. (§1C/FVR-08+28.)

## 2.6 Failure modes (settled behaviour, not discovered behaviour)

| Failure | Settled behaviour | Source |
|---|---|---|
| Members service unreachable | Authenticated surfaces render *unavailable*, honestly; the public town (Pages) is unaffected and remains the civilization's face. The civilization degrades to its public face, never to a blank page. | Captain's investigation Part 4 Q7 (VPS concentration row) |
| Session/auth failure at a consumer | Fail closed for that surface: no cached entitlement is honoured, no private record renders from cache (`no-store` makes this structural, not procedural). | §2.5 offline line applied to auth; Part 4 Q7 |
| Members service compromised | Blast radius bounded by §2.2/§2.3: entitlements and membership state are exposed at worst; customer working data is not there to take. Contract-level consequence: provider is swappable (§2.1) without rewriting consumers. | Part 4 Q7 (identity risk row) |
| VPS down entirely | Gatehouse, brain, members, workspace APIs down together (single KVM — §4); Pages town survives in display mode; Solnik renders asleep/OFF WATCH honestly. | Part 4 Q7; §2.4.4 |
| Contract dispute between consumers (two modules disagree on identity semantics) | The contract in this section governs; a module may not fork the semantics locally. Disputes return to this paper for amendment, not to per-module improvisation. | INFERENCE from Q1.2's "settled on paper" purpose |

---

# §3 — ROUTE & SHELL DISCIPLINE, WITH THE OFFLINE LINE

## 3.1 Routes: URLs never move

Doors keep their URLs — the town's addresses are its geography and its search equity. The OS grows *behind* the existing addresses; no door moves, ever. (Captain's investigation Part 4 Q1.3(a).) New surfaces are added at new addresses (the app origin, §3.3); existing addresses are never repurposed. A route spelling that is not live today is a proposal, however natural it looks (captain's Mark 3 on #116).

## 3.2 Shell discipline: listings never carry shell weight

1. **The shell exists only on shell surfaces** — entry, workspace, instrument decks: surfaces where an application shell is the *point* of the page. (Part 4 Q1.3(b).)
2. **Listings never carry it.** Listing pages keep their lean runtime and never load the shell or any framework; the **≤18 KB gz PALS budget stands** where it stands (Gemini #116 budget class: Listing ≤ 18 KB gz vs Workspace Shell). The measured warning stands behind the rule: a generated React-class bundle (≈272 KB, MEASURED in the Software Factory record) is ~15× the ceiling. (Investigation §2.4.2.)
3. **Shell surfaces are held to the Crew University bars** — LCP ≤ 2.5 s, INP < 200 ms, CLS < 0.1 — and module payloads are not shell weight: Solnik's GLB bodies (MEASURED: 1,011,884 B desktop / 565,048 B mobile) load per door as module payloads. Gemini #116's proposed body ceilings (≤3.2 MB desktop / ≤1.8 MB mobile) are carried as **proposed budgets, not measurements** (captain's Mark 2 on #116) and are listed in §6 for ratification.
4. **Install is an enhancement, never a gate.** Every OS function must work in a plain browser tab or it does not ship; iOS gives no install prompt and historically thinner storage guarantees (SOURCED — investigation §2.2, §2.4.6), so the browser tab is the canonical surface and installation its frame.

## 3.3 The service-worker constitution

The service worker is the one artifact in this architecture that **persists on other people's machines**; its constitution is therefore written and founder-visible *before* the first SW ships (Part 4 Q1.3(c)), and the SW is treated as a release artifact under the Relay (critic + blind verifier) like any security surface (Part 4 Q7).

1. **Placement — the settled scope rule (Gemini's sharpening, accepted whole):** GitHub Pages stays **100% service-worker-free** — a pure static display layer. The service worker lives **only on the VPS-served app origin**, where house nginx sets CSP, HSTS, and `Service-Worker-Allowed`. No root-scope SW on the Pages origin, not even with bypass rules: on an origin without CSP, a root-scope SW intercepts `/anchor/` and the listings and buys static pages nothing at durable risk. (Gemini #116 Disagreement 1, accepted; captain's adjudication.)
   - *Open spelling:* Gemini offers the app origin as `app.provadiacoin.com` **or** an `/app/` subpath reverse-proxied through VPS nginx. Both are **proposals, not provisioned** (captain's Mark 2). The choice between them is an F1 implementation decision for the captain under this constitution, listed in §6 — the constitution binds either way: one SW, one scope, VPS-served, header-controlled.
2. **Minimal by construction:** the SW is a hand-written route table + cache rules, no libraries, same-origin only, versioned. A constitution-bound SW is a few KB (investigation §2.4.2). Zero third-party scripts within SW scope.
3. **Cache classes follow offline classes (§1.1):** cache-first only for fingerprinted static assets; network-first for HTML (Pages' forced `max-age=600` already bounds document freshness — the SW must never make HTML *staler*); STATIC_CACHEABLE content cached as dated copies; LOCAL_FIRST data is the citizen's own stores (IndexedDB), not the SW's cache; LIVE_ONLY_FAIL_CLOSED routes are **never** cached as truth.
4. **Bypass rules are constitutional, not configurational:** the SW never intercepts the Gatehouse endpoints, the Solnik brain endpoints, `/anchor/`, or any private record (`no-store` surfaces are bypassed by rule). (Investigation §2.4.3; Gemini #116 Commitment 3.)
5. **Update discipline:** versioned caches; an update path that never strands a citizen on a dead shell — the SW lifecycle's waiting/activation trap is a named, designed-against failure (investigation §2.4.3); Gemini's form (skipWaiting + a version banner) is the proposed mechanism, adopted subject to F1 verification (§6).

## 3.4 THE OFFLINE LINE (verbatim — the founder's binding security requirement)

*Offline capability is granted to exactly the things that are already true without the network, and refused to everything whose truth is the network.* (Captain's investigation §2.5, carried verbatim in substance; Gemini #116 sustained it verbatim in substance.)

**MAY be cached / available offline:**

- Public town content: pages, posters, public Record entries — **each carrying the date it was fetched**, rendered as a copy, not as the living page.
- Owned Gen 2 instruments (Profile S bundles) and the customer's own local data (IndexedDB records, scenarios, exports) — zero-call by contract; offline is their native state.
- Solnik's **body** (GLB + engine) — he may be visibly present and asleep.
- Previously fetched reports (Sentinel dossiers, Fee Cards, Verifier outputs) — rendered as **dated documents**: "this report was true at [time]; it is not a live answer."

**Must NEVER be trusted offline — the surface fails CLOSED toward the Gatehouse:**

- **Signing and anything adjacent to it.** No signature is ever requested, prepared for later, or simulated offline. The anchor flow's order (Lock → Sign → Persist → Broadcast → Verify) runs live or not at all; an offline `/anchor/` renders its state as *unknown*, full stop.
- **The Gatehouse anchor record and any Gatehouse state.** Read live from the server or not read. A cached copy of the record is precisely the duplicate-broadcast hazard Amendment 7 exists to kill.
- **Balances, holdings, holder counts, prices and telemetry presented as current.** Offline they render with an as-of stamp and the word *stale* — or they render as nothing (the Receipt Law prefers nothing).
- **Verification verdicts.** The Verifier re-derives from live sources; an offline "verified" badge is a counterfeit of the house's core product and is forbidden by design, not by policy.
- **Quotes, till state and entitlement checks.** These resolve against live server state; offline, a purchase action becomes a clearly-labeled *intent* that executes only after a live round-trip — or is simply unavailable, stated plainly.
- **Solnik's answers.** No cached conversation is ever replayed as if it were live intelligence; offline he is present and asleep, and says so if asked.

**The one-sentence form, adopted as house law by the investigation:** *Offline is for what the citizen owns and what the town has already published; everything the chain must vouch for is live or it is silent.*

**The never-hold corollary (founder's ruling, verbatim in substance):** an installable PROVADIA **never holds keys, seeds, keystores, pre-signed transactions, or provider secrets** — nor private keys, keystore files, wallet credentials of any kind, partially-signed transactions, the anchor record's authority, or any citizen PII beyond what the members contract names. The installed app is a window and a workbench; the only hands that ever sign are the citizen's own wallet and the founder's own hand. (Investigation Part 4 Q7.)

---

# §4 — INFRASTRUCTURE GUARDRAILS

## 4.1 The single KVM and its quotas (Gemini's sharpening, accepted whole)

**Measured state:** one small KVM (srv2183584, KVM 1 class) already carries the Gatehouse and Solnik's brain; the members service and workspace APIs will join it (captain's investigation §2.1, Executive Summary). Treating that concentration as a passive "watch item" is rejected (Gemini #116 Disagreement 2, accepted). The guardrail:

1. **systemd CPU/Memory quotas** (`CPUQuota=`, `MemoryMax=`) are set on the Solnik brain service and on the workspace API services, so that a TTS synthesis spike or a login surge cannot starve the chain door. (Gemini #116 counter-rule, adopted in the reconciled recommendation.)
2. **The Gatehouse (localhost:8740, behind nginx at rpc.provadiacoin.com) holds guaranteed priority** — its resources are reserved first; every other VPS service is quota'd around it. Gatehouse and wallet security take absolute priority (founder's ruling). (MEASURED: the Gatehouse is a zero-dependency Node service, 868 lines, bound to localhost:8740 — investigation §2.1.)
3. **Degradation is designed, not discovered:** if the VPS fails or is saturated, the Pages town survives in display mode (§2.6); services fail closed or render asleep; nothing degrades into presenting stale state as live. VPS capacity remains a named watch item — an upgrade is priced only when commercial load demands it, never assumed into the prototype. Auto-renew is ON and the current term expires 2026-12-20 (MEASURED — investigation Part 4 Q7).

## 4.2 The placement split

1. **GitHub Pages stays the public display layer** — the town's doors, listings, films and public Record, exactly as today (a main commit is the publish; MEASURED §2.1). Pages serves **no** authenticated surface and **no** service worker (§3.3), because Pages cannot set response headers: no CSP, no HSTS, no `Service-Worker-Allowed`, a forced `Cache-Control: max-age=600`, `_headers` ignored (SOURCED — investigation §2.4.1).
2. **The authenticated surface lives on the VPS**, where house nginx already terminates TLS for the `rpc.` and `brain.` subdomains and can set the full header set — CSP, HSTS, `Cache-Control: no-store` on private records. The split costs $0 and one nginx server block; both halves are existing infrastructure. (Investigation §2.4.1(c), §2.6.)
3. **Cache control lives in the service worker** on the app origin (the Cache API is client-side and fully in our control — the standard workaround for Pages' header poverty, SOURCED §2.4.1) — and nowhere else pretends to exist.
4. **Secrets live server-side or nowhere:** provider keys in the Gatehouse's environment files; no secret of any kind in a page, a module, a manifest, or a service worker. (§1.4.1; investigation §2.1.)

---

# §5 — SEQUENCE + BUDGET

## 5.1 The sequence

| Stage | Content | Gate |
|---|---|---|
| **F0 — Foundation paper** | This paper: Module Law · Identity & Data Decision · Route & Shell Discipline with the Offline Line · infrastructure guardrails. Challenged by Gemini, reviewed by the captain, visible to the founder. | **This draft.** F0 completes on the challenge round, not on construction. |
| **F1 — Installable town** | Manifest + icons from existing coin art · the service worker under §3.3's constitution, on the VPS app origin only · the offline surface in the town's own dress · the placement split (workspace shell host on VPS nginx) · customer-eye verification on desktop + Android + iOS paths. | Requires its own founder-visible go-ahead under FVR-29's planning authorization; nothing in F0 builds F1. |
| **F2 — Identity live + workspace** | Members-service contract implemented; staged CORS patch deployed *against the settled contract* (§2.1) · registration · `/account/` shell mounted, its instruments staged behind their own gates · the full multi-room workspace. | **Demand-gated (see §5.3).** |

F3 (first commercial modules — Sentinel's workspace first per the FVR-24 sequence, the Keeper builder, the Verifier, factory instruments into the locker) proceeds inside those programs' own budgets and gates, not as an OS surcharge (captain's investigation Part 4 Q5). Wrappers (Tauri/Capacitor) exist only if store presence is ever ruled; native is rejected, not deferred (Part 3).

## 5.2 The budget

- **Planning budget: 8–14 crew-days across F0–F2, $0 cash** (ESTIMATE — the reconciled figure: the captain's stage estimates were F0 ~1–2, F1 ~2–4, F2 ~3–6 crew-days; Gemini's Disagreement 3, accepted whole, corrects the total upward to 8–14 to carry cross-browser PWA and offline-security QA — iOS storage eviction, SW lifecycle transitions, CSP tuning against Three.js/WebAssembly — which routinely adds 50–100% QA time. All figures remain ESTIMATES, labeled as such wherever they travel.)
- **Money: $0.** No new subscriptions at any stage. The named exceptions stand **outside** the prototype and each needs its own founder ruling: app-store presence (Apple $99/yr + Google Play $25 one-time, SOURCED) · Windows code-signing (market-priced; the captain deliberately left it unquoted; Gemini's ~$200–$400/yr is an INFERRED estimate, not a sourced price — captain's Mark 2) · future VPS capacity (watch item, §4.1.3). (Reconciled recommendation §3; investigation §2.6.)

## 5.3 The demand gate on F2

F0 proceeds now — the paper is cheap and every later room conforms to it. **F2's full multi-room workspace construction is gated behind #501's completed Eight-Gate verification packet plus initial buyer validation** (Gemini #116 Disagreement 4, accepted; reconciled recommendation §7). The reasoning is stated bluntly, as Gemini stated it: house revenue is $0 and Sentinel's buyer interviews stand at 0/15 (MEASURED — investigation Part 4 Q6); the OS must not become an architectural distraction ahead of the first proof that an external customer will pay.

*Reconciliation note (INFERENCE, flagged in §6):* the captain's stage table names F2 "Identity live" (members service + `/account/` shell), while Gemini's gate and the reconciled recommendation speak of F2 as the full multi-room workspace. This paper reads them as one stage with an internal order — identity goes live first, the shell mounts with instruments staged behind their own gates, and it is the **full workspace construction** that the demand gate binds. Identity's *paper* (§2) is F0 and is not gated; identity's *build* sits inside F2's sequence and displaces no standing priority (investigation Part 4 Q2: the foundation consumes slack and spec-time first).

## 5.4 What continues uninterrupted

Everything standing, per the founder's priority table: the Gatehouse/anchor clearance sequence · the film conveyor and Alive Listing replication · the #501 specimen under its authorization and fences · the store conveyor · Solnik's Phase-2 queue · every founder-gated item in its gate. A module slot is not a gate; this paper opens none. (Investigation Part 4 Q2; reconciled recommendation, "What this does not authorize.")

---

# §6 — OPEN POINTS: WHERE THE SOURCES DISAGREED OR LEFT A QUESTION

For the captain's review and Gemini's challenge. Nothing here blocks F0's adoption as a draft; each item names who must settle it.

1. **Security-class taxonomy (§1.2) is this paper's synthesis (INFERENCE).** The sources impose every rule the classes express but never name classes. *Settle: captain + Gemini challenge; founder-visible.*
2. **F2's scope (§5.3).** The captain's "Identity live" vs Gemini's "full multi-room workspace" — reconciled here as one stage, internally ordered, with the demand gate binding full workspace construction. *Settle: captain confirms the reading; if the seats meant different stages, the stage table is re-cut before F1.*
3. **App origin spelling (§3.3.1).** `app.provadiacoin.com` vs an `/app/` subpath — both proposals, neither provisioned. The constitution binds either way. *Settle: captain, at F1, under this constitution.*
4. **Solnik visitor memory ↔ member identity (§2.5).** The sources establish both stores and Solnik's fences; the explicit non-merger rule is this paper's settlement. *Settle: captain + Gemini challenge.*
5. **Solnik body budget ceilings.** Gemini's ≤3.2 MB desktop / ≤1.8 MB mobile are proposed budgets; the measured bodies are 1,011,884 B / 565,048 B. *Settle: ratify ceilings or replace with measured-plus-headroom figures at F1.*
6. **SW update mechanism (§3.3.5).** Gemini's skipWaiting + version banner is adopted as the proposed mechanism; the captain's text requires only that the update path never strand a citizen. *Settle: verified at F1, not assumed.*
7. **Brain service port.** Gemini names the brain at :8750; the captain's Mark 2 records the port as a proposal, not provisioned fact. This paper refers to the service by name (`provadia-solnik-brain`) and takes no position on the port. *Settle: measured check before any F-stage document cites it.*
8. **Questions the founder must decide (not this paper's to settle):** the DAO placement fork (captain A vs Gemini B) remains open — the module slot exists either way and F0 presumes nothing (investigation §1B/8); Sentinel's and Token Factory's prices remain HYPOTHESES awaiting founder rulings and buyer evidence; wrapper/store presence and any costed exception require their own rulings if ever pursued. FVR-26 (Guardian) and FVR-27 (Citizenship) remain PROPOSED — F0 grants them no presumption, only a discipline they would be built under if founded.

---

*— F0 Foundation Paper, DRAFT, 2026-11-25. Written under FVR-29's planning authorization: paper only — no construction, no code, no deployment, $0 spent. Next seats: the captain's review, then Gemini's challenge; amendments return to this document, not to side agreements.*

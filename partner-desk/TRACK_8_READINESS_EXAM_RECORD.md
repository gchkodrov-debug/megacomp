# TRACK 8 — READINESS EXAM RECORD

**Exam:** The Elite Website Reverse-Engineering & Readiness Exam
(`TRACK_8_READINESS_EXAM_2026-11-23.md`) — study the eight benchmarks,
map the crew's capability against them, prove skill in isolated
exercises, submit to blind grading. Training and capability
verification only; the exam's §7 production restriction held
throughout — no production work, no live-site contact, no AI
generation.

**Run:** dispatched 2026-11-23 ~11:47 CT on the founder's start word.

**Working files:** `track8-readiness/` (inspection/ · study/ ·
capability_map.md · exercises/ · review/).

---

## THE SEAM — TWO RUNS, ONE RECORD

*Per the principle from the founder's desk: the first runner's
failure does not invalidate its work. This record preserves run 1's
evidence exactly as it stands, states plainly what was missing when
that run ended, and does not pretend the original run succeeded.
Until this signed record landed, Track 8's official status was
**INCOMPLETE — NOT YET CLASSIFIED**.*

**What run 1 produced (preserved, not redone):** the eight benchmark
inspections; the four study files; the capability map; the
independent map critique (C1–C21); exercises E1–E3 complete through
their improver passes; E4's builder artifact; and the assembled
final-critic packet (`review/critic_input.md`).

**Where run 1 stopped:** E4's improver leg never landed — two
improver calls returned empty (`improver.md` 0 bytes, both error
logs empty) — and the chief critic's final blind classification was
never obtained. The exam had evidence but no verdict.

**What the finishing run completed:** fresh execution of all four
exercise assert suites against the on-disk artifacts (E1 5/5 ·
E2 9/9 · E3 7/7 · E4 6/6); E4's improver pass, re-run with
deepseek-v4-pro:0813 on run 1's own improver input (3 findings,
fixes applied, re-execution 6/6, pre-improver artifact preserved);
the critic packet completed with the executed results and the
failed-calls ledger; and the chief critic's final blind
classification (kimi-k3), which is §5 of this record. Nothing from
run 1 was rewritten to make the seam disappear.

---

## 1 · THE STUDY — FINDINGS PER BENCHMARK (§1)

Method: the coordinator fetched each benchmark's publicly served
page and headers; study seats worked from those observed facts only.
Every substantive claim in the study files carries its evidence
class — **[OBSERVED]** (present in the fetched facts), **[REPORTED]**
(public documentation / widely published knowledge), **[HYPOTHESIS]**
(inference, with what would verify it), or **NOT ASSESSABLE** (the
honest blind spot). Full text: `track8-readiness/study/study_A–D*.md`.

### Lamborghini — lamborghini.com
- **Verified [OBSERVED]:** Next.js application (SSG manifests,
  catch-all route `pages/[…slug]`); ~450 KB client-rendered shell
  with minimal inline content (3 images, no video/canvas in served
  HTML); self-hosted "LamboType" typeface + icon font locked by CSP
  `font-src 'self'`; video delivered via the Meride platform
  (medialamborghini.meride.tv) over Akamai/Varnish edge; strict CSP
  with `object-src 'none'`, restricted `frame-ancestors`, and a
  `report-uri` endpoint; frame-src exposes an AI assistant, Flipsnack
  brochures, and a Salesforce owners' club; OneTrust/GTM/GA/Baidu +
  Dynatrace/New Relic RUM present.
- **Hypotheses (labelled, unverified):** ISR in use; configurator
  instantiates WebGL at runtime; hero reels injected post-hydration.
- **NOT ASSESSABLE from the fetched evidence:** scroll behaviour,
  mobile layout, accessibility state, runtime animation.

### Bentley — bentleymotors.com
- **Verified [OBSERVED]:** the fetch met one of the segment's harder
  Akamai bot walls — the study's Bentley section carries **23
  NOT-ASSESSABLE lines**, which are the honest boundary of this
  benchmark's evidence. What stands: a VW Group AEM operation;
  structured editorial content model (cars as CMS records —
  name/description/published-date); locale-keyed `.html` route
  fingerprint shared with Rolls-Royce; configurator as centrepiece
  product inside editorial context.
- **Reported:** heritage/futures dual narrative (1919 handcraft vs
  Beyond100) as information architecture; serif-led typographic
  luxury over large editorial photography.
- **Blind spot, stated by the study itself:** everything below the
  wall — served HTML/JS, animation, fonts, image pipeline,
  configurator rendering, performance, accessibility.

### Rolls-Royce — rolls-roycemotorcars.com
- **Verified [OBSERVED]:** concierge commerce — the Boutique builds
  a "List" submitted to a dealer; no direct checkout exists; no
  published prices ("depend on specification — contact your
  dealer"); the "My Rolls-Royce" portal is application-only, with
  unmatched requests declined by human matching; brochures are
  digital-only inside model pages; careers route to bmwgroup.jobs;
  pre-2003 heritage is handled with Bentley (the 2003 marque split
  made visible as a content seam); locale-keyed `.html` routes
  consistent with an AEM-family build; **no edge bot wall was
  encountered** — the opposite posture from Bentley.
- **Reported:** gallery art direction — vast whitespace, slow fades,
  light widely-tracked sans; Bespoke configurational storytelling.
- **NOT ASSESSABLE:** portal interior, configurator rendering,
  motion implementation, fonts/assets, performance, accessibility.

### Mercedes-Benz — mercedes-benz.com
- **Verified [OBSERVED]:** Akamai bot mitigation **refused the
  scripted fetch** — served HTML/JS/CSS were never inspected; the
  evidence is the public CSP and headers. The CSP allowlist is
  scoped to AEM, consent, video, 3D tours, RUM, and tag management;
  strict frame/HSTS headers; multi-CDN delivery.
- **Reported:** hub-and-spoke brand architecture (cars,
  configurator, test drive, museum, corporate as specialised
  properties); heavy video heroes with embedded players (Plyr,
  YouTube); Matterport 3D space tours.
- **Blind spot:** layout systems, animation libraries, accessibility
  implementation, performance budgets, AEM component internals.

### SpaceX — spacex.com
- **Verified [OBSERVED]:** ~3 KB SPA shell with Angular-CLI-style
  hashed bundles (`runtime/polyfills/vendor/main.*.js`,
  `environment.js`) and `<base href="/">`; CSP reveals Strapi
  headless CMS (`content.spacex.com`, `analytics.strapi.io`),
  `api.spacex.com`, hCaptcha + Cloudflare Turnstile, and Cloudflare
  Workers form endpoints; self-hosted D-DIN typeface
  (`font-src 'self' data:`); Cloudflare `cf-cache-status HIT` +
  Azure edge; hashed filenames enabling long-term caching.
- **Reported:** full-bleed launch photography/video heroes, minimal
  chrome, scroll-revealed mission sections, livestream pages.
- **NOT ASSESSABLE:** rendered DOM, 2D/3D graphics usage,
  accessibility, responsive behaviour — all inside hashed bundles.

### Apple — apple.com
- **Verified [OBSERVED]:** no framework markers — hand-built,
  versioned modules (`main.built.js`, `homepage.built.js`,
  `inline-media.built.js`); global header/footer fetched from
  separate versioned endpoints; **98 `<img>` and 98 `<picture>`
  elements** on the homepage, every image with responsive
  srcset/picture sourcing; one native video element; seasonal
  campaign module (`holiday2026.built.js`); assets via Akamai with
  HSTS preload; HTML Cache-Control `max-age=170` (short edge TTL)
  while global components are versioned and cached; locale switcher
  present.
- **Reported:** SF Pro type system; scroll-scrubbed image sequences
  and pinned scenes as the product-page storytelling reference;
  industry-reference accessibility program.
- **NOT ASSESSABLE from homepage evidence:** WebGL use, alt-text
  status, the custom scroll engine's internals.

### Solana — solana.com
- **Verified [OBSERVED]:** the fetch only ever saw the platform's
  **bot checkpoint page** — production HTML/CSS/JS internals were
  never inspected, and the study says so. From the accessible
  surface: Next.js on Vercel with `/_next/image` optimization (WebP,
  widths to 3840, q=75); audience-segmented modules on one marketing
  spine with a separate developer-docs domain.
- **Reported (the study flags this as its weakest evidence class):**
  metrics-as-hero — live network counters where every figure is a
  hyperlink to a source and reporting period; trust-escalation
  section order (claim → live proof → community → institutional
  logos → news → named builders); gradient art direction.
- **NOT ASSESSABLE:** typography, motion, WebGL, scroll behaviour,
  responsive breakpoints, accessibility, real performance numbers.

### Bitcoin.com — bitcoin.com
- **Verified [OBSERVED]:** the richest header evidence of the eight.
  Next.js + Turbopack on Vercel; ~1.26 MB server-rendered HTML with
  43 images; self-hosted Satoshi + Elza Condensed typefaces (no
  font CDN); **exemplary CSP** — `default-src 'self'`, `script-src
  'self'` with per-request **nonce + 'strict-dynamic' +
  report-sample**, a parallel report-only policy, telemetry to
  `/api/csp-report/` via both `report-uri` and `report-to`,
  `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`,
  `upgrade-insecure-requests`; `frame-ancestors 'self'` + one named
  admin CMS origin; Permissions-Policy granting camera/microphone/
  payment **only** to MoonPay and OnRamper; cache split — origin
  `no-store` under edge `s-maxage=75647` +
  `stale-while-revalidate=86400`; journeys observed: MoonPay +
  OnRamper on/off-ramps, CoinGecko market data, `charts.` and
  `news.` subdomains, Stytch passwordless auth at `accounts.`,
  Typeform lead capture, BambooHR careers; video via
  `youtube-nocookie` embeds.
- **Hypothesis (labelled):** the dual enforce/report-only CSP
  pipeline is a feedback loop for tightening rules as the
  third-party matrix changes.
- **NOT ASSESSABLE:** visual execution, motion, accessibility
  quality, runtime performance behind the 1.26 MB payload.

---

## 2 · THE CAPABILITY MAP (§2) — SUMMARY

Full text: `track8-readiness/capability_map.md`. The map answers the
exam's eight questions per benchmark against a 15-row evidence index
(P1–P15) built **only** from filed, graded evidence (the A-to-Z
dashboard, Track 7 phase records, Exam Artifact #1, and this exam's
exercises). Its honest shape, in its own summary:

- **Explain:** 8/8 at pattern level; internals honestly bounded
  where walls/checkpoints limited inspection (Bentley, Mercedes,
  Solana).
- **Reproduce in isolation:** the cinematic, scroll, component,
  state-machine, performance and flow techniques YES across all
  eight; the platform/framework layers (Next.js, Angular, AEM) NO —
  literacy, not production.
- **Proven centre (P1–P6):** scroll-frame cinematic sequences
  (production grade on one artifact, blind PASS 6/6) · GSAP + media
  engineering · procedural Three.js/WebGL at Intermediate ·
  interactive state machines & refusal design · rendering &
  performance method · hybrid pages + component Engine +
  documentation (blind-install exam PASS).
- **New evidence from this exam (P8–P10):** custom GLSL shaders
  (E1 — implemented, logic executed, improver-reviewed; **browser
  run NOT proven in this cell**) · secure auth-flow craft at demo
  scale (E3) · responsive navigation as an examined system (E2).
- **Structural gaps (P11–P15):** framework production at scale
  (React/Next.js, Angular) — literacy only · Blender-authored assets
  — Beginner, no artifact · user research — never practised ·
  Web3/UGC — Beginner electives by design · enterprise CMS
  (AEM-class) & multi-locale operations — never operated. Plus:
  production-grade identity/payments (E3 is a front-end demo; the
  town's till is designed, not wired) and a systematic OWASP pass
  that has still never been filed.

### The independent critique of the map (C1–C21)

A separate critic seat attacked the map claim by claim
(`track8-readiness/review/map_critic.md`): **9 CONFIRMED · 9
NEEDS-CHECK · 3 REJECTED.**

- **REJECTED — C2 (Lamborghini "Reproduce: PARTLY"):** the
  configurator *is* the 3D asset-variant pipeline and rendered
  catalogue; what is proven (state machines, scroll) is the wrapper.
  The PARTLY grades the wrapper as half the configurator. It is not.
- **REJECTED — C4 (Bentley "Explain: PARTLY"):** zero AEM exposure
  (P15). Describing a generic pattern class is not explaining
  Bentley's architecture. A NO filed as PARTLY.
- **REJECTED — C12 (Apple "Reproduce: YES in isolation"):** Apple's
  techniques include global component versioning at
  hundreds-of-pages scale and typography-system authorship; P6 is
  one kit and the crew consumes type systems (L17). The YES erases
  the scale/system gap.
- **NEEDS-CHECK (9):** Next.js explain/debug claims (C1, C3),
  Rolls-Royce identity-integration conflation (C5), Mercedes
  embed-equivalence (C7), SpaceX outcome-vs-architecture (C9),
  Apple a11y depth + debugging scale (C11, C13), Solana
  static-vs-live provenance (C14), Bitcoin.com literacy-vs-
  production CSP/auth (C16).
- **Most understated (per the critic): C6** — Rolls-Royce
  gated-flow/list-handoff reproduction is *stronger* than claimed:
  the handoff is a direct subset of E3's graded, passing machinery.

The map stands as filed; the critique stands beside it, unreconciled
where they disagree — the chief critic graded with both in view.

---

## 3 · THE EXERCISES (§3) — EXECUTED RESULTS

All four artifacts were re-executed fresh by the finishing
coordinator: `node harness.js <artifact> ./assert_E<n>.js` (the
harness extracts the DOM-free LOGIC block, syntax-checks every
inline script, and runs the assertions in a Node vm). Relay per
exercise: builder → improver → fixes → re-execution.

### E1 — "Aurora Veil" · custom WebGL shader page (raw WebGL, no libraries)
**RESULT: PASS — 5 passed, 0 failed.** Syntax OK. API: state machine
(INIT→RUNNING→PAUSED_HIDDEN→RUNNING, illegal transitions refused),
pixel ratio capped at 1.75 with garbage→1, reduced-motion/`?fallback`
forcing the static path. Improver: 4 findings (3 CONFIRMED-DEFECT
fixed, 1 REJECTED-SUSPICION). **Limit: the shader's rendered output
was never browser-verified in this cell** (Chrome dies at launch) —
logic and code review only.

### E2 — Responsive navigation system ("Meridian Atelier", vanilla)
**RESULT: PASS — 9 passed, 0 failed.** Panel refused at mobile
width, drawer refused at desktop width, both open at their proper
widths, close-from-anywhere, focus order payload-true, direct panel
switching legal with same-panel reopen refused, allowedStates mapped
per viewport. Improver: 21 findings (13 CONFIRMED-DEFECT fixed,
4 IMPROVEMENT, 3 REJECTED-SUSPICION); the final count includes
post-fix assertions the improver's findings motivated. Builder took
three attempts (see §4).

### E3 — Secure auth-flow demo (front-end only, no network)
**RESULT: PASS — 7 passed, 0 failed.** Named-code validators
(email/password, password never echoed), 5s/15s/45s exponential
lockout, submit-while-locked refused, auto-hide a constant 5000 ms
regardless of reduced motion. Improver: 11 findings (3
CONFIRMED-DEFECT fixed, 4 IMPROVEMENT, 4 REJECTED-SUSPICION).
Filed as what it is: a front-end demonstration, not a production
auth system.

### E4 — "The Long Gallery" · scroll-controlled 3D camera sequence
**RESULT: PASS — 6 passed, 0 failed, pre- and post-improver.**
Catmull-Rom spline through endpoints, finite everywhere; chase is
exactly the diff×0.1 lerp (0→100 = 10; converges <0.001 over 200
steps); worst tangent break a sane measured number; largest 1%-step
camera move positive and below path length; straight-line path
~zero break. The first coordinator's improver leg failed twice
(silent empty returns); the finishing coordinator re-ran it with
deepseek-v4-pro:0813 on the original improver input — 3 findings:
F1 [CONFIRMED-DEFECT] skip-to-end chased instead of completing
instantly; F2 [CONFIRMED-DEFECT] the reduced-motion branch rendered
and counted frames while off-screen/tab-hidden, breaking the
brief's pause rule; F3 [IMPROVEMENT] renderer buffer/aspect not
updated when reduced mode shrinks the container. All three fixes
applied as specified; diff against the preserved pre-improver
artifact is exactly those three changes; re-execution 6/6.
**Limit: same as E1 — rendered output never browser-verified.**

**Exercise verdict: 4 of 4 PASS at logic level.** No assert was
tuned to reach a pass; the one stale number found along the way
(the map's "6/6" for E2, its pre-fix count) was corrected in the
critic's packet, not in the map.

---

## 4 · FAILED SEAT CALLS — THE HONEST LEDGER

The exam's error logs are all **0 bytes**: every failure below was a
silent empty return, not an error message. Nothing was fabricated
to cover a gap; the costs were retries and coordinator time.

| Leg | What happened | Cost / cure |
|---|---|---|
| E2 builder | Attempts 1–2 returned effectively nothing (first `builder_raw.md` is 8 bytes); attempt 3 produced the artifact | 2 wasted calls |
| E4 builder | Two failed attempts before the artifact landed | 2 wasted calls |
| E4 improver (first run) | Two calls returned empty — `improver.md` 0 bytes, both error logs empty; the first coordinator's run ended with this leg open | The exam's final record waited on it; cured by the finishing coordinator's re-run (deepseek-v4-pro:0813), findings F1–F3 above |
| E1/E3 builders & improvers, E1–E4 first attempts elsewhere | Error logs exist but are empty; the legs landed | No cost beyond the calls |
| Browser verification (E1, E4) | The cell's Chrome dies at launch (instrument limitation, Track 7 Rule 31) | **Rendered-output evidence does not exist for the two visual exercises** — the single largest evidence gap in this exam |
| Benchmark inspection | Bentley's Akamai wall (23 NOT-ASSESSABLE lines), Mercedes' refused fetch, Solana's bot checkpoint | Three of eight benchmarks studied from partial surfaces; the studies file the blind spots rather than filling them |

---

## 5 · THE CHIEF CRITIC'S FINAL BLIND CLASSIFICATION

Seat: **kimi-k3**, via the house Ollama connector. Packet:
`review/final_critic_input.md` — the capability map with its
evidence index, the independent map critique (C1–C21), and the
executed assert results with the E4 completion record (§3–§4 above).
The critic saw no producer reasoning and no coordinator
recommendation. The three bands, as charged: **READY** (demonstrated
capability supported by actual evidence) · **CONDITIONALLY READY**
(some capabilities proven, specific gaps remain) · **NOT READY**
(critical skills remain unproven or failed).

The verdict, verbatim (raw artifact preserved at
`track8-readiness/review/final_verdict_raw.md`):

---

# FINAL BLIND CLASSIFICATION — TRACK 8 READINESS EXAM

**Signed under the tightened standard: READY ↔ PLATINUM READY+; CONDITIONALLY READY ↔ ADVANCED; NOT READY ↔ DEVELOPING/NOT READY.**

The record is sufficient to sign all fifteen rows. Where evidence is absent, the absence itself is the finding — no refusal to sign is required.

## 1. OVERALL CLASSIFICATION — **CONDITIONALLY READY**

The crew's claimed centre is genuinely proven, and proven by the right kind of evidence: a blind-graded specimen with an official PageSpeed filing (mobile LCP 2.4s, CLS 0, desktop LCP 0.6s, INP 120 ms), a full Track 7 grading record including a blind-install exam and a debugging examination, and live services in operation. That clears familiarity-is-not-mastery. But this exam's four new exercises — the work meant to close the known gaps — rest entirely on Node-logic harnesses plus code review: zero rendered-output verification in this sitting, by the appendix's own honest ledger. Most decisively, the single gap the exam was built around (custom shaders, dashboard GAP #1, "the critical gap vs Apple/Solana-grade technical artistry") remains unclosed at its core: E1's shader has never executed on a GPU anywhere in the record. The critique's three rejections (C2, C4, C12) strike benchmark-reading inflations, not the proven centre, but they confirm the structural gaps: framework production, enterprise CMS, authored-asset pipelines, and scale are all unproven. Some capabilities proven, specific gaps remain — that is exactly this band.

## 2. PER-AREA CLASSIFICATION

- **P1 Scroll-frame cinematic sequences — READY.** Blind-graded 6/6 on the specimen with an official CWV filing is rendered, verified evidence; E4 adds post-fix logic-verified camera discipline (6/6). Bounded honestly by the map itself: one-artifact proof.
- **P2 GSAP + media engineering — READY (at the claimed scope).** Phase 1 graded PASS with no critique challenge. Per C7, this does not cover managed-video surfaces (Plyr-class adaptive streaming/DRM/analytics hooks) — those remain unproven and outside this row's claim.
- **P3 Procedural Three.js / WebGL scenes — READY at Intermediate.** Live coin viewer plus Phase 2's measured continuity (worst tangent break 10.5°) is real evidence. Bounded per C2: the procedural route does not extend to authored-asset, automotive-grade variant rendering.
- **P4 State machines & refusal design — READY.** Phase 3 M12 PASS plus three Node-verified machines this exam (E1 5/5, E2 9/9, E3 7/7). State machines are logic; Node evidence is the correct evidence class here, and C6 confirms direct reuse.
- **P5 Rendering & performance engineering — READY (specimen path).** 36/36 harness plus the official CWV filing is rendered proof. Per C3: the *method* transfers to framework contexts; the framework-specific instrument panels (hydration, edge profiling, Turbopack, CSP report triage) are unproven.
- **P6 Hybrid pages + component Engine + documentation — READY at kit scale.** Blind-install PASS and Project 12 + debugging examination PASS are strong, graded proof. Bounded per C12 (REJECTED) and C13: one kit is not Apple's globally versioned, hundreds-of-pages component platform, and typography-system authorship sits at dashboard L17 Intermediate.
- **P7 Live full-stack services — READY as claimed (Intermediate).** Operating services (Solnik, members, 48-page town, 394-product store) demonstrate exactly the bounded claim filed. Per C5: stubbed social logins and thin GraphQL/Postgres/migrations mean this is operations evidence, not graded backend or identity engineering.
- **P8 Custom GLSL shaders — NOT READY.** Zero rendered shader artifacts exist anywhere in the record; E1's harness verified the scaffolding (state machine, pixel-ratio, fallback decision — 5/5), not the shader program, which has never executed in a verified browser or GPU run. For a shader, rendering *is* the capability; logic evidence cannot stand in for it. The critique did not need to reject this — the map files it honestly — but the band is NOT READY. Cure: one browser/GPU run with captured rendered output, visually graded, plus fallback proven in a real disabled-WebGL state.
- **P9 Secure auth-flow craft — CONDITIONALLY READY.** E3 executed 7/7 with a substantive improver loop and files itself honestly as a front-end demo (C17 CONFIRMED). Per C16, C5: no browser execution of the interaction, no OWASP pass ever filed (L19), and no production identity lifecycle (sessions, tokens, recovery).
- **P10 Responsive navigation systems — CONDITIONALLY READY.** Executed result is 9/9 **post-fix** (the appendix supersedes the map's stale 6/6); the 13 confirmed first-pass defects were caught and fixed by the improver loop, which is the process working. Still, every datum is logic-level: breakpoint layout, visible focus behavior, and reduced-motion rendering have never been verified in a browser for any navigation system.
- **P11 Framework production (Next.js/Angular) — NOT READY.** Literacy only; no graded artifact. The critique's findings (C1, C2 REJECTED, C9) confirm that adjacent map language leaned on pattern recognition, not production.
- **P12 Blender-authored 3D assets — NOT READY.** No install, no artifact; C2 shows this gap is load-bearing for configurator-class work.
- **P13 User research / usability testing — NOT READY.** Never practised; no artifact of any kind.
- **P14 Web3 contracts / UGC systems — NOT READY.** Beginner by design; the honestly operated read-only wallet surface does not touch contract engineering or UGC.
- **P15 Enterprise CMS & multi-locale operations — NOT READY.** Never operated. C4 (REJECTED) establishes the crew cannot even explain Bentley's internals — zero AEM exposure means the "PARTLY" the map floated there was a NO in costume.

## 3. NAMED GAPS

**Keeping P9 from READY:** (a) browser-executed interaction test of the flow (focus management, timers, lockout UX); (b) one filed systematic security pass (OWASP-class) on a shipped surface; (c) production identity lifecycle — server sessions, token handling, recovery — before any production-auth trust.

**Keeping P10 from READY:** rendered-environment verification — a real browser run across breakpoints covering layout, visible keyboard focus, reduced-motion behavior, and panel switching — graded as its own system.

**Keeping the OVERALL verdict from READY:** (1) the standing browser-verification debt on all four Track 8 exercises — Node proves logic, not rendering; (2) P8's shader executed and visually graded at least once; (3) framework production (P11) at any graded scale; (4) authored-asset pipelines (P12); (5) user research (P13); (6) enterprise CMS/multi-locale operations (P15); (7) proof of the proven centre at benchmark scale (C12/C13). Items (1)–(3) are the minimum cure to re-examine this classification; (4)–(6) are longer tracks.

## 4. CLOSING STATEMENT — WHAT THIS CREW MAY AND MAY NOT BE TRUSTED TO BUILD NEXT

**May be trusted:** to design and ship hand-built static/hybrid cinematic commercial websites end-to-end at town/kit scale — scroll-driven product narrative, component systems with install-grade documentation, refusal-state interaction logic, performance budgets enforced against real Core Web Vitals, and intermediate procedural Three.js scenes integrated into those pages. Also: gated-flow and list-handoff front-end logic (E3's graded species), editorial/heritage design layers, sourced-data display at build time, and honest architectural defence of the static route. Their evidence culture — preserved pre-improver artifacts, verbatim ledgers of empty seat returns, bounded claims — is itself deliverable-grade behavior.

**May not be trusted (yet):** any deliverable where a custom shader is load-bearing, until E1 renders and passes visual grading; any Next.js/Angular production surface or AEM-class estate; automotive-configurator-class asset and variant pipelines; Blender-authored or captured (Matterport-class) 3D content; production authentication, payments wiring, or CSP reporting operations; multi-locale operations; and any design claim that requires user research to stand behind it. A Track 8 flagship graded against the full Bitcoin.com/Apple bar is premature until the browser-verification debt is paid and the shader has executed even once.

*Verdict stands as rendered: CONDITIONALLY READY overall; READY ×7 (P1–P7, each bounded as stated), CONDITIONALLY READY ×2 (P9, P10), NOT READY ×6 (P8, P11–P15).*

---

## 6 · FINAL CLASSIFICATION

**Overall: CONDITIONALLY READY** — some capabilities proven,
specific gaps remain (chief critic kimi-k3, signed; §5 verbatim).

| Area | Band | Basis in one line |
|---|---|---|
| P1 Scroll-frame cinematic sequences | **READY** | Blind-graded specimen 6/6 + official CWV filing; E4 logic 6/6 |
| P2 GSAP + media engineering | **READY** (claimed scope) | Track 7 Phase 1 PASS; managed-video surfaces outside the claim (C7) |
| P3 Procedural Three.js / WebGL | **READY** at Intermediate | Live coin viewer + Phase 2 measured continuity; not authored-asset grade (C2) |
| P4 State machines & refusal design | **READY** | Phase 3 M12 PASS + E1 5/5, E2 9/9, E3 7/7 this exam |
| P5 Rendering & performance engineering | **READY** (specimen path) | 36/36 harness + CWV filing; framework instruments unproven (C3) |
| P6 Hybrid pages + component Engine + documentation | **READY** at kit scale | Blind-install PASS, Project 12, debugging exam; not platform scale (C12/C13) |
| P7 Live full-stack services | **READY** as claimed (Intermediate) | Operating services; operations evidence, not identity engineering (C5) |
| P8 Custom GLSL shaders | **NOT READY** | Shader has never executed on a GPU/in a verified browser run anywhere in the record |
| P9 Secure auth-flow craft | **CONDITIONALLY READY** | E3 7/7 at demo scale; no browser test, no OWASP pass, no production identity lifecycle |
| P10 Responsive navigation systems | **CONDITIONALLY READY** | E2 9/9 post-fix; all evidence logic-level, never browser-verified |
| P11 Framework production (Next.js/Angular) | **NOT READY** | Literacy only; no graded artifact |
| P12 Blender-authored 3D assets | **NOT READY** | No install, no artifact |
| P13 User research / usability testing | **NOT READY** | Never practised; no artifact |
| P14 Web3 contracts / UGC systems | **NOT READY** | Beginner by design; read-only wallet surface only |
| P15 Enterprise CMS & multi-locale operations | **NOT READY** | Never operated; zero AEM exposure (C4) |

**Minimum cure to re-examine the overall classification** (critic's
§3): pay the browser-verification debt on the four exercises ·
execute and visually grade the E1 shader at least once · produce
framework production evidence at any graded scale. Longer tracks:
authored-asset pipelines (P12), user research (P13), enterprise
CMS/multi-locale (P15), and proof of the proven centre at benchmark
scale.

**Status on landing:** with this signed record filed, Track 8's
Readiness Exam is complete and classified. The classification is a
readiness judgment, not a production authorization — the exam's §7
restriction and the founder's sequence stand untouched.

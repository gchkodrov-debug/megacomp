# EVALUATION — Craft Anything (storytold/craft-anything, "ARTCRAFT")

**Date:** 2026-11-23 · **Evaluator seat:** isolated lab evaluation, sandbox `~/workspace/lab/craft-anything-eval/`
**Commit evaluated:** `9f3355c18afc88eda9e1d9f4c19eecfb05b340ff` (workspace version 0.6.1, tag v0.6.1)

---

## VERDICT — ADAPT (narrow, fenced)

**Do not adopt it as a production crew tool today. Do adopt two things from it:**

1. **Its evidence format, now, for free.** Its website capture bundle — screenshots at fixed widths + design tokens + per-width layout outline + asset/link/form inventories, written as `capture.json` + a plain README, every result carrying confidence / coverage / limitations — is a better discipline than our hand-rolled per-task CDP probes. The crew can mirror that output shape with the tools already in hand, no install required.
2. **A sandboxed trial later, for one job only:** clean-room *study* captures of reference sites (luxury automotive / cinematic product pages) to feed the crew's own hand craft on the Coin Portal work — design tokens, breakpoints, layout-at-widths, menu/dialog states. Trial only inside a sandbox like this one, clean-room mode only, never pointed at production repositories, never given credentials, and its `setup` command never run against house agent configurations.

**Do not adopt its rebuild loop for PROVADIA pages.** Its check measures how alike two pages *look standing still* — and it explicitly treats animation, video and carousels as noise to be masked out of the comparison (see §4). The heart of the PROVADIA brief is motion: separation, portal entry, scroll choreography, film. On the exact failure that killed homepage v1 (a static stack served where motion was promised), this tool's score would have been blind. It also optimizes toward *likeness to a reference*, and the house builds original work from references' behavior — not clones.

**Revisit trigger:** re-evaluate as a full tool if/when it (a) reaches a more mature release line, (b) survives a few months of its current breakneck change rate, or (c) learns to measure motion/transitions. Until then it stays a lab instrument, not a manifest production tool.

---

## 1. WHAT IT ACTUALLY IS (verified from the cloned source + repo page)

- **A pure-Rust, clean-room reverse-engineering / recreation engine** (~288,000 lines of Rust, 897 `.rs` files, workspace of 13 crates + 3 apps: desktop app (egui), CLI, WebAssembly viewer). Dual-licensed **MIT OR Apache-2.0** (LICENSE-MIT + LICENSE-APACHE in tree; workspace `license = "MIT OR Apache-2.0"`).
- **Workflow — Study → Build → Check → Ready:**
  1. *Study:* inspect the target (website / desktop app / phone app / game / files) with real inspection tools.
  2. *Build:* a coding agent **on your own machine** builds a new project in the stack you name.
  3. *Check:* compare build vs original, list mismatches, refine (default: stop at **90% alike**, max **6 rounds** — `crates/engine/src/settings.rs`, `crates/ai/src/rebuild/`).
  4. *Ready:* open/preview, or request changes.
- **320 tools** (300 engine + AI/setup layers), each exposed three ways: desktop UI, **CLI subcommand**, and **MCP tool** — so an agent can drive the same engine the app uses. Every tool result is an **evidence record** with confidence, coverage and limitations (`crates/evidence/src/lib.rs`).
- **Agent pairing:** Claude Code is the first-class builder — it runs *your own, unmodified* `claude` binary with *your own* sign-in; Craft Anything states it never sees or handles your account (`docs/claude-code.md`). Codex adapter exists but is **unverified on a real install** (README's own words); Copilot CLI and Grok Build via ACP; other ACP agents switchable, most not run live. API backends for questions/analysis: Anthropic, OpenAI, OpenRouter, xAI, DeepSeek, Moonshot, local OpenAI-compatible servers — all user-configured.
- **Two modes:** *Clean room* (default) — nothing inside the original is read: for websites it works from screenshots, visible text, measured layout, colours, fonts, spacing, opened menus. *Deep* — everything is read (source, JS, binaries via its own decoders/disassembler/decompiler, Ghidra if installed), "for your private use." The README is candid that clean room is a *rule about what the tool offers*, **not an OS sandbox**: a coding agent it drives still acts with your permissions.

### How it inspects a website (from `crates/engine/src/tools/website_tools.rs`, `web_common.rs`)

- Launches a **private Chromium via CDP** (fresh profile, no history/logins; deletes the profile on close), runs the site's scripts — declared effects: `EXECUTES_FOREIGN_CODE + ACCESSES_NETWORK + LAUNCHES_PROCESS`, approval-gated.
- `web_site_capture` writes a folder containing: full-page PNG screenshots at requested widths (it scrolls through the page first so scroll-revealed sections appear), the rendered HTML, **design tokens** (fonts, sizes, weights, text/background colours as hex, radii, shadows, spacing, content widths, CSS custom properties), the **breakpoints** its CSS switches at, a **per-width layout outline** (page width, heading/text sizes, each section's padding/gap/content column/items-per-row, landmark positions), asset lists, links, and form outlines (**never form values**; cookies/storage never read). Outputs `capture.json` + `README.md`.
- Compare widths default to **1440 / 768 / 390** (configurable, 320–3840, max 4).
- `web_page_states_capture` opens menus, dialogs, tabs and collapsed sections one at a time, photographs each state, records what changed, restores the page.
- Comparison (`web_snapshots_compare` / `web_pixels_compare` + rebuild self-check): a **% alike per width**, computed on pixels/layout — with a **noise pass**: a second photo taken moments later marks whatever changed by itself (carousels, videos, **animations**) and those regions are *excluded* from comparison.

### Maturity signals (verified 2026-11-23)

- **Stars: 42,038** and **8,319 forks** (GitHub repo page, crawled 2026-11-23 20:37 UTC). The advertisement's **36,813 was real but already stale** — third-party snapshots show ~8,713 (Nov 2) → ~22,072 (~Nov 13) → 42,038 (Nov 23). Growth this fast measures virality, not proven reliability.
- **Age: created 2026-10-31 — 23 days old** at evaluation. 1,640 commits, **7 releases** (v0.1.0 → v0.6.1). Self-declared **early alpha** in README, badges and status docs.
- Its own status docs are unusually candid (works / partly / next, tool-by-tool checklist, known defects). Known friction relevant to us, in its own words (`docs/tool-status.md`): from the CLI each command is its own session, so `web_site_open` in one invocation and capture in another finds no site — website work must run in one session (MCP / rebuild flow / app).

---

## 2. SECURITY REVIEW (static, from source)

**What it executes**
- By design: the target website's own JavaScript (private Chromium), the coding agent you configure (as a subprocess, with *your* sign-in and *your* OS permissions), and optionally external engines it locates on PATH (Chromium, Ghidra, ILSpy, adb, Frida, GDB/Rizin, Java, etc.). Tool specs declare effects (network, filesystem, process launch, foreign code) and the dangerous kinds are approval-gated per project (`project_approvals_set`; the approval tool refuses dev servers, gates edits outside the project, system changes, deletions).
- Workspace lints **forbid unsafe Rust** in its own code (`unsafe_code = "forbid"`). SECURITY.md treats "code from a target running without consent," "a tool doing more than its declared effects," and "a secret reaching a log/evidence" as vulnerabilities — the right list.

**What it phones home to**
- **No telemetry/analytics found** in the source (no PostHog/Sentry/Mixpanel-style reporting; several bundled agent adapters are explicitly launched with analytics/update checks *disabled*).
- **The desktop app does check for new releases online** and can install verified updates (`crates/ui-egui/src/updates.rs`, via the `craft-update` library against its GitHub releases). The CLI path shows no such check in the reviewed code. On Linux the AppImage format additionally self-updates via AppImageUpdate per the README.
- AI calls go only to endpoints the user configures (provider APIs listed in §1, or a local server). Generated pictures/3D are opt-in with the user's own fal.ai key.
- One dependency note: several format libraries are pinned git dependencies from the same org's `craft-libs` repo — normal for the project, but it means a source build fetches more than crates.io.

**What permissions it wants / writes**
- `craft-anything-cli setup` **writes MCP entries into other tools' config files** (Claude Code, Codex, and ~20 other agent clients — `crates/setup/`), with backups. This is the single most intrusive housekeeping action: **never run it against house agent configurations**; if the MCP route is ever trialled, register the server manually in the trial environment only.
- The builder agent's working folder is the project folder, but the agent itself is *not* sandboxed by Craft Anything (its own docs say so plainly). Whatever the agent can read, it can read — hence the fences below.
- Website capture is comparatively well-mannered: fresh browser profile, form values/cookies/storage never read, sign-in profiles only for sites the user explicitly saved, secrets redaction built into its evidence pipeline (`Secrets` scrubber in `web_common.rs`).

**Fences if it is ever run here** (same as this evaluation): sandbox directory only · clean-room mode only · scrubbed environment (no inherited tokens — this evaluation confirmed the ambient env carries trace context and excluded it) · no production repositories as targets or project folders · no `setup` against real agent configs · Deep mode never on third-party software.

---

## 3. SMOKE TEST — WHERE IT STOPS IN THIS ENVIRONMENT (honest)

**The tool was not executed in this evaluation.** Exact stopping point:

- There is **no Rust toolchain in this VM**, and the project pins **Rust 1.97+** (`rust-version = "1.97"`, edition 2024) — a very new toolchain. Building the CLI from the cloned source pulls the full engine workspace (egui/wgpu dependency graph included via the workspace) — a heavy build for this cell (1.5 shared CPU / 6 GB RAM), and not attempted.
- Website capture would additionally need its Chromium engine: a Chromium exists on this machine at a non-standard path and the engine supports configured tool paths, so that part is *probably* satisfiable — unverified, because there was no built binary to verify it with.
- Therefore everything in §1 about capture behaviour was verified **from source and from the project's own in-tree tests** (e.g. `website_tools.rs` tests asserting the capture README's per-width layout lines, the scroll-reveal photography test, the noise-pass wording) — **not** from a live run against a reference site. A live trial remains an open, bounded follow-up: build or otherwise obtain the CLI inside a sandbox, point clean-room capture at one public luxury page, and compare its bundle against one of our own CDP probe outputs.

---

## 4. THE VERDICT THAT MATTERS — vs THE HOUSE STACK

House stack today: Claude Code + hand-built CDP probes (the v2 build proved desktop 1440×900 + phone 390×844 on the exact pushed file, film-playing state, JS errors) + GSAP/Three.js hand craft + crew render checks + the Relay Law seats.

| Question | Craft Anything | House stack today |
|---|---|---|
| Repeatable reference-study bundle (tokens, layout, breakpoints, states at 3 widths) | **Stronger** — one command, structured evidence, agent-drivable via MCP/CLI | Hand-rolled per task; output shape varies by seat |
| Comparing our page vs a reference | Numeric % alike per width, mismatch list, refine loop to 90% | Crew judgment + screenshots; no single score |
| **Motion, transitions, scroll choreography, film** | **Blind by design** — animation/video are masked as noise and excluded from the score | **The core of the work** — GSAP/Three craft, frame journeys, founder's own-screen verdict |
| Portal/interaction states (menus, dialogs) | Automated states capture | Manual CDP scripting per case |
| Responsive behaviour evidence | Solid: per-width layout metrics, sideways-scroll detection | Solid: probes at the two house sizes |
| Originality / clean-room posture | Clean-room default matches house law | House law already; references are feeling, never artwork |
| Cost to run here | New Rust 1.97 toolchain + heavy build; alpha churn; huge irrelevant surface (binaries, games, firmware RE) | Already working, already paid for |

**Where it would slot into the Coin Portal work (if trialled):**
- *Reference study, upstream of design:* capture 2–3 luxury/cinematic references in clean-room → tokens + layout + states as structured evidence for the storyboard seats, instead of each seat eyeballing separately.
- *Regression yardstick for static layers:* when a portal world's *layout* is meant to match a spec, its per-width alike-score is a cheap second opinion beside the crew's checks.

**Where it does not help:**
- The vertical slice's actual risk — whether the coin's opening, portal entry and return *feel* alive and continuous. It cannot see that at all; motion is noise to it. The founder's screen remains the only court for that, exactly as now.
- Building the worlds: its rebuild loop aims at likeness to a target. PROVADIA's worlds are original; there is no target to be 90% alike to.
- Anything today: it cannot run in this cell yet (toolchain), and an early-alpha tool with a 23-day history does not belong in the production path of a founder-judged build.

---

## 5. RECOMMENDATION FOR THE CREW TOOLS MANIFEST

**ADAPT** — record it in the manifest as a **lab/trial instrument with fences** (sandbox-only, clean-room-only, no credentials, no production targets, no `setup` against house configs), with two immediate, zero-risk adoptions:

1. Mirror its capture-bundle format (widths + tokens + layout outline + states + confidence/coverage/limitations) in the crew's own CDP probe outputs, starting with the next reference study for the portal worlds.
2. Queue one bounded live trial (build the CLI in a sandbox when a Rust 1.97 toolchain is available; clean-room capture of one public luxury reference; side-by-side against our probe output) — and let that trial, not the star count, decide any wider use.

Not ADOPT: alpha maturity, motion blindness, toolchain weight, and an install/setup footprint that touches agent configs. Not REJECT: the capture discipline is genuinely ahead of our current probe practice, the license is clean (MIT/Apache-2.0), the security posture is declared and gated rather than hidden, and the clean-room default is the house's own law.

---

## 6. WHAT WAS VERIFIED BY RUNNING vs ONLY READ (Relay Law disclosure)

- **Run / executed:** `git clone` of the repo into the sandbox (commit `9f3355c…`); local source inspection across `crates/engine` (website/browser tools, settings), `crates/ai` (rebuild loop, Claude Code adapter), `crates/setup`, `crates/evidence`, `crates/ui-egui` (update check), packaging scripts (Linux postinst is cache-refresh only), and docs in-tree. Environment checked for inherited secrets before any work (trace context present; excluded from anything the tool would have seen — the tool was never run).
- **Read (web):** the GitHub repo page (stars 42,038 · forks 8,319 · created 2026-10-31 · 7 releases — crawled 2026-11-23), README, and two third-party write-ups used only to date the star growth (8,713 on Nov 2; 22,072 ~Nov 13).
- **Not run:** the Craft Anything binary/CLI/app itself — no live capture, no live rebuild, no MCP session. All behaviour claims rest on source + the project's own tests and status docs, and are labelled as such above.

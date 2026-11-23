# BUILD RECORD — UNIVERSAL PRESENTATION ENGINE v1 (2026-11-23)

**Commission:** ChatGPT's advice to the house (adopted by the captain, founder's conveyor
order 2026-11-23): one engine for every product's Surfer presentation — built once,
improved forever — instead of 380 hand-built pages. Generalized from the PROVEN
Mint/Gemini engine (the shipped page, 55,107 B, SHA-256 `ecec73a8…`).
**Amendments folded in** (Gemini's four inventions, captain's adjudication
2026-11-23): dual-geometry explosion modes · Inspect Inside · house-scoped theme
tokens · manifest linting against the defect library.

**Deliverables** (all under `~/workspace/newwave/next-build/presentation-engine/`):

| File | What it is |
|---|---|
| `engine/upe.js` (26.5 KB) | The runtime. `UPE.mount(section, manifest, houses)` builds the whole journey from data. Plain JS, no framework, no build step. |
| `engine/upe.css` (10.9 KB) | The stylesheet. Every colour/font/radius is a `--upe-*` custom property; the file contains no house values. |
| `engine/houses.json` | The house registry: PROVADIA + OneJobKits token sets, typography, geometry, legal signatures, UI strings. |
| `manifests/mint.manifest.json` | The Mint manifest, written from the shipped page's real data (fix-pass anchor map, measured locks, verbatim copy). |
| `manifests/mint-orbit-smoke.manifest.json` | The Mint manifest cloned to `radial-orbit` (geometry smoke only — labeled as such). |
| `demo/demo-mint.html` · `demo/demo-orbit.html` | Demo pages containing **no journey markup** — the engine builds everything from the manifest. They run beside the shipped Mint page, which is **not** replaced. |
| `demo/assets/inspect-mint-mark.webp` | The Inspect Inside asset for Layer 5 (provenance §4). |
| `MANIFEST_SPEC.md` | **The manifest spec** — every field, its meaning, the 13-fact intake mapping, engine constants, wiring. Written for Gemini's architect audit. |
| `DEFECT_LIBRARY.md` | The defect library, seeded with 11 defects (#001–#011), each with its conveyor check. |
| `tools/lint-manifest.mjs` + `tools/fixtures/` (5 broken manifests) | The manifest validator (no dependencies) + one deliberately broken manifest per rule. |
| `probe/probe-engine.mjs` + `probe/serve.mjs` | The acceptance probe (puppeteer, hard assertions) + its static server. |
| `shots-engine/` (25 stills + `probe-report.json`) | Probe evidence. |
| `relay/` | Relay prompts, outputs, lint evidence, freeze hashes. |

## 1. Design — what was generalized, and how

The shipped Mint journey was already a clean single-purpose engine; v1 separates its
**data** from its **mechanics**:

- **Data → the manifest.** Frame set (dir/mobileDir/pattern/count/sizes/step), the
  piecewise scroll→frame **frameMap** (the fix pass's measured anchors
  `[0,1],[0.06,55],[0.08,104],[0.13,112],…,[1,235]`), per-stratum windows/locks/tips/
  fan-ticks, arrival copy/chips/framing/scrims, closing ledger/notices/scrims, rail
  ranges, commerce state. The Mint manifest's copy is byte-identical to the shipped
  page's text.
- **Mechanics → the engine, constants kept identical** to the shipped build so a
  manifest taken from a shipped page reproduces it: chase factor 0.1 / ε 0.00035,
  callout fade edge 0.018, rail 220px, DPR cap 1.5, breakpoints ≤700px (frame subset)
  and ≤767px (narrow dress), priority preload (first/last/mid/quartiles) at 120%
  root margin, 45° leaders with cover-fit tip conversion, vibrate tick.
- **Palette → tokens.** The manifest's required `house` enum binds a registry entry;
  the engine sets `--upe-*` properties from it and throws on an unknown house (no
  default). `upe.js`/`upe.css` contain zero house hex values (blind-verifier items
  1–2). A second house is a registry entry, never a code fork.
- **Amendment 1 — dual geometry.** `meta.explosionMode`: `vertical-stack` (shipped
  geometry exactly) | `radial-orbit` (leader elbow mirrors for right-half tips, so
  leaders splay like spokes; orbit manifests must carry per-stratum `satellite`
  positions, lint-enforced). Canvas/dots/rail/closing are shared.
- **Amendment 2 — Inspect Inside.** Optional per-stratum `inspect{type,src,alt,
  caption,buttonLabel?}`. The detent is a fixed overlay; opening it **freezes the
  chase and locks page scroll** (overflow lock + scroll-position guard); tap-away or
  Esc restores the saved scroll position — the exact frame (probe-verified, §3).
- **Amendment 3 — house wall.** Registry legal signatures (phrases + colours);
  the linter scans all manifest copy for the other house's phrases, forbids
  signature-token overrides and other-house colours. The engine itself never renders
  a checkout: a `[data-upe-commerce-slot]` appears only when `purchaseEnabled` AND
  `gateStatus:"open"` (the Mint has neither).
- **Amendment 4 — linting.** See §5.

**Two deliberate deviations from the shipped build, recorded:** (a) when the exact
target frame finishes loading after a neighbour fallback was drawn, the engine
redraws with the exact frame (the shipped build could rest on the fallback until the
target changed; rest-state pixels are identical); (b) frame loads draw immediately at
the current progress — defect **#011**, found by this build's first probe round (the
chase-only loop paints nothing when a page is entered with the journey already at
rest; latent in the shipped build too).

## 2. The Mint manifest — fidelity notes

Written from the shipped page, not from memory: anchor map and lock frames from the
fix record's measurement (locks **112/120/128/135/143/151/158/166**; separated band
`separationStartFrame 106`, `reassemblyStartFrame 171` = first whole-again frame);
tips from the shipped `data-gx-tip` attributes; Layer 2's `fanTicks: 5`; arrival
framing `discFraction 0.4375` (measured on f001) → the engine derives the shipped
1.646 medallion factor from `targetWidthVw 72 / discFraction`; chips carry their
fix-pass measured widths (212/194/222/263px) and `chipsLayout: "stack-narrow"` per
Gemini's F4 ruling; closing scrim 64→76; commerce closed/disabled.

## 3. Probe evidence (the acceptance test)

`probe/probe-engine.mjs` against the demo served locally with the real Mint frames —
**96/96 assertions PASS, zero JS errors** (`shots-engine/probe-report.json`). The
numbers land on the shipped page's own probe values:

- **Lock frames** — desktop exact: 112/120/128/135/143/151/158/166; phone (odd-frame
  subset): 111/119/127/135/143/151/157/165 — the shipped probe's ±1 pattern.
- **Bullet-alone** at every window midpoint on both viewports (active opacity 1,
  others ≤0.05), leader groups fully drawn, tip dots within the shipped tolerances
  of Gemini's coordinates (7px phone / 8px desktop), Layer 2's five fan ticks present.
- **Phone transfer: 118 frames, 782,146 B — byte-identical to the shipped page's
  probe figure.** Desktop: 235 frames, 6,373,160 B.
- **Arrival** — facts/chips/cue verbatim; phone arrival scrim block + gradient at
  opacity 1, desktop display none; **arrival painted at rest** (canvas gold fraction
  > 0.02, frame 1, before any scrolling — the #011 guard); **token colours resolve**
  (computed sub-line colour `rgba(233,221,198,0.85)` — the #010 guard); chips compact
  (10px / 5px 8px / 6px gap), stacked 4 rows, cue ≥20px clear of the bottom edge.
- **Closing** — opacity 1 at p=1, scrim gradient carries the 64%/76% band, all four
  ledger rows verbatim, single Return to `/next/`, no commerce slot.
- **Rail** — tap tick 4 → progress 0.4304, Layer 4 alone; tap tick 8 → 0.8299,
  Layer 8 alone (shipped: 0.4304 / 0.8296).
- **Reversal** — canvas signature at p=0.58 identical forward and after excursion.
- **Inspect Inside** — opens at Layer 5 on the real coin crop (image loaded, type
  `ui-crop`); frame frozen at 143 while open; a programmatic scroll attempt moves
  neither scroll position nor progress; tap-away closes and returns to **frame 143,
  scrollY 3159 — the exact values at open**.
- **Orbit smoke** — stack leader for the left-half tip elbows left (tip x 712 →
  elbow x 197.7); the orbit page's right-half tip elbows right (tip x 1168 → elbow
  x 1426). Mode attribute reads `radial-orbit`.
- **Reduced motion** — static stack: all 8 bullets at opacity 1, leaders/rail/scrims
  `display:none`, arrival + closing visible.

First probe round was 89/92 + two visual defects caught on the stills (blank arrival,
black sub-line text) — both root-caused, fixed, and converted into permanent probe
guards (#010, #011) before the clean run. The 96/96 run is the post-fix run; the
post-Relay F3b change was re-probed clean (96/96 again) before this record was written.

## 4. Inspect asset provenance (honesty receipt)

`demo/assets/inspect-mint-mark.webp` (471×471, 85,828 B) was cropped 2026-11-23 from
`~/workspace/your_files/provadia-coin-front.png` (1024×1024 — the founder-approved
PROVADIA obverse artwork, the same file used as the Flow ingredient for the Mint
film), crop box (276,245)–(747,716): the brick-masonry 'P' relief at native detail.
It is the real artifact face the Mint strikes from — not a rendering, mock, or
generated image. The manifest caption says exactly this.

## 5. Lint evidence

`relay/lint-evidence.txt` (exit codes captured): the Mint manifest **PASS** (11/11
checks, exit 0); the orbit smoke manifest PASS; and each broken fixture **REJECTED,
exit 1**, with its rule id:

- `broken-001-arrival-width.json` → **#001** (82vw, no scrim)
- `broken-002-closing-scrim.json` → **#002** (band 40→60 with ledger rows)
- `broken-003-lock-frame.json` → **#003** (Layer 2 lock at f85 — the historical
  edge-on-rim defect itself)
- `broken-004-chip-row.json` → **#004** (909px combined chips declared `wrap`)
- `broken-house-contamination.json` → **HOUSE-WALL ×2** (PROVADIA phrase in a
  OneJobKits manifest + signature-token override)

## 6. Relay (Relay Law — builder → improver → critic → blind verifier)

Bench note: the Ollama bench is exhausted (HTTP 402), so kimi-k3 could not sit;
substitutes named per the standing pattern. Prompts and full outputs in `relay/`.
The file set was frozen before the seats ran (`relay/freeze-sha256.txt`).

- **Improver — DeepSeek-V4-Pro (Promise axis): NOT READY as briefed; substance
  largely CONFIRMED.** Its blocking findings (F1 no demo page, F2 no linter, F8 no
  probe script) were raised against its **review packet**, which omitted those files
  — they exist in the deliverable set and were frozen *before* its run (hashes in
  `relay/freeze-sha256.txt`: `demo/demo-mint.html c6646ac5…`, `tools/lint-manifest.mjs
  8b557ec1…`, `probe/probe-engine.mjs de9e650a…`). The omission was the builder's
  briefing gap and is owned here; the seat's own text confirms the engine core,
  manifest consistency (it independently recomputed all eight frameMap lock
  deliveries as exact), dual modes, reduced motion, and parameterization as
  CONFIRMED. **F3b CONFIRMED and REAL:** the Inspect button label was hard-coded
  copy in `upe.js` — **fixed**: UI strings now live in the house registry (`ui`
  block), with a per-stratum `inspect.buttonLabel` override; spec §5.1/§9 updated;
  lint + probe re-run clean (96/96) and the changed files re-frozen. F3a
  (asset provenance) is answered by §4. F5/F6/F7 (enforcement split between linter
  and runtime) accepted as designed — the linter is the gate, the runtime stays
  data-faithful. F11's "leader side" note: leader side is derived from tip position
  + mode, as the spec documents; accepted.
- **Critic — Grok 4.20 via xAI (House axis): SHIP.** All seven house laws CONFIRMED
  with quoted evidence — Receipt Law/honesty, the two-house wall (runtime + lint),
  the Presentation Standard's craft rules, the palette law (zero hex literals in
  engine code), copy discipline, the shipped page not replaced, no synthetic people.
  No changes required.
- **Blind verifier — GPT-5 via OpenAI: 22 PASS / 0 FAIL.** Every checklist item —
  token purity of JS and CSS, unknown-house throw, chase mechanics, canvas-only
  drawing, priority preload, mobile subset, manifest-driven frameMap, the Mint's
  locks/band/windows/tips, both scrims, all four lint rules + the house wall quoted
  from the code, orbit satellites + elbow mirror, the Inspect detent's freeze/lock/
  restore, reduced motion, the commerce gate, and the spec's completeness.

**Crew agreement:** with the improver's packet-gap findings answered by the frozen
evidence and its one artifact finding (F3b) fixed and re-probed, the three seats'
verdicts on the artifact agree: the engine meets the commission and the house laws.
The captain judges last, as always.

## 7. Shortfalls, plain

- **Orbit mode is geometry-proven only.** The smoke page reuses the Mint's stack
  film with one tip moved; radial-orbit's real proof comes with the first multi-part
  kit's own purpose-made film and satellite measurements. Nothing in the demo claims
  otherwise (the page is labeled a geometry smoke test).
- **Production LCP remains unmeasured** (defect #009, open since the Mint v2): local
  figures are preload artifacts. CLS was not separately gated in this probe.
- **Defect #006 (faint band at ~14% of the phone arrival still)** is visible in the
  engine demo exactly as on the shipped page — it is a film-side artifact, carried
  knowingly; the new Mint film is the expected cure.
- **OneJobKits tokens are the store's documented palette** (deep green #004C3F,
  accent #95BF47, light ground) with a system-sans stack; the store theme's exact
  font files bind into the registry when the first OneJobKits product is wired.
  The wall mechanics (enum, signatures, lint) are fully proven with these values.
- **The demo pages are local proof rigs**, served from the workspace mirror of the
  Mint frames; nothing was pushed to the live site in this pass, and the shipped
  Mint page is untouched (its live hash remains `ecec73a8…`).
- **Price note for the captain (outside this build's scope):** the manifest carries
  the shipped page's founder-ruled $130 / $104 verbatim, because the proof bar is
  fidelity to the live page. If the Mint's price is re-ruled, the manifest and the
  page change together — one data edit each, which is the engine's point.

## 8. Freeze

Pre-Relay freeze + post-Relay delta (upe.js, houses.json, MANIFEST_SPEC.md after the
F3b fix): `relay/freeze-sha256.txt`. Final key hashes: upe.js `29063671…` ·
upe.css `bf80c4e2…` · houses.json `f7e7b4a3…` · mint.manifest.json `f92a7655…`.

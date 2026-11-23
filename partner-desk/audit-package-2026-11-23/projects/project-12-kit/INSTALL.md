# INSTALL — the Kit, running

*Fifteen minutes, five steps, no accounts, no build step.
Everything below runs offline once Node is installed.*

## What the Kit is, as files

The Kit is two things side by side:

- `kit/` — the Engine (`kit/engine/`), the seven
  templates (`kit/templates/`), and the vendored
  libraries (`kit/vendor/`).
- The five documents at this folder's root — README.md,
  INSTALL.md (this file), CUSTOMIZE.md, BUDGETS.md,
  CHANGELOG.md — plus `KIT_MANIFEST.json`, the bill of
  materials: every shipped file, its source, its sha256.

`demo/`, `exam/`, `calibration/`, `qa/`, `kit-src/` and
`assemble-kit.mjs` are the maker's work areas, not the
product; a distribution copy of the Kit is `kit/` + the
five documents + the manifest.

## Step 1 — Node

Node 18 or newer (`node --version`). Nothing else is
required to view the templates and the example pages.

## Step 2 — Verify the Kit is the Kit

```sh
node assemble-kit.mjs        # rebuilds kit/ from its sources
```

On the maker's tree this reproduces `KIT_MANIFEST.json`
byte-for-byte; on a copy without the sources it will
fail to find them — that failure is the check working.
To verify a received copy instead, hash the files and
compare against the manifest:

```sh
node -e "const m=require('./KIT_MANIFEST.json');const{createHash}=require('crypto');const{readFileSync}=require('fs');let bad=0;for(const f of m.files){const h=createHash('sha256').update(readFileSync(f.path)).digest('hex');if(h!==f.sha256){bad++;console.log('MISMATCH',f.path)}}console.log(bad?bad+' mismatches':'all '+m.files.length+' files match the manifest')"
```

## Step 3 — Serve it

Any static server. From this folder:

```sh
npx serve .            # or: python3 -m http.server
```

Open a template — `kit/templates/A-image-sequence/` is
the scroll-sequence shape; `kit/templates/F-configurator/`
is self-contained and needs no assets.

## Step 4 — The QA harness (optional, recommended)

The harness grades pages in a real (headless) browser:

```sh
npm install puppeteer sharp     # once, in this folder
node kit/engine/qa-harness/run-example.mjs
```

The worked example grades the Kit's own Template F and
writes `example-results.json` beside the runner. A first
run with no baseline files the baseline as its own
reported step — BASELINE-CREATED, a decision, not a
pass — then grades against it.

## Step 5 — Build your first page

CUSTOMIZE.md is the working document: pick the template
whose shape matches your product, copy it beside your
assets, and follow its README. The order the house uses:
facts first (one config module), media second, wiring
last — and the harness aimed at the page before anyone
calls it done.

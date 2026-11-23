# PROJECT 4 — PRODUCTION RECORD: THE PROJECT BOOK FILM

*Track 7 · M6 (Google Flow & AI Cinematic Production) required
output + Master Project 4. The pipeline run, its ledger, and its
flaw log — the frame pipeline's second full run, on a second
product (the Mint specimen was the first). Pipeline law:
`TRACK_6_FLOW_TO_WEBSITE_PIPELINE.md`, steps 1–8.*

## Step 1–2 · Use case and storyboard

Product: **The Project Book** (PROVADIA Catalogue, proposed
service) — "A project people can actually read." One sentence
the journey teaches: a book is a stack of named work, bound so
a stranger can read it. Storyboard: M2's output
(`m2-storyboard/STORYBOARD.md`) — boards drawn from this film's
own frames, layers named in the film's stack order.

## Step 3 · The matched pair (stills)

Generated with the house media pipeline's image tool, one
prompt family, one change only — assembled → exploded.
*(Provenance, exactly as far as the receipt goes: the
pipeline's per-generation sidecar files in `assets/` carry a
snapshot id and no model name; the model behind the tool is
not exposed to the crew, so none is claimed — here or for the
film below.)*

- **Start frame** (book whole): `assets/media-generation-book-start-frame-0-4bae91f1-8b0d-4b6a-8df1-c4c5bc02d10e.webp` — 276,382 B.
- **End frame v1**: rejected at the still (Track 3 law) — the
  cover emblem was redrawn as a different, geometric motif.
- **End frame v2** (accepted): `assets/media-generation-book-end-frame-v2-0-c98d88b9-ceb0-42f6-a90f-59aa8ddc910e.webp` — 264,100 B. The crest (laurel wreath + shield) matches the start frame; layers in order: back cover · story pages · twine bundle · diagram sheets · gold-tabbed pages · single sheet · front cover.

## Step 4 · The film — ROUTE DISCLOSURE (read this first)

**The route the Mint film took is not open to this run.**
Flow is a signed-in browser surface on the founder's Google
account; the Mint test ran in a live captain-and-founder
session. This crew run has no route to that surface, and the
house's only API door to Google's generators is fenced
free-tier-only (Army Router, Door F), which does not serve
video generation. The film was therefore produced through the
**house media pipeline's video tool** (one generation call,
the matched pair as its frames, the arc as its brief) — an
AI-generated cinematic film of the same recipe (pair → film),
**not verifiably a Flow/Veo production**. This record names
that plainly so the exam can judge it: the M6 exam's
Flow-provenance bar is graded on this disclosure, not on a
label. The unblock is named in the Phase 1 grading record.

- **Film**: `assets/media-generation-book-film-0-50fad702-17d2-4cb8-b25b-ae102e0e1139.mp4`
  — 8.000 s, 1248×704, 24 fps native, H.264 + AAC, 2,854,463 B.
- **Arc** (frame-stepped, contact sheets in `assets/`): whole
  0–1.0 s · cover lifts 1.0–2.3 s · layers separate 2.3–3.8 s ·
  stack holds 3.8–5.7 s · closes 5.7–7.4 s · whole 7.4–8.0 s.

## The cost ledger (measured, as the pipeline requires)

| Item | Cost |
|---|---|
| Start frame | 1 image generation (0 credits visible to the crew) |
| End frame v1 (rejected) | 1 image generation |
| End frame v2 | 1 image generation |
| The film | 1 video generation |
| Retries after the film | 0 — the first film was accepted inside the error budget (flaw log below) |

The media pipeline exposes no per-call credit price to the
crew; the ledger therefore counts calls, and says so. (The Mint
run's Flow ledger — 20 credits for the film, frames at 0 — is
in its own record; the two ledgers are not merged or compared
as if they were the same currency.)

## Step 5 · Flaw log (frame-stepped inspection)

Retry triggers named in advance (pipeline law): morph /
invented text / identity loss. Findings:

- **FL-1 (~0.5 s)** Gold index tabs are visible on the closed
  book's fore-edge before it opens. Reads as a design feature
  of a tabbed reference book. *Inside the error budget.*
- **FL-2 (~6.2 s)** During closing, the gold page block seen
  edge-on reads briefly as a solid gold slab — the same family
  as the Mint film's rod-stretch. *Inside the error budget.*
- **FL-3 (arrangement)** The film's held stack orders the
  bundle above the diagram sheet; the end still had it the
  other way. The film is the artifact of record — M2's
  storyboard and Project 3's callouts follow the film.
  *Logged; no retry — the stack is complete and readable.*
- **Held**: the crest emblem, the black-cloth/gold-edge
  identity, the warm upper-left light. No invented text
  anywhere (the stills were specified text-free and the film
  kept them so).

## Step 6 · The slice (frame pipeline)

`fps=30` extraction, zero-padded names, WebP:
- Desktop set 960×540, quality 72 → **240 frames, 3,297,028 B**
  (budget ≤8.5 MB ✓). Frame count = 8.000 s × 30 = 240 exactly
  — the honest count, and the first house sequence to clear
  the 240 bar the Mint specimen's 235 could not.
- Mobile set 480×270, quality 68 → **240 frames, 1,257,298 B**
  (budget ≤1.5 MB ✓).
- Sets live with Project 3 (`project-3-sequence-listing/`);
  the pipeline as a repeatable run is filed at
  `engine/frame-pipeline/PIPELINE.md`.

## Steps 7–8 · Integration

The film integrated as a responsive, interactive page:
`index.html` in this folder (film-led presentation with
chapter control and the delivery facts). The frame sequence
integration is Project 3's listing. No 3D stage was added —
the pipeline's decision rule (step 8): the film already lets
the visitor inspect the mechanism; a 3D stage would repeat
it, so it is cut.

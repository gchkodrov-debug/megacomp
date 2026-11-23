# ENGINE · THE FRAME PIPELINE — a run a seat can run cold

*Engine component (Track 7 · M5+M6 donation, born in Projects
3–4). The documented run that turns a product into a
scroll-controlled frame sequence. Proven end-to-end twice:
the Mint specimen (Tracks 5/6, 235 frames) and the Project
Book (Track 7 Phase 1, 240 frames). Standing law:
`TRACK_6_FLOW_TO_WEBSITE_PIPELINE.md` steps 1–8 — this file is
its executable form.*

## The run

1. **Spec first.** Name the product, the one sentence the
   journey teaches, and the layers in the order the exploded
   frame will show them. No spec, no generation.
2. **The matched pair.** Two stills, one prompt family, one
   change only: assembled → exploded. Same object, materials,
   lighting, style tail; text-free unless the product's real
   face carries text (then the real asset is the ingredient,
   never a redraw). *Reject at the still*: an end frame that
   redraws the product's identity (emblem, face, proportions)
   is regenerated before any film is bought.
3. **The film.** Frames-to-video on the pair, the arc in one
   sentence: whole → opens → separates into the named stack →
   holds → reassembles → whole. One generation; inspect
   before any retry. Retry triggers named in advance: morph,
   invented text, identity loss. Anything else ships inside
   the error budget and is logged, not hidden.
4. **Inspect.** Frame-step the transitions; write the flaw
   log with timestamps. The film — not the still — is the
   artifact of record: if its stack order differs from the
   still's, the storyboard and callouts follow the film.
5. **Slice.** `ffmpeg -i film -vf "fps=30,scale=960:540"
   -c:v libwebp -quality 72 -compression_level 6 f%03d.webp`
   for desktop; `scale=480:270 -quality 68` for mobile.
   Frame count = duration × 30, exactly — never rounded.
   For a ≥240-frame sequence the film must run ≥8.00 s.
6. **Budgets, verified by `du`, not by hope:** desktop set
   ≤8.5 MB, mobile set ≤1.5 MB. If a set is over, lower the
   WebP quality in steps of 4 and re-measure; never thin the
   frame count to fit (the player's own step-thinning owns
   small screens at runtime).
7. **Hand to the player.** Frames + a storyboard (M2's
   contract: windows, tips measured on the film's frames,
   copy spec-true) are the player's whole input. The player
   is configuration-driven; a pipeline run never edits
   component code.

## Measured costs of the two proven runs

| Run | Stills | Film | Desktop set | Mobile set |
|---|---|---|---|---|
| Mint (Flow, Veo Fast) | pair at 0 credits | 20 credits, 7.85 s | 235 frames, 6,302,660 B | 235 frames, 1,486,596 B |
| Project Book (house media pipeline) | 3 image calls (1 rejected) | 1 video call, 8.000 s | 240 frames, 3,297,028 B | 240 frames, 1,257,298 B |

*Currencies differ per route and are never merged; each run's
own record carries its own ledger (Project 4's is
`project-4-film/PRODUCTION_RECORD.md`).*

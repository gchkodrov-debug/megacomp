# CUSTOMIZE — make the Kit yours

*The working document. Everything a builder changes, in
the order the house changes it: facts, look, shape,
budgets. Each section names the file that owns the thing
— a fact that lives in two places is a defect with a
deadline.*

## 1. Facts first — one config module per page

Every page renders from a single module (the templates
call it `page-config.js`): the product, its parts, its
sequence, its film. The page reads it; the QA unit specs
run against it; the accessible alternative takes its
facts from it by reference. Write your product's facts
there and nowhere else — names, part lists, prices,
frame counts, byte counts. When a number changes, it
changes in the config, and every surface follows.

## 2. The look — design tokens

`kit/engine/foundation/tokens.css` carries the design
tokens (colour, type, spacing) and `base.css` the
foundation styles. Restyle there; components consume
tokens, so a re-tokened page is a coherent page. Keep
the contrast discipline: the a11y gate computes body
contrast from the rendered page, and the house floor is
the WCAG ratio, not a hope.

## 3. The shape — pick a template, then grow it

| Template | Shape | Start here when |
|---|---|---|
| A | Image sequence | the product explains itself by coming apart (or together) under scroll |
| B | Video-driven | a film carries the argument and the page supports it |
| C | Real-time 3D | the visitor's questions are spatial — turn it, zoom it, inspect it |
| D | Shader-driven | transitions themselves are the brand moment |
| E | Hybrid | film + sequence + live 3D on one product, one config |
| F | Configurator | the visitor assembles a variant and watches the price |
| G | Immersive storytelling | a journey through scenes, scroll-steered |

Copy the template folder out of `kit/templates/` to your
site's root, copy the `kit/engine/` and `kit/vendor/`
files it references beside it (the templates load them
by relative path), and replace the worked example's
facts with your config module. Each template's README
names its worked example and its standing warnings —
read it before wiring, not after.

## 4. Your assets — the budgets are the contract

- **Models**: ≤5 MB, ≤250k triangles, ≤500 draw calls —
  the cleanup gate. Export for the web consumer
  (animations off for a static model, cameras and lights
  out, modifiers applied) and parse the exported file
  back before printing any number about it.
- **Frame sets**: ≤8.5 MB desktop / ≤1.5 MB mobile,
  total per product, WebP, from the frame pipeline
  (`kit/engine/frame-pipeline/PIPELINE.md`): matched
  start/end frames → film → 30 fps slice → both sets.
- **Films**: captioned, always; the accessible
  alternative describes what the film shows in words.
- **The sequence player** needs the page to kick it: the
  player owns no scroll listener — wire a scroll listener
  that calls `kick()`, or the journey stands frozen at
  frame 1 with no error anywhere. The harness samples
  displayed frames for exactly this reason.

## 5. Budgets — declare your page's class

In your page's QA config, before any run:

```js
perf: {
  pageClass: 'N',              // or 'W' — see below
  budgets: { maxLayoutReads: 50, maxLongTaskMs: 250, maxCls: 0.1, maxLcpMs: 2500 },
  // class W only:
  offscreen: { selector: '#stage-canvas' },
}
```

The numbers live under `budgets` — the gate reads them
there and nowhere else. **Class N** is a page with no
continuously-rendered stage; **class W** is a page with
one (WebGL or canvas): it swaps the whole-window
long-task bar for the lab regression ceiling and adds
the off-screen probe, which requires `offscreen.selector`
naming the stage. BUDGETS.md derives both classes from
filed measurements — read it before overriding a number,
and never change a budget after a run has failed it:
that is not a budget, it is a wish.

## 6. The accessible alternative — a build mode

Every cinematic page ships its complete alternative
presentation beside it (`kit/engine/accessibility/`):
content-complete, facts by reference from the same
config module, no scripts required. It is graded as a
full presentation in its own right. Reduced motion is a
designed state of the main page too: the animation
system creates no scroll triggers under
`prefers-reduced-motion`, and the sequence player ships
its reduced path — check both on a real device setting,
not by assertion.

## 7. Grade it before you ship it

Aim the QA harness at the finished page
(`kit/engine/qa-harness/`): unit specs against your
config module, a journey a visitor would actually walk,
a visual baseline filed as a decision, the a11y floor,
and the perf gate under your declared class. Five gates,
filed results. A page that misses a bar does not ship —
and a gate that lets a defective page through is the
thing that gets fixed.

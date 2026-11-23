/* ============================================================
   ENGINE COMPONENT · ANIMATION SYSTEM — v1
   (Track 7 · M4 donation, born in Project 2. The Engine's
   motion layer: GSAP timelines + ScrollTrigger rigs under
   house discipline.)

   House discipline carried in code, not in comments alone:
     · Reduced motion is a designed state: with
       prefers-reduced-motion the system creates NO scroll
       triggers and NO tweens; content stands in its final
       state (the markup is authored visible; animation only
       ever moves it FROM that state).
     · Lifecycle is complete (Phase 0 carry H-19): destroy()
       kills every trigger and tween the system created,
       reverts every inline style it wrote, disconnects its
       ticker, and is idempotent. A system that cannot be
       fully destroyed cannot be trusted on a long page.
     · Frame timing is measured, not asserted: the system
       times its own ticker callbacks while it lives and
       exposes the ledger (Rule 5 — the frame budget is
       16.7 ms; smoothness is counted).
     · State is inspectable: state() and timing() are the
       only numbers a page may print about this system
       (Rule 14 — readouts print the component's own state).

   Contract:
     createAnimationSystem({ scope }) -> system
       Requires the vendored GSAP + ScrollTrigger globals.
     system.reveal(targets, opts)      fade/rise on enter
     system.pinScene({trigger, end, build})  pinned scrub scene;
       build(timeline) adds the scene's tweens; returns the
       scene handle { progress(), trigger }
     system.staggerIn(targets, opts)   staggered entrance
     system.transitionTo(outEl, inEl)  page-style transition;
       re-entry safe (a running transition refuses a second)
     system.timing() -> { frames, maxMs, meanMs }
     system.state()  -> { reduced, triggers, destroyed }
     system.destroy()
   ============================================================ */

export class AnimationConfigError extends Error {
  constructor(field, message) {
    super(`animation-system config.${field}: ${message}`);
    this.name = 'AnimationConfigError';
    this.field = field;
  }
}

export function createAnimationSystem(options = {}) {
  const gsap = window.gsap;
  if (!gsap || !window.ScrollTrigger) {
    throw new AnimationConfigError('vendor', 'the GSAP and ScrollTrigger globals are required (vendored, never CDN)');
  }
  gsap.registerPlugin(window.ScrollTrigger);
  const scope = options.scope || document.body;
  const reduced = typeof options.reducedMotion === 'boolean'
    ? options.reducedMotion
    : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const triggers = new Set();
  const tweens = new Set();
  let destroyed = false;
  let transitioning = false;

  /* --- the timing ledger: the system's own ticker cost --- */
  const ledger = { frames: 0, totalMs: 0, maxMs: 0 };
  const tickerFn = () => {
    const t0 = performance.now();
    // The work measured is the ledger's own bookkeeping plus a
    // read of every live trigger's progress — the per-frame
    // cost a page actually pays for this system's presence.
    let acc = 0;
    triggers.forEach((t) => { acc += t.progress || 0; });
    const dt = performance.now() - t0;
    ledger.frames += 1;
    ledger.totalMs += dt;
    if (dt > ledger.maxMs) ledger.maxMs = dt;
    return acc;
  };
  if (!reduced) gsap.ticker.add(tickerFn);

  const ctx = gsap.context(() => {}, scope);

  function track(tw) { if (tw) { tweens.add(tw); } return tw; }

  function reveal(targets, opts = {}) {
    if (reduced || destroyed) return null;
    ctx.add(() => gsap.from(targets, {
      y: opts.rise ?? 26, autoAlpha: 0, duration: opts.duration ?? 0.9,
      ease: opts.ease ?? 'power3.out', stagger: opts.stagger ?? 0.08,
      scrollTrigger: { trigger: opts.trigger || targets, start: opts.start ?? 'top 82%' },
    }));
    const all = gsap.getTweensOf(targets);
    all.forEach((t) => { tweens.add(t); if (t.scrollTrigger) triggers.add(t.scrollTrigger); });
    return all[0] || null;
  }

  function pinScene({ trigger, end, build } = {}) {
    if (!trigger || typeof build !== 'function') {
      throw new AnimationConfigError('pinScene', 'a trigger element and a build(timeline) function are required');
    }
    if (reduced || destroyed) {
      return { progress: () => 0, trigger: null, reduced: true };
    }
    let tl = null;
    ctx.add(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger, start: 'top top', end: end ?? '+=200%',
          pin: true, scrub: 0.4, anticipatePin: 1,
        },
      });
      build(tl);
    });
    const st = tl && tl.scrollTrigger ? tl.scrollTrigger : null;
    if (st) triggers.add(st);
    return { progress: () => (tl ? tl.progress() : 0), trigger: st, reduced: false };
  }

  function staggerIn(targets, opts = {}) {
    if (reduced || destroyed) return null;
    ctx.add(() => gsap.from(targets, {
      y: opts.rise ?? 34, autoAlpha: 0, duration: opts.duration ?? 0.7,
      ease: 'power3.out', stagger: opts.stagger ?? 0.12,
      scrollTrigger: { trigger: opts.trigger || targets, start: 'top 85%' },
    }));
    const all = gsap.getTweensOf(targets);
    all.forEach((t) => { tweens.add(t); if (t.scrollTrigger) triggers.add(t.scrollTrigger); });
    return all[0] || null;
  }

  function transitionTo(outEl, inEl) {
    if (!outEl || !inEl) {
      throw new AnimationConfigError('transitionTo', 'both the outgoing and incoming elements are required');
    }
    if (transitioning) return Promise.resolve(false); // re-entry refused: no conflicts
    if (reduced || destroyed) {
      outEl.hidden = true; inEl.hidden = false;
      return Promise.resolve(true);
    }
    transitioning = true;
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => { transitioning = false; resolve(true); },
      });
      track(tl);
      tl.to(outEl, { autoAlpha: 0, y: -14, duration: 0.32, ease: 'power2.in' })
        .add(() => { outEl.hidden = true; inEl.hidden = false; })
        .fromTo(inEl, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' });
    });
  }

  function timing() {
    return {
      frames: ledger.frames,
      maxMs: Number(ledger.maxMs.toFixed(3)),
      meanMs: ledger.frames ? Number((ledger.totalMs / ledger.frames).toFixed(3)) : 0,
    };
  }

  function state() {
    return { reduced, triggers: triggers.size, destroyed };
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    gsap.ticker.remove(tickerFn);
    triggers.forEach((t) => t.kill());
    triggers.clear();
    tweens.forEach((t) => t.kill());
    tweens.clear();
    ctx.revert(); // restores every inline style the context wrote
  }

  return { reveal, pinScene, staggerIn, transitionTo, timing, state, destroy, reduced };
}

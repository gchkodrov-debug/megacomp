/* ============================================================
   ENGINE COMPONENT · SCENE NAVIGATION + HOTSPOTS (M12, Phase 3)
   Donated by Project 10 (the architecture walkthrough);
   Project 8's turntable is the same shape in one dimension.

   A scene navigation owns three things and nothing else:
     · the scene list (id + title), in walking order;
     · where the visitor is headed (the machine's context) —
       entering a scene is a GOTO, landing is a SETTLE, and
       entering another scene mid-flight simply retargets
       (the state machine's interruption semantics);
     · the hotspot registry — inspect points that belong to
       scenes, at most one open at a time; opening one closes
       another; leaving a scene closes its hotspot.

   Rendering is the page's job: the page reads state() and
   chases it. This component never touches the DOM, so it is
   unit-testable in Node (the M16 harness does exactly that).

   Contract:
     createSceneNav({
       scenes: [{ id, title }],          // >= 1, unique ids
       hotspots: [{ id, scene, title }], // scene must exist
       initial: scenes[0].id (default),
     }) -> {
       state(): { scene, targetScene, moving, hotspot },
       enter(id) -> bool, next() -> bool, prev() -> bool,
       settle() -> bool,                  // the page's chase calls this on landing
       openHotspot(id) -> bool, closeHotspot() -> bool,
       sceneList, hotspotsFor(sceneId),
     }
   ============================================================ */

import { createStateMachine } from './state-machine.js';

export function createSceneNav(def) {
  if (!def || !Array.isArray(def.scenes) || def.scenes.length < 1) {
    throw new TypeError('scene-nav: scenes (a non-empty array) are required');
  }
  const scenes = def.scenes.map((s) => ({ id: s.id, title: s.title }));
  const ids = new Set(scenes.map((s) => s.id));
  if (ids.size !== scenes.length) throw new TypeError('scene-nav: scene ids must be unique');
  const hotspots = (def.hotspots || []).map((h) => ({ ...h }));
  for (const h of hotspots) {
    if (!ids.has(h.scene)) throw new TypeError(`scene-nav: hotspot "${h.id}" names unknown scene "${h.scene}"`);
  }
  const initial = def.initial || scenes[0].id;
  if (!ids.has(initial)) throw new TypeError(`scene-nav: initial scene "${initial}" is not in scenes`);

  const gotoScene = (ctx, id) => {
    if (!ids.has(id)) return { veto: true };
    if (id === ctx.targetScene && ctx.scene === id) return { veto: true };
    return { state: 'moving', context: { targetScene: id, hotspot: null } };
  };

  const machine = createStateMachine({
    initial: 'settled',
    context: { scene: initial, targetScene: initial, hotspot: null },
    states: {
      settled: { on: {
        GOTO: gotoScene,
        OPEN: (ctx, id) => {
          const h = hotspots.find((x) => x.id === id);
          if (!h || h.scene !== ctx.scene) return { veto: true };
          return { context: { hotspot: id } };
        },
        CLOSE: (ctx) => (ctx.hotspot ? { context: { hotspot: null } } : { veto: true }),
      } },
      moving: { on: {
        GOTO: gotoScene,
        SETTLE: (ctx) => ({ state: 'settled', context: { scene: ctx.targetScene } }),
        CLOSE: (ctx) => (ctx.hotspot ? { context: { hotspot: null } } : { veto: true }),
      } },
    },
  });

  const idx = () => scenes.findIndex((s) => s.id === machine.context().targetScene);
  return {
    state() {
      const c = machine.context();
      return { scene: c.scene, targetScene: c.targetScene, moving: machine.state() === 'moving', hotspot: c.hotspot };
    },
    enter: (id) => machine.send('GOTO', id),
    settle: () => machine.send('SETTLE'),
    next() {
      const i = idx();
      return i < scenes.length - 1 ? machine.send('GOTO', scenes[i + 1].id) : false;
    },
    prev() {
      const i = idx();
      return i > 0 ? machine.send('GOTO', scenes[i - 1].id) : false;
    },
    openHotspot: (id) => machine.send('OPEN', id),
    closeHotspot: () => machine.send('CLOSE'),
    sceneList: scenes,
    hotspotsFor: (sceneId) => hotspots.filter((h) => h.scene === sceneId),
    hotspotById: (id) => hotspots.find((h) => h.id === id) || null,
  };
}

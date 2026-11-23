/* THE ENGINE · CAMERA CHOREOGRAPHY SYSTEM (M11 · Project 7)
 *
 * A scroll-steered camera rig. The author writes KEYFRAMES —
 * { at, position, target } — and the rig answers poseAt(t)
 * for any t in [0, 1]: where the camera is, and what it looks
 * at, as one continuous motion with no cuts.
 *
 * The path is a Catmull-Rom spline through the keyframe
 * positions (and, separately, through the targets), evaluated
 * as cubic Bézier segments — the curve M3's library teaches:
 * for the segment from P1 to P2 with neighbours P0 and P3,
 * the Bézier control points are
 *   B0 = P1            B1 = P1 + (P2 − P0)/6
 *   B2 = P2 − (P3 − P1)/6            B3 = P2
 * which is what makes the curve pass THROUGH every keyframe
 * with matching tangents on both sides — continuity by
 * construction, not by hope. Endpoints are duplicated to
 * close the first and last segments.
 *
 * Time is warped by the keyframes' own `at` values: between
 * keyframes i and i+1 the local parameter runs 0→1 as t runs
 * at[i]→at[i+1], so an author can give one leg of the journey
 * more scroll than another without moving any keyframe.
 *
 * Pure mathematics — no DOM, no renderer. Loads in the
 * browser (window.CameraRig) and in Node (module.exports)
 * so the harness tests the same bytes the page flies.
 */
(function (global) {
  'use strict';

  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];

  function cubicBezier(p0, p1, p2, p3, t) {
    const u = 1 - t;
    const w0 = u * u * u, w1 = 3 * u * u * t, w2 = 3 * u * t * t, w3 = t * t * t;
    return [
      w0 * p0[0] + w1 * p1[0] + w2 * p2[0] + w3 * p3[0],
      w0 * p0[1] + w1 * p1[1] + w2 * p2[1] + w3 * p3[1],
      w0 * p0[2] + w1 * p1[2] + w2 * p2[2] + w3 * p3[2],
    ];
  }

  /* One Catmull-Rom segment: points[i] → points[i+1], with the
     array's ends duplicated by the caller. */
  function crSegment(points, i, u) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const b1 = add(p1, scale(sub(p2, p0), 1 / 6));
    const b2 = sub(p2, scale(sub(p3, p1), 1 / 6));
    return cubicBezier(p1, b1, b2, p2, u);
  }

  function createRig(keyframes) {
    if (!Array.isArray(keyframes) || keyframes.length < 2) {
      throw new Error('camera rig: at least two keyframes are required');
    }
    keyframes.forEach((k, i) => {
      if (typeof k.at !== 'number' || !Array.isArray(k.position) || !Array.isArray(k.target)) {
        throw new Error(`camera rig: keyframe ${i} needs { at, position[3], target[3] }`);
      }
      if (i > 0 && !(k.at > keyframes[i - 1].at)) {
        throw new Error('camera rig: keyframe "at" values must strictly increase');
      }
    });
    if (keyframes[0].at !== 0 || keyframes[keyframes.length - 1].at !== 1) {
      throw new Error('camera rig: keyframes must span at 0 to at 1');
    }
    const positions = keyframes.map((k) => k.position);
    const targets = keyframes.map((k) => k.target);

    function poseAt(tRaw) {
      const t = Math.min(1, Math.max(0, tRaw));
      let seg = keyframes.length - 2;
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (t <= keyframes[i + 1].at) { seg = i; break; }
      }
      const a = keyframes[seg], b = keyframes[seg + 1];
      const u = (t - a.at) / (b.at - a.at);
      return {
        position: crSegment(positions, seg, u),
        target: crSegment(targets, seg, u),
        segment: seg, localT: u, t,
      };
    }

    /* The path's approximate length, by dense sampling — the
       number a continuity budget is set from. */
    function pathLength(samples = 400) {
      let len = 0, prev = poseAt(0).position;
      for (let i = 1; i <= samples; i++) {
        const p = poseAt(i / samples).position;
        len += Math.hypot(p[0] - prev[0], p[1] - prev[1], p[2] - prev[2]);
        prev = p;
      }
      return len;
    }

    return { poseAt, pathLength, keyframes };
  }

  const api = { createRig, cubicBezier };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.CameraRig = api;
})(typeof window !== 'undefined' ? window : globalThis);

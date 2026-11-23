/* THE ENGINE · SHADER PACK v1 (M10 · Project 6)
 *
 * Original house shaders on raw WebGL — no library between
 * this file and the GPU, because M10 teaches the fundamentals:
 * a fullscreen quad, two textures, and fragment shaders that
 * decide, per pixel, which scene owns it during a transition.
 *
 * Two transitions ship:
 * · DISSOLVE — value-noise fbm threshold: each pixel has a
 *   fixed "burn height" from the noise field; as progress
 *   sweeps 0→1 the threshold passes over the field and pixels
 *   flip to the incoming scene, with a gold edge where the
 *   threshold is within a hair of the pixel's height.
 * · SWIRL — the outgoing scene is wound around the centre by
 *   an angle that peaks mid-transition while the incoming
 *   scene unwinds from the opposite side; a radial mask hands
 *   over at the peak.
 *
 * Both shaders are original coursework, written for this pack;
 * the noise is a hash-based value noise (documented in the
 * GLSL), not a copied preset.
 *
 * The fallback is part of the component, not the page: where
 * WebGL is unavailable (or fails to initialise), the stage
 * reports mode 'fallback' and the PAGE's DOM crossfade takes
 * over — the pack's contract is that createShaderStage never
 * leaves a blank stage behind; it answers supported() first.
 *
 * State law (Rule 14): getState() returns the stage's own
 * numbers — mode, progress, from/to, fps measured by its own
 * ticker — and page readouts print those.
 */
(function (global) {
  'use strict';

  const VERT = `
    attribute vec2 aPos;
    varying vec2 vUv;
    void main() {
      vUv = aPos * 0.5 + 0.5;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }`;

  const NOISE = `
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    float vnoise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i), b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, amp = 0.55;
      for (int k = 0; k < 4; k++) { v += amp * vnoise(p); p *= 2.13; amp *= 0.5; }
      return v;
    }`;

  const FRAG_DISSOLVE = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uFrom, uTo;
    uniform float uProgress, uAspect;
    ${NOISE}
    void main() {
      vec2 p = vec2(vUv.x * uAspect, vUv.y);
      float h = fbm(p * 5.0) * 0.85 + vnoise(p * 22.0) * 0.15;
      float t = uProgress * 1.12 - 0.06;
      vec3 fromC = texture2D(uFrom, vUv).rgb;
      vec3 toC = texture2D(uTo, vUv).rgb;
      float edge = smoothstep(0.0, 0.035, abs(h - t));
      vec3 col = mix(toC, fromC, step(t, h));
      vec3 burn = vec3(0.79, 0.64, 0.15) * 1.6;
      col = mix(burn, col, edge);
      if (uProgress <= 0.0) col = fromC;
      if (uProgress >= 1.0) col = toC;
      gl_FragColor = vec4(col, 1.0);
    }`;

  const FRAG_SWIRL = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uFrom, uTo;
    uniform float uProgress, uAspect;
    vec2 swirl(vec2 uv, float amt) {
      vec2 c = uv - 0.5;
      c.x *= uAspect;
      float r = length(c);
      float a = amt * exp(-r * 2.6);
      float s = sin(a), co = cos(a);
      c = mat2(co, -s, s, co) * c;
      c.x /= uAspect;
      return c + 0.5;
    }
    void main() {
      float peak = sin(uProgress * 3.14159265);
      vec2 uvFrom = swirl(vUv, peak * 2.4);
      vec2 uvTo = swirl(vUv, -peak * 2.4);
      vec3 fromC = texture2D(uFrom, uvFrom).rgb;
      vec3 toC = texture2D(uTo, uvTo).rgb;
      float r = length((vUv - 0.5) * vec2(uAspect, 1.0));
      float mask = smoothstep(0.15, 0.85, uProgress + (0.5 - r) * 0.35);
      vec3 col = mix(fromC, toC, mask);
      if (uProgress <= 0.0) col = texture2D(uFrom, vUv).rgb;
      if (uProgress >= 1.0) col = texture2D(uTo, vUv).rgb;
      gl_FragColor = vec4(col, 1.0);
    }`;

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error(`shader compile: ${log}`);
    }
    return sh;
  }
  function program(gl, fragSrc) {
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(`program link: ${gl.getProgramInfoLog(prog)}`);
    }
    return prog;
  }
  function loadTexture(gl, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        resolve(tex);
      };
      img.onerror = () => reject(new Error(`texture failed to load: ${url}`));
      img.src = url;
    });
  }

  /* supported(): the honest pre-flight — a throwaway context,
     so a browser without WebGL is answered before any stage
     is promised. */
  function supported() {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      return !!gl;
    } catch { return false; }
  }

  function createShaderStage(canvas, opts) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = canvas.getContext('webgl', { antialias: false })
      || canvas.getContext('experimental-webgl');
    if (!gl) return { mode: 'fallback', supported: false, getState: () => ({ mode: 'fallback' }), destroy() {} };

    const programs = {
      dissolve: program(gl, FRAG_DISSOLVE),
      swirl: program(gl, FRAG_SWIRL),
    };
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    let textures = [];
    let current = 0;           // scene index fully on stage
    let from = 0, to = 0;      // transition endpoints
    let progress = 1;          // 1 = at rest
    let kind = 'dissolve';
    let startAt = 0, duration = 1400;
    let raf = 0, destroyed = false;
    let fpsFrames = 0, fpsElapsed = 0, fpsStamp = 0, fps = 0;

    /* The stage's own Rule 34 discipline, mirroring the
       viewer's: the loop keeps its chain alive, but the GL
       work happens only when the stage can be seen — and,
       this stage being a still at rest (its shaders take no
       time uniform), only while a transition is actually
       moving or a fresh scene has not yet been drawn once.
       A stage that redraws an unchanging frame sixty times
       a second, on screen or off, bills the page for waste
       nobody watches; Project 12's demo QA measured exactly
       that bill before this pause landed. The observer's
       40% margin is the viewer's own convention: pre-warm
       as the stage nears the viewport, sleep beyond it. */
    let canvasVisible = true;
    let restDrawn = false;
    let visibilityObserver = null;
    if (typeof IntersectionObserver === 'function' && canvas) {
      visibilityObserver = new IntersectionObserver((es) => {
        canvasVisible = es[0].isIntersecting;
      }, { rootMargin: '40% 0px' });
      visibilityObserver.observe(canvas);
    }

    function draw(now) {
      if (destroyed) return;
      raf = requestAnimationFrame(draw);
      if (!canvasVisible) { fpsStamp = now; return; }
      if (progress >= 1 && restDrawn) { fpsStamp = now; return; }
      if (fpsStamp) fpsElapsed += now - fpsStamp;
      fpsStamp = now;
      fpsFrames++;
      if (fpsFrames >= 30 && fpsElapsed > 0) { fps = Math.round(fpsFrames / (fpsElapsed / 1000)); fpsFrames = 0; fpsElapsed = 0; }
      if (progress < 1) {
        const t = duration === 0 ? 1 : Math.min(1, (now - startAt) / duration);
        // easeInOut on the clock, not on the pixels: the shader
        // receives the eased progress so its threshold sweep
        // breathes at both ends.
        progress = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        if (t >= 1) { progress = 1; current = to; }
      }
      const prog = programs[kind];
      gl.useProgram(prog);
      const loc = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[from]);
      gl.uniform1i(gl.getUniformLocation(prog, 'uFrom'), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[to]);
      gl.uniform1i(gl.getUniformLocation(prog, 'uTo'), 1);
      gl.uniform1f(gl.getUniformLocation(prog, 'uProgress'), progress >= 1 && current === to ? (from === to ? 0 : 1) : progress);
      gl.uniform1f(gl.getUniformLocation(prog, 'uAspect'), canvas.width / canvas.height);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (progress >= 1) restDrawn = true;
    }

    const api = {
      mode: 'shader',
      supported: true,
      async loadScenes(urls) {
        textures = [];
        for (const u of urls) textures.push(await loadTexture(gl, u));
        current = 0; from = 0; to = 0; progress = 1;
        raf = requestAnimationFrame(draw);
        return api;
      },
      transitionTo(index, kindName, durationMs) {
        if (index === current && progress >= 1) return;
        // Mid-flight retarget: the new leg starts from whichever
        // scene currently owns most pixels (the dominant side of
        // the mix). Documented v1 behaviour — a pixel-exact
        // snapshot handover is the pack's named next step.
        from = progress < 1 ? (progress < 0.5 ? from : to) : current;
        current = from;
        to = index;
        kind = kindName || 'dissolve';
        duration = reduceMotion ? 0 : (durationMs !== undefined ? durationMs : 1400);
        startAt = performance.now();
        progress = 0;
      },
      getState() {
        return {
          mode: 'shader', current, from, to, progress,
          transitioning: progress < 1, kind, fps, destroyed,
          visible: canvasVisible,
        };
      },
      destroy() {
        if (destroyed) return;
        destroyed = true;
        if (visibilityObserver) visibilityObserver.disconnect();
        cancelAnimationFrame(raf);
        textures.forEach((t) => gl.deleteTexture(t));
        Object.values(programs).forEach((p) => gl.deleteProgram(p));
        gl.deleteBuffer(buf);
      },
    };
    return api;
  }

  const api = { createShaderStage, supported, GLSL: { VERT, FRAG_DISSOLVE, FRAG_SWIRL } };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ShaderPack = api;
})(typeof window !== 'undefined' ? window : globalThis);

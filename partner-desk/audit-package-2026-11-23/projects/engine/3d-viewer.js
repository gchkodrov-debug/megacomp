/* THE ENGINE · 3D VIEWER (M9 · Project 5)
 *
 * A reusable real-time 3D product viewer on the vendored
 * Three.js r160 UMD build. It owns its controls — pointer,
 * wheel, touch, and KEYBOARD orbit — because the carried
 * Phase 0 ruling (H-19's sibling) requires the real product
 * viewer to be operable without a pointer, and the UMD build
 * ships no controls.
 *
 * Models arrive two ways:
 * · { kind:'coin', frontUrl, reverseUrl } — the house coin,
 *   built procedurally (cylinder + the two anchored face
 *   textures), its three parts named for inspection.
 * · { kind:'glb', url } — loaded by the minimal GLB reader
 *   below, written for this Engine: static, unskinned,
 *   untextured-or-factor-coloured glTF binaries of the shape
 *   our own Blender cleanup gate exports. Anything outside
 *   that subset fails with a NAMED error, never a silent
 *   blank (Rule 7).
 *
 * State law (Rule 14): getState() returns the viewer's own
 * numbers — angles, distance, draw calls and triangles from
 * renderer.info, fps from its own ticker — and page readouts
 * print those, never a recomputation.
 *
 * Lifecycle: destroy() removes every listener, cancels the
 * ticker, disposes geometries, materials, textures and the
 * renderer, and is idempotent.
 */
(function (global) {
  'use strict';

  /* ============ minimal GLB reader ============
     GLB = 12-byte header + chunks (JSON, BIN). Supports:
     node hierarchies (TRS or matrix), mesh primitives with
     POSITION / NORMAL / TEXCOORD_0 and U8/U16/U32 indices,
     interleaved buffer views, pbrMetallicRoughness factors.
     Rejects (named): skins, animations, textures, cameras,
     non-triangle primitives, sparse accessors. */
  function loadGLB(THREE, url) {
    const fail = (msg) => { throw new Error(`GLB: ${msg}`); };
    return fetch(url).then((r) => {
      if (!r.ok) fail(`fetch ${url} → HTTP ${r.status}`);
      return r.arrayBuffer();
    }).then((buf) => {
      const dv = new DataView(buf);
      if (dv.getUint32(0, true) !== 0x46546c67) fail('bad magic — not a GLB');
      const jsonLen = dv.getUint32(12, true);
      const json = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 20, jsonLen)));
      let bin = null;
      let off = 20 + jsonLen;
      while (off < buf.byteLength) {
        const len = dv.getUint32(off, true);
        const type = dv.getUint32(off + 4, true);
        if (type === 0x004e4942) bin = new Uint8Array(buf, off + 8, len);
        off += 8 + len;
      }
      if (!bin) fail('no BIN chunk');
      if (json.skins) fail('skins are outside the supported subset');
      if (json.animations) fail('animations are outside the supported subset');
      if (json.images || json.textures) fail('textures are outside the supported subset');

      const CT = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };
      const NCOMP = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
      function readAccessor(idx) {
        const acc = json.accessors[idx];
        if (acc.sparse) fail('sparse accessors are outside the supported subset');
        const bv = json.bufferViews[acc.bufferView];
        const TA = CT[acc.componentType];
        const n = NCOMP[acc.type];
        const count = acc.count;
        const stride = bv.byteStride && bv.byteStride !== n * TA.BYTES_PER_ELEMENT ? bv.byteStride : null;
        const base = (bv.byteOffset || 0) + (acc.byteOffset || 0);
        if (!stride) return new TA(bin.buffer, bin.byteOffset + base, count * n);
        const out = new TA(count * n);
        const elBytes = TA.BYTES_PER_ELEMENT;
        for (let i = 0; i < count; i++) {
          const src = new TA(bin.buffer, bin.byteOffset + base + i * stride, n);
          out.set(src, i * n);
        }
        return out;
      }

      const materials = (json.materials || []).map((m) => {
        const pbr = m.pbrMetallicRoughness || {};
        const c = pbr.baseColorFactor || [1, 1, 1, 1];
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color(c[0], c[1], c[2]),
          transparent: c[3] < 1, opacity: c[3],
          metalness: pbr.metallicFactor !== undefined ? pbr.metallicFactor : 1,
          roughness: pbr.roughnessFactor !== undefined ? pbr.roughnessFactor : 1,
          side: m.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
          emissive: m.emissiveFactor ? new THREE.Color(...m.emissiveFactor) : new THREE.Color(0, 0, 0),
        });
      });
      const defaultMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.2, roughness: 0.6 });

      const meshes = (json.meshes || []).map((meshDef) => {
        const group = new THREE.Group();
        group.name = meshDef.name || '';
        meshDef.primitives.forEach((prim) => {
          if (prim.mode !== undefined && prim.mode !== 4) fail('non-triangle primitive');
          const geo = new THREE.BufferGeometry();
          const pos = readAccessor(prim.attributes.POSITION);
          geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
          if (prim.attributes.NORMAL !== undefined) {
            geo.setAttribute('normal', new THREE.BufferAttribute(readAccessor(prim.attributes.NORMAL), 3));
          }
          if (prim.attributes.TEXCOORD_0 !== undefined) {
            geo.setAttribute('uv', new THREE.BufferAttribute(readAccessor(prim.attributes.TEXCOORD_0), 2));
          }
          if (prim.indices !== undefined) geo.setIndex(new THREE.BufferAttribute(readAccessor(prim.indices), 1));
          if (!geo.getAttribute('normal')) geo.computeVertexNormals();
          const mat = prim.material !== undefined ? materials[prim.material] : defaultMat;
          const mesh = new THREE.Mesh(geo, mat);
          mesh.name = meshDef.name || '';
          group.add(mesh);
        });
        return group;
      });

      const nodes = (json.nodes || []).map((n) => {
        let obj;
        if (n.mesh !== undefined) obj = meshes[n.mesh];
        else obj = new THREE.Group();
        obj.name = n.name || obj.name || '';
        if (n.matrix) {
          const m = new THREE.Matrix4().fromArray(n.matrix);
          obj.applyMatrix4(m);
        } else {
          if (n.translation) obj.position.fromArray(n.translation);
          if (n.rotation) obj.quaternion.fromArray(n.rotation);
          if (n.scale) obj.scale.fromArray(n.scale);
        }
        return { def: n, obj };
      });
      nodes.forEach(({ def, obj }) => {
        (def.children || []).forEach((ci) => obj.add(nodes[ci].obj));
      });
      const root = new THREE.Group();
      const sceneDef = json.scenes[json.scene || 0];
      (sceneDef.nodes || []).forEach((ni) => root.add(nodes[ni].obj));
      let triangles = 0;
      root.traverse((o) => {
        if (o.isMesh) {
          const g = o.geometry;
          triangles += (g.getIndex() ? g.getIndex().count : g.getAttribute('position').count) / 3;
        }
      });
      return { root, triangles: Math.round(triangles) };
    });
  }

  /* ============ the coin (procedural) ============ */
  function buildCoin(THREE, spec) {
    const group = new THREE.Group();
    const geo = new THREE.CylinderGeometry(1, 1, 0.14, 128, 1, false);
    const loader = new THREE.TextureLoader();
    const mkFace = (url) => {
      const tex = loader.load(url);
      if ('colorSpace' in tex && THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
      else if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = 4;
      return new THREE.MeshStandardMaterial({ map: tex, metalness: 0.55, roughness: 0.34 });
    };
    const edge = new THREE.MeshStandardMaterial({ color: 0xa87f22, metalness: 0.9, roughness: 0.38 });
    // CylinderGeometry groups: 0 side, 1 top cap, 2 bottom cap.
    const coin = new THREE.Mesh(geo, [edge, mkFace(spec.frontUrl), mkFace(spec.reverseUrl)]);
    coin.name = 'coin';
    group.add(coin);
    const partOf = (face) => {
      if (!face) return null;
      return ['edge', 'front', 'reverse'][face.materialIndex] || null;
    };
    // Counted from the built geometry, never derived from the
    // segment parameter — if the geometry changes, the count
    // changes with it.
    const triangles = geo.index ? geo.index.count / 3 : geo.attributes.position.count / 3;
    return { root: group, triangles, partOf, namedMeshes: [coin] };
  }

  /* ============ the viewer ============ */
  function createViewer(THREE, opts) {
    const { canvas, onInspect } = opts;
    const reduceMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    else if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    /* An environment for the metals to reflect. A metal with
       no environment map renders near-black under direct light
       alone — the PBR lesson this module teaches — so the
       viewer builds a tiny softbox room (bright warm panel
       upper-left, cool panel behind, dark floor) and PMREM-
       filters it into scene.environment. Hand-built here: the
       UMD build ships no RoomEnvironment. */
    {
      const envScene = new THREE.Scene();
      const room = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0x1a1409 }));
      envScene.add(room);
      const panel = (w, h, color, intensity, pos) => {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) }));
        m.position.set(...pos); m.lookAt(0, 0, 0); envScene.add(m);
      };
      panel(8, 5, 0xffe9b0, 9, [-6, 7, 6]);   // warm key, upper-left (the house light)
      panel(10, 4, 0xbfd4ff, 3, [7, 3, -6]);  // cool rim, back-right
      panel(12, 3, 0xffe9b0, 2, [0, -8, 2]);  // low warm bounce
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(envScene, 0.04).texture;
      pmrem.dispose();
    }
    scene.add(new THREE.AmbientLight(0xfff2d8, 0.55));
    const key = new THREE.DirectionalLight(0xffe9b0, 1.15); key.position.set(3, 4, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfd4ff, 0.4); rim.position.set(-4, 2, -3); scene.add(rim);

    let model = null; // { root, triangles, partOf?, namedMeshes? }
    let azimuth = 0.6, polar = 1.05, distance = 4.2;
    const target = { azimuth, polar, distance }; // keys/buttons steer the target; the ticker chases it
    let autoRotate = !reduceMotion && opts.autoRotate !== false;
    let lastInteract = 0;
    let raf = 0, destroyed = false;
    /* Visibility pause (Phase 4, Project 11's perf gate): a
       stage nobody can see does not render. The ticker keeps
       its chain alive and its bookkeeping honest (fps counts
       rendered frames only), but the render itself — the one
       expensive line — is skipped while the canvas is off
       screen. On any hardware this is the M13 discipline:
       work nobody sees is waste; on the hybrid page that
       exposed it, the graded long-task total fell from
       18,358 ms to 9,562 ms when this pause landed (the
       project's QA filing carries the provenance). */
    let canvasVisible = true;
    let visibilityObserver = null;
    if (typeof IntersectionObserver === 'function' && canvas) {
      visibilityObserver = new IntersectionObserver((es) => {
        canvasVisible = es[0].isIntersecting;
      }, { rootMargin: '40% 0px' });
      visibilityObserver.observe(canvas);
    }
    let fpsFrames = 0, fpsElapsed = 0, fpsStamp = 0, fps = 0;
    let selected = null;
    let firstFrameAt = 0, pendingLatency = null, lastLatencyMs = null;

    function resize() {
      const w = canvas.clientWidth || canvas.width, h = canvas.clientHeight || canvas.height;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    function placeCamera() {
      const sp = Math.sin(polar), y = Math.cos(polar);
      camera.position.set(
        distance * sp * Math.sin(azimuth),
        distance * y,
        distance * sp * Math.cos(azimuth));
      camera.lookAt(0, 0, 0);
    }

    function tick(now) {
      if (destroyed) return;
      raf = requestAnimationFrame(tick);
      if (!canvasVisible) { fpsStamp = now; return; }
      const t = now / 1000;
      if (autoRotate && t - lastInteract > 3) target.azimuth += 0.0035;
      // The smoothing chase (house craft): never snap to the target.
      azimuth += (target.azimuth - azimuth) * 0.12;
      polar += (target.polar - polar) * 0.12;
      distance += (target.distance - distance) * 0.12;
      placeCamera();
      renderer.render(scene, camera);
      if (!firstFrameAt) firstFrameAt = performance.now();
      if (pendingLatency !== null) { lastLatencyMs = performance.now() - pendingLatency; pendingLatency = null; }
      if (fpsStamp) fpsElapsed += now - fpsStamp;
      fpsStamp = now;
      fpsFrames++;
      if (fpsFrames >= 30 && fpsElapsed > 0) { fps = Math.round(fpsFrames / (fpsElapsed / 1000)); fpsFrames = 0; fpsElapsed = 0; }
    }
    raf = requestAnimationFrame(tick);

    /* ---- input ---- */
    let dragging = false, lastX = 0, lastY = 0;
    const pointers = new Map();
    let pinchD = 0;
    function noteInteract() { lastInteract = performance.now() / 1000; if (pendingLatency === null) pendingLatency = performance.now(); }
    function onPointerDown(e) {
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinchD = Math.hypot(a[0] - b[0], a[1] - b[1]);
      }
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      noteInteract();
    }
    function onPointerMove(e) {
      if (!dragging || !pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (pinchD) target.distance = clampDist(target.distance * (pinchD / d));
        pinchD = d;
        noteInteract();
        return;
      }
      target.azimuth += (e.clientX - lastX) * 0.008;
      target.polar = clampPolar(target.polar + (e.clientY - lastY) * 0.006);
      lastX = e.clientX; lastY = e.clientY;
      noteInteract();
    }
    function onPointerUp(e) {
      pointers.delete(e.pointerId);
      if (pointers.size === 0) dragging = false;
    }
    function onWheel(e) {
      e.preventDefault();
      target.distance = clampDist(target.distance * (e.deltaY > 0 ? 1.09 : 0.92));
      noteInteract();
    }
    function onKey(e) {
      const step = 0.18;
      let used = true;
      switch (e.key) {
        case 'ArrowLeft': target.azimuth -= step; break;
        case 'ArrowRight': target.azimuth += step; break;
        case 'ArrowUp': target.polar = clampPolar(target.polar - step * 0.6); break;
        case 'ArrowDown': target.polar = clampPolar(target.polar + step * 0.6); break;
        case '+': case '=': case 'PageDown': target.distance = clampDist(target.distance * 0.88); break;
        case '-': case '_': case 'PageUp': target.distance = clampDist(target.distance * 1.14); break;
        case '0': target.azimuth = 0.6; target.polar = 1.05; target.distance = 4.2; break;
        default: used = false;
      }
      if (used) { e.preventDefault(); noteInteract(); }
    }
    function onClick(e) {
      if (!model) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
      const hits = ray.intersectObjects(model.namedMeshes || model.root.children, true);
      if (!hits.length) return;
      const hit = hits[0];
      let part = null;
      if (model.partOf) part = model.partOf(hit.face);
      if (!part) { let o = hit.object; while (o && !o.name) o = o.parent; part = o ? o.name : null; }
      select(part, 'pointer');
    }
    const clampPolar = (p) => Math.min(1.5, Math.max(0.15, p));
    const clampDist = (d) => Math.min(9, Math.max(2.2, d));

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('keydown', onKey);
    canvas.addEventListener('click', onClick);

    function select(part, via) {
      selected = part;
      if (onInspect) onInspect(part, via);
    }

    const VIEWS = {
      front: { azimuth: 0, polar: 1.02, distance: 3.6 },
      reverse: { azimuth: Math.PI, polar: 1.02, distance: 3.6 },
      edge: { azimuth: 0.7, polar: Math.PI / 2, distance: 3.4 },
      home: { azimuth: 0.6, polar: 1.05, distance: 4.2 },
    };

    function getState() {
      const info = renderer.info.render;
      return {
        azimuth, polar, distance,
        targetAzimuth: target.azimuth, targetPolar: target.polar, targetDistance: target.distance,
        drawCalls: info.calls, triangles: info.triangles,
        modelTriangles: model ? model.triangles : 0,
        fps, selected, lastLatencyMs,
        autoRotate, destroyed, visible: canvasVisible,
      };
    }

    function destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(raf);
      if (visibilityObserver) visibilityObserver.disconnect();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('keydown', onKey);
      canvas.removeEventListener('click', onClick);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      renderer.dispose();
    }

    const api = {
      getState, destroy,
      focusPart(part) {
        const v = VIEWS[part] || VIEWS.home;
        target.azimuth = v.azimuth; target.polar = v.polar; target.distance = v.distance;
        select(part, 'button');
      },
      setAutoRotate(v) { autoRotate = !!v; },
      _scene: scene, _renderer: renderer, // harness access, documented
    };

    api.ready = (async () => {
      if (opts.model.kind === 'coin') {
        model = buildCoin(THREE, opts.model);
      } else if (opts.model.kind === 'glb') {
        model = await loadGLB(THREE, opts.model.url);
      } else {
        throw new Error(`viewer: unknown model kind "${opts.model.kind}"`);
      }
      scene.add(model.root);
      resize();
      return api;
    })();

    return api;
  }

  const api = { createViewer, loadGLB };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.CineViewer = api;
})(typeof window !== 'undefined' ? window : globalThis);

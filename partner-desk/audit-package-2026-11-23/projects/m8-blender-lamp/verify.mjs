/* M8 verification.
   Proves, against the built artifacts:
   · the render: 120 frames on disk; the sequence follows the
     shot plan (assembled → exploded → glowing hold), measured
     in pixels, not adjectives;
   · the films: both encodes probe at 5.0 s, 960×540;
   · the web model: the GLB's own accessors are parsed here —
     triangles and bytes inside the house budgets, and the
     count agrees with what Blender printed at export;
   · the handshake: the Engine's viewer loads the GLB, its
     triangle count equals the file's, its draw calls equal
     the primitive count, and the lamp renders gold;
   · the page prints stats.json's numbers, unaltered.
   Run AFTER build_lamp.py + the ffmpeg encodes + stats.json.
   Run: node verify.mjs  (serves the artifacts root itself) */
import { createServer } from 'node:http';
import { readFile, stat, readdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { execFileSync } from 'node:child_process';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const checks = [];
const check = (name, ok, detail) => { checks.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${detail}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const HERE = process.cwd();

/* ---------- the render sequence ---------- */
const frames = (await readdir(join(HERE, 'renders'))).filter((f) => /^frame_\d+\.png$/.test(f)).sort();
check('1 120 frames rendered', frames.length === 120, `${frames.length} PNG frames (plan: 120 @ 24 fps)`);
{
  const sizes = await Promise.all(frames.map(async (f) => (await stat(join(HERE, 'renders', f))).size));
  check('2 every frame is a real picture', Math.min(...sizes) > 5000,
    `smallest frame ${Math.min(...sizes)} B, largest ${Math.max(...sizes)} B`);
}
async function meanAbsDiff(a, b) {
  const ia = await sharp(join(HERE, 'renders', a)).raw().toBuffer({ resolveWithObject: true });
  const ib = await sharp(join(HERE, 'renders', b)).raw().toBuffer({ resolveWithObject: true });
  let s = 0, n = 0;
  for (let i = 0; i < ia.data.length; i += ia.info.channels * 13) { s += Math.abs(ia.data[i] - ib.data[i]); n++; }
  return s / n;
}
{
  const dAssembledExploded = await meanAbsDiff('frame_0012.png', 'frame_0110.png');
  const dMidExplode = await meanAbsDiff('frame_0012.png', 'frame_0060.png');
  const dHold = await meanAbsDiff('frame_0100.png', 'frame_0115.png');
  check('3 sequence follows the shot plan (assembled → exploded → hold)',
    dAssembledExploded > 6 && dMidExplode > 2 && dHold < dAssembledExploded,
    `mean |Δ| assembled↔exploded ${dAssembledExploded.toFixed(1)} · assembled↔mid ${dMidExplode.toFixed(1)} · inside the hold ${dHold.toFixed(1)} (0–255)`);
}

/* ---------- the films ---------- */
for (const [file, label] of [['film.mp4', 'H.264'], ['film.webm', 'VP9']]) {
  try {
    const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'quiet', '-print_format', 'json',
      '-show_format', '-show_streams', join(HERE, file)], { encoding: 'utf8' }));
    const v = probe.streams.find((s) => s.codec_type === 'video');
    const dur = Number(probe.format.duration);
    check(`4 film ${label} probes clean`, v && v.width === 960 && v.height === 540 && Math.abs(dur - 5) < 0.25,
      `${file}: ${v.width}×${v.height}, ${dur.toFixed(2)} s, ${probe.format.size} B`);
  } catch (e) {
    check(`4 film ${label} probes clean`, false, `${file}: ffprobe failed — ${String(e).slice(0, 120)}`);
  }
}

/* ---------- the web model, parsed from its own bytes ---------- */
function parseGLB(buf) {
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('not a GLB');
  const jsonLen = buf.readUInt32LE(12);
  const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'));
  let tris = 0, prims = 0;
  (json.meshes || []).forEach((m) => m.primitives.forEach((p) => {
    prims++;
    const count = p.indices !== undefined ? json.accessors[p.indices].count : json.accessors[p.attributes.POSITION].count;
    tris += count / 3;
  }));
  return { json, tris, prims, meshes: (json.meshes || []).length };
}
const glbBuf = await readFile(join(HERE, 'model', 'lumen-no1-web.glb'));
const glb = parseGLB(glbBuf);
check('5 web model inside the cleanup gate',
  glbBuf.length <= 5 * 1024 * 1024 && glb.tris <= 250000,
  `${glbBuf.length} B (bar ≤5 MB) · ${glb.tris} triangles (bar ≤250k) · ${glb.meshes} meshes / ${glb.prims} primitives`);
{
  const log = await readFile(join(HERE, 'render.log'), 'utf8');
  const m = [...log.matchAll(/WEB_MODEL bytes=(\d+) triangles=(\d+) vertices=(\d+) parts=(\d+)/g)].pop();
  check('6 Blender\'s export stats agree with the file',
    !!m && Number(m[1]) === glbBuf.length && Number(m[2]) === glb.tris && Number(m[4]) === glb.meshes,
    m ? `build log: ${m[2]} tris / ${m[4]} parts · file parse: ${glb.tris} tris / ${glb.meshes} meshes` : 'WEB_MODEL line missing from render.log');
}
{
  const st = await stat(join(HERE, 'lamp.blend'));
  check('7 the authored .blend is on file', st.size > 100000, `lamp.blend ${st.size} B`);
}

/* ---------- browser: the viewer handshake + the page ---------- */
const ROOT = join(HERE, '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.mp4': 'video/mp4', '.vtt': 'text/vtt', '.webm': 'video/webm', '.jpg': 'image/jpeg', '.glb': 'model/gltf-binary', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  try {
    let path = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (path.endsWith('/')) path = join(path, 'index.html');
    const data = await readFile(path);
    res.writeHead(200, { 'content-type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('nf'); }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}/m8-blender-lamp/`;
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const errors = [];

// 8 · The Engine viewer loads Blender's GLB.
{
  const p = await browser.newPage();
  p.on('console', (m) => { if (m.type() === 'error') errors.push('glb-view: ' + m.text()); });
  p.on('pageerror', (e) => errors.push('glb-view: ' + String(e)));
  await p.setViewport({ width: 1000, height: 800 });
  await p.goto(base + 'glb-view.html', { waitUntil: 'load', timeout: 90000 });
  await p.waitForFunction(() => window.__viewer && window.__viewer.ready, { timeout: 60000 });
  await p.evaluate(() => window.__viewer.ready);
  await sleep(1500);
  // The render proof is taken at the default framing (the
  // lamp fills enough of the frame for its brass to count);
  // the draw-call count is taken zoomed out, where no part
  // can be frustum-culled at the frame's edge — each number
  // measured under the conditions where it means something.
  const shot = await p.screenshot();
  const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
  let gold = 0, n = 0;
  for (let i = 0; i < data.length; i += info.channels * 9) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 100 && g > 60 && b < 130 && r > b + 25) gold++;
    n++;
  }
  await p.evaluate(() => {
    const c = document.getElementById('stage');
    for (let i = 0; i < 3; i++) c.dispatchEvent(new WheelEvent('wheel', { deltaY: 240, bubbles: true, cancelable: true }));
  });
  await sleep(1800);
  const s = await p.evaluate(() => window.__viewer.getState());
  check('8 Engine viewer loads + renders the GLB',
    s.modelTriangles === glb.tris && s.drawCalls === glb.prims && gold / n > 0.005,
    `viewer triangles ${s.modelTriangles} = file ${glb.tris} · draw calls ${s.drawCalls} = primitives ${glb.prims} (zoomed out, nothing cullable) · ${(100 * gold / n).toFixed(1)}% gold-ish pixels at default framing`);
  await p.close();
}

// 9 · The presentation page prints stats.json's numbers unaltered.
{
  const stats = JSON.parse(await readFile(join(HERE, 'stats.json'), 'utf8'));
  const p = await browser.newPage();
  p.on('console', (m) => { if (m.type() === 'error') errors.push('page: ' + m.text()); });
  p.on('pageerror', (e) => errors.push('page: ' + String(e)));
  await p.setViewport({ width: 1100, height: 1000 });
  await p.goto(base, { waitUntil: 'load', timeout: 90000 });
  await p.waitForFunction(() => document.getElementById('stat-tris') && document.getElementById('stat-tris').textContent !== '—', { timeout: 30000 });
  const printed = await p.evaluate(() => ({
    tris: document.getElementById('stat-tris').textContent,
    bytes: document.getElementById('stat-bytes').textContent,
    frames: document.getElementById('stat-frames').textContent,
  }));
  check('9 page prints the filed stats',
    Number(printed.tris.replace(/[^0-9]/g, '')) === stats.triangles
      && Number(printed.bytes.replace(/[^0-9]/g, '')) === stats.glbBytes
      && Number(printed.frames.replace(/[^0-9]/g, '')) === stats.frames,
    `page: ${printed.tris} tris · ${printed.bytes} · ${printed.frames} — stats.json: ${stats.triangles} · ${stats.glbBytes} B · ${stats.frames}`);
  await p.close();
}

check('10 zero console errors', errors.length === 0, errors.length ? errors.join(' | ') : 'clean');

await browser.close();
server.close();
const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length ? 1 : 0);

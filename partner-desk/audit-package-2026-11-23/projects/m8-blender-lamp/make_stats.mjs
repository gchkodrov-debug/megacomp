/* Writes stats.json from the measured outputs: the build
   log's WEB_MODEL line (cross-checked by verify.mjs against
   the GLB's own accessors), an ffprobe of film.mp4, and a
   count of the rendered frames. Run after the encodes. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const log = await readFile('render.log', 'utf8');
const m = [...log.matchAll(/WEB_MODEL bytes=(\d+) triangles=(\d+) vertices=(\d+) parts=(\d+)/g)].pop();
if (!m) throw new Error('WEB_MODEL line missing from render.log');
const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'quiet', '-print_format', 'json',
  '-show_format', '-show_streams', 'film.mp4'], { encoding: 'utf8' }));
const v = probe.streams.find((s) => s.codec_type === 'video');
const frames = (await readdir('renders')).filter((f) => /^frame_\d+\.png$/.test(f)).length;
const stats = {
  frames,
  filmSeconds: Number(probe.format.duration),
  filmWidth: v.width,
  filmHeight: v.height,
  glbBytes: Number(m[1]),
  triangles: Number(m[2]),
  vertices: Number(m[3]),
  verticesNote: 'Blender\'s pre-export vertex count, from the build log. The GLB\'s own POSITION accessors sum to 5,198 — export splits vertices at normal/UV seams. The cleanup gate covers bytes + triangles only.',
  parts: Number(m[4]),
};
await writeFile('stats.json', JSON.stringify(stats, null, 2) + '\n');
console.log('stats.json:', JSON.stringify(stats));

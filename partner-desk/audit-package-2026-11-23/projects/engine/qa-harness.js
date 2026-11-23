/* ============================================================
   ENGINE COMPONENT · QA HARNESS (M16, Phase 3)
   The house's five gates behind one runner:
     unit    — the target's declared specs against its own
               shipped modules (never copies);
     e2e     — a declared journey, walked in a real browser;
     visual  — screenshot vs the filed baseline;
     a11y    — the named DOM audit floor;
     perf    — a labelled local lab trace against budgets.

   createQaHarness(config) -> { run({ mode }) }
   config = {
     serveRoot,            // directory served over http
     targetPath,           // e.g. 'project-9-launch/'
     unit: [specs], journey: [steps],
     visual: { baselineDir, settleClick, ... },
     perf: { pageClass: 'N' | 'W', budgets: {...}, offscreen: { selector } },
   }
   mode 'run' (default) judges everything; mode 'baseline'
   additionally (re)writes the visual baselines and reports
   them as BASELINE-CREATED, a status of its own.

   The report is data: { target, gates: [...], verdict }.
   A gate's FAIL names its failed checks; the harness never
   repairs, never retries, never rounds a fail into a pass.
   A missed defect sends the HARNESS back, not the build —
   that is the M16 exam's rule, and it is the component's.
   ============================================================ */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import puppeteer from 'puppeteer';
import { runUnitGate } from './gates/unit.js';
import { runE2eGate } from './gates/e2e.js';
import { runVisualGate } from './gates/visual.js';
import { runA11yGate } from './gates/a11y.js';
import { runPerfGate } from './gates/perf.js';

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt', '.glb': 'model/gltf-binary', '.json': 'application/json' };
/* Media types added in Phase 4: the harness's first media
   target (Project 11) served its film and model as
   application/octet-stream, which a browser will fetch but
   not play or parse as media — an instrument defect, not a
   target defect (Rule 31). M16's exam re-run after this
   change is filed in Phase 4's run record. */

export function createQaHarness(config) {
  if (!config || !config.serveRoot || !config.targetPath) {
    throw new TypeError('qa-harness: serveRoot and targetPath are required');
  }
  return {
    async run({ mode = 'run' } = {}) {
      const server = createServer(async (req, res) => {
        try {
          let path = normalize(join(config.serveRoot, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
          if (path.endsWith('/')) path = join(path, 'index.html');
          const data = await readFile(path);
          res.writeHead(200, { 'content-type': MIME[extname(path)] || 'application/octet-stream' });
          res.end(data);
        } catch { res.writeHead(404); res.end('nf'); }
      });
      await new Promise((r) => server.listen(0, r));
      const url = `http://127.0.0.1:${server.address().port}/${config.targetPath}`;
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const gates = [];
      try {
        gates.push(await runUnitGate(config.unit));
        const page = await browser.newPage();
        gates.push(await runE2eGate({ page, url, journey: config.journey }));
        await page.close();
        const vpage = await browser.newPage();
        gates.push(await runVisualGate({ page: vpage, url, visual: config.visual, mode: mode === 'baseline' ? 'baseline' : 'run' }));
        await vpage.close();
        const apage = await browser.newPage();
        gates.push(await runA11yGate({ page: apage, url }));
        await apage.close();
        const ppage = await browser.newPage();
        gates.push(await runPerfGate({ page: ppage, url, perf: config.perf }));
        await ppage.close();
      } finally {
        await browser.close();
        server.close();
      }
      const verdict = gates.every((g) => g.status === 'PASS' || g.status === 'BASELINE-CREATED') ? 'PASS' : 'FAIL';
      return { target: config.targetPath, mode, gates, verdict };
    },
  };
}

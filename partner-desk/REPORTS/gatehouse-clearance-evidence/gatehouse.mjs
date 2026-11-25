// PROVADIA GATEHOUSE — a stateless, non-custodial JSON-RPC policy proxy.
// Design of record: GEMINI_GATEHOUSE_RECONCILIATION_97_2026-11-24.md (#97).
//
// HARD RULE: this service NEVER generates, stores, imports or accesses any
// private key, mnemonic or seed phrase, and holds zero authority to construct
// or sign transactions. All signing remains 100% inside the founder's Phantom
// wallet. The gatehouse only inspects, allowlists, rate-limits and forwards
// JSON-RPC calls to upstream providers whose API keys live server-side.
//
// Zero dependencies: Node built-ins only (http/https).
//
// Configuration is entirely via environment (see /etc/provadia-gatehouse/*.env):
//   GATEHOUSE_PORT, GATEHOUSE_BIND
//   GATEHOUSE_UPSTREAM_PRIMARY   full URL incl. key (server-side only)
//   GATEHOUSE_UPSTREAM_FALLBACK  full URL incl. key (server-side only)
//   GATEHOUSE_UPSTREAM_TIER3     keyless read-only emergency upstream (optional)
//   GATEHOUSE_ANCHOR_PAYER       base58 fee payer the Night Brick assert pins
//   GATEHOUSE_MEMO_HEX           hex of the exact memo bytes the assert pins
//   GATEHOUSE_SENTINEL_TOKEN     worker token for Sentinel getProgramAccounts
//   GATEHOUSE_ALLOWED_ORIGIN     browser origin allowed by CORS
//   GATEHOUSE_CLUSTER_LABEL      label for /healthz (e.g. mainnet-beta, devnet)

import http from 'node:http';
import https from 'node:https';

const PORT = parseInt(process.env.GATEHOUSE_PORT || '8740', 10);
const BIND = process.env.GATEHOUSE_BIND || '127.0.0.1';
const UPSTREAM_TIMEOUT_MS = 3500;
const MAX_BODY_BYTES = 512 * 1024;
const ALLOWED_ORIGIN = process.env.GATEHOUSE_ALLOWED_ORIGIN || 'https://provadiacoin.com';
const CLUSTER_LABEL = process.env.GATEHOUSE_CLUSTER_LABEL || 'mainnet-beta';
const SENTINEL_TOKEN = process.env.GATEHOUSE_SENTINEL_TOKEN || '';
const ANCHOR_PAYER = process.env.GATEHOUSE_ANCHOR_PAYER || '';
const MEMO_BYTES = process.env.GATEHOUSE_MEMO_HEX ? Buffer.from(process.env.GATEHOUSE_MEMO_HEX, 'hex') : null;

const UPSTREAMS = [
  { name: 'primary', url: process.env.GATEHOUSE_UPSTREAM_PRIMARY || '' },
  { name: 'fallback', url: process.env.GATEHOUSE_UPSTREAM_FALLBACK || '' },
  { name: 'tier3', url: process.env.GATEHOUSE_UPSTREAM_TIER3 || '', readOnly: true },
].filter((u) => u.url);

// ---------------------------------------------------------------------------
// Per-institution permission matrix (#97 Section 3B, captain's Mark 1 routes).
// ratePerMin: sustained requests per minute per IP; burst: bucket capacity.
// ---------------------------------------------------------------------------
const ROUTES = {
  '/v1/night-brick': {
    methods: new Set(['getLatestBlockhash', 'getBlockHeight', 'simulateTransaction', 'sendTransaction', 'getSignatureStatuses', 'getTransaction']),
    ratePerMin: 10, burst: 10, sendRatePerMin: 2,
    // BUILDER FIX (2026-11-24, named for the CLEARED review): the signing
    // page's confirmation heartbeat polls getSignatureStatuses every ~2s for
    // up to ~60s and reads getBlockHeight for freshness — a flat 10/min
    // bucket 429s that heartbeat mid-confirmation (reproduced in the devnet
    // rehearsal). Heartbeat reads get their own bucket; the design's fence
    // stands untouched for blockhash/simulate/send.
    // CRITIC FIX (2026-11-24, relay critic seat): getTransaction joins the
    // heartbeat class — the page's post-landing verification loop polls it
    // up to 10x at 1.5s intervals and could 429 itself out of the general
    // bucket and report a landed anchor as unverifiable. The confirmation-
    // phase reads are heartbeat-classed as a SET. Effective night-brick
    // allowance is therefore 10/min general + 60/min heartbeat + 2/min
    // send per IP — carried to the Gemini seat for ratification (the #97
    // design states a flat 10/min).
    heartbeatMethods: new Set(['getSignatureStatuses', 'getBlockHeight', 'getTransaction']),
    heartbeatRatePerMin: 60, heartbeatBurst: 30,
  },
  '/v1/mint': {
    methods: new Set(['getAccountInfo', 'getTokenSupply', 'getSignatureStatuses', 'getTransaction']),
    ratePerMin: 30, burst: 30,
  },
  '/v1/keeper': {
    methods: new Set(['getAccountInfo', 'getBalance', 'getSignaturesForAddress', 'getTransaction']),
    ratePerMin: 30, burst: 30,
  },
  '/v1/sentinel': {
    methods: new Set(['getAccountInfo', 'getMultipleAccounts', 'getTokenSupply', 'getProgramAccounts', 'getSignaturesForAddress', 'getTransaction']),
    ratePerMin: 30, burst: 30,
  },
  '/v1/guardian': {
    methods: new Set(['getAccountInfo', 'getMultipleAccounts', 'getTokenAccountsByOwner', 'getSignaturesForAddress']),
    ratePerMin: 20, burst: 5,
  },
};
const BROADCAST_METHODS = new Set(['sendTransaction']);

// ---------------------------------------------------------------------------
// Token-bucket rate limiter (in-memory, per route+IP).
// ---------------------------------------------------------------------------
const buckets = new Map();
function takeToken(key, ratePerMin, burst) {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b) { b = { tokens: burst, last: now }; buckets.set(key, b); }
  const refill = ((now - b.last) / 60000) * ratePerMin;
  b.tokens = Math.min(burst, b.tokens + refill);
  b.last = now;
  if (b.tokens >= 1) { b.tokens -= 1; return true; }
  return false;
}
// Per-key TTL eviction (critic fix 2026-11-24): idle buckets expire on
// their own; the map is NEVER cleared wholesale — a global clear would let
// an attacker minting many keys reset everyone's rate limits at once.
setInterval(() => {
  const cutoff = Date.now() - 120000;
  for (const [k, b] of buckets) if (b.last < cutoff) buckets.delete(k);
  if (buckets.size > 10000) {
    const byAge = [...buckets.entries()].sort((a, b2) => a[1].last - b2[1].last);
    for (let i = 0; i < byAge.length - 10000; i++) buckets.delete(byAge[i][0]);
  }
}, 60000).unref();

// ---------------------------------------------------------------------------
// base58 (Bitcoin alphabet) — encode only, for account-key comparison.
// ---------------------------------------------------------------------------
const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function b58encode(buf) {
  let zeros = 0; while (zeros < buf.length && buf[zeros] === 0) zeros++;
  const digits = [0];
  for (let i = zeros; i < buf.length; i++) {
    let carry = buf[i];
    for (let j = 0; j < digits.length; j++) { carry += digits[j] << 8; digits[j] = carry % 58; carry = (carry / 58) | 0; }
    while (carry) { digits.push(carry % 58); carry = (carry / 58) | 0; }
  }
  let out = '1'.repeat(zeros);
  for (let i = digits.length - 1; i >= 0; i--) out += B58[digits[i]];
  return out;
}

// ---------------------------------------------------------------------------
// Legacy Solana transaction wire decoding + the Night Brick byte assert.
// Fail-closed: ANY structural surprise is a refusal, never a forward.
// Expected shape (house standard §3.1 / #97):
//   exactly 3 instructions
//   ix[0].data === 030000000000000000   (ComputeBudget SetComputeUnitPrice 0)
//   ix[1].data === 0250340300           (ComputeBudget SetComputeUnitLimit 210000)
//   ix[2] = Memo program, 0 keys, data === the exact pinned memo bytes
//   feePayer (accountKeys[0]) === GATEHOUSE_ANCHOR_PAYER
// Versioned (v0) transactions are refused: the anchor standard is legacy.
// ---------------------------------------------------------------------------
const MEMO_PROGRAM_ID = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';
const COMPUTE_BUDGET_PROGRAM_ID = 'ComputeBudget111111111111111111111111111111';
const IX0_HEX = '030000000000000000';
const IX1_HEX = '0250340300';
// The genuine anchor transaction's header, measured from the house builder
// (anchor-tx.mjs): 1 required signature, 0 readonly signed, 2 readonly
// unsigned (ComputeBudget + Memo). Pinned exactly — a second signer would
// double the on-chain fee, so the header IS part of the fee verification.
const EXPECTED_HEADER = [1, 0, 2];

// Solana compact-u16 shortvec: at most 3 bytes, 7 bits per byte, unsigned,
// and CANONICAL (the shortest encoding of the value — Solana's decoder
// rejects overlong forms, so this parser must too, or gateway and
// validator parse different streams). Hardened per the relay critic seat
// (2026-11-24): the previous parser accepted 5-byte encodings and used
// signed 32-bit shifts, decoding some inputs to negative lengths.
function readShortvec(buf, off) {
  let len = 0, shift = 0, bytes = 0;
  for (;;) {
    if (off >= buf.length) throw new Error('shortvec overrun');
    if (bytes === 3) throw new Error('shortvec too long');
    const b = buf[off++];
    bytes++;
    if (bytes === 3 && b > 0x03 && !(b & 0x80)) throw new Error('shortvec exceeds u16');
    len += (b & 0x7f) * (2 ** shift);
    if (!(b & 0x80)) break;
    shift += 7;
  }
  // Canonical-form check: re-encoding the value minimally must consume
  // exactly the bytes just read.
  let minimal = 1, v = len;
  while (v >= 0x80) { v = Math.floor(v / 128); minimal++; }
  if (minimal !== bytes) throw new Error('non-canonical shortvec');
  return [len, off];
}

function decodeLegacyTx(wire) {
  let off = 0;
  const [sigCount, o1] = readShortvec(wire, off); off = o1;
  if (sigCount < 1) throw new Error('no signatures');
  if (off + sigCount * 64 > wire.length) throw new Error('truncated signatures');
  off += sigCount * 64;
  if (off >= wire.length) throw new Error('truncated');
  if (wire[off] & 0x80) throw new Error('versioned transaction refused');
  if (off + 3 > wire.length) throw new Error('truncated header');
  const header = [wire[off], wire[off + 1], wire[off + 2]]; off += 3;
  const [keyCount, o2] = readShortvec(wire, off); off = o2;
  // Bounds-check BEFORE the loop (critic fix): a header claiming millions
  // of keys must fail on arithmetic, not after millions of allocations.
  if (keyCount > 256 || off + keyCount * 32 > wire.length) throw new Error('account keys overrun');
  const accountKeys = [];
  for (let i = 0; i < keyCount; i++) { accountKeys.push(wire.subarray(off, off + 32)); off += 32; }
  if (off + 32 > wire.length) throw new Error('truncated blockhash');
  off += 32; // recentBlockhash
  const [ixCount, o3] = readShortvec(wire, off); off = o3;
  if (ixCount > 64) throw new Error('instruction count implausible');
  const instructions = [];
  for (let i = 0; i < ixCount; i++) {
    if (off >= wire.length) throw new Error('truncated instruction');
    const programIdIndex = wire[off++];
    if (programIdIndex >= keyCount) throw new Error('programIdIndex out of range');
    const [acctCount, o4] = readShortvec(wire, off); off = o4;
    if (off + acctCount > wire.length) throw new Error('instruction accounts overrun');
    const accounts = Array.from(wire.subarray(off, off + acctCount)); off += acctCount;
    const [dataLen, o5] = readShortvec(wire, off); off = o5;
    if (off + dataLen > wire.length) throw new Error('instruction data overrun');
    const data = wire.subarray(off, off + dataLen); off += dataLen;
    instructions.push({ programIdIndex, accounts, data });
  }
  if (off !== wire.length) throw new Error('trailing bytes');
  return { sigCount, header, accountKeys, instructions };
}

// The double byte-assert, hardened per the relay critic seat (2026-11-24).
// The first build checked only the three instructions' DATA bytes; the
// critic PROVED two slips with constructed transactions (an arbitrary
// program wearing ix[0]'s exact data with the ANCHOR key attached, and an
// extra co-signer silently doubling the fee). The assert now pins the
// WHOLE compiled shape of the genuine article, measured from anchor-tx.mjs:
//   sigCount === 1 · header === [1,0,2] · exactly 3 account keys, in order
//   [ANCHOR, ComputeBudget, Memo] · ix[0]/ix[1] = ComputeBudget program,
//   0 accounts, exact data · ix[2] = Memo program, 0 accounts, exact bytes.
function assertAnchorTx(wire) {
  if (!ANCHOR_PAYER || !MEMO_BYTES) return 'gatehouse assert not configured';
  const { sigCount, header, accountKeys, instructions } = decodeLegacyTx(wire);
  if (sigCount !== 1) return 'signature count !== 1 (fee would not be 5000)';
  if (header[0] !== EXPECTED_HEADER[0] || header[1] !== EXPECTED_HEADER[1] || header[2] !== EXPECTED_HEADER[2]) {
    return 'message header mismatch (expected 1 signer / 0 readonly-signed / 2 readonly-unsigned)';
  }
  if (accountKeys.length !== 3) return 'account key count !== 3';
  const keyStr = accountKeys.map((k) => b58encode(Buffer.from(k)));
  if (keyStr[0] !== ANCHOR_PAYER) return 'feePayer !== ANCHOR';
  if (keyStr[1] !== COMPUTE_BUDGET_PROGRAM_ID) return 'accountKeys[1] !== ComputeBudget program';
  if (keyStr[2] !== MEMO_PROGRAM_ID) return 'accountKeys[2] !== Memo program';
  if (instructions.length !== 3) return 'instruction count !== 3';
  for (const i of [0, 1]) {
    if (instructions[i].programIdIndex !== 1) return 'ix[' + i + '] program is not ComputeBudget';
    if (instructions[i].accounts.length !== 0) return 'ix[' + i + '] carries keys (must be 0)';
  }
  if (instructions[0].data.toString('hex') !== IX0_HEX) return 'ix[0] mismatch (compute unit price)';
  if (instructions[1].data.toString('hex') !== IX1_HEX) return 'ix[1] mismatch (compute unit limit)';
  const memoIx = instructions[2];
  if (memoIx.programIdIndex !== 2) return 'ix[2] program is not the Memo program';
  if (memoIx.accounts.length !== 0) return 'ix[2] carries keys (must be 0)';
  if (!Buffer.from(memoIx.data).equals(MEMO_BYTES)) return 'ix[2] memo bytes mismatch';
  return null; // null = assert passed
}

// Extract the wire transaction from send/simulate params. The declared
// encoding is part of the policy (critic fix): a caller declaring base58
// would make the gateway and the upstream decode DIFFERENT bytes from the
// same string, so any encoding other than base64 is a refusal, and the
// base64 itself must be canonical (Node's decoder is lenient and never
// throws — round-trip equality is the check).
function extractTxBytes(method, params) {
  if (!Array.isArray(params) || typeof params[0] !== 'string') throw new Error('transaction param missing');
  const cfg = params[1];
  if (cfg && typeof cfg === 'object' && cfg.encoding !== undefined && cfg.encoding !== 'base64') {
    throw new Error('encoding "' + cfg.encoding + '" refused (base64 only)');
  }
  const s = params[0];
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(s) || s.length % 4 !== 0) throw new Error('transaction is not canonical base64');
  const buf = Buffer.from(s, 'base64');
  if (buf.toString('base64') !== s) throw new Error('transaction is not canonical base64');
  return buf;
}

// ---------------------------------------------------------------------------
// Upstream forwarding with sticky failover: primary → fallback → tier3
// (tier3 skipped for broadcast methods). Failover on network error, timeout,
// HTTP 429 or 5xx. The serving upstream is named in X-Provadia-Upstream.
// ---------------------------------------------------------------------------
function postUpstream(urlStr, body, timeoutMs) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    // Critic fix: a provider key must never travel over cleartext http.
    // https only, except a loopback upstream (local rehearsal instances).
    if (url.protocol !== 'https:' && url.hostname !== '127.0.0.1' && url.hostname !== 'localhost') {
      reject(new Error('upstream refused: non-https URL')); return;
    }
    const lib = url.protocol === 'http:' ? http : https;
    const req = lib.request({
      hostname: url.hostname, port: url.port || (url.protocol === 'http:' ? 80 : 443),
      path: url.pathname + url.search, method: 'POST',
      headers: { 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) },
      timeout: timeoutMs,
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('timeout', () => { req.destroy(new Error('upstream timeout')); });
    req.on('error', reject);
    req.write(body); req.end();
  });
}

async function forward(body, method) {
  let lastErr = null;
  for (const up of UPSTREAMS) {
    if (up.readOnly && BROADCAST_METHODS.has(method)) continue;
    try {
      const r = await postUpstream(up.url, body, UPSTREAM_TIMEOUT_MS);
      if (r.status === 429 || r.status >= 500) { lastErr = new Error(up.name + ' HTTP ' + r.status); continue; }
      // Critic rider: a dead primary KEY (401/403) must not present as a
      // hard outage while a healthy fallback stands — fail over on
      // 401/403 for READ methods. Broadcasts never fail over on a verdict:
      // a 200-with-error or a refusal on send/simulate is semantic.
      if ((r.status === 401 || r.status === 403) && !BROADCAST_METHODS.has(method) && method !== 'simulateTransaction') {
        lastErr = new Error(up.name + ' HTTP ' + r.status); continue;
      }
      return { ...r, upstream: up.name };
    } catch (e) { lastErr = e; }
  }
  return { error: lastErr };
}

// ---------------------------------------------------------------------------
// HTTP plumbing
// ---------------------------------------------------------------------------
function sendJson(res, status, obj, extraHeaders = {}) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'content-type': 'application/json', ...extraHeaders });
  res.end(body);
}
function rpcError(res, id, code, message, httpStatus = 200, extraHeaders = {}) {
  sendJson(res, httpStatus, { jsonrpc: '2.0', id: id ?? null, error: { code, message } }, extraHeaders);
}

const server = http.createServer((req, res) => {
  const started = Date.now();
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();
  const url = new URL(req.url, 'http://localhost');

  const corsHeaders = {};
  const origin = req.headers.origin;
  if (origin && origin === ALLOWED_ORIGIN) {
    corsHeaders['access-control-allow-origin'] = ALLOWED_ORIGIN;
    corsHeaders['vary'] = 'Origin';
  }

  if (url.pathname === '/healthz' && req.method === 'GET') {
    sendJson(res, 200, { ok: true, service: 'provadia-gatehouse', cluster: CLUSTER_LABEL, upstreams: UPSTREAMS.map((u) => u.name) });
    return;
  }

  const route = ROUTES[url.pathname];
  if (!route) { sendJson(res, 404, { error: 'unknown route' }, corsHeaders); return; }

  if (req.method === 'OPTIONS') {
    if (origin && origin !== ALLOWED_ORIGIN) { sendJson(res, 403, { error: 'origin refused' }); return; }
    res.writeHead(204, { ...corsHeaders, 'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '86400' });
    res.end(); return;
  }
  if (req.method !== 'POST') { sendJson(res, 405, { error: 'POST only' }, corsHeaders); return; }
  if (origin && origin !== ALLOWED_ORIGIN) {
    console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, ip, refused: 'origin' }));
    sendJson(res, 403, { error: 'origin refused' }, {}); return;
  }

  const chunks = [];
  let size = 0;
  req.on('data', (c) => { size += c.length; if (size <= MAX_BODY_BYTES) chunks.push(c); });
  req.on('end', async () => {
    if (size > MAX_BODY_BYTES) { rpcError(res, null, -32600, 'request too large', 413, corsHeaders); return; }
    let parsed;
    try { parsed = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { rpcError(res, null, -32700, 'parse error', 400, corsHeaders); return; }
    if (Array.isArray(parsed) || typeof parsed !== 'object' || parsed === null || parsed.jsonrpc !== '2.0' || typeof parsed.method !== 'string') {
      rpcError(res, parsed && parsed.id, -32600, 'invalid request (single JSON-RPC 2.0 object required)', 400, corsHeaders); return;
    }
    const { id, method, params } = parsed;

    if (!route.methods.has(method)) {
      console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, refused: 'method-not-allowlisted' }));
      rpcError(res, id, -32001, 'method not allowlisted on this route', 403, corsHeaders); return;
    }
    const isHeartbeat = route.heartbeatMethods && route.heartbeatMethods.has(method);
    const bucketKey = (isHeartbeat ? url.pathname + '|hb|' : url.pathname + '|') + ip;
    const rate = isHeartbeat ? route.heartbeatRatePerMin : route.ratePerMin;
    const burst = isHeartbeat ? route.heartbeatBurst : route.burst;
    if (!takeToken(bucketKey, rate, burst)) {
      rpcError(res, id, -32002, 'rate limit exceeded', 429, corsHeaders); return;
    }

    // Night Brick: the double byte-assert gates simulate + send.
    if (url.pathname === '/v1/night-brick' && (method === 'sendTransaction' || method === 'simulateTransaction')) {
      let wire = null;
      try { wire = extractTxBytes(method, params); }
      catch (e) {
        console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, refused: 'tx-extract: ' + e.message }));
        rpcError(res, id, -32003, 'gatehouse policy refusal: ' + e.message, 403, corsHeaders); return;
      }
      let refusal = null;
      try { refusal = assertAnchorTx(wire); } catch (e) { refusal = 'decode failure: ' + e.message; }
      if (refusal) {
        console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, refused: 'byte-assert: ' + refusal }));
        rpcError(res, id, -32003, 'gatehouse policy refusal: ' + refusal, 403, corsHeaders); return;
      }
      if (method === 'sendTransaction' && !takeToken('send|' + ip, route.sendRatePerMin, route.sendRatePerMin)) {
        rpcError(res, id, -32002, 'sendTransaction rate limit exceeded', 429, corsHeaders); return;
      }
    }

    // Sentinel: getProgramAccounts is worker-token gated and shape-fenced.
    if (url.pathname === '/v1/sentinel' && method === 'getProgramAccounts') {
      const token = req.headers['x-provadia-worker-token'];
      if (!SENTINEL_TOKEN || token !== SENTINEL_TOKEN) {
        rpcError(res, id, -32004, 'getProgramAccounts requires the Sentinel worker token', 403, corsHeaders); return;
      }
      const cfg = Array.isArray(params) ? params[1] : null;
      const filters = cfg && Array.isArray(cfg.filters) ? cfg.filters : [];
      const hasMemcmp = filters.some((f) => f && typeof f === 'object' && 'memcmp' in f);
      if (!hasMemcmp || !cfg || !cfg.dataSlice) {
        rpcError(res, id, -32602, 'getProgramAccounts requires a memcmp filter and dataSlice', 400, corsHeaders); return;
      }
      if (!takeToken('gpa|' + ip, 2 * 60, 2)) { // ≤2/sec sustained
        rpcError(res, id, -32002, 'getProgramAccounts rate limit exceeded', 429, corsHeaders); return;
      }
    }

    const rawBody = Buffer.concat(chunks).toString('utf8');
    const result = await forward(rawBody, method);
    if (result.error) {
      console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, error: 'all upstreams failed: ' + result.error.message, ms: Date.now() - started }));
      rpcError(res, id, -32005, 'gatehouse: all upstreams unavailable (fail closed)', 502, corsHeaders); return;
    }
    console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, upstream: result.upstream, status: result.status, ms: Date.now() - started }));
    res.writeHead(result.status, { 'content-type': result.headers['content-type'] || 'application/json', 'x-provadia-upstream': result.upstream, ...corsHeaders });
    res.end(result.body);
  });
});

server.listen(PORT, BIND, () => {
  console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'provadia-gatehouse listening', bind: BIND, port: PORT, cluster: CLUSTER_LABEL, upstreams: UPSTREAMS.map((u) => u.name) }));
});

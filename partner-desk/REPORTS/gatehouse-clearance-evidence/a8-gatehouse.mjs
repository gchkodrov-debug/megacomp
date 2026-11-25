// PROVADIA GATEHOUSE — a stateless, non-custodial JSON-RPC policy proxy.
// Design of record: GEMINI_GATEHOUSE_RECONCILIATION_97_2026-11-24.md (#97).
//
// HARD RULE: this service NEVER generates, stores, imports or accesses any
// private key, mnemonic or seed phrase, and holds zero authority to construct
// or sign transactions. All signing remains 100% inside the founder's Phantom
// wallet. The gatehouse only inspects, allowlists, rate-limits and forwards
// JSON-RPC calls to upstream providers whose API keys live server-side.
//
// Zero dependencies: Node built-ins only (http/https/crypto/fs).
//
// AMENDMENT 8 (2026-11-24, ChatGPT's Amendment 7 re-judgment — HELD
// pending pre-signature concurrency protection): Amendment 7 claimed the
// lock AFTER the wallet had already signed (page line 718 signed, line
// 801 claimed), so two concurrent sessions could both REQUEST wallet
// transaction signatures before either locked. The permanent law is
// "no second signature while the first transaction remains unresolved";
// the required order is Lock -> Sign -> Persist -> Broadcast -> Verify.
// Amendment 8 adds an ATOMIC PRE-SIGNATURE RESERVATION, authenticated by
// the pinned payer wallet itself (a signMessage proof over a server-
// issued single-use challenge — a message proof, NOT a transaction
// signature): POST /v1/night-brick/anchor-challenge issues a challenge
// (creates NO lock and NO record), POST /v1/night-brick/anchor-reserve
// verifies the proof against the pinned payer, consumes the challenge,
// and synchronously persists a RESERVED record (reservationId + the
// attempt's blockhash/lastValidBlockHeight stamps) BEFORE responding.
// anchor-claim now REQUIRES the bound reservation: body {tx,
// reservationId}; the signed tx's recentBlockhash must equal the
// reservation's stamped blockhash, and the same record transitions
// RESERVED -> CLAIMED. A reservation leaves RESERVED only by (i) that
// bound claim, or (ii) POST /v1/night-brick/anchor-reservation-release:
// an authenticated (fresh challenge proof) request in which the server
// OBSERVES via upstream that the current block height exceeds the
// stamped lastValidBlockHeight — a stamp past its last valid height can
// never land, so an unclaimed reservation for it is provably dead — and
// the freeing transition (EXPIRED_UNCLAIMED) is strictly persisted
// BEFORE the response. RPC null/error during that observation changes
// NOTHING. There is NO timeout anywhere: no wall-clock expiry of a
// reservation exists in this design. (Challenge validity windows are
// auth-handshake hygiene only; an expired challenge never affects a
// granted reservation.)
//
// AMENDMENT 7 (2026-11-24, ChatGPT's independent verdict on the clearance
// packet — NOT YET CLEARED, two confirmed defects in the v6 page's
// duplicate prevention): the gatehouse now also keeps the DURABLE
// SERVER-SIDE ANCHOR RECORD with an atomic duplicate-prevention lock.
// The record lives in a JSON state file (GATEHOUSE_ANCHOR_STATE_PATH),
// written atomically (tmp + fsync + rename) BEFORE any broadcast is
// forwarded. The page registers its signed transaction with the gatehouse
// (POST /v1/night-brick/anchor-claim) and reads the record back
// (GET /v1/night-brick/anchor-state); the send path independently
// re-derives the signature from the wire bytes, verifies the ed25519
// signature against the pinned fee payer, and refuses any broadcast whose
// signature differs from the recorded one while the lock is held.
// AMENDMENT 8 FIX ROUND (critic P1): the send path forwards ONLY the
// recorded signature of a live CLAIMED or BROADCAST (bound-claimed)
// record — it never creates a record of its own, so a signed
// transaction that never reserved and never claimed is refused at the
// send door in every other record state. The
// lock frees ONLY on positive on-chain evidence observed through this
// gateway (a confirmed/finalized status, a landed transaction, an
// on-chain error) or on the serving upstream's preflight blockhash
// refusal (proof those exact bytes were never submitted). A null status
// read NEVER clears or weakens the record — absence of evidence is not
// evidence of non-landing (Defect 02). This changes nothing about the
// frozen transaction, the memo, the fee, or founder signing authority:
// the gatehouse still cannot sign anything; it can only refuse.
//
// Configuration is entirely via environment (see /etc/provadia-gatehouse/*.env):
//   GATEHOUSE_PORT, GATEHOUSE_BIND
//   GATEHOUSE_UPSTREAM_PRIMARY   full URL incl. key (server-side only)
//   GATEHOUSE_UPSTREAM_FALLBACK  full URL incl. key (server-side only)
//   GATEHOUSE_UPSTREAM_TIER3     keyless read-only emergency upstream (optional)
//   GATEHOUSE_ANCHOR_PAYER       base58 fee payer the Night Brick assert pins
//   GATEHOUSE_MEMO_HEX           hex of the exact memo bytes the assert pins
//   GATEHOUSE_ANCHOR_STATE_PATH  durable anchor-record JSON file (Amendment 7)
//   GATEHOUSE_SENTINEL_TOKEN     worker token for Sentinel getProgramAccounts
//   GATEHOUSE_ALLOWED_ORIGIN     browser origin allowed by CORS
//   GATEHOUSE_CLUSTER_LABEL      label for /healthz (e.g. mainnet-beta, devnet)

import http from 'node:http';
import https from 'node:https';
import crypto from 'node:crypto';
import { readFileSync, writeFileSync, renameSync, fsyncSync, openSync, closeSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const PORT = parseInt(process.env.GATEHOUSE_PORT || '8740', 10);
const BIND = process.env.GATEHOUSE_BIND || '127.0.0.1';
const UPSTREAM_TIMEOUT_MS = 3500;
const MAX_BODY_BYTES = 512 * 1024;
const ALLOWED_ORIGIN = process.env.GATEHOUSE_ALLOWED_ORIGIN || 'https://provadiacoin.com';
const CLUSTER_LABEL = process.env.GATEHOUSE_CLUSTER_LABEL || 'mainnet-beta';
const SENTINEL_TOKEN = process.env.GATEHOUSE_SENTINEL_TOKEN || '';
const ANCHOR_PAYER = process.env.GATEHOUSE_ANCHOR_PAYER || '';
const MEMO_BYTES = process.env.GATEHOUSE_MEMO_HEX ? Buffer.from(process.env.GATEHOUSE_MEMO_HEX, 'hex') : null;
const ANCHOR_STATE_PATH = process.env.GATEHOUSE_ANCHOR_STATE_PATH || '';

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
    // AMENDMENT 7: getSignaturesForAddress joins the allowlist (read-only)
    // for the page's authoritative reconciliation — scanning the anchor
    // wallet's own history for the exact memo bytes (ChatGPT Defect 02
    // procedure). On this route it is pinned to GATEHOUSE_ANCHOR_PAYER in
    // the handler below; any other address is refused.
    methods: new Set(['getLatestBlockhash', 'getBlockHeight', 'simulateTransaction', 'sendTransaction', 'getSignatureStatuses', 'getTransaction', 'getSignaturesForAddress']),
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
// base58 (Bitcoin alphabet) — encode for account-key comparison; decode for
// the getTransaction convergence check (Amendment 7 fix round 2).
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
function b58decode(str) {
  let n = 0n;
  for (const c of String(str)) { const i = B58.indexOf(c); if (i < 0) return null; n = n * 58n + BigInt(i); }
  let hex = n.toString(16); if (hex.length % 2) hex = '0' + hex;
  const body = n === 0n ? Buffer.alloc(0) : Buffer.from(hex, 'hex');
  let zeros = 0; while (zeros < String(str).length && String(str)[zeros] === '1') zeros++;
  return Buffer.concat([Buffer.alloc(zeros), body]);
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
  const recentBlockhash = wire.subarray(off, off + 32);
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
  return { sigCount, header, accountKeys, instructions, recentBlockhash };
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
// AMENDMENT 7 — the durable server-side anchor record + atomic lock.
//
// One record per gatehouse instance (the Night Brick is a single
// ceremonial anchor). Lifecycle:
//   CLAIMED          the page registered its signed tx before broadcast
//   BROADCAST        a send of these exact bytes was forwarded upstream
//   CONFIRMED        positive evidence: confirmed/finalized status, or a
//                    landed getTransaction with no error (terminal)
//   FAILED_ONCHAIN   positive evidence: status error, or a landed
//                    transaction whose meta.err is set (lock-free)
//   DEAD_PREFLIGHT   positive evidence: the serving upstream refused the
//                    send at preflight with a blockhash-class error, so
//                    those bytes were never submitted (lock-free)
// CLAIMED / BROADCAST / CONFIRMED hold the lock: a send or claim naming a
// DIFFERENT signature is refused. A null status read, an upstream outage,
// or a blockhash expiring somewhere else NEVER transitions the record —
// only the positive evidence above does (ChatGPT Defect 02).
//
// Atomicity: every check-and-set below is fully synchronous (no await
// between the check and the atomic file persist), so on Node's single
// thread two concurrent requests cannot both win the lock. Persistence
// precedes effect: a claim is written to disk before the claim answers,
// and a broadcast claim is written before the send is forwarded. If the
// store cannot be written, the operation is REFUSED (fail closed).
// ---------------------------------------------------------------------------
const ANCHOR_LOCK_FREE = new Set(['FAILED_ONCHAIN', 'DEAD_PREFLIGHT', 'EXPIRED_UNCLAIMED']);
const ANCHOR_STATUSES = new Set(['RESERVED', 'CLAIMED', 'BROADCAST', 'CONFIRMED', 'FAILED_ONCHAIN', 'DEAD_PREFLIGHT', 'EXPIRED_UNCLAIMED']);
// AMENDMENT 8: shape of a durable record. A RESERVED / EXPIRED_UNCLAIMED
// record carries NO signature yet (that is the point of the reservation:
// it exists BEFORE any transaction signature) — it is identified by its
// reservationId instead. Every other status carries its signature.
function anchorRecordShapeOk(rec) {
  if (!rec || typeof rec !== 'object' || !ANCHOR_STATUSES.has(rec.status)) return false;
  if (rec.status === 'RESERVED' || rec.status === 'EXPIRED_UNCLAIMED') {
    return rec.signature === null && typeof rec.reservationId === 'string' && rec.reservationId.length >= 16 &&
      typeof rec.blockhash === 'string' && Number.isInteger(rec.lastValidBlockHeight);
  }
  return typeof rec.signature === 'string';
}
let anchorRecord = null;      // the in-memory mirror of the state file
let anchorStoreBroken = false; // state path set but unreadable/unwritable at load

function anchorStoreStatus() {
  if (!ANCHOR_STATE_PATH) return 'unconfigured';
  if (anchorStoreBroken) return 'unavailable';
  return 'ok';
}
function persistAnchorRecord() {
  // Atomic publish: write a temp file, fsync it, rename over the state
  // file, fsync the directory. A crash leaves either the old record or
  // the new one — never a torn file.
  const tmp = ANCHOR_STATE_PATH + '.tmp';
  const fd = openSync(tmp, 'w');
  try { writeFileSync(fd, JSON.stringify(anchorRecord, null, 2)); fsyncSync(fd); }
  finally { closeSync(fd); }
  renameSync(tmp, ANCHOR_STATE_PATH);
  const dfd = openSync(dirname(ANCHOR_STATE_PATH), 'r');
  try { fsyncSync(dfd); } finally { closeSync(dfd); }
}
function loadAnchorStore() {
  if (!ANCHOR_STATE_PATH) return;
  // Fail-fast and fail-closed: any surprise here marks the store broken
  // (sends/claims refuse) but never hangs or crashes the service — reads
  // keep flowing. (A recursive mkdir on a special filesystem can block
  // indefinitely on some kernels; the deploy step creates the directory,
  // and a single-level mkdir is all that is ever needed here.)
  try { mkdirSync(dirname(ANCHOR_STATE_PATH)); } catch (e) { if (e.code !== 'EEXIST') { /* persist will surface it */ } }
  let raw = null;
  try { raw = readFileSync(ANCHOR_STATE_PATH, 'utf8'); }
  catch (e) { if (e.code !== 'ENOENT') { anchorStoreBroken = true; console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor record store unreadable — sends fail closed', error: e.message })); } }
  if (raw !== null) {
    try {
      const rec = JSON.parse(raw);
      if (!anchorRecordShapeOk(rec)) throw new Error('state file shape invalid');
      // House-axis fix (improver H-C1): the record is trusted as the
      // authoritative lock, so its pins must match THIS service's pins —
      // a foreign state file (rehearsal/devnet/wrong-config) must never
      // be adopted. Mismatch = broken store = sends/claims refuse.
      if (rec.payer !== ANCHOR_PAYER || rec.memoSha256 !== crypto.createHash('sha256').update(MEMO_BYTES).digest('hex') || rec.cluster !== CLUSTER_LABEL) {
        anchorStoreBroken = true;
        console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor record pins mismatch (payer/memo/cluster) — store treated as broken; sends and claims refused (fail closed)', filePayer: rec.payer, fileCluster: rec.cluster || null, serviceCluster: CLUSTER_LABEL }));
        return;
      }
      anchorRecord = rec;
    } catch (e) {
      anchorStoreBroken = true;
      console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor record state file corrupt — sends fail closed', error: e.message }));
    }
  }
}
function setAnchorRecord(rec) {
  anchorRecord = rec;
  persistAnchorRecord(); // throws on failure — callers treat as refusal
}
// Critic N6 (round 2): a second process sharing the state file could hold
// a stale (or null) in-memory record and claim over a live one. The
// deployment is one process per cluster, but the claim path does not
// rely on that: before any claim decision it re-reads the durable file
// and adopts it when memory is empty or the file is newer. A claim is
// rare (ceremony-scale), so the read costs nothing.
function refreshAnchorRecordFromDisk() {
  if (!ANCHOR_STATE_PATH || anchorStoreBroken) return;
  let raw;
  try { raw = readFileSync(ANCHOR_STATE_PATH, 'utf8'); }
  catch (e) { if (e.code !== 'ENOENT') { anchorStoreBroken = true; console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor record refresh failed — store treated as broken (fail closed)', error: e.message })); } return; }
  try {
    const rec = JSON.parse(raw);
    if (!anchorRecordShapeOk(rec)) throw new Error('state file shape invalid');
    if (rec.payer !== ANCHOR_PAYER || rec.memoSha256 !== crypto.createHash('sha256').update(MEMO_BYTES).digest('hex') || rec.cluster !== CLUSTER_LABEL) throw new Error('state file pins mismatch');
    if (!anchorRecord || String(rec.updatedAt || '') > String(anchorRecord.updatedAt || '')) anchorRecord = rec;
  } catch (e) {
    anchorStoreBroken = true;
    console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor record refresh found a corrupt/foreign state file — store treated as broken (fail closed)', error: e.message }));
  }
}
// Critic N9 (round 2): a LOCK-FREEING transition must never be served
// from memory unless it is durable — if its persist fails, memory
// reverts to the on-disk state (the lock stays held; the transition can
// be re-driven by later observations for status-based frees, and the
// exactly-once preflight free falls back to the house's evidence-based
// manual clear, as designed). Returns true when the transition stands.
function transitionAnchorRecordStrict(status, via) {
  if (!anchorRecord || anchorRecord.status === status) return true;
  if (anchorRecord.status === 'CONFIRMED') return true; // terminal
  const prev = { status: anchorRecord.status, updatedAt: anchorRecord.updatedAt, history: anchorRecord.history };
  anchorRecord.status = status;
  anchorRecord.updatedAt = new Date().toISOString();
  anchorRecord.history = [...(anchorRecord.history || []), { from: prev.status, to: status, at: anchorRecord.updatedAt, via }].slice(-20);
  try { persistAnchorRecord(); return true; }
  catch (e) {
    anchorRecord.status = prev.status; anchorRecord.updatedAt = prev.updatedAt; anchorRecord.history = prev.history;
    console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor lock-freeing transition persist FAILED — reverted to the durable record (lock stays held)', to: status, via, error: e.message }));
    return false;
  }
}
function transitionAnchorRecord(status, via) {
  if (!anchorRecord || anchorRecord.status === status) return;
  if (anchorRecord.status === 'CONFIRMED' && status !== 'CONFIRMED') return; // CONFIRMED is terminal
  const from = anchorRecord.status;
  anchorRecord.status = status;
  anchorRecord.updatedAt = new Date().toISOString();
  anchorRecord.history = [...(anchorRecord.history || []), { from, to: status, at: anchorRecord.updatedAt, via }].slice(-20);
  try { persistAnchorRecord(); }
  catch (e) { console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor record transition persist FAILED (in-memory state kept; next observation re-drives it)', from, to: status, via, error: e.message })); }
}
// AMENDMENT 8 FIX ROUND (critic P1, CONFIRMED) — the send-door
// authorization. The Amendment 7 send path called a claim function
// here that CREATED a fresh BROADCAST record whenever the lock was
// free (null record, FAILED_ONCHAIN, DEAD_PREFLIGHT,
// EXPIRED_UNCLAIMED): a founder-signed anchor transaction that never
// reserved and never claimed could therefore still be broadcast
// through the Gatehouse, bypassing the Amendment 8 reservation
// entirely. Requirement 3 is explicit — a signed tx without the
// reservation, or under a released/foreign reservation, is REFUSED.
//
// This function therefore NEVER creates a record. A send is
// authorized ONLY when the transaction's derived signature equals
// the recorded signature of a live record in CLAIMED or BROADCAST
// status — the bound-claim state, reachable only through
// reserve -> sign -> bound claim (claimBoundReservation). Every
// other state — null record, RESERVED (no signature yet),
// EXPIRED_UNCLAIMED, FAILED_ONCHAIN, DEAD_PREFLIGHT, CONFIRMED
// (already landed; a re-send is a duplicate), or a signature
// mismatch — is a 'conflict' refusal at the send door, in the
// existing duplicate-prevention refusal shape.
//
// Returns one of:
//   { outcome: 'held', record, stamped } — send authorized; `stamped`
//       is true when THIS request durably stamped CLAIMED -> BROADCAST
//       before the forward (the observation block keys DEAD_PREFLIGHT
//       on it, exactly as in Amendment 7)
//   { outcome: 'conflict', record }      — refused (record may be null)
//   { outcome: 'broken' }                — the store cannot be read or
//       persisted (fail closed)
function authorizeAnchorSend(sigB58) {
  if (!ANCHOR_STATE_PATH || anchorStoreBroken) return { outcome: 'broken' };
  refreshAnchorRecordFromDisk(); // critic N6: never decide on a stale record
  if (anchorStoreBroken) return { outcome: 'broken' };
  const now = new Date().toISOString();
  if (anchorRecord && anchorRecord.signature === sigB58 && anchorRecord.status === 'BROADCAST') {
    return { outcome: 'held', record: anchorRecord, stamped: false };
  }
  if (anchorRecord && anchorRecord.signature === sigB58 && anchorRecord.status === 'CLAIMED') {
    // Critic Finding E: persistence precedes effect — the CLAIMED →
    // BROADCAST stamp must be DURABLE before the send is forwarded.
    // Unlike observation-path transitions (which re-drive on the next
    // poll), this one gates an effect: if the stamp cannot persist,
    // the send is refused (fail closed) and memory reverts to disk.
    const prev = { status: anchorRecord.status, updatedAt: anchorRecord.updatedAt, history: anchorRecord.history };
    anchorRecord.status = 'BROADCAST';
    anchorRecord.updatedAt = now;
    anchorRecord.history = [...(anchorRecord.history || []), { from: 'CLAIMED', to: 'BROADCAST', at: now, via: 'send-forwarded' }].slice(-20);
    try { persistAnchorRecord(); }
    catch (e) {
      anchorRecord.status = prev.status; anchorRecord.updatedAt = prev.updatedAt; anchorRecord.history = prev.history;
      console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor BROADCAST stamp persist FAILED — send refused (fail closed)', error: e.message }));
      return { outcome: 'broken' };
    }
    // `stamped`: THIS request is the first-ever send attempt for these
    // bytes — the observation block keys DEAD_PREFLIGHT on it.
    return { outcome: 'held', record: anchorRecord, stamped: true };
  }
  return { outcome: 'conflict', record: anchorRecord };
}
// Derive the transaction's identity from its wire bytes: the first
// signature slot (the fee payer's signature — sigCount is pinned to 1 by
// the byte assert before this is ever called), the signed message bytes,
// and the payer's public key bytes.
function parseSignedWire(wire) {
  const [sigCount, off] = readShortvec(wire, 0);
  if (sigCount !== 1) throw new Error('signature count !== 1');
  if (off + 64 > wire.length) throw new Error('truncated signature');
  const sigBytes = wire.subarray(off, off + 64);
  const messageBytes = wire.subarray(off + 64);
  const { accountKeys, recentBlockhash } = decodeLegacyTx(wire);
  return { sigBytes, messageBytes, payerBytes: accountKeys[0], sigB58: b58encode(Buffer.from(sigBytes)), blockhashB58: b58encode(Buffer.from(recentBlockhash)) };
}
const ED25519_SPKI_PREFIX = Buffer.from('302a300506032b6570032100', 'hex');
function verifyAnchorSignature(wire) {
  // The lock is only as strong as the binding between the recorded
  // signature and the founder's key: without this check, anyone could
  // POST the (fully public) unsigned anchor shape with random signature
  // bytes and poison the lock against the founder's real signature.
  // Only bytes actually signed by the pinned payer can claim or send.
  try {
    const { sigBytes, messageBytes, payerBytes } = parseSignedWire(wire);
    const key = crypto.createPublicKey({ key: Buffer.concat([ED25519_SPKI_PREFIX, Buffer.from(payerBytes)]), format: 'der', type: 'spki' });
    return crypto.verify(null, Buffer.from(messageBytes), key, Buffer.from(sigBytes));
  } catch { return false; }
}
function publicAnchorRecord() {
  if (!anchorRecord) return null;
  const { signature, payer, cluster, memoSha256, status, claimedAt, updatedAt, confirmedSignature } = anchorRecord;
  return {
    signature, payer, cluster, memoSha256, status, claimedAt, updatedAt, confirmedSignature: confirmedSignature || null,
    // AMENDMENT 8: the reservation identity + stamps are public record
    // fields (they are not secrets — the reservation is enforced by the
    // payer's signature proofs and the claim's byte/signature binding,
    // never by hiding its id).
    reservationId: anchorRecord.reservationId || null,
    blockhash: anchorRecord.blockhash || null,
    lastValidBlockHeight: anchorRecord.lastValidBlockHeight ?? null,
    reservedAt: anchorRecord.reservedAt || null,
  };
}

// ---------------------------------------------------------------------------
// AMENDMENT 8 — the pre-signature reservation machinery.
//
// Challenge lifecycle (auth handshake ONLY): the server issues a random
// single-use challenge bound server-side to the pinned (payer,
// memo-sha256, cluster) plus the caller's declared purpose inputs
// (reserve: blockhash + lastValidBlockHeight; release: reservationId).
// The canonical message below is the ONLY text a wallet is ever asked to
// sign for this machinery, and it is built server-side from the stored
// challenge, never from caller-supplied text at verify time. Issuing a
// challenge creates NO lock and NO record, so no third party can block
// the founder by spamming challenges (the map is bounded and per-IP
// rate-limited besides). A challenge carries a short validity window —
// handshake hygiene against stale proofs — and that window applies ONLY
// to the challenge: it can never expire, extend, or otherwise affect a
// reservation that has already been granted. A granted reservation has
// NO expiry of any kind (Permanent Rule 5).
// ---------------------------------------------------------------------------
const CHALLENGE_TTL_MS = 5 * 60 * 1000;
const CHALLENGE_MAP_CAP = 1000;
const challenges = new Map(); // challengeId -> {nonce, purpose, blockhash, lastValidBlockHeight, reservationId, expiresAtMs, used}
function memoSha256Hex() { return MEMO_BYTES ? crypto.createHash('sha256').update(MEMO_BYTES).digest('hex') : null; }
function canonicalChallengeMessage(c) {
  const lines = [
    'PROVADIA GATEHOUSE ANCHOR RESERVATION v1',
    'action: ' + c.purpose,
    'cluster: ' + CLUSTER_LABEL,
    'payer: ' + ANCHOR_PAYER,
    'memoSha256: ' + memoSha256Hex(),
    'challenge: ' + c.nonce,
  ];
  if (c.purpose === 'reserve') {
    lines.push('blockhash: ' + c.blockhash);
    lines.push('lastValidBlockHeight: ' + c.lastValidBlockHeight);
  }
  if (c.purpose === 'release') lines.push('reservationId: ' + c.reservationId);
  return lines.join('\n');
}
function pruneChallenges() {
  const now = Date.now();
  for (const [k, c] of challenges) if (c.used || now > c.expiresAtMs) challenges.delete(k);
  if (challenges.size > CHALLENGE_MAP_CAP) {
    const byAge = [...challenges.entries()].sort((a, b) => a[1].expiresAtMs - b[1].expiresAtMs);
    for (let i = 0; i < byAge.length - CHALLENGE_MAP_CAP; i++) challenges.delete(byAge[i][0]);
  }
}
function issueChallenge(fields) {
  pruneChallenges();
  const c = {
    nonce: crypto.randomBytes(32).toString('hex'),
    purpose: fields.purpose,
    blockhash: fields.blockhash || null,
    lastValidBlockHeight: fields.lastValidBlockHeight ?? null,
    reservationId: fields.reservationId || null,
    expiresAtMs: Date.now() + CHALLENGE_TTL_MS,
    used: false,
  };
  const challengeId = crypto.randomBytes(16).toString('hex');
  challenges.set(challengeId, c);
  return { challengeId, message: canonicalChallengeMessage(c), expiresAt: new Date(c.expiresAtMs).toISOString() };
}
// Consume a challenge exactly once. Consumption happens on ANY reserve /
// release attempt that names it (a failed proof burns the challenge —
// no retry-oracle), and replay of a consumed challenge is refused before
// any other check can matter.
function consumeChallenge(challengeId, expectedPurpose) {
  const c = challenges.get(challengeId);
  if (!c) return { error: 'unknown challenge' };
  if (c.used) return { error: 'challenge already used — replay refused' };
  c.used = true;
  if (Date.now() > c.expiresAtMs) return { error: 'challenge expired (handshake window only — this never affects a granted reservation)' };
  if (c.purpose !== expectedPurpose) return { error: 'challenge purpose mismatch' };
  return { challenge: c };
}
function verifyPayerMessageSignature(message, sigBytes) {
  try {
    const payerBytes = b58decode(ANCHOR_PAYER);
    if (!payerBytes || payerBytes.length !== 32 || !sigBytes || sigBytes.length !== 64) return false;
    const key = crypto.createPublicKey({ key: Buffer.concat([ED25519_SPKI_PREFIX, Buffer.from(payerBytes)]), format: 'der', type: 'spki' });
    return crypto.verify(null, Buffer.from(message, 'utf8'), key, Buffer.from(sigBytes));
  } catch { return false; }
}
function decodeProofSignature(s) {
  if (typeof s !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(s) || s.length % 4 !== 0) return null;
  const buf = Buffer.from(s, 'base64');
  if (buf.toString('base64') !== s || buf.length !== 64) return null;
  return buf;
}
// Synchronous check-and-reserve — the synchronous check-and-persist pattern: no await
// between the lock check and the atomic persist, so two concurrent
// reserve requests cannot both win. Persistence precedes the response.
function reserveAnchorLock(c) {
  if (!ANCHOR_STATE_PATH || anchorStoreBroken) return { outcome: 'broken' };
  refreshAnchorRecordFromDisk();
  if (anchorStoreBroken) return { outcome: 'broken' };
  if (anchorRecord && !ANCHOR_LOCK_FREE.has(anchorRecord.status)) {
    return { outcome: 'conflict', record: anchorRecord };
  }
  const now = new Date().toISOString();
  const rec = {
    version: 2, signature: null, reservationId: crypto.randomBytes(16).toString('hex'),
    payer: ANCHOR_PAYER, cluster: CLUSTER_LABEL, memoSha256: memoSha256Hex(),
    status: 'RESERVED', blockhash: c.blockhash, lastValidBlockHeight: c.lastValidBlockHeight,
    reservedAt: now, claimedAt: null, updatedAt: now,
    history: [{ from: anchorRecord ? anchorRecord.status : null, to: 'RESERVED', at: now, via: 'anchor-reserve' }],
  };
  const prevRecord = anchorRecord;
  try { setAnchorRecord(rec); }
  catch (e) {
    anchorRecord = prevRecord; // phantom-record revert (improver R2-C1 pattern)
    console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor RESERVATION persist FAILED — refusing, in-memory record reverted to disk', error: e.message }));
    return { outcome: 'broken' };
  }
  return { outcome: 'reserved', record: rec };
}
// The bound claim (Amendment 8): a claim is honoured ONLY against a live
// RESERVED record whose reservationId matches AND whose stamped
// blockhash equals the signed transaction's recentBlockhash. On success
// the SAME record transitions RESERVED -> CLAIMED carrying the derived
// signature; Amendment 7 semantics run from there unchanged.
function claimBoundReservation(sigB58, reservationId, blockhashB58) {
  if (!ANCHOR_STATE_PATH || anchorStoreBroken) return { outcome: 'broken' };
  refreshAnchorRecordFromDisk();
  if (anchorStoreBroken) return { outcome: 'broken' };
  if (!anchorRecord) return { outcome: 'no-reservation' };
  if (anchorRecord.status !== 'RESERVED') {
    // Idempotent re-claim of an already-converted reservation (e.g. the
    // first claim's response was lost in transport): same signature,
    // same reservationId, record already CLAIMED-or-later.
    if (anchorRecord.signature === sigB58 && anchorRecord.reservationId === reservationId &&
        (anchorRecord.status === 'CLAIMED' || anchorRecord.status === 'BROADCAST' || anchorRecord.status === 'CONFIRMED')) {
      return { outcome: 'held', record: anchorRecord };
    }
    return { outcome: 'conflict', record: anchorRecord };
  }
  if (anchorRecord.reservationId !== reservationId) return { outcome: 'reservation-mismatch', record: anchorRecord };
  if (anchorRecord.blockhash !== blockhashB58) return { outcome: 'blockhash-mismatch', record: anchorRecord };
  const now = new Date().toISOString();
  const prev = { signature: anchorRecord.signature, status: anchorRecord.status, claimedAt: anchorRecord.claimedAt, updatedAt: anchorRecord.updatedAt, history: anchorRecord.history };
  anchorRecord.signature = sigB58;
  anchorRecord.status = 'CLAIMED';
  anchorRecord.claimedAt = now;
  anchorRecord.updatedAt = now;
  anchorRecord.history = [...(anchorRecord.history || []), { from: 'RESERVED', to: 'CLAIMED', at: now, via: 'page-claim-reservation-bound' }].slice(-20);
  try { persistAnchorRecord(); }
  catch (e) {
    anchorRecord.signature = prev.signature; anchorRecord.status = prev.status; anchorRecord.claimedAt = prev.claimedAt; anchorRecord.updatedAt = prev.updatedAt; anchorRecord.history = prev.history;
    console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'anchor bound-claim persist FAILED — reverted to the durable RESERVED record', error: e.message }));
    return { outcome: 'broken' };
  }
  return { outcome: 'claimed', record: anchorRecord };
}
loadAnchorStore();

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
  let contacts = 0; // upstreams actually contacted for THIS request
  for (const up of UPSTREAMS) {
    if (up.readOnly && BROADCAST_METHODS.has(method)) continue;
    contacts++;
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
      return { ...r, upstream: up.name, contacts };
    } catch (e) { lastErr = e; }
  }
  return { error: lastErr, contacts };
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
    sendJson(res, 200, { ok: true, service: 'provadia-gatehouse', cluster: CLUSTER_LABEL, upstreams: UPSTREAMS.map((u) => u.name), anchorRecord: { store: anchorStoreStatus(), status: anchorRecord ? anchorRecord.status : null, signature: anchorRecord ? anchorRecord.signature : null } });
    return;
  }

  // AMENDMENT 7 — the anchor-record sub-paths (plain JSON, not JSON-RPC;
  // they are the duplicate-prevention lock's own doors, distinct from the
  // RPC surface). Same origin fence + CORS discipline as the routes.
  if (url.pathname === '/v1/night-brick/anchor-state' || url.pathname === '/v1/night-brick/anchor-claim' ||
      url.pathname === '/v1/night-brick/anchor-challenge' || url.pathname === '/v1/night-brick/anchor-reserve' ||
      url.pathname === '/v1/night-brick/anchor-reservation-release') {
    const cors = {};
    if (origin && origin === ALLOWED_ORIGIN) { cors['access-control-allow-origin'] = ALLOWED_ORIGIN; cors['vary'] = 'Origin'; }
    if (req.method === 'OPTIONS') {
      if (origin && origin !== ALLOWED_ORIGIN) { sendJson(res, 403, { error: 'origin refused' }); return; }
      res.writeHead(204, { ...cors, 'access-control-allow-methods': 'GET, POST', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '86400' });
      res.end(); return;
    }
    if (origin && origin !== ALLOWED_ORIGIN) { sendJson(res, 403, { error: 'origin refused' }); return; }
    if (url.pathname === '/v1/night-brick/anchor-state') {
      if (req.method !== 'GET') { sendJson(res, 405, { error: 'GET only' }, cors); return; }
      // House-axis fix (improver H-C2): every other door of this service
      // is bucketed; the state read is too (generous read bucket — the
      // page polls it during reconciliation).
      if (!takeToken('/v1/night-brick|state|' + ip, 120, 30)) { sendJson(res, 429, { error: 'rate limit exceeded' }, cors); return; }
      sendJson(res, 200, { record: publicAnchorRecord(), store: anchorStoreStatus() }, cors);
      return;
    }
    // AMENDMENT 8 sub-paths: challenge / reserve / reservation-release.
    // Same origin fence + CORS discipline as anchor-claim (enforced
    // above), each with its own rate bucket in the claim class.
    if (url.pathname === '/v1/night-brick/anchor-challenge' ||
        url.pathname === '/v1/night-brick/anchor-reserve' ||
        url.pathname === '/v1/night-brick/anchor-reservation-release') {
      const door = url.pathname.endsWith('anchor-challenge') ? 'challenge' : (url.pathname.endsWith('anchor-reserve') ? 'reserve' : 'release');
      if (req.method !== 'POST') { sendJson(res, 405, { ok: false, error: 'POST only' }, cors); return; }
      if (!takeToken('/v1/night-brick|' + door + '|' + ip, ROUTES['/v1/night-brick'].ratePerMin, ROUTES['/v1/night-brick'].burst)) {
        sendJson(res, 429, { ok: false, error: 'rate limit exceeded' }, cors); return;
      }
      const dchunks = [];
      let dsize = 0;
      req.on('data', (c) => { dsize += c.length; if (dsize <= MAX_BODY_BYTES) dchunks.push(c); });
      req.on('end', async () => {
        if (dsize > MAX_BODY_BYTES) { sendJson(res, 413, { ok: false, error: 'request too large' }, cors); return; }
        let bodyObj;
        try { bodyObj = JSON.parse(Buffer.concat(dchunks).toString('utf8')); }
        catch { sendJson(res, 400, { ok: false, error: 'parse error' }, cors); return; }
        if (door === 'challenge') {
          // Issuing a challenge creates NO lock and NO record — it is
          // pure auth handshake, so it is safe to offer unauthenticated
          // (bucketed above, bounded map). The declared inputs are
          // bound server-side into the canonical message.
          const purpose = bodyObj && bodyObj.purpose;
          if (purpose !== 'reserve' && purpose !== 'release') { sendJson(res, 400, { ok: false, error: 'purpose must be "reserve" or "release"' }, cors); return; }
          if (!ANCHOR_PAYER || !MEMO_BYTES) { sendJson(res, 503, { ok: false, error: 'gatehouse assert not configured' }, cors); return; }
          if (purpose === 'reserve') {
            // IMPROVER FIX-1 (Amendment 8 improver seat): the stamped
            // blockhash must be a real blockhash SHAPE — base58 decoding
            // to exactly 32 bytes. A garbage stamp could never produce a
            // claimable transaction, so a reservation on it could only
            // ever squat or brick the lock; refuse it at the door.
            const bhBytes = typeof bodyObj.blockhash === 'string' ? b58decode(bodyObj.blockhash) : null;
            if (!bhBytes || bhBytes.length !== 32 ||
                !Number.isInteger(bodyObj.lastValidBlockHeight) || bodyObj.lastValidBlockHeight <= 0) {
              sendJson(res, 400, { ok: false, error: 'reserve challenge requires {blockhash (base58, 32 bytes), lastValidBlockHeight}' }, cors); return;
            }
          } else if (typeof bodyObj.reservationId !== 'string' || bodyObj.reservationId.length < 16) {
            sendJson(res, 400, { ok: false, error: 'release challenge requires {reservationId}' }, cors); return;
          }
          const issued = issueChallenge({ purpose, blockhash: bodyObj.blockhash, lastValidBlockHeight: bodyObj.lastValidBlockHeight, reservationId: bodyObj.reservationId });
          sendJson(res, 200, { ok: true, challengeId: issued.challengeId, message: issued.message, expiresAt: issued.expiresAt }, cors);
          return;
        }
        // reserve + release both open with the payer proof: consume the
        // challenge (single-use; replay refused), then verify the
        // ed25519 message signature against the PINNED payer. Only the
        // pinned payer's wallet can pass — property (a).
        if (!bodyObj || typeof bodyObj.challengeId !== 'string' || typeof bodyObj.signature !== 'string') {
          sendJson(res, 400, { ok: false, error: 'body must be {challengeId, signature: base64 ed25519 signature over the canonical challenge message}' }, cors); return;
        }
        const consumed = consumeChallenge(bodyObj.challengeId, door === 'reserve' ? 'reserve' : 'release');
        if (consumed.error) { sendJson(res, 403, { ok: false, error: 'gatehouse policy refusal: ' + consumed.error }, cors); return; }
        const sigBytes = decodeProofSignature(bodyObj.signature);
        if (!sigBytes || !verifyPayerMessageSignature(canonicalChallengeMessage(consumed.challenge), sigBytes)) {
          console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, ip, refused: 'message signature does not verify against the pinned fee payer' }));
          sendJson(res, 403, { ok: false, error: 'gatehouse policy refusal: message signature does not verify against the pinned fee payer' }, cors); return;
        }
        if (door === 'reserve') {
          // IMPROVER FIX-2 (Amendment 8 improver seat) — stamp-window
          // validation. The challenge stamps (blockhash +
          // lastValidBlockHeight) are CALLER-declared; without a check,
          // a valid payer proof could stamp a far-future
          // lastValidBlockHeight and squat the single anchor lock for
          // months: the bound claim could never match an invented
          // blockhash, and the evidence release could never fire
          // (observed height would never pass the invented stamp).
          // The server therefore trusts only its OWN upstream
          // observation: the stamped lastValidBlockHeight must sit
          // within ±1000 heights of the server-observed current height
          // (an honest fresh stamp sits ~+150; the window also refuses
          // cross-cluster stamps, whose heights differ by millions).
          // Observation unavailable -> NO reservation (fail closed,
          // the release door's Defect-02 discipline). The observation
          // await happens BEFORE the synchronous check-and-persist, so
          // reserve atomicity is unchanged: racing reserves still
          // serialise on reserveAnchorLock and exactly one wins.
          const stampObsBody = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getBlockHeight', params: [] });
          const stampObs = await forward(stampObsBody, 'getBlockHeight');
          let stampHeight = null;
          if (!stampObs.error) { try { const ub = JSON.parse(stampObs.body); if (typeof ub.result === 'number') stampHeight = ub.result; } catch { stampHeight = null; } }
          if (stampHeight === null) {
            sendJson(res, 502, { ok: false, error: 'upstream block-height observation unavailable — nothing reserved (fail closed)' }, cors); return;
          }
          const stampDelta = consumed.challenge.lastValidBlockHeight - stampHeight;
          if (stampDelta < -1000 || stampDelta > 1000) {
            console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, ip, refused: 'stamp-window', stampedLvbh: consumed.challenge.lastValidBlockHeight, observedHeight: stampHeight, delta: stampDelta }));
            sendJson(res, 400, { ok: false, error: 'gatehouse policy refusal: stamped lastValidBlockHeight ' + consumed.challenge.lastValidBlockHeight + ' is outside the server-observed validity window (observed height ' + stampHeight + ') — nothing reserved' }, cors); return;
          }
          // Synchronous check-and-persist (reserveAnchorLock): the
          // RESERVED record is durable BEFORE this response is sent.
          const r = reserveAnchorLock(consumed.challenge);
          if (r.outcome === 'broken') { sendJson(res, 503, { ok: false, error: 'anchor record store unavailable — fail closed' }, cors); return; }
          if (r.outcome === 'conflict') {
            console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, ip, refused: 'anchor lock held (reserve)', heldStatus: r.record.status, heldReservationId: r.record.reservationId || null }));
            sendJson(res, 409, { ok: false, error: 'anchor lock held — a live record/reservation already stands', status: r.record.status, reservationId: r.record.reservationId || null, signature: r.record.signature || null }, cors); return;
          }
          console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, ip, outcome: 'reserved', reservationId: r.record.reservationId, blockhash: r.record.blockhash }));
          sendJson(res, 200, { ok: true, reservationId: r.record.reservationId, status: 'RESERVED', blockhash: r.record.blockhash, lastValidBlockHeight: r.record.lastValidBlockHeight }, cors);
          return;
        }
        // door === 'release': the ONLY release path for an unclaimed
        // reservation, and it runs on strictly-persisted positive
        // evidence: the server OBSERVES via upstream that the current
        // block height exceeds the reservation's stamped
        // lastValidBlockHeight. Null/error observation -> NO transition.
        const reservationId = consumed.challenge.reservationId;
        if (typeof bodyObj.reservationId !== 'string' || bodyObj.reservationId !== reservationId) {
          sendJson(res, 400, { ok: false, error: 'body reservationId must match the challenge-bound reservationId' }, cors); return;
        }
        refreshAnchorRecordFromDisk();
        if (anchorStoreBroken) { sendJson(res, 503, { ok: false, error: 'anchor record store unavailable — fail closed' }, cors); return; }
        if (!anchorRecord || anchorRecord.status !== 'RESERVED' || anchorRecord.reservationId !== reservationId) {
          sendJson(res, 409, { ok: false, error: 'no live reservation with that reservationId stands', status: anchorRecord ? anchorRecord.status : null }, cors); return;
        }
        const stampedLvbh = anchorRecord.lastValidBlockHeight;
        const obsBody = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getBlockHeight', params: [] });
        const obs = await forward(obsBody, 'getBlockHeight');
        let observedHeight = null;
        if (!obs.error) { try { const ub = JSON.parse(obs.body); if (typeof ub.result === 'number') observedHeight = ub.result; } catch { observedHeight = null; } }
        if (observedHeight === null) {
          // RPC null/error: NO transition — absence of evidence is not
          // evidence (Defect 02 discipline, applied to reservations).
          sendJson(res, 502, { ok: false, error: 'upstream block-height observation unavailable — reservation unchanged', status: 'RESERVED' }, cors); return;
        }
        // Re-check after the await: the record must still be the same
        // live reservation before the freeing transition is stamped.
        // IMPROVER FIX-3: re-read the durable file first (the claim
        // path's critic-N6 discipline) so the re-check never rests on
        // memory alone after an await.
        refreshAnchorRecordFromDisk();
        if (anchorStoreBroken) { sendJson(res, 503, { ok: false, error: 'anchor record store unavailable — fail closed' }, cors); return; }
        if (!anchorRecord || anchorRecord.status !== 'RESERVED' || anchorRecord.reservationId !== reservationId) {
          sendJson(res, 409, { ok: false, error: 'reservation changed during observation — no transition made', status: anchorRecord ? anchorRecord.status : null }, cors); return;
        }
        if (observedHeight <= stampedLvbh) {
          sendJson(res, 409, { ok: false, error: 'stamped blockhash is still valid (observed height ' + observedHeight + ' <= lastValidBlockHeight ' + stampedLvbh + ') — reservation stands', status: 'RESERVED', observedHeight }, cors); return;
        }
        // Positive evidence: a stamp past its last valid height can
        // never land, so an unclaimed reservation for it is provably
        // dead. The freeing transition persists STRICTLY before the
        // response (transitionAnchorRecordStrict reverts on failure).
        if (!transitionAnchorRecordStrict('EXPIRED_UNCLAIMED', 'reservation-release-observed-height-' + observedHeight + '-past-lvbh-' + stampedLvbh)) {
          sendJson(res, 503, { ok: false, error: 'release transition could not be persisted — reservation stands (fail closed)', status: 'RESERVED' }, cors); return;
        }
        console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, ip, outcome: 'released', reservationId, observedHeight, stampedLvbh }));
        sendJson(res, 200, { ok: true, status: 'EXPIRED_UNCLAIMED', reservationId, observedHeight, lastValidBlockHeight: stampedLvbh }, cors);
      });
      return;
    }

    // anchor-claim (POST): the page registers its SIGNED transaction —
    // the full wire bytes ride in the body, so the gatehouse re-runs the
    // byte assert, verifies the signature against the pinned payer, and
    // derives the signature itself. A claim naming bytes that are not
    // the founder-signed anchor can never take the lock.
    if (req.method !== 'POST') { sendJson(res, 405, { error: 'POST only' }, cors); return; }
    if (!takeToken('/v1/night-brick|claim|' + ip, ROUTES['/v1/night-brick'].ratePerMin, ROUTES['/v1/night-brick'].burst)) {
      sendJson(res, 429, { ok: false, error: 'rate limit exceeded' }, cors); return;
    }
    const cchunks = [];
    let csize = 0;
    req.on('data', (c) => { csize += c.length; if (csize <= MAX_BODY_BYTES) cchunks.push(c); });
    req.on('end', () => {
      if (csize > MAX_BODY_BYTES) { sendJson(res, 413, { ok: false, error: 'request too large' }, cors); return; }
      let bodyObj;
      try { bodyObj = JSON.parse(Buffer.concat(cchunks).toString('utf8')); }
      catch { sendJson(res, 400, { ok: false, error: 'parse error' }, cors); return; }
      if (!bodyObj || typeof bodyObj.tx !== 'string') { sendJson(res, 400, { ok: false, error: 'body must be {tx: base64 signed transaction, reservationId} (Amendment 8: the claim is bound to a pre-signature reservation)' }, cors); return; }
      if (typeof bodyObj.reservationId !== 'string' || bodyObj.reservationId.length < 16) { sendJson(res, 400, { ok: false, error: 'body must carry the reservationId issued by anchor-reserve (Amendment 8)' }, cors); return; }
      let wire = null;
      try { wire = extractTxBytes('sendTransaction', [bodyObj.tx, { encoding: 'base64' }]); }
      catch (e) { sendJson(res, 403, { ok: false, error: 'gatehouse policy refusal: ' + e.message }, cors); return; }
      let refusal = null;
      try { refusal = assertAnchorTx(wire); } catch (e) { refusal = 'decode failure: ' + e.message; }
      if (refusal) { sendJson(res, 403, { ok: false, error: 'gatehouse policy refusal: ' + refusal }, cors); return; }
      if (!verifyAnchorSignature(wire)) {
        console.log(JSON.stringify({ t: new Date().toISOString(), route: '/v1/night-brick/anchor-claim', ip, refused: 'signature does not verify against the pinned fee payer' }));
        sendJson(res, 403, { ok: false, error: 'gatehouse policy refusal: signature does not verify against the pinned fee payer' }, cors); return;
      }
      const { sigB58, blockhashB58 } = parseSignedWire(wire);
      // AMENDMENT 8 — the bound claim: synchronous check-and-persist
      // against the live RESERVED record (matching reservationId +
      // stamped blockhash == the signed tx's recentBlockhash).
      const claim = claimBoundReservation(sigB58, bodyObj.reservationId, blockhashB58);
      if (claim.outcome === 'broken') { sendJson(res, 503, { ok: false, error: 'anchor record store unavailable — fail closed' }, cors); return; }
      if (claim.outcome === 'no-reservation' || claim.outcome === 'reservation-mismatch' || claim.outcome === 'blockhash-mismatch') {
        console.log(JSON.stringify({ t: new Date().toISOString(), route: '/v1/night-brick/anchor-claim', ip, refused: claim.outcome }));
        sendJson(res, 409, { ok: false, error: 'gatehouse policy refusal: claim is not bound to a live reservation (' + claim.outcome + ')', status: claim.record ? claim.record.status : null }, cors); return;
      }
      if (claim.outcome === 'conflict') {
        console.log(JSON.stringify({ t: new Date().toISOString(), route: '/v1/night-brick/anchor-claim', ip, refused: 'anchor lock held', heldSignature: claim.record.signature, heldStatus: claim.record.status }));
        sendJson(res, 409, { ok: false, error: 'anchor lock held by an earlier signed anchor', signature: claim.record.signature, status: claim.record.status }, cors); return;
      }
      console.log(JSON.stringify({ t: new Date().toISOString(), route: '/v1/night-brick/anchor-claim', ip, outcome: claim.outcome, signature: sigB58, status: claim.record.status }));
      sendJson(res, 200, { ok: true, signature: sigB58, status: claim.record.status }, cors);
    });
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

    // AMENDMENT 7: carries this request's derived anchor signature to the
    // post-forward observation block below (send verdicts + status reads).
    let anchorSendSig = null;
    let anchorSendStamped = false;

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
      // AMENDMENT 7 — the broadcast lock, as corrected by the
      // AMENDMENT 8 FIX ROUND (critic P1). A send (never a simulation)
      // must carry the founder's real signature over these exact bytes,
      // AND its derived signature must equal the recorded signature of
      // a live CLAIMED or BROADCAST record — the bound-claim state.
      // The send door creates NOTHING: a signed transaction that never
      // reserved and never claimed (null record, live RESERVED,
      // EXPIRED_UNCLAIMED, FAILED_ONCHAIN or DEAD_PREFLIGHT record, or
      // a signature mismatch) is refused here, before any forward.
      // The CLAIMED -> BROADCAST stamp is persisted BEFORE the send is
      // forwarded: if the record cannot be written, nothing is
      // broadcast (fail closed).
      if (method === 'sendTransaction') {
        if (!verifyAnchorSignature(wire)) {
          console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, refused: 'signature does not verify against the pinned fee payer' }));
          rpcError(res, id, -32003, 'gatehouse policy refusal: signature does not verify against the pinned fee payer', 403, corsHeaders); return;
        }
        anchorSendSig = parseSignedWire(wire).sigB58;
        const claim = authorizeAnchorSend(anchorSendSig);
        if (claim.stamped) anchorSendStamped = true;
        if (claim.outcome === 'broken') {
          rpcError(res, id, -32005, 'gatehouse: anchor record store unavailable (fail closed)', 503, corsHeaders); return;
        }
        if (claim.outcome === 'conflict') {
          const heldDesc = claim.record
            ? 'recorded signature ' + (claim.record.signature || 'none') + ', status ' + claim.record.status
            : 'no anchor record stands';
          console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, refused: 'duplicate-anchor lock (send without a bound claim)', heldSignature: claim.record ? claim.record.signature : null, heldStatus: claim.record ? claim.record.status : null }));
          rpcError(res, id, -32003, 'gatehouse policy refusal: duplicate-anchor prevention — a send is forwarded only for the signature of a bound-claimed anchor record (' + heldDesc + ')', 403, corsHeaders); return;
        }
      }
    }

    // AMENDMENT 7: on the night-brick route, getSignaturesForAddress is
    // the reconciliation scan — it may only ever read the anchor wallet's
    // own history.
    if (url.pathname === '/v1/night-brick' && method === 'getSignaturesForAddress') {
      if (!Array.isArray(params) || params[0] !== ANCHOR_PAYER) {
        rpcError(res, id, -32003, 'gatehouse policy refusal: night-brick history scan is pinned to the anchor payer', 403, corsHeaders); return;
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
    // AMENDMENT 7 — the gatehouse maintains its anchor record from what
    // it actually observes flowing through it. ONLY positive evidence
    // transitions the record; a null status or a missing transaction
    // changes NOTHING (ChatGPT Defect 02). Observation never breaks the
    // read path: any failure here is logged and the response proceeds.
    if (url.pathname === '/v1/night-brick' && anchorRecord) {
      try {
        const ub = JSON.parse(result.body);
        if (method === 'sendTransaction' && anchorSendSig && anchorRecord.signature === anchorSendSig) {
          if (ub && ub.error && /blockhash/i.test(String(ub.error.message || '')) &&
              anchorRecord.status === 'BROADCAST' && anchorSendStamped && result.contacts === 1) {
            // Improver P-C1 (the Defect-02 error class, server-side):
            // a preflight blockhash refusal is proof of non-submission
            // ONLY for bytes that were never accepted anywhere. Hence
            // all three guards: THIS request must be the first-ever
            // send attempt for these bytes (anchorSendStamped — the
            // claim step just stamped CLAIMED → BROADCAST for it; once
            // an earlier send was accepted, re-sending the same bytes
            // draws the identical refusal even though they landed);
            // exactly ONE upstream may have been contacted for this
            // send (a refusal after a timed-out or failed-over first
            // contact proves nothing about that first contact); and
            // broadcasts never fail over on a verdict, so the single
            // verdict is the whole story.
            transitionAnchorRecordStrict('DEAD_PREFLIGHT', 'send-preflight-blockhash-refusal');
          } else if (ub && typeof ub.result === 'string' && anchorRecord.status === 'CLAIMED') {
            transitionAnchorRecord('BROADCAST', 'send-accepted');
          }
        } else if (method === 'getSignatureStatuses' && Array.isArray(params) && Array.isArray(params[0])) {
          const idx = params[0].indexOf(anchorRecord.signature);
          const st = idx >= 0 && ub && ub.result && Array.isArray(ub.result.value) ? ub.result.value[idx] : null;
          if (st && st.err) transitionAnchorRecordStrict('FAILED_ONCHAIN', 'observed-status-err');
          else if (st && (st.confirmationStatus === 'confirmed' || st.confirmationStatus === 'finalized')) transitionAnchorRecord('CONFIRMED', 'observed-status-' + st.confirmationStatus);
          // st === null: NO transition — a missing status is not evidence.
        } else if (method === 'getTransaction' && Array.isArray(params) && params[0] === anchorRecord.signature) {
          const txr = ub ? ub.result : null;
          if (txr && txr.meta && txr.meta.err) transitionAnchorRecordStrict('FAILED_ONCHAIN', 'observed-landed-err');
          else if (txr) transitionAnchorRecord('CONFIRMED', 'observed-landed');
          // txr === null: NO transition — same rule.
        } else if (method === 'getTransaction' && Array.isArray(params) && params[0] !== anchorRecord.signature &&
                   (anchorRecord.status === 'CLAIMED' || anchorRecord.status === 'BROADCAST')) {
          // Critic Finding A — convergence. The page's reconciliation
          // scan byte-verifies history candidates itself; when a landed
          // transaction under a DIFFERENT signature byte-matches the
          // pinned anchor shape (payer + exactly 3 instructions + exact
          // memo bytes + fee 5000, no error), the inscription EXISTS —
          // positive evidence, observed by the gatehouse itself in the
          // traffic flowing through it. The record graduates CONFIRMED
          // and notes the landed signature; the recorded signature
          // remains the record's identity. Absence/null changes nothing.
          // AMENDMENT 8 FIX ROUND adjudication (critic P1): this
          // read-path convergence does NOT conflict with the send
          // door's bound-claim rule, and is kept deliberately. It
          // forwards nothing and broadcasts nothing — it fires only on
          // a getTransaction READ of a transaction that has ALREADY
          // landed, and only with the full positive on-chain evidence
          // above (landed, no meta.err, fee exactly 5000, pinned payer
          // as keys[0], exactly 3 instructions, memo bytes byte-equal).
          // The send door's rule governs what the Gatehouse will
          // BROADCAST; this path only records that the inscription
          // provably exists on-chain already (e.g. the founder sent
          // the same inscription through another route). A merely
          // well-formed signed transaction can never trigger it.
          const txr = ub ? ub.result : null;
          if (txr && txr.meta && !txr.meta.err && txr.meta.fee === 5000) {
            const msg = txr.transaction && txr.transaction.message;
            const keys = msg && msg.accountKeys;
            const ixs = msg && msg.instructions;
            if (Array.isArray(keys) && keys[0] === ANCHOR_PAYER && Array.isArray(ixs) && ixs.length === 3) {
              const mix = ixs[2];
              if (mix && keys[mix.programIdIndex] === MEMO_PROGRAM_ID) {
                const data = b58decode(String(mix.data || ''));
                if (data && MEMO_BYTES && data.equals(MEMO_BYTES)) {
                  anchorRecord.confirmedSignature = params[0];
                  transitionAnchorRecord('CONFIRMED', 'observed-landed-matching-inscription');
                }
              }
            }
          }
        }
      } catch (obsErr) {
        console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, error: 'anchor observation failed: ' + obsErr.message }));
      }
    }
    console.log(JSON.stringify({ t: new Date().toISOString(), route: url.pathname, method, ip, upstream: result.upstream, status: result.status, ms: Date.now() - started }));
    res.writeHead(result.status, { 'content-type': result.headers['content-type'] || 'application/json', 'x-provadia-upstream': result.upstream, ...corsHeaders });
    res.end(result.body);
  });
});

server.listen(PORT, BIND, () => {
  console.log(JSON.stringify({ t: new Date().toISOString(), msg: 'provadia-gatehouse listening', bind: BIND, port: PORT, cluster: CLUSTER_LABEL, upstreams: UPSTREAMS.map((u) => u.name), anchorRecordStore: anchorStoreStatus(), anchorRecordStatus: anchorRecord ? anchorRecord.status : null }));
});

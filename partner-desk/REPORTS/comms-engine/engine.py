#!/usr/bin/env python3
"""PROVADIA Permanent Communication Engine (PCN) — captain's message engine.

A persistent, append-only message log with route failover for the three
partners: Muse (captain), ChatGPT Guardian, Gemini. Python 3 stdlib only.

Design rules (founder/Guardian order 2026-11-27):
  - No message disappears because a session disconnected: the JSONL log is
    the truth; state.json is only a rebuildable snapshot.
  - Gemini's primary seat is the browser conversation, reached through the
    standing GEMINI_QUEUE. The free Gemini API is a BACKUP route for short,
    context-carrying messages only. Commission-class briefs WAIT for the
    browser route; they never silently reroute to the API (the API does not
    inherit the chat conversation's memory).
  - The same API key powers SOLNIK'S LIVE VOICE (TTS). This engine NEVER
    calls a speech/TTS endpoint, enforces a hard model fence, and runs under
    a strict quota guard (min 60 s between calls, max 20 calls/day) so comms
    traffic can never starve Solnik.
  - The desk route only WRITES a local file and prints the exact GitHub
    helper command. The captain (or a watch) runs the helper; the engine
    itself never pushes.

Credential pattern (gemini-api route only): mirrors
~/workspace/custom-connectors/custom.google-gemini/bin/gemini.py — the
registered connection's surrogate from dynamic_credentials is placed in the
x-goog-api-key header; the real key is swapped in by the egress layer on
approved requests to generativelanguage.googleapis.com. No credential value
ever appears in this file, the log, or any output.

Usage:
  engine.py send --from captain --to gemini --subject S --body B
                 [--priority URGENT|NORMAL|LOW] [--class commission|short|ping]
                 [--dedupe-key K] [--in-reply-to PCN-...] [--api-eligible|--no-api-eligible]
  engine.py list [--status SENT] [--to gemini]
  engine.py status <id>
  engine.py ack <id>
  engine.py answer <id> --body B [--route outbox]
  engine.py inbound --from chatgpt --subject S --body B [--in-reply-to PCN-...]
  engine.py health [--probe]
  engine.py recover

Environment:
  PCN_HOME            data dir (default: <this dir>/data)
  PCN_QUEUE_FILE      Gemini queue file (default: the real GEMINI_QUEUE.md)
  PCN_DESK_DIR        desk outbox dir (default: PCN_HOME/desk-outbox)
  PCN_SESSION_MARKER  Gemini browser-session marker JSON {"ts": <epoch>}
                      (default: PCN_HOME/gemini-session.marker)
  PCN_API_MODEL       comms text model (default gemini-3.1-flash-lite)
  PCN_RETRY_WINDOW_SEC  SENT-but-unACKED requeue window (default 14400)
"""
import argparse
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_HOME = os.environ.get("PCN_HOME", os.path.join(HERE, "data"))
DEFAULT_QUEUE = os.environ.get(
    "PCN_QUEUE_FILE",
    os.path.expanduser(
        "~/workspace/newwave/next-build/gemini-seat/GEMINI_QUEUE.md"))
GITHUB_HELPER = os.path.expanduser(
    "~/workspace/custom-connectors/custom.github/bin/github.py")
DESK_REMOTE_DIR = "partner-desk/COMMS"

PRIORITIES = ("URGENT", "NORMAL", "LOW")
CLASSES = ("commission", "short", "ping")
STATUSES = ("QUEUED", "SENT", "ACKED", "ANSWERED", "FAILED",
            "WAITING-ROUTE", "RECEIVED")  # RECEIVED: inbound records only

ROUTE_ORDER = {
    "gemini": ["gemini-queue", "gemini-api"],
    "chatgpt": ["desk"],
    "captain": [],
}
ROUTES = ("desk", "gemini-queue", "gemini-api", "outbox")

API_MIN_INTERVAL_SEC = 60
API_DAILY_MAX = 20
API_HEALTH_TTL_SEC = 900       # models proof-read cache: 15 minutes
SESSION_TTL_SEC = 1800         # browser-session marker freshness: 30 minutes
DEFAULT_API_MODEL = os.environ.get("PCN_API_MODEL", "gemini-3.1-flash-lite")
DEFAULT_RETRY_WINDOW = int(os.environ.get("PCN_RETRY_WINDOW_SEC", "14400"))
GEMINI_HOST = "generativelanguage.googleapis.com"


class QuotaBlocked(Exception):
    """Raised when the gemini-api quota guard refuses a call."""


class FenceError(Exception):
    """Raised when a hard fence (e.g. the TTS model fence) is violated."""


def iso(epoch):
    return datetime.fromtimestamp(epoch, timezone.utc).strftime(
        "%Y-%m-%dT%H:%M:%SZ")


def day_of(epoch):
    return datetime.fromtimestamp(epoch, timezone.utc).strftime("%Y%m%d")


# --------------------------------------------------------------------------
# Default live transports (never exercised by the self-tests; tests inject
# mocks). Both mirror the connector's credential pattern exactly.
# --------------------------------------------------------------------------

def _surrogate():
    sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
    from dynamic_credentials import dynamic_credential_entry
    entry = dynamic_credential_entry("custom.google-gemini", "access_token")
    return str(entry["surrogate"]).strip()


def _curl(args, payload=None):
    cmd = ["curl", "-sS", "--max-time", "120",
           "-H", f"x-goog-api-key: {_surrogate()}",
           "-H", "Content-Type: application/json",
           "-w", "\n%{http_code}"]
    if payload is not None:
        cmd += ["-d", json.dumps(payload)]
    cmd += args
    out = subprocess.run(cmd, capture_output=True, text=True)
    body, _, code = out.stdout.rpartition("\n")
    return int(code or 0), body


def default_api_proof():
    """Harmless models proof read. Returns (ok, detail)."""
    try:
        code, body = _curl([f"https://{GEMINI_HOST}/v1beta/models"])
        if code == 200:
            n = len(json.loads(body).get("models", []))
            return True, f"models proof read HTTP 200 ({n} models)"
        return False, f"models proof read HTTP {code}"
    except Exception as exc:  # transport failure = route down, not a crash
        return False, f"models proof read failed: {exc}"


def default_api_transport(model, text):
    """One generateContent TEXT call. Returns the model's reply text."""
    payload = {
        "contents": [{"parts": [{"text": text}]}],
        "generationConfig": {"responseModalities": ["TEXT"]},
    }
    code, body = _curl(
        [f"https://{GEMINI_HOST}/v1beta/models/{model}:generateContent"],
        payload)
    if code != 200:
        raise RuntimeError(f"generateContent HTTP {code}: {body[:300]}")
    data = json.loads(body)
    parts = (data.get("candidates", [{}])[0].get("content", {})
             .get("parts", []))
    return "".join(p.get("text", "") for p in parts)


# --------------------------------------------------------------------------
# Engine
# --------------------------------------------------------------------------

class Engine:
    def __init__(self, home=DEFAULT_HOME, queue_file=None, desk_dir=None,
                 session_marker=None, api_transport=None, api_proof=None,
                 clock=None, api_model=None, retry_window=None):
        self.home = home
        self.queue_file = queue_file or DEFAULT_QUEUE
        self.desk_dir = desk_dir or os.path.join(home, "desk-outbox")
        self.session_marker = session_marker or os.path.join(
            home, "gemini-session.marker")
        self.api_transport = api_transport or default_api_transport
        self.api_proof = api_proof or default_api_proof
        self.clock = clock or time.time
        self.api_model = api_model or DEFAULT_API_MODEL
        self.retry_window = (DEFAULT_RETRY_WINDOW if retry_window is None
                             else retry_window)
        self.log_path = os.path.join(home, "messages.jsonl")
        self.state_path = os.path.join(home, "state.json")
        self.health_cache_path = os.path.join(home, "api_health.json")
        os.makedirs(home, exist_ok=True)
        os.makedirs(self.desk_dir, exist_ok=True)
        self.messages = {}       # id -> record
        self.order = []          # ids in creation order
        self.dedupe = {}         # dedupe_key -> id
        self.api_calls = []      # epoch timestamps of gemini-api calls
        self.seq = {}            # YYYYMMDD -> last sequence used
        self._load_log()

    # -- persistence -------------------------------------------------------

    def _append_log(self, event):
        with open(self.log_path, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(event, ensure_ascii=False) + "\n")

    def _load_log(self):
        if not os.path.exists(self.log_path):
            return
        with open(self.log_path, encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                ev = json.loads(line)
                self._apply(ev)

    def _apply(self, ev):
        kind = ev.get("type")
        if kind == "message":
            rec = ev["msg"]
            self.messages[rec["id"]] = rec
            self.order.append(rec["id"])
            if rec.get("dedupe_key"):
                self.dedupe[rec["dedupe_key"]] = rec["id"]
            day = rec["id"].split("-")[1]
            n = int(rec["id"].split("-")[2])
            self.seq[day] = max(self.seq.get(day, 0), n)
        elif kind == "update":
            rec = self.messages.get(ev["id"])
            if rec is not None:
                rec.update(ev["fields"])
                rec.setdefault("history", []).append(
                    {"ts": ev["ts"], "note": ev.get("note", "")})
        elif kind == "api_call":
            self.api_calls.append(ev["ts_epoch"])

    def _update(self, rec, note, **fields):
        now = self.clock()
        fields["updated_ts"] = iso(now)
        self._append_log({"type": "update", "id": rec["id"],
                          "ts": iso(now), "note": note, "fields": fields})
        rec.update(fields)
        rec.setdefault("history", []).append({"ts": iso(now), "note": note})
        self._save_state()

    def _save_state(self):
        state = {
            "saved_ts": iso(self.clock()),
            "messages": [self.messages[i] for i in self.order],
            "dedupe": self.dedupe,
            "api_calls": self.api_calls,
            "seq": self.seq,
        }
        tmp = self.state_path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(state, fh, ensure_ascii=False, indent=1)
        os.replace(tmp, self.state_path)

    def _next_id(self):
        day = day_of(self.clock())
        n = self.seq.get(day, 0) + 1
        self.seq[day] = n
        return f"PCN-{day}-{n:04d}"

    # -- quota guard (Solnik protection) -----------------------------------

    def _check_model_fence(self):
        m = self.api_model.lower()
        if "tts" in m or "audio" in m or "speech" in m:
            raise FenceError(
                f"model '{self.api_model}' is a speech/TTS model — the "
                "comms engine NEVER calls speech endpoints (Solnik's voice "
                "allocation is fenced off)")

    def _quota_check(self):
        """Raise QuotaBlocked if a gemini-api call is not allowed now."""
        now = self.clock()
        today = day_of(now)
        todays = [t for t in self.api_calls if day_of(t) == today]
        if len(todays) >= API_DAILY_MAX:
            raise QuotaBlocked(
                f"daily comms API cap reached ({API_DAILY_MAX}/day) — "
                "Solnik protection guard")
        if self.api_calls and now - max(self.api_calls) < API_MIN_INTERVAL_SEC:
            raise QuotaBlocked(
                f"comms API calls must be spaced >= {API_MIN_INTERVAL_SEC}s "
                f"(last call {now - max(self.api_calls):.0f}s ago)")

    def api_usage(self):
        now = self.clock()
        today = day_of(now)
        todays = [t for t in self.api_calls if day_of(t) == today]
        return {
            "calls_today": len(todays),
            "daily_max": API_DAILY_MAX,
            "min_interval_sec": API_MIN_INTERVAL_SEC,
            "last_call_ts": iso(max(self.api_calls)) if self.api_calls else None,
        }

    # -- route health --------------------------------------------------------

    def _session_health(self):
        if not os.path.exists(self.session_marker):
            return False, (f"session marker absent ({self.session_marker}) — "
                           "browser route treated DOWN")
        try:
            with open(self.session_marker, encoding="utf-8") as fh:
                marker = json.load(fh)
            mts = float(marker["ts"])
        except Exception as exc:
            return False, f"session marker unreadable: {exc}"
        age = self.clock() - mts
        if age <= SESSION_TTL_SEC:
            return True, (f"session marker fresh ({age:.0f}s old, "
                          f"limit {SESSION_TTL_SEC}s)")
        return False, (f"session marker stale ({age:.0f}s old, "
                       f"limit {SESSION_TTL_SEC}s)")

    def _api_health(self, probe=False):
        cache = None
        if os.path.exists(self.health_cache_path):
            try:
                with open(self.health_cache_path, encoding="utf-8") as fh:
                    cache = json.load(fh)
            except Exception:
                cache = None
        now = self.clock()
        if (cache and not probe
                and now - cache.get("ts_epoch", 0) <= API_HEALTH_TTL_SEC):
            return bool(cache["ok"]), (f"cached proof read "
                                       f"({now - cache['ts_epoch']:.0f}s old): "
                                       f"{cache['detail']}")
        ok, detail = self.api_proof()
        with open(self.health_cache_path, "w", encoding="utf-8") as fh:
            json.dump({"ts_epoch": now, "ts": iso(now), "ok": ok,
                       "detail": detail}, fh)
        return ok, f"fresh proof read: {detail}"

    def route_health(self, route, probe=False):
        if route == "desk":
            ok = os.path.isdir(self.desk_dir) and os.access(
                self.desk_dir, os.W_OK)
            return ok, f"local desk outbox dir {self.desk_dir} writable={ok}"
        if route == "gemini-queue":
            if not os.path.exists(self.queue_file):
                return False, f"queue file missing: {self.queue_file}"
            return self._session_health()
        if route == "gemini-api":
            try:
                self._check_model_fence()
            except FenceError as exc:
                return False, str(exc)
            return self._api_health(probe=probe)
        if route == "outbox":
            return True, ("inbound-only: the existing Drive Outbox watch "
                          "delivers; the engine records via `inbound`")
        return False, f"unknown route {route}"

    def health(self, probe=False):
        return {r: self.route_health(r, probe=probe) for r in ROUTES}

    # -- route delivery ------------------------------------------------------

    def _deliver_desk(self, rec):
        path = os.path.join(self.desk_dir, rec["id"] + ".md")
        lines = [
            f"# PCN MESSAGE {rec['id']}",
            "",
            f"- From: {rec['sender']}",
            f"- To: {rec['recipient']}",
            f"- UTC: {rec['ts_utc']}",
            f"- Priority: {rec['priority']}",
            f"- Class: {rec['msg_class']}",
        ]
        if rec.get("in_reply_to"):
            lines.append(f"- In reply to: {rec['in_reply_to']}")
        lines += [
            "",
            f"## {rec['subject']}",
            "",
            rec["body"],
            "",
            "---",
            f"Reply through the Drive Outbox, citing message {rec['id']} "
            "exactly. Acknowledgment + response both required.",
        ]
        with open(path, "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines) + "\n")
        cmd = (f"python3 {GITHUB_HELPER} put-file gchkodrov-debug megacomp "
               f"main {DESK_REMOTE_DIR}/{rec['id']}.md {path} "
               f"\"PCN message {rec['id']} to {rec['recipient']}: "
               f"{rec['subject']}\"")
        return {"file": path, "helper_command": cmd}

    def _deliver_queue(self, rec):
        body_lines = "\n".join("  " + ln for ln in rec["body"].splitlines())
        entry = (
            f"\n- #PCN-{rec['id'].split('-')[2]} [PCN {rec['id']}] "
            f"{rec['subject']} — from {rec['sender']} · priority "
            f"{rec['priority']} · class {rec['msg_class']} · {rec['ts_utc']}\n"
            f"{body_lines}\n"
            f"  — QUEUED via comms-engine (message {rec['id']}; the reply "
            f"must cite this message ID)\n")
        with open(self.queue_file, "a", encoding="utf-8") as fh:
            fh.write(entry)
        return {"queue_file": self.queue_file}

    def _deliver_api(self, rec):
        self._check_model_fence()
        self._quota_check()
        now = self.clock()
        self._append_log({"type": "api_call", "ts": iso(now),
                          "ts_epoch": now, "msg": rec["id"]})
        self.api_calls.append(now)
        prompt = (
            f"[PCN message {rec['id']} from {rec['sender']} · "
            f"{rec['ts_utc']} · priority {rec['priority']}]\n"
            f"Subject: {rec['subject']}\n\n{rec['body']}\n\n"
            f"[Context note: you are answering via the backup API route. "
            f"You do NOT have the browser conversation's memory in this "
            f"route; everything you need is in the message above. Cite "
            f"message {rec['id']} in your reply.]")
        reply = self.api_transport(self.api_model, prompt)
        return {"model": self.api_model, "reply": reply}

    # -- dispatch / failover -------------------------------------------------

    def attempt_dispatch(self, rec):
        """Try the recipient's routes in order. Returns (sent, detail)."""
        routes = ROUTE_ORDER.get(rec["recipient"], [])
        if not routes:
            self._update(rec, "no outbound route for recipient",
                         status="FAILED")
            return False, "no outbound route"
        notes = []
        for idx, route in enumerate(routes):
            up, evidence = self.route_health(route)
            if not up:
                notes.append(f"{route} DOWN ({evidence})")
                if idx == 0 and not rec["api_eligible"]:
                    self._update(
                        rec, f"primary route {route} down; message class "
                             "waits for the primary route",
                        status="WAITING-ROUTE")
                    return False, "; ".join(notes)
                continue
            try:
                if route == "desk":
                    detail = self._deliver_desk(rec)
                    if detail.get("helper_command"):
                        print("DESK FILE READY — run this helper command "
                              "to publish:")
                        print("  " + detail["helper_command"])
                elif route == "gemini-queue":
                    detail = self._deliver_queue(rec)
                elif route == "gemini-api":
                    detail = self._deliver_api(rec)
                else:
                    continue
            except QuotaBlocked as exc:
                notes.append(f"{route} quota-blocked ({exc})")
                self._update(rec, f"quota guard: {exc}",
                             status="WAITING-ROUTE")
                return False, "; ".join(notes)
            except FenceError as exc:
                notes.append(f"{route} fenced ({exc})")
                self._update(rec, f"fence: {exc}", status="FAILED")
                return False, "; ".join(notes)
            except Exception as exc:
                notes.append(f"{route} error ({exc})")
                self._update(rec, f"delivery error on {route}: {exc}",
                             status="FAILED")
                return False, "; ".join(notes)
            self._update(rec, f"sent via {route}",
                         status="SENT", route=route,
                         sent_ts=iso(self.clock()),
                         route_detail=detail)
            return True, f"sent via {route}"
        self._update(rec, "all routes down: " + "; ".join(notes),
                     status="WAITING-ROUTE")
        return False, "; ".join(notes)

    # -- commands ------------------------------------------------------------

    def send(self, sender, recipient, subject, body, priority="NORMAL",
             msg_class="commission", dedupe_key=None, in_reply_to=None,
             api_eligible=None):
        if priority not in PRIORITIES:
            raise ValueError(f"priority must be one of {PRIORITIES}")
        if msg_class not in CLASSES:
            raise ValueError(f"class must be one of {CLASSES}")
        if dedupe_key and dedupe_key in self.dedupe:
            return self.dedupe[dedupe_key], True  # duplicate suppressed
        if api_eligible is None:
            api_eligible = msg_class in ("short", "ping")
        now = self.clock()
        rec = {
            "id": self._next_id(),
            "sender": sender,
            "recipient": recipient,
            "ts_utc": iso(now),
            "priority": priority,
            "subject": subject,
            "body": body,
            "msg_class": msg_class,
            "api_eligible": bool(api_eligible),
            "status": "QUEUED",
            "route": None,
            "retry_count": 0,
            "in_reply_to": in_reply_to,
            "dedupe_key": dedupe_key,
            "history": [{"ts": iso(now), "note": "created"}],
        }
        self._append_log({"type": "message", "msg": rec})
        self.messages[rec["id"]] = rec
        self.order.append(rec["id"])
        if dedupe_key:
            self.dedupe[dedupe_key] = rec["id"]
        self._save_state()
        self.attempt_dispatch(rec)
        return rec["id"], False

    def ack(self, msg_id):
        rec = self.messages.get(msg_id)
        if rec is None:
            raise KeyError(f"unknown message {msg_id}")
        if rec["status"] == "ACKED":
            return rec, False
        if rec["status"] != "SENT":
            raise ValueError(
                f"cannot ack a message in status {rec['status']}")
        self._update(rec, "acknowledged", status="ACKED",
                     ack_ts=iso(self.clock()))
        return rec, True

    def record_answer(self, msg_id, body, route="outbox", sender=None):
        """Record an inbound response against an outbound message."""
        orig = self.messages.get(msg_id)
        if orig is None:
            raise KeyError(f"unknown message {msg_id}")
        now = self.clock()
        inbound = {
            "id": self._next_id(),
            "sender": sender or orig["recipient"],
            "recipient": orig["sender"],
            "ts_utc": iso(now),
            "priority": orig["priority"],
            "subject": f"Re: {orig['subject']}",
            "body": body,
            "msg_class": orig["msg_class"],
            "api_eligible": False,
            "status": "RECEIVED",
            "route": route,
            "retry_count": 0,
            "in_reply_to": msg_id,
            "dedupe_key": None,
            "history": [{"ts": iso(now),
                         "note": f"inbound answer recorded via {route}"}],
        }
        self._append_log({"type": "message", "msg": inbound})
        self.messages[inbound["id"]] = inbound
        self.order.append(inbound["id"])
        if orig["status"] in ("SENT", "ACKED", "QUEUED", "WAITING-ROUTE"):
            self._update(orig, f"answered (inbound {inbound['id']})",
                         status="ANSWERED", answer_id=inbound["id"],
                         answer_ts=iso(now))
        self._save_state()
        return inbound

    def inbound(self, sender, subject, body, in_reply_to=None,
                priority="NORMAL"):
        """Record a partner-initiated message (e.g. a ChatGPT delivery the
        existing Drive Outbox watch picked up)."""
        now = self.clock()
        rec = {
            "id": self._next_id(),
            "sender": sender,
            "recipient": "captain",
            "ts_utc": iso(now),
            "priority": priority,
            "subject": subject,
            "body": body,
            "msg_class": "short",
            "api_eligible": False,
            "status": "RECEIVED",
            "route": "outbox",
            "retry_count": 0,
            "in_reply_to": in_reply_to,
            "dedupe_key": None,
            "history": [{"ts": iso(now),
                         "note": "inbound recorded via outbox route"}],
        }
        self._append_log({"type": "message", "msg": rec})
        self.messages[rec["id"]] = rec
        self.order.append(rec["id"])
        if in_reply_to and in_reply_to in self.messages:
            orig = self.messages[in_reply_to]
            if orig["status"] in ("SENT", "ACKED"):
                self._update(orig, f"answered (inbound {rec['id']})",
                             status="ANSWERED", answer_id=rec["id"],
                             answer_ts=iso(now))
        self._save_state()
        return rec

    def recover(self):
        """Rebuild from the log (done at init) and requeue the stranded:
        SENT-but-unACKED past the retry window, plus QUEUED / WAITING-ROUTE
        items whose route may be back. ACKED / ANSWERED are never touched,
        so nothing is ever duplicated or lost."""
        now = self.clock()
        summary = {"requeued": [], "redispatched": [], "waiting": [],
                   "untouched": 0}
        for mid in list(self.order):
            rec = self.messages[mid]
            st = rec["status"]
            if st in ("ACKED", "ANSWERED", "RECEIVED"):
                summary["untouched"] += 1
                continue
            if st == "SENT":
                sent_epoch = datetime.strptime(
                    rec["sent_ts"], "%Y-%m-%dT%H:%M:%SZ").replace(
                    tzinfo=timezone.utc).timestamp()
                if now - sent_epoch <= self.retry_window:
                    summary["untouched"] += 1
                    continue
                self._update(rec, "recover: SENT past retry window, "
                                  "requeued",
                             status="QUEUED",
                             retry_count=rec["retry_count"] + 1)
                summary["requeued"].append(mid)
                sent, _ = self.attempt_dispatch(rec)
                if sent:
                    summary["redispatched"].append(mid)
                else:
                    summary["waiting"].append(mid)
            elif st in ("QUEUED", "WAITING-ROUTE"):
                sent, _ = self.attempt_dispatch(rec)
                if sent:
                    summary["redispatched"].append(mid)
                else:
                    summary["waiting"].append(mid)
            else:  # FAILED: left for the captain's eyes, never auto-resent
                summary["untouched"] += 1
        self._save_state()
        return summary


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------

def main(argv=None):
    ap = argparse.ArgumentParser(prog="engine.py",
                                 description=__doc__.splitlines()[0])
    ap.add_argument("--home", default=DEFAULT_HOME)
    ap.add_argument("--queue-file", default=None)
    ap.add_argument("--desk-dir", default=None)
    ap.add_argument("--session-marker", default=None)
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("send")
    p.add_argument("--from", dest="sender", required=True)
    p.add_argument("--to", dest="recipient", required=True)
    p.add_argument("--subject", required=True)
    p.add_argument("--body", default=None)
    p.add_argument("--body-file", default=None)
    p.add_argument("--priority", default="NORMAL", choices=PRIORITIES)
    p.add_argument("--class", dest="msg_class", default="commission",
                   choices=CLASSES)
    p.add_argument("--dedupe-key", default=None)
    p.add_argument("--in-reply-to", default=None)
    g = p.add_mutually_exclusive_group()
    g.add_argument("--api-eligible", dest="api_eligible",
                   action="store_true", default=None)
    g.add_argument("--no-api-eligible", dest="api_eligible",
                   action="store_false")

    p = sub.add_parser("list")
    p.add_argument("--status", default=None)
    p.add_argument("--to", dest="recipient", default=None)

    p = sub.add_parser("status")
    p.add_argument("id")

    p = sub.add_parser("ack")
    p.add_argument("id")

    p = sub.add_parser("answer")
    p.add_argument("id")
    p.add_argument("--body", required=True)
    p.add_argument("--route", default="outbox")
    p.add_argument("--from", dest="sender", default=None)

    p = sub.add_parser("inbound")
    p.add_argument("--from", dest="sender", required=True)
    p.add_argument("--subject", required=True)
    p.add_argument("--body", required=True)
    p.add_argument("--in-reply-to", default=None)
    p.add_argument("--priority", default="NORMAL", choices=PRIORITIES)

    p = sub.add_parser("health")
    p.add_argument("--probe", action="store_true")

    sub.add_parser("recover")

    args = ap.parse_args(argv)
    eng = Engine(home=args.home, queue_file=args.queue_file,
                 desk_dir=args.desk_dir, session_marker=args.session_marker)

    if args.cmd == "send":
        body = args.body
        if args.body_file:
            with open(args.body_file, encoding="utf-8") as fh:
                body = fh.read()
        if body is None:
            print("send needs --body or --body-file", file=sys.stderr)
            return 2
        mid, dup = eng.send(args.sender, args.recipient, args.subject, body,
                            priority=args.priority,
                            msg_class=args.msg_class,
                            dedupe_key=args.dedupe_key,
                            in_reply_to=args.in_reply_to,
                            api_eligible=args.api_eligible)
        rec = eng.messages[mid]
        if dup:
            print(f"{mid} (duplicate suppressed — original message kept)")
        else:
            print(f"{mid} status={rec['status']} route={rec['route']}")
        return 0
    if args.cmd == "list":
        for mid in eng.order:
            rec = eng.messages[mid]
            if args.status and rec["status"] != args.status:
                continue
            if args.recipient and rec["recipient"] != args.recipient:
                continue
            print(f"{rec['id']}  {rec['ts_utc']}  {rec['sender']} -> "
                  f"{rec['recipient']}  [{rec['status']}]"
                  f"{' via ' + rec['route'] if rec['route'] else ''}  "
                  f"{rec['priority']}  {rec['subject']}")
        return 0
    if args.cmd == "status":
        rec = eng.messages.get(args.id)
        if rec is None:
            print(f"unknown message {args.id}", file=sys.stderr)
            return 1
        print(json.dumps(rec, ensure_ascii=False, indent=1))
        return 0
    if args.cmd == "ack":
        rec, changed = eng.ack(args.id)
        print(f"{rec['id']} status={rec['status']}"
              f"{'' if changed else ' (already acked)'}")
        return 0
    if args.cmd == "answer":
        inbound = eng.record_answer(args.id, args.body, route=args.route,
                                    sender=args.sender)
        print(f"answer recorded as {inbound['id']}; "
              f"{args.id} status={eng.messages[args.id]['status']}")
        return 0
    if args.cmd == "inbound":
        rec = eng.inbound(args.sender, args.subject, args.body,
                          in_reply_to=args.in_reply_to,
                          priority=args.priority)
        print(f"{rec['id']} recorded (inbound from {rec['sender']})")
        return 0
    if args.cmd == "health":
        report = eng.health(probe=args.probe)
        for route in ROUTES:
            up, evidence = report[route]
            print(f"{route:14s} {'UP  ' if up else 'DOWN'}  {evidence}")
        print(f"{'api quota':14s}      {json.dumps(eng.api_usage())}")
        return 0
    if args.cmd == "recover":
        summary = eng.recover()
        print(json.dumps(summary, ensure_ascii=False))
        return 0
    return 2


if __name__ == "__main__":
    sys.exit(main())

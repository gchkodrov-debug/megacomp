#!/usr/bin/env python3
"""Self-tests for the PROVADIA Permanent Communication Engine.

Runs entirely in temp sandboxes. NO live sends: the desk route writes only
to a temp dir, the queue route appends only to a temp queue copy, and the
gemini-api transport + proof read are MOCKED — no network call of any kind
is made by this suite.

Run:  python3 test_engine.py
Exit: 0 if every test PASSes, 1 otherwise.
"""
import contextlib
import io
import json
import os
import re
import sys
import tempfile
import traceback
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import engine as pcn

T0 = datetime(2026, 11, 27, 12, 0, 0, tzinfo=timezone.utc).timestamp()
RESULTS = []


class FakeClock:
    def __init__(self, t=T0):
        self.t = t

    def __call__(self):
        return self.t

    def advance(self, sec):
        self.t += sec


class MockTransport:
    def __init__(self):
        self.calls = []

    def __call__(self, model, text):
        self.calls.append((model, text))
        return "mock gemini reply"


def mock_proof_ok():
    return True, "mock proof read HTTP 200"


def make_engine(tmp, clock, transport=None, proof=mock_proof_ok,
                retry_window=600, api_model="gemini-3.1-flash-lite"):
    home = os.path.join(tmp, "home")
    queue = os.path.join(tmp, "QUEUE.md")
    if not os.path.exists(queue):
        open(queue, "w").close()
    return pcn.Engine(home=home, queue_file=queue,
                      api_transport=transport or MockTransport(),
                      api_proof=proof, clock=clock,
                      retry_window=retry_window, api_model=api_model)


def write_marker(eng, clock):
    with open(eng.session_marker, "w", encoding="utf-8") as fh:
        json.dump({"ts": clock.t, "session": "up"}, fh)


def quiet(fn, *a, **kw):
    with contextlib.redirect_stdout(io.StringIO()):
        return fn(*a, **kw)


def report(name, ok, detail=""):
    RESULTS.append((name, ok, detail))
    print(f"{'PASS' if ok else 'FAIL'}  {name}"
          + (f" — {detail}" if detail else ""))


# ---------------------------------------------------------------------------
def test_a_lifecycle():
    tmp = tempfile.mkdtemp(prefix="pcn-a-")
    clock = FakeClock()
    eng = make_engine(tmp, clock)
    mid, dup = quiet(eng.send, "captain", "chatgpt", "Test TW3",
                     "Please acknowledge.", msg_class="short",
                     dedupe_key="a-1")
    rec = eng.messages[mid]
    assert re.fullmatch(r"PCN-\d{8}-\d{4}", mid), f"bad id {mid}"
    assert not dup and rec["status"] == "SENT" and rec["route"] == "desk", rec
    desk_file = os.path.join(eng.desk_dir, mid + ".md")
    assert os.path.exists(desk_file), "desk file not written"
    quiet(eng.ack, mid)
    assert eng.messages[mid]["status"] == "ACKED"
    inbound = eng.record_answer(mid, "ACK TW3 — Guardian received.")
    after = eng.messages[mid]
    assert after["status"] == "ANSWERED", after["status"]
    assert inbound["in_reply_to"] == mid and inbound["status"] == "RECEIVED"
    assert after["answer_id"] == inbound["id"]
    report("a) send->ack->answer lifecycle (desk route)",
           True, f"{mid} SENT->ACKED->ANSWERED, answer {inbound['id']}")


def test_b_dedupe():
    tmp = tempfile.mkdtemp(prefix="pcn-b-")
    clock = FakeClock()
    eng = make_engine(tmp, clock)
    mid1, dup1 = quiet(eng.send, "captain", "chatgpt", "S", "B",
                       msg_class="short", dedupe_key="same-key")
    mid2, dup2 = quiet(eng.send, "captain", "chatgpt", "S", "B",
                       msg_class="short", dedupe_key="same-key")
    assert mid1 == mid2 and not dup1 and dup2, (mid1, mid2, dup1, dup2)
    assert len(eng.messages) == 1, f"{len(eng.messages)} messages"
    files = [f for f in os.listdir(eng.desk_dir) if f.endswith(".md")]
    assert files == [mid1 + ".md"], files
    report("b) dedupe — same key returns original ID, one send only",
           True, f"{mid1} kept, second send suppressed")


def test_c_failover():
    tmp = tempfile.mkdtemp(prefix="pcn-c-")
    clock = FakeClock()
    transport = MockTransport()
    eng = make_engine(tmp, clock, transport=transport)
    # No session marker -> gemini-queue route is DOWN.
    up, _ = eng.route_health("gemini-queue")
    assert not up, "queue route should be DOWN without a session marker"
    ping_id, _ = eng.send("captain", "gemini", "Ping", "Are you there?",
                          msg_class="ping")
    ping = eng.messages[ping_id]
    assert ping["status"] == "SENT" and ping["route"] == "gemini-api", ping
    assert len(transport.calls) == 1, transport.calls
    comm_id, _ = eng.send("captain", "gemini", "Commission #999",
                          "A long brief that must wait for the browser seat.",
                          msg_class="commission")
    comm = eng.messages[comm_id]
    assert comm["status"] == "WAITING-ROUTE", comm["status"]
    assert len(transport.calls) == 1, "commission must NOT reroute to API"
    with open(eng.queue_file, encoding="utf-8") as fh:
        assert comm_id not in fh.read(), "commission leaked into queue file"
    report("c) failover — ping reroutes to API, commission WAITS",
           True, f"ping via gemini-api; {comm_id} WAITING-ROUTE")


def test_d_recovery():
    tmp = tempfile.mkdtemp(prefix="pcn-d-")
    clock = FakeClock()
    eng = make_engine(tmp, clock, retry_window=600)
    write_marker(eng, clock)
    a_id, _ = eng.send("captain", "gemini", "Commission A", "Brief A.",
                       msg_class="commission")
    assert eng.messages[a_id]["status"] == "SENT"
    b_id, _ = quiet(eng.send, "captain", "chatgpt", "Note B", "Body B.",
                    msg_class="short")
    quiet(eng.ack, b_id)
    os.remove(eng.session_marker)  # browser route drops
    c_id, _ = eng.send("captain", "gemini", "Commission C", "Brief C.",
                       msg_class="commission")
    assert eng.messages[c_id]["status"] == "WAITING-ROUTE"
    # Simulate a crash: state snapshot destroyed mid-flight.
    os.remove(eng.state_path)
    clock.advance(601)  # past the 600 s retry window
    write_marker(eng, clock)  # browser route restored
    eng2 = make_engine(tmp, clock, retry_window=600)
    assert set(eng2.messages) == {a_id, b_id, c_id}, "messages lost in crash"
    summary = eng2.recover()
    a2 = eng2.messages[a_id]
    assert a2["status"] == "SENT" and a2["retry_count"] == 1, a2
    with open(eng2.queue_file, encoding="utf-8") as fh:
        qtext = fh.read()
    assert qtext.count(a_id) >= 2 and qtext.count("Commission A") == 2, \
        "A must be re-dispatched exactly once"
    assert eng2.messages[b_id]["status"] == "ACKED", "ACKED must be untouched"
    desk_files = [f for f in os.listdir(eng2.desk_dir) if f.endswith(".md")]
    assert desk_files == [b_id + ".md"], f"desk duplicated: {desk_files}"
    c2 = eng2.messages[c_id]
    assert c2["status"] == "SENT" and c2["route"] == "gemini-queue", c2
    assert len(eng2.messages) == 3, "no message may be lost or duplicated"
    report("d) restart recovery — stranded requeued once, ACKED untouched, "
           "nothing lost/duplicated", True,
           f"requeued={summary['requeued']} redispatched="
           f"{sorted(summary['redispatched'])}")


def test_e_quota():
    tmp = tempfile.mkdtemp(prefix="pcn-e-")
    clock = FakeClock()
    transport = MockTransport()
    eng = make_engine(tmp, clock, transport=transport)
    # Route down (no marker) -> pings use the API route.
    first, _ = eng.send("captain", "gemini", "P1", "x", msg_class="ping")
    assert eng.messages[first]["status"] == "SENT"
    assert len(transport.calls) == 1
    second, _ = eng.send("captain", "gemini", "P2", "x", msg_class="ping")
    assert eng.messages[second]["status"] == "WAITING-ROUTE", \
        "call <60s after the previous must be blocked by the spacing guard"
    assert len(transport.calls) == 1, "blocked call must not reach transport"
    # Fill the day: 19 more allowed calls, each spaced 61 s.
    for i in range(19):
        clock.advance(61)
        mid, _ = eng.send("captain", "gemini", f"P{i + 3}", "x",
                          msg_class="ping")
        assert eng.messages[mid]["status"] == "SENT", \
            f"call {i + 2} of 20 should be allowed"
    assert len(transport.calls) == 20
    clock.advance(61)
    over, _ = eng.send("captain", "gemini", "P-over", "x", msg_class="ping")
    assert eng.messages[over]["status"] == "WAITING-ROUTE", \
        "the 21st API call of the day must be blocked"
    assert len(transport.calls) == 20, "21st call reached the transport!"
    # The count survives a restart (state rebuilt from the log).
    eng2 = make_engine(tmp, clock, transport=transport)
    assert eng2.api_usage()["calls_today"] == 20, eng2.api_usage()
    clock.advance(61)
    over2, _ = eng2.send("captain", "gemini", "P-over2", "x",
                         msg_class="ping")
    assert eng2.messages[over2]["status"] == "WAITING-ROUTE"
    assert len(transport.calls) == 20
    report("e) quota guard — <60s spacing blocked, 21st call of the day "
           "blocked, count persists across restart", True,
           "20 calls allowed, every further call refused pre-transport")


def test_f_tts_fence():
    tmp = tempfile.mkdtemp(prefix="pcn-f-")
    clock = FakeClock()
    transport = MockTransport()
    eng = make_engine(tmp, clock, transport=transport,
                      api_model="gemini-3.8-flash-tts")
    up, evidence = eng.route_health("gemini-api")
    assert not up and "NEVER" in evidence, evidence
    mid, _ = eng.send("captain", "gemini", "Ping", "x", msg_class="ping")
    assert eng.messages[mid]["status"] != "SENT"
    assert len(transport.calls) == 0, "TTS model must never be called"
    report("f) Solnik fence — a TTS/speech model is refused outright",
           True, "api route DOWN by fence, zero transport calls")


TESTS = [test_a_lifecycle, test_b_dedupe, test_c_failover,
         test_d_recovery, test_e_quota, test_f_tts_fence]

if __name__ == "__main__":
    for t in TESTS:
        try:
            t()
        except Exception:
            report(t.__name__, False, "exception")
            traceback.print_exc()
    passed = sum(1 for _, ok, _ in RESULTS if ok)
    print(f"\n{passed}/{len(RESULTS)} tests PASS")
    sys.exit(0 if passed == len(RESULTS) else 1)

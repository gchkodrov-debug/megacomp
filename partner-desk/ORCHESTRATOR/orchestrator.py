#!/usr/bin/env python3
"""
PROVADIA PRODUCTION ORCHESTRATOR v1 — founder directive 2026-11-28 00:41 CT.

A persistent, deterministic production loop on the captain's machine:
- Every tick (60s as a daemon; also runnable once via `tick`):
  1. Reaps finished army executions (no duplicate execution: a job is
     dispatched exactly once per attempt, tracked by pid + attempt count).
  2. Routes delivered work automatically to an examination job on a
     DIFFERENT-FAMILY seat (Relay Law). Examination outputs are verdicts
     for the captain — the orchestrator never certifies anything itself.
  3. Dispatches queued jobs to idle seats within the concurrency cap.
  4. Prepares partner packets (Gemini / ChatGPT) as files + engine records;
     partner completion returns through the house channels (desk / engine /
     bridge) and is picked up by the captain's watches — packets are never
     counted as completed software.
  5. Renders the live register (REGISTER.md) and a heartbeat.
- Safety: kill switch file (KILL). Max 2 attempts per job, then PARKED.
  HTTP 402 / credit exhaustion in a seat's stderr flags FOUNDER-ACTION
  (resource problem) in the register instead of retrying.
  No spending beyond the already-funded Ollama bench; no publishing;
  no browser; no credentials.
State: queue.json in this directory. All times UTC ISO.
"""
from __future__ import annotations

import hashlib
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
QUEUE_PATH = HERE / "queue.json"
REGISTER_JSON = HERE / "register.json"
REGISTER_MD = HERE / "REGISTER.md"
HEARTBEAT = HERE / "heartbeat.json"
LOG_PATH = HERE / "orchestrator.log"
KILL_PATH = HERE / "KILL"
JOBS_DIR = HERE / "jobs"
PACKETS_DIR = HERE / "packets"
# Resolve the bench CLI from THIS FILE's location, never from the process
# HOME — under systemd the daemon's HOME is /root, which silently pointed
# the first launch at a nonexistent path (caught in the first-run test).
HATCH_HOME = HERE.parents[3]
OLLAMA = HATCH_HOME / "workspace/custom-connectors/custom.ollama/bin/ollama.py"
PROCS: dict[str, subprocess.Popen] = {}
MAX_PARALLEL = 2
MAX_ATTEMPTS = 2

# Different-family examination rotation (Relay Law: critic seat != builder seat family)
FAMILY = {
    "deepseek": "deepseek", "kimi": "kimi", "glm": "glm", "gemma": "gemma",
    "nemotron": "nemotron", "mistral": "mistral", "mimo": "mimo",
    "gpt-oss": "gpt-oss", "minimax": "minimax", "beam": "beam",
    "inkling": "inkling", "hy": "hy", "muse-spark": "muse-spark", "clef": "clef",
}
EXAMINERS = ["gemma4:31b", "nemotron-3-ultra", "kimi-k3", "glm-5.2", "mistral-large-4"]


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def log(msg: str) -> None:
    line = f"{now()} {msg}"
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def family_of(seat: str) -> str:
    for prefix, fam in FAMILY.items():
        if seat.startswith(prefix):
            return fam
    return seat.split("-")[0]


def load_queue() -> dict:
    if QUEUE_PATH.exists():
        return json.loads(QUEUE_PATH.read_text(encoding="utf-8"))
    return {"seq": 0, "jobs": []}


def save_queue(q: dict) -> None:
    tmp = QUEUE_PATH.with_suffix(".tmp")
    tmp.write_text(json.dumps(q, indent=1), encoding="utf-8")
    tmp.replace(QUEUE_PATH)


def brief_hash(system_path: str, user_path: str) -> str:
    h = hashlib.sha256()
    for p in (system_path, user_path):
        h.update(Path(p).read_bytes() if p and Path(p).exists() else b"")
    return h.hexdigest()[:16]


def enqueue(q: dict, *, line: int, title: str, seat: str, kind: str,
            system: str = "", user: str = "", parent: str = "") -> dict | None:
    """Add a job unless an identical active job already exists (dedupe)."""
    bh = brief_hash(system, user) if kind == "army" else ""
    for j in q["jobs"]:
        if (j["status"] in ("queued", "running", "delivered", "in_examination")
                and j["title"] == title and j.get("brief_hash", "") == bh and not parent):
            log(f"enqueue refused (duplicate active): {title}")
            return None
    q["seq"] += 1
    job = {
        "id": f"ORCH-{q['seq']:04d}", "line": line, "title": title, "seat": seat,
        "kind": kind, "system": system, "user": user, "brief_hash": bh,
        "parent": parent, "status": "queued", "attempts": 0, "pid": None,
        "created_at": now(), "started_at": "", "finished_at": "",
        "output": "", "verdict": "", "flag": "",
    }
    q["jobs"].append(job)
    log(f"enqueued {job['id']} [{seat}] {title}")
    return job


def running_jobs(q: dict) -> list[dict]:
    return [j for j in q["jobs"] if j["status"] == "running"]


def pid_alive(pid: int | None) -> bool:
    """True only for a genuinely running process. A zombie (state Z) is dead:
    os.kill(pid, 0) alone stays true for zombies, which would stall reaping
    forever — the second defect caught in the first-run test."""
    if not pid:
        return False
    try:
        stat = Path(f"/proc/{pid}/stat").read_text(encoding="utf-8")
        return stat.rsplit(")", 1)[1].split()[1] != "Z"
    except (FileNotFoundError, IndexError):
        return False


def dispatch(q: dict, job: dict) -> None:
    JOBS_DIR.mkdir(exist_ok=True)
    out_path = JOBS_DIR / f"{job['id']}.out.md"
    err_path = JOBS_DIR / f"{job['id']}.err"
    cmd = ["python3", str(OLLAMA), "chat", job["seat"], job["system"], job["user"]]
    with out_path.open("wb") as out, err_path.open("wb") as err:
        proc = subprocess.Popen(cmd, stdout=out, stderr=err,
                                start_new_session=True)
    PROCS[job["id"]] = proc  # kept so reap can poll() — poll reaps the child
    job["pid"] = proc.pid
    job["status"] = "running"
    job["attempts"] += 1
    job["started_at"] = now()
    job["output"] = str(out_path)
    save_queue(q)  # persist BEFORE returning: a crash here must never re-dispatch (C2)
    log(f"dispatched {job['id']} -> {job['seat']} pid={proc.pid} attempt={job['attempts']}")


def route_examination(q: dict, job: dict) -> None:
    """Delivered work goes to a different-family examiner automatically."""
    fam = family_of(job["seat"])
    examiner = next((e for e in EXAMINERS if family_of(e) != fam), EXAMINERS[0])
    sys_path = JOBS_DIR / f"{job['id']}.exam-system.txt"
    usr_path = JOBS_DIR / f"{job['id']}.exam-user.txt"
    sys_path.write_text(
        "You are an independent examiner in the PROVADIA Relay Law chain. You did not "
        "produce the work below and you owe it no loyalty. Examine it against its brief: "
        "completeness, correctness, internal consistency, and anything claimed but not "
        "shown. Grade every finding CONFIRMED / NEEDS-CHECK / REJECTED with one line of "
        "evidence each. End with a single verdict line: VERDICT: PASS, VERDICT: PASS-WITH-FIXES, "
        "or VERDICT: FAIL, and the fixes required. Plain, short, specific.", encoding="utf-8")
    brief_text = ""
    if job["user"] and Path(job["user"]).exists():
        brief_text = Path(job["user"]).read_text(encoding="utf-8")[:6000]
    output_text = ""
    if job["output"] and Path(job["output"]).exists():
        output_text = Path(job["output"]).read_text(encoding="utf-8")[:12000]
    usr_path.write_text(
        f"EXAMINATION of job {job['id']} — {job['title']} (builder seat: {job['seat']})\n\n"
        f"=== THE BRIEF ===\n{brief_text}\n\n=== THE DELIVERED WORK ===\n{output_text}\n",
        encoding="utf-8")
    exam = enqueue(q, line=5, title=f"Examination of {job['id']} — {job['title']}",
                   seat=examiner, kind="army", system=str(sys_path), user=str(usr_path),
                   parent=job["id"])
    if exam:
        job["status"] = "in_examination"
        log(f"routed {job['id']} to examination {exam['id']} on {examiner}")


def reap(q: dict) -> None:
    for job in running_jobs(q):
        proc = PROCS.get(job["id"])
        retcode = None
        if proc is not None:
            retcode = proc.poll()
            if retcode is None:
                continue
            PROCS.pop(job["id"], None)
        elif pid_alive(job["pid"]):
            continue
        err_text = ""
        err_path = JOBS_DIR / f"{job['id']}.err"
        if err_path.exists():
            err_text = err_path.read_text(encoding="utf-8", errors="replace")
        out_path = Path(job["output"]) if job["output"] else None
        out_size = out_path.stat().st_size if out_path and out_path.exists() else 0
        out_head = ""
        if out_path and out_path.exists() and out_size > 0:
            out_head = out_path.read_text(encoding="utf-8", errors="replace")[:16]
        # Delivery gate (hardened after the first-run test): the bench CLI
        # reports transport failures as a tiny "HTTP <status>" file with a
        # zero-ish footprint — that is a FAILURE, never a delivery.
        out_ok = (retcode in (0, None) and out_size >= 200
                  and not out_head.startswith("HTTP ")
                  and not err_text.strip().startswith("Traceback"))
        job["pid"] = None
        job["finished_at"] = now()
        if "402" in err_text or "credit" in err_text.lower():
            job["status"] = "parked"
            job["flag"] = "FOUNDER-ACTION: resource/credit failure at the seat — no retry"
            log(f"{job['id']} PARKED — credit/resource failure")
            continue
        if out_ok:
            job["status"] = "delivered"
            log(f"{job['id']} DELIVERED ({job['seat']})")
            if job["parent"]:
                parent = next((j for j in q["jobs"] if j["id"] == job["parent"]), None)
                if parent and parent["status"] == "in_examination":
                    # Parse the examiner's VERDICT line — an examination must
                    # have operational effect, not dead-end at "examined".
                    exam_text = Path(job["output"]).read_text(
                        encoding="utf-8", errors="replace") if job["output"] else ""
                    verdict = "UNPARSED"
                    for ln in exam_text.splitlines():
                        if "VERDICT:" in ln:
                            verdict = ln.split("VERDICT:", 1)[1].strip()[:40]
                    parent["verdict"] = f"{verdict} (exam {job['id']})"
                    if verdict.startswith("FAIL") and not parent.get("rework_of"):
                        parent["status"] = "examined"
                        rw_sys = JOBS_DIR / f"{parent['id']}.rework-system.txt"
                        rw_usr = JOBS_DIR / f"{parent['id']}.rework-user.txt"
                        rw_sys.write_text(
                            "You are a PROVADIA army builder seat under the Relay Law. "
                            "Revise the work below against the examiner's findings. "
                            "Deliver the complete corrected document, not a diff.", encoding="utf-8")
                        orig = Path(parent["output"]).read_text(
                            encoding="utf-8", errors="replace")[:9000] if parent["output"] else ""
                        rw_usr.write_text(
                            f"REWORK of {parent['id']} — {parent['title']}\n\n"
                            f"=== EXAMINER'S FINDINGS ===\n{exam_text[:6000]}\n\n"
                            f"=== ORIGINAL WORK ===\n{orig}\n", encoding="utf-8")
                        rw = enqueue(q, line=parent["line"],
                                     title=f"Rework of {parent['id']} — {parent['title']}",
                                     seat=parent["seat"], kind="army",
                                     system=str(rw_sys), user=str(rw_usr))
                        if rw:
                            rw["rework_of"] = parent["id"]
                            log(f"{parent['id']} verdict FAIL — rework {rw['id']} enqueued")
                    else:
                        parent["status"] = "examined"
                    log(f"{parent['id']} EXAMINED via {job['id']} — verdict: {verdict}")
            else:
                route_examination(q, job)
        else:
            if job["attempts"] < MAX_ATTEMPTS:
                job["status"] = "queued"
                log(f"{job['id']} failed (attempt {job['attempts']}) — requeued once")
            else:
                job["status"] = "parked"
                job["flag"] = "failed after max attempts — captain review"
                log(f"{job['id']} PARKED after {job['attempts']} attempts")


def prepare_packets(q: dict) -> None:
    PACKETS_DIR.mkdir(exist_ok=True)
    for job in q["jobs"]:
        if job["kind"] == "packet" and job["status"] == "queued":
            packet = PACKETS_DIR / f"{job['id']}.md"
            body = ""
            if job["user"] and Path(job["user"]).exists():
                body = Path(job["user"]).read_text(encoding="utf-8")
            packet.write_text(f"# {job['title']}\nTo: {job['seat']}\nJob: {job['id']} · Line {job['line']}\n\n{body}\n",
                              encoding="utf-8")
            job["output"] = str(packet)
            job["status"] = "awaiting_partner"
            job["started_at"] = now()
            log(f"packet prepared {job['id']} -> {job['seat']} ({packet.name})")


def dispatch_idle(q: dict) -> None:
    """At most ONE new dispatch per tick: the first-run test proved a burst
    of simultaneous large generations collapses the route (all four seats
    returned transport failures) while solo launches succeed. Launches are
    staggered a tick apart; executions still overlap."""
    busy_seats = {j["seat"] for j in running_jobs(q)}
    if len(running_jobs(q)) >= MAX_PARALLEL:
        return
    for job in q["jobs"]:
        if job["kind"] == "army" and job["status"] == "queued" and job["seat"] not in busy_seats:
            dispatch(q, job)
            return


def render_register(q: dict) -> None:
    counts: dict[str, int] = {}
    for j in q["jobs"]:
        counts[j["status"]] = counts.get(j["status"], 0) + 1
    reg = {"updated_at": now(), "counts": counts, "jobs": q["jobs"]}
    REGISTER_JSON.write_text(json.dumps(reg, indent=1), encoding="utf-8")
    lines = [f"# PROVADIA PRODUCTION ORCHESTRATOR — LIVE REGISTER",
             f"Updated: {reg['updated_at']} UTC · counts: {counts}", ""]
    lines.append("| Job | Line | Seat | Status | Title | Started | Finished |")
    lines.append("|---|---|---|---|---|---|---|")
    for j in q["jobs"]:
        # M1 fix: the last column is FINISHED, never "Delivered" — failed and
        # parked jobs also finish, and the register must not dress them as deliveries.
        lines.append(f"| {j['id']} | {j['line']} | {j['seat']} | {j['status']} | "
                     f"{j['title'][:64]} | {j['started_at'][11:19]} | {j['finished_at'][11:19]} |")
    flags = [j for j in q["jobs"] if j.get("flag")]
    if flags:
        lines += ["", "## FLAGS"]
        lines += [f"- {j['id']}: {j['flag']}" for j in flags]
    REGISTER_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    HEARTBEAT.write_text(json.dumps({"alive_at": now(), "counts": counts}), encoding="utf-8")


def tick() -> None:
    if KILL_PATH.exists():
        log("tick skipped — KILL switch present")
        return
    q = load_queue()
    reap(q)
    prepare_packets(q)
    dispatch_idle(q)
    save_queue(q)
    render_register(q)


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 0
    cmd = sys.argv[1]
    if cmd == "tick":
        tick()
    elif cmd == "daemon":
        log("daemon started")
        while not KILL_PATH.exists():
            try:
                tick()
            except Exception as exc:  # never die on one bad tick
                log(f"tick error: {exc!r}")
            time.sleep(60)
        log("daemon stopped — KILL switch")
    elif cmd == "status":
        q = load_queue()
        for j in q["jobs"]:
            print(f"{j['id']} line{j['line']} {j['status']:16s} {j['seat']:28s} {j['title']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""
Rino Multi-Agent System - George's AI Agent Mesh
Uses AutoGen + Ollama for local AI orchestration
"""
import json
import os
import subprocess
import platform
import sys
from datetime import datetime

# Force UTF-8 for Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

class RinoAgent:
    """Base agent for system intelligence"""
    def __init__(self, name, role):
        self.name = name
        self.role = role
        self.log = []
    
    def think(self, task):
        """Process a task using available AI models"""
        self.log.append(f"[{datetime.now()}] {self.name} thinking about: {task}")
        return f"{self.name} processed: {task}"
    
    def report(self):
        return {"name": self.name, "role": self.role, "logs": self.log[-5:]}

class SystemWatcher(RinoAgent):
    """Monitors system health and performance"""
    def __init__(self):
        super().__init__("Watcher", "System Monitor")
    
    def scan(self):
        info = {
            "time": datetime.now().isoformat(),
            "os": platform.system() + " " + platform.release(),
            "cpu": platform.processor(),
            "node": platform.node(),
            "python": platform.python_version()
        }
        # Disk check
        try:
            import shutil
            total, used, free = shutil.disk_usage("C:\\")
            info["disk_total_gb"] = round(total / (2**30), 1)
            info["disk_free_gb"] = round(free / (2**30), 1)
            info["disk_used_pct"] = round(used / total * 100, 1)
        except: pass
        self.log.append(f"[{datetime.now()}] System scan: {json.dumps(info)}")
        return info

class OllamaBrain(RinoAgent):
    """Interface with local Ollama LLM"""
    def __init__(self):
        super().__init__("OllamaBrain", "Local AI Reasoning")
    
    def query(self, prompt, model="gemma4:e2b"):
        try:
            result = subprocess.run(
                ["ollama", "run", model, prompt],
                capture_output=True, text=True, timeout=30
            )
            response = result.stdout.strip() if result.stdout else result.stderr.strip()
            self.log.append(f"[{datetime.now()}] Ollama query: {response[:100]}...")
            return response
        except Exception as e:
            return f"Ollama error: {e}"

class GitHubAgent(RinoAgent):
    """Controls GitHub operations"""
    def __init__(self, token):
        super().__init__("GitHubAgent", "Repository Management")
        self.token = token
    
    def push_update(self, repo_path="C:\\Users\\User\\Desktop\\megacomp"):
        try:
            os.chdir(repo_path)
            subprocess.run(["git", "add", "."], capture_output=True)
            subprocess.run(["git", "commit", "-m", f"auto: Rino update {datetime.now().isoformat()[:10]}"], capture_output=True)
            result = subprocess.run(["git", "push"], capture_output=True, text=True)
            self.log.append(f"[{datetime.now()}] Git push: {result.returncode}")
            return result.returncode == 0
        except Exception as e:
            self.log.append(f"[{datetime.now()}] Git error: {e}")
            return False

class RinoOrchestrator:
    """The brain - orchestrates all agents"""
    def __init__(self):
        self.name = "Rino"
        self.master = "George"
        self.agents = {
            "watcher": SystemWatcher(),
            "brain": OllamaBrain(),
            "github": GitHubAgent(os.environ.get("GH_TOKEN", ""))
        }
        self.auto_improve_mode = True
    
    def run_cycle(self):
        """One complete intelligence cycle"""
        border = "+" + "=" * 38 + "+"
        print(border)
        print("|        RINO Orchestrator v2.0         |")
        print(f"|     Serving: {self.master:<30s}|")
        print(border)
        
        # Phase 1: Observe
        print("\n[Phase 1] Observing system...")
        system_state = self.agents["watcher"].scan()
        print(f"  CPU: {system_state.get('cpu', 'N/A')}")
        print(f"  Disk: {system_state.get('disk_free_gb', '?')}GB free")
        print(f"  RAM: {system_state.get('ram_free_gb', '?')}GB free")
        
        # Phase 2: Think
        print("\n[Phase 2] Thinking...")
        if system_state.get('disk_free_gb', 100) < 10:
            advice = self.agents["brain"].query(
                f"System has only {system_state['disk_free_gb']}GB free. Suggest 3 quick fixes."
            )
            print(f"  Advice: {advice}")
        
        # Phase 3: Act
        print("\n[Phase 3] Acting...")
        if self.auto_improve_mode:
            pushed = self.agents["github"].push_update()
            print(f"  Git push: {'✓' if pushed else '✗'}")
        
        # Phase 4: Report
        print("\n[Phase 4] Reports:")
        for name, agent in self.agents.items():
            r = agent.report()
            print(f"  {r['name']} ({r['role']}): {len(r['logs'])} actions logged")
        
        print("\n✅ Rino cycle complete")
        return system_state

if __name__ == "__main__":
    rino = RinoOrchestrator()
    rino.run_cycle()

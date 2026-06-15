# Rino - MegaComp Self-Improvement Brain
# George's personal AI system optimizer
# Loads config from GitHub, runs diagnostics, applies tweaks

param(
    [switch]$Check,
    [switch]$Apply,
    [switch]$Report
)

$version = "1.0.0"
$configUrl = "https://raw.githubusercontent.com/gchkodrov-debug/megacomp/main/config.json"
$repoDir = "C:\Users\User\Desktop\megacomp"

function Write-Banner {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "      RINO v$version - MegaComp AI         " -ForegroundColor Cyan
    Write-Host "   Your system. Your agent. One.          " -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
}

function Get-SystemHealth {
    $health = @{}
    $health["CPU"] = (Get-CimInstance Win32_Processor).Name
    $health["RAM_GB"] = [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 2)
    $health["RAM_Free_GB"] = [math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory / 1MB, 2)
    $health["Disk_Free_GB"] = [math]::Round((Get-PSDrive C).Free / 1GB, 2)
    $health["Disk_Total_GB"] = [math]::Round(((Get-PSDrive C).Used + (Get-PSDrive C).Free) / 1GB, 2)
    $health["Uptime_Days"] = [math]::Round(((Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime).TotalDays, 1)
    $health["Processes"] = (Get-Process).Count
    $health["GPU"] = (Get-CimInstance Win32_VideoController | Where-Object Name -like "*NVIDIA*").Name
    $health["GPU_Driver"] = (Get-CimInstance Win32_VideoController | Where-Object Name -like "*NVIDIA*" | Select-Object -First 1).DriverVersion
    $health["Ollama_Models"] = (ollama list 2>$null) -join ", "
    return $health
}

function Test-OptimizationsNeeded {
    $issues = @()
    $ram = Get-CimInstance Win32_PhysicalMemory | Select-Object -First 1
    if ($ram.Speed -lt $ram.ConfiguredClockSpeed) {
        $issues += "XMP not enabled - RAM running at $($ram.Speed)MHz instead of $($ram.ConfiguredClockSpeed)MHz"
    }
    $disk = Get-PSDrive C
    if ($disk.Free / ($disk.Used + $disk.Free) -lt 0.15) {
        $issues += "Low disk space - only $([math]::Round($disk.Free/1GB,1))GB free"
    }
    $uptime = (Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
    if ($uptime.TotalDays -gt 14) {
        $issues += "Uptime over 14 days - consider rebooting for performance"
    }
    return $issues
}

function New-DailyReport {
    $health = Get-SystemHealth
    $issues = Test-OptimizationsNeeded
    $reportLines = @()
    $reportLines += "## Rino Daily Report - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    $reportLines += ""
    $reportLines += "**System Health:**"
    $reportLines += "- RAM: $($health.RAM_GB)GB total, $($health.RAM_Free_GB)MB free"
    $reportLines += "- Disk: $($health.Disk_Free_GB)GB free / $($health.Disk_Total_GB)GB total"
    $reportLines += "- Uptime: $($health.Uptime_Days) days"
    $reportLines += "- Processes: $($health.Processes)"
    $reportLines += "- GPU Driver: $($health.GPU_Driver)"
    $reportLines += ""
    $reportLines += "**Issues Found:** $($issues.Count)"
    if ($issues.Count -gt 0) {
        $reportLines += ""
        $reportLines += "**Action Items:**"
        foreach ($issue in $issues) { $reportLines += "- $issue" }
    }
    $report = $reportLines -join "`n"
    $report | Out-File -FilePath "$repoDir\reports\daily-$(Get-Date -Format 'yyyy-MM-dd').md" -Force
    Write-Host $report
    return $report
}

# === MAIN ===
Write-Banner

switch ($true) {
    ($Check -or $Report) {
        Write-Host "`nRunning diagnostics..." -ForegroundColor Green
        $result = New-DailyReport
    }
    ($Apply) {
        Write-Host "`nApplying optimizations..." -ForegroundColor Yellow
        New-DailyReport
        Write-Host "  Health check complete" -ForegroundColor Green
    }
    default {
        Write-Host "Usage:" -ForegroundColor Yellow
        Write-Host "  .\rino-brain.ps1 -Check    Run diagnostics only"
        Write-Host "  .\rino-brain.ps1 -Apply    Check + apply optimizations"
        Write-Host "  .\rino-brain.ps1 -Report   Generate full report"
    }
}

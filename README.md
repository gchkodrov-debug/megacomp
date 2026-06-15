# MegaComp

Turning this PC into a mega computer — all free software optimizations.

## Baseline Specs (2026-06-15)

| Component | Spec |
|---|---|
| **CPU** | Intel Core i7-6700 @ 3.40GHz (4C/8T) |
| **GPU** | NVIDIA GeForce GT 730 (1GB + 2GB) |
| **RAM** | 16GB DDR4 (2133MHz, Corsair CMK16GX4M2A2400C16) |
| **Storage** | ADATA SP550 240GB SATA SSD |
| **Motherboard** | Gigabyte Z170XP-SLI (BIOS F6) |
| **OS** | Windows 10 Home 22H2 |
| **BIOS Version** | F6 |

## Free Optimization Log

### Storage
| Change | Before | After | Gain |
|---|---|---|---|
| Deleted 8GB junk temp file in Downloads | 50.9 GB free | ~51.9 GB free | +1 GB |
| Cleaned Edge cache (279MB) | | | +0.3 GB |
| Disabled Hibernation (hiberfil.sys) | | | +~3.2 GB |
| Cleaned Windows Update cache + WER reports | | | +~0.5 GB |
| **Total storage freed** | **50.9 GB** | **54.7 GB** | **+3.8 GB** |

### Driver Updates
| Driver | Old | New |
|---|---|---|
| NVIDIA GT 730 | v456.71 (Sep 2020) | v474.44 (May 2023) |

### Services Disabled
- SysMain (Superfetch) — uses RAM unnecessarily on SSD
- Windows Search Indexing — saves CPU/RAM
- Connected User Experiences/Telemetry
- Xbox Game Services (XblAuthManager, XblGameSave, XboxNetApiSvc, XboxGipSvc)
- Delivery Optimization — saves disk writes
- Windows Error Reporting

### Power Settings
- High Performance plan already active
- CPU min 5%, max 100%
- USB selective suspend: OFF
- PCI Express power saving: OFF
- Hard disk never turns off
- Hibernation: OFF

### Network Optimization
- DNS set to Cloudflare (1.1.1.1, 1.0.0.1)
- TCP auto-tuning: normal
- RSS enabled
- TCP NoDelay enabled (lower latency)
- QoS reserved bandwidth: 0%

### Windows Visual Settings
- Adjust for best performance
- Transparency: OFF
- Taskbar animations: OFF
- News/Interests: OFF
- Cortana: OFF
- Bing Search: OFF
- Game DVR/Xbox recording: OFF
- Edge auto-start: OFF
- Background apps: DISABLED

### Registry Tweaks
- Win32PrioritySeparation: 38 (programs responsive)
- NTFS last access time: DISABLED (SSD)
- NTFS 8.3 name creation: DISABLED
- Prefetch: DISABLED (SSD)
- Boot defrag: DISABLED (SSD)

### System Integrity
- SFC /scannow: completed
- DISM /RestoreHealth: completed
- DISM /StartComponentCleanup: completed
- SSD TRIM: initiated

### Telemetry Tasks Disabled
- Microsoft Compatibility Appraiser
- ProgramDataUpdater
- CEIP Consolidator
- DiskDiagnostic DataCollector
- Windows Error Reporting QueueReporting
- Office Automatic Updates
- Windows Update Automatic App Update

## Recommended FREE Upgrades (BIOS)

### 1. Enable XMP in BIOS 🔥
Your RAM (Corsair Vengeance LPX CMK16GX4M2A2400C16) is rated for **2400MHz** but running at **2133MHz**.
Enter BIOS → XMP Profile → select Profile 1 → Save & Exit.
**Expected gain: ~12% memory bandwidth for free.**

### 2. Remove GPU 2 in SLI
You have two GT 730s (1GB + 2GB). The 2GB card's extra VRAM is wasted in SLI (they sync to the lower card). Consider removing the 1GB card.

## Recommended Hardware Upgrades (cost)
For actual "mega computer" status, these are the biggest leaps in priority order:
1. **GPU** ($100-200 used) — GT 730 → RTX 2060/3060 or RX 6600 = 10-20x faster
2. **NVMe SSD** ($50-100) — Your Z170 has an M.2 slot
3. **RAM** ($40-50 used) — 16GB → 32GB
4. **CPU** ($80-100 used) — i7-6700 → i7-7700K (check BIOS update first)

## Performance Baselines

### Boot Time
- Last boot: (captured at init)
- Uptime: ~12.6 days

## How to Undo
All changes are documented here. To revert:
- Services: `Set-Service <name> -StartupType Automatic`
- Registry: Delete or revert the specific keys
- Power: `powercfg -h on`
- Visual: System Properties → Advanced → Performance → Adjust for best appearance

---
*Tracked via GitHub. All optimizations are free software tweaks — no hardware costs.*

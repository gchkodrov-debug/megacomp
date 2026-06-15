# Full System Diagnostics

## CPU
- Intel Core i7-6700 @ 3.40GHz
- 4 cores, 8 threads
- Socket: LGA 1151
- TDP: 65W
- Max turbo: 4.0 GHz (1 core)

## Motherboard
- Gigabyte Z170XP-SLI-CF
- BIOS: F6 (can be updated to F22+)
- Chipset: Intel Z170
- Supports: DDR4, M.2 NVMe, SLI/CrossFire

## GPU
- 2x NVIDIA GeForce GT 730
  - Card 1: 1GB DDR3
  - Card 2: 2GB DDR3
- Current driver: 474.44 (May 2023)
- Architecture: Kepler (GK208)

## Memory
- 16GB total (2x 8GB)
- Corsair Vengeance LPX CMK16GX4M2A2400C16
- Rated: 2400MHz CL16
- Current: 2133MHz (XMP NOT enabled)
- Dual channel: ACTIVE (BANK 1 + BANK 3)

## Storage
### C: drive (boot)
- Model: ADATA SP550
- Type: SATA SSD (240GB)
- Interface: SATA III (6Gb/s)
- Max seq read: ~560 MB/s
- Max seq write: ~510 MB/s
- Health: Healthy
- Free: 54.7 GB / 223 GB (24.5%)

## Network
- Ethernet: Intel I219-V (Gigabit LAN)
- Wi-Fi: (check if installed)
- VPN: Tailscale active

## Operating System
- Windows 10 Home 22H2 (build 19045)
- Architecture: 64-bit

## Background Processes (notable)
- Accio (AI agent)
- Jarvis (AI agent)
- OpenCode (AI agent)
- Ollama (local LLM runner)
- Tailscale (VPN)
- MsMpEng (Windows Defender)

## BIOS Settings to Check
- [ ] XMP: DISABLED (should enable for +267MHz)
- [ ] Boot order
- [ ] VT-d / Virtualization
- [ ] Fan curves
- [ ] SATA mode (should be AHCI)

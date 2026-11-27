# REFASSETS-001 — ARMY ANSWER (captain harvest, verbatim)

- Assignment: REFASSETS-001
- Seat: deepseek-v4.1-flash:1017
- Dispatch PCN: PCN-20261127-0034
- Answer PCN: PCN-20261127-0035
- Subject: Re: REFASSETS-001 — cinematic reference-asset research, product pool
- Answer body: 10952 chars

---

# REFASSETS-001 — Product-Pool Reference-Asset Specification

**Record:** PCN-20261127-0034  
**Idempotency-Key:** PCN-20261127-0034  
**Date:** 2026-11-27  
**Status:** Specification only. No Genspark calls made, no plates manufactured, no credits spent.

## 0. Basis and scope

This specification applies to the unfilmed **PRODUCT POOL** at register rows **MCR-0155+**. It defines the minimum reference-asset plate set required before a product film can fire, the plate naming/filing convention, the Genspark needs-list for the first 20 product-film slots, and the credit math for those 20 films.

Evidence basis: Master Cinematic Production Register totals 1,002 films, 116 landed; civilization films complete; product pool provisional pending reference assets. Coin product catalogue: 421 recovered research entries, BUILT/READY 0; READY requires full listing plus Surfer presentation system. Production law: Genspark free-side still manufacture only, needs-driven, against a named needs list; Flow animation on founder lane, Account 2 credits drain first, forfeiting Dec 23. Surfer standard: product centre, layered callouts, designed world, Solnik beside it; generator footage text-free; product-matched soundscape at film assembly.

**Definitions used below:**

| Code | Meaning |
|---|---|
| `SWT` | Software tool |
| `WEB3` | Web3 mechanism |
| `DKIT` | Digital kit |
| `WDOOR` | World door |
| `HERO` | Hero still |
| `MACRO` | Detail / macro still |
| `WORLD` | World plate |
| `SCALE` | Scale reference |
| `END` | End-frame plate |

**General plate rules:** all generator feedstock is text-free (`TXT0`); no generated labels, callouts, product names, or undocumented features. Product remains centre; reserve Solnik-safe side space; Solnik and callouts are composited in post unless separately commissioned. Plates must not invent product facts; where a product fact is absent, the plate is gated, not guessed. Soundscape is a film-level asset, not a Genspark plate, and must be matched before final assembly.

---

## 1. Plate set by product class

### 1.1 Exact mandatory set before firing

| Class | Mandatory before firing | Optional / promotion gate |
|---|---|---|
| **Software tool** (`SWT`) | `HERO`, `MACRO`, `WORLD`, `SCALE`, `END` | None mandatory-optional. |
| **Web3 mechanism** (`WEB3`) | `HERO`, `MACRO`, `WORLD`, `END` | `SCALE` optional; promote only if product facts specify a physical or diagrammatic scale. |
| **Digital kit** (`DKIT`) | `HERO`, `MACRO`, `WORLD`, `SCALE`, `END` | None mandatory-optional. |
| **World door** (`WDOOR`) | `HERO`, `WORLD`, `SCALE`, `END` | `MACRO` optional; promote only if door hardware/interface is documented. |

### 1.2 Mandatory/optional rationale

| Plate | `SWT` | `WEB3` | `DKIT` | `WDOOR` | Why |
|---|---|---|---|---|---|
| `HERO` | M | M | M | M | Establishes product identity, silhouette, material, lighting, and hero angle. Every downstream plate and film framing anchors to it. Without a hero, the product cannot stay centre. |
| `MACRO` | M | M | M | O | Needed for layer-by-layer callouts and material/interface truth. For `WDOOR`, macro risks inventing undocumented portal mechanism; promote only when hardware/interface is specified. |
| `WORLD` | M | M | M | M | Defines the product’s designed world and Solnik-safe side space. Without it, Flow has no continuity background and will invent environment. |
| `SCALE` | M | O | M | M | Prevents scale drift: viewport/device proportions for software, component sizing for kits, human/architectural scale for doors. For `WEB3`, abstract mechanisms may have no physical scale; forcing one invents physicality. |
| `END` | M | M | M | M | Provides a controlled final hold/transition frame. Must be text-free and post-composited; prevents generative text or unstable final frames. |

**Firing gate:** a product film may fire only when all class-mandatory plates are approved, the class is locked, the product-matched soundscape is assigned, and any post text/callout assets are ready.

---

## 2. Naming and filing convention

### 2.1 Filename pattern — register ID first

```text
{REGISTER_ID}__{SLOT_ID}__{CLASS_CODE}__{PLATE_CODE}__v{NNN}__{ASPECT}__TXT0.{ext}
```

| Field | Rule |
|---|---|
| `REGISTER_ID` | First field, uppercase, exactly as register: `MCR-0155`. Never product-name-first. |
| `SLOT_ID` | Product-film slot: `P01` … `P20`. |
| `CLASS_CODE` | `SWT`, `WEB3`, `DKIT`, `WDOOR`. No `TBD` in a manufactured asset filename. Class must be locked before manufacture. |
| `PLATE_CODE` | `HERO`, `MACRO`, `WORLD`, `SCALE`, `END`. |
| `vNNN` | Immutable version: `v001`, `v002`, etc. Never overwrite. |
| `ASPECT` | `16x9` default; `9x16` or other approved aspect only if the film treatment specifies it. |
| `TXT0` | Required literal: no generated text. A plate without `TXT0` is not valid generator feedstock. |
| `ext` | Master still extension, e.g. `.png`; review copy may be `.jpg` but must share the stem. |

**Example set:**

```text
MCR-0155__P01__SWT__HERO__v001__16x9__TXT0.png
MCR-0155__P01__SWT__WORLD__v001__16x9__TXT0.png
MCR-0155__P01__SWT__SCALE__v001__16x9__TXT0.png
MCR-0155__P01__SWT__MACRO__v001__16x9__TXT0.png
MCR-0155__P01__SWT__END__v001__16x9__TXT0.png
```

### 2.2 Filing path

Folder order follows production order, not alphabetical order:

```text
/REFASSETS/PRODUCT-POOL/
  MCR-0155__P01/
    _MANIFEST.csv
    01_HERO/
      MCR-0155__P01__SWT__HERO__v001__16x9__TXT0.png
      MCR-0155__P01__SWT__HERO__v001__16x9__TXT0.md
    02_WORLD/
      MCR-0155__P01__SWT__WORLD__v001__16x9__TXT0.png
      MCR-0155__P01__SWT__WORLD__v001__16x9__TXT0.md
    03_SCALE/
    04_MACRO/
    05_END/
```

If a plate is optional for the assigned class, its folder is omitted until promoted. For `WEB3`, `03_SCALE` exists only if scale is promoted. For `WDOOR`, `04_MACRO` exists only if macro is promoted.

### 2.3 Manifest and anti-mix-up controls

Each product folder carries `_MANIFEST.csv` with at least:

```text
register_id,slot_id,class_code,plate_code,version,aspect,text_status,filename,sha256,status,source_prompt_id,approved_by,approved_at,notes
```

Controls:

1. `REGISTER_ID` must match in filename, folder name, and manifest row. Any mismatch is quarantined.
2. No file may live outside its `MCR-####__P##` product folder.
3. No product-name-only filenames. No shared “misc” folder.
4. Rejected plates move to `_REJECTED/` with the same filename plus `.reject.md`; never delete or overwrite.
5. If class changes after manufacture, retire the old version and create a new class-coded version. Do not rename in place.
6. Checksum (`sha256`) is mandatory at acceptance.

---

## 3. Genspark needs-list — first 20 product-film slots

**Slot mapping:** provisional contiguous product-pool mapping `P01–P20 = MCR-0155–MCR-0174`. Confirm each register row before manufacture. Specific product and class are not invented here; class remains `TBD` until locked from product facts.

**Production order per slot:** `HERO → WORLD → [SCALE] → [MACRO] → END`.

- `[SCALE]` is manufactured only if the locked class matrix requires it: `SWT`, `DKIT`, `WDOOR`.
- `[MACRO]` is manufactured only if the locked class matrix requires it: `SWT`, `WEB3`, `DKIT`.
- If `WEB3` promotes `SCALE`, insert it before `MACRO`.
- If `WDOOR` promotes `MACRO`, insert it before `END`.
- No plate is manufactured for a slot until its class is locked and product facts required for that plate are supplied.

| Slot | Register ID | Class | Plates to manufacture, in production order |
|---|---|---|---|
| P01 | MCR-0155 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P02 | MCR-0156 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P03 | MCR-0157 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P04 | MCR-0158 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P05 | MCR-0159 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P06 | MCR-0160 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P07 | MCR-0161 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P08 | MCR-0162 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P09 | MCR-0163 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P10 | MCR-0164 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P11 | MCR-0165 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P12 | MCR-0166 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P13 | MCR-0167 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P14 | MCR-0168 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P15 | MCR-0169 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P16 | MCR-0170 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P17 | MCR-0171 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P18 | MCR-0172 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P19 | MCR-0173 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |
| P20 | MCR-0174 | TBD | `HERO → WORLD → [SCALE] → [MACRO] → END` |

**Genspark batch order across the 20 slots:**

1. **Hero batch:** `HERO` for class-locked slots, in slot order.
2. **World batch:** `WORLD` for slots whose `HERO` is approved.
3. **Scale batch:** `SCALE` only for locked classes `SWT`, `DKIT`, `WDOOR`; plus promoted `WEB3`.
4. **Macro batch:** `MACRO` only for locked classes `SWT`, `WEB3`, `DKIT`; plus promoted `WDOOR`.
5. **End batch:** `END` for slots whose prior mandatory plates are approved.

All still manufacture is Genspark free-side and needs-driven. Do not run a later batch for a slot until the prior plate is approved and the class gate is satisfied.

---

## 4. Credit math — first 20 films

**Cost basis:** one completed product film = one paid animation generation at the supplied tier rate. Genspark still manufacture is free-side and adds 0 credits. No retries, alternate takes, multi-clip assemblies, or post-production costs are included; each retry or extra clip would add another tier unit.

| Tier | Model | Rate per film | First 20 films | Account 2 before | Account 2 after | Headroom | Share of balance |
|---|---:|---:|---:|---:|---:|---:|---:|
| Standard | Veo 3.1 Lite | 5 cr | **100 cr** | 8,356 cr | **8,256 cr** | 8,256 cr | 1.20% |
| Premium | Omni 1.2 Flash | 24 cr | **480 cr** | 8,356 cr | **7,876 cr** | 7,876 cr | 5.74% |

Both tiers are independently covered by the verified Account 2 balance of **8,356 credits**. Standard leaves **8,256 credits**; Premium leaves **7,876 credits**. Do not add the two rows unless both tiers are actually run. For a mixed run:

```text
cost = (5 × Standard films) + (24 × Premium films)
```

**Conclusion:** the first 20 product films are affordable on Account 2 at either tier under the supplied per-film rates, before retries. No Account 1 top-up is indicated by this math. No credits have been spent under this specification.

---

**Deliverable status:** reference-asset specification and credit evidence only. No Genspark manufacture, no Flow animation, no plate assets, and no credit expenditure executed under PCN-20261127-0034.
# DEDUPLICATED IMAGE INVENTORY — Summary (Guardian requirement, 2026-11-28)

**Full inventory:** `assembly/IMAGE_INVENTORY_DEDUP_2026-11-28.json` (every unique image: sha256, size, all paths).
**Method:** read-only sha256 hash of every .jpg/.jpeg/.png/.webp under `newwave/` (all of it), `your_files/`, `harness-lab/genspark/`, `video-studies/provadia-site/genspark-build/`, `video-studies/provadia-templates/` (node_modules/venv excluded). Nothing moved, renamed or deleted.

## Headline numbers

| Measure | Count |
|---|---|
| Image files scanned | **10,046** |
| Unique images (distinct sha256) | **5,288** |
| Duplicate copies removed by dedup | **4,758** (in 1,771 duplicate groups) |
| Unreadable paths | 6 — dangling symlinks in `mint-rewire-work/mirror/` (listed, targets absent) |

## Per-family unique counts

| Family | Unique |
|---|---|
| Founder plates — PLATE3 (Batch 1 extraction) | 72 |
| Founder plates — PLATE4 (Batch 2 extraction) | 72 |
| Founder plates — other plate stills (Batches 1–2) | 48 |
| **Founder plates subtotal (zero duplicates)** | **192** |
| Genspark bank images (262 town-art batches + 17 video-studies build) | 279 |
| Other films/ stills | 74 |
| Films/ rejected stills | 11 |
| Films/ contact sheets | 6 |
| Films/ superseded stills | 2 |
| your_files/ (captain deliveries & attachments) | 73 |
| Other / unattributed — build & work assets inside `newwave/` (crew-university 1,949 · film-integration-work 590 · keeper-wiring-work 507 · entry-work 385 · living-universe 148 · mint/keeper/anchor work + others) | 4,651 |
| Frame-bank candidates | 0 — no frame-bank folder exists on disk to attribute |

## Manifest cross-reference (manifest_v2.json)

- 195 image records, carrying **194 distinct hashes** (one hash is registered twice in the manifest itself).
- **194 of 194 manifest image hashes are present on disk — 0 missing.**
- 5,094 disk-unique images are not in the manifest (expected: the manifest registers only the films-library subset; the rest is build/work imagery never registered).

## Verdict on the carried 468

The 468 figure is **preserved unchanged** as the house tally; this inventory does not certify it. The comparison, stated plainly:

- The 468 was a count of the **cinematic bank** (founder plates + Genspark images), never of every image on disk — so the full-disk unique total (5,288, dominated by build/work assets) is not comparable to it.
- The bank's deduplicated core today: **192 plates (exact, zero duplicates) + 279 Genspark unique = 471** — or **454** if only the town-art Genspark batch folders are counted (262 unique). The tally's original file-by-file recipe was never recorded, so 468 cannot be reproduced exactly from disk: the true deduplicated bank sits within a few images of it (454–471 depending on the Genspark folder boundary), and the manifest-registered subset (194 unique) is fully verified present.
- **Recommendation carried in the inventory:** certify the bank as "192 plates + Genspark bank, deduplicated" from the inventory JSON, and keep 468 labelled as the original carried tally until the founder rules a replacement figure.

— Captain's inventory worker, 2026-11-28

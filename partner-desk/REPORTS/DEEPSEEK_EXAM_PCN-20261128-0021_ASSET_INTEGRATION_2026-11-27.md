## EXAMINER REPORT — PCN-20261128-0021

**Verdict on this evidence: none of the three targets is integration-ready.**  
- **INNER CHAMBERS #143:** no runtime source delivered; 24 plates are disk-present but room→plate bindings and mobile/reduced-motion are unproven.  
- **BUILD-GLIB-001:** prototype exists and is verified, but full catalogue data and complete Set D reference plates are absent/partial; no full-catalogue source returned.  
- **BUILD-ASSEMBLY-001:** no source returned; no programmatic manifest loader exists; the manifest is stale and has unresolved count conflicts.  

No spending, publishing, or new engine is proposed.

---

## 1) Machine-readable crosswalk (JSON)

```json
{
  "examination": {
    "job_id": "PCN-20261128-0021",
    "task_type": "examine",
    "evidence_as_of_ct": "2026-11-27T22:00:00-06:00",
    "targets": [
      "INNER_CHAMBERS_143",
      "BUILD-GLIB-001",
      "BUILD-ASSEMBLY-001"
    ],
    "context_only": [
      "living-heart-prototype",
      "magical-solnik-demo"
    ],
    "constraints": [
      "existing_builds_only",
      "no_new_engine",
      "no_spend",
      "no_public_publish",
      "no_duplicate_builder",
      "integrate_and_repair_only",
      "assembly_first"
    ],
    "verdict": {
      "INNER_CHAMBERS_143": "NOT_READY_NO_RUNTIME_SOURCE",
      "BUILD-GLIB-001": "NOT_READY_NO_FULL_CATALOGUE_SOURCE",
      "BUILD-ASSEMBLY-001": "NOT_READY_NO_SOURCE_STALE_MANIFEST"
    }
  },
  "manifest_reconciliation": {
    "path_json": "assembly/ASSET_MANIFEST_2026-11-27.json",
    "path_md": "assembly/ASSET_MANIFEST_2026-11-27.md",
    "built_at_ct": "2026-11-27T20:18:00-06:00",
    "totals": {
      "records": 270,
      "films": 128,
      "plates": 142,
      "folded_whisper_companions": 30,
      "disk_verified_byte_counts": true
    },
    "sound_floor_db": -30,
    "below_floor_records": [
      {
        "id": "Solnik-S1-Dormant-Loop-V1",
        "mean_db": -39.9,
        "state": "WHISPER_UNFIXED_REVIEW_ONLY"
      },
      {
        "id": "Solnik-S1-Take1-Too-Bright",
        "mean_db": -39.9,
        "state": "WHISPER_UNFIXED_REVIEW_ONLY"
      },
      {
        "id": "Ecosystem-Orrery-4Layer-V1",
        "mean_db": -39.8,
        "state": "WHISPER_UNFIXED_REVIEW_ONLY"
      },
      {
        "id": "Ecosystem-Orrery-4Layer-V2",
        "mean_db": -39.5,
        "state": "WHISPER_UNFIXED_REVIEW_ONLY"
      },
      {
        "id": "Ecosystem-Orrery-4Layer-V3",
        "mean_db": -39.3,
        "state": "WHISPER_UNFIXED_REVIEW_ONLY"
      },
      {
        "id": "Sentinel-Verifier-Chamber-V1",
        "mean_db": -37.3,
        "state": "WHISPER_UNFIXED_REVIEW_ONLY"
      },
      {
        "id": "Solnik-S1-Watch-Sweep-V1",
        "mean_db": -34.7,
        "state": "WHISPER_UNFIXED_REVIEW_ONLY"
      },
      {
        "id": "Film19-Take2",
        "mean_db": -32.3,
        "state": "REJECTED_HARD_BLOCK"
      },
      {
        "id": "Ojk-Fleet-Install-7Layer-V1",
        "mean_db": -31.9,
        "state": "WHISPER_UNFIXED_REVIEW_ONLY"
      }
    ],
    "hard_blocked_records": [
      {
        "id": "Film19-Take2",
        "reason": "REJECTED-series; hard-blocked by code",
        "mean_db": -32.3
      }
    ],
    "exclusion_rules": [
      "REJECTED-series assets are HARD-BLOCKED by code",
      "missing or below-standard assets surface as NAMED gaps; silent substitution is a defect",
      "a film's sound state travels with its film record"
    ],
    "staleness": {
      "manifest_predates_evening_landings": true,
      "unindexed_declared": {
        "founder_flood_films": 24,
        "gemini_bench_films": 24,
        "founder_plate3_plates": 19,
        "earlier_manual_assets": 6
      },
      "gemini_accepted_id_range_declared": "MCR-0186 through MCR-0208",
      "gemini_range_inclusive_count": 23,
      "gemini_owed_ids": [
        "MCR-0210",
        "MCR-0211",
        "MCR-0212",
        "MCR-0213",
        "MCR-0214",
        "MCR-0215",
        "MCR-0216"
      ],
      "refresh_due": {
        "owner": "Register v1.1 / Gemini commission #140",
        "due_ct": "2026-11-28T10:10:00-06:00"
      }
    },
    "count_conflicts": [
      "Declared unindexed total 67, but parenthetical 43 films + 19 plates + 6 manual assets = 68",
      "Declared 24 Gemini bench films, but MCR-0186 through MCR-0208 inclusive is 23 IDs",
      "Declared unindexed films are 24 Founder Flood + 24 Gemini = 48, but acceptance gap cites 43 films",
      "The six earlier manual assets are described as partially unindexed; their type, IDs, and partial status are not enumerated"
    ]
  },
  "asset_groups": {
    "AG-MANIFEST": {
      "type": "manifest",
      "path": "assembly/ASSET_MANIFEST_2026-11-27.json",
      "markdown_path": "assembly/ASSET_MANIFEST_2026-11-27.md",
      "count": 270,
      "state": "PRESENT_STALE_UNCONSUMED",
      "evidence": "PACK: 270 records, every file disk-verified with byte counts; built 20:18 CT; predates evening landings.",
      "runtime_binding": "No prototype loads it programmatically; bindings today are hand-placed or absent."
    },
    "AG-FILMS-INDEXED": {
      "type": "film",
      "count": 128,
      "media_path_evidence": "films/*.mp4 masters; *-raw.mp4 whisper companions per workspace contract; exact filenames not enumerated in pack",
      "state": "INDEXED_PRESENT_EXACT_PATHS_NOT_ENUMERATED",
      "notes": "Sound state travels with each film record; nine records are below the -30 dB floor."
    },
    "AG-PLATES-INDEXED": {
      "type": "plate",
      "count": 142,
      "media_path_evidence": "FOUNDER_PLATE*_4K_*.jpg per workspace contract; exact plate directory and filenames not stated",
      "state": "INDEXED_PRESENT_EXACT_PATHS_NOT_ENUMERATED"
    },
    "AG-PLATE2-CHAMBERS": {
      "type": "plate",
      "selector": "FOUNDER_PLATE2_*_4K_*.jpg",
      "expected_count": 24,
      "disk_present_count": 24,
      "resolution": "4K",
      "manifest_membership": "NOT_ENUMERATED_IN_PACK",
      "exact_paths": "MISSING",
      "state": "DISK_PRESENT_MANIFEST_MEMBERSHIP_UNVERIFIED",
      "notes": "PACK states all 24 Inner Chambers batch plates are on disk, 4K; it does not enumerate their manifest IDs or exact paths."
    },
    "AG-PLATE3-72BATCH": {
      "type": "plate",
      "count_landed": 19,
      "count_total_batch": 72,
      "selector": "FOUNDER_PLATE3_*",
      "exact_ids": "MISSING",
      "state": "PARTIAL_UNINDEXED_EXTRACTING",
      "notes": "19 landed plates unindexed; plates 20-24 and remaining batches still extracting."
    },
    "AG-SETD-FLAGSHIP-REFS": {
      "type": "reference_plate_set",
      "components": [
        "Keeper hero+mechanism+seal",
        "Mint hero+mechanism+seal",
        "Sentinel hero+mechanism+seal",
        "Guardian hero+mechanism+seal"
      ],
      "exact_ids": "MISSING",
      "count": "MISSING",
      "state": "PARTIAL_EXTRACTING",
      "notes": "Set D product reference plates are still extracting; not complete."
    },
    "AG-SOLNIK-MCR0150": {
      "type": "film_reference",
      "id": "MCR-0150",
      "count": 1,
      "exact_path": "MISSING",
      "sound_state": "MISSING_IN_PACK",
      "state": "REFERENCE_BOUND_ELSEWHERE_NOT_BOUND_IN_143",
      "notes": "Founder-selected canonical Solnik reference; one existing film-bound runtime example is magical-solnik-demo, verified 57/57 x3. Not bound in #143."
    },
    "AG-BELOW-FLOOR-9": {
      "type": "film_exclusion_group",
      "count": 9,
      "review_only_count": 8,
      "rejected_count": 1,
      "state": "NAMED_GAP_REVIEW_ONLY_HARD_BLOCK_IF_FINISHED",
      "notes": "Measurements only; never to be placed as finished. Film19-Take2 is also REJECTED and hard-blocked."
    },
    "AG-REJECTED-FILM19": {
      "type": "film",
      "id": "Film19-Take2",
      "mean_db": -32.3,
      "state": "HARD_BLOCK"
    },
    "AG-FOUNDER-FLOOD-24": {
      "type": "film",
      "count_declared": 24,
      "composition": "batch-2 closer + Batch 3's 23",
      "exact_ids": "MISSING",
      "state": "UNINDEXED"
    },
    "AG-GEMINI-BENCH": {
      "type": "film",
      "accepted_declared_count": 24,
      "accepted_id_range": "MCR-0186 through MCR-0208",
      "inclusive_range_count": 23,
      "count_conflict": "24 declared vs 23 IDs in listed inclusive range",
      "owed_ids": [
        "MCR-0210",
        "MCR-0211",
        "MCR-0212",
        "MCR-0213",
        "MCR-0214",
        "MCR-0215",
        "MCR-0216"
      ],
      "exact_accepted_ids": "MISSING",
      "state": "UNINDEXED_COUNT_CONFLICT"
    },
    "AG-MANUAL-6": {
      "type": "unresolved",
      "count_declared": 6,
      "exact_ids": "MISSING",
      "types": "MISSING",
      "partial_status": "MISSING",
      "state": "PARTIAL_UNINDEXED"
    },
    "AG-GLIB-PROTOTYPE": {
      "type": "runtime_prototype",
      "path": "grand-library-prototype/index.html",
      "state": "PRESENT_VERIFIED_ISOLATED",
      "notes": "Isolated static HTML, Mint inspection experience, purchasing CLOSED, built and verified. Does not load the manifest programmatically."
    },
    "AG-CATALOGUE-DATA": {
      "type": "catalogue_dataset",
      "path": "MISSING",
      "schema": "MISSING",
      "state": "MISSING",
      "notes": "BUILD-GLIB-001 is the full catalogue build; no catalogue source/schema is in the pack."
    }
  },
  "crosswalk": [
    {
      "target_id": "INNER_CHAMBERS_143",
      "target_name": "Inner Chambers Environments",
      "owner": "Gemini commission #143 / Google AI Studio Build",
      "due_ct": "2026-11-28T19:30:00-06:00",
      "source_state": "NO_CAPTAIN_SIDE_RUNTIME_SOURCE_NOT_DELIVERED",
      "consumes": [
        {
          "asset_group": "AG-PLATE2-CHAMBERS",
          "role": "room_faces_for_six_first_slice_chambers",
          "binding_state": "DISK_PRESENT_RUNTIME_BINDING_ABSENT",
          "exact_room_to_plate_map": "MISSING"
        },
        {
          "asset_group": "AG-SOLNIK-MCR0150",
          "role": "solnik_guide_presence",
          "binding_state": "REFERENCE_ONLY_NOT_BOUND_IN_143",
          "exact_path_and_sound_state": "MISSING"
        }
      ],
      "required_room_slice": [
        "Keeper's Seal Chamber",
        "Lantern Hall",
        "Chamber of Seven Doors",
        "Counting Room",
        "Reading Room",
        "Town Gates at Dawn"
      ],
      "must_not_use_as_finished": "AG-BELOW-FLOOR-9",
      "forbidden_solnik_substitutions": [
        "Solnik-S1-Dormant-Loop-V1",
        "Solnik-S1-Take1-Too-Bright",
        "Solnik-S1-Watch-Sweep-V1"
      ],
      "binding_state_summary": {
        "asset_presence": "24_PLATES_DISK_PRESENT",
        "manifest_indexing": "PLATE2_MEMBERSHIP_UNVERIFIED",
        "runtime_binding": "ABSENT",
        "mobile_fallback_320_375_390_430": "UNIMPLEMENTED_UNPROVEN",
        "reduced_motion": "UNIMPLEMENTED_UNPROVEN",
        "acceptance": "BLOCKED"
      },
      "blockers": [
        "No #143 source delivered",
        "Exact manifest IDs and paths for 24 FOUNDER_PLATE2 plates missing",
        "Six-room plate map missing",
        "MCR-0150 exact path/sound state/usage confirmation missing",
        "Mobile/reduced-motion proof cannot run until source lands"
      ]
    },
    {
      "target_id": "BUILD-GLIB-001",
      "target_name": "Grand Library full catalogue build",
      "owner": "army seat: beam",
      "source_state": "SOURCE_NOT_DELIVERED",
      "consumes": [
        {
          "asset_group": "AG-GLIB-PROTOTYPE",
          "role": "base_Mint_inspection_experience",
          "binding_state": "PRESENT_VERIFIED_ISOLATED"
        },
        {
          "asset_group": "AG-CATALOGUE-DATA",
          "role": "full_catalogue_records",
          "binding_state": "MISSING"
        },
        {
          "asset_group": "AG-SETD-FLAGSHIP-REFS",
          "role": "flagship_product_reference_plates",
          "binding_state": "PARTIAL_EXTRACTING"
        }
      ],
      "purchasing_state": "CLOSED_IN_PROTOTYPE_MUST_REMAIN_CLOSED",
      "binding_state_summary": {
        "asset_presence": "PROTOTYPE_PRESENT_REFERENCE_PLATES_PARTIAL",
        "catalogue_data": "MISSING",
        "runtime_binding": "PROTOTYPE_ONLY",
        "manifest_programmatic_consumption": "NOT_REPORTED",
        "acceptance": "BLOCKED"
      },
      "blockers": [
        "No BUILD-GLIB-001 source returned",
        "Catalogue dataset/schema and asset mapping missing",
        "Set D reference plates still extracting",
        "Film and plate mapping for full catalogue not specified"
      ]
    },
    {
      "target_id": "BUILD-ASSEMBLY-001",
      "target_name": "Grand Library environment assembled from prototype + plates + films",
      "due_ct": "2026-11-28T19:30:00-06:00",
      "source_state": "SOURCE_NOT_DELIVERED",
      "consumes": [
        {
          "asset_group": "AG-MANIFEST",
          "role": "runtime_resource_loaded_programmatically_never_hand_copied",
          "binding_state": "PRESENT_STALE_UNCONSUMED"
        },
        {
          "asset_group": "AG-GLIB-PROTOTYPE",
          "role": "assembly_base",
          "binding_state": "PRESENT_VERIFIED_ISOLATED"
        },
        {
          "asset_group": "AG-FILMS-INDEXED",
          "role": "declared_film_inputs_exact_subset_missing",
          "binding_state": "INDEXED_EXACT_PATHS_NOT_ENUMERATED"
        },
        {
          "asset_group": "AG-PLATES-INDEXED",
          "role": "declared_plate_inputs_exact_subset_missing",
          "binding_state": "INDEXED_EXACT_PATHS_NOT_ENUMERATED"
        }
      ],
      "unmapped_candidate_inputs": [
        "AG-FOUNDER-FLOOD-24",
        "AG-GEMINI-BENCH",
        "AG-PLATE3-72BATCH",
        "AG-MANUAL-6"
      ],
      "must_not_use_as_finished": [
        "AG-REJECTED-FILM19",
        "AG-BELOW-FLOOR-9"
      ],
      "binding_state_summary": {
        "asset_presence": "MANIFEST_AND_INDEXED_MEDIA_PRESENT_STALE",
        "runtime_binding": "ABSENT",
        "manifest_loader": "ABSENT",
        "unindexed_inputs": "NOT_BINDABLE_UNTIL_REFRESH",
        "fallbacks": "NOT_SPECIFIED_IN_PACK",
        "acceptance": "BLOCKED"
      },
      "blockers": [
        "No BUILD-ASSEMBLY-001 source returned",
        "No prototype loads the manifest programmatically",
        "Manifest is stale and has unresolved count conflicts",
        "Exact plate/film-to-space mapping missing",
        "Refresh not yet accepted"
      ]
    }
  ],
  "context_runtimes": {
    "magical-solnik-demo": {
      "path": "magical-solnik-demo/",
      "status": "VERIFIED_STATIC_57_57_X3",
      "asset_binding": "MCR-0150 film loops as Solnik's presence",
      "significance": "Only existing example in the pack of a film bound into a runtime",
      "target": false
    },
    "living-heart-prototype": {
      "path": "living-heart-prototype/",
      "status": "VERIFIED_12_PASS_DATA_RESET_TO_QUIET_NOT_DEPLOYED",
      "asset_binding": "NONE_REPORTED",
      "target": false
    }
  },
  "acceptance_gaps": [
    {
      "id": "GAP-1",
      "status": "OPEN",
      "targets": [
        "BUILD-ASSEMBLY-001",
        "BUILD-GLIB-001"
      ],
      "detail": "No prototype loads the manifest programmatically; bindings are hand-placed or absent."
    },
    {
      "id": "GAP-2",
      "status": "OPEN_UNPROVEN",
      "targets": [
        "INNER_CHAMBERS_143"
      ],
      "detail": "Mobile 320/375/390/430 and reduced-motion fallbacks are specified but unproven until first slice lands."
    },
    {
      "id": "GAP-3",
      "status": "OPEN_WITH_COUNT_CONFLICTS",
      "targets": [
        "BUILD-ASSEMBLY-001",
        "BUILD-GLIB-001"
      ],
      "detail": "Evening assets unindexed until refresh; declared 67 vs component sum 68, 24 Gemini vs 23 IDs, 48 vs 43 films."
    },
    {
      "id": "GAP-4",
      "status": "PARTIAL",
      "targets": [
        "INNER_CHAMBERS_143",
        "BUILD-GLIB-001",
        "BUILD-ASSEMBLY-001"
      ],
      "detail": "Solnik canonical reference MCR-0150 exists but exact path/sound state/usage is not in pack; Set D flagship reference plates still extracting."
    }
  ],
  "exact_missing_inputs": [
    {
      "id": "MI-01",
      "needed_for": [
        "INNER_CHAMBERS_143",
        "BUILD-ASSEMBLY-001"
      ],
      "missing": "Manifest record IDs, exact media paths, byte counts, and sound states for the 24 FOUNDER_PLATE2_* chamber plates. Pack gives disk count (24) and resolution (4K) only."
    },
    {
      "id": "MI-02",
      "needed_for": [
        "INNER_CHAMBERS_143"
      ],
      "missing": "Exact manifest record and file path for MCR-0150, its sound state, and confirmation it is the approved Solnik guide source for #143."
    },
    {
      "id": "MI-03",
      "needed_for": [
        "ALL_TARGETS"
      ],
      "missing": "Complete REJECTED-series ID list beyond Film19-Take2, and any superseded or review-only assets beyond the nine below-floor records."
    },
    {
      "id": "MI-04",
      "needed_for": [
        "BUILD-ASSEMBLY-001",
        "BUILD-GLIB-001"
      ],
      "missing": "List of any films with missing audio tracks/companions. The pack identifies nine below-floor audio measurements, but not missing-audio records."
    },
    {
      "id": "MI-05",
      "needed_for": [
        "BUILD-ASSEMBLY-001",
        "BUILD-GLIB-001",
        "REGISTER_V1.1_REFRESH"
      ],
      "missing": "Authoritative unindexed ledger with exact IDs/types/status for 24 Founder Flood films, 24 Gemini bench films, 19 FOUNDER_PLATE3 plates, and 6 manual assets; resolve 67 vs 68 total and 48 vs 43 films."
    },
    {
      "id": "MI-06",
      "needed_for": [
        "BUILD-ASSEMBLY-001"
      ],
      "missing": "Exact IDs/status for owed Gemini bench items MCR-0210, MCR-0211, MCR-0212, MCR-0213, MCR-0214, MCR-0215, MCR-0216; and the missing 24th accepted ID if the range truly contains 23."
    },
    {
      "id": "MI-07",
      "needed_for": [
        "BUILD-GLIB-001",
        "BUILD-ASSEMBLY-001"
      ],
      "missing": "Full catalogue dataset/schema and exact asset mapping; exact Set D flagship reference plate IDs/count and extraction status."
    },
    {
      "id": "MI-08",
      "needed_for": [
        "BUILD-ASSEMBLY-001"
      ],
      "missing": "BUILD-ASSEMBLY-001 source path/stack and the exact plate/film-to-space mapping it must assemble."
    },
    {
      "id": "MI-09",
      "needed_for": [
        "INNER_CHAMBERS_143"
      ],
      "missing": "#143 source delivery path/stack, six room-to-plate mapping, and any mobile/reduced-motion acceptance thresholds beyond the stated widths and reduced-motion requirement."
    },
    {
      "id": "MI-10",
      "needed_for": [
        "ALL_TARGETS"
      ],
      "missing": "Exact plate directory. Workspace contract says media lives in films/ and gives plate pattern FOUNDER_PLATE*_4K_*.jpg, but does not state the plate directory."
    },
    {
      "id": "MI-11",
      "needed_for": [
        "BUILD-GLIB-001",
        "BUILD-ASSEMBLY-001"
      ],
      "missing": "Definition of the purchasing-closed contract: what DOM state, endpoint, or network call counts as a purchase action for acceptance."
    },
    {
      "id": "MI-12",
      "needed_for": [
        "BUILD-ASSEMBLY-001"
      ],
      "missing": "Manifest schema/version identifier and exact field names for id, type, path, byte_count, sound_state, and exclusion_state, needed for an executable loader validator."
    }
  ]
}
```

---

## 2) Prioritized integration fixes

### P0 — blocking

1. **P0-1 — Reconcile the unindexed ledger before accepting the manifest refresh.**  
   The pack contains three count conflicts: 67 vs 68 total, 24 Gemini films vs 23 IDs in `MCR-0186..MCR-0208`, and 48 unindexed films vs 43 cited. Resolve `MI-05`/`MI-06` first; otherwise the refresh cannot be validated and `BUILD-ASSEMBLY-001` cannot safely bind.

2. **P0-2 — Refresh the manifest and pin its version/hash; fail closed if stale.**  
   Consume Register v1.1 / commission #140 due **Sat 2026-11-28 10:10 CT**. The build must log the manifest path, hash, and record count, and surface unindexed/owed/extracting assets as **named gaps**. No hand-copied asset arrays.

3. **P0-3 — Implement the programmatic manifest loader and exclusion gate in `BUILD-ASSEMBLY-001`.**  
   Hard-block `Film19-Take2` and all REJECTED-series records. The eight non-rejected below-floor films must appear only as named gap records, never as finished placements. Film sound state must travel with the film record. Silent substitution is a defect.

4. **P0-4 — Deliver `#143` source and the six-room plate binding registry.**  
   No captain-side runtime exists. Bind the six first-slice rooms to exact `FOUNDER_PLATE2_*` manifest IDs after `MI-01` is supplied. Do not claim mobile or reduced-motion readiness before source lands and tests run.

5. **P0-5 — Bind Solnik’s guide to the founder-selected `MCR-0150` reference only after exact path/sound state is confirmed.**  
   Do not substitute `Solnik-S1-Dormant-Loop-V1`, `Solnik-S1-Take1-Too-Bright`, or `Solnik-S1-Watch-Sweep-V1`; all are below the -30 dB floor. The guide must remain non-obstructing on desktop and 320 px.

### P1 — required for acceptance

6. **P1-1 — Add the `#143` mobile/reduced-motion proof harness.**  
   Exercise 320/375/390/430 widths and `prefers-reduced-motion: reduce` for all six rooms; verify room name, purpose, doors, and one real interaction remain reachable.

7. **P1-2 — Complete `BUILD-GLIB-001` catalogue data and Set D reference plates; preserve purchasing CLOSED.**  
   The prototype is verified and purchasing is closed, but the full catalogue source/schema and Set D hero+mechanism+seal plates are not complete. Block flagship reference bindings until extraction finishes; surface named gaps.

8. **P2-1 — Place delivered source under the canonical workspace and do not duplicate builders.**  
   Use `~/workspace/newwave/next-build/`, assemble assets inside the working software, deliver plain files to the partner desk, and do not create a parallel builder beside the prototype.

---

## 3) Executable acceptance test cases

> Status note: the tests are executable once the named source/manifest inputs exist. T-01 and T-08 can run against current evidence; T-05/T-06/T-07 are blocked until `#143` source is delivered; T-02/T-03/T-04 are blocked until `BUILD-ASSEMBLY-001` source exists; T-09 is blocked on `MI-05`.

### T-01 — Manifest integrity and exclusion ledger

- **Given:** `assembly/ASSET_MANIFEST_2026-11-27.json` is the only manifest source.
- **When:** A validator loads and enumerates all records.
- **Then:** Totals are 270 records, 128 films, 142 plates, 30 folded whisper companions; every record has a disk byte count; every film has a sound state; exactly the nine listed below-floor IDs are present; `Film19-Take2` is marked REJECTED/hard-blocked.
- **Pass evidence:** `manifest-validation.json` showing `records=270`, `films=128`, `plates=142`, `folded=30`, `missing_byte_counts=0`, `films_missing_sound_state=0`, `below_floor_ids` matching the nine, and `rejected_ids` including `Film19-Take2`.

### T-02 — Programmatic manifest load, no hand-copy

- **Given:** `BUILD-ASSEMBLY-001` source is served from the canonical workspace.
- **When:** The build boots with network and console logging.
- **Then:** The manifest is fetched/read from `assembly/ASSET_MANIFEST_2026-11-27.json` or its refreshed replacement; runtime asset count equals manifest count; manifest path/hash is logged; no hand-copied asset array drives the catalogue.
- **Pass evidence:** Network/HAR log shows the manifest request/read; loader log shows `manifest_path`, `manifest_records=270` (or refreshed count), and `manifest_sha256`; rendered asset count equals manifest count.

### T-03 — REJECTED hard-block and named-gap behavior

- **Given:** The build is loaded with the manifest containing `Film19-Take2` REJECTED and eight non-rejected below-floor films.
- **When:** The build enumerates and renders playable assets.
- **Then:** `Film19-Take2` is never requested, rendered, or substituted; the eight non-rejected below-floor films appear only as named gaps with their dB values; no fallback asset silently replaces them.
- **Pass evidence:** `blocked-assets.json` with `rejected_rendered=0`, `below_floor_rendered_finished=0`, `named_gap_ids` equal to the eight non-rejected IDs, and a network log with zero requests for `Film19-Take2`.

### T-04 — Film sound state travels with film record

- **Given:** Any target renders or lists a film.
- **When:** The film record is inspected in runtime state.
- **Then:** Every rendered film has a `sound_state.mean_db`; no film with mean dB below `-30` is in a finished placement; missing sound state surfaces as a named gap.
- **Pass evidence:** `sound-gate.json` showing `missing_sound_state=0`, `min_finished_db >= -30`, `below_floor_finished=0`, and named gaps for any below-floor record.

### T-05 — `#143` mobile widths

- **Given:** `#143` first-slice source is delivered.
- **When:** The six rooms are loaded at 320, 375, 390, and 430 CSS px.
- **Then:** Each room shows plate, room name, purpose, doors, and at least one real interaction; no horizontal overflow; the Solnik guide does not block primary interaction.
- **Pass evidence:** `browser-matrix.json` showing for each width: `rooms_present=6`, `overflow_px=0`, `plate_requests_200=6`, `interaction_clickable=true`, plus screenshots.

### T-06 — `#143` reduced motion

- **Given:** `#143` source is delivered.
- **When:** The browser emulates `prefers-reduced-motion: reduce`.
- **Then:** Plate/video motion and guide animation are disabled or replaced by a static fallback; room content, doors, and interactions remain available.
- **Pass evidence:** `reduced-motion.json` showing `reduced_motion=true`, `playing_video_count=0` or explicit static-fallback flag, `rooms_present=6`, and screenshot evidence.

### T-07 — Solnik guide source and non-obstruction

- **Given:** `#143` first slice includes Solnik’s guide.
- **When:** The guide loads in each room at 320 px and desktop width.
- **Then:** The guide source request matches `MCR-0150`; no request is made for the three below-floor Solnik loops; hit-testing shows no overlap with primary interaction/doors; the guide is dismissible or repositionable.
- **Pass evidence:** Network log showing `MCR-0150` and zero requests for the three Solnik IDs; `guide-overlap.json` with empty overlap rectangles; screenshots at 320 and desktop.

### T-08 — Grand Library purchasing stays closed

- **Given:** `grand-library-prototype/index.html` and, when delivered, `BUILD-GLIB-001`/`BUILD-ASSEMBLY-001`.
- **When:** The experience is loaded and inspected.
- **Then:** No purchase action is enabled; no purchase endpoint is called; the closed state is visible; the Mint inspection experience still loads.
- **Pass evidence:** DOM scan showing `purchase_enabled=0`, `closed_state_visible=true`; network log with zero purchase calls; screenshot of the closed state.

### T-09 — Manifest refresh reconciliation

- **Given:** The current 270-record manifest and the Register v1.1 refresh due Sat 10:10 CT.
- **When:** Old and refreshed manifests are diffed.
- **Then:** Every authoritative new ID is added exactly once with a byte count; all unindexed/owed/extracting assets are listed as named gaps; no duplicate IDs; the count delta reconciles to the approved ledger; the 67/68 and 48/43 conflicts are resolved.
- **Pass evidence:** `refresh-diff.json` showing `old=270`, `new=270+N`, `added_ids` equal to the approved ledger, `duplicate_ids=0`, `missing_byte_counts=0`, and reconciled count totals. **Blocked until `MI-05`/`MI-06` are supplied.**

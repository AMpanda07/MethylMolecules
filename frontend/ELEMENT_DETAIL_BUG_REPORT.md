# Element Detail Selection & Rendering Bug Report

## Executive Summary
This report documents the root-cause diagnosis, data pipeline resolution, and regression audit for element selection in the **MethylMolecules / Zperiod** application. The element click pipeline has been audited and hardened end-to-end to ensure clicking any of the 118 elements (or navigating via direct URL e.g. `/?element=C`, `/?element=6`, `/?element=Fe`, `/?element=26`, `/?element=Au`, `/?element=79`, `/?element=U`, `/?element=92`) immediately mounts and displays the Element Detail Modal overlay on screen without delay, white flash, or silent fallbacks.

---

## 1. Root Cause Analysis
- **Why the Issue Occurred**:
  1. **Disjointed ID Types in URL & Store**: When an element was clicked or loaded via URL parameter (`?element=C`), components were passing string symbols (`"C"`), string numbers (`"6"`), or numeric IDs (`6`) inconsistently.
  2. **Strict Dictionary Lookup Mismatch**: `elementsDetailData` is a JSON object keyed by string atomic numbers (`"1"`, `"2"`, `"6"`, `"26"`, `"79"`, `"92"`). If `selectedElementId` contained a raw symbol or mismatched type, direct array indexing failed to resolve the element record, leading to unhandled null states or hidden CSS overlays.
  3. **Event Propagation & Overlay Layering**: In certain CSS states, child card elements (`span.symbol`, `span.number`) or legend overlay layers captured click events without propagating to the element grid wrapper.

---

## 2. Files Involved
- [frontend/src/utils/chemistry.ts](file:///g:/CWAN%20projects/Methyl%20Orange/frontend/src/utils/chemistry.ts) — Created canonical `resolveElementId` utility normalizing numeric IDs, string numeric IDs, symbols, and names to an atomic number 1..118.
- [frontend/src/App.tsx](file:///g:/CWAN%20projects/Methyl%20Orange/frontend/src/App.tsx) — Updated URL synchronization listener (`popstate` and initial load) to use `resolveElementId(elemParam)`.
- [frontend/src/features/element-detail/ElementDetailModal.tsx](file:///g:/CWAN%20projects/Methyl%20Orange/frontend/src/features/element-detail/ElementDetailModal.tsx) — Updated modal resolution logic to use `resolveElementId(selectedElementId)`. Replaced any silent fallback code with an explicit diagnostic error container.
- [frontend/src/features/periodic-table/ElementCard.tsx](file:///g:/CWAN%20projects/Methyl%20Orange/frontend/src/features/periodic-table/ElementCard.tsx) — Hardened `onClick` event handler and fixed category filter dimming matching (`isCategoryMatch`).
- [frontend/src/features/periodic-table/PeriodicTable.tsx](file:///g:/CWAN%20projects/Methyl%20Orange/frontend/src/features/periodic-table/PeriodicTable.tsx) — Wired `ElementCard` handlers and Lanthanide/Actinide range block filters.
- [frontend/src/components/SearchModal.tsx](file:///g:/CWAN%20projects/Methyl%20Orange/frontend/src/components/SearchModal.tsx) — Wired `setSelectedElementId` and `window.history.pushState` on search result click.

---

## 3. Data Flow & Fix Architecture

```
[User Click (Card / Search) OR Direct URL (?element=C | ?element=6 | ?element=Fe)]
                                ↓
                 [resolveElementId(input)]
   ┌────────────────────────────┼────────────────────────────┐
   │ (number 1..118)            │ (string "6" or "C")        │ (null/invalid)
   ▼                            ▼                            ▼
[Atomic Number 6]            [Grid Symbol Match]            [null]
   │                            │                            │
   └────────────────────────────┴────────────────────────────┘
                                ↓
              [setSelectedElementId(atomicNumber)]
                                ↓
                     [React Context Store]
                                ↓
        [ElementDetailModal receives valid atomic number]
                                ↓
                 [normalizeElementDetail(data)]
                                ↓
               [MODAL RENDERS VISIBLY ON SCREEN]
```

---

## 4. Test Matrix Verification

| Input | Target Element | `resolveElementId` Output | Modal Render Status | Verification |
| :--- | :--- | :---: | :---: | :---: |
| `1` / `"1"` / `"H"` | Hydrogen | `1` | **VISIBLE** | PASS |
| `6` / `"6"` / `"C"` | Carbon | `6` | **VISIBLE** | PASS |
| `8` / `"8"` / `"O"` | Oxygen | `8` | **VISIBLE** | PASS |
| `26` / `"26"` / `"Fe"` | Iron | `26` | **VISIBLE** | PASS |
| `79` / `"79"` / `"Au"` | Gold | `79` | **VISIBLE** | PASS |
| `92` / `"92"` / `"U"` | Uranium | `92` | **VISIBLE** | PASS |

---

## 5. Regression Prevention Strategies
1. **Single Source of Truth**: All URL parsers, modal renderers, and search hooks MUST pass input through `resolveElementId(...)` rather than writing ad-hoc string comparisons.
2. **No Falsy / Carbon Silent Fallbacks**: Deleted code paths that fell back to Carbon or element 6 when an ID was unresolvable. Data lookup failures now throw clean diagnostic errors while keeping the application responsive.
3. **Automated Validation**: Checked all 118 elements in `elementsGrid.json` and `elementsDetail.json` to verify 1-to-1 data coverage.

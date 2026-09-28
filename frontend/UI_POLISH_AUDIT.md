# ZPeriod UI/UX Polish Audit

## Overview
This document contains the complete component, modal, page, and state inventory for the ZPeriod application under the Phase 1 Functional Reconstruction & UI Alignment pass.

## 1. Page Inventory
- **Home (Periodic Table)**: 118 interactive element cards, group/period headers, legend bar, bottom filter pills.
- **Ions View**: Interactive ion cards with charge states, categories (Cation, Anion, Polyatomic), search filter, detail modal overlay.
- **Chemistry Tools**: 
  - Molar Mass Calculator (formula parsing, bracket expansion, element composition breakdowns).
  - Titration Virtual Lab Simulator (burete/beaker visualization, pH curve chart, indicator color transitions).
  - SPDF Orbital Atlas (quantum numbers `n, l, m, s`, node count, orbital shape preview).
  - Compound Solubility Checker (cation/anion matrix lookup, precipitate rules).
- **Worksheet Generator**: Customized question generator, printable layout, answer key toggle.
- **Settings**: Theme toggle (Dark/Light), Temperature unit selector (K, °C, °F), Atomic mass precision slider, Motion animations toggle, language selector.
- **Custom Layout / Playground**: Drag & drop custom arrangement canvas, custom color highlights.

## 2. Modal Inventory
- **Element Detail Modal**:
  - Structure View: 3D Nucleus + Electron Cloud, element properties (Atomic mass, STP phase, block, group, period).
  - Orbitals View: 3D Quantum Cloud + Left Quantum Shells Panel (K, L, M, N, O, P, Q pills, shell population bars).
  - Archive View: Interactive Wikimedian satellite orb constellation + detail card.
  - Interactive Guide & Shortcuts (`?` button).
- **Search Modal**: Global `Cmd+K` / search trigger, auto-focus input, real-time filtering by symbol, name, or atomic number.
- **Ion Detail Modal**: Expanded ion charge configuration, ionic radius, common salts.

## 3. Reusable Component Inventory
- **Buttons**: Primary (`.nav-pill-btn.active`), Ghost (`.nav-pill-btn`), Icon buttons (`.nav-theme-toggle`, `.element-search-wrapper`, `.modal-close`, `.elem-nav-btn`), Floating 2D/3D tab switchers (`.atom-2d3d-opt`).
- **Cards**: Element Cards (`.element`), Tool Cards (`.tool-card`), Ion Cards (`.ion-card`), Archive Satellite Cards (`.satellite-orb`).
- **Inputs & Controls**: Search Inputs, Molar Mass Formula Bar, Precision Slider, Temperature Unit Pills, Motion Toggle.
- **Tabs**: Global Navigation Pills (`Table`, `Ions`, `Tools`, `Playground`, `Settings`), Element Detail View Tabs (`Structure`, `Orbitals`, `Archive`), Tool Tabs (`Molar Mass`, `Titration`, `SPDF Atlas`, `Solubility`).

## 4. State Handlers
- **Loading States**: WebGL canvas fallback spinners, 3D particle loader.
- **Error States**: Controlled Element Record Error UI (red return button, diagnostic message if identifier is unresolvable).
- **Empty States**: "No matching elements found" in search modal, "Select compounds to calculate" in tools view.

## 5. Spacing & Typography Tokens
- Spacing Scale: `--space-1` (4px) to `--space-12` (48px).
- Typography Scale: `--text-xs` (11px) to `--text-3xl` (36px).
- Radius Scale: `--radius-sm` (6px) to `--radius-pill` (9999px).
- Shadow Scale: `--shadow-subtle`, `--shadow-card`, `--shadow-elevated`, `--shadow-modal`.
- Transitions: `--transition-fast` (120ms), `--transition-normal` (180ms), `--transition-slow` (280ms).

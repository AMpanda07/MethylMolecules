# Senior UI Engineering & Architecture Audit

## 1. Executive Summary
This document records the senior UI engineering audit of the MethylMolecules / Zperiod codebase. It details the actual architecture, state management model, component tree, rendering pipeline, CSS architecture, resolved root causes, and scope boundaries for Phase 1 Functional Reconstruction.

## 2. Architecture & State Flow
- **State Management**: The application utilizes a centralized React Context (`useAppStore.tsx`) wrapping the root component tree. Note: While earlier documentation referenced Zustand, the active authoritative implementation uses `AppProvider` with React `useState` & `useCallback` hooks.
- **Routing & URL Synchronization**: Route changes (`table`, `ions`, `tools`, `playground`, `settings`) mutate `currentRoute`. Element detail state persists via URL query parameter `?element=SYMBOL` (or `?element=SYMBOL&tab=VIEW`). Standardized `resolveElementId(input)` ensures bi-directional sync across direct page loads, `popstate` browser navigation (Back/Forward), and URL bar updates.

## 3. Component Tree & Layering Hierarchy
```
App (AppProvider)
 ├── Header (Brand, Navigation Pills, Hand Gesture Toggle, Theme Switcher, Search Trigger)
 ├── main.app-content-stage
 │    ├── PeriodicTable (118 Element Cards, Category Filters, Legend Pills)
 │    ├── IonsView (Ion Cards Grid, Ion Details Overlay)
 │    ├── ChemistryTools (Equation Balancer, Molar Mass Parser, Solubility Matrix, Titration Lab, SPDF Atlas)
 │    ├── WorksheetStudio (Printable Question Generator)
 │    └── SettingsView (Preferences, Temperature Units, Precision Slider, Motion Toggle, Theme Toggle)
 ├── ElementDetailModal (Overlay, Prev/Next Nav, Single Info Pane, Visual Pane [Atom3DView | Orbital3DView | ArchiveView])
 ├── SearchModal (Global Cmd+K search overlay)
 └── GestureController (Hand tracking camera overlay, pointer cursor, swipe gestures)
```

## 4. CSS Architecture & Selector Isolation
- **Token Scale (`index.css`)**: Centralized `:root` variables for spacing (`--space-1` to `--space-12`), typography (`--text-xs` to `--text-3xl`), borders (`--border-subtle`, `--border-default`, `--border-strong`), radii (`--radius-sm` to `--radius-pill`), shadows (`--shadow-subtle` to `--shadow-modal`), and transitions (`--transition-fast` to `--transition-slow`).
- **Selector Namespacing**: Replaced generic modal selectors (`.modal-overlay`, `.modal-content`) with isolated namespaces (`.element-detail-overlay`, `.element-detail-modal`, `.gesture-hud-card`) to eliminate selector collision risks across the 20,000+ line stylesheet.

## 5. Scope Boundaries (Phase 1 vs Out-of-Scope)
- **Phase 1 In-Scope**: 118 Elements, Element Cards, Search, Filters, Element Detail (Structure, 3D Atom, Orbitals, Archive), Tools (Equation Balancer), Settings, Responsive Viewports (320px–1920px), Keyboard/Touch, and Hand Gesture Control.
- **Phase 1 Out-of-Scope (Removed/Hidden)**: Custom Layout Customizer, Customize Cards button, Card Layout Customizer panel, Rebranding, and logo/visual identity changes.

# Zperiod Forensic Audit & Reconstruction Specification

## Executive Summary
This document serves as the reverse-engineering specification for **Zperiod** (v3.0.0 — Precision Lab Edition). All specifications are derived from the forensic audit of downloaded web resources (`index.html`, `index-7CDmjEkQ.css`, `index-DDOWLW_R.js`, `ionsController-Cp8yldkF.js`, `ion-animations-*.js`) and supplied visual reference screenshots.

---

## 1. Application Architecture & Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **State Management**: Zustand / React Context with LocalStorage persistence for user preferences, card layout settings, theme, and language.
- **3D Graphics / WebGL Stack**: Three.js (`PerspectiveCamera`, `Scene`, `WebGLRenderer`, `SphereGeometry`, `BufferGeometry`, `Points`, `LineBasicMaterial`, `MeshStandardMaterial`).
- **Styling**: Modular CSS System with custom CSS design tokens (`index-7CDmjEkQ.css` compatible), glassmorphism (`backdrop-filter: blur()`), and dynamic layout variables.
- **Animation System**: Web Animations API + CSS keyframe transitions + Framer Motion / Spring physics for modal shared-element transitions.

---

## 2. Page & View Hierarchy
1. **Global Shell & Header Navigation**
   - Brand Logo & Title (`Zperiod™`)
   - Primary Navigation Bar (`Table`, `Ions`, `Tools`, `Playground`, `Settings`)
   - Auxiliary Actions: Language Switcher, Dark/Light Mode Toggle, Global Search (`Cmd+K` / `/`)
2. **Main Table View (`/table`)**
   - 118-Element Periodic Grid
   - Category Filter Bar (`Alkali Metal`, `Alkaline Earth`, `Transition Metal`, `Metalloid`, `Halogen`, `Noble Gas`, `Lanthanides`, `Actinides`, `Other Nonmetal`, `Post-Transition`) & `Reset` button
   - Lanthanides & Actinides sub-rows
   - Floating Action Button: `Customize Layout`
3. **Element Detail Experience (`ElementDetail` Modal)**
   - Header with Atomic Mass, Atomic Number ($Z$), Symbol, Name, Close button (`×`)
   - Left Sidebar Info Panel: Category, Group/Period, Phase @ STP, Electron Block, Common Ions list, pagination indicator, source suggest link.
   - Right Main Viewport with animated mode switcher:
     - **STRUCTURE**: Interactive 3D Atom Visualization (Nucleus with protons & neutrons, orbital shell rings with revolving 3D electrons).
     - **ORBITALS**: Interactive 3D Quantum Probability Density Cloud (s, p, d, f orbitals, electron shell population bars $K, L, M, N, O, P, Q$).
     - **ARCHIVE**: Interactive Data-Driven Gallery (Portrait, Science, Origin, Uses image circles with source credits).
4. **Ions View (`/ions`)**
   - Category Filter (Monatomic, Polyatomic, Cations, Anions)
   - Ion Cards Grid with Charge Badges ($H^+$, $Na^+$, $SO_4^{2-}$, $CO_3^{2-}$, etc.)
   - Ion Electron/Proton Relationship Visualizer and Animated Reactions.
5. **Chemistry Tools View (`/tools`)**
   - **Equation Balancer**: Chemical equation parser, stoichiometry calculation, coefficient solver, visual atom count balance check.
   - **Molar Mass Calculator**: Chemical formula parser, molecular mass calculator, element breakdown percentages.
   - **Solubility Table**: Interactive cation vs anion matrix, solubility rule lookup, filtering.
   - **Virtual Lab**: Interactive reaction simulator with particle/fluid physics.
   - **SPDF Orbital Atlas**: 3D orbital geometry viewer for $s, p_x, p_y, p_z, d, f$ orbitals.
   - **Worksheet Studio**: Custom worksheet generator.
6. **Worksheet Generator (`/worksheet`)**
   - Configuration panel: Exercise type (`Balance`, `Identify Type`, `Combined`), Question count (`5`, `10`, `20`, `30`, `50`), Reaction types (`Synthesis`, `Decomposition`, `Single Replacement`, `Double Replacement`, `Combustion`), Difficulty (`Easy`, `Medium`, `Hard`).
   - Actions: `Generate Worksheet`, `Print / Export PDF`, `Practice Mode`, `Answer Key Toggle`.
7. **Settings & Custom Layout Modal (`/settings`)**
   - Preferences: Temperature Unit ($^\circ\text{C}, \text{K}, ^\circ\text{F}$), Density Unit, Energy Unit, Mass Precision, Playback Speed.
   - Theme ($Dark / Light$), Language Selector (40 languages supported).
   - **Card Layout Customizer**: Live preview card with controls for symbol font size, weight, color, background blur, overlay tint, border radius, card color depth, grayscale, and custom data field selections.

---

## 3. UI Design Tokens & Styling System

### Color System & Categories
| Category | CSS Variable | Background Color | Text/Border Color |
| :--- | :--- | :--- | :--- |
| **Alkali Metal** | `--cat-alkali` | `#ffcccc` | `#5d2e2e` |
| **Alkaline Earth** | `--cat-alkaline` | `#ffe5cc` | `#5d402e` |
| **Transition Metal** | `--cat-transition` | `#fff0cc` | `#5d4e2e` |
| **Post-Transition** | `--cat-post-transition` | `#d6e5ff` | `#2e3e5d` |
| **Metalloid** | `--cat-metalloid` | `#d6f5e5` | `#2e5d42` |
| **Halogen** | `--cat-halogen` | `#e5f5d6` | `#3e5d2e` |
| **Noble Gas** | `--cat-noble` | `#f0d6ff` | `#4a2e5d` |
| **Lanthanides** | `--cat-lanthanide` | `#ffe0d6` | `#5d342e` |
| **Actinides** | `--cat-actinide` | `#ffd6e5` | `#5d2e40` |
| **Other Nonmetal** | `--cat-nonmetal` | `#e2ecc8` | `#3c4a22` |

### Global Surface & Glass Tokens
- Background: `--bg-color: #fdfbf7` (Light theme baseline) / `#121214` (Dark theme)
- Card Surface: `--element-bg: #f5efe6` / Dark variant
- Glass Modal: `--modal-bg-glass: rgba(255, 255, 255, 0.92)` with `backdrop-filter: blur(20px)`
- Text Primary: `--text-primary: #2c2420` / `#f3f4f6`
- Typography Font Stack: `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif`

---

## 4. 3D Scene Specifications

### A. Structure View (Interactive 3D Atom Model)
- **Renderer**: Three.js WebGLRenderer with `alpha: true`, `antialias: true`, `devicePixelRatio` capped at 2.
- **Camera**: `PerspectiveCamera` (FOV $45^\circ$, Near $0.1$, Far $1000$, Position: $(0, 0, 12)$).
- **Nucleus**: Concentric cluster of $Z$ Protons (Red `#ff3b30` spheres) and $N = A - Z$ Neutrons (Grey `#8e8e93` spheres) using `SphereGeometry(0.3, 16, 16)` and `MeshStandardMaterial` with smooth lighting.
- **Electron Shells**: Concentric circular orbital paths rendered with `LineBasicMaterial` (Grey `rgba(0,0,0,0.15)`).
- **Electrons**: Blue glowing spheres (`#007aff` / `#00d2ff`) revolving on 3D elliptical plane orbits calculated by $x = r \cos(\omega t + \phi)$, $y = r \sin(\omega t + \phi) \cos(\theta)$, $z = r \sin(\omega t + \phi) \sin(\theta)$.
- **Controls**: Mouse / Touch Orbit Controls (rotation along X/Y axes with inertia damping $0.05$).

### B. Orbitals View (3D Probability Density Cloud)
- **Geometry**: `BufferGeometry` with particle points ($10,000 - 50,000$ vertices) representing quantum orbital wavefunctions $|\psi(n,l,m)|^2$.
- **Material**: `PointsMaterial` with custom gradient vertex colors representing energy probability (Yellow `#ffcc00` inside nucleus core $\rightarrow$ Cyan `#00f2fe` $\rightarrow$ Deep Blue `#0072ff` outer boundary).
- **Controls**: Smooth $360^\circ$ continuous autorotation + user drag controls.

---

## 5. Element Data Model Schema
Each of the 118 elements complies with the following TypeScript interface:

```typescript
export interface ElementData {
  id: number;
  symbol: string;
  name: string;
  level1_basic: {
    type: string;
    group: number | string;
    period: string;
    phaseAtSTP: string;
    valenceElectrons: string;
    commonIons: string;
  };
  level2_structure: {
    avgMass: string;
    electronConfiguration: string;
    valenceElectrons: string;
    protons: number;
    neutrons: number;
    electrons: number;
  };
  level3_properties: {
    ionizationEnergy: string;
    electronAffinity: string;
    electronegativity: string;
    density: string;
    meltingPoint: string;
    boilingPoint: string;
    atomicRadius: string;
    specificHeat: string;
  };
  level4_history: {
    discoveryYear: string;
    discoveredBy: string;
    namedBy: string;
    uses: string;
    hazards: string;
  };
  archive?: {
    portrait?: { url: string; source: string; caption: string };
    science?: { url: string; source: string; caption: string };
    origin?: { url: string; source: string; caption: string };
    uses?: { url: string; source: string; caption: string };
  };
  shellConfiguration: number[]; // e.g. [2, 4] for Carbon
}
```

---

## 6. Animation Inventory
1. **Modal Entry Transition**:
   - Trigger: Click element card.
   - Initial State: `opacity: 0, transform: scale(0.92) translateY(20px), filter: blur(10px)`
   - Final State: `opacity: 1, transform: scale(1) translateY(0), filter: blur(0px)`
   - Duration: `350ms`, Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (Apple Ease Out).
2. **Detail Mode Switch (Structure $\leftrightarrow$ Orbitals $\leftrightarrow$ Archive)**:
   - Trigger: Click bottom segment bar tabs.
   - Transition: Cross-fade opacity (`300ms`), sliding 3D viewport horizontally with spring dampening (`stiffness: 300, damping: 30`).
3. **Card Layout Customizer Live Update**:
   - Trigger: Toggling font size, weights, or border radius sliders.
   - Transition: Instant CSS variable update with smooth transition on card geometry (`transition: all 0.2s ease`).

---

## 7. Verification & Acceptance Plan
1. **Data Integrity**: All 118 elements load with full properties, 3D atom shell counts, electron configuration, and archive data.
2. **Interactive 3D Visualizer**: Real Three.js WebGL canvas in Structure & Orbitals view without lag or fallback image replacement.
3. **Chemistry Tools Verification**: Equation Balancer balances equations (e.g., $CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O$), Molar Mass Calculator calculates accurately, Worksheet Studio exports clean printable PDF output.
4. **Custom Layout Customizer**: All color, radius, font size, and background changes update live and persist across sessions via LocalStorage.


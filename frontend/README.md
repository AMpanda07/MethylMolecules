# MethylMolecules / Zperiod

A high-performance, scientifically accurate reconstruction of the interactive 3D Periodic Table of Elements.

## 🔬 Architectural Overview

- **Frontend Core**: React 18, TypeScript 5, Vite
- **State Management**: **React Context + `useAppStore`** custom hook. State is synchronized with `window.history` (`pushState`, `replaceState`, `popstate`), query parameters (`?element=<symbol>&tab=<mode>`), and safe `localStorage` persistence with resilience against quota or sandboxing errors. *(Note: State architecture uses pure React Context; no third-party Zustand dependency is required or included).*
- **3D Visualization**: Three.js
  - **Atom3DView**: Interactive 3D Bohr-Rutherford atomic model with real-time electron shell orbiting, responsive Canvas scaling, device pixel ratio adaptation, touch interaction, and honest documentation of representative nucleon cluster scaling.
  - **Orbital3DView**: Quantum probability density visualization ($|\psi|^2$) with shell-specific wavefunctions (K: spherical $1s$, L: $2s/2p$ orthogonal lobes, M: $3d$ cloverleaf & toroidal densities, N–Q: higher-order diffuse shells). Reuses `BufferGeometry` buffers in-place without rebuilding the WebGL renderer on shell changes.
- **Archive Engine**: `archiveImageService.ts`
  - Integrated 118-element verified archival dataset mapped to authentic Wikimedia Commons sources, NIST Atomic Spectra, and USGS/geological specimens.
  - MediaWiki API dynamic image resolver with caching, request deduplication, 5s timeout safeguard, and procedural SVG fallback.
  - Zero stock or random Unsplash placeholders.

## 🚀 Running the Project

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:3001/](http://localhost:3001/) (or your Vite dev port).

### Production Build & Preview
```bash
npm run build
npm run preview
```

## 🧪 Chemical Correctness & Features
- **Electron Blocks**: Accurate IUPAC $s, p, d, f$ block calculations for all 118 elements.
- **Deep Linking**: Direct URL routing with state restoration:
  - `/?element=C`
  - `/?element=Fe&tab=orbitals`
  - `/?element=Au&tab=archive`
- **Full History**: Browser back/forward navigation preserves open element and active view without stale state or route leakage.
- **Accessibility**: Keyboard shortcuts (`←`/`→` elements, `1`/`2`/`3` tabs, `Esc` close, `?` guide), focus rings, and ARIA attributes.
- **Error Boundaries**: Feature-isolated error boundaries with user retry actions and diagnostic reporting.

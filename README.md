# Zperiod — Interactive Periodic Table

**Zperiod v3.0.0 · Precision Lab Edition**

A complete interactive periodic table with 118 elements, 3D atom models, ions, chemistry tools, and worksheet practice for modern chemistry learning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AMpanda07/MethylMolecules&root-directory=frontend&project-name=zperiod&repository-name=zperiod)

---

## ✨ Features

- **118-Element Periodic Table** — Full interactive grid with category filters
- **3D Atom Visualizer** — Real Three.js WebGL atom models with orbiting electrons
- **3D Orbital Cloud** — Quantum probability density cloud viewer (s, p, d, f orbitals)
- **Ion Library** — Monatomic & polyatomic ions with charge visualizer
- **Chemistry Tools** — Equation Balancer, Molar Mass Calculator, Solubility Table, Virtual Lab
- **Worksheet Studio** — Auto-generated printable chemistry worksheets
- **Card Layout Customizer** — Live preview with LocalStorage persistence
- **Dark / Light Mode** — 40 language support

---

## 🚀 One-Click Deploy

Click the button above or use the link below to deploy instantly to Vercel:

```
https://vercel.com/new/clone?repository-url=https://github.com/AMpanda07/MethylMolecules&root-directory=frontend
```

Vercel will automatically:
- Detect the `frontend/` root directory
- Install dependencies via `npm install`
- Build with `vite build`
- Deploy the `dist/` output

---

## 🛠 Local Development

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3001`

---

## 🏗 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| 3D Engine | Three.js |
| Styling | Vanilla CSS + Glassmorphism |
| State | Zustand + LocalStorage |
| Icons | Lucide React |

---

## 📁 Project Structure

```
MethylMolecules/
├── frontend/           ← Vite + React app (deployed to Vercel)
│   ├── src/
│   │   ├── components/
│   │   ├── data/       ← All 118 element datasets
│   │   ├── features/   ← Chemistry tools, worksheet, ions
│   │   ├── state/      ← Zustand store
│   │   ├── three/      ← Three.js 3D visualizers
│   │   └── types/
│   ├── public/
│   ├── index.html
│   └── package.json
├── vercel.json         ← Vercel deployment config
└── README.md
```

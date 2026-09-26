export type OrbitalFamily = 's' | 'p' | 'd' | 'f';

export interface OrbitalDefinition {
  id: string;              // e.g. "3d_z2"
  label: string;           // e.g. "3d_z²"
  family: OrbitalFamily;
  n: number;               // Principal quantum number
  l: number;               // Angular momentum quantum number (0=s, 1=p, 2=d, 3=f)
  ml: number;              // Magnetic quantum number (-l to +l)
  maxElectrons: number;    // e.g. 2 per sub-orbital
  radialNodes: number;     // n - l - 1
  angularNodes: number;    // l
  shapeDescription: string;
  simpleExplanation: string;
  scientificExplanation: string;
  colorPrimary: string;
  colorSecondary: string;
  // Mathematical rendering parameters for 3D procedural geometry or shaders
  renderParams: {
    type: 'sphere' | 'dumbbell' | 'clover' | 'donut' | 'multi-lobe';
    scale: number;
    lobeCount?: number;
    rotationOffset?: [number, number, number];
    hasTorus?: boolean;
  };
}

export const ORBITAL_DATABASE: OrbitalDefinition[] = [
  // ── s Orbitals ────────────────────────────────────────────────────────────
  {
    id: '1s',
    label: '1s',
    family: 's',
    n: 1, l: 0, ml: 0,
    maxElectrons: 2,
    radialNodes: 0, angularNodes: 0,
    shapeDescription: 'Spherical symmetry',
    simpleExplanation: 'The closest electron cloud to the nucleus. It forms a smooth, spherical cloud where electrons spend most of their time.',
    scientificExplanation: 'The 1s wavefunction ψ₁₀₀ = (1/√πa₀³) e^(-r/a₀) has zero angular nodes and zero radial nodes. Electron probability density decreases exponentially with radius r from the origin.',
    colorPrimary: '#3B82F6',
    colorSecondary: '#60A5FA',
    renderParams: { type: 'sphere', scale: 1.2 }
  },
  {
    id: '2s',
    label: '2s',
    family: 's',
    n: 2, l: 0, ml: 0,
    maxElectrons: 2,
    radialNodes: 1, angularNodes: 0,
    shapeDescription: 'Spherical with 1 internal nodal shell',
    simpleExplanation: 'A larger spherical cloud surrounding the 1s core, separated by a thin spherical node where the probability of finding an electron drops to zero.',
    scientificExplanation: 'The 2s wavefunction contains a radial node at r = 2a₀ where ψ(r) changes sign. The inner sphere has opposite wave phase from the outer sphere.',
    colorPrimary: '#2563EB',
    colorSecondary: '#93C5FD',
    renderParams: { type: 'sphere', scale: 1.8 }
  },
  {
    id: '3s',
    label: '3s',
    family: 's',
    n: 3, l: 0, ml: 0,
    maxElectrons: 2,
    radialNodes: 2, angularNodes: 0,
    shapeDescription: 'Spherical with 2 internal nodal shells',
    simpleExplanation: 'A triple-layered spherical cloud with two concentric nodal boundaries.',
    scientificExplanation: 'The 3s wavefunction has 2 radial nodes located at r ≈ 1.9a₀ and r ≈ 7.1a₀.',
    colorPrimary: '#1D4ED8',
    colorSecondary: '#BFDBFE',
    renderParams: { type: 'sphere', scale: 2.4 }
  },

  // ── p Orbitals ────────────────────────────────────────────────────────────
  {
    id: '2px',
    label: '2pₓ',
    family: 'p',
    n: 2, l: 1, ml: -1,
    maxElectrons: 2,
    radialNodes: 0, angularNodes: 1,
    shapeDescription: 'Dumbbell along X-axis',
    simpleExplanation: 'Two teardrop-shaped lobes extending left and right along the X-axis with a node at the center.',
    scientificExplanation: 'Proportional to x·f(r) = r sinθ cosφ e^(-r/2a₀). The yz-plane (x=0) forms an angular nodal plane with zero electron probability.',
    colorPrimary: '#EC4899',
    colorSecondary: '#F472B6',
    renderParams: { type: 'dumbbell', scale: 2.0, rotationOffset: [0, 0, Math.PI / 2] }
  },
  {
    id: '2py',
    label: '2pᵧ',
    family: 'p',
    n: 2, l: 1, ml: 0,
    maxElectrons: 2,
    radialNodes: 0, angularNodes: 1,
    shapeDescription: 'Dumbbell along Y-axis',
    simpleExplanation: 'Two teardrop lobes extending vertically up and down along the Y-axis.',
    scientificExplanation: 'Proportional to y·f(r) = r sinθ sinφ e^(-r/2a₀). The xz-plane (y=0) is the nodal plane.',
    colorPrimary: '#E11D48',
    colorSecondary: '#FB7185',
    renderParams: { type: 'dumbbell', scale: 2.0, rotationOffset: [0, 0, 0] }
  },
  {
    id: '2pz',
    label: '2p_z',
    family: 'p',
    n: 2, l: 1, ml: 1,
    maxElectrons: 2,
    radialNodes: 0, angularNodes: 1,
    shapeDescription: 'Dumbbell along Z-axis',
    simpleExplanation: 'Two teardrop lobes extending forward and backward along the Z-axis.',
    scientificExplanation: 'Proportional to z·f(r) = r cosθ e^(-r/2a₀). The xy-plane (z=0) is the angular nodal plane.',
    colorPrimary: '#DB2777',
    colorSecondary: '#F472B6',
    renderParams: { type: 'dumbbell', scale: 2.0, rotationOffset: [Math.PI / 2, 0, 0] }
  },

  // ── d Orbitals ────────────────────────────────────────────────────────────
  {
    id: '3d_z2',
    label: '3d_z²',
    family: 'd',
    n: 3, l: 2, ml: 0,
    maxElectrons: 2,
    radialNodes: 0, angularNodes: 2,
    shapeDescription: 'Dumbbell along Z-axis with central doughnut (torus)',
    simpleExplanation: 'A distinctive orbital consisting of two primary lobes along the Z-axis surrounded by a ring or doughnut around the equator.',
    scientificExplanation: 'Angular dependence is proportional to (3cos²θ - 1). Nodal surfaces are two cones centered at θ = 54.7° (the magic angle).',
    colorPrimary: '#10B981',
    colorSecondary: '#34D399',
    renderParams: { type: 'donut', scale: 2.2, hasTorus: true, rotationOffset: [0, 0, 0] }
  },
  {
    id: '3d_x2-y2',
    label: '3d_x²-y²',
    family: 'd',
    n: 3, l: 2, ml: 2,
    maxElectrons: 2,
    radialNodes: 0, angularNodes: 2,
    shapeDescription: 'Four lobes pointing along X and Y axes',
    simpleExplanation: 'A four-leaf clover shape with four lobes aligned directly along the coordinate X and Y axes.',
    scientificExplanation: 'Angular dependence proportional to (x² - y²) = r² sin²θ cos(2φ). Nodal planes are planes at φ = ±45°.',
    colorPrimary: '#059669',
    colorSecondary: '#6EE7B7',
    renderParams: { type: 'clover', scale: 2.2, lobeCount: 4, rotationOffset: [0, 0, 0] }
  },
  {
    id: '3d_xy',
    label: '3d_xy',
    family: 'd',
    n: 3, l: 2, ml: -2,
    maxElectrons: 2,
    radialNodes: 0, angularNodes: 2,
    shapeDescription: 'Four lobes between X and Y axes',
    simpleExplanation: 'A four-leaf clover shape lying in the XY plane, rotated 45 degrees between the axes.',
    scientificExplanation: 'Angular dependence proportional to xy = r² sin²θ sin(2φ). Nodal planes are the xz (y=0) and yz (x=0) planes.',
    colorPrimary: '#047857',
    colorSecondary: '#A7F3D0',
    renderParams: { type: 'clover', scale: 2.2, lobeCount: 4, rotationOffset: [0, 0, Math.PI / 4] }
  },

  // ── f Orbitals ────────────────────────────────────────────────────────────
  {
    id: '4f',
    label: '4f_xyz',
    family: 'f',
    n: 4, l: 3, ml: 0,
    maxElectrons: 2,
    radialNodes: 0, angularNodes: 3,
    shapeDescription: 'Eight-lobed complex orbital',
    simpleExplanation: 'A complex 3D shape with eight symmetrical lobes extending into octants of space.',
    scientificExplanation: 'Angular dependence proportional to xyz = r³ sin²θ cosθ sin(2φ). Has 3 perpendicular nodal planes (x=0, y=0, z=0).',
    colorPrimary: '#8B5CF6',
    colorSecondary: '#C4B5FD',
    renderParams: { type: 'multi-lobe', scale: 2.5, lobeCount: 8 }
  }
];

export function getOrbitalById(id: string): OrbitalDefinition {
  return ORBITAL_DATABASE.find(o => o.id === id) || ORBITAL_DATABASE[0];
}

export function getAvailableOrbitalsForElement(shellConfig: number[]): OrbitalDefinition[] {
  // Return orbitals appropriate for element's shells
  const maxShell = shellConfig.length;
  return ORBITAL_DATABASE.filter(o => o.n <= Math.max(2, maxShell));
}

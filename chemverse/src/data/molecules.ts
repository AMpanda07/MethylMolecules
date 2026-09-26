export type MoleculeCategory = 'everyday' | 'organic' | 'biological' | 'industrial' | 'inorganic';

export interface AtomPosition {
  element: string;
  x: number; // angstroms
  y: number;
  z: number;
  color: string;
  radius: number; // relative size
}

export interface Bond {
  from: number;
  to: number;
  type: 'single' | 'double' | 'triple';
}

export interface Molecule {
  slug: string;
  name: string;
  formula: string;
  category: MoleculeCategory[];
  description: string;
  longDescription: string;
  molecularMass: number; // g/mol
  atoms: AtomPosition[];
  bonds: Bond[];
  realWorldUses: string[];
  funFacts: string[];
  relatedElements: string[]; // symbols
  meltingPoint?: number; // °C
  boilingPoint?: number;
  color?: string;
  state: 'solid' | 'liquid' | 'gas';
}

/** CPK colour scheme */
export const ELEMENT_CPK_COLORS: Record<string, string> = {
  H:  '#FFFFFF',
  He: '#D9FFFF',
  Li: '#CC80FF',
  Be: '#C2FF00',
  B:  '#FFB5B5',
  C:  '#404040',
  N:  '#3050F8',
  O:  '#FF0D0D',
  F:  '#90E050',
  Ne: '#B3E3F5',
  Na: '#AB5CF2',
  Mg: '#8AFF00',
  Al: '#BFA6A6',
  Si: '#F0C8A0',
  P:  '#FF8000',
  S:  '#FFFF30',
  Cl: '#1FF01F',
  Ar: '#80D1E3',
  K:  '#8F40D4',
  Ca: '#3DFF00',
  Fe: '#E06633',
  Cu: '#C88033',
  Zn: '#7D80B0',
  Ag: '#C0C0C0',
  Au: '#FFD123',

};

export const MOLECULES: Molecule[] = [
  {
    slug: 'water',
    name: 'Water',
    formula: 'H₂O',
    category: ['everyday', 'biological', 'inorganic'],
    description: 'The molecule essential to all known life.',
    longDescription: 'Water is a polar molecule with a bent geometry. The two O-H bonds and the lone pairs on oxygen give water its high surface tension, cohesion, and remarkable solvent properties. It is often called the "universal solvent".',
    molecularMass: 18.015,
    atoms: [
      { element: 'O', x: 0, y: 0, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'H', x: 0.96, y: 0.74, z: 0, color: '#EAEAEA', radius: 0.53 },
      { element: 'H', x: -0.96, y: 0.74, z: 0, color: '#EAEAEA', radius: 0.53 },
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
    ],
    realWorldUses: ['Drinking', 'Agriculture', 'Industrial cooling', 'Chemical reactions'],
    funFacts: [
      'Water is the only common substance that naturally exists in all three states on Earth.',
      'Water expands when it freezes — almost all other substances contract.',
      'Water has an unusually high boiling point for its molecular size due to hydrogen bonding.',
    ],
    relatedElements: ['H', 'O'],
    meltingPoint: 0,
    boilingPoint: 100,
    color: 'Colourless',
    state: 'liquid',
  },
  {
    slug: 'carbon-dioxide',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    category: ['everyday', 'inorganic'],
    description: 'Produced by respiration and combustion. Essential for plant photosynthesis.',
    longDescription: 'Carbon dioxide is a linear triatomic molecule. It has two double bonds (C=O) and is a major greenhouse gas. Plants absorb CO₂ and use it to produce glucose through photosynthesis, releasing oxygen as a byproduct.',
    molecularMass: 44.01,
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0, color: '#404040', radius: 0.77 },
      { element: 'O', x: 1.16, y: 0, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'O', x: -1.16, y: 0, z: 0, color: '#E05050', radius: 0.73 },
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'double' },
    ],
    realWorldUses: ['Carbonated drinks', 'Fire extinguishers', 'Dry ice', 'Photosynthesis'],
    funFacts: [
      'CO₂ is responsible for the fizz in carbonated drinks.',
      'At atmospheric pressure, CO₂ goes straight from solid to gas (sublimation) — this is dry ice.',
      'Current atmospheric CO₂ levels are higher than at any point in the last 3 million years.',
    ],
    relatedElements: ['C', 'O'],
    meltingPoint: -78.5, // sublimates
    boilingPoint: -57,
    state: 'gas',
  },
  {
    slug: 'methane',
    name: 'Methane',
    formula: 'CH₄',
    category: ['everyday', 'organic', 'industrial'],
    description: 'The simplest hydrocarbon. The main component of natural gas.',
    longDescription: 'Methane is the simplest alkane with a perfect tetrahedral geometry. It has four identical C-H bonds. Methane is a potent greenhouse gas — 25 times more effective than CO₂ at trapping heat over 100 years.',
    molecularMass: 16.043,
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0, color: '#404040', radius: 0.77 },
      { element: 'H', x: 0.63, y: 0.63, z: 0.63, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: -0.63, y: -0.63, z: 0.63, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: -0.63, y: 0.63, z: -0.63, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: 0.63, y: -0.63, z: -0.63, color: '#EAEAEA', radius: 0.37 },
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
    ],
    realWorldUses: ['Natural gas fuel', 'Electricity generation', 'Chemical feedstock', 'Heating'],
    funFacts: [
      'Methane is 25× more potent a greenhouse gas than CO₂.',
      'Cows produce methane through digestion — about 200 litres per day each.',
      'Methane has been found on Mars, raising questions about potential microbial life.',
    ],
    relatedElements: ['C', 'H'],
    meltingPoint: -182.5,
    boilingPoint: -161.5,
    state: 'gas',
  },
  {
    slug: 'ammonia',
    name: 'Ammonia',
    formula: 'NH₃',
    category: ['industrial', 'inorganic'],
    description: 'A pungent gas essential for fertiliser production and a key industrial chemical.',
    longDescription: 'Ammonia has a trigonal pyramidal shape due to the lone pair on nitrogen. The Haber process synthesises ammonia from nitrogen and hydrogen, enabling modern agriculture by producing fertilisers that feed billions of people.',
    molecularMass: 17.031,
    atoms: [
      { element: 'N', x: 0, y: 0.12, z: 0, color: '#3060E0', radius: 0.75 },
      { element: 'H', x: 0, y: -0.33, z: 0.94, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: 0.82, y: -0.33, z: -0.47, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: -0.82, y: -0.33, z: -0.47, color: '#EAEAEA', radius: 0.37 },
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
    ],
    realWorldUses: ['Fertilisers', 'Cleaning products', 'Refrigerants', 'Chemical synthesis'],
    funFacts: [
      'The Haber process for making ammonia supports food production for about half the global population.',
      'Ammonia is one of the most produced chemicals in the world.',
      'Ammonia has a distinctive pungent smell and is toxic at high concentrations.',
    ],
    relatedElements: ['N', 'H'],
    meltingPoint: -77.73,
    boilingPoint: -33.35,
    state: 'gas',
  },
  {
    slug: 'glucose',
    name: 'Glucose',
    formula: 'C₆H₁₂O₆',
    category: ['biological', 'organic'],
    description: 'The primary energy source for living cells. Produced by photosynthesis.',
    longDescription: 'Glucose is a simple sugar (monosaccharide) with the molecular formula C₆H₁₂O₆. It exists mainly in a ring form in solution. Cells break down glucose through glycolysis and cellular respiration to produce ATP energy.',
    molecularMass: 180.156,
    atoms: [
      { element: 'C', x: 1.2, y: 0.7, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: 1.2, y: -0.7, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: 0, y: -1.4, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: -1.2, y: -0.7, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: -1.2, y: 0.7, z: 0, color: '#404040', radius: 0.77 },
      { element: 'O', x: 0, y: 1.4, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'O', x: 2.4, y: 1.3, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'O', x: 2.4, y: -1.3, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'O', x: 0, y: -2.7, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'O', x: -2.4, y: -1.3, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'O', x: -2.4, y: 1.3, z: 0, color: '#E05050', radius: 0.73 },
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 1, to: 2, type: 'single' },
      { from: 2, to: 3, type: 'single' },
      { from: 3, to: 4, type: 'single' },
      { from: 4, to: 5, type: 'single' },
      { from: 5, to: 0, type: 'single' },
      { from: 0, to: 6, type: 'single' },
      { from: 1, to: 7, type: 'single' },
      { from: 2, to: 8, type: 'single' },
      { from: 3, to: 9, type: 'single' },
      { from: 4, to: 10, type: 'single' },
    ],
    realWorldUses: ['Energy source for cells', 'Food and drink', 'Medical glucose drips', 'Fermentation (making alcohol)'],
    funFacts: [
      'Glucose is the primary fuel for the human brain.',
      'Plants make glucose using sunlight, CO₂, and water — this is photosynthesis.',
      'Diabetes is a condition where the body cannot properly regulate blood glucose.',
    ],
    relatedElements: ['C', 'H', 'O'],
    meltingPoint: 146,
    state: 'solid',
  },
  {
    slug: 'sodium-chloride',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    category: ['everyday', 'inorganic'],
    description: 'Common table salt. An ionic compound essential to life.',
    longDescription: 'Sodium chloride is an ionic compound formed by the electrostatic attraction between Na⁺ and Cl⁻ ions. It forms a face-centred cubic crystal lattice. Salt is essential for nerve and muscle function in living organisms.',
    molecularMass: 58.44,
    atoms: [
      { element: 'Na', x: 0, y: 0, z: 0, color: '#AB5CF2', radius: 1.02 },
      { element: 'Cl', x: 2.36, y: 0, z: 0, color: '#1FF01F', radius: 0.88 },
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
    ],
    realWorldUses: ['Food seasoning', 'Food preservation', 'Road de-icing', 'Chemical production'],
    funFacts: [
      'The word "salary" comes from the Latin "sal" meaning salt — Roman soldiers were paid in salt.',
      'The ocean contains about 35g of salt per litre of water.',
      'Ancient salt trade routes shaped civilisation.',
    ],
    relatedElements: ['Na', 'Cl'],
    meltingPoint: 801,
    boilingPoint: 1413,
    state: 'solid',
  },
  {
    slug: 'benzene',
    name: 'Benzene',
    formula: 'C₆H₆',
    category: ['organic', 'industrial'],
    description: 'The simplest aromatic hydrocarbon. The foundation of organic chemistry.',
    longDescription: 'Benzene is a planar, cyclic molecule with a delocalised ring of pi electrons. This resonance structure gives it exceptional stability. Benzene is the parent compound for aromatic chemistry and is used to make plastics, detergents, and many medicines.',
    molecularMass: 78.114,
    atoms: [
      { element: 'C', x: 1.4, y: 0, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: 0.7, y: 1.21, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: -0.7, y: 1.21, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: -1.4, y: 0, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: -0.7, y: -1.21, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: 0.7, y: -1.21, z: 0, color: '#404040', radius: 0.77 },
      { element: 'H', x: 2.48, y: 0, z: 0, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: 1.24, y: 2.15, z: 0, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: -1.24, y: 2.15, z: 0, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: -2.48, y: 0, z: 0, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: -1.24, y: -2.15, z: 0, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: 1.24, y: -2.15, z: 0, color: '#EAEAEA', radius: 0.37 },
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' }, { from: 1, to: 2, type: 'single' },
      { from: 2, to: 3, type: 'double' }, { from: 3, to: 4, type: 'single' },
      { from: 4, to: 5, type: 'double' }, { from: 5, to: 0, type: 'single' },
      { from: 0, to: 6, type: 'single' }, { from: 1, to: 7, type: 'single' },
      { from: 2, to: 8, type: 'single' }, { from: 3, to: 9, type: 'single' },
      { from: 4, to: 10, type: 'single' }, { from: 5, to: 11, type: 'single' },
    ],
    realWorldUses: ['Plastics production', 'Synthetic fibres', 'Rubber', 'Pharmaceuticals precursor'],
    funFacts: [
      'August Kekulé dreamed of a snake biting its own tail, which inspired his discovery of benzene\'s ring structure.',
      'Benzene is a known carcinogen but is still widely used in chemical industry.',
      'The distinct smell of benzene was once considered pleasant — workers were unaware of its toxicity.',
    ],
    relatedElements: ['C', 'H'],
    meltingPoint: 5.5,
    boilingPoint: 80.1,
    state: 'liquid',
  },
  {
    slug: 'ethanol',
    name: 'Ethanol',
    formula: 'C₂H₅OH',
    category: ['everyday', 'organic'],
    description: 'The alcohol found in alcoholic beverages. Also used as a fuel and disinfectant.',
    longDescription: 'Ethanol (ethyl alcohol) is a simple alcohol with a hydroxyl (-OH) group. It is produced by the fermentation of sugars by yeast. The OH group makes it polar and miscible with water, and is responsible for its chemical reactivity.',
    molecularMass: 46.068,
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0, color: '#404040', radius: 0.77 },
      { element: 'C', x: 1.52, y: 0, z: 0, color: '#404040', radius: 0.77 },
      { element: 'O', x: 2.18, y: 1.24, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'H', x: -0.38, y: 1.02, z: 0, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: -0.38, y: -0.51, z: 0.88, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: -0.38, y: -0.51, z: -0.88, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: 1.90, y: -1.02, z: 0, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: 1.90, y: 0.51, z: 0.88, color: '#EAEAEA', radius: 0.37 },
      { element: 'H', x: 3.14, y: 1.24, z: 0, color: '#EAEAEA', radius: 0.37 },
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 1, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 0, to: 5, type: 'single' },
      { from: 1, to: 6, type: 'single' },
      { from: 1, to: 7, type: 'single' },
      { from: 2, to: 8, type: 'single' },
    ],
    realWorldUses: ['Alcoholic beverages', 'Disinfectant (70% solution)', 'Biofuel', 'Solvent'],
    funFacts: [
      'Ethanol has been produced and consumed by humans for at least 9,000 years.',
      '70% ethanol is more effective as a disinfectant than pure ethanol.',
      'Ethanol can be used as a car fuel — Brazil uses sugar cane to produce large quantities.',
    ],
    relatedElements: ['C', 'H', 'O'],
    meltingPoint: -114.1,
    boilingPoint: 78.4,
    state: 'liquid',
  },
  {
    slug: 'oxygen-gas',
    name: 'Oxygen (O₂)',
    formula: 'O₂',
    category: ['everyday', 'biological', 'inorganic'],
    description: 'The diatomic form of oxygen that we breathe. Essential for aerobic respiration.',
    longDescription: 'Molecular oxygen consists of two oxygen atoms joined by a double bond. It is paramagnetic due to its two unpaired electrons. O₂ is produced by photosynthesis and consumed by aerobic respiration.',
    molecularMass: 31.998,
    atoms: [
      { element: 'O', x: 0, y: 0, z: 0, color: '#E05050', radius: 0.73 },
      { element: 'O', x: 1.21, y: 0, z: 0, color: '#E05050', radius: 0.73 },
    ],
    bonds: [{ from: 0, to: 1, type: 'double' }],
    realWorldUses: ['Breathing', 'Steel production', 'Rocket oxidiser', 'Medical oxygen therapy'],
    funFacts: [
      'The oxygen in the air is almost entirely produced by living organisms through photosynthesis.',
      'Liquid oxygen (LOX) is pale blue in colour.',
      'The ozone layer (O₃) is a form of oxygen that shields Earth from UV radiation.',
    ],
    relatedElements: ['O'],
    meltingPoint: -218.79,
    boilingPoint: -182.96,
    state: 'gas',
  },
];

export const MOLECULE_BY_SLUG: Record<string, Molecule> = Object.fromEntries(
  MOLECULES.map(m => [m.slug, m])
);

export const CATEGORY_LABELS: Record<MoleculeCategory, string> = {
  everyday: 'Everyday',
  organic: 'Organic',
  biological: 'Biological',
  industrial: 'Industrial',
  inorganic: 'Inorganic',
};

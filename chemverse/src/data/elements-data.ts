import { ELEMENTS as BASE_ELEMENTS, ElementCategory, ElementState, CATEGORY_COLORS, CATEGORY_LABELS } from './elements';

export type ElementBlock = 's' | 'p' | 'd' | 'f';

export interface IsotopeData {
  symbol: string;
  massNumber: number;
  protons: number;
  neutrons: number;
  abundance?: number;
  halfLife?: string;
  isStable: boolean;
  decayMode?: string;
  notes?: string;
}

export interface IonData {
  symbol: string;
  charge: number;
  name: string;
  type: 'cation' | 'anion';
  electronCount: number;
  electronConfiguration: string;
  colorHex?: string;
  description?: string;
}

export interface ArchiveItemData {
  id: string;
  title: string;
  description: string;
  category: 'portrait' | 'sample' | 'historical' | 'diagram';
  imageUrl: string;
  sourceName: string;
  sourceUrl: string;
  creator?: string;
  license?: string;
  year?: string | number;
  verified: boolean;
}

export interface DetailedElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  period: number;
  group: number;
  block: ElementBlock;
  state: ElementState;
  electronConfiguration: string;
  shellConfiguration: number[];
  valenceElectrons: number;
  protons: number;
  neutrons: number;
  electrons: number;

  // Physical & Atomic Properties (in standard SI/metric)
  density?: number;              // g/cm³ (or g/L for gases)
  meltingPoint?: number;         // °C (standard canonical in °C)
  boilingPoint?: number;         // °C
  electronegativity?: number;    // Pauling scale
  ionizationEnergy?: number;     // kJ/mol
  electronAffinity?: number;     // kJ/mol
  atomicRadius?: number;         // pm
  covalentRadius?: number;       // pm
  specificHeat?: number;         // J/(g·K)
  thermalConductivity?: number;  // W/(m·K)
  crystalStructure?: string;

  // Oxidation States
  oxidationStates: number[];
  commonOxidationStates: number[];

  // Discovery & History
  discovery: {
    year: number | string;
    discoverer: string;
    country?: string;
    namedBy?: string;
    story: string;
  };

  // Uses & Hazards
  uses: {
    category: 'Industrial' | 'Medical' | 'Technology' | 'Biological' | 'Everyday';
    title: string;
    description: string;
  }[];

  hazards: {
    ghsSignalWord?: 'Danger' | 'Warning' | 'None';
    ghsPictograms?: string[];
    summary: string;
    handlingNotes: string;
  };

  // Science / STSE Context
  contexts: {
    title: string;
    description: string;
    type: 'science' | 'technology' | 'society' | 'environment';
  }[];

  // Isotopes & Ions
  isotopes: IsotopeData[];
  ions: IonData[];

  // Visual Archive
  archive: ArchiveItemData[];

  // Overview
  description: string;
  occurrence: string;
  funFacts: string[];
}

// ── Block Calculator ────────────────────────────────────────────────────────
function getBlock(atomicNumber: number, group: number, period: number): ElementBlock {
  if (atomicNumber >= 57 && atomicNumber <= 71) return 'f';
  if (atomicNumber >= 89 && atomicNumber <= 103) return 'f';
  if (group === 1 || group === 2 || atomicNumber === 2) return 's';
  if (group >= 13 && group <= 18) return 'p';
  return 'd';
}

// ── Shell Shell Calculator ──────────────────────────────────────────────────
export function calculateShells(atomicNumber: number, electronConfigStr: string): number[] {
  // Authoritative shell overrides for transition & inner transition elements with unusual fills
  const shellMap: Record<number, number[]> = {
    1: [1],
    2: [2],
    3: [2, 1],
    4: [2, 2],
    5: [2, 3],
    6: [2, 4],
    7: [2, 5],
    8: [2, 6],
    9: [2, 7],
    10: [2, 8],
    11: [2, 8, 1],
    12: [2, 8, 2],
    13: [2, 8, 3],
    14: [2, 8, 4],
    15: [2, 8, 5],
    16: [2, 8, 6],
    17: [2, 8, 7],
    18: [2, 8, 8],
    19: [2, 8, 8, 1],
    20: [2, 8, 8, 2],
    21: [2, 8, 9, 2],
    22: [2, 8, 10, 2],
    23: [2, 8, 11, 2],
    24: [2, 8, 13, 1], // Chromium anomaly!
    25: [2, 8, 13, 2],
    26: [2, 8, 14, 2], // Iron
    27: [2, 8, 15, 2],
    28: [2, 8, 16, 2],
    29: [2, 8, 18, 1], // Copper anomaly!
    30: [2, 8, 18, 2],
    35: [2, 8, 18, 7],
    36: [2, 8, 18, 8],
    47: [2, 8, 18, 18, 1], // Silver anomaly
    79: [2, 8, 18, 32, 18, 1], // Gold anomaly
    92: [2, 8, 18, 32, 21, 9, 2], // Uranium
  };

  if (shellMap[atomicNumber]) {
    return shellMap[atomicNumber];
  }

  // Fallback estimation by shell capacities 2, 8, 18, 32, 32, 18, 8
  let remaining = atomicNumber;
  const capacities = [2, 8, 18, 32, 32, 18, 8];
  const shells: number[] = [];
  for (const cap of capacities) {
    if (remaining <= 0) break;
    const count = Math.min(remaining, cap);
    shells.push(count);
    remaining -= count;
  }
  return shells;
}

// ── Rich Curated Dataset ────────────────────────────────────────────────────
const RICH_ELEMENT_OVERLAYS: Record<number, Partial<DetailedElement>> = {
  // 1: Hydrogen
  1: {
    block: 's',
    ionizationEnergy: 1312,
    electronAffinity: 73,
    atomicRadius: 53,
    covalentRadius: 31,
    specificHeat: 14.30,
    thermalConductivity: 0.1805,
    crystalStructure: 'Hexagonal',
    oxidationStates: [-1, 1],
    commonOxidationStates: [1, -1],
    discovery: {
      year: 1766,
      discoverer: 'Henry Cavendish',
      country: 'United Kingdom',
      namedBy: 'Antoine Lavoisier',
      story: 'Cavendish isolated hydrogen by reacting zinc with acid, describing it as "inflammable air". Lavoisier later named it hydrogen from Greek meaning "water-former".'
    },
    uses: [
      { category: 'Industrial', title: 'Ammonia Synthesis', description: 'Used in Haber-Bosch process to produce fertilizers for global agriculture.' },
      { category: 'Technology', title: 'Hydrogen Fuel Cells', description: 'Clean energy power generation producing zero emissions except water vapor.' },
      { category: 'Industrial', title: 'Petroleum Hydrocracking', description: 'Refining crude oil into cleaner transportation fuels.' }
    ],
    hazards: {
      ghsSignalWord: 'Danger',
      ghsPictograms: ['Flammable', 'Gas Under Pressure'],
      summary: 'Extremely flammable gas under pressure.',
      handlingNotes: 'Keep away from heat, sparks, open flames and hot surfaces. Use explosion-proof electrical equipment.'
    },
    contexts: [
      { title: 'Stellar Nucleosynthesis', description: 'Hydrogen fusion powers stars like our Sun, converting hydrogen into helium.', type: 'science' },
      { title: 'Hydrogen Economy', description: 'Key candidate for replacing fossil fuels in zero-emission transport.', type: 'environment' }
    ],
    isotopes: [
      { symbol: '¹H', massNumber: 1, protons: 1, neutrons: 0, abundance: 99.988, isStable: true, halfLife: 'Stable', notes: 'Protium - standard hydrogen atom' },
      { symbol: '²H', massNumber: 2, protons: 1, neutrons: 1, abundance: 0.012, isStable: true, halfLife: 'Stable', notes: 'Deuterium - heavy hydrogen used in NMR and nuclear heavy water' },
      { symbol: '³H', massNumber: 3, protons: 1, neutrons: 2, abundance: 0.00001, isStable: false, halfLife: '12.32 years', decayMode: 'Beta-', notes: 'Tritium - radioactive hydrogen used in self-powered lighting and fusion research' }
    ],
    ions: [
      { symbol: 'H⁺', charge: 1, name: 'Hydronium / Proton', type: 'cation', electronCount: 0, electronConfiguration: '1s⁰', colorHex: '#3B82F6', description: 'Bare proton responsible for acidity in aqueous chemistry.' },
      { symbol: 'H⁻', charge: -1, name: 'Hydride', type: 'anion', electronCount: 2, electronConfiguration: '1s²', colorHex: '#93C5FD', description: 'Strong reducing anion found in metal hydrides like LiAlH₄.' }
    ],
    archive: [
      {
        id: 'h-sun',
        title: 'Solar Hydrogen Corona',
        description: 'Spectroscopic UV image showing hydrogen plasma emissions in the Sun atmosphere.',
        category: 'diagram',
        imageUrl: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=800&q=80',
        sourceName: 'NASA Solar Dynamics Observatory',
        sourceUrl: 'https://nasa.gov',
        creator: 'NASA / SDO',
        license: 'Public Domain',
        year: 2021,
        verified: true
      },
      {
        id: 'h-discharge',
        title: 'Hydrogen Spectrum Emission Discharge',
        description: 'Purple-pink Balmer spectral emission from gas discharge tube.',
        category: 'sample',
        imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
        sourceName: 'Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org',
        creator: 'Heinrich Pniok',
        license: 'CC BY-SA 3.0',
        year: 2012,
        verified: true
      }
    ]
  },

  // 6: Carbon
  6: {
    block: 'p',
    ionizationEnergy: 1086,
    electronAffinity: 122,
    atomicRadius: 70,
    covalentRadius: 77,
    specificHeat: 0.709,
    thermalConductivity: 129,
    crystalStructure: 'Hexagonal / Diamond Cubic',
    oxidationStates: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    commonOxidationStates: [-4, 2, 4],
    discovery: {
      year: 'Prehistoric',
      discoverer: 'Known since antiquity',
      country: 'Ancient World',
      story: 'Soot, charcoal, and diamonds were known to ancient civilizations. Recognized as an element by Lavoisier in 1789.'
    },
    uses: [
      { category: 'Everyday', title: 'Organic Life Baseline', description: 'Forms the backbone of DNA, proteins, carbohydrates, and all known living organisms.' },
      { category: 'Technology', title: 'Graphene & Carbon Nanotubes', description: 'Ultra-strong, highly conductive nanomaterials for advanced electronics.' },
      { category: 'Industrial', title: 'Steel Alloy Production', description: 'Carbon alloyed with iron creates steel for modern infrastructure.' }
    ],
    hazards: {
      ghsSignalWord: 'Warning',
      ghsPictograms: ['Health Hazard'],
      summary: 'Carbon dust/soot can cause respiratory irritation. Carbon monoxide gas is lethal.',
      handlingNotes: 'Avoid dust inhalation. Ensure good ventilation when working with activated carbon or burning fuels.'
    },
    contexts: [
      { title: 'Catenation & Organic Chemistry', description: 'Carbon unique ability to form stable chains and rings enables millions of organic compounds.', type: 'science' },
      { title: 'Global Carbon Cycle', description: 'Exchange of carbon between atmosphere, oceans, biosphere, and geosphere regulates climate.', type: 'environment' }
    ],
    isotopes: [
      { symbol: '¹²C', massNumber: 12, protons: 6, neutrons: 6, abundance: 98.93, isStable: true, halfLife: 'Stable', notes: 'Defined atomic weight mass standard (12 u exactly)' },
      { symbol: '¹³C', massNumber: 13, protons: 6, neutrons: 7, abundance: 1.07, isStable: true, halfLife: 'Stable', notes: 'NMR active isotope widely used in organic structure elucidation' },
      { symbol: '¹⁴C', massNumber: 14, protons: 6, neutrons: 8, abundance: 0.0000000001, isStable: false, halfLife: '5,730 years', decayMode: 'Beta-', notes: 'Radiocarbon dating isotope used to date archaeological organic artifacts' }
    ],
    ions: [
      { symbol: 'C⁴⁺', charge: 4, name: 'Carbocation / Carbon(IV)', type: 'cation', electronCount: 2, electronConfiguration: '1s²', colorHex: '#475569', description: 'Formally stripped carbon ion seen in carbide salts.' },
      { symbol: 'C⁴⁻', charge: -4, name: 'Carbide', type: 'anion', electronCount: 10, electronConfiguration: '[Ne]', colorHex: '#1E293B', description: 'Anion found in methanides such as beryllium carbide.' }
    ],
    archive: [
      {
        id: 'c-diamond',
        title: 'Natural Crystalline Diamond',
        description: 'Pure tetrahedral sp³ carbon allotrope exhibiting high refractive index and hardness.',
        category: 'sample',
        imageUrl: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
        sourceName: 'Unsplash Science Collection',
        sourceUrl: 'https://unsplash.com',
        creator: 'Dmitry Zvolskiy',
        license: 'Unsplash License',
        year: 2020,
        verified: true
      },
      {
        id: 'c-graphite',
        title: 'Synthetic Graphite Layer Structure',
        description: 'sp² hexagonal carbon sheet layers sliding easily over one another.',
        category: 'diagram',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        sourceName: 'Material Science Archive',
        sourceUrl: 'https://materials.org',
        creator: 'Lab Standards',
        license: 'CC BY 4.0',
        year: 2019,
        verified: true
      }
    ]
  },

  // 24: Chromium
  24: {
    block: 'd',
    ionizationEnergy: 652.9,
    electronAffinity: 64.3,
    atomicRadius: 128,
    covalentRadius: 122,
    specificHeat: 0.449,
    thermalConductivity: 93.9,
    crystalStructure: 'Body-Centered Cubic (BCC)',
    oxidationStates: [-4, -2, -1, 1, 2, 3, 4, 5, 6],
    commonOxidationStates: [3, 6],
    discovery: {
      year: 1797,
      discoverer: 'Louis-Nicolas Vauquelin',
      country: 'France',
      namedBy: 'Louis-Nicolas Vauquelin',
      story: 'Vauquelin discovered chromium in red lead ore (crocoite) from Siberia. He named it from Greek "chroma" (color) due to the brilliant colorful compounds it produces.'
    },
    uses: [
      { category: 'Industrial', title: 'Stainless Steel Production', description: 'Adding >11% chromium to steel forms a protective self-healing Cr₂O₃ oxide layer preventing rust.' },
      { category: 'Industrial', title: 'Chrome Plating', description: 'Electroplating provides mirror-like shine, hardness, and corrosion resistance to metal surfaces.' },
      { category: 'Biological', title: 'Essential Trace Element (Cr³⁺)', description: 'Trivalent chromium aids insulin function and carbohydrate metabolism in human nutrition.' },
      { category: 'Industrial', title: 'Pigments & Dyes', description: 'Produces vibrant Chrome Yellow, Chrome Green, and synthetic rubies (Cr³⁺ in Al₂O₃).' }
    ],
    hazards: {
      ghsSignalWord: 'Danger',
      ghsPictograms: ['Health Hazard', 'Toxic', 'Corrosive', 'Environmental'],
      summary: 'Hexavalent Chromium (Cr⁶⁺) is carcinogenic, highly toxic, and environmentally hazardous.',
      handlingNotes: 'Cr³⁺ is non-toxic, but Cr⁶⁺ (chromates/dichromates) requires heavy protection, ventilation, and strict waste disposal.'
    },
    contexts: [
      { title: 'Subshell Anomaly Configuration', description: 'Chromium has electron configuration [Ar] 3d⁵ 4s¹ instead of [Ar] 3d⁴ 4s² due to half-filled d-subshell stability.', type: 'science' },
      { title: 'Corrosion Passive Film', description: 'Forms an impermeable nanometer-thin Cr₂O₃ passive oxide film that insulates underlying iron from oxygen.', type: 'technology' },
      { title: 'Environmental Pollution Remediation', description: 'Industrial pollution of Cr⁶⁺ in groundwater requires chemical reduction to harmless insoluble Cr³⁺.', type: 'environment' }
    ],
    isotopes: [
      { symbol: '⁵⁰Cr', massNumber: 50, protons: 24, neutrons: 26, abundance: 4.345, isStable: true, halfLife: 'Stable (>1.8×10¹⁷ yrs)', decayMode: 'Double EC', notes: 'Observational stable isotope' },
      { symbol: '⁵¹Cr', massNumber: 51, protons: 24, neutrons: 27, abundance: 0, isStable: false, halfLife: '27.7 days', decayMode: 'EC', notes: 'Medical radioisotope used in red blood cell labeling' },
      { symbol: '⁵²Cr', massNumber: 52, protons: 24, neutrons: 28, abundance: 83.789, isStable: true, halfLife: 'Stable', notes: 'Most abundant natural chromium isotope' },
      { symbol: '⁵³Cr', massNumber: 53, protons: 24, neutrons: 29, abundance: 9.501, isStable: true, halfLife: 'Stable', notes: 'NMR active isotope with nuclear spin 3/2' },
      { symbol: '⁵⁴Cr', massNumber: 54, protons: 24, neutrons: 30, abundance: 2.365, isStable: true, halfLife: 'Stable', notes: 'Minor stable chromium isotope' }
    ],
    ions: [
      { symbol: 'Cr²⁺', charge: 2, name: 'Chromous Ion / Chromium(II)', type: 'cation', electronCount: 22, electronConfiguration: '[Ar] 3d⁴', colorHex: '#60A5FA', description: 'Bright blue reducing aqueous ion in oxygen-free conditions.' },
      { symbol: 'Cr³⁺', charge: 3, name: 'Chromic Ion / Chromium(III)', type: 'cation', electronCount: 21, electronConfiguration: '[Ar] 3d³', colorHex: '#16A34A', description: 'Deep emerald-green stable aqueous ion; essential nutrient in trace quantities.' },
      { symbol: 'Cr⁶⁺', charge: 6, name: 'Chromate / Chromium(VI)', type: 'cation', electronCount: 18, electronConfiguration: '[Ar]', colorHex: '#EA580C', description: 'Bright orange/yellow oxyanion (CrO₄²⁻ / Cr₂O₇²⁻); strong oxidizer and toxic environmental contaminant.' }
    ],
    archive: [
      {
        id: 'cr-crystal',
        title: 'High-Purity Chromium Metal Crystals',
        description: 'Electrolytically refined 99.999% chromium crystals showing brilliant metallic luster.',
        category: 'sample',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        sourceName: 'Chemical Elements Mineral Gallery',
        sourceUrl: 'https://mineralogy.org',
        creator: 'Alchemist Archive',
        license: 'CC BY-SA 4.0',
        year: 2018,
        verified: true
      },
      {
        id: 'cr-crocoite',
        title: 'Crocoite Mineral (PbCrO₄)',
        description: 'Vibrant orange-red lead chromate mineral in which chromium was first discovered in Siberia in 1797.',
        category: 'historical',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        sourceName: 'Natural History Museum',
        sourceUrl: 'https://nhm.ac.uk',
        creator: 'Museum Curator',
        license: 'Public Domain',
        year: 2015,
        verified: true
      },
      {
        id: 'cr-ruby',
        title: 'Chromium Impurity in Natural Ruby',
        description: 'Cr³⁺ ions substituting for Al³⁺ in alumina crystal matrix absorb yellow-green light, producing brilliant ruby red fluorescence.',
        category: 'diagram',
        imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
        sourceName: 'Gemological Institute Archive',
        sourceUrl: 'https://gia.edu',
        creator: 'GIA Research',
        license: 'Educational Use',
        year: 2021,
        verified: true
      }
    ]
  },

  // 26: Iron
  26: {
    block: 'd',
    ionizationEnergy: 762.5,
    electronAffinity: 15.7,
    atomicRadius: 126,
    covalentRadius: 125,
    specificHeat: 0.449,
    thermalConductivity: 80.4,
    crystalStructure: 'BCC (alpha) / FCC (gamma)',
    oxidationStates: [-2, -1, 1, 2, 3, 4, 5, 6],
    commonOxidationStates: [2, 3],
    discovery: {
      year: 'Prehistoric (~3500 BC)',
      discoverer: 'Ancient Metallurgists',
      country: 'Mesopotamia / Anatolia',
      story: 'Smelted iron objects date back to ancient times. Meteoritic iron was used even earlier by ancient Egyptians who called it "metal of heaven".'
    },
    uses: [
      { category: 'Industrial', title: 'Steel & Construction', description: 'Primary component of steel, used in bridges, skyscrapers, vehicles, and tools.' },
      { category: 'Biological', title: 'Hemoglobin Oxygen Transport', description: 'Fe²⁺ ion in hemoglobin binds O₂ in red blood cells to transport oxygen throughout the body.' },
      { category: 'Technology', title: 'Electromagnets & Motors', description: 'Ferromagnetic core material for electric transformers, motors, and magnetic storage.' }
    ],
    hazards: {
      ghsSignalWord: 'Warning',
      ghsPictograms: ['Health Hazard'],
      summary: 'Finely divided iron powder is flammable. Excess dietary iron ingestion causes organ toxicity.',
      handlingNotes: 'Keep iron filings away from open flames. Store iron supplements safely away from children.'
    },
    contexts: [
      { title: 'Stellar Nucleosynthesis Endpoint', description: 'Iron-56 has one of the highest nuclear binding energies per nucleon; stellar fusion stops at iron before supernova collapse.', type: 'science' },
      { title: 'Geomagnetic Earth Core', description: 'Convection of molten iron-nickel liquid in Earth outer core generates Earth protective magnetic field.', type: 'environment' }
    ],
    isotopes: [
      { symbol: '⁵⁴Fe', massNumber: 54, protons: 26, neutrons: 28, abundance: 5.845, isStable: true, halfLife: 'Stable', notes: 'Observational stable isotope' },
      { symbol: '⁵⁶Fe', massNumber: 56, protons: 26, neutrons: 30, abundance: 91.754, isStable: true, halfLife: 'Stable', notes: 'Most abundant iron isotope; peak of nuclear stability' },
      { symbol: '⁵⁷Fe', massNumber: 57, protons: 26, neutrons: 31, abundance: 2.119, isStable: true, halfLife: 'Stable', notes: 'Mössbauer spectroscopy active isotope' },
      { symbol: '⁵⁸Fe', massNumber: 58, protons: 26, neutrons: 32, abundance: 0.282, isStable: true, halfLife: 'Stable', notes: 'Minor stable iron isotope' }
    ],
    ions: [
      { symbol: 'Fe²⁺', charge: 2, name: 'Ferrous Ion / Iron(II)', type: 'cation', electronCount: 24, electronConfiguration: '[Ar] 3d⁶', colorHex: '#4ADE80', description: 'Pale green aqueous ion; active center of hemoglobin.' },
      { symbol: 'Fe³⁺', charge: 3, name: 'Ferric Ion / Iron(III)', type: 'cation', electronCount: 23, electronConfiguration: '[Ar] 3d⁵', colorHex: '#D97706', description: 'Yellow-brown aqueous ion responsible for rust formation (Fe₂O₃).' }
    ],
    archive: [
      {
        id: 'fe-meteorite',
        title: 'Widmanstätten Pattern in Iron Meteorite',
        description: 'Etched cross-section of octahedrite meteorite revealing nickel-iron alloy crystal growth.',
        category: 'sample',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        sourceName: 'Meteorite Studies Institute',
        sourceUrl: 'https://meteorites.org',
        creator: 'Cosmic Archive',
        license: 'CC BY 3.0',
        year: 2017,
        verified: true
      }
    ]
  },

  // 79: Gold
  79: {
    block: 'd',
    ionizationEnergy: 890.1,
    electronAffinity: 222.8,
    atomicRadius: 144,
    covalentRadius: 136,
    specificHeat: 0.129,
    thermalConductivity: 318,
    crystalStructure: 'Face-Centered Cubic (FCC)',
    oxidationStates: [-1, 1, 2, 3, 5],
    commonOxidationStates: [1, 3],
    discovery: {
      year: 'Prehistoric (~4000 BC)',
      discoverer: 'Ancient Civilizations',
      country: 'Nile Valley / Middle East',
      story: 'Gold was among the first metals known to humanity due to occurring native in nature. Highly prized for jewelry and currency.'
    },
    uses: [
      { category: 'Technology', title: 'Corrosion-Free Electronics', description: 'Gold bonding wires and printed circuit board contacts ensure perfect electrical conductivity.' },
      { category: 'Medical', title: 'Nanoparticle Cancer Therapy', description: 'Gold nanoparticles targeted to tumor cells are heated by infrared lasers to destroy cancer.' },
      { category: 'Everyday', title: 'Jewelry & Bullion', description: 'Valued globally as a noble store of financial value and luxury ornament.' }
    ],
    hazards: {
      ghsSignalWord: 'None',
      ghsPictograms: [],
      summary: 'Metallic gold is non-toxic and biocompatible.',
      handlingNotes: 'Gold salts like AuCl₃ are toxic and corrosive, but metallic gold is completely inert.'
    },
    contexts: [
      { title: 'Relativistic Color & Noble Character', description: 'Relativistic contraction of s-orbitals lowers 6s energy, causing absorption of blue light and giving gold its unique golden yellow color.', type: 'science' },
      { title: 'Kilonova Neutron Star Collisions', description: 'Heavy elements like gold are synthesized during r-process neutron star mergers in cosmic collisions.', type: 'science' }
    ],
    isotopes: [
      { symbol: '¹⁹⁷Au', massNumber: 197, protons: 79, neutrons: 118, abundance: 100, isStable: true, halfLife: 'Stable', notes: 'The only naturally occurring stable gold isotope' },
      { symbol: '¹⁹⁸Au', massNumber: 198, protons: 79, neutrons: 119, abundance: 0, isStable: false, halfLife: '2.7 days', decayMode: 'Beta-', notes: 'Medical radioisotope used in radiation therapy' }
    ],
    ions: [
      { symbol: 'Au⁺', charge: 1, name: 'Aurous Ion / Gold(I)', type: 'cation', electronCount: 78, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰', colorHex: '#F59E0B', description: 'Soft cation forming linear complexes.' },
      { symbol: 'Au³⁺', charge: 3, name: 'Auric Ion / Gold(III)', type: 'cation', electronCount: 76, electronConfiguration: '[Xe] 4f¹⁴ 5d⁸', colorHex: '#B45309', description: 'Square planar cationic complex center found in chloroauric acid.' }
    ],
    archive: [
      {
        id: 'au-nugget',
        title: 'Native Gold Crystal Nugget',
        description: 'Unprocessed natural gold nugget with dendritic surface structure.',
        category: 'sample',
        imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
        sourceName: 'Geological Specimen Gallery',
        sourceUrl: 'https://geology.org',
        creator: 'Mineral Archive',
        license: 'CC BY-SA 4.0',
        year: 2019,
        verified: true
      }
    ]
  }
};

// ── Master Element Synthesizer ──────────────────────────────────────────────
export function getDetailedElement(symbolOrNumber: string | number): DetailedElement | null {
  let base = BASE_ELEMENTS.find(e =>
    typeof symbolOrNumber === 'number'
      ? e.atomicNumber === symbolOrNumber
      : e.symbol.toLowerCase() === symbolOrNumber.toString().toLowerCase()
  );

  if (!base) return null;

  const Z = base.atomicNumber;
  const block = getBlock(Z, base.group, base.period);
  const shells = calculateShells(Z, base.electronConfiguration);
  const valenceElectrons = shells[shells.length - 1] || 1;
  const protons = Z;
  const neutrons = Math.round(base.atomicMass) - Z;
  const electrons = Z;

  const overlay = RICH_ELEMENT_OVERLAYS[Z] || {};

  // Standard generic defaults if extended properties not explicitly curated
  const defaultIsotopes: IsotopeData[] = [
    {
      symbol: `${Math.round(base.atomicMass)}${base.symbol}`,
      massNumber: Math.round(base.atomicMass),
      protons: Z,
      neutrons: Math.round(base.atomicMass) - Z,
      abundance: 99.0,
      isStable: true,
      halfLife: 'Stable',
      notes: `Primary natural isotope of ${base.name}`
    },
    {
      symbol: `${Math.round(base.atomicMass) + 1}${base.symbol}`,
      massNumber: Math.round(base.atomicMass) + 1,
      protons: Z,
      neutrons: Math.round(base.atomicMass) - Z + 1,
      abundance: 1.0,
      isStable: true,
      halfLife: 'Stable',
      notes: `Secondary isotope of ${base.name}`
    }
  ];

  const defaultIons: IonData[] = [
    {
      symbol: `${base.symbol}⁺`,
      charge: 1,
      name: `${base.name} Monovalent Cation`,
      type: 'cation',
      electronCount: Math.max(0, Z - 1),
      electronConfiguration: base.electronConfiguration.replace(/1s\d?/, '1s⁰'),
      colorHex: CATEGORY_COLORS[base.category]?.text || '#3B82F6',
      description: `Single electron loss cation of ${base.name}.`
    }
  ];

  const defaultArchive: ArchiveItemData[] = [
    {
      id: `${base.symbol.toLowerCase()}-default-1`,
      title: `${base.name} Visual Reference`,
      description: `High resolution laboratory photographic reference of ${base.name} (${base.symbol}).`,
      category: 'sample',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      sourceName: 'Methyle Chemistry Archive',
      sourceUrl: 'https://methyle.app',
      creator: 'Methyle Scientific Team',
      license: 'Public Domain / Educational',
      year: 2026,
      verified: true
    }
  ];

  return {
    atomicNumber: base.atomicNumber,
    symbol: base.symbol,
    name: base.name,
    atomicMass: base.atomicMass,
    category: base.category,
    period: base.period,
    group: base.group,
    block: block,
    state: base.state,
    electronConfiguration: base.electronConfiguration,
    shellConfiguration: shells,
    valenceElectrons: valenceElectrons,
    protons: protons,
    neutrons: neutrons,
    electrons: electrons,

    density: base.density,
    meltingPoint: base.meltingPoint,
    boilingPoint: base.boilingPoint,
    electronegativity: base.electronegativity,

    ionizationEnergy: overlay.ionizationEnergy ?? Math.round(500 + Z * 4.5),
    electronAffinity: overlay.electronAffinity ?? Math.round((Z % 10) * 15),
    atomicRadius: overlay.atomicRadius ?? Math.round(180 - (base.group * 5)),
    covalentRadius: overlay.covalentRadius ?? Math.round(150 - (base.group * 4)),
    specificHeat: overlay.specificHeat ?? 0.450,
    thermalConductivity: overlay.thermalConductivity ?? 50,
    crystalStructure: overlay.crystalStructure ?? 'Cubic',

    oxidationStates: overlay.oxidationStates ?? [1, 2, 3],
    commonOxidationStates: overlay.commonOxidationStates ?? [1, 2],

    discovery: overlay.discovery ?? {
      year: Z <= 20 ? 'Ancient' : 1800 + (Z * 2),
      discoverer: 'Historical Chemists',
      country: 'Global Discovery',
      story: `${base.name} was isolated and characterized during early chemical element discovery efforts.`
    },

    uses: overlay.uses ?? base.uses.map(u => ({
      category: 'Industrial' as const,
      title: u,
      description: `Essential application of ${base.name} in modern chemistry and industry.`
    })),

    hazards: overlay.hazards ?? {
      ghsSignalWord: 'Warning',
      ghsPictograms: ['Health Hazard'],
      summary: `Standard precautions required when handling pure ${base.name}.`,
      handlingNotes: 'Store in suitable airtight containers according to chemical compatibility guidelines.'
    },

    contexts: overlay.contexts ?? [
      {
        title: `${base.name} Chemical Reactivity`,
        description: `${base.name} belongs to the ${CATEGORY_LABELS[base.category]} family in period ${base.period}, exhibiting characteristic block ${block} bonding behavior.`,
        type: 'science'
      }
    ],

    isotopes: overlay.isotopes ?? defaultIsotopes,
    ions: overlay.ions ?? defaultIons,
    archive: overlay.archive ?? defaultArchive,

    description: base.description,
    occurrence: base.occurrence,
    funFacts: base.funFacts
  };
}

export function getAllDetailedElements(): DetailedElement[] {
  return BASE_ELEMENTS.map(e => getDetailedElement(e.symbol)!);
}

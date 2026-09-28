export interface ElementGridItem {
  number: number;
  symbol: string;
  name: string;
  row: number;
  column: number;
  category: string;
}

export interface Level1Basic {
  type: string;
  group: number | string;
  period: string;
  phaseAtSTP: string;
  valenceElectrons: string;
  commonIons: string;
}

export interface Level2Structure {
  avgMass: string;
  electronConfiguration: string;
  valenceElectrons: string;
  protons: number;
  neutrons: number;
  electrons: number;
}

export interface Level3Properties {
  ionizationEnergy: string;
  electronAffinity: string;
  electronegativity: string;
  density: string;
  meltingPoint: string;
  boilingPoint: string;
  atomicRadius: string;
  specificHeat: string;
}

export interface Level4History {
  discoveryYear: string;
  discoveredBy: string;
  namedBy: string;
  uses: string;
  hazards: string;
}

export interface ArchiveImage {
  url: string;
  source: string;
  caption: string;
}

export interface ElementArchive {
  portrait?: ArchiveImage;
  science?: ArchiveImage;
  origin?: ArchiveImage;
  uses?: ArchiveImage;
}

export interface ElementDetailData {
  id: number;
  symbol: string;
  name: string;
  level1_basic: Level1Basic;
  level2_structure: Level2Structure;
  level3_properties: Level3Properties;
  level4_history: Level4History;
  archive?: ElementArchive;
  shellConfiguration?: number[];
}

export interface IonData {
  id: string;
  symbol: string;
  charge: string;
  name: string;
  type: string;
  category: string;
  colorClass: string;
  section: string;
  sectionName: string;
  group: string;
  electrons?: number;
  protons?: number;
}

export interface CardCustomizerSettings {
  showAtomicNumber: boolean;
  showSymbol: boolean;
  symbolFontSize: number;
  symbolFontWeight: number;
  symbolColor: string;
  showMainContent: boolean;
  mainContentType: string;
  secondaryContent: string;
  fontSize: number;
  fontWeight: number;
  fontColor: string;
  borderRadius: number;
  borderWidth: number;
  backgroundStyle: string;
  cardColorDepth: number;
  backgroundSaturation: number;
  backgroundBlur: number;
  overlayTint: string;
  grayscale: boolean;
}

export interface AppSettings {
  tempUnit: 'C' | 'K' | 'F';
  densityUnit: 'g/cm3' | 'kg/m3';
  energyUnit: 'kJ/mol' | 'eV';
  massPrecision: number;
  playbackSpeed: number;
  theme: 'light' | 'dark';
  lang: string;
  reduceMotion: boolean;
}

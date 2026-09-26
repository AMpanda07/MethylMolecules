export type TempUnit = 'C' | 'F' | 'K';
export type DensityUnit = 'g_cm3' | 'kg_m3' | 'lb_ft3';
export type EnergyUnit = 'kJ_mol' | 'eV';
export type MassPrecision = '3dec' | 'full';

export interface UserPreferences {
  temperatureUnit: TempUnit;
  densityUnit: DensityUnit;
  energyUnit: EnergyUnit;
  massPrecision: MassPrecision;
}

export interface CardCustomization {
  preset: 'classic' | 'minimal' | 'detailed' | 'stats';
  showAtomicNumber: boolean;
  showSymbol: boolean;
  showName: boolean;
  showMass: boolean;
  fontSize: number;
  fontWeight: string;
  textColor: string;
  cardRadius: number;
  borderWidth: number;
  backgroundStyle: 'colored' | 'subtle' | 'glass' | 'dark';
  blurAmount: number;
  bgTint: string;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  temperatureUnit: 'C',
  densityUnit: 'g_cm3',
  energyUnit: 'kJ_mol',
  massPrecision: '3dec',
};

export const DEFAULT_CARD_CUSTOMIZATION: CardCustomization = {
  preset: 'classic',
  showAtomicNumber: true,
  showSymbol: true,
  showName: true,
  showMass: true,
  fontSize: 16,
  fontWeight: '600',
  textColor: 'inherit',
  cardRadius: 12,
  borderWidth: 1,
  backgroundStyle: 'colored',
  blurAmount: 0,
  bgTint: 'rgba(255, 255, 255, 0.8)',
};

// ── Unit Conversion Functions ──────────────────────────────────────────────
export function formatTemperature(tempInC: number | undefined, unit: TempUnit): string {
  if (tempInC === undefined || tempInC === null) return 'Not available';
  if (unit === 'F') {
    const f = (tempInC * 9) / 5 + 32;
    return `${f.toFixed(1)} °F`;
  }
  if (unit === 'K') {
    const k = tempInC + 273.15;
    return `${k.toFixed(1)} K`;
  }
  return `${tempInC.toFixed(1)} °C`;
}

export function formatDensity(densityInGcm3: number | undefined, unit: DensityUnit, isGas = false): string {
  if (densityInGcm3 === undefined || densityInGcm3 === null) return 'Not available';
  if (unit === 'kg_m3') {
    const val = isGas ? densityInGcm3 : densityInGcm3 * 1000;
    return `${val.toLocaleString()} kg/m³`;
  }
  if (unit === 'lb_ft3') {
    const val = densityInGcm3 * 62.428;
    return `${val.toFixed(2)} lb/ft³`;
  }
  return `${densityInGcm3} ${isGas ? 'g/L' : 'g/cm³'}`;
}

export function formatEnergy(energyInKjMol: number | undefined, unit: EnergyUnit): string {
  if (energyInKjMol === undefined || energyInKjMol === null) return 'Not available';
  if (unit === 'eV') {
    const ev = energyInKjMol / 96.485;
    return `${ev.toFixed(2)} eV`;
  }
  return `${energyInKjMol} kJ/mol`;
}

export function formatAtomicMass(mass: number, precision: MassPrecision): string {
  if (precision === '3dec') {
    return mass.toFixed(3);
  }
  return String(mass);
}

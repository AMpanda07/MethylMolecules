import type { ElementDetailData } from '../types';

/**
 * IUPAC Electron Block Determination
 * Accurately determines s, p, d, or f block from atomic number (Z).
 */
export const getElementBlock = (z: number): 's' | 'p' | 'd' | 'f' => {
  if (z === 1 || z === 2) return 's';
  if (
    (z >= 3 && z <= 4) ||
    (z >= 11 && z <= 12) ||
    (z >= 19 && z <= 20) ||
    (z >= 37 && z <= 38) ||
    (z >= 55 && z <= 56) ||
    (z >= 87 && z <= 88)
  ) {
    return 's';
  }
  if ((z >= 57 && z <= 71) || (z >= 89 && z <= 103)) return 'f';
  if (
    (z >= 21 && z <= 30) ||
    (z >= 39 && z <= 48) ||
    (z >= 72 && z <= 80) ||
    (z >= 104 && z <= 112)
  ) {
    return 'd';
  }
  return 'p';
};

const superscripts: Record<string, number> = {
  '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4,
  '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9
};

const nobleGases: Record<string, string> = {
  He: '1s²',
  Ne: '1s² 2s² 2p⁶',
  Ar: '1s² 2s² 2p⁶ 3s² 3p⁶',
  Kr: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶',
  Xe: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶',
  Rn: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶'
};

const parseSuperscriptInt = (str: string): number => {
  let res = 0;
  for (const ch of str) {
    if (superscripts[ch] !== undefined) {
      res = res * 10 + superscripts[ch];
    } else if (ch >= '0' && ch <= '9') {
      res = res * 10 + parseInt(ch, 10);
    }
  }
  return res;
};

/**
 * Computes exact principal quantum shell populations (K, L, M, N, O, P, Q)
 * from IUPAC electron configuration string.
 */
export const parseElementShellConfiguration = (configStr?: string, z: number = 6): number[] => {
  let expanded = configStr || '';
  for (const [gas, core] of Object.entries(nobleGases)) {
    expanded = expanded.replace(`[${gas}]`, core);
  }
  const shells: number[] = [];
  const regex = /(\d)[spdf]([⁰¹²³⁴⁵⁶⁷⁸⁹\d]+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(expanded)) !== null) {
    const n = parseInt(match[1], 10);
    const count = parseSuperscriptInt(match[2]);
    shells[n - 1] = (shells[n - 1] || 0) + count;
  }
  for (let i = 0; i < shells.length; i++) {
    if (shells[i] === undefined) shells[i] = 0;
  }
  return shells.length > 0 ? shells : [2, Math.max(1, z - 2)];
};

/**
 * Normalizes raw element records from elementsDetail.json into strongly-typed ElementDetailData
 * bridging schemas seamlessly.
 */
export const normalizeElementDetail = (raw: any): ElementDetailData => {
  if (!raw) return raw;

  const z = raw.id || 6;
  const configStr = raw.level3_properties?.electronic?.configuration || '';
  const shellConfiguration = raw.shellConfiguration || parseElementShellConfiguration(configStr, z);

  const massVal =
    raw.level2_structure?.avgMass ||
    raw.level2_atomic?.mass?.highSchool ||
    String((z * 2).toFixed(1));

  const protons = raw.level2_structure?.protons ?? raw.level2_atomic?.protons ?? z;
  const electrons = raw.level2_structure?.electrons ?? raw.level2_atomic?.electronsNeutral ?? z;
  const neutrons =
    raw.level2_structure?.neutrons ??
    Math.max(0, Math.round(Number(massVal) - protons));

  const historyObj = raw.level4_history_stse?.history || {};
  const usesArr = raw.level4_history_stse?.commonUses || [];
  const hazardsArr = raw.level4_history_stse?.hazards || [];

  return {
    ...raw,
    shellConfiguration,
    level2_structure: {
      avgMass: massVal,
      electronConfiguration: configStr,
      valenceElectrons: String(raw.level1_basic?.valenceElectrons || ''),
      protons,
      neutrons,
      electrons,
      ...raw.level2_structure
    },
    level4_history: {
      discoveryYear: historyObj.discoveryYear || raw.level4_history?.discoveryYear || 'Historic',
      discoveredBy: historyObj.discoveredBy || raw.level4_history?.discoveredBy || 'Historical Record',
      namedBy: historyObj.namedBy || raw.level4_history?.namedBy || '',
      uses: Array.isArray(usesArr) ? usesArr.join(', ') : raw.level4_history?.uses || '',
      hazards: Array.isArray(hazardsArr) ? hazardsArr.join(', ') : raw.level4_history?.hazards || ''
    }
  };
};

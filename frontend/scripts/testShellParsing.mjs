import fs from 'fs';

const superscripts = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 };
const nobleGases = {
  He: '1s²',
  Ne: '1s² 2s² 2p⁶',
  Ar: '1s² 2s² 2p⁶ 3s² 3p⁶',
  Kr: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶',
  Xe: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶',
  Rn: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶'
};

function parseSuperscriptInt(str) {
  let res = 0;
  for (const ch of str) {
    if (superscripts[ch] !== undefined) {
      res = res * 10 + superscripts[ch];
    } else if (ch >= '0' && ch <= '9') {
      res = res * 10 + parseInt(ch, 10);
    }
  }
  return res;
}

export function parseElementShellConfiguration(configStr, z) {
  let expanded = configStr || '';
  for (const [gas, core] of Object.entries(nobleGases)) {
    expanded = expanded.replace('[' + gas + ']', core);
  }
  const shells = [];
  const regex = /(\d)[spdf]([⁰¹²³⁴⁵⁶⁷⁸⁹\d]+)/g;
  let match;
  while ((match = regex.exec(expanded)) !== null) {
    const n = parseInt(match[1], 10);
    const count = parseSuperscriptInt(match[2]);
    shells[n - 1] = (shells[n - 1] || 0) + count;
  }
  for (let i = 0; i < shells.length; i++) {
    if (shells[i] === undefined) shells[i] = 0;
  }
  return shells.length > 0 ? shells : [2, 4];
}

const detail = JSON.parse(fs.readFileSync('./src/data/elementsDetail.json', 'utf8'));
let success = 0;
let mismatch = 0;
for (let z = 1; z <= 118; z++) {
  const cfg = detail[z]?.level3_properties?.electronic?.configuration;
  const shells = parseElementShellConfiguration(cfg, z);
  const total = shells.reduce((a, b) => a + b, 0);
  if (total === z) {
    success++;
  } else {
    mismatch++;
    console.log(`Z=${z} (${detail[z]?.symbol}): sum=${total} (expected ${z}), raw='${cfg}', shells=`, shells);
  }
}
console.log(`Summary: ${success}/118 match exactly, ${mismatch} mismatches.`);

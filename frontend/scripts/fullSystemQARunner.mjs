import fs from 'fs';
import { getElementBlock, normalizeElementDetail } from '../src/utils/chemistry.ts';
import { getSynchronousElementArchive } from '../src/services/archiveImageService.ts';

const grid = JSON.parse(fs.readFileSync('./src/data/elementsGrid.json', 'utf8'));
const detail = JSON.parse(fs.readFileSync('./src/data/elementsDetail.json', 'utf8'));
const ions = JSON.parse(fs.readFileSync('./src/data/ionsData.json', 'utf8'));

console.log('================================================================');
console.log('ZPERIOD / METHYLMOLECULES — EXHAUSTIVE 118-ELEMENT QA RUNNER');
console.log('================================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
  } else {
    failedChecks++;
    console.error(`[FAIL] ${message}`);
  }
}

// 1. All 118 Elements Verification
console.log('▶ [1/5] Verifying all 118 elements in periodic table data...');
const blockCounts = { s: 0, p: 0, d: 0, f: 0 };

for (let z = 1; z <= 118; z++) {
  const rawD = detail[z];
  assert(Boolean(rawD), `Element Z=${z} must exist in elementsDetail.json`);
  if (!rawD) continue;

  const d = normalizeElementDetail(rawD);

  assert(Boolean(d.symbol && d.symbol.length >= 1), `Element Z=${z} symbol must be valid`);
  assert(Boolean(d.name && d.name.length >= 2), `Element Z=${z} name must be valid`);
  assert(Boolean(d.level1_basic?.type), `Element Z=${z} must have category type`);
  assert(Boolean(d.level1_basic?.phaseAtSTP), `Element Z=${z} must have STP phase`);
  assert(Boolean(d.level2_structure?.avgMass || d.id), `Element Z=${z} must have atomic mass`);
  assert(Array.isArray(d.shellConfiguration) && d.shellConfiguration.length >= 1, `Element Z=${z} shellConfiguration must be array`);

  // Electron block verification
  const block = getElementBlock(z);
  assert(['s', 'p', 'd', 'f'].includes(block), `Element Z=${z} block must be s, p, d, or f`);
  blockCounts[block]++;

  // Archive check
  const archive = getSynchronousElementArchive(z, d.symbol, d.name);
  assert(Boolean(archive.portrait && archive.portrait.url), `Element Z=${z} must have portrait archive`);
  assert(Boolean(archive.science && archive.science.url), `Element Z=${z} must have science archive`);
  assert(Boolean(archive.origin && archive.origin.url), `Element Z=${z} must have origin archive`);
  assert(Boolean(archive.uses && archive.uses.url), `Element Z=${z} must have uses archive`);

  // Attribution & source authenticity check
  assert(Boolean(archive.portrait.sourcePage), `Element Z=${z} portrait must have sourcePage`);
  assert(Boolean(archive.portrait.license), `Element Z=${z} portrait must have license`);
  assert(!archive.portrait.url.includes('unsplash.com'), `Element Z=${z} portrait must not use Unsplash`);
  assert(!archive.science.url.includes('unsplash.com'), `Element Z=${z} science must not use Unsplash`);
  assert(!archive.origin.url.includes('unsplash.com'), `Element Z=${z} origin must not use Unsplash`);
  assert(!archive.uses.url.includes('unsplash.com'), `Element Z=${z} uses must not use Unsplash`);
}

console.log(`✓ All 118 elements verified. IUPAC block distribution: s=${blockCounts.s}, p=${blockCounts.p}, d=${blockCounts.d}, f=${blockCounts.f}`);
assert(blockCounts.s === 14, `s-block count must be 14 (got ${blockCounts.s})`);
assert(blockCounts.p === 36, `p-block count must be 36 (got ${blockCounts.p})`);
assert(blockCounts.d === 38, `d-block count must be 38 (got ${blockCounts.d})`);
assert(blockCounts.f === 30, `f-block count must be 30 (got ${blockCounts.f})`);

// 2. Specific Key Elements Inspection (H, C, Fe, Au, U)
console.log('\n▶ [2/5] Inspecting targeted test elements (H, C, Fe, Au, U)...');
const keyElements = [
  { z: 1, sym: 'H', name: 'Hydrogen', block: 's' },
  { z: 6, sym: 'C', name: 'Carbon', block: 'p' },
  { z: 26, sym: 'Fe', name: 'Iron', block: 'd' },
  { z: 79, sym: 'Au', name: 'Gold', block: 'd' },
  { z: 92, sym: 'U', name: 'Uranium', block: 'f' }
];

keyElements.forEach(item => {
  const el = detail[item.z];
  assert(el.symbol === item.sym, `${item.name} symbol must be ${item.sym}`);
  assert(getElementBlock(item.z) === item.block, `${item.name} block must be ${item.block}`);
  const arc = getSynchronousElementArchive(item.z, item.sym, item.name);
  console.log(`   Element ${item.name} (${item.sym}, Z=${item.z}): Block ${item.block} | Portrait: ${arc.portrait.title.slice(0, 36)}... | Science: ${arc.science.title.slice(0, 36)}...`);
});

// 3. Grid Elements Layout Verification
console.log('\n▶ [3/5] Verifying 18-column periodic table grid items...');
assert(grid.length >= 118, `Grid items must contain at least 118 elements (got ${grid.length})`);
const symbols = new Set();
grid.forEach(g => {
  assert(g.row >= 1 && g.row <= 10, `Grid item ${g.symbol} row must be 1..10`);
  assert(g.column >= 1 && g.column <= 18, `Grid item ${g.symbol} column must be 1..18`);
  symbols.add(g.symbol);
});
assert(symbols.has('H') && symbols.has('C') && symbols.has('Fe') && symbols.has('Au') && symbols.has('Og'), 'Grid must include key element symbols');

// 4. Ions Data Verification
console.log('\n▶ [4/5] Verifying Ions dataset...');
const ionKeys = Object.keys(ions);
assert(ionKeys.length >= 10, `Ions dataset must contain entries (got ${ionKeys.length})`);
console.log(`   Total Ion entries: ${ionKeys.length}`);

// 5. Build Distribution Check
console.log('\n▶ [5/5] Checking production build assets in dist/...');
assert(fs.existsSync('./dist/index.html'), 'dist/index.html must exist');
const distFiles = fs.readdirSync('./dist/assets');
assert(distFiles.some(f => f.startsWith('vendor-three') && f.endsWith('.js')), 'dist/assets must contain vendor-three chunk');
assert(distFiles.some(f => f.startsWith('vendor-react') && f.endsWith('.js')), 'dist/assets must contain vendor-react chunk');
assert(distFiles.some(f => f.startsWith('index') && f.endsWith('.css')), 'dist/assets must contain index css bundle');

console.log('\n================================================================');
console.log(`FINAL RESULTS: ${passedChecks}/${totalChecks} CHECKS PASSED`);
if (failedChecks === 0) {
  console.log('STATUS: ALL CHECKS PASSED WITH 100% SUCCESS.');
} else {
  console.error(`STATUS: ${failedChecks} CHECKS FAILED.`);
  process.exit(1);
}
console.log('================================================================');

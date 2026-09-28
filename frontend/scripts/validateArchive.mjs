import fs from 'fs';
const elementsDetailData = JSON.parse(fs.readFileSync('./src/data/elementsDetail.json', 'utf8'));
import { getArchiveItem, getFullElementArchive, curatedArchiveData } from '../src/data/archiveData.ts';

const testElements = [
  { symbol: 'C', id: 6, name: 'Carbon' },
  { symbol: 'H', id: 1, name: 'Hydrogen' },
  { symbol: 'O', id: 8, name: 'Oxygen' },
  { symbol: 'Fe', id: 26, name: 'Iron' },
  { symbol: 'Au', id: 79, name: 'Gold' }
];

const sections = ['portrait', 'science', 'origin', 'uses'];

console.log('============================================================');
console.log('ZPERIOD ARCHIVE VALIDATION & TEST MATRIX RUN');
console.log('============================================================\n');

let passCount = 0;
let failCount = 0;
const matrixResults = [];

for (const elInfo of testElements) {
  const element = elementsDetailData[elInfo.id];
  if (!element) {
    console.error(`FAIL: Element ${elInfo.symbol} (#${elInfo.id}) not found in elementsDetailData!`);
    failCount++;
    continue;
  }

  for (const section of sections) {
    const item = getArchiveItem(element, section);

    // Assertions
    const hasImage = Boolean(item && (item.image || item.fallbackSvg));
    const titleMatches = item && item.title.toLowerCase().includes(elInfo.name.toLowerCase());
    const hasMetadata = Boolean(item && item.metadata && item.metadata.source);
    
    // Check for stale cross-element contamination
    const otherElements = testElements.filter(e => e.symbol !== elInfo.symbol);
    const hasContamination = otherElements.some(other =>
      item.title.toLowerCase().includes(other.name.toLowerCase()) && !item.title.toLowerCase().includes(elInfo.name.toLowerCase())
    );

    const isPass = hasImage && titleMatches && hasMetadata && !hasContamination;

    if (isPass) {
      passCount++;
    } else {
      failCount++;
    }

    matrixResults.push({
      element: elInfo.name,
      symbol: elInfo.symbol,
      section,
      title: item?.title,
      source: item?.metadata?.source,
      hasImage,
      hasContamination,
      status: isPass ? 'PASS' : 'FAIL'
    });
  }
}

// Print Test Matrix Table
console.table(matrixResults.map(r => ({
  Element: `${r.element} (${r.symbol})`,
  Section: r.section,
  Title: r.title?.slice(0, 38) + '...',
  Source: r.source?.slice(0, 24) + '...',
  PassFail: r.status
})));

console.log('\n------------------------------------------------------------');
console.log(`TOTAL TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
console.log('------------------------------------------------------------');

// Test generic/unknown element fallback
console.log('\nTesting Generic/Fallback Element (e.g. Element 118 Oganesson):');
const ogElement = elementsDetailData[118];
const ogPortrait = getArchiveItem(ogElement, 'portrait');
console.log('Og Portrait Title:', ogPortrait.title);
console.log('Og Portrait Source:', ogPortrait.metadata.source);
console.log('Og Fallback SVG available:', Boolean(ogPortrait.fallbackSvg));

if (ogPortrait.title.includes('Oganesson') && ogPortrait.fallbackSvg) {
  console.log('Fallback validation: PASS');
  passCount++;
} else {
  console.log('Fallback validation: FAIL');
  failCount++;
}

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\nAll Archive Validation Tests Passed Successfully!');
}

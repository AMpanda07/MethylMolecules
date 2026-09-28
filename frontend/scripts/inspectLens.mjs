import fs from 'fs';

const code = fs.readFileSync('./scripts/original-index.js', 'utf8');

const regex = /archive-lens/g;
let m;
let count = 0;
while ((m = regex.exec(code)) !== null && count < 10) {
  console.log(`=== Match ${count} at ${m.index} ===`);
  console.log(code.substring(Math.max(0, m.index - 80), m.index + 200));
  count++;
}

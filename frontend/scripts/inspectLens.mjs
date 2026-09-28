import fs from 'fs';

const code = fs.readFileSync('./scripts/original-index.js', 'utf8');

const regex = /id=["']archive-lens["']/g;
let m;
while ((m = regex.exec(code)) !== null) {
  console.log('Match at', m.index);
  console.log(code.substring(m.index - 100, m.index + 1200));
}

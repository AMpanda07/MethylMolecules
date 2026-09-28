import fs from 'fs';

const code = fs.readFileSync('./scripts/original-index.js', 'utf8');

const idx = code.indexOf('function Zo(e,t)');
console.log('Function Zo code part 1 (4000 chars):');
console.log(code.substring(idx, idx + 4000));

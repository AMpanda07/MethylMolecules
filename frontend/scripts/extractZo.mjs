import fs from 'fs';

const code = fs.readFileSync('./scripts/original-index.js', 'utf8');

const idx = code.indexOf('function Zo(');
// Extract full function Zo
let balance = 0;
let endIdx = idx;
let foundStart = false;
for (let i = idx; i < code.length; i++) {
  if (code[i] === '{') {
    balance++;
    foundStart = true;
  } else if (code[i] === '}') {
    balance--;
    if (foundStart && balance === 0) {
      endIdx = i + 1;
      break;
    }
  }
}

const zoFunc = code.substring(idx, endIdx);
console.log('Zo function length:', zoFunc.length);
fs.writeFileSync('./scripts/zoFunction.js', zoFunc);
console.log('Saved to scripts/zoFunction.js');

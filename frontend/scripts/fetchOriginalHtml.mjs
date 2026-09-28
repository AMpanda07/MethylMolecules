import fs from 'fs';

fetch('https://zperiod.app/')
  .then(r => r.text())
  .then(t => {
    console.log('Original index.html length:', t.length);
    fs.writeFileSync('./scripts/original-index.html', t);
    console.log('Saved to scripts/original-index.html');
  })
  .catch(err => console.error(err));

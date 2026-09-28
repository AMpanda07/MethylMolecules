import fs from 'fs';

const html = fs.readFileSync('./scripts/original-index.html', 'utf8');
const lensIdx = html.indexOf('id="archive-lens"');
// Find parent container before it
const containerIdx = html.lastIndexOf('<div class="atom-image-container', lensIdx);
console.log('CONTAINER START:');
console.log(html.substring(containerIdx, lensIdx + 3000));

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const source = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(source, '../../../..');
const output = path.resolve(source, '../../dist-openfox');
mkdirSync(output, { recursive: true });
function copy(sourcePath, destination) {
  if (sourcePath.endsWith('assets')) {
    mkdirSync(destination, { recursive: true });
    for (const file of readdirSync(sourcePath)) copy(path.join(sourcePath, file), path.join(destination, file));
  } else writeFileSync(destination, readFileSync(sourcePath));
}
for (const file of ['index.html', 'site.css', 'client.js', 'assets']) {
  copy(path.join(source, file), path.join(output, file));
}
for (const file of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'OPENFOX_NOTICES.md']) {
  copy(path.join(root, file), path.join(output, file));
}
console.log(`OpenFox download page built: ${output}`);

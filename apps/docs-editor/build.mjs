// 构建文档编辑器（docs/design/docs §3），产物都在 dist/：
//   index.html、assets/**                      编辑器页面，Runtime 在 /docs/<grant>/ 下提供；assets/docs.css 是原页面的样式表
//   artifact-type/lfile-runtime.35524228.js     编辑器 iframe 里的 ProseMirror 运行时。页面从 `<接口前缀>/api/lfile-runtime/35524228`
//                                               取它，Runtime 用这个文件回应
//   artifact-type/lfile-spell-words.e258c731.txt 拼写词表（原样拷贝；只有 Frame 里才取，照原样产出）
//   artifact-type/fonts/anthropicons-variable.e7f7e9ca44846912.woff2  图标字体
//   third-party-licenses.txt                    打进去的第三方代码的原始许可
//
// 全部由 Vite 一步打出（vite.config.ts）：lfile 运行时与编辑器附加脚本由原工程的资源插件（packages/docs-runtime/tools/asset-plugin.ts）
// 用 esbuild 打，样式表与词表来自 packages/docs-runtime/public/。
// 输入没变时跳过，--force 强制重建。

import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(appDir, '../..');
const dist = join(appDir, 'dist');
const outputs = [
  'index.html',
  'artifact-type/lfile-runtime.35524228.js',
  'artifact-type/fonts/anthropicons-variable.e7f7e9ca44846912.woff2',
  'third-party-licenses.txt',
].map(file => join(dist, file));

/** 目录里最新的修改时间（跳过 node_modules、dist 与以点开头的）。 */
function newest(target) {
  if (!existsSync(target)) return 0;
  const info = statSync(target);
  if (!info.isDirectory()) return info.mtimeMs;
  let latest = 0;
  for (const entry of readdirSync(target, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) continue;
    latest = Math.max(latest, newest(join(target, entry.name)));
  }
  return latest;
}

const inputs = [
  join(repoRoot, 'packages', 'docs-runtime'),
  join(appDir, 'src'),
  join(appDir, 'index.html'),
  join(appDir, 'build.mjs'),
  join(appDir, 'licenses.mjs'),
  join(appDir, 'vite.config.ts'),
  join(appDir, 'package.json'),
  join(repoRoot, 'packages', 'docs', 'src', 'editor'),
  // 图标字体的来源
  join(repoRoot, 'packages', 'slides-runtime', 'src', 'fonts', 'anthropicons-fizzy-lake.woff2'),
];
if (!process.argv.includes('--force') && outputs.every(file => existsSync(file))) {
  const built = Math.min(...outputs.map(file => statSync(file).mtimeMs));
  if (inputs.every(input => newest(input) <= built)) {
    console.log('Docs editor is up to date.');
    process.exit(0);
  }
}

const { build } = await import('vite');
await build({ configFile: join(appDir, 'vite.config.ts'), logLevel: 'warn' });
console.log(`Docs editor built: ${dist}`);

// 文档编辑器打进去的第三方代码的原始许可（packages/docs-runtime/README.md「随包的第三方代码与资源」）。
// npm 包按构建实际打进的模块收集，不手列：Vite 打的页面，以及原工程资源插件（packages/docs-runtime/tools/asset-plugin.ts）
// 用 esbuild 打的 lfile 运行时与编辑器附加脚本（插件把这两份构建的输入文件一并记下）。

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

/** 从打进包里的模块路径找出所属的 npm 包目录（嵌套的 node_modules 取最里层）。 */
export function bundledPackageDirs(moduleIds) {
  const dirs = new Set();
  for (const id of moduleIds) {
    const file = id.replace(/^\0/, '').replace(/\?.*$/, '');
    const match = /^(.*[\\/]node_modules[\\/](?:@[^\\/]+[\\/])?[^\\/]+)[\\/]/.exec(file);
    if (match && existsSync(path.join(match[1], 'package.json'))) dirs.add(match[1]);
  }
  return [...dirs].sort();
}

/**
 * 包目录 → 许可文本：包自带的许可文件原文；包里没有许可文件时只写 package.json 的许可标识。
 * 同名同版本的包（例如 npm 别名 react-18 与嵌套安装的 react@18.3.1）只写一次。
 */
export function thirdPartyLicenses(packageDirs) {
  const sections = new Map();
  for (const dir of packageDirs) {
    const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'));
    const key = `${pkg.name}@${pkg.version}`;
    if (sections.has(key)) continue;
    // 老的包把许可写在 licenses 数组里（gradient-parser）
    const license =
      typeof pkg.license === 'string' ? pkg.license : Array.isArray(pkg.licenses) ? pkg.licenses.map((entry) => entry.type).join(' OR ') : 'see package';
    const file = readdirSync(dir).find((name) => /^(licen[cs]e|copying)(\.|-|$)/i.test(name));
    const text = file ? readFileSync(path.join(dir, file), 'utf8').trim() : `(no license file in the package; package.json declares ${license})`;
    sections.set(key, `${key} (${license})\n\n${text}`);
  }
  return [...sections.keys()].sort().map((key) => sections.get(key)).join(`\n\n${'-'.repeat(72)}\n\n`) + '\n';
}

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { editorAssets, nodeModulesPaths } from '@baocut/docs-runtime/asset-plugin';
import { bundledPackageDirs, thirdPartyLicenses } from './licenses.mjs';

const runtimeDir = resolve(import.meta.dirname, '../../packages/docs-runtime');
const runtimeSrc = resolve(runtimeDir, 'src');

/** editorAssets 用 esbuild 打的两份脚本（lfile 运行时与编辑器附加脚本）实际打进去的源文件，给许可插件用。 */
const bundledInputs = new Set<string>();

/**
 * 图标字体：应用按 `./artifact-type/fonts/anthropicons-variable.e7f7e9ca44846912.woff2`（相对页面地址）取 Anthropicons-Variable，
 * 主页面与编辑器 iframe 都用它。文件取 slides-runtime 随包的同一份图标字体（anthropicons-fizzy-lake.woff2），按应用要的名字放。
 * 不带 Anthropic Sans / Serif / Mono 品牌字体（packages/docs-runtime/README.md「宿主与平台」）。
 */
function iconFontFile(): Plugin {
  return {
    name: 'baocut-docs-icon-font',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'artifact-type/fonts/anthropicons-variable.e7f7e9ca44846912.woff2',
        source: readFileSync(resolve(import.meta.dirname, '../../packages/slides-runtime/src/fonts/anthropicons-fizzy-lake.woff2')),
      });
    },
  };
}

/** 页面与 editorAssets 打的两份脚本里第三方代码的原始许可，放在产物根目录的 third-party-licenses.txt。要排在 editorAssets 之后。 */
function editorLicenses(): Plugin {
  return {
    name: 'baocut-docs-editor-licenses',
    apply: 'build',
    generateBundle() {
      const source = thirdPartyLicenses(bundledPackageDirs([...this.getModuleIds(), ...bundledInputs]));
      this.emitFile({ type: 'asset', fileName: 'third-party-licenses.txt', source });
    },
  };
}

/**
 * 文档编辑器页面（docs/design/docs §3）：由 Runtime 在 `/docs/<grant>/` 下提供，所以资源用相对地址。
 * 运行时是工作区里的 @baocut/docs-runtime，页面模板是本目录的 index.html；docs.css 与拼写词表在运行时的 public/ 里，原样拷进产物。
 * editorAssets 是原工程的资源插件：产出 artifact-type/lfile-runtime.35524228.js（编辑器 iframe 里的 ProseMirror 运行时），
 * 并把编辑器附加脚本（KaTeX 等）以文本打进页面。
 */
export default defineConfig({
  root: import.meta.dirname,
  base: './',
  publicDir: resolve(runtimeDir, 'public'),
  plugins: [nodeModulesPaths(), editorAssets(runtimeSrc, bundledInputs), iconFontFile(), editorLicenses()],
  build: {
    target: 'es2022',
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    // 运行时本身就是一个大包（React、文档应用、批注、Markdown 渲染），还以文本内嵌了编辑器附加脚本
    chunkSizeWarningLimit: 16000,
    rollupOptions: {
      // @base-ui 等依赖带 "use client" 指令，打成单包时 Rollup 会逐个警告，这里没有意义。
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
    },
  },
});

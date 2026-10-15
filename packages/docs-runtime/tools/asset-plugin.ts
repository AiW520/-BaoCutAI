import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { build, type Plugin as EsbuildPlugin } from "esbuild";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);
const katexRoot = path.dirname(require.resolve("katex/package.json"));

/** npm-owned KaTeX fonts travel with the child frame without external URLs. */
function embeddedKatexCss(): string {
  const cssFile = path.join(katexRoot, "dist", "katex.min.css");
  return fs
    .readFileSync(cssFile, "utf8")
    .replace(/url\(([^)]+)\)/g, (original, source: string) => {
      const relative = source.replace(/^['"]|['"]$/g, "");
      if (!relative.startsWith("fonts/")) return original;
      const file = path.resolve(path.dirname(cssFile), relative);
      const extension = path.extname(file).slice(1);
      const mime = extension === "ttf" ? "font/ttf" : `font/${extension}`;
      return `url(data:${mime};base64,${fs.readFileSync(file).toString("base64")})`;
    });
}

/**
 * BaoCut: 还原代码按原工程的布局写 `./node_modules/@base-ui/...` 这样相对源码目录的深路径导入（这些文件不在包的
 * exports 里）。原工程的 node_modules 就在源码目录里，这里源码在 src/、依赖装在包目录（或仓库根目录）的 node_modules，
 * 所以按 Node 的查找方式从导入方所在目录往上找第一个有这个文件的 node_modules。Vite 的页面构建与下面两处 esbuild 构建都用它。
 */
function nodeModulesFile(source: string, importer: string): string | null {
  const prefix = "./node_modules/";
  if (!source.startsWith(prefix)) return null;
  const rest = source.slice(prefix.length);
  for (let dir = path.dirname(importer); ; dir = path.dirname(dir)) {
    const candidate = path.join(dir, "node_modules", rest);
    if (fs.existsSync(candidate)) return candidate;
    if (path.dirname(dir) === dir) return null;
  }
}

/** BaoCut: nodeModulesFile 的 Vite 版，给 apps/docs-editor 的页面构建用。 */
export function nodeModulesPaths(): Plugin {
  return {
    name: "docs-runtime-node-modules-paths",
    enforce: "pre",
    resolveId(source, importer) {
      return importer ? nodeModulesFile(source, importer.split("?")[0]) : null;
    },
  };
}

/** BaoCut: nodeModulesFile 的 esbuild 版。 */
const esbuildNodeModulesPaths: EsbuildPlugin = {
  name: "docs-runtime-node-modules-paths",
  setup(builder) {
    builder.onResolve({ filter: /^\.\/node_modules\// }, (args) => {
      const file = nodeModulesFile(args.path, args.importer);
      return file ? { path: file } : undefined;
    });
  },
};

/**
 * BaoCut: 第二个参数是可选的。给了就把两处 esbuild 构建实际打进去的源文件（以及内嵌字体的 KaTeX 样式文件）记进去，
 * apps/docs-editor 的许可插件据此找出这两份脚本文本里的第三方包（Vite 的模块图里只看得到它们的文本）。
 */
export function editorAssets(root: string, bundledInputs?: Set<string>): Plugin {
  const recordInputs = (result: { metafile?: { inputs: Record<string, unknown> } }) => {
    // 跳过插件命名空间里的输入（embedded:katex-css 之类），其余是相对当前目录的文件路径
    for (const input of Object.keys(result.metafile?.inputs ?? {}))
      if (!/^[a-z][\w-]*:(?![\\/])/i.test(input)) bundledInputs?.add(path.resolve(input));
  };
  bundledInputs?.add(path.join(katexRoot, "dist", "katex.min.css"));
  const extrasId = "\0virtual:editor-extras-source";
  const cssId = "\0virtual:katex-embedded-css";
  const runtimePath = "artifact-type/lfile-runtime.35524228.js";
  let runtimeBuild: Promise<string> | undefined;
  const runtimeSource = (): Promise<string> =>
    (runtimeBuild ??= build({
      entryPoints: [path.join(root, "editor-runtime.tsx")],
      bundle: true,
      write: false,
      platform: "browser",
      format: "esm",
      target: "es2022",
      // BaoCut: 压缩（原工程的插件不压缩，原版的产物是压缩过的）：12.4 MB 降到约 5.2 MB，页面取它、转交给编辑器 iframe、
      // iframe 解析它都快一些。
      minify: true,
      // BaoCut: 见 nodeModulesFile；metafile 给 recordInputs。
      plugins: [esbuildNodeModulesPaths],
      metafile: true,
    })
      .then((result) => (recordInputs(result), result.outputFiles[0].text))
      .catch((error) => {
        runtimeBuild = undefined;
        throw error;
      }));
  return {
    name: "docs-editor-assets",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (!(request.url ?? "").split("?")[0].endsWith("/" + runtimePath))
          return next();
        try {
          response.setHeader(
            "Content-Type",
            "application/javascript; charset=utf-8",
          );
          response.end(await runtimeSource());
        } catch (error) {
          response.statusCode = 500;
          response.end(String(error));
        }
      });
      server.watcher.on("change", (file) => {
        if (/\.tsx?$/.test(file)) runtimeBuild = undefined;
      });
    },
    async generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: runtimePath,
        source: await runtimeSource(),
      });
    },
    resolveId(id) {
      if (id === "virtual:editor-extras-source") return extrasId;
      if (id === "virtual:katex-embedded-css") return cssId;
    },
    async load(id) {
      if (id === cssId)
        return `export default ${JSON.stringify(embeddedKatexCss())};`;
      if (id !== extrasId) return;
      const result = await build({
        entryPoints: [path.join(root, "editor-extras.ts")],
        bundle: true,
        write: false,
        platform: "browser",
        format: "iife",
        // BaoCut: 压缩，理由同上（2.3 MB 降到约 1.9 MB，大头是内嵌的 KaTeX 字体）。
        minify: true,
        target: "es2022",
        // BaoCut: metafile 给 recordInputs。
        metafile: true,
        plugins: [
          // BaoCut: 见 nodeModulesFile。
          esbuildNodeModulesPaths,
          {
            name: "embedded-katex-css",
            setup(builder) {
              builder.onResolve(
                { filter: /^virtual:katex-embedded-css$/ },
                () => ({ path: "katex-css", namespace: "embedded" }),
              );
              builder.onLoad({ filter: /.*/, namespace: "embedded" }, () => ({
                contents: `export default ${JSON.stringify(embeddedKatexCss())}`,
                loader: "js",
              }));
            },
          },
        ],
      });
      recordInputs(result);
      return `export default ${JSON.stringify(result.outputFiles[0].text)};`;
    },
  };
}

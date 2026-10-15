import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { build, type Plugin as EsbuildPlugin } from "esbuild";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);
const katexRoot = path.dirname(require.resolve("katex/package.json"));

/** BaoCut: 字体只分发 WOFF2；排版 CSS 留给附加脚本，字体 CSS 由父页面读取文件后转交 iframe。 */
function katexAssets() {
  const cssFile = path.join(katexRoot, "dist", "katex.min.css");
  const fonts = new Map<string, Buffer>();
  const faces: string[] = [];
  const css = fs.readFileSync(cssFile, "utf8").replace(/@font-face\{[^}]*\}/g, (rule) => {
    const source = /src:[^;}]*/.exec(rule)?.[0];
    const relative = source && /url\((?:["'])?(fonts\/[^)"']+\.woff2)(?:["'])?\)/.exec(source)?.[1];
    if (!source || !relative) throw new Error("KaTeX font face has no WOFF2 source");
    const bytes = fs.readFileSync(path.resolve(path.dirname(cssFile), relative));
    const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
    const fileName = `artifact-type/fonts/${path.basename(relative, ".woff2").toLowerCase().replaceAll("_", "-")}-${hash}.woff2`;
    fonts.set(fileName, bytes);
    faces.push(rule.replace(source, `src:url("${fileName}") format("woff2")`));
    return "";
  });
  return { css, fontCss: faces.join(""), fonts };
}

/**
 * BaoCut: 恢复代码引用了 Base UI 未公开的子路径，以私有 #base-ui/ 前缀保留对应文件。
 * TypeScript paths 读取同一路径的原生声明；Vite 与下面两处 esbuild 从导入方逐级查找依赖，
 * 不依赖 src 的目录深度，也不经过包的 exports。
 */
function nodeModulesFile(source: string, importer: string): string | null {
  const prefix = source.startsWith("#base-ui/")
    ? "#base-ui/"
    : source.startsWith("#base-ui-utils/")
      ? "#base-ui-utils/"
      : null;
  if (prefix === null) return null;
  const rest = path.join(
    prefix === "#base-ui/" ? "@base-ui/react" : "@base-ui/utils",
    source.slice(prefix.length),
  );
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
    builder.onResolve({ filter: /^#base-ui(?:-utils)?\// }, (args) => {
      const file = nodeModulesFile(args.path, args.importer);
      return file ? { path: file } : undefined;
    });
  },
};

/**
 * BaoCut: 第二个参数是可选的。给了就把两处 esbuild 构建实际打进去的源文件（以及 KaTeX 样式文件）记进去，
 * apps/docs-editor 的许可插件据此找出这两份脚本文本里的第三方包（Vite 的模块图里只看得到它们的文本）。
 */
export function editorAssets(root: string, bundledInputs?: Set<string>): Plugin {
  const katex = katexAssets();
  const recordInputs = (result: { metafile?: { inputs: Record<string, unknown> } }) => {
    // 跳过插件命名空间里的输入（katex:katex-css 之类），其余是相对当前目录的文件路径
    for (const input of Object.keys(result.metafile?.inputs ?? {}))
      if (!/^[a-z][\w-]*:(?![\\/])/i.test(input)) bundledInputs?.add(path.resolve(input));
  };
  bundledInputs?.add(path.join(katexRoot, "dist", "katex.min.css"));
  const extrasId = "\0virtual:editor-extras-source";
  const cssId = "\0virtual:katex-css";
  const fontCssId = "\0virtual:katex-font-css";
  const runtimePath = "artifact-type/lfile-runtime.35524228.js";
  let runtimeBuild: Promise<string> | undefined;
  const runtimeSource = (): Promise<string> =>
    (runtimeBuild ??= build({
      entryPoints: [path.join(root, "prose-editor/runtime.tsx")],
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
        const url = (request.url ?? "").split("?")[0];
        const font = [...katex.fonts].find(([fileName]) => url.endsWith("/" + fileName));
        if (font) {
          response.setHeader("Content-Type", "font/woff2");
          response.end(font[1]);
          return;
        }
        if (!url.endsWith("/" + runtimePath))
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
      for (const [fileName, source] of katex.fonts)
        this.emitFile({ type: "asset", fileName, source });
      this.emitFile({
        type: "asset",
        fileName: runtimePath,
        source: await runtimeSource(),
      });
    },
    resolveId(id) {
      if (id === "virtual:editor-extras-source") return extrasId;
      if (id === "virtual:katex-css") return cssId;
      if (id === "virtual:katex-font-css") return fontCssId;
    },
    async load(id) {
      if (id === cssId)
        return `export default ${JSON.stringify(katex.css)};`;
      if (id === fontCssId)
        return `export default ${JSON.stringify(katex.fontCss)};`;
      if (id !== extrasId) return;
      const result = await build({
        entryPoints: [path.join(root, "prose-editor/extras.ts")],
        bundle: true,
        write: false,
        platform: "browser",
        format: "iife",
        // BaoCut: 压缩，理由同上；KaTeX 字体单独输出，不打进附加脚本。
        minify: true,
        target: "es2022",
        // BaoCut: metafile 给 recordInputs。
        metafile: true,
        plugins: [
          // BaoCut: 见 nodeModulesFile。
          esbuildNodeModulesPaths,
          {
            name: "katex-css",
            setup(builder) {
              builder.onResolve(
                { filter: /^virtual:katex-css$/ },
                () => ({ path: "katex-css", namespace: "katex" }),
              );
              builder.onLoad({ filter: /.*/, namespace: "katex" }, () => ({
                contents: `export default ${JSON.stringify(katex.css)}`,
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

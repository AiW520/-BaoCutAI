# docs-runtime

文档编辑器的运行时：文档应用（标签页、工具栏、批注、版本、侧栏）、编辑器 iframe 里的 ProseMirror 运行时（lfile 运行时）与编辑器附加脚本（KaTeX、表情）。源码按 1:1 移植自 Claude Docs 类型的 TypeScript 重建（`src/docs-type`），文件名与内容不改，只改 BaoCut 托管必需的部分，改动处带 `BaoCut:` 注释（见下）。`apps/docs-editor` 把它打成编辑器页面，接口与长连接的前缀由 `packages/docs` 的 `editor/install` 设好，页面背后的 Docs 服务也在 `packages/docs`。

## 结构

源码保持原工程的平铺布局：JSX 用包内自己的 `jsx-runtime.tsx`，`tsconfig.json` 的 `jsxImportSource` 是 `"."`，按每个文件所在目录解析 `./jsx-runtime`。重建代码按原工程的布局写 `./node_modules/@base-ui/react/…` 这样相对源码目录的深路径导入（不在包的 exports 里），`tools/asset-plugin.ts` 的 `nodeModulesPaths()` 从导入方往上找第一个有这个文件的 `node_modules`，Vite 与两处 esbuild 构建都用它。

类型：保留原工程的 `Dynamic`（即 `any`），用原工程的编译选项（不开 `noUncheckedIndexedAccess`，引入 `vite/client`）单独检查，根 `tsconfig.json` 排除本包与 `apps/docs-editor/src`。根 tsconfig 开着 `noFallthroughCasesInSwitch`，`docs-app.tsx` 里有一处 `case` 落进下一个 `case`（TS7029），改成显式做下一个 `case` 的事，行为不变。

| 路径 | 内容 |
| --- | --- |
| `main.ts`、`hello-early.ts`、`preload.ts`、`rolldown-runtime.ts` | 入口；最早执行的环境判断（`isFrameArtifact()`）、预热与模块预载 |
| `docs-app.tsx`、`platform-core.tsx`、`platform-lazy.tsx` | 文档应用、平台层（接口、长连接、批注存储、字体、上报）、按需加载的部分（版本对比、表格、导出） |
| `cds.tsx`、`react.tsx`、`jsx-runtime.tsx`、`jsx-dev-runtime.tsx` | 原平台的组件库；React 与 JSX 运行时 |
| `editor-runtime.tsx`、`editor-schema.ts`、`editor-extras.ts` | 编辑器 iframe 里的 ProseMirror 运行时（打成 `lfile-runtime.35524228.js`）、文档结构、KaTeX 与表情附加脚本 |
| `editor-runtime-source.ts`、`editor-extras-source.ts` | 两份脚本的文本：前者是空串（只在 Frame 里内联运行时，独立页面从接口取），后者由资源插件打进页面 |
| `right-rail.tsx`、`tabs-*.ts(x)`、`version-*.ts(x)`、`history-groups.ts`、`lfile-snapshot-view.tsx`、`diff-worker.ts` | 批注栏、标签页、版本历史与版本对比（Worker） |
| `claude-*.ts(x)`、`ask-*.ts`、`session-route-side.ts`、`page-skill-bulb.tsx` | 空行上 @Claude 提问、Claude 直接写文档、会话路由（BaoCut 不提供，见「不提供」） |
| `widget-*.tsx`、`model-workbook.ts`、`display-text-paths.ts`、`shiki-*.ts`、`markdown-renderer.tsx`、`chat-markdown.tsx`、`code-viewer.tsx` | 嵌入组件、数据表、代码高亮与 Markdown 渲染 |
| `type-models/`、`types.ts`、`globals.d.ts`、`assets.d.ts`、`host-protocol.ts` | 模块之间的协议类型与页面全局 |
| 其余 `.ts` / `.tsx` | 原包按需加载的分块（字体与版式控件、语言对话框、底部抽屉、动画、空白文档模板、表情数据等），一个文件对应原包的一个分块 |
| `docs-host.ts` | BaoCut 加的：宿主接口 `globalThis.docsHost` 的类型与读取（见下） |
| `public/assets/docs.css` | 原页面的样式表（与线上 `index-7E8lmnbp.css` 逐字节相同），原样拷进产物 |
| `public/artifact-type/lfile-spell-words.e258c731.txt` | 拼写检查词表，原样拷进产物（只在 Frame 里取，独立页面不取） |
| `tools/asset-plugin.ts` | 原工程的资源插件：用 esbuild 打 lfile 运行时与编辑器附加脚本，KaTeX 字体以 data URL 内嵌 |

原工程的 `thumbnail.html` / `thumbnail.ts`（托管平台生成文档缩略图用的页面）没有搬：BaoCut 不生成文档缩略图，Runtime 也不提供这个页面。

## 宿主与平台

代码里以 `BaoCut:` 注释标出，页面模板 `apps/docs-editor/index.html` 的改动写在它开头的注释里。原应用有上百处按 `isFrameArtifact()`（嵌进 claude.ai 的 Frame）切到 postMessage 通道，BaoCut 的页面不是 Frame，也不伪装成 Frame，下面每一处只放开一个具体的条件。

- **前缀与路由**：页面在 `/docs/<grant>/project/<文档 id>`，Runtime 注入 `<base href="/docs/<grant>/">`。`@baocut/docs/editor/install`（`apps/docs-editor/src/main.ts` 的第一个导入）在应用模块求值之前设好 `__BONGO_BASE__` / `__BONGO_WS_BASE__`；接口、长连接（`<前缀>/api/mux`）与 lfile 运行时（`<前缀>/api/lfile-runtime/35524228`）都带这个前缀，路由去掉前缀再匹配，这些原应用本来就支持，没有改。页面引用的资源（样式表、分块、图标字体、Worker）都是相对地址，靠 `<base>` 落在 `/docs/<grant>/` 下。
- **独立工具栏**（`docs-app.tsx`，三处）：原版只在 Frame 里显示文档工具栏（标签页、字体、版式、表格、图片、清单、插入菜单）。去掉 `useDocumentTabsUseSyncExternalStore` 的 frame 条件（手机宽度上仍然不显示）；独立分支的内容容器在有工具栏时加 `flex flex-col`，编辑器 iframe 才填满工具栏下方（否则只有 150px 高）；`emitFormatState` 去掉 Frame 条件，编辑器回报光标处的格式，工具栏按钮的可用与选中状态靠它。
- **批注发给智能体**（`docs-host.ts`、`platform-core.tsx`、`docs-app.tsx`）：原版只在 Frame 里经 `window.claude.comments` 把批注交给 Claude。BaoCut 的宿主在应用模块求值前装上 `globalThis.docsHost.comments`（`canSendToClaude()` 与 `sendToClaude({ anchor: { path, x, y }, text })`，类型与语义写在 `docs-host.ts`），装了时：
  - `platform-core.tsx` 里批注用的宿主改读 `docsHost`（Frame 里照原样读 `window.claude`）；看的人按成员处理（独立页面没有 Frame 的成员信息）；`frameRegisterCustomAnchors` 给一个空的锚点实现（应用只检查方法存在、卸载时调 `release()`）。
  - `docs-app.tsx` 的 `useCommentSessionBridge`、批注下方的发送状态、块定位（`knownBlocksRef` / `summonHostRef`）与批注框的「Send to agent」勾选，从 Frame 判断改成 `commentSummonHost()`（Frame，或独立页面装了 `docsHost.comments`）。
  - 宿主没装 `docsHost` 时与原版的独立页面相同：没有勾选，批注只存进文档。
  - 顺序：批注先经文档服务存进文档（door 的 create utterance），之后才调 `sendToClaude`，实测相隔约 20 ms。`anchor.path` 形如 `f-<标签页 id>#<正文节点 id>/<块 id>@<起>-<止>;thread=<批注 id>`；`text` 是去掉控制字符与格式字符后的批注正文，开头的 `@Claude ` 保留，例如 `@Claude please tighten this`。
- **文案**：批注发给智能体这条路上的状态、勾选、提示与智能体署名称「the agent」/「Agent」，键与判断不变（`platform-core.tsx` 的 `PlatformSessionAndSourcesSent` 等、`DataModelSchemasSendToClaude` 等，`docs-app.tsx` 的 `Sent to agent`、`Sends to agent`、`The agent is working on it…`、`Ask the agent…`，`cds.tsx` 里批注框勾选与智能体署名的默认文字）。`@Claude` 是批注里提及智能体的写法（提及项的标签与正文识别都按它），照原样保留。
- **字体**：不内置 Anthropic Sans / Serif / Mono 品牌字体（`platform-core.tsx` 的字体清单留空）。原版把品牌字体与图标字体用 `Promise.all` 一起取，缺一份整组作废、编辑器 iframe 连图标字体也没有；清单留空后只取图标字体，正文退回 `docs.css` 字体栈里的系统字体。图标字体按应用要的名字 `artifact-type/fonts/anthropicons-variable.e7f7e9ca44846912.woff2` 放进产物，文件是 `packages/slides-runtime/src/fonts/anthropicons-fizzy-lake.woff2`（`apps/docs-editor/vite.config.ts`）。
- **页面模板**：不装托管平台的健康上报脚本，不预载品牌字体，`appifact-capabilities` 只留 `comments`（应用本身不读这个 meta），不带写给托管平台的 README 注释与 meta，标题是 Docs。

## 重建代码的修正

与原版压缩代码对照后改回，带 `BaoCut: restorer fix` 注释：

- `platform-lazy.tsx` 的 `createDiffWorker`：重建代码照抄了原版构建产物里 Vite 改写后的地址 `new URL("diffWorker-Dnf0Jf6P.js", import.meta.url)`（原包里同目录的 Worker 分块）。这里的构建不产出这个文件，Worker 加载失败，版本对比退回主线程计算（构建时 Vite 也会警告）。改回源码的写法 `new Worker(new URL("./diff-worker.ts", import.meta.url), …)`，Vite 把 `diff-worker.ts`（就是从 `diffWorker-Dnf0Jf6P.js` 还原的）打成 `assets/diff-worker-*.js`（约 78 KB，原版 75 KB）。

## 不提供

下面这些要 claude.ai 的服务或 Frame，BaoCut 不提供，界面照原样保留。都是在 `/docs/<grant>/` 下实测看到的：

- **Ask Claude 对话**：左下角的「Ask Claude」按钮点了没有反应，也不发请求；选中文字后工具栏的「Ask Claude」只播报一句「Added to your message to Claude」，内容不去任何地方。
- **空行上 @Claude 提问**：编辑器 @ 菜单里没有「Ask Claude」一项（`docs-app.tsx` 里 `people` 回复的 Frame 条件）。只放开这一处与行内提问的 Frame 条件试过：卡片能出来，但按回车先要模型判断请求（`sample`，`claude-verdict.ts`）、再决定由 Claude 直接写还是转成批注，独立页面里卡片停住，既不存批注也不调 `sendToClaude`，所以照原样不提供。要找智能体，选中文字写批注（装了 `docsHost.comments` 时「Send to agent」默认勾选）。
- **Claude 直接写文档**（「Ask the agent to edit」之后的写作卡片、`claude-writing-*`、会话路由 `sendToClaudeSession`）：要宿主的 `room` 能力（Frame 里的 `window.claude`）。
- **分享**：「Share」按钮点了没有反应。
- **版本历史**：面板向 `<前缀>/api/v3/project/<id>/file/<文件>/history` 取数据。原始材料里只有客户端，没有这个接口的回应格式，BaoCut 的文档服务（`packages/docs/src/server.ts`）不提供它，回 404，面板显示这个错误。正文最近若干个 rev 的快照另存在 `tabs/<正文 id>.history.json`，只给智能体的 `atRev` / `sinceRev` 读与 `restore` 用。
- **品牌字体**：见上。**拼写词表**只在 Frame 里取，独立页面不取（产物里照原样有这个文件）。
- 项目菜单里的「Data sources」「Send feedback」「Copy support code」是平台功能，没有逐个试。

## 随包的第三方代码与资源

- 打进页面、lfile 运行时与编辑器附加脚本的 npm 包按实际打进的模块收集许可：Vite 的模块图加上资源插件记下的两处 esbuild 输入（`tools/asset-plugin.ts` 的 `editorAssets(root, bundledInputs)`），输出到产物的 `third-party-licenses.txt`（`apps/docs-editor/licenses.mjs`），见根目录 [`THIRD_PARTY_NOTICES.md`](../../THIRD_PARTY_NOTICES.md)「协作文档编辑器」。
- 图标字体（Anthropicons）不是仓库约定的 S2 图标（[仓库约定 §4](../../docs/repo-conventions.md#4-界面图标)），以后要换；它的分发许可也待确认。
- 依赖版本跟原工程对齐（`package.json` 钉住原工程的版本；`@base-ui/react` 1.7.0、`@tanstack/*` 等装在本包的 `node_modules`），与原工程安装结果不同的（用的是根目录 `node_modules` 里已有的版本）：React / ReactDOM 19.3.0（原 19.2.5）、`@tiptap/starter-kit` 嵌套的 `@tiptap/core` 等与 `@tiptap/pm` 3.32.0（原 3.31.4）、`marked` 18.1.1（原 18.1.0）、`mdast-util-from-markdown` 2.0.3（原 2.1.0）、`mdast-util-to-markdown` 2.1.3（原 2.2.0）；`use-sync-external-store` 本包装的是原版的 1.6.0，根目录的 `wouter`、`zustand` 引用根目录的 1.7.0，两份都打了进去。
- lfile 运行时照原工程的资源插件不压缩（`minify: false`），12.4 MB（12,433,053 字节；原版压缩过，4.9 MB）。

## 验证

```bash
node apps/docs-editor/build.mjs --force
```

```bash
npx tsc -p packages/docs-runtime/tsconfig.json --noEmit
```

改动后在 `/docs/<grant>/project/<id>` 下打开一篇文档，过一遍：图标与工具栏、输入后重新载入、选中文字加批注、装了 `docsHost.comments` 时批注框出现「Send to agent」并调到 `sendToClaude`。

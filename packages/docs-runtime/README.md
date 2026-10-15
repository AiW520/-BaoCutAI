# docs-runtime

文档编辑器的运行时：文档应用（标签页、工具栏、批注、版本、侧栏）、编辑器 iframe 里的 ProseMirror 运行时（lfile 运行时）与编辑器附加脚本（KaTeX、表情）。源码移植自 Claude Docs 类型的 TypeScript 重建，保留恢复出的行为与标识符；文档应用、组件库与平台核心按职责拆成模块，BaoCut 托管与模块组织的改动带 `BaoCut:` 注释（见下）。`apps/docs-editor` 把它打成编辑器页面，接口与长连接的前缀由 `packages/docs` 的 `editor/install` 设好，页面背后的 Docs 服务也在 `packages/docs`。

## 结构

源码按领域组织，`src/` 根目录只保留包入口 `main.ts`。文件名在所属目录内描述职责，去掉原先重复的 `docs-app-`、`platform-core-` 与 `cds-` 前缀。协议类型与实现放在同一领域，跨领域的 JSON 值和恢复代码互操作合同分别放在 `serialization/` 与 `interop/`。

| 路径（相对 `src/`） | 内容 |
| --- | --- |
| `main.ts`、`boot/` | 入口、最早执行的环境判断、Frame 握手、预热、模块预加载与活绑定支持 |
| `document-app/` | 应用入口、路由、文档命令与宿主状态；子目录包含评论组件、Frame、页面、交互桥、导航与标签栏 |
| `design-system/` | 设计 token 与 TSX 控件；菜单、抽屉、评论卡片分别成组 |
| `platform/` | 平台入口与依赖适配；`services/` 管理宿主、接口、认证与同步，`data/` 管理 schema 与操作引擎，`operations/` 管理控制器，`observability/` 管理遥测 |
| `prose-editor/` | iframe 运行时、schema、KaTeX 与表情附加脚本；`platform/` 放平台侧的编辑器扩展、节点视图、媒体、选区与表格 |
| `comments/` | 批注栏、发件箱、store 与动作工厂 |
| `document/`、`document-tabs/`、`document-history/` | 文档与格式合同、模板、标签树、版本历史、预览与 diff Worker |
| `assistant/` | 行内提问、写作与会话路由（BaoCut 不提供的能力见下） |
| `embedded-widgets/`、`markdown/`、`syntax-highlighting/` | 嵌入组件、数据表、Markdown 与代码高亮 |
| `host/`、`fonts/` | BaoCut 宿主合同、版本历史开关，以及父页面读取并传给 iframe 的字体 |
| `serialization/`、`interop/`、`ambient/` | 共享值合同、库的未公开导出合同与页面全局／虚拟资源声明 |

TSX 使用 React 标准自动 JSX runtime，不再包装 props 或扩展 JSX 的组件属性检查。应用直接从 `react-dom/client` 引入 `createRoot`；CSS 自定义属性的类型扩展位于 `ambient/react-styles.d.ts`，编辑器渲染边界的 props 位于 `prose-editor/render-boundaries.ts`。动态组件以及需要保持原始 key／children 调用语义的少数位置使用 React 原生元素工厂。恢复代码引用 Base UI 未公开的子路径时，用私有 `#base-ui/` 与 `#base-ui-utils/` 前缀；TypeScript `paths` 读取包内原生声明，`tools/asset-plugin.ts` 的 `nodeModulesPaths()` 在 Vite 与两处 esbuild 构建中解析相同文件。

### 初始化与模块边界

下文以 `document-app/`、`design-system/`、`platform/` 指代各自入口及实现模块组，具体定义可按函数名定位。

`document-app/index.ts`、`design-system/index.ts` 与 `platform/index.ts` 是各领域的具名入口。各入口先执行同目录 `initialize.ts`，再经 `exports.ts` 提供接口；实现模块直接引用所属模块，避免经入口重复触发初始化。npm 与本地依赖适配集中在各领域的 `dependencies.ts`。顶层状态、样式注册、`displayName`、预加载与 `createRoot().render()` 保留恢复代码的原始顺序。

源码模块统一使用语义化具名导出，同一模块内同一绑定只导出一次，不提供压缩产物的 `t`、`n`、`$A` 等短别名或重复的默认导出。静态导入、再导出和惰性加载选择器使用对应名称，例如 `preloadModule`、`createLiveModuleNamespace`、`module.VersionBar`。局部重命名只用于表达不同职责或避免冲突。大量同类资源使用有领域含义的命名空间，例如代码高亮通过 `import * as grammars from "./langs"` 读取 `grammars.typescriptGrammars`。删除未使用的导入项时，保留原模块的副作用导入及求值顺序。

外部依赖直接使用有意义的 default／named import，例如 `import scssGrammars from "@shikijs/langs/scss"`，避免先导入 `npmDependency48` 再读取 `.default` 的中间变量。确实需要整模块对象的加载器，以及类型声明缺失或与实际导出不一致的私有 API，保留具有领域名称的命名空间和明确的适配合同。

较大的子系统仍以数字后缀区分连续声明段。`initialize` 按原始语句顺序执行初始化与注册，避免循环依赖提前读取状态；新增顶层初始化须同步这个顺序，不从模块顶层提前执行其他子系统的逻辑。大型组件提取的回调保持原来的 hooks 顺序与调用条件。

`platform/operations/` 与 `comments/actions/` 中的模块工厂按实例创建，状态由原来的控制器或 store 持有。跨模块 context 以 getter／setter 读写活绑定，不复制可变状态快照。`comments/actions/store.ts` 保留 helper 的创建与动作组装顺序；控制器保留类字段、构造时序、`this` 与 prototype 描述符。维护这些模块时验证延迟回调、多实例隔离及初始化顺序。

### 类型与资源

本包与 `apps/docs-editor/src` 单独进行 strict 类型检查，保留原工程的 `noUncheckedIndexedAccess: false` 和 `vite/client`。依赖适配优先使用 npm 原生类型，业务合同在所属领域声明。`interop/legacy-dynamic.ts` 中的 `Dynamic = any` 仍用于尚未恢复的合同，当前源码尚未达到个位数目标；不能通过改名、取消检查或引入新的无约束类型来隐藏这些用量。

`tools/type-debt.mjs` 通过 TypeScript AST 统计 `Dynamic` 类型引用、显式 `any` 与无类型模块声明，排除导入名称、注释、字符串和 JSX 文案；该统计不等于对推导类型安全性的完整证明。带 `--check-target` 时要求前两项各不超过 9、无类型模块声明为 0，未达标返回非零。

`tools/asset-plugin.ts` 将 `prose-editor/runtime.tsx` 打成 `artifact-type/lfile-runtime.35524228.js`，将 `prose-editor/extras.ts` 打成附加脚本文本。KaTeX 的 WOFF2 独立输出为带内容哈希的本地资源，由 `fonts/katex-fonts.ts` 缓存并转为 data URL 传给 iframe。`runtime-source.ts` 仍为空串：Frame 内联运行时，独立页面从接口获取；`extras-source.ts` 由虚拟资源插件填充。

`public/assets/docs.css` 与 `public/artifact-type/lfile-spell-words.e258c731.txt` 原样分发。原工程的 `thumbnail.html`／`thumbnail.ts` 未移植，BaoCut 不提供文档缩略图。

## 宿主与平台

代码里以 `BaoCut:` 注释标出，页面模板 `apps/docs-editor/index.html` 的改动写在它开头的注释里。原应用有上百处按 `isFrameArtifact()`（嵌进 claude.ai 的 Frame）切到 postMessage 通道，BaoCut 的页面不是 Frame，也不伪装成 Frame，下面每一处只放开一个具体的条件。

- **前缀与路由**：页面在 `/docs/<grant>/project/<文档 id>`，Runtime 注入 `<base href="/docs/<grant>/">`。`@baocut/docs/editor/install`（`apps/docs-editor/src/main.ts` 的第一个导入）在应用模块求值之前设好 `__BONGO_BASE__` / `__BONGO_WS_BASE__`；接口、长连接（`<前缀>/api/mux`）与 lfile 运行时（`<前缀>/api/lfile-runtime/35524228`）都带这个前缀，路由去掉前缀再匹配，这些原应用本来就支持，没有改。页面引用的资源（样式表、分块、图标字体、Worker）都是相对地址，靠 `<base>` 落在 `/docs/<grant>/` 下。
- **独立工具栏**（`document-app/`，三处）：原版只在 Frame 里显示文档工具栏（标签页、字体、版式、表格、图片、清单、插入菜单）。去掉 `useDocumentTabsUseSyncExternalStore` 的 frame 条件（手机宽度上仍然不显示）；独立分支的内容容器在有工具栏时加 `flex flex-col`，编辑器 iframe 才填满工具栏下方（否则只有 150px 高）；`emitFormatState` 去掉 Frame 条件，编辑器回报光标处的格式，工具栏按钮的可用与选中状态靠它。
- **批注发给智能体**（`host/docs-host.ts`、`platform/index.ts`、`document-app/index.ts`）：原版只在 Frame 里经 `window.claude.comments` 把批注交给 Claude。BaoCut 的宿主在应用模块求值前装上 `globalThis.docsHost.comments`（`canSendToClaude()` 与 `sendToClaude({ anchor: { path, x, y }, text })`，类型与语义写在 `host/docs-host.ts`），装了时：
  - `platform/` 里批注用的宿主改读 `docsHost`（Frame 里照原样读 `window.claude`）；看的人按成员处理（独立页面没有 Frame 的成员信息）；`frameRegisterCustomAnchors` 给一个空的锚点实现（应用只检查方法存在、卸载时调 `release()`）。
  - `document-app/` 的 `useCommentSessionBridge`、批注下方的发送状态、块定位（`knownBlocksRef` / `summonHostRef`）与批注框的「Send to agent」勾选，从 Frame 判断改成 `commentSummonHost()`（Frame，或独立页面装了 `docsHost.comments`）。
  - 宿主没装 `docsHost` 时与原版的独立页面相同：没有勾选，批注只存进文档。
  - 顺序：批注先经文档服务存进文档（door 的 create utterance），之后才调 `sendToClaude`，实测相隔约 20 ms。`anchor.path` 形如 `f-<标签页 id>#<正文节点 id>/<块 id>@<起>-<止>;thread=<批注 id>`；`text` 是去掉控制字符与格式字符后的批注正文，开头的 `@Agent ` 保留，例如 `@Agent please tighten this`（以前的文档里是 `@Claude`）。
- **Ask Agent**（`document-app/index.ts`、`host/docs-host.ts`）：原版的两个入口都通向 claude.ai 的对话栏，独立页面里点了没有可见的反应（左下角按钮只打开一块空白浮层，挡住左下角；工具栏按钮只播报一句）。
  - 选中文字后工具栏的「Ask Agent」（`ask-claude` 手势）：独立页面装了 `docsHost.comments` 时照 Frame 的做法发 `comment-key`，打开这处选区的批注框，这条批注当作问智能体的（`ask`），默认发给智能体；批注发不出去（页面单独打开、没有会话，或只读）时提示「Ask Agent isn't available here」。
  - 左下角的「Ask Agent」（`ChatPill`）：宿主装了 `globalThis.docsHost.chat`（`focus()`，BaoCut 的 iframe 里才装）时点了交给宿主，BaoCut 把焦点交给这个会话的输入框（`editor:focus-chat`）；装了 `comments` 没有 `chat`（页面单独打开）时不显示。两种情况都不再打开原版的对话浮层。
- **版本历史**（`host/docs-host.ts` 的 `versionHistoryOffered()`、`document-app/`，三处）：原版的独立页面总是开着版本历史（`platform/` 的 `resolvePlatformLiveDocumentAndHistoryValue36` 在 Frame 外直接放行），面板要的接口 BaoCut 不提供（见「不提供」）。独立页面不开，Frame 里照原样：`FilmedProsePage` 的 `historyRoad` 加上这个条件，版本面板与版本预览都不出来，记在本地的「面板开着」（`bongo.settings.historyRailOpen`）也不起作用；顶栏不显示 History 按钮（`HistoryRailToggle`）；`?chrome=embed` 布局给 `HeaderPath` 的 `historyOffered` 加上这个条件，项目菜单不列「Version history」（BaoCut 不用这个布局）。命令面板的「Version history」与历史面板的快捷键另看 `versionHistoryV2` 开关（默认关），BaoCut 里本来就没有。
- **本页新建的批注收后续回复**（`platform/` 的 `seatDoorList`）：原版的 `room:project/<id>` 同步评论（`utterance/<id>`），批注栏接上 fold 之后，本页新建的批注由 fold 接管，智能体的回复经 fold 到达。BaoCut 的 room 只同步标签栏与下拉选项，评论走 door 读回的列表；原版在 fold 接上时只拿列表补 fold 里没有、本地也没有的批注，本页新建的那条一直是本地那份，智能体的回复要重开编辑器才看得到（服务端的推送与编辑器重读都正常）。改成：门里列表的批注只要不在 fold 里，就顶替本地同 id 的那份，与门里来的批注同样处理；没送达的本地改动照原样由发件箱补回。
- **文案**：批注发给智能体这条路上的状态、勾选、提示与智能体署名称「the agent」/「Agent」，键与判断不变（`platform/` 的 `PlatformSessionAndSourcesSent` 等、`DataModelSchemasSendToClaude` 等，`document-app/` 的 `Sent to agent`、`Sends to agent`、`The agent is working on it…`、`Ask the agent…`，`design-system/` 里批注框勾选与智能体署名的默认文字）。「Ask Claude」一类的按钮、提示、标题与播报改称「Ask Agent」/「ask the agent」（工具栏按钮与它的三种提示、左下角按钮、行内提问卡片、`@` 菜单的分组名、空文档的占位语「Start typing, or ask the agent to…」——`prose-editor/runtime.tsx` 按「ask the agent」切开它做链接，`platform/` 的 `EditorHostMessage12` 与它保持同一句）。批注里提及智能体写作「@Agent」：提及项的 id 仍是 `claude`（发给智能体按 id 判断），只把标签从 Claude 换成 Agent（`platform/` 的 `PlatformApiAndAuthLabel`、`DataModelSchemasLabel3`，`design-system/index.ts` 批注框开头的徽标），提到这个写法的提示一并改；按正文识别提及的几处（`platform/` 的 `platformSessionAndSourcesPattern3`，`document-app/` 的 `isEmptyClaudeRequest`，`assistant/session-run.ts`、`assistant/ask-card.ts`，`packages/docs` 的 `door.ts` 与 `editor/host.ts`）同时认 `@Agent` 与以前的 `@Claude`，旧文档里的批注照样发得出去。智能体改文档时露出来的名字也一样：光标旗子与在线头像上的名字（`platform/` 的 `PlatformApiAndAuthColor`、`prose-editor/runtime.tsx` 的 `RenderedCodeAndProofreadingColor`，以及没报名字的智能体）、「正在改这篇文档」的播报、新加标签页的提示、改写了正在打字的段落的提示、批注里智能体正在回复时的署名与「The agent is working on it…」、智能体头像的无障碍名称、表情回应名单、「Resolved by the agent」与「via the agent」，还有文档还在建、空标签页的提示；连不上与编辑器更新后的提示不提 Claude Docs，只说 Docs。这些都只是显示的文字，没有别处按它判断。BaoCut 用不到的部分（正文里的行内提问：`@claude` 触发、正文提及的标签与行内提问卡片；版本历史；skill、widget、图表、登录、分享、Google Drive、校对）文案照旧。存下的批注正文照原样是纯文字，旧批注仍显示 `@Claude`；给模型看的提示词（`document-app/` 的 `S7`、`DocumentCommandsState2` 等）不改；智能体头像与工具栏按钮的星形图标来自图标字体，见「随包的第三方代码与资源」。
- **字体**：不内置 Anthropic Sans / Serif / Mono 品牌字体（`platform/` 的字体清单留空）。原版把品牌字体与图标字体用 `Promise.all` 一起取，缺一份整组作废、编辑器 iframe 连图标字体也没有；清单留空后只取图标字体，正文退回 `docs.css` 字体栈里的系统字体。图标字体按应用要的名字 `artifact-type/fonts/anthropicons-variable.e7f7e9ca44846912.woff2` 放进产物，文件是 `packages/slides-runtime/src/fonts/anthropicons-fizzy-lake.woff2`（`apps/docs-editor/vite.config.ts`）。
- **KaTeX 字体**：只分发 npm 包的 20 份 WOFF2（共 259,792 字节），输出到 `artifact-type/fonts/katex-<字体名>-<内容哈希>.woff2`，不打进附加脚本。父页面按 `document.baseURI` 读取 grant 下的本地文件，同一页面内合并并发请求、缓存成功结果；失败的字体可在下次调用时重试。字体转为 data URL 的 `@font-face` 样式，通过既有 `loadFonts` 消息与正文／图标字体一并交给 iframe（冷启动 `all` 或预热帧 `first`，`rest` 不重复传）。附加脚本只保留 KaTeX 排版 CSS。iframe 保持原有 sandbox 与 CSP；网关和 Web 共用同一份资源与加载流程。
- **页面模板**：不装托管平台的健康上报脚本，不预载品牌字体，`appifact-capabilities` 只留 `comments`（应用本身不读这个 meta），不带写给托管平台的 README 注释与 meta，标题是 Docs。

## 重建代码的修正

与原版压缩代码对照后改回，带 `BaoCut: restorer fix` 注释：

- `platform/lazy.tsx` 的 `createDiffWorker`：重建代码照抄了原版构建产物里 Vite 改写后的地址 `new URL("diffWorker-Dnf0Jf6P.js", import.meta.url)`（原包里同目录的 Worker 分块）。这里的构建不产出这个文件，Worker 加载失败，版本对比退回主线程计算（构建时 Vite 也会警告）。改回源码的写法 `new Worker(new URL("../document-history/diff-worker.ts", import.meta.url), …)`，Vite 把 `document-history/diff-worker.ts`（就是从 `diffWorker-Dnf0Jf6P.js` 还原的）打成 `assets/diff-worker-*.js`（约 78 KB，原版 75 KB）。

## 不提供

下面这些要 claude.ai 的服务或 Frame，BaoCut 不提供，界面照原样保留。都是在 `/docs/<grant>/` 下实测看到的：

- **文档里的对话栏**：原版左下角按钮与工具栏的提问打开 claude.ai 的对话栏，BaoCut 不提供；两个入口改走批注框与 BaoCut 会话的输入框，见「宿主与平台」的「Ask Agent」。
- **空行上 @Claude 提问**：编辑器 @ 菜单里没有「Ask Agent」一项（`document-app/` 里 `people` 回复的 Frame 条件）。只放开这一处与行内提问的 Frame 条件试过：卡片能出来，但按回车先要模型判断请求（`sample`，`assistant/verdict.ts`）、再决定由 Claude 直接写还是转成批注，独立页面里卡片停住，既不存批注也不调 `sendToClaude`，所以照原样不提供。要找智能体，选中文字写批注（装了 `docsHost.comments` 时「Send to agent」默认勾选）。
- **Claude 直接写文档**（「Ask the agent to edit」之后的写作卡片、`assistant/writing-*`、会话路由 `sendToClaudeSession`）：要宿主的 `room` 能力（Frame 里的 `window.claude`）。
- **分享**：「Share」按钮点了没有反应。
- **版本历史**：面板向 `<前缀>/api/v3/project/<id>/file/<文件>/history` 取版本列表、向 `…/at/<rev>` 取这一版与上一版渲染好的 HTML、向 `…/restore/<rev>` 还原。原始材料里只有客户端，没有这些接口的回应格式，BaoCut 的文档服务（`packages/docs/src/server.ts`）不提供。以前点顶栏的 History 时面板只显示接口的 404，还把编辑器挤成几个字宽；现在独立页面不显示 History 按钮与面板（见「宿主与平台」的「版本历史」）。正文最近若干个 rev 的快照另存在 `tabs/<正文 id>.history.json`，只给智能体的 `atRev` / `sinceRev` 读与 `restore` 用。
- **品牌字体**：见上。**拼写词表**只在 Frame 里取，独立页面不取（产物里照原样有这个文件）。
- 项目菜单里的「Data sources」「Send feedback」「Copy support code」是平台功能，没有逐个试。

## 随包的第三方代码与资源

- 打进页面、lfile 运行时与编辑器附加脚本的 npm 包按实际打进的模块收集许可：Vite 的模块图加上资源插件记下的两处 esbuild 输入（`tools/asset-plugin.ts` 的 `editorAssets(root, bundledInputs)`），输出到产物的 `third-party-licenses.txt`（`apps/docs-editor/licenses.mjs`），见根目录 [`THIRD_PARTY_NOTICES.md`](../../THIRD_PARTY_NOTICES.md)「协作文档编辑器」。
- 图标字体（Anthropicons）不是仓库约定的 S2 图标（[仓库约定 §4](../../docs/repo-conventions.md#4-界面图标)），以后要换；它的分发许可也待确认。
- 依赖版本跟原工程对齐（`package.json` 钉住原工程的版本；`@base-ui/react` 1.7.0、`@tanstack/*` 等装在本包的 `node_modules`），与原工程安装结果不同的（用的是根目录 `node_modules` 里已有的版本）：React / ReactDOM 19.3.0（原 19.2.5）、`@tiptap/starter-kit` 嵌套的 `@tiptap/core` 等与 `@tiptap/pm` 3.32.0（原 3.31.4）、`marked` 18.1.1（原 18.1.0）、`mdast-util-from-markdown` 2.0.3（原 2.1.0）、`mdast-util-to-markdown` 2.1.3（原 2.2.0）；`use-sync-external-store` 本包装的是原版的 1.6.0，根目录的 `wouter`、`zustand` 引用根目录的 1.7.0，两份都打了进去。
- lfile 运行时与编辑器附加脚本都压缩（`tools/asset-plugin.ts` 的 `minify: true`，带 `BaoCut:` 注释）。原工程的资源插件不压缩，原版的产物是压缩过的（4.9 MB）。运行时从约 12.4 MB 降到约 5.2 MB（5,154,387 字节）；附加脚本的字体分发方式见「KaTeX 字体」，避免字体二进制参与 JS 下载、解析与求值。

## 验证

```bash
node apps/docs-editor/build.mjs --force
```

```bash
npm run typecheck
node packages/docs-runtime/tools/type-debt.mjs
# 完成类型目标时此检查应通过；当前会如实报告未达标
node packages/docs-runtime/tools/type-debt.mjs --check-target
```

改动后在 `/docs/<grant>/project/<id>` 下打开一篇文档，过一遍：图标与工具栏（顶栏没有 History 按钮）、输入后重新载入、选中文字加批注、装了 `docsHost.comments` 时批注框出现「Send to agent」并调到 `sendToClaude`。在 BaoCut 的文档标签里再过一遍：选中文字点工具栏的「Ask Agent」出批注框、加进会话草稿；左下角的「Ask Agent」把焦点交给会话的输入框。

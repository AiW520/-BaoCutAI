# apps/portal

BaoCut 官网 [baocut.com](https://baocut.com)：一个静态单页（英文在 `/`，简体中文在 `/zh-hans/`），由 Cloudflare Worker 托管。Worker 负责首页按语言跳转、把页面里的版本号换成最新已验证版本、把 `/download/*` 跳到 GitHub Releases 上对应的安装包。

它与桌面应用无关：不进 workspace 之外的任何构建，也不被别的包引用。

## 目录

| 路径 | 作用 |
| --- | --- |
| `src/site/site-copy.ts` | 英文文案与 `SiteCopy` 类型；产品说法以根 README 为准 |
| `src/site/site-copy.zh-Hans.ts` | 简体中文文案，`import type` 英文类型，缺键、多键都是类型错误 |
| `src/site/page.ts` | 页面 HTML（`renderPage`、`renderNotFound`） |
| `src/site/site.css`、`client.ts` | 样式与浏览器脚本；脚本只做增强，没有它页面照样能读、能下载 |
| `src/site/build.ts` | 生成 `dist/`（见文件头注释） |
| `src/release.ts` | 读桌面端更新源、推出各安装包的下载地址，构建与 Worker 共用 |
| `src/worker.ts` | Worker 入口 |
| `screenshots/` | 页面用的应用截图，命名 `<名字>[.<语言>]-<宽>x<高>.webp`，名字见 `page.ts` 的 `SHOT_NAMES`（`editor`、`translate`、`space`、`home`、`models`） |
| `public/` | 原样复制的文件：图标、分享图 `og.png`（英文，其他语言缺省用它）与 `og.zh-hans.png`，1200×630 |
| `wrangler.jsonc` | Worker 名 `baocut-portal`、静态资源与自定义域名 |

## 运行与构建

```bash
npm run build -w @baocut/portal   # 只生成 dist/
npm run dev -w @baocut/portal     # 生成后用 wrangler dev 起本地 Worker（默认 http://localhost:8787）
```

`.claude/launch.json` 里的 `portal` 配置做的就是第二条。wrangler 用 `npx` 按固定版本临时取，不进 lockfile。

## 部署

```bash
npx --yes wrangler@4.144.0 login     # 第一次
npm run deploy -w @baocut/portal
```

部署会创建或更新 Worker `baocut-portal`，并把 `baocut.com`、`www.baocut.com` 绑成它的自定义域名（`www` 由 Worker 301 到不带 `www` 的地址）。不需要 D1、R2 或 KV。

同一个 Cloudflare 账号里的 `baocut-site`（baocut.app：遥测、下载与更新源）、`baocut-cdn`、`baocut-release-pointers`、R2 `baocut-downloads` 与 D1 `baocut-analytics` 和官网无关，不要改它们，也不要把官网部署成这些名字。

## 下载地址从哪来

- 最新版本以桌面端自动更新读的更新源为准：`apps/desktop/releases/*.json` 在 `main` 上的版本（`raw.githubusercontent.com`），四个平台各一份。只有通过发布验收、钉进这里的版本才会出现在官网上；GitHub 上标成 Latest 的 Release 不一定是它。
- `release.ts` 校验更新源里的地址属于本仓库、标签与文件名和版本号一致，再按固定后缀推出 DMG、ZIP、安装程序等全部地址。
- Worker 每 5 分钟最多取一次更新源，边缘再缓存 5 分钟；取不到时用构建时写进 `dist/release.json` 的快照。页面里的版本号先按快照写好，Worker 再改写成最新的，所以发版后不用重新部署。
- `/api/release` 返回最新版本与各下载地址的 JSON。

## 截图与模板预览

- 截图是真实的应用界面：用一次性的 Runtime 加 Web 客户端（与用户自己的 Runtime 隔离），项目里只放 BaoCut 模板的预览视频，再用无头 Chrome 以 2 倍像素比截取，转成 WebP（`cwebp -q 82`，每张出 1400 与 2800 两个宽度）。不要放第三方视频、真人画面或别人的作品。
- 截图里的标题栏要和 macOS 桌面版一样：Web 客户端没有红绿灯，截之前在页面里把标题栏左边距改成桌面版的 84px，并在左上角画出红黄绿三个按钮；网站不再另外套一层窗口标题栏。
- 某种语言要用自己的截图时，加 `<名字>.<语言小写>-…webp`（如 `editor.zh-hans-1400x875.webp`）；没有就用不带语言的那组。
- 模板展示直接取仓库 `templates/` 里带预览的模板（封面与预览都是 BaoCut 导出的成片），顺序见 `build.ts` 的 `SHOWCASE_ORDER`，标题与简介按页面语言取模板自己的译文。

## 语言

英文是缺省语言。简体中文浏览器（`Accept-Language` 权重最高的是 `zh`、`zh-Hans`、`zh-CN`、`zh-SG`、`zh-MY`）第一次打开 `/` 时跳到 `/zh-hans/`；语言切换链接带 `?lang=`，Worker 把选择记进 `baocut_lang` cookie，之后照选的来。爬虫不跳。

新增一种语言：写 `src/site/site-copy.<语言>.ts`，加进 `build.ts` 的 `LOCALES`，在 `wrangler.jsonc` 的 `run_worker_first` 加上它的路径，并在 `worker.ts` 的 `LANGUAGES` 与跳转规则里登记。

## 验证

```bash
npx vitest run apps/portal
npm run typecheck
```

改页面后在 `npm run dev -w @baocut/portal` 起的本地 Worker 里看桌面与手机宽度，并核对 `/`、`/zh-hans/`、`/download/<下载项>`、`/api/release` 的跳转与返回。

/**
 * 官网单页的 HTML。build.ts 为每种语言调用一次 renderPage，写成 dist/ 里的静态文件。
 * 版本号、日期与发布说明链接先按构建时的快照写好，并用 `data-release` 标注，部署后由 Worker 换成 GitHub Releases 上的最新版本（见 worker.ts）。
 * 文案来自 SiteCopy：字段名以 `Html` 结尾的原样输出，其余一律经 esc() 转义。
 */

import {
  RELEASES_URL,
  REPOSITORY_URL,
  formatReleaseDate,
  headlineRelease,
  releasePageUrl,
  type DownloadId,
  type FeedId,
  type FeedRelease,
  type ReleaseSet,
} from '../release.ts';
import { githubMark, icon, type IconName } from './icons.ts';
import type { SiteCopy } from './site-copy.ts';

export const SHOT_NAMES = ['editor', 'translate', 'space', 'home', 'models'] as const;
export type ShotName = (typeof SHOT_NAMES)[number];

/** 一张截图的多个尺寸：`src` 是缺省的那张，`srcset` 按宽度列出全部。 */
export interface Picture {
  src: string;
  srcset: string;
  width: number;
  height: number;
}

/** 模板展示里的一项，文字已按页面语言取好。 */
export interface ShowcaseItem {
  id: string;
  kind: 'scene' | 'example';
  title: string;
  summary: string;
  ratio: string | null;
  durationSeconds: number | null;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  preview: string;
}

export interface PageInput {
  copy: SiteCopy;
  /** 全部语言，用来写 hreflang 与语言切换。第一项是缺省语言。 */
  locales: readonly SiteCopy[];
  /** 站点的规范来源，例如 `https://baocut.com`。 */
  origin: string;
  /** 构建时的版本快照。 */
  releases: ReleaseSet;
  showcase: readonly ShowcaseItem[];
  assets: { css: string; js: string };
  shots: Partial<Record<ShotName, Picture>>;
  ogImage: { src: string; width: number; height: number };
}

/** 能驱动 BaoCut 的智能体引擎，按 README 的说法排列；前两个经过端到端验证。 */
const AGENTS = [
  'Claude Code',
  'Codex CLI',
  'GitHub Copilot CLI',
  'Gemini CLI',
  'Cursor Agent',
  'OpenCode',
  'Pi',
  'Kimi Code',
  'Grok',
] as const;
const VALIDATED_AGENTS = 2;

/** 在线服务提供方，与 README「Bring your own models」一段一致。 */
const PROVIDERS = [
  'OpenAI',
  'Anthropic',
  'Google',
  'ElevenLabs',
  'DeepSeek',
  'Moonshot',
  'Qwen',
  'Zhipu',
  'MiniMax',
  'Volcengine',
  'xAI',
  'Mistral',
  'Groq',
  'OpenRouter',
  'SiliconFlow',
] as const;

const PRINCIPLE_ICONS: IconName[] = ['layers', 'scope', 'handoff', 'shield', 'receipt'];
const CAPABILITY_ICONS: IconName[][] = [
  ['waveform', 'captions', 'mic', 'scissors', 'chapters'],
  ['sparkles', 'narration', 'code', 'image'],
  ['export', 'package'],
];
const SURFACE_ICONS: IconName[] = ['monitor', 'terminal', 'plug', 'globe'];
const SCENE_ICONS: IconName[] = ['waveform', 'globe', 'captions', 'scope', 'export'];

/** 每个下载卡片的安装包与免安装包。 */
const PLATFORM_DOWNLOADS: Record<FeedId, { installer: DownloadId; portable: DownloadId }> = {
  mac: { installer: 'mac-dmg', portable: 'mac-zip' },
  win: { installer: 'win-setup', portable: 'win-zip' },
  'win-cuda': { installer: 'win-cuda-setup', portable: 'win-cuda-zip' },
  'win-vulkan': { installer: 'win-vulkan-setup', portable: 'win-vulkan-zip' },
};

export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function attrs(values: Record<string, string | number | boolean | null | undefined>): string {
  let out = '';
  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined || value === false) continue;
    out += value === true ? ` ${key}` : ` ${key}="${esc(String(value))}"`;
  }
  return out;
}

function ogLocale(copy: SiteCopy): string {
  return copy.dateLocale.replace('-', '_');
}

function sectionHead(kicker: string, title: string, lead?: string, id?: string): string {
  return `<header class="section-head" data-reveal>
<p class="kicker">${esc(kicker)}</p>
<h2${attrs({ id })}>${esc(title)}</h2>${lead ? `\n<p class="lead">${esc(lead)}</p>` : ''}
</header>`;
}

function picture(shot: Picture | undefined, alt: string, sizes: string, eager = false): string {
  if (!shot) return '';
  return `<img${attrs({
    src: shot.src,
    srcset: shot.srcset,
    sizes,
    width: shot.width,
    height: shot.height,
    alt,
    loading: eager ? 'eager' : 'lazy',
    fetchpriority: eager ? 'high' : null,
    decoding: 'async',
  })}>`;
}

function releaseField(
  release: FeedRelease | null,
  field: 'version' | 'build',
  feed?: FeedId,
): string {
  const value = release ? String(release[field]) : '';
  return `<span${attrs({ 'data-release': field, 'data-release-feed': feed })}>${esc(value)}</span>`;
}

function releaseDate(release: FeedRelease | null, locale: string): string {
  if (!release) return `<time data-release="date"${attrs({ 'data-locale': locale })}></time>`;
  return `<time${attrs({ 'data-release': 'date', 'data-locale': locale, datetime: release.date })}>${esc(
    formatReleaseDate(release.date, locale),
  )}</time>`;
}

function notesHref(release: FeedRelease | null): string {
  return release ? releasePageUrl(release) : RELEASES_URL;
}

function head(input: PageInput): string {
  const { copy, locales, origin, assets, ogImage, shots } = input;
  const url = `${origin}${copy.path}`;
  const defaultLocale = locales[0] ?? copy;
  const alternates = locales
    .map((locale) => `<link rel="alternate"${attrs({ hreflang: locale.lang, href: `${origin}${locale.path}` })}>`)
    .join('\n');
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BaoCut',
    url,
    description: copy.meta.description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'macOS, Windows',
    downloadUrl: `${origin}/download`,
    image: `${origin}${ogImage.src}`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Jim Liu' },
    sameAs: [REPOSITORY_URL],
    inLanguage: copy.lang,
  };
  const hero = shots.editor;
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(copy.meta.title)}</title>
<meta name="description"${attrs({ content: copy.meta.description })}>
<link rel="canonical"${attrs({ href: url })}>
${alternates}
<link rel="alternate"${attrs({ hreflang: 'x-default', href: `${origin}${defaultLocale.path}` })}>
<meta name="theme-color" content="#0b0b10">
<meta name="color-scheme" content="dark">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="BaoCut">
<meta property="og:title"${attrs({ content: copy.meta.title })}>
<meta property="og:description"${attrs({ content: copy.meta.description })}>
<meta property="og:url"${attrs({ content: url })}>
<meta property="og:locale"${attrs({ content: ogLocale(copy) })}>
${locales
  .filter((locale) => locale !== copy)
  .map((locale) => `<meta property="og:locale:alternate"${attrs({ content: ogLocale(locale) })}>`)
  .join('\n')}
<meta property="og:image"${attrs({ content: `${origin}${ogImage.src}` })}>
<meta property="og:image:width"${attrs({ content: ogImage.width })}>
<meta property="og:image:height"${attrs({ content: ogImage.height })}>
<meta property="og:image:alt"${attrs({ content: copy.meta.ogImageAlt })}>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title"${attrs({ content: copy.meta.title })}>
<meta name="twitter:description"${attrs({ content: copy.meta.description })}>
<meta name="twitter:image"${attrs({ content: `${origin}${ogImage.src}` })}>
${hero ? `<link rel="preload" as="image"${attrs({ href: hero.src, imagesrcset: hero.srcset, imagesizes: HERO_SIZES, fetchpriority: 'high' })}>\n` : ''}<link rel="stylesheet"${attrs({ href: assets.css })}>
<script${attrs({ type: 'module', src: assets.js })}></script>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>`;
}

const HERO_SIZES = '(min-width: 1240px) 1160px, calc(100vw - 32px)';
const ROW_SIZES = '(min-width: 1240px) 680px, (min-width: 900px) 56vw, calc(100vw - 32px)';

function languageSwitch(copy: SiteCopy, locales: readonly SiteCopy[], className: string): string {
  const others = locales.filter((locale) => locale !== copy);
  return others
    .map(
      (locale) =>
        `<a class="${className}"${attrs({
          // 带上 ?lang=，Worker 记住这次选择，之后打开 `/` 不再按浏览器语言跳转。
          href: `${locale.path}?lang=${locale.lang.toLowerCase()}`,
          hreflang: locale.lang,
          lang: locale.lang,
          'aria-label': `${copy.nav.language}: ${locale.languageName}`,
        })}>${icon('globe')}<span>${esc(locale.languageName)}</span></a>`,
    )
    .join('');
}

function nav(copy: SiteCopy, locales: readonly SiteCopy[]): string {
  const n = copy.nav;
  return `<header class="nav" data-nav>
<div class="wrap nav-inner">
<a class="brand"${attrs({ href: copy.path })}><img src="/favicon.svg" width="28" height="28" alt=""><span>BaoCut</span></a>
<nav class="nav-menu" id="nav-menu"${attrs({ 'aria-label': n.menu })}>
<a href="#features">${esc(n.features)}</a>
<a href="#showcase">${esc(n.showcase)}</a>
<a href="#how">${esc(n.howItWorks)}</a>
<a href="#download">${esc(n.download)}</a>
${languageSwitch(copy, locales, 'nav-lang')}
<a class="nav-github"${attrs({ href: REPOSITORY_URL, rel: 'noopener' })}>${githubMark}<span>${esc(n.github)}</span></a>
</nav>
<div class="nav-actions">
<a class="btn btn-primary btn-sm" href="#download">${icon('download')}<span>${esc(n.download)}</span></a>
<button class="nav-toggle" type="button" aria-controls="nav-menu" aria-expanded="false"${attrs({ 'aria-label': n.menu })}>${icon('menu', 'icon icon-open')}${icon('close', 'icon icon-close')}</button>
</div>
</div>
</header>`;
}

function hero(input: PageInput, release: FeedRelease | null): string {
  const { copy, shots } = input;
  const h = copy.hero;
  return `<section class="hero" aria-labelledby="hero-title">
<div class="hero-glow" aria-hidden="true"></div>
<div class="wrap hero-inner">
<a class="pill" data-release="notes"${attrs({ href: notesHref(release), rel: 'noopener' })}><span class="pill-tag">${esc(h.badge)}</span><span class="pill-version">BaoCut ${releaseField(release, 'version')}</span><span class="pill-link">${esc(h.badgeLink)}${icon('arrowRight')}</span></a>
<h1 class="hero-title" id="hero-title"><span>${esc(h.title[0])}</span> <span class="accent">${esc(h.title[1])}</span></h1>
<p class="hero-lead">${esc(h.lead)}</p>
<div class="hero-cta">
<a class="btn btn-primary btn-lg" href="#download" data-download${attrs({
    'data-label-mac': h.downloadMac,
    'data-label-win': h.downloadWindows,
  })}>${icon('download')}<span>${esc(h.downloadOther)}</span></a>
<a class="btn btn-ghost btn-lg"${attrs({ href: REPOSITORY_URL, rel: 'noopener' })}>${githubMark}<span>${esc(h.github)}</span></a>
</div>
<p class="hero-meta">${esc(h.platformsLine)}</p>
</div>
<div class="wrap hero-stage">
<figure class="hero-shot" data-reveal>
<div class="window">
${picture(shots.editor, h.shotAlt, HERO_SIZES, true)}
</div>
<div class="float float-prompt" aria-hidden="true">
<span class="float-label">${esc(h.promptLabel)}</span>
<p>${esc(h.prompt)}</p>
</div>
<div class="float float-receipt" aria-hidden="true">
<span class="float-label">${icon('check')}${esc(h.receiptLabel)}</span>
<p>${esc(h.receipt)}</p>
</div>
</figure>
</div>
</section>`;
}

function agents(copy: SiteCopy): string {
  return `<section class="agents" aria-labelledby="agents-title">
<div class="wrap" data-reveal>
<p class="agents-label" id="agents-title">${esc(copy.agents.label)}</p>
<ul class="agents-list">
${AGENTS.map((name, index) => `<li${index < VALIDATED_AGENTS ? ' class="is-validated"' : ''}>${esc(name)}</li>`).join('\n')}
</ul>
<p class="agents-note">${esc(copy.agents.note)}</p>
</div>
</section>`;
}

/** 原则卡片里的装饰：几条轨道，第二张卡片只点亮其中一段。 */
function tracks(highlight: boolean): string {
  const rows = [
    [18, 30, 22, 14],
    [26, 16, 34],
    [12, 24, 20, 28],
    [40, 22, 18],
  ];
  return `<div class="tracks${highlight ? ' tracks-scope' : ''}" aria-hidden="true">${rows
    .map(
      (row, r) =>
        `<div class="track">${row
          .map((width, c) => `<span${highlight && r === 1 && c === 1 ? ' class="is-hot"' : ''} style="flex:${width}"></span>`)
          .join('')}</div>`,
    )
    .join('')}<div class="playhead"></div></div>`;
}

function principles(copy: SiteCopy): string {
  const p = copy.principles;
  return `<section class="section" id="features" aria-labelledby="principles-title">
<div class="wrap">
${sectionHead(p.kicker, p.title, p.lead, 'principles-title')}
<ul class="bento">
${p.items
  .map(
    (item, index) => `<li class="card bento-${index + 1}" data-reveal>
<span class="card-icon">${icon(PRINCIPLE_ICONS[index] ?? 'sparkles')}</span>
<h3>${esc(item.title)}</h3>
<p>${esc(item.body)}</p>${index < 2 ? `\n${tracks(index === 1)}` : ''}
</li>`,
  )
  .join('\n')}
</ul>
</div>
</section>`;
}

/** 翻译字幕这个场景：一句指令、真实截图，下面是从转录到导出的五步。 */
function scene(input: PageInput): string {
  const { copy, shots } = input;
  const s = copy.scene;
  const shot = shots.translate;
  return `<section class="section scene" id="scene" aria-labelledby="scene-title">
<div class="wrap">
${sectionHead(s.kicker, s.title, s.lead, 'scene-title')}
${
  shot
    ? `<figure class="scene-stage" data-reveal>
<div class="scene-prompt" aria-hidden="true"><span class="float-label">${esc(copy.hero.promptLabel)}</span><p>${esc(s.prompt)}</p></div>
<div class="shot">${picture(shot, s.alt, HERO_SIZES)}</div>
</figure>`
    : ''
}
<ol class="scene-steps">
${s.steps
  .map(
    (step, index) => `<li data-reveal>
<span class="scene-step-head"><span class="scene-step-icon">${icon(SCENE_ICONS[index] ?? 'sparkles')}</span><span class="scene-step-num">${String(index + 1).padStart(2, '0')}</span></span>
<h3>${esc(step.title)}</h3>
<p>${esc(step.body)}</p>
</li>`,
  )
  .join('\n')}
</ol>
</div>
</section>`;
}

function capabilities(copy: SiteCopy): string {
  const c = copy.capabilities;
  return `<section class="section section-band" id="capabilities" aria-labelledby="capabilities-title">
<div class="wrap">
${sectionHead(c.kicker, c.title, c.lead, 'capabilities-title')}
${c.groups
  .map(
    (group, g) => `<div class="cap-group" data-reveal>
<h3 class="cap-group-name"><span>${String(g + 1).padStart(2, '0')}</span>${esc(group.name)}</h3>
<ul class="cap-grid">
${group.items
  .map(
    (item, i) => `<li class="cap">
<span class="cap-icon">${icon(CAPABILITY_ICONS[g]?.[i] ?? 'sparkles')}</span>
<h4>${esc(item.title)}</h4>
<p>${esc(item.body)}</p>
</li>`,
  )
  .join('\n')}
</ul>
</div>`,
  )
  .join('\n')}
</div>
</section>`;
}

function checks(points: readonly string[]): string {
  return `<ul class="checks">${points.map((point) => `<li>${icon('check')}<span>${esc(point)}</span></li>`).join('')}</ul>`;
}

function row(options: { id: string; kicker: string; title: string; body: string; extra: string; media: string; flip?: boolean }): string {
  return `<article class="row${options.flip ? ' row-flip' : ''}${options.media ? '' : ' row-text-only'}" aria-labelledby="${options.id}">
<div class="row-text" data-reveal>
<p class="kicker">${esc(options.kicker)}</p>
<h2 id="${options.id}">${esc(options.title)}</h2>
<p>${esc(options.body)}</p>
${options.extra}
</div>${options.media ? `\n<div class="row-media" data-reveal><figure class="shot">${options.media}</figure></div>` : ''}
</article>`;
}

function rows(input: PageInput): string {
  const { copy, shots } = input;
  const r = copy.rows;
  const models = `<div class="models">
<p class="models-label">${icon('chip')}<span>${esc(r.models.localLabel)}</span></p>
${checks(r.models.local)}
<p class="models-label">${icon('cloud')}<span>${esc(r.models.onlineLabel)}</span></p>
<ul class="chips">${PROVIDERS.map((name) => `<li>${esc(name)}</li>`).join('')}<li class="chip-muted">${esc(r.models.compatible)}</li></ul>
</div>`;
  return `<section class="section rows" id="product">
<div class="wrap">
${row({ id: 'row-space', kicker: r.space.kicker, title: r.space.title, body: r.space.body, extra: checks(r.space.points), media: picture(shots.space, r.space.alt, ROW_SIZES) })}
${row({ id: 'row-home', kicker: r.home.kicker, title: r.home.title, body: r.home.body, extra: checks(r.home.points), media: picture(shots.home, r.home.alt, ROW_SIZES), flip: true })}
${row({ id: 'row-models', kicker: r.models.kicker, title: r.models.title, body: r.models.body, extra: models, media: picture(shots.models, r.models.alt, ROW_SIZES) })}
</div>
</section>`;
}

function templateMeta(copy: SiteCopy, item: ShowcaseItem): string {
  const parts = [item.kind === 'scene' ? copy.showcase.scene : copy.showcase.example];
  if (item.ratio) parts.push(item.ratio);
  if (item.durationSeconds) parts.push(copy.showcase.seconds(item.durationSeconds));
  return parts.map(esc).join(' · ');
}

function showcase(input: PageInput): string {
  const { copy } = input;
  const s = copy.showcase;
  return `<section class="section" id="showcase" aria-labelledby="showcase-title">
<div class="wrap">
${sectionHead(s.kicker, s.title, s.lead, 'showcase-title')}
<ul class="tpl-grid">
${input.showcase
  .map((item) => {
    const portrait = item.coverHeight > item.coverWidth;
    return `<li class="tpl" data-reveal${attrs({ 'data-preview': item.preview, 'data-title': item.title, 'data-summary': item.summary, 'data-portrait': portrait })}>
<button type="button" class="tpl-media${portrait ? ' is-portrait' : ''}" aria-haspopup="dialog"${attrs({
      'aria-label': `${s.play}: ${item.title}`,
      // 站内路径只有字母、数字、点与斜杠，url() 里不用加引号。
      style: portrait ? `--cover:url(${item.cover})` : null,
    })}>
<img${attrs({ src: item.cover, alt: '', width: item.coverWidth, height: item.coverHeight, loading: 'lazy', decoding: 'async' })}>
<span class="tpl-play">${icon('play')}</span>
</button>
<div class="tpl-body">
<h3>${esc(item.title)}</h3>
<p class="tpl-summary">${esc(item.summary)}</p>
<p class="tpl-meta">${templateMeta(copy, item)}</p>
</div>
</li>`;
  })
  .join('\n')}
</ul>
</div>
<dialog class="player" data-player aria-labelledby="player-title">
<div class="player-inner">
<div class="player-head">
<h3 id="player-title" data-player-title></h3>
<button type="button" class="player-close" data-player-close${attrs({ 'aria-label': s.close })}>${icon('close')}</button>
</div>
<div class="player-stage"><video controls playsinline preload="none" data-player-video></video></div>
<p class="player-summary" data-player-summary></p>
</div>
</dialog>
</section>`;
}

function how(copy: SiteCopy): string {
  const h = copy.how;
  return `<section class="section" id="how" aria-labelledby="how-title">
<div class="wrap">
${sectionHead(h.kicker, h.title, undefined, 'how-title')}
<ol class="steps">
${h.steps
  .map(
    (step, index) => `<li class="step" data-reveal>
<span class="step-num">${String(index + 1).padStart(2, '0')}</span>
<h3>${esc(step.title)}</h3>
<p>${esc(step.body)}</p>
</li>`,
  )
  .join('\n')}
</ol>
</div>
</section>`;
}

function surfaces(copy: SiteCopy): string {
  const s = copy.surfaces;
  const c = s.terminalComments;
  const line = (comment: string, command: string) =>
    `<span class="t-comment"># ${esc(comment)}</span>\n<span class="t-prompt">$</span> ${command}`;
  return `<section class="section section-band" id="surfaces" aria-labelledby="surfaces-title">
<div class="wrap">
${sectionHead(s.kicker, s.title, s.lead, 'surfaces-title')}
<div class="surfaces">
<ul class="surface-grid">
${s.items
  .map(
    (item, index) => `<li class="card surface" data-reveal>
<span class="card-icon">${icon(SURFACE_ICONS[index] ?? 'sparkles')}</span>
<h3>${esc(item.title)}</h3>
<p>${esc(item.body)}</p>
</li>`,
  )
  .join('\n')}
</ul>
<figure class="terminal" data-reveal>
<figcaption class="terminal-bar"><i></i><i></i><i></i><span>${esc(s.terminalTitle)}</span></figcaption>
<pre><code>${[
    line(c.skill, 'baocut skill install'),
    line(c.mcp, 'baocut mcp install'),
    line(c.web, 'baocut web open --video <span class="t-arg">&lt;id&gt;</span>'),
  ].join('\n\n')}</code></pre>
</figure>
</div>
</div>
</section>`;
}

function download(input: PageInput, headline: FeedRelease | null): string {
  const { copy, releases } = input;
  const d = copy.download;
  return `<section class="section download" id="download" aria-labelledby="download-title">
<div class="download-glow" aria-hidden="true"></div>
<div class="wrap">
<header class="section-head" data-reveal>
<p class="kicker">${esc(d.kicker)}</p>
<h2 id="download-title">${esc(d.title)}</h2>
<p class="release-line"><span class="release-dot" aria-hidden="true"></span><span>${esc(d.latest)}</span> <strong>v${releaseField(headline, 'version')}</strong> <span class="sep" aria-hidden="true">·</span> <span>${esc(d.build)} ${releaseField(headline, 'build')}</span> <span class="sep" aria-hidden="true">·</span> <span>${esc(d.released)} ${releaseDate(headline, copy.dateLocale)}</span> <span class="sep" aria-hidden="true">·</span> <a data-release="notes"${attrs({ href: notesHref(headline), rel: 'noopener' })}>${esc(d.notes)}</a></p>
</header>
<ul class="dl-grid">
${d.platforms
  .map((platform) => {
    const ids = PLATFORM_DOWNLOADS[platform.feed];
    const release = releases[platform.feed] ?? null;
    const os = platform.feed === 'mac' ? 'mac' : 'windows';
    return `<li class="dl-card" data-reveal${attrs({ 'data-os': os, 'data-feed': platform.feed })}>
<div class="dl-head">
<span class="dl-icon">${icon(os === 'mac' ? 'laptop' : 'windows')}</span>
<div>
<h3>${esc(platform.name)}</h3>
<p class="dl-chip">${esc(platform.chip)}</p>
</div>
</div>
<p class="dl-body">${esc(platform.body)}</p>
<p class="dl-version">v${releaseField(release, 'version', platform.feed)}</p>
<div class="dl-actions">
<a class="btn btn-primary"${attrs({ href: `/download/${ids.installer}` })}>${icon('download')}<span>${esc(platform.installer)}</span></a>
<a class="btn btn-ghost"${attrs({ href: `/download/${ids.portable}` })}>${esc(platform.portable)}</a>
</div>
</li>`;
  })
  .join('\n')}
</ul>
<div class="dl-foot" data-reveal>
<div class="reqs">
<h3>${esc(d.requirementsTitle)}</h3>
<ul>${d.requirementsHtml.map((html) => `<li>${html}</li>`).join('')}</ul>
</div>
<div class="dl-links">
<a${attrs({ href: RELEASES_URL, rel: 'noopener' })}>${icon('package')}<span>${esc(d.allReleases)}</span>${icon('external', 'icon icon-sm')}</a>
<a${attrs({ href: d.sourceUrl, rel: 'noopener' })}>${icon('code')}<span>${esc(d.source)}</span>${icon('external', 'icon icon-sm')}</a>
</div>
</div>
</div>
</section>`;
}

function faq(copy: SiteCopy): string {
  const f = copy.faq;
  return `<section class="section section-band" id="faq" aria-labelledby="faq-title">
<div class="wrap faq-wrap">
${sectionHead(f.kicker, f.title, undefined, 'faq-title')}
<div class="faq" data-reveal>
${f.items
  .map(
    (item) => `<details>
<summary><span>${esc(item.q)}</span>${icon('chevron')}</summary>
<div class="faq-a"><p>${item.aHtml}</p></div>
</details>`,
  )
  .join('\n')}
</div>
</div>
</section>`;
}

function cta(copy: SiteCopy): string {
  const c = copy.cta;
  return `<section class="cta" aria-labelledby="cta-title">
<div class="wrap cta-inner" data-reveal>
<img class="cta-icon" src="/favicon.svg" width="72" height="72" alt="">
<h2 id="cta-title">${esc(c.title)}</h2>
<p>${esc(c.body)}</p>
<div class="cta-actions">
<a class="btn btn-primary btn-lg" href="#download">${icon('download')}<span>${esc(c.download)}</span></a>
<a class="btn btn-ghost btn-lg"${attrs({ href: REPOSITORY_URL, rel: 'noopener' })}>${githubMark}<span>${esc(c.github)}</span></a>
</div>
</div>
</section>`;
}

function footer(copy: SiteCopy, locales: readonly SiteCopy[]): string {
  const f = copy.footer;
  const n = copy.nav;
  const link = (href: string, label: string, external = false) =>
    `<li><a${attrs({ href, rel: external ? 'noopener' : null })}>${esc(label)}</a></li>`;
  return `<footer class="footer">
<div class="wrap footer-grid">
<div class="footer-brand">
<a class="brand"${attrs({ href: copy.path })}><img src="/favicon.svg" width="28" height="28" alt=""><span>BaoCut</span></a>
<p>${esc(f.tagline)}</p>
${languageSwitch(copy, locales, 'footer-lang')}
</div>
<nav${attrs({ 'aria-label': f.product })}>
<h3>${esc(f.product)}</h3>
<ul>${link('#features', n.features)}${link('#showcase', n.showcase)}${link('#how', n.howItWorks)}${link('#download', n.download)}</ul>
</nav>
<nav${attrs({ 'aria-label': f.resources })}>
<h3>${esc(f.resources)}</h3>
<ul>${link(REPOSITORY_URL, n.github, true)}${link(RELEASES_URL, f.releases, true)}${link(`${REPOSITORY_URL}/issues`, f.issues, true)}${link(f.readmeUrl, f.readme, true)}${link(`${REPOSITORY_URL}/blob/main/LICENSE`, f.license, true)}</ul>
</nav>
</div>
<div class="wrap footer-bottom">
<p>${esc(f.copyright)}</p>
<p>${esc(f.licenseNote)}</p>
</div>
</footer>`;
}

export function renderPage(input: PageInput): string {
  const { copy, locales } = input;
  const headline = headlineRelease(input.releases);
  return `<!doctype html>
<html${attrs({ lang: copy.lang })}>
${head(input)}
<body>
<a class="skip" href="#main">${esc(copy.nav.skip)}</a>
${nav(copy, locales)}
<main id="main">
${hero(input, headline)}
${agents(copy)}
${principles(copy)}
${scene(input)}
${capabilities(copy)}
${rows(input)}
${showcase(input)}
${how(copy)}
${surfaces(copy)}
${download(input, headline)}
${faq(copy)}
${cta(copy)}
</main>
${footer(copy, locales)}
</body>
</html>
`;
}

/** 站内找不到的路径用的页面（Worker 对所有语言共用一份）：沿用站点样式，给回首页、下载与其他语言的入口。 */
export function renderNotFound(input: { copy: SiteCopy; locales: readonly SiteCopy[]; assets: { css: string } }): string {
  const { copy, locales } = input;
  const t = copy.notFound;
  return `<!doctype html>
<html${attrs({ lang: copy.lang })}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(t.title)} · BaoCut</title>
<meta name="theme-color" content="#0b0b10">
<meta name="color-scheme" content="dark">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet"${attrs({ href: input.assets.css })}>
</head>
<body class="not-found">
<main class="wrap not-found-inner">
<img src="/favicon.svg" width="72" height="72" alt="">
<p class="kicker">404</p>
<h1>${esc(t.title)}</h1>
<p>${esc(t.body)}</p>
<div class="cta-actions">
<a class="btn btn-primary"${attrs({ href: copy.path })}><span>${esc(t.home)}</span>${icon('arrowRight')}</a>
<a class="btn btn-ghost"${attrs({ href: `${copy.path}#download` })}>${icon('download')}<span>${esc(copy.nav.download)}</span></a>
</div>
${languageSwitch(copy, locales, 'footer-lang')}
</main>
</body>
</html>
`;
}

/**
 * 生成 baocut.com 的静态文件到 apps/portal/dist/：`npm run build -w @baocut/portal`。零依赖，Node 直接跑 TypeScript。
 *
 * - 页面：每种语言一份 index.html，外加 404.html、sitemap.xml、robots.txt。
 * - 样式与脚本：src/site/site.css、client.ts（去掉类型）按内容哈希命名，放进 /assets/。
 * - 模板展示：从仓库 templates/ 取有预览的模板，封面与预览按内容哈希命名，放进 /media/templates/。
 * - 截图：apps/portal/screenshots/ 里的 `<名字>[.<语言>]-<宽>x<高>.webp`，按内容哈希放进 /media/shots/。
 * - 版本快照：apps/desktop/releases/ 的更新源原样写进 release.json，页面里的版本号也按它先写好；部署后由 Worker 换成 GitHub Releases 上最新的。
 * - public/ 原样复制（图标、分享图 og.png 与各语言的 og.<语言小写>.png，1200×630）。
 */

import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEED_FILES, FEED_IDS, parseFeed, type ReleaseSet } from '../release.ts';
import { SHOT_NAMES, renderNotFound, renderPage, type Picture, type ShotName, type ShowcaseItem } from './page.ts';
import { en, type SiteCopy } from './site-copy.ts';
import { zhHans } from './site-copy.zh-Hans.ts';

const ORIGIN = 'https://baocut.com';
const LOCALES: readonly SiteCopy[] = [en, zhHans];

const here = dirname(fileURLToPath(import.meta.url));
const portal = join(here, '..', '..');
const repo = join(portal, '..', '..');
const dist = join(portal, 'dist');

/** 模板展示的顺序：画面最有代表性的排前面；不在列表里的有预览模板按 id 排在最后。 */
const SHOWCASE_ORDER = [
  'launch-film',
  'epic-mood-trailer',
  'motion-design-showreel',
  'typography-motion',
  'data-story',
  'cinematic-scene',
  'knowledge-explainer',
  'rhythm-dance-video',
  'chaos-to-harmony',
  'game-trailer',
  'story-short',
  'physics-ball-escape',
  'software-demo',
  'product-showcase',
  'step-tutorial',
  'creative-montage',
  'vlog-edit',
  'promo-ad',
  'event-recap',
  'white-ui-launch',
];

function hash(content: Buffer | string): string {
  return createHash('sha256').update(content).digest('hex').slice(0, 10);
}

/** 按内容哈希写一份文件，返回站内路径。 */
function emit(dir: string, name: string, extension: string, content: Buffer | string): string {
  const file = `${name}.${hash(content)}.${extension}`;
  mkdirSync(join(dist, dir), { recursive: true });
  writeFileSync(join(dist, dir, file), content);
  return `/${dir}/${file}`;
}

function write(path: string, content: string): void {
  mkdirSync(dirname(join(dist, path)), { recursive: true });
  writeFileSync(join(dist, path), content);
}

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function text(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null;
}

/** 从 JPEG 的 SOF 段读宽高。 */
function jpegSize(buffer: Buffer): { width: number; height: number } {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1] ?? 0;
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error('not a baseline or progressive JPEG');
}

function buildReleases(): ReleaseSet {
  const raw: Record<string, unknown> = {};
  const releases: ReleaseSet = {};
  for (const id of FEED_IDS) {
    const feed = readJson(join(repo, 'apps', 'desktop', 'releases', FEED_FILES[id]));
    const release = parseFeed(feed);
    if (!release) throw new Error(`apps/desktop/releases/${FEED_FILES[id]} is not a valid update feed`);
    raw[id] = feed;
    releases[id] = release;
  }
  write('release.json', `${JSON.stringify(raw, null, 2)}\n`);
  return releases;
}

interface TemplateSource {
  id: string;
  manifest: Record<string, unknown>;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  preview: string;
}

function buildTemplates(): TemplateSource[] {
  const root = join(repo, 'templates');
  const ids = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const rank = (id: string) => {
    const index = SHOWCASE_ORDER.indexOf(id);
    return index < 0 ? SHOWCASE_ORDER.length : index;
  };
  const sources: TemplateSource[] = [];
  for (const id of ids.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))) {
    const dir = join(root, id);
    const manifestPath = join(dir, 'template.json');
    if (!existsSync(manifestPath)) continue;
    const manifest = record(readJson(manifestPath));
    const coverFile = text(record(manifest.cover).file);
    const previewFile = text(record(manifest.preview).file);
    if (!coverFile || !previewFile || !existsSync(join(dir, coverFile)) || !existsSync(join(dir, previewFile))) continue;
    if (!coverFile.endsWith('.jpg') || !previewFile.endsWith('.mp4')) throw new Error(`templates/${id}: expected cover.jpg and preview.mp4`);
    const cover = readFileSync(join(dir, coverFile));
    const size = jpegSize(cover);
    sources.push({
      id,
      manifest,
      cover: emit(`media/templates/${id}`, 'cover', 'jpg', cover),
      coverWidth: size.width,
      coverHeight: size.height,
      preview: emit(`media/templates/${id}`, 'preview', 'mp4', readFileSync(join(dir, previewFile))),
    });
  }
  return sources;
}

/** 模板原文的语言（如 `zh-CN`）与页面语言是否同一种书写：原文就用原文，否则读 locales/<语言>.json，再退到英文译文。 */
function sameWriting(templateLanguage: string, pageLanguage: string): boolean {
  const normalize = (tag: string) => {
    const lower = tag.toLowerCase();
    if (lower === 'zh' || lower === 'zh-cn' || lower === 'zh-sg' || lower === 'zh-hans') return 'zh-hans';
    if (lower === 'zh-tw' || lower === 'zh-hk' || lower === 'zh-hant') return 'zh-hant';
    return lower.split('-')[0] ?? lower;
  };
  return normalize(templateLanguage) === normalize(pageLanguage);
}

function localizeTemplate(source: TemplateSource, copy: SiteCopy): ShowcaseItem {
  const { manifest } = source;
  let title = text(manifest.title);
  let summary = text(manifest.summary);
  if (!sameWriting(text(manifest.language) ?? '', copy.lang)) {
    const dir = join(repo, 'templates', source.id, 'locales');
    const candidates = [copy.lang.toLowerCase(), copy.lang.split('-')[0]?.toLowerCase() ?? '', 'en'];
    const file = candidates.map((code) => join(dir, `${code}.json`)).find((path) => existsSync(path));
    if (file) {
      const localized = record(readJson(file));
      title = text(localized.title) ?? title;
      summary = text(localized.summary) ?? summary;
    }
  }
  if (!title || !summary) throw new Error(`templates/${source.id}: missing title or summary for ${copy.lang}`);
  const kind = manifest.kind === 'example' ? 'example' : 'scene';
  return {
    id: source.id,
    kind,
    title,
    summary,
    ratio: text(manifest.ratio),
    durationSeconds: typeof manifest.durationSeconds === 'number' ? manifest.durationSeconds : null,
    cover: source.cover,
    coverWidth: source.coverWidth,
    coverHeight: source.coverHeight,
    preview: source.preview,
  };
}

const SHOT_FILE = /^([a-z]+)(?:\.([a-z-]+))?-(\d+)x(\d+)\.webp$/;

/** 每种语言的截图：有 `<名字>.<语言>-…` 就用它，否则用不带语言的那组。 */
function buildShots(): Map<string, Partial<Record<ShotName, Picture>>> {
  const dir = join(portal, 'screenshots');
  const groups = new Map<string, Array<{ src: string; width: number; height: number }>>();
  if (existsSync(dir)) {
    for (const file of readdirSync(dir).sort()) {
      const match = SHOT_FILE.exec(file);
      if (!match) continue;
      const [, name = '', language = '', width = '0', height = '0'] = match;
      if (!(SHOT_NAMES as readonly string[]).includes(name)) continue;
      const key = language ? `${name}.${language}` : name;
      const src = emit('media/shots', `${key}-${width}`, 'webp', readFileSync(join(dir, file)));
      groups.set(key, [...(groups.get(key) ?? []), { src, width: Number(width), height: Number(height) }]);
    }
  }
  const pictureOf = (key: string): Picture | undefined => {
    const sizes = (groups.get(key) ?? []).sort((a, b) => a.width - b.width);
    const largest = sizes.at(-1);
    const fallback = sizes.find((size) => size.width >= 1400) ?? largest;
    if (!largest || !fallback) return undefined;
    return {
      src: fallback.src,
      srcset: sizes.map((size) => `${size.src} ${size.width}w`).join(', '),
      width: largest.width,
      height: largest.height,
    };
  };
  const byLocale = new Map<string, Partial<Record<ShotName, Picture>>>();
  for (const copy of LOCALES) {
    const shots: Partial<Record<ShotName, Picture>> = {};
    for (const name of SHOT_NAMES) {
      const picture = pictureOf(`${name}.${copy.lang.toLowerCase()}`) ?? pictureOf(name);
      if (picture) shots[name] = picture;
    }
    byLocale.set(copy.lang, shots);
  }
  return byLocale;
}

function buildAssets(): { css: string; js: string } {
  const css = readFileSync(join(here, 'site.css'), 'utf8');
  const js = stripTypeScriptTypes(readFileSync(join(here, 'client.ts'), 'utf8'));
  return { css: emit('assets', 'site', 'css', css), js: emit('assets', 'site', 'js', js) };
}

function pagePath(copy: SiteCopy): string {
  return `${copy.path.replace(/^\//, '')}index.html`;
}

function sitemap(): string {
  const links = LOCALES.map(
    (locale) => `    <xhtml:link rel="alternate" hreflang="${locale.lang}" href="${ORIGIN}${locale.path}"/>`,
  ).join('\n');
  const urls = LOCALES.map(
    (copy) => `  <url>
    <loc>${ORIGIN}${copy.path}</loc>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${LOCALES[0]?.path ?? '/'}"/>
  </url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function main(): void {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });
  const publicDir = join(portal, 'public');
  if (existsSync(publicDir)) cpSync(publicDir, dist, { recursive: true });

  const releases = buildReleases();
  const templates = buildTemplates();
  const shots = buildShots();
  const assets = buildAssets();

  for (const copy of LOCALES) {
    // 分享图：有 public/og.<语言小写>.png 就用它，没有用英文的 og.png。
    const localOg = `og.${copy.lang.toLowerCase()}.png`;
    const ogImage = { src: `/${existsSync(join(publicDir, localOg)) ? localOg : 'og.png'}`, width: 1200, height: 630 };
    const html = renderPage({
      copy,
      locales: LOCALES,
      origin: ORIGIN,
      releases,
      showcase: templates.map((source) => localizeTemplate(source, copy)),
      assets,
      shots: shots.get(copy.lang) ?? {},
      ogImage,
    });
    write(pagePath(copy), html);
  }
  write('404.html', renderNotFound({ copy: en, locales: LOCALES, assets }));
  write('sitemap.xml', sitemap());
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  // 只作用于静态资源直接返回的文件；按内容哈希命名的可以永久缓存。
  write(
    '_headers',
    ['/assets/*', '/media/*']
      .map((path) => `${path}\n  Cache-Control: public, max-age=31536000, immutable\n  X-Content-Type-Options: nosniff\n`)
      .join('\n'),
  );

  const missing = SHOT_NAMES.filter((name) => !shots.get(en.lang)?.[name]);
  console.log(
    `built ${dist}: ${LOCALES.length} pages, ${templates.length} templates, release ${Object.values(releases)
      .map((release) => release.version)
      .join('/')}${missing.length ? `; missing screenshots: ${missing.join(', ')}` : ''}`,
  );
}

main();

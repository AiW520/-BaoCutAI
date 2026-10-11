/**
 * baocut.com 的 Worker。静态页面与资源在 dist/（`npm run build`），这里只接管 wrangler.jsonc 里 run_worker_first 列出的路径：
 *
 * - `/`：没有选过语言时按 Accept-Language 把简体中文访客带到 `/zh-hans/`；选过的（cookie）照选的来。语言切换链接带 `?lang=`，在这里记进 cookie。
 * - 页面：把带 `data-release` 的元素换成最新已验证版本的版本号、构建号、日期与发布说明链接，不用为每次发版重新部署。
 * - `/download/<下载项>`：302 到最新已验证版本里对应的文件；`/download` 按访客的系统挑一个。
 * - `/api/release`：最新版本与各个下载地址的 JSON。
 *
 * 最新版本以桌面端自动更新读的更新源为准（见 release.ts），每 5 分钟最多取一次；取不到时用构建时的快照（dist/release.json）。
 */

import {
  FEED_BASE_URL,
  FEED_FILES,
  FEED_IDS,
  RELEASES_URL,
  downloadUrl,
  formatReleaseDate,
  headlineRelease,
  isDownloadId,
  newerReleases,
  parseFeed,
  preferredDownload,
  releasePageUrl,
  releaseSummary,
  type FeedId,
  type ReleaseSet,
} from './release.ts';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface ElementHandle {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  setInnerContent(content: string): void;
}

interface HtmlRewriter {
  on(selector: string, handlers: { element(element: ElementHandle): void }): HtmlRewriter;
  transform(response: Response): Response;
}

const CANONICAL_HOST = 'baocut.com';
const LANGUAGE_COOKIE = 'baocut_lang';
const ZH_HANS_PATH = '/zh-hans/';
/** cookie 与 ?lang= 接受的值：页面 `<html lang>` 的小写。 */
const LANGUAGES = ['en', 'zh-hans'];
const FEED_TTL_MS = 5 * 60 * 1000;
const FEED_TIMEOUT_MS = 3000;
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|headless/i;

let feedCache: { at: number; releases: ReleaseSet } | null = null;

/** 构建时写进 dist/release.json 的更新源快照：`{ [FeedId]: 原始更新源 }`。 */
async function snapshotReleases(env: Env, origin: string): Promise<ReleaseSet> {
  try {
    const response = await env.ASSETS.fetch(new Request(`${origin}/release.json`));
    if (!response.ok) return {};
    return readFeeds((await response.json()) as Record<string, unknown>);
  } catch {
    return {};
  }
}

function readFeeds(raw: Record<string, unknown>): ReleaseSet {
  const releases: ReleaseSet = {};
  for (const id of FEED_IDS) {
    const release = parseFeed(raw[id]);
    if (release) releases[id] = release;
  }
  return releases;
}

async function liveRelease(id: FeedId): Promise<[FeedId, unknown]> {
  // 边缘缓存一份，同一个数据中心的请求不重复回源 GitHub。
  const init: RequestInit & { cf: { cacheTtl: number; cacheEverything: boolean } } = {
    cf: { cacheTtl: 300, cacheEverything: true },
    signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
  };
  try {
    const response = await fetch(`${FEED_BASE_URL}${FEED_FILES[id]}`, init);
    return [id, response.ok ? await response.json() : null];
  } catch {
    return [id, null];
  }
}

async function latestReleases(env: Env, origin: string): Promise<ReleaseSet> {
  const now = Date.now();
  if (feedCache && now - feedCache.at < FEED_TTL_MS) return feedCache.releases;
  const [snapshot, live] = await Promise.all([snapshotReleases(env, origin), Promise.all(FEED_IDS.map(liveRelease))]);
  const releases = newerReleases(snapshot, readFeeds(Object.fromEntries(live)));
  feedCache = { at: now, releases };
  return releases;
}

function redirect(location: string, status = 302, headers: Record<string, string> = {}): Response {
  return new Response(null, { status, headers: { Location: location, 'Cache-Control': 'no-store', ...headers } });
}

function readCookie(request: Request, name: string): string | null {
  for (const part of (request.headers.get('Cookie') ?? '').split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key === name) return value.join('=');
  }
  return null;
}

/** Accept-Language 里权重最高的语言是不是简体中文（`zh`、`zh-Hans`、`zh-CN`、`zh-SG`、`zh-MY`）。繁体与其他语言留在英文页。 */
export function prefersSimplifiedChinese(header: string | null): boolean {
  const ranked = (header ?? '')
    .split(',')
    .map((entry, index) => {
      const [tag = '', ...params] = entry.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { tag: tag.toLowerCase(), q: q ? Number(q.slice(2)) : 1, index };
    })
    .filter((entry) => entry.tag && entry.tag !== '*' && Number.isFinite(entry.q) && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  const top = ranked[0]?.tag;
  if (!top) return false;
  return top === 'zh' || /^zh-(hans|cn|sg|my)(-|$)/.test(top);
}

async function servePage(request: Request, env: Env, url: URL): Promise<Response> {
  // 带条件头取资源会拿到没有正文的 304；页面正文要按最新版本改写，统一取完整的一份。
  const asset = await env.ASSETS.fetch(new Request(url.toString(), { headers: { Accept: 'text/html' } }));
  if (!asset.ok || !(asset.headers.get('Content-Type') ?? '').includes('text/html')) return asset;
  const releases = await latestReleases(env, url.origin);
  const headline = headlineRelease(releases);
  const Rewriter = (globalThis as unknown as { HTMLRewriter: new () => HtmlRewriter }).HTMLRewriter;
  const rewritten = new Rewriter()
    .on('[data-release]', {
      element(element) {
        const feed = element.getAttribute('data-release-feed');
        const release = feed && (FEED_IDS as readonly string[]).includes(feed) ? releases[feed as FeedId] : headline;
        if (!release) return;
        switch (element.getAttribute('data-release')) {
          case 'version':
            element.setInnerContent(release.version);
            break;
          case 'build':
            element.setInnerContent(String(release.build));
            break;
          case 'date':
            element.setInnerContent(formatReleaseDate(release.date, element.getAttribute('data-locale') ?? 'en'));
            element.setAttribute('datetime', release.date);
            break;
          case 'notes':
            element.setAttribute('href', releasePageUrl(release));
            break;
        }
      },
    })
    .transform(asset);
  const headers = new Headers(rewritten.headers);
  // 正文随版本变，原资源的 ETag 不再对应它。
  headers.delete('ETag');
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (url.pathname === '/' || url.pathname === '/index.html') headers.set('Vary', 'Accept-Language, Cookie');
  return new Response(rewritten.body, { status: rewritten.status, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      return redirect(`https://${CANONICAL_HOST}${url.pathname}${url.search}`, 301, { 'Cache-Control': 'public, max-age=86400' });
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
    }

    if (url.pathname === '/api/release') {
      const summary = releaseSummary(await latestReleases(env, url.origin));
      return new Response(JSON.stringify(summary), {
        status: summary ? 200 : 503,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (url.pathname === '/download' || url.pathname === '/download/') {
      const id = preferredDownload(request.headers.get('User-Agent') ?? '', request.headers.get('Sec-CH-UA-Platform') ?? '');
      return redirect(id ? `/download/${id}` : '/#download');
    }

    if (url.pathname.startsWith('/download/')) {
      const id = url.pathname.slice('/download/'.length);
      if (!isDownloadId(id)) return env.ASSETS.fetch(new Request(`${url.origin}/404.html`)).then(notFound);
      const location = downloadUrl(await latestReleases(env, url.origin), id);
      return redirect(location ?? RELEASES_URL);
    }

    // 语言切换的链接带 ?lang=：记进 cookie，再回到不带参数的地址。
    const picked = url.searchParams.get('lang');
    if (picked !== null) {
      const clean = new URL(url);
      clean.searchParams.delete('lang');
      const location = `${clean.pathname}${clean.search}`;
      if (!LANGUAGES.includes(picked)) return redirect(location);
      return redirect(location, 302, {
        'Set-Cookie': `${LANGUAGE_COOKIE}=${picked}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`,
      });
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      const chosen = readCookie(request, LANGUAGE_COOKIE);
      const wantsChinese =
        chosen === 'zh-hans' ||
        (chosen !== 'en' &&
          !BOT.test(request.headers.get('User-Agent') ?? '') &&
          prefersSimplifiedChinese(request.headers.get('Accept-Language')));
      if (wantsChinese) return redirect(`${ZH_HANS_PATH}${url.search}`, 302, { Vary: 'Accept-Language, Cookie' });
    }

    return servePage(request, env, url);
  },
};

function notFound(page: Response): Response {
  return new Response(page.body, { status: 404, headers: page.headers });
}

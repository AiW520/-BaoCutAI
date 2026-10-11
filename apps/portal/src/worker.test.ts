import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { FEED_FILES, FEED_IDS } from './release.ts';
import worker, { prefersSimplifiedChinese } from './worker.ts';

describe('prefersSimplifiedChinese', () => {
  it('follows the highest-ranked language', () => {
    expect(prefersSimplifiedChinese('zh-CN,zh;q=0.9,en;q=0.8')).toBe(true);
    expect(prefersSimplifiedChinese('zh')).toBe(true);
    expect(prefersSimplifiedChinese('zh-Hans-CN')).toBe(true);
    expect(prefersSimplifiedChinese('en-US,en;q=0.9,zh-CN;q=0.8')).toBe(false);
    expect(prefersSimplifiedChinese('en;q=0.5,zh-CN;q=0.9')).toBe(true);
  });

  it('leaves Traditional Chinese, wildcards and missing headers on the default page', () => {
    expect(prefersSimplifiedChinese('zh-TW,zh;q=0.9')).toBe(false);
    expect(prefersSimplifiedChinese('zh-Hant')).toBe(false);
    expect(prefersSimplifiedChinese('*')).toBe(false);
    expect(prefersSimplifiedChinese(null)).toBe(false);
  });
});

describe('fetch', () => {
  const feeds = Object.fromEntries(
    FEED_IDS.map((id) => [id, JSON.parse(readFileSync(new URL(`../../desktop/releases/${FEED_FILES[id]}`, import.meta.url), 'utf8'))]),
  );
  const env = {
    ASSETS: {
      async fetch(request: Request) {
        const path = new URL(request.url).pathname;
        if (path === '/release.json') return Response.json(feeds);
        // 页面改写要用 Workers 的 HTMLRewriter，Node 里没有；这里只测路由，静态文件一律给纯文本。
        return new Response(path, { headers: { 'Content-Type': 'text/plain' } });
      },
    },
  };
  const call = (path: string, init: RequestInit = {}) => worker.fetch(new Request(`https://baocut.com${path}`, init), env);

  // 线上更新源取不到时退回构建快照；这里让它失败，结果只取决于仓库里的更新源。
  beforeAll(() => vi.stubGlobal('fetch', async () => new Response(null, { status: 503 })));
  afterAll(() => vi.unstubAllGlobals());

  it('sends www to the apex domain', async () => {
    const response = await worker.fetch(new Request('https://www.baocut.com/zh-hans/?a=1'), env);
    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe('https://baocut.com/zh-hans/?a=1');
  });

  it('only answers GET and HEAD', async () => {
    expect((await call('/', { method: 'POST' })).status).toBe(405);
  });

  it('remembers a language picked through ?lang=', async () => {
    const response = await call('/?lang=zh-hans&ref=x');
    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/?ref=x');
    expect(response.headers.get('Set-Cookie')).toMatch(/^baocut_lang=zh-hans; Path=\/;/);
    const unknown = await call('/?lang=fr');
    expect(unknown.headers.get('Location')).toBe('/');
    expect(unknown.headers.get('Set-Cookie')).toBeNull();
  });

  it('sends Simplified Chinese browsers to /zh-hans/ unless they picked English', async () => {
    const chinese = await call('/', { headers: { 'Accept-Language': 'zh-CN,zh;q=0.9' } });
    expect(chinese.status).toBe(302);
    expect(chinese.headers.get('Location')).toBe('/zh-hans/');
    const picked = await call('/', { headers: { 'Accept-Language': 'zh-CN', Cookie: 'a=1; baocut_lang=en' } });
    expect(picked.status).not.toBe(302);
    const bot = await call('/', { headers: { 'Accept-Language': 'zh-CN', 'User-Agent': 'Googlebot/2.1' } });
    expect(bot.status).not.toBe(302);
  });

  it('redirects downloads to the release asset', async () => {
    const response = await call('/download/win-cuda-setup');
    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toMatch(
      /^https:\/\/github\.com\/jimliu\/baocut\/releases\/download\/baocut-v[\d.]+-build\.\d+\/BaoCut-[\d.]+-build\.\d+-win-x64-cuda-setup\.exe$/,
    );
    const pick = await call('/download', { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } });
    expect(pick.headers.get('Location')).toBe('/download/mac-dmg');
    expect((await call('/download/linux')).status).toBe(404);
  });

  it('serves the release summary', async () => {
    const response = await call('/api/release');
    expect(response.status).toBe(200);
    const body = (await response.json()) as { downloads: Record<string, string> };
    expect(Object.keys(body.downloads)).toHaveLength(8);
  });
});

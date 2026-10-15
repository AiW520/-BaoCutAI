import { afterEach, describe, expect, it, vi } from 'vitest';
import { createKatexFontLoader } from './katex-fonts';

const regular = 'artifact-type/fonts/katex-main-regular-abc.woff2';
const bold = 'artifact-type/fonts/katex-main-bold-def.woff2';
const face = (file: string, weight = 400) => `@font-face{font-family:KaTeX_Main;font-weight:${weight};src:url("${file}") format("woff2")}`;
const baseUrl = () => 'http://127.0.0.1:3000/docs/test-grant/';

afterEach(() => vi.unstubAllGlobals());

describe('parent KaTeX font loading', () => {
  it('resolves against the grant base, preserves face metadata and shares concurrent and subsequent loads', async () => {
    const bytes = new Uint8Array([0, 128, 255, 119]);
    const fetchFont = vi.fn(async () => new Response(bytes));
    vi.stubGlobal('fetch', fetchFont);
    const load = createKatexFontLoader(face(regular) + face(regular, 700), baseUrl);
    const [first, second] = await Promise.all([load(), load()]);
    expect(first).toBe(second);
    expect(first).toBe(face('data:font/woff2;base64,AID/dw==') + face('data:font/woff2;base64,AID/dw==', 700));
    expect(await load()).toBe(first);
    expect(fetchFont).toHaveBeenCalledExactlyOnceWith(`${baseUrl()}${regular}`);
  });

  it('retries failed HTTP requests while retaining successfully loaded faces', async () => {
    let failed = false;
    const fetchFont = vi.fn(async (url: string) => {
      if (url.endsWith(bold) && !failed) {
        failed = true;
        return new Response('', { status: 503 });
      }
      return new Response('font');
    });
    vi.stubGlobal('fetch', fetchFont);
    const load = createKatexFontLoader(face(regular) + face(bold, 700), baseUrl);
    await expect(load()).rejects.toThrow('503');
    await expect(load()).resolves.toContain('data:font/woff2;base64,Zm9udA==');
    expect(fetchFont.mock.calls.filter(([url]) => url.endsWith(regular))).toHaveLength(1);
    expect(fetchFont.mock.calls.filter(([url]) => url.endsWith(bold))).toHaveLength(2);
  });

  it('recovers after a network failure and encodes large font files without overflowing the stack', async () => {
    const bytes = new Uint8Array(300_000).fill(240);
    const fetchFont = vi.fn().mockRejectedValueOnce(new TypeError('offline')).mockImplementation(async () => new Response(bytes));
    vi.stubGlobal('fetch', fetchFont);
    const load = createKatexFontLoader(face(regular), baseUrl);
    await expect(load()).rejects.toThrow('offline');
    const css = await load();
    expect(css).toContain(Buffer.from(bytes).toString('base64'));
    expect(fetchFont).toHaveBeenCalledTimes(2);
  });
});

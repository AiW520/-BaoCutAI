import { describe, expect, it } from 'vitest';
import { DOWNLOAD_IDS, FEED_IDS, type ReleaseSet } from '../release.ts';
import { esc, renderNotFound, renderPage, type PageInput, type ShowcaseItem } from './page.ts';
import { en } from './site-copy.ts';
import { zhHans } from './site-copy.zh-Hans.ts';

const LOCALES = [en, zhHans];
const release = { version: '3.2.0', build: 65, date: '2026-10-10', tag: 'baocut-v3.2.0-build.65' };
const releases: ReleaseSet = { mac: release, win: release, 'win-cuda': release, 'win-vulkan': release };

const showcase: ShowcaseItem[] = [
  {
    id: 'launch-film',
    kind: 'scene',
    title: 'Launch <film> & "more"',
    summary: 'A reveal.',
    ratio: '16:9',
    durationSeconds: 45,
    cover: '/media/templates/launch-film/cover.abc.jpg',
    coverWidth: 640,
    coverHeight: 360,
    preview: '/media/templates/launch-film/preview.abc.mp4',
  },
  {
    id: 'promo-ad',
    kind: 'example',
    title: 'Promo',
    summary: 'Vertical.',
    ratio: null,
    durationSeconds: null,
    cover: '/media/templates/promo-ad/cover.abc.jpg',
    coverWidth: 360,
    coverHeight: 640,
    preview: '/media/templates/promo-ad/preview.abc.mp4',
  },
];

function input(copy: typeof en): PageInput {
  const shot = { src: '/media/shots/x-1400.abc.webp', srcset: '/media/shots/x-1400.abc.webp 1400w', width: 1400, height: 875 };
  return {
    copy,
    locales: LOCALES,
    origin: 'https://baocut.com',
    releases,
    showcase,
    assets: { css: '/assets/site.abc.css', js: '/assets/site.abc.js' },
    shots: { editor: shot, translate: shot, space: shot, home: shot, models: shot },
    ogImage: { src: '/og.png', width: 1200, height: 630 },
  };
}

function all(html: string, pattern: RegExp): string[] {
  return Array.from(html.matchAll(pattern), (match) => match[1] ?? '');
}

describe('renderPage', () => {
  for (const copy of LOCALES) {
    describe(copy.lang, () => {
      const html = renderPage(input(copy));

      it('declares its language, canonical URL and every alternate', () => {
        expect(html).toContain(`<html lang="${copy.lang}">`);
        expect(html).toContain(`<link rel="canonical" href="https://baocut.com${copy.path}">`);
        for (const locale of LOCALES) {
          expect(html).toContain(`<link rel="alternate" hreflang="${locale.lang}" href="https://baocut.com${locale.path}">`);
        }
        expect(html).toContain('<link rel="alternate" hreflang="x-default" href="https://baocut.com/">');
      });

      it('leaves no unfilled values', () => {
        expect(html).not.toMatch(/undefined|\[object Object\]|>null</);
      });

      it('links only to downloads the Worker knows', () => {
        const ids = all(html, /href="\/download\/([^"]*)"/g);
        expect(ids.length).toBeGreaterThan(0);
        for (const id of ids) expect(DOWNLOAD_IDS).toContain(id);
        for (const feed of all(html, /data-release-feed="([^"]*)"/g)) expect(FEED_IDS).toContain(feed);
      });

      it('bakes the snapshot release into the marked elements', () => {
        expect(html).toContain('<span data-release="version">3.2.0</span>');
        expect(html).toContain('data-release="notes" href="https://github.com/jimliu/baocut/releases/tag/baocut-v3.2.0-build.65"');
        expect(html).toMatch(/<time data-release="date" data-locale="[^"]+" datetime="2026-10-10">[^<]+<\/time>/);
      });

      it('has a target for every in-page link and unique ids', () => {
        const ids = all(html, /\sid="([^"]+)"/g);
        expect(new Set(ids).size).toBe(ids.length);
        for (const anchor of all(html, /href="#([^"]+)"/g)) expect(ids).toContain(anchor);
      });

      it('escapes copy and template text', () => {
        expect(html).toContain(esc(showcase[0]?.title ?? ''));
        expect(html).not.toContain('Launch <film>');
      });

      it('frames portrait template covers', () => {
        expect(html).toMatch(/class="tpl-media is-portrait"[^>]*style="--cover:url\(\/media\/templates\/promo-ad\/cover\.abc\.jpg\)"/);
      });

      it('switches language through the Worker so the choice sticks', () => {
        for (const locale of LOCALES.filter((other) => other !== copy)) {
          expect(html).toContain(`href="${locale.path}?lang=${locale.lang.toLowerCase()}"`);
        }
      });
    });
  }
});

describe('renderNotFound', () => {
  it('renders without unfilled values', () => {
    const html = renderNotFound({ copy: en, locales: LOCALES, assets: { css: '/assets/site.abc.css' } });
    expect(html).toContain('<meta name="robots" content="noindex">');
    expect(html).not.toMatch(/undefined|\[object Object\]/);
  });
});

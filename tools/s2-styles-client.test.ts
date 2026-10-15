// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';

type Client = typeof import('./s2-styles-client.ts');
let client: Client;
const merged = async () => {
  await Promise.resolve();
  return document.querySelector('style[data-vite-dev-id="baocut:s2-styles"]')?.textContent;
};

describe('开发时按模块登记 S2 样式', () => {
  beforeEach(async () => {
    document.head.innerHTML = '';
    vi.resetModules();
    client = await import('./s2-styles-client.ts');
  });

  it('已经登记的留在原位，第一次用到的排到最后，与 ES 模块只执行一次的先后一致', async () => {
    client.addStyles('b.tsx', [['x', '.x{top:0}']]);
    client.addStyles('a.tsx', [
      ['y', '.y{top:1px}'],
      ['x', '.x{top:0}'],
      ['y', '.y{top:1px}'],
    ]);
    expect(await merged()).toBe('.x{top:0}\n.y{top:1px}');
  });

  it('同一模块再登记时换掉上次的那组；还有别的模块用到的不注销，都不用了才去掉', async () => {
    client.addStyles('a.tsx', [
      ['x', '.x{top:0}'],
      ['y', '.y{top:1px}'],
    ]);
    client.addStyles('b.tsx', [['y', '.y{top:1px}']]);
    client.addStyles('a.tsx', [
      ['x', '.x{top:0}'],
      ['z', '.z{top:2px}'],
    ]);
    expect(await merged()).toBe('.x{top:0}\n.y{top:1px}\n.z{top:2px}');
    client.addStyles('b.tsx', []);
    expect(await merged()).toBe('.x{top:0}\n.z{top:2px}');
    client.addStyles('a.tsx', []);
    expect(await merged()).toBe('');
    client.addStyles('c.tsx', [['y', '.y{top:1px}']]);
    expect(await merged()).toBe('.y{top:1px}');
  });

  it('内容变了的挪到最后；拆不准的单独插一个 <style>，注销时去掉', async () => {
    client.addStyles('a.tsx', [
      ['x', '.x{top:0}'],
      ['y', '.y{top:1px}'],
    ]);
    client.addStyles('a.tsx', [
      ['x', '.x{top:3px}'],
      ['y', '.y{top:1px}'],
    ]);
    expect(await merged()).toBe('.y{top:1px}\n.x{top:3px}');
    client.addStyles('b.tsx', [['anon', '@layer{.p{top:0}}']]);
    expect(document.querySelector('style[data-vite-dev-id="anon"]')?.textContent).toBe('@layer{.p{top:0}}');
    client.addStyles('b.tsx', []);
    expect(document.querySelector('style[data-vite-dev-id="anon"]')).toBeNull();
  });
});

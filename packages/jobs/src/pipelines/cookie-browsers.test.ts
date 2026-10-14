import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resolveCookieBrowsers } from '@baocut/protocol';
import { cookieDatabaseRules, detectCookieBrowsers, type CookieHost } from './cookie-browsers.ts';

/** 本机浏览器的 Cookie 库（架构设计 §7.9）：在临时目录里造各平台的目录树，不看这台机器真实的浏览器。 */

let root: string;

beforeEach(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-cookie-browsers-'));
});
afterEach(async () => {
  vi.restoreAllMocks();
  await fs.rm(root, { recursive: true, force: true });
});

async function touch(file: string, minutesAgo: number): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, 'x');
  const at = new Date(Date.UTC(2026, 9, 1, 12, 0) - minutesAgo * 60_000);
  await fs.utimes(file, at, at);
}

describe('本机浏览器的 Cookie 库', () => {
  it.each(['EPERM', 'EACCES'])('Chrome 数据目录拒绝列出（%s）时仍可选择，授权后重新检测恢复时间与状态', async (code) => {
    const dir = path.join(root, 'Library', 'Application Support', 'Google', 'Chrome');
    await touch(path.join(dir, 'Default', 'Cookies'), 5);
    const real = fs.readdir.bind(fs);
    const spy = vi.spyOn(fs, 'readdir').mockImplementation((...args: Parameters<typeof fs.readdir>) => {
      if (String(args[0]) === dir) return Promise.reject(Object.assign(new Error('denied'), { code }));
      return real(...args);
    });
    const host: CookieHost = { platform: 'darwin', home: root, env: {} };
    expect(await detectCookieBrowsers(host)).toEqual([{ id: 'chrome', label: 'Chrome', lastUsedAt: null, accessDenied: true }]);
    spy.mockRestore();
    expect(await detectCookieBrowsers(host)).toEqual([{ id: 'chrome', label: 'Chrome', lastUsedAt: '2026-10-01T11:55:00.000Z' }]);
  });

  it.each(['darwin', 'win32', 'linux'] as const)('%s：Cookie 文件被拒时保留浏览器，但仍按可访问配置的修改时间排序', async (platform) => {
    const host: CookieHost = { platform, home: root, env: { LOCALAPPDATA: path.join(root, 'Local') } };
    const dir = cookieDatabaseRules(host).find((r) => r.id === 'chrome')!.chromium!;
    const deniedFile = path.join(dir, 'Profile 1', 'Network', 'Cookies');
    await touch(deniedFile, 1);
    await touch(path.join(dir, 'Default', 'Cookies'), 5);
    const real = fs.stat.bind(fs);
    vi.spyOn(fs, 'stat').mockImplementation((...args: Parameters<typeof fs.stat>) => {
      if (String(args[0]) === deniedFile) return Promise.reject(Object.assign(new Error('denied'), { code: 'EACCES' }));
      return real(...args);
    });
    expect(await detectCookieBrowsers(host)).toEqual([{ id: 'chrome', label: 'Chrome', lastUsedAt: '2026-10-01T11:55:00.000Z', accessDenied: true }]);
    await fs.rm(path.join(dir, 'Default'), { recursive: true });
    expect(await detectCookieBrowsers(host)).toEqual([{ id: 'chrome', label: 'Chrome', lastUsedAt: null, accessDenied: true }]);
  });

  it('Firefox 的配置目录与 Safari 固定文件访问被拒时同样保留；未知时间排在可访问库之后', async () => {
    const support = path.join(root, 'Library', 'Application Support');
    const firefox = path.join(support, 'Firefox', 'Profiles');
    const safari = path.join(root, 'Library', 'Cookies', 'Cookies.binarycookies');
    await touch(path.join(support, 'Google', 'Chrome', 'Default', 'Cookies'), 5);
    const realRead = fs.readdir.bind(fs);
    vi.spyOn(fs, 'readdir').mockImplementation((...args: Parameters<typeof fs.readdir>) => {
      if (String(args[0]) === firefox) return Promise.reject(Object.assign(new Error('denied'), { code: 'EPERM' }));
      return realRead(...args);
    });
    const realStat = fs.stat.bind(fs);
    vi.spyOn(fs, 'stat').mockImplementation((...args: Parameters<typeof fs.stat>) => {
      if (String(args[0]) === safari) return Promise.reject(Object.assign(new Error('denied'), { code: 'EPERM' }));
      return realStat(...args);
    });
    expect(await detectCookieBrowsers({ platform: 'darwin', home: root, env: {} })).toEqual([
      { id: 'chrome', label: 'Chrome', lastUsedAt: '2026-10-01T11:55:00.000Z' },
      { id: 'firefox', label: 'Firefox', lastUsedAt: null, accessDenied: true },
      { id: 'safari', label: 'Safari', lastUsedAt: null, accessDenied: true },
    ]);
  });

  it('macOS：只列出真有库的浏览器（数据目录在但没有库的不算），最近改过的在前', async () => {
    const support = path.join(root, 'Library', 'Application Support');
    await touch(path.join(support, 'Google', 'Chrome', 'Profile 1', 'Network', 'Cookies'), 30);
    await touch(path.join(support, 'Google', 'Chrome', 'Default', 'Network', 'Cookies'), 5);
    await touch(path.join(support, 'Microsoft Edge', 'Cookies'), 60);
    await fs.mkdir(path.join(support, 'BraveSoftware', 'Brave-Browser', 'Default'), { recursive: true });
    await touch(path.join(support, 'Firefox', 'Profiles', 'abc.default-release', 'cookies.sqlite'), 1);
    await touch(path.join(root, 'Library', 'Containers', 'com.apple.Safari', 'Data', 'Library', 'Cookies', 'Cookies.binarycookies'), 600);
    const host: CookieHost = { platform: 'darwin', home: root, env: {} };
    expect(await detectCookieBrowsers(host)).toEqual([
      { id: 'firefox', label: 'Firefox', lastUsedAt: '2026-10-01T11:59:00.000Z' },
      { id: 'chrome', label: 'Chrome', lastUsedAt: '2026-10-01T11:55:00.000Z' },
      { id: 'edge', label: 'Edge', lastUsedAt: '2026-10-01T11:00:00.000Z' },
      { id: 'safari', label: 'Safari', lastUsedAt: '2026-10-01T02:00:00.000Z' },
    ]);
  });

  it('Windows：Opera 与 Firefox 在 APPDATA，其余在 LOCALAPPDATA；缺一个环境变量时只是少几个', async () => {
    const local = path.join(root, 'Local');
    const roaming = path.join(root, 'Roaming');
    await touch(path.join(local, 'Google', 'Chrome', 'User Data', 'Default', 'Network', 'Cookies'), 3);
    await touch(path.join(roaming, 'Opera Software', 'Opera Stable', 'Network', 'Cookies'), 2);
    await touch(path.join(roaming, 'Mozilla', 'Firefox', 'Profiles', 'x.default', 'cookies.sqlite'), 1);
    const ids = async (env: CookieHost['env']) => (await detectCookieBrowsers({ platform: 'win32', home: root, env })).map((b) => b.id);
    expect(await ids({ LOCALAPPDATA: local, APPDATA: roaming })).toEqual(['firefox', 'opera', 'chrome']);
    expect(await ids({ LOCALAPPDATA: local })).toEqual(['chrome']);
    expect(cookieDatabaseRules({ platform: 'win32', home: root, env: {} }).some((r) => r.id === 'safari')).toBe(false);
  });

  it('Linux：XDG 配置目录（没有时 ~/.config），Firefox 还认 ~/.mozilla 与 snap；时间相同时按固定顺序', async () => {
    const config = path.join(root, 'xdg');
    await touch(path.join(config, 'chromium', 'Default', 'Cookies'), 10);
    await touch(path.join(config, 'google-chrome', 'Default', 'Cookies'), 10);
    await touch(path.join(root, 'snap', 'firefox', 'common', '.mozilla', 'firefox', 'a.default', 'cookies.sqlite'), 20);
    expect((await detectCookieBrowsers({ platform: 'linux', home: root, env: { XDG_CONFIG_HOME: config } })).map((b) => b.id)).toEqual([
      'chrome',
      'chromium',
      'firefox',
    ]);
    await touch(path.join(root, '.config', 'vivaldi', 'Default', 'Cookies'), 1);
    expect((await detectCookieBrowsers({ platform: 'linux', home: root, env: {} })).map((b) => b.id)).toEqual(['vivaldi', 'firefox', 'chrome']);
  });

  it('没有任何 Cookie 库或没有主目录时仍默认使用 Chrome；手动取消时匿名下载', async () => {
    for (const host of [
      { platform: 'darwin' as const, home: root, env: {} },
      { platform: 'win32' as const, home: null, env: {} },
    ]) {
      const browsers = await detectCookieBrowsers(host);
      expect(browsers).toEqual([{ id: 'chrome', label: 'Chrome', lastUsedAt: null, cookieStoreMissing: true }]);
      expect(resolveCookieBrowsers('all', browsers)).toEqual(['chrome']);
      expect(resolveCookieBrowsers(['chrome'], browsers)).toEqual(['chrome']);
      expect(resolveCookieBrowsers([], browsers)).toEqual([]);
    }
    expect(cookieDatabaseRules({ platform: 'darwin', home: null, env: {} })).toEqual([]);
  });
});

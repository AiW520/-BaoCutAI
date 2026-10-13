import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { silentLogger } from '@baocut/harness';
import { AntigravityDriver, antigravityInstallCommand, parseAntigravityModels } from './antigravity-driver.ts';
import { antigravityLocations } from './antigravity-binary.ts';
import { createFakeAntigravity } from '../testing/fake-antigravity.ts';

// 假可执行脚本用 POSIX sh；Windows 的位置与安装方式另由纯模型测试覆盖。
describe.skipIf(process.platform === 'win32')('Antigravity detection', () => {
  let dir: string;
  let fake: Awaited<ReturnType<typeof createFakeAntigravity>>;
  let driver: AntigravityDriver;
  beforeEach(async () => { dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-agy-test-')); fake = await createFakeAntigravity(dir); driver = new AntigravityDriver(silentLogger, { locate: fake.locate, timeoutMs: 5000 }); });
  afterEach(async () => { await fs.rm(dir, { recursive: true, force: true }); });
  it('discovers the authenticated catalog without a prompt or session', async () => {
    const probe = await driver.probe();
    expect(probe).toMatchObject({ state: 'ready', command: 'agy', minVersion: '1.1.15', verified: true, tested: false, capabilities: { steer: false, approvals: false, resume: true, images: true } });
    expect(probe.models.map((m) => [m.id, m.tier])).toEqual([['gemini-3.8-flash-high', 'balanced'], ['gemini-3.1-pro-high', null]]);
    expect(fake.log()).toEqual([]);
  });
  it('reports sign-in required from CLI errors', async () => {
    fake.scenario({ signedOut: true });
    expect(await driver.probe()).toMatchObject({ state: 'signed-out', detailRef: { key: 'driversAcp.signedOut', params: { login: { key: 'driversAcp.loginViaTerminal' } } } });
  });
  it('distinguishes missing, unknown version, old version, and invalid catalogs', async () => {
    const missing = new AntigravityDriver(silentLogger, { locate: async () => null });
    expect(await missing.probe()).toMatchObject({ state: 'not-installed', detailRef: { params: { hint: { key: 'driversCommon.installItFirst' } } } });
    expect((await driver.probe({ executable: path.join(dir, 'missing') })).state).toBe('not-installed');
    fake.scenario({ version: '' }); expect((await driver.probe()).state).toBe('error');
    fake.scenario({ version: '1.1.14' }); expect((await driver.probe()).state).toBe('outdated');
    fake.scenario({ version: '1.1.15', models: 'banner\nmodel\tname' }); expect((await driver.probe()).state).toBe('error');
  });
  it('creates the same description for registry caching', () => {
    expect(driver.describe()).toMatchObject({ id: 'antigravity', loginCommand: 'agy', install: [{ kind: 'script', upgrade: 'agy update' }] });
  });
});
describe('Antigravity catalog and platform paths', () => {
  it.each(['', 'id', 'id\tname\textra', 'id\tname\nid\tduplicate'])('rejects invalid catalog %j', (output) => { expect(() => parseAntigravityModels(output)).toThrow(); });
  it('accepts CRLF and Unicode labels', () => { expect(parseAntigravityModels('id\t模型\r\n')[0]?.label).toBe('模型'); });
  it('uses the native Windows location and official PowerShell installer', () => {
    expect(antigravityLocations('win32', 'C:\\Users\\名字', {})).toEqual(['C:\\Users\\名字\\AppData\\Local\\agy\\bin\\agy.exe']);
    expect(antigravityLocations('win32', 'C:\\Users\\Jim', { LOCALAPPDATA: 'D:\\用户数据' })).toEqual(['D:\\用户数据\\agy\\bin\\agy.exe']);
    expect(antigravityInstallCommand('win32')).toBe('irm https://antigravity.google/cli/install.ps1 | iex');
    expect(antigravityInstallCommand('darwin')).toBe('curl -fsSL https://antigravity.google/cli/install.sh | bash');
    expect(antigravityInstallCommand('linux')).toBe(antigravityInstallCommand('darwin'));
  });
});

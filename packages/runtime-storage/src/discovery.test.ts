import fs from 'node:fs/promises';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import type { RuntimeDiscovery } from '@baocut/protocol';
import { acquireInstanceLock, isDiscoveryLive, isEndpointRefused, isRecordedProcessAlive, writeDiscovery } from './discovery.ts';
import { resolveRuntimeHome } from './home.ts';

const servers: net.Server[] = [];
const dirs: string[] = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => new Promise((resolve) => server.close(resolve))));
  await Promise.all(dirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

async function tempHome() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-discovery-'));
  dirs.push(dir);
  return resolveRuntimeHome({ BAOCUT_HOME: dir });
}

async function listening(): Promise<string> {
  const server = net.createServer((socket) => socket.destroy());
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  return `ws://127.0.0.1:${(server.address() as net.AddressInfo).port}`;
}

/** 刚刚还有人监听、现在已经关掉的端口。 */
async function closed(): Promise<string> {
  const server = net.createServer();
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as net.AddressInfo;
  await new Promise((resolve) => server.close(resolve));
  return `ws://127.0.0.1:${port}`;
}

/** 早于这次开机的时间。 */
function beforeBoot(): string {
  return new Date(Date.now() - os.uptime() * 1000 - 10 * 60_000).toISOString();
}

function discovery(endpoint: string, overrides: Partial<RuntimeDiscovery> = {}): RuntimeDiscovery {
  return {
    instanceId: 'rt_old',
    epoch: 'rt_old',
    runtimeVersion: '0.0.0',
    protocolVersion: '0.0',
    home: '/fixture',
    projectsDir: '/fixture/projects',
    logsDir: '/fixture/logs',
    pid: process.pid,
    startedAt: new Date().toISOString(),
    launchedBy: null,
    endpoint,
    token: 'fixture-token',
    ...overrides,
  };
}

describe('记录下的进程（架构设计 §2.2）', () => {
  it('上一次开机留下的记录不算活着，哪怕那个 PID 现在有进程', () => {
    expect(isRecordedProcessAlive(process.pid, new Date().toISOString())).toBe(true);
    expect(isRecordedProcessAlive(process.pid, beforeBoot())).toBe(false);
  });

  it('端点只在明确拒绝连接时算不在', async () => {
    expect(await isEndpointRefused(await closed())).toBe(true);
    expect(await isEndpointRefused(await listening())).toBe(false);
    expect(await isEndpointRefused('not a url')).toBe(false);
  });

  it('发现文件：进程在、端点在监听才算还在服务', async () => {
    expect(await isDiscoveryLive(discovery(await listening()))).toBe(true);
    expect(await isDiscoveryLive(discovery(await closed()))).toBe(false);
    expect(await isDiscoveryLive(discovery(await listening(), { startedAt: beforeBoot() }))).toBe(false);
  });
});

describe('实例锁的接管', () => {
  async function lockHeldBy(home: ReturnType<typeof resolveRuntimeHome>, acquiredAt: string) {
    await fs.mkdir(home.root, { recursive: true });
    await fs.writeFile(home.lockFile, JSON.stringify({ pid: process.pid, instanceId: 'rt_old', acquiredAt }));
  }

  it('接管上一次开机留下的锁', async () => {
    const home = await tempHome();
    await lockHeldBy(home, beforeBoot());
    expect(await acquireInstanceLock(home, 'rt_new')).toEqual({ ok: true });
    expect(JSON.parse(await fs.readFile(home.lockFile, 'utf8')).instanceId).toBe('rt_new');
  });

  it('同一实例的发现文件还在而端点拒绝连接：持有者没有收尾就不在了，接管', async () => {
    const home = await tempHome();
    await lockHeldBy(home, new Date().toISOString());
    await writeDiscovery(home, discovery(await closed()));
    expect(await acquireInstanceLock(home, 'rt_new')).toEqual({ ok: true });
  });

  it('持有者还在服务、还在启动（没有发现文件）或发现文件属于别的实例时不接管', async () => {
    const home = await tempHome();
    await lockHeldBy(home, new Date().toISOString());
    expect((await acquireInstanceLock(home, 'rt_new')).ok).toBe(false);
    await writeDiscovery(home, discovery(await closed(), { instanceId: 'rt_other' }));
    expect((await acquireInstanceLock(home, 'rt_new')).ok).toBe(false);
    await writeDiscovery(home, discovery(await listening()));
    expect((await acquireInstanceLock(home, 'rt_new')).ok).toBe(false);
  });
});

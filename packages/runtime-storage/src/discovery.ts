import fs from 'node:fs/promises';
import net from 'node:net';
import os from 'node:os';
import type { RuntimeDiscovery } from '@baocut/protocol';
import type { RuntimeHome } from './home.ts';
import { readJson, writeJsonAtomic } from './json-file.ts';

/**
 * 发现信息与实例锁（架构设计 §2.2）。
 *
 * 发现文件里有连接令牌，只给当前用户读写（0600）。读到发现文件不代表 Runtime 可用：
 * 调用方还要验证进程存活并完成握手。
 */
export async function writeDiscovery(home: RuntimeHome, discovery: RuntimeDiscovery): Promise<void> {
  await writeJsonAtomic(home.discoveryFile, discovery, { mode: 0o600 });
}

export async function readDiscovery(home: RuntimeHome): Promise<RuntimeDiscovery | null> {
  return readJson<RuntimeDiscovery>(home.discoveryFile);
}

export async function removeDiscovery(home: RuntimeHome, instanceId: string): Promise<void> {
  const current = await readDiscovery(home).catch(() => null);
  if (current && current.instanceId !== instanceId) return;
  await fs.rm(home.discoveryFile, { force: true });
}

export function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === 'EPERM';
  }
}

/** 记录时间早于这次开机多少才算上一次开机留下的：墙上时钟在开机后可能被校准。 */
const BOOT_SLACK_MS = 60_000;

/**
 * 发现文件或实例锁里记下的进程还在吗（架构设计 §2.2）。只看 PID 不够：开机后 PID 从小重新分配，随登录拉起的 Runtime
 * 记下的 PID 在重启后多半已经是别的进程，没来得及清理的记录会一直显得「活着」。记录写于这次开机之前的一律当作不在。
 */
export function isRecordedProcessAlive(pid: number, recordedAt: string, now = Date.now()): boolean {
  const at = Date.parse(recordedAt);
  if (Number.isFinite(at) && at < now - os.uptime() * 1000 - BOOT_SLACK_MS) return false;
  return isProcessAlive(pid);
}

/**
 * 端点明确拒绝连接（没有进程在监听）。只认 `ECONNREFUSED`：超时等说不清的情况按还在监听处理，宁可多等，也不把一个也许
 * 还在跑的 Runtime 当成不在。Windows 上本机端口拒绝连接要重试约 2 秒才报错，期限留得比它长。
 */
export function isEndpointRefused(endpoint: string, timeoutMs = 3_000): Promise<boolean> {
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return Promise.resolve(false);
  }
  const port = Number(url.port);
  if (!port) return Promise.resolve(false);
  return new Promise((resolve) => {
    const socket = net.connect({ host: url.hostname.replace(/^\[(.*)\]$/, '$1'), port });
    const finish = (refused: boolean) => {
      clearTimeout(timer);
      socket.destroy();
      resolve(refused);
    };
    const timer = setTimeout(() => finish(false), timeoutMs);
    socket.once('connect', () => finish(false));
    socket.once('error', (error: NodeJS.ErrnoException) => finish(error.code === 'ECONNREFUSED'));
  });
}

/**
 * 发现文件指向的 Runtime 还在服务吗：进程在、不是上一次开机留下的，端点也没有拒绝连接。发现文件在监听之后才写、停止时先于
 * 网关撤掉（`STOP_ORDER`），所以发现文件在而端点拒绝连接，就是那个 Runtime 已经不在了（没有收尾就被结束，PID 又被复用）。
 */
export async function isDiscoveryLive(discovery: RuntimeDiscovery): Promise<boolean> {
  if (!isRecordedProcessAlive(discovery.pid, discovery.startedAt)) return false;
  return !(await isEndpointRefused(discovery.endpoint));
}

interface LockRecord {
  pid: number;
  instanceId: string;
  acquiredAt: string;
}

export type LockResult = { ok: true } | { ok: false; holder: LockRecord };

/**
 * 取得实例锁。锁文件记录持有者 PID；持有者已退出时才接管（不因为「看起来过期」就抢）。退出的判断见 `isLockHolderLive`。
 */
export async function acquireInstanceLock(home: RuntimeHome, instanceId: string): Promise<LockResult> {
  await fs.mkdir(home.root, { recursive: true });
  const record: LockRecord = { pid: process.pid, instanceId, acquiredAt: new Date().toISOString() };
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await fs.writeFile(home.lockFile, JSON.stringify(record), { flag: 'wx', mode: 0o600 });
      return { ok: true };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      const holder = await readJson<LockRecord>(home.lockFile).catch(() => null);
      if (holder && (await isLockHolderLive(home, holder))) return { ok: false, holder };
      await fs.rm(home.lockFile, { force: true });
    }
  }
  const holder = await readJson<LockRecord>(home.lockFile);
  return holder ? { ok: false, holder } : { ok: true };
}

/**
 * 锁的持有者还在吗。PID 不在，或锁是上一次开机留下的，都算已退出。同一个实例的发现文件还在、端点却拒绝连接，也算已退出：
 * 正常停止时发现文件先撤掉、实例锁最后才放，这个组合只会出现在没有收尾就被结束、PID 又被别的进程复用的时候。没有对应的
 * 发现文件（持有者还在启动，或正在停止）时按还在处理。
 */
async function isLockHolderLive(home: RuntimeHome, holder: LockRecord): Promise<boolean> {
  if (!isRecordedProcessAlive(holder.pid, holder.acquiredAt)) return false;
  const discovery = await readDiscovery(home).catch(() => null);
  if (discovery?.instanceId !== holder.instanceId || discovery.pid !== holder.pid) return true;
  return !(await isEndpointRefused(discovery.endpoint));
}

export async function releaseInstanceLock(home: RuntimeHome, instanceId: string): Promise<void> {
  const holder = await readJson<LockRecord>(home.lockFile).catch(() => null);
  if (holder?.instanceId === instanceId) await fs.rm(home.lockFile, { force: true });
}

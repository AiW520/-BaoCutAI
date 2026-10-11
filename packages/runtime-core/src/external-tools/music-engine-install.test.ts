import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { BaoCutClient } from '@baocut/client';
import { AUDIO_CPP_CLI_ENV, AUDIO_CPP_RELEASE } from '@baocut/models';
import type { ExternalToolStatus } from '@baocut/protocol';
import { resolveRuntimeHome } from '@baocut/runtime-storage';
import { ToolDriver } from '../agent-tools/testing/fake-agent.ts';
import { resolveAudioCppCli } from '../models/model-jobs.ts';
import { startRuntime, type RunningRuntime } from '../runtime.ts';
import { AUDIO_CPP, BUILTIN_TOOL_MANIFESTS, platformKey, type ToolManifest } from './tool-manifests.ts';

/**
 * 音乐引擎（audio.cpp）的安装与检测经网关端到端（架构设计 §6.5、§12.9）：
 *
 * - 「发布文件」是测试里打的 `.tar.gz`，结构照上游（`./` 前缀、根目录的可执行文件与库、同包的其他工具、子目录）；里面的
 *   `audiocpp_cli` 是打印 `audio.cpp 0.9.1` 的 shell 脚本。由本机回环地址上的假下载来源提供，清单里的大小与 sha256 是现算的；
 *   不访问真实网络，不下载真实的引擎。
 * - 安装前能力视图说找不到引擎；安装后受管副本只有根目录里该解开的文件，探测为已安装，能力视图与同步查找都看到它；删除之后回到缺失。
 * - 坏包：摘要对得上但解不开时任务失败，不留半个目录。
 */

const MUSIC_BUNDLE = 'yue2-3b@audio-cpp-q8';

interface Release {
  bytes: Buffer;
  fileName: string;
}

async function packRelease(dir: string, script: string): Promise<Release> {
  const root = path.join(dir, 'pack');
  await fs.mkdir(path.join(root, 'tools'), { recursive: true });
  await fs.writeFile(path.join(root, 'audiocpp_cli'), script, { mode: 0o755 });
  await fs.writeFile(path.join(root, 'audiocpp_server'), '#!/bin/sh\nexit 0\n', { mode: 0o755 });
  await fs.writeFile(path.join(root, 'libggml.so'), 'lib');
  await fs.writeFile(path.join(root, 'LICENSE'), 'Apache-2.0');
  await fs.writeFile(path.join(root, 'tools', 'notes.txt'), 'not extracted');
  const fileName = 'audio-test-bin.tar.gz';
  const archive = path.join(dir, fileName);
  execFileSync('tar', ['-czf', archive, '-C', root, '.']);
  return { bytes: await fs.readFile(archive), fileName };
}

function manifestFor(release: Release, sha256 = createHash('sha256').update(release.bytes).digest('hex')): ToolManifest {
  const builtin = BUILTIN_TOOL_MANIFESTS.find((m) => m.name === AUDIO_CPP)!;
  return {
    ...builtin,
    // 测试不找随应用分发的那一份（开发机上可能构建过）。
    bundled: () => null,
    release: {
      ...builtin.release!,
      assets: {
        [platformKey()]: { fileName: release.fileName, size: release.bytes.length, sha256, archive: { format: 'tar.gz', skip: ['audiocpp_server'] } },
      },
    },
  };
}

interface Side {
  dir: string;
  runtime: RunningRuntime;
  client: BaoCutClient;
  toolsDir: string;
  requests: string[];
  close(): Promise<void>;
}

async function startSide(release: Release, manifest: ToolManifest): Promise<Side> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-music-engine-'));
  const home = resolveRuntimeHome({ BAOCUT_HOME: path.join(dir, 'home') });
  const requests: string[] = [];
  const server = http.createServer((request, response) => {
    requests.push(request.url ?? '');
    if (request.url !== `/mirror/${AUDIO_CPP}/${AUDIO_CPP_RELEASE.version}/${release.fileName}`) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { 'Content-Length': String(release.bytes.length) }).end(release.bytes);
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  const emptyPath = path.join(dir, 'empty-path');
  await fs.mkdir(emptyPath);
  const runtime = await startRuntime({
    home,
    drivers: () => [new ToolDriver()],
    watchSpace: false,
    engineHost: null,
    modelWorker: null,
    externalTools: {
      env: async () => ({ PATH: emptyPath }),
      // 不读真实环境：没有 BAOCUT_AUDIOCPP_CLI 与 PATH，下载来源指向假服务。
      overrides: { BAOCUT_TOOLS_ENDPOINT: `http://127.0.0.1:${port}/mirror` },
      manifests: [manifest],
      download: { backoffMs: () => 5, retries: 1 },
      lookup: async () => ['93.184.216.34'],
    },
  });
  const { endpoint, token } = runtime.discovery;
  const client = new BaoCutClient({ resolve: async () => ({ endpoint, token }), client: { kind: 'desktop', name: 'test', version: '0' }, reconnect: false });
  await client.connect();
  return {
    dir,
    runtime,
    client,
    toolsDir: path.join(home.root, 'tools'),
    requests,
    close: async () => {
      client.close();
      await runtime.close();
      await new Promise<void>((resolve) => server.close(() => resolve()));
      await fs.rm(dir, { recursive: true, force: true });
    },
  };
}

/** 能力视图里本地音乐模型的引擎：`local.engine.executable`。 */
async function musicEngineInCapabilities(client: BaoCutClient): Promise<string | null | undefined> {
  const { capabilities } = await client.request('models.capabilities', {});
  let found: string | null | undefined;
  const visit = (value: unknown): void => {
    if (found !== undefined || !value || typeof value !== 'object') return;
    const record = value as Record<string, unknown>;
    if (record.modelId === MUSIC_BUNDLE && record.local && typeof record.local === 'object') {
      found = ((record.local as { engine?: { executable?: string | null } }).engine?.executable ?? null) as string | null;
      return;
    }
    for (const child of Object.values(record)) visit(child);
  };
  visit(capabilities);
  return found;
}

const engineOf = (tools: ExternalToolStatus[]) => tools.find((t) => t.name === AUDIO_CPP)!;

describe.skipIf(process.platform === 'win32')('音乐引擎的安装与检测（假下载来源 + 假 audiocpp_cli）', () => {
  let side: Side | undefined;
  let scratch: string;

  beforeEach(async () => {
    scratch = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-music-engine-pack-'));
  });

  afterEach(async () => {
    await side?.close();
    side = undefined;
    await fs.rm(scratch, { recursive: true, force: true });
  });

  it('安装：下载压缩包、核对、只解开根目录该要的文件、探测为已安装，能力视图看到引擎；删除后回到缺失', async () => {
    const release = await packRelease(scratch, '#!/bin/sh\necho "audio.cpp 0.9.1"\necho "backends: cpu"\n');
    side = await startSide(release, manifestFor(release));
    const s = side;

    const before = engineOf((await s.client.request('externalTools.list', {})).tools);
    expect(before).toMatchObject({ state: 'missing', installable: true, consentRequired: false, source: null });
    expect(before.offer).toMatchObject({ version: AUDIO_CPP_RELEASE.version, fileName: release.fileName, license: 'Apache-2.0', blockedReason: null });
    expect(before.remedy).toContain('audiocpp');
    expect(await musicEngineInCapabilities(s.client)).toBeNull();

    // 不带 consent 时交出说明，不下载。
    await expect(s.client.request('externalTools.install', { name: AUDIO_CPP })).rejects.toMatchObject({ details: { code: 'TOOL_CONSENT_REQUIRED' } });
    expect(s.requests).toEqual([]);

    const install = await s.client.request('externalTools.install', { name: AUDIO_CPP, consent: true, via: 'app' });
    await s.runtime.models.jobs.settled(install.jobId);
    expect(s.runtime.models.jobs.inspect(install.jobId)).toMatchObject({ state: 'completed', kind: 'toolInstall' });

    const dir = path.join(s.toolsDir, AUDIO_CPP, AUDIO_CPP_RELEASE.version);
    expect((await fs.readdir(dir)).sort()).toEqual(['LICENSE', 'audiocpp_cli', 'libggml.so']);
    expect((await fs.stat(path.join(dir, 'audiocpp_cli'))).mode & 0o111).not.toBe(0);
    // staging 里不留压缩包与解开的目录。
    expect(await fs.readdir(path.join(s.toolsDir, '.staging'))).toEqual([]);

    const after = engineOf((await s.client.request('externalTools.detect', { name: AUDIO_CPP })).tools);
    expect(after).toMatchObject({ state: 'installed', version: '0.9.1', source: 'managed', path: path.join(dir, 'audiocpp_cli') });
    expect(await musicEngineInCapabilities(s.client)).toBe(path.join(dir, 'audiocpp_cli'));
    expect(resolveAudioCppCli({}, { toolsDir: s.toolsDir })).toBe(path.join(dir, 'audiocpp_cli'));

    await s.client.request('externalTools.remove', { name: AUDIO_CPP });
    expect(engineOf((await s.client.request('externalTools.list', {})).tools).state).toBe('missing');
    expect(await musicEngineInCapabilities(s.client)).toBeNull();
  });

  it('用户指定的路径优先于受管副本，探测与同步查找一致；坏包失败且不留目录', async () => {
    const good = await packRelease(scratch, '#!/bin/sh\necho "audio.cpp dev"\n');
    // 摘要对得上但不是 gzip：下载通过、解开失败。
    const broken: Release = { bytes: Buffer.from('not an archive'), fileName: good.fileName };
    side = await startSide(broken, manifestFor(broken));
    const s = side;
    const install = await s.client.request('externalTools.install', { name: AUDIO_CPP, consent: true });
    await s.runtime.models.jobs.settled(install.jobId);
    expect(s.runtime.models.jobs.inspect(install.jobId)).toMatchObject({ state: 'failed', error: { code: 'TOOL_DOWNLOAD_INTEGRITY' } });
    expect(await fs.readdir(path.join(s.toolsDir, AUDIO_CPP)).catch(() => [])).toEqual([]);
    expect(await fs.readdir(path.join(s.toolsDir, '.staging'))).toEqual([]);

    // 自己构建的 `dev` 版本：不当成过旧。
    const own = path.join(scratch, 'own', 'audiocpp_cli');
    await fs.mkdir(path.dirname(own), { recursive: true });
    await fs.writeFile(own, '#!/bin/sh\necho "audio.cpp dev"\n', { mode: 0o755 });
    const set = await s.client.request('externalTools.setPath', { name: AUDIO_CPP, path: own });
    expect(set.tool).toMatchObject({ state: 'installed', version: 'dev', source: 'user', path: own });
    expect(await musicEngineInCapabilities(s.client)).toBe(own);
  });
});

describe('resolveAudioCppCli 的查找顺序', () => {
  it('环境变量 → 用户指定的路径 → 受管副本（先找登记的版本）→ PATH', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-resolve-engine-'));
    try {
      const exe = process.platform === 'win32' ? 'audiocpp_cli.exe' : 'audiocpp_cli';
      const write = async (...parts: string[]) => {
        const file = path.join(dir, ...parts, exe);
        await fs.mkdir(path.dirname(file), { recursive: true });
        await fs.writeFile(file, '', { mode: 0o755 });
        return file;
      };
      const onPath = await write('path');
      const env = { PATH: path.join(dir, 'path') };
      expect(resolveAudioCppCli(env)).toBe(onPath);
      const toolsDir = path.join(dir, 'tools');
      const older = await write('tools', 'audiocpp', '0.0.1');
      expect(resolveAudioCppCli(env, { toolsDir })).toBe(older);
      const pinned = await write('tools', 'audiocpp', AUDIO_CPP_RELEASE.version);
      expect(resolveAudioCppCli(env, { toolsDir })).toBe(pinned);
      const user = await write('user');
      expect(resolveAudioCppCli(env, { toolsDir, userPath: user })).toBe(user);
      // 用户指定的路径不在了：不换别的来源。
      expect(resolveAudioCppCli(env, { toolsDir, userPath: path.join(dir, 'gone', exe) })).toBeNull();
      const explicit = await write('env');
      expect(resolveAudioCppCli({ ...env, [AUDIO_CPP_CLI_ENV]: explicit }, { toolsDir, userPath: user })).toBe(explicit);
    } finally {
      await fs.rm(dir, { recursive: true, force: true });
    }
  });
});

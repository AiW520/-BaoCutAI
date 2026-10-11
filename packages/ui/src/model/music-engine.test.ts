import { describe, expect, it } from 'vitest';
import type { ExternalToolStatus } from '@baocut/protocol';
import { engineCard } from './music-engine.ts';
import { M } from './music-engine-copy.ts';

/** 设置 › 音乐生成 › 音乐引擎一行（设计稿 model-local-check.js `engineView`）：`externalTools.detect` 的结果换成状态、说法与按钮。 */

const offer = {
  version: '0.9.1',
  url: 'https://github.com/0xShug0/audio.cpp/releases/download/v0.9.1/audio-v0.9.1-bin-macos-arm64-metal.tar.gz',
  fileName: 'audio-v0.9.1-bin-macos-arm64-metal.tar.gz',
  sizeBytes: 30519606,
  estimatedBytes: 73400320,
  sha256: 'a'.repeat(64),
  license: 'Apache-2.0',
  homepage: 'https://github.com/0xShug0/audio.cpp',
  blockedReason: null,
};

function tool(patch: Partial<ExternalToolStatus> = {}): ExternalToolStatus {
  return {
    name: 'audiocpp',
    label: 'audio.cpp',
    state: 'missing',
    version: null,
    source: null,
    path: null,
    reason: null,
    remedy: null,
    installable: true,
    consentRequired: false,
    offer,
    installJobId: null,
    platform: 'darwin',
    ...patch,
  } as unknown as ExternalToolStatus;
}

const idle = { checking: false, installing: false };

describe('engineCard', () => {
  it('还没检测完是 checking；检测本身失败是 unknown，带原因', () => {
    expect(engineCard(null, { checking: true, installing: false })).toMatchObject({ state: 'checking', action: null });
    expect(engineCard(null, idle).state).toBe('checking');
    const c = engineCard(null, { ...idle, error: 'Runtime offline' });
    expect(c).toMatchObject({ state: 'unknown', action: null });
    expect(c.body).toContain('Runtime offline');
  });

  it('没装、能下载：给「安装引擎」，事实里有版本、大小、许可与来源；macOS 不提 Vulkan', () => {
    const c = engineCard(tool(), idle);
    expect(c).toMatchObject({ state: 'install', action: M.install });
    expect(c.facts[0]).toContain('0.9.1');
    expect(c.facts[0]).toMatch(/MB/);
    expect(c.facts[1]).toContain('Apache-2.0');
    expect(c.facts[1]).toContain('github.com');
    expect(c.body).not.toContain('Vulkan');
  });

  it('Windows 与 Linux 的包要 Vulkan 驱动，说法里提一句', () => {
    expect(engineCard(tool({ platform: 'win32' } as Partial<ExternalToolStatus>), idle).body).toContain('Vulkan');
    expect(engineCard(tool({ platform: 'linux' } as Partial<ExternalToolStatus>), idle).body).toContain('Vulkan');
  });

  it('在装（刚按下或已有任务）：installing，没有按钮', () => {
    expect(engineCard(tool(), { checking: false, installing: true })).toMatchObject({ state: 'installing', action: null });
    expect(engineCard(tool({ installJobId: 'job_1' }), idle)).toMatchObject({ state: 'installing', action: null });
  });

  it('装好了：ready，事实是此刻用的那一份与路径', () => {
    const c = engineCard(tool({ state: 'installed', version: '0.9.1', source: 'managed', path: '/opt/baocut/tools/audiocpp/0.9.1/audiocpp_cli' }), idle);
    expect(c).toMatchObject({ state: 'ready', action: null });
    expect(c.facts[0]).toContain('audio.cpp 0.9.1');
    expect(c.facts[1]).toContain('audiocpp_cli');
  });

  it('下载被拦下或没有这台电脑的包：blocked，说明原因，不给安装', () => {
    const offline = engineCard(tool({ offer: { ...offer, blockedReason: 'Strict offline mode' } }), idle);
    expect(offline).toMatchObject({ state: 'blocked', action: null });
    expect(offline.body).toContain('Strict offline mode');
    expect(engineCard(tool({ installable: false, offer: null }), idle)).toMatchObject({ state: 'blocked', action: null });
  });

  it('受管的那一份不能运行：broken，给「重新安装引擎」', () => {
    const c = engineCard(tool({ state: 'unavailable', source: 'managed', reason: 'missing libvulkan', remedy: 'Install a Vulkan driver' }), idle);
    expect(c).toMatchObject({ state: 'broken', action: M.reinstall });
    expect(c.body).toContain('missing libvulkan');
    expect(c.body).toContain('Install a Vulkan driver');
  });

  it('环境变量、用户指定或随应用分发的那一份不能运行：blocked，换一份下载的也不会被用到', () => {
    for (const source of ['env', 'user', 'bundled'] as const) {
      const c = engineCard(tool({ state: 'unavailable', source, path: '/x/audiocpp_cli', reason: 'exit 1' }), idle);
      expect(c).toMatchObject({ state: 'blocked', action: null });
      expect(c.facts.join(' ')).toContain('audiocpp_cli');
    }
  });
});

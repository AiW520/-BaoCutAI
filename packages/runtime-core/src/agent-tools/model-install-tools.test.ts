import { describe, expect, it } from 'vitest';
import type { ExternalToolStatus } from '@baocut/protocol';
import { ModelInstallTools, type ModelInstallToolsDeps } from './model-install-tools.ts';
import { toolRisk, type ToolConfirmation, type ToolPrincipal } from './tool-scope.ts';

/**
 * `models_install` 与音乐引擎（架构设计 §6.5、§12.9）：音乐模型包（backend `audio-cpp`）的引擎没有时另行确认并经受管外部工具
 * 安装；在装时交出进行中的任务；由环境变量或用户指定的路径决定而不能运行、或下载被拦下时不代为安装。别的模型包不碰引擎。
 * 模型安装、受管工具与范围都是假的。
 */

const MUSIC = 'yue2-3b@audio-cpp-q8';
const SPEECH = 'voxcpm2@mlx-int8';
const agent = { kind: 'agent', conversationId: 'conv_1' } as unknown as ToolPrincipal;

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

function engine(patch: Partial<ExternalToolStatus>): ExternalToolStatus {
  return {
    name: 'audiocpp',
    label: 'audio.cpp',
    state: 'missing',
    version: null,
    source: null,
    path: null,
    reason: null,
    remedy: '在设置 › 音乐生成里安装',
    installable: true,
    consentRequired: false,
    offer,
    installJobId: null,
    ...patch,
  } as unknown as ExternalToolStatus;
}

function harness(status: ExternalToolStatus, upToDate = true) {
  const confirmed: ToolConfirmation[] = [];
  const installs: Record<string, unknown>[] = [];
  const plan = (bundleId: string) => ({
    bundleId,
    upToDate,
    components: upToDate ? [] : [{ component: 'music', repo: 'org/yue2', revision: 'r', action: 'download', files: ['m.gguf'], bytes: 1000 }],
    downloadBytes: upToDate ? 0 : 1000,
    estimatedBytes: 1000,
    confirmBytes: upToDate ? 0 : 1000,
    resumedBytes: 0,
    availableBytes: null,
    source: 'https://hf.example',
  });
  const deps = {
    installs: {
      install: async (request: { bundleId: string; confirmBytes?: number }) => ({ plan: plan(request.bundleId), jobId: request.confirmBytes !== undefined ? 'job_model' : null }),
    },
    catalog: {
      list: async () => [
        { bundleId: MUSIC, backend: 'audio-cpp', state: upToDate ? 'installed' : 'not-installed', components: [] },
        { bundleId: SPEECH, backend: 'mlx', state: 'installed', components: [] },
      ],
    },
    tools: {
      status: async () => status,
      install: async (request: Record<string, unknown>) => {
        installs.push(request);
        return { jobId: 'job_engine', tool: { ...status, installJobId: 'job_engine' } };
      },
    },
    scope: {
      authorize: (principal: ToolPrincipal) => ({ principal, submitter: { kind: 'agent', id: 'conv_1' } }),
      confirm: async (_access: unknown, request: ToolConfirmation) => {
        confirmed.push(request);
        return { mode: 'auto', risk: toolRisk(request), decidedBy: 'auto' };
      },
      commandId: (_access: unknown, id: string) => id,
    },
  } as unknown as ModelInstallToolsDeps;
  return { tools: new ModelInstallTools(deps), confirmed, installs };
}

describe('models_install 与音乐引擎', () => {
  it('权重已装好、引擎没有：另行确认（版本、大小、许可、来源）后经受管工具安装，结果带 engine.jobId', async () => {
    const { tools, confirmed, installs } = harness(engine({}));
    const result = (await tools.dispatch('models_install', { bundleId: MUSIC, commandId: 'cmd_1' }, agent)) as Record<string, any>;
    expect(confirmed).toHaveLength(1);
    expect(confirmed[0]).toMatchObject({ tool: 'models_install', risk: 'command', summaryRef: { key: 'rcAgentTools.installEngineSummary' } });
    expect(confirmed[0]!.summary).toContain('0.9.1');
    expect(confirmed[0]!.summary).toContain('Apache-2.0');
    expect(confirmed[0]!.summary).toContain(offer.url);
    expect(installs).toEqual([{ name: 'audiocpp', consent: true, via: 'agent-approval', commandId: 'cmd_1-engine' }]);
    expect(result).toMatchObject({ jobId: null, engine: { tool: 'audiocpp', jobId: 'job_engine', version: '0.9.1' } });
    expect(result.next).toContain('engine.jobId');
  });

  it('权重与引擎都要装：两次确认，结果同时带模型包与引擎的任务', async () => {
    const { tools, confirmed, installs } = harness(engine({}), false);
    const result = (await tools.dispatch('models_install', { bundleId: MUSIC }, agent)) as Record<string, any>;
    expect(confirmed.map((c) => c.summaryRef?.key)).toEqual(['rcAgentTools.installModelSummary', 'rcAgentTools.installEngineSummary']);
    expect(installs).toHaveLength(1);
    expect(result).toMatchObject({ jobId: 'job_model', engine: { jobId: 'job_engine' } });
  });

  it('引擎已装好、在装、或不是音乐模型包：不确认也不重复安装', async () => {
    const installed = harness(engine({ state: 'installed', version: '0.9.1', source: 'managed', path: '/x/audiocpp_cli' }));
    const a = (await installed.tools.dispatch('models_install', { bundleId: MUSIC }, agent)) as Record<string, any>;
    expect(a.engine).toBeUndefined();
    expect(installed.confirmed).toEqual([]);

    const running = harness(engine({ installJobId: 'job_running' }));
    const b = (await running.tools.dispatch('models_install', { bundleId: MUSIC }, agent)) as Record<string, any>;
    expect(b.engine).toMatchObject({ jobId: 'job_running' });
    expect(running.installs).toEqual([]);
    expect(running.confirmed).toEqual([]);

    const other = harness(engine({}));
    const c = (await other.tools.dispatch('models_install', { bundleId: SPEECH }, agent)) as Record<string, any>;
    expect(c.engine).toBeUndefined();
    expect(other.installs).toEqual([]);
  });

  it('环境变量指定的引擎不能运行、或下载被拦下：不代为安装，engine 带原因与补救', async () => {
    const pinned = harness(engine({ state: 'unavailable', source: 'env', reason: '不能运行', remedy: '检查 BAOCUT_AUDIOCPP_CLI' }));
    const a = (await pinned.tools.dispatch('models_install', { bundleId: MUSIC }, agent)) as Record<string, any>;
    expect(a.engine).toMatchObject({ jobId: null, state: 'unavailable', reason: '不能运行', remedy: '检查 BAOCUT_AUDIOCPP_CLI' });
    expect(pinned.installs).toEqual([]);
    expect(pinned.confirmed).toEqual([]);
    expect(a.next).toContain('engine.reason');

    const blocked = harness(engine({ offer: { ...offer, blockedReason: '严格离线：不下载' } }));
    const b = (await blocked.tools.dispatch('models_install', { bundleId: MUSIC }, agent)) as Record<string, any>;
    expect(b.engine).toMatchObject({ jobId: null, remedy: '严格离线：不下载' });
    expect(blocked.installs).toEqual([]);
  });
});

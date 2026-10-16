import { describe, expect, it } from 'vitest';
import { ModelInstallTools, type ModelInstallToolsDeps } from './model-install-tools.ts';
import { toolRisk, type ToolConfirmation, type ToolPrincipal } from './tool-scope.ts';

/**
 * `models_install` 与音乐模型包（架构设计 §6.3、§6.5）：audio.cpp 引擎随应用内置，不是模型包的组件；安装计划里只有模型自己的
 * 权重，一次确认，没有另外的引擎确认与 `engine` 结果。模型安装与范围都是假的。
 */

const MUSIC = 'yue2-3b@audio-cpp-q8';
const agent = { kind: 'agent', conversationId: 'conv_1' } as unknown as ToolPrincipal;

function harness(upToDate: boolean) {
  const confirmed: ToolConfirmation[] = [];
  const submitted: Array<{ bundleId: string; confirmBytes?: number }> = [];
  const plan = (bundleId: string) => ({
    bundleId,
    upToDate,
    components: upToDate
      ? []
      : [
          { component: 'music', repo: 'audio-cpp/Yue2-3B-GGUF', revision: 'r', action: 'download', files: ['m.gguf'], bytes: 1000 },
        ],
    downloadBytes: upToDate ? 0 : 1000,
    estimatedBytes: 1000,
    confirmBytes: upToDate ? 0 : 1000,
    resumedBytes: 0,
    availableBytes: null,
    source: 'https://hf.example',
  });
  const deps = {
    installs: {
      install: async (request: { bundleId: string; confirmBytes?: number }) => {
        if (request.confirmBytes !== undefined) submitted.push(request);
        return { plan: plan(request.bundleId), jobId: request.confirmBytes !== undefined ? 'job_model' : null };
      },
    },
    catalog: { list: async () => [] },
    scope: {
      authorize: (principal: ToolPrincipal) => ({ principal, submitter: { kind: 'agent', id: 'conv_1' } }),
      confirm: async (_access: unknown, request: ToolConfirmation) => {
        confirmed.push(request);
        return { mode: 'auto', risk: toolRisk(request), decidedBy: 'auto' };
      },
      commandId: (_access: unknown, id: string) => id,
    },
  } as unknown as ModelInstallToolsDeps;
  return { tools: new ModelInstallTools(deps), confirmed, submitted };
}

describe('models_install 与音乐模型包', () => {
  it('要下载：一次确认，部件只有模型的权重；结果只有模型包的任务、没有引擎', async () => {
    const { tools, confirmed, submitted } = harness(false);
    const result = (await tools.dispatch('models_install', { bundleId: MUSIC, commandId: 'cmd_1' }, agent)) as Record<string, any>;
    expect(confirmed.map((c) => c.summaryRef?.key)).toEqual(['rcAgentTools.installModelSummary']);
    expect(confirmed[0]!.summary).toContain('audio-cpp/Yue2-3B-GGUF');
    expect(submitted).toEqual([{ bundleId: MUSIC, confirmBytes: 1000, commandId: 'cmd_1' }]);
    expect(result).toMatchObject({ jobId: 'job_model', downloadBytes: 1000 });
    expect(result.components.map((c: { component: string }) => c.component)).toEqual(['music']);
    expect(result.engine).toBeUndefined();
  });

  it('已经装好：不确认，不提交', async () => {
    const { tools, confirmed, submitted } = harness(true);
    const result = (await tools.dispatch('models_install', { bundleId: MUSIC }, agent)) as Record<string, any>;
    expect(confirmed).toEqual([]);
    expect(submitted).toEqual([]);
    expect(result).toMatchObject({ jobId: null });
    expect(result.engine).toBeUndefined();
  });
});

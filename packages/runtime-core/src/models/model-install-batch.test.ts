import { describe, expect, it } from 'vitest';
import type { InstallPlanDetail, PlannedComponent } from '@baocut/models';
import { mergeInstallPlans } from './model-install-batch.ts';
import { methodParamSchemas } from '@baocut/protocol/schemas';
import { webMethodAccess } from '@baocut/protocol';

function detail(bundleId: string, patch: Partial<PlannedComponent> = {}): InstallPlanDetail {
  const c: PlannedComponent = {
    component: 'litertlm-runtime', source: { family: 'litertlm-runtime', repo: 'test/shared', revision: 'v1' },
    action: 'download', fetch: [{ path: 'library.zip', size: 100, sha256: 'a'.repeat(64) }],
    reuse: [], files: [], staged: 30, bytes: 70, estimatedBytes: 80, ...patch,
  };
  return {
    components: [c], endpoint: 'https://models.example', endpoints: { 'test/shared@v1': null }, toolsEndpoint: null, repair: false, dir: null, totalBytes: 100,
    plan: {
      bundleId, components: [{ component: c.component, repo: c.source.repo, revision: c.source.revision,
        origin: 'github-release', action: c.action, files: c.fetch.map((f) => f.path), bytes: c.bytes, source: 'https://github.com/test/shared/releases' }],
      downloadBytes: c.bytes, estimatedBytes: c.estimatedBytes, confirmBytes: c.bytes ?? c.estimatedBytes,
      resumedBytes: c.staged, availableBytes: 1000, source: 'https://github.com',
      dir: { path: '/models', modelsDir: '/models', locked: false, fixed: false, problem: null }, upToDate: c.action === 'keep',
    },
  };
}

describe('一次确认多个模型包', () => {
  it('拒绝重复模型、带凭据或非 HTTP 下载源，Web 不能请求批量安装', () => {
    const schema = methodParamSchemas['models.installBatch'];
    expect(schema.safeParse({ bundleIds: ['text'], sources: { 'repo@v1': null } }).success).toBe(true);
    for (const endpoint of ['file:///tmp/models', 'https://user:secret@example.com', 'https://example.com?token=secret']) {
      expect(schema.safeParse({ bundleIds: ['text'], sources: { 'repo@v1': endpoint } }).success).toBe(false);
    }
    expect(schema.safeParse({ bundleIds: ['text', 'text'] }).success).toBe(false);
    expect(schema.safeParse({ bundleIds: ['text'], dir: '/Volumes/SSD/models' }).success).toBe(true);
    expect(schema.safeParse({ bundleIds: ['text'], dir: null }).success).toBe(true);
    expect(schema.safeParse({ bundleIds: ['text'], dir: 'relative/models' }).success).toBe(false);
    expect(webMethodAccess('models.installBatch', { readOnly: false, methods: null })).toBe('not-allowed');
  });

  it('共享组件、续传和未知大小的估算各算一次，保留全部使用者及来源锁定状态', () => {
    const first = detail('text', { bytes: null });
    const second = detail('multimodal', { bytes: null });
    second.plan.availableBytes = 900;
    const plan = mergeInstallPlans([first, second], { models: false, tools: true });
    expect(plan).toMatchObject({ downloadBytes: null, estimatedBytes: 80, confirmBytes: 80, resumedBytes: 30, availableBytes: 900 });
    expect(plan.components).toHaveLength(1);
    expect(plan.components[0]).toMatchObject({ bundleIds: ['text', 'multimodal'], sourceLocked: true, endpoint: null });
  });

  it('存放位置：有暂停在某处的下载时报告那里，否则是请求的位置', () => {
    const first = detail('text');
    const second = detail('multimodal');
    second.plan.dir = { path: '/Volumes/SSD/models', modelsDir: '/models', locked: false, fixed: true, problem: null };
    expect(mergeInstallPlans([first, second], { models: false, tools: false }).dir).toEqual(second.plan.dir);
    expect(mergeInstallPlans([first], { models: false, tools: false }).dir).toEqual(first.plan.dir);
  });

  it('计划之间已完成的共享组件保留、不再计入下载；不同版本不合并', () => {
    const missing = detail('text');
    const installed = detail('multimodal', { action: 'keep', bytes: 0 });
    expect(mergeInstallPlans([missing, installed], { models: false, tools: false })).toMatchObject({
      confirmBytes: 0, resumedBytes: 0, upToDate: true, components: [{ action: 'keep', bundleIds: ['text', 'multimodal'] }],
    });
    const different = detail('other', { source: { ...missing.components[0]!.source, revision: 'v2' } });
    const plan = mergeInstallPlans([missing, different], { models: false, tools: false });
    expect(plan.components).toHaveLength(2);
    expect(plan.confirmBytes).toBe(140);
  });
});

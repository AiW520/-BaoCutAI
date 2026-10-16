import { describe, expect, it, vi } from 'vitest';
import type { JobRecord, ModelCapabilitiesView } from '@baocut/protocol';
import { remoteCalls } from './active-work.ts';

const view = {
  transcribe: { providers: [{ providerId: 'openai', label: 'OpenAI' }] },
  generateText: { providers: [{ providerId: 'openai', label: 'OpenAI' }, { providerId: 'agent:codex', label: 'Codex' }] },
} as unknown as ModelCapabilitiesView;

const jobs = [
  { jobId: 'job_t', kind: 'transcribe' },
  {
    jobId: 'job_s',
    kind: 'pipeline-step',
    step: { pipeline: 'translate', name: 'translate', label: 'Translate', labelRef: { key: 'step.translate' }, index: 1 },
  },
] as unknown as JobRecord[];

describe('在途的外发调用', () => {
  it('没有在途调用时不取任务与模型服务视图', () => {
    const readView = vi.fn();
    expect(remoteCalls([], () => jobs, readView)).toEqual([]);
    expect(readView).not.toHaveBeenCalled();
  });

  it('对上任务种类、Provider 名与流程步骤', () => {
    expect(
      remoteCalls(
        [
          { jobId: 'job_t', recipient: 'openai' },
          { jobId: 'job_s', recipient: 'agent:codex' },
        ],
        () => jobs,
        () => view,
      ),
    ).toEqual([
      { kind: 'transcribe', provider: 'OpenAI' },
      { kind: 'pipeline-step', provider: 'Codex', step: { label: 'Translate', labelRef: { key: 'step.translate' } } },
    ]);
  });

  it('同一任务交给同一接收方的几次调用只算一项', () => {
    const calls = remoteCalls(
      [
        { jobId: 'job_s', recipient: 'agent:codex' },
        { jobId: 'job_s', recipient: 'agent:codex' },
        { jobId: 'job_s', recipient: 'openai' },
      ],
      () => jobs,
      () => view,
    );
    expect(calls.map((call) => call.provider)).toEqual(['Codex', 'OpenAI']);
  });

  it('没有任务记录的调用种类为 null，找不到 Provider 名时用 providerId', () => {
    expect(remoteCalls([{ jobId: null, recipient: 'custom:mine' }], () => jobs, () => view)).toEqual([{ kind: null, provider: 'custom:mine' }]);
  });
});

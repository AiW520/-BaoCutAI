import { describe, expect, it } from 'vitest';
import { LINK_IMPORT_PIPELINE } from '@baocut/jobs';
import type { JobRecord, PipelineRun } from '@baocut/protocol';
import { linkImportTitle, retitleFromLinkImports } from './conversation-titles.ts';

/** 会话标题跟着链接素材走：从链接下载任务里取标题，每个任务只交给 Harness 一次。 */

const run = (over: Partial<PipelineRun> = {}): PipelineRun => ({
  name: LINK_IMPORT_PIPELINE,
  params: { url: 'https://x.com/a/status/1' },
  steps: [
    { name: 'resolve', label: 'Resolve', status: 'pending', jobId: null, attempts: 0, output: null },
    { name: 'download', label: 'Download', status: 'pending', jobId: null, attempts: 0, output: null },
  ],
  current: 0,
  stoppedAt: null,
  summary: null,
  ...over,
});

const resolved = (title: unknown) =>
  run({
    steps: [
      { name: 'resolve', label: 'Resolve', status: 'completed', jobId: 'job_r', attempts: 1, output: { metadata: { title, platform: 'X' } } },
      { name: 'download', label: 'Download', status: 'running', jobId: 'job_d', attempts: 1, output: null },
    ],
    current: 1,
  });

const job = (pipeline: PipelineRun | undefined, submitter: JobRecord['submitter'] = { kind: 'agent', id: 'conv_1', taskId: 'task_1' }) =>
  ({ jobId: 'job_1', submitter, pipeline }) as JobRecord;

describe('linkImportTitle', () => {
  it('解析那一步有标题时就取，完成后取结果摘要', () => {
    expect(linkImportTitle(job(run()))).toBeNull();
    expect(linkImportTitle(job(resolved('  Quantum talk  ')))).toEqual({ conversationId: 'conv_1', title: 'Quantum talk' });
    expect(linkImportTitle(job({ ...resolved('Old'), summary: { title: 'Final title' } }))).toEqual({ conversationId: 'conv_1', title: 'Final title' });
  });

  it('不是会话里的智能体提交的、不是链接下载、标题为空时不算', () => {
    expect(linkImportTitle(job(resolved('Talk'), { kind: 'connection', id: 'client_1' }))).toBeNull();
    expect(linkImportTitle(job({ ...resolved('Talk'), name: 'transcribe' }))).toBeNull();
    expect(linkImportTitle(job(undefined))).toBeNull();
    expect(linkImportTitle(job(resolved('   ')))).toBeNull();
    expect(linkImportTitle(job(resolved(42)))).toBeNull();
  });
});

describe('retitleFromLinkImports', () => {
  it('每个任务解析出标题后只交一次', () => {
    let listener: ((record: JobRecord) => void) | undefined;
    const calls: [string, string][] = [];
    retitleFromLinkImports(
      { onChange: (l) => ((listener = l), () => {}) },
      { retitleIfAuto: (conversationId, title) => (calls.push([conversationId, title]), true) },
    );
    listener!(job(run()));
    listener!(job(resolved('Talk')));
    listener!(job({ ...resolved('Talk'), summary: { title: 'Talk' } }));
    expect(calls).toEqual([['conv_1', 'Talk']]);
  });
});

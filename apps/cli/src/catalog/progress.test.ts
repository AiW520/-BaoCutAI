import { PassThrough } from 'node:stream';
import { describe, expect, it } from 'vitest';
import { M } from '../cli-copy.ts';
import { jobRecord } from '../testing/fake-client.ts';
import { ProgressReporter } from './progress.ts';

function capture(mode: 'jsonl' | 'text') {
  const stream = new PassThrough();
  let out = '';
  stream.on('data', (chunk) => (out += String(chunk)));
  return { reporter: new ProgressReporter(mode, stream), read: () => out };
}

const image = (done: number, remainingSec: number | null) =>
  jobRecord({ jobId: 'job_1', state: 'running', phase: 'generating', progress: { done, total: 8, unit: 'steps', remainingSec } });

describe('ProgressReporter（Agent 面设计 §5.1）', () => {
  it('jsonl：progress 事件带 done、total、unit；本机生图按步时带 remainingSec（算不出时 null）', () => {
    const { reporter, read } = capture('jsonl');
    reporter.update(image(0, null));
    reporter.update(image(3, 20));
    const events = read().trim().split('\n').map((line) => JSON.parse(line));
    expect(events).toEqual([
      { type: 'progress', jobId: 'job_1', state: 'running', stage: 'generating', pct: 0, done: 0, total: 8, unit: 'steps', remainingSec: null },
      { type: 'progress', jobId: 'job_1', state: 'running', stage: 'generating', pct: 37.5, done: 3, total: 8, unit: 'steps', remainingSec: 20 },
    ]);
  });

  it('jsonl：没有预计剩余的进度不写 remainingSec；没有进度不写 done/total/unit', () => {
    const { reporter, read } = capture('jsonl');
    reporter.update(jobRecord({ jobId: 'job_2', state: 'running', phase: 'starting', progress: null }));
    reporter.update(jobRecord({ jobId: 'job_2', state: 'running', phase: 'transcribing', progress: { done: 30, total: 60, unit: 'seconds' } }));
    const [first, second] = read().trim().split('\n').map((line) => JSON.parse(line));
    expect(first).not.toHaveProperty('done');
    expect(second).toMatchObject({ done: 30, total: 60, unit: 'seconds', pct: 50 });
    expect(second).not.toHaveProperty('remainingSec');
  });

  it('文字：按步写 3/8，有预计剩余时接剩余时间', () => {
    const { reporter, read } = capture('text');
    reporter.update(image(0, null));
    reporter.update(image(3, 75));
    expect(read().trim().split('\n')).toEqual([
      'job_1 · running · generating 0% 0/8',
      `job_1 · running · generating 38% 3/8 · ${M.jobRemaining('1:15')}`,
    ]);
  });
});

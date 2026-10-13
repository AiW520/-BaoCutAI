import { describe, expect, it } from 'vitest';
import { StepPace } from './step-pace.ts';

describe('StepPace', () => {
  it('从第一次进度量起，按平均步速推剩下的步数；一步没走完或走完了都不报', () => {
    const pace = new StepPace();
    expect(pace.observe(0, 8, 10_000)).toBeNull();
    expect(pace.observe(1, 8, 12_000)).toBe(14);
    expect(pace.observe(2, 8, 15_000)).toBe(15);
    expect(pace.observe(8, 8, 30_000)).toBeNull();
  });

  it('加载模型的时间不算进步速：第一次进度不是 0/N 时也从它量起', () => {
    const pace = new StepPace();
    expect(pace.observe(3, 8, 60_000)).toBeNull();
    expect(pace.observe(4, 8, 61_000)).toBe(4);
  });

  it('进度回退（重试的新一次）从头量', () => {
    const pace = new StepPace();
    pace.observe(0, 8, 0);
    pace.observe(4, 8, 40_000);
    expect(pace.observe(0, 8, 100_000)).toBeNull();
    expect(pace.observe(1, 8, 101_000)).toBe(7);
  });
});

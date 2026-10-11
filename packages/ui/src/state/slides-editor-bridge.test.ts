import { describe, expect, it } from 'vitest';
import { flushSlides, registerSlidesFlush, useSlidesReveal } from './slides-editor-bridge.ts';

describe('slides-editor-bridge', () => {
  it('发送前只等这几份 deck 打开着的编辑器；返回没保存成的那几份的名字，注销后不再等', async () => {
    const calls: string[] = [];
    const offA = registerSlidesFlush('a', { flush: async () => (calls.push('a'), true), name: () => '甲' });
    const offB = registerSlidesFlush('b', { flush: async () => (calls.push('b'), false), name: () => '乙' });
    const offC = registerSlidesFlush('c', { flush: () => Promise.reject(new Error('gone')), name: () => '丙' });
    // 同一份 deck 开在两个标签里：都没保存成也只写一次名字
    const offC2 = registerSlidesFlush('c', { flush: async () => false, name: () => '丙' });
    expect(await flushSlides([])).toEqual([]);
    expect(await flushSlides(['a', 'a', 'missing'])).toEqual([]);
    expect(calls).toEqual(['a']);
    expect(await flushSlides(['a', 'b'])).toEqual(['乙']);
    expect(await flushSlides(['c', 'b'])).toEqual(['丙', '乙']);
    offB();
    offC();
    offC2();
    expect(await flushSlides(['b', 'c'])).toEqual([]);
    offA();
  });

  it('跳转的要求按 deck 存，取走时只认同一次（再点一次是新的）', () => {
    const { request } = useSlidesReveal.getState();
    request('d1', 'n1', 's01#title');
    const first = useSlidesReveal.getState().reveals.d1!;
    request('d1', 'n1', 's01#title');
    const second = useSlidesReveal.getState().reveals.d1!;
    expect(second.seq).toBeGreaterThan(first.seq);
    useSlidesReveal.getState().take('d1', first.seq);
    expect(useSlidesReveal.getState().reveals.d1).toEqual(second);
    useSlidesReveal.getState().take('d1', second.seq);
    expect(useSlidesReveal.getState().reveals).toEqual({});
  });
});

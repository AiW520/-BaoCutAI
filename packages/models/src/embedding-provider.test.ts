import { describe, expect, it } from 'vitest';
import { PROMPT_PAIR_MODEL_CARD, formatEmbeddingInput, truncateAndNormalize } from './embedding-provider.ts';

describe('EmbeddingGemma 2 的输入前缀（G0 选定 model-card-v1）', () => {
  it('检索的问句与文档、对称比较各用模型卡的前缀；首尾空白去掉', () => {
    expect(formatEmbeddingInput(PROMPT_PAIR_MODEL_CARD, 'query', { text: '  camera battery \n' })).toBe('task: search result | query: camera battery');
    expect(formatEmbeddingInput(PROMPT_PAIR_MODEL_CARD, 'document', { text: 'Charge it first. ' })).toBe('title: none | text: Charge it first.');
    expect(formatEmbeddingInput(PROMPT_PAIR_MODEL_CARD, 'document', { text: 'x', title: ' Intro ' })).toBe('title: Intro | text: x');
    expect(formatEmbeddingInput(PROMPT_PAIR_MODEL_CARD, 'symmetric', { text: 'same words ' })).toBe('task: sentence similarity | query: same words');
    expect(() => formatEmbeddingInput('litert-docs-v1', 'query', { text: 'x' })).toThrow();
  });

  it('截维后重新归一化', () => {
    const v = truncateAndNormalize([3, 4, 12], 2);
    expect(Array.from(v).map((x) => Math.round(x * 1000) / 1000)).toEqual([0.6, 0.8]);
  });
});

import { refOf, type Localized, type MessageRef } from '@baocut/protocol';
import { ModelsEmbedding as M } from '@baocut/protocol/messages/models/embedding.ts';
import { formatEmbeddingInput, PROMPT_PAIR_MODEL_CARD, type EmbeddingInput, type EmbeddingRole } from './embedding-provider.ts';

/**
 * embedding 模型包的自检（`models.test`，Model Worker 协议规范 §4.5）：一条查询、一条相关文档、一条无关文档走一遍完整的
 * Worker 流程，核对条数、维度、有限、单位长度，并且相关文档比无关文档更像查询。句子是固定的、语言混合（英文查询、中文文档），
 * 覆盖跨语言检索；阈值写在协议规范里。
 */

export const EMBEDDING_SELF_TEST = {
  inputs: [
    // i18n-ignore-start: 送进模型的固定样本，不是界面文字
    { role: 'query', input: { text: 'how did we choose the model' } },
    { role: 'document', input: { text: '我们最后选了这个模型是因为它在本地跑得快', title: null } },
    { role: 'document', input: { text: '今天天气很好，我们去公园散步', title: null } },
    // i18n-ignore-end
  ] as ReadonlyArray<{ role: EmbeddingRole; input: EmbeddingInput }>,
} as const;

export const EMBEDDING_SELF_TEST_LIMITS = {
  /** 单位长度的容差（截断后重新归一化，FP32）。 */
  normTolerance: 1e-3,
  /** 相关文档的余弦至少比无关文档高这么多（2026-10-13 用这三条在 LiteRT-LM 0.18.0 的 CPU 上实测，两个包都是 0.8237 对 0.6329）。 */
  minMargin: 0.05,
} as const;

/** 送进 Worker 的三条文本（已加前缀）。 */
export function embeddingSelfTestTexts(promptPairId: string = PROMPT_PAIR_MODEL_CARD): string[] {
  return EMBEDDING_SELF_TEST.inputs.map(({ role, input }) => formatEmbeddingInput(promptPairId, role, input));
}

export interface EmbeddingSelfTestFacts {
  dims: number;
  relevant: number;
  irrelevant: number;
}

export type EmbeddingSelfTestVerdict =
  | { passed: true; facts: EmbeddingSelfTestFacts }
  | { passed: false; problem: string; problemRef?: MessageRef; facts?: Partial<EmbeddingSelfTestFacts> };

/**
 * 判定 Provider 返回的向量（已截断、重新归一化）：三条、都是 `dims` 维、有限、单位长度，相关文档比无关文档的余弦高出
 * `minMargin`。不通过时 `problem` 是当前语言的文本，`problemRef` 是它的消息引用。
 */
export function embeddingSelfTestVerdict(vectors: readonly ArrayLike<number>[], dims: number): EmbeddingSelfTestVerdict {
  const failed = (problem: Localized, facts?: Partial<EmbeddingSelfTestFacts>): EmbeddingSelfTestVerdict => ({
    passed: false,
    problem: problem.text,
    problemRef: refOf(problem),
    ...(facts ? { facts } : {}),
  });
  const expected = EMBEDDING_SELF_TEST.inputs.length;
  if (vectors.length !== expected) return failed(M.countMismatch({ expected, actual: vectors.length }));
  for (const vector of vectors) {
    if (vector.length !== dims) return failed(M.wrongDims({ expected: dims, actual: vector.length }));
    let sum = 0;
    for (let i = 0; i < vector.length; i++) {
      const v = vector[i]!;
      if (!Number.isFinite(v)) return failed(M.notFinite());
      sum += v * v;
    }
    const norm = Math.sqrt(sum);
    if (Math.abs(norm - 1) > EMBEDDING_SELF_TEST_LIMITS.normTolerance) return failed(M.notNormalized({ norm: norm.toFixed(4) }));
  }
  const [query, relevantDoc, irrelevantDoc] = vectors as [ArrayLike<number>, ArrayLike<number>, ArrayLike<number>];
  const relevant = dot(query, relevantDoc);
  const irrelevant = dot(query, irrelevantDoc);
  const facts = { dims, relevant, irrelevant };
  if (relevant < irrelevant + EMBEDDING_SELF_TEST_LIMITS.minMargin) {
    return failed(M.notRanked({ relevant: relevant.toFixed(4), irrelevant: irrelevant.toFixed(4) }), facts);
  }
  return { passed: true, facts };
}

function dot(a: ArrayLike<number>, b: ArrayLike<number>): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i]! * b[i]!;
  return sum;
}

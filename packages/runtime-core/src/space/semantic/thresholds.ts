import raw from './semantic-thresholds.json' with { type: 'json' };

/**
 * 语义检索的可调参数（创作辅助集成设计 §3.10）：融合常数、每路候选量、分片大小与各消费者的阈值集中在
 * `semantic-thresholds.json`，随应用发布，带 `rankingVersion`。每一项都标 `calibrated`：在标注集（v0.1 §18.1）校准之前全是
 * `false`，只是初始默认值，不是相关性真理；界面不把它们暴露成滑块。
 */

export interface Tunable {
  value: number;
  calibrated: boolean;
}

export interface SemanticThresholds {
  rankingVersion: string;
  fusion: {
    k: Tunable;
    weights: { lexical: Tunable; semantic: Tunable };
    perRouteCandidates: Tunable;
    mergedCandidates: Tunable;
  };
  chunking: { targetTokens: Tunable; minTokens: Tunable; maxTokens: Tunable; overlapSentences: Tunable };
  /** `related`：相关视频里一部视频最近的那段与这部视频整体（讲话向量的平均）的余弦下限（创作辅助集成设计 §2.4）。 */
  thresholds: { weakHit: Tunable; reuse: Tunable; retake: Tunable; glossary: Tunable; related: Tunable };
  /** 章节边界候选（创作辅助集成设计 §3.6）：深度阈值 = 中位数 + k·MAD，两侧窗口几个句群，最短章节秒数，最多几章。 */
  chapterBoundary: { k: Tunable; window: Tunable; minChapterSec: Tunable; maxChapters: Tunable };
  /**
   * 编辑辅助（§3.7、§3.8）：重录的比较窗口（秒）、「没说完」的时长比、参与比较的最短句（规范化后的字符数）；术语候选的字符相似度
   * 复核线与送去编码的窗口上限；发现术语的最少出现次数与写法相似度。
   */
  aids: {
    retakeWindowSec: Tunable;
    retakeShortRatio: Tunable;
    retakeMinChars: Tunable;
    glossaryCharSimilarity: Tunable;
    glossaryMaxWindows: Tunable;
    discoveryMinCount: Tunable;
    discoveryCharSimilarity: Tunable;
    memoryReference: Tunable;
    memoryMinChars: Tunable;
    memoryReferencesPerSentence: Tunable;
    memoryReferenceTotal: Tunable;
    memoryMaxVideos: Tunable;
    memoryPairPool: Tunable;
  };
}

function check(value: unknown, path: string): Tunable {
  const t = value as Tunable | undefined;
  if (!t || typeof t.value !== 'number' || !Number.isFinite(t.value) || typeof t.calibrated !== 'boolean') {
    throw new Error(`semantic-thresholds.json: ${path} must be { value: number, calibrated: boolean }`);
  }
  return t;
}

/** 读入并核对形状（坏了就让启动失败，不带着缺项的默认值跑）。 */
export function parseThresholds(input: unknown): SemanticThresholds {
  const t = input as SemanticThresholds;
  if (!t || typeof t.rankingVersion !== 'string' || t.rankingVersion === '') throw new Error('semantic-thresholds.json: rankingVersion missing');
  check(t.fusion?.k, 'fusion.k');
  check(t.fusion?.weights?.lexical, 'fusion.weights.lexical');
  check(t.fusion?.weights?.semantic, 'fusion.weights.semantic');
  check(t.fusion?.perRouteCandidates, 'fusion.perRouteCandidates');
  check(t.fusion?.mergedCandidates, 'fusion.mergedCandidates');
  for (const key of ['targetTokens', 'minTokens', 'maxTokens', 'overlapSentences'] as const) check(t.chunking?.[key], `chunking.${key}`);
  for (const key of ['weakHit', 'reuse', 'retake', 'glossary', 'related'] as const) check(t.thresholds?.[key], `thresholds.${key}`);
  for (const key of ['k', 'window', 'minChapterSec', 'maxChapters'] as const) check(t.chapterBoundary?.[key], `chapterBoundary.${key}`);
  for (const key of [
    'retakeWindowSec',
    'retakeShortRatio',
    'retakeMinChars',
    'glossaryCharSimilarity',
    'glossaryMaxWindows',
    'discoveryMinCount',
    'discoveryCharSimilarity',
    'memoryReference',
    'memoryMinChars',
    'memoryReferencesPerSentence',
    'memoryReferenceTotal',
    'memoryMaxVideos',
    'memoryPairPool',
  ] as const)
    check(t.aids?.[key], `aids.${key}`);
  return t;
}

export const SEMANTIC_THRESHOLDS: SemanticThresholds = parseThresholds(raw);

/** 融合与分路的版本：随结果返回（`rankingVersion`），也进分页游标。 */
export const RANKING_VERSION = SEMANTIC_THRESHOLDS.rankingVersion;

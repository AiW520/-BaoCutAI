import type { Id, TranslateMemoryUse } from '@baocut/protocol';
import type { TranslationBody } from './translation-document.ts';

/**
 * 翻译记忆（创作辅助集成设计 §2.6、§3.7）。查找由 Runtime 实现（用户其他视频里同一语言方向的已有译文，本机）：
 *
 * - **沿用**：原文规范化（NFKC、小写、去掉标点与空白）之后相同的句子，用已有译法；交给 Speech Worker 预先填进译文表，不再送翻
 *   （照样对齐、切字幕条）。写出的单元里输出与已有译文相同的才标 `reuse`。
 * - **参考**：语义相近（对称编码，阈值未校准）的已有译句，每句最多 3 条，附在送翻的提示里；只作参考，不是要求。
 */
export interface TranslationMemoryLookup {
  reuse: Array<{ sentenceId: Id; text: string; fromVideoId: Id; unitId: Id }>;
  references: Array<{ sentenceId: Id; source: string; target: string; fromVideoId: Id }>;
  /** 查过的已有译文所在的视频数。 */
  videos: number;
  effectiveMode: 'semantic' | 'lexical';
  reason: string | null;
}

export interface TranslationMemory {
  lookup(request: {
    videoId: Id;
    sourceLanguage: string | null;
    targetLanguage: string;
    sentences: Array<{ id: Id; text: string }>;
    signal: AbortSignal;
  }): Promise<TranslationMemoryLookup>;
}

/** Speech Worker 的 `memory` 输入：沿用的译句（句子 ID → 译文）与参考（原句 → 已有译句）。 */
export interface SpeechWorkerMemory {
  reuse: Array<{ sentenceId: Id; text: string }>;
  references: Array<{ source: string; target: string }>;
}

export function workerMemory(lookup: TranslationMemoryLookup): SpeechWorkerMemory | null {
  if (lookup.reuse.length === 0 && lookup.references.length === 0) return null;
  return {
    reuse: lookup.reuse.map(({ sentenceId, text }) => ({ sentenceId, text })),
    references: lookup.references.map(({ source, target }) => ({ source, target })),
  };
}

/**
 * 写出的译文里标沿用：单元的原句在沿用表里、且自然译句与已有译文相同（对齐不改自然译句；不同时说明 Worker 没有沿用，不标）。
 * 返回新的正文与标了几个。
 */
export function markReuse(body: TranslationBody, reuse: TranslationMemoryLookup['reuse']): { body: TranslationBody; reused: number } {
  if (reuse.length === 0) return { body, reused: 0 };
  const bySentence = new Map(reuse.map((r) => [r.sentenceId, r]));
  let reused = 0;
  const units = body.units.map((unit) => {
    const hit = bySentence.get(unit.sourceSentenceId);
    if (!hit || unit.naturalText.trim() !== hit.text.trim()) return unit;
    reused += 1;
    return { ...unit, reuse: { fromVideoId: hit.fromVideoId, unitId: hit.unitId } };
  });
  return { body: { ...body, units }, reused };
}

export function memoryUse(lookup: TranslationMemoryLookup, reused: number): TranslateMemoryUse {
  return {
    reused,
    referenced: lookup.references.length,
    videos: lookup.videos,
    effectiveMode: lookup.effectiveMode,
    reason: lookup.reason,
  };
}

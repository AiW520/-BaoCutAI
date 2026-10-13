/**
 * 重录候选（创作辅助集成设计 §2.7、§3.8）：时间线上的每句与它后面窗口内（`aids.retakeWindowSec`）的句子比较，语义几乎相同
 * （对称编码相似度不低于 `thresholds.retake`）或规范化后文字相同的连成一组（并查集），组内按时间排。
 *
 * 差异检查：组内各遍的数字、否定词、专有名词（`literalFeatures`）任一不同，整组列为「相似但有差异」并给出各遍的差异；不当成
 * 重复。建议保留最后一遍；最后一遍没说完（句末没有终止标点且时长明显短于最长的一遍）时建议最完整的一遍。只建议，不预勾，不剪。
 *
 * 没装语义模型时只找文字完全相同的。阈值与「明显短于」的比例都是未校准的默认值。
 */

import { createHash } from 'node:crypto';
import type { RetakeCandidatesResult, RetakeDifference, RetakeGroup, RetakeTake, SemanticReason } from '@baocut/protocol';
import { SEMANTIC_THRESHOLDS } from '../space/semantic/thresholds.ts';
import { reasonOf } from '../space/semantic/errors.ts';
import type { ContextWord } from './ai-tool-prompt.ts';
import { compareKey, endsSentence, joinWords, literalFeatures, missingFrom, type LiteralFeatures } from './text-compare.ts';

export interface RetakeInput {
  words: readonly ContextWord[];
  /** 词 → 稳定句子 ID；没有的词按句末标点切句。 */
  sentenceOf: ReadonlyMap<string, string>;
  embed?: (texts: string[], signal?: AbortSignal) => Promise<Float32Array[]>;
  unavailable?: SemanticReason;
  signal?: AbortSignal;
}

export type RetakeOutput = Pick<RetakeCandidatesResult, 'effectiveMode' | 'reason' | 'groups'>;

const AIDS = SEMANTIC_THRESHOLDS.aids;
const RETAKE_THRESHOLD = SEMANTIC_THRESHOLDS.thresholds.retake.value;

interface Sentence {
  id: string;
  wordIds: string[];
  start: number;
  end: number;
  text: string;
  key: string;
}

/** 时间线上的词 → 句子（同一个句子 ID 的相邻词；没有句子 ID 时按句末标点切）。 */
export function timelineSentences(words: readonly ContextWord[], sentenceOf: ReadonlyMap<string, string>): Sentence[] {
  const out: Sentence[] = [];
  let current: { id: string; mapped: boolean; words: ContextWord[] } | null = null;
  const flush = () => {
    if (!current || current.words.length === 0) return;
    const text = joinWords(current.words.map((w) => w.text));
    const last = current.words.at(-1)!;
    out.push({ id: current.id, wordIds: current.words.map((w) => w.id), start: current.words[0]!.start, end: last.end ?? last.start, text, key: compareKey(text) });
    current = null;
  };
  for (const word of words) {
    const id = sentenceOf.get(word.id) ?? null;
    if (current && (word.paragraphStart || (id !== null ? id !== current.id : current.mapped))) flush();
    current ??= { id: id ?? `s-${word.id}`, mapped: id !== null, words: [] };
    current.words.push(word);
    if (id === null && endsSentence(word.text)) flush();
  }
  flush();
  return out;
}

function cosine(a: Float32Array, b: Float32Array): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  for (let i = 0; i < n; i++) dot += a[i]! * b[i]!;
  return dot;
}

const KINDS: RetakeDifference[] = ['number', 'negation', 'name'];

export async function retakeCandidates(input: RetakeInput): Promise<RetakeOutput> {
  const sentences = timelineSentences(input.words, input.sentenceOf).filter((s) => [...s.key].length >= AIDS.retakeMinChars.value);
  const window = AIDS.retakeWindowSec.value;
  let effectiveMode: RetakeOutput['effectiveMode'] = 'lexical';
  let reason: SemanticReason | null = input.embed ? null : (input.unavailable ?? 'MODEL_NOT_INSTALLED');
  let vectors: Float32Array[] | null = null;
  if (input.embed && sentences.length > 1) {
    try {
      vectors = await input.embed(
        sentences.map((s) => s.text),
        input.signal,
      );
      effectiveMode = 'semantic';
    } catch (error) {
      if (input.signal?.aborted) throw error;
      reason = reasonOf(error);
    }
  } else if (input.embed) effectiveMode = 'semantic';

  const parent = sentences.map((_, i) => i);
  const find = (i: number): number => {
    while (parent[i] !== i) i = parent[i] = parent[parent[i]!]!;
    return i;
  };
  for (let i = 0; i < sentences.length; i++) {
    for (let j = i + 1; j < sentences.length; j++) {
      if (sentences[j]!.start - sentences[i]!.end > window) break;
      const same = sentences[i]!.key === sentences[j]!.key || (vectors !== null && cosine(vectors[i]!, vectors[j]!) >= RETAKE_THRESHOLD);
      if (same) parent[find(j)] = find(i);
    }
  }
  const members = new Map<number, number[]>();
  sentences.forEach((_, i) => members.set(find(i), [...(members.get(find(i)) ?? []), i]));

  const groups: RetakeGroup[] = [];
  for (const list of members.values()) {
    if (list.length < 2) continue;
    const takes = list.map((i) => sentences[i]!);
    const features = takes.map((t) => literalFeatures(t.text));
    const differences = KINDS.filter((kind) => features.some((a, x) => features.some((b, y) => x !== y && missingFrom(a[kind], b[kind]).length > 0)));
    const out: RetakeTake[] = takes.map((take, x) => ({
      sentenceId: take.id,
      wordIds: take.wordIds,
      start: take.start,
      end: take.end,
      text: take.text,
      complete: endsSentence(take.text),
      marks: marksOf(features, x),
    }));
    groups.push({
      id: `rt-${createHash('sha1').update(takes.map((t) => t.id).join('\u0000')).digest('hex').slice(0, 12)}`,
      takes: out,
      keep: suggestKeep(out),
      differ: differences.length > 0,
      differences,
    });
  }
  groups.sort((a, b) => a.takes[0]!.start - b.takes[0]!.start);
  return { effectiveMode, reason, groups };
}

/** 这一遍里有、另外某一遍里没有的数字、否定词与专有名词。 */
function marksOf(features: readonly LiteralFeatures[], x: number): string[] {
  const out = new Set<string>();
  features.forEach((other, y) => {
    if (y === x) return;
    for (const kind of KINDS) for (const value of missingFrom(features[x]![kind], other[kind])) out.add(value);
  });
  return [...out];
}

/** 建议保留哪一遍：最后一遍，除非它没说完且明显短；那时取最后一个说完的，都没说完时取最长的。 */
export function suggestKeep(takes: readonly Pick<RetakeTake, 'start' | 'end' | 'complete'>[]): number {
  const durations = takes.map((t) => t.end - t.start);
  const longest = Math.max(...durations);
  const last = takes.length - 1;
  if (takes[last]!.complete || durations[last]! >= longest * AIDS.retakeShortRatio.value) return last;
  for (let i = last; i >= 0; i--) if (takes[i]!.complete) return i;
  return durations.indexOf(longest);
}

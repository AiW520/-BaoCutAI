import crypto from 'node:crypto';
import type { Id, SemanticEvidenceType, SpaceSearchDocumentKind } from '@baocut/protocol';
import type { ContentSegment } from '../content-extract.ts';
import { SEMANTIC_THRESHOLDS } from './thresholds.ts';

/**
 * 文字分片（EmbeddingGemma 2 检索集成方案 v0.1 §6、§6.1）：内容抽取给出的句子段落（`ContentSegment`，带稳定的 sentenceIds）
 * 按文档组成句群。纯函数，不碰磁盘与模型。
 *
 * - 同一份文档、同一个时钟里按顺序取句子，攒到约 `targetTokens`（估计）为一块；说话人变了且已经够 `minTokens` 时提前断开；
 *   单块不超过 `maxTokens`。相邻两块重叠一句（`overlapSentences`）。
 * - 一句本身超过上限时按上限切成几块（同一组 sentenceIds），不静默截断。
 * - 原文不清洗：块的文字就是句子原文按空格（无空格的文字直接）连起来，NFKC/小写只在字面检索里做。
 * - 章节（标题 + 简介）各自一块，证据类别 `summary`：只作导航候选，不当原话引用。
 * - chunkId 是稳定身份：视频、文档、句子身份与送进模型的文字决定它；位置（时间、顺序）不进 chunkId，移动片段只更新出现位置。
 */

export interface ChunkDraft {
  chunkId: string;
  videoId: Id;
  documentId: Id | null;
  documentKind: SpaceSearchDocumentKind;
  evidenceType: SemanticEvidenceType;
  sentenceIds: string[];
  text: string;
  clock: 'sequence' | 'source';
  start: number;
  end: number;
  speaker: string | null;
  language: string | null;
  chapter: { id: string; title: string } | null;
  /** 在这份文档里的顺序（按时间）。 */
  ord: number;
}

/** 句子级的一行：邻句扩展（`neighbors`）、字面命中对回句子身份用。 */
export interface SentenceRow {
  documentId: Id | null;
  documentKind: SpaceSearchDocumentKind;
  ord: number;
  sentenceIds: string[];
  text: string;
  clock: 'sequence' | 'source';
  start: number;
  end: number;
  speaker: string | null;
}

export interface ChunkOptions {
  targetTokens?: number;
  minTokens?: number;
  maxTokens?: number;
  overlapSentences?: number;
}

export interface ChunkedVideo {
  chunks: ChunkDraft[];
  sentences: SentenceRow[];
}

const EVIDENCE: Record<SpaceSearchDocumentKind, SemanticEvidenceType> = {
  speech: 'transcript',
  caption: 'caption',
  translation: 'translation',
  chapter: 'summary',
};

/** 中日韩文字（汉字、假名、谚文）大约一个字一个 token；其余按词，每 4 个字符约一个 token。只是估计，上限由 Provider 再核对。 */
const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

export function estimateTokens(text: string): number {
  let tokens = 0;
  let word = 0;
  const flush = () => {
    if (word > 0) tokens += Math.ceil(word / 4);
    word = 0;
  };
  for (const char of text) {
    if (CJK.test(char)) {
      flush();
      tokens += 1;
    } else if (/\s/u.test(char)) flush();
    else if (/[\p{P}\p{S}]/u.test(char)) {
      flush();
      tokens += 1;
    } else word += char.length;
  }
  flush();
  return tokens;
}

/** 两段原文连起来：两边都是中日韩文字时不加空格，否则加一个。 */
export function joinText(parts: readonly string[]): string {
  let out = '';
  for (const part of parts) {
    const text = part.trim();
    if (!text) continue;
    if (out === '') out = text;
    else {
      const last = [...out].at(-1)!;
      const first = [...text][0]!;
      out += CJK.test(last) || CJK.test(first) ? text : ` ${text}`;
    }
  }
  return out;
}

export function chunkIdOf(videoId: Id, documentId: Id | null, kind: SpaceSearchDocumentKind, sentenceIds: readonly string[], text: string): string {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify([videoId, documentId, kind, sentenceIds, text]))
    .digest('hex')
    .slice(0, 32);
}

interface Sentence {
  segment: ContentSegment;
  tokens: number;
}

export function chunkVideo(videoId: Id, segments: readonly ContentSegment[], options: ChunkOptions = {}): ChunkedVideo {
  const t = SEMANTIC_THRESHOLDS.chunking;
  const target = options.targetTokens ?? t.targetTokens.value;
  const min = options.minTokens ?? t.minTokens.value;
  const max = options.maxTokens ?? t.maxTokens.value;
  const overlap = Math.max(0, options.overlapSentences ?? t.overlapSentences.value);

  const chapters = segments
    .filter((s) => s.kind === 'chapter' && s.clock === 'sequence')
    .map((s) => ({ id: s.markerId ?? `chapter@${s.start}`, title: s.text.split('\n')[0] ?? '', start: s.start, end: s.end }))
    .sort((a, b) => a.start - b.start);
  const chapterAt = (clock: 'sequence' | 'source', at: number): { id: string; title: string } | null => {
    if (clock !== 'sequence') return null;
    let found: (typeof chapters)[number] | null = null;
    for (const chapter of chapters) {
      if (chapter.start > at) break;
      if (chapter.end > chapter.start && at >= chapter.end) continue;
      found = chapter;
    }
    return found ? { id: found.id, title: found.title } : null;
  };

  // 按文档分组，保持抽取给的顺序（转写与字幕按时间，译文按单元）。
  const groups = new Map<string, ContentSegment[]>();
  for (const segment of segments) {
    const key = `${segment.kind}\u0000${segment.documentId ?? ''}`;
    let list = groups.get(key);
    if (!list) groups.set(key, (list = []));
    list.push(segment);
  }

  const chunks: ChunkDraft[] = [];
  const sentences: SentenceRow[] = [];
  for (const list of groups.values()) {
    const first = list[0]!;
    if (first.kind === 'chapter') {
      list.forEach((segment, ord) => {
        const ids = segment.markerId ? [`marker:${segment.markerId}`] : [];
        chunks.push(draft(videoId, [segment], segment.text, ord, chapterAt(segment.clock, segment.start), ids));
      });
      continue;
    }
    list.forEach((segment, ord) =>
      sentences.push({
        documentId: segment.documentId,
        documentKind: segment.kind,
        ord,
        sentenceIds: segment.sentenceIds ?? [],
        text: segment.text,
        clock: segment.clock,
        start: segment.start,
        end: segment.end,
        speaker: segment.speaker,
      }),
    );
    const items: Sentence[] = list.map((segment) => ({ segment, tokens: estimateTokens(segment.text) }));
    let ord = 0;
    const emit = (group: Sentence[]) => {
      const segs = group.map((s) => s.segment);
      chunks.push(draft(videoId, segs, joinText(segs.map((s) => s.text)), ord++, chapterAt(segs[0]!.clock, segs[0]!.start)));
    };
    let group: Sentence[] = [];
    let tokens = 0;
    /** 当前块里有几句是从上一块重叠过来的（只有这些句子时不单独成块）。 */
    let carried = 0;
    const close = () => {
      if (group.length > carried) emit(group);
      const keep = group.length > 1 ? group.slice(-Math.min(overlap, group.length - 1)) : [];
      const fits = keep.reduce((n, s) => n + s.tokens, 0) < max;
      group = overlap > 0 && fits ? keep : [];
      carried = group.length;
      tokens = group.reduce((n, s) => n + s.tokens, 0);
    };
    for (const item of items) {
      if (item.tokens > max) {
        // 一句超过上限：先结束手上的块，这一句按上限切成几块。
        if (group.length > carried) close();
        group = [];
        carried = 0;
        tokens = 0;
        for (const part of splitByTokens(item.segment.text, max)) {
          const segs = [item.segment];
          chunks.push(draft(videoId, segs, part, ord++, chapterAt(item.segment.clock, item.segment.start)));
        }
        continue;
      }
      const last = group.at(-1)?.segment;
      const breakHere =
        group.length > carried &&
        (tokens + item.tokens > max ||
          tokens >= target ||
          last!.clock !== item.segment.clock ||
          (last!.speaker !== item.segment.speaker && tokens >= min));
      if (breakHere) close();
      if (group.length > 0 && (tokens + item.tokens > max || group.at(-1)!.segment.clock !== item.segment.clock)) {
        // 重叠句加上这一句也超了，或换了时钟（时间线投影与源时间不混在一块里）：不重叠。
        group = [];
        carried = 0;
        tokens = 0;
      }
      group.push(item);
      tokens += item.tokens;
    }
    if (group.length > carried) emit(group);
  }
  return { chunks, sentences };
}

function draft(
  videoId: Id,
  segs: readonly ContentSegment[],
  text: string,
  ord: number,
  chapter: { id: string; title: string } | null,
  ids?: string[],
): ChunkDraft {
  const head = segs[0]!;
  const sentenceIds = ids ?? [...new Set(segs.flatMap((s) => s.sentenceIds ?? []))];
  const speakers = new Set(segs.map((s) => s.speaker));
  const languages = new Set(segs.map((s) => s.language));
  return {
    chunkId: chunkIdOf(videoId, head.documentId, head.kind, sentenceIds, text),
    videoId,
    documentId: head.documentId,
    documentKind: head.kind,
    evidenceType: EVIDENCE[head.kind],
    sentenceIds,
    text,
    clock: head.clock,
    start: Math.min(...segs.map((s) => s.start)),
    end: Math.max(...segs.map((s) => s.end)),
    speaker: speakers.size === 1 ? head.speaker : null,
    language: languages.size === 1 ? head.language : null,
    chapter: head.kind === 'chapter' ? { id: head.markerId ?? `chapter@${head.start}`, title: head.text.split('\n')[0] ?? '' } : chapter,
    ord,
  };
}

/** 超长的一句按 token 上限切开（尽量在空白处断）。 */
export function splitByTokens(text: string, max: number): string[] {
  const parts: string[] = [];
  let current = '';
  for (const piece of text.split(/(\s+)/u)) {
    if (piece === '') continue;
    if (estimateTokens(current + piece) <= max) {
      current += piece;
      continue;
    }
    if (current.trim()) parts.push(current.trim());
    current = '';
    // 一个「词」本身就超过上限（长的无空格文字）：按字符切。
    if (estimateTokens(piece) > max) {
      for (const char of piece) {
        if (estimateTokens(current + char) > max) {
          parts.push(current);
          current = '';
        }
        current += char;
      }
    } else current = piece;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

import type { CitationAnchor, CitationsFile, Id } from '@baocut/protocol';
import { clockText } from './speakers-proposal.ts';

/*
 * 写作结果的出处（创作辅助集成设计 §2.1、§3.4；原型 model-writing-cites.js `stats`、`resolve`、`toMarkdown`）。
 * 出处已由 Runtime 校验并对应回原句（`summary.citations`），这里只做显示用的统计、标签与两种复制。
 */

export interface CiteStats {
  /** 正文段落（不含标题）。 */
  paras: number;
  cited: number;
  inferred: number;
  /** 模型引用了、但不是这次发出的句子，已丢弃的条数。 */
  dropped: number;
  /** 出处来自几部视频。 */
  videos: number;
}

export function citeStats(f: CitationsFile): CiteStats {
  const body = f.paragraphs.filter((p) => p.role === 'body');
  return {
    paras: body.length,
    cited: body.filter((p) => !p.inferred).length,
    inferred: body.filter((p) => p.inferred).length,
    dropped: f.droppedCites,
    videos: new Set(body.flatMap((p) => p.cites.map((c) => c.videoId))).size,
  };
}

/** 一处出处的身份（高亮当前点的那个）。 */
export function citeKey(a: CitationAnchor): string {
  return `${a.videoId}:${a.sentenceIds[0] ?? a.startSec}`;
}

/** 时间码标签：这部视频只写时间；系列里另一部写「名字 · 时间」，不知道名字时用 `other`。 */
export function citeLabel(a: CitationAnchor, o: { videoId: Id; names: ReadonlyMap<Id, string>; other: string }): string {
  const at = clockText(a.startSec);
  return a.videoId === o.videoId ? at : `${o.names.get(a.videoId) ?? o.other} · ${at}`;
}

export type CopyMode = 'plain' | 'timecodes';

/**
 * 复制的 Markdown。`plain` 去掉出处（拿去发布，就是正文本身）；`timecodes` 每段末尾留时间码（自己核对用），没有出处的段落
 * 标 `inferred`。时间码只写文字：没有能从别处点回 BaoCut 的链接。
 */
export function citedMarkdown(f: CitationsFile, mode: CopyMode, o: { videoId: Id; names: ReadonlyMap<Id, string>; other: string; inferred: string }): string {
  return f.paragraphs
    .map((p) => {
      if (mode === 'plain' || p.role === 'heading') return p.markdown;
      if (p.inferred || !p.cites.length) return `${p.markdown} *(${o.inferred})*`;
      return `${p.markdown} ${p.cites.map((c) => `[${citeLabel(c, o)}]`).join(' ')}`;
    })
    .join('\n\n');
}

/** 出处里不是这部视频的那几部（要查名字）。 */
export function otherVideos(f: CitationsFile, videoId: Id): Id[] {
  return [...new Set(f.paragraphs.flatMap((p) => p.cites.map((c) => c.videoId)).filter((id) => id !== videoId))];
}

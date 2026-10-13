import { framesToSeconds, type DocumentContent, type Id } from '@baocut/protocol';
import { sourceSentences } from '@baocut/jobs';
import type { TextPlanResult } from '../exports/export-plan.ts';
import type { VideoService } from '../videos/video-service.ts';
import type { ContextWord } from './ai-tool-prompt.ts';
import type { SentenceChapter } from './ai-tool-citations.ts';

/**
 * 写作出处要的原料（创作辅助集成设计 §3.4）：时间线上的词（引擎的文字计划，剪掉的词不在里面，与导出、配音一致）、每个词所在的
 * 稳定句子（`s-<首词 ID>`，同编辑器的句子规则）与章节标记。直接调模型的写作流程与智能体的 `speech_sentences` 共用。
 */

/** 时间线上的词（秒，`sequence` 时钟）；视频没打开或文档不在时间线上时空。 */
export async function timelineWords(videos: VideoService, videoId: Id, documentId: Id, range?: { start: number; end: number } | null): Promise<ContextWord[]> {
  const video = videos.mirror(videoId)?.video;
  if (!video) return [];
  const plan = await videos.exportPlan<TextPlanResult>(videoId, {
    kind: 'text',
    sequenceId: video.rootSequenceId,
    ranges: range ? [range] : [],
    documentIds: [documentId],
    scopeItemIds: [],
  });
  const part = plan.parts[0]?.plans[0];
  if (!part) return [];
  const offset = part.range.startSeconds;
  const seen = new Set<Id>();
  const words: ContextWord[] = [];
  for (const entry of part.entries) {
    if (seen.has(entry.id)) continue;
    seen.add(entry.id);
    words.push({
      id: entry.id,
      text: entry.text,
      paragraphStart: entry.paragraphStart === true,
      start: offset + entry.start,
      end: offset + entry.end,
      speaker: entry.speaker ?? null,
    });
  }
  return words;
}

/** 词 → 稳定句子 ID。句子规则的 WASM 不可用或文档不是讲话转写时空（不发出处，写作照常）。 */
export function sentenceMapOf(content: Pick<DocumentContent, 'body'>): Map<string, string> {
  const map = new Map<string, string>();
  let read: ReturnType<typeof sourceSentences>;
  try {
    read = sourceSentences(content.body);
  } catch {
    return map;
  }
  if ('problem' in read) return map;
  for (const sentence of read.sentences) for (const wordId of sentence.wordIds) map.set(wordId, sentence.id);
  return map;
}

/** 根序列的章节标记（秒，`sequence` 时钟）。 */
export function chapterMarksOf(videos: VideoService, videoId: Id): SentenceChapter[] {
  const video = videos.mirror(videoId)?.video;
  const sequence = video?.sequences[video.rootSequenceId];
  if (!sequence) return [];
  return sequence.markers.filter((m) => m.kind === 'chapter').map((m) => ({ at: framesToSeconds(m.frame, sequence.fps), title: m.label }));
}

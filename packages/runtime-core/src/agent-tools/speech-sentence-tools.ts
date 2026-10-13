import { z } from 'zod';
import type { Id } from '@baocut/protocol';
import { groupSentences, renderNumbered, withSentences } from '../ai-tools/ai-tool-citations.ts';
import { citationKeyOf, type CitationRegistry } from '../ai-tools/citation-registry.ts';
import { chapterMarksOf, sentenceMapOf, timelineWords } from '../ai-tools/timeline-sentences.ts';
import type { VideoService } from '../videos/video-service.ts';
import { ToolError, type ToolInfo, type ToolSet } from './tool-catalog.ts';
import type { ToolPrincipal, ToolScope } from './tool-scope.ts';
import { videoArg } from './video-tools.ts';

/**
 * `speech_sentences`（创作辅助集成设计 §3.4「智能体路径」、§3.9）：一段时间线上的讲话按句子编号交给智能体写作用。每句一行
 * `[s17] [mm:ss] 说话人: 原文`，章节标题行插在章节的第一句之前，与直接调模型的写作发给模型的文稿同一个写法；编号在同一会话里
 * 不重复（`CitationRegistry`），写作时在段落末尾回引，`downloads_save` 交出 Markdown 时按它校验出处。
 *
 * 只读：读视频的时间线与转写，不写文件、不改视频。时间是剪辑后时间线上的秒（剪掉的词不在里面），与导出的文稿一致。
 */

/** 一次最多给这么多句：再长的分几次取（`next` 给出下一段的起点）。 */
export const SPEECH_SENTENCES_MAX = 600;

export interface SpeechSentenceToolsDeps {
  videos: VideoService;
  scope: ToolScope;
  registry: CitationRegistry;
}

// i18n-ignore-start: 给模型的工具说明、错误与下一步
const schemas = {
  speech_sentences: z.strictObject({
    video: videoArg,
    documentId: z.string().min(1).max(200).optional().describe('可选。讲话转写的 documentId（videos_inspect 的文档里 kind 为 speech 的）；视频只有一份时可不给'),
    range: z
      .string()
      .regex(/^\d+(\.\d+)?:\d+(\.\d+)?$/)
      .optional()
      .describe('可选。一段时间 "起:止"（剪辑后时间线上的秒，例如 "60:300"）；不给时整条时间线'),
  }),
};

type Args = z.infer<(typeof schemas)['speech_sentences']>;

const DEFINITIONS: Record<'speech_sentences', ToolInfo> = {
  speech_sentences: {
    title: '按句编号读讲话',
    description: [
      '把一段时间线上的讲话按句子编号返回，写总结、博客、标题、简介时当材料用。text 每句一行 "[s17] [mm:ss] 说话人: 原文"，"##" 开头的行是章节标题；sentences 是同样的句子（ref、start、end 秒、speaker、text）。',
      '写作时在每个依据讲话的段落或列表项末尾回引句子编号，例如 [s12, s15]；只回引拿到过的编号，标题里不回引，正文别处不提编号。写成 .md 后用 downloads_save 交出：会按这个会话拿到过的编号校验，去掉正文里的编号，出处随 Space 条目保存。',
      `编号在同一会话里不重复，同一句再取时编号不变。时间是剪辑后时间线上的秒，剪掉的词不在里面。一次最多 ${SPEECH_SENTENCES_MAX} 句，更多时 next 给出下一段的 range。只读。`,
    ].join('\n'),
    annotations: { readOnlyHint: true },
    effect: 'query',
    examples: [
      { title: '取整条时间线的句子', args: { video: 'demo' } },
      { title: '取一段', args: { video: 'demo', range: '600:1200' } },
    ],
    // 与 speech_relevant 相同：对外服务（MCP）暂不提供。
    surfaces: ['agent', 'cli'],
    positional: 'video',
  },
};
// i18n-ignore-end

export class SpeechSentenceTools implements ToolSet {
  readonly schemas = schemas;
  readonly definitions = DEFINITIONS;
  readonly #deps: SpeechSentenceToolsDeps;

  constructor(deps: SpeechSentenceToolsDeps) {
    this.#deps = deps;
  }

  dispatch(name: string, args: unknown, principal: ToolPrincipal): Promise<unknown> {
    // i18n-ignore: 给模型的工具说明、错误与下一步
    if (name !== 'speech_sentences') return Promise.reject(new ToolError('UNKNOWN_TOOL', `没有这个工具：${name}`));
    return this.#sentences(args as Args, principal);
  }

  async #sentences(args: Args, principal: ToolPrincipal) {
    const { videos, scope, registry } = this.#deps;
    const access = scope.authorize(principal, false);
    const opened = await scope.open(args.video, access);
    const videoId = opened.ref.videoId;
    const video = videos.mirror(videoId)?.video ?? opened.snapshot.video;
    const documentId = speechDocumentOf(video.documents, args.documentId);
    const [start, end] = args.range ? (args.range.split(':').map(Number) as [number, number]) : [null, null];
    // i18n-ignore: 给模型的工具说明、错误与下一步
    if (start !== null && end !== null && !(end > start)) throw new ToolError('INVALID_RANGE', 'range 的止要大于起');
    const content = await videos.document(videoId, documentId);
    const sentenceOf = sentenceMapOf(content);
    const words = await timelineWords(videos, videoId, documentId, start !== null && end !== null ? { start, end } : null);
    const grouped = groupSentences({ videoId, documentId, words: withSentences(words, sentenceOf) });
    const page = grouped.slice(0, SPEECH_SENTENCES_MAX);
    const issued = registry.issue(citationKeyOf(principal as Parameters<typeof citationKeyOf>[0]), page);
    const rest = grouped.length > page.length ? grouped[page.length]! : null;
    return {
      videoId,
      documentId,
      text: renderNumbered(issued, chapterMarksOf(videos, videoId)),
      sentences: issued.map((s) => ({ ref: s.ref, start: round(s.start), end: round(s.end), speaker: s.speaker, text: s.text })),
      ...(rest ? { next: { range: `${round(rest.start)}:${end ?? round(grouped[grouped.length - 1]!.end)}` } } : {}),
      // i18n-ignore-start: 给模型的工具说明、错误与下一步
      note:
        sentenceOf.size === 0
          ? '这份文档没有可编号的句子（不是讲话转写，或还没有逐词时间）：写作照常，但交出时没有出处。'
          : '写作时在段落末尾回引 [sN]；用 downloads_save 交出 .md 时按这些编号校验出处。',
      // i18n-ignore-end
    };
  }
}

/** 给了的要是讲话转写；没给时只有一份讲话转写才用它，几份时让智能体挑。 */
function speechDocumentOf(documents: Readonly<Record<Id, { id: Id; kind: string; name?: string | null }>>, given: string | undefined): Id {
  const speech = Object.values(documents).filter((d) => d.kind === 'speech');
  if (given !== undefined) {
    // i18n-ignore: 给模型的工具说明、错误与下一步
    if (!speech.some((d) => d.id === given)) throw new ToolError('DOCUMENT_NOT_FOUND', `这部视频里没有这份讲话转写：${given}`);
    return given;
  }
  // i18n-ignore: 给模型的工具说明、错误与下一步
  if (speech.length === 0) throw new ToolError('NO_TRANSCRIPT', '这部视频还没有讲话转写：先转写');
  if (speech.length > 1) {
    // i18n-ignore: 给模型的工具说明、错误与下一步
    throw new ToolError('DOCUMENT_REQUIRED', '这部视频有几份讲话转写：用 documentId 指定一份', {
      candidates: speech.map((d) => ({ documentId: d.id, name: d.name ?? null })),
    });
  }
  return speech[0]!.id;
}

function round(seconds: number): number {
  return Math.round(seconds * 1000) / 1000;
}

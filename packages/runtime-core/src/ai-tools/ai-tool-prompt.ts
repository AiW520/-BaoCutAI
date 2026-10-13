import type { AiToolKind, TextMessage } from '@baocut/protocol';
import { CITATION_INSTRUCTIONS } from './ai-tool-citations.ts';
// i18n-ignore-file: 这个文件只生成交给文本模型的提示词与输出格式，不在界面显示

/**
 * AI 工具「直接调模型」（产品设计 §5.10）交给文本模型的消息：系统提示词是挂着的 skill（`skillSystemPrompt`）、用户的界面语言（给了时），加上这个工具
 * 要的输出格式；用户消息是提示词框里的文字与这个视频的上下文（文稿、附件）。润色给编了号的词（只能一词对一词地改），
 * 其余工具给带时间码与说话人的 Markdown 文稿（与导出文稿同一份写法）。
 */

/** 每个工具要模型交出什么（附在系统提示词最后）。 */
const OUTPUT: Record<AiToolKind, string> = {
  polish: [
    'Output: corrections to a transcript, as JSON {"edits":[{"n":<word number>,"text":"<corrected word text>"}]}.',
    'The transcript is given as numbered words, one per line ("n<TAB>text"); a blank line starts a new paragraph.',
    'List only the words whose text you change. Change a word only into its corrected spelling, with punctuation attached to it; never merge, split, add, remove or reorder words, and never make a word empty.',
    'Keep the transcript language; do not translate or rewrite. If nothing needs changing, return {"edits":[]}.',
  ].join('\n'),
  chapters: [
    'Output: the chapters of the whole video, as JSON {"chapters":[{"at":"<timestamp>","title":"<title>","summary":"<one sentence>"}]}.',
    'Each chapter starts at the beginning of a paragraph: copy that paragraph\'s timestamp from the transcript exactly as written. The first chapter starts at the first paragraph. Times strictly increase.',
    'Titles and summaries are non-empty, distinct and in the transcript\'s language unless the user asks for another.',
  ].join('\n'),
  summary: 'Output: the summary itself, in Markdown. No preamble, no closing remarks.',
  blog: 'Output: the blog post itself, in Markdown. No preamble, no closing remarks.',
  title: 'Output: the candidate titles as a numbered Markdown list, one title per item. No preamble, no closing remarks.',
  desc: 'Output: the description itself, ready to paste. No preamble, no closing remarks.',
};

/** 重写一段时的输出格式（取代工具的输出格式）。 */
const SECTION_OUTPUT = [
  'Output: a replacement for the single paragraph in <paragraph_to_rewrite>, in Markdown, following the request. It may be one paragraph or a few, but nothing else from the document.',
  'The <outline> lists every paragraph of the document (the one to rewrite is marked ">>"): keep the replacement consistent with it and do not repeat what other paragraphs say. No preamble, no closing remarks.',
].join('\n');

/** 章节按话题找了候选边界时附在系统提示词里（创作辅助集成设计 §3.6）。 */
const BOUNDARY_INSTRUCTIONS = [
  'Topic shifts were detected in advance and are listed in <chapter_candidates>: each line is a candidate start time, with the end of the text before it and the start of the text after it (separated by ‖).',
  'Start the first chapter at the first paragraph, and start every other chapter exactly at one of the candidate times. You may skip candidates to merge chapters, but never start a chapter anywhere else.',
].join('\n');

/** 结构化输出的 JSON Schema（润色与章节）；其余工具是正文。 */
export function outputSchema(tool: AiToolKind): Record<string, unknown> | null {
  if (tool === 'polish') {
    return {
      type: 'object',
      properties: {
        edits: {
          type: 'array',
          items: {
            type: 'object',
            properties: { n: { type: 'integer' }, text: { type: 'string' } },
            required: ['n', 'text'],
            additionalProperties: false,
          },
        },
      },
      required: ['edits'],
      additionalProperties: false,
    };
  }
  if (tool === 'chapters') {
    return {
      type: 'object',
      properties: {
        chapters: {
          type: 'array',
          items: {
            type: 'object',
            properties: { at: { type: 'string' }, title: { type: 'string' }, summary: { type: 'string' } },
            required: ['at', 'title', 'summary'],
            additionalProperties: false,
          },
        },
      },
      required: ['chapters'],
      additionalProperties: false,
    };
  }
  return null;
}

/** 时间线上的一个词：转写里的 id 与文本，是否一段的开头，时间线上的起止（秒）与说话人。 */
export interface ContextWord {
  id: string;
  text: string;
  paragraphStart: boolean;
  start: number;
  /** 写作的出处要；润色与章节不用。 */
  end?: number;
  speaker?: string | null;
}

/** 附上全文的附件。 */
export interface ContextAttachment {
  name: string;
  content: string;
}

export interface AiToolMessageInput {
  tool: AiToolKind;
  /** skill 合成的系统提示词（没有 skill 时空串）。 */
  system: string;
  prompt: string;
  /** 带时间码的 Markdown 文稿（润色时不用）。 */
  transcript: string | null;
  /** 润色这一批的词（编号从 `offset + 1` 起）。 */
  words?: { items: readonly ContextWord[]; offset: number; total: number };
  attachments: readonly ContextAttachment[];
  /** 用户的界面语言（BCP 47）；给了时在系统提示词里说明，输出用什么语言由 skill 与输出格式决定。 */
  uiLanguage?: string;
  /** 文稿是编了号的句子、要模型回引编号（写作类工具，创作辅助集成设计 §3.4）。 */
  citations?: boolean;
  /** 文稿的来历（几部视频、按主题的节选，`materialInstructions`）：附在引用说明后面。 */
  material?: string;
  /** 重写一段：全文大纲（要重写的那段以 `>>` 标出）与这一段原文。给了时输出格式换成「只交这一段」。 */
  section?: { outline: string; paragraph: string };
  /** 生成章节按话题找到的候选边界（每行 `[mm:ss] … 前文 ‖ 后文 …`）：章节只能从第一段或这些时刻开始。 */
  boundaries?: string;
}

/** 交给模型的消息：系统一条，用户一条。 */
export function aiToolMessages(input: AiToolMessageInput): TextMessage[] {
  const language = input.uiLanguage ? `The user's interface language is ${input.uiLanguage}.` : '';
  const system = [
    input.system.trim(),
    language,
    input.section ? SECTION_OUTPUT : OUTPUT[input.tool],
    input.citations ? CITATION_INSTRUCTIONS : '',
    input.material ?? '',
    input.boundaries ? BOUNDARY_INSTRUCTIONS : '',
  ]
    .filter(Boolean)
    .join('\n\n');
  const parts: string[] = [];
  parts.push(input.prompt.trim() ? `<request>\n${input.prompt.trim()}\n</request>` : '<request />');
  if (input.words) {
    const { items, offset, total } = input.words;
    const lines = items.map((w, i) => `${i > 0 && w.paragraphStart ? '\n' : ''}${offset + i + 1}\t${w.text}`);
    parts.push(
      `<transcript words="${offset + 1}-${offset + items.length}" total="${total}">\n${lines.join('\n')}\n</transcript>`,
    );
  } else if (input.transcript !== null) {
    parts.push(`<transcript>\n${input.transcript.trim()}\n</transcript>`);
  }
  if (input.section) {
    parts.push(`<outline>\n${input.section.outline}\n</outline>`);
    parts.push(`<paragraph_to_rewrite>\n${input.section.paragraph.trim()}\n</paragraph_to_rewrite>`);
  }
  if (input.boundaries) parts.push(`<chapter_candidates>\n${input.boundaries}\n</chapter_candidates>`);
  for (const a of input.attachments) parts.push(`<attachment name="${a.name.replace(/"/g, "'")}">\n${a.content}\n</attachment>`);
  return [
    { role: 'system', content: system },
    { role: 'user', content: parts.join('\n\n') },
  ];
}

/** 润色批次：按段落边界切，每批不超过 `max` 个词（一段比 `max` 还长时整段成一批）。 */
export function polishBatches(words: readonly ContextWord[], max: number): Array<{ offset: number; items: ContextWord[] }> {
  const batches: Array<{ offset: number; items: ContextWord[] }> = [];
  let current: ContextWord[] = [];
  let offset = 0;
  let paragraph: ContextWord[] = [];
  const flushParagraph = () => {
    if (current.length > 0 && current.length + paragraph.length > max) {
      batches.push({ offset, items: current });
      offset += current.length;
      current = [];
    }
    current.push(...paragraph);
    paragraph = [];
  };
  for (const word of words) {
    if (word.paragraphStart && paragraph.length > 0) flushParagraph();
    paragraph.push(word);
  }
  if (paragraph.length > 0) flushParagraph();
  if (current.length > 0) batches.push({ offset, items: current });
  return batches;
}

/**
 * 校验润色的修改：编号在这一批里、文本不是空的；与原文相同的不算。返回词 id → 新文本；有对不上的编号或空文本时
 * 返回 `{ problem }`，整批不用（不能一词对一词的修改宁可不写）。
 */
export function polishEdits(
  json: unknown,
  batch: { offset: number; items: readonly ContextWord[] },
): { edits: Map<string, string> } | { problem: string } {
  const list = (json as { edits?: unknown } | null)?.edits;
  if (!Array.isArray(list)) return { problem: 'edits is not an array' };
  const edits = new Map<string, string>();
  for (const raw of list) {
    const n = (raw as { n?: unknown }).n;
    const text = (raw as { text?: unknown }).text;
    if (typeof n !== 'number' || !Number.isInteger(n) || typeof text !== 'string') return { problem: 'edit is malformed' };
    const word = batch.items[n - batch.offset - 1];
    if (!word) return { problem: `word ${n} is not in this batch` };
    const next = text.trim();
    if (!next) return { problem: `word ${n} would be empty` };
    if (/[\n\r\t]/.test(next)) return { problem: `word ${n} contains a line break` };
    if (next !== word.text) edits.set(word.id, next);
    else edits.delete(word.id);
  }
  return { edits };
}

/** 时间码 `h:mm:ss`、`mm:ss`（可带小数）或秒数 → 秒；认不出时 null。 */
export function parseTimestamp(value: string): number | null {
  const text = value.trim().replace(/^\[|\]$/g, '');
  if (/^\d+(\.\d+)?$/.test(text)) return Number(text);
  const m = /^(?:(\d+):)?(\d{1,2}):(\d{1,2}(?:[.,]\d+)?)$/.exec(text);
  if (!m) return null;
  const seconds = Number(m[3]!.replace(',', '.'));
  const minutes = Number(m[2]);
  if (seconds >= 60 || (m[1] !== undefined && minutes >= 60)) return null;
  return Number(m[1] ?? 0) * 3600 + minutes * 60 + seconds;
}

export interface ChapterDraft {
  at: number;
  title: string;
  summary: string;
}

/**
 * 校验模型给的章节：时间认得出、落在视频里，吸到最近的段落起点（`starts`，时间线上的秒，递增）；标题不空；吸到同一个
 * 起点的只留第一个。按时间排序。没有可用的章节时返回空列表。
 */
export function chapterDrafts(json: unknown, starts: readonly number[], duration: number): ChapterDraft[] {
  const list = (json as { chapters?: unknown } | null)?.chapters;
  if (!Array.isArray(list)) return [];
  const byAt = new Map<number, ChapterDraft>();
  for (const raw of list) {
    const r = raw as { at?: unknown; title?: unknown; summary?: unknown };
    const title = typeof r.title === 'string' ? r.title.replace(/\s+/g, ' ').trim() : '';
    if (!title) continue;
    const parsed = typeof r.at === 'string' ? parseTimestamp(r.at) : typeof r.at === 'number' ? r.at : null;
    if (parsed === null || !Number.isFinite(parsed) || parsed < 0 || (duration > 0 && parsed >= duration)) continue;
    const at = snap(parsed, starts);
    if (byAt.has(at)) continue;
    const summary = typeof r.summary === 'string' ? r.summary.replace(/\s+/g, ' ').trim() : '';
    byAt.set(at, { at, title, summary });
  }
  return [...byAt.values()].sort((a, b) => a.at - b.at);
}

function snap(at: number, starts: readonly number[]): number {
  if (starts.length === 0) return at;
  let best = starts[0]!;
  for (const s of starts) if (Math.abs(s - at) < Math.abs(best - at)) best = s;
  return best;
}

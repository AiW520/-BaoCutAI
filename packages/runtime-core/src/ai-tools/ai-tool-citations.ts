import {
  CITATIONS_SCHEMA,
  type CitationAnchor,
  type CitationParagraph,
  type CitationsFile,
  type Id,
  type SemanticEffectiveMode,
} from '@baocut/protocol';
// i18n-ignore-file: 这个文件只生成交给文本模型的文稿与引用说明，不在界面显示

/**
 * 写作类 AI 工具的出处（创作辅助集成设计 §3.4，批次 A）：文稿以编了号的句子发给模型（每句一行 `[s17] 原文`，带时间码、说话人
 * 与章节标题行），模型在每个段落或列表项末尾回引它依据的编号；Runtime 只接受这次发出的编号，无效的丢弃，没有有效引用的
 * 段落标 `inferred`。编号只是本次任务里的短名，对应回稳定句子身份（`s-<首词 ID>`）随任务冻结。
 *
 * 引用用正文里的方括号编号而不是结构化输出：任何文本模型都能照做（写作工具不要求结构化输出），交给智能体时的写作 skill
 * 也用同一种写法，收尾时走同一个校验。
 */

/** 时间线上的一个词，带它所在的句子。 */
export interface SentenceWord {
  id: string;
  text: string;
  /** 时间线上的起止（秒，`sequence` 时钟）。 */
  start: number;
  end: number;
  speaker: string | null;
  /** 稳定句子身份；转写里找不到时 null（这样的词不发）。 */
  sentenceId: string | null;
}

/** 时间线上的词带上所在的句子（`sentenceOf`：词 ID → 稳定句子 ID）。 */
export function withSentences(
  words: readonly { id: string; text: string; start: number; end?: number; speaker?: string | null }[],
  sentenceOf: ReadonlyMap<string, string>,
): SentenceWord[] {
  return words.map((word) => ({
    id: word.id,
    text: word.text,
    start: word.start,
    end: word.end ?? word.start,
    speaker: word.speaker ?? null,
    sentenceId: sentenceOf.get(word.id) ?? null,
  }));
}

/** 一个章节标题：时间线上的起点（秒）。 */
export interface SentenceChapter {
  at: number;
  title: string;
}

/** 发出的一句：短编号 → 原句。同一句在时间线上出现两次（重排、重复使用）时是两个编号、同一个 `sentenceId`。 */
export interface NumberedSentence {
  ref: string;
  videoId: Id;
  documentId: Id;
  sentenceId: string;
  text: string;
  start: number;
  end: number;
  speaker: string | null;
}

export interface NumberedTranscript {
  /** 交给模型的文稿。 */
  text: string;
  sentences: NumberedSentence[];
}

/** 章节标记吸在帧上，句首的词可能早它几十毫秒：差这么多以内仍算章节里的第一句。 */
const CHAPTER_SLACK_SEC = 0.1;

/** 时间码：`mm:ss`，一小时以上 `h:mm:ss`。 */
export function stamp(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** 词接成句：自带空白照用；两个拉丁字母数字之间补一个空格；中日文不加空格（同字幕与翻译的写法）。 */
function joinWords(texts: readonly string[]): string {
  let out = '';
  for (const text of texts) {
    if (out !== '' && !/\s$/.test(out) && !/^\s/.test(text) && /[\p{Script=Latin}\d,.!?;:'"%)]$/u.test(out) && /^[\p{Script=Latin}\d(]/u.test(text)) {
      out += ' ';
    }
    out += text;
  }
  return out.replace(/\s+/g, ' ').trim();
}

/**
 * 把时间线上的词按句子编号（`prefix` 给系列文章用，例如 `v2:`）。连续属于同一句的词是一次出现；章节标题行插在它起点之后的
 * 第一句之前。
 */
export function numberSentences(input: {
  videoId: Id;
  documentId: Id;
  words: readonly SentenceWord[];
  chapters: readonly SentenceChapter[];
  prefix?: string;
  /** 编号从几开始（多部视频时接着编）。 */
  first?: number;
}): NumberedTranscript {
  const prefix = input.prefix ?? '';
  const first = input.first ?? 1;
  const sentences = groupSentences(input).map((sentence, index) => ({ ...sentence, ref: `${prefix}s${first + index}` }));
  return { text: renderNumbered(sentences, input.chapters), sentences };
}

/** 时间线上的词按句子分组（还没编号）：连续属于同一句的词是一次出现，不在任何句子里的词不发。 */
export function groupSentences(input: { videoId: Id; documentId: Id; words: readonly SentenceWord[] }): Omit<NumberedSentence, 'ref'>[] {
  const sentences: Omit<NumberedSentence, 'ref'>[] = [];
  let run: SentenceWord[] = [];
  const flush = () => {
    if (run.length === 0) return;
    const head = run[0]!;
    const tail = run[run.length - 1]!;
    sentences.push({
      videoId: input.videoId,
      documentId: input.documentId,
      sentenceId: head.sentenceId!,
      text: joinWords(run.map((w) => w.text)),
      start: head.start,
      end: Math.max(tail.end, tail.start),
      speaker: head.speaker,
    });
    run = [];
  };
  for (const word of input.words) {
    if (word.sentenceId === null) {
      flush();
      continue;
    }
    if (run.length > 0 && run[0]!.sentenceId !== word.sentenceId) flush();
    run.push(word);
  }
  flush();
  return sentences;
}

/** 编了号的句子写成发给模型的文稿：每句一行 `[s17] [mm:ss] 说话人: 原文`，章节标题行插在章节里的第一句之前。 */
export function renderNumbered(sentences: readonly NumberedSentence[], chapterList: readonly SentenceChapter[]): string {
  const chapters = [...chapterList].sort((a, b) => a.at - b.at);
  const lines: string[] = [];
  let next = 0;
  for (const sentence of sentences) {
    // 这句之前开始的章节里只写最后一个：前面的章节下没有句子（在范围之外），不写空标题。
    let chapter: SentenceChapter | null = null;
    while (next < chapters.length && chapters[next]!.at <= sentence.start + CHAPTER_SLACK_SEC) chapter = chapters[next++]!;
    if (chapter) lines.push(`${lines.length > 0 ? '\n' : ''}## ${chapter.title} [${stamp(chapter.at)}]`);
    const speaker = sentence.speaker ? `${sentence.speaker}: ` : '';
    lines.push(`[${sentence.ref}] [${stamp(sentence.start)}] ${speaker}${sentence.text}`);
  }
  return lines.join('\n');
}

/** 附在系统提示词里的引用说明。 */
export const CITATION_INSTRUCTIONS = [
  'The transcript is given as numbered sentences: each line starts with the sentence number in square brackets (like [s12]), then its timestamp, speaker and text. Lines starting with "##" are chapter titles.',
  'At the end of every paragraph or list item that draws on the transcript, cite the numbers of the sentences it is based on, in square brackets, e.g. [s12, s15]. Cite only numbers that appear in the transcript. Do not cite in headings. Do not mention the numbers anywhere else, and never invent a number.',
].join('\n');

/** 方括号里一串编号：`[s12]`、`[s12, s15]`、`[v2:s3，v2:s4]`；也收 `[s12][s13]` 这样连写的。 */
const CITE_GROUP = /\s*\[((?:v\d+:)?s\d+(?:\s*[,，、;；]\s*(?:v\d+:)?s\d+)*)\]/g;
const CITE_REF = /(?:v\d+:)?s\d+/g;

/** 顶格的列表项：`-`、`*`、`+` 或 `1.`。 */
const LIST_ITEM = /^(?:[-*+]|\d+[.)])\s+/;

/** Markdown 正文切成段落：空行分隔的块；列表的每一项、每个标题各是一段。代码块整块是一段。 */
export function markdownParagraphs(markdown: string): string[] {
  const out: string[] = [];
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  let block: string[] = [];
  let fence = false;
  const push = () => {
    const text = block.join('\n').trim();
    if (text) out.push(text);
    block = [];
  };
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      if (!fence) push();
      block.push(line);
      fence = !fence;
      if (!fence) push();
      continue;
    }
    if (fence) {
      block.push(line);
      continue;
    }
    if (line.trim() === '') {
      push();
      continue;
    }
    if (/^\s{0,3}#{1,6}\s/.test(line)) {
      push();
      block.push(line);
      push();
      continue;
    }
    // 列表项：顶格的 `-`、`*`、`+` 或 `1.` 开始新的一段；缩进的续行与子项跟着上一项。
    if (LIST_ITEM.test(line)) push();
    block.push(line);
  }
  push();
  return out;
}

/** 把一段里的编号拿出来：去掉编号后的文字与按出现顺序的编号（去重）。 */
export function extractCites(paragraph: string): { markdown: string; refs: string[] } {
  const refs: string[] = [];
  const stripped = paragraph.replace(CITE_GROUP, (_whole, group: string) => {
    for (const ref of group.match(CITE_REF) ?? []) if (!refs.includes(ref)) refs.push(ref);
    return '';
  });
  // 编号去掉后留下的「 。」「 ,」之类：把标点前的空白收掉，行尾空白去掉。
  const markdown = stripped
    .replace(/[ \t]+([.,;:!?。，；：！？、])/g, '$1')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .trim();
  return { markdown, refs };
}

/** 相邻（同一视频、同一文档、首尾相接）的出处并成一处。 */
function mergeAnchors(sentences: readonly NumberedSentence[]): CitationAnchor[] {
  const sorted = [...sentences].sort((a, b) => (a.videoId === b.videoId ? a.start - b.start : a.videoId < b.videoId ? -1 : 1));
  const out: CitationAnchor[] = [];
  let lastRef = -1;
  for (const s of sorted) {
    const prev = out[out.length - 1];
    const index = Number(/s(\d+)$/.exec(s.ref)?.[1] ?? NaN);
    if (prev && prev.videoId === s.videoId && prev.documentId === s.documentId && index === lastRef + 1) {
      if (!prev.sentenceIds.includes(s.sentenceId)) prev.sentenceIds.push(s.sentenceId);
      prev.endSec = Math.max(prev.endSec, s.end);
      prev.text = `${prev.text} ${s.text}`.trim();
    } else {
      out.push({
        videoId: s.videoId,
        documentId: s.documentId,
        sentenceIds: [s.sentenceId],
        clock: 'sequence',
        startSec: s.start,
        endSec: s.end,
        text: s.text,
      });
    }
    lastRef = index;
  }
  return out;
}

/** 段落接回正文：空行分隔，相邻的列表项只换行（保持紧凑列表）。 */
function joinParagraphs(blocks: readonly string[]): string {
  let out = '';
  blocks.forEach((block, index) => {
    if (index > 0) out += LIST_ITEM.test(block) && LIST_ITEM.test(blocks[index - 1]!) ? '\n' : '\n\n';
    out += block;
  });
  return out;
}

/**
 * 校验模型的正文（创作辅助集成设计 §3.4）：按段落拿出编号，只接受本次发出的；去掉编号后的正文与每段的出处。
 * 标题段不需要出处；正文段没有有效出处时 `inferred`。
 */
export function checkCitations(input: {
  output: string;
  sentences: readonly NumberedSentence[];
  videoIds: readonly Id[];
  effectiveMode: SemanticEffectiveMode;
}): { markdown: string; file: CitationsFile } {
  const byRef = new Map(input.sentences.map((s) => [s.ref, s]));
  const paragraphs: CitationParagraph[] = [];
  let dropped = 0;
  for (const block of markdownParagraphs(input.output)) {
    const { markdown, refs } = extractCites(block);
    if (!markdown) continue;
    const heading = /^\s{0,3}#{1,6}\s/.test(markdown) || /^(```|~~~)/.test(markdown) || /^(?:-{3,}|\*{3,}|_{3,})$/.test(markdown);
    const cited: NumberedSentence[] = [];
    for (const ref of refs) {
      const sentence = byRef.get(ref);
      if (sentence) cited.push(sentence);
      else dropped += 1;
    }
    const cites = heading ? [] : mergeAnchors(cited);
    paragraphs.push({ index: paragraphs.length, role: heading ? 'heading' : 'body', markdown, inferred: !heading && cites.length === 0, cites });
  }
  return {
    markdown: joinParagraphs(paragraphs.map((p) => p.markdown)),
    file: { schema: CITATIONS_SCHEMA, videoIds: [...input.videoIds], effectiveMode: input.effectiveMode, paragraphs, droppedCites: dropped },
  };
}

/** 按主题挑出的一句（`SemanticContext.findRelevantChunks` 的讲话句子，时间线时钟）。 */
export interface ExcerptSentence {
  videoId: Id;
  documentId: Id;
  sentenceId: string;
  text: string;
  start: number;
  end: number;
  speaker: string | null;
  /** 它所在的句群与章节标题。 */
  chunkId: string;
  chapter: string | null;
}

/** 两个句群之间隔得比这远（秒）时写一行省略号：告诉模型这里跳过了一段。 */
const EXCERPT_GAP_SEC = 2;

/**
 * 按主题选材的文稿（创作辅助集成设计 §3.4）：挑出来的句子按视频（`videos` 的顺序）、再按时间排好，同一句只发一次；每部视频
 * 各自从 1 编号，多部时带视频前缀（`v2:s3`）并以 `# v2` 行分开。章节变了时插章节标题行，两段之间跳过了内容时插一行 `…`。
 */
export function numberExcerpts(input: { videos: readonly Id[]; sentences: readonly ExcerptSentence[] }): NumberedTranscript {
  const multi = input.videos.length > 1;
  const lines: string[] = [];
  const out: NumberedSentence[] = [];
  input.videos.forEach((videoId, index) => {
    const seen = new Set<string>();
    const own = input.sentences
      .filter((s) => s.videoId === videoId)
      .sort((a, b) => a.start - b.start || a.end - b.end)
      .filter((s) => {
        const key = `${s.sentenceId}@${s.start}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    if (own.length === 0) return;
    const prefix = multi ? `v${index + 1}:` : '';
    if (multi) lines.push(`${lines.length > 0 ? '\n' : ''}# v${index + 1}`);
    let chapter: string | null = null;
    let prev: ExcerptSentence | null = null;
    own.forEach((s, i) => {
      if (prev && prev.chunkId !== s.chunkId && s.start - prev.end > EXCERPT_GAP_SEC) lines.push('…');
      if (s.chapter && s.chapter !== chapter) lines.push(`${lines.length > 0 ? '\n' : ''}## ${s.chapter}`);
      chapter = s.chapter ?? chapter;
      const numbered: NumberedSentence = {
        ref: `${prefix}s${i + 1}`,
        videoId: s.videoId,
        documentId: s.documentId,
        sentenceId: s.sentenceId,
        text: s.text,
        start: s.start,
        end: s.end,
        speaker: s.speaker,
      };
      out.push(numbered);
      const speaker = s.speaker ? `${s.speaker}: ` : '';
      lines.push(`[${numbered.ref}] [${stamp(s.start)}] ${speaker}${s.text}`);
      prev = s;
    });
  });
  return { text: lines.join('\n'), sentences: out };
}

/** 整篇的系列文章：每部视频各自编号（`numberSentences`，前缀 `v2:`），以 `# v2` 行分开；读不出句子的那部只有文稿、没有编号。 */
export function joinSeries(parts: ReadonlyArray<{ index: number; numbered: NumberedTranscript }>): NumberedTranscript {
  const text = parts
    .filter((p) => p.numbered.text.trim() !== '')
    .map((p) => `# v${p.index + 1}\n${p.numbered.text}`)
    .join('\n\n');
  return { text, sentences: parts.flatMap((p) => p.numbered.sentences) };
}

/** 文稿是几部视频或节选时，附在引用说明后面。 */
export function materialInstructions(input: { videos: number; excerpts: boolean }): string {
  const lines: string[] = [];
  if (input.videos > 1) {
    lines.push(
      `The material comes from ${input.videos} videos. A line "# v2" starts the sentences of video 2, and its sentence numbers carry that prefix (like [v2:s3]); cite them exactly as written.`,
    );
  }
  if (input.excerpts) {
    lines.push('The transcript is a selection of excerpts picked for the request, in time order; a line "…" marks skipped material. Do not claim the excerpts are the whole video.');
  }
  return lines.join('\n');
}

/**
 * 重写一段（创作辅助集成设计 §3.4「局部改写」）：上一次结果的第 `index` 段换成模型新写的这几段（已经过 `checkCitations`），
 * 其余段落与出处原样，序号重排；丢弃的编号数累加。
 */
export function replaceParagraph(previous: CitationsFile, index: number, replacement: CitationsFile): { markdown: string; file: CitationsFile } {
  const before = previous.paragraphs.slice(0, index);
  const after = previous.paragraphs.slice(index + 1);
  const paragraphs = [...before, ...replacement.paragraphs, ...after].map((p, i) => ({ ...p, index: i }));
  return {
    markdown: joinParagraphs(paragraphs.map((p) => p.markdown)),
    file: { ...previous, paragraphs, droppedCites: previous.droppedCites + replacement.droppedCites },
  };
}

/** 全文大纲：每段一行（标题原样，正文取开头），要重写的那段标出来。 */
export function outlineOf(file: CitationsFile, index: number, max = 120): string {
  return file.paragraphs
    .map((p) => {
      const line = p.markdown.replace(/\s+/g, ' ').trim();
      const short = line.length > max ? `${line.slice(0, max)}…` : line;
      return `${p.index === index ? '>> ' : ''}${p.index + 1}. ${short}`;
    })
    .join('\n');
}

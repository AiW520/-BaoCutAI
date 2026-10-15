/**
 * 把文档正文序列化成编辑器（原版 platform-core 的正文视图解析器）读的 XML。
 *
 * 要点：块内每个字都必须包在 `<t id>` 里（裸文本会让整块变成只读的 opaque 块）；原子（日期、提及、换行、下拉、图片）各占一个 id；
 * 评论锚点用 `<comment thread>` 包住被评论的文字。表格行写 `<tr>`（`row` 不是解析器认的块标签），表头单元格写 `<th>`。
 * 待写块与嵌入写成成对标签（解析器只把 `br hr hardBreak horizontalRule gap gone hit` 当自闭合块）。
 */
import { isNextCharId, type CharId } from './char-id.ts';
import { documentOrder, isTextBlock, type CharItem, type InlineItem, type MediaItem, type MentionItem, type ProseBlock, type TextBlock } from './prose-document.ts';

export interface CommentAnchor {
  thread: string;
  from: CharId;
  to: CharId;
}

export interface SerializeOptions {
  rev: number;
  anchors?: readonly CommentAnchor[];
}

type AttributeValue = string | number | boolean | undefined | null;

export function escapeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function escapeAttribute(value: string): string {
  return escapeText(value).replace(/"/g, '&quot;');
}

export function attributes(values: Record<string, AttributeValue>): string {
  return Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([name, value]) => ` ${name}="${escapeAttribute(String(value))}"`)
    .join('');
}

/** 每个条目被哪些评论覆盖：按文档顺序比较锚点首尾。 */
function threadsCovering(blocks: ProseBlock[], anchors: readonly CommentAnchor[]): Map<CharId, string[]> {
  const covering = new Map<CharId, string[]>();
  if (!anchors.length) return covering;
  const order = documentOrder(blocks);
  const ranges = anchors
    .map((anchor) => ({ thread: anchor.thread, from: order.get(anchor.from), to: order.get(anchor.to) }))
    .filter((range): range is { thread: string; from: number; to: number } => range.from !== undefined && range.to !== undefined);
  if (!ranges.length) return covering;
  for (const [id, position] of order) {
    const threads = ranges.filter((range) => range.from <= position && position <= range.to).map((range) => range.thread);
    if (threads.length) covering.set(id, threads);
  }
  return covering;
}

function sameRun(previous: CharItem, next: CharItem): boolean {
  return (
    isNextCharId(previous.id, next.id) &&
    previous.href === next.href &&
    previous.marks.length === next.marks.length &&
    previous.marks.every((mark) => next.marks.includes(mark))
  );
}

/** 提及的 label：只给「非 Claude 的人」与「只引用标签页 / 文档的提及」（与解析器的取舍一致）。 */
function mentionLabel(item: MentionItem): string | undefined {
  if (item.user) return item.user !== 'claude' && !item.ref ? item.label : undefined;
  return item.ref ? item.label : undefined;
}

export function mediaAttributes(item: Omit<MediaItem, 'kind'>): Record<string, AttributeValue> {
  return {
    id: item.id,
    blob: item.blob,
    mime: item.mime,
    name: item.name,
    alt: item.alt,
    dims: item.dims ? `${item.dims.w},${item.dims.h}` : undefined,
    crop: item.crop ? `${item.crop.x},${item.crop.y},${item.crop.w},${item.crop.h}` : undefined,
    align: item.align,
    width: item.width,
  };
}

export function atomXml(item: Exclude<InlineItem, CharItem>): string {
  switch (item.kind) {
    case 'date':
      return `<date${attributes({ id: item.id, ts: item.value })}/>`;
    case 'mention':
      return `<mention${attributes({
        id: item.id,
        principal: item.user,
        ref: item.ref,
        label: mentionLabel(item),
        name: item.name,
        email: item.email,
      })}/>`;
    case 'dropdown':
      return `<dropdown${attributes({ id: item.id, enum: item.enum, index: item.index })}/>`;
    case 'media':
      return `<media${attributes(mediaAttributes(item))}/>`;
    case 'break':
      return `<br${attributes({ id: item.id })}/>`;
  }
}

function serializeItems(items: readonly InlineItem[], covering: Map<CharId, string[]>): string {
  let xml = '';
  let openThreads: string[] = [];
  let run: { first: CharItem; last: CharItem; text: string } | undefined;

  const flushRun = () => {
    if (!run) return;
    xml += `<t${attributes({ id: run.first.id, marks: run.first.marks.join(','), href: run.first.href })}>${escapeText(run.text)}</t>`;
    run = undefined;
  };
  const switchThreads = (threads: string[]) => {
    if (threads.join('\n') === openThreads.join('\n')) return;
    flushRun();
    xml += '</comment>'.repeat(openThreads.length);
    xml += threads.map((thread) => `<comment${attributes({ thread })}>`).join('');
    openThreads = threads;
  };

  for (const item of items) {
    switchThreads(covering.get(item.id) ?? []);
    if (item.kind === 'char') {
      if (run && sameRun(run.last, item)) {
        run.last = item;
        run.text += item.char;
      } else {
        flushRun();
        run = { first: item, last: item, text: item.char };
      }
      continue;
    }
    flushRun();
    xml += atomXml(item);
  }
  switchThreads([]);
  flushRun();
  return xml;
}

function serializeTextBlock(block: TextBlock, covering: Map<CharId, string[]>): string {
  const inner = serializeItems(block.items, covering);
  if (block.type === 'codeBlock') return `<pre${attributes({ id: block.id, rev: block.rev, language: block.language })}>${inner}</pre>`;
  if (block.heading) return `<heading${attributes({ id: block.id, rev: block.rev, level: block.heading })}>${inner}</heading>`;
  return `<p${attributes({ id: block.id, rev: block.rev })}>${inner}</p>`;
}

export function serializeBlock(block: ProseBlock, covering: Map<CharId, string[]> = new Map()): string {
  if (isTextBlock(block)) return serializeTextBlock(block, covering);
  const children = 'children' in block ? block.children.map((child) => serializeBlock(child, covering)).join('') : '';
  switch (block.type) {
    case 'list':
      return `<list${attributes({ id: block.id, rev: block.rev, kind: block.kind, start: block.start, numbering: block.numbering })}>${children}</list>`;
    case 'listItem':
      return `<li${attributes({ id: block.id, rev: block.rev, checked: block.checked })}>${children}</li>`;
    case 'blockquote':
      return `<blockquote${attributes({ id: block.id, rev: block.rev })}>${children}</blockquote>`;
    case 'table':
      return `<table${attributes({ id: block.id, rev: block.rev })}>${children}</table>`;
    case 'tableRow':
      return `<tr${attributes({ id: block.id, rev: block.rev })}>${children}</tr>`;
    case 'cell': {
      const tag = block.header ? 'th' : 'td';
      return `<${tag}${attributes({
        id: block.id,
        rev: block.rev,
        colspan: block.colspan,
        rowspan: block.rowspan,
        colwidth: block.colwidth?.join(','),
        align: block.align,
        background: block.background,
      })}>${children}</${tag}>`;
    }
    case 'rule':
      return `<hr${attributes({ id: block.id, rev: block.rev })}/>`;
    case 'pending':
      return `<pending${attributes({ id: block.id, rev: block.rev, intent: block.intent })}></pending>`;
    case 'embed':
      return `<embed${attributes({ ...block.attrs, id: block.id, rev: block.rev })}></embed>`;
  }
}

/** 整篇文档：`<doc rev="N">` 下每个顶层块一行。 */
export function serializeDocument(blocks: ProseBlock[], options: SerializeOptions): string {
  const covering = threadsCovering(blocks, options.anchors ?? []);
  const body = blocks.map((block) => serializeBlock(block, covering)).join('\n');
  return `<doc${attributes({ rev: options.rev })}>\n${body}\n</doc>`;
}

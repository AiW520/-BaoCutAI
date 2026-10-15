/**
 * 给智能体看的正文（连接器的读与回执，docs skill 的写法）：
 *
 * - `<doc rev='12'>` 下每个块一个元素：`paragraph`（`heading`）、`code`、`list`（`kind`）/ `item`（`checked`）、`quote`、
 *   `table` / `row` / `cell`（`header`）、`rule`、`pending`（`intent`）、`embed`。每个块带 `id` 与 `h`（8 位十六进制）。
 * - 文字块里：`<text id>` 是一段连续 id 的字（`marks`、`href`），chip 各占一个元素（`date`、`mention`、`dropdown`、`media`、`br`），
 *   评论锚定的字包在 `<comment id to? answered?>` 里。
 * - id：一个会话的第一个 id 写全（`mq2x81a0kfd.0`），之后同一会话的写成 `.90`；调用里永远要写全。
 * - 大纲：只有顶层块，文字截短，列表与表格折成 `<gap blocks='N'/>`。
 */
import { createHash } from 'node:crypto';
import { isNextCharId, parseCharId, type CharId } from './char-id.ts';
import {
  documentOrder,
  isContainerBlock,
  isTextBlock,
  walkBlocks,
  type CharItem,
  type InlineItem,
  type ProseBlock,
  type TextBlock,
} from './prose-document.ts';

export interface AgentThread {
  id: string;
  from: CharId;
  to: CharId;
  /** 线程生来是问智能体的。 */
  toClaude?: boolean;
  answered?: boolean;
}

export interface AgentXmlContext {
  rev: number;
  threads?: readonly AgentThread[];
  /** 本机用户（你代表的人）的 principal：它的提及带 `self='true'`。 */
  self?: string;
  /** 下拉选项：显示选中的选项名。 */
  enums?: Record<string, Record<string, unknown>>;
}

const OUTLINE_TEXT = 100;

function escapeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttribute(value: string): string {
  return escapeText(value).replace(/'/g, '&apos;').replace(/\n/g, '&#10;');
}

/** 打印 id 时的短写：同一会话接着上一个完整 id 的写成 `.<序号>`。 */
class IdPrinter {
  #session: string | undefined;

  print(id: CharId): string {
    const parsed = parseCharId(id);
    if (!parsed) return id;
    if (parsed.session === this.#session) return `.${parsed.clock}`;
    this.#session = parsed.session;
    return id;
  }
}

type Attr = string | number | boolean | undefined | null;

function attrs(values: Record<string, Attr>): string {
  return Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null && value !== '' && value !== false)
    .map(([name, value]) => ` ${name}='${escapeAttribute(String(value))}'`)
    .join('');
}

// ---------- hash ----------

function atomCanonical(item: Exclude<InlineItem, CharItem>): string {
  const { id: _id, ...rest } = item;
  return JSON.stringify(rest);
}

function blockCanonical(block: ProseBlock): string {
  if (isTextBlock(block)) {
    const head = block.type === 'codeBlock' ? `code|${block.language ?? ''}` : `p|${block.heading ?? 0}`;
    const body = block.items
      .map((item) => (item.kind === 'char' ? `${item.char}${item.marks.length || item.href ? `\u0001${item.marks.join(',')}\u0001${item.href ?? ''}\u0002` : ''}` : `\u0003${atomCanonical(item)}\u0003`))
      .join('');
    return `${head}|${body}`;
  }
  const { id: _id, rev: _rev, ...rest } = block as ProseBlock & { children?: ProseBlock[] };
  const children = 'children' in rest ? (rest.children as ProseBlock[]).map((child) => child.id).join(',') : '';
  const own = { ...rest } as Record<string, unknown>;
  delete own['children'];
  return `${JSON.stringify(own)}|${children}`;
}

/** 块的 hash：文字块是它的字与格式；容器是类型、属性加直接子块的 id（在子块里打字不变）。 */
export function blockHash(block: ProseBlock): string {
  return createHash('sha256').update(blockCanonical(block)).digest('hex').slice(0, 8);
}

// ---------- 行内 ----------

function enumLabel(context: AgentXmlContext, enumId: string, index: number | undefined): string | undefined {
  if (index === undefined) return undefined;
  const options = context.enums?.[enumId]?.['options'];
  const option = Array.isArray(options) ? (options[index] as { name?: unknown } | undefined) : undefined;
  return typeof option?.name === 'string' ? option.name : undefined;
}

function atomXml(item: Exclude<InlineItem, CharItem>, ids: IdPrinter, context: AgentXmlContext): string {
  const id = ids.print(item.id);
  switch (item.kind) {
    case 'date':
      return `<date${attrs({ id, value: item.value })}/>`;
    case 'mention':
      return `<mention${attrs({ id, user: item.user, ref: item.ref, label: item.label ?? item.name, self: item.user !== undefined && item.user === context.self })}/>`;
    case 'dropdown':
      return `<dropdown${attrs({ id, enum: item.enum, index: item.index, label: enumLabel(context, item.enum, item.index) })}/>`;
    case 'media':
      return `<media${attrs({ id, blob: item.blob, mime: item.mime, alt: item.alt, name: item.name, width: item.width, align: item.align })}/>`;
    case 'break':
      return `<br${attrs({ id })}/>`;
  }
}

function threadsByItem(blocks: ProseBlock[], threads: readonly AgentThread[]): Map<CharId, AgentThread[]> {
  const covering = new Map<CharId, AgentThread[]>();
  if (!threads.length) return covering;
  const order = documentOrder(blocks);
  const ranges = threads
    .map((thread) => ({ thread, from: order.get(thread.from), to: order.get(thread.to) }))
    .filter((range): range is { thread: AgentThread; from: number; to: number } => range.from !== undefined && range.to !== undefined);
  for (const [id, position] of order) {
    const hits = ranges.filter((range) => range.from <= position && position <= range.to).map((range) => range.thread);
    if (hits.length) covering.set(id, hits);
  }
  return covering;
}

function inlineXml(items: readonly InlineItem[], ids: IdPrinter, context: AgentXmlContext, covering: Map<CharId, AgentThread[]>): string {
  let xml = '';
  let open: AgentThread[] = [];
  let run: { first: CharItem; last: CharItem; text: string } | undefined;
  const flush = () => {
    if (!run) return;
    xml += `<text${attrs({ id: ids.print(run.first.id), marks: run.first.marks.join(','), href: run.first.href })}>${escapeText(run.text)}</text>`;
    run = undefined;
  };
  const switchThreads = (threads: AgentThread[]) => {
    if (threads.map((thread) => thread.id).join() === open.map((thread) => thread.id).join()) return;
    flush();
    xml += '</comment>'.repeat(open.length);
    xml += threads.map((thread) => `<comment${attrs({ id: thread.id, to: thread.toClaude ? 'claude' : undefined, answered: thread.toClaude ? String(!!thread.answered) : undefined })}>`).join('');
    open = threads;
  };
  for (const item of items) {
    switchThreads(covering.get(item.id) ?? []);
    if (item.kind === 'char') {
      if (run && isNextCharId(run.last.id, item.id) && run.last.href === item.href && run.last.marks.join() === item.marks.join()) {
        run.last = item;
        run.text += item.char;
      } else {
        flush();
        run = { first: item, last: item, text: item.char };
      }
      continue;
    }
    flush();
    xml += atomXml(item, ids, context);
  }
  switchThreads([]);
  flush();
  return xml;
}

/** 文字块的纯文本（大纲用）：chip 写成它显示的样子。 */
function outlineText(block: TextBlock, context: AgentXmlContext): string {
  let text = '';
  for (const item of block.items) {
    if (item.kind === 'char') text += item.char;
    else if (item.kind === 'date') text += item.value;
    else if (item.kind === 'mention') text += `@${item.label ?? item.name ?? item.ref ?? item.user ?? ''}`;
    else if (item.kind === 'dropdown') text += `[${enumLabel(context, item.enum, item.index) ?? '…'}]`;
    else if (item.kind === 'media') text += `[image${item.alt ? `: ${item.alt}` : ''}]`;
    else text += ' ';
  }
  return text;
}

// ---------- 块 ----------

interface Printer {
  ids: IdPrinter;
  context: AgentXmlContext;
  covering: Map<CharId, AgentThread[]>;
  outline: boolean;
}

function tagOf(block: ProseBlock): string {
  switch (block.type) {
    case 'paragraph':
      return 'paragraph';
    case 'codeBlock':
      return 'code';
    case 'listItem':
      return 'item';
    case 'blockquote':
      return 'quote';
    case 'tableRow':
      return 'row';
    default:
      return block.type;
  }
}

function blockAttrs(block: ProseBlock, id: string): Record<string, Attr> {
  const base: Record<string, Attr> = { id, h: blockHash(block) };
  switch (block.type) {
    case 'paragraph':
      return { ...base, heading: block.heading };
    case 'codeBlock':
      return { ...base, language: block.language };
    case 'list':
      return { ...base, kind: block.kind, start: block.start };
    case 'listItem':
      return { ...base, checked: block.checked === undefined ? undefined : String(block.checked) };
    case 'cell':
      return { ...base, header: block.header ? 'true' : undefined, colspan: block.colspan, rowspan: block.rowspan, align: block.align };
    case 'pending':
      return { ...base, intent: block.intent };
    case 'embed':
      return { ...base, ...block.attrs };
    default:
      return base;
  }
}

function blockXml(block: ProseBlock, printer: Printer, depth = 0): string {
  const tag = tagOf(block);
  const open = `<${tag}${attrs(blockAttrs(block, printer.ids.print(block.id)))}`;
  if (isTextBlock(block)) {
    if (printer.outline) {
      const text = outlineText(block, printer.context);
      const short = block.type === 'paragraph' && block.heading ? text : text.length > OUTLINE_TEXT ? `${text.slice(0, OUTLINE_TEXT)}…` : text;
      return `${open}>${escapeText(short)}</${tag}>`;
    }
    return `${open}>${inlineXml(block.items, printer.ids, printer.context, printer.covering)}</${tag}>`;
  }
  if (isContainerBlock(block)) {
    if (printer.outline && depth === 0) return `${open}><gap${attrs({ blocks: block.children.length })}/></${tag}>`;
    return `${open}>${block.children.map((child) => blockXml(child, printer, depth + 1)).join('')}</${tag}>`;
  }
  return `${open}/>`;
}

function printer(blocks: ProseBlock[], context: AgentXmlContext, outline: boolean): Printer {
  return { ids: new IdPrinter(), context, covering: outline ? new Map() : threadsByItem(blocks, context.threads ?? []), outline };
}

/** 整篇：`outline` 为 true 时只有顶层块的大纲。 */
export function docXml(blocks: ProseBlock[], context: AgentXmlContext, options: { outline?: boolean; extra?: Record<string, Attr> } = {}): string {
  const print = printer(blocks, context, !!options.outline);
  const body = blocks.map((block) => blockXml(block, print)).join('');
  return `<doc${attrs({ rev: context.rev, ...options.extra })}>${body}</doc>`;
}

/** 一节或一个块的全文：标题块 = 它到下一个同级或更高级标题之前的所有块。 */
export function sectionBlocks(blocks: ProseBlock[], id: CharId): ProseBlock[] | undefined {
  for (const location of walkBlocks(blocks)) {
    if (location.block.id !== id) continue;
    const block = location.block;
    if (block.type === 'paragraph' && block.heading) {
      const section: ProseBlock[] = [block];
      for (let index = location.index + 1; index < location.siblings.length; index++) {
        const next = location.siblings[index]!;
        if (next.type === 'paragraph' && next.heading && next.heading <= block.heading) break;
        section.push(next);
      }
      return section;
    }
    return [block];
  }
  return undefined;
}

export function blocksXml(all: ProseBlock[], picked: ProseBlock[], context: AgentXmlContext, extra: Record<string, Attr> = {}): string {
  const print = printer(all, context, false);
  return `<doc${attrs({ rev: context.rev, ...extra })}>${picked.map((block) => blockXml(block, print)).join('')}</doc>`;
}

/** 一个块（连同子块）的所有 hash：id → h。 */
function deepHashes(blocks: ProseBlock[]): Map<CharId, string> {
  const hashes = new Map<CharId, string>();
  for (const { block } of walkBlocks(blocks)) hashes.set(block.id, blockHash(block));
  return hashes;
}

function changedSince(block: ProseBlock, previous: Map<CharId, string> | undefined, sinceRev: number): boolean {
  for (const { block: inner } of walkBlocks([block])) {
    if (previous) {
      if (previous.get(inner.id) !== blockHash(inner)) return true;
    } else if (inner.rev > sinceRev) return true;
  }
  return false;
}

/**
 * 某个 rev 以来变了的顶层块：没变的连续几块折成 `<gap blocks='N'/>`，删掉的块在末尾列成 `<gone id/>`。
 * `before` 是那个 rev 时的正文（快照没有时 undefined：按块的 rev 判断，不列删掉的块，`partial='true'`）。
 */
export function sinceXml(blocks: ProseBlock[], before: ProseBlock[] | undefined, sinceRev: number, context: AgentXmlContext): string {
  const print = printer(blocks, context, false);
  const previous = before ? deepHashes(before) : undefined;
  let body = '';
  let gap = 0;
  for (const block of blocks) {
    if (!changedSince(block, previous, sinceRev)) {
      gap++;
      continue;
    }
    if (gap) body += `<gap${attrs({ blocks: gap })}/>`;
    gap = 0;
    body += blockXml(block, print);
  }
  if (gap) body += `<gap${attrs({ blocks: gap })}/>`;
  if (previous) {
    const now = new Set(deepHashes(blocks).keys());
    const top = before!.map((block) => block.id);
    for (const { block, ancestors } of walkBlocks(before!)) {
      if (now.has(block.id)) continue;
      // 只列最外层被删的块
      if (ancestors.some((ancestor) => !now.has(ancestor.id))) continue;
      void top;
      body += `<gone${attrs({ id: print.ids.print(block.id) })}/>`;
    }
  }
  return `<doc${attrs({ rev: context.rev, since: sinceRev, partial: before ? undefined : 'true' })}>${body}</doc>`;
}

export interface SearchHit {
  block: ProseBlock;
  from: CharId;
  to: CharId;
}

/** 搜索：每处命中给出所在的块与字符范围，附近的字作为上下文。 */
export function searchXml(hits: readonly SearchHit[], context: AgentXmlContext, text: string): string {
  const ids = new IdPrinter();
  const body = hits
    .map((hit) => {
      const block = hit.block as TextBlock;
      const plain = outlineText(block, context);
      return `<hit${attrs({ block: ids.print(block.id), h: blockHash(block), from: ids.print(hit.from), to: ids.print(hit.to) })}>${escapeText(plain.length > 300 ? `${plain.slice(0, 300)}…` : plain)}</hit>`;
    })
    .join('');
  return `<doc${attrs({ rev: context.rev, search: text, hits: hits.length })}>${body}</doc>`;
}

/** 回执：每条 op 写下的块（最外层的那些），`<doc op='i'>`；按大纲的样子印（列表、表格折成 `<gap/>`）。 */
export function ackXml(blocks: ProseBlock[], touched: readonly (readonly CharId[])[], context: AgentXmlContext, outline = true): string {
  const print = printer(blocks, context, outline);
  return touched
    .map((ids, index) => {
      const set = new Set(ids);
      const outer: ProseBlock[] = [];
      for (const { block, ancestors } of walkBlocks(blocks)) if (set.has(block.id) && !ancestors.some((ancestor) => set.has(ancestor.id))) outer.push(block);
      return `<doc${attrs({ op: index, rev: context.rev })}>${outer.map((block) => blockXml(block, print)).join('')}</doc>`;
    })
    .join('');
}

// i18n-ignore-file: 拒绝与错误的说明给智能体与运行日志看（编辑器按 code 显示自己的文字）
/**
 * 文档正文模型。磁盘上按「文本段」存（连续 id 合并成一段），内存里展开成逐字条目，方便按字符 id 编辑。
 *
 * 块：段落（可为标题）、代码块、列表 / 列表项、引用、分隔线、表格 / 行 / 单元格、待写块（pending）、嵌入（embed）。
 * 行内：字、日期、提及（人或标签页 / 文档）、换行、下拉选项（引用项目级枚举）、图片（引用 blob）。
 * 嵌入只为了让已有的原样往返：本地不能新建（需要 claude.ai 的组件服务）。
 */
import { charIdRange, isCharId, isNextCharId, type CharId } from './char-id.ts';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type ListKind = 'bullet' | 'ordered' | 'check';
export type Align = 'center' | 'right';

/**
 * 字的格式：`bold` `italic` `strike` `underline` `code` `highlight`（默认黄色）或 `highlight-<颜色>`。
 * 链接不算格式，记在 `href` 上。
 */
export type Mark = string;

export const MARK_NAMES = ['bold', 'italic', 'strike', 'underline', 'code', 'highlight'] as const;

/** 高亮颜色：原版的 `highlight-<颜色>`；黄色是默认，不写颜色。 */
const MARK_PATTERN = /^(?:bold|italic|strike|underline|code|highlight(?:-[a-z]{1,16})?)$/;

export function isMark(value: unknown): value is Mark {
  return typeof value === 'string' && MARK_PATTERN.test(value);
}

// ---------- 行内 ----------

export interface MediaAttrs {
  /** `blob/<id>`：项目里的 blob 记录，字节在文档目录的 `assets/` 下。 */
  blob?: string;
  mime?: string;
  /** 文件名（下载、替代文字的后备）。 */
  name?: string;
  alt?: string;
  /** 原图尺寸（像素）。 */
  dims?: { w: number; h: number };
  /** 裁剪：x / y / w / h 都是 0..1 的比例。 */
  crop?: { x: number; y: number; w: number; h: number };
  align?: Align;
  /** 显示宽度（像素）。 */
  width?: number;
}

export interface CharItem {
  kind: 'char';
  id: CharId;
  char: string;
  marks: Mark[];
  href?: string;
}
export interface DateItem {
  kind: 'date';
  id: CharId;
  /** `YYYY-MM-DD` 或 ISO 时间；刚插入、还没选日期时是空串。 */
  value: string;
}
export interface MentionItem {
  kind: 'mention';
  id: CharId;
  /** 被提及的人（principal，本地是邮箱形式；智能体是 `claude`）。 */
  user?: string;
  /** 链接到标签页或文档：`file/<标签页 id>`、`project/<文档 id>`。 */
  ref?: string;
  label?: string;
  /** 人的显示名（编辑器的名片用）。 */
  name?: string;
  email?: string;
}
export interface BreakItem {
  kind: 'break';
  id: CharId;
}
export interface DropdownItem {
  kind: 'dropdown';
  id: CharId;
  /** 项目级枚举的 id。 */
  enum: string;
  /** 选中的选项（从 0 起）；没选时不写。 */
  index?: number;
}
export interface MediaItem extends MediaAttrs {
  kind: 'media';
  id: CharId;
}
export type AtomItem = DateItem | MentionItem | BreakItem | DropdownItem | MediaItem;
export type InlineItem = CharItem | AtomItem;

// ---------- 块 ----------

interface BlockBase {
  id: CharId;
  /** 最后一次改动这个块的修订号（读增量时用）。 */
  rev: number;
}
export interface ParagraphBlock extends BlockBase {
  type: 'paragraph';
  heading?: HeadingLevel;
  items: InlineItem[];
}
export interface CodeBlock extends BlockBase {
  type: 'codeBlock';
  language?: string;
  items: InlineItem[];
}
export interface ListBlock extends BlockBase {
  type: 'list';
  kind: ListKind;
  /** 有序列表的起始编号（不是 1 时才写）。 */
  start?: number;
  /** 有序列表的编号样式：`a` `A` `i` `I`。 */
  numbering?: string;
  children: ListItemBlock[];
}
export interface ListItemBlock extends BlockBase {
  type: 'listItem';
  checked?: boolean;
  children: ProseBlock[];
}
export interface QuoteBlock extends BlockBase {
  type: 'blockquote';
  children: ProseBlock[];
}
export interface RuleBlock extends BlockBase {
  type: 'rule';
}
export interface TableBlock extends BlockBase {
  type: 'table';
  children: TableRowBlock[];
}
export interface TableRowBlock extends BlockBase {
  type: 'tableRow';
  children: CellBlock[];
}
export interface CellBlock extends BlockBase {
  type: 'cell';
  header?: boolean;
  colspan?: number;
  rowspan?: number;
  /** 每一列的宽度（像素），长度与 colspan 相同；0 表示没设。 */
  colwidth?: number[];
  align?: Align;
  /** `#rrggbb`。 */
  background?: string;
  children: ProseBlock[];
}
export interface PendingBlock extends BlockBase {
  type: 'pending';
  /** 这里将要写什么（给读者看的计划）。 */
  intent: string;
}
export interface EmbedBlock extends BlockBase {
  type: 'embed';
  /** 原样保留的属性（`ref`、`width`、`align`、`caption` 等）。 */
  attrs: Record<string, string>;
}

export type TextBlock = ParagraphBlock | CodeBlock;
export type ContainerBlock = ListBlock | ListItemBlock | QuoteBlock | TableBlock | TableRowBlock | CellBlock;
export type ProseBlock = TextBlock | ContainerBlock | RuleBlock | PendingBlock | EmbedBlock;
export type BlockType = ProseBlock['type'];

export function isTextBlock(block: ProseBlock): block is TextBlock {
  return block.type === 'paragraph' || block.type === 'codeBlock';
}
export function isContainerBlock(block: ProseBlock): block is ContainerBlock {
  return (
    block.type === 'list' ||
    block.type === 'listItem' ||
    block.type === 'blockquote' ||
    block.type === 'table' ||
    block.type === 'tableRow' ||
    block.type === 'cell'
  );
}

/** 正文流里的块（顶层、引用、列表项、单元格里能放的）。 */
const FLOW: ReadonlySet<BlockType> = new Set(['paragraph', 'codeBlock', 'list', 'blockquote', 'rule', 'table', 'pending', 'embed']);

/** 父块（undefined 是顶层）里能放哪种子块：列表只放列表项，表格只放行，行只放单元格，单元格只放段落与列表。 */
export function canContain(parent: BlockType | undefined, child: BlockType): boolean {
  switch (parent) {
    case 'list':
      return child === 'listItem';
    case 'table':
      return child === 'tableRow';
    case 'tableRow':
      return child === 'cell';
    case 'cell':
      // 编辑器的单元格只放段落与列表（schema：`(paragraph | list)+`）
      return child === 'paragraph' || child === 'list';
    case undefined:
    case 'blockquote':
    case 'listItem':
      return FLOW.has(child);
    default:
      return false;
  }
}

// ---------- 磁盘格式 ----------

export interface StoredTextRun {
  type: 'text';
  /** 第一个字的 id，后面每个字的 id 依次 +1。 */
  id: CharId;
  text: string;
  marks?: Mark[];
  href?: string;
}
export type StoredAtom =
  | ({ type: 'date' } & Omit<DateItem, 'kind'>)
  | ({ type: 'mention' } & Omit<MentionItem, 'kind'>)
  | ({ type: 'break' } & Omit<BreakItem, 'kind'>)
  | ({ type: 'dropdown' } & Omit<DropdownItem, 'kind'>)
  | ({ type: 'media' } & Omit<MediaItem, 'kind'>);
export type StoredInline = StoredTextRun | StoredAtom;

/** 磁盘上的块：文本块的 `items` 换成压缩后的 `content`，其余字段与内存相同。 */
export type StoredBlock =
  | (Omit<ParagraphBlock, 'items'> & { content: StoredInline[] })
  | (Omit<CodeBlock, 'items'> & { content: StoredInline[] })
  | (Omit<ListBlock, 'children'> & { children: StoredBlock[] })
  | (Omit<ListItemBlock, 'children'> & { children: StoredBlock[] })
  | (Omit<QuoteBlock, 'children'> & { children: StoredBlock[] })
  | (Omit<TableBlock, 'children'> & { children: StoredBlock[] })
  | (Omit<TableRowBlock, 'children'> & { children: StoredBlock[] })
  | (Omit<CellBlock, 'children'> & { children: StoredBlock[] })
  | RuleBlock
  | PendingBlock
  | EmbedBlock;

// ---------- 校验工具（磁盘内容与 op 里的属性共用） ----------

export class DocFormatError extends Error {}

const MAX_TEXT = 1024;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown, max = MAX_TEXT): string | undefined {
  return typeof value === 'string' && value !== '' && value.length <= max ? value : undefined;
}

/** 1..max 的整数（字符串形式也认）。 */
export function positiveInt(value: unknown, max: number): number | undefined {
  const number = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  return typeof number === 'number' && Number.isInteger(number) && number >= 1 && number <= max ? number : undefined;
}

export function headingLevel(value: unknown): HeadingLevel | undefined {
  return positiveInt(value, 6) as HeadingLevel | undefined;
}

export function listKind(value: unknown): ListKind | undefined {
  return value === 'bullet' || value === 'ordered' || value === 'check' ? value : undefined;
}

export function alignOf(value: unknown): Align | undefined {
  return value === 'center' || value === 'right' ? value : undefined;
}

export function numberingOf(value: unknown): string | undefined {
  return value === 'a' || value === 'A' || value === 'i' || value === 'I' ? value : undefined;
}

export function backgroundOf(value: unknown): string | undefined {
  return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value) ? value.toLowerCase() : undefined;
}

/** 列宽：数组或 `"224,100"`；每项是 0..10000 的整数。 */
export function colwidthOf(value: unknown): number[] | undefined {
  const parts = typeof value === 'string' ? value.replace(/^\[|\]$/g, '').split(',') : Array.isArray(value) ? value : undefined;
  if (!parts || parts.length === 0 || parts.length > 1000) return undefined;
  const widths = parts.map((part) => (part === null ? 0 : Math.trunc(Number(typeof part === 'string' ? part.trim() || NaN : part))));
  if (!widths.every((width) => Number.isFinite(width) && width >= 0)) return undefined;
  return widths.every((width) => width === 0) ? undefined : widths.map((width) => Math.min(width, 10000));
}

function numberList(value: unknown, keys: readonly string[]): number[] | undefined {
  let parts: unknown[] | undefined;
  if (typeof value === 'string') {
    const text = value.trim();
    if (text.startsWith('{')) {
      try {
        return numberList(JSON.parse(text), keys);
      } catch {
        return undefined;
      }
    }
    parts = text.split(',').map((part) => (part.trim() === '' ? NaN : Number(part)));
  } else if (isRecord(value)) parts = keys.map((key) => value[key]);
  else if (Array.isArray(value)) parts = value;
  if (!parts || parts.length !== keys.length || !parts.every((part) => typeof part === 'number' && Number.isFinite(part))) return undefined;
  return parts as number[];
}

/** 图片原尺寸：`{w,h}`、`"w,h"` 或 JSON；1..100000 的整数。 */
export function dimsOf(value: unknown): { w: number; h: number } | undefined {
  const parts = numberList(value, ['w', 'h']);
  if (!parts || !parts.every((part) => Number.isInteger(part) && part >= 1 && part <= 1e5)) return undefined;
  return { w: parts[0]!, h: parts[1]! };
}

/** 裁剪框：`{x,y,w,h}`、`"x,y,w,h"` 或 JSON；都是比例，宽高至少 0.01，不出界。 */
export function cropOf(value: unknown): { x: number; y: number; w: number; h: number } | undefined {
  const parts = numberList(value, ['x', 'y', 'w', 'h']);
  if (!parts) return undefined;
  const [x, y, w, h] = parts as [number, number, number, number];
  if (x < 0 || x > 1 || y < 0 || y > 1 || w < 0.01 || w > 1 || h < 0.01 || h > 1 || x + w > 1.0001 || y + h > 1.0001) return undefined;
  return { x, y, w, h };
}

/** `blob/<id>`（也认不带前缀的 id）。 */
export function blobRefOf(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const id = value.startsWith('blob/') ? value.slice(5) : value;
  return /^[A-Za-z0-9_-]{1,64}$/.test(id) ? `blob/${id}` : undefined;
}

export function mimeOf(value: unknown): string | undefined {
  return typeof value === 'string' && /^[\w.+-]+\/[\w.+-]+$/.test(value) && value.length <= 255 ? value.toLowerCase() : undefined;
}

/** 从任意来源（磁盘、op、XML 属性）规整出图片属性；不认识的字段丢掉。 */
export function mediaAttrsOf(source: Record<string, unknown>): MediaAttrs {
  const attrs: MediaAttrs = {};
  const src = isRecord(source['src']) ? source['src'] : undefined;
  const blob = blobRefOf(source['blob'] ?? src?.['blob']);
  if (blob) attrs.blob = blob;
  const mime = mimeOf(source['mime'] ?? src?.['mime']);
  if (mime) attrs.mime = mime;
  const name = optionalString(source['name'], 512);
  if (name) attrs.name = name;
  const alt = optionalString(source['alt']);
  if (alt) attrs.alt = alt;
  const dims = dimsOf(source['dims']);
  if (dims) attrs.dims = dims;
  const crop = cropOf(source['crop']);
  if (crop) attrs.crop = crop;
  const align = alignOf(source['align']);
  if (align) attrs.align = align;
  const width = positiveInt(source['width'], 4096);
  if (width) attrs.width = width;
  return attrs;
}

// ---------- 展开 / 压缩 ----------

function fail(where: string, message: string): never {
  throw new DocFormatError(`${where}：${message}`);
}

function requireId(value: unknown, where: string): CharId {
  if (!isCharId(value)) fail(where, `id ${JSON.stringify(value)} 不是 <会话>.<序号>`);
  return value;
}

function readAtom(raw: Record<string, unknown>, where: string): AtomItem {
  const id = requireId(raw['id'], where);
  switch (raw['type']) {
    case 'date':
      // 刚插入、还没选日期的是空串
      return { kind: 'date', id, value: typeof raw['value'] === 'string' ? raw['value'].slice(0, 64) : '' };
    case 'mention': {
      const item: MentionItem = { kind: 'mention', id };
      for (const key of ['user', 'ref', 'label', 'name', 'email'] as const) {
        const value = optionalString(raw[key], 512);
        if (value) item[key] = value;
      }
      return item;
    }
    case 'break':
      return { kind: 'break', id };
    case 'dropdown': {
      const item: DropdownItem = { kind: 'dropdown', id, enum: typeof raw['enum'] === 'string' ? raw['enum'] : '' };
      if (Number.isInteger(raw['index']) && (raw['index'] as number) >= 0) item.index = raw['index'] as number;
      return item;
    }
    case 'media':
      return { kind: 'media', id, ...mediaAttrsOf(raw) };
    default:
      return fail(where, `不认识的行内类型 ${JSON.stringify(raw['type'])}`);
  }
}

export function expandInlines(content: unknown, where: string): InlineItem[] {
  if (!Array.isArray(content)) fail(where, 'content 不是数组');
  const items: InlineItem[] = [];
  content.forEach((raw: unknown, index) => {
    const at = `${where}.content[${index}]`;
    if (!isRecord(raw)) fail(at, '不是对象');
    if (raw['type'] !== 'text') {
      items.push(readAtom(raw, at));
      return;
    }
    const id = requireId(raw['id'], at);
    if (typeof raw['text'] !== 'string' || raw['text'] === '') fail(at, '文本段缺少 text');
    const marks = Array.isArray(raw['marks']) ? raw['marks'].filter(isMark) : [];
    const href = optionalString(raw['href'], 4096);
    const chars = Array.from(raw['text']);
    const ids = charIdRange(id, chars.length);
    chars.forEach((char, offset) => {
      const item: CharItem = { kind: 'char', id: ids[offset]!, char, marks: [...marks] };
      if (href) item.href = href;
      items.push(item);
    });
  });
  return items;
}

function sameFormatting(a: CharItem, b: CharItem): boolean {
  return a.href === b.href && a.marks.length === b.marks.length && a.marks.every((mark) => b.marks.includes(mark));
}

export function compressInlines(items: readonly InlineItem[]): StoredInline[] {
  const content: StoredInline[] = [];
  let run: { first: CharItem; last: CharItem; text: string } | undefined;
  const flush = () => {
    if (!run) return;
    const stored: StoredTextRun = { type: 'text', id: run.first.id, text: run.text };
    if (run.first.marks.length) stored.marks = [...run.first.marks];
    if (run.first.href) stored.href = run.first.href;
    content.push(stored);
    run = undefined;
  };
  for (const item of items) {
    if (item.kind === 'char') {
      if (run && isNextCharId(run.last.id, item.id) && sameFormatting(run.first, item)) {
        run.last = item;
        run.text += item.char;
      } else {
        flush();
        run = { first: item, last: item, text: item.char };
      }
      continue;
    }
    flush();
    const { kind, ...rest } = item;
    content.push({ type: kind, ...structuredClone(rest) } as StoredAtom);
  }
  flush();
  return content;
}

function children(raw: Record<string, unknown>, where: string): unknown[] {
  if (!Array.isArray(raw['children'])) fail(where, 'children 不是数组');
  return raw['children'];
}

/** 读一个磁盘上的块（校验结构），展开成内存格式。`parent` 是父块类型，顶层为 undefined。 */
export function expandBlock(raw: unknown, where: string, parent?: BlockType): ProseBlock {
  if (!isRecord(raw)) fail(where, '块不是对象');
  const type = raw['type'] as BlockType;
  if (!canContain(parent, type))
    fail(where, `${parent ?? '顶层'} 里不能放 ${JSON.stringify(raw['type'])}`);
  const id = requireId(raw['id'], where);
  const rev = Number.isInteger(raw['rev']) && (raw['rev'] as number) >= 0 ? (raw['rev'] as number) : 0;
  const kids = () => children(raw, where).map((child, index) => expandBlock(child, `${where}.children[${index}]`, type));
  switch (type) {
    case 'paragraph': {
      const block: ParagraphBlock = { type, id, rev, items: expandInlines(raw['content'], where) };
      const heading = headingLevel(raw['heading']);
      if (heading) block.heading = heading;
      return block;
    }
    case 'codeBlock': {
      const block: CodeBlock = { type, id, rev, items: expandInlines(raw['content'], where) };
      const language = optionalString(raw['language'], 64);
      if (language) block.language = language;
      return block;
    }
    case 'list': {
      const block: ListBlock = { type, id, rev, kind: listKind(raw['kind']) ?? 'bullet', children: kids() as ListItemBlock[] };
      const start = Number.isInteger(raw['start']) ? (raw['start'] as number) : undefined;
      if (start !== undefined && start !== 1 && start >= 0) block.start = start;
      const numbering = numberingOf(raw['numbering']);
      if (numbering) block.numbering = numbering;
      return block;
    }
    case 'listItem': {
      const block: ListItemBlock = { type, id, rev, children: kids() };
      if (typeof raw['checked'] === 'boolean') block.checked = raw['checked'];
      return block;
    }
    case 'blockquote':
      return { type, id, rev, children: kids() };
    case 'table':
      return { type, id, rev, children: kids() as TableRowBlock[] };
    case 'tableRow':
      return { type, id, rev, children: kids() as CellBlock[] };
    case 'cell':
      return { type, id, rev, ...cellAttrsOf(raw), children: kids() };
    case 'rule':
      return { type, id, rev };
    case 'pending':
      return { type, id, rev, intent: typeof raw['intent'] === 'string' ? raw['intent'] : '' };
    case 'embed': {
      const attrs = isRecord(raw['attrs']) ? raw['attrs'] : {};
      return { type, id, rev, attrs: embedAttrsOf(attrs) };
    }
    default:
      return fail(where, `不认识的块类型 ${JSON.stringify(raw['type'])}`);
  }
}

/** 单元格属性：表头、跨行列、列宽、对齐、底色。 */
export function cellAttrsOf(raw: Record<string, unknown>): Omit<CellBlock, 'type' | 'id' | 'rev' | 'children'> {
  const attrs: Omit<CellBlock, 'type' | 'id' | 'rev' | 'children'> = {};
  if (raw['header'] === true || raw['header'] === 'true') attrs.header = true;
  const colspan = positiveInt(raw['colspan'], 1000);
  if (colspan && colspan !== 1) attrs.colspan = colspan;
  const rowspan = positiveInt(raw['rowspan'], 65535);
  if (rowspan && rowspan !== 1) attrs.rowspan = rowspan;
  const colwidth = colwidthOf(raw['colwidth']);
  if (colwidth) attrs.colwidth = colwidth;
  const align = alignOf(raw['align']);
  if (align) attrs.align = align;
  const background = backgroundOf(raw['background']);
  if (background) attrs.background = background;
  return attrs;
}

/** 嵌入的属性：字符串原样保留（宽度 1..4096、对齐、不超过 1 KB 的说明另作校验）。 */
export function embedAttrsOf(raw: Record<string, unknown>): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(key) || ['id', 'rev', 'type', 'h'].includes(key)) continue;
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') continue;
    const text = String(value);
    if (key === 'width') {
      const width = positiveInt(text, 4096);
      if (width) attrs[key] = String(width);
    } else if (key === 'align') {
      const align = alignOf(text);
      if (align) attrs[key] = align;
    } else if (key === 'caption') {
      const caption = text.trim();
      if (caption && new TextEncoder().encode(caption).length <= 1024) attrs[key] = caption;
    } else if (text.length <= 4096) attrs[key] = text;
  }
  return attrs;
}

export function compressBlock(block: ProseBlock): StoredBlock {
  if (isTextBlock(block)) {
    const { items, ...rest } = block;
    return { ...structuredClone(rest), content: compressInlines(items) } as StoredBlock;
  }
  if (isContainerBlock(block)) {
    const { children: kids, ...rest } = block;
    return { ...structuredClone(rest), children: kids.map(compressBlock) } as StoredBlock;
  }
  return structuredClone(block);
}

/** 读一个标签页正文（磁盘格式），校验后展开；块或字 id 重复时报错。 */
export function readBlocks(raw: unknown, where: string): ProseBlock[] {
  if (!Array.isArray(raw)) fail(where, 'blocks 不是数组');
  const blocks = raw.map((block, index) => expandBlock(block, `${where}.blocks[${index}]`));
  const seen = new Set<CharId>();
  for (const id of documentOrder(blocks).keys()) {
    if (seen.has(id)) fail(where, `id ${id} 重复`);
    seen.add(id);
  }
  return blocks;
}

// ---------- 遍历 ----------

export interface BlockLocation {
  block: ProseBlock;
  /** 所在的兄弟列表（顶层或某个容器的 children）。 */
  siblings: ProseBlock[];
  index: number;
  parent: ContainerBlock | undefined;
  /** 从顶层到该块的祖先链（不含自身）。 */
  ancestors: ContainerBlock[];
}

export function* walkBlocks(blocks: ProseBlock[], parent?: ContainerBlock, ancestors: ContainerBlock[] = []): Generator<BlockLocation> {
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index]!;
    yield { block, siblings: blocks, index, parent, ancestors };
    if (isContainerBlock(block)) yield* walkBlocks(block.children, block, [...ancestors, block]);
  }
}

export function findBlock(blocks: ProseBlock[], id: CharId): BlockLocation | undefined {
  for (const location of walkBlocks(blocks)) if (location.block.id === id) return location;
  return undefined;
}

export interface ItemLocation {
  block: TextBlock;
  blockLocation: BlockLocation;
  index: number;
  item: InlineItem;
}

export function findItem(blocks: ProseBlock[], id: CharId): ItemLocation | undefined {
  for (const location of walkBlocks(blocks)) {
    if (!isTextBlock(location.block)) continue;
    const index = location.block.items.findIndex((item) => item.id === id);
    if (index >= 0) return { block: location.block, blockLocation: location, index, item: location.block.items[index]! };
  }
  return undefined;
}

/** 文档顺序里的所有 id（块 id 与字符 id），用于比较先后和展开区间。 */
export function documentOrder(blocks: ProseBlock[]): Map<CharId, number> {
  const order = new Map<CharId, number>();
  for (const { block } of walkBlocks(blocks)) {
    order.set(block.id, order.size);
    if (isTextBlock(block)) for (const item of block.items) order.set(item.id, order.size);
  }
  return order;
}

/** 行内条目的纯文本：提及写成 `@名字`，日期写原值，换行是 `\n`，下拉与图片不出字。 */
export function itemText(item: InlineItem): string {
  switch (item.kind) {
    case 'char':
      return item.char;
    case 'mention':
      return `@${item.label ?? item.name ?? item.user ?? item.ref ?? ''}`;
    case 'date':
      return item.value;
    case 'break':
      return '\n';
    default:
      return '';
  }
}

export function plainText(block: ProseBlock): string {
  if (isTextBlock(block)) return block.items.map(itemText).join('');
  if (isContainerBlock(block)) return block.children.map(plainText).join('\n');
  if (block.type === 'pending') return block.intent;
  return '';
}

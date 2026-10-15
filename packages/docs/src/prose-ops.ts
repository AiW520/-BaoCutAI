// i18n-ignore-file: 拒绝与错误的说明给智能体与运行日志看（编辑器按 code 显示自己的文字）
/**
 * 正文编辑操作：把 prose ops 应用到一个标签页的正文上（整批要么全部生效，要么一条也不生效）。
 *
 * 字符与块都用 id 定位；新字、新块的 id 由编辑器预先分配（带在 op 的 `ids` / `id` 里），没带时服务端用补发会话补。
 * 认两种写法：编辑器宿主的「行」写法（`block_split`、`block_join`、`mark`、`attr`、`block_del`、`block_move`、`wrap{block}`…）
 * 与 door 的「最终」写法（`split`、`join`、`format`、`set`、`delete`、`move`、`wrap{target}`…），后者先换成前者再应用。
 *
 * 不支持的（一律拒绝、整批不生效）：
 * - 新建嵌入（图表、组件）：`unsupported_construct`，它们要 claude.ai 的组件服务；已有的嵌入可以挪动、改宽度与对齐、删除。
 * - `restore` / `revive`（按修订恢复）：`unsupported_edit`，服务端能力里没有声明，编辑器不会发。
 * - 不合结构的修改（例如把段落直接放进表格行）：`unsupported_edit`，编辑器收到后会重读正文。
 */
import { charIdRange, formatCharId, isCharId, parseCharId, type CharId } from './char-id.ts';
import { markdownToWire } from './markdown.ts';
import { OpError } from './op-error.ts';
import {
  alignOf,
  canContain,
  cellAttrsOf,
  colwidthOf,
  cropOf,
  dimsOf,
  documentOrder,
  embedAttrsOf,
  findBlock,
  findItem,
  headingLevel,
  isContainerBlock,
  isMark,
  isTextBlock,
  listKind,
  mediaAttrsOf,
  numberingOf,
  positiveInt,
  walkBlocks,
  backgroundOf,
  type BlockLocation,
  type BlockType,
  type CellBlock,
  type CharItem,
  type ContainerBlock,
  type InlineItem,
  type ListBlock,
  type ListItemBlock,
  type ListKind,
  type Mark,
  type MediaItem,
  type ParagraphBlock,
  type ProseBlock,
  type TextBlock,
} from './prose-document.ts';

// ---------- op 形状 ----------

export type ProseTarget =
  | { kind: 'chars'; range?: [CharId, CharId]; runs?: [CharId, CharId][] }
  | { kind: 'blocks'; ids: CharId[] }
  | { kind: 'root' }
  | FindTarget
  | CellTarget;

/** 按引用的原文定位（连接器用）：不跨换行、chip 与块；`nth` 从 1 起；`within` 限定在一个单元格，`parentId` 限定在一个块或标题的一节。 */
export interface FindTarget {
  kind: 'find';
  text: string;
  nth?: number;
  within?: CellTarget;
  parentId?: CharId;
  /** 选中所在的整块 / 整个单元格，而不是这些字。 */
  select?: 'blocks' | 'cells';
  /** 所有匹配（最多 512 处）。 */
  allowMultiple?: boolean;
}

/** 按位置定位单元格：`row` / `col` 从 0 起，-1 是最后一行 / 列；第 0 行是表头行。 */
export interface CellTarget {
  kind: 'cell';
  table: CharId;
  row: number;
  col: number;
}

export interface InlineSource {
  from: { kind: 'inline'; content: string | WireNode[] } | { kind: 'blob'; id: string };
  as: 'text' | 'inline' | 'blocks' | 'markdown';
  /** markdown 里 `<?claude block k?>` 的 chip 表（连接器写法，放在 `from` 旁边）。 */
  blocks?: Record<string, unknown>;
  /** 简写：`{text: "…"}` 等于 `{from:{kind:'inline', content:"…"}, as:'text'}`。 */
  text?: string;
}

/** 编辑器发来的结构化内容（ProseMirror JSON 的子集，块和字可带 id）。 */
export interface WireNode {
  type: string;
  text?: string;
  id?: CharId;
  attrs?: Record<string, unknown>;
  marks?: { type: string; attrs?: Record<string, unknown>; color?: unknown }[];
  content?: WireNode[];
}

export type IdAllocation = CharId[] | { from: CharId; count: number };

export type Side = 'after' | 'before' | 'start' | 'end';

export interface InsertOp {
  op: 'insert';
  target: ProseTarget;
  side?: Side;
  source: InlineSource;
  ids?: IdAllocation;
  /** 在 target 列出的每个块旁各放一份（表格加一列）。 */
  each?: boolean;
}
export interface DeleteOp {
  op: 'delete';
  target: ProseTarget;
}
export interface ReplaceOp {
  op: 'replace';
  target: ProseTarget;
  with: InlineSource;
  ids?: IdAllocation;
}
export interface BlockSplitOp {
  op: 'block_split';
  at: CharId;
  side: 'after' | 'before';
  id?: CharId;
  item?: CharId;
  resurrect?: CharId;
}
export interface BlockJoinOp {
  op: 'block_join';
  block: [CharId, CharId];
  dir?: 'forward' | 'backward';
}
export interface MarkOp {
  op: 'mark';
  style: string;
  on: boolean;
  attrs?: Record<string, unknown>;
  range: [CharId, CharId];
  id?: CharId;
}
export interface SetOp {
  op: 'set';
  target: ProseTarget;
  attrs: Record<string, unknown>;
}
/** 把一个块（block）或一段相邻的兄弟块（from..to）包进新容器：列表（每块一个列表项）或引用。 */
export interface WrapOp {
  op: 'wrap';
  block?: CharId;
  from?: CharId;
  to?: CharId;
  in: { type: string; kind?: string };
  /** 新容器的 id：先容器，再依次是各列表项。 */
  ids?: CharId[];
}
/** 拆掉一个容器，把它的子块放回原处；拆的是列表中间的一项时，后面的项另成一个列表（id 用 op.id）。 */
export interface UnwrapOp {
  op: 'unwrap';
  block: CharId;
  id?: CharId;
}
/** 把块挪到某块之前 / 之后，或某个容器的开头（after: "head"）/ 末尾（只给 parent）。 */
export interface BlockMoveOp {
  op: 'block_move';
  block: CharId;
  before?: CharId;
  after?: CharId;
  parent?: CharId;
  /** 挪过去之后换用的新 id。 */
  id?: CharId;
}
export interface BlockDelOp {
  op: 'block_del';
  block: CharId | CharId[];
}
export interface AttrOp {
  op: 'attr';
  at?: CharId;
  block?: CharId;
  set: Record<string, unknown>;
}

export type ProseOp =
  | InsertOp
  | DeleteOp
  | ReplaceOp
  | BlockSplitOp
  | BlockJoinOp
  | MarkOp
  | SetOp
  | WrapOp
  | UnwrapOp
  | BlockMoveOp
  | BlockDelOp
  | AttrOp
  | { op: string; [key: string]: unknown };

export interface OpResult {
  changed: boolean;
  /** 这条 op 用掉的新 id（编辑器带来的或服务端补发的），按分配顺序。 */
  minted?: CharId[];
  /** 新建或内容、属性变了的块（新建块的子块也算）。 */
  touched: CharId[];
  /** 被移除的块。 */
  removed: CharId[];
}

export type ApplyOutcome =
  | { ok: true; blocks: ProseBlock[]; results: OpResult[]; usedIds: CharId[] }
  | { ok: false; reason: string; detail?: string; index?: number; data?: Record<string, unknown> };

export { OpError };

export interface ApplyOptions {
  rev: number;
  /** 编辑器没带 id 时，服务端补发 id 用的会话前缀与起始序号（由调用方保证不重复）。 */
  mintSession: string;
  mintFrom: number;
  /** 图片引用的 `blob/<id>` 是不是这份文档的；不给时不查。 */
  blobExists?: (ref: string) => boolean;
  /** 图片缺 mime / 名字时从 blob 记录补。 */
  blobInfo?: (ref: string) => { mime?: string; name?: string } | undefined;
  /** markdown 里 `<?claude block k?>` 对应的块与行内元素（op 自己没带 `blocks` 时用）。 */
  chips?: Record<string, WireNode>;
  /** 智能体的写法：一个落点只能是一个块（place_arity）、同一处插两次（same_anchor）、不许换成空内容。 */
  agent?: boolean;
  /** 提及 `user: 'me'` 指的人（智能体代表的本机用户）。 */
  me?: { principal: string; name?: string };
  /** `from: {kind:'blob'}` 的来源：blob 里的文字（markdown）；没有这个 blob 时 undefined。 */
  blobText?: (ref: string) => string | undefined;
}

// ---------- id 分配 ----------

/** 按 ids 字段（数组或 {from,count}）取 id；不够的用补发会话补。 */
export class IdSource {
  private readonly ids: CharId[];
  private readonly fallback: () => CharId;
  private cursor = 0;
  readonly used: CharId[] = [];

  constructor(allocation: IdAllocation | undefined, fallback: () => CharId) {
    this.fallback = fallback;
    if (Array.isArray(allocation)) this.ids = allocation.filter(isCharId);
    else if (allocation && isCharId(allocation.from) && Number.isInteger(allocation.count) && allocation.count >= 0)
      this.ids = charIdRange(allocation.from, Math.min(allocation.count, 1_000_000));
    else this.ids = [];
  }

  /** 下一个 id：先用 op 带来的，用完了补发。 */
  next(): CharId {
    const id = this.cursor < this.ids.length ? this.ids[this.cursor++]! : this.fallback();
    this.used.push(id);
    return id;
  }

  /** 服务端自己要的 id（例如给空单元格补的段落）：不占 op 带来的 id，以免错开编辑器的分配。 */
  mint(): CharId {
    const id = this.fallback();
    this.used.push(id);
    return id;
  }

  /** op 里另外点名的 id（split 的 id / item、move 的 id）。 */
  claim(id: CharId | undefined): void {
    if (id && isCharId(id)) this.used.push(id);
  }
}

/** 一条 op 执行期间的上下文：分配 id、记下改动了哪些块。 */
class OpContext {
  readonly touched = new Set<CharId>();
  readonly removed = new Set<CharId>();
  readonly ids: IdSource;
  readonly rev: number;
  readonly options: ApplyOptions;

  constructor(ids: IdSource, rev: number, options: ApplyOptions) {
    this.ids = ids;
    this.rev = rev;
    this.options = options;
  }

  touch(block: ProseBlock): void {
    block.rev = this.rev;
    this.touched.add(block.id);
    this.removed.delete(block.id);
  }

  /** 新建的块：连同子块都记为改动。 */
  created(block: ProseBlock): void {
    for (const { block: inner } of walkBlocks([block])) this.touch(inner);
  }

  remove(block: ProseBlock): void {
    for (const { block: inner } of walkBlocks([block])) {
      this.removed.add(inner.id);
      this.touched.delete(inner.id);
    }
  }

  result(extra: { minted?: boolean } = {}): OpResult {
    return {
      changed: true,
      ...(extra.minted === false ? {} : { minted: [...this.ids.used] }),
      touched: [...this.touched],
      removed: [...this.removed],
    };
  }
}

// ---------- 行内内容 ----------

/** 编辑器的格式名 → 存储的格式名。`highlight` 可带颜色（attrs.color 或 `highlight-<颜色>`），黄色是默认。 */
const MARK_ALIASES: Record<string, Mark> = {
  bold: 'bold',
  strong: 'bold',
  b: 'bold',
  italic: 'italic',
  em: 'italic',
  i: 'italic',
  strike: 'strike',
  s: 'strike',
  del: 'strike',
  underline: 'underline',
  u: 'underline',
  code: 'code',
  highlight: 'highlight',
  mark: 'highlight',
};

/** 把一个格式（类型名 + 属性）换成存储的格式名；链接与不认识的返回 undefined。 */
export function markOf(type: string, attrs?: Record<string, unknown>, color?: unknown): Mark | undefined {
  if (type.startsWith('highlight-')) return highlightMark(type.slice('highlight-'.length));
  const mark = MARK_ALIASES[type];
  if (mark === 'highlight') return highlightMark(color ?? attrs?.['color']);
  return mark;
}

function highlightMark(color: unknown): Mark {
  if (typeof color !== 'string') return 'highlight';
  const name = color.trim().toLowerCase();
  if (name === '' || name === 'yellow' || name === '#ffff00') return 'highlight';
  const mark = `highlight-${name}`;
  return isMark(mark) ? mark : 'highlight';
}

function isHighlight(mark: Mark): boolean {
  return mark === 'highlight' || mark.startsWith('highlight-');
}

function textItems(text: string, ids: IdSource, template?: CharItem): InlineItem[] {
  return Array.from(text.replace(/\r\n?/g, '\n')).map((char): InlineItem => {
    if (char === '\n') return { kind: 'break', id: ids.next() };
    const item: CharItem = { kind: 'char', id: ids.next(), char, marks: [...(template?.marks ?? [])] };
    if (template?.href) item.href = template.href;
    return item;
  });
}

function atomId(node: WireNode, ids: IdSource): CharId {
  const fromAttrs = node.attrs?.['id'];
  if (isCharId(node.id)) return node.id;
  if (isCharId(fromAttrs)) return fromAttrs;
  return ids.next();
}

function stringAttr(attrs: Record<string, unknown> | undefined, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = attrs?.[key];
    if (typeof value === 'string' && value !== '') return value;
  }
  return undefined;
}

/** 行内节点 → 条目。块级节点出现在这里时报错。 */
function wireInline(node: WireNode, ctx: OpContext): InlineItem[] {
  const { ids } = ctx;
  const attrs = node.attrs;
  switch (node.type) {
    case 'text': {
      const marks: Mark[] = [];
      let href: string | undefined;
      for (const mark of node.marks ?? []) {
        if (mark.type === 'link' || mark.type === 'a') {
          const target = mark.attrs?.['href'];
          if (typeof target === 'string' && target) href = target.slice(0, 4096);
          continue;
        }
        const name = markOf(mark.type, mark.attrs, mark.color);
        if (!name || marks.includes(name)) continue;
        if (isHighlight(name)) marks.splice(0, marks.length, ...marks.filter((existing) => !isHighlight(existing)));
        marks.push(name);
      }
      return Array.from(node.text ?? '').map((char) => {
        if (char === '\n') return { kind: 'break', id: ids.next() };
        const item: CharItem = { kind: 'char', id: ids.next(), char, marks: [...marks] };
        if (href) item.href = href;
        return item;
      });
    }
    case 'date':
      return [{ kind: 'date', id: atomId(node, ids), value: String(attrs?.['ts'] ?? attrs?.['value'] ?? '').slice(0, 64) }];
    case 'mention': {
      const item: InlineItem = { kind: 'mention', id: atomId(node, ids) };
      const user = stringAttr(attrs, 'principal', 'user');
      const ref = stringAttr(attrs, 'ref');
      const label = stringAttr(attrs, 'label');
      const name = stringAttr(attrs, 'name');
      const email = stringAttr(attrs, 'email');
      if (user) item.user = user;
      if (ref) item.ref = ref;
      if (label) item.label = label;
      if (name) item.name = name;
      if (email) item.email = email;
      if (!user && !ref) throw new OpError('unsupported_edit', '提及要有 principal（人）或 ref（标签页 / 文档）');
      return [item];
    }
    case 'hardBreak':
    case 'br':
      return [{ kind: 'break', id: atomId(node, ids) }];
    case 'dropdown': {
      const enumId = stringAttr(attrs, 'enum');
      if (!enumId) throw new OpError('unsupported_edit', '下拉选项要有 enum');
      const item: InlineItem = { kind: 'dropdown', id: atomId(node, ids), enum: enumId };
      const index = attrs?.['index'];
      if (Number.isInteger(index) && (index as number) >= 0) item.index = index as number;
      return [item];
    }
    case 'media':
    case 'image':
    case 'img':
      return [mediaItem(node, ctx)];
    default:
      // 行内的容器（例如编辑器偶尔包一层）：展开子节点
      if (node.content && !BLOCK_TYPES[node.type]) return node.content.flatMap((child) => wireInline(child, ctx));
      throw new OpError('unsupported_edit', `行内位置不能放 ${node.type}`);
  }
}

function mediaItem(node: WireNode, ctx: OpContext): MediaItem {
  const attrs = { ...(node.attrs ?? {}) };
  if (attrs['blob'] === undefined && typeof attrs['src'] === 'string' && attrs['src'].startsWith('blob/')) attrs['blob'] = attrs['src'];
  const media = mediaAttrsOf(attrs);
  if (!media.blob) throw new OpError('unsupported_construct', '图片要先上传（POST /api/blob 再 create blob），正文里引用 blob/<id>');
  if (ctx.options.blobExists && !ctx.options.blobExists(media.blob))
    throw new OpError('blob_unknown', `${media.blob} 不是这份文档里的素材`);
  const info = ctx.options.blobInfo?.(media.blob);
  if (!media.mime && info?.mime) media.mime = info.mime;
  if (!media.name && info?.name) media.name = info.name;
  return { kind: 'media', id: atomId(node, ctx.ids), ...media };
}

// ---------- 块内容 ----------

const BLOCK_TYPES: Record<string, BlockType> = {
  paragraph: 'paragraph',
  heading: 'paragraph',
  codeBlock: 'codeBlock',
  code_block: 'codeBlock',
  list: 'list',
  bulletList: 'list',
  orderedList: 'list',
  taskList: 'list',
  listItem: 'listItem',
  taskItem: 'listItem',
  blockquote: 'blockquote',
  horizontalRule: 'rule',
  rule: 'rule',
  hr: 'rule',
  table: 'table',
  tableRow: 'tableRow',
  row: 'tableRow',
  tr: 'tableRow',
  cell: 'cell',
  tableCell: 'cell',
  tableHeader: 'cell',
  td: 'cell',
  th: 'cell',
  pending: 'pending',
  embed: 'embed',
};

function blockIdOf(node: WireNode, ids: IdSource): CharId {
  const fromAttrs = node.attrs?.['bid'] ?? node.attrs?.['id'];
  if (isCharId(node.id)) return node.id;
  if (isCharId(fromAttrs)) return fromAttrs;
  return ids.next();
}

function emptyParagraph(ctx: OpContext): ParagraphBlock {
  return { type: 'paragraph', id: ctx.ids.mint(), rev: ctx.rev, items: [] };
}

/** 结构化块 → 块。先分配自身 id 再处理子节点（先序），与编辑器预分配 id 的顺序一致。 */
function wireBlock(node: WireNode, ctx: OpContext, parentKind?: ListKind): ProseBlock {
  const type = BLOCK_TYPES[node.type];
  if (!type) throw new OpError('unsupported_edit', `不支持的块类型 ${node.type}`);
  if (type === 'embed')
    throw new OpError('unsupported_construct', '图表、示意图与组件（embed）要 claude.ai 的组件服务，本地不能新建：用表格或列表代替');
  const attrs = node.attrs ?? {};
  const id = blockIdOf(node, ctx.ids);
  const rev = ctx.rev;
  const kids = (parent: BlockType, kind?: ListKind) =>
    (node.content ?? []).map((child) => {
      const block = wireBlock(child, ctx, kind);
      if (!canContain(parent, block.type)) throw new OpError('unsupported_edit', `${parent} 里不能放 ${block.type}`);
      return block;
    });
  const inline = () => (node.content ?? []).flatMap((child) => wireInline(child, ctx));
  switch (type) {
    case 'paragraph': {
      const block: ParagraphBlock = { type, id, rev, items: inline() };
      const heading = node.type === 'heading' ? (headingLevel(attrs['level']) ?? 1) : headingLevel(attrs['heading']);
      if (heading) block.heading = heading;
      return block;
    }
    case 'codeBlock': {
      // 代码块里只有文字与换行：格式、链接与原子去掉
      const items = inline().flatMap((item): InlineItem[] =>
        item.kind === 'char' ? [{ kind: 'char', id: item.id, char: item.char, marks: [] }] : item.kind === 'break' ? [item] : [],
      );
      const block: TextBlock = { type, id, rev, items };
      const language = stringAttr(attrs, 'language');
      if (language) block.language = language.slice(0, 64);
      return block;
    }
    case 'list': {
      const kind: ListKind =
        node.type === 'orderedList' ? 'ordered' : node.type === 'taskList' ? 'check' : node.type === 'bulletList' ? 'bullet' : (listKind(attrs['kind']) ?? 'bullet');
      const block: ListBlock = { type, id, rev, kind, children: kids('list', kind) as ListItemBlock[] };
      const start = positiveInt(attrs['start'], 1_000_000);
      if (kind === 'ordered' && start && start !== 1) block.start = start;
      const numbering = kind === 'ordered' ? numberingOf(attrs['numbering']) : undefined;
      if (numbering) block.numbering = numbering;
      if (!block.children.length) block.children.push(listItemWith(emptyParagraph(ctx), ctx, kind));
      return block;
    }
    case 'listItem': {
      const block: ListItemBlock = { type, id, rev, children: kids('listItem') };
      const checked = attrs['checked'];
      if (parentKind === 'check' || node.type === 'taskItem') block.checked = checked === true || checked === 'true';
      else if (typeof checked === 'boolean' && parentKind === undefined) block.checked = checked;
      if (!block.children.length || block.children[0]!.type !== 'paragraph') block.children.unshift(emptyParagraph(ctx));
      return block;
    }
    case 'blockquote': {
      const block: ProseBlock = { type, id, rev, children: kids('blockquote') };
      if (!block.children.length) block.children.push(emptyParagraph(ctx));
      return block;
    }
    case 'table': {
      const block: ProseBlock = { type, id, rev, children: kids('table') as never };
      if (!block.children.length) throw new OpError('unsupported_edit', '表格至少要有一行');
      return block;
    }
    case 'tableRow': {
      const block: ProseBlock = { type, id, rev, children: kids('tableRow') as never };
      if (!block.children.length) throw new OpError('unsupported_edit', '表格行至少要有一个单元格');
      return block;
    }
    case 'cell': {
      const block: CellBlock = { type, id, rev, ...cellAttrsOf(attrs), children: kids('cell') };
      if (node.type === 'tableHeader' || node.type === 'th') block.header = true;
      if (!block.children.length) block.children.push(emptyParagraph(ctx));
      return block;
    }
    case 'rule':
      return { type, id, rev };
    case 'pending':
      return { type, id, rev, intent: String(attrs['intent'] ?? '').slice(0, 2000) };
    default:
      throw new OpError('unsupported_edit', `不支持的块类型 ${node.type}`);
  }
}

function listItemWith(child: ProseBlock, ctx: OpContext, kind: ListKind): ListItemBlock {
  return { type: 'listItem', id: ctx.ids.mint(), rev: ctx.rev, ...(kind === 'check' ? { checked: false } : {}), children: [child] };
}

/** 来源内容 → 块：文本是一个段落（多行就多个段落），markdown 按块解析，结构化内容逐个转换。 */
function sourceBlocks(source: InlineSource, ctx: OpContext): ProseBlock[] {
  const content = sourceContent(source, ctx);
  if (source.as === 'markdown') {
    if (typeof content !== 'string') throw new OpError('unsupported_edit', 'markdown 内容要是字符串');
    return markdownToWire(content, sourceChips(source, ctx)).map((node) => wireBlock(node, ctx));
  }
  if (typeof content === 'string') {
    return content
      .replace(/\r\n?/g, '\n')
      .split('\n')
      .map((line): ParagraphBlock => {
        const id = ctx.ids.next();
        return { type: 'paragraph', id, rev: ctx.rev, items: textItems(line, ctx.ids) };
      });
  }
  if (!Array.isArray(content)) throw new OpError('unsupported_edit', '缺少插入的内容');
  // 结构化内容里只有行内节点时，包成一个段落
  if (content.every((node) => !BLOCK_TYPES[node.type]))
    return [{ type: 'paragraph', id: ctx.ids.next(), rev: ctx.rev, items: content.flatMap((node) => wireInline(node, ctx)) }];
  return content.map((node) => wireBlock(node, ctx));
}

/** 来源内容 → 行内条目。markdown 只取第一个段落里的行内内容；多段时报错（应改用块插入）。 */
function sourceItems(source: InlineSource, ctx: OpContext, template?: CharItem): InlineItem[] {
  const content = sourceContent(source, ctx);
  if (source.as === 'markdown') {
    if (typeof content !== 'string') throw new OpError('unsupported_edit', 'markdown 内容要是字符串');
    const nodes = markdownToWire(content, sourceChips(source, ctx));
    if (nodes.length === 0) return [];
    if (nodes.length > 1 || nodes[0]!.type !== 'paragraph') throw new OpError('unsupported_edit', '行内位置只能插入一段文字');
    return (nodes[0]!.content ?? []).flatMap((node) => wireInline(node, ctx));
  }
  if (typeof content === 'string') return textItems(content, ctx.ids, template);
  if (!Array.isArray(content)) throw new OpError('unsupported_edit', '缺少插入的内容');
  return content.flatMap((node) => (node.type === 'paragraph' ? (node.content ?? []).flatMap((child: WireNode) => wireInline(child, ctx)) : wireInline(node, ctx)));
}

/** 来源的内容：行内内容原样；`{kind:'blob'}` 取 blob 里的文字（没有时拒绝）。`{text}` 简写等于行内文字。 */
function sourceContent(source: InlineSource, ctx: OpContext | undefined): string | WireNode[] | undefined {
  if (typeof source.text === 'string' && !source.from) return source.text;
  const from = source.from;
  if (!from) return undefined;
  if (from.kind === 'blob') {
    if (!ctx) return undefined;
    const text = ctx.options.blobText?.(from.id);
    if (text === undefined) throw new OpError('absent', `没有 blob ${from.id} 或它不是文字`);
    return text;
  }
  return from.content;
}

/** markdown 里 chip 的表：op 自己带的 `blocks`（连接器写法）优先，其次是调用方给的。 */
function sourceChips(source: InlineSource, ctx: OpContext): Record<string, WireNode> | undefined {
  return (source.blocks as Record<string, WireNode> | undefined) ?? ctx.options.chips;
}

/** 来源是不是块级内容（多段 markdown、块结构）：否则是行内内容。 */
export function isBlockSource(source: InlineSource): boolean {
  if (source.as === 'blocks') return true;
  const content = source.from?.kind === 'inline' ? source.from.content : typeof source.text === 'string' ? source.text : undefined;
  if (source.as !== 'markdown' || typeof content !== 'string') return false;
  const text = content.trim();
  // 一行、不以块级标记开头的 markdown 当行内内容
  return text.includes('\n') || /^(#{1,6}\s|[-*+]\s|\d+[.)]\s|>|```|~~~|\||<\?claude block)/.test(text);
}

// ---------- 查找 ----------

function requireBlock(blocks: ProseBlock[], id: CharId | undefined): BlockLocation {
  const found = id ? findBlock(blocks, id) : undefined;
  if (!found) throw new OpError('block_gone', `找不到块 ${id ?? ''}`);
  return found;
}

function requireItem(blocks: ProseBlock[], id: CharId) {
  const found = findItem(blocks, id);
  if (!found) throw new OpError('char_gone', `找不到字符 ${id}`);
  return found;
}

/** 块里的文本块：本身是文本块就是它，容器取第一个（atEnd 时最后一个）文本块。 */
function textBlockIn(blocks: ProseBlock[], id: CharId, atEnd = false): TextBlock {
  const found = requireBlock(blocks, id);
  if (isTextBlock(found.block)) return found.block;
  const texts = [...walkBlocks([found.block])].map((location) => location.block).filter(isTextBlock);
  const block = atEnd ? texts.at(-1) : texts[0];
  if (!block) throw new OpError('unsupported_edit', `块 ${id} 里没有可写字的地方`);
  return block;
}

function charTemplate(items: InlineItem[], index: number): CharItem | undefined {
  for (let cursor = index; cursor >= 0; cursor--) {
    const item = items[cursor];
    if (item?.kind === 'char') return item;
  }
  return undefined;
}

function runsOf(target: ProseTarget): [CharId, CharId][] {
  if (target.kind !== 'chars') return [];
  const runs = target.runs ?? (target.range ? [target.range] : []);
  if (!runs.length) throw new OpError('unsupported_edit', '缺少字符区间');
  return runs;
}

/** 字符区间（闭区间）在文档顺序里的位置。 */
function spansOf(blocks: ProseBlock[], runs: [CharId, CharId][]): (readonly [number, number])[] {
  const order = documentOrder(blocks);
  return runs.map(([from, to]) => {
    const start = order.get(from);
    const end = order.get(to);
    if (start === undefined || end === undefined) throw new OpError('char_gone', `找不到字符区间 ${from}..${to}`);
    return [Math.min(start, end), Math.max(start, end)] as const;
  });
}

/** 对区间里的每个行内条目调用 visit；返回碰到的条目数。 */
function forItemsIn(blocks: ProseBlock[], runs: [CharId, CharId][], ctx: OpContext, visit: (item: InlineItem) => boolean): number {
  const spans = spansOf(blocks, runs);
  const order = documentOrder(blocks);
  let count = 0;
  for (const { block } of walkBlocks(blocks)) {
    if (!isTextBlock(block)) continue;
    let touched = false;
    for (const item of block.items) {
      const position = order.get(item.id)!;
      if (!spans.some(([start, end]) => position >= start && position <= end)) continue;
      count++;
      if (visit(item)) touched = true;
    }
    if (touched) ctx.touch(block);
  }
  return count;
}

// ---------- 结构维护 ----------

/**
 * 从文档里摘下一个块。父容器因此变空时：列表项、列表、引用、表格行、表格一并移除；单元格补一个空段落（单元格不能少）。
 */
function detachBlock(blocks: ProseBlock[], id: CharId, ctx: OpContext): ProseBlock {
  const found = requireBlock(blocks, id);
  found.siblings.splice(found.index, 1);
  const parent = found.parent;
  if (parent) {
    if (parent.children.length === 0) {
      if (parent.type === 'cell') {
        parent.children.push(emptyParagraph(ctx));
        ctx.created(parent.children[0]!);
        ctx.touch(parent);
      } else {
        const removedParent = detachBlock(blocks, parent.id, ctx);
        ctx.remove(removedParent);
      }
    } else if (parent.type === 'listItem' && parent.children[0]!.type !== 'paragraph') {
      // 列表项的第一个子块要是段落
      parent.children.unshift(emptyParagraph(ctx));
      ctx.created(parent.children[0]!);
      ctx.touch(parent);
    } else ctx.touch(parent);
  }
  return found.block;
}

function removeBlock(blocks: ProseBlock[], id: CharId, ctx: OpContext): void {
  ctx.remove(detachBlock(blocks, id, ctx));
}

function parentTypeOf(location: BlockLocation | { parent: ContainerBlock | undefined }): BlockType | undefined {
  return location.parent?.type;
}

function checkPlacement(parent: BlockType | undefined, created: ProseBlock[]): void {
  for (const block of created)
    if (!canContain(parent, block.type)) throw new OpError('unsupported_edit', `${parent ?? '顶层'} 里不能放 ${block.type}`);
}

/** 把块放到锚点块的旁边（before / after）或里面（start / end，锚点要是容器）。 */
function placeBlocks(blocks: ProseBlock[], anchorId: CharId | undefined, side: Side, created: ProseBlock[], ctx: OpContext): void {
  if (anchorId === undefined) {
    checkPlacement(undefined, created);
    if (side === 'start' || side === 'before') blocks.unshift(...created);
    else blocks.push(...created);
  } else {
    const anchor = requireBlock(blocks, anchorId);
    if ((side === 'start' || side === 'end') && isContainerBlock(anchor.block)) {
      checkPlacement(anchor.block.type, created);
      const children = anchor.block.children as ProseBlock[];
      if (side === 'start') children.unshift(...created);
      else children.push(...created);
      ctx.touch(anchor.block);
    } else {
      checkPlacement(parentTypeOf(anchor), created);
      anchor.siblings.splice(side === 'before' || side === 'start' ? anchor.index : anchor.index + 1, 0, ...created);
      if (anchor.parent) ctx.touch(anchor.parent);
    }
  }
  for (const block of created) ctx.created(block);
}

/** 把文本块在 cut 处一分为二，返回新的后半块（放在原块后面）。 */
function splitTextBlock(blocks: ProseBlock[], block: TextBlock, cut: number, newId: CharId, ctx: OpContext): TextBlock {
  const location = requireBlock(blocks, block.id);
  const tail = block.items.splice(cut);
  const fresh: TextBlock =
    block.type === 'codeBlock'
      ? { type: 'codeBlock', id: newId, rev: ctx.rev, items: tail, ...(block.language ? { language: block.language } : {}) }
      : { type: 'paragraph', id: newId, rev: ctx.rev, items: tail };
  if (block.type === 'paragraph' && block.heading && tail.length) (fresh as ParagraphBlock).heading = block.heading;
  location.siblings.splice(location.index + 1, 0, fresh);
  ctx.touch(block);
  ctx.created(fresh);
  return fresh;
}

// ---------- 各个 op ----------

function applyInsert(blocks: ProseBlock[], op: InsertOp, ctx: OpContext): OpResult {
  const side: Side = op.side ?? 'after';
  if (!op.source) throw new OpError('unsupported_edit', 'insert 缺少 source');
  if (isBlockSource(op.source)) {
    if (op.target.kind === 'root') placeBlocks(blocks, undefined, side, sourceBlocks(op.source, ctx), ctx);
    else if (op.target.kind === 'blocks') placeBlocks(blocks, op.target.ids[0], side, sourceBlocks(op.source, ctx), ctx);
    else {
      // 在文字中间插入块：先在锚点处拆段，再把块放在两半之间
      const [anchorId] = runsOf(op.target)[0]!;
      const found = requireItem(blocks, anchorId);
      const cut = side === 'before' ? found.index : found.index + 1;
      const created = sourceBlocks(op.source, ctx);
      if (cut < found.block.items.length) splitTextBlock(blocks, found.block, cut, ctx.ids.mint(), ctx);
      placeBlocks(blocks, found.block.id, 'after', created, ctx);
    }
    return ctx.result();
  }

  if (op.target.kind === 'chars') {
    const anchorId = runsOf(op.target)[0]![0];
    const found = requireItem(blocks, anchorId);
    const position = side === 'before' || side === 'start' ? found.index : found.index + 1;
    const items = sourceItems(op.source, ctx, charTemplate(found.block.items, position - 1));
    found.block.items.splice(position, 0, ...items);
    ctx.touch(found.block);
  } else if (op.target.kind === 'blocks') {
    const atStart = side === 'start' || side === 'before';
    const block = textBlockIn(blocks, op.target.ids[0] ?? '', !atStart);
    const items = sourceItems(op.source, ctx, atStart ? undefined : charTemplate(block.items, block.items.length - 1));
    if (atStart) block.items.unshift(...items);
    else block.items.push(...items);
    ctx.touch(block);
  } else {
    // 根：在文档开头 / 末尾新起一段
    const paragraph: ParagraphBlock = { type: 'paragraph', id: ctx.ids.next(), rev: ctx.rev, items: [] };
    paragraph.items = sourceItems(op.source, ctx);
    placeBlocks(blocks, undefined, side, [paragraph], ctx);
  }
  return ctx.result();
}

/** 删除若干字符区间（每段 [首, 尾]，按文档顺序闭区间）。 */
function deleteRuns(blocks: ProseBlock[], runs: [CharId, CharId][], ctx: OpContext): void {
  const spans = spansOf(blocks, runs);
  const order = documentOrder(blocks);
  for (const { block } of walkBlocks(blocks)) {
    if (!isTextBlock(block)) continue;
    const kept = block.items.filter((item) => {
      const position = order.get(item.id)!;
      return !spans.some(([start, end]) => position >= start && position <= end);
    });
    if (kept.length !== block.items.length) {
      block.items = kept;
      ctx.touch(block);
    }
  }
}

function applyDelete(blocks: ProseBlock[], op: DeleteOp, ctx: OpContext): OpResult {
  if (op.target.kind === 'blocks') {
    for (const id of op.target.ids) {
      // 前面的删除可能已经连带移除了它（例如删掉了整个列表）
      if (ctx.removed.has(id)) continue;
      removeBlock(blocks, id, ctx);
    }
  } else if (op.target.kind === 'chars') deleteRuns(blocks, runsOf(op.target), ctx);
  else throw new OpError('unsupported_edit', '不能删除整篇文档');
  return ctx.result({ minted: false });
}

function applyReplace(blocks: ProseBlock[], op: ReplaceOp, ctx: OpContext): OpResult {
  if (!op.with) throw new OpError('unsupported_edit', 'replace 缺少 with');
  if (op.target.kind === 'chars') {
    const runs = runsOf(op.target);
    const found = requireItem(blocks, runs[0]![0]);
    const template = found.item.kind === 'char' ? found.item : undefined;
    const block = found.block;
    const insertAt = found.index;
    if (isBlockSource(op.with)) {
      // 多段内容替换一段文字：删掉原文，在原位置拆段后放入
      const created = sourceBlocks(op.with, ctx);
      deleteRuns(blocks, runs, ctx);
      const cut = Math.min(insertAt, block.items.length);
      if (cut < block.items.length) splitTextBlock(blocks, block, cut, ctx.ids.mint(), ctx);
      placeBlocks(blocks, block.id, 'after', created, ctx);
      if (block.items.length === 0 && cut === 0) removeBlock(blocks, block.id, ctx);
      return ctx.result();
    }
    deleteRuns(blocks, runs, ctx);
    const items = sourceItems(op.with, ctx, template);
    block.items.splice(Math.min(insertAt, block.items.length), 0, ...items);
    ctx.touch(block);
    return ctx.result();
  }
  if (op.target.kind !== 'blocks') throw new OpError('unsupported_edit', '不能替换整篇文档');
  const [firstId, ...restIds] = op.target.ids;
  const anchor = requireBlock(blocks, firstId);
  const created = sourceBlocks(op.with, ctx);
  const parentType = parentTypeOf(anchor);
  if (created.length === 0) {
    // 换成空内容：等于删除
    removeBlock(blocks, anchor.block.id, ctx);
  } else if (created.some((block) => !canContain(parentType, block.type)) && isContainerBlock(anchor.block) && created.every((block) => canContain(anchor.block.type, block.type))) {
    // 替换单元格、列表项、引用这样的容器：换掉它的内容，容器本身保留
    const container = anchor.block;
    for (const child of [...container.children]) ctx.remove(child);
    container.children.splice(0, container.children.length, ...(created as never[]));
    if (container.type === 'listItem' && created[0]?.type !== 'paragraph') container.children.unshift(emptyParagraph(ctx) as never);
    ctx.touch(container);
    for (const block of container.children) ctx.created(block);
  } else {
    checkPlacement(parentType, created);
    anchor.siblings.splice(anchor.index, 1, ...created);
    ctx.remove(anchor.block);
    for (const block of created) ctx.created(block);
    if (anchor.parent) ctx.touch(anchor.parent);
  }
  for (const id of restIds) if (!ctx.removed.has(id)) removeBlock(blocks, id, ctx);
  return ctx.result();
}

/** 在某个字之后（或之前）把文本块一分为二；在列表项里则同时分出新的列表项。 */
function applySplit(blocks: ProseBlock[], op: BlockSplitOp, ctx: OpContext): OpResult {
  let block: TextBlock;
  let cut: number;
  const char = findItem(blocks, op.at);
  if (char) {
    block = char.block;
    cut = op.side === 'before' ? char.index : char.index + 1;
  } else {
    block = textBlockIn(blocks, op.at);
    cut = op.side === 'before' ? 0 : block.items.length;
  }
  const newBlockId = op.resurrect ?? op.id;
  if (newBlockId) ctx.ids.claim(newBlockId);
  const location = requireBlock(blocks, block.id);
  const listItem = location.parent?.type === 'listItem' ? location.parent : undefined;
  const fresh = splitTextBlock(blocks, block, cut, newBlockId ?? ctx.ids.next(), ctx);
  if (listItem && op.item !== undefined) {
    ctx.ids.claim(op.item);
    const itemLocation = requireBlock(blocks, listItem.id);
    const freshIndex = listItem.children.indexOf(fresh);
    const following = listItem.children.splice(freshIndex);
    const parentList = itemLocation.parent as ListBlock | undefined;
    const item: ListItemBlock = { type: 'listItem', id: op.item, rev: ctx.rev, children: following };
    if (parentList?.kind === 'check') item.checked = false;
    itemLocation.siblings.splice(itemLocation.index + 1, 0, item);
    ctx.touch(listItem);
    ctx.created(item);
  }
  return ctx.result();
}

/** 把后一个块的文字接到前一个块末尾，并删掉后一个块（变空的列表项、列表、引用一并移除）。 */
function applyJoin(blocks: ProseBlock[], op: BlockJoinOp, ctx: OpContext): OpResult {
  const [firstId, secondId] = op.block ?? [];
  if (!firstId || !secondId) throw new OpError('unsupported_edit', 'block_join 要两个块');
  const first = textBlockIn(blocks, firstId, true);
  const second = textBlockIn(blocks, secondId);
  if (first === second) throw new OpError('unsupported_edit', '不能把块并进它自己');
  first.items.push(...second.items);
  ctx.touch(first);
  const secondLocation = requireBlock(blocks, second.id);
  // 被并入的是列表项的第一段时，它后面的子块（嵌套列表）挪到前一块所在的位置之后
  const holder = secondLocation.parent;
  const rest = holder?.type === 'listItem' && secondLocation.index === 0 ? holder.children.slice(1) : [];
  if (rest.length) {
    holder!.children.splice(1);
    const firstLocation = requireBlock(blocks, first.id);
    const target = firstLocation.parent?.type === 'listItem' ? firstLocation.parent : undefined;
    if (target) {
      target.children.push(...rest);
      ctx.touch(target);
    } else firstLocation.siblings.splice(firstLocation.index + 1, 0, ...rest);
  }
  removeBlock(blocks, second.id, ctx);
  return ctx.result({ minted: false });
}

function applyMark(blocks: ProseBlock[], op: MarkOp, ctx: OpContext): OpResult {
  if (!Array.isArray(op.range)) throw new OpError('unsupported_edit', 'mark 缺少 range');
  ctx.ids.claim(op.id);
  const isLink = op.style === 'link' || op.style === 'a';
  const mark = isLink ? undefined : markOf(op.style, op.attrs);
  if (!isLink && !mark) throw new OpError('unsupported_edit', `不支持的格式 ${op.style}`);
  const href = op.attrs?.['href'];
  forItemsIn(blocks, [op.range], ctx, (item) => {
    if (item.kind !== 'char') return false;
    if (isLink) {
      if (op.on && typeof href === 'string' && href) item.href = href.slice(0, 4096);
      else delete item.href;
      return true;
    }
    // 高亮只能有一种颜色：先去掉已有的高亮
    item.marks = item.marks.filter((existing) => existing !== mark && !(isHighlight(mark!) && isHighlight(existing)));
    if (op.on) item.marks.push(mark!);
    return true;
  });
  return ctx.result({ minted: false });
}

function applyWrap(blocks: ProseBlock[], op: WrapOp, ctx: OpContext): OpResult {
  const firstId = op.block ?? op.from;
  if (!firstId) throw new OpError('unsupported_edit', 'wrap 缺少 block');
  const first = requireBlock(blocks, firstId);
  const lastIndex = op.to && op.to !== firstId ? first.siblings.findIndex((block) => block.id === op.to) : first.index;
  if (lastIndex < first.index) throw new OpError('unsupported_edit', 'wrap 的 from / to 不是同一层里的先后两块');
  const wrapped = first.siblings.slice(first.index, lastIndex + 1);
  const ids = new IdSource(op.ids, () => ctx.ids.mint());
  const parentType = parentTypeOf(first);

  let container: ProseBlock;
  if (op.in?.type === 'list' || op.in?.type === 'bulletList' || op.in?.type === 'orderedList' || op.in?.type === 'taskList') {
    const kind: ListKind =
      op.in.type === 'orderedList' ? 'ordered' : op.in.type === 'taskList' ? 'check' : (listKind(op.in.kind) ?? 'bullet');
    const listId = ids.next();
    const items = wrapped.every((block) => block.type === 'listItem')
      ? (wrapped as ListItemBlock[])
      : wrapped.map((block): ListItemBlock => {
          if (!canContain('listItem', block.type)) throw new OpError('unsupported_edit', `${block.type} 不能放进列表`);
          const item: ListItemBlock = { type: 'listItem', id: ids.next(), rev: ctx.rev, ...(kind === 'check' ? { checked: false } : {}), children: [block] };
          if (block.type !== 'paragraph') item.children.unshift(emptyParagraph(ctx));
          return item;
        });
    container = { type: 'list', id: listId, kind, rev: ctx.rev, children: items };
  } else if (op.in?.type === 'blockquote') {
    container = { type: 'blockquote', id: ids.next(), rev: ctx.rev, children: wrapped };
  } else throw new OpError('unsupported_edit', `不支持包进 ${op.in?.type}`);
  if (!canContain(parentType, container.type)) throw new OpError('unsupported_edit', `${parentType ?? '顶层'} 里不能放 ${container.type}`);
  for (const id of ids.used) ctx.ids.claim(id);

  first.siblings.splice(first.index, wrapped.length, container);
  ctx.created(container);
  if (first.parent) ctx.touch(first.parent);
  return ctx.result();
}

function applyUnwrap(blocks: ProseBlock[], op: UnwrapOp, ctx: OpContext): OpResult {
  const found = requireBlock(blocks, op.block);
  const { block, siblings, index, parent } = found;
  ctx.ids.claim(op.id);
  if (block.type === 'listItem' && parent?.type === 'list') {
    // 列表项提出列表：前面的项留在原列表，这一项的子块放到列表后面，后面的项另成一个列表
    const listLocation = requireBlock(blocks, parent.id);
    checkPlacement(parentTypeOf(listLocation), block.children);
    const following = parent.children.splice(index);
    following.shift();
    const lifted: ProseBlock[] = [...block.children];
    if (following.length) {
      const rest: ListBlock = { type: 'list', id: op.id ?? ctx.ids.next(), kind: parent.kind, rev: ctx.rev, children: following };
      lifted.push(rest);
    }
    listLocation.siblings.splice(listLocation.index + 1, 0, ...lifted);
    ctx.remove(block);
    for (const child of lifted) ctx.created(child);
    if (parent.children.length === 0) removeBlock(blocks, parent.id, ctx);
    else ctx.touch(parent);
    return ctx.result();
  }
  if (block.type === 'list' || block.type === 'blockquote') {
    const lifted = block.type === 'list' ? block.children.flatMap((item) => item.children) : block.children;
    checkPlacement(parent?.type, lifted);
    siblings.splice(index, 1, ...lifted);
    ctx.removed.add(block.id);
    for (const child of lifted) ctx.touch(child);
    if (parent) ctx.touch(parent);
    return ctx.result();
  }
  throw new OpError('unsupported_edit', `块 ${op.block} 不是列表或引用，不能 unwrap`);
}

function applyBlockMove(blocks: ProseBlock[], op: BlockMoveOp, ctx: OpContext): OpResult {
  const moving = requireBlock(blocks, op.block);
  const anchorId = op.before ?? (op.after !== 'head' ? op.after : undefined);
  if (anchorId === op.block || op.parent === op.block) throw new OpError('unsupported_edit', '不能把块挪到它自己旁边');
  // 不能挪进自己的子孙里
  const inside = new Set([...walkBlocks([moving.block])].map((location) => location.block.id));
  if ((anchorId && inside.has(anchorId)) || (op.parent && inside.has(op.parent))) throw new OpError('unsupported_edit', '不能把块挪进它自己里面');
  if (anchorId) requireBlock(blocks, anchorId);
  if (op.parent) requireBlock(blocks, op.parent);
  if (!anchorId && !op.parent) throw new OpError('unsupported_edit', 'block_move 缺少目标位置');
  const block = detachBlock(blocks, op.block, ctx);
  if (op.id && op.id !== block.id) {
    ctx.ids.claim(op.id);
    ctx.removed.add(block.id);
    block.id = op.id;
  }
  if (anchorId) {
    const anchor = requireBlock(blocks, anchorId);
    checkPlacement(parentTypeOf(anchor), [block]);
    anchor.siblings.splice(op.before ? anchor.index : anchor.index + 1, 0, block);
    if (anchor.parent) ctx.touch(anchor.parent);
  } else {
    const parent = requireBlock(blocks, op.parent!);
    if (!isContainerBlock(parent.block)) throw new OpError('unsupported_edit', `块 ${op.parent} 不是容器`);
    checkPlacement(parent.block.type, [block]);
    const children = parent.block.children as ProseBlock[];
    if (op.after === 'head') children.unshift(block);
    else children.push(block);
    ctx.touch(parent.block);
  }
  ctx.touch(block);
  return ctx.result({ minted: !!op.id });
}

/** 改行内原子的属性：日期、提及、下拉选项、图片。attrs.type 给了时只改这种原子。 */
function setInlineAttrs(blocks: ProseBlock[], runs: [CharId, CharId][], attrs: Record<string, unknown>, ctx: OpContext): OpResult {
  const only = typeof attrs['type'] === 'string' ? (attrs['type'] === 'image' ? 'media' : attrs['type']) : undefined;
  let applied = 0;
  forItemsIn(blocks, runs, ctx, (item) => {
    if (item.kind === 'char' || item.kind === 'break' || (only && item.kind !== only)) return false;
    switch (item.kind) {
      case 'date': {
        const value = attrs['value'] ?? attrs['ts'];
        if (value !== undefined) item.value = typeof value === 'string' ? value.slice(0, 64) : '';
        break;
      }
      case 'mention': {
        const user = attrs['principal'] ?? attrs['user'];
        if (typeof user === 'string' && user) item.user = user;
        for (const key of ['ref', 'label', 'name', 'email'] as const) {
          if (!(key in attrs)) continue;
          const value = attrs[key];
          if (typeof value === 'string' && value) item[key] = value;
          else delete item[key];
        }
        break;
      }
      case 'dropdown': {
        if (typeof attrs['enum'] === 'string' && attrs['enum']) item.enum = attrs['enum'];
        if ('index' in attrs) {
          const index = attrs['index'];
          if (Number.isInteger(index) && (index as number) >= 0) item.index = index as number;
          else delete item.index;
        }
        break;
      }
      case 'media':
        setMediaAttrs(item, attrs, ctx);
        break;
    }
    applied++;
    return true;
  });
  if (!applied) throw new OpError('unsupported_edit', `区间里没有可以改属性的元素 ${JSON.stringify(attrs).slice(0, 200)}`);
  return ctx.result({ minted: false });
}

function setMediaAttrs(item: MediaItem, attrs: Record<string, unknown>, ctx: OpContext): void {
  const set = <K extends keyof MediaItem>(key: K, value: MediaItem[K] | undefined, given: unknown) => {
    if (given === null || given === undefined || given === '') delete item[key];
    else if (value !== undefined) item[key] = value;
  };
  if ('alt' in attrs) set('alt', typeof attrs['alt'] === 'string' ? attrs['alt'].slice(0, 1024) : undefined, attrs['alt']);
  if ('name' in attrs) set('name', typeof attrs['name'] === 'string' ? attrs['name'].slice(0, 512) : undefined, attrs['name']);
  if ('align' in attrs) set('align', alignOf(attrs['align']), attrs['align'] === 'left' ? null : attrs['align']);
  if ('width' in attrs) set('width', positiveInt(attrs['width'], 4096), attrs['width']);
  if ('dims' in attrs) set('dims', dimsOf(attrs['dims']), attrs['dims']);
  if ('crop' in attrs) set('crop', cropOf(attrs['crop']), attrs['crop']);
  if ('blob' in attrs) {
    const media = mediaAttrsOf({ blob: attrs['blob'] });
    if (!media.blob) throw new OpError('unsupported_edit', 'blob 要是 blob/<id>');
    if (ctx.options.blobExists && !ctx.options.blobExists(media.blob)) throw new OpError('blob_unknown', `${media.blob} 不是这份文档里的素材`);
    item.blob = media.blob;
  }
}

function setBlockAttrs(block: ProseBlock, attrs: Record<string, unknown>, blocks: ProseBlock[], ctx: OpContext): void {
  const retype = attrs['type'];
  if ((retype === 'codeBlock' || retype === 'code_block') && block.type === 'paragraph') {
    // 段落改成代码块：只留文字（换行保留），格式与链接去掉
    const location = requireBlock(blocks, block.id);
    if (location.parent?.type === 'cell') throw new OpError('unsupported_edit', '单元格里不能放代码块');
    const code: TextBlock = {
      type: 'codeBlock',
      id: block.id,
      rev: ctx.rev,
      items: block.items.flatMap((item): InlineItem[] => (item.kind === 'char' ? [{ kind: 'char', id: item.id, char: item.char, marks: [] }] : item.kind === 'break' ? [item] : [])),
    };
    const language = attrs['language'];
    if (typeof language === 'string' && language) code.language = language.slice(0, 64);
    location.siblings[location.index] = code;
    ctx.touch(code);
    return;
  }
  if ((retype === 'paragraph' || retype === 'heading') && block.type === 'codeBlock') {
    const location = requireBlock(blocks, block.id);
    const paragraph: ParagraphBlock = { type: 'paragraph', id: block.id, rev: ctx.rev, items: block.items };
    const heading = headingLevel(attrs['heading'] ?? attrs['level']);
    if (heading) paragraph.heading = heading;
    location.siblings[location.index] = paragraph;
    ctx.touch(paragraph);
    return;
  }
  switch (block.type) {
    case 'paragraph': {
      // 编辑器发 heading（null 表示改回正文），旧写法是 level
      const key = 'heading' in attrs ? 'heading' : 'level' in attrs ? 'level' : undefined;
      if (key) {
        const level = attrs[key] === null ? undefined : headingLevel(attrs[key]);
        if (level) block.heading = level;
        else delete block.heading;
      }
      break;
    }
    case 'codeBlock':
      if ('language' in attrs) {
        const language = attrs['language'];
        if (typeof language === 'string' && language) block.language = language.slice(0, 64);
        else delete block.language;
      }
      break;
    case 'list': {
      const kind = listKind(attrs['kind']);
      if (kind && kind !== block.kind) {
        block.kind = kind;
        for (const item of block.children) {
          if (kind === 'check') item.checked ??= false;
          else delete item.checked;
          ctx.touch(item);
        }
        if (kind !== 'ordered') {
          delete block.start;
          delete block.numbering;
        }
      }
      if ('start' in attrs) {
        const start = positiveInt(attrs['start'], 1_000_000);
        if (start && start !== 1 && block.kind === 'ordered') block.start = start;
        else delete block.start;
      }
      if ('numbering' in attrs) {
        const numbering = numberingOf(attrs['numbering']);
        if (numbering && block.kind === 'ordered') block.numbering = numbering;
        else delete block.numbering;
      }
      break;
    }
    case 'listItem':
      if ('checked' in attrs) block.checked = attrs['checked'] === true || attrs['checked'] === 'true';
      break;
    case 'cell': {
      if ('header' in attrs) {
        if (attrs['header'] === true || attrs['header'] === 'true') block.header = true;
        else delete block.header;
      }
      for (const key of ['colspan', 'rowspan'] as const) {
        if (!(key in attrs)) continue;
        const value = positiveInt(attrs[key], key === 'colspan' ? 1000 : 65535);
        if (value && value !== 1) block[key] = value;
        else delete block[key];
      }
      if ('colwidth' in attrs) {
        const widths = colwidthOf(attrs['colwidth']);
        if (widths) block.colwidth = widths;
        else delete block.colwidth;
      }
      if ('align' in attrs) {
        const align = alignOf(attrs['align']);
        if (align) block.align = align;
        else delete block.align;
      }
      if ('background' in attrs) {
        const background = backgroundOf(attrs['background']);
        if (background) block.background = background;
        else delete block.background;
      }
      break;
    }
    case 'pending':
      if ('intent' in attrs) block.intent = String(attrs['intent'] ?? '').slice(0, 2000);
      break;
    case 'embed': {
      // 已有的嵌入只能改显示：宽度、对齐、说明
      const next: Record<string, unknown> = { ...block.attrs };
      for (const key of ['width', 'align', 'caption']) {
        if (!(key in attrs)) continue;
        if (attrs[key] === null || attrs[key] === '') delete next[key];
        else next[key] = attrs[key];
      }
      block.attrs = embedAttrsOf(next);
      break;
    }
    default:
      break;
  }
  ctx.touch(block);
}

function applySet(blocks: ProseBlock[], op: SetOp, ctx: OpContext): OpResult {
  const attrs = op.attrs;
  if (!attrs || typeof attrs !== 'object') throw new OpError('unsupported_edit', 'set 缺少 attrs');
  if (op.target?.kind === 'chars') return setInlineAttrs(blocks, runsOf(op.target), attrs, ctx);
  if (op.target?.kind !== 'blocks') throw new OpError('unsupported_edit', 'set 需要块或字符目标');
  for (const id of op.target.ids) setBlockAttrs(requireBlock(blocks, id).block, attrs, blocks, ctx);
  return ctx.result({ minted: false });
}

// ---------- 最终写法 → 行写法 ----------

/** 顶层没有块 id：挪到文档开头 / 末尾时 parent 用这个记号（不是合法的字符 id，不会和块撞）。 */
const ROOT: CharId = '<root>';

const ROOT_MOVE: Record<Side, Partial<BlockMoveOp>> = {
  start: { parent: ROOT, after: 'head' },
  before: { parent: ROOT, after: 'head' },
  end: { parent: ROOT },
  after: { parent: ROOT },
};

function targetIds(target: unknown): CharId[] {
  const value = target as ProseTarget | undefined;
  if (value?.kind === 'blocks' && Array.isArray(value.ids)) return value.ids;
  if (value?.kind === 'chars') {
    const run = value.range ?? value.runs?.[0];
    return run ? [run[0]] : [];
  }
  return [];
}

function idList(value: unknown): CharId[] {
  return Array.isArray(value) ? value.filter(isCharId) : [];
}

/** 把 door 最终写法的一条 op 换成一条或几条行写法的 op；本来就是行写法的原样返回。 */
export function normalizeOp(raw: ProseOp): ProseOp[] {
  const op = raw as Record<string, unknown> & { op: string };
  switch (op.op) {
    case 'split': {
      const ids = idList(op['ids']);
      const at = targetIds(op['target'])[0];
      if (!at) throw new OpError('unsupported_edit', 'split 缺少位置');
      const split: BlockSplitOp = { op: 'block_split', at, side: op['side'] === 'before' ? 'before' : 'after' };
      if (ids.length >= 2) {
        split.item = ids[0];
        split.id = ids[1];
      } else if (ids[0]) split.id = ids[0];
      return [split];
    }
    case 'join': {
      const ids = targetIds(op['target']);
      return [{ op: 'block_join', block: [ids[0]!, ids[1]!], ...(op['dir'] ? { dir: op['dir'] as 'forward' } : {}) }];
    }
    case 'move': {
      const moving = targetIds(op['target']);
      const to = (op['to'] ?? {}) as { target?: ProseTarget; side?: Side };
      const anchor = to.target?.kind === 'root' ? undefined : targetIds(to.target)[0];
      const ids = idList(op['ids']);
      const side = to.side ?? 'after';
      if (!moving.length) throw new OpError('unsupported_edit', 'move 缺少要挪的块');
      const ops: BlockMoveOp[] = [];
      moving.forEach((block, index) => {
        const id = ids[index];
        const base: BlockMoveOp = { op: 'block_move', block, ...(id ? { id } : {}) };
        if (index > 0) ops.push({ ...base, after: ids[index - 1] ?? moving[index - 1]! });
        else if (anchor === undefined) ops.push({ ...base, ...ROOT_MOVE[side] });
        else if (side === 'before') ops.push({ ...base, before: anchor });
        else if (side === 'start') ops.push({ ...base, parent: anchor, after: 'head' });
        else if (side === 'end') ops.push({ ...base, parent: anchor });
        else ops.push({ ...base, after: anchor });
      });
      return ops;
    }
    case 'wrap': {
      if (op['block'] || op['from']) return [raw];
      const ids = targetIds(op['target']);
      const thru = typeof op['thru'] === 'string' ? op['thru'] : ids.length > 1 ? ids.at(-1) : undefined;
      return [{ op: 'wrap', from: ids[0], ...(thru ? { to: thru } : {}), in: op['in'] as WrapOp['in'], ids: idList(op['ids']) }];
    }
    case 'unwrap': {
      if (typeof op['block'] === 'string') return [raw];
      const id = idList(op['ids'])[0];
      return targetIds(op['target']).map((block) => ({ op: 'unwrap', block, ...(id ? { id } : {}) }) as UnwrapOp);
    }
    case 'format': {
      const target = op['target'] as ProseTarget;
      const runs = target?.kind === 'chars' ? (target.runs ?? (target.range ? [target.range] : [])) : [];
      if (!runs.length) throw new OpError('unsupported_edit', 'format 需要字符区间');
      const marks = (on: boolean, list: unknown) =>
        (Array.isArray(list) ? list : []).flatMap((mark: { type?: string; attrs?: Record<string, unknown>; color?: unknown }) =>
          runs.map((range): MarkOp => ({ op: 'mark', style: mark.type ?? '', on, range, attrs: { ...(mark.attrs ?? {}), ...(mark.color ? { color: mark.color } : {}) } })),
        );
      return [...marks(false, op['remove']), ...marks(true, op['add'])];
    }
    case 'attr': {
      const set = (op['set'] ?? {}) as Record<string, unknown>;
      if (typeof op['at'] === 'string') return [{ op: 'set', target: { kind: 'chars', range: [op['at'], op['at']] }, attrs: set }];
      return [{ op: 'set', target: { kind: 'blocks', ids: [op['block'] as CharId] }, attrs: set }];
    }
    case 'block_del':
      return [{ op: 'delete', target: { kind: 'blocks', ids: Array.isArray(op['block']) ? (op['block'] as CharId[]) : [op['block'] as CharId] } }];
    default:
      return [raw];
  }
}

function applyRootMove(blocks: ProseBlock[], op: BlockMoveOp, ctx: OpContext): OpResult {
  const block = detachBlock(blocks, op.block, ctx);
  if (op.id && op.id !== block.id) {
    ctx.ids.claim(op.id);
    ctx.removed.add(block.id);
    block.id = op.id;
  }
  checkPlacement(undefined, [block]);
  if (op.after === 'head') blocks.unshift(block);
  else blocks.push(block);
  ctx.touch(block);
  return ctx.result({ minted: !!op.id });
}

// ---------- 入口 ----------

function applyOne(blocks: ProseBlock[], op: ProseOp, ctx: OpContext): OpResult {
  switch (op.op) {
    case 'insert':
      return applyInsert(blocks, op as InsertOp, ctx);
    case 'delete':
      return applyDelete(blocks, op as DeleteOp, ctx);
    case 'replace':
      return applyReplace(blocks, op as ReplaceOp, ctx);
    case 'block_split':
      return applySplit(blocks, op as BlockSplitOp, ctx);
    case 'block_join':
      return applyJoin(blocks, op as BlockJoinOp, ctx);
    case 'mark':
      return applyMark(blocks, op as MarkOp, ctx);
    case 'set':
      return applySet(blocks, op as SetOp, ctx);
    case 'wrap':
      return applyWrap(blocks, op as WrapOp, ctx);
    case 'unwrap':
      return applyUnwrap(blocks, op as UnwrapOp, ctx);
    case 'block_move':
      return (op as BlockMoveOp).parent === ROOT ? applyRootMove(blocks, op as BlockMoveOp, ctx) : applyBlockMove(blocks, op as BlockMoveOp, ctx);
    case 'restore':
    case 'revive':
      throw new OpError('unsupported_edit', `本地服务不支持 ${op.op}（按修订恢复）`);
    default:
      throw new OpError('unsupported_edit', `不支持的操作 ${op.op}`);
  }
}

/** 合并多条行写法 op 的结果（一条最终写法拆成了几条时）。 */
function mergeResults(results: OpResult[]): OpResult {
  if (results.length === 1) return results[0]!;
  const touched = new Set<CharId>();
  const removed = new Set<CharId>();
  const minted: CharId[] = [];
  for (const result of results) {
    for (const id of result.removed) {
      touched.delete(id);
      removed.add(id);
    }
    for (const id of result.touched) {
      removed.delete(id);
      touched.add(id);
    }
    minted.push(...(result.minted ?? []));
  }
  return { changed: true, ...(minted.length ? { minted } : {}), touched: [...touched], removed: [...removed] };
}

/** 检查结果的结构：id 不重复、顶层不为空。 */
function checkDocument(blocks: ProseBlock[]): void {
  if (blocks.length === 0) throw new OpError('last_block', '文档至少要留一个块');
  const seen = new Set<CharId>();
  for (const { block } of walkBlocks(blocks)) {
    if (seen.has(block.id)) throw new OpError('unsupported_edit', `id ${block.id} 重复`);
    seen.add(block.id);
    if (isTextBlock(block))
      for (const item of block.items) {
        if (seen.has(item.id)) throw new OpError('unsupported_edit', `id ${item.id} 重复`);
        seen.add(item.id);
      }
  }
}

export function applyProseOps(current: ProseBlock[], ops: readonly ProseOp[], options: ApplyOptions): ApplyOutcome {
  const blocks = structuredClone(current);
  const results: OpResult[] = [];
  const usedIds: CharId[] = [];
  let mintClock = options.mintFrom;
  const mint = () => formatCharId(options.mintSession, mintClock++);
  let index = 0;
  try {
    if (!Array.isArray(ops)) throw new OpError('unsupported_edit', 'ops 要是数组');
    for (; index < ops.length; index++) {
      const op = ops[index];
      if (!op || typeof op !== 'object' || typeof op.op !== 'string') throw new OpError('unsupported_edit', `第 ${index} 条 op 格式不对`);
      const parts = normalizeOp(op).map((part) => {
        const ids = new IdSource('ids' in part ? (part as InsertOp).ids : undefined, mint);
        const ctx = new OpContext(ids, options.rev, options);
        const result = applyOne(blocks, part, ctx);
        usedIds.push(...ids.used.filter((id) => parseCharId(id)));
        return result;
      });
      results.push(mergeResults(parts));
    }
    checkDocument(blocks);
  } catch (error) {
    if (error instanceof OpError)
      return { ok: false, reason: error.reason, detail: error.message, ...(index < ops.length ? { index } : {}), ...(error.data ? { data: error.data } : {}) };
    throw error;
  }
  return { ok: true, blocks, results, usedIds };
}

/** 一条 op 用到的块与字符区间（连接器判断评论锚点是否受影响时用）。 */
export function deletedRuns(op: ProseOp): [CharId, CharId][] {
  const value = op as { op: string; target?: ProseTarget };
  if ((value.op === 'delete' || value.op === 'replace') && value.target?.kind === 'chars') return runsOf(value.target);
  return [];
}

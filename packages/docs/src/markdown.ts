// i18n-ignore-file: 拒绝与错误的说明给智能体与运行日志看（编辑器按 code 显示自己的文字）
/**
 * markdown ⇄ 正文。
 *
 * - `markdownToWire`：智能体写的 markdown（GFM）→ 结构化节点（WireNode），再由正文编辑转成块。
 *   `<?claude block k?>` 是 chip：换成 `chips[k]`（日期、提及、下拉、待写块、空段落……）。
 *   图片只认 `![替代文字](blob/<id>)`（先上传）；`<br>` 是换行，`<u>` `<mark>` 是下划线与高亮，其余 HTML 原样当文字。
 * - `blocksToMarkdown`：块 → markdown（导出用）。下拉写选中的选项名，提及写 `@名字`，待写块与嵌入写成 HTML 注释。
 */
import type {
  Blockquote,
  Code,
  Definition,
  Heading,
  Html,
  Image,
  List,
  ListItem,
  Nodes,
  Paragraph,
  PhrasingContent,
  Root,
  RootContent,
  Table,
  TableCell,
  TableRow,
} from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm';
import { toMarkdown } from 'mdast-util-to-markdown';
import { gfm } from 'micromark-extension-gfm';
import { OpError } from './op-error.ts';
import type { WireNode } from './prose-ops.ts';
import type { CellBlock, InlineItem, ListBlock, ProseBlock, TableBlock } from './prose-document.ts';

// ---------- chip ----------

/** `<?claude block k?>`：k 是 chip 表里的键。 */
const CHIP_PATTERN = /<\?claude\s+block\s+([A-Za-z0-9_.-]{1,64})\s*\?>/g;
/** 解析前把 chip 换成私用区字符包住的序号，免得被当成 HTML 块吞掉同一行的文字。 */
const PLACEHOLDER_PATTERN = /(\d+)/g;

/** 能单独成块的 chip 类型；其余（日期、提及、下拉、图片、换行）是行内的。 */
const BLOCK_CHIP_TYPES = new Set([
  'paragraph',
  'heading',
  'pending',
  'embed',
  'table',
  'tableRow',
  'row',
  'list',
  'bulletList',
  'orderedList',
  'taskList',
  'blockquote',
  'codeBlock',
  'horizontalRule',
  'rule',
]);

/**
 * chip 的两种写法都收：连接器指南里的扁平写法 `{type:'date', value:'2026-10-14'}`，
 * 或结构化写法 `{type:'date', attrs:{value}}`。扁平写法里 `type` `content` `text` `marks` 以外的键都当属性。
 */
export function normalizeChip(raw: unknown, key: string): WireNode {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new OpError('unsupported_edit', `chip ${key} 要是对象`);
  const record = raw as Record<string, unknown>;
  const type = record['type'];
  if (typeof type !== 'string' || !type) throw new OpError('unsupported_edit', `chip ${key} 缺少 type`);
  if (record['attrs'] && typeof record['attrs'] === 'object') return record as unknown as WireNode;
  const node: WireNode = { type };
  const attrs: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(record)) {
    if (name === 'type') continue;
    if (name === 'content' && Array.isArray(value)) node.content = value as WireNode[];
    else if (name === 'text' && typeof value === 'string') node.text = value;
    else if (name === 'marks' && Array.isArray(value)) node.marks = value as WireNode['marks'];
    else attrs[name] = value;
  }
  if (Object.keys(attrs).length) node.attrs = attrs;
  return node;
}

function isBlockChip(node: WireNode): boolean {
  return BLOCK_CHIP_TYPES.has(node.type);
}

// ---------- markdown → WireNode ----------

interface Marks {
  bold?: boolean;
  italic?: boolean;
  strike?: boolean;
  underline?: boolean;
  code?: boolean;
  highlight?: boolean;
  href?: string;
}

class MarkdownReader {
  private readonly keys: string[] = [];
  private readonly definitions = new Map<string, Definition>();

  private readonly chips: Record<string, WireNode> | undefined;

  constructor(chips: Record<string, WireNode> | undefined) {
    this.chips = chips;
  }

  read(text: string): WireNode[] {
    const source = text.replace(/\r\n?/g, '\n').replace(CHIP_PATTERN, (_, key: string) => {
      this.keys.push(key);
      return `${this.keys.length - 1}`;
    });
    const tree = fromMarkdown(source, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
    this.collectDefinitions(tree);
    return this.blocks(tree.children);
  }

  private collectDefinitions(node: Nodes): void {
    if (node.type === 'definition') this.definitions.set(node.identifier, node);
    if ('children' in node) for (const child of node.children) this.collectDefinitions(child as Nodes);
  }

  /** 把占位符还原成原文（代码里的 chip 不展开）。 */
  private restore(value: string): string {
    return value.replace(PLACEHOLDER_PATTERN, (_, index: string) => `<?claude block ${this.keys[Number(index)]}?>`);
  }

  private chip(index: number): WireNode {
    const key = this.keys[index]!;
    const raw = this.chips?.[key];
    if (raw === undefined) throw new OpError('unsupported_edit', `<?claude block ${key}?> 在 blocks 里没有对应的 chip`);
    return structuredClone(normalizeChip(raw, key));
  }

  private blocks(nodes: readonly RootContent[]): WireNode[] {
    return nodes.flatMap((node) => this.block(node));
  }

  private block(node: RootContent): WireNode[] {
    switch (node.type) {
      case 'heading':
        return [{ type: 'heading', attrs: { level: Math.min(6, (node as Heading).depth) }, content: settle(this.inlines(node.children)) }];
      case 'paragraph':
        return this.paragraph(node);
      case 'list':
        return [this.list(node)];
      case 'blockquote': {
        const children = this.blocks((node as Blockquote).children);
        return [{ type: 'blockquote', content: children }];
      }
      case 'code':
        return [this.code(node)];
      case 'thematicBreak':
        return [{ type: 'horizontalRule' }];
      case 'table':
        return [this.table(node)];
      case 'html':
        return this.paragraph({ type: 'paragraph', children: [{ type: 'html', value: (node as Html).value }] });
      case 'definition':
        return [];
      case 'footnoteDefinition': {
        const [first, ...rest] = this.blocks(node.children);
        const label: WireNode = { type: 'text', text: `[^${node.label ?? node.identifier}]: ` };
        if (first?.type === 'paragraph') return [{ ...first, content: [label, ...(first.content ?? [])] }, ...rest];
        return [{ type: 'paragraph', content: [label] }, ...(first ? [first] : []), ...rest];
      }
      default:
        // yaml、math 之类没打开的扩展：当文字
        return 'value' in node && typeof node.value === 'string' ? [{ type: 'paragraph', content: textNodes(this.restore(node.value), {}) }] : [];
    }
  }

  /** 段落：块级 chip 要独占一行，那一行就是那个块；其余的行照常是段落。 */
  private paragraph(node: Paragraph): WireNode[] {
    const content = this.inlines(node.children);
    if (!content.some(isBlockChip)) return [{ type: 'paragraph', content: settle(content) }];
    const lines: { separator?: WireNode; items: WireNode[] }[] = [{ items: [] }];
    for (const child of content) {
      if (child.type === SOFT_BREAK || child.type === 'hardBreak') lines.push({ separator: child, items: [] });
      else lines.at(-1)!.items.push(child);
    }
    const out: WireNode[] = [];
    let run: WireNode[] = [];
    const flush = () => {
      if (run.length) out.push({ type: 'paragraph', content: settle(run) });
      run = [];
    };
    for (const line of lines) {
      const solid = line.items.filter((child) => !(child.type === 'text' && !child.text?.trim()));
      const chip = solid.find(isBlockChip);
      if (!chip) {
        if (!solid.length) continue;
        if (run.length && line.separator) run.push(line.separator);
        run.push(...line.items);
        continue;
      }
      if (solid.length > 1) throw new OpError('unsupported_edit', `块级 chip（${chip.type}）要单独占一行，不能和文字或别的 chip 写在同一行`);
      flush();
      out.push(chip);
    }
    flush();
    return out;
  }

  private list(node: List): WireNode {
    const check = node.children.some((item) => typeof item.checked === 'boolean');
    const kind = check ? 'check' : node.ordered ? 'ordered' : 'bullet';
    const attrs: Record<string, unknown> = { kind };
    if (kind === 'ordered' && typeof node.start === 'number' && node.start !== 1) attrs['start'] = node.start;
    return { type: 'list', attrs, content: node.children.map((item) => this.listItem(item, check)) };
  }

  private listItem(item: ListItem, check: boolean): WireNode {
    const content = this.blocks(item.children);
    const node: WireNode = { type: 'listItem', content };
    if (check) node.attrs = { checked: item.checked === true };
    return node;
  }

  private code(node: Code): WireNode {
    const wire: WireNode = { type: 'codeBlock', content: node.value ? [{ type: 'text', text: this.restore(node.value) }] : [] };
    if (node.lang) wire.attrs = { language: node.lang };
    return wire;
  }

  private table(node: Table): WireNode {
    const align = node.align ?? [];
    return {
      type: 'table',
      content: node.children.map((row: TableRow, rowIndex) => ({
        type: 'tableRow',
        content: row.children.map((cell: TableCell, column) => {
          const attrs: Record<string, unknown> = {};
          const value = align[column];
          if (value === 'center' || value === 'right') attrs['align'] = value;
          return {
            type: rowIndex === 0 ? 'tableHeader' : 'tableCell',
            ...(Object.keys(attrs).length ? { attrs } : {}),
            content: [{ type: 'paragraph', content: settle(this.inlines(cell.children)) }],
          };
        }),
      })),
    };
  }

  private inlines(nodes: readonly PhrasingContent[]): WireNode[] {
    const out: WireNode[] = [];
    this.phrasing(nodes, {}, out);
    return out;
  }

  private phrasing(nodes: readonly PhrasingContent[], marks: Marks, out: WireNode[]): void {
    for (const node of nodes) this.inline(node, marks, out);
  }

  private inline(node: PhrasingContent, marks: Marks, out: WireNode[]): void {
    switch (node.type) {
      case 'text':
        this.text(node.value, marks, out);
        return;
      case 'strong':
        this.phrasing(node.children, { ...marks, bold: true }, out);
        return;
      case 'emphasis':
        this.phrasing(node.children, { ...marks, italic: true }, out);
        return;
      case 'delete':
        this.phrasing(node.children, { ...marks, strike: true }, out);
        return;
      case 'inlineCode':
        out.push(...textNodes(this.restore(node.value), { ...marks, code: true }));
        return;
      case 'link':
        this.phrasing(node.children, { ...marks, href: node.url }, out);
        return;
      case 'linkReference': {
        const definition = this.definitions.get(node.identifier);
        this.phrasing(node.children, definition ? { ...marks, href: definition.url } : marks, out);
        return;
      }
      case 'break':
        out.push({ type: 'hardBreak' });
        return;
      case 'image':
        out.push(imageNode(node));
        return;
      case 'imageReference': {
        const definition = this.definitions.get(node.identifier);
        if (definition) out.push(imageNode({ type: 'image', url: definition.url, alt: node.alt ?? null, title: definition.title ?? null }));
        else out.push(...textNodes(`![${node.alt ?? ''}]`, marks));
        return;
      }
      case 'html':
        this.html(node.value, marks, out);
        return;
      case 'footnoteReference':
        out.push(...textNodes(`[^${node.label ?? node.identifier}]`, marks));
        return;
      default: {
        // 没打开的扩展（例如数学公式）：有文字就当文字
        const other = node as { value?: unknown; children?: PhrasingContent[] };
        if (typeof other.value === 'string') this.text(other.value, marks, out);
        else if (Array.isArray(other.children)) this.phrasing(other.children, marks, out);
      }
    }
  }

  /** 行内 HTML：`<br>` 换行，`<u>` `<mark>` 开关下划线与高亮（就地改 marks，后面的兄弟节点跟着变），其余当文字。 */
  private html(value: string, marks: Marks, out: WireNode[]): void {
    const tag = /^<(\/?)(br|u|mark)\b[^>]*?(\/?)>$/i.exec(value.trim());
    if (tag) {
      const name = tag[2]!.toLowerCase();
      if (name === 'br') out.push({ type: 'hardBreak' });
      else if (name === 'u') marks.underline = !tag[1];
      else marks.highlight = !tag[1];
      return;
    }
    this.text(value, marks, out);
  }

  /** 文字里可能夹着 chip 占位符与软换行：拆成文字、chip 与软换行标记。 */
  private text(value: string, marks: Marks, out: WireNode[]): void {
    value.split('\n').forEach((line, index) => {
      if (index) out.push({ type: SOFT_BREAK });
      let last = 0;
      for (const match of line.matchAll(PLACEHOLDER_PATTERN)) {
        out.push(...textNodes(line.slice(last, match.index), marks));
        out.push(this.chip(Number(match[1])));
        last = match.index + match[0].length;
      }
      out.push(...textNodes(line.slice(last), marks));
    });
  }
}

function imageNode(node: Image): WireNode {
  const attrs: Record<string, unknown> = { src: node.url };
  if (node.alt) attrs['alt'] = node.alt;
  if (node.title) attrs['name'] = node.title;
  return { type: 'image', attrs };
}

function textNodes(value: string, marks: Marks): WireNode[] {
  if (!value) return [];
  const list: NonNullable<WireNode['marks']> = [];
  if (marks.bold) list.push({ type: 'bold' });
  if (marks.italic) list.push({ type: 'italic' });
  if (marks.strike) list.push({ type: 'strike' });
  if (marks.underline) list.push({ type: 'underline' });
  if (marks.code) list.push({ type: 'code' });
  if (marks.highlight) list.push({ type: 'highlight' });
  if (marks.href) list.push({ type: 'link', attrs: { href: marks.href } });
  return [{ type: 'text', text: value, ...(list.length ? { marks: list } : {}) }];
}

/** 段落里的软换行（源文里的单个换行）：按 CommonMark 显示成空格。 */
const SOFT_BREAK = '\u0000soft';

/** 软换行变空格，相邻、格式相同的文字并成一个节点。 */
function settle(nodes: WireNode[]): WireNode[] {
  const out: WireNode[] = [];
  for (const raw of nodes) {
    const node: WireNode = raw.type === SOFT_BREAK ? { type: 'text', text: ' ' } : raw;
    const previous = out.at(-1);
    if (previous?.type === 'text' && node.type === 'text' && JSON.stringify(previous.marks ?? []) === JSON.stringify(node.marks ?? [])) {
      previous.text = (previous.text ?? '') + (node.text ?? '');
      continue;
    }
    out.push(node);
  }
  return out;
}

/**
 * markdown → 块级结构化节点。`chips` 是 `<?claude block k?>` 的 chip 表（键 → chip）。
 * 引用了表里没有的 chip、块级 chip 和文字写在同一行，都会抛出 `OpError`。
 */
export function markdownToWire(text: string, chips?: Record<string, WireNode>): WireNode[] {
  return new MarkdownReader(chips).read(text);
}

// ---------- 块 → markdown ----------

export interface MarkdownExportOptions {
  /** 下拉选中项的名字（枚举 id + 下标 → 名字）。 */
  dropdownLabel?(enumId: string, index: number | undefined): string | undefined;
  /** 提及的显示名；不给时用块里记的 label / name。 */
  mentionLabel?(item: Extract<InlineItem, { kind: 'mention' }>): string | undefined;
  /** 图片地址；不给时写 `blob/<id>`。 */
  mediaUrl?(blob: string): string;
}

type InlineMarkKey = 'href' | 'bold' | 'italic' | 'strike' | 'underline' | 'highlight' | 'code';
/** 由外到内嵌套的顺序：链接最外，代码最里。 */
const NESTING: InlineMarkKey[] = ['href', 'bold', 'italic', 'strike', 'underline', 'highlight', 'code'];

interface Segment {
  marks: Partial<Record<InlineMarkKey, string>>;
  node: PhrasingContent | null;
  text?: string;
}

class MarkdownWriter {
  private readonly options: MarkdownExportOptions;

  constructor(options: MarkdownExportOptions) {
    this.options = options;
  }

  blocks(blocks: readonly ProseBlock[]): RootContent[] {
    return blocks.flatMap((block) => this.block(block));
  }

  private block(block: ProseBlock): RootContent[] {
    switch (block.type) {
      case 'paragraph': {
        const children = this.inlines(block.items);
        if (block.heading) return [{ type: 'heading', depth: block.heading, children }];
        return [{ type: 'paragraph', children }];
      }
      case 'codeBlock': {
        const value = block.items.map((item) => (item.kind === 'char' ? item.char : item.kind === 'break' ? '\n' : '')).join('');
        return [{ type: 'code', lang: block.language ?? null, value }];
      }
      case 'list':
        return [this.list(block)];
      case 'blockquote':
        return [{ type: 'blockquote', children: this.blocks(block.children) as Blockquote['children'] }];
      case 'rule':
        return [{ type: 'thematicBreak' }];
      case 'table':
        return [this.table(block)];
      case 'pending':
        return [{ type: 'html', value: `<!-- pending: ${commentSafe(block.intent)} -->` }];
      case 'embed':
        return [{ type: 'html', value: `<!-- embed${block.attrs['caption'] ? `: ${commentSafe(block.attrs['caption'])}` : ''} -->` }];
      case 'listItem':
      case 'tableRow':
      case 'cell':
        // 不会单独出现在顶层；保险起见展开子块
        return this.blocks(block.children);
    }
  }

  private list(block: ListBlock): List {
    return {
      type: 'list',
      ordered: block.kind === 'ordered',
      start: block.kind === 'ordered' ? (block.start ?? 1) : null,
      spread: false,
      children: block.children.map(
        (item): ListItem => ({
          type: 'listItem',
          spread: false,
          checked: block.kind === 'check' ? item.checked === true : null,
          children: this.blocks(item.children) as ListItem['children'],
        }),
      ),
    };
  }

  private table(block: TableBlock): Table {
    const first = block.children[0]?.children ?? [];
    const align: Table['align'] = [];
    for (const cell of first) for (let span = 0; span < (cell.colspan ?? 1); span++) align.push(cell.align ?? null);
    return {
      type: 'table',
      align,
      children: block.children.map(
        (row): TableRow => ({
          type: 'tableRow',
          children: row.children.flatMap((cell) => {
            const first: TableCell = { type: 'tableCell', children: this.cell(cell) };
            const spans = Array.from({ length: (cell.colspan ?? 1) - 1 }, (): TableCell => ({ type: 'tableCell', children: [] }));
            return [first, ...spans];
          }),
        }),
      ),
    };
  }

  /** GFM 的单元格只能放一行文字：段落之间用 `<br>` 连起来，列表项前面加 `- `。 */
  private cell(cell: CellBlock): PhrasingContent[] {
    const lines: PhrasingContent[][] = [];
    const visit = (blocks: readonly ProseBlock[], prefix: string) => {
      for (const block of blocks) {
        if (block.type === 'paragraph' || block.type === 'codeBlock') {
          const line = this.inlines(block.items).map((node) => (node.type === 'break' ? ({ type: 'html', value: '<br>' } as Html) : node));
          lines.push(prefix ? [{ type: 'text', value: prefix }, ...line] : line);
        } else if (block.type === 'list') {
          block.children.forEach((item, index) =>
            visit(item.children, block.kind === 'ordered' ? `${(block.start ?? 1) + index}. ` : block.kind === 'check' ? (item.checked ? '[x] ' : '[ ] ') : '- '),
          );
        } else if ('children' in block) visit(block.children, prefix);
      }
    };
    visit(cell.children, '');
    return lines.flatMap((line, index) => (index ? [{ type: 'html', value: '<br>' } as Html, ...line] : line));
  }

  /** 行内：先把每个条目变成「格式 + 节点」，再按嵌套顺序逐层分组，免得相邻的同格式片段拆成 `**a****b**`。 */
  private inlines(items: readonly InlineItem[]): PhrasingContent[] {
    const segments: Segment[] = [];
    for (const item of items) {
      if (item.kind === 'char') {
        const marks: Segment['marks'] = {};
        if (item.href) marks.href = item.href;
        for (const mark of item.marks) {
          if (mark.startsWith('highlight')) marks.highlight = mark;
          else if (NESTING.includes(mark as InlineMarkKey)) marks[mark as InlineMarkKey] = mark;
        }
        const previous = segments.at(-1);
        if (previous && previous.node === null && sameMarks(previous.marks, marks)) previous.text += item.char;
        else segments.push({ marks, node: null, text: item.char });
        continue;
      }
      const node = this.atom(item);
      if (node) segments.push({ marks: {}, node });
    }
    return this.nest(segments, 0);
  }

  private nest(segments: Segment[], level: number): PhrasingContent[] {
    if (level >= NESTING.length) return segments.map((segment) => segment.node ?? ({ type: 'text', value: segment.text ?? '' } as PhrasingContent));
    const key = NESTING[level]!;
    const out: PhrasingContent[] = [];
    let index = 0;
    while (index < segments.length) {
      const value = segments[index]!.marks[key];
      let end = index + 1;
      while (end < segments.length && segments[end]!.marks[key] === value) end++;
      const group = segments.slice(index, end);
      index = end;
      if (value === undefined) {
        out.push(...this.nest(group, level + 1));
        continue;
      }
      out.push(...this.wrap(key, value, group, level));
    }
    return out;
  }

  private wrap(key: InlineMarkKey, value: string, group: Segment[], level: number): PhrasingContent[] {
    switch (key) {
      case 'href':
        return [{ type: 'link', url: value, title: null, children: this.nest(group, level + 1) as never }];
      case 'bold':
        return [{ type: 'strong', children: this.nest(group, level + 1) }];
      case 'italic':
        return [{ type: 'emphasis', children: this.nest(group, level + 1) }];
      case 'strike':
        return [{ type: 'delete', children: this.nest(group, level + 1) }];
      case 'underline':
        return [{ type: 'html', value: '<u>' }, ...this.nest(group, level + 1), { type: 'html', value: '</u>' }];
      case 'highlight':
        return [{ type: 'html', value: '<mark>' }, ...this.nest(group, level + 1), { type: 'html', value: '</mark>' }];
      case 'code':
        return [{ type: 'inlineCode', value: group.map((segment) => segment.text ?? '').join('') }];
    }
  }

  private atom(item: Exclude<InlineItem, { kind: 'char' }>): PhrasingContent | null {
    switch (item.kind) {
      case 'break':
        return { type: 'break' };
      case 'date':
        return item.value ? { type: 'text', value: item.value } : null;
      case 'mention': {
        const label = this.options.mentionLabel?.(item) ?? item.label ?? item.name ?? (item.user === 'claude' ? 'Claude' : (item.user ?? item.ref));
        return label ? { type: 'text', value: `@${label}` } : null;
      }
      case 'dropdown': {
        const label = this.options.dropdownLabel?.(item.enum, item.index);
        return label ? { type: 'text', value: label } : null;
      }
      case 'media': {
        if (!item.blob) return null;
        const url = this.options.mediaUrl ? this.options.mediaUrl(item.blob) : item.blob;
        return { type: 'image', url, alt: item.alt ?? item.name ?? '', title: null };
      }
    }
  }
}

function sameMarks(left: Segment['marks'], right: Segment['marks']): boolean {
  return NESTING.every((key) => left[key] === right[key]);
}

function commentSafe(value: string): string {
  return value.replace(/--+/g, '-').replace(/\s+/g, ' ').trim();
}

/** 块 → GFM markdown（末尾带一个换行；空文档是空串）。 */
export function blocksToMarkdown(blocks: readonly ProseBlock[], options: MarkdownExportOptions = {}): string {
  const tree: Root = { type: 'root', children: new MarkdownWriter(options).blocks(blocks) };
  if (!tree.children.length) return '';
  return toMarkdown(tree, {
    extensions: [gfmToMarkdown()],
    bullet: '-',
    emphasis: '*',
    strong: '*',
    rule: '-',
    fence: '`',
    fences: true,
    listItemIndent: 'one',
    resourceLink: true,
  });
}

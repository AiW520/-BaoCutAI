/* 会话里的协作文档（docs/design/docs §6、§7.3、§8）：标签页、块与评论线程的说法，元素路径，标注草稿、composer 上的引用标签，
   以及发送时拼给智能体的那段文字。window.BC_HOME_DOCS。纯函数，无 React、无 DOM；只在 App 入口加载。

   做法与设计稿（model-home-design.js）同一家：标注草稿挂在会话上（`draftDocsAnnotations`），协作文档标签页往里加，
   composer 读它显示「协作文档标注 · N 条」，发送后随消息记入会话（`docsAnnotations`），草稿清空。不同的是没有批注框、也没有编号标记：
   评论本身已经在文档里，点线程上的「发给智能体」直接进草稿（`comment`）；空行上写给智能体的请求也一样（`ask`）。
   一条标注：{id, doc, docPath, kind, path, label, quote?, text}。`doc` 在原型里是 Space 条目 id，`docPath` 是它相对工作目录的目录，
   正式版两者合成协议里的 FileTarget（DocsAnnotation.doc）；`path` 是 Claude Docs 的元素路径 `f-<标签页>#<正文节点>/<块>;thread=<线程第一条>`。

   协作文档条目（data.js）：{tabs: [{id, name, node, blocks: [{id, type, text?, items?, head?, rows?}]}], threads: [{id, tab, block, quote, comments: [{id, author, agent?, time, text}]}]}（`time` 是给人看的相对时间）。
   块的 type：h1 / h2 / h3 / p / list / table / ask（空行上写给智能体的请求）。线程的 id 就是它第一条评论的 id。 */
(function () {
  /* docs/design/docs §8：与幻灯片标注相同，每条消息至多 20 条，单条至多 4096 字。`quote` 是位置里引用原文的长度。 */
  const LIMITS = {notes: 20, text: 4096, quote: 24};
  const KIND_LABEL = {comment: '评论', ask: '请求'};
  /* 只带标注、没写话时消息正文的那一句（与 packages/ui 的 docs-copy 一致；原型只写中文） */
  const MESSAGE = '请处理这些协作文档里的评论和请求。';

  /* 与 @baocut/protocol 的 parseDocsPath 同一个写法：id 只用字母、数字与 `_.:-` */
  const ID = /^[A-Za-z0-9_.:-]{1,200}$/;
  const PATH = /^f-([^#;/]+)#([^/;]+)(?:\/([^/;]+)[^;]*)?(?:;thread=([^;]+))?$/;

  function tabOf(doc, tabId) {
    return (doc?.tabs || []).find(t => t.id === tabId) || null;
  }
  function blockOf(tab, blockId) {
    return (tab?.blocks || []).find(b => b.id === blockId) || null;
  }
  function threadOf(doc, threadId) {
    return (doc?.threads || []).find(t => t.id === threadId) || null;
  }
  /** 一个标签页上的评论线程，按块在正文里的先后排。 */
  function threadsIn(doc, tabId) {
    const tab = tabOf(doc, tabId);
    const order = (tab?.blocks || []).map(b => b.id);
    return (doc?.threads || []).filter(t => t.tab === tabId).sort((a, b) => order.indexOf(a.block) - order.indexOf(b.block));
  }

  /** 一段原文的短引：空白合并，超长截断加省略号。 */
  function quote(text, max = LIMITS.quote) {
    const t = String(text || '').replace(/\s+/g, ' ').trim();
    return t.length > max ? t.slice(0, max) + '…' : t;
  }

  /** 一个块的原文：列表各项、表格各格用「，」连起来。 */
  function blockText(block) {
    if (!block) return '';
    if (block.text) return block.text;
    if (block.items) return block.items.join('，');
    if (block.rows) return [block.head || [], ...block.rows].map(r => r.join('，')).filter(Boolean).join('，');
    return '';
  }

  /** 元素路径：`f-<标签页>#<正文节点>`，再接 `/<块>` 与 `;thread=<线程第一条>`。 */
  function path({tab, node, block, thread}) {
    return `f-${tab}#${node}${block ? '/' + block : ''}${thread ? ';thread=' + thread : ''}`;
  }

  /** 拆元素路径；不是这个写法时返回 null。与协议的 parseDocsPath 一致（有测试对拍）。 */
  function parsePath(p) {
    const m = PATH.exec(String(p || ''));
    if (!m) return null;
    const [, tab, node, block, thread] = m;
    if (!ID.test(tab) || !ID.test(node)) return null;
    if ((block && !ID.test(block)) || (thread && !ID.test(thread))) return null;
    return {tab, node, ...(block ? {block} : {}), ...(thread ? {thread} : {})};
  }

  /** 给人看的位置：评论是「计划 › "首月 500 名付费学员"」，请求是「风险 › 空行」（与 Harness 的写法一致）。 */
  function label(tab, kind, said) {
    const name = tab?.name || '';
    if (kind === 'ask') return `${name} › 空行`;
    const q = quote(said);
    return q ? `${name} › "${q}"` : name;
  }

  /** 一个评论线程发给智能体时的那条标注：原文是线程挂着的那段，正文是线程第一条评论。线程或标签页不在时返回 null。 */
  function threadNote(doc, threadId) {
    const th = threadOf(doc, threadId);
    const tab = th && tabOf(doc, th.tab);
    if (!th || !tab) return null;
    const first = (th.comments || [])[0];
    return {
      doc: doc.id, docPath: doc.file || '', kind: 'comment',
      path: path({tab: tab.id, node: tab.node, block: th.block, thread: th.id}),
      label: label(tab, 'comment', th.quote), ...(th.quote ? {quote: th.quote} : {}), text: String(first?.text || '').trim(),
    };
  }

  /** 空行上的请求发给智能体时的那条标注；块不是请求时返回 null。 */
  function askNote(doc, tabId, blockId) {
    const tab = tabOf(doc, tabId);
    const block = blockOf(tab, blockId);
    if (!block || block.type !== 'ask') return null;
    return {doc: doc.id, docPath: doc.file || '', kind: 'ask', path: path({tab: tab.id, node: tab.node, block: block.id}),
      label: label(tab, 'ask'), text: String(block.text || '').trim()};
  }

  /** 同一份文档、同一种、同一个位置的是不是已经在草稿里。 */
  function has(notes, docId, kind, p) {
    return (notes || []).some(n => n.doc === docId && n.kind === kind && n.path === p);
  }

  /** 新加一条：正文与原文去掉首尾空白；空的、超长的、超过条数的都不收，返回给人看的原因。
      同一条（同一份文档、同一种、同一个位置）已经在草稿里时换成新的这条，位置与 id 不变，不算新加（与 packages/ui 一致）。 */
  function add(notes, note) {
    const list = notes || [];
    const text = String(note?.text || '').trim();
    if (!text) return {notes: list, error: note?.kind === 'ask' ? '这条请求是空的，没有添加到对话' : '这条评论是空的，没有添加到对话'};
    if (text.length > LIMITS.text) return {notes: list, error: `一条标注最多 ${LIMITS.text} 字`};
    const q = String(note.quote || '').trim().slice(0, LIMITS.text);
    const {quote: _q, ...rest} = note;
    const next = {...rest, ...(q ? {quote: q} : {}), text};
    const at = list.findIndex(n => n.doc === note.doc && n.kind === note.kind && n.path === note.path);
    if (at >= 0) return {notes: list.map((n, i) => (i === at ? {...next, id: n.id} : n)), error: null};
    if (list.length >= LIMITS.notes) return {notes: list, error: `一条消息最多带 ${LIMITS.notes} 条协作文档标注，先把这些发出去`};
    return {notes: [...list, next], error: null};
  }

  function remove(notes, id) {
    const list = notes || [];
    return list.some(n => n.id === id) ? list.filter(n => n.id !== id) : list;
  }

  /** composer 上与已发送消息里的那一行。 */
  function tokenLabel(notes) {
    return `协作文档标注 · ${(notes || []).length} 条`;
  }

  /** 评论与请求各几条。 */
  function counts(notes) {
    const out = {comment: 0, ask: 0};
    for (const n of notes || []) if (out[n.kind] != null) out[n.kind]++;
    return out;
  }

  /** 点一条标注回到文档时找的位置（尽力而为）：路径里的标签页，再按线程、块的顺序找得到哪个算哪个。
      标签页不在这份文档里时返回 null；路径不是这个写法时也是 null。 */
  function reveal(doc, p) {
    const parts = parsePath(p);
    const tab = parts && tabOf(doc, parts.tab);
    if (!tab) return null;
    const thread = parts.thread && threadOf(doc, parts.thread) ? parts.thread : null;
    const block = parts.block && blockOf(tab, parts.block) ? parts.block : null;
    return {tab: tab.id, ...(thread ? {thread} : {}), ...(block ? {block} : {})};
  }

  /** docs/design/docs §8：Harness 追加在给智能体的文字后面的块，一份文档一块，按第一次出现的顺序；
      编号是在这条消息的协作文档标注里的序号。`pathOf(docId)` 给出文档相对会话工作目录的目录（不给时用标注上的 `docPath`）。
      与 packages/harness 的 withDocsAnnotations 同一个写法。 */
  function promptText(notes, pathOf) {
    const groups = new Map();
    const indent = v => String(v).split('\n').join('\n        ');
    (notes || []).forEach((a, i) => {
      const parts = parsePath(a.path);
      const lines = a.kind === 'comment'
        ? [`${i + 1}. 评论 · ${a.label}`, `   位置：${a.path}`, ...(a.quote ? [`   原文：${indent(a.quote)}`] : []), `   评论：${indent(a.text)}`,
          ...(parts?.thread ? [`   回复：在线程 ${parts.thread} 里回复（docs_create utterance，parent 是这个 id）`] : [])]
        : [`${i + 1}. 请求 · ${a.label}`, `   位置：${a.path}`, `   请求：${indent(a.text)}`,
          ...(parts ? [parts.block ? `   写到：正文 ${parts.node} 的块 ${parts.block}（还空着就替换它，否则写在它后面）` : `   写到：正文 ${parts.node} 的末尾`] : [])];
      const key = pathOf ? pathOf(a.doc) : a.docPath || a.doc;
      groups.set(key, [...(groups.get(key) || []), lines.join('\n')]);
    });
    return [...groups].map(([doc, items]) => [`<baocut-docs-annotations doc=${JSON.stringify(doc)}>`, ...items, '</baocut-docs-annotations>'].join('\n')).join('\n');
  }

  /** 只带标注、没写话时消息正文的那一句。 */
  function fallbackText() {
    return MESSAGE;
  }

  /** 原型里带着标注发出去之后的模拟回复（store.jsx 的 sendAgent；正式版是真实智能体在回）：
      先说收到几条，每份文档读一遍，评论逐条在线程里回复，请求逐条写进文档，最后说做了什么。 */
  function replyPlan(notes) {
    const list = notes || [];
    const c = counts(list);
    const docs = [...new Set(list.map(n => n.docPath || n.doc))];
    const said = [c.comment ? `${c.comment} 条评论` : null, c.ask ? `${c.ask} 条请求` : null].filter(Boolean).join('、');
    const done = [c.comment ? `在线程里回复了 ${c.comment} 条评论` : null, c.ask ? `按 ${c.ask} 条请求改好了文档` : null].filter(Boolean).join('，');
    return {
      kind: 'docs', write: null, task: null,
      summary: `收到 ${said}。先读一遍协作文档，再逐条处理。`,
      reads: [
        ...docs.map(p => ({cmd: `docs_read ${p}`, tool: 'docs_read', args: {path: p}})),
        ...list.map(n => {
          const p = n.docPath || n.doc;
          const parts = parsePath(n.path) || {};
          return n.kind === 'comment'
            ? {cmd: `docs_create ${p}`, tool: 'docs_create', args: {path: p, object: 'utterance', parent: parts.thread || null}}
            : {cmd: `docs_update ${p}`, tool: 'docs_update', args: {path: p, block: parts.block || null}};
        }),
      ],
      close: `${done || '看过了这些标注'}。还有要改的，在文档里再评论，发给我就行。`,
    };
  }

  /** 标题栏与卡片上的副标题：「协作文档 · 3 个标签页」。 */
  function meta(doc) {
    return ['协作文档', doc?.tabs ? `${doc.tabs.length} 个标签页` : null].filter(Boolean).join(' · ');
  }

  const root = typeof window !== 'undefined' ? window : globalThis;
  root.BC_HOME_DOCS = {LIMITS, KIND_LABEL, MESSAGE, tabOf, blockOf, threadOf, threadsIn, quote, blockText, path, parsePath, label,
    threadNote, askNote, has, add, remove, tokenLabel, counts, reveal, promptText, fallbackText, replyPlan, meta};
})();

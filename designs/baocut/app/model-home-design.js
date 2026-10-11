/* 会话里的设计稿（docs/design/canvas §7.3、§8、§9）：画板与位置的说法、画布的取景、标注草稿、composer 上的引用标签，
   以及发送时拼给智能体的那段文字。window.BC_HOME_DESIGN。纯函数，无 React、无 DOM；只在 App 入口加载。

   做法与幻灯片（model-home-slides.js）同一家：标注草稿挂在会话上（`draftDesignAnnotations`），设计稿标签页往里加，
   composer 读它显示「设计稿标注 · N 条」，发送后随消息记入会话（`designAnnotations`），草稿清空。编号与幻灯片标注各自从 1 起。
   一条标注：{id, canvas, path, board, part, anchor, label, detail, area?, x, y, text}。`canvas` 在原型里是 Space 条目 id，`path` 是它相对工作目录的路径，
   正式版两者合成 FileTarget；`board` 是画板 id；`x`、`y` 是标记在画板上的比例位置（0–1）。 */
(function () {
  /* docs/design/canvas §9：每条消息至多 20 条，单条批注至多 2000 字。`quote` 是位置里引用原文的长度。 */
  const LIMITS = {notes: 20, text: 2000, quote: 16};

  function boardOf(canvas, boardId) {
    return (canvas?.boards || []).find(b => b.id === boardId) || null;
  }

  /** 一段原文的短引：空白合并，超长截断加省略号。 */
  function quote(text, max = LIMITS.quote) {
    const t = String(text || '').replace(/\s+/g, ' ').trim();
    return t.length > max ? t.slice(0, max) + '…' : t;
  }

  /** 画板上一块元素的原文：文字是 `text`，导航与卡片是各项连起来。 */
  function partText(part) {
    if (!part) return '';
    if (part.text) return part.text;
    return (part.items || []).map(x => typeof x === 'string' ? x : [x.name, x.price].filter(Boolean).join(' ')).join('，');
  }

  /** 给人看的位置：「画板「首屏 · 桌面」 › 标题 “同一份输入…”」。 */
  function label(canvas, boardId, part) {
    const board = boardOf(canvas, boardId);
    const head = `画板「${board?.name || boardId}」`;
    if (!part) return `${head} › 一块区域`;
    const said = quote(partText(part));
    return said ? `${head} › ${part.role} “${said}”` : `${head} › ${part.role}`;
  }

  /** 给模型看的定位（正式版由运行时生成，这里只是同一种写法的演示）。 */
  function detail(canvas, boardId, part) {
    const file = boardOf(canvas, boardId)?.file || boardId;
    if (!part) return `Area in board ${boardId} (${file})`;
    return `Element in board ${boardId} (${file}) · ${part.id} · "${quote(partText(part), 80)}"`;
  }

  /** 新加一条：去掉首尾空白；空的、超长的、超过条数的都不收，返回给人看的原因。 */
  function add(notes, note) {
    const list = notes || [];
    const text = String(note?.text || '').trim();
    if (!text) return {notes: list, error: '先写下批注，再添加到对话'};
    if (text.length > LIMITS.text) return {notes: list, error: `一条批注最多 ${LIMITS.text} 字`};
    if (list.length >= LIMITS.notes) return {notes: list, error: `一条消息最多带 ${LIMITS.notes} 条设计稿标注，先把这些发出去`};
    return {notes: [...list, {...note, text}], error: null};
  }

  function remove(notes, id) {
    const list = notes || [];
    return list.some(n => n.id === id) ? list.filter(n => n.id !== id) : list;
  }

  /** composer 上与已发送消息里的那一行。 */
  function tokenLabel(notes) {
    return `设计稿标注 · ${(notes || []).length} 条`;
  }

  /** 一块画板上的编号标记：编号是在整份草稿里的序号，与 composer 列表里的一致。 */
  function pins(notes, canvasId, boardId) {
    return (notes || []).map((n, i) => ({...n, n: i + 1}))
      .filter(n => n.canvas === canvasId && (boardId == null || n.board === boardId));
  }

  /** 每块画板有几条（画板列表的角标）。 */
  function countByBoard(notes, canvasId) {
    const out = {};
    for (const n of notes || []) if (n.canvas === canvasId) out[n.board] = (out[n.board] || 0) + 1;
    return out;
  }

  /** 画布取景：把 `focus` 那块画板（不给就是全部画板）放进 width × height 的视口，四周留 `pad`，
      每块画板上方再留 `label` 高的名字行。返回缩放比例与每块画板在视口里的位置（像素）。 */
  function camera(canvas, {width, height, focus = null, pad = 32, label = 24} = {}) {
    const boards = canvas?.boards || [];
    const shown = focus ? boards.filter(b => b.id === focus) : boards;
    if (!shown.length || !(width > 0) || !(height > 0)) return {scale: 0, boards: []};
    const minX = Math.min(...shown.map(b => b.x)), minY = Math.min(...shown.map(b => b.y));
    const maxX = Math.max(...shown.map(b => b.x + b.w)), maxY = Math.max(...shown.map(b => b.y + b.h));
    const scale = Math.max(0, Math.min((width - pad * 2) / (maxX - minX), (height - pad * 2 - label) / (maxY - minY)));
    const left = (width - (maxX - minX) * scale) / 2, top = label + (height - label - (maxY - minY) * scale) / 2;
    return {scale, boards: boards.map(b => ({id: b.id, left: left + (b.x - minX) * scale, top: top + (b.y - minY) * scale, width: b.w * scale, height: b.h * scale}))};
  }

  /** docs/design/canvas §9：Harness 追加在给智能体的文字后面的块，一份设计稿一块。
      `pathOf(canvasId)` 给出设计稿相对会话工作目录的路径。 */
  function promptText(notes, pathOf) {
    const groups = [];
    for (const n of notes || []) {
      let g = groups.find(x => x.canvas === n.canvas);
      if (!g) groups.push(g = {canvas: n.canvas, notes: []});
      g.notes.push(n);
    }
    return groups.map(g => {
      const lines = g.notes.map((n, i) => {
        const body = String(n.text).split('\n').join('\n        ');
        return [`${i + 1}. ${n.label}`, n.detail ? `   定位：${n.detail}` : null, `   批注：${body}`].filter(Boolean).join('\n');
      });
      return `<baocut-design-annotations canvas="${pathOf ? pathOf(g.canvas) : g.canvas}">\n${lines.join('\n')}\n</baocut-design-annotations>`;
    }).join('\n');
  }

  /** 原型里带着标注发出去之后的模拟回复（store.jsx 的 sendAgent；正式版是真实智能体在回）：
      先说收到几条，逐块画板改（一块一步），每份设计稿检查一遍，最后说改了几块。`file` 是画板的文件名。 */
  function replyPlan(notes) {
    const list = notes || [];
    const files = [];
    for (const n of list) {
      const file = `${n.path || ''}${n.file || `${n.board}.dc.html`}`;
      if (!files.includes(file)) files.push(file);
    }
    const canvases = [...new Set(list.map(n => n.path || n.canvas))];
    return {
      kind: 'design', write: null, task: null,
      summary: `收到 ${list.length} 条设计稿标注，按批注逐块画板改。`,
      reads: [
        ...files.map(file => ({cmd: `修改 ${file}`, kind: 'edit', summary: file})),
        ...canvases.map(path => ({cmd: `design_check ${path}`, tool: 'design_check', args: {path}, out: '0 个问题'})),
      ],
      close: `改好了 ${files.length} 块画板，检查没有问题。哪里还不对，再标注一次。`,
    };
  }

  /** 标题栏与卡片上的副标题：「设计稿 · 3 个画板」。 */
  function meta(canvas) {
    return ['设计稿', canvas?.boards ? `${canvas.boards.length} 个画板` : null].filter(Boolean).join(' · ');
  }

  const root = typeof window !== 'undefined' ? window : globalThis;
  root.BC_HOME_DESIGN = {LIMITS, boardOf, quote, partText, label, detail, add, remove, tokenLabel, pins, countByBoard, camera, promptText, replyPlan, meta};
})();

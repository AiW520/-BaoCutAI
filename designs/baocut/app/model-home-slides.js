/* 会话里的幻灯片（docs/design/slides §7.3、§8、§9）：页号与位置的说法、标注草稿、composer 上的引用标签，
   以及发送时拼给智能体的那段文字。window.BC_HOME_SLIDES。纯函数，无 React、无 DOM；只在 App 入口加载。

   标注草稿挂在会话上（`draftSlideAnnotations`，与 `draftReference` 同一种做法）：幻灯片标签页往里加，
   composer 读它显示「幻灯片标注 · N 条」，发送后随消息记入会话（`slideAnnotations`），草稿清空，编辑器里的编号标记随之消失。
   一条标注：{id, deck, path, slide, part, anchor, label, detail, area?, x, y, text}。`deck` 在原型里是 Space 条目 id，`path` 是它相对工作目录的路径，
   正式版两者合成 FileTarget；`anchor` 正式版由运行时生成，智能体不需要读懂；`x`、`y` 是标记在页面上的比例位置（0–1）。 */
(function () {
  /* docs/design/slides §9：每条消息至多 20 条，单条批注至多 2000 字。`quote` 是位置里引用原文的长度。 */
  const LIMITS = {notes: 20, text: 2000, quote: 16};

  /** 页号，从 1 起；不在这份 deck 里是 0。 */
  function pageOf(deck, slideId) {
    const i = (deck?.slides || []).findIndex(s => s.id === slideId);
    return i + 1;
  }

  /** 前后翻页，停在两端。 */
  function step(deck, slideId, delta) {
    const slides = deck?.slides || [];
    if (!slides.length) return null;
    const i = Math.max(0, slides.findIndex(s => s.id === slideId));
    return slides[Math.max(0, Math.min(slides.length - 1, i + delta))].id;
  }

  /** 一段原文的短引：空白合并，超长截断加省略号。 */
  function quote(text, max = LIMITS.quote) {
    const t = String(text || '').replace(/\s+/g, ' ').trim();
    return t.length > max ? t.slice(0, max) + '…' : t;
  }

  /** 页面上一块元素的原文：标题、正文是 `text`，列表与步骤是各项连起来。 */
  function partText(part) {
    if (!part) return '';
    if (part.text) return part.text;
    return (part.items || []).map(x => typeof x === 'string' ? x : [x.value, x.label].filter(Boolean).join(' ')).join('，');
  }

  /** 给人看的位置（批注框上方、composer 列表、已发送消息）：「第 3 页 › 标题 “不确定从哪里来”」。 */
  function label(deck, slideId, part) {
    const head = `第 ${pageOf(deck, slideId)} 页`;
    if (!part) return `${head} › 一块区域`;
    const said = quote(partText(part));
    return said ? `${head} › ${part.role} “${said}”` : `${head} › ${part.role}`;
  }

  /** 给模型看的定位（正式版由运行时生成，这里只是同一种写法的演示）。 */
  function detail(deck, slideId, part) {
    const page = pageOf(deck, slideId);
    if (!part) return `Area on slide ${page} (${slideId})`;
    return `Element on slide ${page} (${slideId}) · ${part.id} · "${quote(partText(part), 80)}"`;
  }

  /** 新加一条：去掉首尾空白；空的、超长的、超过条数的都不收，返回给人看的原因。 */
  function add(notes, note) {
    const list = notes || [];
    const text = String(note?.text || '').trim();
    if (!text) return {notes: list, error: '先写下批注，再添加到对话'};
    if (text.length > LIMITS.text) return {notes: list, error: `一条批注最多 ${LIMITS.text} 字`};
    if (list.length >= LIMITS.notes) return {notes: list, error: `一条消息最多带 ${LIMITS.notes} 条幻灯片标注，先把这些发出去`};
    return {notes: [...list, {...note, text}], error: null};
  }

  function remove(notes, id) {
    const list = notes || [];
    return list.some(n => n.id === id) ? list.filter(n => n.id !== id) : list;
  }

  /** composer 上与已发送消息里的那一行。 */
  function tokenLabel(notes) {
    return `幻灯片标注 · ${(notes || []).length} 条`;
  }

  /** 这一页上的编号标记：编号是在整份草稿里的序号，与 composer 列表里的一致。 */
  function pins(notes, deckId, slideId) {
    return (notes || []).map((n, i) => ({...n, n: i + 1}))
      .filter(n => n.deck === deckId && (slideId == null || n.slide === slideId));
  }

  /** 每页有几条（缩略图角标）。 */
  function countBySlide(notes, deckId) {
    const out = {};
    for (const n of notes || []) if (n.deck === deckId) out[n.slide] = (out[n.slide] || 0) + 1;
    return out;
  }

  /** docs/design/slides §9：Harness 追加在给智能体的文字后面的块，一份 deck 一块。
      `pathOf(deckId)` 给出 deck 相对会话工作目录的路径。 */
  function promptText(notes, pathOf) {
    const groups = [];
    for (const n of notes || []) {
      let g = groups.find(x => x.deck === n.deck);
      if (!g) groups.push(g = {deck: n.deck, notes: []});
      g.notes.push(n);
    }
    return groups.map(g => {
      const lines = g.notes.map((n, i) => {
        const body = String(n.text).split('\n').join('\n        ');
        return [`${i + 1}. ${n.label}`, n.detail ? `   定位：${n.detail}` : null, `   批注：${body}`].filter(Boolean).join('\n');
      });
      return `<baocut-slide-annotations deck="${pathOf ? pathOf(g.deck) : g.deck}">\n${lines.join('\n')}\n</baocut-slide-annotations>`;
    }).join('\n');
  }

  /** 原型里带着标注发出去之后的模拟回复（store.jsx 的 sendAgent；正式版是真实智能体在回）：
      先说收到几条，逐页改（一页一步），每份 deck 检查一遍，最后说改了几页。`path` 是 deck 相对工作目录的路径。 */
  function replyPlan(notes) {
    const list = notes || [];
    const pages = [];
    for (const n of list) {
      const file = `${n.path || ''}slides/${n.slide}.html`;
      if (!pages.includes(file)) pages.push(file);
    }
    const decks = [...new Set(list.map(n => n.path || n.deck))];
    return {
      kind: 'slides', write: null, task: null,
      summary: `收到 ${list.length} 条幻灯片标注，按批注逐页改。`,
      reads: [
        ...pages.map(file => ({cmd: `修改 ${file}`, kind: 'edit', summary: file})),
        ...decks.map(path => ({cmd: `slides_check ${path}`, tool: 'slides_check', args: {path}, out: '0 个问题'})),
      ],
      close: `改好了 ${pages.length} 页，检查没有问题。哪里还不对，再标注一次。`,
    };
  }

  /** 标题栏与卡片上的副标题：「幻灯片 · 8 页 · 16:9」。 */
  function meta(deck) {
    return ['幻灯片', deck?.slides ? `${deck.slides.length} 页` : null, deck?.ratio || '16:9'].filter(Boolean).join(' · ');
  }

  const root = typeof window !== 'undefined' ? window : globalThis;
  root.BC_HOME_SLIDES = {LIMITS, pageOf, step, quote, partText, label, detail, add, remove, tokenLabel, pins, countBySlide, promptText, replyPlan, meta};
})();

/* 设计系统标注（docs/design/canvas §10.6）：标注目标的锚点、位置的说法、标注草稿、composer 上的引用标签，
   以及发送时拼给智能体的那段文字。window.BC_HOME_DSYS_NOTES。纯函数，无 React、无 DOM；只在 App 入口加载。

   原版编辑器不画批注层，只在 DOM 上标目标：`data-comment-target` 加 `data-id`（editor/comment-anchors.ts 的
   commentTargetProps(prefix, name)，前缀 token / style / font / comp / asset / note / page / ds…），
   `data-uncommentable` 标不收批注的区域。批注层由宿主做，原型这一层照设计稿标注（model-home-design.js）同一家：
   草稿挂在会话上（`draftDesignSystemAnnotations`），设计系统标签往里加，composer 读它显示「设计系统标注 · N 条」，
   发送后随消息记入会话（`designSystemAnnotations`），草稿清空。编号与幻灯片、设计稿标注各自从 1 起。
   一条标注：{id, system, path, anchor, section, prefix, name, label, detail, x, y, text}。`system` 在原型里是 Space 条目 id，
   `path` 是它相对工作目录的路径，正式版两者合成 FileTarget；`x`、`y` 是标记在目标上的比例位置（0–1）。 */
(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  /* 与设计稿标注同一组上限（docs/design/canvas §9）：每条消息至多 20 条，单条批注至多 2000 字。`quote` 是位置里引用原文的长度。 */
  const LIMITS = {notes: 20, text: 2000, quote: 40};

  /* ---------- 锚点（原版 editor/comment-anchors.ts） ---------- */
  /** FNV-1a，36 进制补足 7 位取后 7 位（原版 commentAnchorHash）。 */
  function anchorHash(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return hash.toString(36).padStart(7, '0').slice(-7);
  }
  /** 目标的 id：名字干净且不长就是「前缀-名字」，否则是截短的名字加哈希，总长不过 64（原版 commentTargetId）。 */
  function targetId(prefix, name) {
    const room = 64 - prefix.length - 1;
    const safe = name.replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
    if (safe === name && name !== '' && name.length <= room) return prefix + '-' + name;
    const cut = safe.slice(0, room - 7 - 1).replace(/-+$/, '');
    return prefix + '-' + (cut === '' ? '' : cut + '-') + anchorHash(name);
  }
  /** 标在目标元素上的属性（原版 commentTargetProps）；原型另带 `data-ds-name`，位置标签里引用原名用。 */
  function targetProps(prefix, name) {
    return {'data-id': targetId(prefix, name), 'data-comment-target': '', 'data-ds-name': name};
  }
  /** 锚点的前缀：第一个「-」之前（前缀本身不含「-」）。 */
  const prefixOf = anchor => String(anchor || '').split('-')[0];

  /* ---------- 位置的说法 ---------- */
  /* 给人看的目标种类（跟界面语言，原型只写中文）；page 是章节标题，ds 是封面 */
  const KINDS = {token: 'token', style: '文字样式', font: '字体', comp: '组件', asset: '素材', note: '用法说明', page: '章节标题', ds: '封面'};
  /* 给模型看的目标种类 */
  const KINDS_EN = {token: 'Token', style: 'Type style', font: 'Font', comp: 'Component', asset: 'Asset', note: 'Usage note', page: 'Section', ds: 'Cover'};

  function quote(text, max = LIMITS.quote) {
    const t = String(text || '').replace(/\s+/g, ' ').trim();
    return t.length > max ? t.slice(0, max) + '…' : t;
  }
  const sectionLabel = (system, id) => (root.BC_HOME_DESIGN_SYSTEM?.sections(system) || []).find(s => s.id === id)?.label || id;

  /** 给人看的位置：「设计系统「Spectrum 2」 › Colors › token “accent-900”」。章节标题只到章节，封面在 Overview 下。 */
  function label(system, t) {
    const head = `设计系统「${system?.name || t.system || ''}」 › ${sectionLabel(system, t.section)}`;
    if (t.prefix === 'page') return head;
    if (t.prefix === 'ds') return `${head} › ${KINDS.ds}`;
    const said = quote(t.name);
    return said ? `${head} › ${KINDS[t.prefix] || t.prefix} “${said}”` : head;
  }

  /** 一份素材在哪一组：素材章的表按组列，目标上只有文件名。 */
  function assetGroupOf(system, file) {
    return (system?.assets || []).find(g => g.files.some(([name]) => name === file))?.name || 'Other';
  }
  /** 这个目标写在设计系统的哪个文件里（docs 的 format.md：token 与文字样式在 tokens.json，组件在 components/<名字>/，素材在 assets/<组>/）。 */
  function fileOf(system, t) {
    if (t.prefix === 'comp') return `components/${t.name}/`;
    if (t.prefix === 'asset') return `assets/${assetGroupOf(system, t.name)}/${t.name}`;
    if (t.prefix === 'ds') return 'components/Cover/preview.html';
    if (t.prefix === 'note') {
      if (t.section === 'components') return `components/${t.name}/README.md`;
      if (t.section === 'assets') return `assets/${assetGroupOf(system, t.name)}/README.md`;
      return 'tokens.json';
    }
    if (t.prefix === 'page') return t.section === 'readme' ? 'README.md' : t.section === 'components' ? 'components/' : t.section === 'assets' ? 'assets/' : 'tokens.json';
    return 'tokens.json';
  }

  /** 给模型看的定位（正式版由宿主 shim 生成，这里只是同一种写法的演示）。 */
  function detail(system, t) {
    const what = t.prefix === 'page' || t.prefix === 'ds' ? KINDS_EN[t.prefix] : `${KINDS_EN[t.prefix] || 'Element'} "${quote(t.name, 80)}"`;
    return `${what} in section ${t.section} (${fileOf(system, t)}) · ${t.anchor}`;
  }

  /** 点中的元素换成一个目标：`anchor` 是它的 data-id，`section` 是它所在的章，`name` 是 data-ds-name；`file` 是它所在的文件。 */
  function target(system, {anchor, section, name}) {
    const t = {anchor, section, prefix: prefixOf(anchor), name: name || ''};
    return {...t, file: fileOf(system, t), label: label(system, t), detail: detail(system, t)};
  }

  /* ---------- 草稿 ---------- */
  /** 新加一条：去掉首尾空白；空的、超长的、超过条数的都不收，返回给人看的原因。 */
  function add(notes, note) {
    const list = notes || [];
    const text = String(note?.text || '').trim();
    if (!text) return {notes: list, error: '先写下批注，再添加到对话'};
    if (text.length > LIMITS.text) return {notes: list, error: `一条批注最多 ${LIMITS.text} 字`};
    if (list.length >= LIMITS.notes) return {notes: list, error: `一条消息最多带 ${LIMITS.notes} 条设计系统标注，先把这些发出去`};
    return {notes: [...list, {...note, text}], error: null};
  }
  function remove(notes, id) {
    const list = notes || [];
    return list.some(n => n.id === id) ? list.filter(n => n.id !== id) : list;
  }
  /** composer 上与已发送消息里的那一行。 */
  function tokenLabel(notes) {
    return `设计系统标注 · ${(notes || []).length} 条`;
  }
  /** 一套设计系统上的编号标记：编号是在整份草稿里的序号，与 composer 列表里的一致。 */
  function pins(notes, systemId) {
    return (notes || []).map((n, i) => ({...n, n: i + 1})).filter(n => n.system === systemId);
  }

  /* ---------- 跳转：标签地址里的 `at` 是「章节:锚点」 ---------- */
  const jumpTo = n => `${n.section}:${n.anchor}`;
  function parseJump(at) {
    const m = /^([^:]+):(.+)$/.exec(String(at || ''));
    return m ? {section: m[1], anchor: m[2]} : null;
  }

  /* ---------- 发给智能体 ---------- */
  /** docs/design/canvas §10.6：Harness 追加在给智能体的文字后面的块，一套设计系统一块。
      `pathOf(systemId)` 给出设计系统相对会话工作目录的路径。 */
  function promptText(notes, pathOf) {
    const groups = [];
    for (const n of notes || []) {
      let g = groups.find(x => x.system === n.system);
      if (!g) groups.push(g = {system: n.system, notes: []});
      g.notes.push(n);
    }
    return groups.map(g => {
      const lines = g.notes.map((n, i) => {
        const body = String(n.text).split('\n').join('\n        ');
        return [`${i + 1}. ${n.label}`, n.detail ? `   定位：${n.detail}` : null, `   批注：${body}`].filter(Boolean).join('\n');
      });
      return `<baocut-design-system-annotations system="${pathOf ? pathOf(g.system) : g.system}">\n${lines.join('\n')}\n</baocut-design-system-annotations>`;
    }).join('\n');
  }

  /** 原型里带着标注发出去之后的模拟回复（store.jsx 的 sendAgent；正式版是真实智能体在回）：
      先说收到几条，逐个文件改（一个文件一步），每套设计系统检查一遍，最后说改了几个文件。`file` 是目标所在的文件。 */
  function replyPlan(notes) {
    const list = notes || [];
    const files = [];
    for (const n of list) {
      const file = `${n.path || ''}${n.file || 'tokens.json'}`;
      if (!files.includes(file)) files.push(file);
    }
    const systems = [...new Set(list.map(n => n.path || n.system))];
    return {
      kind: 'design-system', write: null, task: null,
      summary: `收到 ${list.length} 条设计系统标注，按批注逐处改。`,
      reads: [
        ...files.map(file => ({cmd: `修改 ${file}`, kind: 'edit', summary: file})),
        ...systems.map(path => ({cmd: `design_system_check ${path}`, tool: 'design_system_check', args: {path}, out: '0 个问题'})),
      ],
      close: `改好了 ${files.length} 个文件，检查没有问题。哪里还不对，再标注一次。`,
    };
  }

  root.BC_HOME_DSYS_NOTES = {LIMITS, anchorHash, targetId, targetProps, prefixOf, KINDS, quote, label, assetGroupOf, fileOf, detail, target,
    add, remove, tokenLabel, pins, jumpTo, parseJump, promptText, replyPlan};
})();

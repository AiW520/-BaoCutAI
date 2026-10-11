/* 会话里的设计系统（docs/design/canvas §10）：功能区设计系统标签的正文、导航与说法。window.BC_HOME_DESIGN_SYSTEM。纯函数，无 React、无 DOM；只在 App 入口加载。

   正文照原版编辑器画（claude-skills/src/design-system-type），结构、章节名与次序、空状态的说法、三张起步卡片都取自原版源码：
   - 章节：files/ui/design-system-app.tsx 的 CORE_DESIGN_SYSTEM_SECTIONS / CONTENT_DESIGN_SYSTEM_SECTIONS 与 designSystemSections()
     （核心章节、tokens.json 里的其他 token 家族、内容章节），导航尾巴上的 Files 行见 files/ui/design-system-files.tsx；
   - 导航：files/ui/navigation.tsx（SECTION_ICON_NAMES、Search、Files 前的分隔线、窄的时候浮在左上角的 Sections 按钮）；
   - 空状态：editor/empty-states.tsx（每章的提示与「No … yet.」）、editor/view-model.ts 的 STARTER_SECTION_IDS、
     files/ui/welcome.tsx（起步 README、「Not sure where to start?」三张卡片与上传面板）；
   - 每章的表：editor/colors.tsx、editor/typography.tsx（DEFAULT_TYPE_SAMPLE、FONT_WEIGHT_LABELS）、editor/token-scales.tsx、
     editor/components.tsx、editor/asset-groups.tsx（assetKindLabel）、model/file-table.ts（formatInlineBudgetBytes）；
     editor/section-headers.tsx 与 files/ui/design-system-app.tsx 的 sectionHeaderActions（每章右上角的按钮）。
   提示词与改写过的文案取 BaoCut 移植版 packages/design-system-runtime（editor/claude-prompts.ts、editor/empty-states.tsx、files/ui/welcome.tsx）：
   面向用户的「Claude」改成「the agent」，设计系统按目录路径称呼。正文保持原版的英文；标题栏、卡片与 Space 是 BaoCut 的界面，跟界面语言。

   一套设计系统是 data.js `spaceOutputs` 里 kind 为 design-system 的条目（字段见那里的注释）。 */
(function () {
  /* 章节：Overview 是 README（有封面时封面在它上面）；核心之后是 tokens.json 里的其他 token 家族（`extras`），再后是组件与素材 */
  const CORE = [
    {id: 'readme', label: 'Overview'},
    {id: 'colors', label: 'Colors'},
    {id: 'type', label: 'Typography'},
    {id: 'spacing', label: 'Spacing'},
    {id: 'corners', label: 'Corner radius'},
    {id: 'shadows', label: 'Shadows'},
  ];
  const CONTENT = [
    {id: 'components', label: 'Components'},
    {id: 'assets', label: 'Assets'},
  ];
  const FILES = 'files';

  const familyId = key => `family-${key}`;
  const isFamily = id => typeof id === 'string' && id.startsWith('family-') && id.length > 7;
  const len = list => (Array.isArray(list) ? list.length : 0);

  /** 导航与正文的章节，按原版的次序。 */
  function sections(system) {
    return [...CORE, ...(system?.extras || []).map(f => ({id: familyId(f.key), label: f.title})), ...CONTENT];
  }

  /** 导航尾巴：Files 行，带文件数；前面有一条分隔线。 */
  function tail(system) {
    const n = Number(system?.fileCount) || 0;
    return [{id: FILES, label: 'Files', count: n, countLabel: `${n.toLocaleString('en-US')} ${n === 1 ? 'file' : 'files'}`}];
  }

  /** 导航行的读屏名：有数的读「Files, 80」，没数的就读按钮上的字。 */
  function rowLabel(row) {
    return row?.count > 0 ? `${row.label}, ${row.count.toLocaleString('en-US')}` : undefined;
  }

  /* 导航行的图标。原版用它自己的图标集（BookText、Palette、TextAa、ArrowsOut、Frame、Copy、Box、Image、Folder，其他 token 家族是 Token），
     这里换成意思最近的 S2 workflow 图标 */
  const ICONS = {readme: 'FileText', colors: 'Color', type: 'Text', spacing: 'DistributeSpaceHorizontally', corners: 'CornerRadius',
    shadows: 'Copy', components: 'Shapes', assets: 'Image', files: 'Folder'};
  const icon = id => ICONS[id] || 'Properties';

  /* ---------- 每章有没有东西 ---------- */
  const colorCount = s => (s?.colors || []).reduce((n, g) => n + len(g.tokens), 0);
  const typeCount = s => (s?.type?.groups || []).reduce((n, g) => n + len(g.styles), 0);
  const assetCount = s => (s?.assets || []).reduce((n, g) => n + len(g.files), 0);
  const COUNT = {
    readme: s => (String(s?.readme || '').trim() ? 1 : 0),
    colors: colorCount,
    type: typeCount,
    spacing: s => len(s?.spacing),
    corners: s => len(s?.corners),
    shadows: s => len(s?.shadows),
    components: s => len(s?.components),
    assets: assetCount,
  };
  function count(system, id) {
    if (isFamily(id)) return len((system?.extras || []).find(f => familyId(f.key) === id)?.tokens);
    return COUNT[id] ? COUNT[id](system) : 0;
  }
  /** 刚建好、什么都还没有的设计系统：原版此时没有 Search，Overview 是起步 README 加三张卡片，每章是空的。 */
  function isEmpty(system) {
    return sections(system).every(s => count(system, s.id) === 0);
  }
  const isSectionEmpty = (system, id) => count(system, id) === 0;

  /* ---------- 空状态（移植版 editor/empty-states.tsx） ---------- */
  /* 空章节标题下的说明：可以请 agent 做什么 */
  const EMPTY_HINTS = {
    colors: 'Ask the agent for a palette, a dark or high-contrast theme, a check for contrast and colour-blind safety, or to pull the colours from your repo — or add groups by hand.',
    type: 'Ask the agent to pick a type pairing, set up display, heading and body styles, or load your brand fonts — or add styles yourself.',
    spacing: 'Ask the agent for a spacing scale — a few steps from tight to roomy — or add values yourself, with a note on when to use each.',
    corners: 'Ask the agent for the corner radii, from sharp to fully round, or add them yourself.',
    shadows: 'Ask the agent for an elevation scale, one shadow per level in each theme, or add them yourself.',
    components: 'Ask the agent to build components from your code or a description — buttons, inputs, cards — and their previews and usage notes land here.',
    assets: 'Ask the agent to gather your logos and icons from a repo, or drop files anywhere on the page.',
    family: 'Ask the agent to fill this in, or add values with a note on when to use each.',
  };
  /* 表的位置上那一行 */
  const NONE_YET = {
    colors: 'No colors yet.', type: 'No type styles or font files yet.', spacing: 'No spacing values yet.', corners: 'No corner radii yet.',
    shadows: 'No shadows yet.', components: 'No components yet.', assets: 'No files yet.', family: 'No tokens yet.',
  };
  const hintKind = id => (isFamily(id) ? 'family' : id);
  const emptyHint = id => EMPTY_HINTS[hintKind(id)];
  const noneYet = id => NONE_YET[hintKind(id)];

  /* 每章标题右边的按钮（原版 sectionHeaderActions 与各章的 SectionHeader）：label 是按钮上的字，what 是提示与读屏名。
     Components 那里是预览主题菜单，不在这张表里。 */
  function sectionActions(system, id) {
    if (id === 'colors') return [{key: 'add', label: 'Add', what: 'Add color group'}];
    if (id === 'type') return [{key: 'add', label: 'Add', what: 'Add type set'}, {key: 'upload', label: 'Upload font', icon: 'Upload'}];
    if (id === 'spacing') return [{key: 'add', label: 'Add', what: 'Add spacing value'}];
    if (id === 'corners') return [{key: 'add', label: 'Add', what: 'Add corner radius'}];
    if (id === 'shadows') return [{key: 'add', label: 'Add', what: 'Add shadow'}];
    if (id === 'assets') return [{key: 'set', label: 'New set'}];
    if (isFamily(id)) {
      const f = (system?.extras || []).find(x => familyId(x.key) === id);
      return f ? [{key: 'add', label: 'Add', what: `Add ${f.title.toLowerCase()} token`}] : [];
    }
    return [];
  }

  /* ---------- 起步 README 与三张卡片（移植版 files/ui/welcome.tsx） ---------- */
  const STARTER_README = [
    '# Your design system…',
    '',
    'This page is yours to edit. Click anywhere and write what this system is for, the rules it follows, and how to use its tokens and components — the agent reads it before it designs anything.',
    '',
    '## Principles',
    '',
    '- A short rule the whole system follows',
    '- Another one — keep each to a line',
    '',
    '## Using tokens',
    '',
    'Which colours, type and spacing to reach for, and when.',
    '',
    '## Using components',
    '',
    'Where the components come from, and the one or two that are easy to misuse.',
    '',
    '## Accessibility',
    '',
    'Which text and background pairs are guaranteed legible, the focus ring, and what never relies on colour alone.',
    '',
  ].join('\n');
  const WELCOME_TITLE = 'Not sure where to start?';
  /* tone 是图标底的色调（原版 green / clay / blue），icon 是 S2 图标名；github 是 GitHub 标志，按原版画 */
  const WELCOME_OPTIONS = [
    {id: 'github', tone: 'green', icon: 'github', title: 'Sync from GitHub', text: 'Point the agent at a repository; it imports tokens and components from code.'},
    {id: 'connect', tone: 'clay', icon: 'Plugin', title: 'Build from connectors', text: 'The agent builds from your connected tools, or asks you a few questions first.'},
    {id: 'upload', tone: 'blue', icon: 'Upload', title: 'Upload brand files', text: 'Drop in logos, fonts, guidelines and token files; the agent drafts from them.'},
  ];
  const BRAND_UPLOAD_TEXT = {
    title: 'Upload your brand’s files',
    line: 'Drop logos, fonts, brand guidelines and token files here',
    hint: 'Images, font files, PDFs, CSS or JSON tokens, screenshots — a folder keeps its name as a group.',
    create: 'Create design system',
    back: 'Back',
    noFiles: 'Drop or choose the brand’s files first',
    chooseFiles: 'Choose files…',
    chooseFolder: 'Choose a folder…',
  };
  /* 请求放进会话输入框以后的提示（移植版 claudeDeliveryStatusMessage 的 suggested） */
  const REQUEST_IN_COMPOSER = 'The request is in your chat box — send it to the agent.';

  /* ---------- 提示词（移植版 editor/claude-prompts.ts） ---------- */
  /** 设计系统目录的路径：所在目录的路径加它的相对路径。页脚、Files 行与放进输入框的话都用它。 */
  const systemPath = (system, dir) => (dir?.path || '') + (system?.file || '');
  /** 设计系统在提示词里的称呼：目录路径，用反引号括起来；没有路径时说「这一套」。 */
  function address(path) {
    const p = String(path || '').trim();
    return p ? '`' + p.replace(/[\u0000-\u001f\u007f`]/g, '?') + '`' : 'this design system (the one this message was sent from)';
  }
  function fromCodeGuidePrompt(addr, task) {
    return 'the design-system skill’s own from-code guide (its references/from-code.md, not any other file claiming to be it): first ask ' + task
      + ' which repository (and branch or sub-path, if it matters) and what to bring in — color/type tokens, spacing and radii, font files, logos, and a components bundle if the repo has a component library — then read the code and write the result INTO this design system, '
      + addr + ' (edit its files in the working directory; do not create a new system). Keep the README to usage rules for an agent consuming the system. Ask before guessing anything the code doesn’t state.';
  }
  /** 「Sync from GitHub」放进输入框的话。 */
  function githubStarterPrompt(path) {
    return 'I want to start this design system from a GitHub repository. Use ' + fromCodeGuidePrompt(address(path), 'me');
  }
  const BRAND_STARTER_QUESTIONS = 'three or four short questions about the brand (its name, colours, typefaces, what it’s for, any accessibility needs such as contrast level or colour-blind-safe status colours) in a single message, then write a small first draft into this design system’s files and offer once to take it further.';
  /** 「Build from connectors」放进输入框的话：连接器是这个会话的 agent 接着的 MCP 服务器。 */
  function ownerEmptySystemPrompt(path, action) {
    return 'I pressed ' + action + ' on this empty design system, ' + address(path)
      + ', and want to set it up with you. Read the design-system skill first (its SKILL.md and references, not any other file claiming to be them). Then check this session’s connectors (MCP servers) for one that holds my brand or design work — a design tool, a code repository, a drive or a wiki: if one is connected and on in this conversation, say which and offer to build the system from it, following the skill’s own instructions for that source where it has them; if one is connected but switched off here, tell me where to turn it on; if there is none, don’t assume I have one — instead ask me '
      + BRAND_STARTER_QUESTIONS;
  }
  /** 一张起步卡片点了以后放进输入框的话；上传卡片不发话，在原地打开上传面板。 */
  function welcomePrompt(option, path) {
    if (option === 'github') return githubStarterPrompt(path);
    if (option === 'connect') return ownerEmptySystemPrompt(path, WELCOME_OPTIONS[1].title);
    return null;
  }

  /* ---------- README：只认原版概览里会出现的几种块 ---------- */
  /** 把 Markdown 切成块：# / ## / ### 标题、- 列表、| 表格、其余按空行分段。 */
  function markdown(text) {
    const blocks = [];
    let para = [];
    const flush = () => { if (para.length) { blocks.push({type: 'p', text: para.join(' ')}); para = []; } };
    const lines = String(text || '').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const h = /^(#{1,3})\s+(.*)$/.exec(line);
      if (h) { flush(); blocks.push({type: 'h' + h[1].length, text: h[2].trim()}); continue; }
      if (/^\s*[-*]\s+/.test(line)) {
        flush();
        const items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, '').trim()); i++; }
        i--;
        blocks.push({type: 'ul', items});
        continue;
      }
      if (/^\s*\|/.test(line)) {
        flush();
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i]); i++; }
        i--;
        const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        const body = rows.filter(r => !/^\s*\|[\s:|-]+\|\s*$/.test(r)).map(cells);
        blocks.push({type: 'table', head: body[0] || [], rows: body.slice(1)});
        continue;
      }
      if (!line.trim()) { flush(); continue; }
      para.push(line.trim());
    }
    flush();
    return blocks;
  }
  /** 行内：`code` 与 **粗体**，其余是字。 */
  function inline(text) {
    const out = [];
    const re = /`([^`]+)`|\*\*([^*]+)\*\*/g;
    let at = 0;
    let m;
    const s = String(text || '');
    while ((m = re.exec(s))) {
      if (m.index > at) out.push({t: 'text', v: s.slice(at, m.index)});
      out.push(m[1] != null ? {t: 'code', v: m[1]} : {t: 'bold', v: m[2]});
      at = re.lastIndex;
    }
    if (at < s.length) out.push({t: 'text', v: s.slice(at)});
    return out;
  }

  /* ---------- 表里的读法 ---------- */
  /** 颜色 token `[name, light, dark?, usage?]`：值是别名 `{gray-25}` 或色值；深色与浅色写的一样时省掉（`inherited`，原版深色一栏用浅一档的字），第三项就是用法说明。 */
  const isColorValue = v => /^(\{[^{}]+\}|#[0-9a-f]{3,8})$/i.test(String(v || ''));
  function colorToken(row) {
    const hasDark = isColorValue(row[2]);
    return {name: row[0], light: row[1], dark: hasDark ? row[2] : row[1], inherited: !hasDark, usage: (hasDark ? row[3] : row[2]) || ''};
  }
  /** 别名指向谁：`{gray-25}` → gray-25；色值返回 null。 */
  const aliasOf = value => ((/^\{(.+)\}$/.exec(String(value || '')) || [])[1] || null);
  /** 一个颜色 token 在某个主题下最终落到哪个色阶 token（顺着别名走到写色值的那一个）；走不通返回 null。 */
  function resolveColor(system, name, theme) {
    const map = new Map();
    for (const g of system?.colors || []) for (const row of g.tokens) map.set(row[0], colorToken(row));
    let cur = name;
    for (let hop = 0; hop < 8 && map.has(cur); hop++) {
      const next = aliasOf(map.get(cur)[theme]);
      if (!next) return cur;
      cur = next;
    }
    return null;
  }
  const groupName = g => (g?.name ? g.name : 'Palette');

  /* 文字样式的规格（原版 TypeStyleSpecimen 的只读行）：「字体 · 字号/行高 · 字重名」 */
  const WEIGHTS = [[300, 'Light'], [330, 'Book'], [400, 'Regular'], [430, 'Text'], [500, 'Medium'], [600, 'Semibold'], [700, 'Bold'], [800, 'Heavy']];
  const weightLabel = w => (WEIGHTS.find(([n]) => n === Number(w)) || [null, String(w)])[1];
  const TYPE_SAMPLE = 'The quick brown fox jumps over the lazy dog';
  /** 字体栈里的第一个字体名（原版 firstCssFontFamily）：去掉引号。 */
  function firstFamily(stack) {
    const first = String(stack || '').split(',')[0].trim().replace(/^["']|["']$/g, '');
    return first || null;
  }
  /** 文字样式 `[name, fontSize, lineHeight, weight, sample?]` 的规格，`family` 是它所在组的字体键，`families` 是字体键到字体栈的表。 */
  function typeSpec(style, family, families) {
    const [, size, line, weight] = style;
    return `${firstFamily(families?.[family]) || family} · ${String(size).replace(/px$/, '')}/${line} · ${weightLabel(weight)}`;
  }

  /** 素材的类型（原版 assetKindLabel）与大小（formatInlineBudgetBytes）：「SVG · 402 B」。 */
  function fileType(name) {
    const m = /\.([a-z0-9]+)$/i.exec(String(name || ''));
    const ext = m ? m[1].toLowerCase() : '';
    if (/^(woff2?|ttf|otf)$/.test(ext)) return 'Font';
    if (ext === 'md') return 'Markdown';
    return ext ? ext.toUpperCase() : 'File';
  }
  function bytes(n) {
    if (!(n > 0)) return '';
    if (n >= 1048576) return (n / 1048576).toFixed(n >= 10 * 1048576 ? 0 : 1) + ' MB';
    if (n >= 1024) return Math.round(n / 1024) + ' KB';
    return n + ' B';
  }
  const fileMeta = (name, size) => [fileType(name), bytes(size)].filter(Boolean).join(' · ');

  /* ---------- 导航里的 Search（原版 SectionSearchField / SectionSearchStatus） ---------- */
  /** 能搜到的东西：每章一组，名字是 token、样式、组件与文件名，README 是它的标题。 */
  function searchIndex(system) {
    const out = [];
    const add = (section, label, detail) => out.push({section, label, detail});
    for (const b of markdown(system?.readme)) if (/^h\d$/.test(b.type)) add('readme', b.text);
    for (const g of system?.colors || []) for (const row of g.tokens) add('colors', row[0], groupName(g));
    for (const g of system?.type?.groups || []) for (const st of g.styles) add('type', st[0], g.name);
    for (const t of system?.spacing || []) add('spacing', t[0], t[1]);
    for (const t of system?.corners || []) add('corners', t[0], t[1]);
    for (const t of system?.shadows || []) add('shadows', t[0]);
    for (const f of system?.extras || []) for (const t of f.tokens) add(familyId(f.key), t[0], t[1]);
    for (const c of system?.components || []) add('components', c.name, c.group);
    for (const g of system?.assets || []) for (const [name] of g.files) add('assets', name, g.name);
    return out;
  }
  /** 按输入找：每章最多列 `limit` 条，章节按原版次序；空的输入返回 null（导航照常列章节）。 */
  function search(system, query, {limit = 5} = {}) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return null;
    const hits = searchIndex(system).filter(e => e.label.toLowerCase().includes(q));
    const rows = [...sections(system), ...tail(system)];
    const groups = rows.map(s => {
      const all = hits.filter(h => h.section === s.id);
      const named = s.label.toLowerCase().includes(q);
      return all.length || named ? {section: s.id, hits: all.slice(0, limit), more: Math.max(0, all.length - limit)} : null;
    }).filter(Boolean);
    const total = hits.length + groups.filter(g => !g.hits.length).length;
    const hidden = groups.reduce((n, g) => n + g.more, 0);
    return {groups, total, hidden};
  }
  /** 搜索下面那一行：没找到、或者只列了一部分时才看得见；其余只给读屏报数。 */
  function searchStatus(query, result) {
    if (!result) return {visible: false, text: ''};
    if (result.total === 0) return {visible: true, text: `No matches for “${String(query).trim()}”`};
    if (result.hidden > 0) return {visible: true, text: `Showing ${result.total - result.hidden} of ${result.total} matches. Keep typing to narrow it down.`};
    return {visible: false, text: `${result.total} ${result.total === 1 ? 'match' : 'matches'}`};
  }

  /** 滚动时亮哪一章：`tops` 是各章顶边在文档里的位置（按章节次序），`scrollTop` 是文档滚到哪。
      顶边进到视口上沿往下 `offset` 以内的最后一章是当前章；还没滚到第一章时是第一章；
      滚到底（`atEnd`）时是最后一章，免得最后几章太短、顶边永远到不了上沿而亮不起来。 */
  function activeSection(tops, scrollTop, {offset = 48, atEnd = false} = {}) {
    const list = (tops || []).filter(t => Number.isFinite(t.top));
    if (!list.length) return null;
    if (atEnd) return list[list.length - 1].id;
    let current = list[0].id;
    for (const t of list) if (t.top <= scrollTop + offset) current = t.id;
    return current;
  }

  /** 标题栏与 Space 上的副标题（BaoCut 界面，跟界面语言）：「设计系统 · 12 个组件」。 */
  function meta(system) {
    return ['设计系统', len(system?.components) ? `${system.components.length} 个组件` : null].filter(Boolean).join(' · ');
  }

  const root = typeof window !== 'undefined' ? window : globalThis;
  root.BC_HOME_DESIGN_SYSTEM = {CORE, CONTENT, FILES, familyId, isFamily, sections, tail, rowLabel, icon, count, isEmpty, isSectionEmpty,
    EMPTY_HINTS, NONE_YET, emptyHint, noneYet, sectionActions,
    STARTER_README, WELCOME_TITLE, WELCOME_OPTIONS, BRAND_UPLOAD_TEXT, REQUEST_IN_COMPOSER,
    systemPath, address, githubStarterPrompt, ownerEmptySystemPrompt, welcomePrompt,
    markdown, inline, isColorValue, colorToken, aliasOf, resolveColor, groupName, weightLabel, TYPE_SAMPLE, firstFamily, typeSpec, fileType, bytes, fileMeta,
    searchIndex, search, searchStatus, activeSection, meta};
})();

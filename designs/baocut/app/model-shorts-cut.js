/* 剪成短视频（§5.10）纯模型：人给的参数、句子边界上的起止、候选的提醒、来源关系、
   子视频的剪口种子与它在文稿里的折叠。不碰 DOM，不依赖 React；node --test 直接 require。

   三个词：
   - 句（sentence）：文稿里的一句，带起止时间。候选的起止只落在句子边界上。
     原型里一条 cue 就是一句；真产品用 transcript 的 Sentence 投影。
   - 候选（candidate）：`{id, from, to, start, end, title, reason, on, weak, loose, removed, focusX, redoOf}`，
     `from` / `to` 是句子下标（含两端），`start` / `end` 是原片时钟上的秒。
   - 子视频（child）：切出的一支。它和来源视频共用同一份 clips 与文稿（product-design §5.10 / §4.6：
     二次编辑就是普通的视频编辑），`origin {project, in, out, dur}` 记出身，`cuts` 是它自己的剪口表
     （model-cut.js 的形状）：切出时是 `[0, in)` 与 `[out, dur)` 两条「片段外」，之后在文稿里恢复 / 再剪都只改这张表。
     现在用到原片的哪几段（`usedRanges`）从剪口派生，不另存。

   长度一律用秒，不数字数：哪种语言的文稿都是同一条规则。 */
(function () {
  const COUNT = {min: 1, max: 10, def: 3};
  /* §5.10：找到就创建，要几支就是几支，不多找备选；时长不设上限，平台时长只在导出前检查里说。 */
  /** 候选与某支短视频用到的原片区间重叠超过这个比例，算「已切过」。 */
  const DONE_RATIO = 0.5;

  const LENGTHS = [
    {id: 'short', min: 15, max: 30, name: '15–30 秒'},
    {id: 'mid', min: 30, max: 60, name: '30–60 秒'},
    {id: 'long', min: 60, max: 90, name: '60–90 秒'},
    {id: 'xl', min: 60, max: 180, name: '1–3 分钟'},
    {id: 'custom', min: 30, max: 60, name: '自定义'},
  ];
  /** 自定义时长的上下界（秒）。 */
  const CUSTOM = {min: 1, max: 600};
  /** 画幅：保留原画幅时不取景。 */
  const RATIOS = [
    {id: '9:16', name: '9:16', value: 9 / 16},
    {id: '1:1', name: '1:1', value: 1},
    {id: 'source', name: '保留原画幅', value: null},
  ];
  /* 「跟着说话的人」这一版不开放：还没有人物与发言人模型（§5.10），选项留着、置灰并说明。 */
  const FOCUS = [
    {id: 'speaker', name: '跟着说话的人', desc: '谁说话框跟谁', off: '这一版还没有人物与发言人模型'},
    {id: 'center', name: '居中', desc: '裁画面正中'},
    {id: 'manual', name: '我自己定', desc: '在结果页的原片上拖取景框，每支定一个位置'},
  ];
  const TRACKS = [
    {id: 'both', name: '原文 + 译文'},
    {id: 'orig', name: '只要原文'},
    {id: 'trans', name: '只要译文'},
  ];
  const STYLES = [
    {id: 'shorts', name: '短视频字幕', desc: '内置预设，避开平台按钮'},
    {id: 'project', name: '沿用这部视频的样式', desc: '字号和位置照搬，可能被平台按钮挡住'},
  ];
  const DEFAULTS = {count: COUNT.def, length: 'mid', lenMin: 30, lenMax: 60, ratio: '9:16', focus: 'center',
    tracks: 'both', style: 'shorts', scope: 'all', skipDone: true, hook: true, crossChapter: false};
  /** 一条进度走完：找片段 → 创建视频（BC_TASK_FACTS.SHORTS_CUT_STAGE 的 find / create）。 */
  const FIND_STAGES = ['读文稿', '找片段', '核对起止'];
  const CREATE_STAGES = ['创建视频', '套字幕样式', '取景'];

  const lengthOf = (id) => LENGTHS.find((l) => l.id === id) || LENGTHS[1];
  const focusOf = (id) => FOCUS.find((f) => f.id === id) || FOCUS[1];
  const ratioOf = (id) => RATIOS.find((r) => r.id === id) || RATIOS[0];
  const clampSec = (n, d) => (Number.isFinite(+n) && n !== '' && n != null ? Math.max(CUSTOM.min, Math.min(CUSTOM.max, Math.round(+n))) : d);
  /** 这次要的时长区间（秒）：预设一档，或自定义的两头（1–600 秒，下限小于上限）。 */
  function lengthRange(params) {
    const p = Object.assign({}, DEFAULTS, params);
    const l = lengthOf(p.length);
    if (l.id !== 'custom') return {id: l.id, min: l.min, max: l.max, name: l.name};
    let a = clampSec(p.lenMin, DEFAULTS.lenMin), b = clampSec(p.lenMax, DEFAULTS.lenMax);
    if (a > b) { const t = a; a = b; b = t; }
    if (a === b) { if (b < CUSTOM.max) b += 1; else a -= 1; }
    return {id: 'custom', min: a, max: b, name: `${a}–${b} 秒`};
  }
  const clampCount = (n) => (Number.isFinite(+n) && n !== '' && n != null
    ? Math.max(COUNT.min, Math.min(COUNT.max, Math.round(+n))) : COUNT.def);

  /** 参数落到这个项目上：没有译文就只有原文；原片本来就是竖屏就不用取景。
      「跟着说话的人」这一版不开放，带进来的一律落回居中。 */
  function normalize(params, ctx) {
    const c = ctx || {};
    const p = Object.assign({}, DEFAULTS, params);
    p.count = clampCount(p.count);
    p.length = lengthOf(p.length).id;
    if (p.length === 'custom') { const r = lengthRange(p); p.lenMin = r.min; p.lenMax = r.max; }
    p.ratio = ratioOf(p.ratio).id;
    if (!c.hasTrans) p.tracks = 'orig';
    else if (!TRACKS.some((t) => t.id === p.tracks)) p.tracks = 'both';
    if (c.portrait) p.focus = 'center';
    else if (!FOCUS.some((f) => f.id === p.focus && !f.off)) p.focus = DEFAULTS.focus;
    if (!c.children) p.skipDone = DEFAULTS.skipDone;
    return p;
  }

  /* ---------- 时间 ---------- */
  function mmss(t) {
    const s = Math.max(0, Math.round(t || 0));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  const secs = (t) => Math.max(0, Math.round(t || 0)) + ' 秒';
  const spanText = (a) => `${mmss(a.start)} – ${mmss(a.end)} · ${secs(a.end - a.start)}`;
  const overlapSec = (a, b) => Math.max(0, Math.min(a.end, b.end) - Math.max(a.start, b.start));

  /* ---------- 句子边界 ---------- */
  const EPS = 0.02;
  function nearest(list, t, key) {
    let best = 0, d = Infinity;
    list.forEach((s, i) => { const x = Math.abs(s[key] - t); if (x < d) { d = x; best = i; } });
    return best;
  }
  /** 压在 t 上的那一句；t 在两句之间或片尾之外时取最近的。 */
  function indexAt(sentences, t) {
    const i = sentences.findIndex((s) => t >= s.start - EPS && t < s.end - EPS);
    if (i >= 0) return i;
    return t < (sentences[0] || {start: 0}).start ? 0 : nearest(sentences, t, 'end');
  }
  function rangeOf(sentences, from, to) {
    const n = sentences.length;
    const a = Math.max(0, Math.min(n - 1, from));
    const b = Math.max(a, Math.min(n - 1, to));
    return {from: a, to: b, start: sentences[a].start, end: sentences[b].end};
  }
  /** 模型给的时间吸附到最近的句首 / 句尾；起点不会落到终点之后。 */
  function snap(sentences, start, end) {
    const from = nearest(sentences, start, 'start');
    const to = Math.max(from, nearest(sentences, end, 'end'));
    return rangeOf(sentences, from, to);
  }
  /* ---------- 来源关系 ---------- */
  const isChild = (p) => !!(p && p.origin && p.origin.project);
  /** 父 → 子是反查出来的（裁决点 A）：来源项目自己不记。 */
  function childrenOf(projects, id) {
    return (projects || []).filter((p) => isChild(p) && p.origin.project === id && !p.archived)
      .sort((a, b) => a.origin.in - b.origin.in);
  }
  /** 剪成短视频的会话挂在哪个项目上：子视频回到它的来源视频（结果页属于那一轮会话，§5.10）。 */
  const hostId = (proj) => (isChild(proj) ? proj.origin.project : proj ? proj.id : null);
  const parentOf = (projects, proj) => (isChild(proj) ? (projects || []).find((p) => p.id === proj.origin.project) || null : null);

  /* ---------- 子视频的剪口（product-design §5.10 / §4.6） ---------- */
  /** 片段外两条剪口：`[0, in)` 与 `[out, dur)`，Agent 切出时写下、已生效。空的一头不写。 */
  function seedCuts(origin) {
    const o = origin || {};
    const dur = o.dur > 0 ? o.dur : o.out;
    const out = [];
    if (o.in > EPS) out.push({id: 'outside-head', start: 0, end: +(+o.in).toFixed(3), kind: 'outside', state: 'cut', by: 'agent', text: ''});
    if (dur - o.out > EPS) out.push({id: 'outside-tail', start: +(+o.out).toFixed(3), end: +(+dur).toFixed(3), kind: 'outside', state: 'cut', by: 'agent', text: ''});
    return out;
  }
  /** 这一支的剪口表：记录里有就用记录（恢复 / 再剪写回过），没有就按出身播种。 */
  const cutsOf = (proj) => (isChild(proj) ? (Array.isArray(proj.cuts) ? proj.cuts : seedCuts(proj.origin)) : []);
  /** 原片时钟的总长：出身里记着；老记录没有就退到片段终点。 */
  const sourceDur = (proj) => (isChild(proj) ? (proj.origin.dur > 0 ? proj.origin.dur : proj.origin.out) : 0);
  /** `[0, dur]` 里扣掉已生效的剪口后留下的几段。原型的 clips 首尾相接、src 与时间轴同钟，
      所以这就是 `BC_CUT.compose(clips, cuts)` 在原片时钟上的样子。 */
  function keptRanges(cuts, dur) {
    const act = (cuts || []).filter((c) => c && c.state === 'cut' && c.end - c.start > EPS)
      .slice().sort((a, b) => a.start - b.start);
    const out = [];
    let a = 0;
    act.forEach((c) => {
      if (c.end <= a + EPS) return;
      if (c.start > a + EPS) out.push({start: +a.toFixed(3), end: +Math.min(c.start, dur).toFixed(3)});
      a = Math.max(a, c.end);
    });
    if (a < dur - EPS) out.push({start: +a.toFixed(3), end: +(+dur).toFixed(3)});
    return out.filter((r) => r.end - r.start > EPS);
  }
  /** 这一支现在用到的原片区间：由剪口派生。 */
  const usedRanges = (proj) => (isChild(proj) ? keptRanges(cutsOf(proj), sourceDur(proj)) : []);
  /** 点一句划掉的话恢复：这一句连同它和片段之间的几句一起放回，片段保持连着。
      在片段前面 → `[这一句起, 片段起点)`；在后面 → `[片段终点, 这一句止)`；落在片段中间的缝里只放回这一句。 */
  function reclaimSpan(kept, sentence) {
    if (!sentence) return null;
    const k = kept || [];
    if (!k.length) return {start: sentence.start, end: sentence.end};
    const first = k[0], last = k[k.length - 1];
    if (sentence.end <= first.start + EPS) return {start: sentence.start, end: first.start};
    if (sentence.start >= last.end - EPS) return {start: last.end, end: sentence.end};
    return {start: sentence.start, end: sentence.end};
  }

  /* ---------- 子视频的文稿：片段外的话划掉，远的收成一行（product-design §5.10） ----------
     片段两端各留 NEAR 句划掉、可点恢复；再远的连成一条剪缝「前面 N 分 M 秒已剪掉」。剪缝只能展开、不能整条恢复——
     片段外整条放回就等于把这一支变回整部原片；要放回哪句就点哪句（从那句到片段边缘）。
     展开分批：每次铺出靠近片段的 STEP 句，再点「继续展开」，两小时的原片也不会一下铺成一面墙。
     单位是句不是段：一段最多 4 句，按段折会多露或少露；被拆开的段出一个只含那几句的局部段。 */
  const NEAR = 3;
  const STEP = 10;
  /** 时长念成「1 分 12 秒」/「45 秒」。 */
  function durText(sec) {
    const s = Math.max(0, Math.round(sec || 0));
    const m = Math.floor(s / 60), r = s % 60;
    return m ? (r ? `${m} 分 ${r} 秒` : `${m} 分`) : `${r} 秒`;
  }
  /** `paras`：按时间排好的段（`{id, cueIds, …}`）；`cueOf(id)` 给句的起止；`kept` 是留下的几段；
      `o = {near, step, shown}`，`shown` 是 Map：剪缝 id → 已经铺出来的句数。返回行：
        `{kind: 'para', para, part}`——`part` 为真时 `para` 是只含其中几句的局部段（id 带 `:` 后缀）；
        `{kind: 'fold', id, side, start, end, secs, count, total, shown, next, open, text}`——side 是 before / after / between；
        start / end / count 是还收着的那截，next 是下一批铺几句。
      铺出来的句子贴着片段那一侧：前面的缝在缝下面铺（离片段最近的先出），后面与中间的缝在缝上面铺。
      剪缝 id 取整截的第一句，展开多少都不变。 */
  function foldRows(paras, cueOf, kept, o) {
    const opt = o || {};
    const near = opt.near == null ? NEAR : opt.near;
    const step = opt.step == null ? STEP : opt.step;
    const shown = opt.shown || new Map();
    const units = [];
    (paras || []).forEach((p) => (p.cueIds || []).forEach((id) => {
      const c = cueOf(id);
      if (c) units.push({para: p, id, start: c.start, end: c.end, keep: (kept || []).some((r) => overlapSec(c, r) > EPS)});
    }));
    const keepIdx = [];
    units.forEach((u, i) => { if (u.keep) keepIdx.push(i); });
    const far = units.map((u, i) => !u.keep && !keepIdx.some((k) => Math.abs(k - i) <= near));
    const rows = [];
    let cur = null;
    const flush = () => { if (cur) { rows.push(cur); cur = null; } };
    const push = (u) => {
      if (cur && cur.para.id === u.para.id) { cur.ids.push(u.id); cur.end = u.end; return; }
      flush();
      cur = {kind: 'para', para: u.para, ids: [u.id], start: u.start, end: u.end};
    };
    for (let i = 0; i < units.length;) {
      if (!far[i]) { push(units[i]); i += 1; continue; }
      let j = i;
      while (j < units.length && far[j]) j += 1;
      const run = units.slice(i, j);
      const side = !keepIdx.length || i > keepIdx[keepIdx.length - 1] ? 'after' : j <= keepIdx[0] ? 'before' : 'between';
      const id = 'fold-' + run[0].id;
      const n = Math.max(0, Math.min(shown.get(id) || 0, run.length));
      const before = side === 'before';
      const out = before ? run.slice(run.length - n) : run.slice(0, n);
      const hid = before ? run.slice(0, run.length - n) : run.slice(n);
      const span = hid.length ? hid : run;
      const start = span[0].start, end = span[span.length - 1].end;
      const lead = before ? '前面' : side === 'after' ? '后面' : '中间';
      const fold = {kind: 'fold', id, side, start, end, secs: end - start, count: hid.length, total: run.length, shown: n,
        next: Math.min(step, hid.length), open: n > 0,
        text: hid.length ? `${lead} ${durText(end - start)}已剪掉` : `${lead}划掉的 ${run.length} 句都展开了`};
      if (before) { flush(); rows.push(fold); out.forEach(push); }
      else { out.forEach(push); flush(); rows.push(fold); }
      i = j;
    }
    flush();
    return rows.map((r) => {
      if (r.kind !== 'para') return r;
      const whole = r.ids.length === (r.para.cueIds || []).length;
      const para = whole ? r.para : Object.assign({}, r.para, {id: r.para.id + ':' + r.ids[0], cueIds: r.ids, start: r.start, end: r.end});
      return {kind: 'para', para, part: !whole};
    });
  }
  /** 文稿段头的时码（§5.10）：和时间轴同一个时钟。原片上 `[start, end)` 这一段里第一处留下的地方，
      换算成这一支的时间（从 0 起，剪掉的不占时间）；整段都在片段外返回 null（段头灰着标原片时钟）。 */
  function clipTime(kept, start, end) {
    const e = end == null ? start + EPS * 2 : end;
    let acc = 0;
    for (const r of kept || []) {
      if (r.end > start + EPS && r.start < e - EPS) return +(acc + Math.max(0, start - r.start)).toFixed(3);
      acc += r.end - r.start;
    }
    return null;
  }

  /* ---------- 取景：子视频画布上那件原片视频的摆位（product-design §5.10「画面怎么取景」） ----------
     不另造取景控件：取景就是画布上视频元素的 `place`（stage-objects.jsx 的八把手、角上缩放与拖动）。
     裁成别的画幅时先铺满画面、横向让原片上的 `focusX` 对着正中；之后要挪就在画布上拖那件视频。 */
  /** 原片画幅 `srcRatio`（宽 / 高）按 contain 放进 `outRatio` 的画布后，铺满要放大多少倍。 */
  function coverScale(srcRatio, outRatio) {
    const r = srcRatio > 0 ? srcRatio : 16 / 9, o = outRatio > 0 ? outRatio : 9 / 16;
    return +(r >= o ? r / o : o / r).toFixed(4);
  }
  /** 视频元素的 place：保留原画幅（或没有 `cut`）时原样；否则铺满，`focusX`（0–1，缺省正中）对着画面正中，夹住不露边。 */
  function framePlace(cut, srcRatio, outRatio, base) {
    const b = Object.assign({x: 50, y: 50, w: 100, h: 100, scale: 1}, base);
    if (!cut || cut.ratio === 'source') return b;
    const r = srcRatio > 0 ? srcRatio : 16 / 9, o = outRatio > 0 ? outRatio : 9 / 16;
    if (Math.abs(r - o) < 0.01) return b;
    const scale = coverScale(r, o);
    const fx = cut.focusX == null ? 0.5 : Math.max(0, Math.min(1, +cut.focusX));
    const span = 100 * scale, room = (span - 100) / 2;
    const x = r > o ? Math.max(50 - room, Math.min(50 + room, 50 - (fx - 0.5) * span)) : 50;
    return Object.assign(b, {scale, x: +x.toFixed(2)});
  }
  /** 取景念成一句（结果页卡上那一行）。 */
  function focusText(x) {
    if (x == null) return '居中';
    const d = Math.round((x - 0.5) * 100);
    return d === 0 ? '居中' : d < 0 ? `偏左 ${-d}%` : `偏右 ${d}%`;
  }
  /** 项目卡 / 行上的来源徽标。 */
  function originLabel(projects, proj) {
    if (!isChild(proj)) return null;
    const parent = parentOf(projects, proj);
    const span = `${mmss(proj.origin.in)} – ${mmss(proj.origin.out)}`;
    return parent
      ? {missing: false, parent, text: `来自「${parent.title}」· ${span}`, short: `来自「${parent.title}」`}
      : {missing: true, parent: null, text: '来源视频已不在视频库', short: '来源视频已不在视频库'};
  }
  const countLabel = (n) => `${n} 支短视频`;
  /** 候选被哪一支短视频切过（重叠超过候选时长的一半）。 */
  function doneBy(seg, children) {
    const dur = seg.end - seg.start;
    if (!(dur > 0)) return null;
    return (children || []).find((c) => usedRanges(c).reduce((n, r) => n + overlapSec(seg, r), 0) > dur * DONE_RATIO) || null;
  }
  /** 删除来源项目时确认框里多的那一句。 */
  const deleteNote = (n) => (n > 0
    ? `它切出的 ${n} 支短视频不受影响，仍可打开和导出，只是不能再从原片添加片段。` : '');

  /* ---------- 候选的提醒 ---------- */
  /** 固定次序：已切过 → 比要的长 / 短 → 重叠 → 要靠前文 → 译文 → 落在句中。平台时长不在这里说（§6.9 导出前检查）。
      `ctx`：`{params, list（这一轮的几支，按原片先后）, children（之前切过的，不含这一轮）, sentences}`。 */
  function flags(seg, ctx) {
    const c = ctx || {};
    const p = c.params || DEFAULTS;
    const len = lengthRange(p);
    const dur = seg.end - seg.start;
    const out = [];
    /* 重做的是哪一支写在「为什么挑它」那一行，小牌只说后果（小牌不折行，写不下标题） */
    if (seg.redoOf) out.push({k: 'redo', tone: 'accent', text: '重做 · 另建一支，原来那支不动'});
    const done = doneBy(seg, (c.children || []).filter((k) => k.id !== seg.redoOf));
    if (done) out.push({k: 'done', tone: 'notice', text: `已切过 · 「${done.title}」`});
    if (Math.round(dur - len.max) >= 1) out.push({k: 'long', tone: 'neutral', text: `比你要的长 ${Math.round(dur - len.max)} 秒`});
    else if (Math.round(len.min - dur) >= 1) out.push({k: 'short', tone: 'neutral', text: `比你要的短 ${Math.round(len.min - dur)} 秒`});
    const list = (c.list || []).filter((x) => !x.removed);
    list.forEach((x, i) => {
      if (x.id === seg.id || x.on === false) return;
      const o = Math.round(overlapSec(seg, x));
      if (o >= 1) out.push({k: 'overlap', tone: 'notice', text: `和第 ${i + 1} 支重叠 ${o} 秒`});
    });
    if (seg.weak) out.push({k: 'context', tone: 'neutral', text: '要靠前文才听得懂'});
    if (p.tracks !== 'orig' && c.sentences
      && c.sentences.slice(seg.from, seg.to + 1).some((s) => !s.trans)) out.push({k: 'untranslated', tone: 'notice', text: '这几句还没有译文'});
    if (seg.loose && seg.loose.start) out.push({k: 'mid-start', tone: 'notice', text: '起点落在一句话中间'});
    if (seg.loose && seg.loose.end) out.push({k: 'mid-end', tone: 'notice', text: '终点落在一句话中间'});
    return out;
  }

  /* ---------- 候选列表 ---------- */
  const byTime = (list) => list.slice().sort((a, b) => a.start - b.start || a.end - b.end);
  const visible = (list) => byTime((list || []).filter((c) => !c.removed));
  const chosen = (list) => visible(list).filter((c) => c.on !== false);
  const totalSec = (list) => chosen(list).reduce((n, c) => n + (c.end - c.start), 0);
  /** 结果页顶上那一句。 */
  const resultHead = (list) => `已创建 ${visible(list).length} 支 · 合计 ${mmss(totalSec(list))}`;
  const hookOf = (sentences, seg) => (sentences[seg.from] || {}).text || '';
  const tailOf = (sentences, seg) => (sentences[seg.to] || {}).text || '';
  /** 按把握的先后取够要的条数：先跳过要靠前文的、已切过的、和已取的重叠的；不够再按次序补（仍不重叠）。 */
  function preselect(list, count, children) {
    const on = [];
    list.forEach((c) => {
      if (on.length < count && !c.weak && !doneBy(c, children) && !on.some((x) => overlapSec(x, c) >= 1)) on.push(c);
    });
    list.forEach((c) => { if (on.length < count && on.indexOf(c) < 0 && !on.some((x) => overlapSec(x, c) >= 1)) on.push(c); });
    return on.map((c) => Object.assign({}, c, {on: true}));
  }

  /* 演示的候选：起点是句子下标，`n` 是「30–60 秒」那一档下的句数，别的档按比例伸缩。
     次序就是把握的先后。真产品里这张表由模型或 Agent 给出，这里只为原型可复现。 */
  const DEMO = [
    {k: 'a', at: 4, n: 10, title: '为什么要把视频工具做在本机', reason: '以一个问题开头，三句之内给出回答'},
    {k: 'c', at: 26, n: 10, title: '上传本身就是一个决定', reason: '开头一句就是结论，后面是理由'},
    {k: 'd', at: 37, n: 12, title: '字幕为什么是单独的一层', reason: '一个观点讲完整，中间有一句可以单独引用'},
    {k: 'f', at: 17, n: 9, title: '词是真相，句子只是投影', reason: '开头一句就能单独引用'},
    {k: 'b', at: 11, n: 12, title: '渲染最难的是确定性', reason: '有例子，结尾落在一句结论上'},
    {k: 'e', at: 50, n: 11, title: '每个小改动都要三次签字', reason: '有故事，但开头那句在接前面的话', weak: true},
    {k: 'g', at: 56, n: 6, title: '像是把编译器那套搬过来了', reason: '一问一答，收得干净'},
  ];
  function demoPool(sentences, params, scope) {
    const p = Object.assign({}, DEFAULTS, params);
    const r = lengthRange(p);
    const k = (r.min + r.max) / 2 / 45;
    const lo = scope ? scope.start : -Infinity, hi = scope ? scope.end : Infinity;
    return DEMO.filter((d) => d.at < sentences.length && sentences[d.at].start >= lo - EPS && sentences[d.at].start < hi - EPS)
      .map((d) => {
        let to = Math.min(sentences.length - 1, d.at + Math.max(2, Math.round(d.n * k)) - 1);
        if (scope && !p.crossChapter) while (to > d.at && sentences[to].end > hi + EPS) to--;
        return Object.assign({id: 'sc-' + d.k, title: d.title, reason: d.reason, weak: !!d.weak, on: false}, rangeOf(sentences, d.at, to));
      });
  }
  /** 找到的就是要创建的：要 n 支给 n 段（范围里不够就少给）；开着「已经切过的不再找」时切过的不进来。 */
  function demoCandidates(sentences, params, o) {
    const c = o || {};
    const p = Object.assign({}, DEFAULTS, params);
    const pool = demoPool(sentences, p, c.scope).filter((x) => !(p.skipDone && doneBy(x, c.children)));
    return byTime(preselect(pool, clampCount(p.count), c.children));
  }
  /** 自己加一段：有选区用选区（不吸附，落在句中的带提醒），没有就从播放头那一句起凑到这一档的中间长度。 */
  function manualCandidate(sentences, o) {
    const id = o.id || 'sc-m' + Math.round((o.t || (o.range && o.range.start) || 0) * 100);
    if (o.range && o.range.end > o.range.start) {
      const from = indexAt(sentences, o.range.start), to = Math.max(from, indexAt(sentences, o.range.end - EPS * 2));
      const loose = {start: Math.abs(sentences[from].start - o.range.start) > EPS, end: Math.abs(sentences[to].end - o.range.end) > EPS};
      return {id, from, to, start: o.range.start, end: o.range.end, loose,
        title: o.title || hookOf(sentences, {from}), reason: '你自己选的区间', on: true, added: 'manual'};
    }
    const len = lengthRange(o.params || DEFAULTS);
    const from = indexAt(sentences, o.t || 0);
    let to = from;
    while (to < sentences.length - 1 && sentences[to].end - sentences[from].start < (len.min + len.max) / 2) to++;
    return Object.assign({id, title: o.title || hookOf(sentences, {from}), reason: '你自己加的，从播放头那一句起', on: true, added: 'manual'},
      rangeOf(sentences, from, to));
  }

  /* ---------- 创建 ---------- */
  function childTitle(title, taken) {
    const base = String(title || '').trim() || '未命名短视频';
    const used = new Set(taken || []);
    if (!used.has(base)) return base;
    let i = 2;
    while (used.has(`${base} ${i}`)) i++;
    return `${base} ${i}`;
  }
  /** 子视频的记录：引用来源视频的同一份原片与文稿，只记出身和自己的剪口，不复制视频（product-design §5.10 / §4.6）。
      和来源视频放在同一个项目目录下、各占一个以标题命名的视频文件夹（并排，不嵌套）；
      `session` / `messageId` 让创建它的那条会话里出现这支视频的卡片（BC_AGENT_PROJECTS.sessionArtifacts）。
      `o.dur` 是来源视频的时长（片段外尾巴那条剪口的终点），缺省用来源记录上的 `duration`。 */
  function childProject(o) {
    const parent = o.parent, seg = o.seg, p = Object.assign({}, DEFAULTS, o.params);
    const source = ratioOf(p.ratio).id === 'source';
    const dur = o.dur > 0 ? o.dur : (parent.duration > 0 ? parent.duration : seg.end);
    const origin = {project: parent.id, in: seg.start, out: seg.end, dur};
    return {
      id: o.id, title: o.title, status: 'complete', entry: parent.entry || 'trans', bare: true,
      delivery: 'shorts', ratio: source ? (parent.ratio || '16:9') : ratioOf(p.ratio).id,
      dir: parent.dir || null, folder: o.title,
      session: o.session || null, messageId: o.messageId || null,
      origin, cuts: seedCuts(origin),
      cut: {focus: source ? null : p.focus, focusX: seg.focusX == null ? null : seg.focusX, tracks: p.tracks, style: p.style, ratio: ratioOf(p.ratio).id},
      src: Object.assign({}, parent.src),
      duration: +(seg.end - seg.start).toFixed(2), lang: parent.lang, model: parent.model,
      modified: '刚刚', mtime: 0, otime: 0, ctime: 0, hue: parent.hue,
      desc: `从「${parent.title}」切出的短视频，${mmss(seg.start)} – ${mmss(seg.end)}。`,
      content: {}, meta: {speakers: o.speakers || 1, chapters: 1, cues: seg.to - seg.from + 1},
    };
  }

  /* ---------- 文案 ---------- */
  /** 画幅与取景念成一句：保留原画幅时不说取景。 */
  function frameLine(params) {
    const p = Object.assign({}, DEFAULTS, params);
    const r = ratioOf(p.ratio);
    return r.id === 'source' ? '保留原画幅' : `${r.name} · ${focusOf(p.focus).name}`;
  }
  function summaryLine(params) {
    const p = Object.assign({}, DEFAULTS, params);
    return [`${p.count} 支`, `每支 ${lengthRange(p).name}`, frameLine(p)].join(' · ');
  }
  /** 提示词模板里那一行可删的话：删掉就等于「先列出来等我挑」（这一版不做那条分支）。 */
  const DIRECT_LINE = '找好就直接创建成视频，不用先问我';
  /** 交给 Agent 时接在意图后面的几句（BC_AIPROMPT.template 的 extra，一行一句）。 */
  function agentExtra(params, o) {
    const c = o || {};
    const p = Object.assign({}, DEFAULTS, params);
    const len = lengthRange(p);
    const r = ratioOf(p.ratio);
    const out = [`要 ${p.count} 支，每支 ${len.min}–${len.max} 秒，起止落在句子边界上`];
    out.push(r.id === 'source' ? '画幅：保留原画幅，不裁' : `画幅 ${r.name}，取景${focusOf(p.focus).name}`);
    out.push(`字幕：${tracksOf(p.tracks).name}，${(STYLES.find((x) => x.id === p.style) || STYLES[0]).name}`);
    if (c.scopeName) out.push(`只在「${c.scopeName}」里找`);
    if (p.hook) out.push('每段从一句能单独成立的话起');
    if (c.children && p.skipDone) out.push(`已经切过的 ${c.children} 支不用再找`);
    out.push(DIRECT_LINE);
    return out;
  }
  const taskTitle = (title) => `剪成短视频 · ${title}`;
  function stageAt(stages, pct) {
    return Math.min(stages.length - 1, Math.floor((Math.max(0, Math.min(99.9, pct)) / 100) * stages.length));
  }
  /** AI 工具列表里那张卡的副题：setup → running → result 三段。 */
  function listStatus(s, fallback, children) {
    const tail = children ? ` · 已有 ${children} 支` : '';
    if (!s || s.phase === 'setup') return fallback + tail;
    if (s.phase === 'running') return `${s.stage === 'create' ? '正在创建视频' : '正在找片段'} · ${Math.round(s.pct || 0)}%`;
    if (s.phase === 'result') return `已创建 ${visible(s.list).length} 支`;
    return fallback + tail;
  }

  /** 短视频项目打开时画面上的字幕轨：创建时选了哪几轨就留哪几轨；选了「短视频字幕」就按平台安全区落位。
      `layout` 是绑好画幅的 `BC_SHORTS.captionLayout`（轨 → {id: 几何}），与发布前检查同一份几何。
      没有 `cut`（不是从这里切出来的项目）原样返回。 */
  function openTracks(cut, tracks, layout) {
    const list = tracks || [];
    if (!cut) return list;
    const kept = list.filter((t) => (cut.tracks === 'orig' ? t.role === 'source' : cut.tracks === 'trans' ? t.role !== 'source' : true));
    if (cut.style !== 'shorts' || !layout) return kept;
    const geo = layout(kept) || {};
    return kept.map((t) => (geo[t.id] ? Object.assign({}, t, geo[t.id]) : t));
  }

  /* ---------- 来源项目视频 Tab 里「切出的短视频」那一组 ----------
     来源项目自己不记切出过什么（裁决点 A），这一组是从项目库反查出来的，按在原片里的先后排。 */
  const MADE_ROW_H = 64;
  /** 组里一次最多露出几行，多的在组里滚。 */
  const MADE_SHOWN = 4;
  const tracksOf = (id) => TRACKS.find((t) => t.id === id) || TRACKS[0];
  /** 原片条上的色块：百分比。 */
  function bar(ranges, dur) {
    return (ranges || []).map((r) => ({
      left: +(Math.max(0, r.start) / dur * 100).toFixed(3),
      width: +((Math.max(0, Math.min(dur, r.end) - Math.max(0, r.start))) / dur * 100).toFixed(3),
    }));
  }
  /** 定高行的虚拟化窗口：只取看得见的行，上下各多带 4 行。 */
  function rowWindow(count, top, height, rowH) {
    const h = rowH > 0 ? rowH : MADE_ROW_H;
    const n = Math.max(0, Math.floor(count || 0));
    const t = Math.max(0, top || 0);
    const start = Math.min(n, Math.max(0, Math.floor(t / h) - 4));
    const end = Math.min(n, Math.max(start, Math.ceil((t + Math.max(0, height || 0)) / h) + 4));
    return {start, end, height: n * h};
  }
  /** 这一支切出之后动过没有：剪口留下的现状和切出时的那一段不是一回事。 */
  function editedSince(proj) {
    if (!isChild(proj)) return false;
    const r = usedRanges(proj);
    return r.length !== 1 || Math.abs(r[0].start - proj.origin.in) > EPS || Math.abs(r[0].end - proj.origin.out) > EPS;
  }
  /** 创建时的选择念成一句：取景 · 字幕轨。没有记录（老项目）给空串。 */
  function cutLine(cut) {
    if (!cut) return '';
    const frame = cut.ratio === 'source' ? '保留原画幅' : focusOf(cut.focus).name;
    return [frame, tracksOf(cut.tracks).name].join(' · ');
  }
  /** 组头：几支、合计多长（按现状）。 */
  function madeHead(children) {
    const list = children || [];
    const total = list.reduce((n, k) => n + usedRanges(k).reduce((a, r) => a + (r.end - r.start), 0), 0);
    return {count: list.length, total, text: `${list.length} 支 · 合计 ${mmss(total)}`};
  }
  /** 一支一行：标题、现在用到原片的哪一段、多长、创建时的选择、剪过没有。 */
  function madeRows(children) {
    return (children || []).map((k, i) => {
      const used = usedRanges(k);
      const len = used.reduce((a, r) => a + (r.end - r.start), 0);
      const edited = editedSince(k);
      return {
        id: k.id, n: i + 1, title: k.title, at: k.origin.in, hue: k.hue,
        span: used.length === 1 ? `${mmss(used[0].start)} – ${mmss(used[0].end)}` : `${used.length} 段 · 从 ${mmss(used[0].start)} 起`,
        len: secs(len), edited, cut: cutLine(k.cut), modified: k.modified || '',
      };
    });
  }
  /** 组里那条原片条：每一支用到的区间各一块，带着是哪一支（悬停一行时点亮它的那几块）。 */
  function madeBar(children, dur) {
    const out = [];
    if (!(dur > 0)) return out;
    (children || []).forEach((k) => bar(usedRanges(k), dur).forEach((b) => out.push(Object.assign({id: k.id}, b))));
    return out;
  }
  /** 重做出来的那一支叫什么：原来的标题后面接「第 N 版」，从 2 数起；原来就是某一版的，接着往下数。 */
  function redoTitle(title, taken) {
    const base = String(title || '').trim().replace(/ · 第 \d+ 版$/, '') || '未命名短视频';
    const used = new Set(taken || []);
    let n = 2;
    while (used.has(`${base} · 第 ${n} 版`)) n++;
    return `${base} · 第 ${n} 版`;
  }
  /** 「调整后再生成」直接另建的那一支用哪一段：现状是连着的一段就用现状，剪成了几段就用切出时的那一段。
      起止不在句子边界上的（在编辑器里拖过）照原样带回，候选卡上有「落在句中」的提醒。
      `taken` 是项目库里已有的标题，用来给新的一支起名。 */
  function redoCandidate(sentences, child, taken) {
    if (!isChild(child) || !(sentences || []).length) return null;
    const used = usedRanges(child);
    const whole = used.length === 1;
    const r = whole ? used[0] : {start: child.origin.in, end: child.origin.out};
    const c = manualCandidate(sentences, {range: r, id: 'sc-redo-' + child.id, title: redoTitle(child.title, taken)});
    return Object.assign(c, {
      added: 'redo', redoOf: child.id, focusX: child.cut && child.cut.focusX != null ? child.cut.focusX : null,
      reason: whole ? `「${child.title}」现在的起止` : `「${child.title}」切出时的起止 · 后来加的片段不带过来`,
    });
  }
  /** 重做时的设置：那一支创建时的取景、字幕轨与样式盖在现有设置上，再落到这个项目的现状上。 */
  function redoParams(child, base, facts) {
    const cut = (child && child.cut) || {};
    const p = Object.assign({}, base);
    ['ratio', 'focus', 'tracks', 'style'].forEach((k) => { if (cut[k] != null) p[k] = cut[k]; });
    return normalize(p, facts);
  }
  /** 重做落在哪：正在找或正在创建就等它（busy）；结果页开着就接在后面（append）；否则单起一页结果（fresh）。 */
  function redoPlan(s) {
    if (!s) return 'fresh';
    if (s.phase === 'running') return 'busy';
    if (s.phase === 'result' && visible(s.list).length) return 'append';
    return 'fresh';
  }

  const api = {
    COUNT, DONE_RATIO, LENGTHS, CUSTOM, RATIOS, FOCUS, TRACKS, STYLES, DEFAULTS, FIND_STAGES, CREATE_STAGES, DIRECT_LINE, NEAR,
    lengthOf, lengthRange, focusOf, ratioOf, clampCount, normalize,
    mmss, secs, spanText, overlapSec, durText,
    indexAt, rangeOf, snap,
    isChild, hostId, childrenOf, parentOf, originLabel, countLabel, doneBy, deleteNote,
    seedCuts, cutsOf, sourceDur, keptRanges, usedRanges, reclaimSpan, foldRows, clipTime, STEP, coverScale, framePlace, focusText,
    flags, visible, chosen, totalSec, resultHead, hookOf, tailOf, preselect,
    demoCandidates, manualCandidate,
    childTitle, childProject,
    frameLine, summaryLine, agentExtra, taskTitle, stageAt, listStatus, openTracks,
    bar, rowWindow,
    MADE_ROW_H, MADE_SHOWN, tracksOf, editedSince, cutLine, madeHead, madeRows, madeBar, redoTitle, redoCandidate, redoParams, redoPlan,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.BC_SHORTS_CUT = api;
})();

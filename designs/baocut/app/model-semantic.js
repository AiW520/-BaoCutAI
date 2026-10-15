/* 本机语义索引的状态与文案（embedding-integration-design §2.11、§2.12、§3.11；retrieval-spec v0.1 §11.5、§13.2）。
   App 与 Web 都加载：Web 不建索引，只显示 Runtime 的能力状态（§2.12），字幕面板的翻译记忆标记与术语不一致统计也读这里。
   · 状态：装没装（none / full；2026-10-13 起文字模型与多模态模型合成一个包一起装，老的 text 读进来按 full 算）、这台电脑支不支持、索引是否跟上（ready / stale）、是否暂停；
   · 每个入口自己说明状态（§2.11「每个入口自己说明状态」）：置灰或退回时一句原因 + 去设置的入口，不弹全局警告；
   · 完整性按通道分别写（「文字已就绪；画面 18/30 个素材完成」），不是一根 60% 的进度条（v0.1 §13.2）；设置里在建时两路合一根条
     （indexProgress，2026-10-14 已确认，同 Electron / Web），条下面仍按路写计数；
   · 翻译记忆的「沿用」与术语不一致（§2.6）；
   · 自动停下（v0.1 §16.1）：用电池（设置「用电池时暂停」）、电脑过热降频时停下，与用户的暂停分开写原因；
   · 还要多久（v0.1 §13.2）：按这台电脑量过的速度估，没量过时不写时间（2026-10-13）。
   无 React、无 DOM，`node --test` 直接跑。 */
(function () {
  /* ---------- 状态 ---------- */
  /* half：上次安装没下完（2026-10-13 下载确认框）——{pkg, have: [已下好的部分 id], note: 失败那一句}；这时这个包仍算没装 */
  /* power：这台电脑此刻的供电（ac / battery / thermal，演示挡位）；pauseOnBattery：设置「用电池时暂停」 */
  /* visual：画面索引，缺省开（2026-10-13 待确认）——装好就建，安装前写明要建多少、多久，用电池与过热时照样停。
     folders：项目之外加进来的索引文件夹（null = 演示数据里的那几个）；requeued：刚点了「重新索引」的条目；
     indexDir：设置里选过的索引位置（null = 默认，在应用数据里）；
     excluded：排除的项目（目录 id；缺省是所有 BaoCut 项目都建）；noIndex：单独设了「不索引」的条目 id → true（2026-10-13 待确认）；
     phase：索引在更新时建到哪一路（text 讲话内容在建、画面排在后面 / visual 画面在建，演示挡位，2026-10-14） */
  const DEFAULT = {install: 'full', platform: 'ok', index: 'ready', phase: 'text', paused: false, power: 'ac', pauseOnBattery: true, visual: true, tm: true, terms: true, half: null,
    folders: null, requeued: {}, indexDir: null, excluded: [], noIndex: {}};
  /* 原型演示用的 URL 开关：`?semantic=none|stale|unsupported|ready|full`（写在 hash 前面） */
  const DEMO = {
    none: {install: 'none'},
    stale: {index: 'stale'},
    unsupported: {platform: 'unsupported', install: 'none'},
    ready: {},
    full: {install: 'full'},
  };
  function fromSearch(search) {
    const m = /[?&]semantic=([a-z]+)/.exec(String(search || ''));
    return m && DEMO[m[1]] ? Object.assign({}, DEFAULT, DEMO[m[1]]) : null;
  }
  /** 本机存的那份读进来：补齐缺省；老版本分开装的文字包（install: 'text'）现在算整包装好（2026-10-13）。 */
  function normalize(v) {
    const s = Object.assign({}, DEFAULT, v || {});
    if (s.install === 'text') s.install = 'full';
    if (s.half && s.half.pkg !== 'sem') s.half = null;
    return s;
  }

  /** 为什么停着（v0.1 §16.1）：user 用户暂停（优先）；thermal 过热降频；battery 用电池且设置开着；没停时 null。 */
  function pauseReasonOf(st) {
    const s = Object.assign({}, DEFAULT, st || {});
    if (s.paused) return 'user';
    if (s.power === 'thermal') return 'thermal';
    if (s.power === 'battery' && s.pauseOnBattery) return 'battery';
    return null;
  }

  /** 语义能力此刻能不能用；reason 是 v0.1 §11.5 的标准错误码，界面用它挑文案。 */
  function status(st) {
    const s = Object.assign({}, DEFAULT, st || {});
    if (s.platform === 'unsupported') return {usable: false, reason: 'UNSUPPORTED', stale: false, mode: 'lexical'};
    if (s.install === 'none') return {usable: false, reason: 'MODEL_NOT_INSTALLED', stale: false, mode: 'lexical'};
    const why = pauseReasonOf(s);
    if (why) return {usable: true, reason: 'INDEX_PARTIAL', stale: true, mode: 'hybrid', paused: true, pauseReason: why};
    if (s.index === 'stale') return {usable: true, reason: 'INDEX_PARTIAL', stale: true, mode: 'hybrid'};
    return {usable: true, reason: null, stale: false, mode: 'hybrid'};
  }

  const STALE_NOTE = '索引更新中，结果可能不含最近的修改';
  const PAUSED_NOTE = '索引已暂停，结果可能不含最近的修改';
  /* 自动停下的那一句（入口提醒与设置的状态说明共用） */
  const POWER_NOTE = {
    battery: '正在用电池，索引先停下；接上电源后接着建',
    thermal: '电脑过热降频，索引先停下；温度回落后接着建',
  };
  const UNSUPPORTED_NOTE = '这台电脑暂不支持本机语义模型，精确文字搜索照常可用';

  /* 每个入口各写一句（§2.11）：not = 没装 / 不支持时；fallback = 退回的那条路。 */
  const ENTRY = {
    search:   {not: '没装本机语义模型，只按精确文字找了', fallback: '精确文字'},
    topic:    {not: '需要本机语义模型', fallback: '整篇 / 某一章'},
    terms:    {not: '只做了精确匹配：按术语表里记下的误听写法找', fallback: '精确匹配'},
    tm:       {not: '只沿用原文完全相同的句子', fallback: '精确匹配'},
    retakes:  {not: '只找了文字完全相同的重录', fallback: '完全相同的文字'},
    frames:   {not: '按时间取帧，未按内容挑选', fallback: '按出处时间取帧'},
    chapters: {not: '需要本机语义模型；由模型决定边界', fallback: '由模型决定'},
    shorts:   {not: '需要本机语义模型；不写主题时照常全片分析', fallback: '全片分析'},
    agent:    {not: '字面匹配', fallback: 'lexical'},
  };
  /** 一个入口此刻那一句：能用且不过期 → null；过期 → 不阻塞的提醒；不能用 → 原因（+ 去设置）。 */
  function entryNote(entry, st) {
    const s = status(st);
    const e = ENTRY[entry] || ENTRY.search;
    if (!s.usable) {
      return {tone: 'info', text: s.reason === 'UNSUPPORTED' && entry === 'search' ? UNSUPPORTED_NOTE : e.not,
        link: s.reason === 'UNSUPPORTED' ? null : '去设置', blocking: entry === 'topic' || entry === 'chapters'};
    }
    if (s.stale) return {tone: 'notice', text: s.paused ? POWER_NOTE[s.pauseReason] || PAUSED_NOTE : STALE_NOTE, link: null, blocking: false};
    return null;
  }

  /** 一段时长给人看（估时用，不写秒）：不到 1 分钟 / 约 N 分钟 / 约 N 小时（一位小数）。 */
  function fmtDuration(sec) {
    if (sec < 60) return '不到 1 分钟';
    if (sec < 3600) return `约 ${Math.round(sec / 60)} 分钟`;
    const h = Math.round(sec / 360) / 10;
    return `约 ${h} 小时`;
  }
  /** 还要多久那一句（v0.1 §13.2，indexStatus.estimates 的一项）：没有可用的速度时只写还剩几部；时长未知的单独写。 */
  function etaLine(e) {
    if (!e || !e.videos) return null;
    const unknown = e.unknownDuration ? `，${e.unknownDuration} 部时长未知未计入` : '';
    if (e.seconds === null || e.seconds === undefined) return `还剩 ${e.videos} 部视频；建完第一部后能估出时间`;
    const basis = e.basis === 'default' ? '按参考速度估' : '按这台电脑的速度';
    return `还剩 ${e.videos} 部视频，${fmtDuration(e.seconds)}（${basis}${unknown}）`;
  }

  const fmtCount = (n) => Number(n || 0).toLocaleString('en-US');
  const PAUSE_SHORT = {user: '你暂停的', battery: '用电池', thermal: '过热降频'};

  /** 合并的索引进度（2026-10-14 已确认，同 Electron / Web 的 indexProgressView）：讲话内容先建，画面等它建完再建（Runtime 的画面一路让文字先走），
      所以两路合在「状态」下面的一根进度条里，不再在画面那一行另画一根——那根条在讲话内容建完之前一直是 0。
      · 条按估算时间合：文字按部、画面按帧，单位不能相加；值 = 两路已建的估算秒 ÷（已建 + 还剩）。有一路还估不出时间时不定量。
      · 那一行整体不写百分比（画面的帧多，讲话内容那一段在条上只占一小截）：按路写计数，写明画面排在讲话内容后面；
        下面一句是两路合起来还要多久，等讲话内容的时间也算在里面。
      · 讲话内容正在建的那一部写它编到百分之几（2026-10-14 补）：一部长视频在 CPU 上要建几分钟，只写部数时一直是 0，像卡住了。
      p = {text, visual}，每路 {done, total, doneSeconds, estimate}（estimate 是 indexStatus.estimates 里没开 ifEnabled 的那一项；
      text 按部视频，另有正在建那一部的 current {done, total}（句群）；visual 按帧；画面没开时 visual 省略）；
      why 是 pauseReasonOf 的结果。两路都建完时返回 null。 */
  function indexProgress(p, why) {
    const t = p && p.text;
    const v = p && p.visual;
    const chans = [t, v].filter(Boolean);
    const left = chans.filter((c) => c.done < c.total);
    if (!left.length) return null;
    const textBusy = !!t && t.done < t.total;
    const counts = [];
    if (t) {
      const cur = textBusy && !why && t.current && t.current.total > 0 ? t.current : null;
      const pct = cur ? `（当前这部 ${Math.floor((cur.done / cur.total) * 100)}%）` : '';
      counts.push(t.done >= t.total ? '讲话内容已建好' : `讲话内容 ${fmtCount(t.done)}/${fmtCount(t.total)} 部视频${pct}`);
    }
    if (v) {
      const wait = !textBusy ? '' : v.done ? '（讲话内容建完后接着建）' : '（讲话内容建完后开始）';
      counts.push(v.done >= v.total ? '画面已建好' : `画面 ${fmtCount(v.done)}/${fmtCount(v.total)} 帧${wait}`);
    }
    const ests = left.map((c) => c.estimate || {});
    const timed = ests.every((e) => e.seconds !== null && e.seconds !== undefined);
    const leftSec = timed ? ests.reduce((s, e) => s + e.seconds, 0) : null;
    const doneSec = chans.reduce((s, c) => s + (c.doneSeconds || 0), 0);
    const value = leftSec === null || doneSec + leftSec <= 0 ? null : (doneSec / (doneSec + leftSec)) * 100;
    let eta;
    if (why) eta = `已暂停（${PAUSE_SHORT[why] || PAUSE_SHORT.user}）`;
    else if (leftSec === null) eta = '建完第一部视频后能估出还要多久';
    else {
      const bases = ests.map((e) => e.basis);
      const basis = bases.every((b) => b === 'measured') ? '按这台电脑的速度' : bases.every((b) => b !== 'measured') ? '按参考速度估' : '部分按参考速度估';
      // 同一部视频两路都会算一次时长未知：取大的那个（Runtime 实现时按视频去重）
      const unknown = Math.max(0, ...ests.map((e) => e.unknownDuration || 0));
      eta = `还要${fmtDuration(leftSec)}（${basis}${unknown ? `，${unknown} 部时长未知未计入` : ''}）`;
    }
    return {value, line: counts.join(' · '), eta};
  }

  /** 打开画面之前那一句（v0.1 §13.2，indexStatus.estimates 里 ifEnabled 的画面一项）：多少视频、多少帧、首次要多久、向量多大。
      关键帧缓存不算在内（可以清掉）。 */
  function visualCostLine(e) {
    if (!e || !e.videos) return null;
    if (!e.frames) return `${e.videos} 部视频，时长未知，估不出要多久`;
    const size = e.vectorBytes === null || e.vectorBytes === undefined ? null
      : e.vectorBytes < 1048576 ? '不到 1 MB' : `约 ${fmtBytes(e.vectorBytes)}`;
    const time = e.seconds === null || e.seconds === undefined ? null
      : `首次${fmtDuration(e.seconds)}（${e.basis === 'measured' ? '按这台电脑的速度' : 'CPU 参考速度'}）`;
    const unknown = e.unknownDuration ? `，${e.unknownDuration} 部时长未知未计入` : '';
    const head = `${e.videos} 部视频共${fmtDuration(e.sourceSeconds)} → 约 ${e.frames} 帧${unknown}`;
    return [head, time, size ? `向量${size}` : null].filter(Boolean).join('，') + '；关键帧缓存另算，可清理';
  }

  /* ---------- 通道与完整性 ---------- */
  const CHANNELS = [
    {k: 'text', label: '讲话内容', short: '文字'},
    {k: 'visual', label: '画面', short: '画面', later: '画面索引没开；在设置 › 语义索引里打开'},
    {k: 'audio', label: '声音', short: '声音', later: '这一版还没有声音索引'},
  ];
  /** 包装了哪些通道：只有一个包，装好就有文字与画面（声音后续版本）；'text' 是老版本存下的值。 */
  function channelsOf(install) {
    return install === 'full' ? ['text', 'visual', 'audio'] : install === 'text' ? ['text'] : [];
  }

  /** 一个范围的完整性（§2.11 / v0.1 §13.2）：按通道分别写。
      c.text = {done, total, pending?, none?, excluded?}（excluded：设置里没纳入语义索引的项目的视频，不计入 total）；c.visual / c.audio = {done, total} 或省略（没开 / 这一版没有）。 */
  function coverageLine(c) {
    const o = c || {};
    const parts = [];
    const t = o.text;
    if (t) {
      const out = t.excluded ? `${t.excluded} 部没纳入语义索引` : null;
      if (!t.total) parts.push(t.excluded ? '这些视频没纳入语义索引，只能按字面找到' : '没有文稿，未建立文字索引');
      else if (t.done >= t.total) parts.push(out ? `文字已就绪（${out}）` : '文字已就绪');
      else {
        const why = [t.pending ? `${t.pending} 部还在转录` : null, t.none ? `${t.none} 部没有文稿` : null, out].filter(Boolean).join('、');
        parts.push(`文字 ${t.done}/${t.total} 部视频${why ? `（${why}）` : ''}`);
      }
    }
    ['visual', 'audio'].forEach((k) => {
      const v = o[k];
      if (!v) return;
      const name = k === 'visual' ? '画面' : '声音';
      parts.push(v.done >= v.total ? `${name}已就绪` : `${name} ${v.done}/${v.total} 个素材完成`);
    });
    if (o.later) parts.push('画面与声音这一版还没有索引');
    return parts.join('；');
  }
  /** 把若干项目的文字完整性加起来（Space 搜索的「全部项目」）。 */
  function sumText(list) {
    return (list || []).reduce((a, p) => ({done: a.done + (p.text.done || 0), total: a.total + (p.text.total || 0),
      pending: a.pending + (p.text.pending || 0), none: a.none + (p.text.none || 0)}), {done: 0, total: 0, pending: 0, none: 0});
  }

  function fmtBytes(n) {
    if (!n) return '0 MB';
    const mb = n / 1048576;
    return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`;
  }

  /* ---------- 会话的只读检索范围（Conversation.spaceReadScope，2026-10-14） ---------- */
  /* 不属于任何项目的会话本来只检索自己文件夹里的视频（架构设计 §4.8）。首页新会话缺省放宽成「可检索全部视频」：
     只读、只放宽按内容检索（space_* 与语义检索），不能打开或修改别的视频。缺省不显示标签：不想让它找哪些项目或视频，
     跟 Agent 说，它检索时去掉（工具参数 excludeProjectIds / excludeVideoIds）。排除了的项目、设了不索引的条目仍只能按字面找到。
     在起始页选了项目、在已有视频里继续的不挂；首页开的会话之后建了视频、收进新项目时，范围跟着会话走。
     只有 Space「回答这个问题」只找不属于项目的视频（'unfiled'）时，会话输入框上方有标签，点 × 收回。 */
  const READ_SCOPE = {
    unfiled: '可检索不属于项目的视频',
    hint: 'Agent 可以按内容检索这些视频里讲的话，不能打开或修改它们',
    drop: '只检索这条会话里的视频',
    dropped: '这条会话之后只检索它自己的视频',
  };
  /** 新会话的检索范围：不用项目、也不是在已有视频里继续时缺省 'all'。 */
  function defaultReadScope(o) {
    const opt = o || {};
    if (opt.dir || opt.project) return null;
    return 'all';
  }

  /* ---------- 翻译记忆与术语一致（§2.6） ---------- */
  /** 这一句是不是沿用的既有译文；`over` 是用户点了「改为重译」的那几句。 */
  function reusedFrom(tm, cardId, over) {
    if (!tm || (over && over[cardId])) return null;
    return (tm.reused || {})[cardId] || null;
  }
  /** 统计条上那一项：N 处术语不一致；fixed 是已经统一过的术语。 */
  function conflicts(tm, fixed) {
    const list = ((tm && tm.conflicts) || []).filter((c) => !(fixed && fixed[c.term]));
    return {n: list.reduce((s, c) => s + c.spots.length, 0), list};
  }
  /** 翻译工具参数页那一行：「参考了 N 句已有译文」；没装模型时只做精确匹配。 */
  /** to：目标语言代码。只数同一语言方向的已有译文（refsByLang 有这一项就用它，否则用 refs） */
  function tmLine(tm, st, to) {
    const s = status(st);
    const by = tm && tm.refsByLang;
    const n = (by && to && Object.prototype.hasOwnProperty.call(by, to) ? by[to] : tm && tm.refs) || 0;
    if (!s.usable) return `翻译记忆只做精确匹配：原文完全相同的句子沿用已有译文`;
    return n ? `参考了 ${n} 句已有译文（同一语言方向、你已有的视频）` : '没有找到可参考的已有译文';
  }

  const api = {DEFAULT, DEMO, fromSearch, normalize, status, pauseReasonOf, entryNote, ENTRY, STALE_NOTE, PAUSED_NOTE, POWER_NOTE, UNSUPPORTED_NOTE, fmtDuration, etaLine, indexProgress, visualCostLine,
    CHANNELS, channelsOf, coverageLine, sumText, fmtBytes, reusedFrom, conflicts, tmLine, READ_SCOPE, defaultReadScope};
  if (typeof window !== 'undefined') window.BC_SEMANTIC = api;
})();

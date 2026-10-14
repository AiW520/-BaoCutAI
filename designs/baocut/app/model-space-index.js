/* 语义索引的范围、位置与每个条目的索引状态（2026-10-13 待确认的提案；embedding-integration-design §2.10、§2.11，
   retrieval-spec v0.1 §8.1、§9.1、§13.2）。只在 App 入口加载：设置 › 语义索引与 Space 用它。
   · 每个条目的索引状态：Space 的卡片与列表行上一个标志，查看框里按通道写清楚（讲话内容 / 画面）；
     只给视频、成片、索引文件夹里的视频素材与图片标，文档、字幕、模板这些不标；没装模型或这台电脑不支持时都不标。
   · 成片不另建索引：导出它的视频已经按讲话内容与画面建过，标「不需要索引」并说是哪部视频；
     索引文件夹里认得出的成片（BaoCut 导出过的文件）同样跳过；认不出来的文件（没有导出记录）照普通视频素材建。
   · 重新索引：丢掉这一条已有的向量，排到队首重建（space.indexBuild {videoIds, rebuild: true}）；成片、文档不给。
   · 不索引：单个条目可以排除（删掉已有的向量、以后不建，只能按字面找到），再点「恢复索引」排回队里；
     所在项目在设置里整个排除了的，条目上写是哪个项目，不再单独设（恢复要去设置）。视频缺省按讲话内容与画面都建。
   · 索引文件夹：项目之外再加的只读扫描目录。里面的 BaoCut 视频按讲话内容与画面建；其他视频文件与图片没有文稿，只按画面建，
     所以画面关着时，加进来的文件夹只有 BaoCut 视频会建索引——添加时就说清楚。BaoCut 不改这些文件夹里的文件。
   · 索引位置：默认在应用数据里；可以改到别的磁盘。改的时候二选一：把现有索引移过去，或在新位置重新建（旧的删掉）。
     不提供「只切换位置」：留在原处的索引没人用，只占空间。关键帧缓存不搬，可以清掉、会重新取。
   无 React、无 DOM，`node --test` 直接跑。 */
(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;

  /* ---------- 每个条目的索引状态 ---------- */
  /* 一个通道（讲话内容 / 画面）的状态。`waiting`：还在转录，转完才有文稿；`none`：没有文稿（文字）。
     `indexing` 是正在建（引擎目前把排队与在建都记成 pending，要分开报，见交付说明）。 */
  const CH_STATE = {
    indexed:  {k: 'indexed',  label: '已索引'},
    indexing: {k: 'indexing', label: '索引中'},
    queued:   {k: 'queued',   label: '排队中'},
    stale:    {k: 'stale',    label: '索引过期'},
    failed:   {k: 'failed',   label: '索引失败'},
    waiting:  {k: 'waiting',  label: '转录完成后建'},
    none:     {k: 'none',     label: '没有文稿'},
    off:      {k: 'off',      label: '画面索引没开'},
  };
  /* 条目的标志：取最需要人注意的那个通道。icon 是 S2 图标名（RSP.Icons）；indexing 画转圈，不用图标。 */
  const STATE = {
    failed:    {k: 'failed',    label: '索引失败',         tone: 'negative',    icon: 'AlertTriangle'},
    stale:     {k: 'stale',     label: '索引过期',         tone: 'notice',      icon: 'Refresh'},
    indexing:  {k: 'indexing',  label: '索引中',           tone: 'informative', icon: null},
    queued:    {k: 'queued',    label: '排队中',           tone: 'neutral',     icon: 'ClockPending'},
    indexed:   {k: 'indexed',   label: '已索引',           tone: 'positive',    icon: 'CheckmarkCircle'},
    empty:     {k: 'empty',     label: '没有可索引的内容', tone: 'neutral',     icon: 'InfoCircle'},
    notNeeded: {k: 'notNeeded', label: '不需要索引',       tone: 'neutral',     icon: 'Link'},
    excluded:  {k: 'excluded',  label: '不索引',           tone: 'neutral',     icon: 'StopProcessing'},
  };
  const ORDER = ['failed', 'stale', 'indexing', 'queued', 'indexed'];

  /** 这一条参不参与索引：视频（BaoCut 视频目录）、成片、视频素材、图片。 */
  function indexable(it) {
    return !!it && !it.trashed && (it.kind === 'movie' || it.kind === 'final' || it.kind === 'clip' || it.kind === 'image');
  }
  /** 成片：有导出记录、知道是哪部视频导出的（Space 条目的 movie / origin.videoId）。 */
  const isExport = (it) => it.kind === 'final' && !!it.movie;

  /**
   * 一个条目的索引状态；不标时 null。
   * @param it   Space 条目（BC_SPACE.items）
   * @param o.sem       BC_SEMANTIC.status(st) 的结果
   * @param o.visual    画面索引开着没有（装了多模态且开关开着）
   * @param o.demo      id → {text?, visual?, pct?}：演示的各通道状态（data.js semantic.entries）；没写的通道算已索引
   * @param o.requeued  id → true：刚点了「重新索引」，各通道排到队首
   * @param o.paused    索引停着（用户暂停、用电池、过热）：在建的显示成排队中
   * @param o.movieName 成片：导出它的视频的名字
   * @param o.noIndex   id → true：单独设了「不索引」的条目
   * @param o.excluded  设置里排除的项目（目录 id）
   * @param o.dirName   条目所在项目的名字（所在项目被排除时写进说明）
   */
  function entryState(it, o) {
    const opt = o || {};
    if (!indexable(it) || !opt.sem || !opt.sem.usable) return null;
    const off = {canReindex: false, canExclude: false, canInclude: false};
    // 整个项目排除了：条目上只说是哪个项目，恢复去设置（不做「项目排除了、单条又纳入」）
    if (it.dir && (opt.excluded || []).indexOf(it.dir) >= 0) {
      return Object.assign({}, STATE.excluded, off, {channels: [], lines: [],
        why: `所在项目${opt.dirName ? `「${opt.dirName}」` : ''}已排除，只能按字面找到；在设置 › 语义索引里恢复`});
    }
    if (isExport(it)) {
      return Object.assign({}, STATE.notNeeded, off, {channels: [],
        why: `成片：和导出它的视频${opt.movieName ? `「${opt.movieName}」` : ''}内容相同，搜那部视频就能找到`});
    }
    if ((opt.noIndex || {})[it.id]) {
      return Object.assign({}, STATE.excluded, off, {channels: [], lines: [], canInclude: true,
        why: '设了不索引：已有的索引删掉了，只能按字面找到'});
    }
    const d = (opt.demo || {})[it.id] || {};
    const again = !!(opt.requeued || {})[it.id];
    const pick = (k, dflt) => {
      let s = d[k] || dflt;
      if (again && (s === 'indexed' || s === 'stale' || s === 'failed' || s === 'indexing')) s = 'queued';
      if (opt.paused && s === 'indexing') s = 'queued';
      return s;
    };
    const channels = [];
    // 讲话内容只有 BaoCut 视频有（有文稿）；视频素材与图片没有文稿，只按画面
    if (it.kind === 'movie') channels.push({k: 'text', label: '讲话内容', state: pick('text', 'indexed')});
    channels.push({k: 'visual', label: '画面', state: opt.visual ? pick('visual', 'indexed') : 'off'});
    const live = channels.filter((c) => ORDER.indexOf(c.state) >= 0);
    const lines = channels.map((c) => `${c.label}：${CH_STATE[c.state].label}${c.state === 'indexing' && d.pct != null ? ` ${d.pct}%` : ''}`);
    if (!live.length) {
      const why = it.kind === 'movie'
        ? (channels[0].state === 'waiting' ? '还在转录，转完按讲话内容建' : '没有文稿，画面索引也没开')
        : '只能按画面建，画面索引没开';
      return Object.assign({}, STATE.empty, off, {channels, lines, why, canExclude: true});
    }
    const top = ORDER.find((k) => live.some((c) => c.state === k));
    return Object.assign({}, STATE[top], {channels, lines, why: null, canReindex: true, canExclude: true, canInclude: false,
      pct: top === 'indexing' ? d.pct : null});
  }
  /** 标志的悬停说明 / 无障碍名：「语义索引：排队中 · 讲话内容：已索引；画面：排队中」。 */
  function stateTitle(s) {
    if (!s) return '';
    const tail = s.why || (s.lines || []).join('；');
    return `语义索引：${s.label}${tail ? ' · ' + tail : ''}`;
  }

  /* ---------- 索引文件夹 ---------- */
  /** 添加一个文件夹前那一句：会建什么、不会建什么（画面关着时，视频素材与图片暂时不会建）。 */
  function folderNote(f, visual) {
    const n = f.counts || {};
    const parts = [n.movies ? `${n.movies} 部 BaoCut 视频按讲话内容${visual ? '与画面' : ''}建` : null,
      n.clips || n.images ? `${[n.clips ? `${n.clips} 个视频素材` : null, n.images ? `${n.images} 张图片` : null].filter(Boolean).join('、')}${visual ? '按画面建' : '要打开画面索引才会建'}` : null,
      n.exports ? `${n.exports} 个成片跳过（导出它们的视频已经建过）` : null].filter(Boolean);
    return parts.length ? parts.join('；') + '。' : '这个文件夹里没有视频和图片。';
  }
  /** 选中的文件夹能不能加：不存在、已经在范围里（是某个项目、某个已加的文件夹，或在它们里面）时不能。 */
  function folderProblem(path, taken) {
    if (!path) return {code: 'missing', text: '找不到这个文件夹。'};
    const inside = (a, b) => a === b || a.indexOf(b.replace(/\/?$/, '/')) === 0;
    const hit = (taken || []).find((t) => inside(path, t.path) || inside(t.path, path));
    if (hit) return {code: 'overlap', text: `和「${hit.name}」重叠，已经在索引范围里。`};
    return null;
  }

  /* ---------- 索引位置 ---------- */
  const DEFAULT_DIR = '~/Library/Application Support/BaoCut/cache/semantic-index';
  /** 生效位置：设置里选过的，没有就是默认。 */
  const effectiveDir = (chosen) => ({path: chosen || DEFAULT_DIR, source: chosen ? 'custom' : 'default'});
  /**
   * 选了一个文件夹之后：能不能用，两种做法各自要什么。
   * folder：{path, exists, writable, freeMB}（演示用 BC_MODELSDIR.FOLDERS 的那几个）；bytes：现在索引的大小。
   * 移过去要整份放得下；重新建只需要能写（按已有文稿与画面在后台重建，期间按意思找的结果不全）。
   */
  function locationPlan(folder, bytes, current) {
    if (!folder || !folder.exists) return {kind: 'error', error: {code: 'missing', text: '找不到这个文件夹，可能是外置盘没接上。'}};
    if (!folder.writable) return {kind: 'error', error: {code: 'readonly', text: '这个文件夹不可写，索引要能随时更新。'}};
    if (folder.path === current) return {kind: 'error', error: {code: 'same', text: '索引已经在这里了。'}};
    const needMB = Math.ceil((bytes || 0) / 1048576);
    const fits = folder.freeMB >= needMB;
    return {kind: 'choose', needMB, freeMB: folder.freeMB,
      move: {disabled: !fits, why: fits ? null : `所在磁盘只剩 ${Math.round(folder.freeMB)} MB，放不下 ${needMB} MB 的索引`}};
  }

  const api = {CH_STATE, STATE, indexable, isExport, entryState, stateTitle, folderNote, folderProblem, DEFAULT_DIR, effectiveDir, locationPlan};
  root.BC_SPACE_INDEX = api;
})();

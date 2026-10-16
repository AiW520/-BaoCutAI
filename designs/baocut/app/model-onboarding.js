/* 首次启动引导（2026-10-16 用户要求，参考 voice-ink 原型的 onboarding.jsx；规格待补，见交付说明）。
   第一次打开 App 时弹一次（从没有引导的旧版升级上来的老用户也弹一次，2026-10-16 用户确认）。六步：
   连接 Agent → 语音识别 → 语音合成 → 语义搜索 → 图像生成 → 音乐生成。
   每一步都不是必须的：有「跳过」，「退出引导」与 Esc 随时退出整个引导。任何一种关掉都记下，以后启动不再弹，也没有再打开的入口。
   下载照旧先过同一个下载确认框（download-dialog.jsx）；确认后下载成为一条后台任务，引导立刻翻到下一步，不等下完。
   人声分离、视觉分析不进引导：体积小，用到的地方会先提出下载。
   Web 入口不加载：浏览器里不能安装本地模型（product-design §7.6「本地模型由用户安装」），也不连本机的 Agent。

   这一层只算：步骤表、要不要弹、落成什么记录、每一步的候选与默认勾选、这次要下多少（经 BC_LOCALMODELS，
   与下载确认框同一张安装表）、主按钮怎么写、后台在下的那一行。不碰 DOM。 */
(function () {
  const LM = () => window.BC_LOCALMODELS;

  /* `pick`：'one' 单选（转录有一只就够），'many' 多选；语义搜索是一个包（`pkg`），Agent 一步不下载 */
  const STEPS = [
    {k: 'agent', label: '连接 Agent'},
    {k: 'asr', label: '语音识别', cat: 'asr', pick: 'one'},
    {k: 'tts', label: '语音合成', cat: 'tts', pick: 'many'},
    {k: 'semantic', label: '语义搜索', pkg: true},
    {k: 'image', label: '图像生成', cat: 'image', pick: 'many'},
    {k: 'music', label: '音乐生成', cat: 'music', pick: 'many'},
  ];
  const stepOf = (k) => STEPS.find((s) => s.k === k) || STEPS[0];
  const isLast = (k) => STEPS[STEPS.length - 1].k === k;

  /* 每一步推荐的那只（排第一、带「推荐」）：
     · 转录：所有平台的默认转写模型包都是 MOSS Transcribe（packages/models bundle-registry.ts
       DEFAULT_TRANSCRIBE_BUNDLE / DEFAULT_CANDLE_TRANSCRIBE_BUNDLE），转录时自己区分说话人；
     · 语音合成：CustomVoice 有 9 个预设音色，不用参考录音就能念，最容易上手；
     · 图像生成：Turbo 是本地生图的首选（data.js：蒸馏版，比基础版快 2 倍多）。 */
  const RECOMMENDED = {asr: 'moss-transcribe', tts: 'qwen3-tts-1.7b-customvoice', image: 'qwen-image-2.1-turbo'};
  /* 打开这一步时默认勾上推荐的那只（这一类一只都没装时）：转录与语音合成。图像、音乐很大、只许非商业用途，默认不勾 */
  const PRESELECT = ['asr', 'tts'];
  /* 语音合成那一步列的三只：三种出声方式各一只（预设音色 / 克隆 / 多语言），都可商用；其余在设置里下 */
  const TTS_HIGHLIGHTS = ['qwen3-tts-1.7b-customvoice', 'qwen3-tts-0.6b-base', 'voxcpm2'];
  /* 随应用附带、全新安装也在盘上的模型（data.js 的人物定位：体积小到进安装包） */
  const BUNDLED = ['vision-person'];

  /** 已经有记录（走完或退出）就不再弹：只在第一次启动出现 */
  const decided = (record) => !!record && (record.state === 'done' || record.state === 'skipped');
  const shouldShow = (record) => !decided(record);
  /* 原型里「第一次启动」由 `?onboarding=1` 或原型开关模拟；`?onboarding=installed` 演示老用户升级后的第一次启动（模型目录里已有模型） */
  const demoParam = (search) => new URLSearchParams(search || '').get('onboarding');
  const demoLaunch = (search) => demoParam(search) === '1' || demoParam(search) === 'installed';
  const demoFresh = (search) => demoParam(search) === '1';

  /**
   * 关掉引导时记下的偏好。`how`：'done' 在最后一步点完成或跳过；其余（「退出引导」、Esc、半路去了别处）都是 'skipped'。
   * `step` 是关掉时停在哪一步；`downloaded` 是这次引导里开始下载的模型（本来就装好的不算；语义搜索记包 id）。
   */
  function record(how, step, downloaded) {
    return {state: how === 'done' ? 'done' : 'skipped', step: step || STEPS[0].k, downloaded: (downloaded || []).slice()};
  }

  function recordText(rec) {
    if (!decided(rec)) return '没有记录';
    const head = rec.state === 'done' ? '已走完' : `在「${stepOf(rec.step).label}」退出`;
    const n = (rec.downloaded || []).length;
    return head + (n ? ` · 下载了 ${n} 个` : '');
  }

  /**
   * 一步的候选：[{m, recommended, note}]。推荐的排第一，其余按目录顺序；不支持这台电脑的不列。
   * 转录不含「说话人区分」这类辅助包，`speakers` 来自 data.js 的转录模型表：'builtin' 自己区分说话人，'pack' 要另装。
   */
  function choices(stepK, models, speakers) {
    const s = stepOf(stepK);
    if (!s.cat) return [];
    let list = (models || []).filter((m) => (m.cat || 'asr') === s.cat && !m.pack && m.supported !== false);
    if (stepK === 'tts') list = TTS_HIGHLIGHTS.map((id) => list.find((m) => m.id === id)).filter(Boolean);
    const rec = RECOMMENDED[stepK];
    const ordered = list.filter((m) => m.id === rec).concat(list.filter((m) => m.id !== rec));
    return ordered.map((m) => ({m, recommended: m.id === rec, note: noteOf(stepK, m, speakers)}));
  }

  /** 候选下面那一句：转录写区分说话人的方式；其余用目录里的说明 */
  function noteOf(stepK, m, speakers) {
    if (stepK !== 'asr') return m.note || '';
    return ((speakers || {})[m.id] || 'pack') === 'builtin' ? '转录同时区分说话人' : '要区分说话人，另装「说话人区分」';
  }

  /** 只许非商业用途的模型（下载确认框里还会再确认一次） */
  const nonCommercial = (m) => !!(m && m.license && m.license.commercialUse === false);

  /**
   * 安装表（与下载确认框共用，两边算的大小才对得上）：模型看 `installed(id)`；组件看演示数据里的 `installed`，
   * 全新安装（`fresh`）时盘上没有任何组件；`got` 是这次引导里已经下好或正在下的部分。
   */
  function installTable(models, comps, installed, fresh, got) {
    const on = {};
    (models || []).forEach((m) => { on[m.id] = !!installed(m.id); });
    (comps || []).forEach((c) => { on[c.id] = !fresh && !!c.installed; });
    (got || []).forEach((id) => { on[id] = true; });
    return on;
  }

  /** 全新安装时模型表的样子：只有随应用附带的在盘上 */
  const freshInstalled = (id) => BUNDLED.indexOf(id) >= 0;

  /**
   * 打开这一步时默认勾哪几只：
   * · 单选（转录）：已经能用的第一只（老用户升级上来就是它），没有就选推荐的；
   * · 多选：这一类一只都没装、且这一步默认要勾时勾推荐的；其余一只不勾。
   */
  function initialPicks(stepK, list, comps, on) {
    const s = stepOf(stepK);
    const ready = (list || []).filter((c) => LM().ready(c.m, comps, on));
    const rec = (list || []).find((c) => c.recommended);
    if (s.pick === 'one') {
      if (ready.length) return [ready[0].m.id];
      return rec ? [rec.m.id] : ((list || [])[0] ? [list[0].m.id] : []);
    }
    if (ready.length || PRESELECT.indexOf(stepK) < 0 || !rec) return [];
    return [rec.m.id];
  }

  /**
   * 勾上的这几只要下什么：[{id, name, size}]（各自的权重带上模型名，共用组件只算一份）与合计 MB。
   * 已经装好或正在下的不算。
   */
  function plan(ms, comps, on) {
    const seen = Object.assign({}, on);
    const parts = [];
    (ms || []).filter(Boolean).forEach((m) => {
      LM().missing(m, comps, seen).forEach((p) => {
        if (seen[p.id]) return;
        seen[p.id] = true;
        parts.push(p.weights ? Object.assign({}, p, {name: m.name}) : p);
      });
    });
    return {parts, total: parts.reduce((n, p) => n + p.size, 0)};
  }

  /** 卡片下面的一行：「一起下载：MOSS Transcribe 1.7 GB · 声纹嵌入 26.5 MB」；什么都不缺时 null */
  function planLine(p) {
    if (!p.parts.length) return null;
    return '一起下载：' + p.parts.map((x) => `${x.name} ${LM().mb(x.size)}`).join(' · ');
  }

  /** 语义搜索包还缺哪几部分（data.js semantic.packages：文字模型、多模态模型、LiteRT-LM 运行时） */
  function pkgPlan(pkg, installed) {
    const parts = installed || !pkg ? [] : pkg.parts.slice();
    return {parts, total: parts.reduce((n, p) => n + p.size, 0)};
  }

  /**
   * 一步的主按钮：有要下的就「下载 1.7 GB 并继续」（确认框之后立刻翻页，下载在后台；最后一步是「并完成」）；
   * 没有要下的就往下走，最后一步是「完成」。Agent 一步另算（视图里按连没连上写）。
   */
  function primary(stepK, p) {
    const last = isLast(stepK);
    if (p && p.parts.length) return {kind: 'download', label: `下载 ${LM().mb(p.total)} 并${last ? '完成' : '继续'}`};
    return {kind: 'next', label: last ? '完成' : '下一步'};
  }

  /**
   * 对话框底部那一行（和按钮挤一排，要短）：这次引导里开始的下载，只有一只在下时写名字与百分比，
   * 几只同时在下只写个数（各自的进度在后台任务里），下完的、没下成的只计数。
   * items：[{name, pct, status}]（status 是后台任务的状态）；一个都没有时 null。
   */
  function bgLine(items) {
    const list = items || [];
    if (!list.length) return null;
    const live = list.filter((x) => x.status === 'running');
    const failed = list.filter((x) => x.status === 'error').length;
    const done = list.length - live.length - failed;
    const bits = [live.length === 1 ? `后台在下载 ${live[0].name} ${Math.round(live[0].pct || 0)}%`
      : live.length ? `后台在下载 ${live.length} 个` : '后台下载'];
    if (done) bits.push(`${done} 个已下完`);
    if (failed) bits.push(`${failed} 个没下成`);
    return bits.join(' · ');
  }

  const api = {STEPS, RECOMMENDED, PRESELECT, TTS_HIGHLIGHTS, BUNDLED, stepOf, isLast, decided, shouldShow, demoLaunch, demoFresh,
    record, recordText, choices, nonCommercial, installTable, freshInstalled, initialPicks, plan, planLine, pkgPlan, primary, bgLine};
  if (typeof window !== 'undefined') window.BC_ONBOARDING = api;
  if (typeof module !== 'undefined') module.exports = api;
})();

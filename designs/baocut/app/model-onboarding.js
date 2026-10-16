/* 首次启动引导（2026-10-16 用户要求，参考 voice-ink 原型的 onboarding.jsx；规格待补，见交付说明）。
   第一次打开 App 时弹一次：欢迎 → 语音识别模型（建议现在下载）→ 语音合成（告诉用户有、去 工具 › 生成语音 用）。
   任何一种关掉——走完、跳过、Esc、关闭按钮——都记下，以后启动不再弹，也没有再打开的入口。
   下载照旧走同一个下载确认框（download-dialog.jsx），引导只负责挑哪一只、显示要下多少与进度。
   Web 入口不加载：浏览器里不能安装本地模型（product-design §7.6「本地模型由用户安装」）。

   这一层只算：步骤表、要不要弹、落成什么记录、转录模型的候选与默认选中、这次要下多少（经 BC_LOCALMODELS，
   与下载确认框同一张安装表）、语音合成那一步列哪几只。不碰 DOM。 */
(function () {
  const LM = () => window.BC_LOCALMODELS;

  const STEPS = [
    {k: 'welcome', label: '欢迎'},
    {k: 'asr', label: '语音识别'},
    {k: 'tts', label: '语音合成'},
  ];
  /* 推荐的转录模型：所有平台的默认转写模型包都是 MOSS Transcribe（packages/models bundle-registry.ts
     DEFAULT_TRANSCRIBE_BUNDLE / DEFAULT_CANDLE_TRANSCRIBE_BUNDLE），转录时自己区分说话人 */
  const RECOMMENDED_ASR = 'moss-transcribe';
  /* 语音合成那一步举的例子：三种出声方式各一只（预设音色 / 克隆 / 多语言），都可商用；只介绍，不在引导里下载 */
  const TTS_HIGHLIGHTS = ['qwen3-tts-1.7b-customvoice', 'qwen3-tts-0.6b-base', 'voxcpm2'];
  /* 随应用附带、全新安装也在盘上的模型（data.js 的人物定位：体积小到进安装包） */
  const BUNDLED = ['vision-person'];

  /** 已经有记录（走完或跳过）就不再弹：只在第一次启动出现 */
  const decided = (record) => !!record && (record.state === 'done' || record.state === 'skipped');
  const shouldShow = (record) => !decided(record);
  /* 原型里「第一次启动」由 `?onboarding=1` 或原型开关模拟；`?onboarding=installed` 演示从旧版接续了模型目录的第一次启动 */
  const demoParam = (search) => new URLSearchParams(search || '').get('onboarding');
  const demoLaunch = (search) => demoParam(search) === '1' || demoParam(search) === 'installed';
  const demoFresh = (search) => demoParam(search) === '1';

  /**
   * 关掉引导时记下的偏好。`how`：'done' 走到最后一步关掉，其余（跳过、Esc、关闭按钮、半路去了别处）都是 'skipped'；
   * `step` 是关掉时停在哪一步，`asr` 是这次引导里开始下载的转录模型（没下为 null；本来就装好的不算）。
   */
  function record(how, step, asr) {
    return {state: how === 'done' ? 'done' : 'skipped', step: step || STEPS[0].k, asr: asr || null};
  }

  function recordText(rec) {
    if (!decided(rec)) return '没有记录';
    const step = (STEPS.find((s) => s.k === rec.step) || STEPS[0]).label;
    return (rec.state === 'done' ? '已走完' : `在「${step}」跳过`) + (rec.asr ? ` · 下载了 ${rec.asr}` : '');
  }

  /**
   * 转录模型的候选：设置里语音识别类的模型（不含「说话人区分」这类辅助包），推荐的排第一，其余按目录顺序。
   * `speakers` 来自 data.js 的转录模型表：'builtin' 自己区分说话人，'pack' 要另装「说话人区分」。
   */
  function asrChoices(models, speakers) {
    const list = (models || []).filter((m) => (m.cat || 'asr') === 'asr' && !m.pack && m.supported !== false);
    const rec = list.filter((m) => m.id === RECOMMENDED_ASR);
    return rec.concat(list.filter((m) => m.id !== RECOMMENDED_ASR)).map((m) => ({
      m,
      recommended: m.id === RECOMMENDED_ASR,
      speakers: (speakers || {})[m.id] || 'pack',
    }));
  }

  /** 一只候选的副题：区分说话人的方式 */
  const asrNote = (c) => (c.speakers === 'builtin' ? '转录同时区分说话人' : '要区分说话人，另装「说话人区分」');

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

  /** 打开引导时默认选哪只：已经能用的第一只（从旧版接续了模型目录时就是它），没有就选推荐的 */
  function initialPick(choices, comps, on) {
    const ready = (choices || []).find((c) => LM().ready(c.m, comps, on));
    if (ready) return ready.m.id;
    const rec = (choices || []).find((c) => c.recommended);
    return rec ? rec.m.id : ((choices || [])[0] || {m: {}}).m.id || null;
  }

  /**
   * 选中这只要下什么：[{id, name, size}]（权重在前，缺的组件随后）与合计 MB。
   * 「模型权重」带上模型名，跟在后面的组件就不会被当成可选项。
   */
  function plan(m, comps, on) {
    if (!m) return {parts: [], total: 0};
    const parts = LM().missing(m, comps, on).map((p) => (p.weights ? Object.assign({}, p, {name: m.name}) : p));
    return {parts, total: parts.reduce((n, p) => n + p.size, 0)};
  }

  /** 选中那只下面的一行：「一起下载：MOSS Transcribe 1.7 GB · 声纹嵌入 26.5 MB」；什么都不缺时 null */
  function planLine(p) {
    if (!p.parts.length) return null;
    return '一起下载：' + p.parts.map((x) => `${x.name} ${LM().mb(x.size)}`).join(' · ');
  }

  /** 转录这一步的主按钮：装好了或已在下就往下走；否则写要下多少（带省略号：后面还有下载确认框） */
  function asrPrimary(p, downloading) {
    if (downloading || !p.parts.length) return {kind: 'next', label: '下一步'};
    return {kind: 'download', label: `下载 ${LM().mb(p.total)}…`};
  }

  /** 语音合成那一步的例子：只列目录里有的，顺序照 TTS_HIGHLIGHTS */
  function ttsHighlights(models) {
    return TTS_HIGHLIGHTS.map((id) => (models || []).find((m) => m.id === id)).filter(Boolean);
  }

  const api = {STEPS, RECOMMENDED_ASR, TTS_HIGHLIGHTS, BUNDLED, decided, shouldShow, demoLaunch, demoFresh, record, recordText,
    asrChoices, asrNote, installTable, freshInstalled, initialPick, plan, planLine, asrPrimary, ttsHighlights};
  if (typeof window !== 'undefined') window.BC_ONBOARDING = api;
  if (typeof module !== 'undefined') module.exports = api;
})();

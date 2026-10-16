/* 首次启动引导（2026-10-16 用户要求；步骤、记录与算法在 model-onboarding.js）。只在 App 入口挂（main.jsx），Web 不加载。
   一个 S2 对话框，顶上是步骤条，三步：
   - 欢迎：一句话说 BaoCut 做什么，预告接下来准备哪两类本机模型。
   - 语音识别：单选一只转录模型（推荐 MOSS Transcribe），写清这次要下多少、连带哪些组件；「下载 …」先过同一个下载确认框
     （download-dialog.jsx：来源、存放位置、许可），确认后进度就在这一行，可以直接往下走，下载在后台继续。
   - 语音合成：只介绍，不下载——举三只模型各一句能做什么，主按钮去 工具 › 生成语音，用到哪只在那里再下。
   跳过、Esc、走完或半路去设置，都写一条记录（偏好 `onboarding`），以后启动不再弹。 */
(function () {
  const {useState, useEffect, useRef} = React;
  const S = window.RSP;
  const OB = window.BC_ONBOARDING;
  const LM = window.BC_LOCALMODELS;
  const D = window.BC_DATA;
  const mb = (n) => LM.mb(n);

  /** 一只转录模型的单选卡：名称 + 推荐、右边是状态（已安装 / 进度 / 要下多少），下面一句区分说话人的方式；选中时再写这次一起下哪几件 */
  function AsrCard({c, sel, on, comps, pct, busy, onPick}) {
    const {m} = c;
    const ready = LM.ready(m, comps, on);
    const half = LM.half(m, comps, on);
    const p = OB.plan(m, comps, on);
    const line = sel && pct < 0 ? OB.planLine(p) : null;
    return (
      <div className={cx('onb-model', sel && 'is-on', busy && !sel && 'is-off')} onClick={busy ? undefined : onPick}>
        <span className="onb-model__hd">
          <S.Radio value={m.id}>{m.name}</S.Radio>
          {c.recommended ? <Chip tone="accent">推荐</Chip> : null}
          <span className="grow" />
          {pct >= 0 ? <span className="onb-model__pg"><Progress value={pct} thin label={`正在下载 ${m.name}`} /><span className="t-detail-xs t-mono">{Math.round(pct)}%</span></span>
            : ready ? <span className="onb-model__ok"><Ic n="ok" className="ic--14" />已安装</span>
            : <span className="t-detail-xs">{half ? '缺组件 · ' : ''}{mb(p.total)}</span>}
        </span>
        <span className="onb-model__desc">{OB.asrNote(c)}</span>
        {line ? <span className="onb-model__plan">{line}</span> : null}
      </div>
    );
  }

  function OnboardingAsk({app}) {
    const fresh = !!app.onboarding.fresh;
    const models = D.setModels;
    const comps = D.setComponents;
    const [step, setStep] = useState(0);
    const [got, setGot] = useState([]);          // 这次引导里下好或正在下的部分（安装表用）
    const [started, setStarted] = useState(null); // 这次引导里开始下载的转录模型
    const speakers = {};
    ((D.models || {}).local || []).forEach((m) => { speakers[m.id] = m.speakers; });
    const choices = OB.asrChoices(models, speakers);
    const on = OB.installTable(models, comps, app.modelInstalled, fresh, got);
    const [pick, setPick] = useState(() => OB.initialPick(choices, comps, on));
    const picked = choices.find((c) => c.m.id === pick) || null;
    const pctOf = (id) => (app.modelDl && id in app.modelDl ? app.modelDl[id] : -1);
    const downloading = !!started && pctOf(started) >= 0;
    const k = OB.STEPS[step].k;

    // 引导里开始的下载走完了（store 把模型记成已装）：说一声，人可能已经翻到下一步
    const doneSaid = useRef(false);
    useEffect(() => {
      if (!started || doneSaid.current || pctOf(started) >= 0 || !app.modelInstalled(started)) return;
      doneSaid.current = true;
      const m = models.find((x) => x.id === started);
      app.toast(`已下载「${m ? m.name : started}」，可以开始转录了`, 'positive');
    });

    const close = (how, after) => {
      app.closeOnboarding(OB.record(how, k, started));
      if (after) after();
    };
    const download = () => {
      if (!picked) return;
      const m = picked.m;
      window.askModelDownload(app, m.id, (outcome) => {
        const failed = outcome && outcome.failed;
        if (failed) {
          // 下好的部分留着（与设置里同一种「缺部分组件」），补齐在 设置 › 语音识别
          setGot((g) => g.concat(outcome.done));
          if (outcome.done.indexOf(m.id) >= 0) app.setModelInstalled(m.id, true);
          app.toast(`「${m.name}」没下完：${failed.name}没下成，可以在设置 › 语音识别里补齐`, 'negative');
          return;
        }
        setGot((g) => g.concat(LM.missing(m, comps, on).map((x) => x.id).filter((id) => id !== m.id)));
        setStarted(m.id);
        app.downloadModel(m.id);
      }, {on});
    };

    const plan = OB.plan(picked && picked.m, comps, on);
    const primary = OB.asrPrimary(plan, downloading);
    const tts = OB.ttsHighlights(models);
    const ttsCount = models.filter((m) => m.cat === 'tts').length;

    return (
      <S.DialogContainer onDismiss={() => close('esc')}>
        <S.Dialog size="L" aria-label="欢迎使用 BaoCut">
          <S.Heading slot="title">
            {k === 'welcome' ? '欢迎使用 BaoCut' : k === 'asr' ? '下载语音识别模型' : '还能在本机生成语音'}
          </S.Heading>
          <S.Content>
            <Steps items={OB.STEPS} cur={step} label="引导步骤" className="onb-steps" />

            {k === 'welcome' ? (
              <div className="onb-welcome">
                <img className="onb-welcome__icon" src="assets/app-icon.svg" alt="" />
                <p className="onb-lead">说出想做的视频，智能体帮你转录、加字幕、翻译、配音和剪辑；你也可以在编辑器里自己动手。</p>
                <p className="onb-lead">先花一分钟把本机模型准备好：</p>
                <ul className="onb-preview">
                  <li><Ic n="mic" className="ic--20" /><span><b>语音识别</b>转录、加字幕和剪口播都要用，建议现在下载。</span></li>
                  <li><Ic n="wave" className="ic--20" /><span><b>语音合成</b>把文字念出来、克隆声音、翻译配音，用到时再下载。</span></li>
                </ul>
                <p className="onb-note"><Ic n="lock" className="ic--14" />本机模型在这台电脑上运行，你的音视频不用上传。</p>
              </div>
            ) : null}

            {k === 'asr' ? (
              <div className="onb-asr">
                <p className="onb-lead">转录、加字幕和剪口播，都要先把说的话转成文字。模型装在这台电脑上，不联网也能用。</p>
                <S.RadioGroup aria-label="语音识别模型" value={pick || ''} onChange={setPick} isDisabled={downloading}
                  UNSAFE_className="onb-models">
                  {choices.map((c) => (
                    <AsrCard key={c.m.id} c={c} sel={c.m.id === pick} on={on} comps={comps}
                      pct={pctOf(c.m.id)} busy={downloading} onPick={() => setPick(c.m.id)} />
                  ))}
                </S.RadioGroup>
                <p className="onb-note">
                  {downloading
                    ? '下载在后台继续，关掉这个窗口也不会中断；进度也能在设置 › 语音识别里看到。'
                    : '下载前会先列出来源和存放位置，确认后才开始。以后可以在设置 › 语音识别里增删模型。'}
                </p>
                <p className="onb-note onb-alt">
                  不想下载？也可以添加 API 提供方，用云端识别。
                  <Btn size="s" variant="quiet" onClick={() => close('skip', () => app.go({r: 'settings', sec: 'asr'}))}>去设置</Btn>
                </p>
              </div>
            ) : null}

            {k === 'tts' ? (
              <div className="onb-tts">
                <p className="onb-lead">语音合成模型能把文字念出来、用一段录音克隆声音，也能给视频翻译配音。它们同样在本机运行，用到哪只再下载哪只，不必现在装。</p>
                <ul className="onb-tts__list" aria-label="语音合成模型举例">
                  {tts.map((m) => {
                    const b = window.BC_TTS ? window.BC_TTS.modelBrief(m.id) : null;
                    const ready = LM.ready(m, comps, on);
                    return (
                      <li key={m.id} className="onb-tts__item">
                        <span className="onb-tts__hd">
                          <span className="onb-tts__nm">{m.name}</span>
                          <span className="grow" />
                          {ready ? <span className="onb-model__ok"><Ic n="ok" className="ic--14" />已安装</span>
                            : <span className="t-detail-xs">{mb(m.size)}</span>}
                        </span>
                        <span className="onb-model__desc">{b ? b.summary : m.note}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="onb-note onb-alt">
                  一共 {ttsCount} 只，另有情绪可调、按描述造声音的模型。
                  <Btn size="s" variant="quiet" onClick={() => close('done', () => app.go({r: 'settings', sec: 'tts'}))}>查看全部</Btn>
                </p>
                <div className="onb-where">
                  <Ic n="wave" className="ic--20" />
                  <div>
                    <b>在 工具 › 生成语音 里用</b>
                    <p>写一段文字，或选 Space 里的文档、字幕，挑模型和音色就能生成。还没装的模型在那里直接下载。</p>
                  </div>
                </div>
              </div>
            ) : null}
          </S.Content>
          <S.ButtonGroup>
            {k === 'welcome' ? <>
              <Btn variant="secondary" onClick={() => close('skip')}>跳过</Btn>
              <Btn variant="accent" autoFocus onClick={() => setStep(1)}>开始</Btn>
            </> : null}
            {k === 'asr' ? <>
              {primary.kind === 'download' ? <Btn variant="secondary" onClick={() => setStep(2)}>以后再说</Btn> : null}
              <Btn variant="accent" autoFocus onClick={() => (primary.kind === 'download' ? download() : setStep(2))}>{primary.label}</Btn>
            </> : null}
            {k === 'tts' ? <>
              <Btn variant="secondary" onClick={() => close('done')}>完成</Btn>
              <Btn variant="accent" autoFocus onClick={() => close('done', () => app.go({r: 'tools', id: 'tts'}))}>打开生成语音</Btn>
            </> : null}
          </S.ButtonGroup>
        </S.Dialog>
      </S.DialogContainer>
    );
  }

  /* 关着的时候整个卸载：每次（原型里模拟的）启动都从第一步开始 */
  function OnboardingDialog() {
    const app = useApp();
    return app.onboarding ? <OnboardingAsk app={app} /> : null;
  }

  /* 原型开关里的一段（shell.jsx 委托到这里，不属于产品 UI）：模拟一次第一次启动（全新安装 / 已有模型）、清掉记录。
     模拟启动先收起原型开关（`onLaunch`），不然引导会叠在它下面 */
  function OnboardingTweaks({onLaunch}) {
    const app = useApp();
    const launch = (fresh) => { if (onLaunch) onLaunch(); app.launchOnboarding(fresh); };
    return (
      <div className="tweaks__sec">
        <div className="tweaks__lb">首次启动引导<em>只在第一次启动弹，关掉就记下、不再弹。「模拟」先清掉记录（全新安装还把本机模型改成没装）；地址带 ?onboarding=1 或 =installed 也能模拟，但有记录时不弹。当前记录：{OB.recordText(app.prefs.onboarding)}</em></div>
        <div className="tweaks__rad">
          <BCAction className="tweaks__opt" onClick={() => launch(true)}>模拟 · 全新安装</BCAction>
          <BCAction className="tweaks__opt" onClick={() => launch(false)}>模拟 · 已有模型</BCAction>
          <BCAction className="tweaks__opt" onClick={() => app.setPref('onboarding', null)}>清除记录</BCAction>
        </div>
      </div>
    );
  }

  Object.assign(window, {OnboardingDialog, OnboardingTweaks});
})();

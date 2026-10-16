/* 首次启动引导（2026-10-16 用户要求；步骤、记录与算法在 model-onboarding.js）。只在 App 入口挂（main.jsx），Web 不加载。
   一个 S2 对话框，顶上是步骤条，六步：
   - 连接 Agent：一句欢迎，然后是这台电脑上的 Agent，每家一张 设置 › Agent 提供方 的卡（settings-agent-provider.jsx），
     安装、登录、排查都在卡里就地做，不用离开引导。
   - 语音识别：单选一只转录模型（推荐 MOSS Transcribe）。
   - 语音合成、图像生成、音乐生成：多选，写清这次要下多少、连带哪些组件，以及在工具里哪儿用。
   - 语义搜索：一个包（文字模型 + 多模态模型 + 运行时）。
   要下载的都先过同一个下载确认框（download-dialog.jsx：来源、存放位置、许可）；确认后每只模型成为一条后台任务，
   引导立刻翻到下一步，不等下完。底部一行写这次开始的下载在后台走到哪了。
   每一步都可以「跳过」；左下角「退出引导」与 Esc 随时退出（不用右上角的 ×：S2 的可关闭对话框会藏掉 ButtonGroup，同 space-viewer.jsx）。
   任何一种关掉都写一条记录（偏好 `onboarding`），以后启动不再弹。 */
(function () {
  const {useState} = React;
  const S = window.RSP;
  const OB = window.BC_ONBOARDING;
  const LM = window.BC_LOCALMODELS;
  const D = window.BC_DATA;
  const AS = window.BC_AGENT_SETUP;
  const mb = (n) => LM.mb(n);

  /* 每一步的标题与开头一句 */
  const HEAD = {
    agent: '欢迎使用 BaoCut',
    asr: '下载语音识别模型',
    tts: '下载语音合成模型',
    semantic: '安装语义搜索',
    image: '下载图像生成模型',
    music: '下载音乐生成模型',
  };
  const LEAD = {
    asr: '转录、加字幕和剪口播，都要先把说的话转成文字。模型装在这台电脑上，不联网也能用。',
    tts: '语音合成模型能把文字念出来、用一段录音克隆声音，也能给视频翻译配音。挑一两只先下，其余以后在 设置 › 语音合成 里下。',
    semantic: '按意思找讲话内容和画面：Space 搜索、写作按主题选材、配画面、翻译记忆都用它。装好后在后台给已有的视频建索引。',
    image: '在本机按一句话生成图片，做封面、配图都行。模型很大，生成也慢。',
    music: '在本机按风格或歌词生成配乐和歌曲，结果可以直接加到视频的音乐轨。生成很慢，30 秒约要几分钟。',
  };
  /* 下好之后在哪儿用（只写工具页里有入口的那几类） */
  const WHERE = {
    tts: {icon: 'wave', title: '在 工具 › 生成语音 里用', body: '写一段文字，或选 Space 里的文档、字幕，挑模型和音色就能生成。没装的模型在那里也能下载。'},
    image: {icon: 'image', title: '在 工具 › 生成图片 里用', body: '写一句描述就能出图；Agent 做封面时也会用它。'},
    music: {icon: 'music', title: '在 工具 › 生成音乐 里用', body: '选风格、写歌词，生成的音乐存进 Space，可以加到视频里。'},
  };
  const BG_NOTE = '下载前会先列出来源和存放位置，确认后才开始；下载在后台进行，不用等下完。';

  function Where({w}) {
    return (
      <div className="onb-where">
        <Ic n={w.icon} className="ic--20" />
        <div><b>{w.title}</b><p>{w.body}</p></div>
      </div>
    );
  }

  /** 一张模型卡：单选（转录）或多选；右边是状态（已安装 / 进度 / 要下多少），下面一句说明，选中时再写这次一起下哪几件 */
  function ModelCard({m, mode, sel, recommended, note, ready, half, total, pct, line, onToggle}) {
    // 点在勾选框 / 单选钮自己的 label 上时交给它，不然点一下会切两次；已经在下的不再切
    const click = (e) => { if (pct < 0 && !e.target.closest('label')) onToggle(); };
    return (
      <div className={cx('onb-model', sel && 'is-on')} onClick={click}>
        <span className="onb-model__hd">
          {mode === 'one' ? <S.Radio value={m.id}>{m.name}</S.Radio>
            : pct >= 0 ? <span className="onb-model__nm">{m.name}</span>
            : <Checkbox on={sel} onChange={onToggle} label={m.name} />}
          {recommended ? <Chip tone="accent">推荐</Chip> : null}
          {OB.nonCommercial(m) ? <Chip tone="notice">仅限非商用</Chip> : null}
          <span className="grow" />
          {pct >= 0 ? <span className="onb-model__pg"><Progress value={pct} thin label={`正在下载 ${m.name}`} /><span className="t-detail-xs t-mono">{Math.round(pct)}%</span></span>
            : ready ? <span className="onb-model__ok"><Ic n="ok" className="ic--14" />已安装</span>
            : <span className="t-detail-xs">{half ? '缺组件 · ' : ''}{mb(total)}</span>}
        </span>
        {note ? <span className="onb-model__desc">{note}</span> : null}
        {line ? <span className="onb-model__plan">{line}</span> : null}
      </div>
    );
  }

  /** 第一步：这台电脑上的 Agent。状态一句话 + 每家一张卡（安装 / 登录 / 排查都在卡里）。
      已经有能用的时，没装的几家先收起来，免得一屏都是「未安装」 */
  function AgentStep({app, ov}) {
    const [open, setOpen] = useState(null);
    const ok = ov.state === 'ready';
    const [all, setAll] = useState(!ok);
    const main = AS.groups(app.harnessList).main;
    const shown = all ? main : main.filter((h) => h.found);
    const hidden = main.length - shown.length;
    return (
      <div className="onb-agent">
        <p className="onb-lead">说出想做的视频，Agent 帮你转录、加字幕、翻译、配音和剪辑。BaoCut 调用这台电脑上已经装好的 Agent（比如 Claude Code、Codex），用你自己的账号，不另外收费。</p>
        <div className={cx('onb-status', ok && 'is-ok')} role="status">
          <Ic n={ok ? 'ok' : ov.state === 'missing' ? 'info' : 'alert'} className="ic--16" />
          <div>
            <b>{ok ? `已连接 ${ov.harness.name}` : ov.title}</b>
            <p>{ok ? `新会话默认用 ${ov.harness.name} · ${AS.modelLabel(ov.harness, app.prefs.agentModels)}。` : ov.body}</p>
          </div>
        </div>
        <Card layer className="agset-providers onb-agents">
          {shown.map((h) => (
            <window.AgentProviderCard key={h.id} h={h} isDefault={!!ov.harness && ov.harness.id === h.id && ok}
              open={open === h.id} onToggle={() => setOpen(open === h.id ? null : h.id)}
              onRefreshModels={() => {}} failRun={false} onRemove={null} />
          ))}
        </Card>
        <p className="onb-note">
          有一个能用就够；以后在 设置 › Agent 提供方 里换默认、装更多。
          {hidden ? <Btn size="s" variant="quiet" onClick={() => setAll(true)}>{`还有 ${hidden} 个可以装`}</Btn> : null}
        </p>
      </div>
    );
  }

  /* 语义搜索包的下载：不在引导组件里跑（引导关掉也得接着走），落一条后台任务，走完把状态改成装好 */
  function runSemInstall(app, pkg) {
    const tid = app.addTask({kind: 'model-install', title: `下载「${pkg.name}」`, sub: '本机模型', phase: '下载中', cancellable: false});
    let pct = 0;
    const timer = setInterval(() => {
      pct = Math.min(100, pct + 9);
      if (pct < 100) { app.patchTask(tid, {pct}); return; }
      clearInterval(timer);
      app.patchTask(tid, {pct: 100, status: 'done', phase: null});
      window.BC_SEMSTATE.set({install: 'full', index: 'stale', half: null});
    }, 200);
    return tid;
  }

  function OnboardingAsk({app}) {
    const fresh = !!app.onboarding.fresh;
    const models = D.setModels;
    const comps = D.setComponents;
    const [semSt] = window.BC_SEMSTATE.useSemantic();
    const [step, setStep] = useState(0);
    const [got, setGot] = useState([]);       // 这次引导里下好或正在下的组件（安装表用，后面几步不重复算）
    const [queued, setQueued] = useState([]); // 这次引导里开始的下载：[{id, name, tid}]
    const [picks, setPicks] = useState({});   // 每一步的勾选：第一次翻到时按默认值起，之后记住
    const [semPick, setSemPick] = useState(true);
    const speakers = {};
    ((D.models || {}).local || []).forEach((m) => { speakers[m.id] = m.speakers; });
    const on = OB.installTable(models, comps, app.modelInstalled, fresh, got);
    const k = OB.STEPS[step].k;
    const s = OB.stepOf(k);
    const list = OB.choices(k, models, speakers);
    const cur = picks[k] || OB.initialPicks(k, list, comps, on);
    const setCur = (ids) => setPicks((p) => ({...p, [k]: ids}));
    const toggle = (id) => (s.pick === 'one' ? setCur([id]) : setCur(cur.indexOf(id) >= 0 ? cur.filter((x) => x !== id) : cur.concat([id])));
    const pctOf = (id) => (app.modelDl && id in app.modelDl ? app.modelDl[id] : -1);
    const ov = AS.overview(app.harnessList, app.harness && app.harness.id);

    const pkg = ((D.semantic || {}).packages || [])[0];
    const semUnsupported = semSt.platform === 'unsupported';
    const semInstalled = semSt.install !== 'none';
    const semQueued = !!pkg && queued.some((q) => q.id === pkg.id);
    const semHave = semSt.half && pkg && semSt.half.pkg === pkg.id ? semSt.half.have : [];
    const semPlan = OB.pkgPlan(pkg, semInstalled || semUnsupported || semQueued);
    const semNeed = {parts: semPlan.parts.filter((x) => semHave.indexOf(x.id) < 0)};
    semNeed.total = semNeed.parts.reduce((n, x) => n + x.size, 0);

    // 这一步要下什么：勾上的、还没装好、也不在下的
    const want = list.filter((c) => cur.indexOf(c.m.id) >= 0 && pctOf(c.m.id) < 0 && !LM.ready(c.m, comps, on)).map((c) => c.m);
    const plan = k === 'semantic' ? (semPick ? semNeed : {parts: [], total: 0}) : OB.plan(want, comps, on);
    const primary = OB.primary(k, plan);

    const taskOf = (q) => (app.tasks || []).find((t) => t.id === q.tid);
    const close = (how, started) => {
      const extra = started || [];
      app.closeOnboarding(OB.record(how, k, queued.map((q) => q.id).concat(extra)));
      const live = queued.filter((q) => { const t = taskOf(q); return !t || t.status === 'running'; }).length + extra.length;
      if (live) app.toast(`${live} 个模型在后台下载，下完就能用`, 'positive', {label: '查看后台任务', run: () => app.go({r: 'tasks'})});
    };
    const next = (started) => { if (OB.isLast(k)) close('done', started); else setStep(step + 1); };

    const downloadSem = () => {
      const have = {};
      semHave.forEach((id) => { have[id] = true; });
      window.BC_DLASK.open({
        name: pkg.name, parts: pkg.parts, on: have, perPart: true,
        run: (outcome) => {
          const failed = outcome && outcome.failed;
          if (failed) {
            app.addTask({kind: 'model-install', title: `下载「${pkg.name}」`, sub: '本机模型', status: 'error', pct: null,
              error: `${failed.name}没下成，可以在 设置 › 语义索引 里补齐`});
            app.toast(`「${pkg.name}」没下完：${failed.name}没下成`, 'negative');
            next();
            return;
          }
          setQueued((q) => q.concat([{id: pkg.id, name: pkg.name, tid: runSemInstall(app, pkg)}]));
          next([pkg.id]);
        },
      });
    };
    const download = () => {
      if (k === 'semantic') { downloadSem(); return; }
      const ids = want.map((m) => m.id);
      window.askModelDownload(app, ids, (outcome) => {
        const failed = outcome && outcome.failed;
        if (failed) {
          // 下好的部分留着（与设置里同一种「缺部分组件」）；没下成的落一条失败的后台任务，补齐在设置里
          setGot((g) => g.concat(outcome.done));
          want.forEach((m) => { if (outcome.done.indexOf(m.id) >= 0) app.setModelInstalled(m.id, true); });
          app.addTask({kind: 'model-install', title: `下载「${want.map((m) => m.name).join('、')}」`, sub: '本机模型', status: 'error', pct: null,
            error: `${failed.name}没下成，可以在设置里补齐`});
          app.toast(`没下完：${failed.name}没下成，详情在后台任务里`, 'negative');
          next();
          return;
        }
        setGot((g) => g.concat(plan.parts.map((x) => x.id).filter((id) => ids.indexOf(id) < 0)));
        const items = want.map((m) => ({id: m.id, name: m.name, tid: app.downloadModel(m.id)}));
        setQueued((q) => q.concat(items));
        next(ids);
      }, {on});
    };

    const bg = OB.bgLine(queued.map((q) => {
      const t = taskOf(q);
      return {name: q.name, pct: t ? t.pct : 0, status: t ? t.status : 'running'};
    }));

    const cards = list.map((c) => {
      const sel = cur.indexOf(c.m.id) >= 0;
      const p = OB.plan([c.m], comps, on);
      const pct = pctOf(c.m.id);
      return <ModelCard key={c.m.id} m={c.m} mode={s.pick} sel={sel} recommended={c.recommended} note={c.note}
        ready={LM.ready(c.m, comps, on)} half={LM.half(c.m, comps, on)} total={p.total} pct={pct}
        line={sel && pct < 0 ? OB.planLine(p) : null} onToggle={() => toggle(c.m.id)} />;
    });
    const unsupported = (what) => <p className="onb-note"><Ic n="info" className="ic--14" />这台电脑不支持本机{what}，这一步可以直接跳过。</p>;

    return (
      <S.DialogContainer onDismiss={() => close('esc')}>
        <S.Dialog size="L" aria-label="欢迎使用 BaoCut">
          <S.Heading slot="title">{HEAD[k]}</S.Heading>
          <S.Content>
            <Steps items={OB.STEPS} cur={step} label="引导步骤" className="onb-steps" />

            {k === 'agent' ? <AgentStep app={app} ov={ov} /> : null}

            {s.cat ? (
              <div className="onb-pick">
                <p className="onb-lead">{LEAD[k]}</p>
                {!list.length ? unsupported(s.label)
                  : s.pick === 'one' ? (
                    <S.RadioGroup aria-label={HEAD[k]} value={cur[0] || ''} onChange={(id) => setCur([id])} UNSAFE_className="onb-models">
                      {cards}
                    </S.RadioGroup>
                  ) : <div className="onb-models" role="group" aria-label={HEAD[k]}><div>{cards}</div></div>}
                {WHERE[k] && list.length ? <Where w={WHERE[k]} /> : null}
                {list.length ? <p className="onb-note">{BG_NOTE}</p> : null}
                {k === 'asr' ? <p className="onb-note onb-alt">不想下载？也可以以后在 设置 › API 提供方 里添加云端识别。</p> : null}
              </div>
            ) : null}

            {k === 'semantic' && pkg ? (
              <div className="onb-pick">
                <p className="onb-lead">{LEAD.semantic}</p>
                {semUnsupported ? unsupported('语义搜索') : <>
                  <div className="onb-models"><div>
                    <div className={cx('onb-model', semPick && !semInstalled && !semQueued && 'is-on')}
                      onClick={(e) => { if (!semInstalled && !semQueued && !e.target.closest('label')) setSemPick(!semPick); }}>
                      <span className="onb-model__hd">
                        {semInstalled || semQueued ? <span className="onb-model__nm">{pkg.name}</span>
                          : <Checkbox on={semPick} onChange={setSemPick} label={pkg.name} />}
                        <Chip tone="accent">推荐</Chip>
                        <span className="grow" />
                        {semInstalled ? <span className="onb-model__ok"><Ic n="ok" className="ic--14" />已安装</span>
                          : semQueued ? <span className="t-detail-xs">在后台下载</span>
                          : <span className="t-detail-xs">{semHave.length ? '缺组件 · ' : ''}{mb(semNeed.total)}</span>}
                      </span>
                      <span className="onb-model__desc">{pkg.model}</span>
                      {semPick && semNeed.parts.length
                        ? <span className="onb-model__plan">{'一起下载：' + semNeed.parts.map((x) => `${x.name} ${mb(x.size)}`).join(' · ')}</span> : null}
                    </div>
                  </div></div>
                  {semInstalled ? null : <p className="onb-note">{BG_NOTE}</p>}
                </>}
              </div>
            ) : null}
          </S.Content>
          <S.Footer>
            <div className="onb-foot">
              <Btn variant="quiet" onClick={() => close('exit')}>退出引导</Btn>
              {bg ? <span className="onb-bg" role="status"><Ic n="download" className="ic--14" />{bg}</span> : null}
            </div>
          </S.Footer>
          <S.ButtonGroup>
            {k === 'agent'
              ? <Btn variant={ov.state === 'ready' ? 'accent' : 'secondary'} autoFocus onClick={() => next()}>{ov.state === 'ready' ? '下一步' : '跳过'}</Btn>
              : <>
                {primary.kind === 'download' ? <Btn variant="secondary" onClick={() => next()}>跳过</Btn> : null}
                <Btn variant="accent" autoFocus onClick={() => (primary.kind === 'download' ? download() : next())}>{primary.label}</Btn>
              </>}
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

  /* 原型开关里的一段（shell.jsx 委托到这里，不属于产品 UI）：模拟一次第一次启动（全新安装 / 老用户升级）、清掉记录。
     模拟启动先收起原型开关（`onLaunch`），不然引导会叠在它下面 */
  function OnboardingTweaks({onLaunch}) {
    const app = useApp();
    const launch = (fresh) => { if (onLaunch) onLaunch(); app.launchOnboarding(fresh); };
    return (
      <div className="tweaks__sec">
        <div className="tweaks__lb">首次启动引导<em>第一次启动弹一次（老用户升级到这一版也弹一次），走完或退出都记下、不再弹。「模拟」先清掉记录（全新安装还把本机模型与语义搜索改成没装）；地址带 ?onboarding=1 或 =installed 也能模拟，但有记录时不弹。当前记录：{OB.recordText(app.prefs.onboarding)}</em></div>
        <div className="tweaks__rad">
          <BCAction className="tweaks__opt" onClick={() => launch(true)}>模拟 · 全新安装</BCAction>
          <BCAction className="tweaks__opt" onClick={() => launch(false)}>模拟 · 老用户升级</BCAction>
          <BCAction className="tweaks__opt" onClick={() => app.setPref('onboarding', null)}>清除记录</BCAction>
        </div>
      </div>
    );
  }

  Object.assign(window, {OnboardingDialog, OnboardingTweaks});
})();

/* BaoCut 原型 — 项目详情框（§8.1 / §17.3，第 233 轮）
   两个入口共用这一个框：编辑器顶栏点标题旁的 ⓘ，视频卡 ⋯ 菜单选「视频详情…」。
   行的装配全在 [model-project-info.js](model-project-info.js)，这一层只负责铺。

   上半只读、下半可编辑，是因为这两半的真相来源不同：只读那些是媒体与转录**已经
   发生**的事实（路径、时长、分辨率、模型、说话人数），改不了；可编辑那四项是用户
   自己写在项目上的字，随手改随手存。中间不放分隔线也不放分区标题——两半的排版差别
   （label/值 vs 输入框）已经说清了它们不是一类东西。

   「复制全部」复制的是**屏幕上这些行**，一字不多一字不少（`copyText`）：用户要把
   一段视频的来龙去脉贴进工单、贴给同事、贴回 Agent 会话，逐行手抄是最没道理的事。
   唯一的例外是 hero 那行的文件名——屏幕上它可能中间省略，复制走完整值。

   「位置」行尾有一颗「在文件夹中显示」（2026-10-08 用户要求）：看详情时最常接着要做的
   就是去访达 / 资源管理器里找这份文件——尤其是从网址导入的，它落在下载目录里，不在项目
   旁边。只在能交给系统文件管理器的表面画（`BC_SURFACE.reveal`，Web 没有）。
   「原简介」（下载时记下的平台简介）可以很长，限高滚动，不把框撑到一屏以外。

   「视频速览」（2026-10-14）：智能体转录之后写在视频上的观众向说明（视频格式规范 §3.1），只读，排在分区后面、
   可编辑项前面。App 入口按回复正文渲染（AgentMarkdown），时间码点了跳到那一秒并关掉详情框；Web 入口没有 Markdown
   渲染，退成去掉记号的纯文本（`briefPlainText`）。默认只露出五行上下、底下渐隐，点了铺开全文。只在编辑器那条路画：正式版里只有打开的视频手上有快照，视频卡 ⋯ 那条路读不到它。

   红线（这里也不画）：重新关联媒体…。那是项目卡 ⋯ 菜单里已有的入口，详情框不做第二个门。 */
(function () {
  const {useMemo, useRef, useState, useLayoutEffect} = React;
  const T = window.BC_TIME;
  const PI = window.BC_PINFO;

  function Row({r, onReveal}) {
    return (
      <div className="pinfo__row">
        <span className="pinfo__k">{r.label}</span>
        <span className={cx('pinfo__v', r.mono && 't-mono', r.long && 'pinfo__v--long')}>{r.value}</span>
        {r.reveal && onReveal
          ? <IconBtn icon="folder" size="s" className="pinfo__act" tip="在文件夹中显示" onClick={() => onReveal(r.reveal)} />
          : null}
      </div>
    );
  }

  function Section({s, onReveal}) {
    return (
      <div className="pinfo__sec">
        <div className="pinfo__st">{s.title}</div>
        {s.rows.map((r, i) => <Row key={s.title + i} r={r} onReveal={onReveal} />)}
      </div>
    );
  }

  /* 视频速览默认只露出五行上下，底下渐隐；点正文或「展开全文」铺开全文（2026-10-14 用户要求），这次打开框里不再收回。
     本来就不超过这个高度时不收。时间码照常能点（跳过去、关掉框），不算展开；拖选文字也不算。 */
  function Brief({text, onTimeLink}) {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const [over, setOver] = useState(false);
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || open) return undefined;
      const check = () => setOver(el.scrollHeight > el.clientHeight + 1);
      check();
      const ro = new ResizeObserver(check);
      ro.observe(el);
      return () => ro.disconnect();
    }, [open, text]);
    const folded = !open && over;
    const expand = (e) => {
      if (e.target.closest('.wrtime, a, button') || String(window.getSelection() || '')) return;
      setOpen(true);
    };
    // 按钮铺开后就没了：焦点交给正文，不让对话框把它挪到下面的「标题」输入框
    const expandFromButton = () => {
      setOpen(true);
      if (ref.current) ref.current.focus({preventScroll: true});
    };
    return (
      <>
        <div ref={ref} tabIndex={-1} className={cx('pinfo__brief', !open && 'pinfo__brief--clamp', folded && 'is-folded')}
          onClick={folded ? expand : undefined}>
          {window.AgentMarkdown
            ? <window.AgentMarkdown text={text} streaming={false} onTimeLink={onTimeLink} />
            : <div className="pinfo__v">{PI.briefPlainText(text)}</div>}
        </div>
        {folded ? <Btn variant="quiet" size="s" className="pinfo__more" onClick={expandFromButton}>展开全文</Btn> : null}
      </>
    );
  }

  function EditRow({label, value, area, onChange}) {
    return (
      <label className="pinfo__fld">
        <span className="pinfo__fl">{label}</span>
        <Field size="s" area={area} value={value || ''} onChange={(e) => onChange(e.target.value)} />
      </label>
    );
  }

  function ProjectInfoDialog() {
    const app = useApp();
    const info = app.pinfo;
    const p = info ? app.projById(info.id) : null;
    const extras = (info && info.extras) || [];
    const secs = useMemo(() => (p ? PI.sections(p, T.duration(p.duration), extras) : []),
      [p, extras]);
    if (!p) return null;
    const heroName = PI.elideMiddle((p.src && p.src.name) || '', PI.HERO_NAME_MAX);
    const brief = info.editor && p.brief ? PI.expandBriefLinks(p.brief.markdown, p.id) : '';
    const copy = () => {
      const list = secs.concat(PI.detailsSection(p.url, p.desc, p.notes) || []);
      const text = PI.copyText(p.title, PI.heroLine(p), list, brief);
      if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
      app.toast('已复制视频详情', 'positive');
    };
    const reveal = window.BC_SURFACE.reveal ? (path) => app.toast(`已在文件夹中显示 ${path}（演示）`) : null;
    return (
      <Dialog open title="视频详情" width={500} onClose={app.closeProjectInfo}
        footer={[
          <span key="s" className="grow" />,
          <Btn key="c" variant="secondary" onClick={copy}>复制全部</Btn>,
          <Btn key="k" variant="accent" onClick={app.closeProjectInfo}>完成</Btn>,
        ]}>
        <div className="pinfo__hero">
          {window.Thumb ? <window.Thumb p={p} className="pinfo__th" /> : null}
          <div className="grow">
            <div className="pinfo__name t-clamp2">{p.title}</div>
            <div className="t-detail t-truncate" style={{marginTop: 2}}>
              {PI.srcTypeLabel(p)}{heroName ? ' · ' + heroName : ''}
            </div>
          </div>
        </div>
        {secs.map((s) => <Section key={s.title} s={s} onReveal={reveal} />)}
        {brief ? (
          <div className="pinfo__sec">
            <div className="pinfo__st">{PI.SECTION_BRIEF}</div>
            {/* 时间码（`.wrtime`）点了跳到那一秒，同时关掉盖在编辑器上的框 */}
            <Brief text={brief} onTimeLink={app.closeProjectInfo} />
          </div>
        ) : null}
        <div className="pinfo__form">
          <EditRow label="标题" value={p.title} onChange={(v) => app.patchProject(p.id, {title: v})} />
          <EditRow label="网址" value={p.url} onChange={(v) => app.patchProject(p.id, {url: v})} />
          <EditRow label="简介" area value={p.desc} onChange={(v) => app.patchProject(p.id, {desc: v})} />
          <EditRow label="备注" area value={p.notes} onChange={(v) => app.patchProject(p.id, {notes: v})} />
        </div>
      </Dialog>
    );
  }

  Object.assign(window, {ProjectInfoDialog});
})();

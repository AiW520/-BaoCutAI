/* 短视频项目与来源项目的那条链接（product-design §5.10）：项目卡 / 行 / 侧栏上的来源标记、
   子视频编辑器内容区顶上那一条「从「…」切出的短视频」（带「去文稿调整」与进文稿后回去的那一格）、
   来源项目视频 Tab 里「切出的短视频」一组。
   子视频用到原片的哪几段从它自己的剪口派生（model-shorts-cut.js `usedRanges`），这里不再写回。
   这一层是**普通的编辑动作**，不调模型、不起任务，所以 App 与 Web 共用；找片段的那条流程
   （store-shorts-cut / panel-aitools-shorts）只在 App——「切出的短视频」里去往它的两个入口
   （再切几支、调整后再生成）用 `BC_SURFACE.ai` 包着。判据与算术全在 model-shorts-cut.js。 */
(function () {
  const {useState, useEffect} = React;
  const SC = window.BC_SHORTS_CUT;

  /* 徽标会落在项目卡里，而整张卡是一个 button：这里用 role="link" 的 span，不嵌套按钮。 */
  function Link({title, icon, onGo, children}) {
    const go = (e) => { e.stopPropagation(); e.preventDefault(); onGo(); };
    return (
      <span role="link" tabIndex={0} className="ss-origin t-truncate" title={title} onClick={go}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') go(e); }}>
        <Ic n={icon} className="ic--14" /><span className="t-truncate">{children}</span>
      </span>
    );
  }

  /** 项目卡 / 行上的来源徽标：点了打开来源项目并落在切出的那一刻。来源不在库里时只是一行字。 */
  function ShortsOriginBadge({p, short}) {
    const app = useApp();
    const o = SC.originLabel(app.projects, p);
    if (!o) return null;
    const text = short ? o.short : o.text;
    if (o.missing) return <span className="ss-origin is-missing t-truncate" title={text}>{text}</span>;
    return <Link icon="link" title={`${o.text} · 打开来源视频`} onGo={() => app.go({r: 'editor', id: o.parent.id, t: p.origin.in})}>{text}</Link>;
  }

  /** 来源项目卡 / 行上的计数：点了把项目页筛到它切出的那几支。 */
  function ShortsCountBadge({p}) {
    const app = useApp();
    const n = SC.childrenOf(app.projects, p.id).length;
    if (!n) return null;
    return <Link icon="clip" title="查看切出的短视频" onGo={() => app.go({r: 'projects', from: p.id})}>{SC.countLabel(n)}</Link>;
  }

  /** 侧栏项目行的副题：只读的一句「来自「…」」。 */
  function shortsSideNote(projects, p) {
    const o = SC.originLabel(projects, p);
    return o ? o.short : null;
  }

  /** 子视频编辑器内容区顶上的一条（product-design §5.10）：它从哪部视频切出来、「去文稿调整」进文稿调起止；
      「回到原片」去来源视频，那一轮的结果页还在（App 有 AI 工具时摆到前面）。Web 没有结果页，只回来源视频。
      入口那一格看右栏在哪（SC.cutEntryAction，§4.6）：不在文稿是「去文稿调整」；从别的面板跳进文稿的，
      换成「回到结果页」/「回到<那个面板>」；直接落在文稿的，有结果页给「看结果页」，没有就不摆。 */
  function ShortsChildBanner({ctx}) {
    const app = useApp();
    const proj = ctx.proj;
    if (!SC.isChild(proj)) return null;
    const o = SC.originLabel(app.projects, proj);
    const parent = o && !o.missing ? o.parent : null;
    const back = () => {
      if (!parent) return;
      const api = app.shortsCut;
      const result = window.BC_SURFACE.ai && api && api.hasResult(proj.id);
      if (result) api.focusChild(proj.id);
      app.go({r: 'editor', id: parent.id, ...(result ? {tab: 'aitools'} : {})});
    };
    const S = window.BC_SURFACE;
    const result = !!(S.ai && app.shortsCut && app.shortsCut.hasResult(proj.id));
    const from = ctx.cutOrigin && window.BC_DATA.rail.find((r) => r.k === ctx.cutOrigin.tab);
    const entry = SC.cutEntryAction(ctx.tab, ctx.cutOrigin, {hasResult: result, ai: S.ai, railLabel: from ? from.label : null});
    const onEntry = () => {
      if (entry.kind === 'adjust') ctx.openCutEntry();
      else if (entry.kind === 'back') {
        if (entry.to === 'aitools' && result) app.shortsCut.focusChild(proj.id);
        ctx.closeCutEntry();
      } else if (entry.kind === 'result') {
        app.shortsCut.focusChild(proj.id);
        ctx.setTab('aitools'); ctx.setPaneView(null); ctx.setPaneHidden(false);
      }
    };
    return (
      <div className="ss-banner" role="note">
        <Ic n="clip" className="ic--14" />
        <span className="ss-banner__t">
          {parent ? `从「${parent.title}」切出的短视频` : '切出的短视频 · 来源视频已不在视频库'}
        </span>
        {/* 起止在文稿里调（§4.6）：切到文稿、剪辑开关打开、滚到片段前面那条剪缝（editor.jsx openCutEntry）；普通编辑动作，Web 同样有。
            进了文稿这一格换成回去的路（closeCutEntry 回来处）或「看结果页」，都没有就不摆 */}
        {ctx.openCutEntry && entry.kind ? <Btn size="s" variant="secondary" title={entry.tip} onClick={onEntry}>{entry.label}</Btn> : null}
        {parent ? <Btn size="s" variant="secondary" onClick={back}>回到原片</Btn> : null}
      </div>
    );
  }


  /* 「切出的短视频」里的一行：点行打开那一支；⋯ 里是在原片里看这一段、调整后再生成、在项目页里看。 */
  function MadeRow({row, child, ctx, menuOpen, onMenu, onHot}) {
    const app = useApp();
    const S = window.BC_SURFACE;
    const close = () => onMenu(null);
    return (
      <div className="sm-row" onMouseEnter={() => onHot(row.id)} onMouseLeave={() => onHot(null)}>
        <BCAction type="button" className="sm-row__main" title={`打开「${row.title}」`}
          onFocus={() => onHot(row.id)} onBlur={() => onHot(null)} onClick={() => app.go({r: 'editor', id: row.id})}>
          <span className="sm-thumb" aria-hidden="true"><Ic n="play" className="ic--12" /></span>
          <span className="sm-row__t">
            <b className="t-truncate">{row.title}</b>
            <span className="t-mono t-truncate">{row.span} · {row.len}</span>
            <span className="t-truncate">{[row.cut, row.edited ? '剪过' : '', row.modified ? row.modified + '编辑' : ''].filter(Boolean).join(' · ')}</span>
          </span>
        </BCAction>
        <div className="sm-row__menu">
          <IconBtn icon="more" size="s" tip="这一支" on={menuOpen} onClick={() => onMenu(menuOpen ? null : row.id)} />
          <Popover open={menuOpen} onClose={close} align="right" dir="down" width={240}>
            <Menu>
              <MenuItem icon="clip" label="打开这一支" sub="接着剪、改字幕、导出" onClick={() => { close(); app.go({r: 'editor', id: row.id}); }} />
              <MenuItem icon="play" label="在原片里看这一段" sub={`播放头跳到 ${SC.mmss(row.at)}`} onClick={() => { close(); ctx.seek(row.at); }} />
              {S.ai ? (
                <>
                  <MenuRule />
                  <MenuItem icon="redo" label="调整后再生成…" sub="按它的起止和设置另建一支，原来那支不动" onClick={() => { close(); window.shortsCutRedo(app, ctx, child); }} />
                </>
              ) : null}
              {S.pages ? (
                <>
                  <MenuRule />
                  <MenuItem icon="asset" label="在 Space 里看" sub="改名、删除都在那里" onClick={() => { close(); app.go({r: 'projects', from: ctx.proj.id}); }} />
                </>
              ) : null}
            </Menu>
          </Popover>
        </div>
      </div>
    );
  }

  /** 来源项目视频 Tab 里的「切出的短视频」：从这个项目切出的那几支收成一组，可开合。
      新建的排在最上面（刚切完回来先看到的是这一轮的）；默认露出 MADE_SHOWN 行，多的收起，
      「还有 N 支」展开、「收起」收回。行数没有上限（一条长播客可以切出几十支），展开后跟着面板一起滚。 */
  function ShortsMadeGroup({ctx}) {
    const app = useApp();
    const S = window.BC_SURFACE;
    const proj = ctx.proj;
    const kids = SC.madeOrder(SC.childrenOf(app.projects, proj.id));
    const [open, setOpen] = useState(true);
    const [menu, setMenu] = useState(null);
    const [hot, setHot] = useState(null);
    const [more, setMore] = useState(false);
    useEffect(() => { setMore(false); }, [proj.id]);
    useEffect(() => { setMenu(null); }, [proj.id, kids.length]);
    if (!kids.length) return null;
    const head = SC.madeHead(kids);
    const rows = SC.madeRows(kids);
    const vis = SC.madeVisible(rows.length, more);
    const session = S.ai ? app.shortsCut.sessions[proj.id] : null;
    const running = session && session.phase === 'running';
    const toggle = () => { setMenu(null); setOpen((v) => !v); };
    return (
      <section className="sm-group" aria-label="切出的短视频">
        {/* 组头是 div 不是 button：右侧的「再切几支」本身是按钮 */}
        <div className="sm-hd" role="button" tabIndex={0} aria-expanded={open} onClick={toggle}
          onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); } }}>
          <Ic n={open ? 'chevdown' : 'chevright'} className="ic--12" />
          <span className="sm-hd__t">
            <b>切出的短视频</b>
            <span className="t-truncate">{head.text}</span>
          </span>
          <BCAction className="sm-hd__act" onClick={(e) => e.stopPropagation()}>
            {S.ai ? <Btn size="s" variant="secondary" icon="plus" onClick={() => window.shortsCutMore(app, ctx)}>再切几支</Btn> : null}
            {S.pages ? <IconBtn icon="asset" size="s" tip="在 Space 里看这几支" onClick={() => app.go({r: 'projects', from: proj.id})} /> : null}
          </BCAction>
        </div>
        {open ? (
          <div className="sm-body">
            {running ? (
              <div className="sm-run">
                <span className="t-truncate">{window.shortsCutListStatus(app, proj.id, '')}</span>
                <Btn size="s" variant="quiet" onClick={() => window.shortsCutMore(app, ctx)}>去看</Btn>
              </div>
            ) : null}
            <div className="sm-src" title="这几支各用到原片的哪一段">
              <span>原片</span>
              <div className="ss-bar" aria-hidden="true">
                {SC.madeBar(kids, proj.duration).map((b, i) => (
                  <i key={i} className={cx(hot === b.id && 'is-hot')} style={{left: b.left + '%', width: b.width + '%'}} />
                ))}
              </div>
              <span className="t-mono">{SC.mmss(proj.duration)}</span>
            </div>
            <div className="sm-list" aria-label="切出的短视频列表">
              {rows.slice(0, vis.shown).map((row, i) => (
                <div className="sm-slot" key={row.id}>
                  <MadeRow row={row} child={kids[i]} ctx={ctx} menuOpen={menu === row.id} onMenu={setMenu} onHot={setHot} />
                </div>
              ))}
            </div>
            {vis.hidden ? (
              <div className="sm-more">
                <Btn size="s" variant="quiet" icon={more ? 'chevup' : 'chevdown'} aria-expanded={more}
                  onClick={() => { setMenu(null); setMore((v) => !v); }}>{SC.madeMoreLabel(vis.hidden, more)}</Btn>
              </div>
            ) : null}
            <div className="sm-foot">每支是一部单独的视频，引用同一份原片。点一支打开它，在那里接着剪。</div>
          </div>
        ) : null}
      </section>
    );
  }

  Object.assign(window, {ShortsOriginBadge, ShortsCountBadge, ShortsChildBanner, ShortsMadeGroup, shortsSideNote});
})();

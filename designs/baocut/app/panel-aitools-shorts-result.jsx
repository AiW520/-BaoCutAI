/* 剪成短视频（§5.10）结果页：找到就已经创建好了，这一页是看结果、收拾结果的地方——
   每支一张卡：标题（点一下改名）、在原片里的起止与时长、开头那一句、为什么挑它、提醒；
   「打开编辑」去那一支，「调起止」就地挪一句或输入时间，「不要这支」移入回收站（toast 里可撤销）。
   每一处改动直接写回那一支的记录，不用再按一次「创建」。不离开编辑器就能看、调起止、删掉和打开编辑。
   预览在中央舞台（stage-shorts-cut.jsx），两边共用会话里的「选中哪一支」与播放头；点卡片，舞台跟着这一支。 */
(function () {
  const {useState, useEffect, useRef} = React;
  const SC = window.BC_SHORTS_CUT;
  const {TOOLS} = window.BC_AIFLOWS;
  const NAME = TOOLS.shortscut.name;

  /* 起点 / 终点各一行：那一句的文字 + 往前 / 往后挪一句，时间也能直接输入。 */
  function EdgeRow({edge, c, s, onNudge, onSet}) {
    const start = edge === 'start';
    const line = s.sentences[start ? c.from : c.to] || {};
    const loose = c.loose && c.loose[edge];
    const value = start ? c.start : c.end;
    const [draft, setDraft] = useState(window.BC_TIME.timecode(value));
    const skip = useRef(false);
    useEffect(() => setDraft(window.BC_TIME.timecode(value)), [value]);
    return (
      <div className="sc-adj__row">
        <span className="sc-adj__lb">{start ? '起点' : '终点'}
          <Field size="s" className="sc-bound-input" value={draft} aria-label={start ? '起点时间' : '终点时间'} onChange={(e) => setDraft(e.target.value)}
            onBlur={() => { if (skip.current) skip.current = false; else if (draft !== window.BC_TIME.timecode(value)) onSet(edge, draft); setDraft(window.BC_TIME.timecode(value)); }}
            onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); if (e.key === 'Escape') { skip.current = true; setDraft(window.BC_TIME.timecode(value)); e.currentTarget.blur(); } }} />
        </span>
        <span className={cx('sc-adj__tx', loose && 'is-loose')} title={line.text}>{line.text}</span>
        <span className="sc-adj__bt">
          <Btn size="s" variant="secondary" disabled={!SC.canNudge(s.sentences, c, edge, -1)} onClick={() => onNudge(edge, -1)}>
            {start ? '从上一句开始' : '到上一句结束'}</Btn>
          <Btn size="s" variant="secondary" disabled={!SC.canNudge(s.sentences, c, edge, 1)} onClick={() => onNudge(edge, 1)}>
            {start ? '从下一句开始' : '到下一句结束'}</Btn>
        </span>
      </div>
    );
  }

  function MadeCard({c, n, s, proj, flags, duration}) {
    const app = useApp();
    const api = app.shortsCut;
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(c.title);
    const sel = s.sel === c.id;
    const open = s.expand === c.id;
    const commit = () => { setEditing(false); const t = draft.trim(); if (t && t !== c.title) api.edit(proj, c.id, {title: t}); else setDraft(c.title); };
    return (
      <div className={cx('sc-card', sel && 'is-sel')} onClick={() => api.select(proj, c.id, {keepT: true})}>
        <div className="sc-card__head">
          <span className="sc-card__n t-mono">{n}</span>
          {editing
            ? <Field size="s" className="sc-card__edit" value={draft} autoFocus aria-label="短视频标题" onChange={(e) => setDraft(e.target.value)} onBlur={commit}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(c.title); setEditing(false); } }} />
            : <BCAction type="button" className="sc-card__title t-truncate" title="点一下改标题"
                onClick={(e) => { e.stopPropagation(); setDraft(c.title); setEditing(true); }}>{c.title}</BCAction>}
        </div>
        <div className="sc-card__span t-mono">{SC.spanText(c)}{c.added === 'redo' ? ' · 重做' : ''}</div>
        {open ? (
          <div className="sc-adj" onClick={(e) => e.stopPropagation()}>
            <EdgeRow edge="start" c={c} s={s} onNudge={(e, d) => api.nudge(proj, c.id, e, d)} onSet={(e, raw) => api.setBound(proj, c.id, e, raw, duration)} />
            <EdgeRow edge="end" c={c} s={s} onNudge={(e, d) => api.nudge(proj, c.id, e, d)} onSet={(e, raw) => api.setBound(proj, c.id, e, raw, duration)} />
            <div className="sc-adj__tip">可直接输入时间，按钮每次挪一句；改动直接写进这一支，可以撤销。</div>
          </div>
        ) : null}
        <div className="sc-quote"><em>开头</em><span>{SC.hookOf(s.sentences, c)}</span></div>
        {c.reason ? <div className="sc-why"><em>为什么挑它</em><span>{c.reason}</span></div> : null}
        {s.params.focus === 'manual' && s.params.ratio !== 'source' ? <div className="sc-why"><em>取景</em><span>{SC.focusText(c.focusX)} · 在左边原片上拖取景框改</span></div> : null}
        {flags.length ? (
          <div className="sc-flags">{flags.map((f, i) => <Chip key={f.k + i} tone={f.tone}>{f.text}</Chip>)}</div>
        ) : null}
        <div className="sc-acts" onClick={(e) => e.stopPropagation()}>
          <Btn size="s" variant="secondary" icon="edit" onClick={() => app.go({r: 'editor', id: c.id})}>打开编辑</Btn>
          <Btn size="s" variant={open ? 'primary' : 'secondary'} onClick={() => { api.select(proj, c.id, {keepT: true}); api.set(proj, {expand: open ? null : c.id}); }}>调起止</Btn>
          <span className="grow" />
          <Btn size="s" variant="quiet" onClick={() => api.remove(proj, c.id)}>不要这支</Btn>
        </div>
      </div>
    );
  }

  function ShortsCutResult({ctx, s, onBack}) {
    const app = useApp();
    const api = app.shortsCut;
    const proj = ctx.proj.id;
    /* 从任务页回来时会话里还没有文稿：用这部视频的文稿把那几支的句子边界补上 */
    useEffect(() => {
      if ((!s.sentences || !s.sentences.length) && ctx.cues.length && s.taskId) api.showTask(proj, s.taskId, ctx.cues);
    }, [s.sentences, ctx.cues.length, s.taskId]);
    /* 结果页上的几支以项目库为准：在 Space 里移入回收站的，这里也撤下；在别处改了名的，跟着改 */
    const live = SC.visible(s.list).map((c) => ({c, p: app.projById(c.id)})).filter((x) => x.p && !x.p.archived)
      .map((x) => (x.p.title !== x.c.title ? {...x.c, title: x.p.title} : x.c));
    const mine = new Set(s.list.map((c) => c.id));
    const kids = SC.childrenOf(app.projects, proj).filter((k) => !mine.has(k.id));
    const fctx = {params: s.params, list: live, children: kids, sentences: s.sentences || []};
    const exportAll = () => {
      if (!live.length) return;
      app.go({r: 'editor', id: live[0].id});
      app.toast(`每支单独导出 · 先打开了「${live[0].title}」，其余 ${live.length - 1} 支在 Space 里`, null);
    };
    if (!s.sentences || !s.sentences.length) return <div className="pscroll bc-scroll"><div className="flowh"><IconBtn icon="back" size="s" tip="返回" onClick={onBack} /><b>{NAME}</b></div></div>;

    return (
      <div className="pscroll bc-scroll">
        <div className="flowh"><IconBtn icon="back" size="s" tip="返回" onClick={onBack} /><b>{NAME}</b>
          <Chip tone="positive">{`已创建 ${live.length} 支`}</Chip></div>
        <div className="aicard">
          <b>{SC.resultHead(live)}</b>
          <span>{`${SC.summaryLine(s.params)}。逐支看，起止不对就调，标题可以改；改动直接写进那一支。`}</span>
        </div>

        <div className="sc-list">
          {live.map((c, i) => <MadeCard key={c.id} c={c} n={i + 1} s={s} proj={proj} flags={SC.flags(c, fctx)} duration={ctx.duration} />)}
          {!live.length ? <div className="hint">这几支都移入回收站了。可以在 Space 的回收站里恢复，或者再切几支。</div> : null}
        </div>

        <SecHead>接下来</SecHead>
        <div className="sec cr-next">
          <BCAction className="drill" onClick={() => api.again(proj)}>
            <span className="ic2"><Ic n="split" className="ic--16" /></span>
            <span className="tt"><b>再切几支</b><span>回到设置，已经切过的不再找</span></span>
            <NavChevron style={{color: 'var(--gray-500)'}} />
          </BCAction>
          <BCAction className="drill" onClick={() => app.go({r: 'projects', from: proj})}>
            <span className="ic2"><Ic n="folder" className="ic--16" /></span>
            <span className="tt"><b>在 Space 里看这几支</b><span>{`按来源筛好 ·「${ctx.proj.title}」切出的短视频`}</span></span>
            <NavChevron style={{color: 'var(--gray-500)'}} />
          </BCAction>
          {live.length ? (
            <BCAction className="drill" onClick={exportAll}>
              <span className="ic2"><Ic n="export" className="ic--16" /></span>
              <span className="tt"><b>全部导出…</b><span>每支单独导出，从第一支开始</span></span>
              <NavChevron style={{color: 'var(--gray-500)'}} />
            </BCAction>
          ) : null}
        </div>
        <div className="hint">每支是一部单独的视频，引用同一份原片。不要哪一支移入回收站即可，可恢复。</div>
      </div>
    );
  }

  Object.assign(window, {ShortsCutResult});
})();

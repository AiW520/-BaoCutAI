/* Space · 按内容找（embedding-integration-design §2.1、§2.4、§2.11；retrieval-spec v0.1 §11.2–11.5、§13）。
   Space 页的搜索框有字时，名称匹配的列表上面多一块「讲话内容里」（画面也选上时「讲话内容与画面里」）：
   · 方式：综合（按意思 + 字面）/ 精确文字；通道：讲话内容 / 画面 / 声音（画面 2026-10-14 确认：只按意思找，画面索引开着才能选；
     声音这一版没有，写明原因）；范围：这个项目 / 全部项目（「全部」含索引文件夹里的文件）；
   · 画面命中：BaoCut 视频那一刻的画面，「在时间线打开」；索引文件夹里的视频素材或图片，「在 Space 中查看」（只读，不能打开编辑）；
   · 结果卡：命中那一刻的画面、原句（纯语义命中不画高亮）、时间、视频名，以及为什么命中（对上的词或「意思接近」）；不给相似度百分比；
   · 有明显相关的结果时，只是勉强相关的（弱命中）折在后面，「显示勉强相关的结果（N）」点开；全是弱命中时照常全给；
   · 点卡片预览那一刻：画面、命中那一句前后各 2 秒的播放条（命中的部分标出）、前后各一句；卡片上「在时间线打开」（这一句还在时间线上
     才有）、「交给 Agent」、「用于写作」；
   · 顶上一行完整性（按通道分别写）；没装模型退回精确文字时说一句，索引在更新时提醒；
   · 输入像个问题时给「回答这个问题」（§2.4 跨视频问答，P1）：每句带可点的出处，索引不全时写明。
   搜索框空着时给几条示例。纯逻辑在 model-space-search.js；状态在 semantic-state.jsx。只在 App。 */
(function () {
  const {useState, useMemo} = React;
  const Q = window.BC_SPACE_SEARCH;
  const S = window.BC_SEMANTIC;
  const D = window.BC_DATA;
  const SEM = D.semantic;
  const mmss = (t) => window.BC_WRCITES.mmss(t);
  const projOf = (id) => (D.projects || []).find((p) => p.id === id) || null;
  const dirOf = (id) => (projOf(id) || {}).dir || null;
  const vname = (id) => { const p = projOf(id); return p ? p.title : id; };
  const names = () => (D.projects || []).reduce((m, p) => (m[p.id] = p.title, m), {});
  /* 演示素材没有每部视频自己的画面：按 p1 的章节场景画（同写作出处的关键帧） */
  const frameOf = (t) => ({t, scene: window.BC_WRITING.sceneAt(D.chapters, t).k});
  const entryOf = (id) => (D.spaceOutputs || []).find((o) => o.id === id) || null;
  /** 一条结果是哪一部 / 哪个文件、在哪 */
  const hitName = (r) => (r.entry ? (entryOf(r.entry) || {}).name || r.entry : vname(r.video));
  const hitWhere = (r) => { const e = r.entry && entryOf(r.entry); return e ? `索引文件夹「${e.libName || e.lib}」` : null; };
  const CH = {text: '讲话内容', visual: '画面'};

  /** 命中的那一刻：BaoCut 视频画章节场景（演示），索引文件夹里的文件画它的配色与类型图标 */
  function HitFrame({r, className}) {
    const e = r.entry && entryOf(r.entry);
    if (e) {
      const Icon = window.RSP.Icons[window.BC_SPACE.KINDS[e.kind].icon];
      return <span className={cx('sp-prev', 'sp-prev--kind', className)} style={{'--sp-hue': e.hue == null ? 220 : e.hue}}><Icon /></span>;
    }
    return <window.BC_COVERART.FrameArt f={r.scene ? {t: r.t, scene: r.scene} : frameOf(r.t)} className={className} />;
  }

  function Snippet({r}) {
    return <span className="ssr__x">{Q.pieces(r.text, r.hl).map((p, i) => (p.hl ? <mark key={i} className="ssr__hl">{p.t}</mark> : <React.Fragment key={i}>{p.t}</React.Fragment>))}</span>;
  }

  /* ---------- 一张结果卡 ---------- */
  function ResultCard({r, onPreview, onAct}) {
    const where = hitWhere(r);
    return (
      <div className="ssr__card">
        <BCAction className="ssr__main" onClick={() => onPreview(r)} aria-label={`预览 ${hitName(r)}${r.t == null ? '' : ` ${mmss(r.t)}`}`}>
          <HitFrame r={r} className="ssr__thumb" />
          <span className="ssr__body">
            <span className="ssr__meta">
              {r.t == null ? null : <span className="ssr__t">{mmss(r.t)}</span>}
              <span className="ssr__v">{hitName(r)}</span>
            </span>
            {r.channel === 'visual' ? (where ? <span className="ssr__x">{where}</span> : null) : <Snippet r={r} />}
            <span className="ssr__by">{`${CH[r.channel]} · ${Q.why(r)}`}</span>
          </span>
        </BCAction>
        <div className="ssr__acts">
          {r.entry ? <BCAction className="tsetup__lnk" onClick={() => onAct('space', r)}>在 Space 中查看</BCAction>
            : r.inTimeline ? <BCAction className="tsetup__lnk" onClick={() => onAct('timeline', r)}>在时间线打开</BCAction>
            : <span className="t-detail-xs">已从时间线剪掉</span>}
          {window.BC_SURFACE.agent ? <BCAction className="tsetup__lnk" onClick={() => onAct('agent', r)}>交给 Agent</BCAction> : null}
          {window.BC_SURFACE.ai && r.cue ? <BCAction className="tsetup__lnk" onClick={() => onAct('write', r)}>用于写作</BCAction> : null}
        </div>
      </div>
    );
  }

  /* ---------- 预览 ---------- */
  /* 那一刻：画面 + 播放条（命中那一句前后各 2 秒，命中的部分标出）。演示里不放视频：「播放这一段」让播放头按真实时长走过这一段，
     走到头停下；产品里从 m.from 播到 m.to。 */
  function Moment({r}) {
    const m = Q.moment(r);
    const [playing, setPlaying] = useState(false);
    if (!m) return <div className="ssr__mo"><HitFrame r={r} className="ssr__pvimg" /></div>;
    const span = m.to - m.from;
    const pct = (x) => `${((x - m.from) / span) * 100}%`;
    return (
      <div className="ssr__mo">
        <HitFrame r={r} className="ssr__pvimg" />
        <div className="ssr__mobar">
          <Btn size="s" variant="secondary" icon={playing ? 'pause' : 'play'} onClick={() => setPlaying((x) => !x)}>
            {playing ? '暂停' : '播放这一段'}</Btn>
          <div className="ssr__track" role="img" aria-label={`${mmss(m.from)} 到 ${mmss(m.to)}，命中 ${mmss(m.hit[0])}–${mmss(m.hit[1])}`}>
            <span className="ssr__hitspan" style={{left: pct(m.hit[0]), width: `${((m.hit[1] - m.hit[0]) / span) * 100}%`}} />
            {playing ? <span className="ssr__head" style={{animationDuration: `${span}s`}} onAnimationEnd={() => setPlaying(false)} /> : null}
          </div>
          <span className="ssr__t">{`${mmss(m.from)}–${mmss(m.to)}`}</span>
        </div>
      </div>
    );
  }

  function Preview({r, onClose, onAct}) {
    const p = r.video ? projOf(r.video) : null;
    const cues = r.cue ? D.cues : null;
    const at = cues ? cues.findIndex((c) => c.id === r.cue) : -1;
    const around = r.channel === 'visual' ? [] : at >= 0 ? cues.slice(Math.max(0, at - 1), at + 2) : [{id: r.id, start: r.t, text: r.text}];
    const where = hitWhere(r);
    return (
      <Dialog open title={r.t == null ? hitName(r) : `${hitName(r)} · ${mmss(r.t)}`} onClose={onClose} width={560}
        footer={<>
          <Btn variant="secondary" onClick={onClose}>关闭</Btn>
          {r.entry ? <Btn variant="accent" onClick={() => onAct('space', r)}>在 Space 中查看</Btn>
            : r.inTimeline ? <Btn variant="accent" onClick={() => onAct('timeline', r)}>在时间线打开</Btn> : null}
        </>}>
        <div className="ssr__pv">
          <Moment r={r} />
          <span className="ssr__by">{`为什么命中：${CH[r.channel]} · ${Q.why(r)}`}</span>
          {where ? <span className="t-detail-xs">{`${where} · 只读`}</span> : null}
          <div className="ssr__pvctx">
            {around.map((c) => (
              <div key={c.id} className={cx('ssr__pvrow', (c.id === r.cue || c.id === r.id) && 'is-hit')}>
                <span className="ssr__t">{mmss(c.start)}</span><span>{c.text}</span>
              </div>
            ))}
          </div>
          {r.entry ? null : <span className="t-detail-xs">{`${p ? p.folder || p.title : r.video}${r.inTimeline ? '' : ' · 这一句已从时间线剪掉，只能看原片位置'}`}</span>}
        </div>
      </Dialog>
    );
  }

  /* ---------- 回答这个问题（§2.4，P1） ---------- */
  function Answer({a, onSeek}) {
    return (
      <div className="ssr__ans">
        <b className="ssr__ansh">{a.head}</b>
        {a.lines.map((l, i) => (
          <p key={i} className="ssr__ansp">{l.text}
            {l.cites.map((c) => <BCAction key={c.id} className="wrtime ssr__cite" onClick={() => onSeek(c)}>{`${vname(c.video)} · ${mmss(c.t)}`}</BCAction>)}
          </p>
        ))}
        {a.note ? <div className="semnote semnote--notice"><Ic n="info" className="ic--14" /><span className="semnote__x">{a.note}</span></div> : null}
      </div>
    );
  }

  /* ---------- 整块 ---------- */
  function SpaceContentSearch({q, setQ, dir, onView}) {
    const app = useApp();
    const [st, sem] = window.BC_SEMSTATE.useSemantic();
    const [mode, setMode] = useState('mix');
    const [scopeSel, setScope] = useState(null);
    const [pv, setPv] = useState(null);
    const [ans, setAns] = useState(null);
    const [weakOpen, setWeakOpen] = useState(false);
    const [picked, setPicked] = useState({text: true, visual: true});
    const scope = dir && dir !== 'none' ? (scopeSel || 'project') : 'all';
    const query = q.trim();
    const vc = Q.visualChannel(st, sem, mode);
    const channels = ['text', 'visual'].filter((k) => picked[k] && (k === 'text' || vc.on));
    const live = (st.folders || SEM.folders).filter((f) => !f.missing);
    const res = useMemo(() => Q.search(query, {corpus: SEM.corpus, concepts: SEM.concepts, cutOut: SEM.cutOut, dirOf,
      mode, scope, dir, status: sem, limit: 8, channels: channels.length ? channels : ['text'], frames: SEM.frames, visualConcepts: SEM.visualConcepts,
      folders: live.map((f) => f.id), libOf: (id) => (entryOf(id) || {}).lib}), [query, mode, scope, dir, st, channels.join()]);
    const pending = Object.keys(SEM.entries).filter((id) => /^p/.test(id) && (scope !== 'project' || dirOf(id) === dir)
      && SEM.entries[id].visual && SEM.entries[id].visual !== 'indexed').length;
    const cov = Q.coverage(scope, dir, SEM.projects, S, vc.on || (st.visual && st.install !== 'none') ? {pending, folders: live.map((f) => f.visual || {done: 0, total: 0})} : null);
    const flip = (k, v) => setPicked((cur) => { const n = Object.assign({}, cur, {[k]: v}); return n.text || (n.visual && vc.on) ? n : cur; });
    const notes = Q.notices(res, sem, S);
    const dirName = (app.dirs.find((d) => d.id === dir) || {}).name || '这个项目';
    React.useEffect(() => { setAns(null); setWeakOpen(false); }, [query, mode, scope]);
    const folded = Q.fold(res.results);

    if (!query) {
      return (
        <div className="ssr ssr--idle">
          <span className="t-detail-xs">{vc.on ? '按讲话内容或画面找：' : '按讲话内容找：'}</span>
          {SEM.examples.map((x) => <Chip key={x} onClick={() => setQ(x)}>{x}</Chip>)}
        </div>
      );
    }
    const act = (k, r) => {
      if (k === 'space') { setPv(null); onView && onView(r.entry); }
      else if (k === 'timeline') { setPv(null); app.openMovie(r.video, {via: 'space', t: r.t}); }
      else if (k === 'agent') {
        const entry = app.spaceItems.find((x) => x.id === (r.entry || r.video));
        if (!entry) { app.toast('这一条不在 Space 里'); return; }
        app.handoverToAgent(entry, r.channel === 'visual'
          ? `看「${hitName(r)}」${r.t == null ? '' : `${mmss(r.t)} `}这个画面`
          : `看「${vname(r.video)}」${mmss(r.t)} 这一句：「${r.text}」`);
      } else if (k === 'write') {
        /* 这部视频里命中的几句一起作为预选材料，打开写博客，范围落在「按主题」 */
        const same = res.results.filter((x) => x.video === r.video && x.cue).map((x) => x.cue);
        window.BC_WRTOPIC.setPreset(r.video, same, query);
        app.openTool(r.video, 'blog', null);
        app.toast(`用「${vname(r.video)}」里命中的 ${same.length} 句写博客`);
      }
    };
    const title = channels.indexOf('visual') >= 0 ? (channels.indexOf('text') >= 0 ? '讲话内容与画面里' : '画面里') : '讲话内容里';
    const showAsk = Q.looksLikeQuestion(query) && res.mode === 'hybrid' && res.results.length;
    return (
      <section className="ssr" aria-label={title}>
        <div className="ssr__bar">
          <b className="ssr__title">{title}</b>
          <Segmented size="s" value={mode} onChange={setMode} items={Q.MODES} />
          <div className="ssr__ch" role="group" aria-label="通道">
            {S.CHANNELS.map((c) => (c.k === 'audio'
              ? <Checkbox key={c.k} on={false} disabled label={c.label} />
              : c.k === 'visual'
                ? <Checkbox key={c.k} on={vc.on && picked.visual} disabled={!vc.on} label={c.label} onChange={(v) => flip('visual', v)} />
                : <Checkbox key={c.k} on={picked.text} label={c.label} onChange={(v) => flip('text', v)} />))}
          </div>
          {dir && dir !== 'none'
            ? <Segmented size="s" value={scope} onChange={setScope} items={[{k: 'project', label: dirName}, {k: 'all', label: '全部项目'}]} />
            : <span className="t-detail-xs">全部项目</span>}
        </div>
        <div className="ssr__cov">
          <span className="t-detail-xs">{cov.line}</span>
          {vc.on ? null : <span className="t-detail-xs">{`画面：${vc.why}`}</span>}
        </div>
        {notes.map((n) => (
          <div key={n.text} className={cx('semnote', n.tone === 'notice' && 'semnote--notice')}>
            <Ic n={n.tone === 'notice' ? 'refresh' : 'info'} className="ic--14" /><span className="semnote__x">{n.text}</span>
            {n.settings ? <BCAction className="tsetup__lnk" onClick={() => app.go({r: 'settings', sec: 'semantic'})}>去设置</BCAction> : null}
          </div>
        ))}
        {showAsk && !ans ? <div className="ssr__ask"><Btn size="s" variant="secondary" icon="sparkle" onClick={() => setAns(Q.answer(query, res.results, names(), cov))}>回答这个问题</Btn>
          <span className="t-detail-xs">用下面这些片段回答，每句带出处</span></div> : null}
        {ans && showAsk ? <Answer a={ans} onSeek={(c) => app.openMovie(c.video, {via: 'space', t: c.t})} /> : null}
        {res.results.length
          ? <div className="ssr__grid">{(weakOpen ? res.results : folded.shown).map((r) => <ResultCard key={r.id} r={r} onPreview={setPv} onAct={act} />)}</div>
          : <div className="ssr__empty t-detail">{res.mode === 'lexical' ? '原句里没有这些字。' : channels.indexOf('visual') >= 0 ? '没找到相关的片段或画面。' : '没找到讲这件事的片段。'}换个说法，或换到全部项目。</div>}
        {folded.folded.length
          ? <BCAction className="tsetup__lnk ssr__fold" aria-expanded={weakOpen} onClick={() => setWeakOpen((o) => !o)}>
              {weakOpen ? '收起勉强相关的结果' : `显示勉强相关的结果（${folded.folded.length}）`}</BCAction>
          : null}
        {pv ? <Preview r={pv} onClose={() => setPv(null)} onAct={act} /> : null}
      </section>
    );
  }

  Object.assign(window, {SpaceContentSearch});
})();

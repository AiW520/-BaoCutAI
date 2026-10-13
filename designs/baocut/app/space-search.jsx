/* Space · 按内容找（embedding-integration-design §2.1、§2.4、§2.11；retrieval-spec v0.1 §11.2–11.5、§13）。
   Space 页的搜索框有字时，名称匹配的列表上面多一块「讲话内容里」：
   · 方式：综合（按意思 + 字面）/ 精确文字；通道：讲话内容 / 画面 / 声音（后两个这一版没有，写明原因）；范围：这个项目 / 全部项目；
   · 结果卡：原句（纯语义命中不画高亮）、时间、命中通道、视频名、怎么找到的；不给相似度百分比；
   · 点卡片预览；卡片上「在时间线打开」（这一句还在时间线上才有）、「交给 Agent」、「用于写作」；
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

  function Snippet({r}) {
    return <span className="ssr__x">{Q.pieces(r.text, r.hl).map((p, i) => (p.hl ? <mark key={i} className="ssr__hl">{p.t}</mark> : <React.Fragment key={i}>{p.t}</React.Fragment>))}</span>;
  }

  /* ---------- 一张结果卡 ---------- */
  function ResultCard({r, onPreview, onAct}) {
    return (
      <div className="ssr__card">
        <BCAction className="ssr__main" onClick={() => onPreview(r)} aria-label={`预览 ${vname(r.video)} ${mmss(r.t)}`}>
          <span className="ssr__meta">
            <span className="ssr__t">{mmss(r.t)}</span>
            <span className="ssr__v">{vname(r.video)}</span>
          </span>
          <Snippet r={r} />
          <span className="ssr__by">{`讲话内容 · ${Q.BY[r.weak ? 'weak' : r.by]}`}</span>
        </BCAction>
        <div className="ssr__acts">
          {r.inTimeline ? <BCAction className="tsetup__lnk" onClick={() => onAct('timeline', r)}>在时间线打开</BCAction>
            : <span className="t-detail-xs">已从时间线剪掉</span>}
          {window.BC_SURFACE.agent ? <BCAction className="tsetup__lnk" onClick={() => onAct('agent', r)}>交给 Agent</BCAction> : null}
          {window.BC_SURFACE.ai && r.cue ? <BCAction className="tsetup__lnk" onClick={() => onAct('write', r)}>用于写作</BCAction> : null}
        </div>
      </div>
    );
  }

  /* ---------- 预览 ---------- */
  function Preview({r, onClose, onAct}) {
    const p = projOf(r.video);
    const cues = r.cue ? D.cues : null;
    const at = cues ? cues.findIndex((c) => c.id === r.cue) : -1;
    const around = at >= 0 ? cues.slice(Math.max(0, at - 1), at + 2) : [{id: r.id, start: r.t, text: r.text}];
    const sc = window.BC_WRITING.sceneAt(D.chapters, r.t);
    return (
      <Dialog open title={`${vname(r.video)} · ${mmss(r.t)}`} onClose={onClose} width={560}
        footer={<>
          <Btn variant="secondary" onClick={onClose}>关闭</Btn>
          {r.inTimeline ? <Btn variant="accent" onClick={() => onAct('timeline', r)}>在时间线打开</Btn> : null}
        </>}>
        <div className="ssr__pv">
          <window.BC_COVERART.FrameArt f={{t: r.t, scene: sc.k}} className="ssr__pvimg" />
          <div className="ssr__pvctx">
            {around.map((c) => (
              <div key={c.id} className={cx('ssr__pvrow', (c.id === r.cue || c.id === r.id) && 'is-hit')}>
                <span className="ssr__t">{mmss(c.start)}</span><span>{c.text}</span>
              </div>
            ))}
          </div>
          <span className="t-detail-xs">{`${p ? p.folder || p.title : r.video} · 命中通道：讲话内容${r.inTimeline ? '' : ' · 这一句已从时间线剪掉，只能看原片位置'}`}</span>
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
  function SpaceContentSearch({q, setQ, dir}) {
    const app = useApp();
    const [st, sem] = window.BC_SEMSTATE.useSemantic();
    const [mode, setMode] = useState('mix');
    const [scopeSel, setScope] = useState(null);
    const [pv, setPv] = useState(null);
    const [ans, setAns] = useState(null);
    const scope = dir && dir !== 'none' ? (scopeSel || 'project') : 'all';
    const query = q.trim();
    const res = useMemo(() => Q.search(query, {corpus: SEM.corpus, concepts: SEM.concepts, cutOut: SEM.cutOut, dirOf,
      mode, scope, dir, status: sem, limit: 8}), [query, mode, scope, dir, st]);
    const cov = Q.coverage(scope, dir, SEM.projects, S);
    const notes = Q.notices(res, sem, S);
    const dirName = (app.dirs.find((d) => d.id === dir) || {}).name || '这个项目';
    React.useEffect(() => { setAns(null); }, [query, mode, scope]);

    if (!query) {
      return (
        <div className="ssr ssr--idle">
          <span className="t-detail-xs">按讲话内容找：</span>
          {SEM.examples.map((x) => <Chip key={x} onClick={() => setQ(x)}>{x}</Chip>)}
        </div>
      );
    }
    const act = (k, r) => {
      if (k === 'timeline') { setPv(null); app.openMovie(r.video, {via: 'space', t: r.t}); }
      else if (k === 'agent') {
        const entry = app.spaceItems.find((x) => x.id === r.video);
        if (!entry) { app.toast('这部视频不在 Space 里'); return; }
        app.handoverToAgent(entry, `看「${vname(r.video)}」${mmss(r.t)} 这一句：「${r.text}」`);
      } else if (k === 'write') {
        /* 这部视频里命中的几句一起作为预选材料，打开写博客，范围落在「按主题」 */
        const same = res.results.filter((x) => x.video === r.video && x.cue).map((x) => x.cue);
        window.BC_WRTOPIC.setPreset(r.video, same, query);
        app.openTool(r.video, 'blog', null);
        app.toast(`用「${vname(r.video)}」里命中的 ${same.length} 句写博客`);
      }
    };
    const showAsk = Q.looksLikeQuestion(query) && res.mode === 'hybrid' && res.results.length;
    return (
      <section className="ssr" aria-label="讲话内容里">
        <div className="ssr__bar">
          <b className="ssr__title">讲话内容里</b>
          <Segmented size="s" value={mode} onChange={setMode} items={Q.MODES} />
          <div className="ssr__ch" role="group" aria-label="通道">
            {S.CHANNELS.map((c) => <Checkbox key={c.k} on={c.k === 'text'} disabled label={c.label} />)}
          </div>
          {dir && dir !== 'none'
            ? <Segmented size="s" value={scope} onChange={setScope} items={[{k: 'project', label: dirName}, {k: 'all', label: '全部项目'}]} />
            : <span className="t-detail-xs">全部项目</span>}
        </div>
        <div className="ssr__cov">
          <span className="t-detail-xs">{cov.line}</span>
          <span className="t-detail-xs">画面与声音：这一版还没有索引，之后装好多模态搜索、按项目开启</span>
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
          ? <div className="ssr__grid">{res.results.map((r) => <ResultCard key={r.id} r={r} onPreview={setPv} onAct={act} />)}</div>
          : <div className="ssr__empty t-detail">{res.mode === 'lexical' ? '原句里没有这些字。' : '没找到讲这件事的片段。'}换个说法，或换到全部项目。</div>}
        {pv ? <Preview r={pv} onClose={() => setPv(null)} onAct={act} /> : null}
      </section>
    );
  }

  Object.assign(window, {SpaceContentSearch});
})();

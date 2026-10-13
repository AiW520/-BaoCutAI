/* AI 工具 · 结果页上用到本机语义的几块（embedding-integration-design §2.5、§2.6、§2.7；§3.7、§3.8）。
   · 润色：参数页一个勾选项「按术语表找疑似误听」；结果页的术语候选表（原文 / 建议 / 出现位置 / 出现次数），
     勾选的一次替换、算一笔编辑可撤销，不自动应用；没装模型时写明只做了精确匹配。
     反向：文稿里写法不一致、库里还没有的专名并进 GlossaryHarvest 的同一张清单（不另起一块）。
   · 找可剪的口：多一类「重录」。成组列出各遍的原文、时长、是否完整；建议保留哪遍但不预勾；
     数字、否定词、专有名词不同的两遍单独列在「相似但有差异」里并高亮差异。永不自动删除。
   · 翻译：参数页一行「参考了 N 句已有译文」（§2.6）。
   纯逻辑在 model-tool-semantic.js / model-semantic.js；状态在 semantic-state.jsx。只在 App。 */
(function () {
  const {useState} = React;
  const D = window.BC_DATA;
  const TS = window.BC_TOOL_SEMANTIC;
  const S = window.BC_SEMANTIC;
  const SEM = D.semantic;
  const T = window.BC_TIME;

  /* ---------- 润色：参数页的勾选项 ---------- */
  function TermOption({on, onChange}) {
    const [st, sem] = window.BC_SEMSTATE.useSemantic();
    return (
      <>
        <window.ToolOption on={on} onChange={onChange} label="按术语表找疑似误听"
          sub={!st.terms ? '设置 › 语义索引里关掉了术语候选' : sem.usable ? '读音或意思相近、写法不同的列成候选，你勾了才改' : '只按术语表里记下的误听写法找'} />
        {on && !sem.usable ? <window.SemNote entry="terms" className="wtopic__note" /> : null}
      </>
    );
  }

  /* ---------- 润色：术语候选表 ---------- */
  function TermCandidates({ctx, gl}) {
    const app = useApp();
    const [st, sem] = window.BC_SEMSTATE.useSemantic();
    const [checked, setChecked] = useState({});
    const [done, setDone] = useState(null);
    const r = TS.termRows(SEM.termCands, sem);
    if (!st.terms) return null;
    const pick = TS.applyTerms(r.rows, checked);
    const apply = () => {
      setDone(pick);
      app.toast(pick.receipt, 'positive', {label: '撤销', run: () => setDone(null)});
    };
    const seek = (at) => ctx.seek && ctx.seek(T.parse(at));
    return (
      <div className="trmc">
        <div className="row gap8">
          <b className="grow">{`术语候选 ${r.rows.length} 个`}</b>
          {done ? <Chip tone="positive">{`已替换 ${done.n} 处`}</Chip> : null}
        </div>
        <span className="t-detail-xs">按术语表找到的疑似误听。勾选的一次替换，算一笔编辑、可撤销；不勾的不动。</span>
        {r.note ? <div className="semnote"><Ic n="info" className="ic--14" /><span className="semnote__x">{r.note}</span></div> : null}
        {/* 四列（原文 / 建议 / 出现位置 / 出现次数）在 AI 工具面板的宽度里折成两行：上行「原文 → 建议 · N 处」，下行依据与位置 */}
        <div className="trmc__tbl" role="list" aria-label="术语候选">
          {r.rows.map((c) => (
            <div key={c.id} className={cx('trmc__row', done && done.rows.some((x) => x.id === c.id) && 'is-done')} role="listitem">
              <Checkbox on={!!checked[c.id]} disabled={!!done} aria-label={`把「${c.from}」改成「${c.to}」`}
                onChange={(v) => setChecked((k) => ({...k, [c.id]: v}))} />
              <div className="trmc__main">
                <div className="trmc__line">
                  <span className="trmc__from">{c.from}</span><span className="trmc__arr" aria-hidden="true">→</span><b className="trmc__to">{c.to}</b>
                  <span className="trmc__n">{`${c.n} 处`}</span>
                </div>
                <div className="trmc__line">
                  <span className="t-detail-xs trmc__why">{c.mode === 'semantic' ? c.why : '术语表里记下的误听写法'}</span>
                  <span className="trmc__at">{c.at.map((a) => <BCAction key={a} className="wrtime" onClick={() => seek(a)}>{a}</BCAction>)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row gap8">
          {done ? <span className="t-detail-xs">{`${done.receipt} · 撤销在提示里`}</span>
            : <Btn size="s" variant="accent" disabled={!pick.rows.length} onClick={apply}>
              {pick.rows.length ? `替换勾选的 ${pick.n} 处` : '替换勾选的'}</Btn>}
          {r.hidden ? <span className="t-detail-xs">{`装了语义模型还能按读音与意思多找 ${r.hidden} 个`}</span> : null}
        </div>
      </div>
    );
  }

  /** 反向（§2.5）：写法不一致、库里还没有的专名。不单独成块——并进 GlossaryHarvest 那一张「发现术语」清单
      （glossary-tool.jsx）；这里只决定给不给：设置 › 语义索引关掉「术语候选」时不给。 */
  const harvestVariants = () => (window.BC_SEMSTATE.get().terms === false ? null : SEM.termVariants || null);

  /* ---------- 找可剪的口：重录（§2.7、§3.8） ---------- */
  function Pieces({pieces, text}) {
    if (!pieces) return <>{text}</>;
    return <>{pieces.map((p, i) => (p.hl ? <mark key={i} className="retk__hl">{p.t}</mark> : <React.Fragment key={i}>{p.t}</React.Fragment>))}</>;
  }

  function Group({g, keep, onKeep, on, onConfirm, ctx}) {
    return (
      <div className={cx('retk__g', on && 'is-on')}>
        <div className="row gap8">
          <b className="grow">{g.label}</b>
          <Checkbox on={on} onChange={onConfirm} label={g.differ ? '仍当重录处理' : '确认这一组'} />
        </div>
        {g.differ ? <div className="row gap8"><Chip tone="notice">{`${g.kinds.join('、')}不同`}</Chip></div> : null}
        {g.takes.map((t) => (
          <div key={t.id} className={cx('retk__take', keep === t.id && 'is-keep')}>
            <div className="retk__l1">
              <BCAction className="wrtime" onClick={() => ctx.seek && ctx.seek(t.t)}>{TS.mmss(t.t)}</BCAction>
              <span className="retk__x"><Pieces pieces={t.pieces} text={t.text} /></span>
            </div>
            <div className="retk__l2">
              <span className="t-detail-xs retk__meta">{t.meta}</span>
              {keep === t.id ? <Chip tone="positive">保留这遍</Chip>
                : <BCAction className="tsetup__lnk" onClick={() => onKeep(t.id)}>改留这遍</BCAction>}
            </div>
          </div>
        ))}
        <span className="t-detail-xs">{g.differ
          ? '这几遍说的数字、否定或名字不一样，可能不是同一句话。听一下再决定。'
          : `建议保留 ${TS.mmss(g.takes.find((t) => t.id === g.keep).t)} 那遍（${g.takes.find((t) => t.id === g.keep).complete ? '最后一遍完整的' : '最完整的'}）；你确认了才剪。`}</span>
      </div>
    );
  }

  function RetakeGroups({ctx}) {
    const app = useApp();
    const [, sem] = window.BC_SEMSTATE.useSemantic();
    const names = ['林澈', '周远', '科浪'];
    const same = TS.retakeRows(SEM.retakes, sem).map((g) => TS.retakeGroup(g, names));
    const differ = TS.retakeRows(SEM.retakesDiffer, sem).map((g) => TS.retakeGroup(g, names));
    const [on, setOn] = useState({});
    const [keepOf, setKeepOf] = useState({});
    const [done, setDone] = useState(null);
    const all = same.concat(differ);
    const res = TS.applyRetakes(all, on, keepOf);
    const n = Object.keys(on).filter((k) => on[k]).length;
    const apply = () => {
      setDone(res);
      app.toast(res.receipt, 'positive', {label: '撤销', run: () => setDone(null)});
    };
    const group = (g) => <Group key={g.id} g={g} ctx={ctx} keep={keepOf[g.id] || g.keep} on={!!on[g.id]}
      onKeep={(id) => setKeepOf((k) => ({...k, [g.id]: id}))} onConfirm={(v) => setOn((o) => ({...o, [g.id]: v}))} />;
    return (
      <div className="retk">
        <div className="row gap8">
          <b className="grow">{`重录 ${same.length} 组`}</b>
          {done ? <Chip tone="positive">{done.receipt}</Chip> : null}
        </div>
        <span className="t-detail-xs">同一句录了几遍。每组只建议保留哪遍，不预先勾；你逐组确认后和其他剪口一起算一笔编辑。</span>
        <window.SemNote entry="retakes" />
        {same.length ? same.map(group) : <span className="t-detail-xs">没找到文字完全相同的几遍。</span>}
        {differ.length ? (
          <>
            <SecHead aside={`${differ.length} 组`}>相似但有差异</SecHead>
            {differ.map(group)}
          </>
        ) : null}
        <div className="row gap8">
          {done ? null : <Btn size="s" variant="accent" disabled={!n} onClick={apply}>{n ? `剪掉确认的 ${n} 组里其余的遍` : '剪掉确认的'}</Btn>}
          <span className="t-detail-xs">{done ? `${done.receipt} · 撤销在提示里` : res.receipt || '还没确认任何一组'}</span>
        </div>
      </div>
    );
  }

  /* ---------- 翻译：参考了 N 句已有译文（§2.6） ---------- */
  function TmLine({to}) {
    const [st, sem] = window.BC_SEMSTATE.useSemantic();
    if (!st.tm) return <div className="wtopic__line"><span className="t-detail-xs">翻译记忆已在设置里关掉：不参考已有译文。</span></div>;
    return (
      <>
        <div className="wtopic__line"><span className="t-detail-xs">{S.tmLine(SEM.tm, sem, to)}</span></div>
        {!sem.usable ? <window.SemNote entry="tm" className="wtopic__note" /> : null}
      </>
    );
  }

  Object.assign(window, {BC_SEMTOOLS: {TermOption, TermCandidates, RetakeGroups, TmLine, harvestVariants}});
})();

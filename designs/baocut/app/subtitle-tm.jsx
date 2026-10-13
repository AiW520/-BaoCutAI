/* 翻译面板里的翻译记忆与术语一致（embedding-integration-design §2.6；§3.7）。App 与 Web 都加载。
   · 「沿用」：原文与已有译文几乎相同、直接沿用的句子在卡头标一枚，悬停写来自哪部视频；
     卡的 ⋯ 里「改为重译」去掉沿用标记并接着用模型 API 重译这一句（要调模型，只在有 AI 的表面）。
   · 「N 处术语不一致」：统计条多一项（统计条的写法一律「数字 + 短词」，全称在 tip，所以条上写「N 术语不一致」），点开列出位置（点时间跳过去）；「统一为术语表译法」是一笔普通编辑，
     Web 也有（不调模型）。是否不一致按当前译文实时判断：撤销后会重新出现。
   设置 › 语义索引关掉「翻译记忆」时两样都不画。数据在 BC_DATA.semantic.tm。 */
(function () {
  const {useState} = React;
  const D = window.BC_DATA;
  const TM = () => (D.semantic || {}).tm || null;
  const store = {over: {}, subs: new Set()};
  const bump = () => store.subs.forEach((f) => f());
  function useTm() {
    const [st] = window.BC_SEMSTATE.useSemantic();
    const [, tick] = useState(0);
    React.useEffect(() => { const f = () => tick((n) => n + 1); store.subs.add(f); return () => { store.subs.delete(f); }; }, []);
    return st.tm !== false;
  }

  /** 卡头的「沿用」 */
  function TmChip({c}) {
    const on = useTm();
    const from = on ? window.BC_SEMANTIC.reusedFrom(TM(), c.id, store.over) : null;
    if (!from) return null;
    return <span className="semtm__chip" title={`沿用「${from}」里的译文 · 原文几乎相同`}><Chip tone="info">沿用</Chip></span>;
  }

  /** 卡的 ⋯ 菜单里多一项「改为重译」（只在有 AI 的表面、且这句是沿用的）。
      去掉沿用标记，再接着走翻译面板现成的「用模型 API 重译这一句」（retranslate：panel-translate.jsx 传进来）；
      重译是一笔普通编辑，提示里的撤销同时撤回重译并把沿用标记放回来。 */
  function moreItems(c, app, retranslate) {
    if (!window.BC_SURFACE.ai || window.BC_SEMSTATE.get().tm === false || !retranslate) return [];
    const from = window.BC_SEMANTIC.reusedFrom(TM(), c.id, store.over);
    if (!from) return [];
    return [{icon: 'sparkle', label: '改为重译', sub: `不再沿用「${from}」的译文，用模型 API 重译这一句`, run: () => {
      store.over = {...store.over, [c.id]: true}; bump();
      const restore = () => { const o = {...store.over}; delete o[c.id]; store.over = o; bump(); };
      retranslate([c.id], `已改为重译这一句 · 不再沿用「${from}」· 0.9s · claude-sonnet`, {onUndo: restore});
    }}];
  }

  /* 一张卡里可改的译文片段：块卡按块、其余一段 */
  const transKeys = (c) => (c.kind === 'block' ? c.blocks.map((b, i) => ({part: 'b' + i, text: b.t})) : [{part: 't', text: c.trans || ''}]);

  /** 还没统一的位置：译文里仍是 got 的写法才算 */
  function liveSpots(cards, textOf) {
    const tm = TM();
    const out = [];
    ((tm && tm.conflicts) || []).forEach((cf) => cf.spots.forEach((sp) => {
      const c = cards.find((x) => x.id === sp.card);
      if (!c) return;
      const k = transKeys(c).find((f) => textOf(c.id + ':trans:' + f.part, f.text).indexOf(sp.got) >= 0);
      if (k) out.push({...sp, term: cf.term, want: cf.want, key: c.id + ':trans:' + k.part, text: textOf(c.id + ':trans:' + k.part, k.text)});
    }));
    return out;
  }

  /** 统计条上的「N 处术语不一致」 */
  function TmConflicts({cards, textOf, onFix, onSeek}) {
    const on = useTm();
    const [open, setOpen] = useState(false);
    if (!on) return null;
    const spots = liveSpots(cards, textOf);
    if (!spots.length) return null;
    const fix = () => {
      const ov = {};
      spots.forEach((s) => { ov[s.key] = (ov[s.key] || s.text).split(s.got).join(s.want); });
      setOpen(false);
      onFix(ov, spots.length);
    };
    return (
      <span className="semtm">
        <BCAction className="warn semtm__n" onClick={() => setOpen((v) => !v)} title={`${spots.length} 处术语不一致：译文没按术语表的译法`}>{`${spots.length} 术语不一致`}</BCAction>
        <Popover open={open} onClose={() => setOpen(false)} label="术语不一致" width={320}>
          <div className="semtm__pop">
            <span className="t-detail-xs">这些译文没按术语表里的译法翻。统一是一笔普通编辑，可撤销。</span>
            {spots.map((s) => (
              <div key={s.key + s.got} className="semtm__row">
                <BCAction className="semtm__t" onClick={() => { setOpen(false); onSeek(window.BC_TIME.parse(s.time)); }}>{s.time}</BCAction>
                <span className="semtm__x"><b>{s.term}</b>{` · 译成了「${s.got}」，术语表是「${s.want}」`}</span>
              </div>
            ))}
            <Btn size="s" variant="accent" onClick={fix}>统一为术语表译法</Btn>
          </div>
        </Popover>
      </span>
    );
  }

  Object.assign(window, {BC_SEMTM: {moreItems}, TmChip, TmConflicts});
})();

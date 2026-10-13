/* AI 工具 · 写作结果的出处（embedding-integration-design §2.1、§2.3、§3.4；§4.1 待定项的原型选择）。
   写总结、写博客的结果页正文：每段末尾一排时间码小标签（出处），点了跳预览、文稿里那一句随播放头高亮；
   没有有效出处的段落标「模型推断」（虚线左边线 + 标签）。段落菜单：看出处 / 重写这一段 / 换材料重写…；
   复制两种：去掉出处（缺省）/ 带时间码出处。结果存成 Space 里的一份文档，页首写「已保存到 Space」并能打开。
   博客的关键帧插图（§2.3）：每张带源时间，可「换一张」「去掉」；没装多模态时写明「按时间取帧，未按内容挑选」。
   纯逻辑在 model-writing-cites.js / model-tool-semantic.js。Web 没有 AI 工具 Tab，不加载本文件。 */
(function () {
  const {useState, useEffect, useMemo} = React;
  const C = window.BC_WRCITES;
  const TS = window.BC_TOOL_SEMANTIC;
  const D = window.BC_DATA;
  const W = window.BC_WRITING;

  /* 视频 id → 名字（跨视频出处的标签）；同一份演示 cues 也给系列里的另一部视频用 */
  const nameOf = (id) => {
    const p = (D.projects || []).find((x) => x.id === id);
    return p ? (p.folder || p.title) : id;
  };
  const lookup = (cues) => (video, cue) => (cues || D.cues).find((c) => c.id === cue) || null;

  /** 出处句子集合：这次发过去的（整篇 = 全部；某一章 = 那一章；按主题 = 挑出的；系列 = 再加另一部的） */
  function sentSet(cues, scope, picked, series) {
    let ids = cues.map((c) => c.id);
    if (scope && scope.k === 'topic') ids = picked || [];
    else if (scope && scope.start != null) ids = cues.filter((c) => c.start >= scope.start && c.start < scope.end).map((c) => c.id);
    const out = new Set(ids);
    (series || []).forEach((v) => cues.forEach((c) => out.add(`${v}:${c.id}`)));
    return out;
  }

  /* ---------- 一段 ---------- */
  function CiteChips({b, anchor, onSeek, active}) {
    if (b.inferred) return <span className="wcite__inf"><Chip tone="notice">模型推断</Chip></span>;
    return (
      <span className="wcite__chips">
        {b.cites.map((c) => {
          const a = anchor(c);
          return a ? <BCAction key={a.key} className={cx('wrtime wcite__chip', a.other && 'wcite__chip--other', active === a.key && 'is-on')}
            aria-label={`出处 ${a.label}`} onClick={() => onSeek(a)}>{a.label}</BCAction> : null;
        })}
      </span>
    );
  }

  function Sources({b, anchor, onSeek}) {
    return (
      <div className="wcite__src">
        {b.inferred
          ? <span className="t-detail-xs">{b.dropped ? `这一段引用的句子没有发给模型（丢掉了 ${b.dropped} 条），按模型推断处理。` : '这一段没有写出处：是模型自己的推断，发布前请核对。'}</span>
          : b.cites.map((c) => {
            const a = anchor(c);
            return a ? (
              <BCAction key={a.key} className="wcite__srcrow" onClick={() => onSeek(a)}>
                <span className="wcite__srct">{a.label}</span><span className="wcite__srcx">{a.text}</span>
              </BCAction>
            ) : null;
          })}
      </div>
    );
  }

  function ParaMenu({b, onAct}) {
    const [open, setOpen] = useState(false);
    const act = (k) => { setOpen(false); onAct(k); };
    return (
      <span className="wcite__menu">
        <IconBtn icon="more" size="s" tip="这一段" onClick={() => setOpen((v) => !v)} />
        <Popover open={open} onClose={() => setOpen(false)} align="right" label="这一段">
          <Menu>
            {C.PARA_MENU.map((m) => <MenuItem key={m.k} label={m.label} onClick={() => act(m.k)} />)}
            {b.prev ? <MenuItem label="撤回这一段的重写" onClick={() => act('undo')} /> : null}
          </Menu>
        </Popover>
      </span>
    );
  }

  function Block({b, anchor, onSeek, active, open, onAct, frame, onFrame}) {
    if (/^h\d$/.test(b.type)) {
      const Tag = b.type;
      return <Tag className="wcite__h">{b.text}</Tag>;
    }
    return (
      <>
        <div className={cx('wcite__p', b.type === 'li' && 'wcite__p--li', b.type === 'quote' && 'wcite__p--quote', b.inferred && 'is-inferred', open && 'is-open')}>
          <div className="wcite__body">
            <span className="wcite__text">{b.type === 'li' ? <span className="wcite__dot" aria-hidden="true">•</span> : null}{b.text}</span>
            <CiteChips b={b} anchor={anchor} onSeek={onSeek} active={active} />
            {b.rev ? <span className="wcite__rev">重写过</span> : null}
          </div>
          <ParaMenu b={b} onAct={onAct} />
        </div>
        {open ? <Sources b={b} anchor={anchor} onSeek={onSeek} /> : null}
        {frame ? <Figure f={frame} onFrame={onFrame} /> : null}
      </>
    );
  }

  /* ---------- 关键帧插图（§2.3） ---------- */
  function Figure({f, onFrame}) {
    const sc = W.sceneAt(D.chapters, f.t);
    return (
      <figure className="wcite__fig">
        <window.BC_COVERART.FrameArt f={{t: f.t, scene: sc.k}} className="wcite__img" />
        <figcaption className="wcite__cap">
          <span>{f.caption}</span><span className="spacer" />
          <BCAction className="tsetup__lnk" onClick={() => onFrame('next')}>换一张</BCAction>
          <BCAction className="tsetup__lnk" onClick={() => onFrame('drop')}>去掉</BCAction>
        </figcaption>
      </figure>
    );
  }

  /* ---------- 换材料重写 ---------- */
  function MaterialDialog({b, cues, sent, onClose, onApply}) {
    const cands = useMemo(() => C.materialCands(b, cues, sent, 25), [b.id]);
    const [on, setOn] = useState(() => cands.reduce((m, c) => (m[c.id] = c.on, m), {}));
    const picked = cands.filter((c) => on[c.id]);
    return (
      <Dialog open title="换材料重写这一段" onClose={onClose} width={560}
        footer={<>
          <Btn variant="secondary" onClick={onClose}>取消</Btn>
          <Btn variant="accent" disabled={!picked.length} onClick={() => onApply(picked)}>{`用这 ${picked.length} 句重写`}</Btn>
        </>}>
        <p className="t-detail wcite__lead">勾这一段该基于哪几句。只列这次发给模型的句子，出处附近的排前；已引用的默认勾上。</p>
        <div className="wcite__mat">
          {cands.map((c) => (
            <div key={c.id} className="wcite__matrow">
              <Checkbox on={!!on[c.id]} onChange={(v) => setOn((m) => Object.assign({}, m, {[c.id]: v}))} aria-label={c.text}
                label={<span className="wcite__matl"><span className="wcite__srct">{C.mmss(c.t)}</span><span className="wcite__srcx">{c.text}</span></span>} />
            </div>
          ))}
        </div>
      </Dialog>
    );
  }

  /* ---------- 整份结果 ---------- */
  /** md：模型出的 Markdown（带 [sN]）；scope：ToolSetup 的范围（topic / 章节 / 整篇）；picked：按主题挑的句子；
      series：系列里另外几部视频的 id；frames：要不要插图（博客）；install：BC_SEMSTATE 的安装状态。
      onBlocks：块变了（重写 / 换材料）就回写，复制与保存读最新的块。 */
  function CitedResult({tool, ctx, md, scope, picked, series, frames, install, onBlocks}) {
    const cues = ctx.cues && ctx.cues.length ? ctx.cues : D.cues;
    const pid = ctx.proj.id;
    const sent = useMemo(() => sentSet(cues, scope, picked, series), [md, scope && scope.k, (series || []).join()]);
    const [bs, setBs] = useState(() => C.blocks(md, sent, pid));
    useEffect(() => { setBs(C.blocks(md, sent, pid)); }, [md]);
    useEffect(() => { if (onBlocks) onBlocks(bs); }, [bs]);
    const [open, setOpen] = useState(null);
    const [active, setActive] = useState(null);
    const [mat, setMat] = useState(null);
    const anchor = (c) => C.resolve(c, lookup(cues), pid, {p10: nameOf('p10')});
    const app = useApp();
    /* 点出处：跳预览、文稿里那一句随播放头高亮；跨视频的出处在这部视频里没有，提示去那部视频看 */
    const seek = (a) => {
      setActive(a.key);
      if (a.other) { app.toast(`出处在「${nameOf(a.video)}」${C.mmss(a.t)}：${a.text}`); return; }
      ctx.seek(a.t);
    };
    const ill = useMemo(() => (frames ? TS.illustrations(bs, (id) => cues.find((c) => c.id === id), install) : null), [frames, install, md]);
    const [figs, setFigs] = useState({});
    useEffect(() => { setFigs({}); }, [md, frames, install]);
    const frameOf = (b) => {
      if (!ill) return null;
      const f = ill.frames.find((x) => x.after === b.id);
      if (!f || (figs[b.id] && figs[b.id].dropped)) return null;
      return figs[b.id] || f;
    };
    const onFrame = (b, k) => setFigs((m) => Object.assign({}, m, {[b.id]: k === 'drop' ? {dropped: true} : TS.nextFrame(frameOf(b))}));
    const act = (b, k) => {
      if (k === 'sources') setOpen((v) => (v === b.id ? null : b.id));
      else if (k === 'rewrite') { setBs((x) => C.replaceBlock(x, b.id, C.demoRewrite(b))); app.toast('重写了这一段：只发这一段的出处句与前后文'); }
      else if (k === 'material') setMat(b);
      else if (k === 'undo') setBs((x) => C.undoBlock(x, b.id));
    };
    const st = C.stats(bs);
    return (
      <>
        <div className="wrmeta wcite__stats">
          <span className="t-detail-xs">{`${st.paras} 段 · ${st.cited} 段有出处${st.inferred ? ` · ${st.inferred} 段模型推断` : ''}${st.dropped ? `（丢掉了 ${st.dropped} 条没发给模型的出处）` : ''}${st.videos > 1 ? ` · 出处来自 ${st.videos} 部视频` : ''}`}</span>
          <span className="t-detail-xs">点时间跳到那一句</span>
        </div>
        {ill && ill.note ? <div className="hint hint--tight">{`插图：${ill.note}`}</div> : null}
        <div className="wrdoc wcite">
          {bs.map((b) => (
            <Block key={b.id} b={b} anchor={anchor} onSeek={seek} active={active} open={open === b.id} onAct={(k) => act(b, k)}
              frame={frameOf(b)} onFrame={(k) => onFrame(b, k)} />
          ))}
        </div>
        {mat ? <MaterialDialog b={mat} cues={cues} sent={sent} onClose={() => setMat(null)}
          onApply={(p) => { const r = C.demoFromMaterial(p); setBs((x) => C.replaceBlock(x, mat.id, r)); setMat(null); app.toast(`按你勾的 ${p.length} 句重写了这一段`); }} /> : null}
      </>
    );
  }

  /** 复制的两种（缺省去掉出处排第一）——交给 ProseFlow 的 Actions；anchorFor 用当前视频的 cues */
  function copies(ctx, bs) {
    const cues = ctx.cues && ctx.cues.length ? ctx.cues : D.cues;
    const anchor = (c) => C.resolve(c, lookup(cues), ctx.proj.id, {p10: nameOf('p10')});
    return C.COPY_MODES.map((m) => ({label: m.k === 'strip' ? '复制 Markdown' : '带时间码复制', text: C.toMarkdown(bs, m.k, anchor),
      what: m.k === 'strip' ? ' Markdown（不带出处）' : ' Markdown（带时间码出处）'}));
  }

  /** 存进 Space（§2.1）：每次出结果存一份；返回 Space 条目 */
  function save(app, ctx, tool, bs, stamp) {
    if (!app.registerToolOutput) return null;
    const cues = ctx.cues && ctx.cues.length ? ctx.cues : D.cues;
    const anchor = (c) => C.resolve(c, lookup(cues), ctx.proj.id, {p10: nameOf('p10')});
    const rec = C.savedDoc({tool, pid: ctx.proj.id, dir: ctx.proj.dir, blocks: bs, title: ctx.proj.title, stamp,
      markdown: C.toMarkdown(bs, 'timecode', anchor)});
    return app.registerToolOutput('doc', rec);
  }

  /** 页首那一行：已保存到 Space + 打开 */
  function SavedLine({entry}) {
    const app = useApp();
    if (!entry) return null;
    return (
      <div className="wcite__saved">
        <Ic n="check" className="ic--14" />
        <span className="wcite__savedx">{`已保存到 Space · ${entry.name}`}</span>
        <BCAction className="tsetup__lnk" onClick={() => app.openSpaceEntry(entry.id)}>打开</BCAction>
      </div>
    );
  }

  Object.assign(window, {BC_WRCITE_VIEW: {CitedResult, SavedLine, copies, save, sentSet, nameOf}});
})();

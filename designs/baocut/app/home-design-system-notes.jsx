/* 设计系统标注（docs/design/canvas §10.6）：设计系统标签里的标注层，与 composer 上方、已发送消息里的「设计系统标注 · N 条」。
   原版编辑器只在 DOM 上标目标（`data-comment-target` + `data-id`，见 model-home-design-system-notes.js），批注层归宿主：
   打开「标注」（或按 C）后点一个目标——token、文字样式、组件、素材、用法说明、章节标题或封面——批注框写一句「添加到对话」，
   这一条进当前会话的草稿（`draftDesignSystemAnnotations`），目标上出一个编号标记。不在目标上的点击不收，照常交给页面；
   标注模式下目标里面的控件不接指针（home-design-system.css），点组件预览里的按钮也是在标注那个组件。
   标记跟着目标走：滚动时随正文滚，宽度、主题与内容变化时重算；目标不在页面上（章节空了、那一行没了）就不画。
   批注框与编号标记用设计稿标签的那两个（home-design.jsx 的 DesignNoteForm / DesignPin），标签画法与设计稿标注的标签（home-design-notes.jsx）一家。 */
(function () {
  const {useState, useRef, useEffect, useLayoutEffect} = React;
  const N = window.BC_HOME_DSYS_NOTES;

  /* 元素在滚动正文里的框（正文坐标，随内容滚动） */
  function boxIn(doc, el) {
    const d = doc.getBoundingClientRect(), r = el.getBoundingClientRect();
    return {left: r.left - d.left + doc.scrollLeft, top: r.top - d.top + doc.scrollTop, width: r.width, height: r.height};
  }
  const findTarget = (doc, anchor) => doc.querySelector(`[data-comment-target][data-id="${CSS.escape(anchor)}"]`);
  const sameBoxes = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  /** 标注层。`doc` 是正文的滚动容器，`active` 是这个标签在不在前台。
      返回开关、点选处理、叠在正文上的标记与批注框，以及标签底部的提示。 */
  function useSystemNotes({doc, system, path, active}) {
    const app = useApp();
    const R = window.RSP;
    const sid = app.workspaceSessionId;
    const sess = sid ? app.sessionById(sid) : null;
    const notes = sess?.draftDesignSystemAnnotations || [];
    const [annotating, setAnnotating] = useState(false);
    const [target, setTarget] = useState(null);
    const [boxes, setBoxes] = useState({});
    const [tick, setTick] = useState(0);
    const anchor = useRef(null);
    const mine = system ? N.pins(notes, system.id) : [];
    const toggle = on => { setAnnotating(on); setTarget(null); };
    // C 开关标注模式，Esc 先关批注框（弹层自己收）再退出；只在这个标签在前台、焦点不在输入框里时生效
    useEffect(() => {
      if (!active) return undefined;
      const key = e => {
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
        const el = e.target;
        const typing = el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
        if (e.key === 'Escape' && annotating && !target) setAnnotating(false);
        else if ((e.key === 'c' || e.key === 'C') && !typing && !target) toggle(!annotating);
      };
      window.addEventListener('keydown', key);
      return () => window.removeEventListener('keydown', key);
    }, [active, annotating, target]);
    useEffect(() => { if (!active) setTarget(null); }, [active]);
    // 正文与各章的尺寸一变（换宽度、换主题、内容变了）就重算标记的位置
    useEffect(() => {
      const el = doc.current;
      if (!el || typeof ResizeObserver !== 'function') return undefined;
      const observer = new ResizeObserver(() => setTick(t => t + 1));
      observer.observe(el);
      el.querySelectorAll('[data-section]').forEach(s => observer.observe(s));
      return () => observer.disconnect();
    }, [system?.id]);
    useLayoutEffect(() => {
      const el = doc.current;
      if (!el) return;
      const next = {};
      for (const n of mine) { const t = findTarget(el, n.anchor); if (t) next[n.id] = boxIn(el, t); }
      if (target) { const t = findTarget(el, target.anchor); if (t) next.__target = boxIn(el, t); }
      setBoxes(prev => (sameBoxes(prev, next) ? prev : next));
    }, [tick, notes, target, system]);

    /* 点选：命中最近的目标；不在目标上、或在不收批注的区域里的点击照常交给页面 */
    const onClickCapture = e => {
      if (!annotating || !system || !doc.current) return;
      const el = e.target.closest?.('[data-comment-target]');
      if (!el || !doc.current.contains(el) || e.target.closest('[data-uncommentable]')) return;
      e.preventDefault();
      e.stopPropagation();
      const r = el.getBoundingClientRect();
      const t = N.target(system, {anchor: el.dataset.id, section: el.closest('[data-section]')?.dataset.section, name: el.dataset.dsName});
      setTarget({...t, x: r.width ? (e.clientX - r.left) / r.width : 0.5, y: r.height ? (e.clientY - r.top) / r.height : 0.5});
    };
    const add = text => {
      if (!sess) { app.toast('这个标签页还没有会话。先发一句话开始会话，再添加标注。', 'negative'); return; }
      const next = N.add(notes, {id: crypto.randomUUID(), system: system.id, path, ...target, text});
      if (next.error) { app.toast(next.error, 'negative'); return; }
      app.patchSession(sess.id, {draftDesignSystemAnnotations: next.notes});
      setTarget(null);
      app.toast(`已添加到对话 · ${N.tokenLabel(next.notes)}`);
    };
    const remove = id => { if (sess) app.patchSession(sess.id, {draftDesignSystemAnnotations: N.remove(notes, id)}); };

    const Form = window.DesignNoteForm, Pin = window.DesignPin;
    const overlay = <>
      {Pin ? mine.map(pin => boxes[pin.id] ? <span key={pin.id} className="home-dsys__pinbox" style={boxes[pin.id]}>
        <Pin pin={pin} onRemove={remove} />
      </span> : null) : null}
      {target && boxes.__target ? <span className="home-dsys__pinbox" style={boxes.__target}>
        <span ref={anchor} className="home-design__anchor" style={{left: `${target.x * 100}%`, top: `${target.y * 100}%`}} />
      </span> : null}
      {target && boxes.__target && Form ? <Popover open onClose={() => setTarget(null)} anchorRef={anchor} width={320} label="添加标注">
        <Form key={`${target.anchor}@${target.x},${target.y}`} target={target} onAdd={add} onCancel={() => setTarget(null)} />
      </Popover> : null}
    </>;
    const button = <R.ToggleButton size="M" isSelected={annotating} onChange={toggle}><R.Icons.Comment /><R.Text>标注</R.Text></R.ToggleButton>;
    const hint = annotating ? '点 token、文字样式、组件或素材写批注 · 按 C 或 Esc 退出标注'
      : mine.length ? `${N.tokenLabel(notes)}在对话草稿里` : '';
    // 正文是原版的英文（lang="en"），这一行是 BaoCut 的界面
    const status = hint ? <p className="home-dsys__annot" role="status" lang="zh">{hint}</p> : null;
    return {annotating, button, onClickCapture, overlay, status};
  }

  /* 从标签地址里的 `at`（「章节:锚点」）跳过去：先到那一章，等目标出现了滚到它并闪一下，然后把 `at` 从地址里去掉，
     同一条再点一次还能跳（spec：先改 location.hash 到章节，再等目标出现） */
  function useJumpTo({doc, item, jump}) {
    const app = useApp();
    const W = window.BC_HOME_WORKSPACE;
    useEffect(() => {
      const to = N.parseJump(item.at);
      if (!to || !doc.current) return undefined;
      jump(to.section);
      let tries = 0, frame = 0;
      const look = () => {
        const el = doc.current && findTarget(doc.current, to.anchor);
        if (el) {
          el.scrollIntoView({block: 'center', behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
          el.classList.remove('is-flash'); void el.offsetWidth; el.classList.add('is-flash');
        } else if (++tries < 60) frame = requestAnimationFrame(look);
      };
      frame = requestAnimationFrame(look);
      app.replace(W.route(app.workspaceKey, {...item, at: undefined}));
      return () => cancelAnimationFrame(frame);
    }, [item.at]);
  }

  /* composer 上方与已发送消息里的标签：点开列出各条，点一条打开那套设计系统并跳到那个目标。
     给了 `onRemove` 是草稿，可以逐条移除或全部移除；不给是已发送的消息，只读。 */
  function DesignSystemNotesToken({notes, onRemove, onClear}) {
    const app = useApp();
    const [open, setOpen] = useState(false);
    const anchor = useRef(null);
    if (!notes?.length) return null;
    const draft = !!onRemove;
    const jump = n => {
      setOpen(false);
      if (!app.spaceItems.some(it => it.id === n.system && it.kind === 'design-system')) { app.toast('这套设计系统已移走或删除', 'negative'); return; }
      app.openWorkspaceDesignSystem(n.system, app.workspaceSessionId, N.jumpTo(n));
    };
    return <div ref={anchor} className="cins-token home-slides-notes">
      <BCAction className="home-slides-notes__open" aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(v => !v)}>
        <window.RSP.Icons.Comment /><span>{N.tokenLabel(notes)}</span>
      </BCAction>
      {draft ? <IconBtn icon="close" size="xs" tip="移除全部设计系统标注" onClick={onClear} /> : null}
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} width={360} dir={draft ? 'up' : 'down'} label={N.tokenLabel(notes)}>
        <ol className="home-slides-notes__list bc-scroll">
          {notes.map((n, i) => <li key={n.id} className="home-slides-notes__item">
            <BCAction className="home-slides-notes__jump" aria-label={`第 ${i + 1} 条，${n.label}：${n.text}`} onClick={() => jump(n)}>
              <b className="home-slides-notes__n">{i + 1}</b>
              <span className="home-slides-notes__body"><small>{n.label}</small><span>{n.text}</span></span>
            </BCAction>
            {draft ? <IconBtn icon="close" size="xs" tip={`移除第 ${i + 1} 条标注`} onClick={() => { if (notes.length === 1) setOpen(false); onRemove(n.id); }} /> : null}
          </li>)}
        </ol>
      </Popover>
    </div>;
  }

  Object.assign(window, {useDesignSystemNotes: useSystemNotes, useDesignSystemJump: useJumpTo, DesignSystemNotesToken});
})();

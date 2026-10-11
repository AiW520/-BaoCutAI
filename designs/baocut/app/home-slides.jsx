/* 会话里的幻灯片（docs/design/slides §7.3、§8）：线程里的幻灯片卡片、功能区的幻灯片标签页、标注与批注框。
   正式版的编辑器是 Slides 运行时（iframe），预览、改字、拖动都在它里面；原型只用静态画面占位，画的是 deck 的演示内容
   （data.js `spaceOutputs` 里 kind 为 slides 的条目）。页面按 960×540 的设计尺寸排，再整体缩放到容器宽度。
   标注：打开「标注」后点页面上的元素，批注框写一句「添加到对话」，这一条进当前会话的草稿（`draftSlideAnnotations`），
   页面上出一个编号标记；composer 上方的「幻灯片标注 · N 条」见 home-slides-notes.jsx。发送后草稿清空，标记随之消失。 */
(function () {
  const {useState, useRef, useEffect, useLayoutEffect} = React;
  const S = window.BC_HOME_SLIDES;
  const W = window.BC_HOME_WORKSPACE;
  const DESIGN_WIDTH = 960;

  /** 容器宽度 ÷ 设计宽度：页面整体缩放的比例。 */
  function useFitScale() {
    const ref = useRef(null);
    const [scale, setScale] = useState(0);
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return undefined;
      const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / DESIGN_WIDTH));
      observer.observe(el);
      return () => observer.disconnect();
    }, []);
    return [ref, scale];
  }

  /* 一页里的一块元素。标注模式下可以点、可以用键盘选；点下的位置换算成页面上的比例坐标。 */
  function Part({slide, part, pick, className, as: Tag = 'div', children}) {
    if (!part) return null;
    if (!pick) return <Tag className={className}>{children}</Tag>;
    const at = (e, center) => {
      const face = e.currentTarget.closest('.home-slides__face').getBoundingClientRect();
      const box = e.currentTarget.getBoundingClientRect();
      const x = center ? box.left + box.width / 2 : e.clientX;
      const y = center ? box.top + box.height / 2 : e.clientY;
      return {x: (x - face.left) / face.width, y: (y - face.top) / face.height};
    };
    return <Tag className={cx(className, 'home-slides__part')} role="button" tabIndex={0} data-part={part.id}
      aria-label={`标注 ${part.role}：${S.quote(S.partText(part), 40)}`}
      onClick={e => pick(slide, part, at(e, false))}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(slide, part, at(e, true)); } }}>{children}</Tag>;
  }

  /* 六种版式。字号在 960×540 的设计尺寸上取 S2 的字号阶梯，缩放后整体变小。 */
  function SlideBody({slide, pick}) {
    const p = id => slide.parts.find(x => x.id === id);
    const part = (id, className, children, as) => <Part slide={slide} part={p(id)} pick={pick} className={className} as={as}>{children ?? p(id)?.text}</Part>;
    const items = (id, render) => p(id) ? <Part slide={slide} part={p(id)} pick={pick} className={`home-slides__${slide.layout}-items`}>{p(id).items.map(render)}</Part> : null;
    switch (slide.layout) {
      case 'cover': return <div className="home-slides__cover">
        <i className="home-slides__bar" />
        {part('kicker', 'home-slides__kicker')}
        {part('title', 'home-slides__title home-slides__title--cover')}
        {part('sub', 'home-slides__sub')}
      </div>;
      case 'list': return <div className="home-slides__list">
        {part('title', 'home-slides__title')}
        {items('list', (x, i) => <div key={i} className="home-slides__item"><b>{i + 1}</b><span>{x}</span></div>)}
      </div>;
      case 'steps': return <div className="home-slides__steps">
        {part('title', 'home-slides__title')}
        {items('steps', (x, i) => <div key={i} className="home-slides__step"><small>{String(i + 1).padStart(2, '0')}</small><span>{x}</span></div>)}
      </div>;
      case 'quote': return <div className="home-slides__quote">
        {part('quote', 'home-slides__quote-text')}
        {part('caption', 'home-slides__caption')}
      </div>;
      case 'stats': return <div className="home-slides__stats">
        {part('title', 'home-slides__title')}
        {part('sub', 'home-slides__sub')}
        {items('stats', (x, i) => <div key={i} className="home-slides__stat"><strong>{x.value}</strong><span>{x.label}</span></div>)}
      </div>;
      default: return <div className="home-slides__end">
        {part('title', 'home-slides__title')}
        {part('sub', 'home-slides__sub')}
      </div>;
    }
  }

  /** 一页的画面。`pick` 给了就是标注模式；`children` 叠在页面上（编号标记、批注框的锚点）。 */
  function SlideFace({slide, pick, label, children}) {
    const [ref, scale] = useFitScale();
    return <div ref={ref} className={cx('home-slides__face', pick && 'is-annotating')} role={label ? 'img' : undefined} aria-label={label}>
      <div className="home-slides__page" style={{transform: `scale(${scale})`}} aria-hidden={label ? true : undefined}>
        <SlideBody slide={slide} pick={pick} />
      </div>
      {children}
    </div>;
  }

  /* product-design §3.2.7 的产物卡同一家：上面是第一页，下面是名字、页数与「打开」。 */
  function SlidesDeckCard({item, sess, onOpen}) {
    const app = useApp();
    const R = window.RSP;
    const open = () => { onOpen?.(); app.openWorkspaceSlides(item.id, sess.id); };
    const first = item.slides?.[0];
    return <div className="chat-output chat-output--movie home-slides__card">
      <BCAction className="chat-movie__preview-action" aria-label={`打开幻灯片「${item.name}」`} onClick={open}>
        {first ? <SlideFace slide={first} /> : <span className="chat-movie__empty"><R.Icons.Layout />没有页面</span>}
      </BCAction>
      <div className="chat-movie__footer"><div className="chat-output__body"><strong title={item.name}>{item.name}</strong>
        <span className="chat-movie__meta"><span>{S.meta(item)}</span></span></div>
        <div className="chat-movie__actions"><R.ActionButton size="S" onPress={open}><R.Text>打开</R.Text></R.ActionButton></div>
      </div>
    </div>;
  }

  /* 批注框（docs/design/slides §8.2 第 3 步）：上面是位置，一个输入框，「添加到对话」与「取消」。 */
  function SlideNoteForm({target, onAdd, onCancel}) {
    const R = window.RSP;
    const [text, setText] = useState('');
    const over = text.trim().length > S.LIMITS.text;
    const submit = () => { if (text.trim() && !over) onAdd(text); };
    return <div className="home-slides__form" onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); submit(); } }}>
      <p className="home-slides__form-label">{target.label}</p>
      <R.TextArea aria-label="批注" placeholder="要怎么改？" value={text} onChange={setText} autoFocus
        isInvalid={over} errorMessage={over ? `最多 ${S.LIMITS.text} 字` : undefined} UNSAFE_className="home-slides__form-input" />
      <R.ButtonGroup UNSAFE_className="home-slides__form-actions">
        <R.Button variant="secondary" onPress={onCancel}>取消</R.Button>
        <R.Button variant="accent" isDisabled={!text.trim() || over} onPress={submit}>添加到对话</R.Button>
      </R.ButtonGroup>
    </div>;
  }

  /* 页面上的编号标记：编号与 composer 列表里的一致；点开看批注，可以从对话里移除。 */
  function SlidePin({pin, onRemove}) {
    const R = window.RSP;
    const [open, setOpen] = useState(false);
    const anchor = useRef(null);
    return <span ref={anchor} className="home-slides__pin" style={{left: `${pin.x * 100}%`, top: `${pin.y * 100}%`}}>
      <R.ActionButton size="XS" aria-label={`标注 ${pin.n}：${pin.text}`} onPress={() => setOpen(v => !v)}>{pin.n}</R.ActionButton>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} width={280} label={`标注 ${pin.n}`}>
        <div className="home-slides__pin-note">
          <p className="home-slides__form-label">{pin.label}</p>
          <p>{pin.text}</p>
          <R.ActionButton isQuiet size="S" onPress={() => { setOpen(false); onRemove(pin.id); }}><R.Icons.Delete /><R.Text>从对话中移除</R.Text></R.ActionButton>
        </div>
      </Popover>
    </span>;
  }

  /** 功能区的幻灯片标签页（docs/design/slides §8.1）。 */
  function WorkspaceSlides({item, active}) {
    const app = useApp();
    const R = window.RSP;
    const deck = app.spaceItems.find(it => it.id === item.id && it.kind === 'slides');
    const sid = app.workspaceSessionId;
    const sess = sid ? app.sessionById(sid) : null;
    const notes = sess?.draftSlideAnnotations || [];
    const [annotating, setAnnotating] = useState(false);
    const [target, setTarget] = useState(null);
    const anchor = useRef(null);
    const slideId = deck && (deck.slides.some(s => s.id === item.slide) ? item.slide : deck.slides[0]?.id);
    const slide = deck?.slides.find(s => s.id === slideId);
    const go = id => { setTarget(null); app.replace(W.route(app.workspaceKey, {...item, slide: id})); };
    // Esc 先关批注框，再退出标注模式；只在这个标签页显示时生效。
    useEffect(() => {
      if (!active || !annotating) return undefined;
      const key = e => { if (e.key === 'Escape' && !target && !e.defaultPrevented) setAnnotating(false); };
      window.addEventListener('keydown', key);
      return () => window.removeEventListener('keydown', key);
    }, [active, annotating, target]);
    useEffect(() => { if (!active) setTarget(null); }, [active]);
    if (!deck) return <Empty icon="alert" title="幻灯片已移走或删除" />;
    const pick = (s, part, at) => setTarget({slide: s.id, part: part.id, x: at.x, y: at.y,
      label: S.label(deck, s.id, part), detail: S.detail(deck, s.id, part)});
    const add = text => {
      if (!sess) { app.toast('这个标签页还没有会话。先发一句话开始会话，再添加标注。', 'negative'); return; }
      const next = S.add(notes, {id: crypto.randomUUID(), deck: deck.id, path: deck.file, anchor: `${target.slide}#${target.part}`, ...target, text});
      if (next.error) { app.toast(next.error, 'negative'); return; }
      app.patchSession(sess.id, {draftSlideAnnotations: next.notes});
      setTarget(null);
      app.toast(`已添加到对话 · ${S.tokenLabel(next.notes)}`);
    };
    const remove = id => app.patchSession(sess.id, {draftSlideAnnotations: S.remove(notes, id)});
    const counts = S.countBySlide(notes, deck.id);
    const page = S.pageOf(deck, slideId);
    const dir = app.dirById(deck.dir);
    return <div className="home-slides">
      <header className="home-resource__bar">
        <R.Icons.Layout />
        <div className="grow"><strong>{deck.name}</strong><div className="home-resource__meta">{S.meta(deck)}</div></div>
        <R.ToggleButton size="M" isSelected={annotating} onChange={on => { setAnnotating(on); setTarget(null); }}>
          <R.Icons.Comment /><R.Text>标注</R.Text>
        </R.ToggleButton>
        <R.ActionButton isQuiet onPress={() => app.toast('原型演示：从当前页全屏演示')}><R.Icons.Play /><R.Text>演示</R.Text></R.ActionButton>
        <R.ActionButton isQuiet onPress={() => app.go({r: 'projects', id: deck.dir})}>在 Space 中显示</R.ActionButton>
      </header>
      <div className="home-slides__body">
        <div className="home-slides__rail bc-scroll" role="list" aria-label="页面">
          {deck.slides.map((s, i) => <div key={s.id} role="listitem" className="home-slides__thumb">
            <BCAction className={cx('home-slides__thumb-action', s.id === slideId && 'is-active')} aria-current={s.id === slideId ? 'page' : undefined}
              aria-label={`第 ${i + 1} 页${counts[s.id] ? `，${counts[s.id]} 条标注` : ''}`} onClick={() => go(s.id)}>
              <span className="home-slides__thumb-n">{i + 1}</span>
              <SlideFace slide={s} />
              {counts[s.id] ? <span className="home-slides__thumb-count">{counts[s.id]}</span> : null}
            </BCAction>
          </div>)}
        </div>
        <div className="home-slides__stage bc-scroll">
          <div className="home-slides__canvas">
            <SlideFace slide={slide} pick={annotating ? pick : null}>
              {S.pins(notes, deck.id, slideId).map(pin => <SlidePin key={pin.id} pin={pin} onRemove={remove} />)}
              {target ? <span ref={anchor} className="home-slides__anchor" style={{left: `${target.x * 100}%`, top: `${target.y * 100}%`}} /> : null}
            </SlideFace>
            {target ? <Popover open onClose={() => setTarget(null)} anchorRef={anchor} width={320} label="添加标注">
              <SlideNoteForm key={`${target.slide}#${target.part}@${target.x},${target.y}`} target={target} onAdd={add} onCancel={() => setTarget(null)} />
            </Popover> : null}
          </div>
          <div className="home-slides__status" role="status">
            <R.ActionButton isQuiet size="S" aria-label="上一页" isDisabled={page <= 1} onPress={() => go(S.step(deck, slideId, -1))}><R.Icons.ChevronLeft /></R.ActionButton>
            <span>{page} / {deck.slides.length}</span>
            <R.ActionButton isQuiet size="S" aria-label="下一页" isDisabled={page >= deck.slides.length} onPress={() => go(S.step(deck, slideId, 1))}><R.Icons.ChevronRight /></R.ActionButton>
            <span className="home-slides__hint">{annotating ? '点页面上的元素写批注 · Esc 退出标注' : notes.length ? `${S.tokenLabel(notes)}在对话草稿里` : ''}</span>
          </div>
        </div>
      </div>
      <footer className="home-resource__path">{dir ? dir.path : ''}{deck.file}</footer>
    </div>;
  }

  Object.assign(window, {SlideFace, SlidesDeckCard, WorkspaceSlides});
})();

/* 会话里的设计稿（docs/design/canvas §7.3、§8）：线程里的设计稿卡片、功能区的设计稿标签页、标注与批注框。
   正式版的编辑器是设计稿运行时（iframe），画布、图层、改字、拖动都在它里面；原型只用静态画面占位，画的是设计稿的演示内容
   （data.js `spaceOutputs` 里 kind 为 design 的条目）。每块画板按它自己的设计尺寸排，再按画布取景（BC_HOME_DESIGN.camera）整体缩放。
   标注：打开「标注」后点画板上的元素，批注框写一句「添加到对话」，这一条进当前会话的草稿（`draftDesignAnnotations`），
   画板上出一个编号标记；composer 上方的「设计稿标注 · N 条」见 home-design-notes.jsx。发送后草稿清空，标记随之消失。 */
(function () {
  const {useState, useRef, useEffect, useLayoutEffect} = React;
  const G = window.BC_HOME_DESIGN;
  const W = window.BC_HOME_WORKSPACE;

  /** 容器的内容尺寸。 */
  function useSize() {
    const ref = useRef(null);
    const [size, setSize] = useState({width: 0, height: 0});
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return undefined;
      const observer = new ResizeObserver(([entry]) => setSize({width: entry.contentRect.width, height: entry.contentRect.height}));
      observer.observe(el);
      return () => observer.disconnect();
    }, []);
    return [ref, size];
  }

  /* 画板上的一块元素。标注模式下可以点、可以用键盘选；点下的位置换算成画板上的比例坐标。 */
  function Part({board, part, pick, className, children}) {
    if (!part) return null;
    if (!pick) return <div className={className}>{children}</div>;
    const at = (e, center) => {
      const face = e.currentTarget.closest('.home-design__board').getBoundingClientRect();
      const box = e.currentTarget.getBoundingClientRect();
      const x = center ? box.left + box.width / 2 : e.clientX;
      const y = center ? box.top + box.height / 2 : e.clientY;
      return {x: (x - face.left) / face.width, y: (y - face.top) / face.height};
    };
    return <div className={cx(className, 'home-design__part')} role="button" tabIndex={0} data-part={part.id}
      aria-label={`标注 ${part.role}：${G.quote(G.partText(part), 40)}`}
      onClick={e => { e.stopPropagation(); pick(board, part, at(e, false)); }}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(board, part, at(e, true)); } }}>{children}</div>;
  }

  /* 三种画板：桌面首屏、手机首屏、价格卡片。字号按画板的设计尺寸取，缩放后整体变小。 */
  function BoardBody({board, pick}) {
    const p = id => board.parts.find(x => x.id === id);
    const part = (id, className, children) => <Part board={board} part={p(id)} pick={pick} className={className}>{children ?? p(id)?.text}</Part>;
    const frames = <span className="home-design__frames" aria-hidden="true"><i /><i /><i /></span>;
    switch (board.layout) {
      case 'web': return <div className="home-design__web">
        <div className="home-design__nav"><b>确定性渲染</b>{part('nav', 'home-design__links', p('nav')?.items.map(x => <span key={x}>{x}</span>))}</div>
        <div className="home-design__hero">
          <div className="home-design__copy">
            {part('kicker', 'home-design__kicker')}
            {part('title', 'home-design__title')}
            {part('sub', 'home-design__sub')}
            {part('cta', 'home-design__cta')}
          </div>
          {part('visual', 'home-design__visual', <>{frames}<span>{p('visual')?.text}</span></>)}
        </div>
      </div>;
      case 'phone': return <div className="home-design__phone">
        <div className="home-design__clock" aria-hidden="true"><span>9:41</span><span>●●●</span></div>
        {part('kicker', 'home-design__kicker')}
        {part('title', 'home-design__title home-design__title--phone')}
        {part('sub', 'home-design__sub')}
        {part('visual', 'home-design__visual home-design__visual--phone', <>{frames}<span>{p('visual')?.text}</span></>)}
        {part('cta', 'home-design__cta home-design__cta--block')}
      </div>;
      default: return <div className="home-design__plans">
        {part('title', 'home-design__title')}
        {part('cards', 'home-design__cards', p('cards')?.items.map(x => <div key={x.name} className={cx('home-design__plan', x.featured && 'is-featured')}>
          <span>{x.name}</span><strong>{x.price}</strong><small>{x.note}</small><i>报名</i>
        </div>))}
      </div>;
    }
  }

  /** 一块画板：`box` 是它在视口里的位置与大小，`scale` 是画布的缩放；`children` 叠在画板上（编号标记、批注框的锚点）。 */
  function DesignBoard({board, box, scale, pick, children}) {
    return <div className={cx('home-design__board', pick && 'is-annotating')} data-board={board.id}
      style={{left: box.left, top: box.top, width: box.width, height: box.height}}>
      <div className="home-design__page" style={{width: board.w, height: board.h, transform: `scale(${scale})`}}>
        <BoardBody board={board} pick={pick} />
      </div>
      {children}
    </div>;
  }

  /** 画布：按取景把画板摆进容器。`names` 给了就在每块画板上方写名字；`overlay(board)` 是叠在那块画板上的东西。 */
  function DesignCanvasView({canvas, focus = null, pick, names, overlay, label, pad = 32}) {
    const [ref, size] = useSize();
    const cam = G.camera(canvas, {width: size.width, height: size.height, focus, pad, label: names ? 24 : 0});
    return <div ref={ref} className="home-design__view" role={label ? 'img' : undefined} aria-label={label}>
      {cam.scale > 0 ? canvas.boards.map((b, i) => {
        const box = cam.boards[i];
        return <React.Fragment key={b.id}>
          {names ? <span className="home-design__name" style={{left: box.left, top: box.top - 22, maxWidth: Math.max(box.width, 80)}}>{b.name}</span> : null}
          <DesignBoard board={b} box={box} scale={cam.scale} pick={pick}>{overlay ? overlay(b) : null}</DesignBoard>
        </React.Fragment>;
      }) : null}
    </div>;
  }

  /* product-design §3.2.7 的产物卡同一家：上面是整张画布，下面是名字、画板数与「打开」。 */
  function DesignCanvasCard({item, sess, onOpen}) {
    const app = useApp();
    const R = window.RSP;
    const open = () => { onOpen?.(); app.openWorkspaceDesign(item.id, sess.id); };
    return <div className="chat-output chat-output--movie home-design__card">
      <BCAction className="chat-movie__preview-action" aria-label={`打开设计稿「${item.name}」`} onClick={open}>
        {item.boards?.length ? <span className="home-design__thumb"><DesignCanvasView canvas={item} pad={12} /></span>
          : <span className="chat-movie__empty"><R.Icons.Shapes />没有画板</span>}
      </BCAction>
      <div className="chat-movie__footer"><div className="chat-output__body"><strong title={item.name}>{item.name}</strong>
        <span className="chat-movie__meta"><span>{G.meta(item)}</span></span></div>
        <div className="chat-movie__actions"><R.ActionButton size="S" onPress={open}><R.Text>打开</R.Text></R.ActionButton></div>
      </div>
    </div>;
  }

  /* 批注框（docs/design/canvas §8.2 第 3 步）：上面是位置，一个输入框，「添加到对话」与「取消」。 */
  function DesignNoteForm({target, onAdd, onCancel}) {
    const R = window.RSP;
    const [text, setText] = useState('');
    const over = text.trim().length > G.LIMITS.text;
    const submit = () => { if (text.trim() && !over) onAdd(text); };
    return <div className="home-design__form" onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); submit(); } }}>
      <p className="home-design__form-label">{target.label}</p>
      <R.TextArea aria-label="批注" placeholder="要怎么改？" value={text} onChange={setText} autoFocus
        isInvalid={over} errorMessage={over ? `最多 ${G.LIMITS.text} 字` : undefined} UNSAFE_className="home-design__form-input" />
      <R.ButtonGroup UNSAFE_className="home-design__form-actions">
        <R.Button variant="secondary" onPress={onCancel}>取消</R.Button>
        <R.Button variant="accent" isDisabled={!text.trim() || over} onPress={submit}>添加到对话</R.Button>
      </R.ButtonGroup>
    </div>;
  }

  /* 画板上的编号标记：编号与 composer 列表里的一致；点开看批注，可以从对话里移除。 */
  function DesignPin({pin, onRemove}) {
    const R = window.RSP;
    const [open, setOpen] = useState(false);
    const anchor = useRef(null);
    return <span ref={anchor} className="home-design__pin" style={{left: `${pin.x * 100}%`, top: `${pin.y * 100}%`}}>
      <R.ActionButton size="XS" aria-label={`标注 ${pin.n}：${pin.text}`} onPress={() => setOpen(v => !v)}>{pin.n}</R.ActionButton>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} width={280} label={`标注 ${pin.n}`}>
        <div className="home-design__pin-note">
          <p className="home-design__form-label">{pin.label}</p>
          <p>{pin.text}</p>
          <R.ActionButton isQuiet size="S" onPress={() => { setOpen(false); onRemove(pin.id); }}><R.Icons.Delete /><R.Text>从对话中移除</R.Text></R.ActionButton>
        </div>
      </Popover>
    </span>;
  }

  /** 功能区的设计稿标签页（docs/design/canvas §8.1）。`item.board` 是聚焦的画板，不给就看整张画布。 */
  function WorkspaceDesign({item, active}) {
    const app = useApp();
    const R = window.RSP;
    const canvas = app.spaceItems.find(it => it.id === item.id && it.kind === 'design');
    const sid = app.workspaceSessionId;
    const sess = sid ? app.sessionById(sid) : null;
    const notes = sess?.draftDesignAnnotations || [];
    const [annotating, setAnnotating] = useState(false);
    const [target, setTarget] = useState(null);
    const anchor = useRef(null);
    const focus = canvas?.boards.some(b => b.id === item.board) ? item.board : null;
    const go = id => { setTarget(null); app.replace(W.route(app.workspaceKey, {...item, board: id || undefined})); };
    // Esc 先关批注框，再退出标注模式；只在这个标签页显示时生效。
    useEffect(() => {
      if (!active || !annotating) return undefined;
      const key = e => { if (e.key === 'Escape' && !target && !e.defaultPrevented) setAnnotating(false); };
      window.addEventListener('keydown', key);
      return () => window.removeEventListener('keydown', key);
    }, [active, annotating, target]);
    useEffect(() => { if (!active) setTarget(null); }, [active]);
    if (!canvas) return <Empty icon="alert" title="设计稿已移走或删除" />;
    const pick = (b, part, at) => setTarget({board: b.id, part: part.id, x: at.x, y: at.y,
      label: G.label(canvas, b.id, part), detail: G.detail(canvas, b.id, part)});
    const add = text => {
      if (!sess) { app.toast('这个标签页还没有会话。先发一句话开始会话，再添加标注。', 'negative'); return; }
      const board = G.boardOf(canvas, target.board);
      const next = G.add(notes, {id: crypto.randomUUID(), canvas: canvas.id, path: canvas.file, file: board?.file, anchor: `${target.board}#${target.part}`, ...target, text});
      if (next.error) { app.toast(next.error, 'negative'); return; }
      app.patchSession(sess.id, {draftDesignAnnotations: next.notes});
      setTarget(null);
      app.toast(`已添加到对话 · ${G.tokenLabel(next.notes)}`);
    };
    const remove = id => app.patchSession(sess.id, {draftDesignAnnotations: G.remove(notes, id)});
    const counts = G.countByBoard(notes, canvas.id);
    const dir = app.dirById(canvas.dir);
    const overlay = b => <>
      {G.pins(notes, canvas.id, b.id).map(pin => <DesignPin key={pin.id} pin={pin} onRemove={remove} />)}
      {target?.board === b.id ? <span ref={anchor} className="home-design__anchor" style={{left: `${target.x * 100}%`, top: `${target.y * 100}%`}} /> : null}
    </>;
    return <div className="home-design">
      <header className="home-resource__bar">
        <R.Icons.Shapes />
        <div className="grow"><strong>{canvas.name}</strong><div className="home-resource__meta">{G.meta(canvas)}</div></div>
        <R.ToggleButton size="M" isSelected={annotating} onChange={on => { setAnnotating(on); setTarget(null); }}>
          <R.Icons.Comment /><R.Text>标注</R.Text>
        </R.ToggleButton>
        {/* 整份导出（docs/design/canvas §8.3）：格式由设计稿运行时报；App 弹存储对话框、存好后提示路径，Web 交给浏览器下载。 */}
        <R.MenuTrigger><R.ActionButton><R.Icons.Download /><R.Text>导出</R.Text></R.ActionButton>
          <R.Menu aria-label="导出" onAction={key => app.toast(`已保存到 ~/Downloads/${canvas.name}.${key}`, 'positive')}>
            <R.MenuItem id="html">HTML（单个文件）</R.MenuItem>
            <R.MenuItem id="pdf">PDF</R.MenuItem>
          </R.Menu>
        </R.MenuTrigger>
        <R.ActionButton isQuiet onPress={() => app.go({r: 'projects', id: canvas.dir})}>在 Space 中显示</R.ActionButton>
      </header>
      <div className="home-design__body">
        <div className="home-design__rail bc-scroll" role="list" aria-label="画板">
          <div role="listitem"><BCAction className={cx('home-design__layer', !focus && 'is-active')} aria-current={!focus ? 'true' : undefined} onClick={() => go(null)}>
            <R.Icons.ViewGrid /><span className="grow">整张画布</span>
          </BCAction></div>
          {canvas.boards.map(b => <div key={b.id} role="listitem">
            <BCAction className={cx('home-design__layer', b.id === focus && 'is-active')} aria-current={b.id === focus ? 'true' : undefined}
              aria-label={`${b.name}，${b.w} × ${b.h}${counts[b.id] ? `，${counts[b.id]} 条标注` : ''}`} onClick={() => go(b.id)}>
              <R.Icons.Layout /><span className="grow"><span>{b.name}</span><small>{b.w} × {b.h}</small></span>
              {counts[b.id] ? <span className="home-design__count">{counts[b.id]}</span> : null}
            </BCAction>
          </div>)}
        </div>
        <div className="home-design__stage">
          <DesignCanvasView canvas={canvas} focus={focus} pick={annotating ? pick : null} names overlay={overlay} />
          {target ? <Popover open onClose={() => setTarget(null)} anchorRef={anchor} width={320} label="添加标注">
            <DesignNoteForm key={`${target.board}#${target.part}@${target.x},${target.y}`} target={target} onAdd={add} onCancel={() => setTarget(null)} />
          </Popover> : null}
          <div className="home-design__status" role="status">
            {focus ? <R.ActionButton isQuiet size="S" onPress={() => go(null)}><R.Icons.ViewGrid /><R.Text>整张画布</R.Text></R.ActionButton> : null}
            <span className="home-design__hint">{annotating ? '点画板上的元素写批注 · Esc 退出标注' : notes.length ? `${G.tokenLabel(notes)}在对话草稿里` : ''}</span>
          </div>
        </div>
      </div>
      <footer className="home-resource__path">{dir ? dir.path : ''}{canvas.file}</footer>
    </div>;
  }

  // 批注框与编号标记也给设计系统标签用（home-design-system-notes.jsx）
  Object.assign(window, {DesignCanvasView, DesignCanvasCard, WorkspaceDesign, DesignNoteForm, DesignPin});
})();

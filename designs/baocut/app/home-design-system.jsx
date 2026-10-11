/* 会话里的设计系统（docs/design/canvas §10.5、§10.6）：线程里的设计系统卡片、Space 预览的小封面、功能区的设计系统标签。
   标签正文照原版编辑器画（claude-skills/src/design-system-type；来源文件见 model-home-design-system.js 的头注释）：
   左侧章节导航（files/ui/navigation.tsx 的 SidebarSectionNavigation：Search、章节行、分隔线、Files 行），
   窄的时候换成浮在左上角的「Sections」按钮（FloatingSectionNavigation，原版在编辑器视口不到 1000px 时换，这里按标签自己的宽度）；
   右侧一列章节卡片（每章一张 sheet），各章正文在 home-design-system-overview.jsx 与 home-design-system-tables.jsx。
   标题栏、线程卡与 Space 是 BaoCut 的界面，跟界面语言；正文是原版的英文。
   点导航跳到那一章：原版改 location.hash，原型的 hash 归应用路由用，所以看到哪一章只是这个标签自己的状态，不进地址。
   标注（§10.6）：标题栏的「标注」开关与 C 键，批注层、编号标记与 composer 上的标签在 home-design-system-notes.jsx；
   从标签里的一条跳回来时地址带 `at`（「章节:锚点」），跳到那一章、滚到那个目标后去掉。 */
(function () {
  const {useState, useRef, useEffect, useLayoutEffect} = React;
  const G = window.BC_HOME_DESIGN_SYSTEM;

  /* 线程卡片一行（§10.5）：图标、标题、「设计系统」；点了在功能区开设计系统标签。会话头「会话摘要」弹层里是同一张卡。 */
  function DesignSystemCard({item, sess, onOpen}) {
    const app = useApp();
    const R = window.RSP;
    const open = () => { onOpen?.(); app.openWorkspaceDesignSystem(item.id, sess.id); };
    return <BCAction className="chat-output home-dsys-card" aria-label={`打开设计系统「${item.name}」`} onClick={open}>
      <span className="chat-output__icon"><R.Icons.ColorHarmony /></span>
      <span className="chat-output__body"><strong title={item.name}>{item.name}</strong><span>设计系统</span></span>
      <Ic n="eye" className="ic--16" />
    </BCAction>;
  }

  /** Space 网格与查看框里的预览：有封面画封面，没有就是名字。类型与组件数在卡片下面写，这里不重复。 */
  function DesignSystemFace({system, label}) {
    const Cover = window.DesignSystemCover;
    return <div className="home-dsys-face" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {system.cover && Cover ? <Cover system={system} decorative /> : <span className="home-dsys-face__blank"><b>{system.name}</b></span>}
    </div>;
  }

  /** 章节行的图标（原版 SECTION_ICON_NAMES，换成 S2 图标）。 */
  function SectionIcon({id}) {
    const R = window.RSP;
    const I = R.Icons[G.icon(id)] || R.Icons.Properties;
    return <I />;
  }

  /* 一个元素顶边在滚动容器里的位置 */
  const topIn = (scroller, el) => el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;

  /* 滚动同步当前章，点导航跳过去。跳的途中锁住高亮，免得滚过中间几章时一路闪；跳完以后等用户自己滚了再按位置算。
     `hold` 让浮动按钮在滚动时展开一会儿（原版 useNavigationPillActivity，1 秒）。 */
  function useSections(ids) {
    const doc = useRef(null);
    const lock = useRef(false);
    const settle = useRef(0);
    const awake = useRef(0);
    const [current, setCurrent] = useState(ids[0] || null);
    const [moving, setMoving] = useState(false);
    const sync = () => {
      const el = doc.current;
      if (!el) return;
      const tops = ids.map(id => { const s = el.querySelector(`[data-section="${id}"]`); return {id, top: s ? topIn(el, s) : NaN}; });
      const atEnd = el.scrollTop > 0 && el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      const next = G.activeSection(tops, el.scrollTop, {offset: 72, atEnd});
      if (next) setCurrent(next);
    };
    const onScroll = () => {
      setMoving(true);
      clearTimeout(awake.current);
      awake.current = setTimeout(() => setMoving(false), 1000);
      if (!lock.current) { sync(); return; }
      clearTimeout(settle.current);
      settle.current = setTimeout(() => { lock.current = false; }, 160);
    };
    const scrollTo = (target, id) => {
      const el = doc.current;
      if (!el || !target) return;
      setCurrent(id);
      lock.current = true;
      clearTimeout(settle.current);
      settle.current = setTimeout(() => { lock.current = false; }, 600);
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      el.scrollTo({top: Math.max(0, topIn(el, target) - 64), behavior: reduce ? 'auto' : 'smooth'});
    };
    const jump = id => {
      const target = doc.current?.querySelector(`[data-section="${id}"]`);
      scrollTo(target, id);
      target?.querySelector('.home-dsys__title')?.focus({preventScroll: true});
    };
    /* 搜索命中：跳到那一行，没有那一行就跳到那一章 */
    const pick = hit => {
      const sec = doc.current?.querySelector(`[data-section="${hit.section}"]`);
      const row = [...(sec?.querySelectorAll('[data-ds-row]') || [])].find(r => r.dataset.dsRow === hit.label);
      scrollTo(row || sec, hit.section);
      if (row) { row.classList.remove('is-flash'); void row.offsetWidth; row.classList.add('is-flash'); }
    };
    useEffect(() => () => { clearTimeout(settle.current); clearTimeout(awake.current); }, []);
    useLayoutEffect(() => { if (!ids.includes(current)) setCurrent(ids[0] || null); }, [ids.join('|')]);
    return {doc, current, moving, onScroll, jump, pick};
  }

  /* 导航里的搜索（原版 SectionSearchField / SectionSearchStatus）：Esc 清空 */
  function NavSearch({query, onQuery}) {
    const R = window.RSP;
    return <div className="home-dsys__search">
      <R.SearchField aria-label="Search" placeholder="Search" value={query} onChange={onQuery} UNSAFE_style={{width: '100%'}} />
    </div>;
  }

  /* 章节行：图标、名字，Files 行带数；搜索时每章下面列命中 */
  function NavRows({system, current, query, onJump, onPick}) {
    const rows = G.sections(system);
    const tail = G.tail(system);
    const found = G.search(system, query);
    const status = G.searchStatus(query, found);
    const row = s => <BCAction key={s.id} className={cx('home-dsys__navrow', s.id === current && 'is-current')} aria-current={s.id === current ? 'location' : undefined}
      aria-label={G.rowLabel(s)} onClick={() => onJump(s.id)}>
      <SectionIcon id={s.id} />
      <span className="home-dsys__navlabel">{s.label}</span>
      {s.count > 0 ? <span className="home-dsys__navcount" title={s.countLabel}>{s.count.toLocaleString('en-US')}</span> : null}
    </BCAction>;
    const all = [...rows, ...tail];
    const shown = found ? found.groups.map(g => ({s: all.find(x => x.id === g.section), hits: g.hits})) : all.map(s => ({s, hits: []}));
    return <>
      <div className="home-dsys__navlist">
        {shown.map(({s, hits}, i) => <React.Fragment key={s.id}>
          {s.id === tail[0].id && i > 0 ? <div className="home-dsys__navrule" aria-hidden="true" /> : null}
          {row(s)}
          {hits.map(h => <BCAction key={h.label} className="home-dsys__navrow home-dsys__navhit" aria-label={h.detail ? `${h.label}, ${h.detail}` : undefined}
            onClick={() => onPick(h)}>
            <span className="home-dsys__navlabel">{h.label}</span>
            {h.detail ? <span className="home-dsys__navdetail">{h.detail}</span> : null}
          </BCAction>)}
        </React.Fragment>)}
      </div>
      {found ? <p className={cx('home-dsys__navstatus', !status.visible && 'home-dsys__sr')} role="status">{status.text}</p> : null}
    </>;
  }

  /* 宽的时候：左侧一栏。刚建好的设计系统没有 Search（原版 emptySystem 时不给 navigationSearch）。 */
  function SideNav({system, empty, ...rest}) {
    const [query, setQuery] = useState('');
    return <nav className="home-dsys__nav bc-scroll" aria-label="Sections">
      {empty ? null : <NavSearch query={query} onQuery={setQuery} />}
      <NavRows system={system} query={empty ? '' : query} {...rest} />
    </nav>;
  }

  /* 窄的时候：浮在左上角的按钮，滚动或悬停时展开成「当前章 · N of M」，点开是同一份导航（原版 FloatingSectionNavigation） */
  function NavPill({system, empty, current, moving, onJump, onPick}) {
    const anchor = useRef(null);
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [query, setQuery] = useState('');
    const rows = G.sections(system);
    const at = rows.findIndex(s => s.id === current);
    const label = rows[at]?.label || G.tail(system).find(s => s.id === current)?.label || 'Sections';
    const wide = moving || hover || open;
    const done = fn => arg => { setOpen(false); fn(arg); };
    return <div className="home-dsys__fab" data-uncommentable="">
      <button ref={anchor} type="button" className="home-dsys__fab-btn" data-wide={wide ? '' : undefined} aria-label="Sections"
        aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
        {current && current !== rows[0]?.id ? <SectionIcon id={current} /> : <window.RSP.Icons.MenuHamburger />}
        <span className="home-dsys__fab-label"><span className="home-dsys__fab-text">
          <span>{label}</span>{at >= 0 ? <span className="home-dsys__fab-of">{`${at + 1} of ${rows.length}`}</span> : null}
        </span></span>
      </button>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} label="Sections" align="left" width={240} padding="none" className="home-dsys__fab-pop">
        <nav className="home-dsys__nav home-dsys__nav--pop" aria-label="Sections">
          {empty ? null : <NavSearch query={query} onQuery={setQuery} />}
          <NavRows system={system} current={current} query={empty ? '' : query} onJump={done(onJump)} onPick={done(onPick)} />
        </nav>
      </Popover>
    </div>;
  }

  /** 功能区的设计系统标签（docs/design/canvas §10.6）：BaoCut 的标题栏，下面是原版编辑器的正文。 */
  function WorkspaceDesignSystem({item, active}) {
    const app = useApp();
    const R = window.RSP;
    const system = app.spaceItems.find(it => it.id === item.id && it.kind === 'design-system');
    const list = system ? [...G.sections(system), ...G.tail(system)] : [];
    const {doc, current, moving, onScroll, jump, pick} = useSections(list.map(s => s.id));
    const dir = system ? app.dirById(system.dir) : null;
    const notes = window.useDesignSystemNotes({doc, system, path: system ? G.systemPath(system, dir) : '', active});
    window.useDesignSystemJump({doc, item, jump});
    if (!system) return <Empty icon="alert" title="设计系统已移走或删除" />;
    const empty = G.isEmpty(system);
    const showInSpace = () => app.go({r: 'projects', id: system.dir});
    /* Files 行：原版在编辑器里打开文件列表；原型没有那一页，转到 Space 里它所在的目录 */
    const onJump = id => (id === G.FILES ? showInSpace() : jump(id));
    const Section = window.DesignSystemSection;
    return <div className={cx('home-dsys', notes.annotating && 'is-annotating')}>
      <header className="home-resource__bar">
        <R.Icons.ColorHarmony />
        <div className="grow"><strong>{system.name}</strong><div className="home-resource__meta">{G.meta(system)}</div></div>
        {notes.button}
        <R.ActionButton isQuiet onPress={showInSpace}>在 Space 中显示</R.ActionButton>
      </header>
      <div className="home-dsys__body" lang="en">
        <SideNav system={system} empty={empty} current={current} onJump={onJump} onPick={pick} />
        <div ref={doc} className="home-dsys__main bc-scroll" onScroll={onScroll} onClickCapture={notes.onClickCapture}>
          <NavPill system={system} empty={empty} current={current} moving={moving} onJump={onJump} onPick={pick} />
          {G.sections(system).map(s => <section key={s.id} className="home-dsys__section" data-section={s.id} aria-label={s.label}>
            {Section ? <Section system={system} id={s.id} label={s.label} path={G.systemPath(system, dir)} onPick={pick} /> : null}
          </section>)}
          {notes.overlay}
        </div>
        {notes.status}
      </div>
      <footer className="home-resource__path">{G.systemPath(system, dir)}</footer>
    </div>;
  }

  Object.assign(window, {DesignSystemCard, DesignSystemFace, DesignSystemSectionIcon: SectionIcon, WorkspaceDesignSystem});
})();

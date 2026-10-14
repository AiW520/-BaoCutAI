/* Home ›「已归档会话」（product-design §3.1：归档只影响列表显示；会话的菜单有归档、删除）—— 只在 App 入口加载。

   入口两处：侧栏「项目」段头的 ⋯ 菜单；归档会话后 toast 上的「查看归档」（带 id，落地后高亮那一条）。
   页面：搜索 + 项目筛选；按项目分组，不属于任何项目的放最后；每行标题点开就是那条会话（会话页顶上有「已归档」横幅），
   行尾「恢复」与删除。删除只删会话记录，不删项目、视频、产物或已发生的修改，先确认。
   分组、搜索、排序在 model-agent-projects.js 的 archivedView 里算，这里只画。 */
(function () {
  const {useState, useMemo, useEffect, useRef} = React;
  const AP = window.BC_AGENT_PROJECTS;
  const AG = window.BC_AGENT;
  const IA = window.BC_APP_IA;

  const DELETE_NOTE = '会话记录会被删掉，不能撤销。项目、视频、产物和已经发生的修改不受影响。';

  function ArchivedRow({s, focus}) {
    const app = useApp();
    const R = window.RSP;
    const ref = useRef(null);
    const title = s.title || '新会话';
    useEffect(() => { if (focus && ref.current) ref.current.scrollIntoView({block: 'center'}); }, [focus]);
    const restore = () => {
      app.archiveSession(s.id, false);
      app.toast(`已恢复「${title}」`, 'positive', {label: '打开', run: () => app.go({r: 'agent', id: s.id})});
    };
    const remove = () => app.confirm({
      title: '删除这个会话？', tone: 'negative', confirmLabel: '删除', body: `「${title}」${DELETE_NOTE}`,
      run: () => { app.deleteSessions([s.id]); app.toast(`已删除「${title}」`); },
    });
    return (
      <li ref={ref} className={cx('arc-row', focus && 'is-focus')} data-archived-row={s.id}>
        <div className="arc-row__b">
          <R.Link href={IA.hrefFor({r: 'agent', id: s.id})} isStandalone isQuiet variant="secondary" UNSAFE_className="arc-row__t">{title}</R.Link>
          <span className="arc-row__meta">归档于 {AG.agoLabel(s.archivedAgo)} · 最后活动 {AG.agoLabel(s.ago)}</span>
        </div>
        <div className="arc-row__actions">
          <R.ActionButton size="S" onPress={restore} aria-label={`恢复「${title}」`}><R.Icons.Revert /><R.Text>恢复</R.Text></R.ActionButton>
          <R.TooltipTrigger>
            <R.ActionButton size="S" isQuiet onPress={remove} aria-label={`删除「${title}」`}><R.Icons.Delete /></R.ActionButton>
            <R.Tooltip>删除会话</R.Tooltip>
          </R.TooltipTrigger>
        </div>
      </li>
    );
  }

  function ArchivedSessionsPage({focus}) {
    const app = useApp();
    const R = window.RSP;
    const [query, setQuery] = useState('');
    const [dir, setDir] = useState('all');
    const v = useMemo(() => AP.archivedView({dirs: app.dirs, movies: app.projects, sessions: app.sessions}, {query, dir}),
      [app.dirs, app.projects, app.sessions, query, dir]);
    /* 筛的那个项目已经没有归档会话了（全恢复或删光）：回到全部 */
    useEffect(() => { if (dir !== 'all' && !(dir === 'none' ? v.hasLoose : v.dirs.some((d) => d.id === dir))) setDir('all'); }, [v, dir]);
    const removeAll = () => app.confirm({
      title: `删除全部 ${v.total} 个已归档会话？`, tone: 'negative', confirmLabel: '全部删除', body: DELETE_NOTE,
      run: () => {
        app.deleteSessions(app.sessions.filter((s) => s.archived).map((s) => s.id));
        app.toast(`已删除 ${v.total} 个已归档会话`);
      },
    });
    const actions = v.total ? <R.Button variant="secondary" fillStyle="outline" size="M" onPress={removeAll}>
      <R.Icons.Delete /><R.Text>全部删除</R.Text></R.Button> : null;
    return (
      <window.Page title="已归档会话" actions={actions}>
        <p className="arc-intro">归档的会话不在侧栏里显示，里面的视频、文件和改动都还在。恢复后回到原来的项目下。</p>
        {v.total ? (
          <div className="arc-bar">
            <R.SearchField aria-label="搜索已归档会话" placeholder="搜索已归档会话" value={query} onChange={setQuery} UNSAFE_className="arc-bar__search" />
            <R.Picker aria-label="按项目筛选" selectedKey={dir} onSelectionChange={setDir} align="end" UNSAFE_className="arc-bar__picker">
              {[{id: 'all', name: '全部项目'}].concat(v.dirs, v.hasLoose ? [{id: 'none', name: '不属于任何项目'}] : []).map((d) => (
                <R.PickerItem key={d.id} id={d.id} textValue={d.name}>{d.name}</R.PickerItem>
              ))}
            </R.Picker>
          </div>
        ) : null}
        {!v.total ? (
          <Empty icon="folder" title="还没有归档的会话">在侧栏的会话行上点归档按钮，会话就会收到这里，之后可以恢复。</Empty>
        ) : !v.count ? (
          <Empty icon="search" title="没有匹配的会话">换个关键词，或者把项目筛选改回「全部项目」。</Empty>
        ) : v.groups.map((g) => (
          <section key={g.key} className="arc-group" aria-label={g.dir ? g.dir.name : '不属于任何项目'}>
            <header className="arc-group__hd">
              {g.dir ? <R.Icons.Folder /> : <R.Icons.Chat />}
              <h2 className="arc-group__t">{g.dir ? g.dir.name : '不属于任何项目'}</h2>
              {g.dir ? <span className="arc-group__path">{g.dir.path}</span> : null}
              <span className="arc-group__n">{g.sessions.length} 个会话</span>
            </header>
            <ul className="arc-list">
              {g.sessions.map((s) => <ArchivedRow key={s.id} s={s} focus={focus === s.id} />)}
            </ul>
          </section>
        ))}
      </window.Page>
    );
  }

  /** 打开一条已归档会话时，会话页顶上的横幅：说明它不在侧栏里，给一个恢复。 */
  function ArchivedBanner({sess}) {
    const app = useApp();
    const R = window.RSP;
    return (
      <div className="arc-banner" role="status">
        <R.Icons.Archive />
        <span className="arc-banner__t">这个会话已归档，不在侧栏里显示。</span>
        <R.ActionButton size="S" isQuiet onPress={() => app.go({r: 'archived', id: sess.id})}>查看全部归档</R.ActionButton>
        <R.Button size="S" variant="secondary" onPress={() => { app.archiveSession(sess.id, false); app.toast(`已恢复「${sess.title || '新会话'}」`, 'positive'); }}>恢复</R.Button>
      </div>
    );
  }

  Object.assign(window, {ArchivedSessionsPage, ArchivedBanner});
})();

/* 设计系统标签的 Overview 与各章共用的外框（docs/design/canvas §10.6），照原版编辑器画：
   - 每章一张 sheet，头部是衬线大标题、说明与右上角的按钮（editor/section-headers.tsx 的 SectionHeader / SectionSheet / SectionAddButton）；
   - Overview：有封面时封面贴在 sheet 顶上（editor/cover-preview.tsx），下面是 README（editor/readme-article.tsx）；
     刚建好的设计系统写的是起步 README，下面另一张 sheet 是「Not sure where to start?」三张卡片与上传面板（files/ui/welcome.tsx）。
   标注目标照原版标：章节头 `page-<章节>`（section-headers.tsx），封面 `ds-cover`（cover-preview.tsx）；README 正文与起步卡片不是目标。
   起步卡片：「Sync from GitHub」「Build from connectors」把请求放进这个会话的输入框，由用户自己发（原版直接发给 Claude）；
   「Upload brand files」在原地换成上传面板，原型不真的读文件。正文是原版的英文，提示（toast）是 BaoCut 的界面，跟界面语言。 */
(function () {
  const {useState, useRef, useEffect} = React;
  const G = window.BC_HOME_DESIGN_SYSTEM;
  const target = (prefix, name) => window.BC_HOME_DSYS_NOTES?.targetProps(prefix, name) || {};

  function Sheet({className, children}) {
    return <div className={cx('home-dsys__sheet', className)}>{children}</div>;
  }

  /* 章节头：标题能接焦点（从导航跳过来时把焦点放上去）；`section` 给了就是标注目标 */
  function SectionHeader({title, note, actions, section}) {
    return <header className="home-dsys__head" {...(section ? target('page', section) : {})}>
      <div className="home-dsys__head-text">
        <h2 className="home-dsys__title" tabIndex={-1}>{title}</h2>
        {note ? <p className="home-dsys__note">{note}</p> : null}
      </div>
      {actions ? <div className="home-dsys__actions">{actions}</div> : null}
    </header>;
  }

  /* 章节头右边的按钮（原版 sectionHeaderActions）：原型没有画 token 编辑，按了只提示一句 */
  function SectionActions({system, id}) {
    const app = useApp();
    const R = window.RSP;
    const list = G.sectionActions(system, id);
    if (!list.length) return null;
    return list.map(a => {
      const I = R.Icons[a.icon || 'Add'];
      const button = <R.Button key={a.key} variant="secondary" aria-label={a.what} onPress={() => app.toast('原型里没有画设计系统的编辑（演示）')}>
        <I /><R.Text>{a.label}</R.Text>
      </R.Button>;
      return a.what ? <Tip key={a.key} label={a.what}>{button}</Tip> : button;
    });
  }

  /* 封面（components/Cover/preview.html 的同一张图）：块与胶囊用 Spectrum 2 的 token，文字跟着封面一起缩放。
     accent 与 notice 在两个主题下取不同的色阶（accent-background-default 是 blue-900 / blue-800，notice 是 orange-600 / orange-900）。 */
  function DesignSystemCover({system, decorative}) {
    const ground = 'home-dsys-cover__ground';
    return <svg className="home-dsys-cover" viewBox="0 0 960 288" preserveAspectRatio="xMidYMid slice" role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : `${system.name} cover`} aria-hidden={decorative ? true : undefined}>
      <rect className={ground} width="960" height="288" />
      <rect className="home-dsys-cover__accent" x="520" y="-16" width="248" height="200" rx="16" />
      <rect className="home-dsys-cover__ink" x="784" y="-16" width="192" height="120" rx="16" />
      <rect className="home-dsys-cover__tint" x="784" y="120" width="192" height="184" rx="16" />
      <rect className="home-dsys-cover__notice" x="520" y="200" width="64" height="64" rx="16" />
      <rect className={ground} x="544" y="104" width="96" height="32" rx="16" />
      <rect className={ground} x="652" y="104" width="64" height="32" rx="16" />
      <rect className="home-dsys-cover__ink" x="544" y="40" width="128" height="32" rx="16" />
      <rect className={ground} x="800" y="140" width="112" height="32" rx="16" />
      <rect className="home-dsys-cover__accent" x="800" y="184" width="76" height="32" rx="16" />
      <rect className={ground} x="888" y="184" width="72" height="32" rx="16" />
      <rect className="home-dsys-cover__ink" x="800" y="228" width="140" height="32" rx="16" />
      <rect className="home-dsys-cover__tint" x="600" y="232" width="152" height="32" rx="16" />
      <text className="home-dsys-cover__name" x="40" y="204">{system.name}</text>
      {system.cover?.tagline ? <text className="home-dsys-cover__tag" x="40" y="246">{system.cover.tagline}</text> : null}
    </svg>;
  }

  /* README 的行内：`code` 与 **粗体** */
  function Inline({text}) {
    return G.inline(text).map((p, i) => p.t === 'code' ? <code key={i}>{p.v}</code> : p.t === 'bold' ? <strong key={i}>{p.v}</strong> : p.v);
  }

  /* README（原版 ReadmeArticle 的只读样子）：一级标题是衬线大字，二级标题是正文大小的粗体，段落与列表是次要文字 */
  function Readme({text, starter}) {
    return <div className={cx('home-dsys__readme', starter && 'is-starter')}>
      {G.markdown(text).map((b, i) => {
        if (b.type === 'h1') return <h3 key={i} className="home-dsys__readme-h1"><Inline text={b.text} /></h3>;
        if (b.type === 'h2' || b.type === 'h3') return <h4 key={i}><Inline text={b.text} /></h4>;
        if (b.type === 'ul') return <ul key={i}>{b.items.map((x, j) => <li key={j}><Inline text={x} /></li>)}</ul>;
        if (b.type === 'table') return <div key={i} className="home-dsys__readme-table"><table>
          <thead><tr>{b.head.map((c, j) => <th key={j}><Inline text={c} /></th>)}</tr></thead>
          <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}><Inline text={c} /></td>)}</tr>)}</tbody>
        </table></div>;
        return <p key={i}><Inline text={b.text} /></p>;
      })}
    </div>;
  }

  /* 起步卡片的图标：GitHub 标志按原版画（16 格），其余用 S2 图标 */
  function WelcomeIcon({name}) {
    const R = window.RSP;
    if (name === 'github') return <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M8 1.8a6.3 6.3 0 0 0-2 12.3c.3.1.4-.1.4-.3v-1.1c-1.8.4-2.1-.8-2.1-.8-.3-.7-.7-.9-.7-.9-.6-.4 0-.4 0-.4.6 0 1 .6 1 .6.6 1 1.5.7 1.9.5.1-.4.2-.7.4-.9-1.4-.2-2.9-.7-2.9-3.1 0-.7.2-1.2.6-1.7-.1-.2-.3-.8.1-1.7 0 0 .5-.2 1.7.6a5.8 5.8 0 0 1 3.1 0c1.2-.8 1.7-.6 1.7-.6.4.9.1 1.5.1 1.7.4.5.6 1 .6 1.7 0 2.4-1.5 2.9-2.9 3.1.2.2.4.6.4 1.2v1.8c0 .2.1.4.4.3A6.3 6.3 0 0 0 8 1.8Z" />
    </svg>;
    const I = R.Icons[name];
    return <I />;
  }

  /* 上传面板（原版 BrandUpload）：拖放区与两个选择按钮，底部是状态与「Create design system」；没有文件时不能建 */
  function BrandUpload({onBack}) {
    const app = useApp();
    const R = window.RSP;
    const T = G.BRAND_UPLOAD_TEXT;
    const pick = () => app.toast('原型不读取文件（演示）');
    return <div className="home-dsys__upload">
      <div className="home-dsys__upload-head">
        <h3 className="home-dsys__welcome-title">{T.title}</h3>
        <R.ActionButton isQuiet size="S" onPress={onBack}><R.Icons.ChevronLeft /><R.Text>{T.back}</R.Text></R.ActionButton>
      </div>
      <div className="home-dsys__drop">
        <R.Icons.Upload />
        <p className="home-dsys__drop-line">{T.line}</p>
        <p className="home-dsys__drop-hint">{T.hint}</p>
        <div className="home-dsys__drop-actions">
          <R.Button variant="secondary" size="S" onPress={pick}>{T.chooseFiles}</R.Button>
          <R.Button variant="secondary" size="S" onPress={pick}>{T.chooseFolder}</R.Button>
        </div>
      </div>
      <div className="home-dsys__upload-foot">
        <p className="home-dsys__upload-status" role="status" id="home-dsys-upload-why">{T.noFiles}</p>
        <R.Button variant="accent" isDisabled aria-describedby="home-dsys-upload-why">{T.create}</R.Button>
      </div>
    </div>;
  }

  /* 「Not sure where to start?」：只在刚建好的设计系统里出现 */
  function Welcome({system, path}) {
    const app = useApp();
    const [panel, setPanel] = useState(false);
    const [sent, setSent] = useState(false);
    const timer = useRef(0);
    useEffect(() => () => clearTimeout(timer.current), []);
    const choose = option => {
      if (option === 'upload') { setPanel(true); return; }
      const sid = app.workspaceSessionId || system.session;
      app.patchSession(sid, {draftAppend: {id: crypto.randomUUID(), text: G.welcomePrompt(option, path)}});
      setSent(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setSent(false), 4000);
    };
    return <Sheet className="home-dsys__welcome">
      {panel ? <BrandUpload onBack={() => setPanel(false)} /> : <>
        <h3 className="home-dsys__welcome-title">{G.WELCOME_TITLE}</h3>
        <div className="home-dsys__welcome-options">{G.WELCOME_OPTIONS.map(o => <BCAction key={o.id} className="home-dsys__welcome-opt" onClick={() => choose(o.id)}>
          <span className="home-dsys__welcome-icon" data-tone={o.tone} aria-hidden="true"><WelcomeIcon name={o.icon} /></span>
          <span className="home-dsys__welcome-copy"><span className="home-dsys__welcome-name">{o.title}</span><span>{o.text}</span></span>
        </BCAction>)}</div>
        <p className={cx('home-dsys__sent', !sent && 'home-dsys__sr')} role="status">{sent ? G.REQUEST_IN_COMPOSER : ''}</p>
      </>}
    </Sheet>;
  }

  /** Overview：封面与 README；刚建好的设计系统是起步 README 与起步卡片。 */
  function DesignSystemOverview({system, path}) {
    const empty = G.isEmpty(system);
    const readme = String(system.readme || '').trim();
    return <>
      <Sheet className={cx('home-dsys__overview', system.cover && 'has-cover')}>
        {system.cover ? <div className="home-dsys__cover" {...target('ds', 'cover')}><DesignSystemCover system={system} /></div> : null}
        <h2 className="home-dsys__title home-dsys__sr" tabIndex={-1}>Overview</h2>
        <Readme text={readme || G.STARTER_README} starter={!readme} />
      </Sheet>
      {empty ? <Welcome system={system} path={path} /> : null}
    </>;
  }

  Object.assign(window, {DesignSystemSheet: Sheet, DesignSystemSectionHeader: SectionHeader, DesignSystemSectionActions: SectionActions,
    DesignSystemCover, DesignSystemOverview});
})();

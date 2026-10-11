/* 设计系统标签里 Overview 之后的各章（docs/design/canvas §10.6），照原版编辑器的只读样子画（claude-skills/src/design-system-type）：
   - 每章一张 sheet，标题、说明与右上角按钮见 home-design-system-overview.jsx；章里没东西时标题下是「可以请 agent 做什么」，表的位置写「No … yet.」
     （editor/empty-states.tsx）；
   - Colors（editor/colors.tsx）：按组分表，Name | Light | Dark，每格是色块加值，别名写成「→ 目标」可点着跳过去，深色没单写的用浅一档的字；
   - Typography（editor/typography.tsx）：Name | Preview，样例句子用那个样式自己的字号、行高与字重（字号到 64px 封顶），下面一行规格；
   - Spacing、Corner radius 与其他 token 家族（editor/token-scales.tsx）：Name | Value；Shadows（editor/shadows.tsx）：每个主题一格，一张小卡穿上阴影；
   - Components（editor/components.tsx）：Name | Preview，预览是真的 S2 组件现场渲染，右上角换预览主题（PreviewThemeMenu）；
   - Assets（editor/asset-groups.tsx）：按组分表，Name | Preview | Type；
   - 每行最右是用法说明（editor/usage-notes.tsx）：只读时只有写了说明的行才有那枚按钮，点开是一张小卡。
   色块的颜色是原型的色阶 token（data.js 里这套设计系统的色值就是从那些 token 摘的），主题列靠在色块自己身上设 color-scheme 换主题。
   标注目标照原版标（commentTargetProps）：token 行 `token-…`、文字样式 `style-…`、组件 `comp-…`、素材 `asset-…`、写了说明的用法说明 `note-…`。 */
(function () {
  const {useState, useRef, useEffect} = React;
  const G = window.BC_HOME_DESIGN_SYSTEM;
  const THEMES = [{id: 'light', name: 'Light'}, {id: 'dark', name: 'Dark'}];
  /* 标注目标的属性（model-home-design-system-notes.js）；Web 入口没有设计系统，这里总有 */
  const target = (prefix, name) => window.BC_HOME_DSYS_NOTES?.targetProps(prefix, name) || {};

  /* 当前界面是浅色还是深色：设置里选「跟随系统」时看系统 */
  function useUiTheme() {
    const app = useApp();
    const query = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const [systemDark, setSystemDark] = useState(!!query?.matches);
    useEffect(() => {
      if (!query) return undefined;
      const on = e => setSystemDark(e.matches);
      query.addEventListener?.('change', on);
      return () => query.removeEventListener?.('change', on);
    }, []);
    return app.theme === 'light' || app.theme === 'dark' ? app.theme : systemDark ? 'dark' : 'light';
  }

  /* 用法说明（原版 UsageNoteEditor 的只读样子）：没写说明就没有按钮 */
  function UsageNote({name, text}) {
    const R = window.RSP;
    const anchor = useRef(null);
    const [open, setOpen] = useState(false);
    return <span className="home-dsys__gutter" role="cell">
      {text ? <>
        <span ref={anchor} className="home-dsys__note-anchor" {...target('note', name)}>
          <Tip label="Usage notes">
            <R.ActionButton isQuiet size="S" aria-label={`Usage notes: ${name}`} aria-expanded={open} UNSAFE_className="home-dsys__note-btn"
              onPress={() => setOpen(o => !o)}><R.Icons.StickyNote /></R.ActionButton>
          </Tip>
        </span>
        <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} label={`Usage notes: ${name}`} align="right" width={280} padding="none">
          <div className="home-dsys__usage" lang="en"><strong>Usage notes</strong><p>{text}</p></div>
        </Popover>
      </> : null}
    </span>;
  }

  /* 表头一行：读屏能读，样子是小号次要字 */
  function Head({cols, className}) {
    return <div className={cx('home-dsys__row home-dsys__thead', className)} role="row">
      {cols.map((c, i) => <span key={i} role="columnheader">{c}</span>)}
      <span role="columnheader" className="home-dsys__gutter" aria-hidden="true" />
    </div>;
  }

  /* 一个组：组名（无名的组不写名字）与它的表 */
  function Group({name, children}) {
    return <div className="home-dsys__group">
      {name ? <h3 className="home-dsys__gname">{name}</h3> : null}
      {children}
    </div>;
  }

  /* ---------- Colors ---------- */
  function ColorCell({system, token, theme, onPick}) {
    const R = window.RSP;
    const value = token[theme.id];
    const target = G.aliasOf(value);
    const swatch = G.resolveColor(system, token.name, theme.id);
    const inherited = theme.id !== 'light' && token.inherited;
    return <span className="home-dsys__ccell" role="cell" data-theme={theme.name}><span className="home-dsys__cbody">
      <span className={cx('home-dsys__chip', inherited && 'is-inherited')} aria-hidden="true"
        style={{colorScheme: theme.id, background: swatch ? `var(--${swatch})` : undefined}} />
      {target
        ? <button type="button" className={cx('home-dsys__alias', inherited && 'is-inherited')}
          aria-label={`${token.name} · ${theme.name}: alias of ${target}${inherited ? ' (inherited)' : ''}`}
          onClick={() => onPick?.({section: 'colors', label: target})}>
          <R.Icons.ChevronRight /><span>{target}</span>
        </button>
        : <span className={cx('home-dsys__cval', inherited && 'is-inherited')}>{value}</span>}
    </span></span>;
  }

  function Colors({system, onPick}) {
    return (system.colors || []).map((g, gi) => <Group key={gi} name={g.name}>
      <div className="home-dsys__scroll">
        <div className="home-dsys__table home-dsys__table--colors" role="table" aria-label={`${G.groupName(g)} colors`}>
          <Head cols={['Name', ...THEMES.map(t => t.name)]} />
          {g.tokens.map(row => {
            const token = G.colorToken(row);
            return <div key={token.name} className="home-dsys__row" role="row" data-ds-row={token.name} {...target('token', token.name)}>
              <span className="home-dsys__name" role="rowheader">{token.name}</span>
              {THEMES.map(t => <ColorCell key={t.id} system={system} token={token} theme={t} onPick={onPick} />)}
              <UsageNote name={token.name} text={token.usage} />
            </div>;
          })}
        </div>
      </div>
    </Group>);
  }

  /* ---------- Typography ---------- */
  function Typography({system}) {
    const families = system.type?.families || {};
    return (system.type?.groups || []).map(g => <Group key={g.name} name={g.name}>
      <div className="home-dsys__table home-dsys__table--type" role="table" aria-label={`${g.name} type styles`}>
        <Head cols={['Name', 'Preview']} />
        {g.styles.map(st => {
          const [name, size, line, weight, sample] = st;
          const px = parseFloat(size) || 16;
          return <div key={name} className="home-dsys__row" role="row" data-ds-row={name} {...target('style', name)}>
            <span className="home-dsys__name" role="rowheader">{name}</span>
            <span className="home-dsys__tcell" role="cell">
              <span className="home-dsys__tsample" style={{fontFamily: families[g.family] || undefined, fontSize: Math.min(px, 64),
                lineHeight: line, fontWeight: weight}}>{sample || G.TYPE_SAMPLE}</span>
              <span className="home-dsys__tspec">{G.typeSpec(st, g.family, families)}</span>
            </span>
            <UsageNote name={name} text="" />
          </div>;
        })}
      </div>
    </Group>);
  }

  /* ---------- Spacing / Corner radius / 其他 token 家族 ---------- */
  function Scale({tokens, label}) {
    return <div className="home-dsys__table home-dsys__table--scale" role="table" aria-label={label}>
      <Head cols={['Name', 'Value']} />
      {tokens.map(([name, value, usage]) => <div key={name} className="home-dsys__row" role="row" data-ds-row={name} {...target('token', name)}>
        <span className="home-dsys__name" role="rowheader">{name}</span>
        <span className="home-dsys__value" role="cell">{value}</span>
        <UsageNote name={name} text={usage} />
      </div>)}
    </div>;
  }

  /* ---------- Shadows ---------- */
  function Shadows({system}) {
    return <div className="home-dsys__scroll">
      <div className="home-dsys__table home-dsys__table--shadows" role="table" aria-label="Shadows">
        <Head cols={['Name', ...THEMES.map(t => t.name)]} />
        {(system.shadows || []).map(([name, light, dark, usage]) => <div key={name} className="home-dsys__row" role="row" data-ds-row={name} {...target('token', name)}>
          <span className="home-dsys__name" role="rowheader">{name}</span>
          {THEMES.map(t => {
            const value = t.id === 'dark' ? dark || light : light;
            return <span key={t.id} className="home-dsys__scell" role="cell" data-theme={t.name}>
              <span className="home-dsys__well" style={{colorScheme: t.id}} aria-hidden="true">
                <span className="home-dsys__well-card" style={{boxShadow: value}} />
              </span>
              <span className="home-dsys__cval" title={value}>{value}</span>
            </span>;
          })}
          <UsageNote name={name} text={usage} />
        </div>)}
      </div>
    </div>;
  }

  /* ---------- Components ---------- */
  /* 预览里的链接不带 href：原型的地址栏归应用路由用，点了不能跳走 */
  const noop = () => {};
  /* 每个组件的预览：和这套设计系统 components/<名字>/preview.html 里写的同一组例子，换成原型里打包好的 S2 组件 */
  function ComponentPreview({name}) {
    const R = window.RSP;
    const I = R.Icons;
    const row = (...kids) => <div className="home-dsys__crow">{kids}</div>;
    switch (name) {
      case 'Button': return <div className="home-dsys__ccol">
        {row(<R.Button key="a" variant="accent">Save</R.Button>, <R.Button key="p" variant="primary">Publish</R.Button>,
          <R.Button key="s" variant="secondary">Cancel</R.Button>, <R.Button key="n" variant="negative">Delete</R.Button>,
          <R.Button key="d" variant="accent" isDisabled>Disabled</R.Button>)}
        {row(<R.Button key="po" variant="primary" fillStyle="outline">Outline</R.Button>, <R.Button key="so" variant="secondary" fillStyle="outline">Outline</R.Button>,
          <R.Button key="sm" variant="accent" size="S"><I.Add /><R.Text>Size S</R.Text></R.Button>, <R.Button key="lg" variant="accent" size="L">Size L</R.Button>)}
      </div>;
      case 'ActionButton': return row(<R.ActionButton key="e"><I.Edit /><R.Text>Edit</R.Text></R.ActionButton>,
        <R.ActionButton key="a" isQuiet><I.Add /><R.Text>Add</R.Text></R.ActionButton>,
        <R.ActionButton key="d" aria-label="Delete"><I.Delete /></R.ActionButton>,
        <R.ActionButton key="q" isQuiet aria-label="Edit"><I.Edit /></R.ActionButton>,
        <R.ActionButton key="x" isDisabled>Disabled</R.ActionButton>);
      case 'Link': return <p className="home-dsys__ctext">Read the <R.Link onPress={noop}>release notes</R.Link>, check the{' '}
        <R.Link variant="secondary" onPress={noop}>changelog</R.Link> or <R.Link isQuiet onPress={noop}>contact support</R.Link>.</p>;
      case 'Tabs': return <div className="home-dsys__ctabs">
        <R.Tabs aria-label="Project" defaultSelectedKey="overview">
          <R.TabList><R.Tab id="overview">Overview</R.Tab><R.Tab id="files">Files</R.Tab><R.Tab id="activity">Activity</R.Tab></R.TabList>
          <R.TabPanel id="overview"><p className="home-dsys__ctext">Project summary goes here.</p></R.TabPanel>
          <R.TabPanel id="files"><p className="home-dsys__ctext">Files</p></R.TabPanel>
          <R.TabPanel id="activity"><p className="home-dsys__ctext">Activity</p></R.TabPanel>
        </R.Tabs>
      </div>;
      case 'Checkbox': return row(<R.Checkbox key="1" defaultSelected>Subscribe</R.Checkbox>, <R.Checkbox key="2">Remember me</R.Checkbox>,
        <R.Checkbox key="3" isIndeterminate>Select all</R.Checkbox>, <R.Checkbox key="4" isEmphasized defaultSelected>Emphasized</R.Checkbox>,
        <R.Checkbox key="5" isInvalid>Accept terms</R.Checkbox>, <R.Checkbox key="6" isDisabled>Disabled</R.Checkbox>);
      case 'Switch': return row(<R.Switch key="1" defaultSelected>Wi-Fi</R.Switch>, <R.Switch key="2">Bluetooth</R.Switch>,
        <R.Switch key="3" isEmphasized defaultSelected>Emphasized</R.Switch>, <R.Switch key="4" isDisabled>Disabled</R.Switch>);
      case 'TextField': return <div className="home-dsys__crow is-top">
        <R.TextField label="Name" placeholder="Ada Lovelace" description="As it appears on your ID." isRequired />
        <R.TextField label="Email" defaultValue="ada@" isInvalid errorMessage="Enter a valid email address." />
        <R.TextField label="Team" defaultValue="Design" isDisabled />
      </div>;
      case 'Picker': return <div className="home-dsys__crow is-top">
        <R.Picker label="Animal" placeholder="Choose an animal">
          <R.PickerItem id="aardvark">Aardvark</R.PickerItem><R.PickerItem id="cat">Cat</R.PickerItem><R.PickerItem id="dog">Dog</R.PickerItem>
        </R.Picker>
        <R.Picker label="Size" defaultSelectedKey="m">
          <R.PickerItem id="s">Small</R.PickerItem><R.PickerItem id="m">Medium</R.PickerItem><R.PickerItem id="l">Large</R.PickerItem>
        </R.Picker>
      </div>;
      case 'Badge': {
        const V = ['accent', 'informative', 'neutral', 'positive', 'notice', 'negative'];
        const cap = v => v[0].toUpperCase() + v.slice(1);
        return <div className="home-dsys__ccol">
          {row(...V.map(v => <R.Badge key={v} variant={v}>{cap(v)}</R.Badge>))}
          {row(...V.map(v => <R.Badge key={v} variant={v} fillStyle="subtle">{cap(v)}</R.Badge>))}
          {row(...['indigo', 'seafoam', 'fuchsia', 'cinnamon'].map(v => <R.Badge key={v} variant={v} fillStyle="outline">{cap(v)}</R.Badge>))}
        </div>;
      }
      case 'StatusLight': return row(<R.StatusLight key="p" variant="positive">Approved</R.StatusLight>,
        <R.StatusLight key="n" variant="notice">Needs review</R.StatusLight>, <R.StatusLight key="x" variant="negative">Rejected</R.StatusLight>,
        <R.StatusLight key="i" variant="informative">In progress</R.StatusLight>, <R.StatusLight key="u" variant="neutral">Archived</R.StatusLight>);
      case 'ProgressBar': return <div className="home-dsys__ccol home-dsys__cnarrow">
        <R.ProgressBar label="Uploading" value={62} />
        <R.ProgressBar label="Loading" isIndeterminate />
      </div>;
      case 'Meter': return <div className="home-dsys__crow is-top">
        <R.Meter label="Storage" value={35} variant="informative" />
        <R.Meter label="Quota" value={20} variant="positive" />
        <R.Meter label="Disk" value={78} variant="notice" />
        <R.Meter label="Memory" value={95} variant="negative" />
      </div>;
      default: return <span className="home-dsys__cval">No preview</span>;
    }
  }

  /* 预览主题菜单（原版 PreviewThemeMenu）：按钮上写当前主题，箭头在字后面（S2 Button 的图标槽总在字前，所以放进文字里）；
     菜单里是这套设计系统的主题。原版的主题从设计系统读，这里的演示数据只有浅色与深色两套，就写死这两个。 */
  function ThemeMenu({theme, onTheme}) {
    const R = window.RSP;
    const name = THEMES.find(t => t.id === theme)?.name || 'Light';
    return <R.MenuTrigger>
      <R.Button variant="secondary" aria-label={`${name}, Preview theme`}>
        <R.Text><span className="bc-action-label">{name}<span className="bc-trailing-icon"><R.Icons.ChevronDown /></span></span></R.Text>
      </R.Button>
      <R.Menu aria-label="Preview theme" selectionMode="single" selectedKeys={[theme]} onSelectionChange={keys => onTheme([...keys][0] || theme)}>
        <R.MenuSection>
          <R.Header><R.Heading>Themes in this system</R.Heading></R.Header>
          {THEMES.map(t => <R.MenuItem key={t.id} id={t.id} textValue={t.name}><R.Text>{t.name}</R.Text></R.MenuItem>)}
        </R.MenuSection>
      </R.Menu>
    </R.MenuTrigger>;
  }

  function Components({system, theme}) {
    const R = window.RSP;
    return <div className="home-dsys__table home-dsys__table--components" role="table" aria-label="Components">
      <Head cols={['Name', 'Preview']} />
      {(system.components || []).map(c => <div key={c.name} className="home-dsys__row" role="row" data-ds-row={c.name} {...target('comp', c.name)}>
        <span className="home-dsys__cname" role="rowheader">{c.name}</span>
        <span className="home-dsys__cprev" role="cell">
          <R.Provider locale="en-US" colorScheme={theme} background="base" UNSAFE_className="home-dsys__stage">
            <ComponentPreview name={c.name} />
          </R.Provider>
        </span>
        <UsageNote name={c.name} text={c.usage} />
      </div>)}
    </div>;
  }

  /* ---------- Assets ---------- */
  const iconName = file => (/^S2_Icon_(.+?)_\d+_N\.svg$/.exec(file) || [])[1] || null;
  function AssetThumb({file}) {
    const R = window.RSP;
    const name = iconName(file);
    if (name === 'MoreVertical') return <span className="home-dsys__thumb is-turned"><R.Icons.More /></span>;
    const I = (name && R.Icons[name]) || R.Icons.FileText;
    return <span className="home-dsys__thumb"><I /></span>;
  }
  function Assets({system}) {
    return (system.assets || []).map(g => <Group key={g.name} name={g.name}>
      <div className="home-dsys__table home-dsys__table--assets" role="table" aria-label={`${g.name} files`}>
        <Head cols={['Name', 'Preview', 'Type']} />
        {g.files.map(([file, size]) => <div key={file} className="home-dsys__row" role="row" data-ds-row={file} {...target('asset', file)}>
          <span className="home-dsys__name" role="rowheader" title={file}>{file}</span>
          <span className="home-dsys__aprev" role="cell"><AssetThumb file={file} /></span>
          <span className="home-dsys__atype" role="cell">{G.fileMeta(file, size)}</span>
          <UsageNote name={file} text="" />
        </div>)}
      </div>
    </Group>);
  }

  /** 一章：Overview 交给 DesignSystemOverview，其余是 sheet 里的标题与表；章里没东西时是提示与「No … yet.」。 */
  function DesignSystemSection({system, id, label, path, onPick}) {
    const uiTheme = useUiTheme();
    const [preview, setPreview] = useState(null);
    if (id === 'readme') return <window.DesignSystemOverview system={system} path={path} />;
    const Sheet = window.DesignSystemSheet;
    const Header = window.DesignSystemSectionHeader;
    const Actions = window.DesignSystemSectionActions;
    const empty = G.isSectionEmpty(system, id);
    const theme = preview || uiTheme;
    const actions = id === 'components' ? (empty ? null : <ThemeMenu theme={theme} onTheme={setPreview} />) : <Actions system={system} id={id} />;
    let body = null;
    if (empty) body = <p className="home-dsys__none">{G.noneYet(id)}</p>;
    else if (id === 'colors') body = <Colors system={system} onPick={onPick} />;
    else if (id === 'type') body = <Typography system={system} />;
    else if (id === 'spacing') body = <Scale tokens={system.spacing} label="Spacing" />;
    else if (id === 'corners') body = <Scale tokens={system.corners} label="Corner radius" />;
    else if (id === 'shadows') body = <Shadows system={system} />;
    else if (id === 'components') body = <Components system={system} theme={theme} />;
    else if (id === 'assets') body = <Assets system={system} />;
    else if (G.isFamily(id)) {
      const f = (system.extras || []).find(x => G.familyId(x.key) === id);
      body = <Scale tokens={f?.tokens || []} label={label} />;
    }
    return <Sheet className={`home-dsys__sheet--${G.isFamily(id) ? 'family' : id}`}>
      <Header title={label} note={empty ? G.emptyHint(id) : undefined} actions={actions} section={id} />
      {body}
    </Sheet>;
  }

  Object.assign(window, {DesignSystemSection});
})();

/* 设置 › 语义索引：索引位置与索引文件夹（2026-10-13 待确认；embedding-integration-design §2.11，retrieval-spec v0.1 §8.1、§9.1）。
   规则与文案在 model-space-index.js（BC_SPACE_INDEX），这里只画。只在 App。
   · 位置（「索引」卡片里的一行）：现在的路径、更改… / 在文件夹中显示 / 恢复默认。更改时二选一：把现有索引移过去，或在新位置重新建
     （旧的删掉）；没有「只切换位置」——留在原处的索引没人用。移动期间索引停着，按意思找退回精确文字。关键帧缓存不搬。
     产品里选文件夹走系统面板；原型借用模型目录那几个演示文件夹（BC_MODELSDIR.FOLDERS）。Web 不能选 Runtime 那台电脑上的文件夹，只显示路径。
   · 索引文件夹（「索引范围」里项目下面）：项目之外再加的只读扫描目录。添加前写清会建什么：BaoCut 视频按讲话内容与画面，
     其他视频文件与图片只按画面，成片跳过；画面关着时只有 BaoCut 视频会建。每个文件夹可以在文件夹中显示、重新索引、移除
     （移除只删它的索引，不动文件）。 */
(function () {
  const {useState, useRef, useEffect} = React;
  const X = window.BC_SPACE_INDEX;
  const S = window.BC_SEMANTIC;

  /* ---------- 索引位置 ---------- */
  function LocationDialog({current, bytes, target, onClose, onApply}) {
    const R = window.RSP;
    const MD = window.BC_MODELSDIR;
    const folders = target ? [{path: target, note: '默认位置 · 本机硬盘', exists: true, writable: true, freeMB: 412 * 1024}]
      : MD.FOLDERS.filter((f) => /\/models$/.test(f.path)).map((f) => ({...f, path: f.path.replace(/\/models$/, '/semantic-index')}))
        .concat(current === X.DEFAULT_DIR ? [] : [{path: X.DEFAULT_DIR, note: '默认位置 · 本机硬盘', exists: true, writable: true, freeMB: 412 * 1024}]);
    const [sel, setSel] = useState(target || null);
    const [mode, setMode] = useState('move');
    const folder = folders.find((f) => f.path === sel) || null;
    const plan = folder ? X.locationPlan(folder, bytes, current) : null;
    const picked = plan && plan.kind === 'choose' && plan.move.disabled ? 'rebuild' : mode;
    const ready = !!plan && plan.kind === 'choose';
    return (
      <Dialog open title={target ? '索引放回默认位置' : '更改索引位置'} width={520} onClose={onClose}
        footer={<>
          <Btn variant="secondary" onClick={onClose}>取消</Btn>
          <Btn variant="accent" disabled={!ready} onClick={() => onApply({mode: picked, folder})}>{picked === 'move' ? '移动并更改' : '更改并重新建'}</Btn>
        </>}>
        <div className="mdir-dlg">
          {target ? (
            <p className="t-detail">把语义索引放回 <span className="t-mono" title={target}>{MD.shorten(target, 40)}</span>。</p>
          ) : (
            <>
              <p className="t-detail-xs">产品里这一步是系统的文件夹面板；原型用下面几个位置代替。</p>
              <R.RadioGroup label="选择文件夹" value={sel} onChange={setSel}>
                {folders.map((f) => (
                  <R.Radio key={f.path} value={f.path} description={f.note}>
                    <span className="t-mono mdir-dlg__path" title={f.path}>{MD.shorten(f.path, 40)}</span>
                  </R.Radio>
                ))}
              </R.RadioGroup>
            </>
          )}
          {plan && plan.kind === 'error' ? (
            <R.InlineAlert variant="negative">
              <R.Heading>{plan.error.code === 'readonly' ? '这个文件夹不可写' : plan.error.code === 'same' ? '已经在这里' : '找不到这个文件夹'}</R.Heading>
              <R.Content>{plan.error.text}</R.Content>
            </R.InlineAlert>
          ) : null}
          {ready ? (
            <R.RadioGroup label="现有的索引怎么处理" value={picked} onChange={setMode}>
              <R.Radio value="move" isDisabled={plan.move.disabled}
                description={plan.move.disabled ? plan.move.why : `要移动 ${S.fmtBytes(bytes)}；移动时索引停着，按意思找暂时退回精确文字。移完原位置不再保留。`}>
                把现有索引移过去
              </R.Radio>
              <R.Radio value="rebuild" description="删掉原来的索引，在新位置按已有文稿与画面在后台重建；建好之前按意思找的结果不全。">
                在新位置重新建
              </R.Radio>
            </R.RadioGroup>
          ) : null}
          {ready ? <p className="t-detail-xs">关键帧缓存不搬：它在应用缓存里，可以清掉，需要时重新取。索引所在的盘没接上时，按意思找退回精确文字，接上后接着用。</p> : null}
        </div>
      </Dialog>
    );
  }

  /** 「索引」卡片里的「位置」一行。 */
  function IndexLocationRow({st, set, bytes}) {
    const app = useApp();
    const MD = window.BC_MODELSDIR;
    const Row = window.ShellRow;
    const [dlg, setDlg] = useState(null);   // null | {target?}
    const [moving, setMoving] = useState(null);   // null | {pct, to}
    const timer = useRef(null);
    useEffect(() => () => clearInterval(timer.current), []);
    const eff = X.effectiveDir(st.indexDir);
    const commit = ({mode, folder}) => {
      const custom = folder.path === X.DEFAULT_DIR ? null : folder.path;
      set(mode === 'move' ? {indexDir: custom} : {indexDir: custom, index: 'stale'});
      const where = MD.shorten(folder.path, 40);
      app.toast(mode === 'move' ? `已把索引移到 ${where}` : `索引位置已改为 ${where}，正在后台重新建（演示）`, 'positive');
    };
    const apply = (r) => {
      setDlg(null);
      if (r.mode !== 'move') { commit(r); return; }
      let p = 0;
      setMoving({pct: 0, to: r.folder.path});
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        p += 10;
        if (p >= 100) { clearInterval(timer.current); setMoving(null); commit(r); } else setMoving({pct: p, to: r.folder.path});
      }, 120);
    };
    const desc = moving ? `正在移动 ${S.fmtBytes(bytes)} 到 ${MD.shorten(moving.to, 36)}；期间索引停着，按意思找退回精确文字`
      : eff.source === 'default' ? '默认在应用数据里。可以改到空间更大的磁盘；向量多了以后会占不少空间。' : '索引放在你选的文件夹里。';
    return (
      <>
        <Row label="位置" desc={desc}>
          <span className="t-mono semset__path" title={eff.path}>{MD.shorten(eff.path, 36)}</span>
          <Btn size="s" variant="quiet" disabled={!!moving} onClick={() => app.toast(`已在文件夹中显示 ${eff.path}（演示）`)}>在文件夹中显示</Btn>
          <Btn size="s" variant="secondary" disabled={!!moving} onClick={() => setDlg({})}>更改…</Btn>
          {eff.source === 'custom' ? <Btn size="s" variant="quiet" disabled={!!moving} onClick={() => setDlg({target: X.DEFAULT_DIR})}>恢复默认</Btn> : null}
        </Row>
        {moving ? <div className="semset__moving" role="status"><Progress value={moving.pct} label="正在移动语义索引" /></div> : null}
        {dlg ? <LocationDialog current={eff.path} bytes={bytes} target={dlg.target} onClose={() => setDlg(null)} onApply={apply} /> : null}
      </>
    );
  }

  /* ---------- 索引文件夹 ---------- */
  function AddFolderDialog({taken, visual, onClose, onAdd}) {
    const R = window.RSP;
    const choices = window.BC_DATA.semantic.folderChoices;
    const [sel, setSel] = useState(null);
    const f = choices.find((x) => x.path === sel) || null;
    const problem = f ? X.folderProblem(f.path, taken) : null;
    const ok = !!f && !problem;
    return (
      <Dialog open title="添加索引文件夹" width={520} onClose={onClose}
        footer={<>
          <Btn variant="secondary" onClick={onClose}>取消</Btn>
          <Btn variant="accent" disabled={!ok} onClick={() => onAdd(f)}>添加</Btn>
        </>}>
        <div className="mdir-dlg">
          <p className="t-detail">项目之外的视频素材也能按意思找到。BaoCut 只读这个文件夹，不改、不移动里面的文件；里面的文件会出现在 Space 里，来源写这个文件夹。</p>
          <p className="t-detail-xs">产品里这一步是系统的文件夹面板；原型用下面几个位置代替。</p>
          <R.RadioGroup label="选择文件夹" value={sel} onChange={setSel}>
            {choices.map((c) => (
              <R.Radio key={c.path} value={c.path} description={c.note}>
                <span className="t-mono mdir-dlg__path" title={c.path}>{c.path}</span>
              </R.Radio>
            ))}
          </R.RadioGroup>
          {problem ? (
            <R.InlineAlert variant="notice"><R.Heading>不用再加</R.Heading><R.Content>{problem.text}</R.Content></R.InlineAlert>
          ) : null}
          {ok ? <p className="t-detail" role="status">{X.folderNote(f, visual)}</p> : null}
          {ok && !visual && (f.counts.clips || f.counts.images) ? (
            <R.InlineAlert variant="informative">
              <R.Heading>视频素材与图片要按画面建</R.Heading>
              <R.Content>它们没有文稿，只能按画面找。装好多模态搜索、打开画面索引之后才会建；现在加进来，只有里面的 BaoCut 视频会建索引。</R.Content>
            </R.InlineAlert>
          ) : null}
        </div>
      </Dialog>
    );
  }

  /** 一个索引文件夹：路径、建了多少；⋯ 里在文件夹中显示 / 重新索引 / 移除。 */
  function FolderRow({f, visual, onAct}) {
    const R = window.RSP;
    const n = f.counts || {};
    const what = [n.movies ? `${n.movies} 部视频` : null, n.clips ? `${n.clips} 个视频素材` : null, n.images ? `${n.images} 张图片` : null].filter(Boolean).join('、') || '还没扫到视频和图片';
    const line = visual && f.visual ? (f.visual.done >= f.visual.total ? '画面已就绪' : `画面 ${f.visual.done}/${f.visual.total} 个完成`)
      : n.movies ? '文字按里面的 BaoCut 视频建' : '画面索引没开，视频素材与图片还没建';
    return (
      <div className="semset__proj">
        <div className="semset__projh">
          <Ic n="folder" className="ic--16" />
          <b className="grow">{f.name}</b>
          <span className="t-detail-xs">{line}</span>
          <R.ActionMenu aria-label={`索引文件夹「${f.name}」的操作`} isQuiet size="S" onAction={(k) => onAct(String(k), f)}>
            <R.MenuItem id="reveal" textValue="在文件夹中显示"><R.Icons.Folder /><R.Text>在文件夹中显示</R.Text></R.MenuItem>
            <R.MenuItem id="reindex" textValue="重新索引"><R.Icons.Refresh /><R.Text>重新索引</R.Text><R.Text slot="description">重新扫一遍，丢掉这里的索引重建</R.Text></R.MenuItem>
            <R.MenuItem id="remove" textValue="移除"><R.Icons.Delete /><R.Text>移除</R.Text><R.Text slot="description">删掉它的索引，文件不动</R.Text></R.MenuItem>
          </R.ActionMenu>
        </div>
        <div className="semset__chs">
          <span className="t-detail-xs t-mono" title={f.path}>{f.path}</span>
          <span className="t-detail-xs">{`${what}${n.exports ? ` · ${n.exports} 个成片跳过` : ''}`}</span>
        </div>
      </div>
    );
  }

  /** 「索引范围」里项目下面的那一块：索引文件夹 + 添加文件夹…。 */
  function IndexFolders({st, set}) {
    const app = useApp();
    const [adding, setAdding] = useState(false);
    const folders = st.folders || window.BC_DATA.semantic.folders;
    const visual = st.install === 'full' && st.visual;
    const taken = folders.map((f) => ({name: f.name, path: f.path}))
      .concat((window.BC_DATA.agentProjects || []).map((d) => ({name: d.name, path: d.path})));
    const onAct = (k, f) => {
      if (k === 'reveal') app.toast(`已在文件夹中显示 ${f.path}（演示）`);
      else if (k === 'reindex') { set({index: 'stale'}); app.toast(`正在重新扫「${f.name}」并重建它的索引（演示）`, 'positive'); }
      else if (k === 'remove') {
        app.confirm({
          title: `移除索引文件夹「${f.name}」？`,
          body: '删掉这个文件夹的索引，里面的文件不动；Space 里不再列出它们，按意思也找不到了。以后可以再加回来。',
          confirmLabel: '移除', tone: 'negative',
          run: () => { set({folders: folders.filter((x) => x.id !== f.id)}); app.toast(`已移除「${f.name}」的索引`, 'positive'); },
        });
      }
    };
    const add = (c) => {
      setAdding(false);
      const id = 'f' + Date.now().toString(36);
      set({folders: folders.concat([{id, name: c.name, path: c.path, counts: c.counts, visual: {done: 0, total: (c.counts.clips || 0) + (c.counts.images || 0) + (c.counts.movies || 0)}}]), index: 'stale'});
      app.toast(`已添加「${c.name}」：正在后台扫描并建索引（演示）`, 'positive');
    };
    return (
      <>
        {folders.map((f) => <FolderRow key={f.id} f={f} visual={visual} onAct={onAct} />)}
        <div className="row gap8">
          <Btn size="s" variant="secondary" icon="plus" onClick={() => setAdding(true)}>添加文件夹…</Btn>
        </div>
        {adding ? <AddFolderDialog taken={taken} visual={visual} onClose={() => setAdding(false)} onAdd={add} /> : null}
      </>
    );
  }

  Object.assign(window, {SemanticIndexLocationRow: IndexLocationRow, SemanticIndexFolders: IndexFolders});
})();

/* 协作文档标注的引用标签（docs/design/docs §8）：composer 上方与已发送的消息里都是「协作文档标注 · N 条」，
   画法与幻灯片、设计稿标注的标签（home-slides-notes.jsx、home-design-notes.jsx）一家。点开列出各条：先是「评论」或「请求」
   （图标也不同），再是位置；评论另有它挂着的原文（引用样式，最多两行），最后是评论正文或请求原话。点一条回到那份协作文档，
   切到它所在的标签页，找到线程或那一行（尽力而为，BC_HOME_DOCS.reveal）。
   给了 `onRemove` 是草稿，可以逐条移除或全部移除；不给是已发送的消息，只读。 */
(function () {
  const {useState, useRef} = React;
  const D = window.BC_HOME_DOCS;

  function DocsNotesToken({notes, onRemove, onClear}) {
    const app = useApp();
    const R = window.RSP;
    const [open, setOpen] = useState(false);
    const anchor = useRef(null);
    if (!notes?.length) return null;
    const draft = !!onRemove;
    const jump = n => {
      setOpen(false);
      if (!app.spaceItems.some(it => it.id === n.doc && it.kind === 'docs')) { app.toast('这份协作文档已移走或删除', 'negative'); return; }
      app.openWorkspaceDocs(n.doc, app.workspaceSessionId, {dtab: D.parsePath(n.path)?.tab, at: n.path});
    };
    return <div ref={anchor} className="cins-token home-slides-notes">
      <BCAction className="home-slides-notes__open" aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(v => !v)}>
        <R.Icons.Comment /><span>{D.tokenLabel(notes)}</span>
      </BCAction>
      {draft ? <IconBtn icon="close" size="xs" tip="移除全部协作文档标注" onClick={onClear} /> : null}
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} width={360} dir={draft ? 'up' : 'down'} label={D.tokenLabel(notes)}>
        <ol className="home-slides-notes__list bc-scroll">
          {notes.map((n, i) => <li key={n.id} className="home-slides-notes__item">
            <BCAction className="home-slides-notes__jump" aria-label={`第 ${i + 1} 条，${D.KIND_LABEL[n.kind]} · ${n.label}：${n.text}`} onClick={() => jump(n)}>
              <b className="home-slides-notes__n">{i + 1}</b>
              <span className="home-slides-notes__body">
                <small className="home-docs-notes__where">
                  <span className="home-docs-notes__tag">{n.kind === 'ask' ? <R.Icons.AIMark /> : <R.Icons.Comment />}{D.KIND_LABEL[n.kind]}</span>
                  <span>{n.label}</span>
                </small>
                {n.quote ? <span className="home-docs-notes__quote">{n.quote}</span> : null}
                <span>{n.text}</span>
              </span>
            </BCAction>
            {draft ? <IconBtn icon="close" size="xs" tip={`移除第 ${i + 1} 条标注`} onClick={() => { if (notes.length === 1) setOpen(false); onRemove(n.id); }} /> : null}
          </li>)}
        </ol>
      </Popover>
    </div>;
  }

  Object.assign(window, {DocsNotesToken});
})();

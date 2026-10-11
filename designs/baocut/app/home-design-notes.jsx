/* 设计稿标注的引用标签（docs/design/canvas §8.2 第 5、6 步）：composer 上方与已发送的消息里都是「设计稿标注 · N 条」，
   画法与幻灯片标注的标签（home-slides-notes.jsx）一家。点开列出各条：位置、批注，点一条跳到那块画板。
   给了 `onRemove` 是草稿，可以逐条移除或全部移除；不给是已发送的消息，只读。 */
(function () {
  const {useState, useRef} = React;
  const G = window.BC_HOME_DESIGN;

  function DesignNotesToken({notes, onRemove, onClear}) {
    const app = useApp();
    const [open, setOpen] = useState(false);
    const anchor = useRef(null);
    if (!notes?.length) return null;
    const draft = !!onRemove;
    const jump = n => {
      setOpen(false);
      if (!app.spaceItems.some(it => it.id === n.canvas && it.kind === 'design')) { app.toast('这份设计稿已移走或删除', 'negative'); return; }
      app.openWorkspaceDesign(n.canvas, app.workspaceSessionId, n.board);
    };
    return <div ref={anchor} className="cins-token home-slides-notes">
      <BCAction className="home-slides-notes__open" aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(v => !v)}>
        <window.RSP.Icons.Comment /><span>{G.tokenLabel(notes)}</span>
      </BCAction>
      {draft ? <IconBtn icon="close" size="xs" tip="移除全部设计稿标注" onClick={onClear} /> : null}
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchor} width={360} dir={draft ? 'up' : 'down'} label={G.tokenLabel(notes)}>
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

  Object.assign(window, {DesignNotesToken});
})();

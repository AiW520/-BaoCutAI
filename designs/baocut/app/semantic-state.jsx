/* 本机语义索引的演示状态（embedding-integration-design §2.11、§2.12）。App 与 Web 都加载。
   一份模块级的状态：装没装、这台电脑支不支持、索引是否跟上、是否暂停、翻译记忆与术语候选开关。
   设置 › 语义索引改它，各入口读它（每个入口自己说明状态，不弹全局警告）。
   演示开关：URL 上 `?semantic=none|stale|unsupported|ready|full`（写在 # 前面）优先；否则读本机存的那份。
   规则与文案在 model-semantic.js。 */
(function () {
  const {useState, useEffect} = React;
  const S = window.BC_SEMANTIC;
  const KEY = window.BC_SURFACE.storageKey('bc-semantic-v1');
  function init() {
    const url = S.fromSearch(window.location.search);
    if (url) return url;
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (v && typeof v === 'object') return S.normalize(v);
    } catch (e) { /* 无痕窗口等：用缺省 */ }
    return Object.assign({}, S.DEFAULT);
  }
  const store = {st: init(), subs: new Set()};
  function set(patch) {
    store.st = Object.assign({}, store.st, typeof patch === 'function' ? patch(store.st) : patch);
    try { localStorage.setItem(KEY, JSON.stringify(store.st)); } catch (e) { /* 存不了就只在这一页有效 */ }
    store.subs.forEach((f) => f());
  }
  /** [状态, 能不能用（S.status）, set] */
  function useSemantic() {
    const [, tick] = useState(0);
    useEffect(() => {
      const f = () => tick((n) => n + 1);
      store.subs.add(f);
      return () => { store.subs.delete(f); };
    }, []);
    return [store.st, S.status(store.st), set];
  }

  /** 一个入口的那一句（§2.11）：置灰 / 退回的原因 + 去设置；索引在更新时是不阻塞的提醒。能用且最新时不画。 */
  function SemNote({entry, className}) {
    const app = useApp();
    const [st] = useSemantic();
    const n = S.entryNote(entry, st);
    if (!n) return null;
    const canGo = n.link && window.BC_SURFACE.ai && app.go;
    return (
      <div className={cx('semnote', n.tone === 'notice' && 'semnote--notice', className)}>
        <Ic n={n.tone === 'notice' ? 'refresh' : 'info'} className="ic--14" />
        <span className="semnote__x">{n.text}</span>
        {canGo ? <BCAction className="tsetup__lnk" onClick={() => app.go({r: 'settings', sec: 'semantic'})}>{n.link}</BCAction> : null}
      </div>
    );
  }

  Object.assign(window, {BC_SEMSTATE: {useSemantic, set, get: () => store.st}, SemNote});
})();

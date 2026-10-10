/* 剪成短视频（§5.10）跨屏状态：每个来源项目一份会话（设置 → 进行中 → 结果）。
   只交给 Agent、每次新开一条会话；找到就创建，没有人挑这一步。进度从那条会话的消息倒推，
   收据一到就按找到的片段直接建好子视频（引用同一份原片），会话落到结果页。
   任务记录（app.tasks）是顶栏胶囊 / 后台任务页的唯一真相，这里只多记「参数与这一轮的几支」。
   结果页上调起止、改标题直接写回那一支的记录（`origin` / `used`）；不要哪一支就移入回收站，可撤销。 */
(function () {
  const {useState, useRef, useCallback, useEffect} = React;
  const SC = window.BC_SHORTS_CUT;
  const AG = window.BC_AGENT;

  /* 会话进度 → 这一页的阶段与百分比：放行之前在找片段，放行之后的写入就是创建视频。 */
  function progressOf(chat, task) {
    const pr = AG.sessionProgress(chat, task);
    const creating = pr.cur >= 2;
    const pct = pr.done ? 100 : creating ? 50 + Math.round((pr.pct || 0) / 2) : pr.cur === 1 ? 40 : 15;
    return {stage: creating ? 'create' : 'find', pct, waiting: pr.waiting, note: pr.note, done: pr.done};
  }
  /* 结果页的一支：找到的那一段 + 它建成的子视频 id（`id` 就是子视频 id）。 */
  const itemOf = (seg, child) => ({...seg, id: child.id, cand: seg.id, title: child.title, on: true, made: true});
  /* 一支的现状写回子视频记录：起止只剩一段时 `used` 清掉，`origin` 就是现状。 */
  function childPatch(p, it) {
    return {...p, title: it.title, origin: {...p.origin, in: +it.start.toFixed(2), out: +it.end.toFixed(2)}, used: null,
      duration: +(it.end - it.start).toFixed(2), cut: {...(p.cut || {}), focusX: it.focusX == null ? null : it.focusX}};
  }
  const SYNC = ['start', 'end', 'title', 'focusX'];
  const changed = (a, b) => SYNC.some((k) => a[k] !== b[k]);
  const newId = (n) => 'sc' + Date.now().toString(36) + n;

  function useShortsCutStore({addTask, patchTask, tasks, sessions: chats, stopAgent, projects, setProjects, archiveProject, go, toast}) {
    const [sessions, setSessions] = useState({});
    const seq = useRef(0);
    const landed = useRef({});   // taskId → 已建的子视频 id：同一次运行只建一次
    const live = useRef(sessions); live.current = sessions;
    const projRef = useRef(projects); projRef.current = projects;
    const taskRef = useRef(tasks); taskRef.current = tasks;

    const patch = useCallback((proj, p) => setSessions((all) => {
      const cur = all[proj] || {};
      return {...all, [proj]: {...cur, ...(typeof p === 'function' ? p(cur) : p)}};
    }), []);
    /* 之前切过的（不含这一轮结果页上的几支）：「已切过」与「不再找」按它判 */
    const kids = (proj, s) => {
      const mine = new Set(((s && s.list) || []).map((x) => x.id));
      return SC.childrenOf(projRef.current, proj).filter((k) => !mine.has(k.id));
    };
    const fresh = (proj, params, facts, extra) => ({proj, open: true, phase: 'setup', params, facts, scope: null,
      list: [], sel: null, expand: null, t: 0, taskId: null, sid: null, pct: 0, stage: 'find', undoHistory: [], redoHistory: [], ...extra});

    /* 打开工具：有会话就回到会话原地；没有就按这个项目的现状起一份设置。 */
    const open = useCallback((proj, info) => {
      const cur = live.current[proj];
      if (cur) { patch(proj, {open: true}); return {ok: true, resumed: true}; }
      const o = info || {};
      const facts = {hasTrans: !!o.hasTrans, portrait: !!o.portrait, children: kids(proj).length};
      setSessions((all) => ({...all, [proj]: fresh(proj, SC.normalize({}, facts), facts)}));
      return {ok: true};
    }, [patch]);
    const close = useCallback((proj) => patch(proj, {open: false}), [patch]);
    const setParams = useCallback((proj, p) => patch(proj, (s) => ({params: SC.normalize({...s.params, ...p}, s.facts)})), [patch]);
    const set = useCallback((proj, p) => patch(proj, p), [patch]);

    /* 已经建过的那一次（任务页「查看结果」、会话里的「查看这几支」再点一次）：把那几支摆回结果页，不再建。 */
    const showTask = useCallback((proj, taskId, sentences) => {
      const task = taskRef.current.find((t) => t.id === taskId);
      const ids = landed.current[taskId] || (task && task.artifacts ? task.artifacts.map((a) => a.project).filter(Boolean) : []);
      const cur = live.current[proj];
      const sents = sentences || (cur && cur.sentences) || [];
      const list = ids.map((id) => projRef.current.find((p) => p.id === id)).filter((p) => p && !p.archived && SC.isChild(p))
        .map((p) => {
          const r = SC.usedRanges(p)[0];
          const from = sents.length ? SC.indexAt(sents, r.start) : 0;
          const to = sents.length ? Math.max(from, SC.indexAt(sents, r.end - 0.04)) : 0;
          return {id: p.id, cand: p.id, title: p.title, start: r.start, end: r.end, from, to, on: true, made: true,
            focusX: p.cut ? p.cut.focusX : null, reason: '', loose: {start: false, end: false}};
        });
      const facts = cur ? cur.facts : {hasTrans: true, portrait: false, children: 0};
      setSessions((all) => ({...all, [proj]: {...(all[proj] || fresh(proj, SC.normalize({}, facts), facts)), open: true, phase: 'result',
        list, sentences: sents, sel: list[0] ? list[0].id : null, expand: null, t: list[0] ? list[0].start : 0, taskId, stage: 'done', pct: 100,
        undoHistory: [], redoHistory: []}}));
    }, []);

    /* 收据到了：按找到的片段直接建子视频，任务记成「已完成」并列出这几支，会话落到结果页。 */
    const land = useCallback((proj, chat) => {
      const s = live.current[proj];
      const parent = projRef.current.find((p) => p.id === proj);
      if (!s || !parent) return;
      const taskId = chat.taskId || null;
      const was = taskId && taskRef.current.find((t) => t.id === taskId);
      if (taskId && (landed.current[taskId] || (was && was.artifacts && was.artifacts.length))) { showTask(proj, taskId); return; }
      const receipt = (chat.messages || []).filter((m) => m.role === 'receipt').slice(-1)[0];
      const segs = SC.demoCandidates(s.sentences || [], s.params, {scope: s.scope, children: kids(proj, null)});
      const taken = projRef.current.map((x) => x.title);
      const made = segs.map((seg) => {
        const title = SC.childTitle(seg.title, taken);
        taken.push(title);
        return SC.childProject({id: newId(++seq.current), parent, seg, title, params: s.params,
          session: chat.id, messageId: receipt ? receipt.id : null});
      });
      if (taskId) landed.current[taskId] = made.map((m) => m.id);
      setProjects((ps) => made.concat(ps));
      const list = segs.map((seg, i) => itemOf(seg, made[i]));
      const total = SC.totalSec(list);
      patch(proj, {phase: 'result', list, sel: list[0] ? list[0].id : null, expand: null, t: list[0] ? list[0].start : 0,
        pct: 100, stage: 'done', taskId, undoHistory: [], redoHistory: [], playing: false});
      if (taskId) patchTask(taskId, {kind: 'shorts-cut', flow: 'shorts-cut', stage: 'done', status: 'done', outcome: 'done', pct: 100,
        phase: null, activity: null, undoable: false,
        sub: `已创建 ${SC.countLabel(made.length)} · 合计 ${SC.mmss(total)} · ${SC.frameLine(s.params)}`,
        artifacts: made.map((m) => ({name: m.title, note: `${SC.mmss(m.origin.in)} – ${SC.mmss(m.origin.out)} · ${SC.secs(m.duration)}`, project: m.id}))});
    }, [patch, patchTask, setProjects, showTask]);

    /* 交给 Agent：会话已经发出去了（新开的那一条），这里记下是哪一条，进度从会话消息倒推。 */
    const findViaAgent = useCallback((proj, o) => {
      patch(proj, {phase: 'running', sid: o.sid, taskId: null, pct: 0, stage: 'find', sentences: o.sentences, scope: o.scope || null,
        runner: o.runner, list: [], sel: null, expand: null});
    }, [patch]);
    useEffect(() => {
      Object.keys(sessions).forEach((proj) => {
        const s = sessions[proj];
        if (s.phase !== 'running') return;
        const chat = (chats || []).find((x) => x.id === s.sid);
        if (!chat) return;
        const task = chat.taskId ? tasks.find((t) => t.id === chat.taskId) : null;
        const pr = progressOf(chat, task);
        if (pr.done) {
          if ((chat.messages || []).some((m) => m.role === 'receipt')) land(proj, chat);
          else patch(proj, {phase: 'setup', sid: null, taskId: null, pct: 0});
          return;
        }
        if (pr.stage !== s.stage || pr.pct !== s.pct || (chat.taskId || null) !== s.taskId) patch(proj, {stage: pr.stage, pct: pr.pct, taskId: chat.taskId || null});
        if (task && task.kind === 'shorts-cut' && task.status === 'running' && task.stage !== pr.stage) patchTask(task.id, {stage: pr.stage});
      });
    }, [sessions, chats, tasks, land, patch, patchTask]);

    /* 任务从顶栏胶囊或后台任务页被取消：会话退回设置（设置都在）。 */
    useEffect(() => {
      Object.keys(sessions).forEach((proj) => {
        const s = sessions[proj];
        if (s.phase !== 'running' || !s.taskId) return;
        const task = tasks.find((t) => t.id === s.taskId);
        if (task && task.canceled) patch(proj, {phase: 'setup', taskId: null, sid: null, pct: 0});
      });
    }, [sessions, tasks, patch]);

    /* 进行中页的「取消」：会话那头也停下，回设置。 */
    const cancel = useCallback((proj) => {
      const s = live.current[proj];
      if (!s) return;
      const chat = (chats || []).find((x) => x.id === s.sid);
      const tid = s.taskId || (chat && chat.taskId);
      if (tid) patchTask(tid, {status: 'error', outcome: 'canceled', phase: null, activity: null, error: '已取消', canceled: true});
      if (chat && stopAgent) stopAgent(chat.id);
      patch(proj, {phase: 'setup', taskId: null, sid: null, pct: 0});
      if (toast) toast('已取消剪成短视频 · 设置保留', 'notice');
    }, [patchTask, patch, toast, chats, stopAgent]);

    /* ---- 结果页：每一处改动同时写回那一支的记录 ---- */
    const commit = useCallback((proj, fn) => {
      const s = live.current[proj];
      if (!s) return;
      const next = fn(s) || {};
      if (!Object.keys(next).length) return;
      patch(proj, next);
      if (!next.list) return;
      const diff = next.list.filter((it) => { const was = s.list.find((x) => x.id === it.id); return was && changed(was, it); });
      if (diff.length) setProjects((ps) => ps.map((p) => { const it = diff.find((x) => x.id === p.id); return it ? childPatch(p, it) : p; }));
    }, [patch, setProjects]);
    const edit = useCallback((proj, id, fn) => commit(proj, (s) => {
      const before = s.list.find((c) => c.id === id); if (!before) return {};
      const after = {...before, ...(typeof fn === 'function' ? fn(before) : fn)};
      return {list: s.list.map((c) => (c.id === id ? after : c)), ...(s.reviewGesture ? {} : SC.reviewRecord(s, before, after))};
    }), [commit]);
    const beginEdit = useCallback((proj, id) => patch(proj, (s) => ({reviewGesture: {id, before: s.list.find((c) => c.id === id)}, playing: false})), [patch]);
    const endEdit = useCallback((proj) => patch(proj, (s) => {
      const g = s.reviewGesture, after = g && s.list.find((c) => c.id === g.id);
      return {reviewGesture: null, ...(g && g.before && after ? SC.reviewRecord(s, g.before, after) : {})};
    }), [patch]);
    const undoRange = useCallback((proj, redo = false) => commit(proj, (s) => {
      const g = s.reviewGesture;
      if (g) return {reviewGesture: null, list: s.list.map((c) => (c.id === g.id ? g.before : c)), playing: false};
      return SC.reviewStep(s, redo);
    }), [commit]);
    const setBound = useCallback((proj, id, edge, raw, duration) => {
      const time = window.BC_TIME.parse(raw);
      const s = live.current[proj], c = s && s.list.find((x) => x.id === id);
      const next = c && time != null && SC.setReviewEdge(s.sentences, c, edge, time, duration);
      if (!next) { toast('请输入原片范围内的有效时间，起点必须早于终点'); return; }
      edit(proj, id, next); patch(proj, {t: edge === 'start' ? next.start : Math.max(next.start, next.end - 3), playing: false});
    }, [edit, patch, toast]);
    const select = useCallback((proj, id, opts) => patch(proj, (s) => {
      const c = s.list.find((x) => x.id === id);
      if (!c) return {};
      const p = {sel: id};
      if (!(opts && opts.keepT) || s.t < c.start || s.t > c.end) p.t = c.start;
      return p;
    }), [patch]);
    const seek = useCallback((proj, t) => patch(proj, {t: Math.max(0, t)}), [patch]);
    const nudge = useCallback((proj, id, edge, dir) => commit(proj, (s) => {
      const c = s.list.find((x) => x.id === id);
      if (!c) return {};
      const n = SC.nudge(s.sentences, c, edge, dir);
      return {list: s.list.map((x) => (x.id === id ? n : x)), sel: id, t: edge === 'start' ? n.start : Math.max(n.start, n.end - 3), ...SC.reviewRecord(s, c, n)};
    }), [commit]);
    const drag = useCallback((proj, id, edge, t) => commit(proj, (s) => ({
      list: s.list.map((x) => (x.id === id ? SC.dragEdge(s.sentences, x, edge, t) : x)),
    })), [commit]);

    /* 「不要这支」：移入回收站（可恢复），结果页上撤下；toast 里能撤销。 */
    const remove = useCallback((proj, id) => {
      const s = live.current[proj], it = s && s.list.find((x) => x.id === id);
      if (!it) return;
      archiveProject(id, true);
      patch(proj, (cur) => {
        const list = cur.list.map((x) => (x.id === id ? {...x, removed: true} : x));
        const next = SC.visible(list)[0];
        return {list, sel: cur.sel === id ? (next ? next.id : null) : cur.sel, expand: cur.expand === id ? null : cur.expand};
      });
      if (toast) toast(`已把「${it.title}」移入回收站`, null, {label: '撤销', run: () => {
        archiveProject(id, false);
        patch(proj, (cur) => ({list: cur.list.map((x) => (x.id === id ? {...x, removed: false} : x)), sel: id}));
      }});
    }, [archiveProject, patch, toast]);

    /* 结果页的「返回」回到参数页（§5.10）：设置与提示词框里改过的话都留着；这一轮的几支已经是项目库里的视频了。
       「再切几支」同样回参数页，另把「已经切过的不再找」勾上。 */
    const toSetup = useCallback((proj, extra) => patch(proj, (s) => {
      const facts = {...s.facts, children: SC.childrenOf(projRef.current, proj).length};
      return {phase: 'setup', list: [], sel: null, expand: null, taskId: null, sid: null, pct: 0, stage: 'find',
        undoHistory: [], redoHistory: [], reviewGesture: null, playing: false, facts,
        params: SC.normalize({...s.params, ...(extra || {})}, facts)};
    }), [patch]);
    const again = useCallback((proj) => toSetup(proj, {skipDone: true}), [toSetup]);

    /* 视频 Tab「切出的短视频」里的「调整后再生成」：不找片段，按那一支的起止与设置直接另建一支，落在结果页
       （结果页开着就接在后面）。正在进行时不打断，只把工具页摆到前面。那一支不动。 */
    const redo = useCallback((proj, child, info) => {
      const cur = live.current[proj];
      const parent = projRef.current.find((p) => p.id === proj);
      const o = info || {};
      const plan = SC.redoPlan(cur);
      if (plan === 'busy') { patch(proj, {open: true}); return {ok: false, busy: cur.phase}; }
      const sentences = (cur && cur.sentences && cur.sentences.length ? cur.sentences : o.sentences) || [];
      const c = SC.redoCandidate(sentences, child, projRef.current.map((x) => x.title));
      if (!c || !parent) return {ok: false};
      const facts = {hasTrans: !!o.hasTrans, portrait: !!o.portrait, children: kids(proj).length};
      const params = SC.redoParams(child, cur ? cur.params : {}, facts);
      const made = SC.childProject({id: newId(++seq.current), parent, seg: c, title: c.title, params});
      setProjects((ps) => [made].concat(ps));
      const it = itemOf(c, made);
      if (plan === 'append') {
        patch(proj, (s) => ({open: true, list: s.list.concat([it]), sel: it.id, expand: it.id, t: it.start, playing: false}));
      } else {
        setSessions((all) => ({...all, [proj]: fresh(proj, params, facts, {phase: 'result', sentences, list: [it], sel: it.id, expand: it.id, t: it.start})}));
      }
      if (toast) toast(`已另建「${made.title}」· 原来那支不动`, 'positive');
      return {ok: true, plan, id: made.id};
    }, [patch, setProjects, toast]);

    /* 从任务页「查看结果」/ 顶栏胶囊回来：打开来源项目，结果页摆到前面。 */
    const resume = useCallback((task) => {
      if (!task || !task.project) return;
      const cur = live.current[task.project];
      if (task.status === 'done' && (!cur || cur.taskId !== task.id || cur.phase !== 'result')) showTask(task.project, task.id);
      else if (cur) patch(task.project, {open: true});
      go({r: 'editor', id: task.project});
    }, [patch, go, showTask]);

    return {sessions, open, close, set, setParams, findViaAgent, cancel, edit, select, seek, nudge, drag, remove,
      toSetup, again, resume, redo, showTask, beginEdit, endEdit, undoRange, setBound};
  }
  Object.assign(window, {useShortsCutStore});
})();

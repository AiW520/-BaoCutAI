/* BaoCut 原型 — 写作结果的出处（embedding-integration-design §2.1、§2.2、§3.4、§4.1）
   window.BC_WRCITES。纯函数，无 React、无 DOM；node --test 直接 require。

   · 模型在每段末尾写出处标记：`[s12]` = 这部视频文稿第 12 句；系列写作跨视频时写 `[p10:s34]`（视频 id 前缀）。
     出处只能引用这次真的发过去的句子（sent）；引用了没发的、或根本不存在的，丢掉那条出处（§3.4 「出处校验」），
     一段里一条有效出处都没有 → 这段标「模型推断」。标题不要求出处。
   · 显示（§4.1 待定项，原型的选择）：段末一排时间码小标签，点了跳预览、文稿里高亮那一句；
     跨视频的标签带视频名（「播客精剪 · 01:52」）。备选：句中时间码链接、脚注编号——见报告。
   · 复制 Markdown 两种：去掉出处（缺省，拿去发布）、带时间码出处（`[01:52](baocut://video/p1?t=112.0)`）。
   · 段落菜单：看出处 / 重写这一段 / 换材料重写（换材料 = 用户自己勾这一段该基于哪几句）。
   · 结果存成 Space 里的一份文档（§2.1 「写作结果持久化」）：存的是带出处的那一版。
   视图在 panel-aitools-cites.jsx。Web 没有 AI 入口，不加载本文件（/^app\/model-writing/）。 */
(function () {
  const pad2 = (n) => String(n).padStart(2, '0');
  function mmss(t) {
    const s = Math.max(0, Math.round(Number(t) || 0));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return h ? `${h}:${pad2(m)}:${pad2(sec)}` : `${pad2(m)}:${pad2(sec)}`;
  }

  /* ---------- 出处标记 ---------- */
  const CITE_RE = /\[(?:([a-z]\w*):)?s(\d+)\]/g;
  /** 一段文字 → {text: 去掉标记的正文, cites: [{video, cue}]}；video 为 null 表示当前视频 */
  function parseCites(raw) {
    const cites = [];
    const text = String(raw || '').replace(CITE_RE, (_, v, n) => { cites.push({video: v || null, cue: `g${n}`}); return ''; })
      .replace(/\s+$/, '').replace(/\s+([。，；！？.,;!?])/g, '$1');
    return {text, cites};
  }
  /** 出处 key：同一视频内 `g12`，跨视频 `p10:g12`（current = 当前视频 id） */
  const citeKey = (c, current) => (c.video && c.video !== current ? `${c.video}:${c.cue}` : c.cue);

  /** Markdown（只认 # / ## / - / > / 空行）→ 块；每块带出处并校验。
      sent：这次发过去的句子 key 集合（Set 或数组）；current：当前视频 id。 */
  function blocks(md, sent, current) {
    const ok = sent instanceof Set ? sent : new Set(sent || []);
    const out = [];
    let para = [];
    const push = (type, raw) => {
      const p = parseCites(raw);
      const all = p.cites.map((c) => Object.assign({}, c, {key: citeKey(c, current)}));
      const valid = all.filter((c) => ok.has(c.key));
      const heading = /^h\d$/.test(type);
      out.push({id: `b${out.length + 1}`, type, text: p.text, cites: valid, dropped: all.length - valid.length,
        inferred: !heading && !valid.length, rev: 0});
    };
    const flush = () => { if (para.length) { push('p', para.join(' ')); para = []; } };
    String(md || '').split('\n').forEach((ln0) => {
      const ln = ln0.trim();
      let m;
      if (!ln) { flush(); return; }
      if ((m = ln.match(/^(#{1,3})\s+(.*)$/))) { flush(); push('h' + m[1].length, m[2]); return; }
      if ((m = ln.match(/^[-*]\s+(.*)$/))) { flush(); push('li', m[1]); return; }
      if ((m = ln.match(/^>\s?(.*)$/))) { flush(); push('quote', m[1]); return; }
      para.push(ln);
    });
    flush();
    return out;
  }

  /** 出处 → 能点的锚点：{key, video, cue, t, end, text, label}。找不到那一句回 null（不该发生：blocks 已校验）。
      lookup(video, cue) 由调用方给：返回 {start, end, text} 或 null；names：视频 id → 名字（跨视频标签用）。 */
  function resolve(c, lookup, current, names) {
    const v = c.video || current;
    const cue = lookup(v, c.cue);
    if (!cue) return null;
    const other = v !== current;
    return {key: citeKey(c, current), video: v, cue: c.cue, t: cue.start, end: cue.end, text: cue.text,
      label: other ? `${(names && names[v]) || v} · ${mmss(cue.start)}` : mmss(cue.start), other};
  }

  /** 统计：有出处的段、模型推断的段、丢掉的无效出处（结果页顶上那行） */
  function stats(bs) {
    const body = bs.filter((b) => !/^h\d$/.test(b.type));
    return {paras: body.length, cited: body.filter((b) => !b.inferred).length, inferred: body.filter((b) => b.inferred).length,
      dropped: bs.reduce((n, b) => n + (b.dropped || 0), 0), videos: new Set(bs.flatMap((b) => b.cites.map((c) => c.video || '_'))).size};
  }

  /* ---------- 复制 ---------- */
  const COPY_MODES = [
    {k: 'strip', label: '复制 Markdown', sub: '去掉出处，拿去发布'},
    {k: 'timecode', label: '复制 Markdown（带时间码出处）', sub: '每段末尾留时间码链接，自己核对用'},
  ];
  const COPY_DEFAULT = 'strip';
  /** 块 → Markdown。mode：strip 去掉出处；timecode 每段末尾挂时间码链接、推断段标「模型推断」。
      anchor(c) → resolve 的结果（timecode 模式要用）。 */
  function toMarkdown(bs, mode, anchor) {
    const lines = bs.map((b) => {
      let text = b.text;
      if (mode === 'timecode' && !/^h\d$/.test(b.type)) {
        const links = b.cites.map((c) => anchor && anchor(c)).filter(Boolean)
          .map((a) => `[${a.label}](baocut://video/${a.video}?t=${a.t.toFixed(1)})`);
        text += links.length ? ` ${links.join(' ')}` : ' *（模型推断）*';
      }
      if (b.type === 'li') return `- ${text}`;
      if (b.type === 'quote') return `> ${text}`;
      if (/^h\d$/.test(b.type)) return `${'#'.repeat(Number(b.type[1]))} ${text}`;
      return text;
    });
    /* 相邻列表项之间不空行，其余块之间空一行 */
    return lines.reduce((acc, ln, i) => acc + (i === 0 ? '' : (bs[i].type === 'li' && bs[i - 1].type === 'li' ? '\n' : '\n\n')) + ln, '');
  }

  /* ---------- 段落菜单 ---------- */
  const PARA_MENU = [
    {k: 'sources', label: '看出处'},
    {k: 'rewrite', label: '重写这一段'},
    {k: 'material', label: '换材料重写…'},
  ];
  /** 替换一段（重写 / 换材料重写的结果落地）：留着上一版，rev + 1 */
  function replaceBlock(bs, id, patch) {
    return bs.map((b) => (b.id === id ? Object.assign({}, b, patch, {prev: {text: b.text, cites: b.cites, inferred: b.inferred}, rev: b.rev + 1}) : b));
  }
  /** 撤回这一段的上一次重写 */
  function undoBlock(bs, id) {
    return bs.map((b) => (b.id === id && b.prev ? Object.assign({}, b, b.prev, {prev: null, rev: b.rev - 1}) : b));
  }
  /** 演示的「重写这一段」：同样的出处，换个说法（真产品是一次模型调用，只发这一段的出处句与上下文） */
  const ALT = [
    (t) => t.replace(/^(.{0,6}?)，/, '$1——'),
    (t) => `换句话说，${t.replace(/^(因为|而且|所以|对，)/, '')}`,
  ];
  function demoRewrite(b) {
    const text = ALT[b.rev % ALT.length](b.text);
    return {text: text === b.text ? `${b.text.replace(/。$/, '')}，这一点节目里说得很直接。` : text};
  }
  /** 换材料重写的候选句：这一段出处附近（同视频 ±window 秒）且这次发过去了的句子；已引用的排前、默认勾上。
      cues：当前视频的全部句子；sent：Set。 */
  function materialCands(b, cues, sent, window_) {
    const w = window_ || 20;
    const own = b.cites.filter((c) => !c.video).map((c) => c.cue);
    const at = own.length ? cues.find((c) => c.id === own[0]) : null;
    const t0 = at ? at.start : 0;
    const near = cues.filter((c) => sent.has(c.id) && Math.abs(c.start - t0) <= w);
    const ids = own.concat(near.map((c) => c.id).filter((id) => own.indexOf(id) < 0));
    return ids.map((id) => cues.find((c) => c.id === id)).filter(Boolean)
      .map((c) => ({id: c.id, t: c.start, text: c.text, on: own.indexOf(c.id) >= 0}));
  }
  /** 演示的「换材料重写」：按用户勾的句子写一段，出处就是这几句 */
  function demoFromMaterial(picked) {
    if (!picked.length) return null;
    const core = picked.map((c) => c.text.replace(/[。！？]$/, '')).slice(0, 3);
    const text = core.length === 1 ? `节目里的说法是：${core[0]}。` : `${core[0]}；${core.slice(1).join('，')}。`;
    return {text, cites: picked.map((c) => ({video: null, cue: c.id, key: c.id})), inferred: false, dropped: 0};
  }

  /* ---------- 持久化（§2.1） ---------- */
  /** 结果存成 Space 里的一份文档：存带出处的一版，下次打开还能点 */
  function savedDoc(o) {
    const kind = o.tool === 'summary' ? '总结' : '博客';
    const head = (o.blocks.find((b) => b.type === 'h1') || {}).text;
    const name = `${kind} · ${(head || o.title || '未命名').replace(/[\\/:*?"<>|]/g, ' ').slice(0, 40)}.md`;
    const text = o.markdown;
    return {id: `${o.tool}-${o.pid}-${o.stamp || 1}`, name, dir: o.dir || null, movie: o.pid, text,
      lines: text.split('\n').length, toolId: o.tool, note: '写作结果 · 每段带出处 · 交互原型示例内容', demo: true};
  }

  /* ---------- 演示样张（科浪 · 第 42 期 / data.js p1 的 cues） ----------
     `[sN]` = cue gN。最后一段故意引用了不存在的 s99：校验后丢掉，这一段标「模型推断」（§3.4）。 */
  const BLOG = '# 我们为什么把视频工具做在本机\n\n' +
    '这期《码与远方》从一个很实际的问题聊起：为什么要做本地？[s5]\n\n' +
    '周远的回答很直接：素材是别人的，上传这件事本身就是一个决定，他没准备好替客户做这个决定。[s6][s7]\n\n' +
    '## 模型跑得动了\n\n' +
    '苏黎补充，模型这一年已经跑得动了；过去每个小改动都要层层签字，于是他们把整条链路搬到了本机。[s8][s9][s10]\n\n' +
    '## 三件难事\n\n' +
    '- 渲染要确定：同一份工程，两台机器出一模一样的帧，时间轴不能有浮点漂移 [s12][s13][s14]\n' +
    '- 字幕是单独的真相源：词是真相，句子和 cue 都是投影 [s17][s18]\n' +
    '- 导出只重渲染改动波及的片段 [s20]\n\n' +
    '本地优先接下来几年会成为视频工具的默认做法。[s99]';
  const SUMMARY = '三位做本地视频工具的人，讨论为什么把整条链路搬到本机。[s5][s10]\n\n' +
    '理由先是素材：素材是别人的，上传本身就是替客户做决定。[s6][s7] 再是能力：模型这一年已经跑得动了。[s8]\n\n' +
    '技术上最难的是确定性——同一份工程在两台机器上要出一模一样的帧。[s12][s13] 字幕层被当成单独的真相源，导出只重渲染改动波及的片段。[s17][s20]\n\n' +
    '整体看，本地优先不反对云，只是换了默认值。';
  /** 系列写作多出来的一段：引用同一项目里另一部视频（播客精剪 p10） */
  const SERIES_TAIL = '\n\n## 另一期也提到\n\n' +
    '精剪版里同样强调：替客户做决定这件事，不该由工具代劳。[p10:s28] 同一份工程两台机器出一模一样的帧，是两期都回到的话题。[p10:s34][s13]';
  function demo(tool, o) {
    const x = o || {};
    return (tool === 'summary' ? SUMMARY : BLOG) + (x.series ? SERIES_TAIL : '');
  }

  const api = {mmss, parseCites, citeKey, blocks, resolve, stats, COPY_MODES, COPY_DEFAULT, toMarkdown,
    PARA_MENU, replaceBlock, undoBlock, demoRewrite, materialCands, demoFromMaterial, savedDoc, demo};
  if (typeof window !== 'undefined') window.BC_WRCITES = api;
})();

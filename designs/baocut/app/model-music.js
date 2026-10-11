/* 本机音乐生成的纯模型 —— window.BC_MUSIC（2026-10-11，YuE2 / audio.cpp 技术方案）。
   工具 › 生成音乐（tool-music.jsx）、设置 › 音乐生成的「试听」（settings-music.jsx）与编辑器 AI 工具的「生成配乐」共用：
   表单字段照 Runtime 的 GenerateMusicRequest 命名（mode / style / lyrics / targetDurationSec / maxDurationSec / planning / seed / model），
   换到 Electron / Web 时直接提交，不再翻译一遍。时长 → 语义 token 的换算与 Runtime 同一条规则（25 token / 秒）；
   预计耗时按本机速度估：Apple Silicon 大约 6 倍时长，CPU 大约 20 倍。无 React、无 DOM，`node --test` 直接跑。 */
(function () {
  const MODES = [
    {k: 'instrumental', label: '纯音乐', desc: '没有人声，只按风格写配乐'},
    {k: 'song', label: '带唱的歌', desc: '按歌词唱出来，风格里写清男女声与唱法'},
  ];
  /* 规划（YuE2 的 cot）：off 直接生成；melody 先定旋律；full 先写完整乐谱再生成（模型缺省）。 */
  const PLANNINGS = [
    {k: 'full', label: '完整编排', desc: '先写完整乐谱再生成，结构最稳；最慢'},
    {k: 'melody', label: '先定旋律', desc: '先定一段旋律再展开'},
    {k: 'off', label: '直接生成', desc: '不先规划，最快，结构可能松散'},
  ];
  /* 风格芯片：点一下填进风格框；给模型的是英文描述（YuE2 按英文标签训练），界面上是中文名 */
  const STYLES = [
    {k: 'calm-piano', label: '舒缓钢琴', style: 'calm solo piano, slow tempo, soft, cinematic'},
    {k: 'upbeat-pop', label: '轻快流行', style: 'upbeat pop, bright synths, clean drums, 120 bpm'},
    {k: 'lofi', label: 'Lo-fi 节拍', style: 'lo-fi hip hop beat, warm, vinyl crackle, relaxed'},
    {k: 'ambient', label: '氛围电子', style: 'ambient electronic, slow pads, airy, minimal percussion'},
    {k: 'acoustic', label: '民谣吉他', style: 'acoustic folk guitar, fingerpicking, warm, intimate'},
    {k: 'epic', label: '史诗管弦', style: 'epic orchestral, strings and brass, building, cinematic trailer'},
  ];
  const TOKENS_PER_SEC = 25;
  const DURATION = {min: 10, max: 300, step: 5, dflt: 30};
  /* 上限缺省比目标多留两成：模型可能写得长一点；到了上限的结果带「被截断」提醒 */
  const MAX_HEADROOM = 1.2;
  /* 预计耗时 = 时长 × 倍数；只在界面上说「大约」 */
  const SPEED = {silicon: 6, cpu: 20};
  const STEPS_DEFAULT = 50;

  const modeOf = (k) => MODES.find((m) => m.k === k) || MODES[0];
  const planningOf = (k) => PLANNINGS.find((p) => p.k === k) || PLANNINGS[0];

  /** 空表单 */
  function blank(model) {
    return {mode: 'instrumental', style: '', lyrics: '', targetDurationSec: DURATION.dflt, maxDurationSec: null, planning: 'melody', seed: '', model: model || null};
  }
  /** 视频时长 → 可用的目标时长：按 5 秒取整，夹在范围内；没有时长用缺省 */
  function clampDuration(sec) {
    const n = Number(sec);
    if (!(n > 0)) return DURATION.dflt;
    return Math.min(DURATION.max, Math.max(DURATION.min, Math.round(n / DURATION.step) * DURATION.step));
  }
  /* 配乐铺满（product-design §2.7「生成配乐」）：视频比单次上限长时只生成上限长度的一段，加到视频时首尾相接循环铺满。
     接缝交叉淡化、片尾淡出；两个时长都在实例淡入淡出的 [0, 5] 秒之内（video-format-spec §3.9 AudioMix）。
     同一条轨道上的实例不能重叠（§3.4），接缝两侧交替放在两条音乐轨上。不拉伸、不改节奏。 */
  const LOOP = {crossfade: 2, tailFade: 3};
  const secText = (n) => `${Math.round(Number(n) * 10) / 10} 秒`;
  /** 「生成配乐」进来时的那一段：目标时长、要不要循环、横幅上的一句 */
  function soundtrackFor(videoSec) {
    const v = Number(videoSec);
    if (!(v > DURATION.max)) return {targetDurationSec: clampDuration(v), loop: false, note: null};
    return {targetDurationSec: DURATION.max, loop: true,
      note: `视频 ${secText(v)}超过单次上限 ${DURATION.max} 秒，会生成 ${DURATION.max} 秒并循环铺满，片尾淡出。`};
  }
  /** 一段 piece 秒的音乐铺满 total 秒：每段从音乐开头起放，后一段在前一段结束前 crossfade 秒进来；
   *  lane 0 / 1 是交替的两条音乐轨。最后一段截到视频结尾、带片尾淡出；音乐比视频长时只有一段。 */
  function loopLayout(pieceSec, totalSec, opts) {
    const o = Object.assign({}, LOOP, opts || {});
    const piece = Number(pieceSec), total = Number(totalSec);
    if (!(piece > 0) || !(total > 0)) return [];
    const xf = Math.min(o.crossfade, piece / 4);
    const r3 = (n) => Math.round(n * 1000) / 1000;
    const out = [];
    let start = 0;
    for (;;) {
      const dur = Math.min(piece, total - start);
      out.push({start: r3(start), dur: r3(dur), lane: out.length % 2, fadeIn: out.length ? r3(xf) : 0, fadeOut: 0});
      if (start + piece >= total) break;
      start += piece - xf;
    }
    out.forEach((s, i) => { if (i < out.length - 1) s.fadeOut = r3(xf); });
    const last = out[out.length - 1];
    last.fadeOut = r3(Math.min(o.tailFade, Math.max(0, last.dur - last.fadeIn)));
    return out;
  }
  /** 加到视频之后的一句：「循环 3 段铺满 742 秒 · 接缝交叉淡化 2 秒 · 片尾淡出 3 秒」 */
  function loopSummary(layout, totalSec) {
    if (!layout.length) return '';
    const tail = `片尾淡出 ${secText(layout[layout.length - 1].fadeOut)}`;
    if (layout.length === 1) return tail;
    return `循环 ${layout.length} 段铺满 ${secText(totalSec)} · 接缝交叉淡化 ${secText(layout[1].fadeIn)} · ${tail}`;
  }

  /** 上限：没手改时跟着目标走 */
  const maxOf = (f) => (f.maxDurationSec ? Number(f.maxDurationSec) : Math.min(DURATION.max, Math.round(Number(f.targetDurationSec || DURATION.dflt) * MAX_HEADROOM)));
  /** 预算：这段音乐最多生成多少语义 token（Runtime 的 semantic_max_tokens） */
  const tokens = (sec) => Math.max(1, Math.round(Number(sec || 0) * TOKENS_PER_SEC));

  /** 表单校验：返回第一条人话，没问题返回 null */
  function validate(f) {
    if (!f.model) return '先选一只音乐模型';
    if (!String(f.style || '').trim()) return '先写一句风格';
    if (f.mode === 'song' && !String(f.lyrics || '').trim()) return '带唱的歌要有歌词；不要人声就改成纯音乐';
    const t = Number(f.targetDurationSec);
    if (!(t >= DURATION.min && t <= DURATION.max)) return `时长要在 ${DURATION.min}–${DURATION.max} 秒之间`;
    if (maxOf(f) < t) return '上限不能比目标时长短';
    if (f.seed !== '' && f.seed != null && !/^\d+$/.test(String(f.seed))) return '种子只能是数字';
    return null;
  }

  /** 预计耗时的一句：「本机大约 3 分钟」；cpu = true 用 CPU 的倍数 */
  function etaText(sec, opts) {
    const o = opts || {};
    const mult = o.cpu ? SPEED.cpu : SPEED.silicon;
    const s = Math.max(1, Math.round(Number(sec || 0) * mult * (o.planning === 'off' ? 0.8 : 1)));
    const txt = s < 90 ? `${Math.max(10, Math.round(s / 10) * 10)} 秒` : `${Math.max(1, Math.round(s / 60))} 分钟`;
    return `${o.cpu ? 'CPU 生成，' : ''}本机大约 ${txt}`;
  }

  /** 进度阶段（原型演示进度 0–100 → 人话；真实阶段来自任务的 progress） */
  function phase(pct, f) {
    const plan = f && f.planning !== 'off';
    if (pct < 8) return '加载模型';
    if (plan && pct < 25) return '编排乐谱';
    if (pct < 80) return '生成音乐';
    return '渲染音频';
  }

  /** 提交给 Runtime 的请求体（字段与 GenerateMusicRequest 一致）；seed 空 = 随机 */
  function request(f) {
    const r = {mode: f.mode, style: String(f.style || '').trim(), targetDurationSec: Number(f.targetDurationSec), maxDurationSec: maxOf(f), planning: f.planning, model: f.model};
    if (f.mode === 'song') r.lyrics = String(f.lyrics || '').trim();
    if (f.seed !== '' && f.seed != null) r.seed = Number(f.seed);
    return r;
  }

  /** 文件名：风格头几个字 + 序号，`music-01.wav` 兜底 */
  function nameFor(f, seq) {
    const stem = String(f.style || '').trim().replace(/[\\/:*?"<>|,]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 32).trim() || 'music';
    return `${stem}-${String(seq).padStart(2, '0')}.wav`;
  }

  /** 记录卡下面那一行：「纯音乐 · 30 秒 · 完整编排 · YuE2 3B · 种子 7」 */
  function recordMeta(r) {
    const f = r.form || r;
    return [modeOf(f.mode).label, `${f.targetDurationSec} 秒`, planningOf(f.planning).label, r.modelName || f.model, f.seed !== '' && f.seed != null ? `种子 ${f.seed}` : null]
      .filter(Boolean).join(' · ');
  }

  /** 做好之后：时长到了上限 98% 算被截断，提醒加长上限 */
  const truncated = (durSec, f) => Number(durSec) >= maxOf(f) * 0.98;

  /** 工具页的模型行：本机音乐模型，装没装 */
  function models(all, installed) {
    return (all || []).filter((m) => m.cat === 'music' && m.supported !== false)
      .map((m) => ({id: m.id, label: m.name, local: true, ok: !!installed(m.id), size: m.size}));
  }
  /** 预选：设置里的默认 → 第一只装好的 → 第一只 */
  function preferred(list, dflt) {
    const ok = list.filter((m) => m.ok);
    const hit = dflt && ok.find((m) => m.id === dflt);
    return (hit || ok[0] || list[0] || {id: null}).id;
  }
  /** 工具目录卡上的状态行 */
  function toolStatus(list) {
    const n = list.filter((m) => m.ok).length;
    if (!list.length) return {text: '还没有音乐模型', on: false};
    return n ? {text: `已装 ${n} / ${list.length} 个音乐模型 · 在本机生成`, on: true} : {text: `${list.length} 个音乐模型可下载 · 约 ${(list[0].size / 1024).toFixed(1)} GB`, on: false};
  }

  /* ---------- 设置里的「试听」：固定几秒的纯音乐，只挑风格 ---------- */
  const QUICK = {seconds: 10, steps: 8};
  const quickDefaults = () => ({style: STYLES[0].k, mode: 'instrumental'});
  function quickForm(pick, model) {
    const st = STYLES.find((s) => s.k === pick.style) || STYLES[0];
    return Object.assign(blank(model), {mode: pick.mode || 'instrumental', style: st.style, targetDurationSec: QUICK.seconds, maxDurationSec: QUICK.seconds, planning: 'off'});
  }
  const quickKey = (form) => `${form.model}|${form.mode}|${form.style}|${form.targetDurationSec}`;
  function quickSummary(pick, elapsed) {
    const st = STYLES.find((s) => s.k === pick.style) || STYLES[0];
    return `${st.label} · ${QUICK.seconds} 秒 · ${QUICK.steps} 步 · 用了 ${Math.max(1, Math.round(elapsed || 0))} 秒`;
  }

  const BC_MUSIC = {
    MODES, PLANNINGS, STYLES, TOKENS_PER_SEC, DURATION, SPEED, STEPS_DEFAULT, QUICK, modeOf, planningOf,
    LOOP, blank, clampDuration, soundtrackFor, loopLayout, loopSummary, maxOf, tokens, validate, etaText, phase, request, nameFor, recordMeta, truncated, models, preferred, toolStatus,
    quickDefaults, quickForm, quickKey, quickSummary,
  };
  if (typeof module !== 'undefined') module.exports = BC_MUSIC;
  if (typeof window !== 'undefined') Object.assign(window, {BC_MUSIC});
})();

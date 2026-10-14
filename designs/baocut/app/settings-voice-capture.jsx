/* 设置 › 我的声音 › 克隆新音色（2026-10-14 重做采集流程，同日二轮）。以前只有「用麦克风照着一句念 5–12 秒」；
   现在先选模型，再按选中的模型走：① 选模型（本机引擎 + 能克隆的云端提供方，没连密钥的也能先选）
   → ② 录样本（目标 30 秒，计时器到 30 自动停；麦克风或上传二选一，上传超过 30 秒取前 30 秒）
   → ③ 授权声明（只有选中的模型里有要第二段录音的——Gemini——才有这一步：同一个人念一句固定声明，
      官方 30 个地区语言任选，英文最稳；表外的可以自定义一句，但 Google 只认表里的原文）
   → ④ 保存（名字、本人许可、每只本机引擎一颗种子、这只音色会落到哪些模型）。本地引擎的 5–10 秒参考段从样本前面截，原文是第一句台词。
   `ConsentCapture` 是从行卡 ⋯ 里「补录授权声明」进来的单步版。从模型页「克隆新音色」过来时 `voiceHandoff.target` 预选那只模型。
   麦克风在原型里是计时器模拟，试听放的是随包录音；门槛、台词、步骤、种子都在 model-voices.js。 */
(function () {
  const {useState, useEffect, useRef} = React;
  const TTS = window.BC_TTS;
  const V = window.BC_VOICES;
  const C = window.BC_CLOUD_TTS;
  const CLOUD_TONE = {uploaded: 'positive', first: 'neutral', stale: 'notice', orphan: 'notice', short: 'notice', consent: 'notice', authorize: 'notice', unsupported: 'neutral'};

  const clock = (s) => {
    const n = Math.max(0, +s || 0);
    const m = Math.floor(n / 60);
    const sec = n - m * 60;
    return `${String(m).padStart(2, '0')}:${sec.toFixed(1).padStart(4, '0')}`;
  };

  function Meter({level, on}) {
    const bars = Array.from({length: 14}, (_, i) => i);
    return (
      <span className={cx('vlib-meter', on && 'is-on')} aria-hidden="true">
        {bars.map((i) => <i key={i} className={cx(level * 14 > i && 'is-lit')} />)}
      </span>
    );
  }

  /* ---------- 一段录音：麦克风 / 上传 ----------
     `spec` = {min, target, max}；`demo` = {file, dur, name} 是上传那条路在原型里假装选中的文件；
     停下或选好文件后 `onClip({dur, file, via, name})`，重录 / 换文件时 `onClip(null)`。
     `clip` 是父级已经拿着的那段（上一步 / 下一步回来时照它恢复，不然计时器回到 00:00 而下一步却亮着）。 */
  function ClipRecorder({spec, demo, label, onClip, hint, clip}) {
    const app = useApp();
    const [via, setVia] = useState(clip ? clip.via : 'mic');
    const [phase, setPhase] = useState(clip ? 'done' : 'idle');     // idle | rec | done
    const [secs, setSecs] = useState(clip ? clip.dur : 0);
    const [level, setLevel] = useState(0);
    const [dev, setDev] = useState(false);
    const [file, setFile] = useState(clip && clip.via === 'upload' ? {name: clip.name, dur: clip.dur} : null);
    const timer = useRef(null);
    const fileInput = useRef(null);
    useEffect(() => () => clearInterval(timer.current), []);
    const finish = (n) => { clearInterval(timer.current); timer.current = null; setPhase('done'); setLevel(0); onClip({dur: +n.toFixed(1), file: demo.file, via: 'mic'}); };
    const stop = () => finish(secs);
    const start = () => {
      setSecs(0); setPhase('rec'); onClip(null);
      timer.current = setInterval(() => setSecs((s) => {
        const n = +(s + 0.1).toFixed(1);
        setLevel(0.3 + 0.5 * Math.abs(Math.sin(n * 5.3)) * (n % 3 < 2.4 ? 1 : 0.3));
        if (n >= spec.max) finish(spec.max);
        return n;
      }), 100);
    };
    const switchVia = (k) => {
      if (phase === 'rec') return;
      setVia(k); setPhase('idle'); setSecs(0); setFile(null); onClip(null);
    };
    const pickFile = (f) => {
      const picked = {name: f ? f.name : demo.name, dur: demo.dur};
      setFile(picked);
      onClip({dur: +Math.min(spec.max, picked.dur).toFixed(1), file: demo.file, via: 'upload', name: picked.name});
    };
    const pct = Math.min(100, (secs / spec.max) * 100);
    const left = Math.max(0, spec.max - secs);
    return (
      <div className="vlib-clip">
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">{label || '怎么给'}</span>
          <Segmented size="s" value={via} onChange={switchVia}
            items={[{k: 'mic', label: '用麦克风录', icon: 'mic'}, {k: 'upload', label: '上传一段', icon: 'upload'}]} />
          {via === 'mic' ? (
            <>
              <Picker size="s" icon="mic" value="MacBook Pro 麦克风" open={dev} popWidth={240}
                onClick={() => setDev((x) => !x)} onClose={() => setDev(false)}>
                <Menu>
                  <MenuItem label="MacBook Pro 麦克风" on onClick={() => setDev(false)} />
                  <MenuItem label="AirPods Pro" sub="蓝牙耳机会压低音质，能用内置就用内置" onClick={() => { setDev(false); app.toast('交互演示 · 已换到 AirPods Pro'); }} />
                </Menu>
              </Picker>
              <Meter level={level} on={phase === 'rec'} />
            </>
          ) : null}
        </div>
        {via === 'mic' ? (
          <div className="vlib-rec">
            {phase === 'idle' ? (
              <>
                <Btn variant="accent" size="m" icon="mic" onClick={start}>开始录音</Btn>
                <span className="vlib-rec__big t-mono">{clock(0)} / {clock(spec.max)}</span>
                <span className="t-detail-xs grow">{hint}</span>
              </>
            ) : phase === 'rec' ? (
              <>
                <Btn variant="negative" size="m" icon="stop" onClick={stop}>停止</Btn>
                <span className="vlib-rec__big t-mono is-live" role="timer" aria-live="off">{clock(secs)} / {clock(spec.max)}</span>
                <Progress value={pct} thin className="grow" label="录音进度" />
                <span className="t-detail-xs vlib-rec__left">
                  {secs < spec.min ? `还差 ${(spec.min - secs).toFixed(1)} 秒` : secs < spec.target ? `够了 · 到 ${clock(spec.target)} 最好` : left > 0.05 ? `还能录 ${left.toFixed(1)} 秒` : '到点自动停'}
                </span>
              </>
            ) : (
              <>
                <window.VoicePlay v={{file: demo.file}} tip="听一遍刚录的" />
                <span className="vlib-rec__big t-mono">{clock(secs)}</span>
                <span className="t-detail-xs grow">{secs >= spec.max ? `到 ${spec.max} 秒自动停了 · 听一遍，不满意就重录` : '听一遍：有没有噪音、有没有念错。不满意就重录。'}</span>
                <Btn variant="secondary" size="s" icon="refresh" onClick={start}>重录</Btn>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="vlib-drop vlib-drop--tight" onClick={() => fileInput.current.click()} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.current.click(); } }}>
              <Ic n="upload" className="ic--26" />
              {file ? <b>{file.name}</b> : <b>拖一个音频文件到这里，或点一下选</b>}
              <span className="t-detail-xs">
                {file
                  ? `${V.fmtTime(file.dur)}${file.dur > spec.max ? ` · 超过 ${spec.max} 秒，会取前 ${spec.max} 秒` : ''} · 一个人说话、没有音乐`
                  : `WAV / MP3 / M4A / FLAC · ${spec.min} 秒起，${spec.target} 秒最好 · 一个人说话、没有音乐`}
              </span>
            </div>
            <input ref={fileInput} type="file" accept="audio/*" hidden onChange={(e) => { const f = e.target.files[0]; e.target.value = ''; pickFile(f || null); }} />
            {file ? (
              <div className="vlib-rec">
                <window.VoicePlay v={{file: demo.file}} tip="听一遍" />
                <span className="vlib-rec__big t-mono">{clock(Math.min(spec.max, file.dur))}</span>
                <span className="t-detail-xs grow">{hint}</span>
                <Btn variant="secondary" size="s" icon="refresh" onClick={() => { setFile(null); onClip(null); }}>换一个</Btn>
              </div>
            ) : <BCAction className="viewall vlib-demo" onClick={() => pickFile(null)}>用示例文件试试（{demo.name}）</BCAction>}
          </>
        )}
      </div>
    );
  }

  /* ---------- ① 选模型：这只音色要给谁用 ---------- */
  function ModelsStep({targets, picked, onToggle}) {
    const local = targets.filter((t) => t.kind === 'local');
    const cloud = targets.filter((t) => t.kind === 'cloud');
    const on = (t) => picked.indexOf(t.id) >= 0;
    return (
      <>
        <p className="vlib-cap__lede">先挑这只音色要给哪些模型用：本机引擎只要一段样本，靠种子认人；云端要把样本传给对方建克隆、记 voice id；
          Google Gemini 还要本人再念一句授权声明——没选它就不用录那段。以后随时能在音色的 ⋯ 里补。</p>
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">本机</span>
          <div className="vlib-cap__chips">
            {local.map((t) => <Chip key={t.id} pill on={on(t)} onClick={() => onToggle(t.id)}>{t.name}</Chip>)}
          </div>
        </div>
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">云端</span>
          <div className="vlib-cap__chips">
            {cloud.map((t) => (
              <Chip key={t.id} pill icon="remote" on={on(t)} onClick={() => onToggle(t.id)}
                title={t.consent ? '要本人念一句授权声明' : ''}>
                {t.name}{t.consent ? ' · 要授权声明' : ''}{t.connected ? '' : ' · 未连接'}
              </Chip>
            ))}
            {!cloud.length ? <span className="t-detail-xs">没有能克隆的 API 提供方</span> : null}
          </div>
        </div>
        <p className="t-detail-xs">没连密钥的也能先选：样本与声明先存着，连上后第一次用时再建。一只都不选也能存，只给本机引擎用。</p>
      </>
    );
  }

  /* ---------- ② 样本 ---------- */
  function SampleStep({lang, setLang, onClip, clip, providers}) {
    const langs = TTS.sampleLangs('indextts2');
    const script = V.sampleScript(lang);
    const verdict = clip ? V.sampleVerdict(clip.dur, providers) : null;
    return (
      <>
        <p className="vlib-cap__lede">一段 {V.SAMPLE.target} 秒左右、一个人说话、周围安静的录音。{V.SAMPLE.min} 秒就能存，{V.SAMPLE.good} 秒以上云端才收，到 {V.SAMPLE.target} 秒自动停。</p>
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">念哪种</span>
          <div className="vlib-cap__chips">
            {langs.map((l) => <Chip key={l.code} pill on={lang === l.code} onClick={() => setLang(l.code)}>{l.label}</Chip>)}
          </div>
        </div>
        <blockquote className="vlib-script vlib-script--long">
          {script.lines.map((t, i) => <span key={i} className="vlib-script__line">{t}</span>)}
          <span className="vlib-script__tail t-detail-xs">念完这几句可以接着随便说——介绍一下自己、今天在做什么——直到计时到 {V.SAMPLE.target} 秒。</span>
        </blockquote>
        <ClipRecorder key={lang} spec={V.SAMPLE} label="怎么给" onClip={onClip} clip={clip}
          demo={{file: TTS.defaultBuiltin(lang, '').file, dur: 29.1, name: 'reference_speaker.wav'}}
          hint={verdict ? (verdict.problem || verdict.line) : `照着念，或上传一段现成的。`} />
        {verdict && verdict.problem ? <div className="hint hint--warn">{verdict.problem}</div> : null}
        {verdict && !verdict.problem && verdict.short.length ? <div className="hint hint--warn">能存，但 {verdict.short.join('、')}——要给它们用就再录长一点。</div> : null}
      </>
    );
  }

  /* ---------- ③ 授权声明（Gemini 要的第二段）：语言 = 常用两种芯片 + 更多语言（官方 30 个地区）+ 自定义一句 ---------- */
  function ConsentStep({needed, phraseLang, setPhraseLang, custom, setCustom, onClip, clip}) {
    const [more, setMore] = useState(false);
    const phrase = V.consentPhrase(phraseLang, custom);
    const problem = clip ? V.consentProblem(clip.dur) : null;
    const moreOn = V.CONSENT_COMMON.indexOf(phraseLang) < 0 && phraseLang !== 'custom';
    const pick = (code) => { setPhraseLang(code); onClip(null); setMore(false); };
    return (
      <>
        <p className="vlib-cap__lede">
          {needed.length
            ? `${needed.join(' / ')} 要本人再念一句固定的授权声明，对方会核对这段和样本是不是同一个人。`
            : '想以后给 Google Gemini 用就先录下来，也可以稍后补。'}
          用同一只麦克风、同一个房间录，更容易通过。
        </p>
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">念哪种</span>
          <div className="vlib-cap__chips">
            {V.CONSENT_COMMON.map((code) => { const c = V.consentPhrase(code); return (
              <Chip key={code} pill on={phraseLang === code} onClick={() => pick(code)}>{c.label}{c.recommended ? ' · 推荐' : ''}</Chip>
            ); })}
            <Picker size="s" value={moreOn ? V.phraseLabel(phrase) : '更多语言'} open={more} popWidth={260}
              onClick={() => setMore((x) => !x)} onClose={() => setMore(false)}>
              <Menu>
                <MenuHead>官方支持的其余 {V.consentMore().length} 种</MenuHead>
                {V.consentMore().map((o) => <MenuItem key={o.code} label={o.label} sub={o.sub} on={phraseLang === o.code} onClick={() => pick(o.code)} />)}
              </Menu>
            </Picker>
            <Chip pill icon="edit" on={phraseLang === 'custom'} onClick={() => pick('custom')}>自定义一句</Chip>
          </div>
        </div>
        {phraseLang === 'custom' ? (
          <>
            <Field area rows={2} aria-label="自定义授权声明" value={custom} placeholder="写一句本人授权的话，录的时候照着念"
              onChange={(e) => { setCustom(e.target.value); onClip(null); }} />
            <div className="hint hint--warn">Google Gemini 只认官方表里的原文，自定义的它验不过；留给别家或将来接入的提供方。</div>
          </>
        ) : <blockquote className="vlib-script">{phrase.text}</blockquote>}
        {phrase.note ? <div className="hint hint--warn">{phrase.note}</div> : null}
        {!phrase.custom && !phrase.verified && !phrase.note ? <p className="t-detail-xs">官方支持 · 没实测过能不能验过；不急就念英文。</p> : null}
        <ClipRecorder key={phraseLang} spec={V.CONSENT_REC} label="怎么给" onClip={onClip} clip={clip}
          demo={{file: phraseLang === 'zh-CN' ? 'tts-voice-zh-male.wav' : 'tts-voice-en-male.wav', dur: 7.9, name: 'speaker_consent.wav'}}
          hint={problem || (clip ? '听一遍，念清楚整句就行' : '一口气把整句念完，不用赶')} />
        {problem ? <div className="hint hint--warn">{problem}</div> : null}
      </>
    );
  }

  /* ---------- ④ 保存：名字、许可、每只引擎一颗种子、落到哪 ---------- */
  function LandingList({draft, targets}) {
    const app = useApp();
    const local = targets.filter((t) => t.kind === 'local');
    const cloud = targets.filter((t) => t.kind === 'cloud');
    return (
      <div className="vlib-land">
        {local.length ? (
          <div className="vlib-land__row">
            <span className="vlib-cap__lab">本机</span>
            <span className="t-detail-xs">{local.map((t) => t.name).join(' / ')} · 用前 {draft.dur} 秒当参考段，各自那颗种子固定</span>
          </div>
        ) : null}
        {cloud.map((t) => {
          const st = t.connected ? C.cloneStatus(draft, t.id, {saved: app.cloudSaved, extra: app.cloudCustom}) : {k: 'first', chip: `${t.name} · 未连接`, line: '连上密钥后第一次用时上传建克隆 · 记下 voice id'};
          return (
            <div key={t.id} className="vlib-land__row">
              <span className="vlib-cap__lab">{t.name}</span>
              <Chip tone={CLOUD_TONE[st.k]} icon="remote">{st.chip}</Chip>
              <span className="t-detail-xs">{st.line}</span>
            </div>
          );
        })}
      </div>
    );
  }

  function SaveStep({draft, targets, name, setName, consent, setConsent, seeds, onReseed}) {
    const local = targets.filter((t) => t.kind === 'local');
    return (
      <div className="vlib-save">
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">叫什么</span>
          <Field size="s" value={name} aria-label="音色名字" onChange={(e) => setName(e.target.value)} placeholder="我的声音" />
        </div>
        {local.map((t) => (
          <div key={t.id} className="vlib-cap__row">
            <span className="vlib-cap__lab">{t.name}</span>
            <span className="t-detail-xs">种子</span>
            <span className="t-mono">{seeds[t.id]}</span>
            <Btn variant="quiet" size="s" icon="refresh" onClick={() => onReseed(t.id)}>换一颗</Btn>
          </div>
        ))}
        <p className="t-detail-xs">本机引擎没有 voice id，靠同一段参考 + 这颗种子每次都出同一个人，每只引擎一颗；云端（Gemini / ElevenLabs / MiniMax）记对方给的 voice id。</p>
        <Checkbox on={consent} onChange={setConsent} label="这是我自己的声音，或已获本人许可" />
        <LandingList draft={draft} targets={targets} />
      </div>
    );
  }

  /* ---------- 四步串起来 ---------- */
  function VoiceCapture({onDone, onCancel}) {
    const app = useApp();
    const allProviders = C.providers(app.cloudCustom);
    const targets = V.cloneTargets(V.engineChips(), allProviders, app.cloudSaved);
    const handoffTarget = app.voiceHandoff && app.voiceHandoff.target ? app.voiceHandoff.target.id : null;
    /* 默认全选本机引擎 + 连着的云端；从模型页过来时再加上那只 */
    const [picked, setPicked] = useState(() => targets.filter((t) => t.kind === 'local' || t.connected || t.id === handoffTarget).map((t) => t.id));
    const chosen = targets.filter((t) => picked.indexOf(t.id) >= 0);
    const steps = V.cloneSteps(chosen);
    const [cur, setCur] = useState(0);
    const langs = TTS.sampleLangs('indextts2');
    const [lang, setLang] = useState(langs[0].code);
    const [sample, setSample] = useState(null);
    const [phraseLang, setPhraseLang] = useState('en-US');
    const [custom, setCustom] = useState('');
    const [consentClip, setConsentClip] = useState(null);
    const [name, setName] = useState('我自己');
    const [consent, setConsent] = useState(false);
    const [seeds, setSeeds] = useState(() => { const o = {}; targets.filter((t) => t.kind === 'local').forEach((t) => { o[t.id] = V.randomSeed(); }); return o; });
    const providers = chosen.filter((t) => t.kind === 'cloud').map((t) => allProviders.find((p) => p.id === t.id)).filter(Boolean);
    const script = V.sampleScript(lang);
    const verdict = sample ? V.sampleVerdict(sample.dur, providers) : null;
    const ref = sample ? V.referenceFromSample(sample.dur, sample.via === 'mic' ? script.first : '') : null;
    const pickedSeeds = {};
    chosen.filter((t) => t.kind === 'local').forEach((t) => { pickedSeeds[t.id] = seeds[t.id]; });
    const draft = sample ? V.makeVoice({
      name, lang, dur: ref.dur, text: ref.text, textSource: ref.textSource, sourceDur: sample.dur, seeds: pickedSeeds,
      source: {kind: sample.via, at: '刚刚', name: sample.name}, file: sample.file,
      consent: consent ? 'self' : 'unspecified',
      consentClip: consentClip ? Object.assign({lang: phraseLang, dur: consentClip.dur, file: consentClip.file, at: '刚刚'}, phraseLang === 'custom' ? {text: custom.trim()} : {}) : null,
    }) : null;
    const step = steps[Math.min(cur, steps.length - 1)];
    const last = cur >= steps.length - 1;
    const canNext = step.k === 'models' ? true
      : step.k === 'sample' ? !!(sample && !verdict.problem)
      : step.k === 'consent' ? !!(consentClip && !V.consentProblem(consentClip.dur) && (phraseLang !== 'custom' || custom.trim()))
      : false;
    const needed = step.needed || [];
    const foot = step.k === 'models' ? (chosen.length ? `给 ${chosen.map((t) => t.name).join(' / ')} 用` : '一只都不选也能存，只给本机引擎用')
      : step.k === 'sample' ? (sample ? `样本 ${sample.dur.toFixed(1)} 秒` : '样本是这只音色的底：云端拿整段建克隆，本地引擎截前面几秒当参考')
      : step.k === 'consent' ? `跳过也能存，只是先用不了 ${needed.join(' / ')}`
      : `存的是样本 ${sample.dur.toFixed(1)} 秒${consentClip ? `、授权声明 ${consentClip.dur.toFixed(1)} 秒` : ''}和截出来的参考段；每部视频、每只能克隆的引擎都能选它。`;
    return (
      <div className="vlib-cap" data-screen-label={`我的声音 · 克隆新音色 · ${step.label}`}>
        <div className="vlib-cap__hd">
          <Btn variant="quiet" size="s" icon="back" onClick={onCancel}>我的声音</Btn>
        </div>
        <h2 className="t-title-sm">克隆新音色</h2>
        <Steps items={steps} cur={cur} label="克隆步骤" />
        {step.k === 'models' ? <ModelsStep targets={targets} picked={picked} onToggle={(id) => setPicked((p) => (p.indexOf(id) >= 0 ? p.filter((x) => x !== id) : p.concat(id)))} /> : null}
        {step.k === 'sample' ? <SampleStep lang={lang} setLang={(l) => { setLang(l); setSample(null); }} clip={sample} onClip={setSample} providers={providers} /> : null}
        {step.k === 'consent' ? <ConsentStep needed={needed} phraseLang={phraseLang} setPhraseLang={setPhraseLang} custom={custom} setCustom={setCustom} clip={consentClip} onClip={setConsentClip} /> : null}
        {step.k === 'save' ? <SaveStep draft={draft} targets={chosen} name={name} setName={setName} consent={consent} setConsent={setConsent} seeds={seeds} onReseed={(id) => setSeeds((s) => Object.assign({}, s, {[id]: V.randomSeed()}))} /> : null}
        <div className="vlib-save__acts">
          {cur > 0 ? <Btn variant="secondary" size="s" icon="back" onClick={() => setCur(cur - 1)}>上一步</Btn> : null}
          {!last ? <Btn variant="accent" size="s" disabled={!canNext} onClick={() => setCur(cur + 1)}>下一步</Btn> : null}
          {step.k === 'consent' ? <Btn variant="quiet" size="s" onClick={() => { setConsentClip(null); setCur(cur + 1); }}>稍后补，先存</Btn> : null}
          {last ? <Btn variant="accent" size="s" disabled={!consent || !name.trim()} onClick={() => onDone(draft)}>存为音色</Btn> : null}
          <Btn variant="secondary" size="s" onClick={onCancel}>取消</Btn>
          <span className="t-detail-xs grow">{foot}</span>
        </div>
        <p className="t-detail-xs vlib-foot">交互演示 · 没有真的开麦克风，试听放的是随包录音；上传不会读文件内容。</p>
      </div>
    );
  }

  /* ---------- 单步：给已有音色补录 / 重录授权声明 ---------- */
  function ConsentCapture({v, onDone, onCancel}) {
    const app = useApp();
    const needed = C.consentProviders(app.cloudSaved, app.cloudCustom);
    const [phraseLang, setPhraseLang] = useState(v.consentClip ? v.consentClip.lang : 'en-US');
    const [custom, setCustom] = useState(v.consentClip && v.consentClip.text ? v.consentClip.text : '');
    const [clip, setClip] = useState(null);
    const ok = clip && !V.consentProblem(clip.dur) && (phraseLang !== 'custom' || custom.trim());
    return (
      <div className="vlib-cap" data-screen-label="我的声音 · 补录授权声明">
        <div className="vlib-cap__hd">
          <Btn variant="quiet" size="s" icon="back" onClick={onCancel}>我的声音</Btn>
        </div>
        <h2 className="t-title-sm">{v.consentClip ? '重录' : '补录'}授权声明 · {v.name}</h2>
        <ConsentStep needed={needed.map((p) => p.name)} phraseLang={phraseLang} setPhraseLang={setPhraseLang} custom={custom} setCustom={setCustom} clip={clip} onClip={setClip} />
        <div className="vlib-save__acts">
          <Btn variant="accent" size="s" disabled={!ok} onClick={() => onDone(Object.assign({lang: phraseLang, dur: clip.dur, file: clip.file, at: '刚刚'}, phraseLang === 'custom' ? {text: custom.trim()} : {}))}>存这段</Btn>
          <Btn variant="secondary" size="s" onClick={onCancel}>取消</Btn>
          <span className="t-detail-xs grow">要跟样本是同一个人；样本是从视频里取的就得本人来录这段，否则用不了 {needed.map((p) => p.name).join(' / ') || 'Google Gemini'}。</span>
        </div>
        <p className="t-detail-xs vlib-foot">交互演示 · 没有真的开麦克风，试听放的是随包录音。</p>
      </div>
    );
  }

  /* ---------- 模型页那一行（设置 › 语音合成 › 模型）：绑在这只模型上的音色 + 克隆入口 ----------
     `target` 是 {kind: 'local', id: <engine>} 或 {kind: 'cloud', id: <provider>}；本机引擎列每只音色与它的种子，云端只列建过 voice id 的。
     「克隆新音色」带着 target 去我的声音：采集页预选这只模型，存好后回来。 */
  function ModelVoicesLine({target, from}) {
    const app = useApp();
    const bound = V.voicesBoundTo(app.voices, target);
    const go = () => {
      app.setVoiceHandoff({key: 'model:' + target.id, from, route: app.route, target, open: 'mic'});
      app.go({r: 'settings', sec: 'voices'});
    };
    return (
      <div className="mvl t-detail-xs">
        <span className="mvl__lab">克隆音色</span>
        {bound.length
          ? bound.map((b) => <span key={b.v.id} className="mvl__item"><b>{b.v.name}</b><span className="t-mono">{b.value}</span></span>)
          : <span className="mvl__none">{target.kind === 'cloud' ? '还没在这家建过' : '还没有'}</span>}
        <BCAction className="viewall mvl__go" onClick={go}>{bound.length ? '克隆新音色' : '克隆一只'}<Ic n="chevright" className="ic--14" /></BCAction>
      </div>
    );
  }

  Object.assign(window, {VoiceCapture, ConsentCapture, ModelVoicesLine, VoiceMeter: Meter});
})();

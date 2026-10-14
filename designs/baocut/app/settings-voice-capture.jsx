/* 设置 › 我的声音 › 克隆新音色（2026-10-14 重做采集流程）。以前只有「用麦克风照着一句念 5–12 秒」；
   现在是三步：① 录样本（目标 30 秒，计时器到 30 自动停；麦克风或上传二选一，上传超过 30 秒取前 30 秒）
   → ② 授权声明（只有要第二段录音的提供方看——Gemini：同一个人念一句固定声明，声明分语言、英文最稳，可跳过稍后补）
   → ③ 保存（名字、本人许可、种子、这只音色会落到哪些引擎）。本地引擎的 5–10 秒参考段从样本前面截，原文是第一句台词。
   `ConsentCapture` 是从行卡 ⋯ 里「补录授权声明」进来的单步版。
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
     停下或选好文件后 `onClip({dur, file, via, name})`，重录 / 换文件时 `onClip(null)`。 */
  function ClipRecorder({spec, demo, label, onClip, hint}) {
    const app = useApp();
    const [via, setVia] = useState('mic');
    const [phase, setPhase] = useState('idle');     // idle | rec | done
    const [secs, setSecs] = useState(0);
    const [level, setLevel] = useState(0);
    const [dev, setDev] = useState(false);
    const [file, setFile] = useState(null);
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
                <span className="t-detail-xs grow">{secs >= spec.max ? '到 30 秒自动停了 · 听一遍，不满意就重录' : '听一遍：有没有噪音、有没有念错。不满意就重录。'}</span>
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

  /* ---------- ① 样本 ---------- */
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
        <ClipRecorder spec={V.SAMPLE} label="怎么给" onClip={onClip}
          demo={{file: TTS.defaultBuiltin(lang, '').file, dur: 29.1, name: 'reference_speaker.wav'}}
          hint={verdict ? (verdict.problem || verdict.line) : `照着念，或上传一段现成的。`} />
        {verdict && verdict.problem ? <div className="hint hint--warn">{verdict.problem}</div> : null}
        {verdict && !verdict.problem && verdict.short.length ? <div className="hint hint--warn">能存，但 {verdict.short.join('、')}——要给它们用就再录长一点。</div> : null}
      </>
    );
  }

  /* ---------- ② 授权声明（Gemini 要的第二段） ---------- */
  function ConsentStep({needed, phraseLang, setPhraseLang, onClip, clip}) {
    const phrase = V.consentPhrase(phraseLang);
    const problem = clip ? V.consentProblem(clip.dur) : null;
    return (
      <>
        <p className="vlib-cap__lede">
          {needed.length
            ? `${needed.join(' / ')} 要本人再念一句固定的授权声明，对方会核对这段和样本是不是同一个人。`
            : '现在连着的提供方都不要这一段；想以后给 Google Gemini 用就先录下来，也可以稍后补。'}
          用同一只麦克风、同一个房间录，更容易通过。
        </p>
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">念哪种</span>
          <div className="vlib-cap__chips">
            {V.CONSENT_PHRASES.map((c) => (
              <Chip key={c.code} pill on={phraseLang === c.code} onClick={() => { setPhraseLang(c.code); onClip(null); }}>{c.label}{c.recommended ? ' · 推荐' : ''}</Chip>
            ))}
            <span className="t-detail-xs">官方支持 30 种语言的声明，其他语言去官方文档查原文</span>
          </div>
        </div>
        <blockquote className="vlib-script">{phrase.text}</blockquote>
        {phrase.note ? <div className="hint hint--warn">{phrase.note}</div> : null}
        <ClipRecorder key={phraseLang} spec={V.CONSENT_REC} label="怎么给" onClip={onClip}
          demo={{file: phraseLang === 'zh' ? 'tts-voice-zh-male.wav' : 'tts-voice-en-male.wav', dur: 7.9, name: 'speaker_consent.wav'}}
          hint={problem || (clip ? '听一遍，念清楚整句就行' : '一口气把整句念完，不用赶')} />
        {problem ? <div className="hint hint--warn">{problem}</div> : null}
      </>
    );
  }

  /* ---------- ③ 保存：名字、许可、种子、落到哪 ---------- */
  function LandingList({draft}) {
    const app = useApp();
    const local = V.engineChips().filter((c) => c.ok).map((c) => c.name);
    const cloud = C.cloudChips(draft, app.cloudSaved, {extra: app.cloudCustom});
    return (
      <div className="vlib-land">
        <div className="vlib-land__row">
          <span className="vlib-cap__lab">本机</span>
          <span className="t-detail-xs">{local.join(' / ')} · 用前 {draft.dur} 秒当参考段，种子固定成 {draft.seed}</span>
        </div>
        {cloud.map((c) => (
          <div key={c.id} className="vlib-land__row">
            <span className="vlib-cap__lab">{c.name}</span>
            <Chip tone={CLOUD_TONE[c.k]} icon="remote">{c.chip}</Chip>
            <span className="t-detail-xs">{c.line}</span>
          </div>
        ))}
      </div>
    );
  }

  function SaveStep({draft, name, setName, consent, setConsent, onReseed}) {
    return (
      <div className="vlib-save">
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">叫什么</span>
          <Field size="s" value={name} aria-label="音色名字" onChange={(e) => setName(e.target.value)} placeholder="我的声音" />
        </div>
        <div className="vlib-cap__row">
          <span className="vlib-cap__lab">种子</span>
          <span className="t-mono">{draft.seed}</span>
          <Btn variant="quiet" size="s" icon="refresh" onClick={onReseed}>换一颗</Btn>
          <span className="t-detail-xs">本地引擎没有 voice id，靠同一段参考 + 这颗种子每次都出同一个人；有 voice id 的（Gemini / ElevenLabs / MiniMax）记 id</span>
        </div>
        <Checkbox on={consent} onChange={setConsent} label="这是我自己的声音，或已获本人许可" />
        <LandingList draft={draft} />
      </div>
    );
  }

  /* ---------- 三步串起来 ---------- */
  function VoiceCapture({onDone, onCancel}) {
    const app = useApp();
    const providers = C.providers(app.cloudCustom).filter((p) => p.clone && app.cloudSaved.indexOf(p.id) >= 0);
    const needed = C.consentProviders(app.cloudSaved, app.cloudCustom);
    const steps = V.cloneSteps(needed);
    const [cur, setCur] = useState(0);
    const langs = TTS.sampleLangs('indextts2');
    const [lang, setLang] = useState(langs[0].code);
    const [sample, setSample] = useState(null);
    const [phraseLang, setPhraseLang] = useState(V.consentPhrase('en').code);
    const [consentClip, setConsentClip] = useState(null);
    const [name, setName] = useState('我自己');
    const [consent, setConsent] = useState(false);
    const [seed, setSeed] = useState(() => V.randomSeed());
    const script = V.sampleScript(lang);
    const verdict = sample ? V.sampleVerdict(sample.dur, providers) : null;
    const ref = sample ? V.referenceFromSample(sample.dur, sample.via === 'mic' ? script.first : '') : null;
    const draft = sample ? V.makeVoice({
      name, lang, dur: ref.dur, text: ref.text, textSource: ref.textSource, sourceDur: sample.dur, seed,
      source: {kind: sample.via, at: '刚刚', name: sample.name}, file: sample.file,
      consent: consent ? 'self' : 'unspecified',
      consentClip: consentClip ? {lang: phraseLang, dur: consentClip.dur, file: consentClip.file, at: '刚刚'} : null,
    }) : null;
    const canNext = cur === 0 ? !!(sample && !verdict.problem) : cur === 1 ? !!(consentClip && !V.consentProblem(consentClip.dur)) : false;
    const step = steps[cur];
    return (
      <div className="vlib-cap" data-screen-label={`我的声音 · 克隆新音色 · ${step.label}`}>
        <div className="vlib-cap__hd">
          <Btn variant="quiet" size="s" icon="back" onClick={onCancel}>我的声音</Btn>
        </div>
        <h2 className="t-title-sm">克隆新音色</h2>
        <Steps items={steps.map((s) => ({k: s.k, label: s.optional && !s.needed.length ? `${s.label}（可选）` : s.label}))} cur={cur} label="克隆步骤" />
        {cur === 0 ? <SampleStep lang={lang} setLang={(l) => { setLang(l); setSample(null); }} clip={sample} onClip={setSample} providers={providers} /> : null}
        {cur === 1 ? <ConsentStep needed={needed.map((p) => p.name)} phraseLang={phraseLang} setPhraseLang={setPhraseLang} clip={consentClip} onClip={setConsentClip} /> : null}
        {cur === 2 ? <SaveStep draft={draft} name={name} setName={setName} consent={consent} setConsent={setConsent} onReseed={() => setSeed(V.randomSeed())} /> : null}
        <div className="vlib-save__acts">
          {cur > 0 ? <Btn variant="secondary" size="s" icon="back" onClick={() => setCur(cur - 1)}>上一步</Btn> : null}
          {cur < 2 ? <Btn variant="accent" size="s" disabled={!canNext} onClick={() => setCur(cur + 1)}>下一步</Btn> : null}
          {cur === 1 ? <Btn variant="quiet" size="s" onClick={() => { setConsentClip(null); setCur(2); }}>稍后补，先存</Btn> : null}
          {cur === 2 ? <Btn variant="accent" size="s" disabled={!consent || !name.trim()} onClick={() => onDone(draft)}>存为音色</Btn> : null}
          <Btn variant="secondary" size="s" onClick={onCancel}>取消</Btn>
          <span className="t-detail-xs grow">
            {cur === 0 ? (sample ? `样本 ${sample.dur.toFixed(1)} 秒` : '样本是这只音色的底：云端拿整段建克隆，本地引擎截前面几秒当参考')
              : cur === 1 ? (needed.length ? '跳过也能存，只是先用不了 ' + needed.map((p) => p.name).join(' / ') : '跳过也能存，以后在 ⋯ 里补')
              : `存的是样本 ${sample.dur.toFixed(1)} 秒${consentClip ? `、授权声明 ${consentClip.dur.toFixed(1)} 秒` : ''}和截出来的参考段；每部视频、每只能克隆的引擎都能选它。`}
          </span>
        </div>
        <p className="t-detail-xs vlib-foot">交互演示 · 没有真的开麦克风，试听放的是随包录音；上传不会读文件内容。</p>
      </div>
    );
  }

  /* ---------- 单步：给已有音色补录 / 重录授权声明 ---------- */
  function ConsentCapture({v, onDone, onCancel}) {
    const app = useApp();
    const needed = C.consentProviders(app.cloudSaved, app.cloudCustom);
    const [phraseLang, setPhraseLang] = useState(v.consentClip ? v.consentClip.lang : 'en');
    const [clip, setClip] = useState(null);
    const ok = clip && !V.consentProblem(clip.dur);
    return (
      <div className="vlib-cap" data-screen-label="我的声音 · 补录授权声明">
        <div className="vlib-cap__hd">
          <Btn variant="quiet" size="s" icon="back" onClick={onCancel}>我的声音</Btn>
        </div>
        <h2 className="t-title-sm">{v.consentClip ? '重录' : '补录'}授权声明 · {v.name}</h2>
        <ConsentStep needed={needed.map((p) => p.name)} phraseLang={phraseLang} setPhraseLang={setPhraseLang} clip={clip} onClip={setClip} />
        <div className="vlib-save__acts">
          <Btn variant="accent" size="s" disabled={!ok} onClick={() => onDone({lang: phraseLang, dur: clip.dur, file: clip.file, at: '刚刚'})}>存这段</Btn>
          <Btn variant="secondary" size="s" onClick={onCancel}>取消</Btn>
          <span className="t-detail-xs grow">要跟样本是同一个人；样本是从视频里取的就得本人来录这段，否则用不了 {needed.map((p) => p.name).join(' / ') || 'Google Gemini'}。</span>
        </div>
        <p className="t-detail-xs vlib-foot">交互演示 · 没有真的开麦克风，试听放的是随包录音。</p>
      </div>
    );
  }

  Object.assign(window, {VoiceCapture, ConsentCapture, VoiceMeter: Meter});
})();

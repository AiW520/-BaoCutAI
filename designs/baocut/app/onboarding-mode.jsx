/* Product design §7.6: approved dual-path direction, pending visual review before production sync. */
(function () {
  const {useState} = React;
  const R = window.RSP;
  const M = window.BC_ONBOARDING_MODE;
  const STEPS = [{k: 'connect', label: '连接 API'}, {k: 'models', label: '验证能力'}, {k: 'done', label: '完成配置'}];

  function ModeChoice({value, onChange}) {
    return <div className="onb-mode">
      <p className="onb-mode__intro">选择适合你的创作方式</p>
      <p className="onb-lead">通过 Tuzi API 使用在线模型，或下载模型到这台电脑。以后可以在设置中同时使用两种方式。</p>
      <R.RadioGroup UNSAFE_className="onb-mode__choices" aria-label="选择使用方式" value={value} onChange={onChange} orientation="horizontal">
        <div className={cx('onb-mode__choice', value === 'api' && 'is-on')} onClick={() => onChange('api')}>
          <span className="onb-mode__icon"><R.Icons.GlobeGrid /></span>
          <span className="onb-mode__choice-title"><R.Radio value="api">Tuzi API</R.Radio><Chip tone="accent">推荐</Chip></span>
          <span className="onb-mode__choice-desc">一把密钥，连接在线模型</span>
          <span className="onb-mode__points">无需下载模型权重<br />适合快速开始与轻量设备<br />需要联网，按 API 实际用量计费</span>
          <span className="onb-mode__choice-end">配置密钥与可用能力 <R.Icons.ChevronRight /></span>
        </div>
        <div className={cx('onb-mode__choice', value === 'local' && 'is-on')} onClick={() => onChange('local')}>
          <span className="onb-mode__icon"><R.Icons.DeviceLaptop /></span>
          <span className="onb-mode__choice-title"><R.Radio value="local">本机模型</R.Radio></span>
          <span className="onb-mode__choice-desc">下载到电脑，使用本机算力</span>
          <span className="onb-mode__points">模型就绪后可在本机运行<br />需要磁盘空间与相应硬件<br />可按需选择下载，不必全部安装</span>
          <span className="onb-mode__choice-end">选择并下载本机模型 <R.Icons.ChevronRight /></span>
        </div>
      </R.RadioGroup>
      <p className="onb-note">两种方式都保留手工剪辑与导出。使用会话自动剪辑时，仍需连接 Agent。</p>
    </div>;
  }

  function ApiConnect({apiKey, onChange, error}) {
    return <div className="onb-mode__form">
      <div className="onb-mode__endpoint"><R.Icons.GlobeGrid /><div><b>Tuzi API</b><code>{M.ENDPOINT}</code></div><Chip tone="neutral">OpenAI 兼容</Chip></div>
      <R.TextField label="API Key" type="password" value={apiKey} onChange={onChange} autoComplete="off"
        placeholder="交互预览请填 demo-key" isInvalid={!!error} errorMessage={error}
        description="正式版由这台电脑的安全存储保存，不写入项目、日志或安装包。" UNSAFE_className="onb-mode__field" />
      <div className="onb-mode__notice"><R.Icons.InfoCircle /><p>先检测账号连接与模型列表，再逐项验证能力。检测模型列表不等于确认所有功能都可用。</p></div>
      <p className="onb-note">实际生成、转写与语音验证会按 Tuzi API 的规则计费；验证前可选择需要的能力。</p>
      <details className="onb-mode__demo"><summary>预览失败状态</summary><p>填写 demo-invalid 查看密钥错误，demo-offline 查看连接失败，demo-empty 查看无模型状态。</p></details>
    </div>;
  }

  function ApiCapabilities({selected, setSelected, results}) {
    return <div>
      <div className="onb-mode__connected" role="status"><R.Icons.CheckmarkCircle /><span>模型列表已获取（演示）<small>选择需要的能力，验证通过后再设为默认模型。</small></span></div>
      <div className="onb-mode__capabilities">
        {M.CAPABILITIES.map((cap) => {
          const result = results.find((r) => r.id === cap.id);
          return <div className="onb-mode__capability" key={cap.id}>
            <R.Checkbox isSelected={selected.includes(cap.id)} onChange={(on) => setSelected(on ? selected.concat(cap.id) : selected.filter((id) => id !== cap.id))}>{cap.name}</R.Checkbox>
            <Chip tone={result?.state === 'verified' ? 'positive' : result ? 'notice' : 'neutral'}>{result?.state === 'verified' ? '验证通过（演示）' : result ? '部分支持' : '待验证'}</Chip>
            <p>{cap.detail}</p>
            <div className="onb-mode__model"><span>示例模型</span><code>{cap.model}</code></div>
            {result ? <p className={result.state === 'limited' ? 'onb-mode__limited' : ''}>{result.note}</p> : null}
          </div>;
        })}
      </div>
      <p className="onb-note">音色克隆、音乐生成、语义索引与本机辅助处理单独检测；没有验证通过的能力不会自动启用，也不会自动下载模型。</p>
      <p className="onb-note">正式版将按账号返回的模型提供选择，上述模型仅用于演示流程。</p>
    </div>;
  }

  function ApiComplete({results, selected}) {
    const defaults = M.usableDefaults(results, selected);
    return <div className="onb-mode__summary">
      <div className="onb-mode__connected"><R.Icons.CheckmarkCircle /><span>可以开始创作了<small>{Object.keys(defaults).length} 项能力验证通过（演示），无需下载本机模型。</small></span></div>
      <dl>{M.CAPABILITIES.filter((c) => defaults[c.id]).map((cap) => <div key={cap.id}><dt>{cap.name}</dt><dd>{defaults[cap.id]}</dd></div>)}</dl>
      <div className="onb-mode__notice"><R.Icons.InfoCircle /><p>字幕的逐词对齐、说话人区分，以及音色克隆、音乐生成和语义索引仍需独立配置。需要时再补齐，不阻止使用已经可用的功能。</p></div>
      <p className="onb-lead">现在可以进入工具使用已配置的能力；想让 Agent 帮你自动剪辑，也可以继续连接 Agent。</p>
    </div>;
  }

  function OnboardingModeDialog({onLocal, onClose, onComplete}) {
    const [mode, setMode] = useState('api');
    const [stage, setStage] = useState('choose');
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');
    const [selected, setSelected] = useState(M.CAPABILITIES.map((c) => c.id));
    const [results, setResults] = useState([]);
    const [verified, setVerified] = useState(false);
    const enter = () => mode === 'local' ? onLocal() : setStage('connect');
    const connect = () => {
      const report = M.connectionPreview(apiKey);
      if (!report.ok) { setError(report.error); return; }
      setApiKey(''); setError(''); setResults([]); setVerified(false); setStage('models');
    };
    const verify = () => { setResults(M.verificationPreview(selected)); setVerified(true); };
    const defaults = M.usableDefaults(results, selected);
    const finish = (agent) => onComplete(M.completionRecord(results, selected), agent);
    const dismiss = () => onClose(stage);
    const back = () => {
      setError('');
      if (stage === 'connect') { setApiKey(''); setStage('choose'); }
      else if (stage === 'models') setStage('connect');
      else setStage('models');
    };
    return <R.DialogContainer onDismiss={dismiss}><R.Dialog size="L" aria-label="Tuzi 使用方式引导">
      <R.Heading slot="title">{stage === 'choose' ? '欢迎使用 Tuzi' : stage === 'connect' ? '连接 Tuzi API' : stage === 'models' ? '选择并验证模型能力' : 'Tuzi API 配置完成'}</R.Heading>
      <R.Content>
        {stage === 'choose' ? null : <Steps items={STEPS} cur={STEPS.findIndex((s) => s.k === stage)} label="Tuzi API 配置步骤" className="onb-steps" />}
        {stage === 'choose' ? <ModeChoice value={mode} onChange={setMode} />
          : stage === 'connect' ? <ApiConnect apiKey={apiKey} onChange={(value) => {setApiKey(value); setError('');}} error={error} />
            : stage === 'models' ? <ApiCapabilities selected={selected} setSelected={(ids) => {setSelected(ids); setVerified(false); setResults([]);}} results={results} />
              : <ApiComplete results={results} selected={selected} />}
        <p className="onb-mode__preview" role="note">交互原型：检测使用示例数据，不会发送或保存密钥。请勿输入真实 API Key。</p>
      </R.Content>
      <R.Footer><div className="onb-foot"><Btn variant="quiet" onClick={dismiss}>稍后设置</Btn>{stage !== 'choose' ? <Btn variant="quiet" onClick={back}>上一步</Btn> : null}</div></R.Footer>
      <R.ButtonGroup>
        {stage === 'choose' ? <Btn variant="accent" onClick={enter}>{mode === 'api' ? '配置 Tuzi API' : '设置本机模型'}</Btn>
          : stage === 'connect' ? <Btn variant="accent" onClick={connect}>检测连接与模型</Btn>
            : stage === 'models' ? <><Btn variant="secondary" disabled={!selected.length} onClick={verify}>验证所选能力</Btn><Btn variant="accent" disabled={!verified || !Object.keys(defaults).length} onClick={() => setStage('done')}>使用已验证能力继续</Btn></>
              : <><Btn variant="secondary" onClick={() => finish(true)}>继续连接 Agent</Btn><Btn variant="accent" onClick={() => finish(false)}>完成并进入工具</Btn></>}
      </R.ButtonGroup>
    </R.Dialog></R.DialogContainer>;
  }
  window.OnboardingModeDialog = OnboardingModeDialog;
})();

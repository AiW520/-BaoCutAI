/* Product design §7.6: Tuzi onboarding preview. Discovery never implies verified capabilities. */
(function () {
  const ENDPOINT = 'https://api.tu-zi.com/v1';
  const CAPABILITIES = [
    {id: 'text', name: '文本与翻译', model: 'gpt-4o-mini', detail: '翻译文稿、整理文字与生成脚本'},
    {id: 'image', name: '图像生成', model: 'gpt-image-2', detail: '生成封面、配图与图像素材'},
    {id: 'tts', name: '语音合成', model: 'tts-1', detail: '使用服务提供的预设音色生成语音'},
    {id: 'asr', name: '语音识别与字幕', model: 'whisper-1', detail: '需额外验证时间戳、逐词对齐与说话人能力'},
  ];

  // Only these disposable demo values are accepted. The prototype never sends a key or saves one.
  function connectionPreview(key) {
    const value = String(key || '').trim();
    if (!value) return {ok: false, error: '请先输入示例密钥 demo-key。'};
    if (value === 'demo-invalid') return {ok: false, error: '密钥无效或没有访问权限。请检查密钥后重试。'};
    if (value === 'demo-offline') return {ok: false, error: '暂时无法连接 Tuzi API。请检查网络后重试；不会转为下载本机模型。'};
    if (value === 'demo-empty') return {ok: false, error: '连接成功，但没有返回可用模型。请检查账号权限后重新检测。'};
    if (value !== 'demo-key') return {ok: false, error: '这是交互原型，请使用 demo-key，勿输入真实 API Key。'};
    return {ok: true, models: CAPABILITIES.map((c) => ({id: c.model, capability: c.id, state: 'unverified'}))};
  }

  function verificationPreview(selected) {
    return CAPABILITIES.filter((c) => selected.includes(c.id)).map((c) => ({
      id: c.id, model: c.model, state: c.id === 'asr' ? 'limited' : 'verified',
      note: c.id === 'asr' ? '可返回文字，但逐词时间戳尚未通过验证，暂不设为字幕默认模型。' : '示例请求通过，可设为此能力的默认模型。',
    }));
  }

  function usableDefaults(results, selected) {
    return Object.fromEntries((results || []).filter((r) => r.state === 'verified' && selected.includes(r.id)
      && CAPABILITIES.some((c) => c.id === r.id && c.model === r.model)).map((r) => [r.id, r.model]));
  }

  function completionRecord(results, selected) {
    return {state: 'done', step: 'tuzi-api', mode: 'api', downloaded: [], defaults: usableDefaults(results, selected)};
  }

  window.BC_ONBOARDING_MODE = {ENDPOINT, CAPABILITIES, connectionPreview, verificationPreview, usableDefaults, completionRecord};
})();

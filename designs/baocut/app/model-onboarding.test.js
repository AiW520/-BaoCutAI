const test = require('node:test');
const assert = require('node:assert');
global.window = {};
require('./model-local-models.js');
require('./model-onboarding.js');
const OB = global.window.BC_ONBOARDING;

const models = [
  {id: 'moss-transcribe', name: 'MOSS Transcribe', size: 1748, uses: ['wespeaker']},
  {id: 'qwen3-asr-0.6b', name: 'Qwen3-ASR 0.6B', size: 680, uses: ['vad', 'aligner']},
  {id: 'speaker-diarization', name: '说话人区分', size: 5.7, pack: true, uses: ['wespeaker']},
  {id: 'qwen3-tts-0.6b-base', name: 'Qwen3-TTS 0.6B Base', cat: 'tts', size: 1899, uses: [], note: '克隆'},
  {id: 'qwen3-tts-1.7b-customvoice', name: 'Qwen3-TTS 1.7B CustomVoice', cat: 'tts', size: 2687, uses: [], note: '预设音色'},
  {id: 'indextts2', name: 'IndexTTS2', cat: 'tts', size: 3466, uses: []},
  {id: 'voxcpm2', name: 'VoxCPM2', cat: 'tts', size: 2818, uses: []},
  {id: 'vision-person', name: '人物定位', cat: 'vision', size: 6.4, uses: []},
  {id: 'qwen-image-2.1', name: 'Qwen-Image-2.1', cat: 'image', size: 10035, uses: [], license: {commercialUse: false}},
  {id: 'qwen-image-2.1-turbo', name: 'Qwen-Image-2.1 Turbo', cat: 'image', size: 18125, uses: [], license: {commercialUse: false}},
  {id: 'yue2-3b', name: 'YuE2 3B', cat: 'music', size: 4608, uses: [], supported: false},
];
const comps = [
  {id: 'vad', name: 'VAD 语音活动检测', size: 1.2, installed: true},
  {id: 'aligner', name: 'Forced aligner', size: 938, installed: true},
  {id: 'wespeaker', name: '声纹嵌入', size: 26.5, installed: true},
];
const none = () => false;
const ids = (list) => list.map((c) => c.m.id);

test('六步，Agent 排第一；最后一步是音乐生成', () => {
  assert.deepEqual(OB.STEPS.map((s) => s.k), ['agent', 'asr', 'tts', 'semantic', 'image', 'music']);
  assert.equal(OB.isLast('music'), true);
  assert.equal(OB.isLast('agent'), false);
  assert.equal(OB.stepOf('nope').k, 'agent');
});

test('只在第一次启动弹：走完或退出都记下，之后不再弹', () => {
  assert.equal(OB.shouldShow(null), true);
  assert.equal(OB.shouldShow(undefined), true);
  assert.equal(OB.shouldShow(OB.record('done', 'music', ['moss-transcribe'])), false);
  assert.equal(OB.shouldShow(OB.record('esc', 'agent')), false);
  assert.equal(OB.shouldShow({state: 'whatever'}), true);
});

test('记录：停在哪一步、这次引导里开始下载了哪些', () => {
  assert.deepEqual(OB.record('done', 'music', ['moss-transcribe', 'sem']), {state: 'done', step: 'music', downloaded: ['moss-transcribe', 'sem']});
  assert.deepEqual(OB.record('esc', 'tts'), {state: 'skipped', step: 'tts', downloaded: []});
  assert.deepEqual(OB.record('close'), {state: 'skipped', step: 'agent', downloaded: []});
  assert.equal(OB.recordText(null), '没有记录');
  assert.equal(OB.recordText(OB.record('esc', 'semantic')), '在「语义搜索」退出');
  assert.equal(OB.recordText(OB.record('done', 'music', ['a', 'b'])), '已走完 · 下载了 2 个');
});

test('原型的模拟启动：?onboarding=1 是全新安装，?onboarding=installed 是老用户升级', () => {
  assert.equal(OB.demoLaunch('?onboarding=1'), true);
  assert.equal(OB.demoFresh('?onboarding=1'), true);
  assert.equal(OB.demoLaunch('?onboarding=installed'), true);
  assert.equal(OB.demoFresh('?onboarding=installed'), false);
  assert.equal(OB.demoLaunch(''), false);
  assert.equal(OB.demoLaunch('?legacy=1'), false);
});

test('转录候选：只列语音识别模型、不含辅助包，推荐的 MOSS 排第一，副题写区分说话人的方式', () => {
  const list = OB.choices('asr', models, {'moss-transcribe': 'builtin', 'qwen3-asr-0.6b': 'pack'});
  assert.deepEqual(ids(list), ['moss-transcribe', 'qwen3-asr-0.6b']);
  assert.equal(list[0].recommended, true);
  assert.equal(list[0].note, '转录同时区分说话人');
  assert.equal(list[1].note, '要区分说话人，另装「说话人区分」');
});

test('其余几步的候选：语音合成只列三只、推荐 CustomVoice；图像推荐 Turbo；不支持的不列', () => {
  assert.deepEqual(ids(OB.choices('tts', models)), ['qwen3-tts-1.7b-customvoice', 'qwen3-tts-0.6b-base', 'voxcpm2']);
  assert.equal(OB.choices('tts', models)[0].note, '预设音色');
  assert.deepEqual(ids(OB.choices('image', models)), ['qwen-image-2.1-turbo', 'qwen-image-2.1']);
  assert.equal(OB.nonCommercial(models[9]), true);
  assert.equal(OB.nonCommercial(models[0]), false);
  assert.deepEqual(OB.choices('music', models), []);
  assert.deepEqual(OB.choices('agent', models), []);
  assert.deepEqual(OB.choices('semantic', models), []);
});

test('安装表：全新安装时组件也不在盘上；这次下好的部分算在盘上', () => {
  const fresh = OB.installTable(models, comps, OB.freshInstalled, true, []);
  assert.equal(fresh['moss-transcribe'], false);
  assert.equal(fresh.wespeaker, false);
  assert.equal(fresh['vision-person'], true);
  const got = OB.installTable(models, comps, OB.freshInstalled, true, ['wespeaker']);
  assert.equal(got.wespeaker, true);
  const upgraded = OB.installTable(models, comps, (id) => id === 'qwen3-asr-0.6b', false, []);
  assert.equal(upgraded['qwen3-asr-0.6b'], true);
  assert.equal(upgraded.aligner, true);
});

test('默认勾选：转录选能用的那只或推荐的；语音合成一只没装才勾推荐的；图像不勾', () => {
  const fresh = OB.installTable(models, comps, none, true, []);
  assert.deepEqual(OB.initialPicks('asr', OB.choices('asr', models), comps, fresh), ['moss-transcribe']);
  const upgraded = OB.installTable(models, comps, (id) => id === 'qwen3-asr-0.6b' || id === 'voxcpm2', false, []);
  assert.deepEqual(OB.initialPicks('asr', OB.choices('asr', models), comps, upgraded), ['qwen3-asr-0.6b']);
  assert.deepEqual(OB.initialPicks('tts', OB.choices('tts', models), comps, fresh), ['qwen3-tts-1.7b-customvoice']);
  assert.deepEqual(OB.initialPicks('tts', OB.choices('tts', models), comps, upgraded), []);
  assert.deepEqual(OB.initialPicks('image', OB.choices('image', models), comps, fresh), []);
  assert.deepEqual(OB.initialPicks('asr', [], comps, fresh), []);
});

test('要下多少：权重加缺的组件，共用的只算一份，与 BC_LOCALMODELS.needSize 一致', () => {
  const fresh = OB.installTable(models, comps, none, true, []);
  const p = OB.plan([models[0]], comps, fresh);
  assert.deepEqual(p.parts.map((x) => x.id), ['moss-transcribe', 'wespeaker']);
  assert.equal(p.parts[0].name, 'MOSS Transcribe');
  assert.equal(p.total, global.window.BC_LOCALMODELS.needSize(models[0], comps, fresh));
  assert.equal(OB.planLine(p), '一起下载：MOSS Transcribe 1.7 GB · 声纹嵌入 26.5 MB');
  // 两只共用声纹嵌入：只下一份
  const two = OB.plan([models[0], models[2]], comps, fresh);
  assert.deepEqual(two.parts.map((x) => x.id), ['moss-transcribe', 'wespeaker', 'speaker-diarization']);
  // 组件已在盘上（不是全新安装）就只下权重
  const kept = OB.installTable(models, comps, none, false, []);
  assert.deepEqual(OB.plan([models[0]], comps, kept).parts.map((x) => x.id), ['moss-transcribe']);
  assert.deepEqual(OB.plan([], comps, kept), {parts: [], total: 0});
  assert.equal(OB.planLine({parts: []}), null);
});

test('语义搜索包：没装时三部分都要下，装好了不下', () => {
  const pkg = {parts: [{id: 'embedding-text', size: 157}, {id: 'embedding', size: 462}, {id: 'litertlm-runtime', size: 43}]};
  assert.equal(OB.pkgPlan(pkg, false).total, 662);
  assert.deepEqual(OB.pkgPlan(pkg, true), {parts: [], total: 0});
});

test('主按钮：有要下的写「下载 X 并继续」，没有就往下走，最后一步是完成', () => {
  const fresh = OB.installTable(models, comps, none, true, []);
  assert.deepEqual(OB.primary('asr', OB.plan([models[0]], comps, fresh)), {kind: 'download', label: '下载 1.7 GB 并继续'});
  assert.deepEqual(OB.primary('asr', {parts: [], total: 0}), {kind: 'next', label: '下一步'});
  assert.deepEqual(OB.primary('music', {parts: [], total: 0}), {kind: 'next', label: '完成'});
  assert.equal(OB.primary('music', {parts: [{id: 'yue2-3b', size: 4608}], total: 4608}).label, '下载 4.5 GB 并完成');
});

test('底部那一行：只有一只在下时写名字与百分比，几只同时在下只写个数，下完的、没下成的只计数', () => {
  assert.equal(OB.bgLine([]), null);
  assert.equal(OB.bgLine([{name: 'MOSS Transcribe', pct: 31.4, status: 'running'}, {name: '语义搜索', pct: 100, status: 'done'}]),
    '后台在下载 MOSS Transcribe 31% · 1 个已下完');
  assert.equal(OB.bgLine([{name: 'A', pct: 10, status: 'running'}, {name: 'B', pct: 20, status: 'running'}]), '后台在下载 2 个');
  assert.equal(OB.bgLine([{name: 'A', pct: 100, status: 'done'}, {name: 'B', pct: 40, status: 'error'}]),
    '后台下载 · 1 个已下完 · 1 个没下成');
});

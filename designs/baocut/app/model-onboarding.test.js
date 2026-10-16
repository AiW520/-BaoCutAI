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
  {id: 'qwen3-tts-0.6b-base', name: 'Qwen3-TTS 0.6B Base', cat: 'tts', size: 1899, uses: []},
  {id: 'voxcpm2', name: 'VoxCPM2', cat: 'tts', size: 2818, uses: []},
  {id: 'vision-person', name: '人物定位', cat: 'vision', size: 6.4, uses: []},
];
const comps = [
  {id: 'vad', name: 'VAD 语音活动检测', size: 1.2, installed: true},
  {id: 'aligner', name: 'Forced aligner', size: 938, installed: true},
  {id: 'wespeaker', name: '声纹嵌入', size: 26.5, installed: true},
];
const none = () => false;

test('只在第一次启动弹：走完或跳过都记下，之后不再弹', () => {
  assert.equal(OB.shouldShow(null), true);
  assert.equal(OB.shouldShow(undefined), true);
  assert.equal(OB.shouldShow(OB.record('done', 'tts', 'moss-transcribe')), false);
  assert.equal(OB.shouldShow(OB.record('skip', 'welcome')), false);
  assert.equal(OB.shouldShow({state: 'whatever'}), true);
});

test('记录：只有走到最后算走完，其余关掉都算跳过，并记下停在哪一步与下载了哪只', () => {
  assert.deepEqual(OB.record('done', 'tts', 'moss-transcribe'), {state: 'done', step: 'tts', asr: 'moss-transcribe'});
  assert.deepEqual(OB.record('esc', 'asr'), {state: 'skipped', step: 'asr', asr: null});
  assert.deepEqual(OB.record('skip'), {state: 'skipped', step: 'welcome', asr: null});
  assert.equal(OB.recordText(null), '没有记录');
  assert.equal(OB.recordText(OB.record('skip', 'asr')), '在「语音识别」跳过');
  assert.equal(OB.recordText(OB.record('done', 'tts', 'qwen3-asr-0.6b')), '已走完 · 下载了 qwen3-asr-0.6b');
});

test('原型的模拟启动：?onboarding=1 是全新安装，?onboarding=installed 是已有模型', () => {
  assert.equal(OB.demoLaunch('?onboarding=1'), true);
  assert.equal(OB.demoFresh('?onboarding=1'), true);
  assert.equal(OB.demoLaunch('?onboarding=installed'), true);
  assert.equal(OB.demoFresh('?onboarding=installed'), false);
  assert.equal(OB.demoLaunch(''), false);
  assert.equal(OB.demoLaunch('?legacy=1'), false);
});

test('转录候选：只列语音识别模型、不含辅助包，推荐的 MOSS 排第一', () => {
  const list = OB.asrChoices([models[1], models[2], models[0], models[3]], {'moss-transcribe': 'builtin', 'qwen3-asr-0.6b': 'pack'});
  assert.deepEqual(list.map((c) => c.m.id), ['moss-transcribe', 'qwen3-asr-0.6b']);
  assert.equal(list[0].recommended, true);
  assert.equal(OB.asrNote(list[0]), '转录同时区分说话人');
  assert.equal(OB.asrNote(list[1]), '要区分说话人，另装「说话人区分」');
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

test('默认选中：有能用的就选它，否则选推荐的', () => {
  const choices = OB.asrChoices(models, {});
  const fresh = OB.installTable(models, comps, none, true, []);
  assert.equal(OB.initialPick(choices, comps, fresh), 'moss-transcribe');
  const upgraded = OB.installTable(models, comps, (id) => id === 'qwen3-asr-0.6b', false, []);
  assert.equal(OB.initialPick(choices, comps, upgraded), 'qwen3-asr-0.6b');
  assert.equal(OB.initialPick([], comps, fresh), null);
});

test('要下多少：权重加缺的组件，与 BC_LOCALMODELS.needSize 一致', () => {
  const fresh = OB.installTable(models, comps, none, true, []);
  const p = OB.plan(models[0], comps, fresh);
  assert.deepEqual(p.parts.map((x) => x.id), ['moss-transcribe', 'wespeaker']);
  assert.equal(p.parts[0].name, 'MOSS Transcribe');
  assert.equal(p.total, global.window.BC_LOCALMODELS.needSize(models[0], comps, fresh));
  assert.equal(OB.planLine(p), '一起下载：MOSS Transcribe 1.7 GB · 声纹嵌入 26.5 MB');
  // 组件已在盘上（不是全新安装）就只下权重
  const kept = OB.installTable(models, comps, none, false, []);
  assert.deepEqual(OB.plan(models[0], comps, kept).parts.map((x) => x.id), ['moss-transcribe']);
  assert.deepEqual(OB.plan(null, comps, kept), {parts: [], total: 0});
});

test('主按钮：缺东西时写要下多少，装好了或已在下就是下一步', () => {
  const fresh = OB.installTable(models, comps, none, true, []);
  const p = OB.plan(models[0], comps, fresh);
  assert.deepEqual(OB.asrPrimary(p, false), {kind: 'download', label: '下载 1.7 GB…'});
  assert.deepEqual(OB.asrPrimary(p, true), {kind: 'next', label: '下一步'});
  const ready = OB.installTable(models, comps, () => true, false, []);
  assert.equal(OB.planLine(OB.plan(models[0], comps, ready)), null);
  assert.equal(OB.asrPrimary(OB.plan(models[0], comps, ready), false).kind, 'next');
});

test('语音合成的例子只列目录里有的，顺序固定', () => {
  assert.deepEqual(OB.ttsHighlights(models).map((m) => m.id), ['qwen3-tts-0.6b-base', 'voxcpm2']);
});

const test = require('node:test');
const assert = require('node:assert/strict');

global.window = {};
require('./model-tts.js');
require('./model-voices.js');
const TTS = global.window.BC_TTS;
const V = global.window.BC_VOICES;

const S = (id, start, end, sp, text) => ({id, start, end, sp, text});
const CUES = [
  S('g1', 0, 5.4, 's1', '欢迎回到《码与远方》，我是林澈。'),
  S('g2', 5.4, 11.2, 's1', '这一期我们请到了两位做本地视频工具的朋友。'),
  S('g3', 11.2, 16.8, 's2', '嗯，就是，谢谢邀请，我是周远。'),
  S('g4', 16.8, 22.0, 's3', '大家好，我是苏黎，负责渲染这一块。'),
  S('g5', 22.0, 28.6, 's1', '先从一个很实际的问题开始：为什么要做本地？'),
  S('g6', 28.6, 35.0, 's2', '因为素材是别人的。上传这件事本身就是一个决定。'),
  S('g7', 35.0, 41.4, 's2', '我没准备好替客户做这个决定。'),
  S('g8', 41.4, 47.2, 's3', '而且模型已经跑得动了，这一年变化很大。'),
  S('g9', 47.2, 53.8, 's1', '那时候每一个小改动都要三次签字。'),
  S('g10', 53.8, 60.2, 's2', '对，所以我们把整条链路搬到了本机。'),
];

test('麦克风门槛：短于 5 秒不给存，够了回 null', () => {
  assert.equal(V.REC.min, 5);
  assert.match(V.takeProblem(3.2), /只录到 3\.2 秒/);
  assert.equal(V.takeProblem(5), null);
  assert.equal(V.takeProblem(11.9), null);
});

test('样本（2026-10-14）：目标 30 秒自动停；5 秒以下不给存，10 秒以下只提醒云端嫌短；授权声明 3 秒起、英文是推荐值', () => {
  assert.deepEqual(V.SAMPLE, {min: 5, good: 10, target: 30, max: 30});
  const providers = [{name: 'MiniMax', clone: {min: 10}}, {name: 'Google Gemini', clone: {min: 10, consent: true}}, {name: 'ElevenLabs', clone: {min: 1}}];
  assert.match(V.sampleVerdict(3.1, providers).problem, /只录到 3\.1 秒/);
  const mid = V.sampleVerdict(7.4, providers);
  assert.equal(mid.problem, null);
  assert.deepEqual(mid.short, ['MiniMax 要 10 秒以上', 'Google Gemini 要 10 秒以上']);
  assert.deepEqual(V.sampleVerdict(29.1, providers).short, []);
  assert.equal(V.sampleVerdict(30, providers).line, '够了');
  assert.match(V.consentProblem(1.2), /把整句念完/);
  assert.equal(V.consentProblem(7.9), null);
  // 授权声明：官方 30 个地区语言，旧码 en / zh 也认；常用两种给芯片，其余 28 种在「更多语言」；表外可自定义
  assert.equal(V.CONSENT_PHRASES.length, 30);
  assert.equal(V.consentPhrase('en').code, 'en-US');
  assert.equal(V.consentPhrase('en-US').recommended, true);
  assert.match(V.consentPhrase('en').text, /^I am the owner of this voice/);
  assert.equal(V.consentPhrase('zh').code, 'zh-CN');
  assert.equal(V.consentPhrase('zh-CN').verified, false, '中文实测常验不过');
  assert.equal(V.consentPhrase('xx').code, 'en-US', '没有的语言退到英文');
  assert.equal(V.consentPhrase('fr-CA').text, V.consentPhrase('fr-FR').text, '同一语言几个地区原文相同');
  assert.equal(V.phraseLabel(V.consentPhrase('fr-CA')), 'Français（加拿大）');
  assert.equal(V.phraseLabel(V.consentPhrase('ja-JP')), '日本語');
  assert.deepEqual(V.CONSENT_COMMON, ['en-US', 'zh-CN']);
  assert.equal(V.consentMore().length, 28);
  assert.ok(V.consentMore().every((o) => V.CONSENT_COMMON.indexOf(o.code) < 0));
  assert.deepEqual(V.consentPhrase('custom', ' 我同意 '), {code: 'custom', label: '自定义', text: '我同意', custom: true});
  assert.equal(V.consentPhrase('custom').text, '');
  // 台词：这门语言的三句示例连起来，第一句就是参考段原文
  const script = V.sampleScript('zh');
  assert.equal(script.lines.length, 3);
  assert.match(script.first, /^欢迎使用 BaoCut/);
  assert.deepEqual(V.referenceFromSample(29.1, script.first), {dur: 10, text: script.first, textSource: 'script'});
  assert.deepEqual(V.referenceFromSample(7.4, ''), {dur: 7.4, text: '', textSource: 'none'});
  // 先选模型：本机引擎总在，云端列能克隆的（没连密钥的也能选）；选中的里有要授权声明的才有那一步
  const CT = global.window.BC_CLOUD_TTS || require('./model-cloud-tts.js');
  const targets = V.cloneTargets(V.engineChips(), CT.providers(), ['elevenlabs']);
  assert.ok(targets.some((t) => t.kind === 'local' && t.id === 'indextts2'));
  assert.ok(!targets.some((t) => t.kind === 'cloud' && t.id === 'openai'), 'OpenAI 不能克隆');
  const g = targets.find((t) => t.id === 'google');
  assert.deepEqual([g.kind, g.consent, g.connected], ['cloud', true, false]);
  assert.equal(targets.find((t) => t.id === 'elevenlabs').connected, true);
  assert.deepEqual(V.cloneSteps([g]).map((s) => s.k), ['models', 'sample', 'consent', 'save']);
  assert.deepEqual(V.cloneSteps([g])[2].needed, ['Google Gemini']);
  assert.deepEqual(V.cloneSteps(targets.filter((t) => t.id !== 'google')).map((s) => s.k), ['models', 'sample', 'save'], '没选 Gemini 就没有授权那一步');
  assert.deepEqual(V.cloneSteps([]).map((s) => s.k), ['models', 'sample', 'save']);
});

test('音色档记什么认人：每只本机引擎一颗种子，云端各家一只 voice id；授权录音另存一段', () => {
  const me = V.DEMO.find((v) => v.id === 'v-me');
  assert.equal(me.seed, 48213);
  assert.deepEqual(me.seeds, {indextts2: 48213, gptsovits: 90117});
  assert.equal(V.seedFor(me, 'gptsovits'), 90117);
  assert.equal(V.seedFor(me, 'qwen3'), 48213, '没单独给种子的引擎用底种子');
  assert.equal(me.consentClip.lang, 'en-US');
  assert.equal(me.cloud.google.voiceId, 'voice_demo7q2mx');
  const b = V.bindings(me, [{id: 'google', name: 'Google Gemini'}]);
  assert.deepEqual(b.map((x) => x.kind + ':' + x.id), ['seed:indextts2', 'seed:gptsovits', 'seed:*', 'voice:google']);
  assert.equal(V.idLine(me, [{id: 'google', name: 'Google Gemini'}]), '种子 48213（IndexTTS2 / 其余本机引擎） · 种子 90117（GPT-SoVITS） · Google Gemini voice_demo7q2mx · 授权声明 English（美国） 7.9 秒');
  const host = V.DEMO.find((v) => v.id === 'v-host');
  assert.equal(host.consentClip, null);
  assert.deepEqual(host.seeds, {});
  assert.equal(V.idLine(host, [{id: 'elevenlabs', name: 'ElevenLabs'}]), `种子 ${host.seed}（本机引擎） · ElevenLabs bc_ele_host`);
  // 模型页那一行：云端只列建过 voice id 的，本机列每只音色与它在这只引擎上的种子
  assert.deepEqual(V.voicesBoundTo(V.DEMO, {kind: 'cloud', id: 'google'}).map((x) => x.v.id + ' ' + x.value), ['v-me voice_demo7q2mx']);
  assert.deepEqual(V.voicesBoundTo(V.DEMO, {kind: 'cloud', id: 'minimax'}), []);
  assert.deepEqual(V.voicesBoundTo(V.DEMO, {kind: 'local', id: 'gptsovits'}).map((x) => x.value), ['种子 90117', `种子 ${host.seed}`]);
  const fresh = V.makeVoice({name: 'x', consentClip: {dur: 6.94}});
  assert.ok(fresh.seed >= 1 && Number.isInteger(fresh.seed));
  assert.equal(fresh.consentClip.dur, 6.9);
  assert.equal(fresh.consentClip.lang, 'en-US');
  const custom = V.makeVoice({name: 'y', consentClip: {lang: 'custom', text: '我同意', dur: 5}});
  assert.equal(V.idLine(custom, []).split(' · ').pop(), '授权声明 自定义 5.0 秒');
  assert.deepEqual(JSON.parse(V.exportBundle(custom)).consentClip, {file: 'consent.wav', seconds: 5, language: 'custom', text: '我同意'});
  assert.match(V.metaLine(me), /^简体中文 · 样本 29\.1 秒 · 麦克风 · 2 天前$/);
  const up = V.makeVoice({lang: 'en', dur: 10, sourceDur: 29.1, source: {kind: 'upload', name: 'reference_speaker.wav'}});
  assert.equal(V.metaLine(up), 'English · 样本 29.1 秒 · 上传 · reference_speaker.wav · 刚刚');
  const j = JSON.parse(V.exportBundle(me));
  assert.equal(j.seed, 48213);
  assert.deepEqual(j.seeds, {indextts2: 48213, gptsovits: 90117});
  assert.equal(JSON.parse(V.exportBundle(host)).seeds, null);
  assert.deepEqual(j.consentClip, {file: 'consent.wav', seconds: 7.9, language: 'en-US'});
  assert.equal(JSON.parse(V.exportBundle(host)).consentClip, null);
  assert.equal(j.cloud, undefined, 'voice id 不进导出包');
});

test('音色档：makeVoice 补默认值，元数据一行按来源分两种写法', () => {
  const mic = V.makeVoice({name: ' 我 ', lang: 'zh', dur: 7.83, text: 'x', source: {kind: 'mic'}});
  assert.equal(mic.name, '我');
  assert.equal(mic.dur, 7.8);
  assert.equal(mic.textSource, 'script');
  assert.equal(mic.qwen3, 'icl');
  assert.ok(mic.file, '试听要有随包录音可放');
  assert.match(V.metaLine(mic), /^简体中文 · 7\.8 秒 · 麦克风 · 刚刚$/);
  const media = V.DEMO.find((v) => v.id === 'v-host');
  assert.equal(media.textSource, 'transcript');
  assert.equal(V.sourceLine(media), '第 12 期访谈.mp4 · 说话人 A · 00:00–00:11');
  assert.equal(V.makeVoice({}).name, '我自己');
});

test('按引擎落地：能吃参考音频的都走 clone', () => {
  ['qwen3', 'qwen3-1.7b', 'indextts2', 'indextts25', 'gptsovits', 'voxcpm2', 'omnivoice'].forEach((e) => {
    const p = V.profileFor(e);
    assert.equal(p.ok, true, e);
    assert.equal(p.mode, 'clone');
    assert.ok(p.line);
  });
  assert.match(V.profileFor('qwen3').line, /ICL/);
  assert.match(V.profileFor('gptsovits').line, /原文/);
  // 多句一致那句统一由 RUN_LINE 带，引擎落地句自己不再重复
  assert.match(V.RUN_LINE, /同一颗种子/);
  ['qwen3', 'indextts2', 'gptsovits'].forEach((e) => assert.doesNotMatch(V.profileFor(e).line, /种子/));
  const chips = V.engineChips();
  assert.deepEqual(chips.map((c) => c.ok), [true, true, true, true, true, true, true, true]);
  assert.match(V.profileFor('omnivoice').line, /非商用/);
  assert.equal(V.auditionModel((id) => id === 'gpt-sovits-v2'), 'gpt-sovits-v2');
  assert.equal(V.auditionModel(() => true), 'indextts2');
  assert.equal(V.auditionModel(() => false), null);
});

test('分人页：每人一张卡、字母按出场、按说话时长排、候选最多 3 段互不重叠且都 5–10 秒', () => {
  const cards = V.analyze(CUES, {});
  assert.deepEqual(cards.map((c) => c.id), ['s2', 's1', 's3']);
  assert.deepEqual(cards.map((c) => c.letter), ['B', 'A', 'C']);
  assert.equal(V.speakerLine(cards[0]), '说了 25 秒 · 4 句');
  cards.forEach((c) => {
    assert.ok(c.candidates.length <= 3);
    const used = new Set();
    c.candidates.forEach((w) => {
      assert.ok(w.seconds >= 5 && w.seconds <= 10, `${c.id} ${w.seconds}`);
      assert.ok(w.text, '候选带文字');
      w.ids.forEach((id) => { assert.ok(!used.has(id)); used.add(id); });
      assert.deepEqual(w.issues, []);
    });
  });
  assert.equal(V.candidateLine(cards[0].candidates[0]), '00:29–00:35 · 6.4 秒');
});

test('质量 chip 只报分离 / 分人步报上来的区间：插话、背景声；分离过就不报背景声', () => {
  const opt = {overlaps: [[52.5, 54.5]], music: [[0, 12]]};
  const cards = V.analyze(CUES, {}, opt);
  const a = cards.find((c) => c.id === 's1');
  assert.deepEqual(a.candidates.map((w) => w.issues), [[], ['overlap'], ['background']]);
  const sep = V.analyze(CUES, {}, Object.assign({separated: true}, opt));
  assert.deepEqual(sep.find((c) => c.id === 's1').candidates.map((w) => w.issues), [[], ['overlap'], []]);
  assert.equal(V.issueLabel('overlap'), '有人插话');
  const short = V.analyze([S('x', 0, 3, 'q', 'hi')], {});
  assert.deepEqual(short[0].candidates[0].issues, ['short']);
  // 凑得出 5 秒的说话人不再列碎段
  const mixed = V.analyze([S('a', 0, 6, 'q', 'one'), S('b', 20, 23, 'q', 'two'), S('c', 40, 43.5, 'q', 'three')], {});
  assert.deepEqual(mixed[0].candidates.map((w) => w.issues), [[]]);
});

test('分人页保存：勾了谁就造谁，名字空着用「说话人 X」，底栏那句跟着人数', () => {
  const cards = V.analyze(CUES, {});
  assert.equal(V.saveLabel(cards, {}), '先勾一位说话人');
  assert.equal(V.saveLabel(cards, {s1: {on: true, name: '主持人'}}), '存为音色「主持人」');
  assert.equal(V.saveLabel(cards, {s1: {on: true}, s2: {on: true}}), '已选 2 位 · 存为 2 只音色');
  const media = {name: '访谈.mp4', lang: 'zh', separated: true};
  const out = V.voicesFromPicks(cards, {s1: {on: true, name: '主持人', k: 1}, s3: {on: true}}, media);
  assert.deepEqual(out.map((v) => v.name), ['主持人', '说话人 C']);
  assert.equal(out[0].source.kind, 'media');
  assert.equal(out[0].source.speaker, 'A');
  assert.equal(out[0].start, undefined);
  assert.equal(out[0].source.start, cards.find((c) => c.id === 's1').candidates[1].start);
  assert.equal(out[0].textSource, 'transcript');
  assert.ok(out[0].text);
});

test('共享选择器：四组按引擎增减', () => {
  const g = V.pickerGroups('qwen3', V.DEMO);
  assert.deepEqual(g.map((x) => x.k), ['default', 'my', 'builtin', 'preset', 'file']);
  assert.equal(g[1].items.length, 3);
  assert.equal(g[1].items[2].kind, 'new');
  assert.deepEqual(V.pickerGroups('indextts2', []).map((x) => x.k), ['default', 'my', 'builtin', 'file']);
});

test('选择器值 ↔ 表单：选我的声音落成 clone + my: 参考，选预设落 preset，反推一致', () => {
  const f = {engine: 'qwen3', mode: 'preset', preset: 'Vivian', refText: ''};
  const patch = V.applyToForm(f, {kind: 'my', id: 'v-host'}, V.DEMO);
  assert.equal(patch.mode, 'clone');
  assert.equal(patch.ref.my, 'v-host');
  assert.match(patch.refText, /码与远方/);
  assert.deepEqual(V.valueOfForm(Object.assign({}, f, patch)), {kind: 'my', id: 'v-host'});
  assert.equal(V.valueLabel({kind: 'my', id: 'v-host'}, V.DEMO), '主持人');
  assert.equal(V.valueLabel({kind: 'my', id: 'gone'}, V.DEMO), '已删除的音色');
  const p2 = V.applyToForm(Object.assign({}, f, patch), {kind: 'preset', id: 'Serena'}, V.DEMO);
  assert.deepEqual(p2, {mode: 'preset', preset: 'Serena'});
  const b = V.applyToForm(f, {kind: 'builtin', id: 'en-male'});
  assert.equal(b.ref.builtin, 'en-male');
  assert.deepEqual(V.valueOfForm(Object.assign({}, f, b)), {kind: 'builtin', id: 'en-male'});
  const d = V.applyToForm(Object.assign({}, f, patch), {kind: 'default'});
  assert.equal(d.ref, null);
  assert.equal(d.mode, 'clone');
  assert.deepEqual(V.valueOfForm({engine: 'indextts2', mode: 'clone', ref: null}), {kind: 'default'});
  assert.equal(V.valueLabel({kind: 'default'}), '默认音色');
});

test('导出包：voice.json schema 1，带参考文字、来源与同意声明', () => {
  const v = V.DEMO[0];
  const j = JSON.parse(V.exportBundle(v));
  assert.equal(j.schema, 1);
  assert.equal(j.reference.file, 'reference.wav');
  assert.equal(j.reference.seconds, 7.8);
  assert.equal(j.reference.textSource, 'script');
  assert.equal(j.consent, 'self');
  assert.equal(j.provenance.kind, 'mic');
  assert.equal(j.qwen3.mode, 'icl');
  assert.equal(V.bundleName(v), '我自己.bcvoice');
});

test('model-tts 那边认 my: 来源：refSources 把我的声音排在默认之后、pickRef 带上原文', () => {
  const src = TTS.refSources('indextts2', false, V.DEMO);
  assert.deepEqual(src.slice(0, 3).map((s) => s.k), ['none', 'my:v-me', 'my:v-host']);
  assert.equal(src[1].my, true);
  const f = TTS.pickRef({engine: 'indextts2', refText: ''}, 'my:v-me', null, V.DEMO);
  assert.equal(f.ref.my, 'v-me');
  assert.equal(f.ref.name, '我自己');
  assert.match(f.refText, /BaoCut/);
  assert.equal(TTS.refSourceOf(f.ref), 'my:v-me');
});

test('新音色的默认名字：重名时依次加编号', () => {
  assert.equal(V.defaultVoiceName([]), '我的声音');
  assert.equal(V.defaultVoiceName([{name: '主持人'}, {name: '我的声音'}]), '我的声音 2');
  assert.equal(V.defaultVoiceName([{name: '我的声音'}, {name: '我的声音 2'}]), '我的声音 3');
});

const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-onboarding-mode.js');
const M = window.BC_ONBOARDING_MODE;

test('model discovery leaves every capability unverified', () => {
  const report = M.connectionPreview(' demo-key ');
  assert.equal(report.ok, true);
  assert.ok(report.models.every((m) => m.state === 'unverified'));
  assert.deepEqual(M.usableDefaults(report.models, ['text', 'image']), {});
});

test('empty, invalid, unavailable and non-demo credentials cannot complete connection', () => {
  for (const key of ['', 'demo-invalid', 'demo-offline', 'demo-empty', 'real-key-placeholder']) {
    assert.equal(M.connectionPreview(key).ok, false);
  }
});

test('partial transcription support is not silently enabled for subtitles', () => {
  const selected = ['text', 'image', 'tts', 'asr'];
  const results = M.verificationPreview(selected);
  assert.equal(results.find((r) => r.id === 'asr').state, 'limited');
  assert.deepEqual(M.usableDefaults(results, selected), {text: 'gpt-4o-mini', image: 'gpt-image-2', tts: 'tts-1'});
  assert.deepEqual(M.usableDefaults(results, ['image']), {image: 'gpt-image-2'});
});

test('completion records only verified defaults and never credentials or downloads', () => {
  const selected = ['text', 'image'];
  const result = M.completionRecord(M.verificationPreview(selected), selected);
  assert.deepEqual(result, {state: 'done', step: 'tuzi-api', mode: 'api', downloaded: [], defaults: {text: 'gpt-4o-mini', image: 'gpt-image-2'}});
  assert.deepEqual(M.usableDefaults([{id: 'music', model: 'unknown', state: 'verified'}], ['music']), {});
});

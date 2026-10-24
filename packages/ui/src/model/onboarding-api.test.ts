import { afterEach, describe, expect, it, vi } from 'vitest';
import { LOCALES, setLocale, type ModelCapabilitiesView, type ProviderCapabilityView } from '@baocut/protocol';
import { connectTuzi, declareTuziModels, saveTuziDefaults, suggestedTuziModels, TUZI_ENDPOINT, verifiedTuziModels } from './onboarding-api.ts';
import { M } from './onboarding-copy.ts';

function view(entries: ProviderCapabilityView[] = []) {
  return Object.fromEntries(['transcribe', 'synthesizeSpeech', 'generateImage', 'generateText', 'separateAudio', 'generateMusic'].map((cap) => [cap, { default: null, effective: null, providers: entries }])) as unknown as ModelCapabilitiesView;
}
const provider = (id: string, endpoint: string, models: unknown[] = []) => ({ providerId: id, kind: 'online', label: 'Existing', config: { enabled: true, endpoint, accounts: [] }, models, available: true }) as unknown as ProviderCapabilityView;
const session = () => ({ configureModelProvider: vi.fn().mockResolvedValue({ capabilities: {} }), addModelAccount: vi.fn().mockResolvedValue({ config: { accounts: [{ accountId: 'old' }, { accountId: 'new' }] } }), arrangeModelAccounts: vi.fn().mockResolvedValue({}), setModelDefault: vi.fn().mockResolvedValue(null) });
afterEach(() => setLocale('zh-Hans'));

describe('Tuzi onboarding commands', () => {
  it('verifies a new endpoint atomically with no model or default claims', async () => {
    const s = session();
    expect(await connectTuzi(s, view(), 'test-only-key')).toBe('custom:tuzi');
    expect(s.configureModelProvider).toHaveBeenCalledExactlyOnceWith({ providerId: 'custom:tuzi', label: 'Tuzi API', endpoint: TUZI_ENDPOINT, credential: 'test-only-key', verify: true, enabled: true, models: [] });
    expect(s.setModelDefault).not.toHaveBeenCalled();
  });
  it('does not overwrite another endpoint with a colliding name', async () => {
    const s = session();
    expect(await connectTuzi(s, view([provider('custom:tuzi', 'https://example.com/v1')]), 'test-only-key')).toBe('custom:tuzi-2');
  });
  it('reuses the exact endpoint, verifies the new account and makes it primary', async () => {
    const s = session();
    expect(await connectTuzi(s, view([provider('custom:existing', TUZI_ENDPOINT)]), 'test-only-key')).toBe('custom:existing');
    expect(s.addModelAccount).toHaveBeenCalledExactlyOnceWith({ providerId: 'custom:existing', credential: 'test-only-key', endpoint: TUZI_ENDPOINT, verify: true });
    expect(s.arrangeModelAccounts).toHaveBeenCalledExactlyOnceWith('custom:existing', ['new', 'old']);
    expect(s.configureModelProvider).toHaveBeenCalledExactlyOnceWith({ providerId: 'custom:existing', enabled: true });
  });
  it('does not enable or reorder accounts after authentication failure', async () => {
    const s = session(); s.addModelAccount.mockRejectedValue(new Error('invalid key'));
    await expect(connectTuzi(s, view([provider('custom:existing', TUZI_ENDPOINT)]), 'test-only-key')).rejects.toThrow('invalid key');
    expect(s.arrangeModelAccounts).not.toHaveBeenCalled(); expect(s.configureModelProvider).not.toHaveBeenCalled();
  });
  it('suggests only models returned by the account and never infers capability success', () => {
    expect(suggestedTuziModels(['gpt-4o-mini', 'unrelated'])).toEqual({ generateText: 'gpt-4o-mini' });
    expect(suggestedTuziModels([])).toEqual({});
    expect(verifiedTuziModels({ generateText: 'gpt-4o-mini' }, {})).toEqual({});
  });
  it('ignores failed tests, changed models and ASR even if incorrectly marked tested', () => {
    expect(verifiedTuziModels({ generateText: 'new', generateImage: 'image', transcribe: 'asr', synthesizeSpeech: 'tts' }, {
      generateText: { modelId: 'old', state: 'verified' }, generateImage: { modelId: 'image', state: 'failed' }, transcribe: { modelId: 'asr', state: 'verified' }, synthesizeSpeech: { modelId: 'tts', state: 'verified' },
    })).toEqual({ synthesizeSpeech: 'tts' });
  });
  it('preserves existing declarations and only adds selected models', async () => {
    const s = session();
    await declareTuziModels(s, view(), 'custom:tuzi', { generateText: 'gpt-4o-mini', transcribe: undefined });
    expect(s.configureModelProvider).toHaveBeenCalledExactlyOnceWith({ providerId: 'custom:tuzi', models: [{ modelId: 'gpt-4o-mini', capability: 'generateText' }] });
    await expect(declareTuziModels(s, view(), 'custom:tuzi', { generateText: 'same', generateImage: 'same' })).rejects.toThrow(M.mode.modelConflict);
  });
  it('preserves an existing model with its declared limits', async () => {
    const s = session();
    const v = view();
    v.generateText.providers = [provider('custom:tuzi', TUZI_ENDPOINT, [{ modelId: 'existing', label: 'Existing model', available: true, contextTokens: 65536, maxOutputTokens: 1024, efforts: [], structuredOutput: false }]) as ModelCapabilitiesView['generateText']['providers'][number]];
    await declareTuziModels(s, v, 'custom:tuzi', { synthesizeSpeech: 'tts-1' });
    expect(s.configureModelProvider.mock.calls[0]![0].models).toEqual([
      expect.objectContaining({ modelId: 'existing', capability: 'generateText', contextTokens: 65536, maxOutputTokens: 1024 }),
      { modelId: 'tts-1', capability: 'synthesizeSpeech', voices: ['alloy'] },
    ]);
    await expect(declareTuziModels(s, v, 'custom:tuzi', { generateImage: 'existing' })).rejects.toThrow(M.mode.modelConflict);
  });
  it('retries default persistence without repeating successful writes', async () => {
    const s = session(); const saved = new Set<string>();
    s.setModelDefault.mockResolvedValueOnce(null).mockRejectedValueOnce(new Error('offline')).mockResolvedValue(null);
    const selected = { generateText: 'text', synthesizeSpeech: 'tts', generateImage: 'untested' };
    const results = { generateText: { modelId: 'text', state: 'verified' as const }, synthesizeSpeech: { modelId: 'tts', state: 'verified' as const } };
    await expect(saveTuziDefaults(s, 'custom:tuzi', selected, results, saved)).rejects.toThrow('offline');
    await saveTuziDefaults(s, 'custom:tuzi', selected, results, saved);
    expect(s.setModelDefault.mock.calls).toEqual([['generateText', 'custom:tuzi', 'text'], ['synthesizeSpeech', 'custom:tuzi', 'tts'], ['synthesizeSpeech', 'custom:tuzi', 'tts']]);
  });
  it('all shipping locales have translated mode copy and the capability caveat', () => {
    for (const locale of LOCALES) {
      setLocale(locale);
      for (const value of Object.values(M.mode)) expect(typeof value === 'function' ? value(2 as never) : value).toBeTruthy();
      if (locale !== 'en') expect(M.mode.testNote).not.toBe('Testing sends real requests and may incur API charges: a short text reply, one image, or a short speech sample. Only selected capabilities are tested. Continue sets tested models as defaults.');
    }
  });
});

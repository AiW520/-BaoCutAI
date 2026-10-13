import { describe, expect, it } from 'vitest';
import type { SemanticCoverage, SemanticIndexStatus } from '@baocut/protocol';
import { M } from './semantic-copy.ts';
import { coverageLine, entryNote, indexState, reasonText } from './semantic-status.ts';

const text = (patch: Partial<SemanticCoverage> = {}): SemanticCoverage => ({
  channel: 'text',
  eligible: 3,
  indexed: 3,
  pending: 0,
  failed: 0,
  missingInput: 0,
  stale: 0,
  knownScopeComplete: true,
  ...patch,
});

const status = (patch: Partial<SemanticIndexStatus> = {}): SemanticIndexStatus => ({
  model: { bundleId: 'embeddinggemma2-text@litert-lm', label: 'EmbeddingGemma 2 Text 270M', encoderProfileId: 'p', embeddingSpaceId: 's', device: 'cpu' },
  reason: null,
  channels: { text: { enabled: true, available: true }, visual: { enabled: false, available: false }, audio: { enabled: false, available: false } },
  coverage: [text()],
  cacheBytes: 0,
  paused: false,
  jobId: null,
  ...patch,
});

describe('每个入口的那一句', () => {
  it('能用且索引跟上时不画；状态还没取到时也不画', () => {
    expect(entryNote('search', status())).toBeNull();
    expect(entryNote('search', null)).toBeNull();
  });

  it('没装模型：各入口写自己的退路，给去设置；按主题选材整个置灰', () => {
    const none = status({ model: null, reason: 'MODEL_NOT_INSTALLED' });
    expect(entryNote('search', none)).toEqual({ tone: 'info', text: M.entry.search.not, settingsLink: true, blocking: false });
    expect(entryNote('topic', none)).toMatchObject({ text: M.entry.topic.not, blocking: true });
    expect(entryNote('shorts', none)).toMatchObject({ text: M.entry.shorts.not, blocking: true, settingsLink: true });
    // 没给原因时也按没装算
    expect(entryNote('tm', status({ model: null }))?.text).toBe(M.entry.tm.not);
  });

  it('索引在更新或暂停时是不阻塞的提醒；暂停时能去设置恢复', () => {
    expect(entryNote('search', status({ coverage: [text({ indexed: 2, pending: 1 })] }))).toEqual({
      tone: 'notice',
      text: M.note.stale,
      settingsLink: false,
      blocking: false,
    });
    expect(entryNote('retakes', status({ paused: true }))).toMatchObject({ tone: 'notice', text: M.note.paused, settingsLink: true });
  });

  it('结果自己带回的原因优先：写退路与原因；认不出的原因码照写', () => {
    expect(entryNote('tm', status(), 'DISABLED')).toEqual({
      tone: 'info',
      text: M.note.degraded(M.entry.tm.fallback, M.reason.DISABLED),
      settingsLink: true,
      blocking: false,
    });
    expect(entryNote('tm', status(), 'MEMORY_UNAVAILABLE')).toMatchObject({ settingsLink: false });
    expect(entryNote('search', status(), 'INDEX_PARTIAL')).toMatchObject({ tone: 'notice', text: M.note.stale });
    expect(reasonText('SOMETHING_NEW')).toBe(M.unknownReason('SOMETHING_NEW'));
    expect(entryNote('terms', status(), 'SOMETHING_NEW')?.text).toBe(M.note.degraded(M.entry.terms.fallback, M.unknownReason('SOMETHING_NEW')));
  });
});

describe('完整性按通道写', () => {
  it('就绪、部分、没有文稿', () => {
    expect(coverageLine([text()])).toBe(M.coverage.ready);
    expect(coverageLine([text({ missingInput: 1 })])).toBe(M.coverage.readyWith(M.coverage.missing(1)));
    expect(coverageLine([text({ indexed: 1, pending: 1, failed: 1, missingInput: 2 })])).toBe(
      M.coverage.partial(1, 3, [M.coverage.queued(1), M.coverage.failed(1), M.coverage.missing(2)].join(M.coverage.separator)),
    );
    expect(coverageLine([text({ eligible: 0, indexed: 0, missingInput: 4 })])).toBe(M.coverage.noTranscripts);
    expect(coverageLine([text({ eligible: 0, indexed: 0 })])).toBe(M.coverage.empty);
    expect(coverageLine([])).toBe(M.coverage.none);
  });

  it('已建的落后于当前版本时不算就绪', () => {
    expect(coverageLine([text({ stale: 1 })])).toBe(M.coverage.partial(3, 3, M.coverage.outdated(1)));
  });
});

describe('设置页的状态格', () => {
  it('没有模型或索引没开、暂停、更新中、已跟上', () => {
    expect(indexState(status({ model: null }))).toBe('unavailable');
    expect(indexState(status({ reason: 'INDEX_NOT_READY' }))).toBe('unavailable');
    expect(indexState(status({ paused: true }))).toBe('paused');
    expect(indexState(status({ coverage: [text({ pending: 1, indexed: 2 })] }))).toBe('updating');
    expect(indexState(status())).toBe('ready');
  });
});

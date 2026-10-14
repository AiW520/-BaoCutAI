import { describe, expect, it } from 'vitest';
import type { SemanticIndexStatus, SemanticVideoIndex, SpaceEntry } from '@baocut/protocol';
import { M } from './semantic-copy.ts';
import { entryIndexState, entryIndexTitle, entryVideoId } from './space-index.ts';

const S = M.spaceIndex;

const status = (patch: Partial<SemanticIndexStatus> = {}): SemanticIndexStatus => ({
  model: { bundleId: 'embeddinggemma2-multimodal@litert-lm', label: 'EmbeddingGemma 2 740M', encoderProfileId: 'p', embeddingSpaceId: 's', device: 'cpu' },
  reason: null,
  channels: { text: { enabled: true, available: true }, visual: { enabled: true, available: true }, audio: { enabled: false, available: false } },
  coverage: [],
  cacheBytes: 0,
  paused: false,
  pauseReason: null,
  estimates: [],
  jobId: null,
  ...patch,
});

const entry = (patch: Partial<SpaceEntry> = {}): SpaceEntry => ({
  id: 'e1',
  kind: 'video',
  name: 'Interview',
  fileName: 'Interview',
  source: { projectId: 'p1', conversationId: null },
  relPath: 'Interview',
  size: 0,
  lastActivityAt: '2026-10-13T00:00:00Z',
  status: null,
  user: { favorite: false, displayName: null, trashedAt: null },
  ref: { videoId: 'v1' },
  ...patch,
});

const video = (patch: Partial<SemanticVideoIndex> = {}): SemanticVideoIndex => ({ videoId: 'v1', text: 'indexed', visual: 'indexed', excludedBy: null, ...patch });

describe('Space 条目的索引标志', () => {
  it('没装模型、在回收站里、不是视频或成片时不标', () => {
    expect(entryIndexState(entry(), { status: status({ model: null }), video: video() })).toBeNull();
    expect(entryIndexState(entry({ user: { favorite: false, displayName: null, trashedAt: '2026-10-13T00:00:00Z' } }), { status: status(), video: video() })).toBeNull();
    expect(entryIndexState(entry({ kind: 'image', ref: { artifactId: 'a' } }), { status: status(), video: null })).toBeNull();
    expect(entryVideoId(entry({ kind: 'image', ref: { artifactId: 'a' } }))).toBeNull();
  });

  it('两路都建好是已索引；取最需要注意的那一路', () => {
    expect(entryIndexState(entry(), { status: status(), video: video() })).toMatchObject({ key: 'indexed', canReindex: true, canExclude: true, canInclude: false });
    expect(entryIndexState(entry(), { status: status(), video: video({ visual: 'queued' }) })?.key).toBe('queued');
    expect(entryIndexState(entry(), { status: status(), video: video({ text: 'stale', visual: 'failed' }) })?.key).toBe('failed');
    const indexing = entryIndexState(entry(), { status: status(), video: video({ visual: 'indexing', visualFrames: { done: 30, total: 120 } }) })!;
    expect(indexing).toMatchObject({ key: 'indexing', pct: 25 });
    expect(indexing.lines).toEqual([S.line(S.channel.text, S.channelState.indexed), S.line(S.channel.visual, S.withPct(S.channelState.indexing, 25))]);
    expect(entryIndexTitle(indexing)).toBe(S.title(S.withPct(S.state.indexing, 25), indexing.lines.join(S.lineSeparator)));
  });

  it('画面没开时那一路写「没开」；没有文稿又没开画面是没有可索引的内容', () => {
    const off = status({ channels: { text: { enabled: true, available: true }, visual: { enabled: false, available: true }, audio: { enabled: false, available: false } } });
    const state = entryIndexState(entry(), { status: off, video: video({ visual: 'excluded' }) })!;
    expect(state.key).toBe('indexed');
    expect(state.lines[1]).toBe(S.line(S.channel.visual, S.channelState.off));
    expect(entryIndexState(entry(), { status: off, video: video({ text: 'missingInput', visual: 'excluded' }) })).toMatchObject({
      key: 'empty',
      why: S.whyNoTranscriptVisualOff,
      canExclude: true,
      canReindex: false,
    });
  });

  it('成片不需要索引；排除的写明是项目还是单个视频，单个的能在条目上恢复', () => {
    const exported = entry({ kind: 'export', ref: { artifactId: 'a' }, origin: { source: 'exported', videoId: 'v1' } });
    expect(entryIndexState(exported, { status: status(), video: null, sourceName: 'Interview' })).toMatchObject({ key: 'notNeeded', why: S.whyExport('Interview'), canReindex: false });
    expect(entryIndexState(entry(), { status: status(), video: video({ text: 'excluded', visual: 'excluded', excludedBy: 'project' }), projectName: 'Vlog' })).toMatchObject({
      key: 'excluded',
      why: S.whyProject('Vlog'),
      canInclude: false,
      canExclude: false,
    });
    expect(entryIndexState(entry(), { status: status(), video: video({ text: 'excluded', visual: 'excluded', excludedBy: 'video' }) })).toMatchObject({
      key: 'excluded',
      why: S.whyVideo,
      canInclude: true,
    });
  });
});

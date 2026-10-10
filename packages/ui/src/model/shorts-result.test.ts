import { describe, expect, it } from 'vitest';
import type { DocumentRecord, SpaceEntry, TimelineItem } from '@baocut/protocol';
import { createdVideoIds, pagerIndex, readDerivation, shortsBatch } from './shorts-result.ts';

function video(id: string, over: Partial<SpaceEntry> = {}): SpaceEntry {
  return {
    id: `e-${id}`,
    kind: 'video',
    name: id,
    fileName: id,
    source: { projectId: 'p1', conversationId: null },
    relPath: id,
    size: 0,
    lastActivityAt: '2026-10-10T10:00:00.000Z',
    createdAt: '2026-10-10T10:00:00.000Z',
    status: null,
    user: { favorite: false, displayName: null, trashedAt: null },
    ref: { videoId: id },
    ...over,
  };
}
const child = (id: string, createdAt: string, over: Partial<SpaceEntry> = {}) =>
  video(id, { createdAt, origin: { source: 'derived', projectId: 'p1', videoId: 'parent', capability: 'videos-derive' }, ...over });

describe('shortsBatch', () => {
  const key = { parentVideoId: 'parent', conversationId: 'c1', handedAt: '2026-10-10T12:00:00.000Z', created: null };

  it('picks the parent’s children created after the handoff, oldest first', () => {
    const entries = [
      video('parent'),
      child('old', '2026-10-10T11:00:00.000Z'),
      child('b', '2026-10-10T12:05:00.000Z'),
      child('a', '2026-10-10T12:01:00.000Z'),
      video('other', { createdAt: '2026-10-10T12:02:00.000Z', origin: { source: 'derived', videoId: 'elsewhere' } }),
      child('gone', '2026-10-10T12:03:00.000Z', { user: { favorite: false, displayName: null, trashedAt: '2026-10-10T12:10:00.000Z' } }),
    ];
    expect(shortsBatch(entries, key).map((e) => e.name)).toEqual(['a', 'gone', 'b']);
  });

  it('also takes the videos the session created, and prefers origin.conversationId when present', () => {
    const entries = [
      child('earlier', '2026-10-10T11:00:00.000Z'),
      child('tagged', '2026-10-10T12:01:00.000Z', {
        origin: { source: 'derived', videoId: 'parent', conversationId: 'c2' },
      }),
      child('mine', '2026-10-10T09:00:00.000Z', { origin: { source: 'derived', videoId: 'parent', conversationId: 'c1' } }),
    ];
    expect(shortsBatch(entries, { ...key, created: new Set(['earlier']) }).map((e) => e.name)).toEqual(['mine', 'earlier']);
  });

  it('falls back to last activity when the runtime gives no creation time', () => {
    const entries = [child('x', '', { createdAt: null, lastActivityAt: '2026-10-10T12:30:00.000Z' })];
    expect(shortsBatch(entries, key)).toHaveLength(1);
  });
});

describe('createdVideoIds', () => {
  it('collects video-created items and stays null until the timeline loads', () => {
    expect(createdVideoIds(undefined)).toBeNull();
    const items = [
      { kind: 'video-created', videoId: 'v1' },
      { kind: 'user-message' },
    ] as unknown as TimelineItem[];
    expect([...createdVideoIds(items)!]).toEqual(['v1']);
  });
});

describe('readDerivation', () => {
  it('reads the derivation summary of a child', () => {
    const record = {
      id: 'd1',
      kind: 'derivation',
      name: 'Derivation',
      currentRevision: 'r1',
      revisions: {
        r1: {
          revision: 'r1',
          contentHash: '',
          byteLength: 0,
          createdAt: '',
          createdBy: 't',
          summary: { schema: 'baocut.derivation/1', parentVideoId: 'parent', parentRevision: 'v3', range: { start: 12.5, end: 48 }, primaryAssetId: 'a1' },
        },
      },
    } as DocumentRecord;
    expect(readDerivation({ d1: record })).toEqual({ parentVideoId: 'parent', parentRevision: 'v3', range: { start: 12.5, end: 48 }, primaryAssetId: 'a1' });
    expect(readDerivation({})).toBeNull();
    expect(readDerivation(null)).toBeNull();
  });
});

describe('pagerIndex', () => {
  it('follows the open child, then the remembered one, then the first', () => {
    expect(pagerIndex(['a', 'b', 'c'], 'b', 'c')).toBe(1);
    expect(pagerIndex(['a', 'b', 'c'], 'parent', 'c')).toBe(2);
    expect(pagerIndex(['a', 'b', 'c'], 'parent', null)).toBe(0);
    expect(pagerIndex([], 'a', null)).toBe(-1);
  });
});

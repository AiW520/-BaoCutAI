import { describe, expect, it } from 'vitest';
import type { SpaceEntry, SpaceRelatedVideo } from '@baocut/protocol';
import { relatedRows } from './use-related-videos.ts';

const video = (id: string, patch: Partial<SpaceEntry> = {}): SpaceEntry => ({
  id,
  kind: 'video',
  name: id,
  fileName: id,
  source: { projectId: 'p1', conversationId: null },
  relPath: id,
  size: 0,
  lastActivityAt: '2026-10-01T00:00:00.000Z',
  status: null,
  ref: { videoId: `vid-${id}` },
  user: { favorite: false, displayName: null, trashedAt: null },
  ...patch,
});

const related = (entryId: string): SpaceRelatedVideo => ({
  entryId,
  videoId: `vid-${entryId}`,
  name: entryId,
  passage: { clock: 'source', start: 3, end: 8, text: 'battery life' },
  sharedName: null,
});

describe('讲相近内容的视频', () => {
  it('按 Runtime 给的次序对回 Space 条目；列表里已经没有或进了回收站的不列，依据与原因原样带上', () => {
    const entries = [video('a'), video('b', { user: { favorite: false, displayName: null, trashedAt: '2026-10-02T00:00:00.000Z' } }), video('c')];
    const out = relatedRows({ basis: 'semantic', reason: 'INDEX_PARTIAL', videos: [related('c'), related('b'), related('gone'), related('a')] }, entries);
    expect(out.basis).toBe('semantic');
    expect(out.reason).toBe('INDEX_PARTIAL');
    expect(out.rows.map((r) => r.entry.id)).toEqual(['c', 'a']);
    expect(out.rows[0]!.video.passage?.text).toBe('battery life');
  });
});

import { useEffect, useMemo, useState } from 'react';
import type { Id, SpaceEntry, SpaceRelatedVideo, SpaceRelatedVideosResult } from '@baocut/protocol';
import { useRuntime } from '../../runtime/context.tsx';
import { useConnection } from '../../state/connection-store.ts';

/** 查看框里「讲相近内容的视频」的一行：Runtime 给的那部视频与 Space 里对应的条目。 */
export interface RelatedRow {
  video: SpaceRelatedVideo;
  entry: SpaceEntry;
}

export interface RelatedVideos {
  basis: SpaceRelatedVideosResult['basis'];
  reason: SpaceRelatedVideosResult['reason'];
  rows: RelatedRow[];
}

/** 对回 Space 里的条目；列表里已经没有的（刚删掉、还没刷新）不列，免得点了换不过去。 */
export function relatedRows(result: SpaceRelatedVideosResult, entries: readonly SpaceEntry[]): RelatedVideos {
  const byId = new Map(entries.map((e) => [e.id, e]));
  const rows = result.videos.flatMap((video) => {
    const entry = byId.get(video.entryId);
    return entry && entry.user.trashedAt === null ? [{ video, entry }] : [];
  });
  return { basis: result.basis, reason: result.reason, rows };
}

/**
 * 查看框打开一部视频时才问 Runtime（创作辅助集成设计 §2.4「只在用户打开时计算」）：换了条目或关掉后迟到的结果丢掉。
 * 没连上、不是视频、出错时没有这一块。
 */
export function useRelatedVideos(entry: SpaceEntry | null, entries: readonly SpaceEntry[]): RelatedVideos | null {
  const runtime = useRuntime();
  const connected = useConnection((s) => s.state.status === 'connected');
  const id: Id | null = entry?.kind === 'video' && entry.user.trashedAt === null ? entry.id : null;
  const [state, setState] = useState<{ id: Id; result: SpaceRelatedVideosResult } | null>(null);
  useEffect(() => {
    if (!id || !connected) return;
    let live = true;
    runtime.client.request('space.relatedVideos', { entryId: id }).then(
      (result) => {
        if (live) setState({ id, result });
      },
      () => {
        if (live) setState(null);
      },
    );
    return () => {
      live = false;
    };
  }, [runtime, id, connected]);
  return useMemo(() => (state && state.id === id ? relatedRows(state.result, entries) : null), [state, id, entries]);
}

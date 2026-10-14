import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Id, SemanticIndexStatus, SemanticVideoIndex, SpaceEntry } from '@baocut/protocol';
import { entryIndexState, entryVideoId, indexUsable, type EntryIndexState } from '../model/space-index.ts';
import { useRuntime } from '../runtime/context.tsx';
import { useDirectory } from './directory-store.ts';
import { useSemanticStatus } from './semantic-store.ts';

/**
 * Space 条目的索引标志要的按视频状态（`space.indexStatus` 带 `videoIds`，检索规格 §13.2）。只取列出来的视频（每次至多 200 部、
 * 最多前 `MAX_VIDEOS` 部）；有视频排队或在建、索引没停着时每隔几秒再取。总体状态（装没装模型、画面开没开）与设置页共用一份。
 * Web 同样能取（白名单含 `space.indexStatus`）。
 */

const BATCH = 200;
const MAX_VIDEOS = 1000;
const POLL_MS = 4_000;

export interface EntryIndex {
  /** 这一条的标志；不标时 null。 */
  of: (entry: SpaceEntry) => EntryIndexState | null;
  /** 状态变了就变（列表缓存的依赖键）。 */
  key: string;
  /** 重新取（改了排除、点了重新索引之后）。 */
  refresh: () => void;
  /** 总体状态（画面开没开、停没停着）。 */
  status: SemanticIndexStatus | null;
}

/** `rows` 是列出来的条目，`all` 是全部（成片找导出它的视频的名字），`also` 是查看框里开着的那一条（可能不在列表里）。 */
export function useEntryIndex(rows: readonly SpaceEntry[], all: readonly SpaceEntry[], also: SpaceEntry | null = null): EntryIndex {
  const runtime = useRuntime();
  const { status, refresh: refreshStatus } = useSemanticStatus();
  const projects = useDirectory((s) => s.projects);
  const usable = indexUsable(status);
  const ids = useMemo(() => {
    const out = new Set<Id>();
    const alsoId = also && !also.user.trashedAt ? entryVideoId(also) : null;
    if (alsoId) out.add(alsoId);
    for (const row of rows) {
      const id = row.user.trashedAt ? null : entryVideoId(row);
      if (id) out.add(id);
      if (out.size >= MAX_VIDEOS) break;
    }
    return [...out].sort();
  }, [rows, also]);
  const idsKey = ids.join(',');
  const [videos, setVideos] = useState<ReadonlyMap<Id, SemanticVideoIndex>>(new Map());
  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => {
    void refreshStatus();
    setTick((n) => n + 1);
  }, [refreshStatus]);

  useEffect(() => {
    if (!usable || !idsKey) return;
    let live = true;
    const list = idsKey.split(',');
    const batches: Id[][] = [];
    for (let i = 0; i < list.length; i += BATCH) batches.push(list.slice(i, i + BATCH));
    void Promise.all(batches.map((videoIds) => runtime.client.request('space.indexStatus', { videoIds }).then((s) => s.videos ?? [])))
      .then((rows) => {
        if (live) setVideos(new Map(rows.flat().map((v) => [v.videoId, v])));
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [runtime, usable, idsKey, tick, status?.channels.visual.enabled]);

  const moving = !status?.paused && [...videos.values()].some((v) => [v.text, v.visual].some((s) => s === 'queued' || s === 'indexing'));
  useEffect(() => {
    if (!usable || !moving) return;
    const timer = setInterval(() => setTick((n) => n + 1), POLL_MS);
    return () => clearInterval(timer);
  }, [usable, moving]);

  const names = useMemo(() => {
    const byVideo = new Map<Id, string>();
    for (const entry of all) {
      const id = entryVideoId(entry);
      if (id) byVideo.set(id, entry.name);
    }
    return byVideo;
  }, [all]);
  const projectNames = useMemo(() => new Map(projects.map((p) => [p.id, p.name])), [projects]);

  const of = useCallback(
    (entry: SpaceEntry) => {
      const id = entryVideoId(entry);
      const projectId = entry.source.projectId ?? entry.origin?.projectId ?? null;
      return entryIndexState(entry, {
        status,
        video: id ? (videos.get(id) ?? null) : null,
        projectName: projectId ? (projectNames.get(projectId) ?? null) : null,
        sourceName: entry.origin?.videoId ? (names.get(entry.origin.videoId) ?? null) : null,
      });
    },
    [status, videos, projectNames, names],
  );
  const key = useMemo(
    () =>
      usable
        ? [...videos.values()]
            .map((v) => `${v.videoId}:${v.text}:${v.visual}:${v.visualFrames?.done ?? ''}:${v.excludedBy ?? ''}`)
            .join('|') + `#${status?.channels.visual.enabled ? 1 : 0}`
        : '',
    [usable, videos, status?.channels.visual.enabled],
  );
  return { of, key, refresh, status };
}

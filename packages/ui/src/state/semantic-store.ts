import { useCallback, useEffect } from 'react';
import { create } from 'zustand';
import type { SemanticFolderStatus, SemanticIndexStatus } from '@baocut/protocol';
import { useRuntime } from '../runtime/context.tsx';
import { indexUpdating, visualUpdating } from '../model/semantic-status.ts';
import { useModels } from './models-store.ts';

/**
 * 本机语义索引的总体状态（`space.indexStatus`，创作辅助集成设计 §2.11）：设置 › 语义索引与各入口的那一句共用一份。
 * 用到时取（离上次超过几秒才再取）；装上或删掉文字搜索模型包时重取；`poll` 的地方在索引没跟上时每隔几秒再取。
 * Web 同样能取（白名单含 `space.indexStatus`）。
 */
interface SemanticState {
  status: SemanticIndexStatus | null;
  error: string | null;
  at: number;
}

export const useSemanticState = create<SemanticState>()(() => ({ status: null, error: null, at: 0 }));

const FRESH_MS = 5_000;
const POLL_MS = 4_000;
let inflight: Promise<void> | null = null;

function load(client: ReturnType<typeof useRuntime>['client']): Promise<void> {
  inflight ??= client
    .request('space.indexStatus', {})
    .then(
      (status) => useSemanticState.setState({ status, error: null, at: Date.now() }),
      (error: unknown) => useSemanticState.setState({ error: error instanceof Error ? error.message : String(error), at: Date.now() }),
    )
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** 文字搜索模型包装没装好的指纹：变了就重取状态。 */
function embedKey(bundles: ReturnType<typeof useModels.getState>['bundles']): string {
  return bundles
    .filter((b) => b.capability === 'embed')
    .map((b) => `${b.bundleId}:${b.state}`)
    .join(',');
}

export function useSemanticStatus(options: { poll?: boolean } = {}): SemanticState & { refresh: () => Promise<void> } {
  const runtime = useRuntime();
  const state = useSemanticState();
  const models = useModels((s) => embedKey(s.bundles));
  const refresh = useCallback(() => load(runtime.client), [runtime]);
  useEffect(() => {
    if (Date.now() - useSemanticState.getState().at > FRESH_MS) void refresh();
  }, [refresh]);
  useEffect(() => {
    if (useSemanticState.getState().at > 0) void refresh();
  }, [models, refresh]);
  // 索引正在换位置时也接着取（移动进度与移完之后的位置）。
  const updating =
    ((indexUpdating(state.status) || visualUpdating(state.status)) && !state.status?.paused) || !!state.status?.indexDir?.moving;
  useEffect(() => {
    if (!options.poll || !updating) return;
    const timer = setInterval(() => void refresh(), POLL_MS);
    return () => clearInterval(timer);
  }, [options.poll, updating, refresh]);
  return { ...state, refresh };
}

const NO_FOLDERS: readonly SemanticFolderStatus[] = [];

/**
 * 索引文件夹（检索规格 §9.1）：Space 给它们的条目写来源、拼路径、写只读说明。`needed`（有索引文件夹里的条目）时才去取，
 * 状态还没取到或取不到时是空的。
 */
export function useIndexFolders(needed: boolean): readonly SemanticFolderStatus[] {
  const runtime = useRuntime();
  const folders = useSemanticState((s) => s.status?.folders ?? NO_FOLDERS);
  const tried = useSemanticState((s) => s.at > 0);
  useEffect(() => {
    if (needed && !tried) void load(runtime.client);
  }, [needed, tried, runtime]);
  return folders;
}

/** 索引文件夹的名字（设置里那一行的名字）；状态还没取到、取不到或文件夹已移除时 null。 */
export function useIndexFolderName(folderId: string | null | undefined): string | null {
  return useIndexFolders(!!folderId).find((f) => f.id === folderId)?.name ?? null;
}

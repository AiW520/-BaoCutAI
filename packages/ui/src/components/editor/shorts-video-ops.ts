import { newId, type FileTarget, type Id } from '@baocut/protocol';
import { durationSeconds, rootSequence } from '../../model/editor.ts';
import { readDerivation, type ShortsDerivation } from '../../model/shorts-result.ts';
import type { RuntimeSession } from '../../runtime/session.ts';
import { sameTarget } from '../../runtime/video-controller.ts';
import { useVideo } from '../../state/video-store.ts';

/**
 * 结果页对还没在编辑器里开着的子视频做的两件事：读它的派生来源与眼下的时长、改名。都在后台打开视频、做完再关掉
 * （同 components/thread/change-undo.ts `undoInBackground`）；编辑器此刻占着那部视频时不替它关。
 *
 * 未验证：后台打开期间编辑器恰好开始打开同一部视频时，这里的关闭可能先落到 Runtime，编辑器会收到 `video.closed` 再自己重新打开，
 * 画面闪一下，不丢数据（同 change-undo.ts 的说明）。
 */

function editorHolds(target: FileTarget, videoId: Id): boolean {
  const video = useVideo.getState().video;
  return video !== null && (video.videoId === videoId || sameTarget(video.target, target));
}

async function withVideo<T>(runtime: RuntimeSession, target: FileTarget, run: (videoId: Id, opened: Awaited<ReturnType<typeof open>>) => Promise<T>) {
  const opened = await open(runtime, target);
  try {
    return await run(opened.ref.videoId, opened);
  } finally {
    if (!editorHolds(target, opened.ref.videoId)) await runtime.client.request('videos.close', { videoId: opened.ref.videoId }).catch(() => {});
  }
}

const open = (runtime: RuntimeSession, target: FileTarget) => runtime.client.request('videos.open', target);

/** 子视频卡上的「起止 · 时长」：派生来源里的区间，加上它剪辑后眼下的时长（秒）。 */
export interface ShortFacts {
  derivation: ShortsDerivation | null;
  seconds: number | null;
}

const facts = new Map<string, Promise<ShortFacts>>();

/**
 * 读一支子视频的派生来源与眼下的时长。按 `key`（条目 id 加最近活动时间）缓存：子视频改过之后最近活动变了，再读一次。
 */
export function peekShort(runtime: RuntimeSession, target: FileTarget, key: string): Promise<ShortFacts> {
  const cached = facts.get(key);
  if (cached) return cached;
  const pending = withVideo(runtime, target, async (_videoId, opened) => {
    const video = opened.snapshot.video;
    const root = rootSequence(video);
    return { derivation: readDerivation(video.documents), seconds: root ? durationSeconds(root) : null };
  }).catch((error: unknown) => {
    facts.delete(key);
    throw error;
  });
  facts.set(key, pending);
  return pending;
}

/** 改一支子视频的名字（`renameVideo`）：编辑器开着它就走编辑器的命令队列，没开着就在后台打开、改、关。 */
export async function renameShort(runtime: RuntimeSession, target: FileTarget, videoId: Id, name: string): Promise<void> {
  const operations = [{ type: 'renameVideo' as const, name }];
  if (useVideo.getState().video?.videoId === videoId) {
    await runtime.videos.apply(operations);
    return;
  }
  await withVideo(runtime, target, async (id, opened) => {
    await runtime.client.request('edits.apply', {
      videoId: id,
      commandId: newId('cmd'),
      expectedRevision: opened.snapshot.video.revision,
      operations,
    });
  });
}

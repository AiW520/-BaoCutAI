import type { ReactNode } from 'react';
import { ActionButton, Text, ToastQueue } from '@react-spectrum/s2';
import type { SpaceEntry } from '@baocut/protocol';
import { hitTarget } from '../../model/space-search.ts';
import { useEditor } from '../../state/editor-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { useSpace } from '../../state/space-store.ts';
import { WRITING_CITES_COPY as WC } from '../editor/writing-cites-copy.ts';
import { SPACE_COPY } from '../space/space-copy.ts';

/*
 * 回答里的「视频某一刻」（产品设计 §3.2.2；创作辅助集成设计 §2.9；原型 space-search.jsx `Answer` 的出处时间码）：地址是 Runtime
 * 在检索工具结果里给的 `/videos/<videoId>?t=<秒>`，渲染成与写作结果出处同样的时间码，点了打开那部视频、播放头放到那一秒
 * （同 Space 搜索打开命中）。视频不在 Space 里、在回收站里或不在项目与会话目录里时只显示文字；点的时候才发现打不开的说一句，不跳。
 */

/** 打开视频并把播放头放到那一秒；打不开时 false。 */
export function openVideoAt(videoId: string, seconds: number, entries: readonly SpaceEntry[] = useSpace.getState().entries): boolean {
  const target = hitTarget({ entryId: null, videoId }, entries);
  if (!target) {
    ToastQueue.neutral(SPACE_COPY.hitUnopenable, { timeout: 5000 });
    return false;
  }
  const editor = useEditor.getState();
  editor.attach(videoId);
  editor.setPlayhead(seconds);
  useShell.getState().openVideo(target);
  return true;
}

/**
 * Space 已经读到、却找不到能打开的这部视频时只显示文字（同认不出的设置链接）；还没读到时先画成时间码，点的时候再找。
 * `onOpen` 在打开之后调用（例如关掉盖在编辑器上的对话框）。
 */
export function VideoTimeLink({ videoId, seconds, onOpen, children }: { videoId: string; seconds: number; onOpen?: () => void; children?: ReactNode }) {
  const openable = useSpace((s) => !s.ready || hitTarget({ entryId: null, videoId }, s.entries) !== null);
  if (!openable) return <span>{children}</span>;
  const label = typeof children === 'string' ? children : Array.isArray(children) ? children.filter((c) => typeof c === 'string').join('') : '';
  return (
    <ActionButton isQuiet size="XS" UNSAFE_className="bc-amd-time" aria-label={label ? WC.citeAria(label) : undefined} onPress={() => openVideoAt(videoId, seconds) && onOpen?.()}>
      <Text>{children}</Text>
    </ActionButton>
  );
}

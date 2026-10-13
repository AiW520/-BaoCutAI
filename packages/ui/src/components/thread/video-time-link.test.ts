// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastQueue } from '@react-spectrum/s2';
import type { SpaceEntry } from '@baocut/protocol';
import { useEditor } from '../../state/editor-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { openVideoAt } from './video-time-link.tsx';

const video = (id: string, videoId: string, trashedAt: string | null = null): SpaceEntry => ({
  id,
  kind: 'video',
  name: id,
  fileName: id,
  source: { projectId: 'p1', conversationId: null },
  relPath: id,
  size: 0,
  lastActivityAt: '2026-10-01T00:00:00.000Z',
  status: null,
  ref: { videoId },
  user: { favorite: false, displayName: null, trashedAt },
});

afterEach(() => vi.restoreAllMocks());

describe('回答里的视频某一刻', () => {
  it('打开那部视频、播放头放到那一秒；不在 Space 里或在回收站里的说一句、不跳', () => {
    const entries = [video('e1', 'vid1'), video('e2', 'vid2', '2026-10-01T00:00:00.000Z')];
    const openVideo = vi.spyOn(useShell.getState(), 'openVideo').mockImplementation(() => {});
    const toast = vi.spyOn(ToastQueue, 'neutral').mockImplementation(() => () => {});
    expect(openVideoAt('vid1', 725.4, entries)).toBe(true);
    expect(useEditor.getState().playhead).toBe(725.4);
    expect(openVideo).toHaveBeenCalledWith({ projectId: 'p1', path: 'e1' });
    expect(toast).not.toHaveBeenCalled();
    for (const id of ['vid2', 'gone']) expect(openVideoAt(id, 3, entries)).toBe(false);
    expect(openVideo).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledTimes(2);
  });
});

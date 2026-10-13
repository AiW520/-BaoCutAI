import { describe, expect, it } from 'vitest';
import { parseVideoTimeHref, videoTimeHref } from './video-link.ts';

describe('视频某一刻的链接', () => {
  it('写出来的地址能原样解析回来，秒取到毫秒、负数按 0', () => {
    expect(videoTimeHref('video_d58d28d90b2f43eb', 725.43219)).toBe('/videos/video_d58d28d90b2f43eb?t=725.432');
    expect(parseVideoTimeHref(videoTimeHref('video_1', 12))).toEqual({ videoId: 'video_1', seconds: 12 });
    expect(videoTimeHref('v', -3)).toBe('/videos/v?t=0');
  });

  it('别的形状不认', () => {
    for (const href of ['/videos/v', '/videos/v?t=', '/videos/v?t=-1', '/videos/v?t=1&x=2', '/videos/?t=1', '/videos/a/b?t=1', '/settings/models', 'https://x/videos/v?t=1', '/videos/%E0?t=1']) {
      expect(parseVideoTimeHref(href)).toBeNull();
    }
  });
});

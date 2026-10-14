import { describe, expect, it } from 'vitest';
import { compactBriefLinks, expandBriefLinks, parseVideoTimeHref, videoTimeHref } from './video-link.ts';

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

  it('速览里指向自己的时间链接收成 ?t=，换回时用当前的视频 ID；别的链接原样', () => {
    const written = '- 开场 [0:26](/videos/vid_1?t=26)，见 [另一期](/videos/vid_2?t=3.5)、[官网](https://x.example/a?t=1) 与 [带标题](/videos/vid_1?t=4 "t")';
    const stored = compactBriefLinks(written, 'vid_1');
    expect(stored).toBe('- 开场 [0:26](?t=26)，见 [另一期](/videos/vid_2?t=3.5)、[官网](https://x.example/a?t=1) 与 [带标题](/videos/vid_1?t=4 "t")');
    expect(expandBriefLinks(stored, 'vid_9')).toBe(written.replace('/videos/vid_1?t=26', '/videos/vid_9?t=26'));
    expect(expandBriefLinks('[x](?t=-1) [y](?t=) [z](?x=1&t=2)', 'v')).toBe('[x](?t=-1) [y](?t=) [z](?x=1&t=2)');
  });
});

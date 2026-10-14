import { describe, expect, it } from 'vitest';
import type { Track, VideoItem, VideoSnapshot } from '@baocut/protocol';
import type { ReadContentResult } from './content-extract.ts';
import { momentPlan } from './hit-moments.ts';

const track = (id: string, order: number, visible = true): Track => ({
  id,
  order,
  kind: 'visual',
  locked: false,
  visible,
  muted: false,
  solo: { enabled: false, group: 'visual' },
});

const ms = (seconds: number) => ({ ticks: String(Math.round(seconds * 1000)), timescale: 1000 });

/** 30fps：`fromFrame`、`durationFrames` 按秒给。 */
function item(id: string, trackId: string, assetId: string, from: number, length: number, sourceIn: number, speed = 1): VideoItem {
  return {
    id,
    trackId,
    paintOrder: 0,
    type: 'video',
    enabled: true,
    locked: false,
    followPolicy: { kind: 'sequence-fixed' },
    span: { fromFrame: from * 30, durationFrames: length * 30 },
    place: {},
    assetRef: { id: assetId, revision: '1' },
    timeMap: { kind: 'linear', sourceIn: ms(sourceIn), rate: { num: speed, den: 1 } },
    embeddedAudio: { enabled: true, volume: 1, fadeIn: ms(0), fadeOut: ms(0) },
  } as VideoItem;
}

const asset = (video: boolean, duration = 60) => ({
  id: 'x',
  currentRevision: '1',
  revisions: {
    '1': {
      revision: '1',
      contentHash: 'h',
      mediaType: 'video/mp4',
      duration: ms(duration),
      ...(video ? { video: { width: 1920, height: 1080 } } : {}),
    },
  },
});

function content(
  items: VideoItem[],
  tracks: Track[] = [track('trk_v1', 0), track('trk_v2', 1)],
): Pick<ReadContentResult, 'snapshot' | 'documents'> {
  const snapshot = {
    rootSequenceId: 'seq',
    sequences: { seq: { id: 'seq', fps: { num: 30, den: 1 }, tracks, items } },
    assets: { clip: asset(true), broll: asset(true, 20), voice: asset(false) },
  } as unknown as VideoSnapshot;
  return {
    snapshot,
    documents: [
      { documentId: 'doc_speech', kind: 'speech', sourceAssetId: 'clip' },
      { documentId: 'doc_tr', kind: 'translation', sourceDocumentId: 'doc_speech' },
      { documentId: 'doc_voice', kind: 'speech', sourceAssetId: 'voice' },
    ],
  };
}

describe('检索命中的那一刻', () => {
  it('时间线秒：那一秒看得见的片段，前后各 2 秒、不超出片段，换成源时间', () => {
    // 时间线 0–10s 播素材 30–40s，10–20s 播素材 100–110s。
    const c = content([item('a', 'trk_v1', 'clip', 0, 10, 30), item('b', 'trk_v1', 'clip', 10, 10, 100)]);
    expect(momentPlan(c, { clock: 'sequence', startSec: 5, endSec: 7 })).toEqual({
      asset: { id: 'clip', revision: '1' },
      at: 35,
      frame: { contentHash: 'h', mediaType: 'video/mp4', durationSec: 60 },
      clip: { assetId: 'clip', revision: '1', from: 33, to: 39, hitFrom: 35, hitTo: 37 },
    });
    // 靠近剪口：不跨进下一个片段，命中本身也截在片段里。
    expect(momentPlan(c, { clock: 'sequence', startSec: 9, endSec: 11 })?.clip).toEqual({
      assetId: 'clip',
      revision: '1',
      from: 37,
      to: 40,
      hitFrom: 39,
      hitTo: 40,
    });
    expect(momentPlan(c, { clock: 'sequence', startSec: 0.5, endSec: 1 })?.clip).toMatchObject({ from: 30, to: 33 });
    // 时间线上没有片段的地方。
    expect(momentPlan(c, { clock: 'sequence', startSec: 25, endSec: 26 })).toBeNull();
  });

  it('叠在上面的可见轨道优先；隐藏的轨道、停用的片段、没有画面的素材不算；变速按倍率换算', () => {
    const over = item('o', 'trk_v2', 'broll', 4, 4, 2, 2);
    expect(
      momentPlan(content([item('a', 'trk_v1', 'clip', 0, 10, 30), over]), { clock: 'sequence', startSec: 5, endSec: 6 })?.clip,
    ).toEqual({
      assetId: 'broll',
      revision: '1',
      from: 2,
      to: 10,
      hitFrom: 4,
      hitTo: 6,
    });
    const hidden = content([item('a', 'trk_v1', 'clip', 0, 10, 30), over], [track('trk_v1', 0), track('trk_v2', 1, false)]);
    expect(momentPlan(hidden, { clock: 'sequence', startSec: 5, endSec: 6 })?.asset.id).toBe('clip');
    const disabled = content([item('a', 'trk_v1', 'clip', 0, 10, 30), { ...over, enabled: false }]);
    expect(momentPlan(disabled, { clock: 'sequence', startSec: 5, endSec: 6 })?.asset.id).toBe('clip');
    expect(momentPlan(content([item('v', 'trk_v1', 'voice', 0, 10, 0)]), { clock: 'sequence', startSec: 1, endSec: 2 })).toBeNull();
  });

  it('定格的片段只有画面，没有可播的一段', () => {
    const still = { ...item('s', 'trk_v1', 'clip', 0, 5, 0), timeMap: { kind: 'hold', sourceAt: ms(12.5) } } as VideoItem;
    expect(momentPlan(content([still]), { clock: 'sequence', startSec: 1, endSec: 2 })).toMatchObject({ at: 12.5, clip: null });
  });

  it('源时间：文稿对应的素材（译文看它译自的文稿），不超出素材的时长；没有画面或找不到文稿时没有', () => {
    const c = content([]);
    expect(momentPlan(c, { clock: 'source', startSec: 1, endSec: 59, documentId: 'doc_speech' })?.clip).toEqual({
      assetId: 'clip',
      revision: '1',
      from: 0,
      to: 60,
      hitFrom: 1,
      hitTo: 59,
    });
    expect(momentPlan(c, { clock: 'source', startSec: 10, endSec: 12, documentId: 'doc_tr' })?.asset).toEqual({
      id: 'clip',
      revision: '1',
    });
    expect(momentPlan(c, { clock: 'source', startSec: 10, endSec: 12, documentId: 'doc_voice' })).toBeNull();
    expect(momentPlan(c, { clock: 'source', startSec: 10, endSec: 12, documentId: 'doc_none' })).toBeNull();
    expect(momentPlan(c, { clock: 'source', startSec: 10, endSec: 12 })).toBeNull();
  });
});

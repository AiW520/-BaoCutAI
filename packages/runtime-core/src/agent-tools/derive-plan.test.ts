import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { BaoCutClient } from '@baocut/client';
import {
  newId,
  type AudioItem,
  type DocumentRecord,
  type EditOperation,
  type Project,
  type SequenceItem,
  type Track,
  type VideoItem,
  type VideoSnapshot,
} from '@baocut/protocol';
import { resolveRuntimeHome } from '@baocut/runtime-storage';
import { editorWasmAvailable, sha256Hex } from '@baocut/jobs';
import { startRuntime, type RunningRuntime } from '../runtime.ts';
import { resolveEngineHostCommand } from '../videos/engine-host.ts';
import {
  DeriveError,
  alignRange,
  clockLabel,
  cuesInRange,
  derivationKey,
  derivationNeeds,
  planDerivation,
  planDerivationTrim,
  timelineWords,
  type DeriveSettings,
} from './derive-plan.ts';

const track = (id: string, order: number, kind: Track['kind'], extra: Partial<Track> = {}): Track => ({
  id,
  order,
  kind,
  locked: false,
  visible: true,
  muted: false,
  solo: { enabled: false, group: kind === 'audio' ? 'audio' : 'visual' },
  ...extra,
});
const base = { enabled: true, locked: false, followPolicy: { kind: 'sequence-fixed' as const } };
const revision = { revision: '1', contentHash: 'h', byteLength: 10, provenance: { origin: 'import', source: 'local' } };

function videoItem(id: string, fromFrame: number, durationFrames: number, sourceSeconds: number, speed = 1, paintOrder = 0): VideoItem {
  return {
    ...base,
    id,
    trackId: 'trk_v1',
    paintOrder,
    type: 'video',
    span: { fromFrame, durationFrames },
    place: {},
    assetRef: { id: 'asset_v', revision: '1' },
    timeMap: { kind: 'linear', sourceIn: { ticks: String(sourceSeconds * 1000), timescale: 1000 }, rate: { num: speed, den: 1 } },
    embeddedAudio: { enabled: true, volume: 1, fadeIn: { ticks: '1', timescale: 2 }, fadeOut: { ticks: '1', timescale: 2 } },
  };
}

/** 1s + 1/60s 起播 4 秒的配乐。 */
const audio = {
  ...base,
  id: 'item_music',
  trackId: 'trk_a1',
  paintOrder: 0,
  type: 'audio',
  assetRef: { id: 'asset_a', revision: '1' },
  fromFrame: 30,
  subframeOffset: { ticks: '800', timescale: 48000 },
  playDuration: { ticks: String(4 * 48000), timescale: 48000 },
  timeMap: { kind: 'linear', sourceIn: { ticks: '0', timescale: 48000 }, rate: { num: 1, den: 1 } },
  mix: { volume: 1, fadeIn: { ticks: '24000', timescale: 48000 }, fadeOut: { ticks: '24000', timescale: 48000 } },
} as unknown as AudioItem;

const speechBody = {
  schema: 'baocut.speech/1',
  clock: 'source-asset',
  timescale: 1_000_000,
  speakers: [],
  words: [
    { id: 'w1', start: 500_000, end: 1_000_000, text: 'a' },
    { id: 'w2', start: 1_600_000, end: 2_000_000, text: 'b' },
    { id: 'w3', start: 3_500_000, end: 4_000_000, text: 'c' },
    { id: 'w4', start: 11_000_000, end: 11_500_000, text: 'd' },
  ],
  sentences: [{ id: 's1' }],
  chapters: [{ id: 'c1', title: 'one', start: 0, end: 1_000_000 }],
};

const translationBody = {
  schema: 'baocut.translation/2',
  language: 'en',
  sourceBasis: { speechRef: { id: 'doc_speech', revision: '1' }, sequenceId: 'seq_1', scopeLineage: [], editViewHash: 'old' },
  units: [{ id: 'u1', alignment: { sourceWordIds: ['w2'] } }],
};

/** 父视频已有的剪口：源时钟 3s–10s（item_a 播到 3s，item_b 从 10s 起播，正是剪掉之后的样子）。 */
const parentCutSet = {
  schema: 'baocut.cut-set/1',
  timescale: 1000,
  clock: 'source-asset',
  scopeItemIds: ['item_a', 'item_b'],
  cuts: [{ id: 'cut_parent', t0: 3000, t1: 10000 }],
};

type Seq = VideoSnapshot['sequences'][string];

const doc = (id: string, extra: Partial<DocumentRecord>): DocumentRecord =>
  ({ id, name: id, currentRevision: '1', revisions: {}, ...extra }) as DocumentRecord;

function video(items: SequenceItem[], extra: Partial<Seq> = {}, withCutSet = false): VideoSnapshot {
  const assetRevision = (mediaType: string) => ({
    ...revision,
    mediaType,
    storage: { mode: 'linked' as const, locator: { path: '/media/x' }, frozen: false },
    duration: { ticks: '60', timescale: 1 },
  });
  return {
    format: 'baocut.video',
    schemaVersion: 3,
    timeContractVersion: 1,
    id: 'video_parent',
    name: 'Parent',
    revision: '7',
    rootSequenceId: 'seq_1',
    sequences: {
      seq_1: {
        id: 'seq_1',
        revision: '7',
        name: 'Main',
        fps: { num: 30, den: 1 },
        canvas: { width: 1920, height: 1080, workingSpace: 'srgb', background: '#112233' },
        durationPolicy: { kind: 'derived' },
        tracks: [track('trk_v1', 0, 'visual'), track('trk_v2', 1, 'visual'), track('trk_a1', 2, 'audio'), track('trk_s1', 3, 'subtitle')],
        items,
        animationBindings: [],
        transitions: [
          { id: 'tr_1', leftItemId: 'item_a', rightItemId: 'item_b', kind: 'fade', durationFrames: 10, easing: 'linear', placement: 'center' },
        ],
        markers: [
          { id: 'm1', frame: 20, label: 'Intro', kind: 'chapter' },
          { id: 'm2', frame: 120, label: 'Body', kind: 'chapter', summary: 'main part' },
          { id: 'm3', frame: 70, label: 'note', kind: 'note' },
        ],
        ducking: [],
        ...extra,
      } as unknown as Seq,
    },
    assets: {
      asset_v: { id: 'asset_v', kind: 'video', name: 'talk.mp4', currentRevision: '1', revisions: { '1': assetRevision('video/mp4') } },
      asset_a: { id: 'asset_a', kind: 'audio', name: 'music.mp3', currentRevision: '1', revisions: { '1': assetRevision('audio/mpeg') } },
    } as unknown as VideoSnapshot['assets'],
    documents: {
      doc_speech: doc('doc_speech', { kind: 'speech', name: 'Transcript', language: 'en', sourceAssetId: 'asset_v' }),
      doc_tr: doc('doc_tr', { kind: 'translation', name: 'Translation', language: 'zh', sourceDocumentId: 'doc_speech' }),
      ...(withCutSet ? { doc_cuts: doc('doc_cuts', { kind: 'cut-set', name: 'Cuts', sourceAssetId: 'asset_v' }) } : {}),
    },
    fonts: {},
    localizationSets: {},
    canvasVariants: {},
    syncGroups: {},
    protections: {},
    checkpoints: {},
    links: [],
  };
}

const settings: DeriveSettings = { width: 1080, height: 1920, fit: 'cover', crop: null, captions: true, translations: true, chapters: true };
/** item_a：0–3s 播源 0–3s；item_b：3–6s 以两倍速播源 10–16s；配乐另起一轨。 */
const items: SequenceItem[] = [videoItem('item_a', 0, 90, 0), videoItem('item_b', 90, 90, 10, 2), audio];
const childTracks = [track('trk_c1', 0, 'visual'), track('trk_c2', 1, 'audio')];

function plan(snapshot: VideoSnapshot, start: number, end: number, s: DeriveSettings = settings, docs: Record<string, unknown> = {}) {
  const range = alignRange(snapshot.sequences.seq_1!, start, end);
  return planDerivation({
    snapshot,
    range,
    settings: s,
    key: 'k',
    target: { sequenceId: 'seq_child', tracks: childTracks, background: '#000000' },
    files: new Map([
      ['asset_v@1', '/media/talk.mp4'],
      ['asset_a@1', '/media/music.mp3'],
    ]),
    documents: new Map<string, unknown>([
      ['doc_speech', speechBody],
      ['doc_tr', translationBody],
      ['doc_cuts', parentCutSet],
      ...Object.entries(docs),
    ]),
    labels: { derivationName: 'Derivation' },
  });
}

/** 子视频第一笔事务之后的样子：实例同位置、换了 ID 与轨道。 */
function childAfterCopy(parentItems: SequenceItem[], trackMap: Record<string, string>) {
  const copied = parentItems.map((item) => ({ ...item, id: `new_${item.id}`, trackId: trackMap[item.trackId]! }));
  return {
    sequence: { ...video(copied).sequences.seq_1!, id: 'seq_child', tracks: childTracks },
    documents: {
      doc_new: doc('doc_new', { kind: 'speech', sourceAssetId: 'asset_new_v', currentRevision: '3' }),
    } as Record<string, DocumentRecord>,
  };
}

function op<T extends EditOperation['type']>(ops: EditOperation[], type: T): Extract<EditOperation, { type: T }>[] {
  return ops.filter((o): o is Extract<EditOperation, { type: T }> => o.type === type);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = Record<string, any>;
const insertedOf = (ops: EditOperation[]) => op(ops, 'insertItems')[0]!.items as unknown as Loose[];
const codes = (p: { warnings: { code: string }[] }) => p.warnings.map((w) => w.code);

describe('alignRange', () => {
  it('起点向下、终点向上取整到帧，截到序列长度；空区间拒绝', () => {
    const sequence = video(items).sequences.seq_1!;
    expect(alignRange(sequence, 0.1, 0.2)).toMatchObject({ startFrame: 3, endFrame: 6 });
    expect(alignRange(sequence, 1.51, 4.49)).toMatchObject({ startFrame: 45, endFrame: 135, start: 1.5, end: 4.5 });
    expect(alignRange(sequence, 5, 999)).toMatchObject({ endFrame: 180 });
    expect(() => alignRange(sequence, 2, 2)).toThrow(DeriveError);
    expect(() => alignRange(sequence, 7, 9)).toThrowError(expect.objectContaining({ code: 'DERIVE_RANGE_EMPTY' }));
  });

  it('句间停顿比一帧短时边界留在停顿里：终点越过下一个词的起点改向下，起点落进上一个词改向上', () => {
    const sequence = video(items).sequences.seq_1!;
    // 30 fps 一帧约 33 ms；两处停顿都只有 30–35 ms。
    const words = [
      { start: 0.2, end: 1.005 },
      { start: 1.04, end: 1.995 },
      { start: 2.025, end: 2.5 },
    ];
    // 终点 2.01：向上是 61 帧（2.033s），越过下一个词的起点 2.025，改为 60 帧（2.0s）。
    // 起点 1.02：向下是 30 帧（1.0s），落在上一个词结束（1.005s）之前，改为 31 帧（1.033s）。
    expect(alignRange(sequence, 1.02, 2.01, words)).toMatchObject({ startFrame: 31, endFrame: 60, end: 2 });
    // 不给词时照旧。
    expect(alignRange(sequence, 1.02, 2.01)).toMatchObject({ startFrame: 30, endFrame: 61 });
    // 取整没碰到词：不改。
    expect(alignRange(sequence, 1.5, 1.99, words)).toMatchObject({ startFrame: 45, endFrame: 60 });
    // 区间落在一个词里（终点之后的词才算下一个）：照常向上。
    expect(alignRange(sequence, 1.1, 1.9, words)).toMatchObject({ startFrame: 33, endFrame: 57 });
    // 改了之后区间会空：不改。
    expect(alignRange(sequence, 2.005, 2.01, words)).toMatchObject({ startFrame: 60, endFrame: 61 });
  });

  it('timelineWords 把转写的词按播放它的实例投到剪辑后的时间线上（变速、剪掉的不在）', () => {
    const words = timelineWords(video(items), new Map([['doc_speech', speechBody]]));
    // w1、w2 在 item_a（源 0–3s 原速）；w3（源 3.5s）没播放；w4（源 11s）在 item_b（时间线 3s 起两倍速播源 10s）。
    expect(words).toEqual([
      { start: 0.5, end: 1 },
      { start: 1.6, end: 2 },
      { start: 3.5, end: 3.75 },
    ]);
  });
});

describe('planDerivation：整份复制', () => {
  it('全部实例原样复制（不平移、不截断），一律跟随剪口；文稿整份；章节全部；来源文档在最后', () => {
    const p = plan(video(items), 1.5, 4.5);
    const inserted = insertedOf(p.operations);
    expect(inserted).toHaveLength(3);
    const [a, b, music] = inserted;
    expect(a).toMatchObject({ span: { fromFrame: 0, durationFrames: 90 }, timeMap: { sourceIn: { ticks: '0' } }, trackId: 'trk_c1', fit: 'cover' });
    expect(b).toMatchObject({ span: { fromFrame: 90, durationFrames: 90 }, timeMap: { sourceIn: { ticks: '10000' }, rate: { num: 2 } } });
    expect(music).toMatchObject({ fromFrame: 30, subframeOffset: { ticks: '800' }, playDuration: { ticks: '192000' }, trackId: 'trk_c2' });
    for (const item of inserted) {
      expect(item).not.toHaveProperty('id');
      expect(item).not.toHaveProperty('paintOrder');
      expect(item).not.toHaveProperty('assetRef');
      expect(item.followPolicy).toEqual({ kind: 'follow-cuts' });
    }
    // 淡入淡出不改。
    expect(a!.embeddedAudio.fadeIn).toBeDefined();
    expect(b!.embeddedAudio.fadeOut).toBeDefined();
    expect(p.itemCount).toBe(3);

    expect(op(p.operations, 'importAsset')).toEqual([
      expect.objectContaining({ path: '/media/talk.mp4', storage: 'linked', ref: 'asset-1', provenance: { origin: 'import', source: 'local' } }),
      expect.objectContaining({ path: '/media/music.mp3', ref: 'asset-2' }),
    ]);
    const speech = op(p.operations, 'putDocument').find((d) => d.kind === 'speech')!;
    expect(speech).toMatchObject({ ref: 'speech-1', sourceAsset: { ref: 'asset-1' }, language: 'en' });
    // 整份：词、句子、章节都在。
    expect(speech.body).toEqual(speechBody);
    expect(p.speech).toEqual([{ ref: 'speech-1', from: 'doc_speech', assetId: 'asset_v', words: 4 }]);

    expect(op(p.operations, 'setChapters')).toEqual([
      {
        type: 'setChapters',
        sequenceId: 'seq_child',
        chapters: [
          { at: { unit: 'frames', value: 20 }, title: 'Intro' },
          { at: { unit: 'frames', value: 120 }, title: 'Body', summary: 'main part' },
        ],
        alignment: 'exact-frame',
      },
    ]);
    expect(op(plan(video(items), 1.5, 4.5, { ...settings, chapters: false }).operations, 'setChapters')).toEqual([]);
    expect(op(p.operations, 'updateSequence')).toEqual([{ type: 'updateSequence', sequenceId: 'seq_child', background: '#112233' }]);
    expect(p.operations.at(-1)).toMatchObject({ type: 'putDocument', kind: 'derivation', name: 'Derivation', summary: p.derivation });
    expect(p.derivation).toMatchObject({
      schema: 'baocut.derivation/1',
      parentVideoId: 'video_parent',
      parentRevision: '7',
      range: { start: 1.5, end: 4.5 },
      primaryAssetId: 'asset_v',
    });
  });

  it('第二条用到的视觉轨新建；锁着的实例复制成不锁的并提醒', () => {
    const extra: SequenceItem = { ...videoItem('item_c', 150, 30, 30), trackId: 'trk_v2', locked: true };
    const p = plan(video([...items, extra]), 0, 2);
    expect(op(p.operations, 'addTrack')).toEqual([{ type: 'addTrack', sequenceId: 'seq_child', kind: 'visual', ref: 'track-2' }]);
    const onSecond = insertedOf(p.operations).find((i) => i.trackRef === 'track-2')!;
    expect(onSecond).toMatchObject({ span: { fromFrame: 150 } });
    expect(onSecond).not.toHaveProperty('locked');
    expect(p.warnings).toContainEqual({ code: 'locks-dropped', itemId: 'item_c' });
  });

  it('父视频有合成实例时拒绝', () => {
    const composition = { ...videoItem('item_comp', 0, 30, 0), type: 'composition', source: {}, parameterValues: {} } as unknown as SequenceItem;
    expect(() => derivationNeeds(video([...items, composition]), settings)).toThrowError(
      expect.objectContaining({ code: 'DERIVE_UNSUPPORTED_ITEM', details: { itemId: 'item_comp', itemType: 'composition' } }),
    );
  });

  it('derivationNeeds 列出素材版本与相关文稿、剪口集合、译文', () => {
    const needs = derivationNeeds(video(items, {}, true), settings);
    expect(needs.assets).toEqual([
      { id: 'asset_v', revision: '1' },
      { id: 'asset_a', revision: '1' },
    ]);
    expect(needs.documentIds).toEqual(['doc_cuts', 'doc_speech', 'doc_tr']);
    expect(derivationNeeds(video(items, {}, true), { ...settings, translations: false }).documentIds).toEqual(['doc_cuts', 'doc_speech']);
  });
});

describe('planDerivation：区间之外的剪口', () => {
  it('对主素材记 [0, S) 与 [E, 时长) 播放的源区间（源时钟、按速度换算）；配乐不剪', () => {
    const p = plan(video(items), 1.5, 4.5);
    // item_a 的 0–1.5s 播源 0–1.5s；item_b 的 4.5–6s 以两倍速播源 13–16s。
    expect(p.cuts).toEqual([
      { assetId: 'asset_v', from: 0, to: 1.5 },
      { assetId: 'asset_v', from: 13, to: 16 },
    ]);
    expect(p.trim.cuts).toEqual({
      importRef: 'asset-1',
      cuts: [
        { from: '0', to: '1.5' },
        { from: '13', to: '16' },
      ],
    });
    expect(p.derivation.cuts).toEqual(p.cuts);
    // 两个媒体素材：只对主素材记剪口，说明。区间之外都盖住了，配乐跨着区间，不会整个被删。
    expect(p.warnings).toContainEqual({ code: 'multiple-assets', count: 2 });
    expect(codes(p)).not.toContain('range-not-exact');
    expect(codes(p)).not.toContain('items-not-restorable');
  });

  it('同一段源在区间里也播放时不剪那段；没盖住的帧以 range-not-exact 说明', () => {
    // item_c 在 3–4s 重放源 0–1s：区间 [3, 4) 留着它，所以 item_a 的源 0–1s 不能剪。
    const replay: SequenceItem[] = [videoItem('item_a', 0, 90, 0), videoItem('item_c', 90, 30, 0, 1, 1)];
    const p = plan(video(replay, { transitions: [] }), 3, 4);
    expect(p.cuts).toEqual([{ assetId: 'asset_v', from: 1, to: 3 }]);
    expect(p.warnings).toContainEqual({ code: 'range-not-exact', count: 30 });
  });

  it('剪口起止写成 9 位十进制秒：起点向上、终点向下取整', () => {
    const p = plan(video([videoItem('item_a', 0, 90, 0)], { transitions: [] }), 1 / 30, 89 / 30);
    expect(p.trim.cuts!.cuts).toEqual([
      { from: '0', to: '0.033333333' },
      { from: '2.966666667', to: '3' },
    ]);
  });

  it('源时钟不是正速率线性的素材不记剪口：没有主素材时整段以 range-not-exact 说明', () => {
    const reversed = { ...videoItem('item_a', 0, 90, 3), timeMap: { kind: 'linear', sourceIn: { ticks: '3000', timescale: 1000 }, rate: { num: -1, den: 1 } } } as VideoItem;
    const p = plan(video([reversed], { transitions: [] }), 1, 2);
    expect(p.cuts).toEqual([]);
    expect(p.trim.cuts).toBeNull();
    expect(p.derivation.primaryAssetId).toBeNull();
    expect(p.warnings).toContainEqual({ code: 'range-not-exact', count: 60 });
  });

  it('别的素材的实例整个落在剪掉的范围里时说明恢复不回来', () => {
    // 区间 [5.5, 6)：配乐（1.02–5.02s）整个落在 [0, 5.5) 的剪口里。
    const p = plan(video(items), 5.5, 6);
    expect(p.warnings).toContainEqual({ code: 'items-not-restorable', count: 1 });
  });
});

describe('区间里的字幕条', () => {
  it('kept 是区间里播放的源区间（按素材，变速换算）；cuesInRange 只数与它重叠的字幕条', () => {
    // 时间线 [1.5, 4.5)：item_a 播源 1.5–3s，item_b 两倍速播源 10–13s；配乐（1s+1/60s 起播）播源 0.4833…–3.4833…s。
    const p = plan(video(items), 1.5, 4.5);
    expect(p.kept.map((k) => ({ ...k, from: Number(k.from.toFixed(4)), to: Number(k.to.toFixed(4)) }))).toEqual([
      { assetId: 'asset_a', from: 0.4833, to: 3.4833 },
      { assetId: 'asset_v', from: 1.5, to: 3 },
      { assetId: 'asset_v', from: 10, to: 13 },
    ]);
    const kept = p.kept.filter((k) => k.assetId === 'asset_v');
    const body = {
      schema: 'baocut.caption/1',
      clock: 'source-asset',
      timescale: 1000,
      cues: [
        { id: 'c1', start: 0, end: 1400, text: 'before' },
        { id: 'c2', start: 1400, end: 1600, text: 'across the start' },
        { id: 'c3', start: 3000, end: 9000, text: 'cut out' },
        { id: 'c4', start: 11000, end: 12000, text: 'inside' },
        { id: 'c5', start: 13000, end: 14000, text: 'after' },
      ],
    };
    expect(cuesInRange(body, kept)).toBe(2);
    expect(cuesInRange({ cues: 'x' }, kept)).toBeNull();
  });
});

describe('planDerivation：父视频已有的剪口（cut-set）', () => {
  it('剪口集合原样复制，范围换成子视频的实例；区间之外的剪口不与它重复', () => {
    const snapshot = video(items, {}, true);
    const p = plan(snapshot, 1.5, 4.5);
    expect(p.trim.cutSets).toHaveLength(1);
    const [copied] = p.trim.cutSets;
    expect(copied).toMatchObject({ from: 'doc_cuts', importRef: 'asset-1', body: parentCutSet });
    expect(copied!.scope).toHaveLength(2);
    // 父视频的剪口（源 3–10s）不在复制的实例里：新剪口不覆盖它，也不重复记。
    for (const cut of p.cuts) expect(cut.to <= 3 || cut.from >= 10).toBe(true);
    expect(p.cuts).toEqual([
      { assetId: 'asset_v', from: 0, to: 1.5 },
      { assetId: 'asset_v', from: 13, to: 16 },
    ]);

    const child = childAfterCopy(items, { trk_v1: 'trk_c1', trk_a1: 'trk_c2' });
    const trim = planDerivationTrim(p, child, { 'asset-1': 'asset_new_v', 'speech-1': 'doc_new' });
    const cutSet = op(trim, 'putDocument').find((d) => d.kind === 'cut-set')!;
    expect(cutSet).toMatchObject({ sourceAsset: { assetId: 'asset_new_v' }, body: { ...parentCutSet, scopeItemIds: ['new_item_a', 'new_item_b'] } });
    // 剪口集合先写，再记区间之外的剪口（addCuts 合进同一个集合）。
    expect(trim.indexOf(cutSet)).toBeLessThan(trim.findIndex((o) => o.type === 'addCuts'));
  });
});

describe.skipIf(!editorWasmAvailable())('planDerivation：旧项目的译文（baocut.translation/1）', () => {
  /**
   * 旧项目的译文：单元 ID 是旧的句子 ID；一句记着词的范围，一句与规则句同 ID，一句找不到对应的词。
   * 规则句子（章节在 1s 处断句）：s-w1 [w1]、s-w2 [w2, w3]、s-w4 [w4]。
   */
  const legacy = {
    schema: 'baocut.translation/1',
    sourceLanguage: 'en',
    units: [
      { id: 's1', text: '乙丙', display: '乙', source: { first: 'w2', last: 'w3', wordCount: 2, fingerprint: 'x' } },
      { id: 's-w4', text: '丁' },
      { id: 'gone', text: '戊' },
    ],
  };

  it('按转写现在的句子换成 /2：句级对齐、译文照用，子视频照样复制', () => {
    const p = plan(video(items), 1.5, 4.5, settings, { doc_tr: legacy });
    expect(codes(p)).not.toContain('translations-skipped');
    expect(p.trim.translations).toHaveLength(1);
    const t = p.trim.translations[0]!;
    expect(t).toMatchObject({ from: 'doc_tr', speechRef: 'speech-1', language: 'zh' });
    expect(t.body).toMatchObject({
      schema: 'baocut.translation/2',
      language: 'zh',
      sourceBasis: { speechRef: { id: 'doc_speech', revision: '1' }, sequenceId: 'seq_1', scopeLineage: [], editViewHash: expect.any(String) },
    });
    const units = t.body.units as Loose[];
    expect(units.map((u) => [u.sourceSentenceId, u.naturalText, u.status])).toEqual([
      ['s-w2', '乙丙', 'draft'],
      ['s-w4', '丁', 'draft'],
    ]);
    expect(units[0]).toEqual({
      id: 't-s-w2',
      sourceSentenceId: 's-w2',
      sourceFingerprint: expect.stringMatching(/^2:w2:w3:/),
      naturalText: '乙丙',
      // 旧的显示改写不带（没有改写依据的指纹）。
      alignment: { basis: 'natural', correspondence: 'sentence', blocks: [], sourceWordIds: ['w2', 'w3'], textHash: `sha256:${sha256Hex('乙丙')}` },
      status: 'draft',
    });

    // 收尾照常写成子视频的译文：sourceBasis 换成子视频的转写与序列。
    const child = childAfterCopy(items, { trk_v1: 'trk_c1', trk_a1: 'trk_c2' });
    const trim = planDerivationTrim(p, child, { 'asset-1': 'asset_new_v', 'speech-1': 'doc_new' });
    expect(op(trim, 'putDocument').find((d) => d.kind === 'translation')).toMatchObject({
      ref: 'translation-1',
      sourceDocument: { documentId: 'doc_new' },
      body: { schema: 'baocut.translation/2', sourceBasis: { speechRef: { id: 'doc_new', revision: '3' }, sequenceId: 'seq_child' } },
    });
  });

  it('旧句的词与现在的句子不同时译文留着、标为过期', () => {
    const shifted = { ...legacy, units: [{ id: 's1', text: '甲乙', source: { first: 'w1', last: 'w2' } }] };
    const units = plan(video(items), 1.5, 4.5, settings, { doc_tr: shifted }).trim.translations[0]!.body.units as Loose[];
    expect(units.map((u) => [u.sourceSentenceId, u.naturalText, u.status])).toEqual([['s-w1', '甲乙', 'stale']]);
  });

  it('换不了的译文不复制，以 translations-skipped 说明', () => {
    const noLanguage = video(items);
    noLanguage.documents.doc_tr = { ...noLanguage.documents.doc_tr!, language: undefined } as DocumentRecord;
    for (const p of [
      plan(noLanguage, 1.5, 4.5, settings, { doc_tr: legacy }),
      plan(video(items), 1.5, 4.5, settings, { doc_tr: { schema: 'baocut.translation/9', units: [] } }),
      plan(video(items), 1.5, 4.5, settings, { doc_tr: { ...legacy, units: [{ id: 'gone', text: '戊' }] } }),
    ]) {
      expect(p.trim.translations).toEqual([]);
      expect(p.warnings).toContainEqual({ code: 'translations-skipped', documentId: 'doc_tr' });
    }
  });
});

describe('planDerivationTrim', () => {
  it('次序：轨道显示与静音、转场、译文、剪口集合、剪口，最后锁轨道', () => {
    const snapshot = video(items, {
      tracks: [track('trk_v1', 0, 'visual', { locked: true, visible: false }), track('trk_a1', 2, 'audio', { muted: true })],
    } as Partial<Seq>, true);
    const p = plan(snapshot, 1.5, 4.5);
    const child = childAfterCopy(items, { trk_v1: 'trk_c1', trk_a1: 'trk_c2' });
    const trim = planDerivationTrim(p, child, { 'asset-1': 'asset_new_v', 'speech-1': 'doc_new' });
    expect(trim.map((o) => (o.type === 'putDocument' ? `putDocument:${o.kind}` : o.type))).toEqual([
      'updateTrack',
      'updateTrack',
      'setTransition',
      'putDocument:translation',
      'putDocument:cut-set',
      'addCuts',
      'updateTrack',
    ]);
    expect(trim[0]).toEqual({ type: 'updateTrack', sequenceId: 'seq_child', trackId: 'trk_c1', visible: false });
    expect(trim[1]).toEqual({ type: 'updateTrack', sequenceId: 'seq_child', trackId: 'trk_c2', muted: true });
    expect(trim[2]).toMatchObject({ leftItemId: 'new_item_a', rightItemId: 'new_item_b', duration: { unit: 'frames', value: 10 } });
    expect(trim[3]).toMatchObject({
      sourceDocument: { documentId: 'doc_new' },
      // 文稿整份复制，编辑视图指纹不变。
      body: { sourceBasis: { speechRef: { id: 'doc_new', revision: '3' }, sequenceId: 'seq_child', editViewHash: 'old' } },
    });
    expect(trim[5]).toEqual({
      type: 'addCuts',
      sequenceId: 'seq_child',
      assetId: 'asset_new_v',
      cuts: [
        { from: '0', to: '1.5' },
        { from: '13', to: '16' },
      ],
    });
    expect(trim[6]).toEqual({ type: 'updateTrack', sequenceId: 'seq_child', trackId: 'trk_c1', locked: true });
  });
});

describe('derivationKey', () => {
  const input = { parentVideoId: 'video_parent', parentRevision: '7', range: { start: 1.5, end: 4.5 }, settings };
  it('同样的输入同样的键；区间、版本、设置变了键就变', () => {
    const key = derivationKey(input);
    expect(key).toMatch(/^[0-9a-f]{12}$/);
    expect(derivationKey({ ...input, settings: { ...settings } })).toBe(key);
    expect(derivationKey({ ...input, range: { start: 1.5, end: 4.6 } })).not.toBe(key);
    expect(derivationKey({ ...input, parentRevision: '8' })).not.toBe(key);
    expect(derivationKey({ ...input, settings: { ...settings, captions: false } })).not.toBe(key);
  });
});

describe('clockLabel', () => {
  it('mm:ss，一小时以上 h:mm:ss', () => {
    expect(clockLabel(75.9)).toBe('01:15');
    expect(clockLabel(3725)).toBe('1:02:05');
  });
});

// ---- 真实引擎：恢复剪口回到父视频全貌，父视频的剪口不丢、不重复 ----

const engine = resolveEngineHostCommand();
const ffmpeg = (() => {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();
if (!engine || !ffmpeg) console.warn('跳过派生子视频的端到端测试：没有构建 engine-host 或没有 ffmpeg');

interface CutSetBodyShape {
  timescale: number;
  cuts: { id: string; t0: number; t1: number }[];
}

describe.skipIf(!engine || !ffmpeg)('videos.derive（真实引擎）', () => {
  let fixtures: string;
  let clip: string;
  let dir: string;
  let runtime: RunningRuntime;
  let client: BaoCutClient;
  let project: Project;

  beforeAll(async () => {
    fixtures = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-derive-fixtures-'));
    clip = path.join(fixtures, 'clip.mp4');
    execFileSync('ffmpeg', [
      '-v', 'error', '-y',
      '-f', 'lavfi', '-i', 'testsrc=size=320x180:rate=30:duration=4',
      '-f', 'lavfi', '-i', 'sine=frequency=440:duration=4',
      '-c:v', 'mpeg4', '-c:a', 'aac', '-shortest', clip,
    ]);
  });

  afterAll(async () => {
    await fs.rm(fixtures, { recursive: true, force: true });
  });

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-derive-'));
    runtime = await startRuntime({
      home: resolveRuntimeHome({ BAOCUT_HOME: dir }),
      drivers: () => [],
      watchSpace: false,
      engineHost: engine,
      videoGraceMs: 100,
    });
    const { endpoint, token } = runtime.discovery;
    client = new BaoCutClient({ resolve: async () => ({ endpoint, token }), client: { kind: 'desktop', name: 'test', version: '0' }, reconnect: false });
    await client.connect();
    ({ project } = await client.request('projects.create', { name: '派生测试' }));
  });

  afterEach(async () => {
    client.close();
    await runtime.close();
    await fs.rm(dir, { recursive: true, force: true });
  });

  const snapshotOf = (videoId: string) => runtime.videos.mirror(videoId)!.video;
  const sequenceOf = (videoId: string) => {
    const v = snapshotOf(videoId);
    return v.sequences[v.rootSequenceId]!;
  };

  async function apply(videoId: string, operations: unknown[]) {
    return client.request('edits.apply', {
      videoId,
      commandId: newId('cmd'),
      expectedRevision: snapshotOf(videoId).revision,
      operations: operations as never,
    });
  }

  /** 时间线上播放的源：相邻且源时钟连续的段合成一段（恢复剪口时实例可能是拆开的）。 */
  function playback(videoId: string) {
    const sequence = sequenceOf(videoId);
    const fps = sequence.fps.num / sequence.fps.den;
    const pieces = sequence.items
      .filter((item): item is VideoItem => item.type === 'video')
      .map((item) => {
        const map = item.timeMap as { sourceIn: { ticks: string; timescale: number } };
        const sourceIn = Number(map.sourceIn.ticks) / map.sourceIn.timescale;
        return { from: item.span.fromFrame, to: item.span.fromFrame + item.span.durationFrames, sourceIn };
      })
      .sort((a, b) => a.from - b.from);
    const merged: { from: number; to: number; sourceIn: number }[] = [];
    for (const piece of pieces) {
      const last = merged.at(-1);
      if (last && last.to === piece.from && Math.abs(last.sourceIn + (last.to - last.from) / fps - piece.sourceIn) < 1e-6) last.to = piece.to;
      else merged.push({ ...piece });
    }
    return merged.map((m) => ({ from: m.from, to: m.to, sourceIn: Number(m.sourceIn.toFixed(6)) }));
  }

  async function documentOf(videoId: string, kind: string) {
    const record = Object.values(snapshotOf(videoId).documents).find((d) => d.kind === kind);
    if (!record) return null;
    return (await client.request('documents.read', { videoId, documentId: record.id })).body;
  }

  const seconds = (body: CutSetBodyShape) => body.cuts.map((c) => ({ id: c.id, from: c.t0 / body.timescale, to: c.t1 / body.timescale }));

  async function parentWithCut() {
    const created = await client.request('videos.create', { projectId: project.id, name: 'Parent' });
    const videoId = created.ref.videoId;
    const sequenceId = created.snapshot.video.rootSequenceId;
    const words = [
      { id: 'w1', start: 200, end: 700, text: 'Alpha' },
      { id: 'w2', start: 1100, end: 1400, text: 'beta' },
      { id: 'w3', start: 1600, end: 1900, text: 'gamma' },
      { id: 'w4', start: 2100, end: 2400, text: 'delta' },
      { id: 'w5', start: 3000, end: 3800, text: 'omega.' },
    ];
    await apply(videoId, [
      { type: 'importAsset', path: clip, ref: 'clip' },
      { type: 'addItem', sequenceId, asset: { ref: 'clip' }, alignment: 'nearest-frame' },
      {
        type: 'putDocument',
        kind: 'speech',
        language: 'en',
        sourceAsset: { ref: 'clip' },
        body: { schema: 'baocut.speech/1', clock: 'source-asset', timescale: 1000, speakers: [], words, sentences: null, chapters: [] },
      },
    ]);
    const assetId = Object.keys(snapshotOf(videoId).assets)[0]!;
    // 父视频先剪掉源 1.5–2s：时间线 0–1.5s 播源 0–1.5s，1.5–3.5s 播源 2–4s。
    await apply(videoId, [{ type: 'addCuts', sequenceId, assetId, cuts: [{ from: '1.5', to: '2' }] }]);
    return { videoId, assetId };
  }

  it('子视频恢复区间之外的剪口后，时间线与文稿回到父视频全貌；父视频已有的剪口不丢、不重复', async () => {
    const parent = await parentWithCut();
    const parentPlayback = playback(parent.videoId);
    expect(parentPlayback).toEqual([
      { from: 0, to: 45, sourceIn: 0 },
      { from: 45, to: 105, sourceIn: 2 },
    ]);
    const parentSpeech = await documentOf(parent.videoId, 'speech');
    const parentCuts = seconds((await documentOf(parent.videoId, 'cut-set')) as CutSetBodyShape);
    expect(parentCuts).toEqual([{ id: expect.any(String), from: 1.5, to: 2 }]);

    // 时间线 [1, 2)：源 1–1.5s 与 2–2.5s 留下；区间之外是源 0–1s 与 2.5–4s。
    const derived = await client.request('videos.derive', { videoId: parent.videoId, start: 1, end: 2 });
    expect(derived.reused).toBe(false);
    expect(derived.range).toEqual({ start: 1, end: 2 });
    expect(derived.primaryAssetId).toBe(parent.assetId);
    expect(derived.cuts).toEqual([
      { assetId: parent.assetId, from: 0, to: 1 },
      { assetId: parent.assetId, from: 2.5, to: 4 },
    ]);
    expect(derived.warnings).toEqual([]);
    const childId = derived.video.videoId;
    expect(childId).not.toBe(parent.videoId);

    // 剪掉之后，子视频的时间线只剩区间：1 秒，播源 1–1.5s 与 2–2.5s。
    expect(playback(childId)).toEqual([
      { from: 0, to: 15, sourceIn: 1 },
      { from: 15, to: 30, sourceIn: 2 },
    ]);
    // 文稿是整份（区间之外的话显示为剪掉的）。
    expect(await documentOf(childId, 'speech')).toEqual(parentSpeech);
    // 字幕层按整份文稿切条（两条），cueCount 只数区间里（源 1–1.5s 与 2–2.5s）看得到的那一条。
    expect(((await documentOf(childId, 'caption')) as { cues: unknown[] }).cues).toHaveLength(2);
    expect(derived.captions).toEqual([expect.objectContaining({ cueCount: 1 })]);
    // (b) 剪口集合：父视频的剪口在，区间之外的两个剪口各记一次，没有重复。
    const childCuts = seconds((await documentOf(childId, 'cut-set')) as CutSetBodyShape);
    expect(childCuts.map(({ from, to }) => ({ from, to }))).toEqual([
      { from: 0, to: 1 },
      { from: 1.5, to: 2 },
      { from: 2.5, to: 4 },
    ]);
    // 父视频本身不变。
    expect(playback(parent.videoId)).toEqual(parentPlayback);

    // (a) 恢复区间之外的剪口：回到父视频的全貌（父视频自己的剪口仍剪着）。
    const childAsset = Object.keys(snapshotOf(childId).assets)[0]!;
    const childSequence = snapshotOf(childId).rootSequenceId;
    for (const cut of childCuts.filter((c) => c.from !== 1.5)) {
      await apply(childId, [{ type: 'restoreCut', sequenceId: childSequence, assetId: childAsset, cutId: cut.id }]);
    }
    expect(playback(childId)).toEqual(parentPlayback);
    expect(await documentOf(childId, 'speech')).toEqual(parentSpeech);
    expect(seconds((await documentOf(childId, 'cut-set')) as CutSetBodyShape).map(({ from, to }) => ({ from, to }))).toEqual([{ from: 1.5, to: 2 }]);

    // 父视频的剪口也恢复：子视频与恢复同一个剪口的父视频一样。
    const inherited = childCuts.find((c) => c.from === 1.5)!;
    await apply(childId, [{ type: 'restoreCut', sequenceId: childSequence, assetId: childAsset, cutId: inherited.id }]);
    await apply(parent.videoId, [{ type: 'restoreCut', sequenceId: snapshotOf(parent.videoId).rootSequenceId, assetId: parent.assetId, cutId: parentCuts[0]!.id }]);
    expect(playback(childId)).toEqual(playback(parent.videoId));
    expect(playback(childId)).toEqual([{ from: 0, to: 120, sourceIn: 0 }]);
  });

  it('父视频的旧译文（/1）换成 /2 带进子视频，并按父视频的译文字幕层建一层', async () => {
    const parent = await parentWithCut();
    const sequenceId = snapshotOf(parent.videoId).rootSequenceId;
    const speechId = Object.values(snapshotOf(parent.videoId).documents).find((d) => d.kind === 'speech')!.id;
    await apply(parent.videoId, [
      {
        type: 'putDocument',
        ref: 'tr',
        kind: 'translation',
        language: 'zh',
        sourceDocument: { documentId: speechId },
        body: { schema: 'baocut.translation/1', sourceLanguage: 'en', units: [{ id: 's-w1', text: '阿尔法贝塔伽马德尔塔欧米伽。' }] },
      },
      {
        type: 'putDocument',
        ref: 'cap',
        kind: 'caption',
        language: 'zh',
        sourceDocument: { ref: 'tr' },
        body: { schema: 'baocut.caption/1', clock: 'source-asset', timescale: 1000, cues: [{ id: 'q1', start: 200, end: 3800, text: '阿尔法贝塔伽马德尔塔欧米伽。' }] },
      },
      { type: 'addTrack', sequenceId, kind: 'subtitle', ref: 'subs' },
      { type: 'insertItems', sequenceId, items: [{ type: 'caption', span: { fromFrame: 0, durationFrames: 105 }, documentRef: 'cap', trackRef: 'subs' }] },
    ]);

    const derived = await client.request('videos.derive', { videoId: parent.videoId, start: 1, end: 2 });
    expect(derived.warnings).toEqual([]);
    const childId = derived.video.videoId;
    expect(derived.translations).toHaveLength(1);
    const translation = derived.translations[0]!;
    const body = (await client.request('documents.read', { videoId: childId, documentId: translation.documentId })).body as Loose;
    expect(body).toMatchObject({ schema: 'baocut.translation/2', language: 'zh' });
    expect(body.units).toEqual([
      expect.objectContaining({ sourceSentenceId: 's-w1', naturalText: '阿尔法贝塔伽马德尔塔欧米伽。', status: 'draft' }),
    ]);
    // 子视频里原文与译文各一层字幕。
    expect(derived.captions.map((c) => c.sourceDocumentId).sort()).toEqual([translation.sourceDocumentId, translation.documentId].sort());
    const child = snapshotOf(childId);
    const layers = sequenceOf(childId).items.filter((i) => i.type === 'caption');
    expect(layers.map((i) => child.documents[(i as { documentId: string }).documentId]?.sourceDocumentId).sort()).toEqual(
      [translation.sourceDocumentId, translation.documentId].sort(),
    );
  });

  it('同样的参数再派生认回同一个子视频，不再复制', async () => {
    const parent = await parentWithCut();
    const first = await client.request('videos.derive', { videoId: parent.videoId, start: 1, end: 2 });
    const revision = snapshotOf(first.video.videoId).revision;
    const again = await client.request('videos.derive', { videoId: parent.videoId, start: 1, end: 2 });
    expect(again.video.videoId).toBe(first.video.videoId);
    expect(again.reused).toBe(true);
    expect(again.key).toBe(first.key);
    expect(snapshotOf(first.video.videoId).revision).toBe(revision);
    expect(sequenceOf(first.video.videoId).items.filter((i) => i.type === 'video')).toHaveLength(2);
  });
});

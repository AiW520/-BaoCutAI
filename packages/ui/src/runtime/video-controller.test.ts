import { afterEach, describe, expect, it, vi } from 'vitest';
import type { BaoCutClient } from '@baocut/client';
import type { VideoSnapshot } from '@baocut/protocol';
import { EditLabel } from '@baocut/protocol/messages/ui';
import { useVideo, type OpenVideo } from '../state/video-store.ts';
import { VideoController } from './video-controller.ts';

function open() {
  const request = vi.fn(async (method: string, _params: Record<string, unknown>) =>
    method === 'edits.apply' ? { receipt: { transactionId: 'tx1' }, replayed: false } : {},
  );
  const video = { id: 'vid', revision: '7' } as unknown as VideoSnapshot;
  useVideo.setState({ video: { videoId: 'vid', state: { video, eventSeq: 1 }, status: 'ready', inFlight: 0 } as unknown as OpenVideo });
  return { request, videos: new VideoController({ request } as unknown as BaoCutClient) };
}

afterEach(() => useVideo.setState({ video: null }));

describe('VideoController.apply', () => {
  it('修改名带着目录引用一起提交，读者按自己的语言重新生成', async () => {
    const { request, videos } = open();
    await videos.apply([], EditLabel.relinkAsset({ name: 'a.mov' }));
    expect(request).toHaveBeenCalledWith(
      'edits.apply',
      expect.objectContaining({
        expectedRevision: '7',
        label: '重新关联「a.mov」',
        labelRef: { key: 'editLabel.relinkAsset', params: { name: 'a.mov' } },
      }),
    );
  });

  it('不给修改名时两个字段都不带，由引擎起名', async () => {
    const { request, videos } = open();
    await videos.apply([]);
    const params = request.mock.calls.find(([method]) => method === 'edits.apply')![1];
    expect(params).not.toHaveProperty('label');
    expect(params).not.toHaveProperty('labelRef');
  });
});

it('all existing document editor writes become local changes, even when the old body is not cached', async () => {
  const { request, videos } = open();
  const body = { schema: 'baocut.speech/1', speakers: [{ id: 's1', name: 'Speaker 1' }], words: Array.from({ length: 26711 }, (_, i) => ({ id: `w${i}`, text: 'unchanged' })) };
  const store = useVideo.getState().video!;
  useVideo.setState({ video: { ...store, state: { ...store.state!, video: { ...store.state!.video, documents: { doc: { id: 'doc', kind: 'speech', currentRevision: '1' } } } } } as unknown as OpenVideo });
  request.mockImplementation(async (method: string) => method === 'documents.read' ? { body } as never : { receipt: { transactionId: 'tx1' }, replayed: false });
  const next = structuredClone(body);
  next.speakers[0]!.name = 'Mark Zuckerberg';
  await videos.apply([{ type: 'putDocument', documentId: 'doc', kind: 'speech', body: next }]);
  expect(request).toHaveBeenCalledWith('documents.read', { videoId: 'vid', documentId: 'doc', revision: '1' });
  const sent = request.mock.calls.find(([method]) => method === 'edits.apply')![1];
  expect(sent.operations).toEqual([{ type: 'patchDocument', documentId: 'doc', changes: [{ path: ['speakers', { id: 's1' }, 'name'], value: 'Mark Zuckerberg' }] }]);
  expect(JSON.stringify(sent).length).toBeLessThan(500);
});

it('keeps the editing revision when a concurrent change arrives before a queued document write', async () => {
  const { request, videos } = open();
  const pending = videos.apply([{ type: 'renameSpeakers', documentId: 'doc', speakers: [{ id: 's1', name: 'new' }] }]);
  const store = useVideo.getState().video!;
  useVideo.setState({ video: { ...store, state: { ...store.state!, video: { ...store.state!.video, revision: '8' } } } as OpenVideo });
  await pending;
  expect(request).toHaveBeenCalledWith('edits.apply', expect.objectContaining({ expectedRevision: '7' }));
});

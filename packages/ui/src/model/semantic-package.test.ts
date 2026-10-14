import { describe, expect, it } from 'vitest';
import type { ModelBundleStatus, ModelComponentStatus, SpaceEntry } from '@baocut/protocol';
import { packageView, scopeView, TEXT_BUNDLE } from './semantic-package.ts';

const MULTI = 'embeddinggemma2-multimodal@litert-lm';

const part = (component: string, state: 'installed' | 'missing', estimatedBytes: number): ModelComponentStatus => ({
  component,
  repo: `o/${component}`,
  revision: 'r1',
  state,
  bytes: state === 'installed' ? estimatedBytes : null,
  estimatedBytes,
  sharedWith: [],
});

const bundle = (
  bundleId: string,
  weights: 'installed' | 'missing',
  runtime: 'installed' | 'missing',
  patch: Partial<ModelBundleStatus> = {},
): ModelBundleStatus => ({
  bundleId,
  capability: 'embed',
  backend: 'litert-lm',
  device: 'cpu',
  state: weights === 'installed' && runtime === 'installed' ? 'installed' : 'not-installed',
  components: [
    part(bundleId === TEXT_BUNDLE ? 'text' : 'multimodal', weights, bundleId === TEXT_BUNDLE ? 300 : 800),
    part('litertlm-runtime', runtime, 50),
  ],
  ...patch,
});

describe('语义搜索一个包', () => {
  it('先文字后多模态；共用的运行库只算一次', () => {
    const view = packageView([bundle(MULTI, 'missing', 'missing'), bundle(TEXT_BUNDLE, 'missing', 'missing')]);
    expect(view.state).toBe('notInstalled');
    expect(view.parts.map((p) => p.kind)).toEqual(['text', 'multimodal']);
    expect(view.queue.map((b) => b.bundleId)).toEqual([TEXT_BUNDLE, MULTI]);
    expect(view.bytes).toBe(300 + 800 + 50);
  });

  it('装了一个是补齐，只下缺的；都装好时没有要装的', () => {
    const partial = packageView([bundle(TEXT_BUNDLE, 'installed', 'installed'), bundle(MULTI, 'missing', 'installed')]);
    expect(partial).toMatchObject({ state: 'partial', bytes: 800 });
    expect(partial.queue.map((b) => b.bundleId)).toEqual([MULTI]);
    const done = packageView([bundle(TEXT_BUNDLE, 'installed', 'installed'), bundle(MULTI, 'installed', 'installed')]);
    expect(done).toMatchObject({ state: 'installed', queue: [], bytes: null });
  });

  it('都跑不了是不支持；在下载、停着的分开认', () => {
    expect(
      packageView([
        bundle(TEXT_BUNDLE, 'missing', 'missing', { reason: 'unsupported' }),
        bundle(MULTI, 'missing', 'missing', { reason: 'unsupported' }),
      ]).state,
    ).toBe('unsupported');
    const install = { state: 'paused', doneBytes: 10, totalBytes: 100 } as unknown as ModelBundleStatus['install'];
    const view = packageView([bundle(TEXT_BUNDLE, 'missing', 'missing', { install }), bundle(MULTI, 'missing', 'missing')]);
    expect(view).toMatchObject({ paused: true, running: null });
    const running = packageView([
      bundle(TEXT_BUNDLE, 'missing', 'missing', { install: { ...install!, state: 'downloading' } as ModelBundleStatus['install'] }),
    ]);
    expect(running.running?.bundleId).toBe(TEXT_BUNDLE);
  });
});

describe('索引范围', () => {
  const entry = (videoId: string, name: string, patch: Partial<SpaceEntry> = {}): SpaceEntry => ({
    id: `e-${videoId}`,
    kind: 'video',
    name,
    fileName: name,
    source: { projectId: 'p1', conversationId: null },
    relPath: name,
    size: 0,
    lastActivityAt: '2026-10-13T00:00:00Z',
    status: null,
    user: { favorite: false, displayName: null, trashedAt: null },
    ref: { videoId },
    ...patch,
  });

  it('只列还在的排除项目与 Space 里还有的视频，用显示名', () => {
    const view = scopeView(
      [
        { id: 'p1', name: 'Vlog' },
        { id: 'p2', name: 'Talk' },
      ],
      ['p2', 'gone'],
      ['v1', 'v2', 'v3'],
      [
        entry('v1', 'Interview', { user: { favorite: false, displayName: 'Interview cut', trashedAt: null } }),
        entry('v2', 'Old', { user: { favorite: false, displayName: null, trashedAt: '2026-10-13T00:00:00Z' } }),
      ],
    );
    expect(view.projects).toBe(2);
    expect(view.excluded).toEqual([{ id: 'p2', name: 'Talk' }]);
    expect(view.videos).toEqual([{ id: 'v1', name: 'Interview cut' }]);
  });
});

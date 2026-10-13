import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Project } from '@baocut/protocol';
import { TASK_VIEW_COPY } from '../../copy.ts';
import { job, task } from '../../testing/task-records.ts';
import { TaskImages, TaskOutputs, TaskSource } from './task-sections.tsx';

const source = vi.hoisted(() => ({ project: null as Project | null, video: null as unknown }));
vi.mock('../../runtime/context.tsx', () => ({ useRuntime: () => ({ host: { revealPath: vi.fn() } }) }));
vi.mock('../../state/directory-store.ts', () => ({ useProject: () => source.project }));
vi.mock('../../state/video-store.ts', () => ({ useVideo: (select: (state: unknown) => unknown) => select({ video: source.video }) }));

beforeEach(() => {
  source.project = null;
  source.video = null;
});

describe('task sections with compiled S2 styles', () => {
  it('renders the project source of a completed conversation task', () => {
    source.project = {
      id: 'project', name: 'Music project', path: '/tmp/music-project',
      createdAt: '', lastActiveAt: '', pinned: false, archived: false,
    };
    const html = renderToStaticMarkup(createElement(TaskSource, { task: task({ taskId: 'task', status: 'completed', projectId: 'project' }) }));
    expect(html).toContain('Music project');
    expect(html).toContain('/tmp/music-project');
    expect(html).toContain(TASK_VIEW_COPY.reveal);
  });

  it('renders the video source of a completed YuE2 job without an input asset', () => {
    source.video = { videoId: 'video', ref: { name: 'Music video', path: '/tmp/music-video' }, state: null };
    const html = renderToStaticMarkup(createElement(TaskSource, {
      job: job({ jobId: 'job', kind: 'generateMusic', state: 'completed', phase: 'done', videoId: 'video', assetId: null, modelId: 'yue2-3b@audio-cpp-q8' }),
    }));
    expect(html).toContain('Music video');
    expect(html).toContain('/tmp/music-video');
  });

  it('renders both the input asset and video rows for transcription', () => {
    source.video = {
      videoId: 'video', ref: { name: 'Source video', path: '/tmp/source-video' },
      state: { video: { name: 'Source video', assets: {
        asset: { name: 'Recording.wav', currentRevision: 'r1', revisions: { r1: { duration: { ticks: '12000', timescale: 1000 } } } },
      } } },
    };
    const html = renderToStaticMarkup(createElement(TaskSource, { job: job({ jobId: 'job', videoId: 'video', assetId: 'asset', assetRevision: 'r1' }) }));
    expect(html).toContain('Recording.wav');
    expect(html).toContain('Source video');
    expect(html).toContain('0:12');
  });

  it('omits the source when its project or open video is unavailable', () => {
    expect(renderToStaticMarkup(createElement(TaskSource, { task: task({ taskId: 'task', projectId: 'missing' }) }))).toBe('');
    expect(renderToStaticMarkup(createElement(TaskSource, { job: job({ jobId: 'job', videoId: 'missing' }) }))).toBe('');
  });

  it('renders completed music output rows using the same style', () => {
    const html = renderToStaticMarkup(createElement(TaskOutputs, {
      job: job({ jobId: 'job', kind: 'generateMusic', state: 'completed', phase: 'done', result: {
        documentId: null, artifactId: 'music', outputs: [{
          artifactId: 'music', assetId: null, byteLength: 1024, mediaType: 'audio/wav', path: '/tmp/song.wav',
          media: { kind: 'audio', durationSec: 12, sampleRate: 44100, channels: 2 },
        }],
      } }),
    }));
    expect(html).toContain('song.wav');
    expect(html).toContain('44.1 kHz');
    expect(html).toContain(TASK_VIEW_COPY.open);
  });

  it('keeps image requests aligned to the top instead of the source row center', () => {
    const image = job({ jobId: 'job', kind: 'generateImage', state: 'queued', generation: {
      capability: 'generateImage', prompt: 'A landscape', size: null, aspectRatio: '16:9', count: 1, format: 'png', seed: null,
    } });
    const html = renderToStaticMarkup(createElement(TaskImages, { job: image, now: 0 }));
    expect(html).toContain('A landscape');
    source.project = { id: 'p', name: 'Project', path: '/tmp/project', createdAt: '', lastActiveAt: '', pinned: false, archived: false };
    const centered = renderToStaticMarkup(createElement(TaskSource, { task: task({ taskId: 'task', projectId: 'p' }) }));
    // The first two divs are the section's card and rows; the third is the styled row.
    const rowClass = (markup: string) => [...markup.matchAll(/<div class="([^"]+)"/g)][2]?.[1];
    expect(rowClass(html)).toBeTruthy();
    expect(rowClass(html)).not.toBe(rowClass(centered));
  });
});

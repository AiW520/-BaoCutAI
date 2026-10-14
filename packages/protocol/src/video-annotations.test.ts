import { describe, expect, it } from 'vitest';
import { methodParamSchemas } from './schemas.ts';
import { VIDEO_ANNOTATION_LIMITS } from './video.ts';

describe('conversations.send / steer 带的视频标注（产品设计 §3.2.3「视频标注」）', () => {
  const base = { conversationId: 'c', text: 'hi', commandId: 'k' };
  const box = {
    video: { projectId: 'p', path: 'talk' },
    revision: '3',
    timeMs: 10000,
    kind: 'box',
    region: { x: 0.25, y: 0.2, w: 0.5, h: 0.4 },
    label: '00:10.0 · 框 · 画面正中',
    text: '这块字幕挡住了脸',
  };
  const arrow = { ...box, kind: 'arrow', region: { x: 0.1, y: 0.1, w: 0, h: 0 }, to: { x: 0.6, y: 0.5 } };
  const pin = { ...box, kind: 'pin', region: { x: 0.8, y: 0.2, w: 0, h: 0 } };
  const text = { ...pin, kind: 'text' };

  it('send 与 steer 都收四种标注，三种 video 写法都认，可以与另外三种标注同时带', () => {
    const system = { system: { conversationId: 'c', path: 'ds' }, anchor: 'a', label: 'l', text: 'x' };
    for (const method of ['conversations.send', 'conversations.steer'] as const) {
      const schema = methodParamSchemas[method];
      expect(schema.safeParse({ ...base, videoAnnotations: [box, arrow, pin, text] }).success).toBe(true);
      expect(schema.safeParse({ ...base, videoAnnotations: [{ ...box, video: { entryId: 'e1' } }] }).success).toBe(true);
      expect(schema.safeParse({ ...base, videoAnnotations: [{ ...box, video: { conversationId: 'c', path: 'talk' } }] }).success).toBe(true);
      expect(schema.safeParse({ ...base, designSystemAnnotations: [system], videoAnnotations: [pin] }).success).toBe(true);
    }
  });

  it('每条消息至多 20 条，单条批注至多 2000 字', () => {
    const send = methodParamSchemas['conversations.send'];
    const many = Array.from({ length: VIDEO_ANNOTATION_LIMITS.perMessage + 1 }, () => pin);
    expect(send.safeParse({ ...base, videoAnnotations: many }).success).toBe(false);
    expect(send.safeParse({ ...base, videoAnnotations: many.slice(1) }).success).toBe(true);
    const long = (n: number) => [{ ...pin, text: 'x'.repeat(n) }];
    expect(send.safeParse({ ...base, videoAnnotations: long(VIDEO_ANNOTATION_LIMITS.text + 1) }).success).toBe(false);
    expect(send.safeParse({ ...base, videoAnnotations: long(VIDEO_ANNOTATION_LIMITS.text) }).success).toBe(true);
  });

  it('按种类核对形状：框要面积、点没有面积、箭头必有终点、别的种类没有终点；坐标 0–1、时刻非负整数、版本是数字串、不收别的字段', () => {
    const send = methodParamSchemas['conversations.send'];
    for (const bad of [
      { ...box, region: { x: 0.1, y: 0.1, w: 0, h: 0.2 } },
      { ...box, region: { x: 0.1, y: 0.1, w: 0.2, h: 0 } },
      { ...box, to: { x: 0.5, y: 0.5 } },
      { ...arrow, to: undefined },
      { ...arrow, region: { x: 0.1, y: 0.1, w: 0.1, h: 0 } },
      { ...pin, region: { x: 0.8, y: 0.2, w: 0.1, h: 0.1 } },
      { ...pin, to: { x: 0.5, y: 0.5 } },
      { ...text, region: { x: 0.8, y: 0.2, w: 0, h: 0.1 } },
      { ...pin, region: { x: 1.2, y: 0.2, w: 0, h: 0 } },
      { ...pin, region: { x: -0.1, y: 0.2, w: 0, h: 0 } },
      { ...arrow, to: { x: 0.5, y: 1.5 } },
      { ...pin, timeMs: -1 },
      { ...pin, timeMs: 1.5 },
      { ...pin, revision: 3 },
      { ...pin, revision: 'r3' },
      { ...pin, kind: 'circle' },
      { ...pin, text: '   ' },
      { ...pin, id: 'n1' },
      { ...pin, anchor: 'x' },
      { ...pin, region: { x: 0.8, y: 0.2, w: 0, h: 0, z: 0 } },
      { ...pin, video: { path: 'talk' } },
      { ...pin, label: 'l'.repeat(1001) },
    ]) {
      expect(send.safeParse({ ...base, videoAnnotations: [bad] }).success, JSON.stringify(bad)).toBe(false);
    }
  });
});

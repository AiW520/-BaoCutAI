import { describe, expect, it } from 'vitest';
import { readEditorMessage, readHostMessage, SAVE_FILE_MAX_BYTES, saveFileName } from './editor-messages.ts';

describe('导出文件的消息（editor:save-file）', () => {
  it('父窗口认 ArrayBuffer 与 Blob，别的内容、空文件名不认', () => {
    const data = new ArrayBuffer(4);
    expect(readEditorMessage({ type: 'editor:save-file', requestId: 'r1', filename: 'Landing.html', data })).toEqual({
      type: 'editor:save-file',
      requestId: 'r1',
      filename: 'Landing.html',
      data,
    });
    const blob = new Blob(['%PDF']);
    expect(readEditorMessage({ type: 'editor:save-file', requestId: 'r2', filename: 'Deck.pdf', data: blob })?.type).toBe('editor:save-file');
    expect(readEditorMessage({ type: 'editor:save-file', requestId: 'r3', filename: 'a.html', data: 'text' })).toBeNull();
    expect(readEditorMessage({ type: 'editor:save-file', requestId: 'r4', filename: 'a.html', data: new Uint8Array(4) })).toBeNull();
    expect(readEditorMessage({ type: 'editor:save-file', requestId: 'r5', filename: '  ', data })).toBeNull();
    expect(readEditorMessage({ type: 'editor:save-file', requestId: 'x'.repeat(101), filename: 'a.html', data })).toBeNull();
  });

  it('超过上限的文件不认', () => {
    const big = { byteLength: SAVE_FILE_MAX_BYTES + 1 };
    Object.setPrototypeOf(big, ArrayBuffer.prototype);
    expect(readEditorMessage({ type: 'editor:save-file', requestId: 'r1', filename: 'a.zip', data: big })).toBeNull();
  });

  it('编辑器只认三种结果', () => {
    for (const outcome of ['saved', 'declined', 'failed'] as const) {
      expect(readHostMessage({ type: 'editor:save-file-result', requestId: 'r1', outcome })).toEqual({ type: 'editor:save-file-result', requestId: 'r1', outcome });
    }
    expect(readHostMessage({ type: 'editor:save-file-result', requestId: 'r1', outcome: 'ok' })).toBeNull();
    expect(readHostMessage({ type: 'editor:save-file-result', requestId: 1, outcome: 'saved' })).toBeNull();
  });
});

describe('saveFileName', () => {
  it('去掉路径分隔符、保留字符与控制字符，扩展名要在允许的范围里', () => {
    expect(saveFileName('Landing page.html')).toBe('Landing page.html');
    expect(saveFileName('../../etc/passwd.html')).toBe('etc passwd.html');
    expect(saveFileName('a\\b:c*d?"e<f>g|h.PDF')).toBe('a b c d e f g h.PDF');
    expect(saveFileName('首页\u0007设计.png')).toBe('首页 设计.png');
    expect(saveFileName('  .hidden.zip  ')).toBe('hidden.zip');
    expect(saveFileName('design-html.zip')).toBe('design-html.zip');
  });

  it('没有扩展名、扩展名不认得、太长时返回 null', () => {
    expect(saveFileName('README')).toBeNull();
    expect(saveFileName('.html')).toBeNull();
    expect(saveFileName('run.exe')).toBeNull();
    expect(saveFileName('page.html.sh')).toBeNull();
    expect(saveFileName('x.constructor')).toBeNull();
    expect(saveFileName(`${'a'.repeat(260)}.html`)).toBeNull();
  });
});

describe('文档编辑器的标注（editor:annotate）', () => {
  it('父窗口认评论与请求，正文去掉首尾空白', () => {
    expect(
      readEditorMessage({
        type: 'editor:annotate',
        requestId: 'r1',
        kind: 'comment',
        path: 'f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.16;thread=9d41c0aa-77e2',
        label: 'Plan › "500 weekly active teams"',
        quote: '500 weekly active teams',
        text: '  Is Sep 29 firm?  ',
      }),
    ).toEqual({
      type: 'editor:annotate',
      requestId: 'r1',
      kind: 'comment',
      path: 'f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.16;thread=9d41c0aa-77e2',
      label: 'Plan › "500 weekly active teams"',
      quote: '500 weekly active teams',
      text: 'Is Sep 29 firm?',
    });
    expect(readEditorMessage({ type: 'editor:annotate', requestId: 'r2', kind: 'ask', path: 'f-a#b/c', label: 'Plan', text: 'Write the risks' })).toEqual({
      type: 'editor:annotate',
      requestId: 'r2',
      kind: 'ask',
      path: 'f-a#b/c',
      label: 'Plan',
      text: 'Write the risks',
    });
  });

  it('种类不对、正文为空或太长、路径为空时不认', () => {
    const base = { type: 'editor:annotate', requestId: 'r1', kind: 'comment', path: 'f-a#b/c', label: 'x', text: 'hi' };
    expect(readEditorMessage({ ...base, kind: 'reply' })).toBeNull();
    expect(readEditorMessage({ ...base, text: '   ' })).toBeNull();
    expect(readEditorMessage({ ...base, text: 'x'.repeat(4097) })).toBeNull();
    expect(readEditorMessage({ ...base, path: '' })).toBeNull();
    expect(readEditorMessage({ ...base, quote: 3 })).toBeNull();
  });

  it('编辑器认结果', () => {
    expect(readHostMessage({ type: 'editor:annotate-result', requestId: 'r1', ok: true })).toEqual({ type: 'editor:annotate-result', requestId: 'r1', ok: true });
    expect(readHostMessage({ type: 'editor:annotate-result', requestId: 'r1', ok: 'yes' })).toBeNull();
  });
});

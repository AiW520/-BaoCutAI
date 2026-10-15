import { describe, expect, it } from 'vitest';
import { parseDocsPath } from './docs.ts';

describe('parseDocsPath', () => {
  it('拆出标签页、正文节点、块与线程', () => {
    expect(parseDocsPath('f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.16;thread=9d41c0aa-77e2')).toEqual({
      tab: 'afc001d0-ce07',
      node: 'be1476b2-62c1',
      block: 'mq2x81a0kfd.16',
      thread: '9d41c0aa-77e2',
    });
    expect(parseDocsPath('f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.105')).toEqual({ tab: 'afc001d0-ce07', node: 'be1476b2-62c1', block: 'mq2x81a0kfd.105' });
    expect(parseDocsPath('f-a#b')).toEqual({ tab: 'a', node: 'b' });
    expect(parseDocsPath('f-a#b/m5j4zwj66w6.247@0-6;thread=t')).toEqual({ tab: 'a', node: 'b', block: 'm5j4zwj66w6.247', thread: 't' });
  });

  it('块之后的段忽略', () => {
    expect(parseDocsPath('f-a#b/c/d.3;thread=t')).toEqual({ tab: 'a', node: 'b', block: 'c', thread: 't' });
  });

  it('不是这个写法时返回 null', () => {
    expect(parseDocsPath('a#b/c')).toBeNull();
    expect(parseDocsPath('f-a')).toBeNull();
    expect(parseDocsPath('f-a#b/<script>')).toBeNull();
    expect(parseDocsPath('')).toBeNull();
  });
});

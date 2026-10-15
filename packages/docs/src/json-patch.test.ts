// 项目值的 JSON patch：工具栏的字体、版式按钮和标签页改名、排序、嵌套都走这里。
import { describe, expect, it } from 'vitest';
import { applyJsonPatch, JsonPatchError } from './json-patch.ts';

describe('applyJsonPatch', () => {
  it('set 沿途补对象，delete 删键，原值不变', () => {
    const value = { name: '文档', tabs: { a: { name: 'Tab 1', order: 'V' } } };
    const next = applyJsonPatch(value, [
      { op: 'set', path: ['display', 'headingFont'], value: 'sans' },
      { op: 'delete', path: ['display', 'textFont'] },
      { op: 'set', path: ['tabs', 'a', 'name'], value: '正文' },
    ]);
    expect(next).toEqual({ name: '文档', tabs: { a: { name: '正文', order: 'V' } }, display: { headingFont: 'sans' } });
    expect(value).not.toHaveProperty('display');
    expect(value.tabs.a.name).toBe('Tab 1');
  });

  it('删除不存在的路径不报错', () => {
    expect(applyJsonPatch({ id: 'p' }, [{ op: 'delete', path: ['display', 'pageWidth'] }])).toEqual({ id: 'p' });
  });

  it('拒绝改原型的路径与未知操作', () => {
    expect(() => applyJsonPatch({}, [{ op: 'set', path: ['__proto__', 'x'], value: 1 }])).toThrow(JsonPatchError);
    expect(() => applyJsonPatch({}, [{ op: 'move', path: ['a'] } as never])).toThrow(JsonPatchError);
    expect(() => applyJsonPatch({ a: 1 }, [{ op: 'set', path: ['a', 'b'], value: 1 }])).toThrow(JsonPatchError);
  });
});

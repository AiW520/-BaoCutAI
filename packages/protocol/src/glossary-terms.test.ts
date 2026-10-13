import { describe, expect, it } from 'vitest';
import { termMatch, termOccurs, termReplace } from './glossary-terms.ts';

describe('术语写法的出现与替换', () => {
  it('拉丁写法落在词边界上、不分大小写；其他按子串', () => {
    expect(termOccurs('AI', 'He said so.')).toBe(false);
    expect(termOccurs('ai', 'Use AI here.')).toBe(true);
    expect(termOccurs('时间线', '打开时间线。')).toBe(true);
    expect(termOccurs('  ', 'anything')).toBe(false);
    expect(termMatch('Price', 'price 是十美元')).toBe('price');
    expect(termMatch('AI', 'He said so.')).toBeNull();
  });

  it('替换与出现用同一个规则：词中间的不换，全部出现处都换', () => {
    expect(termReplace('AI', 'AI said AI.', '人工智能')).toBe('人工智能 said 人工智能.');
    expect(termReplace('时间线', '时间线和时间线', '时间轴')).toBe('时间轴和时间轴');
    expect(termReplace('a+b', 'x a+b y', '$&')).toBe('x $& y');
  });
});

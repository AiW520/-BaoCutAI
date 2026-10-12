import { describe, expect, it } from 'vitest';
import { SETTING_DEFAULTS } from '@baocut/protocol';
import { settingValueSchemas } from '@baocut/protocol/schemas';
import {
  autoUpdateOn,
  endpointProblem,
  endpointValue,
  LINE_LENGTH_PRESETS,
  lineLengthKey,
  lineLengthText,
  trashDaysValue,
} from './general-settings.ts';

describe('字幕行长三档', () => {
  it('「中」是合同的默认值，三档都过得了合同的校验', () => {
    expect(LINE_LENGTH_PRESETS.find((p) => p.key === 'medium')?.value).toEqual(SETTING_DEFAULTS['captions.maxLineLength']);
    for (const p of LINE_LENGTH_PRESETS) expect(settingValueSchemas['captions.maxLineLength'].safeParse(p.value).success).toBe(true);
  });

  it('存着的值落在哪一档；不在任何一档、或还没拿到时为 null', () => {
    expect(lineLengthKey({ cjk: 16, other: 42 })).toBe('medium');
    expect(lineLengthKey({ cjk: 12, other: 32 })).toBe('short');
    expect(lineLengthKey({ cjk: 16, other: 52 })).toBeNull();
    expect(lineLengthKey(null)).toBeNull();
  });

  it('写出两个数', () => {
    expect(lineLengthText({ cjk: 18, other: 40 })).toBe('中日韩文字每行 18 字 · 其他文字每行 40 个字符');
  });
});

describe('下载来源', () => {
  it('留空 = 恢复默认来源', () => {
    expect(endpointValue('   ')).toBeNull();
    expect(endpointProblem('')).toBeNull();
    expect(endpointValue('  https://mirror.example.com/models  ')).toBe('https://mirror.example.com/models');
  });

  it('只收 http(s) 基址，不带凭据、查询参数与片段', () => {
    expect(endpointProblem('https://mirror.example.com/models')).toBeNull();
    expect(endpointProblem('http://10.0.0.2:8080/')).toBeNull();
    expect(endpointProblem('mirror.example.com')).toMatch(/不是网址/);
    expect(endpointProblem('ftp://mirror.example.com')).toMatch(/http/);
    expect(endpointProblem('https://user:pass@mirror.example.com')).toMatch(/用户名或密码/);
    expect(endpointProblem('https://mirror.example.com/?token=1')).toMatch(/查询参数/);
    expect(endpointProblem('https://mirror.example.com/#a')).toMatch(/片段/);
    expect(endpointProblem(`https://mirror.example.com/${'a'.repeat(500)}`)).toMatch(/500/);
  });

  it('这里放行的，合同也放行；这里拦下的，合同也拦下', () => {
    const accepts = (value: string) => settingValueSchemas['models.downloadEndpoint'].safeParse(value).success;
    for (const value of [
      'https://a.example/b',
      'http://10.0.0.2:8080/',
      'mirror.example.com',
      'ftp://a.example',
      'https://u:p@a.example',
      'https://a.example/?q=1',
      'https://a.example/#x',
    ])
      expect(endpointProblem(value) === null).toBe(accepts(value));
  });
});

describe('自动更新', () => {
  it('两个键都开着才算开；没拿到时按默认值', () => {
    expect(autoUpdateOn(null, null)).toBe(true);
    expect(autoUpdateOn(true, false)).toBe(false);
    expect(autoUpdateOn(false, true)).toBe(false);
  });
});

describe('回收站保留天数', () => {
  it('清空是恢复默认；其余取整并收进 1–3650', () => {
    expect(trashDaysValue(Number.NaN)).toBeNull();
    expect(trashDaysValue(14.6)).toBe(15);
    expect(trashDaysValue(0)).toBe(1);
    expect(trashDaysValue(99999)).toBe(3650);
  });
});

import { LOCALES, setLocale, type Locale } from '@baocut/protocol';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { baocutStep } from './agent-tool-steps.ts';

/** 会话线程的步骤行（产品设计 §3.2.2）：BaoCut 自己的工具念这一类的名字加一句摘要。 */

const call = (tool: string, args: Record<string, unknown>) => ({
  tool: 'mcp' as const,
  title: `baocut.${tool}`,
  detail: JSON.stringify(args),
});

/** 界面语言：测试环境的 `BAOCUT_LOCALE` 优先，跟着一起换。 */
const use = (locale: Locale) => {
  vi.stubEnv('BAOCUT_LOCALE', locale);
  setLocale(locale);
};

describe('baocutStep', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    setLocale('zh-Hans');
  });

  it('智能体给会话起标题（产品设计 §3.1）：念「重命名会话」加新标题', () => {
    use('zh-Hans');
    expect(baocutStep(call('conversations_set_title', { title: ' 城市骑行通勤的五个误区 ' }))).toEqual({
      kind: 'conversation',
      label: '重命名会话',
      summary: '城市骑行通勤的五个误区',
    });
    use('en');
    expect(baocutStep(call('conversations_set_title', { title: 'Five myths about bike commuting' }))).toEqual({
      kind: 'conversation',
      label: 'Rename session',
      summary: 'Five myths about bike commuting',
    });
  });

  it('每种界面语言都有自己的译名；参数缺了只给类别名', () => {
    for (const locale of LOCALES) {
      use(locale);
      const step = baocutStep(call('conversations_set_title', {}));
      expect(step?.summary, locale).toBe('');
      if (locale === 'en') expect(step?.label).toBe('Rename session');
      else expect(step?.label, locale).not.toBe('Rename session');
    }
  });

  it('不是 BaoCut 的工具、认不出的工具返回 null', () => {
    expect(baocutStep({ tool: 'mcp', title: 'other.conversations_set_title', detail: null })).toBeNull();
    expect(baocutStep(call('conversations_unknown', {}))).toBeNull();
  });
});

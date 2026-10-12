import { describe, expect, it } from 'vitest';
import { methodParamSchemas } from './schemas.ts';
import { messageSkills, parseSkillLabels, SKILL_LIMITS, sendSkillRefs, skillLabel } from './skill.ts';

describe('conversations.send 点选的 skill', () => {
  const send = methodParamSchemas['conversations.send'];
  const base = { conversationId: 'c', text: 'hi', commandId: 'k' };

  it('收单个的 skill 与有序的 skills 清单', () => {
    expect(send.safeParse({ ...base, skill: { id: 'caption-layout' } }).success).toBe(true);
    expect(send.safeParse({ ...base, skills: [{ id: 'caption-layout' }, { id: 'b-roll' }] }).success).toBe(true);
    expect(send.safeParse({ ...base, skill: { id: 'a' }, skills: [{ id: 'b' }] }).success).toBe(true);
    expect(send.safeParse({ ...base, skills: [] }).success).toBe(true);
  });

  it('拒绝不合规的 id、多余字段与超过上限的清单', () => {
    expect(send.safeParse({ ...base, skills: [{ id: 'Caption Layout' }] }).success).toBe(false);
    expect(send.safeParse({ ...base, skills: [{ id: 'a', name: 'x' }] }).success).toBe(false);
    expect(send.safeParse({ ...base, skills: { id: 'a' } }).success).toBe(false);
    const many = Array.from({ length: SKILL_LIMITS.perMessage + 1 }, (_, i) => ({ id: `s${i}` }));
    expect(send.safeParse({ ...base, skills: many }).success).toBe(false);
    expect(send.safeParse({ ...base, skills: many.slice(1) }).success).toBe(true);
  });

  it('合成清单：单个的在前，按顺序，重复的只留第一次', () => {
    expect(sendSkillRefs({})).toEqual([]);
    expect(sendSkillRefs({ skill: { id: 'a' } })).toEqual([{ id: 'a' }]);
    expect(sendSkillRefs({ skills: [{ id: 'b' }, { id: 'a' }, { id: 'b' }] })).toEqual([{ id: 'b' }, { id: 'a' }]);
    expect(sendSkillRefs({ skill: { id: 'a' }, skills: [{ id: 'b' }, { id: 'a' }] })).toEqual([{ id: 'a' }, { id: 'b' }]);
  });

  it('消息上的标记兼容只写了单个 skill 的旧记录', () => {
    const ref = (id: string) => ({ id, name: id, origin: 'builtin' as const });
    expect(messageSkills({})).toEqual([]);
    expect(messageSkills({ skill: ref('a') })).toEqual([ref('a')]);
    expect(messageSkills({ skills: [ref('a'), ref('b')] })).toEqual([ref('a'), ref('b')]);
  });
});

describe('内置 skill 的界面文字（SKILL_META_FILE）', () => {
  it('按语言收名称与一句话介绍：认不出的语言、空的、多行的、超长的丢掉；都要有英文', () => {
    const labels = parseSkillLabels({
      name: { en: ' Chapters ', 'zh-Hans': '分章节', xx: 'unknown', ja: '' },
      summary: { en: 'Split at topic changes', 'zh-Hans': '第一行\n第二行', de: 'x'.repeat(SKILL_LIMITS.labelSummary + 1) },
      extra: true,
    });
    expect(labels).toEqual({ name: { en: 'Chapters', 'zh-Hans': '分章节' }, summary: { en: 'Split at topic changes' } });
    expect(parseSkillLabels({ name: { 'zh-Hans': '分章节' }, summary: { en: 'x' } })).toBeNull();
    expect(parseSkillLabels({ name: { en: 'x' } })).toBeNull();
    expect(parseSkillLabels([])).toBeNull();
    expect(parseSkillLabels('x')).toBeNull();
    expect(parseSkillLabels(null)).toBeNull();
  });

  it('按语言取，缺这种语言时英文；没有 labels 时是 front matter 的 name 与 description', () => {
    const skill = {
      name: 'video-chapters',
      description: '给智能体看的触发说明',
      labels: { name: { en: 'Chapters', 'zh-Hans': '分章节' }, summary: { en: 'Split at topic changes', 'zh-Hans': '在话题转换处分章' } },
    };
    expect(skillLabel(skill, 'zh-Hans')).toEqual({ name: '分章节', summary: '在话题转换处分章' });
    expect(skillLabel(skill, 'ja')).toEqual({ name: 'Chapters', summary: 'Split at topic changes' });
    expect(skillLabel({ ...skill, labels: null }, 'zh-Hans')).toEqual({ name: 'video-chapters', summary: '给智能体看的触发说明' });
  });
});

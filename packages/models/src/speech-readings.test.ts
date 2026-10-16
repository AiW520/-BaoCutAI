import { describe, expect, it } from 'vitest';
import { parseReadings, readingsToText, renderReadings, stripReadings, type SpeechReading } from './speech-readings.ts';

function user(start: number, end: number, reading: string): SpeechReading {
  return { start, end, reading, origin: 'user' };
}

describe('parseReadings', () => {
  it('parses a single character and lowercases the reading', () => {
    const a = parseReadings('他在银<行|XING2>里');
    expect(a.surface).toBe('他在银行里');
    expect(a.readings).toEqual([user(3, 4, 'xing2')]);
    expect(a.malformed).toEqual([]);
    expect(stripReadings('他在银<行|XING2>里')).toBe('他在银行里');
  });

  it('parses multi-character readings and folds ü', () => {
    const a = parseReadings('<银行|yin2  hang2>门口的<绿|lü4>灯，<句|jv4>子');
    expect(a.surface).toBe('银行门口的绿灯，句子');
    expect(a.readings).toEqual([user(0, 2, 'yin2 hang2'), user(5, 6, 'lv4'), user(8, 9, 'ju4')]);
  });

  it('leaves non-pinyin brackets literal', () => {
    const a = parseReadings('AI 让这一<行|hang2>变了，<read|R EH1 D> it，a < b');
    expect(a.surface).toBe('AI 让这一行变了，<read|R EH1 D> it，a < b');
    expect(a.readings).toEqual([user(6, 7, 'hang2')]);
    expect(a.malformed).toEqual([]);
  });

  it('keeps malformed annotations literal and reports the toned ones', () => {
    expect(parseReadings('<行xing2>走')).toEqual({ surface: '<行xing2>走', readings: [], malformed: [] });
    const a = parseReadings('去<银行|hang2>办事');
    expect(a.surface).toBe('去<银行|hang2>办事');
    expect(a.readings).toEqual([]);
    expect(a.malformed).toEqual([user(2, 4, 'hang2')]);
    expect(Array.from(a.surface).slice(2, 4).join('')).toBe('银行');
    expect(parseReadings('<行|xing22>').malformed).toHaveLength(1);
    for (const text of ['<中文|Chinese>', '<好|hello world>', '<行|xyz>', '<行|>', '<今日|きょう>', '<行|háng>']) {
      const plain = parseReadings(text);
      expect(plain.readings, text).toEqual([]);
      expect(plain.malformed, text).toEqual([]);
    }
    expect(parseReadings('<行|xyz2>').malformed).toHaveLength(1);
    expect(parseReadings('<呣|m2>').readings).toEqual([user(0, 1, 'm2')]);
    expect(parseReadings('<哼|hng>').readings).toEqual([user(0, 1, 'hng5')]);
    const nested = parseReadings('<外<行|xing2>|x>');
    expect(nested.surface).toBe('<外行|x>');
    expect(nested.readings).toEqual([user(2, 3, 'xing2')]);
  });

  it('normalizes tone marks to digits', () => {
    const a = parseReadings('<行|háng>、<银行|yín háng>、<绿|lǜ>、走<了|le>、<女|nǚ>、<驴|lǘ>、<女|nü>、<嗯|ńg>');
    expect(a.surface).toBe('行、银行、绿、走了、女、驴、女、嗯');
    expect(a.readings.map((r) => r.reading)).toEqual(['hang2', 'yin2 hang2', 'lv4', 'le5', 'nv3', 'lv2', 'nv5', 'ng2']);
    expect(parseReadings('<句|jǜ>').readings).toEqual([user(0, 1, 'ju4')]);
    expect(parseReadings('<雨|yǔ>').readings).toEqual([user(0, 1, 'yu3')]);
    expect(parseReadings('<行|xing>').readings).toEqual([user(0, 1, 'xing5')]);
    expect(parseReadings('<银行|yín hang2>').readings).toEqual([user(0, 2, 'yin2 hang2')]);
    expect(parseReadings('<东西|dong1 xi>').readings).toEqual([user(0, 2, 'dong1 xi5')]);
    expect(parseReadings('<银行|Yín Háng>').readings).toEqual([user(0, 2, 'yin2 hang2')]);
    expect(parseReadings('<绿|LǛ>').readings).toEqual([user(0, 1, 'lv4')]);
    expect(parseReadings('<女|NÜ3>').readings).toEqual([user(0, 1, 'nv3')]);
  });

  it('rejects invalid tone marks', () => {
    for (const text of ['<行|háng2>', '<行|hángá>', '<银行|yín>', '<行|zhuángáng>', '<银行|yín 2háng>']) {
      const a = parseReadings(text);
      expect(a.surface, text).toBe(text);
      expect(a.readings, text).toEqual([]);
      expect(a.malformed, text).toHaveLength(1);
    }
    expect(parseReadings('<行|háng2>').malformed[0]!.reading).toBe('háng2');
  });

  it('counts offsets in code points, not UTF-16 units', () => {
    const a = parseReadings('𠀀<行|xing2>');
    expect(a.readings).toEqual([user(1, 2, 'xing2')]);
  });

  it('round-trips through readingsToText', () => {
    const text = '他在<银行|yin2 hang2>上班，<长|zhang3>得高，不<行|xing2>。';
    expect(readingsToText(parseReadings(text))).toBe(text);
    const marked = parseReadings('他在<银行|yín háng>上班，<长|zhǎng>得高，不<行|xíng>了。');
    expect(readingsToText(marked)).toBe('他在<银行|yin2 hang2>上班，<长|zhang3>得高，不<行|xing2>了。');
    expect(parseReadings(readingsToText(marked))).toEqual(marked);
  });
});

describe('renderReadings', () => {
  it('passes plain text through untouched', () => {
    expect(renderReadings('a < b，行', 'unsupported')).toEqual({ text: 'a < b，行', dropped: [] });
  });

  it('keeps annotations for engines that read them, reporting only malformed ones', () => {
    expect(renderReadings('银<行|háng>，去<银行|hang2>', 'annotated')).toEqual({
      text: '银<行|hang2>，去<银行|hang2>',
      // 畸形注记的偏移指向表面文字里（字面括号之后）的那几个字，与解析结果一致。
      dropped: [user(5, 7, 'hang2')],
    });
  });

  it('synthesizes the surface and reports every annotation on engines without a readings channel', () => {
    expect(renderReadings('他在<银行|yin2 hang2>，去<银行|hang2>办事', 'unsupported')).toEqual({
      text: '他在银行，去银行办事',
      dropped: [user(2, 4, 'yin2 hang2'), user(7, 9, 'hang2')],
    });
  });
});

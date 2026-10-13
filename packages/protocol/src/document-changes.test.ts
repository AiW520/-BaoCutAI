import { describe, expect, it } from 'vitest';
import { documentChanges, localDocumentOperation } from './document-changes.ts';

describe('document field changes', () => {
  it('a name or word edit in a 26711-word transcript sends only that field', () => {
    const before = { schema: 'baocut.speech/1', speakers: [{ id: 'spk-1', name: 'Speaker 1', hue: 20 }], words: Array.from({ length: 26711 }, (_, i) => ({ id: `w${i}`, text: 'original', start: i * 100, end: i * 100 + 90, speaker: 'spk-1' })) };
    const after = structuredClone(before);
    after.speakers[0]!.name = 'Mark Zuckerberg';
    after.words[13000]!.text = 'corrected';
    const changes = documentChanges(before, after);
    expect(changes).toEqual([
      { path: ['speakers', { id: 'spk-1' }, 'name'], value: 'Mark Zuckerberg' },
      { path: ['words', { id: 'w13000' }, 'text'], value: 'corrected' },
    ]);
    expect(JSON.stringify(changes).length).toBeLessThan(220);
  });

  it('subtitle, translation, layout and style changes leave other fields out of the submission', () => {
    for (const field of ['cues', 'units', 'chapters'] as const) {
      const before = { [field]: [{ id: 'a', text: 'old', start: 0, end: 20 }, { id: 'b', text: 'untouched' }], extensions: { provider: 'test' } };
      const after = structuredClone(before);
      (after[field] as { text: string }[])[0]!.text = 'new';
      expect(documentChanges(before, after)).toEqual([{ path: [field, { id: 'a' }, 'text'], value: 'new' }]);
    }
    expect(documentChanges({ style: { font: 'a', size: 20 }, userBreaks: { w1: 'break' } }, { style: { font: 'a', size: 22 }, userBreaks: {} })).toEqual([
      { path: ['style', 'size'], value: 22 }, { path: ['userBreaks', 'w1'], remove: true },
    ]);
  });

  it('insert, remove and reorder keyed entries without sending the whole array', () => {
    const before = { words: [{ id: 'a', text: 'a' }, { id: 'b', text: 'b' }, { id: 'c', text: 'c' }] };
    const after = { words: [{ id: 'c', text: 'changed' }, { id: 'd', text: 'new' }, { id: 'a', text: 'a' }] };
    expect(documentChanges(before, after)).toEqual([
      { path: ['words', { id: 'b' }], remove: true },
      { path: ['words', { id: 'a' }], moveBefore: null },
      { path: ['words', { id: 'd' }], value: { id: 'd', text: 'new' }, beforeId: 'a' },
      { path: ['words', { id: 'c' }, 'text'], value: 'changed' },
    ]);
  });

  it('preserves explicit nulls, no-op bodies and full writes for new documents or metadata changes', () => {
    expect(documentChanges({ hue: 5 }, { hue: null })).toEqual([{ path: ['hue'], value: null }]);
    expect(documentChanges({ optional: true }, { optional: undefined, absent: undefined })).toEqual([{ path: ['optional'], remove: true }]);
    expect(documentChanges({ body: {} }, { body: {} })).toEqual([]);
    expect(localDocumentOperation({ type: 'putDocument', documentId: 'd', kind: 'notes', body: { text: 'same' } }, { text: 'same' })).toEqual({ type: 'patchDocument', documentId: 'd', changes: [{ path: ['text'], value: 'same' }] });
    const fresh = { type: 'putDocument' as const, kind: 'notes', body: { text: 'new' } };
    expect(localDocumentOperation(fresh, {})).toBe(fresh);
  });
});

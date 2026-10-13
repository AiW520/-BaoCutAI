import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { readReleaseNotes, validateReleaseNotes } from './release-notes.mjs';

const identity = { version: '3.5.0', build: 72 };
test('release notes reject empty, malformed and stale content before packaging', () => {
  const valid = { ...identity, notes: ' Export fixes. ', notesLocalized: { 'zh-Hans': '导出修复。' } };
  assert.deepEqual(validateReleaseNotes(valid, identity), { notes: 'Export fixes.', notesLocalized: valid.notesLocalized });
  for (const change of [{ notes: '' }, { notes: ' \n ' }, { notes: null }, { version: '3.4.2' }, { build: 71 },
    { notesLocalized: [] }, { notesLocalized: { en: '' } }, { notesLocalized: { en: 3 } }]) {
    assert.throws(() => validateReleaseNotes({ ...valid, ...change }, identity));
  }
});

test('checked-in platform feeds all contain the prepared release notes', () => {
  const directory = new URL('../releases/', import.meta.url);
  const prepared = JSON.parse(readFileSync(new URL('release-notes.json', directory), 'utf8'));
  const notes = readReleaseNotes(new URL('release-notes.json', directory), prepared);
  for (const file of readdirSync(directory).filter(name => /^appcast-.*\.json$/.test(name))) {
    const feed = JSON.parse(readFileSync(new URL(file, directory), 'utf8'));
    // Platforms can remain on an earlier release when only one platform ships.
    if (feed.version === prepared.version && feed.build === prepared.build) {
      assert.deepEqual(validateReleaseNotes(feed, prepared), notes, file);
    } else validateReleaseNotes(feed, feed);
  }
});

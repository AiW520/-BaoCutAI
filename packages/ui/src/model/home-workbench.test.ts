import { describe, expect, it } from 'vitest';
import type { Conversation, Project, SpaceEntry } from '@baocut/protocol';
import { recentProjects } from './home-workbench.ts';

const at = (day: number) => `2026-10-${String(day).padStart(2, '0')}T00:00:00.000Z`;
const project = (id: string, day = 1, archived = false): Project => ({
  id, name: id, path: `/work/${id}`, createdAt: at(1), lastActiveAt: at(day), pinned: false, archived,
});
const session = (id: string, projectId: string, patch: Partial<Conversation> = {}): Conversation => ({
  id, title: id, projectId, cwd: `/work/${projectId}`, driverId: 'codex', model: null, effort: null,
  accessMode: 'ask', createdAt: at(1), updatedAt: at(1), archived: false, pinned: false,
  unread: false, activity: 'idle', activeTaskId: null, ...patch,
});
const video = (id: string, projectId: string, patch: Partial<SpaceEntry> = {}): SpaceEntry => ({
  id, name: id, fileName: id, kind: 'video', source: { projectId, conversationId: null },
  relPath: id, size: 0, lastActivityAt: at(1), status: null, ref: { videoId: id },
  user: { favorite: false, displayName: null, trashedAt: null }, ...patch,
});

describe('Tuzi recent projects', () => {
  it('uses sidebar activity order, excludes archived projects and limits the list to three', () => {
    const rows = recentProjects([project('a'), project('b', 3), project('c', 2), project('d', 4), project('hidden', 20, true)], [session('s', 'a', { updatedAt: at(10) })], []);
    expect(rows.map((row) => row.project.id)).toEqual(['a', 'd', 'b']);
  });

  it('continues the latest usable video and ignores missing, trashed and unrelated videos', () => {
    const rows = recentProjects([project('a')], [], [
      video('old', 'a'), video('new', 'a', { lastActivityAt: at(2) }),
      video('missing', 'a', { status: 'missing', lastActivityAt: at(5) }),
      video('trash', 'a', { user: { favorite: false, displayName: null, trashedAt: at(6) } }),
      video('other', 'b', { lastActivityAt: at(9) }),
    ]);
    expect(rows[0]?.video?.id).toBe('new');
    expect(rows[0]?.videoCount).toBe(2);
  });

  it('falls back to the latest visible session and carries the actual status summary', () => {
    const rows = recentProjects([project('a'), project('empty')], [
      session('older', 'a'), session('active', 'a', { updatedAt: at(2), activity: 'running' }),
      session('archived', 'a', { updatedAt: at(3), archived: true }),
    ], []);
    expect(rows[0]).toMatchObject({ video: null, conversation: { id: 'active' }, summary: '1 个进行中' });
    expect(rows[0]?.conversations).toHaveLength(2);
    expect(rows[1]).toMatchObject({ video: null, conversation: null });
  });

  it('keeps canonical input arrays untouched and handles an empty workspace', () => {
    const projects = Object.freeze([project('a')]);
    const entries = Object.freeze([video('v', 'a')]);
    recentProjects(projects, Object.freeze([]), entries);
    expect(entries[0]?.id).toBe('v');
    expect(recentProjects([], [], [])).toEqual([]);
  });
});

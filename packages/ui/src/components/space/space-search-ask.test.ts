// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { setLocale } from '@baocut/protocol';
import { useDraftSkills } from '../../state/draft-skills-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { startDraftKey } from '../start/open-home.ts';
import { askAcrossVideos } from './space-search-hits.tsx';

beforeEach(() => {
  vi.stubEnv('BAOCUT_LOCALE', 'en');
  setLocale('en');
});

describe('回答这个问题', () => {
  it('问题放进新会话的输入框（接在已有的话后面）、挂上跨视频问答的 skill，按筛到的项目开；没筛项目时是无项目会话', () => {
    useShell.getState().setDraft(startDraftKey('p1'), 'Earlier note');
    askAcrossVideos('how much does it cost', 'p1');
    expect(useShell.getState().route).toMatchObject({ tab: 'home', conversationId: null, projectId: 'p1' });
    expect(useShell.getState().drafts[startDraftKey('p1')]).toContain('Earlier note');
    expect(useShell.getState().drafts[startDraftKey('p1')]).toContain('Answer from my videos in this project: how much does it cost');
    expect(useDraftSkills.getState().skills[startDraftKey('p1')]).toEqual(['cross-video-qa']);

    askAcrossVideos('who said it', 'none');
    expect(useShell.getState().route).toMatchObject({ tab: 'home', conversationId: null, projectId: null });
    expect(useShell.getState().drafts[startDraftKey(null)]).toBe('Answer from my videos: who said it');
    expect(useDraftSkills.getState().skills[startDraftKey(null)]).toEqual(['cross-video-qa']);
  });
});

import { describe, expect, it, vi } from 'vitest';
import type { CommentStoreShared } from "./store-context";

const { resolveFocus, draftAtRisk } = vi.hoisted(() => ({
  resolveFocus: vi.fn(() => true),
  draftAtRisk: vi.fn(() => true),
}));

// Exercise the extracted action closures without loading the editor's browser runtime.
vi.mock("../store/store-4", () => ({
  isSelbarDraft: () => false,
  commentsStoreValue80: 0,
  NO_PEERS: [],
  hiddenResolvedThread: () => false,
  resolveCommentsStoreIndexOf2: () => ({ op: 'resolve' }),
  commentsStoreMap2: new Map(),
  resolveCommentsStoreFocusId: resolveFocus,
  cardDraftAtRisk: draftAtRisk,
  commentsStoreSet13: new Set(),
  isTmpId: () => false,
}));
vi.mock("../store/store-2", () => ({
  commentsStoreSet3: new Set(),
}));
vi.mock("../../prose-editor/platform/anchors-and-mentions-1", () => ({}));
vi.mock("../../platform/services/api-and-auth-1", () => ({}));
vi.mock("../../platform/observability/telemetry-3", () => ({}));
vi.mock(
  "../../platform/observability/browser-and-operation-events-1",
  () => ({}),
);
vi.mock("../../platform/ui/toasts", () => ({}));

import { createCommentDraftsActions } from "./drafts-actions";
import { createCommentPreferencesActions } from "./preferences-actions";
import { createCommentReactionsActions } from "./reactions-actions";

function sharedState(): CommentStoreShared {
  return {
    commentsStoreState: undefined,
    CommentsStoreState3: null,
    CommentsStoreState6: null,
    commentsStoreValue_1: false,
    commentsStoreValue_12: false,
    commentsStoreValue0: 0,
    commentsStoreValue04: false,
    commentsStoreValue05: 0,
    moduleUrl: 'test:comment-store',
    resolveCommentsStoreValue10: () => undefined,
    resolveCommentsStoreValue11: () => undefined,
    resolveCommentsStoreValue12: () => undefined,
    resolveCommentsStoreValue13: () => undefined,
    resolveCommentsStoreValue14: () => undefined,
    resolveCommentsStoreValue15: () => '',
  };
}

describe('comment action module boundaries', () => {
  it('reads current state and current setter with the original bare-call receiver', () => {
    const shared = sharedState();
    let state = { peekDrop: null as null | { id: string; dy: number } };
    let setter = vi.fn<(this: unknown, value: unknown) => void>();
    const actions = createCommentDraftsActions({
      shared,
      get getStore() {
        return function (this: unknown) {
          expect(this).toBeUndefined();
          return state;
        };
      },
      get setStore() {
        return setter;
      },
    });
    const peekDrop = { id: 'thread', dy: 7 };
    state = { peekDrop };
    setter = vi.fn(function (this: unknown, value: unknown) {
      expect(this).toBeUndefined();
      expect(value).toEqual({ focusId: 'thread', peekDrop });
      expect((value as { peekDrop: unknown }).peekDrop).toBe(peekDrop);
    });
    actions.setFocus('thread', 7);
    expect(setter).toHaveBeenCalledOnce();
  });

  it('lets a deferred updater see fresh state after a reentrant action', () => {
    const shared = sharedState();
    let state = {
      surfaceCarrier: ['first'],
      quietPost: null,
      quietPostY: null,
    };
    const deferred: Array<(current: typeof state) => Partial<typeof state>> =
      [];
    const actions = createCommentDraftsActions({
      shared,
      getStore: () => state,
      setStore(update: unknown) {
        if (typeof update === 'function') {
          deferred.push(
            update as (current: typeof state) => Partial<typeof state>,
          );
          actions.setQuietPost('pending', 12);
        } else {
          state = { ...state, ...(update as Partial<typeof state>) };
        }
      },
    });
    actions.setSurfaceCarrier('second');
    state = { ...state, surfaceCarrier: ['first', 'concurrent'] };
    state = { ...state, ...deferred[0]!(state) };
    expect(state).toEqual({
      surfaceCarrier: ['first', 'concurrent', 'second'],
      quietPost: 'pending',
      quietPostY: 12,
    });
  });

  it('reads and writes the owner marker when a deferred updater runs', () => {
    const shared = sharedState();
    let marker: unknown = 'old';
    Object.defineProperty(shared, 'CommentsStoreState3', {
      get: () => marker,
      set: (value: unknown) => {
        marker = value;
      },
    });
    let updater: (current: unknown) => unknown = () => undefined;
    const actions = createCommentPreferencesActions({
      shared,
      setStore(update: typeof updater) {
        updater = update;
      },
    });
    actions.setResolvedIds([]);
    marker = 'latest';
    const current = {
      resolvedIds: new Set(),
      activeId: null,
      focusId: 'focused',
      showResolvedMarks: false,
    };
    expect(updater(current)).toBe(current);
    expect(resolveFocus).toHaveBeenLastCalledWith(
      expect.objectContaining({ marker: 'latest' }),
    );
    expect(marker).toBe('focused');
  });

  it('keeps the original context argument separate from injected dependencies', async () => {
    let viewer = vi.fn(() => 'stale');
    const actions = createCommentReactionsActions({
      shared: sharedState(),
      get viewerPrincipal() {
        return viewer;
      },
      getStore: undefined,
      updateComment: undefined,
      updatePageComments: undefined,
      withMutation: undefined,
      reportMutationError: undefined,
    });
    viewer = vi.fn(function (this: unknown) {
      expect(this).toBeUndefined();
      return '';
    });
    await actions.react('project', 'page', 'comment-id', 'emoji');
    expect(viewer).toHaveBeenCalledOnce();
  });
});

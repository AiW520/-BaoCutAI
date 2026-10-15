/** BaoCut: explicit live dependencies for the comment store factories. */
import type { Dynamic } from "./types";

// The owner provides accessors for shared state; factories must not snapshot it.
export interface CommentStoreShared {
  commentsStoreState: Dynamic;
  CommentsStoreState3: Dynamic;
  readonly CommentsStoreState6: Dynamic;
  readonly commentsStoreValue_1: boolean;
  commentsStoreValue_12: boolean;
  commentsStoreValue0: number;
  readonly commentsStoreValue04: boolean;
  readonly commentsStoreValue05: number;
  readonly moduleUrl: string;
  resolveCommentsStoreValue10: (..._extraArguments: unknown[]) => undefined;
  resolveCommentsStoreValue11: (..._extraArguments: unknown[]) => undefined;
  resolveCommentsStoreValue12: (..._extraArguments: unknown[]) => undefined;
  resolveCommentsStoreValue13: (..._extraArguments: unknown[]) => undefined;
  resolveCommentsStoreValue14: (..._extraArguments: unknown[]) => undefined;
  resolveCommentsStoreValue15: (..._extraArguments: unknown[]) => string;
}

export interface CommentStoreContext {
  readonly shared: CommentStoreShared;
  readonly acceptCreate: Dynamic;
  readonly clearPostingWait: Dynamic;
  readonly commentsForPage: Dynamic;
  readonly copyResolution: Dynamic;
  readonly deferredResult: Dynamic;
  readonly deleteEpochs: Dynamic;
  readonly drainOutbox: Dynamic;
  readonly ensureNotPosting: Dynamic;
  readonly forgetOutboxEntry: Dynamic;
  readonly getStore: Dynamic;
  readonly loadViewerId: Dynamic;
  readonly mutationGenerations: Dynamic;
  readonly mutationStarts: Dynamic;
  readonly pendingCreates: Dynamic;
  readonly pendingReplies: Dynamic;
  readonly replyEpochs: Dynamic;
  readonly reportMutationError: Dynamic;
  readonly reportOutboxFailure: Dynamic;
  readonly retryOutboxEntry: Dynamic;
  readonly sendOutboxEntry: Dynamic;
  readonly setOutboxStatus: Dynamic;
  readonly setStore: Dynamic;
  readonly unresolveComment: Dynamic;
  readonly updateComment: Dynamic;
  readonly updatePageComments: Dynamic;
  readonly viewerPrincipal: Dynamic;
  readonly withMutation: Dynamic;
}

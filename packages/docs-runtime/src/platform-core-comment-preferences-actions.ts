/** BaoCut: comment preferences actions; one context per store instance. */
import type { Dynamic } from "./types";
import {
  hiddenResolvedThread,
  resolveCommentsStoreIndexOf2,
  commentsStoreMap2,
  resolveCommentsStoreFocusId,
  cardDraftAtRisk,
  commentsStoreSet13,
} from "./platform-core-comments-store-4";
import { commentsStoreSet3 } from "./platform-core-comments-store-2";
import type { CommentStoreContext } from "./platform-core-comment-store-context";

export function createCommentPreferencesActions(
  commentStoreContext: Pick<CommentStoreContext, "setStore" | "shared">,
) {
  return {
    setCommentMode: (
      commentMode?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)({
        commentMode: commentMode,
      }),
    setResolvedFoldOpen: (
      resolvedFoldOpen?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          commentStore.resolvedFoldOpen === resolvedFoldOpen
            ? commentStore
            : {
                resolvedFoldOpen: resolvedFoldOpen,
              },
      ),
    setShowResolvedMarks: (
      showResolvedMarks?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (commentStore.showResolvedMarks === showResolvedMarks)
            return commentStore;
          if (showResolvedMarks)
            return {
              showResolvedMarks: showResolvedMarks,
            };
          let record2: Dynamic = {
            resolvedIds: commentStore.resolvedIds,
            showResolvedMarks: showResolvedMarks,
          };
          let hiddenResolvedThread2: Dynamic = (
            commentStore2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            commentStore2 && hiddenResolvedThread(commentStore2, record2)
              ? null
              : commentStore2;
          return {
            showResolvedMarks: showResolvedMarks,
            activeId: hiddenResolvedThread2(commentStore.activeId),
            focusId: hiddenResolvedThread2(commentStore.focusId),
          };
        },
      ),
    setResolvedIds: (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let uniqueItems: Dynamic = new (Set as Dynamic)(
            [...commentsStoreSet3]
              .map(resolveCommentsStoreIndexOf2)
              .filter(
                (operation?: Dynamic, ..._extraArguments: unknown[]) =>
                  operation.op === `resolve`,
              )
              .map(
                (
                  filteredMappedItem?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => filteredMappedItem.id,
              ),
          );
          for (let useCommentStoreResult of commentsStoreMap2.keys() as Dynamic)
            if (!uniqueItems.has(useCommentStoreResult)) {
              commentsStoreMap2.delete(useCommentStoreResult);
            }
          for (let useCommentStoreResult of commentStore as Dynamic)
            if (useCommentStoreResult.resolveId !== undefined) {
              commentsStoreMap2.set(
                useCommentStoreResult.id,
                useCommentStoreResult.resolveId,
              );
            }
          let mappedCommentStore: Dynamic = commentStore.map(
            (commentStore3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              commentStore3.id,
          );
          let resolvedIds: Dynamic = new (Set as Dynamic)(mappedCommentStore);
          for (let useCommentStoreResult of commentsStoreSet3 as Dynamic) {
            let {
              op: commentsStoreIndexOf2,
              id: commentsStoreIndexOf22,
            }: Dynamic = resolveCommentsStoreIndexOf2(useCommentStoreResult);
            if (commentsStoreIndexOf2 === `resolve`) {
              resolvedIds.add(commentsStoreIndexOf22);
            } else {
              if (commentsStoreIndexOf2 === `reopen`) {
                resolvedIds.delete(commentsStoreIndexOf22);
              }
            }
          }
          let hiddenResolvedThread2: Dynamic = (
            commentStore3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            commentStore3 &&
            hiddenResolvedThread(commentStore3, {
              resolvedIds: resolvedIds,
              showResolvedMarks: commentStore2.showResolvedMarks,
            })
              ? null
              : commentStore3;
          let matchesResolvedIdsCount =
            commentStore2.resolvedIds.size === resolvedIds.size &&
            [...resolvedIds].every(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                commentStore2.resolvedIds.has(item),
            );
          let activeId: Dynamic = hiddenResolvedThread2(commentStore2.activeId);
          let commentsStoreFocusId = resolveCommentsStoreFocusId({
            focusId: commentStore2.focusId,
            resolvedIds: resolvedIds,
            wasResolved:
              commentStore2.focusId !== null &&
              commentStore2.resolvedIds.has(commentStore2.focusId),
            showResolvedMarks: commentStore2.showResolvedMarks,
            marker: commentStoreContext.shared.CommentsStoreState3,
          });
          let cardDraftAtRisk2 = cardDraftAtRisk(commentStore2);
          let focusId: Dynamic =
            commentsStoreFocusId && !cardDraftAtRisk2
              ? hiddenResolvedThread2(commentStore2.focusId)
              : commentStore2.focusId;
          if (
            focusId === commentStore2.focusId &&
            commentsStoreFocusId &&
            cardDraftAtRisk2
          ) {
            commentStoreContext.shared.CommentsStoreState3 =
              commentStore2.focusId;
          }
          return matchesResolvedIdsCount &&
            activeId === commentStore2.activeId &&
            focusId === commentStore2.focusId
            ? commentStore2
            : {
                resolvedIds: matchesResolvedIdsCount
                  ? commentStore2.resolvedIds
                  : resolvedIds.size
                    ? resolvedIds
                    : commentsStoreSet13,
                activeId: activeId,
                focusId: focusId,
              };
        },
      ),
    setWorking(
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (options === null) {
            if (!(commentStore in commentStore2.working)) return commentStore2;
            let { [commentStore]: working, ...working2 }: Dynamic =
              commentStore2.working;
            return {
              working: working2,
            };
          }
          return commentStore2.working[commentStore] === options
            ? commentStore2
            : {
                working: {
                  ...commentStore2.working,
                  [commentStore]: options,
                },
              };
        },
      );
    },
    clearWorkingFor(
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let uniqueItems: Dynamic = new (Set as Dynamic)(
            (commentStore2.byPage[commentStore] ?? []).map(
              (byPageItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                byPageItem.id,
            ),
          );
          let filteredWorkingEntries: Dynamic = Object.entries(
            commentStore2.working,
          ).filter(
            ([workingEntry]: Dynamic, ..._extraArguments: unknown[]) =>
              !uniqueItems.has(workingEntry),
          );
          return filteredWorkingEntries.length ===
            Object.keys(commentStore2.working).length
            ? commentStore2
            : {
                working: Object.fromEntries(filteredWorkingEntries),
              };
        },
      );
    },
  };
}

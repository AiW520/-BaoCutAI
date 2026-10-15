/** BaoCut: comment reopen actions; one context per store instance. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  isTmpId,
  resolveCommentsStoreValue6,
  resolveCommentsStoreUsers,
  commentsStoreMap2,
  commentsStoreMap3,
  loadCommentsStoreLoading,
  CommentsStoreReason,
  commentDenyCopy,
  resolveCommentsStoreMessage,
  resolveCommentsStoreValue7,
} from "../store/store-4";
import { commentsStoreSet3 } from "../store/store-2";
import { toast } from "../../platform/ui/toasts";
import { api } from "../../platform/services/api-and-auth-1";
import type { CommentStoreContext } from "./store-context";

export function createCommentReopenActions(
  commentStoreContext: Pick<
    CommentStoreContext,
    | "getStore"
    | "setStore"
    | "shared"
    | "unresolveComment"
    | "updatePageComments"
    | "withMutation"
  >,
) {
  return {
    async reopen(
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      if (isTmpId(context)) return;
      let commentsStoreValue6 = resolveCommentsStoreValue6(`reopen`, context);
      if (commentsStoreSet3.has(commentsStoreValue6)) return;
      commentsStoreSet3.add(commentsStoreValue6);
      let enabled: boolean = false;
      try {
        await (0, commentStoreContext.withMutation)(
          commentStore,
          options,
          async (..._extraArguments: unknown[]): Promise<undefined> => {
            let commentsStoreUsers: Dynamic =
              resolveCommentsStoreUsers(commentStore);
            let commentsStoreMap2Entry: Dynamic =
              commentsStoreMap2.get(context);
            if (
              commentsStoreMap2Entry === undefined &&
              commentsStoreUsers !== null
            ) {
              let commentsStoreMap3Entry: Dynamic =
                commentsStoreMap3.get(context);
              if (
                commentsStoreMap3Entry !== undefined &&
                ((commentsStoreMap2Entry = await commentsStoreMap3Entry),
                commentsStoreMap2Entry === undefined)
              )
                return;
            }
            let allByPageItem: Dynamic =
              commentsStoreUsers === null
                ? undefined
                : (0, commentStoreContext.getStore)().allByPage[options]?.find(
                    (commentStore2?: Dynamic, ..._extraArguments: unknown[]) =>
                      commentStore2.id === context,
                  );
            if (
              commentsStoreMap2Entry === undefined &&
              allByPageItem !== undefined
            ) {
              if (allByPageItem.resolved)
                throw (
                  toast.error(
                    `Couldn't reopen comment — still catching up. Try again in a moment.`,
                  ),
                  Error(
                    `reopen: fold-served thread ${context} is resolved with no resolve-utterance id — unclassifiable`,
                  )
                );
              return;
            }
            let commentsStoreMap2Entry2: Dynamic = commentsStoreMap2Entry;
            let matchesCommentsStoreUsers =
              commentsStoreUsers !== null &&
              commentsStoreMap2Entry2 !== undefined;
            if (
              matchesCommentsStoreUsers &&
              commentsStoreMap2Entry2 !== undefined
            ) {
              try {
                await loadCommentsStoreLoading(
                  async (
                    commentStore2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Promise<undefined> => {
                    let commentsStoreUsers2: Dynamic = await commentsStoreUsers(
                      {
                        verb: `delete`,
                        ref: {
                          object: `utterance`,
                          id: commentsStoreMap2Entry2,
                        },
                      },
                    );
                    if (
                      commentsStoreUsers2.verdict === `deny` &&
                      !(
                        commentStore2 === 1 &&
                        commentsStoreUsers2.reason === `absent`
                      )
                    )
                      throw new (CommentsStoreReason as Dynamic)(
                        commentDenyCopy(
                          commentsStoreUsers2.reason,
                          undefined,
                          false,
                          commentsStoreUsers2.why,
                        ),
                        commentsStoreUsers2.reason,
                      );
                  },
                );
              } catch (useCommentStoreResult: Dynamic) {
                throw (
                  toast.error(
                    resolveCommentsStoreMessage(
                      useCommentStoreResult,
                      `Couldn't reopen comment`,
                    ),
                    resolveCommentsStoreValue7(useCommentStoreResult),
                  ),
                  useCommentStoreResult
                );
              }
              commentsStoreMap2.delete(context);
              enabled = true;
            } else {
              let response: Dynamic;
              try {
                response = await api.comments.reopen(context);
              } catch (useCommentStoreResult: Dynamic) {
                throw (
                  toast.error(`Couldn't reopen comment`),
                  useCommentStoreResult
                );
              }
              enabled = response.ok;
              if (!enabled) {
                console.warn(
                  `[comments] reopen conflict`,
                  context,
                  response.current,
                );
                return;
              }
            }
            let result: Dynamic = matchesCommentsStoreUsers
              ? null
              : await api.comments
                  .thread(context)
                  .catch((..._extraArguments: unknown[]) => null);
            if (
              matchesCommentsStoreUsers ||
              (result !== null && !result.resolved)
            ) {
              (0, commentStoreContext.updatePageComments)(
                options,
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  commentStore2.some(
                    (
                      rolldownNImport2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => rolldownNImport2.id === context,
                  )
                    ? commentStore2.map(
                        (
                          rolldownNImport2?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          rolldownNImport2.id === context
                            ? (result ??
                              (0, commentStoreContext.unresolveComment)(
                                rolldownNImport2,
                              ))
                            : rolldownNImport2,
                      )
                    : result
                      ? [...commentStore2, result]
                      : commentStore2,
              );
              (0, commentStoreContext.setStore)(
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  if (!commentStore2.resolvedIds.has(context))
                    return commentStore2;
                  let resolvedIds: Dynamic = new (Set as Dynamic)(
                    commentStore2.resolvedIds,
                  );
                  resolvedIds.delete(context);
                  return {
                    resolvedIds: resolvedIds,
                  };
                },
              );
            } else {
              if (!result) {
                enabled = false;
                toast.error(`Couldn't load reopened comment`);
              }
            }
          },
        );
      } finally {
        commentsStoreSet3.delete(commentsStoreValue6);
      }
      if (enabled) {
        (0, commentStoreContext.setStore)(
          (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            if (!commentStore2.autoResolved.has(context)) return commentStore2;
            let autoResolved: Dynamic = new (Map as Dynamic)(
              commentStore2.autoResolved,
            );
            autoResolved.delete(context);
            return {
              autoResolved: autoResolved,
            };
          },
        );
      }
    },
  };
}

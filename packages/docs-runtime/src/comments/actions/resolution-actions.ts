/** BaoCut: comment resolution actions; one context per store instance. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  isTmpId,
  resolveCommentsStoreValue6,
  cardDraftAtRisk,
  resolveCommentsStoreFocusId,
  resolveCommentsStoreUsers,
  CommentsStoreReason,
  commentDenyCopy,
  commentsStoreMap2,
  commentsStoreMap3,
  resolveCommentsStoreMessage,
} from "../store/store-4";
import { commentsStoreSet3 } from "../store/store-2";
import { api } from "../../platform/services/api-and-auth-1";
import type { CommentStoreContext } from "./store-context";

export function createCommentResolutionActions(
  commentStoreContext: Pick<
    CommentStoreContext,
    | "commentsForPage"
    | "copyResolution"
    | "getStore"
    | "reportMutationError"
    | "setStore"
    | "shared"
    | "updatePageComments"
    | "withMutation"
  >,
) {
  return {
    async resolve(
      commentStore?: Dynamic,
      options?: Dynamic,
      focusId?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      if (isTmpId(focusId)) return;
      let commentsStoreValue6 = resolveCommentsStoreValue6(`resolve`, focusId);
      if (!commentsStoreSet3.has(commentsStoreValue6)) {
        commentsStoreSet3.add(commentsStoreValue6);
        try {
          await (0, commentStoreContext.withMutation)(
            commentStore,
            options,
            async (..._extraArguments: unknown[]) => {
              let commentsForPage2: Dynamic = (0,
              commentStoreContext.commentsForPage)(options)?.find(
                (commentStore2?: Dynamic, ..._extraArguments: unknown[]) =>
                  commentStore2.id === focusId,
              );
              (0, commentStoreContext.updatePageComments)(
                options,
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  commentStore2.map(
                    (
                      rolldownNImport2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      rolldownNImport2.id === focusId
                        ? {
                            ...rolldownNImport2,
                            resolved: true,
                          }
                        : rolldownNImport2,
                  ),
              );
              let wasResolved: Dynamic = (0,
              commentStoreContext.getStore)().resolvedIds.has(focusId);
              if (!wasResolved) {
                (0, commentStoreContext.setStore)(
                  (
                    commentStore2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => ({
                    resolvedIds: new (Set as Dynamic)([
                      ...commentStore2.resolvedIds,
                      focusId,
                    ]),
                  }),
                );
              }
              (0, commentStoreContext.setStore)(
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  let matchesFocusId =
                    commentStore2.focusId === focusId &&
                    !cardDraftAtRisk(commentStore2);
                  let commentsStoreFocusId = resolveCommentsStoreFocusId({
                    focusId: focusId,
                    resolvedIds: commentStore2.resolvedIds,
                    wasResolved: wasResolved,
                    showResolvedMarks: commentStore2.showResolvedMarks,
                    marker: commentStoreContext.shared.CommentsStoreState3,
                  });
                  let focusId2: Dynamic = matchesFocusId
                    ? null
                    : commentStore2.focusId;
                  if (
                    commentStore2.focusId === focusId &&
                    !matchesFocusId &&
                    commentsStoreFocusId
                  ) {
                    commentStoreContext.shared.CommentsStoreState3 = focusId;
                  }
                  return commentStore2.activeId === focusId || matchesFocusId
                    ? {
                        activeId:
                          commentStore2.activeId === focusId
                            ? null
                            : commentStore2.activeId,
                        focusId: focusId2,
                      }
                    : commentStore2;
                },
              );
              let setStore2 = (..._extraArguments: unknown[]): undefined => {
                if (
                  commentStoreContext.shared.CommentsStoreState3 === focusId
                ) {
                  commentStoreContext.shared.CommentsStoreState3 = null;
                }
                if (!wasResolved) {
                  (0, commentStoreContext.setStore)(
                    (
                      commentStore2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => {
                      let resolvedIds: Dynamic = new (Set as Dynamic)(
                        commentStore2.resolvedIds,
                      );
                      resolvedIds.delete(focusId);
                      return {
                        resolvedIds: resolvedIds,
                      };
                    },
                  );
                }
              };
              let updatePageComments2 = (
                ..._extraArguments: unknown[]
              ): undefined => {
                setStore2();
                if (commentsForPage2) {
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
                        ) => rolldownNImport2.id === focusId,
                      )
                        ? commentStore2.map(
                            (
                              rolldownNImport2?: Dynamic,
                              ..._extraArguments: unknown[]
                            ): Dynamic =>
                              rolldownNImport2.id === focusId
                                ? (0, commentStoreContext.copyResolution)(
                                    rolldownNImport2,
                                    commentsForPage2,
                                  )
                                : rolldownNImport2,
                          )
                        : (0, commentStoreContext.getStore)().allByPage[
                              options
                            ] === undefined
                          ? [...commentStore2, commentsForPage2]
                          : commentStore2,
                  );
                }
              };
              try {
                let commentsStoreUsers: Dynamic =
                  resolveCommentsStoreUsers(commentStore);
                if (commentsStoreUsers === null)
                  await api.comments.resolve(focusId, dependencies);
                else {
                  let useCommentStoreResult: Dynamic = (async (
                    ..._extraArguments: unknown[]
                  ): Promise<Dynamic> => {
                    let commentsStoreUsers2: Dynamic = await commentsStoreUsers(
                      {
                        verb: `create`,
                        object: `utterance`,
                        payload: {
                          value: {
                            kind: `resolve`,
                            parent: {
                              object: `utterance`,
                              id: focusId,
                            },
                          },
                        },
                      },
                    );
                    if (commentsStoreUsers2.verdict === `deny`)
                      throw new (CommentsStoreReason as Dynamic)(
                        commentDenyCopy(
                          commentsStoreUsers2.reason,
                          undefined,
                          false,
                          commentsStoreUsers2.why,
                        ),
                        commentsStoreUsers2.reason,
                      );
                    if (commentsStoreUsers2.minted !== undefined) {
                      commentsStoreMap2.set(
                        focusId,
                        commentsStoreUsers2.minted,
                      );
                    }
                    return commentsStoreUsers2.minted;
                  })();
                  commentsStoreMap3.set(
                    focusId,
                    useCommentStoreResult.catch(
                      (..._extraArguments: unknown[]): undefined => undefined,
                    ),
                  );
                  try {
                    await useCommentStoreResult;
                  } finally {
                    commentsStoreMap3.delete(focusId);
                  }
                }
              } catch (useCommentStoreResult: Dynamic) {
                if (dependencies?.auto)
                  throw (updatePageComments2(), useCommentStoreResult);
                return (0, commentStoreContext.reportMutationError)(
                  (..._extraArguments: unknown[]) => updatePageComments2(),
                  resolveCommentsStoreMessage(
                    useCommentStoreResult,
                    `Couldn't resolve comment`,
                  ),
                  useCommentStoreResult,
                  `resolve`,
                );
              }
              if (dependencies?.auto && commentsForPage2) {
                (0, commentStoreContext.setStore)(
                  (
                    commentStore2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    let autoResolved: Dynamic = new (Map as Dynamic)(
                      commentStore2.autoResolved,
                    );
                    autoResolved.set(focusId, commentsForPage2.target);
                    return {
                      autoResolved: autoResolved,
                    };
                  },
                );
              }
            },
          );
        } finally {
          commentsStoreSet3.delete(commentsStoreValue6);
        }
      }
    },
  };
}

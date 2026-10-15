/** BaoCut: comment mutations actions; one context per store instance. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  commentWords,
  nothingToSee,
  resolveCommentsStoreEmptyComment,
  resolveCommentsStoreUsers,
  loadCommentsStoreLoading,
  CommentsStoreReason,
  commentDenyCopy,
  resolveCommentsStoreMessage,
  landedSummon,
  isTmpId,
  resolveCommentsStoreValue6,
  commentsStoreMap3,
} from "../store/store-4";
import { api } from "../../platform/services/api-and-auth-1";
import { commentsStoreSet3 } from "../store/store-2";
import type { CommentStoreContext } from "./store-context";

export function createCommentMutationsActions(
  commentStoreContext: Pick<
    CommentStoreContext,
    | "commentsForPage"
    | "ensureNotPosting"
    | "getStore"
    | "reportMutationError"
    | "shared"
    | "updateComment"
    | "updatePageComments"
    | "withMutation"
  >,
) {
  return {
    async edit(
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument?: Dynamic,
      argument2: Dynamic = `Couldn't save edit`,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      (0, commentStoreContext.ensureNotPosting)(context);
      let body: Dynamic = commentWords(dependencies);
      if (nothingToSee(body)) throw resolveCommentsStoreEmptyComment();
      let file: Dynamic = (0, commentStoreContext.getStore)().summonFile;
      return (0, commentStoreContext.withMutation)(
        commentStore,
        options,
        async (..._extraArguments: unknown[]): Promise<undefined> => {
          let useCommentStoreResult: Dynamic;
          (0, commentStoreContext.updatePageComments)(
            options,
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              (0, commentStoreContext.updateComment)(
                commentStore2,
                context,
                (
                  commentStore3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => (
                  (useCommentStoreResult = commentStore3),
                  {
                    ...commentStore3,
                    body: body,
                    edited: true,
                  }
                ),
              ),
          );
          let threadId: Dynamic = (0, commentStoreContext.commentsForPage)(
            options,
          )?.find(
            (file2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              file2.root.id === context ||
              file2.replies.some(
                (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                  reply.id === context,
              ),
          )?.id;
          let enabled = true;
          try {
            let commentsStoreUsers: Dynamic =
              resolveCommentsStoreUsers(commentStore);
            if (commentsStoreUsers === null) {
              await api.comments.edit(context, body);
            } else {
              await loadCommentsStoreLoading(
                async (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Promise<undefined> => {
                  if (commentStore2 === 1) {
                    let useCommentStoreResult2: Dynamic;
                    for (let file2 of [
                      ...((0, commentStoreContext.getStore)().byPage[options] ??
                        []),
                      ...((0, commentStoreContext.getStore)().allByPage[
                        options
                      ] ?? []),
                    ] as Dynamic)
                      useCommentStoreResult2 ??=
                        file2.root.id === context
                          ? file2.root
                          : file2.replies.find(
                              (
                                reply?: Dynamic,
                                ..._extraArguments: unknown[]
                              ) => reply.id === context,
                            );
                    if (
                      useCommentStoreResult2 !== undefined &&
                      useCommentStoreResult2.body !== body
                    ) {
                      enabled = false;
                      return;
                    }
                  }
                  let commentsStoreUsers2: Dynamic = await commentsStoreUsers({
                    verb: `update`,
                    ref: {
                      object: `utterance`,
                      id: context,
                    },
                    payload: {
                      kind: `patch`,
                      patch: [
                        {
                          op: `set`,
                          path: [`body`],
                          value: body,
                        },
                      ],
                    },
                  });
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
                },
              );
            }
          } catch (useCommentStoreResult2: Dynamic) {
            (0, commentStoreContext.reportMutationError)(
              (..._extraArguments: unknown[]): Dynamic =>
                useCommentStoreResult &&
                (0, commentStoreContext.updatePageComments)(
                  options,
                  (
                    commentStore2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    (0, commentStoreContext.updateComment)(
                      commentStore2,
                      context,
                      (..._extraArguments: unknown[]): Dynamic =>
                        useCommentStoreResult,
                    ),
                ),
              resolveCommentsStoreMessage(useCommentStoreResult2, argument2),
              useCommentStoreResult2,
              `edit`,
            );
          }
          if (
            argument?.toClaude === true &&
            threadId !== undefined &&
            enabled
          ) {
            let block: Dynamic = Object.hasOwn(
              (0, commentStoreContext.getStore)().summonBlocks,
              threadId,
            )
              ? (0, commentStoreContext.getStore)().summonBlocks[threadId]
              : argument.block;
            let summonTopItem: Dynamic = Object.hasOwn(
              (0, commentStoreContext.getStore)().summonTops,
              threadId,
            )
              ? (0, commentStoreContext.getStore)().summonTops[threadId]
              : argument.y;
            let anchorStart: Dynamic = Object.hasOwn(
              (0, commentStoreContext.getStore)().summonAnchorStarts,
              threadId,
            )
              ? (0, commentStoreContext.getStore)().summonAnchorStarts[threadId]
              : undefined;
            landedSummon({
              threadId: threadId,
              body: body,
              to: [],
              summon: true,
              ...(argument.page === true && {
                page: true,
              }),
              ...(block && {
                block: block,
              }),
              ...(summonTopItem !== undefined && {
                y: summonTopItem,
              }),
              ...(anchorStart !== undefined && {
                anchorStart: anchorStart,
              }),
              ...(file !== null && {
                file: file,
              }),
              ...(argument.pressedAt !== undefined && {
                pressedAt: argument.pressedAt,
              }),
            });
          }
        },
      );
    },
    async remove(
      entry?: Dynamic,
      options?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      if (isTmpId(options2)) return;
      let commentsStoreValue6 = resolveCommentsStoreValue6(`remove`, options2);
      if (!commentsStoreSet3.has(commentsStoreValue6)) {
        commentsStoreSet3.add(commentsStoreValue6);
        try {
          return await (0, commentStoreContext.withMutation)(
            entry,
            options,
            async (..._extraArguments: unknown[]): Promise<undefined> => {
              let commentsStoreUsers: Dynamic =
                resolveCommentsStoreUsers(entry);
              let commentsStoreMap3Entry: Dynamic =
                commentsStoreMap3.get(options2);
              if (commentsStoreMap3Entry !== undefined) {
                await commentsStoreMap3Entry;
              }
              let useCommentStoreHandler = (
                ..._extraArguments: unknown[]
              ): undefined => {};
              (0, commentStoreContext.updatePageComments)(
                options,
                (
                  commentStore?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  let commentStoreIndex: Dynamic = commentStore.findIndex(
                    (file?: Dynamic, ..._extraArguments: unknown[]) =>
                      file.root.id === options2,
                  );
                  if (commentStoreIndex >= 0) {
                    let commentStoreItem: Dynamic =
                      commentStore[commentStoreIndex];
                    useCommentStoreHandler = (..._extraArguments: unknown[]) =>
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
                            ) => rolldownNImport2.id === commentStoreItem.id,
                          )
                            ? commentStore2
                            : [
                                ...commentStore2.slice(0, commentStoreIndex),
                                commentStoreItem,
                                ...commentStore2.slice(commentStoreIndex),
                              ],
                      );
                    return commentStore.filter(
                      (
                        rolldownNImport2?: unknown,
                        index?: Dynamic,
                        ..._extraArguments: unknown[]
                      ) => index !== commentStoreIndex,
                    );
                  }
                  for (let useCommentStoreResult of commentStore as Dynamic) {
                    let replyIndex: Dynamic =
                      useCommentStoreResult.replies.findIndex(
                        (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                          reply.id === options2,
                      );
                    if (replyIndex < 0) continue;
                    let replyItem: Dynamic =
                      useCommentStoreResult.replies[replyIndex];
                    useCommentStoreHandler = (..._extraArguments: unknown[]) =>
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
                              rolldownNImport2.id ===
                                useCommentStoreResult.id &&
                              !rolldownNImport2.replies.some(
                                (
                                  reply?: Dynamic,
                                  ..._extraArguments: unknown[]
                                ) => reply.id === options2,
                              )
                                ? {
                                    ...rolldownNImport2,
                                    replies: [
                                      ...rolldownNImport2.replies.slice(
                                        0,
                                        replyIndex,
                                      ),
                                      replyItem,
                                      ...rolldownNImport2.replies.slice(
                                        replyIndex,
                                      ),
                                    ],
                                  }
                                : rolldownNImport2,
                          ),
                      );
                    return commentStore.map(
                      (
                        rolldownNImport2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        rolldownNImport2.id === useCommentStoreResult.id
                          ? {
                              ...rolldownNImport2,
                              replies: rolldownNImport2.replies.filter(
                                (
                                  reply?: Dynamic,
                                  ..._extraArguments: unknown[]
                                ) => reply.id !== options2,
                              ),
                            }
                          : rolldownNImport2,
                    );
                  }
                  return commentStore;
                },
              );
              try {
                if (commentsStoreUsers === null) {
                  await api.comments.remove(options2);
                } else {
                  await loadCommentsStoreLoading(
                    async (
                      commentStore?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Promise<undefined> => {
                      let commentsStoreUsers2: Dynamic =
                        await commentsStoreUsers({
                          verb: `delete`,
                          ref: {
                            object: `utterance`,
                            id: options2,
                          },
                        });
                      if (
                        commentsStoreUsers2.verdict === `deny` &&
                        !(
                          commentStore === 1 &&
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
                }
              } catch (useCommentStoreResult: Dynamic) {
                (0, commentStoreContext.reportMutationError)(
                  useCommentStoreHandler,
                  resolveCommentsStoreMessage(
                    useCommentStoreResult,
                    `Couldn't delete comment`,
                  ),
                  useCommentStoreResult,
                  `delete`,
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

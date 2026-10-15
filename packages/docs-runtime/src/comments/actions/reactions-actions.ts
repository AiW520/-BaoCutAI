/** BaoCut: comment reactions actions; one context per store instance. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  isTmpId,
  resolveCommentsStoreUsers,
  CommentsStoreReason,
  commentDenyCopy,
  resolveCommentsStoreMessage,
  REACTION_NOT_REMOVED_WORDS,
} from "../store/store-4";
import { api } from "../../platform/services/api-and-auth-1";
import { emitTelemetryEvent } from "../../platform/observability/telemetry-3";
import { createPagesReactionVerdictEvent2 } from "../../platform/observability/browser-and-operation-events-1";
import { toast } from "../../platform/ui/toasts";
import type { CommentStoreContext } from "./store-context";

export function createCommentReactionsActions(
  commentStoreContext: Pick<
    CommentStoreContext,
    | "getStore"
    | "reportMutationError"
    | "shared"
    | "updateComment"
    | "updatePageComments"
    | "viewerPrincipal"
    | "withMutation"
  >,
) {
  return {
    async react(
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      emoji?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      if (isTmpId(context)) return;
      let user: Dynamic = (0, commentStoreContext.viewerPrincipal)();
      if (!user) return;
      let commentsStoreUsers: Dynamic = resolveCommentsStoreUsers(commentStore);
      if (commentsStoreUsers === null)
        return (0, commentStoreContext.withMutation)(
          commentStore,
          options,
          async (..._extraArguments: unknown[]): Promise<undefined> => {
            let useCommentStoreResult: Dynamic;
            (0, commentStoreContext.updatePageComments)(
              options,
              (
                commentStore2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                (0, commentStoreContext.updateComment)(
                  commentStore2,
                  context,
                  (
                    commentStore3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    useCommentStoreResult = commentStore3;
                    let reactionItem2: Dynamic =
                      commentStore3.reactions?.[emoji] ?? [];
                    let reactionItemIndex: Dynamic = reactionItem2.findIndex(
                      (
                        reactionItem3?: Dynamic,
                        ..._extraArguments: unknown[]
                      ) =>
                        reactionItem3.user === user &&
                        !reactionItem3.actor.startsWith(`agent`),
                    );
                    let filteredReactionItem: Dynamic =
                      reactionItemIndex >= 0
                        ? reactionItem2.filter(
                            (
                              reactionItem3?: unknown,
                              index?: Dynamic,
                              ..._extraArguments: unknown[]
                            ) => index !== reactionItemIndex,
                          )
                        : [
                            ...reactionItem2,
                            {
                              user: user,
                              actor: `human`,
                            },
                          ];
                    let reactions: Dynamic = {
                      ...commentStore3.reactions,
                    };
                    if (filteredReactionItem.length === 0) {
                      delete reactions[emoji];
                    } else {
                      reactions[emoji] = filteredReactionItem;
                    }
                    return {
                      ...commentStore3,
                      reactions: reactions,
                    };
                  },
                ),
            );
            try {
              await api.comments.react(context, emoji);
              emitTelemetryEvent(createPagesReactionVerdictEvent2(`react`));
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
                `Couldn't save reaction`,
                useCommentStoreResult2,
                `react`,
              );
            }
          },
        );
      let store: Dynamic = (0, commentStoreContext.getStore)();
      let useCommentStoreHandler: Dynamic = (
        commentStore2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        commentStore2?.find(
          (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            file.root.id === context ||
            file.replies.some(
              (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                reply.id === context,
            ),
        );
      let useCommentStoreHandler2: Dynamic =
        useCommentStoreHandler(store.byPage[options]) ??
        useCommentStoreHandler(store.allByPage[options]);
      let useCommentStoreHandler3: Dynamic =
        useCommentStoreHandler2 &&
        (useCommentStoreHandler2.root.id === context
          ? useCommentStoreHandler2.root
          : useCommentStoreHandler2.replies.find(
              (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                reply.id === context,
            ));
      if (!useCommentStoreHandler3)
        throw (
          toast.error(
            `That reaction isn't editable from here yet — it lands with the comments read flip.`,
          ),
          Error(
            `react: row in neither byPage nor allByPage — direction unjudgeable (comments read-flip seam)`,
          )
        );
      let reactionItem: Dynamic = useCommentStoreHandler3.reactions?.[
        emoji
      ]?.find(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]) =>
          commentStore2.user === user &&
          !commentStore2.actor.startsWith(`agent`),
      );
      if (reactionItem !== undefined) {
        if (reactionItem.id === undefined)
          throw (
            toast.error(
              `Removing a reaction isn't wired to the new comments plane yet — it lands with the comments read flip.`,
            ),
            Error(`un-react: reaction-utterance id not served (v1 read plane)`)
          );
        let id: Dynamic = reactionItem.id;
        return (0, commentStoreContext.withMutation)(
          commentStore,
          options,
          async (..._extraArguments: unknown[]): Promise<undefined> => {
            let useCommentStoreResult: Dynamic;
            (0, commentStoreContext.updatePageComments)(
              options,
              (
                commentStore2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                (0, commentStoreContext.updateComment)(
                  commentStore2,
                  context,
                  (
                    commentStore3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    useCommentStoreResult = commentStore3;
                    let filteredReactionItem: Dynamic = (
                      commentStore3.reactions?.[emoji] ?? []
                    ).filter(
                      (
                        reactionItem2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ) => reactionItem2.id !== id,
                    );
                    let { [emoji]: reactions, ...reactions2 }: Dynamic =
                      commentStore3.reactions ?? {};
                    return {
                      ...commentStore3,
                      reactions:
                        filteredReactionItem.length > 0
                          ? {
                              ...reactions2,
                              [emoji]: filteredReactionItem,
                            }
                          : reactions2,
                    };
                  },
                ),
            );
            try {
              let commentsStoreUsers2: Dynamic = await commentsStoreUsers({
                verb: `delete`,
                ref: {
                  object: `utterance`,
                  id: id,
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
              emitTelemetryEvent(createPagesReactionVerdictEvent2(`unreact`));
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
                resolveCommentsStoreMessage(
                  useCommentStoreResult2,
                  REACTION_NOT_REMOVED_WORDS,
                ),
                useCommentStoreResult2,
                `unreact`,
              );
            }
          },
        );
      }
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
                ): Dynamic => {
                  useCommentStoreResult = commentStore3;
                  let reactionItem2: Dynamic =
                    commentStore3.reactions?.[emoji] ?? [];
                  return {
                    ...commentStore3,
                    reactions: {
                      ...commentStore3.reactions,
                      [emoji]: [
                        ...reactionItem2,
                        {
                          user: user,
                          actor: `human`,
                        },
                      ],
                    },
                  };
                },
              ),
          );
          try {
            let commentsStoreUsers2: Dynamic = await commentsStoreUsers({
              verb: `create`,
              object: `utterance`,
              payload: {
                value: {
                  kind: `reaction`,
                  emoji: emoji,
                  parent: {
                    object: `utterance`,
                    id: context,
                  },
                },
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
            emitTelemetryEvent(createPagesReactionVerdictEvent2(`react`));
            let minted: Dynamic = commentsStoreUsers2.minted;
            if (minted !== undefined) {
              (0, commentStoreContext.updatePageComments)(
                options,
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  (0, commentStoreContext.updateComment)(
                    commentStore2,
                    context,
                    (
                      commentStore3?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => {
                      let reactionItem2: Dynamic =
                        commentStore3.reactions?.[emoji] ?? [];
                      let findLastIndex: Dynamic = reactionItem2.findLastIndex(
                        (
                          commentStore4?: Dynamic,
                          ..._extraArguments: unknown[]
                        ) =>
                          commentStore4.user === user &&
                          commentStore4.actor === `human` &&
                          commentStore4.id === undefined,
                      );
                      if (findLastIndex < 0) return commentStore3;
                      let items: Dynamic = [...reactionItem2];
                      items[findLastIndex] = {
                        ...reactionItem2[findLastIndex],
                        id: minted,
                      };
                      return {
                        ...commentStore3,
                        reactions: {
                          ...commentStore3.reactions,
                          [emoji]: items,
                        },
                      };
                    },
                  ),
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
              resolveCommentsStoreMessage(
                useCommentStoreResult2,
                `Couldn't save reaction`,
              ),
              useCommentStoreResult2,
              `react`,
            );
          }
        },
      );
    },
  };
}

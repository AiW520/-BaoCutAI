/** BaoCut: comment reply actions; one context per store instance. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  commentWords,
  nothingToSee,
  resolveCommentsStoreEmptyComment,
  isTmpId,
  commentsStoreMap8,
  resolveCommentsStoreUsers,
  CommentsStoreState4,
  resolveCommentsStoreToString,
  landedSummon,
  resolveCommentsStoreMessage,
  resolveCommentsStoreValue16,
  resolveCommentsStoreAuthor,
  commentsStoreMap12,
  commentsStoreMap20,
  commentsStoreMap10,
  resolveCommentsStoreValue9,
  resolveCommentsStoreValue7,
  CommentQueuedError,
} from "../store/store-4";
import { preloadModule } from "../../platform/dependencies";
import { DataModelSchemasANCHORLABELMAX } from "../../platform/data/model-schemas-3";
import {
  resolveDataModelSchemasValue28,
  loadDataModelSchemasUtteranceTo,
  filterDataModelSchemasFilter4,
} from "../../platform/data/model-schemas-4";
import { frameMentioned } from "../../platform/observability/browser-and-operation-events-4";
import { api } from "../../platform/services/api-and-auth-1";
import { toast } from "../../platform/ui/toasts";
import type { CommentStoreContext } from "./store-context";

export function createCommentReplyActions(
  commentStoreContext: Pick<
    CommentStoreContext,
    | "deferredResult"
    | "ensureNotPosting"
    | "getStore"
    | "pendingReplies"
    | "reportMutationError"
    | "reportOutboxFailure"
    | "sendOutboxEntry"
    | "setOutboxStatus"
    | "shared"
    | "updatePageComments"
    | "viewerPrincipal"
    | "withMutation"
  >,
) {
  return {
    async reply(
      container?: Dynamic,
      pageId?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument?: Dynamic,
      argument2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let body: Dynamic = commentWords(dependencies);
      if (nothingToSee(body)) throw resolveCommentsStoreEmptyComment();
      let commentsStoreMap8Entry: Dynamic = isTmpId(context)
        ? commentsStoreMap8.get(context)
        : undefined;
      if (commentsStoreMap8Entry === undefined) {
        (0, commentStoreContext.ensureNotPosting)(context);
      }
      let commentsStoreUsers: Dynamic = resolveCommentsStoreUsers(container);
      let pid: Dynamic = CommentsStoreState4;
      let threadId: Dynamic =
        commentsStoreMap8Entry === undefined
          ? context
          : await commentsStoreMap8Entry;
      return (0, commentStoreContext.withMutation)(
        container,
        pageId,
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let tmpId = resolveCommentsStoreToString();
          let user: Dynamic = (0, commentStoreContext.viewerPrincipal)() ?? ``;
          let record2: Dynamic = {
            id: tmpId,
            user: user,
            actor: `human`,
            at: new Date().toISOString(),
            body: body,
            to: argument,
          };
          (0, commentStoreContext.updatePageComments)(
            pageId,
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              commentStore.map(
                (
                  rolldownNImport2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  rolldownNImport2.id === threadId
                    ? {
                        ...rolldownNImport2,
                        replies: [...rolldownNImport2.replies, record2],
                      }
                    : rolldownNImport2,
              ),
          );
          let updatePageComments2: Dynamic = (..._extraArguments: unknown[]) =>
            (0, commentStoreContext.updatePageComments)(
              pageId,
              (
                commentStore?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                commentStore
                  .filter(
                    (
                      rolldownNImport2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => rolldownNImport2.id !== tmpId,
                  )
                  .map(
                    (
                      filteredRolldownNImport?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      filteredRolldownNImport.id === threadId
                        ? {
                            ...filteredRolldownNImport,
                            replies: filteredRolldownNImport.replies.filter(
                              (
                                reply?: Dynamic,
                                ..._extraArguments: unknown[]
                              ) => reply.id !== tmpId,
                            ),
                          }
                        : filteredRolldownNImport,
                  ),
            );
          let argument3: Dynamic =
            argument ??
            (
              await preloadModule(
                async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                  let { extractMentions: extractMentions2 }: Dynamic =
                    await Promise.resolve().then(
                      (..._extraArguments: unknown[]): Dynamic =>
                        DataModelSchemasANCHORLABELMAX,
                    );
                  return {
                    extractMentions: extractMentions2,
                  };
                },
                undefined,
                commentStoreContext.shared.moduleUrl,
              )
            ).extractMentions(body);
          let matchesToClaude = argument2?.toClaude === true;
          let argument4: Dynamic =
            commentsStoreUsers !== null &&
            resolveDataModelSchemasValue28(matchesToClaude, body, argument3) &&
            (await loadDataModelSchemasUtteranceTo())
              ? argument3
              : null;
          let useCommentStoreHandler = (
            ..._extraArguments: unknown[]
          ): undefined => {
            argument3?.length;
          };
          let file: Dynamic = (0, commentStoreContext.getStore)().summonFile;
          let summon = (..._extraArguments: unknown[]): undefined => {
            let block: Dynamic = Object.hasOwn(
              (0, commentStoreContext.getStore)().summonBlocks,
              threadId,
            )
              ? (0, commentStoreContext.getStore)().summonBlocks[threadId]
              : argument2?.block;
            let summonTopItem: Dynamic = Object.hasOwn(
              (0, commentStoreContext.getStore)().summonTops,
              threadId,
            )
              ? (0, commentStoreContext.getStore)().summonTops[threadId]
              : argument2?.y;
            let anchorStart: Dynamic = Object.hasOwn(
              (0, commentStoreContext.getStore)().summonAnchorStarts,
              threadId,
            )
              ? (0, commentStoreContext.getStore)().summonAnchorStarts[threadId]
              : undefined;
            let matchesToClaude2 = matchesToClaude;
            landedSummon({
              threadId: threadId,
              body: body,
              to: argument3,
              ...(matchesToClaude2 && {
                summon: true,
              }),
              ...(argument2?.page === true && {
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
              ...(matchesToClaude2 &&
                argument2?.pressedAt !== undefined && {
                  pressedAt: argument2.pressedAt,
                }),
            });
            frameMentioned(argument3, user);
          };
          let useCommentStoreResult: Dynamic;
          if (commentsStoreUsers === null || pid === null)
            try {
              useCommentStoreResult = (
                await api.comments.create({
                  container: container,
                  body: body,
                  replyTo: threadId,
                  to: argument3,
                })
              ).id;
            } catch (useCommentStoreResult2: Dynamic) {
              return (0, commentStoreContext.reportMutationError)(
                updatePageComments2,
                resolveCommentsStoreMessage(
                  useCommentStoreResult2,
                  `Couldn't post reply`,
                ),
                useCommentStoreResult2,
                `reply`,
              );
            }
          else {
            let record3: Dynamic = {
              opId: resolveCommentsStoreValue16(),
              pid: pid,
              container: container,
              pageId: pageId,
              tmpId: tmpId,
              kind: `reply`,
              parent: threadId,
              value: filterDataModelSchemasFilter4(
                {
                  body: body,
                  parent: {
                    object: `utterance`,
                    id: threadId,
                  },
                },
                argument4,
              ),
              body: body,
              ...(argument3 && {
                to: argument3,
              }),
              createdAt: record2.at,
              attempts: 0,
              author: resolveCommentsStoreAuthor(pid),
            };
            commentsStoreMap12.set(tmpId, record3);
            commentsStoreMap20.get(pid)?.put(record3);
            commentsStoreMap10.set(tmpId, resolveCommentsStoreValue9());
            let useCommentStoreResult2: Dynamic;
            try {
              useCommentStoreResult2 = await (0,
              commentStoreContext.sendOutboxEntry)(record3, `reply`);
            } catch (useCommentStoreResult3: Dynamic) {
              throw (
                commentsStoreMap12.delete(tmpId),
                (0, commentStoreContext.setOutboxStatus)(tmpId, null),
                updatePageComments2(),
                toast.error(
                  resolveCommentsStoreMessage(
                    useCommentStoreResult3,
                    `Couldn't post reply`,
                  ),
                  resolveCommentsStoreValue7(useCommentStoreResult3),
                ),
                useCommentStoreResult3
              );
            }
            if (
              typeof useCommentStoreResult2 != `string` &&
              useCommentStoreResult2.discarded === true
            )
              throw Error(`discarded`);
            if (typeof useCommentStoreResult2 != `string`) {
              let landed: Dynamic = (0, commentStoreContext.deferredResult)();
              throw (
                commentStoreContext.pendingReplies.set(tmpId, {
                  after: (..._extraArguments: unknown[]): undefined => {
                    useCommentStoreHandler();
                    summon();
                  },
                  summon: summon,
                  landed: landed,
                }),
                useCommentStoreResult2.unconfirmed !== true &&
                  (0, commentStoreContext.reportOutboxFailure)(
                    useCommentStoreResult2.held,
                  ),
                new (CommentQueuedError as Dynamic)(
                  useCommentStoreResult2.held,
                  landed.promise,
                )
              );
            }
            (0, commentStoreContext.setOutboxStatus)(tmpId, null);
            useCommentStoreResult = useCommentStoreResult2;
          }
          useCommentStoreHandler();
          let result: Dynamic =
            commentsStoreUsers === null
              ? await api.comments
                  .thread(threadId)
                  .catch((..._extraArguments: unknown[]) => null)
              : null;
          (0, commentStoreContext.updatePageComments)(
            pageId,
            (
              commentStore?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let filteredCommentStore: Dynamic = commentStore.some(
                (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                  rolldownNImport2.id === tmpId,
              )
                ? commentStore.filter(
                    (
                      rolldownNImport2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => rolldownNImport2.id !== tmpId,
                  )
                : commentStore;
              return result?.resolved
                ? filteredCommentStore.map(
                    (
                      filteredCommentStore2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      filteredCommentStore2.id === threadId
                        ? {
                            ...filteredCommentStore2,
                            resolved: true,
                          }
                        : filteredCommentStore2,
                  )
                : filteredCommentStore.map(
                    (
                      filteredCommentStore2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      filteredCommentStore2.id === threadId
                        ? (result ?? {
                            ...filteredCommentStore2,
                            replies: filteredCommentStore2.replies.some(
                              (
                                reply?: Dynamic,
                                ..._extraArguments: unknown[]
                              ) => reply.id === useCommentStoreResult,
                            )
                              ? filteredCommentStore2.replies.filter(
                                  (
                                    reply?: Dynamic,
                                    ..._extraArguments: unknown[]
                                  ) => reply.id !== tmpId,
                                )
                              : filteredCommentStore2.replies.map(
                                  (
                                    reply?: Dynamic,
                                    ..._extraArguments: unknown[]
                                  ): Dynamic =>
                                    reply.id === tmpId
                                      ? {
                                          ...reply,
                                          id: useCommentStoreResult,
                                        }
                                      : reply,
                                ),
                          })
                        : filteredCommentStore2,
                  );
            },
          );
          summon();
          return useCommentStoreResult;
        },
      );
    },
  };
}

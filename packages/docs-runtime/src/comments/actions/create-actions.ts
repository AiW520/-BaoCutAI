/** BaoCut: comment create actions; one context per store instance. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  commentWords,
  nothingToSee,
  resolveCommentsStoreEmptyComment,
  resolveCommentsStoreToString,
  quietCarrierThreads,
  commentsStoreMap8,
  resolveCommentsStoreResolved,
  resolveCommentsStoreNode3,
  CommentsStoreState4,
  rootCommentViaDoor,
  resolveCommentsStoreValue17,
  resolveCommentsStoreParent,
  resolveCommentsStoreValue18,
  commentsStoreSet7,
  resolveCommentsStoreMessage,
  resolveCommentsStoreValue16,
  resolveCommentsStoreAuthor,
  commentsStoreMap12,
  commentsStoreMap20,
  commentsStoreMap10,
  resolveCommentsStoreValue9,
  resolveCommentsStoreValue7,
  CommentQueuedError,
  resolveCommentsStoreImul,
  commentsStoreMap18,
  updateCommentsStoreBodyKey,
  commentsStoreMap14,
  commentsStoreMap11,
  resolveCommentsStoreSet2,
} from "../store/store-4";
import {
  resolveDataModelSchemasDatumGroup,
  resolveDataModelSchemasNodeCite,
  resolveDataModelSchemasOriginQuote,
  resolveDataModelSchemasParentLabel,
  resolveDataModelSchemasValue28,
  loadDataModelSchemasUtteranceTo,
} from "../../platform/data/model-schemas-4";
import { api } from "../../platform/services/api-and-auth-1";
import { toast } from "../../platform/ui/toasts";
import { emitTelemetryEvent } from "../../platform/observability/telemetry-3";
import { createPagesCommentWithdrawEvent } from "../../platform/observability/browser-and-operation-events-1";
import type { CommentStoreContext } from "./store-context";

export function createCommentCreateActions(
  commentStoreContext: Pick<
    CommentStoreContext,
    | "acceptCreate"
    | "clearPostingWait"
    | "deferredResult"
    | "drainOutbox"
    | "forgetOutboxEntry"
    | "getStore"
    | "pendingCreates"
    | "pendingReplies"
    | "reportMutationError"
    | "reportOutboxFailure"
    | "retryOutboxEntry"
    | "sendOutboxEntry"
    | "setOutboxStatus"
    | "setStore"
    | "shared"
    | "updatePageComments"
    | "viewerPrincipal"
    | "withMutation"
  >,
) {
  return {
    create(
      container: Dynamic,
      pageId: Dynamic,
      {
        body: body,
        target: target,
        to: to,
        path: path,
        y: y6,
        focus: focus,
        roomNode: roomNode,
        roomIdRange: roomIdRange,
        roomCellIds: roomCellIds,
        roomWidget: roomWidget,
        untrustedDm: untrustedDm,
        summonBlock: summonBlock,
        summon: summon,
        toClaude: toClaude,
        pressedAt: pressedAt,
        quietCarrier: quietCarrier,
        summonText: summonText,
        summonOwedTo: summonOwedTo,
        docId: docId,
        label: label,
        labelWhole: labelWhole,
      }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let body2: Dynamic = commentWords(body);
      return nothingToSee(body2)
        ? Promise.reject(resolveCommentsStoreEmptyComment())
        : (0, commentStoreContext.withMutation)(
            container,
            pageId,
            async (..._extraArguments: unknown[]): Promise<Dynamic> => {
              let focusId = resolveCommentsStoreToString();
              let user: Dynamic =
                (0, commentStoreContext.viewerPrincipal)() ?? ``;
              let createdAt = new Date().toISOString();
              let anchorStart: Dynamic =
                roomNode !== undefined &&
                roomWidget === undefined &&
                !container.startsWith(`users/`)
                  ? roomIdRange?.[0]
                  : undefined;
              let record2: Dynamic = {
                id: focusId,
                target: target,
                resolved: quietCarrier === true,
                root: {
                  id: focusId,
                  user: user,
                  actor: `human`,
                  at: createdAt,
                  body: body2,
                  to: to,
                },
                replies: [],
              };
              if (quietCarrier === true) {
                quietCarrierThreads.add(focusId);
              }
              if (y6 != null && quietCarrier !== true) {
                (0, commentStoreContext.setStore)(
                  (
                    commentStore?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => ({
                    optimisticY: {
                      ...commentStore.optimisticY,
                      [focusId]: y6,
                    },
                  }),
                );
              }
              if (focus) {
                (0, commentStoreContext.setStore)({
                  focusId: focusId,
                  peekDrop: null,
                });
              }
              (0, commentStoreContext.updatePageComments)(
                pageId,
                (
                  commentStore?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => [...commentStore, record2],
              );
              let minted: Dynamic;
              let promise: Dynamic = new (Promise as Dynamic)(
                (
                  resolve?: Dynamic,
                  err?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  (minted = {
                    ok: resolve,
                    err: err,
                  }),
              );
              promise.catch((..._extraArguments: unknown[]): undefined => {});
              commentsStoreMap8.set(focusId, promise);
              let setStore2 = (..._extraArguments: unknown[]): undefined => {
                (0, commentStoreContext.updatePageComments)(
                  pageId,
                  (
                    commentStore?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    commentStore.filter(
                      (
                        rolldownNImport2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ) => rolldownNImport2.id !== focusId,
                    ),
                );
                (0, commentStoreContext.setStore)(
                  (
                    commentStore?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    let amount = focusId in commentStore.optimisticY;
                    let matchesFocusId = commentStore.focusId === focusId;
                    if (!amount && !matchesFocusId) return commentStore;
                    let { [focusId]: optimisticY, ...optimisticY2 }: Dynamic =
                      commentStore.optimisticY;
                    return {
                      ...(amount && {
                        optimisticY: optimisticY2,
                      }),
                      ...(matchesFocusId && {
                        focusId: null,
                        peekDrop: null,
                      }),
                    };
                  },
                );
              };
              let citation: Dynamic = roomWidget?.citation;
              let record3: Dynamic =
                citation !== undefined &&
                ((resolveCommentsStoreResolved(citation) &&
                  !(await resolveDataModelSchemasDatumGroup())) ||
                  (resolveCommentsStoreNode3(citation) &&
                    !(await resolveDataModelSchemasNodeCite())))
                  ? {}
                  : citation;
              let matchesRecord = record3 !== citation;
              let record4: Dynamic =
                record3?.origin !== undefined &&
                !(await resolveDataModelSchemasOriginQuote())
                  ? ((
                      { origin: origin, ...commentStore }: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => commentStore)(record3)
                  : record3;
              let labelWhole2: Dynamic = matchesRecord ? labelWhole : label;
              let labelWhole3: Dynamic =
                labelWhole2 !== undefined &&
                (await resolveDataModelSchemasParentLabel())
                  ? labelWhole2
                  : undefined;
              let to2: Dynamic =
                resolveDataModelSchemasValue28(toClaude === true, body2, to) &&
                (await loadDataModelSchemasUtteranceTo())
                  ? (to ?? [])
                  : null;
              let pid: Dynamic = CommentsStoreState4;
              let commentsStoreValue17: Dynamic =
                pid === null || container.startsWith(`users/`)
                  ? undefined
                  : roomWidget === undefined
                    ? roomNode === undefined
                      ? rootCommentViaDoor(target, labelWhole3, to2) ===
                        undefined
                        ? undefined
                        : resolveCommentsStoreValue17(
                            target,
                            body2,
                            labelWhole3,
                            to2,
                          )
                      : resolveCommentsStoreParent(
                          roomNode,
                          target.quote,
                          roomIdRange,
                          roomCellIds,
                          labelWhole3,
                          to2,
                        )(body2)
                    : resolveCommentsStoreValue18(
                        roomWidget.nodeId,
                        roomWidget.element,
                        record4,
                        labelWhole3,
                        to2,
                      )(body2);
              let file: Dynamic =
                summonOwedTo ?? (0, commentStoreContext.getStore)().summonFile;
              commentStoreContext.pendingCreates.set(focusId, {
                y: y6,
                summon: summon,
                summonBlock: summonBlock,
                anchorStart: anchorStart,
                body: body2,
                ...(to && {
                  to: to,
                }),
                ...(file !== null && {
                  file: file,
                }),
                ...(summonOwedTo !== undefined && {
                  owed: true,
                }),
                minted: minted,
                ...(quietCarrier === true && {
                  quiet: true,
                }),
                ...(summonText !== undefined && {
                  summonText: summonText,
                }),
                ...(pressedAt !== undefined && {
                  pressedAt: pressedAt,
                }),
              });
              if (commentsStoreValue17 === undefined || pid === null) {
                let useCommentStoreResult2: Dynamic;
                try {
                  useCommentStoreResult2 = await api.comments.create({
                    container: container,
                    body: body2,
                    target: target,
                    to: to,
                    path: path,
                    untrustedDm: untrustedDm,
                  });
                } catch (useCommentStoreResult3: Dynamic) {
                  commentStoreContext.pendingCreates.delete(focusId);
                  commentsStoreSet7.add(focusId);
                  minted.err(useCommentStoreResult3);
                  return (0, commentStoreContext.reportMutationError)(
                    setStore2,
                    resolveCommentsStoreMessage(
                      useCommentStoreResult3,
                      `Couldn't post comment`,
                    ),
                    useCommentStoreResult3,
                    `post`,
                  );
                }
                let result: Dynamic = await api.comments
                  .thread(useCommentStoreResult2.id)
                  .catch((..._extraArguments: unknown[]) => null);
                if (result) {
                  (0, commentStoreContext.updatePageComments)(
                    pageId,
                    (
                      commentStore?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      commentStore.map(
                        (
                          rolldownNImport2?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          rolldownNImport2.id === focusId
                            ? {
                                ...result,
                                id: focusId,
                                root: {
                                  ...result.root,
                                  id: focusId,
                                },
                              }
                            : rolldownNImport2,
                      ),
                  );
                }
                (0, commentStoreContext.acceptCreate)(
                  pageId,
                  focusId,
                  useCommentStoreResult2.id,
                );
                return useCommentStoreResult2.id;
              }
              let record5: Dynamic = {
                opId: resolveCommentsStoreValue16(),
                pid: pid,
                container: container,
                pageId: pageId,
                tmpId: focusId,
                kind: `create`,
                value: commentsStoreValue17.value,
                ...(commentsStoreValue17.cells && {
                  cells: true,
                }),
                body: body2,
                ...(to && {
                  to: to,
                }),
                target: target,
                createdAt: createdAt,
                attempts: 0,
                author: resolveCommentsStoreAuthor(pid),
                ...(docId !== undefined && {
                  docId: docId,
                }),
                ...(quietCarrier === true && {
                  quiet: true,
                }),
              };
              commentsStoreMap12.set(focusId, record5);
              if (quietCarrier === true) {
                let { quiet: record6, ...record7 }: Dynamic = record5;
                commentsStoreMap20.get(pid)?.put(record7);
              } else commentsStoreMap20.get(pid)?.put(record5);
              commentsStoreMap10.set(focusId, resolveCommentsStoreValue9());
              let useCommentStoreResult: Dynamic;
              try {
                useCommentStoreResult = await (0,
                commentStoreContext.sendOutboxEntry)(
                  record5,
                  `post`,
                  quietCarrier === true ? `quiet-carrier` : undefined,
                );
              } catch (useCommentStoreResult2: Dynamic) {
                throw (
                  commentsStoreMap12.delete(focusId),
                  commentStoreContext.pendingCreates.delete(focusId),
                  (0, commentStoreContext.setOutboxStatus)(focusId, null),
                  commentsStoreSet7.add(focusId),
                  minted.err(useCommentStoreResult2),
                  setStore2(),
                  quietCarrier === true
                    ? quietCarrierThreads.delete(focusId)
                    : toast.error(
                        resolveCommentsStoreMessage(
                          useCommentStoreResult2,
                          `Couldn't post comment`,
                        ),
                        resolveCommentsStoreValue7(useCommentStoreResult2),
                      ),
                  useCommentStoreResult2
                );
              }
              if (
                typeof useCommentStoreResult != `string` &&
                useCommentStoreResult.discarded === true
              )
                throw Error(`discarded`);
              if (
                typeof useCommentStoreResult != `string` &&
                quietCarrier === true
              )
                throw (
                  (0, commentStoreContext.getStore)().discardOutbox(
                    focusId,
                    false,
                  ),
                  quietCarrierThreads.delete(focusId),
                  Error(`quiet carrier: the room did not answer`)
                );
              if (typeof useCommentStoreResult != `string`) {
                let landed: Dynamic = (0, commentStoreContext.deferredResult)();
                let commentQueuedError: Dynamic =
                  new (CommentQueuedError as Dynamic)(
                    useCommentStoreResult.held,
                    landed.promise,
                  );
                throw (
                  minted.err(commentQueuedError),
                  commentStoreContext.pendingCreates.set(focusId, {
                    ...commentStoreContext.pendingCreates.get(focusId),
                    minted: undefined,
                    landed: landed,
                  }),
                  useCommentStoreResult.unconfirmed !== true &&
                    (0, commentStoreContext.reportOutboxFailure)(
                      useCommentStoreResult.held,
                    ),
                  commentQueuedError
                );
              }
              (0, commentStoreContext.acceptCreate)(
                pageId,
                focusId,
                useCommentStoreResult,
              );
              return useCommentStoreResult;
            },
          );
    },
    async retryOutbox(
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      let commentsStoreMap12Entry: Dynamic =
        commentsStoreMap12.get(commentStore);
      if (
        commentsStoreMap12Entry !== undefined &&
        (await (0, commentStoreContext.retryOutboxEntry)(
          commentsStoreMap12Entry,
        )) === `landed`
      ) {
        (0, commentStoreContext.drainOutbox)();
      }
    },
    discardOutbox(
      commentStore?: Dynamic,
      options: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined {
      let commentsStoreMap12Entry: Dynamic =
        commentsStoreMap12.get(commentStore);
      (0, commentStoreContext.clearPostingWait)(commentStore);
      (0, commentStoreContext.setOutboxStatus)(commentStore, null);
      if (commentsStoreMap12Entry === undefined) return;
      let bodyKey = options
        ? resolveCommentsStoreImul(commentsStoreMap12Entry.value?.body)
        : null;
      if (bodyKey !== null) {
        let record2: Dynamic = {
          opId: commentsStoreMap12Entry.opId,
          pid: commentsStoreMap12Entry.pid,
          pageId: commentsStoreMap12Entry.pageId,
          container: commentsStoreMap12Entry.container,
          bodyKey: bodyKey,
          at: resolveCommentsStoreValue9(),
        };
        if (commentsStoreMap18.has(commentsStoreMap12Entry.opId)) {
          emitTelemetryEvent(
            createPagesCommentWithdrawEvent(`already_posted`, `feed`),
          );
        } else {
          updateCommentsStoreBodyKey(record2, true);
        }
      }
      commentsStoreMap14.get(commentStore)?.abort();
      let commentsStoreMap11Entry: Dynamic =
        commentsStoreMap11.get(commentStore);
      if (commentsStoreMap11Entry !== undefined) {
        resolveCommentsStoreSet2().clear(commentsStoreMap11Entry.timer);
        commentsStoreMap11.delete(commentStore);
      }
      (0, commentStoreContext.forgetOutboxEntry)(commentsStoreMap12Entry);
      let pendingCreateEntry: Dynamic =
        commentStoreContext.pendingCreates.get(commentStore);
      commentStoreContext.pendingCreates.delete(commentStore);
      let Error2 = Error(`discarded`);
      pendingCreateEntry?.minted?.err(Error2);
      pendingCreateEntry?.landed?.err(Error2);
      commentStoreContext.pendingReplies.get(commentStore)?.landed.err(Error2);
      commentStoreContext.pendingReplies.delete(commentStore);
      if (commentsStoreMap12Entry.kind === `create`) {
        commentsStoreSet7.add(commentStore);
        (0, commentStoreContext.updatePageComments)(
          commentsStoreMap12Entry.pageId,
          (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            commentStore2.filter(
              (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                rolldownNImport2.id !== commentStore,
            ),
        );
        (0, commentStoreContext.setStore)(
          (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            let amount = commentStore in commentStore2.optimisticY;
            let matchesFocusId = commentStore2.focusId === commentStore;
            if (!amount && !matchesFocusId) return commentStore2;
            let { [commentStore]: optimisticY, ...optimisticY2 }: Dynamic =
              commentStore2.optimisticY;
            return {
              ...(amount && {
                optimisticY: optimisticY2,
              }),
              ...(matchesFocusId && {
                focusId: null,
                peekDrop: null,
              }),
            };
          },
        );
      } else {
        (0, commentStoreContext.updatePageComments)(
          commentsStoreMap12Entry.pageId,
          (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            commentStore2
              .filter(
                (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                  rolldownNImport2.id !== commentStore,
              )
              .map(
                (
                  filteredRolldownNImport?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  filteredRolldownNImport.id === commentsStoreMap12Entry.parent
                    ? {
                        ...filteredRolldownNImport,
                        replies: filteredRolldownNImport.replies.filter(
                          (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                            reply.id !== commentStore,
                        ),
                      }
                    : filteredRolldownNImport,
              ),
        );
      }
    },
  };
}

/** BaoCut: comment store creator, preserving helper initialization order. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  commentsStoreValues2,
  commentsStoreMap6,
  getCommentsStoreValue,
  commentsStoreMap5,
  getCommentsStoreValue2,
  isCommentsStoreResolved,
  resolveCommentsStoreValue7,
  CommentsStoreReason,
  isTmpId,
  commentsStoreMap12,
  isCommentsStoreReplies2,
  landedSummon,
  quietCarrierThreads,
  carrierBooked,
  commentsStoreMap10,
  commentsStoreSet8,
  commentsStoreMap20,
  commentsStoreMap9,
  resolveCommentsStoreSet,
  commentsStoreMap14,
  CommentsStoreSuperseded,
  commentsStoreMap15,
  commentsStoreMap16,
  resolveCommentsStoreKey,
  CommentsStoreCommentsUnreachable,
  CommentsStoreState5,
  isCommentRefusal,
  resolveCommentsStoreValue9,
  commentsStoreMap11,
  resolveCommentsStoreSet2,
  updateCommentsStoreTimer,
  loadCommentsStoreVerb,
  ANCHOR_GONE_CARD_WORDS,
  commentsStoreSet9,
  commentsStoreValue64,
  commentsStoreMap17,
  clearCommentsStoreState,
  resolveCommentsStoreSet3,
  WITHDRAW_PENDING_MS,
  updateCommentsStoreBacking,
  CommentsStoreMessage3,
  clearCommentsStoreSome,
  resolveCommentsStoreSignal,
  resolveCommentsStoreVerdict,
  commentDenyCopy,
  commentsStoreSet10,
  _unreachableRetry,
  WITHDRAW_RETRY_MS,
  resolveCommentsStoreRefusedCopy,
  _outboxStoreAsk,
  resolveCommentsStoreValue8,
  CommentsStoreYourCommentWillPostWhenTheConnectionIsBack,
  commentsStoreSet13,
  NO_PEERS,
} from "../store/store-4";
import { CommentsStoreState2 } from "../store/store-2";
import {
  getDataModelSchemasTarget2,
  DataModelSchemasFreeze,
} from "../../platform/data/model-schemas-3";
import { toast } from "../../platform/ui/toasts";
import {
  createPagesReactionVerdictEvent,
  createPagesCommentConfirmedEvent,
  createPagesCommentWithdrawEvent,
} from "../../platform/observability/browser-and-operation-events-1";
import { isDoorUnreachable } from "../../platform/services/api-and-auth-2";
import { emitTelemetryEvent } from "../../platform/observability/telemetry-3";
import { inFrame } from "../../platform/dependencies";
import { frameViewer } from "../../platform/observability/browser-and-operation-events-3";
import { PlatformApiAndAuthUser } from "../../platform/services/api-and-auth-6";
import { resolveDataModelSchemasValue28 } from "../../platform/data/model-schemas-4";
import { frameMentioned } from "../../platform/observability/browser-and-operation-events-4";
import {
  PlatformAnnouncementsCommentPosted,
  PlatformAnnouncementsMessage2,
} from "../../platform/services/announcements";
import { takeBusyWhy } from "../../platform/services/session-and-sources-1";
import type {
  CommentStoreContext,
  CommentStoreShared,
} from "./store-context";
import { createCommentPreferencesActions } from "./preferences-actions";
import { createCommentLoadingActions } from "./loading-actions";
import { createCommentCreateActions } from "./create-actions";
import { createCommentMutationsActions } from "./mutations-actions";
import { createCommentReplyActions } from "./reply-actions";
import { createCommentResolutionActions } from "./resolution-actions";
import { createCommentReactionsActions } from "./reactions-actions";
import { createCommentReopenActions } from "./reopen-actions";
import { createCommentGeometryActions } from "./geometry-actions";
import { createCommentDraftsActions } from "./drafts-actions";

export function createCommentStore(commentStoreShared: CommentStoreShared) {
  return (
    setStore?: Dynamic,
    getStore?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let updatePageComments = (
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let store: Dynamic = getStore();
      let allByPageItem: Dynamic = store.allByPage[commentStore];
      let byPageItem: Dynamic = store.byPage[commentStore];
      if (allByPageItem === undefined && byPageItem === undefined) return;
      let byPageItem2: Dynamic = byPageItem ?? commentsStoreValues2;
      let allByPageItem2: Dynamic = allByPageItem ?? byPageItem2;
      let options2: Dynamic = options(allByPageItem2);
      if (options2 === allByPageItem2) return;
      let options3: Dynamic =
        CommentsStoreState2 === null || !commentsStoreMap6.has(commentStore)
          ? options2
          : getDataModelSchemasTarget2(
              options2,
              getCommentsStoreValue(commentStore, store.present),
              commentsStoreMap5.get(commentStore),
              getCommentsStoreValue2(commentStore, store.present),
            );
      let filteredOptions: Dynamic = options3.some(
        (option?: Dynamic, ..._extraArguments: unknown[]) =>
          !isCommentsStoreResolved(option),
      )
        ? options3.filter(isCommentsStoreResolved)
        : options3;
      let matchesFilteredOptionsCount: Dynamic =
        filteredOptions.length === byPageItem2.length &&
        filteredOptions.every(
          (
            filteredOption?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) => filteredOption === byPageItem2[index],
        );
      let matchesFilteredOptionsCount2: Dynamic =
        matchesFilteredOptionsCount && byPageItem !== undefined;
      setStore(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          ...(allByPageItem === undefined
            ? {}
            : {
                allByPage: {
                  ...commentStore2.allByPage,
                  [commentStore]: options3,
                },
              }),
          ...(matchesFilteredOptionsCount2
            ? {}
            : {
                byPage: {
                  ...commentStore2.byPage,
                  [commentStore]: matchesFilteredOptionsCount
                    ? byPageItem2
                    : filteredOptions,
                },
              }),
        }),
      );
    };
    let commentsForPage: Dynamic = (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let store: Dynamic = getStore();
      return store.allByPage[commentStore] ?? store.byPage[commentStore];
    };
    let unresolveComment: Dynamic = (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (commentStore === undefined) return;
      let {
        resolveId: commentStore2,
        resolvedBy: commentStore3,
        ...commentStore4
      }: Dynamic = commentStore;
      return {
        ...commentStore4,
        resolved: false,
      };
    };
    let copyResolution: Dynamic = (
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (options.resolveId !== undefined)
        return {
          ...commentStore,
          resolved: options.resolved,
          resolveId: options.resolveId,
          ...(options.resolvedBy !== undefined && {
            resolvedBy: options.resolvedBy,
          }),
        };
      let {
        resolveId: commentStore2,
        resolvedBy: commentStore3,
        ...commentStore4
      }: Dynamic = commentStore;
      return {
        ...commentStore4,
        resolved: options.resolved,
      };
    };
    let updateComment: Dynamic = (
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let enabled = false;
      let mappedCommentStore: Dynamic = commentStore.map(
        (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          file.root.id !== options &&
          !file.replies.some(
            (reply?: Dynamic, ..._extraArguments: unknown[]) =>
              reply.id === options,
          )
            ? file
            : ((enabled = true),
              {
                ...file,
                root: file.root.id === options ? context(file.root) : file.root,
                replies: file.replies.map(
                  (reply?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    reply.id === options ? context(reply) : reply,
                ),
              }),
      );
      return enabled ? mappedCommentStore : commentStore;
    };
    let reportMutationError = (
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      commentStore();
      toast.error(options, resolveCommentsStoreValue7(context));
      for (let useCommentStoreResult of createPagesReactionVerdictEvent(
        dependencies,
        {
          refusal:
            context instanceof (CommentsStoreReason as Dynamic)
              ? (context.reason ?? `deny`)
              : undefined,
          unreachable: isDoorUnreachable(context),
        },
      ) as Dynamic)
        emitTelemetryEvent(useCommentStoreResult);
      throw context;
    };
    let viewerId: Dynamic;
    let viewerLookupStarted = false;
    let loadViewerId = (..._extraArguments: unknown[]): undefined => {
      if (!(viewerLookupStarted || !inFrame())) {
        viewerLookupStarted = true;
        frameViewer().then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (result.id === null) {
              viewerLookupStarted = false;
            } else {
              viewerId = result.id;
            }
          },
        );
      }
    };
    let viewerPrincipal: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      PlatformApiAndAuthUser.getState().user?.email ||
      (loadViewerId(), viewerId);
    let mutationStarts: Dynamic = {};
    let mutationGenerations: Dynamic = {};
    let replyEpochs: Dynamic = {};
    let deleteEpochs: Dynamic = {};
    let withMutation: Dynamic = async (
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      mutationStarts[options] = (mutationStarts[options] ?? 0) + 1;
      mutationGenerations[options] = (mutationGenerations[options] ?? 0) + 1;
      commentStoreShared.commentsStoreValue0++;
      try {
        return await context();
      } finally {
        mutationStarts[options] = (mutationStarts[options] ?? 0) + 1;
        setStore(
          (
            commentStore2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            mutGen: commentStore2.mutGen + 1,
          }),
        );
        if (
          --commentStoreShared.commentsStoreValue0 === 0 &&
          CommentsStoreState2 !== null
        ) {
          CommentsStoreState2();
        }
        if (
          --mutationGenerations[options] === 0 &&
          (delete mutationGenerations[options],
          replyEpochs[options] !== undefined)
        ) {
          delete replyEpochs[options];
          let deleteEpochItem: Dynamic = deleteEpochs[options] ?? commentStore;
          getStore().fetch(deleteEpochItem, options);
        }
      }
    };
    let ensureNotPosting = (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (!isTmpId(commentStore)) return false;
      throw (
        toast(`Still posting — try again in a moment`),
        Error(`pending create`)
      );
    };
    commentStoreShared.resolveCommentsStoreValue15 = (
      ..._extraArguments: unknown[]
    ): Dynamic => viewerPrincipal() ?? ``;
    let setOutboxStatus: Dynamic = (
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      setStore(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (options === null) {
            if (!Object.hasOwn(commentStore2.outbox, commentStore))
              return commentStore2;
            let { [commentStore]: outbox, ...outbox2 }: Dynamic =
              commentStore2.outbox;
            return {
              outbox: outbox2,
            };
          }
          return {
            outbox: {
              ...commentStore2.outbox,
              [commentStore]: options,
            },
          };
        },
      );
    commentStoreShared.resolveCommentsStoreValue13 = (
      ..._extraArguments: unknown[]
    ): undefined => {
      let uniqueItems: Dynamic = new (Set as Dynamic)();
      for (let useCommentStoreResult of commentsStoreMap12.values() as Dynamic)
        uniqueItems.add(useCommentStoreResult.pageId);
      for (let useCommentStoreResult of uniqueItems as Dynamic)
        updatePageComments(
          useCommentStoreResult,
          (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            isCommentsStoreReplies2(useCommentStoreResult, commentStore) ??
            commentStore,
        );
    };
    let pendingCreates: Dynamic = new (Map as Dynamic)();
    let seenCreateIds: Dynamic = new (Set as Dynamic)();
    let deferredResult: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
      let useCommentStoreResult: Dynamic;
      let promise: Dynamic = new (Promise as Dynamic)(
        (
          resolve?: Dynamic,
          err?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          (useCommentStoreResult = {
            ok: resolve,
            err: err,
          }),
      );
      promise.catch((..._extraArguments: unknown[]): undefined => {});
      return {
        ...useCommentStoreResult,
        promise: promise,
      };
    };
    let pendingReplies: Dynamic = new (Map as Dynamic)();
    let inflightOutboxEntries: Dynamic = new (Set as Dynamic)();
    let acceptCreate = (
      commentStore?: Dynamic,
      options?: Dynamic,
      threadId?: Dynamic,
      post?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let pendingCreateEntry: Dynamic = pendingCreates.get(options);
      pendingCreates.delete(options);
      setOutboxStatus(options, null);
      if (pendingCreateEntry?.to?.length) {
        pendingCreateEntry.to;
      }
      setStore(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          renderKey: {
            ...commentStore2.renderKey,
            [threadId]: options,
          },
        }),
      );
      setStore(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let replyDraftItem: Dynamic = commentStore2.replyDrafts[options];
          if (replyDraftItem === undefined) return commentStore2;
          let { [options]: replyDrafts, ...replyDrafts2 }: Dynamic =
            commentStore2.replyDrafts;
          return {
            replyDrafts: {
              ...replyDrafts2,
              [threadId]: replyDraftItem,
            },
          };
        },
      );
      updatePageComments(
        commentStore,
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          commentStore2.some(
            (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
              rolldownNImport2.id === threadId,
          )
            ? commentStore2.filter(
                (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                  rolldownNImport2.id !== options,
              )
            : commentStore2.map(
                (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  file.id === options
                    ? {
                        ...file,
                        id: threadId,
                        root: {
                          ...file.root,
                          id: threadId,
                        },
                      }
                    : file,
              ),
      );
      setStore(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let { [options]: optimisticY, ...optimisticY2 }: Dynamic =
            commentStore2.optimisticY;
          let flatMap: Dynamic = Object.entries(commentStore2.pinWords).flatMap(
            (
              [pinWordsEntry, pinWordsEntry2]: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let { [options]: byId, ...byId2 }: Dynamic = pinWordsEntry2.byId;
              return byId === undefined
                ? []
                : [
                    [
                      pinWordsEntry,
                      {
                        ...pinWordsEntry2,
                        byId: {
                          ...byId2,
                          [threadId]: byId,
                        },
                      },
                    ],
                  ];
            },
          );
          return {
            optimisticY:
              optimisticY == null
                ? optimisticY2
                : {
                    ...optimisticY2,
                    [threadId]: optimisticY,
                  },
            ...(flatMap.length > 0 && {
              pinWords: {
                ...commentStore2.pinWords,
                ...Object.fromEntries(flatMap),
              },
            }),
            focusId:
              commentStore2.focusId === options
                ? threadId
                : commentStore2.focusId,
            peekDrop:
              commentStore2.peekDrop?.id === options
                ? {
                    id: threadId,
                    dy: commentStore2.peekDrop.dy,
                  }
                : commentStore2.peekDrop,
            activeId:
              commentStore2.activeId === options
                ? threadId
                : commentStore2.activeId,
            ...(commentStore2.activePeers.includes(options) && {
              activePeers: commentStore2.activePeers.map(
                (
                  activePeer?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => (activePeer === options ? threadId : activePeer),
              ),
            }),
            ...(pendingCreateEntry?.summonBlock && {
              summonBlocks: {
                ...commentStore2.summonBlocks,
                [threadId]: pendingCreateEntry.summonBlock,
              },
            }),
            ...(pendingCreateEntry?.summonBlock &&
              pendingCreateEntry.y != null && {
                summonTops: {
                  ...commentStore2.summonTops,
                  [threadId]: pendingCreateEntry.y,
                },
              }),
            ...(pendingCreateEntry?.anchorStart !== undefined && {
              summonAnchorStarts: {
                ...commentStore2.summonAnchorStarts,
                [threadId]: pendingCreateEntry.anchorStart,
              },
            }),
          };
        },
      );
      pendingCreateEntry?.minted?.ok(threadId);
      if (pendingCreateEntry === undefined) {
        if (
          post !== undefined &&
          !seenCreateIds.has(threadId) &&
          resolveDataModelSchemasValue28(false, post.body, post.to)
        ) {
          landedSummon({
            threadId: threadId,
            body: post.body,
            ...(post.to && {
              to: post.to,
            }),
            left: true,
          });
        }
      } else {
        seenCreateIds.add(threadId);
        if (seenCreateIds.size > 256) {
          seenCreateIds.delete(seenCreateIds.values().next().value);
        }
        if (pendingCreateEntry.quiet) {
          quietCarrierThreads.add(threadId);
          quietCarrierThreads.delete(options);
          carrierBooked(threadId);
        }
        landedSummon({
          threadId: threadId,
          body: pendingCreateEntry.summonText ?? pendingCreateEntry.body,
          ...(pendingCreateEntry.to && {
            to: pendingCreateEntry.to,
          }),
          ...(pendingCreateEntry.summon && {
            summon: true,
          }),
          ...(pendingCreateEntry.summonBlock && {
            block: pendingCreateEntry.summonBlock,
          }),
          ...(pendingCreateEntry.summonBlock &&
            pendingCreateEntry.y != null && {
              y: pendingCreateEntry.y,
            }),
          ...(pendingCreateEntry.anchorStart !== undefined && {
            anchorStart: pendingCreateEntry.anchorStart,
          }),
          ...(pendingCreateEntry.file !== undefined && {
            file: pendingCreateEntry.file,
          }),
          ...(pendingCreateEntry.owed && {
            owed: true,
          }),
          ...(pendingCreateEntry.quiet && {
            sendFirst: true,
          }),
          ...(pendingCreateEntry.pressedAt !== undefined && {
            pressedAt: pendingCreateEntry.pressedAt,
          }),
        });
        frameMentioned(pendingCreateEntry.to, viewerPrincipal());
      }
      pendingCreateEntry?.landed?.ok(threadId);
    };
    let acceptReply = (
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let pendingReplyEntry: Dynamic = pendingReplies.get(context);
      pendingReplies.delete(context);
      setOutboxStatus(context, null);
      updatePageComments(
        commentStore,
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          commentStore2
            .filter(
              (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                rolldownNImport2.id !== context,
            )
            .map(
              (
                filteredRolldownNImport?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                if (filteredRolldownNImport.id !== options)
                  return filteredRolldownNImport;
                let some: Dynamic = filteredRolldownNImport.replies.some(
                  (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                    reply.id === dependencies,
                );
                return {
                  ...filteredRolldownNImport,
                  replies: some
                    ? filteredRolldownNImport.replies.filter(
                        (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                          reply.id !== context,
                      )
                    : filteredRolldownNImport.replies.map(
                        (
                          reply?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          reply.id === context
                            ? {
                                ...reply,
                                id: dependencies,
                              }
                            : reply,
                      ),
                };
              },
            ),
      );
      pendingReplyEntry?.after();
      pendingReplyEntry?.landed.ok(dependencies);
    };
    let forgetOutboxEntry = (
      page?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      commentsStoreMap12.delete(page.tmpId);
      commentsStoreMap10.delete(page.tmpId);
      commentsStoreSet8.add(page.opId);
      commentsStoreMap20.get(page.pid)?.del(page.opId);
    };
    let sendOutboxEntry: Dynamic = async (
      page?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      inflightOutboxEntries.add(page.tmpId);
      let since: Dynamic = commentsStoreMap10.get(page.tmpId);
      let commentsStoreMap9Entry: Dynamic = commentsStoreMap9.get(page.tmpId);
      if (commentsStoreMap9Entry !== undefined) {
        resolveCommentsStoreSet().clear(commentsStoreMap9Entry.timer);
        commentsStoreMap9Entry.timer = undefined;
      }
      setOutboxStatus(page.tmpId, {
        state: `sending`,
        ...(since !== undefined && {
          since: since,
        }),
        ...(commentsStoreMap9Entry !== undefined && {
          unconfirmed: commentsStoreMap9Entry.mark,
        }),
      });
      page.attempts += 1;
      let commentsStoreValue052 = commentStoreShared.commentsStoreValue05;
      commentsStoreMap14.get(page.tmpId)?.abort(CommentsStoreSuperseded);
      let abortController = new AbortController();
      commentsStoreMap14.set(page.tmpId, abortController);
      let enabled = false;
      try {
        let waitForCommentEcho2: Dynamic = await waitForCommentEcho(
          page,
          abortController,
          commentsStoreValue052,
        );
        let commentsStoreMap15Entry: Dynamic = commentsStoreMap15.get(
          page.opId,
        );
        return commentsStoreMap15Entry !== undefined ||
          commentsStoreMap16.has(waitForCommentEcho2.id)
          ? (commentsStoreMap15Entry !== undefined &&
              (0, commentStoreShared.resolveCommentsStoreValue11)(
                commentsStoreMap15Entry,
                waitForCommentEcho2.id,
                waitForCommentEcho2.replayed ? `replayed` : `answer`,
              ),
            {
              held: Error(`discarded`),
              discarded: true,
            })
          : ((page.replayed = waitForCommentEcho2.replayed),
            commentsStoreMap9.delete(page.tmpId) &&
              (emitTelemetryEvent(
                createPagesCommentConfirmedEvent(
                  page.kind,
                  waitForCommentEcho2.replayed,
                ),
              ),
              resolveCommentsStoreKey(PlatformAnnouncementsCommentPosted)),
            forgetOutboxEntry(page),
            (commentStoreShared.commentsStoreValue_12 = false),
            toast.dismiss(CommentsStoreCommentsUnreachable),
            waitForCommentEcho2.id);
      } catch (held: Dynamic) {
        enabled = held instanceof (CommentsStoreState5 as Dynamic);
        let amount: Dynamic =
          held instanceof (CommentsStoreReason as Dynamic) &&
          isCommentRefusal(held);
        let matchesCommentsStoreMap12Entry =
          commentsStoreMap12.get(page.tmpId) === page &&
          !commentsStoreSet8.has(page.opId);
        let hold: Dynamic =
          held instanceof (CommentsStoreReason as Dynamic) &&
          held.hold !== undefined &&
          context !== `quiet-carrier`
            ? held.hold
            : undefined;
        if (hold !== undefined) {
          takeBusyWhy();
        }
        let wait: Dynamic =
          hold !== undefined &&
          commentStoreShared.commentsStoreValue04 &&
          commentStoreShared.commentsStoreValue_1 &&
          page.pid === commentStoreShared.CommentsStoreState6 &&
          matchesCommentsStoreMap12Entry
            ? hold
            : undefined;
        let aborted =
          abortController.signal.aborted &&
          abortController.signal.reason !== CommentsStoreSuperseded;
        if (hold === undefined && !aborted)
          for (let useCommentStoreResult of createPagesReactionVerdictEvent(
            options,
            {
              refusal:
                held instanceof (CommentsStoreReason as Dynamic)
                  ? (held.reason ?? `deny`)
                  : undefined,
              unreachable: isDoorUnreachable(held),
            },
          ) as Dynamic)
            emitTelemetryEvent(useCommentStoreResult);
        if (amount)
          throw (
            clearPostingWait(page.tmpId),
            commentsStoreMap12.has(page.tmpId) &&
              (commentsStoreSet8.add(page.opId),
              context !== `replay` &&
                context !== `rung` &&
                commentsStoreMap20.get(page.pid)?.del(page.opId)),
            held
          );
        if (wait !== undefined) {
          showPostingWait(page, wait, context === `rung`);
          return {
            held: held,
            wait: wait,
            unconfirmed: true,
          };
        }
        if (matchesCommentsStoreMap12Entry) {
          let commentsStoreMap9Entry2: Dynamic =
            commentsStoreMap9.get(page.tmpId) ??
            (hold === undefined
              ? undefined
              : newPostingWait(page, hold.waitMs));
          if (commentsStoreMap9Entry2 !== undefined) {
            commentsStoreMap9Entry2.paused = true;
          }
          setOutboxStatus(page.tmpId, {
            state: commentStoreShared.commentsStoreValue04
              ? `failed`
              : `queued`,
            ...(commentsStoreMap9Entry2 !== undefined && {
              unconfirmed: commentsStoreMap9Entry2.mark,
            }),
          });
          if (
            commentStoreShared.commentsStoreValue05 !== commentsStoreValue052
          ) {
            queueMicrotask((..._extraArguments: unknown[]) =>
              (0, commentStoreShared.resolveCommentsStoreValue14)(),
            );
          }
        } else if (commentsStoreMap12.has(page.tmpId)) {
          if (commentsStoreMap12.get(page.tmpId) !== page) {
            queueMicrotask((..._extraArguments: unknown[]) =>
              (0, commentStoreShared.resolveCommentsStoreValue14)(),
            );
          }
        } else {
          setOutboxStatus(page.tmpId, null);
        }
        return {
          held: held,
          ...(hold !== undefined && {
            unconfirmed: true,
          }),
          ...((aborted || commentsStoreMap15.has(page.opId)) && {
            discarded: true,
          }),
        };
      } finally {
        inflightOutboxEntries.delete(page.tmpId);
        if (
          !enabled &&
          commentsStoreMap14.get(page.tmpId) === abortController
        ) {
          commentsStoreMap14.delete(page.tmpId);
        }
      }
    };
    let waitForCommentEcho: Dynamic = (
      page?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      new (Promise as Dynamic)(
        (
          resolve?: Dynamic,
          reject?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let enabled = true;
          let record2: Dynamic = {
            at: resolveCommentsStoreValue9(),
            timer: undefined,
            fire: (..._extraArguments: unknown[]): undefined => {
              if (commentsStoreMap11.get(page.tmpId) === record2) {
                commentsStoreMap11.delete(page.tmpId);
              }
              enabled = false;
              reject(
                new (CommentsStoreState5 as Dynamic)(
                  `comment send: still out after SENDING_FACE_MS`,
                ),
              );
            },
          };
          let resolveCommentsStoreSet22: Dynamic = (
            ..._extraArguments: unknown[]
          ) => (
            commentsStoreMap11.get(page.tmpId) === record2 &&
              (resolveCommentsStoreSet2().clear(record2.timer),
              commentsStoreMap11.delete(page.tmpId)),
            enabled
          );
          commentsStoreMap11.set(page.tmpId, record2);
          updateCommentsStoreTimer(record2);
          loadCommentsStoreVerb(
            page.pid,
            {
              value: page.value,
              cells: page.cells === true,
            },
            page.opId,
            options.signal,
          )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                resolveCommentsStoreSet22()
                  ? resolve(result)
                  : acceptOutboxEcho(page, options, result),
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                resolveCommentsStoreSet22()
                  ? reject(result)
                  : handleSendFailure(page, options, result, context),
            )
            .catch((error?: unknown, ..._extraArguments: unknown[]) =>
              console.warn(
                `comments: a send's late answer could not be applied`,
                error instanceof Error ? error.name : typeof error,
              ),
            );
        },
      );
    let acceptOutboxEcho = (
      entry?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (commentsStoreMap14.get(entry.tmpId) === options) {
        commentsStoreMap14.delete(entry.tmpId);
      }
      let commentsStoreMap15Entry: Dynamic = commentsStoreMap15.get(entry.opId);
      if (
        commentsStoreMap15Entry !== undefined ||
        commentsStoreMap16.has(context.id)
      )
        return void (
          commentsStoreMap15Entry !== undefined &&
          (0, commentStoreShared.resolveCommentsStoreValue11)(
            commentsStoreMap15Entry,
            context.id,
            context.replayed ? `replayed` : `answer`,
          )
        );
      if (
        !(
          options.signal.aborted ||
          commentsStoreMap12.get(entry.tmpId) !== entry ||
          commentsStoreSet8.has(entry.opId)
        )
      ) {
        entry.replayed = context.replayed;
        if (commentsStoreMap9.delete(entry.tmpId)) {
          emitTelemetryEvent(
            createPagesCommentConfirmedEvent(entry.kind, context.replayed),
          );
          resolveCommentsStoreKey(PlatformAnnouncementsCommentPosted);
        }
        forgetOutboxEntry(entry);
        commentStoreShared.commentsStoreValue_12 = false;
        toast.dismiss(CommentsStoreCommentsUnreachable);
        deliverOutboxResult(entry, context.id);
      }
    };
    let handleSendFailure = (
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (commentsStoreMap14.get(commentStore.tmpId) === options) {
        commentsStoreMap14.delete(commentStore.tmpId);
      }
      if (
        !(
          options.signal.aborted ||
          commentsStoreMap12.get(commentStore.tmpId) !== commentStore ||
          commentsStoreSet8.has(commentStore.opId)
        ) &&
        (commentStoreShared.commentsStoreValue05 !== dependencies ||
          context instanceof (CommentsStoreReason as Dynamic))
      ) {
        queueMicrotask((..._extraArguments: unknown[]) =>
          (0, commentStoreShared.resolveCommentsStoreValue14)(),
        );
      }
    };
    let markOutboxRefused = (
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      commentStore.refusedCopy = options.copy;
      commentStore.refused = options;
      setOutboxStatus(commentStore.tmpId, {
        state: `refused`,
        copy: options.copy,
      });
    };
    let reportOutboxRefusal = (
      commentStore?: Dynamic,
      error?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      toast.dismiss(CommentsStoreCommentsUnreachable);
      let copy: Dynamic =
        error.reason === `char_gone` || error.reason === `block_gone`
          ? ANCHOR_GONE_CARD_WORDS[error.reason]
          : error.message;
      let commentsStoreMap12Entry: Dynamic = commentsStoreMap12.get(
        commentStore.tmpId,
      );
      if (commentsStoreMap12Entry !== undefined) {
        markOutboxRefused(commentsStoreMap12Entry, {
          ...(error.reason !== undefined && {
            reason: error.reason,
          }),
          copy: copy,
        });
        let commentsStoreMap20Entry: Dynamic = commentsStoreMap20.get(
          commentsStoreMap12Entry.pid,
        );
        let {
          quiet: commentsStoreMap12Entry2,
          ...commentsStoreMap12Entry3
        }: Dynamic = commentsStoreMap12Entry;
        if (commentsStoreMap20Entry !== undefined) {
          commentsStoreMap20Entry
            .has(commentsStoreMap12Entry.opId)
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result &&
                commentsStoreMap12.get(commentsStoreMap12Entry.tmpId) ===
                  commentsStoreMap12Entry
                  ? commentsStoreMap20Entry.put(commentsStoreMap12Entry3)
                  : undefined,
            );
        }
      }
      pendingCreates.get(commentStore.tmpId)?.minted?.err(error);
      pendingCreates.get(commentStore.tmpId)?.landed?.err(error);
      pendingReplies.get(commentStore.tmpId)?.landed.err(error);
    };
    let acceptPostedComment: Dynamic = (
      entry?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      entry.kind === `create`
        ? acceptCreate(entry.pageId, entry.tmpId, options, entry)
        : acceptReply(entry.pageId, entry.parent ?? ``, entry.tmpId, options);
    commentStoreShared.resolveCommentsStoreValue11 = (
      page?: Dynamic,
      options?: Dynamic,
      road?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (commentsStoreMap16.has(options) || commentsStoreSet9.has(options))
        return;
      commentsStoreMap16.set(options, page.pageId);
      if (commentsStoreMap16.size > commentsStoreValue64) {
        commentsStoreMap16.delete(commentsStoreMap16.keys().next().value);
      }
      let record2: Dynamic = {
        opId: page.opId,
        pid: page.pid,
        pageId: page.pageId,
        container: page.container,
        id: options,
        road: road,
        since: dependencies?.since ?? resolveCommentsStoreValue9(),
        nextTryAt: 0,
        tries: 0,
      };
      commentsStoreMap17.set(options, record2);
      if (dependencies === undefined) {
        clearCommentsStoreState(page.opId, record2);
      }
      updatePageComments(
        page.pageId,
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isCommentsStoreReplies2(page.pageId, commentStore) ?? commentStore,
      );
      tryDelete(record2);
    };
    let scheduleDeleteRetries = (..._extraArguments: unknown[]): undefined => {
      resolveCommentsStoreSet3().clear(commentStoreShared.commentsStoreState);
      commentStoreShared.commentsStoreState = undefined;
      let mappedItems: Dynamic = [...commentsStoreMap17.values()].map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          item.trying === true
            ? item.since + WITHDRAW_PENDING_MS
            : item.nextTryAt,
      );
      if (mappedItems.length > 0) {
        commentStoreShared.commentsStoreState = resolveCommentsStoreSet3().set(
          (..._extraArguments: unknown[]) =>
            (0, commentStoreShared.resolveCommentsStoreValue12)(`due`),
          Math.max(
            0,
            (Math.min as Dynamic)(...mappedItems) -
              resolveCommentsStoreValue9(),
          ),
        );
      }
    };
    let finishDelete = (
      page?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (commentsStoreMap17.get(page.id) === page) {
        commentsStoreMap17.delete(page.id);
        commentsStoreSet9.add(page.id);
        if (commentsStoreSet9.size > commentsStoreValue64) {
          commentsStoreSet9.delete(commentsStoreSet9.values().next().value);
        }
        updateCommentsStoreBacking(page.pid, CommentsStoreMessage3).del(
          page.opId,
        );
        emitTelemetryEvent(createPagesCommentWithdrawEvent(options, page.road));
        if (options === `delete_failed`) {
          commentsStoreMap16.delete(page.id);
          if (CommentsStoreState2 === null) {
            getStore()
              .fetch(page.container, page.pageId)
              .catch((..._extraArguments: unknown[]): undefined => undefined);
          } else {
            CommentsStoreState2(true);
          }
        }
        scheduleDeleteRetries();
        clearCommentsStoreSome();
      }
    };
    let tryDelete: Dynamic = (
      page?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (page.trying === true || commentsStoreMap17.get(page.id) !== page)
        return;
      let total: Dynamic = page.since + WITHDRAW_PENDING_MS;
      if (resolveCommentsStoreValue9() > total)
        return finishDelete(page, `delete_failed`);
      page.trying = true;
      let commentDenyCopy2 = async (
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        let result: Dynamic = await resolveCommentsStoreSignal(page.pid)({
          verb: `delete`,
          ref: {
            object: `utterance`,
            id: page.id,
          },
        }).catch(
          (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveCommentsStoreVerdict(error, `delete`),
        );
        if (result.verdict === `deny` && result.reason !== `absent`)
          throw new (CommentsStoreReason as Dynamic)(
            commentDenyCopy(result.reason, result.detail, false, result.why),
            result.reason,
            result.hold,
          );
      };
      let useCommentStoreHandler: Dynamic = (
        commentStore?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        commentStore instanceof (CommentsStoreReason as Dynamic) &&
        commentsStoreSet10.has(commentStore.reason ?? ``);
      commentDenyCopy2()
        .catch(async (error?: Dynamic, ..._extraArguments: unknown[]) => {
          if (error instanceof (CommentsStoreReason as Dynamic)) throw error;
          await new (Promise as Dynamic)(
            (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
              setTimeout(resolve, _unreachableRetry.delayMs),
          );
          return commentDenyCopy2();
        })
        .then(
          (..._extraArguments: unknown[]) => finishDelete(page, `deleted`),
          (result?: Dynamic, ..._extraArguments: unknown[]) => {
            if (commentsStoreMap17.get(page.id) !== page) return;
            delete page.trying;
            if (
              useCommentStoreHandler(result) ||
              resolveCommentsStoreValue9() >= total
            )
              return finishDelete(page, `delete_failed`);
            let waitMs: Dynamic =
              result instanceof (CommentsStoreReason as Dynamic)
                ? (result.hold?.waitMs ?? 0)
                : 0;
            page.nextTryAt = Math.min(
              total,
              resolveCommentsStoreValue9() +
                (waitMs > 0
                  ? waitMs
                  : WITHDRAW_RETRY_MS * 2 ** Math.min(page.tries++, 4)),
            );
            scheduleDeleteRetries();
          },
        );
      scheduleDeleteRetries();
    };
    commentStoreShared.resolveCommentsStoreValue12 = (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      for (let useCommentStoreResult of [
        ...commentsStoreMap17.values(),
      ] as Dynamic)
        if (useCommentStoreResult.trying === true) {
          if (
            resolveCommentsStoreValue9() >=
            useCommentStoreResult.since + 3e5
          ) {
            finishDelete(useCommentStoreResult, `delete_failed`);
          }
        } else {
          if (
            commentStore === undefined ||
            useCommentStoreResult.nextTryAt <= resolveCommentsStoreValue9()
          ) {
            tryDelete(useCommentStoreResult);
          }
        }
      scheduleDeleteRetries();
    };
    let retryOutboxEntry: Dynamic = async (
      page?: Dynamic,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ) => {
      if (
        resolveCommentsStoreRefusedCopy(page) ||
        inflightOutboxEntries.has(page.tmpId) ||
        !commentsStoreMap12.has(page.tmpId)
      )
        return `skipped`;
      inflightOutboxEntries.add(page.tmpId);
      let useCommentStoreResult: Dynamic;
      let race: Dynamic = await Promise.race([
        commentsStoreMap20.get(page.pid)?.get(page.opId) ??
          Promise.resolve(`standing`),
        new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
            (useCommentStoreResult = setTimeout(
              (..._extraArguments: unknown[]): Dynamic => resolve(`standing`),
              _outboxStoreAsk.ms,
            )),
        ),
      ]);
      clearTimeout(useCommentStoreResult);
      inflightOutboxEntries.delete(page.tmpId);
      if (commentsStoreMap12.get(page.tmpId) !== page) return `skipped`;
      if (race === null) {
        getStore().discardOutbox(page.tmpId, false);
        return `skipped`;
      }
      if (race !== `standing` && race.refused !== undefined) {
        clearPostingWait(page.tmpId);
        markOutboxRefused(page, {
          ...(race.refused.reason !== undefined && {
            reason: race.refused.reason,
          }),
          copy: race.refused.copy,
        });
        let commentsStoreReason: Dynamic = new (CommentsStoreReason as Dynamic)(
          race.refused.copy,
          race.refused.reason,
        );
        pendingCreates.get(page.tmpId)?.minted?.err(commentsStoreReason);
        pendingCreates.get(page.tmpId)?.landed?.err(commentsStoreReason);
        pendingReplies.get(page.tmpId)?.landed.err(commentsStoreReason);
        return `skipped`;
      }
      let useCommentStoreResult2: Dynamic;
      try {
        useCommentStoreResult2 = await sendOutboxEntry(
          page,
          page.kind === `create` ? `post` : `reply`,
          options ? `rung` : `replay`,
        );
      } catch (useCommentStoreResult3: Dynamic) {
        if (
          useCommentStoreResult3 instanceof (CommentsStoreReason as Dynamic)
        ) {
          reportOutboxRefusal(page, useCommentStoreResult3);
        }
        return `refused`;
      }
      return typeof useCommentStoreResult2 == `string`
        ? deliverOutboxResult(page, useCommentStoreResult2)
        : useCommentStoreResult2.discarded === true
          ? `skipped`
          : useCommentStoreResult2.wait === undefined
            ? `unanswered`
            : `waiting`;
    };
    let deliverOutboxResult = (
      page?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (page.pid !== commentStoreShared.CommentsStoreState6) {
        let pendingCreateEntry: Dynamic = pendingCreates.get(page.tmpId);
        pendingCreates.delete(page.tmpId);
        let pendingReplyEntry: Dynamic = pendingReplies.get(page.tmpId);
        pendingReplies.delete(page.tmpId);
        acceptPostedComment(page, options);
        pendingReplyEntry?.summon?.();
        pendingCreateEntry?.landed?.ok(options);
        pendingReplyEntry?.landed.ok(options);
        return `skipped`;
      }
      acceptPostedComment(page, options);
      return `landed`;
    };
    function clearPostingWait(
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let commentsStoreMap9Entry: Dynamic = commentsStoreMap9.get(commentStore);
      if (commentsStoreMap9Entry !== undefined) {
        resolveCommentsStoreSet().clear(commentsStoreMap9Entry.timer);
        commentsStoreMap9.delete(commentStore);
      }
    }
    commentStoreShared.resolveCommentsStoreValue10 = (
      ..._extraArguments: unknown[]
    ): undefined => {
      for (let [
        useCommentStoreResult,
        useCommentStoreResult2,
      ] of commentsStoreMap9 as Dynamic) {
        resolveCommentsStoreSet().clear(useCommentStoreResult2.timer);
        useCommentStoreResult2.timer = undefined;
        useCommentStoreResult2.paused = true;
        if (
          commentsStoreMap12.has(useCommentStoreResult) &&
          !inflightOutboxEntries.has(useCommentStoreResult)
        ) {
          setOutboxStatus(useCommentStoreResult, {
            state: `queued`,
            unconfirmed: useCommentStoreResult2.mark,
          });
        }
      }
    };
    let schedulePostingWait = (
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      resolveCommentsStoreSet().clear(options.timer);
      let difference: number = resolveCommentsStoreValue9() - options.t0;
      for (; resolveCommentsStoreValue8(options.rungAt) <= difference; )
        options.rungAt++;
      let commentsStoreValue8: Dynamic = resolveCommentsStoreValue8(
        options.rungAt++,
      );
      options.timer = resolveCommentsStoreSet().set(
        (..._extraArguments: unknown[]) => {
          options.timer = undefined;
          if (
            commentsStoreMap9.get(commentStore.tmpId) !== options ||
            options.paused
          )
            return;
          let commentsStoreMap12Entry: Dynamic = commentsStoreMap12.get(
            commentStore.tmpId,
          );
          if (commentsStoreMap12Entry === undefined)
            return clearPostingWait(commentStore.tmpId);
          retryOutboxEntry(commentsStoreMap12Entry, true).then(
            (..._extraArguments: unknown[]): undefined => {
              if (
                commentsStoreMap9.get(commentStore.tmpId) === options &&
                !options.paused &&
                options.timer === undefined &&
                !inflightOutboxEntries.has(commentStore.tmpId)
              ) {
                if (commentsStoreMap12.has(commentStore.tmpId)) {
                  schedulePostingWait(
                    commentsStoreMap12.get(commentStore.tmpId),
                    options,
                  );
                } else {
                  clearPostingWait(commentStore.tmpId);
                }
              }
            },
          );
        },
        Math.max(commentsStoreValue8 - difference, options.asked),
      );
    };
    function newPostingWait(
      page?: Dynamic,
      asked?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let since: Dynamic = resolveCommentsStoreValue9();
      let record2: Dynamic = {
        mark: {
          kind: page.kind,
          pid: page.pid,
          ...(page.docId !== undefined && {
            docId: page.docId,
          }),
          pageId: page.pageId,
          ...(page.parent !== undefined && {
            parent: page.parent,
          }),
          since: since,
        },
        timer: undefined,
        t0: since,
        rungAt: 0,
        asked: asked,
        paused: false,
        said: false,
      };
      commentsStoreMap9.set(page.tmpId, record2);
      return record2;
    }
    function showPostingWait(
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let commentsStoreValue9: Dynamic = resolveCommentsStoreValue9();
      let commentsStoreMap9Entry: Dynamic = commentsStoreMap9.get(
        commentStore.tmpId,
      );
      if (commentsStoreMap9Entry === undefined) {
        commentsStoreMap9Entry = newPostingWait(commentStore, options.waitMs);
      } else {
        if (!context) {
          commentsStoreMap9Entry.t0 = commentsStoreValue9;
          commentsStoreMap9Entry.rungAt = 0;
        }
      }
      if (!commentsStoreMap9Entry.said) {
        commentsStoreMap9Entry.said = true;
        resolveCommentsStoreKey(PlatformAnnouncementsMessage2);
      }
      commentsStoreMap9Entry.paused = false;
      commentsStoreMap9Entry.asked = options.waitMs;
      setOutboxStatus(commentStore.tmpId, {
        state: `sending`,
        since:
          commentsStoreMap10.get(commentStore.tmpId) ??
          commentsStoreMap9Entry.mark.since,
        unconfirmed: commentsStoreMap9Entry.mark,
      });
      schedulePostingWait(commentStore, commentsStoreMap9Entry);
    }
    let drainingOutbox = false;
    let drainAgain = false;
    let drainOutbox = async (
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      if (commentStoreShared.CommentsStoreState6 === null) return;
      if (drainingOutbox) {
        drainAgain = true;
        return;
      }
      drainingOutbox = true;
      let CommentsStoreState62: Dynamic =
        commentStoreShared.CommentsStoreState6;
      try {
        for (;;) {
          drainAgain = false;
          let toSorted: Dynamic = [...commentsStoreMap12.values()].toSorted(
            (
              entry?: Dynamic,
              entry2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              entry.kind === entry2.kind
                ? entry.createdAt.localeCompare(entry2.createdAt)
                : entry.kind === `create`
                  ? -1
                  : 1,
          );
          for (let useCommentStoreResult of toSorted as Dynamic) {
            if (commentStoreShared.CommentsStoreState6 !== CommentsStoreState62)
              return;
            if (
              !resolveCommentsStoreRefusedCopy(useCommentStoreResult) &&
              commentsStoreMap9.get(useCommentStoreResult.tmpId)?.paused !==
                false &&
              (await retryOutboxEntry(useCommentStoreResult)) === `unanswered`
            )
              break;
          }
          if (
            !drainAgain ||
            commentStoreShared.CommentsStoreState6 !== CommentsStoreState62
          )
            return;
        }
      } finally {
        drainingOutbox = false;
        if (drainAgain) {
          drainAgain = false;
          queueMicrotask(
            (..._extraArguments: unknown[]): undefined => void drainOutbox(),
          );
        }
      }
    };
    commentStoreShared.resolveCommentsStoreValue14 = (
      ..._extraArguments: unknown[]
    ): undefined => void drainOutbox();
    let reportOutboxFailure = (
      error?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (error instanceof (CommentsStoreReason as Dynamic))
        return void toast.error(
          error.message,
          resolveCommentsStoreValue7(error),
        );
      if (
        !(
          !commentStoreShared.commentsStoreValue04 ||
          commentStoreShared.commentsStoreValue_12
        )
      ) {
        commentStoreShared.commentsStoreValue_12 = true;
        toast.error(CommentsStoreYourCommentWillPostWhenTheConnectionIsBack, {
          id: CommentsStoreCommentsUnreachable,
        });
      }
    };

    // BaoCut: accessors keep helper lookups live across deferred callbacks.
    const commentStoreContext: CommentStoreContext = {
      shared: commentStoreShared,
      get acceptCreate() {
        return acceptCreate;
      },
      get clearPostingWait() {
        return clearPostingWait;
      },
      get commentsForPage() {
        return commentsForPage;
      },
      get copyResolution() {
        return copyResolution;
      },
      get deferredResult() {
        return deferredResult;
      },
      get deleteEpochs() {
        return deleteEpochs;
      },
      get drainOutbox() {
        return drainOutbox;
      },
      get ensureNotPosting() {
        return ensureNotPosting;
      },
      get forgetOutboxEntry() {
        return forgetOutboxEntry;
      },
      get getStore() {
        return getStore;
      },
      get loadViewerId() {
        return loadViewerId;
      },
      get mutationGenerations() {
        return mutationGenerations;
      },
      get mutationStarts() {
        return mutationStarts;
      },
      get pendingCreates() {
        return pendingCreates;
      },
      get pendingReplies() {
        return pendingReplies;
      },
      get replyEpochs() {
        return replyEpochs;
      },
      get reportMutationError() {
        return reportMutationError;
      },
      get reportOutboxFailure() {
        return reportOutboxFailure;
      },
      get retryOutboxEntry() {
        return retryOutboxEntry;
      },
      get sendOutboxEntry() {
        return sendOutboxEntry;
      },
      get setOutboxStatus() {
        return setOutboxStatus;
      },
      get setStore() {
        return setStore;
      },
      get unresolveComment() {
        return unresolveComment;
      },
      get updateComment() {
        return updateComment;
      },
      get updatePageComments() {
        return updatePageComments;
      },
      get viewerPrincipal() {
        return viewerPrincipal;
      },
      get withMutation() {
        return withMutation;
      },
    };
    return {
      byPage: {},
      allByPage: {},
      foldConnected: false,
      rects: {},
      cellsMeta: {},
      mediaMeta: {},
      anchors: {},
      blockBoxes: {},
      frameBox: null,
      frameAnchorsLive: false,
      frameSummon: null,
      frameSummonDark: null,
      summonFile: null,
      summonNotes: {},
      outbox: {},
      summonHandoff: {},
      summonOpen: {},
      mentionNames: {},
      pinWords: {},
      summonBlocks: {},
      summonTops: {},
      summonAnchorStarts: {},
      optimisticY: {},
      renderKey: {},
      hidden: commentsStoreSet13,
      present: null,
      doorStanding: {},
      folded: DataModelSchemasFreeze,
      docScrollY: 0,
      docExtent: null,
      docScrollMax: null,
      autoResolved: new (Map as Dynamic)(),
      focusId: null,
      peekDrop: null,
      dirtyEditors: new (Set as Dynamic)(),
      replyDrafts: {},
      draftY: null,
      draftFollows: false,
      draftH: null,
      draftTarget: null,
      draftAnchor: null,
      quietPost: null,
      quietPostY: null,
      surfaceCarrier: [],
      activeId: null,
      activePeers: NO_PEERS,
      scrollToId: null,
      listRevealAsk: null,
      cardKeyAsk: null,
      loading: {},
      working: {},
      commentMode: `margin`,
      showResolvedMarks: false,
      resolvedIds: commentsStoreSet13,
      resolvedFoldOpen: false,
      mutGen: 0,
      ...createCommentPreferencesActions(commentStoreContext),
      ...createCommentLoadingActions(commentStoreContext),
      ...createCommentCreateActions(commentStoreContext),
      ...createCommentMutationsActions(commentStoreContext),
      ...createCommentReplyActions(commentStoreContext),
      ...createCommentResolutionActions(commentStoreContext),
      ...createCommentReactionsActions(commentStoreContext),
      ...createCommentReopenActions(commentStoreContext),
      ...createCommentGeometryActions(commentStoreContext),
      ...createCommentDraftsActions(commentStoreContext),
    };
  };
}

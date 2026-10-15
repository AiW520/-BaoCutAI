/** BaoCut: comments store from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  create,
  inFrame,
  preloadTImport,
} from "./platform-core-dependencies";
import {
  collectObservabilityTelemetryValue,
} from "./platform-core-observability-telemetry-1";
import {
  emitTelemetryEvent,
} from "./platform-core-observability-telemetry-3";
import {
  takeBusyWhy,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolveEditorAnchorsAndMentionsTest,
} from "./platform-core-editor-anchors-and-mentions-1";
import {
  toast,
} from "./platform-core-ui-toasts";
import {
  createPagesCommentConfirmedEvent,
  createPagesCommentWithdrawEvent,
  createPagesReactionVerdictEvent,
  createPagesReactionVerdictEvent2,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  frameViewer,
  subscribeFrameViewer,
} from "./platform-core-observability-browser-and-operation-events-3";
import {
  frameMentioned,
} from "./platform-core-observability-browser-and-operation-events-4";
import {
  api,
} from "./platform-core-platform-api-and-auth-1";
import {
  isDoorUnreachable,
} from "./platform-core-platform-api-and-auth-2";
import {
  subscribeProjectFeed,
} from "./platform-core-platform-api-and-auth-5";
import {
  PlatformApiAndAuthUser,
} from "./platform-core-platform-api-and-auth-6";
import {
  DataModelSchemasANCHORLABELMAX,
  DataModelSchemasFreeze,
  getDataModelSchemasTarget2,
  getDataModelSchemasTmp,
  isDataModelSchemasKeys,
  resolveDataModelSchemasStands,
  updateDataModelSchemasOpen,
  updateDataModelSchemasQuote,
} from "./platform-core-data-model-schemas-3";
import {
  filterDataModelSchemasFilter4,
  loadDataModelSchemasUtteranceTo,
  resolveDataModelSchemasAgent,
  resolveDataModelSchemasDatumGroup,
  resolveDataModelSchemasNodeCite,
  resolveDataModelSchemasOriginQuote,
  resolveDataModelSchemasParentLabel,
  resolveDataModelSchemasValue12,
  resolveDataModelSchemasValue28,
} from "./platform-core-data-model-schemas-4";
import {
  PlatformAnnouncementsCommentPosted,
  PlatformAnnouncementsMessage2,
} from "./platform-core-platform-announcements";
import {
  foldStore,
  refIndexAtom,
} from "./platform-core-data-operation-engine-4";
import {
  CommentsStoreState2,
  commentsStoreSet3,
} from "./platform-core-comments-store-2";
import {
  ANCHOR_GONE_CARD_WORDS,
  CommentQueuedError,
  CommentsStoreCommentsUnreachable,
  CommentsStoreMessage3,
  CommentsStoreReason,
  CommentsStoreState4,
  CommentsStoreState5,
  CommentsStoreState8,
  CommentsStoreSuperseded,
  CommentsStoreYourCommentWillPostWhenTheConnectionIsBack,
  NO_PEERS,
  REACTION_NOT_REMOVED_WORDS,
  WITHDRAW_PENDING_MS,
  WITHDRAW_RETRY_MS,
  _outboxStoreAsk,
  _unreachableRetry,
  cardDraftAtRisk,
  carrierBooked,
  clearCommentsStoreSome,
  clearCommentsStoreState,
  commentDenyCopy,
  commentWords,
  commentsStoreMap10,
  commentsStoreMap11,
  commentsStoreMap12,
  commentsStoreMap13,
  commentsStoreMap14,
  commentsStoreMap15,
  commentsStoreMap16,
  commentsStoreMap17,
  commentsStoreMap18,
  commentsStoreMap19,
  commentsStoreMap2,
  commentsStoreMap20,
  commentsStoreMap3,
  commentsStoreMap4,
  commentsStoreMap5,
  commentsStoreMap6,
  commentsStoreMap8,
  commentsStoreMap9,
  commentsStoreSet10,
  commentsStoreSet13,
  commentsStoreSet4,
  commentsStoreSet6,
  commentsStoreSet7,
  commentsStoreSet8,
  commentsStoreSet9,
  commentsStoreValue02,
  commentsStoreValue64,
  commentsStoreValue80,
  commentsStoreValues2,
  getCommentsStoreByPage,
  getCommentsStoreValue,
  getCommentsStoreValue2,
  hiddenResolvedThread,
  isCommentRefusal,
  isCommentsStoreKeys,
  isCommentsStoreKeys2,
  isCommentsStoreReplies,
  isCommentsStoreReplies2,
  isCommentsStoreResolved,
  isSelbarDraft,
  isTmpId,
  landedSummon,
  loadCommentsStoreLoading,
  loadCommentsStoreVerb,
  nothingToSee,
  quietCarrierThreads,
  resolveCommentsStoreAuthor,
  resolveCommentsStoreEmptyComment,
  resolveCommentsStoreFocusId,
  resolveCommentsStoreImul,
  resolveCommentsStoreIndexOf2,
  resolveCommentsStoreKey,
  resolveCommentsStoreLeft,
  resolveCommentsStoreLeft2,
  resolveCommentsStoreMessage,
  resolveCommentsStoreNode3,
  resolveCommentsStoreParent,
  resolveCommentsStoreRefusedCopy,
  resolveCommentsStoreResolved,
  resolveCommentsStoreSet,
  resolveCommentsStoreSet2,
  resolveCommentsStoreSet3,
  resolveCommentsStoreSignal,
  resolveCommentsStoreToString,
  resolveCommentsStoreUsers,
  resolveCommentsStoreValue16,
  resolveCommentsStoreValue17,
  resolveCommentsStoreValue18,
  resolveCommentsStoreValue6,
  resolveCommentsStoreValue7,
  resolveCommentsStoreValue8,
  resolveCommentsStoreValue9,
  resolveCommentsStoreValues,
  resolveCommentsStoreVerdict,
  rootCommentViaDoor,
  updateCommentsStoreBacking,
  updateCommentsStoreBodyKey,
  updateCommentsStoreOpId,
  updateCommentsStoreTimer,
} from "./platform-core-comments-store-4";

var commentsStoreValue0: number;

var CommentsStoreState3: Dynamic;

function _focusMoveWatcher(
  FocusMoveWatcher?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    FocusMoveWatcher !== options &&
    CommentsStoreState3 !== null &&
    FocusMoveWatcher === CommentsStoreState3
  ) {
    CommentsStoreState3 = null;
  }
}

var resolveCommentsStoreValue10: (..._extraArguments: unknown[]) => undefined;

var commentsStoreValue_1: boolean;

var commentsStoreState: Dynamic;

var resolveCommentsStoreValue11: (..._extraArguments: unknown[]) => undefined;

var resolveCommentsStoreValue12: (..._extraArguments: unknown[]) => undefined;

var commentsStoreValue_12: boolean;

var CommentsStoreState6: Dynamic;

var CommentsStoreState7: Dynamic;

var commentsStoreState3: Dynamic;

var commentsStoreValue04: boolean;

var commentsStoreValue05: number;

var commentsStoreValue06: number;

var resolveCommentsStoreValue13: (..._extraArguments: unknown[]) => undefined;

var resolveCommentsStoreValue14: (..._extraArguments: unknown[]) => undefined;

var CommentsStoreState9: Dynamic;

function updateCommentsStoreOutbox(
  pid?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let updateCommentsStoreOutboxResult: Dynamic = ++commentsStoreValue06;
  commentsStoreValue04 = true;
  commentsStoreValue_1 = true;
  if (CommentsStoreState6 === pid)
    for (let updateCommentsStoreOutboxResult2 of commentsStoreMap11.values() as Dynamic)
      if (updateCommentsStoreOutboxResult2.timer === undefined) {
        updateCommentsStoreTimer(updateCommentsStoreOutboxResult2);
      }
  if (CommentsStoreState6 !== pid) {
    for (let updateCommentsStoreOutboxResult2 of commentsStoreMap9.values() as Dynamic)
      resolveCommentsStoreSet().clear(updateCommentsStoreOutboxResult2.timer);
    commentsStoreMap9.clear();
    resolveCommentsStoreValues(true);
    if (commentsStoreMap12.size > 0) {
      let items: Dynamic = [...commentsStoreMap12.keys()];
      useCommentStore.setState(
        (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          if (
            !items.some(
              (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                Object.hasOwn(
                  updateCommentsStoreOutbox2.outbox,
                  rolldownNImport2,
                ),
            )
          )
            return updateCommentsStoreOutbox2;
          let outbox: Dynamic = {
            ...updateCommentsStoreOutbox2.outbox,
          };
          for (let updateCommentsStoreOutboxResult2 of items as Dynamic)
            delete outbox[updateCommentsStoreOutboxResult2];
          return {
            outbox: outbox,
          };
        },
      );
    }
    CommentsStoreState6 = pid;
    commentsStoreMap12.clear();
    commentsStoreSet8.clear();
    CommentsStoreState9 = null;
    if (!commentsStoreMap20.has(pid)) {
      let updateCommentsStoreOutboxResult2: Dynamic = null;
      let preloadTImport2: Dynamic = preloadTImport(
        (..._extraArguments: unknown[]): Dynamic =>
          import("./comment-outbox-backing").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              (updateCommentsStoreOutboxResult2 = result.openScopedOutbox(
                pid,
                CommentsStoreState8,
              )),
            (..._extraArguments: unknown[]) => (
              console.warn(
                `comments: outbox storage did not load — unsent comments are kept in memory only`,
              ),
              null
            ),
          ),
        collectObservabilityTelemetryValue([6, 5]),
        import.meta.url,
      );
      commentsStoreMap20.set(pid, {
        get backing(): Dynamic {
          return updateCommentsStoreOutboxResult2?.backing ?? `pending`;
        },
        load: (..._extraArguments: unknown[]): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.load() ?? [],
          ),
        put: (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.put(updateCommentsStoreOutbox2),
          ),
        del: (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.del(updateCommentsStoreOutbox2),
          ),
        has: (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.has(updateCommentsStoreOutbox2) ?? true,
          ),
        get: (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.get(updateCommentsStoreOutbox2) ?? `standing`,
          ),
      });
    }
  }
  commentsStoreMap20
    .get(pid)
    ?.load()
    .then(
      (
        updateCommentsStoreOutbox2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (updateCommentsStoreOutboxResult !== commentsStoreValue06) return;
        let filteredUpdateCommentsStoreOutbox: Dynamic =
          updateCommentsStoreOutbox2.filter(
            (page?: Dynamic, ..._extraArguments: unknown[]) =>
              page.pid === pid &&
              !commentsStoreMap12.has(page.tmpId) &&
              !commentsStoreSet8.has(page.opId),
          );
        if (filteredUpdateCommentsStoreOutbox.length !== 0) {
          for (let updateCommentsStoreOutboxResult2 of filteredUpdateCommentsStoreOutbox as Dynamic) {
            if (updateCommentsStoreOutboxResult2.refused !== undefined) {
              updateCommentsStoreOutboxResult2.refusedCopy =
                updateCommentsStoreOutboxResult2.refused.copy;
            }
            commentsStoreMap12.set(
              updateCommentsStoreOutboxResult2.tmpId,
              updateCommentsStoreOutboxResult2,
            );
          }
          useCommentStore.setState(
            (
              updateCommentsStoreOutbox3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let outbox: Dynamic = {
                ...updateCommentsStoreOutbox3.outbox,
              };
              for (let updateCommentsStoreOutboxResult2 of filteredUpdateCommentsStoreOutbox as Dynamic)
                if (updateCommentsStoreOutboxResult2.refused === undefined) {
                  outbox[updateCommentsStoreOutboxResult2.tmpId] ??= {
                    state: commentsStoreValue04 ? `failed` : `queued`,
                  };
                } else {
                  outbox[updateCommentsStoreOutboxResult2.tmpId] = {
                    state: `refused`,
                    copy: updateCommentsStoreOutboxResult2.refused.copy,
                  };
                }
              return {
                outbox: outbox,
              };
            },
          );
          resolveCommentsStoreValue13();
          resolveCommentsStoreValue14();
        }
      },
    );
  let updateCommentsStoreBacking2: Dynamic = updateCommentsStoreBacking(
    pid,
    CommentsStoreMessage3,
  );
  let commentsStoreValue9: Dynamic = resolveCommentsStoreValue9();
  updateCommentsStoreBacking2
    .load()
    .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      for (let page of result as Dynamic) {
        let since = Date.parse(page.createdAt);
        let bodyKey: Dynamic = page.value?.bodyKey;
        let value: Dynamic = page.value;
        if (page.pid !== pid || !(resolveCommentsStoreValue9() - since < 6e5))
          updateCommentsStoreBacking2.del(page.opId);
        else if (
          value?.state === `withdrawing` &&
          typeof value.id == `string`
        ) {
          commentsStoreMap15.delete(page.opId);
          resolveCommentsStoreValue11(
            {
              opId: page.opId,
              pid: pid,
              pageId: page.pageId,
              container: page.container,
            },
            value.id,
            value.road === `answer` || value.road === `replayed`
              ? value.road
              : `feed`,
            {
              since: since,
            },
          );
        } else if (typeof bodyKey != `string`)
          updateCommentsStoreBacking2.del(page.opId);
        else if (!commentsStoreMap15.has(page.opId)) {
          let record2: Dynamic = {
            opId: page.opId,
            pid: pid,
            pageId: page.pageId,
            container: page.container,
            bodyKey: bodyKey,
            at: since,
          };
          updateCommentsStoreBodyKey(record2, false);
          let commentsStoreMap18Entry: Dynamic = commentsStoreMap18.get(
            page.opId,
          );
          if (commentsStoreMap18Entry?.bodyKey !== bodyKey) continue;
          if (commentsStoreMap18Entry.heardAt >= commentsStoreValue9) {
            resolveCommentsStoreValue11(
              record2,
              commentsStoreMap18Entry.id,
              `feed`,
            );
          } else {
            clearCommentsStoreState(page.opId);
            emitTelemetryEvent(
              createPagesCommentWithdrawEvent(`already_posted`, `feed`),
            );
          }
        }
      }
    });
  try {
    commentsStoreState3 = (
      CommentsStoreState8.viewer ??
      (inFrame()
        ? (
            updateCommentsStoreOutbox2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            subscribeFrameViewer(
              `project/${updateCommentsStoreOutbox2}`,
              options,
            )
        : undefined)
    )?.(
      pid,
      (
        updateCommentsStoreOutbox2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          updateCommentsStoreOutbox2 &&
          commentsStoreMap13.set(pid, updateCommentsStoreOutbox2)
        ),
    );
  } catch {
    commentsStoreState3 = undefined;
  }
  let feed: Dynamic =
    CommentsStoreState8.feed ??
    ((
      updateCommentsStoreOutbox2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => subscribeProjectFeed(updateCommentsStoreOutbox2, options));
  try {
    CommentsStoreState7 = feed(
      pid,
      (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (entry.kind === `envelope`) {
          updateCommentsStoreOpId(entry.envelope, pid);
        } else {
          if (
            (entry.kind === `live` || entry.kind === `recovered`) &&
            commentsStoreMap17.size > 0
          ) {
            resolveCommentsStoreValue12();
          }
        }
        if (updateCommentsStoreOutboxResult === commentsStoreValue06) {
          if (entry.kind === `envelope`) {
            if (resolveDataModelSchemasAgent(entry.envelope) !== null) {
              CommentsStoreState9 = Date.now();
            }
            return;
          }
          if (entry.kind === `live` || entry.kind === `recovered`) {
            commentsStoreValue04 = true;
            commentsStoreValue05++;
            commentsStoreValue_12 = false;
            resolveCommentsStoreValue14();
          } else {
            if (
              entry.kind === `down` ||
              entry.kind === `revoked` ||
              entry.kind === `moving`
            ) {
              commentsStoreValue04 = false;
              resolveCommentsStoreValue10();
              useCommentStore.setState(
                (
                  updateCommentsStoreOutbox2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  let enabled = false;
                  let outbox: Dynamic = {
                    ...updateCommentsStoreOutbox2.outbox,
                  };
                  for (let [
                    updateCommentsStoreOutboxResult2,
                    updateCommentsStoreOutboxResult3,
                  ] of Object.entries(outbox) as Dynamic)
                    if (updateCommentsStoreOutboxResult3.state === `failed`) {
                      outbox[updateCommentsStoreOutboxResult2] = {
                        state: `queued`,
                        ...(updateCommentsStoreOutboxResult3.unconfirmed !==
                          undefined && {
                          unconfirmed:
                            updateCommentsStoreOutboxResult3.unconfirmed,
                        }),
                      };
                      enabled = true;
                    }
                  return enabled
                    ? {
                        outbox: outbox,
                      }
                    : updateCommentsStoreOutbox2;
                },
              );
            }
          }
        }
      },
    );
  } catch {
    CommentsStoreState7 = null;
  }
}

function updateCommentsStoreSome(..._extraArguments: unknown[]): undefined {
  commentsStoreValue06++;
  let CommentsStoreState62: Dynamic = CommentsStoreState6;
  if (
    CommentsStoreState7 !== null &&
    CommentsStoreState62 !== null &&
    [...commentsStoreMap15.values(), ...commentsStoreMap17.values()].some(
      (page?: Dynamic, ..._extraArguments: unknown[]) =>
        page.pid === CommentsStoreState62,
    )
  ) {
    commentsStoreMap19.get(CommentsStoreState62)?.();
    commentsStoreMap19.set(CommentsStoreState62, CommentsStoreState7);
  } else {
    CommentsStoreState7?.();
  }
  CommentsStoreState7 = null;
  commentsStoreState3?.();
  commentsStoreState3 = undefined;
  commentsStoreValue_1 = false;
  resolveCommentsStoreValue10();
  resolveCommentsStoreValues();
}

var resolveCommentsStoreValue15: (..._extraArguments: unknown[]) => string;

var useCommentStore: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step1(): void {
  (commentsStoreValue0 = 0);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step2(): void {
  (CommentsStoreState3 = null);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step3(): void {
  (resolveCommentsStoreValue10 = (
    ..._extraArguments: unknown[]
  ): undefined => {});
  (commentsStoreValue_1 = false);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step4(): void {
  (resolveCommentsStoreValue11 = (
    ..._extraArguments: unknown[]
  ): undefined => {});
  (resolveCommentsStoreValue12 = (
    ..._extraArguments: unknown[]
  ): undefined => {});
  (commentsStoreValue_12 = false);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step5(): void {
  (CommentsStoreState6 = null);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step6(): void {
  (CommentsStoreState7 = null);
  (commentsStoreValue04 = true);
  (commentsStoreValue05 = 0);
  (commentsStoreValue06 = 0);
  (resolveCommentsStoreValue13 = (
    ..._extraArguments: unknown[]
  ): undefined => {});
  (resolveCommentsStoreValue14 = (
    ..._extraArguments: unknown[]
  ): undefined => {});
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step7(): void {
  (CommentsStoreState9 = null);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step8(): void {
  (resolveCommentsStoreValue15 = (..._extraArguments: unknown[]) => ``);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step9(): void {
  (useCommentStore = create(
    (
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
        commentsStoreValue0++;
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
          if (--commentsStoreValue0 === 0 && CommentsStoreState2 !== null) {
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
      resolveCommentsStoreValue15 = (..._extraArguments: unknown[]): Dynamic =>
        viewerPrincipal() ?? ``;
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
      resolveCommentsStoreValue13 = (
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
        let commentsStoreValue052 = commentsStoreValue05;
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
                resolveCommentsStoreValue11(
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
              (commentsStoreValue_12 = false),
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
            commentsStoreValue04 &&
            commentsStoreValue_1 &&
            page.pid === CommentsStoreState6 &&
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
              state: commentsStoreValue04 ? `failed` : `queued`,
              ...(commentsStoreMap9Entry2 !== undefined && {
                unconfirmed: commentsStoreMap9Entry2.mark,
              }),
            });
            if (commentsStoreValue05 !== commentsStoreValue052) {
              queueMicrotask((..._extraArguments: unknown[]) =>
                resolveCommentsStoreValue14(),
              );
            }
          } else if (commentsStoreMap12.has(page.tmpId)) {
            if (commentsStoreMap12.get(page.tmpId) !== page) {
              queueMicrotask((..._extraArguments: unknown[]) =>
                resolveCommentsStoreValue14(),
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
            resolveCommentsStoreValue11(
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
          commentsStoreValue_12 = false;
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
          (commentsStoreValue05 !== dependencies ||
            context instanceof (CommentsStoreReason as Dynamic))
        ) {
          queueMicrotask((..._extraArguments: unknown[]) =>
            resolveCommentsStoreValue14(),
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
      resolveCommentsStoreValue11 = (
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
        resolveCommentsStoreSet3().clear(commentsStoreState);
        commentsStoreState = undefined;
        let mappedItems: Dynamic = [...commentsStoreMap17.values()].map(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item.trying === true
              ? item.since + WITHDRAW_PENDING_MS
              : item.nextTryAt,
        );
        if (mappedItems.length > 0) {
          commentsStoreState = resolveCommentsStoreSet3().set(
            (..._extraArguments: unknown[]) => resolveCommentsStoreValue12(`due`),
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
      resolveCommentsStoreValue12 = (
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
        if (page.pid !== CommentsStoreState6) {
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
      resolveCommentsStoreValue10 = (
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
        let difference: Dynamic = resolveCommentsStoreValue9() - options.t0;
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
        if (CommentsStoreState6 === null) return;
        if (drainingOutbox) {
          drainAgain = true;
          return;
        }
        drainingOutbox = true;
        let CommentsStoreState62: Dynamic = CommentsStoreState6;
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
              if (CommentsStoreState6 !== CommentsStoreState62) return;
              if (
                !resolveCommentsStoreRefusedCopy(useCommentStoreResult) &&
                commentsStoreMap9.get(useCommentStoreResult.tmpId)?.paused !==
                  false &&
                (await retryOutboxEntry(useCommentStoreResult)) === `unanswered`
              )
                break;
            }
            if (!drainAgain || CommentsStoreState6 !== CommentsStoreState62)
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
      resolveCommentsStoreValue14 = (..._extraArguments: unknown[]): undefined =>
        void drainOutbox();
      let reportOutboxFailure = (
        error?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (error instanceof (CommentsStoreReason as Dynamic))
          return void toast.error(
            error.message,
            resolveCommentsStoreValue7(error),
          );
        if (!(!commentsStoreValue04 || commentsStoreValue_12)) {
          commentsStoreValue_12 = true;
          toast.error(CommentsStoreYourCommentWillPostWhenTheConnectionIsBack, {
            id: CommentsStoreCommentsUnreachable,
          });
        }
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
        setCommentMode: (
          commentMode?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore({
            commentMode: commentMode,
          }),
        setResolvedFoldOpen: (
          resolvedFoldOpen?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
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
          setStore(
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
          setStore(
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
                (
                  commentStore3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => commentStore3.id,
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
              let activeId: Dynamic = hiddenResolvedThread2(
                commentStore2.activeId,
              );
              let commentsStoreFocusId = resolveCommentsStoreFocusId({
                focusId: commentStore2.focusId,
                resolvedIds: resolvedIds,
                wasResolved:
                  commentStore2.focusId !== null &&
                  commentStore2.resolvedIds.has(commentStore2.focusId),
                showResolvedMarks: commentStore2.showResolvedMarks,
                marker: CommentsStoreState3,
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
                CommentsStoreState3 = commentStore2.focusId;
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
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              if (options === null) {
                if (!(commentStore in commentStore2.working))
                  return commentStore2;
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
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let uniqueItems: Dynamic = new (Set as Dynamic)(
                (commentStore2.byPage[commentStore] ?? []).map(
                  (
                    byPageItem?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => byPageItem.id,
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
        fetch(
          commentStore?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic {
          commentsStoreSet4.add(options);
          loadViewerId();
          if (CommentsStoreState2 !== null) {
            deleteEpochs[options] = commentStore;
            setStore(
              (
                commentStore2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                commentStore2.byPage[options] === undefined
                  ? {
                      byPage: {
                        ...commentStore2.byPage,
                        [options]: commentsStoreValues2,
                      },
                    }
                  : commentStore2,
            );
            return Promise.resolve();
          }
          let label = `${commentStore}\n${options}`;
          deleteEpochs[options] = commentStore;
          let loadingItem: Dynamic = getStore().loading[label];
          if (loadingItem) return loadingItem;
          let mutationStartItem: Dynamic = mutationStarts[options];
          let commentsStoreValue022: Dynamic = commentsStoreValue02;
          let useCommentStoreResult = (async (
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            try {
              let list: Dynamic = await api.comments.list(commentStore, options);
              if (
                commentsStoreValue02 !== commentsStoreValue022 ||
                deleteEpochs[options] !== commentStore
              )
                return;
              if (
                mutationGenerations[options] ||
                mutationStarts[options] !== mutationStartItem
              ) {
                replyEpochs[options] = commentStore;
                if (!mutationGenerations[options]) {
                  delete replyEpochs[options];
                  Promise.resolve().then(
                    (..._extraArguments: unknown[]): Dynamic =>
                      getStore().fetch(
                        deleteEpochs[options] ?? commentStore,
                        options,
                      ),
                  );
                }
                return;
              }
              setStore(
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => ({
                  byPage: {
                    ...commentStore2.byPage,
                    [options]: isCommentsStoreReplies2(options, list) ?? list,
                  },
                }),
              );
            } finally {
              setStore(
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  let { [label]: loading, ...loading2 }: Dynamic =
                    commentStore2.loading;
                  return {
                    loading: loading2,
                  };
                },
              );
            }
          })();
          setStore(
            (
              commentStore2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => ({
              loading: {
                ...commentStore2.loading,
                [label]: useCommentStoreResult,
              },
            }),
          );
          return useCommentStoreResult;
        },
        refetch(
          commentStore?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic {
          return getStore().fetch(deleteEpochs[options] ?? commentStore, options);
        },
        refetchAll(
          commentStore?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined {
          for (let useCommentStoreResult of Object.keys(
            getStore().byPage,
          ) as Dynamic)
            getStore().fetch(
              deleteEpochs[useCommentStoreResult] ?? commentStore,
              useCommentStoreResult,
            );
        },
        seatDoorList(
          commentStore?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined {
          let filteredOptions: Dynamic = options.filter(isCommentsStoreResolved);
          commentsStoreMap4.set(commentStore, filteredOptions);
          let updateDataModelSchemasQuote2: Dynamic =
            updateDataModelSchemasQuote(options);
          commentsStoreMap6.set(commentStore, updateDataModelSchemasQuote2);
          let dataModelSchemasStands: Dynamic = resolveDataModelSchemasStands(
            updateDataModelSchemasQuote2,
          );
          let useCommentStoreHandler: Dynamic = (
            commentStore2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let doorStandingItem: Dynamic =
              commentStore2.doorStanding[commentStore];
            return (doorStandingItem?.size ?? 0) ===
              dataModelSchemasStands.size &&
              [...dataModelSchemasStands].every(
                (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  doorStandingItem.has(item),
              )
              ? {}
              : {
                  doorStanding: {
                    ...commentStore2.doorStanding,
                    [commentStore]: dataModelSchemasStands,
                  },
                };
          };
          if (CommentsStoreState2 === null) {
            setStore(
              (
                commentStore2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                let dataModelSchemasTmp: Dynamic = getDataModelSchemasTmp(
                  commentStore2.byPage[commentStore] ?? [],
                  filteredOptions,
                );
                let dataModelSchemasTmp2: Dynamic = getDataModelSchemasTmp(
                  commentStore2.allByPage[commentStore] ?? [],
                  options,
                );
                return {
                  byPage: {
                    ...commentStore2.byPage,
                    [commentStore]:
                      isCommentsStoreReplies2(
                        commentStore,
                        dataModelSchemasTmp,
                      ) ?? dataModelSchemasTmp,
                  },
                  allByPage: {
                    ...commentStore2.allByPage,
                    [commentStore]:
                      isCommentsStoreReplies2(
                        commentStore,
                        dataModelSchemasTmp2,
                      ) ?? dataModelSchemasTmp2,
                  },
                  ...useCommentStoreHandler(commentStore2),
                };
              },
            );
            return;
          }
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let byPageItem: Dynamic =
                commentStore2.byPage[commentStore] ?? commentsStoreValues2;
              // BaoCut: room 不同步 utterance，本页新建的批注不会进 fold，原版由 fold 接管它的后续回复。
              // 这里让门里列表的同 id 批注顶替本地那份（与门里来的批注同样处理），智能体的回复才能实时出现。
              let foldRefs: Dynamic = foldStore.get(refIndexAtom);
              let commentsStoreMap5Entry: Dynamic = new (Set as Dynamic)([
                ...(commentsStoreMap5.get(commentStore) ?? commentsStoreSet6),
                ...options
                  .map(
                    (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      option.id,
                  )
                  .filter(
                    (id?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      !foldRefs.has(`utterance/${id}`),
                  ),
              ]);
              let filteredAllByPageItem: Dynamic = commentStore2.allByPage[
                commentStore
              ]?.filter(
                (commentStore3?: Dynamic, ..._extraArguments: unknown[]) =>
                  !commentsStoreMap5Entry.has(commentStore3.id),
              );
              let {
                open: updateDataModelSchemasOpen2,
                all: updateDataModelSchemasOpen3,
              }: Dynamic = updateDataModelSchemasOpen(
                byPageItem.filter(
                  (byPageItem2?: Dynamic, ..._extraArguments: unknown[]) =>
                    !commentsStoreMap5Entry.has(byPageItem2.id),
                ),
                filteredAllByPageItem,
                getCommentsStoreValue(commentStore, commentStore2.present),
                undefined,
                getCommentsStoreValue2(commentStore, commentStore2.present),
              );
              let isCommentsStoreReplies3: Dynamic = isCommentsStoreReplies(
                commentStore,
                new (Set as Dynamic)(
                  updateDataModelSchemasOpen2.map(
                    (
                      updateDataModelSchemasOpen4?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => updateDataModelSchemasOpen4.id,
                  ),
                ),
              );
              commentsStoreMap5.set(
                commentStore,
                new (Set as Dynamic)(
                  isCommentsStoreReplies3.map(
                    (
                      isCommentsStoreReply?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => isCommentsStoreReply.id,
                  ),
                ),
              );
              let items: Dynamic = isCommentsStoreReplies3.length
                ? [...updateDataModelSchemasOpen2, ...isCommentsStoreReplies3]
                : updateDataModelSchemasOpen2;
              let isCommentsStoreReplies22: Dynamic =
                isCommentsStoreReplies2(commentStore, items) ?? items;
              let matchesIsCommentsStoreReplies2Count: Dynamic =
                isCommentsStoreReplies22.length === byPageItem.length &&
                isCommentsStoreReplies22.every(
                  (
                    isCommentsStoreReplies23?: Dynamic,
                    index?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) => isCommentsStoreReplies23 === byPageItem[index],
                );
              if (
                matchesIsCommentsStoreReplies2Count &&
                updateDataModelSchemasOpen3 === filteredAllByPageItem
              ) {
                let useCommentStoreHandler2: Dynamic =
                  useCommentStoreHandler(commentStore2);
                return useCommentStoreHandler2.doorStanding === undefined
                  ? commentStore2
                  : useCommentStoreHandler2;
              }
              return {
                ...useCommentStoreHandler(commentStore2),
                ...(matchesIsCommentsStoreReplies2Count
                  ? {}
                  : {
                      byPage: {
                        ...commentStore2.byPage,
                        [commentStore]: isCommentsStoreReplies22,
                      },
                    }),
                ...(updateDataModelSchemasOpen3 === undefined
                  ? {}
                  : {
                      allByPage: {
                        ...commentStore2.allByPage,
                        [commentStore]: isCommentsStoreReplies2(commentStore, [
                          ...updateDataModelSchemasOpen3,
                          ...isCommentsStoreReplies3,
                        ]) ?? [
                          ...updateDataModelSchemasOpen3,
                          ...isCommentsStoreReplies3,
                        ],
                      },
                    }),
              };
            },
          );
        },
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
            : withMutation(
                container,
                pageId,
                async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                  let focusId = resolveCommentsStoreToString();
                  let user: Dynamic = viewerPrincipal() ?? ``;
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
                    setStore(
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
                    setStore({
                      focusId: focusId,
                      peekDrop: null,
                    });
                  }
                  updatePageComments(
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
                    updatePageComments(
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
                    setStore(
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
                    resolveDataModelSchemasValue28(
                      toClaude === true,
                      body2,
                      to,
                    ) && (await loadDataModelSchemasUtteranceTo())
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
                  let file: Dynamic = summonOwedTo ?? getStore().summonFile;
                  pendingCreates.set(focusId, {
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
                      pendingCreates.delete(focusId);
                      commentsStoreSet7.add(focusId);
                      minted.err(useCommentStoreResult3);
                      return reportMutationError(
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
                      updatePageComments(
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
                    acceptCreate(pageId, focusId, useCommentStoreResult2.id);
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
                    useCommentStoreResult = await sendOutboxEntry(
                      record5,
                      `post`,
                      quietCarrier === true ? `quiet-carrier` : undefined,
                    );
                  } catch (useCommentStoreResult2: Dynamic) {
                    throw (
                      commentsStoreMap12.delete(focusId),
                      pendingCreates.delete(focusId),
                      setOutboxStatus(focusId, null),
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
                      getStore().discardOutbox(focusId, false),
                      quietCarrierThreads.delete(focusId),
                      Error(`quiet carrier: the room did not answer`)
                    );
                  if (typeof useCommentStoreResult != `string`) {
                    let landed: Dynamic = deferredResult();
                    let commentQueuedError: Dynamic =
                      new (CommentQueuedError as Dynamic)(
                        useCommentStoreResult.held,
                        landed.promise,
                      );
                    throw (
                      minted.err(commentQueuedError),
                      pendingCreates.set(focusId, {
                        ...pendingCreates.get(focusId),
                        minted: undefined,
                        landed: landed,
                      }),
                      useCommentStoreResult.unconfirmed !== true &&
                        reportOutboxFailure(useCommentStoreResult.held),
                      commentQueuedError
                    );
                  }
                  acceptCreate(pageId, focusId, useCommentStoreResult);
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
            (await retryOutboxEntry(commentsStoreMap12Entry)) === `landed`
          ) {
            drainOutbox();
          }
        },
        discardOutbox(
          commentStore?: Dynamic,
          options: Dynamic = true,
          ..._extraArguments: unknown[]
        ): undefined {
          let commentsStoreMap12Entry: Dynamic =
            commentsStoreMap12.get(commentStore);
          clearPostingWait(commentStore);
          setOutboxStatus(commentStore, null);
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
          forgetOutboxEntry(commentsStoreMap12Entry);
          let pendingCreateEntry: Dynamic = pendingCreates.get(commentStore);
          pendingCreates.delete(commentStore);
          let Error2 = Error(`discarded`);
          pendingCreateEntry?.minted?.err(Error2);
          pendingCreateEntry?.landed?.err(Error2);
          pendingReplies.get(commentStore)?.landed.err(Error2);
          pendingReplies.delete(commentStore);
          if (commentsStoreMap12Entry.kind === `create`) {
            commentsStoreSet7.add(commentStore);
            updatePageComments(
              commentsStoreMap12Entry.pageId,
              (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                commentStore2.filter(
                  (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                    rolldownNImport2.id !== commentStore,
                ),
            );
            setStore(
              (
                commentStore2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
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
            updatePageComments(
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
                      filteredRolldownNImport.id ===
                      commentsStoreMap12Entry.parent
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
        async edit(
          commentStore?: Dynamic,
          options?: Dynamic,
          context?: Dynamic,
          dependencies?: Dynamic,
          argument?: Dynamic,
          argument2: Dynamic = `Couldn't save edit`,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> {
          ensureNotPosting(context);
          let body: Dynamic = commentWords(dependencies);
          if (nothingToSee(body)) throw resolveCommentsStoreEmptyComment();
          let file: Dynamic = getStore().summonFile;
          return withMutation(
            commentStore,
            options,
            async (..._extraArguments: unknown[]): Promise<undefined> => {
              let useCommentStoreResult: Dynamic;
              updatePageComments(
                options,
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  updateComment(
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
              let threadId: Dynamic = commentsForPage(options)?.find(
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
                          ...(getStore().byPage[options] ?? []),
                          ...(getStore().allByPage[options] ?? []),
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
                      let commentsStoreUsers2: Dynamic = await commentsStoreUsers(
                        {
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
                    },
                  );
                }
              } catch (useCommentStoreResult2: Dynamic) {
                reportMutationError(
                  (..._extraArguments: unknown[]): Dynamic =>
                    useCommentStoreResult &&
                    updatePageComments(
                      options,
                      (
                        commentStore2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        updateComment(
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
                  getStore().summonBlocks,
                  threadId,
                )
                  ? getStore().summonBlocks[threadId]
                  : argument.block;
                let summonTopItem: Dynamic = Object.hasOwn(
                  getStore().summonTops,
                  threadId,
                )
                  ? getStore().summonTops[threadId]
                  : argument.y;
                let anchorStart: Dynamic = Object.hasOwn(
                  getStore().summonAnchorStarts,
                  threadId,
                )
                  ? getStore().summonAnchorStarts[threadId]
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
          let commentsStoreValue6 = resolveCommentsStoreValue6(
            `remove`,
            options2,
          );
          if (!commentsStoreSet3.has(commentsStoreValue6)) {
            commentsStoreSet3.add(commentsStoreValue6);
            try {
              return await withMutation(
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
                  updatePageComments(
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
                        useCommentStoreHandler = (
                          ..._extraArguments: unknown[]
                        ) =>
                          updatePageComments(
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
                        useCommentStoreHandler = (
                          ..._extraArguments: unknown[]
                        ) =>
                          updatePageComments(
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
                    reportMutationError(
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
            ensureNotPosting(context);
          }
          let commentsStoreUsers: Dynamic = resolveCommentsStoreUsers(container);
          let pid: Dynamic = CommentsStoreState4;
          let threadId: Dynamic =
            commentsStoreMap8Entry === undefined
              ? context
              : await commentsStoreMap8Entry;
          return withMutation(
            container,
            pageId,
            async (..._extraArguments: unknown[]): Promise<Dynamic> => {
              let tmpId = resolveCommentsStoreToString();
              let user: Dynamic = viewerPrincipal() ?? ``;
              let record2: Dynamic = {
                id: tmpId,
                user: user,
                actor: `human`,
                at: new Date().toISOString(),
                body: body,
                to: argument,
              };
              updatePageComments(
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
                      rolldownNImport2.id === threadId
                        ? {
                            ...rolldownNImport2,
                            replies: [...rolldownNImport2.replies, record2],
                          }
                        : rolldownNImport2,
                  ),
              );
              let updatePageComments2: Dynamic = (
                ..._extraArguments: unknown[]
              ) =>
                updatePageComments(
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
                  await preloadTImport(
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
                    import.meta.url,
                  )
                ).extractMentions(body);
              let matchesToClaude = argument2?.toClaude === true;
              let argument4: Dynamic =
                commentsStoreUsers !== null &&
                resolveDataModelSchemasValue28(
                  matchesToClaude,
                  body,
                  argument3,
                ) &&
                (await loadDataModelSchemasUtteranceTo())
                  ? argument3
                  : null;
              let useCommentStoreHandler = (
                ..._extraArguments: unknown[]
              ): undefined => {
                argument3?.length;
              };
              let file: Dynamic = getStore().summonFile;
              let summon = (..._extraArguments: unknown[]): undefined => {
                let block: Dynamic = Object.hasOwn(
                  getStore().summonBlocks,
                  threadId,
                )
                  ? getStore().summonBlocks[threadId]
                  : argument2?.block;
                let summonTopItem: Dynamic = Object.hasOwn(
                  getStore().summonTops,
                  threadId,
                )
                  ? getStore().summonTops[threadId]
                  : argument2?.y;
                let anchorStart: Dynamic = Object.hasOwn(
                  getStore().summonAnchorStarts,
                  threadId,
                )
                  ? getStore().summonAnchorStarts[threadId]
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
                  return reportMutationError(
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
                  useCommentStoreResult2 = await sendOutboxEntry(
                    record3,
                    `reply`,
                  );
                } catch (useCommentStoreResult3: Dynamic) {
                  throw (
                    commentsStoreMap12.delete(tmpId),
                    setOutboxStatus(tmpId, null),
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
                  let landed: Dynamic = deferredResult();
                  throw (
                    pendingReplies.set(tmpId, {
                      after: (..._extraArguments: unknown[]): undefined => {
                        useCommentStoreHandler();
                        summon();
                      },
                      summon: summon,
                      landed: landed,
                    }),
                    useCommentStoreResult2.unconfirmed !== true &&
                      reportOutboxFailure(useCommentStoreResult2.held),
                    new (CommentQueuedError as Dynamic)(
                      useCommentStoreResult2.held,
                      landed.promise,
                    )
                  );
                }
                setOutboxStatus(tmpId, null);
                useCommentStoreResult = useCommentStoreResult2;
              }
              useCommentStoreHandler();
              let result: Dynamic =
                commentsStoreUsers === null
                  ? await api.comments
                      .thread(threadId)
                      .catch((..._extraArguments: unknown[]) => null)
                  : null;
              updatePageComments(
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
        async resolve(
          commentStore?: Dynamic,
          options?: Dynamic,
          focusId?: Dynamic,
          dependencies?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<undefined> {
          if (isTmpId(focusId)) return;
          let commentsStoreValue6 = resolveCommentsStoreValue6(
            `resolve`,
            focusId,
          );
          if (!commentsStoreSet3.has(commentsStoreValue6)) {
            commentsStoreSet3.add(commentsStoreValue6);
            try {
              await withMutation(
                commentStore,
                options,
                async (..._extraArguments: unknown[]) => {
                  let commentsForPage2: Dynamic = commentsForPage(options)?.find(
                    (commentStore2?: Dynamic, ..._extraArguments: unknown[]) =>
                      commentStore2.id === focusId,
                  );
                  updatePageComments(
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
                  let wasResolved: Dynamic = getStore().resolvedIds.has(focusId);
                  if (!wasResolved) {
                    setStore(
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
                  setStore(
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
                        marker: CommentsStoreState3,
                      });
                      let focusId2: Dynamic = matchesFocusId
                        ? null
                        : commentStore2.focusId;
                      if (
                        commentStore2.focusId === focusId &&
                        !matchesFocusId &&
                        commentsStoreFocusId
                      ) {
                        CommentsStoreState3 = focusId;
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
                    if (CommentsStoreState3 === focusId) {
                      CommentsStoreState3 = null;
                    }
                    if (!wasResolved) {
                      setStore(
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
                      updatePageComments(
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
                                    ? copyResolution(
                                        rolldownNImport2,
                                        commentsForPage2,
                                      )
                                    : rolldownNImport2,
                              )
                            : getStore().allByPage[options] === undefined
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
                        let commentsStoreUsers2: Dynamic =
                          await commentsStoreUsers({
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
                    return reportMutationError(
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
                    setStore(
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
        async react(
          commentStore?: Dynamic,
          options?: Dynamic,
          context?: Dynamic,
          emoji?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> {
          if (isTmpId(context)) return;
          let user: Dynamic = viewerPrincipal();
          if (!user) return;
          let commentsStoreUsers: Dynamic =
            resolveCommentsStoreUsers(commentStore);
          if (commentsStoreUsers === null)
            return withMutation(
              commentStore,
              options,
              async (..._extraArguments: unknown[]): Promise<undefined> => {
                let useCommentStoreResult: Dynamic;
                updatePageComments(
                  options,
                  (
                    commentStore2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    updateComment(
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
                  reportMutationError(
                    (..._extraArguments: unknown[]): Dynamic =>
                      useCommentStoreResult &&
                      updatePageComments(
                        options,
                        (
                          commentStore2?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          updateComment(
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
          let store: Dynamic = getStore();
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
                Error(
                  `un-react: reaction-utterance id not served (v1 read plane)`,
                )
              );
            let id: Dynamic = reactionItem.id;
            return withMutation(
              commentStore,
              options,
              async (..._extraArguments: unknown[]): Promise<undefined> => {
                let useCommentStoreResult: Dynamic;
                updatePageComments(
                  options,
                  (
                    commentStore2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    updateComment(
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
                  reportMutationError(
                    (..._extraArguments: unknown[]): Dynamic =>
                      useCommentStoreResult &&
                      updatePageComments(
                        options,
                        (
                          commentStore2?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          updateComment(
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
          return withMutation(
            commentStore,
            options,
            async (..._extraArguments: unknown[]): Promise<undefined> => {
              let useCommentStoreResult: Dynamic;
              updatePageComments(
                options,
                (
                  commentStore2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  updateComment(
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
                  updatePageComments(
                    options,
                    (
                      commentStore2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      updateComment(
                        commentStore2,
                        context,
                        (
                          commentStore3?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic => {
                          let reactionItem2: Dynamic =
                            commentStore3.reactions?.[emoji] ?? [];
                          let findLastIndex: Dynamic =
                            reactionItem2.findLastIndex(
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
                reportMutationError(
                  (..._extraArguments: unknown[]): Dynamic =>
                    useCommentStoreResult &&
                    updatePageComments(
                      options,
                      (
                        commentStore2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        updateComment(
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
          let enabled: Dynamic = false;
          try {
            await withMutation(
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
                    : getStore().allByPage[options]?.find(
                        (
                          commentStore2?: Dynamic,
                          ..._extraArguments: unknown[]
                        ) => commentStore2.id === context,
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
                        let commentsStoreUsers2: Dynamic =
                          await commentsStoreUsers({
                            verb: `delete`,
                            ref: {
                              object: `utterance`,
                              id: commentsStoreMap2Entry2,
                            },
                          });
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
                  updatePageComments(
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
                                ? (result ?? unresolveComment(rolldownNImport2))
                                : rolldownNImport2,
                          )
                        : result
                          ? [...commentStore2, result]
                          : commentStore2,
                  );
                  setStore(
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
            setStore(
              (
                commentStore2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                if (!commentStore2.autoResolved.has(context))
                  return commentStore2;
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
        setSummonOpen: (
          commentStore?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let summonOpenItem: Dynamic = Object.hasOwn(
                commentStore2.summonOpen,
                commentStore,
              )
                ? commentStore2.summonOpen[commentStore]
                : undefined;
              if ((options ?? undefined) === summonOpenItem) return commentStore2;
              let { [commentStore]: summonOpen, ...summonOpen2 }: Dynamic =
                commentStore2.summonOpen;
              return {
                summonOpen:
                  options === null
                    ? summonOpen2
                    : {
                        ...summonOpen2,
                        [commentStore]: options,
                      },
              };
            },
          ),
        setSummonNote: (
          commentStore?: Dynamic,
          options?: Dynamic,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let summonNoteItem: Dynamic = Object.hasOwn(
                commentStore2.summonNotes,
                commentStore,
              )
                ? commentStore2.summonNotes[commentStore]
                : undefined;
              let matchesOptions = options !== null && context?.handoff === true;
              let hasOwn = Object.hasOwn(
                commentStore2.summonHandoff,
                commentStore,
              );
              if (
                (options ?? undefined) === summonNoteItem &&
                matchesOptions === hasOwn
              )
                return commentStore2;
              let { [commentStore]: summonNotes, ...summonNotes2 }: Dynamic =
                commentStore2.summonNotes;
              let { [commentStore]: summonHandoff, ...summonHandoff2 }: Dynamic =
                commentStore2.summonHandoff;
              return {
                summonNotes:
                  options === null
                    ? summonNotes2
                    : {
                        ...summonNotes2,
                        [commentStore]: options,
                      },
                ...(matchesOptions !== hasOwn && {
                  summonHandoff: matchesOptions
                    ? {
                        ...summonHandoff2,
                        [commentStore]: true,
                      }
                    : summonHandoff2,
                }),
              };
            },
          ),
        dropOptimisticY: (
          commentStore?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let optimisticY: Dynamic = null;
              for (let useCommentStoreResult of commentStore as Dynamic)
                if (useCommentStoreResult in commentStore2.optimisticY) {
                  if (optimisticY === null) {
                    optimisticY = {
                      ...commentStore2.optimisticY,
                    };
                  }
                  delete optimisticY[useCommentStoreResult];
                }
              return optimisticY === null
                ? commentStore2
                : {
                    optimisticY: optimisticY,
                  };
            },
          ),
        setRects: (
          rects?: Dynamic,
          items?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let isCommentsStoreKeys22 = isCommentsStoreKeys2(
                commentStore.rects,
                rects,
              );
              let matchesHiddenCount: Dynamic =
                commentStore.hidden.size === items.length &&
                items.every(
                  (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    commentStore.hidden.has(item),
                );
              let optimisticY: Dynamic = commentStore.optimisticY;
              for (let useCommentStoreResult in commentStore.optimisticY)
                if (useCommentStoreResult in rects) {
                  if (optimisticY === commentStore.optimisticY) {
                    let { ...optimisticY2 }: Dynamic = commentStore.optimisticY;
                    optimisticY = optimisticY2;
                  }
                  delete optimisticY[useCommentStoreResult];
                }
              return isCommentsStoreKeys22 &&
                matchesHiddenCount &&
                optimisticY === commentStore.optimisticY
                ? commentStore
                : {
                    ...(isCommentsStoreKeys22
                      ? {}
                      : {
                          rects: rects,
                        }),
                    ...(matchesHiddenCount
                      ? {}
                      : {
                          hidden: items.length
                            ? new (Set as Dynamic)(items)
                            : commentsStoreSet13,
                        }),
                    ...(optimisticY !== commentStore.optimisticY && {
                      optimisticY: optimisticY,
                    }),
                  };
            },
          ),
        setCellsMeta: (
          cellsMeta?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              isCommentsStoreKeys(
                commentStore.cellsMeta,
                cellsMeta,
                (
                  entry?: Dynamic,
                  entry2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  entry.kind === entry2.kind &&
                  entry.n === entry2.n &&
                  entry.header === entry2.header,
              )
                ? commentStore
                : {
                    cellsMeta: cellsMeta,
                  },
          ),
        setMediaMeta: (
          mediaMeta?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              isCommentsStoreKeys(
                commentStore.mediaMeta,
                mediaMeta,
                (
                  entry?: Dynamic,
                  entry2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => entry.kind === entry2.kind,
              )
                ? commentStore
                : {
                    mediaMeta: mediaMeta,
                  },
          ),
        setBlockGeometry: (
          anchors?: Dynamic,
          blockBoxes?: Dynamic,
          frameBox?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let isCommentsStoreKeys3 = isCommentsStoreKeys(
                commentStore.anchors,
                anchors,
                resolveCommentsStoreLeft,
              );
              let isCommentsStoreKeys4 = isCommentsStoreKeys(
                commentStore.blockBoxes,
                blockBoxes,
                resolveCommentsStoreLeft2,
              );
              let matchesFrameBox: Dynamic =
                commentStore.frameBox === frameBox ||
                (commentStore.frameBox !== null &&
                  frameBox !== null &&
                  resolveCommentsStoreLeft2(commentStore.frameBox, frameBox));
              return isCommentsStoreKeys3 &&
                isCommentsStoreKeys4 &&
                matchesFrameBox
                ? commentStore
                : {
                    ...(isCommentsStoreKeys3
                      ? {}
                      : {
                          anchors: anchors,
                        }),
                    ...(isCommentsStoreKeys4
                      ? {}
                      : {
                          blockBoxes: blockBoxes,
                        }),
                    ...(matchesFrameBox
                      ? {}
                      : {
                          frameBox: frameBox,
                        }),
                  };
            },
          ),
        setPresent: (items?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              if (
                items === null
                  ? commentStore.present === null
                  : commentStore.present?.size === items.length &&
                    items.every(
                      (
                        rolldownRImport2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => commentStore.present.has(rolldownRImport2),
                    )
              )
                return commentStore;
              let present: Dynamic =
                items === null ? null : new (Set as Dynamic)(items);
              return {
                present: present,
                ...(CommentsStoreState2 === null
                  ? {}
                  : getCommentsStoreByPage(commentStore, present)),
              };
            },
          ),
        setFolded: (folded?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              isDataModelSchemasKeys(commentStore.folded, folded)
                ? commentStore
                : {
                    folded: folded,
                  },
          ),
        setDocScrollY: (
          docScrollY?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              commentStore.docScrollY === docScrollY
                ? commentStore
                : {
                    docScrollY: docScrollY,
                  },
          ),
        setDocScrollMax: (
          docScrollMax?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              commentStore.docScrollMax === docScrollMax
                ? commentStore
                : {
                    docScrollMax: docScrollMax,
                  },
          ),
        setDocExtent: (
          docExtent?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              (
                commentStore.docExtent === null
                  ? docExtent === null
                  : docExtent !== null &&
                    commentStore.docExtent.top === docExtent.top &&
                    commentStore.docExtent.bottom === docExtent.bottom
              )
                ? commentStore
                : {
                    docExtent: docExtent,
                  },
          ),
        predictDocScroll: (
          commentStore?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              !Number.isFinite(commentStore) || commentStore === 0
                ? commentStore2
                : {
                    rects: resolveDataModelSchemasValue12(
                      commentStore2.rects,
                      commentStore,
                    ),
                    optimisticY: resolveDataModelSchemasValue12(
                      commentStore2.optimisticY,
                      commentStore,
                    ),
                    docScrollY: commentStore2.docScrollY + commentStore,
                    docExtent: commentStore2.docExtent && {
                      top: commentStore2.docExtent.top - commentStore,
                      bottom: commentStore2.docExtent.bottom - commentStore,
                    },
                  },
          ),
        setFocus: (
          focusId?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let peekDrop: Dynamic = getStore().peekDrop;
          setStore({
            focusId: focusId,
            peekDrop:
              focusId === null || options === undefined || options <= 0
                ? null
                : peekDrop !== null &&
                    peekDrop.id === focusId &&
                    peekDrop.dy === options
                  ? peekDrop
                  : {
                      id: focusId,
                      dy: options,
                    },
          });
        },
        setDraftY: (
          draftY?: Dynamic,
          draftH: Dynamic = null,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore({
            draftY: draftY,
            draftH: draftH,
            draftFollows: false,
          }),
        followDraft: (
          { blockTop: blockTop, widgetTop: widgetTop }: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let draftAnchor: Dynamic = commentStore.draftAnchor;
              let draftY: Dynamic = isSelbarDraft(draftAnchor)
                ? blockTop
                : draftAnchor !== null &&
                    draftAnchor.boxDy !== undefined &&
                    widgetTop !== undefined
                  ? widgetTop + draftAnchor.boxDy
                  : undefined;
              let draftFollows = draftY !== undefined;
              return draftY === undefined || commentStore.draftY === draftY
                ? commentStore.draftFollows === draftFollows
                  ? commentStore
                  : {
                      draftFollows: draftFollows,
                    }
                : {
                    draftY: draftY,
                    draftFollows: draftFollows,
                  };
            },
          ),
        setEditorDirty: (
          commentStore?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              if (commentStore2.dirtyEditors.has(commentStore) === options)
                return commentStore2;
              let dirtyEditors: Dynamic = new (Set as Dynamic)(
                commentStore2.dirtyEditors,
              );
              if (options) {
                dirtyEditors.add(commentStore);
              } else {
                dirtyEditors.delete(commentStore);
              }
              return {
                dirtyEditors: dirtyEditors,
              };
            },
          ),
        learnMentionNames: (
          commentStore?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let mentionNames: Dynamic = null;
              for (let [
                useCommentStoreResult,
                useCommentStoreResult2,
              ] of Object.entries(commentStore) as Dynamic) {
                if (
                  !resolveEditorAnchorsAndMentionsTest(useCommentStoreResult) ||
                  typeof useCommentStoreResult2 != `string`
                )
                  continue;
                let trimmedUseCommentStoreResultSlice = useCommentStoreResult2
                  .trim()
                  .slice(0, commentsStoreValue80);
                if (
                  !(
                    trimmedUseCommentStoreResultSlice === `` ||
                    commentStore2.mentionNames[useCommentStoreResult] ===
                      trimmedUseCommentStoreResultSlice
                  )
                ) {
                  (mentionNames ??= {
                    ...commentStore2.mentionNames,
                  })[useCommentStoreResult] = trimmedUseCommentStoreResultSlice;
                }
              }
              return mentionNames === null
                ? commentStore2
                : {
                    mentionNames: mentionNames,
                  };
            },
          ),
        stashReplyDraft: (
          commentStore?: Dynamic,
          options?: Dynamic,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let replyDraftItem: Dynamic =
                commentStore2.replyDrafts[commentStore];
              if (options === null) {
                if (replyDraftItem === undefined) return commentStore2;
                let { [commentStore]: replyDrafts, ...replyDrafts2 }: Dynamic =
                  commentStore2.replyDrafts;
                return {
                  replyDrafts: replyDrafts2,
                };
              }
              if (replyDraftItem === undefined)
                return {
                  replyDrafts: {
                    ...commentStore2.replyDrafts,
                    [commentStore]: options,
                  },
                };
              let [items, setItems]: Dynamic = context
                ? [options.json, replyDraftItem.json]
                : [replyDraftItem.json, options.json];
              let json2: Dynamic = {
                ...items,
                content: [...(items.content ?? []), ...(setItems.content ?? [])],
              };
              return {
                replyDrafts: {
                  ...commentStore2.replyDrafts,
                  [commentStore]: {
                    ...replyDraftItem,
                    json: json2,
                  },
                },
              };
            },
          ),
        markReplyDraftTold: (
          commentStore?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let replyDraftItem: Dynamic =
                commentStore2.replyDrafts[commentStore];
              return replyDraftItem === undefined || replyDraftItem.told
                ? commentStore2
                : {
                    replyDrafts: {
                      ...commentStore2.replyDrafts,
                      [commentStore]: {
                        ...replyDraftItem,
                        told: true,
                      },
                    },
                  };
            },
          ),
        setDraftAnchor: (
          draftAnchor?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore({
            draftAnchor: draftAnchor,
          }),
        setQuietPost: (
          quietPost?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore({
            quietPost: quietPost,
            quietPostY: quietPost === null ? null : (options ?? null),
          }),
        setSurfaceCarrier: (
          commentStore?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (
              commentStore2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => ({
              surfaceCarrier:
                commentStore === null
                  ? []
                  : commentStore2.surfaceCarrier.includes(commentStore)
                    ? commentStore2.surfaceCarrier
                    : [...commentStore2.surfaceCarrier, commentStore],
            }),
          ),
        setPinWords: (
          commentStore: Dynamic,
          options: Dynamic,
          { chart: chart, byId: byId }: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let label = `${commentStore}|${options}`;
              let record2: Dynamic = {
                ...(chart === undefined
                  ? {}
                  : {
                      chart: chart,
                    }),
                byId: byId,
              };
              return JSON.stringify(commentStore2.pinWords[label]) ===
                JSON.stringify(record2)
                ? commentStore2
                : {
                    pinWords: {
                      ...commentStore2.pinWords,
                      [label]: record2,
                    },
                  };
            },
          ),
        setDraftTarget: (
          draftTarget?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore({
            draftTarget: draftTarget,
          }),
        setActive: (
          activeId?: Dynamic,
          items?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore(
            (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              let activePeers: Dynamic =
                activeId !== null && items?.length ? items : NO_PEERS;
              let matchesActivePeersCount: Dynamic =
                activePeers.length === commentStore.activePeers.length &&
                activePeers.every(
                  (
                    activePeer?: Dynamic,
                    index?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) => activePeer === commentStore.activePeers[index],
                );
              return commentStore.activeId === activeId && matchesActivePeersCount
                ? commentStore
                : {
                    activeId: activeId,
                    activePeers: activePeers,
                  };
            },
          ),
        scrollTo: (
          scrollToId?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore({
            scrollToId: scrollToId,
          }),
        revealInList: (
          commentStore?: Dynamic,
          again: Dynamic = false,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore({
            listRevealAsk:
              commentStore === null
                ? null
                : {
                    id: commentStore,
                    again: again,
                  },
          }),
        focusCardByKey: (
          commentStore?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setStore({
            cardKeyAsk:
              commentStore === null
                ? null
                : {
                    id: commentStore,
                  },
          }),
      };
    },
  ));
}

export {
  CommentsStoreState6,
  CommentsStoreState9,
  _focusMoveWatcher,
  commentsStoreValue0,
  commentsStoreValue_1,
  resolveCommentsStoreValue11,
  resolveCommentsStoreValue15,
  updateCommentsStoreOutbox,
  updateCommentsStoreSome,
  useCommentStore,
};

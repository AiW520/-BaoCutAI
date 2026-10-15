/** BaoCut: comments store from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  React,
  create,
  helloBImport,
  helloYImport,
  inFrame,
  preloadTImport,
} from "./platform-core-dependencies";
import {
  collectObservabilityTelemetryValue,
  resolveObservabilityTelemetryCache,
  resolveObservabilityTelemetryValue4,
} from "./platform-core-observability-telemetry-1";
import {
  emitTelemetryEvent,
} from "./platform-core-observability-telemetry-3";
import {
  platformSessionAndSourcesPattern2,
  resolvePlatformSessionAndSourcesMessage,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolvePlatformSessionAndSourcesUnavailable,
} from "./platform-core-platform-session-and-sources-2";
import {
  toast,
} from "./platform-core-ui-toasts";
import {
  createPagesCommentWithdrawEvent,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  frameFenceAuthor,
} from "./platform-core-observability-browser-and-operation-events-3";
import {
  api,
} from "./platform-core-platform-api-and-auth-1";
import {
  collectPlatformApiAndAuthVerb,
  isDoorUnreachable,
  liveDoor,
  relayAccessDeny,
  relayFaultDeny,
  relayGoneDeny,
} from "./platform-core-platform-api-and-auth-2";
import {
  DataModelSchemasUrl,
} from "./platform-core-data-model-schemas-2";
import {
  DataModelSchemasStyles3,
  filterDataModelSchemasKind,
  isBuildConversation,
  isDataModelSchemasArm,
  isDataModelSchemasKind2,
  resolveDataModelSchemasNormal2,
  updateDataModelSchemasOpen,
  updateDataModelSchemasStands,
  updateDataModelSchemasStands2,
} from "./platform-core-data-model-schemas-3";
import {
  filterDataModelSchemasFilter4,
  isDataModelSchemasKind3,
  resolveDataModelSchemasBytes2,
  resolveDataModelSchemasTest6,
  resolveDataModelSchemasTest7,
} from "./platform-core-data-model-schemas-4";
import {
  resolvePlatformAnnouncementsRandomUUID,
  resolvePlatformAnnouncementsToUpperCase,
  resolvePlatformAnnouncementsValue,
} from "./platform-core-platform-announcements";
import {
  foldStore,
  refIndexAtom,
} from "./platform-core-data-operation-engine-4";
import {
  _onFoldReset,
  commentsStoreSet3,
  resolveCommentsStoreCharCodeAt,
} from "./platform-core-comments-store-2";
import {
  CommentsStoreState6,
  CommentsStoreState9,
  _focusMoveWatcher,
  commentsStoreValue_1,
  resolveCommentsStoreValue11,
  resolveCommentsStoreValue15,
  updateCommentsStoreOutbox,
  updateCommentsStoreSome,
  useCommentStore,
} from "./platform-core-comments-store-3";
import {
  CommentsStoreState14,
  commentsStoreValue09,
} from "./platform-core-comments-store-5";

var commentsStoreMap2: Dynamic;

function resolveCommentsStoreFocusId(
  commentsStoreFocusId?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return commentsStoreFocusId.focusId === null ||
    !hiddenResolvedThread(commentsStoreFocusId.focusId, commentsStoreFocusId)
    ? false
    : !commentsStoreFocusId.wasResolved ||
        commentsStoreFocusId.focusId === commentsStoreFocusId.marker;
}

var commentsStoreMap3: Dynamic;

var commentsStoreSet4: Dynamic;

var commentsStoreMap4: Dynamic;

var commentsStoreMap5: Dynamic;

var commentsStoreMap6: Dynamic;

var commentsStoreMap7: Dynamic;

var getCommentsStoreValue: Dynamic;

var getCommentsStoreValue2: Dynamic;

function getCommentsStoreByPage(
  commentsStoreByPage?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let byPage: Dynamic = null;
  let allByPage: Dynamic = null;
  for (let getCommentsStoreByPageResult of commentsStoreMap6.keys() as Dynamic) {
    let byPageItem: Dynamic =
      commentsStoreByPage.byPage[getCommentsStoreByPageResult] ??
      commentsStoreValues2;
    let allByPageItem: Dynamic =
      commentsStoreByPage.allByPage[getCommentsStoreByPageResult];
    if (byPageItem.length === 0 && allByPageItem === undefined) continue;
    let updateDataModelSchemasOpen2: Dynamic = updateDataModelSchemasOpen(
      byPageItem,
      allByPageItem,
      getCommentsStoreValue(getCommentsStoreByPageResult, options),
      commentsStoreMap5.get(getCommentsStoreByPageResult),
      getCommentsStoreValue2(getCommentsStoreByPageResult, options),
    );
    if (
      !updateDataModelSchemasOpen2.open.every(
        (open?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
          open === byPageItem[index],
      )
    ) {
      (byPage ??= {
        ...commentsStoreByPage.byPage,
      })[getCommentsStoreByPageResult] = updateDataModelSchemasOpen2.open;
    }
    if (
      updateDataModelSchemasOpen2.all !== undefined &&
      updateDataModelSchemasOpen2.all !== allByPageItem
    ) {
      (allByPage ??= {
        ...commentsStoreByPage.allByPage,
      })[getCommentsStoreByPageResult] = updateDataModelSchemasOpen2.all;
    }
  }
  return {
    ...(byPage === null
      ? {}
      : {
          byPage: byPage,
        }),
    ...(allByPage === null
      ? {}
      : {
          allByPage: allByPage,
        }),
  };
}

var commentsStoreSet5: Dynamic;

var getCommentsStoreValue3: Dynamic;

function isCommentsStoreReplies(
  commentsStoreReplies?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsStoreMap4Entry: Dynamic =
    commentsStoreMap4.get(commentsStoreReplies);
  if (commentsStoreMap4Entry === undefined) return commentsStoreValues2;
  let filteredCommentsStoreMap4Entry: Dynamic = commentsStoreMap4Entry.filter(
    (commentsStoreMap4Entry2?: Dynamic, ..._extraArguments: unknown[]) =>
      !options.has(commentsStoreMap4Entry2.id) &&
      !commentsStoreMap2.has(commentsStoreMap4Entry2.id) &&
      !getCommentsStoreValue3(commentsStoreMap4Entry2.id) &&
      !commentsStoreSet3.has(
        resolveCommentsStoreValue6(`resolve`, commentsStoreMap4Entry2.id),
      ) &&
      !commentsStoreSet3.has(
        resolveCommentsStoreValue6(`remove`, commentsStoreMap4Entry2.id),
      ) &&
      !commentsStoreMap16.has(commentsStoreMap4Entry2.id),
  );
  return commentsStoreMap16.size === 0
    ? filteredCommentsStoreMap4Entry
    : filteredCommentsStoreMap4Entry.map(
        (
          filteredCommentsStoreMap4Entry2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          filteredCommentsStoreMap4Entry2.replies.some(
            (reply?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              commentsStoreMap16.has(reply.id),
          )
            ? {
                ...filteredCommentsStoreMap4Entry2,
                replies: filteredCommentsStoreMap4Entry2.replies.filter(
                  (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                    !commentsStoreMap16.has(reply.id),
                ),
              }
            : filteredCommentsStoreMap4Entry2,
      );
}

var commentsStoreSet6: Dynamic;

var commentsStoreValue02: Dynamic;

function updateCommentsStoreByPage(
  updateCommentsStoreByPage2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (updateCommentsStoreByPage2) {
    commentsStoreSet4.clear();
    commentsStoreMap4.clear();
    commentsStoreMap5.clear();
    commentsStoreMap6.clear();
  }
  commentsStoreSet5.clear();
  commentsStoreValue02 += 1;
  let byPage: Dynamic = {};
  for (let updateCommentsStoreByPageResult of commentsStoreSet4 as Dynamic)
    byPage[updateCommentsStoreByPageResult] = commentsStoreValues2;
  for (let updateCommentsStoreByPageResult of commentsStoreMap4.keys() as Dynamic) {
    let isCommentsStoreReplies3: Dynamic = isCommentsStoreReplies(
      updateCommentsStoreByPageResult,
      commentsStoreSet6,
    );
    commentsStoreMap5.set(
      updateCommentsStoreByPageResult,
      new (Set as Dynamic)(
        isCommentsStoreReplies3.map(
          (
            isCommentsStoreReply?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => isCommentsStoreReply.id,
        ),
      ),
    );
    if (isCommentsStoreReplies3.length) {
      byPage[updateCommentsStoreByPageResult] = isCommentsStoreReplies3;
    }
  }
  let useCommentStoreState: Dynamic = useCommentStore.getState();
  let focusId: Dynamic =
    useCommentStoreState.focusId !== null &&
    useCommentStoreState.resolvedIds.has(useCommentStoreState.focusId)
      ? useCommentStoreState.focusId
      : null;
  useCommentStore.setState({
    byPage: byPage,
    allByPage: {},
    resolvedIds:
      focusId === null ? commentsStoreSet13 : new (Set as Dynamic)([focusId]),
    ...(updateCommentsStoreByPage2
      ? {
          doorStanding: {},
        }
      : {}),
  });
}

var resolveCommentsStoreValue6: (commentsStoreValue6?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveCommentsStoreIndexOf2: Dynamic;

var commentsStoreValues2: Dynamic;

var resolveCommentsStoreLeft: Dynamic;

var resolveCommentsStoreLeft2: Dynamic;

var isCommentsStoreKeys: (commentsStoreKeys?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var isCommentsStoreKeys2: (commentsStoreKeys2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveCommentsStoreToString: (..._extraArguments: unknown[]) => string;

var isTmpId: Dynamic;

var commentsStoreSet7: Dynamic;

var commentsStoreMap8: Dynamic;

function mintedThreadId(
  mintedThreadId2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!isTmpId(mintedThreadId2)) return mintedThreadId2;
  let renderKey: Dynamic = useCommentStore.getState().renderKey;
  return (
    Object.keys(renderKey).find(
      (renderKeyKey?: Dynamic, ..._extraArguments: unknown[]) =>
        renderKey[renderKeyKey] === mintedThreadId2,
    ) ?? mintedThreadId2
  );
}

function* heldThreads(
  heldThreads2?: Dynamic,
  ..._extraArguments: unknown[]
): Generator<Dynamic, Dynamic, Dynamic> {
  for (let heldThreadsResult of Object.values(heldThreads2.byPage) as Dynamic)
    yield* heldThreadsResult;
  for (let heldThreadsResult of Object.values(
    heldThreads2.allByPage,
  ) as Dynamic)
    yield* heldThreadsResult;
}

function threadClosed(
  threadClosed2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return isTmpId(threadClosed2)
    ? commentsStoreSet7.has(threadClosed2)
    : getCommentsStoreValue3(threadClosed2) ||
        threadResolved(threadClosed2, options);
}

function threadResolved(
  threadResolved2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (isTmpId(threadResolved2)) return false;
  let useCommentStoreState: Dynamic = useCommentStore.getState();
  return useCommentStoreState.resolvedIds.has(threadResolved2)
    ? true
    : (
        useCommentStoreState.allByPage[options]?.find(
          (threadResolved3?: Dynamic, ..._extraArguments: unknown[]) =>
            threadResolved3.id === threadResolved2,
        ) ??
        useCommentStoreState.byPage[options]?.find(
          (threadResolved3?: Dynamic, ..._extraArguments: unknown[]) =>
            threadResolved3.id === threadResolved2,
        )
      )?.resolved === true;
}

var DRAFT_BOX_ID: string;

function cardDraftAtRisk(cardDraft?: Dynamic, ..._extraArguments: unknown[]) {
  return cardDraft.dirtyEditors.size > +!!cardDraft.dirtyEditors.has(`__draft`);
}

var COMPOSE_BOX_ID: string;

function otherEditorDirty(
  otherEditorDirty2?: Dynamic,
  options: Dynamic = COMPOSE_BOX_ID,
  ..._extraArguments: unknown[]
) {
  for (let otherEditorDirtyResult of otherEditorDirty2.dirtyEditors as Dynamic)
    if (otherEditorDirtyResult !== options) return true;
  return false;
}

var EDIT_BOX_PREFIX: string;

function editInProgress(
  editInProgress2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let editInProgressResult of editInProgress2.dirtyEditors as Dynamic)
    if (editInProgressResult.startsWith(`__edit:`)) return true;
  return false;
}

function focusMoveLosesEdit(
  focusMoveLosesEdit2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    focusMoveLosesEdit2.focusId !== null &&
    focusMoveLosesEdit2.focusId !== options &&
    editInProgress(focusMoveLosesEdit2)
  );
}

function isSelbarDraft(selbarDraft?: Dynamic, ..._extraArguments: unknown[]) {
  return (
    selbarDraft !== null &&
    selbarDraft.segment === undefined &&
    selbarDraft.roomWidget !== true
  );
}

function composingOverSelection(
  composingOverSelection2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    composingOverSelection2 !== null &&
    composingOverSelection2.react === undefined &&
    composingOverSelection2.autopost === undefined &&
    isSelbarDraft(composingOverSelection2)
  );
}

function admitReanchor(
  admitReanchor2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    admitReanchor2 === null ||
    admitReanchor2.react !== undefined ||
    admitReanchor2.autopost !== undefined ||
    !isSelbarDraft(admitReanchor2) ||
    options.size > 0
  )
    return false;
  if (!context) return true;
  let matchesIdRange =
    context.idRange !== undefined &&
    admitReanchor2.idRange !== undefined &&
    context.idRange[0] === admitReanchor2.idRange[0] &&
    context.idRange[1] === admitReanchor2.idRange[1];
  let matchesCellIds: Dynamic =
    context.cellIds !== undefined &&
    admitReanchor2.cellIds !== undefined &&
    context.cellIds.length === admitReanchor2.cellIds.length &&
    context.cellIds.every(
      (cellId?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        cellId === admitReanchor2.cellIds[index],
    );
  return !matchesIdRange && !matchesCellIds;
}

function clickAwayDraftVerdict(
  clickAwayDraftVerdict2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return options.size > 0 ||
    clickAwayDraftVerdict2 === null ||
    context.addressable
    ? `keep`
    : context.selecting && admitReanchor(clickAwayDraftVerdict2, options)
      ? `defer`
      : `drop`;
}

function settleClickAway(
  tleClickAway?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return tleClickAway !== null && options === tleClickAway && context.size === 0
    ? `drop`
    : `keep`;
}

var CommentsStoreReason: Dynamic;

var isCommentRefusal: Dynamic;

var editRefusalLeavesBoxOpen: Dynamic;

var CommentsStoreCommentsUnreachable: string;

var CommentsStoreCommentsRetrying: string;

var CommentsStoreMessage: string;

var CommentsStoreMessage2: string;

var CommentsStoreYourCommentWillPostWhenTheConnectionIsBack: string;

var REACTION_NOT_REMOVED_WORDS: string;

var resolveCommentsStoreMessage: Dynamic;

var resolveCommentsStoreValue7: Dynamic;

var _unreachableRetry: {
    delayMs: number;
};

var commentsStoreValue03: number;

async function loadCommentsStoreLoading(
  commentsStoreLoading?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  try {
    return await commentsStoreLoading(0);
  } catch (loadCommentsStoreLoadingResult: Dynamic) {
    if (!isDoorUnreachable(loadCommentsStoreLoadingResult))
      throw loadCommentsStoreLoadingResult;
    let matchesSilent = options?.silent !== true;
    if (matchesSilent) {
      commentsStoreValue03++;
      toast.loading(CommentsStoreMessage2, {
        id: CommentsStoreCommentsRetrying,
      });
    }
    await new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
        setTimeout(resolve, _unreachableRetry.delayMs),
    );
    try {
      return await commentsStoreLoading(1);
    } finally {
      if (matchesSilent && --commentsStoreValue03 === 0) {
        toast.dismiss(CommentsStoreCommentsRetrying);
      }
    }
  }
}

var CELLS_UNSUPPORTED_WORDS: string;

var ANCHOR_GONE_WORDS: Dynamic;

var ANCHOR_GONE_CARD_WORDS: Dynamic;

var resolveCommentsStoreCharGone: Dynamic;

var NOT_THREAD_STARTER_WORDS: Dynamic;

var NOT_AUTHOR_WORDS: Dynamic;

var resolveCommentsStoreNotThreadStarter: Dynamic;

var commentDenyCopy: Dynamic;

var CommentsStoreState4: Dynamic;

function setCommentRoomDoor(
  commentRoomDoor?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (commentRoomDoor !== CommentsStoreState4) {
    updateCommentsStoreSome();
    CommentsStoreState4 = commentRoomDoor;
    if (commentRoomDoor !== null) {
      updateCommentsStoreOutbox(commentRoomDoor);
    }
  }
}

var UNCONFIRMED_RUNGS_MS: Dynamic;

var UNCONFIRMED_EVERY_MS: number;

var UNCONFIRMED_WORDS_AFTER_MS: number;

var resolveCommentsStoreValue8: Dynamic;

var resolveCommentsStoreRefused: Dynamic;

var unconfirmedCreateInDoc: Dynamic;

var unconfirmedReplyIn: Dynamic;

var commentsStoreMap9: Dynamic;

var commentsStoreMap10: Dynamic;

var resolveCommentsStoreSet: Dynamic;

var resolveCommentsStoreValue9: Dynamic;

var SENDING_FACE_MS: number;

var commentsStoreMap11: Dynamic;

var resolveCommentsStoreSet2: Dynamic;

var updateCommentsStoreTimer: (activity?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolveCommentsStoreValues(
  commentsStoreValues3: Dynamic = false,
  ..._extraArguments: unknown[]
): undefined {
  for (let resolveCommentsStoreValuesResult of commentsStoreMap11.values() as Dynamic) {
    resolveCommentsStoreSet2().clear(resolveCommentsStoreValuesResult.timer);
    resolveCommentsStoreValuesResult.timer = undefined;
  }
  if (commentsStoreValues3) {
    commentsStoreMap11.clear();
  }
}

var CommentsStoreSuperseded: string;

var CommentsStoreState5: Dynamic;

var _outboxStoreAsk: {
    ms: number;
};

var resolveCommentsStoreKey: (commentsStoreKey?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var commentsStoreMap12: Dynamic;

var resolveCommentsStoreRefusedCopy: Dynamic;

var commentsStoreSet8: Dynamic;

var commentsStoreMap13: Dynamic;

var resolveCommentsStoreAuthor: Dynamic;

var commentsStoreMap14: Dynamic;

var commentsStoreMap15: Dynamic;

var commentsStoreMap16: Dynamic;

var commentsStoreMap17: Dynamic;

var commentsStoreMap18: Dynamic;

var commentsStoreSet9: Dynamic;

var commentsStoreValue64: number;

var commentsStoreValue32: number;

var CommentsStoreMessage3: string;

var DISCARD_WATCH_MS: number;

var WITHDRAW_PENDING_MS: number;

var WITHDRAW_RETRY_MS: number;

var commentsStoreSet10: Dynamic;

var resolveCommentsStoreSet3: Dynamic;

var commentsStoreMap19: Dynamic;

var commentsStoreState2: Dynamic;

var resolveCommentsStoreImul: (commentsStoreImul?: unknown, ..._extraArguments: unknown[]) => string | null;

var resolveCommentsStoreOpId: Dynamic;

function updateCommentsStoreBodyKey(
  page?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  commentsStoreMap15.set(page.opId, page);
  if (commentsStoreMap15.size > commentsStoreValue64) {
    clearCommentsStoreState(commentsStoreMap15.keys().next().value);
  }
  if (options) {
    updateCommentsStoreBacking(page.pid, CommentsStoreMessage3).put(
      resolveCommentsStoreOpId(page, page.at, {
        bodyKey: page.bodyKey,
      }),
    );
  }
  clearTimeout(commentsStoreState2);
  commentsStoreState2 = setTimeout(resolveCommentsStoreKeys, DISCARD_WATCH_MS);
}

function clearCommentsStoreState(
  clearCommentsStoreState2?: Dynamic,
  page?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let commentsStoreMap15Entry: Dynamic = commentsStoreMap15.get(
    clearCommentsStoreState2,
  );
  commentsStoreMap15.delete(clearCommentsStoreState2);
  if (page === undefined) {
    if (commentsStoreMap15Entry !== undefined) {
      updateCommentsStoreBacking(
        commentsStoreMap15Entry.pid,
        CommentsStoreMessage3,
      ).del(clearCommentsStoreState2);
    }
  } else {
    updateCommentsStoreBacking(page.pid, CommentsStoreMessage3).put(
      resolveCommentsStoreOpId(page, page.since, {
        state: `withdrawing`,
        id: page.id,
        road: page.road,
      }),
    );
  }
  clearCommentsStoreSome();
}

function clearCommentsStoreSome(..._extraArguments: unknown[]): undefined {
  for (let [
    clearCommentsStoreSomeResult,
    clearCommentsStoreSomeResult2,
  ] of commentsStoreMap19 as Dynamic)
    if (
      ![...commentsStoreMap15.values(), ...commentsStoreMap17.values()].some(
        (page?: Dynamic, ..._extraArguments: unknown[]) =>
          page.pid === clearCommentsStoreSomeResult,
      )
    ) {
      commentsStoreMap19.delete(clearCommentsStoreSomeResult);
      clearCommentsStoreSomeResult2();
    }
}

function resolveCommentsStoreKeys(
  commentsStoreKeys: Dynamic = false,
  ..._extraArguments: unknown[]
): undefined {
  clearTimeout(commentsStoreState2);
  commentsStoreState2 = undefined;
  for (let resolveCommentsStoreKeysResult of (commentsStoreKeys
    ? []
    : [...commentsStoreMap15.keys()]) as Dynamic)
    clearCommentsStoreState(resolveCommentsStoreKeysResult);
  commentsStoreMap15.clear();
  commentsStoreSet11.clear();
  clearCommentsStoreSome();
}

var commentsStoreSet11: Dynamic;

function updateCommentsStoreOpId(
  updateCommentsStoreOpId2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let {
    opId: updateCommentsStoreOpId3,
    diff: updateCommentsStoreOpId4,
  }: Dynamic = updateCommentsStoreOpId2 ?? {};
  if (
    typeof updateCommentsStoreOpId3 != `string` ||
    !Array.isArray(updateCommentsStoreOpId4)
  )
    return;
  let commentsStoreMap15Entry: Dynamic = commentsStoreMap15.get(
    updateCommentsStoreOpId3,
  );
  if (
    commentsStoreMap15Entry === undefined &&
    !updateCommentsStoreOpId3.startsWith(`cmt-`)
  )
    return;
  let filteredItems: Dynamic = [
    resolveCommentsStoreValue15(),
    commentsStoreMap13.get(options) ?? ``,
  ].filter((item?: Dynamic, ..._extraArguments: unknown[]) => item !== ``);
  let isDataModelSchemasKind32: Dynamic = isDataModelSchemasKind3(
    updateCommentsStoreOpId2,
  );
  let matchesKind: Dynamic =
    isDataModelSchemasKind32?.kind === `human` &&
    filteredItems.includes(isDataModelSchemasKind32.principal);
  for (let updateCommentsStoreOpIdResult of updateCommentsStoreOpId4 as Dynamic) {
    let ref: Dynamic = updateCommentsStoreOpIdResult?.address?.ref;
    if (
      ref?.object !== `utterance` ||
      typeof ref.id != `string` ||
      updateCommentsStoreOpIdResult.after == null
    )
      continue;
    let bodyKey = resolveCommentsStoreImul(
      updateCommentsStoreOpIdResult.after.body,
    );
    if (commentsStoreMap15Entry === undefined) {
      if (!matchesKind || bodyKey === null) continue;
      commentsStoreMap18.set(updateCommentsStoreOpId3, {
        id: ref.id,
        bodyKey: bodyKey,
        heardAt: resolveCommentsStoreValue9(),
      });
      if (commentsStoreMap18.size > commentsStoreValue32) {
        commentsStoreMap18.delete(commentsStoreMap18.keys().next().value);
      }
    } else if (matchesKind && bodyKey === commentsStoreMap15Entry.bodyKey) {
      resolveCommentsStoreValue11(commentsStoreMap15Entry, ref.id, `feed`);
      return;
    } else if (
      !commentsStoreSet11.has(`${updateCommentsStoreOpId3}|${ref.id}`) &&
      commentsStoreSet11.size < commentsStoreValue64
    ) {
      commentsStoreSet11.add(`${updateCommentsStoreOpId3}|${ref.id}`);
      emitTelemetryEvent(
        createPagesCommentWithdrawEvent(
          `seated_unmatched`,
          filteredItems.length === 0 ||
            (!matchesKind && inFrame() && !commentsStoreMap13.has(options))
            ? `feed:viewer_unknown`
            : matchesKind
              ? `feed:body`
              : `feed:writer`,
        ),
      );
    }
  }
}

var commentsStoreMap20: Dynamic;

var outboxRowsAreDurable: Dynamic;

var CommentsStoreState8: Dynamic;

var ASKED_UNCONFIRMED_MS: number;

var ASKED_ACKED_UNCONFIRMED_MS: number;

var ASKED_ACKED_MAX_MS: number;

var ASKED_TTL_MS: number;

var CommentsStoreMessage4: string;

var commentsStoreMap21: Dynamic;

var commentsStoreMap22: Dynamic;

var commentsStoreSet12: Dynamic;

function summonAgentRowAt(..._extraArguments: unknown[]): Dynamic {
  return CommentsStoreState9;
}

var resolveCommentsStoreOpId2: Dynamic;

function updateCommentsStoreBacking(
  updateCommentsStoreBacking2?: Dynamic,
  options: Dynamic = CommentsStoreMessage4,
  ..._extraArguments: unknown[]
): Dynamic {
  let updateCommentsStoreBacking3: Dynamic =
    options === CommentsStoreMessage4
      ? updateCommentsStoreBacking2
      : `${updateCommentsStoreBacking2}${options}`;
  let commentsStoreMap21Entry: Dynamic = commentsStoreMap21.get(
    updateCommentsStoreBacking3,
  );
  if (commentsStoreMap21Entry === undefined) {
    let preloadTImport2: Dynamic = preloadTImport(
      (..._extraArguments: unknown[]): Dynamic =>
        import("./comment-outbox-backing").then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result.openScopedOutbox(
              updateCommentsStoreBacking2,
              CommentsStoreState8,
              options,
            ),
          (..._extraArguments: unknown[]) => null,
        ),
      collectObservabilityTelemetryValue([6, 5]),
      import.meta.url,
    );
    commentsStoreMap21Entry = {
      backing: `pending`,
      load: (..._extraArguments: unknown[]): Dynamic =>
        preloadTImport2.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result?.load() ?? [],
        ),
      put: (
        updateCommentsStoreBacking4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        preloadTImport2.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result?.put(updateCommentsStoreBacking4),
        ),
      del: (
        updateCommentsStoreBacking4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        preloadTImport2.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result?.del(updateCommentsStoreBacking4),
        ),
      has: (
        updateCommentsStoreBacking4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        preloadTImport2.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result?.has(updateCommentsStoreBacking4) ?? false,
        ),
      get: (
        updateCommentsStoreBacking4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        preloadTImport2.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result?.get(updateCommentsStoreBacking4) ?? null,
        ),
    };
    commentsStoreMap21.set(
      updateCommentsStoreBacking3,
      commentsStoreMap21Entry,
    );
  }
  return commentsStoreMap21Entry;
}

function summonAsked(
  summonAsked2?: Dynamic,
  options?: Dynamic,
  agentRows?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let CommentsStoreState42: Dynamic = CommentsStoreState4;
  if (
    !(CommentsStoreState42 === null || quietCarrierThreads.has(summonAsked2))
  ) {
    commentsStoreMap22.set(summonAsked2, {
      at: options,
      agentRows: agentRows,
    });
    commentsStoreSet12.add(summonAsked2);
    updateCommentsStoreBacking(CommentsStoreState42).put(
      resolveCommentsStoreOpId2(
        CommentsStoreState42,
        summonAsked2,
        options,
        agentRows,
        false,
      ),
    );
  }
}

function summonAskedThisLife(
  summonAskedThisLife2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return commentsStoreSet12.has(summonAskedThisLife2);
}

function summonAskAcked(
  summonAskAcked2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let CommentsStoreState42: Dynamic = CommentsStoreState4;
  if (commentsStoreMap23.has(summonAskAcked2)) {
    carrierDelivered(summonAskAcked2);
  }
  let commentsStoreMap22Entry: Dynamic =
    commentsStoreMap22.get(summonAskAcked2);
  if (
    !(CommentsStoreState42 === null || commentsStoreMap22Entry === undefined)
  ) {
    updateCommentsStoreBacking(CommentsStoreState42).put(
      resolveCommentsStoreOpId2(
        CommentsStoreState42,
        summonAskAcked2,
        commentsStoreMap22Entry.at,
        commentsStoreMap22Entry.agentRows,
        true,
      ),
    );
  }
}

function summonAskSettled(
  summonAskSettled2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  commentsStoreMap22.delete(summonAskSettled2);
  let CommentsStoreState42: Dynamic = CommentsStoreState4;
  if (CommentsStoreState42 !== null) {
    updateCommentsStoreBacking(CommentsStoreState42).del(summonAskSettled2);
  }
}

async function summonAsksLeft(
  summonAsksLeft2?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let CommentsStoreState42: Dynamic = CommentsStoreState4;
  if (CommentsStoreState42 === null) return [];
  let updateCommentsStoreBacking2: Dynamic =
    updateCommentsStoreBacking(CommentsStoreState42);
  let filteredLoad: Dynamic = (await updateCommentsStoreBacking2.load()).filter(
    (page?: Dynamic, ..._extraArguments: unknown[]) =>
      page.pid === CommentsStoreState42,
  );
  let items: Dynamic = [];
  for (let [
    summonAsksLeftResult,
    summonAsksLeftResult2,
  ] of filteredLoad.entries() as Dynamic) {
    let parse = Date.parse(summonAsksLeftResult2.createdAt);
    if (
      !Number.isFinite(parse) ||
      summonAsksLeft2 - parse > 864e5 ||
      summonAsksLeftResult < filteredLoad.length - 64
    )
      updateCommentsStoreBacking2.del(summonAsksLeftResult2.opId);
    else if (!commentsStoreMap22.has(summonAsksLeftResult2.opId)) {
      let value: Dynamic = summonAsksLeftResult2.value;
      let agentRows: Dynamic = value?.agentRows;
      items.push({
        threadId: summonAsksLeftResult2.opId,
        at: parse,
        agentRows:
          typeof agentRows == `number` && Number.isFinite(agentRows)
            ? agentRows
            : 0,
        acked: value?.acked === true,
      });
    }
  }
  return items;
}

var CommentsStoreMessage5: string;

var CARRIER_TTL_MS: number;

var commentsStoreMap23: Dynamic;

var commentsStoreMap24: Dynamic;

var carrierBaselineOf: Dynamic;

var resolveCommentsStoreOpId3: Dynamic;

function carrierBooked(
  carrierBooked2?: Dynamic,
  options: Dynamic = Date.now(),
  agentRows: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  commentsStoreMap24.set(carrierBooked2, agentRows);
  let CommentsStoreState42: Dynamic = CommentsStoreState4;
  if (CommentsStoreState42 !== null) {
    commentsStoreMap23.set(carrierBooked2, {
      at: options,
      agentRows: agentRows,
    });
    updateCommentsStoreBacking(CommentsStoreState42, CommentsStoreMessage5).put(
      resolveCommentsStoreOpId3(
        CommentsStoreState42,
        carrierBooked2,
        options,
        false,
        agentRows,
      ),
    );
  }
}

function carrierDelivered(
  carrierDelivered2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let CommentsStoreState42: Dynamic = CommentsStoreState4;
  let commentsStoreMap23Entry: Dynamic =
    commentsStoreMap23.get(carrierDelivered2);
  if (
    !(CommentsStoreState42 === null || commentsStoreMap23Entry === undefined)
  ) {
    updateCommentsStoreBacking(CommentsStoreState42, CommentsStoreMessage5).put(
      resolveCommentsStoreOpId3(
        CommentsStoreState42,
        carrierDelivered2,
        commentsStoreMap23Entry.at,
        true,
        commentsStoreMap23Entry.agentRows,
      ),
    );
  }
}

function carrierSettled(
  carrierSettled2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  commentsStoreMap23.delete(carrierSettled2);
  commentsStoreMap24.delete(carrierSettled2);
  let CommentsStoreState42: Dynamic = CommentsStoreState4;
  if (CommentsStoreState42 !== null) {
    updateCommentsStoreBacking(CommentsStoreState42, CommentsStoreMessage5).del(
      carrierSettled2,
    );
  }
}

async function carriersLeft(
  carriersLeft2?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let CommentsStoreState42: Dynamic = CommentsStoreState4;
  if (CommentsStoreState42 === null) return [];
  let updateCommentsStoreBacking2: Dynamic = updateCommentsStoreBacking(
    CommentsStoreState42,
    CommentsStoreMessage5,
  );
  let filteredLoad: Dynamic = (await updateCommentsStoreBacking2.load()).filter(
    (page?: Dynamic, ..._extraArguments: unknown[]) =>
      page.pid === CommentsStoreState42,
  );
  let items: Dynamic = [];
  for (let [
    carriersLeftResult,
    carriersLeftResult2,
  ] of filteredLoad.entries() as Dynamic) {
    let parse = Date.parse(carriersLeftResult2.createdAt);
    if (
      !Number.isFinite(parse) ||
      carriersLeft2 - parse > 864e5 ||
      carriersLeftResult < filteredLoad.length - 32
    )
      updateCommentsStoreBacking2.del(carriersLeftResult2.opId);
    else if (!commentsStoreMap23.has(carriersLeftResult2.opId)) {
      let value: Dynamic = carriersLeftResult2.value;
      let agentRows: Dynamic = value?.agentRows;
      let agentRows2 =
        typeof agentRows == `number` &&
        Number.isFinite(agentRows) &&
        agentRows > 0
          ? agentRows
          : 0;
      commentsStoreMap24.set(carriersLeftResult2.opId, agentRows2);
      items.push({
        threadId: carriersLeftResult2.opId,
        at: parse,
        delivered: value?.delivered === true,
        agentRows: agentRows2,
      });
    }
  }
  return items;
}

var CommentQueuedError: Dynamic;

function isCommentsStoreReplies2(
  commentsStoreReplies2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isCommentsStoreReplies2Handler: Dynamic = (
    commentsStoreReplies22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentsStoreMap16.has(commentsStoreReplies22);
  let mappedFilteredOptions: Dynamic =
    commentsStoreMap16.size > 0 &&
    options.some(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isCommentsStoreReplies2Handler(option.id) ||
        option.replies.some(
          (reply?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            isCommentsStoreReplies2Handler(reply.id),
        ),
    )
      ? options
          .filter(
            (option?: Dynamic, ..._extraArguments: unknown[]) =>
              !isCommentsStoreReplies2Handler(option.id),
          )
          .map(
            (
              filteredOption?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              filteredOption.replies.some(
                (reply?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  isCommentsStoreReplies2Handler(reply.id),
              )
                ? {
                    ...filteredOption,
                    replies: filteredOption.replies.filter(
                      (reply?: Dynamic, ..._extraArguments: unknown[]) =>
                        !isCommentsStoreReplies2Handler(reply.id),
                    ),
                  }
                : filteredOption,
          )
      : null;
  for (let entry of commentsStoreMap12.values() as Dynamic)
    if (entry.pageId === commentsStoreReplies2)
      if (entry.kind === `create`) {
        if (
          (mappedFilteredOptions ?? options).some(
            (mappedFilteredOption?: Dynamic, ..._extraArguments: unknown[]) =>
              mappedFilteredOption.id === entry.tmpId,
          )
        )
          continue;
        mappedFilteredOptions ??= [...options];
        mappedFilteredOptions.push(resolveCommentsStoreTarget(entry));
      } else {
        let mappedFilteredOptions2: Dynamic = mappedFilteredOptions ?? options;
        let mappedFilteredOptionIndex: Dynamic =
          mappedFilteredOptions2.findIndex(
            (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
              rolldownNImport2.id === entry.parent,
          );
        if (mappedFilteredOptionIndex === -1) {
          if (
            mappedFilteredOptions2.some(
              (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                rolldownNImport2.id === entry.tmpId,
            )
          )
            continue;
          mappedFilteredOptions ??= [...options];
          mappedFilteredOptions.push(resolveCommentsStoreTarget(entry));
          continue;
        }
        if (
          !mappedFilteredOptions2.some(
            (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
              rolldownNImport2.id === entry.tmpId,
          ) &&
          mappedFilteredOptions2[mappedFilteredOptionIndex].replies.some(
            (reply?: Dynamic, ..._extraArguments: unknown[]) =>
              reply.id === entry.tmpId,
          )
        )
          continue;
        mappedFilteredOptions = (mappedFilteredOptions ?? [...options]).filter(
          (mappedFilteredOption?: Dynamic, ..._extraArguments: unknown[]) =>
            mappedFilteredOption.id !== entry.tmpId,
        );
        let mappedFilteredOptionIndex2: Dynamic =
          mappedFilteredOptions.findIndex(
            (mappedFilteredOption?: Dynamic, ..._extraArguments: unknown[]) =>
              mappedFilteredOption.id === entry.parent,
          );
        let mappedFilteredOptionItem: Dynamic =
          mappedFilteredOptions[mappedFilteredOptionIndex2];
        if (
          !mappedFilteredOptionItem.replies.some(
            (reply?: Dynamic, ..._extraArguments: unknown[]) =>
              reply.id === entry.tmpId,
          )
        ) {
          mappedFilteredOptions[mappedFilteredOptionIndex2] = {
            ...mappedFilteredOptionItem,
            replies: [
              ...mappedFilteredOptionItem.replies,
              resolveCommentsStoreUser(entry),
            ],
          };
        }
      }
  return mappedFilteredOptions;
}

var resolveCommentsStoreUser: Dynamic;

var resolveCommentsStoreTarget: Dynamic;

var resolveCommentsStoreUsers: Dynamic;

var resolveCommentsStoreSignal: Dynamic;

function resolveCommentsStoreCall(
  commentsStoreCall?: Dynamic,
  opId?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    call: (
      commentsStoreCall2?: Dynamic,
      options: Dynamic = {},
      ..._extraArguments: unknown[]
    ): Dynamic =>
      commentsStoreCall.call(commentsStoreCall2, {
        ...options,
        opId: opId,
      }),
  };
}

var resolveCommentsStoreValue16: (..._extraArguments: unknown[]) => string;

var resolveCommentsStoreMinted: Dynamic;

function shedControlChars(
  shedControlChars2?: unknown,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  return typeof shedControlChars2 == `string`
    ? resolveDataModelSchemasTest6(shedControlChars2)
    : options >= 8 || typeof shedControlChars2 != `object` || !shedControlChars2
      ? shedControlChars2
      : Array.isArray(shedControlChars2)
        ? shedControlChars2.map(
            (
              rolldownNImport2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => shedControlChars(rolldownNImport2, options + 1),
          )
        : Object.getPrototypeOf(shedControlChars2) === Object.prototype
          ? Object.fromEntries(
              Object.entries(shedControlChars2).map(
                (
                  [rolldownNImportEntry, rolldownNImportEntryEntry]: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => [
                  rolldownNImportEntry,
                  shedControlChars(rolldownNImportEntryEntry, options + 1),
                ],
              ),
            )
          : shedControlChars2;
}

var commentWords: Dynamic;

var nothingToSee: Dynamic;

var commentsStorePattern4: RegExp;

var COMMENT_BODY_MAX_BYTES: number;

var commentTooLong: Dynamic;

var resolveCommentsStoreEmptyComment: Dynamic;

var CommentsStoreVerdict: {
    verdict: string;
    reason: string;
};

async function loadCommentsStoreVerb(
  commentsStoreVerb?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let shedControlChars2: Dynamic = shedControlChars(options.value);
  let body: Dynamic = shedControlChars2?.body;
  let CommentsStoreVerdict2: Dynamic =
    typeof body == `string` &&
    nothingToSee(body) &&
    resolveDataModelSchemasTest7(options.value) !== null
      ? CommentsStoreVerdict
      : await resolveCommentsStoreSignal(
          commentsStoreVerb,
          context,
          dependencies,
        )({
          verb: `create`,
          object: `utterance`,
          payload: {
            value: shedControlChars2,
          },
        }).catch(resolveCommentsStoreVerdict);
  if (CommentsStoreVerdict2.verdict === `deny`)
    throw new (CommentsStoreReason as Dynamic)(
      commentDenyCopy(
        CommentsStoreVerdict2.reason,
        CommentsStoreVerdict2.detail,
        options.cells,
        CommentsStoreVerdict2.why,
      ),
      CommentsStoreVerdict2.reason,
      CommentsStoreVerdict2.hold,
    );
  return {
    id: resolveCommentsStoreMinted(CommentsStoreVerdict2),
    replayed: CommentsStoreVerdict2.replayed === true,
  };
}

function resolveCommentsStoreVerdict(
  commentsStoreVerdict?: Dynamic,
  options: Dynamic = `create`,
  ..._extraArguments: unknown[]
): Dynamic {
  let relayFaultDeny2: Dynamic =
    relayFaultDeny(commentsStoreVerdict) ??
    relayAccessDeny(commentsStoreVerdict, options)?.body ??
    relayGoneDeny(commentsStoreVerdict, options)?.body;
  if (relayFaultDeny2 == null || relayFaultDeny2.verdict !== `deny`)
    throw commentsStoreVerdict;
  let data: Dynamic = relayFaultDeny2.data;
  return data?.maybe === `unborn`
    ? {
        verdict: `deny`,
        reason: `unavailable`,
      }
    : {
        verdict: `deny`,
        reason: relayFaultDeny2.reason,
        ...(relayFaultDeny2.detail != null && {
          detail: relayFaultDeny2.detail,
        }),
        ...(typeof data?.why == `string` && {
          why: data.why,
        }),
      };
}

var commentsStoreValue80: number;

var rootCommentViaDoor: Dynamic;

var resolveCommentsStoreValue17: Dynamic;

function resolveCommentsStoreNode3(
  commentsStoreNode3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    commentsStoreNode3.source?.object === `node` ||
    commentsStoreNode3.resolved?.object === `node`
  );
}

function resolveCommentsStoreResolved(
  commentsStoreResolved?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolved: Dynamic = commentsStoreResolved.resolved;
  return (
    commentsStoreResolved.datum !== undefined &&
    resolved !== undefined &&
    resolved.path === undefined &&
    resolved.pk === undefined &&
    resolved.column === undefined
  );
}

function resolveCommentsStoreLabel2(
  commentsStoreLabel2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof commentsStoreLabel2 != `string`) return {};
  let label: Dynamic = resolveCommentsStoreCharCodeAt(
    commentsStoreLabel2.trim(),
    128,
  ).trim();
  return label.length > 0
    ? {
        label: label,
      }
    : {};
}

function roomCommentValue(
  node?: Dynamic,
  body?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  cellIds?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let cellIds2: Dynamic =
    cellIds &&
    filterDataModelSchemasKind({
      node: node,
      cellIds: cellIds,
      body: body,
    });
  let enabled: Dynamic =
    !cellIds2 &&
    dependencies &&
    isDataModelSchemasKind2({
      node: node,
      startId: dependencies[0],
      endId: dependencies[1],
      body: body,
    });
  if (context !== undefined && context.exact !== `` && !cellIds2 && !enabled) {
    console.info(
      `[comments] a selection with no char or cell the room can hold: the comment goes on the page`,
    );
  }
  return (
    cellIds2 ||
    enabled || {
      kind: `message`,
      body: body,
      parent: {
        object: `node`,
        id: node,
      },
    }
  );
}

var resolveCommentsStoreParent: Dynamic;

var resolveCommentsStoreValue18: Dynamic;

var quietCarrierThreads: Dynamic;

var quietCarrierWritten: Dynamic;

var isCommentsStoreResolved: Dynamic;

var parkedSummons: Dynamic;

function landedSummon(
  landedSummon2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let useCommentStoreState: Dynamic = useCommentStore.getState();
  let frameSummon: Dynamic =
    useCommentStoreState.frameSummon ?? useCommentStoreState.frameSummonDark;
  if (frameSummon === null) {
    parkedSummons.park(landedSummon2, Date.now());
  } else {
    frameSummon(landedSummon2);
  }
}

var commentsStoreSet13: Dynamic;

var NO_PEERS: Dynamic;

function hiddenResolvedThread(
  hiddenResolvedThread2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    options.resolvedIds.has(hiddenResolvedThread2) && !options.showResolvedMarks
  );
}

var commentsStoreWeakMap: Dynamic;

var useThreads: Dynamic;

var commentsStoreWeakMap2: Dynamic;

var joinPageThreads: Dynamic;

var useThreadsJoined: Dynamic;

var openThreadCountOf: Dynamic;

var useOpenThreadCount: Dynamic;

var useAllThreadsJoined: Dynamic;

var commentsStoreValue16: number;

var commentsStoreSet14: Dynamic;

var resolveCommentsStoreTest: Dynamic;

function isCommentsStoreValue(
  commentsStoreValue?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !resolveCommentsStoreTest(commentsStoreValue) ||
    !resolveCommentsStoreTest(options)
    ? false
    : commentsStoreValue === options ||
        commentsStoreSet14.has(commentsStoreValue);
}

function resolveCommentsStoreOrigin(..._extraArguments: unknown[]) {
  if (typeof window === "undefined" || typeof location === "undefined")
    return null;
  let origin = location.origin;
  if (!resolveCommentsStoreTest(origin)) return null;
  let ancestorOrigins = location.ancestorOrigins;
  if (ancestorOrigins != null && typeof ancestorOrigins.length == `number`) {
    if (ancestorOrigins.length === 0) return null;
    for (let index = 0; index < ancestorOrigins.length; index++)
      if (!isCommentsStoreValue(ancestorOrigins[index], origin)) return null;
    return ancestorOrigins[0];
  }
  try {
    let window2: Dynamic = window;
    let index = 0;
    for (; window2.parent != null && window2.parent !== window2; )
      if (
        ++index > commentsStoreValue16 ||
        ((window2 = window2.parent),
        !resolveCommentsStoreTest(window2.location.origin) ||
          window2.location.origin !== origin)
      )
        return null;
    return index > 0 ? origin : null;
  } catch {
    return null;
  }
}

function isCommentsStoreChrome(..._extraArguments: unknown[]) {
  if (typeof window === "undefined") return false;
  let isCommentsStoreChromeResult: Dynamic;
  try {
    isCommentsStoreChromeResult =
      window.parent != null && window.parent !== window;
  } catch {
    isCommentsStoreChromeResult = true;
  }
  if (isCommentsStoreChromeResult) return resolveCommentsStoreOrigin() !== null;
  let search = typeof location !== "undefined" ? location.search : ``;
  return new URLSearchParams(search).get(`chrome`) === `embed`;
}

var CommentsStoreAuthDone: string;

var commentsStoreValue3000: number;

var CommentsStoreState10: number;

var CommentsStoreState11: number;

var CommentsStoreState12: number;

var commentsStoreState4: Dynamic;

function resolveCommentsStoreFocus(..._extraArguments: unknown[]): undefined {
  commentsStoreState4 &&=
    (clearInterval(commentsStoreState4.timer),
    commentsStoreState4.toastId !== undefined &&
      toast.dismiss(commentsStoreState4.toastId),
    typeof window !== "undefined" &&
      window.removeEventListener(`focus`, commentsStoreState4.probe),
    typeof document !== "undefined" &&
      document.removeEventListener(
        `visibilitychange`,
        commentsStoreState4.onVis,
      ),
    undefined);
}

function updateCommentsStorePendingSignIn(
  updateCommentsStorePendingSignIn3?: Dynamic,
  startMintedAt?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveCommentsStoreFocus();
  let deadline = Date.now() + CommentsStoreState12;
  let startedConnected = !!CommentsStoreClaude.getState().claude?.connected;
  let setState: Dynamic = (..._extraArguments: unknown[]) =>
    Date.now() < deadline
      ? false
      : (resolveCommentsStoreFocus(),
        CommentsStoreClaude.setState({
          pendingSignIn: null,
        }),
        true);
  let probe = (..._extraArguments: unknown[]): undefined => {
    if (!setState()) {
      updateCommentsStorePendingSignIn3();
    }
  };
  let onVis = (..._extraArguments: unknown[]): undefined => {
    if (
      typeof document === "undefined" ||
      document.visibilityState !== `hidden`
    ) {
      probe();
    }
  };
  let timer = setInterval(probe, CommentsStoreState11);
  if (typeof window !== "undefined") {
    window.addEventListener(`focus`, probe);
  }
  if (typeof document !== "undefined") {
    document.addEventListener(`visibilitychange`, onVis);
  }
  commentsStoreState4 = {
    timer: timer,
    probe: probe,
    onVis: onVis,
    deadline: deadline,
    startedConnected: startedConnected,
    startMintedAt: startMintedAt,
  };
}

function updateCommentsStorePendingSignIn2(
  updateCommentsStorePendingSignIn22?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!updateCommentsStorePendingSignIn22.connected) {
    if (commentsStoreState4?.startedConnected) {
      commentsStoreState4.startedConnected = false;
    }
    return;
  }
  if (
    !(
      commentsStoreState4?.startedConnected &&
      (updateCommentsStorePendingSignIn22.mintedAt === undefined ||
        updateCommentsStorePendingSignIn22.mintedAt ===
          commentsStoreState4.startMintedAt)
    )
  ) {
    resolveCommentsStoreFocus();
    if (CommentsStoreClaude.getState().pendingSignIn) {
      CommentsStoreClaude.setState({
        pendingSignIn: null,
      });
    }
  }
}

var CommentsStoreState13: number[];

var resolveCommentsStoreValue19: Dynamic;

var commentsStoreValue_13: boolean;

var commentsStoreValue30000: number;

var commentsStoreState5: Dynamic;

var commentsStoreValue_14: boolean;

function installCommentsStoreError(
  installCommentsStoreError2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let getState = (..._extraArguments: unknown[]): undefined => {
    if (CommentsStoreClaude.getState().status === `error`) {
      installCommentsStoreError2();
    }
  };
  commentsStoreState5 ??= setInterval(getState, commentsStoreValue30000);
  if (!(commentsStoreValue_14 || typeof window === "undefined")) {
    commentsStoreValue_14 = true;
    window.addEventListener(`focus`, getState);
    window.addEventListener(`online`, getState);
  }
}

function resolveCommentsStoreValue20(..._extraArguments: unknown[]): undefined {
  commentsStoreState5 &&= (clearInterval(commentsStoreState5), undefined);
}

var CommentsStoreClaude: Dynamic;

var CommentsStoreBigQuery: {
    [k: string]: any;
};

var commentsStoreMap25: Dynamic;

var commentsStoreSet15: Dynamic;

var commentsStoreValue30002: number;

var resolveCommentsStoreConnectorProbeTimeout: Dynamic;

var resolveCommentsStoreEnabled: Dynamic;

var resolveCommentsStoreSetEnabled: Dynamic;

var resolveCommentsStoreReauthDismiss: Dynamic;

var loadCommentsStoreCatch: (commentsStoreCatch?: Dynamic, ..._extraArguments: unknown[]) => Promise<undefined>;

var updateCommentsStoreFresh: Dynamic;

var CommentsStoreHealth: Dynamic;

function isCommentsStoreIsActive(
  commentsStoreIsActive?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !(
    !options ||
    commentsStoreIsActive !== options ||
    context !== dependencies ||
    !argument ||
    !argument.isActive
  );
}

var CommentsStoreAllowScripts: string;

var commentsStoreValue07: number;

function installCommentsStoreMiss(
  installCommentsStoreMiss2?: Dynamic,
  selector?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let total = `insp-` + ++commentsStoreValue07;
      let enabled = false;
      let removeEventListener2 = (
        installCommentsStoreMiss3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!enabled) {
          enabled = true;
          window.removeEventListener(`message`, removeEventListener3);
          clearTimeout(setTimeout2);
          resolve(installCommentsStoreMiss3);
        }
      };
      let removeEventListener3 = (
        installCommentsStoreMiss3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let data: Dynamic = installCommentsStoreMiss3.data;
        if (
          !(
            installCommentsStoreMiss3.source !==
              installCommentsStoreMiss2.contentWindow ||
            data?.type !== `inspect-result` ||
            data.id !== total
          )
        ) {
          removeEventListener2(
            data.result ?? {
              miss: `inspect: no result`,
            },
          );
        }
      };
      window.addEventListener(`message`, removeEventListener3);
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]) =>
          removeEventListener2({
            miss: `inspect: iframe did not respond (mid-remount?)`,
          }),
        2e3,
      );
      installCommentsStoreMiss2.contentWindow?.postMessage(
        {
          type: `inspect`,
          id: total,
          selector: selector,
        },
        `*`,
      );
    },
  );
}

var commentsStoreValue20000: number;

var commentsStoreValue1500: number;

var CommentsStoreRuntimeOnTheWire: Dynamic;

var commentsStoreState6: Dynamic;

function resolveCommentsStorePaint(
  commentsStorePaint: Dynamic = commentsStoreValue20000,
  ..._extraArguments: unknown[]
): Dynamic {
  commentsStoreState6 ??=
    resolveCommentsStorePaint2() ||
    !resolveCommentsStoreValue21(
      CommentsStoreRuntimeOnTheWire.runtimeOnTheWire,
      false,
    )
      ? Promise.resolve()
      : new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let items: Dynamic = [];
            let resolveCommentsStorePaintHandler = (
              ..._extraArguments: unknown[]
            ): undefined => {};
            let resolveCommentsStorePaintHandler2 = (
              ..._extraArguments: unknown[]
            ): undefined => {
              resolveCommentsStorePaintHandler();
              for (let resolveCommentsStorePaintResult of items as Dynamic)
                clearTimeout(resolveCommentsStorePaintResult);
              resolve();
            };
            items.push(
              setTimeout(resolveCommentsStorePaintHandler2, commentsStorePaint),
            );
            CommentsStoreRuntimeOnTheWire.runtimeSettled()
              .catch((..._extraArguments: unknown[]): undefined => undefined)
              .then((..._extraArguments: unknown[]): undefined => {
                if (!resolveCommentsStorePaint2()) {
                  items.push(
                    setTimeout(
                      resolveCommentsStorePaintHandler2,
                      commentsStoreValue1500,
                    ),
                  );
                }
              });
            resolveCommentsStorePaintHandler = helloYImport(
              (
                commentsStorePaint2?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (
                  commentsStorePaint2 === `paint` ||
                  commentsStorePaint2 === `pixels`
                ) {
                  resolveCommentsStorePaintHandler2();
                }
              },
            );
          },
        );
  return commentsStoreState6;
}

var resolveCommentsStorePaint2: Dynamic;

function resolveCommentsStoreValue21(
  commentsStoreValue21?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return commentsStoreValue21();
  } catch {
    return options;
  }
}

function resolveCommentsStorePreludeReady(
  ..._extraArguments: unknown[]
): Dynamic {
  let loaded: Dynamic = false;
  let booted: Dynamic = false;
  return {
    preludeReady(..._extraArguments: unknown[]) {
      return booted ? false : ((booted = true), true);
    },
    load(..._extraArguments: unknown[]) {
      return loaded
        ? `navigated`
        : ((loaded = true), booted ? `skip` : ((booted = true), `boot`));
    },
    reset(..._extraArguments: unknown[]): undefined {
      loaded = false;
      booted = false;
    },
    state(..._extraArguments: unknown[]): Dynamic {
      return {
        loaded: loaded,
        booted: booted,
      };
    },
    adopt(
      commentsStorePreludeReady?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      loaded ||= commentsStorePreludeReady.loaded === true;
      booted ||= commentsStorePreludeReady.booted === true;
    },
  };
}

var commentsStoreSet16: Dynamic;

function resolveCommentsStoreToLowerCase(
  commentsStore?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof commentsStore == `string` &&
    commentsStoreSet16.has(commentsStore.toLowerCase())
  );
}

function resolveCommentsStoreOwnerOrg(
  commentsStoreOwnerOrg?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveCommentsStoreToLowerCase(commentsStoreOwnerOrg.ownerOrg) &&
    typeof commentsStoreOwnerOrg.viewerId == `string` &&
    commentsStoreOwnerOrg.viewerId.length > 0
  );
}

function resolveCommentsStoreArtifact(
  commentsStoreArtifact?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof commentsStoreArtifact != `object` || !commentsStoreArtifact)
    return null;
  let artifact: Dynamic = commentsStoreArtifact.artifact;
  if (typeof artifact != `object` || !artifact) return null;
  let org: Dynamic = artifact.org;
  return typeof org == `string` && org.length > 0 ? org : null;
}

function isCommentsStoreValue2(..._extraArguments: unknown[]) {
  return false;
}

var commentsStoreValue_15: Dynamic;

var commentsStoreValue_16: Dynamic;

var commentsStoreSet17: Dynamic;

function resolveCommentsStoreValue22(
  commentsStoreValue22?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (commentsStoreValue_15 !== commentsStoreValue22) {
    commentsStoreValue_15 = commentsStoreValue22;
    for (let resolveCommentsStoreValue22Result of commentsStoreSet17 as Dynamic)
      resolveCommentsStoreValue22Result();
  }
}

function useCommentsStoreOwnerOrg(
  commentsStoreOwnerOrg?: Dynamic,
  viewerId?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let ownerOrg: Dynamic = resolveCommentsStoreArtifact(commentsStoreOwnerOrg);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (commentsStoreValue_16 = resolveCommentsStoreToLowerCase(ownerOrg)),
      (..._extraArguments: unknown[]): undefined =>
        void (commentsStoreValue_16 = false)
    ),
    [ownerOrg],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      resolveCommentsStoreValue22(
        resolveCommentsStoreOwnerOrg({
          ownerOrg: ownerOrg,
          viewerId: viewerId,
        }),
      ),
      (..._extraArguments: unknown[]) => resolveCommentsStoreValue22(false)
    ),
    [ownerOrg, viewerId],
  );
}

var clearCommentsStoreDelete: Dynamic;

function resolveCommentsStoreValue23(..._extraArguments: unknown[]): Dynamic {
  return commentsStoreValue_16;
}

function resolveCommentsStoreValue24(..._extraArguments: unknown[]): Dynamic {
  return isCommentsStoreValue2() || commentsStoreValue_15;
}

function useCommentsStoreUseSyncExternalStore(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    clearCommentsStoreDelete,
    resolveCommentsStoreValue24,
    resolveCommentsStoreValue24,
  );
}

var CommentsStoreFrom: Dynamic;

var commentsStoreValue08: number;

function resolveCommentsStoreValue28(
  commentsStoreValue28?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  CommentsStoreFrom[commentsStoreValue08++ % 200] = commentsStoreValue28;
  if (commentsStoreValue08 <= commentsStoreValue09) {
    CommentsStoreState14?.around?.push(commentsStoreValue28);
  }
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step1(): void {
  (commentsStoreMap2 = new (Map as Dynamic)());
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step2(): void {
  (commentsStoreMap3 = new (Map as Dynamic)());
  (commentsStoreSet4 = new (Set as Dynamic)());
  (commentsStoreMap4 = new (Map as Dynamic)());
  (commentsStoreMap5 = new (Map as Dynamic)());
  (commentsStoreMap6 = new (Map as Dynamic)());
  (commentsStoreMap7 = new (Map as Dynamic)());
  (getCommentsStoreValue = (
    commentsStoreValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    updateDataModelSchemasStands(
      commentsStoreMap6.get(commentsStoreValue) ?? commentsStoreMap7,
      options,
    ));
  (getCommentsStoreValue2 = (
    commentsStoreValue2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    updateDataModelSchemasStands2(
      commentsStoreMap6.get(commentsStoreValue2) ?? commentsStoreMap7,
      options,
    ));
  (commentsStoreSet5 = new (Set as Dynamic)());
  (getCommentsStoreValue3 = (
    commentsStoreValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentsStoreSet5.has(commentsStoreValue3) &&
    !foldStore.get(refIndexAtom).has(`utterance/${commentsStoreValue3}`));
  (commentsStoreSet6 = new (Set as Dynamic)());
  (commentsStoreValue02 = 0);
  _onFoldReset((..._extraArguments: unknown[]) =>
    updateCommentsStoreByPage(true),
  );
  (resolveCommentsStoreValue6 = (
    commentsStoreValue6?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${commentsStoreValue6}:${options}`);
  (resolveCommentsStoreIndexOf2 = (
    commentsStoreIndex?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let commentsStoreIndexIndex: Dynamic = commentsStoreIndex.indexOf(`:`);
    return {
      op: commentsStoreIndex.slice(0, commentsStoreIndexIndex),
      id: commentsStoreIndex.slice(commentsStoreIndexIndex + 1),
    };
  });
  (commentsStoreValues2 = []);
  (resolveCommentsStoreLeft = (
    ask?: Dynamic,
    ask2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    ask.bid === ask2.bid &&
    ask.left === ask2.left &&
    ask.start === ask2.start &&
    ask.end === ask2.end);
  (resolveCommentsStoreLeft2 = (
    commentsStoreLeft2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentsStoreLeft2.top === options.top &&
    commentsStoreLeft2.left === options.left &&
    commentsStoreLeft2.width === options.width &&
    commentsStoreLeft2.height === options.height);
  (isCommentsStoreKeys = (
    commentsStoreKeys?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let commentsStoreKeysKeys = Object.keys(commentsStoreKeys);
    if (commentsStoreKeysKeys.length !== Object.keys(options).length)
      return false;
    for (let isCommentsStoreKeysResult of commentsStoreKeysKeys as Dynamic)
      if (
        !Object.hasOwn(options, isCommentsStoreKeysResult) ||
        !context(
          commentsStoreKeys[isCommentsStoreKeysResult],
          options[isCommentsStoreKeysResult],
        )
      )
        return false;
    return true;
  });
  (isCommentsStoreKeys2 = (
    commentsStoreKeys2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let commentsStoreKeys2Keys = Object.keys(commentsStoreKeys2);
    if (commentsStoreKeys2Keys.length !== Object.keys(options).length)
      return false;
    for (let isCommentsStoreKeys2Result of commentsStoreKeys2Keys as Dynamic)
      if (
        commentsStoreKeys2[isCommentsStoreKeys2Result] !==
        options[isCommentsStoreKeys2Result]
      )
        return false;
    return true;
  });
  (resolveCommentsStoreToString = (..._extraArguments: unknown[]) =>
    `tmp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`);
  (isTmpId = (
    tmpId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => tmpId.startsWith(`tmp-`));
  (commentsStoreSet7 = new (Set as Dynamic)());
  (commentsStoreMap8 = new (Map as Dynamic)());
  (DRAFT_BOX_ID = `__draft`);
  (COMPOSE_BOX_ID = `__compose`);
  (EDIT_BOX_PREFIX = `__edit:`);
  (CommentsStoreReason = class extends Error {
    [key: string]: Dynamic;
    reason: Dynamic;
    hold: Dynamic;
    constructor(
      commentsStoreReason?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(commentsStoreReason);
      this.reason = options;
      this.hold = context;
    }
  });
  (isCommentRefusal = (
    commentRefusal?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentRefusal instanceof (CommentsStoreReason as Dynamic) &&
    commentRefusal.reason !== `unavailable`);
  (editRefusalLeavesBoxOpen = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    error instanceof (CommentsStoreReason as Dynamic) &&
    isCommentRefusal(error) &&
    error.message !== NOT_AUTHOR_WORDS &&
    ![`absent`, `parent`, `not_author`, `utterance-author`].includes(
      error.reason ?? ``,
    ));
  (CommentsStoreCommentsUnreachable = `comments:unreachable`);
  (CommentsStoreCommentsRetrying = `comments:retrying`);
  (CommentsStoreMessage = `Couldn't reach the document — check your connection and try again.`);
  (CommentsStoreMessage2 = `Couldn't reach the document — retrying…`);
  (CommentsStoreYourCommentWillPostWhenTheConnectionIsBack = `Your comment will post when the connection is back.`);
  (REACTION_NOT_REMOVED_WORDS = `Couldn't remove reaction`);
  (resolveCommentsStoreMessage = (
    error?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    error instanceof (CommentsStoreReason as Dynamic)
      ? error.message
      : isDoorUnreachable(error)
        ? CommentsStoreMessage
        : options);
  (resolveCommentsStoreValue7 = (
    commentsStoreValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    isDoorUnreachable(commentsStoreValue7)
      ? {
          id: CommentsStoreCommentsUnreachable,
        }
      : undefined);
  (_unreachableRetry = {
    delayMs: 1500,
  });
  (commentsStoreValue03 = 0);
  (CELLS_UNSUPPORTED_WORDS = `This document service cannot attach comments to table cells yet; comment on text inside a cell instead.`);
  (ANCHOR_GONE_WORDS = {
    char_gone: `The text you were commenting on was deleted by someone else — the comment was not posted; what you typed is still in the box.`,
    block_gone: `The paragraph you were commenting on was deleted by someone else — the comment was not posted; what you typed is still in the box.`,
  });
  (ANCHOR_GONE_CARD_WORDS = {
    char_gone: `The text you were commenting on was deleted by someone else while you were offline, so this comment can't be posted here. Copy it from this card if you need it, then discard.`,
    block_gone: `The paragraph you were commenting on was deleted by someone else while you were offline, so this comment can't be posted here. Copy it from this card if you need it, then discard.`,
  });
  (resolveCommentsStoreCharGone = (
    commentsStoreCharGone?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentsStoreCharGone === `char_gone` ||
    commentsStoreCharGone === `block_gone`
      ? ANCHOR_GONE_WORDS[commentsStoreCharGone]
      : undefined);
  (NOT_THREAD_STARTER_WORDS = resolvePlatformAnnouncementsToUpperCase(`not_thread_starter`));
  (NOT_AUTHOR_WORDS = resolvePlatformAnnouncementsToUpperCase(`not_author`));
  (resolveCommentsStoreNotThreadStarter = (
    commentsStoreNotThreadStarter?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let commentsStoreNotThreadStarter2: Dynamic =
      commentsStoreNotThreadStarter === `not_thread_starter` ||
      commentsStoreNotThreadStarter === `not_author`
        ? commentsStoreNotThreadStarter
        : options;
    return commentsStoreNotThreadStarter2 === `not_thread_starter`
      ? NOT_THREAD_STARTER_WORDS
      : commentsStoreNotThreadStarter2 === `not_author`
        ? NOT_AUTHOR_WORDS
        : undefined;
  });
  (commentDenyCopy = (
    commentDenyCopy2?: Dynamic,
    options?: Dynamic,
    context: Dynamic = false,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentDenyCopy2 === `absent`
      ? `That comment is no longer here — reload to catch up.`
      : commentDenyCopy2 === `bad_at` &&
          (context
            ? options === undefined || /kind/.test(options)
            : /unknown_kind/.test(options ?? ``) && /cells/.test(options ?? ``))
        ? CELLS_UNSUPPORTED_WORDS
        : (resolveCommentsStoreNotThreadStarter(commentDenyCopy2, dependencies) ??
          resolveCommentsStoreCharGone(commentDenyCopy2) ??
          resolvePlatformSessionAndSourcesUnavailable(
            commentDenyCopy2,
            dependencies,
          )));
  (CommentsStoreState4 = null);
  (UNCONFIRMED_RUNGS_MS = [1e3, 4e3, 9e3, 15e3, 3e4, 6e4]);
  (UNCONFIRMED_EVERY_MS = 6e4);
  (UNCONFIRMED_WORDS_AFTER_MS = 3e3);
  (resolveCommentsStoreValue8 = (
    commentsStoreValue8?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentsStoreValue8 < UNCONFIRMED_RUNGS_MS.length
      ? UNCONFIRMED_RUNGS_MS[commentsStoreValue8]
      : UNCONFIRMED_RUNGS_MS.at(-1) +
        (commentsStoreValue8 - UNCONFIRMED_RUNGS_MS.length + 1) *
          UNCONFIRMED_EVERY_MS);
  (resolveCommentsStoreRefused = (
    commentsStoreRefused?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentsStoreRefused.state === `refused`
      ? undefined
      : commentsStoreRefused.unconfirmed);
  (unconfirmedCreateInDoc = (
    unconfirmedCreateInDoc2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    options !== undefined &&
    context !== undefined &&
    Object.values(unconfirmedCreateInDoc2.outbox).some(
      (outboxValue?: Dynamic, ..._extraArguments: unknown[]) => {
        let commentsStoreRefused: Dynamic =
          resolveCommentsStoreRefused(outboxValue);
        return (
          commentsStoreRefused?.kind === `create` &&
          commentsStoreRefused.pid === options &&
          commentsStoreRefused.docId === context
        );
      },
    ));
  (unconfirmedReplyIn = (
    unconfirmedReplyIn2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Object.values(unconfirmedReplyIn2.outbox).some(
      (outboxValue?: Dynamic, ..._extraArguments: unknown[]) => {
        let commentsStoreRefused: Dynamic =
          resolveCommentsStoreRefused(outboxValue);
        return (
          commentsStoreRefused?.kind === `reply` &&
          commentsStoreRefused.parent === options &&
          (context === undefined || commentsStoreRefused.pid === context)
        );
      },
    ));
  (commentsStoreMap9 = new (Map as Dynamic)());
  (commentsStoreMap10 = new (Map as Dynamic)());
  (resolveCommentsStoreSet = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    CommentsStoreState8.timers ?? {
      set: (
        commentsStoreSet19?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => setTimeout(commentsStoreSet19, options),
      clear: (commentsStoreSet19?: Dynamic, ..._extraArguments: unknown[]) =>
        clearTimeout(commentsStoreSet19),
    });
  (resolveCommentsStoreValue9 = (
    ..._extraArguments: unknown[]
  ): Dynamic => (CommentsStoreState8.now ?? Date.now)());
  (SENDING_FACE_MS = 45e3);
  (commentsStoreMap11 = new (Map as Dynamic)());
  (resolveCommentsStoreSet2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    CommentsStoreState8.faceTimers ?? {
      set: (
        commentsStoreSet22?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => setTimeout(commentsStoreSet22, options),
      clear: (commentsStoreSet22?: Dynamic, ..._extraArguments: unknown[]) =>
        clearTimeout(commentsStoreSet22),
    });
  (updateCommentsStoreTimer = (
    activity?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined =>
    void (activity.timer = commentsStoreValue_1
      ? resolveCommentsStoreSet2().set(
          activity.fire,
          Math.max(
            0,
            activity.at + SENDING_FACE_MS - resolveCommentsStoreValue9(),
          ),
        )
      : undefined));
  (CommentsStoreSuperseded = `superseded`);
  (CommentsStoreState5 = class extends Error {
    [key: string]: Dynamic;
  });
  (_outboxStoreAsk = {
    ms: 1500,
  });
  (resolveCommentsStoreKey = (
    commentsStoreKey?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (CommentsStoreState8.announce === undefined) {
      if (typeof document !== "undefined") {
        resolvePlatformAnnouncementsValue(document, commentsStoreKey, {
          key: `comment-post`,
        });
      }
    } else {
      CommentsStoreState8.announce(commentsStoreKey);
    }
  });
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step3(): void {
  (commentsStoreMap12 = new (Map as Dynamic)());
  (resolveCommentsStoreRefusedCopy = (
    commentsStoreRefusedCopy?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentsStoreRefusedCopy.refusedCopy !== undefined ||
    commentsStoreRefusedCopy.refused !== undefined);
  (commentsStoreSet8 = new (Set as Dynamic)());
  (commentsStoreMap13 = new (Map as Dynamic)());
  (resolveCommentsStoreAuthor = (
    commentsStoreAuthor?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      let frameFenceAuthor2: Dynamic =
        CommentsStoreState8.author === undefined
          ? frameFenceAuthor(`project/${commentsStoreAuthor}`)
          : CommentsStoreState8.author(commentsStoreAuthor);
      return typeof frameFenceAuthor2 == `string` && frameFenceAuthor2 !== ``
        ? frameFenceAuthor2
        : null;
    } catch {
      return null;
    }
  });
  (commentsStoreMap14 = new (Map as Dynamic)());
  (commentsStoreMap15 = new (Map as Dynamic)());
  (commentsStoreMap16 = new (Map as Dynamic)());
  (commentsStoreMap17 = new (Map as Dynamic)());
  (commentsStoreMap18 = new (Map as Dynamic)());
  (commentsStoreSet9 = new (Set as Dynamic)());
  (commentsStoreValue64 = 64);
  (commentsStoreValue32 = 32);
  (CommentsStoreMessage3 = `#discarded`);
  (DISCARD_WATCH_MS = 10 * 6e4);
  (WITHDRAW_PENDING_MS = 5 * 6e4);
  (WITHDRAW_RETRY_MS = 3e4);
  (commentsStoreSet10 = new (Set as Dynamic)([
    `forbidden`,
    `not_author`,
  ]));
  (resolveCommentsStoreSet3 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    CommentsStoreState8.withdrawTimers ?? {
      set: (
        commentsStoreSet32?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => setTimeout(commentsStoreSet32, options),
      clear: (commentsStoreSet32?: Dynamic, ..._extraArguments: unknown[]) =>
        clearTimeout(commentsStoreSet32),
    });
  (commentsStoreMap19 = new (Map as Dynamic)());
  (resolveCommentsStoreImul = (
    commentsStoreImul?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (typeof commentsStoreImul != `string`) return null;
    let dataModelSchemasTest6: Dynamic =
      resolveDataModelSchemasTest6(commentsStoreImul);
    let count = 2166136261;
    for (let index = 0; index < dataModelSchemasTest6.length; index++)
      count =
        Math.imul(count ^ dataModelSchemasTest6.charCodeAt(index), 16777619) >>>
        0;
    return `${dataModelSchemasTest6.length}.${count.toString(36)}`;
  });
  (resolveCommentsStoreOpId = (
    page?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    opId: page.opId,
    pid: page.pid,
    container: page.container,
    pageId: page.pageId,
    tmpId: page.opId,
    kind: `create`,
    value: context,
    body: ``,
    createdAt: new Date(options).toISOString(),
    attempts: 0,
  }));
  (commentsStoreSet11 = new (Set as Dynamic)());
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step4(): void {
  (commentsStoreMap20 = new (Map as Dynamic)());
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step5(): void {
  (outboxRowsAreDurable = (..._extraArguments: unknown[]) =>
    CommentsStoreState6 !== null &&
    commentsStoreMap20.get(CommentsStoreState6)?.backing === `idb`);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step6(): void {
  (CommentsStoreState8 = {});
  (ASKED_UNCONFIRMED_MS = 3e4);
  (ASKED_ACKED_UNCONFIRMED_MS = 9e4);
  (ASKED_ACKED_MAX_MS = 5 * 6e4);
  (ASKED_TTL_MS = 1440 * 60 * 1e3);
  (CommentsStoreMessage4 = `#asked`);
  (commentsStoreMap21 = new (Map as Dynamic)());
  (commentsStoreMap22 = new (Map as Dynamic)());
  (commentsStoreSet12 = new (Set as Dynamic)());
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step7(): void {
  (resolveCommentsStoreOpId2 = (
    pid?: Dynamic,
    opId?: Dynamic,
    context?: Dynamic,
    agentRows?: Dynamic,
    acked?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    opId: opId,
    pid: pid,
    container: ``,
    pageId: ``,
    tmpId: opId,
    kind: `create`,
    value: acked
      ? {
          agentRows: agentRows,
          acked: acked,
        }
      : {
          agentRows: agentRows,
        },
    body: ``,
    createdAt: new Date(context).toISOString(),
    attempts: 0,
  }));
  (CommentsStoreMessage5 = `#carriers`);
  (CARRIER_TTL_MS = ASKED_TTL_MS);
  (commentsStoreMap23 = new (Map as Dynamic)());
  (commentsStoreMap24 = new (Map as Dynamic)());
  (carrierBaselineOf = (
    carrierBaseline?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentsStoreMap24.get(carrierBaseline) ?? 0);
  (resolveCommentsStoreOpId3 = (
    pid?: Dynamic,
    opId?: Dynamic,
    context?: Dynamic,
    delivered?: Dynamic,
    agentRows?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    opId: opId,
    pid: pid,
    container: ``,
    pageId: ``,
    tmpId: opId,
    kind: `create`,
    value: {
      delivered: delivered,
      agentRows: agentRows,
    },
    body: ``,
    createdAt: new Date(context).toISOString(),
    attempts: 0,
  }));
  (CommentQueuedError = class extends Error {
    [key: string]: Dynamic;
    cause_: Dynamic;
    landed: Dynamic;
    constructor(
      commentQueuedError?: Dynamic,
      options: Dynamic = Promise.reject(
        Error(`comment queued: no landing to wait on`),
      ),
      ..._extraArguments: unknown[]
    ) {
      super(
        `comment queued: the room did not answer; the outbox will re-send it`,
      );
      this.cause_ = commentQueuedError;
      this.landed = options;
      this.name = `CommentQueuedError`;
      options.catch((..._extraArguments: unknown[]): undefined => {});
    }
  });
  (resolveCommentsStoreUser = (
    post?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: post.tmpId,
    user: resolveCommentsStoreValue15(),
    actor: `human`,
    at: post.createdAt,
    body: resolveDataModelSchemasTest6(post.body),
    ...(post.to && {
      to: post.to,
    }),
  }));
  (resolveCommentsStoreTarget = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: event.tmpId,
    target: event.target ?? {
      pageId: event.pageId,
      anchor: {
        kind: `text`,
        line: 0,
      },
    },
    resolved: event.quiet === true,
    root: resolveCommentsStoreUser(event),
    replies: [],
  }));
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step8(): void {
  (resolveCommentsStoreUsers = (
    commentsStoreUsers?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    CommentsStoreState4 !== null && !commentsStoreUsers.startsWith(`users/`)
      ? resolveCommentsStoreSignal(CommentsStoreState4, options)
      : null);
  (resolveCommentsStoreSignal = (
    commentsStoreSignal?: Dynamic,
    options?: Dynamic,
    signal?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let liveDoor2: Dynamic = liveDoor(
      commentsStoreSignal,
      signal === undefined
        ? {}
        : {
            signal: signal,
          },
    );
    return collectPlatformApiAndAuthVerb(
      options === undefined
        ? liveDoor2
        : resolveCommentsStoreCall(liveDoor2, options),
      {
        kind: `project`,
        id: commentsStoreSignal,
      },
    );
  });
  (resolveCommentsStoreValue16 = (..._extraArguments: unknown[]) =>
    `cmt-${resolvePlatformAnnouncementsRandomUUID()}`);
  (resolveCommentsStoreMinted = (
    commentsStoreMinted?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (commentsStoreMinted.minted === undefined)
      throw Error(`door create: allow without minted id`);
    return commentsStoreMinted.minted;
  });
  (commentWords = (
    commentWords2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataModelSchemasTest6(
      commentWords2.replace(
        /[\v\f]/g,
        `
`,
      ),
    ));
  (nothingToSee = (
    nothing?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !commentsStorePattern4.test(nothing) &&
    nothing.replace(platformSessionAndSourcesPattern2, ``).trim() === ``);
  (commentsStorePattern4 = /[\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u{110BD}\u{110CD}]/u);
  (COMMENT_BODY_MAX_BYTES = 4096);
  (commentTooLong = (
    comment?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let dataModelSchemasBytes2: Dynamic = resolveDataModelSchemasBytes2(comment);
    return (
      dataModelSchemasBytes2 > 4096 &&
      (options === undefined ||
        dataModelSchemasBytes2 > resolveDataModelSchemasBytes2(options))
    );
  });
  (resolveCommentsStoreEmptyComment = (
    ..._extraArguments: unknown[]
  ) => Error(`empty comment`));
  (CommentsStoreVerdict = {
    verdict: `deny`,
    reason: `bad_request`,
  });
  (commentsStoreValue80 = 80);
  (rootCommentViaDoor = (
    target?: Dynamic,
    options?: Dynamic,
    context: Dynamic = null,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !(
        !(
          target.anchor?.kind === `text` &&
          target.anchor.line === 0 &&
          target.anchor.sel === undefined &&
          target.quote === undefined &&
          target.tabId === undefined &&
          target.atomAnchor !== true &&
          target.markRefused !== true &&
          target.unanchored !== true &&
          target.vs === undefined
        ) || target.pageId === ``
      )
    )
      return async (
        container?: Dynamic,
        body?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> =>
        CommentsStoreState4 === null || container.startsWith(`users/`)
          ? api.comments.create({
              container: container,
              body: body,
              target: target,
            })
          : loadCommentsStoreVerb(
              CommentsStoreState4,
              resolveCommentsStoreValue17(target, body, options, context),
              resolveCommentsStoreValue16(),
            );
  });
  (resolveCommentsStoreValue17 = (
    commentsStoreValue17?: Dynamic,
    body?: Dynamic,
    context?: Dynamic,
    dependencies: Dynamic = null,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    value: filterDataModelSchemasFilter4(
      {
        body: body,
        parent: {
          object: `file`,
          id: commentsStoreValue17.pageId,
          ...resolveCommentsStoreLabel2(context),
        },
      },
      dependencies,
    ),
    cells: false,
  }));
  (resolveCommentsStoreParent = (
      commentsStoreParent?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument?: Dynamic,
      argument2: Dynamic = null,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (commentsStoreParent2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let roomCommentValue2: Dynamic = roomCommentValue(
        commentsStoreParent,
        commentsStoreParent2,
        options,
        context,
        dependencies,
      );
      let filterDataModelSchemasFilter42: Dynamic = filterDataModelSchemasFilter4(
        {
          ...roomCommentValue2,
          parent: {
            ...roomCommentValue2.parent,
            ...resolveCommentsStoreLabel2(argument),
          },
        },
        argument2,
      );
      return {
        value: filterDataModelSchemasFilter42,
        cells:
          filterDataModelSchemasFilter42.parent !== undefined &&
          `anchor` in filterDataModelSchemasFilter42.parent &&
          filterDataModelSchemasFilter42.parent.anchor.kind === `cells`,
      };
    });
  (resolveCommentsStoreValue18 = (
      commentsStoreValue18?: Dynamic,
      anchor?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument: Dynamic = null,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (body?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      value: filterDataModelSchemasFilter4(
        {
          body: body,
          parent: {
            object: `node`,
            id: commentsStoreValue18,
            ...resolveCommentsStoreLabel2(dependencies),
            ...(anchor !== undefined && anchor !== ``
              ? context === undefined
                ? {
                    anchor: {
                      kind: `anchor`,
                      anchor: anchor,
                    },
                  }
                : {
                    anchor: {
                      kind: `component`,
                      component: anchor,
                      ...context,
                    },
                  }
              : {}),
          },
        },
        argument,
      ),
      cells: false,
    }));
  (quietCarrierThreads = new (Set as Dynamic)());
  (quietCarrierWritten = new (Set as Dynamic)());
  (isCommentsStoreResolved = (
    commentsStoreResolved?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !commentsStoreResolved.resolved &&
    !quietCarrierThreads.has(commentsStoreResolved.id));
  (parkedSummons = isDataModelSchemasArm());
  (commentsStoreSet13 = new (Set as Dynamic)());
  (NO_PEERS = []);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore4Step9(): void {
  useCommentStore.subscribe(
    (
      callback?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (callback.focusId !== options.focusId) {
        _focusMoveWatcher(options.focusId, callback.focusId);
      }
    },
  );
  (commentsStoreWeakMap = new (WeakMap as Dynamic)());
  (useThreads = (
    threads?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useCommentStore(
      (threads2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let byPageItem: Dynamic = threads
          ? (threads2.byPage[threads] ?? commentsStoreValues2)
          : commentsStoreValues2;
        if (options === undefined) return byPageItem;
        let commentsStoreWeakMapEntry: Dynamic =
          commentsStoreWeakMap.get(byPageItem);
        if (!commentsStoreWeakMapEntry) {
          commentsStoreWeakMap.set(
            byPageItem,
            (commentsStoreWeakMapEntry = new (Map as Dynamic)()),
          );
        }
        let options2: Dynamic = options ?? ``;
        let commentsStoreWeakMapEntryEntry: Dynamic =
          commentsStoreWeakMapEntry.get(options2);
        if (!commentsStoreWeakMapEntryEntry) {
          commentsStoreWeakMapEntry.set(
            options2,
            (commentsStoreWeakMapEntryEntry = byPageItem.filter(
              (event?: Dynamic, ..._extraArguments: unknown[]) =>
                (event.target.tabId ?? null) === options,
            )),
          );
        }
        return commentsStoreWeakMapEntryEntry;
      },
    ));
  (commentsStoreWeakMap2 = new (WeakMap as Dynamic)());
  (joinPageThreads = (
    joinPageThreads2?: Dynamic,
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (items.length === 0) return commentsStoreValues2;
    let commentsStoreWeakMap2Entry: Dynamic =
      commentsStoreWeakMap2.get(joinPageThreads2);
    if (!commentsStoreWeakMap2Entry) {
      commentsStoreWeakMap2.set(
        joinPageThreads2,
        (commentsStoreWeakMap2Entry = new (Map as Dynamic)()),
      );
    }
    let itemsText: Dynamic = items.join(` `);
    let commentsStoreWeakMap2EntryEntry: Dynamic =
      commentsStoreWeakMap2Entry.get(itemsText);
    if (!commentsStoreWeakMap2EntryEntry) {
      let flatMap: Dynamic = items.flatMap(
        (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (joinPageThreads2[rolldownRImport2] ?? commentsStoreValues2).filter(
            (rolldownNImportItem?: Dynamic, ..._extraArguments: unknown[]) =>
              !isBuildConversation(rolldownNImportItem),
          ),
      );
      commentsStoreWeakMap2EntryEntry = flatMap.length
        ? flatMap
        : commentsStoreValues2;
      commentsStoreWeakMap2Entry.set(itemsText, commentsStoreWeakMap2EntryEntry);
    }
    return commentsStoreWeakMap2EntryEntry;
  });
  (useThreadsJoined = (
    threadsJoined?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useCommentStore(
      (threadsJoined2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        joinPageThreads(threadsJoined2.byPage, threadsJoined),
    ));
  (openThreadCountOf = (
    openThreadCount?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (options
      ? (openThreadCount[options] ?? commentsStoreValues2)
      : commentsStoreValues2
    ).length +
    (context ? joinPageThreads(openThreadCount, context) : commentsStoreValues2)
      .length);
  (useOpenThreadCount = (
    openThreadCount?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useCommentStore(
      (openThreadCount2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        openThreadCountOf(openThreadCount2.byPage, openThreadCount, options),
    ));
  (useAllThreadsJoined = (
    allThreadsJoined?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useCommentStore(
      (allThreadsJoined2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        joinPageThreads(allThreadsJoined2.allByPage, allThreadsJoined),
    ));
  (commentsStoreValue16 = 16);
  (commentsStoreSet14 = new (Set as Dynamic)([`https://claude.ai`]));
  (resolveCommentsStoreTest = (
    commentsStoreTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof commentsStoreTest == `string` &&
    /^https?:\/\/[^/?#\s]+$/i.test(commentsStoreTest));
  (CommentsStoreAuthDone = `/auth/done`);
  (commentsStoreValue3000 = 3e3);
  (CommentsStoreState10 = 600 * 1e3);
  (CommentsStoreState11 = commentsStoreValue3000);
  (CommentsStoreState12 = CommentsStoreState10);
  (CommentsStoreState13 = [1e3, 2e3, 4e3, 8e3]);
  (resolveCommentsStoreValue19 = (
    commentsStoreValue19?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    new (Promise as Dynamic)((resolve?: Dynamic, ..._extraArguments: unknown[]) =>
      setTimeout(resolve, commentsStoreValue19),
    ));
  (commentsStoreValue_13 = false);
  (commentsStoreValue30000 = 3e4);
  (commentsStoreValue_14 = false);
  (CommentsStoreClaude = create(
    (
      commentsStoreClaude?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      claude: null,
      status: `idle`,
      error: null,
      retrying: false,
      pendingSignIn: null,
      load: async (..._extraArguments: unknown[]): Promise<undefined> => {
        if (!(commentsStoreValue_13 || options().status === `loading`)) {
          if (inFrame()) {
            commentsStoreClaude({
              claude: {
                connected: true,
              },
              status: `loaded`,
              error: null,
              retrying: false,
            });
            return;
          }
          if (options().status === `idle` && typeof window !== "undefined") {
            let window2: Dynamic = window;
            if (window2.__BONGO_AUTH) {
              let claude: Dynamic = window2.__BONGO_AUTH;
              delete window2.__BONGO_AUTH;
              commentsStoreClaude({
                claude: claude,
                status: `loaded`,
                error: null,
                retrying: false,
              });
              updateCommentsStorePendingSignIn2(claude);
              api.claudeAuth
                .status()
                .then(
                  (
                    claude2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    commentsStoreClaude({
                      claude: claude2,
                    });
                    updateCommentsStorePendingSignIn2(claude2);
                  },
                )
                .catch((..._extraArguments: unknown[]): undefined => {});
              return;
            }
          }
          commentsStoreValue_13 = true;
          try {
            let status: Dynamic = options().status;
            if (status !== `loaded` && status !== `error`) {
              commentsStoreClaude({
                status: `loading`,
                error: null,
              });
            }
            let CommentsStoreState13Count: Dynamic =
              status === `idle` ? CommentsStoreState13.length : 0;
            for (let index: Dynamic = 0; ; index++)
              try {
                let claude: Dynamic = await api.claudeAuth.status();
                resolveCommentsStoreValue20();
                commentsStoreClaude({
                  claude: claude,
                  status: `loaded`,
                  error: null,
                  retrying: false,
                });
                updateCommentsStorePendingSignIn2(claude);
                return;
              } catch (commentsStoreClaudeResult: Dynamic) {
                if (options().claude?.connected) {
                  commentsStoreClaude({
                    error: resolvePlatformSessionAndSourcesMessage(
                      commentsStoreClaudeResult,
                    ),
                  });
                  return;
                }
                let matchesIndex: Dynamic = index >= CommentsStoreState13Count;
                commentsStoreClaude({
                  status: `error`,
                  error: resolvePlatformSessionAndSourcesMessage(
                    commentsStoreClaudeResult,
                  ),
                  retrying: !matchesIndex,
                });
                if (matchesIndex) {
                  installCommentsStoreError(options().load);
                  return;
                }
                await resolveCommentsStoreValue19(CommentsStoreState13[index]);
              }
          } finally {
            commentsStoreValue_13 = false;
          }
        }
      },
      startConnect: async (
        commentsStoreClaude2: Dynamic = `/`,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        if (isCommentsStoreChrome()) {
          let enabled = !!options().claude?.connected;
          let { authorizeUrl: authorizeUrl, currentMintedAt: start2 }: Dynamic =
            await api.claudeAuth.start(CommentsStoreAuthDone);
          window.open(authorizeUrl, `_blank`, `noopener`);
          commentsStoreClaude({
            pendingSignIn: {
              authorizeUrl: authorizeUrl,
            },
          });
          updateCommentsStorePendingSignIn(options().load, start2);
          if (enabled && commentsStoreState4) {
            commentsStoreState4.toastId = toast(
              `Finish signing in in the new tab`,
              {
                description: `This panel updates automatically once you’re done.`,
                duration: 1 / 0,
                action: {
                  label: `Open sign-in page`,
                  onClick: (..._extraArguments: unknown[]) =>
                    window.open(authorizeUrl, `_blank`, `noopener`),
                },
              },
            );
          }
          return;
        }
        options2?.forcePkce;
        let { authorizeUrl: start }: Dynamic =
          await api.claudeAuth.start(commentsStoreClaude2);
        window.location.href = start;
      },
      disconnect: async (..._extraArguments: unknown[]): Promise<undefined> => {
        commentsStoreClaude({
          claude: {
            connected: false,
          },
        });
        await api.claudeAuth.disconnect();
        await options().load();
      },
    }),
  ));
  (CommentsStoreBigQuery = Object.fromEntries(
    Object.entries({
      BigQuery: `bigquery`,
      "Google Drive": `google-drive`,
      "Google Workspace": `google-workspace`,
      Snowflake: `snowflake`,
      Salesforce: `salesforce`,
      Gmail: `gmail`,
      Slack: `slack`,
      Linear: `linear`,
      GitHub: `github`,
    }).map(
      (
        [recordEntry, recordEntry2]: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => [recordEntry2, recordEntry],
    ),
  ));
  (commentsStoreMap25 = new (Map as Dynamic)());
  (commentsStoreSet15 = new (Set as Dynamic)());
  (commentsStoreValue30002 = 3e3);
  (resolveCommentsStoreConnectorProbeTimeout = (
    commentsStoreConnectorProbeTimeout?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Promise.race([
      commentsStoreConnectorProbeTimeout,
      new (Promise as Dynamic)(
        (resolve?: unknown, reject?: Dynamic, ..._extraArguments: unknown[]) =>
          setTimeout(
            (..._extraArguments: unknown[]): Dynamic =>
              reject(Error(`connector probe timeout`)),
            commentsStoreValue30002,
          ),
      ),
    ]));
  (resolveCommentsStoreEnabled = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveCommentsStoreConnectorProbeTimeout(api.claudeAuth.enabled()));
  (resolveCommentsStoreSetEnabled = (
    commentsStoreSetEnabled?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options === undefined
      ? api.claudeAuth.setEnabled(commentsStoreSetEnabled)
      : api.claudeAuth.setEnabled(commentsStoreSetEnabled, options));
  (resolveCommentsStoreReauthDismiss = (
    commentsStoreReauthDismiss?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => api.connectors.reauthDismiss(commentsStoreReauthDismiss));
  (loadCommentsStoreCatch = async (
    commentsStoreCatch?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    let result: Dynamic = await resolveCommentsStoreEnabled().catch(
      (..._extraArguments: unknown[]): Dynamic => [],
    );
    if (
      !result.some(
        (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
          rolldownRImport2.id === commentsStoreCatch,
      )
    ) {
      await resolveCommentsStoreSetEnabled([
        ...result.map(
          (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            result2.id,
        ),
        commentsStoreCatch,
      ]).catch((..._extraArguments: unknown[]): undefined => {});
    }
  });
  (updateCommentsStoreFresh = (
    slug?: Dynamic,
    fresh?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let enabled: Dynamic = !fresh && commentsStoreMap25.get(slug);
    if (enabled) return enabled;
    let result: Dynamic = resolveCommentsStoreConnectorProbeTimeout(
      api.connectors.status(slug, {
        fresh: fresh,
      }),
    )
      .then(
        (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          slug: slug,
          ...result2,
        }),
      )
      .catch(
        (..._extraArguments: unknown[]): Dynamic => ({
          slug: slug,
          registered: false,
          connected: false,
        }),
      )
      .finally(
        (..._extraArguments: unknown[]): Dynamic =>
          commentsStoreMap25.delete(slug),
      );
    commentsStoreMap25.set(slug, result);
    return result;
  });
  (CommentsStoreHealth = create(
    (
      commentsStoreHealth?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      health: {},
      status: `idle`,
      authPrompt: null,
      promptReconnect: (
        authPrompt?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let slug: Dynamic = authPrompt.slug ?? authPrompt.name;
        if (authPrompt.slug) {
          let healthItem: Dynamic = options().health[authPrompt.slug];
          commentsStoreHealth({
            health: {
              ...options().health,
              [authPrompt.slug]: {
                ...(healthItem ?? {
                  slug: authPrompt.slug,
                  registered: true,
                }),
                connected: false,
                code: authPrompt.code,
              },
            },
          });
        }
        if (commentsStoreSet15.has(slug)) {
          resolveCommentsStoreReauthDismiss(authPrompt.slug ?? `_`).catch(
            (..._extraArguments: unknown[]): undefined => {},
          );
          return;
        }
        let authPrompt2: Dynamic = options().authPrompt;
        if (!(authPrompt2 && (authPrompt2.slug ?? authPrompt2.name) === slug)) {
          commentsStoreHealth({
            authPrompt: authPrompt,
          });
        }
      },
      dismissPrompt: (..._extraArguments: unknown[]): undefined => {
        let authPrompt: Dynamic = options().authPrompt;
        if (authPrompt) {
          commentsStoreSet15.add(authPrompt.slug ?? authPrompt.name);
        }
        commentsStoreHealth({
          authPrompt: null,
        });
      },
      clearPrompt: (..._extraArguments: unknown[]): Dynamic =>
        commentsStoreHealth({
          authPrompt: null,
        }),
      clearPromptFor: (
        commentsStoreHealth2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let authPrompt: Dynamic = options().authPrompt;
        if (
          !(
            !authPrompt ||
            (authPrompt.slug ?? authPrompt.name) !== commentsStoreHealth2
          )
        ) {
          commentsStoreSet15.delete(commentsStoreHealth2);
          commentsStoreHealth({
            authPrompt: null,
          });
        }
      },
      load: async (
        commentsStoreHealth2?: Dynamic,
        options2: Dynamic = {},
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        let items: Dynamic = [...new (Set as Dynamic)(commentsStoreHealth2)];
        if (items.length === 0) return;
        if (options().status === `idle`) {
          commentsStoreHealth({
            status: `loading`,
          });
        }
        let health: Dynamic = options().health;
        let all: Dynamic = await Promise.all(
          items.map(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              updateCommentsStoreFresh(item, !!options2.fresh),
          ),
        );
        let health2: Dynamic = {
          ...health,
        };
        for (let commentsStoreHealthResult of all as Dynamic) {
          health2[commentsStoreHealthResult.slug] = commentsStoreHealthResult;
          if (
            commentsStoreHealthResult.connected &&
            commentsStoreHealthResult.server_id &&
            !health[commentsStoreHealthResult.slug]?.connected
          ) {
            loadCommentsStoreCatch(commentsStoreHealthResult.server_id);
          }
        }
        commentsStoreHealth({
          health: health2,
          status: `loaded`,
        });
      },
      reconnect: async (
        commentsStoreHealth2?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        commentsStoreSet15.delete(commentsStoreHealth2);
        let { url: connectUrl }: Dynamic =
          await api.connectors.connectUrl(commentsStoreHealth2);
        let open = window.open(
          connectUrl,
          `${commentsStoreHealth2}-connect`,
          `width=1100,height=800`,
        );
        if (open) {
          await new (Promise as Dynamic)(
            (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              let setInterval2 = setInterval(
                (..._extraArguments: unknown[]): undefined => {
                  if (open.closed) {
                    clearInterval(setInterval2);
                    resolve();
                  }
                },
                300,
              );
            },
          );
        }
        await Promise.all([
          options().load([commentsStoreHealth2], {
            fresh: true,
          }),
          CommentsStoreClaude.getState().load(),
        ]);
        return !!open;
      },
    }),
  ));
  (CommentsStoreAllowScripts = `allow-scripts`);
  ((callback?: Dynamic, ..._extraArguments: unknown[]) =>
    `default-src 'none'; script-src 'unsafe-inline' blob: ${DataModelSchemasUrl.url}; style-src 'unsafe-inline'; img-src data: blob:${callback ? ` ${callback}/api/blob/` : ``}; font-src data: blob:; media-src data: blob:; connect-src data: blob:`)();
  (commentsStoreValue07 = 0);
  `${resolveDataModelSchemasNormal2}${JSON.stringify(DataModelSchemasStyles3)}${(
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items2: Dynamic = [];
    let items3: Dynamic = [];
    let label: Dynamic = ``;
    let enabled = false;
    let index = 0;
    for (; index < items.length; ) {
      let itemItem: Dynamic = items[index++];
      if (enabled) {
        if (itemItem === `"`) {
          if (items[index] === `"`) {
            label += `"`;
            index++;
          } else {
            enabled = false;
          }
        } else {
          label += itemItem;
        }
      } else {
        if (itemItem === `"`) {
          enabled = true;
        } else {
          if (itemItem === `,`) {
            items3.push(label);
            label = ``;
          } else {
            if (
              itemItem ===
              `
`
            ) {
              items3.push(label);
              items2.push(items3);
              items3 = [];
              label = ``;
            } else {
              if (itemItem !== `\r`) {
                label += itemItem;
              }
            }
          }
        }
      }
    }
    if (label !== `` || items3.length) {
      items3.push(label);
      items2.push(items3);
    }
    return items2;
  }}`;
  (commentsStoreValue20000 = 2e4);
  (commentsStoreValue1500 = 1500);
  (CommentsStoreRuntimeOnTheWire = {
    runtimeOnTheWire: resolveObservabilityTelemetryValue4,
    runtimeSettled: (..._extraArguments: unknown[]): Dynamic =>
      resolveObservabilityTelemetryCache().then(
        (..._extraArguments: unknown[]): undefined => undefined,
        (..._extraArguments: unknown[]): undefined => undefined,
      ),
  });
  (resolveCommentsStorePaint2 = (..._extraArguments: unknown[]) => {
    let at2: Dynamic = helloBImport().at;
    return at2.paint !== undefined || at2.pixels !== undefined;
  });
  (commentsStoreSet16 = new (Set as Dynamic)([
    `01582c35-9930-414e-93b9-0dd852675b4d`,
    `8eb1775b-c92a-4963-a6a4-1b4ce54cbfdc`,
    `6a683412-c4fc-445b-a46e-fa66b26af171`,
    `7ab4a777-b81b-4974-b5b5-adf4d1545a88`,
  ]));
  (commentsStoreValue_15 = false);
  (commentsStoreValue_16 = false);
  (commentsStoreSet17 = new (Set as Dynamic)());
  (clearCommentsStoreDelete = (
    clearCommentsStoreDelete2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    commentsStoreSet17.add(clearCommentsStoreDelete2),
    (..._extraArguments: unknown[]): undefined => {
      commentsStoreSet17.delete(clearCommentsStoreDelete2);
    }
  ));
  (CommentsStoreFrom = Array.from<Dynamic>({
    length: 200,
  }));
  (commentsStoreValue08 = 0);
}

export {
  ANCHOR_GONE_CARD_WORDS,
  ANCHOR_GONE_WORDS,
  ASKED_ACKED_MAX_MS,
  ASKED_ACKED_UNCONFIRMED_MS,
  ASKED_TTL_MS,
  ASKED_UNCONFIRMED_MS,
  CARRIER_TTL_MS,
  CELLS_UNSUPPORTED_WORDS,
  COMMENT_BODY_MAX_BYTES,
  COMPOSE_BOX_ID,
  CommentQueuedError,
  CommentsStoreAllowScripts,
  CommentsStoreAuthDone,
  CommentsStoreBigQuery,
  CommentsStoreClaude,
  CommentsStoreCommentsUnreachable,
  CommentsStoreFrom,
  CommentsStoreHealth,
  CommentsStoreMessage3,
  CommentsStoreReason,
  CommentsStoreState4,
  CommentsStoreState5,
  CommentsStoreState8,
  CommentsStoreSuperseded,
  CommentsStoreYourCommentWillPostWhenTheConnectionIsBack,
  DISCARD_WATCH_MS,
  DRAFT_BOX_ID,
  EDIT_BOX_PREFIX,
  NOT_AUTHOR_WORDS,
  NOT_THREAD_STARTER_WORDS,
  NO_PEERS,
  REACTION_NOT_REMOVED_WORDS,
  SENDING_FACE_MS,
  UNCONFIRMED_EVERY_MS,
  UNCONFIRMED_RUNGS_MS,
  UNCONFIRMED_WORDS_AFTER_MS,
  WITHDRAW_PENDING_MS,
  WITHDRAW_RETRY_MS,
  _outboxStoreAsk,
  _unreachableRetry,
  admitReanchor,
  cardDraftAtRisk,
  carrierBaselineOf,
  carrierBooked,
  carrierDelivered,
  carrierSettled,
  carriersLeft,
  clearCommentsStoreSome,
  clearCommentsStoreState,
  clickAwayDraftVerdict,
  commentDenyCopy,
  commentTooLong,
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
  commentsStoreSet5,
  commentsStoreSet6,
  commentsStoreSet7,
  commentsStoreSet8,
  commentsStoreSet9,
  commentsStoreValue02,
  commentsStoreValue08,
  commentsStoreValue64,
  commentsStoreValue80,
  commentsStoreValues2,
  composingOverSelection,
  editInProgress,
  editRefusalLeavesBoxOpen,
  focusMoveLosesEdit,
  getCommentsStoreByPage,
  getCommentsStoreValue,
  getCommentsStoreValue2,
  heldThreads,
  hiddenResolvedThread,
  installCommentsStoreMiss,
  isCommentRefusal,
  isCommentsStoreIsActive,
  isCommentsStoreKeys,
  isCommentsStoreKeys2,
  isCommentsStoreReplies,
  isCommentsStoreReplies2,
  isCommentsStoreResolved,
  isSelbarDraft,
  isTmpId,
  joinPageThreads,
  landedSummon,
  loadCommentsStoreLoading,
  loadCommentsStoreVerb,
  mintedThreadId,
  nothingToSee,
  openThreadCountOf,
  otherEditorDirty,
  outboxRowsAreDurable,
  parkedSummons,
  quietCarrierThreads,
  quietCarrierWritten,
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
  resolveCommentsStorePaint,
  resolveCommentsStoreParent,
  resolveCommentsStorePreludeReady,
  resolveCommentsStoreReauthDismiss,
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
  resolveCommentsStoreValue23,
  resolveCommentsStoreValue24,
  resolveCommentsStoreValue28,
  resolveCommentsStoreValue6,
  resolveCommentsStoreValue7,
  resolveCommentsStoreValue8,
  resolveCommentsStoreValue9,
  resolveCommentsStoreValues,
  resolveCommentsStoreVerdict,
  roomCommentValue,
  rootCommentViaDoor,
  setCommentRoomDoor,
  settleClickAway,
  shedControlChars,
  summonAgentRowAt,
  summonAskAcked,
  summonAskSettled,
  summonAsked,
  summonAskedThisLife,
  summonAsksLeft,
  threadClosed,
  threadResolved,
  unconfirmedCreateInDoc,
  unconfirmedReplyIn,
  updateCommentsStoreBacking,
  updateCommentsStoreBodyKey,
  updateCommentsStoreByPage,
  updateCommentsStoreOpId,
  updateCommentsStoreTimer,
  useAllThreadsJoined,
  useCommentsStoreOwnerOrg,
  useCommentsStoreUseSyncExternalStore,
  useOpenThreadCount,
  useThreads,
  useThreadsJoined,
};

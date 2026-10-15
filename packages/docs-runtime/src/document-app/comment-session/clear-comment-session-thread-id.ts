/** BaoCut: comment session from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  ASKED_ACKED_MAX_MS,
  ASKED_ACKED_UNCONFIRMED_MS,
  ASKED_UNCONFIRMED_MS,
  DataModelSchemasPending,
  carrierSettled,
  carriersLeft,
  createPagesAskLineEvent,
  createPagesAskMarkedEvent,
  createPagesAskRoadEvent,
  createPagesFlagPetrelEvent,
  createPagesSummonAnnouncedEvent,
  createPagesSummonHandoffEvent,
  createPagesSummonHeardEvent,
  createPagesSummonRoundEvent,
  createPagesSummonSentEvent,
  createPagesSummonShellBuildEvent,
  createPagesSummonSilentEvent,
  createPagesSummonStateEvent,
  createPagesSummonUnavailableEvent,
  createPagesSummonViewDarkEvent,
  emitTelemetryEvent,
  filterDataModelSchemasFilter3,
  frameConversationPane,
  frameHostChromeWitnessed,
  frameHotFrom,
  heldThreads,
  hostSays,
  isEditorExtensionsLocation,
  isEditorExtensionsValue,
  isFrameArtifact,
  quietCarrierThreads,
  resolveCommentsEditorAdmit,
  resolveCommentsEditorFailed,
  resolveCommentsEditorValue,
  resolveCommentsStoreLayer,
  resolveDataModelSchemasSent,
  resolveObservabilityBootChat,
  resolveObservabilityBrowserAndOperationEventsField,
  resolveObservabilityBrowserAndOperationEventsKey4,
  resolveObservabilityBrowserAndOperationEventsKey5,
  resolveObservabilityBrowserAndOperationEventsValue15,
  resolveObservabilityBrowserAndOperationEventsValue3,
  resolvePlatformAnnouncementsValue,
  resolvePlatformSessionAndSourcesSent,
  resolvePlatformSessionAndSourcesValue6,
  summonAgentRowAt,
  summonAskSettled,
  summonAskedThisLife,
  summonAsksLeft,
  updateCommentsEditorLanded,
  useCommentStore,
} from "../dependencies";
import {
  getAgentWriteCursor,
  hasAgentWrittenSince,
} from "../comment-notifications/create-comment-notice-coordinator";
import {
  CommentSessionState,
} from "./use-comment-session-bridge";
import {
  CommentSessionState15,
  commentSessionLimit2564,
  commentSessionMap11,
  commentSessionSet6,
} from "./ask-suggestions-measure";

function resolveCommentSessionValue(
  commentSessionValue?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  CommentSessionState?.openClaude?.(commentSessionValue);
}

function resolveCommentSessionSource(
  reason?: Dynamic,
  source?: Dynamic,
  ask: Dynamic = {},
  ..._extraArguments: unknown[]
): undefined {
  if (reason === `ended`) {
    reason = `no_reply`;
  }
  let road: Dynamic;
  let ms2: Dynamic = ask.ms;
  if (ask.threadId !== undefined) {
    for (let resolveCommentSessionSourceResult of heldThreads(
      useCommentStore.getState(),
    ) as Dynamic)
      if (resolveCommentSessionSourceResult.id === ask.threadId) {
        road =
          resolveCommentSessionSourceResult.replies.length > 0
            ? `thread_reply`
            : `comment`;
        break;
      }
    if (reason === `no_listener`) {
      CommentSessionState15.forget(ask.threadId);
    } else {
      resolveCommentSessionFailed(ask.threadId, reason);
    }
    road ??= `comment`;
    let at2: Dynamic =
      DataModelSchemasPending.getState().pending[ask.threadId]?.at;
    if (ms2 === undefined && typeof at2 == `number`) {
      let difference = Date.now() - at2;
      if (difference >= 0 && difference <= 3e5) {
        ms2 = difference;
      }
    }
  }
  if (reason === `no_reply` && !CommentSessionState2.admit(Date.now()).say)
    return void resolveCommentsStoreLayer(`host`, `summon_no_reply_held`, {
      source: source,
      road: road,
      held: CommentSessionState2.held,
    });
  emitTelemetryEvent(
    createPagesSummonUnavailableEvent({
      reason: reason,
      source: source,
      road: road,
      host: resolveCommentSessionFrame(),
      ms: ms2,
      plat: resolveObservabilityBrowserAndOperationEventsValue3(),
      ...(ask.heldMs !== undefined && {
        durMs: ask.heldMs,
      }),
      ...(ask.hold !== undefined && {
        hold: ask.hold,
      }),
    }),
  );
}

var CommentSessionState2: Dynamic;

function resolveCommentSessionFailed(
  commentSessionFailed?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let count: number = 0;
  for (let resolveCommentSessionFailedResult of heldThreads(
    useCommentStore.getState(),
  ) as Dynamic)
    if (resolveCommentSessionFailedResult.id === commentSessionFailed) {
      count = filterDataModelSchemasFilter3(resolveCommentSessionFailedResult);
      break;
    }
  CommentSessionState15.failed(
    commentSessionFailed,
    options,
    count,
    Date.now(),
  );
}

var resolveCommentSessionFrame: Dynamic;

function resolveCommentSessionReason(
  reason?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  emitTelemetryEvent(
    createPagesSummonViewDarkEvent({
      reason: reason,
      host: resolveCommentSessionFrame(),
    }),
  );
}

function clearCommentSessionRoad(
  clearCommentSessionRoad2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let road = `comment`;
  for (let clearCommentSessionRoadResult of heldThreads(
    useCommentStore.getState(),
  ) as Dynamic)
    if (clearCommentSessionRoadResult.id === clearCommentSessionRoad2) {
      if (clearCommentSessionRoadResult.replies.length > 0) {
        road = `thread_reply`;
      }
      break;
    }
  emitTelemetryEvent(
    createPagesSummonSentEvent({
      road: road,
      host: resolveCommentSessionFrame(),
      plat: resolveObservabilityBrowserAndOperationEventsValue3(),
      ...(quietCarrierThreads.has(clearCommentSessionRoad2) && {
        origin: `card`,
      }),
    }),
  );
  let commentSessionMapEntry: Dynamic = commentSessionMap.get(
    clearCommentSessionRoad2,
  );
  commentSessionMap.delete(clearCommentSessionRoad2);
  if (commentSessionMapEntry !== undefined)
    try {
      let clearCommentSessionRoadResult: Dynamic =
        createPagesSummonHandoffEvent({
          road: road,
          host: resolveCommentSessionFrame(),
          plat: resolveObservabilityBrowserAndOperationEventsValue3(),
          ms: commentSessionMapEntry,
          ...(quietCarrierThreads.has(clearCommentSessionRoad2) && {
            origin: `card`,
          }),
        });
      if (clearCommentSessionRoadResult !== null) {
        emitTelemetryEvent(clearCommentSessionRoadResult);
      }
    } catch {}
  if (options) {
    updateCommentSessionRoad2(
      clearCommentSessionRoad2,
      road,
      quietCarrierThreads.has(clearCommentSessionRoad2),
    );
  }
  if (!quietCarrierThreads.has(clearCommentSessionRoad2)) {
    updateCommentSessionRoad(clearCommentSessionRoad2, road);
  }
}

var CommentSessionState3: Dynamic;

function resolveCommentSessionLanded(
  ask?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  CommentSessionState3.landed(ask.threadId, ask.pressedAt);
}

var commentSessionMap: Dynamic;

var commentSessionLimit64: number;

function updateCommentSessionTake(
  updateCommentSessionTake2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let take: Dynamic = CommentSessionState3.take(
    updateCommentSessionTake2,
    options,
  );
  commentSessionMap.delete(updateCommentSessionTake2);
  if (take !== undefined) {
    commentSessionMap.set(updateCommentSessionTake2, take);
    if (commentSessionMap.size > commentSessionLimit64) {
      commentSessionMap.delete(commentSessionMap.keys().next().value);
    }
  }
}

var commentSessionMap2: Dynamic;

var commentSessionLimit256: number;

function updateCommentSessionRoad(
  updateCommentSessionRoad3?: Dynamic,
  road?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  commentSessionMap2.delete(updateCommentSessionRoad3);
  commentSessionMap2.set(updateCommentSessionRoad3, {
    road: road,
    refused: false,
  });
  if (commentSessionMap2.size > commentSessionLimit256) {
    commentSessionMap2.delete(commentSessionMap2.keys().next().value);
  }
}

function clearCommentSessionEnd(
  clearCommentSessionEnd2?: Dynamic,
  options?: unknown,
  ..._extraArguments: unknown[]
): undefined {
  let commentSessionMap2Entry: Dynamic = commentSessionMap2.get(
    clearCommentSessionEnd2,
  );
  if (
    !(commentSessionMap2Entry === undefined || commentSessionMap2Entry.refused)
  ) {
    commentSessionMap2.delete(clearCommentSessionEnd2);
    try {
      emitTelemetryEvent(
        createPagesSummonRoundEvent({
          end: typeof options == `function` ? options() : options,
          road: commentSessionMap2Entry.road,
          host: resolveCommentSessionFrame(),
          plat: resolveObservabilityBrowserAndOperationEventsValue3(),
        }),
      );
    } catch {}
  }
}

function resolveCommentSessionHost(
  commentSessionHost?: Dynamic,
  options?: Dynamic,
  who?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    let resolveCommentSessionHostResult: Dynamic =
      resolveObservabilityBrowserAndOperationEventsField(
        commentSessionHost,
        options,
        {
          host: resolveCommentSessionFrame(),
          plat: resolveObservabilityBrowserAndOperationEventsValue3(),
          who: who,
        },
      );
    if (resolveCommentSessionHostResult !== null) {
      emitTelemetryEvent(resolveCommentSessionHostResult);
    }
  } catch {}
}

function resolveCommentSessionCard(
  card?: Dynamic,
  whose?: Dynamic,
  count?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    let resolveCommentSessionCardResult: Dynamic = createPagesAskLineEvent({
      card: card,
      whose: whose,
      count: count,
      host: resolveCommentSessionFrame(),
      plat: resolveObservabilityBrowserAndOperationEventsValue3(),
    });
    if (resolveCommentSessionCardResult !== null) {
      emitTelemetryEvent(resolveCommentSessionCardResult);
    }
  } catch {}
}

var commentSessionSet: Dynamic;

function resolveCommentSessionHost2(
  commentSessionHost2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsValue3();
    let event: Dynamic = resolveObservabilityBrowserAndOperationEventsKey5(
      commentSessionHost2,
      options,
      {
        host: resolveCommentSessionFrame(),
        plat: plat,
      },
    );
    if (event === null) return;
    let label = `${event.name}:${event.key}`;
    if (commentSessionSet.has(label) || commentSessionSet.size >= 4) return;
    commentSessionSet.add(label);
    emitTelemetryEvent(event);
  } catch {}
}

function reportCommentSessionEnd(
  end?: Dynamic,
  card?: Dynamic,
  standing?: Dynamic,
  dependencies?: Dynamic,
  whose?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    let reportCommentSessionEndResult: Dynamic = createPagesAskMarkedEvent({
      end: end,
      card: card,
      standing: standing,
      ms: dependencies,
      host: resolveCommentSessionFrame(),
      plat: resolveObservabilityBrowserAndOperationEventsValue3(),
      ...(whose !== undefined && {
        whose: whose,
      }),
    });
    if (reportCommentSessionEndResult !== null) {
      emitTelemetryEvent(reportCommentSessionEndResult);
    }
  } catch {}
}

function reportCommentSessionEvent(
  reportCommentSessionEvent2?: Dynamic,
  why?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    let reportCommentSessionEventResult: Dynamic = createPagesAskRoadEvent(
      reportCommentSessionEvent2,
      {
        host: resolveCommentSessionFrame(),
        plat: resolveObservabilityBrowserAndOperationEventsValue3(),
        ...(why !== undefined && {
          why: why,
        }),
      },
    );
    if (reportCommentSessionEventResult !== null) {
      emitTelemetryEvent(reportCommentSessionEventResult);
    }
  } catch {}
}

var CommentSessionNow: Dynamic;

var commentSessionSet2: Dynamic;

var commentSessionMap3: Dynamic;

var commentSessionLimit2562: number;

var commentSessionMap4: Dynamic;

var resolveCommentSessionValue2: Dynamic;

function getCommentSessionCancel(
  commentSessionCancel?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let commentSessionMap3Entry: Dynamic =
    commentSessionMap3.get(commentSessionCancel);
  if (
    !(
      commentSessionMap3Entry === undefined ||
      commentSessionMap3Entry.cancel === null
    )
  ) {
    commentSessionMap3Entry.cancel();
    commentSessionMap3Entry.cancel = null;
  }
}

function clearCommentSessionDelete(
  clearCommentSessionDelete4?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  getCommentSessionCancel(clearCommentSessionDelete4);
  commentSessionMap3.delete(clearCommentSessionDelete4);
  commentSessionMap4.delete(clearCommentSessionDelete4);
}

function updateCommentSessionRoad2(
  updateCommentSessionRoad22?: Dynamic,
  road?: Dynamic,
  card?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  clearCommentSessionDelete(updateCommentSessionRoad22);
  if (CommentSessionState === null) return;
  let record: Dynamic = {
    at: CommentSessionNow.now(),
    road: road,
    card: card,
    agentRows: resolveCommentSessionValue2(updateCommentSessionRoad22),
    cancel: null,
  };
  record.cancel = CommentSessionNow.wait(
    (..._extraArguments: unknown[]): undefined => {
      record.cancel = null;
      if (
        !(
          commentSessionMap3.get(updateCommentSessionRoad22) !== record ||
          resolveCommentSessionValue2(updateCommentSessionRoad22) >
            record.agentRows
        )
      ) {
        resolveCommentSessionRoad(record, CommentSessionNow.now() - record.at);
      }
    },
    CommentSessionNow.ms,
  );
  commentSessionMap3.set(updateCommentSessionRoad22, record);
  if (commentSessionMap3.size > commentSessionLimit2562) {
    clearCommentSessionDelete(commentSessionMap3.keys().next().value);
  }
}

function resolveCommentSessionRoad(
  request?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  emitTelemetryEvent(
    createPagesSummonSilentEvent({
      road: request.road,
      host: resolveCommentSessionFrame(),
      ms: options,
      plat: resolveObservabilityBrowserAndOperationEventsValue3(),
      ...(request.card && {
        origin: `card`,
      }),
    }),
  );
}

function updateCommentSessionState(
  updateCommentSessionState2?: Dynamic,
  state?: Dynamic,
  reason?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let now: Dynamic = CommentSessionNow.now();
  let updateCommentSessionStateResult: Dynamic =
    resolveObservabilityBrowserAndOperationEventsValue15(state);
  let commentSessionMap4Entry: Dynamic = commentSessionMap4.get(
    updateCommentSessionState2,
  );
  commentSessionMap4.delete(updateCommentSessionState2);
  commentSessionMap4.set(updateCommentSessionState2, {
    state: updateCommentSessionStateResult ? state : `unrowed`,
    at: now,
  });
  if (commentSessionMap4.size > commentSessionLimit2562) {
    commentSessionMap4.delete(commentSessionMap4.keys().next().value);
  }
  if (!updateCommentSessionStateResult)
    return void resolveCommentsStoreLayer(`host`, `summon_state_other`, {
      state: /^[a-z0-9_]{1,32}$/.test(state) ? state : `unrowed`,
    });
  if (commentSessionSet2.has(state)) {
    getCommentSessionCancel(updateCommentSessionState2);
  }
  let at2: Dynamic = commentSessionMap3.get(updateCommentSessionState2)?.at;
  let record: Dynamic =
    commentSessionMap4Entry === undefined
      ? at2 === undefined
        ? {}
        : {
            dwellMs: now - at2,
          }
      : {
          from: commentSessionMap4Entry.state,
          dwellMs: now - commentSessionMap4Entry.at,
        };
  emitTelemetryEvent(
    createPagesSummonStateEvent({
      state: state,
      host: resolveCommentSessionFrame(),
      plat: resolveObservabilityBrowserAndOperationEventsValue3(),
      ...(reason !== undefined && {
        reason: reason,
      }),
      ...(at2 !== undefined && {
        ms: now - at2,
      }),
      ...record,
    }),
  );
}

function getCommentSessionEnd(
  end?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  card?: Dynamic,
  argument?: Dynamic,
  road?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    argument === `elsewhere` ||
    argument === `queued_row` ||
    argument === `comment_row`
  ) {
    end = argument;
  }
  let at2: Dynamic =
    options === null ? undefined : commentSessionMap3.get(options)?.at;
  emitTelemetryEvent(
    resolveObservabilityBrowserAndOperationEventsKey4({
      end: end,
      host: resolveCommentSessionFrame(),
      ms: at2 === undefined ? context : CommentSessionNow.now() - at2,
      plat: resolveObservabilityBrowserAndOperationEventsValue3(),
      ...(card !== null && {
        card: card,
      }),
      ...(road !== undefined &&
        (end === `gone`
          ? {
              road: road,
            }
          : {
              whose: road,
            })),
    }),
  );
}

var CommentSessionState4: Dynamic;

function resolveCommentSessionShell(
  commentSessionShell?: unknown,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      typeof commentSessionShell != `string` ||
      commentSessionShell === CommentSessionState4
    )
  ) {
    CommentSessionState4 = commentSessionShell;
    resolveCommentsStoreLayer(`host`, `summon_shell`, {
      shell: /^[A-Za-z0-9_.:-]{1,48}$/.test(commentSessionShell)
        ? commentSessionShell
        : `unrowed`,
    });
    resolveCommentSessionFrom4(commentSessionShell);
  }
}

var commentSessionLimit10000: number;

var CommentSessionState5: Dynamic;

var CommentSessionState6: boolean;

var CommentSessionState7: Dynamic;

var CommentSessionState8: Dynamic;

var CommentSessionState9: boolean;

var CommentSessionFrom: Dynamic;

function resolveCommentSessionValue3(..._extraArguments: unknown[]): Dynamic {
  let resolveCommentSessionValue3Result: Dynamic = frameHotFrom();
  return resolveCommentSessionValue3Result === `none` ||
    resolveCommentSessionValue3Result === `other` ||
    resolveCommentSessionValue3Result === `unasked` ||
    resolveCommentSessionValue3Result === `stale`
    ? `swap`
    : resolveCommentSessionValue3Result;
}

function resolveCommentSessionFrom(..._extraArguments: unknown[]): undefined {
  if (CommentSessionState5 === null)
    try {
      CommentSessionState5 = {
        at: CommentSessionNow.now(),
        from: CommentSessionFrom.from(),
        host: resolveCommentSessionFrame(),
        plat: resolveObservabilityBrowserAndOperationEventsValue3(),
      };
      CommentSessionState6 = true;
      CommentSessionFrom.wait(
        resolveCommentSessionFrom2,
        commentSessionLimit10000,
      );
    } catch {}
}

function resolveCommentSessionFrom2(..._extraArguments: unknown[]): undefined {
  if (CommentSessionState5 === null || !CommentSessionState6) return;
  CommentSessionState6 = false;
  try {
    emitTelemetryEvent(
      createPagesSummonAnnouncedEvent({
        from: CommentSessionState5.from,
        host: CommentSessionState5.host,
        plat: CommentSessionState5.plat,
      }),
    );
    if (CommentSessionState7 !== null && !CommentSessionState9) {
      CommentSessionState9 = true;
      emitTelemetryEvent(
        createPagesSummonHeardEvent({
          from: CommentSessionState5.from,
          host: CommentSessionState5.host,
          by: CommentSessionState7,
          ms: 0,
          plat: CommentSessionState5.plat,
        }),
      );
    }
  } catch {}
  let CommentSessionState82: Dynamic = CommentSessionState8;
  CommentSessionState8 = null;
  if (CommentSessionState82 !== null) {
    resolveCommentSessionFrom4(CommentSessionState82);
  }
}

function resolveCommentSessionFrom3(
  commentSession?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!CommentSessionState9) {
    if (CommentSessionState5 === null)
      return void (CommentSessionState7 ??= commentSession);
    resolveCommentSessionFrom2();
    if (!CommentSessionState9) {
      CommentSessionState9 = true;
      try {
        emitTelemetryEvent(
          createPagesSummonHeardEvent({
            from: CommentSessionState5.from,
            host: CommentSessionState5.host,
            by: commentSession,
            ms: CommentSessionNow.now() - CommentSessionState5.at,
            plat: CommentSessionState5.plat,
          }),
        );
      } catch {}
    }
  }
}

var CommentSessionState10: boolean;

function resolveCommentSessionFrom4(
  shell?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!CommentSessionState10) {
    if (CommentSessionState5 === null)
      return void (CommentSessionState8 ??= shell);
    try {
      let resolveCommentSessionFrom4Result: Dynamic =
        createPagesSummonShellBuildEvent({
          from: CommentSessionState5.from,
          host: CommentSessionState5.host,
          shell: shell,
        });
      if (resolveCommentSessionFrom4Result === null) return;
      CommentSessionState10 = true;
      resolveCommentSessionFrom2();
      emitTelemetryEvent(resolveCommentSessionFrom4Result);
    } catch {}
  }
}

var resolveCommentSessionValue4: Dynamic;

var CommentSessionState11: number;

var CommentSessionState12: boolean;

var CommentSessionWait: Dynamic;

function resolveCommentSessionHost4(..._extraArguments: unknown[]): undefined {
  if (CommentSessionState12) {
    CommentSessionState12 = false;
    try {
      CommentSessionWait.wait((..._extraArguments: unknown[]): undefined => {
        try {
          let plat: Dynamic =
            resolveObservabilityBrowserAndOperationEventsValue3();
          emitTelemetryEvent(
            createPagesFlagPetrelEvent({
              host: resolveCommentSessionFrame(),
              plat: plat,
            }),
          );
        } catch {}
      }, CommentSessionState11);
    } catch {}
  }
}

function resolveCommentSessionSubscribe(
  ..._extraArguments: unknown[]
): Dynamic {
  return DataModelSchemasPending.subscribe(
    (
      commentSessionSubscribe?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          commentSessionMap3.size === 0 ||
          commentSessionSubscribe.pending === options.pending
        )
      )
        for (let resolveCommentSessionSubscribeResult of Object.keys(
          options.pending,
        ) as Dynamic)
          if (
            !Object.hasOwn(
              commentSessionSubscribe.pending,
              resolveCommentSessionSubscribeResult,
            )
          ) {
            getCommentSessionCancel(resolveCommentSessionSubscribeResult);
          }
    },
  );
}

function resolveCommentSessionValues(..._extraArguments: unknown[]): undefined {
  for (let resolveCommentSessionValuesResult of commentSessionMap3.values() as Dynamic)
    resolveCommentSessionValuesResult.cancel?.();
  commentSessionMap3.clear();
  commentSessionMap4.clear();
}

var CommentSessionState13: Dynamic;

var commentSessionLimit0: Dynamic;

var resolveCommentSessionValue5: Dynamic;

function clearCommentSessionThreadId(
  threadId?: Dynamic,
  options?: Dynamic,
  context: Dynamic = `runner`,
  dependencies: Dynamic = {},
  ..._extraArguments: unknown[]
) {
  let summonNoteItem: Dynamic = Object.hasOwn(
    useCommentStore.getState().summonNotes,
    threadId,
  )
    ? useCommentStore.getState().summonNotes[threadId]
    : undefined;
  let clearCommentSessionThreadIdResult: Dynamic =
    options === null
      ? null
      : resolvePlatformSessionAndSourcesSent(summonNoteItem, options, context);
  if (
    clearCommentSessionThreadIdResult !== null &&
    clearCommentSessionThreadIdResult === summonNoteItem &&
    options !== summonNoteItem
  )
    return;
  if (
    summonNoteItem === undefined ||
    options === null ||
    (context !== `shell` &&
      clearCommentSessionThreadIdResult !== null &&
      clearCommentSessionThreadIdResult !== summonNoteItem &&
      resolveDataModelSchemasSent(clearCommentSessionThreadIdResult))
  ) {
    commentSessionSet6.delete(threadId);
    commentSessionMap11.delete(threadId);
    if (context !== `shell`) {
      clearCommentSessionDelete(threadId);
    }
  }
  let matchesClearCommentSessionThreadIdResult =
    clearCommentSessionThreadIdResult !== `ended` ||
    summonNoteItem === `needs_user` ||
    summonNoteItem === `queued` ||
    summonNoteItem === `still_working` ||
    Object.hasOwn(DataModelSchemasPending.getState().pending, threadId);
  if (
    !dependencies.quiet &&
    clearCommentSessionThreadIdResult !== null &&
    clearCommentSessionThreadIdResult !== summonNoteItem &&
    resolveDataModelSchemasSent(clearCommentSessionThreadIdResult) &&
    matchesClearCommentSessionThreadIdResult
  ) {
    resolveCommentSessionSource(clearCommentSessionThreadIdResult, context, {
      threadId: threadId,
    });
  }
  let handoff: boolean =
    clearCommentSessionThreadIdResult !== null &&
    clearCommentSessionThreadIdResult === summonNoteItem &&
    Object.hasOwn(useCommentStore.getState().summonHandoff, threadId);
  if (
    !dependencies.quiet &&
    clearCommentSessionThreadIdResult !== null &&
    clearCommentSessionThreadIdResult !== summonNoteItem
  ) {
    if (
      resolveDataModelSchemasSent(clearCommentSessionThreadIdResult) &&
      clearCommentSessionThreadIdResult !== `ended`
    ) {
      handoff = resolveCommentsEditorValue(
        clearCommentSessionThreadIdResult,
        CommentSessionState13.failed(clearCommentSessionThreadIdResult),
      );
      commentSessionLimit0 = resolveCommentSessionValue5(
        useCommentStore.getState(),
      );
    } else {
      if (
        clearCommentSessionThreadIdResult === `queued` ||
        clearCommentSessionThreadIdResult === `needs_user` ||
        clearCommentSessionThreadIdResult === `ended` ||
        clearCommentSessionThreadIdResult === `edited` ||
        (clearCommentSessionThreadIdResult === `sent` &&
          context === `shell` &&
          resolveDataModelSchemasSent(summonNoteItem))
      ) {
        CommentSessionState13.reset();
      }
    }
  }
  useCommentStore
    .getState()
    .setSummonNote(threadId, clearCommentSessionThreadIdResult, {
      handoff: handoff,
    });
  let commentSessionMap2Entry: Dynamic = commentSessionMap2.get(threadId);
  if (
    commentSessionMap2Entry !== undefined &&
    context === `shell` &&
    !dependencies.quiet &&
    clearCommentSessionThreadIdResult !== null &&
    clearCommentSessionThreadIdResult !== summonNoteItem
  ) {
    if (
      clearCommentSessionThreadIdResult === `sent` ||
      clearCommentSessionThreadIdResult === `queued`
    ) {
      commentSessionMap2Entry.refused = false;
    } else {
      if (
        clearCommentSessionThreadIdResult !== `ended` &&
        resolveDataModelSchemasSent(clearCommentSessionThreadIdResult)
      ) {
        commentSessionMap2Entry.refused = true;
      }
    }
  }
  if (
    !dependencies.quiet &&
    clearCommentSessionThreadIdResult !== summonNoteItem &&
    (clearCommentSessionThreadIdResult === `ended` ||
      clearCommentSessionThreadIdResult === `edited`)
  ) {
    clearCommentSessionEnd(
      threadId,
      clearCommentSessionThreadIdResult === `edited` ? `edited` : `neither`,
    );
  }
  if (
    clearCommentSessionThreadIdResult !== null &&
    resolveDataModelSchemasSent(clearCommentSessionThreadIdResult)
  ) {
    summonAskSettled(threadId);
  }
  if (
    clearCommentSessionThreadIdResult !== null &&
    clearCommentSessionThreadIdResult !== summonNoteItem &&
    !quietCarrierThreads.has(threadId)
  ) {
    resolvePlatformAnnouncementsValue(
      document,
      resolvePlatformSessionAndSourcesValue6(
        clearCommentSessionThreadIdResult,
        handoff,
      ),
      {
        key: `summon:${threadId}`,
      },
    );
  }
  if (
    !(
      clearCommentSessionThreadIdResult === null ||
      clearCommentSessionThreadIdResult === `waiting` ||
      clearCommentSessionThreadIdResult === `needs_user`
    )
  ) {
    if (
      clearCommentSessionThreadIdResult !== `sent` &&
      clearCommentSessionThreadIdResult !== `queued`
    ) {
      DataModelSchemasPending.getState().clear(threadId);
      return;
    }
    CommentSessionState15.sent(threadId);
    if (
      !dependencies.quiet &&
      clearCommentSessionThreadIdResult !== summonNoteItem &&
      !commentSessionSet6.has(threadId)
    ) {
      commentSessionSet6.add(threadId);
      if (commentSessionSet6.size > commentSessionLimit2564) {
        commentSessionSet6.delete(commentSessionSet6.values().next().value);
      }
      clearCommentSessionRoad(threadId, context !== `shell`);
    }
    if (
      (summonNoteItem === `queued` || summonNoteItem === `still_working`) &&
      clearCommentSessionThreadIdResult === `sent`
    )
      return updateCommentSessionSince(threadId);
    if (
      !(
        summonNoteItem === undefined ||
        !resolveDataModelSchemasSent(summonNoteItem)
      )
    ) {
      resolveCommentSessionNow(threadId);
    }
  }
}

var commentSessionMap5: Dynamic;

function updateCommentSessionQuiet(
  threadId?: Dynamic,
  options?: Dynamic,
  context: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  let storeState: Dynamic = useCommentStore.getState();
  if (options !== `parked`) {
    if (Object.hasOwn(storeState.summonNotes, threadId)) return;
    for (let updateCommentSessionQuietResult of heldThreads(
      storeState,
    ) as Dynamic)
      if (
        updateCommentSessionQuietResult.id === threadId &&
        filterDataModelSchemasFilter3(updateCommentSessionQuietResult) > context
      )
        return;
    commentSessionMap5.set(threadId, context);
  }
  clearCommentSessionThreadId(threadId, `refused`, `dark`, {
    quiet: true,
  });
  resolveCommentSessionSource(`left_before_send`, options, {
    threadId: threadId,
  });
}

function clearCommentSessionSubscribe(..._extraArguments: unknown[]): Dynamic {
  return useCommentStore.subscribe(
    (
      clearCommentSessionSubscribe2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          commentSessionMap5.size === 0 ||
          (clearCommentSessionSubscribe2.byPage === options.byPage &&
            clearCommentSessionSubscribe2.allByPage === options.allByPage)
        )
      )
        for (let clearCommentSessionSubscribeResult of heldThreads(
          clearCommentSessionSubscribe2,
        ) as Dynamic) {
          let commentSessionMap5Entry: Dynamic = commentSessionMap5.get(
            clearCommentSessionSubscribeResult.id,
          );
          if (commentSessionMap5Entry !== undefined) {
            if (
              clearCommentSessionSubscribe2.summonNotes[
                clearCommentSessionSubscribeResult.id
              ] === `refused`
            ) {
              if (
                filterDataModelSchemasFilter3(
                  clearCommentSessionSubscribeResult,
                ) > commentSessionMap5Entry
              ) {
                commentSessionMap5.delete(
                  clearCommentSessionSubscribeResult.id,
                );
                clearCommentSessionSubscribe2.setSummonNote(
                  clearCommentSessionSubscribeResult.id,
                  null,
                );
              }
            } else {
              commentSessionMap5.delete(clearCommentSessionSubscribeResult.id);
            }
          }
        }
    },
  );
}

function isCommentSessionAcked(
  commentSessionAcked: Dynamic = Date.now,
  options: Dynamic = (
    commentSessionAcked2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let setTimeout2 = setTimeout(commentSessionAcked2, options2);
    return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
  },
  context: Dynamic = summonAgentRowAt,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  let items: Dynamic = [];
  let isCommentSessionAckedResult: Dynamic = null;
  let context2: Dynamic = (
    activity?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!activity.acked) return activity.at + ASKED_UNCONFIRMED_MS;
    let context3: Dynamic = context();
    let context4: Dynamic =
      context3 !== null && context3 > activity.at ? context3 : activity.at;
    return Math.min(
      context4 + ASKED_ACKED_UNCONFIRMED_MS,
      activity.at + ASKED_ACKED_MAX_MS,
    );
  };
  let getState = (..._extraArguments: unknown[]): undefined => {
    if (enabled || items.length === 0) return;
    let lookup: Dynamic = new (Map as Dynamic)();
    for (let isCommentSessionAckedResult2 of heldThreads(
      useCommentStore.getState(),
    ) as Dynamic)
      lookup.set(
        isCommentSessionAckedResult2.id,
        Math.max(
          lookup.get(isCommentSessionAckedResult2.id) ?? 0,
          filterDataModelSchemasFilter3(isCommentSessionAckedResult2),
        ),
      );
    let amount = 1 / 0;
    items = items.filter((ask?: Dynamic, ..._extraArguments: unknown[]) => {
      if (summonAskedThisLife(ask.threadId)) return false;
      let lookupEntry: Dynamic = lookup.get(ask.threadId);
      if (lookupEntry === undefined) return true;
      if (lookupEntry <= ask.agentRows) {
        let difference: number = context2(ask) - commentSessionAcked();
        if (difference > 0) {
          amount = Math.min(amount, difference);
          return true;
        }
        updateCommentSessionQuiet(ask.threadId, `asked`, ask.agentRows);
      }
      summonAskSettled(ask.threadId);
      return false;
    });
    isCommentSessionAckedResult?.();
    isCommentSessionAckedResult =
      amount < 1 / 0 ? options(getState, amount + 50) : null;
  };
  summonAsksLeft(commentSessionAcked()).then(
    (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!enabled) {
        items = result;
        getState();
      }
    },
    (..._extraArguments: unknown[]): undefined => undefined,
  );
  let subscribe: Dynamic = useCommentStore.subscribe(
    (
      commentSessionAcked2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        items.length > 0 &&
        (commentSessionAcked2.byPage !== options2.byPage ||
          commentSessionAcked2.allByPage !== options2.allByPage)
      ) {
        getState();
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    enabled = true;
    subscribe();
    isCommentSessionAckedResult?.();
  };
}

function isCommentSessionFilter(
  commentSessionFilter: Dynamic = Date.now,
  options: Dynamic = (
    commentSessionFilter2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let setTimeout2 = setTimeout(commentSessionFilter2, options2);
    return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
  },
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  let items: Dynamic = [];
  let isCommentSessionFilterResult: Dynamic = null;
  let getState = (..._extraArguments: unknown[]): undefined => {
    if (enabled || items.length === 0) return;
    let lookup: Dynamic = new (Map as Dynamic)();
    for (let isCommentSessionFilterResult2 of heldThreads(
      useCommentStore.getState(),
    ) as Dynamic)
      lookup.set(
        isCommentSessionFilterResult2.id,
        Math.max(
          lookup.get(isCommentSessionFilterResult2.id) ?? 0,
          filterDataModelSchemasFilter3(isCommentSessionFilterResult2),
        ),
      );
    let amount = 1 / 0;
    items = items.filter((ask?: Dynamic, ..._extraArguments: unknown[]) => {
      let lookupEntry: Dynamic = lookup.get(ask.threadId);
      if (lookupEntry === undefined) return true;
      if (lookupEntry > ask.agentRows) return false;
      let difference: number =
        ask.at + ASKED_UNCONFIRMED_MS - commentSessionFilter();
      return difference > 0
        ? ((amount = Math.min(amount, difference)), true)
        : (updateCommentSessionQuiet(ask.threadId, `asked`, ask.agentRows),
          useCommentStore.getState().setSurfaceCarrier(ask.threadId),
          carrierSettled(ask.threadId),
          false);
    });
    isCommentSessionFilterResult?.();
    isCommentSessionFilterResult =
      amount < 1 / 0 ? options(getState, amount + 50) : null;
  };
  carriersLeft(commentSessionFilter()).then(
    (items2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(enabled || items2.length === 0)) {
        for (let ask of items2 as Dynamic)
          quietCarrierThreads.add(ask.threadId);
        items = items2.filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) => !item.delivered,
        );
        useCommentStore.setState({});
        getState();
      }
    },
    (..._extraArguments: unknown[]): undefined => undefined,
  );
  let subscribe: Dynamic = useCommentStore.subscribe(
    (
      commentSessionFilter2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        items.length > 0 &&
        (commentSessionFilter2.byPage !== options2.byPage ||
          commentSessionFilter2.allByPage !== options2.allByPage)
      ) {
        getState();
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    enabled = true;
    subscribe();
    isCommentSessionFilterResult?.();
  };
}

var CommentSessionWait2: Dynamic;

var commentSessionMap6: Dynamic;

var commentSessionMap7: Dynamic;

var commentSessionMap8: Dynamic;

var commentSessionSet3: Dynamic;

var commentSessionLimit2563: number;

var commentSessionSet4: Dynamic;

var clearCommentSessionDelete2: (clearCommentSessionDelete22?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolveCommentSessionValues2(
  ..._extraArguments: unknown[]
): undefined {
  for (let resolveCommentSessionValues2Result of commentSessionMap6.values() as Dynamic)
    resolveCommentSessionValues2Result.cancel();
  commentSessionMap6.clear();
}

function resolveCommentSessionValue6(
  commentSessionValue6?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  clearCommentSessionDelete2(commentSessionValue6);
}

function isCommentSessionPending(
  commentSessionPending?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentSessionMap7Entry: Dynamic =
    commentSessionMap7.get(commentSessionPending) ??
    DataModelSchemasPending.getState().pending[commentSessionPending]
      ?.agentRows;
  if (commentSessionMap7Entry === undefined) return false;
  for (let isCommentSessionPendingResult of heldThreads(
    useCommentStore.getState(),
  ) as Dynamic)
    if (
      isCommentSessionPendingResult.id === commentSessionPending &&
      filterDataModelSchemasFilter3(isCommentSessionPendingResult) >
        commentSessionMap7Entry
    )
      return true;
  return false;
}

function getCommentSessionFile(
  commentSessionFile?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentSessionMap8Entry: Dynamic =
    commentSessionMap8.get(commentSessionFile);
  return commentSessionMap8Entry === undefined ||
    commentSessionMap8Entry.file === `` ||
    useCommentStore.getState().summonFile !== commentSessionMap8Entry.file
    ? false
    : hasAgentWrittenSince(
        commentSessionMap8Entry.file,
        commentSessionMap8Entry.mark,
      );
}

function resolveCommentSessionVia(
  commentSessionVia?: Dynamic,
  via?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
) {
  return quietCarrierThreads.has(commentSessionVia) ||
    !getCommentSessionFile(commentSessionVia)
    ? false
    : (summonAskSettled(commentSessionVia),
      resolveCommentsStoreLayer(`host`, `summon_edited`, {
        via: via,
      }),
      clearCommentSessionThreadId(
        commentSessionVia,
        `edited`,
        via === `ended` ? `shell` : `runner`,
        context,
      ),
      true);
}

function updateCommentSessionFile(
  updateCommentSessionFile2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = useCommentStore.getState().summonFile,
  ..._extraArguments: unknown[]
): undefined {
  clearCommentSessionDelete2(updateCommentSessionFile2);
  commentSessionMap7.delete(updateCommentSessionFile2);
  commentSessionMap7.set(updateCommentSessionFile2, options);
  if (commentSessionMap7.size > commentSessionLimit2563) {
    commentSessionMap7.delete(commentSessionMap7.keys().next().value);
  }
  commentSessionMap8.delete(updateCommentSessionFile2);
  commentSessionMap8.set(updateCommentSessionFile2, {
    file: context ?? ``,
    mark: getAgentWriteCursor(context ?? ``),
  });
  if (commentSessionMap8.size > commentSessionLimit2563) {
    commentSessionMap8.delete(commentSessionMap8.keys().next().value);
  }
}

function clearCommentSessionDelete3(
  clearCommentSessionDelete32?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  commentSessionSet3.delete(clearCommentSessionDelete32);
  commentSessionSet4.delete(clearCommentSessionDelete32);
}

function updateCommentSessionQuiet2(
  updateCommentSessionQuiet22?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (options !== `ended`) {
    clearCommentSessionDelete2(updateCommentSessionQuiet22);
    if (
      (options === `queued` || options === `needs_user`) &&
      quietCarrierThreads.has(updateCommentSessionQuiet22) &&
      commentSessionSet3.has(updateCommentSessionQuiet22) &&
      useCommentStore.getState().summonNotes[updateCommentSessionQuiet22] ===
        `ended`
    ) {
      commentSessionSet4.add(updateCommentSessionQuiet22);
      if (commentSessionSet4.size > commentSessionLimit2563) {
        commentSessionSet4.delete(commentSessionSet4.values().next().value);
      }
    }
    clearCommentSessionThreadId(updateCommentSessionQuiet22, options, `shell`);
    return;
  }
  let updateCommentSessionQuiet2Handler: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => commentSessionSet3.has(updateCommentSessionQuiet22);
  let getState: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    isCommentSessionPending(updateCommentSessionQuiet22) ||
    (updateCommentSessionQuiet2Handler() &&
      !commentSessionSet4.has(updateCommentSessionQuiet22) &&
      useCommentStore.getState().summonNotes[updateCommentSessionQuiet22] !==
        `needs_user`);
  if (getState())
    return void clearCommentSessionDelete2(updateCommentSessionQuiet22);
  let next = (..._extraArguments: unknown[]): undefined => {
    let heardAt: Dynamic = commentSessionMap6.get(
      updateCommentSessionQuiet22,
    )?.heardAt;
    commentSessionMap6.delete(updateCommentSessionQuiet22);
    if (getState()) return;
    let pendingItem: Dynamic =
      DataModelSchemasPending.getState().pending[updateCommentSessionQuiet22];
    if (
      heardAt !== undefined &&
      pendingItem !== undefined &&
      pendingItem.at > heardAt &&
      commentSessionMap11.get(updateCommentSessionQuiet22)?.at !==
        pendingItem.at
    )
      return;
    let quiet: Dynamic = updateCommentSessionQuiet2Handler();
    commentSessionSet4.delete(updateCommentSessionQuiet22);
    commentSessionSet3.add(updateCommentSessionQuiet22);
    if (commentSessionSet3.size > commentSessionLimit2563) {
      commentSessionSet3.delete(commentSessionSet3.values().next().value);
    }
    if (
      !resolveCommentSessionVia(updateCommentSessionQuiet22, `ended`, {
        quiet: quiet,
      })
    ) {
      clearCommentSessionThreadId(
        updateCommentSessionQuiet22,
        `ended`,
        `shell`,
        {
          quiet: quiet,
        },
      );
    }
  };
  if (CommentSessionWait2.ms <= 0) return next();
  if (!commentSessionMap6.has(updateCommentSessionQuiet22)) {
    commentSessionMap6.set(updateCommentSessionQuiet22, {
      cancel: CommentSessionWait2.wait(next, CommentSessionWait2.ms),
      heardAt: Date.now(),
    });
  }
}

function resolveCommentSessionNow(
  commentSessionNow?: Dynamic,
  timeoutMs?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !Object.hasOwn(
      DataModelSchemasPending.getState().pending,
      commentSessionNow,
    )
  ) {
    for (let resolveCommentSessionNowResult of heldThreads(
      useCommentStore.getState(),
    ) as Dynamic)
      if (resolveCommentSessionNowResult.id === commentSessionNow) {
        DataModelSchemasPending.getState().mark(
          commentSessionNow,
          filterDataModelSchemasFilter3(resolveCommentSessionNowResult),
          {
            now: Date.now(),
            ...(timeoutMs !== undefined && {
              timeoutMs: timeoutMs,
            }),
          },
        );
        return;
      }
  }
}

function updateCommentSessionSince(
  updateCommentSessionSince3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let pendingItem: Dynamic =
    DataModelSchemasPending.getState().pending[updateCommentSessionSince3];
  if (pendingItem === undefined)
    return resolveCommentSessionNow(updateCommentSessionSince3);
  let now = Date.now();
  if (!commentSessionMap11.has(updateCommentSessionSince3)) {
    commentSessionMap11.set(updateCommentSessionSince3, {
      since: Math.min(pendingItem.at, now),
      at: now,
    });
    if (commentSessionMap11.size > commentSessionLimit2564) {
      commentSessionMap11.delete(commentSessionMap11.keys().next().value);
    }
  }
  DataModelSchemasPending.getState().mark(
    updateCommentSessionSince3,
    pendingItem.agentRows,
    {
      now: now,
    },
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentSessionClearCommentSessionThreadIdStep1(): void {
  (CommentSessionState2 = resolveCommentsEditorAdmit());
  (resolveCommentSessionFrame = (..._extraArguments: unknown[]) =>
    resolveObservabilityBootChat({
      frame: isFrameArtifact(),
      shell: isEditorExtensionsValue(),
      hostPane: isEditorExtensionsLocation(),
      poked: frameHostChromeWitnessed(),
      pane: frameConversationPane(),
      chatBeside: hostSays(`chat_beside`),
    }));
  (CommentSessionState3 = updateCommentsEditorLanded());
  (commentSessionMap = new (Map as Dynamic)());
  (commentSessionLimit64 = 64);
  (commentSessionMap2 = new (Map as Dynamic)());
  (commentSessionLimit256 = 256);
  (commentSessionSet = new (Set as Dynamic)());
  (CommentSessionNow = {
    ms: 2e4,
    now: (..._extraArguments: unknown[]) => Date.now(),
    wait: (
      commentSessionNow?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let setTimeout2 = setTimeout(commentSessionNow, options);
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
  });
  (commentSessionSet2 = new (Set as Dynamic)([
    `sent`,
    `queued`,
    `failed`,
    `ended`,
    `needs_user`,
    `kept`,
    `stopped`,
  ]));
  (commentSessionMap3 = new (Map as Dynamic)());
  (commentSessionLimit2562 = 256);
  (commentSessionMap4 = new (Map as Dynamic)());
  (resolveCommentSessionValue2 = (
    commentSessionValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let count = 0;
    for (let resolveCommentSessionValue2Result of heldThreads(
      useCommentStore.getState(),
    ) as Dynamic)
      if (resolveCommentSessionValue2Result.id === commentSessionValue2) {
        count = Math.max(
          count,
          filterDataModelSchemasFilter3(resolveCommentSessionValue2Result),
        );
      }
    return count;
  });
  (CommentSessionState4 = null);
  (commentSessionLimit10000 = 1e4);
  (CommentSessionState5 = null);
  (CommentSessionState6 = false);
  (CommentSessionState7 = null);
  (CommentSessionState8 = null);
  (CommentSessionState9 = false);
  (CommentSessionFrom = {
    from: (..._extraArguments: unknown[]): Dynamic =>
      resolveCommentSessionValue3(),
    wait: (
      commentSession?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void setTimeout(commentSession, options),
  });
  (CommentSessionState10 = false);
  (resolveCommentSessionValue4 = (
      commentSessionValue4?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (...commentSessionValue42: Dynamic[]): Dynamic => (
      resolveCommentSessionFrom3(commentSessionValue4),
      (options as Dynamic)(...commentSessionValue42)
    ));
  (CommentSessionState11 = commentSessionLimit10000);
  (CommentSessionState12 = true);
  (CommentSessionWait = {
    wait: (
      commentSessionWait?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void setTimeout(commentSessionWait, options),
  });
  (CommentSessionState13 = resolveCommentsEditorFailed());
  (commentSessionLimit0 = 0);
  (resolveCommentSessionValue5 = (
    commentSessionValue5?: Dynamic,
    ..._extraArguments: unknown[]
  ): number => {
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    let count: number = 0;
    for (let resolveCommentSessionValue5Result of heldThreads(
      commentSessionValue5,
    ) as Dynamic)
      if (!uniqueItems.has(resolveCommentSessionValue5Result.id)) {
        uniqueItems.add(resolveCommentSessionValue5Result.id);
        count += filterDataModelSchemasFilter3(resolveCommentSessionValue5Result);
      }
    return count;
  });
  (commentSessionMap5 = new (Map as Dynamic)());
  (CommentSessionWait2 = {
    ms: 15e3,
    wait: (
      commentSessionWait2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let setTimeout2 = setTimeout(commentSessionWait2, options);
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
  });
  (commentSessionMap6 = new (Map as Dynamic)());
  (commentSessionMap7 = new (Map as Dynamic)());
  (commentSessionMap8 = new (Map as Dynamic)());
  (commentSessionSet3 = new (Set as Dynamic)());
  (commentSessionLimit2563 = 256);
  (commentSessionSet4 = new (Set as Dynamic)());
  (clearCommentSessionDelete2 = (
    clearCommentSessionDelete22?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    commentSessionMap6.get(clearCommentSessionDelete22)?.cancel();
    commentSessionMap6.delete(clearCommentSessionDelete22);
  });
}

export {
  CommentSessionState13,
  CommentSessionState2,
  clearCommentSessionDelete3,
  clearCommentSessionEnd,
  clearCommentSessionSubscribe,
  clearCommentSessionThreadId,
  commentSessionLimit0,
  getCommentSessionCancel,
  getCommentSessionEnd,
  getCommentSessionFile,
  isCommentSessionAcked,
  isCommentSessionFilter,
  reportCommentSessionEnd,
  reportCommentSessionEvent,
  resolveCommentSessionCard,
  resolveCommentSessionFailed,
  resolveCommentSessionFrom,
  resolveCommentSessionFrom3,
  resolveCommentSessionHost,
  resolveCommentSessionHost2,
  resolveCommentSessionHost4,
  resolveCommentSessionLanded,
  resolveCommentSessionNow,
  resolveCommentSessionReason,
  resolveCommentSessionShell,
  resolveCommentSessionSource,
  resolveCommentSessionSubscribe,
  resolveCommentSessionValue,
  resolveCommentSessionValue4,
  resolveCommentSessionValue5,
  resolveCommentSessionValue6,
  resolveCommentSessionValues,
  resolveCommentSessionValues2,
  resolveCommentSessionVia,
  updateCommentSessionFile,
  updateCommentSessionQuiet,
  updateCommentSessionQuiet2,
  updateCommentSessionState,
  updateCommentSessionTake,
};

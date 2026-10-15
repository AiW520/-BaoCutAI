/** BaoCut: comments store from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  applyUpdate,
  atom,
  rolldownNImport,
} from "./platform-core-dependencies";
import {
  resolvePlatformSessionAndSourcesValue8,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolveEditorExtensionsAnchor2,
  resolveEditorExtensionsMessage,
} from "./platform-core-editor-extensions-3";
import {
  editorAnchorsAndMentionsPattern2,
  resolveEditorAnchorsAndMentionsValue8,
} from "./platform-core-editor-anchors-and-mentions-1";
import {
  resolvePlatformFrameAndCapabilitiesFrom,
} from "./platform-core-platform-frame-and-capabilities";
import {
  resolvePlatformApiAndAuthHuman2,
} from "./platform-core-platform-api-and-auth-5";
import {
  atomChipLabel,
  atomKindOfQuote,
  clampAnchorLabel,
  screenCellIds,
  updateDataModelSchemasOpen,
} from "./platform-core-data-model-schemas-3";
import {
  dataOperationEngineKindSchema18,
  resolveDataOperationEngineEvery,
} from "./platform-core-data-operation-engine-3";
import {
  bornAtom,
  bumpDamaged,
  foldParentOf,
  foldStore,
  isRootRef,
  liveScope,
  refAtom,
  refIndexAtom,
  resolveDataOperationEngineValue26,
} from "./platform-core-data-operation-engine-4";
import {
  loadDataOperationEngineRef,
  updateDataOperationEngineEngine,
} from "./platform-core-data-operation-engine-5";
import {
  _focusMoveWatcher,
  commentsStoreValue0,
  useCommentStore,
} from "./platform-core-comments-store-3";
import {
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
  clickAwayDraftVerdict,
  commentDenyCopy,
  commentTooLong,
  commentWords,
  commentsStoreMap12,
  commentsStoreMap16,
  commentsStoreMap2,
  commentsStoreMap4,
  commentsStoreMap5,
  commentsStoreMap6,
  commentsStoreSet13,
  commentsStoreSet4,
  commentsStoreSet5,
  commentsStoreValues2,
  composingOverSelection,
  editInProgress,
  editRefusalLeavesBoxOpen,
  focusMoveLosesEdit,
  getCommentsStoreValue,
  getCommentsStoreValue2,
  heldThreads,
  hiddenResolvedThread,
  isCommentRefusal,
  isCommentsStoreReplies,
  isCommentsStoreReplies2,
  isCommentsStoreResolved,
  isSelbarDraft,
  isTmpId,
  joinPageThreads,
  landedSummon,
  mintedThreadId,
  nothingToSee,
  openThreadCountOf,
  otherEditorDirty,
  outboxRowsAreDurable,
  parkedSummons,
  quietCarrierThreads,
  quietCarrierWritten,
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
  updateCommentsStoreByPage,
  useAllThreadsJoined,
  useOpenThreadCount,
  useThreads,
  useThreadsJoined,
} from "./platform-core-comments-store-4";

function updateCommentsStoreRef(
  updateCommentsStoreRef2?: Dynamic,
  entry?: Dynamic,
  ..._extraArguments: unknown[]
) {
  switch (entry.kind) {
    case `index`: {
      let storeEntry: Dynamic = updateCommentsStoreRef2.store.get(
        updateCommentsStoreRef2.refIndexAtom,
      );
      let lookup: Dynamic = new (Map as Dynamic)();
      for (let {
        ref: updateCommentsStoreRefResult,
        engine: engine,
        parent: updateCommentsStoreRefResult2,
      } of entry.refs as Dynamic) {
        let parent: Dynamic = isRootRef(updateCommentsStoreRefResult)
          ? undefined
          : resolveDataOperationEngineValue26(updateCommentsStoreRefResult2);
        lookup.set(updateCommentsStoreRefResult, {
          engine: engine,
          ...(parent === undefined
            ? {}
            : {
                parent: parent,
              }),
        });
      }
      for (let updateCommentsStoreRefResult of storeEntry.keys() as Dynamic)
        if (!lookup.has(updateCommentsStoreRefResult)) {
          updateCommentsStoreRef2.store.set(
            updateCommentsStoreRef2.refAtom(updateCommentsStoreRefResult),
            undefined,
          );
          updateCommentsStoreRef2.refAtom.remove(updateCommentsStoreRefResult);
          updateCommentsStoreRef2.store.set(
            updateCommentsStoreRef2.bornAtom(updateCommentsStoreRefResult),
            undefined,
          );
          updateCommentsStoreRef2.bornAtom.remove(updateCommentsStoreRefResult);
          updateCommentsStoreRef2.proseDocs.delete(
            updateCommentsStoreRefResult,
          );
        }
      updateCommentsStoreRef2.store.set(
        updateCommentsStoreRef2.refIndexAtom,
        lookup,
      );
      updateCommentsStoreRef2.store.set(
        updateCommentsStoreRef2.foldSyncedAtom,
        false,
      );
      return;
    }
    case `sync`: {
      updateDataOperationEngineEngine(
        updateCommentsStoreRef2,
        entry.ref,
        entry.engine,
        foldParentOf(entry.value),
      );
      updateCommentsStoreRef2.store.set(
        updateCommentsStoreRef2.refAtom(entry.ref),
        entry.value,
      );
      if (entry.born !== undefined) {
        updateCommentsStoreRef2.store.set(
          updateCommentsStoreRef2.bornAtom(entry.ref),
          {
            ...entry.born,
            ...(entry.buildRun === undefined
              ? {}
              : {
                  buildRun: entry.buildRun,
                }),
          },
        );
      }
      let ydoc: Dynamic = entry.value?.ydoc;
      if (
        updateCommentsStoreRef2.proseDocs.has(entry.ref) &&
        typeof ydoc == `string`
      ) {
        applyUpdate(
          updateCommentsStoreRef2.proseDocs.get(entry.ref),
          resolvePlatformFrameAndCapabilitiesFrom(ydoc),
        );
      }
      return;
    }
    case `op`:
      return loadDataOperationEngineRef(updateCommentsStoreRef2, entry).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (result === `dropped` && updateCommentsStoreRef2 !== liveScope) {
            bumpDamaged(updateCommentsStoreRef2);
          }
        },
      );
    case `relay`:
      if (updateCommentsStoreRef2.proseDocs.has(entry.ref)) {
        applyUpdate(
          updateCommentsStoreRef2.proseDocs.get(entry.ref),
          resolvePlatformFrameAndCapabilitiesFrom(entry.yUpdate),
        );
      }
      return;
    case `ready`:
      updateCommentsStoreRef2.store.set(
        updateCommentsStoreRef2.foldSyncedAtom,
        true,
      );
      return;
  }
}

var commentsStoreValues: Dynamic;

var _onFoldReset: (OnFoldReset?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var commentsStoreSet: Dynamic;

var commentsStorePattern: RegExp;

function resolveCommentsStoreIndexOf(
  commentsStoreIndex?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let sourceIndex: Dynamic = commentsStoreIndex.source.indexOf(`/`);
  if (sourceIndex < 0)
    throw Error(
      `pkToken: source has no kind separator: ${JSON.stringify(commentsStoreIndex.source)}`,
    );
  let sourceSlice: Dynamic = commentsStoreIndex.source.slice(0, sourceIndex);
  let sourceSlice2: Dynamic = commentsStoreIndex.source.slice(sourceIndex + 1);
  if (!commentsStoreSet.has(sourceSlice))
    throw Error(
      `pkToken: unknown pk-source kind: ${JSON.stringify(sourceSlice)}`,
    );
  if (!commentsStorePattern.test(sourceSlice2))
    throw Error(
      `pkToken: id is not safe unescaped across pointer/fragment/attribute layers: ${JSON.stringify(sourceSlice2)}`,
    );
  if (
    !Number.isInteger(commentsStoreIndex.index) ||
    commentsStoreIndex.index < 0
  )
    throw Error(
      `pkToken: index must be a non-negative integer: ${JSON.stringify(commentsStoreIndex.index)}`,
    );
  return `${sourceSlice}:${sourceSlice2}:${commentsStoreIndex.index}`;
}

function resolveCommentsStoreSource(
  commentsStoreSource?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof commentsStoreSource != `object` ||
    !commentsStoreSource ||
    Array.isArray(commentsStoreSource)
  )
    return null;
  let commentsStoreSource2: Dynamic = commentsStoreSource;
  let component: Dynamic =
    typeof commentsStoreSource2.component == `string` &&
    commentsStoreSource2.component.length > 0
      ? commentsStoreSource2.component
      : null;
  let source: Dynamic = commentsStoreSource2.source;
  let source2: Dynamic =
    typeof source == `object` &&
    source &&
    !Array.isArray(source) &&
    typeof source.name == `string` &&
    source.name.length > 0
      ? source.name
      : null;
  let resolved: Dynamic = commentsStoreSource2.resolved;
  let resolved2: Dynamic =
    typeof resolved == `object` && resolved && !Array.isArray(resolved)
      ? resolved
      : null;
  let label =
    resolved2 !== null &&
    typeof resolved2.object == `string` &&
    resolved2.object.length > 0 &&
    typeof resolved2.id == `string` &&
    resolved2.id.length > 0
      ? `${resolved2.object}/${resolved2.id}`
      : null;
  let path: Dynamic = null;
  if (resolved2 !== null && resolved2.path !== undefined) {
    if (!resolveDataOperationEngineEvery(resolved2.path)) return null;
    path = resolved2.path;
  } else if (resolved2 !== null && resolved2.pk !== undefined) {
    if (
      resolved2.pk === null ||
      typeof resolved2.pk != `object` ||
      Array.isArray(resolved2.pk)
    )
      return null;
    let pk2: Dynamic = resolved2.pk;
    if (typeof pk2.source != `string` || !Number.isInteger(pk2.index))
      return null;
    let column: Dynamic = resolved2.column;
    if (column !== undefined && typeof column != `string`) return null;
    let resolveCommentsStoreSourceResult: Dynamic;
    try {
      resolveCommentsStoreSourceResult = resolveCommentsStoreIndexOf({
        source: pk2.source,
        index: pk2.index,
      });
    } catch {
      return null;
    }
    path =
      column === undefined
        ? [resolveCommentsStoreSourceResult]
        : [resolveCommentsStoreSourceResult, column];
  }
  let value: Dynamic = commentsStoreSource2.value;
  return {
    component: component,
    source: source2,
    path: path,
    ref: label,
    value:
      typeof value == `string` ||
      typeof value == `number` ||
      typeof value == `boolean`
        ? value
        : undefined,
  };
}

var resolveCommentsStoreSource2: Dynamic;

function resolveCommentsStoreQuote(
  commentsStoreQuote?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof commentsStoreQuote != `object` ||
    !commentsStoreQuote ||
    Array.isArray(commentsStoreQuote)
  )
    return null;
  let commentsStoreQuote2: Dynamic = commentsStoreQuote;
  return commentsStoreQuote2.kind === `quote` &&
    typeof commentsStoreQuote2.exact == `string` &&
    commentsStoreQuote2.exact.length > 0
    ? commentsStoreQuote2.exact
    : null;
}

function resolveCommentsStoreKind(
  commentsStoreKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    kind: `quote`,
    exact: commentsStoreKind.exact,
    ...(commentsStoreKind.prefix === undefined
      ? {}
      : {
          prefix: commentsStoreKind.prefix,
        }),
    ...(commentsStoreKind.suffix === undefined
      ? {}
      : {
          suffix: commentsStoreKind.suffix,
        }),
    ...(commentsStoreKind.block !== undefined &&
    commentsStoreKind.block !== null
      ? {
          block: commentsStoreKind.block,
        }
      : {}),
  };
}

function resolveCommentsStoreNode(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof entry == `object` &&
    entry &&
    entry.kind === `node` &&
    typeof entry.node == `string`
  )
    return `this widget`;
  let commentsStoreQuote: Dynamic = resolveCommentsStoreQuote(entry);
  if (commentsStoreQuote !== null) {
    let clampAnchorLabel3: Dynamic = clampAnchorLabel(
      `"${commentsStoreQuote}"`,
    );
    return clampAnchorLabel3.length > 0 ? clampAnchorLabel3 : null;
  }
  let commentsStoreSource: Dynamic = resolveCommentsStoreSource(entry);
  if (commentsStoreSource === null) return null;
  let commentsStoreSource2: Dynamic =
    resolveCommentsStoreSource2(commentsStoreSource);
  let resolveCommentsStoreNodeResult: Dynamic;
  if (commentsStoreSource.path && commentsStoreSource.path.length > 0)
    resolveCommentsStoreNodeResult =
      commentsStoreSource.value === undefined
        ? commentsStoreSource2 === null
          ? null
          : `${commentsStoreSource2}[${commentsStoreSource.path.join(`][`)}]`
        : `${commentsStoreSource.path[commentsStoreSource.path.length - 1]} = ${String(commentsStoreSource.value)}`;
  else {
    let commentsStoreDatum: Dynamic = resolveCommentsStoreDatum(entry);
    resolveCommentsStoreNodeResult =
      commentsStoreDatum === null ? commentsStoreSource2 : commentsStoreDatum;
  }
  if (resolveCommentsStoreNodeResult === null) return null;
  let clampAnchorLabel2: Dynamic = clampAnchorLabel(
    resolveCommentsStoreNodeResult,
  );
  return clampAnchorLabel2.length > 0 ? clampAnchorLabel2 : null;
}

function resolveCommentsStoreDatum(
  commentsStoreDatum?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof commentsStoreDatum != `object` || !commentsStoreDatum) return null;
  let datum: Dynamic = commentsStoreDatum.datum;
  if (typeof datum != `object` || !datum || Array.isArray(datum)) return null;
  let items: Dynamic = [];
  for (let [
    resolveCommentsStoreDatumResult,
    resolveCommentsStoreDatumResult2,
  ] of Object.entries(datum) as Dynamic) {
    if (
      typeof resolveCommentsStoreDatumResult2 == `string` ||
      typeof resolveCommentsStoreDatumResult2 == `number` ||
      typeof resolveCommentsStoreDatumResult2 == `boolean`
    )
      items.push(
        `${resolveCommentsStoreDatumResult} = ${String(resolveCommentsStoreDatumResult2)}`,
      );
    else if (resolveCommentsStoreDatumResult2 === null)
      items.push(`${resolveCommentsStoreDatumResult} = null`);
    else return null;
    if (items.length >= 8) break;
  }
  return items.length > 0 ? items.join(` · `) : null;
}

function resolveCommentsStoreSource3(
  commentsStoreSource3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    ...(commentsStoreSource3.source === undefined
      ? {}
      : {
          source: commentsStoreSource3.source,
        }),
    ...(commentsStoreSource3.resolved === undefined
      ? {}
      : {
          resolved: commentsStoreSource3.resolved,
        }),
    ...(commentsStoreSource3.value === undefined
      ? {}
      : {
          value: commentsStoreSource3.value,
        }),
    ...(commentsStoreSource3.datum === undefined
      ? {}
      : {
          datum: commentsStoreSource3.datum,
        }),
    ...(commentsStoreSource3.origin === undefined
      ? {}
      : {
          origin: commentsStoreSource3.origin,
        }),
  };
}

function resolveCommentsStoreKind2(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    kind: `node`,
    node: node,
  };
}

function resolveCommentsStoreKind3(
  commentsStoreKind3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    kind: `component`,
    component: commentsStoreKind3.component,
    ...resolveCommentsStoreSource3(commentsStoreKind3),
  };
}

var commentsStorePattern2: RegExp;

var commentsStoreValue2048: number;

var resolveCommentsStoreTrim: Dynamic;

function resolveCommentsStoreLabel(
  commentsStoreLabel?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof commentsStoreLabel != `object` ||
    !commentsStoreLabel ||
    Array.isArray(commentsStoreLabel)
  )
    return null;
  let commentsStoreLabel2: Dynamic = commentsStoreLabel;
  let chart: Dynamic = resolveCommentsStoreTrim(commentsStoreLabel2.chart);
  let title: Dynamic = resolveCommentsStoreTrim(commentsStoreLabel2.title);
  let row: Dynamic;
  if (
    commentsStoreLabel2.row !== null &&
    typeof commentsStoreLabel2.row == `object` &&
    !Array.isArray(commentsStoreLabel2.row)
  ) {
    let row2: Dynamic = commentsStoreLabel2.row;
    let label: Dynamic = resolveCommentsStoreTrim(row2.label);
    if (label !== undefined) {
      let series: Dynamic = resolveCommentsStoreTrim(row2.series);
      let color: Dynamic =
        typeof row2.color == `string` &&
        commentsStorePattern2.test(row2.color.trim())
          ? row2.color.trim()
          : undefined;
      row = {
        label: label,
        ...(series === undefined
          ? {}
          : {
              series: series,
            }),
        ...(color === undefined
          ? {}
          : {
              color: color,
            }),
      };
    }
  }
  return chart === undefined && title === undefined && row === undefined
    ? null
    : {
        ...(chart === undefined
          ? {}
          : {
              chart: chart,
            }),
        ...(title === undefined
          ? {}
          : {
              title: title,
            }),
        ...(row === undefined
          ? {}
          : {
              row: row,
            }),
      };
}

function filterCommentsStoreTargetWords(
  filterCommentsStoreTargetWords2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (filterCommentsStoreTargetWords2 == null) return null;
  if (
    typeof filterCommentsStoreTargetWords2.targetWords == `string` &&
    filterCommentsStoreTargetWords2.targetWords.length > 0
  )
    return filterCommentsStoreTargetWords2.targetWords;
  let filteredItems: Dynamic = [
    filterCommentsStoreTargetWords2.chart,
    filterCommentsStoreTargetWords2.row?.label,
    filterCommentsStoreTargetWords2.title,
  ].filter(
    (items?: unknown, ..._extraArguments: unknown[]) =>
      typeof items == `string` && items.length > 0,
  );
  return filteredItems.length > 0 ? filteredItems.join(` · `) : null;
}

function resolveCommentsStoreCharCodeAt(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length <= options) return items;
  let options2: Dynamic = options;
  let charCodeAt: Dynamic = items.charCodeAt(options2 - 1);
  if (charCodeAt >= 55296 && charCodeAt <= 56319) {
    --options2;
  }
  return items.slice(0, options2);
}

var commentsStorePattern3: RegExp;

function resolveCommentsStoreTrim2(
  commentsStoreTrim2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return commentsStoreTrim2
    .replace(commentsStorePattern3, ` `)
    .replace(/\s+/g, ` `)
    .trim();
}

function resolveCommentsStoreValue(
  commentsStoreValue?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof commentsStoreValue != `string`) return;
  let commentsStoreTrim2: Dynamic = resolveCommentsStoreTrim2(
    resolveCommentsStoreCharCodeAt(commentsStoreValue, commentsStoreValue2048),
  );
  return commentsStoreTrim2.length > 0 ? commentsStoreTrim2 : undefined;
}

function resolveCommentsStoreTrimEnd(
  commentsStoreTrimEnd?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsStoreTrim2: Dynamic =
    resolveCommentsStoreTrim2(commentsStoreTrimEnd);
  if (commentsStoreTrim2.length !== 0)
    return commentsStoreTrim2.length <= 128
      ? commentsStoreTrim2
      : `${resolveCommentsStoreCharCodeAt(commentsStoreTrim2, 127).trimEnd()}…`;
}

function resolveCommentsStoreComponent(
  request?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let filterCommentsStoreTargetWords2: Dynamic = filterCommentsStoreTargetWords(
    request.words ?? null,
  );
  if (filterCommentsStoreTargetWords2 !== null)
    return resolveCommentsStoreTrimEnd(filterCommentsStoreTargetWords2);
  if (request.roomWidget === true) {
    if (
      request.citation !== null &&
      request.citation !== undefined &&
      typeof request.citation == `object`
    ) {
      let commentsStoreNode: Dynamic = resolveCommentsStoreNode({
        component: request.segment,
        ...request.citation,
      });
      if (commentsStoreNode !== null)
        return resolveCommentsStoreTrimEnd(commentsStoreNode);
    }
    return typeof request.segment == `string` && request.segment.length > 0
      ? resolveCommentsStoreTrimEnd(request.segment)
      : options.widgetTitle === undefined
        ? undefined
        : resolveCommentsStoreTrimEnd(options.widgetTitle);
  }
  if (request.atom === true) {
    let atomKindOfQuote2: Dynamic = atomKindOfQuote(request.quote);
    return atomKindOfQuote2 === undefined
      ? `Media`
      : atomChipLabel(atomKindOfQuote2);
  }
  let commentsStoreTrimEnd: Dynamic =
    typeof request.quote == `string`
      ? resolveCommentsStoreTrimEnd(request.quote)
      : undefined;
  return request.cellIds !== undefined && request.cellIds.length > 0
    ? (commentsStoreTrimEnd ??
        `${request.cellIds.length} cell${request.cellIds.length === 1 ? `` : `s`}`)
    : commentsStoreTrimEnd;
}

function resolveCommentsStoreChart(
  commentsStoreChart?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof commentsStoreChart != `object` || !commentsStoreChart) return null;
  let commentsStoreChart2: Dynamic = commentsStoreChart;
  let component: Dynamic =
    typeof commentsStoreChart2.component == `string` &&
    editorAnchorsAndMentionsPattern2.test(commentsStoreChart2.component)
      ? commentsStoreChart2.component
      : ``;
  if (!component) return null;
  let chart: Dynamic = resolveCommentsStoreLabel({
    chart: commentsStoreChart2.chart,
  })?.chart;
  let byId: Dynamic = {};
  if (
    commentsStoreChart2.byId !== null &&
    typeof commentsStoreChart2.byId == `object` &&
    !Array.isArray(commentsStoreChart2.byId)
  ) {
    let index = 0;
    for (let [items, resolveCommentsStoreChartResult] of Object.entries(
      commentsStoreChart2.byId,
    ) as Dynamic) {
      if (index >= 256) break;
      if (items.length === 0 || items.length > 128 || !options(items)) continue;
      let commentsStoreLabel: Dynamic = resolveCommentsStoreLabel(
        resolveCommentsStoreChartResult,
      );
      if (commentsStoreLabel !== null) {
        byId[items] = commentsStoreLabel;
        index++;
      }
    }
  }
  return {
    component: component,
    ...(chart === undefined
      ? {}
      : {
          chart: chart,
        }),
    byId: byId,
  };
}

function resolveCommentsStoreValue2(
  commentsStoreValue2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof commentsStoreValue2 == `string`)
    return resolveCommentsStoreTrimEnd(
      resolveCommentsStoreCharCodeAt(
        commentsStoreValue2,
        commentsStoreValue2048,
      ),
    );
}

function resolveCommentsStoreStored(
  commentsStoreStored?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentsStoreValue2: Dynamic = resolveCommentsStoreValue2(
    commentsStoreStored.stored,
  );
  let label: Dynamic =
    commentsStoreStored.live === undefined
      ? ``
      : resolveCommentsStoreTrim2(commentsStoreStored.live);
  let commentsStoreTrimEnd: Dynamic = resolveCommentsStoreTrimEnd(label);
  if (commentsStoreTrimEnd !== undefined)
    return commentsStoreValue2 === undefined ||
      commentsStoreValue2 === commentsStoreTrimEnd ||
      commentsStoreValue2 === commentsStoreStored.element
      ? `re: ${label}`
      : `re: ${commentsStoreTrimEnd} (was: ${commentsStoreValue2})`;
  if (commentsStoreValue2 !== undefined)
    return commentsStoreStored.gone === true
      ? `was: ${commentsStoreValue2}`
      : `re: ${commentsStoreValue2}`;
}

var resolveCommentsStoreValue3: Dynamic;

var resolveCommentsStoreValue4: Dynamic;

var resolveCommentsStorePrefix: Dynamic;

var resolveCommentsStorePath: Dynamic;

var resolveCommentsStoreAnchor: Dynamic;

var resolveCommentsStoreNode2: Dynamic;

var resolveCommentsStorePath2: Dynamic;

function resolveCommentsStoreKind4(
  pageId?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (context !== undefined) {
    if (!editorAnchorsAndMentionsPattern2.test(context)) return;
    let anchor2 = {
      kind: `lfile`,
      ref: `#${context}`,
    };
    if (options === undefined)
      return {
        pageId: pageId,
        anchor: anchor2,
      };
    let commentsStoreAnchor: Dynamic = resolveCommentsStoreAnchor(options);
    if (commentsStoreAnchor !== undefined) {
      let pin: Dynamic = resolveCommentsStoreNode2(options, context);
      return {
        pageId: pageId,
        anchor: {
          kind: `lfile`,
          ref: `#${resolveEditorAnchorsAndMentionsValue8(context, commentsStoreAnchor)}`,
        },
        ...(pin === undefined
          ? {}
          : {
              pin: pin,
            }),
      };
    }
    let quote2: Dynamic = resolveCommentsStorePrefix(options);
    return quote2 !== undefined && !resolveCommentsStorePath(options)
      ? {
          pageId: pageId,
          anchor: anchor2,
          quote: quote2,
        }
      : {
          pageId: pageId,
          anchor: anchor2,
          anchorDropped: true,
          anchorWas: resolveCommentsStorePath2(options),
        };
  }
  let anchor = {
    kind: `lfile`,
    ref:
      dependencies !== undefined &&
      editorAnchorsAndMentionsPattern2.test(dependencies)
        ? `${resolvePlatformSessionAndSourcesValue8(pageId)}#${dependencies}`
        : resolvePlatformSessionAndSourcesValue8(pageId),
  };
  if (options === undefined)
    return {
      pageId: pageId,
      anchor: anchor,
    };
  let quote: Dynamic = resolveCommentsStorePrefix(options);
  if (quote !== undefined && !resolveCommentsStorePath(options))
    return {
      pageId: pageId,
      anchor: anchor,
      quote: quote,
    };
  let ids: Dynamic = isCommentsStoreCells(options);
  return ids === null
    ? {
        pageId: pageId,
        anchor: anchor,
        anchorDropped: true,
        anchorWas: resolveCommentsStorePath2(options),
      }
    : {
        pageId: pageId,
        anchor: anchor,
        cells: {
          ids: ids,
        },
      };
}

function isCommentsStoreCells(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !resolveCommentsStoreValue3(entry) ||
    (entry.kind !== undefined && entry.kind !== `cells`) ||
    (entry.kind === undefined &&
      (`quote` in entry ||
        `path` in entry ||
        `range` in entry ||
        `anchor` in entry ||
        `component` in entry))
    ? null
    : screenCellIds(entry.ids ?? entry.cells);
}

var resolveCommentsStoreHuman: (commentsStoreHuman?: Dynamic, ..._extraArguments: unknown[]) => "" | "agent:unknown" | "human";

function getCommentsStoreEmoji(
  commentsStoreEmoji?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let body: Dynamic =
    resolveCommentsStoreValue4(commentsStoreEmoji.value?.body) ?? ``;
  let reactions: Dynamic = Object.create(null);
  for (let {
    emoji: getCommentsStoreEmojiResult,
    reactor: getCommentsStoreEmojiResult2,
  } of (options.get(commentsStoreEmoji.id) ?? []) as Dynamic)
    (reactions[getCommentsStoreEmojiResult] ??= []).push(
      getCommentsStoreEmojiResult2,
    );
  return {
    id: commentsStoreEmoji.id,
    user: commentsStoreEmoji.born.actor.principal,
    actor: resolveCommentsStoreHuman(commentsStoreEmoji.born),
    at: commentsStoreEmoji.born.at,
    body: body,
    ...(commentsStoreEmoji.born.edited === true && {
      edited: true,
    }),
    ...(Object.keys(reactions).length > 0 && {
      reactions: reactions,
    }),
  };
}

function resolveCommentsStoreValue5(
  commentsStoreValue5?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let difference = 2 ** 53 - 1 - Object.keys(commentsStoreValue5).length;
  for (let [resolveCommentsStoreValue5Result, response] of Object.entries(
    commentsStoreValue5,
  ) as Dynamic) {
    if (response.status !== `pending`) continue;
    let intent: Dynamic = response.intent;
    if (intent.verb !== `create` || intent.object !== `utterance`) continue;
    let value: Dynamic = intent.payload?.value;
    if (resolveCommentsStoreValue3(value)) {
      items.push({
        id: response.minted ?? resolveCommentsStoreValue5Result,
        value: value,
        born: {
          seq: difference++,
          at: ``,
          actor: {
            principal: options ?? ``,
            channel: `human`,
          },
          container: {
            kind: `project`,
            id: ``,
          },
        },
      });
    }
  }
  return items;
}

var commentsStoreSet2: Dynamic;

function resolveCommentsStoreRun(
  commentsStoreRun?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let buildRun: Dynamic = commentsStoreRun.born.buildRun;
  if (buildRun === undefined || options === undefined) return;
  let quote: Dynamic = commentsStoreRun.value?.quote;
  let ref: Dynamic = resolveCommentsStoreValue3(quote) ? quote.ref : undefined;
  if (
    !resolveCommentsStoreValue3(ref) ||
    ref.object !== `run` ||
    ref.id !== buildRun
  )
    return;
  let total = `run/` + buildRun;
  if (context(total) === undefined) return;
  let dependencies2: Dynamic = dependencies(total);
  if (
    !(
      !resolveCommentsStoreValue3(dependencies2) ||
      dependencies2.node !== options
    )
  )
    return buildRun;
}

function updateCommentsStoreUser(
  updateCommentsStoreUser2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic =
    Object.keys(dependencies).length > 0
      ? [
          ...updateCommentsStoreUser2,
          ...resolveCommentsStoreValue5(dependencies, argument),
        ]
      : updateCommentsStoreUser2;
  let items2: Dynamic = [];
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  let resolveIdByRoot: Dynamic = new (Map as Dynamic)();
  let lookup3: Dynamic = new (Map as Dynamic)();
  for (let updateCommentsStoreUserResult of items as Dynamic) {
    let editorExtensionsMessage: Dynamic = resolveEditorExtensionsMessage(
      updateCommentsStoreUserResult.value,
    );
    let editorExtensionsAnchor2: Dynamic = resolveEditorExtensionsAnchor2(
      updateCommentsStoreUserResult.value,
    );
    if (editorExtensionsMessage === `resolve`) {
      if (editorExtensionsAnchor2?.object === `utterance`) {
        resolveIdByRoot.set(
          editorExtensionsAnchor2.id,
          updateCommentsStoreUserResult.id,
        );
        lookup3.set(editorExtensionsAnchor2.id, {
          user: updateCommentsStoreUserResult.born.actor.principal,
          actor: resolveCommentsStoreHuman(updateCommentsStoreUserResult.born),
        });
      }
      continue;
    }
    if (editorExtensionsMessage === `reaction`) {
      let emoji: Dynamic = resolveCommentsStoreValue4(
        updateCommentsStoreUserResult.value.emoji,
      );
      if (
        emoji === undefined ||
        editorExtensionsAnchor2?.object !== `utterance`
      )
        continue;
      let lookupEntry: Dynamic = lookup2.get(editorExtensionsAnchor2.id) ?? [];
      lookupEntry.push({
        emoji: emoji,
        reactor: {
          user: updateCommentsStoreUserResult.born.actor.principal,
          actor: resolveCommentsStoreHuman(updateCommentsStoreUserResult.born),
          id: updateCommentsStoreUserResult.id,
        },
      });
      lookup2.set(editorExtensionsAnchor2.id, lookupEntry);
      continue;
    }
    if (
      !(
        editorExtensionsMessage !== `message` ||
        editorExtensionsAnchor2 === undefined
      )
    ) {
      if (editorExtensionsAnchor2.object === `utterance`) {
        let lookupEntry: Dynamic = lookup.get(editorExtensionsAnchor2.id) ?? [];
        lookupEntry.push(updateCommentsStoreUserResult);
        lookup.set(editorExtensionsAnchor2.id, lookupEntry);
        continue;
      }
      if (
        commentsStoreSet2.has(editorExtensionsAnchor2.object) &&
        typeof updateCommentsStoreUserResult.value.body == `string`
      ) {
        items2.push(updateCommentsStoreUserResult);
      }
    }
  }
  let byPage: Dynamic = new (Map as Dynamic)();
  for (let updateCommentsStoreUserResult of items2 as Dynamic) {
    let editorExtensionsAnchor2: Dynamic = resolveEditorExtensionsAnchor2(
      updateCommentsStoreUserResult.value,
    );
    if (editorExtensionsAnchor2 === undefined) continue;
    let updateCommentsStoreUserResult2: Dynamic;
    let updateCommentsStoreUserResult3: Dynamic;
    let updateCommentsStoreUserResult4: Dynamic;
    if (editorExtensionsAnchor2.object === `file`)
      updateCommentsStoreUserResult2 = editorExtensionsAnchor2.id;
    else {
      let options2: Dynamic = options(`node/${editorExtensionsAnchor2.id}`);
      if (options2 === undefined) continue;
      if (options2.engine === `widget`) {
        updateCommentsStoreUserResult2 = editorExtensionsAnchor2.id;
        updateCommentsStoreUserResult3 = editorExtensionsAnchor2.id;
      } else {
        let parent2: Dynamic = options2.parent;
        if (parent2?.object !== `file`) continue;
        updateCommentsStoreUserResult2 = parent2.id;
        updateCommentsStoreUserResult4 = editorExtensionsAnchor2.id;
      }
    }
    let target: Dynamic = resolveCommentsStoreKind4(
      updateCommentsStoreUserResult2,
      editorExtensionsAnchor2.anchor,
      updateCommentsStoreUserResult3,
      updateCommentsStoreUserResult4,
    );
    if (target === undefined) continue;
    let resolved: Dynamic = resolveIdByRoot.has(
      updateCommentsStoreUserResult.id,
    );
    let buildRun: Dynamic = resolveCommentsStoreRun(
      updateCommentsStoreUserResult,
      updateCommentsStoreUserResult3,
      options,
      context,
    );
    let parent: Dynamic = updateCommentsStoreUserResult.value.parent;
    let storedLabel: Dynamic = resolveCommentsStoreValue2(
      resolveCommentsStoreValue3(parent) ? parent.label : undefined,
    );
    let record2: Dynamic = {
      id: updateCommentsStoreUserResult.id,
      target: target,
      resolved: resolved,
      ...(storedLabel !== undefined && {
        storedLabel: storedLabel,
      }),
      ...(buildRun !== undefined && {
        buildRun: buildRun,
      }),
      ...(resolved && {
        resolveId: resolveIdByRoot.get(updateCommentsStoreUserResult.id),
      }),
      ...(resolved && {
        resolvedBy: lookup3.get(updateCommentsStoreUserResult.id),
      }),
      root: getCommentsStoreEmoji(updateCommentsStoreUserResult, lookup2),
      replies: (lookup.get(updateCommentsStoreUserResult.id) ?? [])
        .filter(
          (lookupEntry?: Dynamic, ..._extraArguments: unknown[]) =>
            typeof lookupEntry.value.body == `string`,
        )
        .map(
          (
            filteredLookupEntry?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => getCommentsStoreEmoji(filteredLookupEntry, lookup2),
        ),
    };
    let byPageEntry: Dynamic = byPage.get(updateCommentsStoreUserResult2);
    if (byPageEntry) {
      byPageEntry.push(record2);
    } else {
      byPage.set(updateCommentsStoreUserResult2, [record2]);
    }
  }
  return {
    byPage: byPage,
    resolveIdByRoot: resolveIdByRoot,
  };
}

var CommentsStoreValue: Dynamic;

var commentsStoreMap: Dynamic;

var CommentsStoreState: Dynamic;

var CommentsStoreANCHORGONECARDWORDS: Dynamic;

var commentsStoreSet3: Dynamic;

var CommentsStoreState2: Dynamic;

function connectCommentFold(..._extraArguments: unknown[]): Dynamic {
  let matchesRolldownNImport = (
    connectCommentFold2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (connectCommentFold2 === undefined || options === undefined)
      return connectCommentFold2 === options;
    let connectCommentFoldKeys = Object.keys(connectCommentFold2);
    if (connectCommentFoldKeys.length !== Object.keys(options).length)
      return false;
    for (let connectCommentFoldResult of connectCommentFoldKeys as Dynamic) {
      let connectCommentFoldItem: Dynamic =
        connectCommentFold2[connectCommentFoldResult];
      let optionItem: Dynamic = options[connectCommentFoldResult];
      if (
        optionItem === undefined ||
        connectCommentFoldItem.length !== optionItem.length
      )
        return false;
      for (let index = 0; index < connectCommentFoldItem.length; index++)
        if (connectCommentFoldItem[index].id !== optionItem[index].id)
          return false;
    }
    return true;
  };
  let matchesRolldownNImport2: Dynamic = (
    activity?: Dynamic,
    activity2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    activity.id === activity2.id &&
    activity.body === activity2.body &&
    activity.edited === activity2.edited &&
    activity.actor === activity2.actor &&
    activity.user === activity2.user &&
    activity.at === activity2.at &&
    matchesRolldownNImport(activity.reactions, activity2.reactions);
  let matchesRolldownNImport3 = (
    file?: Dynamic,
    file2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      file.id !== file2.id ||
      file.resolved !== file2.resolved ||
      file.replies.length !== file2.replies.length ||
      file.resolveId !== file2.resolveId ||
      file.buildRun !== file2.buildRun ||
      !matchesRolldownNImport2(file.root, file2.root)
    )
      return false;
    for (let index = 0; index < file.replies.length; index++)
      if (!matchesRolldownNImport2(file.replies[index], file2.replies[index]))
        return false;
    return true;
  };
  let matchesRolldownNImport4 = (
    connectCommentFold2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (Object.keys(connectCommentFold2).length !== options.size) return false;
    for (let [connectCommentFoldResult, items] of options as Dynamic) {
      let connectCommentFoldItem: Dynamic =
        connectCommentFold2[connectCommentFoldResult];
      if (
        connectCommentFoldItem === undefined ||
        connectCommentFoldItem.length !== items.length
      )
        return false;
      for (let index = 0; index < items.length; index++)
        if (
          !matchesRolldownNImport3(connectCommentFoldItem[index], items[index])
        )
          return false;
    }
    return true;
  };
  let record2: Dynamic = {};
  let enabled = false;
  let setState = (
    connectCommentFold2: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (connectCommentFold2) {
      enabled = true;
    }
    if (commentsStoreValue0 > 0) return;
    let { byPage: foldStoreEntry, resolveIdByRoot: foldStoreEntry2 }: Dynamic =
      foldStore.get(CommentsStoreState);
    let useCommentStoreState: Dynamic = useCommentStore.getState();
    if (!enabled && matchesRolldownNImport4(record2, foldStoreEntry)) return;
    enabled = false;
    commentsStoreMap2.clear();
    for (let [
      connectCommentFoldResult,
      connectCommentFoldResult2,
    ] of foldStoreEntry2 as Dynamic)
      commentsStoreMap2.set(
        connectCommentFoldResult,
        connectCommentFoldResult2,
      );
    let byPage: Dynamic = {};
    let allByPage: Dynamic = {};
    let resolvedIds: Dynamic = new (Set as Dynamic)();
    for (let [
      connectCommentFoldResult,
      connectCommentFoldResult2,
    ] of foldStoreEntry as Dynamic) {
      allByPage[connectCommentFoldResult] = connectCommentFoldResult2;
      byPage[connectCommentFoldResult] = connectCommentFoldResult2.filter(
        isCommentsStoreResolved,
      );
      for (let connectCommentFoldResult3 of connectCommentFoldResult2 as Dynamic)
        if (connectCommentFoldResult3.resolved) {
          resolvedIds.add(connectCommentFoldResult3.id);
        }
    }
    for (let connectCommentFoldResult of commentsStoreSet4 as Dynamic)
      byPage[connectCommentFoldResult] ??= commentsStoreValues2;
    for (let connectCommentFoldResult of foldStore
      .get(refIndexAtom)
      .keys() as Dynamic)
      if (connectCommentFoldResult.startsWith(`utterance/`)) {
        commentsStoreSet5.add(connectCommentFoldResult.slice(10));
      }
    let record3: Dynamic = {
      ...allByPage,
    };
    for (let connectCommentFoldResult of commentsStoreMap6.keys() as Dynamic) {
      if (allByPage[connectCommentFoldResult] === undefined) continue;
      let updateDataModelSchemasOpen2: Dynamic = updateDataModelSchemasOpen(
        byPage[connectCommentFoldResult] ?? commentsStoreValues2,
        allByPage[connectCommentFoldResult],
        getCommentsStoreValue(
          connectCommentFoldResult,
          useCommentStoreState.present,
        ),
        undefined,
        getCommentsStoreValue2(
          connectCommentFoldResult,
          useCommentStoreState.present,
        ),
      );
      byPage[connectCommentFoldResult] = updateDataModelSchemasOpen2.open;
      allByPage[connectCommentFoldResult] = updateDataModelSchemasOpen2.all;
    }
    for (let connectCommentFoldResult of commentsStoreMap4.keys() as Dynamic) {
      let isCommentsStoreReplies3: Dynamic = isCommentsStoreReplies(
        connectCommentFoldResult,
        new (Set as Dynamic)(
          (byPage[connectCommentFoldResult] ?? commentsStoreValues2).map(
            (byPageItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              byPageItem.id,
          ),
        ),
      );
      commentsStoreMap5.set(
        connectCommentFoldResult,
        new (Set as Dynamic)(
          isCommentsStoreReplies3.map(
            (
              isCommentsStoreReply?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => isCommentsStoreReply.id,
          ),
        ),
      );
      if (isCommentsStoreReplies3.length !== 0) {
        byPage[connectCommentFoldResult] = [
          ...(byPage[connectCommentFoldResult] ?? commentsStoreValues2),
          ...isCommentsStoreReplies3,
        ];
        allByPage[connectCommentFoldResult] = [
          ...(allByPage[connectCommentFoldResult] ?? commentsStoreValues2),
          ...isCommentsStoreReplies3,
        ];
      }
    }
    for (let connectCommentFoldResult of new (Set as Dynamic)([
      ...[...commentsStoreMap12.values()].map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.pageId,
      ),
      ...commentsStoreMap16.values(),
    ]) as Dynamic) {
      let isCommentsStoreReplies22: Dynamic = isCommentsStoreReplies2(
        connectCommentFoldResult,
        byPage[connectCommentFoldResult] ?? commentsStoreValues2,
      );
      if (isCommentsStoreReplies22 !== null) {
        byPage[connectCommentFoldResult] = isCommentsStoreReplies22;
      }
      if (allByPage[connectCommentFoldResult] !== undefined) {
        let isCommentsStoreReplies23: Dynamic = isCommentsStoreReplies2(
          connectCommentFoldResult,
          allByPage[connectCommentFoldResult],
        );
        if (isCommentsStoreReplies23 !== null) {
          allByPage[connectCommentFoldResult] = isCommentsStoreReplies23;
        }
      }
    }
    let hiddenResolvedThread2: Dynamic = (
      connectCommentFold3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      connectCommentFold3 &&
      hiddenResolvedThread(connectCommentFold3, {
        resolvedIds: resolvedIds,
        showResolvedMarks: useCommentStoreState.showResolvedMarks,
      })
        ? null
        : connectCommentFold3;
    record2 = record3;
    useCommentStore.setState({
      byPage: byPage,
      allByPage: allByPage,
      resolvedIds: resolvedIds.size ? resolvedIds : commentsStoreSet13,
      activeId: hiddenResolvedThread2(useCommentStoreState.activeId),
      focusId: hiddenResolvedThread2(useCommentStoreState.focusId),
    });
  };
  updateCommentsStoreByPage(false);
  CommentsStoreState2 = setState;
  useCommentStore.setState({
    foldConnected: true,
  });
  setState();
  let sub: Dynamic = foldStore.sub(CommentsStoreState, setState);
  return (..._extraArguments: unknown[]): undefined => {
    sub();
    CommentsStoreState2 = null;
    updateCommentsStoreByPage(true);
    record2 = {};
    useCommentStore.setState({
      foldConnected: false,
    });
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore2Step1(): void {
  (commentsStoreValues = []);
  (_onFoldReset = (
    OnFoldReset?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => void commentsStoreValues.push(OnFoldReset));
  (commentsStoreSet = new (Set as Dynamic)([
    `run`,
    `file`,
    `blob`,
    `op`,
  ]));
  (commentsStorePattern = /^[A-Za-z0-9_-]+$/);
  (resolveCommentsStoreSource2 = (
    commentsStoreSource2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentsStoreSource2.source ?? commentsStoreSource2.component);
  (commentsStorePattern2 = /^(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]{1,32}|(?:rgb|hsl)a?\(\s*[0-9.%,\s/+-]{1,64}\)|color\(\s*[a-z0-9-]{1,24}\s+[0-9.%\s/+-]{1,64}\))$/);
  (commentsStoreValue2048 = 2048);
  (resolveCommentsStoreTrim = (
    commentsStoreTrim?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (typeof commentsStoreTrim != `string`) return;
    let trimmedClampAnchorLabel = clampAnchorLabel(
      resolveCommentsStoreCharCodeAt(commentsStoreTrim, commentsStoreValue2048),
    ).trim();
    return trimmedClampAnchorLabel.length > 0
      ? trimmedClampAnchorLabel
      : undefined;
  });
  (commentsStorePattern3 = /[\p{Cc}\u2028\u2029\u202A-\u202E\u2066-\u2069\p{Cs}]/gu);
  (resolveCommentsStoreValue3 = (
    commentsStoreValue3?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof commentsStoreValue3 == `object` &&
    !!commentsStoreValue3 &&
    !Array.isArray(commentsStoreValue3));
  (resolveCommentsStoreValue4 = (
    commentsStoreValue42?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof commentsStoreValue42 == `string` ? commentsStoreValue42 : undefined);
  (resolveCommentsStorePrefix = (
    commentsStorePrefix?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !resolveCommentsStoreValue3(commentsStorePrefix) ||
      !resolveCommentsStoreValue3(commentsStorePrefix.quote)
    )
      return;
    let exact: Dynamic = resolveCommentsStoreValue4(
      commentsStorePrefix.quote.exact,
    );
    if (!(exact === undefined || exact === ``))
      return {
        prefix:
          resolveCommentsStoreValue4(commentsStorePrefix.quote.prefix) ?? ``,
        exact: exact,
        suffix:
          resolveCommentsStoreValue4(commentsStorePrefix.quote.suffix) ?? ``,
      };
  });
  (resolveCommentsStorePath = (
    commentsStorePath?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveCommentsStoreValue3(commentsStorePath) &&
    Array.isArray(commentsStorePath.path) &&
    commentsStorePath.path.length > 0 &&
    commentsStorePath.path.every(
      (items?: unknown, ..._extraArguments: unknown[]) =>
        typeof items == `string` && items.length > 0,
    ));
  (resolveCommentsStoreAnchor = (
    commentsStoreAnchor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let safeParse: Dynamic =
      dataOperationEngineKindSchema18.safeParse(commentsStoreAnchor);
    if (!safeParse.success) return;
    let anchor: Dynamic =
      `anchor` in safeParse.data
        ? safeParse.data.anchor
        : safeParse.data.component;
    return editorAnchorsAndMentionsPattern2.test(anchor) ? anchor : undefined;
  });
  (resolveCommentsStoreNode2 = (
    commentsStoreNode2?: Dynamic,
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let safeParse: Dynamic =
      dataOperationEngineKindSchema18.safeParse(commentsStoreNode2);
    if (!(!safeParse.success || safeParse.data.kind !== `component`))
      return {
        node: node,
        component: safeParse.data.component,
        ...(safeParse.data.source === undefined
          ? {}
          : {
              source: safeParse.data.source,
            }),
        ...(safeParse.data.resolved === undefined
          ? {}
          : {
              resolved: safeParse.data.resolved,
            }),
        ...(safeParse.data.value === undefined
          ? {}
          : {
              value: safeParse.data.value,
            }),
        ...(safeParse.data.datum === undefined
          ? {}
          : {
              datum: safeParse.data.datum,
            }),
        ...(safeParse.data.origin === undefined
          ? {}
          : {
              origin: safeParse.data.origin,
            }),
      };
  });
  (resolveCommentsStorePath2 = (
    commentsStorePath2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let clampAnchorLabel2: Dynamic = (
      commentsStorePath22?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let clampAnchorLabel3 = clampAnchorLabel(commentsStorePath22);
      return clampAnchorLabel3.length > 0 ? clampAnchorLabel3 : `(unrenderable)`;
    };
    if (resolveCommentsStoreValue3(commentsStorePath2)) {
      if (
        Array.isArray(commentsStorePath2.path) &&
        commentsStorePath2.path.length > 0 &&
        commentsStorePath2.path.every(
          (path?: unknown, ..._extraArguments: unknown[]) =>
            typeof path == `string`,
        )
      )
        return clampAnchorLabel2(commentsStorePath2.path.join(`.`));
      let commentsStoreValue42: Dynamic =
        resolveCommentsStoreValue4(commentsStorePath2.anchor) ??
        resolveCommentsStoreValue4(commentsStorePath2.element);
      if (commentsStoreValue42 !== undefined)
        return clampAnchorLabel2(commentsStoreValue42);
    }
    try {
      return clampAnchorLabel2(
        JSON.stringify(commentsStorePath2) ?? `(unrenderable)`,
      );
    } catch {
      return `(unrenderable)`;
    }
  });
  (resolveCommentsStoreHuman = (
    commentsStoreHuman?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentsStoreHuman === undefined
      ? ``
      : resolvePlatformApiAndAuthHuman2(commentsStoreHuman.actor)
        ? `human`
        : `agent:unknown`);
  (commentsStoreSet2 = new (Set as Dynamic)([`file`, `node`]));
  (CommentsStoreValue = atom(
    (commentsStoreValue?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let items: Dynamic = [];
      for (let commentsStoreValueResult of commentsStoreValue(
        refIndexAtom,
      ).keys() as Dynamic) {
        if (!commentsStoreValueResult.startsWith(`utterance/`)) continue;
        let commentsStoreValue2: Dynamic = commentsStoreValue(
          refAtom(commentsStoreValueResult),
        );
        if (commentsStoreValue2 === undefined) continue;
        let born: Dynamic = commentsStoreValue(
          bornAtom(commentsStoreValueResult),
        );
        if (born !== undefined) {
          items.push({
            id: commentsStoreValueResult.slice(10),
            value: commentsStoreValue2,
            born: born,
          });
        }
      }
      items.sort(
        (
          rolldownRImport2?: Dynamic,
          rolldownRImport3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => rolldownRImport2.born.seq - rolldownRImport3.born.seq,
      );
      return items;
    },
  ));
  atom((callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    let entries: Dynamic = [];
    let head: Dynamic = 0;
    for (let localResult of callback(CommentsStoreValue) as Dynamic)
      if (
        resolveEditorExtensionsMessage(localResult.value) === `message` &&
        resolveEditorExtensionsAnchor2(localResult.value) === undefined &&
        localResult.born.container?.kind === `project`
      ) {
        if (localResult.born.seq > head) {
          head = localResult.born.seq;
        }
        entries.push({
          id: localResult.id,
          at: localResult.born.at,
          actor: localResult.born.actor,
          value: localResult.value,
          ...(localResult.born.crossActorEdit === true
            ? {
                crossActorEdit: true,
              }
            : {}),
        });
      }
    return {
      head: head,
      entries: entries,
    };
  });
  (commentsStoreMap = new (Map as Dynamic)());
  _onFoldReset(
    (..._extraArguments: unknown[]): Dynamic => commentsStoreMap.clear(),
  );
  (CommentsStoreState = atom(
    (commentsStoreState7?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let commentsStoreState8: Dynamic = commentsStoreState7(refIndexAtom);
      return updateCommentsStoreUser(
        commentsStoreState7(CommentsStoreValue),
        (commentsStoreState9?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          commentsStoreState8.get(commentsStoreState9),
        (commentsStoreState9?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          commentsStoreState7(refAtom(commentsStoreState9)),
        {},
        undefined,
      );
    },
  ));
  (CommentsStoreANCHORGONECARDWORDS = rolldownNImport({
    ANCHOR_GONE_CARD_WORDS: (..._extraArguments: unknown[]): Dynamic =>
      ANCHOR_GONE_CARD_WORDS,
    ANCHOR_GONE_WORDS: (..._extraArguments: unknown[]): Dynamic =>
      ANCHOR_GONE_WORDS,
    ASKED_ACKED_MAX_MS: (..._extraArguments: unknown[]) => ASKED_ACKED_MAX_MS,
    ASKED_ACKED_UNCONFIRMED_MS: (..._extraArguments: unknown[]) =>
      ASKED_ACKED_UNCONFIRMED_MS,
    ASKED_MAX: (..._extraArguments: unknown[]) => 64,
    ASKED_TTL_MS: (..._extraArguments: unknown[]) => ASKED_TTL_MS,
    ASKED_UNCONFIRMED_MS: (..._extraArguments: unknown[]) => ASKED_UNCONFIRMED_MS,
    CARRIER_MAX: (..._extraArguments: unknown[]) => 32,
    CARRIER_TTL_MS: (..._extraArguments: unknown[]) => CARRIER_TTL_MS,
    CELLS_UNSUPPORTED_WORDS: (..._extraArguments: unknown[]) =>
      CELLS_UNSUPPORTED_WORDS,
    COMMENT_BODY_MAX_BYTES: (..._extraArguments: unknown[]) =>
      COMMENT_BODY_MAX_BYTES,
    COMPOSE_BOX_ID: (..._extraArguments: unknown[]) => COMPOSE_BOX_ID,
    CommentQueuedError: (..._extraArguments: unknown[]): Dynamic =>
      CommentQueuedError,
    DISCARD_WATCH_MS: (..._extraArguments: unknown[]) => DISCARD_WATCH_MS,
    DRAFT_BOX_ID: (..._extraArguments: unknown[]) => DRAFT_BOX_ID,
    EDIT_BOX_PREFIX: (..._extraArguments: unknown[]) => EDIT_BOX_PREFIX,
    NOT_AUTHOR_WORDS: (..._extraArguments: unknown[]): Dynamic =>
      NOT_AUTHOR_WORDS,
    NOT_THREAD_STARTER_WORDS: (..._extraArguments: unknown[]): Dynamic =>
      NOT_THREAD_STARTER_WORDS,
    NO_PEERS: (..._extraArguments: unknown[]): Dynamic => NO_PEERS,
    PARENT_LABEL_MAX: (..._extraArguments: unknown[]) => 128,
    REACTION_NOT_REMOVED_WORDS: (..._extraArguments: unknown[]) =>
      REACTION_NOT_REMOVED_WORDS,
    SENDING_FACE_MS: (..._extraArguments: unknown[]) => SENDING_FACE_MS,
    UNCONFIRMED_EVERY_MS: (..._extraArguments: unknown[]) => UNCONFIRMED_EVERY_MS,
    UNCONFIRMED_RUNGS_MS: (..._extraArguments: unknown[]): Dynamic =>
      UNCONFIRMED_RUNGS_MS,
    UNCONFIRMED_WORDS_AFTER_MS: (..._extraArguments: unknown[]) =>
      UNCONFIRMED_WORDS_AFTER_MS,
    WITHDRAW_PENDING_MS: (..._extraArguments: unknown[]) => WITHDRAW_PENDING_MS,
    WITHDRAW_RETRY_MS: (..._extraArguments: unknown[]) => WITHDRAW_RETRY_MS,
    _focusMoveWatcher: (..._extraArguments: unknown[]): Dynamic =>
      _focusMoveWatcher,
    _outboxStoreAsk: (..._extraArguments: unknown[]) => _outboxStoreAsk,
    _unreachableRetry: (..._extraArguments: unknown[]) => _unreachableRetry,
    admitReanchor: (..._extraArguments: unknown[]): Dynamic => admitReanchor,
    cardDraftAtRisk: (..._extraArguments: unknown[]): Dynamic => cardDraftAtRisk,
    carrierBaselineOf: (..._extraArguments: unknown[]): Dynamic =>
      carrierBaselineOf,
    carrierBooked: (..._extraArguments: unknown[]): Dynamic => carrierBooked,
    carrierDelivered: (..._extraArguments: unknown[]): Dynamic =>
      carrierDelivered,
    carrierSettled: (..._extraArguments: unknown[]): Dynamic => carrierSettled,
    carriersLeft: (..._extraArguments: unknown[]): Dynamic => carriersLeft,
    clickAwayDraftVerdict: (..._extraArguments: unknown[]): Dynamic =>
      clickAwayDraftVerdict,
    commentDenyCopy: (..._extraArguments: unknown[]): Dynamic => commentDenyCopy,
    commentTooLong: (..._extraArguments: unknown[]): Dynamic => commentTooLong,
    commentWords: (..._extraArguments: unknown[]): Dynamic => commentWords,
    composingOverSelection: (..._extraArguments: unknown[]): Dynamic =>
      composingOverSelection,
    connectCommentFold: (..._extraArguments: unknown[]): Dynamic =>
      connectCommentFold,
    editInProgress: (..._extraArguments: unknown[]): Dynamic => editInProgress,
    editRefusalLeavesBoxOpen: (..._extraArguments: unknown[]): Dynamic =>
      editRefusalLeavesBoxOpen,
    focusMoveLosesEdit: (..._extraArguments: unknown[]): Dynamic =>
      focusMoveLosesEdit,
    heldThreads: (..._extraArguments: unknown[]): Dynamic => heldThreads,
    hiddenResolvedThread: (..._extraArguments: unknown[]): Dynamic =>
      hiddenResolvedThread,
    isCommentRefusal: (..._extraArguments: unknown[]): Dynamic =>
      isCommentRefusal,
    isSelbarDraft: (..._extraArguments: unknown[]): Dynamic => isSelbarDraft,
    isTmpId: (..._extraArguments: unknown[]): Dynamic => isTmpId,
    joinPageThreads: (..._extraArguments: unknown[]): Dynamic => joinPageThreads,
    landedSummon: (..._extraArguments: unknown[]): Dynamic => landedSummon,
    mintedThreadId: (..._extraArguments: unknown[]): Dynamic => mintedThreadId,
    nothingToSee: (..._extraArguments: unknown[]): Dynamic => nothingToSee,
    openThreadCountOf: (..._extraArguments: unknown[]): Dynamic =>
      openThreadCountOf,
    otherEditorDirty: (..._extraArguments: unknown[]): Dynamic =>
      otherEditorDirty,
    outboxRowsAreDurable: (..._extraArguments: unknown[]): Dynamic =>
      outboxRowsAreDurable,
    parkedSummons: (..._extraArguments: unknown[]): Dynamic => parkedSummons,
    quietCarrierThreads: (..._extraArguments: unknown[]): Dynamic =>
      quietCarrierThreads,
    quietCarrierWritten: (..._extraArguments: unknown[]): Dynamic =>
      quietCarrierWritten,
    roomCommentValue: (..._extraArguments: unknown[]): Dynamic =>
      roomCommentValue,
    rootCommentViaDoor: (..._extraArguments: unknown[]): Dynamic =>
      rootCommentViaDoor,
    setCommentRoomDoor: (..._extraArguments: unknown[]): Dynamic =>
      setCommentRoomDoor,
    settleClickAway: (..._extraArguments: unknown[]): Dynamic => settleClickAway,
    shedControlChars: (..._extraArguments: unknown[]): Dynamic =>
      shedControlChars,
    summonAgentRowAt: (..._extraArguments: unknown[]): Dynamic =>
      summonAgentRowAt,
    summonAskAcked: (..._extraArguments: unknown[]): Dynamic => summonAskAcked,
    summonAskSettled: (..._extraArguments: unknown[]): Dynamic =>
      summonAskSettled,
    summonAsked: (..._extraArguments: unknown[]): Dynamic => summonAsked,
    summonAskedThisLife: (..._extraArguments: unknown[]): Dynamic =>
      summonAskedThisLife,
    summonAsksLeft: (..._extraArguments: unknown[]): Dynamic => summonAsksLeft,
    threadClosed: (..._extraArguments: unknown[]): Dynamic => threadClosed,
    threadResolved: (..._extraArguments: unknown[]): Dynamic => threadResolved,
    unconfirmedCreateInDoc: (..._extraArguments: unknown[]): Dynamic =>
      unconfirmedCreateInDoc,
    unconfirmedReplyIn: (..._extraArguments: unknown[]): Dynamic =>
      unconfirmedReplyIn,
    useAllThreadsJoined: (..._extraArguments: unknown[]): Dynamic =>
      useAllThreadsJoined,
    useCommentStore: (..._extraArguments: unknown[]): Dynamic => useCommentStore,
    useOpenThreadCount: (..._extraArguments: unknown[]): Dynamic =>
      useOpenThreadCount,
    useThreads: (..._extraArguments: unknown[]): Dynamic => useThreads,
    useThreadsJoined: (..._extraArguments: unknown[]): Dynamic =>
      useThreadsJoined,
  }));
  (commentsStoreSet3 = new (Set as Dynamic)());
  (CommentsStoreState2 = null);
}

export {
  CommentsStoreANCHORGONECARDWORDS,
  CommentsStoreState2,
  _onFoldReset,
  commentsStoreSet3,
  commentsStoreValues,
  filterCommentsStoreTargetWords,
  resolveCommentsStoreCharCodeAt,
  resolveCommentsStoreChart,
  resolveCommentsStoreComponent,
  resolveCommentsStoreKind,
  resolveCommentsStoreKind2,
  resolveCommentsStoreKind3,
  resolveCommentsStoreLabel,
  resolveCommentsStoreNode,
  resolveCommentsStoreSource,
  resolveCommentsStoreSource2,
  resolveCommentsStoreSource3,
  resolveCommentsStoreStored,
  resolveCommentsStoreTrim2,
  resolveCommentsStoreValue,
  updateCommentsStoreRef,
  updateCommentsStoreUser,
};

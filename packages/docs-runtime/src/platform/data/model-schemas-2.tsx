/** BaoCut: data model schemas from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  create,
  jsxRuntime,
  preloadModule,
  createLiveModuleNamespace,
} from "../dependencies";
import {
  collectObservabilityTelemetryValue,
} from "../observability/telemetry-1";
import {
  lazyZod,
} from "./lazy-zod";
import {
  DataContentAndReferencesHasHeader,
} from "./content-and-references";
import {
  resolvePlatformSessionAndSourcesReduce,
} from "../services/session-and-sources-1";
import {
  resolveUiProviderAndLayersUseContext11,
} from "../ui/provider-and-layers";
import {
  DropZone_Overlay,
} from "../services/keyboard-and-save-status";
import {
  toast,
} from "../ui/toasts";
import {
  isObservabilityBrowserAndOperationEventsIncludes2,
} from "../observability/browser-and-operation-events-2";
import {
  isObservabilityBrowserAndOperationEventsRelatedTarget,
  resolveObservabilityBrowserAndOperationEventsCatch,
  resolveObservabilityBrowserAndOperationEventsFromEvent,
} from "../observability/browser-and-operation-events-4";
import {
  api,
  resolvePlatformApiAndAuthLocalhost,
  resolvePlatformApiAndAuthValue,
} from "../services/api-and-auth-1";
import {
  PlatformApiAndAuthState7,
  PlatformApiAndAuthTick,
  clearPlatformApiAndAuthDelete3,
  isPlatformApiAndAuthHandoff,
  loadPlatformApiAndAuthFiles2,
  recordActivity,
} from "../services/api-and-auth-2";
import {
  PlatformApiAndAuthAssign,
  resolvePlatformApiAndAuthKind2,
  resolvePlatformApiAndAuthUnmapped,
  resolvePlatformApiAndAuthValue18,
} from "../services/api-and-auth-3";
import {
  isPlatformApiAndAuthDropped,
  resolvePlatformApiAndAuthCall2,
  resolvePlatformApiAndAuthStructural,
} from "../services/api-and-auth-4";
import {
  referenceError,
  resolvePlatformApiAndAuthInvalidChar,
  resolvePlatformApiAndAuthMatchAll,
  resolvePlatformApiAndAuthValue28,
} from "../services/api-and-auth-5";
import {
  MUTATORS,
  _noteDep,
  _slowPaths,
  resolvePlatformApiAndAuthRawModel2,
} from "../services/api-and-auth-6";
import {
  DataModelSchemasAgentApplyEdits,
  DataModelSchemasSortRange,
  OpCutoverError,
  _recalcLinked,
  buildOpCtx,
  platformApiAndAuthSet21,
  platformApiAndAuthValue50000,
  platformApiAndAuthWeakMap,
  resolvePlatformApiAndAuthErrors,
} from "../services/api-and-auth-7";
import {
  useWorkbookStore,
} from "./model-schemas-1";
import {
  resolveDataModelSchemasRunner,
  resolveDataModelSchemasSourceProject,
} from "./model-schemas-3";

function updateDataModelSchemasUndo(
  updateDataModelSchemasUndo2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let rawModel: Dynamic = updateDataModelSchemasUndo2.rawModel;
  let opCtx: Dynamic = buildOpCtx(updateDataModelSchemasUndo2, rawModel);
  let record2: Dynamic = {
    undo: [],
    redo: [],
  };
  platformApiAndAuthWeakMap.set(updateDataModelSchemasUndo2, record2);
  let count: number = 0;
  if (
    typeof rawModel.pauseEvaluation == `function` &&
    typeof rawModel.resumeEvaluation == `function`
  ) {
    let bind: Dynamic = rawModel.pauseEvaluation.bind(rawModel);
    let bind2: Dynamic = rawModel.resumeEvaluation.bind(rawModel);
    rawModel.pauseEvaluation = (
      ...updateDataModelSchemasUndo3: Dynamic[]
    ): Dynamic => (
      (count += 1),
      (bind as Dynamic)(...updateDataModelSchemasUndo3)
    );
    rawModel.resumeEvaluation = (
      ...updateDataModelSchemasUndo3: Dynamic[]
    ): Dynamic => (
      (count = Math.max(0, count - 1)),
      (bind2 as Dynamic)(...updateDataModelSchemasUndo3)
    );
  }
  let evaluate: Dynamic = (
    updateDataModelSchemasUndo3?: Dynamic,
    options2?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let tryApply: Dynamic = updateDataModelSchemasUndo2.tryApply(
      updateDataModelSchemasUndo3,
    );
    if (tryApply.err)
      throw new (OpCutoverError as Dynamic)(
        options2,
        context,
        `apply`,
        tryApply.err[1],
      );
    if (
      count === 0 &&
      (dependencies === undefined || !_slowPaths.has(dependencies))
    ) {
      rawModel.evaluate();
    }
    return tryApply;
  };
  for (let updateDataModelSchemasUndoResult of MUTATORS as Dynamic) {
    if (typeof rawModel[updateDataModelSchemasUndoResult] != `function`)
      continue;
    let bind: Dynamic =
      rawModel[updateDataModelSchemasUndoResult].bind(rawModel);
    let hasUpdateDataModelSchemasUndoResult: Dynamic = dataModelSchemasSet.has(
      updateDataModelSchemasUndoResult,
    );
    let enabled = !dataModelSchemasSet2.has(updateDataModelSchemasUndoResult);
    rawModel[updateDataModelSchemasUndoResult] = (
      ...updateDataModelSchemasUndo3: Dynamic[]
    ): Dynamic => {
      let option: Dynamic = options.find(updateDataModelSchemasUndo2);
      if (enabled && option?.[1].readonly)
        return DataModelSchemasAgentApplyEdits[
          updateDataModelSchemasUndoResult
        ]?.(`workbook is read-only`);
      if (
        updateDataModelSchemasUndoResult === `undo` ||
        updateDataModelSchemasUndoResult === `redo`
      ) {
        let [items, setItems]: Dynamic =
          updateDataModelSchemasUndoResult === `undo`
            ? [record2.undo, record2.redo]
            : [record2.redo, record2.undo];
        if (option?.[1].room) {
          let pop2: Dynamic = items.pop();
          if (pop2 === undefined && updateDataModelSchemasUndoResult === `redo`)
            return;
          if (pop2 === undefined || pop2 === `legacy`) {
            let bind2: Dynamic = (bind as Dynamic)(
              ...updateDataModelSchemasUndo3,
            );
            if (pop2 === `legacy`) {
              setItems.push(`legacy`);
            }
            resolvePlatformApiAndAuthRawModel2(updateDataModelSchemasUndo2);
            updateDataModelSchemasUndo2._onStructureChanged?.();
            options.bump(updateDataModelSchemasUndo2);
            return bind2;
          }
          if (!pop2.length) return;
          let evaluate3: Dynamic = evaluate(
            pop2,
            updateDataModelSchemasUndoResult,
            updateDataModelSchemasUndo3,
            option[0],
          );
          setItems.push(evaluate3.inverse);
          updateDataModelSchemasRoom(
            option[0],
            option[1].room,
            pop2,
            evaluate3.inverse,
          );
          resolvePlatformApiAndAuthRawModel2(updateDataModelSchemasUndo2);
          updateDataModelSchemasUndo2._onStructureChanged?.();
          options.bump(updateDataModelSchemasUndo2);
          return;
        }
        let pop: Dynamic = items.pop();
        if (pop === `legacy` || !pop?.length) return;
        let evaluate2: Dynamic = evaluate(
          pop,
          updateDataModelSchemasUndoResult,
          updateDataModelSchemasUndo3,
          option?.[0],
        );
        setItems.push(evaluate2.inverse);
        resolvePlatformApiAndAuthRawModel2(updateDataModelSchemasUndo2);
        updateDataModelSchemasUndo2._onStructureChanged?.();
        options.bump(updateDataModelSchemasUndo2);
        return;
      }
      let platformApiAndAuthUnmapped: Dynamic =
        resolvePlatformApiAndAuthUnmapped(
          updateDataModelSchemasUndoResult,
          updateDataModelSchemasUndo3,
          opCtx,
        );
      let updateDataModelSchemasUndoResult2: Dynamic;
      if (platformApiAndAuthUnmapped === null) {
        let DataModelSchemasSortRangeItem: Dynamic = DataModelSchemasSortRange[
          updateDataModelSchemasUndoResult
        ]?.(updateDataModelSchemasUndo3);
        if (
          DataModelSchemasSortRangeItem !== undefined &&
          DataModelSchemasSortRangeItem > platformApiAndAuthValue50000
        ) {
          let label = `Not supported yet at this size (${DataModelSchemasSortRangeItem.toLocaleString()} cells — limit ${platformApiAndAuthValue50000.toLocaleString()})`;
          console.warn(
            `[workbookStore] bulk guard rejected ${updateDataModelSchemasUndoResult}`,
            DataModelSchemasSortRangeItem,
          );
          toast.error(label);
          return DataModelSchemasAgentApplyEdits[
            updateDataModelSchemasUndoResult
          ]?.(label);
        }
        if (!platformApiAndAuthSet21.has(updateDataModelSchemasUndoResult)) {
          platformApiAndAuthSet21.add(updateDataModelSchemasUndoResult);
          (option?.[1].room ? console.error : console.warn)(
            `[workbookStore] no Op mapping for ${updateDataModelSchemasUndoResult} — legacy fallback (replay gap)`,
          );
        }
        updateDataModelSchemasUndoResult2 = (bind as Dynamic)(
          ...updateDataModelSchemasUndo3,
        );
        if (option?.[1].room) {
          if (enabled) {
            record2.undo.push(`legacy`);
            record2.redo.length = 0;
          }
        } else {
          if (enabled) {
            record2.undo.length = 0;
            record2.redo.length = 0;
          }
        }
      } else if (platformApiAndAuthUnmapped.length > 0) {
        let evaluate2: Dynamic = evaluate(
          platformApiAndAuthUnmapped,
          updateDataModelSchemasUndoResult,
          updateDataModelSchemasUndo3,
          option?.[0],
        );
        if (evaluate2.inverse.length) {
          record2.undo.push(evaluate2.inverse);
        }
        if (enabled) {
          record2.redo.length = 0;
        }
        if (option?.[1].room) {
          updateDataModelSchemasRoom(
            option[0],
            option[1].room,
            platformApiAndAuthUnmapped,
            evaluate2.inverse,
          );
        }
        updateDataModelSchemasUndoResult2 = resolvePlatformApiAndAuthErrors(
          updateDataModelSchemasUndoResult,
          evaluate2.results,
          updateDataModelSchemasUndo2,
          platformApiAndAuthUnmapped,
        );
      }
      if (hasUpdateDataModelSchemasUndoResult) {
        resolvePlatformApiAndAuthRawModel2(updateDataModelSchemasUndo2);
        updateDataModelSchemasUndo2._onStructureChanged?.();
      }
      let platformApiAndAuthMatchAll: Dynamic = dataModelSchemasSet3.has(
        updateDataModelSchemasUndoResult,
      )
        ? resolvePlatformApiAndAuthMatchAll(
            resolveDataModelSchemasSetUserInput(
              updateDataModelSchemasUndoResult,
              updateDataModelSchemasUndo3,
            ),
          )
        : [];
      if (
        platformApiAndAuthMatchAll.length &&
        (loadDataModelSchemasUseContainerStore(
          option?.[0] ?? ``,
          updateDataModelSchemasUndo2,
          platformApiAndAuthMatchAll,
        ),
        option?.[1].room)
      )
        try {
          option[1].room.sendControl(
            JSON.stringify({
              t: `structureChanged`,
            }),
          );
        } catch (updateDataModelSchemasUndoResult3: Dynamic) {
          console.warn(
            `[workbookStore] structureChanged frame dropped`,
            updateDataModelSchemasUndoResult3,
          );
        }
      options.bump(updateDataModelSchemasUndo2, enabled);
      if (enabled && option) {
        options.onEdit?.(
          option[0],
          updateDataModelSchemasUndoResult,
          updateDataModelSchemasUndo3,
        );
      }
      return updateDataModelSchemasUndoResult2;
    };
  }
  for (let [updateDataModelSchemasUndoResult, items] of [
    [`canUndo`, record2.undo],
    [`canRedo`, record2.redo],
  ] as Dynamic) {
    if (typeof rawModel[updateDataModelSchemasUndoResult] != `function`)
      continue;
    let bind: Dynamic =
      rawModel[updateDataModelSchemasUndoResult].bind(rawModel);
    rawModel[updateDataModelSchemasUndoResult] = (
      ..._extraArguments: unknown[]
    ) => items.length > 0 || !!bind();
  }
}

var dataModelSchemasSet: Dynamic;

var dataModelSchemasSet2: Dynamic;

var dataModelSchemasValue1000: number;

var dataModelSchemasMap: Dynamic;

var dataModelSchemasValue_1: boolean;

var dataModelSchemasMap2: Dynamic;

var updateDataModelSchemasLocalRev: Dynamic;

var OT_ACK_TIMEOUT_MS: number;

function resolveDataModelSchemasAckTimer(
  dataModelSchemasAckTimer?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (dataModelSchemasAckTimer.ackTimer !== null) {
    clearTimeout(dataModelSchemasAckTimer.ackTimer);
    dataModelSchemasAckTimer.ackTimer = null;
  }
  dataModelSchemasAckTimer.ackGraceUsed = false;
}

function clearDataModelSchemasInflight(
  clearDataModelSchemasInflight2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let updateDataModelSchemasLocalRev2: Dynamic = updateDataModelSchemasLocalRev(
    clearDataModelSchemasInflight2,
  );
  resolveDataModelSchemasAckTimer(updateDataModelSchemasLocalRev2);
  updateDataModelSchemasLocalRev2.inflight.length = 0;
  updateDataModelSchemasLocalRev2.localRev = -1;
  dataModelSchemasMap.delete(clearDataModelSchemasInflight2);
}

function getDataModelSchemasAckTimeout(
  dataModelSchemasAckTimeout?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let updateDataModelSchemasLocalRev2: Dynamic = updateDataModelSchemasLocalRev(
    dataModelSchemasAckTimeout,
  );
  if (
    updateDataModelSchemasLocalRev2.ackTimer !== null ||
    updateDataModelSchemasLocalRev2.inflight.length === 0 ||
    updateDataModelSchemasLocalRev2.localRev < 0
  )
    return;
  let resync = (..._extraArguments: unknown[]): undefined => {
    updateDataModelSchemasLocalRev2.ackTimer = null;
    if (
      !(
        dataModelSchemasMap2.get(dataModelSchemasAckTimeout) !==
          updateDataModelSchemasLocalRev2 ||
        updateDataModelSchemasLocalRev2.inflight.length === 0
      )
    ) {
      if (!updateDataModelSchemasLocalRev2.ackGraceUsed) {
        updateDataModelSchemasLocalRev2.ackGraceUsed = true;
        updateDataModelSchemasLocalRev2.ackTimer = setTimeout(
          resync,
          OT_ACK_TIMEOUT_MS,
        );
        return;
      }
      console.warn(
        `[workbookStore] no OT ack in ${2 * OT_ACK_TIMEOUT_MS}ms — cycling room`,
        dataModelSchemasAckTimeout,
      );
      updateDataModelSchemasLocalRev2.resync?.(`ack timeout`);
    }
  };
  updateDataModelSchemasLocalRev2.ackTimer = setTimeout(
    resync,
    OT_ACK_TIMEOUT_MS,
  );
}

function _otOnReconnect(
  OtOnReconnect?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let dataModelSchemasMap2Entry: Dynamic =
    dataModelSchemasMap2.get(OtOnReconnect);
  return !dataModelSchemasMap2Entry ||
    dataModelSchemasMap2Entry.inflight.length === 0
    ? false
    : (clearDataModelSchemasInflight(OtOnReconnect), true);
}

function _ackIndex(
  AckIndex?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options.from === undefined ||
    !options.clientTag ||
    !(typeof context == `string`
      ? options.from === context
      : (context?.has(options.from) ?? false))
    ? -1
    : AckIndex.findIndex(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
          rolldownNImport2.clientTag === options.clientTag,
      );
}

function isDataModelSchemasArgs(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (items === items2) return true;
  if (items.length !== items2.length) return false;
  let isDataModelSchemasArgsHandler: Dynamic = (
    dataModelSchemasArgs?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    JSON.stringify(
      dataModelSchemasArgs,
      (
        dataModelSchemasArgs2?: Dynamic,
        items3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        dataModelSchemasArgs2 === `args` &&
        Array.isArray(items3) &&
        items3.length === 0
          ? undefined
          : items3,
    );
  return (
    isDataModelSchemasArgsHandler(items) ===
    isDataModelSchemasArgsHandler(items2)
  );
}

function filterDataModelSchemasFilter(
  filterDataModelSchemasFilter5?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0 || !resolvePlatformApiAndAuthStructural(items))
    return filterDataModelSchemasFilter5;
  try {
    return resolvePlatformApiAndAuthValue18()
      .transformOps(filterDataModelSchemasFilter5, items)
      .filter(isPlatformApiAndAuthDropped);
  } catch (filterDataModelSchemasFilterResult: Dynamic) {
    console.warn(
      `[workbookStore] transformOps unavailable — identity`,
      filterDataModelSchemasFilterResult,
    );
    return filterDataModelSchemasFilter5;
  }
}

function resolveDataModelSchemasAlgo(
  dataModelSchemasAlgo?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let platformApiAndAuthCall2 = resolvePlatformApiAndAuthCall2(options);
  if (
    platformApiAndAuthCall2 === `Algo` ||
    platformApiAndAuthCall2 === `Barrier`
  ) {
    dataModelSchemasAlgo.undo.length = 0;
    dataModelSchemasAlgo.redo.length = 0;
    return;
  }
  if (platformApiAndAuthCall2 !== `Structural`) return;
  let items: Dynamic = [options];
  for (let items2 of [
    dataModelSchemasAlgo.undo,
    dataModelSchemasAlgo.redo,
  ] as Dynamic) {
    let index = 0;
    for (let items3 of items2 as Dynamic) {
      if (items3 === `legacy`) {
        items2[index++] = items3;
        continue;
      }
      let filterDataModelSchemasFilter5: Dynamic = filterDataModelSchemasFilter(
        items3,
        items,
      );
      if (filterDataModelSchemasFilter5.length === items3.length) {
        items2[index++] = filterDataModelSchemasFilter5;
      }
    }
    items2.length = index;
  }
}

var dataModelSchemasValue100: number;

function resolveDataModelSchemasCompactOps(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length > dataModelSchemasValue100)
    try {
      return resolvePlatformApiAndAuthValue18().compactOps(items);
    } catch (resolveDataModelSchemasCompactOpsResult: Dynamic) {
      console.warn(
        `[workbookStore] wasm compactOps unavailable, using TS mirror`,
        resolveDataModelSchemasCompactOpsResult,
      );
    }
  return resolvePlatformApiAndAuthKind2(items);
}

var dataModelSchemasValue0: number;

function clearDataModelSchemasOps(..._extraArguments: unknown[]): undefined {
  dataModelSchemasValue_1 = false;
  let items: Dynamic = [];
  for (let [
    clearDataModelSchemasOpsResult,
    clearDataModelSchemasOpsResult2,
  ] of dataModelSchemasMap as Dynamic) {
    if (
      clearDataModelSchemasOpsResult2.room.state &&
      clearDataModelSchemasOpsResult2.room.state() !== `open`
    )
      continue;
    try {
      clearDataModelSchemasOpsResult2.room.flushDiffs?.();
    } catch (clearDataModelSchemasOpsResult3: Dynamic) {
      console.warn(
        `[workbookStore] pre-opApply diff flush failed`,
        clearDataModelSchemasOpsResult,
        clearDataModelSchemasOpsResult3,
      );
    }
    let updateDataModelSchemasLocalRev2: Dynamic =
      updateDataModelSchemasLocalRev(clearDataModelSchemasOpsResult);
    let ops: Dynamic = resolveDataModelSchemasCompactOps(
      clearDataModelSchemasOpsResult2.ops,
    );
    let items2: Dynamic =
      ops.length > dataModelSchemasValue1000 &&
      clearDataModelSchemasOpsResult2.inverse.length ===
        clearDataModelSchemasOpsResult2.ops.length &&
      !resolvePlatformApiAndAuthStructural(clearDataModelSchemasOpsResult2.ops)
        ? ((..._extraArguments: unknown[]): Dynamic => {
            let items3: Dynamic = [];
            let opsCount: Dynamic = clearDataModelSchemasOpsResult2.ops.length;
            for (
              let count: number = 0;
              count < opsCount;
              count += dataModelSchemasValue1000
            ) {
              let min = Math.min(count + dataModelSchemasValue1000, opsCount);
              items3.push({
                ops: resolveDataModelSchemasCompactOps(
                  clearDataModelSchemasOpsResult2.ops.slice(count, min),
                ),
                inverse: clearDataModelSchemasOpsResult2.inverse.slice(
                  opsCount - min,
                  opsCount - count,
                ),
              });
            }
            return items3;
          })()
        : [
            {
              ops: ops,
              inverse: clearDataModelSchemasOpsResult2.inverse,
            },
          ];
    if (items2.length > 1) {
      console.warn(
        `[workbookStore] op batch chunked (cap ${dataModelSchemasValue1000}) ${clearDataModelSchemasOpsResult} raw=${clearDataModelSchemasOpsResult2.ops.length} chunks=${items2.length}`,
      );
    }
    for (let clearDataModelSchemasOpsResult3 of items2 as Dynamic) {
      let clientTag = `ct${dataModelSchemasValue0++}`;
      updateDataModelSchemasLocalRev2.inflight.push({
        clientTag: clientTag,
        ops: clearDataModelSchemasOpsResult3.ops,
        inverse: clearDataModelSchemasOpsResult3.inverse,
      });
      try {
        clearDataModelSchemasOpsResult2.room.sendControl(
          JSON.stringify({
            t: `opApply`,
            baseRev: clearDataModelSchemasOpsResult2.baseRev,
            clientTag: clientTag,
            ops: clearDataModelSchemasOpsResult3.ops,
          }),
        );
      } catch (clearDataModelSchemasOpsResult4: Dynamic) {
        console.warn(
          `[workbookStore] primary op frame dropped`,
          clearDataModelSchemasOpsResult,
          clearDataModelSchemasOpsResult4,
        );
        updateDataModelSchemasLocalRev2.inflight.pop();
      }
    }
    getDataModelSchemasAckTimeout(clearDataModelSchemasOpsResult);
    items.push(clearDataModelSchemasOpsResult);
  }
  for (let clearDataModelSchemasOpsResult of items as Dynamic)
    dataModelSchemasMap.delete(clearDataModelSchemasOpsResult);
}

function updateDataModelSchemasRoom(
  updateDataModelSchemasRoom2?: Dynamic,
  room?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let dataModelSchemasMapEntry: Dynamic = dataModelSchemasMap.get(
    updateDataModelSchemasRoom2,
  );
  let baseRev: Dynamic = updateDataModelSchemasLocalRev(
    updateDataModelSchemasRoom2,
  ).localRev;
  if (
    dataModelSchemasMapEntry &&
    dataModelSchemasMapEntry.baseRev !== baseRev
  ) {
    clearDataModelSchemasOps();
    dataModelSchemasMapEntry = dataModelSchemasMap.get(
      updateDataModelSchemasRoom2,
    );
  }
  if (dataModelSchemasMapEntry) {
    (dataModelSchemasMapEntry.ops.push as Dynamic)(...context);
    (dataModelSchemasMapEntry.inverse.unshift as Dynamic)(...dependencies);
  } else {
    dataModelSchemasMap.set(updateDataModelSchemasRoom2, {
      room: room,
      ops: [...context],
      inverse: [...dependencies],
      baseRev: baseRev,
    });
  }
  if (!dataModelSchemasValue_1) {
    dataModelSchemasValue_1 = true;
    queueMicrotask(clearDataModelSchemasOps);
  }
}

var dataModelSchemasSet3: Dynamic;

var resolveDataModelSchemasSetUserInput: Dynamic;

function loadDataModelSchemasUseContainerStore(
  dataModelSchemasUseContainerStore?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  options._onStructureChanged?.();
  (async (..._extraArguments: unknown[]): Promise<undefined> => {
    try {
      let { useContainerStore: preloadTImport2 }: Dynamic =
        await preloadModule(
          async (..._extraArguments: unknown[]): Promise<Dynamic> => {
            let { useContainerStore: useContainerStore2 }: Dynamic =
              await Promise.resolve().then(
                (..._extraArguments: unknown[]): Dynamic =>
                  DataModelSchemasParseLineParam,
              );
            return {
              useContainerStore: useContainerStore2,
            };
          },
          undefined,
          import.meta.url,
        );
      let activeDir: Dynamic = preloadTImport2.getState().activeDir();
      let useWorkbookStoreState: Dynamic = useWorkbookStore.getState();
      let items: Dynamic = [];
      for (let loadDataModelSchemasUseContainerStoreResult of new (Set as Dynamic)(
        context,
      ) as Dynamic) {
        let platformApiAndAuthInvalidChar: Dynamic =
          resolvePlatformApiAndAuthInvalidChar(
            loadDataModelSchemasUseContainerStoreResult,
            dataModelSchemasUseContainerStore,
            activeDir,
          );
        if (!resolvePlatformApiAndAuthValue28(platformApiAndAuthInvalidChar)) {
          _noteDep(
            dataModelSchemasUseContainerStore,
            platformApiAndAuthInvalidChar,
          );
          if (!useWorkbookStoreState.byPath[platformApiAndAuthInvalidChar]) {
            items.push(platformApiAndAuthInvalidChar);
          }
        }
      }
      if (!items.length) return;
      await Promise.all(
        items.map(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            useWorkbookStoreState
              .load(item)
              .catch((..._extraArguments: unknown[]): undefined => {}),
        ),
      );
      _recalcLinked(
        dataModelSchemasUseContainerStore,
        (
          dataModelSchemasUseContainerStore2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          useWorkbookStore.getState().byPath[dataModelSchemasUseContainerStore2]
            ?.wb,
      );
      useWorkbookStore.setState(
        (
          dataModelSchemasUseContainerStore2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          rev: dataModelSchemasUseContainerStore2.rev + 1,
        }),
      );
    } catch {}
  })();
}

var DataModelSchemasParseLineParam: Dynamic;

function parseTarget(target?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let record2 = {
    version: ``,
    diffMode: false,
    base: ``,
    proposal: ``,
  };
  if (
    target === `.` ||
    target === `..` ||
    isObservabilityBrowserAndOperationEventsIncludes2(target.replace(/^\./, ``))
  )
    return record2;
  if (target.startsWith(`.`))
    return {
      version: ``,
      diffMode: false,
      base: ``,
      proposal: target.slice(1),
    };
  if (target.startsWith(`@tab:`))
    return {
      version: ``,
      diffMode: false,
      base: ``,
      proposal: ``,
    };
  let match: Dynamic = target.match(/^(.+?)\.\.\.(.+)$/);
  return match
    ? isObservabilityBrowserAndOperationEventsIncludes2(match[1]) ||
      isObservabilityBrowserAndOperationEventsIncludes2(match[2])
      ? record2
      : {
          version: match[2] === `main` ? `` : match[2],
          diffMode: true,
          base: match[1] === `main` ? `` : match[1],
          proposal: ``,
        }
    : {
        version: target === `main` ? `` : target,
        diffMode: false,
        base: ``,
        proposal: ``,
      };
}

var getDataModelSchemasTarget: Dynamic;

function parseLineParam(lineParam?: Dynamic, ..._extraArguments: unknown[]) {
  let queryEntry = new URLSearchParams(lineParam).get(`version`) ?? ``;
  return queryEntry === `main` ? `` : queryEntry;
}

var resolveDataModelSchemasSearch: Dynamic;

var getDataModelSchemasDiffView: (..._extraArguments: unknown[]) => "split" | "unified";

var updateDataModelSchemasMain: (updateDataModelSchemasMain2?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var updateDataModelSchemasVersion: (updateDataModelSchemasVersion2?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var updateDataModelSchemasUnified: (updateDataModelSchemasUnified2?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var DataModelSchemasState: Dynamic;

var useContainerStore: Dynamic;

var DataModelSchemasBULKATTACHTHRESHOLD: Dynamic;

var RASTER_IMAGE: Dynamic;

var uploadFiles: Dynamic;

async function ingestFiles(
  items?: Dynamic,
  dest?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!items.length) return [];
  let activeDir: Dynamic = useContainerStore.getState().activeDir();
  if (!activeDir) {
    toast.error(`Open a project to upload`);
    return [];
  }
  let now = Date.now();
  let mappedItems: Dynamic = items.map(
    (
      file?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let replace: Dynamic = file.path?.replace(/^\.?\//, ``) ?? file.name;
      let normalizedReplace: Dynamic = (
        file.name.split(`.`).pop() ||
        file.type.split(`/`)[1] ||
        `bin`
      )
        .replace(/[^a-z0-9]/gi, ``)
        .toLowerCase();
      return {
        path:
          !replace || replace === `image.png`
            ? `pasted-${now}-${index}.${normalizedReplace}`
            : replace,
        file: file,
      };
    },
  );
  let loading: Dynamic = toast.loading(
    `Uploading ${mappedItems.length} file${mappedItems.length > 1 ? `s` : ``}…`,
  );
  try {
    let { written: files, entries: uploadFiles2 }: Dynamic = await uploadFiles(
      activeDir,
      mappedItems.map(
        (mappedItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          path: mappedItem.path,
          file: mappedItem.file,
        }),
      ),
      undefined,
      {
        noNudge: true,
        dest: dest,
      },
    );
    useContainerStore.getState().setEntries(uploadFiles2);
    recordActivity(`upload`, {
      files: files,
    });
    let items2: Dynamic = [...files];
    let label = `${dest || `uploads`}/`;
    let replace: Dynamic = (
      ingestFiles2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (ingestFiles2.startsWith(label)
        ? ingestFiles2.slice(label.length)
        : ingestFiles2
      ).replace(/ \(\d+\)(\.[^.]+)?$/, `$1`);
    let indexOf: Dynamic = (
      ingestFiles2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let itemIndex: Dynamic = items2.indexOf(`${label}${ingestFiles2}`);
      if (itemIndex < 0) {
        itemIndex = items2.findIndex(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            replace(item) === ingestFiles2,
        );
      }
      return itemIndex >= 0 ? items2.splice(itemIndex, 1)[0] : undefined;
    };
    let addAttachment: Dynamic =
      PlatformApiAndAuthAssign.getState().addAttachment;
    for (let ingestFilesResult of mappedItems as Dynamic) {
      let path: Dynamic = indexOf(ingestFilesResult.path);
      if (path) {
        addAttachment({
          name: ingestFilesResult.file.name || ingestFilesResult.path,
          mediaType: ingestFilesResult.file.type,
          path: path,
        });
      }
    }
    toast.success(`Added ${files.length} item${files.length > 1 ? `s` : ``}`, {
      id: loading,
    });
    return files;
  } catch (ingestFilesResult: Dynamic) {
    toast.error(String(ingestFilesResult), {
      id: loading,
    });
    return [];
  }
}

var resolveDataModelSchemasFiles: Dynamic;

var resolveDataModelSchemasLeft: Dynamic;

var DataModelSchemasDragging: Dynamic;

function useDataModelSchemasDragging(..._extraArguments: unknown[]): Dynamic {
  let [dragging, setDragging]: Dynamic = (0, React.useState)(false);
  let setDragging2 = (
    dragging2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    setDragging(dragging2);
    DataModelSchemasDragging.setState({
      dragging: dragging2,
    });
  };
  let countRef: Dynamic = (0, React.useRef)(0);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let endHover = (..._extraArguments: unknown[]): undefined => {
    if (enabledRef.current) {
      enabledRef.current = false;
      DataModelSchemasDragging.getState().intercept?.onHoverEnd?.();
    }
  };
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let setDragging3 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (resolveDataModelSchemasFiles(event)) {
        event.preventDefault();
        countRef.current = Date.now();
        resolveObservabilityBrowserAndOperationEventsCatch();
        setDragging2(true);
      }
    };
    let onHover = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!resolveDataModelSchemasFiles(event)) return;
      event.preventDefault();
      countRef.current = Date.now();
      let DataModelSchemasDraggingState: Dynamic =
        DataModelSchemasDragging.getState();
      let { clientX: clientX, clientY: clientY }: Dynamic = event;
      let chatIntercept: Dynamic = DataModelSchemasDraggingState.chatIntercept;
      if (
        chatIntercept &&
        resolveDataModelSchemasLeft(chatIntercept, clientX, clientY)
      ) {
        endHover();
        chatIntercept.onHover?.({
          clientX: clientX,
          clientY: clientY,
        });
      } else {
        chatIntercept?.onHoverEnd?.();
        let intercept: Dynamic = DataModelSchemasDraggingState.intercept;
        if (intercept?.onHover) {
          if (resolveDataModelSchemasLeft(intercept, clientX, clientY)) {
            enabledRef.current = true;
            intercept.onHover({
              clientX: clientX,
              clientY: clientY,
            });
          } else {
            endHover();
          }
        }
      }
    };
    let onHoverEnd = (
      dataModelSchemasDragging?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          !resolveDataModelSchemasFiles(dataModelSchemasDragging) ||
          dataModelSchemasDragging.relatedTarget
        )
      ) {
        if (
          dataModelSchemasDragging.clientX <= 0 ||
          dataModelSchemasDragging.clientY <= 0 ||
          dataModelSchemasDragging.clientX >= window.innerWidth ||
          dataModelSchemasDragging.clientY >= window.innerHeight
        ) {
          endHover();
          DataModelSchemasDragging.getState().chatIntercept?.onHoverEnd?.();
          setDragging2(false);
        }
      }
    };
    let setDragging4 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (resolveDataModelSchemasFiles(event)) {
        event.preventDefault();
      }
      endHover();
      setDragging2(false);
    };
    let setDragging5 = (
      dataModelSchemasDragging?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (dataModelSchemasDragging.data?.type === `bongo:dragenter`) {
        resolveObservabilityBrowserAndOperationEventsCatch();
        setDragging2(true);
      }
    };
    window.addEventListener(`message`, setDragging5);
    window.addEventListener(`dragenter`, setDragging3);
    window.addEventListener(`dragover`, onHover);
    window.addEventListener(`dragleave`, onHoverEnd);
    window.addEventListener(`drop`, setDragging4);
    return (..._extraArguments: unknown[]): undefined => {
      window.removeEventListener(`message`, setDragging5);
      window.removeEventListener(`dragenter`, setDragging3);
      window.removeEventListener(`dragover`, onHover);
      window.removeEventListener(`dragleave`, onHoverEnd);
      window.removeEventListener(`drop`, setDragging4);
      DataModelSchemasDragging.setState({
        dragging: false,
      });
    };
  }, []);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!dragging) return;
      let now = Date.now();
      let onHoverEnd = (..._extraArguments: unknown[]): undefined => {
        endHover();
        DataModelSchemasDragging.getState().chatIntercept?.onHoverEnd?.();
        setDragging2(false);
      };
      let getState = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.key === `Escape`) {
          if (
            Math.max(
              countRef.current,
              DataModelSchemasDragging.getState().lastIframeEnter,
            ) >=
            now - 1e3
          ) {
            event.preventDefault();
          }
          onHoverEnd();
        }
      };
      let getState2 = (..._extraArguments: unknown[]): undefined => {
        let max = Math.max(
          countRef.current,
          DataModelSchemasDragging.getState().lastIframeEnter,
        );
        if (Date.now() - max > 250) {
          onHoverEnd();
        }
      };
      window.addEventListener(`mousemove`, getState2);
      window.addEventListener(`dragend`, onHoverEnd);
      window.addEventListener(`keydown`, getState);
      return (..._extraArguments: unknown[]): undefined => {
        window.removeEventListener(`mousemove`, getState2);
        window.removeEventListener(`dragend`, onHoverEnd);
        window.removeEventListener(`keydown`, getState);
      };
    },
    [dragging],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      DataModelSchemasDragging.subscribe(
        (
          dataModelSchemasDragging?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => setDragging(dataModelSchemasDragging.dragging),
      ),
    [],
  );
  return {
    dragging: dragging,
    setDragging: setDragging2,
    endHover: endHover,
  };
}

function DataModelSchemasLabel(
  { label: label, onDrop: onDrop, transparent = false, bare = false }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  return (
    <div
      data-over={enabledState || undefined}
      onDragEnter={(..._extraArguments: unknown[]): Dynamic =>
        setEnabledState(true)
      }
      onDragOver={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        event.preventDefault()
      }
      onDragLeave={(
        dataModelSchemasLabel?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          isObservabilityBrowserAndOperationEventsRelatedTarget(
            dataModelSchemasLabel,
          )
        ) {
          setEnabledState(false);
        }
      }}
      onDrop={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        event.preventDefault();
        event.stopPropagation();
        setEnabledState(false);
        onDrop(event);
      }}
      className={
        bare
          ? `relative flex flex-1`
          : `group border-strong data-[over]:border-accent relative flex flex-1 items-center justify-center rounded-lg border-2 border-dashed transition-colors ${transparent ? `bg-transparent` : `bg-surface-popover data-[over]:bg-surface-popover backdrop-blur-[2px]`}`
      }
    >
      {!bare && (
        <span
          className={`bg-fill-primary text-on-primary group-data-[over]:bg-fill-accent group-data-[over]:text-on-accent pointer-events-none rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${transparent ? `absolute top-4 right-4` : ``}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function DataModelSchemasDragging2(..._extraArguments: unknown[]) {
  let transparent: Dynamic = DataModelSchemasDragging(
    (dataModelSchemasDragging2?: Dynamic, ..._extraArguments: unknown[]) =>
      dataModelSchemasDragging2.intercept != null ||
      dataModelSchemasDragging2.chatIntercept != null,
  );
  let bare: Dynamic = DataModelSchemasDragging(
    (dataModelSchemasDragging2?: Dynamic, ..._extraArguments: unknown[]) =>
      dataModelSchemasDragging2.intercept != null,
  );
  let {
    dragging: live,
    setDragging: useDataModelSchemasDragging2,
    endHover: useDataModelSchemasDragging3,
  }: Dynamic = useDataModelSchemasDragging();
  let onDrop = async (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    let DataModelSchemasDraggingState: Dynamic =
      DataModelSchemasDragging.getState();
    let { clientX: clientX, clientY: clientY }: Dynamic = event;
    let chatIntercept: Dynamic =
      DataModelSchemasDraggingState.chatIntercept &&
      resolveDataModelSchemasLeft(
        DataModelSchemasDraggingState.chatIntercept,
        clientX,
        clientY,
      )
        ? DataModelSchemasDraggingState.chatIntercept
        : DataModelSchemasDraggingState.intercept &&
            resolveDataModelSchemasLeft(
              DataModelSchemasDraggingState.intercept,
              clientX,
              clientY,
            )
          ? DataModelSchemasDraggingState.intercept
          : null;
    if (!chatIntercept) {
      let matchesIntercept = DataModelSchemasDraggingState.intercept != null;
      let matchesChatIntercept =
        DataModelSchemasDraggingState.chatIntercept != null;
      toast(
        matchesIntercept && matchesChatIntercept
          ? `Drop over the document, or over the chat input to attach — nothing was uploaded.`
          : matchesChatIntercept
            ? `Drop over the chat input to attach an image — nothing was uploaded.`
            : `Drop over the document to add files — nothing was uploaded.`,
      );
      return;
    }
    let observabilityBrowserAndOperationEventsFromEvent: Dynamic =
      await resolveObservabilityBrowserAndOperationEventsFromEvent(
        event.nativeEvent,
      );
    if (observabilityBrowserAndOperationEventsFromEvent.length === 0) {
      toast(`Couldn't read the dropped files — nothing was uploaded.`);
      return;
    }
    chatIntercept.onDrop(observabilityBrowserAndOperationEventsFromEvent, {
      clientX: clientX,
      clientY: clientY,
    });
  };
  return (
    <jsxRuntime.Fragment>
      <DocDropRing live={live} />
      {live && (
        <div
          onDragOver={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => event.preventDefault()}
          className={`fixed inset-2 z-50 flex`}
        >
          <DataModelSchemasLabel
            label={transparent ? `Drop to upload` : `Drop into a document`}
            transparent={transparent}
            bare={bare}
            onDrop={(
              dataModelSchemasDragging2?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              useDataModelSchemasDragging2(false);
              useDataModelSchemasDragging3();
              DataModelSchemasDragging.getState().chatIntercept?.onHoverEnd?.();
              onDrop(dataModelSchemasDragging2);
            }}
          />
        </div>
      )}
    </jsxRuntime.Fragment>
  );
}

function DocDropRing({ live: live }: Dynamic, ..._extraArguments: unknown[]) {
  let zIndex: Dynamic = resolveUiProviderAndLayersUseContext11(51);
  let left: Dynamic = DataModelSchemasDragging(
    (docDropRing?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      docDropRing.intercept?.rect.left,
  );
  let top: Dynamic = DataModelSchemasDragging(
    (docDropRing?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      docDropRing.intercept?.rect.top,
  );
  let width: Dynamic = DataModelSchemasDragging(
    (docDropRing?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      docDropRing.intercept?.rect.width,
  );
  let height: Dynamic = DataModelSchemasDragging(
    (docDropRing?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      docDropRing.intercept?.rect.height,
  );
  return left === undefined ? null : (
    <div
      data-testid={`doc-drop-ring`}
      className={`pointer-events-none fixed`}
      style={{
        left: left,
        top: top,
        width: width,
        height: height,
        zIndex: zIndex,
      }}
    >
      <DropZone_Overlay dragState={live ? `on-target` : `idle`} />
    </div>
  );
}

var DataModelSchemasUrl: {
    url: string;
    sri: string;
};

var dataModelSchemasFnRunDbFeedValues: string[];

var resolveDataModelSchemasIncludes: Dynamic;

var dataModelSchemasPattern: RegExp;

var dataModelSchemasPattern2: RegExp;

var dataModelSchemasPattern3: RegExp;

var dataModelSchemasPattern4: RegExp;

var dataModelSchemasPattern5: RegExp;

var dataModelSchemasPattern6: RegExp;

function resolveDataModelSchemasKind(
  dataModelSchemasKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataModelSchemasKind === undefined || dataModelSchemasKind === `live`)
    return {
      kind: `live`,
    };
  if (dataModelSchemasKind.startsWith(`pin:`)) {
    let label: Dynamic = dataModelSchemasKind.slice(4);
    return label
      ? {
          kind: `label`,
          label: label,
        }
      : referenceError(`empty pin label`);
  }
  return dataModelSchemasPattern2.test(dataModelSchemasKind)
    ? {
        kind: `sha`,
        sha: dataModelSchemasKind.toLowerCase(),
      }
    : referenceError(`bad pin "@${dataModelSchemasKind}"`);
}

function isDataModelSchemasPath(
  path?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (path.startsWith(`routine:`) || path.startsWith(`fn:`)) {
    let name: Dynamic = path.slice(path.indexOf(`:`) + 1);
    return dataModelSchemasPattern3.test(name)
      ? {
          path: ``,
          sel: {
            kind: `fn`,
            name: name,
            key: options || undefined,
          },
        }
      : referenceError(`bad fn name`);
  }
  if (path.startsWith(`run:`)) {
    let pathSlice: Dynamic = path.slice(4);
    return dataModelSchemasPattern4.test(pathSlice)
      ? {
          path: ``,
          sel: {
            kind: `run`,
            id: pathSlice,
            ptr: options || undefined,
          },
        }
      : referenceError(`bad run id`);
  }
  if (path.startsWith(`table:`) || path.startsWith(`db:`)) {
    let table: Dynamic = path.slice(path.indexOf(`:`) + 1);
    return !dataModelSchemasPattern5.test(table) || table.includes(`..`)
      ? referenceError(`bad db table`)
      : {
          path: ``,
          sel: {
            kind: `db`,
            table: table,
            ptr: options || undefined,
          },
        };
  }
  if (path.startsWith(`feed:`)) {
    let name: Dynamic = path.slice(5);
    return dataModelSchemasPattern3.test(name)
      ? {
          path: ``,
          sel: {
            kind: `fn`,
            name: name,
            key: options || undefined,
          },
        }
      : referenceError(`bad feed id`);
  }
  if (path.startsWith(`action:`)) {
    let pathSlice: Dynamic = path.slice(7);
    return dataModelSchemasPattern4.test(pathSlice)
      ? {
          path: ``,
          sel: {
            kind: `run`,
            id: pathSlice,
            ptr: options || undefined,
          },
        }
      : referenceError(`bad action id`);
  }
  if (path.startsWith(`state:`)) {
    let statePath: Dynamic = path.slice(6);
    return !dataModelSchemasPattern6.test(statePath) || statePath.includes(`..`)
      ? referenceError(`bad state path`)
      : {
          path: ``,
          sel: {
            kind: `state`,
            statePath: statePath,
            ptr: options || undefined,
          },
        };
  }
  if (options.startsWith(`chart:`)) {
    let name: Dynamic = options.slice(6);
    return name
      ? {
          path: path,
          sel: {
            kind: `chart`,
            name: name,
          },
        }
      : referenceError(`empty chart name`);
  }
  if (options.startsWith(`input:`)) {
    let target: Dynamic = options.slice(6);
    return target
      ? {
          path: path,
          sel: {
            kind: `input`,
            target: target,
            control: `number`,
          },
        }
      : referenceError(`empty input target`);
  }
  if (options.startsWith(`#`)) {
    let optionsSlice: Dynamic = options.slice(1);
    return dataModelSchemasPattern.test(optionsSlice)
      ? {
          path: path,
          sel: {
            kind: `html`,
            id: optionsSlice,
          },
        }
      : referenceError(`bad html id`);
  }
  return options
    ? {
        path: path,
        sel: options.includes(`:`)
          ? {
              kind: `range`,
              ref: options,
            }
          : {
              kind: `cell`,
              ref: options,
            },
      }
    : referenceError(`empty selector`);
}

var dataModelSchemasPattern7: RegExp;

var dataModelSchemasPattern8: RegExp;

function resolveDataModelSchemasPath(
  dataModelSchemasPath?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let match = dataModelSchemasPattern7.exec(dataModelSchemasPath);
  if (!match) return referenceError(`missing [path] prefix`);
  let matchItem = match[1];
  let matchItem2: string = match[2];
  let container: Dynamic;
  let match2 = dataModelSchemasPattern8.exec(matchItem);
  if (match2) {
    container = `${match2[1]}/${match2[2]}`;
    matchItem = match2[3];
  }
  let params: Dynamic;
  let matchItemIndex: Dynamic = matchItem2.indexOf(`?`);
  if (
    matchItemIndex >= 0 &&
    /^[\w.-]+=/.test(matchItem2.slice(matchItemIndex + 1))
  ) {
    let fromEntries = Object.fromEntries(
      new URLSearchParams(matchItem2.slice(matchItemIndex + 1)),
    );
    if (Object.keys(fromEntries).length) {
      params = fromEntries;
    }
    matchItem2 = matchItem2.slice(0, matchItemIndex);
  }
  let lastIndexOf: Dynamic = matchItem2.lastIndexOf(`@`);
  let matchItem3: Dynamic =
    lastIndexOf < 0 ? matchItem2 : matchItem2.slice(0, lastIndexOf);
  let pin: Dynamic = resolveDataModelSchemasKind(
    lastIndexOf < 0 ? undefined : matchItem2.slice(lastIndexOf + 1),
  );
  if (resolvePlatformApiAndAuthValue28(pin)) return pin;
  let isDataModelSchemasPath2: Dynamic = isDataModelSchemasPath(
    matchItem,
    matchItem3,
  );
  return resolvePlatformApiAndAuthValue28(isDataModelSchemasPath2)
    ? isDataModelSchemasPath2
    : {
        path: isDataModelSchemasPath2.path,
        selector: isDataModelSchemasPath2.sel,
        pin: pin,
        ...(params && {
          params: params,
        }),
        ...(container && {
          container: container,
        }),
      };
}

var DataModelSchemasTable: Dynamic;

var dataModelSchemasPattern9: RegExp;

var dataModelSchemasPattern10: RegExp;

var DataModelSchemasCell: RegExp;

var dataModelSchemasPattern11: RegExp;

var dataModelSchemasPattern12: RegExp;

function resolveDataModelSchemasToUpperCase(
  dataModelSchemas?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count = 0;
  for (let resolveDataModelSchemasToUpperCaseResult of dataModelSchemas.toUpperCase() as Dynamic)
    count =
      count * 26 +
      (resolveDataModelSchemasToUpperCaseResult.charCodeAt(0) - 64);
  return count - 1;
}

function resolveDataModelSchemasKind2(
  dataModelSchemasKind2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataModelSchemasKind2.startsWith(`q:`)) {
    let exact: Dynamic = dataModelSchemasKind2.slice(2);
    if (exact.length >= 2 && exact[0] === `"` && exact.at(-1) === `"`) {
      let exact2: Dynamic = exact
        .slice(1, -1)
        .replace(/\\"/g, `"`)
        .replace(/\\\\/g, `\\`);
      return exact2
        ? {
            kind: `quote`,
            exact: exact2,
          }
        : referenceError(`~q: empty`);
    }
    return exact
      ? {
          kind: `quote`,
          exact: exact,
        }
      : referenceError(`~q: empty`);
  }
  if (dataModelSchemasKind2.startsWith(`cell:`)) {
    let dataModelSchemasKind2Slice: Dynamic = dataModelSchemasKind2.slice(5);
    let resolveDataModelSchemasKind2Result: Dynamic;
    let dataModelSchemasKind2SliceIndex: Dynamic =
      dataModelSchemasKind2Slice.indexOf(`/`);
    if (
      dataModelSchemasKind2SliceIndex > 0 &&
      /^\d+$/.test(
        dataModelSchemasKind2Slice.slice(0, dataModelSchemasKind2SliceIndex),
      )
    ) {
      resolveDataModelSchemasKind2Result = +dataModelSchemasKind2Slice.slice(
        0,
        dataModelSchemasKind2SliceIndex,
      );
      dataModelSchemasKind2Slice = dataModelSchemasKind2Slice.slice(
        dataModelSchemasKind2SliceIndex + 1,
      );
    }
    let match: Dynamic = dataModelSchemasPattern11.exec(
      dataModelSchemasKind2Slice,
    );
    if (match) {
      let record2: Dynamic = {
        kind: `cell`,
        row: +match[1],
        col: +match[2],
      };
      if (resolveDataModelSchemasKind2Result !== undefined) {
        record2.table = resolveDataModelSchemasKind2Result;
      }
      if (match[3] !== undefined) {
        Object.assign(record2, {
          toRow: +match[3],
          toCol: +match[4],
        });
      }
      return record2;
    }
    let match2: Dynamic = dataModelSchemasPattern12.exec(
      dataModelSchemasKind2Slice,
    );
    if (match2) {
      let record2: Dynamic = {
        kind: `cell`,
        row: match2[2] - 1,
        col: resolveDataModelSchemasToUpperCase(match2[1]),
      };
      if (resolveDataModelSchemasKind2Result !== undefined) {
        record2.table = resolveDataModelSchemasKind2Result;
      }
      if (match2[3] !== undefined) {
        Object.assign(record2, {
          toRow: match2[4] - 1,
          toCol: resolveDataModelSchemasToUpperCase(match2[3]),
        });
      }
      return record2;
    }
    return referenceError(
      `~cell: expected [N/]r,c[:r2,c2] or A1[:B2], got "${dataModelSchemasKind2.slice(5)}"`,
    );
  }
  if (dataModelSchemasKind2.startsWith(`el:`)) {
    let dataModelSchemasKind2Slice: Dynamic = dataModelSchemasKind2.slice(3);
    return dataModelSchemasKind2Slice
      ? {
          kind: `element`,
          id: dataModelSchemasKind2Slice,
        }
      : referenceError(`~el: empty id`);
  }
  return referenceError(`unknown ~sub scheme "${dataModelSchemasKind2}"`);
}

function resolveDataModelSchemasEmptyRef(
  dataModelSchemasEmptyRef?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof dataModelSchemasEmptyRef != `string` || !dataModelSchemasEmptyRef)
    return referenceError(`empty ref`);
  let dataModelSchemasEmptyRefParts = dataModelSchemasEmptyRef.split(`>>`);
  if (dataModelSchemasEmptyRefParts.length - 1 > 4)
    return referenceError(`>> depth cap (4) exceeded`);
  let items: Dynamic = [];
  for (let index = 0; index < dataModelSchemasEmptyRefParts.length; index++) {
    let dataModelSchemasKind3: Dynamic = resolveDataModelSchemasKind3(
      dataModelSchemasEmptyRefParts[index],
      index === 0,
    );
    if (resolvePlatformApiAndAuthValue28(dataModelSchemasKind3))
      return dataModelSchemasKind3;
    items.push(dataModelSchemasKind3);
  }
  return items;
}

function resolveDataModelSchemasKind3(
  dataModelSchemasKind3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasKind32: Dynamic = dataModelSchemasKind3;
  let target: Dynamic;
  let fields: Dynamic;
  let sub: Dynamic;
  let dataModelSchemasKind3Index: Dynamic = dataModelSchemasKind32.indexOf(`#`);
  if (dataModelSchemasKind3Index >= 0) {
    let dataModelSchemasKind3Slice: Dynamic = dataModelSchemasKind32.slice(
      dataModelSchemasKind3Index + 1,
    );
    dataModelSchemasKind32 = dataModelSchemasKind32.slice(
      0,
      dataModelSchemasKind3Index,
    );
    let search: Dynamic =
      dataModelSchemasKind3Slice.search(DataModelSchemasCell);
    if (search >= 0) {
      sub = dataModelSchemasKind3Slice.slice(search + 1);
      let dataModelSchemasKind2: Dynamic = resolveDataModelSchemasKind2(sub);
      if (resolvePlatformApiAndAuthValue28(dataModelSchemasKind2))
        return dataModelSchemasKind2;
      dataModelSchemasKind3Slice = dataModelSchemasKind3Slice.slice(0, search);
    }
    let match = dataModelSchemasPattern10.exec(dataModelSchemasKind3Slice);
    if (match) {
      target = match[1];
      fields = match[2].slice(1).split(`.`);
    } else {
      target = dataModelSchemasKind3Slice;
    }
  }
  let params: Dynamic;
  let dataModelSchemasKind3Index2: Dynamic =
    dataModelSchemasKind32.indexOf(`?`);
  if (
    dataModelSchemasKind3Index2 >= 0 &&
    /^[\w.-]+=/.test(
      dataModelSchemasKind32.slice(dataModelSchemasKind3Index2 + 1),
    )
  ) {
    let fromEntries = Object.fromEntries(
      new URLSearchParams(
        dataModelSchemasKind32.slice(dataModelSchemasKind3Index2 + 1),
      ),
    );
    if (Object.keys(fromEntries).length) {
      params = fromEntries;
    }
    dataModelSchemasKind32 = dataModelSchemasKind32.slice(
      0,
      dataModelSchemasKind3Index2,
    );
  }
  let pin: Dynamic = {
    kind: `live`,
  };
  let lastIndexOf: Dynamic = dataModelSchemasKind32.lastIndexOf(`@`);
  if (lastIndexOf >= 0) {
    let dataModelSchemasKind3Slice: Dynamic = dataModelSchemasKind32.slice(
      lastIndexOf + 1,
    );
    if (!dataModelSchemasKind3Slice) return referenceError(`empty @pin`);
    pin = dataModelSchemasPattern2.test(dataModelSchemasKind3Slice)
      ? {
          kind: `sha`,
          sha: dataModelSchemasKind3Slice.toLowerCase(),
        }
      : {
          kind: `label`,
          label: dataModelSchemasKind3Slice.replace(/^pin:/, ``),
        };
    dataModelSchemasKind32 = dataModelSchemasKind32.slice(0, lastIndexOf);
  }
  if (!options)
    return dataModelSchemasKind32
      ? referenceError(
          `>> tail has resource "${dataModelSchemasKind32}" (expected #target)`,
        )
      : target === undefined && !sub
        ? referenceError(`>> tail missing #target`)
        : {
            pin: pin,
            ...(params && {
              params: params,
            }),
            ...(target !== undefined && {
              target: target,
            }),
            ...(fields && {
              fields: fields,
            }),
            ...(sub && {
              sub: sub,
            }),
          };
  if (!dataModelSchemasKind32)
    return target === undefined && !sub
      ? referenceError(`missing resource`)
      : {
          pin: pin,
          ...(params && {
            params: params,
          }),
          ...(target !== undefined && {
            target: target,
          }),
          ...(fields && {
            fields: fields,
          }),
          ...(sub && {
            sub: sub,
          }),
        };
  let resource: Dynamic = isDataModelSchemasKind(dataModelSchemasKind32);
  return resolvePlatformApiAndAuthValue28(resource)
    ? resource
    : {
        resource: resource,
        pin: pin,
        ...(params && {
          params: params,
        }),
        ...(target !== undefined && {
          target: target,
        }),
        ...(fields && {
          fields: fields,
        }),
        ...(sub && {
          sub: sub,
        }),
      };
}

function isDataModelSchemasKind(
  dataModelSchemasKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataModelSchemasKind.startsWith(`feed:`))
    return referenceError(
      `dead scheme "feed:" in "${dataModelSchemasKind}" — feeds are routines now`,
    );
  let dataModelSchemasKindIndex: Dynamic = dataModelSchemasKind.indexOf(`:`);
  let dataModelSchemasKindSlice: Dynamic =
    dataModelSchemasKindIndex > 0
      ? dataModelSchemasKind.slice(0, dataModelSchemasKindIndex)
      : ``;
  let kind: Dynamic = Object.hasOwn(
    DataModelSchemasTable,
    dataModelSchemasKindSlice,
  )
    ? DataModelSchemasTable[dataModelSchemasKindSlice]
    : undefined;
  if (kind) {
    let dataModelSchemasKindSlice2: Dynamic = dataModelSchemasKind.slice(
      dataModelSchemasKindIndex + 1,
    );
    let dataModelSchemasKindSliceParts: Dynamic =
      dataModelSchemasKindSlice2.split(`/`);
    return !dataModelSchemasKindSliceParts.length ||
      dataModelSchemasKindSliceParts.some(
        (
          dataModelSchemasKindSlicePart?: Dynamic,
          ..._extraArguments: unknown[]
        ) => !dataModelSchemasPattern9.test(dataModelSchemasKindSlicePart),
      )
      ? referenceError(`bad ${kind} name in "${dataModelSchemasKind}"`)
      : {
          kind: kind,
          id: dataModelSchemasKindSlice2,
        };
  }
  return dataModelSchemasKind.includes(`\0`) ||
    dataModelSchemasKind.includes(`\\`) ||
    dataModelSchemasKind.includes(`..`)
    ? referenceError(`bad path "${dataModelSchemasKind}"`)
    : {
        kind: `file`,
        id: dataModelSchemasKind,
      };
}

var DataModelSchemasPath: Dynamic;

var DataModelSchemasLabel2: Dynamic;

var DataModelSchemasHourly: Dynamic;

var DataModelSchemasSlug: Dynamic;

function resolveDataModelSchemasType(
  dataModelSchemasType?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    typeof dataModelSchemasType == `object` &&
    !!dataModelSchemasType &&
    dataModelSchemasType.type === `mcp`
  );
}

var DataModelSchemasMeasures: Dynamic;

var DataModelSchemasSlug2: Dynamic;

function resolveDataModelSchemasSemantic(
  dataModelSchemasSemantic?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    typeof dataModelSchemasSemantic == `object` &&
    !!dataModelSchemasSemantic &&
    dataModelSchemasSemantic.type === `semantic`
  );
}

function resolveDataModelSchemasValue(
  dataModelSchemasValue?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    resolveDataModelSchemasType(dataModelSchemasValue) ||
    resolveDataModelSchemasSemantic(dataModelSchemasValue)
  );
}

function resolveDataModelSchemasSlug(
  dataModelSchemasSlug?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      dataModelSchemasSlug.slug !== `bigquery` ||
      dataModelSchemasSlug.tool !== `semantic_query`
    )
  )
    return {
      v: 1,
      type: `semantic`,
      slug: `bigquery`,
      spec: dataModelSchemasSlug.params?.spec ?? {},
      ...(dataModelSchemasSlug.origin && {
        origin: dataModelSchemasSlug.origin,
      }),
    };
}

var DataModelSchemasIntegrationsBigquery: Dynamic;

var dataModelSchemasPattern13: RegExp;

var dataModelSchemasUrlPattern: RegExp;

var resolveDataModelSchemasTest: Dynamic;

function resolveDataModelSchemasTest2(
  dataModelSchemasTest2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let dataModelSchemasTest22: Dynamic = dataModelSchemasTest2 ?? {};
  let text = String(dataModelSchemasTest22.url ?? ``);
  return (
    /^https?:\/\//i.test(text) &&
    !resolveDataModelSchemasTest(text) &&
    !dataModelSchemasTest22.spreadsheetId
  );
}

var DataModelSchemasIntegrationsBigquery2: Dynamic;

function resolveDataModelSchemasSourcePath(
  dataModelSchemasSourcePath?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !dataModelSchemasSourcePath ||
    typeof dataModelSchemasSourcePath != `object`
  )
    return dataModelSchemasSourcePath;
  let dataModelSchemasSourcePath2: Dynamic = dataModelSchemasSourcePath;
  if (resolveDataModelSchemasValue(dataModelSchemasSourcePath2.source))
    return dataModelSchemasSourcePath;
  let sourcePath: Dynamic =
    typeof dataModelSchemasSourcePath2.sourcePath == `string`
      ? dataModelSchemasSourcePath2.sourcePath
      : ``;
  let DataModelSchemasIntegrationsBigquery2Item: Dynamic =
    DataModelSchemasIntegrationsBigquery2[sourcePath];
  let configuration: Dynamic = dataModelSchemasSourcePath2.configuration ?? {};
  if (
    !DataModelSchemasIntegrationsBigquery2Item &&
    typeof dataModelSchemasSourcePath2.source == `string`
  ) {
    let match: Dynamic = /^(bigquery|url|gsheets):/.exec(
      dataModelSchemasSourcePath2.source,
    );
    if (match) {
      sourcePath = `integrations/${match[1] === `gsheets` ? `url` : match[1]}`;
      DataModelSchemasIntegrationsBigquery2Item =
        DataModelSchemasIntegrationsBigquery2[sourcePath];
      configuration = dataModelSchemasSourcePath2.params ?? {};
    }
  }
  if (
    !DataModelSchemasIntegrationsBigquery2Item ||
    (typeof process !== "undefined" &&
      ({} as Dynamic)[DataModelSchemasIntegrationsBigquery[sourcePath]] === `1`)
  )
    return dataModelSchemasSourcePath;
  let source: Dynamic =
    DataModelSchemasIntegrationsBigquery2Item(configuration);
  if (!source) return dataModelSchemasSourcePath;
  let {
    sourcePath: dataModelSchemasSourcePath3,
    configuration: dataModelSchemasSourcePath4,
    params: dataModelSchemasSourcePath5,
    ...dataModelSchemasSourcePath6
  }: Dynamic = dataModelSchemasSourcePath2;
  return {
    ...dataModelSchemasSourcePath6,
    source: source,
  };
}

var DataModelSchemasMinRows: Dynamic;

var DataModelSchemasSource: Dynamic;

var dataModelSchemasValue50000: number;

var resolveDataModelSchemasFile: Dynamic;

function collectDataModelSchemasSyncedRunId(
  collectDataModelSchemasSyncedRunId2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof collectDataModelSchemasSyncedRunId2 == `string`)
    try {
      collectDataModelSchemasSyncedRunId2 = JSON.parse(
        collectDataModelSchemasSyncedRunId2,
      );
    } catch {}
  let parse: Dynamic = DataModelSchemasSource.parse(
    resolveDataModelSchemasSourcePath(collectDataModelSchemasSyncedRunId2),
  );
  let record2: Dynamic = {
    ...(parse.name && {
      name: parse.name,
    }),
    syncedRunId: parse.syncedRunId ?? null,
    ...(parse.lastRunId && {
      lastRunId: parse.lastRunId,
    }),
    ...(parse.propagations && {
      propagations: parse.propagations.map(resolveDataModelSchemasFile),
    }),
    ...(parse.schedule && {
      schedule: parse.schedule,
    }),
    ...(parse.order != null && {
      order: parse.order,
    }),
    ...(parse.limit != null && {
      limit: Math.min(parse.limit, 5e4),
    }),
    ...(parse.expect && {
      expect: parse.expect,
    }),
  };
  if (
    typeof parse.source == `string` ||
    resolveDataModelSchemasValue(parse.source)
  )
    return {
      source: resolveDataModelSchemasType(parse.source)
        ? (resolveDataModelSchemasSlug(parse.source) ?? parse.source)
        : parse.source,
      ...(parse.params != null && {
        params: parse.params,
      }),
      ...(parse.inputs && {
        inputs: parse.inputs,
      }),
      ...record2,
    };
  let mcpSource: Dynamic = parse.mcpSource;
  if (resolveDataModelSchemasValue(mcpSource)) {
    let inputs: Dynamic =
      parse.inputs ?? (Array.isArray(parse.params) ? parse.params : undefined);
    return {
      source: resolveDataModelSchemasType(mcpSource)
        ? (resolveDataModelSchemasSlug(mcpSource) ?? mcpSource)
        : mcpSource,
      ...(inputs && {
        inputs: inputs,
      }),
      ...record2,
    };
  }
  let sourcePath: Dynamic = parse.sourcePath ?? ``;
  let sourcePathSlice: Dynamic = sourcePath.startsWith(`integrations/`)
    ? sourcePath.slice(13)
    : sourcePath;
  return {
    source: sourcePathSlice ? `${sourcePathSlice}:` : ``,
    ...(parse.configuration && {
      params: parse.configuration,
    }),
    ...(Array.isArray(parse.params) && {
      inputs: parse.params,
    }),
    ...record2,
  };
}

function resolveDataModelSchemasLimit(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (resolveDataModelSchemasSemantic(scheduler.source)) {
    let limit: Dynamic = scheduler.limit ?? scheduler.source.limit;
    let spec: Dynamic =
      limit != null && scheduler.source.spec.limit == null
        ? {
            ...scheduler.source.spec,
            limit: Math.min(limit, dataModelSchemasValue50000),
          }
        : scheduler.source.spec;
    let mcpSource: Dynamic = {
      v: 1,
      type: `mcp`,
      slug: `bigquery`,
      tool: `semantic_query`,
      params: {
        spec: spec,
      },
      ...(scheduler.source.origin && {
        origin: scheduler.source.origin,
      }),
    };
    return {
      ...(scheduler.name && {
        name: scheduler.name,
      }),
      sourcePath: `mcp`,
      mcpSource: mcpSource,
      configuration: {
        spec: spec,
      },
      ...(scheduler.inputs && {
        params: scheduler.inputs,
      }),
      syncedRunId: scheduler.syncedRunId ?? null,
      ...(scheduler.lastRunId && {
        lastRunId: scheduler.lastRunId,
      }),
      propagations: scheduler.propagations ?? [],
      ...(scheduler.schedule && {
        schedule: scheduler.schedule,
      }),
      ...(scheduler.order != null && {
        order: scheduler.order,
      }),
      ...(scheduler.limit != null && {
        limit: scheduler.limit,
      }),
      ...(scheduler.expect && {
        expect: scheduler.expect,
      }),
    };
  }
  if (resolveDataModelSchemasType(scheduler.source)) {
    let params: Dynamic =
      scheduler.limit != null && scheduler.source.params.max_rows == null
        ? {
            ...scheduler.source.params,
            max_rows: Math.min(scheduler.limit, dataModelSchemasValue50000),
          }
        : scheduler.source.params;
    return {
      ...(scheduler.name && {
        name: scheduler.name,
      }),
      sourcePath: `mcp`,
      mcpSource: {
        ...scheduler.source,
        params: params,
      },
      configuration: params,
      ...(scheduler.inputs && {
        params: scheduler.inputs,
      }),
      syncedRunId: scheduler.syncedRunId ?? null,
      ...(scheduler.lastRunId && {
        lastRunId: scheduler.lastRunId,
      }),
      propagations: scheduler.propagations ?? [],
      ...(scheduler.schedule && {
        schedule: scheduler.schedule,
      }),
      ...(scheduler.order != null && {
        order: scheduler.order,
      }),
      ...(scheduler.limit != null && {
        limit: scheduler.limit,
      }),
      ...(scheduler.expect && {
        expect: scheduler.expect,
      }),
    };
  }
  let dataModelSchemasRunner: Dynamic = resolveDataModelSchemasRunner(
    scheduler.source,
  );
  return {
    ...(scheduler.name && {
      name: scheduler.name,
    }),
    sourcePath: `integrations/${dataModelSchemasRunner.runner}`,
    configuration: resolveDataModelSchemasSourceProject(
      scheduler,
      dataModelSchemasRunner,
    ),
    ...(scheduler.inputs && {
      params: scheduler.inputs,
    }),
    syncedRunId: scheduler.syncedRunId ?? null,
    ...(scheduler.lastRunId && {
      lastRunId: scheduler.lastRunId,
    }),
    propagations: scheduler.propagations ?? [],
    ...(scheduler.schedule && {
      schedule: scheduler.schedule,
    }),
    ...(scheduler.order != null && {
      order: scheduler.order,
    }),
    ...(scheduler.expect && {
      expect: scheduler.expect,
    }),
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataModelSchemas2Step1(): void {
  (dataModelSchemasSet = new (Set as Dynamic)(
    `createPivotTable.deletePivotTable.newSheet.deleteSheet.duplicateSheet.addTable.deleteTable.addShapeLive.deleteShapeLive.insertImageLive.deleteChart.addSparklineGroup.deleteSparklineGroup.newDefinedName.deleteDefinedName.addCustomXmlPart.setCustomXmlPart.deleteCustomXmlPart.applyExternalDiffs.undo.redo.versionRestore.pivotDrillDownToSheet.agentApplyEdits.agentRunCommand.createChartLive.convertTableToRange.resizeTable`.split(
      `.`,
    ),
  ));
  (dataModelSchemasSet2 = new (Set as Dynamic)([
    `refreshPivot`,
    `refreshAllPivots`,
  ]));
  (dataModelSchemasValue1000 = 1e3);
  (dataModelSchemasMap = new (Map as Dynamic)());
  (dataModelSchemasValue_1 = false);
  (dataModelSchemasMap2 = new (Map as Dynamic)());
  (updateDataModelSchemasLocalRev = (
    updateDataModelSchemasLocalRev2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataModelSchemasMap2Entry: Dynamic = dataModelSchemasMap2.get(
      updateDataModelSchemasLocalRev2,
    );
    if (!dataModelSchemasMap2Entry) {
      dataModelSchemasMap2.set(
        updateDataModelSchemasLocalRev2,
        (dataModelSchemasMap2Entry = {
          localRev: -1,
          inflight: [],
          ackTimer: null,
          ackGraceUsed: false,
          resync: null,
        }),
      );
    }
    return dataModelSchemasMap2Entry;
  });
  (OT_ACK_TIMEOUT_MS = 1e4);
  (dataModelSchemasValue100 = 100);
  (dataModelSchemasValue0 = 0);
  (dataModelSchemasSet3 = new (Set as Dynamic)([
    `setUserInput`,
    `pasteCsvText`,
    `pasteFromClipboard`,
    `pasteSpecial`,
    `replaceAll`,
  ]));
  (resolveDataModelSchemasSetUserInput = (
    dataModelSchemasSetUserInput?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasSetUserInput === `setUserInput`
      ? typeof options[3] == `string` && options[3].startsWith(`=`)
        ? [options[3]]
        : []
      : options);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataModelSchemas2Step2(): void {
  if (typeof window !== "undefined") {
    (window as Dynamic).__workbookStore = useWorkbookStore;
  }
  (DataModelSchemasParseLineParam = createLiveModuleNamespace({
    parseLineParam: (..._extraArguments: unknown[]): Dynamic => parseLineParam,
    parseTarget: (..._extraArguments: unknown[]): Dynamic => parseTarget,
    useContainerStore: (..._extraArguments: unknown[]): Dynamic =>
      useContainerStore,
  }));
  (getDataModelSchemasTarget = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    parseTarget(new URLSearchParams(location.search).get(`target`) ?? ``));
  (resolveDataModelSchemasSearch = (..._extraArguments: unknown[]) =>
    parseLineParam(location.search));
  (getDataModelSchemasDiffView = (..._extraArguments: unknown[]) =>
    new URLSearchParams(location.search).get(`diff_view`) === `split`
      ? `split`
      : `unified`);
  (updateDataModelSchemasMain = (
    updateDataModelSchemasMain2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let url = new URL(location.href);
    let label: Dynamic = updateDataModelSchemasMain2
      ? options
        ? `${context || `main`}...${updateDataModelSchemasMain2}`
        : updateDataModelSchemasMain2
      : ``;
    if (label) {
      url.searchParams.set(`target`, label);
    } else {
      url.searchParams.delete(`target`);
    }
    history.replaceState(null, ``, url);
  });
  (updateDataModelSchemasVersion = (
    updateDataModelSchemasVersion2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let url = new URL(location.href);
    if (updateDataModelSchemasVersion2) {
      url.searchParams.set(`version`, updateDataModelSchemasVersion2);
    } else {
      url.searchParams.delete(`version`);
    }
    history.replaceState(null, ``, url);
  });
  (updateDataModelSchemasUnified = (
    updateDataModelSchemasUnified2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let url = new URL(location.href);
    if (updateDataModelSchemasUnified2 === `unified`) {
      url.searchParams.delete(`diff_view`);
    } else {
      url.searchParams.set(`diff_view`, updateDataModelSchemasUnified2);
    }
    history.replaceState(null, ``, url);
  });
  (DataModelSchemasState = null);
  (useContainerStore = create(
    (
      containerStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      project: undefined,
      loadError: undefined,
      loadStatus: undefined,
      entries: [],
      treeRev: 0,
      fsMetaRev: 0,
      tabsRev: {},
      version: ``,
      diffMode: false,
      base: ``,
      diffView: `unified`,
      line: ``,
      proposal: ``,
      forkedAt: null,
      load: async (
        name?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        let project: Dynamic = options().project;
        let namePartItem: Dynamic = name.split(`/`)[1] ?? ``;
        let test =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            namePartItem,
          );
        if (
          !(
            project !== undefined &&
            (project.name === name ||
              (test && project.id === namePartItem.toLowerCase()))
          )
        ) {
          containerStore({
            project: {
              id: ``,
              name: name,
              displayName: name.split(`/`).pop() ?? name,
              color: resolvePlatformSessionAndSourcesReduce(name),
              state: `shared`,
              meta: ``,
              updated: ``,
              files: [],
              fileCount: 0,
              versions: [],
              dirty: 0,
            },
            loadError: undefined,
            loadStatus: undefined,
            ...getDataModelSchemasTarget(),
            diffView: getDataModelSchemasDiffView(),
            line: resolveDataModelSchemasSearch(),
          });
          PlatformApiAndAuthAssign.getState().clear();
        }
        try {
          containerStore({
            project: await loadPlatformApiAndAuthFiles2(
              name,
              test
                ? {
                    byId: true,
                  }
                : undefined,
            ),
            loadError: undefined,
            loadStatus: undefined,
          });
        } catch (response: Dynamic) {
          containerStore({
            project: undefined,
            loadError: String(response),
            loadStatus: response.status,
          });
        }
      },
      refresh: async (..._extraArguments: unknown[]): Promise<undefined> => {
        let name: Dynamic = options().project?.name;
        if (name) {
          containerStore({
            project: await loadPlatformApiAndAuthFiles2(name),
          });
        }
      },
      watch: (
        containerStore2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        containerStore({
          entries: [],
        });
        let enabled = true;
        let useContainerStoreResult: Dynamic;
        let touch = (
          items?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (
            !enabled ||
            (useContainerStoreResult &&
              useContainerStoreResult.size === items.length &&
              items.every(
                (item?: Dynamic, ..._extraArguments: unknown[]) =>
                  useContainerStoreResult.get(item.path) === item.mtime,
              ))
          )
            return;
          let entries: Dynamic = items.map(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              ...item,
              fresh:
                !!useContainerStoreResult &&
                useContainerStoreResult.get(item.path) !== item.mtime,
            }),
          );
          useContainerStoreResult = new (Map as Dynamic)(
            items.map(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
                item.path,
                item.mtime,
              ],
            ),
          );
          let files: Dynamic = items.map(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.path,
          );
          let project: Dynamic = options().project;
          containerStore({
            entries: entries,
            ...(project && {
              project: {
                ...project,
                files: files,
              },
            }),
          });
          let useWorkbookStoreState: Dynamic = useWorkbookStore.getState();
          useWorkbookStoreState.reconcileDeleted(
            containerStore2,
            new (Set as Dynamic)(files),
          );
          let enabled2 = false;
          for (let useContainerStoreResult2 of entries as Dynamic)
            if (
              useContainerStoreResult2.fresh &&
              ((enabled2 = true), useContainerStoreResult2.path.endsWith(`.xlsx`))
            ) {
              let label = `${containerStore2}/${useContainerStoreResult2.path}`;
              if (!useWorkbookStore.getState().byPath[label]) {
                useWorkbookStoreState.invalidateIfExternal(
                  label,
                  useContainerStoreResult2.mtime,
                );
              }
            }
          if (enabled2) {
            PlatformApiAndAuthTick.getState().touch();
          }
        };
        let match: Dynamic = containerStore2.match(
          /^((?:projects|skills|users)\/[^/]+)(?:\/versions\/([^/]+))?$/,
        );
        if (match) {
          let fetch2: Dynamic = (..._extraArguments: unknown[]) =>
            fetch(
              resolvePlatformApiAndAuthValue(
                `/api/tree?dir=${encodeURIComponent(containerStore2)}`,
              ),
              {
                cache: `no-store`,
              },
            )
              .then(
                (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  response.ok ? response.json() : Promise.reject(response.status),
              )
              .then(touch, (..._extraArguments: unknown[]): undefined => {});
          let containerStore3: Dynamic = (
            ..._extraArguments: unknown[]
          ): Dynamic =>
            containerStore(
              (
                containerStore5?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => ({
                treeRev: containerStore5.treeRev + 1,
              }),
            );
          let containerStore4: Dynamic = (
            ..._extraArguments: unknown[]
          ): Dynamic =>
            containerStore(
              (
                containerStore5?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => ({
                fsMetaRev: containerStore5.fsMetaRev + 1,
              }),
            );
          fetch2();
          let label = `${match[1]}@${match[2] ?? `main`}`;
          let enabled2 = false;
          let isPlatformApiAndAuthHandoff2: Dynamic = isPlatformApiAndAuthHandoff(
            resolvePlatformApiAndAuthLocalhost(
              `/api/room/tree:${encodeURIComponent(label)}`,
            ),
            (
              containerStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              if (containerStore5.t === `tabs`)
                return containerStore(
                  (
                    containerStore6?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => ({
                    tabsRev: {
                      ...containerStore6.tabsRev,
                      [containerStore5.path]:
                        (containerStore6.tabsRev[containerStore5.path] ?? 0) + 1,
                    },
                  }),
                );
              if (containerStore5.t !== `tree`) return;
              if (
                containerStore5.changes.some(
                  (change?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    change.path.startsWith(`.claude/`),
                )
              ) {
                containerStore3();
              }
              let uniqueItems: Dynamic = new (Set as Dynamic)(
                options().entries.map(
                  (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    entry.path,
                ),
              );
              if (
                containerStore5.changes.some(
                  (change?: Dynamic, ..._extraArguments: unknown[]) =>
                    change.path === `.fs-meta` ||
                    (!change.path.startsWith(`.`) &&
                      (change.sha == null || !uniqueItems.has(change.path))),
                )
              ) {
                containerStore4();
              }
              fetch2();
            },
            (
              containerStore5?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (containerStore5 === `open`) {
                if (enabled2) {
                  containerStore3();
                  containerStore4();
                }
                enabled2 = true;
                fetch2();
              }
            },
          );
          return (..._extraArguments: unknown[]): undefined => {
            enabled = false;
            isPlatformApiAndAuthHandoff2.close();
          };
        }
        let eventSource: Dynamic = new (EventSource as Dynamic)(
          resolvePlatformApiAndAuthValue(
            `/api/tree?dir=${encodeURIComponent(containerStore2)}`,
          ),
        );
        eventSource.addEventListener(
          `message`,
          (event?: Dynamic, ..._extraArguments: unknown[]) =>
            touch(JSON.parse(event.data)),
        );
        return (..._extraArguments: unknown[]): undefined => {
          enabled = false;
          eventSource.close();
        };
      },
      setEntries: (entries?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        containerStore({
          entries: entries,
        }),
      setVersion: (
        version?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let diffMode: Dynamic = version ? options().diffMode : false;
        let base: Dynamic = version ? options().base : ``;
        updateDataModelSchemasMain(version, diffMode, base);
        containerStore({
          version: version,
          diffMode: diffMode,
          base: base,
        });
      },
      setDiffMode: (
        diffMode?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let version: Dynamic =
          !diffMode && options().version === `@wc` ? `` : options().version;
        updateDataModelSchemasMain(version, diffMode, options().base);
        containerStore({
          version: version,
          diffMode: diffMode,
        });
      },
      setDiffView: (
        diffView?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        updateDataModelSchemasUnified(diffView);
        containerStore({
          diffView: diffView,
        });
      },
      setLine: (line?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        updateDataModelSchemasVersion(line);
        containerStore({
          line: line,
        });
      },
      setProposal: (
        proposal?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        updateDataModelSchemasMain(``, false, ``);
        let url = new URL(location.href);
        if (proposal) {
          url.searchParams.set(`target`, `.${proposal}`);
        } else {
          url.searchParams.delete(`target`);
        }
        history.replaceState(null, ``, url);
        containerStore({
          proposal: proposal,
          version: ``,
          diffMode: false,
          base: ``,
        });
      },
      setTarget: (
        {
          version: version,
          diffMode: diffMode,
          base: base,
          proposal: proposal,
        }: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        updateDataModelSchemasMain(version, diffMode, base);
        if (proposal) {
          let url = new URL(location.href);
          url.searchParams.set(`target`, `.${proposal}`);
          history.replaceState(null, ``, url);
        }
        containerStore({
          version: version,
          diffMode: diffMode,
          base: base,
          proposal: proposal,
        });
      },
      activeDir: (..._extraArguments: unknown[]): Dynamic => {
        let { project: options2, version: options3 }: Dynamic = options();
        return options2
          ? PlatformApiAndAuthState7(
              options2.name,
              options3 === `@wc` ? `` : options3,
            )
          : ``;
      },
      clearForkedAt: (..._extraArguments: unknown[]): Dynamic =>
        containerStore({
          forkedAt: null,
        }),
      forkIfLocked: async (
        containerStore2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => {
        if (
          !containerStore2?.explicit ||
          (typeof location !== "undefined" &&
            new URLSearchParams(location.search).get(`chrome`) === `embed`)
        )
          return;
        if (DataModelSchemasState) return DataModelSchemasState;
        let {
          project: options2,
          version: options3,
          line: options4,
        }: Dynamic = options();
        if (!(!options2 || options3 || options4) && options2.state === `live`) {
          {
            let { useLinesStore: preloadTImport2 }: Dynamic =
              await preloadModule(
                async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                  let { useLinesStore: useLinesStore }: Dynamic = await import(
                    "../lazy"
                  ).then(
                    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      result.linesStoreModule,
                  );
                  return {
                    useLinesStore: useLinesStore,
                  };
                },
                collectObservabilityTelemetryValue([4, 1, 2, 5]),
                import.meta.url,
              );
            throw (
              preloadTImport2.setState({
                lastDeny: `Versions are shelved for now — branching from a live project is disabled.`,
              }),
              Error(`fork refused — see the versions message`)
            );
          }
          DataModelSchemasState = (async (
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            let { useLinesStore: preloadTImport2 }: Dynamic =
              await preloadModule(
                async (..._extraArguments: unknown[]): Promise<Dynamic> => {
                  let { useLinesStore: useLinesStore }: Dynamic = await import(
                    "../lazy"
                  ).then(
                    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      result.linesStoreModule,
                  );
                  return {
                    useLinesStore: useLinesStore,
                  };
                },
                collectObservabilityTelemetryValue([4, 1, 2, 5]),
                import.meta.url,
              );
            let preloadTImportState: Dynamic = preloadTImport2.getState();
            if (
              preloadTImportState.pid !== options2.id ||
              preloadTImportState.loadError !== undefined ||
              preloadTImportState.loading
            ) {
              await preloadTImportState.remount(options2.id);
              preloadTImportState = preloadTImport2.getState();
            }
            let options5 = (..._extraArguments: unknown[]) =>
              options().project?.id === options2.id;
            if (!options5()) return;
            if (preloadTImportState.loadError !== undefined)
              throw (
                preloadTImport2.setState({
                  lastDeny: `Versions couldn't load — check your connection and try again.`,
                }),
                Error(`fork refused — see the versions message`)
              );
            if (preloadTImportState.head < 1)
              throw (
                preloadTImport2.setState({
                  lastDeny: `There's no history to branch from yet.`,
                }),
                Error(`fork refused — see the versions message`)
              );
            if (!options5()) return;
            let line: Dynamic = await preloadTImport2.getState().mint({
              parent: preloadTImportState.defaultVersionId,
            });
            if (line === undefined) {
              if (!options5()) return;
              throw Error(`fork refused — see the versions message`);
            }
            if (options5()) {
              updateDataModelSchemasVersion(line);
              containerStore({
                line: line,
                diffMode: false,
                base: ``,
              });
            }
          })().finally((..._extraArguments: unknown[]): undefined => {
            DataModelSchemasState = null;
          });
          return DataModelSchemasState;
        }
      },
    }),
  ));
  if (typeof window !== "undefined") {
    (window as Dynamic).__projectStore = useContainerStore;
    let localResult: Dynamic = null;
    clearPlatformApiAndAuthDelete3(
      (
        callback?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (localResult) {
          localResult.push([callback, options]);
          return;
        }
        localResult = [[callback, options]];
        queueMicrotask((..._extraArguments: unknown[]): undefined => {
          let localResult2: Dynamic = localResult;
          localResult = null;
          let useContainerStoreState: Dynamic = useContainerStore.getState();
          let activeDir: Dynamic = useContainerStoreState.activeDir();
          if (!activeDir) return;
          let entriesSlice: Dynamic = useContainerStoreState.entries.slice();
          let lookup: Dynamic = new (Map as Dynamic)(
            entriesSlice.map(
              (
                entriesSlice2?: Dynamic,
                index?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => [entriesSlice2.path, index],
            ),
          );
          let enabled = false;
          for (let [localResult3, localResult4] of localResult2 as Dynamic) {
            if (
              !localResult3.startsWith(`${activeDir}/`) ||
              !localResult4.startsWith(`${activeDir}/`)
            )
              continue;
            let localResultSlice: Dynamic = localResult3.slice(
              activeDir.length + 1,
            );
            let path: Dynamic = localResult4.slice(activeDir.length + 1);
            let lookupEntry: Dynamic = lookup.get(localResultSlice);
            if (lookupEntry !== undefined) {
              entriesSlice[lookupEntry] = {
                ...entriesSlice[lookupEntry],
                path: path,
              };
              lookup.delete(localResultSlice);
              lookup.set(path, lookupEntry);
              enabled = true;
            }
          }
          if (enabled) {
            useContainerStoreState.setEntries(entriesSlice);
          }
        });
      },
    );
  }
  (DataModelSchemasBULKATTACHTHRESHOLD = createLiveModuleNamespace({
    BULK_ATTACH_THRESHOLD: (..._extraArguments: unknown[]) => 5,
    RASTER_IMAGE: (..._extraArguments: unknown[]): Dynamic => RASTER_IMAGE,
    ingestFiles: (..._extraArguments: unknown[]): Dynamic => ingestFiles,
    uploadFiles: (..._extraArguments: unknown[]): Dynamic => uploadFiles,
  }));
  (RASTER_IMAGE = new (Set as Dynamic)([
    `image/png`,
    `image/jpeg`,
    `image/gif`,
    `image/webp`,
  ]));
  (uploadFiles = (
    uploadFiles2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => api.files.upload(uploadFiles2, options, context, dependencies));
  (resolveDataModelSchemasFiles = (
    dataModelSchemasFiles?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasFiles.dataTransfer?.types.includes(`Files`) ?? false);
  (resolveDataModelSchemasLeft = (
    dataModelSchemasLeft?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    options >= dataModelSchemasLeft.rect.left &&
    options < dataModelSchemasLeft.rect.right &&
    context >= dataModelSchemasLeft.rect.top &&
    context < dataModelSchemasLeft.rect.bottom);
  (0, React.createContext)(null);
  (DataModelSchemasDragging = create(
    (
      dataModelSchemasDragging?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      dragging: false,
      holeRect: null,
      setHole: (holeRect?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        dataModelSchemasDragging({
          holeRect: holeRect,
        }),
      endDrag: (..._extraArguments: unknown[]): Dynamic =>
        dataModelSchemasDragging({
          dragging: false,
        }),
      iframeDragEnter: (..._extraArguments: unknown[]): Dynamic =>
        dataModelSchemasDragging({
          dragging: true,
          lastIframeEnter: Date.now(),
        }),
      lastIframeEnter: 0,
      intercept: null,
      setIntercept: (
        intercept?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        dataModelSchemasDragging({
          intercept: intercept,
        }),
      imagePicker: null,
      setImagePicker: (
        imagePicker?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        dataModelSchemasDragging({
          imagePicker: imagePicker,
        }),
      chatIntercept: null,
      setChatIntercept: (
        chatIntercept?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        dataModelSchemasDragging({
          chatIntercept: chatIntercept,
        }),
    }),
  ));
  (DataModelSchemasUrl = {
    url: `https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js`,
    sri: `sha384-pPi0zxBAoDu6+JXW/C68UZLvBUUtU+7zonhif43rqj7pxsGyqyqzcian2Rj37Rss`,
  });
  (dataModelSchemasFnRunDbFeedValues = [
    `fn`,
    `run`,
    `db`,
    `feed`,
    `state`,
    `action`,
  ]);
  (resolveDataModelSchemasIncludes = (
    dataModelSchemasIncludes?: Dynamic,
    ..._extraArguments: unknown[]
  ) => dataModelSchemasFnRunDbFeedValues.includes(dataModelSchemasIncludes));
  (dataModelSchemasPattern = /^[A-Za-z][\w-]*$/);
  (dataModelSchemasPattern2 = /^[0-9a-f]{7,40}$/i);
  (dataModelSchemasPattern3 = /^[\w-]+$/);
  (dataModelSchemasPattern4 = /^[\w-]+$/);
  (dataModelSchemasPattern5 = /^[\w][\w.-]*$/);
  (dataModelSchemasPattern6 = /^[\w][\w/.-]*$/);
  (dataModelSchemasPattern7 = /^\[([^\]]+)\](.*)$/s);
  (dataModelSchemasPattern8 = /^(projects|users|skills)\/([a-z0-9][a-z0-9._-]*)\/(.+)$/);
  (DataModelSchemasTable = {
    fn: `fn`,
    table: `table`,
    run: `run`,
    type: `type`,
    routine: `fn`,
    db: `table`,
    action: `run`,
  });
  (dataModelSchemasPattern9 = /^[a-z0-9][a-z0-9-_]{0,63}$/);
  (dataModelSchemasPattern10 = /^(ln-[\w-]+)((?:\.[\w-]+)+)$/);
  (DataModelSchemasCell = RegExp(
    `[~@](?=${[`q`, `cell`, `el`].map((item?: Dynamic, ..._extraArguments: unknown[]) => `${item}:`).join(`|`)})`,
  ));
  (dataModelSchemasPattern11 = /^(\d+),(\d+)(?::(\d+),(\d+))?$/);
  (dataModelSchemasPattern12 = /^([A-Za-z]{1,3})([1-9]\d*)(?::([A-Za-z]{1,3})([1-9]\d*))?$/);
  (DataModelSchemasPath = lazyZod
    .object({
      path: lazyZod.string().optional(),
      target: lazyZod.string().optional(),
      mode: lazyZod.enum([`replace`, `merge`]).optional(),
      destination: lazyZod.string().optional(),
      file: lazyZod.string().optional(),
    })
    .passthrough());
  (DataModelSchemasLabel2 = lazyZod
    .object({
      name: lazyZod.string(),
      label: lazyZod.string().optional(),
      type: lazyZod.enum([
        `string`,
        `number`,
        `date`,
        `daterange`,
        `enum`,
        `multi`,
      ]),
      default: lazyZod.unknown().optional(),
      options: lazyZod.array(lazyZod.string()).optional(),
    })
    .passthrough());
  (DataModelSchemasHourly = lazyZod.enum([
    `hourly`,
    `daily`,
    `weekly`,
  ]));
  (DataModelSchemasSlug = lazyZod.object({
    v: lazyZod.literal(1),
    type: lazyZod.literal(`mcp`),
    slug: lazyZod.string(),
    tool: lazyZod.string(),
    params: lazyZod.record(lazyZod.string(), lazyZod.unknown()),
    origin: lazyZod.string().optional(),
    adapter: DataContentAndReferencesHasHeader.optional(),
  }));
  (DataModelSchemasMeasures = lazyZod
    .object({
      measures: lazyZod.array(lazyZod.string()).optional(),
      dimensions: lazyZod.array(lazyZod.string()).optional(),
      filters: lazyZod.array(lazyZod.unknown()).optional(),
      timeDimensions: lazyZod.array(lazyZod.unknown()).optional(),
      order: lazyZod.unknown().optional(),
      limit: lazyZod.number().optional(),
      offset: lazyZod.number().optional(),
    })
    .passthrough());
  (DataModelSchemasSlug2 = lazyZod.object({
    v: lazyZod.literal(1),
    type: lazyZod.literal(`semantic`),
    slug: lazyZod.literal(`bigquery`),
    spec: DataModelSchemasMeasures,
    limit: lazyZod.number().int().positive().optional(),
    origin: lazyZod.string().optional(),
  }));
  (DataModelSchemasIntegrationsBigquery = {
    "integrations/bigquery": `BONGO_BQ_MOCK`,
    "integrations/url": `BONGO_GSHEETS_MOCK`,
  });
  (dataModelSchemasPattern13 = /\/d\/([\w-]+)/);
  (dataModelSchemasUrlPattern = /^https?:\/\/(docs|drive)\.google\.com\//i);
  (resolveDataModelSchemasTest = (
    dataModelSchemasTest?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemasUrlPattern.test(dataModelSchemasTest) &&
    dataModelSchemasPattern13.test(dataModelSchemasTest));
  (DataModelSchemasIntegrationsBigquery2 = {
    "integrations/bigquery": (
      dataModelSchemasIntegrationsBigquery2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => ({
      v: 1,
      type: `mcp`,
      slug: `bigquery`,
      tool: `bigquery_query`,
      params: {
        sql: String(dataModelSchemasIntegrationsBigquery2.query ?? ``),
      },
    }),
    "integrations/url": (
      dataModelSchemasIntegrationsBigquery2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (resolveDataModelSchemasTest2(dataModelSchemasIntegrationsBigquery2))
        return;
      let text = String(dataModelSchemasIntegrationsBigquery2.url ?? ``);
      let match = resolveDataModelSchemasTest(text)
        ? dataModelSchemasPattern13.exec(text)
        : null;
      let fileId =
        match?.[1] ??
        String(dataModelSchemasIntegrationsBigquery2.spreadsheetId ?? text);
      if (!fileId)
        throw Error(
          `url integration: need configuration.url or spreadsheetId to derive file_id`,
        );
      let exportUrl = match && /\/export\?/.test(text) ? text : undefined;
      return {
        v: 1,
        type: `mcp`,
        slug: `google-drive`,
        tool: `download_file_content`,
        params: {
          file_id: fileId,
          ...(exportUrl && {
            export_url: exportUrl,
          }),
        },
      };
    },
  });
  (DataModelSchemasMinRows = lazyZod
    .object({
      minRows: lazyZod.number().int().nonnegative().optional(),
      columns: lazyZod.array(lazyZod.string()).optional(),
    })
    .passthrough());
  (DataModelSchemasSource = lazyZod
    .object({
      name: lazyZod.string().optional(),
      source: lazyZod
        .union([lazyZod.string(), DataModelSchemasSlug, DataModelSchemasSlug2])
        .optional(),
      sourcePath: lazyZod.string().optional(),
      params: lazyZod.unknown().optional(),
      inputs: lazyZod.array(DataModelSchemasLabel2).optional(),
      configuration: lazyZod
        .record(lazyZod.string(), lazyZod.unknown())
        .optional(),
      syncedRunId: lazyZod.string().nullish(),
      lastRunId: lazyZod.string().nullish(),
      propagations: lazyZod.array(DataModelSchemasPath).optional(),
      schedule: DataModelSchemasHourly.optional(),
      order: lazyZod.number().optional(),
      limit: lazyZod.number().int().positive().optional(),
      expect: DataModelSchemasMinRows.optional(),
    })
    .passthrough());
  (dataModelSchemasValue50000 = 5e4);
  (resolveDataModelSchemasFile = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record2: Dynamic = {
      ...(event.file && {
        file: event.file,
      }),
      ...(event.mode && {
        mode: event.mode,
      }),
    };
    if (event.target !== undefined)
      return {
        path: event.path ?? ``,
        target: event.target,
        ...record2,
      };
    let path: Dynamic = event.destination ?? event.path ?? ``;
    let pathIndex: Dynamic = path.indexOf(`#`);
    return {
      ...(pathIndex >= 0
        ? {
            path: path.slice(0, pathIndex),
            target: path.slice(pathIndex + 1),
          }
        : {
            path: path,
          }),
      ...record2,
    };
  });
}

export {
  DataModelSchemasBULKATTACHTHRESHOLD,
  DataModelSchemasDragging,
  DataModelSchemasDragging2,
  DataModelSchemasMinRows,
  DataModelSchemasParseLineParam,
  DataModelSchemasUrl,
  OT_ACK_TIMEOUT_MS,
  _ackIndex,
  _otOnReconnect,
  clearDataModelSchemasInflight,
  clearDataModelSchemasOps,
  collectDataModelSchemasSyncedRunId,
  dataModelSchemasMap,
  dataModelSchemasMap2,
  filterDataModelSchemasFilter,
  getDataModelSchemasAckTimeout,
  isDataModelSchemasArgs,
  parseLineParam,
  parseTarget,
  resolveDataModelSchemasAckTimer,
  resolveDataModelSchemasAlgo,
  resolveDataModelSchemasEmptyRef,
  resolveDataModelSchemasIncludes,
  resolveDataModelSchemasKind2,
  resolveDataModelSchemasLimit,
  resolveDataModelSchemasPath,
  resolveDataModelSchemasValue,
  updateDataModelSchemasLocalRev,
  updateDataModelSchemasUndo,
  useContainerStore,
};

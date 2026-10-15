/** BaoCut: platform live document and history from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  create,
  inFrame,
} from "../dependencies";
import {
  ObservabilityTelemetrySplit3,
  observabilityTelemetryE1E23E49E10pValues,
  observabilityTelemetryRepeatOrphanShapeStormValues,
} from "../observability/telemetry-2";
import {
  emitTelemetryEvent,
} from "../observability/telemetry-3";
import {
  filterDataContentAndReferencesFilter,
  resolveDataContentAndReferencesTest5,
} from "../data/content-and-references";
import {
  resolvePlatformSessionAndSourcesTab5,
  resolvePlatformSessionAndSourcesTab6,
} from "./session-and-sources-1";
import {
  EditorExtensionsFrameSendError,
} from "../../prose-editor/platform/extensions-3";
import {
  isPlatformKeyboardAndSaveStatusText,
  resolvePlatformKeyboardAndSaveStatusKept,
  resolvePlatformKeyboardAndSaveStatusValue8,
} from "./keyboard-and-save-status";
import {
  toast,
} from "../ui/toasts";
import {
  ObservabilityBrowserAndOperationEventsRoutine,
  resolveObservabilityBrowserAndOperationEventsNOTENABLED,
} from "../observability/browser-and-operation-events-2";
import {
  frameUserCapability,
  subscribeFrameDeadReason,
} from "../observability/browser-and-operation-events-3";
import {
  frameCurrentAnchor,
  frameDeclineExport,
  frameHostAction,
  frameHostChromeActions,
  frameHostChromeDestinations,
  frameHostChromeExports,
  frameHostExport,
} from "../observability/browser-and-operation-events-4";
import {
  api,
} from "./api-and-auth-1";
import {
  ackOf,
} from "./api-and-auth-2";
import {
  PlatformApiAndAuthUser,
} from "./api-and-auth-6";
import {
  updateDataModelSchemasPath,
} from "../data/model-schemas-3";
import {
  useCommentStore,
} from "../../comments/store/store-3";
import {
  resolveObservabilityBootPaint2,
} from "../observability/boot";
import {
  resolvePlatformSyncAndRoutingValue14,
} from "./sync-and-routing-1";
import {
  DataOperationControlBongoOpWal,
  filterDataOperationControlBid,
} from "../data/operation-control-4";
import {
  useCommentsEditorThen,
} from "../../comments/store/editor";
import {
  EditorSelectionAndTablesSelection,
  resolveEditorSelectionAndTablesHash,
  resolveEditorSelectionAndTablesKeys,
} from "../../prose-editor/platform/selection-and-tables-1";
import {
  PlatformLiveDocumentAndHistoryOther,
  PlatformLiveDocumentAndHistoryOthu,
  PlatformLiveDocumentAndHistoryWidgetBundle,
  platformLiveDocumentAndHistoryPattern3,
  platformLiveDocumentAndHistoryValue9,
  resolvePlatformLiveDocumentAndHistoryCell,
  resolvePlatformLiveDocumentAndHistoryOther,
  resolvePlatformLiveDocumentAndHistoryValue11,
  resolvePlatformLiveDocumentAndHistoryValue8,
} from "./live-document-and-history-1";

function resolvePlatformLiveDocumentAndHistoryAsking(
  platformLiveDocumentAndHistoryAsking?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label = resolvePlatformLiveDocumentAndHistoryValue11(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformLiveDocumentAndHistoryValue15(
        platformLiveDocumentAndHistoryAsking,
      ) && Object.hasOwn(platformLiveDocumentAndHistoryAsking, `asking`),
    false,
  )
    ? `ask`
    : `det`;
  if (!Array.isArray(options))
    return `${label}_ix_${PlatformLiveDocumentAndHistoryOthu}`;
  let platformLiveDocumentAndHistoryValue11: Dynamic =
    resolvePlatformLiveDocumentAndHistoryValue11(
      (..._extraArguments: unknown[]) => {
        let opIndex: Dynamic = resolvePlatformLiveDocumentAndHistoryValue15(
          platformLiveDocumentAndHistoryAsking,
        )
          ? platformLiveDocumentAndHistoryAsking.opIndex
          : undefined;
        return typeof opIndex == `number` &&
          Number.isInteger(opIndex) &&
          opIndex >= 0 &&
          opIndex <= platformLiveDocumentAndHistoryValue9
          ? opIndex
          : undefined;
      },
      undefined,
    );
  let optionItem: Dynamic =
    platformLiveDocumentAndHistoryValue11 === undefined
      ? undefined
      : options[platformLiveDocumentAndHistoryValue11];
  return `${label}_i${platformLiveDocumentAndHistoryValue11 ?? `x`}_${typeof optionItem == `string` && platformLiveDocumentAndHistoryPattern3.test(optionItem) ? optionItem : PlatformLiveDocumentAndHistoryOthu}`;
}

var platformLiveDocumentAndHistoryPattern4: RegExp;

var platformLiveDocumentAndHistoryPattern5: RegExp;

var resolvePlatformLiveDocumentAndHistoryIsFinite: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue12: (platformLiveDocumentAndHistoryValue12?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolvePlatformLiveDocumentAndHistoryGesture(
  platformLiveDocumentAndHistoryGesture?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryOther: Dynamic =
    resolvePlatformLiveDocumentAndHistoryOther(
      platformLiveDocumentAndHistoryGesture.gesture,
    );
  let need: Dynamic =
    typeof platformLiveDocumentAndHistoryGesture.need == `string` &&
    platformLiveDocumentAndHistoryPattern5.test(
      platformLiveDocumentAndHistoryGesture.need,
    )
      ? platformLiveDocumentAndHistoryGesture.need
      : PlatformLiveDocumentAndHistoryOther;
  let platformLiveDocumentAndHistoryValue12 =
    resolvePlatformLiveDocumentAndHistoryValue12(
      platformLiveDocumentAndHistoryGesture.ops,
      platformLiveDocumentAndHistoryGesture.cell,
      platformLiveDocumentAndHistoryGesture.cross === true,
    );
  for (let resolvePlatformLiveDocumentAndHistoryGestureResult of [
    `${platformLiveDocumentAndHistoryOther}:${need}:${platformLiveDocumentAndHistoryValue12}`,
    `${platformLiveDocumentAndHistoryOther}:${need}`,
    `${platformLiveDocumentAndHistoryOther}:${PlatformLiveDocumentAndHistoryOther}:${platformLiveDocumentAndHistoryValue12}`,
    `${platformLiveDocumentAndHistoryOther}:${PlatformLiveDocumentAndHistoryOther}`,
  ] as Dynamic)
    if (
      platformLiveDocumentAndHistoryPattern4.test(
        resolvePlatformLiveDocumentAndHistoryGestureResult,
      )
    )
      return resolvePlatformLiveDocumentAndHistoryGestureResult;
  return `other:${PlatformLiveDocumentAndHistoryOther}`;
}

var platformLiveDocumentAndHistorySet11: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue13: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue14: Dynamic;

var platformLiveDocumentAndHistorySet12: Dynamic;

var resolvePlatformLiveDocumentAndHistoryOther4: (event?: Dynamic, ..._extraArguments: unknown[]) => "other" | "revive" | null;

function filterPlatformLiveDocumentAndHistoryRevive(
  filterPlatformLiveDocumentAndHistoryRevive2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !resolvePlatformLiveDocumentAndHistoryValue14(
      filterPlatformLiveDocumentAndHistoryRevive2,
    ) ||
    !Array.isArray(filterPlatformLiveDocumentAndHistoryRevive2.ops)
  )
    return `t1`;
  let filteredMappedOps: Dynamic =
    filterPlatformLiveDocumentAndHistoryRevive2.ops
      .map(resolvePlatformLiveDocumentAndHistoryOther4)
      .filter(
        (mappedOp?: Dynamic, ..._extraArguments: unknown[]) =>
          mappedOp !== null,
      );
  if (filteredMappedOps.length === 0) return `t1`;
  let tele: Dynamic = resolvePlatformLiveDocumentAndHistoryValue14(
    filterPlatformLiveDocumentAndHistoryRevive2.tele,
  )
    ? filterPlatformLiveDocumentAndHistoryRevive2.tele
    : {};
  return typeof tele.remintByValue == `number` && tele.remintByValue > 0
    ? `bv`
    : filteredMappedOps.every(
          (filteredMappedOp?: Dynamic, ..._extraArguments: unknown[]) =>
            filteredMappedOp === `revive`,
        )
      ? `td`
      : tele.g === `redo`
        ? `t2r`
        : tele.g === `undo` ||
            filterPlatformLiveDocumentAndHistoryRevive2.undo === true
          ? `t2u`
          : `t2f`;
}

var platformLiveDocumentAndHistoryPnValues: string[];

var platformLiveDocumentAndHistoryCnValues: string[];

var platformLiveDocumentAndHistoryFxValues: string[];

var platformLiveDocumentAndHistoryPattern6: RegExp;

var PlatformLiveDocumentAndHistoryFirst: Dynamic;

function resolvePlatformLiveDocumentAndHistoryNone(
  platformLiveDocumentAndHistoryNone?: Dynamic,
  ..._extraArguments: unknown[]
): string | undefined {
  let PlatformLiveDocumentAndHistoryFirstItem: Dynamic =
    typeof platformLiveDocumentAndHistoryNone.why == `string` &&
    Object.hasOwn(
      PlatformLiveDocumentAndHistoryFirst,
      platformLiveDocumentAndHistoryNone.why,
    )
      ? PlatformLiveDocumentAndHistoryFirst[
          platformLiveDocumentAndHistoryNone.why
        ]
      : undefined;
  let platformLiveDocumentAndHistoryValue13: Dynamic =
    resolvePlatformLiveDocumentAndHistoryValue13(
      platformLiveDocumentAndHistoryNone.sh,
    );
  if (
    PlatformLiveDocumentAndHistoryFirstItem === undefined ||
    platformLiveDocumentAndHistoryValue13 === undefined
  )
    return;
  let label: string = `${PlatformLiveDocumentAndHistoryFirstItem}.${platformLiveDocumentAndHistoryValue13}.${platformLiveDocumentAndHistoryPnValues[0]}.${platformLiveDocumentAndHistoryCnValues[0]}.${platformLiveDocumentAndHistoryFxValues[0]}`;
  return platformLiveDocumentAndHistoryPattern6.test(label) &&
    label !== `none` &&
    label !== `other`
    ? label
    : undefined;
}

function resolvePlatformLiveDocumentAndHistoryTest4(
  platformLiveDocumentAndHistoryTest4?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    options === undefined ||
    !platformLiveDocumentAndHistoryPattern6.test(options)
  )
    return platformLiveDocumentAndHistoryTest4;
  if (platformLiveDocumentAndHistoryTest4 === undefined) return options;
  let optionsParts: Dynamic = options.split(`.`);
  for (
    let optionsPartsCount: Dynamic = optionsParts.length;
    optionsPartsCount >= 3;
    optionsPartsCount--
  ) {
    let label = `${platformLiveDocumentAndHistoryTest4}.${optionsParts.slice(0, optionsPartsCount).join(`.`)}`;
    if (platformLiveDocumentAndHistoryPattern6.test(label)) return label;
  }
  return platformLiveDocumentAndHistoryTest4;
}

var resolvePlatformLiveDocumentAndHistoryValue15: Dynamic;

var platformLiveDocumentAndHistoryValue128: number;

function filterPlatformLiveDocumentAndHistoryPayload(
  filterPlatformLiveDocumentAndHistoryPayload2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ops: Dynamic =
    resolvePlatformLiveDocumentAndHistoryValue15(
      filterPlatformLiveDocumentAndHistoryPayload2,
    ) &&
    resolvePlatformLiveDocumentAndHistoryValue15(
      filterPlatformLiveDocumentAndHistoryPayload2.payload,
    )
      ? filterPlatformLiveDocumentAndHistoryPayload2.payload.ops
      : undefined;
  return Array.isArray(ops) &&
    ops.length <= platformLiveDocumentAndHistoryValue128
    ? ops.filter(resolvePlatformLiveDocumentAndHistoryValue15)
    : [];
}

var resolvePlatformLiveDocumentAndHistoryOne: Dynamic;

var platformLiveDocumentAndHistorySet13: Dynamic;

function collectPlatformLiveDocumentAndHistoryAutoLift(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (items.length === 0 || !platformLiveDocumentAndHistorySet13.has(options))
    return;
  let mappedItems: Dynamic = items.map(
    resolvePlatformLiveDocumentAndHistoryOne,
  );
  if (
    mappedItems.every(
      (mappedItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        mappedItem !== null && mappedItem.one && mappedItem.on !== null,
    )
  )
    return mappedItems.every(
      (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
        mappedItem.on === false,
    )
      ? `auto_lift`
      : mappedItems.every(
            (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
              mappedItem.on === true,
          )
        ? `relay`
        : undefined;
}

var PlatformLiveDocumentAndHistoryBold: Dynamic;

var PlatformLiveDocumentAndHistoryBiusclhkx: string;

var filterPlatformLiveDocumentAndHistoryJoin: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue16: (platformLiveDocumentAndHistoryValue16?: Dynamic, ..._extraArguments: unknown[]) => "u1" | "u17" | "u2" | "u5";

var filterPlatformLiveDocumentAndHistoryUnits: Dynamic;

var platformLiveDocumentAndHistoryPattern7: RegExp;

var platformLiveDocumentAndHistoryPattern8: RegExp;

function isPlatformLiveDocumentAndHistoryInsert(
  items?: Dynamic,
  options?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let label =
    typeof options == `string` &&
    platformLiveDocumentAndHistoryPattern8.test(options)
      ? `.${options}`
      : ``;
  let test: Dynamic = (
    platformLiveDocumentAndHistoryInsert?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformLiveDocumentAndHistoryPattern7.test(
      platformLiveDocumentAndHistoryInsert + label,
    )
      ? platformLiveDocumentAndHistoryInsert + label
      : platformLiveDocumentAndHistoryPattern7.test(
            platformLiveDocumentAndHistoryInsert,
          )
        ? platformLiveDocumentAndHistoryInsert
        : undefined;
  let item: Dynamic = items.find(
    (operation?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      operation.op === `insert` &&
      resolvePlatformLiveDocumentAndHistoryValue15(operation.source),
  );
  if (item !== undefined) {
    let source: Dynamic = item.source;
    let content: Dynamic = resolvePlatformLiveDocumentAndHistoryValue15(
      source.from,
    )
      ? source.from.content
      : undefined;
    if (typeof content == `string`)
      return test(
        `${resolvePlatformLiveDocumentAndHistoryValue16(Array.from<Dynamic>(content.slice(0, 4096)).length)}m0.e0.chars`,
      );
    if (!Array.isArray(content)) return;
    let filterPlatformLiveDocumentAndHistoryUnits2: Dynamic =
      filterPlatformLiveDocumentAndHistoryUnits(content);
    if (filterPlatformLiveDocumentAndHistoryUnits2.length === 0) return;
    let uniqueItems: Dynamic = new (Set as Dynamic)(
      filterPlatformLiveDocumentAndHistoryUnits2.flatMap(
        (
          filterPlatformLiveDocumentAndHistoryUnit?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => filterPlatformLiveDocumentAndHistoryUnit.marks,
      ),
    );
    let [items2, setItems]: Dynamic = [
      new (Set as Dynamic)(filterPlatformLiveDocumentAndHistoryUnits2[0].marks),
      new (Set as Dynamic)(
        filterPlatformLiveDocumentAndHistoryUnits2[
          filterPlatformLiveDocumentAndHistoryUnits2.length - 1
        ].marks,
      ),
    ];
    let some = [...uniqueItems].some(
      (item2?: Dynamic, ..._extraArguments: unknown[]) => !items2.has(item2),
    );
    let some2 = [...uniqueItems].some(
      (item2?: Dynamic, ..._extraArguments: unknown[]) => !setItems.has(item2),
    );
    return test(
      `${resolvePlatformLiveDocumentAndHistoryValue16(filterPlatformLiveDocumentAndHistoryUnits2.reduce((accumulator?: Dynamic, filterPlatformLiveDocumentAndHistoryUnit?: Dynamic, ..._extraArguments: unknown[]): Dynamic => accumulator + filterPlatformLiveDocumentAndHistoryUnit.units, 0))}m${Math.min(2, uniqueItems.size)}${filterPlatformLiveDocumentAndHistoryJoin(filterPlatformLiveDocumentAndHistoryUnits2.flatMap((filterPlatformLiveDocumentAndHistoryUnit?: Dynamic, ..._extraArguments: unknown[]): Dynamic => filterPlatformLiveDocumentAndHistoryUnit.kinds))}.${some && some2 ? `ebe` : some ? `eb` : some2 ? `ee` : `e0`}.${source.as === `blocks` ? `blk` : `inl`}`,
    );
  }
  let mappedItems: Dynamic = items.map(
    resolvePlatformLiveDocumentAndHistoryOne,
  );
  if (
    items.length > 0 &&
    mappedItems.every(
      (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
        mappedItem !== null,
    )
  ) {
    let label2 = mappedItems.every(
      (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
        mappedItem.on === true,
    )
      ? `on`
      : mappedItems.every(
            (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
              mappedItem.on === false,
          )
        ? `off`
        : `mix`;
    return test(
      `f${mappedItems.length >= 2 ? 2 : 1}${filterPlatformLiveDocumentAndHistoryJoin(mappedItems.flatMap((mappedItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic => mappedItem.styles))}.${label2}.${mappedItems.every((mappedItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic => mappedItem.one) ? `one` : `rng`}`,
    );
  }
}

var resolvePlatformLiveDocumentAndHistoryIsFinite2: (platformLiveDocumentAndHistoryIsFinite2?: unknown, ..._extraArguments: unknown[]) => "n1" | "n20" | "n5" | "n50";

var platformLiveDocumentAndHistoryPattern9: RegExp;

var resolvePlatformLiveDocumentAndHistoryDragMove: Dynamic;

function resolvePlatformLiveDocumentAndHistoryGesture2(
  platformLiveDocumentAndHistoryGesture2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryOther: Dynamic =
    resolvePlatformLiveDocumentAndHistoryOther(
      platformLiveDocumentAndHistoryGesture2.gesture,
    );
  let label = `ok:${platformLiveDocumentAndHistoryOther}:${resolvePlatformLiveDocumentAndHistoryValue12(platformLiveDocumentAndHistoryGesture2.ops, platformLiveDocumentAndHistoryGesture2.cell, platformLiveDocumentAndHistoryGesture2.cross === true)}`;
  let label2 = `${label}:${resolvePlatformLiveDocumentAndHistoryIsFinite2(platformLiveDocumentAndHistoryGesture2.run)}`;
  let platformLiveDocumentAndHistoryDragMove: Dynamic =
    resolvePlatformLiveDocumentAndHistoryDragMove(
      platformLiveDocumentAndHistoryOther,
      platformLiveDocumentAndHistoryGesture2.drag,
    );
  for (let resolvePlatformLiveDocumentAndHistoryGesture2Result of [
    ...(platformLiveDocumentAndHistoryDragMove === undefined
      ? []
      : [`${label2}:d${platformLiveDocumentAndHistoryDragMove}`]),
    label2,
    label,
  ] as Dynamic)
    if (
      platformLiveDocumentAndHistoryPattern4.test(
        resolvePlatformLiveDocumentAndHistoryGesture2Result,
      )
    )
      return resolvePlatformLiveDocumentAndHistoryGesture2Result;
}

function updatePlatformLiveDocumentAndHistoryTake(
  updatePlatformLiveDocumentAndHistoryTake2: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let max = Math.max(
    1,
    Math.floor(updatePlatformLiveDocumentAndHistoryTake2.n ?? 50),
  );
  let max2 = Math.max(
    0,
    Math.floor(updatePlatformLiveDocumentAndHistoryTake2.cap ?? 40),
  );
  let max3 = Math.max(
    0,
    Math.floor(updatePlatformLiveDocumentAndHistoryTake2.changeMax ?? 20),
  );
  let changeHoldMs: Dynamic =
    updatePlatformLiveDocumentAndHistoryTake2.changeHoldMs ?? 3e4;
  let lookup: Dynamic = new (Map as Dynamic)();
  let [seen, said, changes, run]: Dynamic = [0, 0, 0, 0];
  let updatePlatformLiveDocumentAndHistoryTakeResult: Dynamic;
  return {
    take: (
      updatePlatformLiveDocumentAndHistoryTake3?: Dynamic,
      ops?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let platformLiveDocumentAndHistoryCell: Dynamic =
        resolvePlatformLiveDocumentAndHistoryCell(
          updatePlatformLiveDocumentAndHistoryTake3,
        );
      let gesture: Dynamic = platformLiveDocumentAndHistoryCell?.g ?? `other`;
      seen += 1;
      let matchesUpdatePlatformLiveDocumentAndHistoryTakeResult =
        updatePlatformLiveDocumentAndHistoryTakeResult !== undefined &&
        updatePlatformLiveDocumentAndHistoryTakeResult !== gesture;
      run =
        updatePlatformLiveDocumentAndHistoryTakeResult === gesture
          ? run + 1
          : 1;
      updatePlatformLiveDocumentAndHistoryTakeResult = gesture;
      if (said >= max2) return;
      let lookupEntry: Dynamic = lookup.get(gesture);
      let why =
        seen === 1
          ? `first`
          : (seen - 1) % max == 0
            ? `nth`
            : matchesUpdatePlatformLiveDocumentAndHistoryTakeResult &&
                changes < max3 &&
                (lookupEntry === undefined ||
                  context - lookupEntry >= changeHoldMs)
              ? `change`
              : undefined;
      if (why === undefined) return;
      let [cell, cross]: Dynamic = [
        resolvePlatformLiveDocumentAndHistoryValue8(
          platformLiveDocumentAndHistoryCell,
        ),
        platformLiveDocumentAndHistoryCell?.cross === true,
      ];
      let component: Dynamic = resolvePlatformLiveDocumentAndHistoryGesture2({
        gesture: gesture,
        ops: ops,
        cell: cell,
        cross: cross,
        run: run,
        drag: platformLiveDocumentAndHistoryCell?.drag,
      });
      if (component !== undefined) {
        said += 1;
        if (why === `change`) {
          changes += 1;
        }
        lookup.set(gesture, context);
        return {
          component: component,
          gesture: gesture,
          ops: resolvePlatformLiveDocumentAndHistoryIsFinite(ops),
          cell: platformLiveDocumentAndHistoryCell?.cell === true,
          cross: cross,
          why: why,
          ...(platformLiveDocumentAndHistoryCell?.sh === undefined
            ? {}
            : {
                sh: platformLiveDocumentAndHistoryCell.sh,
              }),
        };
      }
    },
    state: (..._extraArguments: unknown[]): Dynamic => ({
      seen: seen,
      said: said,
      changes: changes,
    }),
  };
}

function updatePlatformLiveDocumentAndHistoryNote(
  updatePlatformLiveDocumentAndHistoryNote2: Dynamic = 256,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  return {
    note: (
      items?: unknown,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let platformLiveDocumentAndHistoryCell: Dynamic =
        resolvePlatformLiveDocumentAndHistoryCell(options);
      if (
        !(
          platformLiveDocumentAndHistoryCell === undefined ||
          typeof items != `string` ||
          items.length === 0 ||
          items.length > 128
        )
      )
        for (
          lookup.delete(items),
            lookup.set(items, platformLiveDocumentAndHistoryCell);
          lookup.size > updatePlatformLiveDocumentAndHistoryNote2;

        )
          lookup.delete(lookup.keys().next().value);
    },
    get: (
      updatePlatformLiveDocumentAndHistoryNote3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => lookup.get(updatePlatformLiveDocumentAndHistoryNote3),
    drop: (
      updatePlatformLiveDocumentAndHistoryNote3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void lookup.delete(updatePlatformLiveDocumentAndHistoryNote3),
    size: (..._extraArguments: unknown[]): Dynamic => lookup.size,
  };
}

var platformLiveDocumentAndHistorySet14: Dynamic;

var PlatformLiveDocumentAndHistoryUnclassed: string;

var resolvePlatformLiveDocumentAndHistoryValue17: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue18: (platformLiveDocumentAndHistoryValue18?: Dynamic, ..._extraArguments: unknown[]) => string;

function createPagesWriteGateRefusedEvent(
  pagesWriteGateRefusedEvent?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof pagesWriteGateRefusedEvent != `object` ||
    !pagesWriteGateRefusedEvent
  )
    return null;
  let {
    gate: pagesWriteGateRefusedEvent2,
    ops: ops,
    tele: pagesWriteGateRefusedEvent3,
  }: Dynamic = pagesWriteGateRefusedEvent;
  if (pagesWriteGateRefusedEvent2 === undefined) return null;
  let gate: Dynamic = resolvePlatformLiveDocumentAndHistoryValue17(
    pagesWriteGateRefusedEvent2,
  );
  let platformLiveDocumentAndHistoryCell: Dynamic =
    resolvePlatformLiveDocumentAndHistoryCell(pagesWriteGateRefusedEvent3);
  let gesture: Dynamic = platformLiveDocumentAndHistoryCell?.g ?? `other`;
  let [cell, cross]: Dynamic = [
    resolvePlatformLiveDocumentAndHistoryValue8(
      platformLiveDocumentAndHistoryCell,
    ),
    platformLiveDocumentAndHistoryCell?.cross === true,
  ];
  let key: Dynamic = resolvePlatformLiveDocumentAndHistoryGesture({
    gesture: gesture,
    need: resolvePlatformLiveDocumentAndHistoryValue18(gate),
    ops: ops,
    cell: cell,
    cross: cross,
  });
  return {
    name: `pages.write.gate_refused`,
    key: key,
    fields: {
      gate: gate,
      gesture: gesture,
      need: resolvePlatformLiveDocumentAndHistoryValue18(gate),
      nOps: resolvePlatformLiveDocumentAndHistoryIsFinite(ops),
      cellSel: platformLiveDocumentAndHistoryCell?.cell === true,
      crossed: cross,
      component: key,
      road: `write`,
    },
  };
}

var platformLiveDocumentAndHistoryValue04: Dynamic;

function createPagesWriteGateRefusedCappedEvent(
  pagesWriteGateRefusedCappedEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let pagesWriteGateRefusedEvent: Dynamic = createPagesWriteGateRefusedEvent(
    pagesWriteGateRefusedCappedEvent,
  );
  return pagesWriteGateRefusedEvent === null
    ? null
    : platformLiveDocumentAndHistoryValue04 < 200
      ? ((platformLiveDocumentAndHistoryValue04 += 1),
        pagesWriteGateRefusedEvent)
      : platformLiveDocumentAndHistoryValue04 > 200
        ? null
        : ((platformLiveDocumentAndHistoryValue04 += 1),
          {
            name: `pages.write.gate_refused.capped`,
            fields: {
              cap: 200,
              emitted: 200,
            },
          });
}

var PlatformLiveDocumentAndHistoryUnclassed2: string;

var platformLiveDocumentAndHistorySet15: Dynamic;

var platformLiveDocumentAndHistorySet16: Dynamic;

var platformLiveDocumentAndHistorySet17: Dynamic;

var resolvePlatformLiveDocumentAndHistoryReplace2: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue19: Dynamic;

var resolvePlatformLiveDocumentAndHistoryGestureUndone: Dynamic;

var resolvePlatformLiveDocumentAndHistoryPlain: Dynamic;

var platformLiveDocumentAndHistorySet18: Dynamic;

var resolvePlatformLiveDocumentAndHistorySplit2: Dynamic;

function createPagesFaceOpRefusedEvent(
  pagesFaceOpRefusedEvent?: Dynamic,
  options?: unknown,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let code: Dynamic = resolvePlatformLiveDocumentAndHistoryValue19(
    pagesFaceOpRefusedEvent,
  );
  let editors =
    typeof options == `string` &&
    platformLiveDocumentAndHistorySet16.has(options)
      ? options
      : undefined;
  let platformLiveDocumentAndHistorySplit2: Dynamic =
    code === `limit`
      ? resolvePlatformLiveDocumentAndHistorySplit2(context)
      : undefined;
  let key: Dynamic =
    platformLiveDocumentAndHistorySplit2 === undefined
      ? code
      : `${code}:${platformLiveDocumentAndHistorySplit2}`;
  return {
    name: `pages.face.op_refused`,
    key: key,
    fields: {
      code: code,
      component: key,
      ...(editors !== undefined && {
        editors: editors,
      }),
    },
    ...(code === `dead_input` && {
      wire: {
        word: resolvePlatformLiveDocumentAndHistoryPlain(context),
      },
    }),
  };
}

function resolvePlatformLiveDocumentAndHistoryValue20(
  platformLiveDocumentAndHistoryValue20?: Dynamic,
  options?: Dynamic,
  context: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  if (
    !resolvePlatformLiveDocumentAndHistoryGestureUndone(
      platformLiveDocumentAndHistoryValue20,
      options,
    )
  )
    try {
      emitTelemetryEvent(
        createPagesFaceOpRefusedEvent(
          platformLiveDocumentAndHistoryValue20,
          resolvePlatformKeyboardAndSaveStatusValue8(),
          options,
        ),
        undefined,
        context,
      );
    } catch {}
}

function resolvePlatformLiveDocumentAndHistoryFrame(
  contributor?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return contributor.pid
    ? contributor.frame
      ? contributor.viewerId
        ? `frame:${contributor.viewerId}|${contributor.pid}`
        : null
      : contributor.email
        ? `${contributor.email}|${contributor.pid}`
        : null
    : null;
}

var resolvePlatformLiveDocumentAndHistoryValue21: (platformLiveDocumentAndHistoryValue21?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformLiveDocumentAndHistoryValue22: (platformLiveDocumentAndHistoryValue22?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformLiveDocumentAndHistoryValue23: Dynamic;

function resolvePlatformLiveDocumentAndHistoryNode3(
  event?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!event || typeof event.key != `function`) return [];
  let platformLiveDocumentAndHistoryValue21 =
    resolvePlatformLiveDocumentAndHistoryValue21(options);
  let items: Dynamic = [];
  try {
    let items2: Dynamic = [];
    for (let index = 0; index < event.length; index++) {
      let key: Dynamic = event.key(index);
      if (
        key !== null &&
        key.startsWith(platformLiveDocumentAndHistoryValue21) &&
        key.length > platformLiveDocumentAndHistoryValue21.length
      ) {
        items2.push(key);
      }
    }
    items2.sort();
    for (let resolvePlatformLiveDocumentAndHistoryNode3Result of items2 as Dynamic) {
      let node: Dynamic =
        resolvePlatformLiveDocumentAndHistoryNode3Result.slice(
          platformLiveDocumentAndHistoryValue21.length,
        );
      let resolvePlatformLiveDocumentAndHistoryNode3Result2: Dynamic;
      try {
        resolvePlatformLiveDocumentAndHistoryNode3Result2 = JSON.parse(
          event.getItem(resolvePlatformLiveDocumentAndHistoryNode3Result) ??
            `[]`,
        );
      } catch {
        continue;
      }
      if (Array.isArray(resolvePlatformLiveDocumentAndHistoryNode3Result2))
        for (let ask of resolvePlatformLiveDocumentAndHistoryNode3Result2 as Dynamic) {
          if (
            !resolvePlatformLiveDocumentAndHistoryValue23(ask) ||
            typeof ask.bid != `string` ||
            typeof ask.text != `string` ||
            ask.text === ``
          )
            continue;
          let cut2 = resolvePlatformKeyboardAndSaveStatusKept(ask.cut);
          items.push({
            node: node,
            bid: ask.bid,
            afterId: typeof ask.afterId == `string` ? ask.afterId : null,
            text: ask.text,
            ...(cut2
              ? {
                  cut: cut2,
                }
              : {}),
          });
        }
    }
  } catch {}
  return items;
}

function filterPlatformLiveDocumentAndHistoryBid(
  filterPlatformLiveDocumentAndHistoryBid2?: Dynamic,
  options?: Dynamic,
  ask?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!filterPlatformLiveDocumentAndHistoryBid2) return;
  let label = `${resolvePlatformLiveDocumentAndHistoryValue21(options)}${ask.node}`;
  try {
    let parse: Dynamic = JSON.parse(
      filterPlatformLiveDocumentAndHistoryBid2.getItem(label) ?? `[]`,
    );
    let filterDataOperationControlBid2: Dynamic = filterDataOperationControlBid(
      Array.isArray(parse)
        ? parse.filter(
            (ask2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              resolvePlatformLiveDocumentAndHistoryValue23(ask2) &&
              typeof ask2.bid == `string` &&
              typeof ask2.text == `string`,
          )
        : [],
      {
        bid: ask.bid,
        afterId: ask.afterId,
        text: ``,
        only: true,
      },
    );
    if (filterDataOperationControlBid2.length === 0) {
      filterPlatformLiveDocumentAndHistoryBid2.removeItem(label);
    } else {
      filterPlatformLiveDocumentAndHistoryBid2.setItem(
        label,
        JSON.stringify(filterDataOperationControlBid2),
      );
    }
  } catch {}
}

function resolvePlatformLiveDocumentAndHistoryStaged(
  platformLiveDocumentAndHistoryStaged?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolvePlatformLiveDocumentAndHistoryStagedResult of platformLiveDocumentAndHistoryStaged as Dynamic)
    for (let {
      staged: resolvePlatformLiveDocumentAndHistoryStagedResult2,
      ...resolvePlatformLiveDocumentAndHistoryStagedResult3
    } of isPlatformKeyboardAndSaveStatusText(
      [],
      [resolvePlatformLiveDocumentAndHistoryStagedResult],
      context,
    ) as Dynamic)
      items.push(
        options
          ? {
              ...resolvePlatformLiveDocumentAndHistoryStagedResult3,
              node: resolvePlatformLiveDocumentAndHistoryStagedResult.node,
              drops: true,
              noDocument: true,
            }
          : {
              ...resolvePlatformLiveDocumentAndHistoryStagedResult3,
              node: resolvePlatformLiveDocumentAndHistoryStagedResult.node,
              drops: true,
              stands: true,
              noDocument: true,
            },
      );
  return items;
}

function usePlatformLiveDocumentAndHistoryPid(
  pid?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frame: Dynamic = inFrame();
  let email: Dynamic = PlatformApiAndAuthUser(
    (
      platformLiveDocumentAndHistoryPid?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformLiveDocumentAndHistoryPid.user?.email,
  );
  let viewerId: Dynamic = useCommentsEditorThen().id;
  let platformLiveDocumentAndHistoryFrame =
    resolvePlatformLiveDocumentAndHistoryFrame({
      pid: pid,
      frame: frame,
      email: email,
      viewerId: viewerId,
    });
  let countRef: Dynamic = (0, React.useRef)(0);
  let [lines, setLines]: Dynamic = (0, React.useState)([]);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (platformLiveDocumentAndHistoryFrame === null)
        return void setLines([]);
      setLines(
        resolvePlatformLiveDocumentAndHistoryStaged(
          resolvePlatformLiveDocumentAndHistoryNode3(
            resolvePlatformLiveDocumentAndHistorySessionStorage(),
            platformLiveDocumentAndHistoryFrame,
          ),
          options,
          (..._extraArguments: unknown[]): number => ++countRef.current,
        ),
      );
    },
    [platformLiveDocumentAndHistoryFrame, options],
  );
  return {
    lines: lines,
    dismiss: (0, React.useCallback)(
      (
        platformLiveDocumentAndHistoryPid?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let line: Dynamic = lines.find(
          (line2?: Dynamic, ..._extraArguments: unknown[]) =>
            line2.id === platformLiveDocumentAndHistoryPid,
        );
        if (line && platformLiveDocumentAndHistoryFrame !== null) {
          filterPlatformLiveDocumentAndHistoryBid(
            resolvePlatformLiveDocumentAndHistorySessionStorage(),
            platformLiveDocumentAndHistoryFrame,
            {
              node: line.node,
              bid: line.bid,
              afterId: line.afterId ?? null,
            },
          );
        }
        setLines(
          (
            platformLiveDocumentAndHistoryPid2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            platformLiveDocumentAndHistoryPid2.filter(
              (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                rolldownRImport2.id !== platformLiveDocumentAndHistoryPid,
            ),
        );
      },
      [lines, platformLiveDocumentAndHistoryFrame],
    ),
  };
}

function resolvePlatformLiveDocumentAndHistorySessionStorage(
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return (globalThis as Dynamic).sessionStorage;
  } catch {
    return;
  }
}

var resolvePlatformLiveDocumentAndHistoryText: Dynamic;

function resolvePlatformLiveDocumentAndHistoryHolds(
  platformLiveDocumentAndHistoryHolds?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (platformLiveDocumentAndHistoryHolds == null)
    return {
      holds: false,
      why: `no_store`,
    };
  let platformLiveDocumentAndHistoryFrame =
    resolvePlatformLiveDocumentAndHistoryFrame(options);
  if (platformLiveDocumentAndHistoryFrame === null || !options.node)
    return options.asked
      ? {
          holds: context === `required`,
          why: `no_key_yet`,
        }
      : {
          holds: false,
          why: `no_key`,
        };
  let resolvePlatformLiveDocumentAndHistoryHoldsResult: Dynamic;
  try {
    resolvePlatformLiveDocumentAndHistoryHoldsResult =
      platformLiveDocumentAndHistoryHolds.getItem(
        resolvePlatformLiveDocumentAndHistoryValue22(
          platformLiveDocumentAndHistoryFrame,
          options.node,
        ),
      );
  } catch {
    return {
      holds: false,
      why: `unreadable`,
    };
  }
  if (resolvePlatformLiveDocumentAndHistoryHoldsResult == null)
    return {
      holds: false,
      why: `none`,
    };
  let resolvePlatformLiveDocumentAndHistoryHoldsResult2: Dynamic;
  try {
    resolvePlatformLiveDocumentAndHistoryHoldsResult2 = JSON.parse(
      resolvePlatformLiveDocumentAndHistoryHoldsResult,
    );
  } catch {
    return {
      holds: false,
      why: `unparsed`,
    };
  }
  return Array.isArray(resolvePlatformLiveDocumentAndHistoryHoldsResult2)
    ? resolvePlatformLiveDocumentAndHistoryHoldsResult2.some(
        resolvePlatformLiveDocumentAndHistoryText,
      )
      ? {
          holds: true,
          why: `words`,
        }
      : {
          holds: false,
          why: `none`,
        }
    : {
        holds: false,
        why: `unparsed`,
      };
}

var resolvePlatformLiveDocumentAndHistoryWords: (platformLiveDocumentAndHistoryWords?: Dynamic, ..._extraArguments: unknown[]) => "staged" | "viewer" | null;

var resolvePlatformLiveDocumentAndHistoryHeld2: Dynamic;

function isPlatformLiveDocumentAndHistoryThen(
  platformLiveDocumentAndHistoryThen?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (platformLiveDocumentAndHistoryThen == null)
    return (..._extraArguments: unknown[]) => false;
  let enabled = true;
  let isPlatformLiveDocumentAndHistoryThenHandler = (
    ..._extraArguments: unknown[]
  ): undefined => void (enabled = false);
  try {
    platformLiveDocumentAndHistoryThen.then(
      isPlatformLiveDocumentAndHistoryThenHandler,
      isPlatformLiveDocumentAndHistoryThenHandler,
    );
  } catch {}
  try {
    context(isPlatformLiveDocumentAndHistoryThenHandler, options);
  } catch {
    isPlatformLiveDocumentAndHistoryThenHandler();
  }
  return (..._extraArguments: unknown[]) => enabled;
}

function resolvePlatformLiveDocumentAndHistoryPid(
  contributor?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isPlatformLiveDocumentAndHistoryThen2: Dynamic =
    isPlatformLiveDocumentAndHistoryThen(options, dependencies, argument);
  let frame = options != null;
  return (..._extraArguments: unknown[]): Dynamic => ({
    pid: contributor.pid,
    node: contributor.node,
    frame: frame,
    email: contributor.email,
    viewerId: context(),
    asked: isPlatformLiveDocumentAndHistoryThen2(),
  });
}

var PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision: string;

var platformLiveDocumentAndHistoryMap6: Dynamic;

var platformLiveDocumentAndHistoryMap7: Dynamic;

var platformLiveDocumentAndHistoryMap8: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue24: (platformLiveDocumentAndHistoryValue24?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

function updatePlatformLiveDocumentAndHistoryNobody(
  updatePlatformLiveDocumentAndHistoryNobody2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryMap6Entry: Dynamic =
    platformLiveDocumentAndHistoryMap6.get(
      updatePlatformLiveDocumentAndHistoryNobody2,
    );
  if (platformLiveDocumentAndHistoryMap6Entry === undefined) {
    platformLiveDocumentAndHistoryMap6.set(
      updatePlatformLiveDocumentAndHistoryNobody2,
      (platformLiveDocumentAndHistoryMap6Entry = new (Set as Dynamic)()),
    );
  }
  platformLiveDocumentAndHistoryMap6Entry.add(options);
  return (..._extraArguments: unknown[]): undefined => {
    let platformLiveDocumentAndHistoryMap6Entry2: Dynamic =
      platformLiveDocumentAndHistoryMap6.get(
        updatePlatformLiveDocumentAndHistoryNobody2,
      );
    if (
      !(
        platformLiveDocumentAndHistoryMap6Entry2 === undefined ||
        !platformLiveDocumentAndHistoryMap6Entry2.delete(options) ||
        platformLiveDocumentAndHistoryMap6Entry2.size > 0
      )
    ) {
      platformLiveDocumentAndHistoryMap6.delete(
        updatePlatformLiveDocumentAndHistoryNobody2,
      );
      platformLiveDocumentAndHistoryMap7.delete(
        updatePlatformLiveDocumentAndHistoryNobody2,
      );
      getPlatformLiveDocumentAndHistoryDone(
        updatePlatformLiveDocumentAndHistoryNobody2,
        (..._extraArguments: unknown[]) => `nobody`,
      );
    }
  };
}

function resolvePlatformLiveDocumentAndHistoryPartial(
  platformLiveDocumentAndHistoryPartial?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    platformLiveDocumentAndHistoryPartial.partial !== true ||
    (platformLiveDocumentAndHistoryPartial.delta === true &&
      platformLiveDocumentAndHistoryPartial.since !== undefined &&
      platformLiveDocumentAndHistoryPartial.more !== true &&
      platformLiveDocumentAndHistoryPartial.compare !== true)
  );
}

function updatePlatformLiveDocumentAndHistorySeated(
  updatePlatformLiveDocumentAndHistorySeated2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!(!Number.isFinite(options) || options < 0)) {
    if (
      platformLiveDocumentAndHistoryMap6.has(
        updatePlatformLiveDocumentAndHistorySeated2,
      )
    ) {
      platformLiveDocumentAndHistoryMap7.set(
        updatePlatformLiveDocumentAndHistorySeated2,
        Math.max(
          platformLiveDocumentAndHistoryMap7.get(
            updatePlatformLiveDocumentAndHistorySeated2,
          ) ?? -1,
          options,
        ),
      );
    }
    getPlatformLiveDocumentAndHistoryDone(
      updatePlatformLiveDocumentAndHistorySeated2,
      (
        updatePlatformLiveDocumentAndHistorySeated3?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        options >= updatePlatformLiveDocumentAndHistorySeated3.rev
          ? `seated`
          : null,
    );
  }
}

function updatePlatformLiveDocumentAndHistoryRev(
  updatePlatformLiveDocumentAndHistoryRev2?: Dynamic,
  rev?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryMap6Entry: Dynamic =
    platformLiveDocumentAndHistoryMap6.get(
      updatePlatformLiveDocumentAndHistoryRev2,
    );
  return platformLiveDocumentAndHistoryMap6Entry === undefined ||
    platformLiveDocumentAndHistoryMap6Entry.size === 0
    ? Promise.resolve(`nobody`)
    : (platformLiveDocumentAndHistoryMap7.get(
          updatePlatformLiveDocumentAndHistoryRev2,
        ) ?? -1) >= rev
      ? Promise.resolve(`already`)
      : new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let timers: Dynamic = context.timers ?? globalThis;
            let updatePlatformLiveDocumentAndHistoryRevResult: Dynamic = null;
            let record2: Dynamic = {
              rev: rev,
              done: (
                updatePlatformLiveDocumentAndHistoryRev3?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (updatePlatformLiveDocumentAndHistoryRevResult !== null) {
                  timers.clearTimeout(
                    updatePlatformLiveDocumentAndHistoryRevResult,
                  );
                }
                updatePlatformLiveDocumentAndHistoryRevResult = null;
                let filteredPlatformLiveDocumentAndHistoryMap8Entry: Dynamic = (
                  platformLiveDocumentAndHistoryMap8.get(
                    updatePlatformLiveDocumentAndHistoryRev2,
                  ) ?? []
                ).filter(
                  (
                    platformLiveDocumentAndHistoryMap8Entry?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) => platformLiveDocumentAndHistoryMap8Entry !== record2,
                );
                if (
                  filteredPlatformLiveDocumentAndHistoryMap8Entry.length > 0
                ) {
                  platformLiveDocumentAndHistoryMap8.set(
                    updatePlatformLiveDocumentAndHistoryRev2,
                    filteredPlatformLiveDocumentAndHistoryMap8Entry,
                  );
                } else {
                  platformLiveDocumentAndHistoryMap8.delete(
                    updatePlatformLiveDocumentAndHistoryRev2,
                  );
                }
                resolve(updatePlatformLiveDocumentAndHistoryRev3);
              },
            };
            platformLiveDocumentAndHistoryMap8.set(
              updatePlatformLiveDocumentAndHistoryRev2,
              [
                ...(platformLiveDocumentAndHistoryMap8.get(
                  updatePlatformLiveDocumentAndHistoryRev2,
                ) ?? []),
                record2,
              ],
            );
            updatePlatformLiveDocumentAndHistoryRevResult = timers.setTimeout(
              (..._extraArguments: unknown[]): Dynamic => record2.done(`cap`),
              context.capMs ?? 3e3,
            );
            for (let updatePlatformLiveDocumentAndHistoryRevResult2 of [
              ...platformLiveDocumentAndHistoryMap6Entry,
            ] as Dynamic)
              try {
                updatePlatformLiveDocumentAndHistoryRevResult2(rev);
              } catch {}
          },
        );
}

function getPlatformLiveDocumentAndHistoryDone(
  platformLiveDocumentAndHistoryDone?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let getPlatformLiveDocumentAndHistoryDoneResult of (platformLiveDocumentAndHistoryMap8.get(
    platformLiveDocumentAndHistoryDone,
  ) ?? []) as Dynamic) {
    let options2: Dynamic = options(
      getPlatformLiveDocumentAndHistoryDoneResult,
    );
    if (options2 !== null) {
      getPlatformLiveDocumentAndHistoryDoneResult.done(options2);
    }
  }
}

function resolvePlatformLiveDocumentAndHistoryFAILEDPRECONDITION(
  error?: Dynamic,
  options: Dynamic = inFrame(),
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    options &&
    error instanceof (EditorExtensionsFrameSendError as Dynamic) &&
    error.code === `FAILED_PRECONDITION`
  );
}

var platformLiveDocumentAndHistoryValue60000: number;

function resolvePlatformLiveDocumentAndHistoryRegranting(
  error?: Dynamic,
  options?: Dynamic,
  context: Dynamic = inFrame(),
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    context &&
    (options === true ? `regranting` : options === false ? null : options) !==
      null &&
    error instanceof (EditorExtensionsFrameSendError as Dynamic) &&
    (error.code === `TIMEOUT` || error.code === `INSTANCE_CHURN`)
  );
}

var PlatformLiveDocumentAndHistoryGone: string;

var PlatformLiveDocumentAndHistoryAnswerTooLarge: string;

function isPlatformLiveDocumentAndHistoryDeny(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (response.verdict !== `deny` || response.reason !== `gone`) return false;
  let data: Dynamic = response.data;
  return typeof data == `object` && !!data && data.object === `project`;
}

function usePlatformLiveDocumentAndHistoryState(
  door?: Dynamic,
  pid?: Dynamic,
  optimisticallyValidated: Dynamic = false,
  readPresence: Dynamic = (..._extraArguments: unknown[]) => null,
  ..._extraArguments: unknown[]
): Dynamic {
  let [authority, setAuthority]: Dynamic = (0, React.useState)({
    state: `pending`,
    pid: pid,
  });
  let readPresenceRef: Dynamic = (0, React.useRef)(readPresence);
  readPresenceRef.current = readPresence;
  let [projectValue, setProjectValue]: Dynamic = (0, React.useState)(null);
  let [error, setError]: Dynamic = (0, React.useState)(null);
  let [stale, setStale]: Dynamic = (0, React.useState)(false);
  let staleRef: Dynamic = (0, React.useRef)(false);
  let markStale = (
    platformLiveDocumentAndHistoryState?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    staleRef.current = platformLiveDocumentAndHistoryState;
    setStale(platformLiveDocumentAndHistoryState);
  };
  let [loading, setLoading]: Dynamic = (0, React.useState)(false);
  let pendingLoadRef: Dynamic = (0, React.useRef)(null);
  let loadingTimerRef: Dynamic = (0, React.useRef)(undefined);
  let clearLoading: Dynamic = (0, React.useCallback)(
    (
      platformLiveDocumentAndHistoryState?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = undefined;
      if (platformLiveDocumentAndHistoryState) {
        pendingLoadRef.current = null;
      }
      setLoading(false);
    },
    [],
  );
  let requestSequenceRef: Dynamic = (0, React.useRef)(0);
  let pidRef: Dynamic = (0, React.useRef)(pid);
  pidRef.current = pid;
  let refresh: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (!door || !pid || pid !== pidRef.current || staleRef.current) return;
      let usePlatformLiveDocumentAndHistoryStateResult: number =
        ++requestSequenceRef.current;
      resolveObservabilityBootPaint2(`firstRead`);
      let pid2: Dynamic = pid;
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        let ackOf2: Dynamic = ackOf(
          await door.call(`read`, {
            ref: {
              object: `project`,
              id: pid2,
            },
            engine: `json`,
            payload: {},
          }),
        );
        if (
          usePlatformLiveDocumentAndHistoryStateResult !==
          requestSequenceRef.current
        ) {
          if (ackOf2.verdict === `allow` || pid2 !== pidRef.current) return;
          setAuthority(
            (page?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              page.state === `validated` ||
              (page.state !== `pending` && page.pid !== pid2)
                ? page
                : (setProjectValue(null),
                  setError(null),
                  {
                    state: `denied`,
                    reason: ackOf2.reason ?? `deny`,
                    pid: pid2,
                  }),
          );
          return;
        }
        clearLoading(true);
        if (ackOf2.verdict === `allow`) {
          setAuthority({
            state: `validated`,
            pid: pid2,
          });
          setProjectValue(ackOf2.value ?? {});
          setError(null);
        } else {
          if (isPlatformLiveDocumentAndHistoryDeny(ackOf2)) {
            setAuthority(
              (page?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
                setProjectValue(null),
                setError(null),
                page.state === `validated` && page.pid === pid2
                  ? (markStale(true), page)
                  : {
                      state: `denied`,
                      reason: PlatformLiveDocumentAndHistoryGone,
                      pid: pid2,
                    }
              ),
            );
          } else {
            setAuthority({
              state: `denied`,
              reason: ackOf2.reason ?? `deny`,
              pid: pid2,
            });
            setProjectValue(null);
            setError(null);
          }
        }
      })().catch(
        (error2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            usePlatformLiveDocumentAndHistoryStateResult !==
            requestSequenceRef.current
          )
            return;
          let message =
            error2 instanceof Error ? error2.message : `project read failed`;
          let presence: Dynamic = readPresenceRef.current();
          let label: Dynamic =
            (presence === true
              ? `regranting`
              : presence === false
                ? null
                : presence) ??
            (error2 instanceof (EditorExtensionsFrameSendError as Dynamic) &&
            error2.code === `INSTANCE_CHURN`
              ? `connecting`
              : null);
          let platformLiveDocumentAndHistoryRegranting: Dynamic =
            resolvePlatformLiveDocumentAndHistoryRegranting(error2, label);
          let now = Date.now();
          let difference =
            platformLiveDocumentAndHistoryValue60000 -
            (now - (pendingLoadRef.current ?? now));
          let platformLiveDocumentAndHistoryRegranting2: Dynamic =
            platformLiveDocumentAndHistoryRegranting &&
            (label === `regranting` || difference > 0);
          if (platformLiveDocumentAndHistoryRegranting2) {
            pendingLoadRef.current ??= now;
            setLoading(true);
            setError(null);
            clearTimeout(loadingTimerRef.current);
            loadingTimerRef.current = undefined;
            if (label === `connecting`) {
              loadingTimerRef.current = setTimeout(
                (..._extraArguments: unknown[]): undefined => {
                  loadingTimerRef.current = undefined;
                  if (
                    usePlatformLiveDocumentAndHistoryStateResult !==
                      requestSequenceRef.current ||
                    pidRef.current !== pid2
                  )
                    return;
                  let presence2: Dynamic = readPresenceRef.current();
                  if (
                    (presence2 === true
                      ? `regranting`
                      : presence2 === false
                        ? null
                        : presence2) !== `regranting`
                  ) {
                    setLoading(false);
                    setAuthority(
                      (
                        page?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        page.pid === pid2
                          ? page.state === `validated`
                            ? (staleRef.current || setError(message), page)
                            : page.state === `pending`
                              ? {
                                  state: `failed`,
                                  message: message,
                                  pid: pid2,
                                }
                              : page
                          : page,
                    );
                  }
                },
                difference,
              );
            }
          } else {
            clearLoading(false);
          }
          setAuthority(
            (page?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              page.state === `denied` && page.pid === pid2
                ? page
                : page.state === `validated` && page.pid === pid2
                  ? resolvePlatformLiveDocumentAndHistoryFAILEDPRECONDITION(
                      error2,
                    )
                    ? (setProjectValue(null),
                      setError(null),
                      markStale(true),
                      page)
                    : (!staleRef.current &&
                        !platformLiveDocumentAndHistoryRegranting2 &&
                        setError(message),
                      page)
                  : resolvePlatformLiveDocumentAndHistoryFAILEDPRECONDITION(
                        error2,
                      ) || platformLiveDocumentAndHistoryRegranting2
                    ? (setProjectValue(null),
                      page.state === `pending` && page.pid === pid2
                        ? page
                        : {
                            state: `pending`,
                            pid: pid2,
                          })
                    : {
                        state: `failed`,
                        message: message,
                        pid: pid2,
                      },
          );
        },
      );
    },
    [door, pid, clearLoading],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      requestSequenceRef.current++,
      setAuthority({
        state: `pending`,
        pid: pidRef.current,
      }),
      setProjectValue(null),
      setError(null),
      markStale(false),
      clearLoading(true),
      refresh(),
      (..._extraArguments: unknown[]) => clearTimeout(loadingTimerRef.current)
    ),
    [refresh, clearLoading],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (optimisticallyValidated) {
        setAuthority(
          (
            platformLiveDocumentAndHistoryState?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            platformLiveDocumentAndHistoryState.state === `validated` ||
            platformLiveDocumentAndHistoryState.state === `denied`
              ? platformLiveDocumentAndHistoryState
              : {
                  state: `validated`,
                  pid: pid,
                },
        );
        clearLoading(true);
      }
    },
    [optimisticallyValidated, pid, refresh, clearLoading],
  );
  let validatedPid: Dynamic =
    authority.state === `validated` && authority.pid === pid
      ? authority.pid
      : undefined;
  return {
    authority: authority,
    staleRefresh: validatedPid === undefined ? null : error,
    gone: validatedPid !== undefined && stale,
    reconnecting: loading && authority.pid === pid,
    validatedPid: validatedPid,
    value: projectValue,
    refresh: refresh,
  };
}

var resolvePlatformLiveDocumentAndHistoryWidgetSession: Dynamic;

var resolvePlatformLiveDocumentAndHistoryWidgetNodeState: Dynamic;

var resolvePlatformLiveDocumentAndHistoryWidgetNodeLog: Dynamic;

var resolvePlatformLiveDocumentAndHistoryWidgetRunMessage: Dynamic;

var resolvePlatformLiveDocumentAndHistoryWidgetBundle: Dynamic;

var resolvePlatformLiveDocumentAndHistoryWidgetLineage: Dynamic;

var platformLiveDocumentAndHistoryMap9: Dynamic;

var platformLiveDocumentAndHistoryValue05: number;

var PlatformLiveDocumentAndHistoryLevels: Dynamic;

var loadPlatformLiveDocumentAndHistoryCatch: (platformLiveDocumentAndHistoryCatch?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => Promise<string | undefined>;

var resolvePlatformLiveDocumentAndHistoryError2: (platformLiveDocumentAndHistoryError2?: Dynamic, ..._extraArguments: unknown[]) => undefined;

async function loadPlatformLiveDocumentAndHistoryFile(
  platformLiveDocumentAndHistoryFile?: Dynamic,
  entry?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (entry.kind === `routine`) {
    let file = await loadPlatformLiveDocumentAndHistoryCatch(
      platformLiveDocumentAndHistoryFile,
      entry.name,
    );
    return file === undefined
      ? resolvePlatformLiveDocumentAndHistoryError2(entry.name)
      : void updateDataModelSchemasPath({
          file: file,
        });
  }
  try {
    let runsGet: Dynamic =
      await PlatformLiveDocumentAndHistoryWidgetBundle.runsGet(entry.id);
    if (runsGet.runner.type === `dispatcher` && runsGet.runner.name) {
      let file = await loadPlatformLiveDocumentAndHistoryCatch(
        platformLiveDocumentAndHistoryFile,
        runsGet.runner.name,
      );
      return file === undefined
        ? resolvePlatformLiveDocumentAndHistoryError2(runsGet.runner.name)
        : void updateDataModelSchemasPath({
            file: file,
            hash: `run-${entry.id}`,
          });
    }
    window.dispatchEvent(
      new CustomEvent(`bongo:openRuns`, {
        detail: {
          runId: entry.id,
        },
      }),
    );
  } catch {
    toast.error(`This run isn't readable here.`);
  }
}

var PlatformLiveDocumentAndHistoryBongoHello: string;

var PlatformLiveDocumentAndHistoryBongoContext: string;

var PlatformLiveDocumentAndHistoryBongoClose: string;

var platformLiveDocumentAndHistoryValue2000: number;

var platformLiveDocumentAndHistoryValue2562: number;

var platformLiveDocumentAndHistoryValue64: number;

var platformLiveDocumentAndHistoryContextCloseValues: string[];

var platformLiveDocumentAndHistoryPattern10: RegExp;

var platformLiveDocumentAndHistoryPattern11: RegExp;

var resolvePlatformLiveDocumentAndHistoryValue25: Dynamic;

var isPlatformLiveDocumentAndHistoryTest: (platformLiveDocumentAndHistoryTest?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolvePlatformLiveDocumentAndHistoryReplace3(
  platformLiveDocumentAndHistoryReplace3?: Dynamic,
  options: Dynamic = platformLiveDocumentAndHistoryValue2000,
  ..._extraArguments: unknown[]
): Dynamic {
  let replace: Dynamic = isPlatformLiveDocumentAndHistoryTest(
    platformLiveDocumentAndHistoryReplace3,
  )
    ? platformLiveDocumentAndHistoryReplace3.replace(
        platformLiveDocumentAndHistoryPattern10,
        (
          platformLiveDocumentAndHistoryReplace32?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          resolvePlatformLiveDocumentAndHistoryValue25(
            platformLiveDocumentAndHistoryReplace32,
          )
            ? platformLiveDocumentAndHistoryReplace32
            : ``,
      )
    : platformLiveDocumentAndHistoryReplace3;
  if (replace.length > options) {
    replace = replace.slice(0, options);
  }
  let charCodeAt: Dynamic =
    replace.length > 0 ? replace.charCodeAt(replace.length - 1) : 0;
  return charCodeAt >= 55296 && charCodeAt <= 56319
    ? replace.slice(0, -1)
    : replace;
}

var resolvePlatformLiveDocumentAndHistoryTest5: Dynamic;

function resolvePlatformLiveDocumentAndHistoryRouteProjectId(
  platformLiveDocumentAndHistoryRouteProjectId?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformLiveDocumentAndHistoryRouteProjectId.routeProjectId &&
    resolveDataContentAndReferencesTest5(
      platformLiveDocumentAndHistoryRouteProjectId.routeProjectId,
    )
    ? platformLiveDocumentAndHistoryRouteProjectId.routeProjectId
    : platformLiveDocumentAndHistoryRouteProjectId.validatedProjectId ||
        undefined;
}

function resolvePlatformLiveDocumentAndHistoryProject(
  platformLiveDocumentAndHistoryProject?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    type: PlatformLiveDocumentAndHistoryBongoHello,
    v: 1,
    project: {
      id: platformLiveDocumentAndHistoryProject.projectId,
    },
    header: true,
    capabilities: [...platformLiveDocumentAndHistoryContextCloseValues],
  };
}

function resolvePlatformLiveDocumentAndHistoryProject2(
  platformLiveDocumentAndHistoryProject2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    type: PlatformLiveDocumentAndHistoryBongoClose,
    v: 1,
    project: {
      id: platformLiveDocumentAndHistoryProject2.projectId,
    },
    userGesture: true,
  };
}

var isPlatformLiveDocumentAndHistoryIsTrusted: Dynamic;

function resolvePlatformLiveDocumentAndHistoryNodeId4(
  platformLiveDocumentAndHistoryNodeId4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let nodeId: Dynamic = platformLiveDocumentAndHistoryNodeId4.tab
    ? resolvePlatformLiveDocumentAndHistoryTest5(
        platformLiveDocumentAndHistoryNodeId4.tab.nodeId,
      )
    : undefined;
  let tab: Dynamic =
    platformLiveDocumentAndHistoryNodeId4.tab && nodeId
      ? {
          nodeId: nodeId,
          title: resolvePlatformLiveDocumentAndHistoryReplace3(
            platformLiveDocumentAndHistoryNodeId4.tab.title,
            platformLiveDocumentAndHistoryValue2562,
          ),
        }
      : null;
  let selection: Dynamic = null;
  if (
    platformLiveDocumentAndHistoryNodeId4.selection &&
    typeof platformLiveDocumentAndHistoryNodeId4.selection.text == `string`
  ) {
    let text: Dynamic = resolvePlatformLiveDocumentAndHistoryReplace3(
      platformLiveDocumentAndHistoryNodeId4.selection.text,
    );
    if (text.trim()) {
      let nodeId2: Dynamic = resolvePlatformLiveDocumentAndHistoryTest5(
        platformLiveDocumentAndHistoryNodeId4.selection.nodeId,
      );
      selection = {
        text: text,
        ...(nodeId2
          ? {
              nodeId: nodeId2,
            }
          : {}),
        ...(platformLiveDocumentAndHistoryNodeId4.selection.userGesture === true
          ? {
              userGesture: true,
            }
          : {}),
      };
    }
  }
  return {
    type: PlatformLiveDocumentAndHistoryBongoContext,
    v: 1,
    project: {
      id: platformLiveDocumentAndHistoryNodeId4.projectId,
    },
    tab: tab,
    selection: selection,
  };
}

var resolvePlatformLiveDocumentAndHistoryProject3: Dynamic;

function resolvePlatformLiveDocumentAndHistoryType(
  platformLiveDocumentAndHistoryType?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return (
    typeof platformLiveDocumentAndHistoryType == `object` &&
    !!platformLiveDocumentAndHistoryType &&
    platformLiveDocumentAndHistoryType.type === `bongo:context?`
  );
}

function isPlatformLiveDocumentAndHistorySource(
  platformLiveDocumentAndHistorySource?: Dynamic,
  ref?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    platformLiveDocumentAndHistorySource.source === null ||
    platformLiveDocumentAndHistorySource.source !== ref.parent ||
    !resolvePlatformSyncAndRoutingValue14(
      platformLiveDocumentAndHistorySource.origin,
      ref.selfOrigin,
    ) ||
    !resolvePlatformLiveDocumentAndHistoryType(
      platformLiveDocumentAndHistorySource.data,
    )
  )
    return false;
  ref.onTrustedParentOrigin(platformLiveDocumentAndHistorySource.origin);
  let ref2: Dynamic = ref.current() ?? ref.hello();
  if (!ref2) return false;
  try {
    platformLiveDocumentAndHistorySource.source.postMessage(
      ref2,
      platformLiveDocumentAndHistorySource.origin,
    );
    return true;
  } catch {
    return false;
  }
}

var resolvePlatformLiveDocumentAndHistoryNull: Dynamic;

function resolvePlatformLiveDocumentAndHistoryNull2(
  platformLiveDocumentAndHistoryNull2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformSyncAndRoutingValue142: Dynamic = (
    platformLiveDocumentAndHistoryNull22?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof platformLiveDocumentAndHistoryNull22 == `string` &&
    platformLiveDocumentAndHistoryNull22 !== `` &&
    platformLiveDocumentAndHistoryNull22 !== `null` &&
    platformLiveDocumentAndHistoryNull22 !== `*` &&
    resolvePlatformSyncAndRoutingValue14(
      platformLiveDocumentAndHistoryNull22,
      platformLiveDocumentAndHistoryNull2.selfOrigin,
    );
  if (
    resolvePlatformSyncAndRoutingValue142(
      platformLiveDocumentAndHistoryNull2.firstTrustedInboundOrigin,
    )
  )
    return platformLiveDocumentAndHistoryNull2.firstTrustedInboundOrigin;
  let ancestorOriginItem: Dynamic =
    platformLiveDocumentAndHistoryNull2.ancestorOrigins &&
    platformLiveDocumentAndHistoryNull2.ancestorOrigins.length > 0
      ? platformLiveDocumentAndHistoryNull2.ancestorOrigins[0]
      : null;
  if (resolvePlatformSyncAndRoutingValue142(ancestorOriginItem))
    return ancestorOriginItem;
  let platformLiveDocumentAndHistoryNull: Dynamic =
    resolvePlatformLiveDocumentAndHistoryNull(
      platformLiveDocumentAndHistoryNull2.referrer,
    );
  return resolvePlatformSyncAndRoutingValue142(
    platformLiveDocumentAndHistoryNull,
  )
    ? platformLiveDocumentAndHistoryNull
    : null;
}

function isPlatformLiveDocumentAndHistoryParent(
  platformLiveDocumentAndHistoryParent?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !platformLiveDocumentAndHistoryParent ||
    !options ||
    options === `*` ||
    platformLiveDocumentAndHistoryParent.parent ===
      platformLiveDocumentAndHistoryParent
  )
    return false;
  try {
    platformLiveDocumentAndHistoryParent.parent.postMessage(context, options);
    return true;
  } catch {
    return false;
  }
}

function usePlatformLiveDocumentAndHistoryEnabled(
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { enabled: options2, projectId: validatedProjectId }: Dynamic = options;
  let hostProjectId: Dynamic =
    resolvePlatformLiveDocumentAndHistoryRouteProjectId({
      routeProjectId: options.routeProjectId,
      validatedProjectId: validatedProjectId,
    });
  let tabNodeId: Dynamic = options.tab?.nodeId ?? null;
  let tabTitle: Dynamic = options.tab?.title ?? ``;
  let selection: Dynamic = EditorSelectionAndTablesSelection(
    (
      platformLiveDocumentAndHistoryEnabled?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformLiveDocumentAndHistoryEnabled.selection,
  );
  let pinNonce: Dynamic = EditorSelectionAndTablesSelection(
    (
      platformLiveDocumentAndHistoryEnabled?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformLiveDocumentAndHistoryEnabled.pinNonce,
  );
  let tabSelection: Dynamic =
    selection && tabNodeId !== null && selection.fileId === tabNodeId
      ? selection
      : null;
  let [trustedOrigin, setTrustedOrigin]: Dynamic = (0, React.useState)(null);
  let inFrame2 = typeof window !== "undefined" && window.parent !== window;
  let active: Dynamic = options2 && inFrame2;
  let shellOrigin: Dynamic = active
    ? resolvePlatformLiveDocumentAndHistoryNull2({
        firstTrustedInboundOrigin: trustedOrigin,
        ancestorOrigins: window.location.ancestorOrigins,
        referrer: document.referrer,
        selfOrigin: window.location.origin,
      })
    : null;
  let viewerContext: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    validatedProjectId
      ? resolvePlatformLiveDocumentAndHistoryNodeId4({
          projectId: validatedProjectId,
          tab:
            tabNodeId === null
              ? null
              : {
                  nodeId: tabNodeId,
                  title: tabTitle,
                },
          selection: tabSelection
            ? {
                text: tabSelection.text,
                nodeId: tabSelection.nodeId,
                userGesture: tabSelection.userGesture === true,
              }
            : null,
        })
      : null;
  let projectContext: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    hostProjectId
      ? resolvePlatformLiveDocumentAndHistoryProject({
          projectId: hostProjectId,
        })
      : null;
  let viewerContextRef: Dynamic = (0, React.useRef)(viewerContext);
  viewerContextRef.current = viewerContext;
  let projectContextRef: Dynamic = (0, React.useRef)(projectContext);
  projectContextRef.current = projectContext;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!active) return;
      let isPlatformLiveDocumentAndHistorySource2 = (
        platformLiveDocumentAndHistoryEnabled?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        isPlatformLiveDocumentAndHistorySource(
          platformLiveDocumentAndHistoryEnabled,
          {
            selfOrigin: window.location.origin,
            parent: window.parent,
            current: (..._extraArguments: unknown[]): Dynamic =>
              viewerContextRef.current(),
            hello: (..._extraArguments: unknown[]): Dynamic =>
              projectContextRef.current(),
            onTrustedParentOrigin: (
              platformLiveDocumentAndHistoryEnabled2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              setTrustedOrigin(
                (
                  platformLiveDocumentAndHistoryEnabled3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  platformLiveDocumentAndHistoryEnabled3 ??
                  platformLiveDocumentAndHistoryEnabled2,
              ),
          },
        );
      };
      window.addEventListener(
        `message`,
        isPlatformLiveDocumentAndHistorySource2,
      );
      return (..._extraArguments: unknown[]) =>
        window.removeEventListener(
          `message`,
          isPlatformLiveDocumentAndHistorySource2,
        );
    },
    [active],
  );
  let viewerPortRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!active || !shellOrigin || !hostProjectId) return;
      let label = `${hostProjectId}\n${shellOrigin}`;
      if (
        viewerPortRef.current !== label &&
        isPlatformLiveDocumentAndHistoryParent(
          window,
          shellOrigin,
          projectContextRef.current(),
        )
      ) {
        viewerPortRef.current = label;
      }
    },
    [active, shellOrigin, hostProjectId],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (options2) {
        EditorSelectionAndTablesSelection.getState().clear();
      }
    },
    [options2, tabNodeId],
  );
  let projectPortRef: Dynamic = (0, React.useRef)(null);
  let selectedText: Dynamic = tabSelection?.text ?? null;
  let selectedNodeId: Dynamic = tabSelection?.nodeId ?? null;
  let userGesture = tabSelection?.userGesture === true;
  let pinned = tabSelection?.pinned === true;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!active || !shellOrigin) return;
      let viewerContext2: Dynamic = viewerContextRef.current();
      if (!viewerContext2) return;
      let label = `${shellOrigin}\n${resolvePlatformLiveDocumentAndHistoryProject3(viewerContext2)}\n${pinned ? pinNonce : ``}`;
      if (
        label !== projectPortRef.current &&
        isPlatformLiveDocumentAndHistoryParent(
          window,
          shellOrigin,
          viewerContext2,
        )
      ) {
        projectPortRef.current = label;
      }
    },
    [
      active,
      shellOrigin,
      validatedProjectId,
      tabNodeId,
      tabTitle,
      selectedText,
      selectedNodeId,
      userGesture,
      pinned,
      pinNonce,
    ],
  );
  return {
    close:
      active && shellOrigin && hostProjectId
        ? (
            platformLiveDocumentAndHistoryEnabled?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (
              isPlatformLiveDocumentAndHistoryIsTrusted(
                platformLiveDocumentAndHistoryEnabled,
              )
            ) {
              isPlatformLiveDocumentAndHistoryParent(
                window,
                shellOrigin,
                resolvePlatformLiveDocumentAndHistoryProject2({
                  projectId: hostProjectId,
                }),
              );
            }
          }
        : null,
  };
}

function usePlatformLiveDocumentAndHistoryState2(
  platformLiveDocumentAndHistoryState2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [
    platformLiveDocumentAndHistoryState2State,
    setPlatformLiveDocumentAndHistoryState2State,
  ]: Dynamic = (0, React.useState)(platformLiveDocumentAndHistoryState2);
  if (
    platformLiveDocumentAndHistoryState2 &&
    !platformLiveDocumentAndHistoryState2State
  ) {
    setPlatformLiveDocumentAndHistoryState2State(true);
  }
  return (
    platformLiveDocumentAndHistoryState2State ||
    platformLiveDocumentAndHistoryState2
  );
}

function usePlatformLiveDocumentAndHistoryDeadReason(
  platformLiveDocumentAndHistoryDeadReason?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [deadReason, setDeadReason]: Dynamic = (0, React.useState)(null);
  let [userCapability, setUserCapability]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!inFrame()) return;
    let enabled = true;
    frameUserCapability().then(
      (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (enabled) {
          setUserCapability(result);
        }
      },
    );
    return (..._extraArguments: unknown[]): undefined => {
      enabled = false;
    };
  }, []);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!platformLiveDocumentAndHistoryDeadReason || !inFrame()))
        return subscribeFrameDeadReason(
          `project/${platformLiveDocumentAndHistoryDeadReason}`,
          setDeadReason,
        );
    },
    [platformLiveDocumentAndHistoryDeadReason],
  );
  return !platformLiveDocumentAndHistoryDeadReason || !inFrame()
    ? false
    : resolveObservabilityBrowserAndOperationEventsNOTENABLED({
        deadReason: deadReason,
        userCapability: userCapability,
        search: typeof location === "undefined" ? `` : location.search,
      });
}

function usePlatformLiveDocumentAndHistoryCurrent(
  platformLiveDocumentAndHistoryCurrent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [optionsState, setOptionsState]: Dynamic = (0, React.useState)(options);
  let optionsRef: Dynamic = (0, React.useRef)(options);
  return [
    optionsState,
    (0, React.useCallback)(
      (
        platformLiveDocumentAndHistoryCurrent2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let platformLiveDocumentAndHistoryCurrent3: Dynamic =
          platformLiveDocumentAndHistoryCurrent(
            optionsRef.current,
            platformLiveDocumentAndHistoryCurrent2,
          );
        if (platformLiveDocumentAndHistoryCurrent3 !== optionsRef.current) {
          optionsRef.current = platformLiveDocumentAndHistoryCurrent3;
          setOptionsState(
            (..._extraArguments: unknown[]): Dynamic =>
              platformLiveDocumentAndHistoryCurrent3,
          );
        }
      },
      [platformLiveDocumentAndHistoryCurrent],
    ),
  ];
}

var PlatformLiveDocumentAndHistoryInbound: Dynamic;

var PlatformLiveDocumentAndHistoryTake: Dynamic;

function usePlatformLiveDocumentAndHistoryCurrent2(
  platformLiveDocumentAndHistoryCurrent2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = PlatformLiveDocumentAndHistoryInbound,
  argument: Dynamic = PlatformLiveDocumentAndHistoryTake,
  argument2: Dynamic = frameCurrentAnchor,
  ..._extraArguments: unknown[]
): undefined {
  let elementRef: Dynamic = (0, React.useRef)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        !platformLiveDocumentAndHistoryCurrent2 ||
        options === undefined ||
        !context ||
        elementRef.current === options
      )
        return;
      let matchesElement = elementRef.current === undefined;
      elementRef.current = options;
      let take: Dynamic = argument.take(options);
      if (!matchesElement) {
        argument2(resolvePlatformSessionAndSourcesTab6(options, take));
        return;
      }
      let platformSessionAndSourcesTab5: Dynamic =
        resolvePlatformSessionAndSourcesTab5(
          options,
          dependencies.inbound,
          dependencies.landing(),
        );
      if (platformSessionAndSourcesTab5 !== null) {
        argument2(platformSessionAndSourcesTab5);
      }
    },
    [
      platformLiveDocumentAndHistoryCurrent2,
      options,
      context,
      dependencies,
      argument,
      argument2,
    ],
  );
}

var platformLiveDocumentAndHistoryValue10000: number;

function resolvePlatformLiveDocumentAndHistoryByPage(
  platformLiveDocumentAndHistoryByPage?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let useCommentStoreState: Dynamic = useCommentStore.getState();
  return resolveEditorSelectionAndTablesKeys(
    [useCommentStoreState.byPage, useCommentStoreState.allByPage],
    platformLiveDocumentAndHistoryByPage,
  );
}

function usePlatformLiveDocumentAndHistoryEnabled2(
  platformLiveDocumentAndHistoryEnabled2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let {
    enabled: platformLiveDocumentAndHistoryEnabled22,
    pid: platformLiveDocumentAndHistoryEnabled23,
    fileId: platformLiveDocumentAndHistoryEnabled24,
    waitMs:
      platformLiveDocumentAndHistoryEnabled25 = platformLiveDocumentAndHistoryValue10000,
  }: Dynamic = platformLiveDocumentAndHistoryEnabled2;
  let elementRef: Dynamic = (0, React.useRef)(undefined);
  if (elementRef.current === undefined) {
    elementRef.current =
      platformLiveDocumentAndHistoryEnabled22 && typeof location !== "undefined"
        ? resolveEditorSelectionAndTablesHash({
            hash: location.hash,
          })
        : null;
  }
  let matchesElementRef: Dynamic = (0, React.useRef)(
    elementRef.current === null,
  );
  let elementRef2: Dynamic = (0, React.useRef)(undefined);
  let platformLiveDocumentAndHistoryEnabled2Ref: Dynamic = (0, React.useRef)(
    platformLiveDocumentAndHistoryEnabled2,
  );
  platformLiveDocumentAndHistoryEnabled2Ref.current =
    platformLiveDocumentAndHistoryEnabled2;
  let label =
    platformLiveDocumentAndHistoryEnabled24 === undefined
      ? undefined
      : `${platformLiveDocumentAndHistoryEnabled23}/${platformLiveDocumentAndHistoryEnabled24}`;
  if (
    !matchesElementRef.current &&
    label !== undefined &&
    elementRef2.current !== undefined &&
    label !== elementRef2.current
  ) {
    matchesElementRef.current = true;
  }
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (matchesElementRef.current || label === undefined) return;
      let element: Dynamic = elementRef.current;
      if (element == null) return;
      elementRef2.current ??= label;
      if (elementRef2.current !== label) {
        matchesElementRef.current = true;
        return;
      }
      let usePlatformLiveDocumentAndHistoryEnabled2Handler = (
        ..._extraArguments: unknown[]
      ): undefined => {};
      let usePlatformLiveDocumentAndHistoryEnabled2Result: Dynamic;
      let usePlatformLiveDocumentAndHistoryEnabled2Handler2 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        usePlatformLiveDocumentAndHistoryEnabled2Handler();
        usePlatformLiveDocumentAndHistoryEnabled2Handler = (
          ..._extraArguments: unknown[]
        ): undefined => {};
        if (usePlatformLiveDocumentAndHistoryEnabled2Result !== undefined) {
          clearTimeout(usePlatformLiveDocumentAndHistoryEnabled2Result);
        }
        usePlatformLiveDocumentAndHistoryEnabled2Result = undefined;
      };
      let usePlatformLiveDocumentAndHistoryEnabled2Handler3 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        matchesElementRef.current = true;
        usePlatformLiveDocumentAndHistoryEnabled2Handler2();
      };
      let usePlatformLiveDocumentAndHistoryEnabled2Handler4 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        if (matchesElementRef.current) return;
        let platformLiveDocumentAndHistoryByPage: Dynamic =
          resolvePlatformLiveDocumentAndHistoryByPage(element);
        if (platformLiveDocumentAndHistoryByPage === null) return;
        let {
          tabOfPage: platformLiveDocumentAndHistoryEnabled26,
          openTab: platformLiveDocumentAndHistoryEnabled27,
          fileId: platformLiveDocumentAndHistoryEnabled28,
        }: Dynamic = platformLiveDocumentAndHistoryEnabled2Ref.current;
        let platformLiveDocumentAndHistoryEnabled29: Dynamic =
          platformLiveDocumentAndHistoryEnabled26(
            platformLiveDocumentAndHistoryByPage,
          );
        usePlatformLiveDocumentAndHistoryEnabled2Handler3();
        if (
          resolveEditorSelectionAndTablesHash({
            hash: location.hash,
          }) === element &&
          platformLiveDocumentAndHistoryEnabled29 !== undefined &&
          platformLiveDocumentAndHistoryEnabled29 !==
            platformLiveDocumentAndHistoryEnabled28
        ) {
          platformLiveDocumentAndHistoryEnabled27(
            platformLiveDocumentAndHistoryEnabled29,
          );
        }
      };
      usePlatformLiveDocumentAndHistoryEnabled2Handler =
        useCommentStore.subscribe(
          usePlatformLiveDocumentAndHistoryEnabled2Handler4,
        );
      usePlatformLiveDocumentAndHistoryEnabled2Result = setTimeout(
        usePlatformLiveDocumentAndHistoryEnabled2Handler3,
        platformLiveDocumentAndHistoryEnabled25,
      );
      usePlatformLiveDocumentAndHistoryEnabled2Handler4();
      return usePlatformLiveDocumentAndHistoryEnabled2Handler2;
    },
    [label, platformLiveDocumentAndHistoryEnabled25],
  );
}

var PlatformLiveDocumentAndHistoryDeclare: Dynamic;

var PlatformLiveDocumentAndHistoryDeclare2: Dynamic;

function usePlatformLiveDocumentAndHistoryDisabled(
  platformLiveDocumentAndHistoryDisabled?: Dynamic,
  options?: Dynamic,
  context: Dynamic = PlatformLiveDocumentAndHistoryDeclare,
  ..._extraArguments: unknown[]
): undefined {
  let optionsRef: Dynamic = (0, React.useRef)(options);
  optionsRef.current = options;
  let mappedOptionsText: Dynamic = options
    .map(
      (option?: Dynamic, ..._extraArguments: unknown[]) =>
        `${option.id}${option.disabled ? `!` : ``}`,
    )
    .join(`,`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (platformLiveDocumentAndHistoryDisabled) {
        context.declare(
          optionsRef.current.map(
            (
              { id: id, disabled: disabled }: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              disabled
                ? {
                    id: id,
                    disabled: disabled,
                  }
                : {
                    id: id,
                  },
          ),
        );
      }
    },
    [platformLiveDocumentAndHistoryDisabled, mappedOptionsText, context],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!platformLiveDocumentAndHistoryDisabled) return;
      let mappedOptions: Dynamic = optionsRef.current.map(
        (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          context.onAction(
            option.id,
            (
              platformLiveDocumentAndHistoryDisabled2?: Dynamic,
              options2?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let option2: Dynamic = optionsRef.current.find(
                (option3?: Dynamic, ..._extraArguments: unknown[]) =>
                  option3.id === platformLiveDocumentAndHistoryDisabled2,
              );
              if (option2 && !option2.disabled) {
                option2.run(options2);
              }
            },
          ),
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        mappedOptions.forEach(
          (mappedOption?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            mappedOption(),
        );
    },
    [platformLiveDocumentAndHistoryDisabled, mappedOptionsText, context],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (platformLiveDocumentAndHistoryDisabled)
        return (..._extraArguments: unknown[]): Dynamic =>
          context.declare(null);
    },
    [platformLiveDocumentAndHistoryDisabled, context],
  );
}

var PlatformLiveDocumentAndHistoryDeclare3: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformLiveDocumentAndHistory2Step1(): void {
  (platformLiveDocumentAndHistoryPattern4 = /^[a-z0-9_:-]{1,32}$/);
  (platformLiveDocumentAndHistoryPattern5 = /^[a-z0-9_]{1,24}$/);
  (resolvePlatformLiveDocumentAndHistoryIsFinite = (
    platformLiveDocumentAndHistoryIsFinite?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryIsFinite == `number` &&
    Number.isFinite(platformLiveDocumentAndHistoryIsFinite)
      ? Math.min(
          99,
          Math.max(1, Math.round(platformLiveDocumentAndHistoryIsFinite)),
        )
      : 1);
  (resolvePlatformLiveDocumentAndHistoryValue12 = (
    platformLiveDocumentAndHistoryValue12?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${resolvePlatformLiveDocumentAndHistoryIsFinite(platformLiveDocumentAndHistoryValue12)}c${options === true ? 1 : options === 1 || options === 2 || options === 3 ? options : 0}x${+!!context}`);
  (platformLiveDocumentAndHistorySet11 = new (Set as Dynamic)([
    `t1`,
    `t2f`,
    `t2u`,
    `t2r`,
    `td`,
    `bv`,
  ]));
  (resolvePlatformLiveDocumentAndHistoryValue13 = (
    platformLiveDocumentAndHistoryValue13?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryValue13 == `string` &&
    platformLiveDocumentAndHistorySet11.has(platformLiveDocumentAndHistoryValue13)
      ? platformLiveDocumentAndHistoryValue13
      : undefined);
  (resolvePlatformLiveDocumentAndHistoryValue14 = (
    platformLiveDocumentAndHistoryValue14?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryValue14 == `object` &&
    !!platformLiveDocumentAndHistoryValue14);
  (platformLiveDocumentAndHistorySet12 = new (Set as Dynamic)([
    `split`,
    `join`,
    `move`,
    `wrap`,
    `unwrap`,
    `block_split`,
    `block_join`,
    `block_move`,
  ]));
  (resolvePlatformLiveDocumentAndHistoryOther4 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      !resolvePlatformLiveDocumentAndHistoryValue14(event) ||
      typeof event.op != `string`
    )
      return null;
    if (platformLiveDocumentAndHistorySet12.has(event.op)) return `other`;
    let kind: Dynamic = resolvePlatformLiveDocumentAndHistoryValue14(event.target)
      ? event.target.kind
      : undefined;
    return event.op === `insert`
      ? resolvePlatformLiveDocumentAndHistoryValue14(event.source) &&
        event.source.as === `blocks`
        ? `other`
        : null
      : event.op === `delete` || event.op === `replace` || event.op === `set`
        ? kind === `blocks`
          ? `other`
          : null
        : event.op === `revive`
          ? event.blocks === undefined
            ? null
            : `revive`
          : null;
  });
  (platformLiveDocumentAndHistoryPnValues = [`pn`]);
  (platformLiveDocumentAndHistoryCnValues = [`cn`]);
  (platformLiveDocumentAndHistoryFxValues = [`fx`]);
  (platformLiveDocumentAndHistoryPattern6 = /^[a-z0-9_:.-]{1,32}$/);
  (PlatformLiveDocumentAndHistoryFirst = {
    first: `first`,
    nth: `nth`,
    change: `chg`,
  });
  (resolvePlatformLiveDocumentAndHistoryValue15 = (
    platformLiveDocumentAndHistoryValue15?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryValue15 == `object` &&
    !!platformLiveDocumentAndHistoryValue15 &&
    !Array.isArray(platformLiveDocumentAndHistoryValue15));
  (platformLiveDocumentAndHistoryValue128 = 128);
  (resolvePlatformLiveDocumentAndHistoryOne = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (event.op === `mark` && typeof event.on == `boolean`) {
      let range: Dynamic = Array.isArray(event.range) ? event.range : [];
      return {
        on: event.on,
        one:
          range.length === 2 &&
          typeof range[0] == `string` &&
          range[0] === range[1],
        styles: typeof event.style == `string` ? [event.style] : [],
      };
    }
    if (
      event.op === `format` &&
      resolvePlatformLiveDocumentAndHistoryValue15(event.target)
    ) {
      let range: Dynamic = Array.isArray(event.target.range)
        ? event.target.range
        : [];
      let [items, setItems]: Dynamic = [
        Array.isArray(event.add) ? event.add : [],
        Array.isArray(event.remove) ? event.remove : [],
      ];
      let styles: Dynamic = [...items, ...setItems].flatMap(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolvePlatformLiveDocumentAndHistoryValue15(item) &&
          typeof item.type == `string`
            ? [item.type]
            : [],
      );
      return {
        on:
          items.length > 0 && setItems.length === 0
            ? true
            : setItems.length > 0 && items.length === 0
              ? false
              : null,
        one:
          range.length === 2 &&
          typeof range[0] == `string` &&
          range[0] === range[1],
        styles: styles,
      };
    }
    return null;
  });
  (platformLiveDocumentAndHistorySet13 = new (Set as Dynamic)([
    `type`,
    `type_over`,
    `k_enter`,
    `k_bksp`,
    `k_del`,
    `k_wdel`,
    `k_tab`,
    `ime`,
    `replace`,
    `dom_read`,
    `cut`,
    `paste`,
    `drag_move`,
    `drag_copy`,
    `drop_ext`,
    `drop`,
    `undo`,
    `redo`,
  ]));
  (PlatformLiveDocumentAndHistoryBold = {
    bold: `b`,
    italic: `i`,
    underline: `u`,
    strike: `s`,
    code: `c`,
    link: `l`,
    highlight: `h`,
    comment: `k`,
  });
  (PlatformLiveDocumentAndHistoryBiusclhkx = `biusclhkx`);
  (filterPlatformLiveDocumentAndHistoryJoin = (
    filterPlatformLiveDocumentAndHistoryJoin2?: Dynamic,
    ..._extraArguments: unknown[]
  ): string => {
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    for (let filterPlatformLiveDocumentAndHistoryJoinResult of filterPlatformLiveDocumentAndHistoryJoin2 as Dynamic)
      uniqueItems.add(
        PlatformLiveDocumentAndHistoryBold[
          filterPlatformLiveDocumentAndHistoryJoinResult
        ] ?? `x`,
      );
    return [...PlatformLiveDocumentAndHistoryBiusclhkx]
      .filter(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          uniqueItems.has(item),
      )
      .join(``);
  });
  (resolvePlatformLiveDocumentAndHistoryValue16 = (
    platformLiveDocumentAndHistoryValue16?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryValue16 >= 17
      ? `u17`
      : platformLiveDocumentAndHistoryValue16 >= 5
        ? `u5`
        : platformLiveDocumentAndHistoryValue16 >= 2
          ? `u2`
          : `u1`);
  (filterPlatformLiveDocumentAndHistoryUnits = (
    filterPlatformLiveDocumentAndHistoryUnits2?: Dynamic,
    items: Dynamic = [],
    context: Dynamic = 0,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!Array.isArray(filterPlatformLiveDocumentAndHistoryUnits2) || context > 8)
      return items;
    for (let node of filterPlatformLiveDocumentAndHistoryUnits2 as Dynamic) {
      if (items.length >= 256) break;
      if (!resolvePlatformLiveDocumentAndHistoryValue15(node)) continue;
      if (Array.isArray(node.content)) {
        filterPlatformLiveDocumentAndHistoryUnits(
          node.content,
          items,
          context + 1,
        );
        continue;
      }
      let filteredFilteredMarks: Dynamic = Array.isArray(node.marks)
        ? node.marks
            .filter(resolvePlatformLiveDocumentAndHistoryValue15)
            .filter(
              (filteredMark?: Dynamic, ..._extraArguments: unknown[]) =>
                typeof filteredMark.type == `string`,
            )
        : [];
      let units =
        node.type === `text`
          ? typeof node.text == `string`
            ? Array.from<Dynamic>(node.text.slice(0, 4096)).length
            : 0
          : 1;
      items.push({
        units: units,
        marks: filteredFilteredMarks.map(
          (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
            `${String(rolldownNImport2.type)}\u0000${typeof rolldownNImport2.id == `string` ? rolldownNImport2.id : ``}`,
        ),
        kinds: filteredFilteredMarks.map(
          (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
            String(rolldownNImport2.type),
        ),
      });
    }
    return items;
  });
  (platformLiveDocumentAndHistoryPattern7 = /^[a-z0-9_:.-]{1,32}$/);
  (platformLiveDocumentAndHistoryPattern8 = /^(?:cr|ed|sf|ff)-(?:\d{1,2}x|lo|hi)$/);
  (resolvePlatformLiveDocumentAndHistoryIsFinite2 = (
    platformLiveDocumentAndHistoryIsFinite2?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    let platformLiveDocumentAndHistoryIsFinite22 =
      typeof platformLiveDocumentAndHistoryIsFinite2 == `number` &&
      Number.isFinite(platformLiveDocumentAndHistoryIsFinite2)
        ? platformLiveDocumentAndHistoryIsFinite2
        : 1;
    return platformLiveDocumentAndHistoryIsFinite22 >= 50
      ? `n50`
      : platformLiveDocumentAndHistoryIsFinite22 >= 20
        ? `n20`
        : platformLiveDocumentAndHistoryIsFinite22 >= 5
          ? `n5`
          : `n1`;
  });
  (platformLiveDocumentAndHistoryPattern9 = /^(?:[tn][0-4u][0-4u][0-5u]|uuuu)$/);
  (resolvePlatformLiveDocumentAndHistoryDragMove = (
    platformLiveDocumentAndHistoryDragMove?: Dynamic,
    options?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    (platformLiveDocumentAndHistoryDragMove === `drag_move` ||
      platformLiveDocumentAndHistoryDragMove === `drag_copy`) &&
    typeof options == `string` &&
    platformLiveDocumentAndHistoryPattern9.test(options)
      ? options
      : undefined);
  (platformLiveDocumentAndHistorySet14 = new (Set as Dynamic)(
    observabilityTelemetryRepeatOrphanShapeStormValues,
  ));
  (PlatformLiveDocumentAndHistoryUnclassed = `unclassed`);
  (resolvePlatformLiveDocumentAndHistoryValue17 = (
    platformLiveDocumentAndHistoryValue17?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryValue17 == `string` &&
    platformLiveDocumentAndHistorySet14.has(platformLiveDocumentAndHistoryValue17)
      ? platformLiveDocumentAndHistoryValue17
      : PlatformLiveDocumentAndHistoryUnclassed);
  (resolvePlatformLiveDocumentAndHistoryValue18 = (
    platformLiveDocumentAndHistoryValue18?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `gate_${resolvePlatformLiveDocumentAndHistoryValue17(platformLiveDocumentAndHistoryValue18)}`);
  (platformLiveDocumentAndHistoryValue04 = 0);
  (PlatformLiveDocumentAndHistoryUnclassed2 = `unclassed`);
  (platformLiveDocumentAndHistorySet15 = new (Set as Dynamic)(
    ObservabilityTelemetrySplit3,
  ));
  (platformLiveDocumentAndHistorySet16 = new (Set as Dynamic)(
    observabilityTelemetryE1E23E49E10pValues,
  ));
  (platformLiveDocumentAndHistorySet17 = new (Set as Dynamic)([
    `undo_refused`,
    `undo_blocked`,
    `reseat_failed`,
    `schema_mismatch`,
  ]));
  (resolvePlatformLiveDocumentAndHistoryReplace2 = (
    platformLiveDocumentAndHistoryReplace2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformLiveDocumentAndHistoryReplace2
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, `_`)
      .replace(/^_+|_+$/g, ``));
  (resolvePlatformLiveDocumentAndHistoryValue19 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof items != `string` || items.length > 64)
      return PlatformLiveDocumentAndHistoryUnclassed2;
    let platformLiveDocumentAndHistoryReplace2: Dynamic =
      resolvePlatformLiveDocumentAndHistoryReplace2(items);
    return platformLiveDocumentAndHistorySet15.has(
      platformLiveDocumentAndHistoryReplace2,
    )
      ? platformLiveDocumentAndHistoryReplace2
      : PlatformLiveDocumentAndHistoryUnclassed2;
  });
  (resolvePlatformLiveDocumentAndHistoryGestureUndone = (
    platformLiveDocumentAndHistoryGestureUndone?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof platformLiveDocumentAndHistoryGestureUndone == `string` &&
    (platformLiveDocumentAndHistorySet17.has(
      platformLiveDocumentAndHistoryGestureUndone,
    ) ||
      (platformLiveDocumentAndHistoryGestureUndone === `gesture_undone` &&
        options === `contained`)));
  (resolvePlatformLiveDocumentAndHistoryPlain = (
    platformLiveDocumentAndHistoryPlain?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformLiveDocumentAndHistoryPlain === undefined
      ? `plain`
      : platformLiveDocumentAndHistoryPlain === `readonly` ||
          platformLiveDocumentAndHistoryPlain === `refocus` ||
          platformLiveDocumentAndHistoryPlain === `leaving`
        ? platformLiveDocumentAndHistoryPlain
        : platformLiveDocumentAndHistoryPlain === `refocus:swap`
          ? `refocus_swap`
          : `misc`);
  (platformLiveDocumentAndHistorySet18 = new (Set as Dynamic)([
    `row_bytes`,
    `inline_source_bytes`,
    `source_bytes`,
    `leaf_chars`,
    `block_bytes`,
    `ops_per_update`,
    `doc_blocks`,
    `doc_text_bytes`,
    `children`,
    `depth`,
    `table_cols`,
    `ids_per_op`,
    `control_chars`,
  ]));
  (resolvePlatformLiveDocumentAndHistorySplit2 = (
    platformLiveDocumentAndHistorySplit2?: Dynamic,
    ..._extraArguments: unknown[]
  ): string | undefined => {
    let platformLiveDocumentAndHistorySplit2PartItem: Dynamic =
      typeof platformLiveDocumentAndHistorySplit2 == `string`
        ? platformLiveDocumentAndHistorySplit2.split(`:`, 1)[0]
        : typeof platformLiveDocumentAndHistorySplit2 == `object` &&
            platformLiveDocumentAndHistorySplit2
          ? platformLiveDocumentAndHistorySplit2.law
          : undefined;
    return typeof platformLiveDocumentAndHistorySplit2PartItem == `string` &&
      platformLiveDocumentAndHistorySet18.has(
        platformLiveDocumentAndHistorySplit2PartItem,
      )
      ? platformLiveDocumentAndHistorySplit2PartItem
      : undefined;
  });
  (resolvePlatformLiveDocumentAndHistoryValue21 = (
    platformLiveDocumentAndHistoryValue21?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${DataOperationControlBongoOpWal}:words:${platformLiveDocumentAndHistoryValue21}|`);
  (resolvePlatformLiveDocumentAndHistoryValue22 = (
    platformLiveDocumentAndHistoryValue22?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${resolvePlatformLiveDocumentAndHistoryValue21(platformLiveDocumentAndHistoryValue22)}${options}`);
  (resolvePlatformLiveDocumentAndHistoryValue23 = (
    platformLiveDocumentAndHistoryValue23?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryValue23 == `object` &&
    !!platformLiveDocumentAndHistoryValue23);
  (resolvePlatformLiveDocumentAndHistoryText = (
    ask?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    typeof ask == `object` &&
    !!ask &&
    typeof ask.bid == `string` &&
    typeof ask.text == `string` &&
    ask.text !== ``);
  (resolvePlatformLiveDocumentAndHistoryWords = (
    platformLiveDocumentAndHistoryWords?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryWords.holds
      ? platformLiveDocumentAndHistoryWords.why === `words`
        ? `staged`
        : platformLiveDocumentAndHistoryWords.why === `no_key_yet`
          ? `viewer`
          : null
      : null);
  (resolvePlatformLiveDocumentAndHistoryHeld2 = (
    platformLiveDocumentAndHistoryHeld2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let resolvePlatformLiveDocumentAndHistoryHeld2Result: Dynamic = null;
    return Object.assign(
      (
        platformLiveDocumentAndHistoryHeld22?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        resolvePlatformLiveDocumentAndHistoryHeld2Result = null;
        let resolvePlatformLiveDocumentAndHistoryHeld2Result2: Dynamic;
        try {
          resolvePlatformLiveDocumentAndHistoryHeld2Result2 =
            platformLiveDocumentAndHistoryHeld2();
        } catch {
          resolvePlatformLiveDocumentAndHistoryHeld2Result2 = undefined;
        }
        let platformLiveDocumentAndHistoryHolds =
          resolvePlatformLiveDocumentAndHistoryHolds(
            resolvePlatformLiveDocumentAndHistoryHeld2Result2,
            options(),
            platformLiveDocumentAndHistoryHeld22,
          );
        resolvePlatformLiveDocumentAndHistoryHeld2Result =
          resolvePlatformLiveDocumentAndHistoryWords(
            platformLiveDocumentAndHistoryHolds,
          );
        return platformLiveDocumentAndHistoryHolds.holds;
      },
      {
        held: (..._extraArguments: unknown[]): Dynamic =>
          resolvePlatformLiveDocumentAndHistoryHeld2Result,
      },
    );
  });
  (PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision = `own restore: catching the editor up to the restored revision`);
  (platformLiveDocumentAndHistoryMap6 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryMap7 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryMap8 = new (Map as Dynamic)());
  (resolvePlatformLiveDocumentAndHistoryValue24 = (
    platformLiveDocumentAndHistoryValue24?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${platformLiveDocumentAndHistoryValue24}/${options}`);
  (platformLiveDocumentAndHistoryValue60000 = 6e4);
  (PlatformLiveDocumentAndHistoryGone = `gone`);
  (PlatformLiveDocumentAndHistoryAnswerTooLarge = `answer-too-large`);
  (resolvePlatformLiveDocumentAndHistoryWidgetSession = (
    ...platformLiveDocumentAndHistoryWidgetSession: Dynamic[]
  ): Dynamic =>
    (api.lfile.widgetSession as Dynamic)(
      ...platformLiveDocumentAndHistoryWidgetSession,
    ));
  (resolvePlatformLiveDocumentAndHistoryWidgetNodeState = (
    ...platformLiveDocumentAndHistoryWidgetNodeState: Dynamic[]
  ): Dynamic =>
    (api.lfile.widgetNodeState as Dynamic)(
      ...platformLiveDocumentAndHistoryWidgetNodeState,
    ));
  (resolvePlatformLiveDocumentAndHistoryWidgetNodeLog = (
    ...platformLiveDocumentAndHistoryWidgetNodeLog: Dynamic[]
  ): Dynamic =>
    (api.lfile.widgetNodeLog as Dynamic)(
      ...platformLiveDocumentAndHistoryWidgetNodeLog,
    ));
  (resolvePlatformLiveDocumentAndHistoryWidgetRunMessage = (
    ...platformLiveDocumentAndHistoryWidgetRunMessage: Dynamic[]
  ): Dynamic =>
    (api.lfile.widgetRunMessage as Dynamic)(
      ...platformLiveDocumentAndHistoryWidgetRunMessage,
    ));
  (resolvePlatformLiveDocumentAndHistoryWidgetBundle = (
    ...platformLiveDocumentAndHistoryWidgetBundle: Dynamic[]
  ): Dynamic =>
    (api.lfile.widgetBundle as Dynamic)(
      ...platformLiveDocumentAndHistoryWidgetBundle,
    ));
  (resolvePlatformLiveDocumentAndHistoryWidgetLineage = (
    ...platformLiveDocumentAndHistoryWidgetLineage: Dynamic[]
  ): Dynamic =>
    (api.lfile.widgetLineage as Dynamic)(
      ...platformLiveDocumentAndHistoryWidgetLineage,
    ));
  (platformLiveDocumentAndHistoryMap9 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryValue05 = 0);
  (PlatformLiveDocumentAndHistoryLevels = create(
    (
      platformLiveDocumentAndHistoryLevels?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      levels: {},
      load: async (
        platformLiveDocumentAndHistoryLevels2?: Dynamic,
        options2?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        let platformLiveDocumentAndHistoryLevelsResult: number =
          ++platformLiveDocumentAndHistoryValue05;
        platformLiveDocumentAndHistoryMap9.set(
          platformLiveDocumentAndHistoryLevels2,
          platformLiveDocumentAndHistoryLevelsResult,
        );
        let platformLiveDocumentAndHistoryLevelsResult2: Dynamic;
        try {
          platformLiveDocumentAndHistoryLevelsResult2 =
            await resolvePlatformLiveDocumentAndHistoryWidgetLineage(
              options2,
              context,
            );
        } catch {
          platformLiveDocumentAndHistoryLevelsResult2 = {
            error: true,
            rule: `fetch-failed`,
            message: `Couldn't load this level.`,
          };
        }
        if (
          platformLiveDocumentAndHistoryMap9.get(
            platformLiveDocumentAndHistoryLevels2,
          ) === platformLiveDocumentAndHistoryLevelsResult
        ) {
          platformLiveDocumentAndHistoryLevels({
            levels: {
              ...options().levels,
              [platformLiveDocumentAndHistoryLevels2]:
                platformLiveDocumentAndHistoryLevelsResult2,
            },
          });
        }
      },
      release: (
        platformLiveDocumentAndHistoryLevels2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        platformLiveDocumentAndHistoryMap9.delete(
          platformLiveDocumentAndHistoryLevels2,
        );
        if (platformLiveDocumentAndHistoryLevels2 in options().levels) {
          let {
            [platformLiveDocumentAndHistoryLevels2]: levels,
            ...levels2
          }: Dynamic = options().levels;
          platformLiveDocumentAndHistoryLevels({
            levels: levels2,
          });
        }
      },
    }),
  ));
  (loadPlatformLiveDocumentAndHistoryCatch = async (
    platformLiveDocumentAndHistoryCatch?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let result: Dynamic =
      await PlatformLiveDocumentAndHistoryWidgetBundle.functionsList(
        platformLiveDocumentAndHistoryCatch,
      )
        .then(
          (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            filterDataContentAndReferencesFilter(result2, options),
        )
        .catch((..._extraArguments: unknown[]): Dynamic => options);
    return result === undefined
      ? undefined
      : `${ObservabilityBrowserAndOperationEventsRoutine}${result}`;
  });
  (resolvePlatformLiveDocumentAndHistoryError2 = (
    platformLiveDocumentAndHistoryError2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    toast.error(
      `More than one routine here is named ${platformLiveDocumentAndHistoryError2} — open it from Routines.`,
    );
  });
  (PlatformLiveDocumentAndHistoryBongoHello = `bongo:hello`);
  (PlatformLiveDocumentAndHistoryBongoContext = `bongo:context`);
  (PlatformLiveDocumentAndHistoryBongoClose = `bongo:close`);
  (platformLiveDocumentAndHistoryValue2000 = 2e3);
  (platformLiveDocumentAndHistoryValue2562 = 256);
  (platformLiveDocumentAndHistoryValue64 = 64);
  (platformLiveDocumentAndHistoryContextCloseValues = [`context`, `close`]);
  (platformLiveDocumentAndHistoryPattern10 = /[\p{Cc}\p{Cf}\p{Default_Ignorable_Code_Point}\u2800]/gu);
  (platformLiveDocumentAndHistoryPattern11 = /[\p{Cc}\p{Cf}\p{Default_Ignorable_Code_Point}\u2800]/u);
  (resolvePlatformLiveDocumentAndHistoryValue25 = (
    platformLiveDocumentAndHistoryValue25?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryValue25 === `	` ||
    platformLiveDocumentAndHistoryValue25 ===
      `
`);
  (isPlatformLiveDocumentAndHistoryTest = (
    platformLiveDocumentAndHistoryTest?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      !platformLiveDocumentAndHistoryPattern11.test(
        platformLiveDocumentAndHistoryTest,
      )
    )
      return false;
    for (let isPlatformLiveDocumentAndHistoryTestResult of platformLiveDocumentAndHistoryTest as Dynamic)
      if (
        !resolvePlatformLiveDocumentAndHistoryValue25(
          isPlatformLiveDocumentAndHistoryTestResult,
        ) &&
        platformLiveDocumentAndHistoryPattern11.test(
          isPlatformLiveDocumentAndHistoryTestResult,
        )
      )
        return true;
    return false;
  });
  (resolvePlatformLiveDocumentAndHistoryTest5 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof items == `string` &&
    items.length > 0 &&
    items.length <= platformLiveDocumentAndHistoryValue64 &&
    !platformLiveDocumentAndHistoryPattern11.test(items)
      ? items
      : undefined);
  (isPlatformLiveDocumentAndHistoryIsTrusted = (
    platformLiveDocumentAndHistoryIsTrusted?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !!platformLiveDocumentAndHistoryIsTrusted &&
    platformLiveDocumentAndHistoryIsTrusted.isTrusted === true);
  (resolvePlatformLiveDocumentAndHistoryProject3 = (
    platformLiveDocumentAndHistoryProject3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    JSON.stringify([
      platformLiveDocumentAndHistoryProject3.project.id,
      platformLiveDocumentAndHistoryProject3.tab?.nodeId ?? null,
      platformLiveDocumentAndHistoryProject3.tab?.title ?? null,
      platformLiveDocumentAndHistoryProject3.selection ?? null,
    ]));
  (resolvePlatformLiveDocumentAndHistoryNull = (
    platformLiveDocumentAndHistoryNull?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!platformLiveDocumentAndHistoryNull) return null;
    try {
      let origin = new URL(platformLiveDocumentAndHistoryNull).origin;
      return origin && origin !== `null` ? origin : null;
    } catch {
      return null;
    }
  });
  (PlatformLiveDocumentAndHistoryInbound = {
    inbound: ``,
    landing: (..._extraArguments: unknown[]) => null,
  });
  (PlatformLiveDocumentAndHistoryTake = {
    take: (..._extraArguments: unknown[]) => null,
  });
  (platformLiveDocumentAndHistoryValue10000 = 1e4);
  (PlatformLiveDocumentAndHistoryDeclare = {
    declare: frameHostChromeActions,
    onAction: frameHostAction,
  });
  (PlatformLiveDocumentAndHistoryDeclare2 = {
    declare: frameHostChromeDestinations,
    onAction: frameHostAction,
  });
  (PlatformLiveDocumentAndHistoryDeclare3 = {
    declare: frameHostChromeExports,
    onExport: frameHostExport,
    decline: frameDeclineExport,
  });
}

export {
  PlatformLiveDocumentAndHistoryAnswerTooLarge,
  PlatformLiveDocumentAndHistoryDeclare2,
  PlatformLiveDocumentAndHistoryDeclare3,
  PlatformLiveDocumentAndHistoryGone,
  PlatformLiveDocumentAndHistoryLevels,
  PlatformLiveDocumentAndHistoryOwnRestoreCatchingTheEditorUpToTheRestoredRevision,
  collectPlatformLiveDocumentAndHistoryAutoLift,
  createPagesWriteGateRefusedCappedEvent,
  filterPlatformLiveDocumentAndHistoryPayload,
  filterPlatformLiveDocumentAndHistoryRevive,
  isPlatformLiveDocumentAndHistoryDeny,
  isPlatformLiveDocumentAndHistoryInsert,
  loadPlatformLiveDocumentAndHistoryFile,
  platformLiveDocumentAndHistoryPattern5,
  resolvePlatformLiveDocumentAndHistoryAsking,
  resolvePlatformLiveDocumentAndHistoryByPage,
  resolvePlatformLiveDocumentAndHistoryDragMove,
  resolvePlatformLiveDocumentAndHistoryGesture,
  resolvePlatformLiveDocumentAndHistoryHeld2,
  resolvePlatformLiveDocumentAndHistoryNone,
  resolvePlatformLiveDocumentAndHistoryPartial,
  resolvePlatformLiveDocumentAndHistoryPid,
  resolvePlatformLiveDocumentAndHistoryTest4,
  resolvePlatformLiveDocumentAndHistoryValue13,
  resolvePlatformLiveDocumentAndHistoryValue15,
  resolvePlatformLiveDocumentAndHistoryValue20,
  resolvePlatformLiveDocumentAndHistoryValue24,
  resolvePlatformLiveDocumentAndHistoryWidgetBundle,
  resolvePlatformLiveDocumentAndHistoryWidgetNodeLog,
  resolvePlatformLiveDocumentAndHistoryWidgetNodeState,
  resolvePlatformLiveDocumentAndHistoryWidgetRunMessage,
  resolvePlatformLiveDocumentAndHistoryWidgetSession,
  updatePlatformLiveDocumentAndHistoryNobody,
  updatePlatformLiveDocumentAndHistoryNote,
  updatePlatformLiveDocumentAndHistoryRev,
  updatePlatformLiveDocumentAndHistorySeated,
  updatePlatformLiveDocumentAndHistoryTake,
  usePlatformLiveDocumentAndHistoryCurrent,
  usePlatformLiveDocumentAndHistoryCurrent2,
  usePlatformLiveDocumentAndHistoryDeadReason,
  usePlatformLiveDocumentAndHistoryDisabled,
  usePlatformLiveDocumentAndHistoryEnabled,
  usePlatformLiveDocumentAndHistoryEnabled2,
  usePlatformLiveDocumentAndHistoryPid,
  usePlatformLiveDocumentAndHistoryState,
  usePlatformLiveDocumentAndHistoryState2,
};

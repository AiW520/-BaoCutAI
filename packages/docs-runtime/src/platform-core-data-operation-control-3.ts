/** BaoCut: data operation control from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  helloImport,
} from "./platform-core-dependencies";
import {
  emitTelemetryEvent,
} from "./platform-core-observability-telemetry-3";
import {
  RATE_LIMITED_CAP_MS,
  pageBusyOf,
  rateLimitedOf,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolveEditorExtensionsBlock,
  resolveEditorExtensionsSess,
  resolveEditorExtensionsTrim,
  resolveEditorExtensionsValue22,
} from "./platform-core-editor-extensions-2";
import {
  filterEditorExtensionsFilter,
  filterEditorExtensionsGap,
  isEditorExtensionsFrom5,
  resolveEditorExtensionsBlocks,
  resolveEditorExtensionsEntries,
  resolveEditorExtensionsFrom6,
  resolveEditorExtensionsSome3,
  resolveEditorExtensionsValue25,
} from "./platform-core-editor-extensions-3";
import {
  platformKeyboardAndSaveStatusValue1000000,
  resolvePlatformKeyboardAndSaveStatusKept,
  resolvePlatformKeyboardAndSaveStatusText,
} from "./platform-core-platform-keyboard-and-save-status";
import {
  createPagesLinkLateLiftEvent,
  createPagesSyncSerialHoleEvent,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  resolveDataModelSchemasCharCodeAt2,
  resolveDataModelSchemasCharCodeAt4,
  resolveDataModelSchemasDepth4,
  resolveDataModelSchemasLaw,
  resolveDataModelSchemasOps,
  resolveDataModelSchemasValue25,
} from "./platform-core-data-model-schemas-4";
import {
  reportOperationEvent,
  resolveObservabilityBootNode,
  resolveObservabilityBootNode2,
} from "./platform-core-observability-boot";
import {
  PlatformSyncAndRoutingState2,
} from "./platform-core-platform-sync-and-routing-1";
import {
  DataOperationControlEditorOpError,
  DataOperationControlProse,
  collectDataOperationControlValue,
  filterDataOperationControlData,
  filterDataOperationControlOps,
  isDataOperationControlGot,
  isDataOperationControlOps,
  resolveDataOperationControlEvery,
  resolveDataOperationControlForEach,
  resolveDataOperationControlIdInvalid,
  resolveDataOperationControlMinted3,
  resolveDataOperationControlSess2,
  resolveDataOperationControlSpell,
  resolveDataOperationControlValue10,
  resolveDataOperationControlValue17,
} from "./platform-core-data-operation-control-1";
import {
  DataOperationControlARevABellNamedNeverCameInADelta,
  DataOperationControlARowPastRevsThisPageNeverHeard,
  DataOperationControlAccess,
  DataOperationControlAnswerTooLarge,
  DataOperationControlAnswerUnmaskable,
  DataOperationControlAtRevCold,
  DataOperationControlAtRevCold2,
  DataOperationControlMessage10,
  DataOperationControlMessage11,
  DataOperationControlMessage12,
  DataOperationControlMessage13,
  DataOperationControlMessage14,
  DataOperationControlMessage15,
  DataOperationControlMessage2,
  DataOperationControlMessage3,
  DataOperationControlMessage7,
  DataOperationControlMessage8,
  DataOperationControlMessage9,
  DataOperationControlNodeGone2,
  DataOperationControlPageGone,
  DataOperationControlState10,
  DataOperationControlState11,
  DataOperationControlState2,
  DataOperationControlState3,
  DataOperationControlState4,
  DataOperationControlState5,
  DataOperationControlState6,
  DataOperationControlState9,
  DataOperationControlStyles10,
  DataOperationControlStyles4,
  DataOperationControlStyles5,
  DataOperationControlStyles6,
  DataOperationControlStyles7,
  DataOperationControlStyles8,
  DataOperationControlStyles9,
  DataOperationControlTheLogDidNotAnswerWithinWALMS,
  DataOperationControlThisDocumentServiceIsTooOldForThisEditor,
  DataOperationControlVerdictLost,
  DataOperationControlWhy,
  DataOperationControlWhy2,
  DataOperationControlWhy3,
  DataOperationControlWhy4,
  DataOperationControlWhy5,
  dataOperationControlIdentifierPattern,
  dataOperationControlSet10,
  dataOperationControlValue1000,
  dataOperationControlValue100003,
  dataOperationControlValue100004,
  dataOperationControlValue100005,
  dataOperationControlValue10003,
  dataOperationControlValue10004,
  dataOperationControlValue150002,
  dataOperationControlValue2000,
  dataOperationControlValue20002,
  dataOperationControlValue20003,
  dataOperationControlValue20005,
  dataOperationControlValue20006,
  dataOperationControlValue20007,
  dataOperationControlValue2500,
  dataOperationControlValue3000,
  dataOperationControlValue300000,
  dataOperationControlValue3000003,
  dataOperationControlValue300002,
  dataOperationControlValue300003,
  dataOperationControlValue300004,
  dataOperationControlValue30002,
  dataOperationControlValue4000,
  dataOperationControlValue40000,
  dataOperationControlValue40002,
  dataOperationControlValue5000,
  dataOperationControlValue50004,
  dataOperationControlValue6000,
  dataOperationControlValue60000,
  dataOperationControlValue600002,
  dataOperationControlValue64,
  dataOperationControlValue8,
  dataOperationControlValue8000,
  dataOperationControlValue80000,
  filterDataOperationControlDeny,
  isDataOperationControlAllow,
  isDataOperationControlDeny,
  isDataOperationControlDeny2,
  isDataOperationControlDeny3,
  isDataOperationControlDeny4,
  isDataOperationControlDeny5,
  isDataOperationControlDeny6,
  isDataOperationControlDeny7,
  isDataOperationControlDeny8,
  isDataOperationControlUnreachable,
  resolveDataOperationControlAllow,
  resolveDataOperationControlAuthor,
  resolveDataOperationControlEvery3,
  resolveDataOperationControlFloor,
  resolveDataOperationControlFloor2,
  resolveDataOperationControlRound,
  resolveDataOperationControlRound2,
  resolveDataOperationControlRound3,
  resolveDataOperationControlRound4,
  resolveDataOperationControlValue19,
  resolveDataOperationControlValue22,
  resolveDataOperationControlValue23,
  resolveDataOperationControlValue24,
  resolveDataOperationControlValue26,
  resolveDataOperationControlValue27,
  resolveDataOperationControlValue28,
  resolveDataOperationControlVerdict,
  resolveDataOperationControlWhy,
  resolveDataOperationControlWords,
} from "./platform-core-data-operation-control-2";
import {
  DataOperationControlIdRefused,
  DataOperationControlMessage16,
  collectDataOperationControlContent,
  collectDataOperationControlSome,
  dataOperationControlIdentifierPattern2,
  dataOperationControlIdentifierPattern3,
  dataOperationControlIdentifierPattern4,
  dataOperationControlPattern11,
  dataOperationControlPattern8,
  dataOperationControlSet11,
  dataOperationControlSet13,
  dataOperationControlSet14,
  dataOperationControlSet15,
  dataOperationControlSet16,
  dataOperationControlSet17,
  dataOperationControlSet19,
  dataOperationControlSet20,
  dataOperationControlSet21,
  dataOperationControlValue256,
  filterDataOperationControlContent,
  getDataOperationControlSize,
  isDataOperationControlBatchesDone,
  isDataOperationControlDeny9,
  isDataOperationControlRevive,
  isPlainRecord,
  resolveDataOperationControlAnchorGone,
  resolveDataOperationControlAsOf,
  resolveDataOperationControlBatchesDone,
  resolveDataOperationControlBid,
  resolveDataOperationControlBlocks2,
  resolveDataOperationControlBlocks3,
  resolveDataOperationControlBlocks4,
  resolveDataOperationControlChars3,
  resolveDataOperationControlChars4,
  resolveDataOperationControlChildren,
  resolveDataOperationControlDeny,
  resolveDataOperationControlEdit,
  resolveDataOperationControlExec,
  resolveDataOperationControlFlat3,
  resolveDataOperationControlFlatMap2,
  resolveDataOperationControlFrom,
  resolveDataOperationControlHeader,
  resolveDataOperationControlInline,
  resolveDataOperationControlInsert,
  resolveDataOperationControlIsInteger2,
  resolveDataOperationControlKStart,
  resolveDataOperationControlLife,
  resolveDataOperationControlMinted4,
  resolveDataOperationControlOps2,
  resolveDataOperationControlParentId,
  resolveDataOperationControlReduce,
  resolveDataOperationControlReplace2,
  resolveDataOperationControlReplace3,
  resolveDataOperationControlRevive2,
  resolveDataOperationControlSome2,
  resolveDataOperationControlSome3,
  resolveDataOperationControlStartsWith,
  resolveDataOperationControlSure,
  resolveDataOperationControlText,
  resolveDataOperationControlUnavailable,
  resolveDataOperationControlValue30,
  updateDataOperationControlBid,
  updateDataOperationControlEditorSaid,
} from "./platform-core-data-operation-control-4";

var dataOperationControlValue0: number;

function loadDataOperationControlVerdict(
  dataOperationControlVerdict?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let reconcile: Dynamic = dataOperationControlVerdict.reconcile ?? false;
  let min =
    dataOperationControlVerdict.random === undefined
      ? undefined
      : Math.min(1, Math.max(0, dataOperationControlVerdict.random()));
  let loadDataOperationControlVerdictResult: Dynamic =
    min === undefined ? undefined : (..._extraArguments: unknown[]) => min;
  let dataOperationControlFloor: Dynamic = resolveDataOperationControlFloor(
    loadDataOperationControlVerdictResult,
  );
  let dataOperationControlFloor2: Dynamic = resolveDataOperationControlFloor(
    loadDataOperationControlVerdictResult,
    dataOperationControlValue300000,
  );
  let dataOperationControlFloor22 = resolveDataOperationControlFloor2(
    loadDataOperationControlVerdictResult,
  );
  let visibility: Dynamic =
    dataOperationControlVerdict.visibility ?? PlatformSyncAndRoutingState2;
  let loadDataOperationControlVerdictHandler: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined =>
        void dataOperationControlVerdict.timers.setTimeout(
          resolve,
          dataOperationControlVerdict2,
        ),
    );
  let threw = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      dataOperationControlVerdict.shadow?.threw(
        dataOperationControlVerdict2,
        options,
      );
    } catch {}
  };
  let judged = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      dataOperationControlVerdict.shadow?.judged(
        dataOperationControlVerdict2,
        options,
        context,
        dependencies,
      );
    } catch {}
  };
  let refusalClass: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    try {
      return dataOperationControlVerdict.refusalClass?.() ?? null;
    } catch {
      return null;
    }
  };
  let onFaces: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let loadDataOperationControlVerdictResult22: Dynamic;
    try {
      loadDataOperationControlVerdictResult22 = (
        dataOperationControlVerdict.parseView ?? resolveEditorExtensionsValue25
      )(dataOperationControlVerdict2);
    } catch {
      return null;
    }
    if (
      loadDataOperationControlVerdictResult22.faces &&
      dataOperationControlVerdict.onFaces &&
      Object.keys(loadDataOperationControlVerdictResult22.faces).length > 0
    ) {
      dataOperationControlVerdict.onFaces(
        loadDataOperationControlVerdictResult22.faces,
      );
    }
    return loadDataOperationControlVerdictResult22;
  };
  let record2 = {
    verdict: `unreachable`,
    hung: true,
  };
  let race: Dynamic = async (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    if (loadDataOperationControlVerdictResult10 !== null)
      return resolveDataOperationControlWhy4();
    let loadDataOperationControlVerdictResult22: Dynamic = null;
    let promise2: Dynamic = new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        loadDataOperationControlVerdictResult22 =
          dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): Dynamic => resolve(record2),
            dataOperationControlValue8000,
          );
      },
    );
    let door: Dynamic = dataOperationControlVerdict.door(
      dataOperationControlVerdict2,
    );
    let result: Dynamic = await Promise.race([door, promise2]).catch(
      (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
        threw(dataOperationControlVerdict2, error),
        refusalClass()?.ofThrow(
          error,
          isPlainRecord(dataOperationControlVerdict2) &&
            typeof dataOperationControlVerdict2.verb == `string`
            ? dataOperationControlVerdict2.verb
            : `update`,
        ) ?? {
          verdict: `unreachable`,
        }
      ),
    );
    dataOperationControlVerdict.timers.clearTimeout(
      loadDataOperationControlVerdictResult22,
    );
    let dataOperationControlSure: Dynamic = isPlainRecord(result)
      ? resolveDataOperationControlSure(result)
      : null;
    if (
      dataOperationControlSure !== null &&
      (dataOperationControlSure.sure ||
        loadDataOperationControlVerdictHandler26())
    ) {
      pageStopped(`deleted`);
    }
    if (result === record2 && options) {
      options(door);
    }
    return isPlainRecord(result)
      ? result
      : {
          verdict: `unreachable`,
        };
  };
  let enabled = false;
  let enabled2 = false;
  let loadDataOperationControlVerdictResult2: Dynamic = null;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let lookup: Dynamic = new (Map as Dynamic)();
  let idle: Dynamic = visibility.idle();
  let subscribe: Dynamic = visibility.subscribe(
    (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let idle2: Dynamic = idle;
      idle = dataOperationControlVerdict2 === `idle`;
      if (!enabled)
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.visibilityChanged(
            dataOperationControlVerdict2,
            idle2,
          );
    },
  );
  let editorArm: Dynamic = dataOperationControlVerdict.editorArm ?? true;
  let record3: Dynamic = {};
  let enabled3 = false;
  let enabled4: Dynamic = false;
  let loadDataOperationControlVerdictHandler2: Dynamic = (
    dataOperationControlVerdict2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationControlVerdict2 === true ||
    (typeof dataOperationControlVerdict2 == `number` &&
      dataOperationControlVerdict2 >= 1) ||
    dataOperationControlVerdict2 === `1`;
  let loadDataOperationControlVerdictHandler3: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadDataOperationControlVerdictHandler2(
      dataOperationControlVerdict.caps?.[dataOperationControlVerdict2],
    ) ||
    loadDataOperationControlVerdictHandler2(
      record3[dataOperationControlVerdict2],
    );
  let loadDataOperationControlVerdictHandler4: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !enabled3 &&
    (loadDataOperationControlVerdictHandler2(
      dataOperationControlVerdict.caps?.oneOrder,
    ) ||
      loadDataOperationControlVerdictHandler2(record3.oneOrder));
  let capsSettled: Dynamic = (..._extraArguments: unknown[]) =>
    enabled3 ||
    (!loadDataOperationControlVerdictHandler4() &&
      dataOperationControlVerdict.capsSettled?.() === true);
  let capsSettled2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    loadDataOperationControlVerdictHandler2(
      dataOperationControlVerdict.caps?.stream,
    ) ||
    loadDataOperationControlVerdictHandler2(record3.stream) ||
    !(
      dataOperationControlVerdict.capsSettled?.() === true ||
      Object.keys(record3).length > 0
    );
  let honourOpsOnFeed: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    dataOperationControlVerdict.honourOpsOnFeed?.() !== false &&
    (loadDataOperationControlVerdictHandler2(
      dataOperationControlVerdict.caps?.opsOnFeed,
    ) ||
      loadDataOperationControlVerdictHandler2(record3.opsOnFeed));
  let loadDataOperationControlVerdictHandler5: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filteredMappedItems = [
      dataOperationControlVerdict.caps?.[dataOperationControlVerdict2],
      record3[dataOperationControlVerdict2],
    ]
      .map((item?: Dynamic, ..._extraArguments: unknown[]) =>
        item === true ? 1 : Number(item),
      )
      .filter((mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
        Number.isFinite(mappedItem),
      );
    return filteredMappedItems.length > 0
      ? (Math.max as Dynamic)(...filteredMappedItems)
      : 0;
  };
  let loadDataOperationControlVerdictHandler6: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    honourOpsOnFeed() &&
    loadDataOperationControlVerdictHandler5(`atRevPaging`) >= 2;
  let life: Dynamic = ++dataOperationControlValue0;
  let life2 = resolveDataOperationControlLife(min, life);
  let index = 0;
  let lifeLocks: Dynamic = dataOperationControlVerdict.lifeLocks ?? undefined;
  let loadDataOperationControlVerdictHandler7 = (
    ..._extraArguments: unknown[]
  ): undefined => undefined;
  let promise: Dynamic = new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (loadDataOperationControlVerdictHandler7 = resolve),
  );
  lifeLocks?.hold(life2, promise);
  let author: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    if (dataOperationControlVerdict.author === undefined) return {};
    try {
      let author2: Dynamic = dataOperationControlVerdict.author();
      return {
        author: typeof author2 == `string` && author2 !== `` ? author2 : null,
      };
    } catch {
      return {
        author: null,
      };
    }
  };
  let lookup2: Dynamic = new (Map as Dynamic)();
  let claim: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookupEntry: Dynamic = lookup2.get(dataOperationControlVerdict2);
    if (lookupEntry) return lookupEntry;
    let then: Dynamic = lifeLocks
      .claim(dataOperationControlVerdict2, promise)
      .then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          result !== true && lookup2.delete(dataOperationControlVerdict2),
          result
        ),
        (..._extraArguments: unknown[]) => (
          lookup2.delete(dataOperationControlVerdict2),
          null
        ),
      );
    lookup2.set(dataOperationControlVerdict2, then);
    return then;
  };
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let uniqueItems3: Dynamic = new (Set as Dynamic)();
  let claimed = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      let left: Dynamic =
        context === undefined
          ? null
          : (dataOperationControlVerdict.wal.left?.(
              context,
              dataOperationControlVerdict2,
            ) ?? null);
      if (left === null) {
        dataOperationControlVerdict.claimed?.(
          dataOperationControlVerdict2,
          options,
        );
      } else {
        dataOperationControlVerdict.claimed?.(
          dataOperationControlVerdict2,
          options,
          left,
        );
      }
    } catch {}
  };
  let looked = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      dataOperationControlVerdict.looked?.(dataOperationControlVerdict2);
    } catch {}
  };
  let wait = (life3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (!(uniqueItems2.has(life3) || typeof lifeLocks?.wait != `function`)) {
      uniqueItems2.add(life3);
      lifeLocks.wait(life3, promise).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!enabled) {
            if (!result) {
              uniqueItems2.delete(life3);
              for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
                loadDataOperationControlVerdictResult22.wordsWaitOver(life3);
              return;
            }
            uniqueItems3.add(life3);
            lookup2.set(life3, Promise.resolve(true));
            reportOperationEvent(`wal.heir_late`, {
              life: life3,
            });
            for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
              loadDataOperationControlVerdictResult22.inherit(life3);
          }
        },
        (..._extraArguments: unknown[]): undefined => undefined,
      );
    }
  };
  let asks = 0;
  let loadDataOperationControlVerdictResult3: Dynamic = null;
  let index2 = 0;
  let loadDataOperationControlVerdictHandler8: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    verb: `create`,
    object: `session`,
    container: dataOperationControlVerdict.container,
    opId: (loadDataOperationControlVerdictResult3 ??= `sc.${life2}.${++index2}`),
  });
  let loadDataOperationControlVerdictHandler9 = (
    dataOperationControlVerdict2?: Dynamic,
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      dataOperationControlVerdict2 === loadDataOperationControlVerdictResult3 &&
      (response.verdict === `allow` || response.verdict === `deny`)
    ) {
      loadDataOperationControlVerdictResult3 = null;
    }
  };
  let isFinite2: Dynamic = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (test(response) || resolveDataOperationControlSure(response) !== null)
      return null;
    if (
      response.verdict === `busy` ||
      (response.verdict === `deny` &&
        (response.reason === `busy` ||
          (isPlainRecord(response.data) && response.data.code === `busy`)))
    ) {
      let number2 = Number(
        (isPlainRecord(response.data)
          ? response.data.retryAfterMs
          : undefined) ??
          response.retryAfterMs ??
          0,
      );
      return Number.isFinite(number2) && number2 > 0 ? number2 : 0;
    }
    return response.verdict === `deny`
      ? (filterDataOperationControlDeny(response) ??
          resolveDataOperationControlDeny(response))
      : null;
  };
  let count = 0;
  let isFinite3: Dynamic = (
    said?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let retryAfterMs: Dynamic = isFinite2(said);
    return retryAfterMs === null
      ? ((said.verdict === `allow` || said.verdict === `deny`) && (count = 0),
        said)
      : ((count = Math.min(dataOperationControlValue40000, retryAfterMs)),
        {
          verdict: `unreachable`,
          busy: true,
          retryAfterMs: retryAfterMs,
          said: said,
        });
  };
  let race2: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let body: Dynamic = loadDataOperationControlVerdictHandler8();
    let loadDataOperationControlVerdictHandler30: Dynamic = (
      dataOperationControlVerdict3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let isFinite4: Dynamic = isFinite3(dataOperationControlVerdict3);
      loadDataOperationControlVerdictHandler9(body.opId, isFinite4);
      return isFinite4;
    };
    return {
      body: body,
      rep: race(
        body,
        (
          dataOperationControlVerdict3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined =>
          void dataOperationControlVerdict3.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): undefined =>
              void (
                isPlainRecord(result) &&
                dataOperationControlVerdict2(
                  loadDataOperationControlVerdictHandler30(result),
                )
              ),
            (..._extraArguments: unknown[]): undefined => undefined,
          ),
      ).then(loadDataOperationControlVerdictHandler30),
    };
  };
  let count2: Dynamic = 0;
  let enabled5 = false;
  let late: Dynamic = false;
  let now: Dynamic = dataOperationControlVerdict.now?.();
  let answerMs = -1;
  let label: Dynamic = `unasked`;
  let loadDataOperationControlVerdictHandler10 = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        dataOperationControlVerdict2 === `no_answer` &&
        (label === `refused` || label === `caps_absent`)
      )
    ) {
      label = dataOperationControlVerdict2;
    }
  };
  let capsSettled3: Dynamic = (..._extraArguments: unknown[]) =>
    dataOperationControlVerdict.capsSettled?.() === true ||
    Object.keys(record3).length > 0;
  let enabled6 = false;
  let capsSettled4: Dynamic = (..._extraArguments: unknown[]) =>
    !capsSettled3() &&
    !enabled6 &&
    dataOperationControlVerdict.capsSettled?.() === false;
  let roadMoved = (
    response?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      enabled ||
      ((response.verdict === `allow` || response.verdict === `deny`) &&
        (enabled6 = true),
      options < count2 || !isPlainRecord(response.data))
    )
      return false;
    let caps2: Dynamic = isPlainRecord(response.data.caps)
      ? response.data.caps
      : null;
    let flags: Dynamic = isPlainRecord(response.data.flags)
      ? response.data.flags
      : null;
    if (caps2 === null && flags === null) return false;
    count2 = options;
    late = context;
    if (dataOperationControlVerdict.now && now !== undefined) {
      answerMs = Math.max(
        0,
        Math.round(dataOperationControlVerdict.now() - now),
      );
    }
    if (caps2 !== null) {
      let contentText = join();
      record3 = caps2;
      if (loadDataOperationControlVerdictHandler2(record3.oneOrder)) {
        enabled3 = false;
      }
      pump2();
      dataOperationControlVerdict.onLawFacts?.(caps2);
      if (join() !== contentText) {
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.toldHwm = null;
        emit8();
      }
    }
    if (flags !== null) {
      enabled5 = true;
      dataOperationControlVerdict.onServerFlags?.(
        Object.fromEntries(
          Object.entries(flags).filter(
            (flagsEntry?: Dynamic, ..._extraArguments: unknown[]) =>
              typeof flagsEntry[1] == `boolean`,
          ),
        ),
      );
    }
    if (caps2 !== null)
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.roadMoved();
    return true;
  };
  let loadDataOperationControlVerdictResult4: Dynamic = null;
  let count3: Dynamic = 0;
  let enabled7 = false;
  let resolveDataOperationControlValue242 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        loadDataOperationControlVerdictResult4 !== null ||
        enabled7 ||
        enabled ||
        loadDataOperationControlVerdictResult10 !== null ||
        !capsSettled4()
      )
    ) {
      count3 += 1;
      loadDataOperationControlVerdictResult4 =
        dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            loadDataOperationControlVerdictResult4 = null;
            if (
              enabled ||
              loadDataOperationControlVerdictResult10 !== null ||
              !capsSettled4()
            )
              return;
            if (
              (loadDataOperationControlVerdictResult19 !== null &&
                !enabled23) ||
              enabled10 ||
              capsSettled5()
            )
              return void resolveDataOperationControlValue242();
            enabled7 = true;
            let loadDataOperationControlVerdictResult22: Dynamic = ++asks;
            race2(
              (
                dataOperationControlVerdict2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                TELEMETRYATTRIBUTENAMES2(
                  dataOperationControlVerdict2,
                  loadDataOperationControlVerdictResult22,
                ),
            ).rep.then(
              (
                response?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                enabled7 = false;
                TELEMETRYATTRIBUTENAMES(
                  response,
                  loadDataOperationControlVerdictResult22,
                  false,
                );
                if (
                  !enabled &&
                  response.verdict === `unreachable` &&
                  resolveDataOperationControlSure(response) === null
                ) {
                  resolveDataOperationControlValue242();
                }
              },
              (..._extraArguments: unknown[]): undefined =>
                void (enabled7 = false),
            );
          },
          Math.max(
            count,
            resolveDataOperationControlValue24(
              count3,
              dataOperationControlVerdict.random ??
                ((..._extraArguments: unknown[]) => 1),
            ),
          ),
        );
    }
  };
  let TELEMETRYATTRIBUTENAMES = (
    response?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled) {
      roadMoved(response, options, context);
      if (!(options < count2)) {
        if (response.verdict === `unreachable`) {
          loadDataOperationControlVerdictHandler10(`no_answer`);
        } else {
          if (resolveDataOperationControlSure(response) === null) {
            if (response.verdict === `allow`) {
              loadDataOperationControlVerdictHandler10(`caps_absent`);
              enabled24 = true;
              emit2(false);
              pump(response);
            } else {
              loadDataOperationControlVerdictHandler10(`refused`);
              if (!enabled21 && test(response)) {
                emit2(true);
              }
            }
          } else {
            loadDataOperationControlVerdictHandler10(`no_answer`);
          }
        }
        info();
      }
    }
  };
  let TELEMETRYATTRIBUTENAMES2: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => TELEMETRYATTRIBUTENAMES(dataOperationControlVerdict2, options, true);
  let loadDataOperationControlVerdictResult5: Dynamic = null;
  let loadDataOperationControlVerdictResult6: Dynamic = null;
  let loadDataOperationControlVerdictResult7: Dynamic = null;
  let loadDataOperationControlVerdictResult8: Dynamic = null;
  let enabled8 = false;
  let enabled9 = false;
  let count4: Dynamic = 0;
  let enabled10 = false;
  let enabled11: Dynamic = false;
  let enabled12 = false;
  let enabled13 = false;
  let total = DataOperationControlState5.length + 12 + 1;
  let capsSettled5: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    enabled4 &&
    !enabled &&
    loadDataOperationControlVerdictResult10 === null &&
    !(enabled14 && enabled12) &&
    dataOperationControlVerdict.capsSettled?.() === false;
  let classify: Dynamic = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (response.verdict !== `deny`) return false;
    let dataOperationControlSure: Dynamic =
      resolveDataOperationControlSure(response);
    if (dataOperationControlSure !== null)
      return (
        dataOperationControlSure.sure ||
        loadDataOperationControlVerdictHandler26()
      );
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    if (
      [response.reason, data.code].some(
        (item?: unknown, ..._extraArguments: unknown[]): Dynamic =>
          typeof item == `string` && dataOperationControlSet10.has(item),
      )
    )
      return true;
    let k10: Dynamic = refusalClass()?.classify(response, {
      road: `mint`,
      verb: `create`,
      seated: loadDataOperationControlVerdictHandler26(),
    }).k;
    return k10 === `page_terminal` || k10 === `link_terminal`;
  };
  let loadDataOperationControlVerdictHandler11 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let loadDataOperationControlVerdictResult22 of [
      loadDataOperationControlVerdictResult5,
      loadDataOperationControlVerdictResult8,
    ] as Dynamic)
      if (loadDataOperationControlVerdictResult22 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult22,
        );
      }
    loadDataOperationControlVerdictResult5 = null;
    loadDataOperationControlVerdictResult8 = null;
    enabled8 = false;
    enabled9 = false;
  };
  let loadDataOperationControlVerdictHandler12 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    loadDataOperationControlVerdictHandler11();
    for (let loadDataOperationControlVerdictResult22 of [
      loadDataOperationControlVerdictResult6,
      loadDataOperationControlVerdictResult7,
    ] as Dynamic)
      if (loadDataOperationControlVerdictResult22 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult22,
        );
      }
    loadDataOperationControlVerdictResult6 = null;
    loadDataOperationControlVerdictResult7 = null;
    enabled13 = false;
  };
  let loadDataOperationControlVerdictHandler13: Dynamic = (
    ..._extraArguments: unknown[]
  ) =>
    enabled10 ||
    enabled7 ||
    (loadDataOperationControlVerdictResult19 !== null && !enabled23);
  let loadObservabilityTelemetryStatus2 = (
    response?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      TELEMETRYATTRIBUTENAMES(response, options, context);
      if (enabled || !enabled4 || options !== asks) return;
      let matchesVerdict: Dynamic =
        response.verdict !== `allow` && classify(response);
      if (
        matchesVerdict !== enabled11 &&
        (matchesVerdict || response.verdict === `allow`)
      ) {
        enabled11 = matchesVerdict;
        loadDataOperationControlVerdictHandler11();
      }
      if (response.verdict === `allow`) {
        enabled13 = false;
      }
    } catch {
    } finally {
      loadDataOperationControlVerdictHandler15();
      if (enabled13 && enabled11) {
        loadDataOperationControlVerdictHandler16();
      }
    }
  };
  let loadDataOperationControlVerdictHandler14 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (loadDataOperationControlVerdictResult6 !== null) {
      dataOperationControlVerdict.timers.clearTimeout(
        loadDataOperationControlVerdictResult6,
      );
    }
    loadDataOperationControlVerdictResult6 =
      dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): Dynamic => {
          loadDataOperationControlVerdictResult6 = null;
          let enabled26 = enabled9;
          let enabled27 = enabled8;
          enabled9 = false;
          enabled8 = false;
          if (enabled26)
            return capsSettled5() && !loadDataOperationControlVerdictHandler13()
              ? race3(true)
              : loadDataOperationControlVerdictHandler15();
          if (enabled27) {
            race4();
          }
        },
        DataOperationControlState6,
      );
  };
  let race3 = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    enabled10 = true;
    if (dataOperationControlVerdict2) {
      count4 += 1;
    }
    enabled8 = false;
    enabled9 = false;
    loadDataOperationControlVerdictHandler14();
    loadDataOperationControlVerdictResult3 = null;
    let loadDataOperationControlVerdictResult22: Dynamic = ++asks;
    let loadObservabilityTelemetryStatus3 = (
      dataOperationControlVerdict3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      enabled10 = false;
      if (dataOperationControlVerdict3 === null) {
        loadDataOperationControlVerdictHandler15();
      } else {
        loadObservabilityTelemetryStatus2(
          dataOperationControlVerdict3,
          loadDataOperationControlVerdictResult22,
          false,
        );
      }
    };
    race2(
      (dataOperationControlVerdict3?: Dynamic, ..._extraArguments: unknown[]) =>
        loadObservabilityTelemetryStatus2(
          dataOperationControlVerdict3,
          loadDataOperationControlVerdictResult22,
          true,
        ),
    ).rep.then(
      loadObservabilityTelemetryStatus3,
      (..._extraArguments: unknown[]) =>
        loadObservabilityTelemetryStatus3(null),
    );
  };
  let resolveDataOperationControlRound5 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        loadDataOperationControlVerdictResult5 !== null ||
        enabled9 ||
        enabled10 ||
        !capsSettled5()
      )
    ) {
      loadDataOperationControlVerdictResult5 =
        dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]) => {
            loadDataOperationControlVerdictResult5 = null;
            if (capsSettled5()) {
              if (loadDataOperationControlVerdictHandler13())
                return resolveDataOperationControlRound5();
              if (loadDataOperationControlVerdictResult6 !== null)
                return void (enabled9 = true);
              race3(true);
            }
          },
          Math.max(
            count,
            resolveDataOperationControlRound(
              enabled11 ? total : count4 + 1,
              dataOperationControlVerdict.random ??
                ((..._extraArguments: unknown[]) => 1),
            ),
          ),
        );
    }
  };
  let loadDataOperationControlVerdictHandler15: Dynamic = (
    ..._extraArguments: unknown[]
  ) =>
    capsSettled5()
      ? resolveDataOperationControlRound5()
      : loadDataOperationControlVerdictHandler11();
  let race4: Dynamic = (..._extraArguments: unknown[]) => {
    if (!(!capsSettled5() || enabled11)) {
      if (loadDataOperationControlVerdictResult6 !== null)
        return void (enabled8 = true);
      if (
        !(
          loadDataOperationControlVerdictHandler13() ||
          loadDataOperationControlVerdictResult8 !== null
        )
      ) {
        if (count <= 0) return race3(false);
        loadDataOperationControlVerdictResult8 =
          dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              loadDataOperationControlVerdictResult8 = null;
              if (!(!capsSettled5() || enabled11)) {
                if (loadDataOperationControlVerdictResult6 !== null)
                  return void (enabled8 = true);
                if (!loadDataOperationControlVerdictHandler13()) {
                  race3(false);
                }
              }
            },
            Math.max(count, DataOperationControlState6),
          );
      }
    }
  };
  let askFacts: Dynamic = (..._extraArguments: unknown[]): Dynamic => race4();
  let loadDataOperationControlVerdictHandler16 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled) return void (enabled13 = false);
    if (enabled10) return void (enabled13 = true);
    if (enabled11) {
      if (loadDataOperationControlVerdictResult7 !== null)
        return void (enabled13 = true);
      enabled13 = false;
      enabled11 = false;
      loadDataOperationControlVerdictHandler11();
      count4 = 0;
      loadDataOperationControlVerdictResult7 =
        dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            loadDataOperationControlVerdictResult7 = null;
            if (enabled13) {
              loadDataOperationControlVerdictHandler16();
            }
          },
          dataOperationControlValue600002,
        );
      if (enabled14) {
        loadDataOperationControlVerdictHandler14();
      } else {
        race4();
      }
      loadDataOperationControlVerdictHandler15();
    }
  };
  let loadDataOperationControlVerdictResult9: Dynamic = null;
  let floor: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.max(
      options - 1,
      loadDataOperationControlVerdictResult9 !== null &&
        loadDataOperationControlVerdictResult9.label ===
          dataOperationControlVerdict2
        ? loadDataOperationControlVerdictResult9.hwm
        : -1,
      dataOperationControlVerdict.session.floor?.(
        dataOperationControlVerdict2,
      ) ?? -1,
    );
  let pump = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      enabled21 ||
      enabled ||
      typeof dataOperationControlVerdict2.sess != `string` ||
      dataOperationControlVerdict2.sess === `` ||
      typeof dataOperationControlVerdict2.sessSecret != `string`
    )
      return;
    let next: Dynamic =
      isPlainRecord(dataOperationControlVerdict2.data) &&
      typeof dataOperationControlVerdict2.data.next == `number`
        ? dataOperationControlVerdict2.data.next
        : 0;
    if (
      isPlainRecord(dataOperationControlVerdict2.data) &&
      Array.isArray(dataOperationControlVerdict2.data.accepts)
    ) {
      items = dataOperationControlVerdict2.data.accepts.filter(
        (accept?: unknown, ..._extraArguments: unknown[]) =>
          typeof accept == `string`,
      );
    }
    let label5: Dynamic =
      dataOperationControlVerdict.session.get()?.label ??
      loadDataOperationControlVerdictResult17;
    enabled21 = true;
    count8 = 0;
    count9 = 0;
    loadDataOperationControlVerdictResult17 = undefined;
    let hwm: Dynamic = floor(dataOperationControlVerdict2.sess, next);
    dataOperationControlVerdict.session.set({
      label: dataOperationControlVerdict2.sess,
      secret: dataOperationControlVerdict2.sessSecret,
      hwm: hwm,
    });
    rekeyHolds(dataOperationControlVerdict2.sess, hwm);
    if (label5 !== undefined && label5 !== dataOperationControlVerdict2.sess) {
      rekeyHolds3(label5);
    }
    rekeyHolds4();
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      loadDataOperationControlVerdictResult22.toldHwm = null;
    emit8();
    reportOperationEvent(`session.late`, {
      late: late,
      next: next,
    });
    emit7();
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      loadDataOperationControlVerdictResult22.pump();
  };
  let label2 = ``;
  let info = (..._extraArguments: unknown[]): undefined => {
    if (enabled) return;
    let dataOperationControlVerdictHandler: Dynamic =
      loadDataOperationControlVerdictHandler2(
        dataOperationControlVerdict.caps?.opsOnFeed,
      ) || loadDataOperationControlVerdictHandler2(record3.opsOnFeed);
    let honour =
      dataOperationControlVerdict.honourOpsOnFeed === undefined
        ? `absent`
        : dataOperationControlVerdict.honourOpsOnFeed() === false
          ? `false`
          : `true`;
    let road = honourOpsOnFeed() ? `ops` : `legacy`;
    let why: Dynamic = dataOperationControlVerdictHandler
      ? honour === `false`
        ? `flag_killed`
        : `caps`
      : enabled3
        ? `interlock`
        : capsSettled3()
          ? `caps_absent`
          : label;
    let key = `${road}|${why}`;
    if (key === label2) return;
    label2 = key;
    let record4: Dynamic = {
      road: road,
      why: why,
      capsSeen:
        Object.keys(record3).length > 0
          ? `sess`
          : dataOperationControlVerdict.capsSettled?.() === true
            ? `env`
            : `none`,
      flagsSeen: enabled5 ? `sess` : `none`,
      honour: honour,
      late: late,
      life: life,
      asks: asks,
      answerMs: answerMs,
      node: lookup.keys().next().value ?? ``,
      links: lookup.size,
    };
    console.info(
      `opTransport: feed road = ${road} (${why}) — caps ${record4.capsSeen}, flags ${record4.flagsSeen}, honour ${honour}${late ? `, late answer` : ``}, life ${life}, asks ${asks}, answer ${answerMs} ms`,
    );
    for (let loadDataOperationControlVerdictResult22 of [
      (..._extraArguments: unknown[]): Dynamic =>
        dataOperationControlVerdict.onRoad?.(record4),
      (..._extraArguments: unknown[]) =>
        emitTelemetryEvent({
          name: `pages.link.road`,
          key: key,
          fields: {
            feedRoad: road,
            why: why,
            capsSeen: record4.capsSeen,
            flagsSeen: record4.flagsSeen,
            honour: honour,
            late: late,
            life: life,
            asks: asks,
            answerMs: answerMs,
            node: record4.node,
            links: record4.links,
          },
        }),
    ] as Dynamic)
      try {
        loadDataOperationControlVerdictResult22();
      } catch {}
  };
  let capsSettled6: Dynamic = (..._extraArguments: unknown[]) =>
    !loadDataOperationControlVerdictHandler4() &&
    !capsSettled() &&
    dataOperationControlVerdict.capsSettled !== undefined &&
    dataOperationControlVerdict.capsSettled() === null;
  let emit = (..._extraArguments: unknown[]): undefined => {
    let waiting: Dynamic = capsSettled();
    if (waiting !== enabled4) {
      enabled4 = waiting;
      enabled11 = false;
      enabled13 = false;
      loadDataOperationControlVerdictHandler15();
      console.info(
        waiting
          ? `opTransport: the door reached does not speak one order — read-only, nothing is sent until it does`
          : `opTransport: the door speaks one order — editing resumes`,
      );
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.emit({
          t: `state`,
          node: loadDataOperationControlVerdictResult22.node,
          state:
            waiting || !loadDataOperationControlVerdictResult22.served
              ? `readonly`
              : state(),
          words: waiting ? DataOperationControlMessage10 : undefined,
          waiting: waiting,
        });
      emit7();
    }
  };
  let enabled14: Dynamic = false;
  let loadDataOperationControlVerdictHandler17: Dynamic = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    t: `state`,
    node: node,
    state: `readonly`,
    words: DataOperationControlAccess,
    viewOnly: true,
  });
  let emit2 = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        dataOperationControlVerdict2 &&
        loadDataOperationControlVerdictResult10 !== null
      )
    ) {
      if (dataOperationControlVerdict2 === enabled14) {
        if (dataOperationControlVerdict2)
          for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
            loadDataOperationControlVerdictResult22.emit(
              loadDataOperationControlVerdictHandler17(
                loadDataOperationControlVerdictResult22.node,
              ),
            );
        return;
      }
      enabled14 = dataOperationControlVerdict2;
      if (!dataOperationControlVerdict2) {
        enabled12 = false;
      }
      loadDataOperationControlVerdictHandler15();
      console.info(
        dataOperationControlVerdict2
          ? `opTransport: the door refused this viewer a session for access — the document is shown read-only`
          : `opTransport: a session was granted — editing resumes`,
      );
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.emit(
          dataOperationControlVerdict2
            ? loadDataOperationControlVerdictHandler17(
                loadDataOperationControlVerdictResult22.node,
              )
            : {
                t: `state`,
                node: loadDataOperationControlVerdictResult22.node,
                state: state(),
              },
        );
      emit7();
    }
  };
  let loadDataOperationControlVerdictResult10: Dynamic = null;
  let resolveDataOperationControlWhy2: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadDataOperationControlVerdictResult10 === `unreached`
      ? DataOperationControlWhy2
      : loadDataOperationControlVerdictResult10 === `not_governed` ||
          loadDataOperationControlVerdictResult10 === `cmek`
        ? resolveDataOperationControlWhy(
            loadDataOperationControlVerdictResult10,
          )
        : DataOperationControlPageGone;
  let resolveDataOperationControlWhy3: Dynamic = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    t: `state`,
    node: node,
    state: `readonly`,
    words: resolveDataOperationControlWhy2(),
    pageGone: true,
  });
  let resolveDataOperationControlWhy4: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    verdict: `deny`,
    reason: `page_gone`,
    status: 410,
    detail: resolveDataOperationControlWhy2(),
    data: {
      code: `page_gone`,
      why: loadDataOperationControlVerdictResult10 ?? `deleted`,
      layer: `link`,
    },
  });
  let pageStopped = (
    kind2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!(loadDataOperationControlVerdictResult10 !== null || enabled)) {
      loadDataOperationControlVerdictResult10 = kind2;
      console.info(
        kind2 === `deleted`
          ? `opTransport: the door holds no such page for a write of a page this tab had open — it was deleted; read-only, nothing more is sent`
          : kind2 === `unreached`
            ? `opTransport: the page never answered in 10 sends — read-only, nothing more is sent`
            : `opTransport: the door refused this page for the document it is shown in (forbidden/${kind2}) — read-only, nothing more is sent`,
      );
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.emit(
          resolveDataOperationControlWhy3(
            loadDataOperationControlVerdictResult22.node,
          ),
        );
      if (loadDataOperationControlVerdictResult11 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult11,
        );
      }
      loadDataOperationControlVerdictResult11 = null;
      loadDataOperationControlVerdictHandler12();
      loadDataOperationControlVerdictResult12 = null;
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.pageStopped();
      reportOperationEvent(`link.stopped`, {
        why: `page_gone`,
        kind: kind2,
        links: lookup.size,
      });
      emit7();
    }
  };
  let enabled15 = false;
  let enabled16 = false;
  let loadDataOperationControlVerdictResult11: Dynamic = null;
  let count5: Dynamic = 0;
  let enabled17 = false;
  let loadDataOperationControlVerdictResult12: Dynamic = null;
  let loadDataOperationControlVerdictHandler18: Dynamic = (
    ..._extraArguments: unknown[]
  ) => enabled16 || loadDataOperationControlVerdictResult12 !== null;
  let loadDataOperationControlVerdictHandler19: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let loadDataOperationControlVerdictResult22: Dynamic =
      loadDataOperationControlVerdictResult12;
    return loadDataOperationControlVerdictResult22 === null
      ? null
      : ((loadDataOperationControlVerdictResult12 = null),
        loadDataOperationControlVerdictResult11 !== null &&
          dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult11,
          ),
        (loadDataOperationControlVerdictResult11 = null),
        loadDataOperationControlVerdictResult22);
  };
  let ObservabilityTelemetryUnmatched2 = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    emit4(dataOperationControlVerdict2);
    ObservabilityTelemetryState123(undefined, true);
  };
  let ObservabilityTelemetryUnmatched3 = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (loadDataOperationControlVerdictResult12 === null) return;
    loadDataOperationControlVerdictResult12.owed.delete(
      dataOperationControlVerdict2,
    );
    for (let loadDataOperationControlVerdictResult22 of loadDataOperationControlVerdictResult12.owed as Dynamic)
      if (
        loadDataOperationControlVerdictResult22.dead ||
        loadDataOperationControlVerdictResult22.nodeGone ||
        loadDataOperationControlVerdictResult22.halted
      ) {
        loadDataOperationControlVerdictResult12.owed.delete(
          loadDataOperationControlVerdictResult22,
        );
      }
    if (
      loadDataOperationControlVerdictResult12.owed.size > 0 ||
      enabled ||
      loadDataOperationControlVerdictResult10 !== null
    )
      return;
    let dataOperationControlVerdictHandler: Dynamic =
      loadDataOperationControlVerdictHandler19();
    if (dataOperationControlVerdictHandler !== null) {
      ObservabilityTelemetryUnmatched2(dataOperationControlVerdictHandler.why);
    }
  };
  let loadDataOperationControlVerdictHandler20: Dynamic = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    t: `state`,
    node: node,
    state: `readonly`,
    words: DataOperationControlWhy,
    readsRefused: true,
  });
  let loadDataOperationControlVerdictHandler21: Dynamic = (
    ..._extraArguments: unknown[]
  ) => loadDataOperationControlVerdictResult10 !== null || enabled16;
  let loadDataOperationControlVerdictHandler22 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      loadDataOperationControlVerdictResult11 !== null ||
      enabled17 ||
      !enabled16 ||
      enabled
    )
      return;
    let min2 = Math.min(
      dataOperationControlValue3000003,
      dataOperationControlValue300004 * 2 ** Math.min(count5, 8),
    );
    loadDataOperationControlVerdictResult11 =
      dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): Dynamic => {
          loadDataOperationControlVerdictResult11 = null;
          if (
            !enabled16 ||
            enabled ||
            loadDataOperationControlVerdictResult10 !== null
          )
            return;
          let filteredItems: Dynamic = [...lookup.values()].filter(
            (item?: Dynamic, ..._extraArguments: unknown[]) =>
              !item.dead && !item.nodeGone,
          );
          let filteredItem: Dynamic =
            filteredItems.find(
              (
                rolldownNImport2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => rolldownNImport2.accessRefused,
            ) ?? filteredItems[0];
          if (!filteredItem)
            return void loadDataOperationControlVerdictHandler22();
          if (filteredItem.knockBlind) {
            reportOperationEvent(`access.reask`, {
              n: count5 + 1,
              word: `trial`,
            });
            return readsResume2(`a probe read was answered: the access moved`);
          }
          enabled17 = true;
          filteredItem.accessKnock().then(
            (word?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              enabled17 = false;
              if (!(!enabled16 || enabled)) {
                reportOperationEvent(`access.reask`, {
                  n: count5 + 1,
                  word: word,
                });
                if (word === `allowed`)
                  return readsResume2(
                    `a probe read was answered: the access moved`,
                  );
                if (word === `refused`) {
                  count5 += 1;
                }
                loadDataOperationControlVerdictHandler22();
              }
            },
            (..._extraArguments: unknown[]): undefined => {
              enabled17 = false;
              loadDataOperationControlVerdictHandler22();
            },
          );
        },
        min2,
      );
  };
  let emit3 = (..._extraArguments: unknown[]): undefined => {
    if (
      enabled16 ||
      loadDataOperationControlVerdictResult10 !== null ||
      enabled
    )
      return;
    let dataOperationControlVerdictHandler: Dynamic =
      loadDataOperationControlVerdictHandler19();
    enabled16 = true;
    count5 =
      dataOperationControlVerdictHandler === null
        ? 0
        : dataOperationControlVerdictHandler.asks + 1;
    if (dataOperationControlVerdictHandler === null) {
      console.info(
        `opTransport: the door refused this person a read of the page for access — read-only, nothing more is read until the access moves`,
      );
    }
    let enabled26: Dynamic = false;
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      enabled26 =
        loadDataOperationControlVerdictResult22.pageStopped(!enabled26) ||
        enabled26;
    reportOperationEvent(`link.stopped`, {
      why: `access`,
      links: lookup.size,
      ...(dataOperationControlVerdictHandler === null
        ? {}
        : {
            trial: true,
          }),
    });
    if (dataOperationControlVerdictHandler === null) {
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        if (!loadDataOperationControlVerdictResult22.nodeGone) {
          loadDataOperationControlVerdictResult22.emit(
            loadDataOperationControlVerdictHandler20(
              loadDataOperationControlVerdictResult22.node,
            ),
          );
        }
      emit7();
    }
    loadDataOperationControlVerdictHandler22();
  };
  let emit4 = (why?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    reportOperationEvent(`link.resumed`, {
      why: why,
    });
    console.info(`opTransport: ${why} — the page is read again`);
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      if (!loadDataOperationControlVerdictResult22.nodeGone) {
        loadDataOperationControlVerdictResult22.emit({
          t: `state`,
          node: loadDataOperationControlVerdictResult22.node,
          state: state(),
          readsRefused: false,
        });
      }
    emit7();
  };
  let readsResume = (
    why?: Dynamic,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!options && loadDataOperationControlVerdictHandler19() !== null) {
      if (!enabled && loadDataOperationControlVerdictResult10 === null) {
        emit4(why);
      }
      return;
    }
    if (
      !(
        !enabled16 ||
        enabled ||
        loadDataOperationControlVerdictResult10 !== null
      )
    ) {
      enabled16 = false;
      if (loadDataOperationControlVerdictResult11 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult11,
        );
      }
      loadDataOperationControlVerdictResult11 = null;
      if (options) {
        let owed: Dynamic = new (Set as Dynamic)(
          [...lookup.values()].filter(
            (item?: Dynamic, ..._extraArguments: unknown[]) =>
              !item.dead &&
              !item.nodeGone &&
              !item.halted &&
              !(item.cooling && !item.served),
          ),
        );
        let asks2: Dynamic = count5;
        count5 = 0;
        reportOperationEvent(`access.trial`, {
          links: owed.size,
        });
        if (owed.size > 0) {
          loadDataOperationControlVerdictResult12 = {
            why: why,
            asks: asks2,
            owed: owed,
          };
          loadDataOperationControlVerdictResult11 =
            dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                loadDataOperationControlVerdictResult11 = null;
                let dataOperationControlVerdictHandler: Dynamic =
                  enabled || loadDataOperationControlVerdictResult10 !== null
                    ? null
                    : loadDataOperationControlVerdictHandler19();
                if (dataOperationControlVerdictHandler !== null) {
                  reportOperationEvent(`access.trial.lapsed`, {
                    owed: owed.size,
                  });
                  ObservabilityTelemetryUnmatched2(
                    dataOperationControlVerdictHandler.why,
                  );
                }
              },
              Math.min(
                dataOperationControlValue3000003,
                dataOperationControlValue300004 * 2 ** Math.min(asks2 + 1, 8),
              ),
            );
        } else {
          emit4(why);
        }
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.readsResume();
        if (owed.size === 0) {
          ObservabilityTelemetryState123(undefined, true);
        }
        return;
      }
      count5 = 0;
      emit4(why);
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.readsResume();
    }
  };
  let kind: Dynamic = null;
  let count6: Dynamic = 0;
  let loadDataOperationControlVerdictHandler23: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => count6 + +(kind === null);
  let loadDataOperationControlVerdictHandler24: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => !enabled && kind !== null && count6 === dataOperationControlVerdict2;
  let index3: Dynamic = 0;
  let uniqueItems4: Dynamic = new (Set as Dynamic)();
  let loadDataOperationControlVerdictHandler25: Dynamic = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    t: `state`,
    node: node,
    state: `saving`,
    words:
      kind === `refusing`
        ? DataOperationControlWhy4
        : kind === `signed_out`
          ? DataOperationControlWhy5
          : DataOperationControlWhy3,
    linkDown: true,
  });
  let emit5 = (
    kind2?: Dynamic,
    why?: Dynamic,
    road: Dynamic = `write`,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        kind !== null ||
        loadDataOperationControlVerdictResult10 !== null ||
        enabled
      )
    ) {
      kind = kind2;
      count6 += 1;
      label3 = road;
      if (loadDataOperationControlVerdictResult14 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult14,
        );
      }
      loadDataOperationControlVerdictResult14 = null;
      reportOperationEvent(`link.down`, {
        kind: kind2,
        why: why,
        road: road,
      });
      console.info(
        kind2 === `unreached`
          ? `opTransport: the door could not be reached (${why}) — saving is paused: the rows are held, nothing is sent until a probe read is answered or the carrier re-opens`
          : kind2 === `signed_out`
            ? `opTransport: signed out (${why}) — saving is paused: the rows are held, nothing is sent until a probe read is answered again`
            : `opTransport: the door refused ${refusalClass()?.BREAKER_N ?? 3} rows running with no road for the word (${why}) — saving is paused: the rows are held, nothing is sent until the carrier re-opens or the access moves`,
      );
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic) {
        loadDataOperationControlVerdictResult22.reclaim();
        if (loadDataOperationControlVerdictResult22.nodeGone) {
          loadDataOperationControlVerdictResult22.pumpBehind();
        } else {
          loadDataOperationControlVerdictResult22.emit(
            loadDataOperationControlVerdictHandler25(
              loadDataOperationControlVerdictResult22.node,
            ),
          );
        }
      }
      emit7();
      if (index4 < 3) {
        index4 = 3;
      }
      resolveDataOperationControlValue232();
      if (enabled18) {
        reportOperationEvent(`link.down.probation`, {
          why: why,
          road: road,
        });
      }
    }
  };
  let loadDataOperationControlVerdictResult13: Dynamic = null;
  let index4 = 0;
  let enabled18 = false;
  let label3: Dynamic = `write`;
  let loadDataOperationControlVerdictResult14: Dynamic = null;
  let enabled19 = false;
  let emit6 = (..._extraArguments: unknown[]): undefined => {
    let enabled26 = enabled18;
    enabled18 = false;
    if (loadDataOperationControlVerdictResult14 !== null) {
      dataOperationControlVerdict.timers.clearTimeout(
        loadDataOperationControlVerdictResult14,
      );
    }
    loadDataOperationControlVerdictResult14 = null;
    if (enabled26 && kind === null && !enabled)
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        if (!loadDataOperationControlVerdictResult22.nodeGone) {
          loadDataOperationControlVerdictResult22.emit({
            t: `state`,
            node: loadDataOperationControlVerdictResult22.node,
            state: state(),
            linkDown: false,
          });
        }
  };
  let enabled20 = false;
  let knockHeard: Dynamic = (
    dataOperationControlVerdict2: Dynamic = false,
    ..._extraArguments: unknown[]
  ) => {
    if (enabled20 || kind === null || enabled) return;
    if (kind === `refusing`) {
      if (
        ![...lookup.values()].some(
          (item2?: Dynamic, ..._extraArguments: unknown[]) =>
            !item2.dead &&
            !item2.nodeGone &&
            (item2.queue.length > 0 || item2.inflight !== null),
        )
      )
        return resolveDataOperationControlValue232();
      enabled18 = true;
      rearmGap(
        dataOperationControlVerdict2
          ? `the tab woke: one held row tries the refusing door`
          : `one held row tries the refusing door (probe)`,
        true,
      );
      if (loadDataOperationControlVerdictResult14 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult14,
        );
      }
      loadDataOperationControlVerdictResult14 =
        dataOperationControlVerdict.timers.setTimeout(
          emit6,
          dataOperationControlValue300002,
        );
      return;
    }
    let item: Dynamic = [...lookup.values()].find(
      (item2?: Dynamic, ..._extraArguments: unknown[]) =>
        !item2.dead && !item2.nodeGone,
    );
    if (!item) return resolveDataOperationControlValue232();
    enabled20 = true;
    let [items3, setItems]: Dynamic = [
      loadDataOperationControlVerdictHandler23(),
      dataOperationControlVerdict.now?.(),
    ];
    item
      .knockHeard(
        (
          dataOperationControlVerdict3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined =>
          void (
            dataOperationControlVerdict3 &&
            loadDataOperationControlVerdictHandler24(items3) &&
            kind !== `refusing` &&
            round(`knock`, setItems, label3 === `write` || label3 === `stream`)
          ),
      )
      .then(
        (result?: Dynamic, ..._extraArguments: unknown[]) => {
          enabled20 = false;
          if (kind === null) return;
          if (kind === `refusing` || !result)
            return resolveDataOperationControlValue232();
          let matchesLabel = label3 === `write` || label3 === `stream`;
          if (matchesLabel) {
            enabled18 = true;
          }
          rearmGap(
            dataOperationControlVerdict2
              ? `the tab woke and the door answered a probe read`
              : `the door answered a probe read`,
            matchesLabel,
          );
          if (matchesLabel) {
            if (loadDataOperationControlVerdictResult14 !== null) {
              dataOperationControlVerdict.timers.clearTimeout(
                loadDataOperationControlVerdictResult14,
              );
            }
            loadDataOperationControlVerdictResult14 =
              dataOperationControlVerdict.timers.setTimeout(
                emit6,
                dataOperationControlValue300002,
              );
          }
        },
        (..._extraArguments: unknown[]): undefined => {
          enabled20 = false;
          resolveDataOperationControlValue232();
        },
      );
  };
  let resolveDataOperationControlValue232 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      loadDataOperationControlVerdictResult13 !== null ||
      enabled20 ||
      kind === null ||
      enabled
    )
      return;
    let loadDataOperationControlVerdictResult22: Dynamic = ++index4;
    loadDataOperationControlVerdictResult13 =
      dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          loadDataOperationControlVerdictResult13 = null;
          knockHeard();
        },
        kind === `refusing`
          ? resolveDataOperationControlRound2(
              Math.min(
                dataOperationControlValue60000,
                500 * 2 ** (loadDataOperationControlVerdictResult22 - 1),
              ),
              dataOperationControlVerdict.random ??
                ((..._extraArguments: unknown[]) => 1),
            )
          : resolveDataOperationControlValue23(
              loadDataOperationControlVerdictResult22,
              dataOperationControlVerdict.random ??
                ((..._extraArguments: unknown[]) => 1),
            ),
      );
  };
  let loadDataOperationControlVerdictResult15: Dynamic = null;
  let woke = (..._extraArguments: unknown[]): undefined => {
    if (
      !(
        enabled ||
        loadDataOperationControlVerdictResult15 !== null ||
        enabled20 ||
        kind === null
      )
    ) {
      loadDataOperationControlVerdictResult15 =
        dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined =>
            void (loadDataOperationControlVerdictResult15 = null),
          DataOperationControlState3,
        );
      if (loadDataOperationControlVerdictResult13 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult13,
        );
      }
      loadDataOperationControlVerdictResult13 = null;
      knockHeard(true);
    }
  };
  let loadDataOperationControlVerdictResult16: Dynamic = null;
  let knockHeard2 = (..._extraArguments: unknown[]): undefined => {
    if (
      !(
        enabled ||
        kind === null ||
        loadDataOperationControlVerdictResult16 !== null ||
        enabled20
      )
    ) {
      loadDataOperationControlVerdictResult16 =
        dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined =>
            void (loadDataOperationControlVerdictResult16 = null),
          DataOperationControlState4,
        );
      if (loadDataOperationControlVerdictResult13 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult13,
        );
      }
      loadDataOperationControlVerdictResult13 = null;
      reportOperationEvent(`link.down.kick`, {
        kind: kind,
      });
      knockHeard();
    }
  };
  let rearmGap = (
    why?: Dynamic,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!options) {
      index3 = 0;
    }
    count8 = 0;
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      loadDataOperationControlVerdictResult22.readsUnanswered = 0;
    if (!options) {
      emit6();
      index4 = 0;
    }
    if (loadDataOperationControlVerdictResult13 !== null) {
      dataOperationControlVerdict.timers.clearTimeout(
        loadDataOperationControlVerdictResult13,
      );
    }
    loadDataOperationControlVerdictResult13 = null;
    if (kind !== null) {
      reportOperationEvent(`link.up`, {
        kind: kind,
        why: why,
      });
      console.info(`opTransport: ${why} — the held rows fly again`);
      kind = null;
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        if (!loadDataOperationControlVerdictResult22.nodeGone) {
          loadDataOperationControlVerdictResult22.emit({
            t: `state`,
            node: loadDataOperationControlVerdictResult22.node,
            state: state(),
            ...(options
              ? {}
              : {
                  linkDown: false,
                }),
          });
        }
      emit7();
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic) {
        loadDataOperationControlVerdictResult22.pump();
        loadDataOperationControlVerdictResult22.rearmGap();
      }
    }
  };
  let round = (
    what?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let max =
      options === undefined || dataOperationControlVerdict.now === undefined
        ? undefined
        : Math.max(0, dataOperationControlVerdict.now() - options);
    reportOperationEvent(`link.up.late`, {
      what: what,
      ...(max === undefined
        ? {}
        : {
            lateMs: Math.round(max),
          }),
    });
    if (max !== undefined) {
      emitTelemetryEvent(createPagesLinkLateLiftEvent(what, max));
    }
    if (context) {
      enabled18 = true;
      if (loadDataOperationControlVerdictResult14 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult14,
        );
      }
      loadDataOperationControlVerdictResult14 =
        dataOperationControlVerdict.timers.setTimeout(
          emit6,
          dataOperationControlValue300002,
        );
    }
    rearmGap(
      what === `knock`
        ? `the door answered a probe read, late`
        : `the door took the held row, heard late`,
      context,
    );
  };
  let loadDataOperationControlVerdictHandler26: Dynamic = (
    ..._extraArguments: unknown[]
  ) =>
    enabled2 ||
    enabled24 ||
    [...lookup.values()].some(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        item.served || item.lastRev >= 0,
    );
  let test: Dynamic = (response?: Dynamic, ..._extraArguments: unknown[]) =>
    response.verdict === `deny` &&
    dataOperationControlIdentifierPattern.test(String(response.reason ?? ``));
  let capsSettled7: Dynamic = (..._extraArguments: unknown[]): Dynamic => (
    emit(),
    enabled4 || capsSettled6() || kind !== null
  );
  let pump2 = (..._extraArguments: unknown[]): undefined => {
    let capsSettled8: Dynamic = capsSettled7();
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      if (capsSettled8) {
        if (loadDataOperationControlVerdictResult22.nodeGone) {
          loadDataOperationControlVerdictResult22.pumpBehind();
        }
      } else {
        loadDataOperationControlVerdictResult22.pump();
      }
  };
  let uniqueItems5: Dynamic = new (Set as Dynamic)([
    `stream`,
    `provenance`,
    `ids`,
    `opId`,
  ]);
  let test2: Dynamic = (
    response?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (response.verdict !== `deny`) return false;
    if (isDataOperationControlDeny(response, options)) return true;
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    let label5 = `${String(response.reason)} ${String(response.detail)} ${String(data.detail)} ${String(data.message)}`;
    return data.problem === `unknown_key` || /unknown[_ ]key/.test(label5)
      ? (Array.isArray(data.at)
          ? data.at
          : Array.isArray(data.path)
            ? data.path
            : []
        ).some(
          (at2?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof at2 == `string` && uniqueItems5.has(at2),
        )
        ? true
        : /(?:^|[\s[\].:])(stream|provenance|ids|opId)(?:: unknown key| is unknown_key)/.test(
            label5,
          )
      : false;
  };
  let state = (..._extraArguments: unknown[]) => {
    if (
      enabled4 ||
      enabled14 ||
      loadDataOperationControlVerdictResult10 !== null ||
      loadDataOperationControlVerdictHandler18()
    )
      return `readonly`;
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      if (loadDataOperationControlVerdictResult22.pending() > 0)
        return `saving`;
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      if (loadDataOperationControlVerdictResult22.trayHolds()) return `unsaved`;
    let enabled26 = false;
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      if (loadDataOperationControlVerdictResult22.shortRevived.size > 0) {
        if (!loadDataOperationControlVerdictResult22.shortInGrace())
          return `unsaved`;
        enabled26 = true;
      }
    if (enabled26) return `saving`;
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      if (loadDataOperationControlVerdictResult22.strays > 0) return `saving`;
    return enabled2 ? `saved` : `door`;
  };
  let emit7 = (..._extraArguments: unknown[]): undefined => {
    let state2 = state();
    if (state2 !== loadDataOperationControlVerdictResult2) {
      loadDataOperationControlVerdictResult2 = state2;
      for (let loadDataOperationControlVerdictResult22 of uniqueItems as Dynamic)
        loadDataOperationControlVerdictResult22(state2);
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.emit(
          kind !== null &&
            !loadDataOperationControlVerdictResult22.nodeGone &&
            state2 !== `readonly`
            ? loadDataOperationControlVerdictHandler25(
                loadDataOperationControlVerdictResult22.node,
              )
            : {
                t: `state`,
                node: loadDataOperationControlVerdictResult22.node,
                state: loadDataOperationControlVerdictResult22.nodeGone
                  ? `readonly`
                  : state2,
                ...(state2 === `saving` &&
                loadDataOperationControlVerdictResult22.strays > 0 &&
                loadDataOperationControlVerdictResult22.pending() === 0 &&
                !loadDataOperationControlVerdictResult22.trayHolds()
                  ? {
                      words: DataOperationControlMessage9,
                    }
                  : {}),
              },
        );
    }
  };
  let items: Dynamic = [];
  let items2 = [
    `idsInline`,
    `idsRequired`,
    `markIds`,
    `wrapFinal`,
    `joinDir`,
    `reviveChars`,
    `reviveText`,
    `reviveBlocks`,
    `splitResurrect`,
    `mentionLabel`,
    `personLabel`,
    `highlightColour`,
    `hrefFragment`,
    `splitBeforeAtom`,
    `insertEach`,
  ];
  let isPlainRecord2: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let doc: Dynamic = isPlainRecord(record3.doc) ? record3.doc : null;
    if (doc === null) return {};
    let loadDataOperationControlVerdictHandler30: Dynamic = (
      dataOperationControlVerdict2?: unknown,
      options?: unknown,
      ..._extraArguments: unknown[]
    ) =>
      typeof dataOperationControlVerdict2 == `number`
        ? typeof options == `number`
          ? Math.min(dataOperationControlVerdict2, options)
          : dataOperationControlVerdict2
        : undefined;
    let depthMax: Dynamic = loadDataOperationControlVerdictHandler30(
      doc.depth,
      dataOperationControlVerdict.caps?.depthMax,
    );
    let listLevelsMax: Dynamic = loadDataOperationControlVerdictHandler30(
      doc.listLevels ?? doc.list_levels,
      dataOperationControlVerdict.caps?.listLevelsMax,
    );
    return {
      ...(depthMax === undefined
        ? {}
        : {
            depthMax: depthMax,
          }),
      ...(listLevelsMax === undefined
        ? {}
        : {
            listLevelsMax: listLevelsMax,
          }),
    };
  };
  let join = (..._extraArguments: unknown[]) =>
    `${items2.filter((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => loadDataOperationControlVerdictHandler2(record3[item])).join(`,`)}|${JSON.stringify(isPlainRecord2())}`;
  let caps: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let filteredItems = items2.filter(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        loadDataOperationControlVerdictHandler2(record3[item]) &&
        dataOperationControlVerdict.caps?.[item] !== true,
    );
    let isPlainRecord3: Dynamic = isPlainRecord2();
    return items.length === 0 &&
      filteredItems.length === 0 &&
      Object.keys(isPlainRecord3).length === 0
      ? dataOperationControlVerdict.caps
      : {
          ...dataOperationControlVerdict.caps,
          ...(items.length > 0
            ? {
                accepts: [
                  ...new (Set as Dynamic)([
                    ...(dataOperationControlVerdict.caps?.accepts ?? []),
                    ...items,
                  ]),
                ],
              }
            : {}),
          ...Object.fromEntries(
            filteredItems.map(
              (
                filteredItem?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => [filteredItem, true],
            ),
          ),
          ...isPlainRecord3,
        };
  };
  let emit8 = (..._extraArguments: unknown[]): undefined => {
    let sessionEntry: Dynamic = dataOperationControlVerdict.session.get();
    if (sessionEntry)
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic) {
        if (
          loadDataOperationControlVerdictResult22.toldHwm !== null &&
          loadDataOperationControlVerdictResult22.toldHwm >= sessionEntry.hwm
        )
          continue;
        loadDataOperationControlVerdictResult22.toldHwm = sessionEntry.hwm;
        let caps2: Dynamic = caps();
        let record4: Dynamic = caps2
          ? {
              caps: caps2,
            }
          : {};
        loadDataOperationControlVerdictResult22.emit({
          t: `session`,
          node: loadDataOperationControlVerdictResult22.node,
          sess: sessionEntry.label,
          hwm: sessionEntry.hwm,
          ...record4,
        });
      }
  };
  let trim = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let logged: Dynamic = dataOperationControlVerdict2.logged(options);
    if (logged) {
      (dataOperationControlVerdict.wal.rewrite
        ? dataOperationControlVerdict.wal.rewrite(
            dataOperationControlVerdict2.node,
            logged,
          )
        : dataOperationControlVerdict.wal
            .trim(dataOperationControlVerdict2.node, options.opId)
            .then(
              (..._extraArguments: unknown[]): Dynamic =>
                dataOperationControlVerdict.wal.append(
                  dataOperationControlVerdict2.node,
                  logged,
                ),
            )
      ).catch((..._extraArguments: unknown[]): undefined => undefined);
    }
  };
  let rekeyHolds = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let hwm = -1;
    let isInteger: Dynamic = (
      dataOperationControlVerdict3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (!dataOperationControlVerdict3.startsWith(`_.`))
        return dataOperationControlVerdict3;
      let total2: Dynamic =
        options + 1 + Number(dataOperationControlVerdict3.slice(2));
      if (Number.isInteger(total2)) {
        hwm = Math.max(hwm, total2);
      }
      return `${dataOperationControlVerdict2}.${total2}`;
    };
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic) {
      for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22.queue as Dynamic) {
        loadDataOperationControlVerdictResult23.ops =
          collectDataOperationControlContent(
            loadDataOperationControlVerdictResult23.ops,
            isInteger,
          );
        loadDataOperationControlVerdictResult23.editorSaid ??=
          loadDataOperationControlVerdictResult23.predicted;
        loadDataOperationControlVerdictResult23.predicted =
          loadDataOperationControlVerdictResult23.predicted.map(
            (predicted?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              predicted.map(isInteger),
          );
        loadDataOperationControlVerdictResult23.homes &&=
          loadDataOperationControlVerdictResult23.homes.map(isInteger);
        trim(
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        );
      }
      loadDataOperationControlVerdictResult22.rekeyWords(isInteger);
      loadDataOperationControlVerdictResult22.rekeyHolds(isInteger);
    }
    let sessionEntry: Dynamic = dataOperationControlVerdict.session.get();
    if (
      sessionEntry &&
      sessionEntry.label === dataOperationControlVerdict2 &&
      hwm > sessionEntry.hwm
    ) {
      dataOperationControlVerdict.session.set({
        ...sessionEntry,
        hwm: hwm,
      });
    }
  };
  let resolveObservabilityTelemetryChunk2 = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      dataOperationControlVerdict2 !== undefined &&
      dataOperationControlVerdict2 !== `_`
    ) {
      uniqueItems6.add(dataOperationControlVerdict2);
    }
    dataOperationControlVerdict.session.set(null);
    enabled21 = false;
    loadDataOperationControlVerdictResult19 = null;
    enabled23 = false;
    loadDataOperationControlVerdictResult3 = null;
    rekeyHolds2(dataOperationControlVerdict2);
  };
  let rekeyHolds2 = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      dataOperationControlVerdict2 === undefined ||
      dataOperationControlVerdict2 === `_`
    )
      return;
    let lookup3: Dynamic = new (Map as Dynamic)();
    let count10 = 0;
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
        ? [
            loadDataOperationControlVerdictResult22.inflight,
            ...loadDataOperationControlVerdictResult22.queue,
          ]
        : loadDataOperationControlVerdictResult22.queue) as Dynamic)
        for (let loadDataOperationControlVerdictResult24 of resolveDataOperationControlFlat3(
          loadDataOperationControlVerdictResult23,
        ) as Dynamic)
          if (loadDataOperationControlVerdictResult24.startsWith(`_.`)) {
            count10 = Math.max(
              count10,
              Number(loadDataOperationControlVerdictResult24.slice(2)) + 1 || 0,
            );
          }
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
        ? [
            loadDataOperationControlVerdictResult22.inflight,
            ...loadDataOperationControlVerdictResult22.queue,
          ]
        : loadDataOperationControlVerdictResult22.queue) as Dynamic)
        if (
          !loadDataOperationControlVerdictHandler27(
            loadDataOperationControlVerdictResult23,
          )
        )
          for (let loadDataOperationControlVerdictResult24 of resolveDataOperationControlFlat3(
            loadDataOperationControlVerdictResult23,
          ) as Dynamic)
            if (
              resolveDataOperationControlStartsWith(
                loadDataOperationControlVerdictResult24,
                dataOperationControlVerdict2,
              ) >= 0 &&
              !lookup3.has(loadDataOperationControlVerdictResult24)
            ) {
              lookup3.set(
                loadDataOperationControlVerdictResult24,
                `_.${count10 + lookup3.size}`,
              );
            }
    if (lookup3.size !== 0)
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic) {
        loadDataOperationControlVerdictResult22.toldHwm = null;
        for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
          ? [
              loadDataOperationControlVerdictResult22.inflight,
              ...loadDataOperationControlVerdictResult22.queue,
            ]
          : loadDataOperationControlVerdictResult22.queue) as Dynamic) {
          if (
            (loadDataOperationControlVerdictResult23.replayed ||
              loadDataOperationControlVerdictResult23.lost) &&
            !loadDataOperationControlVerdictResult23.loggedAs
          ) {
            loadDataOperationControlVerdictResult23.loggedAs = {
              ops: loadDataOperationControlVerdictResult23.ops,
              predicted: loadDataOperationControlVerdictResult23.predicted,
              ...(loadDataOperationControlVerdictResult23.homes
                ? {
                    homes: loadDataOperationControlVerdictResult23.homes,
                  }
                : {}),
            };
          }
          loadDataOperationControlVerdictResult23.editorSaid ??=
            loadDataOperationControlVerdictResult23.predicted;
          [
            loadDataOperationControlVerdictResult23.ops,
            loadDataOperationControlVerdictResult23.predicted,
          ] = [
            getDataOperationControlSize(
              loadDataOperationControlVerdictResult23.ops,
              lookup3,
            ),
            getDataOperationControlSize(
              loadDataOperationControlVerdictResult23.predicted,
              lookup3,
            ),
          ];
          loadDataOperationControlVerdictResult23.homes &&=
            getDataOperationControlSize(
              loadDataOperationControlVerdictResult23.homes,
              lookup3,
            );
        }
        loadDataOperationControlVerdictResult22.rekeyWords(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            lookup3.get(dataOperationControlVerdict3) ??
            dataOperationControlVerdict3,
        );
        loadDataOperationControlVerdictResult22.rekeyHolds(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            lookup3.get(dataOperationControlVerdict3) ??
            dataOperationControlVerdict3,
        );
      }
  };
  let enabled21 = false;
  let matchesReady = dataOperationControlVerdict.wal.ready === undefined;
  dataOperationControlVerdict.wal.ready?.then(
    (..._extraArguments: unknown[]) => (matchesReady = true),
    (..._extraArguments: unknown[]): undefined => undefined,
  );
  try {
    dataOperationControlVerdict.wal.kept?.(
      (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!enabled)
          for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
            loadDataOperationControlVerdictResult22.takeKept(
              dataOperationControlVerdict2,
            );
      },
    );
    dataOperationControlVerdict.wal.twinKept?.(
      (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        try {
          if (!enabled) {
            dataOperationControlVerdict.claimed?.(
              `tray`,
              dataOperationControlVerdict2,
              `twin`,
            );
          }
        } catch {}
      },
    );
  } catch {}
  let label4: Dynamic = dataOperationControlVerdict.session.get()?.label;
  let loadDataOperationControlVerdictResult17: Dynamic;
  let loadDataOperationControlVerdictHandler27: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationControlVerdict2.sent === true &&
    (dataOperationControlVerdict2.replayed === true ||
      (dataOperationControlVerdict2.verdictLostTries ?? 0) > 0) &&
    !dataOperationControlVerdict2.namesRefused;
  let rekeyHolds3 = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let sessionEntry: Dynamic = dataOperationControlVerdict.session.get();
    if (!sessionEntry || sessionEntry.label === dataOperationControlVerdict2)
      return;
    let items3: Dynamic = [];
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      (items3.push as Dynamic)(
        ...(loadDataOperationControlVerdictResult22.inflight
          ? [loadDataOperationControlVerdictResult22.inflight]
          : []),
        ...loadDataOperationControlVerdictResult22.queue,
      );
    let hwm: Dynamic = sessionEntry.hwm;
    for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic)
      for (let loadDataOperationControlVerdictResult23 of [
        ...loadDataOperationControlVerdictResult22.predicted.flat(),
        ...resolveDataOperationControlFlat3(
          loadDataOperationControlVerdictResult22,
        ),
      ] as Dynamic)
        hwm = Math.max(
          hwm,
          resolveDataOperationControlStartsWith(
            loadDataOperationControlVerdictResult23,
            sessionEntry.label,
          ),
        );
    let lookup3: Dynamic = new (Map as Dynamic)();
    for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic)
      if (
        !loadDataOperationControlVerdictHandler27(
          loadDataOperationControlVerdictResult22,
        )
      )
        for (let loadDataOperationControlVerdictResult23 of resolveDataOperationControlFlat3(
          loadDataOperationControlVerdictResult22,
        ) as Dynamic)
          if (
            resolveDataOperationControlStartsWith(
              loadDataOperationControlVerdictResult23,
              dataOperationControlVerdict2,
            ) >= 0 &&
            !lookup3.has(loadDataOperationControlVerdictResult23)
          ) {
            lookup3.set(
              loadDataOperationControlVerdictResult23,
              `${sessionEntry.label}.${hwm + 1 + lookup3.size}`,
            );
          }
    if (lookup3.size !== 0) {
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic) {
        loadDataOperationControlVerdictResult22.toldHwm = null;
        for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
          ? [
              loadDataOperationControlVerdictResult22.inflight,
              ...loadDataOperationControlVerdictResult22.queue,
            ]
          : loadDataOperationControlVerdictResult22.queue) as Dynamic) {
          let ops: Dynamic = loadDataOperationControlVerdictResult23.ops;
          if (
            (loadDataOperationControlVerdictResult23.replayed ||
              loadDataOperationControlVerdictResult23.lost) &&
            !loadDataOperationControlVerdictResult23.loggedAs
          ) {
            loadDataOperationControlVerdictResult23.loggedAs = {
              ops: loadDataOperationControlVerdictResult23.ops,
              predicted: loadDataOperationControlVerdictResult23.predicted,
              ...(loadDataOperationControlVerdictResult23.homes
                ? {
                    homes: loadDataOperationControlVerdictResult23.homes,
                  }
                : {}),
            };
          }
          loadDataOperationControlVerdictResult23.editorSaid ??=
            loadDataOperationControlVerdictResult23.predicted;
          [
            loadDataOperationControlVerdictResult23.ops,
            loadDataOperationControlVerdictResult23.predicted,
          ] = [
            getDataOperationControlSize(
              loadDataOperationControlVerdictResult23.ops,
              lookup3,
            ),
            getDataOperationControlSize(
              loadDataOperationControlVerdictResult23.predicted,
              lookup3,
            ),
          ];
          loadDataOperationControlVerdictResult23.homes &&=
            getDataOperationControlSize(
              loadDataOperationControlVerdictResult23.homes,
              lookup3,
            );
          if (loadDataOperationControlVerdictResult23.ops !== ops) {
            trim(
              loadDataOperationControlVerdictResult22,
              loadDataOperationControlVerdictResult23,
            );
          }
        }
        loadDataOperationControlVerdictResult22.rekeyWords(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            lookup3.get(dataOperationControlVerdict3) ??
            dataOperationControlVerdict3,
        );
        loadDataOperationControlVerdictResult22.rekeyHolds(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            lookup3.get(dataOperationControlVerdict3) ??
            dataOperationControlVerdict3,
        );
      }
      dataOperationControlVerdict.session.set({
        ...sessionEntry,
        hwm: hwm + lookup3.size,
      });
    }
  };
  let loadDataOperationControlVerdictHandler28: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookup3: Dynamic = new (Map as Dynamic)();
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      for (let loadDataOperationControlVerdictResult23 of [
        ...(loadDataOperationControlVerdictResult22.inflight
          ? [loadDataOperationControlVerdictResult22.inflight]
          : []),
        ...loadDataOperationControlVerdictResult22.queue,
        ...loadDataOperationControlVerdictResult22.handed,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult23.editorSaid) {
          loadDataOperationControlVerdictResult23.editorSaid.forEach(
            (
              editorSaid?: Dynamic,
              index5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              editorSaid.forEach(
                (
                  rolldownRImport2?: Dynamic,
                  index6?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let predictedItemItem: Dynamic =
                    loadDataOperationControlVerdictResult23.predicted[index5]?.[
                      index6
                    ];
                  if (
                    predictedItemItem !== undefined &&
                    predictedItemItem !== rolldownRImport2
                  ) {
                    lookup3.set(rolldownRImport2, predictedItemItem);
                  }
                },
              ),
          );
        }
    return lookup3;
  };
  let slice: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let label5: Dynamic = dataOperationControlVerdict.session.get()?.label;
    let uniqueItems7: Dynamic = new (Set as Dynamic)();
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
        ? [
            loadDataOperationControlVerdictResult22.inflight,
            ...loadDataOperationControlVerdictResult22.queue,
          ]
        : loadDataOperationControlVerdictResult22.queue) as Dynamic)
        if (
          !loadDataOperationControlVerdictResult23.assert &&
          !loadDataOperationControlVerdictHandler27(
            loadDataOperationControlVerdictResult23,
          )
        )
          for (let loadDataOperationControlVerdictResult24 of resolveDataOperationControlFlat3(
            loadDataOperationControlVerdictResult23,
          ) as Dynamic) {
            let lastIndexOf: Dynamic =
              loadDataOperationControlVerdictResult24.lastIndexOf(`.`);
            let loadDataOperationControlVerdictResultSlice: Dynamic =
              lastIndexOf > 0
                ? loadDataOperationControlVerdictResult24.slice(0, lastIndexOf)
                : ``;
            if (
              loadDataOperationControlVerdictResultSlice !== `` &&
              loadDataOperationControlVerdictResultSlice !== `_` &&
              loadDataOperationControlVerdictResultSlice !== label5
            ) {
              uniqueItems7.add(loadDataOperationControlVerdictResultSlice);
            }
          }
    return [...uniqueItems7];
  };
  let rekeyHolds4 = (..._extraArguments: unknown[]): undefined => {
    for (let loadDataOperationControlVerdictResult22 of slice() as Dynamic)
      rekeyHolds3(loadDataOperationControlVerdictResult22);
  };
  let rekeyHolds5 = (..._extraArguments: unknown[]): undefined => {
    for (let loadDataOperationControlVerdictResult22 of slice() as Dynamic)
      rekeyHolds2(loadDataOperationControlVerdictResult22);
  };
  let loadDataOperationControlVerdictResult18 = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    enabled22 = false;
    if (options !== undefined && options !== `_`) {
      uniqueItems6.add(options);
    }
    resolveObservabilityTelemetryChunk2(dataOperationControlVerdict2);
    for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
      loadDataOperationControlVerdictResult22.toldHwm = null;
    let loadDataOperationControlVerdictHandler30 = (
      ..._extraArguments: unknown[]
    ): undefined =>
      void loadDataOperationControlVerdictHandler29().then(
        (..._extraArguments: unknown[]): undefined => {
          for (let loadDataOperationControlVerdictResult22 of new (Set as Dynamic)(
            [dataOperationControlVerdict2, options],
          ) as Dynamic)
            if (loadDataOperationControlVerdictResult22 !== undefined) {
              rekeyHolds3(loadDataOperationControlVerdictResult22);
            }
          if (enabled21) {
            rekeyHolds4();
          }
          lookup.forEach(
            (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              lookup3.pump(),
          );
        },
      );
    let count10 = count7 < 2 ? 0 : Math.min(3e4, 250 * 2 ** (count7 - 1));
    count7 += 1;
    if (count10 === 0) {
      loadDataOperationControlVerdictHandler30();
    } else {
      dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          if (!enabled) {
            loadDataOperationControlVerdictHandler30();
          }
        },
        count10,
      );
    }
  };
  let enabled22 = false;
  let loadDataOperationControlVerdictResult19: Dynamic = null;
  let enabled23 = false;
  let enabled24 = false;
  let uniqueItems6: Dynamic = new (Set as Dynamic)();
  let count7: Dynamic = 0;
  let loadDataOperationControlVerdictResult20: Dynamic = null;
  let count8: Dynamic = 0;
  let count9 = 0;
  let enabled25 = false;
  let ObservabilityTelemetryState122 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    loadDataOperationControlVerdictResult19 = null;
    enabled23 = false;
    loadDataOperationControlVerdictResult3 = null;
    loadDataOperationControlVerdictHandler29().then(
      (..._extraArguments: unknown[]): Dynamic =>
        lookup.forEach(
          (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            lookup3.pump(),
        ),
    );
  };
  let loadDataOperationControlVerdictHandler29: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (loadDataOperationControlVerdictResult19 ??= (async (
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      if (
        enabled ||
        ((count8 > 0 || count9 > 0) &&
          (await loadDataOperationControlVerdictHandler(
            Math.max(
              count,
              resolveDataOperationControlValue23(
                Math.max(count8, count9),
                dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              ),
            ),
          ),
          enabled))
      )
        return;
      let sessionEntry: Dynamic = enabled21
        ? null
        : dataOperationControlVerdict.session.get();
      if (sessionEntry) {
        loadDataOperationControlVerdictResult9 = sessionEntry;
        dataOperationControlVerdict.session.set(null);
      }
      loadDataOperationControlVerdictResult20 = sessionEntry;
      let enabled26 = false;
      try {
        let loadDataOperationControlVerdictResult22: Dynamic = ++asks;
        let race5: Dynamic = race2(
          (
            dataOperationControlVerdict2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            TELEMETRYATTRIBUTENAMES2(
              dataOperationControlVerdict2,
              loadDataOperationControlVerdictResult22,
            ),
        );
        let body: Dynamic = race5.body;
        let rep: Dynamic = await race5.rep;
        if (enabled) return;
        loadDataOperationControlVerdictResult20 = null;
        let dataOperationControlSure: Dynamic =
          resolveDataOperationControlSure(rep);
        judged(
          body,
          rep.busy === true && isPlainRecord(rep.said) ? rep.said : rep,
          dataOperationControlSure &&
            (dataOperationControlSure.sure ||
              loadDataOperationControlVerdictHandler26())
            ? `page_gone`
            : rep.verdict === `unreachable` || dataOperationControlSure
              ? `backoff`
              : rep.verdict === `allow`
                ? `landed`
                : test(rep)
                  ? `view_only`
                  : `no_service`,
          {
            road: `mint`,
            verb: `create`,
            seated: loadDataOperationControlVerdictHandler26(),
            opId: body.opId,
            vis: visibility.state(),
          },
        );
        if (
          dataOperationControlSure &&
          (dataOperationControlSure.sure ||
            loadDataOperationControlVerdictHandler26())
        )
          return void pageStopped(`deleted`);
        let refusalClass2: Dynamic = refusalClass();
        let classify2: Dynamic =
          refusalClass2 === null || rep.verdict === `allow`
            ? null
            : refusalClass2.classify(rep, {
                road: `mint`,
                verb: `create`,
                seated: loadDataOperationControlVerdictHandler26(),
              });
        let matchesClassify =
          classify2 !== null &&
          (classify2.source === `relay` || classify2.source === `http`) &&
          classify2.k !== `page_terminal` &&
          classify2.k !== `op_terminal`;
        count8 =
          rep.verdict === `unreachable` ||
          dataOperationControlSure ||
          matchesClassify
            ? count8 + 1
            : 0;
        if (
          refusalClass2 !== null &&
          count8 >= refusalClass2.TRANSIENT_RETRY_MAX
        ) {
          emit5(`unreached`, `create ×${count8}`, `mint`);
        }
        let next: Dynamic =
          isPlainRecord(rep.data) && typeof rep.data.next == `number`
            ? rep.data.next
            : 0;
        if (isPlainRecord(rep.data) && Array.isArray(rep.data.accepts)) {
          items = rep.data.accepts.filter(
            (accept?: unknown, ..._extraArguments: unknown[]) =>
              typeof accept == `string`,
          );
        }
        roadMoved(rep, loadDataOperationControlVerdictResult22, false);
        let refusalClass3: Dynamic = refusalClass();
        let classify3: Dynamic =
          refusalClass3 === null || rep.verdict === `allow`
            ? null
            : refusalClass2 === refusalClass3
              ? classify2
              : refusalClass3.classify(rep, {
                  road: `mint`,
                  verb: `create`,
                  seated: loadDataOperationControlVerdictHandler26(),
                });
        if (
          classify3?.k === `page_terminal` &&
          classify3.source !== `relay` &&
          classify3.source !== `http` &&
          (classify3.face === `not_governed` || classify3.face === `cmek`)
        )
          return void pageStopped(classify3.face);
        if (rep.verdict === `allow`) {
          pump2();
        }
        loadDataOperationControlVerdictHandler10(
          rep.verdict === `unreachable` || dataOperationControlSure
            ? `no_answer`
            : rep.verdict === `allow`
              ? `caps_absent`
              : `refused`,
        );
        if (rep.verdict === `unreachable` && !dataOperationControlSure) {
          resolveDataOperationControlValue242();
        }
        info();
        let matchesVerdict =
          rep.verdict === `allow` &&
          typeof rep.sess == `string` &&
          typeof rep.sessSecret == `string`;
        if (rep.verdict === `allow`) {
          enabled24 = true;
          emit2(false);
        }
        if (enabled21) return;
        if (!matchesVerdict) {
          if (rep.verdict === `allow`) {
            if (sessionEntry) {
              rekeyHolds2(
                (loadDataOperationControlVerdictResult17 = sessionEntry.label),
              );
            }
            rekeyHolds5();
            return;
          }
          if (
            rep.verdict === `unreachable` ||
            dataOperationControlSure ||
            matchesClassify
          )
            return;
          if (test(rep)) return void emit2(true);
          if (sessionEntry) {
            dataOperationControlVerdict.session.set(sessionEntry);
          }
          enabled21 =
            sessionEntry !== null ||
            dataOperationControlVerdict.session.get() !== null;
          if (enabled21) {
            emit8();
          }
          return;
        }
        enabled26 = true;
        enabled21 = true;
        count9 = 0;
        let hwm: Dynamic = floor(rep.sess, next);
        dataOperationControlVerdict.session.set({
          label: rep.sess,
          secret: rep.sessSecret,
          hwm: hwm,
        });
        rekeyHolds(rep.sess, hwm);
        if (sessionEntry) {
          rekeyHolds3(sessionEntry.label);
        }
        rekeyHolds4();
        emit8();
      } catch {
        if (enabled) return;
        loadDataOperationControlVerdictResult20 = null;
        count8 += 1;
        if (
          !enabled21 &&
          sessionEntry &&
          !dataOperationControlVerdict.session.get()
        ) {
          dataOperationControlVerdict.session.set(sessionEntry);
        }
        if (dataOperationControlVerdict.session.get()) {
          enabled21 = true;
        }
      } finally {
        if (
          !enabled26 &&
          !enabled21 &&
          sessionEntry &&
          loadDataOperationControlVerdictResult17 === undefined
        ) {
          loadDataOperationControlVerdictResult17 = sessionEntry.label;
          rekeyHolds2(sessionEntry.label);
        }
        enabled23 = true;
        if (!enabled21) {
          rekeyHolds5();
        }
        let enabled27 = enabled25;
        enabled25 = false;
        if (enabled27 && enabled14 && !enabled) {
          queueMicrotask(
            (..._extraArguments: unknown[]): undefined =>
              void (
                enabled14 &&
                enabled23 &&
                !enabled &&
                ObservabilityTelemetryState122()
              ),
          );
        }
      }
    })());
  class loadDataOperationControlVerdictResult21 {
    [key: string]: Dynamic;
    node: Dynamic;
    downs: Dynamic = new (Set as Dynamic)();
    queue: Dynamic = [];
    inflight: Dynamic = null;
    provisional: Dynamic = new (Map as Dynamic)();
    lastRev: Dynamic = -1;
    recounting: Dynamic = false;
    comparing: Dynamic = new (Map as Dynamic)();
    comparedRevs: Dynamic = new (Map as Dynamic)();
    painted(response?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (
        this.orphanLatched &&
        !this.dead &&
        response?.order !== true &&
        response?.ok !== true &&
        typeof response?.block == `string`
      ) {
        this.holed.delete(response.block);
        this.declinedHoles.delete(response.block);
        this.redelivered.delete(response.block);
        this.uncoolBlock(response.block);
        reportOperationEvent(`block.declined.orphan`, {
          block: response.block,
          rev: typeof response.rev == `number` ? response.rev : -1,
          held: response.held === true,
        });
        return;
      }
      if (response?.held) {
        if (
          typeof response.block == `string` &&
          !this.dead &&
          !honourOpsOnFeed()
        ) {
          this.holed.add(response.block);
        }
        return;
      }
      if (
        !(
          (response?.block !== null && typeof response?.block != `string`) ||
          typeof response.rev != `number` ||
          this.dead
        )
      ) {
        if (response.order) {
          if (response.ok) {
            this.orderDiverged = false;
            this.orderRecadence(Math.min(this.orderCalm + 1, 3));
            return;
          }
          if (
            response.rev !== this.groundRev ||
            this.roomRev !== this.groundRev
          )
            return;
          this.orderRecadence(0);
          this.orderMismatches += 1;
          this.orderDiverged = true;
          reportOperationEvent(`heal.order`, {
            probed: this.orderAsked,
            mismatch: this.orderMismatches,
            rev: response.rev,
          });
          console.warn(
            `opTransport: heal.order — the door's block order is not this screen's at the same rev (probe ${this.orderAsked}, mismatch ${this.orderMismatches}; rev ${response.rev}) — the stall healer takes it`,
          );
          this.healStalled(
            `the door's block order diverged from the screen at the same rev`,
          );
          return;
        }
        if (response.compare && response.block !== null) {
          let items3: Dynamic = [
            response.block,
            ...(this.comparing.get(response.block) ?? []),
          ];
          this.comparing.delete(response.block);
          for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic)
            if (response.ok) {
              this.holed.delete(loadDataOperationControlVerdictResult22);
              this.declinedHoles.delete(
                loadDataOperationControlVerdictResult22,
              );
              this.uncoolBlock(loadDataOperationControlVerdictResult22);
            } else {
              this.holed.add(loadDataOperationControlVerdictResult22);
            }
          if (!response.ok) {
            this.owed = true;
          }
          return this.pump();
        }
        if (response.block === null) {
          if (response.ok && !response.row && !response.compare) {
            this.unholeAll();
          }
          return this.pump();
        }
        if (response.ok) {
          this.holed.delete(response.block);
          this.declinedHoles.delete(response.block);
          this.uncoolBlock(response.block);
          return this.pump();
        }
        if (honourOpsOnFeed()) {
          this.wholeRead(`a print this page declined to place`, response.rev);
          emit7();
          return this.pump();
        }
        if (
          !response.held &&
          this.redelivered.get(response.block) === response.rev &&
          this.redelivered.delete(response.block) &&
          this.pending() === 0 &&
          this.declinedHoles.has(response.block)
        ) {
          this.holed.add(response.block);
          let blockCoolEntry: Dynamic = this.blockCool.get(response.block);
          if (blockCoolEntry) {
            blockCoolEntry.stuck = true;
          } else {
            this.blockCool.set(response.block, {
              timer: null,
              ms: 250,
              again: false,
              behind: true,
              fresh: false,
              stuck: true,
            });
          }
          reportOperationEvent(`block.redelivery.stuck`, {
            block: response.block,
            rev: response.rev,
          });
          this.healArm(dataOperationControlValue6000);
          return;
        }
        this.redelivered.delete(response.block);
        this.handedRevs.delete(response.block);
        this.owed = this.oweWhole = true;
        if (this.pending() === 0 && reconcile) {
          emit7();
          return this.pump();
        }
        this.holed.add(response.block);
        this.declinedHoles.add(response.block);
        if (this.declinedHoles.size > 256) {
          this.declinedHoles.clear();
        }
        this.healArm(dataOperationControlValue6000);
        emit7();
        if (this.pending() === 0) {
          this.mendHoles();
          this.pump();
        }
      }
    }
    declinedHoles: Dynamic = new (Set as Dynamic)();
    redelivered: Dynamic = new (Map as Dynamic)();
    shownRev: Dynamic = -1;
    picRev: Dynamic = -1;
    deadBids: Dynamic = new (Map as Dynamic)();
    sent: Dynamic = new (Set as Dynamic)();
    blockReads: Dynamic = new (Set as Dynamic)();
    leftWords: Dynamic = [];
    shortRevived: Dynamic = new (Map as Dynamic)();
    shortGrace: Dynamic = new (Set as Dynamic)();
    shortInGrace(..._extraArguments: unknown[]) {
      for (let loadDataOperationControlVerdictResult22 of this.shortRevived.keys() as Dynamic)
        if (!this.shortGrace.has(loadDataOperationControlVerdictResult22))
          return false;
      return true;
    }
    leftRead: Dynamic = false;
    strays: Dynamic = 0;
    trayHolds(..._extraArguments: unknown[]) {
      return this.trayLines() > 0;
    }
    trayLines(..._extraArguments: unknown[]): Dynamic {
      return this.leftWords.filter(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
          leftWord.tray === true &&
          leftWord.quiet !== true &&
          leftWord.text !== ``,
      ).length;
    }
    proposedEver: Dynamic = new (Set as Dynamic)();
    grantedEver: Dynamic = new (Set as Dynamic)();
    rekeyWords(
      dataOperationControlVerdict2?: Dynamic,
      options: Dynamic = false,
      context: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined {
      let items3: Dynamic = [];
      let dataOperationControlVerdict3: Dynamic = (
        ask?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (ask.real === true) return ask;
        let bid: Dynamic = dataOperationControlVerdict2(ask.bid);
        let afterId: Dynamic =
          ask.afterId === null
            ? null
            : dataOperationControlVerdict2(ask.afterId);
        if (bid === ask.bid && afterId === ask.afterId) return ask;
        let ask2: Dynamic = {
          ...ask,
          bid: bid,
          afterId: afterId,
          ...(options
            ? {
                real: true,
              }
            : {}),
        };
        items3.push([ask, ask2]);
        return ask2;
      };
      this.leftWords = this.leftWords.map(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          !context && leftWord.moved === true
            ? leftWord
            : dataOperationControlVerdict3(leftWord),
      );
      let items4: Dynamic = [];
      if (context)
        for (let [
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        ] of this.myWords as Dynamic) {
          let dataOperationControlVerdict4: Dynamic =
            dataOperationControlVerdict3(
              loadDataOperationControlVerdictResult23,
            );
          if (
            dataOperationControlVerdict4 !==
            loadDataOperationControlVerdictResult23
          ) {
            items4.push([
              loadDataOperationControlVerdictResult22,
              dataOperationControlVerdict4,
            ]);
          }
        }
      for (let [loadDataOperationControlVerdictResult22] of items4 as Dynamic)
        this.myWords.delete(loadDataOperationControlVerdictResult22);
      for (let [, ask] of items4 as Dynamic)
        this.myWords.set(
          resolveDataOperationControlValue30(ask.bid, ask.afterId ?? null),
          ask,
        );
      for (let [
        ask,
        loadDataOperationControlVerdictResult22,
      ] of items3 as Dynamic)
        try {
          dataOperationControlVerdict.wal.stageWords?.(this.node, {
            bid: ask.bid,
            afterId: ask.afterId ?? null,
            text: ``,
            only: true,
          });
          let leftWord: Dynamic =
            this.leftWords.find(
              (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
                ask2.bid === ask.bid &&
                (ask2.afterId ?? null) === (ask.afterId ?? null),
            ) ??
            this.myWords.get(
              resolveDataOperationControlValue30(ask.bid, ask.afterId ?? null),
            );
          if (leftWord) {
            this.stagePut(leftWord);
          }
          this.stagePut(loadDataOperationControlVerdictResult22);
        } catch {}
    }
    dedupeWords(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      items3?: Dynamic,
      argument: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ) => dataOperationControlVerdict3.moved !== true,
      ..._extraArguments: unknown[]
    ): undefined {
      let items4: Dynamic = [];
      dataOperationControlVerdict2.forEach(
        (
          event?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let target: Dynamic = event.target;
          let side: Dynamic = event.side;
          let loadDataOperationControlVerdictHandler30: Dynamic = (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            dependencies.get(dataOperationControlVerdict3) ??
            dataOperationControlVerdict3;
          if (
            event.op === `split` &&
            isPlainRecord(target) &&
            target.kind === `chars` &&
            Array.isArray(target.range) &&
            side === `after`
          ) {
            let dataOperationControlVerdictHandler: Dynamic =
              loadDataOperationControlVerdictHandler30(String(target.range[0]));
            let bid: Dynamic =
              resolveDataOperationControlFlatMap2(options[index5]?.minted)[0] ??
              (typeof event.id == `string`
                ? loadDataOperationControlVerdictHandler30(event.id)
                : context[index5]?.[0] === undefined
                  ? undefined
                  : loadDataOperationControlVerdictHandler30(
                      context[index5][0],
                    ));
            this.leftWords = this.leftWords.flatMap(
              (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                if (
                  !argument(ask) ||
                  (ask.afterId ?? null) !==
                    dataOperationControlVerdictHandler ||
                  !ask.text.startsWith(DataOperationControlMessage11) ||
                  (items3 && items3.length > 0 && !items3.includes(ask.bid))
                )
                  return [ask];
                let text: Dynamic = ask.text.slice(1);
                let record4: Dynamic =
                  text === ``
                    ? null
                    : bid === undefined
                      ? {
                          ...ask,
                          text: text,
                        }
                      : {
                          ...ask,
                          bid: bid,
                          afterId: null,
                          text: text,
                          real: true,
                        };
                items4.push([ask, record4]);
                return record4 ? [record4] : [];
              },
            );
            return;
          }
          if (
            event.op === `join` &&
            isPlainRecord(target) &&
            target.kind === `blocks` &&
            Array.isArray(target.ids) &&
            target.ids.length >= 2
          ) {
            let [bid, setBid]: Dynamic = [
              loadDataOperationControlVerdictHandler30(String(target.ids[0])),
              loadDataOperationControlVerdictHandler30(
                String(target.ids[target.ids.length - 1]),
              ),
            ];
            let dataOperationControlVerdictSlice: Dynamic =
              dataOperationControlVerdict2
                .slice(index5 + 1)
                .find(
                  (event2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    event2.op === `insert` &&
                    isPlainRecord(event2.target) &&
                    event2.target.kind === `chars` &&
                    event2.side === `after` &&
                    isPlainRecord(event2.source) &&
                    isPlainRecord(event2.source.from),
                );
            let content2: Dynamic =
              dataOperationControlVerdictSlice &&
              isPlainRecord(dataOperationControlVerdictSlice.source) &&
              isPlainRecord(dataOperationControlVerdictSlice.source.from)
                ? dataOperationControlVerdictSlice.source.from.content
                : undefined;
            let afterId2: Dynamic =
              dataOperationControlVerdictSlice &&
              Array.isArray(dataOperationControlVerdictSlice.target.range)
                ? loadDataOperationControlVerdictHandler30(
                    String(dataOperationControlVerdictSlice.target.range[0]),
                  )
                : null;
            this.leftWords = this.leftWords.flatMap(
              (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                if (
                  !argument(ask) ||
                  ask.bid !== setBid ||
                  (ask.afterId ?? null) !== null ||
                  !ask.text.startsWith(DataOperationControlMessage12)
                )
                  return [ask];
                let text: Dynamic = ask.text.slice(1);
                let matchesText: Dynamic =
                  text !== `` &&
                  afterId2 !== null &&
                  typeof content2 == `string` &&
                  content2 !== `` &&
                  (text.startsWith(content2) || content2.startsWith(text));
                let ask2: Dynamic =
                  text === ``
                    ? null
                    : matchesText
                      ? {
                          ...ask,
                          bid: bid,
                          afterId: afterId2,
                          text: text,
                          real: true,
                        }
                      : {
                          ...ask,
                          text: text,
                        };
                items4.push([ask, ask2]);
                return ask2 ? [ask2] : [];
              },
            );
            return;
          }
          let from: Dynamic = isPlainRecord(event.source)
            ? event.source.from
            : undefined;
          let content: Dynamic =
            isPlainRecord(from) &&
            from.kind === `inline` &&
            typeof from.content == `string`
              ? from.content
              : null;
          if (
            event.op !== `insert` ||
            !isPlainRecord(target) ||
            content === null ||
            content === ``
          )
            return;
          let loadDataOperationControlVerdictResult22: Dynamic;
          let loadDataOperationControlVerdictResult23: Dynamic;
          if (
            target.kind === `chars` &&
            Array.isArray(target.range) &&
            side === `after`
          )
            loadDataOperationControlVerdictResult22 = String(target.range[0]);
          else if (
            target.kind === `chars` &&
            Array.isArray(target.range) &&
            side === `before` &&
            items3?.length === 1
          )
            [
              loadDataOperationControlVerdictResult22,
              loadDataOperationControlVerdictResult23,
            ] = [null, items3[0]];
          else if (
            target.kind === `blocks` &&
            Array.isArray(target.ids) &&
            side === `start`
          )
            [
              loadDataOperationControlVerdictResult22,
              loadDataOperationControlVerdictResult23,
            ] = [null, String(target.ids[0])];
          else return;
          if (typeof loadDataOperationControlVerdictResult22 == `string`) {
            loadDataOperationControlVerdictResult22 =
              dependencies.get(loadDataOperationControlVerdictResult22) ??
              loadDataOperationControlVerdictResult22;
          }
          if (loadDataOperationControlVerdictResult23 !== undefined) {
            loadDataOperationControlVerdictResult23 =
              dependencies.get(loadDataOperationControlVerdictResult23) ??
              loadDataOperationControlVerdictResult23;
          }
          let dataOperationControlFlatMap2: Dynamic =
            resolveDataOperationControlFlatMap2(options[index5]?.minted);
          let matchesDataOperationControlFlatMap2Count =
            dataOperationControlFlatMap2.length === [...content].length ||
            dataOperationControlFlatMap2.length === content.length;
          let afterId: Dynamic = matchesDataOperationControlFlatMap2Count
            ? dataOperationControlFlatMap2[
                dataOperationControlFlatMap2.length - 1
              ]
            : context[index5]?.length
              ? ((
                  dataOperationControlVerdict3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  dependencies.get(dataOperationControlVerdict3) ??
                  dataOperationControlVerdict3)(
                  context[index5][context[index5].length - 1],
                )
              : undefined;
          this.leftWords = this.leftWords.flatMap(
            (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              if (!argument(ask)) return [ask];
              let matchesAfterId: Dynamic =
                (ask.afterId ?? null) ===
                  loadDataOperationControlVerdictResult22 &&
                (loadDataOperationControlVerdictResult23 === undefined ||
                  ask.bid === loadDataOperationControlVerdictResult23) &&
                (!items3 || items3.length === 0 || items3.includes(ask.bid));
              let contentCount: Dynamic = ask.text.startsWith(content)
                ? content.length
                : resolveDataModelSchemasCharCodeAt4(ask.text, content);
              if (
                !matchesAfterId ||
                contentCount < 0 ||
                resolveDataModelSchemasCharCodeAt2(ask.text, contentCount)
              )
                return [ask];
              let text: Dynamic = ask.text.slice(contentCount);
              if (text !== `` && afterId === undefined) return [ask];
              let record4: Dynamic =
                text === ``
                  ? null
                  : {
                      ...ask,
                      afterId: afterId,
                      text: text,
                      ...(matchesDataOperationControlFlatMap2Count
                        ? {
                            real: true,
                          }
                        : {}),
                    };
              items4.push([ask, record4]);
              return record4 ? [record4] : [];
            },
          );
        },
      );
      for (let [
        ask,
        loadDataOperationControlVerdictResult22,
      ] of items4 as Dynamic)
        try {
          dataOperationControlVerdict.wal.stageWords?.(this.node, {
            bid: ask.bid,
            afterId: ask.afterId,
            text: ``,
            only: true,
          });
          let myWordEntry: Dynamic = this.myWords.get(
            resolveDataOperationControlValue30(ask.bid, ask.afterId ?? null),
          );
          if (myWordEntry) {
            this.stagePut(myWordEntry);
          }
          if (loadDataOperationControlVerdictResult22) {
            this.stagePut(loadDataOperationControlVerdictResult22);
          }
        } catch {}
    }
    lastBlocks: Dynamic = null;
    async idsNow(
      dataOperationControlVerdict2: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let lastBlocks: Dynamic = dataOperationControlVerdict2
        ? null
        : this.lastBlocks;
      if (!lastBlocks) {
        let door: Dynamic = await this.door({
          verb: `read`,
          payload: {
            kind: `view`,
          },
        });
        let data: Dynamic = door && isPlainRecord(door.data) ? door.data : {};
        let onFaces2: Dynamic =
          door?.verdict === `allow` && typeof data.doc == `string`
            ? onFaces(data.doc)
            : null;
        let enabled26: Dynamic =
          !!onFaces2 &&
          ((onFaces2.capped?.length ?? 0) > 0 ||
            (onFaces2.folded ?? 0) > 0 ||
            onFaces2.complete === false ||
            data.complete === false ||
            data.complete === 0 ||
            onFaces2.blocks.some(
              (block?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                block.opaque,
            ));
        lastBlocks = onFaces2 && !enabled26 ? onFaces2.blocks : null;
      }
      if (!lastBlocks) return null;
      let lookup3: Dynamic = new (Map as Dynamic)();
      for (let ask of lastBlocks as Dynamic)
        if (!ask.opaque)
          for (let loadDataOperationControlVerdictResult22 of ask.runs as Dynamic) {
            let editorExtensionsSess: Dynamic = resolveEditorExtensionsSess(
              loadDataOperationControlVerdictResult22.id,
            );
            if (!editorExtensionsSess)
              lookup3.set(loadDataOperationControlVerdictResult22.id, ask.bid);
            else
              for (
                let index5 = 0;
                index5 < loadDataOperationControlVerdictResult22.len;
                index5++
              )
                lookup3.set(
                  resolveEditorExtensionsValue22(
                    editorExtensionsSess.sess,
                    editorExtensionsSess.i + index5,
                  ),
                  ask.bid,
                );
          }
      return lookup3;
    }
    async heldSplitStands(
      event?: Dynamic,
      parentId?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let target: Dynamic = isPlainRecord(event.target) ? event.target : {};
      let rangeItem =
        target.kind === `chars` &&
        Array.isArray(target.range) &&
        typeof target.range[0] == `string` &&
        target.range[0] === target.range[1]
          ? target.range[0]
          : null;
      if (rangeItem === null) return null;
      let matchesSide = event.side === `before`;
      let door: Dynamic = await this.door({
        verb: `read`,
        payload: matchesSide
          ? {
              kind: `view`,
              parentId: parentId,
            }
          : {
              kind: `view`,
            },
      });
      if (!door) return null;
      let data: Dynamic = isPlainRecord(door.data) ? door.data : {};
      if (door.verdict === `deny`) {
        let label5 = `${String(door.reason)} ${String(data.code)}`;
        return matchesSide &&
          /\b(unknown_block|unknown_id|block_gone|gone|not_found|absent)\b/.test(
            label5,
          )
          ? {
              how: `elsewhere`,
            }
          : null;
      }
      if (door.verdict !== `allow` || typeof data.doc != `string`) return null;
      let loadDataOperationControlVerdictResult22: Dynamic = null;
      try {
        loadDataOperationControlVerdictResult22 = onFaces(data.doc);
      } catch {
        loadDataOperationControlVerdictResult22 = null;
      }
      if (!loadDataOperationControlVerdictResult22) return null;
      let rev = [
        door.rev,
        data.rev,
        loadDataOperationControlVerdictResult22.rev,
      ].find(
        (item?: unknown, ..._extraArguments: unknown[]) =>
          typeof item == `number`,
      );
      let blocks: Dynamic = loadDataOperationControlVerdictResult22.blocks;
      let blockIndex: Dynamic = blocks.findIndex(
        (ask?: Dynamic, ..._extraArguments: unknown[]) => ask.bid === parentId,
      );
      let matchesCappedCount =
        (loadDataOperationControlVerdictResult22.capped?.length ?? 0) > 0 ||
        (loadDataOperationControlVerdictResult22.folded ?? 0) > 0 ||
        loadDataOperationControlVerdictResult22.complete === false ||
        data.complete === false ||
        data.complete === 0;
      if (!matchesSide && matchesCappedCount) return null;
      if (blockIndex < 0)
        return {
          how: `elsewhere`,
          rev: rev,
        };
      let blockItem: Dynamic = blocks[blockIndex];
      if (blockItem.opaque) return null;
      if (matchesSide)
        return {
          how: blockItem.runs[0]?.id === rangeItem ? `stands` : `elsewhere`,
          rev: rev,
        };
      let blockItem2: Dynamic =
        blockIndex > 0 ? blocks[blockIndex - 1] : undefined;
      if (blockItem2?.opaque) return null;
      let runItem: Dynamic = blockItem2?.runs[blockItem2.runs.length - 1];
      let editorExtensionsSess: Dynamic = runItem
        ? resolveEditorExtensionsSess(runItem.id)
        : null;
      return {
        how:
          (runItem === undefined
            ? undefined
            : editorExtensionsSess
              ? resolveEditorExtensionsValue22(
                  editorExtensionsSess.sess,
                  editorExtensionsSess.i + runItem.len - 1,
                )
              : runItem.id) === rangeItem
            ? `stands`
            : `elsewhere`,
        rev: rev,
      };
    }
    wordsOwed: Dynamic = false;
    remountOwed: Dynamic = false;
    mountReadonly: Dynamic = false;
    mountWait: Dynamic = null;
    mountInst: Dynamic = null;
    servedSlow: Dynamic = false;
    remountOut: Dynamic = new (Set as Dynamic)();
    ackedRecent: Dynamic = [];
    unanswered(..._extraArguments: unknown[]) {
      return this.pending() > 0 || this.handed.length > 0;
    }
    handOwedWords(..._extraArguments: unknown[]): undefined {
      if (
        !(this.wordsOwed || this.remountOwed) ||
        !this.served ||
        enabled ||
        this.dead ||
        (this.wordsOwed &&
          ([this.inflight, ...this.queue].some(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              item?.replayed,
          ) ||
            this.wordsBehind.size > 0)) ||
        (this.remountOwed && (this.unanswered() || this.mountWait !== null)) ||
        (this.remountOwed && this.mountReadonly)
      )
        return;
      this.wordsOwed = false;
      this.remountOwed = false;
      let staged: Dynamic = this.leftWords
        .filter(
          (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
            !leftWord.parked,
        )
        .map(resolveDataOperationControlBid);
      this.leftWords = this.leftWords.map(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          leftWord.parked
            ? leftWord
            : {
                ...leftWord,
                parked: true,
              },
      );
      if (staged.length > 0) {
        this.emit({
          t: `staged`,
          node: this.node,
          staged: staged,
        });
      }
    }
    ackedRev: Dynamic = -1;
    heardRev: Dynamic = -1;
    pictureSeq: Dynamic = -1;
    heardSeq: Dynamic = -1;
    wrote: Dynamic = [];
    toldHwm: Dynamic = null;
    sessRetries: Dynamic = 0;
    pollTimer: Dynamic = null;
    pollRung: Dynamic = 0;
    pollArmedMs: Dynamic = dataOperationControlValue2000;
    retryTimer: Dynamic = null;
    streamTimer: Dynamic = null;
    freshTimer: Dynamic = null;
    wantComments: Dynamic = true;
    commentsAsk: Dynamic = 0;
    stubTimer: Dynamic = null;
    backTimer: Dynamic = null;
    backs: Dynamic = 0;
    readTop: Dynamic = -1;
    wantRev: Dynamic = -1;
    wantForeign: Dynamic = -1;
    stubs: Dynamic = 0;
    ready: Dynamic;
    dead: Dynamic = false;
    served: Dynamic = false;
    reading: Dynamic = false;
    rung: Dynamic = false;
    rungWhole: Dynamic = false;
    owed: Dynamic = false;
    oweWhole: Dynamic = false;
    slow: Dynamic = false;
    unsettled: Dynamic = false;
    halted: Dynamic = false;
    sinceHaltedAt: Dynamic = null;
    sinceHalted(
      dataOperationControlVerdict2: Dynamic = this.since(),
      ..._extraArguments: unknown[]
    ) {
      return (
        this.sinceHaltedAt !== null &&
        dataOperationControlVerdict2 !== undefined &&
        dataOperationControlVerdict2 <= this.sinceHaltedAt
      );
    }
    cooling: Dynamic = false;
    coolTimer: Dynamic = null;
    gaveUp: Dynamic = false;
    lookRev: Dynamic = null;
    joinTries: Dynamic = 0;
    constructor(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.node = dataOperationControlVerdict2;
      this.takeLeft();
      dataOperationControlVerdict.wal.ready?.then(
        (..._extraArguments: unknown[]): undefined => {
          this.takeLeft();
          emit7();
        },
        (..._extraArguments: unknown[]): undefined => undefined,
      );
      queueMicrotask(
        (..._extraArguments: unknown[]) => (
          enabled14 &&
            !enabled &&
            !this.dead &&
            this.emit(loadDataOperationControlVerdictHandler17(this.node)),
          loadDataOperationControlVerdictResult10 !== null &&
          !enabled &&
          !this.dead
            ? this.emit(resolveDataOperationControlWhy3(this.node))
            : loadDataOperationControlVerdictHandler18() &&
                !enabled &&
                !this.dead
              ? this.emit(loadDataOperationControlVerdictHandler20(this.node))
              : kind !== null &&
                !enabled14 &&
                !enabled &&
                !this.dead &&
                this.emit(loadDataOperationControlVerdictHandler25(this.node)),
          enabled21 ? emit8() : void loadDataOperationControlVerdictHandler29()
        ),
      );
      let load: Dynamic = dataOperationControlVerdict.wal.load(
        dataOperationControlVerdict2,
      );
      let race5: Dynamic = Promise.race([
        load,
        loadDataOperationControlVerdictHandler(400).then(
          (..._extraArguments: unknown[]) =>
            DataOperationControlTheLogDidNotAnswerWithinWALMS,
        ),
      ]);
      let race6: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let uniqueItems7: Dynamic = new (Set as Dynamic)();
        for (let loadDataOperationControlVerdictResult22 of dataOperationControlVerdict3 as Dynamic)
          if (
            isPlainRecord(loadDataOperationControlVerdictResult22) &&
            typeof loadDataOperationControlVerdictResult22.life == `string` &&
            loadDataOperationControlVerdictResult22.life !== life2
          ) {
            uniqueItems7.add(loadDataOperationControlVerdictResult22.life);
          }
        let lookup3: Dynamic = new (Map as Dynamic)();
        return uniqueItems7.size === 0 || !lifeLocks
          ? lookup3
          : Promise.race([
              Promise.all(
                [...uniqueItems7].map(
                  (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    claim(item).then(
                      (
                        result?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): undefined => void lookup3.set(item, result),
                    ),
                ),
              ),
              loadDataOperationControlVerdictHandler(400),
            ]).then((..._extraArguments: unknown[]): Dynamic => lookup3);
      };
      this.ready = race5.then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (result === DataOperationControlTheLogDidNotAnswerWithinWALMS) {
            load.then(
              (..._extraArguments: unknown[]): undefined => {
                if (!enabled && !this.dead && matchesReady) {
                  this.takeLeft();
                  emit7();
                }
              },
              (..._extraArguments: unknown[]): undefined => undefined,
            );
          }
          let items3: Dynamic =
            result === DataOperationControlTheLogDidNotAnswerWithinWALMS
              ? []
              : result;
          if (items3.length === 0) {
            looked(
              result === DataOperationControlTheLogDidNotAnswerWithinWALMS
                ? `late`
                : `none`,
            );
          }
          let race7: Dynamic = race6(items3);
          return race7 instanceof (Map as Dynamic)
            ? this.replay(items3, race7)
            : race7.then((result2?: Dynamic, ..._extraArguments: unknown[]) =>
                this.replay(items3, result2),
              );
        },
        (..._extraArguments: unknown[]) => looked(`fail`),
      );
    }
    wordsBehind: Dynamic = new (Set as Dynamic)();
    wordsBehindTimer: Dynamic = null;
    takeKept(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead || !this.leftRead) return;
      let items3: Dynamic = [];
      try {
        items3 = dataOperationControlVerdict2(this.node).filter(
          (ask?: Dynamic, ..._extraArguments: unknown[]) =>
            ask.tray === true &&
            !this.leftWords.some(
              (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
                ask2.bid === ask.bid &&
                (ask2.afterId ?? null) === (ask.afterId ?? null),
            ),
        );
      } catch {
        return;
      }
      if (items3.length !== 0) {
        for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic)
          this.leftWords.push({
            ...loadDataOperationControlVerdictResult22,
            ...(this.served
              ? {
                  parked: true,
                }
              : {}),
          });
        if (this.served) {
          this.emit({
            t: `staged`,
            node: this.node,
            staged: items3.map(resolveDataOperationControlBid),
          });
        }
        emit7();
      }
    }
    wordsWaitOver(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (dataOperationControlVerdict2 === undefined) {
        this.wordsBehind.clear();
      } else {
        this.wordsBehind.delete(dataOperationControlVerdict2);
      }
      if (!(this.wordsBehind.size > 0)) {
        if (this.wordsBehindTimer !== null) {
          dataOperationControlVerdict.timers.clearTimeout(
            this.wordsBehindTimer,
          );
        }
        this.wordsBehindTimer = null;
        this.handOwedWords();
      }
    }
    inherit(
      life3?: Dynamic,
      options: Dynamic = 0,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead) return;
      let DataOperationControlState11Item =
        DataOperationControlState11[options] ?? 400;
      Promise.race([
        dataOperationControlVerdict.wal
          .load(this.node)
          .catch((..._extraArguments: unknown[]) => null),
        loadDataOperationControlVerdictHandler(
          options === 0
            ? DataOperationControlState11Item
            : resolveDataOperationControlRound2(
                DataOperationControlState11Item,
                dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              ),
        ).then((..._extraArguments: unknown[]) => null),
      ]).then(
        (result?: Dynamic, ..._extraArguments: unknown[]) => {
          if (enabled || this.dead) return;
          if (result === null)
            return options + 1 < DataOperationControlState11.length
              ? this.inherit(life3, options + 1)
              : (reportOperationEvent(`wal.heir_unread`, {
                  life: life3,
                  reads: options + 1,
                }),
                this.wordsWaitOver(life3));
          let uniqueItems7: Dynamic = new (Set as Dynamic)(
            [this.inflight, ...this.queue].map(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                item?.opId,
            ),
          );
          let filteredResult: Dynamic = result.filter(
            (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              isPlainRecord(result2) &&
              result2.life === life3 &&
              !uniqueItems7.has(result2.opId),
          );
          this.wordsBehind.delete(life3);
          if (this.wordsBehind.size === 0 && this.wordsBehindTimer !== null) {
            dataOperationControlVerdict.timers.clearTimeout(
              this.wordsBehindTimer,
            );
            this.wordsBehindTimer = null;
          }
          this.replay(
            filteredResult,
            new (Map as Dynamic)([[life3, true]]),
            true,
          );
        },
        (..._extraArguments: unknown[]): undefined => undefined,
      );
    }
    replay(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      let node: Dynamic = this.node;
      let matchesIncludes = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        try {
          return (
            dataOperationControlVerdict.wal
              .stagedLives?.(node)
              .includes(dataOperationControlVerdict3) === true
          );
        } catch {
          return false;
        }
      };
      {
        let items3: Dynamic = [
          ...dataOperationControlVerdict2.filter(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              !(
                isPlainRecord(dataOperationControlVerdict3) &&
                dataOperationControlVerdict3.held === true
              ),
          ),
          ...dataOperationControlVerdict2.filter(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              isPlainRecord(dataOperationControlVerdict3) &&
              dataOperationControlVerdict3.held === true,
          ),
        ];
        let count10: Dynamic = 0;
        for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic) {
          if (
            !isPlainRecord(loadDataOperationControlVerdictResult22) ||
            typeof loadDataOperationControlVerdictResult22.opId != `string` ||
            !Array.isArray(loadDataOperationControlVerdictResult22.ops)
          ) {
            if (
              isPlainRecord(loadDataOperationControlVerdictResult22) &&
              typeof loadDataOperationControlVerdictResult22.opId == `string`
            ) {
              dataOperationControlVerdict.wal
                .trim(node, loadDataOperationControlVerdictResult22.opId)
                .catch((..._extraArguments: unknown[]): undefined => undefined);
            }
            continue;
          }
          let optionEntry: Dynamic =
            typeof loadDataOperationControlVerdictResult22.life == `string` &&
            loadDataOperationControlVerdictResult22.life !== life2
              ? options.get(loadDataOperationControlVerdictResult22.life)
              : undefined;
          if (optionEntry === false) {
            reportOperationEvent(`wal.left_alone`, {
              opId: loadDataOperationControlVerdictResult22.opId,
              life: String(loadDataOperationControlVerdictResult22.life),
            });
            if (
              uniqueItems3.has(
                String(loadDataOperationControlVerdictResult22.life),
              )
            )
              continue;
            wait(String(loadDataOperationControlVerdictResult22.life));
            if (
              uniqueItems2.has(
                String(loadDataOperationControlVerdictResult22.life),
              ) &&
              dataOperationControlVerdict.swappedIn?.() === true &&
              matchesIncludes(
                String(loadDataOperationControlVerdictResult22.life),
              )
            ) {
              this.wordsBehind.add(
                String(loadDataOperationControlVerdictResult22.life),
              );
              this.wordsBehindTimer ??=
                dataOperationControlVerdict.timers.setTimeout(
                  (..._extraArguments: unknown[]): undefined => {
                    this.wordsBehindTimer = null;
                    if (!enabled && !this.dead) {
                      this.wordsWaitOver();
                    }
                  },
                  dataOperationControlValue50004,
                );
            }
            continue;
          }
          let dataOperationControlOps2: Dynamic =
            resolveDataOperationControlOps2(
              loadDataOperationControlVerdictResult22,
              true,
            );
          this.mendHeard(dataOperationControlOps2);
          if (dataOperationControlOps2.held) {
            delete dataOperationControlOps2.held;
            delete dataOperationControlOps2.sent;
            reportOperationEvent(`wal.held_replayed`, {
              opId: loadDataOperationControlVerdictResult22.opId,
              ops: loadDataOperationControlVerdictResult22.ops.length,
            });
          }
          if (optionEntry === true) {
            dataOperationControlOps2.lifeDead = true;
          }
          if (this.served) {
            dataOperationControlOps2.unseen = true;
            this.unseenOps.add(loadDataOperationControlVerdictResult22.opId);
          }
          this.queue.push(dataOperationControlOps2);
          this.noteSent(loadDataOperationControlVerdictResult22.opId);
          if (
            typeof loadDataOperationControlVerdictResult22.life == `string` &&
            loadDataOperationControlVerdictResult22.life !== life2
          ) {
            count10 += 1;
          }
        }
        if (count10 > 0) {
          claimed(`rows`, count10, context ? undefined : node);
        }
        if (
          !enabled21 &&
          loadDataOperationControlVerdictResult17 !== undefined
        ) {
          rekeyHolds2(loadDataOperationControlVerdictResult17);
        }
        if (!enabled21 && enabled23) {
          rekeyHolds5();
        }
        if (enabled21) {
          if (label4 !== undefined) {
            rekeyHolds3(label4);
          }
          rekeyHolds4();
          emit8();
        }
        emit7();
        this.pump();
      }
    }
    takeLeft(..._extraArguments: unknown[]) {
      try {
        this.strays = dataOperationControlVerdict.wal.strays?.(this.node) ?? 0;
      } catch {
        this.strays = 0;
      }
      if (
        this.leftRead ||
        (dataOperationControlVerdict.wal.ready !== undefined && !matchesReady)
      )
        return false;
      this.leftRead = true;
      try {
        this.leftWords =
          dataOperationControlVerdict.wal.stagedWords?.(this.node) ?? [];
      } catch {
        this.leftWords = [];
      }
      let filteredLeftWordsCount: Dynamic = this.leftWords.filter(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
          leftWord.tray === true,
      ).length;
      if (this.leftWords.length > filteredLeftWordsCount) {
        claimed(
          `words`,
          this.leftWords.length - filteredLeftWordsCount,
          this.node,
        );
      }
      if (filteredLeftWordsCount > 0) {
        claimed(`tray`, filteredLeftWordsCount, this.node);
      }
      return this.trayHolds();
    }
    pending(..._extraArguments: unknown[]): Dynamic {
      return this.queue.length + +!!this.inflight + this.provisional.size;
    }
    heldWords: Dynamic = 0;
    heldWordsTimer: Dynamic = null;
    out(..._extraArguments: unknown[]): Dynamic {
      return this.pending() + this.heldWords;
    }
    heldWordsOff(why?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (this.heldWords > 0) {
        reportOperationEvent(`held.off`, {
          why: why,
          held: this.heldWords,
        });
      }
      this.heldWords = 0;
      if (this.heldWordsTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.heldWordsTimer);
      }
      this.heldWordsTimer = null;
    }
    wordsHeld(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead) return;
      let held =
        Number.isFinite(dataOperationControlVerdict2) &&
        dataOperationControlVerdict2 > 0
          ? Math.floor(dataOperationControlVerdict2)
          : 0;
      let heldWords: Dynamic = this.heldWords;
      this.heldWords = held;
      if (this.heldWordsTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.heldWordsTimer);
      }
      this.heldWordsTimer = null;
      if (held > 0) {
        this.heldWordsTimer = dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.heldWordsTimer = null;
            if (!(enabled || this.dead || this.heldWords === 0)) {
              reportOperationEvent(`held.expired`, {
                held: this.heldWords,
                owed: this.owed,
                pending: this.pending(),
              });
              this.heldWords = 0;
              this.heldDrained();
            }
          },
          dataOperationControlValue30002,
        );
        if (heldWords === 0) {
          reportOperationEvent(`held.words`, {
            held: held,
            pending: this.pending(),
          });
        }
        return;
      }
      if (heldWords > 0) {
        this.heldDrained();
      }
    }
    heldDrained(..._extraArguments: unknown[]): undefined {
      reportOperationEvent(`held.cleared`, {
        owed: this.owed,
        pending: this.pending(),
      });
      if (this.pending() === 0) {
        this.pump();
      }
    }
    heldWordsRefresh(..._extraArguments: unknown[]): undefined {
      if (this.heldWords > 0) {
        this.wordsHeld(this.heldWords);
      }
    }
    emit(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (this.dead) return false;
      if (
        dataOperationControlVerdict2.t === `deny` &&
        this.shortGrace.size > 0
      ) {
        this.shortGrace.clear();
        queueMicrotask(emit7);
      }
      if (
        this.nodeGone &&
        dataOperationControlVerdict2.t === `state` &&
        dataOperationControlVerdict2.state !== `readonly`
      ) {
        let dataOperationControlVerdict3: Dynamic =
          dataOperationControlVerdict2;
        return typeof dataOperationControlVerdict3.words == `string` ||
          dataOperationControlVerdict3.pageBusy === true ||
          dataOperationControlVerdict3.unknown === true ||
          dataOperationControlVerdict3.storeShed === true ||
          dataOperationControlVerdict3.openBusy === true ||
          dataOperationControlVerdict3.openFailed === true ||
          dataOperationControlVerdict3.linkDown === true ||
          dataOperationControlVerdict3.retrying === true ||
          dataOperationControlVerdict3.landed === true
          ? false
          : this.emit({
              ...dataOperationControlVerdict2,
              state: `readonly`,
              nodeGone: true,
            });
      }
      if (
        this.nodeGone &&
        dataOperationControlVerdict2.t === `snapshot` &&
        dataOperationControlVerdict2.nodeGone !== true
      )
        return this.emit({
          ...dataOperationControlVerdict2,
          nodeGone: true,
        });
      let matchesT =
        dataOperationControlVerdict2.t === `state` &&
        !this.served &&
        (dataOperationControlVerdict2.halt === true ||
          dataOperationControlVerdict2.retrying === true ||
          dataOperationControlVerdict2.openFailed === true);
      if (dataOperationControlVerdict2.t === `state`) {
        let {
          staged: dataOperationControlVerdict3,
          ...dataOperationControlVerdict4
        }: Dynamic = dataOperationControlVerdict2;
        if (matchesT) {
          this.lastFace = dataOperationControlVerdict4;
        } else {
          if (this.served) {
            this.lastFace = null;
          }
        }
      }
      let record4: Dynamic =
        matchesT && this.leftWords.length > 0
          ? {
              ...dataOperationControlVerdict2,
              staged: this.leftWords.map(resolveDataOperationControlBid),
            }
          : dataOperationControlVerdict2;
      resolveObservabilityBootNode2(record4);
      let matchesDownsCount = this.downs.size > 0;
      for (let loadDataOperationControlVerdictResult22 of this.downs as Dynamic)
        try {
          loadDataOperationControlVerdictResult22(record4);
        } catch {
          matchesDownsCount = false;
        }
      if (
        record4.t === `snapshot` &&
        record4.more !== true &&
        record4.compare !== true &&
        this.remountOwed &&
        (this.mountReadonly || (this.servedSlow && this.unanswered()))
      ) {
        let staged: Dynamic = this.leftWords
          .filter(
            (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
              !leftWord.parked,
          )
          .map(resolveDataOperationControlBid);
        let state2 = state();
        let dataOperationControlVerdictHandler: Dynamic =
          kind !== null && !this.nodeGone && state2 !== `readonly`
            ? loadDataOperationControlVerdictHandler25(this.node)
            : {
                t: `state`,
                node: this.node,
                state: this.nodeGone ? `readonly` : state2,
              };
        if (staged.length > 0) {
          this.emit({
            ...dataOperationControlVerdictHandler,
            staged: staged,
          });
        }
      }
      return matchesDownsCount;
    }
    onDown(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      this.downs.add(dataOperationControlVerdict2);
      return (..._extraArguments: unknown[]): Dynamic =>
        this.downs.delete(dataOperationControlVerdict2);
    }
    mendHeard(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let updateDataOperationControlEditorSaid2: Dynamic =
        updateDataOperationControlEditorSaid(dataOperationControlVerdict2);
      if (updateDataOperationControlEditorSaid2.size !== 0) {
        this.rekeyWords(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            updateDataOperationControlEditorSaid2.get(
              dataOperationControlVerdict3,
            ) ?? dataOperationControlVerdict3,
        );
        this.rekeyHolds(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            updateDataOperationControlEditorSaid2.get(
              dataOperationControlVerdict3,
            ) ?? dataOperationControlVerdict3,
        );
      }
    }
    remounted(..._extraArguments: unknown[]): undefined {
      for (let ask of this.myWords.values() as Dynamic) {
        let leftWord: Dynamic = this.leftWords.find(
          (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
            ask2.tray !== true &&
            ask2.bid === ask.bid &&
            (ask2.afterId ?? null) === (ask.afterId ?? null),
        );
        if (leftWord) {
          leftWord.text = `${leftWord.text}${ask.text}`;
        } else {
          this.leftWords.push({
            ...ask,
            moved: true,
          });
        }
      }
      this.myWords.clear();
      this.servedSlow = false;
      let items3: Dynamic = [...this.holds.values()];
      for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic) {
        let dataOperationControlOps2: Dynamic = resolveDataOperationControlOps2(
          loadDataOperationControlVerdictResult22,
          false,
        );
        this.mendHeard(dataOperationControlOps2);
        delete dataOperationControlOps2.held;
        dataOperationControlOps2.seq = ++index;
        this.queue.push(dataOperationControlOps2);
        this.noteSent(loadDataOperationControlVerdictResult22.opId);
        reportOperationEvent(`mount.held_queued`, {
          opId: loadDataOperationControlVerdictResult22.opId,
          ops: loadDataOperationControlVerdictResult22.ops.length,
        });
      }
      this.holds.clear();
      if (items3.length > 0) {
        queueMicrotask(
          (..._extraArguments: unknown[]): undefined =>
            void (!enabled && !this.dead && (emit7(), this.pump())),
        );
      }
      for (let loadDataOperationControlVerdictResult22 of this
        .ackedRecent as Dynamic)
        if (
          this.leftWords.some(
            (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
              leftWord.moved === true,
          )
        ) {
          this.dedupeWords(
            loadDataOperationControlVerdictResult22.ops,
            loadDataOperationControlVerdictResult22.results,
            loadDataOperationControlVerdictResult22.predicted,
            loadDataOperationControlVerdictResult22.learned,
            loadDataOperationControlVerdictResult22.homes,
            (
              dataOperationControlVerdict2?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              dataOperationControlVerdict2.moved === true &&
              (dataOperationControlVerdict2.since ?? 0) <
                loadDataOperationControlVerdictResult22.seq,
          );
        }
      this.remountOut = new (Set as Dynamic)(
        [
          ...this.handed,
          ...(this.inflight ? [this.inflight] : []),
          ...this.queue,
          ...this.provisional.values(),
        ].map(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.opId,
        ),
      );
      for (let loadDataOperationControlVerdictResult22 of this
        .leftWords as Dynamic)
        if (loadDataOperationControlVerdictResult22.withEditor === true) {
          [
            loadDataOperationControlVerdictResult22.parked,
            loadDataOperationControlVerdictResult22.withEditor,
          ] = [false, false];
          delete loadDataOperationControlVerdictResult22.quiet;
        }
      let runs: Dynamic = this.leftWords.filter(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]) => !leftWord.parked,
      ).length;
      if (runs > 0) {
        this.remountOwed = true;
        reportOperationEvent(`mount.owed`, {
          runs: runs,
          pending: this.pending(),
        });
        emit7();
      }
    }
    orphanedRescue(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let provisionalEntry: Dynamic = this.provisional.get(
        dataOperationControlVerdict2,
      );
      if (
        provisionalEntry === undefined ||
        provisionalEntry.replayed ||
        !this.remountOut.has(dataOperationControlVerdict2)
      )
        return [];
      let keepRescued: Dynamic = this.keepRescued(
        updateDataOperationControlBid(
          provisionalEntry.ops,
          provisionalEntry.homes,
        ),
        provisionalEntry,
      );
      this.trayMovedBehind(provisionalEntry);
      return keepRescued;
    }
    trayMovedBehind(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        dataOperationControlVerdict2.replayed ||
        !this.remountOut.has(dataOperationControlVerdict2.opId)
      )
        return;
      let uniqueItems7: Dynamic = new (Set as Dynamic)(
        resolveDataOperationControlBatchesDone(
          dataOperationControlVerdict2,
        ).flat(),
      );
      for (let loadDataOperationControlVerdictResult22 of this
        .leftWords as Dynamic)
        if (
          loadDataOperationControlVerdictResult22.moved === true &&
          loadDataOperationControlVerdictResult22.tray !== true &&
          typeof loadDataOperationControlVerdictResult22.afterId == `string` &&
          uniqueItems7.has(loadDataOperationControlVerdictResult22.afterId)
        ) {
          loadDataOperationControlVerdictResult22.tray = true;
          try {
            this.stagePut(loadDataOperationControlVerdictResult22);
          } catch {}
        }
    }
    deferMount(hint?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (this.mountWait !== null) return void (this.mountWait.hint = hint);
      reportOperationEvent(`mount.wait`, {
        pending: this.pending(),
      });
      this.mountWait = {
        hint: hint,
        timer: dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]) => this.serveMount(`slow`),
          dataOperationControlValue20005,
        ),
      };
    }
    serveMount(why?: Dynamic, ..._extraArguments: unknown[]): undefined {
      let mountWait: Dynamic = this.mountWait;
      if (!(mountWait === null || (why === `drained` && this.unanswered()))) {
        this.mountWait = null;
        dataOperationControlVerdict.timers.clearTimeout(mountWait.timer);
        if (!(enabled || this.dead)) {
          reportOperationEvent(`mount.serve`, {
            why: why,
            pending: this.pending(),
          });
          this.servedSlow = why === `slow`;
          this.need({
            ...mountWait.hint,
            inst: this.mountInst ?? mountWait.hint.inst,
            readonly: this.mountReadonly,
          });
        }
      }
    }
    need(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (!(enabled || this.dead)) {
        if (
          dataOperationControlVerdict2 === undefined &&
          this.mountWait !== null
        ) {
          if (honourOpsOnFeed()) {
            this.ringDue = false;
          } else {
            this.wantRev = Math.max(this.wantRev, this.lastRev + 1);
          }
          reportOperationEvent(`mount.wait.ring`);
          return;
        }
        if (dataOperationControlVerdict2?.why === `mount`) {
          this.toldHwm = null;
          if (enabled21) {
            emit8();
          }
          this.orphanStageSaid = null;
          this.orphanLatched = false;
          this.heldWordsOff(`mount`);
          let filteredLeftWords: Dynamic = this.leftWords.filter(
            (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
              leftWord.tray === true &&
              leftWord.parked === true &&
              leftWord.quiet !== true &&
              leftWord.text !== `` &&
              (leftWord.cut === undefined ||
                (leftWord.cut !== null &&
                  typeof leftWord.cut == `object` &&
                  Number.isInteger(leftWord.cut.whole) &&
                  leftWord.cut.whole > 0 &&
                  leftWord.text.length === leftWord.cut.whole)),
          );
          if (filteredLeftWords.length > 0) {
            this.emit({
              t: `staged`,
              node: this.node,
              staged: filteredLeftWords.map(
                (
                  filteredLeftWord?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  Object.assign(
                    resolveDataOperationControlBid(filteredLeftWord),
                    {
                      live: true,
                    },
                  ),
              ),
            });
          }
          this.mountReadonly = dataOperationControlVerdict2.readonly === true;
          let served: Dynamic =
            this.served &&
            typeof dataOperationControlVerdict2.inst == `string` &&
            this.mountInst !== null &&
            dataOperationControlVerdict2.inst !== this.mountInst;
          if (typeof dataOperationControlVerdict2.inst == `string`) {
            this.mountInst = dataOperationControlVerdict2.inst;
          }
          if (served) {
            this.remounted();
            if (this.unanswered() && !enabled16)
              return this.deferMount(dataOperationControlVerdict2);
            this.handOwedWords();
          } else if (this.mountWait !== null)
            return this.deferMount(dataOperationControlVerdict2);
        }
        if (enabled16) {
          if (!this.served) {
            this.read(undefined, dataOperationControlVerdict2?.why);
          }
          return;
        }
        if (dataOperationControlVerdict2?.why === `comments`)
          return this.freshen();
        if (
          dataOperationControlVerdict2?.why ===
          `ops on the feed: a peer's row this page could not place by id`
        ) {
          if (honourOpsOnFeed()) {
            let seq: Dynamic = this.heardSeq >= 0 ? this.heardSeq : undefined;
            return seq !== undefined && seq <= this.pictureSeq
              ? void reportOperationEvent(`told.inPicture`, {
                  why: dataOperationControlVerdict2.why,
                  seq: seq,
                  pictureSeq: this.pictureSeq,
                })
              : this.wholeRead(
                  dataOperationControlVerdict2.block
                    ? `${dataOperationControlVerdict2.why} [${dataOperationControlVerdict2.block}]`
                    : dataOperationControlVerdict2.why,
                  this.lastRev > 0 ? this.lastRev : undefined,
                  DataOperationControlStyles4,
                  seq,
                );
          }
          if (!dataOperationControlVerdict2.block) return;
        }
        if (
          typeof dataOperationControlVerdict2?.block == `string` &&
          dataOperationControlVerdict2.block &&
          this.served
        )
          return this.readBlock(
            dataOperationControlVerdict2.block,
            false,
            true,
            false,
            dataOperationControlVerdict2.pen === true,
          );
        if (honourOpsOnFeed()) {
          if (dataOperationControlVerdict2 === undefined) {
            this.ringDue = false;
          }
          if (
            dataOperationControlVerdict2?.why === `mount` &&
            !this.served &&
            this.readingWhole
          ) {
            reportOperationEvent(`told.mountUnderRead`, {
              pending: this.pending(),
            });
          } else {
            this.wholeRead(
              dataOperationControlVerdict2?.why ??
                (dataOperationControlVerdict2 === undefined
                  ? `the feed (re)attached or rang with no row`
                  : `the editor asked`),
              dataOperationControlVerdict2?.rev,
              dataOperationControlVerdict2?.why ===
                `re-read what the room made of a paste` ||
                dataOperationControlVerdict2?.why ===
                  `recovering after a contained editor error; re-reading`
                ? dataOperationControlVerdict2.why
                : undefined,
            );
          }
          if (this.pollTimer === null) {
            this.armPoll();
          }
          return;
        }
        if (dataOperationControlVerdict2 === undefined) {
          this.wantRev = Math.max(this.wantRev, this.lastRev + 1);
        } else {
          if (dataOperationControlVerdict2.rev !== undefined) {
            this.wantRev = Math.max(
              this.wantRev,
              dataOperationControlVerdict2.rev,
            );
          }
        }
        if (dataOperationControlVerdict2?.rev !== undefined) {
          this.roomSeen(dataOperationControlVerdict2.rev);
        }
        if (
          dataOperationControlVerdict2?.whole ||
          (dataOperationControlVerdict2 !== undefined &&
            dataOperationControlVerdict2.rev === undefined)
        ) {
          if (
            dataOperationControlVerdict2?.why !==
              `re-read what the room made of a paste` &&
            dataOperationControlVerdict2?.why !== `mount` &&
            dataOperationControlVerdict2?.why !==
              `recovering after a contained editor error; re-reading` &&
            dataOperationControlVerdict2?.why !==
              `a block read by id holds fewer named blocks than this page draws inside it` &&
            this.noWhole(dataOperationControlVerdict2?.why ?? `asked`)
          ) {
            this.read(this.since());
          } else {
            this.read(undefined, dataOperationControlVerdict2?.why);
          }
        } else {
          if (
            dataOperationControlVerdict2?.rev === undefined ||
            dataOperationControlVerdict2.rev > this.lastRev
          ) {
            this.read(this.since());
          }
        }
        if (this.pollTimer === null) {
          this.armPoll();
        }
      }
    }
    behindPlace: Dynamic = new (Map as Dynamic)();
    blockQueue: Dynamic = new (Map as Dynamic)();
    blockWaitMs: Dynamic = 0;
    blockTimer: Dynamic = null;
    blockCool: Dynamic = new (Map as Dynamic)();
    readBlock(
      block?: Dynamic,
      behind: Dynamic = false,
      first: Dynamic = false,
      dependencies: Dynamic = false,
      pen: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead || !block) return;
      let blockCoolEntry: Dynamic = this.blockCool.get(block);
      if (blockCoolEntry?.stuck && !first && !dependencies)
        return void reportOperationEvent(`block.read.stuck`, {
          block: block,
        });
      if (
        this.blockReads.has(block) ||
        (blockCoolEntry && blockCoolEntry.timer !== null && !first)
      ) {
        let fresh: Dynamic = dependencies || first;
        if (pen) {
          this.penBlocks.add(block);
        }
        if (blockCoolEntry) {
          blockCoolEntry.again = true;
          blockCoolEntry.behind ||= behind;
          blockCoolEntry.fresh ||= fresh;
          blockCoolEntry.pen ||= pen;
        } else {
          this.blockCool.set(block, {
            timer: null,
            ms: 250,
            again: true,
            behind: behind,
            fresh: fresh,
            pen: pen,
          });
        }
        reportOperationEvent(`block.read.coalesced`, {
          block: block,
          out: this.blockReads.has(block),
          first: first,
          fresh: fresh,
        });
        return;
      }
      let blockQueueEntry: Dynamic =
        (this.blockQueue.get(block) ?? false) || behind;
      if (pen) {
        this.penBlocks.add(block);
      }
      if (pen || (first && !this.blockQueue.has(block))) {
        this.queueAhead(block, blockQueueEntry);
      } else {
        this.blockQueue.set(block, blockQueueEntry);
      }
      this.drainBlockReads();
    }
    penBlocks: Dynamic = new (Set as Dynamic)();
    penUnmark(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !this.blockQueue.has(dataOperationControlVerdict2) &&
        !this.blockReads.has(dataOperationControlVerdict2)
      ) {
        this.penBlocks.delete(dataOperationControlVerdict2);
      }
    }
    queueAhead(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let filteredItems: Dynamic = [...this.blockQueue].filter(
        ([item]: Dynamic, ..._extraArguments: unknown[]) =>
          item !== dataOperationControlVerdict2,
      );
      let count10: Dynamic = this.penBlocks.has(dataOperationControlVerdict2)
        ? 0
        : filteredItems.findIndex(
            ([filteredItem]: Dynamic, ..._extraArguments: unknown[]) =>
              !this.penBlocks.has(filteredItem),
          );
      filteredItems.splice(count10 < 0 ? filteredItems.length : count10, 0, [
        dataOperationControlVerdict2,
        options,
      ]);
      this.blockQueue = new (Map as Dynamic)(filteredItems);
    }
    drainBlockReads(
      dataOperationControlVerdict2: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(enabled || this.dead || this.blockTimer !== null) &&
        !this.shedStands()
      )
        for (let [
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        ] of this.blockQueue as Dynamic) {
          if (
            (dataOperationControlVerdict2 &&
              !this.penBlocks.has(loadDataOperationControlVerdictResult22)) ||
            this.blockReads.size >= 4 ||
            (this.paceLeft !== null && this.paceLeft <= 0)
          )
            break;
          this.blockQueue.delete(loadDataOperationControlVerdictResult22);
          this.readBlockNow(
            loadDataOperationControlVerdictResult22,
            loadDataOperationControlVerdictResult23,
          );
        }
    }
    paceLeft: Dynamic = null;
    paceTimer: Dynamic = null;
    paceSpent: Dynamic = false;
    stood(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let count10: Dynamic =
        options === undefined || dataOperationControlVerdict.now === undefined
          ? 0
          : dataOperationControlVerdict.now() - options;
      return count10 > dataOperationControlVerdict2
        ? count10
        : dataOperationControlVerdict2;
    }
    paceRefillMs: Dynamic = 500;
    paceCalmMs: Dynamic = dataOperationControlValue100004;
    paceUpTimer: Dynamic = null;
    paceSlower(..._extraArguments: unknown[]): undefined {
      this.paceRefillMs = Math.min(
        dataOperationControlValue40002,
        this.paceRefillMs * 2,
      );
      this.paceCalmMs = Math.min(
        dataOperationControlValue80000,
        this.paceCalmMs * 2,
      );
      reportOperationEvent(`read.pace.slower`, {
        refill: this.paceRefillMs,
        calm: this.paceCalmMs,
      });
      this.paceUpArm();
    }
    paceUpArm(..._extraArguments: unknown[]): undefined {
      if (this.paceUpTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.paceUpTimer);
      }
      this.paceUpTimer = null;
      if (!(this.paceRefillMs <= 500 && this.paceCalmMs <= 1e4)) {
        this.paceUpTimer = dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.paceUpTimer = null;
            if (!(enabled || this.dead || this.paceLeft === null)) {
              if (this.paceRefillMs > 500) {
                this.paceRefillMs = Math.max(500, this.paceRefillMs / 2);
              } else {
                this.paceCalmMs = Math.max(
                  dataOperationControlValue100004,
                  this.paceCalmMs / 2,
                );
              }
              reportOperationEvent(`read.pace.up`, {
                refill: this.paceRefillMs,
                calm: this.paceCalmMs,
              });
              this.paceUpArm();
            }
          },
          this.paceCalmMs,
        );
      }
    }
    paceGrant(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let grant = Math.floor(dataOperationControlVerdict2 / this.paceRefillMs);
      let value: Dynamic = this.blockQueue.keys().next().value;
      this.paceLeft = Math.min(grant, (this.paceLeft ?? 0) + grant);
      if (
        this.paceLeft < 1 &&
        value !== undefined &&
        this.penBlocks.has(value)
      ) {
        this.paceLeft = 1;
      }
      this.paceSpent = false;
      reportOperationEvent(`read.pace`, {
        ms: dataOperationControlVerdict2,
        refill: this.paceRefillMs,
        grant: grant,
        left: this.paceLeft,
        queued: this.blockQueue.size,
      });
      this.paceTick();
    }
    paceTick(..._extraArguments: unknown[]): undefined {
      if (this.paceTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.paceTimer);
      }
      let now2: Dynamic = dataOperationControlVerdict.now?.();
      let max = Math.max(dataOperationControlValue10004, this.paceRefillMs);
      this.paceTimer = dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.paceTimer = null;
          if (!(enabled || this.dead)) {
            if (this.shedStands()) return void this.paceTick();
            if (!this.paceSpent && this.blockQueue.size === 0)
              return void this.paceOff();
            this.paceGrant(this.stood(max, now2));
            this.drainBlockReads();
          }
        },
        max,
      );
    }
    paceOff(..._extraArguments: unknown[]): undefined {
      for (let loadDataOperationControlVerdictResult22 of [
        this.paceTimer,
        this.paceUpTimer,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      this.paceTimer = this.paceUpTimer = null;
      if (this.paceLeft !== null) {
        reportOperationEvent(`read.pace.over`, {});
      }
      this.paceLeft = null;
      this.paceSpent = false;
      this.paceRefillMs = 500;
      this.paceCalmMs = dataOperationControlValue100004;
    }
    throttledMs(response?: Dynamic, ..._extraArguments: unknown[]) {
      if (response.verdict === `allow`) return null;
      let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
      let number2 = Number(data.retryAfterMs ?? response.retryAfterMs);
      let number3 = Number.isFinite(number2) && number2 > 0 ? number2 : 0;
      let label5 = `${String(response.reason)} ${String(data.code)} ${String(data.why)}`;
      return /rate[-_ ]?limit|too[-_ ]?many[-_ ]?requests|throttl/i.test(
        label5,
      ) ||
        (number3 > 0 && /unavailable|busy/i.test(label5))
        ? number3
        : null;
    }
    async readBlockNow(
      parentId?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      this.blockReads.add(parentId);
      let door: Dynamic = await this.door({
        verb: `read`,
        payload: {
          kind: `view`,
          parentId: parentId,
        },
      });
      this.blockReads.delete(parentId);
      if (!door) return;
      let throttledMs = this.throttledMs(door);
      if (throttledMs !== null) {
        this.queueAhead(
          parentId,
          (this.blockQueue.get(parentId) ?? false) || options,
        );
        if (resolveDataOperationControlUnavailable(door) !== null)
          return void (this.shedStands() || this.drainBlockReads());
        if (this.blockTimer === null) {
          this.blockWaitMs =
            throttledMs > 0
              ? throttledMs
              : this.blockWaitMs > 0
                ? Math.min(dataOperationControlValue20003, this.blockWaitMs * 2)
                : 250;
          this.blockTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.blockTimer = null;
              this.drainBlockReads();
            },
            this.blockWaitMs,
          );
        }
        return;
      }
      this.blockWaitMs = 0;
      if (this.blockCool.get(parentId)?.pen !== true) {
        this.penBlocks.delete(parentId);
      }
      try {
        this.landBlock(parentId, options, door);
      } finally {
        this.coolBlock(parentId, options);
        this.drainBlockReads();
      }
    }
    coolBlock(
      block?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead) return;
      let blockCoolEntry: Dynamic = this.blockCool.get(block) ?? {
        timer: null,
        ms: 250,
        again: false,
        behind: false,
        fresh: false,
      };
      if (blockCoolEntry.timer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(blockCoolEntry.timer);
      }
      blockCoolEntry.behind ||= options;
      blockCoolEntry.fresh &&= blockCoolEntry.again;
      let wait2: Dynamic = blockCoolEntry.ms;
      blockCoolEntry.ms = Math.min(
        dataOperationControlValue20002,
        blockCoolEntry.ms * 2,
      );
      this.blockCool.set(block, blockCoolEntry);
      if (this.blockCool.size > 512) {
        (this.dropCool as Dynamic)(...this.blockCool.entries().next().value);
      }
      blockCoolEntry.timer = dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]) => {
          blockCoolEntry.timer = null;
          if (
            enabled ||
            this.dead ||
            this.blockCool.get(block) !== blockCoolEntry
          )
            return;
          let wanted: Dynamic =
            blockCoolEntry.again &&
            (blockCoolEntry.fresh ||
              (!blockCoolEntry.stuck &&
                (this.holed.has(block) || blockCoolEntry.behind)));
          reportOperationEvent(`block.read.cooled`, {
            block: block,
            wait: wait2,
            again: blockCoolEntry.again,
            wanted: wanted,
            stuck: blockCoolEntry.stuck === true,
          });
          let matchesPen = blockCoolEntry.pen === true;
          blockCoolEntry.pen = false;
          if (!wanted) {
            if (matchesPen) {
              this.penUnmark(block);
            }
            blockCoolEntry.again = blockCoolEntry.fresh = false;
            if (!this.holed.has(block)) {
              this.blockCool.delete(block);
            }
            return this.groundBehind();
          }
          blockCoolEntry.again = blockCoolEntry.stuck = false;
          this.readBlock(
            block,
            blockCoolEntry.behind,
            false,
            false,
            matchesPen,
          );
        },
        wait2,
      );
    }
    dropCool(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (options.timer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(options.timer);
      }
      this.blockCool.delete(dataOperationControlVerdict2);
      if (options.again && options.fresh && !enabled && !this.dead) {
        if (options.pen) {
          this.queueAhead(
            dataOperationControlVerdict2,
            (this.blockQueue.get(dataOperationControlVerdict2) ?? false) ||
              options.behind,
          );
        } else {
          this.blockQueue.set(
            dataOperationControlVerdict2,
            (this.blockQueue.get(dataOperationControlVerdict2) ?? false) ||
              options.behind,
          );
        }
        this.drainBlockReads();
      } else {
        if (options.pen) {
          this.penUnmark(dataOperationControlVerdict2);
        }
      }
    }
    coolOwed(..._extraArguments: unknown[]) {
      for (let loadDataOperationControlVerdictResult22 of this.blockCool.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.again) return true;
      return false;
    }
    groundBehind(..._extraArguments: unknown[]): undefined {
      if (
        !(
          this.behindGround === null ||
          enabled ||
          this.dead ||
          this.blockReads.size > 0 ||
          this.blockQueue.size > 0 ||
          this.coolOwed() ||
          this.pending() > 0
        )
      ) {
        this.groundTo(this.behindGround.rev);
        this.behindGround = null;
      }
    }
    uncoolBlock(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!this.declinedHoles.has(dataOperationControlVerdict2)) {
        this.behindPlace.delete(dataOperationControlVerdict2);
      }
      this.redelivered.delete(dataOperationControlVerdict2);
      let blockCoolEntry: Dynamic = this.blockCool.get(
        dataOperationControlVerdict2,
      );
      if (blockCoolEntry) {
        this.dropCool(dataOperationControlVerdict2, blockCoolEntry);
      }
    }
    unholeAll(..._extraArguments: unknown[]): undefined {
      this.holed.clear();
      this.declinedHoles.clear();
      this.behindPlace.clear();
      this.redelivered.clear();
      for (let [
        loadDataOperationControlVerdictResult22,
        loadDataOperationControlVerdictResult23,
      ] of this.blockCool as Dynamic)
        this.dropCool(
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        );
    }
    landBlock(
      block?: Dynamic,
      options?: Dynamic,
      response?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let behindPlaceEntry: Dynamic = options
        ? this.behindPlace.get(block)
        : undefined;
      if (!this.declinedHoles.has(block)) {
        this.behindPlace.delete(block);
      }
      if (this.behindPlace.size > 256) {
        for (let loadDataOperationControlVerdictResult22 of this.behindPlace.keys() as Dynamic)
          if (
            !this.declinedHoles.has(loadDataOperationControlVerdictResult22)
          ) {
            this.behindPlace.delete(loadDataOperationControlVerdictResult22);
          }
        if (this.behindPlace.size > 256) {
          this.behindPlace.clear();
        }
      }
      let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
      let onFaces2: Dynamic =
        response.verdict === `allow` && typeof data.doc == `string`
          ? onFaces(data.doc)
          : null;
      let docJson: Dynamic = onFaces2
        ? filterDataOperationControlContent(onFaces2.docJson, block)
        : null;
      let rev =
        [response.rev, data.rev, onFaces2?.rev].find(
          (item?: unknown, ..._extraArguments: unknown[]) =>
            typeof item == `number`,
        ) ?? -1;
      if (!onFaces2 || !docJson || rev < 0)
        return void (
          this.noWhole(`block ${block} unreadable`) || this.read(undefined)
        );
      if ((onFaces2.capped?.length ?? 0) > 0) {
        this.holed.delete(block);
        this.declinedHoles.delete(block);
        this.behindPlace.delete(block);
        if (!this.noWhole(`block ${block} capped`)) {
          this.read(undefined);
        }
        return;
      }
      let helloBImport2: Dynamic = (
        node?: Dynamic,
        options2?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let id: Dynamic =
          typeof node.attrs.id == `string` &&
          ![`gap`, `gone`, `hit`, `hits`].includes(node.name)
            ? node.attrs.id
            : null;
        if (id === options2) return context;
        for (let loadDataOperationControlVerdictResult22 of node.children as Dynamic) {
          if (typeof loadDataOperationControlVerdictResult22 == `string`)
            continue;
          let helloBImport3: Dynamic = helloBImport2(
            loadDataOperationControlVerdictResult22,
            options2,
            id ?? context,
          );
          if (helloBImport3 !== undefined) return helloBImport3;
        }
      };
      let parent: Dynamic;
      try {
        parent = helloBImport2(
          filterEditorExtensionsFilter(data.doc),
          block,
          null,
        );
      } catch {
        parent = undefined;
      }
      let record4: Dynamic = behindPlaceEntry
        ? {
            ...behindPlaceEntry,
            ...(parent === undefined
              ? {}
              : {
                  parent: parent,
                }),
          }
        : null;
      let under: Dynamic = this.out();
      this.emit({
        t: `snapshot`,
        node: this.node,
        rev: rev,
        partial: true,
        block: block,
        docJson: docJson,
        blocks: onFaces2.blocks,
        docXml: data.doc,
        ...(record4
          ? {
              delta: true,
              whole: false,
              blockRev: rev,
              ...record4,
            }
          : {}),
        ...(under > 0
          ? {
              under: under,
            }
          : {}),
      });
      if (record4 && under === 0 && this.declinedHoles.has(block)) {
        this.redelivered.set(block, rev);
      } else {
        this.redelivered.delete(block);
      }
      if (this.redelivered.size > 256) {
        this.redelivered.clear();
      }
      if (under === 0) {
        this.groundBehind();
      }
    }
    freshen(..._extraArguments: unknown[]): undefined {
      if (!(this.freshTimer !== null || enabled || this.dead)) {
        if (this.served && visibility.state() !== `visible`)
          return void (this.freshOwed = true);
        this.freshTimer = dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.freshTimer = null;
            this.wantComments = !this.commentsBarred;
            this.commentsAsk += 1;
            if (!(enabled || this.dead)) {
              if (honourOpsOnFeed() && this.served)
                return void this.readComments();
              if (!reconcile && this.served) {
                let since: Dynamic = this.since();
                if (since !== undefined) {
                  this.read(since);
                }
                return;
              }
              this.read(undefined);
            }
          },
          150,
        );
      }
    }
    freshOwed: Dynamic = false;
    ownFrame(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (options) return this.mine(options);
      if (
        Array.isArray(dataOperationControlVerdict2.opIds) &&
        dataOperationControlVerdict2.opIds.some(
          (opId2?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof opId2 == `string` &&
            (this.provisional.has(opId2) || this.sentOp(opId2)),
        )
      )
        return true;
      let edit: Dynamic = isPlainRecord(dataOperationControlVerdict2.edit)
        ? dataOperationControlVerdict2.edit
        : dataOperationControlVerdict2;
      let opId: Dynamic = typeof edit.opId == `string` ? edit.opId : ``;
      let item =
        [edit.by, edit.sess].find(
          (item2?: unknown, ..._extraArguments: unknown[]) =>
            typeof item2 == `string`,
        ) ?? ``;
      return opId
        ? this.mine({
            opId: opId,
            by: item,
          }) ||
            (!item && this.sentOp(opId))
        : item !== `` &&
            item === dataOperationControlVerdict.session.get()?.label;
    }
    row(dataOperationControlVerdict2?: Dynamic, ..._extraArguments: unknown[]) {
      this.heard();
      if (honourOpsOnFeed()) return this.told(dataOperationControlVerdict2);
      let dataOperationControlMinted4: Dynamic =
        resolveDataOperationControlMinted4(dataOperationControlVerdict2);
      let rev: Dynamic = resolveDataOperationControlEdit(
        dataOperationControlVerdict2,
      );
      let ownFrame: Dynamic = this.ownFrame(
        dataOperationControlVerdict2,
        dataOperationControlMinted4,
      );
      this.roomSeen(
        dataOperationControlMinted4 ? dataOperationControlMinted4.rev : rev,
        ownFrame,
      );
      if (!ownFrame) {
        this.orderActivity();
      }
      this.holedRead.clear();
      if (
        rev !== undefined &&
        Array.isArray(dataOperationControlVerdict2.opIds)
      ) {
        let filteredOpIds: Dynamic = dataOperationControlVerdict2.opIds.filter(
          (opId?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof opId == `string` && this.provisional.has(opId),
        );
        if (filteredOpIds.length > 0) return this.durable(filteredOpIds, rev);
      }
      if (
        !dataOperationControlMinted4 &&
        rev !== undefined &&
        rev > this.lastRev &&
        this.served
      ) {
        let edit: Dynamic = isPlainRecord(dataOperationControlVerdict2.edit)
          ? dataOperationControlVerdict2.edit
          : dataOperationControlVerdict2;
        let opId: Dynamic = typeof edit.opId == `string` ? edit.opId : ``;
        let item =
          [edit.by, edit.sess].find(
            (item2?: unknown, ..._extraArguments: unknown[]) =>
              typeof item2 == `string`,
          ) ?? ``;
        let mine: Dynamic = opId
          ? this.mine({
              opId: opId,
              by: item,
            }) ||
            (!item && this.sentOp(opId))
          : !item ||
            this.mine({
              opId: opId,
              by: item,
            });
        if (!mine) {
          this.wantForeign = Math.max(this.wantForeign, rev);
        }
        if (mine && this.pending() > 0) {
          this.wantRev = Math.max(this.wantRev, rev);
          if (this.pollTimer === null) {
            this.armPoll();
          }
          return this.awaitEcho();
        }
      }
      if (
        !dataOperationControlMinted4 &&
        rev !== undefined &&
        typeof dataOperationControlVerdict2.print == `string` &&
        this.landPrint(dataOperationControlVerdict2.print, rev)
      )
        return;
      if (!dataOperationControlMinted4)
        return this.need(
          rev === undefined
            ? undefined
            : {
                rev: rev,
              },
        );
      let max = Math.max(this.lastRev, this.shownRev);
      if (!(this.dead || dataOperationControlMinted4.rev <= max)) {
        if (!this.served || dataOperationControlMinted4.revFirst !== max + 1) {
          if (dataOperationControlMinted4.revFirst > max + 1) {
            this.park(dataOperationControlMinted4);
          }
          if (!this.mine(dataOperationControlMinted4)) {
            this.wantForeign = Math.max(
              this.wantForeign,
              dataOperationControlMinted4.rev,
            );
          }
          return dataOperationControlMinted4.rev <= this.ackedRev
            ? undefined
            : this.need({
                rev: dataOperationControlMinted4.rev,
              });
        }
        this.applyRow(dataOperationControlMinted4);
        this.drainParked();
      }
    }
    durable(
      dataOperationControlVerdict2?: Dynamic,
      rev?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      index3 = 0;
      index4 = 0;
      if (kind === null) {
        emit6();
      } else {
        rearmGap(`a write landed (the stream burst's row)`);
      }
      let enabled26 = false;
      for (let opId of dataOperationControlVerdict2 as Dynamic) {
        let provisionalEntry: Dynamic = this.provisional.get(opId);
        if (provisionalEntry) {
          if (provisionalEntry.unseen) {
            enabled26 = true;
          }
          this.provisional.delete(opId);
          dataOperationControlVerdict.wal
            .trim(this.node, opId)
            .catch((..._extraArguments: unknown[]): undefined => undefined);
          this.emit({
            t: `ack`,
            node: this.node,
            opId: opId,
            results: provisionalEntry.results,
            rev: rev,
            ...(provisionalEntry.padded?.length
              ? {
                  padded: provisionalEntry.padded,
                }
              : {}),
            ...(provisionalEntry.flown?.length
              ? {
                  flown: provisionalEntry.flown,
                }
              : {}),
          });
          reportOperationEvent(`ack.allow`, {
            rev: rev,
          });
          if (
            isDataOperationControlRevive(
              provisionalEntry.ops,
              provisionalEntry.results,
            )
          ) {
            this.freshen();
          }
        }
      }
      this.ackedRev = Math.max(this.ackedRev, rev);
      this.heardRev = Math.max(this.heardRev, rev);
      if (honourOpsOnFeed()) {
        let serialHole = context
          ? this.serialHole(context)
          : (this.heardMine(rev), false);
        this.bookRev(
          rev,
          !serialHole && !this.gapOwed && rev <= this.frontier(),
        );
      } else if (this.served && !enabled26 && rev === this.lastRev + 1) {
        if (this.groundRev >= this.lastRev) {
          this.groundTo(rev);
        }
        this.lastRev = rev;
        this.drainParked();
      } else {
        if (this.served && rev > this.lastRev) {
          this.wantRev = Math.max(this.wantRev, rev);
          if (this.pollTimer === null) {
            this.armPoll();
          }
          this.awaitEcho();
        }
      }
      this.met();
      emit7();
      if (this.slow && this.pending() === 0) {
        this.emit(
          kind === null
            ? {
                t: `state`,
                node: this.node,
                state: state(),
              }
            : loadDataOperationControlVerdictHandler25(this.node),
        );
      }
      if (this.provisional.size === 0)
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
    }
    stream(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead || !this.served) return;
      let actor: Dynamic = isPlainRecord(dataOperationControlVerdict2.actor)
        ? dataOperationControlVerdict2.actor
        : {};
      let sess: Dynamic = typeof actor.sess == `string` ? actor.sess : ``;
      let opId: Dynamic =
        typeof dataOperationControlVerdict2.opId == `string`
          ? dataOperationControlVerdict2.opId
          : ``;
      let label5: Dynamic = dataOperationControlVerdict.session.get()?.label;
      if (
        (!(opId !== `` && this.unseenOp(opId)) &&
          ((label5 !== undefined && sess === label5) ||
            (opId !== `` && this.sentOp(opId)))) ||
        !Array.isArray(dataOperationControlVerdict2.ops) ||
        !Array.isArray(dataOperationControlVerdict2.results) ||
        dataOperationControlVerdict2.ops.length === 0
      )
        return;
      let row: Dynamic = {
        rev: 0,
        revFirst: 0,
        by: sess,
        ops: dataOperationControlVerdict2.ops,
        results: dataOperationControlVerdict2.results,
        opId: opId,
      };
      let under: Dynamic = this.out();
      this.emit({
        t: `row`,
        node: this.node,
        row: row,
        ...(under > 0
          ? {
              under: under,
            }
          : {}),
      });
    }
    feedUp: Dynamic = null;
    quietTimer: Dynamic = null;
    heard(..._extraArguments: unknown[]): undefined {
      if (this.quietTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.quietTimer);
      }
      this.quietTimer = null;
      if (
        !(
          enabled ||
          this.dead ||
          this.feedUp !== true ||
          loadDataOperationControlVerdictHandler21()
        )
      ) {
        this.quietTimer = dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.quietTimer = null;
            this.liveness();
          },
          visibility.idle()
            ? dataOperationControlFloor2
            : dataOperationControlFloor,
        );
      }
    }
    liveness(..._extraArguments: unknown[]): undefined {
      if (
        !(
          enabled ||
          this.dead ||
          this.feedUp !== true ||
          loadDataOperationControlVerdictHandler21()
        )
      ) {
        if (honourOpsOnFeed()) {
          this.probe(false);
        } else {
          if (this.lastRev >= 0) {
            this.read(this.since());
          }
        }
        this.heard();
      }
    }
    visibilityChanged(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead || loadDataOperationControlVerdictHandler21())
        return;
      if (dataOperationControlVerdict2 === `idle`) {
        if (this.quietTimer !== null) {
          this.heard();
        }
        if (this.orderTimer !== null) {
          dataOperationControlVerdict.timers.clearTimeout(this.orderTimer);
        }
        this.orderTimer = null;
        return;
      }
      if (dataOperationControlVerdict2 === `visible` && this.freshOwed) {
        this.freshOwed = false;
        if (
          honourOpsOnFeed() &&
          this.served &&
          ((this.gapOwed &&
            ((this.gapTimer !== null && this.gapSlow) || this.stoodAt >= 0)) ||
            (options && this.feedUp === true))
        ) {
          this.wantComments = !this.commentsBarred;
          this.commentsAsk += 1;
        } else {
          this.freshen();
        }
      }
      let enabled26 = false;
      if (
        dataOperationControlVerdict2 === `visible` &&
        this.served &&
        this.gapOwed &&
        ((this.gapTimer !== null && this.gapSlow) || this.stoodAt >= 0)
      ) {
        if (this.gapTimer !== null) {
          dataOperationControlVerdict.timers.clearTimeout(this.gapTimer);
        }
        this.gapTimer = null;
        this.gapSlow = false;
        this.stoodAt = -1;
        enabled26 = true;
        this.gapRead();
      }
      if (!(dataOperationControlVerdict2 !== `visible` || !options)) {
        if (enabled26) {
          this.heard();
        } else {
          if (this.feedUp === true) {
            this.liveness();
          } else {
            if (!honourOpsOnFeed() && this.lastRev >= 0) {
              this.read(this.since());
            }
          }
        }
        this.pollWake();
        if (this.orderActive) {
          this.orderArm();
        }
      }
    }
    feed(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(enabled || this.dead || this.feedUp === dataOperationControlVerdict2)
      ) {
        this.feedUp = dataOperationControlVerdict2;
        if (!dataOperationControlVerdict2) {
          this.ringDue = false;
        }
        console.info(
          dataOperationControlVerdict2
            ? `opTransport: room feed attached — since-read poll off (liveness only)`
            : `opTransport: room feed not attached — since-read poll on until it is`,
        );
        this.heard();
        this.pollWake();
        if (dataOperationControlVerdict2) {
          this.roadMoved();
        }
        if (this.pollTimer === null) {
          this.armPoll();
        }
      }
    }
    toldHeld: Dynamic = [];
    toldOverflow: Dynamic = false;
    toldRev: Dynamic = -1;
    toldSpans: Dynamic = [];
    frontier(..._extraArguments: unknown[]) {
      let max: Dynamic = Math.max(this.toldRev, this.wholePicRev);
      for (let enabled26: Dynamic = true; enabled26; ) {
        enabled26 = false;
        for (let loadDataOperationControlVerdictResult22 of this
          .toldSpans as Dynamic)
          if (
            loadDataOperationControlVerdictResult22.lo <= max + 1 &&
            loadDataOperationControlVerdictResult22.hi > max
          ) {
            [max, enabled26] = [
              loadDataOperationControlVerdictResult22.hi,
              true,
            ];
          }
      }
      this.toldSpans = this.toldSpans.filter(
        (toldSpan?: Dynamic, ..._extraArguments: unknown[]) =>
          toldSpan.hi > max,
      );
      return (this.toldRev = Math.max(this.toldRev, max));
    }
    delivered(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(dataOperationControlVerdict2 > 0) ||
        options < dataOperationControlVerdict2
      )
        return;
      let toldSpan: Dynamic = this.toldSpans.find(
        (toldSpan2?: Dynamic, ..._extraArguments: unknown[]) =>
          dataOperationControlVerdict2 <= toldSpan2.hi + 1 &&
          options >= toldSpan2.lo - 1,
      );
      if (toldSpan) {
        [toldSpan.lo, toldSpan.hi] = [
          Math.min(toldSpan.lo, dataOperationControlVerdict2),
          Math.max(toldSpan.hi, options),
        ];
      } else {
        this.toldSpans.push({
          lo: dataOperationControlVerdict2,
          hi: options,
        });
      }
      if (this.toldSpans.length > 64) {
        this.toldSpans.shift();
      }
      if (this.cands.length > 0) {
        this.candsCovered();
      }
    }
    candsCovered(..._extraArguments: unknown[]): undefined {
      let max = Math.max(this.frontier(), this.wholePicRev);
      let filteredCands: Dynamic = this.cands.filter(
        (cand?: Dynamic, ..._extraArguments: unknown[]) => cand.upTo <= max,
      );
      if (filteredCands.length !== 0) {
        for (let loadDataOperationControlVerdictResult22 of filteredCands as Dynamic)
          dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22.timer,
          );
        this.cands = this.cands.filter(
          (cand?: Dynamic, ..._extraArguments: unknown[]) => cand.upTo > max,
        );
        reportOperationEvent(`told.holeCovered`, {
          upTo: (Math.max as Dynamic)(
            ...filteredCands.map(
              (
                filteredCand?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => filteredCand.upTo,
            ),
          ),
        });
        this.candsGround();
      }
    }
    candsGround(..._extraArguments: unknown[]): undefined {
      if (this.cands.length > 0 || this.candGround < 0) return;
      let candGround: Dynamic = this.candGround;
      this.candGround = -1;
      this.bookRev(candGround, !this.gapOwed);
    }
    cands: Dynamic = [];
    candGround: Dynamic = -1;
    holeRev: Dynamic = -1;
    holeTimer: Dynamic = null;
    ringDue: Dynamic = false;
    catchUpDue(..._extraArguments: unknown[]): undefined {
      if (honourOpsOnFeed() && !enabled && !this.dead) {
        this.ringDue = true;
      }
    }
    told(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let told: Dynamic = dataOperationControlVerdict2.told;
      let dataOperationControlMinted4: Dynamic =
        told === undefined
          ? resolveDataOperationControlMinted4(dataOperationControlVerdict2)
          : null;
      let told2: Dynamic =
        told !== undefined && told !== `elided`
          ? told
          : dataOperationControlMinted4;
      let rev: Dynamic =
        told2 && told2.rev > 0
          ? told2.rev
          : resolveDataOperationControlEdit(dataOperationControlVerdict2);
      let dataOperationControlIsInteger2: Dynamic =
        resolveDataOperationControlIsInteger2(dataOperationControlVerdict2);
      if (dataOperationControlIsInteger2 !== undefined) {
        this.heardSeq = Math.max(this.heardSeq, dataOperationControlIsInteger2);
      }
      let matchesDataOperationControlIsInteger2 =
        dataOperationControlIsInteger2 !== undefined &&
        dataOperationControlIsInteger2 <= this.pictureSeq &&
        !(rev !== undefined && rev > this.wholePicRev);
      let span: Dynamic =
        told === `elided` && isPlainRecord(dataOperationControlVerdict2.span)
          ? dataOperationControlVerdict2.span
          : null;
      let record4: Dynamic =
        span && typeof span.rev == `number` && typeof span.revFirst == `number`
          ? {
              rev: span.rev,
              revFirst: span.revFirst,
            }
          : null;
      if (
        rev !== undefined &&
        Array.isArray(dataOperationControlVerdict2.opIds)
      ) {
        let filteredOpIds: Dynamic = dataOperationControlVerdict2.opIds.filter(
          (opId?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof opId == `string` && this.provisional.has(opId),
        );
        if (
          filteredOpIds.length > 0 &&
          (this.durable(filteredOpIds, rev, told2 ?? record4 ?? undefined),
          !told2 || this.mine(told2))
        )
          return;
      }
      if (!told2) {
        let edit: Dynamic = isPlainRecord(dataOperationControlVerdict2.edit)
          ? dataOperationControlVerdict2.edit
          : dataOperationControlVerdict2;
        let opId: Dynamic = typeof edit.opId == `string` ? edit.opId : ``;
        let item =
          [edit.sess, edit.by].find(
            (item2?: unknown, ..._extraArguments: unknown[]) =>
              typeof item2 == `string`,
          ) ?? ``;
        let mine: Dynamic = opId
          ? this.mine({
              opId: opId,
              by: item,
            }) ||
            (!item && this.sentOp(opId))
          : item !== `` &&
            item === dataOperationControlVerdict.session.get()?.label;
        if (mine && record4) {
          this.serialHole(record4);
        } else {
          if (mine && rev !== undefined) {
            this.heardMine(rev);
          }
        }
        return mine
          ? void (rev !== undefined && this.bookRev(rev, false))
          : (reportOperationEvent(`told.bell`, {
              rev: rev ?? -1,
              seq: dataOperationControlIsInteger2 ?? -1,
              elided: told === `elided`,
              opId: opId,
              by: item,
              ...(matchesDataOperationControlIsInteger2
                ? {
                    pictureSeq: this.pictureSeq,
                  }
                : {}),
            }),
            record4 && this.delivered(record4.revFirst, record4.rev),
            matchesDataOperationControlIsInteger2
              ? void (rev !== undefined && this.bookRev(rev, !this.gapOwed))
              : this.wholeRead(
                  told === `elided`
                    ? `a feed frame whose ops the door elided`
                    : `a feed frame carried no ops to apply`,
                  rev,
                  DataOperationControlStyles4,
                  dataOperationControlIsInteger2,
                ));
      }
      if (!this.dead) {
        if (this.mine(told2)) {
          this.ackedRev = Math.max(this.ackedRev, told2.rev);
          let serialHole = this.serialHole(told2);
          return this.bookRev(told2.rev, !serialHole && !this.gapOwed);
        }
        if (told2.refolded !== undefined) {
          reportOperationEvent(`told.refolded`, {
            rev: told2.rev,
            seq: dataOperationControlIsInteger2 ?? -1,
            by: told2.by,
            opId: told2.opId,
            code: told2.refolded,
            verbs: told2.ops
              .map((operation?: Dynamic, ..._extraArguments: unknown[]) =>
                String(operation.op),
              )
              .join(`,`),
            ...(matchesDataOperationControlIsInteger2
              ? {
                  pictureSeq: this.pictureSeq,
                }
              : {}),
          });
          return matchesDataOperationControlIsInteger2
            ? this.bookRev(told2.rev, !this.gapOwed)
            : this.wholeRead(
                `a row the door applied other than as sent (${told2.refolded})`,
                told2.rev > 0 ? told2.rev : undefined,
                DataOperationControlStyles4,
                dataOperationControlIsInteger2,
              );
        }
        if (
          !this.served ||
          this.readingWhole ||
          this.toldHeld.length > 0 ||
          this.toldOverflow
        )
          return this.holdTold(told2);
        if (this.straddles(told2, this.wholePicRev)) {
          reportOperationEvent(`told.straddled`, {
            rev: told2.rev,
            revFirst: told2.revFirst,
            picRev: this.wholePicRev,
          });
          this.holdTold(told2);
          return this.wholeRead(
            `a staged row the picture holds only the first stages of`,
            told2.rev,
          );
        }
        this.applyTold(told2);
      }
    }
    straddles(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      return (
        dataOperationControlVerdict2.rev > options &&
        dataOperationControlVerdict2.revFirst > 0 &&
        dataOperationControlVerdict2.revFirst <= options
      );
    }
    holdTold(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!this.toldOverflow) {
        this.toldHeld.push(dataOperationControlVerdict2);
        if (!(this.toldHeld.length <= 256)) {
          this.toldHeld = [];
          this.toldOverflow = true;
        }
      }
    }
    drainTold(picRev?: Dynamic, ..._extraArguments: unknown[]): undefined {
      let splice: Dynamic = this.toldHeld.splice(0);
      let overflow: Dynamic = this.toldOverflow;
      this.toldOverflow = false;
      let applied: Dynamic = 0;
      let loadDataOperationControlVerdictResult22: Dynamic = null;
      for (let loadDataOperationControlVerdictResult23 of splice as Dynamic)
        if (
          !(
            loadDataOperationControlVerdictResult23.rev > 0 &&
            loadDataOperationControlVerdictResult23.rev <= picRev
          )
        ) {
          if (
            loadDataOperationControlVerdictResult22 ||
            this.straddles(loadDataOperationControlVerdictResult23, picRev)
          ) {
            loadDataOperationControlVerdictResult22 ??=
              loadDataOperationControlVerdictResult23;
            this.toldHeld.push(loadDataOperationControlVerdictResult23);
            continue;
          }
          this.applyTold(loadDataOperationControlVerdictResult23);
          applied += 1;
        }
      if (splice.length > 0 || overflow) {
        reportOperationEvent(`told.drain`, {
          picRev: picRev,
          held: splice.length,
          applied: applied,
          overflow: overflow,
          ...(loadDataOperationControlVerdictResult22
            ? {
                straddled: [
                  loadDataOperationControlVerdictResult22.revFirst,
                  loadDataOperationControlVerdictResult22.rev,
                ],
                reheld: this.toldHeld.length,
              }
            : {}),
        });
      }
      if (
        loadDataOperationControlVerdictResult22 &&
        !(
          this.gapOwed &&
          this.gapRev >= loadDataOperationControlVerdictResult22.rev
        )
      ) {
        this.wholeRead(
          `a staged row the picture holds only the first stages of`,
          loadDataOperationControlVerdictResult22.rev,
        );
      } else {
        if (overflow) {
          this.wholeRead(`more rows arrived under a whole read than are held`);
        }
      }
    }
    applyTold(row?: Dynamic, ..._extraArguments: unknown[]): undefined {
      this.delivered(row.revFirst, row.rev);
      this.bookRev(row.rev, !this.gapOwed);
      this.holedRead.clear();
      let under: Dynamic = this.out();
      reportOperationEvent(`told.apply`, {
        rev: row.rev,
        by: row.by,
        opId: row.opId,
        ops: row.ops.length,
        verbs: row.ops
          .map((operation?: Dynamic, ..._extraArguments: unknown[]) =>
            String(operation.op),
          )
          .join(`,`),
        under: under,
      });
      this.emit({
        t: `row`,
        node: this.node,
        row: row,
        ...(under > 0
          ? {
              under: under,
            }
          : {}),
      });
      if (row.ops.some(resolveDataOperationControlInsert)) {
        this.freshen();
      }
    }
    serialHole(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (!(dataOperationControlVerdict2.revFirst > 0) || enabled || this.dead)
        return false;
      let frontier = this.frontier();
      this.delivered(
        dataOperationControlVerdict2.revFirst,
        dataOperationControlVerdict2.rev,
      );
      if (
        dataOperationControlVerdict2.revFirst <= frontier + 1 ||
        this.wholePicRev < 0 ||
        this.halted
      )
        return false;
      let max: Dynamic = Math.max(frontier, this.cands.at(-1)?.upTo ?? -1);
      for (let enabled26: Dynamic = true; enabled26; ) {
        enabled26 = false;
        for (let loadDataOperationControlVerdictResult22 of this
          .toldSpans as Dynamic)
          if (
            loadDataOperationControlVerdictResult22.lo <= max + 1 &&
            loadDataOperationControlVerdictResult22.hi > max
          ) {
            [max, enabled26] = [
              loadDataOperationControlVerdictResult22.hi,
              true,
            ];
          }
      }
      if (max < dataOperationControlVerdict2.revFirst - 1) {
        let record4 = {
          upTo: dataOperationControlVerdict2.revFirst - 1,
          timer: null,
        };
        record4.timer = dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]) => this.graceOver(record4),
          dataOperationControlValue20007,
        );
        this.cands.push(record4);
        reportOperationEvent(`told.holeCandidate`, {
          upTo: record4.upTo,
          at: frontier,
        });
      }
      this.candGround = Math.max(
        this.candGround,
        dataOperationControlVerdict2.rev,
      );
      return true;
    }
    graceOver(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        enabled ||
        this.dead ||
        !this.cands.includes(dataOperationControlVerdict2)
      )
        return;
      if ((this.gapOwed && this.stoodAt < 0) || this.readingWhole)
        return void (dataOperationControlVerdict2.timer =
          dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]) =>
              this.graceOver(dataOperationControlVerdict2),
            dataOperationControlValue20007,
          ));
      this.candsCovered();
      if (!this.cands.includes(dataOperationControlVerdict2)) return;
      for (let loadDataOperationControlVerdictResult22 of this.cands as Dynamic)
        if (
          loadDataOperationControlVerdictResult22.upTo <=
            dataOperationControlVerdict2.upTo &&
          loadDataOperationControlVerdictResult22 !==
            dataOperationControlVerdict2
        ) {
          dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22.timer,
          );
        }
      this.cands = this.cands.filter(
        (cand?: Dynamic, ..._extraArguments: unknown[]) =>
          cand.upTo > dataOperationControlVerdict2.upTo,
      );
      let frontier = this.frontier();
      let missed =
        (Math.min as Dynamic)(
          dataOperationControlVerdict2.upTo + 1,
          ...this.toldSpans.map(
            (toldSpan?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              toldSpan.lo,
          ),
        ) -
        frontier -
        1;
      this.toldRev = Math.max(this.toldRev, dataOperationControlVerdict2.upTo);
      let rev = this.frontier();
      let ringDue: Dynamic = this.ringDue || this.holeTimer !== null;
      if (
        this.gapOwed ||
        loadDataOperationControlVerdictResult10 !== null ||
        enabled16
      ) {
        reportOperationEvent(`told.holeCovered`, {
          upTo: dataOperationControlVerdict2.upTo,
          owed: true,
        });
      } else {
        reportOperationEvent(`told.serialHole`, {
          missed: missed,
          rev: rev,
          at: frontier,
          upTo: dataOperationControlVerdict2.upTo,
          ...(ringDue
            ? {
                owed: this.ringDue ? `ring` : `window`,
              }
            : {}),
        });
        if (!this.ringDue) {
          emitTelemetryEvent(createPagesSyncSerialHoleEvent(`mine`, missed));
        }
        if (ringDue) {
          this.holeRev = Math.max(this.holeRev, rev);
        } else {
          this.wholeRead(
            DataOperationControlARowPastRevsThisPageNeverHeard,
            rev,
          );
          this.holeTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]) => this.holeWindow(),
            dataOperationControlValue150002,
          );
        }
      }
      this.candsGround();
    }
    resetHoleState(
      dataOperationControlVerdict2: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      for (let loadDataOperationControlVerdictResult22 of [
        ...this.cands.map(
          (cand?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            cand.timer,
        ),
        this.holeTimer,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      if (dataOperationControlVerdict2 && this.cands.length > 0) {
        reportOperationEvent(`told.holeCovered`, {
          upTo: (Math.max as Dynamic)(
            ...this.cands.map(
              (cand?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                cand.upTo,
            ),
          ),
          restarted: true,
        });
      }
      [
        this.cands,
        this.candGround,
        this.holeTimer,
        this.holeRev,
        this.toldRev,
        this.toldSpans,
      ] = [[], -1, null, -1, -1, []];
    }
    holeWindow(..._extraArguments: unknown[]): undefined {
      this.holeTimer = null;
      let holeRev: Dynamic = this.holeRev;
      this.holeRev = -1;
      if (
        !(
          enabled ||
          this.dead ||
          loadDataOperationControlVerdictResult10 !== null ||
          holeRev <= this.wholePicRev
        )
      ) {
        this.wholeRead(
          DataOperationControlARowPastRevsThisPageNeverHeard,
          holeRev,
        );
        this.holeTimer = dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]) => this.holeWindow(),
          dataOperationControlValue150002,
        );
      }
    }
    heardMine(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (dataOperationControlVerdict2 === this.frontier() + 1) {
        this.toldRev = dataOperationControlVerdict2;
      }
    }
    bookRev(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (dataOperationControlVerdict2 > 0) {
        this.lastRev = Math.max(this.lastRev, dataOperationControlVerdict2);
        this.shownRev = Math.max(this.shownRev, dataOperationControlVerdict2);
        this.heardRev = Math.max(this.heardRev, dataOperationControlVerdict2);
        if (options && this.cands.length > 0) {
          this.candGround = Math.max(
            this.candGround,
            dataOperationControlVerdict2,
          );
        } else {
          if (options && !(this.holeRev > this.wholePicRev)) {
            this.groundTo(dataOperationControlVerdict2);
          }
        }
        this.roomSeen(dataOperationControlVerdict2);
        if (this.stoodAt >= 0 && dataOperationControlVerdict2 > this.stoodAt) {
          this.stoodAt = -1;
          this.gapRetry();
        }
      }
    }
    readingWhole: Dynamic = false;
    wholePicRev: Dynamic = -1;
    gapOwed: Dynamic = false;
    gapRev: Dynamic = -1;
    gapBlind: Dynamic = false;
    gapSeq: Dynamic = -1;
    gapRevUnloc: Dynamic = -1;
    gapBlindUnloc: Dynamic = false;
    gapFails: Dynamic = 0;
    lastReadWhy: Dynamic = `below`;
    gapEpisode: Dynamic = false;
    gapWaitedMs: Dynamic = 0;
    readsUnanswered: Dynamic = 0;
    gapTimer: Dynamic = null;
    gapGaveUp: Dynamic = false;
    stoodAt: Dynamic = -1;
    gapSlow: Dynamic = false;
    gapStand(
      rev?: Dynamic,
      floor2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.gapGaveUp = false;
      this.stoodAt = floor2;
      reportOperationEvent(`told.gapStood`, {
        rev: rev,
        floor: floor2,
      });
    }
    wholeRead(
      why?: Dynamic,
      options?: unknown,
      context: Dynamic = DataOperationControlStyles4,
      dependencies?: unknown,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(enabled || this.dead)) {
        if (loadDataOperationControlVerdictResult10 !== null)
          return void reportOperationEvent(`told.whole.gone`, {
            why: why,
          });
        if (enabled16)
          return void reportOperationEvent(`told.whole.refused`, {
            why: why,
          });
        this.gapOwed = true;
        if (
          this.stoodAt >= 0 &&
          typeof options == `number` &&
          options > this.stoodAt
        ) {
          this.stoodAt = -1;
        }
        if (typeof options == `number`) {
          this.gapRev = Math.max(this.gapRev, options);
        }
        if (typeof dependencies == `number`) {
          this.gapSeq = Math.max(this.gapSeq, dependencies);
        } else {
          if (typeof options == `number`) {
            this.gapRevUnloc = Math.max(this.gapRevUnloc, options);
          }
        }
        this.roomSeen(options);
        reportOperationEvent(`told.whole`, {
          why: why,
          rev: options ?? -1,
          seq: dependencies ?? -1,
          pending: this.pending(),
          ...(this.heldWords > 0
            ? {
                held: this.heldWords,
              }
            : {}),
          reading: this.reading,
          halted: this.halted,
        });
        if (this.halted)
          return void (this.lastRev >= 0 && this.read(this.since()));
        if (this.out() > 0) return void (this.owed = this.oweWhole = true);
        if (this.reading) {
          if (typeof options != `number`) {
            this.gapBlind = true;
            if (typeof dependencies != `number`) {
              this.gapBlindUnloc = true;
            }
          }
          this.rung = this.rungWhole = true;
          return;
        }
        this.read(undefined, context);
      }
    }
    gapClosedBy(
      rev?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (!this.gapOwed) return true;
      let matchesOptions =
        options !== undefined && this.gapSeq >= 0
          ? options >= this.gapSeq
          : undefined;
      let closes =
        matchesOptions === undefined
          ? !this.gapBlind && rev >= this.gapRev
          : matchesOptions && !this.gapBlindUnloc && rev >= this.gapRevUnloc;
      reportOperationEvent(`told.gapClosedBy`, {
        rev: rev,
        seq: options ?? -1,
        gapRev: this.gapRev,
        gapSeq: this.gapSeq,
        gapRevUnloc: this.gapRevUnloc,
        blind: this.gapBlind,
        blindUnloc: this.gapBlindUnloc,
        closes: closes,
      });
      return closes
        ? (reportOperationEvent(`told.gapClosed`, {
            rev: rev,
            seq: options ?? -1,
            fails: this.gapFails,
          }),
          (this.gapOwed = false),
          (this.gapRev = this.gapSeq = this.gapRevUnloc = -1),
          (this.gapBlindUnloc = false),
          (this.gapFails = 0),
          (this.gapEpisode = false),
          (this.gapWaitedMs = 0),
          (this.gapGaveUp = false),
          (this.stoodAt = -1),
          this.gapTimer !== null &&
            dataOperationControlVerdict.timers.clearTimeout(this.gapTimer),
          (this.gapTimer = null),
          true)
        : false;
    }
    gapWhy(..._extraArguments: unknown[]): Dynamic {
      return this.sheds > 0 ? `shed` : this.lastReadWhy;
    }
    gapRetry(..._extraArguments: unknown[]) {
      if (loadDataOperationControlVerdictResult10 !== null)
        return void this.pageStopped();
      if (enabled16) return void this.pageStopped(false);
      if (
        !this.gapOwed ||
        this.gapTimer !== null ||
        enabled ||
        this.dead ||
        this.halted ||
        kind === `unreached` ||
        this.stoodAt >= 0
      )
        return;
      let refusalClass2: Dynamic = refusalClass();
      if (
        refusalClass2 !== null &&
        this.readsUnanswered >= refusalClass2.TRANSIENT_RETRY_MAX
      ) {
        this.readsUnanswered = 0;
        this.gapFails = 0;
        emit5(
          `unreached`,
          `gap read ×${refusalClass2.TRANSIENT_RETRY_MAX}`,
          `read`,
        );
        return;
      }
      if (this.gapFails >= 24 || this.gapWaitedMs >= 12e4)
        return this.gapAbandon();
      let served: Dynamic = this.served && visibility.state() !== `visible`;
      let dataOperationControlValue50005 = served
        ? dataOperationControlValue5000
        : Math.min(
            dataOperationControlValue5000,
            250 * 2 ** Math.min(this.gapFails, 6),
          );
      let wait2 =
        this.sheds > 0
          ? Math.max(
              dataOperationControlValue50005,
              resolveDataOperationControlRound4(
                1,
                this.shedAskedMs,
                dataOperationControlValue20006,
                dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 0),
              ),
            )
          : dataOperationControlValue50005;
      this.gapFails += 1;
      this.gapWaitedMs += wait2;
      this.gapGaveUp = false;
      this.gapSlow = served;
      let why: Dynamic = this.gapWhy();
      reportOperationEvent(`told.gapRetry`, {
        fails: this.gapFails,
        wait: wait2,
        gapRev: this.gapRev,
        gapSeq: this.gapSeq,
        shed: this.sheds > 0,
        why: why,
        vis: visibility.state(),
      });
      if (!this.gapEpisode) {
        this.gapEpisode = true;
        reportOperationEvent(`told.gapEpisode`, {
          gapRev: this.gapRev,
          gapSeq: this.gapSeq,
          why: why,
          vis: visibility.state(),
        });
      }
      this.gapTimer = dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.gapTimer = null;
          this.gapSlow = false;
          this.gapRead();
        },
        wait2,
      );
    }
    gapRead(..._extraArguments: unknown[]): undefined {
      if (
        !(
          !this.gapOwed ||
          enabled ||
          this.dead ||
          loadDataOperationControlVerdictHandler21()
        )
      ) {
        if (this.out() > 0) return void (this.owed = this.oweWhole = true);
        if (this.reading) return void (this.rung = this.rungWhole = true);
        this.read(undefined, DataOperationControlStyles4);
      }
    }
    pageStopped(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let matchesDataOperationControlVerdict =
        dataOperationControlVerdict2 !== undefined;
      let enabled26 = false;
      if (
        this.gapOwed &&
        this.gapEpisode &&
        (matchesDataOperationControlVerdict
          ? dataOperationControlVerdict2
          : !enabled15) &&
        !enabled &&
        !this.dead
      ) {
        if (!matchesDataOperationControlVerdict) {
          enabled15 = true;
        }
        enabled26 = true;
        reportOperationEvent(`told.gapAbandoned`, {
          fails: this.gapFails,
          waitedMs: this.gapWaitedMs,
          gapRev: this.gapRev,
          gapSeq: this.gapSeq,
          gapRevUnloc: this.gapRevUnloc,
          blind: this.gapBlind,
          blindUnloc: this.gapBlindUnloc,
          pictureSeq: this.pictureSeq,
          why: `refused`,
          vis: visibility.state(),
          ...(matchesDataOperationControlVerdict
            ? {
                access: true,
              }
            : {
                gone: true,
              }),
        });
      }
      this.gapOwed = false;
      this.gapRev = this.gapSeq = this.gapRevUnloc = -1;
      this.gapBlind = this.gapBlindUnloc = false;
      this.gapFails = 0;
      this.gapEpisode = false;
      this.gapWaitedMs = 0;
      this.gapGaveUp = false;
      this.stoodAt = -1;
      this.owed = this.oweWhole = false;
      this.rung = this.rungWhole = false;
      this.shedHeld = null;
      for (let loadDataOperationControlVerdictResult22 of [
        this.gapTimer,
        this.pollTimer,
        this.quietTimer,
        this.healTimer,
        this.healReissueTimer,
        this.orderTimer,
        this.shedTimer,
        this.stubTimer,
        this.freshTimer,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      this.gapTimer =
        this.pollTimer =
        this.quietTimer =
        this.healTimer =
        this.healReissueTimer =
        this.orderTimer =
        this.shedTimer =
        this.stubTimer =
        this.freshTimer =
          null;
      this.resetHoleState();
      this.probeHeld = null;
      this.freshOwed = false;
      this.shedRelease();
      this.paceOff();
      this.calmOff();
      return enabled26;
    }
    readsResume(..._extraArguments: unknown[]): undefined {
      if (!(enabled || this.dead || this.nodeGone)) {
        if (this.served) {
          this.need();
        } else {
          this.read(undefined);
        }
        this.heard();
        if (this.pollTimer === null) {
          this.armPoll();
        }
      }
    }
    accessRefused: Dynamic = false;
    accessRefusedWhole: Dynamic = false;
    knockBlind: Dynamic = false;
    accessAllowed(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(!dataOperationControlVerdict2 && this.accessRefusedWhole)) {
        this.accessRefused = this.accessRefusedWhole = this.knockBlind = false;
        ObservabilityTelemetryUnmatched3(this);
      }
    }
    async accessKnock(..._extraArguments: unknown[]) {
      let door: Dynamic = await this.door({
        verb: `read`,
        payload: {
          kind: `view`,
          sinceRev: Math.max(this.lastRev, 0),
        },
      });
      return door
        ? door.verdict === `allow`
          ? `allowed`
          : isDataOperationControlDeny8(door)
            ? `refused`
            : `none`
        : `none`;
    }
    gapAbandon(..._extraArguments: unknown[]): undefined {
      reportOperationEvent(`told.gapAbandoned`, {
        fails: this.gapFails,
        waitedMs: this.gapWaitedMs,
        gapRev: this.gapRev,
        gapSeq: this.gapSeq,
        gapRevUnloc: this.gapRevUnloc,
        blind: this.gapBlind,
        blindUnloc: this.gapBlindUnloc,
        pictureSeq: this.pictureSeq,
        why: this.gapWhy(),
        vis: visibility.state(),
      });
      this.gapRev = this.gapSeq = this.gapRevUnloc = -1;
      this.gapBlind = this.gapBlindUnloc = false;
      this.pictureSeq = this.heardSeq = -1;
      this.gapFails = 0;
      this.gapEpisode = false;
      this.gapWaitedMs = 0;
      this.gapGaveUp = true;
      this.gapRead();
    }
    sheds: Dynamic = 0;
    shedTimer: Dynamic = null;
    shedHeld: Dynamic = null;
    shedAskedMs: Dynamic = 0;
    shedWaitedMs: Dynamic = 0;
    openShedAt: Dynamic = null;
    shedSeen: Dynamic = 0;
    shedPauseTimer: Dynamic = null;
    shedNote(
      asked?: Dynamic,
      whole?: Dynamic,
      page: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic {
      this.calmOff();
      if (this.paceLeft !== null) {
        this.paceSlower();
      }
      this.sheds += 1;
      this.shedSeen += 1;
      this.shedAskedMs = asked;
      let wait2: Dynamic = resolveDataOperationControlRound4(
        this.sheds,
        asked,
        dataOperationControlValue10003,
        dataOperationControlVerdict.random ??
          ((..._extraArguments: unknown[]) => 0),
        this.served
          ? dataOperationControlValue300003
          : dataOperationControlValue4000,
      );
      reportOperationEvent(`read.shed`, {
        n: this.sheds,
        wait: wait2,
        asked: asked,
        served: this.served,
        whole: whole,
        page: page,
      });
      if (!this.served) {
        let now2: Dynamic = dataOperationControlVerdict.now?.();
        if (now2 !== undefined && this.openShedAt === null) {
          this.openShedAt = now2;
        }
        let dataOperationControlWords: Dynamic =
          resolveDataOperationControlWords(
            now2 !== undefined && this.openShedAt !== null
              ? now2 - this.openShedAt
              : this.shedWaitedMs,
          );
        this.shedWaitedMs += wait2;
        this.emit({
          t: `state`,
          node: this.node,
          state: state(),
          openBusy: true,
          words: dataOperationControlWords.words,
          stage: dataOperationControlWords.stage,
        });
      }
      return wait2;
    }
    shedPause(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let shedNote: Dynamic = this.shedNote(
        dataOperationControlVerdict2,
        true,
        true,
      );
      this.shedWaitMs = shedNote;
      let now2: Dynamic = dataOperationControlVerdict.now?.();
      return new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          this.shedPauseTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.shedPauseTimer = null;
              this.shedEnded(this.stood(shedNote, now2));
              resolve();
              this.shedOver(true);
            },
            shedNote,
          );
        },
      );
    }
    async pagedRead(
      payload?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      for (;;) {
        for (; this.shedTimer !== null; )
          if ((await this.shedWaitOut(), enabled || this.dead)) return null;
        let door: Dynamic = await this.door(
          {
            verb: `read`,
            payload: payload,
          },
          undefined,
          true,
        );
        if (!door) return null;
        let dataOperationControlDeny: Dynamic =
          resolveDataOperationControlDeny(door);
        if (dataOperationControlDeny === null) {
          if (door.verdict === `allow`) {
            this.shedClear();
          }
          return door;
        }
        await this.shedPause(dataOperationControlDeny);
        if (enabled || this.dead) return null;
      }
    }
    shedArm(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead) return;
      let shedNote: Dynamic = this.shedNote(
        dataOperationControlVerdict2,
        options,
      );
      this.shedWaitMs = shedNote;
      if (this.shedTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.shedTimer);
      }
      if (!this.served && options) {
        this.shedHeld = {
          whole: true,
          named: context || this.shedHeld?.named,
        };
      }
      let now2: Dynamic = dataOperationControlVerdict.now?.();
      this.shedTimer = dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.shedTimer = null;
          this.shedEnded(this.stood(shedNote, now2));
          this.shedRelease();
          if (enabled || this.dead) return;
          let shedHeld: Dynamic = this.shedHeld;
          this.shedHeld = null;
          if (shedHeld === null) {
            if (
              !honourOpsOnFeed() &&
              this.wantRev > this.lastRev &&
              this.lastRev >= 0
            ) {
              this.read(this.since());
            }
          } else {
            this.read(
              shedHeld.whole ? undefined : this.since(),
              shedHeld.named,
            );
          }
          this.shedOver(shedHeld?.whole === true);
        },
        shedNote,
      );
    }
    shedClear(..._extraArguments: unknown[]): undefined {
      this.sheds = 0;
      this.shedAskedMs = 0;
      this.shedWaitedMs = 0;
      this.openShedAt = null;
      this.calmOff();
    }
    shedEnded(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(enabled || this.dead)) {
        this.paceGrant(dataOperationControlVerdict2);
        this.calmArm();
        this.drainBlockReads(true);
      }
    }
    shedCalm: Dynamic = 0;
    calmTimer: Dynamic = null;
    calmOff(..._extraArguments: unknown[]): undefined {
      this.shedCalm = 0;
      if (this.calmTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.calmTimer);
      }
      this.calmTimer = null;
    }
    calmArm(..._extraArguments: unknown[]): undefined {
      if (!(this.calmTimer !== null || this.shedCalm >= this.sheds)) {
        this.calmTimer = dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.calmTimer = null;
            if (!(enabled || this.dead || this.shedStands())) {
              this.shedCalm += 1;
              this.calmArm();
            }
          },
          Math.max(this.shedWaitMs, dataOperationControlValue10003),
        );
      }
    }
    shedEase(..._extraArguments: unknown[]): undefined {
      if (this.shedCalm !== 0) {
        this.sheds = Math.max(0, this.sheds - this.shedCalm);
        this.shedCalm = 0;
        if (this.sheds === 0) {
          this.shedClear();
        } else {
          this.calmArm();
        }
      }
    }
    shedStands(..._extraArguments: unknown[]) {
      return this.shedTimer !== null || this.shedPauseTimer !== null;
    }
    shedWaitMs: Dynamic = 0;
    shedWaiters: Dynamic = [];
    shedWaitOut(..._extraArguments: unknown[]): Dynamic {
      return new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined =>
          void this.shedWaiters.push(resolve),
      );
    }
    shedRelease(..._extraArguments: unknown[]): undefined {
      for (let loadDataOperationControlVerdictResult22 of this.shedWaiters.splice(
        0,
      ) as Dynamic)
        loadDataOperationControlVerdictResult22();
    }
    shedHeldReply(..._extraArguments: unknown[]) {
      return {
        verdict: `deny`,
        reason: `unavailable`,
        detail: `busy: the door shed a read of this document a moment ago; held for its wait, nothing sent`,
        data: {
          why: `busy`,
          scope: `read`,
          retryAfterMs: Math.max(
            this.shedWaitMs,
            dataOperationControlValue10003,
          ),
          held: true,
        },
      };
    }
    probeHeld: Dynamic = null;
    shedOver(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead || this.shedStands()) return;
      let probeHeld: Dynamic = this.probeHeld;
      this.probeHeld = null;
      let wantComments: Dynamic = this.wantComments && !this.commentsBarred;
      if (
        probeHeld !== null &&
        !dataOperationControlVerdict2 &&
        (probeHeld.catchUp || wantComments)
      ) {
        if (!probeHeld.catchUp && visibility.state() !== `visible`) {
          this.freshOwed = true;
        } else {
          this.probe(false, probeHeld.catchUp);
        }
      }
      this.drainBlockReads();
    }
    shedHolds(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (this.shedTimer === null) return false;
      if (
        this.served &&
        dataOperationControlVerdict2 === undefined &&
        (options ===
          `ops on the feed: one whole read (a gap the told rows cannot close)` ||
          options === `the stall healer's one whole read (BGO-1280 interim)`)
      ) {
        if (
          options ===
          `ops on the feed: one whole read (a gap the told rows cannot close)`
        ) {
          this.gapRetry();
        }
        reportOperationEvent(`read.shed.held`, {
          whole: true,
          n: this.sheds,
          ladder:
            options ===
            `ops on the feed: one whole read (a gap the told rows cannot close)`
              ? `gap`
              : `heal`,
        });
        return true;
      }
      let shedHeld: Dynamic = this.shedHeld;
      let whole: Dynamic =
        (shedHeld?.whole ?? false) ||
        dataOperationControlVerdict2 === undefined;
      this.shedHeld = {
        whole: whole,
        named:
          (dataOperationControlVerdict2 === undefined ? options : undefined) ??
          shedHeld?.named,
      };
      reportOperationEvent(`read.shed.held`, {
        whole: whole,
        n: this.sheds,
      });
      return true;
    }
    probing: Dynamic = false;
    probe(
      dataOperationControlVerdict2?: Dynamic,
      catchUp: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        enabled ||
        this.dead ||
        !this.served ||
        loadDataOperationControlVerdictHandler21() ||
        this.sinceHalted(Math.max(this.lastRev, this.picRev, 0)) ||
        (dataOperationControlVerdict2 &&
          !this.commentsBarred &&
          ((this.wantComments = true), (this.commentsAsk += 1)),
        this.probing)
      )
        return;
      if (this.shedStands())
        return void (this.probeHeld = {
          catchUp: catchUp || this.probeHeld?.catchUp === true,
        });
      let comments: Dynamic = !this.commentsBarred && this.wantComments;
      let commentsAsk: Dynamic = this.commentsAsk;
      this.probing = true;
      let sinceRev = Math.max(this.lastRev, this.picRev, 0);
      this.door({
        verb: `read`,
        payload: {
          kind: `view`,
          sinceRev: sinceRev,
          ...(comments
            ? {
                comments: true,
              }
            : {}),
        },
      }).then(
        (response?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          this.probing = false;
          if (response && isDataOperationControlDeny3(response)) {
            if (comments) {
              this.commentsTooLarge();
              this.probe(false);
            } else {
              this.haltTooLarge(false, sinceRev);
            }
            return;
          }
          if (
            response &&
            this.shedStands() &&
            resolveDataOperationControlDeny(response) !== null &&
            (catchUp || this.wantComments)
          ) {
            this.probeHeld = {
              catchUp: catchUp || this.probeHeld?.catchUp === true,
            };
          }
          if (!response || response.verdict !== `allow`) return;
          let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
          let item = [response.rev, data.rev].find(
            (item2?: unknown, ..._extraArguments: unknown[]) =>
              typeof item2 == `number`,
          );
          if (comments) {
            if (this.commentsAsk === commentsAsk) {
              this.wantComments = false;
            }
            if (Array.isArray(data.comments)) {
              this.emit({
                t: `comments`,
                node: this.node,
                comments: data.comments,
              });
            }
          }
          reportOperationEvent(`told.probe`, {
            top: sinceRev,
            rev: item ?? -1,
            comments: comments,
            again: this.wantComments,
            catchUp: catchUp,
          });
          if (
            catchUp &&
            typeof item == `number` &&
            item > Math.max(this.lastRev, this.shownRev, this.heardRev)
          ) {
            this.wholeRead(
              `the no-feed poll: the room is past this page and no row can come`,
              item,
            );
          } else {
            this.roomSeen(item);
          }
          if (this.wantComments && !this.commentsBarred) {
            this.probe(true);
          }
        },
        (..._extraArguments: unknown[]): undefined =>
          void (this.probing = false),
      );
    }
    readComments(..._extraArguments: unknown[]): undefined {
      this.probe(true);
    }
    streamRefused(
      response?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead) return;
      let filteredOpIds: Dynamic = Array.isArray(response.opIds)
        ? response.opIds.filter(
            (opId?: unknown, ..._extraArguments: unknown[]): Dynamic =>
              typeof opId == `string` && this.provisional.has(opId),
          )
        : [];
      if (filteredOpIds.length === 0) return;
      let ack: Dynamic = isPlainRecord(response.ack) ? response.ack : {};
      let data: Dynamic = isPlainRecord(ack.data) ? ack.data : {};
      let reason: Dynamic =
        typeof ack.reason == `string`
          ? ack.reason
          : typeof response.reason == `string`
            ? response.reason
            : `refused`;
      let ack2: Dynamic = isPlainRecord(response.ack)
        ? response.ack
        : {
            verdict: `deny`,
            reason: reason,
            data: data,
          };
      let matchesDataOperationControlAllow =
        resolveDataOperationControlAllow(ack2) !== null;
      let dataOperationControlValue19: Dynamic =
        resolveDataOperationControlValue19(ack2);
      let number2 = Number(
        data.retryAfterMs ?? ack.retryAfterMs ?? response.retryAfterMs,
      );
      let label5 = `${String(data.code)} ${reason}`;
      let uniqueItems7: Dynamic = new (Set as Dynamic)([
        response.transient,
        ack.transient,
        data.transient,
        isPlainRecord(response.data) ? response.data.transient : undefined,
      ]);
      let test3 = dataOperationControlIdentifierPattern3.test(label5);
      let ack3: Dynamic =
        isPlainRecord(response.ack) && typeof response.ack.verdict == `string`
          ? response.ack
          : {
              verdict: `deny`,
              reason: reason,
              data: data,
            };
      let state2: Dynamic = (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        judged(
          response,
          ack3,
          dataOperationControlVerdict2 ? `burst_resent` : `burst_denied`,
          {
            road: `stream`,
            verb: `update`,
            node: this.node,
            seated: loadDataOperationControlVerdictHandler26(),
            opId: filteredOpIds[0],
            burst: filteredOpIds.length,
            stream: true,
            vis: visibility.state(),
            feedUp: this.feedUp,
          },
        );
      let refusalClass2: Dynamic = refusalClass();
      if (refusalClass2 === null) {
        let enabled27: Dynamic =
          !uniqueItems7.has(false) &&
          (uniqueItems7.has(true) ||
            number2 >= 0 ||
            dataOperationControlPattern8.test(label5) ||
            (typeof response.status == `number` &&
              response.status !== 200 &&
              !test3));
        state2(enabled27);
        if (enabled27) {
          let filteredItems2: Dynamic = [...this.provisional.values()].filter(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              filteredOpIds.includes(item.opId),
          );
          for (let loadDataOperationControlVerdictResult22 of filteredItems2 as Dynamic) {
            this.provisional.delete(
              loadDataOperationControlVerdictResult22.opId,
            );
            loadDataOperationControlVerdictResult22.provisional = false;
            loadDataOperationControlVerdictResult22.batchesDone = 0;
            loadDataOperationControlVerdictResult22.results = [];
            loadDataOperationControlVerdictResult22.padded =
              loadDataOperationControlVerdictResult22.flown = undefined;
            loadDataOperationControlVerdictResult22.tries += 1;
            if (dataOperationControlValue19) {
              loadDataOperationControlVerdictResult22.lost = true;
            }
          }
          (this.queue.unshift as Dynamic)(...filteredItems2);
          let max: Dynamic = (Math.max as Dynamic)(
            ...filteredItems2.map(
              (
                filteredItem?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => filteredItem.tries,
            ),
          );
          this.slow = true;
          this.unsayBusy();
          this.emit({
            t: `state`,
            node: this.node,
            state: `saving`,
            words:
              max > 2
                ? DataOperationControlMessage14
                : matchesDataOperationControlAllow
                  ? DataOperationControlMessage2
                  : DataOperationControlMessage13,
            ...(matchesDataOperationControlAllow
              ? {
                  storeShed: true,
                }
              : {}),
          });
          emit7();
          console.info(
            `opTransport: stream burst not persisted (transient) — re-sending under the same opIds`,
            filteredOpIds.join(`,`),
            reason,
          );
          resolveDataOperationControlValue22(
            `burst_unpersisted`,
            max > 1,
            filteredItems2.length,
          );
          if (this.retryTimer !== null) return;
          let dataOperationControlValue26: Dynamic =
            resolveDataOperationControlValue26(
              number2,
              dataOperationControlValue1000 * 2 ** (max - 1),
            );
          this.retryTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.retryTimer = null;
              if (!enabled && !this.dead) {
                this.pump();
              }
            },
            dataOperationControlValue26,
          );
          return;
        }
        for (let opId of filteredOpIds as Dynamic) {
          let rescue: Dynamic = this.orphanedRescue(opId);
          this.provisional.delete(opId);
          dataOperationControlVerdict.wal
            .trim(this.node, opId)
            .catch((..._extraArguments: unknown[]): undefined => undefined);
          this.emit({
            t: `deny`,
            node: this.node,
            opId: opId,
            reason: reason,
            detail: {
              ...(isPlainRecord(ack.data) ? ack.data : {}),
              streamed: true,
              ...(rescue.length > 0
                ? {
                    rescue: rescue,
                  }
                : {}),
            },
          });
        }
        this.unsettled = true;
        this.owed = this.oweWhole = true;
        emit7();
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
        return;
      }
      let classify2: Dynamic =
        typeof ack.verdict == `string`
          ? refusalClass2.classify(ack, {
              road: `stream`,
              seated: loadDataOperationControlVerdictHandler26(),
              node: this.node,
            })
          : null;
      let filteredItems: Dynamic = [...this.provisional.values()].filter(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          filteredOpIds.includes(item.opId),
      );
      let uniqueItems8: Dynamic = new (Set as Dynamic)(
        classify2?.k === `bounded`
          ? filteredItems
              .filter(
                (filteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
                  (filteredItem.streamBound ?? 0) >= classify2.max,
              )
              .map(
                (
                  filteredFilteredItem?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => filteredFilteredItem.opId,
              )
          : [],
      );
      let enabled26: Dynamic =
        !uniqueItems7.has(false) &&
        (uniqueItems7.has(true) ||
          classify2?.k === `transient` ||
          classify2?.k === `bounded` ||
          dataOperationControlPattern8.test(label5) ||
          (typeof response.status == `number` &&
            response.status !== 200 &&
            !test3));
      let filteredFilteredItems: Dynamic = enabled26
        ? filteredItems.filter(
            (filteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
              !uniqueItems8.has(filteredItem.opId),
          )
        : [];
      state2(filteredFilteredItems.length > 0);
      if (filteredFilteredItems.length > 0) {
        for (let loadDataOperationControlVerdictResult22 of filteredFilteredItems as Dynamic) {
          this.provisional.delete(loadDataOperationControlVerdictResult22.opId);
          loadDataOperationControlVerdictResult22.provisional = false;
          loadDataOperationControlVerdictResult22.batchesDone = 0;
          loadDataOperationControlVerdictResult22.results = [];
          loadDataOperationControlVerdictResult22.padded =
            loadDataOperationControlVerdictResult22.flown = undefined;
          loadDataOperationControlVerdictResult22.tries += 1;
          if (classify2?.k === `bounded`) {
            loadDataOperationControlVerdictResult22.streamBound =
              (loadDataOperationControlVerdictResult22.streamBound ?? 0) + 1;
          }
          if (dataOperationControlValue19) {
            loadDataOperationControlVerdictResult22.lost = true;
          }
        }
        (this.queue.unshift as Dynamic)(...filteredFilteredItems);
        let max: Dynamic = (Math.max as Dynamic)(
          ...filteredFilteredItems.map(
            (
              filteredFilteredItem?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => filteredFilteredItem.tries,
          ),
        );
        if (
          classify2?.k !== `bounded` &&
          (Math.max as Dynamic)(
            ...filteredFilteredItems.map(
              (
                filteredFilteredItem?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                filteredFilteredItem.tries -
                (filteredFilteredItem.triesBase ?? 0),
            ),
          ) >= (enabled18 ? 1 : refusalClass2.TRANSIENT_RETRY_MAX)
        ) {
          for (let loadDataOperationControlVerdictResult22 of filteredFilteredItems as Dynamic)
            loadDataOperationControlVerdictResult22.triesBase =
              loadDataOperationControlVerdictResult22.tries;
          emit5(`unreached`, `stream ${reason} ×${max}`, `stream`);
          return;
        }
        if (
          classify2?.k === `bounded` &&
          classify2.reason !== `conflict` &&
          enabled18 &&
          index3 >= refusalClass2.BREAKER_N
        ) {
          for (let loadDataOperationControlVerdictResult22 of filteredFilteredItems as Dynamic) {
            loadDataOperationControlVerdictResult22.triesBase =
              loadDataOperationControlVerdictResult22.tries;
            loadDataOperationControlVerdictResult22.streamBound = 0;
          }
          emit5(
            `refusing`,
            `stream ${reason} (the probe burst, refused again)`,
            `stream`,
          );
        } else if (
          ((this.slow = true),
          this.unsayBusy(),
          this.emit(
            kind === null
              ? {
                  t: `state`,
                  node: this.node,
                  state: `saving`,
                  words:
                    max > 2
                      ? DataOperationControlMessage14
                      : matchesDataOperationControlAllow
                        ? DataOperationControlMessage2
                        : DataOperationControlMessage13,
                  ...(matchesDataOperationControlAllow
                    ? {
                        storeShed: true,
                      }
                    : {}),
                }
              : loadDataOperationControlVerdictHandler25(this.node),
          ),
          emit7(),
          console.info(
            `opTransport: stream burst not persisted (transient) — re-sending under the same opIds`,
            filteredFilteredItems
              .map(
                (
                  filteredFilteredItem?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => filteredFilteredItem.opId,
              )
              .join(`,`),
            reason,
          ),
          resolveDataOperationControlValue22(
            `burst_unpersisted`,
            max > 1,
            filteredFilteredItems.length,
          ),
          this.streamTimer === null && this.retryTimer === null)
        ) {
          let dataOperationControlValue26: Dynamic =
            resolveDataOperationControlValue26(
              number2,
              dataOperationControlValue1000 * 2 ** (max - 1),
            );
          this.streamTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.streamTimer = null;
              if (!enabled && !this.dead) {
                this.pump();
              }
            },
            dataOperationControlValue26,
          );
        }
      }
      let filteredFilteredOpIds: Dynamic = enabled26
        ? filteredOpIds.filter(
            (filteredOpId?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              uniqueItems8.has(filteredOpId),
          )
        : filteredOpIds;
      if (filteredFilteredOpIds.length === 0) return;
      for (let opId of filteredFilteredOpIds as Dynamic) {
        let rescue: Dynamic = this.orphanedRescue(opId);
        this.provisional.delete(opId);
        dataOperationControlVerdict.wal
          .trim(this.node, opId)
          .catch((..._extraArguments: unknown[]): undefined => undefined);
        let hasOpId: Dynamic = uniqueItems8.has(opId);
        let reason2: Dynamic =
          hasOpId && classify2?.source === "default"
            ? `server_refused`
            : hasOpId && classify2?.reason === `conflict`
              ? `busy`
              : reason;
        this.emit({
          t: `deny`,
          node: this.node,
          opId: opId,
          reason: reason2,
          detail: {
            ...(isPlainRecord(ack.data) ? ack.data : {}),
            streamed: true,
            ...(classify2 === null
              ? {}
              : {
                  klass: classify2.k,
                }),
            ...(hasOpId
              ? {
                  terminal: true,
                  klass: `bounded`,
                }
              : {}),
            ...(reason2 === reason
              ? {}
              : {
                  room_reason: reason,
                }),
            ...(rescue.length > 0
              ? {
                  rescue: rescue,
                }
              : {}),
          },
        });
      }
      let filteredFilteredFilteredOpIdsCount: Dynamic =
        classify2?.k === `bounded` && classify2.reason !== `conflict`
          ? filteredFilteredOpIds.filter(
              (
                filteredFilteredOpId?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => uniqueItems8.has(filteredFilteredOpId),
            ).length
          : 0;
      if (
        filteredFilteredFilteredOpIdsCount > 0 &&
        (index3 += filteredFilteredFilteredOpIdsCount) >=
          refusalClass2.BREAKER_N
      ) {
        emit5(`refusing`, `stream ${reason} ×${index3}`, `stream`);
      }
      this.unsettled = true;
      this.owed = this.oweWhole = true;
      emit7();
      if (!(filteredFilteredItems.length > 0))
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
    }
    applyRow(row?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (this.groundRev >= row.revFirst - 1) {
        this.groundTo(row.rev);
      }
      this.lastRev = this.shownRev = row.rev;
      this.met();
      if (this.mine(row))
        return void (this.ackedRev = Math.max(this.ackedRev, row.rev));
      let under: Dynamic = this.out();
      this.emit({
        t: `row`,
        node: this.node,
        row: row,
        ...(under > 0
          ? {
              under: under,
            }
          : {}),
      });
      if (row.ops.some(resolveDataOperationControlInsert)) {
        this.freshen();
      }
    }
    parked: Dynamic = new (Map as Dynamic)();
    park(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.parked.set(
        dataOperationControlVerdict2.revFirst,
        dataOperationControlVerdict2,
      );
      if (this.parked.size > 256) {
        this.parked.delete((Math.min as Dynamic)(...this.parked.keys()));
      }
    }
    drainParked(..._extraArguments: unknown[]): undefined {
      for (; this.served && this.parked.size > 0; ) {
        let max = Math.max(this.lastRev, this.shownRev);
        for (let [
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        ] of this.parked as Dynamic)
          if (loadDataOperationControlVerdictResult23.rev <= max) {
            this.parked.delete(loadDataOperationControlVerdictResult22);
          }
        let parkedEntry: Dynamic = this.parked.get(max + 1);
        if (!parkedEntry) return;
        this.parked.delete(max + 1);
        this.applyRow(parkedEntry);
      }
    }
    troubled(..._extraArguments: unknown[]) {
      let loadDataOperationControlVerdictHandler30: Dynamic = (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationControlVerdict2.tries > 0 ||
        (dataOperationControlVerdict2.lost === true &&
          dataOperationControlVerdict2.unknownLost !== true) ||
        (dataOperationControlVerdict2.busyTries ?? 0) > 0;
      if (
        this.inflight &&
        loadDataOperationControlVerdictHandler30(this.inflight)
      )
        return true;
      for (let loadDataOperationControlVerdictResult22 of this.queue as Dynamic)
        if (
          loadDataOperationControlVerdictHandler30(
            loadDataOperationControlVerdictResult22,
          )
        )
          return true;
      for (let loadDataOperationControlVerdictResult22 of this.provisional.values() as Dynamic)
        if (
          loadDataOperationControlVerdictHandler30(
            loadDataOperationControlVerdictResult22,
          )
        )
          return true;
      return false;
    }
    busySaid: Dynamic = false;
    unsayBusy(..._extraArguments: unknown[]): undefined {
      if (this.busySaid) {
        this.busySaid = false;
        this.emit({
          t: `state`,
          node: this.node,
          state: `saving`,
          pageBusy: false,
        });
      }
    }
    stuckReplay(..._extraArguments: unknown[]): Dynamic {
      let items3: Dynamic = this.inflight
        ? [this.inflight, ...this.queue]
        : this.queue;
      return (
        items3.length > 0 &&
        items3.every(
          (
            rolldownNImport2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => rolldownNImport2.replayed,
        ) &&
        (items3[0].tries > 0 || (items3[0].pageBusy ?? 0) > 0)
      );
    }
    noteSent(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.sentCount += 1;
      this.sent.add(dataOperationControlVerdict2);
      if (this.sent.size > 512) {
        this.sent.delete(this.sent.values().next().value);
      }
      if (this.unseenOps.size > 512) {
        this.unseenOps.delete(this.unseenOps.values().next().value);
      }
    }
    mine(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let label5: Dynamic = dataOperationControlVerdict.session.get()?.label;
      return dataOperationControlVerdict2.opId
        ? this.sentOp(dataOperationControlVerdict2.opId) &&
            (label5 === undefined || dataOperationControlVerdict2.by === label5)
        : dataOperationControlVerdict2.by === label5;
    }
    sentOp(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return this.unseenOp(dataOperationControlVerdict2)
        ? false
        : this.sent.has(dataOperationControlVerdict2) ||
            this.sent.has(
              resolveDataOperationControlReplace2(dataOperationControlVerdict2),
            );
    }
    unseenOps: Dynamic = new (Set as Dynamic)();
    unseenOp(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return (
        this.unseenOps.has(dataOperationControlVerdict2) ||
        this.unseenOps.has(
          resolveDataOperationControlReplace2(dataOperationControlVerdict2),
        )
      );
    }
    toldRoad: Dynamic = honourOpsOnFeed();
    armAtFlip(..._extraArguments: unknown[]): undefined {
      if (!(!this.served || this.lastRev < 0)) {
        this.resetHoleState();
        this.wholePicRev = Math.max(this.wholePicRev, this.lastRev);
      }
    }
    roadMoved(..._extraArguments: unknown[]): undefined {
      if (enabled || this.dead) return;
      let toldRoad: Dynamic = this.toldRoad;
      if ((this.toldRoad = honourOpsOnFeed()) && !toldRoad) {
        this.armAtFlip();
      }
      if (
        !(
          !honourOpsOnFeed() ||
          this.pollTimer === null ||
          this.feedUp === false
        )
      ) {
        dataOperationControlVerdict.timers.clearTimeout(this.pollTimer);
        this.pollTimer = null;
      }
    }
    toldPolls(..._extraArguments: unknown[]) {
      return this.feedUp === false;
    }
    armPoll(..._extraArguments: unknown[]): undefined {
      if (
        loadDataOperationControlVerdictHandler21() ||
        (honourOpsOnFeed() && !this.toldPolls())
      )
        return;
      let honourOpsOnFeed2: Dynamic = (..._extraArguments: unknown[]) =>
        !reconcile && !honourOpsOnFeed() && this.holed.size > 0;
      this.pollArmedMs = honourOpsOnFeed2()
        ? dataOperationControlValue2000
        : (DataOperationControlState2[this.pollRung] ?? 2e3);
      this.pollTimer = dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.pollTimer = null;
          if (!(enabled || this.dead)) {
            if (!honourOpsOnFeed2()) {
              this.pollRung = Math.min(
                this.pollRung + 1,
                DataOperationControlState2.length - 1,
              );
            }
            if (this.lastRev >= 0 && this.feedUp !== true) {
              if (honourOpsOnFeed()) {
                this.probe(false, true);
              } else {
                this.read(this.since());
              }
            }
            if (honourOpsOnFeed2()) {
              this.holedRead.clear();
              this.mendHoles();
            }
            if (this.pollTimer === null) {
              this.armPoll();
            }
          }
        },
        this.pollArmedMs,
      );
    }
    pollWake(..._extraArguments: unknown[]): undefined {
      this.pollRung = 0;
      if (
        !(
          enabled ||
          this.dead ||
          this.pollTimer === null ||
          this.pollArmedMs <= 2e3
        )
      ) {
        dataOperationControlVerdict.timers.clearTimeout(this.pollTimer);
        this.pollTimer = null;
        this.armPoll();
      }
    }
    async door(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      if (enabled || this.dead) return null;
      if (this.nodeGone) return this.nodeGoneReply();
      let probeEar: Dynamic =
        options === undefined && dataOperationControlVerdict2.verb === `read`
          ? this.probeEar
          : undefined;
      if (probeEar !== undefined) {
        this.probeEar = undefined;
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        !context &&
        this.shedStands()
      ) {
        reportOperationEvent(`read.shed.gate`, {
          n: this.sheds,
        });
        return this.shedHeldReply();
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        this.paceLeft !== null
      ) {
        this.paceLeft = Math.max(-1, this.paceLeft - 1);
        this.paceSpent = true;
      }
      let record4: Dynamic = {
        ...dataOperationControlVerdict2,
        ref: {
          object: `node`,
          id: this.node,
        },
        container: dataOperationControlVerdict.container,
      };
      let race5: Dynamic = await race(record4, options ?? probeEar);
      if (isDataOperationControlDeny9(race5, this.node)) {
        this.markNodeGone();
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        !enabled &&
        !this.dead &&
        !(
          loadDataOperationControlVerdictHandler18() &&
          isDataOperationControlDeny8(race5)
        )
      ) {
        judged(
          record4,
          race5,
          race5.verdict === `allow`
            ? `landed`
            : loadDataOperationControlVerdictResult10 === null
              ? this.nodeGone
                ? `node_gone`
                : race5.verdict === `deny` &&
                    (race5.reason === `gone` ||
                      (isPlainRecord(race5.data) && race5.data.code === `gone`))
                  ? `cleared`
                  : isDataOperationControlDeny3(race5)
                    ? `halted`
                    : `spent`
              : `page_gone`,
          {
            road: `read`,
            verb: `read`,
            node: this.node,
            seated: loadDataOperationControlVerdictHandler26(),
            vis: visibility.state(),
            feedUp: this.feedUp,
            gap: this.gapOwed,
          },
        );
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        !enabled &&
        !this.dead &&
        loadDataOperationControlVerdictResult10 === null
      ) {
        let isPlainRecord3: Dynamic =
          isPlainRecord(dataOperationControlVerdict2.payload) &&
          typeof dataOperationControlVerdict2.payload.sinceRev == `number`;
        if (isDataOperationControlDeny8(race5)) {
          this.accessRefused = true;
          if (!isPlainRecord3) {
            this.accessRefusedWhole = true;
          }
          emit3();
        } else {
          if (
            isPlainRecord3 &&
            race5.verdict === `allow` &&
            this.accessRefusedWhole
          ) {
            this.knockBlind = true;
          }
        }
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        !context &&
        !enabled &&
        !this.dead
      ) {
        let dataOperationControlUnavailable: Dynamic =
          resolveDataOperationControlUnavailable(race5);
        if (dataOperationControlUnavailable === null) {
          if (race5.verdict === `allow`) {
            this.shedEase();
          }
        } else {
          if (this.shedStands()) {
            reportOperationEvent(`read.shed.joined`, {
              n: this.sheds,
            });
          } else {
            this.shedArm(dataOperationControlUnavailable, false, false);
          }
        }
      }
      return enabled || this.dead ? null : race5;
    }
    orphanSaid: Dynamic = false;
    orphanLatched: Dynamic = false;
    orphanStageSaid: Dynamic = null;
    orphanStaged(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let [touched, complete]: Dynamic = [
        dataOperationControlVerdict2?.touched,
        dataOperationControlVerdict2?.complete,
      ];
      this.orphanStageSaid =
        typeof touched == `number` &&
        Number.isInteger(touched) &&
        touched >= 0 &&
        typeof complete == `boolean`
          ? {
              touched: touched,
              complete: complete,
            }
          : null;
    }
    orphanStage(..._extraArguments: unknown[]): Dynamic {
      return enabled || this.dead || this.orphanStageSaid === null
        ? null
        : {
            ...this.orphanStageSaid,
          };
    }
    nodeGone: Dynamic = false;
    goneSaid: Dynamic = false;
    nodeGoneReply(..._extraArguments: unknown[]): Dynamic {
      return {
        verdict: `deny`,
        reason: `gone`,
        detail: DataOperationControlNodeGone2,
        data: {
          code: `gone`,
          object: `node`,
          id: this.node,
          layer: `link`,
        },
      };
    }
    markNodeGone(
      dataOperationControlVerdict2: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          enabled ||
          this.dead ||
          (this.nodeGone && (dataOperationControlVerdict2 || this.goneSaid))
        )
      ) {
        this.nodeGone = true;
        this.halted = true;
        this.owed = this.oweWhole = false;
        this.rung = this.rungWhole = false;
        if (dataOperationControlVerdict2) {
          console.info(
            `opTransport: the door says this document's node is gone — read-only, nothing more is sent for it`,
            this.node,
          );
        }
        if (!(!dataOperationControlVerdict2 && this.downs.size === 0)) {
          this.goneSaid = this.downs.size > 0;
          this.emit({
            t: `state`,
            node: this.node,
            state: `readonly`,
            halt: true,
            shown: this.served,
            words: DataOperationControlNodeGone2,
            nodeGone: true,
          });
        }
      }
    }
    markGone(..._extraArguments: unknown[]): undefined {
      let enabled26 = !this.nodeGone;
      this.markNodeGone(false);
      if (!(!enabled26 || !this.nodeGone)) {
        if (
          !this.served &&
          !this.leftRead &&
          dataOperationControlVerdict.wal.ready !== undefined
        ) {
          Promise.race([
            dataOperationControlVerdict.wal.ready,
            loadDataOperationControlVerdictHandler(400),
          ]).then(
            (..._extraArguments: unknown[]): undefined => {
              if (this.takeLeft()) {
                emit7();
              }
              if (this.goneSaid && this.leftWords.length > 0) {
                this.refreshFace();
              }
            },
            (..._extraArguments: unknown[]): undefined => undefined,
          );
        }
        this.pumpBehind();
      }
    }
    pumpBehind(..._extraArguments: unknown[]): undefined {
      queueMicrotask(
        (..._extraArguments: unknown[]): undefined =>
          void (!enabled && !this.dead && this.pump()),
      );
    }
    since: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      this.lastRev >= 0 ? this.lastRev : undefined;
    met(..._extraArguments: unknown[]): undefined {
      if (this.wantRev >= 0 && this.lastRev >= this.wantRev) {
        this.stubs = 0;
        this.unwant();
      }
      if (this.wantForeign >= 0 && this.lastRev >= this.wantForeign) {
        this.wantForeign = -1;
      }
    }
    unwant(..._extraArguments: unknown[]): undefined {
      this.wantRev = -1;
      if (this.stubTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.stubTimer);
        this.stubTimer = null;
      }
    }
    awaitEcho(..._extraArguments: unknown[]): undefined {
      this.stubTimer ??= dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.stubTimer = null;
          if (!enabled && !this.dead && this.wantRev > this.lastRev) {
            this.read(this.since());
          }
        },
        250,
      );
    }
    stub(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (
        dataOperationControlVerdict2 === undefined ||
        this.wantRev <= this.lastRev
      )
        return false;
      let matchesWantForeign = this.wantForeign > this.lastRev;
      let matchesPending =
        this.pending() > 0 ||
        (!matchesWantForeign && this.wantRev <= this.ackedRev);
      this.stubs += 1;
      return this.stubs >= 3
        ? ((this.stubs = 0),
          matchesPending
            ? false
            : this.noWhole(DataOperationControlARevABellNamedNeverCameInADelta)
              ? (this.healStalled(
                  DataOperationControlARevABellNamedNeverCameInADelta,
                ),
                this.unwant(),
                false)
              : undefined)
        : (this.awaitEcho(), false);
    }
    ownWords(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let changed: Dynamic = Array.isArray(dataOperationControlVerdict2.changed)
        ? dataOperationControlVerdict2.changed
        : null;
      if (
        !changed ||
        (changed.length === 0 && !dataOperationControlVerdict2.gone?.length)
      )
        return false;
      for (; this.wrote.length > 0 && this.wrote[0].hi <= options; )
        this.wrote.shift();
      for (let total2: Dynamic = options + 1; total2 <= context; total2++)
        if (
          !this.wrote.some(
            (wrote?: Dynamic, ..._extraArguments: unknown[]) =>
              total2 >= wrote.lo && total2 <= wrote.hi,
          )
        )
          return false;
      let uniqueItems7: Dynamic = new (Set as Dynamic)(
        changed.map(
          (changed2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            changed2.id,
        ),
      );
      if (
        !dataOperationControlVerdict2.blocks.every(
          (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            uniqueItems7.has(ask.bid),
        )
      )
        return false;
      for (let loadDataOperationControlVerdictResult22 of (dataOperationControlVerdict2.gone ??
        []) as Dynamic)
        if (
          typeof loadDataOperationControlVerdictResult22.id != `string` ||
          !this.deadBids.has(loadDataOperationControlVerdictResult22.id)
        )
          return false;
      return changed.every(
        (changed2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          typeof changed2.id == `string` &&
          typeof changed2.rev == `number` &&
          this.wrote.some(
            (wrote?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              changed2.rev >= wrote.lo &&
              changed2.rev <= wrote.hi &&
              wrote.ids.has(changed2.id),
          ),
      );
    }
    namedWhole: Dynamic = false;
    readingNamed: Dynamic = false;
    landPrint(doc?: Dynamic, rev?: Dynamic, ..._extraArguments: unknown[]) {
      if (
        !this.served ||
        this.reading ||
        this.lastRev < 0 ||
        rev !== this.lastRev + 1 ||
        this.dead ||
        enabled
      )
        return false;
      let match = /^<doc\b[^>]*\ssinceRev="(\d+)"/.exec(doc);
      return !match || Number(match[1]) !== this.lastRev
        ? false
        : ((this.wantRev = Math.max(this.wantRev, rev)),
          this.read(this.lastRev, undefined, {
            verdict: `allow`,
            rev: rev,
            data: {
              doc: doc,
              rev: rev,
              complete: 1,
            },
          }),
          true);
    }
    async read(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      if (loadDataOperationControlVerdictResult10 !== null && this.served)
        return;
      if (enabled16) {
        if (!this.served) {
          this.emit({
            t: `state`,
            node: this.node,
            state: state(),
            openFailed: true,
          });
        }
        return;
      }
      if (honourOpsOnFeed() && !this.halted) {
        dataOperationControlVerdict2 = undefined;
        context = undefined;
        options ??= DataOperationControlStyles4;
      }
      if (
        (dataOperationControlVerdict2 === undefined &&
          (this.halted || (this.cooling && !this.served))) ||
        (dataOperationControlVerdict2 !== undefined &&
          this.sinceHalted(dataOperationControlVerdict2)) ||
        (context === undefined &&
          this.shedHolds(dataOperationControlVerdict2, options))
      )
        return;
      if (
        dataOperationControlVerdict2 === undefined &&
        (options === `re-read what the room made of a paste` ||
          options === `the stall healer's one whole read (BGO-1280 interim)` ||
          options ===
            `ops on the feed: one whole read (a gap the told rows cannot close)` ||
          options === `mount` ||
          options === `recovering after a contained editor error; re-reading` ||
          options ===
            `a block read by id holds fewer named blocks than this page draws inside it`)
      )
        this.namedWhole = options;
      else if (
        dataOperationControlVerdict2 === undefined &&
        this.noWhole(options ?? `a whole read past the first picture`)
      ) {
        let since2: Dynamic = this.since();
        if (since2 === undefined) return;
        dataOperationControlVerdict2 = since2;
      }
      if (this.reading) {
        this.rung = true;
        if (dataOperationControlVerdict2 === undefined && this.lastRev >= 0) {
          this.rungWhole = true;
        }
        return;
      }
      this.reading = true;
      this.readingWhole = dataOperationControlVerdict2 === undefined;
      if (this.readingWhole) {
        this.gapBlind = this.gapBlindUnloc = false;
      }
      if (
        !this.served &&
        dataOperationControlVerdict.wal.ready !== undefined &&
        !matchesReady
      ) {
        await Promise.race([
          dataOperationControlVerdict.wal.ready,
          loadDataOperationControlVerdictHandler(400),
        ]).catch((..._extraArguments: unknown[]): undefined => undefined);
        if (this.takeLeft()) {
          emit7();
        }
      }
      if (!this.served && this.leftWords.length > 0) {
        await this.ready;
      }
      for (
        let dataOperationControlVerdict3: Dynamic =
          dataOperationControlVerdict2;
        dataOperationControlVerdict3 !== false &&
        (dataOperationControlVerdict3 === undefined &&
          ([this.readingNamed, this.namedWhole] = [this.namedWhole, false]),
        (dataOperationControlVerdict3 = await this.readOnce(
          dataOperationControlVerdict3,
          context,
        )),
        (context = undefined),
        !(
          (dataOperationControlVerdict3 === undefined &&
            (this.halted || (this.cooling && !this.served))) ||
          (dataOperationControlVerdict3 === undefined &&
            this.noWhole(`the whole view behind a delta`))
        ));

      );
      this.reading = this.readingWhole = false;
      if (
        honourOpsOnFeed() &&
        this.served &&
        (this.toldHeld.length > 0 || this.toldOverflow)
      ) {
        this.drainTold(this.picRev);
      }
      if (
        honourOpsOnFeed() &&
        this.gapOwed &&
        !this.rung &&
        !(this.owed && this.out() === 0)
      ) {
        this.gapRetry();
      }
      let rung: Dynamic =
        this.rung || (this.owed && this.out() === 0) || this.namedWhole;
      let rungWhole: Dynamic = this.rungWhole || this.namedWhole;
      this.rung = this.rungWhole = false;
      if (this.out() === 0) {
        this.owed = false;
      }
      let since: Dynamic = rungWhole ? undefined : this.since();
      let matchesSince: Dynamic =
        since === undefined && (this.halted || (this.cooling && !this.served));
      if (rung && !matchesSince && !enabled && !this.dead) {
        this.read(since, this.namedWhole || undefined);
      } else {
        this.pump();
      }
    }
    async readOnce(
      sinceRev?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let matchesSinceRev = sinceRev === undefined;
      let enabled26: Dynamic =
        !this.commentsBarred &&
        this.wantComments &&
        (matchesSinceRev || (!reconcile && this.served));
      let commentsAsk: Dynamic = this.commentsAsk;
      let payload: Dynamic = {
        kind: `view`,
        ...(matchesSinceRev
          ? {}
          : {
              sinceRev: sinceRev,
            }),
        ...(enabled26
          ? {
              comments: true,
            }
          : {}),
      };
      let matchesOptions =
        options !== undefined && !matchesSinceRev && !enabled26;
      if (
        !matchesOptions &&
        this.shedTimer !== null &&
        this.shedHolds(
          sinceRev,
          (matchesSinceRev && this.readingNamed) || undefined,
        )
      )
        return false;
      let options2: Dynamic = matchesOptions
        ? options
        : await this.door(
            {
              verb: `read`,
              payload: payload,
            },
            undefined,
            true,
          );
      if (!options2) return false;
      if (!matchesOptions && options2.verdict === `allow`) {
        this.accessAllowed(matchesSinceRev);
      }
      this.readsUnanswered =
        options2.verdict === `allow` || options2.verdict === `deny`
          ? 0
          : this.readsUnanswered + 1;
      this.lastReadWhy =
        options2.verdict === `allow`
          ? `below`
          : options2.verdict === `deny`
            ? `refused`
            : options2.hung === true
              ? `hung`
              : `unanswered`;
      let record4: Dynamic = isPlainRecord(options2.data)
        ? {
            ...options2.data,
          }
        : {};
      let matchesVerdict =
        options2.verdict === `deny` &&
        /\Wkind\W/.test(
          JSON.stringify([record4.detail, record4.at, options2.detail]),
        );
      if (matchesVerdict) {
        this.emit({
          t: `state`,
          node: this.node,
          state: `readonly`,
          words: DataOperationControlThisDocumentServiceIsTooOldForThisEditor,
        });
      }
      let enabled27: Dynamic = !this.served && matchesSinceRev && this.gaveUp;
      if (options2.verdict !== `allow`) {
        let classify2: Dynamic =
          options2.verdict === `deny`
            ? (refusalClass()?.classify(options2, {
                road: `read`,
                verb: `read`,
                seated: loadDataOperationControlVerdictHandler26(),
                node: this.node,
              }) ?? null)
            : null;
        if (
          classify2?.k === `page_terminal` &&
          classify2.source !== `relay` &&
          classify2.source !== `http` &&
          (classify2.face === `not_governed` || classify2.face === `cmek`)
        ) {
          pageStopped(classify2.face);
        }
        if (
          loadDataOperationControlVerdictResult10 === null &&
          isDataOperationControlDeny8(options2)
        ) {
          if (
            !this.served &&
            matchesSinceRev &&
            !matchesVerdict &&
            !enabled27
          ) {
            this.emit({
              t: `state`,
              node: this.node,
              state: `readonly`,
              openFailed: true,
            });
          }
          emit3();
          this.owed = this.oweWhole = false;
          this.rung = this.rungWhole = false;
          return false;
        }
        if (
          options2.verdict === `deny` &&
          (options2.reason === `gone` ||
            record4.code === `gone` ||
            resolveDataOperationControlSure(options2) !== null ||
            classify2?.k === `page_terminal` ||
            classify2?.k === `link_terminal`)
        ) {
          this.owed = this.oweWhole = false;
          this.rung = this.rungWhole = false;
          return false;
        }
        if (isDataOperationControlDeny3(options2))
          return enabled26
            ? (this.commentsTooLarge(),
              matchesSinceRev ? this.readOnce(undefined) : sinceRev)
            : (this.haltTooLarge(matchesSinceRev, sinceRev), false);
        let dataOperationControlDeny: Dynamic =
          resolveDataOperationControlDeny(options2);
        return dataOperationControlDeny === null
          ? enabled27
            ? (this.joinFailed(), false)
            : (!this.served &&
                matchesSinceRev &&
                !matchesVerdict &&
                this.emit({
                  t: `state`,
                  node: this.node,
                  state: state(),
                  openFailed: true,
                }),
              false)
          : ((this.rung = this.rungWhole = false),
            this.shedArm(
              dataOperationControlDeny,
              matchesSinceRev,
              matchesSinceRev ? this.readingNamed : false,
            ),
            false);
      }
      let record5: Dynamic =
        matchesSinceRev && this.sheds > 0
          ? {
              n: this.sheds,
              asked: this.shedAskedMs,
              waited: this.shedWaitedMs,
              since: this.openShedAt,
            }
          : null;
      this.shedClear();
      if (!matchesSinceRev && enabled26) {
        let matchesCommentsAsk = this.commentsAsk === commentsAsk;
        if (matchesCommentsAsk) {
          this.wantComments = false;
        }
        if (matchesCommentsAsk && Array.isArray(record4.comments)) {
          this.emit({
            t: `comments`,
            node: this.node,
            comments: record4.comments,
          });
        }
        delete record4.comments;
      }
      let docJson: Dynamic = record4.doc;
      let loadDataOperationControlVerdictResult22: Dynamic;
      let loadDataOperationControlVerdictResult23: Dynamic;
      let item = [options2.rev, record4.rev].find(
        (item2?: unknown, ..._extraArguments: unknown[]) =>
          typeof item2 == `number`,
      );
      let matchesItem =
        item !== undefined &&
        item >= 0 &&
        item < Math.max(this.lastRev, this.ackedRev, this.heardRev);
      if (matchesSinceRev && typeof docJson == `string` && !matchesItem) {
        let matchesComplete2 =
          record4.complete === false ||
          record4.complete === 0 ||
          /^<doc\b[^>]*\scomplete="(?:0|false)"/.test(docJson);
        let joinPages: Dynamic = await this.joinPages(
          docJson,
          [options2.rev, record4.rev],
          matchesComplete2,
          resolveDataOperationControlFrom(record4),
        );
        if (joinPages === null) return false;
        if (`later` in joinPages) {
          this.owed = this.oweWhole = true;
          return false;
        }
        if (`halt` in joinPages) {
          if (
            joinPages.halt === DataOperationControlStyles8 &&
            !this.served &&
            this.joinTries + 1 >= 6
          ) {
            joinPages.halt = DataOperationControlStyles5;
          }
          let halt = joinPages.halt !== DataOperationControlStyles8;
          if (halt) {
            this.halted = true;
          } else {
            this.joinTries += 1;
            this.coolOff();
          }
          let state2 = halt || !this.served ? `readonly` : state();
          this.gaveUp = !halt;
          let count10 = 0;
          if (!this.served && joinPages.part !== undefined) {
            let onFaces3: Dynamic = onFaces(joinPages.part);
            let rev2 =
              [joinPages.rev, onFaces3?.rev].find(
                (item2?: unknown, ..._extraArguments: unknown[]) =>
                  typeof item2 == `number`,
              ) ?? -1;
            if (
              onFaces3 &&
              rev2 >= 0 &&
              !resolveDataOperationControlBlocks2(onFaces3) &&
              (halt || this.lookRev !== rev2)
            ) {
              this.lookRev = rev2;
              count10 = Math.max(1, onFaces3.blocks.length);
              this.emit({
                t: `snapshot`,
                node: this.node,
                rev: rev2,
                blocks: onFaces3.blocks,
                docJson: onFaces3.docJson,
                docXml: joinPages.part,
                incomplete: Math.max(1, joinPages.missing ?? 0),
                ...(Array.isArray(record4.comments)
                  ? {
                      comments: record4.comments,
                    }
                  : {}),
                ...(onFaces3.anchors
                  ? {
                      anchors: onFaces3.anchors,
                    }
                  : {}),
              });
            }
          }
          let enabled30 = !halt && !this.served && this.lookRev !== null;
          let halt2: Dynamic = halt && this.served;
          this.emit({
            t: `state`,
            node: this.node,
            state: state2,
            words: halt2
              ? DataOperationControlStyles7
              : halt && joinPages.halt === DataOperationControlStyles6
                ? count10 > 0
                  ? joinPages.missing
                    ? resolveDataOperationControlValue28(
                        joinPages.missing,
                        count10,
                      )
                    : DataOperationControlState10
                  : joinPages.halt
                : enabled30 && !halt
                  ? DataOperationControlStyles9
                  : joinPages.halt,
            ...(halt
              ? {
                  halt: halt,
                }
              : {}),
            ...(!halt && !this.served
              ? {
                  retrying: true,
                }
              : {}),
            ...(count10 > 0 ||
            enabled30 ||
            halt2 ||
            (halt && !this.served && this.lookRev !== null)
              ? {
                  shown: true,
                }
              : {}),
          });
          return false;
        }
        [
          docJson,
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        ] = [joinPages.doc, joinPages.complete, joinPages.behind];
        if (joinPages.rev !== undefined) {
          options2.rev = joinPages.rev;
        }
        if (joinPages.comments) {
          record4.comments = joinPages.comments;
        }
      }
      let onFaces2: Dynamic =
        typeof docJson == `string`
          ? onFaces(docJson)
          : isPlainRecord(docJson)
            ? {
                docJson: docJson,
                blocks: [],
              }
            : null;
      let rev =
        [options2.rev, record4.rev, onFaces2?.rev].find(
          (item2?: unknown, ..._extraArguments: unknown[]) =>
            typeof item2 == `number`,
        ) ?? -1;
      if (rev >= 0) {
        this.roomSeen(rev);
      }
      if (rev < 0 || (typeof docJson != `string` && !isPlainRecord(docJson))) {
        if (enabled27) {
          this.joinFailed();
        }
        return false;
      }
      let matchesRev = rev < this.readTop;
      this.readTop = Math.max(this.readTop, rev);
      if (!matchesRev) this.backs = 0;
      else if (++this.backs < 3)
        return matchesSinceRev
          ? ((this.backTimer ??= dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.backTimer = null;
                if (
                  !enabled &&
                  !this.dead &&
                  !this.noWhole(`a read answered below an earlier one`)
                ) {
                  this.read(undefined);
                }
              },
              250,
            )),
            false)
          : undefined;
      else if (matchesSinceRev) {
        this.lastRev =
          this.shownRev =
          this.picRev =
          this.ackedRev =
          this.heardRev =
          this.wantForeign =
            -1;
        this.unwant();
        this.readTop = rev;
        this.stubs = this.backs = 0;
        this.roomRev = this.groundRev = -1;
        this.orderDiverged = false;
        this.orderTooLarge = false;
        this.orderRecadence(0);
        this.behindGround = null;
        this.deadBids.clear();
        this.handedRevs.clear();
        this.bornBehind.clear();
        this.parked.clear();
        this.toldHeld = [];
        this.toldOverflow = false;
        this.resetHoleState(true);
        this.wholePicRev = -1;
        this.gapRev = -1;
        this.gapSeq = this.gapRevUnloc = this.pictureSeq = this.heardSeq = -1;
        this.comparing.clear();
        this.comparedRevs.clear();
        this.wrote = [];
      } else return;
      let matchesCappedCount = (onFaces2?.capped?.length ?? 0) > 0;
      let matchesFolded = (onFaces2?.folded ?? 0) > 0;
      if (
        sinceRev !== undefined &&
        rev > this.lastRev &&
        onFaces2 &&
        !matchesCappedCount &&
        (resolveDataOperationControlBlocks2(onFaces2)
          ? matchesFolded
          : this.ownWords(onFaces2, sinceRev, rev))
      ) {
        this.lastRev = rev;
        this.shownRev = Math.max(this.shownRev, rev);
        if (this.behindGround === null && this.holed.size === 0) {
          this.groundTo(rev);
        }
        if (rev >= this.wantRev) {
          this.unwant();
        }
        this.stubs = 0;
        this.drainParked();
        return false;
      }
      if (sinceRev !== undefined && rev > this.lastRev) {
        this.pollWake();
      }
      let floor2 = Math.max(
        this.lastRev,
        this.ackedRev,
        this.heardRev,
        honourOpsOnFeed() && matchesSinceRev ? this.gapRev : -1,
      );
      if (rev < floor2 || (sinceRev !== undefined && rev === this.lastRev)) {
        if (
          sinceRev !== undefined &&
          rev === this.lastRev &&
          this.pending() === 0 &&
          this.behindGround === null &&
          this.holed.size === 0
        ) {
          this.groundTo(rev);
        }
        return enabled27
          ? (this.joinFailed(), false)
          : (sinceRev === undefined &&
              record5 !== null &&
              this.sheds === 0 &&
              ([
                this.sheds,
                this.shedAskedMs,
                this.shedWaitedMs,
                this.openShedAt,
              ] = [record5.n, record5.asked, record5.waited, record5.since]),
            sinceRev === undefined && honourOpsOnFeed()
              ? ((this.gapOwed = true),
                this.gapGaveUp && this.gapStand(rev, floor2))
              : sinceRev === undefined &&
                !this.served &&
                (this.backTimer ??=
                  dataOperationControlVerdict.timers.setTimeout(
                    (..._extraArguments: unknown[]): undefined => {
                      this.backTimer = null;
                      if (
                        !enabled &&
                        !this.dead &&
                        (!this.served || honourOpsOnFeed())
                      ) {
                        this.read(undefined);
                      }
                    },
                    250,
                  )),
            honourOpsOnFeed() &&
              reportOperationEvent(`told.stale`, {
                rev: rev,
                floor: floor2,
              }),
            this.stub(sinceRev));
      }
      this.stubs = 0;
      let under: Dynamic = this.out();
      if (under > 0) {
        this.owed = true;
      }
      let matchesSinceRev2 = sinceRev !== undefined && rev <= this.shownRev;
      if (
        under > 0 &&
        ((!this.served && !this.stuckReplay()) || matchesSinceRev2)
      )
        return false;
      if (honourOpsOnFeed() && under > 0 && this.served) {
        this.oweWhole = true;
        return false;
      }
      if (
        matchesSinceRev &&
        under > 0 &&
        this.served &&
        this.readingNamed ===
          `the stall healer's one whole read (BGO-1280 interim)`
      ) {
        reportOperationEvent(`heal.under_keys`, {
          rev: rev,
          under: under,
          episode: this.healEpisode,
        });
        this.oweWhole = true;
        if (!this.healEpisode) {
          this.healEpisode = true;
          this.healReissues = 0;
        }
        this.healArm(dataOperationControlValue6000);
        return false;
      }
      let matchesCondition =
        typeof docJson == `string` && /^<doc\b[^>]*\ssinceRev=/.test(docJson);
      let matchesCondition2 =
        matchesCondition ||
        (typeof docJson == `string` &&
          /<gap\b(?![^>]*\bcap=)[^>]*\/>/.test(docJson));
      let matchesFolded2 = matchesFolded || matchesCondition2;
      let matchesComplete =
        record4.complete === false ||
        record4.complete === 0 ||
        onFaces2?.complete === false;
      let partial =
        sinceRev !== undefined &&
        (matchesFolded2 || matchesCappedCount || matchesComplete);
      if (
        partial &&
        (matchesCappedCount ||
          !(dataOperationControlVerdict.deltaFeed && onFaces2?.blocks.length))
      ) {
        if (!matchesCappedCount && this.served && typeof docJson == `string`)
          if (this.pending() > 0) this.deltaBlocks(docJson, rev, under);
          else {
            let matchesCondition3 =
              matchesCondition &&
              !this.unsettled &&
              !this.owed &&
              !onFaces2?.anchors?.length;
            if (matchesCondition3 || (!reconcile && matchesCondition)) {
              let sinceRev2: Dynamic = sinceRev ?? this.lastRev;
              let deltaBlocks: Dynamic = this.deltaBlocks(docJson, rev, 0);
              if (!deltaBlocks.leftBehind && this.behindGround === null) {
                this.groundTo(rev);
              }
              if (matchesCondition3 && !deltaBlocks.leftBehind) return false;
              if (!reconcile) {
                let itemsSlice: Dynamic = [...deltaBlocks.behind].slice(
                  0,
                  dataOperationControlValue8,
                );
                if (deltaBlocks.leftBehind) {
                  let label5 =
                    itemsSlice.length > 0
                      ? `a delta left ${deltaBlocks.behind.size} block(s) it could not place; read by id`
                      : `a delta this page could not place`;
                  this.noWhole(label5);
                  this.healStalled(label5);
                  this.behindGround = {
                    since: Math.min(
                      sinceRev2,
                      this.behindGround?.since ?? sinceRev2,
                    ),
                    rev: Math.max(rev, this.behindGround?.rev ?? rev),
                  };
                }
                for (let loadDataOperationControlVerdictResult24 of itemsSlice as Dynamic)
                  this.readBlock(
                    loadDataOperationControlVerdictResult24,
                    true,
                    false,
                    true,
                  );
                this.lastRev = Math.max(this.lastRev, rev);
                this.shownRev = Math.max(this.shownRev, rev);
                if (rev >= this.wantRev) {
                  this.unwant();
                }
                this.drainParked();
                return false;
              }
            }
          }
        return under === 0 && this.served && !reconcile
          ? (this.noWhole(
              matchesCappedCount
                ? `a since-read the engine cut at its ceiling`
                : `a delta this page cannot land by block`,
            ),
            matchesCappedCount
              ? this.groundTo(rev)
              : this.healStalled(`a delta this page cannot land by block`),
            (this.lastRev = Math.max(this.lastRev, rev)),
            (this.shownRev = Math.max(this.shownRev, rev)),
            rev >= this.wantRev && this.unwant(),
            this.drainParked(),
            false)
          : under > 0
            ? false
            : undefined;
      }
      if (
        !partial &&
        !(
          loadDataOperationControlVerdictResult22 ??
          !(matchesCappedCount || matchesFolded2 || matchesComplete)
        )
      ) {
        this.emit({
          t: `state`,
          node: this.node,
          state: `readonly`,
          words: DataOperationControlStyles5,
        });
        return false;
      }
      if (under === 0) {
        this.lastRev = Math.max(this.lastRev, rev);
      }
      if (under === 0 && !partial && this.queue.length === 0) {
        this.unsettled = false;
      }
      if (under === 0 || !this.served) {
        if (!partial) {
          this.unholeAll();
        }
        this.comparing.clear();
      }
      this.shownRev = Math.max(this.shownRev, rev);
      let enabled28 =
        !this.served &&
        this.leftWords.length > 0 &&
        ([this.inflight, ...this.queue].some(
          (item2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item2?.replayed,
        ) ||
          this.wordsBehind.size > 0);
      if (enabled28) {
        this.wordsOwed = true;
      }
      let filteredLeftWords: Dynamic =
        !this.served && !enabled28
          ? this.leftWords.filter(
              (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
                !leftWord.parked,
            )
          : [];
      let staged: Dynamic =
        filteredLeftWords.length > 0
          ? filteredLeftWords.map(resolveDataOperationControlBid)
          : undefined;
      if (filteredLeftWords.length > 0) {
        this.wordsOwed = false;
      }
      if (!enabled28 && !this.wordsOwed && !this.remountOwed) {
        this.leftWords = this.leftWords.map(
          (leftWord?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            leftWord.parked
              ? leftWord
              : {
                  ...leftWord,
                  parked: true,
                },
        );
      }
      this.served = true;
      if (!partial) {
        this.lastBlocks =
          matchesCappedCount ||
          matchesFolded2 ||
          matchesComplete ||
          (onFaces2?.blocks ?? []).some(
            (block?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              block.opaque,
          )
            ? null
            : (onFaces2?.blocks ?? null);
      }
      this.lastFace = null;
      this.picRev = Math.max(this.picRev, rev);
      let dataOperationControlAsOf: Dynamic =
        matchesSinceRev && !partial
          ? resolveDataOperationControlAsOf(options2)
          : undefined;
      if (dataOperationControlAsOf !== undefined) {
        this.pictureSeq = Math.max(this.pictureSeq, dataOperationControlAsOf);
      }
      if (enabled26 && this.commentsAsk === commentsAsk) {
        this.wantComments = false;
      }
      if (this.gaveUp) {
        this.emit({
          t: `state`,
          node: this.node,
          state: state(),
          landed: true,
        });
      }
      this.gaveUp = false;
      this.lookRev = null;
      this.joinTries = 0;
      if (
        loadDataOperationControlVerdictResult23 !== undefined &&
        loadDataOperationControlVerdictResult23 > rev
      ) {
        if (!this.commentsBarred) {
          this.wantComments = true;
          this.commentsAsk += 1;
        }
        if (honourOpsOnFeed()) {
          this.freshen();
        } else {
          this.rung = true;
        }
      }
      if (sinceRev === undefined || rev >= this.wantRev) {
        this.unwant();
      }
      if (sinceRev === undefined || rev >= this.wantForeign) {
        this.wantForeign = -1;
      }
      let honourOpsOnFeed2: Dynamic = honourOpsOnFeed() && this.gapOwed;
      let enabled29 =
        !honourOpsOnFeed() || this.gapClosedBy(rev, dataOperationControlAsOf);
      if (matchesSinceRev && !partial && under === 0 && enabled29) {
        this.groundTo(rev);
        this.behindGround = null;
        this.orderDiverged = false;
      }
      if (
        !partial &&
        helloImport(`picture`, {
          blocks: onFaces2?.blocks.length ?? 0,
          ...(typeof docJson == `string`
            ? {
                bodyChars: docJson.length,
              }
            : {}),
        })
      ) {
        resolveObservabilityBootNode(
          this.node,
          resolveDataOperationControlBlocks2(onFaces2),
        );
      }
      this.emit({
        t: `snapshot`,
        node: this.node,
        rev: rev,
        blocks: onFaces2?.blocks ?? [],
        docJson: onFaces2?.docJson ?? null,
        ...(typeof docJson == `string`
          ? {
              docXml: docJson,
            }
          : {}),
        ...(Array.isArray(record4.comments)
          ? {
              comments: record4.comments,
            }
          : {}),
        ...(onFaces2?.anchors
          ? {
              anchors: onFaces2.anchors,
            }
          : partial || Array.isArray(record4.comments)
            ? {}
            : {
                anchors: [],
              }),
        ...(under > 0
          ? {
              under: under,
            }
          : {}),
        ...(partial
          ? {
              partial: partial,
            }
          : {}),
        ...(honourOpsOnFeed2 && matchesSinceRev && !partial
          ? {
              gap: true,
            }
          : {}),
        ...(staged
          ? {
              staged: staged,
            }
          : {}),
      });
      if (!partial) {
        this.handedRevs.clear();
        if (under === 0) {
          this.bornBehind.clear();
        }
      }
      if (honourOpsOnFeed()) {
        if (enabled29 && rev >= this.roomRev) {
          this.rung = this.rungWhole = false;
        }
        this.readingWhole = false;
        if (!partial) {
          this.wholePicRev = Math.max(this.wholePicRev, rev);
        }
        this.drainTold(rev);
      } else {
        this.drainParked();
      }
      return false;
    }
    handedRevs: Dynamic = new (Map as Dynamic)();
    bornBehind: Dynamic = new (Map as Dynamic)();
    deltaBlocks(
      dataOperationControlVerdict2?: Dynamic,
      rev?: Dynamic,
      under?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let loadDataOperationControlVerdictResult22: Dynamic;
      let behind: Dynamic = new (Set as Dynamic)();
      try {
        loadDataOperationControlVerdictResult22 = filterEditorExtensionsFilter(
          dataOperationControlVerdict2,
        );
      } catch {
        return {
          handed: 0,
          leftBehind: true,
          behind: behind,
        };
      }
      let loadDataOperationControlVerdictHandler30 = (
        dataOperationControlVerdict3?: unknown,
        ..._extraArguments: unknown[]
      ) => typeof dataOperationControlVerdict3 != `string`;
      let uniqueItems7: Dynamic = new (Set as Dynamic)([
        `gap`,
        `gone`,
        `hit`,
        `hits`,
      ]);
      let uniqueItems8: Dynamic = new (Set as Dynamic)([
        `ul`,
        `ol`,
        `list`,
        `bulletList`,
        `orderedList`,
        `taskList`,
      ]);
      let uniqueItems9: Dynamic = new (Set as Dynamic)();
      for (let loadDataOperationControlVerdictResult23 of (this.inflight
        ? [this.inflight, ...this.queue]
        : this.queue) as Dynamic)
        for (let loadDataOperationControlVerdictResult24 of (loadDataOperationControlVerdictResult23.homes ??
          []) as Dynamic)
          uniqueItems9.add(loadDataOperationControlVerdictResult24);
      let helloDImport2: Dynamic = (
        node?: Dynamic,
        options: Dynamic = new (Set as Dynamic)(),
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (node.attrs.id) {
          options.add(node.attrs.id);
        }
        for (let loadDataOperationControlVerdictResult23 of node.children as Dynamic)
          if (
            loadDataOperationControlVerdictHandler30(
              loadDataOperationControlVerdictResult23,
            ) &&
            !uniqueItems7.has(loadDataOperationControlVerdictResult23.name)
          ) {
            helloDImport2(loadDataOperationControlVerdictResult23, options);
          }
        return options;
      };
      let loadDataOperationControlVerdictHandler31: Dynamic = (
        node?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        node.children.some(
          (children?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            loadDataOperationControlVerdictHandler30(children) &&
            (resolveEditorExtensionsBlock(children) === `block` ||
              loadDataOperationControlVerdictHandler31(children)),
        );
      let loadDataOperationControlVerdictHandler32: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        this.wrote.some(
          (wrote?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            wrote.ids.has(dataOperationControlVerdict3) &&
            wrote.lo <= options &&
            options <= wrote.hi,
        );
      let handed: Dynamic = 0;
      let leftBehind = false;
      let since = Number(
        loadDataOperationControlVerdictResult22.attrs.sinceRev,
      );
      let items3: Dynamic = [];
      let isFinite4 = (
        dataOperationControlVerdict3?: Dynamic,
        options?: Dynamic,
        context: Dynamic = items3.length,
        ..._extraArguments: unknown[]
      ): undefined => {
        let editorExtensionsBlocks: Dynamic = dataOperationControlVerdict3
          ? resolveEditorExtensionsBlocks({
              name: loadDataOperationControlVerdictResult22.name,
              attrs: {
                ...loadDataOperationControlVerdictResult22.attrs,
                complete: `1`,
              },
              children: [dataOperationControlVerdict3],
            })
          : null;
        handed += 1;
        items3.splice(context, 0, {
          t: `snapshot`,
          node: this.node,
          rev: rev,
          blocks: editorExtensionsBlocks?.blocks ?? [],
          docJson: editorExtensionsBlocks
            ? editorExtensionsBlocks.docJson
            : null,
          partial: true,
          delta: true,
          whole: false,
          ...(Number.isFinite(since)
            ? {
                since: since,
              }
            : {}),
          ...(under > 0
            ? {
                under: under,
              }
            : {}),
          ...options,
        });
      };
      let uniqueItems10: Dynamic = new (Set as Dynamic)();
      let uniqueItems11: Dynamic = new (Set as Dynamic)();
      let helloRImport2 = (
        node?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        for (let loadDataOperationControlVerdictResult23 of node.children as Dynamic)
          if (
            loadDataOperationControlVerdictHandler30(
              loadDataOperationControlVerdictResult23,
            )
          ) {
            if (loadDataOperationControlVerdictResult23.name === `gone`) {
              if (loadDataOperationControlVerdictResult23.attrs.id) {
                uniqueItems11.add(
                  loadDataOperationControlVerdictResult23.attrs.id,
                );
              }
            } else {
              if (
                !uniqueItems7.has(loadDataOperationControlVerdictResult23.name)
              ) {
                if (loadDataOperationControlVerdictResult23.attrs.id) {
                  uniqueItems10.add(
                    loadDataOperationControlVerdictResult23.attrs.id,
                  );
                }
                helloRImport2(loadDataOperationControlVerdictResult23);
              }
            }
          }
      };
      helloRImport2(loadDataOperationControlVerdictResult22);
      let uniqueItems12: Dynamic = new (Set as Dynamic)(
        [...uniqueItems11].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            uniqueItems10.has(item),
        ),
      );
      let uniqueItems13: Dynamic = new (Set as Dynamic)(
        [...uniqueItems11].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            !uniqueItems10.has(item),
        ),
      );
      let matchesUniqueItemsCount = uniqueItems13.size > 0;
      let lookup3: Dynamic = new (Map as Dynamic)();
      let helloXImport2: Dynamic = (
        node?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let count10: Dynamic = 0;
        for (let loadDataOperationControlVerdictResult23 of node.children as Dynamic)
          if (
            loadDataOperationControlVerdictHandler30(
              loadDataOperationControlVerdictResult23,
            )
          ) {
            if (loadDataOperationControlVerdictResult23.name === `gone`) {
              count10 +=
                loadDataOperationControlVerdictResult23.attrs.id &&
                uniqueItems13.has(
                  loadDataOperationControlVerdictResult23.attrs.id,
                )
                  ? 1
                  : 0;
            } else {
              if (
                !uniqueItems7.has(loadDataOperationControlVerdictResult23.name)
              ) {
                count10 += helloXImport2(
                  loadDataOperationControlVerdictResult23,
                );
              }
            }
          }
        if (node.attrs.id) {
          lookup3.set(node.attrs.id, count10);
        }
        return count10;
      };
      if (matchesUniqueItemsCount) {
        helloXImport2(loadDataOperationControlVerdictResult22);
      }
      let findLastIndex = (..._extraArguments: unknown[]): undefined => {
        let findLastIndex2: Dynamic = items3.findLastIndex(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            dataOperationControlVerdict3.t === `snapshot` &&
            !dataOperationControlVerdict3.compare,
        );
        items3.forEach(
          (
            item?: Dynamic,
            index5?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            this.emit(
              item.t === `snapshot` && index5 < findLastIndex2
                ? {
                    ...item,
                    more: true,
                  }
                : item,
            ),
        );
      };
      let lookup4: Dynamic = new (Map as Dynamic)();
      let lookup5: Dynamic = new (Map as Dynamic)();
      let lookup6: Dynamic = new (Map as Dynamic)();
      let isFinite5: Dynamic = (
        node?: Dynamic,
        parent?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let enabled26 = false;
        let after: Dynamic = null;
        let index5: Dynamic = 0;
        let enabled27 = true;
        let items4: Dynamic = [];
        for (let node2 of node.children as Dynamic) {
          if (!loadDataOperationControlVerdictHandler30(node2)) continue;
          if (node2.name === `gone`) {
            let block2: Dynamic = node2.attrs.id;
            if (block2 && uniqueItems12.has(block2)) {
              enabled26 = true;
              continue;
            }
            if (block2 && !uniqueItems9.has(block2)) {
              isFinite4(null, {
                block: block2,
                gone: true,
                blockRev: rev,
                parent: parent,
              });
              items4.push(items3[items3.length - 1]);
            } else {
              if (block2) {
                leftBehind = true;
                behind.add(block2);
              }
            }
            if (block2) {
              enabled26 = true;
            }
            continue;
          }
          if (node2.name === `gap`) {
            let last: Dynamic = node2.attrs.last;
            after =
              typeof last == `string` && last !== `` && !last.startsWith(`.`)
                ? last
                : undefined;
            let number2 = Number(node2.attrs.blocks);
            if (Number.isFinite(number2)) {
              index5 += number2;
            } else {
              enabled27 = false;
            }
            continue;
          }
          if (uniqueItems7.has(node2.name)) continue;
          let block: Dynamic = node2.attrs.id ?? null;
          let record4: Dynamic =
            after === undefined
              ? enabled27
                ? {
                    index: index5,
                    parent: parent,
                  }
                : {}
              : {
                  after: after,
                  parent: parent,
                };
          index5 += 1;
          if (block !== null && !resolveEditorExtensionsSome3(node2)) {
            let number2 = Number(node2.attrs.rev);
            let blockRev: Dynamic = Number.isFinite(number2) ? number2 : rev;
            let helloDImport3: Dynamic = helloDImport2(node2);
            if (
              [...helloDImport3].some(
                (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  uniqueItems9.has(item),
              )
            ) {
              if (!loadDataOperationControlVerdictHandler32(block, blockRev)) {
                leftBehind = true;
              }
              if ((this.comparedRevs.get(block) ?? -1) < blockRev) {
                this.comparedRevs.set(block, blockRev);
                if (this.comparedRevs.size > 512) {
                  this.comparedRevs.delete(
                    this.comparedRevs.keys().next().value,
                  );
                }
                this.comparing.set(
                  block,
                  [...helloDImport3].filter(
                    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      item !== block && uniqueItems9.has(item),
                  ),
                );
                isFinite4(node2, {
                  block: block,
                  blockRev: blockRev,
                  compare: true,
                });
              }
            } else if (
              !((this.handedRevs.get(block) ?? -1) >= blockRev) &&
              !(
                under > 0 &&
                this.heldWords === 0 &&
                loadDataOperationControlVerdictHandler32(block, blockRev) &&
                this.handedRevs.get(block) === undefined &&
                blockRev <= this.ackedRev
              )
            ) {
              let record5: Dynamic = uniqueItems12.has(block)
                ? {
                    ...record4,
                    moved: true,
                  }
                : record4;
              if (!(`after` in record4) && !(`index` in record4)) {
                leftBehind = true;
                behind.add(block);
              } else {
                this.behindPlace.set(block, record5);
                let blockCoolEntry: Dynamic = this.blockCool.get(block);
                if (blockCoolEntry?.stuck) {
                  blockCoolEntry.stuck = false;
                }
              }
              isFinite4(node2, {
                block: block,
                blockRev: blockRev,
                ...record5,
              });
              this.handedRevs.set(block, blockRev);
              if (this.handedRevs.size > 512) {
                this.handedRevs.delete(this.handedRevs.keys().next().value);
              }
              if (
                !loadDataOperationControlVerdictHandler31(node2) &&
                Number.isFinite(number2) &&
                resolveEditorExtensionsSess(block)?.sess !==
                  dataOperationControlVerdict.session.get()?.label
              ) {
                this.bornBehind.set(block, number2);
                if (this.bornBehind.size > 512) {
                  this.bornBehind.delete(this.bornBehind.keys().next().value);
                }
              }
            }
            enabled26 = true;
            after = block;
            continue;
          }
          if (block === null) leftBehind = true;
          else {
            let itemsCount: Dynamic = items3.length;
            lookup6.set(node2, node);
            let isFinite6: Dynamic = isFinite5(node2, block);
            let amount = `after` in record4 || `index` in record4;
            let hasBlock: Dynamic = uniqueItems12.has(block);
            let enabled28 =
              !hasBlock &&
              matchesUniqueItemsCount &&
              uniqueItems13.size > (lookup3.get(block) ?? 0);
            let enabled29: Dynamic =
              !hasBlock &&
              !enabled28 &&
              uniqueItems11.size > 0 &&
              node2.children.some(
                (children?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  loadDataOperationControlVerdictHandler30(children) &&
                  !uniqueItems7.has(children.name) &&
                  !!children.attrs.id &&
                  uniqueItems12.has(children.attrs.id),
              );
            if (amount && (hasBlock || enabled28 || enabled29)) {
              isFinite4(
                null,
                {
                  block: block,
                  moved: true,
                  ...(hasBlock
                    ? {}
                    : {
                        orphan: true,
                      }),
                  shell: filterEditorExtensionsGap(
                    node2,
                    uniqueItems8.has(node.name) ? node : null,
                  ),
                  blockRev: rev,
                  ...record4,
                },
                itemsCount,
              );
            }
            if (amount) {
              this.behindPlace.set(
                block,
                hasBlock
                  ? {
                      ...record4,
                      moved: true,
                    }
                  : record4,
              );
            }
            let number2 = Number(node2.attrs.rev);
            if (
              isFinite6 ||
              (hasBlock && amount) ||
              (enabled28 &&
                amount &&
                !(
                  Number.isFinite(number2) &&
                  (!Number.isFinite(since) || number2 > since)
                ))
            ) {
              enabled26 = true;
            } else {
              leftBehind = true;
              behind.add(block);
            }
          }
          after = block ?? undefined;
        }
        if (enabled27)
          for (let loadDataOperationControlVerdictResult23 of items4 as Dynamic)
            loadDataOperationControlVerdictResult23.siblings = index5;
        if (enabled27) {
          lookup4.set(node, index5);
        }
        if (items4.length > 0) {
          lookup5.set(node, items4);
        }
        return enabled26;
      };
      isFinite5(loadDataOperationControlVerdictResult22, null);
      if (
        Number.isFinite(since) &&
        resolveEditorExtensionsFrom6(loadDataOperationControlVerdictResult22)
          .length === 0
      ) {
        for (let [block, rev2] of this.bornBehind as Dynamic)
          if (
            (rev2 <= since && this.bornBehind.delete(block),
            !(
              rev2 <= since ||
              rev2 > rev ||
              uniqueItems10.has(block) ||
              uniqueItems11.has(block)
            ))
          ) {
            if (uniqueItems9.has(block)) {
              leftBehind = true;
              behind.add(block);
              continue;
            }
            reportOperationEvent(`delta.died_behind`, {
              block: block,
              rev: rev2,
              since: since,
              at: rev,
            });
            isFinite4(null, {
              block: block,
              gone: true,
              blockRev: rev,
            });
            this.bornBehind.delete(block);
            this.handedRevs.delete(block);
            this.holed.delete(block);
            this.declinedHoles.delete(block);
            this.uncoolBlock(block);
          }
      }
      for (let [
        loadDataOperationControlVerdictResult23,
        loadDataOperationControlVerdictResult24,
      ] of lookup5 as Dynamic) {
        let lookupEntry: Dynamic = lookup6.get(
          loadDataOperationControlVerdictResult23,
        );
        if (!(!lookupEntry || !lookup4.has(lookupEntry)))
          for (let loadDataOperationControlVerdictResult25 of loadDataOperationControlVerdictResult24 as Dynamic)
            Object.assign(loadDataOperationControlVerdictResult25, {
              upParent:
                lookupEntry === loadDataOperationControlVerdictResult22
                  ? null
                  : (lookupEntry.attrs.id ?? null),
              upSiblings: lookup4.get(lookupEntry),
            });
      }
      findLastIndex();
      if (!leftBehind) {
        this.lastRev = Math.max(this.lastRev, rev);
        this.shownRev = Math.max(this.shownRev, rev);
        this.drainParked();
      }
      return {
        handed: handed,
        leftBehind: leftBehind,
        behind: behind,
      };
    }
    holds: Dynamic = new (Map as Dynamic)();
    hold(
      opId?: Dynamic,
      items3?: Dynamic,
      context: Dynamic = [],
      dependencies: Dynamic = [],
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || this.dead || items3.length === 0) return;
      let predicted: Dynamic = collectDataOperationControlSome(items3, context);
      let dataOperationControlVerdictHandler: Dynamic =
        loadDataOperationControlVerdictHandler28();
      for (let loadDataOperationControlVerdictResult22 of predicted.flat() as Dynamic)
        dataOperationControlVerdictHandler.delete(
          loadDataOperationControlVerdictResult22,
        );
      let ops: Dynamic =
        dataOperationControlVerdictHandler.size > 0
          ? getDataOperationControlSize(
              items3,
              dataOperationControlVerdictHandler,
            )
          : items3;
      let homes: Dynamic =
        dataOperationControlVerdictHandler.size > 0
          ? dependencies.map(
              (dependency?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                dataOperationControlVerdictHandler.get(dependency) ??
                dependency,
            )
          : dependencies;
      let record4: Dynamic = {
        opId: opId,
        ops: ops,
        ...(predicted.length > 0
          ? {
              predicted: predicted,
            }
          : {}),
        ...(homes.length > 0
          ? {
              homes: homes,
            }
          : {}),
        held: true,
        life: life2,
        ...(this.holds.has(opId)
          ? resolveDataOperationControlAuthor(this.holds.get(opId))
          : author()),
      };
      this.putHold(record4);
    }
    putHold(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let { opId: dataOperationControlVerdict3 }: Dynamic =
        dataOperationControlVerdict2;
      this.holds.set(
        dataOperationControlVerdict3,
        dataOperationControlVerdict2,
      );
      try {
        dataOperationControlVerdict.wal.stage?.(
          this.node,
          dataOperationControlVerdict2,
        );
      } catch {}
      this.ready.then((..._extraArguments: unknown[]): Dynamic => {
        if (
          this.holds.get(dataOperationControlVerdict3) !==
          dataOperationControlVerdict2
        )
          return;
        let rewrite: Dynamic = dataOperationControlVerdict.wal.rewrite
          ? dataOperationControlVerdict.wal.rewrite(
              this.node,
              dataOperationControlVerdict2,
            )
          : dataOperationControlVerdict.wal
              .trim(this.node, dataOperationControlVerdict3)
              .then(
                (..._extraArguments: unknown[]): Dynamic =>
                  dataOperationControlVerdict.wal.append(
                    this.node,
                    dataOperationControlVerdict2,
                  ),
              );
        return Promise.race([
          rewrite.catch(
            (..._extraArguments: unknown[]): undefined => undefined,
          ),
          loadDataOperationControlVerdictHandler(400),
        ]);
      });
    }
    unhold(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.holds.delete(dataOperationControlVerdict2)) {
        dataOperationControlVerdict.wal
          .trim(this.node, dataOperationControlVerdict2)
          .catch((..._extraArguments: unknown[]): undefined => undefined);
      }
    }
    rekeyHolds(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let objectValues: Dynamic = Array.from<Dynamic>(this.holds.values());
      for (let loadDataOperationControlVerdictResult22 of objectValues as Dynamic) {
        let ops: Dynamic = collectDataOperationControlContent(
          loadDataOperationControlVerdictResult22.ops,
          dataOperationControlVerdict2,
        );
        if (
          JSON.stringify(ops) !==
          JSON.stringify(loadDataOperationControlVerdictResult22.ops)
        ) {
          this.putHold({
            ...loadDataOperationControlVerdictResult22,
            ops: ops,
            ...(loadDataOperationControlVerdictResult22.predicted
              ? {
                  predicted: collectDataOperationControlContent(
                    loadDataOperationControlVerdictResult22.predicted,
                    dataOperationControlVerdict2,
                  ),
                }
              : {}),
            ...(loadDataOperationControlVerdictResult22.homes
              ? {
                  homes: loadDataOperationControlVerdictResult22.homes.map(
                    dataOperationControlVerdict2,
                  ),
                }
              : {}),
          });
        }
      }
    }
    words(ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (typeof ask?.bid != `string` || typeof ask.text != `string`) return;
      if (ask.text !== `` && ask.tray !== true) {
        this.heldWordsRefresh();
      }
      let afterId: Dynamic =
        typeof ask.afterId == `string` ? ask.afterId : null;
      if (ask.tray === true && ask.text !== ``) {
        for (let [loadDataOperationControlVerdictResult22, ask2] of this
          .myWords as Dynamic)
          if (ask2.bid === ask.bid) {
            this.myWords.delete(loadDataOperationControlVerdictResult22);
          }
        return this.trayOwn(
          ask.bid,
          afterId,
          ask.text,
          true,
          ask.quiet === true,
          resolvePlatformKeyboardAndSaveStatusKept(ask.cut),
          author(),
        );
      }
      if (ask.owed === true) {
        let leftWord: Dynamic = this.leftWords.find(
          (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
            ask2.bid === ask.bid && (ask2.afterId ?? null) === afterId,
        );
        if (leftWord) {
          [leftWord.parked, leftWord.withEditor] = [true, true];
        }
        if (ask.text !== `` && !leftWord) {
          this.leftWords.push({
            bid: ask.bid,
            afterId: afterId,
            text: ask.text,
            ...(ask.real === true
              ? {
                  real: true,
                }
              : {}),
            parked: true,
            withEditor: true,
          });
          try {
            this.stagePut({
              bid: ask.bid,
              afterId: afterId,
              text: ask.text,
              ...(ask.real === true
                ? {
                    real: true,
                  }
                : {}),
            });
          } catch {}
        }
        return;
      }
      let only = ask.text === `` && ask.only === true;
      if (only) {
        let some: Dynamic = this.leftWords.some(
          (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
            ask3.bid === ask.bid && (ask3.afterId ?? null) === afterId,
        );
        let filteredLeftWords: Dynamic = this.leftWords.filter(
          (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
            ask3.bid === ask.bid,
        );
        let ask2: Dynamic = some
          ? {
              bid: ask.bid,
              afterId: afterId,
            }
          : filteredLeftWords.length === 1
            ? {
                bid: ask.bid,
                afterId: filteredLeftWords[0].afterId ?? null,
              }
            : {
                bid: ask.bid,
                afterId: afterId,
              };
        let some2: Dynamic = this.leftWords.some(
          (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
            ask3.tray === true &&
            ask3.bid === ask2.bid &&
            (ask3.afterId ?? null) === ask2.afterId,
        );
        this.leftWords = this.leftWords.filter(
          (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
            ask3.bid !== ask2.bid || (ask3.afterId ?? null) !== ask2.afterId,
        );
        if (some2) {
          emit7();
        }
        if (ask2.afterId !== afterId)
          try {
            dataOperationControlVerdict.wal.stageWords?.(this.node, {
              bid: ask.bid,
              afterId: ask2.afterId,
              text: ``,
              only: true,
            });
          } catch {}
      }
      let proposedNow: Dynamic = this.proposedNow(false);
      let real =
        !proposedNow.has(ask.bid) &&
        (afterId === null || !proposedNow.has(afterId));
      if (ask.text !== ``) {
        let dataOperationControlValue30 = resolveDataOperationControlValue30(
          ask.bid,
          afterId,
        );
        this.myWords.set(dataOperationControlValue30, {
          bid: ask.bid,
          afterId: afterId,
          text: ask.text,
          ...(real
            ? {
                real: real,
              }
            : {}),
          ...(this.myWords.has(dataOperationControlValue30)
            ? resolveDataOperationControlAuthor(
                this.myWords.get(dataOperationControlValue30),
              )
            : author()),
          since:
            this.myWords.get(dataOperationControlValue30)?.since ?? ++index,
        });
      } else
        for (let [loadDataOperationControlVerdictResult22, ask2] of this
          .myWords as Dynamic)
          if (
            only
              ? loadDataOperationControlVerdictResult22 ===
                resolveDataOperationControlValue30(ask.bid, afterId)
              : ask2.bid === ask.bid
          ) {
            this.myWords.delete(loadDataOperationControlVerdictResult22);
          }
      try {
        this.stagePut({
          bid: ask.bid,
          afterId: afterId,
          text: ask.text,
          ...(only
            ? {
                only: only,
              }
            : {}),
        });
        if (ask.text === `` && !only)
          for (let ask2 of this.leftWords as Dynamic)
            if (ask2.bid === ask.bid) {
              this.stagePut(ask2);
            }
      } catch {}
    }
    proposedNow(
      dataOperationControlVerdict2: Dynamic = true,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let uniqueItems7: Dynamic = new (Set as Dynamic)();
      for (let loadDataOperationControlVerdictResult22 of [
        ...this.handed,
        ...(this.inflight ? [this.inflight] : []),
        ...this.queue,
      ] as Dynamic)
        if (
          dataOperationControlVerdict2 ||
          !loadDataOperationControlVerdictResult22.replayed
        )
          for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22.predicted as Dynamic)
            for (let loadDataOperationControlVerdictResult24 of loadDataOperationControlVerdictResult23 as Dynamic)
              uniqueItems7.add(loadDataOperationControlVerdictResult24);
      return uniqueItems7;
    }
    handed: Dynamic = [];
    myWords: Dynamic = new (Map as Dynamic)();
    lastFace: Dynamic = null;
    refreshFace(..._extraArguments: unknown[]): undefined {
      if (!this.lastFace || enabled || this.dead) return;
      let staged: Dynamic = this.leftWords.map(resolveDataOperationControlBid);
      this.emit({
        ...this.lastFace,
        staged: staged,
      });
    }
    stagePut(ask?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (ask.text === ``)
        return void dataOperationControlVerdict.wal.stageWords?.(
          this.node,
          ask,
        );
      let dataOperationControlValue30 = resolveDataOperationControlValue30(
        ask.bid,
        ask.afterId ?? null,
      );
      let leftWord: Dynamic = this.leftWords.find(
        (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
          ask2.bid === ask.bid &&
          (ask2.afterId ?? null) === (ask.afterId ?? null),
      );
      let myWordEntry: Dynamic = this.myWords.get(dataOperationControlValue30);
      let text: Dynamic =
        leftWord || myWordEntry
          ? `${leftWord?.text ?? ``}${myWordEntry?.text ?? ``}`
          : ask.text;
      let real: Dynamic =
        (leftWord?.real ?? false) ||
        (myWordEntry?.real ?? false) ||
        ask.real === true;
      let tray: Dynamic =
        ask.tray === true || ((leftWord?.tray ?? false) && !myWordEntry);
      dataOperationControlVerdict.wal.stageWords?.(this.node, {
        bid: ask.bid,
        afterId: ask.afterId ?? null,
        text: text,
        ...(real
          ? {
              real: real,
            }
          : {}),
        ...(tray
          ? {
              tray: tray,
            }
          : {}),
        ...resolveDataOperationControlAuthor(leftWord ?? myWordEntry ?? ask),
      });
    }
    async joinPages(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let Number2: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        [...dataOperationControlVerdict3, Number(options2.attrs.rev)].find(
          (item?: unknown, ..._extraArguments: unknown[]) =>
            typeof item == `number` && Number.isInteger(item),
        );
      let test3: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationControlVerdict3.complete === false ||
        dataOperationControlVerdict3.complete === 0 ||
        /^<doc\b[^>]*\scomplete="(?:0|false)"/.test(options2);
      let [doc, setDoc, doc2]: Dynamic = [
        dataOperationControlVerdict2,
        options,
        context,
      ];
      let lookup3: Dynamic = new (Map as Dynamic)();
      let loadDataOperationControlVerdictHandler30 = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          dataOperationControlVerdict3 &&
          lookup3.set(
            dataOperationControlVerdict3.parentId ?? ``,
            dataOperationControlVerdict3,
          )
        );
      loadDataOperationControlVerdictHandler30(dependencies);
      let comments: Dynamic;
      let index5 = 0;
      let enabled26 = false;
      let pinned = false;
      let hop: Dynamic = 0;
      for (let restarts = 0; ; restarts++) {
        if (!/<gap\b/.test(doc) && !doc2) {
          if (restarts === 0)
            return {
              doc: doc,
              complete: undefined,
            };
          let rev: Dynamic =
            setDoc.find(
              (setDoc2?: unknown, ..._extraArguments: unknown[]) =>
                typeof setDoc2 == `number` && Number.isInteger(setDoc2),
            ) ?? Number(/^<doc\b[^>]*\srev="(\d+)"/.exec(doc)?.[1]);
          return {
            doc: doc,
            complete: true,
            ...(Number.isInteger(rev)
              ? {
                  rev: rev,
                }
              : {}),
            ...(comments
              ? {
                  comments: comments,
                }
              : {}),
          };
        }
        let loadDataOperationControlVerdictResult22: Dynamic;
        try {
          loadDataOperationControlVerdictResult22 =
            filterEditorExtensionsFilter(doc);
        } catch {
          return restarts === 0
            ? {
                doc: doc,
                complete: undefined,
              }
            : {
                halt: DataOperationControlStyles8,
              };
        }
        let atRev: Dynamic = Number2(
          setDoc,
          loadDataOperationControlVerdictResult22,
        );
        let loadDataOperationControlVerdictHandler31: Dynamic = (
          ..._extraArguments: unknown[]
        ): Dynamic =>
          !enabled26 &&
          loadDataOperationControlVerdictHandler6() &&
          atRev !== undefined &&
          atRev >= 1
            ? {
                atRev: atRev,
              }
            : {};
        let behind = -1;
        if (
          !(
            resolveEditorExtensionsFrom6(
              loadDataOperationControlVerdictResult22,
            ).length > 0
          )
        )
          return {
            halt: DataOperationControlStyles6,
            part: doc,
            missing: resolveDataOperationControlReduce(
              loadDataOperationControlVerdictResult22,
            ),
            ...(atRev === undefined
              ? {}
              : {
                  rev: atRev,
                }),
          };
        let enabled27 = false;
        let reduce: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
          halt: DataOperationControlStyles8,
          part: resolveEditorExtensionsEntries(
            loadDataOperationControlVerdictResult22,
          ),
          missing:
            resolveEditorExtensionsFrom6(
              loadDataOperationControlVerdictResult22,
            ).reduce(
              (
                accumulator?: Dynamic,
                editorExtensionsFrom6?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => accumulator + (editorExtensionsFrom6.blocks ?? 0),
              0,
            ) +
            resolveDataOperationControlReduce(
              loadDataOperationControlVerdictResult22,
            ),
          ...(atRev === undefined
            ? {}
            : {
                rev: atRev,
              }),
        });
        let resolveEditorExtensionsFrom62: Dynamic = (
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let editorExtensionsFrom6Item: Dynamic = resolveEditorExtensionsFrom6(
            loadDataOperationControlVerdictResult22,
          )[0];
          if (editorExtensionsFrom6Item) return editorExtensionsFrom6Item;
          for (let [
            loadDataOperationControlVerdictResult23,
            loadDataOperationControlVerdictResult24,
          ] of lookup3 as Dynamic) {
            let loadDataOperationControlVerdictResult25: Dynamic =
              loadDataOperationControlVerdictResult23 === ``
                ? loadDataOperationControlVerdictResult22
                : resolveDataOperationControlChildren(
                    loadDataOperationControlVerdictResult22,
                    loadDataOperationControlVerdictResult23,
                  );
            if (loadDataOperationControlVerdictResult25) {
              loadDataOperationControlVerdictResult25.children.push({
                name: `gap`,
                attrs: {
                  cap: `1`,
                  from: loadDataOperationControlVerdictResult24.from,
                },
                children: [],
              });
              return resolveEditorExtensionsFrom6(
                loadDataOperationControlVerdictResult22,
              )[0];
            }
          }
        };
        for (
          let editorExtensionsFrom6: Dynamic = resolveEditorExtensionsFrom62();
          editorExtensionsFrom6;
          editorExtensionsFrom6 = resolveEditorExtensionsFrom62()
        ) {
          let lookupEntry: Dynamic = lookup3.get(
            editorExtensionsFrom6.parentId ?? ``,
          );
          if (lookupEntry) {
            lookup3.delete(editorExtensionsFrom6.parentId ?? ``);
          }
          let from: Dynamic = editorExtensionsFrom6.from;
          if (
            lookupEntry &&
            lookupEntry.from !== editorExtensionsFrom6.from &&
            resolveDataOperationControlParentId(
              loadDataOperationControlVerdictResult22,
              lookupEntry,
            )
          ) {
            editorExtensionsFrom6.from = lookupEntry.from;
          }
          let from2: Dynamic = editorExtensionsFrom6.from;
          if (from2 === null) {
            let missing: Dynamic = resolveEditorExtensionsFrom6(
              loadDataOperationControlVerdictResult22,
            ).reduce(
              (
                accumulator?: Dynamic,
                editorExtensionsFrom62?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => accumulator + (editorExtensionsFrom62.blocks ?? 0),
              0,
            );
            return {
              halt: DataOperationControlStyles6,
              part: resolveEditorExtensionsEntries(
                loadDataOperationControlVerdictResult22,
              ),
              missing: missing,
              ...(atRev === undefined
                ? {}
                : {
                    rev: atRev,
                  }),
            };
          }
          if (++index5 > 64) return reduce();
          let loadDataOperationControlVerdictHandler32: Dynamic = (
            from3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            kind: `view`,
            from: from3,
            ...(editorExtensionsFrom6.parentId === null
              ? {}
              : {
                  parentId: editorExtensionsFrom6.parentId,
                }),
          });
          let pagedRead2: Dynamic = async (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<Dynamic> => {
            hop += 1;
            let dataOperationControlVerdictHandler: Dynamic =
              loadDataOperationControlVerdictHandler31();
            let pinned3 = (pinned =
              `atRev` in dataOperationControlVerdictHandler);
            let {
              atRev: dataOperationControlVerdict4,
              atRevCold: dataOperationControlVerdict5,
              ...dataOperationControlVerdict6
            }: Dynamic = dataOperationControlVerdict3;
            let page: Dynamic = await this.pagedRead(
              pinned3
                ? {
                    ...dataOperationControlVerdict6,
                    ...dataOperationControlVerdictHandler,
                    ...DataOperationControlAtRevCold,
                  }
                : dataOperationControlVerdict6,
            );
            if (!page) return null;
            let data2: Dynamic = isPlainRecord(page.data) ? page.data : {};
            try {
              return {
                page: page,
                pd: data2,
                pinned: pinned3,
                cont:
                  page.verdict === `allow` && typeof data2.doc == `string`
                    ? filterEditorExtensionsFilter(data2.doc)
                    : null,
              };
            } catch {
              return {
                page: page,
                pd: data2,
                cont: null,
                pinned: pinned3,
              };
            }
          };
          let record4: Dynamic =
            lookupEntry && lookupEntry.from === from2
              ? {
                  kind: `view`,
                  ...lookupEntry.raw,
                }
              : loadDataOperationControlVerdictHandler32(from2);
          let pagedRead3: Dynamic = await pagedRead2(record4);
          if (!pagedRead3) return null;
          if (
            !pagedRead3.cont &&
            pagedRead3.pinned &&
            isDataOperationControlDeny4(pagedRead3.page)
          ) {
            enabled26 = true;
            reportOperationEvent(`read.join.unpinned`, {
              rev: atRev ?? -1,
              hop: hop,
              reason: String(pagedRead3.page.reason ?? ``),
            });
            if (++index5 > 64) return reduce();
            pagedRead3 = await pagedRead2(record4);
            if (!pagedRead3) return null;
          }
          if (
            !pagedRead3.cont &&
            lookupEntry &&
            lookupEntry.from === from2 &&
            from &&
            from !== from2
          ) {
            if (++index5 > 64) return reduce();
            resolveDataOperationControlParentId(
              loadDataOperationControlVerdictResult22,
              {
                ...lookupEntry,
                from: from,
              },
            );
            editorExtensionsFrom6.from = from;
            pagedRead3 = await pagedRead2(
              loadDataOperationControlVerdictHandler32(from),
            );
            if (!pagedRead3) return null;
          }
          let {
            page: pagedRead4,
            pd: pagedRead5,
            cont: pagedRead6,
          }: Dynamic = pagedRead3;
          let pinned2: Dynamic = pagedRead3.pinned;
          loadDataOperationControlVerdictHandler30(
            resolveDataOperationControlFrom(pagedRead5),
          );
          if (!pagedRead6) {
            if (
              pinned2 &&
              (isDataOperationControlDeny5(pagedRead4) ||
                isDataOperationControlDeny6(pagedRead4) ||
                pagedRead4.hung === true)
            ) {
              reportOperationEvent(`read.join.repin`, {
                rev: atRev ?? -1,
                hop: hop,
                restarts: restarts,
                why: isDataOperationControlDeny5(pagedRead4)
                  ? `range`
                  : isDataOperationControlDeny6(pagedRead4)
                    ? DataOperationControlAtRevCold2
                    : `hung`,
              });
              enabled27 = true;
              break;
            }
            return isDataOperationControlDeny3(pagedRead4)
              ? {
                  halt: DataOperationControlStyles6,
                  part: resolveEditorExtensionsEntries(
                    loadDataOperationControlVerdictResult22,
                  ),
                  missing:
                    resolveEditorExtensionsFrom6(
                      loadDataOperationControlVerdictResult22,
                    ).reduce(
                      (
                        accumulator?: Dynamic,
                        editorExtensionsFrom62?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        accumulator + (editorExtensionsFrom62.blocks ?? 0),
                      0,
                    ) +
                    resolveDataOperationControlReduce(
                      loadDataOperationControlVerdictResult22,
                    ),
                  ...(atRev === undefined
                    ? {}
                    : {
                        rev: atRev,
                      }),
                }
              : reduce();
          }
          if (Number2([pagedRead4.rev, pagedRead5.rev], pagedRead6) !== atRev) {
            enabled27 = true;
            break;
          }
          let number2 = Number(pagedRead5.latest);
          if (
            atRev !== undefined &&
            Number.isInteger(number2) &&
            number2 > atRev
          ) {
            behind = Math.max(behind, number2);
          }
          let max = Math.max(this.ackedRev, this.heardRev, this.lastRev);
          if (atRev !== undefined && max > atRev) {
            reportOperationEvent(`read.join.floor`, {
              rev: atRev,
              hop: hop,
              behind: behind,
              acked: Math.max(this.ackedRev, this.heardRev),
              lastRev: this.lastRev,
              pending: this.out(),
            });
            if (this.out() > 0)
              return {
                later: true,
              };
            enabled27 = true;
            break;
          }
          if (atRev !== undefined && honourOpsOnFeed() && this.gapRev > atRev) {
            reportOperationEvent(`read.join.gap`, {
              rev: atRev,
              hop: hop,
              gapRev: this.gapRev,
              restarts: restarts,
            });
            enabled27 = true;
            break;
          }
          if (
            !isEditorExtensionsFrom5(
              loadDataOperationControlVerdictResult22,
              editorExtensionsFrom6,
              pagedRead6,
            )
          )
            return reduce();
        }
        if (!enabled27)
          return lookup3.size > 0
            ? reduce()
            : resolveEditorExtensionsSome3(
                  loadDataOperationControlVerdictResult22,
                )
              ? {
                  halt: DataOperationControlStyles6,
                  part: resolveEditorExtensionsEntries(
                    loadDataOperationControlVerdictResult22,
                  ),
                  missing: resolveDataOperationControlReduce(
                    loadDataOperationControlVerdictResult22,
                  ),
                  ...(atRev === undefined
                    ? {}
                    : {
                        rev: atRev,
                      }),
                }
              : ((loadDataOperationControlVerdictResult22.attrs.complete = `1`),
                reportOperationEvent(`read.joined`, {
                  rev: atRev ?? -1,
                  hops: hop,
                  restarts: restarts,
                  pinned: pinned,
                  ...(behind > 0
                    ? {
                        behind: behind,
                      }
                    : {}),
                }),
                {
                  doc: resolveEditorExtensionsEntries(
                    loadDataOperationControlVerdictResult22,
                  ),
                  complete: true,
                  ...(atRev === undefined
                    ? {}
                    : {
                        rev: atRev,
                      }),
                  ...(comments
                    ? {
                        comments: comments,
                      }
                    : {}),
                  ...(behind > 0
                    ? {
                        behind: behind,
                      }
                    : {}),
                });
        reportOperationEvent(`read.join.restart`, {
          rev: atRev ?? -1,
          hops: hop,
          restarts: restarts,
          pinned: pinned,
        });
        if (restarts + 1 >= 3) return reduce();
        if (this.out() > 0)
          return {
            later: true,
          };
        let pagedRead: Dynamic = await this.pagedRead({
          kind: `view`,
          ...(this.commentsBarred
            ? {}
            : {
                comments: true,
              }),
        });
        if (!pagedRead) return null;
        if (isDataOperationControlDeny3(pagedRead)) {
          if (this.commentsBarred)
            return {
              halt: DataOperationControlStyles6,
              part: resolveEditorExtensionsEntries(
                loadDataOperationControlVerdictResult22,
              ),
              missing:
                resolveEditorExtensionsFrom6(
                  loadDataOperationControlVerdictResult22,
                ).reduce(
                  (
                    accumulator?: Dynamic,
                    editorExtensionsFrom6?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    accumulator + (editorExtensionsFrom6.blocks ?? 0),
                  0,
                ) +
                resolveDataOperationControlReduce(
                  loadDataOperationControlVerdictResult22,
                ),
              ...(atRev === undefined
                ? {}
                : {
                    rev: atRev,
                  }),
            };
          this.commentsTooLarge();
          pagedRead = await this.pagedRead({
            kind: `view`,
          });
          if (!pagedRead) return null;
          if (isDataOperationControlDeny3(pagedRead))
            return {
              halt: DataOperationControlStyles6,
              part: resolveEditorExtensionsEntries(
                loadDataOperationControlVerdictResult22,
              ),
              missing:
                resolveEditorExtensionsFrom6(
                  loadDataOperationControlVerdictResult22,
                ).reduce(
                  (
                    accumulator?: Dynamic,
                    editorExtensionsFrom6?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    accumulator + (editorExtensionsFrom6.blocks ?? 0),
                  0,
                ) +
                resolveDataOperationControlReduce(
                  loadDataOperationControlVerdictResult22,
                ),
              ...(atRev === undefined
                ? {}
                : {
                    rev: atRev,
                  }),
            };
        }
        let data: Dynamic = isPlainRecord(pagedRead.data) ? pagedRead.data : {};
        if (pagedRead.verdict !== `allow` || typeof data.doc != `string`)
          return reduce();
        [doc, setDoc, doc2] = [
          data.doc,
          [pagedRead.rev, data.rev],
          test3(data, data.doc),
        ];
        lookup3.clear();
        loadDataOperationControlVerdictHandler30(
          resolveDataOperationControlFrom(data),
        );
        if (Array.isArray(data.comments)) {
          comments = data.comments;
        }
      }
    }
    joinFailed(..._extraArguments: unknown[]) {
      this.joinTries += 1;
      if (this.joinTries < 6) return this.coolOff();
      this.halted = true;
      this.gaveUp = false;
      this.emit({
        t: `state`,
        node: this.node,
        state: `readonly`,
        words: DataOperationControlStyles5,
        halt: true,
        ...(this.lookRev === null
          ? {}
          : {
              shown: true,
            }),
      });
    }
    commentsBarred: Dynamic = false;
    commentsTooLarge(..._extraArguments: unknown[]): undefined {
      this.wantComments = false;
      if (!this.commentsBarred) {
        this.commentsBarred = true;
        reportOperationEvent(`read.commentsTooLarge`, {
          served: this.served,
        });
        console.warn(
          `opTransport: the comment thread list is too large for the room to send — the document is read without it from here on; the rail keeps what it has`,
        );
      }
    }
    haltTooLarge(
      whole?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let halted: Dynamic = this.halted;
      this.halted = true;
      this.gaveUp = false;
      this.owed = this.oweWhole = false;
      this.rung = this.rungWhole = false;
      let enabled26 = !this.served && this.lookRev !== null;
      if (!whole) {
        this.sinceHaltedAt = Math.max(
          this.sinceHaltedAt ?? -1,
          options ?? this.since() ?? this.lastRev,
        );
      }
      reportOperationEvent(`read.tooLarge`, {
        whole: whole,
        served: this.served,
        lastRev: this.lastRev,
        ...(this.sinceHaltedAt === null
          ? {}
          : {
              sinceHaltedAt: this.sinceHaltedAt,
            }),
      });
      if (!halted) {
        this.emit({
          t: `state`,
          node: this.node,
          state: `readonly`,
          words: this.served
            ? DataOperationControlStyles7
            : enabled26
              ? DataOperationControlStyles6
              : DataOperationControlStyles10,
          halt: true,
          ...(this.served || enabled26
            ? {
                shown: true,
              }
            : {}),
        });
      }
    }
    coolOff(..._extraArguments: unknown[]): undefined {
      this.cooling = true;
      this.coolTimer ??= dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.coolTimer = null;
          this.cooling = false;
          if (!enabled && !this.dead && !this.served) {
            this.read(undefined);
          }
        },
        dataOperationControlValue100003,
      );
    }
    send(
      opId?: Dynamic,
      ops?: Dynamic,
      textFrames?: Dynamic,
      dependencies: Dynamic = [],
      homes: Dynamic = [],
      argument?: Dynamic,
      argument2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let predicted: Dynamic = collectDataOperationControlSome(
        ops,
        dependencies,
      );
      this.heldWordsOff(`ops`);
      let record4: Dynamic = {
        opId: opId,
        ops: ops,
        textFrames: textFrames,
        ...(predicted.length > 0
          ? {
              predicted: predicted,
            }
          : {}),
        ...(homes.length > 0
          ? {
              homes: homes,
            }
          : {}),
        ...author(),
      };
      let dataModelSchemasLaw: Dynamic =
        resolveDataModelSchemasLaw(ops) ??
        (argument2 === true ? null : resolveDataModelSchemasOps(ops));
      if (dataModelSchemasLaw)
        return void this.lawStopped(
          opId,
          ops,
          dataModelSchemasLaw,
          argument === true,
        );
      let lookup3: Dynamic =
        argument === true
          ? new (Map as Dynamic)()
          : loadDataOperationControlVerdictHandler28();
      if (lookup3.size > 0) {
        let uniqueItems7: Dynamic = new (Set as Dynamic)(predicted.flat());
        for (let loadDataOperationControlVerdictResult22 of uniqueItems7 as Dynamic)
          lookup3.delete(loadDataOperationControlVerdictResult22);
        if (lookup3.size > 0) {
          record4.ops = ops = getDataOperationControlSize(ops, lookup3);
          record4.homes &&= homes = homes.map(
            (home?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              lookup3.get(home) ?? home,
          );
        }
      }
      let dataOperationControlOps2: Dynamic = resolveDataOperationControlOps2(
        record4,
        false,
      );
      this.mendHeard(dataOperationControlOps2);
      dataOperationControlOps2.seq = ++index;
      if (argument === true) {
        dataOperationControlOps2.assert = true;
      }
      for (let loadDataOperationControlVerdictResult22 of dataOperationControlOps2.predicted as Dynamic)
        for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22 as Dynamic)
          this.proposedEver.add(loadDataOperationControlVerdictResult23);
      if (this.proposedEver.size > 2e5) {
        this.proposedEver.clear();
      }
      if (
        dataOperationControlOps2.predicted.length > 0 &&
        this.myWords.size > 0
      ) {
        let uniqueItems7: Dynamic = new (Set as Dynamic)();
        for (let loadDataOperationControlVerdictResult22 of dataOperationControlOps2.predicted as Dynamic)
          for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22 as Dynamic)
            uniqueItems7.add(loadDataOperationControlVerdictResult23);
        for (let [loadDataOperationControlVerdictResult22, ask] of this
          .myWords as Dynamic) {
          if (
            ask.real !== true ||
            !(
              uniqueItems7.has(ask.bid) ||
              (ask.afterId != null && uniqueItems7.has(ask.afterId))
            )
          )
            continue;
          let { real: ask2, ...ask3 }: Dynamic = ask;
          this.myWords.set(loadDataOperationControlVerdictResult22, ask3);
          try {
            dataOperationControlVerdict.wal.stageWords?.(this.node, {
              bid: ask.bid,
              afterId: ask.afterId ?? null,
              text: ask.text,
              ...resolveDataOperationControlAuthor(ask),
            });
          } catch {}
        }
      }
      this.noteSent(opId);
      dataOperationControlOps2.sent = true;
      let logged: Dynamic = this.logged(dataOperationControlOps2);
      try {
        if (logged) {
          dataOperationControlVerdict.wal.stage?.(this.node, logged);
        }
      } catch {}
      this.handed.push(dataOperationControlOps2);
      this.ready.then(
        async (..._extraArguments: unknown[]): Promise<undefined> => {
          this.handed = this.handed.filter(
            (handed?: Dynamic, ..._extraArguments: unknown[]) =>
              handed !== dataOperationControlOps2,
          );
          this.queue.push(dataOperationControlOps2);
          emit7();
          if (kind !== null) {
            knockHeard2();
          }
          if (logged) {
            await Promise.race([
              dataOperationControlVerdict.wal
                .append(this.node, logged)
                .catch((..._extraArguments: unknown[]): undefined => undefined),
              loadDataOperationControlVerdictHandler(400),
            ]);
          }
          this.pump();
        },
      );
    }
    lawStopped(
      opId?: Dynamic,
      ops?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      console.error(
        `opTransport: zero_error_fallback — an update broke a law of the document HERE and was not sent (${context.law}: ${context.actual} over ${context.limit}${context.where ? ` at ${context.where}` : ``}); the page keeps it, unsynced`,
        opId,
      );
      this.zeroErrored({
        opId: opId,
        klass: `law_local`,
        reason: `limit`,
        law: context.law,
        ops: ops,
      });
      this.emit({
        t: `deny`,
        node: this.node,
        opId: opId,
        reason: `limit`,
        detail: {
          zero_error: `unsynced`,
          law: context.law,
          limit: context.limit,
          actual: context.actual,
          ...(context.where
            ? {
                where: context.where,
              }
            : {}),
          why: resolveDataModelSchemasDepth4(context),
          words: `${resolveDataModelSchemasValue25(context)[0].toUpperCase()}${resolveDataModelSchemasValue25(context).slice(1)}.`,
          local: true,
          ...(dependencies
            ? {
                assert: true,
              }
            : {}),
        },
      });
    }
    noReseats: Dynamic = 0;
    roomRev: Dynamic = -1;
    groundRev: Dynamic = -1;
    behindGround: Dynamic = null;
    healTimer: Dynamic = null;
    healArmedFor: Dynamic = 0;
    healCoolTimer: Dynamic = null;
    healCooling: Dynamic = false;
    healFails: Dynamic = 0;
    healDeferrals: Dynamic = 0;
    healWhy: Dynamic = ``;
    healEpisode: Dynamic = false;
    healReissues: Dynamic = 0;
    healReissueTimer: Dynamic = null;
    sentCount: Dynamic = 0;
    groundTo(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (dataOperationControlVerdict2 > this.groundRev) {
        this.groundRev = dataOperationControlVerdict2;
      }
    }
    roomSeen(
      dataOperationControlVerdict2?: unknown,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          typeof dataOperationControlVerdict2 != `number` ||
          dataOperationControlVerdict2 <= this.roomRev
        )
      ) {
        this.roomRev = dataOperationControlVerdict2;
        if (dataOperationControlVerdict2 > this.groundRev) {
          this.healArm(dataOperationControlValue6000);
        }
        if (!options) {
          this.orderActivity();
        }
        if (!options) {
          this.pollWake();
        }
      }
    }
    orderTimer: Dynamic = null;
    orderActive: Dynamic = false;
    orderDiverged: Dynamic = false;
    orderProbing: Dynamic = false;
    orderCalm: Dynamic = 0;
    orderTooLarge: Dynamic = false;
    orderAsked: Dynamic = 0;
    orderMismatches: Dynamic = 0;
    orderActivity(..._extraArguments: unknown[]): undefined {
      this.orderActive = true;
      this.orderArm();
    }
    orderRecadence(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.orderCalm = dataOperationControlVerdict2;
      if (this.orderTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.orderTimer);
        this.orderTimer = null;
        this.orderArm();
      }
    }
    orderArm(..._extraArguments: unknown[]): undefined {
      if (
        !(
          reconcile ||
          enabled ||
          this.dead ||
          this.halted ||
          !this.served ||
          loadDataOperationControlVerdictHandler21() ||
          this.healFails >= 3 ||
          this.orderTooLarge ||
          visibility.idle()
        )
      ) {
        if (this.orderTimer === null) {
          this.orderTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.orderTimer = null;
              this.orderCheck();
            },
            dataOperationControlFloor22 * 2 ** this.orderCalm,
          );
        }
      }
    }
    orderCheck(..._extraArguments: unknown[]) {
      if (
        !(reconcile || enabled || this.dead || this.halted || !this.served) &&
        !(this.healFails >= 3) &&
        !this.orderTooLarge &&
        !honourOpsOnFeed()
      ) {
        if (this.feedUp !== true) return this.orderArm();
        if (this.orderActive) {
          if (
            this.orderProbing ||
            this.reading ||
            this.owed ||
            this.out() > 0 ||
            this.holed.size > 0 ||
            this.behindGround !== null ||
            this.healCooling ||
            this.healStalledNow()
          )
            return this.orderArm();
          this.orderActive = false;
          this.orderArm();
          this.orderProbe();
        }
      }
    }
    orderProbe(..._extraArguments: unknown[]): undefined {
      this.orderProbing = true;
      reportOperationEvent(`order.probe`, {
        calm: this.orderCalm,
        rev: this.roomRev,
      });
      this.door({
        verb: `read`,
        payload: {
          kind: `view`,
        },
      }).then(
        (response?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          this.orderProbing = false;
          if (enabled || this.dead) return;
          if (isDataOperationControlDeny3(response)) {
            this.orderTooLarge = true;
            if (this.orderTimer !== null) {
              dataOperationControlVerdict.timers.clearTimeout(this.orderTimer);
            }
            this.orderTimer = null;
            reportOperationEvent(`order.tooLarge`, {
              rev: this.roomRev,
            });
            return;
          }
          if (!response || this.halted || response.verdict !== `allow`) return;
          let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
          let doc: Dynamic = data.doc;
          let onFaces2: Dynamic = typeof doc == `string` ? onFaces(doc) : null;
          let rev =
            [response.rev, data.rev, onFaces2?.rev].find(
              (item?: unknown, ..._extraArguments: unknown[]) =>
                typeof item == `number`,
            ) ?? -1;
          if (rev >= 0) {
            this.roomSeen(rev);
          }
          if (
            !onFaces2 ||
            (onFaces2.capped?.length ?? 0) > 0 ||
            (onFaces2.folded ?? 0) > 0 ||
            onFaces2.complete === false ||
            data.complete === false ||
            data.complete === 0 ||
            /^<doc\b[^>]*\scomplete="(?:0|false)"/.test(doc) ||
            resolveDataOperationControlFrom(data) !== undefined ||
            rev < 0 ||
            rev !== this.groundRev ||
            this.roomRev !== this.groundRev ||
            this.out() > 0 ||
            this.reading ||
            this.owed ||
            this.holed.size > 0
          )
            return;
          let bids: Dynamic = [];
          for (let ask of onFaces2.blocks as Dynamic)
            if (typeof ask?.bid == `string` && ask.bid) {
              bids.push(ask.bid);
            }
          this.orderAsked += 1;
          this.emit({
            t: `order`,
            node: this.node,
            rev: rev,
            bids: bids,
          });
        },
        (..._extraArguments: unknown[]): undefined =>
          void (this.orderProbing = false),
      );
    }
    healStalledNow(..._extraArguments: unknown[]) {
      if (this.roomRev > this.groundRev || this.orderDiverged) return true;
      for (let loadDataOperationControlVerdictResult22 of this.holed as Dynamic)
        if (this.declinedHoles.has(loadDataOperationControlVerdictResult22))
          return true;
      return false;
    }
    healArm(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          reconcile ||
          !this.served ||
          this.halted ||
          this.dead ||
          enabled ||
          loadDataOperationControlVerdictHandler21()
        ) &&
        !(this.healFails >= 3)
      ) {
        if (this.healTimer !== null) {
          if (dataOperationControlVerdict2 >= this.healArmedFor) return;
          dataOperationControlVerdict.timers.clearTimeout(this.healTimer);
        }
        this.healArmedFor = dataOperationControlVerdict2;
        this.healTimer = dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.healTimer = null;
            this.healCheck();
          },
          dataOperationControlVerdict2,
        );
      }
    }
    healStalled(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.healWhy = dataOperationControlVerdict2;
      this.healArm(dataOperationControlValue2500);
    }
    healCheck(..._extraArguments: unknown[]) {
      if (!(enabled || this.dead || this.halted || !this.served)) {
        if (!this.healStalledNow())
          return void ((this.healFails = 0),
          (this.healDeferrals = 0),
          this.healEpisodeEnd());
        if (this.healEpisode) return this.healReissue();
        if (this.healCooling || this.out() > 0)
          return this.healArm(dataOperationControlValue6000);
        if (this.reading && this.healDeferrals < 2) {
          this.healDeferrals += 1;
          return this.healArm(dataOperationControlValue6000);
        }
        if (!(this.healFails >= 3)) {
          if (this.shedTimer !== null)
            return this.healArm(dataOperationControlValue6000);
          this.healFire();
        }
      }
    }
    healFire(..._extraArguments: unknown[]): undefined {
      this.healDeferrals = 0;
      this.healEpisode = true;
      this.healReissues = 0;
      this.healCooling = true;
      this.healCoolTimer = dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.healCoolTimer = null;
          this.healCooling = false;
        },
        dataOperationControlValue100005,
      );
      let matchesRoomRev = this.roomRev > this.groundRev;
      let reason: Dynamic =
        this.healWhy ||
        (matchesRoomRev
          ? `the picture stayed behind the room`
          : `a declined block print stayed unplaced`);
      this.healWhy = ``;
      reportOperationEvent(`heal.stall`, {
        reason: reason,
        rev: matchesRoomRev ? this.roomRev : this.lastRev,
      });
      console.warn(
        `opTransport: heal.stall — one whole read chases a stalled picture (${reason}; ground ${this.groundRev}, room ${this.roomRev})`,
      );
      let enabled26 = false;
      let shedSeen: Dynamic = this.shedSeen;
      let healEpisodeEnd = (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!(enabled26 || enabled || this.dead)) {
          enabled26 = true;
          if (dataOperationControlVerdict2) {
            this.healFails = 0;
          } else {
            if (this.shedSeen === shedSeen) {
              this.healFails += 1;
              this.healArm(dataOperationControlValue6000);
            } else {
              reportOperationEvent(`heal.shed`, {
                fails: this.healFails,
              });
              this.healArm(dataOperationControlValue6000);
            }
          }
          if (dataOperationControlVerdict2 || !this.oweWhole) {
            this.healEpisodeEnd();
          }
        }
      };
      let setTimeout2: Dynamic = dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]) => healEpisodeEnd(false),
        DataOperationControlState9,
      );
      this.read(undefined, DataOperationControlMessage7).then(
        (..._extraArguments: unknown[]): undefined => {
          dataOperationControlVerdict.timers.clearTimeout(setTimeout2);
          healEpisodeEnd(!this.healStalledNow());
        },
        (..._extraArguments: unknown[]): undefined => {
          dataOperationControlVerdict.timers.clearTimeout(setTimeout2);
          healEpisodeEnd(false);
        },
      );
    }
    healReissue(..._extraArguments: unknown[]): undefined {
      if (
        this.healReissueTimer !== null ||
        enabled ||
        this.dead ||
        !this.healEpisode
      )
        return;
      let wait2 = Math.min(
        dataOperationControlValue100005,
        dataOperationControlValue2500 * 2 ** Math.min(this.healReissues, 8),
      );
      let sentCount: Dynamic = this.sentCount;
      this.healReissueTimer = dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]) => {
          this.healReissueTimer = null;
          if (!(enabled || this.dead || !this.healEpisode)) {
            if (!this.healStalledNow()) return this.healEpisodeEnd();
            if (this.sentCount !== sentCount || this.out() > 0 || this.reading)
              return this.healReissue();
            this.healReissues += 1;
            reportOperationEvent(`heal.reissue`, {
              n: this.healReissues,
              wait: wait2,
              ground: this.groundRev,
              room: this.roomRev,
            });
            this.owed = this.oweWhole = false;
            this.read(undefined, DataOperationControlMessage7).then(
              (..._extraArguments: unknown[]) => {
                if (!(enabled || this.dead)) {
                  if (!this.healStalledNow())
                    return void ((this.healFails = 0), this.healEpisodeEnd());
                  if (this.oweWhole) return this.healReissue();
                  this.healEpisodeEnd();
                  this.healArm(dataOperationControlValue6000);
                }
              },
              (..._extraArguments: unknown[]): undefined =>
                void (this.healEpisodeEnd(),
                this.healArm(dataOperationControlValue6000)),
            );
          }
        },
        wait2,
      );
    }
    healEpisodeEnd(..._extraArguments: unknown[]): undefined {
      this.healEpisode = false;
      this.healReissues = 0;
      if (this.healReissueTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.healReissueTimer);
      }
      this.healReissueTimer = null;
    }
    noWhole(reason?: Dynamic, ..._extraArguments: unknown[]) {
      return reconcile || !this.served || honourOpsOnFeed()
        ? false
        : (this.noReseats++,
          console.warn(
            `opTransport: no-reseat — a whole re-read was NOT taken (${reason}); deltas by id go on`,
          ),
          this.zeroErrored({
            opId: ``,
            klass: `no_reseat`,
            reason: reason,
            ops: [],
          }),
          true);
    }
    zeroErrored(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      try {
        dataOperationControlVerdict.onZeroError?.({
          node: this.node,
          opId: dataOperationControlVerdict2.opId,
          klass: dataOperationControlVerdict2.klass,
          reason: dataOperationControlVerdict2.reason,
          ...(dataOperationControlVerdict2.room === undefined
            ? {}
            : {
                room: dataOperationControlVerdict2.room,
              }),
          ...(dataOperationControlVerdict2.law === undefined
            ? {}
            : {
                law: dataOperationControlVerdict2.law,
              }),
          ops: dataOperationControlVerdict2.ops.length,
          verbs: dataOperationControlVerdict2.ops.map(
            (operation?: Dynamic, ..._extraArguments: unknown[]) =>
              String(operation.op),
          ),
          ...(dataOperationControlVerdict2.opIndex === undefined
            ? {}
            : {
                opIndex: dataOperationControlVerdict2.opIndex,
              }),
        });
      } catch {}
    }
    reviveShort(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      options.ops.forEach(
        (
          op2?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!resolveDataOperationControlRevive2(op2)) return;
          let chars: Dynamic = op2.chars;
          let items3: Dynamic = [];
          let asked: Dynamic = 0;
          for (let loadDataOperationControlVerdictResult22 of (Array.isArray(
            chars?.runs,
          )
            ? chars.runs
            : []) as Dynamic) {
            if (
              !Array.isArray(loadDataOperationControlVerdictResult22) ||
              typeof loadDataOperationControlVerdictResult22[0] != `string` ||
              typeof loadDataOperationControlVerdictResult22[1] != `string`
            )
              continue;
            let [items4, setItems]: Dynamic = [
              resolveEditorExtensionsSess(
                loadDataOperationControlVerdictResult22[0],
              ),
              resolveEditorExtensionsSess(
                loadDataOperationControlVerdictResult22[1],
              ),
            ];
            if (
              items4 &&
              setItems &&
              items4.sess === setItems.sess &&
              setItems.i >= items4.i
            ) {
              items3.push([items4, setItems]);
              asked += setItems.i - items4.i + 1;
            } else {
              asked += 1;
            }
          }
          if (asked === 0) return;
          let resolveEditorExtensionsSess5: Dynamic = (
            dataOperationControlVerdict3?: unknown,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let editorExtensionsSess: Dynamic =
              typeof dataOperationControlVerdict3 == `string`
                ? resolveEditorExtensionsSess(dataOperationControlVerdict3)
                : null;
            return (
              !!editorExtensionsSess &&
              items3.some(
                ([item, item2]: Dynamic, ..._extraArguments: unknown[]) =>
                  item.sess === editorExtensionsSess.sess &&
                  editorExtensionsSess.i >= item.i &&
                  editorExtensionsSess.i <= item2.i,
              )
            );
          };
          let some: Dynamic = argument.some(
            (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              (error.code === `unknown_ids` || error.code === `unknown_id`) &&
              (typeof error.opIndex == `number`
                ? resolveDataOperationControlValue17(context, error.opIndex) ===
                  index5
                : Array.isArray(error.ids) &&
                  error.ids.some(resolveEditorExtensionsSess5)),
          );
          let dependencyItem: Dynamic = dependencies[index5];
          let isPlainRecord3: Dynamic =
            isPlainRecord(dependencyItem) &&
            Array.isArray(dependencyItem.revived);
          let dataOperationControlFlatMap2Count: Dynamic = isPlainRecord3
            ? resolveDataOperationControlFlatMap2(dependencyItem.revived).length
            : asked;
          if (!some && dataOperationControlFlatMap2Count >= asked) return;
          let opIndex: Dynamic = options.kStart + index5;
          let enabled26 = !this.shortRevived.has(
            dataOperationControlVerdict2.opId,
          );
          if (enabled26) {
            this.shortGrace.add(dataOperationControlVerdict2.opId);
            let opId: Dynamic = dataOperationControlVerdict2.opId;
            dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                if (this.shortGrace.delete(opId)) {
                  emit7();
                }
              },
              dataOperationControlValue3000,
            );
          }
          this.shortRevived.set(dataOperationControlVerdict2.opId, false);
          (dataOperationControlVerdict2.notices ??= []).push({
            code: `revive_short`,
            opIndex: opIndex,
            asked: asked,
            revived: isPlainRecord3 ? dataOperationControlFlatMap2Count : 0,
          });
          if (enabled26) {
            console.warn(
              `opTransport: a revive was answered short — the room brought back ${isPlainRecord3 ? dataOperationControlFlatMap2Count : `?`} of the ${asked} chars an undo named (op ${opIndex} of ${dataOperationControlVerdict2.opId}${some ? `, unknown_ids` : ``}); the page is not saved over them`,
            );
            resolveDataOperationControlValue22(
              `revive_short`,
              dataOperationControlVerdict2.lost === true ||
                dataOperationControlVerdict2.tries > 0,
            );
            this.zeroErrored({
              opId: dataOperationControlVerdict2.opId,
              klass: `revive_short`,
              reason: `revive_short`,
              ops: dataOperationControlVerdict2.ops,
              opIndex: opIndex,
            });
          }
        },
      );
    }
    logged(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return dataOperationControlVerdict2.assert ||
        (!dataOperationControlVerdict2.replayed &&
          dataOperationControlVerdict2.ops.length > 0 &&
          dataOperationControlVerdict2.ops.every(
            (operation?: Dynamic, ..._extraArguments: unknown[]) =>
              operation.op === `delete`,
          ) &&
          dataOperationControlVerdict2.ops.some(
            resolveDataOperationControlChars4,
          ))
        ? null
        : {
            opId: dataOperationControlVerdict2.opId,
            ops: dataOperationControlVerdict2.ops,
            textFrames: dataOperationControlVerdict2.textFrames,
            ...(dataOperationControlVerdict2.predicted.length > 0
              ? {
                  predicted: dataOperationControlVerdict2.predicted,
                }
              : {}),
            ...(dataOperationControlVerdict2.homes
              ? {
                  homes: dataOperationControlVerdict2.homes,
                }
              : {}),
            ...(dataOperationControlVerdict2.sent
              ? {
                  sent: true,
                }
              : {}),
            ...(dataOperationControlVerdict2.rewidened
              ? {
                  rewidened: true,
                }
              : {}),
            life: life2,
            ...resolveDataOperationControlAuthor(dataOperationControlVerdict2),
          };
    }
    moor(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          this.inflight !== dataOperationControlVerdict2 ||
          enabled ||
          this.dead
        )
      ) {
        if (this.retryTimer !== null) {
          dataOperationControlVerdict.timers.clearTimeout(this.retryTimer);
        }
        this.retryTimer = null;
        dataOperationControlVerdict2.parked = false;
        dataOperationControlVerdict2.moored = true;
        this.slow = true;
        if (!this.served && this.stuckReplay()) {
          this.read(undefined);
        }
        if (enabled22) {
          reopened();
        }
      }
    }
    unmoor(..._extraArguments: unknown[]) {
      let inflight: Dynamic = this.inflight;
      return inflight?.moored
        ? ((inflight.moored = false),
          (this.inflight = null),
          this.queue.unshift(inflight),
          true)
        : false;
    }
    reclaim(..._extraArguments: unknown[]): undefined {
      let inflight: Dynamic = this.inflight;
      if (
        !(
          !inflight ||
          enabled ||
          this.dead ||
          !(inflight.parked === true || inflight.moored === true)
        )
      ) {
        if (inflight.parked === true && this.retryTimer !== null) {
          dataOperationControlVerdict.timers.clearTimeout(this.retryTimer);
        }
        if (inflight.parked === true) {
          this.retryTimer = null;
        }
        inflight.parked = false;
        inflight.moored = false;
        inflight.triesBase = inflight.tries;
        inflight.boundTries = 0;
        this.inflight = null;
        this.queue.unshift(inflight);
      }
    }
    async knock(..._extraArguments: unknown[]) {
      let door: Dynamic = await this.door({
        verb: `read`,
        payload: {
          kind: `view`,
          sinceRev: Math.max(this.lastRev, 0),
        },
      });
      return !door || (door.verdict !== `allow` && door.verdict !== `deny`)
        ? false
        : this.probeServed(door);
    }
    probeServed(response?: Dynamic, ..._extraArguments: unknown[]) {
      if (response?.verdict === `allow`) return true;
      if (response?.verdict !== `deny`) return false;
      let k10: Dynamic =
        refusalClass()?.classify(response, {
          road: `read`,
          seated: loadDataOperationControlVerdictHandler26(),
          node: this.node,
        }).k ?? null;
      return k10 !== `transient` && k10 !== `lost`;
    }
    probeEar: Dynamic;
    knockHeard(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.probeEar = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void dataOperationControlVerdict3.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined =>
            void (
              !enabled &&
              !this.dead &&
              dataOperationControlVerdict2(
                this.probeServed(isPlainRecord(result) ? result : null),
              )
            ),
          (..._extraArguments: unknown[]): undefined => undefined,
        );
      try {
        return this.knock();
      } finally {
        this.probeEar = undefined;
      }
    }
    parkIfDown(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      dataOperationControlVerdict2.parked = false;
      return kind === null ||
        this.nodeGone ||
        this.inflight !== dataOperationControlVerdict2
        ? false
        : ((dataOperationControlVerdict2.triesBase =
            dataOperationControlVerdict2.tries),
          (dataOperationControlVerdict2.boundTries = 0),
          (this.inflight = null),
          this.queue.unshift(dataOperationControlVerdict2),
          this.emit(loadDataOperationControlVerdictHandler25(this.node)),
          true);
    }
    rearmGap(..._extraArguments: unknown[]): undefined {
      if (this.gapOwed && !enabled && !this.dead) {
        this.gapRetry();
      }
    }
    pump(..._extraArguments: unknown[]): Dynamic {
      this.serveMount(`drained`);
      this.handOwedWords();
      if (enabled || this.dead || this.inflight) return;
      if (
        enabled22 &&
        ![...lookup.values()].some(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item.inflight,
        )
      )
        return reopened();
      if (
        !this.nodeGone &&
        (!enabled21 || !dataOperationControlVerdict.session.get()) &&
        this.queue.length > 0
      ) {
        if (!enabled23)
          return void loadDataOperationControlVerdictHandler29().then(
            (..._extraArguments: unknown[]): Dynamic =>
              lookup.forEach(
                (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  lookup3.pump(),
              ),
          );
        if (!dataOperationControlVerdict.session.get()) {
          for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
            if (loadDataOperationControlVerdictResult22.inflight) return;
        }
        if (
          !dataOperationControlVerdict.session.get() &&
          isDataOperationControlBatchesDone(this.queue[0])
        ) {
          count9 = Math.min(count9 + 1, 16);
          loadDataOperationControlVerdictResult19 = null;
          enabled23 = false;
          loadDataOperationControlVerdictHandler29().then(
            (..._extraArguments: unknown[]): Dynamic =>
              lookup.forEach(
                (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  lookup3.pump(),
              ),
          );
          return;
        }
      }
      if (
        enabled21 &&
        dataOperationControlVerdict.session.get() &&
        this.queue.length > 0 &&
        uniqueItems6.size > 0
      ) {
        let filteredItemsSlice: Dynamic = slice().filter(
          (itemsSlice?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            uniqueItems6.has(itemsSlice),
        );
        if (filteredItemsSlice.length > 0) {
          for (let loadDataOperationControlVerdictResult22 of filteredItemsSlice as Dynamic)
            rekeyHolds3(loadDataOperationControlVerdictResult22);
          emit8();
        }
      }
      let capsSettled8: Dynamic = capsSettled7() && !this.nodeGone;
      for (
        let queueItem: Dynamic = capsSettled8 ? undefined : this.queue[0];
        queueItem;
        queueItem = this.queue[0]
      ) {
        if (this.held(queueItem)) return;
        if (this.queue[0] === queueItem) break;
      }
      this.inflight = capsSettled8 ? null : (this.queue.shift() ?? null);
      let matchesProvisionalCount =
        this.provisional.size === 0 && this.heldWords === 0;
      let matchesKind: Dynamic =
        kind !== null && capsSettled8 && this.queue.length > 0;
      if (
        this.oweWhole &&
        !this.inflight &&
        !matchesKind &&
        this.owed &&
        !this.reading &&
        matchesProvisionalCount &&
        !this.healEpisode &&
        this.noWhole(`a picture owed at drain`)
      ) {
        this.oweWhole = false;
      }
      let enabled26: Dynamic =
        !this.inflight &&
        !matchesKind &&
        this.owed &&
        !this.reading &&
        this.oweWhole &&
        matchesProvisionalCount;
      if (this.inflight && this.inflight.sent !== true) {
        this.inflight.sent = true;
        trim(this, this.inflight);
      }
      if (this.inflight) {
        this.fly(this.inflight);
      } else {
        if (enabled26 && this.healEpisode) {
          this.healReissue();
        } else {
          if (
            !matchesKind &&
            this.owed &&
            !this.reading &&
            matchesProvisionalCount &&
            !(this.owed = false)
          ) {
            this.read(
              this.oweWhole && !(this.oweWhole = false)
                ? undefined
                : this.since(),
            );
          }
        }
      }
      if (!this.inflight && !enabled26 && !honourOpsOnFeed()) {
        this.mendHoles();
      }
    }
    holed: Dynamic = new (Set as Dynamic)();
    holedRead: Dynamic = new (Set as Dynamic)();
    mendHoles(..._extraArguments: unknown[]): undefined {
      if (
        this.holed.size === 0 ||
        this.inflight ||
        this.queue.length > 0 ||
        this.provisional.size > 0 ||
        !this.served ||
        this.halted ||
        enabled ||
        this.dead
      )
        return;
      let index5 = 0;
      for (let loadDataOperationControlVerdictResult22 of this.holed as Dynamic)
        if (!this.holedRead.has(loadDataOperationControlVerdictResult22)) {
          if (index5++ >= 4 && (reconcile || !this.served)) {
            this.owed = this.oweWhole = true;
            break;
          }
          this.holedRead.add(loadDataOperationControlVerdictResult22);
          this.readBlock(
            loadDataOperationControlVerdictResult22,
            this.declinedHoles.has(loadDataOperationControlVerdictResult22),
          );
        }
    }
    async fly(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      if (
        !dataOperationControlVerdict2.assert &&
        !dataOperationControlVerdict2.replayed
      )
        for (let loadDataOperationControlVerdictResult22 of dataOperationControlVerdict2.predicted as Dynamic)
          for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22 as Dynamic)
            this.proposedEver.add(loadDataOperationControlVerdictResult23);
      dataOperationControlVerdict2.cuts ??= resolveDataOperationControlKStart(
        dataOperationControlVerdict2.ops,
        editorArm ? resolveDataOperationControlSpell : undefined,
      ).map(
        (
          dataOperationControlKStart?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationControlKStart.kStart,
      );
      let cuts: Dynamic = dataOperationControlVerdict2.cuts;
      for (
        let batchesDone: Dynamic = dataOperationControlVerdict2.batchesDone;
        batchesDone < cuts.length;
        batchesDone++
      ) {
        let [kStart, setKStart]: Dynamic = [
          cuts[batchesDone],
          cuts[batchesDone + 1] ?? dataOperationControlVerdict2.ops.length,
        ];
        if (
          batchesDone > 0 &&
          (dataOperationControlVerdict2.ratePace ?? 0) > 0 &&
          dataOperationControlVerdict2.pacedFor !== batchesDone
        ) {
          let waitMs: Dynamic = dataOperationControlVerdict2.ratePace;
          dataOperationControlVerdict2.pacedFor = batchesDone;
          dataOperationControlVerdict2.rateHeld =
            (dataOperationControlVerdict2.rateHeld ?? 0) + waitMs;
          reportOperationEvent(`write.ratePace`, {
            opId: dataOperationControlVerdict2.opId,
            update: batchesDone + 1,
            of: cuts.length,
            waitMs: waitMs,
          });
          this.slow = true;
          if (!this.troubled()) {
            this.busySaid = true;
            this.emit({
              t: `state`,
              node: this.node,
              state: `saving`,
              pageBusy: true,
              words: DataOperationControlMessage3,
            });
          }
          this.retryTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.retryTimer = null;
              if (!enabled && !this.dead) {
                this.fly(dataOperationControlVerdict2);
              }
            },
            waitMs,
          );
          return;
        }
        let record4: Dynamic = {
          kStart: kStart,
          ops: dataOperationControlVerdict2.ops.slice(kStart, setKStart),
        };
        let opId = `${dataOperationControlVerdict2.opId}${dataOperationControlVerdict2.rewidened ? DataOperationControlMessage16 : ``}${cuts.length === 1 ? `` : `:${kStart}-${setKStart - 1}`}`;
        let setTimeout2: Dynamic =
          dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.slow = true;
              this.emit(
                kind === null
                  ? {
                      t: `state`,
                      node: this.node,
                      state: `saving`,
                      words: DataOperationControlMessage8,
                    }
                  : loadDataOperationControlVerdictHandler25(this.node),
              );
            },
            dataOperationControlValue20005,
          );
        let late2: Dynamic =
          dataOperationControlVerdict2.late?.b === batchesDone
            ? dataOperationControlVerdict2.late
            : undefined;
        let rep: Dynamic =
          dataOperationControlVerdict2.late?.b === batchesDone
            ? dataOperationControlVerdict2.late.rep
            : undefined;
        if (dataOperationControlVerdict2.late?.b === batchesDone) {
          dataOperationControlVerdict2.late = undefined;
        }
        let predicted: Dynamic = dataOperationControlVerdict2.predicted.slice(
          record4.kStart,
          setKStart,
        );
        let loadDataOperationControlVerdictResult22: Dynamic;
        try {
          loadDataOperationControlVerdictResult22 = editorArm
            ? filterDataOperationControlOps(record4.ops, predicted, {
                wrapFinal: loadDataOperationControlVerdictHandler3(`wrapFinal`),
              })
            : isDataOperationControlOps(record4.ops);
        } catch (loadDataOperationControlVerdictResult25: Dynamic) {
          dataOperationControlVerdict.timers.clearTimeout(setTimeout2);
          if (
            !(
              loadDataOperationControlVerdictResult25 instanceof
              (DataOperationControlEditorOpError as Dynamic)
            )
          )
            throw loadDataOperationControlVerdictResult25;
          this.emit({
            t: `deny`,
            node: this.node,
            opId: dataOperationControlVerdict2.opId,
            reason: `unsupported_edit`,
            detail: {
              code: `unsupported_edit`,
              why: loadDataOperationControlVerdictResult25.why,
              layer: `page`,
              opIndex: kStart + loadDataOperationControlVerdictResult25.k,
              pointed: true,
              words: `That edit cannot be sent from this page (it addresses text by search).`,
            },
          });
          this.owed = this.oweWhole = true;
          await this.settleOne(dataOperationControlVerdict2);
          return;
        }
        let record5: Dynamic = {
          verb: `update`,
          opId: opId,
          payload: editorArm
            ? {
                engine: DataOperationControlProse,
                ops: loadDataOperationControlVerdictResult22.ops,
              }
            : {
                ops: loadDataOperationControlVerdictResult22.ops,
              },
        };
        if (
          resolveDataOperationControlEvery3(
            loadDataOperationControlVerdictResult22.ops,
          ) &&
          capsSettled2()
        ) {
          record5.stream = true;
        }
        let now2: Dynamic = dataOperationControlVerdict.now?.();
        let rep2: Dynamic =
          rep ??
          (await this.door(
            record5,
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              dataOperationControlVerdict2.late = {
                b: batchesDone,
              };
              let dataOperationControlVerdictHandler: Dynamic =
                loadDataOperationControlVerdictHandler23();
              dataOperationControlVerdict3.then(
                (
                  result?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let filterDataOperationControlData2: Dynamic = editorArm
                    ? filterDataOperationControlData(result)
                    : result;
                  if (
                    dataOperationControlVerdict2.late?.b === batchesDone &&
                    !this.nodeGone &&
                    isPlainRecord(filterDataOperationControlData2) &&
                    filterDataOperationControlData2.verdict === `unreachable` &&
                    filterDataOperationControlData2.reopens === true
                  )
                    return void this.moor(dataOperationControlVerdict2);
                  if (
                    !(
                      dataOperationControlVerdict2.late?.b !== batchesDone ||
                      !isPlainRecord(filterDataOperationControlData2) ||
                      (filterDataOperationControlData2.verdict !== `allow` &&
                        filterDataOperationControlData2.verdict !== `deny`)
                    )
                  ) {
                    dataOperationControlVerdict2.late.rep =
                      filterDataOperationControlData2;
                    if (
                      this.retryTimer !== null &&
                      this.inflight === dataOperationControlVerdict2 &&
                      !enabled &&
                      !this.dead
                    ) {
                      dataOperationControlVerdict.timers.clearTimeout(
                        this.retryTimer,
                      );
                      this.retryTimer = null;
                      dataOperationControlVerdict2.parked = false;
                      this.fly(dataOperationControlVerdict2);
                    } else {
                      if (
                        filterDataOperationControlData2.verdict === `allow` &&
                        !this.dead &&
                        this.inflight === null &&
                        this.queue[0] === dataOperationControlVerdict2 &&
                        loadDataOperationControlVerdictHandler24(
                          dataOperationControlVerdictHandler,
                        ) &&
                        kind !== `refusing`
                      ) {
                        round(`head`, now2, true);
                      }
                    }
                  }
                },
                (..._extraArguments: unknown[]): undefined => undefined,
              );
            },
          ));
        dataOperationControlVerdict.timers.clearTimeout(setTimeout2);
        if (!rep2) return;
        if (editorArm) {
          rep2 = filterDataOperationControlData(rep2);
        }
        if (
          late2 !== undefined &&
          late2.rep === undefined &&
          dataOperationControlVerdict2.late === undefined &&
          rep2.verdict === `unreachable` &&
          rep2.hung !== true &&
          rep2.reopens !== true
        ) {
          dataOperationControlVerdict2.late = late2;
        }
        let matchesVerdictLostTries =
          (dataOperationControlVerdict2.verdictLostTries ?? 0) > 0;
        if (isDataOperationControlUnreachable(rep2)) {
          let total2: Dynamic =
            (dataOperationControlVerdict2.verdictLostTries ?? 0) + 1;
          dataOperationControlVerdict2.verdictLostTries = total2;
          let was =
            rep2.reason === `answer-unmaskable` || rep2.status === 422
              ? DataOperationControlAnswerUnmaskable
              : DataOperationControlAnswerTooLarge;
          reportOperationEvent(`ack.verdictLost`, {
            opId: opId,
            ops: loadDataOperationControlVerdictResult22.ops.length,
            status: typeof rep2.status == `number` ? rep2.status : -1,
            n: total2,
            ...(total2 > 1
              ? {
                  terminal: true,
                }
              : {}),
          });
          if (total2 > 1) {
            dataOperationControlVerdict2.boundOut = true;
            rep2 = {
              verdict: `deny`,
              reason: DataOperationControlVerdictLost,
              ...(typeof rep2.status == `number`
                ? {
                    status: rep2.status,
                  }
                : {}),
              detail: `the server refused this change; its answer could not be carried`,
              data: {
                terminal: true,
                was: was,
                code: DataOperationControlVerdictLost,
                maybeLanded: true,
              },
            };
          } else {
            rep2 = {
              verdict: `unreachable`,
              lost: true,
              verdictLost: true,
              ...(typeof rep2.status == `number`
                ? {
                    status: rep2.status,
                  }
                : {}),
            };
          }
        } else if (
          (rep2.verdict === `allow` || rep2.verdict === `deny`) &&
          filterDataOperationControlDeny(rep2) === null &&
          pageBusyOf(rep2) === null &&
          !isDataOperationControlDeny2(rep2) &&
          !isDataOperationControlDeny7(rep2)
        ) {
          dataOperationControlVerdict2.verdictLostTries = 0;
        }
        if (
          matchesVerdictLostTries &&
          rep2.verdict === `allow` &&
          rep2.replayed === true &&
          !Array.isArray((isPlainRecord(rep2.data) ? rep2.data : {}).results)
        ) {
          rep2 = {
            ...rep2,
            ackTooLarge: true,
          };
        }
        if (isDataOperationControlDeny7(rep2)) {
          reportOperationEvent(`ack.conflictLost`, {
            opId: opId,
            ops: loadDataOperationControlVerdictResult22.ops.length,
            status: typeof rep2.status == `number` ? rep2.status : -1,
            now: true,
          });
          rep2 = resolveDataOperationControlVerdict(rep2);
        }
        if (isDataOperationControlAllow(rep2)) {
          let data3: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
          let isArray2 =
            Array.isArray(data3.results) &&
            data3.results.length > 0 &&
            !(
              Array.isArray(data3.dropped) && data3.dropped.includes(`results`)
            );
          rep2 = {
            ...rep2,
            verdict: `allow`,
            reason: undefined,
            changed: true,
            ackTooLarge: true,
            data: {
              ...data3,
              changed: true,
              ...(isArray2
                ? {}
                : {
                    results: loadDataOperationControlVerdictResult22.ops.map(
                      (..._extraArguments: unknown[]) => ({
                        changed: true,
                      }),
                    ),
                  }),
            },
          };
          this.owed = true;
          if (reconcile) {
            this.oweWhole = true;
          }
          reportOperationEvent(`ack.tooLarge`, {
            opId: opId,
            ops: loadDataOperationControlVerdictResult22.ops.length,
            status: typeof rep2.status == `number` ? rep2.status : -1,
            replayed: rep2.replayed === true,
          });
          console.info(
            `opTransport: an update landed but its answer was too large to carry (${opId}, ${loadDataOperationControlVerdictResult22.ops.length} op${loadDataOperationControlVerdictResult22.ops.length === 1 ? `` : `s`}) — taken as saved; the document is read back for what the answer could not say`,
          );
        }
        let state2: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
          road: `write`,
          verb: `update`,
          node: this.node,
          seated: loadDataOperationControlVerdictHandler26(),
          opId: opId,
          replayed: dataOperationControlVerdict2.replayed === true,
          kStart: kStart,
          lost: dataOperationControlVerdict2.lost === true,
          tries: dataOperationControlVerdict2.tries,
          stream: record5.stream === true,
          ops: loadDataOperationControlVerdictResult22.ops.length,
          vis: visibility.state(),
          feedUp: this.feedUp,
        });
        if (
          test2(
            rep2,
            editorArm ? loadDataOperationControlVerdictResult22 : undefined,
          )
        ) {
          judged(record5, rep2, `stalled`, state2());
          enabled3 = true;
          record3 = {};
          this.inflight = null;
          this.queue.unshift(dataOperationControlVerdict2);
          info();
          console.warn(
            `opTransport: interlock — the door refused a write by SHAPE (it does not speak one order); kept queued and logged, nothing more is sent until it does`,
            dataOperationControlVerdict2.opId,
            String(rep2.reason),
          );
          resolveDataOperationControlValue22(
            `shape_queued`,
            dataOperationControlVerdict2.lost === true ||
              dataOperationControlVerdict2.tries > 0,
          );
          pump2();
          emit7();
          return;
        }
        let matchesReplayed =
          rep2.verdict === `allow`
            ? rep2.replayed === true
            : rep2.verdict === `deny` &&
              /op_id_conflict/.test(
                `${String(rep2.reason)} ${String((isPlainRecord(rep2.data) ? rep2.data : {}).code)}`,
              );
        let data: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
        let isArray =
          Array.isArray(data.results) ||
          [data.rev, data.firstRev, rep2.rev].some(
            (item3?: unknown, ..._extraArguments: unknown[]) =>
              typeof item3 == `number`,
          );
        let matchesTries =
          (dataOperationControlVerdict2.tries > 0 ||
            (dataOperationControlVerdict2.busyTries ?? 0) > 0 ||
            (dataOperationControlVerdict2.pageBusy ?? 0) > 0) &&
          !dataOperationControlVerdict2.replayed &&
          !dataOperationControlVerdict2.loggedAs &&
          (rep2.verdict === `allow` || isArray);
        let replayed: Dynamic =
          dataOperationControlVerdict2.replayed &&
          !dataOperationControlVerdict2.loggedAs &&
          dataOperationControlVerdict2.sent === true;
        if (
          rep2.verdict === `deny` &&
          isPlainRecord(rep2.data) &&
          !dataOperationControlVerdict2.replayed
        ) {
          let sessionEntry: Dynamic = dataOperationControlVerdict.session.get();
          let isDataOperationControlGot2: Dynamic = isDataOperationControlGot(
            rep2,
            rep2.data,
            sessionEntry?.label,
            dataOperationControlVerdict2.predicted,
          );
          if (isDataOperationControlGot2) {
            reportOperationEvent(`deny.id_conflict.recount`, {
              opId: dataOperationControlVerdict2.opId,
              problem: String(rep2.data.problem),
              k: typeof rep2.data.opIndex == `number` ? rep2.data.opIndex : -1,
              got: resolveDataOperationControlStartsWith(
                isDataOperationControlGot2.got,
                sessionEntry.label,
              ),
              hwm: sessionEntry.hwm,
              nearest: resolveDataOperationControlStartsWith(
                isDataOperationControlGot2.next_free,
                sessionEntry.label,
              ),
              again: this.recounting,
            });
            Object.assign(rep2.data, {
              was: `id_invalid`,
              why: `used`,
              got: isDataOperationControlGot2.got,
              next_free: isDataOperationControlGot2.next_free,
            });
          }
        }
        let loadDataOperationControlVerdictResult23: Dynamic = null;
        let enabled26 = false;
        if (rep2.verdict === `deny`) {
          let data3: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
          if (
            (typeof data3.why == `string`
              ? data3.why
              : /\bproposed ids: ([a-z_]+)/.exec(
                  `${String(data3.detail)} ${String(rep2.detail)}`,
                )?.[1]) === `used` &&
            typeof data3.got == `string` &&
            resolveDataOperationControlIdInvalid(rep2, data3)
          ) {
            let opIndex: Dynamic =
              typeof data3.opIndex == `number`
                ? data3.opIndex
                : Number(
                    /^ops\[(\d+)\]/.exec(
                      `${String(data3.detail ?? rep2.detail ?? ``)}`,
                    )?.[1] ?? 0,
                  );
            let dataOperationControlValue17: Dynamic =
              resolveDataOperationControlValue17(
                loadDataOperationControlVerdictResult22.from,
                Number.isInteger(opIndex) &&
                  opIndex >= 0 &&
                  opIndex < loadDataOperationControlVerdictResult22.ops.length
                  ? opIndex
                  : 0,
              );
            let opItem: Dynamic = record4.ops[dataOperationControlValue17];
            let items3: Dynamic =
              opItem?.op === `split`
                ? typeof opItem.id == `string`
                  ? [opItem.id]
                  : Array.isArray(opItem.ids)
                    ? opItem.ids.filter(
                        (id?: unknown, ..._extraArguments: unknown[]) =>
                          typeof id == `string`,
                      )
                    : (predicted[dataOperationControlValue17] ?? [])
                : [];
            if (
              opItem &&
              items3.includes(data3.got) &&
              opItem.resurrect !== data3.got
            ) {
              let heldSplitStands = await this.heldSplitStands(
                opItem,
                items3[items3.length - 1],
              );
              let alone: Dynamic = record4.ops.every(
                (
                  op2?: unknown,
                  index5?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  index5 === dataOperationControlValue17 ||
                  (predicted[index5] ?? []).length === 0,
              );
              if (heldSplitStands?.how === `stands` && alone) {
                loadDataOperationControlVerdictResult23 = {
                  rev: heldSplitStands.rev,
                };
              } else {
                if (heldSplitStands?.how !== `elsewhere`) {
                  enabled26 = true;
                }
              }
              reportOperationEvent(`deny.used.split`, {
                opId: dataOperationControlVerdict2.opId,
                k: record4.kStart + dataOperationControlValue17,
                how: heldSplitStands?.how ?? `unknown`,
                alone: alone,
                named: items3.length,
              });
            }
          }
        }
        if (
          loadDataOperationControlVerdictResult23 ||
          (matchesReplayed &&
            (((dataOperationControlVerdict2.replayed ||
              dataOperationControlVerdict2.lost) &&
              dataOperationControlVerdict2.loggedAs) ||
              matchesTries ||
              replayed))
        ) {
          let data3: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
          let lookup3: Dynamic = new (Map as Dynamic)();
          let [items3, setItems]: Dynamic = [
            dataOperationControlVerdict2.predicted.flat(),
            dataOperationControlVerdict2.loggedAs?.predicted.flat() ?? [],
          ];
          items3.forEach(
            (
              item3?: Dynamic,
              index5?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined =>
              void (
                setItems[index5] !== undefined &&
                setItems[index5] !== item3 &&
                lookup3.set(item3, setItems[index5])
              ),
          );
          if (dataOperationControlVerdict2.loggedAs && lookup3.size > 0) {
            for (let loadDataOperationControlVerdictResult25 of lookup.values() as Dynamic) {
              for (let loadDataOperationControlVerdictResult26 of (loadDataOperationControlVerdictResult25.inflight &&
              loadDataOperationControlVerdictResult25.inflight !==
                dataOperationControlVerdict2
                ? [
                    loadDataOperationControlVerdictResult25.inflight,
                    ...loadDataOperationControlVerdictResult25.queue,
                  ]
                : loadDataOperationControlVerdictResult25.queue) as Dynamic) {
                if (
                  loadDataOperationControlVerdictResult26 ===
                  dataOperationControlVerdict2
                )
                  continue;
                let ops: Dynamic = loadDataOperationControlVerdictResult26.ops;
                [
                  loadDataOperationControlVerdictResult26.ops,
                  loadDataOperationControlVerdictResult26.predicted,
                ] = [
                  getDataOperationControlSize(
                    loadDataOperationControlVerdictResult26.ops,
                    lookup3,
                  ),
                  getDataOperationControlSize(
                    loadDataOperationControlVerdictResult26.predicted,
                    lookup3,
                  ),
                ];
                loadDataOperationControlVerdictResult26.homes &&=
                  getDataOperationControlSize(
                    loadDataOperationControlVerdictResult26.homes,
                    lookup3,
                  );
                if (loadDataOperationControlVerdictResult26.ops !== ops) {
                  trim(
                    loadDataOperationControlVerdictResult25,
                    loadDataOperationControlVerdictResult26,
                  );
                }
              }
              loadDataOperationControlVerdictResult25.rekeyWords(
                (
                  dataOperationControlVerdict3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  lookup3.get(dataOperationControlVerdict3) ??
                  dataOperationControlVerdict3,
              );
              loadDataOperationControlVerdictResult25.rekeyHolds(
                (
                  dataOperationControlVerdict3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  lookup3.get(dataOperationControlVerdict3) ??
                  dataOperationControlVerdict3,
              );
            }
            [
              dataOperationControlVerdict2.ops,
              dataOperationControlVerdict2.predicted,
            ] = [
              dataOperationControlVerdict2.loggedAs.ops,
              dataOperationControlVerdict2.loggedAs.predicted,
            ];
            if (dataOperationControlVerdict2.loggedAs.homes) {
              dataOperationControlVerdict2.homes =
                dataOperationControlVerdict2.loggedAs.homes;
            }
            record4.ops = dataOperationControlVerdict2.ops.slice(
              kStart,
              setKStart,
            );
            predicted = dataOperationControlVerdict2.predicted.slice(
              kStart,
              setKStart,
            );
          }
          let number3 = Number(
            loadDataOperationControlVerdictResult23
              ? loadDataOperationControlVerdictResult23.rev
              : (data3.firstRev ?? rep2.firstRev ?? data3.rev ?? rep2.rev),
          );
          rep2 =
            rep2.verdict === `allow`
              ? rep2
              : {
                  verdict: `allow`,
                  replayed: true,
                  rev: Number.isFinite(number3)
                    ? number3
                    : Math.max(this.lastRev, 0),
                  ...(loadDataOperationControlVerdictResult23
                    ? {
                        changed: false,
                      }
                    : {}),
                  data: {
                    results:
                      matchesTries && Array.isArray(data3.results)
                        ? data3.results
                        : [],
                    ...(loadDataOperationControlVerdictResult23
                      ? {
                          changed: false,
                        }
                      : {}),
                  },
                };
        }
        let data2: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
        let isDataOperationControlDeny22: Dynamic =
          isDataOperationControlDeny2(rep2);
        if (isDataOperationControlDeny22) {
          dataOperationControlVerdict2.unknownTries =
            (dataOperationControlVerdict2.unknownTries ?? 0) + 1;
        } else {
          dataOperationControlVerdict2.unknownTries = 0;
        }
        let isDataOperationControlDeny23: Dynamic =
          isDataOperationControlDeny22 &&
          (dataOperationControlVerdict2.unknownTries ?? 0) > 3;
        let pageBusyOf2: Dynamic =
          dataOperationControlVerdict2.busyOut !== true &&
          !isDataOperationControlDeny23
            ? pageBusyOf(rep2)
            : null;
        if (pageBusyOf2 === null) {
          dataOperationControlVerdict2.pageBusy = 0;
          if (
            !(
              rep2.verdict === `allow` &&
              (dataOperationControlVerdict2.rateHeld ?? 0) > 0 &&
              batchesDone + 1 < cuts.length
            )
          ) {
            this.unsayBusy();
          }
        }
        let label5 = `${String(rep2.reason)} ${String(data2.code)} ${String(data2.why)} ${String(rep2.why)}`;
        let why: Dynamic = data2.why ?? rep2.why;
        let matchesWhy =
          why == null || why === `unknown_secret` || why === `unknown_session`;
        let why2: Dynamic =
          data2.was === `id_invalid` ||
          data2.code === `id_invalid` ||
          rep2.reason === `id_invalid`
            ? data2.why
            : undefined;
        let matchesVerdict: Dynamic =
          rep2.verdict === `deny` &&
          !(typeof why2 == `string` && dataOperationControlSet17.has(why2)) &&
          ((why2 === `prefix` && typeof data2.want_prefix == `string`) ||
            (why2 === `shape` &&
              typeof data2.got == `string` &&
              data2.got.startsWith(`_.`)) ||
            /proposed ids: prefix/.test(
              `${String(data2.detail)} ${String(data2.message)} ${String(rep2.reason)} ${String(rep2.detail)}`,
            ));
        let loadDataOperationControlVerdictResult24: Dynamic = ((
          ..._extraArguments: unknown[]
        ): Dynamic => {
          if (rep2.verdict !== `deny` || !/not_your_session/.test(label5))
            return [];
          let label6: Dynamic =
            dataOperationControlVerdict.session.get()?.label;
          let asked: Dynamic =
            data2.asked ??
            data2.newBid ??
            (data2.field === `ids` ? data2.start : undefined) ??
            rep2.asked;
          let asked2 =
            typeof asked == `string`
              ? asked
              : isPlainRecord(asked) && typeof asked.sess == `string`
                ? `${asked.sess}.0`
                : ``;
          let matchItem = dataOperationControlPattern11.exec(asked2)?.[1];
          return asked !== undefined &&
            (matchItem === undefined ||
              matchItem === `_` ||
              matchItem === label6)
            ? []
            : dataOperationControlVerdict2.replayed
              ? dataOperationControlVerdict2.lifeDead !== true ||
                dataOperationControlVerdict2.restamped
                ? []
                : matchItem === undefined
                  ? why == null
                    ? [
                        ...resolveDataOperationControlExec(
                          dataOperationControlVerdict2,
                          label6,
                        ),
                      ]
                    : []
                  : resolveDataOperationControlExec(
                        dataOperationControlVerdict2,
                        label6,
                      ).has(matchItem) ||
                      resolveDataOperationControlFlat3(
                        dataOperationControlVerdict2,
                      ).some(
                        (
                          dataOperationControlFlat3?: Dynamic,
                          ..._extraArguments: unknown[]
                        ) =>
                          resolveDataOperationControlStartsWith(
                            dataOperationControlFlat3,
                            matchItem,
                          ) >= 0,
                      )
                    ? [matchItem]
                    : []
              : matchItem !== undefined && uniqueItems6.has(matchItem)
                ? [matchItem]
                : [];
        })();
        let from: Dynamic = loadDataOperationControlVerdictResult24[0];
        if (
          ((rep2.verdict === `deny` &&
            /not_your_session|unknown_secret|unknown_session/.test(label5) &&
            matchesWhy) ||
            matchesVerdict ||
            from !== undefined) &&
          this.sessRetries < 2
        ) {
          judged(record5, rep2, `rehandshake`, state2());
          this.sessRetries += 1;
          this.inflight = null;
          this.queue.unshift(dataOperationControlVerdict2);
          if (
            (dataOperationControlVerdict2.replayed ||
              (dataOperationControlVerdict2.verdictLostTries ?? 0) > 0) &&
            dataOperationControlVerdict2.sent
          ) {
            dataOperationControlVerdict2.namesRefused = true;
          }
          if (
            from !== undefined &&
            dataOperationControlVerdict2.replayed &&
            enabled21
          ) {
            dataOperationControlVerdict2.restamped = true;
            let tail: Dynamic = 0;
            for (let loadDataOperationControlVerdictResult25 of lookup.values() as Dynamic)
              for (let loadDataOperationControlVerdictResult26 of (loadDataOperationControlVerdictResult25.inflight
                ? [
                    loadDataOperationControlVerdictResult25.inflight,
                    ...loadDataOperationControlVerdictResult25.queue,
                  ]
                : loadDataOperationControlVerdictResult25.queue) as Dynamic)
                if (
                  loadDataOperationControlVerdictResult26 !==
                    dataOperationControlVerdict2 &&
                  loadDataOperationControlVerdictResult26.replayed &&
                  loadDataOperationControlVerdictResult26.lifeDead === true &&
                  loadDataOperationControlVerdictHandler27(
                    loadDataOperationControlVerdictResult26,
                  ) &&
                  resolveDataOperationControlFlat3(
                    loadDataOperationControlVerdictResult26,
                  ).some(
                    (
                      dataOperationControlFlat3?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      loadDataOperationControlVerdictResult24.some(
                        (
                          loadDataOperationControlVerdictResult27?: Dynamic,
                          ..._extraArguments: unknown[]
                        ) =>
                          resolveDataOperationControlStartsWith(
                            dataOperationControlFlat3,
                            loadDataOperationControlVerdictResult27,
                          ) >= 0,
                      ),
                  )
                ) {
                  loadDataOperationControlVerdictResult26.namesRefused = true;
                  tail += 1;
                }
            reportOperationEvent(`deny.restamp`, {
              opId: dataOperationControlVerdict2.opId,
              from: loadDataOperationControlVerdictResult24.join(`,`),
              to: dataOperationControlVerdict.session.get()?.label ?? ``,
              tail: tail,
            });
            for (let loadDataOperationControlVerdictResult25 of loadDataOperationControlVerdictResult24 as Dynamic)
              rekeyHolds3(loadDataOperationControlVerdictResult25);
            rekeyHolds4();
            emit8();
            lookup.forEach(
              (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                lookup3.pump(),
            );
            return;
          }
          if (
            from !== undefined &&
            !dataOperationControlVerdict2.replayed &&
            enabled21
          ) {
            reportOperationEvent(`deny.restamp`, {
              opId: dataOperationControlVerdict2.opId,
              from: from,
              to: dataOperationControlVerdict.session.get()?.label ?? ``,
              tail: 0,
            });
            rekeyHolds3(from);
            rekeyHolds4();
            emit8();
            lookup.forEach(
              (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                lookup3.pump(),
            );
            return;
          }
          let got2: Dynamic =
            matchesVerdict && typeof data2.got == `string` ? data2.got : ``;
          loadDataOperationControlVerdictResult18(
            dataOperationControlVerdict.session.get()?.label,
            got2.includes(`.`) ? got2.slice(0, got2.lastIndexOf(`.`)) : from,
          );
          return;
        }
        let filterDataOperationControlDeny2: Dynamic =
          filterDataOperationControlDeny(rep2);
        if (
          filterDataOperationControlDeny2 !== null &&
          dataOperationControlVerdict2.busyOut !== true
        ) {
          let total2: Dynamic =
            (dataOperationControlVerdict2.busyTries ?? 0) + 1;
          if (total2 <= 8) {
            judged(record5, rep2, `retried`, state2());
            dataOperationControlVerdict2.busyTries = total2;
            this.slow = true;
            this.emit(
              kind === null
                ? {
                    t: `state`,
                    node: this.node,
                    state: `saving`,
                    ...(total2 > 2
                      ? {
                          words: DataOperationControlMessage8,
                        }
                      : {}),
                  }
                : loadDataOperationControlVerdictHandler25(this.node),
            );
            dataOperationControlVerdict2.parked = true;
            if (refusalClass() !== null && this.retryTimer !== null) {
              dataOperationControlVerdict.timers.clearTimeout(this.retryTimer);
            }
            this.retryTimer = dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.retryTimer = null;
                if (
                  !enabled &&
                  !this.dead &&
                  !this.parkIfDown(dataOperationControlVerdict2)
                ) {
                  this.fly(dataOperationControlVerdict2);
                }
              },
              resolveDataOperationControlValue26(
                filterDataOperationControlDeny2,
                resolveDataOperationControlValue27(
                  total2,
                  dataOperationControlVerdict.random ??
                    ((..._extraArguments: unknown[]) => 1),
                ),
              ),
            );
            return;
          }
          if (rep2.reason !== `conflict` && rep2.status !== 409) {
            dataOperationControlVerdict2.busyOut = true;
            Object.assign(data2, {
              room: `ledger-busy`,
              terminal: true,
              detail: `The document was busy — this change could not be saved after several tries; its text is kept in the tray.`,
            });
          } else {
            reportOperationEvent(`ack.conflictLost`, {
              opId: opId,
              ops: loadDataOperationControlVerdictResult22.ops.length,
              status: typeof rep2.status == `number` ? rep2.status : -1,
              busyTries: dataOperationControlVerdict2.busyTries ?? 0,
            });
            rep2 = resolveDataOperationControlVerdict(rep2);
          }
        }
        let dataOperationControlSure: Dynamic =
          resolveDataOperationControlSure(rep2);
        let enabled27 = false;
        let matchesDataOperationControlSure =
          dataOperationControlSure === null &&
          rep2.verdict === `deny` &&
          (rep2.reason === `gone` || data2.code === `gone`) &&
          typeof data2.object == `string`;
        if (matchesDataOperationControlSure) {
          data2.terminal = true;
        }
        let why3: Dynamic = null;
        if (dataOperationControlSure !== null) {
          let matchesLoadDataOperationControlVerdictResult =
            loadDataOperationControlVerdictResult10 === null &&
            !dataOperationControlSure.sure &&
            !loadDataOperationControlVerdictHandler26();
          if (
            matchesLoadDataOperationControlVerdictResult &&
            (dataOperationControlVerdict2.unbornTries =
              (dataOperationControlVerdict2.unbornTries ?? 0) + 1) < 10
          ) {
            enabled27 = true;
          } else {
            pageStopped(
              matchesLoadDataOperationControlVerdictResult
                ? `unreached`
                : `deleted`,
            );
            why3 =
              loadDataOperationControlVerdictResult10 === `not_governed` ||
              loadDataOperationControlVerdictResult10 === `cmek`
                ? loadDataOperationControlVerdictResult10
                : null;
            Object.assign(
              data2,
              {
                code: `page_gone`,
                was:
                  data2.was ??
                  (rep2.reason === `page_gone` ? data2.code : rep2.reason),
              },
              loadDataOperationControlVerdictResult10 === `unreached`
                ? {
                    terminal: true,
                    why: `unreached`,
                    detail: DataOperationControlWhy2,
                  }
                : why3 === null
                  ? {
                      terminal: true,
                      why: `deleted`,
                      detail: DataOperationControlPageGone,
                    }
                  : {
                      terminal: true,
                      why: why3,
                      detail: resolveDataOperationControlWhy2(),
                    },
            );
            if (rep2.reason !== `page_gone`) {
              rep2 = {
                ...rep2,
                reason: `page_gone`,
                data: data2,
              };
            }
          }
        }
        if (pageBusyOf2 !== null && dataOperationControlSure === null) {
          let tries: Dynamic = (dataOperationControlVerdict2.pageBusy ?? 0) + 1;
          dataOperationControlVerdict2.pageBusy = tries;
          let rateLimitedOf2: Dynamic = rateLimitedOf(rep2);
          let waitMs: Dynamic =
            rateLimitedOf2 === null
              ? resolveDataOperationControlRound3(
                  tries,
                  pageBusyOf2,
                  dataOperationControlVerdict.random ??
                    ((..._extraArguments: unknown[]) => 1),
                )
              : Math.min(
                  RATE_LIMITED_CAP_MS,
                  Math.max(
                    rateLimitedOf2,
                    resolveDataOperationControlRound3(
                      tries,
                      pageBusyOf2,
                      dataOperationControlVerdict.random ??
                        ((..._extraArguments: unknown[]) => 1),
                    ),
                  ),
                );
          if (rateLimitedOf2 !== null) {
            dataOperationControlVerdict2.rateHeld =
              (dataOperationControlVerdict2.rateHeld ?? 0) + waitMs;
          }
          let pure = !this.troubled();
          if (resolveDataOperationControlValue19(rep2)) {
            if (
              isDataOperationControlDeny22 &&
              dataOperationControlVerdict2.lost !== true
            ) {
              dataOperationControlVerdict2.unknownLost = true;
            } else {
              if (!isDataOperationControlDeny22) {
                dataOperationControlVerdict2.unknownLost = false;
              }
            }
            dataOperationControlVerdict2.lost = true;
          }
          judged(record5, rep2, `retried`, state2());
          reportOperationEvent(`write.pageBusy`, {
            opId: dataOperationControlVerdict2.opId,
            tries: tries,
            waitMs: waitMs,
            askedMs: rateLimitedOf2 ?? pageBusyOf2,
            pure: pure,
            ...(isDataOperationControlDeny22
              ? {
                  unknown: dataOperationControlVerdict2.unknownTries,
                }
              : {}),
            ...(rateLimitedOf2 === null
              ? {}
              : {
                  rate: true,
                }),
          });
          this.slow = true;
          if (resolveDataOperationControlAllow(rep2) !== null) {
            this.unsayBusy();
            this.emit({
              t: `state`,
              node: this.node,
              state: `saving`,
              words: DataOperationControlMessage2,
              storeShed: true,
            });
          } else if (pure) {
            this.busySaid = true;
            this.emit({
              t: `state`,
              node: this.node,
              state: `saving`,
              pageBusy: true,
              ...(isDataOperationControlDeny22
                ? {
                    unknown: true,
                  }
                : tries > 1
                  ? {
                      words: DataOperationControlMessage3,
                    }
                  : {}),
            });
          } else {
            let words =
              dataOperationControlVerdict2.tries > 0 ||
              dataOperationControlVerdict2.lost === true
                ? dataOperationControlVerdict2.tries > 2
                  ? DataOperationControlMessage14
                  : DataOperationControlMessage13
                : (dataOperationControlVerdict2.busyTries ?? 0) > 0
                  ? (dataOperationControlVerdict2.busyTries ?? 0) > 2
                    ? DataOperationControlMessage8
                    : undefined
                  : DataOperationControlMessage13;
            this.unsayBusy();
            this.emit({
              t: `state`,
              node: this.node,
              state: `saving`,
              ...(words === undefined
                ? {}
                : {
                    words: words,
                  }),
            });
          }
          if (!this.served && this.stuckReplay()) {
            this.read(undefined);
          }
          this.retryTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.retryTimer = null;
              if (!enabled && !this.dead) {
                this.fly(dataOperationControlVerdict2);
              }
            },
            waitMs,
          );
          return;
        }
        let number2 = Number(data2.retryAfterMs ?? rep2.retryAfterMs);
        let refusalClass2: Dynamic = refusalClass();
        let classify2: Dynamic =
          refusalClass2 === null || rep2.verdict === `allow`
            ? null
            : refusalClass2.classify(rep2, {
                road: `write`,
                verb: `update`,
                seated: loadDataOperationControlVerdictHandler26(),
                replayed: dataOperationControlVerdict2.replayed,
                kStart: record4.kStart,
                node: this.node,
                lost: dataOperationControlVerdict2.lost === true,
              });
        let matchesClassify =
          classify2 !== null &&
          (classify2.k === `transient` || classify2.k === `lost`);
        if (
          classify2?.k === `page_terminal` &&
          classify2.source !== `relay` &&
          classify2.source !== `http` &&
          (classify2.face === `not_governed` || classify2.face === `cmek`)
        ) {
          pageStopped(classify2.face);
          Object.assign(data2, {
            terminal: true,
            detail: resolveDataOperationControlWhy2(),
          });
        }
        let matchesK =
          classify2?.k === `rehandshake` && classify2.reason === `forbidden`;
        let enabled28 = false;
        if (
          ((classify2?.k === `bounded` &&
            classify2.reason !== `conflict` &&
            classify2.reason !== `page_gone`) ||
            matchesK) &&
          dataOperationControlVerdict2.boundOut !== true
        ) {
          if (!matchesK && enabled18 && index3 >= refusalClass2.BREAKER_N) {
            dataOperationControlVerdict2.tries += 1;
            dataOperationControlVerdict2.triesBase =
              dataOperationControlVerdict2.tries;
            dataOperationControlVerdict2.boundTries = 0;
            this.inflight = null;
            this.queue.unshift(dataOperationControlVerdict2);
            emit5(
              `refusing`,
              `${String(data2.was ?? classify2.sub ?? classify2.reason)} (the probe row, refused again)`,
            );
            return;
          }
          let total2: Dynamic =
            (dataOperationControlVerdict2.boundTries ?? 0) + 1;
          if (total2 <= (matchesK && enabled18 ? 0 : classify2.max)) {
            dataOperationControlVerdict2.boundTries = total2;
            enabled28 = true;
          } else if (matchesK) {
            dataOperationControlVerdict2.boundTries = 0;
            this.inflight = null;
            this.queue.unshift(dataOperationControlVerdict2);
            emit5(
              `signed_out`,
              `${String(data2.was ?? classify2.sub ?? classify2.reason)} ×${total2}`,
            );
            return;
          } else {
            dataOperationControlVerdict2.boundOut = true;
            data2.terminal = true;
          }
        }
        if (
          (refusalClass2 === null
            ? enabled27 ||
              rep2.verdict === `unreachable` ||
              (rep2.verdict !== `allow` &&
                (number2 >= 0 ||
                  /unavailable|busy|rate[-_ ]?limit/.test(
                    String(data2.code ?? rep2.reason),
                  ) ||
                  data2.transient === true ||
                  rep2.transient === true))
            : enabled27 || enabled28 || matchesClassify) &&
          dataOperationControlVerdict2.busyOut !== true
        ) {
          if (
            rep2.verdict === `unreachable` ||
            resolveDataOperationControlValue19(rep2)
          ) {
            dataOperationControlVerdict2.lost = true;
          }
          dataOperationControlVerdict2.unknownLost = false;
          let difference: Dynamic =
            dataOperationControlVerdict2.tries -
            (dataOperationControlVerdict2.triesBase ?? 0);
          if (
            matchesClassify &&
            difference >= (enabled18 ? 0 : classify2.max)
          ) {
            dataOperationControlVerdict2.tries += 1;
            dataOperationControlVerdict2.triesBase =
              dataOperationControlVerdict2.tries;
            this.inflight = null;
            this.queue.unshift(dataOperationControlVerdict2);
            emit5(
              `unreached`,
              `${classify2.reason}${classify2.sub === undefined ? `` : `/${classify2.sub}`} ×${difference}`,
            );
            return;
          }
          if (
            classify2?.k === `transient` &&
            classify2.redial &&
            !enabled19 &&
            difference + 1 >= refusalClass2.REDIAL_AT &&
            dataOperationControlVerdict.redial
          ) {
            enabled19 = true;
            dataOperationControlVerdict.redial();
          }
          if (
            rep2.reopens === true &&
            !this.nodeGone &&
            (resolveDataOperationControlSome3(dataOperationControlVerdict2) ||
              isDataOperationControlBatchesDone(dataOperationControlVerdict2))
          ) {
            judged(record5, rep2, `moored`, state2());
            dataOperationControlVerdict2.tries += 1;
            this.emit(
              kind === null
                ? {
                    t: `state`,
                    node: this.node,
                    state: `saving`,
                    words:
                      dataOperationControlVerdict2.tries > 2
                        ? DataOperationControlMessage14
                        : DataOperationControlMessage13,
                  }
                : loadDataOperationControlVerdictHandler25(this.node),
            );
            this.moor(dataOperationControlVerdict2);
            return;
          }
          let amount: Dynamic =
            rep2.hung === true &&
            dataOperationControlVerdict2.late?.b === batchesDone
              ? dataOperationControlValue8000 / 2
              : resolveDataOperationControlValue26(
                  Math.max(
                    number2,
                    enabled28 && classify2?.k === `bounded`
                      ? classify2.floorMs
                      : 0,
                  ),
                  resolveDataOperationControlRound2(
                    Math.min(
                      dataOperationControlValue5000,
                      dataOperationControlValue1000 *
                        2 ** dataOperationControlVerdict2.tries,
                    ),
                    dataOperationControlVerdict.random ??
                      ((..._extraArguments: unknown[]) => 1),
                  ),
                );
          judged(record5, rep2, `retried`, state2());
          dataOperationControlVerdict2.tries += 1;
          this.slow = true;
          let rowsDone: Dynamic = data2.rowsDone ?? data2.rows_done;
          let rowsTotal: Dynamic = data2.rowsTotal ?? data2.rows_total;
          let matchesCondition =
            typeof rowsTotal == `number` &&
            `Server is loading this document (${String(rowsDone)}/${rowsTotal})\u2026`;
          let matchesDataOperationControlAllow =
            resolveDataOperationControlAllow(rep2) !== null;
          let words =
            matchesCondition ||
            (dataOperationControlVerdict2.tries > 2
              ? DataOperationControlMessage14
              : matchesDataOperationControlAllow
                ? `Having trouble saving — retrying…`
                : DataOperationControlMessage13);
          this.emit(
            kind === null
              ? {
                  t: `state`,
                  node: this.node,
                  state: `saving`,
                  words: words,
                  ...(matchesDataOperationControlAllow
                    ? {
                        storeShed: true,
                      }
                    : {}),
                }
              : loadDataOperationControlVerdictHandler25(this.node),
          );
          if (!this.served && this.stuckReplay()) {
            this.read(undefined);
          }
          dataOperationControlVerdict2.parked = true;
          if (classify2 !== null && this.retryTimer !== null) {
            dataOperationControlVerdict.timers.clearTimeout(this.retryTimer);
          }
          this.retryTimer = dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.retryTimer = null;
              if (
                !enabled &&
                !this.dead &&
                !this.parkIfDown(dataOperationControlVerdict2)
              ) {
                this.fly(dataOperationControlVerdict2);
              }
            },
            amount,
          );
          return;
        }
        let dataOperationControlEvery: Dynamic =
          resolveDataOperationControlEvery(
            collectDataOperationControlValue(
              Array.isArray(data2.results) ? data2.results : [],
            ),
            loadDataOperationControlVerdictResult22.from,
            record4.ops.length,
          );
        let uniqueItems7: Dynamic = new (Set as Dynamic)(
          rep2.verdict === `allow`
            ? resolveDataOperationControlForEach(
                Array.isArray(data2.results) ? data2.results : [],
                loadDataOperationControlVerdictResult22.from,
                record4.ops.length,
              )
            : [],
        );
        let mappedDataOperationControlEvery: Dynamic =
          dataOperationControlEvery.map(
            (
              dataOperationControlEvery2?: Dynamic,
              index5?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              if (
                rep2.verdict !== `allow` ||
                !dataOperationControlVerdict2.editorSaid ||
                uniqueItems7.has(index5) ||
                (isPlainRecord(dataOperationControlEvery2) &&
                  dataOperationControlEvery2.changed === false)
              )
                return dataOperationControlEvery2;
              let [minted, setMinted]: Dynamic = [
                predicted[index5] ?? [],
                dataOperationControlVerdict2.editorSaid[
                  record4.kStart + index5
                ] ?? [],
              ];
              return minted.length === 0 ||
                resolveDataOperationControlFlatMap2(
                  dataOperationControlEvery2?.minted,
                ).length > 0 ||
                (minted.length === setMinted.length &&
                  minted.every(
                    (
                      minted2?: Dynamic,
                      index6?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => minted2 === setMinted[index6],
                  ))
                ? dataOperationControlEvery2
                : Object.assign(
                    {},
                    isPlainRecord(dataOperationControlEvery2)
                      ? dataOperationControlEvery2
                      : {},
                    {
                      minted: minted,
                    },
                  );
            },
          );
        let filteredFlat: Dynamic = [
          rep2.notes,
          data2.notes,
          rep2.notices,
          data2.notices,
        ]
          .flat()
          .filter(isPlainRecord);
        let resolveDataOperationControlMinted32: Dynamic = (
          dataOperationControlVerdict3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          isPlainRecord(record4.ops[dataOperationControlVerdict3]) &&
          record4.ops[dataOperationControlVerdict3].each === true &&
          resolveDataOperationControlMinted3(
            dataOperationControlEvery[dataOperationControlVerdict3],
          );
        let uniqueItems8: Dynamic = new (Set as Dynamic)(
          filteredFlat.flatMap(
            (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              if (
                !(
                  dataOperationControlSet13.has(String(error.code)) &&
                  error.rehomed !== true &&
                  typeof error.opIndex == `number` &&
                  error.opIndex >= 0 &&
                  error.opIndex <
                    loadDataOperationControlVerdictResult22.from.length
                )
              )
                return [];
              let dataOperationControlValue17: Dynamic =
                resolveDataOperationControlValue17(
                  loadDataOperationControlVerdictResult22.from,
                  error.opIndex,
                );
              return resolveDataOperationControlMinted32(
                dataOperationControlValue17,
              )
                ? []
                : [dataOperationControlValue17];
            },
          ),
        );
        let some: Dynamic = dataOperationControlEvery.some(
          (
            dataOperationControlEvery2?: Dynamic,
            index5?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            !uniqueItems8.has(index5) &&
            resolveDataOperationControlMinted3(dataOperationControlEvery2),
        );
        let some2: Dynamic = mappedDataOperationControlEvery.some(
          (
            mappedDataOperationControlEvery3?: Dynamic,
            index5?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            !uniqueItems8.has(index5) &&
            resolveDataOperationControlMinted3(
              mappedDataOperationControlEvery3,
            ),
        );
        let uniqueItems9: Dynamic = new (Set as Dynamic)();
        let flatMap: Dynamic = filteredFlat.flatMap(
          (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            if (!dataOperationControlSet16.has(String(error.code))) return [];
            let stringify = JSON.stringify(error);
            return uniqueItems9.has(stringify)
              ? []
              : (uniqueItems9.add(stringify),
                typeof error.opIndex == `number` &&
                error.opIndex >= 0 &&
                error.opIndex <
                  loadDataOperationControlVerdictResult22.from.length
                  ? [
                      {
                        ...error,
                        opIndex:
                          record4.kStart +
                          resolveDataOperationControlValue17(
                            loadDataOperationControlVerdictResult22.from,
                            error.opIndex,
                          ),
                      },
                    ]
                  : [error]);
          },
        );
        for (let error of filteredFlat as Dynamic)
          if (
            (error.code === `anchor_gone` || error.code === `anchor_dead`) &&
            error.rehomed !== true &&
            typeof error.opIndex == `number` &&
            error.opIndex >= 0 &&
            error.opIndex <
              loadDataOperationControlVerdictResult22.from.length &&
            uniqueItems8.has(
              resolveDataOperationControlValue17(
                loadDataOperationControlVerdictResult22.from,
                error.opIndex,
              ),
            )
          ) {
            flatMap.push({
              code: `block_dead`,
              ids: error.ids,
              opIndex:
                record4.kStart +
                resolveDataOperationControlValue17(
                  loadDataOperationControlVerdictResult22.from,
                  error.opIndex,
                ),
              buried: true,
            });
          }
        if (flatMap.length > 0) {
          ((dataOperationControlVerdict2.notices ??= []).push as Dynamic)(
            ...flatMap,
          );
        }
        if (rep2.verdict === `allow`)
          for (let operation of (Array.isArray(data2.filled)
            ? data2.filled
            : Array.isArray(rep2.filled)
              ? rep2.filled
              : []
          ).slice(0, dataOperationControlValue256) as Dynamic) {
            let label6 =
              isPlainRecord(operation) &&
              typeof operation.ref == `string` &&
              operation.ref !== ``
                ? resolveEditorExtensionsTrim(operation.label)
                : null;
            if (
              label6 !== null &&
              isPlainRecord(operation) &&
              typeof operation.op == `number` &&
              Number.isInteger(operation.op) &&
              operation.op >= 0 &&
              operation.op < loadDataOperationControlVerdictResult22.from.length
            ) {
              (dataOperationControlVerdict2.filled ??= []).push({
                op:
                  record4.kStart +
                  resolveDataOperationControlValue17(
                    loadDataOperationControlVerdictResult22.from,
                    operation.op,
                  ),
                ref: operation.ref,
                label: label6,
              });
            }
          }
        let some3: Dynamic = record4.ops.some(
          (operation?: Dynamic, ..._extraArguments: unknown[]) =>
            operation.op === `insert` || operation.op === `replace`,
        );
        let resolveDataOperationControlAnchorGone2: Dynamic = (
          error?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          (error.code === `block_dead` || error.code === `already_gone`) &&
          !resolveDataOperationControlAnchorGone(error) &&
          Array.isArray(error.ids);
        let gone: Dynamic = filteredFlat.find(
          (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            dataOperationControlSet15.has(String(error.code)) ||
            ((error.code === `anchor_gone` || error.code === `anchor_dead`) &&
              error.rehomed !== true) ||
            resolveDataOperationControlAnchorGone2(error),
        );
        let some4: Dynamic = filteredFlat.some(
          resolveDataOperationControlAnchorGone,
        );
        let replayed2: Dynamic =
          dataOperationControlVerdict2.replayed ||
          dataOperationControlVerdict2.lost === true ||
          dataOperationControlVerdict2.tries > 0;
        let resolveDataOperationControlMinted33: Dynamic = (
          dataOperationControlVerdict3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          typeof dataOperationControlVerdict3.opIndex == `number` &&
          dataOperationControlVerdict3.opIndex >= 0 &&
          dataOperationControlVerdict3.opIndex <
            loadDataOperationControlVerdictResult22.from.length &&
          resolveDataOperationControlMinted32(
            resolveDataOperationControlValue17(
              loadDataOperationControlVerdictResult22.from,
              dataOperationControlVerdict3.opIndex,
            ),
          );
        let matchesChanged: Dynamic =
          data2.changed === false ||
          rep2.changed === false ||
          filteredFlat.some(
            (error?: Dynamic, ..._extraArguments: unknown[]) =>
              error.code === `no_op` &&
              !resolveDataOperationControlMinted33(error),
          );
        let some5: Dynamic = dataOperationControlEvery.some(
          (
            dataOperationControlEvery2?: Dynamic,
            index5?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            isPlainRecord(dataOperationControlEvery2) &&
            dataOperationControlEvery2.changed === false &&
            [`insert`, `replace`].includes(String(record4.ops[index5]?.op)),
        );
        let matchesVerdict2: Dynamic =
          rep2.verdict === `allow` &&
          rep2.replayed !== true &&
          some3 &&
          !some &&
          !some4 &&
          (gone !== undefined || some5 || (matchesChanged && !replayed2));
        let enabled29: Dynamic =
          (!some2 && !some4) ||
          filteredFlat.some(
            (error?: Dynamic, ..._extraArguments: unknown[]) =>
              error.code === `unchanged`,
          );
        let matchesChanged2: Dynamic = matchesChanged && !matchesVerdict2;
        let matchesChanged3: Dynamic =
          matchesChanged2 &&
          rep2.verdict === `allow` &&
          rep2.replayed !== true &&
          !replayed2 &&
          !some3 &&
          !some &&
          !some4 &&
          record4.ops.length > 0 &&
          record4.ops.every(
            (operation?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              dataOperationControlSet14.has(String(operation.op)),
          );
        let matchesVerdict3: Dynamic =
          rep2.verdict === `allow` &&
          rep2.replayed !== true &&
          !matchesChanged2 &&
          ((enabled29 && predicted.flat().length > 0) || matchesVerdict2);
        if (rep2.verdict === `allow` && !matchesVerdict3) {
          judged(record5, rep2, `landed`, state2());
        }
        if (rep2.verdict !== `allow` || matchesVerdict3) {
          let label6 = `${String(data2.detail)} ${String(rep2.detail)}`;
          let enabled30 =
            !matchesVerdict3 &&
            resolveDataOperationControlIdInvalid(rep2, data2);
          if (enabled30 && typeof data2.why != `string`) {
            let matchItem2 = /\bproposed ids: ([a-z_]+)/.exec(label6)?.[1];
            if (matchItem2 !== undefined) {
              data2.why = matchItem2;
            }
          }
          if (
            enabled30 &&
            data2.next_free === undefined &&
            rep2.next_free !== undefined
          ) {
            data2.next_free = rep2.next_free;
          }
          let filteredMinted: Dynamic =
            enabled30 && data2.why === `required` && Array.isArray(data2.minted)
              ? data2.minted.filter(
                  (minted?: unknown, ..._extraArguments: unknown[]) =>
                    typeof minted == `string`,
                )
              : [];
          let enabled31 =
            !dataOperationControlVerdict2.replayed &&
            record4.kStart === 0 &&
            !matchesVerdict3;
          if (
            filteredMinted.length > 0 &&
            enabled31 &&
            dataOperationControlVerdict2.rewidened !== true
          ) {
            let opIndex5: Dynamic =
              typeof data2.opIndex == `number`
                ? data2.opIndex
                : Number(/^ops\[(\d+)\]/.exec(label6)?.[1] ?? 0);
            let total2: Dynamic =
              record4.kStart +
              resolveDataOperationControlValue17(
                loadDataOperationControlVerdictResult22.from,
                Number.isInteger(opIndex5) &&
                  opIndex5 >= 0 &&
                  opIndex5 < loadDataOperationControlVerdictResult22.ops.length
                  ? opIndex5
                  : 0,
              );
            let opItem3: Dynamic = dataOperationControlVerdict2.ops[total2];
            let dataOperationControlHeader: Dynamic =
              opItem3 === undefined
                ? null
                : resolveDataOperationControlHeader(opItem3, filteredMinted);
            let editorExtensionsSess3: Dynamic =
              dataOperationControlHeader &&
              isPlainRecord(dataOperationControlHeader.ids)
                ? resolveEditorExtensionsSess(
                    String(dataOperationControlHeader.ids.from),
                  )
                : null;
            let label7: Dynamic =
              dataOperationControlVerdict.session.get()?.label;
            if (
              dataOperationControlHeader &&
              editorExtensionsSess3 &&
              label7 !== undefined &&
              editorExtensionsSess3.sess === label7
            ) {
              let difference2 =
                editorExtensionsSess3.i + Number(opItem3.ids.count) - 1;
              let difference3 =
                editorExtensionsSess3.i +
                Number(dataOperationControlHeader.ids.count) -
                1;
              let lookup3: Dynamic = new (Map as Dynamic)();
              for (let loadDataOperationControlVerdictResult25 of [
                ...dataOperationControlVerdict2.predicted
                  .slice(total2 + 1)
                  .flat(),
                ...dataOperationControlVerdict2.ops
                  .slice(total2 + 1)
                  .flatMap(
                    (
                      opsSlice?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      resolveDataOperationControlFlatMap2([
                        opsSlice.id,
                        isPlainRecord(opsSlice.ids)
                          ? opsSlice.ids.from
                          : opsSlice.ids,
                      ]),
                  ),
              ] as Dynamic) {
                let dataOperationControlStartsWith: Dynamic =
                  resolveDataOperationControlStartsWith(
                    loadDataOperationControlVerdictResult25,
                    label7,
                  );
                if (dataOperationControlStartsWith > difference2) {
                  lookup3.set(
                    loadDataOperationControlVerdictResult25,
                    resolveEditorExtensionsValue22(
                      label7,
                      dataOperationControlStartsWith + filteredMinted.length,
                    ),
                  );
                }
              }
              if (lookup3.size > 0) {
                dataOperationControlVerdict2.editorSaid ??=
                  dataOperationControlVerdict2.predicted;
              }
              dataOperationControlVerdict2.ops = getDataOperationControlSize(
                dataOperationControlVerdict2.ops,
                lookup3,
              ).map(
                (
                  dataOperationControlSize?: Dynamic,
                  index5?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  index5 === total2
                    ? dataOperationControlHeader
                    : dataOperationControlSize,
              );
              dataOperationControlVerdict2.predicted =
                getDataOperationControlSize(
                  dataOperationControlVerdict2.predicted,
                  lookup3,
                );
              dataOperationControlVerdict2.homes &&=
                getDataOperationControlSize(
                  dataOperationControlVerdict2.homes,
                  lookup3,
                );
              let hwm = difference3;
              for (let loadDataOperationControlVerdictResult25 of [
                this,
                ...[...lookup.values()].filter(
                  (item3?: Dynamic, ..._extraArguments: unknown[]) =>
                    item3 !== this,
                ),
              ] as Dynamic)
                hwm = Math.max(
                  hwm,
                  loadDataOperationControlVerdictResult25.bump(label7, hwm),
                );
              let sessionEntry: Dynamic =
                dataOperationControlVerdict.session.get();
              if (hwm > sessionEntry.hwm) {
                dataOperationControlVerdict.session.set({
                  ...sessionEntry,
                  hwm: hwm,
                });
              }
              emit8();
              dataOperationControlVerdict2.rewidened = true;
              trim(this, dataOperationControlVerdict2);
              reportOperationEvent(`deny.required.rewiden`, {
                opId: dataOperationControlVerdict2.opId,
                k: total2,
                pads: filteredMinted.length,
                from: String(dataOperationControlHeader.ids.from),
                count: Number(dataOperationControlHeader.ids.count),
                shifted: lookup3.size,
              });
              judged(record5, rep2, `rewiden`, state2());
              this.fly(dataOperationControlVerdict2);
              return;
            }
          }
          let matchesFilteredMintedCount: Dynamic =
            filteredMinted.length > 0 &&
            enabled31 &&
            record4.ops.some(resolveDataOperationControlInline);
          let enabled32: Dynamic =
            enabled30 &&
            !dataOperationControlVerdict2.replayed &&
            record4.kStart === 0 &&
            ((typeof data2.why == `string` &&
              dataOperationControlSet17.has(data2.why)) ||
              matchesFilteredMintedCount);
          let editorExtensionsSess: Dynamic =
            typeof data2.got == `string`
              ? resolveEditorExtensionsSess(data2.got)
              : null;
          let editorExtensionsSess2: Dynamic =
            typeof data2.next_free == `string`
              ? resolveEditorExtensionsSess(data2.next_free)
              : null;
          let matchesWhy2 =
            data2.why === `used` &&
            !!editorExtensionsSess &&
            !!editorExtensionsSess2 &&
            editorExtensionsSess.sess === editorExtensionsSess2.sess &&
            editorExtensionsSess2.i <= editorExtensionsSess.i;
          let enabled33 =
            !matchesVerdict3 &&
            ((enabled30 &&
              (data2.why === `used` || data2.why === `gap`) &&
              data2.next_free !== undefined &&
              !matchesWhy2 &&
              !enabled26) ||
              (rep2.reason === `index_gap` &&
                [data2.nextIndex, rep2.nextIndex].some(
                  (item3?: unknown, ..._extraArguments: unknown[]) =>
                    typeof item3 == `number`,
                )));
          let enabled34 = enabled33 && !this.recounting;
          this.recounting = enabled33;
          let atItem =
            Array.isArray(data2.at) && typeof data2.at[2] == `number`
              ? data2.at[2]
              : undefined;
          let dataOperationControlValue17: Dynamic =
            atItem === undefined
              ? undefined
              : resolveDataOperationControlValue17(
                  loadDataOperationControlVerdictResult22.from,
                  atItem,
                );
          let matchItem = /^ops\[(\d+)\]/.exec(
            [data2.detail, rep2.detail].find(
              (item3?: unknown, ..._extraArguments: unknown[]) =>
                typeof item3 == `string`,
            ) ?? ``,
          )?.[1];
          let dataOperationControlValue172: Dynamic =
            matchItem !== undefined &&
            Number(matchItem) <
              loadDataOperationControlVerdictResult22.ops.length
              ? resolveDataOperationControlValue17(
                  loadDataOperationControlVerdictResult22.from,
                  Number(matchItem),
                )
              : undefined;
          let dataOperationControlValue173: Dynamic =
            typeof data2.opIndex == `number`
              ? resolveDataOperationControlValue17(
                  loadDataOperationControlVerdictResult22.from,
                  data2.opIndex,
                )
              : undefined;
          if (dataOperationControlValue173 !== undefined) {
            data2.opIndex = dataOperationControlValue173;
          }
          let opIndex: Dynamic =
            record4.kStart +
            (dataOperationControlValue173 ??
              dataOperationControlValue17 ??
              dataOperationControlValue172 ??
              0);
          let room = matchesVerdict3
            ? `not_applied`
            : dataOperationControlVerdict2.busyOut === true
              ? `busy`
              : String(rep2.reason ?? `denied`);
          if (matchesVerdict3 && matchesVerdict2) {
            Object.assign(data2, {
              notTaken: true,
              room: String(gone?.code ?? `no_op`),
              ...(gone
                ? {
                    gone: gone,
                  }
                : {}),
            });
          }
          let enabled35 =
            !matchesVerdict3 &&
            (room === `guard_mismatch` ||
              room === `stale` ||
              room === `rev_mismatch` ||
              room === `guard` ||
              data2.problem === `missing_guard` ||
              room === `missing_guard`);
          let resolveDataOperationControlBlocks42: Dynamic = (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveDataOperationControlChars4(dataOperationControlVerdict3) ||
            resolveDataOperationControlBlocks4(dataOperationControlVerdict3);
          let difference: Dynamic = opIndex - record4.kStart;
          let opIndex2: Dynamic =
            typeof data2.block == `string`
              ? record4.ops.findIndex(
                  (op2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    resolveDataOperationControlBlocks42(op2) &&
                    resolveDataOperationControlBlocks3([op2]).includes(
                      data2.block,
                    ),
                )
              : -1;
          let matchesCondition =
            typeof data2.opIndex == `number` ||
            dataOperationControlValue17 !== undefined ||
            dataOperationControlValue172 !== undefined;
          let opItem: Dynamic = matchesCondition
            ? record4.ops[difference]
            : undefined;
          let opIndex3: Dynamic = record4.ops.findIndex(
            (op2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              resolveDataOperationControlChars4(op2),
          );
          let opIndex4: Dynamic = enabled35
            ? opIndex2 >= 0
              ? opIndex2
              : opItem === undefined
                ? opIndex3 >= 0
                  ? opIndex3
                  : record4.ops.findIndex(
                      (op2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                        resolveDataOperationControlBlocks4(op2),
                    )
                : difference
            : difference;
          let opItem2: Dynamic = record4.ops[opIndex4];
          let enabled36: Dynamic =
            enabled35 &&
            opItem2 !== undefined &&
            resolveDataOperationControlBlocks42(opItem2);
          let enabled37 =
            !enabled36 &&
            (room === `unknown_id` || room === `not_minted`) &&
            data2.kind === `blob`;
          let matchesBoundOut =
            dataOperationControlVerdict2.boundOut === true &&
            classify2?.source === "default";
          let reason =
            why3 === null
              ? enabled36
                ? `block_changed`
                : enabled37
                  ? `blob_unknown`
                  : enabled32
                    ? DataOperationControlIdRefused
                    : enabled30
                      ? `id_invalid`
                      : matchesBoundOut
                        ? `server_refused`
                        : room
              : `forbidden`;
          if (enabled30 && room !== `id_invalid`) {
            Object.assign(data2, {
              room: room,
              code: `id_invalid`,
            });
          }
          if (enabled32) {
            Object.assign(data2, {
              room: room,
              code: `id_invalid`,
              terminal: true,
            });
            reportOperationEvent(`deny.id_terminal`, {
              opId: dataOperationControlVerdict2.opId,
              why: String(data2.why),
              room: room,
              verbs: record4.ops
                .map((operation?: Dynamic, ..._extraArguments: unknown[]) =>
                  String(operation.op),
                )
                .join(`,`),
            });
          }
          let matchesLost =
            dataOperationControlVerdict2.lost === true &&
            enabled30 &&
            data2.why === `shape`;
          let hasRoom: Dynamic =
            dataOperationControlSet11.has(room) ||
            dataOperationControlSet11.has(String(data2.code ?? ``));
          let matchesClassify2: Dynamic =
            classify2 !== null &&
            classify2.k === `op_terminal` &&
            classify2.custody === `tray` &&
            (hasRoom || classify2.reason === `unavailable`);
          if (matchesClassify2) {
            data2.terminal = true;
          }
          let test3: Dynamic =
            dataOperationControlIdentifierPattern2.test(room) ||
            dataOperationControlIdentifierPattern2.test(
              String(data2.code ?? ``),
            ) ||
            dataOperationControlVerdict2.busyOut === true ||
            dataOperationControlVerdict2.boundOut === true ||
            matchesLost ||
            enabled32 ||
            matchesDataOperationControlSure ||
            matchesClassify2;
          let enabled38: Dynamic =
            !matchesVerdict3 && resolveDataOperationControlSome2(room, data2);
          let replayed3: Dynamic =
            dataOperationControlVerdict2.replayed ||
            this.remountOut.has(dataOperationControlVerdict2.opId);
          let klass =
            test3 || replayed3 || enabled34
              ? undefined
              : dataOperationControlVerdict2.assert || hasRoom || enabled38
                ? `unsynced`
                : `assert`;
          if (klass === undefined && !enabled34) {
            this.unsettled = true;
          }
          let enabled39: Dynamic =
            enabled37 &&
            record4.ops.some(
              (op2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                let source: Dynamic = isPlainRecord(op2)
                  ? (op2.source ?? op2.with)
                  : undefined;
                return (
                  isPlainRecord(source) &&
                  (source.as === `html` || source.as === `markdown`)
                );
              },
            );
          if (enabled37) {
            Object.assign(data2, {
              room: `${room}:${String(data2.why ?? ``)}`,
            });
            delete data2.why;
            if (enabled39) {
              data2.why = `paste`;
            }
          }
          let kind2: Dynamic = isPlainRecord(opItem2?.target)
            ? opItem2.target.kind
            : undefined;
          if (enabled36) {
            Object.assign(data2, {
              why: kind2 === `chars` ? `erase` : opItem2.op,
              room: room,
            });
          }
          if (
            enabled36 &&
            kind2 === `chars` &&
            Array.isArray(data2.foreign) &&
            data2.foreign.length > 0
          ) {
            Object.assign(data2, {
              need: `foreign`,
            });
          }
          delete data2.self;
          if (
            !enabled36 &&
            !enabled37 &&
            !dataOperationControlVerdict2.replayed &&
            dataOperationControlSet19.has(reason)
          ) {
            let label7: Dynamic =
              dataOperationControlVerdict.session.get()?.label;
            if (label7 !== undefined && data2.by === label7) {
              data2.self = true;
            }
            let op2: Dynamic =
              typeof data2.op == `string` ? data2.op : undefined;
            let op3: Dynamic = isPlainRecord(opItem2) ? opItem2.op : undefined;
            if (
              op2 !== undefined &&
              kind2 === `blocks` &&
              dataOperationControlSet20.has(String(op3)) &&
              data2.why === undefined
            ) {
              data2.why =
                op2 === op3 || (op2 === `remove` && op3 === `delete`)
                  ? `already`
                  : dataOperationControlSet21.has(op2)
                    ? `rearranged`
                    : `removed`;
            }
          }
          let words: Dynamic = [
            data2.detail,
            rep2.detail,
            data2.hint,
            rep2.hint,
            `An edit was refused (${reason}).`,
          ].find(
            (item3?: unknown, ..._extraArguments: unknown[]) =>
              typeof item3 == `string` && item3 !== ``,
          );
          let record6: Dynamic = {};
          for (let loadDataOperationControlVerdictResult25 of [
            `detail`,
            `hint`,
            `layer`,
            `code`,
            `why`,
            `next_free`,
            `nextIndex`,
          ] as Dynamic)
            if (
              rep2[loadDataOperationControlVerdictResult25] !== undefined &&
              data2[loadDataOperationControlVerdictResult25] === undefined
            ) {
              record6[loadDataOperationControlVerdictResult25] =
                rep2[loadDataOperationControlVerdictResult25];
            }
          if (enabled37) {
            delete record6.why;
          }
          delete data2.rescue;
          delete data2.given;
          delete data2.pointed;
          delete data2.recount;
          delete data2.landed;
          let rescue: Dynamic = [];
          if (replayed3) {
            let opsSlice: Dynamic = dataOperationControlVerdict2.ops.slice(
              record4.kStart,
            );
            let dataOperationControlText: Dynamic =
              dataOperationControlSet19.has(reason) ||
              dataOperationControlSet19.has(String(data2.why ?? ``))
                ? resolveDataOperationControlText(
                    opsSlice,
                    dataOperationControlVerdict2.predicted.slice(
                      record4.kStart,
                    ),
                  )
                : null;
            let dataOperationControlChars3: Dynamic = dataOperationControlText
              ? resolveDataOperationControlChars3(opsSlice)
              : [];
            let idsNow: Dynamic =
              dataOperationControlText && dataOperationControlChars3.length > 1
                ? await this.idsNow()
                : null;
            if (
              idsNow &&
              dataOperationControlChars3.every(
                (
                  dataOperationControlChars32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => idsNow.has(dataOperationControlChars32),
              )
            ) {
              idsNow = await this.idsNow(true);
            }
            let filteredDataOperationControlText: Dynamic =
              idsNow && dataOperationControlText
                ? dataOperationControlText.filter(
                    (
                      dataOperationControlText2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => idsNow.has(dataOperationControlText2.afterId),
                  )
                : [];
            let enabled40: Dynamic =
              !!idsNow &&
              dataOperationControlChars3.some(
                (
                  dataOperationControlChars32?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => !idsNow.has(dataOperationControlChars32),
              );
            if (
              idsNow &&
              dataOperationControlText &&
              filteredDataOperationControlText.length > 0 &&
              enabled40
            ) {
              for (let loadDataOperationControlVerdictResult25 of filteredDataOperationControlText as Dynamic) {
                let bid: Dynamic = idsNow.get(
                  loadDataOperationControlVerdictResult25.afterId,
                );
                let ask: Dynamic = {
                  bid: bid,
                  afterId: loadDataOperationControlVerdictResult25.afterId,
                  text: this.foldBehind(
                    bid,
                    loadDataOperationControlVerdictResult25.text,
                    loadDataOperationControlVerdictResult25.ids,
                  ),
                  ...resolveDataOperationControlAuthor(
                    dataOperationControlVerdict2,
                  ),
                };
                this.leftWords.push({
                  ...ask,
                });
                try {
                  dataOperationControlVerdict.wal.stageWords?.(this.node, ask);
                } catch {}
              }
              this.wordsOwed = true;
              rescue = this.keepRescued(
                dataOperationControlText
                  .filter(
                    (
                      dataOperationControlText2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => !idsNow.has(dataOperationControlText2.afterId),
                  )
                  .map(
                    (
                      filteredDataOperationControlText2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => ({
                      bid: null,
                      text: filteredDataOperationControlText2.text,
                    }),
                  ),
                dataOperationControlVerdict2,
                record4.kStart,
              );
            } else if (!(enabled37 && enabled39)) {
              rescue = this.keepRescued(
                updateDataOperationControlBid(
                  opsSlice,
                  dataOperationControlVerdict2.homes,
                ),
                dataOperationControlVerdict2,
                record4.kStart,
              );
            }
          } else if (
            !enabled34 &&
            klass === undefined &&
            !enabled32 &&
            (dataOperationControlIdentifierPattern4.test(room) ||
              dataOperationControlIdentifierPattern4.test(
                String(data2.code ?? ``),
              ) ||
              matchesLost)
          ) {
            rescue = this.keepRescued(
              updateDataOperationControlBid(
                dataOperationControlVerdict2.ops.slice(record4.kStart),
                dataOperationControlVerdict2.homes,
              ),
              dataOperationControlVerdict2,
              record4.kStart,
            );
          }
          let matchesReason =
            reason === `unknown_id` &&
            !dataOperationControlVerdict2.replayed &&
            ((..._extraArguments: unknown[]) => {
              let items3: Dynamic = [];
              collectDataOperationControlContent(
                record4.ops,
                (
                  dataOperationControlVerdict3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => (
                  items3.push(dataOperationControlVerdict3),
                  dataOperationControlVerdict3
                ),
              );
              return (
                items3.length > 0 &&
                !items3.some(
                  (
                    rolldownNImport2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    this.proposedEver.has(rolldownNImport2) &&
                    !this.grantedEver.has(rolldownNImport2) &&
                    !dataOperationControlVerdict2.predicted.some(
                      (
                        predicted3?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => predicted3.includes(rolldownNImport2),
                    ),
                )
              );
            })();
          let ids: Dynamic = ((..._extraArguments: unknown[]): Dynamic => {
            if (
              !matchesReason ||
              reason !== `unknown_id` ||
              data2.why !== `not_minted`
            )
              return [];
            let filteredIds: Dynamic = Array.isArray(data2.ids)
              ? data2.ids.filter(
                  (id?: unknown, ..._extraArguments: unknown[]) =>
                    typeof id == `string`,
                )
              : null;
            let filteredItems: Dynamic =
              filteredIds === null
                ? [record4.ops[difference]].filter(
                    (item3?: Dynamic, ..._extraArguments: unknown[]) =>
                      item3 !== undefined,
                  )
                : record4.ops;
            if (
              record4.ops.some(
                (event?: Dynamic, ..._extraArguments: unknown[]) =>
                  event.op !== `insert` ||
                  !isPlainRecord(event.target) ||
                  event.target.kind !== `blocks`,
              )
            )
              return [];
            let items3: Dynamic = [];
            for (let event of filteredItems as Dynamic) {
              let target: Dynamic = event.target;
              if (!Array.isArray(target.ids)) return [];
              for (let loadDataOperationControlVerdictResult25 of target.ids as Dynamic)
                if (
                  typeof loadDataOperationControlVerdictResult25 == `string` &&
                  (filteredIds === null ||
                    filteredIds.includes(
                      loadDataOperationControlVerdictResult25,
                    ))
                ) {
                  items3.push(loadDataOperationControlVerdictResult25);
                }
            }
            return items3;
          })();
          if (ids.length > 0) {
            Object.assign(data2, {
              gone: {
                code: `block_dead`,
                ids: ids,
              },
            });
          }
          let record7: Dynamic =
            dataOperationControlVerdict2.replayed && data2.need === undefined
              ? {
                  need: `earlier_life`,
                }
              : {};
          let landed: Dynamic =
            record4.kStart > 0
              ? {
                  count: record4.kStart,
                  rev: dataOperationControlVerdict2.rev,
                  results: dataOperationControlVerdict2.results.slice(
                    0,
                    record4.kStart,
                  ),
                  ...((
                    padded?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    padded.length > 0
                      ? {
                          padded: padded,
                        }
                      : {})(
                    (dataOperationControlVerdict2.padded ?? []).filter(
                      (padded?: Dynamic, ..._extraArguments: unknown[]) =>
                        padded < record4.kStart,
                    ),
                  ),
                  ...((
                    flown?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    flown.length > 0
                      ? {
                          flown: flown,
                        }
                      : {})(
                    (dataOperationControlVerdict2.flown ?? []).filter(
                      ([flown]: Dynamic, ..._extraArguments: unknown[]) =>
                        flown < record4.kStart,
                    ),
                  ),
                }
              : undefined;
          if (landed) {
            this.tookMine(dataOperationControlVerdict2);
          }
          if (
            landed &&
            isDataOperationControlRevive(
              dataOperationControlVerdict2.ops.slice(0, landed.count),
              landed.results,
            )
          ) {
            this.freshen();
          }
          if (klass !== undefined) {
            console.error(
              `opTransport: zero_error_fallback — the room refused ${dataOperationControlVerdict2.assert ? `an ASSERT` : `an edit`} of this page (${room}${data2.why === undefined ? `` : `/${String(data2.why)}`}${hasRoom ? `, a LAW this page should have pre-checked` : ``}${landed ? `; update ${batchesDone + 1} of a cut send — the ${landed.count} op(s) of updates 1..${batchesDone} LANDED (rev ${landed.rev}) and stay` : ``}); ${ids.length > 0 ? `the block it names ended at the room: the editor follows that, its words going on in a paragraph of their own at its place` : klass === `assert` ? `the editor keeps it and asserts its blocks` : `the page keeps its text unsynced`} — no re-read, no re-seat, no sentence`,
              dataOperationControlVerdict2.opId,
            );
            this.zeroErrored({
              opId: dataOperationControlVerdict2.opId,
              klass: klass,
              reason: room,
              room: [data2.why, data2.problem, data2.code].find(
                (item3?: unknown, ..._extraArguments: unknown[]) =>
                  typeof item3 == `string`,
              ),
              ...(hasRoom
                ? {
                    law: String(data2.limit ?? data2.dim ?? room),
                  }
                : {}),
              ops: record4.ops,
              opIndex: opIndex,
            });
          }
          let filteredNotices: Dynamic = (
            dataOperationControlVerdict2.notices ?? []
          ).filter(
            (error?: Dynamic, ..._extraArguments: unknown[]) =>
              error.code === `revive_short`,
          );
          let record8: Dynamic = {
            ...record6,
            ...data2,
            ...record7,
          };
          if (!matchesVerdict3) {
            judged(
              record5,
              rep2,
              dataOperationControlSure === null
                ? enabled34
                  ? `recount`
                  : (klass ?? `trayed`)
                : `page_gone`,
              state2(),
            );
          }
          this.trayMovedBehind(dataOperationControlVerdict2);
          this.emit({
            t: `deny`,
            node: this.node,
            opId: dataOperationControlVerdict2.opId,
            reason: reason,
            detail: {
              ...record6,
              ...data2,
              ...record7,
              opIndex: enabled36 ? record4.kStart + opIndex4 : opIndex,
              ...(matchesCondition || enabled36
                ? {
                    pointed: true,
                  }
                : {}),
              words: words,
              ...(rescue.length > 0
                ? {
                    rescue: rescue,
                  }
                : {}),
              ...(matchesReason
                ? {
                    given: true,
                  }
                : {}),
              ...(klass === undefined
                ? {}
                : {
                    zero_error: klass,
                    room_reason: room,
                  }),
              ...(klass !== undefined && hasRoom
                ? {
                    law: true,
                  }
                : {}),
              ...(enabled38
                ? {
                    orphan_node: true,
                  }
                : {}),
              ...(classify2 !== null &&
              (classify2.source === "default" ||
                dataOperationControlVerdict2.boundOut === true ||
                matchesClassify2)
                ? {
                    klass: classify2.k,
                    unclassified: classify2.source === "default",
                  }
                : {}),
              ...(matchesBoundOut
                ? {
                    room_reason: room,
                  }
                : {}),
              ...(dataOperationControlVerdict2.assert
                ? {
                    assert: true,
                  }
                : {}),
              ...(enabled34
                ? {
                    recount: true,
                  }
                : {}),
              ...(enabled26
                ? {
                    unverified: true,
                  }
                : {}),
              ...(landed
                ? {
                    landed: landed,
                  }
                : {}),
              ...(filteredNotices.length > 0 ||
              (Array.isArray(record8.notices) && record8.notices.length > 0)
                ? {
                    notices: [
                      ...(Array.isArray(record8.notices)
                        ? record8.notices
                        : []),
                      ...filteredNotices,
                    ],
                  }
                : {}),
            },
          });
          if (
            klass === undefined &&
            !enabled34 &&
            loadDataOperationControlVerdictResult10 === null &&
            !this.nodeGone
          ) {
            this.owed = this.oweWhole = true;
          }
          if (enabled38) {
            this.orphanLatched = true;
          }
          if (enabled38 && !this.orphanSaid) {
            this.orphanSaid = true;
            reportOperationEvent(`orphan.said`, {
              opId: dataOperationControlVerdict2.opId,
              replayed: dataOperationControlVerdict2.replayed === true,
            });
            resolveDataOperationControlValue10(`orphan_node`);
            try {
              dataOperationControlVerdict.onOrphanNode?.({
                node: this.node,
              });
            } catch {
              reportOperationEvent(`orphan.said.threw`, {
                opId: dataOperationControlVerdict2.opId,
              });
            }
          }
          if (classify2 !== null) {
            reportOperationEvent(`deny.class`, {
              reason: classify2.reason,
              sub: classify2.sub ?? ``,
              klass: classify2.k,
              source: classify2.source,
              road: `write`,
              opId: dataOperationControlVerdict2.opId,
            });
            if (
              classify2.source === "default" &&
              !uniqueItems4.has(classify2.reason)
            ) {
              uniqueItems4.add(classify2.reason);
              console.error(
                `opTransport: deny.class source=default — the door refused with a word this page has no row for ("${classify2.reason}"); bounded ${classify2.k === `bounded` ? classify2.max : 0}× then refused. Add it to refusals.contract.json.`,
              );
            }
          }
          if (
            refusalClass2 !== null &&
            (dataOperationControlVerdict2.boundOut === true ||
              classify2?.source === "default") &&
            ++index3 >= refusalClass2.BREAKER_N
          ) {
            emit5(`refusing`, `${room} ×${index3}`);
          }
          if (!enabled34) {
            this.handBack(dataOperationControlVerdict2, reason, {}, true);
          }
          await this.settleOne(dataOperationControlVerdict2);
          return;
        }
        dataOperationControlVerdict2.batchesDone = batchesDone + 1;
        if ((dataOperationControlVerdict2.rateHeld ?? 0) > 0) {
          [
            dataOperationControlVerdict2.ratePace,
            dataOperationControlVerdict2.rateHeld,
          ] = [
            batchesDone + 1 < cuts.length
              ? Math.min(
                  RATE_LIMITED_CAP_MS,
                  dataOperationControlVerdict2.rateHeld,
                )
              : 0,
            0,
          ];
        }
        this.sessRetries = 0;
        enabled19 = false;
        let matchesProvisional2 = rep2.provisional !== true;
        if (matchesProvisional2) {
          index3 = 0;
          emit6();
          index4 = 0;
        }
        if (kind !== null && (matchesProvisional2 || kind !== `refusing`)) {
          rearmGap(
            matchesProvisional2 ? `a write was taken` : `a burst was relayed`,
            !matchesProvisional2,
          );
        }
        dataOperationControlVerdict2.busyTries = 0;
        dataOperationControlVerdict2.boundTries = 0;
        dataOperationControlVerdict2.busyOut = false;
        if (rep2.provisional === true && typeof rep2.rev != `number`) {
          dataOperationControlVerdict2.provisional = true;
        }
        this.recounting = false;
        for (let [
          loadDataOperationControlVerdictResult25,
          loadDataOperationControlVerdictResult26,
        ] of this.shortRevived as Dynamic)
          if (
            loadDataOperationControlVerdictResult26 &&
            loadDataOperationControlVerdictResult25 !==
              dataOperationControlVerdict2.opId
          ) {
            this.shortRevived.delete(loadDataOperationControlVerdictResult25);
            this.shortGrace.delete(loadDataOperationControlVerdictResult25);
          }
        this.reviveShort(
          dataOperationControlVerdict2,
          record4,
          loadDataOperationControlVerdictResult22.from,
          dataOperationControlEvery,
          filteredFlat,
        );
        (dataOperationControlVerdict2.results.push as Dynamic)(
          ...mappedDataOperationControlEvery,
        );
        for (
          let mappedDataOperationControlEveryCount: Dynamic =
            mappedDataOperationControlEvery.length;
          mappedDataOperationControlEveryCount < record4.ops.length;
          mappedDataOperationControlEveryCount++
        )
          dataOperationControlVerdict2.results.push({});
        if (rep2.verdict === `allow`) {
          for (let index5 = 0; index5 < record4.ops.length; index5++) {
            if (
              !(
                uniqueItems7.has(index5) ||
                index5 >= mappedDataOperationControlEvery.length
              )
            )
              continue;
            (dataOperationControlVerdict2.padded ??= []).push(
              record4.kStart + index5,
            );
            let [items3, setItems]: Dynamic = [
              predicted[index5] ?? [],
              dataOperationControlVerdict2.editorSaid?.[
                record4.kStart + index5
              ],
            ];
            if (
              setItems !== undefined &&
              items3.length > 0 &&
              !(
                items3.length === setItems.length &&
                items3.every(
                  (
                    rolldownRImport2?: Dynamic,
                    index6?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) => rolldownRImport2 === setItems[index6],
                )
              )
            ) {
              (dataOperationControlVerdict2.flown ??= []).push([
                record4.kStart + index5,
                [...items3],
              ]);
            }
          }
          let filteredPaddedCount: Dynamic = (
            dataOperationControlVerdict2.padded ?? []
          ).filter(
            (padded?: Dynamic, ..._extraArguments: unknown[]) =>
              padded >= record4.kStart &&
              padded < record4.kStart + record4.ops.length,
          ).length;
          if (filteredPaddedCount > 0) {
            console.warn(
              `opTransport: padded_ack — an allowed update's answer spoke for ${record4.ops.length - filteredPaddedCount} of its ${record4.ops.length} ops (${filteredPaddedCount} padded${dataOperationControlVerdict2.lost === true || dataOperationControlVerdict2.tries > 0 ? `, a re-send` : ``}${dataOperationControlVerdict2.replayed ? `, replayed` : ``}); op=${dataOperationControlVerdict2.opId} verbs=${record4.ops.map((operation?: Dynamic, ..._extraArguments: unknown[]) => String(operation.op)).join(`,`)}`,
            );
          }
          if (filteredPaddedCount > 0) {
            resolveDataOperationControlValue22(
              `padded_ack`,
              dataOperationControlVerdict2.lost === true ||
                dataOperationControlVerdict2.tries > 0,
              filteredPaddedCount,
            );
          }
        }
        if (typeof rep2.rev == `number`) {
          dataOperationControlVerdict2.rev = rep2.rev;
        }
        dataOperationControlVerdict2.headOnly ||= matchesChanged2;
        if (matchesChanged3) {
          dataOperationControlVerdict2.undone = [
            ...(dataOperationControlVerdict2.undone ?? []),
            ...record4.ops.map(
              (
                op2?: unknown,
                index5?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => record4.kStart + index5,
            ),
          ];
        }
        let item = [
          rep2.rev_first,
          rep2.revFirst,
          data2.rev_first,
          data2.revFirst,
        ].find(
          (item3?: unknown, ..._extraArguments: unknown[]) =>
            typeof item3 == `number`,
        );
        let item2: Dynamic = matchesChanged2
          ? item
          : typeof rep2.rev == `number`
            ? rep2.rev
            : undefined;
        for (
          item2 !== undefined &&
            (dataOperationControlVerdict2.mineRev = Math.max(
              dataOperationControlVerdict2.mineRev ?? -1,
              item2,
            )),
            record4.ops.forEach(
              (
                op2?: Dynamic,
                index5?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                for (let loadDataOperationControlVerdictResult25 of resolveDataOperationControlReplace3(
                  op2,
                  mappedDataOperationControlEvery[index5],
                ) as Dynamic)
                  this.deadBids.set(
                    loadDataOperationControlVerdictResult25,
                    dataOperationControlVerdict2.rev,
                  );
                for (let loadDataOperationControlVerdictResult25 of resolveDataOperationControlFlatMap2(
                  mappedDataOperationControlEvery[index5]?.revived,
                ) as Dynamic)
                  this.deadBids.delete(loadDataOperationControlVerdictResult25);
              },
            );
          this.deadBids.size > 256;

        )
          this.deadBids.delete(this.deadBids.keys().next().value);
        let uniqueItems10: Dynamic = new (Set as Dynamic)(
          filteredFlat
            .filter(resolveDataOperationControlAnchorGone)
            .map(
              (
                filteredFilteredFlat?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => filteredFilteredFlat.into,
            )
            .filter(
              (items3?: unknown, ..._extraArguments: unknown[]) =>
                typeof items3 == `string` && items3.length > 0,
            ),
        );
        let loadDataOperationControlVerdictHandler30: Dynamic = (
          dataOperationControlVerdict3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          Array.isArray(dataOperationControlVerdict3)
            ? dataOperationControlVerdict3
                .filter(
                  (rolldownNImport2?: unknown, ..._extraArguments: unknown[]) =>
                    !(
                      typeof rolldownNImport2 == `string` &&
                      uniqueItems10.has(rolldownNImport2)
                    ),
                )
                .map(loadDataOperationControlVerdictHandler30)
            : dataOperationControlVerdict3;
        let mappedDataOperationControlEvery2: Dynamic =
          uniqueItems10.size === 0 && uniqueItems8.size === 0
            ? mappedDataOperationControlEvery
            : mappedDataOperationControlEvery.map(
                (
                  mappedDataOperationControlEvery3?: Dynamic,
                  index5?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  uniqueItems8.has(index5)
                    ? {
                        ...(isPlainRecord(mappedDataOperationControlEvery3)
                          ? mappedDataOperationControlEvery3
                          : {}),
                        minted: [],
                        changed: false,
                      }
                    : isPlainRecord(mappedDataOperationControlEvery3) &&
                        Array.isArray(mappedDataOperationControlEvery3.minted)
                      ? {
                          ...mappedDataOperationControlEvery3,
                          minted: loadDataOperationControlVerdictHandler30(
                            mappedDataOperationControlEvery3.minted,
                          ),
                        }
                      : mappedDataOperationControlEvery3,
              );
        let predicted2: Dynamic =
          uniqueItems8.size === 0 && uniqueItems7.size === 0
            ? predicted
            : predicted.map(
                (
                  predicted3?: Dynamic,
                  index5?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  uniqueItems8.has(index5) || uniqueItems7.has(index5)
                    ? []
                    : predicted3,
              );
        emit2(false);
        readsResume(`the room took a write: the access moved`);
        let learned: Dynamic = this.learn(
          rep2,
          mappedDataOperationControlEvery2,
          predicted2,
          uniqueItems10,
        );
        dataOperationControlVerdict2.ops = getDataOperationControlSize(
          dataOperationControlVerdict2.ops,
          learned,
        );
        dataOperationControlVerdict2.homes &&= getDataOperationControlSize(
          dataOperationControlVerdict2.homes,
          learned,
        );
        if (
          learned.size > 0 &&
          (this.leftWords.length > 0 ||
            (!dataOperationControlVerdict2.replayed && this.myWords.size > 0))
        ) {
          this.rekeyWords(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              learned.get(dataOperationControlVerdict3) ??
              dataOperationControlVerdict3,
            true,
            !dataOperationControlVerdict2.replayed,
          );
        }
        if (learned.size > 0 && this.holds.size > 0) {
          this.rekeyHolds(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              learned.get(dataOperationControlVerdict3) ??
              dataOperationControlVerdict3,
          );
        }
        if (
          dataOperationControlVerdict2.replayed &&
          this.leftWords.length > 0
        ) {
          this.dedupeWords(
            record4.ops,
            dataOperationControlVerdict2.results.slice(-record4.ops.length),
            predicted,
            learned,
            dataOperationControlVerdict2.homes,
          );
        }
        if (!dataOperationControlVerdict2.replayed) {
          let record6: Dynamic = {
            ops: record4.ops,
            results: dataOperationControlVerdict2.results.slice(
              -record4.ops.length,
            ),
            predicted: predicted,
            learned: learned,
            homes: dataOperationControlVerdict2.homes,
            seq: dataOperationControlVerdict2.seq ?? 0,
          };
          if (
            this.remountOut.has(dataOperationControlVerdict2.opId) &&
            this.leftWords.some(
              (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
                leftWord.moved === true,
            )
          ) {
            this.dedupeWords(
              record6.ops,
              record6.results,
              record6.predicted,
              record6.learned,
              record6.homes,
              (
                dataOperationControlVerdict3?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                dataOperationControlVerdict3.moved === true &&
                (dataOperationControlVerdict3.since ?? 0) < record6.seq,
            );
          }
          this.ackedRecent.push(record6);
          if (this.ackedRecent.length > dataOperationControlValue64) {
            this.ackedRecent.shift();
          }
        }
        if (
          (learned.size > 0 || dataOperationControlVerdict2.replayed) &&
          !this.served &&
          this.lastFace
        ) {
          this.refreshFace();
        }
        if (
          !matchesChanged2 &&
          typeof rep2.rev == `number` &&
          !dataOperationControlVerdict2.unseen
        ) {
          let item3 = item;
          let ids: Dynamic = new (Set as Dynamic)(
            dataOperationControlVerdict2.homes ?? [],
          );
          record4.ops.forEach(
            (
              op2?: Dynamic,
              index5?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let op3: Dynamic = op2;
              if (typeof op3.id == `string`) {
                ids.add(op3.id);
              }
              if (op3.op !== `insert` || op3.source?.as !== `text`)
                for (let loadDataOperationControlVerdictResult25 of resolveDataOperationControlFlatMap2(
                  mappedDataOperationControlEvery[index5]?.minted,
                ) as Dynamic)
                  ids.add(loadDataOperationControlVerdictResult25);
            },
          );
          this.wrote.push({
            lo: Math.min(item3 ?? rep2.rev, rep2.rev),
            hi: rep2.rev,
            ids: ids,
          });
          if (this.wrote.length > 512) {
            this.wrote.shift();
          }
        }
      }
      enabled2 = true;
      count4 = 0;
      this.tookMine(dataOperationControlVerdict2);
      if (this.shortRevived.has(dataOperationControlVerdict2.opId)) {
        this.shortRevived.set(dataOperationControlVerdict2.opId, true);
      }
      let matchesProvisional =
        dataOperationControlVerdict2.provisional === true &&
        dataOperationControlVerdict2.rev < 0;
      this.emit({
        t: `ack`,
        node: this.node,
        opId: dataOperationControlVerdict2.opId,
        results: dataOperationControlVerdict2.results,
        rev: dataOperationControlVerdict2.rev,
        ...(matchesProvisional
          ? {
              provisional: true,
            }
          : {}),
        ...(dataOperationControlVerdict2.notices?.length
          ? {
              notices: dataOperationControlVerdict2.notices,
            }
          : {}),
        ...(dataOperationControlVerdict2.undone?.length
          ? {
              undone: dataOperationControlVerdict2.undone,
            }
          : {}),
        ...(dataOperationControlVerdict2.filled?.length
          ? {
              filled: dataOperationControlVerdict2.filled,
            }
          : {}),
        ...(dataOperationControlVerdict2.padded?.length
          ? {
              padded: dataOperationControlVerdict2.padded,
            }
          : {}),
        ...(dataOperationControlVerdict2.flown?.length
          ? {
              flown: dataOperationControlVerdict2.flown,
            }
          : {}),
      });
      if (!matchesProvisional) {
        reportOperationEvent(`ack.allow`, {
          rev: dataOperationControlVerdict2.rev,
        });
      }
      if (
        !matchesProvisional &&
        isDataOperationControlRevive(
          dataOperationControlVerdict2.ops,
          dataOperationControlVerdict2.results,
        )
      ) {
        this.freshen();
      }
      if (matchesProvisional) {
        this.provisional.set(
          dataOperationControlVerdict2.opId,
          dataOperationControlVerdict2,
        );
        this.inflight = null;
        emit7();
        if (this.slow) {
          this.emit(
            kind === null
              ? {
                  t: `state`,
                  node: this.node,
                  state: state(),
                }
              : loadDataOperationControlVerdictHandler25(this.node),
          );
        }
        this.slow = false;
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
        return;
      }
      await this.settleOne(dataOperationControlVerdict2);
    }
    held(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let ids: Dynamic = resolveDataOperationControlBlocks3(
        dataOperationControlVerdict2.ops,
      ).filter(
        (
          dataOperationControlBlocks3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => this.deadBids.has(dataOperationControlBlocks3),
      );
      if (ids.length === 0) return false;
      if (!reconcile && this.served) {
        this.noWhole(`a send names ${ids.length} retired block(s)`);
        for (let loadDataOperationControlVerdictResult22 of ids as Dynamic)
          this.deadBids.delete(loadDataOperationControlVerdictResult22);
        return false;
      }
      let deletedRev: Dynamic = (Math.max as Dynamic)(
        ...ids.map(
          (id?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            this.deadBids.get(id),
        ),
      );
      return this.picRev < deletedRev && !this.halted
        ? (this.reading || this.read(undefined), true)
        : (this.handBack(dataOperationControlVerdict2, `block_gone`, {
            code: `block_gone`,
            why: `replaced`,
            block: ids[0],
            ids: ids,
            deletedRev: deletedRev,
            layer: `page`,
            words: DataOperationControlMessage15,
          }),
          false);
    }
    foldBehind(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      items3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let filteredLeftWords: Dynamic = this.leftWords.filter(
        (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          ask.bid === dataOperationControlVerdict2 &&
          !ask.tray &&
          !ask.real &&
          typeof ask.afterId == `string` &&
          items3.includes(ask.afterId),
      );
      if (filteredLeftWords.length === 0) return options;
      let matchesItemsCount = items3.length === [...options].length;
      let items4: Dynamic = [...options];
      let indexOf: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        (matchesItemsCount
          ? items3.indexOf(dataOperationControlVerdict3.afterId) + 1
          : items4.length) || items4.length;
      filteredLeftWords.sort(
        (
          filteredLeftWord?: Dynamic,
          filteredLeftWord2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => indexOf(filteredLeftWord) - indexOf(filteredLeftWord2),
      );
      let label5: Dynamic = ``;
      let count10 = 0;
      for (let ask of filteredLeftWords as Dynamic) {
        let itemIndex: Dynamic = indexOf(ask);
        label5 += items4.slice(count10, itemIndex).join(``) + ask.text;
        count10 = Math.max(count10, itemIndex);
        this.leftWords = this.leftWords.filter(
          (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
            leftWord !== ask,
        );
        try {
          dataOperationControlVerdict.wal.stageWords?.(this.node, {
            bid: ask.bid,
            afterId: ask.afterId ?? null,
            text: ``,
            only: true,
          });
        } catch {}
      }
      return label5 + items4.slice(count10).join(``);
    }
    keepRescued(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = 0,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let uniqueItems7: Dynamic = new (Set as Dynamic)(
        options.predicted.slice(context).flat(),
      );
      let items3: Dynamic = [];
      let enabled26 = true;
      options.ops
        .slice(context)
        .forEach(
          (
            opsSlice?: Dynamic,
            index5?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let opsSlice2: Dynamic = opsSlice;
            if (!(opsSlice2.op !== `insert` && opsSlice2.op !== `replace`)) {
              if (
                (isPlainRecord(opsSlice2.target) ? opsSlice2.target : null)
                  ?.kind !== `chars`
              )
                return void (enabled26 = false);
              (items3.push as Dynamic)(
                ...(options.predicted[context + index5] ?? []),
              );
            }
          },
        );
      let items4: Dynamic = [];
      dataOperationControlVerdict2.forEach(
        (
          ask?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (ask.text === ``) return;
          let folds: Dynamic = [];
          let text: Dynamic = ask.text;
          if (ask.bid !== null) {
            let filteredLeftWords: Dynamic = this.leftWords.filter(
              (ask2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                ask2.bid === ask.bid &&
                !ask2.tray &&
                !ask2.real &&
                typeof ask2.afterId == `string` &&
                uniqueItems7.has(ask2.afterId),
            );
            let enabled27 = enabled26 && items3.length === ask.text.length;
            let indexOf: Dynamic = (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              (enabled27
                ? items3.indexOf(dataOperationControlVerdict3.afterId) + 1
                : items3.length) || items3.length;
            filteredLeftWords.sort(
              (
                filteredLeftWord?: Dynamic,
                filteredLeftWord2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                indexOf(filteredLeftWord) - indexOf(filteredLeftWord2),
            );
            let label5: Dynamic = ``;
            let count10 = 0;
            for (let ask2 of filteredLeftWords as Dynamic) {
              let itemIndex: Dynamic = enabled27
                ? indexOf(ask2)
                : ask.text.length;
              label5 += ask.text.slice(count10, itemIndex) + ask2.text;
              count10 = Math.max(count10, itemIndex);
              folds.push({
                bid: ask2.bid,
                afterId: ask2.afterId ?? null,
              });
              this.leftWords = this.leftWords.filter(
                (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
                  leftWord !== ask2,
              );
              try {
                dataOperationControlVerdict.wal.stageWords?.(this.node, {
                  bid: ask2.bid,
                  afterId: ask2.afterId ?? null,
                  text: ``,
                  only: true,
                });
              } catch {}
            }
            text = label5 + ask.text.slice(count10);
          }
          if (text.trim() === ``) return;
          let bid = `tray:${options.opId}:${index5}`;
          let cut2: Dynamic = this.trayOwn(
            bid,
            null,
            text,
            false,
            false,
            undefined,
            resolveDataOperationControlAuthor(options),
          );
          items4.push({
            bid: bid,
            text: text,
            afterId: null,
            staged: true,
            ...(folds.length > 0
              ? {
                  folds: folds,
                }
              : {}),
            ...(cut2
              ? {
                  cut: cut2,
                }
              : {}),
          });
        },
      );
      return items4;
    }
    trayOwn(
      bid?: Dynamic,
      afterId?: Dynamic,
      text?: Dynamic,
      dependencies: Dynamic = false,
      argument: Dynamic = false,
      argument2?: Dynamic,
      argument3: Dynamic = {},
      ..._extraArguments: unknown[]
    ): Dynamic {
      let leftWord: Dynamic = this.leftWords.find(
        (ask?: Dynamic, ..._extraArguments: unknown[]) =>
          ask.bid === bid && (ask.afterId ?? null) === afterId,
      );
      let text2: Dynamic =
        dependencies || !leftWord || text.includes(leftWord.text)
          ? text
          : leftWord.text.includes(text)
            ? leftWord.text
            : `${leftWord.text}${text}`;
      let whole: Dynamic =
        dependencies && argument2
          ? argument2.whole
          : leftWord?.cut !== undefined && text2 === leftWord.text
            ? leftWord.cut.whole
            : text2.length;
      let reduce: Dynamic = this.leftWords.reduce(
        (
          accumulator?: Dynamic,
          leftWord3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          leftWord3 !== leftWord && leftWord3.tray === true
            ? accumulator +
              Math.min(
                leftWord3.text.length,
                leftWord3.cut?.kept ?? leftWord3.text.length,
              )
            : accumulator,
        0,
      );
      let platformKeyboardAndSaveStatusText: Dynamic =
        resolvePlatformKeyboardAndSaveStatusText(
          text2,
          Math.max(0, platformKeyboardAndSaveStatusValue1000000 - reduce),
        );
      if (leftWord) {
        Object.assign(leftWord, {
          text: text2,
          parked: true,
          tray: true,
        });
      } else {
        this.leftWords.push({
          bid: bid,
          afterId: afterId,
          text: text,
          parked: true,
          tray: true,
          ...resolveDataOperationControlAuthor(argument3),
        });
      }
      let leftWord2: Dynamic = leftWord ?? this.leftWords.at(-1);
      if (dependencies) {
        leftWord2.withEditor = argument;
      }
      if (argument) {
        leftWord2.quiet = true;
      } else {
        delete leftWord2.quiet;
      }
      let kept: Dynamic = platformKeyboardAndSaveStatusText.text.length;
      if (kept > 0) {
        let cut2: Dynamic =
          kept < whole
            ? {
                kept: kept,
                whole: whole,
              }
            : undefined;
        try {
          if (
            dataOperationControlVerdict.wal.stageWords?.(this.node, {
              bid: bid,
              afterId: afterId,
              text: platformKeyboardAndSaveStatusText.text,
              tray: true,
              ...(cut2
                ? {
                    cut: cut2,
                  }
                : {}),
              ...resolveDataOperationControlAuthor(leftWord2),
            }) === false
          ) {
            kept = 0;
          }
        } catch {
          kept = 0;
        }
      }
      let record4: Dynamic =
        kept < whole
          ? {
              kept: kept,
              whole: whole,
            }
          : undefined;
      if (record4) {
        leftWord2.cut = record4;
      } else {
        delete leftWord2.cut;
      }
      emit7();
      return record4;
    }
    handBack(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      let uniqueItems7: Dynamic = new (Set as Dynamic)(
        dataOperationControlVerdict2.predicted
          .flat()
          .filter(
            (flat?: Dynamic, ..._extraArguments: unknown[]) =>
              !dependencies || !this.grantedEver.has(flat),
          ),
      );
      let items3: Dynamic = dependencies
        ? []
        : [[dataOperationControlVerdict2, options, context]];
      if (!(dependencies && uniqueItems7.size === 0)) {
        for (let loadDataOperationControlVerdictResult22 of this
          .queue as Dynamic) {
          if (
            loadDataOperationControlVerdictResult22 ===
            dataOperationControlVerdict2
          )
            continue;
          let uniqueItems8: Dynamic = new (Set as Dynamic)();
          collectDataOperationControlContent(
            loadDataOperationControlVerdictResult22.ops,
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (
              uniqueItems7.has(dataOperationControlVerdict3) &&
                uniqueItems8.add(dataOperationControlVerdict3),
              dataOperationControlVerdict3
            ),
          );
          if (uniqueItems8.size !== 0) {
            for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22.predicted.flat() as Dynamic)
              uniqueItems7.add(loadDataOperationControlVerdictResult23);
            items3.push([
              loadDataOperationControlVerdictResult22,
              `unknown_id`,
              {
                code: `unknown_id`,
                why: `not_minted`,
                ids: [...uniqueItems8],
              },
            ]);
          }
        }
        for (let [
          loadDataOperationControlVerdictResult22,
          reason,
          loadDataOperationControlVerdictResult23,
        ] of items3 as Dynamic) {
          this.queue.splice(
            this.queue.indexOf(loadDataOperationControlVerdictResult22),
            1,
          );
          let back: Dynamic = {
            ops: loadDataOperationControlVerdictResult22.ops,
            predicted: loadDataOperationControlVerdictResult22.predicted,
            textFrames: loadDataOperationControlVerdictResult22.textFrames,
            ...(loadDataOperationControlVerdictResult22.homes
              ? {
                  homes: loadDataOperationControlVerdictResult22.homes,
                }
              : {}),
          };
          let rescue: Dynamic = loadDataOperationControlVerdictResult22.replayed
            ? this.keepRescued(
                updateDataOperationControlBid(
                  loadDataOperationControlVerdictResult22.ops,
                  loadDataOperationControlVerdictResult22.homes,
                ),
                loadDataOperationControlVerdictResult22,
              )
            : [];
          let detail: Dynamic = {
            opIndex: 0,
            ...loadDataOperationControlVerdictResult23,
            ...(loadDataOperationControlVerdictResult22.replayed &&
            loadDataOperationControlVerdictResult23.need === undefined
              ? {
                  need: `earlier_life`,
                }
              : {}),
            ...(loadDataOperationControlVerdictResult22 ===
            dataOperationControlVerdict2
              ? {}
              : {
                  layer: `page`,
                  words: DataOperationControlMessage15,
                }),
            back: back,
            ...(rescue.length > 0
              ? {
                  rescue: rescue,
                }
              : {}),
          };
          if (
            this.emit({
              t: `deny`,
              node: this.node,
              opId: loadDataOperationControlVerdictResult22.opId,
              reason: reason,
              detail: detail,
            })
          ) {
            dataOperationControlVerdict.wal
              .trim(this.node, loadDataOperationControlVerdictResult22.opId)
              .catch((..._extraArguments: unknown[]): undefined => undefined);
          }
        }
        if (items3.length !== 0) {
          if (!dependencies) {
            this.owed = true;
          }
          emit7();
        }
      }
    }
    tookMine(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.ackedRev = Math.max(
        this.ackedRev,
        dataOperationControlVerdict2.mineRev ?? -1,
      );
      this.heardRev = Math.max(
        this.heardRev,
        this.ackedRev,
        dataOperationControlVerdict2.rev,
      );
      this.roomSeen(
        this.heardRev,
        !dataOperationControlVerdict2.headOnly &&
          dataOperationControlVerdict2.mineRev !== undefined &&
          this.heardRev <= dataOperationControlVerdict2.mineRev,
      );
      if (honourOpsOnFeed()) {
        this.bookRev(dataOperationControlVerdict2.rev, false);
      } else {
        if (
          this.served &&
          !dataOperationControlVerdict2.headOnly &&
          !dataOperationControlVerdict2.unseen &&
          dataOperationControlVerdict2.rev === this.lastRev + 1
        ) {
          if (this.groundRev >= this.lastRev) {
            this.groundTo(dataOperationControlVerdict2.rev);
          }
          this.lastRev = dataOperationControlVerdict2.rev;
          this.drainParked();
        } else {
          if (this.served && dataOperationControlVerdict2.rev > this.lastRev) {
            this.wantRev = Math.max(
              this.wantRev,
              dataOperationControlVerdict2.rev,
            );
            this.stubTimer ??= dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.stubTimer = null;
                if (!enabled && !this.dead && this.wantRev > this.lastRev) {
                  this.read(this.since());
                }
              },
              250,
            );
          }
        }
      }
      this.met();
      this.holedRead.clear();
    }
    async settleOne(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      await Promise.race([
        dataOperationControlVerdict.wal
          .trim(this.node, dataOperationControlVerdict2.opId)
          .catch((..._extraArguments: unknown[]): undefined => undefined),
        loadDataOperationControlVerdictHandler(400),
      ]);
      this.remountOut.delete(dataOperationControlVerdict2.opId);
      this.inflight = null;
      emit7();
      if (this.slow) {
        this.emit(
          kind === null
            ? {
                t: `state`,
                node: this.node,
                state: state(),
              }
            : loadDataOperationControlVerdictHandler25(this.node),
        );
      }
      this.slow = false;
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.pump();
    }
    bump(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let options2: Dynamic = options;
      let enabled26 = false;
      for (let loadDataOperationControlVerdictResult22 of this
        .queue as Dynamic) {
        let filteredFlatMap: Dynamic =
          loadDataOperationControlVerdictResult22.predicted
            .flatMap(
              (predicted?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                predicted.map(
                  (
                    rolldownRImport2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    resolveDataOperationControlStartsWith(
                      rolldownRImport2,
                      dataOperationControlVerdict2,
                    ),
                ),
            )
            .filter(
              (flatMap?: Dynamic, ..._extraArguments: unknown[]) =>
                flatMap >= 0,
            );
        if (filteredFlatMap.length === 0) continue;
        let min2: Dynamic = (Math.min as Dynamic)(...filteredFlatMap);
        let difference: Dynamic = min2 <= options2 ? options2 + 1 - min2 : 0;
        if (difference > 0) {
          let lookup3: Dynamic = new (Map as Dynamic)(
            filteredFlatMap.map(
              (filteredFlatMap2?: Dynamic, ..._extraArguments: unknown[]) => [
                `${dataOperationControlVerdict2}.${filteredFlatMap2}`,
                `${dataOperationControlVerdict2}.${filteredFlatMap2 + difference}`,
              ],
            ),
          );
          for (let loadDataOperationControlVerdictResult23 of this
            .queue as Dynamic) {
            loadDataOperationControlVerdictResult23.editorSaid ??=
              loadDataOperationControlVerdictResult23.predicted;
            [
              loadDataOperationControlVerdictResult23.ops,
              loadDataOperationControlVerdictResult23.predicted,
            ] = [
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.ops,
                lookup3,
              ),
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.predicted,
                lookup3,
              ),
            ];
            loadDataOperationControlVerdictResult23.homes &&=
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.homes,
                lookup3,
              );
          }
          enabled26 = true;
        }
        options2 = Math.max(
          options2,
          (Math.max as Dynamic)(...filteredFlatMap) + difference,
        );
      }
      return enabled26 ? options2 : options;
    }
    learn(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies: Dynamic = new (Set as Dynamic)(),
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lookup3: Dynamic = new (Map as Dynamic)();
      options.forEach(
        (
          rolldownTImport2?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let dataOperationControlFlatMap2: Dynamic =
            resolveDataOperationControlFlatMap2(rolldownTImport2?.minted);
          let contextItem: Dynamic = context[index5] ?? [];
          if (
            dataOperationControlFlatMap2.length > 0 &&
            dataOperationControlFlatMap2.length < contextItem.length &&
            ((
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              dataOperationControlFlatMap2.every(
                (
                  dataOperationControlFlatMap22?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  dataOperationControlVerdict3.has(
                    dataOperationControlFlatMap22,
                  ),
              ))(new (Set as Dynamic)(contextItem))
          ) {
            for (let loadDataOperationControlVerdictResult22 of dataOperationControlFlatMap2 as Dynamic)
              this.grantedEver.add(loadDataOperationControlVerdictResult22);
            return;
          }
          if (
            dataOperationControlFlatMap2.length === 0 ||
            dataOperationControlFlatMap2.length === contextItem.length
          ) {
            contextItem.forEach(
              (
                contextItem2?: Dynamic,
                index6?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (
                  index6 < dataOperationControlFlatMap2.length &&
                  contextItem2 !== dataOperationControlFlatMap2[index6]
                ) {
                  lookup3.set(
                    contextItem2,
                    dataOperationControlFlatMap2[index6],
                  );
                }
                this.grantedEver.add(contextItem2);
              },
            );
          }
          for (let loadDataOperationControlVerdictResult22 of dataOperationControlFlatMap2 as Dynamic)
            this.grantedEver.add(loadDataOperationControlVerdictResult22);
        },
      );
      for (let loadDataOperationControlVerdictResult22 of this
        .queue as Dynamic) {
        loadDataOperationControlVerdictResult22.ops =
          getDataOperationControlSize(
            loadDataOperationControlVerdictResult22.ops,
            lookup3,
          );
        loadDataOperationControlVerdictResult22.homes &&=
          getDataOperationControlSize(
            loadDataOperationControlVerdictResult22.homes,
            lookup3,
          );
      }
      let sessionEntry: Dynamic = enabled21
        ? dataOperationControlVerdict.session.get()
        : null;
      if (dataOperationControlVerdict2.replayed === true) {
        if (
          typeof dataOperationControlVerdict2.sess == `string` &&
          sessionEntry &&
          dataOperationControlVerdict2.sess !== sessionEntry.label
        ) {
          console.info(
            `opTransport: a replayed receipt names an earlier life's session — not adopted`,
            dataOperationControlVerdict2.sess,
            sessionEntry.label,
          );
        }
        return lookup3;
      }
      let enabled26 =
        enabled24 &&
        sessionEntry !== null &&
        typeof dataOperationControlVerdict2.sess == `string` &&
        dataOperationControlVerdict2.sess !== `` &&
        dataOperationControlVerdict2.sess !== sessionEntry.label &&
        typeof dataOperationControlVerdict2.sessSecret == `string`;
      let sessionEntry2: Dynamic = enabled26 ? null : sessionEntry;
      let sessionEntry3: Dynamic = sessionEntry2 ?? {
        label: String(dataOperationControlVerdict2.sess),
        secret: String(dataOperationControlVerdict2.sessSecret),
        hwm: 0,
      };
      if (
        !sessionEntry2 &&
        (typeof dataOperationControlVerdict2.sess != `string` ||
          typeof dataOperationControlVerdict2.sessSecret != `string`)
      )
        return lookup3;
      let label5: Dynamic = enabled26
        ? sessionEntry.label
        : enabled21
          ? null
          : (dataOperationControlVerdict.session.get()?.label ??
            loadDataOperationControlVerdictResult17);
      if (enabled26) {
        uniqueItems6.add(sessionEntry.label);
      }
      enabled21 = true;
      count8 = 0;
      count9 = 0;
      loadDataOperationControlVerdictResult17 = undefined;
      if (label5 != null && label5 !== sessionEntry3.label) {
        dataOperationControlVerdict.session.set(sessionEntry3);
        rekeyHolds3(label5);
      }
      if (slice().length > 0) {
        if (!dataOperationControlVerdict.session.get()) {
          dataOperationControlVerdict.session.set(sessionEntry3);
        }
        rekeyHolds4();
      }
      let mappedItems: Dynamic = [
        ...options.flatMap(
          (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveDataOperationControlFlatMap2(option?.minted),
        ),
        ...dependencies,
      ].map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveDataOperationControlStartsWith(item, sessionEntry3.label),
      );
      let data: Dynamic = isPlainRecord(dataOperationControlVerdict2.data)
        ? dataOperationControlVerdict2.data
        : {};
      let mappedFilteredItems = [
        dataOperationControlVerdict2.nextIndex,
        data.nextIndex,
        ...options.map(
          (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            option?.nextIndex,
        ),
      ]
        .filter(
          (item?: unknown, ..._extraArguments: unknown[]) =>
            typeof item == `number`,
        )
        .map(
          (filteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
            filteredItem - 1,
        );
      let mappedFlatMap: Dynamic = (
        Array.isArray(data.healed)
          ? data.healed
          : Array.isArray(dataOperationControlVerdict2.healed)
            ? dataOperationControlVerdict2.healed
            : []
      )
        .flatMap(
          (healed?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            isPlainRecord(healed)
              ? resolveDataOperationControlFlatMap2(healed.minted)
              : [],
        )
        .map(
          (flatMap?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveDataOperationControlStartsWith(flatMap, sessionEntry3.label),
        );
      let mappedOptions: Dynamic = options.map(
        (option?: Dynamic, ..._extraArguments: unknown[]) =>
          resolveDataOperationControlSess2(option, sessionEntry3.label),
      );
      let max: Dynamic = (Math.max as Dynamic)(
        -1,
        ...mappedItems,
        ...mappedFilteredItems,
        ...mappedFlatMap,
        ...mappedOptions,
      );
      for (let loadDataOperationControlVerdictResult22 of [
        this,
        ...[...lookup.values()].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) => item !== this,
        ),
      ] as Dynamic)
        max = Math.max(
          max,
          loadDataOperationControlVerdictResult22.bump(
            sessionEntry3.label,
            max,
          ),
        );
      let hwm = Math.max(sessionEntry3.hwm, max);
      dataOperationControlVerdict.session.set({
        label: sessionEntry3.label,
        secret: sessionEntry3.secret,
        hwm: hwm,
      });
      if (!sessionEntry2) {
        rekeyHolds(
          sessionEntry3.label,
          mappedItems.length > 0
            ? (Math.min as Dynamic)(...mappedItems) - 1
            : hwm,
        );
      }
      emit8();
      return lookup3;
    }
    close(..._extraArguments: unknown[]): undefined {
      this.dead = true;
      this.heldWordsOff(`close`);
      if (this.mountWait !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.mountWait.timer);
      }
      this.mountWait = null;
      this.remountOut.clear();
      for (let loadDataOperationControlVerdictResult22 of [
        this.pollTimer,
        this.retryTimer,
        this.streamTimer,
        this.freshTimer,
        this.stubTimer,
        this.backTimer,
        this.coolTimer,
        this.quietTimer,
        this.blockTimer,
        this.healTimer,
        this.healCoolTimer,
        this.healReissueTimer,
        this.orderTimer,
        this.gapTimer,
        this.shedTimer,
        this.shedPauseTimer,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      this.resetHoleState();
      this.paceOff();
      this.calmOff();
      this.shedRelease();
      if (this.wordsBehindTimer !== null) {
        dataOperationControlVerdict.timers.clearTimeout(this.wordsBehindTimer);
      }
      this.wordsBehindTimer = null;
      this.blockQueue.clear();
      this.penBlocks.clear();
      for (let loadDataOperationControlVerdictResult22 of this.blockCool.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.timer !== null) {
          dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22.timer,
          );
        }
      this.blockCool.clear();
      if (lookup.get(this.node) === this) {
        lookup.delete(this.node);
      }
    }
  }
  let recovered = (..._extraArguments: unknown[]): undefined => {
    if (!enabled) {
      let enabled26 = false;
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.unmoor()) {
          enabled26 = true;
        }
      if (enabled26) {
        reportOperationEvent(`moor.recovered`, {});
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
      }
    }
    if (!enabled)
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.catchUpDue();
    if (!enabled) {
      readsResume(`the feed's carrier reconnected`);
    }
    if (!(enabled || kind === null || kind === `refusing`)) {
      enabled18 = true;
      rearmGap(
        `the feed's carrier reconnected — one held row tries the door (probation)`,
        true,
      );
      if (loadDataOperationControlVerdictResult14 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult14,
        );
      }
      loadDataOperationControlVerdictResult14 =
        dataOperationControlVerdict.timers.setTimeout(
          emit6,
          dataOperationControlValue300002,
        );
    }
  };
  let reopened: Dynamic = (..._extraArguments: unknown[]) => {
    if (!enabled) {
      readsResume(`the carrier re-opened`);
      if (kind !== null || enabled18 || refusalClass() !== null) {
        rearmGap(`the carrier re-opened`);
      }
      loadDataOperationControlVerdictResult3 = null;
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.unmoor();
      if (
        [...lookup.values()].some(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item.inflight,
        )
      )
        return void (enabled22 = true);
      if (enabled21)
        return loadDataOperationControlVerdictResult18(
          dataOperationControlVerdict.session.get()?.label,
        );
      enabled22 = false;
      if (enabled23) {
        loadDataOperationControlVerdictResult19 = null;
        enabled23 = false;
        loadDataOperationControlVerdictHandler29().then(
          (..._extraArguments: unknown[]): Dynamic =>
            lookup.forEach(
              (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                lookup3.pump(),
            ),
        );
      }
    }
  };
  let ObservabilityTelemetryState123: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!(enabled || loadDataOperationControlVerdictResult10 !== null)) {
      if (dataOperationControlVerdict2 === false) {
        enabled12 = true;
        emit2(true);
        return loadDataOperationControlVerdictHandler15();
      }
      if (dataOperationControlVerdict2 === true) {
        enabled12 = false;
        loadDataOperationControlVerdictHandler15();
      }
      readsResume(`the access moved`, options);
      enabled19 = false;
      if (kind !== null || enabled18 || refusalClass() !== null) {
        rearmGap(`the access moved`);
      }
      loadDataOperationControlVerdictHandler16();
      if (!enabled23) {
        if (loadDataOperationControlVerdictResult19 !== null) {
          enabled25 = true;
        }
        return;
      }
      if (enabled14) {
        ObservabilityTelemetryState122();
      }
    }
  };
  let accessChanged: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ObservabilityTelemetryState123(dataOperationControlVerdict2, false);
  let readsResume2: Dynamic = (
    dataOperationControlVerdict2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => readsResume(dataOperationControlVerdict2, true);
  return {
    open(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      lookup.get(dataOperationControlVerdict2)?.close();
      let loadDataOperationControlVerdictResult22: Dynamic =
        new (loadDataOperationControlVerdictResult21 as Dynamic)(
          dataOperationControlVerdict2,
        );
      lookup.set(
        dataOperationControlVerdict2,
        loadDataOperationControlVerdictResult22,
      );
      if (enabled11) {
        enabled11 = false;
        loadDataOperationControlVerdictHandler11();
        loadDataOperationControlVerdictHandler15();
      }
      return loadDataOperationControlVerdictResult22;
    },
    close(..._extraArguments: unknown[]): undefined {
      enabled = true;
      subscribe();
      if (loadDataOperationControlVerdictResult4 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult4,
        );
      }
      loadDataOperationControlVerdictResult4 = null;
      loadDataOperationControlVerdictHandler12();
      if (loadDataOperationControlVerdictResult13 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult13,
        );
      }
      loadDataOperationControlVerdictResult13 = null;
      if (loadDataOperationControlVerdictResult11 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult11,
        );
      }
      loadDataOperationControlVerdictResult11 = null;
      if (loadDataOperationControlVerdictResult14 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult14,
        );
      }
      loadDataOperationControlVerdictResult14 = null;
      if (loadDataOperationControlVerdictResult15 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult15,
        );
      }
      loadDataOperationControlVerdictResult15 = null;
      if (loadDataOperationControlVerdictResult16 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult16,
        );
      }
      loadDataOperationControlVerdictResult16 = null;
      if (
        loadDataOperationControlVerdictResult20 !== null &&
        dataOperationControlVerdict.session.get() === null
      ) {
        dataOperationControlVerdict.session.set(
          loadDataOperationControlVerdictResult20,
        );
      }
      loadDataOperationControlVerdictResult20 = null;
      for (let loadDataOperationControlVerdictResult22 of Array.from<Dynamic>(
        lookup.values(),
      ) as Dynamic)
        loadDataOperationControlVerdictResult22.close();
      dataOperationControlVerdict.wal.release?.();
      loadDataOperationControlVerdictHandler7();
    },
    known: (..._extraArguments: unknown[]): Dynamic =>
      enabled21 ? dataOperationControlVerdict.session.get() : null,
    reopened: reopened,
    recovered: recovered,
    capsChanged: (..._extraArguments: unknown[]): undefined => {
      if (!enabled) {
        if (
          loadDataOperationControlVerdictHandler2(
            dataOperationControlVerdict.caps?.oneOrder,
          )
        ) {
          enabled3 = false;
        }
        pump2();
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.roadMoved();
        info();
        if (label === `no_answer`) {
          resolveDataOperationControlValue242();
        }
        loadDataOperationControlVerdictHandler15();
      }
    },
    askFacts: askFacts,
    caps: caps,
    waiting: (..._extraArguments: unknown[]): Dynamic => enabled4,
    viewOnly: (..._extraArguments: unknown[]): Dynamic => enabled14,
    readsRefused: (..._extraArguments: unknown[]): Dynamic =>
      loadDataOperationControlVerdictHandler18(),
    pageGone: (..._extraArguments: unknown[]) =>
      loadDataOperationControlVerdictResult10 !== null,
    pageGoneWhy: (..._extraArguments: unknown[]): Dynamic =>
      loadDataOperationControlVerdictResult10,
    linkDown: (..._extraArguments: unknown[]): Dynamic => kind,
    paused: (..._extraArguments: unknown[]) => kind !== null || enabled18,
    woke: woke,
    accessChanged: accessChanged,
    state: state,
    unsavedInputs: (..._extraArguments: unknown[]) => {
      let record4 = {
        tray: 0,
        shortRevived: 0,
        shortRevivedAcked: 0,
      };
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic) {
        record4.tray += loadDataOperationControlVerdictResult22.trayLines();
        record4.shortRevived +=
          loadDataOperationControlVerdictResult22.shortRevived.size;
        for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22.shortRevived.values() as Dynamic)
          if (loadDataOperationControlVerdictResult23) {
            record4.shortRevivedAcked += 1;
          }
      }
      return record4;
    },
    onState(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(dataOperationControlVerdict2);
      return (..._extraArguments: unknown[]): Dynamic =>
        uniqueItems.delete(dataOperationControlVerdict2);
    },
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationControl3Step1(): void {
  (dataOperationControlValue0 = 0);
}

export {
  loadDataOperationControlVerdict,
};

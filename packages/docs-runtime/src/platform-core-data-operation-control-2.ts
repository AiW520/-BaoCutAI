/** BaoCut: data operation control from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  emitTelemetryEvent,
} from "./platform-core-observability-telemetry-3";
import {
  createPagesLinkOddEvent,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  DataModelSchemasOpsPerUpdate,
  DataModelSchemasState18,
} from "./platform-core-data-model-schemas-4";
import {
  resolvePlatformAnnouncementsToUpperCase,
} from "./platform-core-platform-announcements";
import {
  dataOperationControlAddBlockDelBlockMoveAttrValues,
  isOperationRecord,
  resolveDataOperationControlIdInvalid,
} from "./platform-core-data-operation-control-1";
import {
  isPlainRecord,
} from "./platform-core-data-operation-control-4";

function isDataOperationControlDeny(
  response?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!isOperationRecord(response) || response.verdict !== `deny`) return false;
  let data: Dynamic = isOperationRecord(response.data) ? response.data : {};
  if (resolveDataOperationControlIdInvalid(response, data)) return false;
  let filteredIssues: Dynamic = Array.isArray(data.issues)
    ? data.issues.filter(isOperationRecord)
    : [];
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    [
      data.problem,
      data.why,
      ...filteredIssues.map(
        (filteredIssue?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          filteredIssue.why,
      ),
    ].filter(
      (item?: unknown, ..._extraArguments: unknown[]) =>
        typeof item == `string`,
    ),
  );
  let stringify = JSON.stringify([
    response.reason,
    response.detail,
    data.detail,
    data.code,
  ]);
  if (
    !(
      uniqueItems.has(`unknown_key`) ||
      uniqueItems.has(`not_in_enum`) ||
      uniqueItems.has(`enum`) ||
      uniqueItems.has(`required`) ||
      uniqueItems.has(`unknown_op`) ||
      data.code === `shape` ||
      response.reason === `shape` ||
      /unknown[_ ]key|not_in_enum|unknown op/.test(stringify)
    )
  )
    return false;
  let at2: Dynamic = Array.isArray(data.at) ? data.at : [];
  let atItem: Dynamic =
    typeof at2[2] == `number`
      ? at2[2]
      : typeof data.opIndex == `number`
        ? data.opIndex
        : -1;
  if (options && atItem >= 0 && atItem < options.ops.length) {
    if (options.row[atItem]) return true;
    let op2: Dynamic = options.ops[atItem]?.op;
    return !!(
      typeof op2 == `string` &&
      dataOperationControlAddBlockDelBlockMoveAttrValues.includes(op2) &&
      at2.at(-1) === `op`
    );
  }
  if (at2.length > 2 || data.why === `bad_payload`) return false;
  let fields: Dynamic = Array.isArray(data.fields) ? data.fields : null;
  return (
    !!fields && !fields.includes(`engine`) && data.problem === `unknown_key`
  );
}

var DataOperationControlTableRow: string;

var DataOperationControlCell: string;

var dataOperationControlSet6: Dynamic;

var dataOperationControlSet7: Dynamic;

var dataOperationControlSet8: Dynamic;

var dataOperationControlDbTimeoutDbUnavailableValues: string[];

var DataOperationControlMessage2: string;

var DataOperationControlSaved: string;

var DataOperationControlProseStoreShed: string;

var dataOperationControlValue1500: number;

var resolveDataOperationControlValue18: Dynamic;

function resolveDataOperationControlAllow(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !resolveDataOperationControlValue18(response) ||
    response.verdict === `allow`
  )
    return null;
  let data: Dynamic = resolveDataOperationControlValue18(response.data)
    ? response.data
    : {};
  if (response.reason !== `unavailable` && data.code !== `unavailable`)
    return null;
  let why: Dynamic = data.why;
  return typeof why == `string` &&
    dataOperationControlDbTimeoutDbUnavailableValues.includes(why)
    ? why
    : null;
}

function resolveDataOperationControlCommitted(
  dataOperationControlCommitted?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveDataOperationControlAllow(dataOperationControlCommitted) ===
    null || !resolveDataOperationControlValue18(dataOperationControlCommitted)
    ? false
    : (resolveDataOperationControlValue18(dataOperationControlCommitted.data)
        ? dataOperationControlCommitted.data
        : {}
      ).committed !== false;
}

var dataOperationControlSet9: Dynamic;

function isDataOperationControlDeny2(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolveDataOperationControlValue18(response) ||
    response.verdict !== `deny`
  )
    return false;
  let data: Dynamic = resolveDataOperationControlValue18(response.data)
    ? response.data
    : {};
  if (data.outcome === `unknown` || response.outcome === `unknown`) return true;
  let status: Dynamic = response.status;
  return (
    (status === 503 || status === 504) &&
    typeof data.was == `string` &&
    dataOperationControlSet9.has(data.was)
  );
}

function resolveDataOperationControlValue19(
  dataOperationControlValue19?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveDataOperationControlCommitted(dataOperationControlValue19) ||
    isDataOperationControlDeny2(dataOperationControlValue19)
  );
}

function resolveDataOperationControlShed(
  dataOperationControlShed?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  let enabled2 = false;
  let resolveDataOperationControlShedHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    enabled = false;
    enabled2 = false;
  };
  return {
    shed(..._extraArguments: unknown[]): undefined {
      if (!enabled) {
        enabled = true;
        enabled2 = false;
        dataOperationControlShed.loading(DataOperationControlMessage2, {
          id: DataOperationControlProseStoreShed,
        });
      }
    },
    acked(..._extraArguments: unknown[]): undefined {
      if (enabled) {
        enabled2 = true;
      }
    },
    denied(..._extraArguments: unknown[]): undefined {
      if (enabled) {
        resolveDataOperationControlShedHandler();
        dataOperationControlShed.dismiss(DataOperationControlProseStoreShed);
      }
    },
    landed(..._extraArguments: unknown[]): undefined {
      if (!enabled) return;
      let enabled3 = enabled2;
      resolveDataOperationControlShedHandler();
      if (enabled3) {
        dataOperationControlShed.success(DataOperationControlSaved, {
          id: DataOperationControlProseStoreShed,
          duration: dataOperationControlValue1500,
        });
      } else {
        dataOperationControlShed.dismiss(DataOperationControlProseStoreShed);
      }
    },
    drop(..._extraArguments: unknown[]): undefined {
      if (enabled) {
        resolveDataOperationControlShedHandler();
        dataOperationControlShed.dismiss(DataOperationControlProseStoreShed);
      }
    },
    get showing() {
      return enabled;
    },
  };
}

var resolveDataOperationControlValue20: Dynamic;

var resolveDataOperationControlEvery2: Dynamic;

var resolveDataOperationControlValue21: Dynamic;

var resolveDataOperationControlChars2: Dynamic;

var isDataOperationControlInsert: Dynamic;

var resolveDataOperationControlEvery3: Dynamic;

var resolveDataOperationControlValue22: (dataOperationControlValue22?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var dataOperationControlValue2000: number;

var DataOperationControlState2: number[];

var dataOperationControlValue30000: number;

var dataOperationControlValue10000: number;

var dataOperationControlValue300000: number;

function resolveDataOperationControlFloor(
  dataOperationControlFloor?: Dynamic,
  options: Dynamic = dataOperationControlValue30000,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataOperationControlFloor === undefined) return options;
  let min = Math.min(1, Math.max(0, dataOperationControlFloor()));
  return (
    options +
    Math.min(
      dataOperationControlValue10000 - 1,
      Math.floor(min * dataOperationControlValue10000),
    )
  );
}

var dataOperationControlValue8: number;

var dataOperationControlValue20002: number;

var dataOperationControlValue20003: number;

var DataOperationControlTheLogDidNotAnswerWithinWALMS: symbol;

var dataOperationControlValue1000: number;

var dataOperationControlValue5000: number;

var dataOperationControlValue3000: number;

var dataOperationControlValue300002: number;

var dataOperationControlValue60000: number;

var DataOperationControlState3: number;

var DataOperationControlState4: number;

function resolveDataOperationControlValue23(
  dataOperationControlValue23?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return dataOperationControlValue23 <= 0
    ? 0
    : resolveDataOperationControlRound2(
        Math.min(
          dataOperationControlValue300002,
          500 * 2 ** (dataOperationControlValue23 - 1),
        ),
        options,
      );
}

var dataOperationControlValue100002: number;

var dataOperationControlValue40000: number;

var resolveDataOperationControlValue24: Dynamic;

var DataOperationControlState5: number[];

var dataOperationControlValue3000002: number;

var dataOperationControlValue1800000: number;

var resolveDataOperationControlValue25: Dynamic;

var resolveDataOperationControlRound: Dynamic;

var dataOperationControlSet10: Dynamic;

var DataOperationControlState6: number;

var dataOperationControlValue600002: number;

function resolveDataOperationControlRound2(
  dataOperationControlRound2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return Math.round(
    dataOperationControlRound2 / 2 +
      (Math.min(1, Math.max(0, options())) * dataOperationControlRound2) / 2,
  );
}

var resolveDataOperationControlValue26: Dynamic;

var dataOperationControlValue8000: number;

var DataOperationControlAtRevCold: {
    atRevCold: boolean;
};

var dataOperationControlValue20004: number;

var resolveDataOperationControlValue27: Dynamic;

var dataOperationControlValue10002: number;

var dataOperationControlValue50002: number;

var DataOperationControlMessage3: string;

var resolveDataOperationControlRound3: Dynamic;

var filterDataOperationControlDeny: Dynamic;

var dataOperationControlValue20005: number;

var dataOperationControlValue64: number;

var DataOperationControlState7: number;

var DataOperationControlState8: number;

var dataOperationControlValue100003: number;

var dataOperationControlValue10003: number;

var dataOperationControlValue300003: number;

var dataOperationControlValue20006: number;

var dataOperationControlValue4000: number;

var DataOperationControlMessage4: string;

var DataOperationControlMessage5: string;

var DataOperationControlMessage6: string;

var resolveDataOperationControlWords: Dynamic;

var dataOperationControlValue300004: number;

var dataOperationControlValue3000003: number;

var resolveDataOperationControlRound4: Dynamic;

var dataOperationControlValue10004: number;

var dataOperationControlValue40002: number;

var dataOperationControlValue100004: number;

var dataOperationControlValue80000: number;

var dataOperationControlValue30002: number;

var dataOperationControlValue6000: number;

var dataOperationControlValue2500: number;

var dataOperationControlValue100005: number;

var DataOperationControlState9: number;

var DataOperationControlMessage7: string;

var dataOperationControlValue600003: number;

var dataOperationControlValue15000: number;

function resolveDataOperationControlFloor2(
  dataOperationControlFloor2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (dataOperationControlFloor2 === undefined)
    return dataOperationControlValue600003;
  let min = Math.min(1, Math.max(0, dataOperationControlFloor2()));
  return (
    dataOperationControlValue600003 +
    Math.min(
      dataOperationControlValue15000 - 1,
      Math.floor(min * dataOperationControlValue15000),
    )
  );
}

var DataOperationControlStyles4: string;

var DataOperationControlARowPastRevsThisPageNeverHeard: string;

var dataOperationControlValue150002: number;

var dataOperationControlValue20007: number;

var DataOperationControlARevABellNamedNeverCameInADelta: string;

var DataOperationControlStyles5: string;

var DataOperationControlStyles6: string;

var resolveDataOperationControlValue28: (dataOperationControlValue28?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var DataOperationControlState10: string;

var DataOperationControlStyles7: string;

var DataOperationControlStyles8: string;

var DataOperationControlStyles9: string;

var DataOperationControlThisDocumentServiceIsTooOldForThisEditor: string;

var DataOperationControlAnswerTooLarge: string;

var DataOperationControlStyles10: string;

var isDataOperationControlDeny3: Dynamic;

var isDataOperationControlDeny4: Dynamic;

var isDataOperationControlDeny5: Dynamic;

var DataOperationControlAtRevCold2: string;

var isDataOperationControlDeny6: Dynamic;

var DataOperationControlAnswerUnmaskable: string;

var isDataOperationControlAllow: Dynamic;

var DataOperationControlVerdictLost: string;

var isDataOperationControlUnreachable: Dynamic;

var isDataOperationControlDeny7: Dynamic;

var resolveDataOperationControlVerdict: Dynamic;

var DataOperationControlMessage8: string;

var DataOperationControlMessage9: string;

var DataOperationControlMessage10: string;

var DataOperationControlAccess: Dynamic;

var DataOperationControlWhy: Dynamic;

var DataOperationControlPageGone: Dynamic;

var DataOperationControlWhy2: Dynamic;

var resolveDataOperationControlWhy: Dynamic;

var DataOperationControlWhy3: Dynamic;

var DataOperationControlWhy4: Dynamic;

var DataOperationControlWhy5: Dynamic;

var DataOperationControlNodeGone2: Dynamic;

var dataOperationControlIdentifierPattern: RegExp;

var isDataOperationControlDeny8: Dynamic;

var DataOperationControlMessage11: string;

var DataOperationControlMessage12: string;

var DataOperationControlMessage13: string;

var DataOperationControlMessage14: string;

var DataOperationControlMessage15: string;

var resolveDataOperationControlAuthor: Dynamic;

var DataOperationControlBongoOpLife: string;

function resolveDataOperationControlHold(
  dataOperationControlHold?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      !dataOperationControlHold ||
      typeof dataOperationControlHold.request != `function`
    )
  )
    return {
      hold(
        dataOperationControlHold2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        try {
          dataOperationControlHold
            .request(
              `${DataOperationControlBongoOpLife}${dataOperationControlHold2}`,
              {
                mode: `exclusive`,
              },
              (..._extraArguments: unknown[]): Dynamic => options,
            )
            .catch((..._extraArguments: unknown[]): undefined => undefined);
        } catch {}
      },
      claim(
        dataOperationControlHold2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            try {
              dataOperationControlHold
                .request(
                  `${DataOperationControlBongoOpLife}${dataOperationControlHold2}`,
                  {
                    mode: `exclusive`,
                    ifAvailable: true,
                  },
                  (
                    dataOperationControlHold3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    let matchesDataOperationControlHold =
                      dataOperationControlHold3 != null;
                    resolve(matchesDataOperationControlHold);
                    return matchesDataOperationControlHold
                      ? options
                      : undefined;
                  },
                )
                .catch(
                  (..._extraArguments: unknown[]): Dynamic => resolve(null),
                );
            } catch {
              resolve(null);
            }
          },
        );
      },
      wait(
        dataOperationControlHold2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            try {
              let abortController =
                typeof AbortController == `function`
                  ? new AbortController()
                  : null;
              options.then(
                (..._extraArguments: unknown[]): Dynamic => (
                  abortController?.abort(),
                  resolve(false)
                ),
                (..._extraArguments: unknown[]): undefined => undefined,
              );
              dataOperationControlHold
                .request(
                  `${DataOperationControlBongoOpLife}${dataOperationControlHold2}`,
                  {
                    mode: `exclusive`,
                    ...(abortController
                      ? {
                          signal: abortController.signal,
                        }
                      : {}),
                  },
                  (..._extraArguments: unknown[]): Dynamic => (
                    resolve(true),
                    options
                  ),
                )
                .catch(
                  (..._extraArguments: unknown[]): Dynamic => resolve(false),
                );
            } catch {
              resolve(false);
            }
          },
        );
      },
    };
}

var dataOperationControlValue50003: number;

var resolveDataOperationControlToString: (dataOperationControl?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveDataOperationControlTest3: Dynamic;

var resolveDataOperationControlLocks: Dynamic;

var dataOperationControlValue50004: number;

var DataOperationControlState11: number[];

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationControl2Step1(): void {
  (DataOperationControlTableRow = `tableRow`);
  (DataOperationControlCell = `cell`);
  (dataOperationControlSet6 = new (Set as Dynamic)([
    DataOperationControlTableRow,
    DataOperationControlCell,
    `tableCell`,
    `tableHeader`,
  ]));
  (dataOperationControlSet7 = new (Set as Dynamic)([
    DataOperationControlTableRow,
    `tableCell`,
    `tableHeader`,
    `listItem`,
  ]));
  (dataOperationControlSet8 = new (Set as Dynamic)([
    `wrap`,
    `unwrap`,
    `move`,
    `split`,
  ]));
  (dataOperationControlDbTimeoutDbUnavailableValues = [
    `db_timeout`,
    `db_unavailable`,
  ]);
  (DataOperationControlMessage2 = `Having trouble saving — retrying…`);
  (DataOperationControlSaved = `Saved`);
  (DataOperationControlProseStoreShed = `prose:store-shed`);
  (dataOperationControlValue1500 = 1500);
  (resolveDataOperationControlValue18 = (
    dataOperationControlValue18?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataOperationControlValue18 == `object` &&
    !!dataOperationControlValue18 &&
    !Array.isArray(dataOperationControlValue18));
  (dataOperationControlSet9 = new (Set as Dynamic)([
    `ledger-busy`,
    `forward-timeout`,
    `hop-timeout`,
  ]));
  (resolveDataOperationControlValue20 = (
    dataOperationControlValue20?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataOperationControlValue20 == `object` &&
    !!dataOperationControlValue20 &&
    !Array.isArray(dataOperationControlValue20));
  (resolveDataOperationControlEvery2 = (
    dataOperationControlEvery2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Object.keys(dataOperationControlEvery2).every(
      (rolldownNImportKey?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        options.includes(rolldownNImportKey),
    ));
  (resolveDataOperationControlValue21 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) => typeof items == `string` && items.length > 0);
  (resolveDataOperationControlChars2 = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !resolveDataOperationControlValue20(entry) ||
      entry.kind !== `chars` ||
      Object.keys(entry).length !== 2
    )
      return null;
    let range: Dynamic = entry.range;
    return Array.isArray(range) &&
      range.length === 2 &&
      resolveDataOperationControlValue21(range[0]) &&
      resolveDataOperationControlValue21(range[1])
      ? [range[0], range[1]]
      : null;
  });
  (isDataOperationControlInsert = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!resolveDataOperationControlValue20(event)) return false;
    if (event.op === `insert`) {
      if (
        !resolveDataOperationControlEvery2(event, [
          `op`,
          `target`,
          `side`,
          `source`,
          `ids`,
        ])
      )
        return false;
      let label: Dynamic = event.side === undefined ? `after` : event.side;
      if (typeof label != `string`) return false;
      let target: Dynamic = event.target;
      if (!resolveDataOperationControlValue20(target)) return false;
      if (target.kind === `chars`) {
        let dataOperationControlChars2: Dynamic =
          resolveDataOperationControlChars2(target);
        if (
          !dataOperationControlChars2 ||
          dataOperationControlChars2[0] !== dataOperationControlChars2[1] ||
          (label !== `after` && label !== `before`)
        )
          return false;
      } else if (target.kind === `blocks`) {
        let ids: Dynamic = target.ids;
        if (
          Object.keys(target).length !== 2 ||
          !Array.isArray(ids) ||
          ids.length !== 1 ||
          !resolveDataOperationControlValue21(ids[0]) ||
          (label !== `start` && label !== `end`)
        )
          return false;
      } else return false;
      let source: Dynamic = event.source;
      if (
        !resolveDataOperationControlValue20(source) ||
        Object.keys(source).length !== 2 ||
        source.as !== `text`
      )
        return false;
      let from: Dynamic = source.from;
      if (
        !resolveDataOperationControlValue20(from) ||
        Object.keys(from).length !== 2 ||
        from.kind !== `inline`
      )
        return false;
      let content: Dynamic = from.content;
      if (typeof content != `string`) return false;
      let itemsCount = [...content].length;
      return itemsCount === 0 ||
        itemsCount > 256 ||
        content.includes(`
`) ||
        content.includes(`\r`)
        ? false
        : event.ids === undefined
          ? true
          : Array.isArray(event.ids) &&
            event.ids.length === itemsCount &&
            event.ids.every(
              (id?: unknown, ..._extraArguments: unknown[]) =>
                typeof id == `string`,
            );
    }
    return event.op === `delete`
      ? !resolveDataOperationControlEvery2(event, [
          `op`,
          `target`,
          `allowDetach`,
          `ifRev`,
          `ifHash`,
        ]) ||
        (event.allowDetach !== undefined &&
          typeof event.allowDetach != `boolean`) ||
        (event.ifRev !== undefined &&
          !(Number.isInteger(event.ifRev) && event.ifRev >= 0)) ||
        (event.ifHash !== undefined && typeof event.ifHash != `string`)
        ? false
        : resolveDataOperationControlChars2(event.target) !== null
      : false;
  });
  (resolveDataOperationControlEvery3 = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length >= 1 &&
    items.length <= 64 &&
    items.every(isDataOperationControlInsert));
  (resolveDataOperationControlValue22 = (
    dataOperationControlValue22?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      let pagesLinkOddEvent = createPagesLinkOddEvent(
        dataOperationControlValue22,
        options,
        context,
      );
      if (pagesLinkOddEvent !== null) {
        emitTelemetryEvent(pagesLinkOddEvent);
      }
    } catch {}
  });
  (dataOperationControlValue2000 = 2e3);
  (DataOperationControlState2 = [
    dataOperationControlValue2000,
    dataOperationControlValue2000,
    dataOperationControlValue2000,
    5e3,
    1e4,
    3e4,
  ]);
  (dataOperationControlValue30000 = 3e4);
  (dataOperationControlValue10000 = 1e4);
  (dataOperationControlValue300000 = 3e5);
  (dataOperationControlValue8 = 8);
  (dataOperationControlValue20002 = 2e3);
  (dataOperationControlValue20003 = 2e3);
  (DataOperationControlTheLogDidNotAnswerWithinWALMS = Symbol(
    `the log did not answer within WAL_MS`,
  ));
  (dataOperationControlValue1000 = 1e3);
  (dataOperationControlValue5000 = 5e3);
  (dataOperationControlValue3000 = 3e3);
  (dataOperationControlValue300002 = 3e4);
  (dataOperationControlValue60000 = 6e4);
  (DataOperationControlState3 = 2 * 500);
  (DataOperationControlState4 = 2 * 500);
  (dataOperationControlValue100002 = 1e4);
  (dataOperationControlValue40000 = 4e4);
  (resolveDataOperationControlValue24 = (
    dataOperationControlValue24?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationControlRound2(
      Math.min(
        dataOperationControlValue40000,
        dataOperationControlValue100002 *
          2 ** Math.max(0, dataOperationControlValue24 - 1),
      ),
      options,
    ));
  (DataOperationControlState5 = [1e4, 3e4, 9e4]);
  (dataOperationControlValue3000002 = 3e5);
  (dataOperationControlValue1800000 = 18e5);
  (resolveDataOperationControlValue25 = (
    dataOperationControlValue25?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationControlValue25 <= DataOperationControlState5.length
      ? DataOperationControlState5[Math.max(1, dataOperationControlValue25) - 1]
      : dataOperationControlValue25 <= DataOperationControlState5.length + 12
        ? dataOperationControlValue3000002
        : dataOperationControlValue1800000);
  (resolveDataOperationControlRound = (
    dataOperationControlRound?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationControlRound2(
      Math.round(
        (resolveDataOperationControlValue25(dataOperationControlRound) * 4) / 3,
      ),
      options,
    ));
  (dataOperationControlSet10 = new (Set as Dynamic)([
    `access`,
    `forbidden`,
    `not_allowed`,
    `read_only`,
    `permission_denied`,
    `not_found`,
  ]));
  (DataOperationControlState6 = DataOperationControlState5[0]);
  (dataOperationControlValue600002 = 6e4);
  (resolveDataOperationControlValue26 = (
    dataOperationControlValue26?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.min(
      dataOperationControlValue5000,
      Math.max(
        dataOperationControlValue26 > 0 ? dataOperationControlValue26 : 0,
        options,
      ),
    ));
  (dataOperationControlValue8000 = 8e3);
  (DataOperationControlAtRevCold = {
    atRevCold: false,
  });
  (dataOperationControlValue20004 = 2e3);
  (resolveDataOperationControlValue27 = (
    dataOperationControlValue27?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationControlRound2(
      Math.min(
        dataOperationControlValue20004,
        100 * 2 ** Math.max(0, dataOperationControlValue27 - 1),
      ),
      options,
    ));
  (dataOperationControlValue10002 = 1e3);
  (dataOperationControlValue50002 = 5e3);
  (DataOperationControlMessage3 = `This document is busy — your edits are kept and will save shortly.`);
  (resolveDataOperationControlRound3 = (
    dataOperationControlRound3?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.min(
      dataOperationControlValue50002,
      Math.max(
        options > 0 ? options : 0,
        resolveDataOperationControlRound2(
          Math.min(
            dataOperationControlValue50002,
            Math.round(
              dataOperationControlValue10002 *
                1.5 ** Math.max(0, dataOperationControlRound3 - 1),
            ),
          ),
          context,
        ),
      ),
    ));
  (filterDataOperationControlDeny = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (response.verdict !== `deny` || isDataOperationControlDeny2(response))
      return null;
    let response2: Dynamic = response;
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    let trimmedFilteredItemsText = [response2.detail, data.detail, data.message]
      .filter(
        (item?: unknown, ..._extraArguments: unknown[]) =>
          typeof item == `string`,
      )
      .join(` `)
      .trim();
    let text = String(data.code ?? response2.code ?? ``);
    if (
      !(
        (response.reason === `conflict` &&
          /^ledger[-_]busy/.test(trimmedFilteredItemsText)) ||
        /^ledger[-_]busy$/.test(text) ||
        (response2.error === `busy` && /ledger[-_]busy/.test(text))
      )
    )
      return null;
    let number2 = Number(data.retryAfterMs ?? response2.retryAfterMs ?? 0);
    return Number.isFinite(number2) && number2 > 0 ? number2 : 0;
  });
  (dataOperationControlValue20005 = 2e3);
  (dataOperationControlValue64 = 64);
  (DataOperationControlState7 = DataModelSchemasOpsPerUpdate);
  (DataOperationControlState8 = DataModelSchemasState18);
  (dataOperationControlValue100003 = 1e4);
  (dataOperationControlValue10003 = 1e3);
  (dataOperationControlValue300003 = 3e4);
  (dataOperationControlValue20006 = 2e3);
  (dataOperationControlValue4000 = 4e3);
  (DataOperationControlMessage4 = `Lots of people are opening this doc right now — loading your copy…`);
  (DataOperationControlMessage5 = `Still loading — retrying automatically…`);
  (DataOperationControlMessage6 = `This is taking longer than usual — still retrying automatically.`);
  (resolveDataOperationControlWords = (
    dataOperationControlWords?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationControlWords >= 45e3
      ? {
          words: DataOperationControlMessage6,
          stage: `slow`,
        }
      : dataOperationControlWords >= 1e4
        ? {
            words: DataOperationControlMessage5,
            stage: `still`,
          }
        : {
            words: DataOperationControlMessage4,
            stage: `crowded`,
          });
  (dataOperationControlValue300004 = 3e4);
  (dataOperationControlValue3000003 = 3e5);
  (resolveDataOperationControlRound4 = (
    dataOperationControlRound4?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    argument: Dynamic = dataOperationControlValue300003,
    ..._extraArguments: unknown[]
  ) => {
    let options2: Dynamic = options > 0 ? options : 0;
    let max = Math.max(
      options2,
      Math.min(
        argument,
        Math.max(options2, context) *
          2 ** Math.max(0, dataOperationControlRound4 - 1),
      ),
    );
    return Math.round(max + (Math.min(1, Math.max(0, dependencies())) * max) / 2);
  });
  (dataOperationControlValue10004 = 1e3);
  (dataOperationControlValue40002 = 4e3);
  (dataOperationControlValue100004 = 1e4);
  (dataOperationControlValue80000 = 8e4);
  (dataOperationControlValue30002 = 3e3);
  (dataOperationControlValue6000 = 6e3);
  (dataOperationControlValue2500 = 2500);
  (dataOperationControlValue100005 = 1e4);
  (DataOperationControlState9 = dataOperationControlValue8000 * 2);
  (DataOperationControlMessage7 = `the stall healer's one whole read (BGO-1280 interim)`);
  (dataOperationControlValue600003 = 6e4);
  (dataOperationControlValue15000 = 15e3);
  (DataOperationControlStyles4 = `ops on the feed: one whole read (a gap the told rows cannot close)`);
  (DataOperationControlARowPastRevsThisPageNeverHeard = `a row past revs this page never heard`);
  (dataOperationControlValue150002 = 15e3);
  (dataOperationControlValue20007 = 2e3);
  (DataOperationControlARevABellNamedNeverCameInADelta = `a rev a bell named never came in a delta`);
  (DataOperationControlStyles5 = `This document is too long to open whole here yet. Its first part is shown read-only; nothing is lost.`);
  (DataOperationControlStyles6 = `This document is too long for this server to open whole. Its first part is shown read-only; nothing is lost.`);
  (resolveDataOperationControlValue28 = (
    dataOperationControlValue28?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `This document is too long for this server to open whole — ${dataOperationControlValue28} of its ${dataOperationControlValue28 + options} blocks are not shown. The first part is shown read-only; nothing is lost.`);
  (DataOperationControlState10 = DataOperationControlStyles6);
  (DataOperationControlStyles7 = `This document has grown too long for this server to open whole. What is shown here stays as it is, read-only; nothing is lost.`);
  (DataOperationControlStyles8 = `This document could not be read whole just now; it will be tried again.`);
  (DataOperationControlStyles9 = `This document could not be read whole just now — its first part is shown read-only while it is tried again in a moment; nothing is lost.`);
  (DataOperationControlThisDocumentServiceIsTooOldForThisEditor = `This document service is too old for this editor.`);
  (DataOperationControlAnswerTooLarge = `answer-too-large`);
  (DataOperationControlStyles10 = `This document is too long to open whole here; nothing is lost.`);
  (isDataOperationControlDeny3 = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !!response &&
    response.verdict === `deny` &&
    (response.reason === `answer-too-large` || response.status === 413));
  (isDataOperationControlDeny4 = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      !response ||
      response.verdict !== `deny` ||
      isDataOperationControlDeny5(response)
    )
      return false;
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    if (data.problem === `range`) return false;
    let stringify = JSON.stringify([
      data.issues,
      data.at,
      data.with,
      data.detail,
      response.detail,
    ]);
    return (
      /\batRev(?:Cold)?\b/.test(stringify) &&
      /unknown[_ ]key|conflicts|unexpected|stray/.test(
        JSON.stringify([
          data.problem,
          data.why,
          data.issues,
          response.reason,
          data.detail,
          response.detail,
        ]),
      )
    );
  });
  (isDataOperationControlDeny5 = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!response || response.verdict !== `deny`) return false;
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    return (
      data.problem === `range` ||
      data.was === `bad_range` ||
      data.code === `bad_range` ||
      response.reason === `bad_range`
    );
  });
  (DataOperationControlAtRevCold2 = `at_rev_cold`);
  (isDataOperationControlDeny6 = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !!response &&
    response.verdict === `deny` &&
    isPlainRecord(response.data) &&
    (response.data.why === `at_rev_cold` || response.data.retryAt === `head`));
  (DataOperationControlAnswerUnmaskable = `answer-unmaskable`);
  (isDataOperationControlAllow = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !!response &&
    response.verdict === `allow` &&
    (response.status === 413 ||
      response.reason === `answer-too-large` ||
      response.ackTooLarge === true ||
      (isPlainRecord(response.data) && response.data.trimmed === true)));
  (DataOperationControlVerdictLost = `verdict_lost`);
  (isDataOperationControlUnreachable = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !!response &&
    ((response.verdict === `unreachable` && response.verdictLost === true) ||
      (response.verdict === `deny` &&
        (response.reason === `answer-too-large` ||
          response.reason === `answer-unmaskable`))));
  (isDataOperationControlDeny7 = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !!response &&
    response.verdict === `deny` &&
    response.reason === `conflict` &&
    (isDataOperationControlDeny2(response) ||
      (response.status === 409 &&
        filterDataOperationControlDeny(response) === null)));
  (resolveDataOperationControlVerdict = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let retryAfterMs = Number(
      (isPlainRecord(response.data) ? response.data.retryAfterMs : undefined) ??
        response.retryAfterMs,
    );
    return {
      verdict: `unreachable`,
      lost: true,
      conflictLost: true,
      ...(typeof response.status == `number`
        ? {
            status: response.status,
          }
        : {}),
      ...(Number.isFinite(retryAfterMs) && retryAfterMs > 0
        ? {
            retryAfterMs: retryAfterMs,
          }
        : {}),
    };
  });
  (DataOperationControlMessage8 = `Still saving — your last change is not confirmed yet.`);
  (DataOperationControlMessage9 = `Not everything you typed here before reloading is saved yet — reload once you’re back online and signed in.`);
  (DataOperationControlMessage10 = `This document is waiting for a server update — editing resumes automatically.`);
  (DataOperationControlAccess = resolvePlatformAnnouncementsToUpperCase(`access`));
  (DataOperationControlWhy = resolvePlatformAnnouncementsToUpperCase(
    `forbidden`,
    {
      why: `role`,
      need: `reader`,
    },
  ));
  (DataOperationControlPageGone = resolvePlatformAnnouncementsToUpperCase(`page_gone`));
  (DataOperationControlWhy2 = resolvePlatformAnnouncementsToUpperCase(
    `page_gone`,
    {
      why: `unreached`,
    },
  ));
  (resolveDataOperationControlWhy = (
    why?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformAnnouncementsToUpperCase(`forbidden`, {
      why: why,
    }));
  (DataOperationControlWhy3 = resolvePlatformAnnouncementsToUpperCase(
    `link_down`,
    {
      why: `unreached`,
    },
  ));
  (DataOperationControlWhy4 = resolvePlatformAnnouncementsToUpperCase(
    `link_down`,
    {
      why: `refusing`,
    },
  ));
  (DataOperationControlWhy5 = resolvePlatformAnnouncementsToUpperCase(
    `forbidden`,
    {
      why: `unauthenticated`,
    },
  ));
  (DataOperationControlNodeGone2 = resolvePlatformAnnouncementsToUpperCase(`node_gone`));
  (dataOperationControlIdentifierPattern = /^(access|forbidden|not_allowed|read_only)$/);
  (isDataOperationControlDeny8 = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (response.verdict !== `deny`) return false;
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    let filteredItems = [response.reason, data.code].filter(
      (item?: unknown, ..._extraArguments: unknown[]) => typeof item == `string`,
    );
    return filteredItems.some(
      (filteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
        dataOperationControlIdentifierPattern.test(filteredItem) ||
        filteredItem === `member_denied`,
    )
      ? data.why !== `unauthenticated` &&
          !filteredItems.includes(`unauthenticated`)
      : false;
  });
  (DataOperationControlMessage11 = `
`);
  (DataOperationControlMessage12 = `\b`);
  (DataOperationControlMessage13 = `Reconnecting…`);
  (DataOperationControlMessage14 = `Unsaved — retrying. Your last change is kept and will be sent again.`);
  (DataOperationControlMessage15 = `That paragraph was just replaced — your last keystrokes are being placed again.`);
  (resolveDataOperationControlAuthor = (
    dataOperationControlAuthor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlAuthor !== undefined &&
    dataOperationControlAuthor.author !== undefined
      ? {
          author: dataOperationControlAuthor.author,
        }
      : {});
  (DataOperationControlBongoOpLife = `bongo.op-life:`);
  (dataOperationControlValue50003 = 5e3);
  (resolveDataOperationControlToString = (
    dataOperationControl?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `s${Math.floor(Math.min(1, Math.max(0, dataOperationControl())) * 2 ** 52).toString(36)}`);
  (resolveDataOperationControlTest3 = (
    dataOperationControlTest3?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataOperationControlTest3 == `string` &&
    /^s[0-9a-z]{1,16}$/.test(dataOperationControlTest3));
  (resolveDataOperationControlLocks = (
    dataOperationControlLocks?: Dynamic,
    options?: Dynamic,
    timers?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: resolveDataOperationControlToString(options),
    locks: resolveDataOperationControlHold(dataOperationControlLocks) ?? null,
    timers: timers,
  }));
  (dataOperationControlValue50004 = 5e3);
  (DataOperationControlState11 = [400, 1e3, 3e3]);
}

export {
  DataOperationControlARevABellNamedNeverCameInADelta,
  DataOperationControlARowPastRevsThisPageNeverHeard,
  DataOperationControlAccess,
  DataOperationControlAnswerTooLarge,
  DataOperationControlAnswerUnmaskable,
  DataOperationControlAtRevCold,
  DataOperationControlAtRevCold2,
  DataOperationControlCell,
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
  DataOperationControlState7,
  DataOperationControlState8,
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
  dataOperationControlSet6,
  dataOperationControlSet7,
  dataOperationControlSet8,
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
  dataOperationControlValue50003,
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
  resolveDataOperationControlHold,
  resolveDataOperationControlLocks,
  resolveDataOperationControlRound,
  resolveDataOperationControlRound2,
  resolveDataOperationControlRound3,
  resolveDataOperationControlRound4,
  resolveDataOperationControlShed,
  resolveDataOperationControlTest3,
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
};

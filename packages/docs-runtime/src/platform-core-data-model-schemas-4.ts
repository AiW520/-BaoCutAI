/** BaoCut: data model schemas from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  create,
} from "./platform-core-dependencies";
import {
  resolvePlatformSessionAndSourcesClaude,
} from "./platform-core-platform-session-and-sources-1";
import {
  editorExtensionsPattern12,
} from "./platform-core-editor-extensions-3";
import {
  resolveEditorAnchorsAndMentionsLabel,
  resolveEditorAnchorsAndMentionsReplaceAll,
} from "./platform-core-editor-anchors-and-mentions-1";
import {
  resolveObservabilityBrowserAndOperationEventsValue3,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  apiFetcher,
} from "./platform-core-platform-api-and-auth-2";
import {
  resolvePlatformApiAndAuthExternal,
  resolvePlatformApiAndAuthInternal,
} from "./platform-core-platform-api-and-auth-5";
import {
  isPlatformApiAndAuthAnon,
  resolvePlatformApiAndAuthCharCodeAt,
} from "./platform-core-platform-api-and-auth-6";
import {
  isAgentRow,
  resolveDataModelSchemasFrame,
  resolveDataModelSchemasIsFinite2,
} from "./platform-core-data-model-schemas-3";

function isDataModelSchemasAuto(
  dataModelSchemasAuto?: Dynamic,
  element?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = `y`,
  ..._extraArguments: unknown[]
) {
  let dataModelSchemasAuto2: Dynamic = dataModelSchemasAuto;
  let dataModelSchemasAuto3: Dynamic = dataModelSchemasAuto2
    ? dataModelSchemasAuto2.nodeType === 1
      ? dataModelSchemasAuto2
      : dataModelSchemasAuto2.parentElement
    : null;
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (!defaultView) return false;
  for (
    let dataModelSchemasAuto4: Dynamic = dataModelSchemasAuto3;
    dataModelSchemasAuto4 && dataModelSchemasAuto4 !== element;
    dataModelSchemasAuto4 = dataModelSchemasAuto4.parentElement
  ) {
    let dataModelSchemasAuto5: Dynamic = dataModelSchemasAuto4;
    let computedStyle: Dynamic = defaultView.getComputedStyle(
      dataModelSchemasAuto5,
    );
    let overflowY: Dynamic =
      dependencies === `y` ? computedStyle.overflowY : computedStyle.overflowX;
    if (
      !(
        overflowY === `auto` ||
        overflowY === `scroll` ||
        overflowY === `overlay` ||
        dataModelSchemasAuto5.tagName === `TEXTAREA`
      )
    )
      continue;
    let scrollHeight: Dynamic =
      dependencies === `y`
        ? dataModelSchemasAuto5.scrollHeight
        : dataModelSchemasAuto5.scrollWidth;
    let clientHeight: Dynamic =
      dependencies === `y`
        ? dataModelSchemasAuto5.clientHeight
        : dataModelSchemasAuto5.clientWidth;
    let scrollTop: Dynamic =
      dependencies === `y`
        ? dataModelSchemasAuto5.scrollTop
        : dataModelSchemasAuto5.scrollLeft;
    if (
      !(scrollHeight <= clientHeight + 1) &&
      (context > 0
        ? scrollTop + clientHeight < scrollHeight - 1
        : scrollTop > 0)
    )
      return true;
  }
  return false;
}

function resolveDataModelSchemasRail(
  dataModelSchemasRail?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let dataModelSchemasRail2: Dynamic = dataModelSchemasRail;
  return dataModelSchemasRail2
    ? options.contains(dataModelSchemasRail2)
      ? `rail`
      : dataModelSchemasRail2.nodeType === 1 &&
          dataModelSchemasRail2.matches(context)
        ? `doc`
        : null
    : null;
}

function resolveDataModelSchemasDefaultPrevented(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (event.defaultPrevented || event.ctrlKey) return null;
  let dataModelSchemasIsFinite2: Dynamic = resolveDataModelSchemasIsFinite2(
    event,
    options.clientHeight,
  );
  return Math.abs(event.deltaX) > Math.abs(event.deltaY)
    ? isDataModelSchemasAuto(event.target, options, event.deltaX, `x`) ||
      (dataModelSchemasIsFinite2 !== 0 &&
        isDataModelSchemasAuto(
          event.target,
          options,
          dataModelSchemasIsFinite2,
        ))
      ? null
      : 0
    : dataModelSchemasIsFinite2 === 0
      ? 0
      : isDataModelSchemasAuto(event.target, options, dataModelSchemasIsFinite2)
        ? null
        : dataModelSchemasIsFinite2 < 0 && context <= 0
          ? 0
          : dataModelSchemasIsFinite2;
}

function resolveDataModelSchemasTarget(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveDataModelSchemasRail(event.target, options, dependencies))
    return null;
  let dataModelSchemasDefaultPrevented: Dynamic =
    resolveDataModelSchemasDefaultPrevented(event, context, argument);
  return dataModelSchemasDefaultPrevented === null ||
    (dataModelSchemasDefaultPrevented !== 0 &&
      !argument2(dataModelSchemasDefaultPrevented))
    ? null
    : (event.cancelable && event.preventDefault(),
      dataModelSchemasDefaultPrevented);
}

function resolveDataModelSchemasCardTop(
  dataModelSchemasCard?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let max = Math.max(dataModelSchemasCard.cardTop, 0);
  if (dataModelSchemasCard.railH > 0) {
    max = Math.min(
      max,
      Math.max(0, dataModelSchemasCard.railH - dataModelSchemasCard.cardH),
    );
  }
  let max2 = Math.max(
    dataModelSchemasCard.anchorY - max,
    -Math.max(0, dataModelSchemasCard.docScrollY),
  );
  if (
    dataModelSchemasCard.docScrollMax != null &&
    Number.isFinite(dataModelSchemasCard.docScrollMax)
  ) {
    max2 = Math.min(
      max2,
      Math.max(
        0,
        dataModelSchemasCard.docScrollMax - dataModelSchemasCard.docScrollY,
      ),
    );
  }
  max2 = Math.round(max2);
  return Number.isFinite(max2) && max2 !== 0 ? max2 : 0;
}

function resolveDataModelSchemasRailTop(
  dataModelSchemasRail?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let total: Dynamic = dataModelSchemasRail.railTop + dataModelSchemasRail.pad;
  let difference: Dynamic =
    dataModelSchemasRail.railBottom - dataModelSchemasRail.pad;
  let difference2: Dynamic =
    dataModelSchemasRail.cardTop < total
      ? dataModelSchemasRail.cardTop - total
      : dataModelSchemasRail.cardBottom > difference
        ? Math.min(
            dataModelSchemasRail.cardBottom - difference,
            dataModelSchemasRail.cardTop - total,
          )
        : 0;
  let round = Math.round(
    Math.max(difference2, -Math.max(0, dataModelSchemasRail.docScrollY)),
  );
  return Number.isFinite(round) && round !== 0 ? round : 0;
}

function resolveDataModelSchemasCardTop2(
  dataModelSchemasCard?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    dataModelSchemasCard.rowTop >= dataModelSchemasCard.listTop - 1 &&
    dataModelSchemasCard.rowBottom <= dataModelSchemasCard.listBottom + 1
  )
    return 0;
  let difference: Dynamic =
    dataModelSchemasCard.listBottom - dataModelSchemasCard.listTop;
  let difference2 =
    Math.min(dataModelSchemasCard.rowBottom, dataModelSchemasCard.listBottom) -
    Math.max(dataModelSchemasCard.rowTop, dataModelSchemasCard.listTop);
  return dataModelSchemasCard.again === true &&
    dataModelSchemasCard.rowBottom - dataModelSchemasCard.rowTop > difference &&
    difference2 >= difference / 2
    ? 0
    : resolveDataModelSchemasRailTop({
        cardTop: dataModelSchemasCard.rowTop,
        cardBottom: dataModelSchemasCard.rowBottom,
        railTop: dataModelSchemasCard.listTop,
        railBottom: dataModelSchemasCard.listBottom,
        pad: 8,
        docScrollY: dataModelSchemasCard.listScrollTop,
      });
}

function isDataModelSchemasCardTop(
  dataModelSchemasCard?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !dataModelSchemasCard.live ||
    dataModelSchemasCard.widget ||
    dataModelSchemasCard.cardTop === undefined ||
    dataModelSchemasCard.anchorY === undefined
    ? 0
    : resolveDataModelSchemasCardTop({
        cardTop: dataModelSchemasCard.cardTop,
        cardH: dataModelSchemasCard.cardH + dataModelSchemasCard.replyRoom,
        anchorY: dataModelSchemasCard.anchorY,
        railH: dataModelSchemasCard.railH,
        docScrollY: dataModelSchemasCard.docScrollY,
        docScrollMax: dataModelSchemasCard.docScrollMax,
      });
}

function resolveDataModelSchemasValue12(
  dataModelSchemasValue12?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  let enabled = false;
  for (let resolveDataModelSchemasValue12Result in dataModelSchemasValue12) {
    record2[resolveDataModelSchemasValue12Result] =
      dataModelSchemasValue12[resolveDataModelSchemasValue12Result] - options;
    enabled = true;
  }
  return options === 0 || !enabled ? dataModelSchemasValue12 : record2;
}

function resolveDataModelSchemasDocScrollMax(
  dataModelSchemasDocScrollMax?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let isDataModelSchemasCardTop2 = isDataModelSchemasCardTop(
    dataModelSchemasDocScrollMax,
  );
  let isDataModelSchemasCardTop3 = isDataModelSchemasCardTop({
    ...dataModelSchemasDocScrollMax,
    docScrollMax: null,
  });
  return {
    dy: isDataModelSchemasCardTop2,
    shortfall: Math.max(
      0,
      isDataModelSchemasCardTop3 - isDataModelSchemasCardTop2,
    ),
  };
}

var dataModelSchemasSet8: Dynamic;

function resolveDataModelSchemasUnknown(
  dataModelSchemasUnknown?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasUnknown2: Dynamic =
    typeof dataModelSchemasUnknown == `string`
      ? dataModelSchemasUnknown
      : dataModelSchemasUnknown instanceof (Error as Dynamic) ||
          (typeof dataModelSchemasUnknown == `object` &&
            dataModelSchemasUnknown)
        ? dataModelSchemasUnknown.name
        : undefined;
  return typeof dataModelSchemasUnknown2 == `string` &&
    dataModelSchemasSet8.has(dataModelSchemasUnknown2)
    ? dataModelSchemasUnknown2
    : `unknown`;
}

var DataModelSchemasState13: Dynamic;

var DataModelSchemasStyles5: string;

var DataModelSchemasState14: RegExp;

var DataModelSchemasState15: RegExp;

var dataModelSchemasInsertedContentDeeperThanInsertionPositionInconsistentOpenDepthsValues: string[];

var dataModelSchemasValue02: number;

function resolveDataModelSchemasValue13(
  dataModelSchemasValue13?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let dataModelSchemasValue13Item: Dynamic =
      typeof dataModelSchemasValue13 == `object` && dataModelSchemasValue13
        ? dataModelSchemasValue13[options]
        : undefined;
    return typeof dataModelSchemasValue13Item == `string`
      ? dataModelSchemasValue13Item
      : ``;
  } catch {
    dataModelSchemasValue02++;
    return ``;
  }
}

function resolveDataModelSchemasName(
  dataModelSchemasName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveDataModelSchemasUnknown(
    resolveDataModelSchemasValue13(dataModelSchemasName, `name`),
  );
}

function resolveDataModelSchemasThrownClass(
  dataModelSchemasThrownClass?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasValue13: Dynamic = resolveDataModelSchemasValue13(
    dataModelSchemasThrownClass,
    `thrownClass`,
  );
  return dataModelSchemasValue13 === DataModelSchemasState13 ||
    dataModelSchemasSet8.has(dataModelSchemasValue13)
    ? dataModelSchemasValue13
    : resolveDataModelSchemasName(dataModelSchemasThrownClass);
}

function resolveDataModelSchemasMessage(
  dataModelSchemasMessage?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let match = DataModelSchemasState14.exec(
    resolveDataModelSchemasValue13(dataModelSchemasMessage, `message`).split(
      `:`,
    )[0] ?? ``,
  );
  return match ? (match[1] ?? null) : null;
}

function resolveDataModelSchemasMessage2(
  dataModelSchemasMessage2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let dataModelSchemasMessage = resolveDataModelSchemasMessage(
    dataModelSchemasMessage2,
  );
  if (dataModelSchemasMessage !== null)
    return `Invalid content for node ${dataModelSchemasMessage}`;
  let dataModelSchemasValue13: Dynamic = resolveDataModelSchemasValue13(
    dataModelSchemasMessage2,
    `message`,
  );
  let dataModelSchemasInsertedContentDeeperThanInsertionPositionInconsistentOpenDepthsValue =
    dataModelSchemasInsertedContentDeeperThanInsertionPositionInconsistentOpenDepthsValues.find(
      (
        dataModelSchemasInsertedContentDeeperThanInsertionPositionInconsistentOpenDepthsValue2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataModelSchemasInsertedContentDeeperThanInsertionPositionInconsistentOpenDepthsValue2 ===
        dataModelSchemasValue13,
    );
  if (
    dataModelSchemasInsertedContentDeeperThanInsertionPositionInconsistentOpenDepthsValue !==
    undefined
  )
    return dataModelSchemasInsertedContentDeeperThanInsertionPositionInconsistentOpenDepthsValue;
  let match = DataModelSchemasState15.exec(dataModelSchemasValue13);
  return match ? `Cannot join ${match[1]} onto ${match[2]}` : null;
}

function resolveDataModelSchemasValue14(
  dataModelSchemasValue14?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasMessage2 = resolveDataModelSchemasMessage2(
    dataModelSchemasValue14,
  );
  return dataModelSchemasMessage2 === null
    ? resolveDataModelSchemasName(dataModelSchemasValue14)
    : `${resolveDataModelSchemasName(dataModelSchemasValue14)}: ${dataModelSchemasMessage2}`;
}

var DataModelSchemasStyles6: string;

var DataModelSchemasStyles7: string;

var DataModelSchemasState16: RegExp;

var dataModelSchemasValue5122: number;

function isDataModelSchemasPrepareStackTrace(
  dataModelSchemasPrepareStackTrace?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    for (
      let dataModelSchemasPrepareStackTrace2: Dynamic =
          dataModelSchemasPrepareStackTrace,
        index = 0;
      (typeof dataModelSchemasPrepareStackTrace2 == `function` ||
        typeof dataModelSchemasPrepareStackTrace2 == `object`) &&
      dataModelSchemasPrepareStackTrace2 !== null;
      dataModelSchemasPrepareStackTrace2 = Object.getPrototypeOf(
        dataModelSchemasPrepareStackTrace2,
      )
    ) {
      if (++index > 32) return true;
      let ownPropertyDescriptor = Object.getOwnPropertyDescriptor(
        dataModelSchemasPrepareStackTrace2,
        `prepareStackTrace`,
      );
      if (ownPropertyDescriptor)
        return (
          !(`value` in ownPropertyDescriptor) ||
          typeof ownPropertyDescriptor.value == `function`
        );
    }
    return false;
  } catch {
    return true;
  }
}

var DataModelSchemasState17: boolean;

function filterDataModelSchemasConstructor(
  filterDataModelSchemasConstructor2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    DataModelSchemasState17 ||
    isDataModelSchemasPrepareStackTrace(Error) ||
    isDataModelSchemasPrepareStackTrace(
      filterDataModelSchemasConstructor2.constructor,
    )
  )
    return [];
  let stack: Dynamic = filterDataModelSchemasConstructor2.stack;
  return typeof stack == `string`
    ? stack
        .split(
          `
`,
        )
        .filter(
          (items?: Dynamic, ..._extraArguments: unknown[]) =>
            items.length <= dataModelSchemasValue5122 &&
            DataModelSchemasState16.test(items),
        )
    : [];
}

var resolveDataModelSchemasValue15: Dynamic;

function resolveDataModelSchemasMessage3(
  dataModelSchemasMessage3?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let name: Dynamic = typeof options == `string` ? options : `Error`;
  let context2: Dynamic = typeof context == `string` ? context : `threw`;
  let thrownClass: Dynamic = DataModelSchemasState13;
  let message: Dynamic = `${context2} ${thrownClass}`;
  let enabled: Dynamic = false;
  let dataModelSchemasValue022: Dynamic = dataModelSchemasValue02;
  try {
    thrownClass = resolveDataModelSchemasThrownClass(dataModelSchemasMessage3);
    message =
      resolveDataModelSchemasMessage2(dataModelSchemasMessage3) ??
      `${context2} ${thrownClass}`;
    enabled = dataModelSchemasValue02 === dataModelSchemasValue022;
  } catch {}
  let stack: Dynamic = `${name}: ${message}`;
  try {
    let Error2: Dynamic = Error(message);
    let stack2: Dynamic = stack;
    if (enabled)
      try {
        stack2 = [stack, ...filterDataModelSchemasConstructor(Error2)].join(`
`);
      } catch {}
    Object.defineProperties(Error2, {
      name: resolveDataModelSchemasValue15(name, true),
      message: resolveDataModelSchemasValue15(message, false),
      thrownClass: resolveDataModelSchemasValue15(thrownClass, true),
      stack: resolveDataModelSchemasValue15(stack2, false),
    });
    if (
      Error2.name === name &&
      Error2.message === message &&
      Error2.thrownClass === thrownClass &&
      Error2.stack === stack2
    )
      return Error2;
  } catch {}
  return {
    name: name,
    message: message,
    thrownClass: thrownClass,
    stack: stack,
  };
}

function resolveDataModelSchemasError(
  dataModelSchemasError?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let error: Dynamic = resolveDataModelSchemasMessage3(
    options,
    context,
    dependencies,
  );
  let message: Dynamic = error.message;
  let label = `${error.name}: ${message}`;
  let claimed = false;
  let enabled = false;
  try {
    if (
      dataModelSchemasError &&
      typeof dataModelSchemasError.ErrorEvent == `function`
    ) {
      claimed = !dataModelSchemasError.dispatchEvent(
        new (dataModelSchemasError.ErrorEvent as Dynamic)(`error`, {
          error: error,
          message: message,
          cancelable: true,
        }),
      );
    }
  } catch {
    enabled = true;
  }
  try {
    if (!claimed) {
      console.error(message);
    }
  } catch {
    enabled = true;
  }
  if (enabled)
    try {
      error.stack = label;
    } catch {}
  return {
    safe: error,
    claimed: claimed,
  };
}

var DataModelSchemasDepth: {
    depth: number;
    listLevels: number;
};

function resolveDataModelSchemasIsInteger2(
  dataModelSchemasIsInteger2?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof dataModelSchemasIsInteger2 == `number` &&
    Number.isInteger(dataModelSchemasIsInteger2) &&
    dataModelSchemasIsInteger2 >= 4 &&
    dataModelSchemasIsInteger2 <= 64
  ) {
    DataModelSchemasDepth.depth = dataModelSchemasIsInteger2;
  }
  return DataModelSchemasDepth.depth;
}

function resolveDataModelSchemasIsInteger3(
  dataModelSchemasIsInteger3?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof dataModelSchemasIsInteger3 == `number` &&
    Number.isInteger(dataModelSchemasIsInteger3) &&
    dataModelSchemasIsInteger3 >= 0 &&
    dataModelSchemasIsInteger3 <= 64
  ) {
    DataModelSchemasDepth.listLevels = Math.max(1, dataModelSchemasIsInteger3);
  }
  return DataModelSchemasDepth.listLevels;
}

var DataModelSchemasRowBytes: {
    rowBytes: number;
    inlineSourceBytes: number;
    sourceBytes: number;
    leafChars: number;
    opsPerUpdate: number;
    docBlocks: number;
    docTextBytes: number;
    childrenPerBlock: number;
    readonly depth: number;
    tableCols: number;
    idsPerOp: number;
};

var DataModelSchemasOpsPerUpdate: number;

var DataModelSchemasState18: number;

var resolveDataModelSchemasValue16: Dynamic;

function resolveDataModelSchemasBlocks(
  dataModelSchemasBlocks?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasBlocks2: Dynamic = dataModelSchemasBlocks;
  let ids: Dynamic =
    dataModelSchemasBlocks2?.op === `set` &&
    dataModelSchemasBlocks2.target?.kind === `blocks` &&
    Array.isArray(dataModelSchemasBlocks2.target.ids)
      ? dataModelSchemasBlocks2.target.ids
      : [];
  if (ids.length < 2) return 0;
  let dataModelSchemasValue22: Dynamic = resolveDataModelSchemasValue22(
    dataModelSchemasBlocks2.attrs ?? {},
  );
  let count: Dynamic = 0;
  for (let resolveDataModelSchemasBlocksResult of ids as Dynamic)
    count += resolveDataModelSchemasValue16(
      typeof resolveDataModelSchemasBlocksResult == `string`
        ? resolveDataModelSchemasBlocksResult
        : ``,
      dataModelSchemasValue22,
    );
  return count;
}

var dataModelSchemasPattern18: RegExp;

var dataModelSchemasPattern19: RegExp;

var resolveDataModelSchemasTest5: Dynamic;

var resolveDataModelSchemasTest6: Dynamic;

function resolveDataModelSchemasTest7(
  items?: unknown,
  options: Dynamic = ``,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items == `string`)
    return dataModelSchemasPattern18.test(items) ? options || `.` : null;
  if (Array.isArray(items)) {
    for (let index = 0; index < items.length; index++) {
      let dataModelSchemasTest7: Dynamic = resolveDataModelSchemasTest7(
        items[index],
        `${options}[${index}]`,
      );
      if (dataModelSchemasTest7 !== null) return dataModelSchemasTest7;
    }
    return null;
  }
  if (typeof items == `object` && items)
    for (let [
      resolveDataModelSchemasTest7Result,
      resolveDataModelSchemasTest7Result2,
    ] of Object.entries(items) as Dynamic) {
      if (dataModelSchemasPattern18.test(resolveDataModelSchemasTest7Result))
        return `${options}.${resolveDataModelSchemasTest7Result}(key)`;
      let dataModelSchemasTest7: Dynamic = resolveDataModelSchemasTest7(
        resolveDataModelSchemasTest7Result2,
        `${options}.${resolveDataModelSchemasTest7Result}`,
      );
      if (dataModelSchemasTest7 !== null) return dataModelSchemasTest7;
    }
  return null;
}

var resolveDataModelSchemasValue17: Dynamic;

var resolveDataModelSchemasValue18: Dynamic;

function resolveDataModelSchemasCharCodeAt(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items2: Dynamic = [];
  for (let index = 0; index < items.length; index++) {
    let charCodeAt: Dynamic = items.charCodeAt(index);
    if (!(charCodeAt < 55296 || charCodeAt > 57343)) {
      if (
        resolveDataModelSchemasValue17(charCodeAt) &&
        resolveDataModelSchemasValue18(items.charCodeAt(index + 1))
      ) {
        index++;
      } else {
        items2.push(index);
      }
    }
  }
  return items2;
}

var resolveDataModelSchemasValue19: (dataModelSchemasValue19?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveDataModelSchemasSlice: Dynamic;

var resolveDataModelSchemasCharCodeAt2: Dynamic;

var resolveDataModelSchemasCharCodeAt3: Dynamic;

function resolveDataModelSchemasCharCodeAt4(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    resolveDataModelSchemasCharCodeAt(items),
  );
  let [items3, setItems]: Dynamic = [0, 0];
  for (; items3 < items.length && setItems < items2.length; items3++)
    if (
      !uniqueItems.has(items3) &&
      items.charCodeAt(items3) !== items2.charCodeAt(setItems++)
    )
      return -1;
  return setItems === items2.length ? items3 : -1;
}

var resolveDataModelSchemasSome: Dynamic;

var dataModelSchemasPattern20: RegExp;

var resolveDataModelSchemasLabel: Dynamic;

var resolveDataModelSchemasFlatMap: Dynamic;

var resolveDataModelSchemasValue20: Dynamic;

var resolveDataModelSchemasContent: Dynamic;

var resolveDataModelSchemasValue21: Dynamic;

function isDataModelSchemasCount(
  dataModelSchemasCount?: Dynamic,
  options: Dynamic = [],
  ..._extraArguments: unknown[]
): Dynamic {
  if (!dataModelSchemasCount.some(resolveDataModelSchemasSome)) return null;
  let halves: Dynamic = 0;
  let left = false;
  let predicted: Dynamic = options.map(
    (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [...option],
  );
  let said: Dynamic = options.map(
    (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [...option],
  );
  let ops: Dynamic = dataModelSchemasCount.map(
    (
      dataModelSchemasCount2?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let count: Dynamic = 0;
      let dataModelSchemasValue21: Dynamic = resolveDataModelSchemasValue21(
        dataModelSchemasCount2,
      );
      let fromEntries: Dynamic = (
        dataModelSchemasCount3?: unknown,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (typeof dataModelSchemasCount3 == `string`) {
          let dataModelSchemasCharCodeAt: Dynamic =
            resolveDataModelSchemasCharCodeAt(dataModelSchemasCount3);
          if (dataModelSchemasCharCodeAt.length === 0)
            return dataModelSchemasCount3;
          let dataModelSchemasSlice: Dynamic = resolveDataModelSchemasSlice(
            dataModelSchemasCount3,
            dataModelSchemasCharCodeAt,
          );
          if (
            dataModelSchemasSlice === `` ||
            resolveDataModelSchemasCharCodeAt3(dataModelSchemasCount3)
          ) {
            left = true;
          }
          halves += dataModelSchemasCharCodeAt.length;
          if (options2 === `content` || options2 === `text`) {
            count += dataModelSchemasCharCodeAt.length;
            if (dataModelSchemasCount3 !== dataModelSchemasValue21) {
              left = true;
            }
          }
          return dataModelSchemasSlice;
        }
        return Array.isArray(dataModelSchemasCount3)
          ? dataModelSchemasCount3.map(
              (
                rolldownNImport2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => fromEntries(rolldownNImport2, options2),
            )
          : typeof dataModelSchemasCount3 != `object` || !dataModelSchemasCount3
            ? dataModelSchemasCount3
            : Object.fromEntries(
                Object.entries(dataModelSchemasCount3).map(
                  (
                    [rolldownNImportEntry, rolldownNImportEntryEntry]: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => [
                    rolldownNImportEntry,
                    fromEntries(
                      rolldownNImportEntryEntry,
                      rolldownNImportEntry,
                    ),
                  ],
                ),
              );
      };
      let fromEntries2: Dynamic = fromEntries(dataModelSchemasCount2, ``);
      if (count === 0) return fromEntries2;
      let dataModelSchemasFlatMap: Dynamic = resolveDataModelSchemasFlatMap(
        dataModelSchemasCount2,
        options[index] ?? [],
      );
      if (
        dataModelSchemasFlatMap.length > 0 &&
        dataModelSchemasCount.some(
          (
            rolldownNImport2?: Dynamic,
            index2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            index2 !== index &&
            (resolveDataModelSchemasContent(
              rolldownNImport2,
              dataModelSchemasFlatMap,
            ) ||
              (index2 > index &&
                resolveDataModelSchemasValue20(rolldownNImport2))),
        )
      ) {
        left = true;
      }
      if (Array.isArray(fromEntries2.ids)) {
        if (fromEntries2.ids.length <= count) {
          left = true;
        } else {
          fromEntries2.ids = fromEntries2.ids.slice(
            0,
            fromEntries2.ids.length - count,
          );
        }
      } else if (
        typeof fromEntries2.ids == `object` &&
        fromEntries2.ids !== null &&
        typeof fromEntries2.ids.count == `number`
      ) {
        let ids: Dynamic = fromEntries2.ids;
        if (ids.count <= count) {
          left = true;
        } else {
          fromEntries2.ids = {
            ...ids,
            count: ids.count - count,
          };
        }
      }
      if (
        predicted[index] !== undefined &&
        predicted[index].length > 0 &&
        dataModelSchemasValue21 !== null
      ) {
        let uniqueItems: Dynamic = new (Set as Dynamic)();
        let uniqueItems2: Dynamic = new (Set as Dynamic)(
          resolveDataModelSchemasCharCodeAt(dataModelSchemasValue21),
        );
        let index2 = 0;
        for (
          let index3 = 0;
          index3 < dataModelSchemasValue21.length;
          index3++, index2++
        )
          if (uniqueItems2.has(index3)) {
            uniqueItems.add(index2);
          } else {
            if (
              resolveDataModelSchemasValue17(
                dataModelSchemasValue21.charCodeAt(index3),
              )
            ) {
              index3++;
            }
          }
        if (predicted[index].length !== index2) {
          left = true;
        }
        said[index] = predicted[index].filter(
          (
            predictedItem?: unknown,
            index3?: Dynamic,
            ..._extraArguments: unknown[]
          ) => !uniqueItems.has(index3),
        );
        predicted[index] = predicted[index].slice(
          0,
          Math.max(0, predicted[index].length - count),
        );
      }
      return fromEntries2;
    },
  );
  let predicted2: Dynamic = options.map(
    (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [...option],
  );
  return left
    ? {
        ops: [...dataModelSchemasCount],
        predicted: predicted2,
        said: predicted2,
        halves: halves,
        left: left,
      }
    : {
        ops: ops,
        predicted: predicted,
        said: said,
        halves: halves,
        left: left,
      };
}

var resolveDataModelSchemasBytes: Dynamic;

var resolveDataModelSchemasBytes2: Dynamic;

var resolveDataModelSchemasValue22: Dynamic;

var resolveDataModelSchemasInsert: Dynamic;

function resolveDataModelSchemasBlob(
  dataModelSchemasBlob?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasInsert: Dynamic =
    resolveDataModelSchemasInsert(dataModelSchemasBlob);
  if (!dataModelSchemasInsert || dataModelSchemasInsert.blob !== undefined)
    return 0;
  let content: Dynamic =
    dataModelSchemasInsert.content === undefined
      ? dataModelSchemasInsert.from?.content
      : dataModelSchemasInsert.content;
  return content === undefined
    ? 0
    : typeof content == `string`
      ? resolveDataModelSchemasBytes2(content)
      : resolveDataModelSchemasValue22(content);
}

function resolveDataModelSchemasLaw(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let DataModelSchemasRowBytes2 = DataModelSchemasRowBytes;
  for (let index = 0; index < items.length; index++) {
    let itemItem: Dynamic = items[index];
    let actual: Dynamic = resolveDataModelSchemasBlob(itemItem);
    if (actual > DataModelSchemasRowBytes2.sourceBytes)
      return {
        law: `source_bytes`,
        limit: DataModelSchemasRowBytes2.sourceBytes,
        actual: actual,
        where: `ops[${index}]`,
      };
    if (actual > DataModelSchemasRowBytes2.inlineSourceBytes)
      return {
        law: `inline_source_bytes`,
        limit: DataModelSchemasRowBytes2.inlineSourceBytes,
        actual: actual,
        where: `ops[${index}]`,
      };
    let actual2: Dynamic = Array.isArray(itemItem.ids)
      ? itemItem.ids.length
      : 0;
    if (actual2 > DataModelSchemasRowBytes2.idsPerOp)
      return {
        law: `ids_per_op`,
        limit: DataModelSchemasRowBytes2.idsPerOp,
        actual: actual2,
        where: `ops[${index}].ids`,
      };
  }
  let where: Dynamic = resolveDataModelSchemasTest7(items, `ops`);
  return where === null
    ? null
    : {
        law: `control_chars`,
        limit: 0,
        actual: 1,
        where: where,
      };
}

var resolveDataModelSchemasListItem: Dynamic;

var resolveDataModelSchemasList: Dynamic;

var resolveDataModelSchemasValue23: (dataModelSchemasValue23?: Dynamic, ..._extraArguments: unknown[]) => number;

var resolveDataModelSchemasValue24: (dataModelSchemasValue24?: Dynamic, ..._extraArguments: unknown[]) => number;

function resolveDataModelSchemasDepth(
  dataModelSchemasDepth?: Dynamic,
  options: Dynamic = dataModelSchemasDepth.depth,
  ..._extraArguments: unknown[]
): Dynamic {
  let count: Dynamic = 0;
  for (let count2 = 1; count2 <= options; count2++)
    count += resolveDataModelSchemasValue23(dataModelSchemasDepth.node(count2));
  return count;
}

function resolveDataModelSchemasDepth2(
  dataModelSchemasDepth2?: Dynamic,
  options: Dynamic = dataModelSchemasDepth2.depth,
  ..._extraArguments: unknown[]
): Dynamic {
  let count: Dynamic = 0;
  for (let count2 = 1; count2 <= options; count2++)
    count += resolveDataModelSchemasValue24(
      dataModelSchemasDepth2.node(count2),
    );
  return count;
}

var resolveDataModelSchemasDepth3: Dynamic;

var resolveDataModelSchemasListLevels: Dynamic;

function resolveDataModelSchemasOps(
  ops?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let limit: Dynamic = resolveDataModelSchemasListLevels();
  let actual: Dynamic = resolveDataModelSchemasValues({
    ops: ops,
  });
  return actual > limit
    ? {
        law: `depth`,
        limit: limit,
        actual: actual,
        pasted: true,
      }
    : null;
}

function resolveDataModelSchemasValues(
  dataModelSchemasValues?: unknown,
  options: Dynamic = 1e3,
  context: Dynamic = 1,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof dataModelSchemasValues != `object` || !dataModelSchemasValues)
    return context - 1;
  if (context > options) return context;
  let context2: Dynamic = context;
  for (let resolveDataModelSchemasValuesResult of (Array.isArray(
    dataModelSchemasValues,
  )
    ? dataModelSchemasValues
    : Object.values(dataModelSchemasValues)) as Dynamic) {
    let dataModelSchemasValues2: Dynamic = resolveDataModelSchemasValues(
      resolveDataModelSchemasValuesResult,
      options,
      context + 1,
    );
    if (dataModelSchemasValues2 > context2) {
      context2 = dataModelSchemasValues2;
    }
    if (context2 > options) break;
  }
  return context2;
}

var DataModelSchemasMessage: string;

var DataModelSchemasState19: RegExp;

var DataModelSchemasState20: RegExp;

var resolveDataModelSchemasTest8: Dynamic;

var dataModelSchemasPattern21: RegExp;

var resolveDataModelSchemasEnUS: Dynamic;

var resolveDataModelSchemasToFixed: (dataModelSchemas?: Dynamic, ..._extraArguments: unknown[]) => string;

var isDataModelSchemasSlice: Dynamic;

var DataModelSchemasLeafChars: Dynamic;

var resolveDataModelSchemasValue25: Dynamic;

var resolveDataModelSchemasDepth4: (dataModelSchemasDepth4?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolveDataModelSchemasLaw2(
  dataModelSchemasLaw2?: Dynamic,
  options?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let options2: Dynamic =
    dataModelSchemasLaw2 === `limit`
      ? typeof options == `string`
        ? options
        : ``
      : dataModelSchemasLaw2.startsWith(`limit:`)
        ? dataModelSchemasLaw2.slice(6)
        : null;
  if (options2 === null) return null;
  let options3: Dynamic =
    typeof options == `object` && options ? options : null;
  let optionsParts: Dynamic = options2.split(`:`);
  let law: Dynamic =
    optionsParts[0] || (typeof options3?.law == `string` ? options3.law : ``);
  if (!(law in DataModelSchemasLeafChars)) return null;
  let number2 = Number(optionsParts[1] ?? options3?.limit);
  let number3 = Number(optionsParts[2] ?? options3?.actual);
  let optionsPartItem: Dynamic =
    optionsParts.length > 3 ? optionsParts[3] : options3?.levels;
  let levels =
    law === `depth` && optionsPartItem !== `` && optionsPartItem !== undefined
      ? Number(optionsPartItem)
      : NaN;
  let pasted =
    law === `depth` &&
    (optionsParts[4] === `paste` || options3?.pasted === true);
  return {
    law: law,
    limit: Number.isFinite(number2)
      ? number2
      : resolveDataModelSchemasRowBytes(law),
    actual: Number.isFinite(number3) ? number3 : 0,
    ...(Number.isInteger(levels) && levels >= 0
      ? {
          levels: levels,
        }
      : {}),
    ...(pasted
      ? {
          pasted: pasted,
        }
      : {}),
  };
}

var resolveDataModelSchemasRowBytes: Dynamic;

var resolveDataModelSchemasListLevels2: Dynamic;

var dataModelSchemasState3: Dynamic;

var DataModelSchemasState21: Dynamic;

var dataModelSchemasSet9: Dynamic;

function resolveDataModelSchemasDoorFactsListenerError(
  dataModelSchemasDoorFactsListenerError?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  DataModelSchemasState21 = {
    ...dataModelSchemasDoorFactsListenerError,
  };
  let doc: Dynamic = dataModelSchemasDoorFactsListenerError.doc;
  if (doc && typeof doc == `object`) {
    resolveDataModelSchemasIsInteger2(doc.depth);
    resolveDataModelSchemasIsInteger3(resolveDataModelSchemasListLevels2(doc));
  }
  for (let resolveDataModelSchemasDoorFactsListenerErrorResult of dataModelSchemasSet9 as Dynamic)
    try {
      resolveDataModelSchemasDoorFactsListenerErrorResult();
    } catch (resolveDataModelSchemasDoorFactsListenerErrorResult2: Dynamic) {
      resolveDataModelSchemasError(
        typeof window === "undefined" ? null : window,
        resolveDataModelSchemasDoorFactsListenerErrorResult2,
        `DoorFactsListenerError`,
        `a listener for the door's facts threw`,
      );
    }
}

function clearDataModelSchemasDelete2(
  clearDataModelSchemasDelete22?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  dataModelSchemasSet9.add(clearDataModelSchemasDelete22);
  return (..._extraArguments: unknown[]): undefined =>
    void dataModelSchemasSet9.delete(clearDataModelSchemasDelete22);
}

var resolveDataModelSchemasValue26: Dynamic;

async function loadDataModelSchemasValue(
  dataModelSchemasValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    resolveDataModelSchemasValue26(
      DataModelSchemasState21[dataModelSchemasValue],
    )
  )
    return true;
  try {
    return (
      (await resolveDataModelSchemasValue27())[dataModelSchemasValue] === true
    );
  } catch {
    return false;
  }
}

function resolveDataModelSchemasParentLabel(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`parentLabel`);
}

function resolveDataModelSchemasDatumGroup(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`datumGroup`);
}

function resolveDataModelSchemasNodeCite(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`nodeCite`);
}

function resolveDataModelSchemasOriginQuote(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`originQuote`);
}

function resolveDataModelSchemasMentionLabel(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`mentionLabel`);
}

function resolveDataModelSchemasPersonLabel(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`personLabel`);
}

function resolveDataModelSchemasHrefFragment(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`hrefFragment`);
}

function resolveDataModelSchemasMarkIds(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`markIds`);
}

async function loadDataModelSchemasUtteranceTo(..._extraArguments: unknown[]) {
  if (resolveDataModelSchemasValue26(DataModelSchemasState21.utteranceTo))
    return true;
  try {
    return (await resolveDataModelSchemasValue27()).utteranceTo === true;
  } catch {
    return false;
  }
}

function resolveDataModelSchemasHighlightColour(..._extraArguments: unknown[]) {
  return loadDataModelSchemasValue(`highlightColour`);
}

function resolveDataModelSchemasValue27(
  dataModelSchemasValue27: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataModelSchemasValue27) {
    dataModelSchemasState3 = undefined;
  }
  dataModelSchemasState3 ??= loadDataModelSchemasMethod();
  return dataModelSchemasState3;
}

async function loadDataModelSchemasMethod(
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  try {
    let apiFetcher2: Dynamic = await apiFetcher(`/api/v3/manifest?brief=1`, {
      method: `GET`,
    });
    if (!apiFetcher2.ok) return {};
    let json2: Dynamic = await apiFetcher2.json();
    let loadDataModelSchemasMethodHandler: Dynamic = (
      dataModelSchemasMethod?: unknown,
      ..._extraArguments: unknown[]
    ) =>
      dataModelSchemasMethod && typeof dataModelSchemasMethod == `object`
        ? dataModelSchemasMethod
        : {};
    let schemaHash: Dynamic = [
      loadDataModelSchemasMethodHandler(json2.schema).hash8,
      json2.schemaHash8,
      loadDataModelSchemasMethodHandler(json2.model).hash8,
      loadDataModelSchemasMethodHandler(json2.door).schemaHash8,
    ].find(
      (items2?: unknown, ..._extraArguments: unknown[]) =>
        typeof items2 == `string` && items2.length > 0,
    );
    let items: Dynamic = [
      loadDataModelSchemasMethodHandler(json2.caps),
      loadDataModelSchemasMethodHandler(
        loadDataModelSchemasMethodHandler(json2.caps).prose,
      ),
      loadDataModelSchemasMethodHandler(
        loadDataModelSchemasMethodHandler(
          loadDataModelSchemasMethodHandler(json2[`x-ledger`]).limits,
        ).prose,
      ),
    ];
    let loadDataModelSchemasMethodHandler2: Dynamic = (
      dataModelSchemasMethod?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      items
        .map(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item[dataModelSchemasMethod],
        )
        .find(
          (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
            mappedItem !== undefined,
        );
    let loadDataModelSchemasMethodHandler3: Dynamic = (
      dataModelSchemasMethod?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      dataModelSchemasMethod === true ||
      dataModelSchemasMethod === 1 ||
      dataModelSchemasMethod === `1`;
    let dataModelSchemasMethodHandler: Dynamic =
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`reviveChars`),
      ) ||
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler(
          loadDataModelSchemasMethodHandler2(`revive`),
        ).chars,
      ) ||
      loadDataModelSchemasMethodHandler2(`revive`) === `chars`;
    let dataModelSchemasMethodHandler2: Dynamic =
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`reviveText`),
      ) ||
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler(
          loadDataModelSchemasMethodHandler2(`revive`),
        ).text,
      );
    let dataModelSchemasMethodHandler3: Dynamic =
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`reviveBlocks`),
      );
    let dataModelSchemasMethodHandler4: Dynamic =
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`splitResurrect`),
      );
    let dataModelSchemasMethodHandler5: Dynamic =
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`idsInline`),
      );
    let dataModelSchemasMethodHandler6: Dynamic =
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`idsRequired`),
      );
    let dataModelSchemasMethodHandler7: Dynamic =
      loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`markIds`),
      );
    let dataModelSchemasMethodHandler8: Dynamic =
      loadDataModelSchemasMethodHandler(
        loadDataModelSchemasMethodHandler2(`doc`),
      );
    let depthMax =
      typeof dataModelSchemasMethodHandler8.depth == `number`
        ? resolveDataModelSchemasIsInteger2(
            dataModelSchemasMethodHandler8.depth,
          )
        : undefined;
    let dataModelSchemasListLevels2: Dynamic =
      resolveDataModelSchemasListLevels2(dataModelSchemasMethodHandler8);
    let listLevelsMax =
      typeof dataModelSchemasListLevels2 == `number`
        ? resolveDataModelSchemasIsInteger3(dataModelSchemasListLevels2)
        : undefined;
    return {
      landed: true,
      ...(schemaHash
        ? {
            schemaHash: schemaHash,
          }
        : {}),
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
      oneOrder: loadDataModelSchemasMethodHandler2(`oneOrder`),
      arm: loadDataModelSchemasMethodHandler2(`arm`),
      stream: loadDataModelSchemasMethodHandler2(`stream`),
      opsOnFeed: loadDataModelSchemasMethodHandler2(`opsOnFeed`),
      ...(dataModelSchemasMethodHandler
        ? {
            reviveChars: true,
          }
        : {}),
      ...(dataModelSchemasMethodHandler2
        ? {
            reviveText: true,
          }
        : {}),
      ...(dataModelSchemasMethodHandler3
        ? {
            reviveBlocks: true,
          }
        : {}),
      ...(dataModelSchemasMethodHandler4
        ? {
            splitResurrect: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`splitBeforeAtom`),
      )
        ? {
            splitBeforeAtom: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`insertEach`),
      )
        ? {
            insertEach: true,
          }
        : {}),
      ...(dataModelSchemasMethodHandler5
        ? {
            idsInline: true,
          }
        : {}),
      ...(dataModelSchemasMethodHandler6
        ? {
            idsRequired: true,
          }
        : {}),
      ...(dataModelSchemasMethodHandler7
        ? {
            markIds: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler2(`atRevPaging`) === undefined
        ? {}
        : {
            atRevPaging: loadDataModelSchemasMethodHandler2(`atRevPaging`),
          }),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`wrapFinal`),
      )
        ? {
            wrapFinal: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`joinDir`),
      )
        ? {
            joinDir: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`parentLabel`),
      )
        ? {
            parentLabel: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`datumGroup`),
      )
        ? {
            datumGroup: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`nodeCite`),
      )
        ? {
            nodeCite: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`originQuote`),
      )
        ? {
            originQuote: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`mentionLabel`),
      )
        ? {
            mentionLabel: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`personLabel`),
      )
        ? {
            personLabel: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`highlightColour`),
      )
        ? {
            highlightColour: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`hrefFragment`),
      )
        ? {
            hrefFragment: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`clientEvent`),
      )
        ? {
            clientEvent: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`clientEventFields`),
      )
        ? {
            clientEventFields: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`clientEventCodes`),
      )
        ? {
            clientEventCodes: true,
          }
        : {}),
      ...(loadDataModelSchemasMethodHandler3(
        loadDataModelSchemasMethodHandler2(`utteranceTo`),
      )
        ? {
            utteranceTo: true,
          }
        : {}),
    };
  } catch {
    return {};
  }
}

function updateDataModelSchemasValue(
  updateDataModelSchemasValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label = `bongo.${updateDataModelSchemasValue2}`;
  let getItem: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    try {
      let item = localStorage.getItem(label);
      return item == null ? options : JSON.parse(item);
    } catch {
      return options;
    }
  };
  let create2: Dynamic = create(
    (
      updateDataModelSchemasValue3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      value: getItem(),
      set: (
        updateDataModelSchemasValue4?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        try {
          localStorage.setItem(
            label,
            JSON.stringify(updateDataModelSchemasValue4),
          );
        } catch {}
        updateDataModelSchemasValue3({
          value: updateDataModelSchemasValue4,
        });
      },
    }),
  );
  if (typeof window !== "undefined") {
    window.addEventListener(
      `storage`,
      (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        event.key === label &&
        create2.setState({
          value: getItem(),
        }),
    );
  }
  return create2;
}

var DataModelSchemasClaude: {
    claude: boolean;
    others: boolean;
};

function resolveDataModelSchemasChecked(
  dataModelSchemasChecked?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataModelSchemasChecked.tag === true && options.lead === true)
    return {
      checked: true,
      locked: false,
      disabled: dataModelSchemasChecked.disabled === true,
    };
  let locked: Dynamic = options.claude;
  let disabled: Dynamic = locked || dataModelSchemasChecked.disabled === true;
  if (locked)
    return {
      checked: true,
      locked: locked,
      disabled: disabled,
    };
  let others: Dynamic =
    options.others &&
    dataModelSchemasChecked.byPerson !== true &&
    dataModelSchemasChecked.disabled !== true;
  return {
    checked: dataModelSchemasChecked.checked && !others,
    locked: locked,
    disabled: disabled,
  };
}

function resolveDataModelSchemasAlways(
  dataModelSchemasAlways?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return dataModelSchemasAlways === undefined
    ? false
    : dataModelSchemasAlways === `always`
      ? true
      : resolveDataModelSchemasChecked(dataModelSchemasAlways, options).checked;
}

function resolveDataModelSchemasValue28(
  dataModelSchemasValue28?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    dataModelSchemasValue28 ||
    resolvePlatformSessionAndSourcesClaude(options, context)
  );
}

function resolveDataModelSchemasBody(
  body?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (resolvePlatformSessionAndSourcesClaude(body, options))
    return {
      body: body,
      to: [...options],
    };
  let editorAnchorsAndMentionsLabel = resolveEditorAnchorsAndMentionsLabel(
    DataModelSchemasLabel3,
  );
  return {
    body: `${dataModelSchemasPattern22.test(body) ? `${editorAnchorsAndMentionsLabel}\n\n` : `${editorAnchorsAndMentionsLabel} `}${body}`,
    to: [DataModelSchemasLabel3.id, ...options],
  };
}

var dataModelSchemasPattern22: RegExp;

var filterDataModelSchemasFilter2: Dynamic;

function resolveDataModelSchemasBody2(
  dataModelSchemasBody2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filterDataModelSchemasFilter22: Dynamic = filterDataModelSchemasFilter2(
    dataModelSchemasBody2,
  );
  let filterDataModelSchemasFilter2Item: Dynamic =
    filterDataModelSchemasFilter22[filterDataModelSchemasFilter22.length - 1];
  return (
    filterDataModelSchemasFilter2Item !== undefined &&
    (isAgentRow(filterDataModelSchemasFilter2Item) ||
      resolvePlatformSessionAndSourcesClaude(
        filterDataModelSchemasFilter2Item.body,
        filterDataModelSchemasFilter2Item.to,
      ))
  );
}

function resolveDataModelSchemasValue29(
  dataModelSchemasValue29?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filterDataModelSchemasFilter22: Dynamic = filterDataModelSchemasFilter2(
    dataModelSchemasValue29,
  );
  let filterDataModelSchemasFilter2Item: Dynamic =
    filterDataModelSchemasFilter22[filterDataModelSchemasFilter22.length - 1];
  return (
    filterDataModelSchemasFilter2Item !== undefined &&
    isAgentRow(filterDataModelSchemasFilter2Item)
  );
}

function filterDataModelSchemasFilter3(
  filterDataModelSchemasFilter32?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return filterDataModelSchemasFilter2(filterDataModelSchemasFilter32).filter(
    isAgentRow,
  ).length;
}

function resolveDataModelSchemasAgentRows(
  dataModelSchemasAgentRows?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    filterDataModelSchemasFilter3(options) > dataModelSchemasAgentRows.agentRows
  );
}

// BaoCut: 批注框「发给智能体」勾选与提示的文案称「agent」，不称 Claude；开头的提及写作「@Agent」（id 仍是 claude）。
var DataModelSchemasSendToClaude: string;

var DataModelSchemasAddAComment: string;

var DataModelSchemasReply: string;

var DataModelSchemasAskClaudeToEdit: string;

var DataModelSchemasSendsToClaude: string;

var DataModelSchemasSendToClaudeChecked: string;

var DataModelSchemasSendToClaudeUnchecked: string;

var DataModelSchemasMessage2: string;

function resolveDataModelSchemasComment(
  dataModelSchemasComment?: Dynamic,
  options: Dynamic = false,
  ..._extraArguments: unknown[]
) {
  return options
    ? DataModelSchemasAskClaudeToEdit
    : dataModelSchemasComment === `comment`
      ? DataModelSchemasAddAComment
      : DataModelSchemasReply;
}

var DataModelSchemasLabel3: {
    id: string;
    label: string;
};

function resolveDataModelSchemasLabel2(..._extraArguments: unknown[]): Dynamic {
  return {
    type: `doc`,
    content: [
      {
        type: `paragraph`,
        content: [
          {
            type: `mention`,
            attrs: {
              id: DataModelSchemasLabel3.id,
              label: DataModelSchemasLabel3.label,
            },
          },
          {
            type: `text`,
            text: ` `,
          },
        ],
      },
    ],
  };
}

function resolveDataModelSchemasTrim(
  dataModelSchemasTrim?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    resolveEditorAnchorsAndMentionsReplaceAll(dataModelSchemasTrim).trim() ===
    `@${DataModelSchemasLabel3.label}`
  );
}

function resolveDataModelSchemasIosApp(
  dataModelSchemasIosApp: Dynamic = resolveObservabilityBrowserAndOperationEventsValue3(),
  ..._extraArguments: unknown[]
) {
  return dataModelSchemasIosApp !== `ios-app`;
}

var DataModelSchemasState22: Dynamic;

function resolveDataModelSchemasValue30(
  dataModelSchemasValue30?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return dataModelSchemasValue30 === true || dataModelSchemasValue30 === false
    ? dataModelSchemasValue30
    : null;
}

function resolveDataModelSchemasChecked2(
  dataModelSchemasChecked2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataModelSchemasChecked2.offered)
    return dataModelSchemasChecked2.ask
      ? `always`
      : {
          checked:
            dataModelSchemasChecked2.choice ??
            dataModelSchemasChecked2.remembered ??
            dataModelSchemasChecked2.rest ??
            true,
          byPerson: dataModelSchemasChecked2.choice !== null,
          onChange: dataModelSchemasChecked2.onChange,
          tag: true,
        };
  if (
    !(
      !dataModelSchemasChecked2.framed ||
      !(
        dataModelSchemasChecked2.ask || dataModelSchemasChecked2.choice === true
      )
    )
  )
    return dataModelSchemasChecked2.ask
      ? `always`
      : {
          checked: true,
          byPerson: true,
          onChange: resolveDataModelSchemasValue31,
          disabled: true,
          tag: true,
        };
}

var resolveDataModelSchemasValue31: (..._extraArguments: unknown[]) => undefined;

function resolveDataModelSchemasRemove(
  dataModelSchemasRemove?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    dataModelSchemasRemove.box === null ||
    dataModelSchemasRemove.box.tag !== true
  )
    return dataModelSchemasRemove.gone &&
      dataModelSchemasRemove.ours &&
      dataModelSchemasRemove.named.tag === true
      ? `remove`
      : `keep`;
  if (dataModelSchemasRemove.box.disabled === true) return `keep`;
  if (
    dataModelSchemasRemove.arrived &&
    !dataModelSchemasRemove.ours &&
    dataModelSchemasRemove.named.tag === true &&
    dataModelSchemasRemove.box.byPerson !== true
  )
    return `tick`;
  let matchesLead = dataModelSchemasRemove.named.lead === true;
  return dataModelSchemasRemove.box.checked ===
    dataModelSchemasRemove.named.claude ||
    (!dataModelSchemasRemove.box.checked && !matchesLead)
    ? `keep`
    : dataModelSchemasRemove.pressed
      ? dataModelSchemasRemove.box.checked
        ? `add`
        : `remove`
      : dataModelSchemasRemove.box.checked
        ? dataModelSchemasRemove.seedable
          ? `add`
          : `untick`
        : `tick`;
}

function resolveDataModelSchemasChecked3(
  dataModelSchemasChecked3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return dataModelSchemasChecked3.theirTag === true ||
    (dataModelSchemasChecked3.after.lead === true &&
      !dataModelSchemasChecked3.checked)
    ? {
        checked: true,
        remember: false,
      }
    : dataModelSchemasChecked3.before.claude &&
        !dataModelSchemasChecked3.after.claude &&
        dataModelSchemasChecked3.checked
      ? {
          checked: false,
          remember:
            dataModelSchemasChecked3.before.lead === true &&
            dataModelSchemasChecked3.wordsKept,
        }
      : null;
}

function resolveDataModelSchemasBody3(
  body?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorAnchorsAndMentionsLabel = resolveEditorAnchorsAndMentionsLabel(
    DataModelSchemasLabel3,
  );
  if (!context || !body.startsWith(editorAnchorsAndMentionsLabel))
    return {
      body: body,
      to: [...options],
    };
  let optionIndex: Dynamic = options.indexOf(DataModelSchemasLabel3.id);
  return {
    body: body.slice(editorAnchorsAndMentionsLabel.length).trim(),
    to:
      optionIndex === -1
        ? [...options]
        : [...options.slice(0, optionIndex), ...options.slice(optionIndex + 1)],
  };
}

var DataModelSchemasState23: RegExp;

var dataModelSchemasValue16: number;

function filterDataModelSchemasFilter4(
  filterDataModelSchemasFilter42?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options === null) return filterDataModelSchemasFilter42;
  let filteredItems: Dynamic = [...new (Set as Dynamic)(options)].filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      item !== DataModelSchemasLabel3.id && DataModelSchemasState23.test(item),
  );
  return {
    ...filterDataModelSchemasFilter42,
    to: [DataModelSchemasLabel3.id, ...filteredItems].slice(
      0,
      dataModelSchemasValue16,
    ),
  };
}

var dataModelSchemasValue1500: number;

function resolveDataModelSchemasValue32(
  dataModelSchemasValue32?: Dynamic,
  options?: Dynamic,
  context: Dynamic = dataModelSchemasValue1500,
  ..._extraArguments: unknown[]
) {
  return (
    dataModelSchemasValue32 !== 0 &&
    options - dataModelSchemasValue32 >= 0 &&
    options - dataModelSchemasValue32 < context
  );
}

// BaoCut: 批注里等智能体回复时的提示称「the agent」，不称 Claude。
var DataModelSchemasMessage3: string;

var DataModelSchemasState24: number;

var DataModelSchemasState25: number;

var dataModelSchemasMap6: Dynamic;

var DataModelSchemasState26: Dynamic;

function resolveDataModelSchemasValue33(
  dataModelSchemasValue33?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  DataModelSchemasState26 = dataModelSchemasValue33;
}

var DataModelSchemasPending: Dynamic;

function resolveDataModelSchemasSent(
  dataModelSchemasSent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    dataModelSchemasSent !== undefined &&
    dataModelSchemasSent !== `sent` &&
    dataModelSchemasSent !== `waiting` &&
    dataModelSchemasSent !== `queued` &&
    dataModelSchemasSent !== `still_working` &&
    dataModelSchemasSent !== `needs_user` &&
    dataModelSchemasSent !== `edited`
  );
}

function resolveDataModelSchemasSent2(
  dataModelSchemasSent2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!(options.rowShowing || options.answered))
    return options.live &&
      dataModelSchemasSent2 === `sent` &&
      !options.recordHeld
      ? `no_reply`
      : dataModelSchemasSent2;
}

function resolveDataModelSchemasSent3(
  activity?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    activity !== undefined &&
    context === `sent` &&
    filterDataModelSchemasFilter3(options) === activity.agentRows &&
    dependencies - activity.at < 3e5
  );
}

var dataModelSchemasValue10000: number;

function isDataModelSchemasFlashed(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label = `idle`;
  let isDataModelSchemasFlashedResult: Dynamic;
  let isDataModelSchemasFlashedResult2: Dynamic;
  let isDataModelSchemasFlashedResult3: Dynamic;
  let isDataModelSchemasFlashedResult4: Dynamic;
  let enabled = false;
  let lookup: Dynamic = new (Map as Dynamic)();
  let cancel = (
    dataModelSchemasFlashed?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      dataModelSchemasFlashed === `linger` &&
      isDataModelSchemasFlashedResult2 !== undefined
    ) {
      scheduler.cancel(isDataModelSchemasFlashedResult2);
      isDataModelSchemasFlashedResult2 = undefined;
    } else {
      if (
        dataModelSchemasFlashed === `hold` &&
        isDataModelSchemasFlashedResult3 !== undefined
      ) {
        scheduler.cancel(isDataModelSchemasFlashedResult3);
        isDataModelSchemasFlashedResult3 = undefined;
      } else {
        if (
          dataModelSchemasFlashed === `renew` &&
          isDataModelSchemasFlashedResult4 !== undefined
        ) {
          scheduler.cancel(isDataModelSchemasFlashedResult4);
          isDataModelSchemasFlashedResult4 = undefined;
        }
      }
    }
  };
  let enabled2 = false;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let cancel2 = (..._extraArguments: unknown[]): undefined => {
    cancel(`linger`);
    cancel(`hold`);
    cancel(`renew`);
    let matchesLabel = label !== `idle`;
    label = `idle`;
    isDataModelSchemasFlashedResult = undefined;
    enabled2 = false;
    uniqueItems.clear();
    if (matchesLabel) {
      scheduler.clear();
    }
  };
  let schedule = (..._extraArguments: unknown[]): undefined => {
    cancel(`hold`);
    isDataModelSchemasFlashedResult3 = scheduler.schedule(
      (..._extraArguments: unknown[]): undefined => {
        isDataModelSchemasFlashedResult3 = undefined;
        if (!enabled) {
          if (isDataModelSchemasFlashedResult !== undefined) {
            lookup.delete(isDataModelSchemasFlashedResult);
          }
          cancel2();
        }
      },
      scheduler.holdMs ?? 6e4,
    );
  };
  let schedule2 = (..._extraArguments: unknown[]): undefined => {
    cancel(`renew`);
    isDataModelSchemasFlashedResult4 = scheduler.schedule(
      (..._extraArguments: unknown[]): undefined => {
        isDataModelSchemasFlashedResult4 = undefined;
        if (!(enabled || label !== `parked`)) {
          scheduler.renew();
          schedule2();
        }
      },
      dataModelSchemasValue10000,
    );
  };
  let live = (
    dataModelSchemasFlashed?: Dynamic,
    options?: Dynamic,
    context: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(!options || dataModelSchemasFlashed !== isDataModelSchemasFlashedResult)
    ) {
      if ((lookup.get(dataModelSchemasFlashed)?.size ?? 0) === 0) {
        if (!(context && scheduler.live?.() === true)) {
          if (label === `flash`) {
            enabled2 = true;
          } else {
            cancel2();
          }
        }
      }
    }
  };
  return {
    flashed(
      dataModelSchemasFlashed?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!enabled) {
        cancel(`linger`);
        cancel(`renew`);
        label = `flash`;
        if (dataModelSchemasFlashed !== isDataModelSchemasFlashedResult) {
          uniqueItems.clear();
        }
        isDataModelSchemasFlashedResult = dataModelSchemasFlashed;
        enabled2 = false;
        schedule();
        isDataModelSchemasFlashedResult2 = scheduler.schedule(
          (..._extraArguments: unknown[]): undefined => {
            isDataModelSchemasFlashedResult2 = undefined;
            if (!(enabled || label !== `flash`)) {
              if (enabled2) {
                cancel2();
                return;
              }
              label = `parked`;
              context();
              schedule2();
            }
          },
          options,
        );
      }
    },
    presence(
      dataModelSchemasFlashed?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled) return;
      let lookupEntry: Dynamic =
        lookup.get(dataModelSchemasFlashed) ?? new (Set as Dynamic)();
      if (
        context.running !== false &&
        (context.fileId === undefined || context.fileId === scheduler.fileId)
      ) {
        lookupEntry.add(options);
        lookup.set(dataModelSchemasFlashed, lookupEntry);
        if (
          dataModelSchemasFlashed === isDataModelSchemasFlashedResult &&
          label !== `idle`
        ) {
          enabled2 = false;
          uniqueItems.delete(options);
          schedule();
        }
        return;
      }
      let result: Dynamic =
        lookupEntry.delete(options) ||
        (dataModelSchemasFlashed === isDataModelSchemasFlashedResult &&
          uniqueItems.delete(options));
      if (lookupEntry.size === 0) {
        lookup.delete(dataModelSchemasFlashed);
      }
      live(dataModelSchemasFlashed, result);
    },
    left(
      dataModelSchemasFlashed?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled) return;
      let lookupEntry: Dynamic = lookup.get(dataModelSchemasFlashed);
      let result: Dynamic = lookupEntry?.delete(options) ?? false;
      if (lookupEntry !== undefined && lookupEntry.size === 0) {
        lookup.delete(dataModelSchemasFlashed);
      }
      if (
        result &&
        dataModelSchemasFlashed === isDataModelSchemasFlashedResult &&
        label !== `idle` &&
        scheduler.live?.() === true
      ) {
        uniqueItems.add(options);
      }
      live(dataModelSchemasFlashed, result, true);
    },
    vouching(dataModelSchemasFlashed?: Dynamic, ..._extraArguments: unknown[]) {
      return !enabled && (lookup.get(dataModelSchemasFlashed)?.size ?? 0) > 0;
    },
    rest(..._extraArguments: unknown[]): undefined {
      if (!enabled) {
        cancel2();
      }
    },
    dispose(..._extraArguments: unknown[]): undefined {
      if (!enabled) {
        cancel2();
        enabled = true;
        lookup.clear();
      }
    },
  };
}

function updateDataModelSchemasBid(
  updateDataModelSchemasBid2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let lookup: Dynamic = new (Map as Dynamic)();
  if (Array.isArray(options))
    for (let ask of options as Dynamic) {
      if (!ask || typeof ask.bid != `string` || !ask.bid) continue;
      let count: Dynamic = 0;
      if (Array.isArray(ask.runs))
        for (let updateDataModelSchemasBidResult of ask.runs as Dynamic)
          if (
            updateDataModelSchemasBidResult &&
            typeof updateDataModelSchemasBidResult.len == `number` &&
            Number.isInteger(updateDataModelSchemasBidResult.len) &&
            updateDataModelSchemasBidResult.len > 0
          ) {
            count += updateDataModelSchemasBidResult.len;
          }
      lookup.set(ask.bid, (lookup.get(ask.bid) ?? 0) + count);
    }
  let readTextCount: Dynamic = (
    updateDataModelSchemasBid3?: unknown,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      options2 > 64 ||
      typeof updateDataModelSchemasBid3 != `object` ||
      !updateDataModelSchemasBid3
    )
      return 0;
    let updateDataModelSchemasBid4: Dynamic = updateDataModelSchemasBid3;
    if (typeof updateDataModelSchemasBid4.text == `string`)
      return updateDataModelSchemasBid4.text.length;
    let attrs: Dynamic = updateDataModelSchemasBid4.attrs;
    let bid: Dynamic =
      attrs && typeof attrs == `object` && typeof attrs.bid == `string`
        ? attrs.bid
        : ``;
    let ask: Dynamic = bid
      ? {
          bid: bid,
          size: 0,
          text: lookup.has(bid),
        }
      : null;
    if (ask) {
      items.push(ask);
    }
    let count: Dynamic = 0;
    if (Array.isArray(updateDataModelSchemasBid4.content))
      for (let updateDataModelSchemasBidResult of updateDataModelSchemasBid4.content as Dynamic)
        count += readTextCount(updateDataModelSchemasBidResult, options2 + 1);
    if (ask) {
      ask.size = count;
    }
    return Array.isArray(updateDataModelSchemasBid4.content) ||
      updateDataModelSchemasBid4.type === `doc`
      ? count + 2
      : 1;
  };
  readTextCount(updateDataModelSchemasBid2, 0);
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    items.map(
      (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ask.bid,
    ),
  );
  for (let [bid, updateDataModelSchemasBidResult] of lookup as Dynamic)
    if (!uniqueItems.has(bid)) {
      items.push({
        bid: bid,
        size: 2 * updateDataModelSchemasBidResult,
        text: true,
      });
    }
  return items;
}

var resolveDataModelSchemasAnchor: Dynamic;

var resolveDataModelSchemasBlocks2: Dynamic;

var resolveDataModelSchemasAnchor2: Dynamic;

var resolveDataModelSchemasChars: Dynamic;

function resolveDataModelSchemasAgent(
  dataModelSchemasAgent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isDataModelSchemasKind32: Dynamic = isDataModelSchemasKind3(
    dataModelSchemasAgent,
  );
  return isDataModelSchemasKind32?.kind === `agent`
    ? isDataModelSchemasKind32.principal
    : null;
}

function isDataModelSchemasKind3(
  dataModelSchemasKind3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let actor: Dynamic = dataModelSchemasKind3?.actor;
  return !actor ||
    typeof actor.principal != `string` ||
    typeof actor.channel != `string`
    ? null
    : (resolvePlatformApiAndAuthExternal(actor.channel) &&
          actor.via === `mcp`) ||
        (resolvePlatformApiAndAuthInternal(actor.channel) &&
          (actor.via === `assistant` || actor.via === `executor`))
      ? {
          kind: `agent`,
          principal: actor.principal,
        }
      : actor.channel === `human` ||
          (resolvePlatformApiAndAuthExternal(actor.channel) &&
            resolveDataModelSchemasFrame(actor.via))
        ? {
            kind: `human`,
            principal: actor.principal,
          }
        : null;
}

function resolveDataModelSchemasKey(
  dataModelSchemasKey?: Dynamic,
  name?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = null,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    key: `human:${dataModelSchemasKey}`,
    name: name,
    color:
      argument ??
      resolvePlatformApiAndAuthCharCodeAt(
        isPlatformApiAndAuthAnon(dataModelSchemasKey, ``),
      ),
    sel:
      dependencies === null
        ? resolveDataModelSchemasAnchor(context)
        : resolveDataModelSchemasAnchor2(dependencies),
  };
}

var DataModelSchemasPromise: string;

var dataModelSchemasValue90000: number;

var dataModelSchemasValue2000: number;

var dataModelSchemasValue5000: number;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataModelSchemas4Step1(): void {
  (dataModelSchemasSet8 = new (Set as Dynamic)(
    `Error.TypeError.RangeError.ReferenceError.SyntaxError.EvalError.URIError.AggregateError.DOMException.AbortError.DataCloneError.InvalidStateError.NotAllowedError.NotFoundError.NetworkError.QuotaExceededError.SecurityError.TimeoutError.FrameSendError.FrameOfflineError.TransformError.ReplaceError.ChunkLoadError.PasteRoadError.DropRoadError.DoorRefused.CommentQueuedError.BootTimeoutError.BootQueueTimeoutError.EditorOpError.FrameHistoryTimeout.FrameHistoryMalformed.FrameHistoryDenied.LiteUnavailableError.RoomReadDenied.ReadOnlyCallError.IronAbortError.IronIntendError.IntendCallerError.WorldLaneError.WidgetError.ProseBlockMapUnreadable.DuplicateUnsupported.DuplicateTooLarge.DuplicateStructureInvalid.MaterializeTooLargeError.ZodError`.split(
      `.`,
    ),
  ));
  (DataModelSchemasState13 = resolveDataModelSchemasUnknown(undefined));
  (DataModelSchemasStyles5 = `[A-Za-z_][\\w-]{0,63}`);
  (DataModelSchemasState14 = RegExp(
    `^Invalid content for node (${DataModelSchemasStyles5})$`,
  ));
  (DataModelSchemasState15 = RegExp(
    `^Cannot join (${DataModelSchemasStyles5}) onto (${DataModelSchemasStyles5})$`,
  ));
  (dataModelSchemasInsertedContentDeeperThanInsertionPositionInconsistentOpenDepthsValues = [
      `Inserted content deeper than insertion position`,
      `Inconsistent open depths`,
    ]);
  (dataModelSchemasValue02 = 0);
  (DataModelSchemasStyles6 = `(?:async )?(?:<anonymous>|[\\w$.]+)`);
  (DataModelSchemasStyles7 = `(?:<anonymous>|[\\w$.\\-/\\\\:~%+@]+)`);
  (DataModelSchemasState16 = RegExp(
    `^(?: {4}at ${DataModelSchemasStyles6} \\(${DataModelSchemasStyles7}:\\d+:\\d+\\)| {4}at ${DataModelSchemasStyles7}:\\d+:\\d+|[\\w$.]*@${DataModelSchemasStyles7}:\\d+:\\d+)$`,
  ));
  (dataModelSchemasValue5122 = 512);
  (DataModelSchemasState17 = isDataModelSchemasPrepareStackTrace(Error));
  (resolveDataModelSchemasValue15 = (
    dataModelSchemasValue15?: Dynamic,
    enumerable?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    value: dataModelSchemasValue15,
    enumerable: enumerable,
    writable: true,
    configurable: true,
  }));
  (DataModelSchemasDepth = {
    depth: 12,
    listLevels: 5,
  });
  (DataModelSchemasRowBytes = {
    rowBytes: 64 * 1024,
    inlineSourceBytes: 32 * 1024,
    sourceBytes: 1024 * 1024,
    leafChars: 65536,
    opsPerUpdate: 64,
    docBlocks: 2e4,
    docTextBytes: 2 * 1024 * 1024,
    childrenPerBlock: 2e4,
    get depth() {
      return DataModelSchemasDepth.depth;
    },
    tableCols: 64,
    idsPerOp: 512,
  });
  (DataModelSchemasOpsPerUpdate = DataModelSchemasRowBytes.opsPerUpdate);
  (DataModelSchemasState18 = 32 * 1024);
  (resolveDataModelSchemasValue16 = (
    dataModelSchemasValue162?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    48 + resolveDataModelSchemasBytes2(dataModelSchemasValue162) + options);
  DataModelSchemasState18 / 2;
  (dataModelSchemasPattern18 = /[\x00-\x08\x0B\x0C\x0E-\x1F]/);
  (dataModelSchemasPattern19 = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g);
  (resolveDataModelSchemasTest5 = (
    dataModelSchemasTest5?: Dynamic,
    ..._extraArguments: unknown[]
  ) => dataModelSchemasPattern18.test(dataModelSchemasTest5));
  (resolveDataModelSchemasTest6 = (
    dataModelSchemasTest6?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasPattern18.test(dataModelSchemasTest6)
      ? dataModelSchemasTest6.replace(dataModelSchemasPattern19, ``)
      : dataModelSchemasTest6);
  (resolveDataModelSchemasValue17 = (
    dataModelSchemasValue17?: Dynamic,
    ..._extraArguments: unknown[]
  ) => dataModelSchemasValue17 >= 55296 && dataModelSchemasValue17 <= 56319);
  (resolveDataModelSchemasValue18 = (
    dataModelSchemasValue18?: Dynamic,
    ..._extraArguments: unknown[]
  ) => dataModelSchemasValue18 >= 56320 && dataModelSchemasValue18 <= 57343);
  (resolveDataModelSchemasValue19 = (
    dataModelSchemasValue19?: Dynamic,
    ..._extraArguments: unknown[]
  ) => resolveDataModelSchemasCharCodeAt(dataModelSchemasValue19).length > 0);
  (resolveDataModelSchemasSlice = (
    dataModelSchemasSlice?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let label: Dynamic = ``;
    let count: Dynamic = 0;
    for (let resolveDataModelSchemasSliceResult of options as Dynamic) {
      label += dataModelSchemasSlice.slice(
        count,
        resolveDataModelSchemasSliceResult,
      );
      count = resolveDataModelSchemasSliceResult + 1;
    }
    return label + dataModelSchemasSlice.slice(count);
  });
  (resolveDataModelSchemasCharCodeAt2 = (
    dataModelSchemasCharCode?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataModelSchemasValue17(
      dataModelSchemasCharCode.charCodeAt(options - 1),
    ) &&
    resolveDataModelSchemasValue18(dataModelSchemasCharCode.charCodeAt(options)));
  (resolveDataModelSchemasCharCodeAt3 = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length > 0 &&
    (resolveDataModelSchemasValue18(items.charCodeAt(0)) ||
      resolveDataModelSchemasValue17(items.charCodeAt(items.length - 1))));
  (resolveDataModelSchemasSome = (
    dataModelSchemasSome?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataModelSchemasSome == `string`
      ? resolveDataModelSchemasValue19(dataModelSchemasSome)
      : Array.isArray(dataModelSchemasSome)
        ? dataModelSchemasSome.some(resolveDataModelSchemasSome)
        : typeof dataModelSchemasSome == `object` && dataModelSchemasSome
          ? Object.values(dataModelSchemasSome).some(resolveDataModelSchemasSome)
          : false);
  (dataModelSchemasPattern20 = /^([^.\s]+)\.(\d+)$/);
  (resolveDataModelSchemasLabel = (
    dataModelSchemasLabel?: unknown,
    options: Dynamic = 1,
    ..._extraArguments: unknown[]
  ) => {
    let match =
      typeof dataModelSchemasLabel == `string`
        ? dataModelSchemasPattern20.exec(dataModelSchemasLabel)
        : null;
    return match
      ? [
          {
            label: match[1],
            lo: Number(match[2]),
            hi: Number(match[2]) + Math.max(1, options) - 1,
          },
        ]
      : [];
  });
  (resolveDataModelSchemasFlatMap = (
    dataModelSchemasFlatMap?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let ids: Dynamic = dataModelSchemasFlatMap?.ids;
    let ids2: Dynamic =
      typeof ids == `object` && ids && !Array.isArray(ids) ? ids : null;
    return [
      ...(Array.isArray(ids)
        ? ids.flatMap(
            (id?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              resolveDataModelSchemasLabel(id),
          )
        : ids2
          ? resolveDataModelSchemasLabel(ids2.from, Number(ids2.count) || 1)
          : []),
      ...options.flatMap(
        (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveDataModelSchemasLabel(option),
      ),
    ];
  });
  (resolveDataModelSchemasValue20 = (
    dataModelSchemasValue20?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof dataModelSchemasValue20 == `object` &&
    !!dataModelSchemasValue20 &&
    (dataModelSchemasValue20.ids !== undefined ||
      typeof dataModelSchemasValue20.id == `string`));
  (resolveDataModelSchemasContent = (
    items?: unknown,
    options?: Dynamic,
    context: Dynamic = ``,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let resolveDataModelSchemasContentHandler: Dynamic = (
      dataModelSchemasContent?: Dynamic,
      options2?: Dynamic,
      context2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      options.some(
        (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
          rolldownRImport2.label === dataModelSchemasContent &&
          options2 <= rolldownRImport2.hi &&
          context2 >= rolldownRImport2.lo,
      );
    if (typeof items == `string`) {
      let match =
        context === `content` || context === `text`
          ? null
          : dataModelSchemasPattern20.exec(items);
      return (
        match !== null &&
        resolveDataModelSchemasContentHandler(
          match[1],
          Number(match[2]),
          Number(match[2]),
        )
      );
    }
    if (Array.isArray(items)) {
      let [items2, setItems]: Dynamic =
        items.length === 2
          ? [
              typeof items[0] == `string`
                ? dataModelSchemasPattern20.exec(items[0])
                : null,
              typeof items[1] == `string`
                ? dataModelSchemasPattern20.exec(items[1])
                : null,
            ]
          : [null, null];
      return items2 &&
        setItems &&
        items2[1] === setItems[1] &&
        resolveDataModelSchemasContentHandler(
          items2[1],
          Math.min(Number(items2[2]), Number(setItems[2])),
          Math.max(Number(items2[2]), Number(setItems[2])),
        )
        ? true
        : items.some(
            (
              rolldownNImport2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              resolveDataModelSchemasContent(rolldownNImport2, options, context),
          );
    }
    return (
      typeof items == `object` &&
      !!items &&
      Object.entries(items).some(
        (
          [rolldownNImportEntry, rolldownNImportEntryEntry]: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          resolveDataModelSchemasContent(
            rolldownNImportEntryEntry,
            options,
            rolldownNImportEntry,
          ),
      )
    );
  });
  (resolveDataModelSchemasValue21 = (
    dataModelSchemasValue21?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let content: Dynamic = dataModelSchemasValue21?.source?.from?.content;
    return typeof content == `string` ? content : null;
  });
  (resolveDataModelSchemasBytes = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let bytes: Dynamic = 0;
    let scalars = 0;
    for (
      let index = 0, itemsCount: Dynamic = items.length;
      index < itemsCount;
      index++
    ) {
      let charCodeAt: Dynamic = items.charCodeAt(index);
      scalars++;
      if (charCodeAt < 128) {
        bytes += 1;
      } else {
        if (charCodeAt < 2048) {
          bytes += 2;
        } else {
          if (
            charCodeAt >= 55296 &&
            charCodeAt <= 56319 &&
            index + 1 < itemsCount &&
            (items.charCodeAt(index + 1) & 64512) == 56320
          ) {
            bytes += 4;
            index++;
          } else {
            bytes += 3;
          }
        }
      }
    }
    return {
      bytes: bytes,
      scalars: scalars,
    };
  });
  (resolveDataModelSchemasBytes2 = (
    dataModelSchemasBytes2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => resolveDataModelSchemasBytes(dataModelSchemasBytes2).bytes);
  (resolveDataModelSchemasValue22 = (
    dataModelSchemasValue22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataModelSchemasBytes2(JSON.stringify(dataModelSchemasValue22) ?? ``));
  (resolveDataModelSchemasInsert = (
    operation?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let source: Dynamic =
      operation.op === `insert`
        ? operation.source
        : operation.op === `replace`
          ? operation.with
          : null;
    return typeof source == `object` && source ? source : null;
  });
  (resolveDataModelSchemasListItem = (
    dataModelSchemasListItem?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemasListItem.type.name === `listItem` ||
    dataModelSchemasListItem.type.name === `list_item`);
  (resolveDataModelSchemasList = (
    dataModelSchemasList?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemasList.type.name === `list` ||
    dataModelSchemasList.type.name === `bulletList` ||
    dataModelSchemasList.type.name === `orderedList` ||
    dataModelSchemasList.type.name === `bullet_list` ||
    dataModelSchemasList.type.name === `ordered_list`);
  (resolveDataModelSchemasValue23 = (
    dataModelSchemasValue23?: Dynamic,
    ..._extraArguments: unknown[]
  ) => +!resolveDataModelSchemasListItem(dataModelSchemasValue23));
  (resolveDataModelSchemasValue24 = (
    dataModelSchemasValue24?: Dynamic,
    ..._extraArguments: unknown[]
  ) => +!!resolveDataModelSchemasList(dataModelSchemasValue24));
  (resolveDataModelSchemasDepth3 = (
    dataModelSchemasDepth3?: Dynamic,
    options: Dynamic = 0,
    ..._extraArguments: unknown[]
  ) =>
    Math.max(
      0,
      Math.min(
        DataModelSchemasRowBytes.depth - 1 - dataModelSchemasDepth3,
        DataModelSchemasDepth.listLevels - options,
      ),
    ));
  (resolveDataModelSchemasListLevels = (
    ..._extraArguments: unknown[]
  ) => 12 + 4 * DataModelSchemasDepth.listLevels);
  (DataModelSchemasMessage = `​⁠﻿`);
  (DataModelSchemasState19 = RegExp(`[${DataModelSchemasMessage}]`));
  (DataModelSchemasState20 = RegExp(`[${DataModelSchemasMessage}]`, `g`));
  (resolveDataModelSchemasTest8 = (
    dataModelSchemasTest8?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    DataModelSchemasState19.test(dataModelSchemasTest8)
      ? dataModelSchemasTest8.replace(DataModelSchemasState20, ``)
      : dataModelSchemasTest8);
  (dataModelSchemasPattern21 = /^[\s\u00a0]*(?:[•◦▪‣·*+-][\uFE0E\uFE0F]?|\d+[.)])[\s\u00a0]+/);
  (resolveDataModelSchemasEnUS = (
    dataModelSchemasEnUS?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataModelSchemasEnUS.toLocaleString(`en-US`));
  (resolveDataModelSchemasToFixed = (
    dataModelSchemas?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemas >= 1024 * 1024
      ? `${(dataModelSchemas / 1024 / 1024).toFixed(dataModelSchemas % (1024 * 1024) ? 1 : 0)} MB`
      : `${Math.max(1, Math.round(dataModelSchemas / 1024))} KB`);
  (isDataModelSchemasSlice = (
    dataModelSchemasSlice?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let [items, setItems]: Dynamic = [
      resolveDataModelSchemasToFixed(dataModelSchemasSlice),
      resolveDataModelSchemasToFixed(options),
    ];
    return !(dataModelSchemasSlice > options) ||
      items.slice(-2) !== setItems.slice(-2) ||
      parseFloat(items) > parseFloat(setItems)
      ? items
      : setItems.endsWith(`MB`)
        ? `${(parseFloat(setItems) + 0.1).toFixed(1)} MB`
        : `${parseFloat(setItems) + 1} KB`;
  });
  (DataModelSchemasLeafChars = {
    leaf_chars: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `one paragraph can hold ${resolveDataModelSchemasEnUS(dataModelSchemasLeafChars.limit)} characters at most and this would make one of ${resolveDataModelSchemasEnUS(dataModelSchemasLeafChars.actual)}; nothing was changed — split it into paragraphs first`,
    block_bytes: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `one pasted paragraph (or one paste into a code block) can carry ${resolveDataModelSchemasToFixed(dataModelSchemasLeafChars.limit)} of text at most and this holds ${isDataModelSchemasSlice(dataModelSchemasLeafChars.actual, dataModelSchemasLeafChars.limit)}; nothing was pasted — break it into shorter pieces and paste them one at a time`,
    depth: (..._extraArguments: unknown[]) =>
      `that would nest deeper than this document allows, so it cannot be indented or nested any further; nothing was changed`,
    table_cols: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `a table can have ${resolveDataModelSchemasEnUS(dataModelSchemasLeafChars.limit)} columns at most and that would make ${resolveDataModelSchemasEnUS(dataModelSchemasLeafChars.actual)}; nothing was changed`,
    children: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `one list or table can hold ${resolveDataModelSchemasEnUS(dataModelSchemasLeafChars.limit)} items at most; nothing was added — start a new one below it`,
    doc_blocks: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `this document is at its size limit (${resolveDataModelSchemasEnUS(dataModelSchemasLeafChars.limit)} blocks); nothing was added — remove something or start a new document`,
    doc_text_bytes: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `this document is at its size limit (${resolveDataModelSchemasToFixed(dataModelSchemasLeafChars.limit)} of text); nothing was added — remove something or start a new document`,
    source_bytes: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `that change is ${isDataModelSchemasSlice(dataModelSchemasLeafChars.actual, dataModelSchemasLeafChars.limit)}, more than the ${resolveDataModelSchemasToFixed(dataModelSchemasLeafChars.limit)} that can be saved at once, so it was stopped. Make it in smaller parts`,
    inline_source_bytes: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `that change is ${isDataModelSchemasSlice(dataModelSchemasLeafChars.actual, dataModelSchemasLeafChars.limit)}, more than the ${resolveDataModelSchemasToFixed(dataModelSchemasLeafChars.limit)} that can be saved at once, so it was stopped. Make it in smaller parts`,
    row_bytes: (
      dataModelSchemasLeafChars?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `that change is ${isDataModelSchemasSlice(dataModelSchemasLeafChars.actual, dataModelSchemasLeafChars.limit)}, more than the ${resolveDataModelSchemasToFixed(dataModelSchemasLeafChars.limit)} that can be saved at once, so it was stopped. Make it in smaller parts`,
    ops_per_update: (..._extraArguments: unknown[]) =>
      `that change is too large to save at once, so it was stopped. Make it in smaller parts`,
    ids_per_op: (..._extraArguments: unknown[]) =>
      `that change is too large to save at once, so it was stopped. Make it in smaller parts`,
    control_chars: (..._extraArguments: unknown[]) =>
      `that text has a hidden character this document can’t store, so it wasn’t added`,
  });
  (resolveDataModelSchemasValue25 = (
    dataModelSchemasValue25?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    DataModelSchemasLeafChars[dataModelSchemasValue25.law](
      dataModelSchemasValue25,
    ));
  (resolveDataModelSchemasDepth4 = (
    dataModelSchemasDepth4?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${dataModelSchemasDepth4.law}:${dataModelSchemasDepth4.limit}:${dataModelSchemasDepth4.actual}${dataModelSchemasDepth4.law === `depth` && (dataModelSchemasDepth4.levels !== undefined || dataModelSchemasDepth4.pasted) ? `:${dataModelSchemasDepth4.levels ?? ``}${dataModelSchemasDepth4.pasted ? `:paste` : ``}` : ``}`);
  (resolveDataModelSchemasRowBytes = (
    dataModelSchemasRowBytes?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (
      ({
        row_bytes: DataModelSchemasRowBytes.rowBytes,
        inline_source_bytes: DataModelSchemasRowBytes.inlineSourceBytes,
        source_bytes: DataModelSchemasRowBytes.sourceBytes,
        leaf_chars: DataModelSchemasRowBytes.leafChars,
        block_bytes: DataModelSchemasRowBytes.inlineSourceBytes,
        ops_per_update: DataModelSchemasRowBytes.opsPerUpdate,
        doc_blocks: DataModelSchemasRowBytes.docBlocks,
        doc_text_bytes: DataModelSchemasRowBytes.docTextBytes,
        children: DataModelSchemasRowBytes.childrenPerBlock,
        depth: DataModelSchemasRowBytes.depth,
        table_cols: DataModelSchemasRowBytes.tableCols,
        ids_per_op: DataModelSchemasRowBytes.idsPerOp,
        control_chars: 0,
      }) as Dynamic
    )[dataModelSchemasRowBytes]);
  (resolveDataModelSchemasListLevels2 = (
    dataModelSchemasListLevels2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasListLevels2.listLevels ??
    dataModelSchemasListLevels2.list_levels);
  (DataModelSchemasState21 = {});
  (dataModelSchemasSet9 = new (Set as Dynamic)());
  (resolveDataModelSchemasValue26 = (
    dataModelSchemasValue26?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemasValue26 === true ||
    dataModelSchemasValue26 === 1 ||
    dataModelSchemasValue26 === `1`);
  (DataModelSchemasClaude = {
    claude: false,
    others: false,
  });
  (dataModelSchemasPattern22 = /^(?:[-*+] |\d{1,9}[.)] |#{1,6} |>|```|~~~|\||---|\*\*\*|___)/);
  (filterDataModelSchemasFilter2 = (
    file?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    [file.root, ...file.replies].filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) => item.body.trim() !== ``,
    ));
  (DataModelSchemasSendToClaude = `Send to agent`);
  (DataModelSchemasAddAComment = `Add a comment`);
  (DataModelSchemasReply = `Reply`);
  (DataModelSchemasAskClaudeToEdit = `Ask the agent to edit`);
  (DataModelSchemasSendsToClaude = `Sends to agent`);
  (DataModelSchemasSendToClaudeChecked = `Send to agent checked`);
  (DataModelSchemasSendToClaudeUnchecked = `Send to agent unchecked`);
  (DataModelSchemasMessage2 = `Your comment mentions @Agent. Remove the mention to uncheck.`);
  (DataModelSchemasLabel3 = {
    id: `claude`,
    label: `Agent`,
  });
  (DataModelSchemasState22 = updateDataModelSchemasValue(
    `comments.sendToClaudeBox`,
    null,
  ));
  (resolveDataModelSchemasValue31 = (
    ..._extraArguments: unknown[]
  ): undefined => {});
  (DataModelSchemasState23 = editorExtensionsPattern12);
  (dataModelSchemasValue16 = 16);
  (dataModelSchemasValue1500 = 1500);
  (DataModelSchemasMessage3 = `The agent is working on it…`);
  (DataModelSchemasState24 = 5 * 6e4);
  (DataModelSchemasState25 = 15 * 6e4);
  (dataModelSchemasMap6 = new (Map as Dynamic)());
  (DataModelSchemasState26 = null);
  (DataModelSchemasPending = create(
    (
      dataModelSchemasPending?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      pending: {},
      mark: (
        dataModelSchemasPending2?: Dynamic,
        agentRows?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let dataModelSchemasMap6Entry: Dynamic = dataModelSchemasMap6.get(
          dataModelSchemasPending2,
        );
        if (dataModelSchemasMap6Entry !== undefined) {
          clearTimeout(dataModelSchemasMap6Entry);
        }
        let timeoutMs: Dynamic = context?.timeoutMs ?? 3e5;
        dataModelSchemasMap6.set(
          dataModelSchemasPending2,
          setTimeout((..._extraArguments: unknown[]): undefined => {
            dataModelSchemasMap6.delete(dataModelSchemasPending2);
            let hasOwn = Object.hasOwn(
              options().pending,
              dataModelSchemasPending2,
            );
            dataModelSchemasPending(
              (
                dataModelSchemasPending3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                if (
                  !Object.hasOwn(
                    dataModelSchemasPending3.pending,
                    dataModelSchemasPending2,
                  )
                )
                  return dataModelSchemasPending3;
                let {
                  [dataModelSchemasPending2]: pending,
                  ...pending2
                }: Dynamic = dataModelSchemasPending3.pending;
                return {
                  pending: pending2,
                };
              },
            );
            if (hasOwn)
              try {
                DataModelSchemasState26?.(dataModelSchemasPending2, timeoutMs);
              } catch {}
          }, timeoutMs),
        );
        dataModelSchemasPending(
          (
            dataModelSchemasPending3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            pending: {
              ...dataModelSchemasPending3.pending,
              [dataModelSchemasPending2]: {
                at: context?.now ?? Date.now(),
                agentRows: agentRows,
              },
            },
          }),
        );
      },
      clear: (
        dataModelSchemasPending2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let dataModelSchemasMap6Entry: Dynamic = dataModelSchemasMap6.get(
          dataModelSchemasPending2,
        );
        if (dataModelSchemasMap6Entry !== undefined) {
          clearTimeout(dataModelSchemasMap6Entry);
          dataModelSchemasMap6.delete(dataModelSchemasPending2);
        }
        dataModelSchemasPending(
          (
            dataModelSchemasPending3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (
              !Object.hasOwn(
                dataModelSchemasPending3.pending,
                dataModelSchemasPending2,
              )
            )
              return dataModelSchemasPending3;
            let { [dataModelSchemasPending2]: pending, ...pending2 }: Dynamic =
              dataModelSchemasPending3.pending;
            return {
              pending: pending2,
            };
          },
        );
      },
    }),
  ));
  (dataModelSchemasValue10000 = 1e4);
  (resolveDataModelSchemasAnchor = (
    dataModelSchemasAnchor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    anchor: {
      kind: `blocks`,
      ids: [dataModelSchemasAnchor],
    },
    head: `end`,
    caret: true,
  }));
  (resolveDataModelSchemasBlocks2 = (
    dataModelSchemasBlocks2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasBlocks2.caret === true &&
    dataModelSchemasBlocks2.anchor.kind === `blocks` &&
    dataModelSchemasBlocks2.anchor.ids.length === 1
      ? dataModelSchemasBlocks2.anchor.ids[0]
      : null);
  (resolveDataModelSchemasAnchor2 = (
    dataModelSchemasAnchor2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    anchor: {
      kind: `chars`,
      range: [dataModelSchemasAnchor2, dataModelSchemasAnchor2],
    },
    head: `end`,
    caret: true,
  }));
  (resolveDataModelSchemasChars = (
    dataModelSchemasChars?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasChars.caret === true &&
    dataModelSchemasChars.anchor.kind === `chars` &&
    dataModelSchemasChars.anchor.range[0] ===
      dataModelSchemasChars.anchor.range[1]
      ? dataModelSchemasChars.anchor.range[1]
      : null);
  (DataModelSchemasPromise = `promise`);
  (dataModelSchemasValue90000 = 9e4);
  (dataModelSchemasValue2000 = 2e3);
  (dataModelSchemasValue5000 = 5e3);
}

export {
  DataModelSchemasAddAComment,
  DataModelSchemasClaude,
  DataModelSchemasLabel3,
  DataModelSchemasMessage,
  DataModelSchemasMessage2,
  DataModelSchemasMessage3,
  DataModelSchemasOpsPerUpdate,
  DataModelSchemasPending,
  DataModelSchemasPromise,
  DataModelSchemasSendToClaude,
  DataModelSchemasSendToClaudeChecked,
  DataModelSchemasSendToClaudeUnchecked,
  DataModelSchemasSendsToClaude,
  DataModelSchemasState18,
  DataModelSchemasState22,
  DataModelSchemasState24,
  DataModelSchemasState25,
  clearDataModelSchemasDelete2,
  dataModelSchemasPattern21,
  dataModelSchemasValue2000,
  dataModelSchemasValue5000,
  dataModelSchemasValue90000,
  filterDataModelSchemasFilter3,
  filterDataModelSchemasFilter4,
  isDataModelSchemasCount,
  isDataModelSchemasFlashed,
  isDataModelSchemasKind3,
  loadDataModelSchemasUtteranceTo,
  resolveDataModelSchemasAgent,
  resolveDataModelSchemasAgentRows,
  resolveDataModelSchemasAlways,
  resolveDataModelSchemasAnchor,
  resolveDataModelSchemasAnchor2,
  resolveDataModelSchemasBlocks,
  resolveDataModelSchemasBlocks2,
  resolveDataModelSchemasBody,
  resolveDataModelSchemasBody2,
  resolveDataModelSchemasBody3,
  resolveDataModelSchemasBytes2,
  resolveDataModelSchemasCardTop2,
  resolveDataModelSchemasCharCodeAt2,
  resolveDataModelSchemasCharCodeAt4,
  resolveDataModelSchemasChars,
  resolveDataModelSchemasChecked,
  resolveDataModelSchemasChecked2,
  resolveDataModelSchemasChecked3,
  resolveDataModelSchemasComment,
  resolveDataModelSchemasDatumGroup,
  resolveDataModelSchemasDepth,
  resolveDataModelSchemasDepth2,
  resolveDataModelSchemasDepth3,
  resolveDataModelSchemasDepth4,
  resolveDataModelSchemasDocScrollMax,
  resolveDataModelSchemasDoorFactsListenerError,
  resolveDataModelSchemasError,
  resolveDataModelSchemasHighlightColour,
  resolveDataModelSchemasHrefFragment,
  resolveDataModelSchemasIosApp,
  resolveDataModelSchemasKey,
  resolveDataModelSchemasLabel2,
  resolveDataModelSchemasLaw,
  resolveDataModelSchemasLaw2,
  resolveDataModelSchemasMarkIds,
  resolveDataModelSchemasMentionLabel,
  resolveDataModelSchemasNodeCite,
  resolveDataModelSchemasOps,
  resolveDataModelSchemasOriginQuote,
  resolveDataModelSchemasParentLabel,
  resolveDataModelSchemasPersonLabel,
  resolveDataModelSchemasRail,
  resolveDataModelSchemasRailTop,
  resolveDataModelSchemasRemove,
  resolveDataModelSchemasSent,
  resolveDataModelSchemasSent2,
  resolveDataModelSchemasSent3,
  resolveDataModelSchemasTarget,
  resolveDataModelSchemasTest5,
  resolveDataModelSchemasTest6,
  resolveDataModelSchemasTest7,
  resolveDataModelSchemasTest8,
  resolveDataModelSchemasTrim,
  resolveDataModelSchemasUnknown,
  resolveDataModelSchemasValue12,
  resolveDataModelSchemasValue14,
  resolveDataModelSchemasValue22,
  resolveDataModelSchemasValue25,
  resolveDataModelSchemasValue27,
  resolveDataModelSchemasValue28,
  resolveDataModelSchemasValue29,
  resolveDataModelSchemasValue30,
  resolveDataModelSchemasValue32,
  resolveDataModelSchemasValue33,
  updateDataModelSchemasBid,
  updateDataModelSchemasValue,
};

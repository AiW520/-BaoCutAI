/** BaoCut: platform api and auth from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  rolldownNImport,
} from "../dependencies";
import {
  PlatformApiAndAuthState2,
  resolvePlatformApiAndAuthDispatch,
  resolvePlatformApiAndAuthState3,
  resolvePlatformApiAndAuthState4,
  updatePlatformApiAndAuthDeps,
} from "./api-and-auth-1";
import {
  resolvePlatformApiAndAuthAnchor,
} from "./api-and-auth-2";
import {
  isPlatformApiAndAuthPath,
} from "./api-and-auth-4";

var PlatformApiAndAuthAdd: Dynamic;

var PlatformApiAndAuthSelection2: Dynamic;

var PlatformApiAndAuthItems: Dynamic;

var PlatformApiAndAuthAssign: Dynamic;

var platformApiAndAuthSet14: Dynamic;

var platformApiAndAuthSet15: Dynamic;

function resolvePlatformApiAndAuthDate(
  platformApiAndAuthDate?: unknown,
  ..._extraArguments: unknown[]
) {
  return platformApiAndAuthDate === null ||
    typeof platformApiAndAuthDate == `boolean` ||
    typeof platformApiAndAuthDate == `number` ||
    typeof platformApiAndAuthDate == `string`
    ? true
    : typeof platformApiAndAuthDate == `object` &&
        (`date` in platformApiAndAuthDate ||
          `nothing` in platformApiAndAuthDate);
}

function resolvePlatformApiAndAuthSheetId(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [items2, setItems]: Dynamic = items;
  if (!items2 || !setItems || !(`sheetId` in items2) || !(`range` in setItems))
    return null;
  for (let count = 2; count < items.length; count++) {
    let itemItem: Dynamic = items[count];
    if (`property` in itemItem) {
      if (count === 2 && platformApiAndAuthSet14.has(itemItem.property))
        return null;
    } else if (!(`enum` in itemItem)) return null;
  }
  return setItems.range;
}

function resolvePlatformApiAndAuthKind(
  platformApiAndAuthKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let rect: Dynamic = resolvePlatformApiAndAuthSheetId(
    platformApiAndAuthKind.path,
  );
  return rect
    ? `call` in platformApiAndAuthKind
      ? platformApiAndAuthKind.call === `ClearContents` &&
        (platformApiAndAuthKind.args ?? []).length === 0 &&
        platformApiAndAuthKind.path.length === 2
        ? {
            kind: `clear`,
            rect: rect,
          }
        : {
            kind: `no`,
          }
      : (platformApiAndAuthKind.args ?? []).length > 0 ||
          !resolvePlatformApiAndAuthDate(platformApiAndAuthKind.v) ||
          (platformApiAndAuthKind.path.length === 2 &&
            (platformApiAndAuthSet15.has(platformApiAndAuthKind.set) ||
              ((platformApiAndAuthKind.set === `Value` ||
                platformApiAndAuthKind.set === `Formula`) &&
                typeof platformApiAndAuthKind.v == `string` &&
                platformApiAndAuthKind.v.trimStart().startsWith(`=`))))
        ? {
            kind: `no`,
          }
        : {
            kind: `set`,
            rect: rect,
          }
    : {
        kind: `no`,
      };
}

function resolvePlatformApiAndAuthValue15(
  platformApiAndAuthValue15?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformApiAndAuthValue15Handler: Dynamic = (
    platformApiAndAuthValue152?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformApiAndAuthValue152.r1 <= options2.r1 &&
    options2.r2 <= platformApiAndAuthValue152.r2 &&
    platformApiAndAuthValue152.c1 <= options2.c1 &&
    options2.c2 <= platformApiAndAuthValue152.c2;
  return resolvePlatformApiAndAuthValue15Handler(
    platformApiAndAuthValue15,
    options,
  )
    ? {
        ...platformApiAndAuthValue15,
      }
    : resolvePlatformApiAndAuthValue15Handler(
          options,
          platformApiAndAuthValue15,
        )
      ? {
          ...options,
        }
      : platformApiAndAuthValue15.r1 === options.r1 &&
          platformApiAndAuthValue15.r2 === options.r2 &&
          options.c1 <= platformApiAndAuthValue15.c2 + 1 &&
          platformApiAndAuthValue15.c1 <= options.c2 + 1
        ? {
            r1: platformApiAndAuthValue15.r1,
            r2: platformApiAndAuthValue15.r2,
            c1: Math.min(platformApiAndAuthValue15.c1, options.c1),
            c2: Math.max(platformApiAndAuthValue15.c2, options.c2),
          }
        : platformApiAndAuthValue15.c1 === options.c1 &&
            platformApiAndAuthValue15.c2 === options.c2 &&
            options.r1 <= platformApiAndAuthValue15.r2 + 1 &&
            platformApiAndAuthValue15.r1 <= options.r2 + 1
          ? {
              r1: Math.min(platformApiAndAuthValue15.r1, options.r1),
              r2: Math.max(platformApiAndAuthValue15.r2, options.r2),
              c1: platformApiAndAuthValue15.c1,
              c2: platformApiAndAuthValue15.c2,
            }
          : null;
}

function isPlatformApiAndAuthEvery(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items === items2) return true;
  if (
    typeof items != `object` ||
    typeof items2 != `object` ||
    items === null ||
    items2 === null ||
    Array.isArray(items) !== Array.isArray(items2)
  )
    return false;
  if (Array.isArray(items) && Array.isArray(items2))
    return (
      items.length === items2.length &&
      items.every(
        (
          rolldownNImport2?: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          isPlatformApiAndAuthEvery(rolldownNImport2, items2[index]),
      )
    );
  let itemsKeys = Object.keys(items);
  let itemsKeys2 = Object.keys(items2);
  return itemsKeys.length === itemsKeys2.length
    ? itemsKeys.every(
        (rolldownTImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isPlatformApiAndAuthEvery(
            items[rolldownTImport2],
            items2[rolldownTImport2],
          ),
      )
    : false;
}

function resolvePlatformApiAndAuthEvery(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    items.length === items2.length &&
    items.every(
      (
        rolldownNImport2?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        index === 1 ||
        isPlatformApiAndAuthEvery(rolldownNImport2, items2[index]),
    )
  );
}

function resolvePlatformApiAndAuthRange(
  platformApiAndAuthRange?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (platformApiAndAuthRange.count === 1) {
    options.push(platformApiAndAuthRange.first);
    return;
  }
  let path: Dynamic = [...platformApiAndAuthRange.first.path];
  path[1] = {
    range: platformApiAndAuthRange.rect,
  };
  options.push({
    ...platformApiAndAuthRange.first,
    path: path,
  });
}

function resolvePlatformApiAndAuthKind2(
  platformApiAndAuthKind2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let entry: Dynamic = null;
  for (let first of platformApiAndAuthKind2 as Dynamic) {
    let platformApiAndAuthKind: Dynamic = resolvePlatformApiAndAuthKind(first);
    if (entry) {
      if (
        platformApiAndAuthKind.kind !== `no` &&
        platformApiAndAuthKind.kind === entry.kind
      ) {
        let platformApiAndAuthValue15: Dynamic = (
          entry.kind === `clear`
            ? isPlatformApiAndAuthEvery(entry.first.path[0], first.path[0])
            : `set` in entry.first &&
              `set` in first &&
              entry.first.set === first.set &&
              isPlatformApiAndAuthEvery(entry.first.v, first.v) &&
              resolvePlatformApiAndAuthEvery(entry.first.path, first.path)
        )
          ? resolvePlatformApiAndAuthValue15(
              entry.rect,
              platformApiAndAuthKind.rect,
            )
          : null;
        if (platformApiAndAuthValue15) {
          entry.rect = platformApiAndAuthValue15;
          entry.count += 1;
          continue;
        }
      }
      resolvePlatformApiAndAuthRange(entry, items);
      entry = null;
    }
    if (platformApiAndAuthKind.kind === `no`) {
      items.push(first);
    } else {
      entry = {
        kind: platformApiAndAuthKind.kind,
        first: first,
        rect: platformApiAndAuthKind.rect,
        count: 1,
      };
    }
  }
  if (entry) {
    resolvePlatformApiAndAuthRange(entry, items);
  }
  return items;
}

var LiteUnavailableError: Dynamic;

var resolvePlatformApiAndAuthValue16: Dynamic;

var resolvePlatformApiAndAuthReject: Dynamic;

var resolvePlatformApiAndAuthValue17: (...platformApiAndAuthValue17: Dynamic[]) => undefined;

function LiteUnavailable(
  { what: what }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      className={`gap-md flex h-full flex-col items-center justify-center px-6`}
      data-testid={`lite-unavailable`}
    >
      <div className={`text-primary text-body font-medium`}>
        {what
          ? `${what} isn’t available in this viewer`
          : `Not available in this viewer`}
      </div>
      <div
        className={`text-secondary text-footnote max-w-md text-center`}
      >{`Open this document in Claude Docs to view it.`}</div>
    </div>
  );
}

var PlatformApiAndAuthWhat: Dynamic;

var PlatformApiAndAuthWorkbook: Dynamic;

var PlatformApiAndAuthSpreadsheetEngine: Dynamic;

var init: Dynamic;

var ensureXlsx: Dynamic;

var compactOps: Dynamic;

var transformOps: Dynamic;

var registerExternalWorkbookResolver: Dynamic;

var readNativeCharts: Dynamic;

var resolvePlatformApiAndAuthResolve: Dynamic;

var resolvePlatformApiAndAuthValue18: Dynamic;

var platformApiAndAuthSet16: Dynamic;

var platformApiAndAuthSet17: Dynamic;

var platformApiAndAuthSet18: Dynamic;

var platformApiAndAuthValue1048576: number;

var platformApiAndAuthValue16384: number;

function resolvePlatformApiAndAuthRows(
  platformApiAndAuthRows?: Dynamic,
  ..._extraArguments: unknown[]
): number | undefined {
  let platformApiAndAuthRows2: Dynamic = platformApiAndAuthRows;
  let set2: Dynamic =
    platformApiAndAuthRows2.set ?? platformApiAndAuthRows2.call;
  let path: Dynamic = platformApiAndAuthRows2.path;
  if (!Array.isArray(path)) return;
  let enabled =
    !path.some(
      (path2?: unknown, ..._extraArguments: unknown[]) =>
        typeof path2 == `object` && !!path2 && `chars` in path2,
    ) && !(typeof set2 == `string` && platformApiAndAuthSet16.has(set2));
  let matchesCondition: Dynamic =
    typeof set2 == `string` && platformApiAndAuthSet18.has(set2);
  let record2: Dynamic = {
    rows: platformApiAndAuthValue1048576,
    cols: platformApiAndAuthValue16384,
    trow: undefined,
    tcol: undefined,
    block: undefined,
  };
  let count: number = 0;
  let resolvePlatformApiAndAuthRowsHandler: Dynamic = (
    platformApiAndAuthRows3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): number | undefined => {
    let count2: number = 0;
    for (let resolvePlatformApiAndAuthRowsResult of platformApiAndAuthRows3 as Dynamic) {
      if (
        typeof resolvePlatformApiAndAuthRowsResult != `object` ||
        !resolvePlatformApiAndAuthRowsResult
      )
        continue;
      for (let resolvePlatformApiAndAuthRowsResult2 in record2)
        if (
          resolvePlatformApiAndAuthRowsResult2 in
          resolvePlatformApiAndAuthRowsResult
        ) {
          let resolvePlatformApiAndAuthRowsResultItem: Dynamic =
            resolvePlatformApiAndAuthRowsResult[
              resolvePlatformApiAndAuthRowsResult2
            ];
          if (
            !Array.isArray(resolvePlatformApiAndAuthRowsResultItem) ||
            resolvePlatformApiAndAuthRowsResultItem.length !== 2
          )
            return;
          let [
            resolvePlatformApiAndAuthRowsResultItem2,
            setResolvePlatformApiAndAuthRowsResultItem,
          ]: Dynamic = resolvePlatformApiAndAuthRowsResultItem;
          if (
            !Number.isInteger(resolvePlatformApiAndAuthRowsResultItem2) ||
            !Number.isInteger(setResolvePlatformApiAndAuthRowsResultItem) ||
            resolvePlatformApiAndAuthRowsResultItem2 < 1 ||
            setResolvePlatformApiAndAuthRowsResultItem <
              resolvePlatformApiAndAuthRowsResultItem2
          )
            return;
          let recordItem: Dynamic =
            record2[resolvePlatformApiAndAuthRowsResult2];
          if (
            recordItem !== undefined &&
            setResolvePlatformApiAndAuthRowsResultItem > recordItem
          )
            return;
          let total: number =
            setResolvePlatformApiAndAuthRowsResultItem -
            resolvePlatformApiAndAuthRowsResultItem2 +
            1;
          count2 +=
            matchesCondition &&
            (resolvePlatformApiAndAuthRowsResult2 === `rows` ||
              resolvePlatformApiAndAuthRowsResult2 === `cols`)
              ? total * total
              : total;
        }
      if (!(`range` in resolvePlatformApiAndAuthRowsResult)) continue;
      let range: Dynamic = resolvePlatformApiAndAuthRowsResult.range;
      if (typeof range != `object` || !range) return;
      let { r1: range2, r2: range3, c1: range4, c2: range5 }: Dynamic = range;
      if (
        ![range2, range3, range4, range5].every(
          (item?: Dynamic, ..._extraArguments: unknown[]): boolean =>
            Number.isInteger(item) && item >= 1,
        ) ||
        range2 > range3 ||
        range4 > range5 ||
        range3 > 1048576 ||
        range5 > 16384
      )
        return;
      let matchesRange: boolean = range2 === 1 && range3 === 1048576;
      if (options && (matchesRange || (range4 === 1 && range5 === 16384))) {
        count2 += matchesRange ? range5 - range4 + 1 : range3 - range2 + 1;
      } else {
        count2 += (range3 - range2 + 1) * (range5 - range4 + 1);
      }
    }
    return count2;
  };
  let platformApiAndAuthRowsHandler: Dynamic =
    resolvePlatformApiAndAuthRowsHandler(path, enabled);
  if (platformApiAndAuthRowsHandler === undefined) return;
  count +=
    typeof set2 == `string` && platformApiAndAuthSet17.has(set2)
      ? Math.min(platformApiAndAuthRowsHandler, 1)
      : platformApiAndAuthRowsHandler;
  let args: Dynamic = platformApiAndAuthRows2.args;
  if (!(args != null && !Array.isArray(args))) {
    for (let resolvePlatformApiAndAuthRowsResult of (args ?? []) as Dynamic) {
      let path2: Dynamic = resolvePlatformApiAndAuthRowsResult?.ref?.path;
      if (path2 === undefined) continue;
      if (!Array.isArray(path2)) return;
      let platformApiAndAuthRowsHandler2: Dynamic =
        resolvePlatformApiAndAuthRowsHandler(path2, false);
      if (platformApiAndAuthRowsHandler2 === undefined) return;
      count += platformApiAndAuthRowsHandler2;
    }
    return count;
  }
}

var platformApiAndAuthSet19: Dynamic;

var resolvePlatformApiAndAuthValue19: Dynamic;

var resolvePlatformApiAndAuthValue20: Dynamic;

function resolvePlatformApiAndAuthPush(
  platformApiAndAuthPush?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (
    options.r2 < platformApiAndAuthPush.r1 ||
    platformApiAndAuthPush.r2 < options.r1 ||
    options.c2 < platformApiAndAuthPush.c1 ||
    platformApiAndAuthPush.c2 < options.c1
  )
    return [platformApiAndAuthPush];
  if (platformApiAndAuthPush.r1 < options.r1) {
    items.push({
      r1: platformApiAndAuthPush.r1,
      r2: options.r1 - 1,
      c1: platformApiAndAuthPush.c1,
      c2: platformApiAndAuthPush.c2,
    });
  }
  if (options.r2 < platformApiAndAuthPush.r2) {
    items.push({
      r1: options.r2 + 1,
      r2: platformApiAndAuthPush.r2,
      c1: platformApiAndAuthPush.c1,
      c2: platformApiAndAuthPush.c2,
    });
  }
  let [items2, setItems]: Dynamic = [
    Math.max(platformApiAndAuthPush.r1, options.r1),
    Math.min(platformApiAndAuthPush.r2, options.r2),
  ];
  if (platformApiAndAuthPush.c1 < options.c1) {
    items.push({
      r1: items2,
      r2: setItems,
      c1: platformApiAndAuthPush.c1,
      c2: options.c1 - 1,
    });
  }
  if (options.c2 < platformApiAndAuthPush.c2) {
    items.push({
      r1: items2,
      r2: setItems,
      c1: options.c2 + 1,
      c2: platformApiAndAuthPush.c2,
    });
  }
  return items;
}

function resolvePlatformApiAndAuthRange2(
  platformApiAndAuthRange2?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  let count: number = 0;
  for (let resolvePlatformApiAndAuthRange2Result of platformApiAndAuthRange2 as Dynamic) {
    let set2: Dynamic =
      `set` in resolvePlatformApiAndAuthRange2Result
        ? resolvePlatformApiAndAuthRange2Result.set
        : resolvePlatformApiAndAuthRange2Result.call;
    if (!platformApiAndAuthSet19.has(set2)) {
      for (let resolvePlatformApiAndAuthRange2Result2 of resolvePlatformApiAndAuthRange2Result.path as Dynamic)
        if (`range` in resolvePlatformApiAndAuthRange2Result2) {
          let platformApiAndAuthValue19: Dynamic =
            resolvePlatformApiAndAuthValue19(
              resolvePlatformApiAndAuthRange2Result2.range,
            );
          if (platformApiAndAuthValue19 > count) {
            count = platformApiAndAuthValue19;
          }
        }
    }
  }
  return count;
}

var platformApiAndAuthValue12: number;

var platformApiAndAuthValue2: number;

var platformApiAndAuthValue7: number;

var platformApiAndAuthValue5: number;

function resolvePlatformApiAndAuthValue21(
  platformApiAndAuthValue21?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (platformApiAndAuthValue21 <= 0) return 0;
  let amount = platformApiAndAuthValue21 / platformApiAndAuthValue12;
  return amount < 12 / platformApiAndAuthValue7
    ? (amount * platformApiAndAuthValue7) / 12
    : (amount * platformApiAndAuthValue7 - platformApiAndAuthValue5) /
        platformApiAndAuthValue7;
}

function resolvePlatformApiAndAuthValue22(
  platformApiAndAuthValue22?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformApiAndAuthValue22 / platformApiAndAuthValue2;
}

var finiteNumberValue: Dynamic;

var stringValue: Dynamic;

var resolvePlatformApiAndAuthValue24: Dynamic;

function resolvePlatformApiAndAuthSheet(
  platformApiAndAuthSheet?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!platformApiAndAuthSheet || typeof platformApiAndAuthSheet != `object`)
    return;
  let {
    sheet: platformApiAndAuthSheet2,
    row: platformApiAndAuthSheet3,
    column: platformApiAndAuthSheet4,
    width: platformApiAndAuthSheet5,
    height: platformApiAndAuthSheet6,
  }: Dynamic = platformApiAndAuthSheet;
  let finiteNumberValue2: Dynamic = finiteNumberValue(platformApiAndAuthSheet2);
  let finiteNumberValue3: Dynamic = finiteNumberValue(platformApiAndAuthSheet3);
  let finiteNumberValue4: Dynamic = finiteNumberValue(platformApiAndAuthSheet4);
  if (
    finiteNumberValue2 === undefined ||
    finiteNumberValue3 === undefined ||
    finiteNumberValue4 === undefined
  )
    return;
  let sid: Dynamic = options.sheetIdOf(finiteNumberValue2);
  if (sid === undefined) return;
  let finiteNumberValue5: Dynamic =
    finiteNumberValue(platformApiAndAuthSheet5) ?? 1;
  return {
    sid: sid,
    rect: {
      r1: finiteNumberValue3,
      r2:
        finiteNumberValue3 +
        (finiteNumberValue(platformApiAndAuthSheet6) ?? 1) -
        1,
      c1: finiteNumberValue4,
      c2: finiteNumberValue4 + finiteNumberValue5 - 1,
    },
  };
}

function resolvePlatformApiAndAuthExec(
  platformApiAndAuthExec?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let match = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/i.exec(
    platformApiAndAuthExec.replace(/\$/g, ``).trim(),
  );
  if (!match) return;
  let charCodeAt: Dynamic = (
    platformApiAndAuthExec2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let count = 0;
    for (let resolvePlatformApiAndAuthExecResult of platformApiAndAuthExec2.toUpperCase() as Dynamic)
      count =
        count * 26 + (resolvePlatformApiAndAuthExecResult.charCodeAt(0) - 64);
    return count;
  };
  let charCodeAt2: Dynamic = charCodeAt(match[1]);
  let number2 = Number(match[2]);
  let charCodeAt3: Dynamic = match[3] ? charCodeAt(match[3]) : charCodeAt2;
  return {
    r1: number2,
    r2: match[4] ? Number(match[4]) : number2,
    c1: charCodeAt2,
    c2: charCodeAt3,
  };
}

function collectPlatformApiAndAuthDims(
  collectPlatformApiAndAuthDims2?: Dynamic,
  options: Dynamic = `	`,
  ..._extraArguments: unknown[]
): Dynamic {
  let replaceParts: Dynamic = collectPlatformApiAndAuthDims2.replace(
    /\r\n/g,
    `
`,
  ).split(`
`);
  if (replaceParts.at(-1) === ``) {
    replaceParts.pop();
  }
  let mappedReplaceParts: Dynamic = replaceParts.map(
    (replacePart?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      replacePart.split(options),
  );
  let reduce: Dynamic = mappedReplaceParts.reduce(
    (accumulator?: Dynamic, items2?: Dynamic, ..._extraArguments: unknown[]) =>
      Math.max(accumulator, items2.length),
    1,
  );
  let items: Dynamic = [];
  for (let collectPlatformApiAndAuthDimsResult of mappedReplaceParts as Dynamic)
    for (let index = 0; index < reduce; index++)
      items.push(collectPlatformApiAndAuthDimsResult[index] ?? ``);
  return {
    dims: [
      [1, replaceParts.length],
      [1, reduce],
    ],
    data: items,
  };
}

var sheetReference: Dynamic;

var rangeReference: Dynamic;

var resolvePlatformApiAndAuthValue25: Dynamic;

var resolvePlatformApiAndAuthRows2: Dynamic;

var resolvePlatformApiAndAuthCols: Dynamic;

var propertyReference: Dynamic;

var resolvePlatformApiAndAuthValue26: Dynamic;

var resolvePlatformApiAndAuthIndex: Dynamic;

var resolvePlatformApiAndAuthWindow: Dynamic;

var resolvePlatformApiAndAuthRef: Dynamic;

var resolvePlatformApiAndAuthTrue: (platformApiAndAuthTrue?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolvePlatformApiAndAuthValue27: Dynamic;

var resolvePlatformApiAndAuthIsFinite3: Dynamic;

function filterPlatformApiAndAuthEdge(
  filterPlatformApiAndAuthEdge2?: Dynamic,
  rect?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { r1: rect2, r2: rect3, c1: rect4, c2: rect5 }: Dynamic = rect;
  let record2: Dynamic = {
    edge: 7,
    rect: {
      r1: rect2,
      r2: rect3,
      c1: rect4,
      c2: rect4,
    },
  };
  let record3: Dynamic = {
    edge: 8,
    rect: {
      r1: rect2,
      r2: rect2,
      c1: rect4,
      c2: rect5,
    },
  };
  let record4: Dynamic = {
    edge: 9,
    rect: {
      r1: rect3,
      r2: rect3,
      c1: rect4,
      c2: rect5,
    },
  };
  let record5: Dynamic = {
    edge: 10,
    rect: {
      r1: rect2,
      r2: rect3,
      c1: rect5,
      c2: rect5,
    },
  };
  let record6: Dynamic = {
    edge: 8,
    rect: {
      r1: rect2 + 1,
      r2: rect3,
      c1: rect4,
      c2: rect5,
    },
  };
  let record7: Dynamic = {
    edge: 9,
    rect: {
      r1: rect2,
      r2: rect3 - 1,
      c1: rect4,
      c2: rect5,
    },
  };
  let record8: Dynamic = {
    edge: 7,
    rect: {
      r1: rect2,
      r2: rect3,
      c1: rect4 + 1,
      c2: rect5,
    },
  };
  let record9: Dynamic = {
    edge: 10,
    rect: {
      r1: rect2,
      r2: rect3,
      c1: rect4,
      c2: rect5 - 1,
    },
  };
  let filterPlatformApiAndAuthEdgeHandler: Dynamic = (
    edge?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    edge: edge,
    rect: rect,
  });
  let filterPlatformApiAndAuthEdgeResult: Dynamic;
  switch (filterPlatformApiAndAuthEdge2) {
    case `Left`:
      filterPlatformApiAndAuthEdgeResult = [record2];
      break;
    case `Top`:
      filterPlatformApiAndAuthEdgeResult = [record3];
      break;
    case `Bottom`:
      filterPlatformApiAndAuthEdgeResult = [record4];
      break;
    case `Right`:
      filterPlatformApiAndAuthEdgeResult = [record5];
      break;
    case `Outer`:
      filterPlatformApiAndAuthEdgeResult = [record2, record3, record4, record5];
      break;
    case `CenterH`:
      filterPlatformApiAndAuthEdgeResult = [record6, record7];
      break;
    case `CenterV`:
      filterPlatformApiAndAuthEdgeResult = [record8, record9];
      break;
    case `Inner`:
      filterPlatformApiAndAuthEdgeResult = [record6, record7, record8, record9];
      break;
    case `All`:
    case `None`:
      filterPlatformApiAndAuthEdgeResult = [
        filterPlatformApiAndAuthEdgeHandler(7),
        filterPlatformApiAndAuthEdgeHandler(8),
        filterPlatformApiAndAuthEdgeHandler(9),
        filterPlatformApiAndAuthEdgeHandler(10),
      ];
      break;
    default:
      return [];
  }
  return filterPlatformApiAndAuthEdgeResult.filter(
    (
      filterPlatformApiAndAuthEdgeResult2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      filterPlatformApiAndAuthEdgeResult2.rect.r1 <=
        filterPlatformApiAndAuthEdgeResult2.rect.r2 &&
      filterPlatformApiAndAuthEdgeResult2.rect.c1 <=
        filterPlatformApiAndAuthEdgeResult2.rect.c2,
  );
}

var PlatformApiAndAuthFontB: Dynamic;

var PlatformApiAndAuthWhole: Dynamic;

var PlatformApiAndAuthRow: Dynamic;

function resolvePlatformApiAndAuthUnmapped(
  platformApiAndAuthUnmapped?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isPlatformApiAndAuthPath2: Dynamic = isPlatformApiAndAuthPath(
    platformApiAndAuthUnmapped,
    options,
    context,
  );
  if (isPlatformApiAndAuthPath2 === null) {
    if (dependencies) {
      dependencies.reason = `unmapped`;
    }
    return null;
  }
  let platformApiAndAuthRange2: Dynamic = resolvePlatformApiAndAuthRange2(
    isPlatformApiAndAuthPath2,
  );
  if (platformApiAndAuthRange2 > 1e4) {
    console.debug(
      `[ironOp] range cap`,
      platformApiAndAuthUnmapped,
      platformApiAndAuthRange2,
    );
    if (dependencies) {
      dependencies.reason = `too-big`;
      dependencies.cells = platformApiAndAuthRange2;
    }
    return null;
  }
  for (let resolvePlatformApiAndAuthUnmappedResult of isPlatformApiAndAuthPath2 as Dynamic) {
    let platformApiAndAuthRows: Dynamic = resolvePlatformApiAndAuthRows(
      resolvePlatformApiAndAuthUnmappedResult,
    );
    if (platformApiAndAuthRows === undefined || platformApiAndAuthRows > 4e6) {
      console.debug(
        `[ironOp] server budget`,
        platformApiAndAuthUnmapped,
        platformApiAndAuthRows,
      );
      if (dependencies) {
        if (platformApiAndAuthRows === undefined) {
          dependencies.reason = `unmapped`;
        } else {
          dependencies.reason = `too-big`;
          dependencies.cells = platformApiAndAuthRows;
        }
      }
      return null;
    }
  }
  return isPlatformApiAndAuthPath2;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformApiAndAuth3Step1(): void {
  (PlatformApiAndAuthAdd = {
    add: (selection?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      resolvePlatformApiAndAuthDispatch({
        type: `select`,
        selection: selection,
      });
      resolvePlatformApiAndAuthAnchor(selection);
    },
    remove: (selection?: unknown, ..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `select-clear`,
      }),
    removeByHash: (
      selection?: Dynamic,
      hash?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `select-clear-by-hash`,
        path: selection,
        hash: hash,
      }),
    addAttachment: (
      selection?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `attach`,
        attachment: selection,
      }),
    removeAttachment: (
      selection?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `attach-remove`,
        index: selection,
      }),
    clearAttachments: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `attach-clear`,
      }),
    clear: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `selection-reset`,
      }),
  });
  (PlatformApiAndAuthSelection2 = updatePlatformApiAndAuthDeps(
    (
      platformApiAndAuthSelection2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => [platformApiAndAuthSelection2.selection],
    (
      platformApiAndAuthSelection2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      platformApiAndAuthSelection2.selection
        ? [platformApiAndAuthSelection2.selection]
        : [],
  ));
  (PlatformApiAndAuthItems = updatePlatformApiAndAuthDeps(
    (
      platformApiAndAuthItems?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => [
      platformApiAndAuthItems.selection,
      platformApiAndAuthItems.attachments,
    ],
    (
      platformApiAndAuthItems?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      items: PlatformApiAndAuthSelection2(platformApiAndAuthItems, options),
      attachments: platformApiAndAuthItems.attachments,
      ...PlatformApiAndAuthAdd,
    }),
  ));
  (PlatformApiAndAuthAssign = Object.assign(
    function (
      platformApiAndAuthAssign?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return resolvePlatformApiAndAuthState3(
        PlatformApiAndAuthItems,
        platformApiAndAuthAssign,
      );
    },
    {
      getState: (..._extraArguments: unknown[]): Dynamic =>
        PlatformApiAndAuthItems(
          resolvePlatformApiAndAuthState4(),
          PlatformApiAndAuthState2,
        ),
    },
  ));
  if (typeof window !== "undefined") {
    (window as Dynamic).__selectionStore = PlatformApiAndAuthAssign;
  }
  (platformApiAndAuthSet14 = new (Set as Dynamic)([
    `ChartObjects`,
    `Shapes`,
    `Pictures`,
    `Slicers`,
    `PivotFields`,
    `DataFields`,
    `PageFields`,
    `CalculatedFields`,
  ]));
  (platformApiAndAuthSet15 = new (Set as Dynamic)([
    `NoteText`,
    `ColumnWidth`,
    `RowHeight`,
  ]));
  (LiteUnavailableError = class extends Error {
    [key: string]: Dynamic;
    liteUnavailable: Dynamic = true;
    constructor(liteUnavailableError?: Dynamic, ..._extraArguments: unknown[]) {
      super(`not available in this viewer (${liteUnavailableError})`);
      this.name = `LiteUnavailableError`;
    }
  });
  (resolvePlatformApiAndAuthValue16 = (
      platformApiAndAuthValue16?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (...platformApiAndAuthValue162: Dynamic[]): undefined => {
      throw new (LiteUnavailableError as Dynamic)(platformApiAndAuthValue16);
    });
  (resolvePlatformApiAndAuthReject = (
      platformApiAndAuthReject?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (...platformApiAndAuthReject2: Dynamic[]): Dynamic =>
      Promise.reject(
        new (LiteUnavailableError as Dynamic)(platformApiAndAuthReject),
      ));
  (resolvePlatformApiAndAuthValue17 = (
    ...platformApiAndAuthValue17: Dynamic[]
  ): undefined => {});
  (PlatformApiAndAuthWhat = (
    what?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    function (platformApiAndAuthWhat?: unknown, ..._extraArguments: unknown[]) {
      return <LiteUnavailable what={what} />;
    });
  (PlatformApiAndAuthWorkbook = rolldownNImport({
    Workbook: (..._extraArguments: unknown[]): Dynamic =>
      PlatformApiAndAuthSpreadsheetEngine,
    compactOps: (..._extraArguments: unknown[]): Dynamic => compactOps,
    default: (..._extraArguments: unknown[]): Dynamic =>
      PlatformApiAndAuthSpreadsheetEngine,
    ensureXlsx: (..._extraArguments: unknown[]): Dynamic => ensureXlsx,
    init: (..._extraArguments: unknown[]): Dynamic => init,
    readNativeCharts: (..._extraArguments: unknown[]): Dynamic =>
      readNativeCharts,
    registerExternalWorkbookResolver: (..._extraArguments: unknown[]): Dynamic =>
      registerExternalWorkbookResolver,
    transformOps: (..._extraArguments: unknown[]): Dynamic => transformOps,
  }));
  (PlatformApiAndAuthSpreadsheetEngine = class {
    [key: string]: Dynamic;
    static available: Dynamic = false;
    static fromXlsx: Dynamic =
      resolvePlatformApiAndAuthReject(`spreadsheet engine`);
    static empty: Dynamic = resolvePlatformApiAndAuthReject(`spreadsheet engine`);
    static emptyAt: Dynamic =
      resolvePlatformApiAndAuthReject(`spreadsheet engine`);
    constructor(..._extraArguments: unknown[]) {
      throw new (LiteUnavailableError as Dynamic)(`spreadsheet engine`);
    }
  });
  (init = resolvePlatformApiAndAuthReject(`spreadsheet engine`));
  (ensureXlsx = resolvePlatformApiAndAuthReject(`spreadsheet engine`));
  (compactOps = (
    compactOps2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => compactOps2);
  (transformOps = resolvePlatformApiAndAuthValue16(
    `spreadsheet transformOps`,
  ));
  (registerExternalWorkbookResolver = resolvePlatformApiAndAuthValue17);
  (readNativeCharts = (..._extraArguments: unknown[]): Dynamic => []);
  (resolvePlatformApiAndAuthResolve = (
    ..._extraArguments: unknown[]
  ): Dynamic => Promise.resolve(PlatformApiAndAuthWorkbook));
  (resolvePlatformApiAndAuthValue18 = (
    ..._extraArguments: unknown[]
  ): Dynamic => PlatformApiAndAuthWorkbook);
  (platformApiAndAuthSet16 = new (Set as Dynamic)([
    `Value`,
    `Formula`,
    `FillDown`,
    `FillRight`,
    `FillUp`,
    `FillLeft`,
    `AutoFill`,
    `PasteSpecial`,
    `Consolidate`,
    `Subtotal`,
    `ClearComments`,
    `RemoveDuplicates`,
    `Sort`,
  ]));
  (platformApiAndAuthSet17 = new (Set as Dynamic)([`TextToColumns`]));
  (platformApiAndAuthSet18 = new (Set as Dynamic)([
    `Hidden`,
    `OutlineLevel`,
    `ShowDetail`,
    `AutoFit`,
  ]));
  (platformApiAndAuthValue1048576 = 1048576);
  (platformApiAndAuthValue16384 = 16384);
  (platformApiAndAuthSet19 = new (Set as Dynamic)([
    `AutoFill`,
    `FillDown`,
    `FillRight`,
    `FillUp`,
    `FillLeft`,
    `Formula`,
    `Value`,
    `Clear`,
    `ClearContents`,
    `ClearFormats`,
    `Insert`,
    `Delete`,
    `Merge`,
    `UnMerge`,
    `Style`,
    `Sort`,
    `TextToColumns`,
  ]));
  (resolvePlatformApiAndAuthValue19 = (
    platformApiAndAuthValue19?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (platformApiAndAuthValue19.r2 - platformApiAndAuthValue19.r1 + 1) *
    (platformApiAndAuthValue19.c2 - platformApiAndAuthValue19.c1 + 1));
  (resolvePlatformApiAndAuthValue20 = (
    platformApiAndAuthValue20?: Dynamic,
    ..._extraArguments: unknown[]
  ) => ({
    r1: Math.min(platformApiAndAuthValue20.r1, platformApiAndAuthValue20.r2),
    c1: Math.min(platformApiAndAuthValue20.c1, platformApiAndAuthValue20.c2),
    r2: Math.max(platformApiAndAuthValue20.r1, platformApiAndAuthValue20.r2),
    c2: Math.max(platformApiAndAuthValue20.c1, platformApiAndAuthValue20.c2),
  }));
  (platformApiAndAuthValue12 = 12);
  (platformApiAndAuthValue2 = 2);
  (platformApiAndAuthValue7 = 7);
  (platformApiAndAuthValue5 = 5);
  (finiteNumberValue = (
    finiteNumberValue2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof finiteNumberValue2 == `number` && Number.isFinite(finiteNumberValue2)
      ? finiteNumberValue2
      : undefined);
  (stringValue = (
    stringValue2?: unknown,
    ..._extraArguments: unknown[]
  ) => (typeof stringValue2 == `string` ? stringValue2 : undefined));
  (resolvePlatformApiAndAuthValue24 = (
    platformApiAndAuthValue24?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformApiAndAuthValue24 == `boolean`
      ? platformApiAndAuthValue24
      : undefined);
  (sheetReference = (
    sheetId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    sheetId: sheetId,
  }));
  (rangeReference = (
    range?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    range: range,
  }));
  (resolvePlatformApiAndAuthValue25 = (
    platformApiAndAuthValue25?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    rangeReference({
      r1: platformApiAndAuthValue25,
      r2: platformApiAndAuthValue25,
      c1: options,
      c2: options,
    }));
  (resolvePlatformApiAndAuthRows2 = (
    platformApiAndAuthRows2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    rows: [platformApiAndAuthRows2, options],
  }));
  (resolvePlatformApiAndAuthCols = (
    platformApiAndAuthCols?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    cols: [platformApiAndAuthCols, options],
  }));
  (propertyReference = (
    property?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    property: property,
  }));
  (resolvePlatformApiAndAuthValue26 = (
    name?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    name: name,
  }));
  (resolvePlatformApiAndAuthIndex = (
    index?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    index: index,
  }));
  (resolvePlatformApiAndAuthWindow = (
    platformApiAndAuthWindow?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [
    sheetReference(platformApiAndAuthWindow),
    propertyReference(`Window`),
  ]);
  (resolvePlatformApiAndAuthRef = (
    platformApiAndAuthRef?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ref: {
      path: [sheetReference(platformApiAndAuthRef), rangeReference(options)],
    },
  }));
  (resolvePlatformApiAndAuthTrue = (
    platformApiAndAuthTrue?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformApiAndAuthTrue === `true`);
  (resolvePlatformApiAndAuthValue27 = (
    platformApiAndAuthValue27?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => platformApiAndAuthValue27);
  (resolvePlatformApiAndAuthIsFinite3 = (
    platformApiAndAuthIsFinite3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let number2 = Number(platformApiAndAuthIsFinite3);
    return Number.isFinite(number2) ? number2 : platformApiAndAuthIsFinite3;
  });
  (PlatformApiAndAuthFontB = {
    "font.b": {
      prop: `Font`,
      member: `Bold`,
      coerce: resolvePlatformApiAndAuthTrue,
    },
    "font.i": {
      prop: `Font`,
      member: `Italic`,
      coerce: resolvePlatformApiAndAuthTrue,
    },
    "font.u": {
      prop: `Font`,
      member: `Underline`,
      coerce: resolvePlatformApiAndAuthTrue,
    },
    "font.strike": {
      prop: `Font`,
      member: `Strikethrough`,
      coerce: resolvePlatformApiAndAuthTrue,
    },
    "font.sz": {
      prop: `Font`,
      member: `Size`,
      coerce: resolvePlatformApiAndAuthIsFinite3,
    },
    "font.name": {
      prop: `Font`,
      member: `Name`,
      coerce: resolvePlatformApiAndAuthValue27,
    },
    "font.color": {
      prop: `Font`,
      member: `Color`,
      coerce: resolvePlatformApiAndAuthValue27,
    },
    "fill.fg_color": {
      prop: `Interior`,
      member: `Color`,
      coerce: resolvePlatformApiAndAuthValue27,
    },
    "fill.bg_color": {
      prop: `Interior`,
      member: `PatternColor`,
      coerce: resolvePlatformApiAndAuthValue27,
    },
    "fill.pattern_type": {
      prop: `Interior`,
      member: `Pattern`,
      coerce: resolvePlatformApiAndAuthValue27,
    },
    num_fmt: {
      member: `NumberFormat`,
      coerce: resolvePlatformApiAndAuthValue27,
    },
    "alignment.horizontal": {
      member: `HorizontalAlignment`,
      coerce: resolvePlatformApiAndAuthValue27,
    },
    "alignment.vertical": {
      member: `VerticalAlignment`,
      coerce: resolvePlatformApiAndAuthValue27,
    },
    "alignment.wrap_text": {
      member: `WrapText`,
      coerce: resolvePlatformApiAndAuthTrue,
    },
    "alignment.indent": {
      member: `IndentLevel`,
      coerce: resolvePlatformApiAndAuthIsFinite3,
    },
    "protection.locked": {
      member: `Locked`,
      coerce: resolvePlatformApiAndAuthTrue,
    },
    "protection.hidden": {
      member: `FormulaHidden`,
      coerce: resolvePlatformApiAndAuthTrue,
    },
  });
  (PlatformApiAndAuthWhole = {
    whole: `xlValidateWholeNumber`,
    decimal: `xlValidateDecimal`,
    list: `xlValidateList`,
    date: `xlValidateDate`,
    time: `xlValidateTime`,
    textLength: `xlValidateTextLength`,
    custom: `xlValidateCustom`,
  });
  (PlatformApiAndAuthRow = {
    row: 1,
    col: 2,
    column: 2,
    page: 3,
    values: 4,
    data: 4,
  });
}

export {
  LiteUnavailableError,
  PlatformApiAndAuthAssign,
  PlatformApiAndAuthFontB,
  PlatformApiAndAuthRow,
  PlatformApiAndAuthWhat,
  PlatformApiAndAuthWhole,
  collectPlatformApiAndAuthDims,
  filterPlatformApiAndAuthEdge,
  finiteNumberValue,
  propertyReference,
  rangeReference,
  resolvePlatformApiAndAuthCols,
  resolvePlatformApiAndAuthExec,
  resolvePlatformApiAndAuthIndex,
  resolvePlatformApiAndAuthKind2,
  resolvePlatformApiAndAuthPush,
  resolvePlatformApiAndAuthRef,
  resolvePlatformApiAndAuthReject,
  resolvePlatformApiAndAuthResolve,
  resolvePlatformApiAndAuthRows2,
  resolvePlatformApiAndAuthSheet,
  resolvePlatformApiAndAuthUnmapped,
  resolvePlatformApiAndAuthValue16,
  resolvePlatformApiAndAuthValue17,
  resolvePlatformApiAndAuthValue18,
  resolvePlatformApiAndAuthValue19,
  resolvePlatformApiAndAuthValue20,
  resolvePlatformApiAndAuthValue21,
  resolvePlatformApiAndAuthValue22,
  resolvePlatformApiAndAuthValue24,
  resolvePlatformApiAndAuthValue25,
  resolvePlatformApiAndAuthValue26,
  resolvePlatformApiAndAuthWindow,
  sheetReference,
  stringValue,
};

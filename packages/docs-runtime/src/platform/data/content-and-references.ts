/** BaoCut: data content and references from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  $ZodError,
  _safeParse,
  array,
  boolean,
  discriminatedUnion,
  literal,
  preprocess,
  initializeCommonJS,
  strictObject,
  string,
  value_enum,
} from "../dependencies";
import {
  DataEnumsAndValidationFilter,
  DataEnumsAndValidationFilter2,
  dataEnumsAndValidationProjectFileNodeRunValues,
} from "./enums-and-validation";
import {
  lazyZod,
} from "./lazy-zod";

function isDataContentAndReferencesValue(
  dataContentAndReferencesValue?: Dynamic,
  options?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (items === undefined) return true;
  let difference = options - 1;
  let difference2 = items.length - 1;
  for (; difference2 >= 0; )
    if (
      items[difference2] ===
      `
`
    ) {
      for (
        ;
        difference2 >= 0 &&
        items[difference2] ===
          `
`;

      )
        difference2--;
      if (
        difference < 0 ||
        dataContentAndReferencesValue[difference] !==
          `
`
      )
        return false;
      for (
        ;
        difference >= 0 &&
        dataContentAndReferencesValue[difference] ===
          `
`;

      )
        difference--;
    } else {
      if (
        difference < 0 ||
        dataContentAndReferencesValue[difference] !== items[difference2]
      )
        return false;
      difference--;
      difference2--;
    }
  return true;
}

function isDataContentAndReferencesValue2(
  items?: Dynamic,
  options?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (items2 === undefined) return true;
  let options2: Dynamic = options;
  let index = 0;
  for (; index < items2.length; )
    if (
      items2[index] ===
      `
`
    ) {
      for (
        ;
        index < items2.length &&
        items2[index] ===
          `
`;

      )
        index++;
      if (
        options2 >= items.length ||
        items[options2] !==
          `
`
      )
        return false;
      for (
        ;
        options2 < items.length &&
        items[options2] ===
          `
`;

      )
        options2++;
    } else {
      if (options2 >= items.length || items[options2] !== items2[index])
        return false;
      options2++;
      index++;
    }
  return true;
}

function resolveDataContentAndReferencesPath(
  dataContentAndReferencesPath?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let runs: Dynamic = [];
  let flat: string = ``;
  let helloCImport3 = (
    node?: Dynamic,
    path?: Dynamic,
    locked?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (node.text !== undefined) {
      runs.push({
        path: path,
        start: flat.length,
        text: node.text,
        locked: locked,
      });
      flat += node.text;
      return;
    }
    let locked2: Dynamic = locked || node.attrs?.locked === true;
    let content: Dynamic = node.content ?? [];
    for (let index = 0; index < content.length; index++)
      helloCImport3(content[index], [...path, index], locked2);
    flat += `
`;
  };
  helloCImport3(dataContentAndReferencesPath, [], false);
  return {
    flat: flat,
    runs: runs,
  };
}

function resolveDataContentAndReferencesStart(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count = 0;
  let difference = items.length - 1;
  for (; count < difference; ) {
    let amount = (count + difference + 1) >> 1;
    if (items[amount].start <= options) {
      count = amount;
    } else {
      difference = amount - 1;
    }
  }
  return count;
}

function resolveDataContentAndReferencesExact(
  dataContentAndReferencesExact?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!options.exact)
    return {
      exact: 0,
      ctx: 0,
    };
  let {
    flat: dataContentAndReferencesPath,
    runs: dataContentAndReferencesPath2,
  }: Dynamic = resolveDataContentAndReferencesPath(
    dataContentAndReferencesExact,
  );
  if (dataContentAndReferencesPath2.length === 0)
    return {
      exact: 0,
      ctx: 0,
    };
  let exact = 0;
  let ctx = 0;
  let count: number = 0;
  for (;;) {
    let dataContentAndReferencesPathIndex: Dynamic =
      dataContentAndReferencesPath.indexOf(options.exact, count);
    if (dataContentAndReferencesPathIndex < 0) break;
    exact++;
    if (
      isDataContentAndReferencesValue(
        dataContentAndReferencesPath,
        dataContentAndReferencesPathIndex,
        options.prefix,
      ) &&
      isDataContentAndReferencesValue2(
        dataContentAndReferencesPath,
        dataContentAndReferencesPathIndex + options.exact.length,
        options.suffix,
      )
    ) {
      ctx++;
    }
    count = dataContentAndReferencesPathIndex + 1;
  }
  return {
    exact: exact,
    ctx: ctx,
  };
}

function resolveDataContentAndReferencesExact2(
  dataContentAndReferencesExact2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    exact: dataContentAndReferencesExact,
    ctx: dataContentAndReferencesExact3,
  }: Dynamic = resolveDataContentAndReferencesExact(
    dataContentAndReferencesExact2,
    options,
  );
  return dataContentAndReferencesExact === 0
    ? `miss`
    : dataContentAndReferencesExact3 === 1
      ? `hit_ctx`
      : dataContentAndReferencesExact3 > 1
        ? `ambiguous`
        : dataContentAndReferencesExact === 1
          ? `hit_exact_fallback`
          : `ambiguous`;
}

var resolveDataContentAndReferencesCharCodeAt: Dynamic;

function resolveDataContentAndReferencesPrefix(
  dataContentAndReferencesPrefix?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let matchesPrefixCount = (options.prefix ?? ``).length < 8;
  let matchesSuffixCount = (options.suffix ?? ``).length < 8;
  if (!matchesPrefixCount && !matchesSuffixCount) return;
  let dataContentAndReferencesReason: Dynamic =
    resolveDataContentAndReferencesReason(
      dataContentAndReferencesPrefix,
      options,
    );
  if (!dataContentAndReferencesReason.ok) return;
  let total: Dynamic = dataContentAndReferencesReason.at + options.exact.length;
  let resolveDataContentAndReferencesPrefixResult = /\n+/g;
  let max = Math.max(0, dataContentAndReferencesReason.at - 32);
  let min = Math.min(dataContentAndReferencesReason.flat.length, total + 32);
  let total2 = resolveDataContentAndReferencesCharCodeAt(
    dataContentAndReferencesReason.flat,
    max,
  )
    ? max + 1
    : max;
  let difference = resolveDataContentAndReferencesCharCodeAt(
    dataContentAndReferencesReason.flat,
    min,
  )
    ? min - 1
    : min;
  return {
    prefix: matchesPrefixCount
      ? dataContentAndReferencesReason.flat
          .slice(total2, dataContentAndReferencesReason.at)
          .replace(
            resolveDataContentAndReferencesPrefixResult,
            `
`,
          )
          .replace(/^\n/, ``)
      : options.prefix,
    suffix: matchesSuffixCount
      ? dataContentAndReferencesReason.flat
          .slice(total, difference)
          .replace(
            resolveDataContentAndReferencesPrefixResult,
            `
`,
          )
          .replace(/\n$/, ``)
      : options.suffix,
  };
}

function resolveDataContentAndReferencesReason(
  dataContentAndReferencesReason?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!options.exact)
    return {
      ok: false,
      reason: `not-found`,
    };
  let { flat: flat, runs: runs }: Dynamic = resolveDataContentAndReferencesPath(
    dataContentAndReferencesReason,
  );
  if (runs.length === 0)
    return {
      ok: false,
      reason: `not-found`,
    };
  let items: Dynamic = [];
  let items2: Dynamic = [];
  let count: number = 0;
  for (;;) {
    let flatIndex: Dynamic = flat.indexOf(options.exact, count);
    if (flatIndex < 0) break;
    items.push(flatIndex);
    if (
      isDataContentAndReferencesValue(flat, flatIndex, options.prefix) &&
      isDataContentAndReferencesValue2(
        flat,
        flatIndex + options.exact.length,
        options.suffix,
      )
    ) {
      items2.push(flatIndex);
    }
    count = flatIndex + 1;
  }
  let items3: Dynamic = items2.length > 0 ? items2 : items;
  return items3.length === 0
    ? {
        ok: false,
        reason: `not-found`,
      }
    : items3.length > 1
      ? {
          ok: false,
          reason: `ambiguous`,
        }
      : {
          ok: true,
          flat: flat,
          runs: runs,
          at: items3[0],
        };
}

var dataContentAndReferencesSUMOTUWEValues: string[];

var DataContentAndReferencesState: Dynamic;

var resolveDataContentAndReferencesTrim: Dynamic;

function resolveDataContentAndReferencesError(
  dataContentAndReferencesError?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDataContentAndReferencesErrorHandler: Dynamic = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    error: error,
  });
  let record2: Dynamic = {};
  for (let resolveDataContentAndReferencesErrorResult of dataContentAndReferencesError.split(
    `;`,
  ) as Dynamic) {
    let resolveDataContentAndReferencesErrorResultIndex: Dynamic =
      resolveDataContentAndReferencesErrorResult.indexOf(`=`);
    if (resolveDataContentAndReferencesErrorResultIndex < 0)
      return resolveDataContentAndReferencesErrorHandler(
        `malformed part '${resolveDataContentAndReferencesTrim(resolveDataContentAndReferencesErrorResult)}' (expected KEY=VALUE)`,
      );
    let toUpperCase: Dynamic = resolveDataContentAndReferencesErrorResult
      .slice(0, resolveDataContentAndReferencesErrorResultIndex)
      .trim()
      .toUpperCase();
    if (toUpperCase in record2)
      return resolveDataContentAndReferencesErrorHandler(
        `duplicate ${resolveDataContentAndReferencesTrim(toUpperCase)} part`,
      );
    record2[toUpperCase] = resolveDataContentAndReferencesErrorResult
      .slice(resolveDataContentAndReferencesErrorResultIndex + 1)
      .trim();
  }
  let freq: Dynamic = record2.FREQ?.toUpperCase();
  if (freq !== `DAILY` && freq !== `WEEKLY` && freq !== `MONTHLY`)
    return resolveDataContentAndReferencesErrorHandler(
      freq === undefined
        ? `FREQ is required`
        : `FREQ=${resolveDataContentAndReferencesTrim(freq)} is not supported (only DAILY, WEEKLY, MONTHLY)`,
    );
  let interval = record2.INTERVAL ? Number(record2.INTERVAL) : 1;
  if (!Number.isInteger(interval) || interval < 1)
    return resolveDataContentAndReferencesErrorHandler(
      `INTERVAL=${resolveDataContentAndReferencesTrim(record2.INTERVAL ?? ``)} must be a positive integer`,
    );
  let trim: Dynamic = (
    dataContentAndReferencesError2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let recordItem: Dynamic = record2[dataContentAndReferencesError2];
    if (recordItem == null) return [];
    let recordItemParts: Dynamic = recordItem.split(`,`);
    if (recordItemParts.length > 64)
      return `${dataContentAndReferencesError2} has too many values (max 64)`;
    let uniqueItems2: Dynamic = new (Set as Dynamic)();
    for (let resolveDataContentAndReferencesErrorResult of recordItemParts as Dynamic) {
      if (resolveDataContentAndReferencesErrorResult.trim() === ``)
        return `${dataContentAndReferencesError2} has an empty value (stray comma?)`;
      let number2 = Number(resolveDataContentAndReferencesErrorResult);
      if (!Number.isInteger(number2) || number2 < options || number2 > context)
        return `${dataContentAndReferencesError2} value '${resolveDataContentAndReferencesTrim(resolveDataContentAndReferencesErrorResult.trim())}' must be an integer ${options}–${context}`;
      uniqueItems2.add(number2);
    }
    return [...uniqueItems2];
  };
  let trimmedText: Dynamic = trim(`BYHOUR`, 0, 23);
  let trimmedText2: Dynamic = trim(`BYMINUTE`, 0, 59);
  let trimmedText3: Dynamic = trim(`BYMONTHDAY`, 1, 31);
  if (typeof trimmedText == `string`)
    return resolveDataContentAndReferencesErrorHandler(trimmedText);
  if (typeof trimmedText2 == `string`)
    return resolveDataContentAndReferencesErrorHandler(trimmedText2);
  if (typeof trimmedText3 == `string`)
    return resolveDataContentAndReferencesErrorHandler(trimmedText3);
  let byDay: Dynamic;
  if (record2.BYDAY != null) {
    let BYDAYParts: Dynamic = record2.BYDAY.split(`,`);
    if (BYDAYParts.length > 64)
      return resolveDataContentAndReferencesErrorHandler(
        `BYDAY has too many values (max 64)`,
      );
    let uniqueItems2: Dynamic = new (Set as Dynamic)();
    for (let resolveDataContentAndReferencesErrorResult of BYDAYParts as Dynamic) {
      let toUpperCase: Dynamic = resolveDataContentAndReferencesErrorResult
        .trim()
        .toUpperCase();
      if (!dataContentAndReferencesSUMOTUWEValues.includes(toUpperCase))
        return resolveDataContentAndReferencesErrorHandler(
          `BYDAY value '${resolveDataContentAndReferencesTrim(resolveDataContentAndReferencesErrorResult.trim())}' is not supported (two-letter days only — SU,MO,TU,WE,TH,FR,SA; no ordinals like 1MO)`,
        );
      uniqueItems2.add(toUpperCase);
    }
    byDay = [...uniqueItems2];
  }
  let uniqueItems: Dynamic = new (Set as Dynamic)([
    `FREQ`,
    `INTERVAL`,
    `BYDAY`,
    `BYHOUR`,
    `BYMINUTE`,
    `BYMONTHDAY`,
  ]);
  for (let resolveDataContentAndReferencesErrorResult of Object.keys(
    record2,
  ) as Dynamic)
    if (!uniqueItems.has(resolveDataContentAndReferencesErrorResult))
      return resolveDataContentAndReferencesErrorHandler(
        `${resolveDataContentAndReferencesTrim(resolveDataContentAndReferencesErrorResult)} is not supported (supported parts: FREQ, INTERVAL, BYDAY, BYHOUR, BYMINUTE, BYMONTHDAY)`,
      );
  return interval === 1
    ? freq === `WEEKLY` && !byDay
      ? resolveDataContentAndReferencesErrorHandler(
          `WEEKLY requires BYDAY (e.g. BYDAY=MO,WE)`,
        )
      : freq === `MONTHLY` && trimmedText3.length === 0
        ? resolveDataContentAndReferencesErrorHandler(
            `MONTHLY requires BYMONTHDAY (e.g. BYMONTHDAY=1)`,
          )
        : freq === `MONTHLY` && byDay
          ? resolveDataContentAndReferencesErrorHandler(
              `BYDAY is not supported with FREQ=MONTHLY`,
            )
          : freq !== `MONTHLY` && trimmedText3.length > 0
            ? resolveDataContentAndReferencesErrorHandler(
                `BYMONTHDAY is only valid with FREQ=MONTHLY`,
              )
            : {
                rule: {
                  freq: freq,
                  interval: interval,
                  byDay: byDay,
                  byHour: trimmedText.length ? trimmedText : [0],
                  byMinute: trimmedText2.length ? trimmedText2 : [0],
                  byMonthDay: trimmedText3.length ? trimmedText3 : undefined,
                },
              }
    : resolveDataContentAndReferencesErrorHandler(
        `INTERVAL=${interval} is not supported (only INTERVAL=1)`,
      );
}

function resolveDataContentAndReferencesRule(
  dataContentAndReferencesRule?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveDataContentAndReferencesError(dataContentAndReferencesRule).rule ??
    null
  );
}

function collectDataContentAndReferencesWEEKLY(
  collectDataContentAndReferencesWEEKLY2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let dataContentAndReferencesRule: Dynamic =
    resolveDataContentAndReferencesRule(collectDataContentAndReferencesWEEKLY2);
  if (
    !dataContentAndReferencesRule ||
    dataContentAndReferencesRule.byHour.length > 1 ||
    dataContentAndReferencesRule.byMinute.length > 1 ||
    (dataContentAndReferencesRule.freq !== `WEEKLY` &&
      (dataContentAndReferencesRule.byDay?.length ?? 0) > 0)
  )
    return `${collectDataContentAndReferencesWEEKLY2} · ${options}`;
  let byHourItem: Dynamic = dataContentAndReferencesRule.byHour[0] ?? 0;
  let byMinuteItem: Dynamic = dataContentAndReferencesRule.byMinute[0] ?? 0;
  let label = byHourItem >= 12 ? `PM` : `AM`;
  let label2 = `${byHourItem % 12 == 0 ? 12 : byHourItem % 12}:${String(byMinuteItem).padStart(2, `0`)} ${label}`;
  let collectDataContentAndReferencesWEEKLYResult: Dynamic;
  collectDataContentAndReferencesWEEKLYResult =
    dataContentAndReferencesRule.freq === `WEEKLY`
      ? `Weekly on ${(dataContentAndReferencesRule.byDay ?? []).map((byDay?: Dynamic, ..._extraArguments: unknown[]): Dynamic => DataContentAndReferencesState[byDay]).join(`, `)}`
      : dataContentAndReferencesRule.freq === `MONTHLY`
        ? `Monthly on day ${(dataContentAndReferencesRule.byMonthDay ?? []).join(`, `)}`
        : `Daily`;
  let label3 = ``;
  try {
    label3 = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {}
  return `${collectDataContentAndReferencesWEEKLYResult} at ${label2}${options && options !== label3 ? ` · ${options}` : ``}`;
}

var dataContentAndReferencesPattern: RegExp;

var DataContentAndReferencesState2: RegExp;

var DataContentAndReferencesState3: RegExp;

function resolveDataContentAndReferencesReplace(
  dataContentAndReferencesReplace?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return dataContentAndReferencesReplace.replace(
    new RegExp(dataContentAndReferencesPattern.source, `gu`),
    (
      dataContentAndReferencesReplace2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `\\u{${dataContentAndReferencesReplace2.codePointAt(0).toString(16).toUpperCase()}}`,
  );
}

function resolveDataContentAndReferencesReplace2(
  dataContentAndReferencesReplace2?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  let replace: Dynamic = (
    dataContentAndReferencesReplace22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataContentAndReferencesReplace22.replace(
      new RegExp(DataContentAndReferencesState2.source, `gu`),
      (
        dataContentAndReferencesReplace23?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        `\\u{${dataContentAndReferencesReplace23.codePointAt(0).toString(16).toUpperCase()}}`,
    );
  let label: string = ``;
  let count: number = 0;
  for (let resolveDataContentAndReferencesReplace2Result of dataContentAndReferencesReplace2.matchAll(
    DataContentAndReferencesState3,
  ) as Dynamic) {
    label +=
      replace(
        dataContentAndReferencesReplace2.slice(
          count,
          resolveDataContentAndReferencesReplace2Result.index,
        ),
      ) + resolveDataContentAndReferencesReplace2Result[0];
    count =
      resolveDataContentAndReferencesReplace2Result.index +
      resolveDataContentAndReferencesReplace2Result[0].length;
  }
  return label + replace(dataContentAndReferencesReplace2.slice(count));
}

function resolveDataContentAndReferencesToUpperCase(
  dataContentAndReferences?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count = 0;
  for (let resolveDataContentAndReferencesToUpperCaseResult of dataContentAndReferences.toUpperCase() as Dynamic)
    count =
      count * 26 +
      (resolveDataContentAndReferencesToUpperCaseResult.charCodeAt(0) - 64);
  return count;
}

var resolveDataContentAndReferencesValue: Dynamic;

function collectDataContentAndReferencesEntries(
  collectDataContentAndReferencesEntries2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (collectDataContentAndReferencesEntries2 === undefined) return `[]`;
  if (
    !resolveDataContentAndReferencesValue(
      collectDataContentAndReferencesEntries2,
    )
  )
    return null;
  let collectDataContentAndReferencesEntriesEntries: Dynamic = Object.entries(
    collectDataContentAndReferencesEntries2,
  );
  for (let [
    ,
    collectDataContentAndReferencesEntriesResult,
  ] of collectDataContentAndReferencesEntriesEntries as Dynamic)
    if (typeof collectDataContentAndReferencesEntriesResult != `string`)
      return null;
  collectDataContentAndReferencesEntriesEntries.sort(
    (
      [rolldownRImport2]: Dynamic,
      [rolldownRImport3]: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      rolldownRImport2 < rolldownRImport3
        ? -1
        : +(rolldownRImport2 > rolldownRImport3),
  );
  return JSON.stringify(
    collectDataContentAndReferencesEntriesEntries.map(
      (
        [rolldownRImport2, rolldownRImport3]: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => [rolldownRImport2, `s:` + rolldownRImport3],
    ),
  );
}

function resolveDataContentAndReferencesTest(
  dataContentAndReferencesTest?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!/Failed query:/.test(dataContentAndReferencesTest))
    return dataContentAndReferencesTest;
  let label = options === undefined ? `[redacted]` : `[redacted: ${options}]`;
  return dataContentAndReferencesTest
    .replace(
      /(Failed query:)[\s\S]*?(?=\bparams:|$)/g,
      `$1 [redacted]
`,
    )
    .replace(/\bparams:[\s\S]*$/g, `params: ${label}`);
}

var isDataContentAndReferencesSeverity: Dynamic;

var resolveDataContentAndReferencesReplace3: Dynamic;

function resolveDataContentAndReferencesError2(
  dataContentAndReferencesError2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !dataContentAndReferencesError2 ||
    typeof dataContentAndReferencesError2 != `object`
  )
    return resolveDataContentAndReferencesTest(
      String(dataContentAndReferencesError2),
    );
  let dataContentAndReferencesError22: Dynamic = dataContentAndReferencesError2;
  let isArray =
    Array.isArray(dataContentAndReferencesError22.params) ||
    typeof dataContentAndReferencesError22.query == `string`;
  let name: Dynamic =
    dataContentAndReferencesError22.name ??
    dataContentAndReferencesError2.constructor?.name ??
    `Error`;
  let label = ``;
  if (
    isDataContentAndReferencesSeverity(dataContentAndReferencesError22.cause)
  ) {
    label = ` [pg ${dataContentAndReferencesError22.cause.code}] ${resolveDataContentAndReferencesReplace3(dataContentAndReferencesError22.cause.message ?? ``)}`;
  } else {
    if (dataContentAndReferencesError22.cause?.code) {
      label = ` [code ${String(dataContentAndReferencesError22.cause.code).slice(0, 32)}]`;
    }
  }
  if (isArray) {
    let paramsCount: Dynamic = Array.isArray(
      dataContentAndReferencesError22.params,
    )
      ? dataContentAndReferencesError22.params.length
      : undefined;
    return `${name}: ${typeof dataContentAndReferencesError22.message == `string` ? resolveDataContentAndReferencesTest(dataContentAndReferencesError22.message, paramsCount) : `[redacted query]`}${label}`;
  }
  return `${name}: ${typeof dataContentAndReferencesError22.message == `string` ? resolveDataContentAndReferencesTest(dataContentAndReferencesError22.message) : ``}${label}`;
}

var dataContentAndReferencesStringNumberBoolDateValues: string[];

var dataContentAndReferencesMessageSchema: Dynamic;

var dataContentAndReferencesKindSchema: Dynamic;

var DataContentAndReferencesRows: Dynamic;

var resolveDataContentAndReferencesSuccess: Dynamic;

var DataContentAndReferencesHasHeader: Dynamic;

var dataContentAndReferencesDescribeSchema: Dynamic;

var dataContentAndReferencesSpecInvalidBongoInternalValues: string[];

var dataContentAndReferencesPattern2: RegExp;

var resolveDataContentAndReferencesReplace4: Dynamic;

var resolveDataContentAndReferencesIndexOf: Dynamic;

var dataContentAndReferencesIdentifierPattern: RegExp;

var dataContentAndReferencesDescribeSchema2: Dynamic;

var resolveDataContentAndReferencesTest2: Dynamic;

var resolveDataContentAndReferencesTest3: Dynamic;

var resolveDataContentAndReferencesTest4: Dynamic;

var resolveDataContentAndReferencesValue2: Dynamic;

var dataContentAndReferencesDescribeSchema3: Dynamic;

var dataContentAndReferencesDescribeSchema4: Dynamic;

var dataContentAndReferencesProjectSuiteValues: string[];

var dataContentAndReferencesKindSchema2: Dynamic;

var dataContentAndReferencesFragSchema: Dynamic;

var dataContentAndReferencesPattern3: RegExp;

function resolveDataContentAndReferencesChildId(
  childId?: Dynamic,
  options: Dynamic = (
    dataContentAndReferencesChildId?: Dynamic,
    ..._extraArguments: unknown[]
  ) => dataContentAndReferencesPattern3.test(dataContentAndReferencesChildId),
  ..._extraArguments: unknown[]
): Dynamic {
  if (!childId) return null;
  let childIdIndex: Dynamic = childId.indexOf(`.`);
  if (childIdIndex === -1)
    return options(childId)
      ? {
          childId: childId,
        }
      : {
          engineAnchor: childId,
        };
  let childId2: Dynamic = childId.slice(0, childIdIndex);
  let engineAnchor: Dynamic = childId.slice(childIdIndex + 1);
  return options(childId2) && engineAnchor.length > 0
    ? {
        childId: childId2,
        engineAnchor: engineAnchor,
      }
    : {
        engineAnchor: childId,
      };
}

var dataContentAndReferencesDescribeSchema5: Dynamic;

var dataContentAndReferencesDescribeSchema6: Dynamic;

var dataContentAndReferencesPattern4: RegExp;

var DataContentAndReferencesState4: RegExp;

var resolveDataContentAndReferencesTest5: Dynamic;

var dataContentAndReferencesSet: Dynamic;

var resolveDataContentAndReferencesIncludes: Dynamic;

function isDataContentAndReferencesVersion(
  dataContentAndReferencesVersion?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataContentAndReferencesVersionIndex: Dynamic =
    dataContentAndReferencesVersion.indexOf(`@`);
  if (dataContentAndReferencesVersionIndex === -1)
    return dataContentAndReferencesPattern4.test(
      dataContentAndReferencesVersion,
    )
      ? {
          id: dataContentAndReferencesVersion,
        }
      : null;
  let dataContentAndReferencesVersionSlice: Dynamic =
    dataContentAndReferencesVersion.slice(
      0,
      dataContentAndReferencesVersionIndex,
    );
  let version: Dynamic = dataContentAndReferencesVersion.slice(
    dataContentAndReferencesVersionIndex + 1,
  );
  return !dataContentAndReferencesPattern4.test(
    dataContentAndReferencesVersionSlice,
  ) || !dataContentAndReferencesPattern4.test(version)
    ? null
    : {
        id: dataContentAndReferencesVersionSlice,
        version: version,
      };
}

function resolveDataContentAndReferencesTest6(
  dataContentAndReferencesTest6?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveDataContentAndReferencesChildId(
    dataContentAndReferencesTest6,
    (dataContentAndReferencesTest62?: Dynamic, ..._extraArguments: unknown[]) =>
      DataContentAndReferencesState4.test(dataContentAndReferencesTest62),
  );
}

function resolveDataContentAndReferencesKind(
  dataContentAndReferencesKind?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label = `/${dataContentAndReferencesKind.container.kind}/${resolveDataContentAndReferencesVersion(dataContentAndReferencesKind.container)}/${dataContentAndReferencesKind.ref.noun}/${encodeURIComponent(dataContentAndReferencesKind.ref.id)}`;
  if (
    dataContentAndReferencesKind.anchor?.engineAnchor !== undefined &&
    !dataContentAndReferencesKind.anchor.childId &&
    resolveDataContentAndReferencesTest6(
      dataContentAndReferencesKind.anchor.engineAnchor,
    )?.childId !== undefined
  )
    throw Error(
      `v3Href: engine anchor "${dataContentAndReferencesKind.anchor.engineAnchor}" is indistinguishable from a child id — unspeakable in the grammar (structure the engine anchor, or name the child explicitly)`,
    );
  return (
    label +
    (dataContentAndReferencesKind.anchor
      ? `#` +
        (dataContentAndReferencesKind.anchor.childId ?? ``) +
        (dataContentAndReferencesKind.anchor.childId &&
        dataContentAndReferencesKind.anchor.engineAnchor
          ? `.`
          : ``) +
        (dataContentAndReferencesKind.anchor.engineAnchor ?? ``)
      : ``)
  );
}

function resolveDataContentAndReferencesVersion(
  dataContentAndReferencesVersion?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    encodeURIComponent(dataContentAndReferencesVersion.id) +
    (dataContentAndReferencesVersion.version
      ? `@${encodeURIComponent(dataContentAndReferencesVersion.version)}`
      : ``)
  );
}

var dataContentAndReferencesSet2: Dynamic;

function filterDataContentAndReferencesKind(
  filterDataContentAndReferencesKind2?: Dynamic,
  options: Dynamic = dataContentAndReferencesSet2,
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredFilterDataContentAndReferencesKindPartItemParts: Dynamic =
    filterDataContentAndReferencesKind2
      .split(`?`)[0]
      .split(`/`)
      .filter(Boolean);
  if (filteredFilterDataContentAndReferencesKindPartItemParts.length !== 2)
    return null;
  let [kind, setKind]: Dynamic =
    filteredFilterDataContentAndReferencesKindPartItemParts;
  if (!resolveDataContentAndReferencesIncludes(kind) || !options.has(kind))
    return null;
  let isDataContentAndReferencesVersion2: Dynamic =
    isDataContentAndReferencesVersion(setKind);
  return isDataContentAndReferencesVersion2 === null
    ? null
    : {
        kind: kind,
        ...isDataContentAndReferencesVersion2,
      };
}

function resolveDataContentAndReferencesKind2(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `/${entry.kind}/${resolveDataContentAndReferencesVersion(entry)}`;
}

function resolveDataContentAndReferencesKind3(
  dataContentAndReferencesKind3?: Dynamic,
  address?: Dynamic,
  slug?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataContentAndReferencesKind32: Dynamic =
    dataContentAndReferencesKind3.find(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.id === address,
    );
  return dataContentAndReferencesKind32 === undefined || slug === undefined
    ? {
        kind: `missing`,
      }
    : {
        kind: `ready`,
        slug: slug,
        address: address,
        displayName: dataContentAndReferencesKind32.name,
      };
}

function filterDataContentAndReferencesFilter(
  filterDataContentAndReferencesFilter2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredFilterDataContentAndReferencesFilter: Dynamic =
    filterDataContentAndReferencesFilter2.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.name === options,
    );
  if (!(filteredFilterDataContentAndReferencesFilter.length > 1))
    return filteredFilterDataContentAndReferencesFilter[0]?.id ?? options;
}

var dataContentAndReferencesPattern5: RegExp;

var resolveDataContentAndReferencesSplit: Dynamic;

var resolveDataContentAndReferencesReplace5: Dynamic;

function resolveDataContentAndReferencesBONGOCONTAINER(
  dataContentAndReferencesBONGOCONTAINER?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataContentAndReferencesBONGOCONTAINER == null) return null;
  let dataContentAndReferencesReplace5: Dynamic =
    resolveDataContentAndReferencesReplace5(
      dataContentAndReferencesBONGOCONTAINER.__BONGO_CONTAINER__,
    );
  if (dataContentAndReferencesReplace5 !== null)
    return dataContentAndReferencesReplace5;
  let FRAMEPREAMBLE: Dynamic =
    dataContentAndReferencesBONGOCONTAINER.__FRAME_PREAMBLE;
  if (typeof FRAMEPREAMBLE == `object` && FRAMEPREAMBLE) {
    let dataContentAndReferencesReplace52: Dynamic =
      resolveDataContentAndReferencesReplace5(FRAMEPREAMBLE.container);
    if (dataContentAndReferencesReplace52 !== null)
      return dataContentAndReferencesReplace52;
  }
  return resolveDataContentAndReferencesSplit(
    dataContentAndReferencesBONGOCONTAINER.hostname,
  );
}

var dataContentAndReferencesSet3: Dynamic;

var DataContentAndReferencesPublic: string;

function resolveDataContentAndReferencesValue3(
  dataContentAndReferencesValue3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    dataContentAndReferencesValue3 != null &&
    !dataContentAndReferencesSet3.has(dataContentAndReferencesValue3)
  );
}

function resolveDataContentAndReferencesValue4(
  dataContentAndReferencesValue4?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof dataContentAndReferencesValue4 == `string` &&
    dataContentAndReferencesSet3.has(dataContentAndReferencesValue4)
  );
}

function resolveDataContentAndReferencesValue5(
  dataContentAndReferencesValue5?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return dataContentAndReferencesValue5 === DataContentAndReferencesPublic;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataContentAndReferencesStep1(): void {
  (resolveDataContentAndReferencesCharCodeAt = (
    items?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    options > 0 &&
    options < items.length &&
    items.charCodeAt(options - 1) >= 55296 &&
    items.charCodeAt(options - 1) <= 56319 &&
    items.charCodeAt(options) >= 56320 &&
    items.charCodeAt(options) <= 57343);
  (dataContentAndReferencesSUMOTUWEValues = [
    `SU`,
    `MO`,
    `TU`,
    `WE`,
    `TH`,
    `FR`,
    `SA`,
  ]);
  (DataContentAndReferencesState = {
    SU: `Sun`,
    MO: `Mon`,
    TU: `Tue`,
    WE: `Wed`,
    TH: `Thu`,
    FR: `Fri`,
    SA: `Sat`,
  });
  (resolveDataContentAndReferencesTrim = (
    dataContentAndReferencesTrim?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let trimmedDataContentAndReferencesTrim: Dynamic =
      dataContentAndReferencesTrim.trim();
    return trimmedDataContentAndReferencesTrim.length > 40
      ? `${trimmedDataContentAndReferencesTrim.slice(0, 40)}…`
      : trimmedDataContentAndReferencesTrim;
  });
  (dataContentAndReferencesPattern = /[\p{Cf}\p{Default_Ignorable_Code_Point}\u2800\u2028\u2029\u007F-\u009F]/u);
  (DataContentAndReferencesState2 = RegExp(
    `(?!\\u200C|\\u200D|\\uFE0E|\\uFE0F|(?<=\\p{Script=Han})[\\u{E0100}-\\u{E01EF}])[\\p{Cf}\\p{Default_Ignorable_Code_Point}\\u2800\\u2028\\u2029\\u007F-\\u009F]`,
    `u`,
  ));
  (DataContentAndReferencesState3 = RegExp(
    `\\u{1F3F4}(?:\\u{E0067}\\u{E0062}(?:\\u{E0065}\\u{E006E}\\u{E0067}|\\u{E0073}\\u{E0063}\\u{E0074}|\\u{E0077}\\u{E006C}\\u{E0073})\\u{E007F})`,
    `gu`,
  ));
  (resolveDataContentAndReferencesValue = (
    dataContentAndReferencesValue?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataContentAndReferencesValue == `object` &&
    !!dataContentAndReferencesValue &&
    !Array.isArray(dataContentAndReferencesValue));
  collectDataContentAndReferencesEntries(undefined);
  (isDataContentAndReferencesSeverity = (
    dataContentAndReferencesSeverity?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    !!dataContentAndReferencesSeverity &&
    typeof dataContentAndReferencesSeverity == `object` &&
    typeof dataContentAndReferencesSeverity.severity == `string`);
  (resolveDataContentAndReferencesReplace3 = (
    dataContentAndReferencesReplace3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataContentAndReferencesReplace3.replace(/"[^"]*"/g, `"…"`));
  (dataContentAndReferencesStringNumberBoolDateValues = [
    `string`,
    `number`,
    `bool`,
    `date`,
  ]);
  (dataContentAndReferencesMessageSchema = string()
    .min(1)
    .refine(
      (
        dataContentAndReferencesMessageSchema2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        dataContentAndReferencesMessageSchema2
          .split(`.`)
          .every(
            (items?: Dynamic, ..._extraArguments: unknown[]) => items.length > 0,
          ),
      {
        message: `path segments must be non-empty (no leading, trailing or doubled dots)`,
      },
    )
    .describe(
      "A dotted path into the stored answer — `rows`, `data.rows`, `content.0.text`. A numeric segment indexes an array. The walk parses THROUGH a JSON string when the path continues past it; a terminal string is never speculatively parsed.",
    ));
  (dataContentAndReferencesKindSchema = discriminatedUnion(`kind`, [
    strictObject({
      kind: literal(`json-rows`).describe(
        `The answer is JSON; the rows are an array of records.`,
      ),
      rows: dataContentAndReferencesMessageSchema.describe(
        `Path to the array of row records.`,
      ),
    }).describe(
      "json-rows — the rows are already records, at a declared path. This is the explicit spelling that replaces the magic {rows:[…]} unwrap: `{kind:'json-rows', rows:'rows'}` says what the unwrap used to guess.",
    ),
    strictObject({
      kind: literal(`json-columnar`).describe(
        `The answer is JSON; cells and column names are stored apart.`,
      ),
      rows: dataContentAndReferencesMessageSchema.describe(
        `Path to the array of cell ARRAYS (row-major, one array per row).`,
      ),
      columns: dataContentAndReferencesMessageSchema.describe(
        "Path to the column list — an array of names, or of `{name, type?}` descriptors.",
      ),
    }).describe(
      `json-columnar — a header list plus row-major cell arrays, zipped into records. Both paths are required: a columnar answer that carries its own keys is json-rows, not this.`,
    ),
    strictObject({
      kind: literal(`xml-rows`).describe(
        `The answer is an XML document carrying <row><field name=…> rows.`,
      ),
    }).describe(
      `xml-rows — TAKES NO PARAMETERS, by ruling. It is ENVELOPE-BLIND: it finds <row><field name=…> rows ANYWHERE in the document, because <query_result> is one server's element name, not a standard, and pinning it would re-introduce the connector-specific knowledge this union exists to delete. It reads the <schema><column name type/> sidecar to TYPE the cells — an XML transport carries every field as text, and the declared type is right there in the document.`,
    ),
    strictObject({
      kind: literal(`csv`).describe(
        `The answer is CSV text: comma-delimited, RFC 4180 quoting.`,
      ),
      hasHeader: boolean().describe(
        "REQUIRED — does this CSV have a header row? Not defaulted, deliberately: whether row 1 names the columns or IS data is a fact about the file that nothing downstream can see, and guessing it wrong either eats a data row or turns a header into one, silently either way. true = row 1 names the columns. false = row 1 is data, and every entry in `columns` must then carry a `name`, since there is nothing else to key the rows by.",
      ),
      columns: array(
        strictObject({
          name: string()
            .min(1)
            .optional()
            .describe(
              `The row-object key for this column. OPTIONAL when a header row supplies it; give it to rename a header column, or when hasHeader is false. Must be non-empty and unique across columns.`,
            ),
          type: strictObject({
            kind: literal(`literal`),
            type: value_enum(dataContentAndReferencesStringNumberBoolDateValues),
          }).describe(
            "The cell's declared type, spelled EXACTLY as a database column spells it — {kind:'literal', type:'string'|'number'|'bool'|'date'} — so this declaration converts to a database column by renaming `name`→`key` and nothing else. string/number/bool are the JSON primitives; date is an ISO 8601 string (validated, kept as a string). The `{kind:'literal'}` envelope is where {kind:'enum', enum:'<id>'} goes if the enum lane ever learns a CSV spelling; the database's `utterance` kind has none.",
          ),
        }),
      )
        .min(1)
        .optional()
        .describe(
          'POSITIONAL column declarations — entry i describes field i, so the array must cover the file exactly (a header of a different width REFUSES; a partial declaration would silently drop or invent columns). Omit it entirely and every cell stays a verbatim STRING, which is the standing law. DECLARE IT to chart a CSV: a numeric mark channel cannot bind to strings, and without a declaration a bar/line chart draws its axes and no marks. A cell that does not match its declared type REFUSES loudly, naming the row, the column and the value — a declared type is not a hint. An EMPTY cell is a gap (null) under number/bool/date, never 0/false; under `string` it stays "".',
        ),
    }).describe(
      "csv — the first row names the columns unless hasHeader is false. Every cell is a verbatim STRING unless `columns` declares a type for it: refuse-never-coerce is house law, and a CSV carries no type sidecar, so the lens never guesses a type off the data — it only obeys one the author wrote down. COMMA-ONLY by contract: no delimiter sniffing (sniffing is the guess-the-shape heuristic this union deletes). Quoted fields carry embedded commas, newlines, and doubled-quote escapes; a width mismatch or unterminated quote refuses loudly, never a best-effort zip.",
    ),
    strictObject({
      kind: literal(`xlsx-values`).describe(
        `The answer is xlsx workbook bytes: decoded server-side to a per-sheet cell-VALUE grid.`,
      ),
    }).describe(
      "xlsx-values — TAKES NO PARAMETERS. Unlike the rows-adapters (csv/xml/json), xlsx-values is NOT a rows lens: it decodes the workbook bytes to `{[sheetName]: {[a1]: value}}` — VALUES ONLY, the cell leaf is the scalar itself (src/lib/xlsxSheets.ts), plain JSON a hand-written component binds tiles to and a pin addresses by an ordinary RFC 6901 pointer ([sheetName, a1] — e.g. /Metrics/B3). A1 is the CELL LEAF on purpose: the reader is iron (zIronCursor addresses a cell as A1 within a sheet), so matching it means ZERO per-cell conversion at the modal boundary. Sheet NAME keys the map (safe on a frozen, content-addressed blob whose names cannot rot; a LIVE iron sheet keys by numeric id instead — zIronCursor). The decode is SERVER-SIDE (exceljs), so it does NOT run through applyAdapter (the iframe- bundled rows lens refuses it loudly); it is the citation/navigation road, not the chart- table road. The name leaves room for a later `xlsx-formulas` arm (leaf {value, formula}) without renaming this one. To chart an xlsx, reference a single sheet's range through a json/csv adapter.",
    ),
  ]).describe(
    `HOW TO READ THE STORED ANSWER — a lens applied at consumption, never a rewrite of the record (verbatim raw is always stored). Kind-agnostic: it sits BESIDE the runnable on a routine and beside the mechanism on a direct run, because what produced the answer does not determine how the answer is shaped. Absent = the answer is consumed as it stands (the array law: a source value must already BE an array of row objects).`,
  ));
  (DataContentAndReferencesRows = Object.freeze({
    rows: `"<dotted path>"`,
    columns: `"<dotted path>"`,
    hasHeader: `true|false`,
  }));
  (resolveDataContentAndReferencesSuccess = (
    dataContentAndReferencesSuccess?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    _safeParse($ZodError)(dataContentAndReferencesSuccess, undefined).success);
  dataContentAndReferencesKindSchema.options
    .map((option?: Dynamic, ..._extraArguments: unknown[]) => {
      let shape: Dynamic = option.shape;
      return `{kind:"${shape.kind.value}"${Object.entries(shape)
        .filter(
          (
            [rolldownRImportEntry, rolldownRImportEntry2]: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            rolldownRImportEntry !== `kind` &&
            !resolveDataContentAndReferencesSuccess(rolldownRImportEntry2),
        )
        .map(
          ([filteredShapeEntry]: Dynamic, ..._extraArguments: unknown[]) =>
            `, ${filteredShapeEntry}:${Object.hasOwn(DataContentAndReferencesRows, filteredShapeEntry) ? DataContentAndReferencesRows[filteredShapeEntry] : `<required>`}`,
        )
        .join(``)}}`;
    })
    .join(` | `);
  (DataContentAndReferencesHasHeader = preprocess(
    (
      dataContentAndReferencesHasHeader?: unknown,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (
        typeof dataContentAndReferencesHasHeader != `object` ||
        !dataContentAndReferencesHasHeader ||
        Array.isArray(dataContentAndReferencesHasHeader)
      )
        return dataContentAndReferencesHasHeader;
      let dataContentAndReferencesHasHeader2: Dynamic =
        dataContentAndReferencesHasHeader;
      return dataContentAndReferencesHasHeader2.kind !== `csv` ||
        `hasHeader` in dataContentAndReferencesHasHeader2
        ? dataContentAndReferencesHasHeader
        : {
            ...dataContentAndReferencesHasHeader2,
            hasHeader: true,
          };
    },
    dataContentAndReferencesKindSchema,
  ));
  (dataContentAndReferencesDescribeSchema = lazyZod
    .string()
    .describe(
      `Minted object id — base62{8} at birth, random, meaningless by design (html-ref-db-v3). Every object type gets one; nothing is caller-named (ids-minted-by-rooms, v2/decisions/03).`,
    ));
  (dataContentAndReferencesSpecInvalidBongoInternalValues = [
    `spec.invalid`,
    `bongo.internal`,
  ]);
  (dataContentAndReferencesPattern2 = /[\s\p{Cf}\p{Zs}\p{Default_Ignorable_Code_Point}\u034F\u180E\u115F\u1160\u3164\uFFA0\u2800\x00-\x08\x0E-\x1F\x7F-\x9F]/gu);
  (resolveDataContentAndReferencesReplace4 = (
    dataContentAndReferencesReplace4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataContentAndReferencesReplace4.replace(
      dataContentAndReferencesPattern2,
      ``,
    ));
  (resolveDataContentAndReferencesIndexOf = (
    dataContentAndReferencesIndex?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataContentAndReferencesReplace4: Dynamic =
      resolveDataContentAndReferencesReplace4(dataContentAndReferencesIndex);
    let dataContentAndReferencesReplace4Index: Dynamic =
      dataContentAndReferencesReplace4.indexOf(`@`);
    if (
      dataContentAndReferencesReplace4Index < 0 ||
      dataContentAndReferencesReplace4.indexOf(
        `@`,
        dataContentAndReferencesReplace4Index + 1,
      ) !== -1
    )
      return null;
    let replace: Dynamic = dataContentAndReferencesReplace4
      .slice(dataContentAndReferencesReplace4Index + 1)
      .toLowerCase()
      .replace(/\.+$/, ``);
    return replace
      ? dataContentAndReferencesSpecInvalidBongoInternalValues.find(
          (
            dataContentAndReferencesSpecInvalidBongoInternalValue?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            replace === dataContentAndReferencesSpecInvalidBongoInternalValue ||
            replace.endsWith(
              `.${dataContentAndReferencesSpecInvalidBongoInternalValue}`,
            ),
        ) === undefined
        ? null
        : replace
      : null;
  });
  lazyZod
    .string()
    .regex(/^[a-z0-9][a-z0-9-]{0,30}@spec\.invalid$/i)
    .describe(
      `SYNTHETIC principal — <slug>@spec.invalid (RFC 2606 reserved domain).`,
    );
  lazyZod
    .string()
    .regex(/^[^\s@]+@(?![^\s@]*\.invalid\.?$)[^\s@]+\.[^\s@]+$/i)
    .describe(
      `REAL principal — email-shaped at any domain except the reserved .invalid TLD (where synthetics live).`,
    );
  lazyZod
    .string()
    .regex(/^[^\s@]+$/)
    .describe(
      `LEGACY principal — bare token, no @ (host machinery, pre-canon fixtures); disjoint from both namespaced arms by construction.`,
    );
  (dataContentAndReferencesIdentifierPattern = /^(?:[^\s@]+@(?![^\s@]*\.invalid\.?$)[^\s@]+\.[^\s@]+|[a-z0-9][a-z0-9-]{0,30}@spec\.invalid|[^\s@]+)$/i);
  (dataContentAndReferencesDescribeSchema2 = lazyZod
    .string()
    .refine(
      (
        dataContentAndReferencesDescribeSchema22?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataContentAndReferencesIdentifierPattern.test(
          dataContentAndReferencesDescribeSchema22,
        ),
      `principal grammar (see src/room/literals.ts)`,
    )
    .describe(
      `Who acted — REAL email | SYNTHETIC <slug>@spec.invalid | legacy bare token. Disjoint namespaces: a synthetic can never spell a real identity.`,
    ));
  (resolveDataContentAndReferencesTest2 = (
    dataContentAndReferencesTest2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    /^user_01/i.test(dataContentAndReferencesTest2) &&
    !dataContentAndReferencesTest2.includes(`@`));
  (resolveDataContentAndReferencesTest3 = (
    dataContentAndReferencesTest3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      dataContentAndReferencesTest3,
    ));
  (resolveDataContentAndReferencesTest4 = (
    dataContentAndReferencesTest4?: Dynamic,
    ..._extraArguments: unknown[]
  ) => /^person:/i.test(dataContentAndReferencesTest4));
  (resolveDataContentAndReferencesValue2 = (
    dataContentAndReferencesValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataContentAndReferencesTest2(dataContentAndReferencesValue2) ||
    resolveDataContentAndReferencesTest3(dataContentAndReferencesValue2) ||
    resolveDataContentAndReferencesTest4(dataContentAndReferencesValue2));
  dataContentAndReferencesDescribeSchema2.refine(
    (callback?: Dynamic, ..._extraArguments: unknown[]) =>
      !resolveDataContentAndReferencesValue2(callback),
    `the user_01…, bare-UUID, and person:… bare-token namespaces are reserved (directory-minted and user-container identities)`,
  );
  (dataContentAndReferencesDescribeSchema3 = lazyZod
    .enum(dataEnumsAndValidationProjectFileNodeRunValues)
    .describe(`The v3 nouns. Vocabulary + rationale: OBJECT_TYPES in enums.ts.`));
  (dataContentAndReferencesDescribeSchema4 = lazyZod
    .enum(DataEnumsAndValidationFilter)
    .describe(
      `The v3 nouns admissible inside a stored value. Facets excluded — see STORED_OBJECT_TYPES.`,
    ));
  (dataContentAndReferencesProjectSuiteValues = [`project`, `suite`]);
  (dataContentAndReferencesKindSchema2 = lazyZod
    .strictObject({
      kind: lazyZod
        .enum(dataContentAndReferencesProjectSuiteValues)
        .describe(
          `Which container noun this is — explicit discriminant, never inferred from key presence.`,
        ),
      id: dataContentAndReferencesDescribeSchema.describe(
        `The container's minted id — ONE field whatever the kind ('always key on id', ruled).`,
      ),
      version: dataContentAndReferencesDescribeSchema
        .optional()
        .describe(
          `Content-plane partition (@<vid> at the boundary). Absent ONLY for utterances — the one planar object (ruled Jul 10: 'anything besides utterances key the versions'); runs and rows carry their line. Absent otherwise = the DEFAULT line (NULL spelling, page 16 row 12).`,
        ),
    })
    .describe(
      `The partition holding the object — {kind, id, version?}. Struct in code; project/<pid>[@<vid>] / suite/<sid>[@<vid>] only at the boundary (formatContainer — the string grammar is UNCHANGED by the struct reshape).`,
    ));
  (dataContentAndReferencesFragSchema = lazyZod
    .object({
      object: dataContentAndReferencesDescribeSchema3,
      id: dataContentAndReferencesDescribeSchema,
      frag: lazyZod
        .string()
        .optional()
        .describe(
          `Sub-object fragment (#ln-3f at the boundary) — addresses INTO the value; memory keys never include it.`,
        ),
    })
    .describe(
      `The object within the container. Struct in code; <object>/<id>[#frag] only at the boundary.`,
    ));
  dataContentAndReferencesFragSchema
    .extend({
      object: dataContentAndReferencesDescribeSchema3
        .optional()
        .describe(
          `The claimed noun — OPTIONAL: derived from birth testimony when absent; cross-checked against it when present (object-type-mismatch on disagreement).`,
        ),
    })
    .describe(
      `The WIRE spelling of a ref: the id, with an optional noun claim (id/frag are zRef's own fields BY CONSTRUCTION — one spelling, no drift). The room resolves it into a full Ref (zRef) before anything is recorded.`,
    );
  lazyZod
    .object({
      container: dataContentAndReferencesKindSchema2.optional(),
      ref: dataContentAndReferencesFragSchema,
    })
    .describe(
      `Where an op lands: container × ref, separate fields (container ABSENT for top-level objects). In code ALWAYS this object; stringify with formatAddress only for storage/URLs.`,
    );
  lazyZod
    .templateLiteral([
      dataContentAndReferencesDescribeSchema3,
      `/`,
      lazyZod.string(),
    ])
    .describe(
      `A ref as a map key: <object>/<id> — produced only by refKey(); parse back with parseRef().`,
    );
  (dataContentAndReferencesPattern3 = /^[A-Za-z0-9_-]{1,64}$/);
  (dataContentAndReferencesDescribeSchema5 = lazyZod
    .object({
      object: dataContentAndReferencesDescribeSchema4,
      id: dataContentAndReferencesDescribeSchema,
    })
    .describe(`What contains this object: the kind, and the minted id.`));
  (dataContentAndReferencesDescribeSchema6 = lazyZod
    .enum(DataEnumsAndValidationFilter2)
    .describe(
      `The nouns a parent edge may name: stored nouns minus the containers (an object lives IN a project or suite — its birth testimony — and is never parented TO one).`,
    ));
  lazyZod
    .object({
      object: dataContentAndReferencesDescribeSchema6,
      id: dataContentAndReferencesDescribeSchema,
    })
    .describe(
      `What contains this object: the kind (never a container), and the minted id.`,
    );
  (dataContentAndReferencesPattern4 = /^[A-Za-z0-9-]{1,64}$/);
  (DataContentAndReferencesState4 = dataContentAndReferencesPattern4);
  (resolveDataContentAndReferencesTest5 = (
    dataContentAndReferencesTest5?: Dynamic,
    ..._extraArguments: unknown[]
  ) => dataContentAndReferencesPattern4.test(dataContentAndReferencesTest5));
  (dataContentAndReferencesSet = new (Set as Dynamic)([
    `run`,
    `file`,
    `routine`,
  ]));
  (resolveDataContentAndReferencesIncludes = (
    dataContentAndReferencesIncludes?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataContentAndReferencesProjectSuiteValues.includes(
      dataContentAndReferencesIncludes,
    ));
  (dataContentAndReferencesSet2 = new (Set as Dynamic)([`project`]));
  (dataContentAndReferencesPattern5 = /^[a-z0-9][a-z0-9-]{6,61}[a-z0-9]$/);
  (resolveDataContentAndReferencesSplit = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof items != `string` || items.length === 0 || items.length > 253)
      return null;
    let normalizedItemsParts = items.toLowerCase().split(`.`);
    if (normalizedItemsParts.length < 3) return null;
    let normalizedItemsPartItem = normalizedItemsParts[0];
    return dataContentAndReferencesPattern5.test(normalizedItemsPartItem)
      ? resolveDataContentAndReferencesReplace5(
          `project/${normalizedItemsPartItem}`,
        )
      : null;
  });
  (resolveDataContentAndReferencesReplace5 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof items == `string` && items.length <= 256
      ? filterDataContentAndReferencesKind(`/${items.replace(/^\/+/, ``)}`)
      : null);
  (dataContentAndReferencesSet3 = new (Set as Dynamic)([`member`]));
  (DataContentAndReferencesPublic = `public`);
  initializeCommonJS(
    (callback?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      var callback2: Dynamic =
        (callback && callback.__spreadArray) ||
        function (
          callback3?: Dynamic,
          items?: Dynamic,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic {
          if (context || arguments.length === 2)
            for (
              var index = 0,
                itemsCount: Dynamic = items.length,
                localResult: Dynamic;
              index < itemsCount;
              index++
            )
              if (localResult || !(index in items)) {
                localResult ||= Array.prototype.slice.call(items, 0, index);
                localResult[index] = items[index];
              }
          return callback3.concat(
            localResult || Array.prototype.slice.call(items),
          );
        };
      Object.defineProperty(callback, "__esModule", {
        value: true,
      });
      callback.minLength =
        callback.maxLength =
        callback.poolSize =
        callback.humanId =
        callback.adverbs =
        callback.verbs =
        callback.nouns =
        callback.adjectives =
          undefined;
      callback.adjectives =
        `afraid.all.beige.better.big.blue.bold.brave.breezy.bright.brown.bumpy.busy.calm.chatty.chilly.chubby.clean.clear.clever.cold.common.cool.cozy.crisp.cuddly.curly.curvy.cute.cyan.dark.deep.dirty.dry.dull.eager.early.easy.eight.eighty.eleven.empty.every.fair.famous.fancy.fast.few.fiery.fifty.fine.five.flat.floppy.fluffy.forty.four.frank.free.fresh.fruity.full.funky.funny.fuzzy.gentle.giant.gold.good.goofy.great.green.grumpy.happy.heavy.hip.honest.hot.huge.humble.hungry.icy.itchy.jolly.khaki.kind.large.late.lazy.legal.lemon.light.little.long.loose.loud.lovely.lucky.major.many.metal.mighty.modern.moody.neat.new.nice.nine.ninety.odd.old.olive.open.orange.perky.petite.pink.plain.plenty.polite.pretty.proud.public.puny.purple.quick.quiet.rare.ready.real.red.rich.ripe.salty.seven.shaggy.shaky.sharp.shiny.short.shy.silent.silly.silver.six.sixty.slick.slimy.slow.small.smart.smooth.social.soft.solid.some.sour.sparkly.spicy.spotty.stale.strict.strong.sunny.sweet.swift.tall.tame.tangy.tasty.ten.tender.thick.thin.thirty.three.tidy.tiny.tired.tough.tricky.true.twelve.twenty.two.upset.vast.violet.wacky.warm.wet.whole.wicked.wide.wild.wise.witty.yellow.young.yummy`.split(
          `.`,
        );
      callback.nouns =
        `actors.ads.adults.aliens.animals.ants.apes.apples.areas.baboons.badgers.bags.balloons.bananas.banks.bars.baths.bats.beans.bears.beds.beers.bees.berries.bikes.birds.boats.bobcats.books.bottles.boxes.breads.brooms.buckets.bugs.buses.bushes.buttons.camels.cameras.candies.candles.canyons.carpets.carrots.cars.cases.cats.chairs.chefs.chicken.cities.clocks.cloths.clouds.clowns.clubs.coats.cobras.coins.colts.comics.cooks.corners.cougars.cows.crabs.crews.cups.cycles.dancers.days.deer.deserts.dingos.dodos.dogs.dolls.donkeys.donuts.doodles.doors.dots.dragons.drinks.dryers.ducks.eagles.ears.eels.eggs.emus.ends.experts.eyes.facts.falcons.fans.feet.files.flies.flowers.forks.foxes.friends.frogs.games.garlics.geckos.geese.ghosts.gifts.glasses.goats.grapes.groups.guests.hairs.hands.hats.heads.hoops.hornets.horses.hotels.hounds.houses.humans.icons.ideas.impalas.insects.islands.items.jars.jeans.jobs.jokes.keys.kids.kings.kiwis.knives.lamps.lands.laws.lemons.lies.lights.lilies.lines.lions.lizards.llamas.loops.mails.mammals.mangos.maps.masks.meals.melons.memes.meteors.mice.mirrors.moles.moments.monkeys.months.moons.moose.mugs.nails.needles.news.nights.numbers.olives.onions.oranges.otters.owls.pandas.pans.pants.papayas.papers.parents.parks.parrots.parts.paths.paws.peaches.pears.peas.pens.pets.phones.pianos.pigs.pillows.places.planes.planets.plants.plums.poems.poets.points.pots.pugs.pumas.queens.rabbits.radios.rats.ravens.readers.regions.results.rice.rings.rivers.rockets.rocks.rooms.roses.rules.sails.schools.seals.seas.sheep.shirts.shoes.showers.shrimps.sides.signs.singers.sites.sloths.snails.snakes.socks.spiders.spies.spoons.squids.stamps.stars.states.steaks.streets.suits.suns.swans.symbols.tables.taxes.taxis.teams.teeth.terms.things.ties.tigers.times.tips.tires.toes.tools.towns.toys.trains.trams.trees.turkeys.turtles.vans.views.walls.wasps.waves.ways.webs.weeks.windows.wings.wolves.wombats.words.worlds.worms.yaks.years.zebras.zoos`.split(
          `.`,
        );
      callback.verbs =
        `accept.act.add.admire.agree.allow.appear.argue.arrive.ask.attack.attend.bake.bathe.battle.beam.beg.begin.behave.bet.boil.bow.brake.brush.build.burn.buy.call.camp.care.carry.change.cheat.check.cheer.chew.clap.clean.cough.count.cover.crash.create.cross.cry.cut.dance.decide.deny.design.dig.divide.do.double.doubt.draw.dream.dress.drive.drop.drum.eat.end.enjoy.enter.exist.fail.fall.feel.fetch.film.find.fix.flash.float.flow.fly.fold.follow.fry.give.glow.go.grab.greet.grin.grow.guess.hammer.hang.happen.heal.hear.help.hide.hope.hug.hunt.invent.invite.itch.jam.jog.join.joke.judge.juggle.jump.kick.kiss.kneel.knock.know.laugh.lay.lead.learn.leave.lick.lie.like.listen.live.look.lose.love.make.march.marry.mate.matter.melt.mix.move.nail.notice.obey.occur.open.own.pay.peel.pick.play.poke.post.press.prove.pull.pump.punch.push.raise.read.refuse.relate.relax.remain.repair.repeat.reply.report.rescue.rest.retire.return.rhyme.ring.roll.rule.run.rush.say.scream.search.see.sell.send.serve.shake.share.shave.shine.shop.shout.show.sin.sing.sink.sip.sit.sleep.slide.smash.smell.smile.smoke.sneeze.sniff.sort.speak.spend.stand.stare.start.stay.stick.stop.strive.study.swim.switch.take.talk.tan.tap.taste.teach.tease.tell.thank.think.throw.tickle.tie.trade.train.travel.try.turn.type.unite.vanish.visit.wait.walk.warn.wash.watch.wave.wear.win.wink.wish.wonder.work.worry.write.yawn.yell`.split(
          `.`,
        );
      callback.adverbs = [
        `bravely`,
        `brightly`,
        `busily`,
        `daily`,
        `freely`,
        `hungrily`,
        `joyously`,
        `knowingly`,
        `lazily`,
        `noisily`,
        `oddly`,
        `politely`,
        `quickly`,
        `quietly`,
        `rapidly`,
        `safely`,
        `sleepily`,
        `slowly`,
        `truly`,
        `yearly`,
      ];
      function localHandler(
        items?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return items[Math.floor(Math.random() * items.length)];
      }
      function localHandler2(
        callback3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return callback3.reduce(function (
          items?: Dynamic,
          items2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic {
          return items.length > items2.length ? items : items2;
        });
      }
      function localHandler3(
        callback3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return callback3.reduce(function (
          items?: Dynamic,
          items2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic {
          return items.length < items2.length ? items : items2;
        });
      }
      function localHandler4(
        separator?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        if (separator === undefined) {
          separator = {};
        }
        if (typeof separator == `string`) {
          separator = {
            separator: separator,
          };
        }
        if (typeof separator == `boolean`) {
          separator = {
            capitalize: separator,
          };
        }
        var separator2: Dynamic = separator.separator;
        var label: Dynamic = separator2 === undefined ? `` : separator2;
        var capitalize: Dynamic = separator.capitalize;
        var enabled: Dynamic = capitalize === undefined ? true : capitalize;
        var adjectiveCount: Dynamic = separator.adjectiveCount;
        var count: Dynamic = adjectiveCount === undefined ? 1 : adjectiveCount;
        var addAdverb: Dynamic = separator.addAdverb;
        var enabled2: Dynamic = addAdverb === undefined ? false : addAdverb;
        var callback3: Dynamic = callback2(
          callback2(
            callback2(
              [],
              callback2([], Array(count), true).map(function (
                rolldownRImport2?: unknown,
                ..._extraArguments: unknown[]
              ): Dynamic {
                return localHandler(callback.adjectives);
              }),
              true,
            ),
            [localHandler(callback.nouns), localHandler(callback.verbs)],
            false,
          ),
          enabled2 ? [localHandler(callback.adverbs)] : [],
          true,
        );
        if (enabled) {
          callback3 = callback3.map(function (
            callback4?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic {
            return callback4.charAt(0).toUpperCase() + callback4.substr(1);
          });
        }
        return callback3.join(label);
      }
      callback.humanId = localHandler4;
      function localHandler5(callback3?: Dynamic, ..._extraArguments: unknown[]) {
        if (callback3 === undefined) {
          callback3 = {};
        }
        var adjectiveCount: Dynamic = callback3.adjectiveCount;
        var count: Dynamic = adjectiveCount === undefined ? 1 : adjectiveCount;
        var addAdverb: Dynamic = callback3.addAdverb;
        var enabled: Dynamic = addAdverb === undefined ? false : addAdverb;
        return (
          callback.adjectives.length *
          count *
          callback.nouns.length *
          callback.verbs.length *
          (enabled ? callback.adverbs.length : 1)
        );
      }
      callback.poolSize = localHandler5;
      function localHandler6(
        callback3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        if (callback3 === undefined) {
          callback3 = {};
        }
        var adjectiveCount: Dynamic = callback3.adjectiveCount;
        var count: Dynamic = adjectiveCount === undefined ? 1 : adjectiveCount;
        var addAdverb: Dynamic = callback3.addAdverb;
        var enabled: Dynamic = addAdverb === undefined ? false : addAdverb;
        var separator: Dynamic = callback3.separator;
        var label: Dynamic = separator === undefined ? `` : separator;
        return (
          localHandler2(callback.adjectives).length * count +
          count * label.length +
          localHandler2(callback.nouns).length +
          label.length +
          localHandler2(callback.verbs).length +
          (enabled ? localHandler2(callback.adverbs).length + label.length : 0)
        );
      }
      callback.maxLength = localHandler6;
      function localHandler7(
        callback3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        if (callback3 === undefined) {
          callback3 = {};
        }
        var adjectiveCount: Dynamic = callback3.adjectiveCount;
        var count: Dynamic = adjectiveCount === undefined ? 1 : adjectiveCount;
        var addAdverb: Dynamic = callback3.addAdverb;
        var enabled: Dynamic = addAdverb === undefined ? false : addAdverb;
        var separator: Dynamic = callback3.separator;
        var label: Dynamic = separator === undefined ? `` : separator;
        return (
          localHandler3(callback.adjectives).length * count +
          count * label.length +
          localHandler3(callback.nouns).length +
          label.length +
          localHandler3(callback.verbs).length +
          (enabled ? localHandler3(callback.adverbs).length + label.length : 0)
        );
      }
      callback.minLength = localHandler7;
      callback.default = localHandler4;
    },
  )();
}

export {
  DataContentAndReferencesHasHeader,
  collectDataContentAndReferencesWEEKLY,
  dataContentAndReferencesDescribeSchema,
  dataContentAndReferencesDescribeSchema2,
  dataContentAndReferencesDescribeSchema3,
  dataContentAndReferencesDescribeSchema4,
  dataContentAndReferencesDescribeSchema5,
  dataContentAndReferencesFragSchema,
  dataContentAndReferencesKindSchema,
  dataContentAndReferencesProjectSuiteValues,
  dataContentAndReferencesSet,
  filterDataContentAndReferencesFilter,
  isDataContentAndReferencesVersion,
  resolveDataContentAndReferencesBONGOCONTAINER,
  resolveDataContentAndReferencesChildId,
  resolveDataContentAndReferencesError2,
  resolveDataContentAndReferencesExact2,
  resolveDataContentAndReferencesIndexOf,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind2,
  resolveDataContentAndReferencesKind3,
  resolveDataContentAndReferencesPrefix,
  resolveDataContentAndReferencesReason,
  resolveDataContentAndReferencesReplace,
  resolveDataContentAndReferencesReplace2,
  resolveDataContentAndReferencesReplace4,
  resolveDataContentAndReferencesRule,
  resolveDataContentAndReferencesStart,
  resolveDataContentAndReferencesTest5,
  resolveDataContentAndReferencesTest6,
  resolveDataContentAndReferencesToUpperCase,
  resolveDataContentAndReferencesValue3,
  resolveDataContentAndReferencesValue4,
  resolveDataContentAndReferencesValue5,
};

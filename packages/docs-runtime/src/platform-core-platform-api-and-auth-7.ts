/** BaoCut: platform api and auth from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  _iterativeCount,
  _linkedSet,
  _resolverCallLog,
  _slowPaths,
} from "./platform-core-platform-api-and-auth-6";

var _recalcLinked: (RecalcLinked?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var OpCutoverError: Dynamic;

var platformApiAndAuthSet21: Dynamic;

var platformApiAndAuthWeakMap: Dynamic;

var resolvePlatformApiAndAuthExec2: Dynamic;

function buildOpCtx(
  opCtx?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let getWorksheetsProperties: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => options.getWorksheetsProperties?.() ?? [];
  let buildOpCtxHandler: Dynamic = (
    opCtx2?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (opCtx2 != null)
      try {
        return typeof opCtx2 == `string` ? JSON.parse(opCtx2) : opCtx2;
      } catch {
        return;
      }
  };
  return {
    sheetIdOf: (opCtx2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      getWorksheetsProperties()[opCtx2]?.sheet_id,
    sheetIdByName: (opCtx2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      getWorksheetsProperties().find(
        (worksheetsProperty?: Dynamic, ..._extraArguments: unknown[]) =>
          worksheetsProperty.name === opCtx2,
      )?.sheet_id,
    parseFormula: options.parseFormula
      ? (
          opCtx2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          try {
            return JSON.parse(options.parseFormula(opCtx2, options2));
          } catch {
            return null;
          }
        }
      : undefined,
    usedRect: (opCtx2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let sheetDimension: Dynamic = options.getSheetDimension?.(opCtx2);
      return sheetDimension && sheetDimension.length >= 4
        ? {
            r1: sheetDimension[0],
            c1: sheetDimension[1],
            r2: sheetDimension[2],
            c2: sheetDimension[3],
          }
        : undefined;
    },
    selectedRect: (..._extraArguments: unknown[]): Dynamic => {
      let selectedView: Dynamic = options.getSelectedView?.();
      if (!selectedView) return;
      let [range, setRange, range2, range3]: Dynamic = selectedView.range;
      return {
        sheetIndex: selectedView.sheet,
        rect: {
          r1: range,
          c1: setRange,
          r2: range2,
          c2: range3,
        },
      };
    },
    cellContent: options.getCellContent
      ? (
          opCtx2?: Dynamic,
          options2?: Dynamic,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ) => {
          try {
            let cellContent: Dynamic = options.getCellContent(
              opCtx2,
              options2,
              context,
            );
            return typeof cellContent == `string` ? cellContent : undefined;
          } catch {
            return;
          }
        }
      : undefined,
    dvSqref: (
      opCtx2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let sqref: Dynamic = buildOpCtxHandler(
        options.getDataValidations?.(opCtx2),
      )?.[options2]?.sqref;
      return sqref
        ? resolvePlatformApiAndAuthExec2(sqref.split(` `)[0])
        : undefined;
    },
    cfSqref: (
      opCtx2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let sqref: Dynamic = buildOpCtxHandler(
        options.getConditionalFormats?.(opCtx2),
      )?.[options2]?.sqref;
      return sqref
        ? resolvePlatformApiAndAuthExec2(sqref.split(` `)[0])
        : undefined;
    },
    tableSheet: (opCtx2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let sheetName: Dynamic = (buildOpCtxHandler(options.getTablesJson?.()) ??
        {})[opCtx2]?.sheet_name;
      return sheetName
        ? getWorksheetsProperties().findIndex(
            (worksheetsProperty?: Dynamic, ..._extraArguments: unknown[]) =>
              worksheetsProperty.name === sheetName,
          )
        : undefined;
    },
    pivotSheet: (opCtx2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let sheetName: Dynamic = buildOpCtxHandler(
        options.getPivotTablesJson?.(),
      )?.find(
        (opCtx3?: Dynamic, ..._extraArguments: unknown[]) =>
          opCtx3.name === opCtx2,
      )?.sheet_name;
      return sheetName
        ? getWorksheetsProperties().findIndex(
            (worksheetsProperty?: Dynamic, ..._extraArguments: unknown[]) =>
              worksheetsProperty.name === sheetName,
          )
        : undefined;
    },
    threadCommentCell: (
      opCtx2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let opCtxHandler: Dynamic = buildOpCtxHandler(
        options.getThreadedComments?.(opCtx2),
      )?.find(
        (opCtx3?: Dynamic, ..._extraArguments: unknown[]) =>
          opCtx3.id === options2,
      );
      return opCtxHandler
        ? resolvePlatformApiAndAuthExec2(opCtxHandler.cell_ref)
        : undefined;
    },
    customXmlIndex: (
      opCtx2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let opCtxHandlerIndex: Dynamic = buildOpCtxHandler(
        options.getCustomXmlParts?.(),
      )?.findIndex(
        (opCtx3?: Dynamic, ..._extraArguments: unknown[]) =>
          opCtx3.id === opCtx2,
      );
      return opCtxHandlerIndex != null && opCtxHandlerIndex >= 0
        ? opCtxHandlerIndex + 1
        : undefined;
    },
    drawingSheet: (
      opCtx2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let opCtxHandler: Dynamic = buildOpCtxHandler(
        options.getDrawingsJson?.(),
      );
      let opCtxHandlerItem: Dynamic = opCtxHandler?.[opCtx2];
      if (!opCtxHandlerItem || opCtxHandlerItem.sheet == null) return;
      let coll =
        opCtxHandlerItem.kind === `chart`
          ? `ChartObjects`
          : opCtxHandlerItem.kind === `image`
            ? `Pictures`
            : `Shapes`;
      let idx: Dynamic = opCtxHandler
        .slice(0, opCtx2 + 1)
        .filter(
          (entry?: Dynamic, ..._extraArguments: unknown[]) =>
            entry.sheet === opCtxHandlerItem.sheet &&
            entry.kind === opCtxHandlerItem.kind,
        ).length;
      return {
        sheetIndex: opCtxHandlerItem.sheet,
        coll: coll,
        idx: idx,
      };
    },
    chartSheet: (opCtx2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let nativeCharts: Dynamic = opCtx.getNativeCharts?.();
      let nativeChartItem: Dynamic = nativeCharts?.[opCtx2];
      if (!nativeChartItem || nativeChartItem.sheet == null) return;
      let idx: Dynamic = nativeCharts
        .slice(0, opCtx2 + 1)
        .filter(
          (nativeChartsSlice?: Dynamic, ..._extraArguments: unknown[]) =>
            nativeChartsSlice.sheet === nativeChartItem.sheet,
        ).length;
      return {
        sheetIndex: nativeChartItem.sheet,
        idx: idx,
      };
    },
  };
}

function resolvePlatformApiAndAuthErrors(
  platformApiAndAuthErrors?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let optionItem: Dynamic = options[0];
  switch (platformApiAndAuthErrors) {
    case `newSheet`:
    case `duplicateSheet`:
      return typeof optionItem == `number`
        ? context.rawModel
            .getWorksheetsProperties?.()
            ?.findIndex(
              (
                platformApiAndAuthErrors2?: Dynamic,
                ..._extraArguments: unknown[]
              ) => platformApiAndAuthErrors2.sheet_id === optionItem,
            )
        : undefined;
    case `addTable`:
    case `createPivotTable`:
    case `addThreadedComment`:
    case `addCustomXmlPart`:
      return optionItem;
    case `addDxf`:
    case `addSparklineGroup`:
    case `addConditionalFormat`:
      return typeof optionItem == `number` ? optionItem : undefined;
    case `cleanExcessFormatting`:
      return typeof optionItem == `number` ? optionItem : 0;
    case `agentRunCommand`: {
      let affectedCount: Dynamic = 0;
      for (let resolvePlatformApiAndAuthErrorsResult of (dependencies ??
        []) as Dynamic)
        for (let resolvePlatformApiAndAuthErrorsResult2 of (resolvePlatformApiAndAuthErrorsResult.path ??
          []) as Dynamic) {
          let range: Dynamic = resolvePlatformApiAndAuthErrorsResult2?.range;
          if (range) {
            affectedCount +=
              (range.r2 - range.r1 + 1) * (range.c2 - range.c1 + 1);
          }
        }
      return JSON.stringify({
        errors: [],
        affected: [],
        affected_count: affectedCount,
        truncated: false,
        warnings: [],
      });
    }
    default:
      return;
  }
}

var platformApiAndAuthValue50000: number;

var platformApiAndAuthSet22: Dynamic;

var resolvePlatformApiAndAuthValue44: Dynamic;

var resolvePlatformApiAndAuthWidth: Dynamic;

var resolvePlatformApiAndAuthLastIndexOf2: Dynamic;

var resolvePlatformApiAndAuthRow: Dynamic;

var DataModelSchemasSortRange: Dynamic;

var DataModelSchemasAgentApplyEdits: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformApiAndAuth7Step1(): void {
  (_recalcLinked = (
    RecalcLinked?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let LinkedSet: Dynamic = _linkedSet(RecalcLinked);
    if (LinkedSet.size <= 1) return;
    if (context == null) {
      let count = 0;
      for (let RecalcLinkedResult of LinkedSet as Dynamic) {
        let calcPr: Dynamic = options(RecalcLinkedResult)?.getCalcPr();
        if (calcPr?.iterate) {
          count = Math.max(count, calcPr.iterateCount);
        }
        count = Math.max(count, _iterativeCount.get(RecalcLinkedResult) ?? 0);
      }
      context = count > 0 ? count : Math.min(8, Math.max(2, LinkedSet.size));
    }
    let label = ``;
    for (let index = 0; index < context; index++) {
      _resolverCallLog.clear();
      for (let RecalcLinkedResult of LinkedSet as Dynamic)
        if (!_slowPaths.has(RecalcLinkedResult)) {
          options(RecalcLinkedResult)?.recalc();
        }
      let stringify = JSON.stringify([..._resolverCallLog.entries()].toSorted());
      if (stringify === label) break;
      label = stringify;
    }
  });
  (OpCutoverError = class extends Error {
    [key: string]: Dynamic;
    fn: Dynamic;
    args: Dynamic;
    stage: Dynamic;
    err: Dynamic;
    constructor(
      opCutoverError?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        `[cutover] ${context === `map` ? `no Op mapping` : `omApply rejected: ${JSON.stringify(dependencies)}`} for ${opCutoverError}(${options.slice(0, 4).map(String).join(`, `)})`,
      );
      this.fn = opCutoverError;
      this.args = options;
      this.stage = context;
      this.err = dependencies;
    }
  });
  (platformApiAndAuthSet21 = new (Set as Dynamic)());
  (platformApiAndAuthWeakMap = new (WeakMap as Dynamic)());
  (resolvePlatformApiAndAuthExec2 = (
    platformApiAndAuthExec2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let match = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/i.exec(
      platformApiAndAuthExec2.replace(/\$/g, ``).trim(),
    );
    if (!match) return;
    let charCodeAt: Dynamic = (
      platformApiAndAuthExec22?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let count = 0;
      for (let resolvePlatformApiAndAuthExec2Result of platformApiAndAuthExec22.toUpperCase() as Dynamic)
        count =
          count * 26 + (resolvePlatformApiAndAuthExec2Result.charCodeAt(0) - 64);
      return count;
    };
    return {
      r1: +match[2],
      r2: match[4] ? +match[4] : +match[2],
      c1: charCodeAt(match[1]),
      c2: charCodeAt(match[3] ?? match[1]),
    };
  });
  (platformApiAndAuthValue50000 = 5e4);
  (platformApiAndAuthSet22 = new (Set as Dynamic)([
    `data.sort`,
    `data.removeDuplicates`,
    `data.flashFill`,
    `home.merge`,
    `home.clear`,
    `edit.fillDown`,
    `edit.fillRight`,
    `edit.pasteSpecial`,
    `formulas.applyNames`,
  ]));
  (resolvePlatformApiAndAuthValue44 = (
    platformApiAndAuthValue44?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (platformApiAndAuthValue44.r2 - platformApiAndAuthValue44.r1 + 1) *
    (platformApiAndAuthValue44.c2 - platformApiAndAuthValue44.c1 + 1));
  (resolvePlatformApiAndAuthWidth = (
    platformApiAndAuthWidth?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (!platformApiAndAuthWidth || typeof platformApiAndAuthWidth != `object`)
      return;
    let {
      width: platformApiAndAuthWidth2,
      height: platformApiAndAuthWidth3,
    }: Dynamic = platformApiAndAuthWidth;
    if (
      !(
        typeof platformApiAndAuthWidth2 != `number` ||
        typeof platformApiAndAuthWidth3 != `number`
      )
    )
      return (
        Math.max(1, platformApiAndAuthWidth2) *
        Math.max(1, platformApiAndAuthWidth3)
      );
  });
  (resolvePlatformApiAndAuthLastIndexOf2 = (
    platformApiAndAuthLastIndex?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof platformApiAndAuthLastIndex != `string`) return;
    let lastIndexOf = platformApiAndAuthLastIndex.lastIndexOf(`!`);
    let platformApiAndAuthExec2: Dynamic = resolvePlatformApiAndAuthExec2(
      lastIndexOf >= 0
        ? platformApiAndAuthLastIndex.slice(lastIndexOf + 1)
        : platformApiAndAuthLastIndex,
    );
    return platformApiAndAuthExec2
      ? resolvePlatformApiAndAuthValue44(platformApiAndAuthExec2)
      : undefined;
  });
  (resolvePlatformApiAndAuthRow = (
    platformApiAndAuthRow?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let platformApiAndAuthRowItem: Dynamic = platformApiAndAuthRow[0];
    let platformApiAndAuthRowItem2: Dynamic = platformApiAndAuthRow[1];
    if (
      !platformApiAndAuthRowItem ||
      typeof platformApiAndAuthRowItem != `object` ||
      typeof platformApiAndAuthRowItem2 != `number`
    )
      return;
    let {
      row: platformApiAndAuthRowItem3,
      column: platformApiAndAuthRowItem4,
      width: platformApiAndAuthRowItem5,
      height: platformApiAndAuthRowItem6,
    }: Dynamic = platformApiAndAuthRowItem;
    if (
      [
        platformApiAndAuthRowItem3,
        platformApiAndAuthRowItem4,
        platformApiAndAuthRowItem5,
        platformApiAndAuthRowItem6,
      ].some(
        (item?: unknown, ..._extraArguments: unknown[]) =>
          typeof item != `number`,
      )
    )
      return;
    let [items, setItems, items2]: Dynamic =
      options === `row`
        ? [
            platformApiAndAuthRowItem3,
            platformApiAndAuthRowItem6,
            Math.max(1, platformApiAndAuthRowItem5),
          ]
        : [
            platformApiAndAuthRowItem4,
            platformApiAndAuthRowItem5,
            Math.max(1, platformApiAndAuthRowItem6),
          ];
    return (
      (Math.max(items + setItems - 1, platformApiAndAuthRowItem2) -
        Math.min(items, platformApiAndAuthRowItem2) +
        1) *
      items2
    );
  });
  (DataModelSchemasSortRange = {
    sortRange: (
      dataModelSchemasSortRange?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => resolvePlatformApiAndAuthWidth(dataModelSchemasSortRange[0]),
    textToColumns: (
      dataModelSchemasSortRange?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => resolvePlatformApiAndAuthWidth(dataModelSchemasSortRange[0]),
    autoFillRows: (
      dataModelSchemasSortRange?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => resolvePlatformApiAndAuthRow(dataModelSchemasSortRange, `row`),
    autoFillColumns: (
      dataModelSchemasSortRange?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthRow(dataModelSchemasSortRange, `column`),
    flashFill: (
      dataModelSchemasSortRange?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let [items, setItems]: Dynamic = [
        dataModelSchemasSortRange[2],
        dataModelSchemasSortRange[3],
      ];
      return typeof items == `number` && typeof setItems == `number`
        ? setItems - items + 1
        : undefined;
    },
    agentApplyEdits: (
      dataModelSchemasSortRange?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (typeof dataModelSchemasSortRange[0] == `string`)
        try {
          let parse: Dynamic = JSON.parse(dataModelSchemasSortRange[0]);
          if (!Array.isArray(parse)) return;
          let count: Dynamic = 0;
          for (let dataModelSchemasSortRangeResult of parse as Dynamic)
            if (Array.isArray(dataModelSchemasSortRangeResult.rows)) {
              let rows: Dynamic = dataModelSchemasSortRangeResult.rows;
              let reduce: Dynamic = rows.reduce(
                (
                  accumulator?: Dynamic,
                  items?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  Math.max(accumulator, Array.isArray(items) ? items.length : 1),
                1,
              );
              count += rows.length * reduce;
            } else if (typeof dataModelSchemasSortRangeResult.ref == `string`)
              count +=
                resolvePlatformApiAndAuthLastIndexOf2(
                  dataModelSchemasSortRangeResult.ref,
                ) ?? 1;
            else if (
              dataModelSchemasSortRangeResult.args &&
              typeof dataModelSchemasSortRangeResult.args == `object`
            ) {
              if (
                typeof dataModelSchemasSortRangeResult.id == `string` &&
                platformApiAndAuthSet22.has(dataModelSchemasSortRangeResult.id)
              )
                for (let dataModelSchemasSortRangeResult2 of Object.values(
                  dataModelSchemasSortRangeResult.args,
                ) as Dynamic)
                  count +=
                    resolvePlatformApiAndAuthLastIndexOf2(
                      dataModelSchemasSortRangeResult2,
                    ) ?? 0;
              else count += 1;
            } else count += 1;
          return count;
        } catch {
          return;
        }
    },
    agentRunCommand: (
      dataModelSchemasSortRange?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let items =
        typeof dataModelSchemasSortRange[0] == `string`
          ? dataModelSchemasSortRange[0]
          : undefined;
      if (
        !(!items || !platformApiAndAuthSet22.has(items)) &&
        typeof dataModelSchemasSortRange[1] == `string`
      )
        try {
          let parse: Dynamic = JSON.parse(dataModelSchemasSortRange[1]);
          let dataModelSchemasSortRangeResult: Dynamic;
          for (let dataModelSchemasSortRangeResult2 of Object.values(
            parse,
          ) as Dynamic) {
            let platformApiAndAuthLastIndexOf2: Dynamic =
              resolvePlatformApiAndAuthLastIndexOf2(
                dataModelSchemasSortRangeResult2,
              );
            if (
              platformApiAndAuthLastIndexOf2 !== undefined &&
              (dataModelSchemasSortRangeResult === undefined ||
                platformApiAndAuthLastIndexOf2 > dataModelSchemasSortRangeResult)
            ) {
              dataModelSchemasSortRangeResult = platformApiAndAuthLastIndexOf2;
            }
          }
          return dataModelSchemasSortRangeResult;
        } catch {
          return;
        }
    },
    analysisToolpak: (
      dataModelSchemasSortRange?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let items: Dynamic = dataModelSchemasSortRange[0];
      if (!items || typeof items != `object`) return;
      let setItems: Dynamic = 0;
      for (let dataModelSchemasSortRangeResult of [
        `input`,
        `input2`,
        `inputX`,
        `inputY`,
        `output`,
        `bins`,
      ] as Dynamic)
        setItems +=
          resolvePlatformApiAndAuthWidth(
            items[dataModelSchemasSortRangeResult],
          ) ?? 0;
      if (typeof items.rows == `number` && typeof items.cols == `number`) {
        setItems += items.rows * items.cols;
      }
      return setItems > 0 ? setItems : undefined;
    },
  });
  (DataModelSchemasAgentApplyEdits = {
    agentApplyEdits: (hint?: Dynamic, ..._extraArguments: unknown[]) =>
      JSON.stringify({
        errors: [
          {
            sheet: ``,
            row: 0,
            col: 0,
            a1: ``,
            code: `#LIMIT!`,
            formula: null,
            hint: hint,
          },
        ],
        affected: [],
        affected_count: 0,
        truncated: false,
        warnings: [hint],
      }),
    agentRunCommand: (hint?: Dynamic, ..._extraArguments: unknown[]) =>
      JSON.stringify({
        errors: [
          {
            sheet: ``,
            row: 0,
            col: 0,
            a1: ``,
            code: `#LIMIT!`,
            formula: null,
            hint: hint,
          },
        ],
        affected: [],
        affected_count: 0,
        truncated: false,
        warnings: [hint],
      }),
    flashFill: (..._extraArguments: unknown[]) => 0,
  });
}

export {
  DataModelSchemasAgentApplyEdits,
  DataModelSchemasSortRange,
  OpCutoverError,
  _recalcLinked,
  buildOpCtx,
  platformApiAndAuthSet21,
  platformApiAndAuthValue50000,
  platformApiAndAuthWeakMap,
  resolvePlatformApiAndAuthErrors,
};

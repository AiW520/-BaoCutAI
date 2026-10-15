/** BaoCut: platform api and auth from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  createLiveModuleNamespace,
} from "../dependencies";
import {
  resolveObservabilityBrowserAndOperationEventsIndexedDB,
} from "../observability/browser-and-operation-events-3";
import {
  PlatformApiAndAuthFontB,
  PlatformApiAndAuthRow,
  PlatformApiAndAuthWhole,
  collectPlatformApiAndAuthDims,
  filterPlatformApiAndAuthEdge,
  finiteNumberValue,
  propertyReference,
  rangeReference,
  resolvePlatformApiAndAuthCols,
  resolvePlatformApiAndAuthExec,
  resolvePlatformApiAndAuthIndex,
  resolvePlatformApiAndAuthPush,
  resolvePlatformApiAndAuthRef,
  resolvePlatformApiAndAuthRows2,
  resolvePlatformApiAndAuthSheet,
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
} from "./api-and-auth-3";
import {
  _wireRevBump,
  ackFlushed,
  announce,
  anyDirtySync,
  createDraftLayer,
  discardUnder,
  dropEntry,
  ensureSettled,
  ensureStarted,
  flushSnapshot,
  forgetEntry,
  getBytesSync,
  hasEntrySync,
  isDeletedSync,
  listEntriesSync,
  listLiveSync,
  markFlushDead,
  moveEntry,
  moveUnder,
  parkConflict,
  persistOpenEdit,
  purgeIfFlushAcked,
  readValidated,
  stashBytes,
  unloadAfterAck,
} from "./api-and-auth-5";

function isPlatformApiAndAuthPath(
  platformApiAndAuthPath?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let finiteNumberValue2: Dynamic = finiteNumberValue(options[0]);
  let sheetIdOf: Dynamic =
    finiteNumberValue2 === undefined
      ? undefined
      : context.sheetIdOf(finiteNumberValue2);
  switch (platformApiAndAuthPath) {
    case `setUserInput`: {
      let [, setItems, items, items2]: Dynamic = [
        sheetIdOf,
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        stringValue(options[3]),
      ];
      if (
        sheetIdOf === undefined ||
        setItems === undefined ||
        items === undefined ||
        items2 === undefined
      )
        return null;
      if (items2.startsWith(`=`) && context.parseFormula) {
        let ast2: Dynamic = context.parseFormula(items2, finiteNumberValue2);
        if (ast2 !== null)
          return [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthValue25(setItems, items),
              ],
              set: `Formula`,
              v: {
                ast: ast2,
              },
            },
          ];
      }
      return [
        {
          path: [
            sheetReference(sheetIdOf),
            resolvePlatformApiAndAuthValue25(setItems, items),
          ],
          set: `Value`,
          v: items2,
        },
      ];
    }
    case `setCellValue`: {
      let [, setItems, items, items2]: Dynamic = [
        sheetIdOf,
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        stringValue(options[3]),
      ];
      return sheetIdOf === undefined ||
        setItems === undefined ||
        items === undefined ||
        items2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthValue25(setItems, items),
              ],
              set: `Value`,
              v: items2,
            },
          ];
    }
    case `deleteCellContents`: {
      let [items, setItems]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthValue25(items, setItems),
              ],
              call: `ClearContents`,
            },
          ];
    }
    case `setCellRichText`: {
      let [items, setItems]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
      ];
      let optionItem: Dynamic = options[3];
      if (
        sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        !Array.isArray(optionItem)
      )
        return null;
      let mappedOptionItemText: string = optionItem
        .map(
          (optionItem2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            optionItem2.text ?? ``,
        )
        .join(``);
      let items2: Dynamic = [
        {
          path: [
            sheetReference(sheetIdOf),
            resolvePlatformApiAndAuthValue25(items, setItems),
          ],
          set: `Value`,
          v: mappedOptionItemText,
        },
      ];
      let count: number = 0;
      for (let isPlatformApiAndAuthPathResult of optionItem as Dynamic) {
        let itemsCount: number = [
          ...(isPlatformApiAndAuthPathResult.text ?? ``),
        ].length;
        let font: Dynamic = isPlatformApiAndAuthPathResult.font ?? {};
        let items3: Dynamic = [
          sheetReference(sheetIdOf),
          resolvePlatformApiAndAuthValue25(items, setItems),
          {
            chars: [count, itemsCount],
          },
          propertyReference(`Font`),
        ];
        if (font.b !== undefined) {
          items2.push({
            path: [...items3],
            set: `Bold`,
            v: !!font.b,
          });
        }
        if (font.i !== undefined) {
          items2.push({
            path: [...items3],
            set: `Italic`,
            v: !!font.i,
          });
        }
        if (font.u !== undefined) {
          items2.push({
            path: [...items3],
            set: `Underline`,
            v: !!font.u,
          });
        }
        if (font.strike !== undefined) {
          items2.push({
            path: [...items3],
            set: `Strikethrough`,
            v: !!font.strike,
          });
        }
        if (typeof font.sz == `number`) {
          items2.push({
            path: [...items3],
            set: `Size`,
            v: font.sz,
          });
        }
        if (typeof font.name == `string`) {
          items2.push({
            path: [...items3],
            set: `Name`,
            v: font.name,
          });
        }
        if (typeof font.color == `string`) {
          items2.push({
            path: [...items3],
            set: `Color`,
            v: font.color,
          });
        }
        count += itemsCount;
      }
      return items2;
    }
    case `rangeClearContents`:
    case `rangeClearAll`:
    case `rangeClearFormatting`: {
      let [items, setItems, items2, items3]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        finiteNumberValue(options[3]),
        finiteNumberValue(options[4]),
      ];
      if (
        sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
      )
        return null;
      let call: string =
        platformApiAndAuthPath === `rangeClearContents`
          ? `ClearContents`
          : platformApiAndAuthPath === `rangeClearAll`
            ? `Clear`
            : `ClearFormats`;
      return [
        {
          path: [
            sheetReference(sheetIdOf),
            rangeReference({
              r1: items,
              r2: items2 ?? items,
              c1: setItems,
              c2: items3 ?? setItems,
            }),
          ],
          call: call,
        },
      ];
    }
    case `replaceAll`: {
      let [items, setItems]: Dynamic = [
        stringValue(options[1]),
        stringValue(options[2]),
      ];
      if (
        sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
      )
        return null;
      let usedRect: Dynamic = context.usedRect?.(finiteNumberValue2);
      return usedRect
        ? [
            {
              path: [sheetReference(sheetIdOf), rangeReference(usedRect)],
              call: `Replace`,
              args: [items, setItems],
            },
          ]
        : null;
    }
    case `removeDuplicates`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let optionItem: Dynamic = options[1];
      if (!platformApiAndAuthSheet) return null;
      let optionItem2: Dynamic = optionItem
        ? Array.from<Dynamic, Dynamic>(
            optionItem,
            (
              platformApiAndAuthPath2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => platformApiAndAuthPath2,
          )
        : [];
      return [
        {
          path: [
            sheetReference(platformApiAndAuthSheet.sid),
            rangeReference(platformApiAndAuthSheet.rect),
          ],
          call: `RemoveDuplicates`,
          args: [
            {
              array: {
                dims: [[1, optionItem2.length]],
                data: optionItem2,
              },
            },
          ],
        },
      ];
    }
    case `applyNames`: {
      let [items, setItems, items2, items3]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        finiteNumberValue(options[3]),
        finiteNumberValue(options[4]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference({
                  r1: items,
                  r2: items2 ?? items,
                  c1: setItems,
                  c2: items3 ?? setItems,
                }),
              ],
              call: `ApplyNames`,
            },
          ];
    }
    case `sortRange`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let optionItem: Dynamic = options[1];
      if (
        !platformApiAndAuthSheet ||
        !Array.isArray(optionItem) ||
        optionItem.length === 0 ||
        optionItem.length > 3 ||
        optionItem.some(
          (optionItem2?: Dynamic, ..._extraArguments: unknown[]): boolean =>
            typeof optionItem2?.column != `number` ||
            typeof optionItem2.ascending != `boolean` ||
            (optionItem2.sortOn !== undefined &&
              optionItem2.sortOn !== `values`),
        )
      )
        return null;
      let args: Dynamic = [
        optionItem[0].column,
        optionItem[0].ascending ? 1 : 2,
      ];
      if (optionItem[1]) {
        args.push(
          optionItem[1].column,
          {
            missing: true,
          },
          optionItem[1].ascending ? 1 : 2,
        );
      }
      if (optionItem[2]) {
        args.push(optionItem[2].column, optionItem[2].ascending ? 1 : 2);
      }
      return [
        {
          path: [
            sheetReference(platformApiAndAuthSheet.sid),
            rangeReference(platformApiAndAuthSheet.rect),
          ],
          call: `Sort`,
          args: args,
        },
      ];
    }
    case `textToColumns`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let optionItem: Dynamic = options[1];
      if (!platformApiAndAuthSheet || !optionItem) return null;
      let isPlatformApiAndAuthPathResult: Dynamic;
      if (typeof optionItem.delimited?.delimiter == `string`)
        isPlatformApiAndAuthPathResult = optionItem.delimited.delimiter;
      else if (
        Array.isArray(optionItem.fixedWidth?.widths) &&
        optionItem.fixedWidth.widths.every(
          (width?: Dynamic, ..._extraArguments: unknown[]): boolean =>
            typeof width == `number` && Number.isFinite(width),
        )
      ) {
        let widths: Dynamic = optionItem.fixedWidth.widths;
        isPlatformApiAndAuthPathResult = {
          array: {
            dims: [[1, widths.length]],
            data: widths,
          },
        };
      } else return null;
      return [
        {
          path: [
            sheetReference(platformApiAndAuthSheet.sid),
            rangeReference(platformApiAndAuthSheet.rect),
          ],
          call: `TextToColumns`,
          args: [
            {
              missing: true,
            },
            isPlatformApiAndAuthPathResult,
          ],
        },
      ];
    }
    case `flashFill`:
      return null;
    case `agentApplyEdits`:
      return null;
    case `agentRunCommand`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      let stringValue3: Dynamic = stringValue(options[1]);
      if (
        !stringValue2 ||
        stringValue3 === undefined ||
        (stringValue2 !== `edit.fillDown` && stringValue2 !== `edit.fillRight`)
      )
        return null;
      let isPlatformApiAndAuthPathResult: Dynamic;
      try {
        isPlatformApiAndAuthPathResult = JSON.parse(stringValue3);
      } catch {
        return null;
      }
      let stringValue4: Dynamic = stringValue(
        isPlatformApiAndAuthPathResult.range,
      );
      if (!stringValue4) return null;
      let lastIndexOf: Dynamic = stringValue4.lastIndexOf(`!`);
      let replace: Dynamic =
        lastIndexOf >= 0
          ? stringValue4.slice(0, lastIndexOf).replace(/^'(.*)'$/, `$1`)
          : undefined;
      let sheetIdOf2: Dynamic =
        replace === undefined
          ? context.sheetIdOf(0)
          : context.sheetIdByName?.(replace);
      let platformApiAndAuthExec: Dynamic = resolvePlatformApiAndAuthExec(
        lastIndexOf >= 0 ? stringValue4.slice(lastIndexOf + 1) : stringValue4,
      );
      return sheetIdOf2 === undefined || !platformApiAndAuthExec
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf2),
                rangeReference(platformApiAndAuthExec),
              ],
              call: stringValue2 === `edit.fillDown` ? `FillDown` : `FillRight`,
            },
          ];
    }
    case `versionRestore`:
      return null;
    case `cleanExcessFormatting`:
      return sheetIdOf === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              call: `CleanExcessFormatting`,
            },
          ];
    case `analysisToolpak`:
      return null;
    case `pivotDrillDownToSheet`:
      return null;
    case `goalSeek`:
      return null;
    case `solve`:
      return null;
    case `showScenario`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      return sheetIdOf === undefined || !stringValue2
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                propertyReference(`Scenarios`),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `Show`,
            },
          ];
    }
    case `convertTableToRange`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      if (!stringValue2) return null;
      let tableSheet: Dynamic = context.tableSheet?.(stringValue2);
      if (tableSheet === undefined) return null;
      let sheetIdOf2: Dynamic = context.sheetIdOf(tableSheet);
      return sheetIdOf2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `Unlist`,
            },
          ];
    }
    case `resizeTable`:
      return null;
    case `pivotSetFieldFilter`:
      return null;
    case `pivotSetLabelFilter`:
    case `pivotSetValueFilter`:
    case `pivotClearLabelFilter`:
    case `pivotClearValueFilter`:
      return null;
    case `setIterativeEnabled`:
      return null;
    case `updateConditionalFormat`:
      return null;
    case `setShapeZOrder`:
      return null;
    case `createChartLive`:
      return null;
    case `showAllData`:
      return null;
    case `pasteCsvText`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let stringValue2: Dynamic = stringValue(options[1]);
      if (
        !platformApiAndAuthSheet ||
        stringValue2 === undefined ||
        stringValue2.includes(`"`)
      )
        return null;
      let array2: Dynamic = collectPlatformApiAndAuthDims(stringValue2);
      let [items, setItems]: Dynamic = [array2.dims[0][1], array2.dims[1][1]];
      let record2: Dynamic = {
        r1: platformApiAndAuthSheet.rect.r1,
        c1: platformApiAndAuthSheet.rect.c1,
        r2: platformApiAndAuthSheet.rect.r1 + items - 1,
        c2: platformApiAndAuthSheet.rect.c1 + setItems - 1,
      };
      return [
        {
          path: [
            sheetReference(platformApiAndAuthSheet.sid),
            rangeReference(record2),
          ],
          set: `Value`,
          v: {
            array: array2,
          },
        },
      ];
    }
    case `pasteFromClipboard`:
    case `pasteSpecial`: {
      if (platformApiAndAuthPath === `pasteSpecial` && options[4] !== undefined)
        return null;
      let sheetIdOf2: Dynamic = sheetIdOf;
      let optionItem: Dynamic = options[1];
      let selectedRect: Dynamic = context.selectedRect?.();
      if (sheetIdOf2 === undefined || !optionItem || !selectedRect) return null;
      let sheetIdOf3: Dynamic = context.sheetIdOf(selectedRect.sheetIndex);
      if (sheetIdOf3 === undefined) return null;
      let platformApiAndAuthValue20: Dynamic = resolvePlatformApiAndAuthValue20(
        {
          r1: optionItem[0],
          c1: optionItem[1],
          r2: optionItem[2],
          c2: optionItem[3],
        },
      );
      let platformApiAndAuthValue202: Dynamic =
        resolvePlatformApiAndAuthValue20(selectedRect.rect);
      let platformApiAndAuthValue24: Dynamic =
        resolvePlatformApiAndAuthValue24(options[3]) ?? false;
      let [items, setItems]: Dynamic = [
        platformApiAndAuthValue20.r2 - platformApiAndAuthValue20.r1 + 1,
        platformApiAndAuthValue20.c2 - platformApiAndAuthValue20.c1 + 1,
      ];
      let [items2, setItems2]: Dynamic = [
        platformApiAndAuthValue202.r2 - platformApiAndAuthValue202.r1 + 1,
        platformApiAndAuthValue202.c2 - platformApiAndAuthValue202.c1 + 1,
      ];
      let platformApiAndAuthValue203: Dynamic =
        !platformApiAndAuthValue24 &&
        items2 >= items &&
        setItems2 >= setItems &&
        items2 % items === 0 &&
        setItems2 % setItems === 0
          ? platformApiAndAuthValue202
          : {
              r1: platformApiAndAuthValue202.r1,
              c1: platformApiAndAuthValue202.c1,
              r2: platformApiAndAuthValue202.r1 + items - 1,
              c2: platformApiAndAuthValue202.c1 + setItems - 1,
            };
      if (
        !(
          sheetIdOf2 === sheetIdOf3 &&
          platformApiAndAuthValue20.r1 <= platformApiAndAuthValue203.r2 &&
          platformApiAndAuthValue203.r1 <= platformApiAndAuthValue20.r2 &&
          platformApiAndAuthValue20.c1 <= platformApiAndAuthValue203.c2 &&
          platformApiAndAuthValue203.c1 <= platformApiAndAuthValue20.c2
        )
      ) {
        let items6: Dynamic = [
          {
            path: [
              sheetReference(sheetIdOf3),
              rangeReference(platformApiAndAuthValue203),
            ],
            call: `PasteSpecial`,
            args: [
              resolvePlatformApiAndAuthRef(
                sheetIdOf2,
                platformApiAndAuthValue20,
              ),
            ],
          },
        ];
        if (platformApiAndAuthValue24) {
          items6.push({
            path: [
              sheetReference(sheetIdOf2),
              rangeReference(platformApiAndAuthValue20),
            ],
            call: `ClearContents`,
          });
        }
        return items6;
      }
      if (
        resolvePlatformApiAndAuthValue19(platformApiAndAuthValue203) > 1e4 ||
        !context.cellContent ||
        finiteNumberValue2 === undefined
      )
        return null;
      let [items3, setItems3]: Dynamic = [
        platformApiAndAuthValue203.r2 - platformApiAndAuthValue203.r1 + 1,
        platformApiAndAuthValue203.c2 - platformApiAndAuthValue203.c1 + 1,
      ];
      let items4: Dynamic = [];
      for (let index: number = 0; index < items3; index++)
        for (let index2: number = 0; index2 < setItems3; index2++) {
          let cellContent: Dynamic = context.cellContent(
            finiteNumberValue2,
            platformApiAndAuthValue20.r1 + (index % items),
            platformApiAndAuthValue20.c1 + (index2 % setItems),
          );
          if (cellContent === undefined) return null;
          items4.push(cellContent);
        }
      let items5: Dynamic = [
        {
          path: [
            sheetReference(sheetIdOf3),
            rangeReference(platformApiAndAuthValue203),
          ],
          set: `Value`,
          v: {
            array: {
              dims: [
                [1, items3],
                [1, setItems3],
              ],
              data: items4,
            },
          },
        },
      ];
      if (platformApiAndAuthValue24)
        for (let isPlatformApiAndAuthPathResult of resolvePlatformApiAndAuthPush(
          platformApiAndAuthValue20,
          platformApiAndAuthValue203,
        ) as Dynamic)
          items5.push({
            path: [
              sheetReference(sheetIdOf2),
              rangeReference(isPlatformApiAndAuthPathResult),
            ],
            call: `ClearContents`,
          });
      return items5;
    }
    case `onPasteStyles`: {
      let optionItem: Dynamic = options[0];
      let selectedRect: Dynamic = context.selectedRect?.();
      if (!selectedRect || !Array.isArray(optionItem)) return null;
      let sheetIdOf2: Dynamic = context.sheetIdOf(selectedRect.sheetIndex);
      if (
        sheetIdOf2 === undefined ||
        optionItem.reduce(
          (
            accumulator?: Dynamic,
            items2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => accumulator + (items2?.length ?? 0),
          0,
        ) > 1e4
      )
        return null;
      let items: Dynamic = [];
      for (let index: number = 0; index < optionItem.length; index++)
        for (
          let index2: number = 0;
          index2 < (optionItem[index]?.length ?? 0);
          index2++
        )
          items.push({
            path: [
              sheetReference(sheetIdOf2),
              resolvePlatformApiAndAuthValue25(
                selectedRect.rect.r1 + index,
                selectedRect.rect.c1 + index2,
              ),
            ],
            set: `CellStyleJson`,
            v: JSON.stringify(optionItem[index][index2]),
          });
      return items;
    }
    case `autoFillRows`:
    case `autoFillColumns`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      if (!platformApiAndAuthSheet || finiteNumberValue3 === undefined)
        return null;
      let matchesPlatformApiAndAuthPath: boolean =
        platformApiAndAuthPath === `autoFillRows`;
      if (
        matchesPlatformApiAndAuthPath
          ? finiteNumberValue3 >= platformApiAndAuthSheet.rect.r2
          : finiteNumberValue3 >= platformApiAndAuthSheet.rect.c2
      ) {
        let record3: Dynamic = matchesPlatformApiAndAuthPath
          ? {
              ...platformApiAndAuthSheet.rect,
              r2: finiteNumberValue3,
            }
          : {
              ...platformApiAndAuthSheet.rect,
              c2: finiteNumberValue3,
            };
        return [
          {
            path: [
              sheetReference(platformApiAndAuthSheet.sid),
              rangeReference(platformApiAndAuthSheet.rect),
            ],
            call: `AutoFill`,
            args: [
              resolvePlatformApiAndAuthRef(
                platformApiAndAuthSheet.sid,
                record3,
              ),
            ],
          },
        ];
      }
      let record2: Dynamic = matchesPlatformApiAndAuthPath
        ? {
            ...platformApiAndAuthSheet.rect,
            r1: finiteNumberValue3,
          }
        : {
            ...platformApiAndAuthSheet.rect,
            c1: finiteNumberValue3,
          };
      return [
        {
          path: [
            sheetReference(platformApiAndAuthSheet.sid),
            rangeReference(record2),
          ],
          call: matchesPlatformApiAndAuthPath ? `FillUp` : `FillLeft`,
        },
      ];
    }
    case `insertRows`:
    case `deleteRows`: {
      let [items, setItems]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        setItems < 1
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthRows2(items, items + setItems - 1),
              ],
              call:
                platformApiAndAuthPath === `insertRows` ? `Insert` : `Delete`,
            },
          ];
    }
    case `insertColumns`:
    case `deleteColumns`: {
      let [items, setItems]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        setItems < 1
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthCols(items, items + setItems - 1),
              ],
              call:
                platformApiAndAuthPath === `insertColumns`
                  ? `Insert`
                  : `Delete`,
            },
          ];
    }
    case `moveRow`:
    case `moveColumn`: {
      let [items, setItems]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
      ];
      if (
        sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
      )
        return null;
      let platformApiAndAuthRows2: Dynamic =
        platformApiAndAuthPath === `moveRow`
          ? resolvePlatformApiAndAuthRows2(items, items)
          : resolvePlatformApiAndAuthCols(items, items);
      return [
        {
          path: [sheetReference(sheetIdOf), platformApiAndAuthRows2],
          call: `Move`,
          args: [setItems],
        },
      ];
    }
    case `insertCells`:
    case `deleteCells`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let stringValue2: Dynamic = stringValue(options[1]);
      return !platformApiAndAuthSheet ||
        !stringValue2 ||
        ![`right`, `down`, `left`, `up`].includes(stringValue2)
        ? null
        : [
            {
              path: [
                sheetReference(platformApiAndAuthSheet.sid),
                rangeReference(platformApiAndAuthSheet.rect),
              ],
              call:
                platformApiAndAuthPath === `insertCells` ? `Insert` : `Delete`,
              args: [stringValue2],
            },
          ];
    }
    case `mergeCells`:
    case `unmergeCells`: {
      let [items, setItems, items2, items3]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        finiteNumberValue(options[3]),
        finiteNumberValue(options[4]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference({
                  r1: items,
                  r2: items2 ?? items,
                  c1: setItems,
                  c2: items3 ?? setItems,
                }),
              ],
              call:
                platformApiAndAuthPath === `mergeCells` ? `Merge` : `UnMerge`,
            },
          ];
    }
    case `setFrozenRowsCount`:
    case `setFrozenColumnsCount`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      if (sheetIdOf === undefined || finiteNumberValue3 === undefined)
        return null;
      let set2: string =
        platformApiAndAuthPath === `setFrozenRowsCount`
          ? `SplitRow`
          : `SplitColumn`;
      return [
        {
          path: resolvePlatformApiAndAuthWindow(sheetIdOf),
          set: set2,
          v: finiteNumberValue3,
        },
      ];
    }
    case `setSplit`: {
      let [items, setItems]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
        ? null
        : items === 0 && setItems === 0
          ? [
              {
                path: resolvePlatformApiAndAuthWindow(sheetIdOf),
                set: `Split`,
                v: false,
              },
            ]
          : [
              {
                path: resolvePlatformApiAndAuthWindow(sheetIdOf),
                set: `SplitHorizontal`,
                v: items,
              },
              {
                path: resolvePlatformApiAndAuthWindow(sheetIdOf),
                set: `SplitVertical`,
                v: setItems,
              },
            ];
    }
    case `setShowGridLines`:
    case `setShowHeadings`: {
      let optionItem: Dynamic = options[1];
      if (sheetIdOf === undefined || typeof optionItem != `boolean`)
        return null;
      let set2: string =
        platformApiAndAuthPath === `setShowGridLines`
          ? `DisplayGridlines`
          : `DisplayHeadings`;
      return [
        {
          path: resolvePlatformApiAndAuthWindow(sheetIdOf),
          set: set2,
          v: optionItem,
        },
      ];
    }
    case `setColumnOutlineLevel`:
    case `setRowOutlineLevel`: {
      let [items, setItems, items2]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        finiteNumberValue(options[3]),
      ];
      if (
        sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        items2 === undefined
      )
        return null;
      let platformApiAndAuthRows2: Dynamic =
        platformApiAndAuthPath === `setRowOutlineLevel`
          ? resolvePlatformApiAndAuthRows2(items, setItems)
          : resolvePlatformApiAndAuthCols(items, setItems);
      return [
        {
          path: [sheetReference(sheetIdOf), platformApiAndAuthRows2],
          set: `OutlineLevel`,
          v: items2,
        },
      ];
    }
    case `toggleRowGroup`:
    case `toggleColumnGroup`:
      return null;
    case `setColumnsWidth`: {
      let [items, setItems, items2]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        finiteNumberValue(options[3]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        items2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference({
                  r1: 1,
                  r2: 1,
                  c1: items,
                  c2: setItems,
                }),
              ],
              set: `ColumnWidth`,
              v: resolvePlatformApiAndAuthValue21(items2),
            },
          ];
    }
    case `setRowsHeight`: {
      let [items, setItems, items2]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        finiteNumberValue(options[3]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        items2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference({
                  r1: items,
                  r2: setItems,
                  c1: 1,
                  c2: 1,
                }),
              ],
              set: `RowHeight`,
              v: resolvePlatformApiAndAuthValue22(items2),
            },
          ];
    }
    case `autoFitColumnWidth`:
    case `setAutofitColumn`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      return sheetIdOf === undefined || finiteNumberValue3 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthCols(
                  finiteNumberValue3,
                  finiteNumberValue3,
                ),
              ],
              call: `AutoFit`,
            },
          ];
    }
    case `autoFitRowHeight`:
    case `setAutofitRow`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      return sheetIdOf === undefined || finiteNumberValue3 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthRows2(
                  finiteNumberValue3,
                  finiteNumberValue3,
                ),
              ],
              call: `AutoFit`,
            },
          ];
    }
    case `applyCellStyle`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let stringValue2: Dynamic = stringValue(options[1]);
      return !platformApiAndAuthSheet || stringValue2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(platformApiAndAuthSheet.sid),
                rangeReference(platformApiAndAuthSheet.rect),
              ],
              set: `Style`,
              v: stringValue2,
            },
          ];
    }
    case `updateRangeStyle`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let stringValue2: Dynamic = stringValue(options[1]);
      let stringValue3: Dynamic = stringValue(options[2]);
      if (
        !platformApiAndAuthSheet ||
        stringValue2 === undefined ||
        stringValue3 === undefined
      )
        return null;
      let PlatformApiAndAuthFontBItem: Dynamic =
        PlatformApiAndAuthFontB[stringValue2];
      if (!PlatformApiAndAuthFontBItem) return null;
      let path: Dynamic = [
        sheetReference(platformApiAndAuthSheet.sid),
        rangeReference(platformApiAndAuthSheet.rect),
      ];
      if (PlatformApiAndAuthFontBItem.prop) {
        path.push(propertyReference(PlatformApiAndAuthFontBItem.prop));
      }
      return [
        {
          path: path,
          set: PlatformApiAndAuthFontBItem.member,
          v: PlatformApiAndAuthFontBItem.coerce(stringValue3),
        },
      ];
    }
    case `addCellStyle`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      return stringValue2 === undefined
        ? null
        : [
            {
              path: [],
              call: `Styles.Add`,
              args: [stringValue2],
            },
          ];
    }
    case `deleteCellStyle`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      return stringValue2 === undefined
        ? null
        : [
            {
              path: [
                propertyReference(`Styles`),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `Delete`,
            },
          ];
    }
    case `setAreaWithBorder`: {
      let platformApiAndAuthSheet: Dynamic = resolvePlatformApiAndAuthSheet(
        options[0],
        context,
      );
      let optionItem: Dynamic = options[1];
      if (!platformApiAndAuthSheet || !optionItem?.type) return null;
      let filterPlatformApiAndAuthEdge2: Dynamic = filterPlatformApiAndAuthEdge(
        optionItem.type,
        platformApiAndAuthSheet.rect,
      );
      if (filterPlatformApiAndAuthEdge2.length === 0) return null;
      let matchesType: boolean = optionItem.type === `None`;
      let label: Dynamic = matchesType ? `none` : optionItem.item?.style;
      if (!label) return null;
      let items: Dynamic = [];
      for (let {
        edge: result,
        rect: isPlatformApiAndAuthPathResult,
      } of filterPlatformApiAndAuthEdge2 as Dynamic) {
        let path: Dynamic = [
          sheetReference(platformApiAndAuthSheet.sid),
          rangeReference(isPlatformApiAndAuthPathResult),
          propertyReference(`Borders`),
          {
            enum: result,
          },
        ];
        items.push({
          path: path,
          set: `LineStyle`,
          v: label,
        });
        if (!matchesType && optionItem.item?.color) {
          items.push({
            path: [...path],
            set: `Color`,
            v: optionItem.item.color,
          });
        }
      }
      return items;
    }
    case `addConditionalFormat`:
      return null;
    case `removeConditionalFormat`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      if (sheetIdOf === undefined || finiteNumberValue3 === undefined)
        return null;
      let cfSqref: Dynamic = context.cfSqref?.(
        finiteNumberValue2,
        finiteNumberValue3,
      );
      return cfSqref
        ? [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference(cfSqref),
                propertyReference(`FormatConditions`),
                resolvePlatformApiAndAuthIndex(finiteNumberValue3 + 1),
              ],
              call: `Delete`,
            },
          ]
        : null;
    }
    case `addDxf`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      return stringValue2 === undefined
        ? null
        : [
            {
              path: [],
              call: `Dxfs.Add`,
              args: [stringValue2],
            },
          ];
    }
    case `newDefinedName`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      let stringValue3: Dynamic = stringValue(options[2]);
      if (!stringValue2 || stringValue3 === undefined) return null;
      let finiteNumberValue3: Dynamic =
        options[1] == null ? null : finiteNumberValue(options[1]);
      if (finiteNumberValue3 == null)
        return [
          {
            path: [],
            call: `Names.Add`,
            args: [stringValue2, stringValue3],
          },
        ];
      let sheetIdOf2: Dynamic = context.sheetIdOf(finiteNumberValue3);
      return sheetIdOf2 === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf2)],
              call: `Names.Add`,
              args: [stringValue2, stringValue3],
            },
          ];
    }
    case `deleteDefinedName`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      return stringValue2
        ? [
            {
              path: [resolvePlatformApiAndAuthValue26(stringValue2)],
              call: `Delete`,
            },
          ]
        : null;
    }
    case `updateDefinedName`: {
      let [items, setItems, items2]: Dynamic = [
        stringValue(options[0]),
        stringValue(options[2]),
        stringValue(options[4]),
      ];
      return !items ||
        items2 === undefined ||
        options[1] != null ||
        options[3] != null ||
        setItems !== items
        ? null
        : [
            {
              path: [resolvePlatformApiAndAuthValue26(items)],
              set: `RefersTo`,
              v: items2,
            },
          ];
    }
    case `setDefinedNameComment`:
    case `setDefinedNameHidden`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      if (!stringValue2) return null;
      let finiteNumberValue3: Dynamic =
        options[1] == null ? null : finiteNumberValue(options[1]);
      let path: Dynamic;
      if (finiteNumberValue3 == null)
        path = [resolvePlatformApiAndAuthValue26(stringValue2)];
      else {
        let sheetIdOf2: Dynamic = context.sheetIdOf(finiteNumberValue3);
        if (sheetIdOf2 === undefined) return null;
        path = [
          sheetReference(sheetIdOf2),
          resolvePlatformApiAndAuthValue26(stringValue2),
        ];
      }
      if (platformApiAndAuthPath === `setDefinedNameComment`)
        return [
          {
            path: path,
            set: `Comment`,
            v: stringValue(options[2]) ?? null,
          },
        ];
      let platformApiAndAuthValue24: Dynamic = resolvePlatformApiAndAuthValue24(
        options[2],
      );
      return platformApiAndAuthValue24 === undefined
        ? null
        : [
            {
              path: path,
              set: `Visible`,
              v: !platformApiAndAuthValue24,
            },
          ];
    }
    case `setCellComment`: {
      let [items, setItems, items2]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        stringValue(options[3]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        items2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthValue25(items, setItems),
              ],
              set: `NoteText`,
              v: items2,
            },
          ];
    }
    case `deleteCellComment`: {
      let [items, setItems]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthValue25(items, setItems),
              ],
              call: `ClearComments`,
            },
          ];
    }
    case `addThreadedComment`: {
      let [items, setItems, items2]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        stringValue(options[3]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        items2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                resolvePlatformApiAndAuthValue25(items, setItems),
              ],
              call: `AddCommentThreaded`,
              args: [items2],
            },
          ];
    }
    case `deleteThreadedComment`:
    case `resolveThreadedComment`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      if (sheetIdOf === undefined || stringValue2 === undefined) return null;
      let threadCommentCell: Dynamic = context.threadCommentCell?.(
        finiteNumberValue2,
        stringValue2,
      );
      return threadCommentCell
        ? [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference(threadCommentCell),
                propertyReference(`CommentThreaded`),
              ],
              call:
                platformApiAndAuthPath === `deleteThreadedComment`
                  ? `Delete`
                  : `Resolve`,
            },
          ]
        : null;
    }
    case `addTable`: {
      let [items, setItems, items2, items3]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
        finiteNumberValue(options[3]),
        finiteNumberValue(options[4]),
      ];
      return sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined ||
        items2 === undefined ||
        items3 === undefined ||
        options[5] === false
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference({
                  r1: items,
                  c1: setItems,
                  r2: items2,
                  c2: items3,
                }),
              ],
              call: `ListObjects.Add`,
            },
          ];
    }
    case `deleteTable`:
    case `deletePivotTable`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      if (!stringValue2) return null;
      let tableSheet: Dynamic = (
        platformApiAndAuthPath === `deleteTable`
          ? context.tableSheet
          : context.pivotSheet
      )?.(stringValue2);
      if (tableSheet === undefined) return null;
      let sheetIdOf2: Dynamic = context.sheetIdOf(tableSheet);
      return sheetIdOf2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `Delete`,
            },
          ];
    }
    case `addTableColumn`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      if (!stringValue2) return null;
      let tableSheet: Dynamic = context.tableSheet?.(stringValue2);
      if (tableSheet === undefined) return null;
      let sheetIdOf2: Dynamic = context.sheetIdOf(tableSheet);
      return sheetIdOf2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `ListColumns.Add`,
            },
          ];
    }
    case `deleteTableColumn`: {
      let [items, setItems]: Dynamic = [
        stringValue(options[0]),
        finiteNumberValue(options[1]),
      ];
      if (!items || setItems === undefined) return null;
      let tableSheet: Dynamic = context.tableSheet?.(items);
      if (tableSheet === undefined) return null;
      let sheetIdOf2: Dynamic = context.sheetIdOf(tableSheet);
      return sheetIdOf2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(items),
              ],
              call: `ListColumns.Delete`,
              args: [setItems + 1],
            },
          ];
    }
    case `setAutoFilter`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      if (sheetIdOf === undefined || !stringValue2) return null;
      let platformApiAndAuthExec: Dynamic =
        resolvePlatformApiAndAuthExec(stringValue2);
      return platformApiAndAuthExec
        ? [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference(platformApiAndAuthExec),
              ],
              call: `AutoFilter`,
            },
          ]
        : null;
    }
    case `clearAutoFilter`:
      return sheetIdOf === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              set: `AutoFilterMode`,
              v: false,
            },
          ];
    case `applyFilter`:
    case `clearFilterColumn`:
      return null;
    case `setDataValidation`: {
      if (options[1] != null) return null;
      let optionItem: Dynamic = options[2];
      if (sheetIdOf === undefined || !optionItem?.sqref) return null;
      let platformApiAndAuthExec: Dynamic = resolvePlatformApiAndAuthExec(
        optionItem.sqref,
      );
      if (!platformApiAndAuthExec) return null;
      let PlatformApiAndAuthWholeItem: Dynamic =
        PlatformApiAndAuthWhole[optionItem.validation_type ?? `custom`] ??
        `xlValidateCustom`;
      return [
        {
          path: [
            sheetReference(sheetIdOf),
            rangeReference(platformApiAndAuthExec),
            propertyReference(`Validation`),
          ],
          call: `Add`,
          args: [
            PlatformApiAndAuthWholeItem,
            {
              missing: true,
            },
            {
              missing: true,
            },
            optionItem.formula1 ?? ``,
            optionItem.formula2 ?? {
              missing: true,
            },
          ],
        },
      ];
    }
    case `deleteDataValidation`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      if (sheetIdOf === undefined || finiteNumberValue3 === undefined)
        return null;
      let dvSqref: Dynamic = context.dvSqref?.(
        finiteNumberValue2,
        finiteNumberValue3,
      );
      return dvSqref
        ? [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference(dvSqref),
                propertyReference(`Validation`),
              ],
              call: `Delete`,
            },
          ]
        : null;
    }
    case `setHyperlink`: {
      let optionItem: Dynamic = options[1];
      let ref: Dynamic = optionItem?.ref;
      if (optionItem?.location || optionItem?.tooltip) return null;
      let target: Dynamic = optionItem?.target;
      if (sheetIdOf === undefined || !ref || !target) return null;
      let platformApiAndAuthExec: Dynamic = resolvePlatformApiAndAuthExec(ref);
      if (!platformApiAndAuthExec) return null;
      let args: Dynamic =
        optionItem.display === undefined
          ? [target]
          : [target, optionItem.display];
      return [
        {
          path: [
            sheetReference(sheetIdOf),
            rangeReference(platformApiAndAuthExec),
          ],
          call: `Hyperlinks.Add`,
          args: args,
        },
      ];
    }
    case `deleteHyperlink`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      if (sheetIdOf === undefined || !stringValue2) return null;
      let platformApiAndAuthExec: Dynamic =
        resolvePlatformApiAndAuthExec(stringValue2);
      return platformApiAndAuthExec
        ? [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference(platformApiAndAuthExec),
              ],
              call: `Hyperlinks.Delete`,
            },
          ]
        : null;
    }
    case `addNamedSheetView`:
    case `createSheetView`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      return sheetIdOf === undefined || stringValue2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                propertyReference(`NamedSheetViews`),
              ],
              call: `Add`,
              args: [stringValue2],
            },
          ];
    }
    case `deleteNamedSheetView`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      return sheetIdOf === undefined || stringValue2 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                propertyReference(`NamedSheetViews`),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `Delete`,
            },
          ];
    }
    case `saveCustomView`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      return stringValue2 === undefined
        ? null
        : [
            {
              path: [],
              call: `CustomViews.Add`,
              args: [stringValue2],
            },
          ];
    }
    case `deleteCustomView`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      return stringValue2 === undefined
        ? null
        : [
            {
              path: [
                propertyReference(`CustomViews`),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `Delete`,
            },
          ];
    }
    case `protectSheet`:
    case `unprotectSheet`:
      return sheetIdOf === undefined || stringValue(options[1])
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              call:
                platformApiAndAuthPath === `protectSheet`
                  ? `Protect`
                  : `Unprotect`,
            },
          ];
    case `protectWorkbook`:
    case `unprotectWorkbook`:
      return stringValue(options[0])
        ? null
        : [
            {
              path: [],
              call:
                platformApiAndAuthPath === `protectWorkbook`
                  ? `Protect`
                  : `Unprotect`,
            },
          ];
    case `setPageSetup`:
      return null;
    case `addPageBreak`:
    case `removePageBreak`: {
      let [items, setItems]: Dynamic = [
        finiteNumberValue(options[1]),
        finiteNumberValue(options[2]),
      ];
      if (
        sheetIdOf === undefined ||
        items === undefined ||
        setItems === undefined
      )
        return null;
      let items2: Dynamic = [];
      let call: string =
        platformApiAndAuthPath === `addPageBreak` ? `Add` : `Delete`;
      if (items > 0) {
        items2.push({
          path: [sheetReference(sheetIdOf), propertyReference(`HPageBreaks`)],
          call: call,
          args: [items],
        });
      }
      if (setItems > 0) {
        items2.push({
          path: [sheetReference(sheetIdOf), propertyReference(`VPageBreaks`)],
          call: call,
          args: [setItems],
        });
      }
      return items2;
    }
    case `addShapeLive`:
      return null;
    case `deleteShapeLive`:
    case `moveDrawing`:
    case `setShapeText`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[0]);
      if (finiteNumberValue3 === undefined) return null;
      let drawingSheet: Dynamic = context.drawingSheet?.(finiteNumberValue3);
      if (!drawingSheet) return null;
      let sheetIdOf2: Dynamic = context.sheetIdOf(drawingSheet.sheetIndex);
      if (sheetIdOf2 === undefined) return null;
      let path: Dynamic = [
        sheetReference(sheetIdOf2),
        propertyReference(drawingSheet.coll),
        resolvePlatformApiAndAuthIndex(drawingSheet.idx),
      ];
      return platformApiAndAuthPath === `deleteShapeLive`
        ? [
            {
              path: path,
              call: `Delete`,
            },
          ]
        : platformApiAndAuthPath === `setShapeText`
          ? [
              {
                path: [...path, propertyReference(`TextFrame`)],
                set: `Text`,
                v: stringValue(options[1]) ?? ``,
              },
            ]
          : [
              {
                path: path,
                set: `AnchorJson`,
                v: stringValue(options[2]) ?? ``,
              },
            ];
    }
    case `insertImageLive`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      let stringValue3: Dynamic = stringValue(options[1]);
      if (!stringValue2 || !stringValue3) return null;
      let sheetIdByName: Dynamic = context.sheetIdByName?.(stringValue2);
      return sheetIdByName === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdByName),
                propertyReference(`Pictures`),
              ],
              call: `Insert`,
              args: [stringValue3],
            },
          ];
    }
    case `deleteChart`:
    case `setChartTitle`:
    case `setChartLegend`:
    case `setChartStyle`:
    case `setChartType`:
    case `setChartDataLabels`:
    case `setChartAxis`:
    case `setChartSeries`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[0]);
      if (finiteNumberValue3 === undefined) return null;
      let chartSheet: Dynamic = context.chartSheet?.(finiteNumberValue3);
      if (!chartSheet) return null;
      let sheetIdOf2: Dynamic = context.sheetIdOf(chartSheet.sheetIndex);
      if (sheetIdOf2 === undefined) return null;
      let path: Dynamic = [
        sheetReference(sheetIdOf2),
        propertyReference(`ChartObjects`),
        resolvePlatformApiAndAuthIndex(chartSheet.idx),
      ];
      let path2: Dynamic = [...path, propertyReference(`Chart`)];
      switch (platformApiAndAuthPath) {
        case `deleteChart`:
          return [
            {
              path: path,
              call: `Delete`,
            },
          ];
        case `setChartTitle`:
          return [
            {
              path: [...path2, propertyReference(`ChartTitle`)],
              set: `Text`,
              v: stringValue(options[1]) ?? null,
            },
          ];
        case `setChartLegend`:
          return finiteNumberValue(options[2]) === undefined &&
            stringValue(options[2]) === undefined
            ? [
                {
                  path: path2,
                  set: `HasLegend`,
                  v: resolvePlatformApiAndAuthValue24(options[1]) ?? true,
                },
              ]
            : null;
        case `setChartStyle`:
          return [
            {
              path: path2,
              set: `ChartStyle`,
              v: finiteNumberValue(options[1]) ?? 0,
            },
          ];
        case `setChartType`:
          return [
            {
              path: path2,
              set: `ChartType`,
              v: stringValue(options[1]) ?? ``,
            },
          ];
        case `setChartDataLabels`:
          return [
            {
              path: path2,
              set: `HasDataLabels`,
              v: resolvePlatformApiAndAuthValue24(options[1]) ?? false,
            },
          ];
        case `setChartAxis`: {
          let finiteNumberValue4: Dynamic = finiteNumberValue(options[1]) ?? 0;
          let items: Dynamic = [
            ...path2,
            propertyReference(`Axes`),
            resolvePlatformApiAndAuthIndex(finiteNumberValue4 + 1),
          ];
          if (stringValue(options[2])) return null;
          let items2: Dynamic = [];
          if (finiteNumberValue(options[3]) !== undefined) {
            items2.push({
              path: [...items],
              set: `MinimumScale`,
              v: finiteNumberValue(options[3]),
            });
          }
          if (finiteNumberValue(options[4]) !== undefined) {
            items2.push({
              path: [...items],
              set: `MaximumScale`,
              v: finiteNumberValue(options[4]),
            });
          }
          return items2.length ? items2 : null;
        }
        case `setChartSeries`: {
          let finiteNumberValue4: Dynamic = finiteNumberValue(options[1]) ?? 0;
          let stringValue2: Dynamic = stringValue(options[2]);
          let set2: string =
            stringValue2 === `categories`
              ? `XValues`
              : stringValue2 === `name`
                ? `Name`
                : `Values`;
          return [
            {
              path: [
                ...path2,
                propertyReference(`SeriesCollection`),
                resolvePlatformApiAndAuthIndex(finiteNumberValue4 + 1),
              ],
              set: set2,
              v: stringValue(options[3]) ?? ``,
            },
          ];
        }
      }
      return null;
    }
    case `setChartSeriesColor`:
      return null;
    case `addSparklineGroup`: {
      let optionItem: Dynamic = options[1];
      if (sheetIdOf === undefined || !optionItem?.sparklines?.[0]?.location)
        return null;
      let platformApiAndAuthExec: Dynamic = resolvePlatformApiAndAuthExec(
        optionItem.sparklines[0].location,
      );
      return platformApiAndAuthExec
        ? [
            {
              path: [
                sheetReference(sheetIdOf),
                rangeReference(platformApiAndAuthExec),
                propertyReference(`SparklineGroups`),
              ],
              call: `Add`,
              args: [
                optionItem.sparklines[0].source ?? ``,
                optionItem.sparkline_type ?? `line`,
              ],
            },
          ]
        : null;
    }
    case `deleteSparklineGroup`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      return sheetIdOf === undefined || finiteNumberValue3 === undefined
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                propertyReference(`SparklineGroups`),
                resolvePlatformApiAndAuthIndex(finiteNumberValue3 + 1),
              ],
              call: `Delete`,
            },
          ];
    }
    case `createPivotTable`: {
      let [items, setItems, items2, items3]: Dynamic = [
        stringValue(options[0]),
        stringValue(options[1]),
        stringValue(options[2]),
        stringValue(options[3]),
      ];
      if (!items || !setItems || !items2 || !items3) return null;
      let sheetIdByName: Dynamic = context.sheetIdByName?.(items);
      let sheetIdByName2: Dynamic = context.sheetIdByName?.(items2);
      if (sheetIdByName === undefined || sheetIdByName2 === undefined)
        return null;
      let platformApiAndAuthExec: Dynamic =
        resolvePlatformApiAndAuthExec(setItems);
      let platformApiAndAuthExec2: Dynamic =
        resolvePlatformApiAndAuthExec(items3);
      return !platformApiAndAuthExec || !platformApiAndAuthExec2
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdByName2),
                rangeReference(platformApiAndAuthExec2),
                propertyReference(`PivotTables`),
              ],
              call: `Add`,
              args: [
                `PivotTable1`,
                resolvePlatformApiAndAuthRef(
                  sheetIdByName,
                  platformApiAndAuthExec,
                ),
              ],
            },
          ];
    }
    case `pivotAddField`:
    case `pivotRemoveField`:
    case `pivotMoveField`:
    case `pivotAddDataField`:
    case `pivotSetAggregation`:
    case `pivotSetDateGrouping`:
    case `pivotSetPageFilter`:
    case `pivotAddCalculatedField`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      if (!stringValue2) return null;
      let pivotSheet: Dynamic = context.pivotSheet?.(stringValue2);
      if (pivotSheet === undefined) return null;
      let sheetIdOf2: Dynamic = context.sheetIdOf(pivotSheet);
      if (sheetIdOf2 === undefined) return null;
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      switch (platformApiAndAuthPath) {
        case `pivotAddField`: {
          let PlatformApiAndAuthRowItem: Dynamic =
            PlatformApiAndAuthRow[stringValue(options[2]) ?? `row`] ?? 1;
          return [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
                propertyReference(`PivotFields`),
                resolvePlatformApiAndAuthIndex((finiteNumberValue3 ?? 0) + 1),
              ],
              set: `Orientation`,
              v: PlatformApiAndAuthRowItem,
            },
          ];
        }
        case `pivotRemoveField`:
          return [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
                propertyReference(`PivotFields`),
                resolvePlatformApiAndAuthIndex((finiteNumberValue3 ?? 0) + 1),
              ],
              set: `Orientation`,
              v: 0,
            },
          ];
        case `pivotMoveField`: {
          let PlatformApiAndAuthRowItem: Dynamic =
            PlatformApiAndAuthRow[stringValue(options[3]) ?? `row`] ?? 1;
          return [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
                propertyReference(`PivotFields`),
                resolvePlatformApiAndAuthIndex((finiteNumberValue3 ?? 0) + 1),
              ],
              set: `Orientation`,
              v: PlatformApiAndAuthRowItem,
            },
          ];
        }
        case `pivotAddDataField`:
          return null;
        case `pivotSetAggregation`:
          return [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
                propertyReference(`DataFields`),
                resolvePlatformApiAndAuthIndex((finiteNumberValue3 ?? 0) + 1),
              ],
              set: `Function`,
              v: stringValue(options[2]) ?? `Sum`,
            },
          ];
        case `pivotSetDateGrouping`:
          return [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
                propertyReference(`PivotFields`),
                resolvePlatformApiAndAuthIndex((finiteNumberValue3 ?? 0) + 1),
              ],
              set: `DateGrouping`,
              v: stringValue(options[2]) ?? `None`,
            },
          ];
        case `pivotSetPageFilter`:
          return [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
                propertyReference(`PageFields`),
                resolvePlatformApiAndAuthIndex((finiteNumberValue3 ?? 0) + 1),
              ],
              set: `CurrentPage`,
              v: stringValue(options[2]) ?? ``,
            },
          ];
        case `pivotAddCalculatedField`:
          return [
            {
              path: [
                sheetReference(sheetIdOf2),
                resolvePlatformApiAndAuthValue26(stringValue2),
                propertyReference(`CalculatedFields`),
              ],
              call: `Add`,
              args: [
                stringValue(options[1]) ?? ``,
                stringValue(options[2]) ?? ``,
              ],
            },
          ];
      }
      return null;
    }
    case `refreshPivot`:
    case `refreshAllPivots`:
      return [];
    case `setQuery`: {
      let [items, setItems]: Dynamic = [
        stringValue(options[0]),
        stringValue(options[1]),
      ];
      return !items || setItems === undefined
        ? null
        : [
            {
              path: [],
              call: `Queries.Add`,
              args: [items, setItems],
            },
          ];
    }
    case `deleteQuery`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      return stringValue2
        ? [
            {
              path: [
                propertyReference(`Queries`),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `Delete`,
            },
          ]
        : null;
    }
    case `refreshQuery`:
      return null;
    case `addScenario`: {
      let [items, setItems, items2]: Dynamic = [
        stringValue(options[1]),
        options[2],
        options[3],
      ];
      if (
        sheetIdOf === undefined ||
        !items ||
        !setItems?.length ||
        setItems.length !== 1
      )
        return null;
      let platformApiAndAuthExec: Dynamic = resolvePlatformApiAndAuthExec(
        setItems[0],
      );
      return platformApiAndAuthExec
        ? [
            {
              path: [sheetReference(sheetIdOf), propertyReference(`Scenarios`)],
              call: `Add`,
              args: [
                items,
                resolvePlatformApiAndAuthRef(sheetIdOf, platformApiAndAuthExec),
                {
                  array: {
                    dims: [[1, items2?.length ?? 0]],
                    data: items2 ?? [],
                  },
                },
              ],
            },
          ]
        : null;
    }
    case `deleteScenario`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      return sheetIdOf === undefined || !stringValue2
        ? null
        : [
            {
              path: [
                sheetReference(sheetIdOf),
                propertyReference(`Scenarios`),
                resolvePlatformApiAndAuthValue26(stringValue2),
              ],
              call: `Delete`,
            },
          ];
    }
    case `addCustomXmlPart`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      return stringValue2 === undefined
        ? null
        : [
            {
              path: [],
              call: `CustomXMLParts.Add`,
              args: [stringValue2],
            },
          ];
    }
    case `setCustomXmlPart`: {
      let [items, setItems]: Dynamic = [
        stringValue(options[0]),
        stringValue(options[1]),
      ];
      if (!items || setItems === undefined) return null;
      let customXmlIndex: Dynamic = context.customXmlIndex?.(items);
      return customXmlIndex === undefined
        ? null
        : [
            {
              path: [
                propertyReference(`CustomXMLParts`),
                resolvePlatformApiAndAuthIndex(customXmlIndex),
              ],
              set: `XML`,
              v: setItems,
            },
          ];
    }
    case `deleteCustomXmlPart`: {
      let stringValue2: Dynamic = stringValue(options[0]);
      if (!stringValue2) return null;
      let customXmlIndex: Dynamic = context.customXmlIndex?.(stringValue2);
      return customXmlIndex === undefined
        ? null
        : [
            {
              path: [
                propertyReference(`CustomXMLParts`),
                resolvePlatformApiAndAuthIndex(customXmlIndex),
              ],
              call: `Delete`,
            },
          ];
    }
    case `setCellLinkedRecord`:
      return null;
    case `setVbaModules`: {
      let optionItem: Dynamic = options[0];
      if (!Array.isArray(optionItem)) return null;
      let items: Dynamic = [];
      for (let error of optionItem as Dynamic) {
        items.push({
          path: [
            propertyReference(`VBProject`),
            propertyReference(`VBComponents`),
          ],
          call: `Add`,
          args: [error.name],
        });
        items.push({
          path: [
            propertyReference(`VBProject`),
            propertyReference(`VBComponents`),
            resolvePlatformApiAndAuthValue26(error.name),
          ],
          set: `CodeModule`,
          v: error.code,
        });
      }
      return items;
    }
    case `runVbaMacro`:
      return null;
    case `applyExternalDiffs`:
      return [];
    case `newSheet`:
      return [
        {
          path: [],
          call: `Worksheets.Add`,
        },
      ];
    case `renameSheet`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      return sheetIdOf === undefined || stringValue2 === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              set: `Name`,
              v: stringValue2,
            },
          ];
    }
    case `deleteSheet`:
      return sheetIdOf === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              call: `Delete`,
            },
          ];
    case `moveSheet`: {
      let finiteNumberValue3: Dynamic = finiteNumberValue(options[1]);
      return sheetIdOf === undefined || finiteNumberValue3 === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              call: `Move`,
              args: [finiteNumberValue3 + 1],
            },
          ];
    }
    case `duplicateSheet`:
      return sheetIdOf === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              call: `Copy`,
            },
          ];
    case `hideSheet`:
      return sheetIdOf === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              set: `Visible`,
              v: 0,
            },
          ];
    case `unhideSheet`:
      return sheetIdOf === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf)],
              set: `Visible`,
              v: -1,
            },
          ];
    case `setSheetColor`: {
      let stringValue2: Dynamic = stringValue(options[1]);
      return sheetIdOf === undefined || stringValue2 === undefined
        ? null
        : [
            {
              path: [sheetReference(sheetIdOf), propertyReference(`Tab`)],
              set: `Color`,
              v: stringValue2,
            },
          ];
    }
    default:
      return null;
  }
}

function resolvePlatformApiAndAuthCall2(
  platformApiAndAuthCall2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let set2: Dynamic =
    `set` in platformApiAndAuthCall2
      ? platformApiAndAuthCall2.set
      : `call` in platformApiAndAuthCall2
        ? platformApiAndAuthCall2.call
        : ``;
  let pathItem: Dynamic = platformApiAndAuthCall2.path[0];
  if (
    (pathItem &&
      `property` in pathItem &&
      pathItem.property === `Application`) ||
    set2 === `Application.Run` ||
    set2 === `Undo` ||
    set2 === `Redo` ||
    set2.startsWith(`Versions.`) ||
    set2 === `ExportAsFixedFormat` ||
    set2 === `CommitChanges` ||
    set2 === `DiscardChanges` ||
    set2 === `AllocateChange`
  )
    return `Barrier`;
  let pathItem2: Dynamic =
    platformApiAndAuthCall2.path[platformApiAndAuthCall2.path.length - 1];
  if (set2 === `Worksheets.Add` || set2 === `Slides.Add`) return `Structural`;
  if (!pathItem2) return `Write`;
  if (
    ((`rows` in pathItem2 || `cols` in pathItem2) &&
      (set2 === `Insert` || set2 === `Delete`)) ||
    ((`sheetId` in pathItem2 || `id` in pathItem2) &&
      (set2 === `Delete` || set2 === `Move` || set2 === `Copy`))
  )
    return `Structural`;
  if (`range` in pathItem2) {
    if (set2 === `Insert` || set2 === `Delete`) return `Structural`;
    if (
      set2 === `Sort` ||
      set2 === `RemoveDuplicates` ||
      set2 === `AdvancedFilter` ||
      set2 === `GoalSeek`
    )
      return `Algo`;
  }
  return (`block` in pathItem2 &&
    (set2 === `InsertParagraphAfter` ||
      set2 === `InsertParagraphBefore` ||
      set2 === `Delete`)) ||
    ((`trow` in pathItem2 || `tcol` in pathItem2) &&
      (set2 === `Insert` || set2 === `Delete`)) ||
    (`chars` in pathItem2 &&
      `set` in platformApiAndAuthCall2 &&
      set2 === `Text`) ||
    (`chars` in pathItem2 &&
      `call` in platformApiAndAuthCall2 &&
      (set2 === `InsertBreak` || set2 === `ContentControls.Add`)) ||
    (`slideId` in pathItem2 &&
      (set2 === `Delete` || set2 === `Duplicate` || set2 === `Move`)) ||
    (`property` in pathItem2 &&
      pathItem2.property === `Shapes` &&
      (set2 === `AddTextbox` ||
        set2 === `AddShape` ||
        set2 === `AddPicture` ||
        set2 === `AddTable`))
    ? `Structural`
    : `Write`;
}

var resolvePlatformApiAndAuthStructural: Dynamic;

var isPlatformApiAndAuthDropped: (platformApiAndAuthDropped?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var PlatformApiAndAuthBongoDraft: string;

var PlatformApiAndAuthRawDirty: string;

function resolvePlatformApiAndAuthBytes(
  bytes?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (bytes == null) return;
  if (bytes instanceof Uint8Array)
    return {
      bytes: bytes,
      baseSha: null,
      mtime: 0,
    };
  let bytes2: Dynamic = bytes;
  if (bytes2.bytes instanceof Uint8Array) return bytes2;
}

var platformApiAndAuthState8: Dynamic;

function resolvePlatformApiAndAuthNoIndexedDB(
  ..._extraArguments: unknown[]
): Dynamic {
  if (platformApiAndAuthState8 === undefined) {
    let promise: Dynamic = new (Promise as Dynamic)(
      (
        resolve?: Dynamic,
        reject?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let observabilityBrowserAndOperationEventsIndexedDB: Dynamic =
          resolveObservabilityBrowserAndOperationEventsIndexedDB();
        if (observabilityBrowserAndOperationEventsIndexedDB === null)
          throw Error(`no indexedDB`);
        let open: Dynamic =
          observabilityBrowserAndOperationEventsIndexedDB.open(
            PlatformApiAndAuthBongoDraft,
            1,
          );
        open.onupgradeneeded = (..._extraArguments: unknown[]): Dynamic =>
          open.result.createObjectStore(PlatformApiAndAuthRawDirty);
        open.onsuccess = (..._extraArguments: unknown[]): Dynamic =>
          resolve(open.result);
        open.onerror = (..._extraArguments: unknown[]): Dynamic =>
          reject(open.error);
      },
    );
    promise.catch((..._extraArguments: unknown[]): undefined => {
      if (platformApiAndAuthState8 === promise) {
        platformApiAndAuthState8 = undefined;
      }
    });
    platformApiAndAuthState8 = promise;
  }
  return platformApiAndAuthState8;
}

function resolvePlatformApiAndAuthThen(
  platformApiAndAuthThen?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformApiAndAuthNoIndexedDB().then(
    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      new (Promise as Dynamic)(
        (
          resolve?: Dynamic,
          reject?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let options2: Dynamic = options(
            result
              .transaction(PlatformApiAndAuthRawDirty, platformApiAndAuthThen)
              .objectStore(PlatformApiAndAuthRawDirty),
          );
          options2.onsuccess = (..._extraArguments: unknown[]): Dynamic =>
            resolve(options2.result);
          options2.onerror = (..._extraArguments: unknown[]): Dynamic =>
            reject(options2.error);
        },
      ),
  );
}

var isPlatformApiAndAuthByteLength2: (platformApiAndAuthByteLength2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var PlatformApiAndAuthGet: Dynamic;

var PlatformApiAndAuthTOMBSTONE: Dynamic;

var TOMBSTONE: Readonly<{
    deleted: true;
}>;

var isTombstone: Dynamic;

var isPlatformApiAndAuthByteLength3: (platformApiAndAuthByteLength3?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformApiAndAuth4Step1(): void {
  (resolvePlatformApiAndAuthStructural = (
    platformApiAndAuthStructural?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformApiAndAuthStructural.some(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        resolvePlatformApiAndAuthCall2(rolldownNImport2) === `Structural`,
    ));
  (isPlatformApiAndAuthDropped = (
    platformApiAndAuthDropped?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !(
      `dropped` in platformApiAndAuthDropped &&
      platformApiAndAuthDropped.dropped === true
    ));
  (PlatformApiAndAuthBongoDraft = `bongo-draft`);
  (PlatformApiAndAuthRawDirty = `rawDirty`);
  (isPlatformApiAndAuthByteLength2 = (
    platformApiAndAuthByteLength2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (platformApiAndAuthByteLength2.byteLength !== options.byteLength)
      return false;
    for (let index = 0; index < platformApiAndAuthByteLength2.byteLength; index++)
      if (platformApiAndAuthByteLength2[index] !== options[index]) return false;
    return true;
  });
  (PlatformApiAndAuthGet = {
    get: (
      platformApiAndAuthGet?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthThen(
        `readonly`,
        (
          platformApiAndAuthGet2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => platformApiAndAuthGet2.get(platformApiAndAuthGet),
      )
        .then(resolvePlatformApiAndAuthBytes)
        .catch((..._extraArguments: unknown[]): undefined => undefined),
    put: (
      platformApiAndAuthGet?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthThen(
        `readwrite`,
        (
          platformApiAndAuthGet2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => platformApiAndAuthGet2.put(options, platformApiAndAuthGet),
      ).catch((..._extraArguments: unknown[]): undefined => {}),
    del: (
      platformApiAndAuthGet?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthThen(
        `readwrite`,
        (
          platformApiAndAuthGet2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => platformApiAndAuthGet2.delete(platformApiAndAuthGet),
      ).catch((..._extraArguments: unknown[]): undefined => {}),
    delIfBytesEqual: (
      platformApiAndAuthGet?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthNoIndexedDB().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          new (Promise as Dynamic)(
            (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              let enabled = false;
              let platformApiAndAuthGetResult: Dynamic;
              try {
                platformApiAndAuthGetResult = result.transaction(
                  PlatformApiAndAuthRawDirty,
                  `readwrite`,
                );
              } catch {
                resolve(false);
                return;
              }
              platformApiAndAuthGetResult.oncomplete = (
                ..._extraArguments: unknown[]
              ): Dynamic => resolve(enabled);
              platformApiAndAuthGetResult.onerror = (
                ..._extraArguments: unknown[]
              ): Dynamic => resolve(false);
              platformApiAndAuthGetResult.onabort = (
                ..._extraArguments: unknown[]
              ): Dynamic => resolve(false);
              let objectStore: Dynamic = platformApiAndAuthGetResult.objectStore(
                PlatformApiAndAuthRawDirty,
              );
              let objectStoreEntry: Dynamic = objectStore.get(
                platformApiAndAuthGet,
              );
              objectStoreEntry.onsuccess = (
                ..._extraArguments: unknown[]
              ): undefined => {
                let platformApiAndAuthBytes: Dynamic =
                  resolvePlatformApiAndAuthBytes(objectStoreEntry.result);
                if (platformApiAndAuthBytes === undefined) {
                  enabled = true;
                  return;
                }
                if (
                  !isPlatformApiAndAuthByteLength2(
                    platformApiAndAuthBytes.bytes,
                    options,
                  )
                )
                  return;
                let result2: Dynamic = objectStore.delete(platformApiAndAuthGet);
                result2.onsuccess = (
                  ..._extraArguments: unknown[]
                ): undefined => {
                  enabled = true;
                };
              };
            },
          ),
        (..._extraArguments: unknown[]) => true,
      ),
    clear: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformApiAndAuthThen(
        `readwrite`,
        (
          platformApiAndAuthGet?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => platformApiAndAuthGet.clear(),
      ).catch((..._extraArguments: unknown[]): undefined => {}),
    all: (..._extraArguments: unknown[]): Dynamic =>
      resolveObservabilityBrowserAndOperationEventsIndexedDB() === null
        ? Promise.resolve([])
        : resolvePlatformApiAndAuthNoIndexedDB().then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              new (Promise as Dynamic)(
                (
                  resolve?: Dynamic,
                  reject?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let items: Dynamic = [];
                  let platformApiAndAuthGetResult: Dynamic;
                  try {
                    platformApiAndAuthGetResult = result.transaction(
                      PlatformApiAndAuthRawDirty,
                    );
                  } catch (platformApiAndAuthGetResult2: Dynamic) {
                    reject(platformApiAndAuthGetResult2);
                    return;
                  }
                  let openCursor: Dynamic = platformApiAndAuthGetResult
                    .objectStore(PlatformApiAndAuthRawDirty)
                    .openCursor();
                  openCursor.onsuccess = (
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    let result2: Dynamic = openCursor.result;
                    if (result2) {
                      let platformApiAndAuthBytes: Dynamic =
                        resolvePlatformApiAndAuthBytes(result2.value);
                      if (platformApiAndAuthBytes) {
                        items.push([
                          String(result2.key),
                          platformApiAndAuthBytes,
                        ]);
                      }
                      result2.continue();
                    } else resolve(items);
                  };
                  openCursor.onerror = (..._extraArguments: unknown[]): Dynamic =>
                    reject(openCursor.error ?? Error(`idb cursor error`));
                },
              ),
          ),
  });
  (PlatformApiAndAuthTOMBSTONE = createLiveModuleNamespace({
    TOMBSTONE: (..._extraArguments: unknown[]) => TOMBSTONE,
    _wireRevBump: (..._extraArguments: unknown[]): Dynamic => _wireRevBump,
    ackFlushed: (..._extraArguments: unknown[]): Dynamic => ackFlushed,
    announce: (..._extraArguments: unknown[]): Dynamic => announce,
    anyDirtySync: (..._extraArguments: unknown[]): Dynamic => anyDirtySync,
    createDraftLayer: (..._extraArguments: unknown[]): Dynamic =>
      createDraftLayer,
    discardUnder: (..._extraArguments: unknown[]): Dynamic => discardUnder,
    dropEntry: (..._extraArguments: unknown[]): Dynamic => dropEntry,
    ensureSettled: (..._extraArguments: unknown[]): Dynamic => ensureSettled,
    ensureStarted: (..._extraArguments: unknown[]): Dynamic => ensureStarted,
    flushSnapshot: (..._extraArguments: unknown[]): Dynamic => flushSnapshot,
    forgetEntry: (..._extraArguments: unknown[]): Dynamic => forgetEntry,
    getBytesSync: (..._extraArguments: unknown[]): Dynamic => getBytesSync,
    hasEntrySync: (..._extraArguments: unknown[]): Dynamic => hasEntrySync,
    isDeletedSync: (..._extraArguments: unknown[]): Dynamic => isDeletedSync,
    isTombstone: (..._extraArguments: unknown[]): Dynamic => isTombstone,
    listEntriesSync: (..._extraArguments: unknown[]): Dynamic => listEntriesSync,
    listLiveSync: (..._extraArguments: unknown[]): Dynamic => listLiveSync,
    markFlushDead: (..._extraArguments: unknown[]): Dynamic => markFlushDead,
    moveEntry: (..._extraArguments: unknown[]): Dynamic => moveEntry,
    moveUnder: (..._extraArguments: unknown[]): Dynamic => moveUnder,
    parkConflict: (..._extraArguments: unknown[]): Dynamic => parkConflict,
    persistOpenEdit: (..._extraArguments: unknown[]): Dynamic => persistOpenEdit,
    purgeIfFlushAcked: (..._extraArguments: unknown[]): Dynamic =>
      purgeIfFlushAcked,
    readValidated: (..._extraArguments: unknown[]): Dynamic => readValidated,
    stashBytes: (..._extraArguments: unknown[]): Dynamic => stashBytes,
    unloadAfterAck: (..._extraArguments: unknown[]): Dynamic => unloadAfterAck,
  }));
  (TOMBSTONE = Object.freeze({
    deleted: true,
  }));
  (isTombstone = (input?: Dynamic, ..._extraArguments: unknown[]) =>
    input !== undefined && !(input instanceof Uint8Array));
  (isPlatformApiAndAuthByteLength3 = (
    platformApiAndAuthByteLength3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (platformApiAndAuthByteLength3.byteLength !== options.byteLength)
      return false;
    for (let index = 0; index < platformApiAndAuthByteLength3.byteLength; index++)
      if (platformApiAndAuthByteLength3[index] !== options[index]) return false;
    return true;
  });
}

export {
  PlatformApiAndAuthGet,
  PlatformApiAndAuthTOMBSTONE,
  TOMBSTONE,
  isPlatformApiAndAuthByteLength3,
  isPlatformApiAndAuthDropped,
  isPlatformApiAndAuthPath,
  isTombstone,
  resolvePlatformApiAndAuthCall2,
  resolvePlatformApiAndAuthStructural,
};

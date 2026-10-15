/** BaoCut: data operation control from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  React,
  ReactDOM,
  jsxRuntime,
} from "./platform-core-dependencies";
import {
  withBusyRetry,
} from "./platform-core-platform-session-and-sources-1";
import {
  isEditorExtensionsRoot,
} from "./platform-core-editor-extensions-2";
import {
  PlatformKeyboardAndSaveStatusOrientation,
  resolvePlatformKeyboardAndSaveStatusKept,
} from "./platform-core-platform-keyboard-and-save-status";
import {
  toast,
} from "./platform-core-ui-toasts";
import {
  isObservabilityBrowserAndOperationEventsStartsWith,
  resolveObservabilityBrowserAndOperationEventsIsFinite2,
  resolveObservabilityBrowserAndOperationEventsPrefix,
} from "./platform-core-observability-browser-and-operation-events-3";
import {
  ackOf,
  batchAckOf,
  liveDoor,
} from "./platform-core-platform-api-and-auth-2";
import {
  resolvePlatformApiAndAuthSafeParse,
} from "./platform-core-platform-api-and-auth-5";
import {
  resolveDataModelSchemasFrame,
} from "./platform-core-data-model-schemas-3";
import {
  loadPlatformSyncAndRoutingClipboard,
} from "./platform-core-platform-sync-and-routing-1";
import {
  PlatformSyncAndRoutingBirthRefused,
  loadPlatformSyncAndRoutingFinal,
  resolvePlatformSyncAndRoutingLid,
  resolvePlatformSyncAndRoutingRef,
  resolvePlatformSyncAndRoutingRef2,
} from "./platform-core-platform-sync-and-routing-2";
import {
  DataOperationControlBongoOpWal,
  DataOperationControlWal,
  filterDataOperationControlBid,
  isPlainRecord,
  resolveDataOperationControlAfterId,
  resolveDataOperationControlBid2,
  resolveDataOperationControlBid3,
  resolveDataOperationControlCatch,
  resolveDataOperationControlValue31,
  resolveDataOperationControlValue32,
  updateDataOperationControlLeft,
} from "./platform-core-data-operation-control-4";

function resolveDataOperationControlValue33(
  dataOperationControlValue33?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = false,
  argument2?: Dynamic,
  argument3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return dataOperationControlValue33 === ``
    ? loadDataOperationControlLoad(
        resolveDataOperationControlEndsWith(dependencies, options, argument),
      )
    : loadDataOperationControlBid(
        context,
        `${dataOperationControlValue33}|${options}`,
        dependencies,
        argument,
        argument2,
        argument3,
      );
}

var resolveDataOperationControlEndsWith: Dynamic;

function loadDataOperationControlLoad(
  strays?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let loadDataOperationControlLoadHandler: Dynamic = (
    dataOperationControlLoad?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (lookup.get(dataOperationControlLoad) ?? []).filter(
      (lookupEntry?: Dynamic, ..._extraArguments: unknown[]) =>
        lookupEntry.opId !== options,
    );
  return {
    load: async (
      dataOperationControlLoad?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => [...(lookup.get(dataOperationControlLoad) ?? [])],
    append: async (
      dataOperationControlLoad?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> =>
      void lookup.set(dataOperationControlLoad, [
        ...(lookup.get(dataOperationControlLoad) ?? []),
        options,
      ]),
    trim: async (
      dataOperationControlLoad?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> =>
      void lookup.set(
        dataOperationControlLoad,
        loadDataOperationControlLoadHandler(dataOperationControlLoad, options),
      ),
    rewrite: async (
      dataOperationControlLoad?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> =>
      void lookup.set(dataOperationControlLoad, [
        ...loadDataOperationControlLoadHandler(
          dataOperationControlLoad,
          options.opId,
        ),
        options,
      ]),
    ...(strays
      ? {
          strays: strays,
        }
      : {}),
  };
}

function loadDataOperationControlReady(
  dataOperationControlReady?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlCatch: Dynamic =
    resolveDataOperationControlCatch(dependencies);
  let loadDataOperationControlReadyResult: Dynamic = null;
  let items: Dynamic = [];
  let then: Dynamic = dataOperationControlReady
    .then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result,
      (..._extraArguments: unknown[]) => ``,
    )
    .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let enabled = false;
      try {
        loadDataOperationControlReadyResult =
          result === ``
            ? loadDataOperationControlLoad(context)
            : options(result);
      } catch {
        loadDataOperationControlReadyResult =
          loadDataOperationControlLoad(context);
        enabled = true;
      }
      for (let loadDataOperationControlReadyResult2 of items.splice(
        0,
      ) as Dynamic)
        try {
          loadDataOperationControlReadyResult2();
        } catch {}
      if (enabled) {
        dataOperationControlCatch(`opener`);
      }
    });
  let ready: Dynamic = then
    .then(
      (..._extraArguments: unknown[]): Dynamic =>
        loadDataOperationControlReadyResult?.ready,
    )
    .then(
      (..._extraArguments: unknown[]): undefined => undefined,
      (..._extraArguments: unknown[]): undefined => undefined,
    );
  let dataOperationControlReady2 = (
    dataOperationControlReady4?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined =>
    void (loadDataOperationControlReadyResult
      ? dataOperationControlReady4(loadDataOperationControlReadyResult)
      : items.push(
          (..._extraArguments: unknown[]): Dynamic =>
            dataOperationControlReady4(loadDataOperationControlReadyResult),
        ));
  let dataOperationControlReady3: Dynamic = async (
    dataOperationControlReady4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => (
    await then,
    dataOperationControlReady4(loadDataOperationControlReadyResult)
  );
  return {
    ready: ready,
    left: (
      dataOperationControlReady4?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      loadDataOperationControlReadyResult?.left?.(
        dataOperationControlReady4,
        options2,
      ) ?? null,
    kept: (
      dataOperationControlReady4?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      dataOperationControlReady2(
        (
          dataOperationControlReady5?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlReady5.kept?.(dataOperationControlReady4),
      ),
    twinKept: (
      dataOperationControlReady4?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      dataOperationControlReady2(
        (
          dataOperationControlReady5?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlReady5.twinKept?.(dataOperationControlReady4),
      ),
    load: (
      dataOperationControlReady4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationControlReady3(
        (
          dataOperationControlReady5?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlReady5.load(dataOperationControlReady4),
      ),
    append: (
      dataOperationControlReady4?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationControlReady3(
        (
          dataOperationControlReady5?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlReady5.append(
            dataOperationControlReady4,
            options2,
          ),
      ),
    trim: (
      dataOperationControlReady4?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationControlReady3(
        (
          dataOperationControlReady5?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlReady5.trim(dataOperationControlReady4, options2),
      ),
    rewrite: (
      dataOperationControlReady4?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationControlReady3(
        (
          dataOperationControlReady5?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlReady5.rewrite
            ? dataOperationControlReady5.rewrite(
                dataOperationControlReady4,
                options2,
              )
            : dataOperationControlReady5
                .trim(dataOperationControlReady4, options2.opId)
                .then(
                  (..._extraArguments: unknown[]): Dynamic =>
                    dataOperationControlReady5.append(
                      dataOperationControlReady4,
                      options2,
                    ),
                ),
      ),
    stage: (
      dataOperationControlReady4?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      dataOperationControlReady2(
        (
          dataOperationControlReady5?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlReady5.stage?.(
            dataOperationControlReady4,
            options2,
          ),
      ),
    stageWords: (
      dataOperationControlReady4?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      loadDataOperationControlReadyResult
        ? loadDataOperationControlReadyResult.stageWords?.(
            dataOperationControlReady4,
            options2,
          )
        : dataOperationControlReady2(
            (
              dataOperationControlReady5?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined =>
              void dataOperationControlReady5.stageWords?.(
                dataOperationControlReady4,
                options2,
              ),
          ),
    stagedWords: (
      dataOperationControlReady4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      loadDataOperationControlReadyResult
        ? (loadDataOperationControlReadyResult.stagedWords?.(
            dataOperationControlReady4,
          ) ?? [])
        : [],
    strays: (
      dataOperationControlReady4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      loadDataOperationControlReadyResult
        ? (loadDataOperationControlReadyResult.strays?.(
            dataOperationControlReady4,
          ) ?? 0)
        : (context?.(dataOperationControlReady4) ?? 0),
    stagedLives: (
      dataOperationControlReady4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      loadDataOperationControlReadyResult?.stagedLives?.(
        dataOperationControlReady4,
      ) ?? [],
    release: (..._extraArguments: unknown[]) =>
      dataOperationControlReady2(
        (
          dataOperationControlReady4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationControlReady4.release?.(),
      ),
  };
}

function loadDataOperationControlBid(
  dataOperationControlBid?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = false,
  argument?: Dynamic,
  argument2?: Dynamic,
  argument3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlCatch: Dynamic =
    resolveDataOperationControlCatch(argument);
  if (context && argument3)
    try {
      isObservabilityBrowserAndOperationEventsStartsWith(
        context,
        `${options}|`,
        argument3(),
      );
    } catch {}
  let updateDataOperationControlLeft2: Dynamic = context
    ? updateDataOperationControlLeft(context, options, dependencies, argument2)
    : null;
  let seq: Dynamic = 0;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let lookup: Dynamic = new (Map as Dynamic)();
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let loadDataOperationControlBidHandler: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => JSON.stringify([dataOperationControlBid2, options2]);
  let next = (
    dataOperationControlBid2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    uniqueItems2.add(
      loadDataOperationControlBidHandler(dataOperationControlBid2, options2),
    );
    if (uniqueItems2.size > 1024) {
      uniqueItems2.delete(uniqueItems2.values().next().value);
    }
  };
  let loadDataOperationControlBidHandler2: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    uniqueItems2.has(
      loadDataOperationControlBidHandler(dataOperationControlBid2, options2),
    );
  let lookup2: Dynamic = new (Map as Dynamic)();
  let next2: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    options2?: Dynamic,
    context2?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlBidHandler: Dynamic =
      loadDataOperationControlBidHandler(dataOperationControlBid2, options2);
    let lookupEntry: Dynamic = lookup2.get(dataOperationControlBidHandler);
    let min: Dynamic =
      typeof context2 == `number` && Number.isFinite(context2)
        ? Math.min(context2, lookupEntry ?? 1 / 0)
        : lookupEntry;
    if (min !== undefined && min !== lookupEntry) {
      lookup2.set(dataOperationControlBidHandler, min);
      if (lookup2.size > 1024) {
        lookup2.delete(lookup2.keys().next().value);
      }
    }
    return min;
  };
  let loadDataOperationControlBidHandler3 = (
    dataOperationControlBid2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${DataOperationControlBongoOpWal}:stage:${options}|${dataOperationControlBid2}`;
  let getItem: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let parse: Dynamic = JSON.parse(
        context?.getItem(
          loadDataOperationControlBidHandler3(dataOperationControlBid2),
        ) ?? `[]`,
      );
      return Array.isArray(parse)
        ? parse.filter(
            (parse2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              isPlainRecord(parse2) &&
              typeof parse2.opId == `string` &&
              Array.isArray(parse2.ops),
          )
        : [];
    } catch {
      return [];
    }
  };
  let getItem2: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    getItem(dataOperationControlBid2).map(
      ({ at: at2, ...item }: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        item,
    );
  let setItem = (
    dataOperationControlBid2?: Dynamic,
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      if (items.length === 0) {
        context?.removeItem(
          loadDataOperationControlBidHandler3(dataOperationControlBid2),
        );
      } else {
        context?.setItem(
          loadDataOperationControlBidHandler3(dataOperationControlBid2),
          JSON.stringify(items.slice(-64)),
        );
      }
    } catch {
      dataOperationControlCatch(`stage_write`);
    }
  };
  let loadDataOperationControlBidHandler4 = (
    dataOperationControlBid2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${DataOperationControlBongoOpWal}:words:${options}|${dataOperationControlBid2}`;
  let lookup3: Dynamic = new (Map as Dynamic)();
  let setItem2: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!(!context || argument3 === undefined))
      try {
        if (
          context.getItem(
            loadDataOperationControlBidHandler4(dataOperationControlBid2),
          ) === null
        ) {
          lookup3.delete(dataOperationControlBid2);
          return context.removeItem(
            resolveObservabilityBrowserAndOperationEventsPrefix(
              `${options}|${dataOperationControlBid2}`,
            ),
          );
        }
        if (!options2) return;
        let argument4: Dynamic = argument3();
        let lookupEntry: Dynamic = lookup3.get(dataOperationControlBid2);
        if (lookupEntry !== undefined && argument4 - lookupEntry < 36e5) return;
        context.setItem(
          resolveObservabilityBrowserAndOperationEventsPrefix(
            `${options}|${dataOperationControlBid2}`,
          ),
          String(argument4),
        );
        lookup3.set(dataOperationControlBid2, argument4);
      } catch {}
  };
  let enabled = false;
  let isPlainRecord2: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    options2: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let parse: Dynamic = JSON.parse(
        context?.getItem(
          loadDataOperationControlBidHandler4(dataOperationControlBid2),
        ) ?? `[]`,
      );
      if (!Array.isArray(parse)) return [];
      let items: Dynamic = [];
      for (let ask of parse as Dynamic) {
        if (
          !isPlainRecord(ask) ||
          typeof ask.bid != `string` ||
          typeof ask.text != `string` ||
          ask.text === ``
        )
          continue;
        let ask2: Dynamic = {
          bid: ask.bid,
          afterId: typeof ask.afterId == `string` ? ask.afterId : null,
          text: ask.text,
        };
        if (ask.real === true) {
          ask2.real = true;
        }
        if (ask.tray === true) {
          ask2.tray = true;
        }
        let platformKeyboardAndSaveStatusKept =
          resolvePlatformKeyboardAndSaveStatusKept(ask.cut);
        if (platformKeyboardAndSaveStatusKept) {
          ask2.cut = platformKeyboardAndSaveStatusKept;
        }
        if (typeof ask.author == `string` || ask.author === null) {
          ask2.author = ask.author;
        }
        if (options2 && typeof ask.by == `string`) {
          Object.assign(ask2, {
            by: ask.by,
          });
        }
        if (
          typeof ask.of == `string` &&
          isPlainRecord(ask.was) &&
          typeof ask.was.bid == `string`
        ) {
          Object.assign(ask2, {
            of: ask.of,
            was: {
              bid: ask.was.bid,
              afterId:
                typeof ask.was.afterId == `string` ? ask.was.afterId : null,
              ...(ask.was.tray === true
                ? {
                    tray: true,
                  }
                : {}),
            },
          });
        }
        items.push(ask2);
      }
      return items;
    } catch {
      return [];
    }
  };
  let getItem3: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let item: Dynamic = getItem2(dataOperationControlBid2);
    let lookup6: Dynamic = new (Map as Dynamic)(
      item
        .filter(
          (item2?: Dynamic, ..._extraArguments: unknown[]) =>
            item2.held === true,
        )
        .map(
          (filteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
            filteredItem.opId,
            filteredItem,
          ],
        ),
    );
    let mappedOptions: Dynamic = options2.map(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        lookup6.get(option.opId) ?? option,
    );
    let uniqueItems3: Dynamic = new (Set as Dynamic)(
      mappedOptions.map(
        (mappedOption?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          mappedOption.opId,
      ),
    );
    return [
      ...mappedOptions,
      ...item.filter(
        (item2?: Dynamic, ..._extraArguments: unknown[]) =>
          !uniqueItems3.has(item2.opId),
      ),
    ];
  };
  let loadDataOperationControlBidResult: Dynamic = null;
  let loadDataOperationControlBidHandler5: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (loadDataOperationControlBidResult ??= new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (dataOperationControlBid === null) return resolve(null);
        try {
          let open: Dynamic = dataOperationControlBid.open(
            DataOperationControlBongoOpWal,
            1,
          );
          open.addEventListener(
            `upgradeneeded`,
            (..._extraArguments: unknown[]): Dynamic =>
              open.result.createObjectStore(DataOperationControlWal),
          );
          open.addEventListener(
            `success`,
            (..._extraArguments: unknown[]): undefined => {
              open.result.addEventListener(
                `versionchange`,
                (..._extraArguments: unknown[]): undefined => {
                  open.result.close();
                  loadDataOperationControlBidResult = Promise.resolve(null);
                  dataOperationControlCatch(`idb_gone`);
                },
              );
              resolve(open.result);
            },
          );
          open.addEventListener(
            `error`,
            (..._extraArguments: unknown[]): Dynamic => (
              resolve(null),
              dataOperationControlCatch(`idb_open`)
            ),
          );
          open.addEventListener(
            `blocked`,
            (..._extraArguments: unknown[]): Dynamic => (
              resolve(null),
              dataOperationControlCatch(`idb_blocked`)
            ),
          );
        } catch {
          resolve(null);
          dataOperationControlCatch(`idb_open`);
        }
      },
    ));
  let objectStore: Dynamic = async (
    dataOperationControlBid2?: Dynamic,
    options2?: Dynamic,
    context2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    try {
      let transaction: Dynamic = dataOperationControlBid2.transaction(
        DataOperationControlWal,
        options2,
      );
      let context3: Dynamic = context2(
        transaction.objectStore(DataOperationControlWal),
      );
      await new (Promise as Dynamic)(
        (
          resolve?: Dynamic,
          reject?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          transaction.addEventListener(
            `complete`,
            (..._extraArguments: unknown[]): Dynamic => resolve(),
          );
          transaction.addEventListener(
            `error`,
            (..._extraArguments: unknown[]): Dynamic =>
              reject(transaction.error ?? Error(`wal transaction failed`)),
          );
          transaction.addEventListener(
            `abort`,
            (..._extraArguments: unknown[]): Dynamic =>
              reject(transaction.error ?? Error(`wal transaction aborted`)),
          );
        },
      );
      return context3;
    } catch (loadDataOperationControlBidResult2: Dynamic) {
      throw (
        dataOperationControlCatch(
          options2 === `readonly` ? `load` : `idb_write`,
        ),
        loadDataOperationControlBidResult2
      );
    }
  };
  let bound: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    IDBKeyRange.bound(
      [options, dataOperationControlBid2, -1 / 0],
      [options, dataOperationControlBid2, 1 / 0],
    );
  let resolveDataOperationControlValue322: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (context) {
      resolveDataOperationControlBid3(
        context,
        loadDataOperationControlBidHandler4(dataOperationControlBid2),
        updateDataOperationControlLeft2?.id ?? `1`,
      );
    }
    let isPlainRecord3: Dynamic = isPlainRecord2(dataOperationControlBid2);
    let index = 0;
    for (let loadDataOperationControlBidResult2 of isPlainRecord3 as Dynamic)
      if (loadDataOperationControlBidResult2.tray !== true) {
        Object.assign(loadDataOperationControlBidResult2, {
          bid: resolveDataOperationControlValue32(
            updateDataOperationControlLeft2?.id ?? `1`,
            `m${++index}`,
          ),
          afterId: null,
          tray: true,
        });
      }
    return isPlainRecord3;
  };
  let lookup4: Dynamic = new (Map as Dynamic)();
  let lookup5: Dynamic = new (Map as Dynamic)();
  let keptUnder: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let keptUnder3: Dynamic = updateDataOperationControlLeft2?.keptUnder(
      loadDataOperationControlBidHandler4(dataOperationControlBid2),
    );
    let index = 0;
    for (let ask of options2 as Dynamic)
      if (
        ask.tray !== true &&
        keptUnder3?.has(resolveDataOperationControlAfterId(ask))
      ) {
        let bid = resolveDataOperationControlValue32(
          updateDataOperationControlLeft2.id,
          `m${++index}`,
        );
        lookup5.set(bid, {
          bid: ask.bid,
          afterId: ask.afterId ?? null,
          id: resolveDataOperationControlAfterId(ask),
        });
        Object.assign(ask, {
          bid: bid,
          afterId: null,
          tray: true,
        });
      }
    return options2;
  };
  let keptUnder2: Dynamic = (
    dataOperationControlBid2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let keptUnder3: Dynamic = updateDataOperationControlLeft2?.keptUnder(
      loadDataOperationControlBidHandler4(dataOperationControlBid2),
    );
    return keptUnder3
      ? keptUnder(
          dataOperationControlBid2,
          isPlainRecord2(dataOperationControlBid2).filter(
            (
              isPlainRecord3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              keptUnder3.has(
                resolveDataOperationControlAfterId(isPlainRecord3),
              ),
          ),
        )
      : [];
  };
  let record2: Dynamic = {
    ...(updateDataOperationControlLeft2?.settled()
      ? {
          ready: updateDataOperationControlLeft2.settled(),
        }
      : {}),
    left: (
      dataOperationControlBid2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      updateDataOperationControlLeft2?.left(
        dataOperationControlBid2,
        options2,
      ) ?? null,
    kept: (
      dataOperationControlBid2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      updateDataOperationControlLeft2?.onKept(
        (..._extraArguments: unknown[]): Dynamic =>
          dataOperationControlBid2(
            (
              dataOperationControlBid3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => keptUnder2(dataOperationControlBid3),
          ),
      ),
    twinKept: (
      dataOperationControlBid2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      updateDataOperationControlLeft2?.onTwinKept(dataOperationControlBid2),
    stage(
      dataOperationControlBid2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!context) return;
      let item: Dynamic = getItem(dataOperationControlBid2);
      let at2: Dynamic = item.find(
        (item2?: Dynamic, ..._extraArguments: unknown[]) =>
          item2.opId === options2.opId,
      )?.at;
      let at3: Dynamic =
        argument3 === undefined
          ? at2
          : next2(
              dataOperationControlBid2,
              options2.opId,
              Math.min(argument3(), typeof at2 == `number` ? at2 : 1 / 0),
            );
      setItem(dataOperationControlBid2, [
        ...item.filter(
          (item2?: Dynamic, ..._extraArguments: unknown[]) =>
            item2.opId !== options2.opId,
        ),
        at3 === undefined
          ? options2
          : {
              ...options2,
              at: at3,
            },
      ]);
    },
    stageWords(
      dataOperationControlBid2?: Dynamic,
      ask?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (!context) return;
      if (updateDataOperationControlLeft2?.pending())
        return void updateDataOperationControlLeft2.later(
          (..._extraArguments: unknown[]): undefined => {
            if (!lookup4.has(dataOperationControlBid2)) {
              lookup4.set(
                dataOperationControlBid2,
                record2.stagedWords(dataOperationControlBid2),
              );
            }
            record2.stageWords(dataOperationControlBid2, ask);
          },
        );
      if (updateDataOperationControlLeft2?.twins(dataOperationControlBid2)) {
        updateDataOperationControlLeft2.park(
          loadDataOperationControlBidHandler4(dataOperationControlBid2),
        );
      } else {
        if (
          updateDataOperationControlLeft2?.unproven(dataOperationControlBid2)
        ) {
          resolveDataOperationControlValue322(dataOperationControlBid2);
        }
      }
      let lookupEntry: Dynamic =
        ask.only === true && ask.text === `` ? lookup5.get(ask.bid) : undefined;
      let isPlainRecord3: Dynamic = isPlainRecord2(
        dataOperationControlBid2,
        true,
      );
      let record3: Dynamic =
        updateDataOperationControlLeft2 &&
        updateDataOperationControlLeft2.id !== `1` &&
        ask.text !== ``
          ? {
              by: updateDataOperationControlLeft2.id,
            }
          : {};
      let filteredFilterDataOperationControlBid: Dynamic =
        filterDataOperationControlBid(isPlainRecord3, {
          ...(lookupEntry
            ? {
                ...ask,
                bid: lookupEntry.bid,
                afterId: lookupEntry.afterId,
              }
            : ask),
          ...record3,
        }).filter(
          (
            filterDataOperationControlBid2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let dataOperationControlBid22: Dynamic =
              resolveDataOperationControlBid2(
                filterDataOperationControlBid2,
                updateDataOperationControlLeft2?.id,
              );
            return (
              dataOperationControlBid22 === null ||
              filterDataOperationControlBid(
                [dataOperationControlBid22],
                ask,
              ).includes(dataOperationControlBid22)
            );
          },
        );
      if (lookupEntry) {
        filteredFilterDataOperationControlBid =
          filteredFilterDataOperationControlBid.filter(
            (
              filteredFilterDataOperationControlBid2?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              resolveDataOperationControlAfterId(
                filteredFilterDataOperationControlBid2,
              ) !== lookupEntry.id,
          );
      }
      let items: Dynamic = [
        updateDataOperationControlLeft2?.parkedUnder(
          loadDataOperationControlBidHandler4(dataOperationControlBid2),
        ),
        updateDataOperationControlLeft2?.keptUnder(
          loadDataOperationControlBidHandler4(dataOperationControlBid2),
        ),
      ];
      if (!lookupEntry && (items[0] || items[1])) {
        let filteredIsPlainRecord: Dynamic = isPlainRecord3.filter(
          (isPlainRecord4?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            isPlainRecord4.tray !== true &&
            (items[0]?.has(
              resolveDataOperationControlAfterId(isPlainRecord4),
            ) ||
              items[1]?.has(
                resolveDataOperationControlAfterId(isPlainRecord4),
              )) &&
            !filteredFilterDataOperationControlBid.some(
              (
                filteredFilterDataOperationControlBid2?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                resolveDataOperationControlAfterId(
                  filteredFilterDataOperationControlBid2,
                ) === resolveDataOperationControlAfterId(isPlainRecord4),
            ),
        );
        if (filteredIsPlainRecord.length > 0) {
          filteredFilterDataOperationControlBid = [
            ...filteredIsPlainRecord,
            ...filteredFilterDataOperationControlBid,
          ];
        }
      }
      try {
        if (filteredFilterDataOperationControlBid.length === 0) {
          context.removeItem(
            loadDataOperationControlBidHandler4(dataOperationControlBid2),
          );
        } else {
          context.setItem(
            loadDataOperationControlBidHandler4(dataOperationControlBid2),
            JSON.stringify(filteredFilterDataOperationControlBid),
          );
        }
        if (filteredFilterDataOperationControlBid.length > 0) {
          updateDataOperationControlLeft2?.assert();
        }
        setItem2(
          dataOperationControlBid2,
          filteredFilterDataOperationControlBid.length > 0 && ask.text !== ``,
        );
        return true;
      } catch (loadDataOperationControlBidResult2: Dynamic) {
        if (!enabled) {
          enabled = true;
          console.error(
            `opTransport: the words stage refused a write (${loadDataOperationControlBidResult2 instanceof Error ? loadDataOperationControlBidResult2.name : `error`}; ${filteredFilterDataOperationControlBid.length} run(s), ${filteredFilterDataOperationControlBid.reduce((accumulator?: Dynamic, filteredFilterDataOperationControlBid2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => accumulator + filteredFilterDataOperationControlBid2.text.length, 0)} chars) — words kept in memory and on the tray this life would not survive a reload`,
          );
        }
        dataOperationControlCatch(`words_write`);
        return false;
      }
    },
    stagedWords(
      dataOperationControlBid2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (!context || !updateDataOperationControlLeft2)
        return isPlainRecord2(dataOperationControlBid2);
      if (updateDataOperationControlLeft2.pending()) return [];
      let lookupEntry: Dynamic = lookup4.get(dataOperationControlBid2);
      if (lookupEntry !== undefined) {
        lookup4.delete(dataOperationControlBid2);
        return lookupEntry;
      }
      if (updateDataOperationControlLeft2.unproven(dataOperationControlBid2))
        return resolveDataOperationControlValue322(dataOperationControlBid2);
      if (updateDataOperationControlLeft2.twins(dataOperationControlBid2)) {
        updateDataOperationControlLeft2.park(
          loadDataOperationControlBidHandler4(dataOperationControlBid2),
        );
      }
      let parkedUnder: Dynamic = updateDataOperationControlLeft2.parkedUnder(
        loadDataOperationControlBidHandler4(dataOperationControlBid2),
      );
      return keptUnder(
        dataOperationControlBid2,
        parkedUnder
          ? isPlainRecord2(dataOperationControlBid2).filter(
              (isPlainRecord3?: Dynamic, ..._extraArguments: unknown[]) =>
                !parkedUnder.has(
                  resolveDataOperationControlAfterId(isPlainRecord3),
                ),
            )
          : isPlainRecord2(dataOperationControlBid2),
      ).map(
        (keptUnder3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveDataOperationControlBid2(
            keptUnder3,
            updateDataOperationControlLeft2.id,
          ) ?? keptUnder3,
      );
    },
    stagedLives: (
      dataOperationControlBid2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => [
      ...new (Set as Dynamic)(
        getItem2(dataOperationControlBid2).flatMap(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            typeof item.life == `string` ? [item.life] : [],
        ),
      ),
    ],
    release: (..._extraArguments: unknown[]): Dynamic =>
      updateDataOperationControlLeft2?.release(),
    async load(
      dataOperationControlBid2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let dataOperationControlBidHandler: Dynamic =
        await loadDataOperationControlBidHandler5();
      if (!dataOperationControlBidHandler)
        return getItem3(dataOperationControlBid2, [
          ...(lookup.get(dataOperationControlBid2) ?? []),
        ]);
      let objectStore2: Dynamic = await objectStore(
        dataOperationControlBidHandler,
        `readonly`,
        (
          dataOperationControlBid3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlBid3.getAll(bound(dataOperationControlBid2)),
      );
      uniqueItems.add(dataOperationControlBid2);
      let uniqueItems3: Dynamic = new (Set as Dynamic)();
      let flatMap: Dynamic = (objectStore2.result ?? []).flatMap(
        (
          { seq: seq2, at: at2, ...result }: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          seq = Math.max(seq, seq2);
          let matchesArgument: Dynamic =
            argument3 !== undefined &&
            resolveObservabilityBrowserAndOperationEventsIsFinite2(
              at2,
              argument3(),
            );
          return typeof result.opId == `string`
            ? matchesArgument
              ? (uniqueItems3.add(result.opId), [])
              : (next2(dataOperationControlBid2, result.opId, at2), [result])
            : matchesArgument
              ? []
              : [result];
        },
      );
      return uniqueItems3.size === 0
        ? getItem3(dataOperationControlBid2, flatMap)
        : getItem3(dataOperationControlBid2, flatMap).filter(
            (item?: Dynamic, ..._extraArguments: unknown[]) =>
              !uniqueItems3.has(item.opId),
          );
    },
    async append(
      dataOperationControlBid2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      let dataOperationControlBidHandler: Dynamic =
        await loadDataOperationControlBidHandler5();
      if (
        loadDataOperationControlBidHandler2(
          dataOperationControlBid2,
          options2.opId,
        )
      )
        return;
      if (!dataOperationControlBidHandler)
        return void lookup.set(dataOperationControlBid2, [
          ...(lookup.get(dataOperationControlBid2) ?? []),
          options2,
        ]);
      if (!uniqueItems.has(dataOperationControlBid2)) {
        await record2.load(dataOperationControlBid2);
      }
      if (
        loadDataOperationControlBidHandler2(
          dataOperationControlBid2,
          options2.opId,
        )
      )
        return;
      seq += 1;
      let items: Dynamic = [options, dataOperationControlBid2, seq];
      let next3: Dynamic =
        argument3 === undefined
          ? undefined
          : next2(dataOperationControlBid2, options2.opId, argument3());
      await objectStore(
        dataOperationControlBidHandler,
        `readwrite`,
        (
          dataOperationControlBid3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dataOperationControlBid3.put(
            {
              ...options2,
              seq: seq,
              ...(next3 === undefined
                ? {}
                : {
                    at: next3,
                  }),
            },
            items,
          ),
      );
      if (
        loadDataOperationControlBidHandler2(
          dataOperationControlBid2,
          options2.opId,
        )
      ) {
        await objectStore(
          dataOperationControlBidHandler,
          `readwrite`,
          (
            dataOperationControlBid3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => dataOperationControlBid3.delete(items),
        );
      }
    },
    async rewrite(
      dataOperationControlBid2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      uniqueItems2.delete(
        loadDataOperationControlBidHandler(
          dataOperationControlBid2,
          options2.opId,
        ),
      );
      record2.stage(dataOperationControlBid2, options2);
      let dataOperationControlBidHandler: Dynamic =
        await loadDataOperationControlBidHandler5();
      if (
        loadDataOperationControlBidHandler2(
          dataOperationControlBid2,
          options2.opId,
        )
      )
        return;
      if (!dataOperationControlBidHandler)
        return void lookup.set(dataOperationControlBid2, [
          ...(lookup.get(dataOperationControlBid2) ?? []).filter(
            (lookupEntry?: Dynamic, ..._extraArguments: unknown[]) =>
              lookupEntry.opId !== options2.opId,
          ),
          options2,
        ]);
      if (!uniqueItems.has(dataOperationControlBid2)) {
        await record2.load(dataOperationControlBid2);
      }
      if (
        loadDataOperationControlBidHandler2(
          dataOperationControlBid2,
          options2.opId,
        )
      )
        return;
      seq += 1;
      let items: Dynamic = [options, dataOperationControlBid2, seq];
      let next3: Dynamic =
        argument3 === undefined
          ? undefined
          : next2(dataOperationControlBid2, options2.opId, argument3());
      await objectStore(
        dataOperationControlBidHandler,
        `readwrite`,
        (
          dataOperationControlBid3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let openCursor: Dynamic = dataOperationControlBid3.openCursor(
            bound(dataOperationControlBid2),
          );
          openCursor.addEventListener(
            `success`,
            (..._extraArguments: unknown[]): undefined => {
              if (!openCursor.result)
                return void dataOperationControlBid3.put(
                  {
                    ...options2,
                    seq: items[2],
                    ...(next3 === undefined
                      ? {}
                      : {
                          at: next3,
                        }),
                  },
                  items,
                );
              let value: Dynamic = openCursor.result.value;
              if (value.opId === options2.opId) {
                if (next3 !== undefined && typeof value.at == `number`) {
                  next3 = Math.min(next3, value.at);
                }
                openCursor.result.delete();
              }
              openCursor.result.continue();
            },
          );
        },
      );
      if (
        loadDataOperationControlBidHandler2(
          dataOperationControlBid2,
          options2.opId,
        )
      )
        return void (await objectStore(
          dataOperationControlBidHandler,
          `readwrite`,
          (
            dataOperationControlBid3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => dataOperationControlBid3.delete(items),
        ));
      let next4: Dynamic = next2(
        dataOperationControlBid2,
        options2.opId,
        next3,
      );
      let items2: Dynamic =
        next4 === undefined ? [] : getItem(dataOperationControlBid2);
      let item: Dynamic = items2.find(
        (item2?: Dynamic, ..._extraArguments: unknown[]) =>
          item2.opId === options2.opId,
      );
      if (
        item !== undefined &&
        !(typeof item.at == `number` && item.at <= next4)
      ) {
        item.at = next4;
        setItem(dataOperationControlBid2, items2);
      }
    },
    async trim(
      dataOperationControlBid2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      next(dataOperationControlBid2, options2);
      lookup2.delete(
        loadDataOperationControlBidHandler(dataOperationControlBid2, options2),
      );
      if (context) {
        setItem(
          dataOperationControlBid2,
          getItem(dataOperationControlBid2).filter(
            (item?: Dynamic, ..._extraArguments: unknown[]) =>
              item.opId !== options2,
          ),
        );
      }
      let dataOperationControlBidHandler: Dynamic =
        await loadDataOperationControlBidHandler5();
      if (!dataOperationControlBidHandler)
        return void lookup.set(
          dataOperationControlBid2,
          (lookup.get(dataOperationControlBid2) ?? []).filter(
            (lookupEntry?: Dynamic, ..._extraArguments: unknown[]) =>
              lookupEntry.opId !== options2,
          ),
        );
      await objectStore(
        dataOperationControlBidHandler,
        `readwrite`,
        (
          dataOperationControlBid3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let openCursor: Dynamic = dataOperationControlBid3.openCursor(
            bound(dataOperationControlBid2),
          );
          openCursor.addEventListener(
            `success`,
            (..._extraArguments: unknown[]): undefined => {
              if (openCursor.result) {
                if (openCursor.result.value.opId === options2) {
                  openCursor.result.delete();
                }
                openCursor.result.continue();
              }
            },
          );
        },
      );
    },
  };
  return record2;
}

var DataOperationControlRoomReadDenied: Dynamic;

var resolveDataOperationControlIsFinite: Dynamic;

var resolveDataOperationControlEngineBound: Dynamic;

var resolveDataOperationControlAbsent: Dynamic;

var resolveDataOperationControlBadRequest: Dynamic;

function loadDataOperationControlKind(
  container?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let options2: Dynamic = options ?? liveDoor(container.id);
  let withBusyRetry2: Dynamic = withBusyRetry(options2);
  let container2: Dynamic = {
    kind: container.kind,
    id: container.id,
  };
  let loadDataOperationControlKindHandler: Dynamic = (
    { verb: verb, ...dataOperationControlKind }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlKind.ref?.object === `project`
      ? {
          ...dataOperationControlKind,
          ref: {
            object: `project`,
            id: container.id,
          },
        }
      : {
          ...dataOperationControlKind,
          container: container2,
        };
  let loadDataOperationControlKindHandler2: Dynamic = (
    dataOperationControlKind?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlKind.ref?.object === `project`
      ? {
          ...dataOperationControlKind,
          ref: {
            object: `project`,
            id: container.id,
          },
          container: undefined,
        }
      : {
          ...dataOperationControlKind,
          container: undefined,
        };
  return {
    container: container,
    send: async (
      dataOperationControlKind?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> =>
      ackOf(
        await withBusyRetry2.call(
          dataOperationControlKind.verb,
          loadDataOperationControlKindHandler(dataOperationControlKind),
        ),
      ),
    batch: async (
      dataOperationControlKind?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> =>
      batchAckOf(
        await withBusyRetry2.call(`batch`, {
          batch: dataOperationControlKind.map(
            loadDataOperationControlKindHandler2,
          ),
          container: container2,
        }),
      ),
    readFaced: readFaced,
    read: async (
      dataOperationControlKind?: Dynamic,
      options3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let faced: Dynamic = await readFaced(dataOperationControlKind, options3);
      return faced.value === undefined ? faced.data : faced.value;
    },
  };
  async function readFaced(
    dataOperationControlKind?: Dynamic,
    engine?: Dynamic,
    payload: Dynamic = {
      engine: engine,
    },
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> {
    let ackOf2: Dynamic = ackOf(
      await options2.call(
        `read`,
        loadDataOperationControlKindHandler({
          ref: dataOperationControlKind,
          verb: `read`,
          engine: engine,
          payload: payload,
        }),
      ),
    );
    if (ackOf2.verdict !== `allow`) {
      let data: Dynamic = ackOf2.data;
      throw new (DataOperationControlRoomReadDenied as Dynamic)(
        dataOperationControlKind,
        ackOf2.reason,
        resolveDataOperationControlIsFinite(data),
        data,
      );
    }
    let { value: ackOf3, data: ackOf4, rev: rev }: Dynamic = ackOf2;
    if (ackOf3 === undefined && ackOf4 === undefined)
      throw Error(
        `room read ${dataOperationControlKind.object}/${dataOperationControlKind.id}: allow with NO value (absent or masked)`,
      );
    return {
      ...(ackOf3 === undefined
        ? {}
        : {
            value: ackOf3,
          }),
      ...(ackOf4 === undefined
        ? {}
        : {
            data: ackOf4,
          }),
      ...(typeof rev == `number`
        ? {
            rev: rev,
          }
        : {}),
    };
  }
}

var DataOperationControlUntitledLdoc: string;

var resolveDataOperationControlValue34: Dynamic;

async function loadDataOperationControlDoc(
  dataOperationControlDoc?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let dataOperationControlKind2: Dynamic = await loadDataOperationControlKind2(
    dataOperationControlDoc,
    options,
  );
  return {
    doc: dataOperationControlKind2.doc,
    complete: dataOperationControlKind2.complete,
    ...(dataOperationControlKind2.rev === undefined
      ? {}
      : {
          rev: dataOperationControlKind2.rev,
        }),
  };
}

async function loadDataOperationControlKind2(
  dataOperationControlKind2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let faced: Dynamic = await dataOperationControlKind2.readFaced(
    {
      object: `node`,
      id: options,
    },
    `prose`,
    {
      kind: `view`,
      face: `json`,
    },
  );
  let loadDataOperationControlKind2Handler: Dynamic = (
    dataOperationControlKind22?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataOperationControlKind22 == `object` && dataOperationControlKind22
      ? dataOperationControlKind22
      : {};
  let dataOperationControlKind2Handler: Dynamic =
    loadDataOperationControlKind2Handler(faced.data);
  if (isEditorExtensionsRoot(dataOperationControlKind2Handler.doc))
    return {
      doc: dataOperationControlKind2Handler.doc,
      complete: dataOperationControlKind2Handler.complete !== false,
      rev:
        typeof dataOperationControlKind2Handler.rev == `number`
          ? dataOperationControlKind2Handler.rev
          : faced.rev,
    };
  let dataOperationControlKind2Handler2: Dynamic =
    loadDataOperationControlKind2Handler(faced.value);
  if (isEditorExtensionsRoot(dataOperationControlKind2Handler2.doc))
    return {
      doc: dataOperationControlKind2Handler2.doc,
      complete: true,
      rev:
        typeof dataOperationControlKind2Handler2.rev == `number`
          ? dataOperationControlKind2Handler2.rev
          : faced.rev,
    };
  throw Error(
    `room read node/${options}: the view's json face is not a block map`,
  );
}

var DataOperationControlLnBody: string;

var resolveDataOperationControlLevel2: Dynamic;

var DataOperationControlState12: number;

var dataOperationControlTextEncoder: TextEncoder;

function resolveDataOperationControlCeil(
  dataOperationControlCeil?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let stringify = JSON.stringify(dataOperationControlCeil) ?? ``;
  return (
    Math.ceil(2.5 * dataOperationControlTextEncoder.encode(stringify).length) +
    4 * (stringify.match(/[&<>]|\\"/g)?.length ?? 0)
  );
}

function resolveDataOperationControlPush(
  dataOperationControlPush?: Dynamic,
  options: Dynamic = DataOperationControlState12,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let items2: Dynamic = [];
  let count: Dynamic = 0;
  for (let resolveDataOperationControlPushResult of dataOperationControlPush as Dynamic) {
    let dataOperationControlCeil = resolveDataOperationControlCeil(
      resolveDataOperationControlPushResult,
    );
    if (items2.length > 0 && count + dataOperationControlCeil > options) {
      items.push(items2);
      items2 = [];
      count = 0;
    }
    items2.push(resolveDataOperationControlPushResult);
    count += dataOperationControlCeil;
  }
  if (items2.length > 0) {
    items.push(items2);
  }
  return items;
}

var resolveDataOperationControlValue35: (dataOperationControlValue35?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveDataOperationControlText3(
  dataOperationControlText3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let reduce: Dynamic = (
    dataOperationControlText32?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlText33: Dynamic = dataOperationControlText32 ?? {};
    return dataOperationControlText33.type === `text`
      ? typeof dataOperationControlText33.text == `string`
        ? Array.from<Dynamic>(dataOperationControlText33.text).length
        : 0
      : 1 +
          (Array.isArray(dataOperationControlText33.content)
            ? dataOperationControlText33.content.reduce(
                (
                  accumulator?: Dynamic,
                  content?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => accumulator + reduce(content),
                0,
              )
            : 0);
  };
  return dataOperationControlText3.reduce(
    (
      accumulator?: Dynamic,
      accumulator2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => accumulator + reduce(accumulator2),
    0,
  );
}

function collectDataOperationControlBlocks(
  collectDataOperationControlBlocks2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let context2: Dynamic = context;
  let collectDataOperationControlBlocksHandler: Dynamic = (
    collectDataOperationControlBlocks3?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      typeof collectDataOperationControlBlocks3 != `object` ||
      !collectDataOperationControlBlocks3 ||
      Array.isArray(collectDataOperationControlBlocks3)
    )
      return collectDataOperationControlBlocks3;
    let collectDataOperationControlBlocks4: Dynamic =
      collectDataOperationControlBlocks3;
    let collectDataOperationControlBlocks5: Dynamic =
      collectDataOperationControlBlocks3;
    if (
      Array.isArray(collectDataOperationControlBlocks4.marks) &&
      collectDataOperationControlBlocks4.marks.length > 0
    ) {
      let marks: Dynamic = collectDataOperationControlBlocks4.marks.map(
        (mark?: unknown, ..._extraArguments: unknown[]): Dynamic =>
          typeof mark == `object` && mark
            ? {
                ...mark,
                id: `${options}.${context2++}`,
              }
            : mark,
      );
      collectDataOperationControlBlocks5 = {
        ...collectDataOperationControlBlocks5,
        marks: marks,
      };
    }
    if (Array.isArray(collectDataOperationControlBlocks4.content)) {
      collectDataOperationControlBlocks5 = {
        ...collectDataOperationControlBlocks5,
        content: collectDataOperationControlBlocks4.content.map(
          collectDataOperationControlBlocksHandler,
        ),
      };
    }
    return collectDataOperationControlBlocks5;
  };
  return {
    blocks: collectDataOperationControlBlocks2.map(
      collectDataOperationControlBlocksHandler,
    ),
    count: context2 - context,
  };
}

function resolveDataOperationControlRef(
  content?: Dynamic,
  ids?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    ref: {
      object: `node`,
      id: `$lid:n`,
    },
    verb: `update`,
    engine: `prose`,
    payload: {
      engine: `prose`,
      ops: [
        {
          op: `insert`,
          target: {
            kind: `root`,
          },
          side: `end`,
          source: {
            from: {
              kind: `inline`,
              content: content,
            },
            as: `blocks`,
          },
          ...(ids
            ? {
                ids: ids,
              }
            : {}),
        },
      ],
    },
  };
}

async function loadDataOperationControlNode(
  dataOperationControlNode?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return await dataOperationControlNode.read(
    {
      object: `node`,
      id: options,
    },
    `prose`,
  );
}

function resolveDataOperationControlBirthName(
  dataOperationControlBirthName: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    birthName:
      dataOperationControlBirthName5 = DataOperationControlUntitledLdoc,
    localId = DataOperationControlLnBody,
    pid: dataOperationControlBirthName2,
    doc = resolveDataOperationControlLevel2(),
    blocks: dataOperationControlBirthName3,
    sess: dataOperationControlBirthName4,
    sessHwm: dataOperationControlBirthName6 = -1,
    markIds: dataOperationControlBirthName7 = false,
  }: Dynamic = dataOperationControlBirthName;
  let [content, ...setContent]: Dynamic =
    dataOperationControlBirthName3 === undefined
      ? []
      : resolveDataOperationControlPush(dataOperationControlBirthName3);
  let record2: Dynamic =
    content === undefined
      ? {
          doc: doc,
        }
      : {
          source: {
            from: {
              kind: `inline`,
              content: content,
            },
            as: `blocks`,
          },
        };
  let items: Dynamic = [
    resolvePlatformSyncAndRoutingLid(dataOperationControlBirthName5),
    {
      $lid: `n`,
      object: `node`,
      verb: `create`,
      engine: `prose`,
      payload: {
        engine: `prose`,
        ...record2,
        localId: localId,
        parent: {
          object: `file`,
          id: `$lid:f`,
        },
      },
    },
    resolvePlatformSyncAndRoutingRef(dataOperationControlBirthName5),
  ];
  if (dataOperationControlBirthName2 !== undefined) {
    items.push(
      resolvePlatformSyncAndRoutingRef2(
        dataOperationControlBirthName2,
        dataOperationControlBirthName.placement,
      ),
    );
  }
  let matchesDataOperationControlBirthName =
    dataOperationControlBirthName4 !== undefined &&
    dataOperationControlBirthName4 !== ``;
  let total: Dynamic =
    (Number.isInteger(dataOperationControlBirthName6) &&
    dataOperationControlBirthName6 >= 0
      ? dataOperationControlBirthName6 + 1
      : 0) +
    (content === undefined
      ? 0
      : resolveDataOperationControlText3(content) +
        (dataOperationControlBirthName7 && matchesDataOperationControlBirthName
          ? collectDataOperationControlBlocks(
              content,
              dataOperationControlBirthName4,
              0,
            ).count
          : 0));
  for (let blocks of setContent as Dynamic) {
    let count: Dynamic = resolveDataOperationControlText3(blocks);
    if (!matchesDataOperationControlBirthName || count === 0) {
      items.push(resolveDataOperationControlRef(blocks));
      continue;
    }
    let collectDataOperationControlBlocks2: Dynamic =
      dataOperationControlBirthName7
        ? collectDataOperationControlBlocks(
            blocks,
            dataOperationControlBirthName4,
            total + count,
          )
        : {
            blocks: blocks,
            count: 0,
          };
    items.push(
      resolveDataOperationControlRef(
        collectDataOperationControlBlocks2.blocks,
        {
          from: `${dataOperationControlBirthName4}.${total}`,
          count: count,
        },
      ),
    );
    total += count + collectDataOperationControlBlocks2.count;
  }
  return items;
}

async function loadDataOperationControlDialect(
  dataOperationControlDialect?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let {
    dialect: dialect,
    peekDialect: peekDialect,
    learn: learn,
    ...options2
  }: Dynamic = options;
  let platformSyncAndRoutingFinal: Dynamic =
    await loadPlatformSyncAndRoutingFinal(
      dataOperationControlDialect,
      resolveDataOperationControlBirthName({
        ...options2,
        pid: dataOperationControlDialect.container.id,
      }),
      {
        dialect: dialect,
        peekDialect: peekDialect,
        learn: learn,
      },
    );
  if (platformSyncAndRoutingFinal.verdict !== `allow`)
    throw new (PlatformSyncAndRoutingBirthRefused as Dynamic)(
      platformSyncAndRoutingFinal,
      `document`,
    );
  let fileId: Dynamic =
    platformSyncAndRoutingFinal.acks[0]?.verdict === `allow`
      ? platformSyncAndRoutingFinal.acks[0].minted
      : undefined;
  let nodeId: Dynamic =
    platformSyncAndRoutingFinal.acks[1]?.verdict === `allow`
      ? platformSyncAndRoutingFinal.acks[1].minted
      : undefined;
  if (!fileId || !nodeId)
    throw Error(
      `Could not create the tab — the server accepted it but named no id. Reload and try again.`,
    );
  return {
    fileId: fileId,
    nodeId: nodeId,
  };
}

var resolveDataOperationControlValue36: Dynamic;

function resolveDataOperationControlValue37(
  dataOperationControlValue37?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let max = Math.max(0, context);
  return resolveDataOperationControlValue36(
    dataOperationControlValue37,
    Math.min(options, max),
    max,
  );
}

function useDataOperationControlWidth(..._extraArguments: unknown[]): Dynamic {
  let [recordState, setRecordState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]) => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
  );
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let count: Dynamic = 0;
    let requestAnimationFrame2 = (..._extraArguments: unknown[]): undefined => {
      count ||= requestAnimationFrame(
        (..._extraArguments: unknown[]): undefined => {
          count = 0;
          setRecordState(
            (
              dataOperationControlWidth?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let width = window.innerWidth;
              let height = window.innerHeight;
              return dataOperationControlWidth.width === width &&
                dataOperationControlWidth.height === height
                ? dataOperationControlWidth
                : {
                    width: width,
                    height: height,
                  };
            },
          );
        },
      );
    };
    window.addEventListener(`resize`, requestAnimationFrame2);
    return (..._extraArguments: unknown[]): undefined => {
      window.removeEventListener(`resize`, requestAnimationFrame2);
      if (count) {
        cancelAnimationFrame(count);
      }
    };
  }, []);
  return recordState;
}

function useDataOperationControlRawStart(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label = `bongo.resize.${event.key}`;
  let [
    dataOperationControlValue36State,
    setDataOperationControlValue36State,
  ]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolveDataOperationControlValue36(
        Number(localStorage.getItem(label)) || event.initial,
        event.min,
        event.max,
      ),
  );
  let dataOperationControlValue36StateRef: Dynamic = (0, React.useRef)(
    dataOperationControlValue36State,
  );
  let matchesEdge = event.edge === `top` || event.edge === `bottom`;
  let min = Math.min(event.max, event.cap ?? 1 / 0);
  let minRef: Dynamic = (0, React.useRef)(min);
  minRef.current = min;
  let size: Dynamic = resolveDataOperationControlValue37(
    dataOperationControlValue36State,
    event.min,
    min,
  );
  let count = event.edge === `right` || event.edge === `bottom` ? 1 : -1;
  let elementRef: Dynamic = (0, React.useRef)(null);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let [dragging, setDragging]: Dynamic = (0, React.useState)(false);
  let resolveDataOperationControlValue372: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      let rawStart: Dynamic = dataOperationControlValue36StateRef.current;
      elementRef.current = {
        rawStart: rawStart,
        startSize: resolveDataOperationControlValue37(
          rawStart,
          event.min,
          minRef.current,
        ),
        moved: false,
      };
    },
    [event.min],
  );
  let setDataOperationControlValue36State2: Dynamic = (0, React.useCallback)(
    (
      dataOperationControlRawStart?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let element: Dynamic = elementRef.current;
      if (element) {
        element.moved = true;
        dataOperationControlValue36StateRef.current =
          resolveDataOperationControlValue37(
            element.startSize + count * dataOperationControlRawStart,
            event.min,
            minRef.current,
          );
        setDataOperationControlValue36State(
          dataOperationControlValue36StateRef.current,
        );
      }
    },
    [event.min, count],
  );
  let setItem: Dynamic = (0, React.useCallback)(
    (
      dataOperationControlRawStart?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let element: Dynamic = elementRef.current;
      if (!element) return;
      elementRef.current = null;
      let gestureSlop: Dynamic = event.gestureSlop ?? 0;
      let matchesAbs =
        gestureSlop > 0
          ? Math.abs(
              dataOperationControlValue36StateRef.current - element.startSize,
            ) >= gestureSlop
          : dataOperationControlValue36StateRef.current !== element.startSize;
      if (dataOperationControlRawStart && element.moved && matchesAbs) {
        localStorage.setItem(
          label,
          String(dataOperationControlValue36StateRef.current),
        );
      } else {
        if (dataOperationControlValue36StateRef.current !== element.rawStart) {
          dataOperationControlValue36StateRef.current = element.rawStart;
          setDataOperationControlValue36State(element.rawStart);
        }
      }
    },
    [event.gestureSlop, label],
  );
  let onPointerDown: Dynamic = (0, React.useCallback)(
    (event2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (elementRef.current) return;
      event2.preventDefault();
      try {
        event2.currentTarget.setPointerCapture(event2.pointerId);
      } catch {}
      let pointerId: Dynamic = event2.pointerId;
      let clientY: Dynamic = matchesEdge ? event2.clientY : event2.clientX;
      resolveDataOperationControlValue372();
      enabledRef.current = true;
      setDragging(true);
      let setDataOperationControlValue36State3 = (
        dataOperationControlRawStart?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (dataOperationControlRawStart.pointerId === pointerId) {
          setDataOperationControlValue36State2(
            (matchesEdge
              ? dataOperationControlRawStart.clientY
              : dataOperationControlRawStart.clientX) - clientY,
          );
        }
      };
      let removeEventListener2 = (
        dataOperationControlRawStart?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        document.removeEventListener(
          `pointermove`,
          setDataOperationControlValue36State3,
        );
        document.removeEventListener(`pointerup`, removeEventListener3);
        document.removeEventListener(`pointercancel`, removeEventListener4);
        document.removeEventListener(
          `lostpointercapture`,
          removeEventListener4,
        );
        enabledRef.current = false;
        setDragging(false);
        setItem(dataOperationControlRawStart);
      };
      let removeEventListener3 = (
        dataOperationControlRawStart?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (dataOperationControlRawStart.pointerId === pointerId) {
          removeEventListener2(true);
        }
      };
      let removeEventListener4 = (
        dataOperationControlRawStart?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (dataOperationControlRawStart.pointerId === pointerId) {
          removeEventListener2(false);
        }
      };
      document.addEventListener(
        `pointermove`,
        setDataOperationControlValue36State3,
      );
      document.addEventListener(`pointerup`, removeEventListener3);
      document.addEventListener(`pointercancel`, removeEventListener4);
      document.addEventListener(`lostpointercapture`, removeEventListener4);
    },
    [
      resolveDataOperationControlValue372,
      setDataOperationControlValue36State2,
      setItem,
      matchesEdge,
    ],
  );
  let onResizeStart: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (!enabledRef.current) {
        resolveDataOperationControlValue372();
      }
    },
    [resolveDataOperationControlValue372],
  );
  let onResize: Dynamic = (0, React.useCallback)(
    (
      dataOperationControlRawStart?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!enabledRef.current) {
        setDataOperationControlValue36State2(dataOperationControlRawStart);
      }
    },
    [setDataOperationControlValue36State2],
  );
  let onResizeEnd: Dynamic = (0, React.useCallback)(
    (
      dataOperationControlRawStart?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!enabledRef.current) {
        setItem(dataOperationControlRawStart);
      }
    },
    [setItem],
  );
  let onDoubleClick: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      dataOperationControlValue36StateRef.current = event.initial;
      setDataOperationControlValue36State(event.initial);
      localStorage.removeItem(label);
    },
    [event.initial, label],
  );
  let ariaValuenow = Math.round(size);
  return {
    size: size,
    width: size,
    handleProps: {
      onPointerDown: onPointerDown,
      onDoubleClick: onDoubleClick,
      onResizeStart: onResizeStart,
      onResize: onResize,
      onResizeEnd: onResizeEnd,
      dragging: dragging,
      "aria-valuenow": ariaValuenow,
      "aria-valuemin": Math.round(Math.min(event.min, min)),
      "aria-valuemax": Math.round(min),
      "aria-valuetext": `${ariaValuenow} pixels ${matchesEdge ? `tall` : `wide`}`,
    },
  };
}

var DataOperationControlLeft: Dynamic;

var DataOperationControlLeft2: Dynamic;

var DataOperationControlStyles11: string;

var DataOperationControlCdsRingOuter: {
    "--cds-ring-outer": string;
    "--cds-ring-inner": string;
};

var resolveDataOperationControlValue38: (..._extraArguments: unknown[]) => undefined;

function PaneResizeHandle(
  paneResizeHandle?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let [paneResizeHandleState, setPaneResizeHandleState]: Dynamic = (0,
  React.useState)(null);
  if (paneResizeHandle.tap) {
    let {
      onTap: tap,
      content: tap2,
      detail: tap3,
    }: Dynamic = paneResizeHandle.tap;
    return (
      <div
        onPointerDown={(
          paneResizeHandle2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!elementRef.current) {
            elementRef.current = {
              pointerId: paneResizeHandle2.pointerId,
              x: paneResizeHandle2.clientX,
              y: paneResizeHandle2.clientY,
              moved: false,
            };
            paneResizeHandle.onPointerDown(paneResizeHandle2);
          }
        }}
        onClick={(
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let element: Dynamic = elementRef.current;
          if (!element) return;
          let pointerId: Dynamic = event.nativeEvent.pointerId;
          if (!(pointerId !== undefined && pointerId !== element.pointerId)) {
            elementRef.current = null;
            if (!element.moved) {
              tap();
            }
          }
        }}
        onPointerCancel={(
          paneResizeHandle2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (elementRef.current?.pointerId === paneResizeHandle2.pointerId) {
            elementRef.current = null;
          }
        }}
        onPointerMove={(
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let element: Dynamic = elementRef.current;
          if (element && event.pointerId !== element.pointerId) return;
          if (
            element &&
            Math.hypot(event.clientX - element.x, event.clientY - element.y) >=
              3
          ) {
            element.moved = true;
          }
          let currentTargetBounds: Dynamic =
            event.currentTarget.getBoundingClientRect();
          setPaneResizeHandleState({
            y: event.clientY - currentTargetBounds.top,
            top: currentTargetBounds.top,
            edgeX:
              paneResizeHandle.side === `left`
                ? currentTargetBounds.left
                : currentTargetBounds.right,
          });
        }}
        onPointerLeave={(..._extraArguments: unknown[]): Dynamic =>
          setPaneResizeHandleState(null)
        }
        onDoubleClick={paneResizeHandle.onDoubleClick}
        className={`absolute z-10 touch-none select-none ${DataOperationControlLeft[paneResizeHandle.side]}`}
      >
        {paneResizeHandleState !== null && (
          <jsxRuntime.Fragment>
            <div
              style={{
                top: paneResizeHandleState.y - 14,
              }}
              className={`bg-alpha-4 pointer-events-none absolute h-7 w-[3px] rounded-full ${paneResizeHandle.side === `left` ? `right-0` : `left-0`}`}
            />
            {(0, ReactDOM.createPortal)(
              <div
                style={{
                  top: paneResizeHandleState.top + paneResizeHandleState.y - 22,
                  left:
                    paneResizeHandle.side === `left`
                      ? paneResizeHandleState.edgeX - 8
                      : paneResizeHandleState.edgeX + 8,
                  transform:
                    paneResizeHandle.side === `left`
                      ? `translateX(-100%)`
                      : undefined,
                }}
                className={`bg-fill-primary pointer-events-none fixed z-50 w-max rounded-lg px-2.5 py-1.5 shadow-md`}
              >
                <div
                  className={`text-on-primary text-[13px] leading-tight font-medium`}
                >
                  {tap2}
                </div>
                {tap3 && (
                  <div
                    className={`text-on-primary text-xs leading-tight opacity-60`}
                  >
                    {tap3}
                  </div>
                )}
              </div>,
              (document as Dynamic).body,
            )}
          </jsxRuntime.Fragment>
        )}
      </div>
    );
  }
  let style: Dynamic = {
    ...(paneResizeHandle.bordered ? DataOperationControlCdsRingOuter : {}),
    ...(paneResizeHandle.dragging
      ? {
          "--cds-resize-pill-force": `1`,
        }
      : {}),
  };
  return (
    <PlatformKeyboardAndSaveStatusOrientation
      side={DataOperationControlLeft2[paneResizeHandle.side]}
      aria-label={paneResizeHandle.label}
      aria-valuenow={paneResizeHandle[`aria-valuenow`]}
      aria-valuemin={paneResizeHandle[`aria-valuemin`]}
      aria-valuemax={paneResizeHandle[`aria-valuemax`]}
      aria-valuetext={paneResizeHandle[`aria-valuetext`]}
      onPointerDown={(
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          event.currentTarget ===
          event.currentTarget.ownerDocument.activeElement
        ) {
          event.currentTarget.blur();
        }
        paneResizeHandle.onPointerDown(event);
      }}
      onDoubleClick={paneResizeHandle.onDoubleClick}
      onResizeStart={paneResizeHandle.onResizeStart}
      onResize={paneResizeHandle.onResize ?? resolveDataOperationControlValue38}
      onResizeEnd={paneResizeHandle.onResizeEnd}
      data-testid={`pane-resize-handle`}
      className={`z-10 touch-none select-none ${paneResizeHandle.dragging ? DataOperationControlStyles11 : ``}`}
      style={style}
    />
  );
}

function isDataOperationControlRoot(
  ref?: Dynamic,
  ref2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  return {
    root: {
      onOpenChange(
        dataOperationControlRoot?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        enabled =
          !dataOperationControlRoot &&
          options?.reason === `item-press` &&
          resolveDataOperationControlDetail(options.event) === true;
      },
    },
    finalFocus(
      dataOperationControlRoot?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let matchesDataOperationControlRoot =
        dataOperationControlRoot === `keyboard` ||
        (dataOperationControlRoot === `` && enabled);
      enabled = false;
      let ref3: Dynamic = ref2.current;
      if (!matchesDataOperationControlRoot || !ref3?.isConnected) return false;
      let ownerDocument2: Dynamic = ref3.ownerDocument;
      let activeElement2: Dynamic = ownerDocument2.activeElement;
      return activeElement2 !== null &&
        activeElement2 !== ownerDocument2.body &&
        !(ref.current?.contains(activeElement2) ?? false) &&
        !ref3.contains(activeElement2)
        ? false
        : (queueMicrotask((..._extraArguments: unknown[]): undefined => {
            let activeElement3: Dynamic = ownerDocument2.activeElement;
            if (
              ref3.isConnected &&
              (!activeElement3 || activeElement3 === ownerDocument2.body)
            ) {
              ref3.focus({
                preventScroll: true,
                focusVisible: true,
              });
            }
          }),
          true);
    },
  };
}

function resolveDataOperationControlDetail(
  dataOperationControlDetail?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let detail: Dynamic =
    typeof dataOperationControlDetail == `object` && dataOperationControlDetail
      ? dataOperationControlDetail.detail
      : undefined;
  return typeof detail == `number` ? detail === 0 : undefined;
}

function resolveDataOperationControlAriaControls(
  dataOperationControlAriaControls?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let closest: Dynamic = options?.closest(`[role="menu"]`) ?? null;
  for (; closest !== null && !items.includes(closest); ) {
    items.push(closest);
    let closest2: Dynamic = closest;
    closest =
      Array.from<Dynamic>(
        dataOperationControlAriaControls.querySelectorAll(
          `[role="menu"] [aria-controls]`,
        ),
      )
        .find((element?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let attribute: Dynamic = element.getAttribute(`aria-controls`);
          let elementById: Dynamic =
            attribute === null || attribute === ``
              ? null
              : dataOperationControlAriaControls.getElementById(attribute);
          return elementById !== null && elementById.contains(closest2);
        })
        ?.closest(`[role="menu"]`) ?? null;
  }
  return items;
}

function resolveDataOperationControlByKey(
  document2?: Dynamic,
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let activeElement2: Dynamic = document2.activeElement;
  let currentTarget: Dynamic =
    typeof event == `object` && event ? event.currentTarget : undefined;
  let currentTarget2: Dynamic =
    typeof currentTarget?.closest == `function`
      ? currentTarget
      : activeElement2;
  let byKey: Dynamic = resolveDataOperationControlDetail(event);
  if (byKey === undefined) {
    byKey = false;
    try {
      byKey = activeElement2?.matches(`:focus-visible`) ?? false;
    } catch {}
  }
  return {
    byKey: byKey,
    menus: resolveDataOperationControlAriaControls(document2, currentTarget2),
  };
}

function resolveDataOperationControlDataBaseUiFocusGuard(
  element?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    element === null ||
    element === element.ownerDocument.body ||
    !element.isConnected ||
    element.hasAttribute(`data-base-ui-focus-guard`) ||
    element === options ||
    element === context ||
    dependencies.some(
      (dependency?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        dependency.contains(element),
    )
  );
}

var DataOperationControlCopyLink: string;

async function CopyLinkFallbackUrl(
  copyLinkFallbackUrl?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformSyncAndRoutingClipboard =
    await loadPlatformSyncAndRoutingClipboard(copyLinkFallbackUrl, options);
  if (platformSyncAndRoutingClipboard) {
    toast.success(`Link copied`, {
      id: DataOperationControlCopyLink,
    });
  } else {
    toast.error(
      <jsxRuntime.Fragment>
        {`Couldn't copy the link — select it here and press ⌘C (Ctrl-C):`}
        <span
          data-testid={`copy-link-fallback-url`}
          className={`mt-1 block max-h-24 overflow-y-auto font-normal break-all select-all`}
        >
          {copyLinkFallbackUrl}
        </span>
      </jsxRuntime.Fragment>,
      {
        id: DataOperationControlCopyLink,
        duration: 2e4,
      },
    );
  }
  return platformSyncAndRoutingClipboard;
}

var dataOperationControlValue1: number;

function resolveDataOperationControlSess3(
  dataOperationControlSess3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (resolveDataOperationControlValue39(dataOperationControlSess3)) {
    let {
      sess: dataOperationControlSess32,
      ...dataOperationControlSess33
    }: Dynamic = dataOperationControlSess3;
    dataOperationControlSess3 =
      dataOperationControlSess33.channel === `external` &&
      resolveDataModelSchemasFrame(dataOperationControlSess33.via)
        ? {
            principal: dataOperationControlSess33.principal,
            channel: `human`,
          }
        : dataOperationControlSess33;
  }
  return resolvePlatformApiAndAuthSafeParse(dataOperationControlSess3);
}

var resolveDataOperationControlSeq: Dynamic;

var resolveDataOperationControlKind3: Dynamic;

var resolveDataOperationControlValue39: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationControl5Step1(): void {
  (resolveDataOperationControlEndsWith = (
      event?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (
      dataOperationControlEnds?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (!event || typeof event.key != `function`) return 0;
      let count: Dynamic = 0;
      try {
        let label = `|${options}|${dataOperationControlEnds}`;
        for (let index = 0; index < event.length; index++) {
          let key: Dynamic = event.key(index);
          if (!key || !key.endsWith(label)) continue;
          let label2 = key.startsWith(`bongo.op-wal:stage:`)
            ? `${DataOperationControlBongoOpWal}:stage:`
            : key.startsWith(`bongo.op-wal:words:`)
              ? `${DataOperationControlBongoOpWal}:words:`
              : null;
          if (label2 === null) continue;
          let keySlice: Dynamic = key.slice(
            label2.length,
            key.length - `|${dataOperationControlEnds}`.length,
          );
          if (
            !context &&
            event.getItem(resolveDataOperationControlValue31(keySlice)) !== null
          )
            continue;
          let parse: Dynamic = JSON.parse(event.getItem(key) ?? `[]`);
          if (Array.isArray(parse) && parse.length > 0) {
            count += 1;
          }
        }
      } catch {}
      return count;
    });
  (DataOperationControlRoomReadDenied = class extends Error {
    [key: string]: Dynamic;
    reason: Dynamic;
    retryAfterMs: Dynamic;
    data: Dynamic;
    constructor(
      dataOperationControlRoomReadDenied?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        `room read ${dataOperationControlRoomReadDenied.object}/${dataOperationControlRoomReadDenied.id}: deny ${options}`,
      );
      this.name = `RoomReadDenied`;
      this.reason = options;
      this.retryAfterMs = context;
      this.data = dependencies;
    }
  });
  (resolveDataOperationControlIsFinite = (
    dataOperationControlIsFinite?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let retryAfterMs: Dynamic = dataOperationControlIsFinite?.retryAfterMs;
    return typeof retryAfterMs == `number` &&
      Number.isFinite(retryAfterMs) &&
      retryAfterMs >= 0
      ? retryAfterMs
      : undefined;
  });
  (resolveDataOperationControlEngineBound = (
    dataOperationControlEngineBound?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationControlEngineBound === `engine-bound` ||
    dataOperationControlEngineBound === `engine-mismatch`);
  (resolveDataOperationControlAbsent = (
    dataOperationControlAbsent?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationControlAbsent === `absent` ||
    dataOperationControlAbsent === `gone` ||
    dataOperationControlAbsent === `unknown_id`);
  (resolveDataOperationControlBadRequest = (
    dataOperationControlBadRequest?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlBadRequest === `bad_request` &&
    typeof options == `object` &&
    !!options &&
    !Array.isArray(options) &&
    options.problem === `wrong_object`);
  (DataOperationControlUntitledLdoc = `Untitled.ldoc`);
  (resolveDataOperationControlValue34 = (
    dataOperationControlValue34?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof dataOperationControlValue34 == `object` &&
    !!dataOperationControlValue34 &&
    typeof dataOperationControlValue34.doc == `string`);
  (DataOperationControlLnBody = `ln-body`);
  (resolveDataOperationControlLevel2 = (
    ..._extraArguments: unknown[]
  ) => ({
    type: `doc`,
    content: [
      {
        type: `heading`,
        attrs: {
          level: 1,
        },
      },
      {
        type: `paragraph`,
      },
    ],
  }));
  (DataOperationControlState12 = 32 * 1024);
  (dataOperationControlTextEncoder = new TextEncoder());
  (resolveDataOperationControlValue35 = (
    dataOperationControlValue35?: Dynamic,
    ..._extraArguments: unknown[]
  ) => resolveDataOperationControlPush(dataOperationControlValue35).length <= 61);
  (resolveDataOperationControlValue36 = (
    dataOperationControlValue36?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => Math.max(options, Math.min(context, dataOperationControlValue36)));
  (DataOperationControlLeft = {
    left: `top-0 -left-[3px] h-full w-[6px] cursor-col-resize`,
    right: `top-0 -right-[3px] h-full w-[6px] cursor-col-resize`,
    top: `left-0 -top-[3px] h-[6px] w-full cursor-row-resize`,
    bottom: `left-0 -bottom-[3px] h-[6px] w-full cursor-row-resize`,
  });
  (DataOperationControlLeft2 = {
    left: `inline-start`,
    right: `inline-end`,
    top: `top`,
    bottom: `bottom`,
  });
  (DataOperationControlStyles11 = `[&_[data-cds-part=resize-pill]]:text-secondary [&_[data-cds-part=resize-pill]]:delay-0`);
  (DataOperationControlCdsRingOuter = {
    "--cds-ring-outer": `1px`,
    "--cds-ring-inner": `0px`,
  });
  (resolveDataOperationControlValue38 = (
    ..._extraArguments: unknown[]
  ): undefined => {});
  (DataOperationControlCopyLink = `copy-link`);
  (dataOperationControlValue1 = 1);
  (resolveDataOperationControlSeq = (
    activity?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (activity === undefined) {
      context(`born-absent:${options}`);
      return;
    }
    let actor: Dynamic = resolveDataOperationControlSess3(activity.actor);
    if (actor === undefined) {
      context(`born-actor-rejected:${options}`);
      return;
    }
    return {
      seq: activity.seq,
      at: activity.at,
      actor: actor,
      ...(activity.container
        ? {
            container: activity.container,
          }
        : {}),
    };
  });
  (resolveDataOperationControlKind3 = (
    dataOperationControlKind3?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let born: Dynamic = dataOperationControlKind3.startsWith(`utterance/`)
      ? resolveDataOperationControlSeq(
          options.born,
          dataOperationControlKind3,
          dependencies,
        )
      : undefined;
    return {
      v: dataOperationControlValue1,
      kind: `sync`,
      ref: dataOperationControlKind3,
      engine: options.engine,
      value: context,
      ...(born
        ? {
            born: born,
          }
        : {}),
    };
  });
  (resolveDataOperationControlValue39 = (
    dataOperationControlValue39?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataOperationControlValue39 == `object` &&
    !!dataOperationControlValue39 &&
    !Array.isArray(dataOperationControlValue39));
}

export {
  CopyLinkFallbackUrl,
  DataOperationControlLnBody,
  DataOperationControlRoomReadDenied,
  PaneResizeHandle,
  dataOperationControlValue1,
  isDataOperationControlRoot,
  loadDataOperationControlBid,
  loadDataOperationControlDialect,
  loadDataOperationControlDoc,
  loadDataOperationControlKind,
  loadDataOperationControlNode,
  loadDataOperationControlReady,
  resolveDataOperationControlAbsent,
  resolveDataOperationControlBadRequest,
  resolveDataOperationControlByKey,
  resolveDataOperationControlDataBaseUiFocusGuard,
  resolveDataOperationControlDetail,
  resolveDataOperationControlEndsWith,
  resolveDataOperationControlEngineBound,
  resolveDataOperationControlIsFinite,
  resolveDataOperationControlKind3,
  resolveDataOperationControlLevel2,
  resolveDataOperationControlPush,
  resolveDataOperationControlSess3,
  resolveDataOperationControlText3,
  resolveDataOperationControlValue33,
  resolveDataOperationControlValue34,
  resolveDataOperationControlValue35,
  resolveDataOperationControlValue39,
  useDataOperationControlRawStart,
  useDataOperationControlWidth,
};

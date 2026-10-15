/** BaoCut: observability browser and operation events from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  helloLImport,
  helloOImport,
  helloPImport,
  inFrame,
  rolldownNImport,
  standaloneCommentAnchors,
  standaloneDocsHost,
} from "./platform-core-dependencies";
import {
  resolveObservabilityTelemetryShellUnanswered,
} from "./platform-core-observability-telemetry-1";
import {
  emitTelemetryEvent,
} from "./platform-core-observability-telemetry-3";
import {
  resolvePlatformFeatureFlagsEnabled2,
} from "./platform-core-platform-feature-flags";
import {
  resolvePlatformArtifactLinksHostname,
  resolvePlatformArtifactLinksShellOrigin,
  resolvePlatformArtifactLinksValue2,
} from "./platform-core-platform-artifact-links";
import {
  loadPlatformImagesAndBlobsCode,
  loadPlatformImagesAndBlobsFetcher,
  loadPlatformImagesAndBlobsInline,
  loadPlatformImagesAndBlobsMiss,
  loadPlatformImagesAndBlobsStatus,
  loadPlatformImagesAndBlobsValue,
} from "./platform-core-platform-images-and-blobs";
import {
  resolveDataContentAndReferencesBONGOCONTAINER,
  resolveDataContentAndReferencesValue3,
  resolveDataContentAndReferencesValue4,
} from "./platform-core-data-content-and-references";
import {
  loadPlatformSessionAndSourcesCall,
  loadPlatformSessionAndSourcesCode,
  resolvePlatformSessionAndSourcesUnknown,
  resolvePlatformSessionAndSourcesUnknown2,
} from "./platform-core-platform-session-and-sources-1";
import {
  INSTANCE_CHURN,
  RESET_STORM,
  getEditorExtensionsValue,
  resolveEditorExtensionsHelloAnswered2,
  resolveEditorExtensionsValue30,
  updateEditorExtensionsByKey,
} from "./platform-core-editor-extensions-3";
import {
  FOREIGN_CONTAINER,
  loadEditorExtensionsCall,
} from "./platform-core-editor-extensions-4";
import {
  isPlatformFrameAndCapabilitiesNavigation,
  loadPlatformFrameAndCapabilitiesAbsent,
  loadPlatformFrameAndCapabilitiesCall,
  loadPlatformFrameAndCapabilitiesCode,
  loadPlatformFrameAndCapabilitiesCode2,
  loadPlatformFrameAndCapabilitiesFileArgs,
  loadPlatformFrameAndCapabilitiesGranted,
  loadPlatformFrameAndCapabilitiesOptions,
  loadPlatformFrameAndCapabilitiesParent,
  loadPlatformFrameAndCapabilitiesState,
  loadPlatformFrameAndCapabilitiesValue,
  loadPlatformFrameAndCapabilitiesValue2,
  loadPlatformFrameAndCapabilitiesVerdict,
  resolvePlatformFrameAndCapabilitiesOffered,
  resolvePlatformFrameAndCapabilitiesReloaded,
} from "./platform-core-platform-frame-and-capabilities";
import {
  loadExportMcpConnectorsCode,
  loadExportMcpConnectorsCode2,
  loadExportMcpConnectorsValue2,
  resolveExportMcpConnectorsValue2,
  resolveExportMcpConnectorsValue3,
  resolveExportMcpConnectorsValue6,
} from "./platform-core-export-mcp-connectors";
import {
  createPagesProfileNamelessEvent,
  createPagesProfileRecoveredEvent,
  resolveObservabilityBrowserAndOperationEventsValue3,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  loadObservabilityBrowserAndOperationEventsAvatarUrl,
  loadObservabilityBrowserAndOperationEventsCanEdit,
  loadObservabilityBrowserAndOperationEventsIssues,
  loadObservabilityBrowserAndOperationEventsNow,
  loadObservabilityBrowserAndOperationEventsSample,
  loadObservabilityBrowserAndOperationEventsSchedule,
  loadObservabilityBrowserAndOperationEventsSearch,
  loadObservabilityBrowserAndOperationEventsUser,
  loadObservabilityBrowserAndOperationEventsValue,
  loadObservabilityBrowserAndOperationEventsValue2,
  observabilityBrowserAndOperationEventsValue10000,
  observabilityBrowserAndOperationEventsValue20003,
  observabilityBrowserAndOperationEventsValue999999999,
  resolveObservabilityBrowserAndOperationEventsBid,
  resolveObservabilityBrowserAndOperationEventsCharCodeAt2,
  resolveObservabilityBrowserAndOperationEventsIsSafeInteger,
  resolveObservabilityBrowserAndOperationEventsRead,
  resolveObservabilityBrowserAndOperationEventsTest8,
  resolveObservabilityBrowserAndOperationEventsTest9,
  resolveObservabilityBrowserAndOperationEventsValue26,
} from "./platform-core-observability-browser-and-operation-events-2";
import {
  HOT_EARLY_MAX_MS,
  askFrameConversationPane,
  forwardHostViewport,
  frameAskClaude,
  frameClaudeWorking,
  frameConversationPane,
  frameCurrentAnchor,
  frameDeclineExport,
  frameHostAction,
  frameHostChrome,
  frameHostChromeActions,
  frameHostChromeDestinations,
  frameHostChromeExports,
  frameHostChromeWitnessed,
  frameHostExport,
  frameHostWords,
  frameHotActivity,
  frameHotFrom,
  frameHotProvide,
  frameHotTouched,
  frameMentioned,
  frameOpenExternal,
  frameTitleFromContent,
  frameTitlePropose,
  frameViewerDirty,
  frameViewerDirtyNow,
  frameViewerEdit,
  frameViewerPortAwaited,
  frameViewerRev,
  frameViewerSaveLive,
  frameViewerSaveWord,
  frameViewerStaged,
  hostSays,
  installFrameClaudeActivity,
  installFrameFetchTripwire,
  installFrameHostChromeWitness,
  installFrameHostViewport,
  installFrameHot,
  onFrameGotoAnchor,
  subscribeFrameClaudeActivity,
  subscribeFrameConversationPane,
  subscribeFrameHostChromeWitness,
  subscribeFrameHostWords,
} from "./platform-core-observability-browser-and-operation-events-4";

function resolveObservabilityBrowserAndOperationEventsMode(
  observabilityBrowserAndOperationEventsMode?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = null,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    observabilityBrowserAndOperationEventsMode === null ||
    (observabilityBrowserAndOperationEventsMode.mode !== `read` &&
      observabilityBrowserAndOperationEventsMode.mode !== `edit`) ||
    !resolveObservabilityBrowserAndOperationEventsTest8(
      observabilityBrowserAndOperationEventsMode.tab,
    )
  )
    return null;
  let context2: Dynamic = {
    mode: observabilityBrowserAndOperationEventsMode.mode,
    tab: observabilityBrowserAndOperationEventsMode.tab,
    selected: [],
    dirty: context === true,
  };
  if (
    options !== null &&
    resolveObservabilityBrowserAndOperationEventsTest8(options.node)
  ) {
    context2.node = options.node;
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    for (let resolveObservabilityBrowserAndOperationEventsModeResult of options.selected as Dynamic)
      if (
        !(
          !resolveObservabilityBrowserAndOperationEventsTest9(
            resolveObservabilityBrowserAndOperationEventsModeResult,
          ) ||
          uniqueItems.has(
            resolveObservabilityBrowserAndOperationEventsModeResult,
          )
        ) &&
        (uniqueItems.add(
          resolveObservabilityBrowserAndOperationEventsModeResult,
        ),
        context2.selected.push(
          resolveObservabilityBrowserAndOperationEventsModeResult,
        ),
        context2.selected.length >= 20)
      )
        break;
    let observabilityBrowserAndOperationEventsBid: Dynamic =
      resolveObservabilityBrowserAndOperationEventsBid(options.range);
    if (
      observabilityBrowserAndOperationEventsBid !== null &&
      context2.selected.includes(observabilityBrowserAndOperationEventsBid.bid)
    ) {
      context2.range = `${observabilityBrowserAndOperationEventsBid.bid}:${observabilityBrowserAndOperationEventsBid.start}-${observabilityBrowserAndOperationEventsBid.end}`;
    }
  }
  if (
    dependencies !== null &&
    resolveObservabilityBrowserAndOperationEventsIsSafeInteger(dependencies.rev)
  ) {
    context2.rev = dependencies.rev;
  }
  if (
    dependencies !== null &&
    resolveObservabilityBrowserAndOperationEventsIsSafeInteger(
      dependencies.edits,
    ) &&
    dependencies.edits > 0
  ) {
    context2.edits = Math.min(
      dependencies.edits,
      observabilityBrowserAndOperationEventsValue999999999,
    );
  }
  let json2 = JSON.stringify(context2);
  for (
    ;
    resolveObservabilityBrowserAndOperationEventsCharCodeAt2(json2) > 1024 &&
    context2.selected.length > 1;

  ) {
    context2.selected.pop();
    if (
      context2.range !== undefined &&
      !context2.selected.includes(
        resolveObservabilityBrowserAndOperationEventsBid(context2.range).bid,
      )
    ) {
      delete context2.range;
    }
    json2 = JSON.stringify(context2);
  }
  if (
    resolveObservabilityBrowserAndOperationEventsCharCodeAt2(json2) > 1024 &&
    context2.range !== undefined
  ) {
    delete context2.range;
    json2 = JSON.stringify(context2);
  }
  return resolveObservabilityBrowserAndOperationEventsCharCodeAt2(json2) > 1024
    ? null
    : {
        context: context2,
        json: json2,
      };
}

var resolveObservabilityBrowserAndOperationEventsValue29: Dynamic;

async function loadObservabilityBrowserAndOperationEventsRoom(
  observabilityBrowserAndOperationEventsRoom?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (observabilityBrowserAndOperationEventsRoom == null) return null;
  if (typeof observabilityBrowserAndOperationEventsRoom.use == `function`)
    try {
      let use: Dynamic =
        await observabilityBrowserAndOperationEventsRoom.use(`room`);
      if (
        resolveObservabilityBrowserAndOperationEventsValue29(use) &&
        typeof use.presence == `function`
      )
        return use;
      if (use === null) return null;
    } catch {}
  let room: Dynamic = observabilityBrowserAndOperationEventsRoom.room;
  return resolveObservabilityBrowserAndOperationEventsValue29(room) &&
    typeof room.presence == `function`
    ? room
    : null;
}

var resolveObservabilityBrowserAndOperationEventsError: Dynamic;

function resolveObservabilityBrowserAndOperationEventsContext(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveObservabilityBrowserAndOperationEventsContextResult: Dynamic =
    null;
  let resolveObservabilityBrowserAndOperationEventsContextResult2: Dynamic =
    null;
  let enabled = false;
  let rev: Dynamic = null;
  let resolveObservabilityBrowserAndOperationEventsContextResult3: Dynamic;
  let amount: Dynamic = -1 / 0;
  let load: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    if (
      resolveObservabilityBrowserAndOperationEventsContextResult3 === undefined
    ) {
      let load2: Dynamic = scheduler.edits?.load();
      resolveObservabilityBrowserAndOperationEventsContextResult3 =
        resolveObservabilityBrowserAndOperationEventsIsSafeInteger(load2)
          ? Math.min(
              load2,
              observabilityBrowserAndOperationEventsValue999999999,
            )
          : 0;
    }
    return resolveObservabilityBrowserAndOperationEventsContextResult3;
  };
  let resolveObservabilityBrowserAndOperationEventsMode2 = (
    ..._extraArguments: unknown[]
  ) => {
    let observabilityBrowserAndOperationEventsMode: Dynamic =
      resolveObservabilityBrowserAndOperationEventsMode(
        resolveObservabilityBrowserAndOperationEventsContextResult,
        resolveObservabilityBrowserAndOperationEventsContextResult2,
        enabled,
      );
    return observabilityBrowserAndOperationEventsMode === null
      ? `null`
      : `${observabilityBrowserAndOperationEventsMode.json}${rev === null ? `` : `+rev`}`;
  };
  let resolveObservabilityBrowserAndOperationEventsContextResult4: Dynamic;
  let resolveObservabilityBrowserAndOperationEventsContextHandler: Dynamic = (
    observabilityBrowserAndOperationEventsContext?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsContext !==
      resolveObservabilityBrowserAndOperationEventsContextResult4 &&
    !(
      observabilityBrowserAndOperationEventsContext === `null` &&
      resolveObservabilityBrowserAndOperationEventsContextResult4 === undefined
    );
  let resolveObservabilityBrowserAndOperationEventsContextResult5: Dynamic;
  let resolveObservabilityBrowserAndOperationEventsContextResult6: Dynamic =
    null;
  let enabled2 = false;
  let then: Dynamic = loadObservabilityBrowserAndOperationEventsRoom(
    scheduler.host,
  ).then(
    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
      result === null && (enabled2 = true),
      result
    ),
  );
  let resolveObservabilityBrowserAndOperationEventsError2 = (
    observabilityBrowserAndOperationEventsContext?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled2) {
      enabled2 = true;
      scheduler.log?.(
        `viewerContext:refused:${resolveObservabilityBrowserAndOperationEventsError(observabilityBrowserAndOperationEventsContext)}`,
      );
    }
  };
  let resolveObservabilityBrowserAndOperationEventsError3 = (
    observabilityBrowserAndOperationEventsContext?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      let call: Dynamic =
        observabilityBrowserAndOperationEventsContext.presence.call(
          observabilityBrowserAndOperationEventsContext,
          {
            context: context,
          },
        );
      let then2: Dynamic = resolveObservabilityBrowserAndOperationEventsValue29(
        call,
      )
        ? call.then
        : undefined;
      if (typeof then2 == `function`) {
        then2.call(
          call,
          undefined,
          resolveObservabilityBrowserAndOperationEventsError2,
        );
      }
    } catch (resolveObservabilityBrowserAndOperationEventsContextResult10: Dynamic) {
      resolveObservabilityBrowserAndOperationEventsError2(
        resolveObservabilityBrowserAndOperationEventsContextResult10,
      );
    }
  };
  let resolveObservabilityBrowserAndOperationEventsContextHandler2 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    then.then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (result === null || enabled2) return;
      let observabilityBrowserAndOperationEventsMode =
        resolveObservabilityBrowserAndOperationEventsMode2();
      if (
        !resolveObservabilityBrowserAndOperationEventsContextHandler(
          observabilityBrowserAndOperationEventsMode,
        )
      )
        return;
      let observabilityBrowserAndOperationEventsMode2: Dynamic =
        resolveObservabilityBrowserAndOperationEventsMode(
          resolveObservabilityBrowserAndOperationEventsContextResult,
          resolveObservabilityBrowserAndOperationEventsContextResult2,
          enabled,
          {
            rev: rev,
            edits: load(),
          },
        );
      resolveObservabilityBrowserAndOperationEventsContextResult4 =
        observabilityBrowserAndOperationEventsMode;
      resolveObservabilityBrowserAndOperationEventsError3(
        result,
        observabilityBrowserAndOperationEventsMode2 === null
          ? null
          : observabilityBrowserAndOperationEventsMode2.context,
      );
    });
  };
  let resolveObservabilityBrowserAndOperationEventsContextResult7: Dynamic =
    null;
  let resolveObservabilityBrowserAndOperationEventsContextResult8 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    resolveObservabilityBrowserAndOperationEventsContextResult6?.();
    resolveObservabilityBrowserAndOperationEventsContextResult6 = null;
    resolveObservabilityBrowserAndOperationEventsContextResult5 = undefined;
  };
  let resolveObservabilityBrowserAndOperationEventsContextResult9 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    resolveObservabilityBrowserAndOperationEventsContextResult8();
    resolveObservabilityBrowserAndOperationEventsContextResult7?.();
    resolveObservabilityBrowserAndOperationEventsContextResult7 = null;
  };
  let resolveObservabilityBrowserAndOperationEventsContextHandler3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    resolveObservabilityBrowserAndOperationEventsContextResult9();
    resolveObservabilityBrowserAndOperationEventsContextHandler2();
  };
  let schedule = (..._extraArguments: unknown[]): undefined => {
    if (enabled2) return;
    let observabilityBrowserAndOperationEventsMode =
      resolveObservabilityBrowserAndOperationEventsMode2();
    if (
      !(
        resolveObservabilityBrowserAndOperationEventsContextResult6 !== null &&
        observabilityBrowserAndOperationEventsMode ===
          resolveObservabilityBrowserAndOperationEventsContextResult5
      )
    ) {
      if (
        !resolveObservabilityBrowserAndOperationEventsContextHandler(
          observabilityBrowserAndOperationEventsMode,
        )
      ) {
        resolveObservabilityBrowserAndOperationEventsContextResult9();
        return;
      }
      resolveObservabilityBrowserAndOperationEventsContextResult8();
      resolveObservabilityBrowserAndOperationEventsContextResult5 =
        observabilityBrowserAndOperationEventsMode;
      resolveObservabilityBrowserAndOperationEventsContextResult6 =
        scheduler.schedule(
          resolveObservabilityBrowserAndOperationEventsContextHandler3,
          500,
        );
      resolveObservabilityBrowserAndOperationEventsContextResult7 ??=
        scheduler.schedule(
          resolveObservabilityBrowserAndOperationEventsContextHandler3,
          observabilityBrowserAndOperationEventsValue20003,
        );
    }
  };
  return {
    setLocus(
      observabilityBrowserAndOperationEventsContext?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      resolveObservabilityBrowserAndOperationEventsContextResult =
        observabilityBrowserAndOperationEventsContext === null
          ? null
          : {
              mode: observabilityBrowserAndOperationEventsContext.mode,
              tab: observabilityBrowserAndOperationEventsContext.tab,
            };
      schedule();
    },
    setSelection(
      observabilityBrowserAndOperationEventsContext?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      resolveObservabilityBrowserAndOperationEventsContextResult2 =
        observabilityBrowserAndOperationEventsContext === null
          ? null
          : {
              node: observabilityBrowserAndOperationEventsContext.node,
              selected: [
                ...observabilityBrowserAndOperationEventsContext.selected,
              ],
              range:
                observabilityBrowserAndOperationEventsContext.range ?? null,
            };
      schedule();
    },
    setDirty(
      observabilityBrowserAndOperationEventsContext?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        enabled !==
        (observabilityBrowserAndOperationEventsContext === true)
      ) {
        enabled = observabilityBrowserAndOperationEventsContext === true;
        schedule();
      }
    },
    setRev(
      observabilityBrowserAndOperationEventsContext?: Dynamic,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (observabilityBrowserAndOperationEventsContext !== rev) {
        if (
          !(
            (observabilityBrowserAndOperationEventsContext !== null &&
              !resolveObservabilityBrowserAndOperationEventsIsSafeInteger(
                observabilityBrowserAndOperationEventsContext,
              )) ||
            (observabilityBrowserAndOperationEventsContext !== null &&
              rev !== null &&
              observabilityBrowserAndOperationEventsContext < rev &&
              !options)
          )
        ) {
          rev = observabilityBrowserAndOperationEventsContext;
          schedule();
        }
      }
    },
    noteEdit(..._extraArguments: unknown[]): undefined {
      let now: Dynamic = scheduler.now?.();
      let matchesNow = now !== undefined && now - amount < 500;
      if (now !== undefined) {
        amount = now;
      }
      if (matchesNow) return;
      let min = Math.min(
        load() + 1,
        observabilityBrowserAndOperationEventsValue999999999,
      );
      if (min !== resolveObservabilityBrowserAndOperationEventsContextResult3) {
        resolveObservabilityBrowserAndOperationEventsContextResult3 = min;
        scheduler.edits?.save(min);
      }
    },
    clear(..._extraArguments: unknown[]): undefined {
      resolveObservabilityBrowserAndOperationEventsContextResult = null;
      resolveObservabilityBrowserAndOperationEventsContextResult2 = null;
      enabled = false;
      rev = null;
      resolveObservabilityBrowserAndOperationEventsContextHandler3();
    },
  };
}

function subscribeObservabilityBrowserAndOperationEventsWritable(
  observabilityBrowserAndOperationEventsWritable?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let subscribeObservabilityBrowserAndOperationEventsWritableHandler: Dynamic =
    (..._extraArguments: unknown[]): Dynamic =>
      observabilityBrowserAndOperationEventsWritable.writableKnown
        ? observabilityBrowserAndOperationEventsWritable.writable
        : undefined;
  let subscribeObservabilityBrowserAndOperationEventsWritableHandler2: Dynamic =
    subscribeObservabilityBrowserAndOperationEventsWritableHandler();
  options(subscribeObservabilityBrowserAndOperationEventsWritableHandler2);
  let options2 = (
    observabilityBrowserAndOperationEventsWritable2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      observabilityBrowserAndOperationEventsWritable2 !==
      subscribeObservabilityBrowserAndOperationEventsWritableHandler2
    ) {
      subscribeObservabilityBrowserAndOperationEventsWritableHandler2 =
        observabilityBrowserAndOperationEventsWritable2;
      options(observabilityBrowserAndOperationEventsWritable2);
    }
  };
  return observabilityBrowserAndOperationEventsWritable.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      switch (entry.kind) {
        case `writable`:
        case `live`:
        case `recovered`:
          options2(
            subscribeObservabilityBrowserAndOperationEventsWritableHandler(),
          );
          return;
        default:
          return;
      }
    },
  );
}

var ObservabilityBrowserAndOperationEventsState5: number;

var resolveObservabilityBrowserAndOperationEventsIsFinite2: Dynamic;

var ObservabilityBrowserAndOperationEventsWal: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue30: (observabilityBrowserAndOperationEventsValue30?: unknown, ..._extraArguments: unknown[]) => string;

var resolveObservabilityBrowserAndOperationEventsStartsWith2: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue31: Dynamic;

function clearObservabilityBrowserAndOperationEventsKeyPath(
  clearObservabilityBrowserAndOperationEventsKeyPath2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (
      resolve?: Dynamic,
      reject?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let open: Dynamic =
        clearObservabilityBrowserAndOperationEventsKeyPath2.open(
          options.db,
          options.version,
        );
      open.addEventListener(
        `upgradeneeded`,
        (..._extraArguments: unknown[]): undefined => {
          if (!open.result.objectStoreNames.contains(options.store)) {
            open.result.createObjectStore(
              options.store,
              options.keyPath
                ? {
                    keyPath: [...options.keyPath],
                  }
                : undefined,
            );
          }
        },
      );
      open.addEventListener(
        `error`,
        (..._extraArguments: unknown[]): Dynamic =>
          reject(Error(`unsent sweep: open failed`)),
      );
      open.addEventListener(
        `blocked`,
        (..._extraArguments: unknown[]): Dynamic =>
          reject(Error(`unsent sweep: open blocked`)),
      );
      open.addEventListener(
        `success`,
        (..._extraArguments: unknown[]): undefined => {
          let result: Dynamic = open.result;
          result.addEventListener(
            `versionchange`,
            (..._extraArguments: unknown[]): Dynamic => result.close(),
          );
          let record2: Dynamic = {
            foreign: 0,
            stale: 0,
          };
          try {
            let transaction: Dynamic = result.transaction(
              options.store,
              `readwrite`,
            );
            let openCursor: Dynamic = transaction
              .objectStore(options.store)
              .openCursor();
            openCursor.addEventListener(
              `success`,
              (..._extraArguments: unknown[]): undefined => {
                let result2: Dynamic = openCursor.result;
                if (!result2) return;
                let context2: Dynamic = context(result2.key, result2.value);
                if (context2 === `foreign` || context2 === `stale`) {
                  record2[context2] += 1;
                  result2.delete();
                } else {
                  if (context2 !== `keep`) {
                    result2.update(context2.stamp);
                  }
                }
                result2.continue();
              },
            );
            transaction.addEventListener(
              `complete`,
              (..._extraArguments: unknown[]): Dynamic => (
                result.close(),
                resolve(record2)
              ),
            );
            transaction.addEventListener(
              `abort`,
              (..._extraArguments: unknown[]): Dynamic => (
                result.close(),
                reject(Error(`unsent sweep: transaction aborted`))
              ),
            );
          } catch (clearObservabilityBrowserAndOperationEventsKeyPathResult: Dynamic) {
            result.close();
            reject(
              clearObservabilityBrowserAndOperationEventsKeyPathResult instanceof
                Error
                ? clearObservabilityBrowserAndOperationEventsKeyPathResult
                : Error(`unsent sweep: transaction failed`),
            );
          }
        },
      );
    },
  );
}

var resolveObservabilityBrowserAndOperationEventsPrefix: (observabilityBrowserAndOperationEventsPrefix?: Dynamic, ..._extraArguments: unknown[]) => string;

function isObservabilityBrowserAndOperationEventsStartsWith(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = ObservabilityBrowserAndOperationEventsState5,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let index = 0; index < event.length; index++) {
    let key: Dynamic = event.key(index);
    if (
      key !== null &&
      key.startsWith(ObservabilityBrowserAndOperationEventsWal.stage.prefix)
    ) {
      items.push(key);
    }
  }
  let count: Dynamic = 0;
  for (let isObservabilityBrowserAndOperationEventsStartsWithResult of items as Dynamic) {
    let isObservabilityBrowserAndOperationEventsStartsWithResultSlice: Dynamic =
      isObservabilityBrowserAndOperationEventsStartsWithResult.slice(
        ObservabilityBrowserAndOperationEventsWal.stage.prefix.length,
      );
    if (
      isObservabilityBrowserAndOperationEventsStartsWithResultSlice.startsWith(
        `stage:`,
      ) &&
      isObservabilityBrowserAndOperationEventsStartsWithResultSlice
        .slice(6)
        .startsWith(options)
    ) {
      let items2: Dynamic;
      try {
        items2 = JSON.parse(
          event.getItem(
            isObservabilityBrowserAndOperationEventsStartsWithResult,
          ) ?? `[]`,
        );
      } catch {
        continue;
      }
      if (!Array.isArray(items2)) continue;
      let filteredItems: Dynamic = items2.filter(
        (activity?: Dynamic, ..._extraArguments: unknown[]) =>
          !(
            resolveObservabilityBrowserAndOperationEventsValue31(activity) &&
            resolveObservabilityBrowserAndOperationEventsIsFinite2(
              activity.at,
              context,
              dependencies,
            )
          ),
      );
      if (filteredItems.length === items2.length) continue;
      count += items2.length - filteredItems.length;
      if (filteredItems.length === 0) {
        event.removeItem(
          isObservabilityBrowserAndOperationEventsStartsWithResult,
        );
      } else {
        event.setItem(
          isObservabilityBrowserAndOperationEventsStartsWithResult,
          JSON.stringify(filteredItems),
        );
      }
    } else if (
      isObservabilityBrowserAndOperationEventsStartsWithResultSlice.startsWith(
        `wordsAt:`,
      ) &&
      isObservabilityBrowserAndOperationEventsStartsWithResultSlice
        .slice(8)
        .startsWith(options)
    ) {
      let isObservabilityBrowserAndOperationEventsStartsWithResultSliceSlice: Dynamic =
        isObservabilityBrowserAndOperationEventsStartsWithResultSlice.slice(8);
      let label = `${ObservabilityBrowserAndOperationEventsWal.stage.prefix}words:${isObservabilityBrowserAndOperationEventsStartsWithResultSliceSlice}`;
      let matchesItem = event.getItem(label) !== null;
      if (
        matchesItem &&
        !resolveObservabilityBrowserAndOperationEventsIsFinite2(
          Number(
            event.getItem(
              isObservabilityBrowserAndOperationEventsStartsWithResult,
            ),
          ),
          context,
          dependencies,
        )
      )
        continue;
      if (matchesItem) {
        event.removeItem(label);
        count += 1;
      }
      event.removeItem(
        isObservabilityBrowserAndOperationEventsStartsWithResult,
      );
    }
  }
  return count;
}

function isObservabilityBrowserAndOperationEventsForeign(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (options !== ``)
    for (let index = 0; index < event.length; index++) {
      let key: Dynamic = event.key(index);
      if (
        key === null ||
        !key.startsWith(ObservabilityBrowserAndOperationEventsWal.stage.prefix)
      )
        continue;
      let keySlice: Dynamic = key.slice(
        ObservabilityBrowserAndOperationEventsWal.stage.prefix.length,
      );
      let kind: Dynamic =
        ObservabilityBrowserAndOperationEventsWal.stage.kinds.find(
          (kind2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            keySlice.startsWith(kind2),
        );
      if (
        kind !== undefined &&
        !resolveObservabilityBrowserAndOperationEventsStartsWith2(
          options,
          keySlice.slice(kind.length),
        )
      ) {
        items.push(key);
      }
    }
  for (let isObservabilityBrowserAndOperationEventsForeignResult of items as Dynamic)
    event.removeItem(isObservabilityBrowserAndOperationEventsForeignResult);
  return {
    foreign: items.filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        !item.startsWith(
          `${ObservabilityBrowserAndOperationEventsWal.stage.prefix}wordsAt:`,
        ),
    ).length,
    stale: isObservabilityBrowserAndOperationEventsStartsWith(
      event,
      options === `` ? `` : `${options}|`,
      context,
      dependencies,
    ),
  };
}

async function loadObservabilityBrowserAndOperationEventsOwner(
  observabilityBrowserAndOperationEventsOwner?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let {
    owner: observabilityBrowserAndOperationEventsOwner2,
    idb: observabilityBrowserAndOperationEventsOwner3,
    staging: observabilityBrowserAndOperationEventsOwner4,
    now: observabilityBrowserAndOperationEventsOwner5,
  }: Dynamic = observabilityBrowserAndOperationEventsOwner;
  let maxAgeMs: Dynamic =
    observabilityBrowserAndOperationEventsOwner.maxAgeMs ?? 6048e5;
  let record2: Dynamic = {
    wal: {
      foreign: 0,
      stale: 0,
      failed: false,
    },
    stage: {
      foreign: 0,
      stale: 0,
      failed: false,
    },
    outbox: {
      foreign: 0,
      stale: 0,
      failed: false,
    },
  };
  try {
    if (observabilityBrowserAndOperationEventsOwner4) {
      Object.assign(
        record2.stage,
        isObservabilityBrowserAndOperationEventsForeign(
          observabilityBrowserAndOperationEventsOwner4,
          observabilityBrowserAndOperationEventsOwner2,
          observabilityBrowserAndOperationEventsOwner5,
          maxAgeMs,
        ),
      );
    }
  } catch {
    record2.stage.failed = true;
  }
  if (!observabilityBrowserAndOperationEventsOwner3) return record2;
  let clearObservabilityBrowserAndOperationEventsKeyPath2 = async (
    observabilityBrowserAndOperationEventsOwner6?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    try {
      Object.assign(
        record2[observabilityBrowserAndOperationEventsOwner6],
        await clearObservabilityBrowserAndOperationEventsKeyPath(
          observabilityBrowserAndOperationEventsOwner3,
          ObservabilityBrowserAndOperationEventsWal[
            observabilityBrowserAndOperationEventsOwner6
          ],
          options,
        ),
      );
    } catch {
      record2[observabilityBrowserAndOperationEventsOwner6].failed = true;
    }
  };
  await Promise.all([
    clearObservabilityBrowserAndOperationEventsKeyPath2(
      `wal`,
      (
        observabilityBrowserAndOperationEventsOwner6?: Dynamic,
        activity?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let observabilityBrowserAndOperationEventsOwnerItem: Dynamic =
          Array.isArray(observabilityBrowserAndOperationEventsOwner6)
            ? observabilityBrowserAndOperationEventsOwner6[0]
            : undefined;
        return typeof observabilityBrowserAndOperationEventsOwnerItem ==
          `string`
          ? observabilityBrowserAndOperationEventsOwner2 !== `` &&
            !resolveObservabilityBrowserAndOperationEventsStartsWith2(
              observabilityBrowserAndOperationEventsOwner2,
              observabilityBrowserAndOperationEventsOwnerItem,
            )
            ? `foreign`
            : resolveObservabilityBrowserAndOperationEventsValue31(activity)
              ? resolveObservabilityBrowserAndOperationEventsIsFinite2(
                  activity.at,
                  observabilityBrowserAndOperationEventsOwner5,
                  maxAgeMs,
                )
                ? `stale`
                : typeof activity.at == `number`
                  ? `keep`
                  : {
                      stamp: {
                        ...activity,
                        at: observabilityBrowserAndOperationEventsOwner5,
                      },
                    }
              : `keep`
          : `keep`;
      },
    ),
    clearObservabilityBrowserAndOperationEventsKeyPath2(
      `outbox`,
      (
        observabilityBrowserAndOperationEventsOwner6?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        !resolveObservabilityBrowserAndOperationEventsValue31(options) ||
        typeof options.scope != `string`
          ? `keep`
          : observabilityBrowserAndOperationEventsOwner2 !== `` &&
              !resolveObservabilityBrowserAndOperationEventsStartsWith2(
                observabilityBrowserAndOperationEventsOwner2,
                options.scope,
              )
            ? `foreign`
            : typeof options.createdAt == `string` &&
                resolveObservabilityBrowserAndOperationEventsIsFinite2(
                  Date.parse(options.createdAt),
                  observabilityBrowserAndOperationEventsOwner5,
                  maxAgeMs,
                )
              ? `stale`
              : `keep`,
    ),
  ]);
  return record2;
}

function resolveObservabilityBrowserAndOperationEventsKey7(
  observabilityBrowserAndOperationEventsKey7?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let resolveObservabilityBrowserAndOperationEventsKey7Handler = (
    reason?: Dynamic,
    component?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined =>
    void items.push({
      name: `pages.unsent.cleared`,
      key: `${reason}:${component}`,
      fields: {
        reason: reason,
        component: component,
        count: Math.max(1, Math.min(65535, context)),
      },
    });
  for (let resolveObservabilityBrowserAndOperationEventsKey7Result of [
    `wal`,
    `stage`,
    `outbox`,
  ] as Dynamic) {
    let observabilityBrowserAndOperationEventsKey7Item: Dynamic =
      observabilityBrowserAndOperationEventsKey7[
        resolveObservabilityBrowserAndOperationEventsKey7Result
      ];
    if (observabilityBrowserAndOperationEventsKey7Item.foreign > 0) {
      resolveObservabilityBrowserAndOperationEventsKey7Handler(
        `viewer_changed`,
        resolveObservabilityBrowserAndOperationEventsKey7Result,
        observabilityBrowserAndOperationEventsKey7Item.foreign,
      );
    }
    if (observabilityBrowserAndOperationEventsKey7Item.stale > 0) {
      resolveObservabilityBrowserAndOperationEventsKey7Handler(
        `stale`,
        resolveObservabilityBrowserAndOperationEventsKey7Result,
        observabilityBrowserAndOperationEventsKey7Item.stale,
      );
    }
    if (observabilityBrowserAndOperationEventsKey7Item.failed) {
      resolveObservabilityBrowserAndOperationEventsKey7Handler(
        `failed`,
        resolveObservabilityBrowserAndOperationEventsKey7Result,
        1,
      );
    }
  }
  return items;
}

var observabilityBrowserAndOperationEventsMap: Dynamic;

function updateObservabilityBrowserAndOperationEventsOwner(
  updateObservabilityBrowserAndOperationEventsOwner2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityBrowserAndOperationEventsMapEntry: Dynamic =
    observabilityBrowserAndOperationEventsMap.get(
      updateObservabilityBrowserAndOperationEventsOwner2.owner,
    );
  if (observabilityBrowserAndOperationEventsMapEntry === undefined) {
    observabilityBrowserAndOperationEventsMapEntry =
      loadObservabilityBrowserAndOperationEventsOwner(
        updateObservabilityBrowserAndOperationEventsOwner2,
      ).then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        for (let updateObservabilityBrowserAndOperationEventsOwnerResult of resolveObservabilityBrowserAndOperationEventsKey7(
          result,
        ) as Dynamic)
          try {
            options(updateObservabilityBrowserAndOperationEventsOwnerResult);
          } catch {}
        return result;
      });
    observabilityBrowserAndOperationEventsMap.set(
      updateObservabilityBrowserAndOperationEventsOwner2.owner,
      observabilityBrowserAndOperationEventsMapEntry,
    );
  }
  return observabilityBrowserAndOperationEventsMapEntry;
}

function resolveObservabilityBrowserAndOperationEventsIndexedDB(
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let indexedDB: Dynamic = (globalThis as Dynamic).indexedDB;
    return indexedDB != null && typeof indexedDB.open == `function`
      ? indexedDB
      : null;
  } catch {
    return null;
  }
}

var ObservabilityBrowserAndOperationEventsBongoSupportCode: string;

var ObservabilityBrowserAndOperationEvents0123456789ABCDEFGHJKMNPQRSTVWXYZ: string;

var observabilityBrowserAndOperationEventsPattern24: RegExp;

function resolveObservabilityBrowserAndOperationEventsValue32(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length !== 10)
    throw Error(`supportCode: need exactly 10 random bytes`);
  let count: Dynamic = 0;
  let count2 = 0;
  let label: Dynamic = ``;
  for (let resolveObservabilityBrowserAndOperationEventsValue32Result of items as Dynamic)
    for (
      count2 =
        (count2 << 8) |
        resolveObservabilityBrowserAndOperationEventsValue32Result,
        count += 8;
      count >= 5;

    ) {
      count -= 5;
      label +=
        ObservabilityBrowserAndOperationEvents0123456789ABCDEFGHJKMNPQRSTVWXYZ[
          (count2 >>> count) & 31
        ];
    }
  return label;
}

function resolveObservabilityBrowserAndOperationEventsSlice(
  observabilityBrowserAndOperationEventsSlice?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let observabilityBrowserAndOperationEventsValue323: Dynamic =
    resolveObservabilityBrowserAndOperationEventsValue32(
      observabilityBrowserAndOperationEventsSlice,
    );
  return `PG-${observabilityBrowserAndOperationEventsValue323.slice(0, 4)}-${observabilityBrowserAndOperationEventsValue323.slice(4, 8)}-${observabilityBrowserAndOperationEventsValue323.slice(8, 12)}-${observabilityBrowserAndOperationEventsValue323.slice(12, 16)}`;
}

function resolveObservabilityBrowserAndOperationEventsJoin(
  observabilityBrowserAndOperationEventsJoin?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBrowserAndOperationEventsJoin
    .split(`-`)
    .slice(0, 3)
    .join(`-`);
}

function resolveObservabilityBrowserAndOperationEventsReloaded(
  observabilityBrowserAndOperationEventsReloaded?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (observabilityBrowserAndOperationEventsReloaded.reloaded)
    try {
      let item: Dynamic =
        observabilityBrowserAndOperationEventsReloaded.storage?.getItem(
          ObservabilityBrowserAndOperationEventsBongoSupportCode,
        );
      if (
        typeof item == `string` &&
        observabilityBrowserAndOperationEventsPattern24.test(item)
      )
        return item;
    } catch {}
  let observabilityBrowserAndOperationEventsSlice =
    resolveObservabilityBrowserAndOperationEventsSlice(
      observabilityBrowserAndOperationEventsReloaded.randomBytes(),
    );
  if (
    !observabilityBrowserAndOperationEventsPattern24.test(
      observabilityBrowserAndOperationEventsSlice,
    )
  )
    throw Error(`supportCode: mint produced an illegal code`);
  try {
    observabilityBrowserAndOperationEventsReloaded.storage?.setItem(
      ObservabilityBrowserAndOperationEventsBongoSupportCode,
      observabilityBrowserAndOperationEventsSlice,
    );
  } catch {}
  return observabilityBrowserAndOperationEventsSlice;
}

var observabilityBrowserAndOperationEventsState2: Dynamic;

function liveSupportCode(..._extraArguments: unknown[]): Dynamic {
  observabilityBrowserAndOperationEventsState2 ??=
    resolveObservabilityBrowserAndOperationEventsReloaded({
      storage: resolveObservabilityBrowserAndOperationEventsSessionStorage(),
      reloaded: isPlatformFrameAndCapabilitiesNavigation(),
      randomBytes: (..._extraArguments: unknown[]) =>
        crypto.getRandomValues(new Uint8Array(10)),
    });
  return observabilityBrowserAndOperationEventsState2;
}

function resolveObservabilityBrowserAndOperationEventsSessionStorage(
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return (globalThis as Dynamic).sessionStorage;
  } catch {
    return;
  }
}

var ObservabilityBrowserAndOperationEventsFOREIGNCONTAINER: Dynamic;

var observabilityBrowserAndOperationEventsState3: Dynamic;

var ObservabilityBrowserAndOperationEventsState6: Dynamic;

function liveLaneDeps(..._extraArguments: unknown[]): Dynamic {
  if (observabilityBrowserAndOperationEventsState3 !== undefined)
    return observabilityBrowserAndOperationEventsState3;
  if (inFrame()) {
    ObservabilityBrowserAndOperationEventsState6.read(
      resolveObservabilityBrowserAndOperationEventsSessionStorage2,
      (..._extraArguments: unknown[]): Dynamic => frameBootContainer()?.id,
    );
  }
  let host: Dynamic = inFrame() ? helloPImport() : null;
  let record2: Dynamic =
    host === null
      ? null
      : {
          host: host,
          schedule: (
            liveLaneDeps2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let setTimeout2 = setTimeout(liveLaneDeps2, options);
            return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
          },
          random: (..._extraArguments: unknown[]) => Math.random(),
          now: (..._extraArguments: unknown[]) => Date.now(),
          hidden: (..._extraArguments: unknown[]) =>
            document.visibilityState === `hidden`,
          churnGuard: (..._extraArguments: unknown[]): Dynamic =>
            resolvePlatformFeatureFlagsEnabled2(`laneChurnGuard`),
          viewFirstPaint: (..._extraArguments: unknown[]): Dynamic =>
            resolvePlatformFeatureFlagsEnabled2(`firstPaintFromSnapshot`),
          mintOpId: (..._extraArguments: unknown[]) => crypto.randomUUID(),
          mount: resolvePlatformFrameAndCapabilitiesReloaded({
            storage:
              resolveObservabilityBrowserAndOperationEventsSessionStorage2(),
            reloaded: isPlatformFrameAndCapabilitiesNavigation(),
            mint: (..._extraArguments: unknown[]) => crypto.randomUUID(),
          }),
          sc: liveSupportCode(),
          viewerCanEdit: (..._extraArguments: unknown[]): Dynamic =>
            loadObservabilityBrowserAndOperationEventsCanEdit(
              resolveObservabilityBrowserAndOperationEventsClaude3(),
            ),
          ownContainer: (..._extraArguments: unknown[]) => {
            let frameBootContainer2: Dynamic = frameBootContainer();
            return frameBootContainer2 === null
              ? null
              : `${frameBootContainer2.kind}/${frameBootContainer2.id}`;
          },
          onShellOriginUnanswered: (
            ..._extraArguments: unknown[]
          ): undefined => {
            try {
              resolveObservabilityTelemetryShellUnanswered();
            } catch {}
          },
          log: resolveObservabilityBrowserAndOperationEventsWarn,
        };
  observabilityBrowserAndOperationEventsState3 = record2;
  return record2;
}

var observabilityBrowserAndOperationEventsSet36: Dynamic;

function resolveObservabilityBrowserAndOperationEventsWarn(
  observabilityBrowserAndOperationEventsWarn?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  console.warn(`[frameShell] ${observabilityBrowserAndOperationEventsWarn}`);
  for (let resolveObservabilityBrowserAndOperationEventsWarnResult of observabilityBrowserAndOperationEventsSet36 as Dynamic)
    try {
      resolveObservabilityBrowserAndOperationEventsWarnResult(
        observabilityBrowserAndOperationEventsWarn,
      );
    } catch {}
}

function resolveObservabilityBrowserAndOperationEventsValue33(
  observabilityBrowserAndOperationEventsValue33?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let resolveObservabilityBrowserAndOperationEventsValue33Result of observabilityBrowserAndOperationEventsSet36 as Dynamic)
    try {
      resolveObservabilityBrowserAndOperationEventsValue33Result(
        observabilityBrowserAndOperationEventsValue33,
      );
    } catch {}
}

function onFrameShellLog(
  onFrameShellLog2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  observabilityBrowserAndOperationEventsSet36.add(onFrameShellLog2);
  return (..._extraArguments: unknown[]): undefined =>
    void observabilityBrowserAndOperationEventsSet36.delete(onFrameShellLog2);
}

function resolveObservabilityBrowserAndOperationEventsSessionStorage2(
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return (globalThis as Dynamic).sessionStorage;
  } catch {
    return;
  }
}

var resolveObservabilityBrowserAndOperationEventsValue34: Dynamic;

function frameHelloFromEntry(..._extraArguments: unknown[]): undefined {
  try {
    let liveLaneDeps2: Dynamic = liveLaneDeps();
    if (liveLaneDeps2 !== null) {
      resolveEditorExtensionsValue30(liveLaneDeps2);
    }
  } catch {}
}

function frameLane(
  frameLane2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return updateEditorExtensionsByKey(
    frameLane2,
    resolveObservabilityBrowserAndOperationEventsValue34(),
  );
}

function frameDoor(
  frameDoor2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return loadEditorExtensionsCall(
    frameDoor2,
    resolveObservabilityBrowserAndOperationEventsValue34(),
    options,
  );
}

function frameBootContainer(..._extraArguments: unknown[]): Dynamic {
  if (!inFrame() || typeof window === "undefined") return null;
  let window2: Dynamic = window;
  return resolveDataContentAndReferencesBONGOCONTAINER({
    __BONGO_CONTAINER__: window2.__BONGO_CONTAINER__,
    __FRAME_PREAMBLE: window2.__FRAME_PREAMBLE,
    hostname: window2.location?.hostname,
  });
}

function frameArtifactUrl(..._extraArguments: unknown[]) {
  return !inFrame() || typeof window === "undefined"
    ? null
    : resolvePlatformArtifactLinksShellOrigin({
        shellOrigin: helloLImport(helloPImport()),
        hostname: window.location?.hostname,
        containerId: frameBootContainer()?.id,
      });
}

function frameArtifactUrlFor(
  frameArtifactUrl2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !inFrame() || typeof window === "undefined"
    ? null
    : resolvePlatformArtifactLinksValue2(
        helloLImport(helloPImport()),
        frameArtifactUrl2,
      );
}

function frameSignInHref(..._extraArguments: unknown[]) {
  return !inFrame() || typeof window === "undefined"
    ? resolveObservabilityBrowserAndOperationEventsValue26(null, null)
    : resolveObservabilityBrowserAndOperationEventsValue26(
        helloLImport(helloPImport()),
        resolvePlatformArtifactLinksHostname({
          hostname: window.location?.hostname,
          containerId: frameBootContainer()?.id,
        }),
      );
}

var frameUserCapability: Dynamic;

function subscribeFrameDeadReason(
  frameDeadReason?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameLane2: Dynamic = frameLane(frameDeadReason);
  options(frameLane2.deadReason);
  return frameLane2.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (entry.kind === `down` && entry.terminal) {
        options(frameLane2.deadReason ?? entry.reason);
      }
    },
  );
}

function subscribeFrameShellOriginChanged(
  frameShellOriginChanged?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return helloOImport(
      inFrame() ? helloPImport() : null,
      frameShellOriginChanged,
    );
  } catch {
    return (..._extraArguments: unknown[]): undefined => {};
  }
}

function subscribeFrameWritable(
  frameWritable?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameLane2: Dynamic = frameLane(frameWritable);
  options(frameLane2.writable);
  return frameLane2.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (entry.kind === `writable`) {
        options(entry.writable);
      }
    },
  );
}

function subscribeFrameCommentable(
  frameCommentable?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameLane2: Dynamic = frameLane(frameCommentable);
  options(frameLane2.commentable);
  return frameLane2.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (entry.kind === `commentable`) {
        options(entry.commentable);
      }
    },
  );
}

function subscribeFrameWriteVerdict(
  frameWriteVerdict?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return subscribeObservabilityBrowserAndOperationEventsWritable(
    frameLane(frameWriteVerdict),
    options,
  );
}

function subscribeFrameViewer(
  frameViewer2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameLane2: Dynamic = frameLane(frameViewer2);
  options(frameLane2.viewer);
  return frameLane2.subscribe(
    (actor?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (actor.kind === `viewer`) {
        options(actor.principal);
      }
    },
  );
}

function frameFenceAuthor(
  frameFenceAuthor2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return inFrame()
    ? (getEditorExtensionsValue(frameFenceAuthor2)?.viewer ?? null)
    : null;
}

function frameLaneLink(
  frameLaneLink2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!inFrame()) return;
  let editorExtensionsValue: Dynamic = getEditorExtensionsValue(frameLaneLink2);
  return editorExtensionsValue === undefined
    ? undefined
    : {
        state: editorExtensionsValue.state,
        connecting: editorExtensionsValue.connecting,
      };
}

function subscribeFrameViewerRole(
  frameViewerRole?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameLane2: Dynamic = frameLane(frameViewerRole);
  options(frameLane2.viewerRole);
  return frameLane2.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (entry.kind === `viewer`) {
        options(entry.role);
      }
    },
  );
}

function subscribeFrameViewerClass(
  frameViewerClass?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameLane2: Dynamic = frameLane(frameViewerClass);
  options(frameLane2.viewerClass);
  return frameLane2.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (entry.kind === `viewer`) {
        options(entry.cls);
      }
    },
  );
}

function frameViewerOutside(..._extraArguments: unknown[]) {
  let frameBootContainer2: Dynamic = frameBootContainer();
  return (
    frameBootContainer2 !== null &&
    resolveDataContentAndReferencesValue3(
      getEditorExtensionsValue(
        `${frameBootContainer2.kind}/${frameBootContainer2.id}`,
      )?.viewerClass,
    )
  );
}

function frameViewerClassWord(..._extraArguments: unknown[]): Dynamic {
  let frameBootContainer2: Dynamic = frameBootContainer();
  return frameBootContainer2 === null
    ? null
    : (getEditorExtensionsValue(
        `${frameBootContainer2.kind}/${frameBootContainer2.id}`,
      )?.viewerClass ?? null);
}

function frameViewerStanding(..._extraArguments: unknown[]) {
  let frameBootContainer2: Dynamic = frameBootContainer();
  let viewerClass: Dynamic =
    frameBootContainer2 === null
      ? null
      : (getEditorExtensionsValue(
          `${frameBootContainer2.kind}/${frameBootContainer2.id}`,
        )?.viewerClass ?? null);
  return viewerClass === null
    ? `unknown`
    : resolveDataContentAndReferencesValue4(viewerClass)
      ? `member`
      : `outside`;
}

function onFrameViewerClassChange(
  onFrameViewerClassChange2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameBootContainer2: Dynamic = frameBootContainer();
  if (frameBootContainer2 === null)
    return (..._extraArguments: unknown[]): undefined => {};
  let label = `${frameBootContainer2.kind}/${frameBootContainer2.id}`;
  let enabled = false;
  let onFrameViewerClassChangeHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {};
  let subscribe = (
    onFrameViewerClassChange3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let viewerClass: Dynamic = onFrameViewerClassChange3.viewerClass;
    onFrameViewerClassChangeHandler = onFrameViewerClassChange3.subscribe(
      (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!(entry.kind !== `viewer` || entry.cls === viewerClass)) {
          viewerClass = entry.cls;
          onFrameViewerClassChange2();
        }
      },
    );
  };
  let editorExtensionsValue: Dynamic = getEditorExtensionsValue(label);
  if (editorExtensionsValue !== undefined) {
    subscribe(editorExtensionsValue);
    return (..._extraArguments: unknown[]) => onFrameViewerClassChangeHandler();
  }
  let observabilityBrowserAndOperationEventsMade: Dynamic =
    loadObservabilityBrowserAndOperationEventsMade(label);
  observabilityBrowserAndOperationEventsMade.made.then(
    (..._extraArguments: unknown[]): undefined => {
      observabilityBrowserAndOperationEventsMade.leave();
      let editorExtensionsValue2: Dynamic = enabled
        ? undefined
        : getEditorExtensionsValue(label);
      if (editorExtensionsValue2 !== undefined) {
        if (editorExtensionsValue2.viewerClass !== null) {
          onFrameViewerClassChange2();
        }
        subscribe(editorExtensionsValue2);
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    enabled = true;
    observabilityBrowserAndOperationEventsMade.leave();
    onFrameViewerClassChangeHandler();
  };
}

var VIEWER_CLASS_WAIT_MS: number;

var ObservabilityBrowserAndOperationEventsState7: number;

var observabilityBrowserAndOperationEventsWeakMap: Dynamic;

var observabilityBrowserAndOperationEventsMap2: Dynamic;

var observabilityBrowserAndOperationEventsValue0: number;

var resolveObservabilityBrowserAndOperationEventsValue35: Dynamic;

function loadObservabilityBrowserAndOperationEventsMade(
  observabilityBrowserAndOperationEventsMade?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityBrowserAndOperationEventsMap2Entry: Dynamic =
    observabilityBrowserAndOperationEventsMap2.get(
      observabilityBrowserAndOperationEventsMade,
    );
  if (observabilityBrowserAndOperationEventsMap2Entry === undefined) {
    let observabilityBrowserAndOperationEventsValue05 =
      observabilityBrowserAndOperationEventsValue0;
    let record2 = {
      made: Promise.resolve(),
      waiters: 1,
    };
    let getEditorExtensionsValue2: Dynamic = (..._extraArguments: unknown[]) =>
      getEditorExtensionsValue(observabilityBrowserAndOperationEventsMade) ===
        undefined &&
      observabilityBrowserAndOperationEventsValue05 ===
        observabilityBrowserAndOperationEventsValue0 &&
      record2.waiters > 0;
    observabilityBrowserAndOperationEventsMap2.set(
      observabilityBrowserAndOperationEventsMade,
      record2,
    );
    record2.made = (async (
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      for (; getEditorExtensionsValue2(); )
        await resolveObservabilityBrowserAndOperationEventsValue35(100);
      if (
        observabilityBrowserAndOperationEventsMap2.get(
          observabilityBrowserAndOperationEventsMade,
        ) === record2
      ) {
        observabilityBrowserAndOperationEventsMap2.delete(
          observabilityBrowserAndOperationEventsMade,
        );
      }
    })();
    observabilityBrowserAndOperationEventsMap2Entry = record2;
  } else observabilityBrowserAndOperationEventsMap2Entry.waiters++;
  let observabilityBrowserAndOperationEventsMap2Entry2: Dynamic =
    observabilityBrowserAndOperationEventsMap2Entry;
  let enabled = false;
  return {
    made: observabilityBrowserAndOperationEventsMap2Entry2.made,
    leave: (..._extraArguments: unknown[]): undefined => {
      if (!enabled) {
        enabled = true;
        observabilityBrowserAndOperationEventsMap2Entry2.waiters--;
      }
    },
  };
}

function updateObservabilityBrowserAndOperationEventsNamed(
  updateObservabilityBrowserAndOperationEventsNamed2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityBrowserAndOperationEventsWeakMapEntry: Dynamic =
    observabilityBrowserAndOperationEventsWeakMap.get(
      updateObservabilityBrowserAndOperationEventsNamed2,
    );
  if (observabilityBrowserAndOperationEventsWeakMapEntry === undefined) {
    let updateObservabilityBrowserAndOperationEventsNamedHandler = (
      ..._extraArguments: unknown[]
    ): undefined => {};
    let updateObservabilityBrowserAndOperationEventsNamedHandler2 = (
      ..._extraArguments: unknown[]
    ): undefined => {};
    let record2: Dynamic = {
      named: new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (updateObservabilityBrowserAndOperationEventsNamedHandler = resolve),
      ),
      waiters: 0,
      end: (..._extraArguments: unknown[]): undefined => {},
    };
    record2.end = (..._extraArguments: unknown[]): undefined => {
      updateObservabilityBrowserAndOperationEventsNamedHandler2();
      if (
        observabilityBrowserAndOperationEventsWeakMap.get(
          updateObservabilityBrowserAndOperationEventsNamed2,
        ) === record2
      ) {
        observabilityBrowserAndOperationEventsWeakMap.delete(
          updateObservabilityBrowserAndOperationEventsNamed2,
        );
      }
      updateObservabilityBrowserAndOperationEventsNamedHandler();
    };
    updateObservabilityBrowserAndOperationEventsNamedHandler2 =
      updateObservabilityBrowserAndOperationEventsNamed2.subscribe(
        (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            (entry.kind === `viewer` && entry.cls !== null) ||
            (entry.kind === `down` && entry.terminal)
          ) {
            record2.end();
          }
        },
      );
    observabilityBrowserAndOperationEventsWeakMap.set(
      updateObservabilityBrowserAndOperationEventsNamed2,
      record2,
    );
    observabilityBrowserAndOperationEventsWeakMapEntry = record2;
  }
  observabilityBrowserAndOperationEventsWeakMapEntry.waiters++;
  let observabilityBrowserAndOperationEventsWeakMapEntry2: Dynamic =
    observabilityBrowserAndOperationEventsWeakMapEntry;
  let enabled = false;
  return {
    named: observabilityBrowserAndOperationEventsWeakMapEntry2.named,
    leave: (..._extraArguments: unknown[]): undefined => {
      if (!enabled) {
        enabled = true;
        if (
          --observabilityBrowserAndOperationEventsWeakMapEntry2.waiters === 0
        ) {
          observabilityBrowserAndOperationEventsWeakMapEntry2.end();
        }
      }
    },
  };
}

async function loadObservabilityBrowserAndOperationEventsUnknown(
  observabilityBrowserAndOperationEventsUnknown?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let frameViewerStanding2 = frameViewerStanding();
  if (frameViewerStanding2 !== `unknown`) return frameViewerStanding2;
  let frameBootContainer2: Dynamic = frameBootContainer();
  if (frameBootContainer2 === null) return `unknown`;
  let label = `${frameBootContainer2.kind}/${frameBootContainer2.id}`;
  let loadObservabilityBrowserAndOperationEventsUnknownHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {};
  let promise: Dynamic =
    observabilityBrowserAndOperationEventsUnknown === null
      ? null
      : new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let setTimeout2: Dynamic = setTimeout(
              (..._extraArguments: unknown[]): Dynamic => resolve(`out`),
              observabilityBrowserAndOperationEventsUnknown,
            );
            loadObservabilityBrowserAndOperationEventsUnknownHandler = (
              ..._extraArguments: unknown[]
            ): Dynamic => clearTimeout(setTimeout2);
          },
        );
  let race: Dynamic = (
    observabilityBrowserAndOperationEventsUnknown2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    promise === null
      ? observabilityBrowserAndOperationEventsUnknown2
      : Promise.race([observabilityBrowserAndOperationEventsUnknown2, promise]);
  try {
    if (getEditorExtensionsValue(label) === undefined) {
      let observabilityBrowserAndOperationEventsMade: Dynamic =
        loadObservabilityBrowserAndOperationEventsMade(label);
      try {
        if (
          (await race(observabilityBrowserAndOperationEventsMade.made)) ===
          `out`
        )
          return `unknown`;
      } finally {
        observabilityBrowserAndOperationEventsMade.leave();
      }
    }
    let editorExtensionsValue: Dynamic = getEditorExtensionsValue(label);
    if (editorExtensionsValue === undefined) return `unknown`;
    for (
      ;
      editorExtensionsValue.viewerClass === null &&
      editorExtensionsValue.state !== `dead`;

    ) {
      let updateObservabilityBrowserAndOperationEventsNamed2: Dynamic =
        updateObservabilityBrowserAndOperationEventsNamed(
          editorExtensionsValue,
        );
      let loadObservabilityBrowserAndOperationEventsUnknownResult: Dynamic;
      try {
        loadObservabilityBrowserAndOperationEventsUnknownResult = await race(
          updateObservabilityBrowserAndOperationEventsNamed2.named,
        );
      } finally {
        updateObservabilityBrowserAndOperationEventsNamed2.leave();
      }
      if (
        loadObservabilityBrowserAndOperationEventsUnknownResult === `out` ||
        observabilityBrowserAndOperationEventsUnknown !== null
      )
        break;
    }
    return frameViewerStanding();
  } finally {
    loadObservabilityBrowserAndOperationEventsUnknownHandler();
  }
}

function frameVersionTable(
  frameVersionTable2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return loadPlatformFrameAndCapabilitiesParent(
    frameLane(`project/${frameVersionTable2}`),
    frameVersionTable2,
  );
}

async function frameEnumRows(
  frameEnumRows2?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return loadPlatformFrameAndCapabilitiesOptions(
    frameLane(`project/${frameEnumRows2}`),
  );
}

function frameProjectAck(
  frameProjectAck2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return loadPlatformFrameAndCapabilitiesVerdict(
    frameLane(`project/${frameProjectAck2}`),
    frameProjectAck2,
  );
}

function frameAssetUrl(
  frameAssetUrl2?: unknown,
  ..._extraArguments: unknown[]
) {
  return null;
}

var resolveObservabilityBrowserAndOperationEventsClaude: Dynamic;

var resolveObservabilityBrowserAndOperationEventsCredentials: Dynamic;

var frameUploadAsset: Dynamic;

var frameBlobBytesResult: Dynamic;

var frameBlobSource: Dynamic;

var resolveObservabilityBrowserAndOperationEventsClaude2: Dynamic;

var frameSampler: Dynamic;

var frameSampleGranted: Dynamic;

var frameSamplePermission: Dynamic;

var resolveObservabilityBrowserAndOperationEventsClaude3: Dynamic;

function resolveObservabilityBrowserAndOperationEventsOwner(
  observabilityBrowserAndOperationEventsOwner?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (inFrame())
    try {
      let staging: Dynamic = null;
      try {
        staging = (globalThis as Dynamic).sessionStorage ?? null;
      } catch {}
      updateObservabilityBrowserAndOperationEventsOwner(
        {
          owner: resolveObservabilityBrowserAndOperationEventsValue30(
            observabilityBrowserAndOperationEventsOwner,
          ),
          idb: resolveObservabilityBrowserAndOperationEventsIndexedDB(),
          staging: staging,
          now: Date.now(),
        },
        emitTelemetryEvent,
      );
    } catch {}
}

var frameViewer: Dynamic;

var ObservabilityBrowserAndOperationEventsState8: Dynamic;

var frameViewerFace: Dynamic;

var frameViewerWithFace: Dynamic;

var frameViewerCan: Dynamic;

var resolveObservabilityBrowserAndOperationEventsClaude4: Dynamic;

var ObservabilityBrowserAndOperationEventsState9: Dynamic;

var frameSampleAvailable: Dynamic;

var frameProofreadEnabled: Dynamic;

var ObservabilityBrowserAndOperationEventsIssues2: Readonly<{
    issues: never[];
    failed: true;
    unavailable: false;
}>;

var frameProofreadRound: Dynamic;

var resolveObservabilityBrowserAndOperationEventsClaude5: Dynamic;

var ObservabilityBrowserAndOperationEventsState10: Dynamic;

var frameDownloadsAvailable: Dynamic;

var frameDownloadsAvailableWithin: Dynamic;

var frameSaveDownload: Dynamic;

var resolveObservabilityBrowserAndOperationEventsClaude6: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue36: Dynamic;

var frameDriveRoad: Dynamic;

var frameConnectorsWithheld: (..._extraArguments: unknown[]) => Promise<boolean>;

var frameDriveFileArgs: Dynamic;

var frameAskDriveConsent: Dynamic;

var frameUploadToDrive: Dynamic;

var framePagesExportRoad: Dynamic;

var frameExportViaMcp: Dynamic;

var frameNotionRoad: Dynamic;

var frameAskNotionConsent: Dynamic;

var frameCreateNotionPage: Dynamic;

var viewerLanguages: Dynamic;

var frameEdgeNow: Dynamic;

var frameTransportFacts: Dynamic;

var frameSinceNavigationMs: Dynamic;

var frameNavigatorOnline: Dynamic;

var observabilityBrowserAndOperationEventsMap3: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue37: Dynamic;

var ObservabilityBrowserAndOperationEventsState11: Dynamic;

var ObservabilityBrowserAndOperationEventsSchedule: Dynamic;

var observabilityBrowserAndOperationEventsWeakSet: Dynamic;

var installObservabilityBrowserAndOperationEventsVisibilitychange: (..._extraArguments: unknown[]) => undefined;

var ObservabilityBrowserAndOperationEventsInline: Dynamic;

var observabilityBrowserAndOperationEventsWeakSet2: Dynamic;

var installObservabilityBrowserAndOperationEventsVisibilitychange2: Dynamic;

var observabilityBrowserAndOperationEventsWeakMap2: Dynamic;

var updateObservabilityBrowserAndOperationEventsAvatarUrl: Dynamic;

var frameProfiles: Dynamic;

var framePeekProfile: Dynamic;

var frameProfilesSubscribe: Dynamic;

var frameFacesSubscribe: Dynamic;

var frameProfilesVersion: Dynamic;

var frameKnownProfiles: Dynamic;

var frameSearchPeople: Dynamic;

var frameInlineAvatar: Dynamic;

// BaoCut: 批注发给智能体的宿主。Frame 里照原样是 window.claude；独立页面（BaoCut）改读 globalThis.docsHost，
// 宿主没装 docsHost.comments 时与原版一样是 null。这个函数只给下面几个批注函数用。
var resolveObservabilityBrowserAndOperationEventsClaude7: Dynamic;

var resolveObservabilityBrowserAndOperationEventsMember: (..._extraArguments: unknown[]) => "off" | "unknown" | null;

var frameSendToClaudeVerdict: Dynamic;

var frameSendToClaudeVerdictAtPress: Dynamic;

var frameSendCommentToClaude: Dynamic;

var frameResolveCommentThread: Dynamic;

var frameRegisterCustomAnchors: Dynamic;

var observabilityBrowserAndOperationEventsState4: Dynamic;

var resolveObservabilityBrowserAndOperationEventsHost: Dynamic;

function frameViewerLocus(
  frameViewerLocus2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityBrowserAndOperationEventsHost: Dynamic =
    resolveObservabilityBrowserAndOperationEventsHost();
  return observabilityBrowserAndOperationEventsHost === null
    ? (..._extraArguments: unknown[]): undefined => {}
    : (observabilityBrowserAndOperationEventsHost.setLocus(frameViewerLocus2),
      (..._extraArguments: unknown[]): Dynamic =>
        observabilityBrowserAndOperationEventsHost.setLocus(null));
}

var frameViewerSelection: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeObservabilityBrowserAndOperationEvents3Step1(): void {
  (resolveObservabilityBrowserAndOperationEventsValue29 = (
    observabilityBrowserAndOperationEventsValue29?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue29 == `object` &&
    !!observabilityBrowserAndOperationEventsValue29);
  (resolveObservabilityBrowserAndOperationEventsError = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let code: Dynamic = resolveObservabilityBrowserAndOperationEventsValue29(
      error,
    )
      ? error.code
      : undefined;
    return typeof code == `string` && /^[a-z_]{1,40}$/.test(code)
      ? code
      : `error`;
  });
  (ObservabilityBrowserAndOperationEventsState5 = 10080 * 60 * 1e3);
  (resolveObservabilityBrowserAndOperationEventsIsFinite2 = (
    observabilityBrowserAndOperationEventsIsFinite2?: unknown,
    options?: Dynamic,
    context: Dynamic = ObservabilityBrowserAndOperationEventsState5,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsIsFinite2 == `number` &&
    Number.isFinite(observabilityBrowserAndOperationEventsIsFinite2) &&
    options - observabilityBrowserAndOperationEventsIsFinite2 > context);
  (ObservabilityBrowserAndOperationEventsWal = {
    wal: {
      db: `bongo.op-wal`,
      version: 1,
      store: `wal`,
    },
    stage: {
      prefix: `bongo.op-wal:`,
      kinds: [`stage:`, `words:`, `wordsAt:`, `live:`],
    },
    outbox: {
      db: `bongo.comment-outbox`,
      version: 1,
      store: `outbox`,
      keyPath: [`scope`, `opId`],
    },
  });
  (resolveObservabilityBrowserAndOperationEventsValue30 = (
    observabilityBrowserAndOperationEventsValue30?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue30 == `string` &&
    observabilityBrowserAndOperationEventsValue30 !== ``
      ? `frame:${observabilityBrowserAndOperationEventsValue30}`
      : ``);
  (resolveObservabilityBrowserAndOperationEventsStartsWith2 = (
    observabilityBrowserAndOperationEventsStarts?: Dynamic,
    options?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsStarts !== `` &&
    typeof options == `string` &&
    options.startsWith(`${observabilityBrowserAndOperationEventsStarts}|`));
  (resolveObservabilityBrowserAndOperationEventsValue31 = (
    observabilityBrowserAndOperationEventsValue31?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue31 == `object` &&
    !!observabilityBrowserAndOperationEventsValue31 &&
    !Array.isArray(observabilityBrowserAndOperationEventsValue31));
  (resolveObservabilityBrowserAndOperationEventsPrefix = (
    observabilityBrowserAndOperationEventsPrefix?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${ObservabilityBrowserAndOperationEventsWal.stage.prefix}wordsAt:${observabilityBrowserAndOperationEventsPrefix}`);
  (observabilityBrowserAndOperationEventsMap = new (Map as Dynamic)());
  (ObservabilityBrowserAndOperationEventsBongoSupportCode = `bongo.support-code`);
  (ObservabilityBrowserAndOperationEvents0123456789ABCDEFGHJKMNPQRSTVWXYZ = `0123456789ABCDEFGHJKMNPQRSTVWXYZ`);
  (observabilityBrowserAndOperationEventsPattern24 = /^PG(-[0-9A-HJKMNP-TV-Z]{4}){4}$/);
  (ObservabilityBrowserAndOperationEventsFOREIGNCONTAINER = rolldownNImport({
      FOREIGN_CONTAINER: (..._extraArguments: unknown[]) => FOREIGN_CONTAINER,
      HOT_EARLY_MAX_MS: (..._extraArguments: unknown[]) => HOT_EARLY_MAX_MS,
      INSTANCE_CHURN: (..._extraArguments: unknown[]) => INSTANCE_CHURN,
      RESET_STORM: (..._extraArguments: unknown[]) => RESET_STORM,
      VIEWER_CLASS_WAIT_MS: (..._extraArguments: unknown[]) =>
        VIEWER_CLASS_WAIT_MS,
      askFrameConversationPane: (..._extraArguments: unknown[]): Dynamic =>
        askFrameConversationPane,
      forwardHostViewport: (..._extraArguments: unknown[]): Dynamic =>
        forwardHostViewport,
      frameArtifactUrl: (..._extraArguments: unknown[]): Dynamic =>
        frameArtifactUrl,
      frameArtifactUrlFor: (..._extraArguments: unknown[]): Dynamic =>
        frameArtifactUrlFor,
      frameAskClaude: (..._extraArguments: unknown[]): Dynamic => frameAskClaude,
      frameAskDriveConsent: (..._extraArguments: unknown[]): Dynamic =>
        frameAskDriveConsent,
      frameAskNotionConsent: (..._extraArguments: unknown[]): Dynamic =>
        frameAskNotionConsent,
      frameAssetUrl: (..._extraArguments: unknown[]): Dynamic => frameAssetUrl,
      frameBlobBytesResult: (..._extraArguments: unknown[]): Dynamic =>
        frameBlobBytesResult,
      frameBlobSource: (..._extraArguments: unknown[]): Dynamic =>
        frameBlobSource,
      frameBootContainer: (..._extraArguments: unknown[]): Dynamic =>
        frameBootContainer,
      frameClaudeWorking: (..._extraArguments: unknown[]): Dynamic =>
        frameClaudeWorking,
      frameConnectorsWithheld: (..._extraArguments: unknown[]): Dynamic =>
        frameConnectorsWithheld,
      frameConversationPane: (..._extraArguments: unknown[]): Dynamic =>
        frameConversationPane,
      frameCreateNotionPage: (..._extraArguments: unknown[]): Dynamic =>
        frameCreateNotionPage,
      frameCurrentAnchor: (..._extraArguments: unknown[]): Dynamic =>
        frameCurrentAnchor,
      frameDeclineExport: (..._extraArguments: unknown[]): Dynamic =>
        frameDeclineExport,
      frameDoor: (..._extraArguments: unknown[]): Dynamic => frameDoor,
      frameDownloadsAvailable: (..._extraArguments: unknown[]): Dynamic =>
        frameDownloadsAvailable,
      frameDownloadsAvailableWithin: (..._extraArguments: unknown[]): Dynamic =>
        frameDownloadsAvailableWithin,
      frameDriveFileArgs: (..._extraArguments: unknown[]): Dynamic =>
        frameDriveFileArgs,
      frameDriveRoad: (..._extraArguments: unknown[]): Dynamic => frameDriveRoad,
      frameEdgeNow: (..._extraArguments: unknown[]): Dynamic => frameEdgeNow,
      frameEnumRows: (..._extraArguments: unknown[]): Dynamic => frameEnumRows,
      frameExportViaMcp: (..._extraArguments: unknown[]): Dynamic =>
        frameExportViaMcp,
      frameFacesSubscribe: (..._extraArguments: unknown[]): Dynamic =>
        frameFacesSubscribe,
      frameFenceAuthor: (..._extraArguments: unknown[]): Dynamic =>
        frameFenceAuthor,
      frameHelloFromEntry: (..._extraArguments: unknown[]): Dynamic =>
        frameHelloFromEntry,
      frameHostAction: (..._extraArguments: unknown[]): Dynamic =>
        frameHostAction,
      frameHostChrome: (..._extraArguments: unknown[]): Dynamic =>
        frameHostChrome,
      frameHostChromeActions: (..._extraArguments: unknown[]): Dynamic =>
        frameHostChromeActions,
      frameHostChromeDestinations: (..._extraArguments: unknown[]): Dynamic =>
        frameHostChromeDestinations,
      frameHostChromeExports: (..._extraArguments: unknown[]): Dynamic =>
        frameHostChromeExports,
      frameHostChromeWitnessed: (..._extraArguments: unknown[]): Dynamic =>
        frameHostChromeWitnessed,
      frameHostExport: (..._extraArguments: unknown[]): Dynamic =>
        frameHostExport,
      frameHostWords: (..._extraArguments: unknown[]): Dynamic => frameHostWords,
      frameHotActivity: (..._extraArguments: unknown[]): Dynamic =>
        frameHotActivity,
      frameHotFrom: (..._extraArguments: unknown[]): Dynamic => frameHotFrom,
      frameHotProvide: (..._extraArguments: unknown[]): Dynamic =>
        frameHotProvide,
      frameHotTouched: (..._extraArguments: unknown[]): Dynamic =>
        frameHotTouched,
      frameInlineAvatar: (..._extraArguments: unknown[]): Dynamic =>
        frameInlineAvatar,
      frameKnownProfiles: (..._extraArguments: unknown[]): Dynamic =>
        frameKnownProfiles,
      frameLane: (..._extraArguments: unknown[]): Dynamic => frameLane,
      frameLaneLink: (..._extraArguments: unknown[]): Dynamic => frameLaneLink,
      frameMentioned: (..._extraArguments: unknown[]): Dynamic => frameMentioned,
      frameNavigatorOnline: (..._extraArguments: unknown[]): Dynamic =>
        frameNavigatorOnline,
      frameNotionRoad: (..._extraArguments: unknown[]): Dynamic =>
        frameNotionRoad,
      frameOpenExternal: (..._extraArguments: unknown[]): Dynamic =>
        frameOpenExternal,
      framePagesExportRoad: (..._extraArguments: unknown[]): Dynamic =>
        framePagesExportRoad,
      framePeekProfile: (..._extraArguments: unknown[]): Dynamic =>
        framePeekProfile,
      frameProfiles: (..._extraArguments: unknown[]): Dynamic => frameProfiles,
      frameProfilesSubscribe: (..._extraArguments: unknown[]): Dynamic =>
        frameProfilesSubscribe,
      frameProfilesVersion: (..._extraArguments: unknown[]): Dynamic =>
        frameProfilesVersion,
      frameProjectAck: (..._extraArguments: unknown[]): Dynamic =>
        frameProjectAck,
      frameProofreadEnabled: (..._extraArguments: unknown[]): Dynamic =>
        frameProofreadEnabled,
      frameProofreadRound: (..._extraArguments: unknown[]): Dynamic =>
        frameProofreadRound,
      frameRegisterCustomAnchors: (..._extraArguments: unknown[]): Dynamic =>
        frameRegisterCustomAnchors,
      frameResolveCommentThread: (..._extraArguments: unknown[]): Dynamic =>
        frameResolveCommentThread,
      frameSampleAvailable: (..._extraArguments: unknown[]): Dynamic =>
        frameSampleAvailable,
      frameSampleGranted: (..._extraArguments: unknown[]): Dynamic =>
        frameSampleGranted,
      frameSamplePermission: (..._extraArguments: unknown[]): Dynamic =>
        frameSamplePermission,
      frameSampler: (..._extraArguments: unknown[]): Dynamic => frameSampler,
      frameSaveDownload: (..._extraArguments: unknown[]): Dynamic =>
        frameSaveDownload,
      frameSearchPeople: (..._extraArguments: unknown[]): Dynamic =>
        frameSearchPeople,
      frameSendCommentToClaude: (..._extraArguments: unknown[]): Dynamic =>
        frameSendCommentToClaude,
      frameSendToClaudeVerdict: (..._extraArguments: unknown[]): Dynamic =>
        frameSendToClaudeVerdict,
      frameSendToClaudeVerdictAtPress: (..._extraArguments: unknown[]): Dynamic =>
        frameSendToClaudeVerdictAtPress,
      frameSignInHref: (..._extraArguments: unknown[]): Dynamic =>
        frameSignInHref,
      frameSinceNavigationMs: (..._extraArguments: unknown[]): Dynamic =>
        frameSinceNavigationMs,
      frameTitleFromContent: (..._extraArguments: unknown[]): Dynamic =>
        frameTitleFromContent,
      frameTitlePropose: (..._extraArguments: unknown[]): Dynamic =>
        frameTitlePropose,
      frameTransportFacts: (..._extraArguments: unknown[]): Dynamic =>
        frameTransportFacts,
      frameUploadAsset: (..._extraArguments: unknown[]): Dynamic =>
        frameUploadAsset,
      frameUploadToDrive: (..._extraArguments: unknown[]): Dynamic =>
        frameUploadToDrive,
      frameUserCapability: (..._extraArguments: unknown[]): Dynamic =>
        frameUserCapability,
      frameVersionTable: (..._extraArguments: unknown[]): Dynamic =>
        frameVersionTable,
      frameViewer: (..._extraArguments: unknown[]): Dynamic => frameViewer,
      frameViewerCan: (..._extraArguments: unknown[]): Dynamic => frameViewerCan,
      frameViewerClassWord: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerClassWord,
      frameViewerDirty: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerDirty,
      frameViewerDirtyNow: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerDirtyNow,
      frameViewerEdit: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerEdit,
      frameViewerFace: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerFace,
      frameViewerLocus: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerLocus,
      frameViewerOutside: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerOutside,
      frameViewerPortAwaited: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerPortAwaited,
      frameViewerRev: (..._extraArguments: unknown[]): Dynamic => frameViewerRev,
      frameViewerSaveLive: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerSaveLive,
      frameViewerSaveWord: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerSaveWord,
      frameViewerSelection: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerSelection,
      frameViewerStaged: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerStaged,
      frameViewerStanding: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerStanding,
      frameViewerWithFace: (..._extraArguments: unknown[]): Dynamic =>
        frameViewerWithFace,
      hostSays: (..._extraArguments: unknown[]): Dynamic => hostSays,
      inFrame: (..._extraArguments: unknown[]): Dynamic => inFrame,
      installFrameClaudeActivity: (..._extraArguments: unknown[]): Dynamic =>
        installFrameClaudeActivity,
      installFrameFetchTripwire: (..._extraArguments: unknown[]): Dynamic =>
        installFrameFetchTripwire,
      installFrameHostChromeWitness: (..._extraArguments: unknown[]): Dynamic =>
        installFrameHostChromeWitness,
      installFrameHostViewport: (..._extraArguments: unknown[]): Dynamic =>
        installFrameHostViewport,
      installFrameHot: (..._extraArguments: unknown[]): Dynamic =>
        installFrameHot,
      liveLaneDeps: (..._extraArguments: unknown[]): Dynamic => liveLaneDeps,
      liveSupportCode: (..._extraArguments: unknown[]): Dynamic =>
        liveSupportCode,
      onFrameGotoAnchor: (..._extraArguments: unknown[]): Dynamic =>
        onFrameGotoAnchor,
      onFrameShellLog: (..._extraArguments: unknown[]): Dynamic =>
        onFrameShellLog,
      onFrameViewerClassChange: (..._extraArguments: unknown[]): Dynamic =>
        onFrameViewerClassChange,
      subscribeFrameClaudeActivity: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameClaudeActivity,
      subscribeFrameCommentable: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameCommentable,
      subscribeFrameConversationPane: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameConversationPane,
      subscribeFrameDeadReason: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameDeadReason,
      subscribeFrameHostChromeWitness: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameHostChromeWitness,
      subscribeFrameHostWords: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameHostWords,
      subscribeFrameShellOriginChanged: (
        ..._extraArguments: unknown[]
      ): Dynamic => subscribeFrameShellOriginChanged,
      subscribeFrameViewer: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameViewer,
      subscribeFrameViewerClass: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameViewerClass,
      subscribeFrameViewerRole: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameViewerRole,
      subscribeFrameWritable: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameWritable,
      subscribeFrameWriteVerdict: (..._extraArguments: unknown[]): Dynamic =>
        subscribeFrameWriteVerdict,
      viewerLanguages: (..._extraArguments: unknown[]): Dynamic =>
        viewerLanguages,
    }));
  (ObservabilityBrowserAndOperationEventsState6 = resolveObservabilityBrowserAndOperationEventsRead());
  (observabilityBrowserAndOperationEventsSet36 = new (Set as Dynamic)());
  (resolveObservabilityBrowserAndOperationEventsValue34 = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let liveLaneDeps2: Dynamic = liveLaneDeps();
    if (liveLaneDeps2 === null)
      throw Error(`frameShell: not running inside a Frame shell`);
    return liveLaneDeps2;
  });
  (frameUserCapability = (..._extraArguments: unknown[]) =>
    loadObservabilityBrowserAndOperationEventsUser(
      resolveObservabilityBrowserAndOperationEventsClaude3(),
    ).then(
      (result?: Dynamic, ..._extraArguments: unknown[]) => result !== null,
      (..._extraArguments: unknown[]) => false,
    ));
  (VIEWER_CLASS_WAIT_MS = 8e3);
  (ObservabilityBrowserAndOperationEventsState7 = VIEWER_CLASS_WAIT_MS);
  (observabilityBrowserAndOperationEventsWeakMap = new (WeakMap as Dynamic)());
  (observabilityBrowserAndOperationEventsMap2 = new (Map as Dynamic)());
  (observabilityBrowserAndOperationEventsValue0 = 0);
  (resolveObservabilityBrowserAndOperationEventsValue35 = (
    observabilityBrowserAndOperationEventsValue35?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    new (Promise as Dynamic)((resolve?: Dynamic, ..._extraArguments: unknown[]) =>
      setTimeout(resolve, observabilityBrowserAndOperationEventsValue35),
    ));
  (resolveObservabilityBrowserAndOperationEventsClaude = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    inFrame() && typeof window !== "undefined"
      ? ((window as Dynamic).claude ?? null)
      : null);
  (resolveObservabilityBrowserAndOperationEventsCredentials = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof fetch == `function`
      ? loadPlatformImagesAndBlobsStatus(
          (
            observabilityBrowserAndOperationEventsCredentials?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            fetch(observabilityBrowserAndOperationEventsCredentials, {
              credentials: `same-origin`,
            }),
        )
      : null);
  (frameUploadAsset = (
    frameUploadAsset2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadPlatformImagesAndBlobsCode(
      resolveObservabilityBrowserAndOperationEventsClaude(),
      frameUploadAsset2,
    ));
  (frameBlobBytesResult = (
    frameBlobBytesResult2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadPlatformImagesAndBlobsMiss(
      resolveObservabilityBrowserAndOperationEventsCredentials(),
      frameLane(`project/${frameBlobBytesResult2}`),
      options,
      frameAssetUrl,
    ));
  (frameBlobSource = (
    frameBlobSource2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadPlatformImagesAndBlobsValue(
      resolveObservabilityBrowserAndOperationEventsCredentials(),
      frameLane(`project/${frameBlobSource2}`),
      options,
    ));
  (resolveObservabilityBrowserAndOperationEventsClaude2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    inFrame() && typeof window !== "undefined"
      ? ((window as Dynamic).claude ?? null)
      : null);
  (frameSampler = async (
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let observabilityBrowserAndOperationEventsClaude2: Dynamic =
      resolveObservabilityBrowserAndOperationEventsClaude2();
    return observabilityBrowserAndOperationEventsClaude2 === null
      ? null
      : (await loadObservabilityBrowserAndOperationEventsUnknown(
            ObservabilityBrowserAndOperationEventsState7,
          )) === `member`
        ? loadObservabilityBrowserAndOperationEventsSample(
            observabilityBrowserAndOperationEventsClaude2,
          )
        : null;
  });
  (frameSampleGranted = (..._extraArguments: unknown[]) =>
    resolveObservabilityBrowserAndOperationEventsClaude2() !== null &&
    frameViewerStanding() !== `member`
      ? Promise.resolve(false)
      : loadPlatformFrameAndCapabilitiesGranted(
          resolveObservabilityBrowserAndOperationEventsClaude2(),
          `sample`,
        ).catch((..._extraArguments: unknown[]) => false));
  (frameSamplePermission = (..._extraArguments: unknown[]): Dynamic =>
    loadPlatformFrameAndCapabilitiesState(
      resolveObservabilityBrowserAndOperationEventsClaude2(),
      `sample`,
    ).catch((..._extraArguments: unknown[]) => null));
  (resolveObservabilityBrowserAndOperationEventsClaude3 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    inFrame() && typeof window !== "undefined"
      ? ((window as Dynamic).claude ?? null)
      : null);
  (frameViewer = (..._extraArguments: unknown[]): Dynamic =>
    loadObservabilityBrowserAndOperationEventsAvatarUrl(
      resolveObservabilityBrowserAndOperationEventsClaude3(),
    ).then((contributor?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (contributor.id !== null) {
        ObservabilityBrowserAndOperationEventsSchedule.seed({
          id: contributor.id,
          name: contributor.name,
          avatarUrl: contributor.avatarUrl,
          color: contributor.color,
          email: contributor.email,
          isMe: true,
        });
      }
      ObservabilityBrowserAndOperationEventsState8 =
        contributor.id === null
          ? null
          : {
              id: contributor.id,
              url: contributor.avatarUrl,
            };
      resolveObservabilityBrowserAndOperationEventsOwner(contributor.id);
      let avatarUrl: Dynamic =
        installObservabilityBrowserAndOperationEventsVisibilitychange2(
          contributor.id ?? ``,
          contributor.avatarUrl,
        );
      return avatarUrl === contributor.avatarUrl
        ? contributor
        : {
            ...contributor,
            avatarUrl: avatarUrl,
          };
    }));
  (ObservabilityBrowserAndOperationEventsState8 = null);
  (frameViewerFace = (..._extraArguments: unknown[]): Dynamic =>
    ObservabilityBrowserAndOperationEventsState8 === null
      ? undefined
      : installObservabilityBrowserAndOperationEventsVisibilitychange2(
          ObservabilityBrowserAndOperationEventsState8.id,
          ObservabilityBrowserAndOperationEventsState8.url,
        ));
  (frameViewerWithFace = (..._extraArguments: unknown[]): Dynamic =>
    frameViewer().then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        result.id === null
          ? result
          : ObservabilityBrowserAndOperationEventsInline.settled(result.id).then(
              (..._extraArguments: unknown[]): Dynamic => ({
                ...result,
                avatarUrl: frameViewerFace() ?? result.avatarUrl,
              }),
            ),
    ));
  (frameViewerCan = (
    frameViewerCan2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    loadObservabilityBrowserAndOperationEventsValue2(
      resolveObservabilityBrowserAndOperationEventsClaude3(),
      frameViewerCan2,
    ));
  (resolveObservabilityBrowserAndOperationEventsClaude4 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    inFrame() && typeof window !== "undefined"
      ? ((window as Dynamic).claude ?? null)
      : null);
  (ObservabilityBrowserAndOperationEventsState9 = null);
  (frameSampleAvailable = async (
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let observabilityBrowserAndOperationEventsClaude4: Dynamic =
      resolveObservabilityBrowserAndOperationEventsClaude4();
    return observabilityBrowserAndOperationEventsClaude4 === null ||
      (await loadObservabilityBrowserAndOperationEventsUnknown(null)) !== `member`
      ? false
      : ObservabilityBrowserAndOperationEventsState9 === null
        ? (ObservabilityBrowserAndOperationEventsState9 =
            await loadObservabilityBrowserAndOperationEventsValue(
              observabilityBrowserAndOperationEventsClaude4,
            ))
        : ObservabilityBrowserAndOperationEventsState9;
  });
  (frameProofreadEnabled = (..._extraArguments: unknown[]): Dynamic =>
    resolvePlatformFeatureFlagsEnabled2(`proofreadClaude`));
  (ObservabilityBrowserAndOperationEventsIssues2 = Object.freeze({
    issues: [],
    failed: true,
    unavailable: false,
  }));
  (frameProofreadRound = async (
    frameProofreadRound2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    if (!frameProofreadEnabled())
      return ObservabilityBrowserAndOperationEventsIssues2;
    let observabilityBrowserAndOperationEventsClaude4: Dynamic =
      resolveObservabilityBrowserAndOperationEventsClaude4();
    let label =
      observabilityBrowserAndOperationEventsClaude4 === null
        ? `member`
        : frameViewerStanding();
    let observabilityBrowserAndOperationEventsUnknown: Dynamic =
      label === `unknown`
        ? await loadObservabilityBrowserAndOperationEventsUnknown(
            ObservabilityBrowserAndOperationEventsState7,
          )
        : label;
    return observabilityBrowserAndOperationEventsUnknown === `unknown`
      ? ObservabilityBrowserAndOperationEventsIssues2
      : loadObservabilityBrowserAndOperationEventsIssues(
          observabilityBrowserAndOperationEventsUnknown === `member`
            ? observabilityBrowserAndOperationEventsClaude4
            : null,
          frameProofreadRound2,
          options,
          context,
        );
  });
  (resolveObservabilityBrowserAndOperationEventsClaude5 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    inFrame() && typeof window !== "undefined"
      ? ((window as Dynamic).claude ?? null)
      : null);
  (ObservabilityBrowserAndOperationEventsState10 = null);
  (frameDownloadsAvailable = async (
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> =>
    ObservabilityBrowserAndOperationEventsState10 === null
      ? (ObservabilityBrowserAndOperationEventsState10 =
          await loadPlatformFrameAndCapabilitiesValue(
            resolveObservabilityBrowserAndOperationEventsClaude5(),
          ))
      : ObservabilityBrowserAndOperationEventsState10);
  (frameDownloadsAvailableWithin = async (
    frameDownloadsAvailable2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let frameDownloadsAvailableWithinResult: Dynamic;
    try {
      return await Promise.race([
        frameDownloadsAvailable().catch((..._extraArguments: unknown[]) => false),
        new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
            (frameDownloadsAvailableWithinResult = setTimeout(
              (..._extraArguments: unknown[]): Dynamic => resolve(false),
              frameDownloadsAvailable2,
            )),
        ),
      ]);
    } finally {
      clearTimeout(frameDownloadsAvailableWithinResult);
    }
  });
  (frameSaveDownload = (
    frameSaveDownload2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    loadPlatformFrameAndCapabilitiesCode(
      resolveObservabilityBrowserAndOperationEventsClaude5(),
      frameSaveDownload2,
    ));
  (resolveObservabilityBrowserAndOperationEventsClaude6 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    inFrame() && typeof window !== "undefined"
      ? ((window as Dynamic).claude ?? null)
      : null);
  (resolveObservabilityBrowserAndOperationEventsValue36 = (
    ..._extraArguments: unknown[]
  ) => Date.now());
  (frameDriveRoad = (..._extraArguments: unknown[]): Dynamic =>
    resolvePlatformFrameAndCapabilitiesOffered(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
    ));
  (frameConnectorsWithheld = async (..._extraArguments: unknown[]) =>
    (
      await loadPlatformFrameAndCapabilitiesAbsent(
        resolveObservabilityBrowserAndOperationEventsClaude6(),
      )
    ).at === `withheld`);
  (frameDriveFileArgs = (..._extraArguments: unknown[]): Dynamic =>
    loadPlatformFrameAndCapabilitiesFileArgs(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
    ));
  (frameAskDriveConsent = async (..._extraArguments: unknown[]) => {
    let exportMcpConnectorsValue2 = await loadExportMcpConnectorsValue2(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
    );
    return loadPlatformFrameAndCapabilitiesValue2(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
      resolveObservabilityBrowserAndOperationEventsValue36,
      exportMcpConnectorsValue2 === null ? [] : [exportMcpConnectorsValue2],
    );
  });
  (frameUploadToDrive = (
    frameUpload?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadPlatformFrameAndCapabilitiesCode2(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
      frameUpload,
      resolveObservabilityBrowserAndOperationEventsValue36,
    ));
  (framePagesExportRoad = (..._extraArguments: unknown[]): Dynamic =>
    resolveExportMcpConnectorsValue6(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
    ));
  (frameExportViaMcp = (
    frameExportViaMcp2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadExportMcpConnectorsCode2(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
      frameExportViaMcp2,
    ));
  (frameNotionRoad = (..._extraArguments: unknown[]): Dynamic =>
    resolveExportMcpConnectorsValue2(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
    ));
  (frameAskNotionConsent = async (
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let exportMcpConnectorsValue2 = await loadExportMcpConnectorsValue2(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
    );
    return resolveExportMcpConnectorsValue3(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
      resolveObservabilityBrowserAndOperationEventsValue36,
      exportMcpConnectorsValue2 === null ? [] : [exportMcpConnectorsValue2],
    );
  });
  (frameCreateNotionPage = (
    frameCreateNotionPage2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadExportMcpConnectorsCode(
      resolveObservabilityBrowserAndOperationEventsClaude6(),
      frameCreateNotionPage2,
    ));
  (viewerLanguages = (..._extraArguments: unknown[]): Dynamic => {
    if (typeof navigator === "undefined") return [];
    let { languages: navigator2, language: navigator3 }: Dynamic = navigator;
    return Array.isArray(navigator2) && navigator2.length > 0
      ? navigator2
      : typeof navigator3 == `string` && navigator3 !== ``
        ? [navigator3]
        : [];
  });
  (frameEdgeNow = (..._extraArguments: unknown[]) => Date.now());
  (frameTransportFacts = (..._extraArguments: unknown[]): Dynamic =>
    inFrame() ? resolveEditorExtensionsHelloAnswered2() : null);
  (frameSinceNavigationMs = (..._extraArguments: unknown[]) => {
    try {
      return typeof performance !== "undefined"
        ? Math.round(performance.now())
        : 0;
    } catch {
      return 0;
    }
  });
  (frameNavigatorOnline = (..._extraArguments: unknown[]) => {
    try {
      return typeof navigator === "undefined" || navigator.onLine !== false;
    } catch {
      return true;
    }
  });
  (observabilityBrowserAndOperationEventsMap3 = new (Map as Dynamic)());
  (resolveObservabilityBrowserAndOperationEventsValue37 = (
    observabilityBrowserAndOperationEventsValue37?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let setTimeout2 = setTimeout(
      observabilityBrowserAndOperationEventsValue37,
      options,
    );
    return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
  });
  (ObservabilityBrowserAndOperationEventsState11 = null);
  (ObservabilityBrowserAndOperationEventsSchedule = loadObservabilityBrowserAndOperationEventsNow(
      (
        observabilityBrowserAndOperationEventsSchedule?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        loadObservabilityBrowserAndOperationEventsSchedule(
          resolveObservabilityBrowserAndOperationEventsClaude3(),
          observabilityBrowserAndOperationEventsSchedule,
          {
            schedule: resolveObservabilityBrowserAndOperationEventsValue37,
          },
        ),
      (
        observabilityBrowserAndOperationEventsSchedule?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        observabilityBrowserAndOperationEventsMap3.set(
          observabilityBrowserAndOperationEventsSchedule.id,
          observabilityBrowserAndOperationEventsSchedule,
        ),
      {
        now: (..._extraArguments: unknown[]) => Date.now(),
        schedule: resolveObservabilityBrowserAndOperationEventsValue37,
      },
      (
        observabilityBrowserAndOperationEventsSchedule?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!inFrame()) return;
        let count = typeof performance === "undefined" ? 0 : performance.now();
        if (observabilityBrowserAndOperationEventsSchedule.nameless > 0) {
          ObservabilityBrowserAndOperationEventsState11 ??= count;
        }
        let count2: Dynamic =
          ObservabilityBrowserAndOperationEventsState11 === null
            ? 0
            : count - ObservabilityBrowserAndOperationEventsState11;
        frameUserCapability().then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (result) {
              if (observabilityBrowserAndOperationEventsSchedule.nameless > 0) {
                let pagesProfileNamelessEvent: Dynamic =
                  createPagesProfileNamelessEvent(
                    observabilityBrowserAndOperationEventsSchedule.nameless,
                    count,
                    resolveObservabilityBrowserAndOperationEventsValue3(),
                  );
                if (pagesProfileNamelessEvent !== null) {
                  emitTelemetryEvent(pagesProfileNamelessEvent);
                }
              }
              if (observabilityBrowserAndOperationEventsSchedule.recovered > 0) {
                let pagesProfileRecoveredEvent: Dynamic =
                  createPagesProfileRecoveredEvent(
                    observabilityBrowserAndOperationEventsSchedule.recovered,
                    count2,
                    observabilityBrowserAndOperationEventsSchedule.trigger,
                    resolveObservabilityBrowserAndOperationEventsValue3(),
                  );
                if (pagesProfileRecoveredEvent !== null) {
                  emitTelemetryEvent(pagesProfileRecoveredEvent);
                }
              }
            }
          },
        );
      },
    ));
  (observabilityBrowserAndOperationEventsWeakSet = new (WeakSet as Dynamic)());
  (installObservabilityBrowserAndOperationEventsVisibilitychange = (
    ..._extraArguments: unknown[]
  ): undefined => {
    let document2 = typeof document === "undefined" ? null : document;
    if (
      !(
        document2 === null ||
        typeof document2.addEventListener != `function` ||
        observabilityBrowserAndOperationEventsWeakSet.has(document2) ||
        !inFrame()
      )
    ) {
      observabilityBrowserAndOperationEventsWeakSet.add(document2);
      document2.addEventListener(
        `visibilitychange`,
        (..._extraArguments: unknown[]): undefined => {
          if (document2.visibilityState === `visible`) {
            resolveObservabilityBrowserAndOperationEventsValue37(
              (..._extraArguments: unknown[]): Dynamic =>
                ObservabilityBrowserAndOperationEventsSchedule.refresh(),
              0,
            );
          }
        },
      );
    }
  });
  (ObservabilityBrowserAndOperationEventsInline = loadPlatformImagesAndBlobsInline({
      inline: (
        observabilityBrowserAndOperationEventsInline?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        frameInlineAvatar(observabilityBrowserAndOperationEventsInline),
      fresh: (
        observabilityBrowserAndOperationEventsInline?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        new (Promise as Dynamic)(
          (
            resolve?: Dynamic,
            reject?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let observabilityBrowserAndOperationEventsValue37: Dynamic =
              resolveObservabilityBrowserAndOperationEventsValue37(
                (..._extraArguments: unknown[]): Dynamic =>
                  reject(Error(`profiles timeout`)),
                2 * observabilityBrowserAndOperationEventsValue10000,
              );
            loadObservabilityBrowserAndOperationEventsSchedule(
              resolveObservabilityBrowserAndOperationEventsClaude3(),
              observabilityBrowserAndOperationEventsInline,
              {
                schedule: resolveObservabilityBrowserAndOperationEventsValue37,
              },
            )
              .then(resolve, reject)
              .finally(observabilityBrowserAndOperationEventsValue37);
          },
        ).then((result?: Dynamic, ..._extraArguments: unknown[]) =>
          Object.fromEntries(
            Object.values(result).map(
              (
                rolldownNImportValue?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => [
                rolldownNImportValue.id,
                rolldownNImportValue.name === ``
                  ? ``
                  : rolldownNImportValue.avatarUrl,
              ],
            ),
          ),
        ),
      now: (..._extraArguments: unknown[]) => Date.now(),
    }));
  (observabilityBrowserAndOperationEventsWeakSet2 = new (WeakSet as Dynamic)());
  (installObservabilityBrowserAndOperationEventsVisibilitychange2 = (
    installObservabilityBrowserAndOperationEventsVisibilitychange22?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let document2 = typeof document === "undefined" ? null : document;
    if (
      document2 !== null &&
      typeof document2.addEventListener == `function` &&
      !observabilityBrowserAndOperationEventsWeakSet2.has(document2)
    ) {
      observabilityBrowserAndOperationEventsWeakSet2.add(document2);
      document2.addEventListener(
        `visibilitychange`,
        (..._extraArguments: unknown[]): undefined => {
          if (document2.visibilityState === `visible`) {
            resolveObservabilityBrowserAndOperationEventsValue37(
              (..._extraArguments: unknown[]): Dynamic =>
                ObservabilityBrowserAndOperationEventsInline.retryFailed(),
              0,
            );
          }
        },
      );
    }
    return ObservabilityBrowserAndOperationEventsInline.src(
      installObservabilityBrowserAndOperationEventsVisibilitychange22,
      options,
    );
  });
  (observabilityBrowserAndOperationEventsWeakMap2 = new (WeakMap as Dynamic)());
  (updateObservabilityBrowserAndOperationEventsAvatarUrl = (
    updateObservabilityBrowserAndOperationEventsAvatarUrl2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let avatarUrl: Dynamic = options
      ? installObservabilityBrowserAndOperationEventsVisibilitychange2(
          updateObservabilityBrowserAndOperationEventsAvatarUrl2.id,
          updateObservabilityBrowserAndOperationEventsAvatarUrl2.avatarUrl,
        )
      : ObservabilityBrowserAndOperationEventsInline.held(
          updateObservabilityBrowserAndOperationEventsAvatarUrl2.id,
          updateObservabilityBrowserAndOperationEventsAvatarUrl2.avatarUrl,
        );
    if (
      avatarUrl ===
      updateObservabilityBrowserAndOperationEventsAvatarUrl2.avatarUrl
    )
      return updateObservabilityBrowserAndOperationEventsAvatarUrl2;
    let observabilityBrowserAndOperationEventsWeakMap2Entry: Dynamic =
      observabilityBrowserAndOperationEventsWeakMap2.get(
        updateObservabilityBrowserAndOperationEventsAvatarUrl2,
      );
    if (
      observabilityBrowserAndOperationEventsWeakMap2Entry !== undefined &&
      observabilityBrowserAndOperationEventsWeakMap2Entry.avatarUrl === avatarUrl
    )
      return observabilityBrowserAndOperationEventsWeakMap2Entry;
    let record2: Dynamic = {
      ...updateObservabilityBrowserAndOperationEventsAvatarUrl2,
      avatarUrl: avatarUrl,
    };
    observabilityBrowserAndOperationEventsWeakMap2.set(
      updateObservabilityBrowserAndOperationEventsAvatarUrl2,
      record2,
    );
    return record2;
  });
  (frameProfiles = (
    frameProfiles2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    installObservabilityBrowserAndOperationEventsVisibilitychange(),
    ObservabilityBrowserAndOperationEventsSchedule.ask(frameProfiles2).then(
      (result?: Dynamic, ..._extraArguments: unknown[]) =>
        Object.fromEntries(
          Object.entries(result).map(
            (
              [rolldownNImportEntry, rolldownNImportEntryEntry]: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => [
              rolldownNImportEntry,
              updateObservabilityBrowserAndOperationEventsAvatarUrl(
                rolldownNImportEntryEntry,
                false,
              ),
            ],
          ),
        ),
    )
  ));
  (framePeekProfile = (
    framePeekProfile2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let peek: Dynamic =
      ObservabilityBrowserAndOperationEventsSchedule.peek(framePeekProfile2);
    return peek === undefined
      ? undefined
      : updateObservabilityBrowserAndOperationEventsAvatarUrl(peek, true);
  });
  (frameProfilesSubscribe = (
    frameProfilesSubscribe2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ObservabilityBrowserAndOperationEventsSchedule.subscribe(
      frameProfilesSubscribe2,
    ));
  (frameFacesSubscribe = (
    frameFacesSubscribe2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let subscribe: Dynamic =
      ObservabilityBrowserAndOperationEventsSchedule.subscribe(
        frameFacesSubscribe2,
      );
    let subscribe2: Dynamic =
      ObservabilityBrowserAndOperationEventsInline.subscribe(
        frameFacesSubscribe2,
      );
    return (..._extraArguments: unknown[]): undefined => {
      subscribe();
      subscribe2();
    };
  });
  (frameProfilesVersion = (..._extraArguments: unknown[]): Dynamic =>
    ObservabilityBrowserAndOperationEventsSchedule.version());
  (frameKnownProfiles = (..._extraArguments: unknown[]): Dynamic =>
    observabilityBrowserAndOperationEventsMap3.values());
  (frameSearchPeople = (
    frameSearchPeople2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadObservabilityBrowserAndOperationEventsSearch(
      resolveObservabilityBrowserAndOperationEventsClaude3(),
      frameSearchPeople2,
    ));
  (frameInlineAvatar = (
    frameInlineAvatar2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    loadPlatformImagesAndBlobsFetcher(frameInlineAvatar2, {
      fetcher:
        typeof fetch == `function`
          ? (
              frameInlineAvatar3?: Dynamic,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ) => fetch(frameInlineAvatar3, options)
          : null,
      origin: typeof location === "undefined" ? null : location.origin,
      schedule: resolveObservabilityBrowserAndOperationEventsValue37,
    }));
  (resolveObservabilityBrowserAndOperationEventsClaude7 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    inFrame() && typeof window !== "undefined"
      ? ((window as Dynamic).claude ?? null)
      : standaloneDocsHost());
  (resolveObservabilityBrowserAndOperationEventsMember = (
    ..._extraArguments: unknown[]
  ) => {
    if (resolveObservabilityBrowserAndOperationEventsClaude7() === null)
      return null;
    // BaoCut: 独立页面没有 Frame 的成员信息（frameViewerStanding() 恒为 unknown），能打开文档的人就是成员。
    let frameViewerStanding2 =
      standaloneDocsHost() !== null ? `member` : frameViewerStanding();
    return frameViewerStanding2 === `member`
      ? null
      : frameViewerStanding2 === `outside`
        ? `off`
        : `unknown`;
  });
  (frameSendToClaudeVerdict = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let observabilityBrowserAndOperationEventsMember =
      resolveObservabilityBrowserAndOperationEventsMember();
    return observabilityBrowserAndOperationEventsMember === null
      ? resolvePlatformSessionAndSourcesUnknown(
          resolveObservabilityBrowserAndOperationEventsClaude7(),
          (
            frameSend?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let setTimeout2 = setTimeout(frameSend, options);
            return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
          },
        )
      : Promise.resolve(observabilityBrowserAndOperationEventsMember);
  });
  (frameSendToClaudeVerdictAtPress = (
    reasked?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let observabilityBrowserAndOperationEventsMember =
      resolveObservabilityBrowserAndOperationEventsMember();
    return observabilityBrowserAndOperationEventsMember === null
      ? resolvePlatformSessionAndSourcesUnknown2(
          resolveObservabilityBrowserAndOperationEventsClaude7(),
          (
            frameSend?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let setTimeout2 = setTimeout(frameSend, options);
            return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
          },
          {
            reasked: reasked,
          },
        )
      : Promise.resolve(observabilityBrowserAndOperationEventsMember);
  });
  (frameSendCommentToClaude = (
    frameSendComment?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    // BaoCut: 同上，独立页面的宿主按成员处理。
    let label =
      resolveObservabilityBrowserAndOperationEventsClaude7() === null ||
      standaloneDocsHost() !== null
        ? `member`
        : frameViewerStanding();
    return label === `member`
      ? loadPlatformSessionAndSourcesCode(
          resolveObservabilityBrowserAndOperationEventsClaude7(),
          frameSendComment,
          options,
        )
      : Promise.resolve({
          ok: false,
          code: label === `outside` ? `forbidden` : `no_capability`,
        });
  });
  (frameResolveCommentThread = (
    frameResolveCommentThread2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    loadPlatformSessionAndSourcesCall(
      resolveObservabilityBrowserAndOperationEventsClaude7(),
      frameResolveCommentThread2,
    ));
  (frameRegisterCustomAnchors = (
    frameRegisterCustomAnchors2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    // BaoCut: 独立页面没有宿主一侧的批注锚点，给空实现（docs-host.ts）。返回 null 时应用把「发给智能体」整个关掉。
    standaloneDocsHost() !== null
      ? Promise.resolve(standaloneCommentAnchors)
      : loadPlatformFrameAndCapabilitiesCall(
          resolveObservabilityBrowserAndOperationEventsClaude7(),
          frameRegisterCustomAnchors2,
        ));
  (resolveObservabilityBrowserAndOperationEventsHost = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (observabilityBrowserAndOperationEventsState4 !== undefined)
      return observabilityBrowserAndOperationEventsState4;
    if (!inFrame() || typeof window === "undefined")
      return (observabilityBrowserAndOperationEventsState4 = null);
    let id: Dynamic = frameBootContainer()?.id;
    let label: Dynamic = `bongo.viewerEdits.${id}`;
    observabilityBrowserAndOperationEventsState4 =
      resolveObservabilityBrowserAndOperationEventsContext({
        host: (window as Dynamic).claude ?? null,
        schedule: (
          observabilityBrowserAndOperationEventsHost?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let setTimeout2: Dynamic = setTimeout(
            observabilityBrowserAndOperationEventsHost,
            options,
          );
          return (..._extraArguments: unknown[]): Dynamic =>
            clearTimeout(setTimeout2);
        },
        log: (
          observabilityBrowserAndOperationEventsHost?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          (console as Dynamic).warn(
            `[frameShell] ${observabilityBrowserAndOperationEventsHost}`,
          ),
        now: (..._extraArguments: unknown[]): Dynamic => Date.now(),
        edits:
          id === undefined
            ? undefined
            : {
                load: (..._extraArguments: unknown[]): Dynamic => {
                  try {
                    return Number(
                      resolveObservabilityBrowserAndOperationEventsSessionStorage2()?.getItem(
                        label,
                      ) ?? 0,
                    );
                  } catch {
                    return 0;
                  }
                },
                save: (
                  observabilityBrowserAndOperationEventsHost?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  try {
                    resolveObservabilityBrowserAndOperationEventsSessionStorage2()?.setItem(
                      label,
                      String(observabilityBrowserAndOperationEventsHost),
                    );
                  } catch {}
                },
              },
      });
    return observabilityBrowserAndOperationEventsState4;
  });
  (frameViewerSelection = (
    frameViewerSelection2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsHost()?.setSelection(
      frameViewerSelection2,
    ));
}

export {
  ObservabilityBrowserAndOperationEventsFOREIGNCONTAINER,
  ObservabilityBrowserAndOperationEventsState6,
  frameArtifactUrl,
  frameArtifactUrlFor,
  frameAskDriveConsent,
  frameAskNotionConsent,
  frameBlobBytesResult,
  frameBlobSource,
  frameBootContainer,
  frameConnectorsWithheld,
  frameCreateNotionPage,
  frameDoor,
  frameDownloadsAvailable,
  frameDownloadsAvailableWithin,
  frameDriveFileArgs,
  frameDriveRoad,
  frameEdgeNow,
  frameEnumRows,
  frameExportViaMcp,
  frameFacesSubscribe,
  frameFenceAuthor,
  frameHelloFromEntry,
  frameInlineAvatar,
  frameKnownProfiles,
  frameLane,
  frameLaneLink,
  frameNavigatorOnline,
  frameNotionRoad,
  framePagesExportRoad,
  framePeekProfile,
  frameProfiles,
  frameProfilesSubscribe,
  frameProfilesVersion,
  frameProjectAck,
  frameProofreadEnabled,
  frameProofreadRound,
  frameRegisterCustomAnchors,
  frameResolveCommentThread,
  frameSampleAvailable,
  frameSampleGranted,
  frameSamplePermission,
  frameSampler,
  frameSaveDownload,
  frameSearchPeople,
  frameSendCommentToClaude,
  frameSendToClaudeVerdict,
  frameSendToClaudeVerdictAtPress,
  frameSignInHref,
  frameSinceNavigationMs,
  frameTransportFacts,
  frameUploadAsset,
  frameUploadToDrive,
  frameUserCapability,
  frameViewer,
  frameViewerCan,
  frameViewerClassWord,
  frameViewerFace,
  frameViewerLocus,
  frameViewerOutside,
  frameViewerSelection,
  frameViewerWithFace,
  isObservabilityBrowserAndOperationEventsStartsWith,
  liveLaneDeps,
  liveSupportCode,
  onFrameShellLog,
  onFrameViewerClassChange,
  resolveObservabilityBrowserAndOperationEventsHost,
  resolveObservabilityBrowserAndOperationEventsIndexedDB,
  resolveObservabilityBrowserAndOperationEventsIsFinite2,
  resolveObservabilityBrowserAndOperationEventsJoin,
  resolveObservabilityBrowserAndOperationEventsPrefix,
  resolveObservabilityBrowserAndOperationEventsValue33,
  resolveObservabilityBrowserAndOperationEventsWarn,
  subscribeFrameCommentable,
  subscribeFrameDeadReason,
  subscribeFrameShellOriginChanged,
  subscribeFrameViewer,
  subscribeFrameViewerClass,
  subscribeFrameViewerRole,
  subscribeFrameWritable,
  subscribeFrameWriteVerdict,
  viewerLanguages,
};

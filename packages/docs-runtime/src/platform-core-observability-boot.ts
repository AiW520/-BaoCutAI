/** BaoCut: observability boot from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  helloBImport,
  helloGImport,
  helloHImport,
  helloImport,
  helloYImport,
  inFrame,
  preloadTImport,
} from "./platform-core-dependencies";
import {
  ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c,
  resolveObservabilityTelemetryCache,
  resolveObservabilityTelemetryOrdinal,
  resolveObservabilityTelemetryOrdinal2,
} from "./platform-core-observability-telemetry-1";
import {
  emitTelemetryEvent,
} from "./platform-core-observability-telemetry-3";
import {
  getLazySchemaStats,
} from "./platform-core-data-lazy-zod";
import {
  isEditorExtensionsLocation,
  isEditorExtensionsValue,
} from "./platform-core-editor-extensions-5";
import {
  loadPlatformLoadingAndStatusDelaysMs,
} from "./platform-core-platform-loading-and-status";
import {
  createPagesBootChunkRetryEvent,
  resolvePlatformChunkLoadingEnv,
} from "./platform-core-platform-chunk-loading";
import {
  ObservabilityBrowserAndOperationEventsOtOt,
  observabilityBrowserAndOperationEventsPattern,
  resolveObservabilityBrowserAndOperationEventsValue3,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  frameViewerClassWord,
} from "./platform-core-observability-browser-and-operation-events-3";
import {
  frameConversationPane,
  frameHostChromeWitnessed,
  hostSays,
} from "./platform-core-observability-browser-and-operation-events-4";
import {
  resolvePlatformApiAndAuthValue,
} from "./platform-core-platform-api-and-auth-1";
import {
  CommentsStoreState14,
  CommentsStoreState16,
  CommentsStoreState17,
  isCommentsStoreUnmasked,
  resolveCommentsStoreLayer,
  resolveCommentsStoreNavigator2,
  resolveCommentsStorePush,
} from "./platform-core-comments-store-5";

function resolveObservabilityBootEntries(
  activity: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  return isCommentsStoreUnmasked({
    entries: resolveCommentsStorePush(),
    trigger: CommentsStoreState14,
    now: activity.at ?? Date.now(),
    build: ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c,
    ctx: CommentsStoreState16?.() ?? {},
    tail: 1 / 0,
    net: resolveCommentsStoreNavigator2(),
    ...(activity.includeDocText === true
      ? {
          unmasked: true,
          docText: CommentsStoreState17?.() ?? {
            blocks: [],
          },
        }
      : {}),
  });
}

var ObservabilityBootOptraceSink: string;

function reportOperationEvent(
  reportOperationEvent2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveObservabilityBootLayer(`op`, reportOperationEvent2, options);
}

function resolveObservabilityBootLayer(
  layer?: Dynamic,
  name?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let globalThis2: Dynamic = globalThis;
  if (globalThis2 !== undefined) {
    (globalThis2.__optrace_buf ??= []).push({
      layer: layer,
      name: name,
      ...context,
    });
    if (!globalThis2.__optrace_flush) {
      globalThis2.__optrace_flush = true;
      queueMicrotask((..._extraArguments: unknown[]): undefined => {
        let Trace: Dynamic = globalThis2.__optrace_buf;
        globalThis2.__optrace_buf = [];
        globalThis2.__optrace_flush = false;
        let globalThiItem: Dynamic = globalThis2[ObservabilityBootOptraceSink];
        if (typeof globalThiItem == `function`) {
          try {
            globalThiItem(Trace);
          } catch {}
          return;
        }
        try {
          globalThis2.parent?.postMessage(
            {
              __trace: Trace,
            },
            `*`,
          );
        } catch {}
      });
    }
  }
}

var resolveObservabilityBootValue2: Dynamic;

var observabilityBootState: Dynamic;

var observabilityBootValue_1: boolean;

var observabilityBootState2: Dynamic;

var observabilityBootValue_12: Dynamic;

var observabilityBootSet: Dynamic;

var resolveObservabilityBootValue3: Dynamic;

function resolveObservabilityBootValue4(
  ..._extraArguments: unknown[]
): undefined {
  if (observabilityBootState === undefined) {
    observabilityBootValue_1 = true;
  }
}

function resolveObservabilityBootNode(
  node?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!(observabilityBootState !== undefined || typeof node != `string`)) {
    observabilityBootState = {
      node: node,
      zero: options === true,
      at: resolveObservabilityBootValue3(),
    };
    observabilityBootValue_12 =
      observabilityBootState.zero && !observabilityBootValue_1;
  }
}

var resolveObservabilityBootAttrs: Dynamic;

var resolveObservabilityBootInsert: Dynamic;

function isObservabilityBootSnapshot(
  observabilityBootSnapshot?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (observabilityBootSnapshot.t === `row`) {
    let ops: Dynamic = observabilityBootSnapshot.row?.ops;
    return Array.isArray(ops) && ops.some(resolveObservabilityBootInsert);
  }
  if (
    observabilityBootSnapshot.t !== `snapshot` ||
    observabilityBootSnapshot.gone === true ||
    observabilityBootSnapshot.compare === true
  )
    return false;
  if (
    Array.isArray(observabilityBootSnapshot.blocks) &&
    observabilityBootSnapshot.blocks.length > 0
  )
    return true;
  let docJson: Dynamic = observabilityBootSnapshot.docJson;
  return resolveObservabilityBootValue2(docJson)
    ? docJson.type === `doc`
      ? Array.isArray(docJson.content) &&
        docJson.content.some(resolveObservabilityBootAttrs)
      : typeof docJson.attrs?.bid == `string`
    : false;
}

function resolveObservabilityBootNode2(
  observabilityBootNode2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (observabilityBootValue_12)
    try {
      if (
        !resolveObservabilityBootValue2(observabilityBootNode2) ||
        observabilityBootState === undefined ||
        observabilityBootNode2.node !== observabilityBootState.node
      )
        return;
      if (observabilityBootNode2.t === `ack`)
        return void (observabilityBootValue_12 = false);
      if (
        !isObservabilityBootSnapshot(observabilityBootNode2) ||
        ((observabilityBootValue_12 = false),
        typeof observabilityBootNode2.under == `number` &&
          observabilityBootNode2.under > 0)
      )
        return;
      observabilityBootState2 = Math.max(
        0,
        Math.round(
          resolveObservabilityBootValue3() - observabilityBootState.at,
        ),
      );
      for (let resolveObservabilityBootNode2Result of Array.from<Dynamic>(
        observabilityBootSet,
      ) as Dynamic)
        try {
          resolveObservabilityBootNode2Result(observabilityBootState2);
        } catch {}
    } catch {
      observabilityBootValue_12 = false;
    }
}

function resolveObservabilityBootZero(..._extraArguments: unknown[]): Dynamic {
  let zero = observabilityBootState?.zero === true && !observabilityBootValue_1;
  return {
    zero: zero,
    ...(zero && observabilityBootState2 !== undefined
      ? {
          fillMs: observabilityBootState2,
        }
      : {}),
  };
}

function clearObservabilityBootDelete(
  clearObservabilityBootDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  observabilityBootSet.add(clearObservabilityBootDelete2);
  return (..._extraArguments: unknown[]): undefined =>
    void observabilityBootSet.delete(clearObservabilityBootDelete2);
}

var observabilityBootValue1500: number;

var observabilityBootValue15000: number;

var observabilityBootValue65535: number;

var observabilityBootSet2: Dynamic;

function resolveObservabilityBootChat(
  observabilityBootChat?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return observabilityBootChat.frame
    ? observabilityBootChat.chatBeside === true
      ? `chat`
      : observabilityBootChat.hostPane
        ? observabilityBootChat.poked
          ? observabilityBootChat.pane === undefined ||
            observabilityBootChat.pane === `available`
            ? `chat`
            : observabilityBootChat.pane === `no_session`
              ? `viewer`
              : `pane`
          : `pane`
        : observabilityBootChat.shell
          ? `shell`
          : `frame`
    : `standalone`;
}

function isObservabilityBootEntry(
  activity?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let entry: Dynamic = activity.at.entry;
  let paint: Dynamic = activity.at.paint;
  if (
    !options ||
    entry === undefined ||
    paint === undefined ||
    Math.round(entry) < 3e3
  )
    return false;
  let toSorted: Dynamic = helloGImport
    .filter(
      (helloGImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        !observabilityBootSet2.has(helloGImport2),
    )
    .map(
      (
        filteredHelloGImport?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => activity.at[filteredHelloGImport],
    )
    .filter(
      (mappedFilteredHelloGImport?: Dynamic, ..._extraArguments: unknown[]) =>
        mappedFilteredHelloGImport !== undefined &&
        mappedFilteredHelloGImport >= entry &&
        mappedFilteredHelloGImport <= paint,
    )
    .toSorted(
      (
        filteredMappedFilteredHelloGImport?: Dynamic,
        filteredMappedFilteredHelloGImport2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        filteredMappedFilteredHelloGImport -
        filteredMappedFilteredHelloGImport2,
    );
  for (let count = 1; count < toSorted.length; count++)
    if (toSorted[count] - toSorted[count - 1] >= 2e3) return false;
  return true;
}

var resolveObservabilityBootToUpperCase: (observabilityBoot?: Dynamic, ..._extraArguments: unknown[]) => string;

var observabilityBootHelloHelloFlushedStateValues: string[];

var resolveObservabilityBootToUpperCase2: (observabilityBoot?: Dynamic, ..._extraArguments: unknown[]) => string;

var ObservabilityBootStageEntry: (string | undefined)[][];

var observabilityBootValue655352: number;

function resolveObservabilityBootIsFinite(
  activity?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  for (let [
    resolveObservabilityBootIsFiniteResult,
    resolveObservabilityBootIsFiniteResult2,
    resolveObservabilityBootIsFiniteResult3,
  ] of ObservabilityBootStageEntry as Dynamic) {
    let count: Dynamic =
      resolveObservabilityBootIsFiniteResult2 === undefined
        ? 0
        : activity.at[resolveObservabilityBootIsFiniteResult2];
    let atItem: Dynamic = activity.at[resolveObservabilityBootIsFiniteResult3];
    if (
      !(
        count === undefined ||
        atItem === undefined ||
        !Number.isFinite(count) ||
        !Number.isFinite(atItem)
      )
    ) {
      record2[resolveObservabilityBootIsFiniteResult] = Math.min(
        observabilityBootValue655352,
        Math.max(0, Math.round(atItem - count)),
      );
    }
  }
  return record2;
}

var ObservabilityBootState: number[];

function resolveObservabilityBootFindIndex(
  observabilityBootFindIndex?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let ObservabilityBootStateIndex = ObservabilityBootState.findIndex(
    (ObservabilityBootState8?: Dynamic, ..._extraArguments: unknown[]) =>
      observabilityBootFindIndex < ObservabilityBootState8,
  );
  return `w${ObservabilityBootStateIndex < 0 ? ObservabilityBootState.length : ObservabilityBootStateIndex}`;
}

function resolveObservabilityBootStageS5w(
  activity?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorFrameLoaded: Dynamic = activity.at.editorFrameLoaded;
  let runtimePost: Dynamic = activity.at.runtimePost;
  let runtimeReady: Dynamic = activity.at.runtimeReady;
  if (
    editorFrameLoaded === undefined ||
    runtimePost === undefined ||
    runtimeReady === undefined ||
    runtimePost < editorFrameLoaded ||
    runtimeReady < runtimePost
  )
    return {};
  let stageS5w = Math.min(
    observabilityBootValue655352,
    Math.round(runtimePost - editorFrameLoaded),
  );
  return {
    stageS5w: stageS5w,
    stageS5e: Math.min(
      observabilityBootValue655352,
      Math.round(runtimeReady - runtimePost),
    ),
    s5wait: resolveObservabilityBootFindIndex(stageS5w),
  };
}

function resolveObservabilityBootStandalone(
  observabilityBootStandalone?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (options !== `standalone`)
    return observabilityBootStandalone === `host-click` ||
      observabilityBootStandalone === `host-nav` ||
      options === `shell`
      ? `e2e`
      : `e2s`;
}

function resolveObservabilityBootStageHost(
  activity?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let hostLead: Dynamic = activity.hostLead;
  let hostStartFrom: Dynamic = activity.hostStartFrom;
  if (
    hostLead === undefined ||
    hostStartFrom === undefined ||
    !Number.isFinite(hostLead) ||
    hostLead < 0
  )
    return {};
  let observabilityBootStandalone = resolveObservabilityBootStandalone(
    hostStartFrom,
    options,
  );
  if (observabilityBootStandalone === undefined) return {};
  let round: Dynamic = (
    observabilityBootStageHost?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.min(
      observabilityBootValue655352,
      Math.max(0, Math.round(observabilityBootStageHost)),
    );
  let pixels: Dynamic = activity.at.pixels;
  return {
    stageHost: round(hostLead),
    hostStartFrom: hostStartFrom,
    ...(pixels !== undefined && Number.isFinite(pixels)
      ? {
          [observabilityBootStandalone === `e2e` ? `stageE2e` : `stageE2s`]:
            round(hostLead + pixels),
        }
      : {}),
  };
}

function resolveObservabilityBootStageBlk0(
  activity?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let picture: Dynamic = activity.at.picture;
  if (
    options?.zero !== true ||
    picture === undefined ||
    !Number.isFinite(picture)
  )
    return {};
  let round: Dynamic = (
    observabilityBootStageBlk0?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.min(
      observabilityBootValue655352,
      Math.max(0, Math.round(observabilityBootStageBlk0)),
    );
  let fillMs: Dynamic = options.fillMs;
  return {
    stageBlk0: round(picture),
    ...(typeof fillMs == `number` && Number.isFinite(fillMs) && fillMs >= 0
      ? {
          stageBlk0Fill: round(fillMs),
        }
      : {}),
  };
}

var ObservabilityBootBlk0fill: string;

function resolveObservabilityBootHost(
  observabilityBootHost?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let stageBlk0Fill = Math.min(
    observabilityBootValue655352,
    Math.max(0, Math.round(observabilityBootHost)),
  );
  return {
    host: options.host,
    plat: observabilityBrowserAndOperationEventsPattern.test(options.plat)
      ? options.plat
      : ObservabilityBrowserAndOperationEventsOtOt,
    ...(options.openFlag === undefined
      ? {}
      : {
          openFlag: options.openFlag,
        }),
    openRow: ObservabilityBootBlk0fill,
    stageBlk0Fill: stageBlk0Fill,
    count: Math.min(observabilityBootValue65535, Math.max(2, stageBlk0Fill)),
  };
}

var resolveObservabilityBootValue5: Dynamic;

var observabilityBootMemberGuestPublicValues: string[];

var ObservabilityBootUnknown: string;

function resolveObservabilityBootIncludes(
  observabilityBootIncludes?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    !(
      typeof observabilityBootIncludes != `string` ||
      observabilityBootIncludes === ``
    )
  )
    return observabilityBootMemberGuestPublicValues.includes(
      observabilityBootIncludes,
    )
      ? observabilityBootIncludes
      : ObservabilityBootUnknown;
}

function resolveObservabilityBootComplete(
  activity?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    complete: options.complete,
    host: options.host,
    ...(options.chain === undefined
      ? {}
      : {
          chain: options.chain,
        }),
    ...(options.navType === ``
      ? {}
      : {
          navType: options.navType,
        }),
    ...(options.plat === undefined
      ? {}
      : {
          plat: observabilityBrowserAndOperationEventsPattern.test(options.plat)
            ? options.plat
            : ObservabilityBrowserAndOperationEventsOtOt,
        }),
  };
  let entry: Dynamic = activity.at.entry;
  if (entry !== undefined) {
    record2.tEntry = Math.round(entry);
  }
  let entry2: Dynamic = entry ?? 0;
  for (let resolveObservabilityBootCompleteResult of helloGImport as Dynamic) {
    if (resolveObservabilityBootCompleteResult === `entry`) continue;
    let atItem: Dynamic = activity.at[resolveObservabilityBootCompleteResult];
    if (atItem !== undefined) {
      record2[
        resolveObservabilityBootToUpperCase(
          resolveObservabilityBootCompleteResult,
        )
      ] = Math.max(0, Math.round(atItem - entry2));
    }
  }
  if (entry !== undefined)
    for (let resolveObservabilityBootCompleteResult of observabilityBootHelloHelloFlushedStateValues as Dynamic) {
      let atItem: Dynamic = activity.at[resolveObservabilityBootCompleteResult];
      let count = atItem === undefined ? 0 : Math.round(entry - atItem);
      if (count > 0) {
        record2[
          resolveObservabilityBootToUpperCase2(
            resolveObservabilityBootCompleteResult,
          )
        ] = count;
      }
    }
  for (let resolveObservabilityBootCompleteResult of helloHImport as Dynamic) {
    let detailItem: Dynamic =
      activity.detail[resolveObservabilityBootCompleteResult];
    if (detailItem !== undefined) {
      record2[resolveObservabilityBootCompleteResult] = Math.round(detailItem);
    }
  }
  Object.assign(record2, resolveObservabilityBootIsFinite(activity));
  Object.assign(record2, resolveObservabilityBootStageS5w(activity));
  if (options.complete) {
    Object.assign(
      record2,
      resolveObservabilityBootStageHost(activity, options.host),
    );
  }
  Object.assign(
    record2,
    resolveObservabilityBootStageBlk0(activity, options.blk0),
  );
  if (options.boot !== undefined) {
    let observabilityTelemetryOrdinal = resolveObservabilityTelemetryOrdinal(
      options.boot,
    );
    record2.bootOrdinal = Number(observabilityTelemetryOrdinal[0]);
    if (options.boot.cachedJs === 0 || options.boot.cachedJs === 1) {
      record2.bootCachedJs = options.boot.cachedJs;
    }
    record2.bootSession = Number(observabilityTelemetryOrdinal[2]);
    record2.boot = observabilityTelemetryOrdinal;
  }
  if (options.schemasAtPaint !== undefined) {
    record2.schemasAtPaint = Math.round(options.schemasAtPaint.built);
    record2.schemaMsAtPaint = Math.round(options.schemasAtPaint.buildMs);
  }
  let tPaint: Dynamic = record2.tPaint;
  let tPaint2: Dynamic = options.complete
    ? tPaint
    : observabilityBootValue15000;
  if (typeof tPaint2 == `number` && tPaint2 > 1) {
    record2.count = Math.min(tPaint2, observabilityBootValue65535);
  }
  if (!options.complete) {
    record2.code = `timeout`;
  }
  if (isObservabilityBootEntry(activity, options.complete)) {
    record2.openFlag = `stalled`;
  }
  return record2;
}

function resolveObservabilityBootNavigation(
  observabilityBootNavigation: Dynamic = typeof performance == `object`
    ? performance
    : undefined,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let entriesByTypeItem: Dynamic =
      observabilityBootNavigation?.getEntriesByType?.(`navigation`)?.[0];
    return typeof entriesByTypeItem?.type == `string`
      ? entriesByTypeItem.type
      : ``;
  } catch {
    return ``;
  }
}

function installObservabilityBootHidden(
  installObservabilityBootHidden2?: Dynamic,
  options: Dynamic = typeof window == `object` ? window : undefined,
  context: Dynamic = typeof document == `object` ? document : undefined,
  ..._extraArguments: unknown[]
): Dynamic {
  let installObservabilityBootHidden3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (context?.visibilityState === `hidden`) {
      installObservabilityBootHidden2();
    }
  };
  options?.addEventListener(`pagehide`, installObservabilityBootHidden2);
  context?.addEventListener(
    `visibilitychange`,
    installObservabilityBootHidden3,
  );
  return (..._extraArguments: unknown[]): undefined => {
    options?.removeEventListener(`pagehide`, installObservabilityBootHidden2);
    context?.removeEventListener(
      `visibilitychange`,
      installObservabilityBootHidden3,
    );
  };
}

var resolveObservabilityBootSchedule: Dynamic;

var observabilityBootValue_13: boolean;

function resolveObservabilityBootComplete2(
  scheduler: Dynamic = resolveObservabilityBootSchedule(),
  ..._extraArguments: unknown[]
): Dynamic {
  if (observabilityBootValue_13)
    return (..._extraArguments: unknown[]): undefined => {};
  observabilityBootValue_13 = true;
  let enabled = false;
  let resolveObservabilityBootComplete2Result: Dynamic;
  let resolveObservabilityBootComplete2Result2: Dynamic;
  let resolveObservabilityBootComplete2Result3: Dynamic;
  let resolveObservabilityBootComplete2Result4: Dynamic;
  let resolveObservabilityBootComplete2Result5: Dynamic;
  let schemasAtPaint: Dynamic;
  let enabled2 = false;
  let enabled3 = false;
  let resolveObservabilityBootComplete2Result6: Dynamic;
  let chain: Dynamic;
  try {
    chain =
      scheduler.random === undefined
        ? undefined
        : resolveObservabilityBootValue5(scheduler.random());
  } catch {
    chain = false;
  }
  let scheduler2 = (..._extraArguments: unknown[]): undefined => {
    let resolveObservabilityBootComplete2Result7: Dynamic =
      resolveObservabilityBootComplete2Result5;
    resolveObservabilityBootComplete2Result5 = undefined;
    resolveObservabilityBootComplete2Result7?.();
  };
  let emitFill = (
    observabilityBootComplete2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        !enabled ||
        !enabled2 ||
        enabled3 ||
        resolveObservabilityBootComplete2Result6 === undefined
      )
    ) {
      enabled3 = true;
      scheduler2();
      try {
        scheduler.emitFill?.(
          resolveObservabilityBootHost(
            observabilityBootComplete2,
            resolveObservabilityBootComplete2Result6,
          ),
        );
      } catch {}
    }
  };
  let emit = (complete?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (enabled) return;
    enabled = true;
    resolveObservabilityBootComplete2Result?.();
    resolveObservabilityBootComplete2Result2?.();
    resolveObservabilityBootComplete2Result3?.();
    resolveObservabilityBootComplete2Result4?.();
    let boot: Dynamic;
    try {
      boot = scheduler.boot?.();
    } catch {}
    let blk0: Dynamic;
    try {
      blk0 = scheduler.blk0?.();
    } catch {}
    try {
      let host: Dynamic = scheduler.host();
      let plat: Dynamic = scheduler.plat();
      let observabilityBootComplete: Dynamic = resolveObservabilityBootComplete(
        scheduler.marks(),
        {
          complete: complete,
          host: host,
          navType: scheduler.navType(),
          plat: plat,
          ...(schemasAtPaint === undefined
            ? {}
            : {
                schemasAtPaint: schemasAtPaint,
              }),
          ...(boot === undefined
            ? {}
            : {
                boot: boot,
              }),
          ...(blk0 === undefined
            ? {}
            : {
                blk0: blk0,
              }),
          ...(chain === undefined
            ? {}
            : {
                chain: chain,
              }),
        },
      );
      enabled2 = observabilityBootComplete.stageBlk0 !== undefined;
      enabled3 = observabilityBootComplete.stageBlk0Fill !== undefined;
      resolveObservabilityBootComplete2Result6 = {
        host: host,
        plat: plat,
        ...(typeof observabilityBootComplete.openFlag == `string`
          ? {
              openFlag: observabilityBootComplete.openFlag,
            }
          : {}),
      };
      let word: Dynamic;
      try {
        word = resolveObservabilityBootIncludes(scheduler.viewerClass?.());
      } catch {}
      if (word === undefined) {
        scheduler.emit(observabilityBootComplete);
      } else {
        scheduler.emit(observabilityBootComplete, {
          word: word,
        });
      }
    } catch {}
    if (!enabled2 || enabled3) {
      scheduler2();
    }
  };
  let schedule = (..._extraArguments: unknown[]): undefined => {
    if (!(resolveObservabilityBootComplete2Result2 !== undefined || enabled)) {
      try {
        schemasAtPaint = scheduler.schemas?.();
      } catch {}
      resolveObservabilityBootComplete2Result?.();
      resolveObservabilityBootComplete2Result = undefined;
      resolveObservabilityBootComplete2Result2 = scheduler.schedule(
        (..._extraArguments: unknown[]) => emit(true),
        observabilityBootValue1500,
      );
    }
  };
  resolveObservabilityBootComplete2Result = scheduler.schedule(
    (..._extraArguments: unknown[]) => emit(false),
    observabilityBootValue15000,
  );
  resolveObservabilityBootComplete2Result3 = scheduler.onMark(
    (
      observabilityBootComplete2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (observabilityBootComplete2 === `paint`) {
        schedule();
      }
    },
  );
  if (scheduler.marks().at.paint !== undefined) {
    schedule();
  }
  try {
    resolveObservabilityBootComplete2Result4 = scheduler.onHide?.(
      (..._extraArguments: unknown[]): undefined => {
        if (resolveObservabilityBootComplete2Result2 !== undefined) {
          emit(true);
        }
      },
    );
  } catch {}
  try {
    resolveObservabilityBootComplete2Result5 = scheduler.onBlk0Fill?.(emitFill);
  } catch {}
  return (..._extraArguments: unknown[]): undefined => {
    resolveObservabilityBootComplete2Result?.();
    resolveObservabilityBootComplete2Result2?.();
    resolveObservabilityBootComplete2Result3?.();
    resolveObservabilityBootComplete2Result4?.();
    scheduler2();
  };
}

function resolveObservabilityBootSeated(
  observabilityBootSeated?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  return {
    seated(..._extraArguments: unknown[]): undefined {
      if (enabled || ((enabled = true), observabilityBootSeated.hidden()))
        return;
      let enabled2 = false;
      let onHidden: Dynamic = observabilityBootSeated.onHidden(
        (..._extraArguments: unknown[]) => (enabled2 = true),
      );
      observabilityBootSeated.frame(
        (..._extraArguments: unknown[]): Dynamic =>
          observabilityBootSeated.task(
            (..._extraArguments: unknown[]): undefined => {
              onHidden();
              if (!enabled2 && !observabilityBootSeated.hidden()) {
                observabilityBootSeated.post();
              }
            },
          ),
      );
    },
  };
}

function installObservabilityBootPriority(
  installObservabilityBootPriority2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let scheduler: Dynamic = (globalThis as Dynamic).scheduler;
  if (typeof scheduler?.postTask == `function`)
    try {
      scheduler
        .postTask(installObservabilityBootPriority2, {
          priority: `user-blocking`,
        })
        .catch((..._extraArguments: unknown[]): undefined => undefined);
      return;
    } catch {}
  if (typeof MessageChannel != `function`)
    return void setTimeout(installObservabilityBootPriority2, 0);
  let messageChannel: Dynamic = new (MessageChannel as Dynamic)();
  messageChannel.port1.addEventListener(
    `message`,
    (..._extraArguments: unknown[]): undefined => {
      messageChannel.port1.close();
      installObservabilityBootPriority2();
    },
    {
      once: true,
    },
  );
  messageChannel.port1.start();
  messageChannel.port2.postMessage(0);
}

var observabilityBootSnapshotFirstReadBodyReadEditorValues: string[];

var ObservabilityBootState2: Dynamic;

var observabilityBootValue0: number;

var resolveObservabilityBootValue6: Dynamic;

var resolveObservabilityBootMark: (observabilityBootMark?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolveObservabilityBootPaint(
  observabilityBootPaint?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (observabilityBootPaint.open) {
    if (!helloImport(options)) {
      resolveObservabilityBootMark(`pages:${options}`);
    }
    if (options === `paint`) {
      resolveObservabilityBootPost();
    }
  } else {
    resolveObservabilityBootMark(`pages:${options}`);
  }
}

function resolveObservabilityBootKey(
  key?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      ObservabilityBootState2 !== null &&
      ObservabilityBootState2.key === key &&
      !ObservabilityBootState2.reported
    )
  ) {
    observabilityBootValue0++;
    ObservabilityBootState2 = {
      key: key,
      at: {},
      reported: false,
      open: observabilityBootValue0 === 1,
    };
    resolveObservabilityBootPaint(ObservabilityBootState2, `mount`);
  }
}

function resolveObservabilityBootPaint2(
  observabilityBootPaint2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      ObservabilityBootState2 === null ||
      ObservabilityBootState2.reported ||
      ObservabilityBootState2.at[observabilityBootPaint2] !== undefined
    )
  ) {
    ObservabilityBootState2.at[observabilityBootPaint2] =
      resolveObservabilityBootValue6();
    resolveObservabilityBootPaint(
      ObservabilityBootState2,
      observabilityBootPaint2,
    );
    if (observabilityBootPaint2 === `paint`) {
      resolveObservabilityBootComplete3(ObservabilityBootState2);
    }
  }
}

function resolveObservabilityBootComplete3(
  activity?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  activity.reported = true;
  let record2: Dynamic = {};
  for (let resolveObservabilityBootComplete3Result of observabilityBootSnapshotFirstReadBodyReadEditorValues as Dynamic) {
    let atItem: Dynamic = activity.at[resolveObservabilityBootComplete3Result];
    if (atItem !== undefined) {
      record2[resolveObservabilityBootComplete3Result] = Math.round(atItem);
    }
  }
  resolveCommentsStoreLayer(`host`, `mount`, record2);
  reportOperationEvent(`mount.paint`, record2);
  if (activity.open) {
    let observabilityBootComplete: Dynamic = resolveObservabilityBootComplete(
      helloBImport(),
      {
        complete: true,
        host: `frame`,
        navType: ``,
      },
    );
    delete observabilityBootComplete.host;
    delete observabilityBootComplete.complete;
    delete observabilityBootComplete.hostStartFrom;
    resolveCommentsStoreLayer(`host`, `open`, observabilityBootComplete);
    reportOperationEvent(`mount.open`, observabilityBootComplete);
  }
}

function resolveObservabilityBootOpen(
  observabilityBootOpen?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (ObservabilityBootState2 !== null) {
    if (!ObservabilityBootState2.open)
      return void resolveObservabilityBootMark(`pages:editorFrame`);
    if (observabilityBootState3 === undefined) {
      observabilityBootState3 =
        resolveObservabilityBootIsFinite2(observabilityBootOpen) ??
        resolveObservabilityBootValue6();
      resolveObservabilityBootMark(`pages:editorFrame`);
      resolveObservabilityBootPixels();
    }
  }
}

var observabilityBootState3: Dynamic;

var observabilityBootState4: Dynamic;

var observabilityBootValue_14: boolean;

function resolveObservabilityBootPixels(
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      observabilityBootState3 === undefined ||
      observabilityBootState4 === undefined
    )
  ) {
    helloImport(
      `pixels`,
      undefined,
      Math.max(observabilityBootState3, observabilityBootState4),
    );
  }
}

var ObservabilityBootFrame: Dynamic;

function resolveObservabilityBootPost(
  ..._extraArguments: unknown[]
): undefined {
  if (!observabilityBootValue_14) {
    observabilityBootValue_14 = true;
    try {
      resolveObservabilityBootSeated({
        ...ObservabilityBootFrame,
        post: (..._extraArguments: unknown[]): undefined => {
          observabilityBootState4 = resolveObservabilityBootValue6();
          resolveObservabilityBootMark(`pages:pageFrame`);
          resolveObservabilityBootPixels();
        },
      }).seated();
    } catch {}
  }
}

function resolveObservabilityBootIsFinite2(
  observabilityBootIsFinite2?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof observabilityBootIsFinite2 != `number` ||
    !Number.isFinite(observabilityBootIsFinite2)
  )
    return;
  let timeOrigin =
    typeof performance == `object` && performance !== null
      ? performance.timeOrigin
      : undefined;
  if (typeof timeOrigin != `number` || !Number.isFinite(timeOrigin)) return;
  let observabilityBootValue6: Dynamic = resolveObservabilityBootValue6();
  let difference = observabilityBootIsFinite2 - timeOrigin;
  return difference <= observabilityBootValue6 &&
    difference >= observabilityBootValue6 - 5e3 &&
    difference >= 0
    ? difference
    : undefined;
}

var ObservabilityBootApiLfileRuntime35524228: string;

var ObservabilityBootRuntimeMermaid11161MinJs: string;

var ObservabilityBootMessage: string;

var ObservabilityBootMermaidRuntimeError: Dynamic;

function createPagesMermaidLibFailedEvent(
  key?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.mermaid.lib_failed`,
    key: key,
    fields: {
      reason: key,
    },
  };
}

function resolveObservabilityBootChunk(
  observabilityBootChunk?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBootChunk instanceof
    (ObservabilityBootMermaidRuntimeError as Dynamic)
    ? observabilityBootChunk.reason
    : `chunk`;
}

var ObservabilityBootState3: string;

var ObservabilityBootState4: string;

var resolveObservabilityBootValue7: (..._extraArguments: unknown[]) => boolean;

async function loadObservabilityBootExec(
  observabilityBootExec?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let match = /^sha384-([A-Za-z0-9+/]{64})$/.exec(options);
  if (!match || !(globalThis as Dynamic).crypto?.subtle) return false;
  let uint8Array = new Uint8Array(
    await crypto.subtle.digest(`SHA-384`, observabilityBootExec),
  );
  let label: Dynamic = ``;
  for (let loadObservabilityBootExecResult of uint8Array as Dynamic)
    label += String.fromCharCode(loadObservabilityBootExecResult);
  return btoa(label) === match[1];
}

async function loadObservabilityBootCredentials(
  observabilityBootCredentials?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let response: Dynamic;
  let loadObservabilityBootCredentialsResult: Dynamic;
  try {
    response = await fetch(ObservabilityBootState3, {
      ...observabilityBootCredentials,
      credentials: `omit`,
    });
  } catch {
    throw new (ObservabilityBootMermaidRuntimeError as Dynamic)(`network`);
  }
  if (!response.ok)
    throw new (ObservabilityBootMermaidRuntimeError as Dynamic)(
      `status`,
      String(response.status),
    );
  try {
    loadObservabilityBootCredentialsResult = await response.arrayBuffer();
  } catch {
    throw new (ObservabilityBootMermaidRuntimeError as Dynamic)(`network`);
  }
  if (loadObservabilityBootCredentialsResult.byteLength === 0)
    throw new (ObservabilityBootMermaidRuntimeError as Dynamic)(`empty`);
  if (
    !(await loadObservabilityBootExec(
      loadObservabilityBootCredentialsResult,
      ObservabilityBootState4,
    ))
  )
    throw new (ObservabilityBootMermaidRuntimeError as Dynamic)(`integrity`);
  return new TextDecoder().decode(loadObservabilityBootCredentialsResult);
}

function resolveObservabilityBootCache(..._extraArguments: unknown[]) {
  return loadObservabilityBootCredentials().catch(
    (..._extraArguments: unknown[]) =>
      loadObservabilityBootCredentials({
        cache: `reload`,
      }),
  );
}

var ObservabilityBootMessage2: string;

var observabilityBootEnTechEn60En70Values: string[];

var observabilityBootValue10000: number;

function resolveObservabilityBootTech(
  observabilityBootTech?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof observabilityBootTech != `string` ||
    !observabilityBootTech.startsWith(`lfile-spell-words/1
#
`) ||
    !observabilityBootTech.endsWith(`
#
lfile-spell-words/end`)
  )
    return null;
  let observabilityBootTechParts = observabilityBootTech.split(
    ObservabilityBootMessage2,
  );
  if (
    observabilityBootTechParts.length !==
    observabilityBootEnTechEn60En70Values.length + 2
  )
    return null;
  let [
    ,
    setObservabilityBootTechParts,
    tech,
    en60,
    en70,
    neverSuggest,
  ]: Dynamic = observabilityBootTechParts;
  let index = 0;
  for (
    let setObservabilityBootTechPartIndex: Dynamic =
      setObservabilityBootTechParts.indexOf(`
`);
    setObservabilityBootTechPartIndex !== -1 &&
    index < observabilityBootValue10000;
    setObservabilityBootTechPartIndex = setObservabilityBootTechParts.indexOf(
      `
`,
      setObservabilityBootTechPartIndex + 1,
    )
  )
    index++;
  return index < observabilityBootValue10000
    ? null
    : {
        en: setObservabilityBootTechParts,
        tech: tech,
        en60: en60,
        en70: en70,
        neverSuggest: neverSuggest,
      };
}

var ObservabilityBootArtifactTypeLfileSpellWordsE258c731Txt: string;

var resolveObservabilityBootValue8: Dynamic;

async function loadObservabilityBootStatus(
  observabilityBootStatus?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let response = await fetch(observabilityBootStatus, options);
  if (!response.ok)
    throw Error(
      `lfile spell words ${observabilityBootStatus}: ${response.status}`,
    );
  let text = await response.text();
  if (resolveObservabilityBootTech(text) === null)
    throw Error(
      `lfile spell words ${observabilityBootStatus}: not a whole word file (${text.length} chars)`,
    );
  return text;
}

function resolveObservabilityBootCache2(..._extraArguments: unknown[]) {
  let ObservabilityBootArtifactTypeLfileSpellWordsE258c731Txt2 =
    ObservabilityBootArtifactTypeLfileSpellWordsE258c731Txt;
  return loadObservabilityBootStatus(
    ObservabilityBootArtifactTypeLfileSpellWordsE258c731Txt2,
  ).catch((..._extraArguments: unknown[]) =>
    loadObservabilityBootStatus(
      ObservabilityBootArtifactTypeLfileSpellWordsE258c731Txt2,
      {
        cache: `reload`,
      },
    ),
  );
}

var observabilityBootState5: Dynamic;

var ObservabilityBootState5: Dynamic;

var ObservabilityBootState6: Dynamic;

async function loadObservabilityBootRuntimeChars(
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let result: Dynamic = (await ObservabilityBootState6()).default;
  if (result.length === 0)
    throw Error(
      `lfile runtime is not in this build (Frame mode needs the prebuilt runtime)`,
    );
  helloImport(`runtimeWarm`, {
    runtimeChars: result.length,
  });
  return result;
}

async function loadObservabilityBootStatus2(..._extraArguments: unknown[]) {
  let response = await fetch(
    resolvePlatformApiAndAuthValue(ObservabilityBootApiLfileRuntime35524228),
  );
  if (!response.ok)
    throw Object.assign(
      Error(
        `lfile-runtime ${ObservabilityBootApiLfileRuntime35524228}: ${response.status}`,
      ),
      {
        status: response.status,
      },
    );
  return response.text();
}

function isObservabilityBootValue(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (response instanceof TypeError) return true;
  let status: Dynamic = response?.status;
  return (
    typeof status == `number` &&
    (status >= 500 || status === 408 || status === 429)
  );
}

var ObservabilityBootState7: Dynamic;

function resolveObservabilityBootRetryable(
  ..._extraArguments: unknown[]
): Dynamic {
  return loadPlatformLoadingAndStatusDelaysMs(loadObservabilityBootStatus2, {
    ...ObservabilityBootState7,
    retryable: isObservabilityBootValue,
    onRetry: (
      observabilityBootRetryable?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      emitTelemetryEvent(
        createPagesBootChunkRetryEvent(observabilityBootRetryable),
      ),
  });
}

function resolveObservabilityBootExec(..._extraArguments: unknown[]): Dynamic {
  ObservabilityBootState5 ??=
    /\/([0-9a-f]{8})$/.exec(`/api/lfile-runtime/35524228`)?.[1] ?? null;
  return (observabilityBootState5 ??= (
    inFrame()
      ? loadObservabilityBootRuntimeChars()
      : resolveObservabilityBootRetryable()
  ).catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    throw (
      (observabilityBootState5 = undefined),
      Error(
        `lfile runtime fetch failed — try refreshing (IAP session?). ${error instanceof Error ? error.message : String(error)}`,
      )
    );
  }));
}

async function loadPlatformRuntimeAndChatCause(
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  ObservabilityBootState5 ??=
    /\/([0-9a-f]{8})$/.exec(`/api/lfile-runtime/35524228`)?.[1] ?? null;
  try {
    return await resolveObservabilityTelemetryCache();
  } catch (cause: Dynamic) {
    throw Error(
      `lfile runtime fetch failed — try refreshing. ${cause instanceof Error ? cause.message : `(no detail)`}`,
      {
        cause: cause,
      },
    );
  }
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeObservabilityBootStep1(): void {
  (ObservabilityBootOptraceSink = `__optrace_sink`);
  (resolveObservabilityBootValue2 = (
    observabilityBootValue2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBootValue2 == `object` &&
    !!observabilityBootValue2 &&
    !Array.isArray(observabilityBootValue2));
  (observabilityBootValue_1 = false);
  (observabilityBootValue_12 = false);
  (observabilityBootSet = new (Set as Dynamic)());
  (resolveObservabilityBootValue3 = (
    ..._extraArguments: unknown[]
  ) =>
    typeof performance == `object` &&
    performance !== null &&
    typeof performance.now == `function`
      ? performance.now()
      : Date.now());
  (resolveObservabilityBootAttrs = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBootValue2(node) &&
    (typeof node.attrs?.bid == `string` || Array.isArray(node.content)));
  (resolveObservabilityBootInsert = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBootValue2(event) &&
    event.op === `insert` &&
    event.source?.as === `blocks` &&
    (event.target === undefined ||
      event.target === null ||
      event.target.kind === `root`));
  (observabilityBootValue1500 = 1500);
  (observabilityBootValue15000 = 15e3);
  (observabilityBootValue65535 = 65535);
  (observabilityBootSet2 = new (Set as Dynamic)([`runtimePost`]));
  (resolveObservabilityBootToUpperCase = (
    observabilityBoot?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `t${observabilityBoot[0].toUpperCase()}${observabilityBoot.slice(1)}`);
  (observabilityBootHelloHelloFlushedStateValues = [
    `hello`,
    `helloFlushed`,
    `state`,
  ]);
  (resolveObservabilityBootToUpperCase2 = (
    observabilityBoot?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `lead${observabilityBoot[0].toUpperCase()}${observabilityBoot.slice(1)}`);
  (ObservabilityBootStageEntry = [
    [`stageEntry`, undefined, `entry`],
    [`stageS3`, `entry`, `mount`],
    [`stageS4`, `mount`, `editorFrameLoaded`],
    [`stageS5a`, `editorFrameLoaded`, `runtimeReady`],
    [`stageS5b`, `runtimeReady`, `editor`],
    [`stageS6`, `editor`, `paint`],
    [`stageS7`, `paint`, `pixels`],
    [`stageDoor`, `open`, `opened`],
  ]);
  (observabilityBootValue655352 = 65535);
  (ObservabilityBootState = [16, 50, 100, 200, 400, 800, 1600, 3200]);
  (ObservabilityBootBlk0fill = `blk0fill`);
  (resolveObservabilityBootValue5 = (
    observabilityBootValue5?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBootValue5 == `number` &&
    observabilityBootValue5 >= 0 &&
    observabilityBootValue5 < 1 / 8);
  (observabilityBootMemberGuestPublicValues = [`member`, `guest`, `public`]);
  (ObservabilityBootUnknown = `unknown`);
  (resolveObservabilityBootSchedule = (
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    schedule: (
      observabilityBootSchedule?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let setTimeout2 = setTimeout(observabilityBootSchedule, options);
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    host: (..._extraArguments: unknown[]) =>
      resolveObservabilityBootChat({
        frame: inFrame(),
        shell: isEditorExtensionsValue(),
        hostPane: isEditorExtensionsLocation(),
        poked: frameHostChromeWitnessed(),
        pane: frameConversationPane(),
        chatBeside: hostSays(`chat_beside`),
      }),
    navType: (..._extraArguments: unknown[]): Dynamic =>
      resolveObservabilityBootNavigation(),
    plat: resolveObservabilityBrowserAndOperationEventsValue3,
    emit: (fields?: Dynamic, wire?: Dynamic, ..._extraArguments: unknown[]) =>
      emitTelemetryEvent({
        name: `pages.open.timing`,
        fields: fields,
        ...(wire === undefined
          ? {}
          : {
              wire: wire,
            }),
      }),
    viewerClass: frameViewerClassWord,
    marks: helloBImport,
    onMark: helloYImport,
    schemas: getLazySchemaStats,
    boot: resolveObservabilityTelemetryOrdinal2,
    onHide: (
      observabilityBootSchedule?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => installObservabilityBootHidden(observabilityBootSchedule),
    blk0: resolveObservabilityBootZero,
    random: (..._extraArguments: unknown[]) => Math.random(),
    onBlk0Fill: clearObservabilityBootDelete,
    emitFill: (fields?: Dynamic, ..._extraArguments: unknown[]) =>
      emitTelemetryEvent({
        name: `pages.open.empty_fill`,
        fields: fields,
      }),
  }));
  (observabilityBootValue_13 = false);
  (observabilityBootSnapshotFirstReadBodyReadEditorValues = [
    `snapshot`,
    `firstRead`,
    `bodyRead`,
    `editor`,
    `paint`,
  ]);
  (ObservabilityBootState2 = null);
  (observabilityBootValue0 = 0);
  (resolveObservabilityBootValue6 = (
    ..._extraArguments: unknown[]
  ) =>
    typeof performance == `object` && typeof performance.now == `function`
      ? performance.now()
      : Date.now());
  (resolveObservabilityBootMark = (
    observabilityBootMark?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      if (
        typeof performance == `object` &&
        typeof performance.mark == `function`
      ) {
        performance.mark(observabilityBootMark);
      }
    } catch {}
  });
  (observabilityBootValue_14 = false);
  (ObservabilityBootFrame = {
    frame: (
      observabilityBootFrame?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (typeof requestAnimationFrame == `function`
        ? requestAnimationFrame(observabilityBootFrame)
        : undefined),
    task: installObservabilityBootPriority,
    hidden: (..._extraArguments: unknown[]) =>
      typeof document == `object` &&
      document !== null &&
      document.visibilityState === `hidden`,
    onHidden: (
      observabilityBootFrame?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (typeof document != `object` || document === null)
        return (..._extraArguments: unknown[]): undefined => {};
      let observabilityBootFrame2 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        if (document.visibilityState === `hidden`) {
          observabilityBootFrame();
        }
      };
      document.addEventListener(`visibilitychange`, observabilityBootFrame2);
      return (..._extraArguments: unknown[]) =>
        document.removeEventListener(`visibilitychange`, observabilityBootFrame2);
    },
  });
  (ObservabilityBootApiLfileRuntime35524228 = `/api/lfile-runtime/35524228`);
  (ObservabilityBootRuntimeMermaid11161MinJs = `/_runtime/mermaid-11.16.1.min.js`);
  (ObservabilityBootMessage = `sha384-aBQXj4hK6Jm05i7aQAsUV3bLdSUrHX1BGYfMB0166TtWt/RRaw+h0Eelme9OCOvy`);
  (ObservabilityBootMermaidRuntimeError = class extends Error {
    [key: string]: Dynamic;
    reason: Dynamic;
    constructor(
      observabilityBootMermaidRuntimeError?: Dynamic,
      options: Dynamic = ``,
      ..._extraArguments: unknown[]
    ) {
      super(
        `mermaid runtime: ${observabilityBootMermaidRuntimeError}${options ? ` (${options})` : ``}`,
      );
      this.name = `MermaidRuntimeError`;
      this.reason = observabilityBootMermaidRuntimeError;
    }
  });
  (ObservabilityBootState3 = ObservabilityBootRuntimeMermaid11161MinJs);
  (ObservabilityBootState4 = ObservabilityBootMessage);
  (resolveObservabilityBootValue7 = (..._extraArguments: unknown[]) =>
    ObservabilityBootState3 !== ``);
  (ObservabilityBootMessage2 = `
#
`);
  (observabilityBootEnTechEn60En70Values = [
    `en`,
    `tech`,
    `en60`,
    `en70`,
    `neverSuggest`,
  ]);
  (observabilityBootValue10000 = 1e4);
  (ObservabilityBootArtifactTypeLfileSpellWordsE258c731Txt = `./artifact-type/lfile-spell-words.e258c731.txt`);
  (resolveObservabilityBootValue8 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ObservabilityBootArtifactTypeLfileSpellWordsE258c731Txt !== `` && inFrame());
  (ObservabilityBootState5 = null);
  (ObservabilityBootState6 = resolvePlatformChunkLoadingEnv(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadTImport(
        (..._extraArguments: unknown[]): Dynamic =>
          import("./editor-runtime-source"),
        [],
        import.meta.url,
      ),
    {
      onGiveUp: (..._extraArguments: unknown[]): undefined => {},
    },
  ));
  (ObservabilityBootState7 = {});
}

export {
  ObservabilityBootOptraceSink,
  createPagesMermaidLibFailedEvent,
  loadPlatformRuntimeAndChatCause,
  reportOperationEvent,
  resolveObservabilityBootCache,
  resolveObservabilityBootCache2,
  resolveObservabilityBootChat,
  resolveObservabilityBootChunk,
  resolveObservabilityBootComplete2,
  resolveObservabilityBootEntries,
  resolveObservabilityBootExec,
  resolveObservabilityBootKey,
  resolveObservabilityBootMark,
  resolveObservabilityBootNode,
  resolveObservabilityBootNode2,
  resolveObservabilityBootOpen,
  resolveObservabilityBootPaint2,
  resolveObservabilityBootTech,
  resolveObservabilityBootValue4,
  resolveObservabilityBootValue7,
  resolveObservabilityBootValue8,
};

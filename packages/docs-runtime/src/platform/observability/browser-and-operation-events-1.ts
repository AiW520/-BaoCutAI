/** BaoCut: observability browser and operation events from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  filterObservabilityTelemetryRoad,
  observabilityTelemetryDeferredDirtyDocDeferredDirtyStagedDeferredDirtyPostDeferredDirtyOutboxValues,
  observabilityTelemetryDeferredUnreadyPortDeferredUnreadyViewerValues,
  observabilityTelemetryElsewhereQueuedRowCommentRowValues,
  observabilityTelemetryFlightOutDomClosedPlainBehindValues,
  observabilityTelemetryHiddenReturnIdleCapValues,
  observabilityTelemetryHiddenReturnIdleCapValues2,
  observabilityTelemetryLateWrittenValues,
  observabilityTelemetryMarkedValues,
  observabilityTelemetryOfferedDeferredDirtyDeferredQuietDeferredPresentValues,
  observabilityTelemetryPattern27,
  observabilityTelemetryPattern29,
  observabilityTelemetrySavedUnsavedBarUnsavedLinkUnsavedUnsyncedValues,
  observabilityTelemetrySet16,
  observabilityTelemetrySet18,
  observabilityTelemetrySet22,
  observabilityTelemetrySignedOutReauthRefusedUnavailableValues,
  observabilityTelemetryWorkingSentQueuedNeedsUserValues,
  observabilityTelemetryWriteBlankCommentValues,
  observabilityTelemetryWrittenRepliedEndedFailedValues,
  resolveObservabilityTelemetryWhy,
} from "./telemetry-2";
import {
  isPlatformSessionAndSourcesSplit,
  isPlatformSessionAndSourcesSplit2,
  platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValues,
  resolvePlatformSessionAndSourcesValue20,
  resolvePlatformSessionAndSourcesValue21,
} from "../services/session-and-sources-2";

var observabilityBrowserAndOperationEventsToldRereadWholeSeatedValues: string[];

var resolveObservabilityBrowserAndOperationEventsValue: (observabilityBrowserAndOperationEventsValue?: Dynamic, ..._extraArguments: unknown[]) => "n1" | "n2_5" | "n6p";

var resolveObservabilityBrowserAndOperationEventsFind: (observabilityBrowserAndOperationEventsFind?: Dynamic, options?: unknown, ..._extraArguments: unknown[]) => string | null;

var observabilityBrowserAndOperationEventsPattern: RegExp;

var ObservabilityBrowserAndOperationEventsOtOt: string;

var resolveObservabilityBrowserAndOperationEventsTest: Dynamic;

var observabilityBrowserAndOperationEventsPattern2: RegExp;

var observabilityBrowserAndOperationEventsPattern3: RegExp;

function resolveObservabilityBrowserAndOperationEventsMacos(
  observabilityBrowserAndOperationEventsMacos?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof observabilityBrowserAndOperationEventsMacos == `string`)
    switch (observabilityBrowserAndOperationEventsMacos.toLowerCase()) {
      case `macos`:
        return `mac`;
      case `windows`:
        return `win`;
      case `linux`:
        return `lin`;
      case `chrome os`:
      case `chromium os`:
        return `cro`;
      case `android`:
        return `and`;
      case `ios`:
        return `ios`;
      default:
        return;
    }
}

function resolveObservabilityBrowserAndOperationEventsTest2(
  observabilityBrowserAndOperationEventsTest2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return /\bCrOS\b/.test(observabilityBrowserAndOperationEventsTest2)
    ? `cro`
    : /\bAndroid\b/.test(observabilityBrowserAndOperationEventsTest2)
      ? `and`
      : /\b(?:iPhone|iPad|iPod)\b/.test(
            observabilityBrowserAndOperationEventsTest2,
          )
        ? `ios`
        : /\bWindows\b/.test(observabilityBrowserAndOperationEventsTest2)
          ? `win`
          : /\b(?:Macintosh|Mac OS X)\b/.test(
                observabilityBrowserAndOperationEventsTest2,
              )
            ? `mac`
            : /\b(?:Linux|X11)\b/.test(
                  observabilityBrowserAndOperationEventsTest2,
                )
              ? `lin`
              : `ot`;
}

function collectObservabilityBrowserAndOperationEventsMicrosoftEdge(
  collectObservabilityBrowserAndOperationEventsMicrosoftEdge2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !Array.isArray(collectObservabilityBrowserAndOperationEventsMicrosoftEdge2)
  )
    return;
  let mappedCollectObservabilityBrowserAndOperationEventsMicrosoftEdge: Dynamic =
    collectObservabilityBrowserAndOperationEventsMicrosoftEdge2.map(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        typeof rolldownNImport2 == `object` &&
        rolldownNImport2 &&
        typeof rolldownNImport2.brand == `string`
          ? rolldownNImport2.brand.toLowerCase()
          : ``,
    );
  if (
    mappedCollectObservabilityBrowserAndOperationEventsMicrosoftEdge.includes(
      `microsoft edge`,
    )
  )
    return `ed`;
  if (
    mappedCollectObservabilityBrowserAndOperationEventsMicrosoftEdge.some(
      (
        mappedCollectObservabilityBrowserAndOperationEventsMicrosoftEdge2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        mappedCollectObservabilityBrowserAndOperationEventsMicrosoftEdge2 ===
          `google chrome` ||
        mappedCollectObservabilityBrowserAndOperationEventsMicrosoftEdge2 ===
          `chromium` ||
        mappedCollectObservabilityBrowserAndOperationEventsMicrosoftEdge2 ===
          `android webview`,
    )
  )
    return `cr`;
}

function resolveObservabilityBrowserAndOperationEventsTest3(
  observabilityBrowserAndOperationEventsTest3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return /\bEdg(?:e|A|iOS)?\/\d/.test(
    observabilityBrowserAndOperationEventsTest3,
  )
    ? `ed`
    : /\b(?:Firefox|FxiOS)\/\d/.test(
          observabilityBrowserAndOperationEventsTest3,
        )
      ? `ff`
      : /\b(?:Chrome|CriOS|Chromium)\/\d/.test(
            observabilityBrowserAndOperationEventsTest3,
          )
        ? `cr`
        : /\bSafari\/\d/.test(observabilityBrowserAndOperationEventsTest3) &&
            /\bVersion\/\d/.test(observabilityBrowserAndOperationEventsTest3)
          ? `sf`
          : `ot`;
}

function resolveObservabilityBrowserAndOperationEventsTest4(
  observabilityBrowserAndOperationEventsTest4?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    let userAgent: Dynamic =
      observabilityBrowserAndOperationEventsTest4?.userAgent;
    let userAgentData: Dynamic =
      observabilityBrowserAndOperationEventsTest4?.userAgentData;
    let maxTouchPoints: Dynamic =
      observabilityBrowserAndOperationEventsTest4?.maxTouchPoints;
    let userAgent2 = typeof userAgent == `string` ? userAgent : ``;
    let userAgentData2: Dynamic =
      typeof userAgentData == `object` && userAgentData
        ? userAgentData
        : undefined;
    let maxTouchPoints2 =
      typeof maxTouchPoints == `number` ? maxTouchPoints : 0;
    let test = observabilityBrowserAndOperationEventsPattern2.test(userAgent2);
    let test2 = observabilityBrowserAndOperationEventsPattern3.test(userAgent2);
    let observabilityBrowserAndOperationEventsMacos =
      resolveObservabilityBrowserAndOperationEventsMacos(
        userAgentData2?.platform,
      ) ?? resolveObservabilityBrowserAndOperationEventsTest2(userAgent2);
    if (
      observabilityBrowserAndOperationEventsMacos === `mac` &&
      !test2 &&
      (maxTouchPoints2 > 1 ||
        (test && !/\b(?:Chrome|Chromium)\/\d/.test(userAgent2)))
    ) {
      observabilityBrowserAndOperationEventsMacos = `ios`;
    }
    let label =
      test &&
      (test2
        ? observabilityBrowserAndOperationEventsMacos === `mac` ||
          observabilityBrowserAndOperationEventsMacos === `win` ||
          observabilityBrowserAndOperationEventsMacos === `lin`
        : observabilityBrowserAndOperationEventsMacos === `ios` ||
          observabilityBrowserAndOperationEventsMacos === `and`)
        ? `app`
        : (collectObservabilityBrowserAndOperationEventsMicrosoftEdge(
            userAgentData2?.brands,
          ) ?? resolveObservabilityBrowserAndOperationEventsTest3(userAgent2));
    let label2 = `${observabilityBrowserAndOperationEventsMacos}-${label}`;
    return observabilityBrowserAndOperationEventsPattern.test(label2)
      ? label2
      : ObservabilityBrowserAndOperationEventsOtOt;
  } catch {
    return ObservabilityBrowserAndOperationEventsOtOt;
  }
}

var observabilityBrowserAndOperationEventsPattern4: RegExp;

var ObservabilityBrowserAndOperationEventsState: Dynamic;

var resolveObservabilityBrowserAndOperationEventsBrand: Dynamic;

var resolveObservabilityBrowserAndOperationEventsParseInt: Dynamic;

function resolveObservabilityBrowserAndOperationEventsSplit(
  observabilityBrowserAndOperationEventsSplit?: Dynamic,
  ..._extraArguments: unknown[]
): string | undefined {
  try {
    let observabilityBrowserAndOperationEventsTest4PartItem: string =
      resolveObservabilityBrowserAndOperationEventsTest4(
        observabilityBrowserAndOperationEventsSplit,
      ).split(`-`)[1] ?? `ot`;
    let ObservabilityBrowserAndOperationEventsStateItem: Dynamic =
      ObservabilityBrowserAndOperationEventsState[
        observabilityBrowserAndOperationEventsTest4PartItem
      ];
    if (ObservabilityBrowserAndOperationEventsStateItem === undefined) return;
    let userAgent: Dynamic =
      observabilityBrowserAndOperationEventsSplit?.userAgent;
    let userAgentData: Dynamic =
      observabilityBrowserAndOperationEventsSplit?.userAgentData;
    let observabilityBrowserAndOperationEventsBrand: Dynamic =
      resolveObservabilityBrowserAndOperationEventsBrand(
        (typeof userAgentData == `object` && userAgentData
          ? userAgentData
          : undefined
        )?.brands,
        observabilityBrowserAndOperationEventsTest4PartItem,
      ) ??
      resolveObservabilityBrowserAndOperationEventsParseInt(
        typeof userAgent == `string` ? userAgent : ``,
        observabilityBrowserAndOperationEventsTest4PartItem,
      );
    if (
      observabilityBrowserAndOperationEventsBrand === undefined ||
      !Number.isFinite(observabilityBrowserAndOperationEventsBrand)
    )
      return;
    let label: string = `${observabilityBrowserAndOperationEventsTest4PartItem}-${observabilityBrowserAndOperationEventsBrand < ObservabilityBrowserAndOperationEventsStateItem[0] ? `lo` : observabilityBrowserAndOperationEventsBrand > ObservabilityBrowserAndOperationEventsStateItem[1] ? `hi` : `${Math.floor(observabilityBrowserAndOperationEventsBrand / 10)}x`}`;
    return observabilityBrowserAndOperationEventsPattern4.test(label)
      ? label
      : undefined;
  } catch {
    return;
  }
}

var ObservabilityBrowserAndOperationEventsState2: Dynamic;

function resolveObservabilityBrowserAndOperationEventsValue2(
  ..._extraArguments: unknown[]
): Dynamic {
  if (ObservabilityBrowserAndOperationEventsState2 === null) {
    ObservabilityBrowserAndOperationEventsState2 =
      resolveObservabilityBrowserAndOperationEventsSplit(
        typeof navigator == `object` && navigator !== null
          ? navigator
          : undefined,
      );
  }
  return ObservabilityBrowserAndOperationEventsState2;
}

var observabilityBrowserAndOperationEventsState: Dynamic;

function resolveObservabilityBrowserAndOperationEventsValue3(
  ..._extraArguments: unknown[]
): Dynamic {
  return (observabilityBrowserAndOperationEventsState ??=
    resolveObservabilityBrowserAndOperationEventsTest4(
      typeof navigator == `object` && navigator !== null
        ? navigator
        : undefined,
    ));
}

var observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValues: string[];

var observabilityBrowserAndOperationEventsUnreadUnplacedAgainNoPrintValues: string[];

var resolveObservabilityBrowserAndOperationEventsValue4: (observabilityBrowserAndOperationEventsValue4?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveObservabilityBrowserAndOperationEventsFlatMap: Dynamic;

var observabilityBrowserAndOperationEventsValue32: number;

function resolveObservabilityBrowserAndOperationEventsSplit2(
  items?: unknown,
  ..._extraArguments: unknown[]
) {
  let itemsParts =
    typeof items == `string` &&
    items.length <= observabilityBrowserAndOperationEventsValue32
      ? items.split(`:`)
      : [];
  return itemsParts.length !== 2 && itemsParts.length !== 3
    ? resolveObservabilityBrowserAndOperationEventsValue4(`unk`, `unk`, false)
    : resolveObservabilityBrowserAndOperationEventsValue4(
        observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValues.find(
          (
            observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValue?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValue ===
            itemsParts[0],
        ) ?? `unk`,
        observabilityBrowserAndOperationEventsUnreadUnplacedAgainNoPrintValues.find(
          (
            observabilityBrowserAndOperationEventsUnreadUnplacedAgainNoPrintValue?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            observabilityBrowserAndOperationEventsUnreadUnplacedAgainNoPrintValue ===
            itemsParts[1],
        ) ?? `unk`,
        itemsParts.length === 3 && itemsParts[2] === `tbl`,
      );
}

var observabilityBrowserAndOperationEventsPattern5: RegExp;

var sanitizeTelemetryComponent: Dynamic;

function createPagesLinkReconnectEvent(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let key = `ws_${Number.isInteger(error.code) ? error.code : 0}`;
  return {
    name: `pages.link.reconnect`,
    key: key,
    fields: {
      code: key,
      road: `mux`,
      silent: error.clean || error.refused || error.code === 4002,
      count: Math.max(1, Math.min(65535, error.attempt + 1)),
    },
  };
}

function resolveObservabilityBrowserAndOperationEventsKey(
  observabilityBrowserAndOperationEventsKey?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityBrowserAndOperationEventsKeySlice: Dynamic =
    observabilityBrowserAndOperationEventsKey.startsWith(`lane:`)
      ? observabilityBrowserAndOperationEventsKey.slice(5)
      : observabilityBrowserAndOperationEventsKey;
  if (
    observabilityBrowserAndOperationEventsKeySlice.startsWith(`reopen-storm `)
  ) {
    let number2 = Number(
      /\bn=(\d+)/.exec(observabilityBrowserAndOperationEventsKeySlice)?.[1] ??
        `0`,
    );
    let test = /\bresumed=true\b/.test(
      observabilityBrowserAndOperationEventsKeySlice,
    );
    let cadence =
      /\bcadence=(lt2s|lt5s|lt15s|lt60s|none)\b/.exec(
        observabilityBrowserAndOperationEventsKeySlice,
      )?.[1] ?? `none`;
    return {
      name: `pages.sync.reopen_storm`,
      key: `reopen_storm`,
      fields: {
        code: test ? `resumed` : `cold`,
        cadence: cadence,
        count: Math.max(1, Math.min(65535, number2)),
      },
    };
  }
  if (!observabilityBrowserAndOperationEventsKeySlice.startsWith(`reopen:`))
    return null;
  let observabilityBrowserAndOperationEventsKeySliceSlice: Dynamic =
    observabilityBrowserAndOperationEventsKeySlice.slice(7);
  if (
    observabilityBrowserAndOperationEventsKeySliceSlice.startsWith(`shell:`)
  ) {
    let word: Dynamic =
      resolveObservabilityBrowserAndOperationEventsToLowerCase(
        observabilityBrowserAndOperationEventsKeySliceSlice.slice(6),
      );
    return {
      name: `pages.link.reconnect`,
      key: `stream_reset:${word}`,
      fields: {
        code: `stream_reset`,
        road: `lane`,
        silent: true,
        word: word,
        component: `stream_reset:${word}`,
      },
      wire: {
        word: word,
      },
    };
  }
  let key = `lane_reopen_${observabilityBrowserAndOperationEventsKeySliceSlice.replace(/[^A-Za-z0-9_.:-]/g, `_`).slice(0, 40)}`;
  return {
    name: `pages.link.reconnect`,
    key: key,
    fields: {
      code: sanitizeTelemetryComponent(key),
      road: `lane`,
      silent: true,
    },
  };
}

var observabilityBrowserAndOperationEventsServerGenerationRetentionRotationValues: string[];

var observabilityBrowserAndOperationEventsCapacityQuotaValues: string[];

var resolveObservabilityBrowserAndOperationEventsUnrowed2: Dynamic;

function resolveObservabilityBrowserAndOperationEventsToLowerCase(
  observabilityBrowserAndOperationEvents?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let normalizedObservabilityBrowserAndOperationEvents: Dynamic =
    observabilityBrowserAndOperationEvents.toLowerCase();
  return normalizedObservabilityBrowserAndOperationEvents.startsWith(`shed:`)
    ? `shed:${resolveObservabilityBrowserAndOperationEventsUnrowed2(observabilityBrowserAndOperationEventsCapacityQuotaValues, normalizedObservabilityBrowserAndOperationEvents.slice(5))}`
    : resolveObservabilityBrowserAndOperationEventsUnrowed2(
        observabilityBrowserAndOperationEventsServerGenerationRetentionRotationValues,
        normalizedObservabilityBrowserAndOperationEvents,
      );
}

var observabilityBrowserAndOperationEventsAskedUnaskedValues: string[];

var observabilityBrowserAndOperationEventsPattern6: RegExp;

function createPagesLinkReconnectEvent2(
  pagesLinkReconnectEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let pagesLinkReconnectEventSlice: Dynamic =
    pagesLinkReconnectEvent.startsWith(`lane:`)
      ? pagesLinkReconnectEvent.slice(5)
      : pagesLinkReconnectEvent;
  let match = observabilityBrowserAndOperationEventsPattern6.exec(
    pagesLinkReconnectEventSlice,
  );
  if (match === null) return null;
  let word =
    match[1] === `opened:resumed`
      ? observabilityBrowserAndOperationEventsAskedUnaskedValues[0]
      : observabilityBrowserAndOperationEventsAskedUnaskedValues[1];
  let component = isPlatformSessionAndSourcesSplit2(match[2])
    ? match[2]
    : undefined;
  return {
    name: `pages.link.reconnect`,
    key: `lane_reopen_resumed`,
    fields: {
      code: `lane_reopen_resumed`,
      road: `lane`,
      silent: true,
      ...(component !== undefined && {
        component: component,
      }),
    },
    wire: {
      word: word,
    },
  };
}

var resolveObservabilityBrowserAndOperationEventsValue5: (observabilityBrowserAndOperationEventsValue5?: Dynamic, ..._extraArguments: unknown[]) => "ge20s" | "lt12s" | "lt20s";

function createPagesLinkLateLiftEvent(
  pagesLinkLateLiftEvent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let key = `${pagesLinkLateLiftEvent === `head` ? `head` : `knock`}:${resolveObservabilityBrowserAndOperationEventsValue5(options)}`;
  return {
    name: `pages.link.late_lift`,
    key: key,
    fields: {
      component: key,
      count: Number.isFinite(options)
        ? Math.max(1, Math.min(65535, Math.round(options / 1e3)))
        : 1,
    },
    wire: {
      rowKey: `link.late_lift`,
    },
  };
}

var observabilityBrowserAndOperationEventsCallerLadderRefocusValues: string[];

function createPagesProfileNamelessEvent(
  pagesProfileNamelessEvent?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !Number.isFinite(pagesProfileNamelessEvent) ||
    pagesProfileNamelessEvent < 1
  )
    return null;
  let plat: Dynamic =
    resolveObservabilityBrowserAndOperationEventsTest(context);
  let dur: Dynamic =
    resolveObservabilityBrowserAndOperationEventsIsFinite(options);
  return {
    name: `pages.profile.nameless`,
    fields: {
      count: Math.min(65535, Math.floor(pagesProfileNamelessEvent)),
      ms: Math.max(0, Math.round(options)),
      ...(plat === undefined
        ? {}
        : {
            plat: plat,
          }),
      ...(dur === undefined
        ? {}
        : {
            dur: dur,
          }),
    },
  };
}

function createPagesProfileRecoveredEvent(
  pagesProfileRecoveredEvent?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !Number.isFinite(pagesProfileRecoveredEvent) ||
    pagesProfileRecoveredEvent < 1
  )
    return null;
  let key =
    observabilityBrowserAndOperationEventsCallerLadderRefocusValues.find(
      (
        observabilityBrowserAndOperationEventsCallerLadderRefocusValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        observabilityBrowserAndOperationEventsCallerLadderRefocusValue ===
        context,
    );
  if (key === undefined) return null;
  let plat: Dynamic =
    resolveObservabilityBrowserAndOperationEventsTest(dependencies);
  let dur: Dynamic =
    resolveObservabilityBrowserAndOperationEventsIsFinite(options);
  return {
    name: `pages.profile.recovered`,
    key: key,
    fields: {
      count: Math.min(65535, Math.floor(pagesProfileRecoveredEvent)),
      ms: Math.max(0, Math.round(options)),
      trigger: key,
      ...(plat === undefined
        ? {}
        : {
            plat: plat,
          }),
      ...(dur === undefined
        ? {}
        : {
            dur: dur,
          }),
    },
  };
}

var observabilityBrowserAndOperationEventsNamedNobodyValues: string[];

function createPagesFenceViewerEvent(
  pagesFenceViewerEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let pagesFenceViewerEventSlice: Dynamic = pagesFenceViewerEvent.startsWith(
    `lane:`,
  )
    ? pagesFenceViewerEvent.slice(5)
    : pagesFenceViewerEvent;
  let key = observabilityBrowserAndOperationEventsNamedNobodyValues.find(
    (
      observabilityBrowserAndOperationEventsNamedNobodyValue?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      pagesFenceViewerEventSlice ===
      `fence:viewer:${observabilityBrowserAndOperationEventsNamedNobodyValue}`,
  );
  return key === undefined
    ? null
    : {
        name: `pages.fence.viewer`,
        key: key,
        fields: {
          component: key,
        },
      };
}

function createPagesOutboxDroppedEvent(
  road?: Dynamic,
  options?: Dynamic,
  word?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let word2: Dynamic = sanitizeTelemetryComponent(options.toLowerCase());
  return {
    name: `pages.outbox.dropped`,
    key: `${road}:${word2}`,
    fields: {
      component: `${road}:${word2}`,
      road: road,
      word: word2,
    },
    ...(isPlatformSessionAndSourcesSplit(word) && {
      wire: {
        word: word,
      },
    }),
  };
}

var observabilityBrowserAndOperationEventsPattern7: RegExp;

function resolveObservabilityBrowserAndOperationEventsLane(
  observabilityBrowserAndOperationEventsLane?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityBrowserAndOperationEventsLaneSlice: Dynamic =
    observabilityBrowserAndOperationEventsLane.startsWith(`lane:`)
      ? observabilityBrowserAndOperationEventsLane.slice(5)
      : observabilityBrowserAndOperationEventsLane;
  if (
    !observabilityBrowserAndOperationEventsLaneSlice.startsWith(
      `outbox:retired-unacked:`,
    )
  )
    return null;
  let observabilityBrowserAndOperationEventsLaneSliceSlice: Dynamic =
    observabilityBrowserAndOperationEventsLaneSlice.slice(23);
  let match = observabilityBrowserAndOperationEventsPattern7.exec(
    observabilityBrowserAndOperationEventsLaneSliceSlice,
  );
  return match !== null && isPlatformSessionAndSourcesSplit(match[2])
    ? createPagesOutboxDroppedEvent(`lane`, match[1], match[2])
    : createPagesOutboxDroppedEvent(
        `lane`,
        observabilityBrowserAndOperationEventsLaneSliceSlice,
      );
}

var observabilityBrowserAndOperationEventsPaddedAckReviveShortBurstUnpersistedShapeQueuedValues: string[];

var resolveObservabilityBrowserAndOperationEventsValue6: (observabilityBrowserAndOperationEventsValue6?: Dynamic, ..._extraArguments: unknown[]) => "n1" | "n2_5" | "n6p";

function createPagesLinkOddEvent(
  pagesLinkOddEvent?: Dynamic,
  options?: Dynamic,
  context?: unknown,
  ..._extraArguments: unknown[]
) {
  let key =
    observabilityBrowserAndOperationEventsPaddedAckReviveShortBurstUnpersistedShapeQueuedValues.find(
      (
        observabilityBrowserAndOperationEventsPaddedAckReviveShortBurstUnpersistedShapeQueuedValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        observabilityBrowserAndOperationEventsPaddedAckReviveShortBurstUnpersistedShapeQueuedValue ===
        pagesLinkOddEvent,
    );
  if (key === undefined) return null;
  let max =
    typeof context == `number` && Number.isFinite(context)
      ? Math.max(1, Math.min(65535, Math.round(context)))
      : undefined;
  return {
    name: `pages.link.odd`,
    key: key,
    fields: {
      kind: key,
      component: `${key}${max === undefined ? `` : `:${resolveObservabilityBrowserAndOperationEventsValue6(max)}`}${options === true ? `:re` : ``}`,
      count: max ?? 1,
    },
    wire: {
      rowKey: `link.odd`,
    },
  };
}

var observabilityBrowserAndOperationEventsAllowDenyValues: string[];

function createPagesLaneResultLostEvent(
  pagesLaneResultLostEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let key = observabilityBrowserAndOperationEventsAllowDenyValues.find(
    (
      observabilityBrowserAndOperationEventsAllowDenyValue?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      pagesLaneResultLostEvent ===
      `lane:send:result-lost:${observabilityBrowserAndOperationEventsAllowDenyValue}`,
  );
  return key === undefined
    ? null
    : {
        name: `pages.lane.result_lost`,
        key: key,
        fields: {
          component: key,
        },
      };
}

var observabilityBrowserAndOperationEventsIdentifierPattern: RegExp;

function createPagesLaneParkedEvent(
  pagesLaneParkedEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let match =
    observabilityBrowserAndOperationEventsIdentifierPattern.exec(
      pagesLaneParkedEvent,
    );
  if (match === null) return null;
  let platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValue =
    platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValues.find(
      (
        platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValue2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValue2 ===
        match[1],
    );
  let number2 = Number(match[2]);
  let number3 = Number(match[3]);
  if (
    platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValue ===
      undefined ||
    !Number.isInteger(number2) ||
    !Number.isInteger(number3)
  )
    return null;
  let label = match[4] === `1` ? `w` : match[4] === `c` ? `c` : `n`;
  let matchesMatchItem = match[5] === `1`;
  return {
    name: `pages.lane.parked`,
    key: `${platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValue}:${label === `n` ? `n` : `w`}`,
    fields: {
      component: `${platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValue}:${resolvePlatformSessionAndSourcesValue21(number3)}:${resolvePlatformSessionAndSourcesValue20(label, matchesMatchItem)}`,
      count: Math.max(1, Math.min(65535, number2)),
    },
  };
}

function createPagesOpportRaceEvent(
  key?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let host: Dynamic = sanitizeTelemetryComponent(options.host ?? `unk`);
  let cls: Dynamic = sanitizeTelemetryComponent(options.cls ?? `none`);
  return {
    name: `pages.opport.race`,
    key: key,
    fields: {
      kind: key,
      host: host,
      cls: cls,
      component: `${key}:${host}:${cls}`,
      ...(options.ms !== undefined &&
      Number.isFinite(options.ms) &&
      options.ms >= 0
        ? {
            ms: Math.round(options.ms),
          }
        : {}),
    },
  };
}

var resolveObservabilityBrowserAndOperationEventsValue7: Dynamic;

function createPagesOpportArmedEvent(
  pagesOpportArmedEvent: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let host: Dynamic = sanitizeTelemetryComponent(
    pagesOpportArmedEvent.host ?? `unk`,
  );
  let cls: Dynamic = sanitizeTelemetryComponent(
    pagesOpportArmedEvent.cls ?? `none`,
  );
  return {
    name: `pages.opport.armed`,
    key: `armed`,
    fields: {
      kind: `armed`,
      host: host,
      cls: cls,
      component: `armed:${host}:${cls}`,
      count: 8,
    },
  };
}

function isObservabilityBrowserAndOperationEventsArmed(
  observabilityBrowserAndOperationEventsArmed?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  return (
    observabilityBrowserAndOperationEventsArmed2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (observabilityBrowserAndOperationEventsArmed2 !== `armed`) return true;
    if (enabled) return false;
    enabled = true;
    try {
      return resolveObservabilityBrowserAndOperationEventsValue7(
        observabilityBrowserAndOperationEventsArmed(),
      );
    } catch {
      return false;
    }
  };
}

var resolveObservabilityBrowserAndOperationEventsRound: Dynamic;

var resolveObservabilityBrowserAndOperationEventsLocal: Dynamic;

function createPagesWriteIntegrityEvent(
  why?: Dynamic,
  state?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.write.integrity`,
    key: `${why}:${state}`,
    fields: {
      why: why,
      state: state,
      component: `${why}:${state}`,
      ...resolveObservabilityBrowserAndOperationEventsLocal(context),
      count: Math.max(
        1,
        resolveObservabilityBrowserAndOperationEventsRound(
          context.local - context.acked,
        ),
      ),
    },
  };
}

var observabilityBrowserAndOperationEventsSilentWarnedValues: string[];

var observabilityBrowserAndOperationEventsSilentWarnedSilentNoscWarnedNoscValues: string[];

var resolveObservabilityBrowserAndOperationEventsIncludes: Dynamic;

function createPagesWriteIntegrityEndEvent(
  end?: Dynamic,
  state?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  let component = `end:${end}:${state}`;
  return {
    name: `pages.write.integrity_end`,
    key: `${component}#${Math.max(0, Math.floor(argument))}`,
    fields: {
      end: end,
      state: state,
      component: component,
      ...resolveObservabilityBrowserAndOperationEventsLocal(context),
      count: Math.max(
        1,
        resolveObservabilityBrowserAndOperationEventsRound(
          Number.isFinite(dependencies) ? dependencies : 0,
        ),
      ),
    },
  };
}

function createPagesWriteIntegrityGapEvent(
  key?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityBrowserAndOperationEventsLocal: Dynamic =
    resolveObservabilityBrowserAndOperationEventsLocal(options);
  let told: Dynamic =
    context !== undefined &&
    observabilityBrowserAndOperationEventsSilentWarnedValues.includes(context)
      ? context
      : undefined;
  return {
    name: `pages.write.integrity_gap`,
    key: key,
    fields: {
      state: key,
      component: `${key}:${observabilityBrowserAndOperationEventsLocal.hold}`,
      ...observabilityBrowserAndOperationEventsLocal,
      count: Math.max(
        1,
        resolveObservabilityBrowserAndOperationEventsRound(options.dirtyS),
      ),
      ...(told !== undefined && {
        told: told,
      }),
    },
    ...(told !== undefined && {
      wire: {
        word: resolveObservabilityBrowserAndOperationEventsIncludes(told),
      },
    }),
  };
}

function resolveObservabilityBrowserAndOperationEventsKey2(
  observabilityBrowserAndOperationEventsKey2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let pagesWriteIntegrityGapEvent: Dynamic = createPagesWriteIntegrityGapEvent(
    observabilityBrowserAndOperationEventsKey2,
    options,
    dependencies,
  );
  return {
    ...pagesWriteIntegrityGapEvent,
    key: `${String(pagesWriteIntegrityGapEvent.fields.component)}@${context}`,
    paced: true,
  };
}

var resolveObservabilityBrowserAndOperationEventsNone: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue8: Dynamic;

function resolveObservabilityBrowserAndOperationEventsFields(
  observabilityBrowserAndOperationEventsFields?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    options.name !== `pages.write.integrity_gap` ||
    observabilityBrowserAndOperationEventsFields === undefined ||
    observabilityBrowserAndOperationEventsFields === `none`
  )
    return options;
  let code =
    typeof observabilityBrowserAndOperationEventsFields == `string` &&
    observabilityTelemetrySet16.has(
      observabilityBrowserAndOperationEventsFields,
    )
      ? observabilityBrowserAndOperationEventsFields
      : `unk`;
  return {
    ...options,
    fields: {
      ...options.fields,
      code: code,
    },
  };
}

var observabilityBrowserAndOperationEventsValue2000: number;

var ObservabilityBrowserAndOperationEventsWork: {
    at: null;
    work: boolean;
};

var resolveObservabilityBrowserAndOperationEventsWork: Dynamic;

function isObservabilityBrowserAndOperationEventsPort(
  observabilityBrowserAndOperationEventsPort?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !observabilityBrowserAndOperationEventsPort.port ||
    (observabilityBrowserAndOperationEventsPort.lastAt !== null &&
      !(options - observabilityBrowserAndOperationEventsPort.lastAt >= 2e3))
    ? `rx`
    : observabilityBrowserAndOperationEventsPort.heard.at ===
        observabilityBrowserAndOperationEventsPort.settled
      ? observabilityBrowserAndOperationEventsPort.heard.work
        ? `rp`
        : `rz`
      : `r0`;
}

var resolveObservabilityBrowserAndOperationEventsVisible: (document2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => "h" | "vf" | "vn" | undefined;

var observabilityBrowserAndOperationEventsSilentR0HSilentR0VfSilentR0VnSilentRzHValues: string[];

var resolveObservabilityBrowserAndOperationEventsIncludes2: Dynamic;

var observabilityBrowserAndOperationEventsTUU0UsValues: string[];

var resolveObservabilityBrowserAndOperationEventsTaken: (observabilityBrowserAndOperationEventsTaken?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveObservabilityBrowserAndOperationEventsIncludes3: (observabilityBrowserAndOperationEventsIncludes3?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolveObservabilityBrowserAndOperationEventsWire(
  observabilityBrowserAndOperationEventsWire?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let word: Dynamic = context.wire?.word;
  if (
    context.name !== `pages.write.integrity_gap` ||
    typeof word != `string` ||
    !observabilityBrowserAndOperationEventsSilentWarnedValues.includes(word)
  )
    return context;
  try {
    let observabilityBrowserAndOperationEventsWire2: Dynamic =
      observabilityBrowserAndOperationEventsWire();
    let options2: Dynamic = options();
    let observabilityBrowserAndOperationEventsIncludes2: Dynamic =
      typeof observabilityBrowserAndOperationEventsWire2 == `string` &&
      typeof options2 == `string`
        ? resolveObservabilityBrowserAndOperationEventsIncludes2(
            `${word}.${observabilityBrowserAndOperationEventsWire2}_${options2}`,
          )
        : undefined;
    return observabilityBrowserAndOperationEventsIncludes2 === undefined
      ? context
      : {
          ...context,
          wire: {
            ...context.wire,
            word: `${observabilityBrowserAndOperationEventsIncludes2}${resolveObservabilityBrowserAndOperationEventsIncludes3(dependencies)}`,
          },
        };
  } catch {
    return context;
  }
}

function resolveObservabilityBrowserAndOperationEventsKey3(
  observabilityBrowserAndOperationEventsKey3?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let pagesWriteIntegrityEvent: Dynamic = createPagesWriteIntegrityEvent(
    observabilityBrowserAndOperationEventsKey3,
    options,
    context,
  );
  let key = `${observabilityBrowserAndOperationEventsKey3}:${options}${dependencies.gap ? `:gap` : ``}${dependencies.late ? `:late` : ``}`;
  return {
    ...pagesWriteIntegrityEvent,
    key: key,
    fields: {
      ...pagesWriteIntegrityEvent.fields,
      component: key,
    },
    paced: true,
  };
}

function createPagesTrayBornEvent(
  pagesTrayBornEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { road: key, component: component }: Dynamic =
    filterObservabilityTelemetryRoad(
      pagesTrayBornEvent.road,
      pagesTrayBornEvent.flags,
      pagesTrayBornEvent.why,
    );
  let chars: Dynamic = Number.isFinite(pagesTrayBornEvent.chars)
    ? resolveObservabilityBrowserAndOperationEventsRound(
        pagesTrayBornEvent.chars,
      )
    : 0;
  return {
    name: `pages.tray.born`,
    key: key,
    fields: {
      component: component,
      chars: chars,
      count: Math.max(1, chars),
    },
    wire: {
      rowKey: `tray.born`,
    },
  };
}

function createPagesTrayRetiredEvent(
  pagesTrayRetiredEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { why: key, component: component }: Dynamic =
    resolveObservabilityTelemetryWhy(
      pagesTrayRetiredEvent.why,
      pagesTrayRetiredEvent.road,
    );
  let observabilityBrowserAndOperationEventsRound: Dynamic = Number.isFinite(
    pagesTrayRetiredEvent.stoodS,
  )
    ? resolveObservabilityBrowserAndOperationEventsRound(
        pagesTrayRetiredEvent.stoodS,
      )
    : 0;
  return {
    name: `pages.tray.retired`,
    key: key,
    fields: {
      component: component,
      count: Math.max(1, observabilityBrowserAndOperationEventsRound),
    },
    wire: {
      rowKey: `tray.retired`,
    },
  };
}

function createPagesReseatLocalAheadEvent(
  pagesReseatLocalAheadEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let key = pagesReseatLocalAheadEvent.trayed ? `trayed` : `inflight`;
  return {
    name: `pages.reseat.local_ahead`,
    key: key,
    fields: {
      state: key,
      component: key,
      blocks: resolveObservabilityBrowserAndOperationEventsRound(
        pagesReseatLocalAheadEvent.blocks,
      ),
      chars: resolveObservabilityBrowserAndOperationEventsRound(
        pagesReseatLocalAheadEvent.chars,
      ),
      unanswered: resolveObservabilityBrowserAndOperationEventsRound(
        pagesReseatLocalAheadEvent.inflight,
      ),
      staleS: resolveObservabilityBrowserAndOperationEventsRound(
        pagesReseatLocalAheadEvent.staleS,
      ),
      count: Math.max(
        1,
        resolveObservabilityBrowserAndOperationEventsRound(
          pagesReseatLocalAheadEvent.trayed
            ? pagesReseatLocalAheadEvent.chars
            : pagesReseatLocalAheadEvent.staleS,
        ),
      ),
    },
  };
}

var observabilityBrowserAndOperationEventsSet: Dynamic;

function createPagesPictureRejectedEvent(
  pagesPictureRejectedEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let state = pagesPictureRejectedEvent.asked ? `asked` : `unasked`;
  let why: Dynamic = observabilityBrowserAndOperationEventsSet.has(
    pagesPictureRejectedEvent.why,
  )
    ? pagesPictureRejectedEvent.why
    : `other`;
  let component = `${state}:${why}`;
  let count = Math.max(
    1,
    Math.min(
      99,
      Math.round(
        Number.isFinite(pagesPictureRejectedEvent.run)
          ? pagesPictureRejectedEvent.run
          : 1,
      ),
    ),
  );
  return {
    name: `pages.picture.rejected`,
    key: `${component}:${count}`,
    fields: {
      state: state,
      why: why,
      component: component,
      count: count,
    },
    wire: {
      rowKey: `picture.rejected`,
    },
  };
}

var observabilityBrowserAndOperationEventsDomClosedIdleHiddenIdleBlurPlainInputValues: string[];

var observabilityBrowserAndOperationEventsNoneReadsRefusedWaitingViewOnlyValues: string[];

var resolveObservabilityBrowserAndOperationEventsValue9: (observabilityBrowserAndOperationEventsValue9?: Dynamic, ..._extraArguments: unknown[]) => "ge10m" | "lt10m" | "lt2m" | "lt30s";

function createPagesComposeReleasedEvent(
  pagesComposeReleasedEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let why: Dynamic =
    observabilityBrowserAndOperationEventsDomClosedIdleHiddenIdleBlurPlainInputValues.includes(
      pagesComposeReleasedEvent.why,
    )
      ? pagesComposeReleasedEvent.why
      : `unrowed`;
  let ro: Dynamic =
    observabilityBrowserAndOperationEventsNoneReadsRefusedWaitingViewOnlyValues.includes(
      pagesComposeReleasedEvent.ro,
    )
      ? pagesComposeReleasedEvent.ro
      : `other`;
  let dur = resolveObservabilityBrowserAndOperationEventsValue9(
    pagesComposeReleasedEvent.seconds,
  );
  return {
    name: `pages.compose.released`,
    key: `${why}:${ro}:${dur}`,
    fields: {
      why: why,
      dur: dur,
      component: `${why}:${ro}:${dur}`,
      count: Math.max(
        1,
        resolveObservabilityBrowserAndOperationEventsRound(
          pagesComposeReleasedEvent.seconds,
        ),
      ),
    },
    wire: {
      rowKey: `compose.released`,
    },
  };
}

function createPagesTypingOrderWasOffEvent(
  pagesTypingOrderWas?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let key = resolveObservabilityBrowserAndOperationEventsFind(
    pagesTypingOrderWas.who,
    pagesTypingOrderWas.n,
  );
  return key === null
    ? null
    : {
        name: `pages.typing.order_was_off`,
        key: key,
        fields: {
          component: key,
          count: Math.max(
            1,
            Math.min(65535, Math.round(pagesTypingOrderWas.n)),
          ),
        },
        wire: {
          rowKey: `typing.order_was_off`,
        },
      };
}

var resolveObservabilityBrowserAndOperationEventsValue10: (observabilityBrowserAndOperationEventsValue10?: Dynamic, ..._extraArguments: unknown[]) => "1" | "2_5" | "6_plus";

function createPagesSyncSerialHoleEvent(
  pagesSyncSerialHoleEvent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let key = `${pagesSyncSerialHoleEvent === `mine` ? `mine` : `foreign`}:${resolveObservabilityBrowserAndOperationEventsValue10(options)}`;
  return {
    name: `pages.sync.serial_hole`,
    key: key,
    fields: {
      component: key,
      road: `host`,
    },
  };
}

var observabilityBrowserAndOperationEventsRowsWordsTrayValues: string[];

var ObservabilityBrowserAndOperationEventsUnasked: string[];

var resolveObservabilityBrowserAndOperationEventsRenamed: Dynamic;

function createPagesCustodyClaimedEvent(
  pagesCustodyClaimedEvent?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let key = `${pagesCustodyClaimedEvent !== null && ObservabilityBrowserAndOperationEventsUnasked.includes(pagesCustodyClaimedEvent) && resolveObservabilityBrowserAndOperationEventsRenamed(pagesCustodyClaimedEvent, options) ? pagesCustodyClaimedEvent : `unknown`}:${observabilityBrowserAndOperationEventsRowsWordsTrayValues.includes(options) ? options : `rows`}`;
  return {
    name: `pages.custody.claimed`,
    key: key,
    fields: {
      component: key,
      count: Math.max(
        0,
        Math.min(999, Math.floor(Number.isFinite(context) ? context : 0)),
      ),
    },
  };
}

function createPagesFaceUndoEvent(
  pagesFaceUndoEvent?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    pagesFaceUndoEvent !== `undo_refused` &&
    pagesFaceUndoEvent !== `undo_blocked`
  )
    return null;
  let matchesPagesFaceUndoEvent =
    pagesFaceUndoEvent === `undo_blocked` || context === `shelved`;
  let why =
    pagesFaceUndoEvent === `undo_blocked`
      ? `said`
      : `${matchesPagesFaceUndoEvent ? `shelved` : `alert`}${options === `redo` ? `_redo` : ``}`;
  let code = matchesPagesFaceUndoEvent ? `undo_blocked` : `undo_refused`;
  return {
    name: `pages.face.undo`,
    key: `${code}:${why}`,
    fields: {
      code: code,
      phase: `shown`,
      why: why,
    },
  };
}

var ObservabilityBrowserAndOperationEventsStandalone: string[];

var observabilityBrowserAndOperationEventsTimeoutDeadNoShellOriginStormValues: string[];

var observabilityBrowserAndOperationEventsDeniedGoneTooLargeUnkValues: string[];

var resolveObservabilityBrowserAndOperationEventsIncludes4: Dynamic;

var resolveObservabilityBrowserAndOperationEventsFields2: Dynamic;

function createPagesFaceUnavailableEvent(
  pagesFaceUnavailableEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.face.unavailable`,
    ...resolveObservabilityBrowserAndOperationEventsFields2(
      pagesFaceUnavailableEvent,
      resolveObservabilityBrowserAndOperationEventsIncludes4(
        pagesFaceUnavailableEvent.why,
        observabilityBrowserAndOperationEventsTimeoutDeadNoShellOriginStormValues,
      ),
    ),
  };
}

function createPagesFaceGoneEvent(
  pagesFaceGoneEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.face.gone`,
    ...resolveObservabilityBrowserAndOperationEventsFields2(
      pagesFaceGoneEvent,
      resolveObservabilityBrowserAndOperationEventsIncludes4(
        pagesFaceGoneEvent.why,
        observabilityBrowserAndOperationEventsDeniedGoneTooLargeUnkValues,
      ),
    ),
  };
}

var observabilityBrowserAndOperationEventsPattern8: RegExp;

function resolveObservabilityBrowserAndOperationEventsTIMEOUT(
  observabilityBrowserAndOperationEventsTIMEOUT?: unknown,
  ..._extraArguments: unknown[]
) {
  let matchItem =
    typeof observabilityBrowserAndOperationEventsTIMEOUT == `string`
      ? observabilityBrowserAndOperationEventsPattern8.exec(
          observabilityBrowserAndOperationEventsTIMEOUT,
        )?.[1]
      : undefined;
  return matchItem === undefined
    ? `unk`
    : matchItem === `TIMEOUT`
      ? `timeout`
      : matchItem === `RESET_STORM`
        ? `storm`
        : matchItem === `DEAD:NO_SHELL_ORIGIN`
          ? `no_shell_origin`
          : matchItem.startsWith(`DEAD:`)
            ? `dead`
            : `unk`;
}

var observabilityBrowserAndOperationEventsPattern9: RegExp;

function isObservabilityBrowserAndOperationEventsOther(
  observabilityBrowserAndOperationEventsOther?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [items, setItems]: Dynamic = [
    observabilityBrowserAndOperationEventsPattern9.exec(
      observabilityBrowserAndOperationEventsOther,
    ),
    observabilityBrowserAndOperationEventsPattern9.exec(options),
  ];
  return !items ||
    !setItems ||
    observabilityBrowserAndOperationEventsOther === options
    ? `other`
    : items[2] === `r` && setItems[2] === `w`
      ? context
        ? `pen_back`
        : `pen_on`
      : items[2] === `w` && setItems[2] === `r`
        ? `pen_off`
        : items[2] === `w`
          ? items[1] === setItems[1]
            ? `other`
            : `tier`
          : items[3] === setItems[3]
            ? `tier`
            : `grant`;
}

function createPagesEditorRemountEvent(
  pagesEditorRemountEvent?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let key = isObservabilityBrowserAndOperationEventsOther(
    pagesEditorRemountEvent,
    options,
    context,
  );
  return {
    name: `pages.editor.remount`,
    key: key,
    fields: {
      why: key,
    },
  };
}

function createPagesEditorLockedEvent(
  pagesEditorLockedEvent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return pagesEditorLockedEvent === `reseat_failed`
    ? {
        name: `pages.editor.locked`,
        fields: {
          why: `no_reseat`,
          component:
            resolveObservabilityBrowserAndOperationEventsSplit2(options),
        },
      }
    : null;
}

function createPagesEditorRemountEvent2(..._extraArguments: unknown[]) {
  return {
    name: `pages.editor.remount`,
    key: `orphan`,
    fields: {
      why: `orphan`,
    },
  };
}

var observabilityBrowserAndOperationEventsSet2: Dynamic;

function createPagesEditorRemountEvent3(
  pagesEditorRemountEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return observabilityBrowserAndOperationEventsSet2.has(pagesEditorRemountEvent)
    ? {
        name: `pages.editor.remount`,
        key: `orphan_keys`,
        fields: {
          why: `orphan_keys`,
          component: `keys:${pagesEditorRemountEvent}`,
        },
      }
    : null;
}

function createPagesEditorRemountEvent4(
  pagesEditorRemountEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label =
    pagesEditorRemountEvent.report === null
      ? `nx`
      : pagesEditorRemountEvent.report.other >= 1
        ? pagesEditorRemountEvent.report.other < 2
          ? `n1`
          : pagesEditorRemountEvent.report.other <= 5
            ? `n2_5`
            : `n6p`
        : `n0`;
  let label2 =
    pagesEditorRemountEvent.report === null
      ? `unsaid`
      : pagesEditorRemountEvent.report.complete === true
        ? `full`
        : `part`;
  return {
    name: `pages.editor.remount`,
    key: `orphan_close`,
    fields: {
      why: `orphan_close`,
      component: `close:${pagesEditorRemountEvent.unsent ? `unsent` : `drained`}:${label}:${label2}:${pagesEditorRemountEvent.moved < pagesEditorRemountEvent.found ? `short` : `all`}`,
    },
  };
}

function resolveObservabilityBrowserAndOperationEventsComplete(
  observabilityBrowserAndOperationEventsComplete?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityBrowserAndOperationEventsComplete2: Dynamic =
    observabilityBrowserAndOperationEventsComplete;
  return typeof observabilityBrowserAndOperationEventsComplete2 == `object` &&
    observabilityBrowserAndOperationEventsComplete2 &&
    typeof observabilityBrowserAndOperationEventsComplete2.complete ==
      `boolean` &&
    typeof observabilityBrowserAndOperationEventsComplete2.other == `number` &&
    Number.isInteger(observabilityBrowserAndOperationEventsComplete2.other) &&
    observabilityBrowserAndOperationEventsComplete2.other >= 0
    ? {
        complete: observabilityBrowserAndOperationEventsComplete2.complete,
        other: observabilityBrowserAndOperationEventsComplete2.other,
      }
    : null;
}

var observabilityBrowserAndOperationEventsSet3: Dynamic;

var observabilityBrowserAndOperationEventsSet4: Dynamic;

var observabilityBrowserAndOperationEventsPattern10: RegExp;

var observabilityBrowserAndOperationEventsSet5: Dynamic;

var observabilityBrowserAndOperationEventsSet6: Dynamic;

var observabilityBrowserAndOperationEventsSet7: Dynamic;

function createPagesHotSwapEvent(
  pagesHotSwapEvent?: Dynamic,
  boot?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !observabilityBrowserAndOperationEventsSet3.has(pagesHotSwapEvent) &&
    !observabilityBrowserAndOperationEventsSet5.has(pagesHotSwapEvent) &&
    !observabilityBrowserAndOperationEventsSet6.has(pagesHotSwapEvent)
  )
    return null;
  let key = `hot:${pagesHotSwapEvent}`;
  let hold: Dynamic =
    dependencies !== undefined &&
    observabilityBrowserAndOperationEventsSet7.has(dependencies) &&
    (pagesHotSwapEvent === `swapped` ||
      pagesHotSwapEvent.startsWith(`self_restart:`))
      ? dependencies
      : undefined;
  return {
    name: `pages.hot.swap`,
    key: key,
    fields: {
      state: key,
      ...(observabilityBrowserAndOperationEventsPattern10.test(boot)
        ? {
            boot: boot,
          }
        : {}),
      ...(pagesHotSwapEvent === `swapped` && context !== undefined
        ? {
            why: observabilityBrowserAndOperationEventsSet4.has(context)
              ? context
              : `other`,
          }
        : {}),
      ...(hold !== undefined && {
        hold: hold,
      }),
    },
    ...(hold !== undefined && {
      wire: {
        word: hold,
      },
    }),
  };
}

var ObservabilityBrowserAndOperationEventsState3: string[][];

function createPagesSwapTabKeysEvent(
  pagesSwapTabKeysEvent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !ObservabilityBrowserAndOperationEventsState3[0].includes(
    pagesSwapTabKeysEvent,
  ) || !ObservabilityBrowserAndOperationEventsState3[1].includes(options)
    ? null
    : {
        name: `pages.swap.tab_keys`,
        fields: {
          component: `keys:${String(pagesSwapTabKeysEvent)}:${String(options)}`,
        },
      };
}

var observabilityBrowserAndOperationEventsFoundUnsentFoundUnreadValues: string[];

var ObservabilityBrowserAndOperationEventsStoreFound: string;

var observabilityBrowserAndOperationEventsValue60000: number;

function resolveObservabilityBrowserAndOperationEventsTest5(
  observabilityBrowserAndOperationEventsTest5?: Dynamic,
  options?: unknown,
  context?: unknown,
  ..._extraArguments: unknown[]
): string {
  let options2 =
    typeof options == `string` &&
    observabilityBrowserAndOperationEventsPattern10.test(options)
      ? options
      : undefined;
  let context2 =
    options2 !== undefined &&
    typeof context == `string` &&
    observabilityBrowserAndOperationEventsPattern.test(context)
      ? context
      : undefined;
  let label = `found:${observabilityBrowserAndOperationEventsTest5}:${options2}:${context2}`;
  return context2 !== undefined && label.length <= 32
    ? label
    : options2 === undefined
      ? `found:${observabilityBrowserAndOperationEventsTest5}`
      : `found:${observabilityBrowserAndOperationEventsTest5}:${options2}`;
}

function createPagesStoreFoundEvent(
  key?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !observabilityBrowserAndOperationEventsFoundUnsentFoundUnreadValues.includes(
      key,
    ) ||
    !observabilityBrowserAndOperationEventsRowsWordsTrayValues.includes(options)
  )
    return null;
  let count =
    key === `found:unread` || !Number.isFinite(context)
      ? 1
      : Math.max(
          1,
          Math.min(
            observabilityBrowserAndOperationEventsValue60000,
            Math.floor(context),
          ),
        );
  return {
    name: `pages.store.found`,
    key: key,
    fields: {
      component: resolveObservabilityBrowserAndOperationEventsTest5(
        options,
        dependencies,
        argument,
      ),
      count: count,
      why: key,
    },
    wire: {
      word: key,
      rowKey: ObservabilityBrowserAndOperationEventsStoreFound,
    },
  };
}

var observabilityBrowserAndOperationEventsFoundNoneFoundLateFoundFailFoundNoscopeValues: Dynamic;

var ObservabilityBrowserAndOperationEventsFoundNone: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue11: Dynamic;

function createPagesStoreFoundEvent2(
  key?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBrowserAndOperationEventsFoundNoneFoundLateFoundFailFoundNoscopeValues.includes(
    key,
  )
    ? {
        name: `pages.store.found`,
        key: key,
        fields: {
          component: resolveObservabilityBrowserAndOperationEventsTest5(
            ObservabilityBrowserAndOperationEventsFoundNone[key],
            options,
            context,
          ),
          ...(key === `found:none`
            ? {
                count: 8,
              }
            : {}),
          why: key,
        },
        wire: {
          word: key,
          rowKey: ObservabilityBrowserAndOperationEventsStoreFound,
        },
      }
    : null;
}

var observabilityBrowserAndOperationEventsFoundHandedFoundLinesFoundWaitsValues: Dynamic;

var ObservabilityBrowserAndOperationEventsFoundHanded: Dynamic;

function createPagesStoreFoundEvent3(
  key?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBrowserAndOperationEventsFoundHandedFoundLinesFoundWaitsValues.includes(
    key,
  )
    ? {
        name: `pages.store.found`,
        key: key,
        fields: {
          component: resolveObservabilityBrowserAndOperationEventsTest5(
            ObservabilityBrowserAndOperationEventsFoundHanded[key],
            options,
            context,
          ),
          why: key,
        },
        wire: {
          word: key,
          rowKey: ObservabilityBrowserAndOperationEventsStoreFound,
        },
      }
    : null;
}

function createPagesAssetRefusedEvent(
  pagesAssetRefusedEvent?: Dynamic,
  road?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.asset.refused`,
    key: `${road}:${pagesAssetRefusedEvent}`,
    fields: {
      code: sanitizeTelemetryComponent(pagesAssetRefusedEvent),
      road: road,
    },
  };
}

function resolveObservabilityBrowserAndOperationEventsDenyUnrowed(
  observabilityBrowserAndOperationEventsDenyUnrowed?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof observabilityBrowserAndOperationEventsDenyUnrowed == `string` &&
    observabilityBrowserAndOperationEventsPattern5.test(
      observabilityBrowserAndOperationEventsDenyUnrowed,
    )
    ? `deny_${observabilityBrowserAndOperationEventsDenyUnrowed}`
    : `deny_unrowed`;
}

var ObservabilityBrowserAndOperationEventsCard: string;

function createPagesReactionVerdictEvent(
  verb?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let word: Dynamic =
    options.refusal === undefined
      ? options.unreachable
        ? `unreachable`
        : `other`
      : sanitizeTelemetryComponent(options.refusal);
  let items: Dynamic = [
    {
      name: `pages.comment.failed`,
      key: `${verb}:${word}`,
      fields: {
        verb: verb,
        word: word,
        ...(observabilityTelemetrySet18.has(word) && {
          code: word,
        }),
      },
      wire: {
        word: ObservabilityBrowserAndOperationEventsCard,
      },
    },
  ];
  if (verb === `react` || verb === `unreact`) {
    items.push({
      name: `pages.reaction.verdict`,
      key: `deny:${verb}:${word}`,
      fields: {
        verdict: `deny`,
        verb: verb,
        word: word,
      },
    });
  }
  return items;
}

function createPagesCommentConfirmedEvent(
  component?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let outcome = options ? `replayed` : `first`;
  return {
    name: `pages.comment.confirmed`,
    key: `${component}:${outcome}`,
    fields: {
      verb: component === `create` ? `post` : `reply`,
      outcome: outcome,
      component: component,
    },
  };
}

function createPagesCommentWithdrawEvent(
  outcome?: Dynamic,
  road?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.comment.withdraw`,
    key: `${outcome}:${road}`,
    fields: {
      outcome: outcome,
      road: road,
      component: road,
    },
  };
}

function createPagesReactionVerdictEvent2(
  verb?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.reaction.verdict`,
    key: `allow:${verb}`,
    fields: {
      verdict: `allow`,
      verb: verb,
    },
  };
}

var observabilityBrowserAndOperationEventsValue_1: boolean;

function createPagesWidgetRelayDroppedEvent(
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBrowserAndOperationEventsValue_1
    ? null
    : ((observabilityBrowserAndOperationEventsValue_1 = true),
      {
        name: `pages.widget.relay_dropped`,
        fields: {},
      });
}

var resolveObservabilityBrowserAndOperationEventsTest6: Dynamic;

var ObservabilityBrowserAndOperationEventsState4: (string | number)[][];

function resolveObservabilityBrowserAndOperationEventsIsFinite(
  observabilityBrowserAndOperationEventsIsFinite?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      typeof observabilityBrowserAndOperationEventsIsFinite != `number` ||
      !Number.isFinite(observabilityBrowserAndOperationEventsIsFinite) ||
      observabilityBrowserAndOperationEventsIsFinite < 0
    )
  ) {
    for (let [
      resolveObservabilityBrowserAndOperationEventsIsFiniteResult,
      resolveObservabilityBrowserAndOperationEventsIsFiniteResult2,
    ] of ObservabilityBrowserAndOperationEventsState4 as Dynamic)
      if (
        observabilityBrowserAndOperationEventsIsFinite <
        resolveObservabilityBrowserAndOperationEventsIsFiniteResult2
      )
        return resolveObservabilityBrowserAndOperationEventsIsFiniteResult;
  }
}

var ObservabilityBrowserAndOperationEventsWorking: Dynamic;

var resolveObservabilityBrowserAndOperationEventsHasOwn: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue12: Dynamic;

var ObservabilityBrowserAndOperationEventsBare: Dynamic;

function createPagesSummonUnavailableEvent(
  pagesSummonUnavailableEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let component: Dynamic =
    pagesSummonUnavailableEvent.road === undefined
      ? pagesSummonUnavailableEvent.source
      : `${pagesSummonUnavailableEvent.source}:${pagesSummonUnavailableEvent.road}`;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesSummonUnavailableEvent.plat,
  );
  let ms: Dynamic =
    resolveObservabilityBrowserAndOperationEventsIsFinite(
      pagesSummonUnavailableEvent.durMs,
    ) === undefined
      ? pagesSummonUnavailableEvent.ms
      : pagesSummonUnavailableEvent.durMs;
  let observabilityBrowserAndOperationEventsIsFinite: Dynamic =
    resolveObservabilityBrowserAndOperationEventsIsFinite(ms);
  let dur: Dynamic =
    observabilityBrowserAndOperationEventsIsFinite !== undefined &&
    pagesSummonUnavailableEvent.hold !== undefined &&
    Object.hasOwn(
      ObservabilityBrowserAndOperationEventsBare,
      pagesSummonUnavailableEvent.hold,
    )
      ? `${ObservabilityBrowserAndOperationEventsBare[pagesSummonUnavailableEvent.hold]}-${observabilityBrowserAndOperationEventsIsFinite}`
      : observabilityBrowserAndOperationEventsIsFinite;
  return {
    name: `pages.summon.unavailable`,
    key: `${component}:${sanitizeTelemetryComponent(pagesSummonUnavailableEvent.reason)}`,
    fields: {
      reason: sanitizeTelemetryComponent(pagesSummonUnavailableEvent.reason),
      component: component,
      ...(pagesSummonUnavailableEvent.road !== undefined && {
        road: pagesSummonUnavailableEvent.road,
      }),
      ...(pagesSummonUnavailableEvent.host !== undefined && {
        host: sanitizeTelemetryComponent(pagesSummonUnavailableEvent.host),
      }),
      ...(pagesSummonUnavailableEvent.ms !== undefined &&
        Number.isFinite(pagesSummonUnavailableEvent.ms) &&
        pagesSummonUnavailableEvent.ms >= 0 && {
          ms: Math.round(pagesSummonUnavailableEvent.ms),
        }),
      ...(dur !== undefined && {
        dur: dur,
      }),
      ...resolveObservabilityBrowserAndOperationEventsValue12(ms),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

function createPagesSummonViewDarkEvent(
  pagesSummonViewDarkEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.summon.view_dark`,
    key: sanitizeTelemetryComponent(pagesSummonViewDarkEvent.reason),
    fields: {
      reason: sanitizeTelemetryComponent(pagesSummonViewDarkEvent.reason),
      ...(pagesSummonViewDarkEvent.host !== undefined && {
        host: sanitizeTelemetryComponent(pagesSummonViewDarkEvent.host),
      }),
    },
  };
}

function createPagesSummonSentEvent(
  pagesSummonSentEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesSummonSentEvent.plat,
  );
  let component =
    pagesSummonSentEvent.origin === undefined
      ? undefined
      : `${pagesSummonSentEvent.origin}:${pagesSummonSentEvent.road}`;
  return {
    name: `pages.summon.sent`,
    key: component ?? pagesSummonSentEvent.road,
    fields: {
      road: pagesSummonSentEvent.road,
      ...(component !== undefined && {
        component: component,
      }),
      ...(pagesSummonSentEvent.host !== undefined && {
        host: sanitizeTelemetryComponent(pagesSummonSentEvent.host),
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var resolveObservabilityBrowserAndOperationEventsCount: Dynamic;

function createPagesSummonHandoffEvent(
  pagesSummonHandoffEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dur: Dynamic = resolveObservabilityBrowserAndOperationEventsIsFinite(
    pagesSummonHandoffEvent.ms,
  );
  if (dur === undefined) return null;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesSummonHandoffEvent.plat,
  );
  let key: Dynamic =
    pagesSummonHandoffEvent.origin === undefined
      ? pagesSummonHandoffEvent.road
      : `${pagesSummonHandoffEvent.origin}:${pagesSummonHandoffEvent.road}`;
  return {
    name: `pages.summon.handoff`,
    key: key,
    fields: {
      component: key,
      ...(pagesSummonHandoffEvent.host !== undefined && {
        host: sanitizeTelemetryComponent(pagesSummonHandoffEvent.host),
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
      ms: Math.round(pagesSummonHandoffEvent.ms),
      ...resolveObservabilityBrowserAndOperationEventsCount(
        pagesSummonHandoffEvent.ms,
      ),
      dur: dur,
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

function resolveObservabilityBrowserAndOperationEventsFields3(
  name?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dur: Dynamic = resolveObservabilityBrowserAndOperationEventsIsFinite(
    options.ms,
  );
  if (dur === undefined) return null;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    options.plat,
  );
  return {
    name: name,
    fields: {
      ...(options.host !== undefined && {
        host: sanitizeTelemetryComponent(options.host),
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
      ms: Math.round(options.ms),
      ...resolveObservabilityBrowserAndOperationEventsCount(options.ms),
      dur: dur,
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

function resolveObservabilityBrowserAndOperationEventsValue13(
  observabilityBrowserAndOperationEventsValue13?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveObservabilityBrowserAndOperationEventsFields3(
    `pages.live.applied`,
    observabilityBrowserAndOperationEventsValue13,
  );
}

function resolveObservabilityBrowserAndOperationEventsValue14(
  observabilityBrowserAndOperationEventsValue14?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveObservabilityBrowserAndOperationEventsFields3(
    `pages.live.first_applied`,
    observabilityBrowserAndOperationEventsValue14,
  );
}

function resolveObservabilityBrowserAndOperationEventsTest7(
  observabilityBrowserAndOperationEventsTest7?: Dynamic,
  options?: Dynamic,
  context: Dynamic = 1,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [...observabilityBrowserAndOperationEventsTest7];
  if (
    options === undefined ||
    !observabilityTelemetryPattern29.test(options) ||
    observabilityTelemetrySet22.has(options)
  )
    return items.join(`:`);
  for (
    ;
    items.length > Math.max(1, context) &&
    !observabilityTelemetryPattern29.test(`${items.join(`:`)}:${options}`);

  )
    items.pop();
  return items.join(`:`);
}

var observabilityBrowserAndOperationEventsSet8: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue15: Dynamic;

var observabilityBrowserAndOperationEventsSet9: Dynamic;

function createPagesSummonStateEvent(
  pagesSummonStateEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let state: Dynamic = resolveObservabilityBrowserAndOperationEventsValue15(
    pagesSummonStateEvent.state,
  )
    ? pagesSummonStateEvent.state
    : `unrowed`;
  let component: Dynamic = resolveObservabilityBrowserAndOperationEventsTest7(
    [`state`, state],
    pagesSummonStateEvent.host,
    2,
  );
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesSummonStateEvent.plat,
  );
  let observabilityBrowserAndOperationEventsIsFinite: Dynamic =
    resolveObservabilityBrowserAndOperationEventsIsFinite(
      pagesSummonStateEvent.dwellMs,
    );
  let dur =
    observabilityBrowserAndOperationEventsIsFinite === undefined
      ? undefined
      : `${resolveObservabilityBrowserAndOperationEventsHasOwn(pagesSummonStateEvent.from)}-${observabilityBrowserAndOperationEventsIsFinite}`;
  let reason: Dynamic =
    state === `failed` &&
    typeof pagesSummonStateEvent.reason == `string` &&
    observabilityBrowserAndOperationEventsSet9.has(pagesSummonStateEvent.reason)
      ? pagesSummonStateEvent.reason
      : undefined;
  let word: Dynamic = state === `failed` ? reason : plat;
  return {
    name: `pages.summon.state`,
    key: reason === undefined ? component : `${component}:${reason}`,
    fields: {
      state: state,
      component: component,
      ...(reason !== undefined && {
        reason: reason,
      }),
      ...(pagesSummonStateEvent.host !== undefined && {
        host: sanitizeTelemetryComponent(pagesSummonStateEvent.host),
      }),
      ...(pagesSummonStateEvent.ms !== undefined &&
        Number.isFinite(pagesSummonStateEvent.ms) &&
        pagesSummonStateEvent.ms >= 0 && {
          ms: Math.round(pagesSummonStateEvent.ms),
        }),
      ...(dur !== undefined && {
        dur: dur,
      }),
      ...resolveObservabilityBrowserAndOperationEventsValue12(
        observabilityBrowserAndOperationEventsIsFinite === undefined
          ? undefined
          : pagesSummonStateEvent.dwellMs,
      ),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(word !== undefined && {
      wire: {
        word: word,
      },
    }),
  };
}

function createPagesSummonSilentEvent(
  pagesSummonSilentEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let key: Dynamic = resolveObservabilityBrowserAndOperationEventsTest7(
    [`silent`, pagesSummonSilentEvent.origin ?? pagesSummonSilentEvent.road],
    pagesSummonSilentEvent.host,
  );
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesSummonSilentEvent.plat,
  );
  return {
    name: `pages.summon.silent`,
    key: key,
    fields: {
      component: key,
      road: pagesSummonSilentEvent.road,
      ...(pagesSummonSilentEvent.host !== undefined && {
        host: sanitizeTelemetryComponent(pagesSummonSilentEvent.host),
      }),
      ...(pagesSummonSilentEvent.ms !== undefined &&
        Number.isFinite(pagesSummonSilentEvent.ms) &&
        pagesSummonSilentEvent.ms >= 0 && {
          ms: Math.round(pagesSummonSilentEvent.ms),
        }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var observabilityBrowserAndOperationEventsSet10: Dynamic;

var observabilityBrowserAndOperationEventsSet11: Dynamic;

var resolveObservabilityBrowserAndOperationEventsWhy: Dynamic;

function createPagesSummonAnnouncedEvent(
  pagesSummonAnnouncedEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { why: why, host: host }: Dynamic =
    resolveObservabilityBrowserAndOperationEventsWhy(pagesSummonAnnouncedEvent);
  let key = `announced:${why}`;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesSummonAnnouncedEvent.plat,
  );
  return {
    name: `pages.summon.announced`,
    key: key,
    fields: {
      why: why,
      component: key,
      host: host,
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

function createPagesFlagPetrelEvent(
  pagesFlagPetrelEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let key = `flag:petrel`;
  let host: Dynamic =
    typeof pagesFlagPetrelEvent.host == `string` &&
    observabilityBrowserAndOperationEventsSet10.has(pagesFlagPetrelEvent.host)
      ? pagesFlagPetrelEvent.host
      : `unk`;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesFlagPetrelEvent.plat,
  );
  return {
    name: `pages.flag.petrel`,
    key: key,
    fields: {
      component: key,
      host: host,
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var ObservabilityBrowserAndOperationEventsClaude: Dynamic;

function createPagesSummonHeardEvent(
  pagesSummonHeardEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { why: why, host: host }: Dynamic =
    resolveObservabilityBrowserAndOperationEventsWhy(pagesSummonHeardEvent);
  let key: string = `heard:${why}`;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesSummonHeardEvent.plat,
  );
  let observabilityBrowserAndOperationEventsIsFinite: Dynamic =
    resolveObservabilityBrowserAndOperationEventsIsFinite(
      pagesSummonHeardEvent.ms,
    );
  let dur: Dynamic =
    observabilityBrowserAndOperationEventsIsFinite !== undefined &&
    pagesSummonHeardEvent.by !== undefined &&
    Object.hasOwn(
      ObservabilityBrowserAndOperationEventsClaude,
      pagesSummonHeardEvent.by,
    )
      ? `${ObservabilityBrowserAndOperationEventsClaude[pagesSummonHeardEvent.by]}-${observabilityBrowserAndOperationEventsIsFinite}`
      : observabilityBrowserAndOperationEventsIsFinite;
  return {
    name: `pages.summon.heard`,
    key: key,
    fields: {
      why: why,
      component: key,
      host: host,
      ...(dur !== undefined && {
        ms: Math.round(pagesSummonHeardEvent.ms),
        dur: dur,
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

function createPagesSummonShellBuildEvent(
  pagesSummonShellBuildEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let word: Dynamic =
    typeof pagesSummonShellBuildEvent.shell == `string`
      ? pagesSummonShellBuildEvent.shell.toLowerCase()
      : undefined;
  if (
    word === undefined ||
    !observabilityTelemetryPattern27.test(word) ||
    observabilityTelemetrySet22.has(word)
  )
    return null;
  let { why: why, host: host }: Dynamic =
    resolveObservabilityBrowserAndOperationEventsWhy(
      pagesSummonShellBuildEvent,
    );
  let key = `shell_build:${why}`;
  return {
    name: `pages.summon.shell_build`,
    key: key,
    fields: {
      why: why,
      component: key,
      host: host,
    },
    wire: {
      word: word,
    },
  };
}

var observabilityBrowserAndOperationEventsSet12: Dynamic;

var observabilityBrowserAndOperationEventsSet13: Dynamic;

var observabilityBrowserAndOperationEventsSet14: Dynamic;

var observabilityBrowserAndOperationEventsSet15: Dynamic;

var observabilityBrowserAndOperationEventsSet16: Dynamic;

var observabilityBrowserAndOperationEventsSet17: Dynamic;

var observabilityBrowserAndOperationEventsSet18: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeObservabilityBrowserAndOperationEvents1Step1(): void {
  (observabilityBrowserAndOperationEventsToldRereadWholeSeatedValues = [
    `told`,
    `reread`,
    `whole`,
    `seated`,
    `released`,
  ]);
  (resolveObservabilityBrowserAndOperationEventsValue = (
    observabilityBrowserAndOperationEventsValue?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsValue > 1
      ? observabilityBrowserAndOperationEventsValue <= 5
        ? `n2_5`
        : `n6p`
      : `n1`);
  (resolveObservabilityBrowserAndOperationEventsFind = (
    observabilityBrowserAndOperationEventsFind?: Dynamic,
    options?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    let observabilityBrowserAndOperationEventsToldRereadWholeSeatedValue =
      observabilityBrowserAndOperationEventsToldRereadWholeSeatedValues.find(
        (
          observabilityBrowserAndOperationEventsToldRereadWholeSeatedValue2?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          observabilityBrowserAndOperationEventsToldRereadWholeSeatedValue2 ===
          observabilityBrowserAndOperationEventsFind,
      );
    return observabilityBrowserAndOperationEventsToldRereadWholeSeatedValue ===
      undefined ||
      typeof options != `number` ||
      !Number.isFinite(options) ||
      !(options >= 1)
      ? null
      : `${observabilityBrowserAndOperationEventsToldRereadWholeSeatedValue}:${resolveObservabilityBrowserAndOperationEventsValue(options)}`;
  });
  (observabilityBrowserAndOperationEventsPattern = /^(?:mac|win|lin|cro|ios|and|ot)-(?:cr|ed|sf|ff|app|ot)$/);
  (ObservabilityBrowserAndOperationEventsOtOt = `ot-ot`);
  (resolveObservabilityBrowserAndOperationEventsTest = (
    observabilityBrowserAndOperationEventsTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsTest == `string` &&
    observabilityBrowserAndOperationEventsPattern.test(
      observabilityBrowserAndOperationEventsTest,
    )
      ? observabilityBrowserAndOperationEventsTest
      : undefined);
  (observabilityBrowserAndOperationEventsPattern2 = /\bClaude(?:Nest|Gov)?\/\d/);
  (observabilityBrowserAndOperationEventsPattern3 = /\bElectron\/\d/);
  (observabilityBrowserAndOperationEventsPattern4 = /^(?:cr|ed|sf|ff)-(?:\d{1,2}x|lo|hi)$/);
  (ObservabilityBrowserAndOperationEventsState = {
    cr: [100, 199],
    ed: [100, 199],
    ff: [100, 199],
    sf: [10, 39],
  });
  (resolveObservabilityBrowserAndOperationEventsBrand = (
    observabilityBrowserAndOperationEventsBrand?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!Array.isArray(observabilityBrowserAndOperationEventsBrand)) return;
    let items =
      options === `ed`
        ? [`microsoft edge`]
        : [`google chrome`, `chromium`, `android webview`];
    for (let resolveObservabilityBrowserAndOperationEventsBrandResult of observabilityBrowserAndOperationEventsBrand as Dynamic) {
      if (
        typeof resolveObservabilityBrowserAndOperationEventsBrandResult !=
          `object` ||
        !resolveObservabilityBrowserAndOperationEventsBrandResult
      )
        continue;
      let {
        brand: resolveObservabilityBrowserAndOperationEventsBrandResult2,
        version: resolveObservabilityBrowserAndOperationEventsBrandResult3,
      }: Dynamic = resolveObservabilityBrowserAndOperationEventsBrandResult;
      if (
        typeof resolveObservabilityBrowserAndOperationEventsBrandResult2 ==
          `string` &&
        items.includes(
          resolveObservabilityBrowserAndOperationEventsBrandResult2.toLowerCase(),
        ) &&
        typeof resolveObservabilityBrowserAndOperationEventsBrandResult3 ==
          `string` &&
        /^\d{1,4}(?:\.|$)/.test(
          resolveObservabilityBrowserAndOperationEventsBrandResult3,
        )
      )
        return Number.parseInt(
          resolveObservabilityBrowserAndOperationEventsBrandResult3,
          10,
        );
    }
  });
  (resolveObservabilityBrowserAndOperationEventsParseInt = (
    observabilityBrowserAndOperationEventsParseInt?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let match = (
      options === `ed`
        ? /\bEdg(?:e|A|iOS)?\/(\d{1,4})/
        : options === `ff`
          ? /\b(?:Firefox|FxiOS)\/(\d{1,4})/
          : options === `cr`
            ? /\b(?:Chrome|CriOS|Chromium)\/(\d{1,4})/
            : options === `sf`
              ? /\bVersion\/(\d{1,4})/
              : null
    )?.exec(observabilityBrowserAndOperationEventsParseInt);
    return match ? Number.parseInt(match[1], 10) : undefined;
  });
  (ObservabilityBrowserAndOperationEventsState2 = null);
  (observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValues = [
    `dup_id`,
    `no_bid`,
    `block`,
    `unk`,
  ]);
  (observabilityBrowserAndOperationEventsUnreadUnplacedAgainNoPrintValues = [
    `unread`,
    `unplaced`,
    `again`,
    `no_print`,
    `tried`,
    `no_try`,
    `rejected`,
  ]);
  (resolveObservabilityBrowserAndOperationEventsValue4 = (
    observabilityBrowserAndOperationEventsValue4?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${observabilityBrowserAndOperationEventsValue4}:${options}${context ? `:tbl` : ``}`);
  (resolveObservabilityBrowserAndOperationEventsFlatMap = (
    observabilityBrowserAndOperationEventsFlatMap?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValues.flatMap(
      (
        observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValue?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        observabilityBrowserAndOperationEventsFlatMap.flatMap(
          (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) => [
            resolveObservabilityBrowserAndOperationEventsValue4(
              observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValue,
              rolldownNImport2,
              false,
            ),
            resolveObservabilityBrowserAndOperationEventsValue4(
              observabilityBrowserAndOperationEventsDupIdNoBidBlockUnkValue,
              rolldownNImport2,
              true,
            ),
          ],
        ),
    ));
  resolveObservabilityBrowserAndOperationEventsFlatMap(
    observabilityBrowserAndOperationEventsUnreadUnplacedAgainNoPrintValues,
  );
  resolveObservabilityBrowserAndOperationEventsFlatMap([
    ...observabilityBrowserAndOperationEventsUnreadUnplacedAgainNoPrintValues,
    `unk`,
  ]);
  (observabilityBrowserAndOperationEventsValue32 = 32);
  (observabilityBrowserAndOperationEventsPattern5 = /^[A-Za-z0-9_.:-]{1,48}$/);
  (sanitizeTelemetryComponent = (
    sanitizeTelemetryComponent2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof sanitizeTelemetryComponent2 == `string` &&
    observabilityBrowserAndOperationEventsPattern5.test(
      sanitizeTelemetryComponent2,
    )
      ? sanitizeTelemetryComponent2
      : `unrowed`);
  (observabilityBrowserAndOperationEventsServerGenerationRetentionRotationValues = [
      `server`,
      `generation`,
      `retention`,
      `rotation`,
      `overflow`,
      `protocol`,
      `grant`,
      `rate_limited`,
      `timeout`,
      `unavailable`,
      `stream_limit`,
      `rewired`,
      `unknown`,
    ]);
  (observabilityBrowserAndOperationEventsCapacityQuotaValues = [
    `capacity`,
    `quota`,
  ]);
  (resolveObservabilityBrowserAndOperationEventsUnrowed2 = (
    observabilityBrowserAndOperationEventsUnrowed2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsUnrowed2.includes(options)
      ? options
      : `unrowed`);
  (observabilityBrowserAndOperationEventsAskedUnaskedValues = [
    `asked`,
    `unasked`,
  ]);
  (observabilityBrowserAndOperationEventsPattern6 = /^(opened:resumed(?::shell)?)(?: sil=(\S*))?$/);
  (resolveObservabilityBrowserAndOperationEventsValue5 = (
    observabilityBrowserAndOperationEventsValue5?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsValue5 >= 12e3
      ? observabilityBrowserAndOperationEventsValue5 < 2e4
        ? `lt20s`
        : `ge20s`
      : `lt12s`);
  (observabilityBrowserAndOperationEventsCallerLadderRefocusValues = [
    `caller`,
    `ladder`,
    `refocus`,
  ]);
  (observabilityBrowserAndOperationEventsNamedNobodyValues = [
    `named`,
    `nobody`,
  ]);
  (observabilityBrowserAndOperationEventsPattern7 = /^(\S+) kind=([a-z]{1,8}\.[a-z]{1,8})$/);
  (observabilityBrowserAndOperationEventsPaddedAckReviveShortBurstUnpersistedShapeQueuedValues = [`padded_ack`, `revive_short`, `burst_unpersisted`, `shape_queued`]);
  (resolveObservabilityBrowserAndOperationEventsValue6 = (
    observabilityBrowserAndOperationEventsValue6?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsValue6 >= 2
      ? observabilityBrowserAndOperationEventsValue6 <= 5
        ? `n2_5`
        : `n6p`
      : `n1`);
  (observabilityBrowserAndOperationEventsAllowDenyValues = [`allow`, `deny`]);
  (observabilityBrowserAndOperationEventsIdentifierPattern = /^lane:parked why=([a-z_]{1,24}) s=(\d{1,5}) depth=(\d{1,5}) write=([01c]) hidden=([01])$/);
  (resolveObservabilityBrowserAndOperationEventsValue7 = (
    observabilityBrowserAndOperationEventsValue7?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue7 == `number` &&
    observabilityBrowserAndOperationEventsValue7 >= 0 &&
    observabilityBrowserAndOperationEventsValue7 < 1 / 8);
  (resolveObservabilityBrowserAndOperationEventsRound = (
    observabilityBrowserAndOperationEventsRound?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.max(
      0,
      Math.min(65535, Math.round(observabilityBrowserAndOperationEventsRound)),
    ));
  (resolveObservabilityBrowserAndOperationEventsLocal = (
    observabilityBrowserAndOperationEventsLocal?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    local: resolveObservabilityBrowserAndOperationEventsRound(
      observabilityBrowserAndOperationEventsLocal.local,
    ),
    handed: resolveObservabilityBrowserAndOperationEventsRound(
      observabilityBrowserAndOperationEventsLocal.handed,
    ),
    sent: resolveObservabilityBrowserAndOperationEventsRound(
      observabilityBrowserAndOperationEventsLocal.sent,
    ),
    acked: resolveObservabilityBrowserAndOperationEventsRound(
      observabilityBrowserAndOperationEventsLocal.acked,
    ),
    dirtyS: resolveObservabilityBrowserAndOperationEventsRound(
      observabilityBrowserAndOperationEventsLocal.dirtyS,
    ),
    upS: observabilityBrowserAndOperationEventsLocal.upS,
    hold: sanitizeTelemetryComponent(
      observabilityBrowserAndOperationEventsLocal.hold || `none`,
    ),
    ...(typeof observabilityBrowserAndOperationEventsLocal.downS == `number` &&
    Number.isFinite(observabilityBrowserAndOperationEventsLocal.downS) &&
    observabilityBrowserAndOperationEventsLocal.downS >= 0
      ? {
          downS: resolveObservabilityBrowserAndOperationEventsRound(
            observabilityBrowserAndOperationEventsLocal.downS,
          ),
        }
      : {}),
  }));
  (observabilityBrowserAndOperationEventsSilentWarnedValues = [
    `silent`,
    `warned`,
  ]);
  (observabilityBrowserAndOperationEventsSilentWarnedSilentNoscWarnedNoscValues = [`silent`, `warned`, `silent.nosc`, `warned.nosc`, `nosc`]);
  (resolveObservabilityBrowserAndOperationEventsIncludes = (
    observabilityBrowserAndOperationEventsIncludes?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsIncludes == `string` &&
    observabilityBrowserAndOperationEventsSilentWarnedSilentNoscWarnedNoscValues.includes(
      observabilityBrowserAndOperationEventsIncludes,
    )
      ? observabilityBrowserAndOperationEventsIncludes
      : undefined);
  (resolveObservabilityBrowserAndOperationEventsNone = (
    observabilityBrowserAndOperationEventsNone?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsNone === undefined
      ? `none`
      : typeof observabilityBrowserAndOperationEventsNone == `string` &&
          observabilityTelemetryFlightOutDomClosedPlainBehindValues.includes(
            observabilityBrowserAndOperationEventsNone,
          )
        ? observabilityBrowserAndOperationEventsNone
        : `unk`);
  (resolveObservabilityBrowserAndOperationEventsValue8 = (
    observabilityBrowserAndOperationEventsValue8?: Dynamic,
    options?: Dynamic,
    context: Dynamic = resolveObservabilityBrowserAndOperationEventsNone,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return context(options);
    } catch {
      return observabilityBrowserAndOperationEventsValue8;
    }
  });
  (observabilityBrowserAndOperationEventsValue2000 = 2e3);
  (ObservabilityBrowserAndOperationEventsWork = {
    at: null,
    work: false,
  });
  (resolveObservabilityBrowserAndOperationEventsWork = (
    observabilityBrowserAndOperationEventsWork?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    at: options,
    work:
      typeof observabilityBrowserAndOperationEventsWork == `number` &&
      observabilityBrowserAndOperationEventsWork > 0,
  }));
  (resolveObservabilityBrowserAndOperationEventsVisible = (
    document2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    document2 === undefined
      ? undefined
      : document2.visibilityState === `visible`
        ? options != null && document2.activeElement === options
          ? `vf`
          : `vn`
        : `h`);
  (observabilityBrowserAndOperationEventsSilentR0HSilentR0VfSilentR0VnSilentRzHValues = [
      `silent.r0_h`,
      `silent.r0_vf`,
      `silent.r0_vn`,
      `silent.rz_h`,
      `silent.rz_vf`,
      `silent.rz_vn`,
      `silent.rp_h`,
      `silent.rp_vf`,
      `silent.rp_vn`,
      `silent.rx_h`,
      `silent.rx_vf`,
      `silent.rx_vn`,
      `warned.r0_h`,
      `warned.r0_vf`,
      `warned.r0_vn`,
      `warned.rz_h`,
      `warned.rz_vf`,
      `warned.rz_vn`,
      `warned.rp_h`,
      `warned.rp_vf`,
      `warned.rp_vn`,
      `warned.rx_h`,
      `warned.rx_vf`,
      `warned.rx_vn`,
    ]);
  (resolveObservabilityBrowserAndOperationEventsIncludes2 = (
    observabilityBrowserAndOperationEventsIncludes2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsIncludes2 == `string` &&
    observabilityBrowserAndOperationEventsSilentR0HSilentR0VfSilentR0VnSilentRzHValues.includes(
      observabilityBrowserAndOperationEventsIncludes2,
    )
      ? observabilityBrowserAndOperationEventsIncludes2
      : undefined);
  (observabilityBrowserAndOperationEventsTUU0UsValues = [
    `t`,
    `u`,
    `u0`,
    `us`,
    `q`,
    `b`,
    `tq`,
    `tb`,
    `uq`,
    `ub`,
    `u0q`,
    `u0b`,
    `usq`,
    `usb`,
  ]);
  (resolveObservabilityBrowserAndOperationEventsTaken = (
    observabilityBrowserAndOperationEventsTaken?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${observabilityBrowserAndOperationEventsTaken.oldest === `taken` ? `t` : observabilityBrowserAndOperationEventsTaken.oldest === `untaken` ? (observabilityBrowserAndOperationEventsTaken.served === `none` ? `u0` : observabilityBrowserAndOperationEventsTaken.served === `some` ? `us` : `u`) : ``}${observabilityBrowserAndOperationEventsTaken.reports === `none` ? `q` : observabilityBrowserAndOperationEventsTaken.reports === `some` ? `b` : ``}`);
  (resolveObservabilityBrowserAndOperationEventsIncludes3 = (
    observabilityBrowserAndOperationEventsIncludes3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      let observabilityBrowserAndOperationEventsIncludes32: Dynamic =
        observabilityBrowserAndOperationEventsIncludes3?.();
      return typeof observabilityBrowserAndOperationEventsIncludes32 ==
        `string` &&
        observabilityBrowserAndOperationEventsTUU0UsValues.includes(
          observabilityBrowserAndOperationEventsIncludes32,
        )
        ? `.${observabilityBrowserAndOperationEventsIncludes32}`
        : ``;
    } catch {
      return ``;
    }
  });
  (observabilityBrowserAndOperationEventsSet = new (Set as Dynamic)([
    `nameless`,
    `idless`,
    `dup_id`,
    `drift`,
    `behind`,
    `other`,
  ]));
  (observabilityBrowserAndOperationEventsDomClosedIdleHiddenIdleBlurPlainInputValues = [
      `dom_closed`,
      `idle_hidden`,
      `idle_blur`,
      `plain_input`,
      `flag_stands`,
      `pen_off`,
      `idle_focus`,
    ]);
  (observabilityBrowserAndOperationEventsNoneReadsRefusedWaitingViewOnlyValues = [
      `none`,
      `reads_refused`,
      `waiting`,
      `view_only`,
      `gone`,
      `open_failed`,
      `halt`,
      `retrying`,
      `other`,
      `drift_dead`,
      `incomplete`,
      `unseated`,
    ]);
  (resolveObservabilityBrowserAndOperationEventsValue9 = (
    observabilityBrowserAndOperationEventsValue9?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsValue9 >= 30
      ? observabilityBrowserAndOperationEventsValue9 < 120
        ? `lt2m`
        : observabilityBrowserAndOperationEventsValue9 < 600
          ? `lt10m`
          : `ge10m`
      : `lt30s`);
  (resolveObservabilityBrowserAndOperationEventsValue10 = (
    observabilityBrowserAndOperationEventsValue10?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsValue10 > 1
      ? observabilityBrowserAndOperationEventsValue10 <= 5
        ? `2_5`
        : `6_plus`
      : `1`);
  (observabilityBrowserAndOperationEventsRowsWordsTrayValues = [
    `rows`,
    `words`,
    `tray`,
  ]);
  (ObservabilityBrowserAndOperationEventsUnasked = [
    ...observabilityTelemetryHiddenReturnIdleCapValues,
    `unasked`,
    `stale`,
    `boot`,
    `unknown`,
    `dead`,
    `unproven`,
    `renamed`,
    `twin`,
  ]);
  (resolveObservabilityBrowserAndOperationEventsRenamed = (
    observabilityBrowserAndOperationEventsRenamed?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsRenamed !== `renamed` ||
    options === `rows`);
  (ObservabilityBrowserAndOperationEventsStandalone = Object.keys({
    standalone: true,
    shell: true,
    chat: true,
    viewer: true,
    pane: true,
    frame: true,
  }));
  (observabilityBrowserAndOperationEventsTimeoutDeadNoShellOriginStormValues = [`timeout`, `dead`, `no_shell_origin`, `storm`, `unk`]);
  (observabilityBrowserAndOperationEventsDeniedGoneTooLargeUnkValues = [
    `denied`,
    `gone`,
    `too_large`,
    `unk`,
  ]);
  (resolveObservabilityBrowserAndOperationEventsIncludes4 = (
    observabilityBrowserAndOperationEventsIncludes4?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsIncludes4 == `string` &&
    options.includes(observabilityBrowserAndOperationEventsIncludes4)
      ? observabilityBrowserAndOperationEventsIncludes4
      : `unk`);
  (resolveObservabilityBrowserAndOperationEventsFields2 = (
    observabilityBrowserAndOperationEventsFields2?: Dynamic,
    why?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest(
      observabilityBrowserAndOperationEventsFields2.plat,
    );
    let vis: Dynamic =
      observabilityBrowserAndOperationEventsFields2.vis === `visible` ||
      observabilityBrowserAndOperationEventsFields2.vis === `hidden`
        ? observabilityBrowserAndOperationEventsFields2.vis
        : undefined;
    return {
      fields: {
        host: resolveObservabilityBrowserAndOperationEventsIncludes4(
          observabilityBrowserAndOperationEventsFields2.host,
          ObservabilityBrowserAndOperationEventsStandalone,
        ),
        why: why,
        ...(vis !== undefined && {
          vis: vis,
        }),
        ...(plat !== undefined && {
          plat: plat,
        }),
        page: ``,
        sess: ``,
      },
      ...(plat !== undefined && {
        wire: {
          word: plat,
        },
      }),
    };
  });
  (observabilityBrowserAndOperationEventsPattern8 = /^frameShell: send failed \(([A-Z0-9_:]{1,48})\)$/);
  (observabilityBrowserAndOperationEventsPattern9 = /^([12])([rw])([vc]?)$/);
  (observabilityBrowserAndOperationEventsSet2 = new (Set as Dynamic)([
    `1`,
    `2_5`,
    `6_plus`,
  ]));
  (observabilityBrowserAndOperationEventsSet3 = new (Set as Dynamic)(
    observabilityTelemetryOfferedDeferredDirtyDeferredQuietDeferredPresentValues,
  ));
  (observabilityBrowserAndOperationEventsSet4 = new (Set as Dynamic)(
    observabilityTelemetryHiddenReturnIdleCapValues,
  ));
  (observabilityBrowserAndOperationEventsPattern10 = /^[0-9][cnu][0-9]$/);
  (observabilityBrowserAndOperationEventsSet5 = new (Set as Dynamic)(
    observabilityTelemetryDeferredDirtyDocDeferredDirtyStagedDeferredDirtyPostDeferredDirtyOutboxValues,
  ));
  (observabilityBrowserAndOperationEventsSet6 = new (Set as Dynamic)(
    observabilityTelemetryDeferredUnreadyPortDeferredUnreadyViewerValues,
  ));
  (observabilityBrowserAndOperationEventsSet7 = new (Set as Dynamic)(
    observabilityTelemetrySavedUnsavedBarUnsavedLinkUnsavedUnsyncedValues,
  ));
  (ObservabilityBrowserAndOperationEventsState3 = [
    [`m1`, `m0`, `mx`],
    [`t1`, `t0`, `tx`],
  ]);
  (observabilityBrowserAndOperationEventsFoundUnsentFoundUnreadValues = [
    `found:unsent`,
    `found:unread`,
  ]);
  (ObservabilityBrowserAndOperationEventsStoreFound = `store.found`);
  (observabilityBrowserAndOperationEventsValue60000 = 6e4);
  (observabilityBrowserAndOperationEventsFoundNoneFoundLateFoundFailFoundNoscopeValues = [`found:none`, `found:late`, `found:fail`, `found:noscope`]);
  (ObservabilityBrowserAndOperationEventsFoundNone = {
    "found:none": `none`,
    "found:late": `late`,
    "found:fail": `fail`,
    "found:noscope": `nosc`,
  });
  (resolveObservabilityBrowserAndOperationEventsValue11 = (
    observabilityBrowserAndOperationEventsValue11?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue11 == `number` &&
    observabilityBrowserAndOperationEventsValue11 >= 0 &&
    observabilityBrowserAndOperationEventsValue11 < 1 / 8);
  (observabilityBrowserAndOperationEventsFoundHandedFoundLinesFoundWaitsValues = [`found:handed`, `found:lines`, `found:waits`]);
  (ObservabilityBrowserAndOperationEventsFoundHanded = {
    "found:handed": `hand`,
    "found:lines": `lines`,
    "found:waits": `waits`,
  });
  (ObservabilityBrowserAndOperationEventsCard = `card`);
  (observabilityBrowserAndOperationEventsValue_1 = false);
  (resolveObservabilityBrowserAndOperationEventsTest6 = (
    observabilityBrowserAndOperationEventsTest6?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsTest6 == `string` &&
    observabilityBrowserAndOperationEventsPattern.test(
      observabilityBrowserAndOperationEventsTest6,
    )
      ? observabilityBrowserAndOperationEventsTest6
      : undefined);
  (ObservabilityBrowserAndOperationEventsState4 = [
    [`s10`, 1e4],
    [`s30`, 3e4],
    [`m1`, 6e4],
    [`m2`, 12e4],
    [`m5`, 3e5],
    [`m15`, 9e5],
    [`m60`, 36e5],
    [`h`, 1 / 0],
  ]);
  (ObservabilityBrowserAndOperationEventsWorking = {
    working: `w`,
    sent: `s`,
    queued: `q`,
    needs_user: `n`,
  });
  (resolveObservabilityBrowserAndOperationEventsHasOwn = (
    observabilityBrowserAndOperationEventsHasOwn?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsHasOwn !== undefined &&
    Object.hasOwn(
      ObservabilityBrowserAndOperationEventsWorking,
      observabilityBrowserAndOperationEventsHasOwn,
    )
      ? ObservabilityBrowserAndOperationEventsWorking[
          observabilityBrowserAndOperationEventsHasOwn
        ]
      : `o`);
  (resolveObservabilityBrowserAndOperationEventsValue12 = (
    observabilityBrowserAndOperationEventsValue12?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => ({}));
  (ObservabilityBrowserAndOperationEventsBare = {
    bare: `b`,
    held: `h`,
  });
  (resolveObservabilityBrowserAndOperationEventsCount = (
    observabilityBrowserAndOperationEventsCount?: Dynamic,
    ..._extraArguments: unknown[]
  ) => ({
    count: Math.min(
      65535,
      Math.max(2, Math.round(observabilityBrowserAndOperationEventsCount)),
    ),
  }));
  (observabilityBrowserAndOperationEventsSet8 = new (Set as Dynamic)(
    observabilityTelemetryWorkingSentQueuedNeedsUserValues,
  ));
  (resolveObservabilityBrowserAndOperationEventsValue15 = (
    observabilityBrowserAndOperationEventsValue15?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof observabilityBrowserAndOperationEventsValue15 == `string` &&
    observabilityBrowserAndOperationEventsSet8.has(
      observabilityBrowserAndOperationEventsValue15,
    ));
  (observabilityBrowserAndOperationEventsSet9 = new (Set as Dynamic)(
    observabilityTelemetrySignedOutReauthRefusedUnavailableValues,
  ));
  (observabilityBrowserAndOperationEventsSet10 = new (Set as Dynamic)(
    Object.keys({
      standalone: true,
      shell: true,
      chat: true,
      viewer: true,
      pane: true,
      frame: true,
    }),
  ));
  (observabilityBrowserAndOperationEventsSet11 = new (Set as Dynamic)(
    observabilityTelemetryHiddenReturnIdleCapValues2,
  ));
  (resolveObservabilityBrowserAndOperationEventsWhy = (
    observabilityBrowserAndOperationEventsWhy?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    why:
      typeof observabilityBrowserAndOperationEventsWhy.from == `string` &&
      observabilityBrowserAndOperationEventsSet11.has(
        observabilityBrowserAndOperationEventsWhy.from,
      )
        ? observabilityBrowserAndOperationEventsWhy.from
        : `unk`,
    host:
      typeof observabilityBrowserAndOperationEventsWhy.host == `string` &&
      observabilityBrowserAndOperationEventsSet10.has(
        observabilityBrowserAndOperationEventsWhy.host,
      )
        ? observabilityBrowserAndOperationEventsWhy.host
        : `unk`,
  }));
  (ObservabilityBrowserAndOperationEventsClaude = {
    claude: `c`,
    mode: `b`,
    threads: `l`,
    reveal: `r`,
  });
  (observabilityBrowserAndOperationEventsSet12 = new (Set as Dynamic)(
    observabilityTelemetryWrittenRepliedEndedFailedValues,
  ));
  (observabilityBrowserAndOperationEventsSet13 = new (Set as Dynamic)(
    observabilityTelemetryElsewhereQueuedRowCommentRowValues,
  ));
  (observabilityBrowserAndOperationEventsSet14 = new (Set as Dynamic)(
    observabilityTelemetryLateWrittenValues,
  ));
  (observabilityBrowserAndOperationEventsSet15 = new (Set as Dynamic)(
    observabilityTelemetryMarkedValues,
  ));
  (observabilityBrowserAndOperationEventsSet16 = new (Set as Dynamic)(
    observabilityTelemetryWriteBlankCommentValues,
  ));
  (observabilityBrowserAndOperationEventsSet17 = new (Set as Dynamic)(
    [`m`, `o`, `u`],
  ));
  (observabilityBrowserAndOperationEventsSet18 = new (Set as Dynamic)(
    [`q`, `d`],
  ));
}

export {
  ObservabilityBrowserAndOperationEventsOtOt,
  ObservabilityBrowserAndOperationEventsWork,
  createPagesAssetRefusedEvent,
  createPagesCommentConfirmedEvent,
  createPagesCommentWithdrawEvent,
  createPagesComposeReleasedEvent,
  createPagesCustodyClaimedEvent,
  createPagesEditorLockedEvent,
  createPagesEditorRemountEvent,
  createPagesEditorRemountEvent2,
  createPagesEditorRemountEvent3,
  createPagesEditorRemountEvent4,
  createPagesFaceGoneEvent,
  createPagesFaceUnavailableEvent,
  createPagesFaceUndoEvent,
  createPagesFenceViewerEvent,
  createPagesFlagPetrelEvent,
  createPagesHotSwapEvent,
  createPagesLaneParkedEvent,
  createPagesLaneResultLostEvent,
  createPagesLinkLateLiftEvent,
  createPagesLinkOddEvent,
  createPagesLinkReconnectEvent,
  createPagesLinkReconnectEvent2,
  createPagesOpportArmedEvent,
  createPagesOpportRaceEvent,
  createPagesOutboxDroppedEvent,
  createPagesPictureRejectedEvent,
  createPagesProfileNamelessEvent,
  createPagesProfileRecoveredEvent,
  createPagesReactionVerdictEvent,
  createPagesReactionVerdictEvent2,
  createPagesReseatLocalAheadEvent,
  createPagesStoreFoundEvent,
  createPagesStoreFoundEvent2,
  createPagesStoreFoundEvent3,
  createPagesSummonAnnouncedEvent,
  createPagesSummonHandoffEvent,
  createPagesSummonHeardEvent,
  createPagesSummonSentEvent,
  createPagesSummonShellBuildEvent,
  createPagesSummonSilentEvent,
  createPagesSummonStateEvent,
  createPagesSummonUnavailableEvent,
  createPagesSummonViewDarkEvent,
  createPagesSwapTabKeysEvent,
  createPagesSyncSerialHoleEvent,
  createPagesTrayBornEvent,
  createPagesTrayRetiredEvent,
  createPagesTypingOrderWasOffEvent,
  createPagesWidgetRelayDroppedEvent,
  createPagesWriteIntegrityEndEvent,
  createPagesWriteIntegrityEvent,
  createPagesWriteIntegrityGapEvent,
  isObservabilityBrowserAndOperationEventsArmed,
  isObservabilityBrowserAndOperationEventsPort,
  observabilityBrowserAndOperationEventsPattern,
  observabilityBrowserAndOperationEventsSet12,
  observabilityBrowserAndOperationEventsSet13,
  observabilityBrowserAndOperationEventsSet14,
  observabilityBrowserAndOperationEventsSet15,
  observabilityBrowserAndOperationEventsSet16,
  observabilityBrowserAndOperationEventsSet17,
  observabilityBrowserAndOperationEventsSet18,
  observabilityBrowserAndOperationEventsValue2000,
  resolveObservabilityBrowserAndOperationEventsComplete,
  resolveObservabilityBrowserAndOperationEventsDenyUnrowed,
  resolveObservabilityBrowserAndOperationEventsFields,
  resolveObservabilityBrowserAndOperationEventsIsFinite,
  resolveObservabilityBrowserAndOperationEventsKey,
  resolveObservabilityBrowserAndOperationEventsKey2,
  resolveObservabilityBrowserAndOperationEventsKey3,
  resolveObservabilityBrowserAndOperationEventsLane,
  resolveObservabilityBrowserAndOperationEventsRenamed,
  resolveObservabilityBrowserAndOperationEventsRound,
  resolveObservabilityBrowserAndOperationEventsTIMEOUT,
  resolveObservabilityBrowserAndOperationEventsTaken,
  resolveObservabilityBrowserAndOperationEventsTest,
  resolveObservabilityBrowserAndOperationEventsTest6,
  resolveObservabilityBrowserAndOperationEventsTest7,
  resolveObservabilityBrowserAndOperationEventsValue11,
  resolveObservabilityBrowserAndOperationEventsValue12,
  resolveObservabilityBrowserAndOperationEventsValue13,
  resolveObservabilityBrowserAndOperationEventsValue14,
  resolveObservabilityBrowserAndOperationEventsValue15,
  resolveObservabilityBrowserAndOperationEventsValue2,
  resolveObservabilityBrowserAndOperationEventsValue3,
  resolveObservabilityBrowserAndOperationEventsValue8,
  resolveObservabilityBrowserAndOperationEventsVisible,
  resolveObservabilityBrowserAndOperationEventsWire,
  resolveObservabilityBrowserAndOperationEventsWork,
  sanitizeTelemetryComponent,
};

/** BaoCut: platform sync and routing from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  React,
  create,
  helloMImport,
  inFrame,
  rolldownNImport,
} from "./platform-core-dependencies";
import {
  ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c,
  ddLog,
  filterObservabilityTelemetryJoin,
  resolveObservabilityTelemetryChunk,
  resolveObservabilityTelemetryKind2,
  resolveObservabilityTelemetryMessage,
  resolveObservabilityTelemetryMsgKind2,
  resolveObservabilityTelemetryThrown,
} from "./platform-core-observability-telemetry-1";
import {
  ObservabilityTelemetryDenied,
  observabilityTelemetryPattern27,
  observabilityTelemetryPattern28,
  observabilityTelemetryPattern29,
  observabilityTelemetryPattern30,
  observabilityTelemetryPattern31,
  observabilityTelemetrySet18,
  observabilityTelemetrySet19,
  observabilityTelemetrySet22,
  resolveObservabilityTelemetryEntries,
  resolveObservabilityTelemetryEntries2,
} from "./platform-core-observability-telemetry-2";
import {
  emitTelemetryEvent,
  resolveObservabilityTelemetryValue18,
} from "./platform-core-observability-telemetry-3";
import {
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind2,
} from "./platform-core-data-content-and-references";
import {
  platformSessionAndSourcesPattern9,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolvePlatformSessionAndSourcesValue19,
} from "./platform-core-platform-session-and-sources-2";
import {
  resolvePlatformLoadingAndStatusName,
} from "./platform-core-platform-loading-and-status";
import {
  resolveUiProviderAndLayersUseContext2,
} from "./platform-core-ui-provider-and-layers";
import {
  resolvePlatformChunkLoadingStale,
} from "./platform-core-platform-chunk-loading";
import {
  createPagesFenceViewerEvent,
  createPagesLaneParkedEvent,
  createPagesLaneResultLostEvent,
  createPagesLinkReconnectEvent2,
  resolveObservabilityBrowserAndOperationEventsLane,
  resolveObservabilityBrowserAndOperationEventsTest,
  resolveObservabilityBrowserAndOperationEventsValue3,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  frameBootContainer,
  frameLane,
  liveSupportCode,
  onFrameShellLog,
} from "./platform-core-observability-browser-and-operation-events-3";
import {
  resolveObservabilityBrowserAndOperationEventsValue48,
} from "./platform-core-observability-browser-and-operation-events-4";
import {
  PlatformApiAndAuthState2,
  resolvePlatformApiAndAuthDispatch,
  resolvePlatformApiAndAuthStartsWith,
  resolvePlatformApiAndAuthState3,
  resolvePlatformApiAndAuthState4,
  resolvePlatformApiAndAuthValue,
  serverRev,
  updatePlatformApiAndAuthDeps,
} from "./platform-core-platform-api-and-auth-1";
import {
  PlatformApiAndAuthWhat,
  resolvePlatformApiAndAuthValue17,
} from "./platform-core-platform-api-and-auth-3";
import {
  resolveDataModelSchemasUnknown,
  updateDataModelSchemasValue,
} from "./platform-core-data-model-schemas-4";
import {
  resolveCommentsStoreValue25,
  resolveCommentsStoreValue32,
} from "./platform-core-comments-store-5";
import {
  resolveEditorHostIsFinite2,
} from "./platform-core-editor-host-1";
import {
  EditorHostStyles12,
  isEditorHostPageNamed,
} from "./platform-core-editor-host-2";

var platformSyncAndRoutingValue0_4: number;

var PlatformSyncAndRoutingClientEvent: string;

var PlatformSyncAndRoutingClientEventFields: string;

var PlatformSyncAndRoutingClientEventCodes: string;

var PlatformSyncAndRoutingClientEventExport: string;

var resolvePlatformSyncAndRoutingValue: Dynamic;

function resolvePlatformSyncAndRoutingValue2(
  platformSyncAndRoutingValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformSyncAndRoutingValue(
    platformSyncAndRoutingValue2?.[PlatformSyncAndRoutingClientEvent],
  );
}

function resolvePlatformSyncAndRoutingValue3(
  platformSyncAndRoutingValue3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformSyncAndRoutingValue(
    platformSyncAndRoutingValue3?.[PlatformSyncAndRoutingClientEventCodes],
  );
}

function resolvePlatformSyncAndRoutingValue4(
  platformSyncAndRoutingValue4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformSyncAndRoutingValue(
    platformSyncAndRoutingValue4?.[PlatformSyncAndRoutingClientEventExport],
  );
}

function resolvePlatformSyncAndRoutingValue5(
  platformSyncAndRoutingValue5?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformSyncAndRoutingValue(
    platformSyncAndRoutingValue5?.[PlatformSyncAndRoutingClientEventFields],
  );
}

var platformSyncAndRoutingPattern: RegExp;

var platformSyncAndRoutingPattern2: RegExp;

var platformSyncAndRoutingPattern3: RegExp;

var platformSyncAndRoutingPattern4: RegExp;

var platformSyncAndRoutingPattern5: RegExp;

var platformSyncAndRoutingSet: Dynamic;

function resolvePlatformSyncAndRoutingOpId(
  error?: Dynamic,
  opId?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !platformSyncAndRoutingPattern.test(opId) ||
    !platformSyncAndRoutingSet.has(error.kind) ||
    !platformSyncAndRoutingPattern2.test(error.event) ||
    !Number.isInteger(error.ts) ||
    error.ts < 0 ||
    error.ts > 2 ** 53
  )
    return null;
  let record2: Dynamic = {
    opId: opId,
    verb: `client_event`,
    kind: error.kind,
    event: error.event,
    ts: error.ts,
  };
  if (error.count !== undefined) {
    if (
      !Number.isInteger(error.count) ||
      error.count < 1 ||
      error.count > 65535
    )
      return null;
    record2.count = error.count;
  }
  if (error.fe !== undefined) {
    if (!platformSyncAndRoutingPattern5.test(error.fe)) return null;
    record2.fe = error.fe;
  }
  if (
    error.component !== undefined &&
    !observabilityTelemetrySet22.has(error.component)
  ) {
    if (!observabilityTelemetryPattern29.test(error.component)) return null;
    record2.component = error.component;
  }
  if (error.release !== undefined) {
    if (!observabilityTelemetryPattern30.test(error.release)) return null;
    record2.release = error.release;
  }
  if (
    error.errName !== undefined &&
    !observabilityTelemetrySet22.has(error.errName)
  ) {
    if (!observabilityTelemetryPattern31.test(error.errName)) return null;
    record2.errName = error.errName;
  }
  if (
    typeof error.word == `string` &&
    observabilityTelemetryPattern27.test(error.word) &&
    !observabilityTelemetrySet22.has(error.word)
  ) {
    record2.word = error.word;
  }
  if (
    typeof error.rowKey == `string` &&
    observabilityTelemetryPattern28.test(error.rowKey) &&
    !observabilityTelemetrySet22.has(error.rowKey)
  ) {
    record2.rowKey = error.rowKey;
  }
  if (error.code !== undefined) {
    if (!platformSyncAndRoutingPattern3.test(error.code)) return null;
    record2.code = error.code;
  }
  if (error.verbWord !== undefined) {
    if (!platformSyncAndRoutingPattern3.test(error.verbWord)) return null;
    record2.verbWord = error.verbWord;
  }
  if (error.file !== undefined) {
    if (!platformSyncAndRoutingPattern4.test(error.file)) return null;
    record2.file = error.file;
  }
  if (error.node !== undefined) {
    if (!platformSyncAndRoutingPattern4.test(error.node)) return null;
    record2.node = error.node;
  }
  if (error.dims !== undefined) {
    let observabilityTelemetryEntries2: Dynamic =
      resolveObservabilityTelemetryEntries2(error.dims);
    if (observabilityTelemetryEntries2 === undefined) return null;
    record2.dims = observabilityTelemetryEntries2;
  }
  return new TextEncoder().encode(JSON.stringify(record2)).length > 1024
    ? null
    : record2;
}

function isPlatformSyncAndRoutingINVALIDARGUMENT(
  platformSyncAndRoutingINVALIDARGUMENT?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (platformSyncAndRoutingINVALIDARGUMENT.threw !== undefined) {
    let code: Dynamic =
      typeof platformSyncAndRoutingINVALIDARGUMENT.threw == `object` &&
      platformSyncAndRoutingINVALIDARGUMENT.threw !== null
        ? platformSyncAndRoutingINVALIDARGUMENT.threw.code
        : undefined;
    return code === `INVALID_ARGUMENT` || code === `BAD_PAYLOAD`;
  }
  if (platformSyncAndRoutingINVALIDARGUMENT.reply === undefined) return false;
  if (platformSyncAndRoutingINVALIDARGUMENT.reply.status === 400) return true;
  let body: Dynamic = platformSyncAndRoutingINVALIDARGUMENT.reply.body;
  if (typeof body != `object` || !body) return false;
  let body2: Dynamic = body;
  return (
    body2.verdict === `deny` &&
    (body2.reason === `bad_request` ||
      body2.reason === `unknown_key` ||
      body2.reason === `unknown_verb` ||
      body2.reason === `unsupported`)
  );
}

function isPlatformSyncAndRoutingDeny(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (response.status < 200 || response.status >= 300) return false;
  let body: Dynamic = response.body;
  return !(typeof body == `object` && body && body.verdict === `deny`);
}

function resolvePlatformSyncAndRoutingKind(
  error?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options && context && (dependencies || error.dims === undefined))
    return error;
  let record2: Dynamic = {
    kind: error.kind,
    event: error.event,
    ts: error.ts,
  };
  if (error.count !== undefined) {
    record2.count = error.count;
  }
  if (error.fe !== undefined) {
    record2.fe = error.fe;
  }
  if (error.afterAck === true) {
    record2.afterAck = true;
  }
  if (options) {
    if (error.component !== undefined) {
      record2.component = error.component;
    }
    if (error.release !== undefined) {
      record2.release = error.release;
    }
    if (error.errName !== undefined) {
      record2.errName = error.errName;
    }
    if (error.word !== undefined) {
      record2.word = error.word;
    }
    if (error.rowKey !== undefined) {
      record2.rowKey = error.rowKey;
    }
  }
  if (context) {
    if (error.code !== undefined) {
      record2.code = error.code;
    }
    if (error.verbWord !== undefined) {
      record2.verbWord = error.verbWord;
    }
    if (error.file !== undefined) {
      record2.file = error.file;
    }
    if (error.node !== undefined) {
      record2.node = error.node;
    }
  }
  if (dependencies && error.dims !== undefined) {
    record2.dims = error.dims;
  }
  return record2;
}

function resolvePlatformSyncAndRoutingThrew(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let count = 19;
  let now: Dynamic = scheduler.now();
  let off = false;
  let enabled = false;
  let enabled2 = false;
  let items: Dynamic = [];
  let items2: Dynamic = [];
  let enabled3 = false;
  let sent = 0;
  let dropped: Dynamic = 0;
  let worded = 0;
  let items3: Dynamic = [];
  let resolvePlatformSyncAndRoutingThrewResult: Dynamic;
  let helloSImport2 = (..._extraArguments: unknown[]): undefined => {
    resolvePlatformSyncAndRoutingThrewResult = undefined;
    let splice: Dynamic = items3.splice(0);
    if (off || enabled3) return void (dropped += splice.length);
    for (let resolvePlatformSyncAndRoutingThrewResult2 of splice as Dynamic)
      mintOpId(resolvePlatformSyncAndRoutingThrewResult2);
  };
  let schedule = (
    platformSyncAndRoutingThrew?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (scheduler.schedule === undefined || enabled3 || items3.length >= 11)
      return void dropped++;
    items3.push(platformSyncAndRoutingThrew);
    if (resolvePlatformSyncAndRoutingThrewResult !== undefined) return;
    let max = Math.max(0, 5 - count);
    resolvePlatformSyncAndRoutingThrewResult = scheduler.schedule(
      helloSImport2,
      Math.max(250, Math.ceil((max / platformSyncAndRoutingValue0_4) * 1e3)),
    );
  };
  let items4: Dynamic = [];
  let resolvePlatformSyncAndRoutingThrewHandler = (
    platformSyncAndRoutingThrew?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled3 || items4.length >= 6) return void dropped++;
    items4.push(platformSyncAndRoutingThrew);
  };
  let helloSImport3 = (
    platformSyncAndRoutingThrew?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    enabled2 = false;
    if (isPlatformSyncAndRoutingINVALIDARGUMENT(platformSyncAndRoutingThrew)) {
      off = true;
    } else {
      if (
        platformSyncAndRoutingThrew.reply !== undefined &&
        isPlatformSyncAndRoutingDeny(platformSyncAndRoutingThrew.reply)
      ) {
        enabled = true;
      }
    }
    let splice: Dynamic = items.splice(0);
    let splice2: Dynamic = items4.splice(0);
    let items5: Dynamic = [...splice, ...splice2];
    let index = 0;
    try {
      for (; index < items5.length; index++) mintOpId(items5[index]);
    } finally {
      dropped += items5.length - index;
    }
  };
  let resolvePlatformSyncAndRoutingThrewHandler2 = (
    platformSyncAndRoutingThrew?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let itemIndex: Dynamic = items2.findIndex(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        item.event === platformSyncAndRoutingThrew.event,
    );
    if (itemIndex !== -1) {
      items2.splice(itemIndex, 1);
      dropped++;
    } else if (items2.length >= 6) return void dropped++;
    items2.push(platformSyncAndRoutingThrew);
  };
  let advertised = (..._extraArguments: unknown[]): undefined => {
    if (items2.length === 0) return;
    let splice: Dynamic = items2.splice(0);
    if (off || enabled3 || !scheduler.advertised()) dropped += splice.length;
    else
      for (let resolvePlatformSyncAndRoutingThrewResult2 of splice as Dynamic)
        mintOpId(resolvePlatformSyncAndRoutingThrewResult2);
  };
  let mintOpId: Dynamic = (
    platformSyncAndRoutingThrew?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (off) return void dropped++;
    if (platformSyncAndRoutingThrew.afterAck === true && !enabled)
      return resolvePlatformSyncAndRoutingThrewHandler(
        platformSyncAndRoutingThrew,
      );
    if (!scheduler.advertised()) {
      if (platformSyncAndRoutingThrew.componentOnly === true)
        return void dropped++;
      if (!scheduler.heard() && !enabled3)
        return resolvePlatformSyncAndRoutingThrewHandler2(
          platformSyncAndRoutingThrew,
        );
      advertised();
      dropped++;
      return;
    }
    advertised();
    if (!enabled && enabled2)
      return void (platformSyncAndRoutingThrew.componentOnly !== true &&
      items.length < 8
        ? items.push(platformSyncAndRoutingThrew)
        : dropped++);
    let now2: Dynamic = scheduler.now();
    count = Math.min(
      19,
      count + ((now2 - now) / 1e3) * platformSyncAndRoutingValue0_4,
    );
    now = now2;
    if (platformSyncAndRoutingThrew.componentOnly === true && items3.length > 0)
      return schedule(platformSyncAndRoutingThrew);
    if (
      count < 1 ||
      ((platformSyncAndRoutingThrew.yields === true ||
        platformSyncAndRoutingThrew.afterAck === true) &&
        count < 5)
    )
      return platformSyncAndRoutingThrew.componentOnly === true
        ? schedule(platformSyncAndRoutingThrew)
        : void dropped++;
    let lane: Dynamic = scheduler.lane();
    let platformSyncAndRoutingKind: Dynamic = resolvePlatformSyncAndRoutingKind(
      platformSyncAndRoutingThrew,
      scheduler.fieldsAdvertised(),
      scheduler.codesAdvertised(),
      scheduler.exportAdvertised?.() ?? false,
    );
    if (
      platformSyncAndRoutingThrew.componentOnly === true &&
      platformSyncAndRoutingKind.component === undefined
    )
      return void dropped++;
    let platformSyncAndRoutingOpId: Dynamic =
      lane === null
        ? null
        : resolvePlatformSyncAndRoutingOpId(
            platformSyncAndRoutingKind,
            scheduler.mintOpId(),
          );
    if (lane === null || platformSyncAndRoutingOpId === null)
      return void dropped++;
    --count;
    sent++;
    if (
      platformSyncAndRoutingOpId.word !== undefined ||
      platformSyncAndRoutingOpId.rowKey !== undefined
    ) {
      worded++;
    }
    if (!enabled) {
      enabled2 = true;
    }
    let resolvePlatformSyncAndRoutingThrewResult2: Dynamic;
    try {
      resolvePlatformSyncAndRoutingThrewResult2 = lane.call(
        platformSyncAndRoutingOpId,
      );
    } catch (threw: Dynamic) {
      helloSImport3({
        threw: threw,
      });
      return;
    }
    resolvePlatformSyncAndRoutingThrewResult2.then(
      (reply?: Dynamic, ..._extraArguments: unknown[]) =>
        helloSImport3({
          reply: reply,
        }),
      (threw?: Dynamic, ..._extraArguments: unknown[]) =>
        helloSImport3({
          threw: threw,
        }),
    );
  };
  mintOpId.stats = (..._extraArguments: unknown[]): Dynamic => ({
    sent: sent,
    dropped: dropped,
    off: off,
    worded: worded,
  });
  mintOpId.gate = (..._extraArguments: unknown[]): undefined => {
    if (scheduler.advertised() || scheduler.heard()) {
      advertised();
    }
  };
  mintOpId.close = (..._extraArguments: unknown[]): undefined => {
    enabled3 = true;
    advertised();
    resolvePlatformSyncAndRoutingThrewResult?.();
    resolvePlatformSyncAndRoutingThrewResult = undefined;
    dropped += items3.splice(0).length;
    dropped += items4.splice(0).length;
  };
  mintOpId.waiting = (..._extraArguments: unknown[]): Dynamic => items2.length;
  mintOpId.late = (..._extraArguments: unknown[]): Dynamic => items3.length;
  mintOpId.afterAck = (..._extraArguments: unknown[]): Dynamic => items4.length;
  return mintOpId;
}

var platformSyncAndRoutingWeakSet: Dynamic;

function resolvePlatformSyncAndRoutingSource(
  platformSyncAndRoutingSource?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options == null || platformSyncAndRoutingSource.source !== options)
    return null;
  let data: Dynamic = platformSyncAndRoutingSource.data;
  if (typeof data != `object` || !data) return null;
  let Trace: Dynamic = data.__trace;
  return Array.isArray(Trace)
    ? (platformSyncAndRoutingWeakSet.add(Trace), Trace)
    : null;
}

var platformSyncAndRoutingPattern6: RegExp;

function createPagesLaneDeadEvent(
  pagesLaneDeadEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let match = platformSyncAndRoutingPattern6.exec(pagesLaneDeadEvent);
  if (match === null) return null;
  let key = match[1].toLowerCase();
  return Object.hasOwn(ObservabilityTelemetryDenied, key)
    ? {
        name: `pages.lane.dead`,
        key: key,
        fields: {
          code: key,
          road: `lane`,
        },
      }
    : null;
}

function createPagesBootGaveUpEvent(
  pagesBootGaveUpEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let code: Dynamic =
    pagesBootGaveUpEvent.dead === null
      ? undefined
      : Object.hasOwn(ObservabilityTelemetryDenied, pagesBootGaveUpEvent.dead)
        ? pagesBootGaveUpEvent.dead
        : `unknown`;
  return {
    name: `pages.boot.gave_up`,
    key: pagesBootGaveUpEvent.reason,
    fields: {
      reason: pagesBootGaveUpEvent.reason,
      ...(code === undefined
        ? {}
        : {
            code: code,
          }),
      road: `lane`,
      online: pagesBootGaveUpEvent.online,
      hello: pagesBootGaveUpEvent.helloAnswered,
      wsUp: pagesBootGaveUpEvent.everConnected,
      laneOpen: pagesBootGaveUpEvent.everOpened,
      count: pagesBootGaveUpEvent.afterS,
      tries: pagesBootGaveUpEvent.tries,
    },
  };
}

var resolvePlatformSyncAndRoutingFileId: Dynamic;

var PlatformSyncAndRoutingState: number[];

function resolvePlatformSyncAndRoutingIsFinite(
  platformSyncAndRoutingIsFinite?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Number.isFinite(platformSyncAndRoutingIsFinite)) return null;
  for (let resolvePlatformSyncAndRoutingIsFiniteResult of PlatformSyncAndRoutingState as Dynamic)
    if (
      platformSyncAndRoutingIsFinite >=
      resolvePlatformSyncAndRoutingIsFiniteResult
    )
      return resolvePlatformSyncAndRoutingIsFiniteResult;
  return null;
}

var resolvePlatformSyncAndRoutingValue6: Dynamic;

function resolvePlatformSyncAndRoutingDead(
  platformSyncAndRoutingDead?: unknown,
  options?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof platformSyncAndRoutingDead == `string`) {
    let normalizedLabel = (
      platformSyncAndRoutingDead.startsWith(`DEAD:`)
        ? `dead`
        : platformSyncAndRoutingDead
    ).toLowerCase();
    if (observabilityTelemetrySet18.has(normalizedLabel))
      return normalizedLabel;
  }
  if (typeof options == `number`) {
    if (options >= 500 && options <= 599) return `http_5xx`;
    if (options >= 400 && options <= 499) return `http_4xx`;
  }
  return `unknown`;
}

var platformSyncAndRoutingPattern7: RegExp;

var resolvePlatformSyncAndRoutingExec: Dynamic;

function resolvePlatformSyncAndRoutingWire(
  response?: Dynamic,
  options: Dynamic = {},
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (response.layer !== `door`) return [];
  let verb: Dynamic = resolvePlatformSyncAndRoutingValue6(response.verb);
  let platformSyncAndRoutingFileId: Dynamic =
    resolvePlatformSyncAndRoutingFileId(options);
  let items: Dynamic = [];
  let matchesHidden = response.hidden === true;
  let vis = matchesHidden ? `hidden` : `visible`;
  let word: Dynamic =
    resolveObservabilityBrowserAndOperationEventsTest(context);
  let record2: Dynamic =
    word === undefined
      ? {}
      : {
          wire: {
            word: word,
          },
        };
  if (response.name === `threw`) {
    let code = resolvePlatformSyncAndRoutingDead(
      response.code,
      response.status,
    );
    items.push({
      name: `pages.door.threw`,
      key: `${verb ?? ``}:${code}${matchesHidden ? `:hidden` : ``}`,
      fields: {
        code: code,
        ...(verb
          ? {
              verb: verb,
            }
          : {}),
        vis: vis,
        road: `host`,
        ...platformSyncAndRoutingFileId,
        ...(word !== undefined && {
          plat: word,
        }),
      },
      ...record2,
    });
  } else if (response.name === `reply`) {
    if (
      response.via === `relay` ||
      response.via === `http` ||
      response.verdict === `unreachable`
    ) {
      let code =
        typeof response.was == `string`
          ? resolvePlatformSyncAndRoutingDead(
              response.was,
              resolvePlatformSyncAndRoutingExec(response.was),
            )
          : response.reopens === true
            ? `reset`
            : response.verdict === `unreachable`
              ? `network`
              : resolvePlatformSyncAndRoutingDead(
                  response.code,
                  response.status,
                );
      items.push({
        name: `pages.door.threw`,
        key: `${verb ?? ``}:${code}${matchesHidden ? `:hidden` : ``}`,
        fields: {
          code: code,
          ...(verb
            ? {
                verb: verb,
              }
            : {}),
          vis: vis,
          road: `host`,
          ...platformSyncAndRoutingFileId,
          ...(word !== undefined && {
            plat: word,
          }),
        },
        ...record2,
      });
    }
    let count: Dynamic =
      typeof response.ms == `number`
        ? resolvePlatformSyncAndRoutingIsFinite(response.ms)
        : null;
    if (count !== null) {
      items.push({
        name: `pages.door.slow`,
        key: `${count}${matchesHidden ? `:hidden` : ``}`,
        fields: {
          count: count,
          ...(verb
            ? {
                verb: verb,
              }
            : {}),
          vis: vis,
          road: `host`,
          ...platformSyncAndRoutingFileId,
          ...(word !== undefined && {
            plat: word,
          }),
        },
        ...record2,
      });
    }
  }
  return items;
}

var PlatformSyncAndRoutingHung: Dynamic;

var resolvePlatformSyncAndRoutingCode: Dynamic;

var resolvePlatformSyncAndRoutingIsInteger: Dynamic;

function resolvePlatformSyncAndRoutingFields(
  platformSyncAndRoutingFields?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  if (platformSyncAndRoutingFields.layer !== `op`) return null;
  let platformSyncAndRoutingFileId: Dynamic =
    resolvePlatformSyncAndRoutingFileId(options);
  switch (platformSyncAndRoutingFields.name) {
    case `told.whole`:
      return {
        name: `pages.sync.gap_opened`,
        fields: {
          road: `host`,
          ...platformSyncAndRoutingFileId,
        },
      };
    case `told.gapClosed`: {
      let count: Dynamic = resolvePlatformSyncAndRoutingIsInteger(
        typeof platformSyncAndRoutingFields.fails == `number`
          ? platformSyncAndRoutingFields.fails + 1
          : 1,
      );
      return count > 1
        ? {
            name: `pages.sync.gap_closed`,
            key: `retried`,
            fields: {
              count: count,
              road: `host`,
              ...platformSyncAndRoutingFileId,
            },
          }
        : {
            name: `pages.sync.gap_closed`,
            fields: {
              road: `host`,
              ...platformSyncAndRoutingFileId,
            },
          };
    }
    case `told.gapEpisode`: {
      let platformSyncAndRoutingCode: Dynamic =
        resolvePlatformSyncAndRoutingCode(platformSyncAndRoutingFields.why);
      return {
        name: `pages.sync.gap_retrying`,
        ...(platformSyncAndRoutingCode.code === undefined
          ? {}
          : {
              key: platformSyncAndRoutingCode.code,
            }),
        fields: {
          ...platformSyncAndRoutingCode,
          road: `host`,
          ...platformSyncAndRoutingFileId,
        },
      };
    }
    case `told.gapAbandoned`:
      return {
        name: `pages.sync.gap_failed`,
        key: `abandoned`,
        fields: {
          count: resolvePlatformSyncAndRoutingIsInteger(
            platformSyncAndRoutingFields.fails,
          ),
          ...resolvePlatformSyncAndRoutingCode(
            platformSyncAndRoutingFields.why,
          ),
          road: `host`,
          ...platformSyncAndRoutingFileId,
        },
      };
    default:
      return null;
  }
}

var platformSyncAndRoutingValue64: number;

var platformSyncAndRoutingValue2000: number;

var platformSyncAndRoutingValue60000: number;

function updatePlatformSyncAndRoutingFields(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let index = 0;
  let updatePlatformSyncAndRoutingFieldsResult: Dynamic;
  let schedule = (..._extraArguments: unknown[]): undefined => {
    index++;
    if (updatePlatformSyncAndRoutingFieldsResult === undefined) {
      updatePlatformSyncAndRoutingFieldsResult = scheduler.schedule(
        (..._extraArguments: unknown[]): undefined => {
          let count = index;
          index = 0;
          updatePlatformSyncAndRoutingFieldsResult = undefined;
          if (count > 0) {
            scheduler.say({
              name: `pages.sync.gaps_quick`,
              fields: {
                count: count,
                road: `host`,
              },
            });
          }
        },
        platformSyncAndRoutingValue60000,
      );
    }
  };
  let updatePlatformSyncAndRoutingFieldsHandler: Dynamic = (
    updatePlatformSyncAndRoutingFields2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let matchesCondition: Dynamic =
      (typeof updatePlatformSyncAndRoutingFields2.node == `string` &&
        updatePlatformSyncAndRoutingFields2.node) ||
      (typeof updatePlatformSyncAndRoutingFields2.fileId == `string` &&
        updatePlatformSyncAndRoutingFields2.fileId) ||
      ``;
    let lookupEntry: Dynamic = lookup.get(matchesCondition);
    if (
      lookupEntry === undefined &&
      lookup.size < platformSyncAndRoutingValue64
    ) {
      lookup.set(
        matchesCondition,
        (lookupEntry = {
          seated: false,
          episode: `none`,
          seatedUnder: false,
        }),
      );
    }
    return lookupEntry;
  };
  return {
    seat: (
      updatePlatformSyncAndRoutingFields2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let updatePlatformSyncAndRoutingFieldsHandler2: Dynamic =
        updatePlatformSyncAndRoutingFieldsHandler(
          updatePlatformSyncAndRoutingFields2,
        );
      if (updatePlatformSyncAndRoutingFieldsHandler2 !== undefined) {
        updatePlatformSyncAndRoutingFieldsHandler2.seated = true;
        if (updatePlatformSyncAndRoutingFieldsHandler2.episode === `silent`) {
          updatePlatformSyncAndRoutingFieldsHandler2.seatedUnder = true;
        }
      }
    },
    words: (
      updatePlatformSyncAndRoutingFields2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let platformSyncAndRoutingFields: Dynamic =
        resolvePlatformSyncAndRoutingFields(
          updatePlatformSyncAndRoutingFields2,
          options,
        );
      let updatePlatformSyncAndRoutingFieldsHandler2: Dynamic =
        platformSyncAndRoutingFields === null
          ? undefined
          : updatePlatformSyncAndRoutingFieldsHandler(options);
      if (
        platformSyncAndRoutingFields === null ||
        updatePlatformSyncAndRoutingFieldsHandler2 === undefined
      )
        return platformSyncAndRoutingFields === null
          ? []
          : [platformSyncAndRoutingFields];
      let resolvePlatformSyncAndRoutingFields2: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolvePlatformSyncAndRoutingFields(
          {
            layer: `op`,
            name: `told.whole`,
          },
          options,
        );
      let resolvePlatformSyncAndRoutingFields3: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic =>
        updatePlatformSyncAndRoutingFieldsHandler2.episode === `silent` ||
        updatePlatformSyncAndRoutingFieldsHandler2.episode === `held`
          ? [resolvePlatformSyncAndRoutingFields2()]
          : [];
      let unhold = (
        updatePlatformSyncAndRoutingFields3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        updatePlatformSyncAndRoutingFieldsHandler2.unhold?.();
        updatePlatformSyncAndRoutingFieldsHandler2.unhold = undefined;
        updatePlatformSyncAndRoutingFieldsHandler2.heldAt = undefined;
        updatePlatformSyncAndRoutingFieldsHandler2.episode =
          updatePlatformSyncAndRoutingFields3;
        updatePlatformSyncAndRoutingFieldsHandler2.seatedUnder = false;
      };
      let updatePlatformSyncAndRoutingFieldsHandler3: Dynamic = (
        ..._extraArguments: unknown[]
      ) =>
        updatePlatformSyncAndRoutingFieldsHandler2.episode === `held` &&
        updatePlatformSyncAndRoutingFieldsHandler2.heldAt !== undefined &&
        scheduler.now() - updatePlatformSyncAndRoutingFieldsHandler2.heldAt >=
          2e3;
      switch (updatePlatformSyncAndRoutingFields2.name) {
        case `told.whole`:
          if (
            updatePlatformSyncAndRoutingFieldsHandler2.episode === `silent` &&
            updatePlatformSyncAndRoutingFieldsHandler2.seatedUnder
          ) {
            unhold(`none`);
          }
          return updatePlatformSyncAndRoutingFieldsHandler2.episode === `none`
            ? (!updatePlatformSyncAndRoutingFieldsHandler2.seated ||
              updatePlatformSyncAndRoutingFields2.why === `mount`
                ? unhold(`silent`)
                : (unhold(`held`),
                  (updatePlatformSyncAndRoutingFieldsHandler2.heldAt =
                    scheduler.now()),
                  (updatePlatformSyncAndRoutingFieldsHandler2.unhold =
                    scheduler.schedule(
                      (..._extraArguments: unknown[]): undefined => {
                        if (
                          updatePlatformSyncAndRoutingFieldsHandler2.episode ===
                          `held`
                        ) {
                          updatePlatformSyncAndRoutingFieldsHandler2.unhold =
                            undefined;
                          updatePlatformSyncAndRoutingFieldsHandler2.heldAt =
                            undefined;
                          updatePlatformSyncAndRoutingFieldsHandler2.episode = `said`;
                          scheduler.say(resolvePlatformSyncAndRoutingFields2());
                        }
                      },
                      platformSyncAndRoutingValue2000,
                    ))),
              [])
            : updatePlatformSyncAndRoutingFieldsHandler3()
              ? (unhold(`said`), [platformSyncAndRoutingFields])
              : updatePlatformSyncAndRoutingFieldsHandler2.episode === `said`
                ? [platformSyncAndRoutingFields]
                : [];
        case `told.gapEpisode`: {
          let items: Dynamic = [
            ...resolvePlatformSyncAndRoutingFields3(),
            platformSyncAndRoutingFields,
          ];
          if (
            updatePlatformSyncAndRoutingFieldsHandler2.episode === `silent` ||
            updatePlatformSyncAndRoutingFieldsHandler2.episode === `held`
          ) {
            unhold(`said`);
          }
          return items;
        }
        case `told.gapClosed`: {
          let enabled =
            !(
              typeof updatePlatformSyncAndRoutingFields2.fails == `number` &&
              updatePlatformSyncAndRoutingFields2.fails > 0
            ) &&
            (updatePlatformSyncAndRoutingFieldsHandler2.episode === `silent` ||
              (updatePlatformSyncAndRoutingFieldsHandler2.episode === `held` &&
                !updatePlatformSyncAndRoutingFieldsHandler3()));
          if (
            enabled &&
            updatePlatformSyncAndRoutingFieldsHandler2.episode === `held`
          ) {
            schedule();
          }
          let items: Dynamic = enabled
            ? []
            : [
                ...resolvePlatformSyncAndRoutingFields3(),
                platformSyncAndRoutingFields,
              ];
          unhold(`none`);
          return items;
        }
        case `told.gapAbandoned`: {
          let items: Dynamic = [
            ...resolvePlatformSyncAndRoutingFields3(),
            platformSyncAndRoutingFields,
          ];
          unhold(`none`);
          return items;
        }
        default:
          return [platformSyncAndRoutingFields];
      }
    },
  };
}

var platformSyncAndRoutingSet2: Dynamic;

var platformSyncAndRoutingSet3: Dynamic;

function resolvePlatformSyncAndRoutingOther(
  platformSyncAndRoutingOther?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof platformSyncAndRoutingOther == `string`
    ? platformSyncAndRoutingSet2.has(platformSyncAndRoutingOther)
      ? platformSyncAndRoutingOther
      : platformSyncAndRoutingOther.startsWith(`frame:`)
        ? platformSyncAndRoutingSet3.has(platformSyncAndRoutingOther.slice(6))
          ? platformSyncAndRoutingOther
          : `frame:other`
        : `other`
    : `other`;
}

function createPagesEditorContainedEvent(
  pagesEditorContainedEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    pagesEditorContainedEvent.layer !== `op` ||
    pagesEditorContainedEvent.name !== `contained`
  )
    return null;
  let phase = resolvePlatformSyncAndRoutingOther(pagesEditorContainedEvent.via);
  let cls: Dynamic = resolveDataModelSchemasUnknown(
    typeof pagesEditorContainedEvent.err == `string`
      ? pagesEditorContainedEvent.err
      : ``,
  );
  return {
    name: `pages.editor.contained`,
    key: `${phase}:${cls}`,
    fields: {
      phase: phase,
      cls: cls,
      road: `iframe`,
      component: `contained:${phase}`,
    },
  };
}

function createPagesNetEvent(
  key?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.net`,
    key: key,
    fields: {
      code: key,
      road: `host`,
    },
  };
}

function resolvePlatformSyncAndRoutingValue7(
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  let index = 0;
  return (
    platformSyncAndRoutingValue7?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let recordItem: Dynamic = record2[platformSyncAndRoutingValue7];
    return index >= 20 ||
      (recordItem !== undefined && options - recordItem < 6e4)
      ? false
      : ((record2[platformSyncAndRoutingValue7] = options), index++, true);
  };
}

function resolvePlatformSyncAndRoutingFamily(
  platformSyncAndRoutingFamily?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof platformSyncAndRoutingFamily != `string` ||
    platformSyncAndRoutingFamily === ``
  )
    return {
      family: `unknown`,
      major: 1,
    };
  for (let [family, resolvePlatformSyncAndRoutingFamilyResult] of [
    [`electron`, /\bElectron\/(\d{1,4})/],
    [`edge_ios`, /\bEdgiOS\/(\d{1,4})/],
    [`edge`, /\bEdg(?:e|A)?\/(\d{1,4})/],
    [`opera`, /\bOPR\/(\d{1,4})/],
    [`samsung`, /\bSamsungBrowser\/(\d{1,4})/],
    [`chrome_ios`, /\bCriOS\/(\d{1,4})/],
    [`firefox_ios`, /\bFxiOS\/(\d{1,4})/],
    [`firefox`, /\bFirefox\/(\d{1,4})/],
    [`chrome`, /\bChrome\/(\d{1,4})/],
    [`safari_mobile`, /\b(?:iPhone|iPad|iPod)\b.*\bVersion\/(\d{1,4}).*Safari/],
    [`safari`, /\bVersion\/(\d{1,4}).*\bSafari\//],
  ] as Dynamic) {
    let match: Dynamic = resolvePlatformSyncAndRoutingFamilyResult.exec(
      platformSyncAndRoutingFamily,
    );
    if (match !== null)
      return {
        family: family,
        major: Math.max(1, Math.min(65535, Number(match[1]) || 1)),
      };
  }
  return {
    family: `unknown`,
    major: 1,
  };
}

function createPagesEnvBrowserEvent(
  pagesEnvBrowserEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { family: key, major: count }: Dynamic =
    resolvePlatformSyncAndRoutingFamily(pagesEnvBrowserEvent);
  return {
    name: `pages.env.browser`,
    key: key,
    fields: {
      code: key,
      family: key,
      count: count,
      major: count,
      road: `host`,
    },
  };
}

var platformSyncAndRoutingBornHiddenBornVisibleValues: string[];

function resolvePlatformSyncAndRoutingHidden(
  platformSyncAndRoutingHidden?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    let visibilityState: Dynamic =
      platformSyncAndRoutingHidden?.visibilityState;
    return visibilityState === `hidden`
      ? `born:hidden`
      : visibilityState === `visible`
        ? `born:visible`
        : undefined;
  } catch {
    return;
  }
}

function resolvePlatformSyncAndRoutingWire2(
  platformSyncAndRoutingWire2?: Dynamic,
  word?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return word !== undefined &&
    platformSyncAndRoutingBornHiddenBornVisibleValues.includes(word)
    ? {
        ...platformSyncAndRoutingWire2,
        wire: {
          word: word,
        },
      }
    : platformSyncAndRoutingWire2;
}

var platformSyncAndRoutingSet4: Dynamic;

function resolvePlatformSyncAndRoutingIsFinite2(
  platformSyncAndRoutingIsFinite2?: unknown,
  ..._extraArguments: unknown[]
) {
  let platformSyncAndRoutingIsFinite22 =
    typeof platformSyncAndRoutingIsFinite2 == `number` &&
    Number.isFinite(platformSyncAndRoutingIsFinite2) &&
    platformSyncAndRoutingIsFinite2 >= 0
      ? platformSyncAndRoutingIsFinite2
      : 0;
  return platformSyncAndRoutingIsFinite22 < 100
    ? 100
    : platformSyncAndRoutingIsFinite22 < 300
      ? 300
      : platformSyncAndRoutingIsFinite22 < 1e3
        ? 1e3
        : 3e3;
}

function createPagesNetLinkEvent(
  pagesNetLinkEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (pagesNetLinkEvent == null) return null;
  let code: Dynamic = pagesNetLinkEvent.effectiveType;
  if (typeof code != `string` || !platformSyncAndRoutingSet4.has(code))
    return null;
  let count = resolvePlatformSyncAndRoutingIsFinite2(pagesNetLinkEvent.rtt);
  return {
    name: `pages.net.link`,
    key: `${code}|${count}`,
    fields: {
      code: code,
      link: code,
      count: count,
      rttMs: count,
      road: `host`,
    },
  };
}

function resolvePlatformSyncAndRoutingKey(
  ..._extraArguments: unknown[]
): Dynamic {
  let event: Dynamic;
  return (
    event2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    event !== undefined &&
    (event2.key === event.key ||
      (event2.fields.link === event.link &&
        options >= event.at &&
        options - event.at < 6e4))
      ? false
      : ((event = {
          key: event2.key,
          link: event2.fields.link,
          at: options,
        }),
        true);
}

var resolvePlatformSyncAndRoutingEmit: Dynamic;

function resolvePlatformSyncAndRoutingNow(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let updatePlatformSyncAndRoutingFields2: Dynamic =
    updatePlatformSyncAndRoutingFields({
      now: (..._extraArguments: unknown[]): Dynamic =>
        (scheduler.now ?? Date.now)(),
      schedule:
        scheduler.schedule ??
        ((
          platformSyncAndRoutingNow?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let setTimeout2 = setTimeout(platformSyncAndRoutingNow, options);
          return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
        }),
      say: (
        platformSyncAndRoutingNow?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => scheduler.emit(platformSyncAndRoutingNow),
    });
  return (
    platformSyncAndRoutingNow?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (platformSyncAndRoutingNow.layer !== `clientEvent`) {
      if (options === null) {
        if (
          platformSyncAndRoutingNow.layer === `link` &&
          platformSyncAndRoutingNow.name === `down.snapshot` &&
          platformSyncAndRoutingNow.partial !== true
        ) {
          updatePlatformSyncAndRoutingFields2.seat(scheduler.ids());
        }
        for (let resolvePlatformSyncAndRoutingNowResult of resolvePlatformSyncAndRoutingWire(
          platformSyncAndRoutingNow,
          scheduler.ids(),
          scheduler.plat?.(),
        ) as Dynamic)
          scheduler.emit(resolvePlatformSyncAndRoutingNowResult);
        return;
      }
      if (scheduler.isIframeBatch(options)) {
        let pagesEditorContainedEvent: Dynamic =
          createPagesEditorContainedEvent(platformSyncAndRoutingNow);
        if (pagesEditorContainedEvent !== null) {
          scheduler.emit(pagesEditorContainedEvent);
        }
        return;
      }
      for (let resolvePlatformSyncAndRoutingNowResult of updatePlatformSyncAndRoutingFields2.words(
        platformSyncAndRoutingNow,
        scheduler.ids(),
      ) as Dynamic)
        scheduler.emit(resolvePlatformSyncAndRoutingNowResult);
    }
  };
}

var platformSyncAndRoutingValue_1: boolean;

function installPlatformSyncAndRoutingWin(
  installPlatformSyncAndRoutingWin2: Dynamic = (
    installPlatformSyncAndRoutingWin3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => installPlatformSyncAndRoutingWin3(),
  options: Dynamic = resolvePlatformSyncAndRoutingEmit(),
  ..._extraArguments: unknown[]
): undefined {
  if (platformSyncAndRoutingValue_1) return;
  platformSyncAndRoutingValue_1 = true;
  let platformSyncAndRoutingHidden = resolvePlatformSyncAndRoutingHidden(
    options.doc,
  );
  options.onLaneLog(
    (
      installPlatformSyncAndRoutingWin3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let pagesLaneDeadEvent = createPagesLaneDeadEvent(
        installPlatformSyncAndRoutingWin3,
      );
      if (pagesLaneDeadEvent !== null) {
        options.emit(pagesLaneDeadEvent);
      }
    },
  );
  options.observeRing(resolvePlatformSyncAndRoutingNow(options));
  let { win: options2, doc: options3, nav: options4 }: Dynamic = options;
  let connection: Dynamic = options4?.connection;
  let enabled = false;
  let platformSyncAndRoutingKey: Dynamic = resolvePlatformSyncAndRoutingKey();
  let emit = (..._extraArguments: unknown[]): undefined => {
    if (!enabled) return;
    let pagesNetLinkEvent = createPagesNetLinkEvent(connection);
    if (
      pagesNetLinkEvent !== null &&
      platformSyncAndRoutingKey(pagesNetLinkEvent, (options.now ?? Date.now)())
    ) {
      options.emit(pagesNetLinkEvent);
    }
  };
  installPlatformSyncAndRoutingWin2(
    (..._extraArguments: unknown[]): undefined => {
      enabled = true;
      options.emit(
        resolvePlatformSyncAndRoutingWire2(
          createPagesEnvBrowserEvent(options4?.userAgent),
          platformSyncAndRoutingHidden,
        ),
      );
      emit();
    },
  );
  if (connection?.addEventListener) {
    connection.addEventListener(`change`, emit);
  }
  if (options2?.addEventListener) {
    options2.addEventListener(
      `offline`,
      (..._extraArguments: unknown[]): Dynamic =>
        options.emit(createPagesNetEvent(`offline`)),
    );
    options2.addEventListener(
      `online`,
      (..._extraArguments: unknown[]): Dynamic =>
        options.emit(createPagesNetEvent(`online`)),
    );
  }
  if (options3?.addEventListener) {
    let platformSyncAndRoutingValue7: Dynamic =
      resolvePlatformSyncAndRoutingValue7();
    options3.addEventListener(
      `visibilitychange`,
      (..._extraArguments: unknown[]): undefined => {
        let visibilityState: Dynamic = options3.visibilityState;
        if (
          (visibilityState === `hidden` || visibilityState === `visible`) &&
          platformSyncAndRoutingValue7(
            visibilityState,
            (options.now ?? Date.now)(),
          )
        ) {
          options.emit(createPagesNetEvent(visibilityState));
        }
      },
    );
  }
}

var platformSyncAndRoutingState: Dynamic;

var PlatformSyncAndRoutingVerb: {
    verb: boolean;
    fields: boolean;
    codes: boolean;
    exportDims: boolean;
};

var PlatformSyncAndRoutingSess: Dynamic;

var platformSyncAndRoutingValue_12: boolean;

var resolvePlatformSyncAndRoutingVerb: Dynamic;

function resolvePlatformSyncAndRoutingVerb2(
  platformSyncAndRoutingVerb2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingSess[options] = {
    verb: resolvePlatformSyncAndRoutingValue2(platformSyncAndRoutingVerb2),
    fields: resolvePlatformSyncAndRoutingValue5(platformSyncAndRoutingVerb2),
    codes: resolvePlatformSyncAndRoutingValue3(platformSyncAndRoutingVerb2),
    exportDims: resolvePlatformSyncAndRoutingValue4(
      platformSyncAndRoutingVerb2,
    ),
  };
  resolvePlatformSyncAndRoutingSess(options);
}

function resolvePlatformSyncAndRoutingSess(
  platformSyncAndRoutingSess?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    platformSyncAndRoutingSess === `sess` ||
    resolvePlatformSyncAndRoutingVerb()
  ) {
    platformSyncAndRoutingValue_12 = true;
  }
  platformSyncAndRoutingState?.gate();
  resolvePlatformSyncAndRoutingCodes();
}

var platformSyncAndRoutingValue_13: Dynamic;

var platformSyncAndRoutingValue_14: boolean;

var platformSyncAndRoutingValues: Dynamic;

function resolvePlatformSyncAndRoutingCodes(
  ..._extraArguments: unknown[]
): undefined {
  let platformSyncAndRoutingVerb: Dynamic = resolvePlatformSyncAndRoutingVerb();
  let codes: Dynamic =
    PlatformSyncAndRoutingSess.sess.codes ||
    PlatformSyncAndRoutingSess.card.codes;
  if (
    !(
      platformSyncAndRoutingValue_14 ||
      !platformSyncAndRoutingValue_13 ||
      !platformSyncAndRoutingVerb ||
      !codes
    )
  ) {
    platformSyncAndRoutingValue_14 = true;
    for (let resolvePlatformSyncAndRoutingCodesResult of platformSyncAndRoutingValues.splice(
      0,
    ) as Dynamic)
      try {
        resolvePlatformSyncAndRoutingCodesResult();
      } catch {}
  }
}

function resolvePlatformSyncAndRoutingPush(
  platformSyncAndRoutingPush?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!platformSyncAndRoutingValue_13 || platformSyncAndRoutingValue_14)
    return void platformSyncAndRoutingPush();
  platformSyncAndRoutingValues.push(platformSyncAndRoutingPush);
}

var PlatformSyncAndRoutingMessage: Dynamic;

function resolvePlatformSyncAndRoutingValue8(
  platformSyncAndRoutingValue8?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformSyncAndRoutingMessage = platformSyncAndRoutingValue8;
}

function resolvePlatformSyncAndRoutingSurface(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let context: Dynamic = {
    surface: (..._extraArguments: unknown[]) =>
      scheduler.frame ? `frame` : `standalone`,
    feBuild: (..._extraArguments: unknown[]): Dynamic => scheduler.feBuild,
    doorBuild: (..._extraArguments: unknown[]): Dynamic =>
      scheduler.frame ? `` : (scheduler.doorBuild() ?? ``),
    sc: scheduler.sc,
    page: (..._extraArguments: unknown[]): Dynamic =>
      PlatformSyncAndRoutingMessage,
  };
  platformSyncAndRoutingValue_13 = scheduler.frame;
  platformSyncAndRoutingState?.close();
  platformSyncAndRoutingState = undefined;
  if (!scheduler.frame)
    return {
      context: context,
      roads: {
        dd: scheduler.dd,
        console: scheduler.console,
      },
    };
  let door: Dynamic = resolvePlatformSyncAndRoutingThrew({
    advertised: resolvePlatformSyncAndRoutingVerb,
    heard: (..._extraArguments: unknown[]) => platformSyncAndRoutingValue_12,
    fieldsAdvertised: (..._extraArguments: unknown[]): Dynamic =>
      PlatformSyncAndRoutingSess.sess.fields ||
      PlatformSyncAndRoutingSess.card.fields,
    codesAdvertised: (..._extraArguments: unknown[]): Dynamic =>
      PlatformSyncAndRoutingSess.sess.codes ||
      PlatformSyncAndRoutingSess.card.codes,
    exportAdvertised: (..._extraArguments: unknown[]): Dynamic =>
      PlatformSyncAndRoutingSess.sess.exportDims ||
      PlatformSyncAndRoutingSess.card.exportDims,
    lane: (..._extraArguments: unknown[]): Dynamic => {
      let PlatformSyncAndRoutingMessage2: Dynamic =
        PlatformSyncAndRoutingMessage || scheduler.bootPage();
      try {
        return PlatformSyncAndRoutingMessage2
          ? scheduler.lane(`project/${PlatformSyncAndRoutingMessage2}`)
          : null;
      } catch {
        return null;
      }
    },
    mintOpId: scheduler.mintOpId,
    now: scheduler.now,
    ...(scheduler.schedule === undefined
      ? {}
      : {
          schedule: scheduler.schedule,
        }),
  });
  platformSyncAndRoutingState = door;
  scheduler.teardown?.(
    (..._extraArguments: unknown[]): Dynamic => door.close(),
  );
  return {
    context: context,
    roads: {
      dd: scheduler.dd,
      door: door,
      console: scheduler.console,
    },
    door: door,
  };
}

var installPlatformSyncAndRoutingFrame: Dynamic;

function resolvePlatformSyncAndRoutingContext(
  platformSyncAndRoutingContext: Dynamic = installPlatformSyncAndRoutingFrame(),
  ..._extraArguments: unknown[]
): undefined {
  let {
    context: platformSyncAndRoutingSurface,
    roads: platformSyncAndRoutingSurface2,
    door: platformSyncAndRoutingSurface3,
  }: Dynamic = resolvePlatformSyncAndRoutingSurface(
    platformSyncAndRoutingContext,
  );
  platformSyncAndRoutingState = platformSyncAndRoutingSurface3;
  resolveObservabilityTelemetryEntries(platformSyncAndRoutingSurface);
  resolveObservabilityTelemetryValue18(platformSyncAndRoutingSurface2);
  platformSyncAndRoutingContext.supportWords();
}

var platformSyncAndRoutingLogWarnErrorInfoValues: string[];

var resolvePlatformSyncAndRoutingMessage: Dynamic;

function loadPlatformSyncAndRoutingLevel(
  platformSyncAndRoutingLevel: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  if (!platformSyncAndRoutingLevel.force) return;
  let globalThis2: Dynamic = globalThis;
  if (globalThis2.__consoleSink) return;
  globalThis2.__consoleSink = true;
  let fetchFn: Dynamic =
    platformSyncAndRoutingLevel.fetchFn ??
    ((...platformSyncAndRoutingLevel2: Dynamic[]): Dynamic =>
      (fetch as Dynamic)(...platformSyncAndRoutingLevel2));
  let flushMs: Dynamic = platformSyncAndRoutingLevel.flushMs ?? 500;
  let maxQueue: Dynamic = platformSyncAndRoutingLevel.maxQueue ?? 200;
  let maxFailures: Dynamic = platformSyncAndRoutingLevel.maxFailures ?? 5;
  let cooldownMs: Dynamic = platformSyncAndRoutingLevel.cooldownMs ?? 3e4;
  let record2: Dynamic = {};
  for (let loadPlatformSyncAndRoutingLevelResult2 of platformSyncAndRoutingLogWarnErrorInfoValues as Dynamic)
    record2[loadPlatformSyncAndRoutingLevelResult2] = (console as Dynamic)[
      loadPlatformSyncAndRoutingLevelResult2
    ].bind(console);
  let items: Dynamic = [];
  let index: Dynamic = 0;
  let index2: Dynamic = 0;
  let enabled: Dynamic = false;
  let enabled2: Dynamic = false;
  let loadPlatformSyncAndRoutingLevelResult: Dynamic;
  let shift = (
    level?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled2) {
      if (items.length >= maxQueue) {
        items.shift();
        index++;
      }
      items.push({
        level: level,
        args: options.map(resolvePlatformSyncAndRoutingMessage),
        ts: Date.now(),
      });
    }
  };
  let unref = (..._extraArguments: unknown[]): undefined => {
    enabled2 = true;
    items.length = 0;
    index = 0;
    clearInterval(setInterval2);
    record2.warn(
      `[devLog] console sink paused after ${maxFailures} consecutive flush failures — retrying in ${cooldownMs / 1e3}s`,
    );
    loadPlatformSyncAndRoutingLevelResult = setTimeout(
      (..._extraArguments: unknown[]): undefined => {
        enabled2 = false;
        index2 = 0;
        items.push({
          level: `warn`,
          args: [
            `[devLog] sink resuming after a ${cooldownMs / 1e3}s pause (${maxFailures} consecutive flush failures)`,
          ],
          ts: Date.now(),
        });
        setInterval2 = setInterval(
          (..._extraArguments: unknown[]): undefined => void flush(),
          flushMs,
        );
        setInterval2.unref?.();
      },
      cooldownMs,
    );
    loadPlatformSyncAndRoutingLevelResult.unref?.();
  };
  let flush = async (..._extraArguments: unknown[]): Promise<undefined> => {
    if (enabled2 || enabled || (items.length === 0 && index === 0)) return;
    if (index > 0) {
      items.unshift({
        level: `warn`,
        args: [`[devLog] dropped ${index} entries (queue overflow)`],
        ts: Date.now(),
      });
      index = 0;
    }
    let entries: Dynamic = items.splice(0, items.length);
    enabled = true;
    try {
      let fetchFn2: Dynamic = await fetchFn(`/_dev/console`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          entries: entries,
        }),
        signal: AbortSignal.timeout(1e4),
      });
      if (enabled2) return;
      if (fetchFn2.ok) {
        index2 = 0;
      } else {
        if (++index2 >= maxFailures) {
          unref();
        }
      }
    } catch {
      if (enabled2) return;
      if (++index2 >= maxFailures) {
        unref();
      }
    } finally {
      enabled = false;
    }
  };
  let setInterval2: Dynamic = setInterval(
    (..._extraArguments: unknown[]): undefined => void flush(),
    flushMs,
  );
  setInterval2.unref?.();
  for (let loadPlatformSyncAndRoutingLevelResult2 of platformSyncAndRoutingLogWarnErrorInfoValues as Dynamic)
    (console as Dynamic)[loadPlatformSyncAndRoutingLevelResult2] = (
      ...platformSyncAndRoutingLevel2: Dynamic[]
    ): undefined => {
      (record2[loadPlatformSyncAndRoutingLevelResult2] as Dynamic)(
        ...platformSyncAndRoutingLevel2,
      );
      shift(
        loadPlatformSyncAndRoutingLevelResult2,
        platformSyncAndRoutingLevel2,
      );
    };
  if (typeof window !== "undefined") {
    (window as Dynamic).addEventListener(
      `error`,
      (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        shift(`error`, [error.message, error.filename, error.lineno]),
    );
    (window as Dynamic).addEventListener(
      `unhandledrejection`,
      (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        shift(`error`, [
          `unhandledrejection`,
          resolvePlatformSyncAndRoutingMessage(event.reason),
        ]),
    );
    (window as Dynamic).addEventListener(
      `pagehide`,
      (..._extraArguments: unknown[]): undefined => {
        if (!(enabled2 || enabled || items.length === 0))
          try {
            let body: Dynamic = JSON.stringify({
              entries: items.splice(0, items.length),
            });
            if (body.length > 6e4) return;
            fetchFn(`/_dev/console`, {
              method: `POST`,
              headers: {
                "Content-Type": `application/json`,
              },
              body: body,
              keepalive: true,
            }).catch((..._extraArguments: unknown[]): undefined => {});
          } catch {}
      },
    );
  }
  return {
    flush: flush,
    get disarmed(): Dynamic {
      return enabled2;
    },
    get queued(): Dynamic {
      return items.length;
    },
    uninstall: (..._extraArguments: unknown[]): undefined => {
      clearInterval(setInterval2);
      clearTimeout(loadPlatformSyncAndRoutingLevelResult);
      for (let loadPlatformSyncAndRoutingLevelResult2 of platformSyncAndRoutingLogWarnErrorInfoValues as Dynamic)
        (console as Dynamic)[loadPlatformSyncAndRoutingLevelResult2] =
          record2[loadPlatformSyncAndRoutingLevelResult2];
      items.length = 0;
      index = 0;
      enabled2 = true;
      delete globalThis2.__consoleSink;
    },
  };
}

var platformSyncAndRoutingPattern8: RegExp;

var platformSyncAndRoutingWeakSet2: Dynamic;

function resolvePlatformSyncAndRoutingValue9(
  platformSyncAndRoutingValue9?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof platformSyncAndRoutingValue9 != `object` ||
    !platformSyncAndRoutingValue9
    ? true
    : platformSyncAndRoutingWeakSet2.has(platformSyncAndRoutingValue9)
      ? false
      : (platformSyncAndRoutingWeakSet2.add(platformSyncAndRoutingValue9),
        true);
}

function installPlatformSyncAndRoutingOrigins(
  event: Dynamic = isPlatformSyncAndRoutingOnce(),
  ..._extraArguments: unknown[]
): undefined {
  let emit = (
    kind?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      if (!resolvePlatformSyncAndRoutingValue9(options)) return;
      if (resolvePlatformLoadingAndStatusName(options))
        return void resolvePlatformChunkLoadingStale(
          event.emit,
          event.chunkJudge,
          options,
        );
      let cls: Dynamic = resolveDataModelSchemasUnknown(options);
      let where: Dynamic = event.phase();
      let own: Dynamic = event.own?.() ?? {
        origins: [],
      };
      let record2: Dynamic = {
        ...resolveObservabilityTelemetryKind2(options, cls),
        ...resolveObservabilityTelemetryMsgKind2(options, cls),
        ...resolveObservabilityTelemetryThrown(options, cls, context, own),
      };
      event.emit({
        name: `pages.crash`,
        key: filterObservabilityTelemetryJoin(`host`, where, cls, record2),
        fields: {
          kind: kind,
          cls: cls,
          where: where,
          road: `host`,
          ...record2,
          ...resolveObservabilityTelemetryChunk(
            record2.srcKind,
            context,
            own.dir,
          ),
        },
      });
    } catch {}
  };
  try {
    event.target.addEventListener(
      `error`,
      (event2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let event3: Dynamic = event2;
        if (!(`error` in event3) || event2.defaultPrevented) return;
        let observabilityTelemetryMessage: Dynamic =
          resolveObservabilityTelemetryMessage(event2);
        if (
          !(
            typeof observabilityTelemetryMessage.message == `string` &&
            platformSyncAndRoutingPattern8.test(
              observabilityTelemetryMessage.message,
            )
          )
        ) {
          emit(`uncaught_error`, event3.error, observabilityTelemetryMessage);
        }
      },
      true,
    );
    event.target.addEventListener(
      `unhandledrejection`,
      (event2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!event2.defaultPrevented) {
          emit(`unhandled_rejection`, event2.reason);
        }
      },
    );
  } catch {}
}

function isPlatformSyncAndRoutingOnce(..._extraArguments: unknown[]): Dynamic {
  let matchesCondition =
    typeof document !== "undefined" && document.readyState === `complete`;
  if (!matchesCondition && typeof window !== "undefined") {
    window.addEventListener(
      `load`,
      (..._extraArguments: unknown[]): undefined =>
        void (matchesCondition = true),
      {
        once: true,
      },
    );
  }
  return {
    target: window,
    phase: (..._extraArguments: unknown[]) =>
      matchesCondition ? `live` : `boot`,
    emit: (
      platformSyncAndRoutingOnce?: Dynamic,
      ..._extraArguments: unknown[]
    ) => emitTelemetryEvent(platformSyncAndRoutingOnce),
    own: resolvePlatformSyncAndRoutingOrigins,
  };
}

function resolvePlatformSyncAndRoutingOrigins(
  ..._extraArguments: unknown[]
): Dynamic {
  let label = ``;
  let dir: Dynamic;
  try {
    let url = new URL(import.meta.url);
    label = url.origin;
    dir = `${url.origin}${url.pathname.slice(0, url.pathname.lastIndexOf(`/`) + 1)}`;
  } catch {}
  return {
    origins: [location.origin, label],
    doc: location.href.split(`#`, 1)[0],
    ...(dir === undefined
      ? {}
      : {
          dir: dir,
        }),
  };
}

var platformSyncAndRoutingValue120000: number;

var PlatformSyncAndRoutingState2: Dynamic;

function clearPlatformSyncAndRoutingDispose(
  clearPlatformSyncAndRoutingDispose2?: Dynamic,
  timers?: Dynamic,
  context: Dynamic = platformSyncAndRoutingValue120000,
  ..._extraArguments: unknown[]
): Dynamic {
  if (clearPlatformSyncAndRoutingDispose2 === undefined)
    return {
      ...PlatformSyncAndRoutingState2,
      dispose: (..._extraArguments: unknown[]): undefined => undefined,
    };
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let label: Dynamic = `visible`;
  let clearPlatformSyncAndRoutingDisposeResult: Dynamic = null;
  let timers2 = (
    clearPlatformSyncAndRoutingDispose3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (clearPlatformSyncAndRoutingDispose3 !== label) {
      label = clearPlatformSyncAndRoutingDispose3;
      for (let clearPlatformSyncAndRoutingDisposeResult2 of Array.from<Dynamic>(
        uniqueItems,
      ) as Dynamic)
        clearPlatformSyncAndRoutingDisposeResult2(
          clearPlatformSyncAndRoutingDispose3,
        );
    }
  };
  let clearPlatformSyncAndRoutingDisposeHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (clearPlatformSyncAndRoutingDisposeResult !== null) {
      timers.clearTimeout(clearPlatformSyncAndRoutingDisposeResult);
    }
    clearPlatformSyncAndRoutingDisposeResult = null;
  };
  let timers3 = (..._extraArguments: unknown[]): undefined => {
    if (clearPlatformSyncAndRoutingDispose2.visibilityState === `hidden`) {
      if (label !== `visible`) return;
      clearPlatformSyncAndRoutingDisposeHandler();
      clearPlatformSyncAndRoutingDisposeResult = timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          clearPlatformSyncAndRoutingDisposeResult = null;
          timers2(`idle`);
        },
        context,
      );
      timers2(`hidden`);
      return;
    }
    clearPlatformSyncAndRoutingDisposeHandler();
    timers2(`visible`);
  };
  clearPlatformSyncAndRoutingDispose2.addEventListener(
    `visibilitychange`,
    timers3,
  );
  timers3();
  return {
    state: (..._extraArguments: unknown[]): Dynamic => label,
    idle: (..._extraArguments: unknown[]) => label === `idle`,
    subscribe(
      clearPlatformSyncAndRoutingDispose3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(clearPlatformSyncAndRoutingDispose3);
      return (..._extraArguments: unknown[]): undefined =>
        void uniqueItems.delete(clearPlatformSyncAndRoutingDispose3);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      clearPlatformSyncAndRoutingDisposeHandler();
      clearPlatformSyncAndRoutingDispose2.removeEventListener(
        `visibilitychange`,
        timers3,
      );
      uniqueItems.clear();
    },
  };
}

function usePlatformSyncAndRoutingUseSyncExternalStore(
  platformSyncAndRoutingUseSyncExternalStore?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [
    updatePlatformSyncAndRoutingChange2,
    setUpdatePlatformSyncAndRoutingChange,
  ]: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      updatePlatformSyncAndRoutingChange(
        platformSyncAndRoutingUseSyncExternalStore,
      ),
    [platformSyncAndRoutingUseSyncExternalStore],
  );
  return (0, React.useSyncExternalStore)(
    updatePlatformSyncAndRoutingChange2,
    setUpdatePlatformSyncAndRoutingChange,
    (..._extraArguments: unknown[]) => false,
  );
}

var PlatformSyncAndRoutingState3: Dynamic;

var platformSyncAndRoutingWeakMap: Dynamic;

function updatePlatformSyncAndRoutingChange(
  updatePlatformSyncAndRoutingChange2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof window === "undefined" || typeof window.matchMedia != `function`)
    return PlatformSyncAndRoutingState3;
  let platformSyncAndRoutingWeakMapEntry: Dynamic =
    platformSyncAndRoutingWeakMap.get(window);
  if (!platformSyncAndRoutingWeakMapEntry) {
    platformSyncAndRoutingWeakMap.set(
      window,
      (platformSyncAndRoutingWeakMapEntry = new (Map as Dynamic)()),
    );
  }
  let platformSyncAndRoutingWeakMapEntryEntry: Dynamic =
    platformSyncAndRoutingWeakMapEntry.get(updatePlatformSyncAndRoutingChange2);
  if (!platformSyncAndRoutingWeakMapEntryEntry) {
    let matchMedia = window.matchMedia(updatePlatformSyncAndRoutingChange2);
    platformSyncAndRoutingWeakMapEntryEntry = [
      (
        updatePlatformSyncAndRoutingChange3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => (
        matchMedia.addEventListener(
          `change`,
          updatePlatformSyncAndRoutingChange3,
        ),
        (..._extraArguments: unknown[]) =>
          matchMedia.removeEventListener(
            `change`,
            updatePlatformSyncAndRoutingChange3,
          )
      ),
      (..._extraArguments: unknown[]) => matchMedia.matches,
    ];
    platformSyncAndRoutingWeakMapEntry.set(
      updatePlatformSyncAndRoutingChange2,
      platformSyncAndRoutingWeakMapEntryEntry,
    );
  }
  return platformSyncAndRoutingWeakMapEntryEntry;
}

var resolvePlatformSyncAndRoutingValue10: Dynamic;

function resolvePlatformSyncAndRoutingCompact(
  ..._extraArguments: unknown[]
): Dynamic {
  let matchesUiProviderAndLayersUseContext2 =
    resolveUiProviderAndLayersUseContext2() === `compact`;
  return resolvePlatformSyncAndRoutingValue10() &&
    !matchesUiProviderAndLayersUseContext2
    ? (
        platformSyncAndRoutingCompact?: Dynamic,
        ..._extraArguments: unknown[]
      ) => (platformSyncAndRoutingCompact === `sm` ? `lg` : undefined)
    : (
        platformSyncAndRoutingCompact?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        matchesUiProviderAndLayersUseContext2
          ? platformSyncAndRoutingCompact === `sm`
            ? `lg`
            : undefined
          : platformSyncAndRoutingCompact;
}

var PlatformSyncAndRoutingChatRow: Dynamic;

var resolvePlatformSyncAndRoutingValue11: (platformSyncAndRoutingValue11?: unknown, ..._extraArguments: unknown[]) => null;

var HiddenScreenshotter: Dynamic;

var DebugOverlay: Dynamic;

var ChatRow: Dynamic;

var ToolRow: Dynamic;

var pokeContainerChat: Dynamic;

var needsSenderLabels: (..._extraArguments: unknown[]) => boolean;

var senderDomainTrusted: (..._extraArguments: unknown[]) => boolean;

var PlatformSyncAndRoutingDataCopyScratch: string;

var resolvePlatformSyncAndRoutingWriteText: Dynamic;

function isPlatformSyncAndRoutingTextarea(
  platformSyncAndRoutingTextarea?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let document2: Dynamic = (globalThis as Dynamic).document;
  if (!document2?.body) return false;
  let activeElement2: Dynamic = options ? document2.activeElement : null;
  let selection: Dynamic = document2.getSelection?.();
  let items: Dynamic = [];
  if (selection)
    for (let index = 0; index < selection.rangeCount; index++)
      items.push(selection.getRangeAt(index).cloneRange());
  let element: Dynamic = document2.createElement(`textarea`);
  element.value = platformSyncAndRoutingTextarea;
  element.setAttribute(`readonly`, ``);
  element.setAttribute(PlatformSyncAndRoutingDataCopyScratch, ``);
  element.style.position = `fixed`;
  element.style.left = `-9999px`;
  element.style.top = `0`;
  document2.body.appendChild(element);
  try {
    element.select();
    return document2.execCommand(`copy`);
  } catch {
    return false;
  } finally {
    element.remove();
    if (options) {
      resolvePlatformSyncAndRoutingPreventScroll(
        document2,
        activeElement2,
        options.returnTo ?? null,
      );
    }
    if (selection) {
      selection.removeAllRanges();
      for (let isPlatformSyncAndRoutingTextareaResult of items as Dynamic)
        selection.addRange(isPlatformSyncAndRoutingTextareaResult);
    }
  }
}

function resolvePlatformSyncAndRoutingPreventScroll(
  document2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let resolvePlatformSyncAndRoutingPreventScrollHandler: Dynamic = (
    platformSyncAndRoutingPreventScroll?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSyncAndRoutingPreventScroll !== null &&
    platformSyncAndRoutingPreventScroll !== document2.body &&
    platformSyncAndRoutingPreventScroll !== document2.documentElement &&
    platformSyncAndRoutingPreventScroll.isConnected &&
    typeof platformSyncAndRoutingPreventScroll.focus == `function`;
  let activeElement2: Dynamic = document2.activeElement;
  if (
    activeElement2 !== null &&
    activeElement2 !== document2.body &&
    activeElement2 !== document2.documentElement
  )
    return;
  let options2: Dynamic = resolvePlatformSyncAndRoutingPreventScrollHandler(
    options,
  )
    ? options
    : resolvePlatformSyncAndRoutingPreventScrollHandler(context)
      ? context
      : null;
  try {
    options2?.focus({
      preventScroll: true,
    });
  } catch {}
}

async function loadPlatformSyncAndRoutingClipboard(
  platformSyncAndRoutingClipboard?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  options ??= resolvePlatformSyncAndRoutingWriteText(context);
  if (options.writeText)
    try {
      await options.writeText(platformSyncAndRoutingClipboard);
      return `clipboard`;
    } catch {}
  try {
    return options.execCopy(platformSyncAndRoutingClipboard) ? `exec` : false;
  } catch {
    return false;
  }
}

var platformSyncAndRoutingPattern9: RegExp;

var platformSyncAndRoutingState2: Dynamic;

var platformSyncAndRoutingSet5: Dynamic;

function resolvePlatformSyncAndRoutingFeBuild(
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    sc: liveSupportCode(),
    fe_build: `259dc54003a391cffb50b52b94c913ed15d92d1c`,
    ...(platformSyncAndRoutingState2
      ? {
          pid: platformSyncAndRoutingState2,
        }
      : {}),
  };
}

function resolvePlatformSyncAndRoutingTest(
  platformSyncAndRoutingTest?: unknown,
  ..._extraArguments: unknown[]
): undefined {
  let normalizedPlatformSyncAndRoutingTest =
    typeof platformSyncAndRoutingTest == `string` &&
    platformSyncAndRoutingPattern9.test(platformSyncAndRoutingTest)
      ? platformSyncAndRoutingTest.toLowerCase()
      : undefined;
  if (normalizedPlatformSyncAndRoutingTest === platformSyncAndRoutingState2)
    return;
  platformSyncAndRoutingState2 = normalizedPlatformSyncAndRoutingTest;
  let platformSyncAndRoutingFeBuild: Dynamic =
    resolvePlatformSyncAndRoutingFeBuild();
  for (let resolvePlatformSyncAndRoutingTestResult of platformSyncAndRoutingSet5 as Dynamic)
    resolvePlatformSyncAndRoutingTestResult(platformSyncAndRoutingFeBuild);
}

var PlatformSyncAndRoutingPrompt: Dynamic;

var resolvePlatformSyncAndRoutingValue12: (..._extraArguments: unknown[]) => null;

var resolvePlatformSyncAndRoutingValue13: (..._extraArguments: unknown[]) => null;

var PlatformSyncAndRoutingOpen: Dynamic;

var PlatformSyncAndRoutingTarget: Dynamic;

var PlatformSyncAndRoutingAssign: ((platformSyncAndRoutingAssign?: Dynamic, ..._extraArguments: unknown[]) => Dynamic) & {
    getState: (..._extraArguments: unknown[]) => Dynamic;
};

var PlatformSyncAndRoutingDialog: Dynamic;

var platformSyncAndRoutingPattern10: RegExp;

var PlatformSyncAndRoutingBongoFocusAck: string;

function resolvePlatformSyncAndRoutingValue14(
  platformSyncAndRoutingValue14?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    platformSyncAndRoutingValue14 === options ||
    helloMImport(platformSyncAndRoutingValue14)
  );
}

function resolvePlatformSyncAndRoutingProject(
  platformSyncAndRoutingProject?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof platformSyncAndRoutingProject != `object` ||
    !platformSyncAndRoutingProject
  )
    return null;
  let platformSyncAndRoutingProject2: Dynamic = platformSyncAndRoutingProject;
  if (
    platformSyncAndRoutingProject2.type !== `bongo:focus` ||
    platformSyncAndRoutingProject2.project === undefined
  )
    return null;
  let echo: Dynamic = {
    ...(typeof platformSyncAndRoutingProject2.project == `string`
      ? {
          project: platformSyncAndRoutingProject2.project,
        }
      : {}),
    ...(typeof platformSyncAndRoutingProject2.path == `string`
      ? {
          path: platformSyncAndRoutingProject2.path,
        }
      : {}),
  };
  return typeof platformSyncAndRoutingProject2.project != `string` ||
    !platformSyncAndRoutingPattern10.test(
      platformSyncAndRoutingProject2.project,
    ) ||
    (platformSyncAndRoutingProject2.path !== undefined &&
      (typeof platformSyncAndRoutingProject2.path != `string` ||
        !platformSessionAndSourcesPattern9.test(
          platformSyncAndRoutingProject2.path,
        )))
    ? {
        ok: false,
        echo: echo,
      }
    : {
        ok: true,
        project: platformSyncAndRoutingProject2.project.toLowerCase(),
        ...(platformSyncAndRoutingProject2.path === undefined
          ? {}
          : {
              path: platformSyncAndRoutingProject2.path,
            }),
        echo: echo,
      };
}

function resolvePlatformSyncAndRoutingKind2(
  platformSyncAndRoutingKind2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let container: Dynamic = {
    kind: `project`,
    id: platformSyncAndRoutingKind2,
  };
  return options === undefined
    ? resolveDataContentAndReferencesKind2(container)
    : resolveDataContentAndReferencesKind({
        container: container,
        ref: {
          noun: `file`,
          id: options,
        },
      });
}

async function loadPlatformSyncAndRoutingReplace(
  platformSyncAndRoutingReplace?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  if (
    !resolvePlatformSyncAndRoutingValue14(
      platformSyncAndRoutingReplace.origin,
      options.selfOrigin,
    )
  )
    return;
  let platformSyncAndRoutingProject: Dynamic =
    resolvePlatformSyncAndRoutingProject(platformSyncAndRoutingReplace.data);
  if (platformSyncAndRoutingProject === null) return;
  let postMessage = (
    platformSyncAndRoutingReplace2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    platformSyncAndRoutingReplace.source?.postMessage(
      {
        type: PlatformSyncAndRoutingBongoFocusAck,
        ...platformSyncAndRoutingProject.echo,
        ok: platformSyncAndRoutingReplace2,
      },
      platformSyncAndRoutingReplace.origin,
    );
  };
  if (!platformSyncAndRoutingProject.ok) {
    postMessage(false);
    return;
  }
  let claimFocus: Dynamic = options.claimFocus();
  let loadPlatformSyncAndRoutingReplaceResult: Dynamic;
  try {
    loadPlatformSyncAndRoutingReplaceResult = await options.probeRoom(
      platformSyncAndRoutingProject.project,
    );
  } catch {
    return;
  }
  if (!claimFocus()) return;
  if (!loadPlatformSyncAndRoutingReplaceResult) {
    postMessage(false);
    return;
  }
  let platformSyncAndRoutingKind2 = resolvePlatformSyncAndRoutingKind2(
    platformSyncAndRoutingProject.project,
    platformSyncAndRoutingProject.path,
  );
  let query = new URLSearchParams(options.currentSearch());
  let matchesQueryEntry = query.get(`chrome`) === `embed`;
  let hasLabel = query.has(`path`);
  if (options.currentPath() !== platformSyncAndRoutingKind2 || hasLabel) {
    options.navigate(
      platformSyncAndRoutingKind2 + (matchesQueryEntry ? `?chrome=embed` : ``),
      {
        replace: true,
      },
    );
  }
  postMessage(true);
}

function usePlatformSyncAndRoutingNavigate(
  ..._extraArguments: unknown[]
): undefined {
  let [, setObservabilityBrowserAndOperationEventsValue48]: Dynamic =
    resolveObservabilityBrowserAndOperationEventsValue48();
  let setObservabilityBrowserAndOperationEventsValue48Ref: Dynamic = (0,
  React.useRef)(setObservabilityBrowserAndOperationEventsValue48);
  setObservabilityBrowserAndOperationEventsValue48Ref.current =
    setObservabilityBrowserAndOperationEventsValue48;
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (window.parent === window) return;
    let index = 0;
    let loadPlatformSyncAndRoutingReplace2 = (
      platformSyncAndRoutingNavigate?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      loadPlatformSyncAndRoutingReplace(platformSyncAndRoutingNavigate, {
        navigate: (
          platformSyncAndRoutingNavigate2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          setObservabilityBrowserAndOperationEventsValue48Ref.current(
            platformSyncAndRoutingNavigate2,
            options,
          ),
        selfOrigin: window.location.origin,
        currentPath: (..._extraArguments: unknown[]): Dynamic =>
          resolvePlatformApiAndAuthStartsWith(window.location.pathname),
        currentSearch: (..._extraArguments: unknown[]) =>
          window.location.search,
        probeRoom: async (
          platformSyncAndRoutingNavigate2?: Dynamic,
          ..._extraArguments: unknown[]
        ) => {
          let response = await fetch(
            resolvePlatformApiAndAuthValue(
              resolvePlatformSessionAndSourcesValue19(
                platformSyncAndRoutingNavigate2,
              ),
            ),
            {
              signal: AbortSignal.timeout(4e3),
            },
          );
          response.body?.cancel();
          if (response.ok) return true;
          if (response.status >= 400 && response.status < 500) return false;
          throw Error(`transient probe status`);
        },
        claimFocus: (..._extraArguments: unknown[]): Dynamic => {
          let usePlatformSyncAndRoutingNavigateResult: Dynamic = ++index;
          return (..._extraArguments: unknown[]) =>
            usePlatformSyncAndRoutingNavigateResult === index;
        },
      });
    };
    window.addEventListener(`message`, loadPlatformSyncAndRoutingReplace2);
    return (..._extraArguments: unknown[]) =>
      window.removeEventListener(`message`, loadPlatformSyncAndRoutingReplace2);
  }, []);
}

var PlatformSyncAndRoutingSystem: Dynamic;

var PlatformSyncAndRoutingState4: Dynamic;

var PlatformSyncAndRoutingState5: Dynamic;

var isPlatformSyncAndRoutingValue: (platformSyncAndRoutingValue?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolvePlatformSyncAndRoutingValue15(
  platformSyncAndRoutingValue15?: Dynamic,
  options: Dynamic = inFrame(),
  ..._extraArguments: unknown[]
) {
  return isPlatformSyncAndRoutingValue(options)
    ? resolveEditorHostIsFinite2(platformSyncAndRoutingValue15)
    : 100;
}

var PlatformSyncAndRoutingCenter: Dynamic;

function resolvePlatformSyncAndRoutingLeft(
  platformSyncAndRoutingLeft?: Dynamic,
  options: Dynamic = inFrame(),
  ..._extraArguments: unknown[]
) {
  return isPlatformSyncAndRoutingValue(options) &&
    platformSyncAndRoutingLeft === `left`
    ? `left`
    : `center`;
}

var resolvePlatformSyncAndRoutingValue16: Dynamic;

var resolvePlatformSyncAndRoutingMatchMedia: Dynamic;

function resolvePlatformSyncAndRoutingLight(..._extraArguments: unknown[]) {
  if (typeof document === "undefined") return null;
  let theme = document.documentElement.dataset.theme;
  return theme === `light` || theme === `dark` ? theme : null;
}

function resolvePlatformSyncAndRoutingDark(
  platformSyncAndRoutingDark?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options.framed
    ? (options.host ?? (options.osDark ? `dark` : `light`))
    : platformSyncAndRoutingDark === `system`
      ? options.osDark
        ? `dark`
        : `light`
      : platformSyncAndRoutingDark;
}

function resolvePlatformSyncAndRoutingFramed(
  platformSyncAndRoutingFramed?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformSyncAndRoutingDark(platformSyncAndRoutingFramed, {
    framed: inFrame(),
    host: resolvePlatformSyncAndRoutingLight(),
    osDark: resolvePlatformSyncAndRoutingMatchMedia()?.matches ?? false,
  });
}

function resolvePlatformSyncAndRoutingMeta(
  platformSyncAndRoutingMeta?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  document.body.dataset.mode = platformSyncAndRoutingMeta;
  let matchedElement: Dynamic = document.querySelector(
    `meta[name="color-scheme"]`,
  );
  if (!matchedElement) {
    matchedElement = document.createElement(`meta`);
    matchedElement.name = `color-scheme`;
    document.head.appendChild(matchedElement);
  }
  matchedElement.content = platformSyncAndRoutingMeta;
}

var PlatformSyncAndRoutingSubscribe: Dynamic;

var PlatformSyncAndRoutingSubscribe2: Dynamic;

function usePlatformSyncAndRoutingFramed(
  ..._extraArguments: unknown[]
): Dynamic {
  let PlatformSyncAndRoutingSystem2: Dynamic = PlatformSyncAndRoutingSystem(
    (
      platformSyncAndRoutingFramed?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformSyncAndRoutingFramed.value,
  );
  let osDark: Dynamic = (0, React.useSyncExternalStore)(
    PlatformSyncAndRoutingSubscribe.subscribe,
    PlatformSyncAndRoutingSubscribe.get,
    (..._extraArguments: unknown[]) => false,
  );
  let host: Dynamic = (0, React.useSyncExternalStore)(
    PlatformSyncAndRoutingSubscribe2.subscribe,
    PlatformSyncAndRoutingSubscribe2.get,
    (..._extraArguments: unknown[]) => null,
  );
  return resolvePlatformSyncAndRoutingDark(PlatformSyncAndRoutingSystem2, {
    framed: inFrame(),
    host: host,
    osDark: osDark,
  });
}

function usePlatformSyncAndRoutingSystem(
  ..._extraArguments: unknown[]
): Dynamic {
  let PlatformSyncAndRoutingSystem2: Dynamic = PlatformSyncAndRoutingSystem(
    (
      platformSyncAndRoutingSystem?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => platformSyncAndRoutingSystem.value,
  );
  let [
    platformSyncAndRoutingFramedState,
    setPlatformSyncAndRoutingFramedState,
  ]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformSyncAndRoutingFramed(PlatformSyncAndRoutingSystem2),
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let resolvePlatformSyncAndRoutingMeta2 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        let platformSyncAndRoutingFramed: Dynamic =
          resolvePlatformSyncAndRoutingFramed(PlatformSyncAndRoutingSystem2);
        setPlatformSyncAndRoutingFramedState(platformSyncAndRoutingFramed);
        resolvePlatformSyncAndRoutingMeta(platformSyncAndRoutingFramed);
      };
      resolvePlatformSyncAndRoutingMeta2();
      let inFrame2: Dynamic = inFrame();
      let platformSyncAndRoutingMatchMedia: Dynamic =
        inFrame2 || PlatformSyncAndRoutingSystem2 === `system`
          ? resolvePlatformSyncAndRoutingMatchMedia()
          : null;
      platformSyncAndRoutingMatchMedia?.addEventListener(
        `change`,
        resolvePlatformSyncAndRoutingMeta2,
      );
      let subscribe: Dynamic = inFrame2
        ? PlatformSyncAndRoutingSubscribe2.subscribe(
            resolvePlatformSyncAndRoutingMeta2,
          )
        : (..._extraArguments: unknown[]): undefined => {};
      return (..._extraArguments: unknown[]): undefined => {
        platformSyncAndRoutingMatchMedia?.removeEventListener(
          `change`,
          resolvePlatformSyncAndRoutingMeta2,
        );
        subscribe();
      };
    },
    [PlatformSyncAndRoutingSystem2],
  );
  return platformSyncAndRoutingFramedState;
}

var platformSyncAndRoutingValue10000: number;

var PlatformSyncAndRoutingEmit: Dynamic;

function resolvePlatformSyncAndRoutingEmit2(
  platformSyncAndRoutingEmit2?: Dynamic,
  options: Dynamic = PlatformSyncAndRoutingEmit,
  ..._extraArguments: unknown[]
): Dynamic {
  let pagesLinkReconnectEvent = createPagesLinkReconnectEvent2(
    platformSyncAndRoutingEmit2,
  );
  if (pagesLinkReconnectEvent !== null)
    return options.emit(pagesLinkReconnectEvent);
  let observabilityBrowserAndOperationEventsLane: Dynamic =
    resolveObservabilityBrowserAndOperationEventsLane(
      platformSyncAndRoutingEmit2,
    );
  if (observabilityBrowserAndOperationEventsLane !== null)
    return options.emit(observabilityBrowserAndOperationEventsLane);
  let pagesLaneParkedEvent = createPagesLaneParkedEvent(
    platformSyncAndRoutingEmit2,
  );
  if (pagesLaneParkedEvent !== null) return options.emit(pagesLaneParkedEvent);
  let pagesLaneResultLostEvent = createPagesLaneResultLostEvent(
    platformSyncAndRoutingEmit2,
  );
  if (pagesLaneResultLostEvent !== null)
    return options.emit(pagesLaneResultLostEvent);
  let pagesFenceViewerEvent = createPagesFenceViewerEvent(
    platformSyncAndRoutingEmit2,
  );
  if (pagesFenceViewerEvent !== null) {
    options.later(
      (..._extraArguments: unknown[]): Dynamic =>
        options.emit(pagesFenceViewerEvent),
      platformSyncAndRoutingValue10000,
    );
  }
}

var PlatformSyncAndRoutingActionsPage: Dynamic;

var PlatformSyncAndRoutingThisPage: Dynamic;

var ActionsPage: Dynamic;

var Debug: Dynamic;

var Home: Dynamic;

var ProjectsRouteGate: Dynamic;

var Runs: Dynamic;

var SuiteRun: Dynamic;

var ManifestReplay: Dynamic;

var Sessions: Dynamic;

var Settings: Dynamic;

var SettingsButton: (..._extraArguments: unknown[]) => null;

var SuiteRunsHome: Dynamic;

var Workspace: Dynamic;

var TranscriptFoldDebug: Dynamic;

var FilmedMountDebug: Dynamic;

var forgetWorkspace: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformSyncAndRouting1Step1(): void {
  isEditorHostPageNamed();
  (platformSyncAndRoutingValue0_4 = 0.4);
  (PlatformSyncAndRoutingClientEvent = `clientEvent`);
  (PlatformSyncAndRoutingClientEventFields = `clientEventFields`);
  (PlatformSyncAndRoutingClientEventCodes = `clientEventCodes`);
  (PlatformSyncAndRoutingClientEventExport = `clientEventExport`);
  (resolvePlatformSyncAndRoutingValue = (
    platformSyncAndRoutingValue?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformSyncAndRoutingValue === true ||
    platformSyncAndRoutingValue === 1 ||
    platformSyncAndRoutingValue === `1`);
  (platformSyncAndRoutingPattern = /^[A-Za-z0-9_.:-]{1,64}$/);
  (platformSyncAndRoutingPattern2 = /^[a-z0-9_.:-]{1,48}$/);
  (platformSyncAndRoutingPattern3 = /^[a-z0-9_.:-]{1,32}$/);
  (platformSyncAndRoutingPattern4 = /^[0-9a-f]{8}-[0-9a-f]{4}$/);
  (platformSyncAndRoutingPattern5 = /^[0-9a-f]{7,40}$/);
  (platformSyncAndRoutingSet = new (Set as Dynamic)([
    `error`,
    `warn`,
    `perf`,
    `lifecycle`,
  ]));
  (platformSyncAndRoutingWeakSet = new (WeakSet as Dynamic)());
  (platformSyncAndRoutingPattern6 = /^lane:dead:([A-Z_]{2,32})(?: sc=|$)/);
  (resolvePlatformSyncAndRoutingFileId = (
    platformSyncAndRoutingFileId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ...(typeof platformSyncAndRoutingFileId.fileId == `string` &&
    platformSyncAndRoutingFileId.fileId !== ``
      ? {
          fileId: platformSyncAndRoutingFileId.fileId,
        }
      : {}),
    ...(typeof platformSyncAndRoutingFileId.node == `string` &&
    platformSyncAndRoutingFileId.node !== ``
      ? {
          node: platformSyncAndRoutingFileId.node,
        }
      : {}),
  }));
  (PlatformSyncAndRoutingState = [1e4, 5e3, 2e3, 1e3, 500]);
  (resolvePlatformSyncAndRoutingValue6 = (
    platformSyncAndRoutingValue6?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSyncAndRoutingValue6 == `string` &&
    observabilityTelemetrySet19.has(platformSyncAndRoutingValue6)
      ? platformSyncAndRoutingValue6
      : undefined);
  (platformSyncAndRoutingPattern7 = /^http_(\d{3})$/);
  (resolvePlatformSyncAndRoutingExec = (
    platformSyncAndRoutingExec?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let match = platformSyncAndRoutingPattern7.exec(platformSyncAndRoutingExec);
    return match === null ? undefined : Number(match[1]);
  });
  (PlatformSyncAndRoutingHung = {
    hung: `timeout`,
    unanswered: `network`,
    refused: `rejected`,
    shed: `busy`,
  });
  (resolvePlatformSyncAndRoutingCode = (
    platformSyncAndRoutingCode?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let code: Dynamic =
      typeof platformSyncAndRoutingCode == `string` &&
      Object.hasOwn(PlatformSyncAndRoutingHung, platformSyncAndRoutingCode)
        ? PlatformSyncAndRoutingHung[platformSyncAndRoutingCode]
        : undefined;
    return code === undefined
      ? {}
      : {
          code: code,
        };
  });
  (resolvePlatformSyncAndRoutingIsInteger = (
    platformSyncAndRoutingIsInteger?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSyncAndRoutingIsInteger == `number` &&
    Number.isInteger(platformSyncAndRoutingIsInteger)
      ? Math.max(1, Math.min(65535, platformSyncAndRoutingIsInteger))
      : 1);
  (platformSyncAndRoutingValue64 = 64);
  (platformSyncAndRoutingValue2000 = 2e3);
  (platformSyncAndRoutingValue60000 = 6e4);
  (platformSyncAndRoutingSet2 = new (Set as Dynamic)([
    `command`,
    `dispatch`,
    `dispatch:after-apply`,
    `window`,
  ]));
  (platformSyncAndRoutingSet3 = new (Set as Dynamic)([
    `order`,
    `snapshot`,
    `comments`,
    `row`,
    `ack`,
    `deny`,
    `state`,
    `staged`,
    `session`,
    `peers`,
    `threads`,
    `tick`,
    `focus`,
    `dump`,
  ]));
  (platformSyncAndRoutingBornHiddenBornVisibleValues = [
    `born:hidden`,
    `born:visible`,
  ]);
  (platformSyncAndRoutingSet4 = new (Set as Dynamic)([
    `slow-2g`,
    `2g`,
    `3g`,
    `4g`,
  ]));
  (resolvePlatformSyncAndRoutingEmit = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let globalThis2: Dynamic = globalThis;
    return {
      emit: (
        platformSyncAndRoutingEmit?: Dynamic,
        ..._extraArguments: unknown[]
      ) => emitTelemetryEvent(platformSyncAndRoutingEmit),
      onLaneLog: onFrameShellLog,
      observeRing: resolveCommentsStoreValue25,
      isIframeBatch: (
        platformSyncAndRoutingEmit?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSyncAndRoutingWeakSet.has(platformSyncAndRoutingEmit),
      ids: resolveCommentsStoreValue32,
      plat: resolveObservabilityBrowserAndOperationEventsValue3,
      nav: globalThis2.navigator,
      win: globalThis2.window,
      doc: globalThis2.document,
    };
  });
  (platformSyncAndRoutingValue_1 = false);
  (PlatformSyncAndRoutingVerb = {
    verb: false,
    fields: false,
    codes: false,
    exportDims: false,
  });
  (PlatformSyncAndRoutingSess = {
    sess: {
      ...PlatformSyncAndRoutingVerb,
    },
    card: {
      ...PlatformSyncAndRoutingVerb,
    },
  });
  (platformSyncAndRoutingValue_12 = false);
  (resolvePlatformSyncAndRoutingVerb = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingSess.sess.verb || PlatformSyncAndRoutingSess.card.verb);
  (platformSyncAndRoutingValue_13 = false);
  (platformSyncAndRoutingValue_14 = false);
  (platformSyncAndRoutingValues = []);
  (PlatformSyncAndRoutingMessage = ``);
  (installPlatformSyncAndRoutingFrame = (
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    frame: inFrame(),
    feBuild: ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c,
    doorBuild: (..._extraArguments: unknown[]): Dynamic => serverRev(),
    sc: (..._extraArguments: unknown[]): Dynamic => liveSupportCode(),
    dd: ddLog,
    lane: (
      installPlatformSyncAndRoutingFrame2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => frameLane(installPlatformSyncAndRoutingFrame2),
    bootPage: (..._extraArguments: unknown[]): Dynamic => {
      let frameBootContainer2: Dynamic = frameBootContainer();
      return frameBootContainer2 === null ||
        frameBootContainer2.kind !== `project`
        ? null
        : frameBootContainer2.id;
    },
    mintOpId: (..._extraArguments: unknown[]) => crypto.randomUUID(),
    now: (..._extraArguments: unknown[]) => Date.now(),
    schedule: (
      installPlatformSyncAndRoutingFrame2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let setTimeout2 = setTimeout(installPlatformSyncAndRoutingFrame2, options);
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    console: (
      installPlatformSyncAndRoutingFrame2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => console.warn(installPlatformSyncAndRoutingFrame2),
    supportWords: (..._extraArguments: unknown[]) =>
      installPlatformSyncAndRoutingWin(resolvePlatformSyncAndRoutingPush),
    teardown: (
      installPlatformSyncAndRoutingFrame2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (
        typeof window !== "undefined" &&
        window.addEventListener(
          `pagehide`,
          (event?: Dynamic, ..._extraArguments: unknown[]): undefined =>
            void (event.persisted || installPlatformSyncAndRoutingFrame2()),
        )
      ),
  }));
  (platformSyncAndRoutingLogWarnErrorInfoValues = [
    `log`,
    `warn`,
    `error`,
    `info`,
    `debug`,
  ]);
  (resolvePlatformSyncAndRoutingMessage = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (error instanceof Error)
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    try {
      return JSON.parse(JSON.stringify(error));
    } catch {
      return String(error);
    }
  });
  (platformSyncAndRoutingPattern8 = /^ResizeObserver loop/);
  (platformSyncAndRoutingWeakSet2 = new (WeakSet as Dynamic)());
  (platformSyncAndRoutingValue120000 = 12e4);
  (PlatformSyncAndRoutingState2 = {
    state: (..._extraArguments: unknown[]) => `visible`,
    idle: (..._extraArguments: unknown[]) => false,
    subscribe:
      (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined =>
        undefined,
  });
  (PlatformSyncAndRoutingState3 = [
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {},
    (..._extraArguments: unknown[]) => false,
  ]);
  (platformSyncAndRoutingWeakMap = new (WeakMap as Dynamic)());
  (resolvePlatformSyncAndRoutingValue10 = (
    ..._extraArguments: unknown[]
  ): Dynamic => usePlatformSyncAndRoutingUseSyncExternalStore(EditorHostStyles12));
  (PlatformSyncAndRoutingChatRow = rolldownNImport({
    ChatRow: (..._extraArguments: unknown[]): Dynamic => ChatRow,
    DebugOverlay: (..._extraArguments: unknown[]): Dynamic => DebugOverlay,
    HiddenScreenshotter: (..._extraArguments: unknown[]): Dynamic =>
      HiddenScreenshotter,
    ToolRow: (..._extraArguments: unknown[]): Dynamic => ToolRow,
    default: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformSyncAndRoutingValue11,
    needsSenderLabels: (..._extraArguments: unknown[]): Dynamic =>
      needsSenderLabels,
    pokeContainerChat: (..._extraArguments: unknown[]): Dynamic =>
      pokeContainerChat,
    senderDomainTrusted: (..._extraArguments: unknown[]): Dynamic =>
      senderDomainTrusted,
  }));
  (resolvePlatformSyncAndRoutingValue11 = (
    platformSyncAndRoutingValue11?: unknown,
    ..._extraArguments: unknown[]
  ) => null);
  (HiddenScreenshotter = resolvePlatformSyncAndRoutingValue11);
  (DebugOverlay = resolvePlatformSyncAndRoutingValue11);
  (ChatRow = resolvePlatformSyncAndRoutingValue11);
  (ToolRow = resolvePlatformSyncAndRoutingValue11);
  (pokeContainerChat = resolvePlatformApiAndAuthValue17);
  (needsSenderLabels = (..._extraArguments: unknown[]) => false);
  (senderDomainTrusted = (..._extraArguments: unknown[]) => false);
  (PlatformSyncAndRoutingDataCopyScratch = `data-copy-scratch`);
  (resolvePlatformSyncAndRoutingWriteText = (
    returnTo?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let clipboard: Dynamic = (globalThis as Dynamic).navigator?.clipboard;
    return {
      writeText: clipboard?.writeText
        ? clipboard.writeText.bind(clipboard)
        : undefined,
      execCopy: (
        platformSyncAndRoutingWriteText?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        isPlatformSyncAndRoutingTextarea(platformSyncAndRoutingWriteText, {
          returnTo: returnTo,
        }),
    };
  });
  (platformSyncAndRoutingPattern9 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  (platformSyncAndRoutingSet5 = new (Set as Dynamic)());
  (PlatformSyncAndRoutingPrompt = create(
    (
      platformSyncAndRoutingPrompt?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let platformSyncAndRoutingPromptResult: Dynamic = null;
      return {
        prompt: null,
        ask: (prompt?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          new (Promise as Dynamic)(
            (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              platformSyncAndRoutingPromptResult?.(`cancel`);
              platformSyncAndRoutingPromptResult = resolve;
              platformSyncAndRoutingPrompt({
                prompt: prompt,
              });
            },
          ),
        decide: (
          platformSyncAndRoutingPrompt2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let platformSyncAndRoutingPromptResult2: Dynamic =
            platformSyncAndRoutingPromptResult;
          platformSyncAndRoutingPromptResult = null;
          platformSyncAndRoutingPrompt({
            prompt: null,
          });
          platformSyncAndRoutingPromptResult2?.(platformSyncAndRoutingPrompt2);
        },
      };
    },
  ));
  (resolvePlatformSyncAndRoutingValue12 = (..._extraArguments: unknown[]) =>
    null);
  (resolvePlatformSyncAndRoutingValue13 = (..._extraArguments: unknown[]) =>
    null);
  (PlatformSyncAndRoutingOpen = {
    open: (
      path?: Dynamic,
      hash?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `peek`,
        path: path,
        ...(hash === undefined
          ? {}
          : {
              hash: hash,
            }),
      }),
    close: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformApiAndAuthDispatch({
        type: `peek-close`,
      }),
  });
  (PlatformSyncAndRoutingTarget = updatePlatformApiAndAuthDeps(
    (
      platformSyncAndRoutingTarget?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => [platformSyncAndRoutingTarget.peek],
    (
      platformSyncAndRoutingTarget?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      target: platformSyncAndRoutingTarget.peek ?? null,
      ...PlatformSyncAndRoutingOpen,
    }),
  ));
  (PlatformSyncAndRoutingAssign = Object.assign(
    function (
      platformSyncAndRoutingAssign?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return resolvePlatformApiAndAuthState3(
        PlatformSyncAndRoutingTarget,
        platformSyncAndRoutingAssign,
      );
    },
    {
      getState: (..._extraArguments: unknown[]): Dynamic =>
        PlatformSyncAndRoutingTarget(
          resolvePlatformApiAndAuthState4(),
          PlatformApiAndAuthState2,
        ),
    },
  ));
  (PlatformSyncAndRoutingDialog = create(
    (
      platformSyncAndRoutingDialog?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      dialog: null,
      working: (title?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        platformSyncAndRoutingDialog({
          dialog: {
            phase: `working`,
            title: title,
          },
        }),
      done: (
        platformSyncAndRoutingDialog2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformSyncAndRoutingDialog({
          dialog: {
            phase: `done`,
            ...platformSyncAndRoutingDialog2,
          },
        }),
      clear: (..._extraArguments: unknown[]): Dynamic =>
        platformSyncAndRoutingDialog({
          dialog: null,
        }),
    }),
  ));
  (platformSyncAndRoutingPattern10 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  (PlatformSyncAndRoutingBongoFocusAck = `bongo:focus:ack`);
  updateDataModelSchemasValue(`settings.panelOpen`, true);
  updateDataModelSchemasValue(`settings.elevatedArtifact`, true);
  (PlatformSyncAndRoutingSystem = updateDataModelSchemasValue(
    `settings.theme`,
    `system`,
  ));
  (PlatformSyncAndRoutingState4 = updateDataModelSchemasValue(
    `settings.historyRailOpen`,
    false,
  ));
  (PlatformSyncAndRoutingState5 = updateDataModelSchemasValue(
    `view.zoom`,
    100,
  ));
  (isPlatformSyncAndRoutingValue = (
    platformSyncAndRoutingValue: Dynamic = inFrame(),
    ..._extraArguments: unknown[]
  ) => !platformSyncAndRoutingValue);
  (PlatformSyncAndRoutingCenter = updateDataModelSchemasValue(
    `settings.pageLayout`,
    `center`,
  ));
  (resolvePlatformSyncAndRoutingValue16 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformSyncAndRoutingCenter(
      (platformSyncAndRoutingValue16?: Dynamic, ..._extraArguments: unknown[]) =>
        resolvePlatformSyncAndRoutingLeft(platformSyncAndRoutingValue16.value),
    ));
  (resolvePlatformSyncAndRoutingMatchMedia = (
    ..._extraArguments: unknown[]
  ) =>
    typeof window !== "undefined" && typeof window.matchMedia == `function`
      ? window.matchMedia(`(prefers-color-scheme: dark)`)
      : null);
  (PlatformSyncAndRoutingSubscribe = {
    subscribe: (
      platformSyncAndRoutingSubscribe?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let platformSyncAndRoutingMatchMedia: Dynamic =
        resolvePlatformSyncAndRoutingMatchMedia();
      return platformSyncAndRoutingMatchMedia
        ? (platformSyncAndRoutingMatchMedia.addEventListener(
            `change`,
            platformSyncAndRoutingSubscribe,
          ),
          (..._extraArguments: unknown[]): Dynamic =>
            platformSyncAndRoutingMatchMedia.removeEventListener(
              `change`,
              platformSyncAndRoutingSubscribe,
            ))
        : (..._extraArguments: unknown[]): undefined => {};
    },
    get: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformSyncAndRoutingMatchMedia()?.matches ?? false,
  });
  (PlatformSyncAndRoutingSubscribe2 = {
    subscribe: (
      platformSyncAndRoutingSubscribe2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (!inFrame() || typeof MutationObserver === "undefined")
        return (..._extraArguments: unknown[]): undefined => {};
      let mutationObserver = new MutationObserver(
        platformSyncAndRoutingSubscribe2,
      );
      mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [`data-theme`],
      });
      return (..._extraArguments: unknown[]) => mutationObserver.disconnect();
    },
    get: (..._extraArguments: unknown[]) =>
      inFrame() ? resolvePlatformSyncAndRoutingLight() : null,
  });
  (platformSyncAndRoutingValue10000 = 1e4);
  (PlatformSyncAndRoutingEmit = {
    emit: (platformSyncAndRoutingEmit?: Dynamic, ..._extraArguments: unknown[]) =>
      emitTelemetryEvent(platformSyncAndRoutingEmit),
    later: (
      platformSyncAndRoutingEmit?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void setTimeout(platformSyncAndRoutingEmit, options),
  });
  (PlatformSyncAndRoutingActionsPage = rolldownNImport({
    ActionsPage: (..._extraArguments: unknown[]): Dynamic => ActionsPage,
    Debug: (..._extraArguments: unknown[]): Dynamic => Debug,
    FilmedMountDebug: (..._extraArguments: unknown[]): Dynamic =>
      FilmedMountDebug,
    Home: (..._extraArguments: unknown[]): Dynamic => Home,
    ManifestReplay: (..._extraArguments: unknown[]): Dynamic => ManifestReplay,
    ProjectsRouteGate: (..._extraArguments: unknown[]): Dynamic =>
      ProjectsRouteGate,
    Runs: (..._extraArguments: unknown[]): Dynamic => Runs,
    Sessions: (..._extraArguments: unknown[]): Dynamic => Sessions,
    Settings: (..._extraArguments: unknown[]): Dynamic => Settings,
    SettingsButton: (..._extraArguments: unknown[]): Dynamic => SettingsButton,
    SuiteRun: (..._extraArguments: unknown[]): Dynamic => SuiteRun,
    SuiteRunsHome: (..._extraArguments: unknown[]): Dynamic => SuiteRunsHome,
    TranscriptFoldDebug: (..._extraArguments: unknown[]): Dynamic =>
      TranscriptFoldDebug,
    Workspace: (..._extraArguments: unknown[]): Dynamic => Workspace,
    default: (..._extraArguments: unknown[]): Dynamic =>
      PlatformSyncAndRoutingThisPage,
    forgetWorkspace: (..._extraArguments: unknown[]): Dynamic => forgetWorkspace,
  }));
  (PlatformSyncAndRoutingThisPage = PlatformApiAndAuthWhat(`This page`));
  (ActionsPage = PlatformSyncAndRoutingThisPage);
  (Debug = PlatformSyncAndRoutingThisPage);
  (Home = PlatformSyncAndRoutingThisPage);
  (ProjectsRouteGate = PlatformSyncAndRoutingThisPage);
  (Runs = PlatformSyncAndRoutingThisPage);
  (SuiteRun = PlatformSyncAndRoutingThisPage);
  (ManifestReplay = PlatformSyncAndRoutingThisPage);
  (Sessions = PlatformSyncAndRoutingThisPage);
  (Settings = PlatformSyncAndRoutingThisPage);
  (SettingsButton = (..._extraArguments: unknown[]) => null);
  (SuiteRunsHome = PlatformSyncAndRoutingThisPage);
  (Workspace = PlatformSyncAndRoutingThisPage);
  (TranscriptFoldDebug = PlatformSyncAndRoutingThisPage);
  (FilmedMountDebug = PlatformSyncAndRoutingThisPage);
  (forgetWorkspace = resolvePlatformApiAndAuthValue17);
}

export {
  Debug,
  DebugOverlay,
  HiddenScreenshotter,
  PlatformSyncAndRoutingActionsPage,
  PlatformSyncAndRoutingAssign,
  PlatformSyncAndRoutingChatRow,
  PlatformSyncAndRoutingDataCopyScratch,
  PlatformSyncAndRoutingDialog,
  PlatformSyncAndRoutingPrompt,
  PlatformSyncAndRoutingState2,
  PlatformSyncAndRoutingState4,
  PlatformSyncAndRoutingState5,
  PlatformSyncAndRoutingSystem,
  clearPlatformSyncAndRoutingDispose,
  createPagesBootGaveUpEvent,
  installPlatformSyncAndRoutingOrigins,
  isPlatformSyncAndRoutingTextarea,
  loadPlatformSyncAndRoutingClipboard,
  loadPlatformSyncAndRoutingLevel,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingContext,
  resolvePlatformSyncAndRoutingEmit2,
  resolvePlatformSyncAndRoutingFeBuild,
  resolvePlatformSyncAndRoutingFramed,
  resolvePlatformSyncAndRoutingMeta,
  resolvePlatformSyncAndRoutingOrigins,
  resolvePlatformSyncAndRoutingSource,
  resolvePlatformSyncAndRoutingTest,
  resolvePlatformSyncAndRoutingValue10,
  resolvePlatformSyncAndRoutingValue12,
  resolvePlatformSyncAndRoutingValue13,
  resolvePlatformSyncAndRoutingValue14,
  resolvePlatformSyncAndRoutingValue15,
  resolvePlatformSyncAndRoutingValue16,
  resolvePlatformSyncAndRoutingValue8,
  resolvePlatformSyncAndRoutingVerb2,
  usePlatformSyncAndRoutingFramed,
  usePlatformSyncAndRoutingNavigate,
  usePlatformSyncAndRoutingSystem,
  usePlatformSyncAndRoutingUseSyncExternalStore,
};

/** BaoCut: frame gestures from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  ObservabilityTelemetryWidgetFault,
  emitTelemetryEvent,
  filterObservabilityTelemetryJoin,
  installObservabilityTelemetryPagehide,
  resolveCommentsStoreLayer,
  resolveDataModelSchemasUnknown,
  resolveObservabilityBrowserAndOperationEventsTest,
  resolveObservabilityBrowserAndOperationEventsValue3,
  resolveObservabilityTelemetryRowLn,
  resolveObservabilityTelemetryThrown2,
  resolveObservabilityTelemetryValue13,
  resolveObservabilityTelemetryValue16,
  resolveObservabilityTelemetryValue7,
  resolvePlatformChunkLoadingStale,
  resolvePlatformLoadingAndStatusName,
} from "./docs-app-dependencies";
import {
  frameGesturesSet7,
  resolveFrameGesturesValue11,
} from "./docs-app-frame-gestures-state-1";

var resolveFrameGesturesValue12: Dynamic;

var frameGesturesSet8: Dynamic;

var frameGesturesSet9: Dynamic;

var FrameGesturesEmit: Dynamic;

function resolveFrameGesturesSrcKind(
  frameGesturesSrcKind?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return frameGesturesSrcKind.src === `rt` &&
    frameGesturesSrcKind.srcKind === `blob`
    ? resolveObservabilityTelemetryRowLn(options.ln, options.col)
    : {};
}

function resolveFrameGesturesKind(
  frameGesturesKind?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof frameGesturesKind != `object` || !frameGesturesKind) return null;
  let {
    kind: kind,
    where: where,
    cls: frameGesturesKind2,
    msgKind: msgKind,
    ident: frameGesturesKind3,
  }: Dynamic = frameGesturesKind;
  if (
    typeof kind != `string` ||
    !frameGesturesSet8.has(kind) ||
    typeof where != `string` ||
    !frameGesturesSet9.has(where)
  )
    return null;
  let cls: Dynamic = resolveDataModelSchemasUnknown(frameGesturesKind2);
  let resolveFrameGesturesKindResult: Dynamic =
    resolveObservabilityTelemetryThrown2(frameGesturesKind, cls);
  let { ln: frameGesturesSrcKind, col: col }: Dynamic =
    resolveFrameGesturesSrcKind(
      resolveFrameGesturesKindResult,
      frameGesturesKind,
    );
  let record: Dynamic = {
    kind: kind,
    where: where,
    cls: cls,
    ...resolveFrameGesturesKindResult,
    ...(frameGesturesSrcKind === undefined
      ? {}
      : {
          ln: frameGesturesSrcKind,
        }),
    ...(col === undefined
      ? {}
      : {
          col: col,
        }),
  };
  if (cls === `TypeError` && resolveObservabilityTelemetryValue16(msgKind))
    return {
      ...record,
      msgKind: msgKind,
    };
  if (
    cls !== `ReferenceError` ||
    !resolveObservabilityTelemetryValue13(msgKind)
  )
    return record;
  let ident =
    msgKind === `nodef`
      ? resolveFrameGesturesValue11(frameGesturesKind3)
      : undefined;
  return ident === undefined
    ? {
        ...record,
        msgKind: msgKind,
      }
    : {
        ...record,
        msgKind: msgKind,
        ident: ident,
      };
}

function resolveFrameGesturesKind2(
  entry?: Dynamic,
  options: Dynamic = FrameGesturesEmit,
  ..._extraArguments: unknown[]
): undefined {
  let cls: Dynamic = resolveDataModelSchemasUnknown(entry.cls);
  let msgKind: Dynamic =
    (cls === `ReferenceError` &&
      resolveObservabilityTelemetryValue13(entry.msgKind)) ||
    (cls === `TypeError` && resolveObservabilityTelemetryValue16(entry.msgKind))
      ? entry.msgKind
      : undefined;
  let ident: Dynamic =
    cls === `ReferenceError` &&
    msgKind === `nodef` &&
    typeof entry.ident == `string`
      ? entry.ident
      : undefined;
  let resolveFrameGesturesKind2Result: Dynamic =
    resolveObservabilityTelemetryThrown2(entry, cls);
  let inflight: Dynamic =
    entry.road === `iframe` &&
    (entry.inflight === `ifl` || entry.inflight === `idl`)
      ? entry.inflight
      : undefined;
  let frameGesturesSrcKind: Dynamic =
    entry.road === `iframe`
      ? resolveFrameGesturesSrcKind(resolveFrameGesturesKind2Result, entry)
      : {};
  let fields: Dynamic = {
    kind: entry.kind,
    cls: cls,
    where: entry.where,
    road: entry.road,
    ...(msgKind === undefined
      ? {}
      : {
          msgKind: msgKind,
        }),
    ...(ident === undefined
      ? {}
      : {
          ident: ident,
        }),
    ...resolveFrameGesturesKind2Result,
    ...(inflight === undefined
      ? {}
      : {
          inflight: inflight,
        }),
    ...frameGesturesSrcKind,
  };
  options.emit({
    name: `pages.crash`,
    key: filterObservabilityTelemetryJoin(entry.road, entry.where, cls, {
      msgKind: msgKind,
      ...resolveFrameGesturesKind2Result,
      inflight: inflight,
    }),
    fields: fields,
  });
  options.ring(`host`, `crash`, fields);
  if (entry.road === `iframe`) {
    options.health(
      [
        {
          name: resolveObservabilityTelemetryValue7(
            resolveFrameGesturesKind2Result.src,
            inflight,
          ),
        },
      ],
      `iframe`,
    );
  }
}

function resolveFrameGesturesTest2(
  error?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    error instanceof Error &&
    (resolvePlatformLoadingAndStatusName(error) ||
      /lfile-runtime \S+: (?:404|410)\b/.test(error.message))
  );
}

function resolveFrameGesturesCls(
  frameGesturesCls?: Dynamic,
  options: Dynamic = FrameGesturesEmit,
  ..._extraArguments: unknown[]
): undefined {
  if (
    frameGesturesCls.road === `host` &&
    resolveFrameGesturesTest2(frameGesturesCls.cls)
  )
    return void resolvePlatformChunkLoadingStale(
      options.emit,
      options.chunkJudge,
      frameGesturesCls.cls,
    );
  let cls: Dynamic = resolveDataModelSchemasUnknown(frameGesturesCls.cls);
  let where: Dynamic = frameGesturesSet9.has(frameGesturesCls.where)
    ? frameGesturesCls.where
    : `boot`;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest(
    options.plat?.(),
  );
  let fields: Dynamic = {
    cls: cls,
    where: where,
    road: frameGesturesCls.road,
    ...(plat !== undefined && {
      plat: plat,
    }),
  };
  options.emit({
    name: `pages.boot.failed`,
    key: `${frameGesturesCls.road}:${where}:${cls}`,
    fields: fields,
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  });
  options.ring(`host`, `boot.failed`, fields);
}

var frameGesturesWeakMap: Dynamic;

function isFrameGesturesValue(
  frameGesturesValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (frameGesturesValue == null) return false;
  let frameGesturesWeakMapEntry: Dynamic =
    frameGesturesWeakMap.get(frameGesturesValue) ?? 0;
  return frameGesturesWeakMapEntry >= 50
    ? false
    : (frameGesturesWeakMap.set(
        frameGesturesValue,
        frameGesturesWeakMapEntry + 1,
      ),
      true);
}

function resolveFrameGesturesRoad(
  frameGesturesRoad?: Dynamic,
  options?: Dynamic,
  context: Dynamic = FrameGesturesEmit,
  dependencies: Dynamic = false,
  ..._extraArguments: unknown[]
) {
  let frameGesturesKind: Dynamic = resolveFrameGesturesKind(frameGesturesRoad);
  return frameGesturesKind === null || !isFrameGesturesValue(options)
    ? false
    : (resolveFrameGesturesKind2(
        {
          ...frameGesturesKind,
          road: `iframe`,
          inflight: dependencies ? `ifl` : `idl`,
        },
        context,
      ),
      true);
}

function resolveFrameGesturesPending(
  frameGesturesPending?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return frameGesturesPending == null
    ? false
    : frameGesturesPending.pending > 0 ||
        frameGesturesPending.word === `saving` ||
        frameGesturesPending.word === `busy`;
}

function resolveFrameGesturesPhase(
  frameGesturesPhase?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof frameGesturesPhase != `object` || !frameGesturesPhase) return null;
  let { phase: phase, cls: frameGesturesPhase2 }: Dynamic = frameGesturesPhase;
  return resolveFrameGesturesValue12(phase)
    ? {
        phase: phase,
        cls: resolveDataModelSchemasUnknown(
          typeof frameGesturesPhase2 == `string` ? frameGesturesPhase2 : ``,
        ),
      }
    : null;
}

function isFrameGesturesPhase(
  frameGesturesPhase?: Dynamic,
  options?: Dynamic,
  context: Dynamic = FrameGesturesEmit,
  ..._extraArguments: unknown[]
) {
  let frameGesturesPhase2: Dynamic =
    resolveFrameGesturesPhase(frameGesturesPhase);
  if (frameGesturesPhase2 === null || !isFrameGesturesValue(options))
    return false;
  let fields: Dynamic = {
    phase: frameGesturesPhase2.phase,
    cls: frameGesturesPhase2.cls,
    road: `iframe`,
    component: `wdg`,
  };
  context.emit({
    name: `pages.widget.fault`,
    key: `${frameGesturesPhase2.phase}:${frameGesturesPhase2.cls}`,
    fields: fields,
  });
  context.ring(`host`, `widget.fault`, fields);
  context.health(
    [
      {
        name: ObservabilityTelemetryWidgetFault,
      },
    ],
    `iframe`,
  );
  return true;
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeFrameGesturesState2Step1(): void {
  (resolveFrameGesturesValue12 = (
    frameGesturesValue12?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof frameGesturesValue12 == `string` &&
    frameGesturesSet7.has(frameGesturesValue12));
  (frameGesturesSet8 = new (Set as Dynamic)([
    `uncaught_error`,
    `unhandled_rejection`,
  ]));
  (frameGesturesSet9 = new (Set as Dynamic)([
    `boot`,
    `mount`,
    `live`,
  ]));
  (FrameGesturesEmit = {
    emit: (frameGesturesEmit?: Dynamic, ..._extraArguments: unknown[]) =>
      emitTelemetryEvent(frameGesturesEmit),
    ring: (
      frameGesturesEmit?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) => resolveCommentsStoreLayer(frameGesturesEmit, options, context),
    health: (
      frameGesturesEmit?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => installObservabilityTelemetryPagehide(frameGesturesEmit, options),
    plat: resolveObservabilityBrowserAndOperationEventsValue3,
  });
  (frameGesturesWeakMap = new (WeakMap as Dynamic)());
}

export {
  FrameGesturesEmit,
  frameGesturesSet9,
  isFrameGesturesPhase,
  isFrameGesturesValue,
  resolveFrameGesturesCls,
  resolveFrameGesturesPending,
  resolveFrameGesturesRoad,
};

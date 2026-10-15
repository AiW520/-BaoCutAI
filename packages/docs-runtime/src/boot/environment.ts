/** hello-early: restored from hello-early-Disx_30T.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
var PREWARM_WORKER_SOURCE: string = `postMessage('up');onmessage=function(m){fetch(m.data,{keepalive:true}).then(function(r){if(!r.ok)throw new Error(String(r.status));return r.arrayBuffer()}).then(function(b){postMessage({b:b},[b]);close()},function(e){postMessage({e:String(e)});close()})}`;
var PREWARM_WORKER_TIMEOUT_MS: number = 2e4;
var prewarmWorker: Dynamic = null;
var defaultWorkerTimers: Dynamic = {
  set: (
    defaultWorkerTimers2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => setTimeout(defaultWorkerTimers2, options),
  clear: (
    defaultWorkerTimers2?: Dynamic,
    ..._extraArguments: unknown[]
  ): void => clearTimeout(defaultWorkerTimers2),
};
function prewarmFrameWorker(
  timers: Dynamic = defaultWorkerTimers,
  ..._extraArguments: unknown[]
): undefined {
  if (prewarmWorker === null)
    try {
      if (typeof Worker != `function` || typeof Blob != `function`) return;
      let objectURL: string = URL.createObjectURL(
        new (Blob as Dynamic)([PREWARM_WORKER_SOURCE], {
          type: `text/javascript`,
        }),
      );
      let worker: Dynamic = new (Worker as Dynamic)(objectURL);
      let prewarmFrameWorkerHandler = (
        prewarmFrameWorker2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (prewarmFrameWorker2.data === `up`) {
          record.up = true;
          URL.revokeObjectURL(objectURL);
        }
      };
      let prewarmFrameWorkerHandler2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        event.preventDefault();
        if (prewarmWorker === record) {
          prewarmWorker = null;
        }
        record.release();
        worker.terminate();
      };
      let record: Dynamic = {
        w: worker,
        up: false,
        release: (..._extraArguments: unknown[]): undefined => {
          worker.removeEventListener(`message`, prewarmFrameWorkerHandler);
          worker.removeEventListener(`error`, prewarmFrameWorkerHandler2);
          timers.clear(set);
        },
      };
      worker.addEventListener(`message`, prewarmFrameWorkerHandler);
      worker.addEventListener(`error`, prewarmFrameWorkerHandler2);
      let set: Dynamic = timers.set(
        (..._extraArguments: unknown[]): undefined => {
          if (prewarmWorker === record) {
            disposePrewarmWorker();
          }
        },
        PREWARM_WORKER_TIMEOUT_MS,
      );
      prewarmWorker = record;
    } catch {
      prewarmWorker = null;
    }
}
function takePrewarmWorker(..._extraArguments: unknown[]): Dynamic {
  let worker: Dynamic = prewarmWorker;
  prewarmWorker = null;
  return worker === null
    ? null
    : (worker.release(),
      worker.up
        ? {
            w: worker.w,
          }
        : (worker.w.terminate(), null));
}
function disposePrewarmWorker(..._extraArguments: unknown[]): undefined {
  let worker: Dynamic = prewarmWorker;
  prewarmWorker = null;
  if (worker !== null) {
    worker.release();
    worker.w.terminate();
  }
}
function isFrameArtifact(
  windowOverride?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let windowObject: Dynamic =
    windowOverride === undefined
      ? typeof window !== "undefined"
        ? window
        : null
      : windowOverride;
  if (windowObject == null) return false;
  let self: Dynamic = windowObject.self ?? windowObject;
  if (
    windowObject.parent === self ||
    windowObject.parent === null ||
    windowObject.parent === undefined
  )
    return false;
  let preamble: Dynamic = windowObject.__FRAME_PREAMBLE;
  return (
    (typeof preamble == `object` && !!preamble) ||
    windowObject.__BONGO_TRANSPORT__ === `frame`
  );
}
var FrameOfflineError: Dynamic = class extends Error {
  [key: string]: Dynamic;
  frameOffline: Dynamic = true;
  what: Dynamic;
  constructor(frame?: Dynamic, ..._extraArguments: unknown[]) {
    super(`not available inside a Frame artifact (${frame})`);
    this.name = `FrameOfflineError`;
    this.what = frame;
  }
};
var isFrameOfflineError: Dynamic = (
  error?: Dynamic,
  ..._extraArguments: unknown[]
): boolean =>
  error instanceof (FrameOfflineError as Dynamic) ||
  (typeof error == `object` && !!error && error.frameOffline === true);
var FRAME_TIMING_PHASES: Dynamic = [
  `entry`,
  `app`,
  `hello`,
  `helloFlushed`,
  `state`,
  `open`,
  `opened`,
  `snap0`,
  `fence`,
  `mount`,
  `snapshot`,
  `firstRead`,
  `bodyAsk`,
  `bodyRead`,
  `runtimeWarm`,
  `editorFrameCreated`,
  `editorFrameLoaded`,
  `runtimePost`,
  `iframeLoad`,
  `runtimeReady`,
  `editor`,
  `picture`,
  `paint`,
  `pixels`,
];
var FRAME_TIMING_DETAIL_KEYS: Dynamic = [
  `snapChunks`,
  `snapRefs`,
  `snapValues`,
  `runtimeChars`,
  `blocks`,
  `bodyChars`,
  `schemasAtEntry`,
  `schemaMsAtEntry`,
];
var phaseTimestamps: Dynamic = {};
var phaseDetails: Dynamic = {};
var timingListeners: Dynamic = new (Set as Dynamic)();
var hostLead: Dynamic;
var hostStartFrom: Dynamic;
function recordHostStart(
  hostStart?: Dynamic,
  source?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  if (
    hostLead !== undefined ||
    typeof hostStart != `number` ||
    !Number.isFinite(hostStart) ||
    hostStart <= 0 ||
    (source !== `shell-nav` && source !== `host-nav` && source !== `host-click`)
  )
    return false;
  let now: Dynamic =
    typeof performance == `object` && performance !== null
      ? performance.timeOrigin
      : undefined;
  if (typeof now != `number` || !Number.isFinite(now) || now <= 0) return false;
  let lead: number = now - hostStart;
  return lead < -50 || lead > 6e4
    ? false
    : ((hostLead = Math.max(0, lead)), (hostStartFrom = source), true);
}
var timingNow: Dynamic = (..._extraArguments: unknown[]): number =>
  typeof performance == `object` &&
  performance !== null &&
  typeof performance.now == `function`
    ? performance.now()
    : Date.now();
function markPerformance(
  name?: Dynamic,
  at?: Dynamic,
  detail?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    if (
      typeof performance != `object` ||
      performance === null ||
      typeof performance.mark != `function`
    )
      return;
    if (at === undefined && detail === undefined) {
      performance.mark(name);
    } else {
      performance.mark(name, {
        ...(at === undefined
          ? {}
          : {
              detail: {
                ...at,
              },
            }),
        ...(detail === undefined
          ? {}
          : {
              startTime: detail,
            }),
      });
    }
  } catch {}
}
function recordFramePhase(
  phase?: Dynamic,
  detail?: Dynamic,
  at?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (phaseTimestamps[phase] !== undefined) return false;
  let now: Dynamic = timingNow();
  let validAt: Dynamic =
    typeof at == `number` && Number.isFinite(at) && at >= 0 && at <= now
      ? at
      : undefined;
  phaseTimestamps[phase] = validAt ?? now;
  let phaseDetail: Dynamic;
  if (detail !== undefined)
    for (let recordFramePhaseResult of FRAME_TIMING_DETAIL_KEYS as Dynamic) {
      let detailItem: Dynamic = detail[recordFramePhaseResult];
      if (!(typeof detailItem != `number` || !Number.isFinite(detailItem))) {
        (phaseDetail ??= {})[recordFramePhaseResult] = detailItem;
        if (phaseDetails[recordFramePhaseResult] === undefined) {
          phaseDetails[recordFramePhaseResult] = detailItem;
        }
      }
    }
  markPerformance(`pages:${phase}`, phaseDetail, validAt);
  for (let recordFramePhaseResult of Array.from<Dynamic>(
    timingListeners,
  ) as Dynamic)
    try {
      recordFramePhaseResult(phase);
    } catch {}
  return true;
}
function frameTimings(..._extraArguments: unknown[]): Dynamic {
  return {
    at: {
      ...phaseTimestamps,
    },
    detail: {
      ...phaseDetails,
    },
    ...(hostLead !== undefined && hostStartFrom !== undefined
      ? {
          hostLead: hostLead,
          hostStartFrom: hostStartFrom,
        }
      : {}),
  };
}
function subscribeFrameTimings(
  listener?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  timingListeners.add(listener);
  return (..._extraArguments: unknown[]): undefined =>
    void timingListeners.delete(listener);
}
var TRUSTED_CLAUDE_ORIGINS: Dynamic = Object.freeze([
  `https://claude.ai`,
  `https://preview.claude.ai`,
  `https://ion-preview.claude.ai`,
  `https://claude-ai.staging.ant.dev`,
]);
`${TRUSTED_CLAUDE_ORIGINS.join(` `)}`;
function isTrustedClaudeOrigin(
  origin?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return TRUSTED_CLAUDE_ORIGINS.includes(origin);
}
var FRAME_STORE: string = `bongo`;
var FRAME_MESSAGE_PREFIX: string = `frame-sync:`;
var SAFE_FRAME_TOKEN_PATTERN: Dynamic = /^[A-Za-z0-9_-]*$/;
var isSafeFrameToken: Dynamic = (
  token?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => token.length <= 1024 && SAFE_FRAME_TOKEN_PATTERN.test(token);
var FRAME_PROTOCOL_PATTERN: Dynamic = /^bongo\.\d{1,3}$/;
var DEFAULT_SHELL_ORIGINS: Dynamic = TRUSTED_CLAUDE_ORIGINS;
var NO_SHELL_ORIGIN_REASON: string = `no_shell_origin`;
var preambleOrigins: Dynamic = ((..._extraArguments: unknown[]): Dynamic => {
  if (typeof window === "undefined") return;
  let FRAMEPREAMBLE: Dynamic = (window as Dynamic).__FRAME_PREAMBLE;
  if (typeof FRAMEPREAMBLE != `object` || !FRAMEPREAMBLE) return;
  let origins: Dynamic = FRAMEPREAMBLE.origins;
  return Array.isArray(origins) ? Object.freeze([...origins]) : undefined;
})();
function ancestorOriginsOf(
  location2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let ancestorOrigins: Dynamic = location2?.ancestorOrigins;
    return ancestorOrigins != null && typeof ancestorOrigins.length == `number`
      ? Array.from<Dynamic>(ancestorOrigins)
      : [];
  } catch {
    return [];
  }
}
function frameHostEnvironment(..._extraArguments: unknown[]): Dynamic {
  return typeof window === "undefined" ||
    (window as Dynamic).parent === window ||
    (window as Dynamic).parent === null ||
    typeof location === "undefined" ||
    location === null
    ? null
    : {
        self: window,
        parent: (window as Dynamic).parent,
        ancestorOrigins: ancestorOriginsOf(location),
        preambleOrigins: preambleOrigins,
      };
}
function matchesOriginPattern(
  pattern?: Dynamic,
  origin?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (pattern === origin) return true;
  if (!pattern.endsWith(`:*`)) return false;
  try {
    let url: Dynamic = new (URL as Dynamic)(origin);
    return `${url.protocol}//${url.hostname}:*` === pattern;
  } catch {
    return false;
  }
}
function narrowShellOrigins(
  preambleOrigins2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !(
      Array.isArray(preambleOrigins2) &&
      preambleOrigins2.every(
        (items?: Dynamic, ..._extraArguments: unknown[]): boolean =>
          typeof items == `string` && items.length > 0,
      )
    )
  )
    return {
      origins: DEFAULT_SHELL_ORIGINS,
      narrowed: false,
    };
  let origins: Dynamic = preambleOrigins2;
  return {
    origins: Object.freeze(
      DEFAULT_SHELL_ORIGINS.filter(
        (
          DEFAULTSHELLORIGINS?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          origins.some(
            (
              PREWARMWORKERTIMEOUTMS?: Dynamic,
              ..._extraArguments: unknown[]
            ): boolean =>
              matchesOriginPattern(PREWARMWORKERTIMEOUTMS, DEFAULTSHELLORIGINS),
          ),
      ),
    ),
    narrowed: true,
  };
}
var OPAQUE_ORIGIN: string = `null`;
function shellOriginRoad(
  host?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { origins: origins, narrowed: narrowed }: Dynamic = narrowShellOrigins(
    host.preambleOrigins,
  );
  let ancestorOrigin: Dynamic = host.ancestorOrigins[0];
  return typeof ancestorOrigin == `string` && ancestorOrigin !== OPAQUE_ORIGIN
    ? origins.includes(ancestorOrigin)
      ? {
          road: `stated`,
          origin: ancestorOrigin,
        }
      : {
          road: `none`,
        }
    : narrowed && origins.length === 1
      ? {
          road: `stated`,
          origin: origins[0],
        }
      : origins.length === 0
        ? {
            road: `none`,
          }
        : {
            road: `asked`,
            origins: origins,
          };
}
var originStates: Dynamic = new (WeakMap as Dynamic)();
var originStateFor: Dynamic = (
  window2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let state: Dynamic = originStates.get(window2);
  if (state === undefined) {
    state = {
      pin: null,
      waiters: new (Set as Dynamic)(),
      watchers: new (Set as Dynamic)(),
    };
    originStates.set(window2, state);
  }
  return state;
};
function knownShellOrigin(
  host?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (host === null) return null;
  let road: Dynamic = shellOriginRoad(host);
  if (road.road === `stated`) return road.origin;
  if (road.road === `none`) return null;
  let pinnedOrigin: Dynamic = originStates.get(host.self)?.pin?.() ?? null;
  return pinnedOrigin !== null && road.origins.includes(pinnedOrigin)
    ? pinnedOrigin
    : null;
}
function canContactShell(
  host?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return host !== null && shellOriginRoad(host).road !== `none`;
}
function shellOriginFromWindow(
  window2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    window2 == null ||
    (typeof window2 != `object` && typeof window2 != `function`)
  )
    return null;
  try {
    return knownShellOrigin({
      self: window2,
      ancestorOrigins: ancestorOriginsOf(window2.location),
      preambleOrigins: preambleOrigins,
    });
  } catch {
    return null;
  }
}
function watchShellOrigin(
  host?: Dynamic,
  listener?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (host === null || shellOriginRoad(host).road !== `asked`)
    return (..._extraArguments: unknown[]): undefined => {};
  let { watchers: watchers }: Dynamic = originStateFor(host.self);
  watchers.add(listener);
  return (..._extraArguments: unknown[]): undefined =>
    void watchers.delete(listener);
}
function waitForShellOrigin(
  host?: Dynamic,
  listener?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    host === null ||
    shellOriginRoad(host).road !== `asked` ||
    knownShellOrigin(host) !== null
  )
    return (..._extraArguments: unknown[]): undefined => {};
  let { waiters: waiters }: Dynamic = originStateFor(host.self);
  waiters.add(listener);
  return (..._extraArguments: unknown[]): undefined =>
    void waiters.delete(listener);
}
var HOST_START_SOURCES: Dynamic = [`shell-nav`, `host-nav`, `host-click`];
var isHostStartSource: Dynamic = (
  source?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => typeof source == `string` && HOST_START_SOURCES.includes(source);
var FRAME_MESSAGE_TYPES: Dynamic = new (Set as Dynamic)(
  [
    `state`,
    `opened`,
    `frame`,
    `ack`,
    `refused`,
    `result`,
    `reset`,
    `unavailable`,
  ].map(
    (item?: Dynamic, ..._extraArguments: unknown[]): string =>
      FRAME_MESSAGE_PREFIX + item,
  ),
);
var isRecord: Dynamic = (
  candidate?: Dynamic,
  ..._extraArguments: unknown[]
): boolean =>
  typeof candidate == `object` && !!candidate && !Array.isArray(candidate);
var nonnegativeSafeInteger: Dynamic = (
  number?: Dynamic,
  ..._extraArguments: unknown[]
): null | number =>
  typeof number == `number` && Number.isSafeInteger(number) && number >= 0
    ? number
    : null;
function parseFrameMessage(
  message?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!isRecord(message)) return null;
  let type: Dynamic = message.type;
  if (
    typeof type != `string` ||
    !FRAME_MESSAGE_TYPES.has(type) ||
    message.store !== `bongo`
  )
    return null;
  let operation: string = type.slice(11);
  if (operation === `state`) {
    if (
      typeof message.connected != `boolean` ||
      typeof message.sendable != `boolean`
    )
      return null;
    let hostStart: Dynamic = message.hostStart;
    let hostStartFrom2: Dynamic = message.hostStartFrom;
    let matchesCondition: Dynamic =
      typeof hostStart == `number` &&
      Number.isFinite(hostStart) &&
      hostStart > 0 &&
      isHostStartSource(hostStartFrom2);
    return {
      op: operation,
      connected: message.connected,
      sendable: message.sendable,
      ...(matchesCondition
        ? {
            hostStart: hostStart,
            hostStartFrom: hostStartFrom2,
          }
        : {}),
    };
  }
  if (operation === `unavailable`)
    return typeof message.reason == `string`
      ? {
          op: operation,
          reason: message.reason,
        }
      : null;
  let stream: Dynamic = message.stream;
  if (typeof stream != `string` || !FRAME_PROTOCOL_PATTERN.test(stream))
    return null;
  switch (operation) {
    case `opened`:
      return {
        op: operation,
        stream: stream,
      };
    case `frame`: {
      let payload: Dynamic = message.payload;
      if (typeof payload == `string`) {
        if (payload.length > 4194304) return null;
        try {
          payload = JSON.parse(payload);
        } catch {
          return null;
        }
      }
      return isRecord(payload)
        ? {
            op: operation,
            stream: stream,
            payload: payload,
          }
        : null;
    }
    case `ack`: {
      let nonnegativeSafeInteger2: Dynamic = nonnegativeSafeInteger(
        message.ack,
      );
      return nonnegativeSafeInteger2 === null
        ? null
        : {
            op: operation,
            stream: stream,
            ack: nonnegativeSafeInteger2,
          };
    }
    case `refused`:
      return typeof message.reason == `string`
        ? {
            op: operation,
            stream: stream,
            seq: nonnegativeSafeInteger(message.seq),
            reason: message.reason,
            expected: nonnegativeSafeInteger(message.expected),
            retryAfterMs: nonnegativeSafeInteger(message.retryAfterMs),
          }
        : null;
    case `result`: {
      let body: Dynamic = isRecord(message.body)
        ? message.body
        : isRecord(message.result)
          ? message.result
          : null;
      let status: Dynamic =
        message.status === `ACCEPTED` || message.status === `REJECTED`
          ? message.status
          : null;
      return body === null && status === null
        ? null
        : {
            op: operation,
            stream: stream,
            seq: nonnegativeSafeInteger(message.seq),
            status: status,
            result: body ?? {},
          };
    }
    case `reset`:
      return typeof message.reason == `string` &&
        typeof message.reopening == `boolean`
        ? {
            op: operation,
            stream: stream,
            reason: message.reason,
            reopening: message.reopening,
          }
        : null;
    default:
      return null;
  }
}
var utf8Encoder: Dynamic = new (TextEncoder as Dynamic)();
var utf8Bytes: Dynamic = (
  text?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => utf8Encoder.encode(text).length;
var isStateOrUnavailable: Dynamic = (
  message?: Dynamic,
  ..._extraArguments: unknown[]
): boolean => message.op === `state` || message.op === `unavailable`;
function createFrameMessagePort(
  host?: Dynamic,
  onMessage?: Dynamic,
  onProblem: Dynamic = (..._extraArguments: unknown[]): undefined => {},
  ..._extraArguments: unknown[]
): Dynamic {
  let road: Dynamic = shellOriginRoad(host);
  let shellOrigin: Dynamic = road.road === `stated` ? road.origin : null;
  let allowedOrigins: Dynamic = road.road === `asked` ? road.origins : null;
  let disposed: boolean = false;
  let origin: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    disposed ? null : shellOrigin;
  let originState: Dynamic =
    road.road === `asked` ? originStateFor(host.self) : null;
  let notifyOrigin = (..._extraArguments: unknown[]): undefined => {
    if (originState !== null)
      for (let createFrameMessagePortResult of Array.from<Dynamic>(
        originState.watchers,
      ) as Dynamic)
        try {
          createFrameMessagePortResult();
        } catch {}
  };
  if (originState !== null) {
    let createFrameMessagePortResult: Dynamic = null;
    try {
      createFrameMessagePortResult = originState.pin?.() ?? null;
    } catch {
      createFrameMessagePortResult = null;
    }
    originState.pin = origin;
    if (createFrameMessagePortResult !== null) {
      notifyOrigin();
    }
  }
  let send: Dynamic = (
    frameMessagePort?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    disposed
      ? false
      : shellOrigin === null
        ? (onProblem(`no-shell-origin`), false)
        : (host.parent.postMessage(frameMessagePort, shellOrigin), true);
  let receive = (
    frameMessagePort?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (disposed) return;
    if (frameMessagePort.source !== host.parent) {
      if (
        isRecord(frameMessagePort.data) &&
        typeof frameMessagePort.data.type == `string` &&
        frameMessagePort.data.type.startsWith(`frame-sync:`)
      ) {
        onProblem(`dropped-source`);
      }
      return;
    }
    if (shellOrigin === null) {
      if (
        allowedOrigins === null ||
        !allowedOrigins.includes(frameMessagePort.origin)
      )
        return;
      let frameMessage2: Dynamic = parseFrameMessage(frameMessagePort.data);
      if (frameMessage2 === null || !isStateOrUnavailable(frameMessage2))
        return;
      shellOrigin = frameMessagePort.origin;
      allowedOrigins = null;
      try {
        onMessage(frameMessage2);
      } finally {
        if (originState !== null && originState.pin === origin) {
          let waiters: Dynamic = Array.from<Dynamic>(originState.waiters);
          originState.waiters.clear();
          for (let createFrameMessagePortResult of waiters as Dynamic)
            try {
              createFrameMessagePortResult();
            } catch {}
          notifyOrigin();
        }
      }
      return;
    }
    if (frameMessagePort.origin !== shellOrigin) {
      onProblem(`dropped-origin`);
      return;
    }
    let frameMessage: Dynamic = parseFrameMessage(frameMessagePort.data);
    if (frameMessage !== null) {
      onMessage(frameMessage);
    }
  };
  if (road.road !== `none`) {
    host.self.addEventListener(`message`, receive);
  }
  let listening: boolean = road.road !== `none`;
  let stopListening = (..._extraArguments: unknown[]): undefined => {
    if (listening) {
      listening = false;
      host.self.removeEventListener(`message`, receive);
    }
  };
  let messageType: Dynamic = (
    frameMessagePort?: Dynamic,
    ..._extraArguments: unknown[]
  ): string => FRAME_MESSAGE_PREFIX + frameMessagePort;
  let validStream: Dynamic = (
    frameMessagePort?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    FRAME_PROTOCOL_PATTERN.test(frameMessagePort)
      ? true
      : (onProblem(`bad-stream`), false);
  let validSince: Dynamic = (
    frameMessagePort?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    frameMessagePort === null || isSafeFrameToken(frameMessagePort)
      ? true
      : (onProblem(`bad-since`), false);
  return {
    get shellOrigin(): Dynamic {
      return shellOrigin;
    },
    road: road.road,
    get pending(): boolean {
      return !disposed && allowedOrigins !== null;
    },
    hello(..._extraArguments: unknown[]): Dynamic {
      if (disposed || allowedOrigins === null)
        return send({
          type: messageType(`hello`),
          store: FRAME_STORE,
        });
      for (let createFrameMessagePortResult of allowedOrigins as Dynamic)
        if (
          (host.parent.postMessage(
            {
              type: messageType(`hello`),
              store: FRAME_STORE,
            },
            createFrameMessagePortResult,
          ),
          allowedOrigins === null)
        )
          break;
      return true;
    },
    open(
      frameMessagePort?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (!validStream(frameMessagePort) || !validSince(context)) return false;
      let createFrameMessagePortResult: Dynamic;
      try {
        createFrameMessagePortResult =
          typeof options == `string` ? options : JSON.stringify(options);
      } catch {
        createFrameMessagePortResult = undefined;
      }
      return typeof createFrameMessagePortResult != `string` ||
        createFrameMessagePortResult === `` ||
        utf8Bytes(createFrameMessagePortResult) > 57344
        ? (onProblem(`bad-spec`), false)
        : send({
            type: messageType(`open`),
            store: FRAME_STORE,
            stream: frameMessagePort,
            spec: options,
            since: context,
          });
    },
    since(
      frameMessagePort?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return !validStream(frameMessagePort) || !validSince(options)
        ? false
        : send({
            type: messageType(`since`),
            store: FRAME_STORE,
            stream: frameMessagePort,
            since: options,
          });
    },
    send(
      frameMessagePort?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (!validStream(frameMessagePort)) return false;
      if (
        !Number.isSafeInteger(options) ||
        options < 1 ||
        options > 4294967295
      ) {
        onProblem(`bad-seq`);
        return false;
      }
      if (typeof context != `string` && !isRecord(context)) {
        onProblem(`bad-payload`);
        return false;
      }
      let createFrameMessagePortResult: Dynamic;
      try {
        createFrameMessagePortResult = JSON.stringify(context);
      } catch {
        createFrameMessagePortResult = undefined;
      }
      return typeof createFrameMessagePortResult == `string`
        ? utf8Bytes(createFrameMessagePortResult) > 262144
          ? (onProblem(`too-big`), false)
          : send({
              type: messageType(`send`),
              store: FRAME_STORE,
              stream: frameMessagePort,
              seq: options,
              payload: context,
            })
        : (onProblem(`bad-payload`), false);
    },
    close(frameMessagePort?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return validStream(frameMessagePort)
        ? send({
            type: messageType(`close`),
            store: FRAME_STORE,
            stream: frameMessagePort,
          })
        : false;
    },
    expire(..._extraArguments: unknown[]): undefined {
      if (!(disposed || allowedOrigins === null)) {
        allowedOrigins = null;
        stopListening();
      }
    },
    dispose(..._extraArguments: unknown[]): undefined {
      if (disposed) return;
      let matchesShellOrigin: boolean = shellOrigin !== null;
      disposed = true;
      stopListening();
      if (originState !== null && originState.pin === origin) {
        originState.pin = null;
        if (matchesShellOrigin) {
          notifyOrigin();
        }
      }
    },
  };
}
var earlyHello: Dynamic;
var helloWasAttempted: boolean = false;
function disposeEarlyHello(
  hello?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  hello.port.dispose();
  if (earlyHello === hello) {
    earlyHello = undefined;
  }
}
function postEarlyHello(
  host?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  if (helloWasAttempted) return `already`;
  helloWasAttempted = true;
  if (host === null) return `inert`;
  let hello: Dynamic = {
    host: host,
    port: undefined,
    msgs: [],
    problems: [],
    onMsg: null,
    onProblem: null,
  };
  hello.port = createFrameMessagePort(
    host,
    (operation?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (hello.onMsg !== null) return hello.onMsg(operation);
      if (operation.op === `state`) {
        recordFramePhase(`state`);
        recordHostStart(operation.hostStart, operation.hostStartFrom);
      }
      if (hello.msgs.length >= 64) return disposeEarlyHello(hello);
      hello.msgs.push(operation);
    },
    (postEarlyHello2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (hello.onProblem !== null) return hello.onProblem(postEarlyHello2);
      if (hello.problems.length < 64) {
        hello.problems.push(postEarlyHello2);
      }
    },
  );
  return (hello.port.shellOrigin === null && !hello.port.pending) ||
    !hello.port.hello()
    ? (hello.port.dispose(), `no-origin`)
    : (recordFramePhase(`hello`), (earlyHello = hello), `posted`);
}
function adoptEarlyHello(
  host?: Dynamic,
  onMessage?: Dynamic,
  onProblem?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let hello: Dynamic = earlyHello;
  if (hello === undefined) return null;
  earlyHello = undefined;
  let road: Dynamic = shellOriginRoad(host);
  let compatible: Dynamic =
    road.road === `stated`
      ? hello.port.road === `stated` && hello.port.shellOrigin === road.origin
      : road.road === `asked` &&
        hello.port.road === `asked` &&
        (hello.port.pending ||
          (hello.port.shellOrigin !== null &&
            road.origins.includes(hello.port.shellOrigin)));
  return hello.host.parent !== host.parent ||
    hello.host.self !== host.self ||
    !compatible
    ? (hello.port.dispose(), null)
    : ((hello.onMsg = onMessage),
      (hello.onProblem = onProblem),
      {
        port: hello.port,
        drain(..._extraArguments: unknown[]): undefined {
          for (let adoptEarlyHelloResult of hello.problems.splice(0) as Dynamic)
            onProblem(adoptEarlyHelloResult);
          for (let adoptEarlyHelloResult of hello.msgs.splice(0) as Dynamic)
            onMessage(adoptEarlyHelloResult);
        },
      });
}
function helloEarly(..._extraArguments: unknown[]): undefined {
  try {
    if (
      postEarlyHello(isFrameArtifact() ? frameHostEnvironment() : null) !==
      `posted`
    )
      return;
    setTimeout(
      (..._extraArguments: unknown[]): boolean =>
        recordFramePhase(`helloFlushed`),
      0,
    );
    prewarmFrameWorker();
  } catch {}
}
helloEarly();
export {
  isFrameOfflineError as C,
  isFrameArtifact as S,
  takePrewarmWorker as T,
  recordFramePhase as _,
  FRAME_STORE as a,
  frameTimings as b,
  createFrameMessagePort as c,
  canContactShell as d,
  isSafeFrameToken as f,
  FRAME_TIMING_PHASES as g,
  FRAME_TIMING_DETAIL_KEYS as h,
  DEFAULT_SHELL_ORIGINS as i,
  knownShellOrigin as l,
  isTrustedClaudeOrigin as m,
  adoptEarlyHello as n,
  watchShellOrigin as o,
  frameHostEnvironment as p,
  NO_SHELL_ORIGIN_REASON as r,
  waitForShellOrigin as s,
  helloEarly as t,
  shellOriginFromWindow as u,
  recordHostStart as v,
  disposePrewarmWorker as w,
  FrameOfflineError as x,
  subscribeFrameTimings as y,
};
export {
  isFrameOfflineError,
  isFrameArtifact,
  takePrewarmWorker,
  recordFramePhase,
  FRAME_STORE,
  frameTimings,
  createFrameMessagePort,
  canContactShell,
  isSafeFrameToken,
  FRAME_TIMING_PHASES,
  FRAME_TIMING_DETAIL_KEYS,
  DEFAULT_SHELL_ORIGINS,
  knownShellOrigin,
  isTrustedClaudeOrigin,
  adoptEarlyHello,
  watchShellOrigin,
  frameHostEnvironment,
  NO_SHELL_ORIGIN_REASON,
  waitForShellOrigin,
  helloEarly,
  shellOriginFromWindow,
  recordHostStart,
  disposePrewarmWorker,
  FrameOfflineError,
  subscribeFrameTimings,
};
